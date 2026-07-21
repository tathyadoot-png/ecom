"use client";

import React, { useEffect, useRef, useState } from "react";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { useCategoryStore } from "@/store/category.store";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";

const CategoryShowcase: React.FC = () => {
  const { categories, isLoading, fetchCategories } = useCategoryStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, categories]);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
    }
    return () => container?.removeEventListener("scroll", checkScroll);
  }, [categories]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.7;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftPos(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftPos - walk;
  };

  if (!isLoading && (!categories || categories.length === 0)) {
    return null;
  }

  const displayCategories = categories
    ? categories.filter((cat) => cat.isActive !== false)
    : [];

  return (
    <section className="py-8 md:py-12 pt-5 bg-[#FAF7F2] text-[#2C221E] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header Section */}
        <div className="flex items-center justify-between mb-6 border-b border-[#E5DCD3] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#F5F0EB] border border-[#E5DCD3]">
              <Leaf className="w-4 h-4 text-[#C8A97E]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal tracking-tight text-[#2C221E]">
                Shop by Categories
              </h2>
              <p className="text-xs sm:text-sm text-[#6B5E54] mt-0.5 font-light">
                Discover treasures handcrafted by generations of Indian artisans.
              </p>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="hidden md:flex items-center gap-2 py-4">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`p-2.5 rounded-full border transition-all duration-300 ${
                canScrollLeft
                  ? "border-[#DCD3C9] bg-white text-[#2C221E] hover:bg-[#2C221E] hover:text-white shadow-sm cursor-pointer"
                  : "border-[#EAE3DA] bg-transparent text-[#C5BBB0] cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`p-2.5 rounded-full border transition-all duration-300 ${
                canScrollRight
                  ? "border-[#DCD3C9] bg-white text-[#2C221E] hover:bg-[#2C221E] hover:text-white shadow-sm cursor-pointer"
                  : "border-[#EAE3DA] bg-transparent text-[#C5BBB0] cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slider Track with Same Gap but Smaller Card Sizes */}
        {isLoading ? (
          <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-hidden py-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-3 w-[175px] shrink-0 animate-pulse">
                <div className="w-40 h-40 rounded-full bg-[#EFECE6] border border-[#E5DCD3]" />
                <div className="h-4 w-24 bg-[#EFECE6] rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className={`flex justify-start gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 px-1 cursor-grab active:cursor-grabbing ${
              isMouseDown ? "scroll-auto" : "scroll-smooth"
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {displayCategories.map((category, index) => (
              <CategoryCard
                key={category._id || index}
                category={category}
                index={index}
              />
            ))}
            <div className="shrink-0 w-4" />
          </div>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export { CategoryShowcase };
export default CategoryShowcase;