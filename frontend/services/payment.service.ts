import api from "@/lib/axios";

export const createRazorpayOrder =
  async (
    amount: number
  ) => {
    return api.post(
      "/payments/create-order",
      {
        amount,
      }
    );
  };

export const verifyPayment =
  async (
    data: any
  ) => {
    return api.post(
      "/payments/verify",
      data
    );
  };