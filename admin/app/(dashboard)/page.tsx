"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";

import { toast } from "sonner";

import { getDashboardStats } from "@/services/admin.service";
import { useAuthStore } from "@/store/auth-store";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState<any>(null);

  const fetchDashboard =
    async () => {
      try {
        const res =
          await getDashboardStats();

        setStats(res.data);
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    const router =
  useRouter();

const { user } =
  useAuthStore();

useEffect(() => {
  if (!user) return;

  if (
    user.role ===
    "VENDOR"
  ) {
    router.replace(
      "/vendor"
    );
    return;
  }

  if (
    user.role ===
      "ADMIN" ||
    user.role ===
      "SUPER_ADMIN"
  ) {
    fetchDashboard();
  }
}, [user, router]);   



if (
  loading &&
  (
    user?.role ===
      "ADMIN" ||
    user?.role ===
      "SUPER_ADMIN"
  )
) {
  return (
    <div>
      Loading dashboard...
    </div>
  );
}  

  if (!stats) {
  return (
    <div className="p-6">
      Failed to load dashboard
    </div>
  );
}

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-zinc-500 mt-2">
          Welcome to admin panel
        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* PRODUCTS */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Total Products
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                {
                  stats.totalProducts
                }
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Package className="text-blue-600" />
            </div>

          </div>

        </div>

        {/* ORDERS */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Total Orders
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                {
                  stats.totalOrders
                }
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <ShoppingCart className="text-green-600" />
            </div>

          </div>

        </div>

        {/* USERS */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Customers
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                {
                  stats.totalUsers
                }
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Users className="text-purple-600" />
            </div>

          </div>

        </div>

        {/* REVENUE */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Revenue
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                ₹
                {
                  stats.totalRevenue
                }
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <IndianRupee className="text-yellow-600" />
            </div>

          </div>

        </div>

      </div>

      {/* ORDER STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white border rounded-3xl p-6">
          
          <p className="text-zinc-500">
            Pending Orders
          </p>

          <h2 className="text-3xl font-bold mt-3 text-yellow-600">
            {
              stats.pendingOrders
            }
          </h2>

        </div>

        <div className="bg-white border rounded-3xl p-6">
          
          <p className="text-zinc-500">
            Delivered Orders
          </p>

          <h2 className="text-3xl font-bold mt-3 text-green-600">
            {
              stats.deliveredOrders
            }
          </h2>

        </div>

        <div className="bg-white border rounded-3xl p-6">
          
          <p className="text-zinc-500">
            Cancelled Orders
          </p>

          <h2 className="text-3xl font-bold mt-3 text-red-600">
            {
              stats.cancelledOrders
            }
          </h2>

        </div>

      </div>

      {/* RECENT ORDERS + LOW STOCK */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* RECENT ORDERS */}

        <div className="bg-white border rounded-3xl p-6">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold">
              Recent Orders
            </h2>

            <Link
              href="/orders"
              className="text-sm text-blue-600 hover:underline"
            >
              View All
            </Link>

          </div>

          <div className="space-y-4">

            {stats.recentOrders
              ?.length === 0 ? (
              <p className="text-zinc-500">
                No recent orders
              </p>
            ) : (
              stats.recentOrders.map(
                (
                  order: any
                ) => (
                  <div
                    key={
                      order._id
                    }
                    className="border rounded-2xl p-4 flex items-center justify-between"
                  >

                    <div>

                      <p className="font-semibold">
                        {
                          order.user
                            ?.name
                        }
                      </p>

                      <p className="text-sm text-zinc-500 mt-1">
                        ₹
                        {
                          order.totalAmount
                        }
                      </p>

                    </div>

                    <span className="text-sm font-medium">
                      {
                        order.orderStatus
                      }
                    </span>

                  </div>
                )
              )
            )}

          </div>

        </div>

        {/* LOW STOCK */}

        <div className="bg-white border rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <AlertTriangle className="text-red-500" />

            <h2 className="text-2xl font-bold">
              Low Stock Products
            </h2>

          </div>

          <div className="space-y-4">

            {stats.lowStockProducts
              ?.length === 0 ? (
              <p className="text-zinc-500">
                No low stock alerts
              </p>
            ) : (
              stats.lowStockProducts.map(
                (
                  product: any
                ) => (
                  <div
                    key={
                      product._id
                    }
                    className="border rounded-2xl p-4 flex items-center justify-between"
                  >

                    <div>

                      <p className="font-semibold">
                        {
                          product.title
                        }
                      </p>

                      <p className="text-sm text-zinc-500 mt-1">
                        Stock:
                        {" "}
                        {
                          product.stock
                        }
                      </p>

                    </div>

                    <span className="text-red-500 font-semibold">
                      Low
                    </span>

                  </div>
                )
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}