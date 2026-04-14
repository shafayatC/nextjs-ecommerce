'use client';
import type { MenuItem } from '@/lib/menu-types';

import * as React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';


interface MenuItemFormProps {
  item?: MenuItem | null;
  parentId?: string | null;
  items: MenuItem[];
  onSave: (item: Omit<MenuItem, 'id' | 'children'>) => void;
  onClose: () => void;
}

const AVAILABLE_ROLES = ['Admin', 'Editor', 'Viewer', 'Manager'];

export function MenuItemForm({ item, parentId, items, onSave, onClose }: MenuItemFormProps) {
  const [name, setName] = React.useState(item?.name ?? '');
  const [icon, setIcon] = React.useState(item?.icon ?? '');
  const [route, setRoute] = React.useState(item?.route ?? '');
  const [selectedParent, setSelectedParent] = React.useState<string | null>(item?.parentId ?? parentId ?? null);
  const [enabled, setEnabled] = React.useState(item?.enabled ?? true);
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>(item?.roles ?? ['Admin', 'Editor', 'Viewer']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      icon,
      route,
      parentId: selectedParent,
      enabled,
      roles: selectedRoles,
    });
  };

  const toggleRole = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const allParents = React.useMemo(() => {
    const flat: { id: string; name: string; depth: number }[] = [];
    const collect = (items: MenuItem[], depth = 0) => {
      items.forEach(it => {
        if (it.id !== item?.id) {
          flat.push({ id: it.id, name: it.name, depth });
          if (it.children) collect(it.children, depth + 1);
        }
      });
    };
    collect(items);
    return flat;
  }, [items, item?.id]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Name</label>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Dashboard"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Icon Name</label>
        <Input
          value={icon}
          onChange={e => setIcon(e.target.value)}
          placeholder="e.g. home, settings, users"
        />
        <p className="text-xs text-muted-foreground mt-1">Lucide icon name (leave blank for no icon)</p>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Route Path</label>
        <Input
          value={route}
          onChange={e => setRoute(e.target.value)}
          placeholder="/dashboard"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Parent Menu</label>
        <select
          value={selectedParent ?? ''}
          onChange={e => setSelectedParent(e.target.value || null)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">— No Parent (Top Level) —</option>
          {allParents.map(p => (
            <option key={p.id} value={p.id}>
              {'  '.repeat(p.depth)}{p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Enabled</label>
        <Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Role Visibility</label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_ROLES.map(role => (
            <button
              key={role}
              type="button"
              onClick={() => toggleRole(role)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                selectedRoles.includes(role)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted text-muted-foreground border-transparent hover:bg-muted/80'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {item ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}
