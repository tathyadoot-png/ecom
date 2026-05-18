export default function HomePage() {
  return (
    <div className="space-y-8">
      
      <div>
        <h1>Dashboard</h1>

        <p className="text-muted-foreground">
          Welcome to admin panel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <p className="text-muted-foreground text-sm">
            Total Products
          </p>

          <h2 className="mt-2">0</h2>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <p className="text-muted-foreground text-sm">
            Total Orders
          </p>

          <h2 className="mt-2">0</h2>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <p className="text-muted-foreground text-sm">
            Customers
          </p>

          <h2 className="mt-2">0</h2>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <p className="text-muted-foreground text-sm">
            Revenue
          </p>

          <h2 className="mt-2">₹0</h2>
        </div>

      </div>

    </div>
  );
}