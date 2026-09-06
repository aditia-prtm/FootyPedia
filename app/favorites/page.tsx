"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Search, Trash2, ArrowLeft, HeartCrack } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import PlayerList from "../components/PlayerList";
import { PlayerListSkeleton, FavoritesPageSkeleton } from "../components/Skeletons";

export default function FavoritesPage() {
  const { favorites, clearFavorites, isLoaded } = useFavorites();
  const [filterQuery, setFilterQuery] = useState("");

  if (!isLoaded) {
    return <FavoritesPageSkeleton />;
  }

  const filteredFavorites = favorites.filter((player) => {
    const q = filterQuery.toLowerCase();
    return (
      player.strPlayer.toLowerCase().includes(q) ||
      (player.strTeam && player.strTeam.toLowerCase().includes(q)) ||
      (player.strNationality && player.strNationality.toLowerCase().includes(q)) ||
      (player.strPosition && player.strPosition.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d2d2d] pb-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#5a5a5a] hover:text-[#f5f5f5] transition mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke pencarian
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ff6b35]/30 bg-[#ff6b35]/10 text-[#ff6b35]">
              <Heart className="h-5 w-5 fill-[#ff6b35] text-[#ff6b35]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#f5f5f5]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Pemain Favorit
              </h1>
              <p className="text-xs text-[#5a5a5a] mt-1">
                {favorites.length} pemain tersimpan
              </p>
            </div>
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a5a5a]" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter favorit..."
                className="w-full sm:w-64 rounded-lg border border-[#2d2d2d] bg-[#1a1a1a] py-2.5 pl-10 pr-4 text-sm text-[#f5f5f5] placeholder-[#5a5a5a] focus:border-[#ff6b35] focus:outline-none focus:ring-0"
              />
            </div>
            <button
              onClick={() => {
                if (window.confirm("Hapus semua pemain favorit?")) {
                  clearFavorites();
                }
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#2d2d2d] bg-[#1a1a1a] px-4 py-2.5 text-xs font-semibold text-[#8a8a8a] hover:border-[#ff6b35]/30 hover:text-[#ff6b35] transition active:scale-95"
            >
              <Trash2 className="h-4 w-4" />
              Hapus semua
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-[#2d2d2d] rounded-2xl px-6 py-20 text-center max-w-xl mx-auto">
          <HeartCrack className="h-12 w-12 text-[#3d3d3d] mb-4 stroke-[1.5]" />
          <h2 className="text-lg font-semibold text-[#8a8a8a] mb-2">
            Belum ada pemain favorit
          </h2>
          <div className="items-center text-sm text-[#5a5a5a] gap-2 mb-7 leading-relaxed">
            Klik ikon hati pada kartu pemain untuk menyimpannya di sini.
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-4 py-2.5 text-sm font-semibold text-[#ff6b35] transition hover:bg-[#ff6b35]/20 active:scale-95"
          >
            <Search className="h-4 w-4" />
            Jelajahi pemain
          </Link>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-[#2d2d2d] rounded-2xl px-6 py-14 text-center">
          <Search className="h-10 w-10 text-[#3d3d3d] mb-3 stroke-[1.5]" />
          <p className="text-sm font-medium text-[#8a8a8a]">
            Tidak ada hasil untuk "{filterQuery}"
          </p>
          <button
            onClick={() => setFilterQuery("")}
            className="mt-2 text-xs text-[#ff6b35] hover:underline"
          >
            Hapus filter
          </button>
        </div>
      ) : (
        <PlayerList
          players={filteredFavorites}
          emptyMessage="Tidak ada pemain favorit ditemukan."
          showTips={false}
        />
      )}
    </div>
  );
}
