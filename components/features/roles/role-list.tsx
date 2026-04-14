'use client';

import { Pencil, Trash2, Users, Key } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Role } from '@/lib/mock-data';

interface RoleListProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export function RoleList({ roles, onEdit, onDelete }: RoleListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {roles.map((role) => (
        <Card key={role.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{role.name}</CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => onEdit(role)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(role)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{role.userCount} users</span>
              </div>
              <div className="flex items-center gap-1">
                <Key className="h-4 w-4 text-muted-foreground" />
                <span>{role.permissions.length} permissions</span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1">
              {role.permissions.slice(0, 3).map((perm) => (
                <Badge key={perm} variant="default" className="text-xs">
                  {perm.split('.').pop()}
                </Badge>
              ))}
              {role.permissions.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{role.permissions.length - 3} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
