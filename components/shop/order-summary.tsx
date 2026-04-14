'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  items: CartItem[];
  shipping?: number;
  discount?: number;
  className?: string;
}

export function OrderSummary({ items, shipping = 0, discount = 0, className }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => {
    const price = item.salePrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);

  const total = subtotal - discount + shipping;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          {items.map(item => (
            <div key={item.productId} className="flex justify-between">
              <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
              <span className="font-medium">
                ৳{((item.salePrice ?? item.price) * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">৳{subtotal.toLocaleString()}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span className="font-medium">-৳{discount.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? 'Free' : `৳${shipping.toLocaleString()}`}
            </span>
          </div>

          <div className="flex justify-between text-base font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-primary">৳{total.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
