import Link from "next/link";
import { User, Shield, Flag, ArrowUpRight } from "lucide-react";
import { Player } from "@/types";
import { FavoriteButton } from "@/features/favorites";
import { getPositionBadgeClass } from "../utils";

export interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const imageUrl = player.strCutout || player.strThumb || player.strRender;
  const positionClass = getPositionBadgeClass(player.strPosition);

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-[#2d2d2d] bg-[#1a1a1a] transition-all duration-300 hover:border-[#ff6b35]/50 hover:bg-[#242424] hover:shadow-xl hover:shadow-[#ff6b35]/5">
      {/* Top section */}
      <div className="flex items-start justify-between gap-3 p-5 pb-4">
        <div className="flex-1 min-w-0">
          <Link
            href={`/player/${player.idPlayer}`}
            className="group/link flex items-center gap-1.5 font-semibold text-[#f5f5f5] hover:text-[#ff6b35] transition-colors text-base"
            title={player.strPlayer}
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <span className="truncate">{player.strPlayer}</span>
            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover/link:opacity-100 flex-shrink-0 transition-opacity" />
          </Link>
          {player.strNumber && (
            <span className="font-mono text-xs text-[#5a5a5a] mt-0.5">#{player.strNumber}</span>
          )}
        </div>
        <FavoriteButton player={player} size="sm" />
      </div>

      {/* Player image */}
      <Link
        href={`/player/${player.idPlayer}`}
        className="flex items-center justify-center py-6 px-5 border-y border-[#2d2d2d] bg-[#0f0f0f] group-hover:bg-[#141414] transition-colors"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={player.strPlayer}
            className="h-36 w-36 object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="flex h-36 w-36 items-center justify-center text-[#3d3d3d]">
            <User className="h-16 w-16 stroke-[1]" />
          </div>
        )}
      </Link>

      {/* Meta rows */}
      <div className="px-5 py-4 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[#5a5a5a] text-xs uppercase tracking-wide">Posisi</span>
          {player.strPosition ? (
            <span className={`inline-block rounded-lg border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${positionClass}`}>
              {player.strPosition}
            </span>
          ) : (
            <span className="text-[#3d3d3d] text-xs">—</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[#5a5a5a] text-xs uppercase tracking-wide">
            <Shield className="h-3.5 w-3.5" />
            Klub
          </span>
          {player.idTeam ? (
            <Link
              href={`/team/${player.idTeam}`}
              className="font-medium text-[#f5f5f5] hover:text-[#ff6b35] transition-colors truncate max-w-[160px] text-sm"
            >
              {player.strTeam || "—"}
            </Link>
          ) : (
            <span className="font-medium text-[#f5f5f5] truncate max-w-[160px] text-sm">
              {player.strTeam || "—"}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[#5a5a5a] text-xs uppercase tracking-wide">
            <Flag className="h-3.5 w-3.5" />
            Negara
          </span>
          <span className="font-medium text-[#f5f5f5] truncate max-w-[160px] text-sm">
            {player.strNationality || "—"}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <Link
          href={`/player/${player.idPlayer}`}
          className="flex w-full items-center justify-center rounded-xl border border-[#2d2d2d] py-3 text-xs font-semibold text-[#8a8a8a] transition-all hover:border-[#ff6b35] hover:text-[#ff6b35] hover:bg-[#ff6b35]/5"
        >
          Lihat Profil
        </Link>
      </div>
    </div>
  );
}
