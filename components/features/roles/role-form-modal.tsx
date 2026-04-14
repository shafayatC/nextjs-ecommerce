'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Role } from '@/lib/mock-data';

interface RoleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  role?: Role | null;
  onSave: (role: Partial<Role>) => void;
}

const permissionGroups = {
  Dashboard: ['View Dashboard'],
  Users: ['View Users', 'Create Users', 'Edit Users', 'Delete Users'],
  Roles: ['View Roles', 'Create Roles', 'Edit Roles', 'Delete Roles'],
  Products: ['View Products', 'Create Products', 'Edit Products', 'Delete Products'],
  Categories: ['View Categories', 'Create Categories', 'Edit Categories', 'Delete Categories'],
  Brands: ['View Brands', 'Create Brands', 'Edit Brands', 'Delete Brands'],
  Media: ['View Media', 'Upload Media', 'Delete Media'],
};

export function RoleFormModal({ isOpen, onClose, role, onSave }: RoleFormModalProps) {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions || [],
  });

  const handlePermissionToggle = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={role ? 'Edit Role' : 'Create Role'}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{role ? 'Update' : 'Create'}</Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Role Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter role name"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Description</label>
          <Input
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter role description"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Permissions</label>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {Object.entries(permissionGroups).map(([group, perms]) => (
              <div key={group}>
                <h4 className="text-sm font-medium mb-2">{group}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {perms.map((perm) => (
                    <Checkbox
                      key={perm}
                      label={perm}
                      checked={formData.permissions.includes(perm.toLowerCase().replace(/ /g, '.'))}
                      onChange={() => handlePermissionToggle(perm.toLowerCase().replace(/ /g, '.'))}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
