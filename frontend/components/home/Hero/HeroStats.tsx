"use client";

const stats = [
  {
    value: "12K+",
    label: "Artisans",
  },
  {
    value: "60K+",
    label: "Products",
  },
  {
    value: "900+",
    label: "Villages",
  },
];

export default function HeroStats() {
  return (
    <div className="flex gap-10 mt-14 flex-wrap">

      {stats.map((item) => (
        <div key={item.label}>

          <h2
            className="
            text-4xl
            font-bold
            text-brand
          "
          >
            {item.value}
          </h2>

          <p
            className="
            text-brand/60
            mt-1
          "
          >
            {item.label}
          </p>

        </div>
      ))}

    </div>
  );
}