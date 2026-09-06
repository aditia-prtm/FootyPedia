import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  MapPin,
  Calendar,
  Trophy,
  Building,
  Globe,
} from "lucide-react";
import { getTeamById } from "@/lib/api";
import ExpandableText from "@/app/components/ExpandableText";

type TeamPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: TeamPageProps) {
  const { id } = await params;
  const team = await getTeamById(id);
  if (!team) {
    return { title: "Klub Tidak Ditemukan | FootyPedia" };
  }
  return {
    title: `${team.strTeam} - Profil Klub & Skuad Pemain | FootyPedia`,
    description: `Profil klub ${team.strTeam}, stadion ${team.strStadium || "utama"}, liga ${team.strLeague || "sepak bola"}.`,
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params;
  const team = await getTeamById(id);

  if (!team) notFound();

  const infoItems = [
    { label: "Liga",            value: team.strLeague,           icon: Trophy   },
    { label: "Negara",          value: team.strCountry,          icon: Globe    },
    { label: "Tahun Berdiri",   value: team.intFormedYear,       icon: Calendar },
    { label: "Stadion",         value: team.strStadium,          icon: Building },
    { label: "Lokasi Stadion",  value: team.strStadiumLocation,  icon: MapPin   },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* ── Navigation bar ── */}
      <div className="flex items-center justify-between gap-4 border-b border-[#2d2d2d] pb-5">
        <Link
          href="/teams"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#2d2d2d] bg-[#1a1a1a] px-4 py-2 text-xs font-medium text-[#8a8a8a] transition hover:text-[#f5f5f5] hover:border-[#3d3d3d]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Pencarian
        </Link>
      </div>

      {/* ── Breadcrumb label ── */}
      <p className="text-[11px] font-medium tracking-widest text-[#5a5a5a] uppercase">
        Profil Klub
      </p>

      {/* ── Hero card ── */}
      <div className="border border-[#2d2d2d] bg-[#1a1a1a] rounded-2xl overflow-hidden">

        {/* Top section: badge + name + info grid */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-0">

          {/* Badge column */}
          <div className="flex-shrink-0 border-b md:border-b-0 md:border-r border-[#2d2d2d] bg-[#0f0f0f] flex items-center justify-center p-8 w-full md:w-56 lg:w-64">
            {team.strBadge ? (
              <img
                src={team.strBadge}
                alt={team.strTeam}
                className="h-40 w-40 object-contain filter drop-shadow-lg"
              />
            ) : (
              <Shield className="h-28 w-28 text-[#3d3d3d]" />
            )}
          </div>

          {/* Name + info grid column */}
          <div className="flex-1 p-6 sm:p-8 w-full">
            <div className="border-b border-[#2d2d2d] pb-5 mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5] leading-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {team.strTeam}
              </h1>
              {team.strTeamAlternate && (
                <p className="mt-2 text-xs text-[#5a5a5a]">
                  Alias:{" "}
                  <span className="text-[#8a8a8a]">{team.strTeamAlternate}</span>
                </p>
              )}
            </div>

            {/* Info grid */}
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
          </div>
        </div>

        {/* Club Description */}
        {team.strDescriptionEN && (
          <div className="border-t border-[#2d2d2d] px-6 sm:px-8 py-6 space-y-3">
            <div className="flex items-center gap-2 border-b border-[#2d2d2d] pb-4">
              <Globe className="h-4 w-4 text-[#ff6b35]" />
              <h3 className="text-sm font-semibold text-[#f5f5f5]">Tentang Klub</h3>
            </div>
            <ExpandableText
              text={team.strDescriptionEN}
              textClassName="text-sm text-[#8a8a8a] leading-relaxed whitespace-pre-line"
            />
          </div>
        )}
      </div>
    </div>
  );
}
