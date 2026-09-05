import { PlayerListSkeleton } from "./components/Skeletons";

export default function Loading() {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start animate-pulse">
      {/* Left panel skeleton */}
      <div className="space-y-6">
        <div className="border-b border-[#1e2d3d] pb-5 space-y-3">
          <div className="h-3 w-32 rounded-sm bg-[#1e2d3d]" />
          <div className="h-8 w-56 rounded-sm bg-[#1e2d3d]" />
          <div className="h-4 w-72 rounded-sm bg-[#1a2234]" />
        </div>
        <div className="space-y-4">
          <div className="h-10 w-full rounded-sm bg-[#111827] border border-[#1e2d3d]" />
          <div className="flex gap-1.5 flex-wrap">
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className="h-6 w-24 rounded-sm bg-[#111827] border border-[#1e2d3d]" />
            ))}
          </div>
        </div>
      </div>

      {/* Right panel skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#1e2d3d] pb-4">
          <div className="h-4 w-40 rounded-sm bg-[#1e2d3d]" />
          <div className="h-6 w-20 rounded-sm bg-[#1e2d3d]" />
        </div>
        <PlayerListSkeleton count={1} maxColumns={1} />
      </div>
    </div>
  );
}
