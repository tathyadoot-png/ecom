'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { User, Heart, ShoppingBag, Package, Menu, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CountBadge } from '@/components/ui/CountBadge';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { SearchBar } from '@/components/features/search/SearchBar';
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

// Uniform 40×40 hit/hover target for every icon in the utility
// cluster — a soft circular hover fill instead of a bare color shift,
// so Profile/Orders/Logout/Wishlist/Cart all read as one consistent
// family rather than five independently-styled links.
const iconLinkClass =
  'relative flex h-10 w-10 items-center justify-center rounded-full text-text/55 transition-all duration-200 hover:bg-warm-beige/25 hover:text-primary';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { fetchCategories } = useCategoryStore();
  const { user } = useAuthStore();
  const cartCount = useCartStore((state) => state.totalItems());
  const wishlistCount = useWishlistStore((state) => state.totalItems());

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-warm-beige/20 bg-cream/95 backdrop-blur-md transition-shadow duration-500 ease-out',
        isScrolled && 'shadow-soft'
      )}
    >
      {/* Top Bar — a quiet credit line, not a second nav bar. Collapses
          away on scroll so the sticky header settles into a single,
          more compact band rather than always carrying its full
          two-tier height down the page. */}
      <div
        className={cn(
          'hidden overflow-hidden border-b border-cream/10 bg-text transition-[max-height,opacity,padding] duration-300 ease-out md:block',
          isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-10 py-2.5 opacity-100'
        )}
      >
        <Container>
          <div className="flex items-center justify-between font-body text-[11px] tracking-[0.02em] text-cream/50">
            <span>Handcrafted by Indian Artisans</span>
            <div className="flex items-center gap-4">
              <span>Free Shipping Above ₹999</span>
              <span className="h-3 w-px bg-cream/15" />
              <span>+91 98765 43210</span>
              <span className="h-3 w-px bg-cream/15" />
              <span>India</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header — a touch shorter once scrolled, so the sticky
          bar reads as a deliberately compact instrument, not just the
          hero header dragged down the page. */}
      <Container>
        <div
          className={cn(
            // Explicit pixel values, not h-16/h-24 — this theme's
            // named --spacing-16/--spacing-24 tokens (globals.css)
            // hijack those exact utility numbers to a flat 16px/24px
            // instead of the standard 16*4=64px / 24*4=96px, which
            // silently broke this compact-on-scroll effect the first
            // time it was written with the "obvious" class names.
            'flex items-center justify-between gap-7 transition-[height] duration-300 ease-out',
            isScrolled ? 'h-64 md:h-18' : 'h-20 md:h-[96px]'
          )}
        >
          {/* Logo — isolated with its own space, a hairline rule before
              the search field so it reads as the anchor, not the first
              item in a row. */}
          <Link
            href="/"
            className="flex flex-shrink-0 items-center gap-3 md:mr-2 md:border-r md:border-warm-beige/25 md:pr-7"
          >
            <div className="relative h-11 w-11">
              <Image
                src="/logo.png"
                alt="Indian Artisan Marketplace"
                fill
                priority
                sizes="44px"
                className="object-contain"
              />
            </div>
            <span className="hidden font-heading text-2xl text-text sm:inline-block">
              Indian Artisan
            </span>
          </Link>

          {/* Search - desktop. Styled entirely through SearchBar's
              existing inputClassName prop — no change to its behavior
              or internals — as a distinct premium object: a resting
              shadow, a deeper one on focus, warmer border. Capped at
              max-w-md even on wide screens so it reads as one element
              among several, not the widest thing in the header. */}
          <div className="hidden max-w-md flex-1 md:block">
            <SearchBar inputClassName="rounded-full border-warm-beige/50 bg-cream shadow-soft transition-shadow focus:border-accent/50 focus:shadow-medium focus:ring-1 focus:ring-accent/40" />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 sm:mr-2 sm:border-r sm:border-warm-beige/30 sm:pr-2">
              {user ? (
                <Link href="/profile" aria-label="Profile" className={iconLinkClass}>
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <Link href="/login" aria-label="Login" className={iconLinkClass}>
                  <User className="h-5 w-5" />
                </Link>
              )}
              {user && (
                <Link href="/orders" aria-label="My Orders" className={iconLinkClass}>
                  <Package className="h-5 w-5" />
                </Link>
              )}
              {user && <LogoutButton className={iconLinkClass} />}
            </div>

            <div className="flex items-center gap-1">
              <Link href="/wishlist" aria-label="Wishlist" className={iconLinkClass}>
                <Heart className="h-5 w-5" />
                <CountBadge count={wishlistCount} />
              </Link>
              <Link href="/cart" aria-label="Cart" className={iconLinkClass}>
                <ShoppingBag className="h-5 w-5" />
                <CountBadge count={cartCount} />
              </Link>
            </div>

            {!user && (
              <Link href="/login" className="ml-4 hidden sm:flex">
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
              className={cn(iconLinkClass, 'ml-1 md:hidden')}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Category Navigation - desktop */}
        <nav className="hidden items-center gap-10 border-t border-warm-beige/20 py-4 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'group relative py-1 font-body text-[13px] font-medium uppercase tracking-[0.08em] text-text/55 transition-colors duration-200 hover:text-primary',
                isActive(link.href) && 'text-primary'
              )}
            >
              {link.label}
              <span
                className={cn(
                  'absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-primary transition-all duration-300 ease-out group-hover:w-full',
                  isActive(link.href) && 'w-full'
                )}
              />
            </Link>
          ))}
        </nav>
      </Container>

      {/* Mobile Menu — spacing/hit-target polish only, same links,
          same order, same behavior as before. */}
      {isMobileMenuOpen && (
        <div className="animate-fade-in-down space-y-5 border-t border-warm-beige/20 bg-cream px-4 py-5 md:hidden">
          <SearchBar placeholder="Search..." onSubmitted={() => setIsMobileMenuOpen(false)} />
          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'font-body text-text/75 transition-colors hover:text-primary',
                  isActive(link.href) && 'font-medium text-primary'
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
                  className="font-body text-text/75 transition-colors hover:text-primary"
                >
                  My Orders
                </Link>
                <Link href="/profile" className="pt-1" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="small" fullWidth>
                    My Profile
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/login" className="pt-1" onClick={() => setIsMobileMenuOpen(false)}>
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
