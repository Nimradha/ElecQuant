import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuote extends Document {
  name: string;
  email: string;
  country: string;
  tenderDue: string;
  projectType: string;
  currency: string;
  fileNames: string[];
  status: "pending" | "reviewed" | "quoted";
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema = new Schema<IQuote>(
  {
    name: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Client email is required"],
      trim: true,
      lowercase: true,
    },
    country: {
      type: String,
      default: "Australia",
    },
    tenderDue: {
      type: String,
      default: "Not specified",
    },
    projectType: {
      type: String,
      default: "Residential",
    },
    currency: {
      type: String,
      default: "AUD",
    },
    fileNames: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "quoted"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Quote: Model<IQuote> =
  mongoose.models.Quote || mongoose.model<IQuote>("Quote", QuoteSchema);
