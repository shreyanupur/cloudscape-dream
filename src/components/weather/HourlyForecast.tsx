import { HourlyForecast as HourlyForecastType, TemperatureUnit } from '@/types/weather';
import { getWeatherIcon, formatTemperature, formatHour, isNightTime } from '@/lib/weather-utils';
import { Droplets } from 'lucide-react';

interface HourlyForecastProps {
  hourly: HourlyForecastType[];
  unit: TemperatureUnit;
  timezone: string;
}

export const HourlyForecast = ({ hourly, unit, timezone }: HourlyForecastProps) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground/80">Hourly Forecast</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
        {hourly.map((hour, index) => {
          const hourDate = new Date(hour.time);
          const hourNum = hourDate.getHours();
          const isNight = hourNum < 6 || hourNum >= 20;
          const WeatherIcon = getWeatherIcon(hour.weatherCode, isNight);
          
          return (
            <div
              key={hour.time}
              className={`flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-xl transition-colors ${
                index === 0 ? 'bg-foreground/10' : 'hover:bg-foreground/5'
              }`}
            >
              <span className="text-sm text-foreground/60">
                {index === 0 ? 'Now' : formatHour(hour.time, timezone)}
              </span>
              <WeatherIcon className="w-8 h-8 text-foreground/80" strokeWidth={1.5} />
              <span className="font-medium">
                {formatTemperature(hour.temperature, unit)}
              </span>
              {hour.precipitationProbability > 0 && (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <Droplets className="w-3 h-3" />
                  <span>{hour.precipitationProbability}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
