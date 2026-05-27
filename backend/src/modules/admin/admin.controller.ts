import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import { Order } from "../orders/order.model";

import { Product } from "../products/product.model";

import { User } from "../auth/auth.model";

export const getDashboardStats =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      // COUNTS

      const totalOrders =
        await Order.countDocuments();

      const totalProducts =
        await Product.countDocuments();

      const totalUsers =
        await User.countDocuments();

      // REVENUE

      const revenueResult =
        await Order.aggregate([
          {
            $match: {
              paymentStatus:
                "PAID",
            },
          },

          {
            $group: {
              _id: null,

              totalRevenue:
                {
                  $sum:
                    "$totalAmount",
                },
            },
          },
        ]);

      const totalRevenue =
        revenueResult[0]
          ?.totalRevenue || 0;

      // ORDER STATS

      const pendingOrders =
        await Order.countDocuments(
          {
            orderStatus:
              "PENDING",
          }
        );

      const deliveredOrders =
        await Order.countDocuments(
          {
            orderStatus:
              "DELIVERED",
          }
        );

      const cancelledOrders =
        await Order.countDocuments(
          {
            orderStatus:
              "CANCELLED",
          }
        );

      // RECENT ORDERS

      const recentOrders =
        await Order.find()

          .populate(
            "user",
            "name email"
          )

          .sort({
            createdAt: -1,
          })

          .limit(5);

      // LOW STOCK PRODUCTS

      const lowStockProducts =
        await Product.find({
          stock: {
            $lt: 5,
          },
        })
          .sort({
            stock: 1,
          })
          .limit(5);

      return successResponse(
        res,
        "Dashboard stats fetched successfully",
        {
          totalRevenue,

          totalOrders,

          totalProducts,

          totalUsers,

          pendingOrders,

          deliveredOrders,

          cancelledOrders,

          recentOrders,

          lowStockProducts,
        }
      );
    }
  );