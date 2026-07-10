"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  SlidersHorizontal,
} from "lucide-react";

import {
  useCategoryStore,
} from "@/store/category-store";

import {
  useEffect,
} from "react";

export default function ProductFilters() {

  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const {

    categories,

    fetchCategories,

  } =
    useCategoryStore();

  useEffect(() => {

    fetchCategories();

  }, []);

  const updateFilter = (
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
      `/products?${params.toString()}`
    );

  };

  return (

    <aside
      className="
      sticky

      top-24

      rounded-[32px]

      border

      border-border

      bg-white

      p-7
      "
    >

      {/* Header */}

      <div
        className="
        flex

        items-center

        gap-3

        pb-5

        border-b
        "
      >

        <SlidersHorizontal
          size={20}
          className="text-brand"
        />

        <h3
          className="
          text-xl

          font-heading

          font-semibold
          "
        >
          Filters
        </h3>

      </div>

      {/* Categories */}

      <div className="mt-8">

        <h4
          className="
          text-sm

          uppercase

          tracking-[0.25em]

          text-zinc-500
          "
        >
          Categories
        </h4>

        <div className="mt-5 space-y-3">

          <button

            onClick={() =>
              updateFilter(
                "category",
                ""
              )
            }

            className="
            w-full

            rounded-full

            border

            px-4

            py-3

            text-left

            transition

            hover:border-brand

            hover:text-brand
            "
          >

            All Categories

          </button>

          {categories.map(
            (category) => (

              <button

                key={category._id}

                onClick={() =>
                  updateFilter(
                    "category",
                    category._id
                  )
                }

                className="
                w-full

                rounded-full

                border

                px-4

                py-3

                text-left

                transition

                hover:border-brand

                hover:text-brand
                "
              >

                {category.name}

              </button>

            )
          )}

        </div>

      </div>

      {/* Featured */}

      <div className="mt-10">

        <h4
          className="
          text-sm

          uppercase

          tracking-[0.25em]

          text-zinc-500
          "
        >
          Special
        </h4>

        <div className="mt-5 space-y-3">

          <button

            onClick={() =>
              updateFilter(
                "featured",
                "true"
              )
            }

            className="
            w-full

            rounded-full

            border

            px-4

            py-3

            text-left

            transition

            hover:border-brand

            hover:text-brand
            "
          >

            Featured Products

          </button>

        </div>

      </div>

    </aside>

  );

}