'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  salePrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  discountPercent?: number;
  className?: string;
}

export function PriceDisplay({
  price,
  salePrice,
  currency = '৳',
  size = 'md',
  showDiscount = false,
  discountPercent,
  className,
}: PriceDisplayProps) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl font-bold',
  };

  const hasDiscount = salePrice && salePrice < price;
  const discount = discountPercent ?? (hasDiscount ? Math.round(((price - salePrice!) / price) * 100) : 0);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {hasDiscount ? (
        <>
          <span className={cn('font-bold text-primary', sizes[size])}>
            {currency}{salePrice?.toLocaleString()}
          </span>
          <span className={cn('text-muted-foreground line-through text-sm', sizes[size] === 'lg' && 'text-base')}>
            {currency}{price.toLocaleString()}
          </span>
          {showDiscount && discount > 0 && (
            <span className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950 px-1.5 py-0.5 rounded">
              -{discount}%
            </span>
          )}
        </>
      ) : (
        <span className={cn('font-semibold', sizes[size])}>
          {currency}{price.toLocaleString()}
        </span>
      )}
    </div>
  );
}
