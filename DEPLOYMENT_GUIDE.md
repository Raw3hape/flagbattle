# 🚀 Руководство по онлайн запуску World Flag Battle

Это пошаговая инструкция как запустить игру полностью онлайн **БЕСПЛАТНО**.

## 📋 Что нам понадобится (всё бесплатно):

1. **GitHub аккаунт** - для хранения кода
2. **Supabase аккаунт** - для базы данных
3. **Vercel аккаунт** - для frontend
4. **Render аккаунт** - для backend
5. **Telegram бот** - от @BotFather

## 🔧 Пошаговая инструкция

### Шаг 1: Загрузка кода на GitHub

```bash
# В корне проекта
git init
git add .
git commit -m "Initial commit"

# Создайте репозиторий на GitHub и выполните:
git remote add origin https://github.com/YOUR_USERNAME/battlemap.git
git push -u origin main
```

### Шаг 2: База данных на Supabase (5 минут)

1. Зайдите на [supabase.com](https://supabase.com) и создайте аккаунт
2. Нажмите **"New project"**
3. Заполните:
   - Name: `battlemap`
   - Database Password: запишите его!
   - Region: выберите ближайший
4. Подождите создания (~2 минуты)
5. Перейдите в **Settings → Database**
6. Скопируйте **Connection string** (URI)
7. Замените `[YOUR-PASSWORD]` на ваш пароль

**Ваша DATABASE_URL будет выглядеть так:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
```

### Шаг 3: Backend на Render (10 минут)

1. Зайдите на [render.com](https://render.com) и создайте аккаунт
2. Нажмите **"New +" → "Web Service"**
3. Подключите GitHub и выберите ваш репозиторий
4. Настройки:
   - Name: `battlemap-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install && npm run build && npx prisma migrate deploy && npm run seed`
   - Start Command: `npm start`
5. Выберите **Free план**
6. Добавьте переменные окружения (Environment Variables):
   - `DATABASE_URL` = ваша строка из Supabase
   - `JWT_SECRET` = любая случайная строка (например: `my_super_secret_key_2024`)
   - `TELEGRAM_BOT_TOKEN` = токен от @BotFather (получите позже)
   - `FRONTEND_URL` = `https://battlemap.vercel.app` (замените на ваш)
   - `NODE_ENV` = `production`
7. Нажмите **"Create Web Service"**
8. Подождите деплоя (~5 минут)
9. Скопируйте URL вашего backend (например: `https://battlemap-backend.onrender.com`)

### Шаг 4: Frontend на Vercel (5 минут)

1. Зайдите на [vercel.com](https://vercel.com) и войдите через GitHub
2. Нажмите **"Add New..." → "Project"**
3. Импортируйте ваш GitHub репозиторий
4. Настройки:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
5. Добавьте переменные окружения:
   - `VITE_API_URL` = `https://battlemap-backend.onrender.com/api` (URL вашего backend)
   - `VITE_WS_URL` = `wss://battlemap-backend.onrender.com` (замените http на wss)
6. Нажмите **"Deploy"**
7. Подождите деплоя (~2 минуты)
8. Скопируйте URL вашего приложения (например: `https://battlemap.vercel.app`)

### Шаг 5: Telegram Bot (5 минут)

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot`
3. Придумайте имя (например: "World Flag Battle")
4. Придумайте username (например: `WorldFlagBattleBot`)
5. Скопируйте токен
6. Вернитесь в Render и добавьте токен в `TELEGRAM_BOT_TOKEN`
7. В BotFather настройте Mini App:
```
/mybots
Выберите вашего бота
Bot Settings → Menu Button
Введите название: Play 🎮
Введите URL: https://battlemap.vercel.app (ваш URL с Vercel)
```

### Шаг 6: Финальная настройка

1. **В Render**: Обновите переменную `FRONTEND_URL` с правильным URL из Vercel
2. **В Vercel**: Обновите переменные с правильным URL из Render
3. **Перезапустите сервисы**:
   - Render: Manual Deploy → Deploy latest commit
   - Vercel: Redeploy

## ✅ Готово! Проверка

1. Откройте вашего бота в Telegram
2. Нажмите кнопку меню "Play 🎮"
3. Игра должна открыться!

## 🆓 Бесплатные лимиты

- **Supabase**: 500MB базы данных, 2GB трафика
- **Render**: 750 часов в месяц (засыпает после 15 минут неактивности)
- **Vercel**: 100GB трафика в месяц
- **Итого**: 0$ в месяц для ~1000 активных игроков

## ⚠️ Важные моменты

1. **Render засыпает**: Бесплатный план Render засыпает после 15 минут неактивности. Первый запрос займет ~30 секунд.

2. **Решение**: Используйте [uptimerobot.com](https://uptimerobot.com) чтобы пинговать backend каждые 5 минут

3. **CORS**: Если есть проблемы с CORS, проверьте что `FRONTEND_URL` правильный

4. **WebSocket**: Убедитесь что используете `wss://` а не `ws://` для production

## 📱 Тестирование

1. Откройте бота на телефоне
2. Проверьте консоль браузера (Vercel Logs)
3. Проверьте логи backend (Render Dashboard)
4. Проверьте базу данных (Supabase Table Editor)

## 🔄 Обновление кода

```bash
git add .
git commit -m "Update"
git push

# Vercel и Render автоматически передеплоят
```

## 🆘 Если что-то не работает

1. **"Приложение должно быть открыто через Telegram"**
   - Проверьте TELEGRAM_BOT_TOKEN в Render
   - Убедитесь что открываете через бота, не напрямую

2. **"Cannot connect to server"**
   - Проверьте что backend запустился в Render
   - Проверьте DATABASE_URL
   - Подождите 30 секунд (Render просыпается)

3. **База данных не работает**
   - Проверьте пароль в DATABASE_URL
   - Запустите миграции вручную в Render Shell

## 🎉 Поздравляю!

Ваша игра теперь работает полностью онлайн и доступна всем пользователям Telegram!

**Поделитесь ботом**: `https://t.me/YOUR_BOT_USERNAME`