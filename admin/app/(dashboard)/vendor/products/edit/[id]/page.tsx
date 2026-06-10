"use client";

import {
  useEffect,
  useState,
} from "react";

import { useParams }
  from "next/navigation";

import ProductForm
  from "@/components/products/product-form";

import {
  getProductById,
} from "@/services/product.service";

export default function VendorEditProductPage() {

  const params =
    useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          const res =
            await getProductById(
              params.id as string
            );

          setProduct(
            res.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchProduct();

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Product
        </h1>

        <p className="text-zinc-500 mt-1">
          Update product details
        </p>

      </div>

      <ProductForm
        mode="edit"
        initialData={product}
      />

    </div>
  );
}