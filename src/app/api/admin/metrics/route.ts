import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { SiteMetric } from "@/models/SiteMetric";
import { getAdminPassword, verifyAdminToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    const adminPassword = getAdminPassword();

    if (!verifyAdminToken(token, adminPassword)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { projectsCompleted, newlyLaunched, bothMarkets, pendingProjects } = body;

    await connectToDatabase();

    let metric = await SiteMetric.findOne().sort({ createdAt: -1 });

    if (!metric) {
      metric = new SiteMetric();
    }

    if (typeof projectsCompleted === "string") {
      metric.projectsCompleted = projectsCompleted.trim() || "[0]";
    }
    if (typeof newlyLaunched === "string") {
      metric.newlyLaunched = newlyLaunched.trim() || "2026";
    }
    if (typeof bothMarkets === "string") {
      metric.bothMarkets = bothMarkets.trim() || "AU+NZ";
    }
    if (typeof pendingProjects === "string") {
      metric.pendingProjects = pendingProjects.trim() || "[0]";
    }

    await metric.save();

    return NextResponse.json({
      success: true,
      message: "Metrics updated successfully",
      metrics: {
        projectsCompleted: metric.projectsCompleted,
        newlyLaunched: metric.newlyLaunched,
        bothMarkets: metric.bothMarkets,
        pendingProjects: metric.pendingProjects,
      },
    });
  } catch (error) {
    console.error("Error updating metrics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update metrics" },
      { status: 500 }
    );
  }
}
