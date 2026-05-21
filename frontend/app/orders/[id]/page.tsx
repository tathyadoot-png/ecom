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

import { toast } from "sonner";

import { getSingleOrder } from "@/services/order.service";

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

        setOrder(res.data);
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
        
        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          
          <div>
            
            <h1 className="text-4xl font-bold">
              Order Details
            </h1>

            <p className="text-zinc-500 mt-2">
              Order ID:{" "}
              {order._id}
            </p>

          </div>

          <div>
            
            <span className="px-5 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
              {
                order.orderStatus
              }
            </span>

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT */}

          <div className="lg:col-span-2 space-y-8">
            
            {/* PRODUCTS */}

            <div className="bg-white border rounded-3xl p-8">
              
              <h2 className="text-2xl font-bold mb-8">
                Ordered Products
              </h2>

              <div className="space-y-6">
                
                {order.items.map(
                  (item: any) => (
                    <div
                      key={
                        item.product
                      }
                      className="flex gap-5 border-b pb-6"
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
                        
                        <Link
                          href={`/products/${item.slug}`}
                        >
                          
                          <h3 className="text-lg font-semibold hover:underline">
                            {
                              item.title
                            }
                          </h3>

                        </Link>

                        <p className="text-zinc-500 mt-2">
                          Quantity:{" "}
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

              </div>

            </div>

            {/* SHIPPING */}

            <div className="bg-white border rounded-3xl p-8">
              
              <h2 className="text-2xl font-bold mb-6">
                Shipping Address
              </h2>

              <div className="space-y-3 text-zinc-700">
                
                <p>
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
                  ,{" "}
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
              
              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
                  
                  <span className="text-zinc-500">
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
                  
                  <span className="text-zinc-500">
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

            {/* PAYMENT */}

            <div className="bg-white border rounded-3xl p-8">
              
              <h2 className="text-2xl font-bold mb-6">
                Payment
              </h2>

              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
                  
                  <span className="text-zinc-500">
                    Method
                  </span>

                  <span>
                    {
                      order.paymentMethod
                    }
                  </span>

                </div>

                <div className="flex items-center justify-between">
                  
                  <span className="text-zinc-500">
                    Status
                  </span>

                  <span className="font-semibold text-yellow-600">
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