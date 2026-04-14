'use client';

import * as React from 'react';
import Link from 'next/link';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShopBreadcrumb } from '@/components/shop/shop-breadcrumb';
import { OrderSummary } from '@/components/shop/order-summary';
import { shopCartItems } from '@/lib/shop-data';
import type { CartItem } from '@/lib/shop-data';

export default function CheckoutPage() {
  const [items] = React.useState<CartItem[]>(shopCartItems);
  const [paymentMethod, setPaymentMethod] = React.useState('cod');
  const [showCardForm, setShowCardForm] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const subtotal = items.reduce((sum, item) => {
    const price = item.salePrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);
  const shipping = subtotal > 2000 ? 0 : 100;
  const total = subtotal + shipping;

  const handlePaymentChange = (method: string) => {
    setPaymentMethod(method);
    setShowCardForm(method === 'card');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-2">Your order has been confirmed.</p>
        <p className="text-muted-foreground mb-6">Order ID: <span className="font-mono font-medium">ORD-2024-007</span></p>
        <div className="flex gap-3 justify-center">
          <Link href="/shop/orders">
            <Button>View Orders</Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <ShopBreadcrumb items={[{ label: 'Cart', href: '/shop/cart' }, { label: 'Checkout' }]} />

      <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-6">
        {/* Left: Shipping + Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" /> Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Full Name</label>
                  <Input placeholder="Enter your full name" defaultValue="Rahim Ahmed" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone</label>
                  <Input placeholder="+880 1XXX-XXXXXX" defaultValue="+880 1711-123456" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Address</label>
                <Input placeholder="House #, Road #, Area" defaultValue="House 12, Road 5, Dhanmondi" required />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">City</label>
                  <Input placeholder="City" defaultValue="Dhaka" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Area</label>
                  <Input placeholder="Area" defaultValue="Dhanmondi" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Postal Code</label>
                  <Input placeholder="1205" defaultValue="1205" required />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => handlePaymentChange('cod')}
                    className="h-4 w-4 text-primary"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground">Pay when you receive your order</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => handlePaymentChange('card')}
                    className="h-4 w-4 text-primary"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Credit / Debit Card</p>
                    <p className="text-xs text-muted-foreground">Visa, Mastercard, etc.</p>
                  </div>
                </label>
              </div>

              {showCardForm && (
                <div className="border rounded-lg p-4 space-y-4 bg-muted/20">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Card Number</label>
                    <Input placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Expiry Date</label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">CVV</label>
                      <Input placeholder="123" type="password" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Cardholder Name</label>
                    <Input placeholder="Name on card" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Order Summary */}
        <div className="space-y-4">
          <OrderSummary items={items} shipping={shipping} discount={0} />
          <Button type="submit" className="w-full" size="lg">
            Place Order — ৳{total.toLocaleString()}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            By placing your order, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </form>
    </div>
  );
}
