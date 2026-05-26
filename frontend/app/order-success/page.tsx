"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

import {
  CheckCircle2,
  Package,
  CreditCard,
  Truck,
} from "lucide-react";

import { toast } from "sonner";

import {
  getSingleOrder,
} from "@/services/order.service";

export default function OrderSuccessPage() {
  const searchParams =
    useSearchParams();

  const orderId =
    searchParams.get(
      "orderId"
    );

  const [loading, setLoading] =
    useState(true);

  const [order, setOrder] =
    useState<any>(null);

  useEffect(() => {
    const fetchOrder =
      async () => {
        try {
          if (!orderId) {
            return;
          }

          const res =
            await getSingleOrder(
              orderId
            );

          setOrder(
            res.data
          );

        } catch (error) {
          console.log(error);

          toast.error(
            "Failed to fetch order"
          );

        } finally {
          setLoading(false);
        }
      };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">

        <div className="bg-white border rounded-3xl p-10 text-center max-w-md w-full">

          <h1 className="text-3xl font-bold">
            Order Not Found
          </h1>

          <p className="text-zinc-500 mt-3">
            Something went wrong
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex h-14 px-8 rounded-2xl bg-black text-white items-center justify-center font-semibold"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white border rounded-3xl p-8 md:p-12">

          {/* ICON */}

          <div className="flex justify-center mb-8">

            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center">

              <CheckCircle2
                size={58}
                className="text-green-600"
              />

            </div>

          </div>

          {/* TITLE */}

          <div className="text-center">

            <h1 className="text-4xl md:text-5xl font-bold">
              Order Placed 🎉
            </h1>

            <p className="text-zinc-500 mt-4 leading-relaxed max-w-xl mx-auto">
              Your order has been placed successfully.
              We’ll notify you once it gets confirmed and shipped.
            </p>

          </div>

          {/* ORDER INFO */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">

            {/* ORDER ID */}

            <div className="border rounded-3xl p-5">

              <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">

                <Package
                  size={22}
                />

              </div>

              <p className="text-sm text-zinc-500">
                Order ID
              </p>

              <h3 className="font-bold mt-1 break-all">
                #{order._id}
              </h3>

            </div>

            {/* PAYMENT */}

            <div className="border rounded-3xl p-5">

              <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">

                <CreditCard
                  size={22}
                />

              </div>

              <p className="text-sm text-zinc-500">
                Payment
              </p>

              <h3 className="font-bold mt-1">
                {
                  order.paymentMethod
                }
              </h3>

            </div>

            {/* STATUS */}

            <div className="border rounded-3xl p-5">

              <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">

                <Truck
                  size={22}
                />

              </div>

              <p className="text-sm text-zinc-500">
                Status
              </p>

              <h3 className="font-bold mt-1 text-green-600">
                {
                  order.orderStatus
                }
              </h3>

            </div>

          </div>

          {/* TOTAL */}

          <div className="mt-10 bg-zinc-50 rounded-3xl p-6 border">

            <div className="flex items-center justify-between text-lg">

              <span className="text-zinc-600">
                Total Paid
              </span>

              <span className="font-bold text-2xl">
                ₹
                {
                  order.totalAmount
                }
              </span>

            </div>

          </div>

          {/* SHIPPING */}

          <div className="mt-10 border rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-5">
              Shipping Address
            </h2>

            <div className="space-y-2 text-zinc-600">

              <p className="font-semibold text-black">
                {
                  order
                    .shippingAddress
                    ?.fullName
                }
              </p>

              <p>
                {
                  order
                    .shippingAddress
                    ?.phone
                }
              </p>

              <p>
                {
                  order
                    .shippingAddress
                    ?.address
                }
              </p>

              <p>
                {
                  order
                    .shippingAddress
                    ?.city
                }
                ,{" "}
                {
                  order
                    .shippingAddress
                    ?.state
                }
              </p>

              <p>
                {
                  order
                    .shippingAddress
                    ?.postalCode
                }
              </p>

              <p>
                {
                  order
                    .shippingAddress
                    ?.country
                }
              </p>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <Link
              href="/products"
              className="flex-1 h-14 rounded-2xl border flex items-center justify-center font-semibold hover:bg-zinc-100 transition-all"
            >
              Continue Shopping
            </Link>

            <Link
              href="/orders"
              className="flex-1 h-14 rounded-2xl bg-black text-white flex items-center justify-center font-semibold hover:opacity-90 transition-all"
            >
              My Orders
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}