"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Player } from "@/lib/types";

interface FavoritesContextType {
  favorites: Player[];
  isLoaded: boolean;
  addFavorite: (player: Player) => void;
  removeFavorite: (idPlayer: string) => void;
  toggleFavorite: (player: Player) => void;
  isFavorite: (idPlayer: string) => boolean;
  clearFavorites: () => void;
}

const STORAGE_KEY = "football_encyclopedia_favorites";

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Player[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (e) {
      console.error("Gagal membaca favorites dari localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveToStorage = (updated: Player[]) => {
    setFavorites(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Gagal menyimpan favorites ke localStorage", e);
    }
  };

  const addFavorite = (player: Player) => {
    if (!favorites.some((p) => p.idPlayer === player.idPlayer)) {
      const updated = [player, ...favorites];
      saveToStorage(updated);
    }
  };

  const removeFavorite = (idPlayer: string) => {
    const updated = favorites.filter((p) => p.idPlayer !== idPlayer);
    saveToStorage(updated);
  };

  const toggleFavorite = (player: Player) => {
    if (favorites.some((p) => p.idPlayer === player.idPlayer)) {
      removeFavorite(player.idPlayer);
    } else {
      addFavorite(player);
    }
  };

  const isFavorite = (idPlayer: string) => {
    return favorites.some((p) => p.idPlayer === idPlayer);
  };

  const clearFavorites = () => {
    saveToStorage([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoaded,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
