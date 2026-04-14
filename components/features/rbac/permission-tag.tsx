'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface PermissionTagProps {
  type: 'read' | 'write' | 'delete';
  className?: string;
}

export function PermissionTag({ type, className }: PermissionTagProps) {
  const config = {
    read: {
      label: 'Read',
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-800 dark:text-blue-300',
    },
    write: {
      label: 'Write',
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-800 dark:text-green-300',
    },
    delete: {
      label: 'Delete',
      bg: 'bg-red-100 dark:bg-red-900',
      text: 'text-red-800 dark:text-red-300',
    },
  };

  const { label, bg, text } = config[type];

  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
      bg, text, className
    )}>
      {label}
    </span>
  );
}
