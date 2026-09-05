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
      className={`inline-flex items-center justify-center rounded border font-medium transition-all duration-150 active:scale-95 ${
        sizeClasses[size]
      } ${
        favorite
          ? "bg-[#1a0a10] text-rose-400 border-[#3d1a27] hover:bg-[#280f1a]"
          : "bg-[#111827] text-[#475569] border-[#1e2d3d] hover:text-slate-300 hover:border-[#2a3d52]"
      } ${className}`}
    >
      <Heart
        className={`${iconSizes[size]} transition-transform duration-150 ${
          favorite ? "fill-rose-500 text-rose-500" : ""
        }`}
      />
      {showText && (
        <span>{favorite ? "Tersimpan" : "Simpan"}</span>
      )}
    </button>
  );
}
