import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;

  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "gold";

  size?:
    | "sm"
    | "md"
    | "lg";

  children: React.ReactNode;
}

const variants = {
  primary:
    "bg-brand text-white hover:opacity-95 shadow-lg",

  secondary:
    "bg-secondary text-brand hover:bg-paper",

  outline:
    "border border-brand/15 bg-white text-brand hover:bg-paper",

  gold:
    "bg-gold text-white hover:opacity-90",
};

const sizes = {
  sm: "h-10 px-5 text-sm",

  md: "h-12 px-7",

  lg: "h-14 px-9 text-lg",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}