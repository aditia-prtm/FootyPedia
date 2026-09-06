"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, Menu, Shield, X } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

const NAV_LINKS = [
  { href: "/", label: "Pemain", icon: Search },
  { href: "/teams", label: "Klub", icon: Shield },
  { href: "/favorites", label: "Favorit", icon: Heart },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { favorites, isLoaded } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = (href: string, isMobile = false) => {
    const active = pathname === href;
    return [
      "flex items-center gap-2 rounded-lg font-medium transition-all",
      isMobile ? "px-4 py-3 text-base" : "px-4 py-2 text-sm",
      active
        ? "text-[#ff6b35] bg-[#ff6b35]/10"
        : "text-[#8a8a8a] hover:text-[#f5f5f5] hover:bg-[#1a1a1a]",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2d2d2d] bg-[#0f0f0f]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
            <div className="relative">
              <div className="absolute inset-0 bg-[#ff6b35]/20 blur-lg rounded-full group-hover:bg-[#ff6b35]/30 transition-colors" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#cc5429] text-white font-bold text-sm flex-shrink-0 group-hover:scale-105 transition-transform shadow-lg">
                FP
              </div>
            </div>
            <span
              className="text-lg font-bold text-[#f5f5f5] leading-none tracking-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              FootyPedia
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Utama">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                <Icon
                  className={`h-4 w-4 ${
                    href === "/favorites" && favorites.length > 0
                      ? "fill-[#ff6b35] text-[#ff6b35]"
                      : ""
                  }`}
                />
                {label}
                {href === "/favorites" && isLoaded && favorites.length > 0 && (
                  <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6b35] px-1.5 text-[10px] font-bold text-white">
                    {favorites.length}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden flex items-center justify-center rounded-lg p-2 text-[#8a8a8a] hover:text-[#f5f5f5] hover:bg-[#1a1a1a] transition-colors"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden">
          <button
            type="button"
            className="fixed inset-0 top-16 z-40 bg-black/50"
            aria-label="Tutup menu"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id={menuId}
            aria-label="Mobile"
            className="relative z-50 border-t border-[#2d2d2d] bg-[#0f0f0f] px-4 py-3 sm:px-6"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={linkClass(href, true)}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      href === "/favorites" && favorites.length > 0
                        ? "fill-[#ff6b35] text-[#ff6b35]"
                        : ""
                    }`}
                  />
                  {label}
                  {href === "/favorites" && isLoaded && favorites.length > 0 && (
                    <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6b35] px-1.5 text-[10px] font-bold text-white">
                      {favorites.length}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
