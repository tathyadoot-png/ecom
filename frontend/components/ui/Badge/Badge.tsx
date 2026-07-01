import { cn } from "@/lib/utils";

interface Props {

  children: React.ReactNode;

  variant?:

    | "gold"

    | "brand"

    | "green"

    | "outline";

}

const variants = {

  gold:
    "bg-marigold text-white",

  brand:
    "bg-brand text-white",

  green:
    "bg-emerald-600 text-white",

  outline:
    "border border-brand/20 text-brand bg-paper",

};

export default function Badge({

  children,

  variant = "gold",

}: Props) {

  return (

    <span

      className={cn(

        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",

        variants[variant]

      )}

    >

      {children}

    </span>

  );

}