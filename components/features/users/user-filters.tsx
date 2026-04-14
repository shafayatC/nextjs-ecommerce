'use client';

import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface UserFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
}

export function UserFilters({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select
        options={[
          { value: 'all', label: 'All Roles' },
          { value: 'Admin', label: 'Admin' },
          { value: 'Editor', label: 'Editor' },
          { value: 'Viewer', label: 'Viewer' },
        ]}
        value={roleFilter}
        onChange={(e) => onRoleFilterChange(e.target.value)}
        className="w-full sm:w-48"
      />
    </div>
  );
}
