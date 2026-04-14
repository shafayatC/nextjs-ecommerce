'use client';

import * as React from 'react';
import { ProductCard } from './product-card';
import type { ShopProduct } from '@/lib/shop-data';

interface ProductGridProps {
  products: ShopProduct[];
  onAddToCart?: (product: ShopProduct) => void;
  onQuickView?: (product: ShopProduct) => void;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ProductGrid({ products, onAddToCart, onQuickView, columns = 3, className }: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className ?? ''}`}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
