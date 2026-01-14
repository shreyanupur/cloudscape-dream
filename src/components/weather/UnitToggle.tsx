import { TemperatureUnit } from '@/types/weather';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export const UnitToggle = ({ unit, onToggle }: UnitToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center rounded-xl bg-foreground/10 backdrop-blur-sm border border-foreground/10 overflow-hidden"
    >
      <span
        className={`px-4 py-2 text-sm font-medium transition-all ${
          unit === 'celsius'
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground/60 hover:text-foreground'
        }`}
      >
        °C
      </span>
      <span
        className={`px-4 py-2 text-sm font-medium transition-all ${
          unit === 'fahrenheit'
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground/60 hover:text-foreground'
        }`}
      >
        °F
      </span>
    </button>
  );
};
