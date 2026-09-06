import { Suspense } from "react";
import Link from "next/link";
import { searchTeams } from "@/lib/api";
import SearchForm from "../components/SearchForm";
import TeamCard from "../components/TeamCard";
import { RotateCcw } from "lucide-react";
import { HeroSectionSkeleton, TeamListSkeleton } from "../components/Skeletons";

type TeamsPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function TeamsPage({ searchParams }: TeamsPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() || "";

  let teams = [];
  let isFeatured = false;

  if (query) {
    teams = await searchTeams(query);
  } else {
    teams = await searchTeams("Real Madrid");
    isFeatured = true;
  }

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

      {/* ── LEFT PANEL ── Search & Context */}
      <aside className="w-full lg:col-span-7">
        <div className="lg:sticky lg:top-[76px] space-y-6">
          <Suspense fallback={<HeroSectionSkeleton variant="team" />}>
            {/* Hero section */}
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-20 h-20 bg-[#ff6b35]/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] animate-pulse" />
                  <span className="text-[11px] font-medium text-[#ff6b35] uppercase tracking-wider">Database Klub</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-bold text-[#f5f5f5] leading-tight mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Temukan<br />
                  <span className="text-[#ff6b35]">Klub</span> Legendaris
                </h1>
                
                <p className="text-base text-[#8a8a8a] leading-relaxed max-w-md mb-6">
                  Jelajahi ribuan profil klub dari seluruh dunia. Dari raksasa Eropa sampai tim lokal dengan sejarah panjang.
                </p>

                <div className="flex items-center gap-4 text-sm text-[#8a8a8a]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#ffd700]" />
                    <span>20K+ Klub</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#ff6b35]" />
                    <span>150+ Liga</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Form */}
            <SearchForm initialQuery={query} searchType="team" />

            {/* Attribution */}
            <p className="text-xs text-[#5a5a5a]">
              Data powered by{" "}
              <a
                href="https://www.thesportsdb.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#ff6b35] hover:text-[#ff8555] underline underline-offset-2 transition-colors"
              >
                TheSportsDB
              </a>
            </p>
          </Suspense>
        </div>
      </aside>

      {/* ── RIGHT PANEL ── Results */}
      <section className="w-full lg:col-span-5 mt-8 lg:mt-0">
        {/* Results header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#2d2d2d] pb-4 mb-6">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-[#f5f5f5] truncate" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              {isFeatured ? "Pilihan Editor" : `"${query}"`}
            </h2>
            <p className="text-xs text-[#8a8a8a] mt-1">
              {isFeatured ? "Klub terkenal untuk mulai eksplorasi" : `${teams.length} hasil ditemukan`}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {!isFeatured && (
              <Link
                href="/teams"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#2d2d2d] bg-[#1a1a1a] px-3 py-2 text-xs font-medium text-[#8a8a8a] hover:text-[#f5f5f5] hover:border-[#3d3d3d] transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </Link>
            )}
            <span
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium border ${
                teams.length > 0
                  ? "border-[#ff6b35]/30 bg-[#ff6b35]/10 text-[#ff6b35]"
                  : "border-[#2d2d2d] bg-[#1a1a1a] text-[#5a5a5a]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  teams.length > 0 ? "bg-[#ff6b35]" : "bg-[#5a5a5a]"
                }`}
              />
              {teams.length}
            </span>
          </div>
        </div>

        {/* Team grid */}
        {teams.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-[#2d2d2d] rounded-2xl px-6 py-16 text-center">
            <p className="text-sm font-medium text-[#8a8a8a] mb-1">
              Tidak ada klub yang cocok dengan "{query}"
            </p>
            <p className="text-xs text-[#5a5a5a] max-w-xs">
              Periksa ejaan nama atau gunakan nama yang lebih pendek.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1">
            {teams.map((team) => (
              <TeamCard key={team.idTeam} team={team} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
