import React from "react";
import Image from "next/image";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const headingFont = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Open_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export function SectorCoverage() {
  const alsoSectors = [
    "Data centres",
    "Infrastructure",
    "Health",
    "Education",
    "Retail",
    "Government",
  ];

  return (
    <section className="bg-[#d5e4f7] pt-12 sm:pt-16 pb-16 sm:pb-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Left Aligned */}
        <ScrollReveal>
          <div className="max-w-3xl mb-8 sm:mb-10 text-left">
            <span className="inline-block text-[11px] sm:text-xs font-extrabold tracking-[0.22em] text-[#d9232a] uppercase mb-2 sm:mb-3">
              BUILT FOR EVERY PROJECT
            </span>
            <h2
              className={`${headingFont.className} text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#0f172a] tracking-tight leading-tight sm:leading-[1.15] mb-3 sm:mb-4`}
            >
              From high-rise to housing estates
            </h2>
            <p
              className={`${bodyFont.className} text-sm sm:text-base text-slate-500 font-normal leading-relaxed`}
            >
              One partner for the take-offs behind residential, commercial and infrastructure tenders.
            </p>
          </div>
        </ScrollReveal>

        {/* 2 Sector Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
          
          {/* Left Card: Commercial & high-rise (image3.jpg) */}
          <ScrollReveal delay={120} className="h-full">
            <div className="group relative h-[380px] sm:h-[440px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 bg-slate-900 transition-transform duration-300 hover:scale-[1.008]">
            <Image
              src="/images/image3.jpg"
              alt="Commercial & high-rise electrical take-offs"
              fill
              priority
              quality={90}
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.92]"
            />
            {/* Dark Gradient Overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent" />

            {/* Card Content at bottom */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white space-y-3">
              <h3 className={`${headingFont.className} text-2xl sm:text-3xl font-extrabold tracking-tight text-white`}>
                Commercial & high-rise
              </h3>
              <p
                className={`${bodyFont.className} text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-lg`}
                style={{ fontFamily: bodyFont.style.fontFamily }}
              >
                Offices, apartments, retail and mixed-use: lighting, power, data and essential services.
              </p>
              
              {/* Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["Lighting", "Power", "Data", "Fire"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/25 text-white text-xs font-medium shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            </div>
          </ScrollReveal>

          {/* Right Card: Residential & civil (image4.jpg) */}
          <ScrollReveal delay={280} className="h-full">
            <div className="group relative h-[380px] sm:h-[440px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 bg-slate-900 transition-transform duration-300 hover:scale-[1.008]">
              <Image
                src="/images/image4.jpg"
                alt="Residential & civil electrical take-offs"
                fill
                priority
                quality={90}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.92]"
              />
              {/* Dark Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent" />

              {/* Card Content at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white space-y-3">
                <h3 className={`${headingFont.className} text-2xl sm:text-3xl font-extrabold tracking-tight text-white`}>
                  Residential & civil
                </h3>
                <p
                  className={`${bodyFont.className} text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-lg`}
                  style={{ fontFamily: bodyFont.style.fontFamily }}
                >
                  Housing estates, multi-unit developments and infrastructure works.
                </p>
                
                {/* Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Switchboards", "Cabling", "Containment"].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/25 text-white text-xs font-medium shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Bottom "Also:" row */}
        <ScrollReveal delay={200}>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="text-sm sm:text-base font-bold text-slate-900 mr-1 sm:mr-2">
              Also:
            </span>
            {alsoSectors.map((sector) => (
              <span
                key={sector}
                className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white text-slate-800 text-xs sm:text-sm font-semibold shadow-xs border border-slate-200/80 hover:border-slate-300 transition-colors cursor-default select-none"
              >
                {sector}
              </span>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
