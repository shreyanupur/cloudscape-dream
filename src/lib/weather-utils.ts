import { WeatherCondition } from '@/types/weather';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  Snowflake, 
  CloudLightning,
  Moon,
  CloudMoon
} from 'lucide-react';

export const getWeatherCondition = (
  weatherCode: number, 
  isNight: boolean = false
): WeatherCondition => {
  if (isNight && weatherCode === 0) return 'night';
  
  if (weatherCode === 0) return 'sunny';
  if (weatherCode >= 1 && weatherCode <= 3) return isNight ? 'night' : 'cloudy';
  if (weatherCode >= 45 && weatherCode <= 48) return 'cloudy';
  if (weatherCode >= 51 && weatherCode <= 55) return 'rainy';
  if (weatherCode >= 61 && weatherCode <= 67) return 'rainy';
  if (weatherCode >= 71 && weatherCode <= 77) return 'snowy';
  if (weatherCode >= 80 && weatherCode <= 82) return 'rainy';
  if (weatherCode >= 85 && weatherCode <= 86) return 'snowy';
  if (weatherCode >= 95 && weatherCode <= 99) return 'storm';
  
  return 'cloudy';
};

export const getWeatherIcon = (weatherCode: number, isNight: boolean = false) => {
  if (isNight) {
    if (weatherCode === 0) return Moon;
    if (weatherCode >= 1 && weatherCode <= 3) return CloudMoon;
  }
  
  if (weatherCode === 0) return Sun;
  if (weatherCode >= 1 && weatherCode <= 3) return CloudSun;
  if (weatherCode >= 45 && weatherCode <= 48) return Cloud;
  if (weatherCode >= 51 && weatherCode <= 55) return CloudDrizzle;
  if (weatherCode >= 61 && weatherCode <= 65) return CloudRain;
  if (weatherCode >= 66 && weatherCode <= 67) return CloudSnow;
  if (weatherCode >= 71 && weatherCode <= 77) return Snowflake;
  if (weatherCode >= 80 && weatherCode <= 82) return CloudRain;
  if (weatherCode >= 85 && weatherCode <= 86) return CloudSnow;
  if (weatherCode >= 95 && weatherCode <= 99) return CloudLightning;
  
  return Cloud;
};

export const getWeatherDescription = (weatherCode: number): string => {
  const descriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  
  return descriptions[weatherCode] || 'Unknown';
};

export const getAQILevel = (aqi: number): { label: string; className: string } => {
  if (aqi <= 50) return { label: 'Good', className: 'aqi-good' };
  if (aqi <= 100) return { label: 'Moderate', className: 'aqi-moderate' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive', className: 'aqi-unhealthy-sensitive' };
  if (aqi <= 200) return { label: 'Unhealthy', className: 'aqi-unhealthy' };
  if (aqi <= 300) return { label: 'Very Unhealthy', className: 'aqi-very-unhealthy' };
  return { label: 'Hazardous', className: 'aqi-hazardous' };
};

export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9/5) + 32);
};

export const formatTemperature = (
  temp: number, 
  unit: 'celsius' | 'fahrenheit'
): string => {
  const value = unit === 'fahrenheit' ? celsiusToFahrenheit(temp) : Math.round(temp);
  return `${value}°`;
};

export const isNightTime = (timezone: string): boolean => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    timeZone: timezone,
  });
  const hour = parseInt(formatter.format(now), 10);
  return hour < 6 || hour >= 20;
};

export const formatLocalTime = (timezone: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: timezone,
  }).format(new Date());
};

export const formatHour = (isoString: string, timezone: string): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    timeZone: timezone,
  }).format(date);
};

export const formatDayName = (isoString: string, timezone: string): string => {
  const date = new Date(isoString);
  const today = new Date();
  
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: timezone,
  });
  
  const todayStr = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timezone,
  }).format(today);
  
  const dateStr = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timezone,
  }).format(date);
  
  if (todayStr === dateStr) return 'Today';
  
  return dateFormatter.format(date);
};

export const getAlerts = (
  temperature: number,
  aqi: number,
  weatherCode: number
): { type: 'heat' | 'cold' | 'storm' | 'air'; message: string }[] => {
  const alerts: { type: 'heat' | 'cold' | 'storm' | 'air'; message: string }[] = [];
  
  if (temperature > 35) {
    alerts.push({ type: 'heat', message: 'Extreme Heat Warning' });
  }
  if (temperature < 0) {
    alerts.push({ type: 'cold', message: 'Freezing Conditions' });
  }
  if (aqi > 100) {
    alerts.push({ type: 'air', message: 'Poor Air Quality Alert' });
  }
  if (weatherCode >= 95 && weatherCode <= 99) {
    alerts.push({ type: 'storm', message: 'Severe Thunderstorm Warning' });
  }
  
  return alerts;
};
