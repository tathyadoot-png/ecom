interface CheckoutLayoutProps {
  children: React.ReactNode;
  summary: React.ReactNode;
}

// Same two-column, sticky-summary grid CartPage established —
// deliberately not a new layout pattern.
const CheckoutLayout = ({ children, summary }: CheckoutLayoutProps) => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">{children}</div>
      <div>{summary}</div>
    </div>
  );
};

export { CheckoutLayout };
