import { User, Shield } from "lucide-react";
import { FavoriteTab } from "./types";

export const FAVORITES_STORAGE_KEYS = {
  players: "football_encyclopedia_favorites",
  teams: "football_encyclopedia_team_favorites",
} as const;

export interface FavoriteTabConfig {
  id: FavoriteTab;
  label: string;
  icon: typeof User;
  itemTypeLabel: string;
  emptyHeading: string;
  emptyDescription: string;
  exploreHref: string;
  exploreLabel: string;
}

export const FAVORITE_TABS: readonly FavoriteTabConfig[] = [
  {
    id: "players",
    label: "Pemain",
    icon: User,
    itemTypeLabel: "pemain",
    emptyHeading: "Belum ada pemain favorit",
    emptyDescription: "Klik ikon hati pada kartu pemain untuk menyimpannya di sini.",
    exploreHref: "/",
    exploreLabel: "Jelajahi pemain",
  },
  {
    id: "teams",
    label: "Klub",
    icon: Shield,
    itemTypeLabel: "klub",
    emptyHeading: "Belum ada klub favorit",
    emptyDescription: "Klik ikon hati pada kartu klub untuk menyimpannya di sini.",
    exploreHref: "/teams",
    exploreLabel: "Jelajahi klub",
  },
] as const;
