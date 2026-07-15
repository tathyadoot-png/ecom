"use client";

import Link from "next/link";
import { useEffect } from "react";

import Container from "@/components/ui/Container";

import { useCategoryStore } from "@/store/category.store";

export default function CategoryBar() {
  const {
    categories,
    fetchCategories,
  } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="border-b border-border bg-white">
      <Container>
        <div className="flex h-14 items-center gap-10 overflow-x-auto whitespace-nowrap">
          <Link
            href="/products"
            className="font-semibold text-primary"
          >
            All Products
          </Link>

          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.slug}`}
              className="relative text-[15px] text-muted transition hover:text-primary"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}