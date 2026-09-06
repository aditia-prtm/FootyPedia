"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Search, Trash2, ArrowLeft, HeartCrack } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import PlayerList from "../components/PlayerList";
import { PlayerListSkeleton } from "../components/Skeletons";

export default function FavoritesPage() {
  const { favorites, clearFavorites, isLoaded } = useFavorites();
  const [filterQuery, setFilterQuery] = useState("");

  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <div className="h-7 w-48 rounded-sm bg-[#1e2d3d] animate-pulse" />
        <PlayerListSkeleton count={4} />
      </div>
    );
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
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e2d3d] pb-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] text-[#475569] hover:text-slate-300 transition mb-3"
          >
            <ArrowLeft className="h-3 w-3" />
            Kembali ke pencarian
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-[#3d1a27] bg-[#1a0a10] text-rose-400">
              <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-200">
                Pemain Favorit
              </h1>
              <p className="text-[11px] text-[#475569] mt-0.5">
                {favorites.length} pemain tersimpan
              </p>
            </div>
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#475569]" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter favorit..."
                className="w-full sm:w-56 rounded border border-[#1e2d3d] bg-[#111827] py-2 pl-9 pr-3 text-sm text-slate-200 placeholder-[#334155] focus:border-[#10b981] focus:outline-none focus:ring-1 focus:ring-[#10b981]/30"
              />
            </div>
            <button
              onClick={() => {
                if (window.confirm("Hapus semua pemain favorit?")) {
                  clearFavorites();
                }
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded border border-[#1e2d3d] bg-[#111827] px-3 py-2 text-xs font-medium text-[#64748b] hover:border-[#3d1a27] hover:text-rose-400 transition active:scale-95"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Hapus semua
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-[#1e2d3d] px-6 py-20 text-center max-w-xl mx-auto">
          <HeartCrack className="h-10 w-10 text-[#334155] mb-4 stroke-[1.25]" />
          <h2 className="text-base font-semibold text-slate-300 mb-2">
            Belum ada pemain favorit
          </h2>
          <div className="items-center text-sm text-[#475569] gap-2 mb-7 leading-relaxed">
            Klik ikon hati pada kartu pemain untuk menyimpannya di sini.
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded border border-[#065f46] bg-[#022c22] px-4 py-2 text-sm font-medium text-[#34d399] transition hover:bg-[#053d2d] active:scale-95"
          >
            <Search className="h-3.5 w-3.5" />
            Jelajahi pemain
          </Link>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-[#1e2d3d] px-6 py-14 text-center">
          <Search className="h-9 w-9 text-[#334155] mb-3 stroke-[1.25]" />
          <p className="text-sm font-medium text-slate-400">
            Tidak ada hasil untuk "{filterQuery}"
          </p>
          <button
            onClick={() => setFilterQuery("")}
            className="mt-2 text-[11px] text-[#34d399] hover:underline"
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
