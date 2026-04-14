'use client';

import * as React from 'react';
import { GripVertical, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MenuItem } from '@/lib/menu-types';

interface MenuBuilderProps {
  items: MenuItem[];
  onAdd: (parentId?: string | null) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  onMove: (dragId: string, dropId: string) => void;
}

function MenuTreeItem({ item, depth = 0, onAdd, onEdit, onDelete, onMove }: {
  item: MenuItem;
  depth?: number;
  onAdd: (parentId?: string | null) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  onMove: (dragId: string, dropId: string) => void;
}) {
  const [dragOver, setDragOver] = React.useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('menuId', item.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dragId = e.dataTransfer.getData('menuId');
    if (dragId && dragId !== item.id) {
      onMove(dragId, item.id);
    }
  };

  return (
    <div>
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex items-center gap-2 p-3 mb-1 rounded-lg border bg-card transition-colors ${
          dragOver ? 'border-primary bg-primary/5' : 'border-border'
        } ${!item.enabled ? 'opacity-60' : ''}`}
        style={{ marginLeft: `${depth * 24}px` }}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{item.name}</p>
          <p className="text-xs text-muted-foreground truncate">{item.route}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {depth < 2 && (
            <Button variant="ghost" size="sm" onClick={() => onAdd(item.id)} className="h-7 w-7 p-0">
              <Plus className="h-3 w-3" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => onEdit(item)} className="h-7 px-2 text-xs">
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(item.id)} className="h-7 px-2 text-xs text-destructive hover:text-destructive">
            Delete
          </Button>
        </div>
      </div>
      {item.children && item.children.length > 0 && (
        <div className="border-l-2 border-dashed border-muted ml-6">
          {item.children.map(child => (
            <MenuTreeItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MenuBuilder({ items, onAdd, onEdit, onDelete, onMove }: MenuBuilderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">Drag items to reorder. Click + to add submenu.</p>
        <Button size="sm" onClick={() => onAdd(null)}>
          <Plus className="h-4 w-4 mr-1" /> Add Top Level
        </Button>
      </div>
      <div>
        {items.map(item => (
          <MenuTreeItem
            key={item.id}
            item={item}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
      </div>
    </div>
  );
}
