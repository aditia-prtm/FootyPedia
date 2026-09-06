import { SearchX } from "lucide-react";
import { Player } from "@/types";
import PlayerCard from "./PlayerCard";

export interface PlayerListProps {
  players: Player[];
  emptyMessage?: string;
  showTips?: boolean;
  maxColumns?: 1 | 2 | 3 | 4;
}

export default function PlayerList({
  players,
  emptyMessage = "Pemain tidak ditemukan.",
  showTips = true,
  maxColumns = 4,
}: PlayerListProps) {
  if (!players || players.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-[#2d2d2d] rounded-2xl px-6 py-16 text-center">
        <SearchX className="h-12 w-12 text-[#3d3d3d] mb-4 stroke-[1.5]" />
        <p className="text-sm font-medium text-[#8a8a8a] mb-1">
          {emptyMessage}
        </p>
        <p className="text-xs text-[#5a5a5a] max-w-xs">
          Periksa ejaan nama atau gunakan nama yang lebih pendek.
        </p>

        {showTips && (
          <div className="mt-5 border-t border-[#2d2d2d] pt-5 w-full max-w-xs">
            <p className="text-[11px] text-[#5a5a5a] uppercase tracking-wider mb-2">Tips</p>
            <ul className="text-[12px] text-[#5a5a5a] space-y-1 text-left">
              <li>· Pastikan ejaan sudah benar (contoh: &ldquo;Messi&rdquo;)</li>
              <li>· Coba nama depan atau nama belakang saja</li>
              <li>· Gunakan alfabet standar (tanpa aksara khusus)</li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  const colsClass =
    maxColumns === 1
      ? "grid-cols-1"
      : maxColumns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : maxColumns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className={`grid gap-4 ${colsClass}`}>
      {players.map((player) => (
        <PlayerCard key={player.idPlayer} player={player} />
      ))}
    </div>
  );
}
