import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import { FavoritesProvider } from "@/features/favorites";
import { Navbar, Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Football Player Database`,
  description: SITE_CONFIG.description,
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
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
