import React from "react";
import { Trophy, Globe, Calendar, Building, MapPin } from "lucide-react";
import { Team } from "@/types";

export interface TeamInfoGridProps {
  team: Team;
}

export default function TeamInfoGrid({ team }: TeamInfoGridProps) {
  const infoItems = [
    { label: "Liga", value: team.strLeague, icon: Trophy },
    { label: "Negara", value: team.strCountry, icon: Globe },
    { label: "Tahun Berdiri", value: team.intFormedYear, icon: Calendar },
    { label: "Stadion", value: team.strStadium, icon: Building },
    { label: "Lokasi Stadion", value: team.strStadiumLocation, icon: MapPin },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {infoItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="bg-[#242424] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[11px] text-[#5a5a5a] uppercase tracking-wider mb-2">
              <Icon className="h-3.5 w-3.5" />
              {item.label}
            </div>
            <div
              className="text-sm font-semibold text-[#f5f5f5] truncate"
              title={String(item.value ?? "")}
            >
              {item.value || "-"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
