"use client";

import { useEffect } from "react";

import Carousel from "@/components/ui/Carousel";
import SectionContainer from "@/components/ui/SectionContainer/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

import ProductCard from "@/components/products/ProductCard";
import FeaturedProductSkeleton from "./ProductSkeleton";

import {
  useProductStore,
} from "@/store/product.store";

export default function FeaturedProducts() {

  const {

    products,

    loading,

    fetchProducts,

  } = useProductStore();
console.log("STORE PRODUCTS =>", products);
  useEffect(() => {

    fetchProducts({

      featured: true,

      limit: 8,

    });

  }, []);


  
  return (

    <SectionContainer>

      <SectionHeading

        badge="FEATURED PRODUCTS"

        title="Handpicked Artisan Treasures"

        description="Discover handcrafted creations curated from talented artisans across India."

      />

      <div className="mt-14">

        {loading ? (

          <div
            className="
            grid

            md:grid-cols-2

            xl:grid-cols-4

            gap-8
            "
          >

            {Array.from({

              length: 4,

            }).map((_, i) => (

              <FeaturedProductSkeleton

                key={i}

              />

            ))}

          </div>

        ) : (

          <Carousel>

            {products.map((product) =>  ( 

                

              <div

                key={product._id}

                className="
                min-w-[86%]

                sm:min-w-[48%]

                lg:min-w-[32%]

                xl:min-w-[24%]
                "

              >

                <ProductCard

                  product={product}

                />

              </div>

            ))}

          </Carousel>

        )}

      </div>

    </SectionContainer>

  );

}