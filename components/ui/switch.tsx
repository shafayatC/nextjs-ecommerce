'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, checked, onChange, ...props }, ref) => {
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            ref={ref}
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
            {...props}
          />
          <div className={cn(
            'w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors',
            className
          )} />
          <div className={cn(
            'absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform',
            checked && 'translate-x-5'
          )} />
        </div>
        {label && <span className="text-sm">{label}</span>}
      </label>
    );
  }
);
Switch.displayName = 'Switch';

export { Switch };
