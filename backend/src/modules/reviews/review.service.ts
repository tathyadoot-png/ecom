import { Review } from "./review.model";

import { Product } from "../products/product.model";

import { ApiError } from "../../utils/ApiError";

const recalculateProductRating =
  async (productId: string) => {
    const product =
      await Product.findById(
        productId
      );

    if (!product) {
      return;
    }

    const reviews =
      await Review.find({
        product: productId,
      });

    const averageRating =
      reviews.length === 0
        ? 0
        : reviews.reduce(
            (
              acc,
              item
            ) =>
              item.rating + acc,
            0
          ) / reviews.length;

    product.averageRating =
      Number(
        averageRating.toFixed(
          1
        )
      );

    product.numReviews =
      reviews.length;

    await product.save();
  };

export const createReviewService =
  async (
    userId: string,
    productId: string,
    rating: number,
    comment: string
  ) => {
    const product =
      await Product.findById(
        productId
      );

    if (!product) {
      throw new ApiError(
        404,
        "Product not found"
      );
    }

    const alreadyReviewed =
      await Review.findOne({
        user: userId,
        product: productId,
      });

    if (alreadyReviewed) {
      throw new ApiError(
        400,
        "You already reviewed this product"
      );
    }

    await Review.create({
      user: userId,

      product: productId,

      rating,

      comment,
    });

    await recalculateProductRating(
      productId
    );

    return true;
  };

export const getProductReviewsService =
  async (
    productId: string
  ) => {
    return Review.find({
      product: productId,
    })
      .populate(
        "user",
        "name"
      )
      .sort({
        createdAt: -1,
      });
  };


  export const getAllReviewsService =
  async () => {
    const reviews =
      await Review.find()

        .populate(
          "user",
          "name email"
        )

        .populate(
          "product",
          "title images"
        )

        .sort({
          createdAt: -1,
        });

    return reviews;
  };


  export const deleteReviewService =
  async (
    reviewId: string
  ) => {
    const review =
      await Review.findById(
        reviewId
      );

    if (!review) {
      throw new ApiError(
        404,
        "Review not found"
      );
    }

    await Review.findByIdAndDelete(
      reviewId
    );

    await recalculateProductRating(
      review.product.toString()
    );

    return true;
  };