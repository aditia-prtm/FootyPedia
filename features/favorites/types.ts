import { Player, Team } from "@/types";

export type FavoriteTab = "players" | "teams";

export interface FavoritesContextType {
  favorites: Player[];
  teamFavorites: Team[];
  isLoaded: boolean;
  // Player Favorites
  addFavorite: (player: Player) => void;
  removeFavorite: (idPlayer: string) => void;
  toggleFavorite: (player: Player) => void;
  isFavorite: (idPlayer: string) => boolean;
  clearFavorites: () => void;
  // Team Favorites
  addTeamFavorite: (team: Team) => void;
  removeTeamFavorite: (idTeam: string) => void;
  toggleTeamFavorite: (team: Team) => void;
  isTeamFavorite: (idTeam: string) => boolean;
  clearTeamFavorites: () => void;
  totalFavoritesCount: number;
}
