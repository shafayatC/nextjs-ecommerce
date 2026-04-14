'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ShopBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function ShopBreadcrumb({ items, className }: ShopBreadcrumbProps) {
  return (
    <nav className={cn('flex items-center gap-1 text-sm flex-wrap', className)}>
      <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {isLast || !item.href ? (
              <span className={cn(
                'text-foreground font-medium',
                isLast && 'text-muted-foreground'
              )}>
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
