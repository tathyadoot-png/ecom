import api from "@/lib/axios";

export const updateProfile =
  async (
    formData: FormData
  ) => {
    const res =
      await api.patch(
        "/auth/profile",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return res.data;
  };

export const changePassword =
  async (
    currentPassword: string,
    newPassword: string
  ) => {
    const res =
      await api.patch(
        "/auth/change-password",
        {
          currentPassword,
          newPassword,
        }
      );

    return res.data;
  };