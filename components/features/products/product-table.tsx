'use client';

import { Pencil, Trash2, Grid, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/mock-data';

interface ProductTableProps {
  products: Product[];
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function GridView({ products, onEdit, onDelete, onViewModeChange }: ProductTableProps) {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <Button
            variant="default"
            size="sm"
            onClick={() => onViewModeChange('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange('table')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="h-40 bg-muted flex items-center justify-center">
              <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">IMG</span>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{product.name}</CardTitle>
                <Badge variant={product.status === 'Active' ? 'success' : 'danger'}>
                  {product.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">৳{product.price.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">{product.category} • {product.brand}</p>
              <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(product)}>
                  <Pencil className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(product)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TableView({ products, onEdit, onDelete, onViewModeChange }: ProductTableProps) {
  return (
    <div className="rounded-md border">
      <div className="flex justify-end mb-4">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onViewModeChange('table')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left py-3 px-4 font-medium">Product</th>
            <th className="text-left py-3 px-4 font-medium">Category</th>
            <th className="text-left py-3 px-4 font-medium">Brand</th>
            <th className="text-left py-3 px-4 font-medium">Price</th>
            <th className="text-left py-3 px-4 font-medium">Stock</th>
            <th className="text-left py-3 px-4 font-medium">Status</th>
            <th className="text-right py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-muted/30">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-xs font-medium">IMG</span>
                  </div>
                  <span className="font-medium">{product.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
              <td className="py-3 px-4 text-muted-foreground">{product.brand}</td>
              <td className="py-3 px-4 font-medium">৳{product.price.toLocaleString()}</td>
              <td className="py-3 px-4">{product.stock}</td>
              <td className="py-3 px-4">
                <Badge variant={product.status === 'Active' ? 'success' : 'danger'}>
                  {product.status}
                </Badge>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(product)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(product)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProductTable(props: ProductTableProps) {
  if (props.viewMode === 'grid') {
    return <GridView {...props} />;
  }
  return <TableView {...props} />;
}
