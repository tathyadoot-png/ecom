import api from "@/lib/axios";

export const getVendorDashboardStats =
  async () => {
    const res =
      await api.get(
        "/stores/vendor-dashboard"
      );

    return res.data;
  };

export const getAllStores =
  async () => {
    const res =
      await api.get(
        "/stores"
      );

    return res.data;
  };

export const updateStoreStatus =
  async (
    id: string,
    status: string
  ) => {
    const res =
      await api.patch(
        `/stores/${id}/status`,
        {
          status,
        }
      );

    return res.data;
  };

export const getMyStore =
  async () => {
    const res =
      await api.get(
        "/stores/my-store"
      );

    return res.data;
  };

export const createStore =
  async (
    data: FormData
  ) => {
    const res =
      await api.post(
        "/stores",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return res.data;
  };

  
export const updateMyStore =
  async (
    data: FormData
  ) => {
    const res =
      await api.patch(
        "/stores/my-store",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return res.data;
  };

export const getVendorOrders =
  async () => {
    const res =
      await api.get(
        "/orders/vendor/my-orders"
      );

    return res.data;
  };
  

export const getStoreById =
  async (
    id: string
  ) => {

    const res =
      await api.get(
        `/stores/${id}`
      );

    return res.data;
  };

export const updateStoreFlags =
  async (
    id: string,
    data: {
      featured?: boolean;
      verified?: boolean;
      displayOrder?: number;
    }
  ) => {
    const res =
      await api.patch(
        `/stores/${id}/flags`,
        data
      );

    return res.data;
  };
