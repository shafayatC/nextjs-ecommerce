'use client';

import * as React from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { shopCategories } from '@/lib/shop-data';

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: { min: string; max: string };
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceRangeChange: (range: { min: string; max: string }) => void;
  onReset: () => void;
}

const BRANDS = ['Walton', 'Singer', 'Samsung', 'Apple', 'Apex', 'Puma', 'Nike', 'Aarong', 'Bashundhara', 'RFL', 'Yamaha', 'LUX', 'DBBL', 'Fair & Lovely', 'Oxford', 'Local Farm', 'Local Brand'];

export function FilterSidebar({
  isOpen = false,
  onClose,
  selectedCategories,
  selectedBrands,
  priceRange,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onReset,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(isOpen);

  React.useEffect(() => {
    setMobileOpen(isOpen);
  }, [isOpen]);

  const hasFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange.min || priceRange.max;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Categories</h3>
        <div className="space-y-2">
          {shopCategories.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.name)}
                onChange={() => onCategoryChange(cat.name)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm flex-1">{cat.name}</span>
              <span className="text-xs text-muted-foreground">({cat.productCount})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Brands</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {BRANDS.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onBrandChange(brand)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Min"
            value={priceRange.min}
            onChange={e => onPriceRangeChange({ ...priceRange, min: e.target.value })}
            className="h-9 text-sm"
          />
          <span className="text-muted-foreground">—</span>
          <Input
            placeholder="Max"
            value={priceRange.max}
            onChange={e => onPriceRangeChange({ ...priceRange, max: e.target.value })}
            className="h-9 text-sm"
          />
        </div>
      </div>

      {hasFilters && (
        <Button variant="outline" size="sm" onClick={onReset} className="w-full">
          Reset Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <h2 className="font-semibold mb-4">Filters</h2>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile filter button + bottom sheet */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
        <Button onClick={() => setMobileOpen(true)} className="gap-2 shadow-lg">
          Filters
          {hasFilters && (
            <span className="bg-white/20 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {selectedCategories.length + selectedBrands.length}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile bottom sheet */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={() => setMobileOpen(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
}
