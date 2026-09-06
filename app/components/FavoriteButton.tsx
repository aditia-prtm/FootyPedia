"use client";

import React from "react";
import { Heart } from "lucide-react";
import { Player } from "@/lib/types";
import { useFavorites } from "../context/FavoritesContext";

interface FavoriteButtonProps {
  player: Player;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function FavoriteButton({
  player,
  size = "md",
  showText = false,
  className = "",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const favorite = isLoaded && isFavorite(player.idPlayer);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(player);
  };

  const sizeClasses = {
    sm: "p-1.5 text-xs gap-1",
    md: "p-2 text-sm gap-1.5",
    lg: "px-4 py-2 text-sm gap-2",
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-4 w-4",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={favorite ? "Hapus dari favorit" : "Tambah ke favorit"}
      aria-label={favorite ? "Hapus dari favorit" : "Tambah ke favorit"}
      className={`inline-flex items-center justify-center rounded-xl border font-semibold transition-all duration-200 active:scale-95 ${
        sizeClasses[size]
      } ${
        favorite
          ? "bg-[#ff6b35]/10 text-[#ff6b35] border-[#ff6b35]/30 hover:bg-[#ff6b35]/20"
          : "bg-[#1a1a1a] text-[#5a5a5a] border-[#2d2d2d] hover:text-[#f5f5f5] hover:border-[#3d3d3d]"
      } ${className}`}
    >
      <Heart
        className={`${iconSizes[size]} transition-transform duration-200 ${
          favorite ? "fill-[#ff6b35] text-[#ff6b35]" : ""
        }`}
      />
      {showText && (
        <span>{favorite ? "Tersimpan" : "Simpan"}</span>
      )}
    </button>
  );
}
