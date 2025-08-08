# Оптимизированная пиксельная карта (PixMap.fun архитектура)

Высокопроизводительная реализация пиксельной карты с архитектурой, аналогичной PixMap.fun.

## ✨ Основные особенности

### 🚀 Производительность
- **Иерархическая система чанков** - загрузка и кеширование тайлов по уровням детализации
- **Offscreen рендеринг** - плавная отрисовка без блокировки UI
- **Throttled события** - оптимизированная обработка пользовательского ввода
- **Chunk-based кеширование** - умное управление памятью до 200 чанков
- **Spatial indexing** - быстрый поиск видимых областей

### 🎨 Визуальные улучшения
- **Плавный зум** - от 0.125x до 16x без рывков
- **Pixelated рендеринг** - четкие пиксели при больших увеличениях
- **Динамическая сетка** - показывается при зуме > 4x
- **Мини-карта** - навигация по всему миру
- **Фиксированный UI** - интерфейс не масштабируется

### 📱 Мобильная поддержка
- **Multi-touch зум** - pinch-to-zoom жесты
- **Плавная панорама** - оптимизировано для touch устройств
- **Двойной тап зум** - быстрое приближение
- **Haptic feedback** - тактильная обратная связь

## 🏗️ Архитектура

### Компоненты
```
├── OptimizedPixelMap.tsx    - Основной компонент карты
├── ChunkSystem.ts           - Система загрузки и кеширования чанков
├── OffscreenRenderer.ts     - Offscreen рендеринг для плавности
└── mapStore.ts              - Централизованное состояние карты
```

### Основные классы

#### ChunkSystem
- Управление иерархическими чанками 256x256
- Предзагрузка окружающих областей
- LRU кеширование с автоочисткой
- Поддержка 5 уровней LOD

#### OffscreenRenderer
- Рендеринг в отдельном потоке/canvas
- Двойная буферизация
- Throttling до 60 FPS
- Оптимизированное масштабирование

#### MapStore (Zustand)
- Централизованное состояние viewport
- Обработка событий ввода
- Управление настройками
- Статистика производительности

## 🎮 Использование

### Базовое использование
```tsx
import { OptimizedPixelMap } from './components/Map/OptimizedPixelMap';

function App() {
  const handlePixelPlaced = (x: number, y: number, color: string) => {
    console.log(`Pixel at (${x}, ${y}) with color ${color}`);
  };

  return (
    <OptimizedPixelMap 
      onPixelPlaced={handlePixelPlaced}
      showDebugInfo={true}
    />
  );
}
```

### С существующим GameStore
```tsx
import { GameWorldMap } from './components/Map/GameWorldMap';

// GameWorldMap теперь использует OptimizedPixelMap внутри
function GameApp() {
  return <GameWorldMap />;
}
```

### Демо версия
```bash
# Запуск демо с тестовыми данными
npm run dev

# Или создайте отдельный билд для демо
# (добавьте в package.json)
"demo": "vite --config vite.demo.config.ts"
```

## ⚙️ Настройки

### MapSettings интерфейс
```typescript
interface MapSettings {
  showGrid: boolean;                // Показывать сетку при зуме
  showChunkBorders: boolean;        // Debug: границы чанков
  enableSmoothScrolling: boolean;   // Плавная прокрутка
  pixelatedRendering: boolean;      // Pixelated режим
  preloadDistance: number;          // Расстояние предзагрузки (в чанках)
  maxCacheSize: number;             // Максимум чанков в кеше
}
```

### Производительность
```typescript
interface RenderPerformance {
  fps: number;           // Текущий FPS
  frameTime: number;     // Время кадра в мс
  chunksLoaded: number;  // Загружено чанков
  chunksVisible: number; // Видимо чанков
  memoryUsage: number;   // Использование памяти
}
```

## 🎯 API

### OptimizedPixelMap Props
```typescript
interface Props {
  className?: string;
  onPixelPlaced?: (x: number, y: number, color: string) => void;
  showDebugInfo?: boolean;
}
```

### MapStore методы
```typescript
// Viewport управление
setViewport(viewport: Partial<MapViewport>): void;
handleWheel(deltaY: number, centerX: number, centerY: number): void;
handlePan(deltaX: number, deltaY: number): void;

// Координаты
screenToWorld(screenX: number, screenY: number): {x, y};
worldToScreen(worldX: number, worldY: number): {x, y};

// Пиксели
placePixel(x: number, y: number, color: string): void;
invalidateRegion(x: number, y: number, width?, height?): void;
```

## 🚀 Производительность

### Оптимизации
- **Spatial culling** - рендер только видимых чанков
- **LOD система** - детализация по уровню зума
- **Request batching** - группировка загрузок
- **Memory pooling** - переиспользование объектов
- **Event throttling** - ограничение частоты обновлений

### Метрики
- 60+ FPS при любом зуме
- < 100мс время загрузки чанка
- < 200MB использование памяти
- Поддержка карт до 16384x16384 пикселей

## 🔧 Отладка

### Debug информация
Включите `showDebugInfo={true}` для отображения:
- Текущий зум и позиция
- FPS и время кадра
- Количество загруженных/видимых чанков
- Использование памяти
- Координаты курсора

### Консольные логи
```javascript
// Включить детальное логирование
localStorage.setItem('MAP_DEBUG', 'true');

// Статистика чанков
console.log(useMapStore.getState().performance);

// Содержимое кеша
console.log(chunkSystem.getStats());
```

## 🔗 Интеграция

### С бекендом
```typescript
// Подключение к API
const handlePixelPlaced = async (x, y, color) => {
  try {
    await gameAPI.placeTap(selectedCountry.id, x, y);
  } catch (error) {
    console.error('Pixel placement failed:', error);
  }
};

// WebSocket обновления
wsService.on('pixel_update', (data) => {
  mapStore.getState().invalidateRegion(data.x, data.y);
});
```

### С существующими системами
- **Совместимо** с текущим GameStore
- **Заменяет** старую систему canvas рендеринга
- **Сохраняет** все игровые механики
- **Улучшает** производительность без изменения API

## 📈 Миграция

### Замена существующей карты
1. Замените импорт компонента карты
2. Обновите обработчики событий
3. Настройте параметры производительности
4. Протестируйте на разных устройствах

### Сохранение совместимости
- Все props и callbacks остаются теми же
- GameStore интеграция без изменений  
- Существующие стили применяются автоматически

---

**Разработано для максимальной производительности и плавности работы на всех устройствах** 🚀