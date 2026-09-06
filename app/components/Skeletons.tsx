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

export function SearchFormSkeleton() {
  return (
    <div className="w-full space-y-5">
      {/* Search input */}
      <div className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 h-5 w-5 rounded-full bg-[#2d2d2d] animate-pulse" />
          <div className="w-full h-14 rounded-xl border-2 border-[#2d2d2d] bg-[#1a1a1a] animate-pulse" />
        </div>
        <div className="mt-3 h-11 w-full rounded-xl bg-[#2d2d2d] animate-pulse" />
      </div>

      {/* Popular searches */}
      <div className="flex flex-col">
        <div className="h-4 w-32 rounded-lg bg-[#2d2d2d] animate-pulse mb-3" />
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-9 w-28 rounded-lg border border-[#2d2d2d] bg-[#1a1a1a] animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSectionSkeleton() {
  return (
    <div className="space-y-6">
      {/* Hero section */}
      <div className="relative">
        <div className="h-8 w-40 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 animate-pulse mb-5" />
        <div className="space-y-4">
          <div className="h-16 w-3/4 rounded-lg bg-[#2d2d2d] animate-pulse" />
          <div className="h-6 w-full rounded-lg bg-[#242424] animate-pulse" />
          <div className="h-6 w-2/3 rounded-lg bg-[#242424] animate-pulse" />
        </div>
        <div className="flex items-center gap-4 mt-6">
          <div className="h-5 w-32 rounded-lg bg-[#242424] animate-pulse" />
          <div className="h-5 w-32 rounded-lg bg-[#242424] animate-pulse" />
        </div>
      </div>

      {/* Search Form */}
      <SearchFormSkeleton />

      {/* Attribution */}
      <div className="h-4 w-48 rounded-lg bg-[#242424] animate-pulse" />
    </div>
  );
}
