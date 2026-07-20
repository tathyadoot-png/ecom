interface CartTotalsProps {
  itemCount: number;
  subtotal: number;
  // Cart page doesn't know the real shipping fee (that's only computed
  // by the backend at order creation), so it's optional and defaults
  // to free — checkout passes the actual mirrored fee.
  shippingFee?: number;
}

const CartTotals = ({ itemCount, subtotal, shippingFee = 0 }: CartTotalsProps) => {
  const total = subtotal + shippingFee;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-text/60 font-body">Subtotal ({itemCount} items)</span>
        <span className="font-medium text-text">₹{subtotal.toLocaleString('en-IN')}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-text/60 font-body">Shipping</span>
        <span className={shippingFee > 0 ? 'font-medium text-text' : 'font-medium text-forest'}>
          {shippingFee > 0 ? `₹${shippingFee.toLocaleString('en-IN')}` : 'Free'}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-warm-beige/40 pt-4">
        <span className="font-heading text-lg text-text">Total</span>
        <span className="font-heading text-lg text-text">₹{total.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};

export { CartTotals };
