"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import Link from "next/link";

import {
  useParams,
} from "next/navigation";

import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";

import { toast } from "sonner";

import {
  getSingleOrder,
} from "@/services/order.service";

export default function OrderDetailsPage() {
  const params =
    useParams();

  const [loading, setLoading] =
    useState(true);

  const [order, setOrder] =
    useState<any>(null);

  const fetchOrder =
    async () => {
      try {
        const res =
          await getSingleOrder(
            params.id as string
          );

        setOrder(
          res.data
        );

      } catch (error: any) {
        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to fetch order"
        );

      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchOrder();
  }, []);

  // STATUS COLOR

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* BACK */}

        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:underline"
        >

          <ArrowLeft
            size={18}
          />

          Back To Orders

        </Link>

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h1 className="text-4xl font-bold">
                Order Details
              </h1>

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

            <p className="text-zinc-500 mt-3 break-all">
              Order ID:
              {" "}
              {order._id}
            </p>

            <p className="text-zinc-500 mt-1">
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

          {/* TOTAL */}

          <div className="bg-white border rounded-3xl px-8 py-6">

            <p className="text-zinc-500 text-sm">
              Total Amount
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹
              {
                order.totalAmount
              }
            </h2>

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-8">

            {/* PRODUCTS */}

            <div className="bg-white border rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">

                  <Package
                    size={22}
                  />

                </div>

                <h2 className="text-2xl font-bold">
                  Ordered Products
                </h2>

              </div>

              <div className="space-y-6">

                {order.items.map(
                  (item: any) => (
                    <div
                      key={
                        item.product
                      }
                      className="flex gap-5 border-b last:border-none pb-6 last:pb-0"
                    >

                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden border bg-zinc-100">

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

                        <Link
                          href={`/products/${item.slug}`}
                        >

                          <h3 className="text-lg font-semibold hover:underline line-clamp-1">
                            {
                              item.title
                            }
                          </h3>

                        </Link>

                        <p className="text-zinc-500 mt-2">
                          Quantity:
                          {" "}
                          {
                            item.quantity
                          }
                        </p>

                        <p className="font-bold mt-2 text-lg">
                          ₹
                          {
                            item.price
                          }
                        </p>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* SHIPPING */}

            <div className="bg-white border rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">

                  <MapPin
                    size={22}
                  />

                </div>

                <h2 className="text-2xl font-bold">
                  Shipping Address
                </h2>

              </div>

              <div className="space-y-3 text-zinc-700">

                <p className="font-semibold text-black text-lg">
                  {
                    order
                      .shippingAddress
                      .fullName
                  }
                </p>

                <p>
                  {
                    order
                      .shippingAddress
                      .phone
                  }
                </p>

                <p>
                  {
                    order
                      .shippingAddress
                      .address
                  }
                </p>

                <p>
                  {
                    order
                      .shippingAddress
                      .city
                  }
                  ,
                  {" "}
                  {
                    order
                      .shippingAddress
                      .state
                  }
                </p>

                <p>
                  {
                    order
                      .shippingAddress
                      .postalCode
                  }
                </p>

                <p>
                  {
                    order
                      .shippingAddress
                      .country
                  }
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="space-y-8">

            {/* SUMMARY */}

            <div className="bg-white border rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">

                  <Truck
                    size={22}
                  />

                </div>

                <h2 className="text-2xl font-bold">
                  Order Summary
                </h2>

              </div>

              <div className="space-y-5">

                <div className="flex items-center justify-between">

                  <span className="text-zinc-500">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ₹
                    {
                      order.subtotal
                    }
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-zinc-500">
                    Shipping
                  </span>

                  <span className="font-medium">
                    {order.shippingFee ===
                    0
                      ? "Free"
                      : `₹${order.shippingFee}`}
                  </span>

                </div>

                <div className="border-t pt-5 flex items-center justify-between text-xl font-bold">

                  <span>
                    Total
                  </span>

                  <span>
                    ₹
                    {
                      order.totalAmount
                    }
                  </span>

                </div>

              </div>

            </div>

            {/* PAYMENT */}

            <div className="bg-white border rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">

                  <CreditCard
                    size={22}
                  />

                </div>

                <h2 className="text-2xl font-bold">
                  Payment
                </h2>

              </div>

              <div className="space-y-5">

                <div className="flex items-center justify-between">

                  <span className="text-zinc-500">
                    Method
                  </span>

                  <span className="font-semibold">
                    {
                      order.paymentMethod
                    }
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-zinc-500">
                    Payment Status
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

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}