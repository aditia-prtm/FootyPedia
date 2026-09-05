"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableTextProps {
  text: string;
  collapsedHeight?: string;
  textClassName?: string;
}

export default function ExpandableText({
  text,
  collapsedHeight = "max-h-48",
  textClassName = "text-xs sm:text-sm text-slate-300 leading-relaxed pr-2 whitespace-pre-line",
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    setShowToggle(el.scrollHeight > el.clientHeight);
  }, [text]);

  return (
    <div className="relative">
      <div
        ref={textRef}
        className={`${textClassName} transition-all duration-300 ${
          expanded ? "max-h-none" : collapsedHeight
        }`}
        style={{ overflow: "hidden" }}
      >
        {text}
      </div>

      {showToggle && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300"
        >
          See More
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      )}

      {showToggle && expanded && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300"
        >
          See Less
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
