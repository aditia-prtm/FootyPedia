"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Search, Trash2, ArrowLeft, HeartCrack } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useFavorites,
  FavoriteTab,
  FavoriteTabSelector,
  FAVORITE_TABS,
} from "@/features/favorites";
import { PlayerList } from "@/features/players";
import { TeamList } from "@/features/teams";
import { FavoritesPageSkeleton } from "@/components/ui/Skeletons";

export default function FavoritesPage() {
  const {
    favorites,
    teamFavorites,
    clearFavorites,
    clearTeamFavorites,
    isLoaded,
  } = useFavorites();

  const [activeTab, setActiveTab] = useState<FavoriteTab>("players");
  const [filterQuery, setFilterQuery] = useState("");

  if (!isLoaded) {
    return <FavoritesPageSkeleton />;
  }

  const filteredPlayers = favorites.filter((player) => {
    const q = filterQuery.toLowerCase();
    return (
      player.strPlayer.toLowerCase().includes(q) ||
      (player.strTeam && player.strTeam.toLowerCase().includes(q)) ||
      (player.strNationality && player.strNationality.toLowerCase().includes(q)) ||
      (player.strPosition && player.strPosition.toLowerCase().includes(q))
    );
  });

  const filteredTeams = teamFavorites.filter((team) => {
    const q = filterQuery.toLowerCase();
    return (
      team.strTeam.toLowerCase().includes(q) ||
      (team.strLeague && team.strLeague.toLowerCase().includes(q)) ||
      (team.strCountry && team.strCountry.toLowerCase().includes(q)) ||
      (team.strTeamAlternate && team.strTeamAlternate.toLowerCase().includes(q)) ||
      (team.strStadium && team.strStadium.toLowerCase().includes(q))
    );
  });

  const activeCount = activeTab === "players" ? favorites.length : teamFavorites.length;
  const currentItemsCount = activeTab === "players" ? filteredPlayers.length : filteredTeams.length;
  const currentTabConfig = FAVORITE_TABS.find((tab) => tab.id === activeTab) || FAVORITE_TABS[0];

  const handleClearCurrent = () => {
    if (activeTab === "players") {
      if (window.confirm("Hapus semua pemain favorit?")) {
        clearFavorites();
      }
    } else {
      if (window.confirm("Hapus semua klub favorit?")) {
        clearTeamFavorites();
      }
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-[#2d2d2d] pb-6">
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
              <h1
                className="text-2xl sm:text-3xl font-bold text-[#f5f5f5]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Koleksi Favorit
              </h1>
              <p className="text-xs text-[#5a5a5a] mt-1">
                {favorites.length} pemain &bull; {teamFavorites.length} klub tersimpan
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a5a5a]" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={`Filter ${currentTabConfig.itemTypeLabel}...`}
              className="w-full sm:w-64 rounded-xl border border-[#2d2d2d] bg-[#1a1a1a] py-2.5 pl-10 pr-4 text-sm text-[#f5f5f5] placeholder-[#5a5a5a] focus:border-[#ff6b35] focus:outline-none focus:ring-0 transition-colors"
            />
          </div>

          {activeCount > 0 && (
            <button
              onClick={handleClearCurrent}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#2d2d2d] bg-[#1a1a1a] px-4 py-2.5 text-xs font-semibold text-[#8a8a8a] hover:border-[#ff6b35]/30 hover:text-[#ff6b35] hover:bg-[#ff6b35]/5 transition active:scale-95 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              Hapus semua {currentTabConfig.itemTypeLabel}
            </button>
          )}
        </div>
      </div>

      {/* Pill Segmented Control */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <FavoriteTabSelector
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setFilterQuery("");
          }}
          playerCount={favorites.length}
          teamCount={teamFavorites.length}
        />

        {filterQuery && (
          <div className="text-xs text-[#8a8a8a] flex items-center gap-2">
            <span>
              Menampilkan <strong className="text-[#f5f5f5]">{currentItemsCount}</strong> hasil untuk &ldquo;{filterQuery}&rdquo;
            </span>
            <button
              onClick={() => setFilterQuery("")}
              className="text-[#ff6b35] hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Animated Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "players" ? (
          <motion.div
            key="players-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-dashed border-[#2d2d2d] rounded-2xl px-6 py-20 text-center max-w-xl mx-auto">
                <HeartCrack className="h-12 w-12 text-[#3d3d3d] mb-4 stroke-[1.5]" />
                <h2 className="text-lg font-semibold text-[#8a8a8a] mb-2">
                  {currentTabConfig.emptyHeading}
                </h2>
                <div className="items-center text-sm text-[#5a5a5a] gap-2 mb-7 leading-relaxed">
                  {currentTabConfig.emptyDescription}
                </div>
                <Link
                  href={currentTabConfig.exploreHref}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-4 py-2.5 text-sm font-semibold text-[#ff6b35] transition hover:bg-[#ff6b35]/20 active:scale-95"
                >
                  <Search className="h-4 w-4" />
                  {currentTabConfig.exploreLabel}
                </Link>
              </div>
            ) : filteredPlayers.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-dashed border-[#2d2d2d] rounded-2xl px-6 py-14 text-center">
                <Search className="h-10 w-10 text-[#3d3d3d] mb-3 stroke-[1.5]" />
                <p className="text-sm font-medium text-[#8a8a8a]">
                  Tidak ada pemain yang cocok dengan &ldquo;{filterQuery}&rdquo;
                </p>
                <button
                  onClick={() => setFilterQuery("")}
                  className="mt-2 text-xs text-[#ff6b35] hover:underline cursor-pointer"
                >
                  Hapus filter
                </button>
              </div>
            ) : (
              <PlayerList
                players={filteredPlayers}
                emptyMessage="Tidak ada pemain favorit ditemukan."
                showTips={false}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="teams-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {teamFavorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-dashed border-[#2d2d2d] rounded-2xl px-6 py-20 text-center max-w-xl mx-auto">
                <HeartCrack className="h-12 w-12 text-[#3d3d3d] mb-4 stroke-[1.5]" />
                <h2 className="text-lg font-semibold text-[#8a8a8a] mb-2">
                  {currentTabConfig.emptyHeading}
                </h2>
                <div className="items-center text-sm text-[#5a5a5a] gap-2 mb-7 leading-relaxed">
                  {currentTabConfig.emptyDescription}
                </div>
                <Link
                  href={currentTabConfig.exploreHref}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-4 py-2.5 text-sm font-semibold text-[#ff6b35] transition hover:bg-[#ff6b35]/20 active:scale-95"
                >
                  <Search className="h-4 w-4" />
                  {currentTabConfig.exploreLabel}
                </Link>
              </div>
            ) : filteredTeams.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-dashed border-[#2d2d2d] rounded-2xl px-6 py-14 text-center">
                <Search className="h-10 w-10 text-[#3d3d3d] mb-3 stroke-[1.5]" />
                <p className="text-sm font-medium text-[#8a8a8a]">
                  Tidak ada klub yang cocok dengan &ldquo;{filterQuery}&rdquo;
                </p>
                <button
                  onClick={() => setFilterQuery("")}
                  className="mt-2 text-xs text-[#ff6b35] hover:underline cursor-pointer"
                >
                  Hapus filter
                </button>
              </div>
            ) : (
              <TeamList
                teams={filteredTeams}
                emptyMessage="Tidak ada klub favorit ditemukan."
                showTips={false}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
