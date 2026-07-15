'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Phone,
  MapPin,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useCategoryStore } from '@/store/category.store';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <header className="bg-cream border-b border-warm-beige/30">
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
                placeholder="Search for products, categories..."
                className="pl-10 bg-cream/80 border-warm-beige/40 rounded-full"
                leftIcon={<Search className="h-4 w-4 text-text/40" />}
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/account" className="text-text/70 hover:text-primary transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/wishlist" className="text-text/70 hover:text-primary transition-colors">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="text-text/70 hover:text-primary transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-cream">
                0
              </span>
            </Link>
            <Button variant="outline" size="small" className="hidden sm:flex">
              Login / Register
            </Button>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block md:hidden text-text/70 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Category Navigation - desktop */}
        <nav className="hidden md:flex items-center gap-6 py-2 text-sm font-medium text-text/80 border-t border-warm-beige/20">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/collections" className="hover:text-primary transition-colors">
            Collections
          </Link>
          <Link href="/artisans" className="hover:text-primary transition-colors">
            Artisans
          </Link>
          <Link href="/stories" className="hover:text-primary transition-colors">
            Stories
          </Link>
          <Link href="/offers" className="hover:text-primary transition-colors">
            Offers
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact Us
          </Link>
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
              placeholder="Search..."
              className="pl-10 bg-white"
              leftIcon={<Search className="h-4 w-4 text-text/40" />}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Link href="/" className="text-text hover:text-primary transition-colors">Home</Link>
            <Link href="/products" className="text-text hover:text-primary transition-colors">Shop</Link>
            <Link href="/collections" className="text-text hover:text-primary transition-colors">Collections</Link>
            <Link href="/artisans" className="text-text hover:text-primary transition-colors">Artisans</Link>
            <Link href="/stories" className="text-text hover:text-primary transition-colors">Stories</Link>
            <Link href="/offers" className="text-text hover:text-primary transition-colors">Offers</Link>
            <Link href="/about" className="text-text hover:text-primary transition-colors">About Us</Link>
            <Link href="/contact" className="text-text hover:text-primary transition-colors">Contact Us</Link>
            <Button variant="outline" size="small" fullWidth className="mt-2">
              Login / Register
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;