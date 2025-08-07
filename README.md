# 🌍 World Flag Battle - Telegram Mini App

Многопользовательская игра для Telegram, где игроки заполняют территорию своей страны пикселями в цветах национального флага.

## 🎮 Концепция игры

- Игроки выбирают свою страну и работают вместе с соотечественниками
- Каждый тап размещает пиксель на карте
- Можно атаковать другие страны, перекрашивая их пиксели
- Цель - заполнить свою страну быстрее других
- Энергия ограничивает количество тапов (восстанавливается со временем)

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- PostgreSQL (или используйте бесплатный тир Supabase)
- Telegram Bot Token (получите у @BotFather)

### 1. Настройка базы данных

#### Вариант A: Локальная PostgreSQL
```bash
# Установите PostgreSQL если еще не установлен
# macOS: brew install postgresql
# Ubuntu: sudo apt install postgresql

# Создайте базу данных
createdb battlemap
```

#### Вариант B: Supabase (Рекомендуется для начала)
1. Зарегистрируйтесь на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Скопируйте Database URL из Settings → Database

### 2. Настройка Backend

```bash
cd backend

# Установка зависимостей
npm install

# Настройка окружения
# Отредактируйте файл .env:
# - DATABASE_URL - ваша строка подключения к БД
# - JWT_SECRET - любая случайная строка (например: "my_super_secret_key_123")
# - TELEGRAM_BOT_TOKEN - токен вашего бота от @BotFather

# Создание таблиц в БД
npx prisma generate
npx prisma migrate dev --name init

# Заполнение начальными данными (страны)
npm run seed

# Запуск сервера
npm run dev
```

Сервер запустится на http://localhost:3001

### 3. Настройка Frontend

```bash
cd frontend

# Установка зависимостей
npm install

# Создайте файл .env.local
echo "VITE_API_URL=http://localhost:3001/api" > .env.local
echo "VITE_WS_URL=ws://localhost:3001" >> .env.local

# Запуск приложения
npm run dev
```

Приложение откроется на http://localhost:5173

### 4. Настройка Telegram Bot

1. Откройте @BotFather в Telegram
2. Создайте нового бота: `/newbot`
3. Сохраните токен и добавьте его в backend/.env
4. Настройте Mini App:
```
/setmenubutton
Выберите вашего бота
Название кнопки: Play World Flag Battle
URL: https://your-app.vercel.app (или используйте ngrok для тестирования)
```

### 5. Тестирование локально с ngrok

```bash
# Установка ngrok
npm install -g ngrok

# Запуск туннеля
ngrok http 5173

# Используйте полученный HTTPS URL в настройках бота
```

## 📱 Структура проекта

```
BattleMap/
├── frontend/          # React приложение
│   ├── src/
│   │   ├── components/   # UI компоненты
│   │   ├── hooks/        # React hooks
│   │   ├── services/     # API сервисы
│   │   ├── store/        # Zustand store
│   │   └── locales/      # Переводы
│   └── public/
│
├── backend/           # Node.js сервер
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── websocket/    # Real-time логика
│   │   └── utils/        # Утилиты
│   └── prisma/           # Схема БД
│
└── docs/             # Документация
```

## 🎯 Основные функции

✅ **Реализовано:**
- Авторизация через Telegram
- Выбор страны из полного списка
- Canvas карта с zoom/pan
- Система энергии с восстановлением
- Real-time синхронизация через WebSocket
- Атака на другие страны
- Лидерборд
- Мультиязычность (EN/RU/ES)
- Haptic feedback
- Ежедневные бонусы

🚧 **В разработке:**
- Telegram Stars платежи
- VIP подписка
- Сезоны и награды
- Достижения
- Альянсы стран

## 🛠 Технологии

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Zustand (state)
- Socket.io-client
- i18next (локализация)

**Backend:**
- Node.js + Express
- Socket.io
- Prisma ORM
- PostgreSQL
- JWT auth

## 🚀 Деплой

### Frontend на Vercel

1. Push код на GitHub
2. Импортируйте проект в [Vercel](https://vercel.com)
3. Добавьте переменные окружения:
   - `VITE_API_URL` - URL вашего backend
   - `VITE_WS_URL` - WebSocket URL

### Backend на Railway/Render

1. Создайте проект на [Railway](https://railway.app) или [Render](https://render.com)
2. Подключите GitHub репозиторий
3. Добавьте переменные окружения из .env
4. Добавьте PostgreSQL addon

### База данных на Supabase

1. Создайте проект на [Supabase](https://supabase.com)
2. Скопируйте Database URL
3. Запустите миграции:
```bash
DATABASE_URL="ваш_url" npx prisma migrate deploy
DATABASE_URL="ваш_url" npm run seed
```

## 📊 Оптимизация

- **Canvas рендеринг**: Используется offscreen canvas для батчинга
- **WebSocket батчинг**: Тапы отправляются пакетами каждые 2 секунды
- **Lazy loading**: Компоненты загружаются по требованию
- **Кеширование**: Service Worker для офлайн режима

## 🐛 Решение проблем

### "Приложение должно быть открыто через Telegram"
- В development режиме можно временно отключить проверку в `backend/src/utils/telegram.ts`

### WebSocket не подключается
- Проверьте CORS настройки в `backend/src/server.ts`
- Убедитесь что используете правильный протокол (ws:// или wss://)

### База данных не подключается
- Проверьте DATABASE_URL в .env
- Для Supabase добавьте `?pgbouncer=true` в конец URL

## 📝 Лицензия

MIT

## 🤝 Вклад

Приветствуются Pull Requests!

## 📧 Контакты

Telegram: @your_username

---

**Важно:** Не забудьте изменить секретные ключи перед деплоем в production!