"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import img1 from "@/public/hero/mg1.png";
import img2 from "@/public/hero/mg2.png";
import img3 from "@/public/hero/mg3.png";
import img4 from "@/public/hero/mg4.png";

const cards = [
  {
    title: "Madhubani Art",
    subtitle: "Hand painted heritage",
    color: "bg-[#F6E7C7]",
    image: img1,
    text: "text-[#5C2D0A]",
  },
  {
    title: "Handloom",
    subtitle: "Crafted with tradition",
    color: "bg-[#0E5C4A]",
    image: img2,
    text: "text-white",
  },
  {
    title: "Wood Craft",
    subtitle: "Timeless carvings",
    color: "bg-[#D28D1F]",
    image: img3,
    text: "text-[#3B2308]",
  },
  {
    title: "Miniature Art",
    subtitle: "Royal Indian paintings",
    color: "bg-[#A84228]",
    image: img4,
    text: "text-white",
  },
];

export default function HeroFloatingCards() {
  return (
    <div className="absolute right-2 top-24 hidden xl:flex flex-col gap-5 z-30">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: index * 0.15,
            duration: 0.6,
          }}
          whileHover={{
            x: 12,
            scale: 1.04,
            rotate: 0,
          }}
          className={`
            ${card.color}
            ${card.text}
           
            w-[340px]
            rounded-[28px]
            border border-white/20
            shadow-[0_18px_40px_rgba(0,0,0,.22)]
            backdrop-blur-md
            p-4
            transition-all
          `}
        >
          <div className="flex items-start gap-5">
            <div className="relative h-28 w-28 shrink-0">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex-1">
              <h3 className="heading-card">
                {card.title}
              </h3>

              <p className="mt-2 body-small opacity-90 leading-6">
                {card.subtitle}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}