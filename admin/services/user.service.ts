import api from "@/lib/axios";

export const getAllUsers =
  async () => {
    const res =
      await api.get(
        "/users"
      );

    return res.data;
  };

export const getUserById =
  async (id: string) => {
    const res =
      await api.get(
        `/users/${id}`
      );

    return res.data;
  };

export const updateUserRole =
  async (
    id: string,
    role: string
  ) => {
    const res =
      await api.patch(
        `/users/${id}/role`,
        {
          role,
        }
      );

    return res.data;
  };

export const toggleBlockUser =
  async (id: string) => {
    const res =
      await api.patch(
        `/users/${id}/block`
      );

    return res.data;
  };