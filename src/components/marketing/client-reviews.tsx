"use client";

import React, { useState, useEffect } from "react";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import { Star, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
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

const initialReviews: Review[] = [];

export function ClientReviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  // Overall rating calculations
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : null;
  const numericAvg = averageRating ? parseFloat(averageRating) : 0;

  // Load reviews from MongoDB (with localStorage fallback)
  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        if (data.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
          try {
            localStorage.setItem("elecquant_reviews", JSON.stringify(data.reviews));
          } catch {}
          return;
        }
      } catch (err) {
        console.warn("Could not load reviews from MongoDB, checking fallback...", err);
      }

      // Fallback to localStorage if API is unreachable
      try {
        const stored = localStorage.getItem("elecquant_reviews");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const cleanReviews = parsed.filter(
              (r: Review) => r.id !== "1" && r.id !== "2" && !r.text?.includes("[Client review")
            );
            setReviews(cleanReviews);
          }
        }
      } catch {}
    }

    loadReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      companyLocation: company.trim() ? company.trim() : "Verified Client",
      rating: Number(rating),
      text: reviewText.trim(),
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const savedReview: Review =
        data.success && data.review
          ? data.review
          : { ...payload, id: Date.now().toString() };

      setReviews((prev) => {
        const updated = [savedReview, ...prev.filter((r) => r.id !== savedReview.id)];
        try {
          localStorage.setItem("elecquant_reviews", JSON.stringify(updated));
        } catch {}
        return updated;
      });
    } catch (err) {
      console.warn("Could not save to MongoDB, saving locally:", err);
      // Fallback local save
      const fallbackReview: Review = { ...payload, id: Date.now().toString() };
      setReviews((prev) => {
        const updated = [fallbackReview, ...prev];
        try {
          localStorage.setItem("elecquant_reviews", JSON.stringify(updated));
        } catch {}
        return updated;
      });
    } finally {
      setIsSubmitting(false);
      setName("");
      setCompany("");
      setRating("5");
      setReviewText("");

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    }
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
              We&apos;re new, so every review counts. All client feedback is published live.
            </p>

            {/* Overall Rating Display (Google reviews style) */}
            {totalReviews > 0 ? (
              <div className="mt-3.5 flex items-center gap-2.5">
                <span className="text-white text-base sm:text-lg font-bold tracking-tight">
                  {averageRating}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => {
                    const fillPercentage = Math.max(0, Math.min(1, numericAvg - i));
                    return (
                      <span key={i} className="relative inline-block w-4 h-4">
                        {/* Background unfilled star */}
                        <Star className="w-4 h-4 fill-slate-700/60 text-slate-600" />
                        {/* Foreground gold filled star with fractional width */}
                        {fillPercentage > 0 && (
                          <span
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${fillPercentage * 100}%` }}
                          >
                            <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
                <span className="text-slate-300 text-xs sm:text-sm font-medium">
                  {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                </span>
              </div>
            ) : (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                <span className="flex items-center gap-0.5 text-[#f59e0b]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b]/40 text-[#f59e0b]/40" />
                  ))}
                </span>
                <span>No reviews yet · Be the first to leave a review</span>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* 2 Column Layout: Left = Reviews List, Right = Leave a Review Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Client Reviews Cards (Span 7 on desktop) - Staggered one by one */}
          <div className="lg:col-span-7 space-y-5">
            {reviews.length > 0 ? (
              <>
                {visibleReviews.map((rev, index) => (
                  <ScrollReveal key={rev.id} delay={index * 140}>
                    <div
                      className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-[#102a4d]/60 backdrop-blur-md border border-white/10 shadow-lg space-y-3.5 transition-all hover:border-white/20"
                    >
                      {/* Rating Stars (Supports 1 to 5 stars) */}
                      <div className="flex items-center gap-1 text-[#f59e0b]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rev.rating
                                ? "fill-[#f59e0b] text-[#f59e0b]"
                                : "fill-slate-700/50 text-slate-600"
                            }`}
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

                {/* View More / Show Less Button when more than 3 reviews exist */}
                {reviews.length > 3 && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAllReviews((prev) => !prev)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#102a4d]/90 hover:bg-[#163863] text-slate-200 hover:text-white border border-white/10 hover:border-white/25 text-sm font-semibold transition-all shadow-md cursor-pointer group"
                    >
                      <span>
                        {showAllReviews
                          ? "Show less reviews"
                          : `View more reviews (${reviews.length - 3} more)`}
                      </span>
                      {showAllReviews ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform" />
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <ScrollReveal>
                <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-10 bg-[#102a4d]/40 backdrop-blur-md border border-dashed border-white/15 text-center space-y-3">
                  <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-[#f59e0b]">
                    <Star className="w-6 h-6 fill-[#f59e0b] text-[#f59e0b]" />
                  </div>
                  <h3 className={`${headingFont.className} text-lg sm:text-xl font-bold text-white`}>
                    Be the first to review us
                  </h3>
                  <p className={`${bodyFont.className} text-xs sm:text-sm text-slate-400 max-w-sm mx-auto`}>
                    No reviews yet. Share your feedback using the form and your review will appear right here!
                  </p>
                </div>
              </ScrollReveal>
            )}
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

                {isSubmitted && (
                  <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm space-y-1 transition-all">
                    <div className="flex items-center gap-2 font-bold text-emerald-700">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      Review published!
                    </div>
                    <p className="text-xs text-emerald-600">
                      Thank you for your feedback! Your review is now live on the left.
                    </p>
                  </div>
                )}

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
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-[#1a63cc] hover:bg-[#1554ad] disabled:bg-[#1a63cc]/70 text-white font-semibold text-sm transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting review...</span>
                    </>
                  ) : (
                    "Submit review"
                  )}
                </button>


              </form>
            </div>
        </ScrollReveal>
      </div>

        </div>

      </div>
    </section>
  );
}
