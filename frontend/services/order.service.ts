import api from "@/lib/axios";

export const createOrder =
  async (data: any) => {
    const res =
      await api.post(
        "/orders",
        data
      );

    return res.data;
  };

export const getMyOrders =
  async () => {
    const res =
      await api.get(
        "/orders/my-orders"
      );

    return res.data;
  };

export const getSingleOrder =
  async (id: string) => {
    const res =
      await api.get(
        `/orders/${id}`
      );

    return res.data;
  };