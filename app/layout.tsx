import type { Metadata } from 'next';
import './globals.css';
import { AdminLayout } from '@/components/layout/admin-layout';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard for managing users, products, and more',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
