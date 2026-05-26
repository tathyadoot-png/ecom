"use client";

import {
    useEffect,
    useState,
} from "react";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";

import { toast } from "sonner";
import { useParams } from "next/navigation";

import {
    getProducts,
    getSingleProduct,
} from "@/services/product.service";

import {
    Product,
} from "@/types/product.types";

import ProductCard from "@/components/products/product-card";

import ReviewSection from "@/components/reviews/review-section";

export default function ProductPage() {

    
const addItem =
  useCartStore(
    (state) =>
      state.addItem
  );



    const params = useParams();

    const [product, setProduct] =
        useState<Product | null>(
            null
        );

    const [relatedProducts, setRelatedProducts] =
        useState<Product[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [selectedImage, setSelectedImage] =
        useState("");

    const [quantity, setQuantity] =
        useState(1);

    useEffect(() => {
        const fetchProduct =
            async () => {
                try {
                    const res =
                        await getSingleProduct(
                            params.slug as string
                        );

                 setProduct(res);

setSelectedImage(
  res.images?.[0]
);

                    // Related Products
                    const related =
                        await getProducts({
                            category:
                                res.data.category
                                    ?._id,
                        });

                    setRelatedProducts(
                        related.data.products.filter(
                            (
                                p: Product
                            ) =>
                                p._id !==
                                res.data._id
                        )
                    );
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchProduct();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Product not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50">

            <div className="max-w-7xl mx-auto px-4 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT */}

                    <div className="space-y-5">

                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border">

                            <Image
                                src={selectedImage}
                                alt={product.title}
                                fill
                                className="object-cover"
                            />

                        </div>

                        <div className="flex gap-4 overflow-x-auto">

                            {product.images?.map(
                                (image) => (
                                    <button
                                        key={image}
                                        onClick={() =>
                                            setSelectedImage(
                                                image
                                            )
                                        }
                                        className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 ${selectedImage ===
                                                image
                                                ? "border-black"
                                                : "border-transparent"
                                            }`}
                                    >

                                        <Image
                                            src={image}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />

                                    </button>
                                )
                            )}

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="space-y-6">

                        <div className="space-y-3">

                            <p className="text-zinc-500">
                                {
                                    product.category
                                        ?.name
                                }
                            </p>

                            <h1 className="text-4xl font-bold">
                                {product.title}
                            </h1>

                        </div>

                        <div className="flex items-center gap-4">

                            <h2 className="text-4xl font-bold">
                                ₹
                                {product.salePrice ||
                                    product.price}
                            </h2>

                            {product.salePrice && (
                                <p className="text-xl line-through text-zinc-400">
                                    ₹
                                    {
                                        product.price
                                    }
                                </p>
                            )}

                        </div>

                        <div>

                            {product.stock > 0 ? (
                                <div className="inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700">
                                    In Stock
                                </div>
                            ) : (
                                <div className="inline-flex px-4 py-2 rounded-full bg-red-100 text-red-700">
                                    Out of Stock
                                </div>
                            )}

                        </div>

                        <p className="text-zinc-600 leading-8">
                            {
                                product.description
                            }
                        </p>

                        {/* QUANTITY */}

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            quantity - 1
                                        )
                                    )
                                }
                                className="w-12 h-12 rounded-xl border bg-white"
                            >
                                -
                            </button>

                            <div className="w-14 text-center font-semibold">
                                {quantity}
                            </div>

                            <button
                                onClick={() =>
                                    setQuantity(
                                        quantity + 1
                                    )
                                }
                                className="w-12 h-12 rounded-xl border bg-white"
                            >
                                +
                            </button>

                        </div>

                        {/* ADD TO CART */}

                       <button
  onClick={() => {
  addItem(product._id)

    toast.success(
      "Added to cart"
    );
  }}
  className="w-full h-14 rounded-2xl bg-black text-white text-lg font-semibold"
>
  Add To Cart
</button>

                    </div>

                </div>


                <ReviewSection
  productId={product._id}
/>

                {/* RELATED PRODUCTS */}

                {relatedProducts.length >
                    0 && (
                        <div className="mt-24 space-y-8">

                            <div>

                                <h2 className="text-3xl font-bold">
                                    Related Products
                                </h2>

                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                                {relatedProducts
                                    .slice(0, 4)
                                    .map(
                                        (
                                            product
                                        ) => (
                                            <ProductCard
                                                key={
                                                    product._id
                                                }
                                                product={
                                                    product
                                                }
                                            />
                                        )
                                    )}

                            </div>

                        </div>
                    )}

            </div>

        </div>
    );
}