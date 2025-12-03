import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const FavoritesContext = createContext(null);

function getStorageKey(user) {
  return user ? `psyuz_favorites_${user.id}` : "psyuz_favorites_guest";
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const storageKey = useMemo(() => getStorageKey(user), [user]);

  const [favoriteIds, setFavoriteIds] = useState([]);

  // загрузка избранного из localStorage при смене пользователя
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setFavoriteIds(parsed);
        } else {
          setFavoriteIds([]);
        }
      } else {
        setFavoriteIds([]);
      }
    } catch (e) {
      console.error("Favorites parse error", e);
      setFavoriteIds([]);
    }
  }, [storageKey]);

  // сохранение
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(favoriteIds));
    } catch (e) {
      console.error("Favorites save error", e);
    }
  }, [favoriteIds, storageKey]);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favoriteIds.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
