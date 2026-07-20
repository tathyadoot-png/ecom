import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shared shell for every storefront page — home, products, product
// detail, and future category/search pages all inherit this
// automatically by living under the (shop) route group. Auth pages
// (/login, /register) intentionally stay outside it.
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
