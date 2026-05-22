"use client";

import {
  useEffect,
  useState,
} from "react";

import { Star } from "lucide-react";

import {
  createReview,
  getProductReviews,
} from "@/services/review.service";

import { toast } from "sonner";

interface Props {
  productId: string;
}

export default function ReviewSection({
  productId,
}: Props) {
  const [reviews, setReviews] =
    useState<any[]>([]);

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const fetchReviews =
    async () => {
      try {
        const res =
          await getProductReviews(
            productId
          );

       setReviews(
  res.data.data || []
);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        await createReview({
          productId,

          rating,

          comment,
        });

        toast.success(
          "Review added successfully"
        );

        setComment("");

        fetchReviews();
      } catch (error: any) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to add review"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mt-20 space-y-10">

      <div>
        
        <h2 className="text-3xl font-bold">
          Reviews
        </h2>

        <p className="text-zinc-500 mt-2">
          Customer feedback
        </p>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-3xl p-6 space-y-5"
      >

        <div>
          
          <label className="font-medium">
            Rating
          </label>

          <div className="flex gap-2 mt-3">
            
            {[1, 2, 3, 4, 5].map(
              (star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setRating(
                      star
                    )
                  }
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <=
                      rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-300"
                    }`}
                  />
                </button>
              )
            )}

          </div>

        </div>

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          required
          rows={5}
          placeholder="Write your review..."
          className="w-full border rounded-2xl p-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="h-12 px-6 rounded-2xl bg-black text-white font-medium"
        >
          {loading
            ? "Submitting..."
            : "Submit Review"}
        </button>

      </form>

      {/* LIST */}

      <div className="space-y-5">

        {reviews.length ===
        0 ? (
          <div className="text-zinc-500">
            No reviews yet
          </div>
        ) : (
          reviews.map(
            (review) => (
              <div
                key={
                  review._id
                }
                className="bg-white border rounded-3xl p-6"
              >

                <div className="flex items-center justify-between">

                  <div>
                    
                    <h3 className="font-bold">
                      {
                        review.user
                          ?.name
                      }
                    </h3>

                    <div className="flex gap-1 mt-2">
                      
                      {[
                        1, 2, 3, 4, 5,
                      ].map(
                        (
                          star
                        ) => (
                          <Star
                            key={
                              star
                            }
                            className={`w-5 h-5 ${
                              star <=
                              review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-zinc-300"
                            }`}
                          />
                        )
                      )}

                    </div>

                  </div>

                </div>

                <p className="mt-4 text-zinc-700 leading-relaxed">
                  {
                    review.comment
                  }
                </p>

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}