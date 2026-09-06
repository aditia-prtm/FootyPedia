"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";
import { useFavorites } from "@/features/favorites";

export default function Navbar() {
  const pathname = usePathname();
  const { totalFavoritesCount, isLoaded } = useFavorites();
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
      "flex items-center gap-2 rounded-lg font-medium transition-all duration-200",
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
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-95 shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#ff6b35] via-[#ff5722] to-[#e64a19] shadow-md shadow-[#ff6b35]/25 ring-1 ring-white/10 group-hover:scale-105 group-hover:shadow-[#ff6b35]/40 transition-all duration-200 shrink-0">
              <Image
                src="/logo-icon.svg"
                alt={`${SITE_CONFIG.name} Logo`}
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col shrink-0">
              <div className="flex items-center gap-1 leading-none">
                <span
                  className="text-sm sm:text-base font-black tracking-tight text-white group-hover:text-white transition-colors uppercase whitespace-nowrap select-none"
                  style={{
                    fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {SITE_CONFIG.brand.firstWord}
                </span>
                <span
                  className="rounded-md bg-[#ff6b35] px-1.5 py-0.5 text-xs sm:text-[13px] font-black tracking-wider text-white uppercase shadow-sm shadow-[#ff6b35]/30 group-hover:bg-[#ff7b47] transition-colors whitespace-nowrap select-none"
                  style={{
                    fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontWeight: 900,
                  }}
                >
                  {SITE_CONFIG.brand.secondWord}
                </span>
              </div>
              <span
                className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#8a8a8a] uppercase mt-0.5 whitespace-nowrap select-none"
                style={{ fontWeight: 700 }}
              >
                {SITE_CONFIG.brand.tagline}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Utama">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                <Icon
                  className={`h-4 w-4 ${
                    href === "/favorites" && totalFavoritesCount > 0
                      ? "fill-[#ff6b35] text-[#ff6b35]"
                      : ""
                  }`}
                />
                {label}
                {href === "/favorites" && isLoaded && totalFavoritesCount > 0 && (
                  <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6b35] px-1.5 text-[10px] font-bold text-white shadow-sm">
                    {totalFavoritesCount}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden flex items-center justify-center rounded-lg p-2 text-[#8a8a8a] hover:text-[#f5f5f5] hover:bg-[#1a1a1a] transition-colors relative cursor-pointer"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
            {!menuOpen && isLoaded && totalFavoritesCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#ff6b35]" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <div className="md:hidden">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-xs"
              aria-label="Tutup menu"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu drawer */}
            <motion.nav
              id={menuId}
              aria-label="Mobile"
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-50 overflow-hidden border-t border-[#2d2d2d] bg-[#0f0f0f]/98 px-4 py-4 sm:px-6 shadow-2xl"
            >
              <div className="flex flex-col gap-1.5">
                {NAV_LINKS.map(({ href, label, icon: Icon }, index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + index * 0.04,
                      duration: 0.2,
                    }}
                  >
                    <Link
                      href={href}
                      className={linkClass(href, true)}
                      onClick={() => setMenuOpen(false)}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          href === "/favorites" && totalFavoritesCount > 0
                            ? "fill-[#ff6b35] text-[#ff6b35]"
                            : ""
                        }`}
                      />
                      <span>{label}</span>
                      {href === "/favorites" && isLoaded && totalFavoritesCount > 0 && (
                        <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6b35] px-1.5 text-[10px] font-bold text-white shadow-sm">
                          {totalFavoritesCount}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
