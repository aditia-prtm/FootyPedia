import Link from "next/link";
import { User, Shield, Flag, ArrowUpRight } from "lucide-react";
import { Player } from "@/lib/types";
import FavoriteButton from "./FavoriteButton";

interface PlayerCardProps {
  player: Player;
}

function getPositionTag(pos?: string) {
  if (!pos) return null;
  const lower = pos.toLowerCase();

  let color = "text-[#64748b] border-[#1e2d3d] bg-[#0f1621]";

  if (lower.includes("forward") || lower.includes("striker") || lower.includes("winger") || lower.includes("attack")) {
    color = "text-rose-400 border-[#3d1a27] bg-[#1a0a10]";
  } else if (lower.includes("midfield")) {
    color = "text-[#34d399] border-[#065f46] bg-[#022c22]";
  } else if (lower.includes("defender") || lower.includes("back")) {
    color = "text-blue-400 border-[#1e3a5f] bg-[#0d1f35]";
  } else if (lower.includes("goalkeeper") || lower.includes("keeper")) {
    color = "text-amber-400 border-[#5c3e10] bg-[#2a1a05]";
  }

  return (
    <span className={`inline-block rounded border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${color}`}>
      {pos}
    </span>
  );
}

export default function PlayerCard({ player }: PlayerCardProps) { 
  const imageUrl =  player.strFanart1 || player.strCutout || player.strThumb || player.strRender;

  return (
    <div className="group relative flex flex-col justify-between border border-[#1e2d3d] bg-[#0d1117] transition-colors duration-200 hover:border-[#2a3d52] hover:bg-[#111827]">

      {/* Top section */}
      <div className="flex items-start justify-between gap-3 p-4 pb-3">
        <div className="flex-1 min-w-0">
          <Link
            href={`/player/${player.idPlayer}`}
            className="group/link flex items-center gap-1 font-semibold text-slate-200 hover:text-[#34d399] transition-colors text-sm"
            title={player.strPlayer}
          >
            <span className="truncate">{player.strPlayer}</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover/link:opacity-100 flex-shrink-0 transition-opacity" />
          </Link>
          {player.strNumber && (
            <span className="font-mono text-[11px] text-[#475569]">#{player.strNumber}</span>
          )}
        </div>
        <FavoriteButton player={player} size="sm" />
      </div>

      {/* Player image — contained, no scale effect */}
      <Link
        href={`/player/${player.idPlayer}`}
        className="flex items-center justify-center py-4 px-4 border-y border-[#1e2d3d] bg-[#080c12]"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={player.strPlayer}
            className="h-32 w-32 object-contain filter drop-shadow-sm"
            loading="lazy"
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center text-[#334155]">
            <User className="h-14 w-14 stroke-[1]" />
          </div>
        )}
      </Link>

      {/* Meta rows */}
      <div className="px-4 py-3 space-y-2 text-[12px]">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[#475569]">Posisi</span>
          {getPositionTag(player.strPosition) ?? <span className="text-[#334155]">—</span>}
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1 text-[#475569]">
            <Shield className="h-3 w-3" />
            Klub
          </span>
          {player.idTeam ? (
            <Link
              href={`/team/${player.idTeam}`}
              className="font-medium text-slate-300 hover:text-[#34d399] transition-colors truncate max-w-[150px]"
            >
              {player.strTeam || "—"}
            </Link>
          ) : (
            <span className="font-medium text-slate-300 truncate max-w-[150px]">
              {player.strTeam || "—"}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1 text-[#475569]">
            <Flag className="h-3 w-3" />
            Negara
          </span>
          <span className="font-medium text-slate-300 truncate max-w-[150px]">
            {player.strNationality || "—"}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <Link
          href={`/player/${player.idPlayer}`}
          className="flex w-full items-center justify-center rounded border border-[#1e2d3d] py-2 text-[11px] font-medium text-[#64748b] transition hover:border-[#10b981]/40 hover:text-[#34d399] hover:bg-[#022c22]/30"
        >
          Lihat profil lengkap
        </Link>
      </div>
    </div>
  );
}
