'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Shield,
  Key,
  Package,
  Tags,
  Building2,
  Image,
  ChevronLeft,
  ChevronRight,
  X,
  ChevronDown,
  Settings,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarNavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  children?: SidebarNavItem[];
}

const navItems: SidebarNavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/users', label: 'Users', icon: Users },
  { href: '/dashboard/roles', label: 'Roles', icon: Shield },
  { href: '/dashboard/permissions', label: 'Permissions', icon: Key },
  { href: '/dashboard/products', label: 'Products', icon: Package },
  { href: '/dashboard/categories', label: 'Categories', icon: Tags },
  { href: '/dashboard/brands', label: 'Brands', icon: Building2 },
  { href: '/dashboard/media', label: 'Media Gallery', icon: Image },
  {
    href: '/dashboard/admin',
    label: 'System',
    icon: Settings,
    children: [
      { href: '/dashboard/admin/menu', label: 'Menu Management', icon: Menu },
      { href: '/dashboard/admin/settings', label: 'Settings', icon: Settings },
      { href: '/dashboard/admin/activity', label: 'Activity Logs', icon: Activity },
    ],
  },
];

function Menu(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  );
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ isCollapsed, onToggle, isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({ '/admin': true });

  const toggleGroup = (href: string) => {
    setOpenGroups(prev => ({ ...prev, [href]: !prev[href] }));
  };

  const isActive = (href: string) => pathname === href;

  const renderNavItem = (item: SidebarNavItem, depth = 0) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openGroups[item.href];

    return (
      <div key={item.href}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleGroup(item.href)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                isCollapsed && 'justify-center px-2'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-sm font-medium text-left">{item.label}</span>
                  <ChevronDown className={cn('h-4 w-4 transition-transform', !isOpen && '-rotate-90')} />
                </>
              )}
            </button>
            {!isCollapsed && isOpen && (
              <div className="ml-4 border-l-2 border-dashed border-muted pl-2 space-y-1">
                {item.children!.map(child => renderNavItem(child, depth + 1))}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.href}
            onClick={onMobileClose}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              isCollapsed && depth > 0 && 'justify-center px-2',
              !isCollapsed && depth > 0 && 'ml-2'
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen bg-card border-r transition-all duration-300 flex flex-col',
          isCollapsed ? 'w-16' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AD</span>
              </div>
              <span className="font-semibold text-lg">AdminPanel</span>
            </Link>
          )}
          {isCollapsed && (
            <Link href="/" className="w-full flex justify-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AD</span>
              </div>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileClose}
            className="lg:hidden p-1 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map(item => renderNavItem(item))}
        </nav>

        {/* Collapse Toggle */}
        <div className="hidden lg:block p-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn('w-full', isCollapsed && 'px-2')}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </>
  );
}
