"use client";

import {
  Truck,
  ShieldCheck,
  Sparkles,
  Headset,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Shipping",
    description:
      "Quick delivery across India with trusted logistics partners.",
  },
  {
    icon: Sparkles,
    title: "Authentic Handmade",
    description:
      "Every product is handcrafted by verified Indian artisans.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "100% secure checkout with trusted payment gateways.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description:
      "Friendly customer support whenever you need assistance.",
  },
];

export default function WhyChoose() {
  return (
    <section className="container-max section-space">

      <div className="text-center max-w-3xl mx-auto">

        <p className="section-badge">
          WHY CHOOSE US
        </p>

        <h2 className="section-title mt-4">
          Crafted With Trust,
          <br />
          Delivered With Care
        </h2>

        <p className="section-description mt-5">
          Every purchase supports skilled artisans while
          bringing authentic handmade creations directly
          to your home.
        </p>

      </div>

      <div
        className="
        mt-16

        grid

        gap-6

        md:grid-cols-2

        xl:grid-cols-4
        "
      >

        {features.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="
              group

              rounded-3xl

              border

              border-border

              bg-white

              p-8

              transition-all

              duration-500

              hover:-translate-y-2

              hover:border-brand/20

              hover:shadow-xl
              "
            >

              <div
                className="
                flex

                h-16

                w-16

                items-center

                justify-center

                rounded-2xl

                bg-brand/10

                text-brand

                transition-all

                duration-500

                group-hover:bg-brand

                group-hover:text-white
                "
              >

                <Icon size={30} />

              </div>

              <h3
                className="
                mt-7

                text-xl

                font-heading

                font-semibold

                text-heading
                "
              >
                {item.title}
              </h3>

              <p
                className="
                mt-3

                leading-7

                text-muted-foreground
                "
              >
                {item.description}
              </p>

            </div>

          );
        })}

      </div>

    </section>
  );
}