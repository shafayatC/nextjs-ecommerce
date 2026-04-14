'use client';

import * as React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WishlistButtonProps {
  isWishlisted?: boolean;
  onToggle?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function WishlistButton({ isWishlisted = false, onToggle, size = 'md', className }: WishlistButtonProps) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={`${sizes[size]} p-0 rounded-full ${className}`}
      onClick={(e) => { e.preventDefault(); onToggle?.(); }}
    >
      <Heart
        className={`${iconSizes[size]} ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
      />
    </Button>
  );
}
