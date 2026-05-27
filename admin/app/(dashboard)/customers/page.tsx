"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  getAllUsers,
  toggleBlockUser,
  updateUserRole,
} from "@/services/user.service";

import { toast } from "sonner";

export default function CustomersPage() {
  const [users, setUsers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchUsers =
    async () => {
      try {
        const res =
          await getAllUsers();

        setUsers(
          res.data || []
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to fetch users"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange =
    async (
      userId: string,
      role: string
    ) => {
      try {
        await updateUserRole(
          userId,
          role
        );

        toast.success(
          "Role updated"
        );

        fetchUsers();
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to update role"
        );
      }
    };

  const handleBlockToggle =
    async (userId: string) => {
      try {
        await toggleBlockUser(
          userId
        );

        toast.success(
          "User updated"
        );

        fetchUsers();
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to update user"
        );
      }
    };

  if (loading) {
    return (
      <div>
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <p className="text-zinc-500 mt-2">
          Manage platform users
        </p>

      </div>

      <div className="bg-white rounded-3xl border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-zinc-100">

              <tr>

                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Role
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Joined
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {users.length ===
              0 ? (
                <tr>

                  <td
                    colSpan={6}
                    className="text-center py-10 text-zinc-500"
                  >
                    No users found
                  </td>

                </tr>
              ) : (
                users.map(
                  (user) => (
                    <tr
                      key={
                        user._id
                      }
                      className="border-t"
                    >

                      <td className="p-4">

                        <Link
                          href={`/customers/${user._id}`}
                          className="font-medium hover:underline"
                        >
                          {user.name}
                        </Link>

                      </td>

                      <td className="p-4 text-zinc-600">
                        {user.email}
                      </td>

                      <td className="p-4">

                        <select
                          value={
                            user.role
                          }
                          onChange={(
                            e
                          ) =>
                            handleRoleChange(
                              user._id,
                              e.target
                                .value
                            )
                          }
                          className="border rounded-xl px-3 py-2"
                        >

                          <option value="CUSTOMER">
                            CUSTOMER
                          </option>

                          <option value="VENDOR">
                            VENDOR
                          </option>

                          <option value="ADMIN">
                            ADMIN
                          </option>

                        </select>

                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.isBlocked
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {user.isBlocked
                            ? "Blocked"
                            : "Active"}
                        </span>

                      </td>

                      <td className="p-4 text-sm text-zinc-500">

                        {new Date(
                          user.createdAt
                        ).toLocaleDateString()}

                      </td>

                      <td className="p-4">

                        <button
                          onClick={() =>
                            handleBlockToggle(
                              user._id
                            )
                          }
                          className={`px-4 py-2 rounded-xl text-white ${
                            user.isBlocked
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {user.isBlocked
                            ? "Unblock"
                            : "Block"}
                        </button>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}