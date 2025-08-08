# 🎮 ПОСЛЕДНИЕ ШАГИ ДЛЯ ЗАПУСКА ИГРЫ!

## ✅ Что уже готово:
- ✅ Frontend развернут: **https://flagbattle-navy.vercel.app**
- ✅ Backend развернут: **https://flagbattle-kpph.onrender.com**
- ✅ Код на GitHub: **https://github.com/Raw3hape/flagbattle**

## ⚠️ ВАЖНО! Осталось 3 простых шага:

---

## 1️⃣ СОЗДАТЬ ТАБЛИЦЫ В БАЗЕ ДАННЫХ (2 минуты)

### Шаг 1: Откройте Supabase
👉 https://supabase.com/dashboard

### Шаг 2: Выберите ваш проект `flagbattle`

### Шаг 3: Нажмите **SQL Editor** (слева в меню)

### Шаг 4: Нажмите кнопку **New Query**

### Шаг 5: Скопируйте ВСЁ содержимое файла:
```
/Users/nikita/Desktop/Apps/BattleMap/supabase_migration.sql
```

### Шаг 6: Вставьте в редактор

### Шаг 7: Нажмите **RUN** (зеленая кнопка справа)

### Шаг 8: Дождитесь сообщения "Success. No rows returned"

---

## 2️⃣ ОБНОВИТЬ FRONTEND_URL В RENDER (1 минута)

### Шаг 1: Откройте Render Dashboard
👉 https://dashboard.render.com

### Шаг 2: Выберите сервис `flagbattle-kpph` (или `flagbattle-backend`)

### Шаг 3: Нажмите **Environment** (слева в меню)

### Шаг 4: Найдите переменную `FRONTEND_URL`

### Шаг 5: Измените значение на:
```
https://flagbattle-navy.vercel.app
```

### Шаг 6: Нажмите **Save Changes**

### Шаг 7: Дождитесь перезапуска (займет 30 секунд)

---

## 3️⃣ НАСТРОИТЬ КНОПКУ В TELEGRAM БОТЕ (1 минута)

### Шаг 1: Откройте Telegram

### Шаг 2: Найдите бота @BotFather

### Шаг 3: Отправьте эти команды по очереди:
```
/mybots
```
Выберите: **@Flagbattle_bot**

```
Bot Settings
```

```
Menu Button
```

```
Configure menu button
```

### Шаг 4: Когда бот попросит ввести текст кнопки:
```
🎮 Играть
```

### Шаг 5: Когда бот попросит ввести URL:
```
https://flagbattle-navy.vercel.app
```

---

## 🎉 ГОТОВО! ИГРА ЗАПУЩЕНА!

### Как проверить:
1. Откройте Telegram
2. Найдите вашего бота: **@Flagbattle_bot**
3. Нажмите кнопку **🎮 Играть**
4. Игра должна открыться!

---

## 🔧 Если что-то не работает:

### "Ошибка подключения к серверу":
- Проверьте что выполнили SQL миграцию в Supabase
- Проверьте что обновили FRONTEND_URL в Render
- Подождите 1-2 минуты пока Render перезапустится

### "База данных не отвечает":
- Убедитесь что SQL миграция выполнена успешно
- Проверьте DATABASE_URL в Render

### "Белый экран":
- Очистите кеш браузера в Telegram
- Попробуйте открыть в другом браузере

---

## 📊 Панели управления:

- **GitHub:** https://github.com/Raw3hape/flagbattle
- **Frontend (Vercel):** https://vercel.com/dashboard
- **Backend (Render):** https://dashboard.render.com
- **База данных (Supabase):** https://supabase.com/dashboard
- **Telegram бот:** https://t.me/Flagbattle_bot

---

## 🚀 Для обновления игры в будущем:

1. Внесите изменения в код
2. Выполните команды:
```bash
git add .
git commit -m "Описание изменений"
git push
```
3. Vercel и Render автоматически обновятся!

---

## ✨ Поздравляю! Ваша игра World Flag Battle готова!