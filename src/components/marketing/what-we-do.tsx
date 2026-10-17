import React from "react";
import Image from "next/image";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import {
  Zap,
  Waves,
  Server,
  Search,
  FileText,
  RefreshCw,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const headingFont = Plus_Jakarta_Sans({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Open_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const services = [
  {
    icon: Zap,
    iconColor: "text-blue-300",
    iconBg: "bg-blue-400/20",
    title: "Full electrical take-offs",
    description:
      "Power, lighting, containment and switchboards counted and measured from your drawings.",
  },
  {
    icon: Waves,
    iconColor: "text-blue-300",
    iconBg: "bg-blue-400/20",
    title: "Cable & board schedules",
    description:
      "Clear cable and distribution board schedules, grouped by circuit and level.",
  },
  {
    icon: Server,
    iconColor: "text-blue-300",
    iconBg: "bg-blue-400/20",
    title: "Data & communications",
    description:
      "Outlets, cabling, racks and pathways quantified for data and comms packages.",
  },
  {
    icon: Search,
    iconColor: "text-rose-300",
    iconBg: "bg-rose-500/20",
    title: "Scope & gap analysis",
    description:
      "Spot missing information early, with inclusions and exclusions clearly documented.",
  },
  {
    icon: FileText,
    iconColor: "text-rose-300",
    iconBg: "bg-rose-500/20",
    title: "RFI registers",
    description:
      "Organised queries tied to drawing references so nothing slips through at tender.",
  },
  {
    icon: RefreshCw,
    iconColor: "text-rose-300",
    iconBg: "bg-rose-500/20",
    title: "Variations & revisions",
    description:
      "Re-measure on drawing updates and see exactly what changed between revisions.",
  },
];

const howItWorksSteps = [
  {
    number: "1",
    numberColor: "text-[#38bdf8]",
    title: "Upload",
    description: "Send drawings, specs and your tender deadline through the form.",
  },
  {
    number: "2",
    numberColor: "text-[#38bdf8]",
    title: "Get a quote",
    description: "We review the scope and reply with a fixed price in AUD or NZD.",
  },
  {
    number: "3",
    numberColor: "text-[#38bdf8]",
    title: "We take off",
    description: "Detailed measurement and counts with marked-up drawings.",
  },
  {
    number: "4",
    numberColor: "text-[#f87171]",
    title: "You price",
    description: "Receive organised schedules, ready to drop into your tender.",
  },
];

export function WhatWeDo() {
  return (
    <section id="services" className="relative pt-7 sm:pt-10 pb-8 sm:pb-12 overflow-hidden bg-[#091d36] scroll-mt-20">
      {/* Background Image: image3.jpg (Cranes at twilight) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/image3.jpg"
          alt="What We Do - Construction and Take-offs Background"
          fill
          priority
          quality={90}
          className="object-cover object-center filter brightness-100 contrast-[1.02]"
        />
        {/* Vibrant twilight blue overlay matching Image 1 */}
        <div className="absolute inset-0 bg-[#031b34]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#031b34]/35 via-transparent to-[#031b34]/40 pointer-events-none" />
        {/* Seamless bottom fade into Section 5 (#091d36) removing any boundary line */}
        <div className="absolute inset-x-0 bottom-0 h-64 sm:h-96 bg-gradient-to-b from-transparent via-[#091d36]/75 to-[#091d36] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Left Aligned, single line heading matching Image 1 */}
        <ScrollReveal>
          <div className="w-full mb-10 sm:mb-12 text-left">
            <span className="inline-block text-[11px] sm:text-xs font-extrabold tracking-[0.22em] text-[#d9232a] uppercase mb-2 sm:mb-3">
              WHAT WE DO
            </span>
            <h2
              className={`${bodyFont.className} text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-semibold text-white tracking-tight leading-tight xl:whitespace-nowrap`}
              style={{ fontFamily: bodyFont.style.fontFamily }}
            >
              Everything you need to price with confidence
            </h2>
          </div>
        </ScrollReveal>

        {/* 6 Services Grid - Staggered one by one smoothly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={index * 110} className="h-full">
                <div
                  className="group relative rounded-2xl sm:rounded-3xl p-5 sm:px-6 sm:py-5.5 bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-white/25 transition-all duration-300 hover:bg-white/[0.12] hover:shadow-xl h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Smaller Icon Squircle */}
                    <div
                      className={`w-9 h-9 rounded-[10px] ${service.iconBg} flex items-center justify-center mb-3.5 sm:mb-4 shadow-xs`}
                    >
                      <Icon className={`w-4 h-4 ${service.iconColor}`} />
                    </div>

                    {/* Service Title */}
                    <h3
                      className={`${headingFont.className} text-base sm:text-lg lg:text-[19px] font-bold text-white mb-2 tracking-tight`}
                    >
                      {service.title}
                    </h3>

                    {/* Service Description */}
                    <p
                      className={`${bodyFont.className} text-xs sm:text-sm text-slate-300 font-normal leading-relaxed`}
                      style={{ fontFamily: bodyFont.style.fontFamily }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* How It Works Card Banner - Aligned seamlessly inside Section 4 container */}
        <div id="how-it-works" className="mt-10 sm:mt-12 lg:mt-14 relative rounded-3xl overflow-hidden border border-white/20 p-6 sm:p-8 lg:p-10 shadow-2xl bg-slate-900 scroll-mt-24">
          {/* Background Image: image4.jpg (workers on concrete deck) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/image4.jpg"
              alt="How It Works - From drawings to quantities in four steps"
              fill
              quality={90}
              className="object-cover object-center filter brightness-100 contrast-[1.02]"
            />
            {/* Soft twilight overlay at 70% */}
            <div className="absolute inset-0 bg-[#081e36]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081e36]/75 via-transparent to-[#081e36]/50 pointer-events-none" />
          </div>

          {/* Card Content */}
          <div className="relative z-10">
            {/* Header */}
            <ScrollReveal>
              <div className="text-left mb-6 sm:mb-8">
                <span className="inline-block text-[11px] sm:text-xs font-extrabold tracking-[0.22em] text-[#d9232a] uppercase mb-2">
                  HOW IT WORKS
                </span>
                <h2
                  className={`${bodyFont.className} text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-tight`}
                  style={{ fontFamily: bodyFont.style.fontFamily }}
                >
                  From drawings to quantities in four steps
                </h2>
              </div>
            </ScrollReveal>

            {/* 4 Step Cards Grid - Staggered one by one smoothly */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {howItWorksSteps.map((step, index) => (
                <ScrollReveal key={step.number} delay={index * 130} className="h-full">
                  <div
                    className="rounded-2xl p-5 sm:p-6 bg-slate-900/40 backdrop-blur-md border border-white/15 hover:border-white/25 transition-all duration-300 hover:bg-slate-900/50 flex flex-col justify-between shadow-lg h-full"
                  >
                    <div>
                      {/* Big Step Number */}
                      <div
                        className={`${headingFont.className} text-3xl sm:text-4xl font-extrabold ${step.numberColor} leading-none mb-3`}
                      >
                        {step.number}
                      </div>

                      {/* Step Title */}
                      <h3
                        className={`${headingFont.className} text-base sm:text-lg font-bold text-white mb-1.5 tracking-tight`}
                      >
                        {step.title}
                      </h3>

                      {/* Step Description */}
                      <p
                        className={`${bodyFont.className} text-xs sm:text-sm text-slate-300 font-normal leading-relaxed`}
                        style={{ fontFamily: bodyFont.style.fontFamily }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
