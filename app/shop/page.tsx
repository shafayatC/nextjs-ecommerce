'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Clock, Truck, Shield, Smartphone, Shirt, Home, Sparkles, Dumbbell, BookOpen, Apple, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/shop/product-grid';
import { ShopBreadcrumb } from '@/components/shop/shop-breadcrumb';
import { shopCategories, shopProducts } from '@/lib/shop-data';
import type { ShopProduct } from '@/lib/shop-data';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Electronics: <Smartphone className="h-6 w-6" />,
  Fashion: <Shirt className="h-6 w-6" />,
  'Home & Living': <Home className="h-6 w-6" />,
  Beauty: <Sparkles className="h-6 w-6" />,
  Sports: <Dumbbell className="h-6 w-6" />,
  Books: <BookOpen className="h-6 w-6" />,
  Food: <Apple className="h-6 w-6" />,
  Services: <Briefcase className="h-6 w-6" />,
};

export default function ShopHomePage() {
  const [cartItems, setCartItems] = React.useState<Record<string, number>>({});

  const newArrivals = shopProducts.slice(0, 8);
  const bestSellers = shopProducts.slice(8, 16);

  const handleAddToCart = (product: ShopProduct) => {
    setCartItems(prev => ({
      ...prev,
      [product.id]: (prev[product.id] ?? 0) + 1,
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                <Zap className="h-4 w-4" />
                Summer Sale — Up to 50% Off
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Shop the Best
                <span className="text-primary"> Bangladeshi</span> Products
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover quality products from trusted local and international brands. Fast delivery across Bangladesh.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/shop/products">
                  <Button size="lg" className="gap-2">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/shop/products?category=fashion">
                  <Button variant="outline" size="lg">
                    Explore Fashion
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                <img
                  src="https://picsum.photos/seed/shophero/600/600"
                  alt="Shopping"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-background border rounded-xl shadow-lg p-3 flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Free Delivery</p>
                    <p className="text-sm font-semibold">All over Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features bar */}
        <div className="border-t bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Truck className="h-5 w-5 text-primary" />, title: 'Free Shipping', desc: 'Orders over ৳2,000' },
                { icon: <Shield className="h-5 w-5 text-primary" />, title: 'Secure Payment', desc: '100% protected' },
                { icon: <Zap className="h-5 w-5 text-primary" />, title: 'Flash Deals', desc: 'New offers daily' },
                { icon: <Clock className="h-5 w-5 text-primary" />, title: '24/7 Support', desc: 'Always here to help' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  {f.icon}
                  <div>
                    <p className="text-sm font-medium">{f.title}</p>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link href="/shop/products" className="text-sm text-primary font-medium hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {shopCategories.map(cat => (
            <Link
              key={cat.id}
              href={`/shop/products?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center text-center p-4 rounded-xl border hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                {CATEGORY_ICONS[cat.name] ?? <Smartphone className="h-6 w-6" />}
              </div>
              <p className="text-xs font-medium">{cat.name}</p>
              <p className="text-xs text-muted-foreground">{cat.productCount} items</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">🔥 Flash Sale!</h2>
              <p className="text-white/80">Grab the best deals before they are gone</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-3 py-2 text-2xl font-bold">12</div>
                <p className="text-xs text-white/70 mt-1">Hours</p>
              </div>
              <span className="text-2xl font-bold">:</span>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-3 py-2 text-2xl font-bold">45</div>
                <p className="text-xs text-white/70 mt-1">Minutes</p>
              </div>
              <span className="text-2xl font-bold">:</span>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-3 py-2 text-2xl font-bold">30</div>
                <p className="text-xs text-white/70 mt-1">Seconds</p>
              </div>
            </div>
            <Link href="/shop/products?sale=true">
              <Button variant="outline" size="lg" className="gap-2 whitespace-nowrap">
                Shop Sale <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Link href="/shop/products?sort=newest" className="text-sm text-primary font-medium hover:underline">
            View All →
          </Link>
        </div>
        <ProductGrid products={newArrivals} onAddToCart={handleAddToCart} columns={4} />
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Best Sellers</h2>
          <Link href="/shop/products?sort=popularity" className="text-sm text-primary font-medium hover:underline">
            View All →
          </Link>
        </div>
        <ProductGrid products={bestSellers} onAddToCart={handleAddToCart} columns={4} />
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Start Selling on BDShop</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of sellers and reach millions of customers across Bangladesh
          </p>
          <Button size="lg">Become a Seller</Button>
        </div>
      </section>
    </div>
  );
}
