import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, User } from "lucide-react";
import { getPlayerById } from "@/lib/api";
import { SITE_CONFIG } from "@/config/site";
import { FavoriteButton } from "@/features/favorites";
import { PlayerStatsGrid } from "@/features/players";
import { ExpandableText } from "@/components/ui";

type PlayerPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PlayerPageProps) {
  const { id } = await params;
  const player = await getPlayerById(id);
  if (!player) {
    return { title: `Pemain Tidak Ditemukan | ${SITE_CONFIG.name}` };
  }
  return {
    title: `${player.strPlayer} - Profil & Statistik | ${SITE_CONFIG.name}`,
    description: `Profil lengkap ${player.strPlayer}, pemain ${player.strTeam || "sepak bola"} dari ${player.strNationality || "dunia"}.`,
  };
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const player = await getPlayerById(id);

  if (!player) notFound();

  const imageUrl = player.strRender || player.strThumb || player.strCutout;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* ── Navigation bar ── */}
      <div className="flex items-center justify-between gap-4 border-b border-[#2d2d2d] pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#2d2d2d] bg-[#1a1a1a] px-4 py-2 text-xs font-medium text-[#8a8a8a] transition hover:text-[#f5f5f5] hover:border-[#3d3d3d]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Pencarian
        </Link>

        <FavoriteButton player={player} size="lg" showText />
      </div>

      {/* ── Breadcrumb label ── */}
      <p className="text-[11px] font-medium tracking-widest text-[#5a5a5a] uppercase">
        Profil Pemain
      </p>

      {/* ── Hero card ── */}
      <div className="border border-[#2d2d2d] bg-[#1a1a1a] rounded-2xl overflow-hidden">
        {/* Top section: photo + name + status */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-0">
          {/* Photo column */}
          <div className="flex-shrink-0 border-b md:border-b-0 md:border-r border-[#2d2d2d] bg-[#0f0f0f] flex flex-col items-center justify-center p-8 w-full md:w-56 lg:w-64">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={player.strPlayer}
                className="h-52 w-52 sm:h-60 sm:w-60 object-contain filter drop-shadow-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-[#3d3d3d] h-52 w-52">
                <User className="h-24 w-24 stroke-[1]" />
                <span className="text-xs mt-3">Foto Tidak Tersedia</span>
              </div>
            )}

            {player.strStatus && (
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-3 py-1.5 text-[11px] font-semibold text-[#ff6b35]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b35]" />
                {player.strStatus}
              </span>
            )}
          </div>

          {/* Name + stats column */}
          <div className="flex-1 p-6 sm:p-8 w-full">
            <div className="border-b border-[#2d2d2d] pb-5 mb-6">
              <h1
                className="text-3xl sm:text-4xl font-bold text-[#f5f5f5] leading-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {player.strPlayer}
              </h1>
              {player.strPlayerAlternate && (
                <p className="mt-2 text-xs text-[#5a5a5a]">
                  Alias: <span className="text-[#8a8a8a]">{player.strPlayerAlternate}</span>
                </p>
              )}
            </div>

            {/* Stat grid */}
            <PlayerStatsGrid player={player} />
          </div>
        </div>

        {/* Biography */}
        {player.strDescriptionEN && (
          <div className="border-t border-[#2d2d2d] px-6 sm:px-8 py-6 space-y-3">
            <div className="flex items-center gap-2 border-b border-[#2d2d2d] pb-4">
              <User className="h-4 w-4 text-[#ff6b35]" />
              <h3 className="text-sm font-semibold text-[#f5f5f5]">Biografi Pemain</h3>
            </div>
            <ExpandableText
              text={player.strDescriptionEN}
              collapsedHeight="max-h-[300px]"
              textClassName="text-sm text-[#8a8a8a] leading-relaxed whitespace-pre-line"
            />
          </div>
        )}
      </div>
    </div>
  );
}
