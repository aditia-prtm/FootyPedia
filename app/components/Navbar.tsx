"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, Menu, Shield } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar() {
  const pathname = usePathname();
  const { favorites, isLoaded } = useFavorites();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2d2d2d] bg-[#0f0f0f]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand - Left */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#ff6b35]/20 blur-lg rounded-full group-hover:bg-[#ff6b35]/30 transition-colors" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#cc5429] text-white font-bold text-sm flex-shrink-0 group-hover:scale-105 transition-transform shadow-lg">
                FP
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg font-bold text-[#f5f5f5] leading-none tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                FootyPedia
              </span>
            </div>
          </Link>

          {/* Nav - Center (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                pathname === "/"
                  ? "text-[#ff6b35] bg-[#ff6b35]/10"
                  : "text-[#8a8a8a] hover:text-[#f5f5f5] hover:bg-[#1a1a1a]"
              }`}
            >
              <Search className="h-4 w-4" />
              Pemain
            </Link>

            <Link
              href="/teams"
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                pathname === "/teams"
                  ? "text-[#ff6b35] bg-[#ff6b35]/10"
                  : "text-[#8a8a8a] hover:text-[#f5f5f5] hover:bg-[#1a1a1a]"
              }`}
            >
              <Shield className="h-4 w-4" />
              Klub
            </Link>

            <Link
              href="/favorites"
              className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                pathname === "/favorites"
                  ? "text-[#ff6b35] bg-[#ff6b35]/10"
                  : "text-[#8a8a8a] hover:text-[#f5f5f5] hover:bg-[#1a1a1a]"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${
                  favorites.length > 0 ? "fill-[#ff6b35] text-[#ff6b35]" : ""
                }`}
              />
              Favorit
              {isLoaded && favorites.length > 0 && (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6b35] px-1.5 text-[10px] font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden flex items-center justify-center rounded-lg p-2 text-[#8a8a8a] hover:text-[#f5f5f5] hover:bg-[#1a1a1a] transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
