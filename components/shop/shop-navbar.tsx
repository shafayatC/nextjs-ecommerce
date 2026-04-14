'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Heart, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface CartItemCount {
  count: number;
}

interface ShopNavbarProps {
  cartCount?: number;
  onCartOpen?: () => void;
}

export function ShopNavbar({ cartCount = 0, onCartOpen }: ShopNavbarProps) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [accountOpen, setAccountOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/shop" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">BD</span>
            </div>
            <span className="font-bold text-lg hidden sm:block">BDShop</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/shop/products" className="text-sm font-medium hover:text-primary transition-colors">Products</Link>
            <Link href="/shop/orders" className="text-sm font-medium hover:text-primary transition-colors">Orders</Link>
            <Link href="/shop/account" className="text-sm font-medium hover:text-primary transition-colors">Account</Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden sm:block relative w-48 lg:w-64">
              <Input
                placeholder="Search products..."
                className="h-9 pr-9 text-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden h-9 w-9 p-0"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
              <Heart className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 relative"
              onClick={onCartOpen}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Button>

            {/* Account */}
            <div className="hidden md:block relative">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 gap-1"
                onClick={() => setAccountOpen(!accountOpen)}
              >
                <User className="h-4 w-4" />
                <span className="text-sm">Account</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
              {accountOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-background border rounded-lg shadow-lg py-1 z-50">
                  <Link href="/shop/account" className="block px-4 py-2 text-sm hover:bg-muted" onClick={() => setAccountOpen(false)}>Profile</Link>
                  <Link href="/shop/orders" className="block px-4 py-2 text-sm hover:bg-muted" onClick={() => setAccountOpen(false)}>My Orders</Link>
                  <Link href="/shop/account" className="block px-4 py-2 text-sm hover:bg-muted" onClick={() => setAccountOpen(false)}>Settings</Link>
                  <div className="border-t my-1" />
                  <button className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted">Logout</button>
                </div>
              )}
            </div>

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-9 w-9 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="sm:hidden pb-3">
            <Input
              placeholder="Search products..."
              className="h-9"
              autoFocus
            />
          </div>
        )}

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t py-3 flex flex-col gap-2">
            <Link href="/shop" className="px-2 py-2 text-sm font-medium hover:bg-muted rounded" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/shop/products" className="px-2 py-2 text-sm font-medium hover:bg-muted rounded" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <Link href="/shop/orders" className="px-2 py-2 text-sm font-medium hover:bg-muted rounded" onClick={() => setMobileMenuOpen(false)}>Orders</Link>
            <Link href="/shop/account" className="px-2 py-2 text-sm font-medium hover:bg-muted rounded" onClick={() => setMobileMenuOpen(false)}>Account</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
