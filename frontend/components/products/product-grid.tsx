import ProductCard from "./product-card";

interface Props {
  products: any[];
}

export default function ProductGrid({
  products,
}: Props) {
  if (
    products.length === 0
  ) {
    return (
      <div className="bg-white border rounded-3xl p-10 text-center text-zinc-500">
        No products found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

      {products.map(
        (product) => (
          <ProductCard
            key={
              product._id
            }
            product={
              product
            }
          />
        )
      )}

    </div>
  );
}