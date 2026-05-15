"use client";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "@/app/lib/gsap";

export default function CameraAnimation() {
  const { camera } = useThree();

  useEffect(() => {
    gsap.to(camera.position, {
      z: 2,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [camera]);

  return null;
}