import React from "react";
import Image from "next/image";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";

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

const steps = [
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

export function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-[#063252] to-[#091d36] py-6 sm:py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Card with image4.jpg background */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl bg-slate-900">
          
          {/* Background Image: image4.jpg (workers on concrete deck) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/image4.jpg"
              alt="How It Works - From drawings to quantities in four steps"
              fill
              priority
              quality={90}
              className="object-cover object-center filter brightness-[0.72] contrast-[1.05]"
            />
            {/* Dark twilight overlay */}
            <div className="absolute inset-0 bg-[#081f38]/80 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/50" />
          </div>

          {/* Card Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-left mb-6 sm:mb-8">
              <span className="inline-block text-[11px] sm:text-xs font-extrabold tracking-[0.22em] text-[#d9232a] uppercase mb-2">
                HOW IT WORKS
              </span>
              <h2
                className={`${headingFont.className} text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight`}
              >
                From drawings to quantities in four steps
              </h2>
            </div>

            {/* 4 Step Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl p-5 sm:p-6 bg-slate-950/55 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-slate-950/65 flex flex-col justify-between"
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
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
