"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import { QuoteFormCard } from "./quote-form-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const headingFont = Plus_Jakarta_Sans({
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Open_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

interface FinalCtaSectionProps {
  currency?: "AUD" | "NZD";
  onOpenQuote?: () => void;
}

export function FinalCtaSection({ currency = "AUD" }: FinalCtaSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleOpenForm = () => {
    setIsFormOpen(true);
    // Smoothly glide Section 7 into centered view without jarring jumps
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* CTA Banner with image2.jpg (Sydney Harbour Bridge) */}
      <div
        className={`relative ${
          isFormOpen ? "py-10 sm:py-14 lg:py-16" : "py-20 sm:py-28 lg:py-32"
        } flex flex-col items-center justify-center text-center overflow-hidden bg-[#072444] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]`}
      >
        {/* Background Image: image2.jpg */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/image2.jpg"
            alt="Sydney Harbour Bridge - Australia and New Zealand Electrical Take-offs"
            fill
            quality={90}
            className="object-cover object-center filter brightness-[0.95] contrast-[1.05]"
          />
          {/* Vibrant royal/twilight blue overlay matching screenshot #0f3366 tone */}
          <div className="absolute inset-0 bg-[#082b52]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061e38]/85 via-transparent to-[#082b52]/70 pointer-events-none" />
        </div>

        {/* Content */}
        <ScrollReveal className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
          <h2
            className={`${bodyFont.className} ${
              isFormOpen
                ? "text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-5"
                : "text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4"
            } font-semibold text-white tracking-tight leading-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
            style={{ fontFamily: bodyFont.style.fontFamily }}
          >
            Tender due soon?
          </h2>

          {/* Smooth Transition Container */}
          <div className="w-full flex flex-col items-center">
            {/* Teaser state: smoothly fades & contracts when open */}
            <div
              className={`w-full flex flex-col items-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isFormOpen
                  ? "opacity-0 max-h-0 scale-95 -translate-y-2 pointer-events-none overflow-hidden"
                  : "opacity-100 max-h-48 scale-100 translate-y-0"
              }`}
            >
              <p
                className={`${bodyFont.className} text-sm sm:text-base lg:text-lg text-slate-200 font-normal mb-7 sm:mb-8 max-w-xl leading-relaxed`}
                style={{ fontFamily: bodyFont.style.fontFamily }}
              >
                Upload your drawings and get a quote today.
              </p>

              {/* CTA Button */}
              <button
                type="button"
                onClick={handleOpenForm}
                className="px-8 sm:px-9 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#d9232a] hover:bg-[#b91c22] text-white font-bold text-sm sm:text-base shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                Upload & get a quote
              </button>
            </div>

            {/* Inline Quote Form Card: smoothly unfolds and expands */}
            <div
              className={`w-full flex justify-center text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isFormOpen
                  ? "opacity-100 max-h-[900px] scale-100 translate-y-0"
                  : "opacity-0 max-h-0 scale-95 translate-y-4 pointer-events-none overflow-hidden"
              }`}
            >
              <QuoteFormCard
                onClose={handleCloseForm}
                currency={currency}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Footer Bar */}
      <footer className="relative z-10 bg-[#091d36] border-t border-white/10 py-5 sm:py-6 text-slate-400 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-center sm:text-left">
            © 2026 ElecQuant. Electrical take-offs for Australia & New Zealand.
          </p>
          <a
            href="mailto:quotes@elecquant.com"
            className="text-slate-400 hover:text-white transition-colors"
          >
            [email]
          </a>
        </div>
      </footer>
    </section>
  );
}
