import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps
  extends HTMLAttributes<HTMLDivElement> {

  variant?:
    | "default"
    | "outlined"
    | "glass"
    | "luxury";

  padding?:
    | "none"
    | "sm"
    | "md"
    | "lg";
}

const variants = {

  default:
    "bg-paper border border-border shadow-card",

  outlined:
    "bg-paper border border-border",

  glass:
    "bg-white/60 backdrop-blur-xl border border-white/30",

  luxury:
    "bg-paper border border-brand/10 shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-500",

};

const paddings = {

  none: "",

  sm: "p-4",

  md: "p-6",

  lg: "p-8",

};

export default function Card({

  children,

  variant = "default",

  padding = "md",

  className,

  ...props

}: CardProps) {

  return (

    <div

      className={cn(

        "rounded-3xl overflow-hidden",

        variants[variant],

        paddings[padding],

        className

      )}

      {...props}

    >

      {children}

    </div>

  );

}