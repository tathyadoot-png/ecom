"use client";

import { useEffect, useState } from "react";

import ProductCardV2 from "../ProductCardV2";

import ProductSkeleton from "./ProductSkeleton";

import { getProducts } from "@/services/product.service";

import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

interface Product {
  _id: string;

  slug: string;

  title: string;

  price: number;

  salePrice?: number;

  featured: boolean;

  images: string[];

  category: {
    name: string;
  };

  storeId?: {
    owner?: {
      name: string;
    };
  };
}

export default function ProductGrid() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProducts();

  }, []);

  async function fetchProducts() {

    try {

      const res =
        await getProducts({

          featured: true,

          limit: 6,

        });

      setProducts(
        res.data.data.products
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  }

  return (

<section className="section-space">

<div className="container-max">

<SectionHeading

badge="FEATURED"

title="Featured Creations"

description="Handpicked masterpieces crafted by India's finest artisans."

/>

<div className="mt-16">

{loading ? (

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

{Array.from({

length:6,

}).map((_,i)=>(

<ProductSkeleton
key={i}
/>

))}

</div>

) : products.length===0 ? (

<div
className="
rounded-3xl
border
bg-white
py-24
text-center
"
>

<h3
className="
heading-card
"
>

No Products Found

</h3>

<p
className="
body-normal
mt-4
"
>

Products will appear here once published.

</p>

</div>

) : (

<div
className="
grid
gap-8
md:grid-cols-2
xl:grid-cols-3
"
>

{products.map(

(product)=>(

<ProductCardV2

key={product._id}

product={{

id:product._id,

slug:product.slug,

title:product.title,

image:
product.images?.[0],

category:
product.category?.name,

artisan:
product.storeId?.owner?.name ||
"Artisan",

origin:"",

material:"",

price:
product.price,

salePrice:
product.salePrice,

rating:0,

reviews:0,

featured:
product.featured,

handmade:true,

}}

 />

)

)}

</div>

)}

</div>

</div>

</section>

  );

}