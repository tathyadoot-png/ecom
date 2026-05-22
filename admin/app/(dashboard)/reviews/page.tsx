"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import { Trash2 } from "lucide-react";

import {
  deleteReview,
  getAllReviews,
} from "@/services/review.service";

import { toast } from "sonner";

export default function ReviewsPage() {
  const [reviews, setReviews] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchReviews =
    async () => {
      try {
        const res =
          await getAllReviews();

        setReviews(
          res.data.data || []
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to fetch reviews"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete =
    async (id: string) => {
      const confirmDelete =
        confirm(
          "Delete this review?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteReview(id);

        toast.success(
          "Review deleted"
        );

        fetchReviews();
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to delete review"
        );
      }
    };

  if (loading) {
    return (
      <div>
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Reviews
        </h1>

        <p className="text-zinc-500 mt-2">
          Manage customer reviews
        </p>

      </div>

      <div className="space-y-5">

        {reviews.length ===
        0 ? (
          <div className="bg-white border rounded-3xl p-10 text-center text-zinc-500">
            No reviews found
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

                <div className="flex items-start justify-between gap-6">

                  <div className="flex gap-5">

                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border">

                      <Image
                        src={
                          review
                            .product
                            ?.images?.[0]
                        }
                        alt={
                          review
                            .product
                            ?.title
                        }
                        fill
                        className="object-cover"
                      />

                    </div>

                    <div>

                      <h2 className="text-xl font-bold">
                        {
                          review
                            .product
                            ?.title
                        }
                      </h2>

                      <p className="text-sm text-zinc-500 mt-1">
                        By{" "}
                        {
                          review
                            .user
                            ?.name
                        }
                      </p>

                      <div className="flex items-center gap-1 mt-3">

                        {Array.from({
                          length: 5,
                        }).map(
                          (
                            _,
                            index
                          ) => (
                            <span
                              key={
                                index
                              }
                              className={`text-lg ${
                                index <
                                review.rating
                                  ? "text-yellow-500"
                                  : "text-zinc-300"
                              }`}
                            >
                              ★
                            </span>
                          )
                        )}

                      </div>

                      <p className="text-zinc-700 mt-4">
                        {
                          review.comment
                        }
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        review._id
                      )
                    }
                    className="w-11 h-11 rounded-2xl border text-red-600 flex items-center justify-center hover:bg-red-50"
                  >

                    <Trash2 size={18} />

                  </button>

                </div>

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}