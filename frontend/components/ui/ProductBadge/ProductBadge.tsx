import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;

  color?:
    | "gold"
    | "green"
    | "red"
    | "blue";
}

const colors = {
  gold:
    "bg-marigold/15 text-brand",

  green:
    "bg-emerald/10 text-emerald",

  red:
    "bg-red-100 text-red-600",

  blue:
    "bg-brand/10 text-brand",
};

export default function ProductBadge({
  children,
  color = "gold",
}: Props) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium",
        colors[color]
      )}
    >
      {children}
    </span>
  );
}