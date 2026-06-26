"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Search,
  ShoppingBag,
  User,
  Package,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { toast } from "sonner";

import { logoutUser } from "@/services/auth.service";

import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export default function HeaderActions() {
  const {
    user,
    loading,
    hydrated,
    logout,
  } = useAuthStore();

  const {
    totalItems,
    fetchCart,
    clearItems,
  } = useCartStore();

  const { products } =
    useWishlistStore();

  const [open, setOpen] =
    useState(false);

  const ref =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  useEffect(() => {
    const click = (
      e: MouseEvent
    ) => {
      if (
        ref.current &&
        !ref.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      click
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        click
      );
  }, []);

  const handleLogout =
    async () => {
      try {
        await logoutUser();

        await clearItems();

        logout();

        toast.success(
          "Logged Out"
        );

        window.location.href =
          "/";
      } catch {
        toast.error(
          "Logout failed"
        );
      }
    };

  if (loading || !hydrated)
    return (
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-zinc-200 animate-pulse"/>

        <div className="w-10 h-10 rounded-full bg-zinc-200 animate-pulse"/>

        <div className="w-10 h-10 rounded-full bg-zinc-200 animate-pulse"/>

      </div>
    );

  return (

<div className="flex items-center gap-3">

{/* SEARCH */}

<button
className="
hidden
xl:flex
w-11
h-11
rounded-full
bg-secondary
items-center
justify-center
transition
hover:bg-brand
hover:text-white
"
>

<Search size={19}/>

</button>

{/* WISHLIST */}

<Link
href="/wishlist"
className="
relative
w-11
h-11
rounded-full
bg-secondary
flex
items-center
justify-center
transition
hover:bg-brand
hover:text-white
"
>

<Heart size={19}/>

{products.length>0 && (

<span
className="
absolute
-top-1
-right-1
w-5
h-5
rounded-full
bg-marigold
text-brand
text-[10px]
font-bold
flex
items-center
justify-center
"
>

{products.length}

</span>

)}

</Link>

{/* CART */}

<Link
href="/cart"
className="
relative
w-11
h-11
rounded-full
bg-brand
text-white
flex
items-center
justify-center
"
>

<ShoppingBag size={18}/>

{totalItems()>0 && (

<span
className="
absolute
-top-1
-right-1
w-5
h-5
rounded-full
bg-marigold
text-brand
text-[10px]
font-bold
flex
items-center
justify-center
"
>

{totalItems()}

</span>

)}

</Link>
      {/* GUEST */}

      {!user && (
        <>
          <Link
            href="/login"
            className="
              hidden
              md:flex
              h-11
              px-5
              rounded-full
              border
              border-brand/10
              items-center
              font-medium
              transition
              hover:bg-secondary
            "
          >
            Login
          </Link>

          <Link
            href="/register"
            className="
              hidden
              md:flex
              h-11
              px-6
              rounded-full
              bg-brand
              text-white
              items-center
              font-medium
              transition
              hover:opacity-90
            "
          >
            Register
          </Link>
        </>
      )}

      {/* USER */}

      {user && (
        <div
          ref={ref}
          className="relative"
        >
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="
              flex
              items-center
              gap-3
              rounded-full
              border
              border-brand/10
              bg-white
              px-2
              py-1
              hover:shadow-md
              transition
            "
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary">

              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={18} />
                </div>
              )}
            </div>

            <div className="hidden lg:block text-left">

              <p className="text-sm font-semibold">
                {user.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {user.email}
              </p>

            </div>

            <ChevronDown
              size={18}
            />
          </button>

          <AnimatePresence>

            {open && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                transition={{
                  duration: .2,
                }}
                className="
                  absolute
                  right-0
                  mt-4
                  w-64
                  rounded-3xl
                  bg-white
                  shadow-2xl
                  border
                  overflow-hidden
                  z-50
                "
              >
                <Link
                  href="/profile"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    px-6
                    py-4
                    hover:bg-secondary
                  "
                >
                  <User size={18} />
                  My Profile
                </Link>

                <Link
                  href="/orders"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    px-6
                    py-4
                    hover:bg-secondary
                  "
                >
                  <Package size={18} />
                  My Orders
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    px-6
                    py-4
                    hover:bg-secondary
                  "
                >
                  <Heart size={18} />
                  Wishlist
                </Link>

                <button
                  onClick={
                    handleLogout
                  }
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-6
                    py-4
                    text-red-600
                    hover:bg-red-50
                  "
                >
                  <LogOut
                    size={18}
                  />

                  Logout
                </button>

              </motion.div>
            )}

          </AnimatePresence>

        </div>
      )}

    </div>

  );
}