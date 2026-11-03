import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  name: string;
  companyLocation: string;
  rating: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    companyLocation: {
      type: String,
      default: "Verified Client",
      trim: true,
      maxlength: [150, "Company location cannot exceed 150 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    text: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      maxlength: [1000, "Review text cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compiling the model if already registered
export const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

