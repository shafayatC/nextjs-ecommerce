'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { RoleList } from '@/components/features/roles/role-list';
import { RoleFormModal } from '@/components/features/roles/role-form-modal';
import { roles, Role } from '@/lib/mock-data';

export default function RolesPage() {
  const [roleList, setRoleList] = useState(roles);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const handleDelete = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteModalOpen(true);
  };

  const handleSaveRole = (roleData: Partial<Role>) => {
    if (selectedRole) {
      setRoleList(roleList.map(r => r.id === selectedRole.id ? { ...r, ...roleData } as Role : r));
    } else {
      const newRole: Role = {
        id: String(roleList.length + 1),
        name: roleData.name || '',
        description: roleData.description || '',
        userCount: 0,
        permissions: roleData.permissions || [],
      };
      setRoleList([...roleList, newRole]);
    }
    setSelectedRole(null);
  };

  const handleConfirmDelete = () => {
    if (selectedRole) {
      setRoleList(roleList.filter(r => r.id !== selectedRole.id));
    }
    setSelectedRole(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Role Management</h1>
          <p className="text-muted-foreground mt-1">Manage roles and their permissions</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      <RoleList roles={roleList} onEdit={handleEdit} onDelete={handleDelete} />

      <RoleFormModal
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); setSelectedRole(null); }}
        role={null}
        onSave={handleSaveRole}
      />

      <RoleFormModal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setSelectedRole(null); }}
        role={selectedRole}
        onSave={handleSaveRole}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setSelectedRole(null); }}
        title="Delete Role"
        footer={
          <>
            <Button variant="outline" onClick={() => { setIsDeleteModalOpen(false); setSelectedRole(null); }}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete the role <strong>{selectedRole?.name}</strong>? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
