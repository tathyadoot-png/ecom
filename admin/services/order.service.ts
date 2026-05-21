import api from "@/lib/axios";

export const getOrders =
  async () => {
    const res =
      await api.get(
        "/orders/admin/all"
      );

    return res.data;
  };

export const updateOrderStatus =
  async (
    id: string,
    status: string
  ) => {
    const res =
      await api.patch(
        `/orders/admin/${id}/status`,
        {
          status,
        }
      );

    return res.data;
  };