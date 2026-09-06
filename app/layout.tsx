import type { Metadata } from "next";
import "./globals.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "FootyPedia | Football Player Database",
  description: "Data pemain sepak bola dunia: profil, statistik, klub, dan karier lengkap. Didukung TheSportsDB API.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] antialiased flex flex-col">
        <FavoritesProvider>
          <Navbar />
          <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="mt-auto border-t border-[#2d2d2d] bg-[#0a0a0a] py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Brand Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#cc5429] text-white font-bold text-xs">
                      FP
                    </div>
                    <span className="text-base font-bold text-[#f5f5f5]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      FootyPedia
                    </span>
                  </div>
                  <p className="text-xs text-[#5a5a5a] leading-relaxed max-w-xs">
                    Database pemain sepak bola terlengkap dari seluruh dunia. Jelajahi profil, statistik, dan karier pemain favorit Anda.
                  </p>
                </div>

                {/* Links Section */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">Navigasi</h3>
                  <div className="flex flex-col gap-2">
                    <a href="/" className="text-xs text-[#5a5a5a] hover:text-[#ff6b35] transition-colors">
                      Pencarian Pemain
                    </a>
                    <a href="/teams" className="text-xs text-[#5a5a5a] hover:text-[#ff6b35] transition-colors">
                      Pencarian Klub
                    </a>
                    <a href="/favorites" className="text-xs text-[#5a5a5a] hover:text-[#ff6b35] transition-colors">
                      Favorit
                    </a>
                  </div>
                </div>

                {/* Attribution Section */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">Sumber Data</h3>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.thesportsdb.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#ff6b35] hover:text-[#ff8555] underline underline-offset-2 transition-colors"
                    >
                      TheSportsDB API
                    </a>
                  </div>
                  <p className="text-xs text-[#3d3d3d]">
                    Data diperbarui secara real-time dari berbagai liga dunia.
                  </p>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="mt-10 pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#3d3d3d]">
                  © {new Date().getFullYear()} FootyPedia. Dibuat dengan ❤️ untuk fans sepak bola.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#3d3d3d]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]" />
                    250K+ Pemain
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffd700]" />
                    20K+ Klub
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </FavoritesProvider>
      </body>
    </html>
  );
}
