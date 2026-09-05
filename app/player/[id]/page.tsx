import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  Flag,
  Calendar,
  MapPin,
  User,
  Activity,
  ArrowRight,
} from "lucide-react";
import { getPlayerById } from "@/lib/api";
import FavoriteButton from "@/app/components/FavoriteButton";
import ExpandableText from "@/app/components/ExpandableText";

type PlayerPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PlayerPageProps) {
  const { id } = await params;
  const player = await getPlayerById(id);
  if (!player) {
    return { title: "Pemain Tidak Ditemukan | FootyPedia" };
  }
  return {
    title: `${player.strPlayer} - Profil & Statistik | FootyPedia`,
    description: `Profil lengkap ${player.strPlayer}, pemain ${player.strTeam || "sepak bola"} dari ${player.strNationality || "dunia"}.`,
  };
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const player = await getPlayerById(id);

  if (!player) notFound();

  const imageUrl = player.strRender || player.strCutout || player.strThumb;

  const statItems = [
    {
      label: "Klub Saat Ini",
      value: player.strTeam,
      icon: Shield,
      highlight: true,
      link: player.idTeam ? `/team/${player.idTeam}` : undefined,
    },
    { label: "Posisi",         value: player.strPosition,     icon: Activity },
    { label: "Negara",         value: player.strNationality,  icon: Flag     },
    { label: "Nomor Punggung", value: player.strNumber ? `#${player.strNumber}` : "-", icon: User },
    { label: "Tanggal Lahir",  value: player.dateBorn,        icon: Calendar },
    { label: "Tempat Lahir",   value: player.strBirthLocation, icon: MapPin  },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* ── Navigation bar ── */}
      <div className="flex items-center justify-between gap-4 border-b border-[#1e2d3d] pb-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded border border-[#1e2d3d] bg-[#111827] px-3 py-1.5 text-[11px] font-medium text-[#64748b] transition hover:text-slate-300 hover:border-[#2a3d52]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Pencarian
        </Link>

        <FavoriteButton player={player} size="lg" showText />
      </div>

      {/* ── Breadcrumb label ── */}
      <p className="text-[11px] font-medium tracking-widest text-[#475569] uppercase">
        Profil Pemain
      </p>

      {/* ── Hero card ── */}
      <div className="border border-[#1e2d3d] bg-[#0d1117]">

        {/* Top section: photo + name + status */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-0 md:gap-0">

          {/* Photo column */}
          <div className="flex-shrink-0 border-b md:border-b-0 md:border-r border-[#1e2d3d] bg-[#080c12] flex flex-col items-center justify-center p-6 w-full md:w-56 lg:w-64">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={player.strPlayer}
                className="h-48 w-48 sm:h-56 sm:w-56 object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-[#334155] h-48 w-48">
                <User className="h-20 w-20 stroke-[1]" />
                <span className="text-[11px] mt-2">Foto Tidak Tersedia</span>
              </div>
            )}

            {player.strStatus && (
              <span className="mt-4 inline-flex items-center gap-1.5 rounded border border-[#065f46] bg-[#022c22] px-2.5 py-1 text-[11px] font-medium text-[#34d399]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {player.strStatus}
              </span>
            )}
          </div>

          {/* Name + stats column */}
          <div className="flex-1 p-6 sm:p-8 w-full">
            <div className="border-b border-[#1e2d3d] pb-5 mb-6">
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100 leading-snug">
                {player.strPlayer}
              </h1>
              {player.strPlayerAlternate && (
                <p className="mt-1 text-[11px] text-[#475569]">
                  Alias:{" "}
                  <span className="text-[#64748b]">{player.strPlayerAlternate}</span>
                </p>
              )}
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e2d3d] border border-[#1e2d3d]">
              {statItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`p-3.5 ${
                      item.highlight ? "bg-[#022c22]" : "bg-[#0d1117]"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-[#475569] uppercase tracking-wider mb-1.5">
                      <Icon className="h-3 w-3" />
                      {item.label}
                    </div>

                    {item.link ? (
                      <Link
                        href={item.link}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#34d399] hover:underline truncate max-w-full"
                      >
                        <span className="truncate">{item.value || "-"}</span>
                        <ArrowRight className="h-3 w-3 flex-shrink-0" />
                      </Link>
                    ) : (
                      <div className="text-sm font-semibold text-slate-200 truncate">
                        {item.value || "-"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Biography */}
        {player.strDescriptionEN && (
          <div className="border-t border-[#1e2d3d] px-6 sm:px-8 py-6 space-y-3">
            <div className="flex items-center gap-2 border-b border-[#1e2d3d] pb-4">
              <User className="h-3.5 w-3.5 text-[#34d399]" />
              <h3 className="text-sm font-medium text-slate-300">Biografi Pemain</h3>
            </div>
            <ExpandableText
              text={player.strDescriptionEN}
              collapsedHeight="max-h-[300px]"
              textClassName="text-sm text-[#64748b] leading-relaxed whitespace-pre-line"
            />
          </div>
        )}
      </div>
    </div>
  );
}
