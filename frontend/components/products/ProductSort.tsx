"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  ArrowDownWideNarrow,
} from "lucide-react";

export default function ProductSort() {

  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const sort =
    searchParams.get("sort") || "";

  const changeSort = (
    value: string
  ) => {

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    if (value) {

      params.set(
        "sort",
        value
      );

    } else {

      params.delete(
        "sort"
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

    <div
      className="
      flex

      items-center

      gap-3
      "
    >

      <ArrowDownWideNarrow
        size={18}
        className="text-brand"
      />

      <select

        value={sort}

        onChange={(e)=>
          changeSort(
            e.target.value
          )
        }

        className="
        h-12

        rounded-full

        border

        border-border

        bg-white

        px-5

        pr-10

        text-sm

        font-medium

        outline-none

        transition

        focus:border-brand

        focus:ring-4

        focus:ring-brand/10
        "

      >

        <option value="">
          Newest
        </option>

        <option value="price_asc">
          Price : Low to High
        </option>

        <option value="price_desc">
          Price : High to Low
        </option>

      </select>

    </div>

  );

}