'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Modal } from '@/components/ui/modal';
import { MenuBuilder } from '@/components/features/menu/menu-builder';
import { MenuItemForm } from '@/components/features/menu/menu-item-form';
import type { MenuItem } from '@/lib/menu-types';
import { MenuList } from '@/components/features/menu/menu-list';


const initialMenuItems: MenuItem[] = [
  {
    id: '1', name: 'Dashboard', icon: 'home', route: '/', parentId: null, enabled: true, roles: ['Admin', 'Editor', 'Viewer'],
    children: [],
  },
  {
    id: '2', name: 'User Management', icon: 'users', route: '/users', parentId: null, enabled: true, roles: ['Admin'],
    children: [
      { id: '2a', name: 'All Users', icon: 'list', route: '/users', parentId: '2', enabled: true, roles: ['Admin'], children: [] },
      { id: '2b', name: 'Add User', icon: 'user-plus', route: '/users/new', parentId: '2', enabled: true, roles: ['Admin'], children: [] },
    ],
  },
  {
    id: '3', name: 'Products', icon: 'package', route: '/products', parentId: null, enabled: true, roles: ['Admin', 'Editor'],
    children: [
      { id: '3a', name: 'All Products', icon: 'list', route: '/products', parentId: '3', enabled: true, roles: ['Admin', 'Editor'], children: [] },
      { id: '3b', name: 'Categories', icon: 'tags', route: '/categories', parentId: '3', enabled: true, roles: ['Admin'], children: [] },
      { id: '3c', name: 'Brands', icon: 'building', route: '/brands', parentId: '3', enabled: true, roles: ['Admin'], children: [] },
    ],
  },
  {
    id: '4', name: 'Orders', icon: 'shopping-cart', route: '/orders', parentId: null, enabled: true, roles: ['Admin', 'Editor', 'Viewer'],
    children: [],
  },
  {
    id: '5', name: 'Reports', icon: 'bar-chart', route: '/reports', parentId: null, enabled: false, roles: ['Admin'],
    children: [],
  },
  {
    id: '6', name: 'Settings', icon: 'settings', route: '/settings', parentId: null, enabled: true, roles: ['Admin'],
    children: [
      { id: '6a', name: 'General', icon: 'sliders', route: '/settings', parentId: '6', enabled: true, roles: ['Admin'], children: [] },
      { id: '6b', name: 'Menu', icon: 'menu', route: '/admin/menu', parentId: '6', enabled: true, roles: ['Admin'], children: [] },
    ],
  },
  {
    id: '7', name: 'Media Gallery', icon: 'image', route: '/media', parentId: null, enabled: true, roles: ['Admin', 'Editor'],
    children: [],
  },
  {
    id: '8', name: 'Activity Logs', icon: 'activity', route: '/admin/activity', parentId: null, enabled: true, roles: ['Admin'],
    children: [],
  },
];

export default function MenuPage() {
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>(initialMenuItems);
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<MenuItem | null>(null);
  const [addParentId, setAddParentId] = React.useState<string | null>(null);
  const [view, setView] = React.useState<'builder' | 'list'>('builder');

  const handleAdd = (parentId: string | null = null) => {
    setEditingItem(null);
    setAddParentId(parentId);
    setFormOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setAddParentId(null);
    setFormOpen(true);
  };

  const handleSave = (itemData: Omit<MenuItem, 'id' | 'children'>) => {
    if (editingItem) {
      setMenuItems(prev => updateItem(prev, editingItem.id, itemData));
    } else {
      const newItem: MenuItem = {
        ...itemData,
        id: Math.random().toString(36).substr(2, 9),
        children: [],
      };
      setMenuItems(prev => addItem(prev, addParentId, newItem));
    }
    setFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setMenuItems(prev => deleteItem(prev, id));
  };

  const handleMove = (dragId: string, dropId: string) => {
    setMenuItems(prev => {
      const dragItem = findItem(prev, dragId);
      if (!dragItem) return prev;
      const removed = removeItem(prev, dragId);
      return addItemToParent(removed, dropId, dragItem);
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/' }, { label: 'Menu Management' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <p className="text-muted-foreground mt-1">Configure your admin sidebar navigation</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === 'builder' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('builder')}
          >
            Builder
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('list')}
          >
            List
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{view === 'builder' ? 'Menu Builder' : 'Menu Items'}</CardTitle>
        </CardHeader>
        <CardContent>
          {view === 'builder' ? (
            <MenuBuilder
              items={menuItems}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMove={handleMove}
            />
          ) : (
            <MenuList
              items={menuItems}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={() => {}}
            />
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
      >
        <MenuItemForm
          item={editingItem}
          parentId={addParentId}
          items={menuItems}
          onSave={handleSave}
          onClose={() => setFormOpen(false)}
        />
      </Modal>
    </div>
  );
}

function findItem(items: MenuItem[], id: string): MenuItem | null {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItem(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

function removeItem(items: MenuItem[], id: string): MenuItem[] {
  return items.filter(item => {
    if (item.id === id) return false;
    if (item.children) item.children = removeItem(item.children, id);
    return true;
  });
}

function updateItem(items: MenuItem[], id: string, data: Partial<MenuItem>): MenuItem[] {
  return items.map(item => {
    if (item.id === id) return { ...item, ...data };
    if (item.children) item.children = updateItem(item.children, id, data);
    return item;
  });
}

function addItem(items: MenuItem[], parentId: string | null, newItem: MenuItem): MenuItem[] {
  if (!parentId) return [...items, newItem];
  return items.map(item => {
    if (item.id === parentId) {
      return { ...item, children: [...item.children, newItem] };
    }
    if (item.children) return { ...item, children: addItem(item.children, parentId, newItem) };
    return item;
  });
}

function addItemToParent(items: MenuItem[], parentId: string, item: MenuItem): MenuItem[] {
  return items.map(it => {
    if (it.id === parentId) {
      return { ...it, children: [...it.children, item] };
    }
    if (it.children) return { ...it, children: addItemToParent(it.children, parentId, item) };
    return it;
  });
}

function deleteItem(items: MenuItem[], id: string): MenuItem[] {
  return items.filter(item => {
    if (item.id === id) return false;
    if (item.children) item.children = deleteItem(item.children, id);
    return true;
  });
}
