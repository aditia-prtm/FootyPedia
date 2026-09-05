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
      <div className="flex items-center justify-between gap-4 border-b border-[#1e2d3d] pb-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded border border-[#1e2d3d] bg-[#111827] px-3 py-1.5 text-[11px] font-medium text-[#64748b] transition hover:text-slate-300 hover:border-[#2a3d52]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Pencarian
        </Link>
      </div>

      {/* ── Breadcrumb label ── */}
      <p className="text-[11px] font-medium tracking-widest text-[#475569] uppercase">
        Profil Klub
      </p>

      {/* ── Hero card ── */}
      <div className="border border-[#1e2d3d] bg-[#0d1117]">

        {/* Top section: badge + name + info grid */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-0">

          {/* Badge column */}
          <div className="flex-shrink-0 border-b md:border-b-0 md:border-r border-[#1e2d3d] bg-[#080c12] flex items-center justify-center p-6 w-full md:w-48 lg:w-56">
            {team.strBadge ? (
              <img
                src={team.strBadge}
                alt={team.strTeam}
                className="h-36 w-36 object-contain"
              />
            ) : (
              <Shield className="h-24 w-24 text-[#1e2d3d]" />
            )}
          </div>

          {/* Name + info grid column */}
          <div className="flex-1 p-6 sm:p-8 w-full">
            <div className="border-b border-[#1e2d3d] pb-5 mb-6">
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100 leading-snug">
                {team.strTeam}
              </h1>
              {team.strTeamAlternate && (
                <p className="mt-1 text-[11px] text-[#475569]">
                  Alias:{" "}
                  <span className="text-[#64748b]">{team.strTeamAlternate}</span>
                </p>
              )}
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e2d3d] border border-[#1e2d3d]">
              {infoItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-[#0d1117] p-3.5">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#475569] uppercase tracking-wider mb-1.5">
                      <Icon className="h-3 w-3" />
                      {item.label}
                    </div>
                    <div
                      className="text-sm font-semibold text-slate-200 truncate"
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
          <div className="border-t border-[#1e2d3d] px-6 sm:px-8 py-6 space-y-3">
            <div className="flex items-center gap-2 border-b border-[#1e2d3d] pb-4">
              <Globe className="h-3.5 w-3.5 text-[#34d399]" />
              <h3 className="text-sm font-medium text-slate-300">Tentang Klub</h3>
            </div>
            <ExpandableText
              text={team.strDescriptionEN}
              textClassName="text-sm text-[#64748b] leading-relaxed whitespace-pre-line"
            />
          </div>
        )}
      </div>
    </div>
  );
}
