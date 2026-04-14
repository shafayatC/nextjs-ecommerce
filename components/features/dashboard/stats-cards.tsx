'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, Package, Tags, Activity } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
}

function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Users"
        value="1,245"
        icon={Users}
        description="+12% from last month"
      />
      <StatCard
        title="Total Products"
        value="89"
        icon={Package}
        description="+5 new this week"
      />
      <StatCard
        title="Total Categories"
        value="12"
        icon={Tags}
        description="Active categories"
      />
      <StatCard
        title="Recent Activity"
        value="156"
        icon={Activity}
        description="Last 7 days"
      />
    </div>
  );
}
