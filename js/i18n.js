// ===== UniMap i18n (Internationalization) =====
// Supports: ru (Русский), en (English), kk (Қазақша)

const translations = {
  // === Navigation ===
  nav_home: { ru: "Главная", en: "Home", kk: "Басты бет" },
  nav_universities: { ru: "Университеты", en: "Universities", kk: "Университеттер" },
  nav_results: { ru: "Результаты", en: "Results", kk: "Нәтижелер" },
  nav_jobs: { ru: "Подработка", en: "Part-Time Jobs", kk: "Жұмыс" },
  nav_housing: { ru: "Жильё", en: "Housing", kk: "Тұрғын үй" },
  nav_services: { ru: "Сервисы", en: "Student Services", kk: "Сервистер" },
  nav_settings: { ru: "Настройки", en: "Settings", kk: "Баптаулар" },
  nav_portfolio: { ru: "Портфолио", en: "Portfolio", kk: "Портфолио" },
  nav_notifications: { ru: "Уведомления", en: "Notifications", kk: "Хабарламалар" },

  // === Settings Page ===
  settings_title: { ru: "Настройки", en: "Settings", kk: "Баптаулар" },
  settings_language: { ru: "Язык", en: "Language", kk: "Тіл" },
  settings_language_desc: { ru: "Выберите язык интерфейса", en: "Choose your preferred interface language", kk: "Интерфейс тілін таңдаңыз" },
  settings_profile: { ru: "Профиль", en: "Profile", kk: "Профиль" },
  settings_profile_desc: { ru: "Управление данными аккаунта", en: "Manage your account information", kk: "Аккаунт деректерін басқару" },
  settings_email: { ru: "Электронная почта", en: "Email", kk: "Электрондық пошта" },
  settings_name: { ru: "Имя", en: "Name", kk: "Аты" },
  settings_notifications: { ru: "Уведомления", en: "Notifications", kk: "Хабарламалар" },
  settings_notifications_desc: { ru: "Настройка уведомлений", en: "Configure notification preferences", kk: "Хабарлама баптаулары" },
  settings_push: { ru: "Push-уведомления", en: "Push notifications", kk: "Push-хабарламалар" },
  settings_email_notif: { ru: "Email-уведомления", en: "Email notifications", kk: "Email-хабарламалар" },
  settings_about: { ru: "О приложении", en: "About", kk: "Қолданба туралы" },
  settings_about_desc: { ru: "Информация о приложении", en: "App information", kk: "Қолданба ақпараты" },
  settings_version: { ru: "Версия", en: "Version", kk: "Нұсқа" },
  settings_developer: { ru: "Разработчик", en: "Developer", kk: "Әзірлеуші" },
  settings_logout: { ru: "Выйти", en: "Log out", kk: "Шығу" },

  // === Dashboard ===
  dashboard_title: { ru: "Главная", en: "Dashboard", kk: "Басты бет" },
  dashboard_welcome: { ru: "Добро пожаловать! 👋", en: "Welcome! 👋", kk: "Қош келдіңіз! 👋" },
  dashboard_welcome_desc: { ru: "Найди свой идеальный университет", en: "Find your perfect university", kk: "Өзіңе лайықты университетті тап" },
  dashboard_search: { ru: "Поиск университетов...", en: "Search universities...", kk: "Университеттерді іздеу..." },
  dashboard_top_universities: { ru: "Топ университеты", en: "Top Universities", kk: "Үздік университеттер" },
  dashboard_portfolio: { ru: "Ваше портфолио", en: "Your Portfolio", kk: "Сіздің портфолио" },
  dashboard_certificates: { ru: "Грамоты", en: "Certificates", kk: "Грамоталар" },
  dashboard_ent: { ru: "ЕНТ", en: "ЕНТ", kk: "ҰБТ" },
  dashboard_ielts: { ru: "IELTS", en: "IELTS", kk: "IELTS" },
  dashboard_add_certificate: { ru: "Добавить грамоту", en: "Add certificate", kk: "Грамота қосу" },
  dashboard_add_ent: { ru: "Добавить результат ЕНТ", en: "Add ЕНТ result", kk: "ҰБТ нәтижесін қосу" },
  dashboard_add_ielts: { ru: "Добавить результат IELTS", en: "Add IELTS result", kk: "IELTS нәтижесін қосу" },

  // === Universities Page ===
  universities_title: { ru: "Университеты", en: "Universities", kk: "Университеттер" },
  universities_search: { ru: "Поиск университетов...", en: "Search universities...", kk: "Университеттерді іздеу..." },
  universities_kz: { ru: "Казахстан", en: "Kazakhstan", kk: "Қазақстан" },
  universities_world: { ru: "Весь мир", en: "World Wide", kk: "Бүкіл әлем" },
  universities_back: { ru: "Назад к странам", en: "Back to countries", kk: "Елдерге оралу" },
  universities_search_country: { ru: "Поиск стран...", en: "Search countries...", kk: "Елдерді іздеу..." },

  // === Results Page ===
  results_title: { ru: "Результаты", en: "Results", kk: "Нәтижелер" },
  results_your_scores: { ru: "Ваши результаты тестов", en: "Your Test Scores", kk: "Сіздің тест нәтижелеріңіз" },
  results_add_score: { ru: "Добавить результат", en: "Add Score", kk: "Нәтиже қосу" },
  results_empty: { ru: "У вас пока нет добавленных результатов", en: "You have no scores added yet", kk: "Сізде әлі нәтижелер жоқ" },

  // === ЕНТ Subject Selection ===
  ent_choose_subjects: { ru: "ЕНТ — Выберите предметы", en: "ЕНТ — Choose Subjects", kk: "ҰБТ — Пәндерді таңдаңыз" },
  ent_mandatory: { ru: "Обязательные предметы", en: "Mandatory Subjects", kk: "Міндетті пәндер" },
  ent_profile: { ru: "Профильные предметы", en: "Profile Subjects", kk: "Бейіндік пәндер" },
  ent_choose_combo: { ru: "выберите комбинацию", en: "choose a combination", kk: "комбинацияны таңдаңыз" },
  ent_next: { ru: "Далее — указать балл", en: "Next — enter score", kk: "Келесі — балл енгізу" },
  ent_math_literacy: { ru: "Мат. грамотность", en: "Math Literacy", kk: "Мат. сауаттылық" },
  ent_reading_literacy: { ru: "Грамотность чтения", en: "Reading Literacy", kk: "Оқу сауаттылығы" },
  ent_history_kz: { ru: "История Казахстана", en: "History of Kazakhstan", kk: "Қазақстан тарихы" },
  ent_math_physics: { ru: "Математика + Физика", en: "Math + Physics", kk: "Математика + Физика" },
  ent_math_informatics: { ru: "Математика + Информатика", en: "Math + Informatics", kk: "Математика + Информатика" },
  ent_bio_chem: { ru: "Биология + Химия", en: "Biology + Chemistry", kk: "Биология + Химия" },
  ent_geo_eng: { ru: "География + Англ. язык", en: "Geography + English", kk: "География + Ағылшын тілі" },
  ent_hist_eng: { ru: "Всемирная история + Англ. язык", en: "World History + English", kk: "Дүниежүзі тарихы + Ағылшын тілі" },
  ent_hist_geo: { ru: "Всемирная история + География", en: "World History + Geography", kk: "Дүниежүзі тарихы + География" },
  ent_bio_geo: { ru: "Биология + География", en: "Biology + Geography", kk: "Биология + География" },
  ent_lang_lit: { ru: "Каз. язык + Каз. литература", en: "Kazakh Language + Literature", kk: "Қазақ тілі + Қазақ әдебиеті" },

  // === Jobs Page ===
  jobs_title: { ru: "Подработка", en: "Part-Time Jobs", kk: "Жұмыс" },
  jobs_search: { ru: "Поиск работы...", en: "Search jobs...", kk: "Жұмыс іздеу..." },
  jobs_kz: { ru: "Казахстан", en: "Kazakhstan", kk: "Қазақстан" },
  jobs_world: { ru: "Весь мир", en: "World Wide", kk: "Бүкіл әлем" },
  jobs_back: { ru: "Назад к странам", en: "Back to countries", kk: "Елдерге оралу" },

  // === Housing Page ===
  housing_title: { ru: "Жильё", en: "Housing", kk: "Тұрғын үй" },
  housing_search: { ru: "Поиск жилья...", en: "Search housing...", kk: "Тұрғын үй іздеу..." },
  housing_kz: { ru: "Казахстан", en: "Kazakhstan", kk: "Қазақстан" },
  housing_world: { ru: "Весь мир", en: "World Wide", kk: "Бүкіл әлем" },
  housing_back: { ru: "Назад к странам", en: "Back to countries", kk: "Елдерге оралу" },

  // === Services Page ===
  services_title: { ru: "Сервисы для студентов", en: "Student Services", kk: "Студенттік сервистер" },
  services_search: { ru: "Поиск сервисов...", en: "Search student services...", kk: "Сервистерді іздеу..." },
  services_kz: { ru: "Казахстан", en: "Kazakhstan", kk: "Қазақстан" },
  services_world: { ru: "Весь мир", en: "World Wide", kk: "Бүкіл әлем" },
  services_back: { ru: "Назад к странам", en: "Back to countries", kk: "Елдерге оралу" },

  // === Login Page ===
  login_hello: { ru: "Привет, студент!", en: "Hello Student!", kk: "Сәлем, студент!" },
  login_title: { ru: "Войти в UniMap", en: "Sign in to UniMap", kk: "UniMap-қа кіру" },
  login_email: { ru: "Электронная почта (.edu)", en: "Email (.edu)", kk: "Электрондық пошта (.edu)" },
  login_password: { ru: "Пароль", en: "Password", kk: "Құпия сөз" },
  login_button: { ru: "Войти", en: "Sign In", kk: "Кіру" },
  login_forgot: { ru: "Забыли пароль?", en: "Forgot password?", kk: "Құпия сөзді ұмыттыңыз ба?" },
  login_register: { ru: "Зарегистрироваться", en: "Register", kk: "Тіркелу" },
  login_no_account: { ru: "Нет аккаунта?", en: "Don't have an account?", kk: "Аккаунтыңыз жоқ па?" },
  login_register_link: { ru: "Зарегистрироваться", en: "Register", kk: "Тіркелу" },

  // === Register Page ===
  register_title: { ru: "Создать аккаунт", en: "Create Account", kk: "Аккаунт жасау" },
  register_button: { ru: "Зарегистрироваться", en: "Register", kk: "Тіркелу" },
  register_have_account: { ru: "Уже есть аккаунт?", en: "Already have an account?", kk: "Аккаунтыңыз бар ма?" },
  register_login_link: { ru: "Войти", en: "Sign In", kk: "Кіру" },

  // === AI Chances ===
  ai_chances_title: { ru: "🤖 ИИ-прогноз поступления", en: "🤖 AI Admission Prediction", kk: "🤖 ЖИ қабылдау болжамы" },
  ai_chances_desc: { ru: "Нажмите кнопку ниже, чтобы ИИ проанализировал ваши результаты и показал шансы поступления", en: "Click the button below for AI to analyze your scores and show admission chances", kk: "ЖИ нәтижелеріңізді талдап, қабылдау мүмкіндіктерін көрсетуі үшін төмендегі батырманы басыңыз" },
  ai_chances_btn: { ru: "Анализировать шансы", en: "Analyze Chances", kk: "Мүмкіндіктерді талдау" },
  ai_chances_loading: { ru: "ИИ анализирует ваши результаты...", en: "AI is analyzing your scores...", kk: "ЖИ нәтижелеріңізді талдап жатыр..." },
  ai_chances_kz: { ru: "🇰🇿 Казахстан", en: "🇰🇿 Kazakhstan", kk: "🇰🇿 Қазақстан" },
  ai_chances_world: { ru: "🌍 Весь мир", en: "🌍 World Wide", kk: "🌍 Бүкіл әлем" },
  ai_chances_no_scores: { ru: "Сначала добавьте результаты тестов выше", en: "Add test scores above first", kk: "Алдымен жоғарыда тест нәтижелерін қосыңыз" },
  ai_chances_error: { ru: "Ошибка анализа. Убедитесь что Ollama запущен.", en: "Analysis error. Make sure Ollama is running.", kk: "Талдау қатесі. Ollama іске қосылғанын тексеріңіз." },
  ai_chances_chance: { ru: "Шанс", en: "Chance", kk: "Мүмкіндік" },
  ai_powered: { ru: "Анализ выполнен с помощью ИИ (Ollama)", en: "Analysis powered by AI (Ollama)", kk: "Талдау ЖИ (Ollama) арқылы жасалды" }
};

function applyTranslations(lang) {
  if (!lang) lang = localStorage.getItem('unimap_lang') || 'ru';

  // Translate all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][lang]) {
      el.textContent = translations[key][lang];
    }
  });

  // Translate all elements with data-i18n-placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[key] && translations[key][lang]) {
      el.placeholder = translations[key][lang];
    }
  });

  // Update HTML lang attribute
  const langMap = { ru: 'ru', en: 'en', kk: 'kk' };
  document.documentElement.lang = langMap[lang] || 'en';
}

// Auto-apply on load
document.addEventListener('DOMContentLoaded', function () {
  const lang = localStorage.getItem('unimap_lang') || 'ru';
  applyTranslations(lang);
});

// Also apply immediately if DOM is already loaded
if (document.readyState !== 'loading') {
  const lang = localStorage.getItem('unimap_lang') || 'ru';
  applyTranslations(lang);
}
