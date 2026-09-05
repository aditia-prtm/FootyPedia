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
      <body className="min-h-screen bg-[#0a0d13] text-slate-100 antialiased flex flex-col">
        <FavoritesProvider>
          <Navbar />
          <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="mt-auto border-t border-[#1e2d3d] bg-[#080c10] py-5">
            <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#475569]">
              <p>© {new Date().getFullYear()} FootyPedia</p>
              <p>
                Data:{" "}
                <a
                  href="https://www.thesportsdb.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#34d399] hover:underline"
                >
                  TheSportsDB API
                </a>
              </p>
            </div>
          </footer>
        </FavoritesProvider>
      </body>
    </html>
  );
}
