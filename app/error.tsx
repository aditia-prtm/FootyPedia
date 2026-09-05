"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <div className="border border-[#3d1a27] bg-[#0d0709] p-8 sm:p-12 max-w-md w-full">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-[11px] text-[#475569] bg-[#1a0a10] border border-[#3d1a27] px-2 py-0.5">
            ERR
          </span>
          <span className="text-[11px] text-[#475569] font-mono">
            {error.digest ?? "UNKNOWN"}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-slate-200 mb-2">
          Terjadi kesalahan
        </h2>
        <p className="text-sm text-[#64748b] mb-8 leading-relaxed">
          {error.message || "Gagal memuat data. Silakan coba lagi atau kembali ke beranda."}
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-1.5 rounded border border-[#065f46] bg-[#022c22] px-4 py-2 text-sm font-medium text-[#34d399] transition hover:bg-[#053d2d] active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Coba Lagi
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 rounded border border-[#1e2d3d] bg-[#111827] px-4 py-2 text-sm font-medium text-[#64748b] transition hover:text-slate-300 hover:border-[#2a3d52]"
          >
            <Home className="h-3.5 w-3.5" />
            Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
