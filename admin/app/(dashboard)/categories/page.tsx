"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  FolderOpen,
  ImagePlus,
  Loader2,
  Trash2
} from "lucide-react";

import { toast } from "sonner";

import {
  createCategory,
  getCategories,
  deleteCategory
} from "@/services/category.service";

interface Category {

  _id:string;

  name:string;

  slug:string;

  image:string;

  description:string;

  displayOrder:number;

  featured:boolean;

  createdAt?:string;

}

export default function CategoriesPage() {

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

const [displayOrder,setDisplayOrder]=
useState(0);

  const [saving, setSaving] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const fileRef =
    useRef<HTMLInputElement>(null);

  const slug = useMemo(() => {

    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  }, [name]);

  const fetchCategories =
    async () => {

      try {

        const res =
          await getCategories();

        setCategories(
          res.data
        );

      } catch {

        toast.error(
          "Failed to load categories"
        );

      }

    };

  useEffect(() => {

    fetchCategories();

  }, []);

  const filteredCategories =
    categories.filter((item) =>

      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (!name.trim()) {

        toast.error(
          "Category name is required"
        );

        return;

      }

      if (!image) {

        toast.error(
          "Please upload category image"
        );

        return;

      }

      try {

        setSaving(true);

        const formData =
          new FormData();

        formData.append(
          "name",
          name
        );

        formData.append(
          "slug",
          slug
        );

        formData.append(
          "description",
          description
        );

        formData.append(
"displayOrder",
String(displayOrder)
)

        formData.append(
          "folder",
          "commerce-platform/categories"
        );

        formData.append(
          "image",
          image
        );

        await createCategory(
          formData
        );

        toast.success(
          "Category created successfully"
        );

        setName("");

        setDescription("");

       setDisplayOrder(0)

        setImage(null);

        if (
          fileRef.current
        ) {

          fileRef.current.value =
            "";

        }

        fetchCategories();

      } catch {

        toast.error(
          "Failed to create category"
        );

      } finally {

        setSaving(false);

      }

    };


  const handleDelete = async (
    id: string
  ) => {

    const ok =
      window.confirm(
        "Delete this category?"
      );

    if (!ok) return;

    try {

      await deleteCategory(id);

      toast.success("Deleted");

      setCategories((prev) =>
        prev.filter(
          (item) =>
            item._id !== id
        )
      );

    } catch {

      toast.error(
        "Delete failed"
      );

    }

  };


  return (

    <div className="space-y-8">

      {/* PAGE HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-zinc-900">

            Categories

          </h1>

          <p className="text-zinc-500 mt-2">

            Manage artisan marketplace categories

          </p>

        </div>

        <div className="hidden md:flex items-center gap-3 rounded-xl border bg-white px-4 py-3">

          <FolderOpen
            size={20}
            className="text-brand"
          />

          <div>

            <p className="font-semibold">

              {categories.length}

            </p>

            <p className="text-xs text-zinc-500">

              Total Categories

            </p>

          </div>

        </div>

      </div>

      {/* FORM CARD */}

      <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">

        <div className="border-b px-8 py-5">

          <h2 className="text-xl font-semibold">

            Create Category

          </h2>

          <p className="text-sm text-zinc-500 mt-1">

            Categories automatically appear on the storefront.

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* NAME */}

            <div>

              <label className="block text-sm font-medium mb-2">

                Category Name

              </label>

              <input

                type="text"

                placeholder="Handloom"

                value={name}

                onChange={(e) =>

                  setName(
                    e.target.value
                  )

                }

                className="

w-full

rounded-xl

border

px-4

h-12

outline-none

focus:border-brand

"

              />

            </div>

            {/* SLUG */}

            <div>

              <label className="block text-sm font-medium mb-2">

                Slug

              </label>

              <input

                type="text"

                readOnly

                value={slug}

                className="

w-full

rounded-xl

border

bg-zinc-100

px-4

h-12

text-zinc-500

"

              />

            </div>

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="block text-sm font-medium mb-2">

              Description

            </label>

            <textarea

              rows={4}

              placeholder="Write a short category description..."

              value={description}

              onChange={(e) =>

                setDescription(
                  e.target.value
                )

              }

              className="

w-full

rounded-xl

border

p-4

resize-none

outline-none

focus:border-brand

"

            />

          </div>

          {/* IMAGE */}

          <div>

            <label className="block text-sm font-medium mb-3">

              Category Image

            </label>

            <label className="block mb-2 font-medium">
              Display Order
            </label>

            <select
              value={displayOrder}
              onChange={(e) =>
                setDisplayOrder(Number(e.target.value))
              }
              className="
    w-full
    h-12
    rounded-xl
    border
    border-zinc-300
    px-4
    bg-white
  "
            >

              <option value={0}>
                Last Position
              </option>

              {Array.from({
                length: categories.length,
              }).map((_, index) => (

                <option
                  key={index}
                  value={index + 1}
                >
                  {index + 1}
                </option>

              ))}

            </select>

            <div

              onClick={() =>

                fileRef.current?.click()

              }

              className="

cursor-pointer

rounded-2xl

border-2

border-dashed

border-zinc-300

hover:border-brand

transition

p-8

text-center

"

            >

              <input

                ref={fileRef}

                hidden

                type="file"

                accept="image/*"

                onChange={(e) =>

                  setImage(

                    e.target.files?.[0] ||

                    null

                  )

                }

              />

              {image ? (

                <div className="space-y-4">

                  <div className="relative mx-auto h-36 w-36 rounded-2xl overflow-hidden border">

                    <Image

                      src={URL.createObjectURL(image)}

                      alt="preview"

                      fill

                      className="object-cover"

                    />

                  </div>

                  <p className="text-sm font-medium">

                    {image.name}

                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center">

                    <ImagePlus
                      size={28}
                      className="text-brand"
                    />

                  </div>

                  <div>

                    <p className="font-semibold">

                      Click to upload

                    </p>

                    <p className="text-sm text-zinc-500">

                      PNG • JPG • WEBP

                    </p>

                  </div>

                </div>

              )}

            </div>

          </div>

          <div className="flex justify-end">

            <button

              disabled={saving}

              className="

h-12

px-8

rounded-xl

bg-brand

text-white

font-medium

hover:bg-brand-light

disabled:opacity-60

flex

items-center

gap-2

"

            >

              {saving && (

                <Loader2
                  size={18}
                  className="animate-spin"
                />

              )}

              {saving

                ? "Creating..."

                : "Create Category"}

            </button>

          </div>

        </form>

      </div>

      {/* TABLE STARTS HERE (PART-2) */}

      {/* TABLE CARD */}

      <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b px-8 py-5">

          <div>

            <h2 className="text-xl font-semibold">
              All Categories
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Browse and manage all marketplace categories.
            </p>

          </div>

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
      h-11
      w-full
      md:w-72
      rounded-xl
      border
      px-4
      outline-none
      focus:border-brand
      "
          />

        </div>

        {filteredCategories.length === 0 ? (

          <div className="py-20 flex flex-col items-center justify-center">

            <FolderOpen
              size={60}
              className="text-zinc-300"
            />

            <h3 className="mt-5 text-xl font-semibold">

              No Categories Found

            </h3>

            <p className="text-zinc-500 mt-2">

              Create your first artisan category.

            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-zinc-50 border-b">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Image
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Slug
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Display Order
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Created
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredCategories.map(
                  (category) => (

                    <tr
                      key={category._id}
                      className="
                border-b
                hover:bg-secondary/40
                transition
                "
                    >

                      <td className="px-6 py-4">

                        {category.image ? (

                          <Image
                            src={category.image}
                            alt={category.name}
                            width={70}
                            height={70}
                            className="
                      rounded-xl
                      border
                      object-cover
                      "
                          />

                        ) : (

                          <div
                            className="
                      w-[70px]
                      h-[70px]
                      rounded-xl
                      bg-zinc-100
                      "
                          />

                        )}

                      </td>

                      <td className="px-6 py-4">

                        <div>

                          <h3 className="font-semibold text-zinc-900">

                            {category.name}

                          </h3>

                          <p className="text-sm text-zinc-500 mt-1 line-clamp-2">

                            {category.description ||
                              "No description"}

                          </p>

                        </div>

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className="
                    rounded-lg
                    bg-secondary
                    px-3
                    py-2
                    text-sm
                    text-zinc-700
                    "
                        >

                          {category.slug}

                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div
                          className="
      mx-auto
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      bg-brand/10
      text-brand
      font-semibold
    "
                        >
                          {category.displayOrder}
                        </div>

                      </td>

                      <td className="px-6 py-4 text-zinc-500 text-sm">

                        {category.createdAt
                          ? new Date(
                            category.createdAt
                          ).toLocaleDateString()
                          : "-"}

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-center">

                          <button
                            onClick={() =>
                              handleDelete(
                                category._id
                              )
                            }
                            className="
                      w-10
                      h-10
                      rounded-xl
                      border
                      text-red-600
                      hover:bg-red-50
                      hover:border-red-200
                      transition
                      flex
                      items-center
                      justify-center
                      "
                          >

                            <Trash2
                              size={18}
                            />

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );
}