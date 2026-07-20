import { MessageSquare } from 'lucide-react';
import { StarRating } from '@/components/ui/StarRating';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDate } from '@/lib/utils';
import { Review } from '@/types/review.types';

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  numReviews: number;
}

// Read-only — no submission form yet, that requires auth-aware
// write access this phase deliberately doesn't build.
const ProductReviews = ({ reviews, averageRating, numReviews }: ProductReviewsProps) => {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <h2 className="font-heading text-2xl text-text">Reviews</h2>
        {numReviews > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={averageRating} />
            <span className="font-body text-sm text-text/60">
              {averageRating.toFixed(1)} ({numReviews} {numReviews === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="mx-auto h-10 w-10" />}
          title="No reviews yet"
          description="Be the first to share your thoughts on this product."
        />
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-warm-beige/40 pb-6 last:border-0">
              <div className="flex items-center justify-between gap-4">
                <span className="font-body font-medium text-text">
                  {review.user?.name || 'Anonymous'}
                </span>
                <span className="font-body text-xs text-text/40">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              <StarRating rating={review.rating} className="mt-1" />
              <p className="mt-2 font-body text-sm leading-relaxed text-text/70">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { ProductReviews };
