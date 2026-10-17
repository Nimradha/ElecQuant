import React from "react";
import Image from "next/image";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const headingFont = Plus_Jakarta_Sans({
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const descriptionFont = Open_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export function RegionalCoverage() {
  const australianStates = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
  const newZealandRegions = ["North Island", "South Island"];

  return (
    <section id="au-nz" className="bg-[#e6eef9] pt-14 sm:pt-20 pb-12 sm:pb-16 transition-colors scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tagline */}
        <ScrollReveal>
          <div className="text-center mb-6">
            <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.22em] text-[#d9232a] uppercase">
              COVERING BOTH SIDES OF THE TASMAN
            </span>
          </div>
        </ScrollReveal>

        {/* State & Region Filter Pills */}
        <ScrollReveal delay={80}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
            {australianStates.map((state) => (
              <span
                key={state}
                className="inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 rounded-full bg-white text-slate-800 text-xs font-semibold shadow-xs border border-slate-200/70 hover:border-slate-300 transition-colors cursor-default select-none"
              >
                {state}
              </span>
            ))}

            {newZealandRegions.map((region) => (
              <span
                key={region}
                className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white text-blue-600 text-xs font-semibold shadow-xs border border-blue-400 hover:border-blue-500 transition-colors cursor-default select-none"
              >
                {region}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* 2 Regional Image Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
          
          {/* Australia Card (image2.jpg) */}
          <ScrollReveal delay={100} className="h-full">
            <div className="group relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 bg-slate-900 transition-transform duration-300 hover:scale-[1.008]">
            <Image
              src="/images/image2.jpg"
              alt="Sydney Harbour Bridge - Australia Electrical Take-offs"
              fill
              priority
              quality={90}
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.92]"
            />
            {/* Gradient Overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

            {/* Card Content at bottom */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#d9232a] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                PRICED IN AUD
              </span>
              <h3 className={`${headingFont.className} text-2xl sm:text-3xl font-extrabold tracking-tight text-white`}>
                Australia
              </h3>
              <p className={`${descriptionFont.className} text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-lg`}>
                NSW · VIC · QLD · WA · SA · TAS · ACT · NT, to AS/NZS 3000 and NCC requirements.
              </p>
            </div>
            </div>
          </ScrollReveal>

          {/* New Zealand Card (image1.jpg) */}
          <ScrollReveal delay={260} className="h-full">
            <div className="group relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 bg-slate-900 transition-transform duration-300 hover:scale-[1.008]">
              <Image
                src="/images/image1.jpg"
                alt="Auckland Skyline Twilight - New Zealand Electrical Take-offs"
                fill
                priority
                quality={90}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.92]"
              />
              {/* Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

              {/* Card Content at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#2563eb] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                  PRICED IN NZD
                </span>
                <h3 className={`${headingFont.className} text-2xl sm:text-3xl font-extrabold tracking-tight text-white`}>
                  New Zealand
                </h3>
                <p className={`${descriptionFont.className} text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-lg`}>
                  North Island and South Island, with quantities presented the way Kiwi contractors price.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* 4 Stat / Metric Cards - Staggered cascade one by one */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          
          {/* Card 1: Projects completed */}
          <ScrollReveal delay={80}>
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-md shadow-slate-200/60 border border-slate-200/70 overflow-hidden flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#d9232a]" />
              <div className="text-4xl sm:text-5xl font-extrabold text-[#d9232a] tracking-tight">
                [0]
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-3.5">
                Projects completed
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Update this number as you grow
              </p>
            </div>
          </ScrollReveal>

          {/* Card 2: Newly launched */}
          <ScrollReveal delay={200}>
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-md shadow-slate-200/60 border border-slate-200/70 overflow-hidden flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#2563eb]" />
              <div className="text-4xl sm:text-5xl font-extrabold text-[#2563eb] tracking-tight">
                2026
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-3.5">
                Newly launched
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Founder-led, hands-on service
              </p>
            </div>
          </ScrollReveal>

          {/* Card 3: Both markets */}
          <ScrollReveal delay={320}>
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-md shadow-slate-200/60 border border-slate-200/70 overflow-hidden flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#d9232a]" />
              <div className="text-4xl sm:text-5xl font-extrabold text-[#d9232a] tracking-tight">
                AU+NZ
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-3.5">
                Both markets
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                AS/NZS standards-aware
              </p>
            </div>
          </ScrollReveal>

          {/* Card 4: Typical turnaround */}
          <ScrollReveal delay={440}>
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-md shadow-slate-200/60 border border-slate-200/70 overflow-hidden flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#2563eb]" />
              <div className="text-4xl sm:text-5xl font-extrabold text-[#2563eb] tracking-tight">
                [XX]h
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-3.5">
                Typical turnaround
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Rush options available
              </p>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
