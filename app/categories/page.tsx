'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { CategoryList } from '@/components/features/categories/category-list';
import { categories, Category } from '@/lib/mock-data';

export default function CategoriesPage() {
  const [categoryList, setCategoryList] = useState(categories);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name, slug: category.slug });
    setIsEditModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleSave = () => {
    if (selectedCategory) {
      setCategoryList(categoryList.map(c => c.id === selectedCategory.id ? { ...c, ...formData } as Category : c));
    } else {
      const newCategory: Category = {
        id: String(categoryList.length + 1),
        name: formData.name,
        slug: formData.slug,
        productCount: 0,
      };
      setCategoryList([...categoryList, newCategory]);
    }
    setFormData({ name: '', slug: '' });
    setSelectedCategory(null);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      setCategoryList(categoryList.filter(c => c.id !== selectedCategory.id));
    }
    setSelectedCategory(null);
    setIsDeleteModalOpen(false);
  };

  const openAddModal = () => {
    setFormData({ name: '', slug: '' });
    setSelectedCategory(null);
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-muted-foreground mt-1">Manage product categories</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <CategoryList categories={categoryList} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setSelectedCategory(null); }}
        title={selectedCategory ? 'Edit Category' : 'Add Category'}
        footer={
          <>
            <Button variant="outline" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setSelectedCategory(null); }}>
              Cancel
            </Button>
            <Button onClick={handleSave}>{selectedCategory ? 'Update' : 'Create'}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter category name"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Slug</label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="category-slug"
              required
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setSelectedCategory(null); }}
        title="Delete Category"
        footer={
          <>
            <Button variant="outline" onClick={() => { setIsDeleteModalOpen(false); setSelectedCategory(null); }}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{selectedCategory?.name}</strong>? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
