"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllUsers,
  updateUserRole,
  toggleBlockUser,
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
      id: string,
      role: string
    ) => {
      try {
        await updateUserRole(
          id,
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

  const handleBlock =
    async (id: string) => {
      try {
        await toggleBlockUser(
          id
        );

        toast.success(
          "User updated"
        );

        fetchUsers();
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed"
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
          Users
        </h1>

        <p className="text-zinc-500 mt-2">
          Manage customers and vendors
        </p>

      </div>

      <div className="bg-white border rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-zinc-100">

              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map(
                (user) => (
                  <tr
                    key={
                      user._id
                    }
                    className="border-t"
                  >

                    <td className="p-4">
                      {
                        user.name
                      }
                    </td>

                    <td className="p-4">
                      {
                        user.email
                      }
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

                      {user.isBlocked ? (
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
                          Blocked
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm">
                          Active
                        </span>
                      )}

                    </td>

                    <td className="p-4">

                      <button
                        onClick={() =>
                          handleBlock(
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
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}