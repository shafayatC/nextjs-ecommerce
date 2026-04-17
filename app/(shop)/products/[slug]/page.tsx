'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, ShoppingCart, ChevronLeft, Check, Truck, RotateCcw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PriceDisplay } from '@/components/ui/price-display';
import { Rating } from '@/components/ui/rating';
import { QuantitySelector } from '@/components/shop/quantity-selector';
import { ProductGrid } from '@/components/shop/product-grid';
import { ShopBreadcrumb } from '@/components/shop/shop-breadcrumb';
import { shopProducts } from '@/lib/shop-data';
import type { ShopProduct } from '@/lib/shop-data';

const MOCK_REVIEWS = [
  { id: '1', name: 'Rahim Ahmed', rating: 5, date: '2024-06-10', comment: 'Excellent product! Delivery was fast and the quality exceeded my expectations. Highly recommended.' },
  { id: '2', name: 'Fatima Begum', rating: 4, date: '2024-06-08', comment: 'Good quality product. The packaging was a bit damaged during shipping but the product itself is great.' },
  { id: '3', name: 'Kamal Hossain', rating: 5, date: '2024-06-05', comment: 'Best purchase I made this month. Works perfectly and the price is very reasonable.' },
  { id: '4', name: 'Nadia Islam', rating: 4, date: '2024-06-01', comment: 'Very happy with this purchase. The product looks exactly like the pictures.' },
  { id: '5', name: 'Saif Rahman', rating: 5, date: '2024-05-28', comment: 'Outstanding quality and fast delivery. Will definitely buy again!' },
];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = shopProducts.find(p => p.slug === slug);

  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState('description');
  const [wishlisted, setWishlisted] = React.useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products"><Button>Browse Products</Button></Link>
      </div>
    );
  }

  const relatedProducts = shopProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const savings = product.salePrice ? product.price - product.salePrice : 0;
  const allImages = product.images.length > 0 ? product.images : ['https://picsum.photos/seed/default/600/600'];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <ShopBreadcrumb items={[{ label: 'Products', href: '/products' }, { label: product.category }, { label: product.name }]} />

      {/* Back button */}
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> Back to Products
      </Link>

      {/* Product detail */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted/30 rounded-xl overflow-hidden border">
            <img
              src={allImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition-colors ${
                    selectedImage === idx ? 'border-primary' : 'border-transparent hover:border-muted'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          </div>

          <div className="flex items-center gap-3">
            <Rating value={product.rating} showValue />
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="space-y-1">
            <PriceDisplay
              price={product.price}
              salePrice={product.salePrice}
              size="lg"
              showDiscount
              discountPercent={product.discountPercent}
            />
            {savings > 0 && (
              <p className="text-sm text-green-600 font-medium">
                You save ৳{savings.toLocaleString()}
              </p>
            )}
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-green-600 font-medium">In Stock ({product.stock} available)</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <QuantitySelector value={quantity} onChange={setQuantity} size="md" />
              <Button
                size="lg"
                className="flex-1 gap-2"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="gap-2" onClick={() => setWishlisted(!wishlisted)}>
                <Heart className={`h-5 w-5 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
            <Button variant="outline" size="lg" className="w-full">
              Buy Now
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t">
            {[
              { icon: <Truck className="h-4 w-4" />, text: 'Free Delivery' },
              { icon: <RotateCcw className="h-4 w-4" />, text: '7 Day Returns' },
              { icon: <Shield className="h-4 w-4" />, text: 'Warranty' },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-primary mb-1">{f.icon}</div>
                <p className="text-xs font-medium">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Description, Reviews, Shipping */}
      <div className="pt-8">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold mb-3">Product Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex gap-2 text-sm"><span className="font-medium">Brand:</span><span className="text-muted-foreground">{product.brand}</span></div>
                <div className="flex gap-2 text-sm"><span className="font-medium">Category:</span><span className="text-muted-foreground">{product.category}</span></div>
                <div className="flex gap-2 text-sm"><span className="font-medium">SKU:</span><span className="text-muted-foreground font-mono">SKU-{product.id.padStart(4, '0')}</span></div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {MOCK_REVIEWS.map(review => (
                <div key={review.id} className="bg-card border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">{review.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <span className="text-sm font-medium">{review.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Rating value={review.rating} size="sm" readonly />
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipping">
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold">Shipping Information</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• <strong className="text-foreground">Dhaka:</strong> Delivery within 1-2 business days (৳60)</p>
                <p>• <strong className="text-foreground">Chittagong:</strong> Delivery within 2-3 business days (৳120)</p>
                <p>• <strong className="text-foreground">Other Cities:</strong> Delivery within 3-5 business days (৳150)</p>
                <p>• <strong className="text-foreground">Free Shipping:</strong> On orders over ৳2,000</p>
              </div>
              <h3 className="font-semibold pt-2">Return Policy</h3>
              <p className="text-sm text-muted-foreground">
                We offer a 7-day return policy for most items. Products must be returned in their original condition with all tags and packaging intact. Refunds will be processed within 5-7 business days after we receive the return.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      )}
    </div>
  );
}
