'use client';
import type { MenuItem } from '@/lib/menu-types';

import * as React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';


interface MenuListProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

function MenuTreeRow({ item, depth = 0 }: { item: MenuItem; depth?: number }) {
  return (
    <>
      <tr className={`border-b ${!item.enabled ? 'bg-muted/30' : ''}`}>
        <td className="p-3" style={{ paddingLeft: `${16 + depth * 24}px` }}>
          <div className="flex items-center gap-2">
            {depth > 0 && (
              <span className="text-xs text-muted-foreground border border-dashed border-muted-foreground/40 rounded px-1">
                Sub
              </span>
            )}
            <span className="font-medium text-sm">{item.name}</span>
          </div>
        </td>
        <td className="p-3 text-xs text-muted-foreground font-mono">{item.route}</td>
        <td className="p-3">
          <div className="flex flex-wrap gap-1">
            {item.roles.map(role => (
              <span key={role} className="px-1.5 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                {role}
              </span>
            ))}
          </div>
        </td>
        <td className="p-3">
          <Switch
            checked={item.enabled}
            onChange={() => {}}
          />
        </td>
        <td className="p-3">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Edit</Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-destructive hover:text-destructive">Delete</Button>
          </div>
        </td>
      </tr>
      {item.children?.map(child => (
        <MenuTreeRow key={child.id} item={child} depth={depth + 1} />
      ))}
    </>
  );
}

export function MenuList({ items, onEdit, onDelete, onToggle }: MenuListProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left p-3 text-xs font-medium text-muted-foreground">Name</th>
            <th className="text-left p-3 text-xs font-medium text-muted-foreground">Route</th>
            <th className="text-left p-3 text-xs font-medium text-muted-foreground">Roles</th>
            <th className="text-left p-3 text-xs font-medium text-muted-foreground">Enabled</th>
            <th className="text-left p-3 text-xs font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <MenuTreeRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
