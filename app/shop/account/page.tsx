'use client';

import * as React from 'react';
import { User, MapPin, Bell, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShopBreadcrumb } from '@/components/shop/shop-breadcrumb';
import { Pagination } from '@/components/ui/pagination';
import { Modal } from '@/components/ui/modal';
import { shopAddresses, shopOrders } from '@/lib/shop-data';

const STATUS_COLORS: Record<string, 'warning' | 'info' | 'success' | 'danger'> = {
  Pending: 'warning',
  Shipped: 'info',
  Delivered: 'success',
  Cancelled: 'danger',
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = React.useState('profile');
  const [orderPage, setOrderPage] = React.useState(1);
  const [selectedOrder, setSelectedOrder] = React.useState<typeof shopOrders[0] | null>(null);
  const [notifications, setNotifications] = React.useState({ email: true, sms: false, push: true });

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <ShopBreadcrumb items={[{ label: 'Account' }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">My Account</h1>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="orders">
            Orders
          </TabsTrigger>
          <TabsTrigger value="addresses">
            <MapPin className="h-4 w-4 mr-2" /> Addresses
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Bell className="h-4 w-4 mr-2" /> Settings
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="max-w-xl">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">RA</span>
                  </div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Full Name</label>
                    <Input defaultValue="Rahim Ahmed" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input type="email" defaultValue="rahim@techbd.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone</label>
                    <Input type="tel" defaultValue="+880 1711-123456" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Date of Birth</label>
                    <Input type="date" defaultValue="1990-05-15" />
                  </div>
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Order ID</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Items</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Total</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {shopOrders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-t hover:bg-muted/30 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                      <td className="p-3 text-sm font-mono">{order.id}</td>
                      <td className="p-3 text-sm text-muted-foreground">{order.date}</td>
                      <td className="p-3 text-sm">{order.items.length} item{order.items.length > 1 ? 's' : ''}</td>
                      <td className="p-3 text-sm font-medium">৳{order.total.toLocaleString()}</td>
                      <td className="p-3">
                        <Badge variant={STATUS_COLORS[order.status]}>{order.status}</Badge>
                      </td>
                      <td className="p-3 text-sm text-primary hover:underline">View</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={orderPage} totalPages={2} onPageChange={setOrderPage} />
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <Modal
              isOpen={!!selectedOrder}
              onClose={() => setSelectedOrder(null)}
              title={`Order ${selectedOrder.id}`}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 border-b pb-3 last:border-0">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded border" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium">৳{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Total:</span><span className="font-bold">৳{selectedOrder.total.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Address:</span><span className="text-right">{selectedOrder.shippingAddress}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Payment:</span><span>{selectedOrder.paymentMethod}</span></div>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Timeline</p>
                  <div className="space-y-2">
                    {selectedOrder.timeline.map((t, i) => (
                      <div key={i} className="flex gap-2 text-xs">
                        <span className="text-muted-foreground">{t.date}</span>
                        <span className="font-medium">— {t.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shopAddresses.map(addr => (
              <Card key={addr.id} className={addr.isDefault ? 'border-primary' : ''}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{addr.label}</span>
                    {addr.isDefault && <Badge variant="success">Default</Badge>}
                  </div>
                  <p className="text-sm font-medium">{addr.name}</p>
                  <p className="text-sm text-muted-foreground">{addr.address}</p>
                  <p className="text-sm text-muted-foreground">{addr.city}</p>
                  <p className="text-sm text-muted-foreground">{addr.phone}</p>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                    <Button variant="outline" size="sm" className="flex-1">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add new address card */}
            <Card className="border-dashed cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center justify-center min-h-[160px] text-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                  <span className="text-xl">+</span>
                </div>
                <p className="text-sm font-medium">Add New Address</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="max-w-xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive order updates via email</p>
                  </div>
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={e => setNotifications(n => ({ ...n, email: e.target.checked }))}
                      className="h-4 w-4"
                    />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">SMS Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive order updates via SMS</p>
                  </div>
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={e => setNotifications(n => ({ ...n, sms: e.target.checked }))}
                      className="h-4 w-4"
                    />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive push notifications on your device</p>
                  </div>
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={e => setNotifications(n => ({ ...n, push: e.target.checked }))}
                      className="h-4 w-4"
                    />
                </label>
                <Button>Save Preferences</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" /> Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Current Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">New Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Confirm New Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
