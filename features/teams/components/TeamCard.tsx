import Link from "next/link";
import { Shield, MapPin, Trophy, ArrowUpRight } from "lucide-react";
import { Team } from "@/types";
import { FavoriteButton } from "@/features/favorites";

export interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  const badgeUrl = team.strBadge || team.strLogo || team.strJersey;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-[#2d2d2d] bg-[#1a1a1a] transition-all duration-300 hover:border-[#ff6b35]/50 hover:bg-[#242424] hover:shadow-xl hover:shadow-[#ff6b35]/5">
      {/* Top section */}
      <div className="flex items-start justify-between gap-3 p-5 pb-4">
        <div className="flex-1 min-w-0">
          <Link
            href={`/team/${team.idTeam}`}
            className="group/link flex items-center gap-1.5 font-semibold text-[#f5f5f5] hover:text-[#ff6b35] transition-colors text-base"
            title={team.strTeam}
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <span className="truncate">{team.strTeam}</span>
            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover/link:opacity-100 flex-shrink-0 transition-opacity" />
          </Link>
          {team.strTeamShort && (
            <span className="font-mono text-xs text-[#5a5a5a] mt-0.5">{team.strTeamShort}</span>
          )}
        </div>
        <FavoriteButton team={team} size="sm" />
      </div>

      {/* Team badge */}
      <Link
        href={`/team/${team.idTeam}`}
        className="flex items-center justify-center py-6 px-5 border-y border-[#2d2d2d] bg-[#0f0f0f] group-hover:bg-[#141414] transition-colors"
      >
        {badgeUrl ? (
          <img
            src={badgeUrl}
            alt={team.strTeam}
            className="h-28 w-28 object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center text-[#3d3d3d]">
            <Shield className="h-14 w-14 stroke-[1]" />
          </div>
        )}
      </Link>

      {/* Meta rows */}
      <div className="px-5 py-4 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[#5a5a5a] text-xs uppercase tracking-wide">
            <Trophy className="h-3.5 w-3.5" />
            Liga
          </span>
          <span className="font-medium text-[#f5f5f5] truncate max-w-[160px] text-sm">
            {team.strLeague || "—"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[#5a5a5a] text-xs uppercase tracking-wide">
            <MapPin className="h-3.5 w-3.5" />
            Negara
          </span>
          <span className="font-medium text-[#f5f5f5] truncate max-w-[160px] text-sm">
            {team.strCountry || "—"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-[#5a5a5a] text-xs uppercase tracking-wide">Tahun</span>
          <span className="font-medium text-[#f5f5f5] text-sm">
            {team.intFormedYear || "—"}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <Link
          href={`/team/${team.idTeam}`}
          className="flex w-full items-center justify-center rounded-xl border border-[#2d2d2d] py-3 text-xs font-semibold text-[#8a8a8a] transition-all hover:border-[#ff6b35] hover:text-[#ff6b35] hover:bg-[#ff6b35]/5"
        >
          Lihat Profil
        </Link>
      </div>
    </div>
  );
}
