'use client';

import * as React from 'react';
import { Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination';
import { FilterSidebar } from '@/components/shop/filter-sidebar';
import { ProductGrid } from '@/components/shop/product-grid';
import { ShopBreadcrumb } from '@/components/shop/shop-breadcrumb';
import { QuickViewModal } from '@/components/shop/quick-view-modal';
import { shopProducts } from '@/lib/shop-data';
import type { ShopProduct } from '@/lib/shop-data';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Popularity' },
];

const PAGE_SIZE = 12;

export default function ShopProductsPage() {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [brands, setBrands] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState({ min: '', max: '' });
  const [sort, setSort] = React.useState('newest');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [page, setPage] = React.useState(1);
  const [quickViewProduct, setQuickViewProduct] = React.useState<ShopProduct | null>(null);

  const filteredProducts = React.useMemo(() => {
    let filtered = [...shopProducts];

    if (categories.length > 0) {
      filtered = filtered.filter(p => categories.includes(p.category));
    }
    if (brands.length > 0) {
      filtered = filtered.filter(p => brands.includes(p.brand));
    }
    if (priceRange.min) {
      filtered = filtered.filter(p => (p.salePrice ?? p.price) >= Number(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(p => (p.salePrice ?? p.price) <= Number(priceRange.max));
    }

    switch (sort) {
      case 'price-low':
        filtered.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return filtered;
  }, [categories, brands, priceRange, sort]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCategoryChange = (cat: string) => {
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
    setPage(1);
  };

  const handleBrandChange = (brand: string) => {
    setBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setPage(1);
  };

  const handleReset = () => {
    setCategories([]);
    setBrands([]);
    setPriceRange({ min: '', max: '' });
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <ShopBreadcrumb items={[{ label: 'Products' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">All Products</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Showing {paginatedProducts.length} of {filteredProducts.length} products
          </p>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="flex gap-6">
        <FilterSidebar
          selectedCategories={categories}
          selectedBrands={brands}
          priceRange={priceRange}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          onPriceRangeChange={(r) => { setPriceRange(r); setPage(1); }}
          onReset={handleReset}
        />

        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Sort by:</span>
              <select
                value={sort}
                onChange={e => { setSort(e.target.value); setPage(1); }}
                className="border rounded px-2 py-1 text-sm bg-background"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-medium mb-2">No products found</p>
              <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
              <Button variant="outline" onClick={handleReset}>Reset Filters</Button>
            </div>
          ) : (
            <ProductGrid
              products={paginatedProducts}
              columns={3}
              onQuickView={setQuickViewProduct}
            />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={() => {}}
      />
    </div>
  );
}
