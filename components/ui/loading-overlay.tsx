'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  isLoading: boolean;
  className?: string;
  message?: string;
}

export function LoadingOverlay({ isLoading, className, message }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className={cn(
      'fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm',
      className
    )}>
      <div className="flex flex-col items-center gap-3 bg-background rounded-lg p-6 shadow-xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        {message && (
          <p className="text-sm text-muted-foreground">{message}</p>
        )}
      </div>
    </div>
  );
}
