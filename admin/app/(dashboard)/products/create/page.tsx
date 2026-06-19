"use client";

import {
  useEffect,
  useState,
} from "react";

import ProductForm from "@/components/products/product-form";

import {
  getMyStore,
} from "@/services/store.service";

export default function CreateProductPage() {

  const [loading, setLoading] =
    useState(true);

  const [store, setStore] =
    useState<any>(null);

  useEffect(() => {

    const fetchStore =
      async () => {

        try {

          const res =
            await getMyStore();

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

  }, []);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (
    !store ||
    store.status !==
      "APPROVED"
  ) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-yellow-700">
          Store Approval Required
        </h1>

        <p className="mt-3 text-yellow-600">
          Your store is currently under review.
          Products can be added only after admin approval.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Create Product
        </h1>

        <p className="text-zinc-500 mt-2">
          Add a new product
        </p>

      </div>

      <ProductForm />

    </div>
  );
}