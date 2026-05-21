import api from "@/lib/axios";

export const loginUser = async (
  email: string,
  password: string
) => {
  const res = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return res.data;
};

export const registerUser =
  async (
    name: string,
    email: string,
    password: string
  ) => {
    const res = await api.post(
      "/auth/register",
      {
        name,
        email,
        password,
      }
    );

    return res.data;
  };

export const getMe =
  async () => {
    const res =
      await api.get("/auth/me");

    return res.data;
  };

export const logoutUser =
  async () => {
    const res =
      await api.post(
        "/auth/logout"
      );

    return res.data;
  };