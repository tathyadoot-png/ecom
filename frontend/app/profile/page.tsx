"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  User,
  Shield,
  MapPin,
  Lock,
} from "lucide-react";

import { toast } from "sonner";

import { useAuthStore } from "@/store/auth-store";

import {
  updateProfile,
  changePassword,
} from "@/services/profile.service";

export default function ProfilePage() {
  const {
    user,
    setUser,
  } = useAuthStore();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    passwordLoading,
    setPasswordLoading,
  ] = useState(false);

  const [form, setForm] =
    useState({
      name: "",

      avatar: "",

      fullName: "",

      phone: "",

      address: "",

      city: "",

      state: "",

      country: "India",

      postalCode: "",
    });

  const [
    passwords,
    setPasswords,
  ] = useState({
    currentPassword: "",

    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name:
          user.name || "",

        avatar:
          user.avatar || "",

        fullName:
          user.address
            ?.fullName || "",

        phone:
          user.address
            ?.phone || "",

        address:
          user.address
            ?.address || "",

        city:
          user.address
            ?.city || "",

        state:
          user.address
            ?.state || "",

        country:
          user.address
            ?.country ||
          "India",

        postalCode:
          user.address
            ?.postalCode || "",
      });
    }
  }, [user]);

const handleUpdate =
  async () => {
    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "name",
        form.name
      );

      formData.append(
        "fullName",
        form.fullName
      );

      formData.append(
        "phone",
        form.phone
      );

      formData.append(
        "address",
        form.address
      );

      formData.append(
        "city",
        form.city
      );

      formData.append(
        "state",
        form.state
      );

      formData.append(
        "country",
        form.country
      );

      formData.append(
        "postalCode",
        form.postalCode
      );

      if (
        form.avatarFile
      ) {
        formData.append(
          "avatar",
          form.avatarFile
        );
      }

      const res =
        await updateProfile(
          formData
        );

      setUser(
        res.data.data
      );

      toast.success(
        "Profile updated successfully"
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword =
    async () => {
      try {
        setPasswordLoading(
          true
        );

        await changePassword(
          passwords
        );

        toast.success(
          "Password changed successfully"
        );

        setPasswords({
          currentPassword:
            "",

          newPassword:
            "",
        });
      } catch (error: any) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to change password"
        );
      } finally {
        setPasswordLoading(
          false
        );
      }
    };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50">

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <p className="text-zinc-500 mt-2">
            Manage your account settings
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="bg-white border rounded-3xl p-8 h-fit">

            <div className="flex flex-col items-center text-center">

              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-zinc-100">

                <Image
  unoptimized
  src={
    form.avatar ||
    `https://ui-avatars.com/api/?name=${form.name}`
  }
                  alt="profile"
                  fill
                  className="object-cover"
                />

              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {user.name}
              </h2>

              <p className="text-zinc-500">
                {user.email}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 text-sm font-medium">

                <Shield
                  size={16}
                />

                {user.role}

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="lg:col-span-2 space-y-8">

            {/* ACCOUNT */}

            <div className="bg-white border rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <User />

                <h2 className="text-2xl font-bold">
                  Account Information
                </h2>

              </div>

              <div className="space-y-6">

                <input
                  type="text"
                  placeholder="Name"
                  value={
                    form.name
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      name: e
                        .target
                        .value,
                    })
                  }
                  className="w-full h-14 px-4 rounded-2xl border"
                />

                <input
                  type="text"
                  placeholder="Avatar URL"
                  value={
                    form.avatar
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      avatar:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-14 px-4 rounded-2xl border"
                />

                <button
                  onClick={
                    handleUpdate
                  }
                  disabled={
                    loading
                  }
                  className="h-12 px-6 rounded-2xl bg-black text-white font-semibold"
                >
                  {loading
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </div>

            {/* ADDRESS */}

            <div className="bg-white border rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <MapPin />

                <h2 className="text-2xl font-bold">
                  Saved Address
                </h2>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={
                    form.fullName
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      fullName:
                        e.target
                          .value,
                    })
                  }
                  className="h-14 px-4 rounded-2xl border"
                />

                <input
                  type="text"
                  placeholder="Phone"
                  value={
                    form.phone
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      phone:
                        e.target
                          .value,
                    })
                  }
                  className="h-14 px-4 rounded-2xl border"
                />

                <textarea
                  placeholder="Address"
                  value={
                    form.address
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      address:
                        e.target
                          .value,
                    })
                  }
                  className="md:col-span-2 p-4 rounded-2xl border"
                  rows={4}
                />

                <input
                  type="text"
                  placeholder="City"
                  value={
                    form.city
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      city: e
                        .target
                        .value,
                    })
                  }
                  className="h-14 px-4 rounded-2xl border"
                />

                <input
                  type="text"
                  placeholder="State"
                  value={
                    form.state
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      state:
                        e.target
                          .value,
                    })
                  }
                  className="h-14 px-4 rounded-2xl border"
                />

                <input
                  type="text"
                  placeholder="Postal Code"
                  value={
                    form.postalCode
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      postalCode:
                        e.target
                          .value,
                    })
                  }
                  className="h-14 px-4 rounded-2xl border"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="bg-white border rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <Lock />

                <h2 className="text-2xl font-bold">
                  Security
                </h2>

              </div>

              <div className="space-y-5">

                <input
                  type="password"
                  placeholder="Current Password"
                  value={
                    passwords.currentPassword
                  }
                  onChange={(
                    e
                  ) =>
                    setPasswords({
                      ...passwords,
                      currentPassword:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-14 px-4 rounded-2xl border"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={
                    passwords.newPassword
                  }
                  onChange={(
                    e
                  ) =>
                    setPasswords({
                      ...passwords,
                      newPassword:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-14 px-4 rounded-2xl border"
                />

                <button
                  onClick={
                    handleChangePassword
                  }
                  disabled={
                    passwordLoading
                  }
                  className="h-12 px-6 rounded-2xl bg-black text-white font-semibold"
                >
                  {passwordLoading
                    ? "Changing..."
                    : "Change Password"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}