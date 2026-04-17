'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ProductTable } from '@/components/features/products/product-table';
import { ProductFormModal } from '@/components/features/products/product-form-modal';
import { products, Product, categories, brands } from '@/lib/mock-data';

export default function ProductsPage() {
  const [productList, setProductList] = useState(products);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');

  const filteredProducts = productList.filter(product => {
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesBrand = brandFilter === 'all' || product.brand === brandFilter;
    return matchesCategory && matchesBrand;
  });

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (selectedProduct) {
      setProductList(productList.map(p => p.id === selectedProduct.id ? { ...p, ...productData } as Product : p));
    } else {
      const newProduct: Product = {
        id: String(productList.length + 1),
        name: productData.name || '',
        slug: productData.slug || '',
        category: productData.category || '',
        brand: productData.brand || '',
        price: productData.price || 0,
        stock: productData.stock || 0,
        description: productData.description || '',
        status: productData.status || 'Active',
      };
      setProductList([...productList, newProduct]);
    }
    setSelectedProduct(null);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      setProductList(productList.filter(p => p.id !== selectedProduct.id));
    }
    setSelectedProduct(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground mt-1">Manage your products and inventory</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          options={[{ value: 'all', label: 'All Categories' }, ...categories.map(c => ({ value: c.name, label: c.name }))]}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-48"
        />
        <Select
          options={[{ value: 'all', label: 'All Brands' }, ...brands.map(b => ({ value: b.name, label: b.name }))]}
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="w-full sm:w-48"
        />
      </div>

      <ProductTable
        products={filteredProducts}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductFormModal
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); setSelectedProduct(null); }}
        product={null}
        onSave={handleSaveProduct}
      />

      <ProductFormModal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setSelectedProduct(null); }}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setSelectedProduct(null); }}
        title="Delete Product"
        footer={
          <>
            <Button variant="outline" onClick={() => { setIsDeleteModalOpen(false); setSelectedProduct(null); }}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{selectedProduct?.name}</strong>? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
