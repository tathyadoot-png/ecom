"use client";

import { useEffect } from "react";

import SectionContainer from "@/components/ui/SectionContainer/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

import CategoryCard from "./CategoryCard/CategoryCard";

import {
  useCategoryStore,
} from "@/store/category-store";

export default function CategoryGrid() {

  const {

    categories,

    loading,

    fetchCategories,

  } = useCategoryStore();
console.log("Categories =>", categories);
  useEffect(() => {

    fetchCategories();

  }, []);
console.log("Loading =>", loading);
console.log("Total Categories =>", categories.length);
  return (

    <SectionContainer>

      <SectionHeading

        badge="EXPLORE CRAFTS"

        title="Discover India's Finest Craft Traditions"

        description="Browse handcrafted collections from talented artisans across every region of India."

      />

      <div className="mt-14">

        {loading ? (

          <div
            className="
            grid

            grid-cols-2

            lg:grid-cols-4

            gap-6
            "
          >

            {Array.from({

              length: 8,

            }).map((_, index) => (

              <div

                key={index}

                className="
                aspect-[4/5]

                rounded-[28px]

                animate-pulse

                bg-secondary
                "

              />

            ))}

          </div>

        ) : (

          <div
            className="
            grid

            grid-cols-2

            lg:grid-cols-4

            gap-6
            "
          >

            {categories.map((category) => (

              <CategoryCard

                key={category._id}

                category={category}

              />

            ))}

          </div>

        )}

      </div>

    </SectionContainer>

  );

}