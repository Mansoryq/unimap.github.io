# 🎓 UniMap — University Navigation Platform

**UniMap** — платформа для казахстанских студентов и абитуриентов. AI-прогнозы поступления, данные о грантах ЕНТ 2025, информация об университетах, жилье, работе и студенческих сервисах.

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-3.1-green?logo=flask)
![Ollama](https://img.shields.io/badge/Ollama-llama3.2-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📸 Возможности

- **🔐 Регистрация и авторизация** — безопасная аутентификация с SHA-256 + salt
- **🤖 AI-прогноз поступления** — анализ шансов через Ollama (llama3.2) на основе реальных данных
- **📊 Данные грантов ЕНТ 2025** — 106 специальностей с минимальными/максимальными баллами
- **🏫 15 университетов КЗ** — пороговые баллы от Назарбаев до региональных вузов
- **📝 8 комбинаций предметов ЕНТ** — математика-физика, биология-химия и др.
- **🌍 Университеты 24 стран** — KZ и World Wide вкладки
- **🏠 Жильё, 💼 Работа, 🎓 Студенческие сервисы**
- **🌐 3 языка** — Русский, English, Қазақша
- **📱 Адаптивный дизайн** — мобильная и десктопная версии

---

## 🚀 Установка и запуск

### Требования

- Python 3.10+
- [Ollama](https://ollama.com/) с моделью `llama3.2`

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/Mansoryq/unimap.github.io.git
cd unimap.github.io
```

### 2. Создайте виртуальное окружение

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Установите зависимости

```bash
pip install -r requirements.txt
```

### 4. Запустите Ollama

```bash
ollama pull llama3.2
ollama serve
```

### 5. Запустите сервер

```bash
python server.py
```

Откройте **http://localhost:8080** в браузере.

---

## 📁 Структура проекта

```
├── index.html              # Страница входа
├── register.html           # Страница регистрации
├── dashboard.html          # Главная панель
├── results.html            # Результаты тестов + AI-прогноз
├── universities.html       # Университеты (24 страны)
├── housing.html            # Жильё
├── jobs.html               # Работа
├── services.html           # Студенческие сервисы
├── settings.html           # Настройки (язык)
├── css/
│   └── style.css           # Все стили (2700+ строк)
├── js/
│   ├── app.js              # Основная логика + ЕНТ комбинации
│   ├── auth.js             # Проверка авторизации
│   └── i18n.js             # Переводы (ru/en/kk)
├── server.py               # Flask backend (auth + AI)
├── grant_data_2025.json    # Данные грантов (106 специальностей)
├── parse_grants.py         # Парсер PDF грантов
├── requirements.txt        # Python зависимости
└── .gitignore
```

---

## 🤖 AI-прогноз поступления

Система анализирует введённые баллы и выдаёт персонализированный прогноз:

| Данные | Источник |
|--------|----------|
| Пороговые баллы | 15 университетов КЗ (Назарбаев, КазНУ, ЕНУ, КБТУ и др.) |
| Гранты 2025 | 106 специальностей из PDF МОН РК |
| Комбинации ЕНТ | 8 профильных направлений |
| AI-модель | Ollama llama3.2 (3.2B параметров) |

Результат — список университетов с процентом шанса поступления (кольцевая диаграмма), комментариями и рекомендациями.

---

## 🛠 Технологии

| Компонент | Технология |
|-----------|-----------|
| Frontend | HTML, CSS, JavaScript (vanilla) |
| Backend | Python, Flask, SQLite |
| AI | Ollama (llama3.2:latest) |
| Иконки | Font Awesome 6.5.1 |
| Парсинг PDF | PyPDF2 + PyCryptodome |
| Аутентификация | Token-based, SHA-256 + salt |

---

## 📄 Лицензия

MIT License — свободное использование.

---

**Разработано с ❤️ для казахстанских студентов**
