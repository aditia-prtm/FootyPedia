import { Suspense } from "react";
import Link from "next/link";
import { searchPlayers } from "@/lib/api";
import SearchForm from "./components/SearchForm";
import PlayerList from "./components/PlayerList";
import { PlayerListSkeleton, HeroSectionSkeleton } from "./components/Skeletons";
import { RotateCcw } from "lucide-react";

type HomeProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const query = params.q?.trim() || "";

  let players = [];
  let isFeatured = false;

  if (query) {
    players = await searchPlayers(query);
  } else {
    players = await searchPlayers("Ronaldo");
    isFeatured = true;
  }

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 lg:gap-10 items-start">

      {/* ── LEFT PANEL ── Search & Context */}
      <aside className="w-full lg:col-span-7">
        <div className="lg:sticky lg:top-[76px] space-y-6">
          <Suspense fallback={<HeroSectionSkeleton variant="player" />}>
            {/* Hero section - more personality */}
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-20 h-20 bg-[#ff6b35]/10 rounded-full blur-2xl" />
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl font-bold text-[#f5f5f5] leading-tight mt-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Temukan<br />
                  <span className="text-[#ff6b35]">Legenda</span> Bola
                </h1>
                
                <p className="text-base text-[#8a8a8a] leading-relaxed max-w-md mb-6">
                  Jelajahi ribuan profil pemain dari seluruh dunia. Dari bintang Premier League sampai talenta muda di liga minor.
                </p>

                <div className="flex items-center gap-4 text-sm text-[#8a8a8a]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#ffd700]" />
                    <span>250K+ Pemain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#ff6b35]" />
                    <span>20K+ Klub</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Form */}
            <SearchForm initialQuery={query} />

            {/* Attribution */}
            <p className="hidden lg:flex gap-1 text-xs text-[#5a5a5a]">
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
      <section id="search-results" className="w-full lg:col-span-5 scroll-mt-20">
        {/* Results header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#2d2d2d] pb-4 mb-6">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-[#f5f5f5] truncate" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              {isFeatured ? "Pilihan Editor" : `"${query}"`}
            </h2>
            <p className="text-xs text-[#8a8a8a] mt-1">
              {isFeatured ? "Pemain terkenal untuk mulai eksplorasi" : `${players.length} hasil ditemukan`}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {!isFeatured && (
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#2d2d2d] bg-[#1a1a1a] px-3 py-2 text-xs font-medium text-[#8a8a8a] hover:text-[#f5f5f5] hover:border-[#3d3d3d] transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </Link>
            )}
            <span
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium border ${
                players.length > 0
                  ? "border-[#ff6b35]/30 bg-[#ff6b35]/10 text-[#ff6b35]"
                  : "border-[#2d2d2d] bg-[#1a1a1a] text-[#5a5a5a]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  players.length > 0 ? "bg-[#ff6b35]" : "bg-[#5a5a5a]"
                }`}
              />
              {players.length}
            </span>
          </div>
        </div>

        {/* Player grid */}
        <Suspense fallback={<PlayerListSkeleton count={1} maxColumns={1} />}>
          <PlayerList
            players={players}
            emptyMessage={`Tidak ada pemain yang cocok dengan "${query}"`}
            maxColumns={1}
          />
        </Suspense>
      </section>
    </div>
  );
}
