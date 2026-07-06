"use client";

import { useEffect } from "react";

import SectionContainer from "@/components/ui/SectionContainer/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

import CategoryCard from "./CategoryCard";
import CategorySkeleton from "./CategorySkeleton";

import {
  useCategoryStore,
} from "@/store/category-store";

export default function ExploreCrafts() {
  const {
    categories,
    loading,
    fetchCategories,
  } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <SectionContainer>

      <SectionHeading
        badge="EXPLORE CRAFTS"
        title="India's Finest Handmade Categories"
        description="Discover authentic crafts created by skilled artisans across every region of India."
      />

      <div
        className="
        mt-14

        grid

        grid-cols-1

        sm:grid-cols-2

        lg:grid-cols-3

        xl:grid-cols-4

        gap-8
        "
      >
        {loading &&
          Array.from({
            length: 8,
          }).map((_, index) => (
            <CategorySkeleton
              key={index}
            />
          ))}

        {!loading &&
          categories.map(
            (category) => (
              <CategoryCard
                key={category._id}
                category={category}
              />
            )
          )}
      </div>

    </SectionContainer>
  );
}