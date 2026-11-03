import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Review } from "@/models/Review";

// GET /api/reviews - Fetch all reviews (latest first)
export async function GET() {
  try {
    await connectToDatabase();
    const reviews = await Review.find({}).sort({ createdAt: -1 }).lean();

    const formattedReviews = reviews.map((r) => ({
      id: r._id.toString(),
      name: r.name,
      companyLocation: r.companyLocation || "Verified Client",
      rating: r.rating,
      text: r.text,
      createdAt: r.createdAt,
    }));

    return NextResponse.json({ success: true, reviews: formattedReviews });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch reviews";
    console.error("GET /api/reviews error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Submit a new review
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, companyLocation, rating, text } = body;

    if (!name || !text || rating === undefined) {
      return NextResponse.json(
        { success: false, error: "Name, rating, and review text are required" },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be a number between 1 and 5" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newReview = await Review.create({
      name: name.trim(),
      companyLocation: companyLocation?.trim() || "Verified Client",
      rating: numericRating,
      text: text.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        review: {
          id: newReview._id.toString(),
          name: newReview.name,
          companyLocation: newReview.companyLocation,
          rating: newReview.rating,
          text: newReview.text,
          createdAt: newReview.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create review";
    console.error("POST /api/reviews error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

