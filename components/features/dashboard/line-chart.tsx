'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { userGrowthData } from '@/lib/mock-data';

export function LineChart() {
  const maxValue = Math.max(...userGrowthData.map(d => d.value));
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>User Growth (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-end gap-2">
          {userGrowthData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-muted rounded-t-lg relative" style={{ height: '250px' }}>
                <div 
                  className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
                  style={{ height: `${(data.value / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{data.label}</span>
              <span className="text-sm font-medium">{data.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
