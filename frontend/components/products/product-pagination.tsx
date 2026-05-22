"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface Props {
  page: number;

  totalPages: number;
}

export default function ProductPagination({
  page,
  totalPages,
}: Props) {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const searchParams =
    useSearchParams();

  const goToPage = (
    pageNumber: number
  ) => {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.set(
      "page",
      String(pageNumber)
    );

    router.push(
      `${pathname}?${params.toString()}`
    );
  };

  if (totalPages <= 1)
    return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-12">

      {Array.from({
        length: totalPages,
      }).map((_, index) => {
        const pageNumber =
          index + 1;

        return (
          <button
            key={pageNumber}
            onClick={() =>
              goToPage(
                pageNumber
              )
            }
            className={`w-11 h-11 rounded-2xl border ${
              page ===
              pageNumber
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

    </div>
  );
}