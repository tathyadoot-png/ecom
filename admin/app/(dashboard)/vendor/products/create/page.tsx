import ProductForm
  from "@/components/products/product-form";

export default function VendorCreateProductPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Create Product
        </h1>

        <p className="text-zinc-500 mt-2">
          Add a new product
        </p>
      </div>

      <ProductForm />

    </div>
  );
}