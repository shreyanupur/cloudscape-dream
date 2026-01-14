import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { useCitySearch } from '@/hooks/useWeather';
import { Location, GeocodingResult } from '@/types/weather';

interface SearchBarProps {
  onSelectLocation: (location: Location) => void;
  onUseMyLocation: () => void;
  isLoadingLocation: boolean;
}

export const SearchBar = ({ 
  onSelectLocation, 
  onUseMyLocation, 
  isLoadingLocation 
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: results, isLoading } = useCitySearch(query);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCity = (result: GeocodingResult) => {
    onSelectLocation({
      id: `${result.latitude}-${result.longitude}`,
      name: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
      timezone: result.timezone,
    });
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      <div ref={containerRef} className="relative flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search city..."
            className="w-full pl-12 pr-10 py-3 rounded-xl bg-foreground/10 backdrop-blur-sm border border-foreground/10 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && query.length >= 2 && (
          <div className="absolute top-full left-0 right-0 mt-2 glass-card-strong overflow-hidden z-50">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-foreground/50" />
              </div>
            ) : results && results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                {results.map((result) => (
                  <button
                    key={`${result.latitude}-${result.longitude}`}
                    onClick={() => handleSelectCity(result)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-foreground/10 transition-colors text-left"
                  >
                    <MapPin className="w-5 h-5 text-foreground/50 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{result.name}</p>
                      <p className="text-sm text-foreground/60">
                        {result.admin1 && `${result.admin1}, `}{result.country}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-foreground/50">
                No cities found
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={onUseMyLocation}
        disabled={isLoadingLocation}
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-foreground/10 backdrop-blur-sm border border-foreground/10 hover:bg-foreground/15 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoadingLocation ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <MapPin className="w-5 h-5" />
        )}
        <span className="hidden lg:inline">My Location</span>
      </button>
    </div>
  );
};
