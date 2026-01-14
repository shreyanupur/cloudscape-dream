import { Star, Plus, X, MapPin } from 'lucide-react';
import { Location } from '@/types/weather';

interface FavoritesSidebarProps {
  favorites: Location[];
  currentLocation: Location | null;
  onSelectLocation: (location: Location) => void;
  onRemoveFavorite: (id: string) => void;
  onAddCurrentToFavorites: () => void;
  isCurrentFavorite: boolean;
}

export const FavoritesSidebar = ({
  favorites,
  currentLocation,
  onSelectLocation,
  onRemoveFavorite,
  onAddCurrentToFavorites,
  isCurrentFavorite,
}: FavoritesSidebarProps) => {
  return (
    <div className="w-72 flex-shrink-0 glass-card-strong p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
          Favorites
        </h2>
        {currentLocation && !isCurrentFavorite && (
          <button
            onClick={onAddCurrentToFavorites}
            className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
            title="Add current location to favorites"
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
        {favorites.length === 0 ? (
          <div className="text-center py-8 text-foreground/50">
            <MapPin className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No favorites yet</p>
            <p className="text-xs mt-1">Search for a city and add it here</p>
          </div>
        ) : (
          favorites.map((location) => {
            const isActive = currentLocation?.id === location.id;
            return (
              <div
                key={location.id}
                className={`group relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  isActive
                    ? 'bg-primary/20 border border-primary/30'
                    : 'hover:bg-foreground/10 border border-transparent'
                }`}
                onClick={() => onSelectLocation(location)}
              >
                <MapPin className="w-5 h-5 text-foreground/60 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{location.name}</p>
                  <p className="text-sm text-foreground/60 truncate">{location.country}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFavorite(location.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-destructive/20 transition-all"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
