"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Package,
  ShoppingCart,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";

import { toast } from "sonner";

import {
  getVendorDashboardStats,
} from "@/services/store.service";

export default function VendorDashboardPage() {
  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState<any>(null);

  const fetchDashboard =
    async () => {
      try {
        const res =
          await getVendorDashboardStats();

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

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div>
        Loading dashboard...
      </div>
    );
  }


  if (!stats) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white border rounded-3xl p-8 text-center max-w-md">

        <h2 className="text-2xl font-bold">
          No Store Found
        </h2>

        <p className="text-zinc-500 mt-3">
          Create your store first to access vendor dashboard.
        </p>

      </div>
    </div>
  );
}



  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Vendor Dashboard
        </h1>

        <p className="text-zinc-500 mt-2">
          Manage your store
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white border rounded-3xl p-6">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-zinc-500 text-sm">
                Products
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {stats.totalProducts}
              </h2>
            </div>

            <Package />
          </div>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-zinc-500 text-sm">
                Orders
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {stats.totalOrders}
              </h2>
            </div>

            <ShoppingCart />
          </div>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-zinc-500 text-sm">
                Pending Orders
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {stats.pendingOrders}
              </h2>
            </div>

            <ShoppingCart />
          </div>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-zinc-500 text-sm">
                Revenue
              </p>

              <h2 className="text-4xl font-bold mt-3">
                ₹{stats.totalRevenue}
              </h2>
            </div>

            <IndianRupee />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <div className="bg-white border rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          <div className="space-y-4">

            {stats.recentOrders?.map(
              (order: any) => (
                <div
                  key={order._id}
                  className="border rounded-2xl p-4 flex justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {order.user?.name}
                    </p>

                    <p className="text-sm text-zinc-500">
                      ₹{order.totalAmount}
                    </p>
                  </div>

                  <span>
                    {order.orderStatus}
                  </span>
                </div>
              )
            )}

          </div>

        </div>

        <div className="bg-white border rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle />
            <h2 className="text-2xl font-bold">
              Low Stock Products
            </h2>
          </div>

          <div className="space-y-4">

            {stats.lowStockProducts?.map(
              (product: any) => (
                <div
                  key={product._id}
                  className="border rounded-2xl p-4 flex justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {product.title}
                    </p>

                    <p className="text-sm text-zinc-500">
                      Stock: {product.stock}
                    </p>
                  </div>

                  <span className="text-red-500">
                    Low
                  </span>
                </div>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}