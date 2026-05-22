"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import ProductCard from "@/components/products/product-card";

import ProductFilters from "@/components/products/product-filters";

import ProductSort from "@/components/products/product-sort";

import ProductPagination from "@/components/products/product-pagination";

import {
  getProducts,
} from "@/services/product.service";

import { Product } from "@/types/product.types";

export default function ProductsPage() {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [pagination, setPagination] =
    useState({
      page: 1,

      totalPages: 1,
    });

  const search =
    searchParams.get(
      "search"
    ) || "";

  const category =
    searchParams.get(
      "category"
    ) || "";

  const featured =
    searchParams.get(
      "featured"
    ) || "";

  const sort =
    searchParams.get(
      "sort"
    ) || "";

  const page = Number(
    searchParams.get(
      "page"
    ) || 1
  );

  const minPrice =
    searchParams.get(
      "minPrice"
    ) || "";

  const maxPrice =
    searchParams.get(
      "maxPrice"
    ) || "";

  const [searchInput, setSearchInput] =
    useState(search);

  const fetchProducts =
    async () => {
      try {
        setLoading(true);

        const res =
          await getProducts({
            search,

            category,

            featured,

            sort,

            page,

            minPrice,

            maxPrice,
          });

        setProducts(
          res.data.data
            .products || []
        );

        setPagination(
          res.data.data
            .pagination
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, [
    search,
    category,
    featured,
    sort,
    page,
    minPrice,
    maxPrice,
  ]);

  const handleSearch =
    () => {
      const params =
        new URLSearchParams(
          searchParams.toString()
        );

      if (searchInput) {
        params.set(
          "search",
          searchInput
        );
      } else {
        params.delete(
          "search"
        );
      }

      params.set(
        "page",
        "1"
      );

      router.push(
        `/products?${params.toString()}`
      );
    };

  return (
    <div className="min-h-screen bg-zinc-50">

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Products
            </h1>

            <p className="text-zinc-500 mt-2">
              Discover amazing products
            </p>

          </div>

          <ProductSort />

        </div>

        {/* SEARCH */}

        <div className="flex flex-col md:flex-row gap-4 mb-10">

          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) =>
              setSearchInput(
                e.target.value
              )
            }
            className="flex-1 h-14 px-5 rounded-2xl border bg-white"
          />

          <button
            onClick={
              handleSearch
            }
            className="h-14 px-8 rounded-2xl bg-black text-white"
          >
            Search
          </button>

        </div>

        {/* CONTENT */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* SIDEBAR */}

          <div>

            <ProductFilters />

          </div>

          {/* PRODUCTS */}

          <div className="lg:col-span-3">

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                {Array.from({
                  length: 6,
                }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-3xl border h-[350px] animate-pulse"
                    />
                  )
                )}

              </div>
            ) : (
              <>
                <div className="mb-6 text-sm text-zinc-500">
                  Showing{" "}
                  {
                    products.length
                  }{" "}
                  products
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                  {products.length ===
                  0 ? (
                    <div className="col-span-full bg-white border rounded-3xl p-12 text-center">

                      <h2 className="text-2xl font-bold">
                        No products found
                      </h2>

                      <p className="text-zinc-500 mt-2">
                        Try changing filters
                      </p>

                    </div>
                  ) : (
                    products.map(
                      (
                        product
                      ) => (
                        <ProductCard
                          key={
                            product._id
                          }
                          product={
                            product
                          }
                        />
                      )
                    )
                  )}

                </div>

                <ProductPagination
                  page={
                    pagination.page
                  }
                  totalPages={
                    pagination.totalPages
                  }
                />

              </>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}