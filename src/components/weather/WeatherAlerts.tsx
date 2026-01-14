import { AlertTriangle, Thermometer, Snowflake, CloudLightning, Wind } from 'lucide-react';

interface Alert {
  type: 'heat' | 'cold' | 'storm' | 'air';
  message: string;
}

interface WeatherAlertsProps {
  alerts: Alert[];
}

const alertIcons = {
  heat: Thermometer,
  cold: Snowflake,
  storm: CloudLightning,
  air: Wind,
};

export const WeatherAlerts = ({ alerts }: WeatherAlertsProps) => {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((alert, index) => {
        const Icon = alertIcons[alert.type];
        return (
          <div
            key={index}
            className={`alert-${alert.type} flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm`}
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{alert.message}</span>
          </div>
        );
      })}
    </div>
  );
};
