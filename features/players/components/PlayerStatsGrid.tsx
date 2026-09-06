import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Player } from "@/types";
import { getPlayerStatItems } from "../utils";

export interface PlayerStatsGridProps {
  player: Player;
}

export default function PlayerStatsGrid({ player }: PlayerStatsGridProps) {
  const statItems = getPlayerStatItems(player);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`rounded-xl p-4 ${
              item.highlight ? "bg-[#ff6b35]/10 border border-[#ff6b35]/30" : "bg-[#242424]"
            }`}
          >
            <div className="flex items-center gap-2 text-[11px] text-[#5a5a5a] uppercase tracking-wider mb-2">
              <Icon className="h-3.5 w-3.5" />
              {item.label}
            </div>

            {item.link ? (
              <Link
                href={item.link}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#ff6b35] hover:underline truncate max-w-full"
              >
                <span className="truncate">{item.value || "-"}</span>
                <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
              </Link>
            ) : (
              <div className="text-sm font-semibold text-[#f5f5f5] truncate">
                {item.value || "-"}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
