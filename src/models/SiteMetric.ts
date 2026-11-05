import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteMetric extends Document {
  projectsCompleted: string;
  newlyLaunched: string;
  bothMarkets: string;
  pendingProjects: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteMetricSchema = new Schema<ISiteMetric>(
  {
    projectsCompleted: {
      type: String,
      default: "[0]",
      trim: true,
    },
    newlyLaunched: {
      type: String,
      default: "2026",
      trim: true,
    },
    bothMarkets: {
      type: String,
      default: "AU+NZ",
      trim: true,
    },
    pendingProjects: {
      type: String,
      default: "[0]",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SiteMetric: Model<ISiteMetric> =
  mongoose.models.SiteMetric ||
  mongoose.model<ISiteMetric>("SiteMetric", SiteMetricSchema);
