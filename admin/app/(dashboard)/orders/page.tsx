"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  getOrders,
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
          await getOrders();

        setOrders(
          res.data
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
      id: string,
      status: string
    ) => {
      try {
        await updateOrderStatus(
          id,
          status
        );

        toast.success(
          "Order updated"
        );

        fetchOrders();
      } catch (error) {
        console.log(error);

        toast.error(
          "Update failed"
        );
      }
    };

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div>
        
        <h1 className="text-3xl font-bold">
          Orders
        </h1>

        <p className="text-zinc-500 mt-1">
          Manage all orders
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
                  Products
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

              </tr>
            </thead>

            <tbody>
              
              {orders.map(
                (order) => (
                  <tr
                    key={
                      order._id
                    }
                    className="border-t"
                  >
                    
                    <td className="p-4">
                      
                      <div>
                        
                        <h3 className="font-semibold">
                          {
                            order.user
                              ?.name
                          }
                        </h3>

                        <p className="text-sm text-zinc-500">
                          {
                            order.user
                              ?.email
                          }
                        </p>

                      </div>

                    </td>

                    <td className="p-4">
                      
                      <div className="flex items-center gap-2">
                        
                        {order.items
                          ?.slice(
                            0,
                            3
                          )
                          .map(
                            (
                              item: any,
                              index: number
                            ) => (
                              <div
                                key={
                                  index
                                }
                                className="relative w-14 h-14 rounded-xl overflow-hidden border"
                              >
                                
                                <Image
                                  src={
                                    item
                                      .product
                                      ?.images?.[0]
                                  }
                                  alt="Product"
                                  fill
                                  className="object-cover"
                                />

                              </div>
                            )
                          )}

                      </div>

                    </td>

                    <td className="p-4 font-semibold">
                      ₹
                      {
                        order.totalPrice
                      }
                    </td>

                    <td className="p-4">
                      
                      <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">
                        
                        {
                          order.paymentMethod
                        }

                      </span>

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
                          Pending
                        </option>

                        <option value="PROCESSING">
                          Processing
                        </option>

                        <option value="SHIPPED">
                          Shipped
                        </option>

                        <option value="DELIVERED">
                          Delivered
                        </option>

                        <option value="CANCELLED">
                          Cancelled
                        </option>

                      </select>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}