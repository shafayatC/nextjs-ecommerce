'use client';

import { PermissionGrid } from '@/components/features/permissions/permission-grid';

export default function PermissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Permission Management</h1>
        <p className="text-muted-foreground mt-1">Manage role permissions and access control</p>
      </div>

      <PermissionGrid />
    </div>
  );
}
