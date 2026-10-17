"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenQuote: () => void;
  currency?: "AUD" | "NZD";
  onToggleCurrency?: () => void;
}

export function Navbar({ onOpenQuote, currency = "AUD", onToggleCurrency }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // Give a micro-tick for mobile menu collapse if needed
    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 74; // sticky header height offset
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = Math.max(0, elementPosition - headerOffset);

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        if (typeof window !== "undefined" && window.history?.pushState) {
          window.history.pushState(null, "", `#${id}`);
        }
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#e6eef9]/95 backdrop-blur-md border-b border-[#d2def0] shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation Links & Action Controls */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-7 text-sm font-medium text-slate-700">
            <Link
              href="#services"
              onClick={(e) => scrollToSection(e, "services")}
              className="hover:text-slate-950 transition-colors"
            >
              Services
            </Link>
            <Link
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, "how-it-works")}
              className="hover:text-slate-950 transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#au-nz"
              onClick={(e) => scrollToSection(e, "au-nz")}
              className="hover:text-slate-950 transition-colors"
            >
              AU & NZ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Currency Pill Toggle */}
            <button
              type="button"
              onClick={onToggleCurrency}
              className="px-3.5 py-1.5 rounded-full border border-sky-300 bg-white/80 hover:bg-white text-sky-700 font-semibold text-xs tracking-wide transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
              title="Toggle between Australian and New Zealand Dollars"
            >
              <span className={currency === "AUD" ? "text-sky-900 font-bold" : "text-sky-600"}>AUD</span>
              <span className="text-sky-300">·</span>
              <span className={currency === "NZD" ? "text-sky-900 font-bold" : "text-sky-600"}>NZD</span>
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#d9232a] hover:bg-[#b81c22] active:scale-[0.98] text-white font-semibold text-sm tracking-tight transition-all duration-150 shadow-sm shadow-red-500/20 cursor-pointer"
            >
              Upload & get a quote
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onToggleCurrency}
            className="px-2.5 py-1 rounded-full border border-sky-200 bg-sky-50 text-sky-700 font-medium text-xs"
          >
            {currency}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#d2def0] bg-[#e6eef9] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <Link
            href="#services"
            onClick={(e) => scrollToSection(e, "services")}
            className="block px-3 py-2 text-base font-medium text-slate-800 rounded-md hover:bg-slate-100/70"
          >
            Services
          </Link>
          <Link
            href="#how-it-works"
            onClick={(e) => scrollToSection(e, "how-it-works")}
            className="block px-3 py-2 text-base font-medium text-slate-800 rounded-md hover:bg-slate-100/70"
          >
            How it works
          </Link>
          <Link
            href="#au-nz"
            onClick={(e) => scrollToSection(e, "au-nz")}
            className="block px-3 py-2 text-base font-medium text-slate-800 rounded-md hover:bg-slate-100/70"
          >
            AU & NZ
          </Link>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 rounded-lg bg-[#d9232a] hover:bg-[#b81c22] text-white font-semibold text-sm text-center shadow-xs cursor-pointer"
            >
              Upload & get a quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
