"use client";
import { useEffect, useRef } from "react";
import gsap from "@/app/lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-[#001f3e] rounded-full pointer-events-none z-[9999] mix-blend-difference  opacity-70"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}