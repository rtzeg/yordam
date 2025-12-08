// src/features/favorites/FavoritesContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "../auth/AuthContext.jsx";

const FavoritesContext = createContext(null);

function getStorageKey(user) {
  return user ? `psyuz_favorites_${user.id}` : "psyuz_favorites_guest";
}

function normalizeId(id) {
  return String(id);
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const storageKey = useMemo(() => getStorageKey(user), [user]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setFavoriteIds(parsed.map((id) => normalizeId(id)));
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

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(favoriteIds));
    } catch (e) {
      console.error("Favorites save error", e);
    }
  }, [favoriteIds, storageKey]);

  const toggleFavorite = (id) => {
    const normId = normalizeId(id);

    setFavoriteIds((prev) =>
      prev.includes(normId)
        ? prev.filter((x) => x !== normId)
        : [...prev, normId]
    );
  };

  const isFavorite = (id) => {
    const normId = normalizeId(id);
    return favoriteIds.includes(normId);
  };

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
  if (!ctx) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return ctx;
}
