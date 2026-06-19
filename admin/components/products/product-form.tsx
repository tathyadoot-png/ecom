"use client";

import { useEffect, useMemo, useState } from "react";

import Image from "next/image";

import {
  createProduct,
  getCategories,
  updateProduct,
} from "@/services/product.service";

import { Category } from "@/types/product.types";

import { toast } from "sonner";

interface Props {
  mode?: "create" | "edit";

  initialData?: any;
}

export default function ProductForm({ mode = "create", initialData }: Props) {
  const [loading, setLoading] = useState(false);

const [images, setImages] =
  useState<File[]>([]);

  const [previewImages, setPreviewImages] = useState<string[]>(
    initialData?.images || [],
  );

  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState(initialData?.title || "");
  const [selectedCategory, setSelectedCategory] =
    useState(
      initialData?.category?._id || ""
    );

  const [slug, setSlug] =
    useState(
      initialData?.slug || ""
    );

    const removeImage = (
  index: number
) => {

  setImages((prev) =>
    prev.filter(
      (_, i) =>
        i !== index
    )
  );

  setPreviewImages(
    (prev) =>
      prev.filter(
        (_, i) =>
          i !== index
      )
  );
};

  useEffect(() => {
    if (mode === "create") {
      setSlug(
        title
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
      );
    }
  }, [title]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();

        setCategories(res.data);
      } catch (error: any) {
        console.log(error);

        toast.error(
          error?.response?.data?.message || "Failed to fetch categories",
        );
      }
    };

    fetchCategories();
  }, []);

const handleImagesChange = (
  e:
    React.ChangeEvent<HTMLInputElement>
) => {

  const files =
    Array.from(
      e.target.files || []
    );

  setImages((prev) => [
    ...prev,
    ...files,
  ]);

  const previews =
    files.map((file) =>
      URL.createObjectURL(
        file
      )
    );

  setPreviewImages(
    (prev) => [
      ...prev,
      ...previews,
    ]
  );

  e.target.value = "";
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const form = e.currentTarget;

      const formData = new FormData(form);

      formData.set("title", title);

      formData.set("slug", slug);

      formData.set(
        "category",
        selectedCategory
      );

      if (mode === "create") {
        formData.set(
          "status",
          "pending"
        );
      }

      // Images
      if (images) {
        Array.from(images).forEach((file) => {
          formData.append("images", file);
        });
      }

      if (mode === "edit") {
        await updateProduct(initialData._id, formData);

        toast.success("Product updated successfully");
      } else {
        await createProduct(formData);

        toast.success("Product created successfully");

        form.reset();

        setPreviewImages([]);
      }
    } catch (error: any) {
      console.log(error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Something went wrong";

      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-3xl border"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">Product Title</label>

          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Slug</label>

          <input
            type="text"
            value={slug}
            onChange={(e) =>
              setSlug(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3 bg-zinc-100"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">Description</label>

        <textarea
          name="description"
          required
          rows={6}
          defaultValue={initialData?.description}
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Short Description</label>

        <textarea
          name="shortDescription"
          rows={3}
          defaultValue={initialData?.shortDescription}
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block mb-2 font-medium">Price</label>

          <input
            type="number"
            name="price"
            required
            defaultValue={initialData?.price}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Sale Price</label>

          <input
            type="number"
            name="salePrice"
            defaultValue={initialData?.salePrice}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Stock</label>

          <input
            type="number"
            name="stock"
            required
            defaultValue={initialData?.stock}
            className="w-full border rounded-xl p-3"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">Category</label>

          <select
            name="category"
            required
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
  <label className="block mb-2 font-medium">
    Status
  </label>

  <input
    type="text"
    value={
      mode === "create"
        ? "Pending Admin Approval"
        : initialData?.status
    }
    disabled
    className="w-full border rounded-xl p-3 bg-zinc-100"
  />
</div>
      </div>

      <div className="flex items-center gap-8">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={initialData?.featured}
          />
          Featured Product
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={initialData?.isActive ?? true}
          />
          Active
        </label>
      </div>

      <div>
        <label className="block mb-3 font-medium">Product Images</label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImagesChange}
        />
      </div>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previewImages.map((image, index) => (
             <div
      key={index}
      className="
        relative
        aspect-square
        rounded-2xl
        overflow-hidden
        border
      "
    >

      <button
        type="button"
        onClick={() =>
          removeImage(
            index
          )
        }
        className="
          absolute
          top-2
          right-2
          z-20
          w-7
          h-7
          rounded-full
          bg-red-600
          text-white
          flex
          items-center
          justify-center
        "
      >
        ×
      </button>

      <Image
        src={image}
        alt="Preview"
        fill
        className="
          object-cover
        "
      />

    </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-8 py-4 rounded-2xl hover:opacity-90 transition-all"
      >
        {loading
          ? mode === "edit"
            ? "Updating Product..."
            : "Creating Product..."
          : mode === "edit"
            ? "Update Product"
            : "Create Product"}
      </button>
    </form>
  );
}
