"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {
  direction: "left" | "right";

  onClick: () => void;
}

export default function CarouselButton({

  direction,

  onClick,

}: Props) {

  const Icon =
    direction === "left"
      ? ChevronLeft
      : ChevronRight;

  return (

    <button

      onClick={onClick}

      className="
      h-12
      w-12

      rounded-full

      bg-white

      border

      border-border

      shadow-md

      flex

      items-center

      justify-center

      transition

      hover:bg-brand

      hover:text-white
      "

    >

      <Icon size={22} />

    </button>

  );

}