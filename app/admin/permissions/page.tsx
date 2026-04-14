'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const ROLES = ['Admin', 'Editor', 'Viewer', 'Manager'];

const MODULES = [
  {
    name: 'Dashboard',
    permissions: ['View Dashboard'],
  },
  {
    name: 'Users',
    permissions: ['View Users', 'Create Users', 'Edit Users', 'Delete Users'],
  },
  {
    name: 'Products',
    permissions: ['View Products', 'Create Products', 'Edit Products', 'Delete Products'],
  },
  {
    name: 'Orders',
    permissions: ['View Orders', 'Create Orders', 'Edit Orders', 'Delete Orders'],
  },
  {
    name: 'Settings',
    permissions: ['View Settings', 'Edit Settings'],
  },
];

const PERMISSION_KEYS: Record<string, string> = {
  'View Dashboard': 'dashboard.view',
  'View Users': 'users.view',
  'Create Users': 'users.create',
  'Edit Users': 'users.edit',
  'Delete Users': 'users.delete',
  'View Products': 'products.view',
  'Create Products': 'products.create',
  'Edit Products': 'products.edit',
  'Delete Products': 'products.delete',
  'View Orders': 'orders.view',
  'Create Orders': 'orders.create',
  'Edit Orders': 'orders.edit',
  'Delete Orders': 'orders.delete',
  'View Settings': 'settings.view',
  'Edit Settings': 'settings.edit',
};

// Admin has all permissions, Editor has view + create + edit, Viewer read-only, Manager view + edit
const DEFAULT_ROLE_PERMISSIONS: Record<string, string[]> = {
  Admin: MODULES.flatMap(m => m.permissions),
  Editor: ['View Dashboard', 'View Users', 'View Products', 'Create Products', 'Edit Products', 'View Orders', 'View Settings', 'Edit Settings'],
  Viewer: ['View Dashboard', 'View Users', 'View Products', 'View Orders', 'View Settings'],
  Manager: ['View Dashboard', 'View Users', 'Edit Users', 'View Products', 'Edit Products', 'View Orders', 'Edit Orders', 'View Settings', 'Edit Settings'],
};

function buildDefaultMatrix(): Record<string, Record<string, boolean>> {
  const matrix: Record<string, Record<string, boolean>> = {};
  ROLES.forEach(role => {
    matrix[role] = {};
    MODULES.forEach(mod => {
      mod.permissions.forEach(perm => {
        matrix[role][perm] = (DEFAULT_ROLE_PERMISSIONS[role] ?? []).includes(perm);
      });
    });
  });
  return matrix;
}

export default function AdminPermissionsPage() {
  const [matrix, setMatrix] = React.useState<Record<string, Record<string, boolean>>>(buildDefaultMatrix);
  const [saved, setSaved] = React.useState(false);

  const togglePermission = (role: string, permission: string) => {
    setMatrix(prev => ({
      ...prev,
      [role]: { ...prev[role], [permission]: !prev[role][permission] },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const isAllChecked = (role: string) => {
    return MODULES.flatMap(m => m.permissions).every(p => matrix[role][p]);
  };

  const toggleRoleAll = (role: string) => {
    const allChecked = isAllChecked(role);
    setMatrix(prev => {
      const updated = { ...prev };
      MODULES.flatMap(m => m.permissions).forEach(p => {
        updated[role][p] = !allChecked;
      });
      return updated;
    });
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/' }, { label: 'Permissions' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Permission Matrix</h1>
          <p className="text-muted-foreground mt-1">Manage access control per role</p>
        </div>
        <Button onClick={handleSave}>{saved ? '✓ Saved!' : 'Save Changes'}</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-sm w-48">Permission</th>
                  {ROLES.map(role => (
                    <th key={role} className="text-center p-4 font-medium text-sm min-w-[120px]">
                      <div className="flex flex-col items-center gap-2">
                        <span>{role}</span>
                        <button
                          onClick={() => toggleRoleAll(role)}
                          className="text-xs text-muted-foreground hover:text-foreground underline"
                        >
                          {isAllChecked(role) ? 'Uncheck all' : 'Check all'}
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MODULES.map(mod => (
                  <React.Fragment key={mod.name}>
                    <tr className="bg-muted/30">
                      <td colSpan={ROLES.length + 1} className="px-4 py-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {mod.name}
                        </span>
                      </td>
                    </tr>
                    {mod.permissions.map(perm => (
                      <tr key={perm} className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-4 pl-6 text-sm">{perm}</td>
                        {ROLES.map(role => (
                          <td key={role} className="text-center p-4">
                            <div className="flex justify-center">
                              <Checkbox
                                checked={matrix[role][perm]}
                                onChange={() => togglePermission(role, perm)}
                                className="rounded"
                              />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}