"use client";

import React, { useState } from "react";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import { Play } from "lucide-react";
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

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "How fast will I get a quote?",
    answer:
      "Most quotes are delivered within 24 to 48 hours depending on the size and complexity of your drawings. If you have an urgent tender deadline, please let us know in your submission and we can prioritize a rush turnaround.",
  },
  {
    question: "How is the price worked out?",
    answer:
      "Our pricing is fixed per project based on the scope of drawings, sheet count, specification requirements, and complexity (e.g. lighting, power, switchboard schedules, containment). There are no surprise hourly rates or hidden fees.",
  },
  {
    question: "What will I receive?",
    answer:
      "You receive tender-ready Excel spreadsheets formatted with clear category breakdowns (lighting, power, switchboards, cabling, containment, comms) along with fully marked-up PDF drawings highlighting counted and measured elements.",
  },
  {
    question: "What file types can I send?",
    answer:
      "We accept vector and raster PDFs, DWG/CAD files, BIM/Revit exports, specifications documents (Word/PDF), and addenda schedules. Zip files or cloud sharing links (OneDrive, Google Drive, Dropbox) are also welcome.",
  },
  {
    question: "Do you work to Australian and New Zealand standards?",
    answer:
      "Yes. All take-offs are prepared in strict accordance with AS/NZS 3000 (Wiring Rules), AS/NZS 3008 (Cable Selection), NCC/BCA compliance requirements, and regional Australian & New Zealand trade quoting conventions.",
  },
  {
    question: "What if the drawings change?",
    answer:
      "We provide revision comparison services. Simply upload the addendum or revision drawings, and we will highlight the delta differences, recount updated items, and provide a clear variation schedule ready for your tender adjustment.",
  },
  {
    question: "Are my drawings kept confidential?",
    answer:
      "Absolutely. All client drawings, project specifications, and tender materials are treated with strict commercial confidentiality. We are happy to execute standard Non-Disclosure Agreements (NDAs) prior to document receipt.",
  },
  {
    question: "Can I have a meeting before sending the documents?",
    answer:
      "Yes. You can schedule a brief 15-minute introductory video call with our lead estimator to discuss your tender scope, specific measurement preferences, and turnaround timelines before submitting files.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="bg-[#091d36] pt-10 sm:pt-14 pb-20 sm:pb-28 text-white transition-colors scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Centered */}
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block text-[11px] sm:text-xs font-extrabold tracking-[0.22em] text-[#d9232a] uppercase mb-2 sm:mb-3">
              QUESTIONS
            </span>
            <h2
              className={`${bodyFont.className} text-3xl sm:text-4xl lg:text-[44px] font-semibold text-white tracking-tight leading-tight`}
              style={{ fontFamily: bodyFont.style.fontFamily }}
            >
              Before you upload
            </h2>
          </div>
        </ScrollReveal>

        {/* 8 Accordion Items List - Staggered one by one smoothly */}
        <div className="space-y-3 sm:space-y-3.5">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={item.question} delay={index * 70}>
                <div
                  className="rounded-2xl overflow-hidden bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {/* Accordion Header / Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-3.5 pr-4">
                      {/* Triangle Play Icon */}
                      <Play
                        className={`w-3 h-3 text-white fill-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 ${
                          isOpen ? "rotate-90" : "rotate-0"
                        }`}
                      />
                      <span
                        className={`${headingFont.className} text-sm sm:text-base font-bold text-white group-hover:text-blue-200 transition-colors tracking-tight`}
                      >
                        {item.question}
                      </span>
                    </div>
                  </button>

                  {/* Accordion Expandable Content with buttery CSS Grid transition */}
                  <div
                    className="accordion-grid"
                    data-state={isOpen ? "open" : "closed"}
                  >
                    <div className="accordion-inner">
                      <div
                        className={`${bodyFont.className} px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal border-t border-white/5`}
                        style={{ fontFamily: bodyFont.style.fontFamily }}
                      >
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
