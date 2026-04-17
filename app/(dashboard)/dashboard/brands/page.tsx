'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { BrandList } from '@/components/features/brands/brand-list';
import { brands, Brand } from '@/lib/mock-data';

export default function BrandsPage() {
  const [brandList, setBrandList] = useState(brands);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });

  const handleEdit = (brand: Brand) => {
    setSelectedBrand(brand);
    setFormData({ name: brand.name, slug: brand.slug });
    setIsEditModalOpen(true);
  };

  const handleDelete = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsDeleteModalOpen(true);
  };

  const handleSave = () => {
    if (selectedBrand) {
      setBrandList(brandList.map(b => b.id === selectedBrand.id ? { ...b, ...formData } as Brand : b));
    } else {
      const newBrand: Brand = {
        id: String(brandList.length + 1),
        name: formData.name,
        slug: formData.slug,
        productCount: 0,
      };
      setBrandList([...brandList, newBrand]);
    }
    setFormData({ name: '', slug: '' });
    setSelectedBrand(null);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedBrand) {
      setBrandList(brandList.filter(b => b.id !== selectedBrand.id));
    }
    setSelectedBrand(null);
    setIsDeleteModalOpen(false);
  };

  const openAddModal = () => {
    setFormData({ name: '', slug: '' });
    setSelectedBrand(null);
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Brand Management</h1>
          <p className="text-muted-foreground mt-1">Manage product brands</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="h-4 w-4 mr-2" />
          Add Brand
        </Button>
      </div>

      <BrandList brands={brandList} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setSelectedBrand(null); }}
        title={selectedBrand ? 'Edit Brand' : 'Add Brand'}
        footer={
          <>
            <Button variant="outline" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setSelectedBrand(null); }}>
              Cancel
            </Button>
            <Button onClick={handleSave}>{selectedBrand ? 'Update' : 'Create'}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter brand name"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Slug</label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="brand-slug"
              required
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setSelectedBrand(null); }}
        title="Delete Brand"
        footer={
          <>
            <Button variant="outline" onClick={() => { setIsDeleteModalOpen(false); setSelectedBrand(null); }}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{selectedBrand?.name}</strong>? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
