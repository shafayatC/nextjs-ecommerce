'use client';

import * as React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PriceDisplay } from '@/components/ui/price-display';
import { Rating } from '@/components/ui/rating';
import { QuantitySelector } from './quantity-selector';
import type { ShopProduct } from '@/lib/shop-data';

interface QuickViewModalProps {
  product: ShopProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: ShopProduct, quantity: number) => void;
}

export function QuickViewModal({ product, isOpen, onClose, onAddToCart }: QuickViewModalProps) {
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    if (isOpen) setQuantity(1);
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-3xl bg-background rounded-xl shadow-xl overflow-hidden">
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6 p-6 pt-0">
          <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <Rating value={product.rating} showValue />
            <PriceDisplay
              price={product.price}
              salePrice={product.salePrice}
              size="lg"
              showDiscount
              discountPercent={product.discountPercent}
            />
            <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
            <div className="flex items-center gap-3">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <Button className="flex-1 gap-2" onClick={() => { onAddToCart(product, quantity); onClose(); }}>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
