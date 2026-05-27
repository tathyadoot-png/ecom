"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  useParams,
} from "next/navigation";

import {
  User,
  Mail,
  Shield,
  MapPin,
  Calendar,
} from "lucide-react";

import { toast } from "sonner";

import { getUserById } from "@/services/user.service";

export default function CustomerDetailsPage() {
  const params =
    useParams();

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<any>(null);

  const fetchUser =
    async () => {
      try {
        const res =
          await getUserById(
            params.id as string
          );

        setUser(
          res.data
        );
      } catch (error: any) {
        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to fetch user"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div>
        Loading customer...
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        Customer not found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Customer Details
          </h1>

          <p className="text-zinc-500 mt-2">
            User ID:
            {" "}
            {user._id}
          </p>

        </div>

      </div>

      {/* PROFILE */}

      <div className="bg-white border rounded-3xl p-8">

        <div className="flex flex-col md:flex-row md:items-center gap-8">

          {/* AVATAR */}

          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-zinc-100 flex items-center justify-center">

            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-5xl font-bold text-zinc-500">
                {user.name?.charAt(
                  0
                )}
              </span>
            )}

          </div>

          {/* INFO */}

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NAME */}

            <div className="border rounded-2xl p-5">

              <div className="flex items-center gap-3 mb-3">

                <User
                  size={20}
                  className="text-zinc-500"
                />

                <p className="text-zinc-500">
                  Full Name
                </p>

              </div>

              <h2 className="text-xl font-bold">
                {user.name}
              </h2>

            </div>

            {/* EMAIL */}

            <div className="border rounded-2xl p-5">

              <div className="flex items-center gap-3 mb-3">

                <Mail
                  size={20}
                  className="text-zinc-500"
                />

                <p className="text-zinc-500">
                  Email
                </p>

              </div>

              <h2 className="text-lg font-semibold break-all">
                {user.email}
              </h2>

            </div>

            {/* ROLE */}

            <div className="border rounded-2xl p-5">

              <div className="flex items-center gap-3 mb-3">

                <Shield
                  size={20}
                  className="text-zinc-500"
                />

                <p className="text-zinc-500">
                  Role
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  user.role ===
                  "ADMIN"
                    ? "bg-red-100 text-red-700"

                    : user.role ===
                      "SUPER_ADMIN"
                    ? "bg-purple-100 text-purple-700"

                    : user.role ===
                      "VENDOR"
                    ? "bg-blue-100 text-blue-700"

                    : "bg-zinc-100 text-zinc-700"
                }`}
              >
                {user.role}
              </span>

            </div>

            {/* JOINED */}

            <div className="border rounded-2xl p-5">

              <div className="flex items-center gap-3 mb-3">

                <Calendar
                  size={20}
                  className="text-zinc-500"
                />

                <p className="text-zinc-500">
                  Joined
                </p>

              </div>

              <h2 className="font-semibold">
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* ADDRESS */}

      <div className="bg-white border rounded-3xl p-8">

        <div className="flex items-center gap-3 mb-8">

          <MapPin className="text-zinc-500" />

          <h2 className="text-2xl font-bold">
            Address
          </h2>

        </div>

        {!user.address
          ?.address ? (
          <p className="text-zinc-500">
            No address added
          </p>
        ) : (
          <div className="space-y-3 text-zinc-700">

            <p>
              {
                user.address
                  ?.fullName
              }
            </p>

            <p>
              {
                user.address
                  ?.phone
              }
            </p>

            <p>
              {
                user.address
                  ?.address
              }
            </p>

            <p>
              {
                user.address
                  ?.city
              }
              ,{" "}
              {
                user.address
                  ?.state
              }
            </p>

            <p>
              {
                user.address
                  ?.postalCode
              }
            </p>

            <p>
              {
                user.address
                  ?.country
              }
            </p>

          </div>
        )}

      </div>

    </div>
  );
}