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
  getProductById,
} from "@/services/product.service";

export default function ProductDetailsPage() {

  const params =
    useParams();

  const [product, setProduct] =
    useState<any>(null);

  useEffect(() => {

    const fetchProduct =
      async () => {

        const res =
          await getProductById(
            params.id as string
          );

        setProduct(
          res.data
        );
      };

    fetchProduct();

  }, []);

  if (!product) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Product Details
      </h1>

      <div className="bg-white border rounded-3xl p-8">

        <Image
          src={
            product.images?.[0]
          }
          alt={product.title}
          width={300}
          height={300}
          className="rounded-xl"
        />

        <h2 className="text-2xl font-bold mt-6">
          {product.title}
        </h2>

        <p className="mt-3">
          {
            product.description
          }
        </p>

        <div className="mt-6 space-y-2">

          <p>
            <strong>
              Store:
            </strong>{" "}
            {
              product.storeId?.name
            }
          </p>

          <p>
            <strong>
              Vendor:
            </strong>{" "}
            {
              product.storeId?.owner
                ?.name
            }
          </p>

          <p>
            <strong>
              Email:
            </strong>{" "}
            {
              product.storeId?.owner
                ?.email
            }
          </p>

          <p>
            <strong>
              Status:
            </strong>{" "}
            {
              product.status
            }
          </p>

          <p>
            <strong>
              Price:
            </strong>{" "}
            ₹{product.price}
          </p>

          <p>
            <strong>
              Stock:
            </strong>{" "}
            {product.stock}
          </p>

        </div>

      </div>

    </div>
  );
}