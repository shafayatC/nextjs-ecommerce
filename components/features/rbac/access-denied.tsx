'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <ShieldAlert className="h-10 w-10 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        You don&apos;t have permission to access this page. Please contact your administrator if you believe this is a mistake.
      </p>
      <Link href="/">
        <Button>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
