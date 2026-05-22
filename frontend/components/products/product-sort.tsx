"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function ProductSort() {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const searchParams =
    useSearchParams();

  const sort =
    searchParams.get(
      "sort"
    ) || "";

  const handleChange = (
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

    router.push(
      `${pathname}?${params.toString()}`
    );
  };

  return (
    <select
      value={sort}
      onChange={(e) =>
        handleChange(
          e.target.value
        )
      }
      className="h-12 rounded-2xl border px-4 bg-white"
    >

      <option value="">
        Latest
      </option>

      <option value="price_asc">
        Price Low to High
      </option>

      <option value="price_desc">
        Price High to Low
      </option>

    </select>
  );
}