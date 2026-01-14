import { useQuery } from '@tanstack/react-query';
import { Location, WeatherData, AirQuality, GeocodingResult } from '@/types/weather';

const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_hours=24&timezone=auto`
  );
  
  if (!response.ok) throw new Error('Failed to fetch weather data');
  
  const data = await response.json();
  
  return {
    current: {
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      weatherCode: data.current.weather_code,
    },
    hourly: data.hourly.time.slice(0, 24).map((time: string, i: number) => ({
      time,
      temperature: data.hourly.temperature_2m[i],
      weatherCode: data.hourly.weather_code[i],
      precipitationProbability: data.hourly.precipitation_probability[i],
    })),
    daily: data.daily.time.map((date: string, i: number) => ({
      date,
      temperatureMax: data.daily.temperature_2m_max[i],
      temperatureMin: data.daily.temperature_2m_min[i],
      weatherCode: data.daily.weather_code[i],
      precipitationProbability: data.daily.precipitation_probability_max[i],
    })),
    timezone: data.timezone,
  };
};

const fetchAirQuality = async (lat: number, lon: number): Promise<AirQuality> => {
  const response = await fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`
  );
  
  if (!response.ok) throw new Error('Failed to fetch air quality data');
  
  const data = await response.json();
  
  return {
    aqi: data.current.us_aqi,
  };
};

export const searchCities = async (query: string): Promise<GeocodingResult[]> => {
  if (!query || query.length < 2) return [];
  
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en`
  );
  
  if (!response.ok) throw new Error('Failed to search cities');
  
  const data = await response.json();
  
  return data.results || [];
};

export const useWeatherData = (location: Location | null) => {
  return useQuery({
    queryKey: ['weather', location?.latitude, location?.longitude],
    queryFn: () => fetchWeather(location!.latitude, location!.longitude),
    enabled: !!location,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAirQuality = (location: Location | null) => {
  return useQuery({
    queryKey: ['airQuality', location?.latitude, location?.longitude],
    queryFn: () => fetchAirQuality(location!.latitude, location!.longitude),
    enabled: !!location,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useCitySearch = (query: string) => {
  return useQuery({
    queryKey: ['citySearch', query],
    queryFn: () => searchCities(query),
    enabled: query.length >= 2,
    staleTime: 60 * 1000, // 1 minute
  });
};
