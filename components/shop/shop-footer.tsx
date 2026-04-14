'use client';

import * as React from 'react';
import Link from 'next/link';

export function ShopFooter() {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">BD</span>
              </div>
              <span className="font-bold text-lg">BDShop</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted online shopping destination in Bangladesh. Quality products, fast delivery, and excellent service.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {/* Social icons */}
              {['facebook', 'twitter', 'instagram', 'youtube'].map(social => (
                <button key={social} className="w-8 h-8 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <span className="text-xs text-muted-foreground uppercase">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop/products?category=electronics" className="hover:text-foreground transition-colors">Electronics</Link></li>
              <li><Link href="/shop/products?category=fashion" className="hover:text-foreground transition-colors">Fashion</Link></li>
              <li><Link href="/shop/products?category=home-living" className="hover:text-foreground transition-colors">Home & Living</Link></li>
              <li><Link href="/shop/products?category=beauty" className="hover:text-foreground transition-colors">Beauty</Link></li>
              <li><Link href="/shop/products" className="hover:text-foreground transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Return Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 BDShop. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>💳 We accept</span>
            <span className="font-semibold">VISA</span>
            <span className="font-semibold">Mastercard</span>
            <span className="font-semibold">bKash</span>
            <span className="font-semibold">Nagad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
