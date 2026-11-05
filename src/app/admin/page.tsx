"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, LogOut, CheckCircle, ExternalLink, RefreshCw, ShieldCheck, AlertCircle } from "lucide-react";

interface MetricsState {
  projectsCompleted: string;
  newlyLaunched: string;
  bothMarkets: string;
  pendingProjects: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Metrics form state
  const [metrics, setMetrics] = useState<MetricsState>({
    projectsCompleted: "[0]",
    newlyLaunched: "2026",
    bothMarkets: "AU+NZ",
    pendingProjects: "[0]",
  });

  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        loadMetrics();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }

  async function loadMetrics() {
    setIsLoadingMetrics(true);
    try {
      const res = await fetch("/api/metrics");
      const data = await res.json();
      if (data.metrics) {
        setMetrics(data.metrics);
      }
    } catch (err) {
      console.error("Failed to load metrics", err);
    } finally {
      setIsLoadingMetrics(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoggingIn(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword("");
        loadMetrics();
      } else {
        setAuthError(data.error || "Incorrect password. Please try again.");
      }
    } catch {
      setAuthError("Network error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } finally {
      setIsAuthenticated(false);
      setPassword("");
    }
  }

  async function handleSaveMetrics(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      const res = await fetch("/api/admin/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metrics),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setSaveError(data.error || "Failed to save metrics.");
      }
    } catch {
      setSaveError("Network error while saving.");
    } finally {
      setIsSaving(false);
    }
  }

  // Initial checking state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-slate-300">
          <RefreshCw className="w-5 h-5 animate-spin text-[#d9232a]" />
          <span>Verifying admin session...</span>
        </div>
      </div>
    );
  }

  // 1. Logged-out State: Password Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 text-white">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#d9232a]/15 text-[#d9232a] border border-[#d9232a]/30 flex items-center justify-center mb-3 shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              ElecQuant Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Enter your admin password to manage website values
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label htmlFor="admin-pass" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Password
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#d9232a] focus:border-transparent text-sm transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-lg bg-[#d9232a] hover:bg-[#b81c22] active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-md shadow-red-950/50 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Log in to Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <span>Return to live website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Logged-in State: Metric Manager Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
              Elec<span className="text-[#d9232a]">Quant</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-950/60 text-[#f87171] border border-red-800/50">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
            >
              <span>View live site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950 hover:text-red-300 hover:border-red-900 border border-slate-700 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Website Metrics &amp; Stat Cards
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Update the four numbers displayed on the homepage. Changes take effect on the live website immediately after saving.
          </p>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold">Changes saved successfully!</p>
              <p className="text-xs text-emerald-300/80 mt-0.5">The homepage has been updated with your new values.</p>
            </div>
          </div>
        )}

        {saveError && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        <form onSubmit={handleSaveMetrics}>
          {/* 4 Editable Cards Grid matching homepage layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            
            {/* Card 1: Projects completed */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#d9232a]" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Card 1 (Red Bar)
                </span>
                <h3 className="text-sm font-semibold text-slate-200 mt-1 mb-3">
                  Projects completed
                </h3>
                <label htmlFor="card-1" className="block text-xs text-slate-400 mb-1">
                  Display Value:
                </label>
                <input
                  id="card-1"
                  type="text"
                  required
                  value={metrics.projectsCompleted}
                  onChange={(e) => setMetrics({ ...metrics, projectsCompleted: e.target.value })}
                  placeholder="e.g. [0] or 15+"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#d9232a] focus:border-transparent transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-3">Default: [0]</p>
            </div>

            {/* Card 2: Newly launched */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#2563eb]" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Card 2 (Blue Bar)
                </span>
                <h3 className="text-sm font-semibold text-slate-200 mt-1 mb-3">
                  Newly launched
                </h3>
                <label htmlFor="card-2" className="block text-xs text-slate-400 mb-1">
                  Display Value:
                </label>
                <input
                  id="card-2"
                  type="text"
                  required
                  value={metrics.newlyLaunched}
                  onChange={(e) => setMetrics({ ...metrics, newlyLaunched: e.target.value })}
                  placeholder="e.g. 2026"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-3">Default: 2026</p>
            </div>

            {/* Card 3: Both markets */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#d9232a]" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Card 3 (Red Bar)
                </span>
                <h3 className="text-sm font-semibold text-slate-200 mt-1 mb-3">
                  Both markets
                </h3>
                <label htmlFor="card-3" className="block text-xs text-slate-400 mb-1">
                  Display Value:
                </label>
                <input
                  id="card-3"
                  type="text"
                  required
                  value={metrics.bothMarkets}
                  onChange={(e) => setMetrics({ ...metrics, bothMarkets: e.target.value })}
                  placeholder="e.g. AU+NZ"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#d9232a] focus:border-transparent transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-3">Default: AU+NZ</p>
            </div>

            {/* Card 4: Pending projects */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#2563eb]" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Card 4 (Blue Bar)
                </span>
                <h3 className="text-sm font-semibold text-slate-200 mt-1 mb-3">
                  Pending projects
                </h3>
                <label htmlFor="card-4" className="block text-xs text-slate-400 mb-1">
                  Display Value:
                </label>
                <input
                  id="card-4"
                  type="text"
                  required
                  value={metrics.pendingProjects}
                  onChange={(e) => setMetrics({ ...metrics, pendingProjects: e.target.value })}
                  placeholder="e.g. [0] or 3"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-3">Default: [0]</p>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={loadMetrics}
              disabled={isLoadingMetrics || isSaving}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMetrics ? "animate-spin" : ""}`} />
              <span>Refresh current live values</span>
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#d9232a] hover:bg-[#b81c22] active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-md shadow-red-950/50 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving to website...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
