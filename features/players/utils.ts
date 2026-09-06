import { Shield, Flag, Calendar, MapPin, User, Activity, LucideIcon } from "lucide-react";
import { Player } from "@/types";

export interface PlayerStatItem {
  label: string;
  value: string | undefined;
  icon: LucideIcon;
  highlight?: boolean;
  link?: string;
}

export function getPositionBadgeClass(pos?: string): string {
  if (!pos) return "text-[#8a8a8a] border-[#2d2d2d] bg-[#1a1a1a]";
  const lower = pos.toLowerCase();

  if (lower.includes("forward") || lower.includes("striker") || lower.includes("winger") || lower.includes("attack")) {
    return "text-[#ff6b35] border-[#ff6b35]/30 bg-[#ff6b35]/10";
  } else if (lower.includes("midfield")) {
    return "text-[#ffd700] border-[#ffd700]/30 bg-[#ffd700]/10";
  } else if (lower.includes("defender") || lower.includes("back")) {
    return "text-[#6366f1] border-[#6366f1]/30 bg-[#6366f1]/10";
  } else if (lower.includes("goalkeeper") || lower.includes("keeper")) {
    return "text-[#10b981] border-[#10b981]/30 bg-[#10b981]/10";
  }

  return "text-[#8a8a8a] border-[#2d2d2d] bg-[#1a1a1a]";
}

export function getPlayerStatItems(player: Player): PlayerStatItem[] {
  return [
    {
      label: "Klub Saat Ini",
      value: player.strTeam,
      icon: Shield,
      highlight: true,
      link: player.idTeam ? `/team/${player.idTeam}` : undefined,
    },
    { label: "Posisi", value: player.strPosition, icon: Activity },
    { label: "Negara", value: player.strNationality, icon: Flag },
    { label: "Nomor Punggung", value: player.strNumber ? `#${player.strNumber}` : "-", icon: User },
    { label: "Tanggal Lahir", value: player.dateBorn, icon: Calendar },
    { label: "Tempat Lahir", value: player.strBirthLocation, icon: MapPin },
  ];
}
