import api from "@/lib/axios";

export const updateProfile =
  async (
    data: FormData
  ) => {
    return api.patch(
      "/auth/profile",
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };

export const changePassword =
  async (data: any) => {
    return api.patch(
      "/auth/change-password",
      data
    );
  };