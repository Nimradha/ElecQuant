"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/marketing/hero";
import { RegionalCoverage } from "@/components/marketing/regional-coverage";
import { SectorCoverage } from "@/components/marketing/sector-coverage";
import { WhatWeDo } from "@/components/marketing/what-we-do";
import { ClientReviews } from "@/components/marketing/client-reviews";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCtaSection } from "@/components/marketing/final-cta-section";

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [currency, setCurrency] = useState<"AUD" | "NZD">("AUD");

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "AUD" ? "NZD" : "AUD"));
  };

  const handleOpenQuote = () => {
    setIsQuoteOpen(true);
    if (typeof window !== "undefined" && window.scrollY > 150) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-900 selection:bg-red-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenQuote={handleOpenQuote}
        currency={currency}
        onToggleCurrency={toggleCurrency}
      />

      {/* 1st Page: Hero with image1, twilight sky, curve & interactive Quote Card */}
      <main className="grow flex flex-col">
        <Hero
          isQuoteOpen={isQuoteOpen}
          onOpenQuote={handleOpenQuote}
          onCloseQuote={handleCloseQuote}
          currency={currency}
        />

        {/* 2nd Page: Covering Both Sides of the Tasman */}
        <RegionalCoverage />

        {/* 3rd Page: Built For Every Project - From high-rise to housing estates */}
        <SectorCoverage />

        {/* 4th Page: What We Do (including How It Works banner) */}
        <WhatWeDo />

        {/* 5th Page: Client Reviews - What our clients say */}
        <ClientReviews />

        {/* 6th Page: Questions - Before you upload */}
        <FaqSection />

        {/* 7th Page: Tender due soon? CTA Banner & Footer */}
        <FinalCtaSection currency={currency} />
      </main>
    </div>
  );
}
