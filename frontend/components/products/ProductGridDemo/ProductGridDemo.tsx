"use client";

import ProductCardV2 from "../ProductCardV2";

const products = [
  {
    id: "1",
    slug: "blue-pottery",

    image: "/product/product1.png",

    title: "Blue Pottery Vase",

    category: "Pottery",

    artisan: "Rajasthan Studio",

    origin: "Jaipur",

    material: "Ceramic",

    price: 3299,

    salePrice: 2799,

    rating: 4.9,

    reviews: 128,

    handmade: true,

    featured: true,
  },

  {
    id: "2",

    slug: "handloom",

    image: "/product/product2.png",

    title: "Handloom Cotton Saree",

    category: "Textiles",

    artisan: "Kutch Weavers",

    origin: "Gujarat",

    material: "Cotton",

    price: 4299,

    rating: 4.8,

    reviews: 94,

    handmade: true,
  },

  {
    id: "3",

    slug: "painting",

    image: "/product/product3.png",

    title: "Madhubani Painting",

    category: "Art",

    artisan: "Mithila Artist",

    origin: "Bihar",

    material: "Canvas",

    price: 5999,

    rating: 5,

    reviews: 42,

    featured: true,
  },

  {
    id: "4",

    slug: "wood",

    image: "/product/product4.png",

    title: "Wood Elephant",

    category: "Wood Craft",

    artisan: "Jaipur Craft",

    origin: "Rajasthan",

    material: "Sheesham",

    price: 2399,

    rating: 4.7,

    reviews: 83,
  },

  {
    id: "5",

    slug: "lamp",

    image: "/product/product5.png",

    title: "Brass Temple Lamp",

    category: "Metal",

    artisan: "Kumbakonam",

    origin: "Tamil Nadu",

    material: "Brass",

    price: 4999,

    rating: 4.9,

    reviews: 210,
  },

  {
    id: "6",

    slug: "miniature",

    image: "/product/product6.png",

    title: "Miniature Painting",

    category: "Painting",

    artisan: "Royal Studio",

    origin: "Udaipur",

    material: "Paper",

    price: 3899,

    rating: 4.8,

    reviews: 66,
  },
];

export default function ProductGridDemo() {
  return (
    <section className="container-max section-space">

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {products.map((product) => (

          <ProductCardV2
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>
  );
}