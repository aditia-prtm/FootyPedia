import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { FOOTER_NAV_LINKS } from "@/config/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#2d2d2d] bg-[#0a0a0a] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span
                className="uppercase text-base font-bold text-[#f5f5f5]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {SITE_CONFIG.brand.firstWord.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                <span className="text-[#ff6b35]">
                  {SITE_CONFIG.brand.secondWord.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                </span>
              </span>
            </div>
            <p className="text-xs text-[#5a5a5a] leading-relaxed max-w-xs">
              {SITE_CONFIG.footerDescription}
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">
              Navigasi
            </h3>
            <div className="flex flex-col gap-2">
              {FOOTER_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-[#5a5a5a] hover:text-[#ff6b35] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Attribution Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">
              Sumber Data
            </h3>
            <div className="flex items-center gap-2">
              <a
                href={SITE_CONFIG.dataSource.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#ff6b35] hover:text-[#ff8555] underline underline-offset-2 transition-colors"
              >
                {SITE_CONFIG.dataSource.name} API
              </a>
            </div>
            <p className="text-xs text-[#3d3d3d]">
              {SITE_CONFIG.dataSource.updateNote}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#3d3d3d]">
            © {currentYear} {SITE_CONFIG.name}.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#3d3d3d]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]" />
              {SITE_CONFIG.stats.playersCount}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd700]" />
              {SITE_CONFIG.stats.teamsCount}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
