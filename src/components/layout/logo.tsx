import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Icon Emblem */}
      <div className="relative w-10 h-10 rounded-full border border-slate-200 bg-white shadow-xs flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-200">
        <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Circular outer track in deep navy */}
          <circle cx="50" cy="50" r="40" stroke="#0F355C" strokeWidth="8" strokeDasharray="180 50" strokeLinecap="round" />
          
          {/* Inner electric bolt / arrow in vibrant red */}
          <path
            d="M52 24L34 50H48L44 76L66 46H52L56 24H52Z"
            fill="#DC2626"
            stroke="#B91C1C"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Accent dot */}
          <circle cx="68" cy="68" r="4.5" fill="#0F355C" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center text-xl font-bold tracking-tight">
          <span className={isLight ? "text-white" : "text-[#0F355C]"}>Elec</span>
          <span className="text-[#DC2626]">Quant</span>
        </div>
      </div>
    </Link>
  );
}
