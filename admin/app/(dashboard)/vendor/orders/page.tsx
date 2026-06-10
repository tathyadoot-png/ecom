"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getVendorOrders,
} from "@/services/order.service";

import { toast } from "sonner";

export default function VendorOrdersPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders =
    async () => {
      try {
        const res =
          await getVendorOrders();

        setOrders(
          res.data || []
        );
      } catch (error) {
        console.log(error);

        toast.error(
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
      <div>
        Loading orders...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          My Orders
        </h1>

        <p className="text-zinc-500 mt-2">
          Orders containing your products
        </p>

      </div>

      <div className="bg-white border rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-zinc-100">

              <tr>

                <th className="text-left p-4">
                  Customer
                </th>

                <th className="text-left p-4">
                  Total
                </th>

                <th className="text-left p-4">
                  Payment
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.length ===
              0 ? (
                <tr>

                  <td
                    colSpan={5}
                    className="text-center py-10"
                  >
                    No orders found
                  </td>

                </tr>
              ) : (
                orders.map(
                  (order) => (
                    <tr
                      key={
                        order._id
                      }
                      className="border-t"
                    >

                      <td className="p-4">

                        <div>

                          <p className="font-medium">
                            {
                              order.user
                                ?.name
                            }
                          </p>

                          <p className="text-sm text-zinc-500">
                            {
                              order.user
                                ?.email
                            }
                          </p>

                        </div>

                      </td>

                      <td className="p-4">
                        ₹
                        {
                          order.totalAmount
                        }
                      </td>

                      <td className="p-4">
                        {
                          order.paymentStatus
                        }
                      </td>

                      <td className="p-4">

                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

                          {
                            order.orderStatus
                          }

                        </span>

                      </td>

                      <td className="p-4 text-sm text-zinc-500">

                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}