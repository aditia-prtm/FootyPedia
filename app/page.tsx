import { Suspense } from "react";
import Link from "next/link";
import { searchPlayers } from "@/lib/api";
import SearchForm from "./components/SearchForm";
import PlayerList from "./components/PlayerList";
import { PlayerListSkeleton } from "./components/Skeletons";
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
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6 items-start">

      {/* ── LEFT PANEL ── Search & Context */}
      <aside className="w-full">
        <div className="lg:sticky lg:top-[76px] space-y-0">

          {/* Site context bar */}
          <div className="border-b border-[#1e2d3d] pb-5 mb-6">
            <p className="text-[11px] font-medium tracking-widest text-[#475569] uppercase mb-3">
              Ensiklopedia Sepak Bola
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100 leading-snug">
              Cari pemain,<br className="hidden sm:block" /> baca statistik.
            </h1>
            <p className="mt-2 text-sm text-[#64748b] leading-relaxed max-w-sm">
              Data pemain dari seluruh liga dunia — profil, klub, posisi, dan karier lengkap.
            </p>
          </div>

          {/* Search Form */}
          <SearchForm initialQuery={query} />

          {/* Stats bar */}
          <div className="mt-8 hidden lg:grid grid-cols-3 gap-px bg-[#1e2d3d] border border-[#1e2d3d] rounded-lg overflow-hidden">
            <div className="bg-[#0a0d13] px-4 py-3">
              <span className="block text-xl font-semibold text-slate-100 tabular-nums">250K+</span>
              <span className="block text-[11px] text-[#64748b] mt-0.5">Pemain + Pelatih</span>
            </div>
            <div className="bg-[#0a0d13] px-4 py-3">
              <span className="block text-xl font-semibold text-slate-100 tabular-nums">20K+</span>
              <span className="block text-[11px] text-[#64748b] mt-0.5">Klub</span>
            </div>
            <div className="bg-[#0a0d13] px-4 py-3">
              <span className="block text-xl font-semibold text-slate-100 tabular-nums">Real-time</span>
              <span className="block text-[11px] text-[#64748b] mt-0.5">Diperbarui</span>
            </div>
          </div>

          {/* Attribution */}
          <p className="hidden lg:flex mt-4 gap-1 text-[11px] text-[#334155]">
            Sumber data:
            <a
              href="https://www.thesportsdb.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#475569] hover:text-[#64748b] underline underline-offset-2 transition-colors"
            >
              TheSportsDB API
            </a>
          </p>
        </div>
      </aside>

      {/* ── RIGHT PANEL ── Results (structure preserved, styling updated) */}
      <section className="w-full mt-8 lg:mt-0">
        {/* Results header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#1e2d3d] pb-4 mb-5">
          <div className="min-w-0">
            <h2 className="text-sm font-medium text-slate-300 truncate">
              {isFeatured
                ? "Pemain Terbaik Sepanjang Masa"
                : `"${query}" —  hasil`}
            </h2>
            <p className="text-[11px] text-[#475569] mt-0.5">
              {isFeatured ? "Contoh pencarian" : "Hasil pencarian"}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {!isFeatured && (
              <Link
                href="/"
                className="inline-flex items-center gap-1 rounded border border-[#1e2d3d] bg-[#111827] px-2.5 py-1.5 text-[11px] font-medium text-[#64748b] hover:text-slate-300 hover:border-[#2a3d52] transition"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </Link>
            )}
            <span
              className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-[11px] font-medium border ${
                players.length > 0
                  ? "border-[#065f46] bg-[#022c22] text-[#34d399]"
                  : "border-[#1e2d3d] bg-[#111827] text-[#475569]"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  players.length > 0 ? "bg-emerald-400" : "bg-slate-600"
                }`}
              />
              {players.length} pemain
            </span>
          </div>
        </div>

        {/* Player grid — structure unchanged, 1 column */}
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
