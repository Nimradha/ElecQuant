import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link href="/" aria-label="ElecQuant Home" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Icon Emblem */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-slate-200 bg-white shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shrink-0">
        <Image
          src="/logos/ElecQuant logo.png"
          alt="ElecQuant Logo"
          width={40}
          height={40}
          className="object-contain w-full h-full rounded-full"
          priority
        />
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
