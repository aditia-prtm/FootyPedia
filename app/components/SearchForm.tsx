"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchFormProps {
  initialQuery?: string;
  searchType?: "player" | "team";
}

const POPULAR_SEARCHES = {
  player: [
    "Cristiano Ronaldo",
    "Lionel Messi",
    "Neymar",
    "Erling Haaland",
    "Kylian Mbappe",
    "Jude Bellingham",
  ],
  team: [
    "Real Madrid",
    "Manchester United",
    "Barcelona",
    "Bayern Munich",
    "Liverpool",
    "Paris Saint Germain",
  ],
};

export default function SearchForm({ initialQuery = "", searchType = "player" }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const basePath = searchType === "team" ? "/teams" : "/";
  const placeholder = searchType === "team" ? "Cari klub..." : "Cari pemain...";
  const buttonText = searchType === "team" ? "Cari Klub" : "Cari Pemain";
  const popularSearches = POPULAR_SEARCHES[searchType];

  // Keep the input & active popular-search highlight in sync with the URL,
  // so they reset when the Reset button (or any navigation) clears ?q=.
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`${basePath}?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push(basePath);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setQuery(name);
    router.push(`${basePath}?q=${encodeURIComponent(name)}`);
  };

  return (
    <div className="w-full space-y-5">
      {/* Popular searches */}
      <div className="flex lg:hidden flex-col">
        <p className="text-xs text-[#5a5a5a] mb-3 font-medium uppercase tracking-wider">Sering dicari</p>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((name: string) => {
            const isActive = query.toLowerCase() === name.toLowerCase();
            return (
              <button
                key={name}
                type="button"
                onClick={() => handleSuggestionClick(name)}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition-all border ${
                  isActive
                    ? "border-[#ff6b35] bg-[#ff6b35]/10 text-[#ff6b35]"
                    : "border-[#2d2d2d] bg-[#1a1a1a] text-[#8a8a8a] hover:border-[#3d3d3d] hover:text-[#f5f5f5]"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-4 h-5 w-5 text-[#5a5a5a]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-xl border-2 border-[#2d2d2d] bg-[#1a1a1a] py-4 pl-12 pr-12 text-base text-[#f5f5f5] placeholder-[#5a5a5a] transition-all focus:border-[#ff6b35] focus:outline-none focus:ring-0"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 flex items-center text-[#5a5a5a] hover:text-[#f5f5f5] transition"
              aria-label="Bersihkan"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="mt-3 w-full rounded-xl bg-[#ff6b35] px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#ff8555] active:scale-[0.98]"
        >
          {buttonText}
        </button>
      </form>

      {/* Popular searches */}
      <div className="hidden lg:flex flex-col">
        <p className="text-xs text-[#5a5a5a] mb-3 font-medium uppercase tracking-wider">Sering dicari</p>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((name: string) => {
            const isActive = query.toLowerCase() === name.toLowerCase();
            return (
              <button
                key={name}
                type="button"
                onClick={() => handleSuggestionClick(name)}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition-all border ${
                  isActive
                    ? "border-[#ff6b35] bg-[#ff6b35]/10 text-[#ff6b35]"
                    : "border-[#2d2d2d] bg-[#1a1a1a] text-[#8a8a8a] hover:border-[#3d3d3d] hover:text-[#f5f5f5]"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
