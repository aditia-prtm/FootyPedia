"use client";

import React from "react";
import { motion } from "framer-motion";
import { FavoriteTab } from "../types";
import { FAVORITE_TABS } from "../constants";

export interface FavoriteTabSelectorProps {
  activeTab: FavoriteTab;
  onTabChange: (tab: FavoriteTab) => void;
  playerCount: number;
  teamCount: number;
}

export default function FavoriteTabSelector({
  activeTab,
  onTabChange,
  playerCount,
  teamCount,
}: FavoriteTabSelectorProps) {
  return (
    <div className="inline-flex p-1 rounded-2xl bg-[#141414] border border-[#2d2d2d] shadow-inner relative">
      {FAVORITE_TABS.map((tab) => {
        const Icon = tab.icon;
        const isSelected = activeTab === tab.id;
        const count = tab.id === "players" ? playerCount : teamCount;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`relative z-10 flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 outline-none cursor-pointer ${
              isSelected ? "text-white" : "text-[#8a8a8a] hover:text-[#f5f5f5]"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="activeSegmentedPill"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#f4511e] shadow-md shadow-[#ff6b35]/20"
                style={{ zIndex: -1 }}
              />
            )}
            <Icon className={`h-4 w-4 ${isSelected ? "text-white" : "text-[#8a8a8a]"}`} />
            <span>{tab.label}</span>
            <span
              className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold transition-colors ${
                isSelected
                  ? "bg-white/20 text-white"
                  : "bg-[#242424] text-[#8a8a8a]"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
