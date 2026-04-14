'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { ShopBreadcrumb } from '@/components/shop/shop-breadcrumb';
import { shopOrders } from '@/lib/shop-data';

const STATUS_COLORS: Record<string, 'warning' | 'info' | 'success' | 'danger'> = {
  Pending: 'warning',
  Shipped: 'info',
  Delivered: 'success',
  Cancelled: 'danger',
};

export default function OrdersPage() {
  const [page, setPage] = React.useState(1);
  const [selectedOrder, setSelectedOrder] = React.useState<typeof shopOrders[0] | null>(null);
  const pageSize = 5;

  const paginatedOrders = shopOrders.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(shopOrders.length / pageSize);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <ShopBreadcrumb items={[{ label: 'Orders' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground mt-1">Track and manage your orders</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Items</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Total</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map(order => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="p-4">
                      <span className="text-sm font-mono font-medium">{order.id}</span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{order.date}</td>
                    <td className="p-4 text-sm">{order.items.length}</td>
                    <td className="p-4 text-sm font-medium">৳{order.total.toLocaleString()}</td>
                    <td className="p-4">
                      <Badge variant={STATUS_COLORS[order.status]}>{order.status}</Badge>
                    </td>
                    <td className="p-4 text-sm text-primary hover:underline" onClick={e => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)} className="h-7 px-2 text-xs">Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}

      {/* Order Details Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Order ${selectedOrder?.id ?? ''}`}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="space-y-3">
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex gap-3 border-b pb-3 last:border-0">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded border" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium">৳{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total:</span><span className="font-bold">৳{selectedOrder.total.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Address:</span><span className="text-right text-xs">{selectedOrder.shippingAddress}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment:</span><span>{selectedOrder.paymentMethod}</span></div>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm font-semibold mb-2">Order Timeline</p>
              <div className="space-y-2">
                {selectedOrder.timeline.map((t, i) => (
                  <div key={i} className="flex gap-2 text-xs">
                    <span className="text-muted-foreground whitespace-nowrap">{t.date}</span>
                    <span className="font-medium">— {t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}