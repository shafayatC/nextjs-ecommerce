'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { UserTable } from '@/components/features/users/user-table';
import { UserFilters } from '@/components/features/users/user-filters';
import { UserFormModal } from '@/components/features/users/user-form-modal';
import { users, User } from '@/lib/mock-data';

export default function UsersPage() {
  const [userList, setUserList] = useState(users);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = userList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUser = (userData: Partial<User>) => {
    if (selectedUser) {
      setUserList(userList.map(u => u.id === selectedUser.id ? { ...u, ...userData } as User : u));
    } else {
      const newUser: User = {
        id: String(userList.length + 1),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'Viewer',
        status: userData.status || 'Active',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUserList([...userList, newUser]);
    }
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUserList(userList.filter(u => u.id !== selectedUser.id));
    }
    setSelectedUser(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage your users and their roles</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <UserFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
      />

      <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredUsers.length} of {userList.length} users
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>

      <UserFormModal
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); setSelectedUser(null); }}
        user={null}
        onSave={handleSaveUser}
      />

      <UserFormModal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setSelectedUser(null); }}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setSelectedUser(null); }}
        title="Delete User"
        footer={
          <>
            <Button variant="outline" onClick={() => { setIsDeleteModalOpen(false); setSelectedUser(null); }}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{selectedUser?.name}</strong>? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
