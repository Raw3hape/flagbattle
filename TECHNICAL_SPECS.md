# 🔧 TECHNICAL SPECIFICATIONS - BattleMap

## 📊 Архитектура приложения

### 🎯 Концепция игры
**BattleMap** - многопользовательская игра в Telegram WebApp, где игроки захватывают территории на пиксельной карте мира, представляя свои страны.

### 🏗️ Архитектура системы

```
┌─────────────────────────────────────────────────────┐
│                   Telegram App                       │
│                    (WebView)                         │
└──────────────────────┬──────────────────────────────┘
                       │
                    HTTPS/WSS
                       │
┌──────────────────────┴──────────────────────────────┐
│                  Vercel (Frontend)                   │
│                 React + TypeScript                   │
│              https://flagbattle-navy.vercel.app      │
└──────────────────────┬──────────────────────────────┘
                       │
                  API/WebSocket
                       │
┌──────────────────────┴──────────────────────────────┐
│                 Render.com (Backend)                 │
│                   Node.js + Express                  │
│           https://flagbattle-kpph.onrender.com       │
└──────────────────────┬──────────────────────────────┘
                       │
                  PostgreSQL
                       │
┌──────────────────────┴──────────────────────────────┐
│                    Supabase                          │
│                  Database + Auth                     │
└──────────────────────────────────────────────────────┘
```

## 🗺️ Система пиксельной карты (планируется)

### Спецификации карты:
```javascript
const MAP_SPECIFICATIONS = {
  // Размеры
  fullSize: 16384,        // 16k x 16k пикселей
  tileSize: 256,          // Размер одного тайла
  totalTiles: 64 * 64,    // 4096 тайлов
  
  // Уровни детализации (LOD)
  zoomLevels: [
    { level: 0, scale: 1/16, tiles: 4 },    // Весь мир в 4 тайлах
    { level: 1, scale: 1/8,  tiles: 16 },   // Континенты
    { level: 2, scale: 1/4,  tiles: 64 },   // Регионы
    { level: 3, scale: 1/2,  tiles: 256 },  // Страны
    { level: 4, scale: 1,    tiles: 1024 }, // Полная детализация
  ],
  
  // Память
  pixelSize: 4,           // RGBA
  maxMemory: "50MB",      // Для видимых тайлов
  cacheSize: "100MB",     // LocalStorage/IndexedDB
}
```

### Тайловая система:
```javascript
// Каждый тайл идентифицируется
interface Tile {
  z: number;  // Zoom level (0-4)
  x: number;  // X координата тайла
  y: number;  // Y координата тайла
  pixels: Uint8ClampedArray; // 256x256x4 bytes
}

// URL для загрузки тайла
GET /api/tiles/{z}/{x}/{y}
```

### Оптимизации производительности:

1. **Viewport Culling**
   - Загружаем только видимые тайлы
   - Предзагрузка соседних тайлов
   - Выгрузка дальних тайлов

2. **Progressive Loading**
   - Сначала загружаем низкое разрешение
   - Постепенно подгружаем детали
   - Приоритет центральным тайлам

3. **Кеширование**
   ```javascript
   // Многоуровневое кеширование
   Memory Cache (50MB) -> IndexedDB (100MB) -> Server
   ```

4. **WebSocket оптимизации**
   ```javascript
   // Батчинг обновлений
   {
     type: "pixel_batch",
     updates: [
       { x: 1000, y: 2000, color: "#FF0000" },
       { x: 1001, y: 2000, color: "#FF0000" },
       // ... до 100 пикселей в батче
     ],
     timestamp: 1234567890
   }
   ```

## 💾 База данных

### Схема Prisma:
```prisma
model User {
  id            String    @id @default(cuid())
  telegramId    String    @unique
  username      String?
  countryId     String?
  energy        Int       @default(100)
  maxEnergy     Int       @default(100)
  level         Int       @default(1)
  experience    Int       @default(0)
  coins         Int       @default(0)
  pixelsPlaced  Int       @default(0)
}

model Country {
  id           String   @id @default(cuid())
  code         String   @unique
  name         String
  nameRu       String
  color        String
  totalPixels  Int      @default(0)
  controlledPixels Int  @default(0)
}

model Pixel {
  id          String   @id @default(cuid())
  x           Int
  y           Int
  color       String
  countryId   String
  userId      String
  placedAt    DateTime @default(now())
  
  @@unique([x, y])
  @@index([countryId])
}

model Chunk {
  id          String   @id @default(cuid())
  x           Int      // Chunk X (0-63)
  y           Int      // Chunk Y (0-63)
  data        Bytes    // Compressed pixel data
  version     Int      @default(0)
  updatedAt   DateTime @updatedAt
  
  @@unique([x, y])
}
```

## 🔌 WebSocket протокол

### События от клиента:
```typescript
// Подписка на область карты
{
  type: "subscribe",
  viewport: {
    x: 1000,
    y: 2000,
    width: 1024,
    height: 768,
    zoom: 2
  }
}

// Размещение пикселя
{
  type: "place_pixel",
  x: 5000,
  y: 3000,
  color: "#FF0000"
}
```

### События от сервера:
```typescript
// Обновление пикселей
{
  type: "pixels_update",
  pixels: [
    { x: 5000, y: 3000, color: "#FF0000", userId: "123" }
  ]
}

// Обновление энергии
{
  type: "energy_update",
  current: 95,
  max: 100,
  nextRestore: "2025-01-08T10:00:00Z"
}
```

## 🎮 Игровые механики

### Система энергии:
- Начальная энергия: 100
- Расход: 1 за пиксель
- Восстановление: 1 каждые 30 секунд
- VIP бонус: x2 скорость восстановления

### Территориальный контроль:
```javascript
// Расчет контроля территории
function calculateControl(countryId) {
  const totalPixels = getCountryPixels(countryId);
  const controlledPixels = getControlledPixels(countryId);
  return (controlledPixels / totalPixels) * 100;
}
```

### Fog of War:
- Неисследованные области: серые
- Исследованные но не контролируемые: полупрозрачные
- Контролируемые: полный цвет страны

## 🚀 Планы развития

### Phase 1: Базовая карта (текущая)
- ✅ Simple canvas карта
- ✅ Базовая механика кликов
- ✅ Система энергии

### Phase 2: Пиксельная карта (в разработке)
- ⏳ Тайловая система
- ⏳ LOD для зума
- ⏳ Real-time обновления

### Phase 3: Расширенные механики
- 📋 Альянсы и команды
- 📋 События и бонусы
- 📋 Достижения
- 📋 Внутриигровая валюта

### Phase 4: Социальные функции
- 📋 Чат команды
- 📋 Глобальный чат
- 📋 Система друзей
- 📋 Турниры

## 📱 Telegram WebApp особенности

### Capabilities:
- ✅ Full Canvas API support
- ✅ WebSocket support
- ✅ LocalStorage/IndexedDB
- ✅ Touch events
- ✅ Device orientation

### Limitations:
- iOS Safari: 384MB canvas memory limit
- Initial window size (need expand())
- No background execution
- Limited to 50MB localStorage

### Optimization strategies:
```javascript
// Для iOS Safari
if (isIOS()) {
  // Лимит одновременных канвасов
  MAX_CANVAS_COUNT = 5;
  // Агрессивная очистка памяти
  CLEANUP_INTERVAL = 30000;
}

// Для Android
if (isAndroid()) {
  // Можем позволить больше
  MAX_CANVAS_COUNT = 10;
  CLEANUP_INTERVAL = 60000;
}
```

---

*Версия спецификации: 1.0.0*
*Дата: Январь 2025*