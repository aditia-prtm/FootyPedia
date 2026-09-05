"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchFormProps {
  initialQuery?: string;
}

const POPULAR_SEARCHES = [
  "Cristiano Ronaldo",
  "Lionel Messi",
  "Neymar",
  "Erling Haaland",
  "Kylian Mbappe",
  "Jude Bellingham",
];

export default function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/");
    }
  };

  const handleSuggestionClick = (name: string) => {
    setQuery(name);
    router.push(`/?q=${encodeURIComponent(name)}`);
  };

  return (
    <div className="w-full space-y-4">
      {/* Search input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute inset-y-0 left-3 my-auto h-4 w-4 text-[#475569]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nama pemain"
            className="w-full rounded-md border border-[#1e2d3d] bg-[#111827] py-2.5 pl-9 pr-9 text-sm text-slate-200 placeholder-[#334155] transition focus:border-[#10b981] focus:outline-none focus:ring-1 focus:ring-[#10b981]/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#475569] hover:text-slate-300 transition"
              aria-label="Bersihkan"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="rounded-md bg-[#10b981] px-4 py-2.5 text-sm font-medium text-[#022c22] transition hover:bg-[#34d399] active:scale-95 flex-shrink-0"
        >
          Cari
        </button>
      </form>

      {/* Popular searches */}
      <div>
        <p className="text-[11px] text-[#475569] mb-2 uppercase tracking-wider">Populer</p>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SEARCHES.map((name) => {
            const isActive = query.toLowerCase() === name.toLowerCase();
            return (
              <button
                key={name}
                type="button"
                onClick={() => handleSuggestionClick(name)}
                className={`rounded px-2.5 py-1 text-[11px] font-medium transition border ${
                  isActive
                    ? "border-[#065f46] bg-[#022c22] text-[#34d399]"
                    : "border-[#1e2d3d] bg-[#111827] text-[#64748b] hover:border-[#2a3d52] hover:text-slate-300"
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
