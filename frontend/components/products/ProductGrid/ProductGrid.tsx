"use client";

import { useEffect, useState } from "react";

import ProductCard from "../ProductCard";
import ProductSkeleton from "./ProductSkeleton";

import { getProducts } from "@/services/product.service";

import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

import { Product } from "@/types/product.types";

export default function ProductGrid() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProducts();

  }, []);

  async function fetchProducts() {

    try {

      setLoading(true);

      const res =
        await getProducts({

          featured: true,

          limit: 6,

        });

      setProducts(

        res.data.data.products || []

      );

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <section className="section-space">

      <div className="container-max">

        <SectionHeading

          badge="FEATURED COLLECTION"

          title="Handpicked Artisan Treasures"

          description="Discover handcrafted creations carefully selected from talented artisans across India."

        />

        <div className="mt-16">

          {loading ? (

            <div
              className="
              grid
              gap-8
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              "
            >

              {Array.from({

                length: 6,

              }).map((_, index) => (

                <ProductSkeleton

                  key={index}

                />

              ))}

            </div>

          ) : products.length === 0 ? (

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

                No Products Available

              </h2>

              <p
                className="
                mt-4
                text-muted-foreground
                "
              >

                Products will appear here after publishing.

              </p>

            </div>

          ) : (

            <>

              <div
                className="
                grid
                gap-8
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                "
              >

                {products.map((product) => (

                  <ProductCard

                    key={product._id}

                    product={product}

                  />

                ))}

              </div>

            </>

          )}

        </div>

      </div>

    </section>

  );

}