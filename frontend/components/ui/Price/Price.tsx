interface Props {
  price: number;
  salePrice?: number;
  currency?: string;
}

export default function Price({
  price,
  salePrice,
  currency = "₹",
}: Props) {
  const finalPrice = salePrice || price;

  const hasDiscount =
    salePrice &&
    salePrice < price;

  return (
    <div className="flex items-end gap-3">

      <h3 className="text-2xl font-semibold text-brand">

        {currency}
        {finalPrice.toLocaleString()}

      </h3>

      {hasDiscount && (

        <>

          <p className="text-sm line-through text-muted">

            {currency}
            {price.toLocaleString()}

          </p>

          <span className="text-xs rounded-full bg-red-50 text-red-600 px-2 py-1">

            {Math.round(
              ((price - finalPrice) /
                price) *
                100
            )}
            % OFF

          </span>

        </>

      )}

    </div>
  );
}