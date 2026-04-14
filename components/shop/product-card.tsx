'use client';

import * as React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PriceDisplay } from '@/components/ui/price-display';
import { Rating } from '@/components/ui/rating';
import { Button } from '@/components/ui/button';
import type { ShopProduct } from '@/lib/shop-data';

interface ProductCardProps {
  product: ShopProduct;
  onAddToCart?: (product: ShopProduct) => void;
  onQuickView?: (product: ShopProduct) => void;
}

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [wishlisted, setWishlisted] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <Link href={`/shop/products/${product.slug}`} className="group block">
      <div className="border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-all duration-200 hover:border-primary/30">
        {/* Image */}
        <div className="relative aspect-square bg-muted/30 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discountPercent && product.discountPercent > 0 && (
            <Badge variant="danger" className="absolute top-2 left-2">
              -{product.discountPercent}%
            </Badge>
          )}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
              className={`w-8 h-8 rounded-full bg-background/90 flex items-center justify-center shadow hover:bg-background transition-colors ${wishlisted ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <Heart className="h-4 w-4" fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); onQuickView?.(product); }}
              className="w-8 h-8 rounded-full bg-background/90 flex items-center justify-center shadow hover:bg-background transition-colors text-muted-foreground"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 space-y-2">
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <h3 className="font-medium text-sm line-clamp-2 leading-tight">{product.name}</h3>
          <Rating value={product.rating} size="sm" showValue />
          <PriceDisplay
            price={product.price}
            salePrice={product.salePrice}
            size="sm"
            showDiscount
            discountPercent={product.discountPercent}
          />
          <Button
            size="sm"
            className="w-full h-8 text-xs gap-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3 w-3" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
