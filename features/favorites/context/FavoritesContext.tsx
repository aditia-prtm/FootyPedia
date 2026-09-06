"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Player, Team } from "@/types";
import { FavoritesContextType } from "../types";
import { FAVORITES_STORAGE_KEYS } from "../constants";

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Player[]>([]);
  const [teamFavorites, setTeamFavorites] = useState<Team[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlayers = localStorage.getItem(FAVORITES_STORAGE_KEYS.players);
      if (storedPlayers) {
        const parsed = JSON.parse(storedPlayers);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }

      const storedTeams = localStorage.getItem(FAVORITES_STORAGE_KEYS.teams);
      if (storedTeams) {
        const parsedTeams = JSON.parse(storedTeams);
        if (Array.isArray(parsedTeams)) {
          setTeamFavorites(parsedTeams);
        }
      }
    } catch (e) {
      console.error("Gagal membaca favorites dari localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Players logic
  const savePlayersToStorage = (updated: Player[]) => {
    setFavorites(updated);
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEYS.players, JSON.stringify(updated));
    } catch (e) {
      console.error("Gagal menyimpan pemain favorit ke localStorage", e);
    }
  };

  const addFavorite = (player: Player) => {
    if (!favorites.some((p) => p.idPlayer === player.idPlayer)) {
      const updated = [player, ...favorites];
      savePlayersToStorage(updated);
    }
  };

  const removeFavorite = (idPlayer: string) => {
    const updated = favorites.filter((p) => p.idPlayer !== idPlayer);
    savePlayersToStorage(updated);
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
    savePlayersToStorage([]);
  };

  // Teams logic
  const saveTeamsToStorage = (updated: Team[]) => {
    setTeamFavorites(updated);
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEYS.teams, JSON.stringify(updated));
    } catch (e) {
      console.error("Gagal menyimpan klub favorit ke localStorage", e);
    }
  };

  const addTeamFavorite = (team: Team) => {
    if (!teamFavorites.some((t) => t.idTeam === team.idTeam)) {
      const updated = [team, ...teamFavorites];
      saveTeamsToStorage(updated);
    }
  };

  const removeTeamFavorite = (idTeam: string) => {
    const updated = teamFavorites.filter((t) => t.idTeam !== idTeam);
    saveTeamsToStorage(updated);
  };

  const toggleTeamFavorite = (team: Team) => {
    if (teamFavorites.some((t) => t.idTeam === team.idTeam)) {
      removeTeamFavorite(team.idTeam);
    } else {
      addTeamFavorite(team);
    }
  };

  const isTeamFavorite = (idTeam: string) => {
    return teamFavorites.some((t) => t.idTeam === idTeam);
  };

  const clearTeamFavorites = () => {
    saveTeamsToStorage([]);
  };

  const totalFavoritesCount = favorites.length + teamFavorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        teamFavorites,
        isLoaded,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        addTeamFavorite,
        removeTeamFavorite,
        toggleTeamFavorite,
        isTeamFavorite,
        clearTeamFavorites,
        totalFavoritesCount,
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
