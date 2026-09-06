import React from "react";

export function PlayerCardSkeleton() {
  return (
    <div className="relative flex flex-col justify-between rounded-2xl border border-[#2d2d2d] bg-[#1a1a1a]">
      {/* Top */}
      <div className="flex items-start justify-between gap-3 p-5 pb-4">
        <div className="space-y-2 flex-1">
          <div className="h-5 w-3/4 rounded-lg bg-[#2d2d2d] animate-pulse" />
          <div className="h-3.5 w-1/3 rounded-lg bg-[#242424] animate-pulse" />
        </div>
        <div className="h-8 w-8 rounded-xl bg-[#2d2d2d] animate-pulse" />
      </div>

      {/* Image area */}
      <div className="flex justify-center border-y border-[#2d2d2d] bg-[#0f0f0f] py-6">
        <div className="h-36 w-36 rounded-xl bg-[#2d2d2d] animate-pulse" />
      </div>

      {/* Meta rows */}
      <div className="px-5 py-4 space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-3.5 w-16 rounded-lg bg-[#242424] animate-pulse" />
            <div className="h-3.5 w-28 rounded-lg bg-[#2d2d2d] animate-pulse" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <div className="h-11 w-full rounded-xl bg-[#242424] animate-pulse" />
      </div>
    </div>
  );
}

export function PlayerListSkeleton({
  count = 1,
  maxColumns = 1,
}: {
  count?: number;
  maxColumns?: 1 | 2 | 3 | 4;
}) {
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
      {Array.from({ length: count }).map((_, i) => (
        <PlayerCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PlayerDetailSkeleton() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-pulse">
      <div className="h-8 w-48 rounded-lg bg-[#2d2d2d]" />
      <div className="border border-[#2d2d2d] bg-[#1a1a1a] rounded-2xl overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-0 items-center md:items-start">
          <div className="h-52 w-52 sm:h-60 sm:w-60 bg-[#0f0f0f] flex-shrink-0 border-b md:border-b-0 md:border-r border-[#2d2d2d] p-8" />
          <div className="flex-1 p-6 sm:p-8 w-full space-y-6">
            <div className="space-y-3">
              <div className="h-10 w-80 rounded-lg bg-[#2d2d2d]" />
              <div className="h-4 w-48 rounded-lg bg-[#242424]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-[#242424] p-4 space-y-2">
                  <div className="h-3.5 w-20 rounded-lg bg-[#2d2d2d]" />
                  <div className="h-5 w-28 rounded-lg bg-[#2d2d2d]" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#2d2d2d] space-y-3">
          <div className="h-5 w-36 rounded-lg bg-[#2d2d2d]" />
          <div className="h-3 w-full rounded-lg bg-[#242424]" />
          <div className="h-3 w-11/12 rounded-lg bg-[#242424]" />
          <div className="h-3 w-3/4 rounded-lg bg-[#242424]" />
        </div>
      </div>
    </div>
  );
}

export function TeamDetailSkeleton() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-pulse">
      <div className="h-8 w-48 rounded-lg bg-[#2d2d2d]" />
      <div className="border border-[#2d2d2d] bg-[#1a1a1a] rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row gap-0 items-center">
        <div className="h-40 w-40 bg-[#0f0f0f] flex-shrink-0 border-b md:border-b-0 md:border-r border-[#2d2d2d] p-8" />
        <div className="flex-1 p-6 sm:p-8 w-full space-y-6">
          <div className="space-y-3">
            <div className="h-10 w-80 rounded-lg bg-[#2d2d2d]" />
            <div className="h-4 w-48 rounded-lg bg-[#242424]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-[#242424] p-4 space-y-2">
                <div className="h-3.5 w-20 rounded-lg bg-[#2d2d2d]" />
                <div className="h-5 w-28 rounded-lg bg-[#2d2d2d]" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-[#2d2d2d] space-y-3">
        <div className="h-5 w-36 rounded-lg bg-[#2d2d2d]" />
        <div className="h-3 w-full rounded-lg bg-[#242424]" />
        <div className="h-3 w-11/12 rounded-lg bg-[#242424]" />
        <div className="h-3 w-3/4 rounded-lg bg-[#242424]" />
      </div>
    </div>
  );
}

export function TeamCardSkeleton() {
  return (
    <div className="relative flex flex-col justify-between rounded-2xl border border-[#2d2d2d] bg-[#1a1a1a]">
      {/* Top */}
      <div className="flex items-start justify-between gap-3 p-5 pb-4">
        <div className="space-y-2 flex-1">
          <div className="h-5 w-3/4 rounded-lg bg-[#2d2d2d] animate-pulse" />
          <div className="h-3.5 w-1/3 rounded-lg bg-[#242424] animate-pulse" />
        </div>
      </div>

      {/* Image area */}
      <div className="flex justify-center border-y border-[#2d2d2d] bg-[#0f0f0f] py-6">
        <div className="h-28 w-28 rounded-xl bg-[#2d2d2d] animate-pulse" />
      </div>

      {/* Meta rows */}
      <div className="px-5 py-4 space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-3.5 w-16 rounded-lg bg-[#242424] animate-pulse" />
            <div className="h-3.5 w-28 rounded-lg bg-[#2d2d2d] animate-pulse" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <div className="h-11 w-full rounded-xl bg-[#242424] animate-pulse" />
      </div>
    </div>
  );
}

export function TeamListSkeleton({
  count = 1,
  maxColumns = 1,
}: {
  count?: number;
  maxColumns?: 1 | 2 | 3 | 4;
}) {
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
      {Array.from({ length: count }).map((_, i) => (
        <TeamCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FavoritesPageSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d2d2d] pb-6">
        <div className="space-y-3">
          <div className="h-8 w-48 rounded-lg bg-[#2d2d2d]" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#2d2d2d]" />
            <div className="space-y-2">
              <div className="h-8 w-64 rounded-lg bg-[#2d2d2d]" />
              <div className="h-4 w-32 rounded-lg bg-[#242424]" />
            </div>
          </div>
        </div>
        <div className="h-11 w-64 rounded-lg bg-[#2d2d2d]" />
      </div>

      {/* Content */}
      <PlayerListSkeleton count={4} />
    </div>
  );
}

const POPULAR_SEARCH_SKELETONS = {
  player: [
    "Cristiano Ronaldo",
    "Lionel Messi",
    "Neymar",
    "Erling Haaland",
    "Kylian Mbappe",
    "Jude Bellingham",
  ],
  team: [
    "Real Madrid",
    "Manchester United",
    "Barcelona",
    "Bayern Munich",
    "Liverpool",
    "Paris Saint Germain",
  ],
} as const;

function PopularSearchesSkeleton({ names }: { names: readonly string[] }) {
  return (
    <div className="flex flex-col">
      <div className="mb-3 h-4 w-24 rounded bg-[#2d2d2d] animate-pulse" />
      <div className="flex flex-wrap gap-2">
        {names.map((name) => (
          <div
            key={name}
            className="rounded-lg border border-[#2d2d2d] bg-[#1a1a1a] px-3 py-2 text-xs font-medium animate-pulse"
          >
            <span className="invisible">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SearchFormSkeleton({
  searchType = "player",
}: {
  searchType?: "player" | "team";
}) {
  const names = POPULAR_SEARCH_SKELETONS[searchType];

  return (
    <div className="w-full space-y-5">
      <div className="flex lg:hidden flex-col">
        <PopularSearchesSkeleton names={names} />
      </div>

      <div>
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute left-4 h-5 w-5 rounded bg-[#2d2d2d] animate-pulse" />
          <div className="w-full rounded-xl border-2 border-[#2d2d2d] bg-[#1a1a1a] py-4 pl-12 pr-12">
            <div className="h-6 w-28 rounded bg-[#2d2d2d] animate-pulse" />
          </div>
        </div>
        <div className="mt-3 h-[50px] w-full rounded-xl bg-[#ff6b35]/25 animate-pulse" />
      </div>

      <div className="hidden lg:flex flex-col">
        <PopularSearchesSkeleton names={names} />
      </div>
    </div>
  );
}

export function HeroSectionSkeleton({
  variant = "player",
}: {
  variant?: "player" | "team";
}) {
  const isTeam = variant === "team";

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -top-2 -left-2 w-20 h-20 bg-[#ff6b35]/10 rounded-full blur-2xl" />
        <div className="relative">
          {isTeam && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]/50 animate-pulse" />
              <div className="h-3 w-24 rounded bg-[#ff6b35]/20 animate-pulse" />
            </div>
          )}

          <div className={`space-y-2 ${isTeam ? "mb-4" : "mt-4"}`}>
            <div className="h-10 sm:h-12 w-40 sm:w-48 rounded-lg bg-[#2d2d2d] animate-pulse" />
            <div className="h-10 sm:h-12 w-56 sm:w-72 rounded-lg bg-[#2d2d2d] animate-pulse" />
          </div>

          <div className="max-w-md space-y-2 mb-6">
            <div className="h-4 w-full rounded bg-[#242424] animate-pulse" />
            <div className="h-4 w-11/12 rounded bg-[#242424] animate-pulse" />
            <div className="h-4 w-2/3 rounded bg-[#242424] animate-pulse" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ffd700]/40 animate-pulse" />
              <div className="h-4 w-24 rounded bg-[#242424] animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ff6b35]/40 animate-pulse" />
              <div className="h-4 w-20 rounded bg-[#242424] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <SearchFormSkeleton searchType={variant} />

      <div
        className={`h-3 w-48 rounded bg-[#242424] animate-pulse ${
          isTeam ? "" : "hidden lg:block"
        }`}
      />
    </div>
  );
}

export function SearchPageSkeleton({
  variant = "player",
}: {
  variant?: "player" | "team";
}) {
  const isTeam = variant === "team";

  return (
    <div
      className={`w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-start ${
        isTeam ? "gap-8 lg:gap-10" : "lg:gap-10"
      }`}
    >
      <aside className="w-full lg:col-span-7">
        <div className="lg:sticky lg:top-[76px] space-y-6">
          <HeroSectionSkeleton variant={variant} />
        </div>
      </aside>

      <section className={`w-full lg:col-span-5 ${isTeam ? "mt-8 lg:mt-0" : ""}`}>
        <div className="flex items-center justify-between gap-3 border-b border-[#2d2d2d] pb-4 mb-6">
          <div className="space-y-2">
            <div className="h-5 w-36 rounded-lg bg-[#2d2d2d] animate-pulse" />
            <div className="h-3 w-48 rounded bg-[#242424] animate-pulse" />
          </div>
          <div className="h-9 w-14 rounded-lg border border-[#2d2d2d] bg-[#1a1a1a] animate-pulse" />
        </div>
        {isTeam ? (
          <TeamListSkeleton count={1} maxColumns={1} />
        ) : (
          <PlayerListSkeleton count={1} maxColumns={1} />
        )}
      </section>
    </div>
  );
}
