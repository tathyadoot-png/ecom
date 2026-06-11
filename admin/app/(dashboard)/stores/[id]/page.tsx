"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import Image from "next/image";

import {
  getStoreById,
} from "@/services/store.service";

export default function StoreDetailsPage() {
  const params =
    useParams();

  const [store, setStore] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchStore =
      async () => {
        try {
          const res =
            await getStoreById(
              params.id as string
            );

          setStore(
            res.data
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchStore();
  }, [params.id]);

  if (loading) {
    return (
      <div>
        Loading store...
      </div>
    );
  }

  if (!store) {
    return (
      <div>
        Store not found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Store Details
        </h1>

        <p className="text-zinc-500 mt-2">
          Vendor store information
        </p>

      </div>

      {store.banner && (
        <div className="relative h-72 rounded-3xl overflow-hidden border">

          <Image
            src={store.banner}
            alt={store.name}
            fill
            className="object-cover"
          />

        </div>
      )}

      <div className="bg-white border rounded-3xl p-8">

        <div className="flex flex-col md:flex-row gap-6 items-center">

          <div className="relative w-28 h-28 rounded-full overflow-hidden border">

            <Image
              src={
                store.logo ||
                "/placeholder.png"
              }
              alt={store.name}
              fill
              className="object-cover"
            />

          </div>

          <div>

            <h2 className="text-3xl font-bold">
              {store.name}
            </h2>

            <p className="text-zinc-500 mt-1">
              {store.slug}
            </p>

            <div className="mt-4">

              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  store.status ===
                  "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : store.status ===
                      "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {store.status}
              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="bg-white border rounded-3xl p-8">

        <h3 className="text-xl font-bold mb-4">
          Description
        </h3>

        <p className="text-zinc-600">
          {store.description ||
            "No description"}
        </p>

      </div>

      <div className="bg-white border rounded-3xl p-8">

        <h3 className="text-xl font-bold mb-6">
          Owner Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div>

            <p className="text-sm text-zinc-500">
              Name
            </p>

            <p className="font-semibold mt-1">
              {
                store.owner
                  ?.name
              }
            </p>

          </div>

          <div>

            <p className="text-sm text-zinc-500">
              Email
            </p>

            <p className="font-semibold mt-1">
              {
                store.owner
                  ?.email
              }
            </p>

          </div>

          <div>

            <p className="text-sm text-zinc-500">
              Role
            </p>

            <p className="font-semibold mt-1">
              {
                store.owner
                  ?.role
              }
            </p>

          </div>

        </div>

      </div>

      <div className="bg-white border rounded-3xl p-8">

        <h3 className="text-xl font-bold mb-4">
          Store Meta
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>

            <p className="text-sm text-zinc-500">
              Created
            </p>

            <p className="font-medium mt-1">
              {new Date(
                store.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

          <div>

            <p className="text-sm text-zinc-500">
              Updated
            </p>

            <p className="font-medium mt-1">
              {new Date(
                store.updatedAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}