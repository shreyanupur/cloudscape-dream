import { useState, useEffect } from 'react';
import { Location, TemperatureUnit } from '@/types/weather';

const FAVORITES_KEY = 'weather-favorites';
const PREFERENCES_KEY = 'weather-preferences';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Location[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (location: Location) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === location.id)) return prev;
      return [...prev, location];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((f) => f.id === id);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};

export const useTemperatureUnit = () => {
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      const prefs = stored ? JSON.parse(stored) : {};
      return prefs.temperatureUnit || 'celsius';
    } catch {
      return 'celsius';
    }
  });

  useEffect(() => {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    const prefs = stored ? JSON.parse(stored) : {};
    prefs.temperatureUnit = unit;
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  }, [unit]);

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return { unit, setUnit, toggleUnit };
};
