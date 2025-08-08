# 🚀 РУКОВОДСТВО ПО РАЗВЕРТЫВАНИЮ

## 📋 ПОЛНЫЙ ПРОЦЕСС ДЕПЛОЯ С НУЛЯ

### Предварительные требования:
- GitHub аккаунт
- Telegram бот (создан через @BotFather)
- Email для регистрации в сервисах

## 1️⃣ SUPABASE - База данных

### Регистрация и создание проекта:
1. Перейти на https://supabase.com
2. Зарегистрироваться через GitHub
3. Создать новый проект:
   - Project name: `flagbattle`
   - Database Password: `FlagBattle2024!` (или свой)
   - Region: `West US (North California)`

### Получение строки подключения:
1. Settings → Database
2. Connection string → URI
3. Скопировать и заменить `[YOUR-PASSWORD]` на ваш пароль
4. Сохранить как DATABASE_URL

### Создание таблиц:
1. SQL Editor → New Query
2. Вставить содержимое `supabase_migration.sql`
3. Run
4. Затем выполнить `enable_rls.sql` для настройки прав

## 2️⃣ RENDER - Backend

### Развертывание:
1. Перейти на https://render.com
2. Зарегистрироваться через GitHub
3. New → Web Service
4. Connect GitHub repository → выбрать `flagbattle`
5. Настройки:
   - Name: `flagbattle-backend`
   - Root Directory: `backend`
   - Build Command: `npm install && npx prisma generate`
   - Start Command: `npx ts-node --transpile-only src/server.ts`

### Environment Variables:
```
DATABASE_URL = [из Supabase]
JWT_SECRET = supersecret_flagbattle_2024_jwt_key_8213774739
TELEGRAM_BOT_TOKEN = [ваш токен бота]
FRONTEND_URL = https://flagbattle-navy.vercel.app
NODE_ENV = production
```

### Важно:
- Сервис может засыпать после 15 минут неактивности
- Первый запуск может занять 5-10 минут

## 3️⃣ VERCEL - Frontend

### Развертывание:
1. Перейти на https://vercel.com
2. Import Project → Import Git Repository
3. Выбрать репозиторий `flagbattle`
4. Настройки:
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Node.js Version: 18.x

### Environment Variables:
```
VITE_API_URL = https://flagbattle-backend.onrender.com/api
VITE_WS_URL = wss://flagbattle-backend.onrender.com
```

## 4️⃣ TELEGRAM BOT - Настройка

### Создание бота (если еще нет):
1. Открыть @BotFather в Telegram
2. `/newbot`
3. Выбрать имя и username
4. Сохранить токен

### Настройка Web App:
1. `/mybots`
2. Выбрать вашего бота
3. Bot Settings → Menu Button → Configure menu button
4. Указать:
   - Button text: `🎮 Играть`
   - URL: `https://flagbattle-navy.vercel.app`

## 📊 МОНИТОРИНГ И ОБСЛУЖИВАНИЕ

### Проверка статуса:
- **Backend:** https://[your-backend].onrender.com/health
- **Frontend:** https://[your-frontend].vercel.app
- **База данных:** Supabase Dashboard → Database

### Обновление кода:
```bash
# Внести изменения
git add .
git commit -m "Update description"
git push

# Автоматический деплой через 2-3 минуты
```

### Логи и отладка:
- **Render:** Dashboard → Logs
- **Vercel:** Dashboard → Functions → Logs
- **Supabase:** Dashboard → Logs

## ⚠️ ЧАСТЫЕ ПРОБЛЕМЫ

### Backend не отвечает:
1. Проверить логи Render
2. Убедиться что DATABASE_URL правильный
3. Перезапустить сервис вручную

### Frontend показывает "Подключение...":
1. Проверить что backend запущен
2. Проверить VITE_API_URL и VITE_WS_URL
3. Открыть консоль браузера для деталей

### База данных не работает:
1. Проверить что таблицы созданы
2. Проверить RLS политики
3. Проверить строку подключения

## 💰 СТОИМОСТЬ

### Бесплатные лимиты:
- **Supabase:** 500MB БД, 2GB трафик/месяц
- **Render:** 750 часов/месяц, засыпает после 15 мин
- **Vercel:** 100GB трафик/месяц, неограниченные деплои

### Рекомендации для production:
- Render: Обновить на Starter ($7/месяц) чтобы не засыпал
- Supabase: При росте пользователей - Pro план ($25/месяц)
- Vercel: Обычно бесплатного плана достаточно

## 📝 ЧЕКЛИСТ ДЕПЛОЯ

- [ ] GitHub репозиторий создан и код запушен
- [ ] Supabase проект создан
- [ ] База данных настроена (таблицы созданы)
- [ ] Render backend развернут
- [ ] Environment variables настроены в Render
- [ ] Vercel frontend развернут
- [ ] Environment variables настроены в Vercel
- [ ] Telegram бот настроен
- [ ] Кнопка Web App добавлена
- [ ] Тестирование в Telegram пройдено

---

*Последнее обновление: 8 августа 2025*