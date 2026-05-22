"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  getAllOrders,
  updateOrderStatus,
} from "@/services/order.service";

import { toast } from "sonner";

export default function OrdersPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders =
    async () => {
      try {
        const res =
          await getAllOrders();

        setOrders(
          res.data.data || []
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

  const handleStatusChange =
    async (
      orderId: string,
      status: string
    ) => {
      try {
        await updateOrderStatus(
          orderId,
          status
        );

        toast.success(
          "Order updated"
        );

        fetchOrders();
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to update order"
        );
      }
    };

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
          Orders
        </h1>

        <p className="text-zinc-500 mt-2">
          Manage customer orders
        </p>

      </div>

      <div className="bg-white rounded-3xl border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-zinc-100">

              <tr>

                <th className="text-left p-4">
                  Order ID
                </th>

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
                    colSpan={6}
                    className="text-center py-10 text-zinc-500"
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

                        <Link
                          href={`/orders/${order._id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {order._id.slice(
                            0,
                            12
                          )}
                          ...
                        </Link>

                      </td>

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

                      <td className="p-4 font-semibold">
                        ₹
                        {
                          order.totalAmount
                        }
                      </td>

                      <td className="p-4">
                        {
                          order.paymentMethod
                        }
                      </td>

                      <td className="p-4">

                        <select
                          value={
                            order.orderStatus
                          }
                          onChange={(
                            e
                          ) =>
                            handleStatusChange(
                              order._id,
                              e.target
                                .value
                            )
                          }
                          className="border rounded-xl px-3 py-2"
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