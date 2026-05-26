"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  getOrderById,
  updateOrderStatus,
} from "@/services/order.service";

import { useParams } from "next/navigation";

import { toast } from "sonner";

export default function OrderDetailsPage() {
  const params =
    useParams();

  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(false);

  const fetchOrder =
    async () => {
      try {
        const res =
          await getOrderById(
            params.id as string
          );

        setOrder(
          res.data.data
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleStatusUpdate =
    async (
      status: string
    ) => {
      try {
        setUpdating(true);

        await updateOrderStatus(
          order._id,
          status
        );

        toast.success(
          "Order updated"
        );

        fetchOrder();
      } catch (error: any) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to update"
        );
      } finally {
        setUpdating(false);
      }
    };

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div>
        Order not found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>
          
          <h1 className="text-3xl font-bold">
            Order Details
          </h1>

          <p className="text-zinc-500 mt-2">
            #{order._id}
          </p>

        </div>

        <select
          value={
            order.orderStatus
          }
          disabled={updating}
          onChange={(e) =>
            handleStatusUpdate(
              e.target.value
            )
          }
          className="h-12 px-4 rounded-2xl border bg-white"
        >
          <option value="PENDING">
            PENDING
          </option>

          <option value="CONFIRMED">
            CONFIRMED
          </option>

          <option value="PROCESSING">
            PROCESSING
          </option>

          <option value="SHIPPED">
            SHIPPED
          </option>

          <option value="DELIVERED">
            DELIVERED
          </option>

          <option value="CANCELLED">
            CANCELLED
          </option>
        </select>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}

        <div className="lg:col-span-2 space-y-8">

          {/* PRODUCTS */}

          <div className="bg-white border rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Ordered Products
            </h2>

            <div className="space-y-5">

              {order.items.map(
                (item: any) => (
                  <div
                    key={
                     item.product._id
                    }
                    className="flex gap-4 border rounded-2xl p-4"
                  >

                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border">

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

                    <div className="flex-1">

                      <h3 className="font-bold text-lg">
                        {
                          item.title
                        }
                      </h3>

                      <p className="text-zinc-500 mt-1">
                        Quantity:{" "}
                        {
                          item.quantity
                        }
                      </p>

                      <p className="font-semibold mt-2">
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

          <div className="bg-white border rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Shipping Address
            </h2>

            <div className="space-y-3 text-zinc-700">

              <p>
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

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-8">

          {/* CUSTOMER */}

          <div className="bg-white border rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Customer
            </h2>

            <div className="space-y-3">

              <p className="font-medium">
                {
                  order.user
                    ?.name
                }
              </p>

              <p className="text-zinc-500">
                {
                  order.user
                    ?.email
                }
              </p>

            </div>

          </div>

          {/* PAYMENT */}

          <div className="bg-white border rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Payment
            </h2>

            <div className="space-y-4">

              <div className="flex items-center justify-between">
                
                <span className="text-zinc-500">
                  Method
                </span>

                <span className="font-medium">
                  {
                    order.paymentMethod
                  }
                </span>

              </div>

              <div className="flex items-center justify-between">
                
                <span className="text-zinc-500">
                  Status
                </span>

                <span className="font-medium">
                  {
                    order.paymentStatus
                  }
                </span>

              </div>

            </div>

          </div>

          {/* TOTALS */}

          <div className="bg-white border rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Totals
            </h2>

            <div className="space-y-4">

              <div className="flex items-center justify-between">
                
                <span>
                  Subtotal
                </span>

                <span>
                  ₹
                  {
                    order.subtotal
                  }
                </span>

              </div>

              <div className="flex items-center justify-between">
                
                <span>
                  Shipping
                </span>

                <span>
                  ₹
                  {
                    order.shippingFee
                  }
                </span>

              </div>

              <div className="border-t pt-4 flex items-center justify-between text-lg font-bold">
                
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

        </div>

      </div>

    </div>
  );
}