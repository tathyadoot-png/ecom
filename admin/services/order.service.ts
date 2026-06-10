import api from "@/lib/axios";

export const getMyOrders =
  async () => {
    return api.get("/orders/my");
  };

export const getOrderById =
  async (id: string) => {
    return api.get(
      `/orders/${id}`
    );
  };

export const getAllOrders =
  async () => {
    return api.get(
      "/orders/admin/all"
    );
  };

export const updateOrderStatus =
  async (
    id: string,
    status: string
  ) => {
    return api.patch(
      `/orders/admin/${id}/status`,
      {
        status,
      }
    );
  };

  export const getVendorOrders =
  async () => {

    const res =
      await api.get(
        "/orders/vendor/my-orders"
      );

    return res.data;
  };