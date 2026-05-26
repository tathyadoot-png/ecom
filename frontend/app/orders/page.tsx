"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Image from "next/image";

import {
  ArrowRight,
  Package,
} from "lucide-react";

import { toast } from "sonner";

import {
  getMyOrders,
} from "@/services/order.service";

export default function OrdersPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders =
    async () => {
      try {
        const res =
          await getMyOrders();

        setOrders(
          res.data
        );

      } catch (error: any) {
        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to fetch orders"
        );

      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  // STATUS COLORS

  const getStatusStyles =
    (status: string) => {
      switch (status) {

        case "DELIVERED":
          return "bg-green-100 text-green-700";

        case "PROCESSING":
          return "bg-blue-100 text-blue-700";

        case "SHIPPED":
          return "bg-purple-100 text-purple-700";

        case "CANCELLED":
          return "bg-red-100 text-red-700";

        case "CONFIRMED":
          return "bg-emerald-100 text-emerald-700";

        default:
          return "bg-yellow-100 text-yellow-700";
      }
    };

  // LOADING

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50">

        <div className="max-w-7xl mx-auto px-4 py-10">

          <div className="space-y-6">

            {Array.from({
              length: 3,
            }).map((_, i) => (
              <div
                key={i}
                className="bg-white border rounded-3xl p-8 animate-pulse h-[260px]"
              />
            ))}

          </div>

        </div>

      </div>
    );
  }

  // EMPTY STATE

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">

        <div className="bg-white border rounded-3xl p-10 text-center max-w-lg w-full">

          <div className="flex justify-center mb-6">

            <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center">

              <Package
                size={46}
              />

            </div>

          </div>

          <h1 className="text-4xl font-bold">
            No Orders Yet
          </h1>

          <p className="text-zinc-500 mt-4 leading-relaxed">
            Start shopping to place your first order.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex h-14 px-8 rounded-2xl bg-black text-white items-center justify-center font-semibold hover:opacity-90 transition-all"
          >
            Browse Products
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            My Orders
          </h1>

          <p className="text-zinc-500 mt-2">
            Track and manage your orders
          </p>

        </div>

        {/* ORDERS */}

        <div className="space-y-8">

          {orders.map(
            (order) => (

              <div
                key={order._id}
                className="bg-white border rounded-3xl p-6 md:p-8"
              >

                {/* TOP */}

                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

                  {/* LEFT */}

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-2xl font-bold">
                        Order #
                        {order._id.slice(-6)}
                      </h2>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyles(
                          order.orderStatus
                        )}`}
                      >
                        {
                          order.orderStatus
                        }
                      </span>

                    </div>

                    <p className="text-zinc-500 mt-3">
                      Placed on{" "}
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month:
                            "long",
                          year:
                            "numeric",
                        }
                      )}
                    </p>

                  </div>

                  {/* RIGHT */}

                  <div className="flex flex-wrap items-center gap-4">

                    <div className="bg-zinc-100 rounded-2xl px-5 py-3">

                      <p className="text-xs text-zinc-500">
                        Payment
                      </p>

                      <h3 className="font-bold mt-1">
                        {
                          order.paymentMethod
                        }
                      </h3>

                    </div>

                    <div className="bg-zinc-100 rounded-2xl px-5 py-3">

                      <p className="text-xs text-zinc-500">
                        Total
                      </p>

                      <h3 className="font-bold mt-1 text-lg">
                        ₹
                        {
                          order.totalAmount
                        }
                      </h3>

                    </div>

                  </div>

                </div>

                {/* PRODUCTS */}

                <div className="space-y-5">

                  {order.items
                    .slice(0, 2)
                    .map(
                      (
                        item: any
                      ) => (

                        <div
                          key={
                            item.product
                          }
                          className="flex gap-4"
                        >

                          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border">

                            <Image
                              src={
                                item.image
                              }
                              alt={
                                item.title
                              }
                              fill
                              className="object-cover"
                            />

                          </div>

                          <div className="flex-1 min-w-0">

                            <h3 className="font-semibold line-clamp-1">
                              {
                                item.title
                              }
                            </h3>

                            <p className="text-sm text-zinc-500 mt-1">
                              Quantity:
                              {" "}
                              {
                                item.quantity
                              }
                            </p>

                            <p className="font-bold mt-2">
                              ₹
                              {
                                item.price
                              }
                            </p>

                          </div>

                        </div>
                      )
                    )}

                  {/* MORE ITEMS */}

                  {order.items
                    .length > 2 && (

                    <div className="text-sm text-zinc-500">

                      +
                      {" "}
                      {order.items.length - 2}
                      {" "}
                      more products

                    </div>
                  )}

                </div>

                {/* FOOTER */}

                <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                  <div className="flex flex-wrap items-center gap-3">

                    <span className="text-sm text-zinc-500">
                      Payment Status:
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.paymentStatus ===
                        "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {
                        order.paymentStatus
                      }
                    </span>

                  </div>

                  <Link
                    href={`/orders/${order._id}`}
                    className="h-12 px-6 rounded-2xl bg-black text-white flex items-center justify-center gap-2 font-semibold hover:opacity-90 transition-all"
                  >

                    View Details

                    <ArrowRight
                      size={18}
                    />

                  </Link>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}