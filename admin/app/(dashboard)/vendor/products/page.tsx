"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Image from "next/image";

import {
  Plus,
  Pencil,
} from "lucide-react";

import {
  getVendorProducts,
} from "@/services/product.service";

import { toast } from "sonner";

export default function VendorProductsPage() {
  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchProducts =
    async () => {
      try {
        const res =
          await getVendorProducts();

        setProducts(
          res.data || []
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div>
        Loading products...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            My Products
          </h1>

          <p className="text-zinc-500 mt-1">
            Manage your products
          </p>

        </div>

        <Link
          href="/vendor/products/create"
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl"
        >
          <Plus size={18} />
          Add Product
        </Link>

      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-zinc-100">

              <tr>

                <th className="text-left p-4">
                  Image
                </th>

                <th className="text-left p-4">
                  Product
                </th>

                <th className="text-left p-4">
                  Price
                </th>

                <th className="text-left p-4">
                  Stock
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.length ===
              0 ? (
                <tr>

                  <td
                    colSpan={6}
                    className="text-center py-10 text-zinc-500"
                  >
                    No products found
                  </td>

                </tr>
              ) : (
                products.map(
                  (product) => (
                    <tr
                      key={
                        product._id
                      }
                      className="border-t"
                    >

                      <td className="p-4">

                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border">

                          <Image
                            src={
                              product
                                .images?.[0] ||
                              "/placeholder.png"
                            }
                            alt={
                              product.title
                            }
                            fill
                            className="object-cover"
                          />

                        </div>

                      </td>

                      <td className="p-4">

                        <div>

                          <h3 className="font-semibold">
                            {
                              product.title
                            }
                          </h3>

                          <p className="text-sm text-zinc-500">
                            {
                              product.slug
                            }
                          </p>

                        </div>

                      </td>

                      <td className="p-4">
                        ₹
                        {
                          product.price
                        }
                      </td>

                      <td className="p-4">
                        {
                          product.stock
                        }
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.status ===
                            "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {
                            product.status
                          }
                        </span>

                      </td>

                      <td className="p-4">

                        <Link
                          href={`/vendor/products/edit/${product._id}`}
                          className="p-2 rounded-lg border hover:bg-zinc-100 inline-flex"
                        >
                          <Pencil size={18} />
                        </Link>

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