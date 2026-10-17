"use client";

import React from "react";
import Image from "next/image";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import { FileText, ArrowRight } from "lucide-react";
import { QuoteFormCard } from "./quote-form-card";

const headlineFont = Plus_Jakarta_Sans({
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Open_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

interface HeroProps {
  isQuoteOpen: boolean;
  onOpenQuote: () => void;
  onCloseQuote: () => void;
  currency: "AUD" | "NZD";
}

export function Hero({ isQuoteOpen, onOpenQuote, onCloseQuote, currency }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-between overflow-hidden bg-slate-950">
      {/* Background Image: Auckland skyline (image1.jpg) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/image1.jpg"
          alt="Auckland Skyline Twilight - Australia & New Zealand Electrical Take-offs"
          fill
          priority
          quality={90}
          className="object-cover object-center filter brightness-100 contrast-[1.02]"
        />
        {/* Balanced twilight overlay with 70% opacity on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/45 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />

        {/* Ambient Star Icons matching screenshot */}
        <div className="absolute top-16 left-1/4 pointer-events-none opacity-40">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
          </svg>
        </div>
        <div className="absolute top-44 left-1/12 pointer-events-none opacity-30">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
          </svg>
        </div>
        <div className="absolute top-28 left-1/2 pointer-events-none opacity-30">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 w-full grow flex items-start">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start w-full pt-4 sm:pt-6 lg:pt-8">
          
          {/* Left Column: Headlines & Value Propositions (Rock-solid, no layout shifts) */}
          <div className="lg:col-span-7 text-white space-y-6">
            
            {/* Top Badges in 2 Separate Lines */}
            <div className="flex flex-col items-start gap-1.5">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#d9232a] text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                NEW FOR 2026
              </span>
              <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase shadow-xs max-w-full text-left leading-tight">
                ELECTRICAL TAKE-OFFS · AUSTRALIA &amp; NEW ZEALAND
              </span>
            </div>

            {/* Main Headline styled with Plus Jakarta Sans */}
            <h1 className={`${headlineFont.className} text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-normal sm:tracking-[0.01em] leading-[1.1] sm:leading-[1.08]`}>
              Send the drawings.<br />
              We&apos;ll send back the<br />
              <span className="text-[#f87171]">quantities.</span>
            </h1>

            {/* Subtitle with Open Sans and grey font color */}
            <p className={`${bodyFont.className} text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-xl`}>
              Accurate, tender-ready electrical take-offs for contractors and estimators from Perth to Auckland, built around AS/NZS standards.
            </p>

            {/* Feature Bullets with Red Accent Bars */}
            <div className="pt-2 space-y-3 text-sm text-slate-200 font-medium">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span className="inline-block w-1 h-4 bg-[#d9232a] rounded-full shrink-0" />
                <span>Introductory rates for first clients</span>
                <span className="text-slate-500 font-light hidden sm:inline">|</span>
                <span>Priced in {currency === "AUD" ? "AUD or NZD" : "NZD or AUD"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="inline-block w-1 h-4 bg-[#d9232a] rounded-full shrink-0" />
                <span>Confidential files</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quote Form Card with Zero-Shake Co-Anchored Transition */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-lg min-h-[300px] flex justify-center lg:justify-end">
              
              {/* Teaser Box: docked at top-0, smoothly fades in place */}
              <div
                className={`w-full max-w-sm transition-all duration-300 ease-out ${
                  isQuoteOpen
                    ? "opacity-0 scale-95 pointer-events-none absolute top-0"
                    : "opacity-100 scale-100 pointer-events-auto relative"
                }`}
              >
                <div 
                  onClick={onOpenQuote}
                  className="w-full rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 p-6 text-white cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-2xl group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#d9232a]/90 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors duration-200">
                    Ready to quote your next tender?
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Click to drop your drawings (PDF, DWG, DXF, ZIP) and get a fixed-price take-off quote.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-red-300 group-hover:text-white transition-colors duration-200">
                    <span>Open Quote Request</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Quote Form Card: docked at the exact same top-0 position, smoothly fades and scales in */}
              <div
                className={`w-full transition-all duration-400 ease-out ${
                  isQuoteOpen
                    ? "opacity-100 scale-100 pointer-events-auto relative"
                    : "opacity-0 scale-95 pointer-events-none absolute top-0"
                }`}
              >
                <QuoteFormCard onClose={onCloseQuote} currency={currency} />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Organic Bottom Wave transition into white page content */}
      <div className="relative z-10 w-full overflow-hidden leading-none -mb-px pointer-events-none select-none">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-12 lg:h-16 text-[#e6eef9] fill-current"
        >
          <path
            d="M0,52 C200,80 420,80 680,51 C940,22 1200,22 1440,50 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
    </section>
  );
}
