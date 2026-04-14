'use client';

import * as React from 'react';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { useSidebar } from '@/hooks/use-sidebar';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { isDark, toggle: toggleDark } = useDarkMode();
  const { isCollapsed, isMobileOpen, toggle, toggleMobile, closeMobile } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={toggle}
        isMobileOpen={isMobileOpen}
        onMobileClose={closeMobile}
      />
      
      {/* Main Content Area */}
      <div
        className={cn(
          'transition-all duration-300',
          isCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        )}
      >
        <Navbar
          isDark={isDark}
          onToggleDark={toggleDark}
          onMobileMenuToggle={toggleMobile}
        />
        
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
