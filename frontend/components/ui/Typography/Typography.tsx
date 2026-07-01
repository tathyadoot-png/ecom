import { cn } from "@/lib/utils";
import { ElementType, ReactNode } from "react";

type Variant =
  | "display"
  | "hero"
  | "section"
  | "card"
  | "title"
  | "body-lg"
  | "body"
  | "body-sm"
  | "caption";

interface TypographyProps {
  as?: ElementType;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  display:
    "font-heading text-5xl md:text-7xl xl:text-8xl font-semibold tracking-[-0.04em] leading-[0.92] text-foreground",

  hero:
    "font-heading text-4xl md:text-6xl xl:text-7xl font-semibold tracking-[-0.04em] leading-[0.95] text-foreground",

  section:
    "font-heading text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-foreground",

  card:
    "font-heading text-2xl font-semibold leading-snug text-foreground",

  title:
    "font-heading text-xl font-semibold text-foreground",

  "body-lg":
    "font-sans text-lg leading-8 text-muted-foreground",

  body:
    "font-sans text-base leading-7 text-muted-foreground",

  "body-sm":
    "font-sans text-sm leading-6 text-muted-foreground",

  caption:
    "font-sans text-xs uppercase tracking-[0.25em] text-marigold font-semibold",
};

export default function Typography({
  as,
  variant = "body",
  className,
  children,
}: TypographyProps) {
  const Component = as || "p";

  return (
    <Component
      className={cn(
        variants[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}