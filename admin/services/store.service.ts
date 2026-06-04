import api from "@/lib/axios";

export const getVendorDashboardStats =
  async () => {
    const res =
      await api.get(
        "/stores/vendor-dashboard"
      );

    return res.data;
  };