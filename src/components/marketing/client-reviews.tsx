"use client";

import React, { useState } from "react";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import { Star, CheckCircle } from "lucide-react";
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

interface Review {
  id: string;
  rating: number;
  text: string;
  name: string;
  companyLocation: string;
}

const initialReviews: Review[] = [
  {
    id: "1",
    rating: 5,
    text: "[Client review text goes here]",
    name: "[Client name]",
    companyLocation: "[Company · City, State or Region]",
  },
  {
    id: "2",
    rating: 5,
    text: "[Client review text goes here]",
    name: "[Client name]",
    companyLocation: "[Company · City, State or Region]",
  },
];

export function ClientReviews() {
  const [reviews] = useState<Review[]>(initialReviews);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) return;

    setIsSubmitted(true);
    setTimeout(() => {
      setName("");
      setCompany("");
      setRating("5");
      setReviewText("");
    }, 2000);
  };

  return (
    <section className="bg-[#091d36] pt-4 sm:pt-6 pb-16 sm:pb-24 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Left Aligned */}
        <ScrollReveal>
          <div className="max-w-3xl mb-10 sm:mb-12 text-left">
            <span className="inline-block text-[11px] sm:text-xs font-extrabold tracking-[0.22em] text-[#d9232a] uppercase mb-2 sm:mb-3">
              CLIENT REVIEWS
            </span>
            <h2
              className={`${bodyFont.className} text-3xl sm:text-4xl lg:text-[44px] font-semibold text-white tracking-tight leading-tight sm:leading-[1.15] mb-2 sm:mb-3`}
              style={{ fontFamily: bodyFont.style.fontFamily }}
            >
              What our clients say
            </h2>
            <p
              className={`${bodyFont.className} text-sm sm:text-base text-slate-400 font-normal leading-relaxed`}
              style={{ fontFamily: bodyFont.style.fontFamily }}
            >
              We&apos;re new, so every review counts. Reviews appear here once approved.
            </p>
          </div>
        </ScrollReveal>

        {/* 2 Column Layout: Left = Reviews List, Right = Leave a Review Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Client Reviews Cards (Span 7 on desktop) - Staggered one by one */}
          <div className="lg:col-span-7 space-y-5">
            {reviews.map((rev, index) => (
              <ScrollReveal key={rev.id} delay={index * 140}>
                <div
                  className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-[#102a4d]/60 backdrop-blur-md border border-white/10 shadow-lg space-y-3.5 transition-all hover:border-white/20"
                >
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-[#f59e0b]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p
                    className={`${bodyFont.className} text-sm sm:text-base text-slate-200 font-normal leading-relaxed`}
                    style={{ fontFamily: bodyFont.style.fontFamily }}
                  >
                    {rev.text}
                  </p>

                  {/* Author Info */}
                  <div className="pt-1">
                    <h4
                      className={`${headingFont.className} text-sm sm:text-base font-bold text-white tracking-tight`}
                    >
                      {rev.name}
                    </h4>
                    <p
                      className={`${bodyFont.className} text-xs text-slate-400 font-normal mt-0.5`}
                      style={{ fontFamily: bodyFont.style.fontFamily }}
                    >
                      {rev.companyLocation}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right Column: Leave a Review Form Card (Span 5 on desktop) */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={220}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-100">
                <h3
                  className={`${headingFont.className} text-xl sm:text-2xl font-bold text-slate-900 mb-5 tracking-tight`}
                >
                  Leave a review
                </h3>

            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm space-y-1">
                <div className="flex items-center gap-2 font-bold text-emerald-700">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Review submitted!
                </div>
                <p className="text-xs text-emerald-600">
                  Thank you for your feedback! It will appear here once approved by our team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="review-name"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=""
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1a63cc] focus:border-transparent text-sm text-slate-900 transition-all"
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="review-company"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Company
                  </label>
                  <input
                    id="review-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder=""
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1a63cc] focus:border-transparent text-sm text-slate-900 transition-all"
                  />
                </div>

                {/* Rating Dropdown */}
                <div>
                  <label
                    htmlFor="review-rating"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Rating
                  </label>
                  <select
                    id="review-rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1a63cc] focus:border-transparent text-sm text-slate-800 bg-white transition-all cursor-pointer"
                  >
                    <option value="5">5 stars</option>
                    <option value="4">4 stars</option>
                    <option value="3">3 stars</option>
                    <option value="2">2 stars</option>
                    <option value="1">1 star</option>
                  </select>
                </div>

                {/* Your Review Textarea */}
                <div>
                  <label
                    htmlFor="review-text"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Your review
                  </label>
                  <textarea
                    id="review-text"
                    rows={4}
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder=""
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1a63cc] focus:border-transparent text-sm text-slate-900 resize-y transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#1a63cc] hover:bg-[#1554ad] text-white font-semibold text-sm transition-colors shadow-sm cursor-pointer"
                >
                  Submit review
                </button>

                {/* Google Review Link */}
                <div className="pt-1">
                  <a
                    href="#google-review"
                    className="text-xs sm:text-sm text-[#1a63cc] hover:underline font-medium inline-block"
                  >
                    Or review us on Google [link]
                  </a>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>

        </div>

      </div>
    </section>
  );
}
