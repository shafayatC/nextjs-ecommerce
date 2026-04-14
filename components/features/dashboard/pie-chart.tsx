'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { productDistributionData } from '@/lib/mock-data';

export function PieChart() {
  const total = productDistributionData.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Simple Pie Chart */}
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {productDistributionData.reduce((acc, item, index) => {
                const percentage = (item.value / total) * 100;
                const offset = acc.offset;
                acc.elements.push(
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="20"
                    strokeDasharray={`${percentage * 2.51} ${251.2 - percentage * 2.51}`}
                    strokeDashoffset={-offset}
                    className="transition-all duration-300"
                  />
                );
                acc.offset += percentage * 2.51;
                return acc;
              }, { elements: [] as JSX.Element[], offset: 0 }).elements}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold">{total}</p>
                <p className="text-xs text-muted-foreground">Products</p>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="space-y-3">
            {productDistributionData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm flex-1">{item.label}</span>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
