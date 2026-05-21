"use client";

import {
  useEffect,
  useState,
} from "react";

import ProductCard from "@/components/products/product-card";

import {
  getCategories,
  getProducts,
} from "@/services/product.service";

import {
  Category,
  Product,
} from "@/types/product.types";

export default function ProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const fetchProducts =
    async () => {
      try {
        setLoading(true);

        const res =
          await getProducts({
            search,
            category:
              selectedCategory,
          });

        setProducts(
          res.data.products
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const fetchCategories =
    async () => {
      try {
        const res =
          await getCategories();

        setCategories(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50">
      
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        
        {/* HEADER */}
        
        <div className="space-y-4">
          
          <h1 className="text-4xl font-bold">
            Products
          </h1>

          <p className="text-zinc-500">
            Explore our latest products
          </p>

        </div>

        {/* SEARCH */}

        <div className="flex flex-col md:flex-row gap-4">
          
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="flex-1 h-14 px-5 rounded-2xl border bg-white"
          />

          <button
            onClick={fetchProducts}
            className="h-14 px-8 rounded-2xl bg-black text-white"
          >
            Search
          </button>

        </div>

        {/* CATEGORIES */}

        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          
          <button
            onClick={() =>
              setSelectedCategory(
                ""
              )
            }
            className={`px-5 py-2 rounded-full whitespace-nowrap border ${
              selectedCategory ===
              ""
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            All
          </button>

          {categories.map(
            (category) => (
              <button
                key={
                  category._id
                }
                onClick={() =>
                  setSelectedCategory(
                    category._id
                  )
                }
                className={`px-5 py-2 rounded-full whitespace-nowrap border ${
                  selectedCategory ===
                  category._id
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                {category.name}
              </button>
            )
          )}

        </div>

        {/* PRODUCTS */}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {Array.from({
              length: 8,
            }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border h-[350px] animate-pulse"
              />
            ))}

          </div>
        ) : products.length ===
          0 ? (
          <div className="bg-white border rounded-3xl p-20 text-center">
            
            <h2 className="text-2xl font-semibold">
              No products found
            </h2>

            <p className="text-zinc-500 mt-2">
              Try changing filters
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {products.map(
              (product) => (
                <ProductCard
                  key={
                    product._id
                  }
                  product={
                    product
                  }
                />
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}