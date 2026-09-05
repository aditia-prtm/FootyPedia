import React from "react";

export function PlayerCardSkeleton() {
  return (
    <div className="relative flex flex-col justify-between border border-[#1e2d3d] bg-[#0d1117] animate-pulse">
      {/* Top */}
      <div className="flex items-start justify-between gap-3 p-4 pb-3">
        <div className="space-y-1.5 flex-1">
          <div className="h-4 w-3/4 rounded-sm bg-[#1e2d3d]" />
          <div className="h-3 w-1/3 rounded-sm bg-[#1a2234]" />
        </div>
        <div className="h-7 w-7 rounded bg-[#1e2d3d]" />
      </div>

      {/* Image area */}
      <div className="flex justify-center border-y border-[#1e2d3d] bg-[#080c12] py-4">
        <div className="h-32 w-32 rounded-sm bg-[#1e2d3d]" />
      </div>

      {/* Meta rows */}
      <div className="px-4 py-3 space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-3 w-14 rounded-sm bg-[#1a2234]" />
            <div className="h-3 w-24 rounded-sm bg-[#1e2d3d]" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <div className="h-8 w-full rounded bg-[#1a2234]" />
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
    <div className={`grid gap-px bg-[#1e2d3d] border border-[#1e2d3d] ${colsClass}`}>
      {Array.from({ length: count }).map((_, i) => (
        <PlayerCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PlayerDetailSkeleton() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-pulse">
      <div className="h-8 w-36 rounded-sm bg-[#1e2d3d]" />
      <div className="border border-[#1e2d3d] bg-[#0d1117] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="h-56 w-56 sm:h-64 sm:w-64 bg-[#1e2d3d] flex-shrink-0" />
          <div className="flex-1 space-y-4 w-full">
            <div className="space-y-2">
              <div className="h-8 w-60 rounded-sm bg-[#1e2d3d]" />
              <div className="h-4 w-40 rounded-sm bg-[#1a2234]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border border-[#1e2d3d] bg-[#080c12] p-3 space-y-1.5">
                  <div className="h-3 w-16 rounded-sm bg-[#1a2234]" />
                  <div className="h-5 w-24 rounded-sm bg-[#1e2d3d]" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#1e2d3d] space-y-3">
          <div className="h-5 w-32 rounded-sm bg-[#1e2d3d]" />
          <div className="h-3 w-full rounded-sm bg-[#1a2234]" />
          <div className="h-3 w-11/12 rounded-sm bg-[#1a2234]" />
          <div className="h-3 w-3/4 rounded-sm bg-[#1a2234]" />
        </div>
      </div>
    </div>
  );
}

export function TeamDetailSkeleton() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-pulse">
      <div className="h-8 w-36 rounded-sm bg-[#1e2d3d]" />
      <div className="border border-[#1e2d3d] bg-[#0d1117] p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center">
        <div className="h-28 w-28 bg-[#1e2d3d] flex-shrink-0" />
        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="h-7 w-56 rounded-sm bg-[#1e2d3d] mx-auto md:mx-0" />
          <div className="h-4 w-40 rounded-sm bg-[#1a2234] mx-auto md:mx-0" />
          <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
            <div className="h-5 w-24 rounded-sm bg-[#1e2d3d]" />
            <div className="h-5 w-28 rounded-sm bg-[#1e2d3d]" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-6 w-48 rounded-sm bg-[#1e2d3d]" />
        <PlayerListSkeleton count={6} maxColumns={3} />
      </div>
    </div>
  );
}
