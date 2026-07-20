export const CONFIG = {
  API_URL:
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:5000/api",

  // Razorpay's key_id is the public/publishable half of the pair —
  // safe to expose client-side, mirrors the backend's RAZORPAY_KEY_ID.
  RAZORPAY_KEY_ID:
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
} as const;