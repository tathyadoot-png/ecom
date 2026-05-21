import { create } from "zustand";

import { persist } from "zustand/middleware";

import { Product } from "@/types/product.types";

import { CartItem } from "@/types/cart.types";

interface CartState {
    items: CartItem[];

    addItem: (
        product: Product
    ) => void;

    removeItem: (
        productId: string
    ) => void;

    increaseQuantity: (
        productId: string
    ) => void;

    decreaseQuantity: (
        productId: string
    ) => void;

    clearCart: () => void;

    totalItems: () => number;

    totalPrice: () => number;
}

export const useCartStore =
    create<CartState>()(
        persist(
            (set, get) => ({
                items: [],

                addItem: (
                    product
                ) => {
                    const items =
                        get().items;

                    const existingItem =
                        items.find(
                            (item) =>
                                item.product
                                    ._id ===
                                product._id
                        );

                    if (
                        existingItem
                    ) {
                        set({
                            items:
                                items.map(
                                    (
                                        item
                                    ) =>
                                        item.product
                                            ._id ===
                                            product._id
                                            ? {
                                                ...item,
                                                quantity:
                                                    item.quantity +
                                                    1,
                                            }
                                            : item
                                ),
                        });
                    } else {
                        set({
                            items: [
                                ...items,
                                {
                                    product,
                                    quantity: 1,
                                },
                            ],
                        });
                    }
                },

                removeItem: (
                    productId
                ) => {
                    set({
                        items:
                            get().items.filter(
                                (
                                    item
                                ) =>
                                    item.product
                                        ._id !==
                                    productId
                            ),
                    });
                },

                increaseQuantity:
                    (
                        productId
                    ) => {
                        set({
                            items:
                                get().items.map(
                                    (
                                        item
                                    ) =>
                                        item.product
                                            ._id ===
                                            productId
                                            ? {
                                                ...item,
                                                quantity:
                                                    item.quantity +
                                                    1,
                                            }
                                            : item
                                ),
                        });
                    },

                decreaseQuantity:
                    (
                        productId
                    ) => {
                        const items =
                            get().items;

                        const existingItem =
                            items.find(
                                (
                                    item
                                ) =>
                                    item.product
                                        ._id ===
                                    productId
                            );

                        if (
                            existingItem
                                ?.quantity ===
                            1
                        ) {
                            set({
                                items:
                                    items.filter(
                                        (
                                            item
                                        ) =>
                                            item
                                                .product
                                                ._id !==
                                            productId
                                    ),
                            });
                        } else {
                            set({
                                items:
                                    items.map(
                                        (
                                            item
                                        ) =>
                                            item
                                                .product
                                                ._id ===
                                                productId
                                                ? {
                                                    ...item,
                                                    quantity:
                                                        item.quantity -
                                                        1,
                                                }
                                                : item
                                    ),
                            });
                        }
                    },

                clearCart: () =>
                    set({
                        items: [],
                    }),

                totalItems: () => {
                    return get().items.reduce(
                        (
                            total,
                            item
                        ) =>
                            total +
                            item.quantity,
                        0
                    );
                },

                totalPrice: () => {
                    return get().items.reduce(
                        (
                            total,
                            item
                        ) =>
                            total +
                            (item.product
                                .salePrice ||
                                item.product
                                    .price) *
                            item.quantity,
                        0
                    );
                },
            }),
            {
                name:
                    "commerce-cart",
            }
        )
    );