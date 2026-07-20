'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Package,
  Menu,
  X,
  Phone,
  MapPin,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CountBadge } from '@/components/ui/CountBadge';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category.store';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';
import { useWishlistStore } from '@/store/wishlist.store';

// Only routes that actually exist in this storefront — every entry
// here must have a real page behind it (see Production Stabilization
// Pass: the previous nav had 6 links to pages that don't exist).
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Categories', href: '/categories' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { fetchCategories } = useCategoryStore();
  const { user } = useAuthStore();
  const cartCount = useCartStore((state) => state.totalItems());
  const wishlistCount = useWishlistStore((state) => state.totalItems());

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-cream border-b border-warm-beige/30">
      {/* Top Bar */}
      <div className="border-b border-warm-beige/20 py-1.5 text-xs text-text/60 hidden md:block">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1">
                <span className="text-primary">✦</span> Handcrafted by Indian Artisans
              </span>
              <span className="flex items-center gap-1">
                <span className="text-accent">✓</span> Free Shipping on Orders Above ₹999
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" /> +91 98765 43210
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> India
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image
                  src="/logo.png"
                  alt="Indian Artisan Marketplace"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="hidden font-heading text-xl text-text sm:inline-block">
                Indian Artisan
              </span>
            </div>
          </Link>

          {/* Search - desktop */}
          <div className="hidden flex-1 max-w-lg md:block">
            <div className="relative">
              <Input
                aria-label="Search"
                placeholder="Search for products, categories..."
                className="pl-10 bg-cream/80 border-warm-beige/40 rounded-full"
                leftIcon={<Search className="h-4 w-4 text-text/40" />}
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <Link href="/profile" aria-label="Profile" className="text-text/70 hover:text-primary transition-colors">
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <Link href="/login" aria-label="Login" className="text-text/70 hover:text-primary transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}
            {user && (
              <Link href="/orders" aria-label="My Orders" className="text-text/70 hover:text-primary transition-colors">
                <Package className="h-5 w-5" />
              </Link>
            )}
            {user && <LogoutButton />}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative text-text/70 hover:text-primary transition-colors"
            >
              <Heart className="h-5 w-5" />
              <CountBadge count={wishlistCount} />
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative text-text/70 hover:text-primary transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              <CountBadge count={cartCount} />
            </Link>
            {!user && (
              <Link href="/login" className="hidden sm:flex">
                <Button variant="outline" size="small">
                  Login / Register
                </Button>
              </Link>
            )}
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="block md:hidden text-text/70 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Category Navigation - desktop */}
        <nav className="hidden md:flex items-center gap-6 py-2 text-sm font-medium text-text/80 border-t border-warm-beige/20">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-primary',
                isActive(link.href) && 'text-primary font-semibold'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-auto flex items-center gap-1 text-xs text-text/50">
            <span className="font-heading text-accent">✦</span> Marketplace
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-warm-beige/20 bg-cream p-4 space-y-4">
          <div className="relative">
            <Input
              aria-label="Search"
              placeholder="Search..."
              className="pl-10 bg-cream"
              leftIcon={<Search className="h-4 w-4 text-text/40" />}
            />
          </div>
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-text hover:text-primary transition-colors',
                  isActive(link.href) && 'text-primary font-semibold'
                )}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-text hover:text-primary transition-colors"
                >
                  My Orders
                </Link>
                <Link href="/profile" className="mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="small" fullWidth>
                    My Profile
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/login" className="mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" size="small" fullWidth>
                  Login / Register
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
