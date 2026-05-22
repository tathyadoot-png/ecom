"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  getCategories,
} from "@/services/product.service";

export default function ProductFilters() {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const searchParams =
    useSearchParams();

  const [categories, setCategories] =
    useState<any[]>([]);

  const selectedCategory =
    searchParams.get(
      "category"
    ) || "";

  const featured =
    searchParams.get(
      "featured"
    ) || "";

  const minPrice =
    searchParams.get(
      "minPrice"
    ) || "";

  const maxPrice =
    searchParams.get(
      "maxPrice"
    ) || "";

  useEffect(() => {
    const fetchCategories =
      async () => {
        try {
          const res =
            await getCategories();

          setCategories(
            res.data.data ||
              []
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchCategories();
  }, []);

  const updateQuery =
    (
      key: string,
      value: string
    ) => {
      const params =
        new URLSearchParams(
          searchParams.toString()
        );

      if (value) {
        params.set(
          key,
          value
        );
      } else {
        params.delete(key);
      }

      params.set(
        "page",
        "1"
      );

      router.push(
        `${pathname}?${params.toString()}`
      );
    };

  return (
    <div className="bg-white border rounded-3xl p-6 space-y-8">

      {/* CATEGORY */}

      <div>

        <h2 className="text-lg font-bold mb-4">
          Categories
        </h2>

        <div className="space-y-3">

          <button
            onClick={() =>
              updateQuery(
                "category",
                ""
              )
            }
            className={`block text-left w-full ${
              !selectedCategory
                ? "font-bold text-black"
                : "text-zinc-500"
            }`}
          >
            All Categories
          </button>

          {categories.map(
            (category) => (
              <button
                key={
                  category._id
                }
                onClick={() =>
                  updateQuery(
                    "category",
                    category._id
                  )
                }
                className={`block text-left w-full ${
                  selectedCategory ===
                  category._id
                    ? "font-bold text-black"
                    : "text-zinc-500"
                }`}
              >
                {
                  category.name
                }
              </button>
            )
          )}

        </div>

      </div>

      {/* PRICE */}

      <div>

        <h2 className="text-lg font-bold mb-4">
          Price Range
        </h2>

        <div className="space-y-4">

          <input
            type="number"
            placeholder="Min Price"
            defaultValue={
              minPrice
            }
            onBlur={(e) =>
              updateQuery(
                "minPrice",
                e.target.value
              )
            }
            className="w-full h-11 rounded-2xl border px-4"
          />

          <input
            type="number"
            placeholder="Max Price"
            defaultValue={
              maxPrice
            }
            onBlur={(e) =>
              updateQuery(
                "maxPrice",
                e.target.value
              )
            }
            className="w-full h-11 rounded-2xl border px-4"
          />

        </div>

      </div>

      {/* FEATURED */}

      <div>

        <h2 className="text-lg font-bold mb-4">
          Special
        </h2>

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="checkbox"
            checked={
              featured ===
              "true"
            }
            onChange={(e) =>
              updateQuery(
                "featured",
                e.target.checked
                  ? "true"
                  : ""
              )
            }
          />

          Featured Products

        </label>

      </div>

    </div>
  );
}