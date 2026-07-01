import { Star } from "lucide-react";

interface Props {
  value?: number;
  reviews?: number;
}

export default function Rating({
  value = 4.8,
  reviews = 0,
}: Props) {
  return (
    <div className="flex items-center gap-2">

      <div className="flex items-center gap-1">

        <Star
          size={16}
          className="fill-marigold text-marigold"
        />

        <span className="text-sm font-semibold">
          {value}
        </span>

      </div>

      <span className="text-sm text-muted">
        ({reviews})
      </span>

    </div>
  );
}