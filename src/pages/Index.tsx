import { useState, useEffect, useCallback } from 'react';
import { Location } from '@/types/weather';
import { useWeatherData, useAirQuality } from '@/hooks/useWeather';
import { useFavorites, useTemperatureUnit } from '@/hooks/useLocalStorage';
import { getWeatherCondition, isNightTime, getAlerts } from '@/lib/weather-utils';
import { WeatherBackground } from '@/components/weather/WeatherBackground';
import { CurrentWeatherDisplay } from '@/components/weather/CurrentWeather';
import { HourlyForecast } from '@/components/weather/HourlyForecast';
import { DailyForecast } from '@/components/weather/DailyForecast';
import { WeatherAlerts } from '@/components/weather/WeatherAlerts';
import { SearchBar } from '@/components/weather/SearchBar';
import { FavoritesSidebar } from '@/components/weather/FavoritesSidebar';
import { UnitToggle } from '@/components/weather/UnitToggle';
import { WeatherLoadingSkeleton } from '@/components/weather/LoadingSkeleton';
import { MobileBlocker } from '@/components/weather/MobileBlocker';
import { ErrorState } from '@/components/weather/ErrorState';
import { CloudSun } from 'lucide-react';

// Default location (London)
const DEFAULT_LOCATION: Location = {
  id: '51.5074--0.1278',
  name: 'London',
  country: 'United Kingdom',
  latitude: 51.5074,
  longitude: -0.1278,
  timezone: 'Europe/London',
};

const Index = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { unit, toggleUnit } = useTemperatureUnit();
  
  const { 
    data: weatherData, 
    isLoading: isLoadingWeather, 
    error: weatherError,
    refetch: refetchWeather 
  } = useWeatherData(currentLocation);
  
  const { 
    data: airQuality,
    refetch: refetchAir
  } = useAirQuality(currentLocation);

  // Initialize with default location
  useEffect(() => {
    if (!currentLocation) {
      setCurrentLocation(DEFAULT_LOCATION);
    }
  }, [currentLocation]);

  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLoadingGeolocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Try to get city name from reverse geocoding
        try {
          const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=&count=1&language=en`
          );
          // Since Open-Meteo doesn't have reverse geocoding, we'll use coordinates
          setCurrentLocation({
            id: `${latitude}-${longitude}`,
            name: 'Current Location',
            country: 'Your Location',
            latitude,
            longitude,
          });
        } catch {
          setCurrentLocation({
            id: `${latitude}-${longitude}`,
            name: 'Current Location',
            country: 'Your Location',
            latitude,
            longitude,
          });
        }
        setIsLoadingGeolocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to get your location. Please try searching for a city.');
        setIsLoadingGeolocation(false);
      }
    );
  }, []);

  const handleSelectLocation = useCallback((location: Location) => {
    setCurrentLocation(location);
  }, []);

  const handleAddToFavorites = useCallback(() => {
    if (currentLocation) {
      addFavorite(currentLocation);
    }
  }, [currentLocation, addFavorite]);

  const handleRetry = useCallback(() => {
    refetchWeather();
    refetchAir();
  }, [refetchWeather, refetchAir]);

  // Calculate weather condition for background
  const weatherCondition = weatherData 
    ? getWeatherCondition(
        weatherData.current.weatherCode, 
        isNightTime(weatherData.timezone)
      )
    : 'cloudy';

  // Calculate alerts
  const alerts = weatherData && airQuality
    ? getAlerts(
        weatherData.current.temperature,
        airQuality.aqi,
        weatherData.current.weatherCode
      )
    : [];

  return (
    <>
      <MobileBlocker />
      
      <div className="hidden lg:block min-h-screen relative">
        {/* Dynamic Background */}
        <WeatherBackground condition={weatherCondition} />

        {/* Main Content */}
        <div className="relative z-10 flex h-screen">
          {/* Sidebar */}
          <FavoritesSidebar
            favorites={favorites}
            currentLocation={currentLocation}
            onSelectLocation={handleSelectLocation}
            onRemoveFavorite={removeFavorite}
            onAddCurrentToFavorites={handleAddToFavorites}
            isCurrentFavorite={currentLocation ? isFavorite(currentLocation.id) : false}
          />

          {/* Main Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Bar */}
            <header className="flex items-center justify-between p-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/20 backdrop-blur-sm">
                  <CloudSun className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-xl font-bold hidden xl:block">Weather</h1>
              </div>
              
              <SearchBar
                onSelectLocation={handleSelectLocation}
                onUseMyLocation={handleUseMyLocation}
                isLoadingLocation={isLoadingGeolocation}
              />

              <UnitToggle unit={unit} onToggle={toggleUnit} />
            </header>

            {/* Weather Content */}
            <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Alerts */}
                {alerts.length > 0 && <WeatherAlerts alerts={alerts} />}

                {/* Weather Data */}
                {weatherError ? (
                  <ErrorState 
                    message="Failed to load weather data. Please try again."
                    onRetry={handleRetry}
                  />
                ) : isLoadingWeather || !weatherData || !currentLocation ? (
                  <WeatherLoadingSkeleton />
                ) : (
                  <>
                    <CurrentWeatherDisplay
                      weather={weatherData.current}
                      highTemp={weatherData.daily[0]?.temperatureMax ?? weatherData.current.temperature}
                      lowTemp={weatherData.daily[0]?.temperatureMin ?? weatherData.current.temperature}
                      aqi={airQuality?.aqi ?? null}
                      location={currentLocation}
                      unit={unit}
                      timezone={weatherData.timezone}
                    />

                    <HourlyForecast
                      hourly={weatherData.hourly}
                      unit={unit}
                      timezone={weatherData.timezone}
                    />

                    <DailyForecast
                      daily={weatherData.daily}
                      unit={unit}
                      timezone={weatherData.timezone}
                    />
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
