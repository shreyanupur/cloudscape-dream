import { DailyForecast as DailyForecastType, TemperatureUnit } from '@/types/weather';
import { getWeatherIcon, formatTemperature, formatDayName } from '@/lib/weather-utils';
import { Droplets } from 'lucide-react';

interface DailyForecastProps {
  daily: DailyForecastType[];
  unit: TemperatureUnit;
  timezone: string;
}

export const DailyForecast = ({ daily, unit, timezone }: DailyForecastProps) => {
  // Find min and max across all days for the temperature bar
  const allTemps = daily.flatMap(d => [d.temperatureMin, d.temperatureMax]);
  const minTemp = Math.min(...allTemps);
  const maxTemp = Math.max(...allTemps);
  const tempRange = maxTemp - minTemp;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground/80">7-Day Forecast</h3>
      <div className="space-y-3">
        {daily.map((day, index) => {
          const WeatherIcon = getWeatherIcon(day.weatherCode);
          const lowPosition = ((day.temperatureMin - minTemp) / tempRange) * 100;
          const highPosition = ((day.temperatureMax - minTemp) / tempRange) * 100;
          const barWidth = highPosition - lowPosition;
          
          return (
            <div
              key={day.date}
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                index === 0 ? 'bg-foreground/10' : 'hover:bg-foreground/5'
              }`}
            >
              {/* Day name */}
              <span className="w-16 text-sm font-medium">
                {formatDayName(day.date, timezone)}
              </span>

              {/* Icon & precipitation */}
              <div className="flex items-center gap-2 w-20">
                <WeatherIcon className="w-6 h-6 text-foreground/80" strokeWidth={1.5} />
                {day.precipitationProbability > 0 && (
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <Droplets className="w-3 h-3" />
                    <span>{day.precipitationProbability}%</span>
                  </div>
                )}
              </div>

              {/* Temperature bar */}
              <div className="flex-1 flex items-center gap-3">
                <span className="w-10 text-right text-sm text-foreground/60">
                  {formatTemperature(day.temperatureMin, unit)}
                </span>
                <div className="flex-1 h-1.5 bg-foreground/10 rounded-full relative">
                  <div
                    className="absolute h-full rounded-full"
                    style={{
                      left: `${lowPosition}%`,
                      width: `${barWidth}%`,
                      background: `linear-gradient(90deg, hsl(200 80% 60%), hsl(35 95% 55%))`,
                    }}
                  />
                </div>
                <span className="w-10 text-sm font-medium">
                  {formatTemperature(day.temperatureMax, unit)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
