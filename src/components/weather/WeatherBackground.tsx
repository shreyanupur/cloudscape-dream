import { useMemo } from 'react';
import { WeatherCondition } from '@/types/weather';

interface WeatherBackgroundProps {
  condition: WeatherCondition;
}

const RainEffect = () => {
  const drops = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.5 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <div className="rain-container">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="raindrop"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

const SnowEffect = () => {
  const flakes = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      size: 4 + Math.random() * 6,
    }));
  }, []);

  return (
    <div className="snow-container">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
          }}
        />
      ))}
    </div>
  );
};

const StarsEffect = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 60,
      delay: Math.random() * 3,
      size: 1 + Math.random() * 2,
    }));
  }, []);

  return (
    <div className="stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
    </div>
  );
};

const SunRays = () => {
  return <div className="sun-rays" />;
};

const LightningFlash = () => {
  return <div className="lightning-flash" />;
};

export const WeatherBackground = ({ condition }: WeatherBackgroundProps) => {
  const bgClass = {
    sunny: 'weather-bg-sunny',
    cloudy: 'weather-bg-cloudy',
    rainy: 'weather-bg-rainy',
    snowy: 'weather-bg-snowy',
    night: 'weather-bg-night',
    storm: 'weather-bg-storm',
  }[condition];

  return (
    <div className={`fixed inset-0 transition-weather ${bgClass}`}>
      {condition === 'sunny' && <SunRays />}
      {condition === 'rainy' && <RainEffect />}
      {condition === 'snowy' && <SnowEffect />}
      {condition === 'night' && <StarsEffect />}
      {condition === 'storm' && (
        <>
          <RainEffect />
          <LightningFlash />
        </>
      )}
    </div>
  );
};
