# Компоненты карты мира BattleMap

## Обзор

Создана полноценная система карты мира для игры BattleMap с системой Fog of War, анимациями и системой частиц.

## Структура файлов

### Основные компоненты

- **`/src/components/Map/GameWorldMap.tsx`** - Главный компонент карты мира
- **`/src/components/Map/MapDemo.tsx`** - Демо компонент для тестирования

### Утилиты

- **`/src/utils/worldData.ts`** - Данные карты мира и конфигурация
- **`/src/utils/mapHelpers.ts`** - Помощники для работы с картой
- **`/src/utils/particleSystem.ts`** - Система частиц для эффектов

## Основные возможности

### 🌍 Карта мира
- Реальные границы стран (готова для интеграции с TopoJSON)
- Интерактивное панорамирование и зум
- Оптимизированный рендеринг на Canvas
- Поддержка мобильных жестов

### 🌫️ Fog of War система
- Изначально серая/белая карта
- Постепенное закрашивание при тапах
- Плавные переходы между состояниями
- Система прогресса от 0% до 100%

### ✨ Анимации и эффекты
- Ripple эффект при тапах
- Система частиц с взрывами цвета страны
- Плавные анимации прогресса закрашивания
- Мерцающие искры при завоевании

### 🚀 Производительность
- Multi-layer Canvas архитектура
- Оптимизация для мобильных устройств
- Throttling для touch событий
- Система кеширования рендеринга

## Архитектура

### Canvas слои
1. **Background Canvas** - Статичный контент (страны, фон)
2. **Effects Canvas** - Динамические эффекты (частицы, ripples)
3. **Main Canvas** - Композиция всех слоев

### Менеджеры
- **`FogOfWarManager`** - Управление исследованными областями
- **`ProgressAnimator`** - Анимация прогресса закрашивания
- **`ParticleSystem`** - Система частиц и эффектов
- **`MapTransformHelper`** - Трансформации координат

## Использование

### Основное использование
```tsx
import { GameWorldMap } from './components/Map/GameWorldMap';

function MyApp() {
  return (
    <div className="h-screen">
      <GameWorldMap />
    </div>
  );
}
```

### Демо режим
```tsx
import { MapDemo } from './components/Map/MapDemo';

function DemoApp() {
  return <MapDemo />;
}
```

## Конфигурация

### Настройки карты (MAP_CONFIG)
```typescript
export const MAP_CONFIG = {
  WIDTH: 1600,           // Ширина карты
  HEIGHT: 800,           // Высота карты
  MIN_ZOOM: 0.5,         // Минимальный зум
  MAX_ZOOM: 8,           // Максимальный зум
  
  // Анимации
  TAP_ANIMATION_DURATION: 800,     // Длительность анимации тапа
  PROGRESS_ANIMATION_SPEED: 0.02,  // Скорость анимации прогресса
  PARTICLE_COUNT: 12,              // Количество частиц
  
  // Fog of War
  FOG_ALPHA: 0.8,               // Прозрачность тумана
  PROGRESS_SEGMENTS: 20,        // Сегменты анимации
};
```

## Интеграция с backend

### API вызовы
- `gameAPI.placeTap(countryId, x, y)` - Размещение тапа
- `wsService.sendTap(countryId, x, y)` - WebSocket отправка

### Store интеграция
- `useGameStore()` - Zustand store для состояния игры
- Автоматическая синхронизация с состоянием приложения

## Эффекты

### Система частиц
- **Взрыв частиц** при тапе
- **Следы** при движении
- **Искры** при завоевании территории
- **Энергетические эффекты**

### Анимации
- **Ripple эффект** с расходящимися кругами
- **Прогрессивное закрашивание** территорий
- **Плавные переходы** между состояниями

## Производительность

### Оптимизации
- Canvas rendering с multiple layers
- Throttled touch events (16ms)
- Debounced heavy operations
- Constrained transform calculations
- Particle pooling system

### Мониторинг
- FPS counter в debug режиме
- Particle count monitoring
- Frame time tracking

## Будущие улучшения

### Планируемые возможности
1. **Реальные TopoJSON данные** - Интеграция с Natural Earth
2. **Векторные тайлы** - Для лучшей производительности
3. **Кластеризация частиц** - При большом количестве
4. **Адаптивное качество** - В зависимости от производительности
5. **Офлайн кеширование** - Для работы без интернета

### Техническая интеграция
- WebGL renderer для лучшей производительности
- Worker threads для тяжелых вычислений
- IndexedDB для локального кеширования
- Service Worker для офлайн режима

## Отладка

### Debug информация
- Zoom level и координаты
- FPS counter
- Particle count
- Touch events logging

### Консольные команды
```javascript
// В консоли браузера
window.gameMap = {
  clearFog: () => fogManager.clear(),
  addParticles: (x, y) => particleSystem.createTapExplosion(x, y, '#ff0000'),
  setProgress: (country, progress) => progressAnimator.setTarget(country, progress)
};
```