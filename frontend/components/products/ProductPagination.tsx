"use client";

import {
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

  const searchParams =
    useSearchParams();

  const changePage = (
    value: number
  ) => {

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.set(
      "page",
      value.toString()
    );

    router.push(
      `/products?${params.toString()}`
    );

  };

  if (
    totalPages <= 1
  ) {

    return null;

  }

  return (

    <div
      className="
      mt-14

      flex

      items-center

      justify-center

      gap-3
      "
    >

      <button

        disabled={page === 1}

        onClick={() =>
          changePage(page - 1)
        }

        className="
        h-11

        rounded-full

        border

        px-6

        transition

        disabled:opacity-40

        hover:border-brand
        "

      >

        Previous

      </button>

      {Array.from({

        length: totalPages,

      }).map((_, index) => {

        const number =
          index + 1;

        return (

          <button

            key={number}

            onClick={() =>
              changePage(number)
            }

            className={`
            h-11
            w-11

            rounded-full

            transition

            ${
              number === page

                ? "bg-brand text-white"

                : "border hover:border-brand"
            }
            `}

          >

            {number}

          </button>

        );

      })}

      <button

        disabled={
          page === totalPages
        }

        onClick={() =>
          changePage(page + 1)
        }

        className="
        h-11

        rounded-full

        border

        px-6

        transition

        disabled:opacity-40

        hover:border-brand
        "

      >

        Next

      </button>

    </div>

  );

}