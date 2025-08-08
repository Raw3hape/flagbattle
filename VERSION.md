# 📦 ВЕРСИИ ПРОЕКТА

## v0.1.0 - MVP Release (8 августа 2025)

### ✅ Статус: Стабильная версия

**Git Tag:** `v0.1.0`
**Commit:** `dc479f9`

### Функциональность:
- ✅ Авторизация через Telegram Mini App
- ✅ Выбор страны при первом входе
- ✅ Интерактивная карта мира с флагами
- ✅ Система энергии (50/100)
- ✅ Размещение пикселей флага на карте
- ✅ Реалтайм синхронизация через WebSocket
- ✅ Сохранение прогресса в базе данных
- ✅ Мультиязычная поддержка (RU/EN/ES)
- ✅ Debug режим для тестирования

### Технологии:
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, Prisma ORM
- **База данных:** PostgreSQL (Supabase)
- **Реалтайм:** Socket.io
- **Деплой:** Vercel (frontend) + Render (backend)

### Как откатиться к этой версии:

```bash
# Вариант 1: Переключиться на тег
git checkout v0.1.0

# Вариант 2: Создать новую ветку от этой версии
git checkout -b rollback-v0.1.0 v0.1.0

# Вариант 3: Полный сброс к версии (ОСТОРОЖНО!)
git reset --hard v0.1.0
```

### Как восстановить после отката:

```bash
# Вернуться на основную ветку
git checkout main

# Обновить до последней версии
git pull origin main
```

### Резервная копия базы данных:

Для полного восстановления также сохраните:
1. Экспорт структуры БД: `supabase_migration.sql`
2. Переменные окружения из Render и Vercel
3. Настройки Telegram бота

### Важные URL:
- **GitHub Release:** https://github.com/Raw3hape/flagbattle/releases/tag/v0.1.0
- **Frontend:** https://flagbattle-navy.vercel.app
- **Backend:** https://flagbattle-kpph.onrender.com
- **Telegram Bot:** @Flagbattle_bot

---

## Будущие версии:

### v0.2.0 (планируется)
- [ ] Магазин энергии
- [ ] Таблица лидеров
- [ ] Ежедневные бонусы
- [ ] Анимации и эффекты

### v0.3.0 (планируется)
- [ ] VIP статус
- [ ] Сезоны и награды
- [ ] Достижения
- [ ] Социальные функции