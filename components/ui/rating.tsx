'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
  onChange?: (value: number) => void;
  readonly?: boolean;
}

export function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  className,
  onChange,
  readonly = false,
}: RatingProps) {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(value);
        const partial = !filled && i < value;
        return (
          <button
            key={i}
            type="button"
            onClick={() => !readonly && onChange?.(i + 1)}
            disabled={readonly}
            className={cn(
              'relative text-amber-400',
              !readonly && 'cursor-pointer hover:scale-110 transition-transform'
            )}
          >
            <Star
              className={cn(
                sizes[size],
                filled ? 'fill-amber-400' : 'fill-transparent'
              )}
            />
            {partial && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className={cn(sizes[size], 'fill-amber-400')} />
              </div>
            )}
          </button>
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
