"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Search,
} from "lucide-react";

import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";

import ProductSort from "@/components/products/ProductSort";

import ProductPagination from "@/components/products/ProductPagination";

import {
  getProducts,
} from "@/services/product.service";

import {
  Product,
} from "@/types/product.types";

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
    searchParams.get("search") || "";

  const category =
    searchParams.get("category") || "";

  const featured =
    searchParams.get("featured") || "";

  const sort =
    searchParams.get("sort") || "";

  const page =
    Number(
      searchParams.get("page") || 1
    );

  const minPrice =
    searchParams.get("minPrice") || "";

  const maxPrice =
    searchParams.get("maxPrice") || "";

  const [
    searchInput,
    setSearchInput,
  ] = useState(search);

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

          res.data.data.products || []

        );

        setPagination(

          res.data.data.pagination

        );

      }

      catch (error) {

        console.log(error);

      }

      finally {

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

      }

      else {

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

    <main className="bg-paper min-h-screen">

      <section className="container-max py-14">

        {/* PAGE HEADER */}

        <div className="max-w-3xl">

          <p
            className="
            text-sm

            uppercase

            tracking-[0.28em]

            text-gold

            font-semibold
            "
          >
            EXPLORE COLLECTION
          </p>

          <h1
            className="
            mt-4

            heading-display

            max-w-2xl
            "
          >
            Handmade
            <br />
            Treasures
          </h1>

          <p
            className="
            mt-6

            body-large

            max-w-2xl
            "
          >
            Explore handcrafted products created by talented artisans across India.
            Every purchase directly supports traditional craftsmanship.
          </p>

        </div>

        {/* SEARCH BAR */}

        <div
          className="
          mt-12

          flex

          flex-col

          lg:flex-row

          gap-4
          "
        >

          <div
            className="
            relative

            flex-1
            "
          >

            <Search
              size={20}
              className="
              absolute

              left-5

              top-1/2

              -translate-y-1/2

              text-zinc-400
              "
            />

            <input

              type="text"

              value={searchInput}

              onChange={(e)=>
                setSearchInput(
                  e.target.value
                )
              }

              placeholder="Search handmade products..."

              className="
              h-14

              w-full

              rounded-full

              border

              border-border

              bg-white

              pl-14

              pr-5

              outline-none

              transition

              focus:border-brand

              focus:ring-4

              focus:ring-brand/10
              "

            />

          </div>

          <button

            onClick={handleSearch}

            className="
            h-14

            rounded-full

            bg-brand

            px-8

            text-white

            font-medium

            transition

            hover:bg-brand-light
            "

          >

            Search

          </button>

        </div>

        {/* TOOLBAR */}

        <div
          className="
          mt-12

          flex

          flex-col

          md:flex-row

          md:items-center

          md:justify-between

          gap-5
          "
        >

          <p
            className="
            text-sm

            text-muted-foreground
            "
          >

            Showing

            <span
              className="
              mx-2

              font-semibold

              text-brand
              "
            >
              {products.length}
            </span>

            handcrafted products

          </p>

          <ProductSort />

        </div>

        {/* CONTENT */}

        <div
          className="
          mt-12

          grid

          gap-10

          lg:grid-cols-[280px_1fr]
          "
        >

          {/* SIDEBAR */}

          <aside>

            <ProductFilters />

          </aside>

          {/* PRODUCT GRID */}

          <section>

            {loading ? (

              <div
                className="
                grid

                grid-cols-1

                sm:grid-cols-2

                xl:grid-cols-3

                gap-8
                "
              >

                {Array.from({
                  length: 6,
                }).map((_, index) => (

                  <div

                    key={index}

                    className="
                    h-[430px]

                    rounded-[28px]

                    bg-white

                    animate-pulse

                    border
                    "

                  />

                ))}

              </div>

            ) : (

              <>

                {products.length === 0 ? (

                  <div
                    className="
                    rounded-[32px]

                    border

                    bg-white

                    py-24

                    text-center
                    "
                  >

                    <h2
                      className="
                      text-3xl

                      font-heading

                      font-semibold
                      "
                    >
                      No Products Found
                    </h2>

                    <p
                      className="
                      mt-4

                      text-muted-foreground
                      "
                    >
                      Try changing your filters or search keyword.
                    </p>

                  </div>

                ) : (

                  <div
                    className="
                    grid

                    grid-cols-1

                    sm:grid-cols-2

                    xl:grid-cols-3

                    gap-8
                    "
                  >

                    {products.map((product) => (

                      <ProductCard

                        key={product._id}

                        product={product}

                      />

                    ))}

                  </div>

                )}

                {pagination.totalPages > 1 && (

                  <div className="mt-14">

                    <ProductPagination

                      page={pagination.page}

                      totalPages={pagination.totalPages}

                    />

                  </div>

                )}

              </>

            )}

          </section>

        </div>

      </section>

    </main>

  );

}
          