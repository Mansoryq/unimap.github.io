#!/usr/bin/env python3
"""UniMap Backend Server — Registration & Authentication"""

import os
import sqlite3
import hashlib
import secrets
import json
from datetime import datetime, timedelta
from functools import wraps

from flask import Flask, request, jsonify, send_from_directory, session
from flask_cors import CORS

# === Config ===
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'unimap.db')

app = Flask(__name__, static_folder=BASE_DIR, static_url_path='')
app.secret_key = secrets.token_hex(32)
CORS(app, supports_credentials=True)


# === Database ===
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT UNIQUE NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            expires_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    ''')
    conn.commit()
    conn.close()


def hash_password(password):
    salt = secrets.token_hex(16)
    hashed = hashlib.sha256((salt + password).encode()).hexdigest()
    return f"{salt}:{hashed}"


def verify_password(password, stored_hash):
    salt, hashed = stored_hash.split(':')
    return hashlib.sha256((salt + password).encode()).hexdigest() == hashed


# === Auth Helpers ===
def create_session_token(user_id):
    token = secrets.token_hex(32)
    expires = datetime.now() + timedelta(days=7)
    conn = get_db()
    conn.execute(
        'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
        (user_id, token, expires.isoformat())
    )
    conn.commit()
    conn.close()
    return token


def get_user_by_token(token):
    if not token:
        return None
    conn = get_db()
    row = conn.execute('''
        SELECT u.id, u.name, u.email FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.token = ? AND s.expires_at > ?
    ''', (token, datetime.now().isoformat())).fetchone()
    conn.close()
    return dict(row) if row else None


# === API Routes ===

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    # Validation
    if not name or len(name) < 2:
        return jsonify({'error': 'Имя должно быть не менее 2 символов'}), 400
    if not email or '@' not in email:
        return jsonify({'error': 'Введите корректный email'}), 400
    if len(password) < 6:
        return jsonify({'error': 'Пароль должен быть не менее 6 символов'}), 400

    conn = get_db()
    existing = conn.execute('SELECT id FROM users WHERE email = ?', (email,)).fetchone()
    if existing:
        conn.close()
        return jsonify({'error': 'Пользователь с таким email уже существует'}), 409

    password_hash = hash_password(password)
    cursor = conn.execute(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        (name, email, password_hash)
    )
    user_id = cursor.lastrowid
    conn.commit()
    conn.close()

    token = create_session_token(user_id)

    return jsonify({
        'success': True,
        'token': token,
        'user': {'id': user_id, 'name': name, 'email': email}
    }), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    if not email or not password:
        return jsonify({'error': 'Введите email и пароль'}), 400

    conn = get_db()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    if not user or not verify_password(password, user['password_hash']):
        return jsonify({'error': 'Неверный email или пароль'}), 401

    token = create_session_token(user['id'])

    return jsonify({
        'success': True,
        'token': token,
        'user': {'id': user['id'], 'name': user['name'], 'email': user['email']}
    })


@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header.startswith('Bearer ') else None

    user = get_user_by_token(token)
    if user:
        return jsonify({'authenticated': True, 'user': user})
    return jsonify({'authenticated': False}), 401


@app.route('/api/logout', methods=['POST'])
def logout():
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header.startswith('Bearer ') else None

    if token:
        conn = get_db()
        conn.execute('DELETE FROM sessions WHERE token = ?', (token,))
        conn.commit()
        conn.close()

    return jsonify({'success': True})


# === AI Chances (Ollama) ===

import urllib.request

OLLAMA_URL = 'http://localhost:11434/api/generate'
OLLAMA_MODEL = 'llama3.2:latest'

# Load grant threshold data from 2025 PDF parsing
GRANT_DATA_PATH = os.path.join(BASE_DIR, 'grant_data_2025.json')
GRANT_DATA = {}
if os.path.exists(GRANT_DATA_PATH):
    with open(GRANT_DATA_PATH, 'r', encoding='utf-8') as f:
        GRANT_DATA = json.load(f)
    print(f"Loaded grant data: {len(GRANT_DATA)} specialties")

# Map ЕНТ subject combos to relevant specialty codes
ENT_COMBO_SPECIALTIES = {
    'math-physics': [
        'B054', 'B055', 'B056', 'B009', 'B010', 'B062', 'B063', 'B064',
        'B065', 'B067', 'B074', 'B071', 'B162', 'B165', 'B166', 'B167',
        'B126', 'B171', 'B060', 'B061', 'B076'
    ],
    'math-informatics': [
        'B057', 'B058', 'B059', 'B011', 'B055', 'B157', 'B158',
        'B063', 'B044', 'B046'
    ],
    'biology-chemistry': [
        'M086', 'M088', 'M089', 'B050', 'B053', 'B012', 'B013',
        'B085', 'B072', 'B094', 'B084', 'B068', 'B083', 'B051'
    ],
    'geography-english': [
        'B140', 'B091', 'B093', 'B014', 'B047', 'B044', 'B040',
        'B036', 'B135', 'B052', 'B095'
    ],
    'history-english': [
        'B049', 'B040', 'B140', 'B034', 'B036', 'B018', 'B015',
        'B042', 'B038', 'B135', 'B145'
    ],
    'history-geography': [
        'B034', 'B014', 'B015', 'B019', 'B001', 'B038', 'B039',
        'B040', 'B090', 'B134', 'B234', 'B032'
    ],
    'biology-geography': [
        'B051', 'B050', 'B052', 'B013', 'B014', 'B077', 'B078',
        'B079', 'B080', 'B082', 'B083', 'B075', 'B173', 'B183'
    ],
    'language-literature': [
        'B016', 'B037', 'B035', 'B042', 'B015', 'B036', 'B017',
        'B039', 'B043', 'B029', 'B234'
    ]
}

# Real university ЕНТ threshold scores (average passing scores)
UNI_THRESHOLDS = [
    {'name': 'Назарбаев Университет (Nazarbayev University)', 'min': 120, 'max': 140, 'tier': 'top'},
    {'name': 'КазНУ им. аль-Фараби', 'min': 90, 'max': 125, 'tier': 'top'},
    {'name': 'ЕНУ им. Гумилева', 'min': 85, 'max': 120, 'tier': 'top'},
    {'name': 'КБТУ', 'min': 95, 'max': 125, 'tier': 'top'},
    {'name': 'Satbayev University', 'min': 80, 'max': 110, 'tier': 'high'},
    {'name': 'SDU (Suleyman Demirel University)', 'min': 85, 'max': 115, 'tier': 'high'},
    {'name': 'КИМЭП (KIMEP University)', 'min': 85, 'max': 120, 'tier': 'high'},
    {'name': 'КазНПУ им. Абая', 'min': 75, 'max': 110, 'tier': 'mid'},
    {'name': 'АУЭС (Алматинский университет энергетики)', 'min': 75, 'max': 105, 'tier': 'mid'},
    {'name': 'Карагандинский университет им. Букетова', 'min': 70, 'max': 100, 'tier': 'mid'},
    {'name': 'ЮКГУ (Южно-Казахстанский университет)', 'min': 65, 'max': 95, 'tier': 'regional'},
    {'name': 'ВКУ им. Сарсена Аманжолова', 'min': 60, 'max': 90, 'tier': 'regional'},
    {'name': 'КГУ им. Коркыт Ата', 'min': 60, 'max': 90, 'tier': 'regional'},
    {'name': 'Торайгыров университет (Павлодар)', 'min': 60, 'max': 90, 'tier': 'regional'},
    {'name': 'Актюбинский региональный университет', 'min': 60, 'max': 85, 'tier': 'regional'},
]


def build_grant_context(ent_combo, ent_score):
    """Build a context string with real grant threshold data for the AI prompt."""
    relevant_codes = ENT_COMBO_SPECIALTIES.get(ent_combo, [])
    if not relevant_codes:
        return ''

    lines = []
    for code in relevant_codes:
        if code in GRANT_DATA:
            d = GRANT_DATA[code]
            lines.append(
                f"  {code} {d['name']}: min grant score = {d['min_score']}, "
                f"max = {d['max_score']}, grants given = {d['count']}"
            )

    if not lines:
        return ''

    score = int(ent_score)

    # Build university-specific chances based on thresholds
    uni_lines = []
    for u in UNI_THRESHOLDS:
        if score >= u['max']:
            chance_range = '90-99%'
        elif score >= u['min']:
            pct = 50 + int(40 * (score - u['min']) / max(u['max'] - u['min'], 1))
            chance_range = f'{pct}-{min(pct+10,95)}%'
        elif score >= u['min'] - 10:
            chance_range = '25-45%'
        elif score >= u['min'] - 20:
            chance_range = '10-25%'
        else:
            chance_range = '5-10%'
        uni_lines.append(f"  {u['name']}: проходной {u['min']}–{u['max']}, шанс ≈ {chance_range}")

    context = f"""

REAL DATA from Kazakhstan 2025 grant results for specialties matching this subject combination:
{chr(10).join(lines)}

REAL UNIVERSITY PASSING SCORES (ЕНТ thresholds by university):
{chr(10).join(uni_lines)}

The student's ЕНТ score is {score}/140.
STRICT RULES for calculating chances:
- Use the university passing scores above to determine chances for EACH university
- If score >= max threshold for a university → chance 90-99%
- If score is between min and max threshold → chance 50-85% proportionally
- If score is 1-10 points below min threshold → chance 25-45%
- If score is 10-20 points below min threshold → chance 10-25%
- If score is 20+ points below min threshold → chance 5-10%
- You MUST include at least 8 Kazakhstan universities from the list above
- Match universities to specific specialties from the grant data
- For each university, include the relevant specialty/program from the grant data
- Recommend programs where this subject combination ({ent_combo}) is applicable
"""
    return context


@app.route('/api/ai-chances', methods=['POST'])
def ai_chances():
    """Analyze test scores and predict university admission chances via Ollama."""
    # Auth check
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header.startswith('Bearer ') else None
    user = get_user_by_token(token)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()
    scores = data.get('scores', [])
    lang = data.get('lang', 'ru')  # ru, en, kk

    if not scores:
        return jsonify({'error': 'No scores provided'}), 400

    # Build scores summary
    scores_parts = []
    ent_info = ''
    grant_context = ''
    for s in scores:
        if s['test'] == 'ЕНТ' and s.get('entSubjects'):
            scores_parts.append(f"ЕНТ: {s['score']}/140, Профильные предметы: {s['entSubjects']}")
            ent_combo = s.get('entCombo', '')
            grant_context = build_grant_context(ent_combo, s['score'])
            ent_info = f"""\n\nIMPORTANT: The student has taken the ЕНТ (Unified National Testing of Kazakhstan) with profile subjects: {s['entSubjects']}.
The ЕНТ score is {s['score']}/140. Mandatory subjects are: Математическая грамотность, Грамотность чтения, История Казахстана.
Based on these profile subjects, recommend universities and SPECIFIC PROGRAMS/SPECIALTIES that match this subject combination.
{grant_context}"""
        else:
            scores_parts.append(f"{s['test']}: {s['score']}")
    scores_text = ', '.join(scores_parts)

    lang_instruction = {
        'ru': 'Отвечай на русском языке.',
        'en': 'Answer in English.',
        'kk': 'Қазақ тілінде жауап бер.'
    }.get(lang, 'Отвечай на русском языке.')

    prompt = f"""You are a university admissions expert for Kazakhstan. A student has the following test scores: {scores_text}.{ent_info}

{lang_instruction}

Analyze these scores and provide admission chances for universities in TWO sections:

1. KAZAKHSTAN universities (at least 7 universities with SPECIFIC program names)
2. WORLD WIDE universities (at least 5 universities from different countries)

For EACH university, provide:
- University name (and program/specialty name for Kazakhstan)
- Admission chance as a percentage based on REAL data
- A brief comment mentioning the minimum grant score threshold if available

You MUST respond ONLY with valid JSON in this exact format, no other text before or after:
{{
  "kazakhstan": [
    {{"university": "...", "chance": 85, "comment": "..."}},
    ...
  ],
  "worldwide": [
    {{"university": "...", "chance": 70, "comment": "..."}},
    ...
  ]
}}

Be realistic with the percentages based on actual admission requirements. Sort by chance descending."""

    try:
        payload = json.dumps({
            'model': OLLAMA_MODEL,
            'prompt': prompt,
            'stream': False,
            'options': {
                'temperature': 0.3,
                'num_predict': 2048
            }
        }).encode('utf-8')

        req = urllib.request.Request(
            OLLAMA_URL,
            data=payload,
            headers={'Content-Type': 'application/json'}
        )
        
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = json.loads(resp.read().decode('utf-8'))

        response_text = result.get('response', '')
        
        # Try to extract JSON from response
        # Sometimes LLM wraps JSON in markdown code blocks
        import re
        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if json_match:
            chances_data = json.loads(json_match.group())
        else:
            return jsonify({'error': 'Failed to parse AI response'}), 500

        # Validate structure
        if 'kazakhstan' not in chances_data or 'worldwide' not in chances_data:
            return jsonify({'error': 'Invalid AI response structure'}), 500

        return jsonify({
            'success': True,
            'data': chances_data
        })

    except urllib.error.URLError:
        return jsonify({'error': 'Ollama server is not running. Start it with: ollama serve'}), 503
    except json.JSONDecodeError:
        return jsonify({'error': 'Failed to parse AI response as JSON', 'raw': response_text[:500]}), 500
    except Exception as e:
        return jsonify({'error': f'AI analysis failed: {str(e)}'}), 500


# === Serve Static Files ===

@app.route('/')
def serve_index():
    return send_from_directory(BASE_DIR, 'index.html')


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(BASE_DIR, path)


# === Start ===
if __name__ == '__main__':
    init_db()
    print("=" * 50)
    print("  UniMap Server running at http://localhost:8080")
    print("=" * 50)
    app.run(host='0.0.0.0', port=8080, debug=True)
