import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WorldMap } from './components/Map/WorldMap';
import { CountrySelect } from './components/CountrySelect';
import { EnergyBar } from './components/UI/EnergyBar';
import { useGameStore } from './store/gameStore';
import { useTelegram } from './hooks/useTelegram';
import { authAPI, gameAPI } from './services/api';
import wsService from './services/websocket';
import './locales/i18n';

function App() {
  const { t } = useTranslation();
  const { webApp, user: tgUser, initData } = useTelegram();
  const {
    user,
    selectedCountry,
    isLoading,
    isConnected,
    error,
    setUser,
    setSelectedCountry,
    setCountries,
    setLoading,
    setError,
    addPixels,
  } = useGameStore();

  const [showCountrySelect, setShowCountrySelect] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Инициализация
  useEffect(() => {
    const init = async () => {
      console.log('🚀 App init started');
      try {
        setLoading(true);
        
        // DEBUG MODE - работаем без Telegram
        let authData = initData;
        
        if (!authData) {
          console.warn('⚠️ DEBUG MODE: No Telegram data, using test user');
          // Создаем тестовые данные для отладки
          authData = btoa(JSON.stringify({
            user: {
              id: 123456789,
              first_name: 'Test',
              last_name: 'User',
              username: 'testuser',
              language_code: 'ru'
            },
            auth_date: Math.floor(Date.now() / 1000),
            hash: 'test_hash'
          }));
        } else {
          console.log('✅ Telegram data found:', authData);
        }

        console.log('🔐 Attempting login...');
        const { token, user: authUser } = await authAPI.loginWithTelegram(authData);
        console.log('✅ Login successful:', authUser);
        setUser(authUser);

        // Подключение WebSocket
        console.log('🔌 Connecting WebSocket...');
        wsService.connect(token);

        // Загрузка данных игры
        console.log('📊 Loading game data...');
        const [countries, mapData] = await Promise.all([
          gameAPI.getCountries(),
          gameAPI.getMapData(),
        ]);
        console.log('✅ Countries loaded:', countries.length);
        console.log('✅ Pixels loaded:', mapData.pixels?.length || 0);

        setCountries(countries);
        addPixels(mapData.pixels);

        // Если у пользователя уже выбрана страна
        if (authUser.countryId) {
          const country = countries.find(c => c.id === authUser.countryId);
          if (country) {
            setSelectedCountry(country);
            wsService.subscribeToCountry(country.id);
          }
        } else {
          // Показываем выбор страны
          setShowCountrySelect(true);
        }

        console.log('✅ Initialization complete!');
        setLoading(false);
      } catch (err) {
        console.error('❌ Init error:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError(`Ошибка: ${err.message || 'Неизвестная ошибка'}`);
        setLoading(false);
      }
    };

    init();

    return () => {
      wsService.disconnect();
    };
  }, []);

  // Обработка выбора страны
  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setShowCountrySelect(false);
    wsService.subscribeToCountry(country.id);
    gameAPI.selectCountry(country.id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="text-2xl mb-4">🌍</div>
          <div>{t('common.loading')}</div>
          <div className="text-xs mt-2 text-gray-400">DEBUG MODE</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="text-2xl mb-4">❌</div>
          <div>{error}</div>
          <div className="text-xs mt-4 text-gray-400">
            <div>Backend: https://flagbattle-kpph.onrender.com</div>
            <div>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-white">
          <span className="text-lg font-bold">World Flag Battle</span>
          {selectedCountry && (
            <span className="ml-2 text-sm">
              {selectedCountry.nameRu} ({selectedCountry.code})
            </span>
          )}
        </div>
        {user && <EnergyBar energy={user.energy} maxEnergy={user.maxEnergy} />}
      </div>

      {/* Main Content */}
      <div className="flex-1 relative">
        {selectedCountry ? (
          <WorldMap />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-center">
              <div className="text-2xl mb-4">🏳️</div>
              <div>{t('game.selectCountryFirst')}</div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCountrySelect && (
        <CountrySelect onSelect={handleCountrySelect} />
      )}
    </div>
  );
}

export default App;