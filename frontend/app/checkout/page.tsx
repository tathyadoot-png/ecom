"use client";


import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/store/auth-store";

import Link from "next/link";

import {
  useMemo,
  useState,
} from "react";

import Image from "next/image";

import { useCartStore } from "@/store/cart-store";

import { toast } from "sonner";

import { createOrder } from "@/services/order.service";

import {
  createRazorpayOrder,
  verifyPayment,
} from "@/services/payment.service";

import {
  CreditCard,
  Truck,
  ShieldCheck,
} from "lucide-react";

export default function CheckoutPage() {

  const router = useRouter();

  const {
    user,
    loading: authLoading,
  } = useAuthStore();

  const {
    items,
    totalPrice,
    clearCart,
  } = useCartStore();

  const [loading, setLoading] =
    useState(false);

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("RAZORPAY");

  const shipping =
    useMemo(() => {
      return totalPrice() >
        999
        ? 0
        : 99;
    }, [items]);

  const finalTotal =
    totalPrice() + shipping;

  useEffect(() => {
    if (
      !authLoading &&
      !user
    ) {
      toast.error(
        "Please login to continue checkout"
      );

      router.push("/login");
    }
  }, [
    user,
    authLoading,
    router,
  ]);

  const handleCheckout =
    async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        const form =
          e.currentTarget;

        const formData =
          new FormData(form);

        const orderData = {
          items: items.map(
            (item) => ({
              productId:
                item.product
                  ._id,

              quantity:
                item.quantity,
            })
          ),

          shippingAddress: {
            fullName: `${formData.get(
              "firstName"
            )} ${formData.get(
              "lastName"
            )}`,

            phone:
              formData.get(
                "phone"
              ),

            address:
              formData.get(
                "address"
              ),

            city:
              formData.get(
                "city"
              ),

            state:
              formData.get(
                "state"
              ),

            country:
              "India",

            postalCode:
              formData.get(
                "postalCode"
              ),
          },

          paymentMethod,
        };

        const orderRes =
          await createOrder(
            orderData
          );

        const order =
          orderRes.data;


          if (
  paymentMethod ===
  "COD"
) {
  toast.success(
    "Order placed successfully"
  );

  clearCart();

  window.location.href =
    `/order-success?orderId=${order._id}`;

  return;
}




        const razorpayRes =
          await createRazorpayOrder(
            finalTotal
          );

        const razorpayOrder =
          razorpayRes.data;

        const options = {
          key:
            process.env
              .NEXT_PUBLIC_RAZORPAY_KEY_ID,

          amount:
            razorpayOrder.amount,

          currency:
            razorpayOrder.currency,

          name:
            "Commerce Platform",

          description:
            "Order Payment",

          order_id:
            razorpayOrder.id,

          handler:
            async function (
              response: any
            ) {
              try {
                await verifyPayment({
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,

                  orderId:
                    order._id,
                });

                toast.success(
                  "Payment successful"
                );

                clearCart();

                window.location.href =
                  `/order-success?orderId=${order._id}`;
              } catch (error) {
                console.log(error);

                toast.error(
                  "Payment verification failed"
                );
              }
            },

          theme: {
            color: "#000000",
          },
        };

        const razorpay =
          new (
            window as any
          ).Razorpay(options);

        razorpay.open();

      } catch (error: any) {
        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
          "Failed to place order"
        );
      } finally {
        setLoading(false);
      }
    };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">

        <div className="bg-white border rounded-3xl p-10 text-center max-w-md w-full">

          <h1 className="text-3xl font-bold">
            Cart is empty
          </h1>

          <p className="text-zinc-500 mt-3">
            Add some products first
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex h-14 px-8 rounded-2xl bg-black text-white items-center justify-center font-semibold"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <p className="text-zinc-500 mt-2">
            Complete your order
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT */}

          <form
            onSubmit={
              handleCheckout
            }
            className="lg:col-span-2 bg-white border rounded-3xl p-8 space-y-8"
          >

            {/* SHIPPING */}

            <div className="space-y-6">

              <div>

                <h2 className="text-2xl font-bold">
                  Shipping Address
                </h2>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="h-14 px-4 rounded-2xl border"
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  className="h-14 px-4 rounded-2xl border"
                />

              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full h-14 px-4 rounded-2xl border"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full h-14 px-4 rounded-2xl border"
              />

              <textarea
                name="address"
                placeholder="Full Address"
                required
                rows={5}
                className="w-full p-4 rounded-2xl border"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  className="h-14 px-4 rounded-2xl border"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  required
                  className="h-14 px-4 rounded-2xl border"
                />

                <input
                  type="text"
                  name="postalCode"
                  placeholder="Pincode"
                  required
                  className="h-14 px-4 rounded-2xl border"
                />

              </div>

            </div>



            {/* PAYMENT */}

            <div className="space-y-5">

              <div>

                <h2 className="text-2xl font-bold">
                  Payment Method
                </h2>

                <p className="text-zinc-500 mt-1">
                  Choose your preferred payment option
                </p>

              </div>

              {/* RAZORPAY */}

              <button
                type="button"
                onClick={() =>
                  setPaymentMethod(
                    "RAZORPAY"
                  )
                }
                className={`w-full rounded-3xl border-2 p-5 transition-all text-left ${paymentMethod ===
                    "RAZORPAY"
                    ? "border-black bg-zinc-50"
                    : "border-zinc-200"
                  }`}
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                      <CreditCard size={24} />
                    </div>

                    <div>

                      <div className="flex items-center gap-2">

                        <h3 className="text-lg font-bold">
                          Razorpay
                        </h3>

                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          Recommended
                        </span>

                      </div>

                      <p className="text-zinc-500 text-sm mt-1">
                        UPI • Cards • Wallets • Net Banking
                      </p>

                      <div className="flex gap-2 mt-3">

                        <span className="text-xs border rounded-full px-2 py-1">
                          UPI
                        </span>

                        <span className="text-xs border rounded-full px-2 py-1">
                          VISA
                        </span>

                        <span className="text-xs border rounded-full px-2 py-1">
                          Mastercard
                        </span>

                      </div>

                    </div>

                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 mt-1 ${paymentMethod ===
                        "RAZORPAY"
                        ? "border-black bg-black"
                        : "border-zinc-300"
                      }`}
                  />

                </div>

              </button>

              {/* COD */}

              <button
                type="button"
                onClick={() =>
                  setPaymentMethod(
                    "COD"
                  )
                }
                className={`w-full rounded-3xl border-2 p-5 transition-all text-left ${paymentMethod ===
                    "COD"
                    ? "border-black bg-zinc-50"
                    : "border-zinc-200"
                  }`}
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center">
                      <Truck size={24} />
                    </div>

                    <div>

                      <h3 className="text-lg font-bold">
                        Cash On Delivery
                      </h3>

                      <p className="text-zinc-500 text-sm mt-1">
                        Pay when your order arrives
                      </p>

                    </div>

                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 mt-1 ${paymentMethod ===
                        "COD"
                        ? "border-black bg-black"
                        : "border-zinc-300"
                      }`}
                  />

                </div>

              </button>

            </div>

         <button
  type="submit"
  disabled={loading}
  className="w-full h-16 rounded-3xl bg-black text-white text-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-3"
>

  <ShieldCheck size={22} />

  {loading
    ? paymentMethod ===
      "COD"
      ? "Placing Order..."
      : "Opening Payment..."

    : paymentMethod ===
      "COD"
    ? `Place Order • ₹${finalTotal}`
    : `Pay Securely • ₹${finalTotal}`}

</button>

          </form>

          {/* RIGHT */}

          <div className="bg-white border rounded-3xl p-8 h-fit sticky top-24 space-y-6">

            <div>

              <h2 className="text-2xl font-bold">
                Order Summary
              </h2>

            </div>

            {/* ITEMS */}

            <div className="space-y-5">

              {items.map((item) => (
                <div
                  key={
                    item.product
                      ._id
                  }
                  className="flex gap-4"
                >

                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border">

                    <Image
                      src={
                        item.product
                          .images?.[0]
                      }
                      alt={
                        item.product
                          .title
                      }
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div className="flex-1">

                    <h3 className="font-semibold">
                      {
                        item.product
                          .title
                      }
                    </h3>

                    <p className="text-sm text-zinc-500">
                      Qty:{" "}
                      {
                        item.quantity
                      }
                    </p>

                    <p className="font-bold mt-1">
                      ₹
                      {(item.product
                        .salePrice ||
                        item.product
                          .price) *
                        item.quantity}
                    </p>

                  </div>

                </div>
              ))}

            </div>

            {/* TOTALS */}

            <div className="border-t pt-5 space-y-4">

              <div className="flex items-center justify-between">

                <span className="text-zinc-600">
                  Subtotal
                </span>

                <span>
                  ₹
                  {totalPrice()}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-zinc-600">
                  Shipping
                </span>

                <span>
                  {shipping === 0
                    ? "Free"
                    : `₹${shipping}`}
                </span>

              </div>

              <div className="border-t pt-4 flex items-center justify-between text-lg font-bold">

                <span>Total</span>

                <span>
                  ₹
                  {finalTotal}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}