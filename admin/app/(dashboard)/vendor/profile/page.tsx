"use client";

import {
    useState,
} from "react";

import Image from "next/image";

import {
    useAuthStore,
} from "@/store/auth-store";

import {
    updateProfile,
    changePassword,
} from "@/services/profile.service";

import {
    toast,
} from "sonner";
import { BadgeCheck } from "lucide-react";
const DEFAULT_VENDOR_AVATAR =
    "https://res.cloudinary.com/dysizd22t/image/upload/v1782803886/avatar_qxrvoh.png";
export default function VendorProfilePage() {
    const { user } =
        useAuthStore();

    const [name, setName] =
        useState(
            user?.name || ""
        );

    const [avatar, setAvatar] =
        useState<File | null>(
            null
        );

    const [
        currentPassword,
        setCurrentPassword,
    ] = useState("");

    const [
        newPassword,
        setNewPassword,
    ] = useState("");

    const handleProfileUpdate =
        async (
            e: React.FormEvent
        ) => {
            e.preventDefault();

            try {
                const formData =
                    new FormData();

                formData.append(
                    "name",
                    name
                );

                if (avatar) {
                    formData.append(
                        "avatar",
                        avatar
                    );
                }

             const res =
  await updateProfile(
    formData
  );

toast.success(
  "Profile updated"
);

window.location.reload();
            } catch (error: any) {
                toast.error(
                    error?.response?.data
                        ?.message ||
                    "Failed to update profile"
                );
            }
        };

    const handlePasswordChange =
        async (
            e: React.FormEvent
        ) => {
            e.preventDefault();

            try {
                await changePassword(
                    currentPassword,
                    newPassword
                );

                toast.success(
                    "Password changed"
                );

                setCurrentPassword(
                    ""
                );

                setNewPassword(
                    ""
                );
            } catch (error: any) {
                toast.error(
                    error?.response?.data
                        ?.message ||
                    "Failed to change password"
                );
            }
        };

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-4xl font-bold">
                    My Profile
                </h1>

                <p className="text-zinc-500 mt-2">
                    Manage account settings
                </p>
            </div>

            <div className="bg-white border rounded-3xl p-8">

                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">

                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-200">

                        <Image
                            src={
                                user?.avatar ||
                                DEFAULT_VENDOR_AVATAR
                            }
                            alt="Profile"
                            fill
                            className="object-cover"
                        />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold">
                            {user?.name}
                        </h2>

                        <p className="text-zinc-500 mt-1">
                            {user?.email}
                        </p>

                        <div className="mt-3 flex items-center gap-2">

                            <BadgeCheck
                                size={18}
                                className="text-green-600"
                            />

                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                {user?.role}
                            </span>

                        </div>

                    </div>

                </div>


                <form
                    onSubmit={
                        handleProfileUpdate
                    }
                    className="space-y-5"
                >

                    <div>

                        <label>
                            Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-xl h-12 px-4 mt-2"
                        />

                    </div>

                    <div>

                        <label>
                            Email
                        </label>

                        <input
                            disabled
                            value={
                                user?.email || ""
                            }
                            className="w-full border rounded-xl h-12 px-4 mt-2 bg-zinc-100"
                        />

                    </div>

<div>

  <label>
    Role
  </label>

  <input
    disabled
    value={
      user?.role || ""
    }
    className="w-full border rounded-xl h-12 px-4 mt-2 bg-zinc-100"
  />

</div>

             <div>

  <label className="font-medium">
    Avatar
  </label>

  <div className="mt-4 flex items-center gap-5">

    <div className="relative w-24 h-24 rounded-full overflow-hidden border">

      <Image
        src={
          avatar
            ? URL.createObjectURL(
                avatar
              )
            : user?.avatar ||
              DEFAULT_VENDOR_AVATAR
        }
        alt="Avatar Preview"
        fill
        className="object-cover"
      />

    </div>

    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setAvatar(
          e.target
            .files?.[0] ||
            null
        )
      }
    />

  </div>

</div>
                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-3 rounded-xl"
                    >
                        Update Profile
                    </button>

                </form>

            </div>

            <div className="bg-white border rounded-3xl p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Change Password
                </h2>

                <form
                    onSubmit={
                        handlePasswordChange
                    }
                    className="space-y-5"
                >

                    <input
                        type="password"
                        placeholder="Current Password"
                        value={
                            currentPassword
                        }
                        onChange={(e) =>
                            setCurrentPassword(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-xl h-12 px-4"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={
                            newPassword
                        }
                        onChange={(e) =>
                            setNewPassword(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-xl h-12 px-4"
                    />

                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-3 rounded-xl"
                    >
                        Change Password
                    </button>

                </form>

            </div>

        </div>
    );
}