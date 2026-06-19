"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import {
  Eye,
} from "lucide-react";
import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import Image from "next/image";

import {
  deleteProduct,
  getAllProductsAdmin,
  getProducts,
  updateProductStatus,
} from "@/services/product.service";

import { Product } from "@/types/product.types";




export default function ProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);
  const [statusFilter,
    setStatusFilter] =
    useState("");

  const fetchProducts =
    async () => {
      try {
        const res =
          await getAllProductsAdmin();

        setProducts(
          res.data || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete =
    async (id: string) => {
      const confirmDelete =
        confirm(
          "Delete this product?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteProduct(id);

        setProducts((prev) =>
          prev.filter(
            (product) =>
              product._id !== id
          )
        );
      } catch (error) {
        console.log(error);

        alert(
          "Failed to delete product"
        );
      }
    };

  if (loading) {
    return (
      <div>
        Loading products...
      </div>
    );
  }


  const handleStatus =
    async (
      id: string,
      status: string
    ) => {

      try {

        await updateProductStatus(
          id,
          status
        );

        fetchProducts();

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-zinc-500 mt-1">
            Manage your products
          </p>

        </div>

        <Link
          href="/products/create"
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl"
        >
          <Plus size={18} />

          Add Product
        </Link>

      </div>

      <div className="flex gap-4 mb-6">

        <select
          value={
            statusFilter
          }
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="border rounded-xl px-4 py-2"
        >

          <option value="">
            All Status
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="approved">
            Approved
          </option>

          <option value="rejected">
            Rejected
          </option>

          <option value="published">
            Published
          </option>

        </select>

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
                  Store
                </th>

                <th className="text-left p-4">
                  Vendor
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
                products
                  .filter(
                    (product) =>
                      !statusFilter ||
                      product.status ===
                      statusFilter
                  )
                  .map(
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

                          <div>

                            <p className="font-medium">
                              {
                                product.storeId?.name
                              }
                            </p>

                          </div>

                        </td>

                        <td className="p-4">

                          <div>

                            <p className="font-medium">
                              {
                                product.storeId?.owner
                                  ?.name
                              }
                            </p>

                            <p className="text-xs text-zinc-500">
                              {
                                product.storeId?.owner
                                  ?.email
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

                          <div className="flex flex-col gap-2">

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${product.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : product.status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                              {product.status}
                            </span>

                            {product.status ===
                              "pending" && (
                                <div className="flex gap-2">

                                  <button
                                    onClick={() =>
                                      handleStatus(
                                        product._id,
                                        "approved"
                                      )
                                    }
                                    className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs"
                                  >
                                    Approve
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleStatus(
                                        product._id,
                                        "rejected"
                                      )
                                    }
                                    className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs"
                                  >
                                    Reject
                                  </button>

                                </div>
                              )}

                          </div>

                        </td>

                        <td className="p-4">

                          <div className="flex items-center gap-3">

                            <Link
                              href={`/products/${product._id}`}
                              className="p-2 rounded-lg border hover:bg-zinc-100"
                            >
                              <Eye size={18} />
                            </Link>

                            <Link
                              href={`/products/edit/${product._id}`}
                              className="p-2 rounded-lg border hover:bg-zinc-100"
                            >
                              <Pencil size={18} />
                            </Link>

                            <button
                              onClick={() =>
                                handleDelete(
                                  product._id
                                )
                              }
                              className="p-2 rounded-lg border text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={18} />
                            </button>

                          </div>

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