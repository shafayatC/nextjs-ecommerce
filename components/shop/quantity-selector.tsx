'use client';

import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  className,
}: QuantitySelectorProps) {
  const buttonSize = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9';
  const textSize = size === 'sm' ? 'w-8 text-xs' : 'w-10 text-sm';

  return (
    <div className={`flex items-center border rounded-md ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        className={`${buttonSize} p-0 rounded-none rounded-l-md border-0`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      </Button>
      <span className={`${textSize} flex items-center justify-center text-center font-medium border-x-0 border bg-muted/30`}>
        {value}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className={`${buttonSize} p-0 rounded-none rounded-r-md border-0`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      </Button>
    </div>
  );
}
