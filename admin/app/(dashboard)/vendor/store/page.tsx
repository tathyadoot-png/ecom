"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  createStore,
  getMyStore,
} from "@/services/store.service";

import { toast } from "sonner";

export default function VendorStorePage() {
  const [loading, setLoading] =
    useState(true);

  const [store, setStore] =
    useState<any>(null);

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

const [logo, setLogo] =
  useState<File | null>(null);

const [banner, setBanner] =
  useState<File | null>(null);

  const fetchStore =
    async () => {
      try {
        const res =
          await getMyStore();

        setStore(
          res.data
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    fetchStore();
  }, []);

const handleCreateStore =
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

      formData.append(
        "description",
        description
      );

      if (logo) {
        formData.append(
          "logo",
          logo
        );
      }

      if (banner) {
        formData.append(
          "banner",
          banner
        );
      }

      await createStore(
        formData
      );

      toast.success(
        "Store created successfully"
      );

      fetchStore();
    } catch (
      error: any
    ) {
      toast.error(
        error?.response
          ?.data
          ?.message ||
          "Failed to create store"
      );
    }
  };

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (store) {
    return (
      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-bold">
            My Store
          </h1>

          <p className="text-zinc-500 mt-2">
            Manage your store
          </p>

        </div>

        <div className="bg-white border rounded-3xl p-8">

          <h2 className="text-2xl font-bold">
            {store.name}
          </h2>

          <p className="text-zinc-500 mt-3">
            {
              store.description
            }
          </p>

          <div className="mt-6">

            <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700">
              {
                store.status
              }
            </span>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="max-w-2xl">

      <h1 className="text-4xl font-bold">
        Create Store
      </h1>

      <p className="text-zinc-500 mt-2">
        Create your vendor store
      </p>

      <form
        onSubmit={
          handleCreateStore
        }
        className="mt-8 bg-white border rounded-3xl p-8 space-y-5"
      >

        <div>

          <label>
            Store Name
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
            Description
          </label>

          <textarea
            value={
              description
            }
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-4 mt-2"
            rows={5}
          />

        </div>

        <div>

  <label>
    Store Logo
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setLogo(
        e.target.files?.[0] ||
          null
      )
    }
    className="w-full mt-2"
  />

</div>

<div>

  <label>
    Store Banner
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setBanner(
        e.target.files?.[0] ||
          null
      )
    }
    className="w-full mt-2"
  />

</div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Create Store
        </button>

      </form>

    </div>
  );
}