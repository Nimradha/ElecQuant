"use client";

import React, { useState, useRef } from "react";
import { X, UploadCloud, CheckCircle2, FileText, Trash2 } from "lucide-react";

interface QuoteFormCardProps {
  onClose?: () => void;
  currency?: "AUD" | "NZD";
}

export function QuoteFormCard({ onClose, currency = "AUD" }: QuoteFormCardProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "Australia",
    tenderDue: "",
    projectType: "Residential",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission latency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      country: "Australia",
      tenderDue: "",
      projectType: "Residential",
    });
    setFiles([]);
    setIsSuccess(false);
  };

  return (
    <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-7 text-slate-800 border border-slate-100 transition-all duration-300">
      {/* Optional Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close quote form"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {!isSuccess ? (
        <>
          <div className="mb-4 sm:mb-5 pr-6 sm:pr-0">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900">
              Get your take-off quote
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Upload your drawings and we&apos;ll reply with a fixed price in {currency}.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            {/* Your name & Email in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              <div>
                <label htmlFor="quote-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Your name
                </label>
                <input
                  id="quote-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Henderson"
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg border border-slate-300 text-base sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d9232a] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="quote-email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  id="quote-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@contractor.com.au"
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg border border-slate-300 text-base sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d9232a] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Country & Tender Due in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="quote-country" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Country
                </label>
                <div className="relative">
                  <select
                    id="quote-country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-base sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d9232a] focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="Australia">Australia</option>
                    <option value="New Zealand">New Zealand</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="quote-tender-due" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tender due
                </label>
                <input
                  id="quote-tender-due"
                  type="date"
                  required
                  value={formData.tenderDue}
                  onChange={(e) => setFormData({ ...formData, tenderDue: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-base sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d9232a] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Project type */}
            <div>
              <label htmlFor="quote-project-type" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Project type
              </label>
              <div className="relative">
                <select
                  id="quote-project-type"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-base sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d9232a] focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="High-Rise Residential">High-Rise Residential</option>
                  <option value="Civil & Infrastructure">Civil & Infrastructure</option>
                  <option value="Data Centres">Data Centres</option>
                  <option value="Health & Hospital">Health & Hospital</option>
                  <option value="Education">Education</option>
                  <option value="Retail & Fitout">Retail & Fitout</option>
                  <option value="Government & Defence">Government & Defence</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Drop drawings here or choose files */}
            <div>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-3.5 sm:p-4 text-center cursor-pointer transition-all duration-150 ${
                  isDragging
                    ? "border-[#d9232a] bg-red-50/50"
                    : "border-sky-300/90 bg-sky-50/40 hover:bg-sky-50/70"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept=".pdf,.dwg,.dxf,.zip"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center">
                  <UploadCloud className="w-5 h-5 text-sky-600 mb-0.5" />
                  <p className="text-xs sm:text-sm font-semibold text-sky-700">
                    Drop drawings here or choose files
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    PDF, DWG, DXF or ZIP · specs welcome
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50">
                    Choose Files
                  </div>
                </div>
              </div>

              {/* Uploaded Files Preview List */}
              {files.length > 0 && (
                <div className="mt-2 space-y-1 max-h-24 overflow-y-auto pr-1">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <FileText className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate font-medium text-slate-700">{file.name}</span>
                        <span className="text-slate-400 shrink-0 text-[11px]">
                          ({(file.size / (1024 * 1024)).toFixed(1)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        className="text-slate-400 hover:text-red-600 ml-2 p-0.5"
                        title="Remove file"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-1.5 py-3 px-5 sm:py-3.5 sm:px-6 rounded-lg bg-[#d9232a] hover:bg-[#b81c22] active:scale-[0.99] text-white font-semibold text-sm sm:text-base tracking-tight transition-all shadow-md shadow-red-600/20 disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? "Submitting drawings..." : `Get my quote (${currency})`}
            </button>
          </form>
        </>
      ) : (
        /* Success State */
        <div className="text-center py-6 sm:py-8 space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              Drawings Received!
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
              Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our estimating team has queued your plans for scope review.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Project Type:</span>
              <span className="font-semibold text-slate-800">{formData.projectType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tender Due:</span>
              <span className="font-semibold text-slate-800">{formData.tenderDue || "Immediate"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Files Uploaded:</span>
              <span className="font-semibold text-slate-800">{files.length > 0 ? `${files.length} package(s)` : "Pending upload"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Quote Currency:</span>
              <span className="font-semibold text-slate-800">{currency} (Fixed-Price)</span>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            We will reply directly to <span className="font-semibold text-slate-700">{formData.email}</span> with a formal scope & fixed-price quote.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
            >
              Submit another project
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 px-4 text-slate-600 hover:text-slate-900 font-medium text-xs transition-colors"
              >
                Return to homepage
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
