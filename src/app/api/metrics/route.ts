import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SiteMetric } from "@/models/SiteMetric";

const DEFAULT_METRICS = {
  projectsCompleted: "[0]",
  newlyLaunched: "2026",
  bothMarkets: "AU+NZ",
  pendingProjects: "[0]",
};

export async function GET() {
  try {
    await connectToDatabase();

    let metric = await SiteMetric.findOne().sort({ createdAt: -1 });

    if (!metric) {
      metric = await SiteMetric.create(DEFAULT_METRICS);
    }

    return NextResponse.json({
      success: true,
      metrics: {
        projectsCompleted: metric.projectsCompleted || DEFAULT_METRICS.projectsCompleted,
        newlyLaunched: metric.newlyLaunched || DEFAULT_METRICS.newlyLaunched,
        bothMarkets: metric.bothMarkets || DEFAULT_METRICS.bothMarkets,
        pendingProjects: metric.pendingProjects || DEFAULT_METRICS.pendingProjects,
      },
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    // Graceful fallback to default values so the site never breaks
    return NextResponse.json({
      success: true,
      metrics: DEFAULT_METRICS,
      fallback: true,
    });
  }
}
