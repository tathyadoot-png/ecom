"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Trash2,
} from "lucide-react";

import {
  createCategory,
  deleteCategory,
  getCategories,
} from "@/services/category.service";

interface Category {
  _id: string;

  name: string;

  slug: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [name, setName] =
    useState("");

  const slug = useMemo(() => {
    return name
      .toLowerCase()
      .trim()
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
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await createCategory({
          name,
          slug,
        });

        setName("");

        fetchCategories();
      } catch (error) {
        console.log(error);
      }
    };

  const handleDelete =
    async (id: string) => {
      try {
        await deleteCategory(id);

        setCategories((prev) =>
          prev.filter(
            (category) =>
              category._id !== id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="space-y-8">
      
      <div>
        
        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <p className="text-zinc-500 mt-2">
          Manage categories
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl border flex gap-4"
      >
        
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="flex-1 border rounded-xl p-3"
        />

        <button className="bg-black text-white px-6 rounded-xl">
          Add
        </button>

      </form>

      <div className="bg-white rounded-2xl border overflow-hidden">
        
        <table className="w-full">
          
          <thead className="bg-zinc-100">
            <tr>
              
              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Slug
              </th>

              <th className="text-left p-4">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>
            
            {categories.map(
              (category) => (
                <tr
                  key={
                    category._id
                  }
                  className="border-t"
                >
                  
                  <td className="p-4">
                    {
                      category.name
                    }
                  </td>

                  <td className="p-4 text-zinc-500">
                    {
                      category.slug
                    }
                  </td>

                  <td className="p-4">
                    
                    <button
                      onClick={() =>
                        handleDelete(
                          category._id
                        )
                      }
                      className="p-2 border rounded-lg text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}