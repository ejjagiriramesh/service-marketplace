import React, { createContext, useContext } from "react";
import { useLocalStorageState } from "../../core/hooks/useLocalStorageState.js";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorageState("sh_favorites", []);

  const toggleFavorite = (providerId) => {
    setFavoriteIds((prev) =>
      prev.includes(providerId) ? prev.filter((id) => id !== providerId) : [...prev, providerId]
    );
  };

  const isFavorite = (providerId) => favoriteIds.includes(providerId);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
