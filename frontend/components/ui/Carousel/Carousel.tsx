"use client";

import {
  ReactNode,
  useCallback,
} from "react";

import useEmblaCarousel from "embla-carousel-react";

import CarouselButton from "./CarouselButton";

interface Props {

  children: ReactNode;

  className?: string;

  options?: any;

}

export default function Carousel({

  children,

  className,

  options,

}: Props) {

  const [

    emblaRef,

    emblaApi,

  ] = useEmblaCarousel({

    loop: true,

    align: "start",

    dragFree: true,

    ...options,

  });

  const scrollPrev =
    useCallback(() => {

      emblaApi?.scrollPrev();

    }, [emblaApi]);

  const scrollNext =
    useCallback(() => {

      emblaApi?.scrollNext();

    }, [emblaApi]);

  return (

    <div className="relative">

      {/* Left */}

      <div
        className="
        hidden
        lg:block

        absolute

        left-0

        top-1/2

        -translate-y-1/2

        -translate-x-6

        z-20
        "
      >

        <CarouselButton

          direction="left"

          onClick={scrollPrev}

        />

      </div>

      {/* Right */}

      <div
        className="
        hidden
        lg:block

        absolute

        right-0

        top-1/2

        -translate-y-1/2

        translate-x-6

        z-20
        "
      >

        <CarouselButton

          direction="right"

          onClick={scrollNext}

        />

      </div>

      {/* Viewport */}

      <div

        ref={emblaRef}

        className="overflow-hidden"

      >

        <div

          className={`
          flex
          gap-6
          ${className}
          `}

        >

          {children}

        </div>

      </div>

    </div>

  );

}