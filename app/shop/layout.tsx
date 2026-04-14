'use client';

import * as React from 'react';
import { ShopNavbar } from '@/components/shop/shop-navbar';
import { ShopFooter } from '@/components/shop/shop-footer';
import { CartDrawer } from '@/components/shop/cart-drawer';
import { shopCartItems } from '@/lib/shop-data';
import type { CartItem } from '@/lib/shop-data';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartItem[]>(shopCartItems);

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const addToCart = (productId: string, name: string, price: number, salePrice: number | undefined, image: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, name, price, salePrice, quantity: 1, image }];
    });
    setCartOpen(true);
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ShopNavbar cartCount={totalCount} onCartOpen={() => setCartOpen(true)} />
      <main className="flex-1">
        {children}
      </main>
      <ShopFooter />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </div>
  );
}
