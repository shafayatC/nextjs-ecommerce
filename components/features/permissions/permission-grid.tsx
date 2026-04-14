'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { permissions, roles } from '@/lib/mock-data';

const modules = ['Dashboard', 'Users', 'Roles', 'Products', 'Categories', 'Brands', 'Media'];

export function PermissionGrid() {
  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>(
    roles.reduce((acc, role) => {
      acc[role.id] = role.permissions;
      return acc;
    }, {} as Record<string, string[]>)
  );

  const handlePermissionChange = (roleId: string, permission: string, checked: boolean) => {
    setRolePermissions(prev => ({
      ...prev,
      [roleId]: checked
        ? [...(prev[roleId] || []), permission]
        : (prev[roleId] || []).filter(p => p !== permission),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permission Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Permission</th>
                {roles.map(role => (
                  <th key={role.id} className="text-center py-3 px-4 font-medium">
                    <Badge variant="default">{role.name}</Badge>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map(module => {
                const modulePermissions = permissions.filter(p => p.module === module);
                return (
                  <>
                    <tr key={module} className="bg-muted/50">
                      <td colSpan={roles.length + 1} className="py-2 px-4 font-semibold text-sm">
                        {module}
                      </td>
                    </tr>
                    {modulePermissions.map(perm => (
                      <tr key={perm.id} className="border-b hover:bg-muted/30">
                        <td className="py-2 px-4 text-sm">{perm.name}</td>
                        {roles.map(role => (
                          <td key={role.id} className="py-2 px-4 text-center">
                            <div className="flex justify-center">
                              <Checkbox
                                checked={rolePermissions[role.id]?.includes(perm.name.toLowerCase().replace(/ /g, '.')) || false}
                                onChange={(e) => handlePermissionChange(
                                  role.id,
                                  perm.name.toLowerCase().replace(/ /g, '.'),
                                  e.target.checked
                                )}
                              />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
