"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllStores,
  updateStoreStatus,
} from "@/services/store.service";

import { toast } from "sonner";
import Link from "next/link";
export default function StoresPage() {
  const [stores, setStores] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchStores =
    async () => {
      try {
        const res =
          await getAllStores();

        setStores(
          res.data || []
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to fetch stores"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleStatusChange =
    async (
      storeId: string,
      status: string
    ) => {
      try {
        await updateStoreStatus(
          storeId,
          status
        );

        toast.success(
          "Store status updated"
        );

        fetchStores();
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to update store"
        );
      }
    };

  if (loading) {
    return (
      <div>
        Loading stores...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Stores
        </h1>

        <p className="text-zinc-500 mt-2">
          Manage vendor stores
        </p>

      </div>

      <div className="bg-white rounded-3xl border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-zinc-100">

              <tr>

                <th className="text-left p-4">
                  Store
                </th>

                <th className="text-left p-4">
                  Owner
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Created
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {stores.length ===
                0 ? (
                <tr>

                  <td
                    colSpan={5}
                    className="text-center py-10 text-zinc-500"
                  >
                    No stores found
                  </td>

                </tr>
              ) : (
                stores.map(
                  (store) => (
                    <tr
                      key={
                        store._id
                      }
                      className="border-t"
                    >

                      <td className="p-4">

                        <div>

                          <Link
                            href={`/stores/${store._id}`}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            {store.name}
                          </Link>

                          <p className="text-sm text-zinc-500">
                            {store.slug}
                          </p>

                        </div>

                      </td>

                      <td className="p-4">

                        {
                          store.owner
                            ?.name
                        }

                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${store.status ===
                              "APPROVED"
                              ? "bg-green-100 text-green-600"
                              : store.status ===
                                "PENDING"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-red-100 text-red-600"
                            }`}
                        >
                          {
                            store.status
                          }
                        </span>

                      </td>

                      <td className="p-4 text-sm text-zinc-500">

                        {new Date(
                          store.createdAt
                        ).toLocaleDateString()}

                      </td>

                      <td className="p-4">

                        <select
                          value={
                            store.status
                          }
                          onChange={(
                            e
                          ) =>
                            handleStatusChange(
                              store._id,
                              e.target
                                .value
                            )
                          }
                          className="border rounded-xl px-3 py-2"
                        >

                          <option value="PENDING">
                            PENDING
                          </option>

                          <option value="APPROVED">
                            APPROVED
                          </option>

                          <option value="REJECTED">
                            REJECTED
                          </option>

                          <option value="SUSPENDED">
                            SUSPENDED
                          </option>

                        </select>

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