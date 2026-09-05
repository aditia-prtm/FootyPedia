"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar() {
  const pathname = usePathname();
  const { favorites, isLoaded } = useFavorites();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1e2d3d] bg-[#0a0d13]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          {/* Logo mark — simple geometric, no gradient */}
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#10b981] text-[#022c22] font-bold text-sm flex-shrink-0 group-hover:bg-[#34d399] transition-colors">
            FP
          </div>
          <div>
            <span className="block text-sm font-semibold text-slate-200 leading-none tracking-tight">
              FootyPedia
            </span>
            <span className="block text-[10px] text-[#475569] leading-none mt-0.5 font-mono">
              football data
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={`flex items-center gap-1.5 rounded px-3 py-2 text-xs font-medium transition ${
              pathname === "/"
                ? "bg-[#111827] text-slate-200 border border-[#1e2d3d]"
                : "text-[#64748b] hover:text-slate-300 hover:bg-[#111827]/60"
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cari Pemain</span>
          </Link>

          <Link
            href="/favorites"
            className={`relative flex items-center gap-1.5 rounded px-3 py-2 text-xs font-medium transition ${
              pathname === "/favorites"
                ? "bg-[#1a1020] text-rose-400 border border-[#3d1a27]"
                : "text-[#64748b] hover:text-slate-300 hover:bg-[#111827]/60"
            }`}
          >
            <Heart
              className={`h-3.5 w-3.5 ${
                favorites.length > 0 ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
            <span>Favorit</span>
            {isLoaded && favorites.length > 0 && (
              <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-sm bg-rose-600 px-1 text-[10px] font-semibold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
