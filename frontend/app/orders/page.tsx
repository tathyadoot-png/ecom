"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Image from "next/image";

import { toast } from "sonner";

import { getMyOrders } from "@/services/order.service";

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

        setOrders(res.data);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
        
        <div className="bg-white border rounded-3xl p-10 text-center max-w-lg w-full">
          
          <h1 className="text-4xl font-bold">
            No Orders Yet
          </h1>

          <p className="text-zinc-500 mt-4">
            Start shopping to place your first order.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex h-14 px-8 rounded-2xl bg-black text-white items-center justify-center font-semibold"
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
        
        <div className="mb-10">
          
          <h1 className="text-4xl font-bold">
            My Orders
          </h1>

          <p className="text-zinc-500 mt-2">
            Track and manage your orders
          </p>

        </div>

        <div className="space-y-8">
          
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-3xl p-8"
            >
              
              {/* HEADER */}

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                
                <div>
                  
                  <h2 className="text-xl font-bold">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div className="flex flex-wrap items-center gap-4">
                  
                  <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm">
                    {
                      order.orderStatus
                    }
                  </span>

                  <span className="text-xl font-bold">
                    ₹
                    {
                      order.totalAmount
                    }
                  </span>

                </div>

              </div>

              {/* ITEMS */}

              <div className="space-y-5">
                
                {order.items.map(
                  (item: any) => (
                    <div
                      key={item.product}
                      className="flex gap-5"
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

                      <div className="flex-1">
                        
                        <h3 className="font-semibold">
                          {
                            item.title
                          }
                        </h3>

                        <p className="text-sm text-zinc-500 mt-1">
                          Qty:{" "}
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

              {/* FOOTER */}

              <div className="mt-8 flex justify-end">
                
                <Link
                  href={`/orders/${order._id}`}
                  className="h-12 px-6 rounded-2xl bg-black text-white flex items-center justify-center font-semibold"
                >
                  View Details
                </Link>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}