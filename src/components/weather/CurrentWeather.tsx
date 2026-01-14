import { CurrentWeather as CurrentWeatherType, TemperatureUnit, Location } from '@/types/weather';
import { 
  getWeatherIcon, 
  getWeatherDescription, 
  formatTemperature, 
  getAQILevel,
  formatLocalTime,
  isNightTime
} from '@/lib/weather-utils';
import { Droplets, Wind, Thermometer } from 'lucide-react';

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  highTemp: number;
  lowTemp: number;
  aqi: number | null;
  location: Location;
  unit: TemperatureUnit;
  timezone: string;
}

export const CurrentWeatherDisplay = ({
  weather,
  highTemp,
  lowTemp,
  aqi,
  location,
  unit,
  timezone,
}: CurrentWeatherProps) => {
  const isNight = isNightTime(timezone);
  const WeatherIcon = getWeatherIcon(weather.weatherCode, isNight);
  const aqiInfo = aqi !== null ? getAQILevel(aqi) : null;

  return (
    <div className="glass-card p-8 space-y-6">
      {/* Location & Time */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-shadow-sm">
          {location.name}
        </h1>
        <p className="text-foreground/70 text-lg">
          {location.country} • {formatLocalTime(timezone)}
        </p>
      </div>

      {/* Main Temperature */}
      <div className="flex items-center gap-6">
        <div className="text-8xl font-light tracking-tighter text-shadow-md">
          {formatTemperature(weather.temperature, unit)}
        </div>
        <div className="space-y-2">
          <WeatherIcon className="w-16 h-16 text-foreground/90" strokeWidth={1.5} />
          <p className="text-lg text-foreground/80">{getWeatherDescription(weather.weatherCode)}</p>
        </div>
      </div>

      {/* High/Low */}
      <div className="flex items-center gap-4 text-lg">
        <span className="text-foreground/60">H: {formatTemperature(highTemp, unit)}</span>
        <span className="text-foreground/40">•</span>
        <span className="text-foreground/60">L: {formatTemperature(lowTemp, unit)}</span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-foreground/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-foreground/10">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-foreground/60">Feels Like</p>
            <p className="font-medium">{formatTemperature(weather.apparentTemperature, unit)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-foreground/10">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-foreground/60">Humidity</p>
            <p className="font-medium">{weather.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-foreground/10">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-foreground/60">Wind</p>
            <p className="font-medium">{Math.round(weather.windSpeed)} km/h</p>
          </div>
        </div>
      </div>

      {/* AQI */}
      {aqiInfo && aqi !== null && (
        <div className="flex items-center gap-3 pt-4 border-t border-foreground/10">
          <div className={`w-3 h-3 rounded-full ${aqiInfo.className}`} />
          <span className="text-foreground/80">
            Air Quality: <span className="font-medium">{aqiInfo.label}</span> ({aqi} AQI)
          </span>
        </div>
      )}
    </div>
  );
};
