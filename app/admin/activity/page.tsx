'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Avatar } from '@/components/ui/avatar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Activity, Clock, List, LayoutList } from 'lucide-react';

const MOCK_USERS = ['All Users', 'Rahim Ahmed', 'Fatima Begum', 'Kamal Hossain', 'Nadia Islam'];
const MOCK_ACTIONS = ['All Actions', 'Created', 'Updated', 'Deleted', 'Logged In'];

const activityLogs = [
  { id: '1', userName: 'Rahim Ahmed', userInitials: 'RA', action: 'Created', actionColor: 'success', module: 'Products', date: '2024-06-15 10:32', ip: '192.168.1.10' },
  { id: '2', userName: 'Fatima Begum', userInitials: 'FB', action: 'Updated', actionColor: 'info', module: 'Categories', date: '2024-06-15 09:15', ip: '192.168.1.15' },
  { id: '3', userName: 'Kamal Hossain', userInitials: 'KH', action: 'Deleted', actionColor: 'danger', module: 'Users', date: '2024-06-15 08:45', ip: '192.168.1.22' },
  { id: '4', userName: 'Nadia Islam', userInitials: 'NI', action: 'Logged In', actionColor: 'warning', module: 'Auth', date: '2024-06-14 22:10', ip: '192.168.1.30' },
  { id: '5', userName: 'Saif Rahman', userInitials: 'SR', action: 'Created', actionColor: 'success', module: 'Orders', date: '2024-06-14 18:20', ip: '192.168.1.45' },
  { id: '6', userName: 'Mina Chowdhury', userInitials: 'MC', action: 'Updated', actionColor: 'info', module: 'Brands', date: '2024-06-14 16:55', ip: '192.168.1.12' },
  { id: '7', userName: 'Tariq Hasan', userInitials: 'TH', action: 'Created', actionColor: 'success', module: 'Media', date: '2024-06-14 14:30', ip: '192.168.1.8' },
  { id: '8', userName: 'Sadia Akter', userInitials: 'SA', action: 'Logged In', actionColor: 'warning', module: 'Auth', date: '2024-06-14 12:00', ip: '192.168.1.50' },
  { id: '9', userName: 'Imran Khan', userInitials: 'IK', action: 'Deleted', actionColor: 'danger', module: 'Products', date: '2024-06-13 17:45', ip: '192.168.1.33' },
  { id: '10', userName: 'Parveen Bibi', userInitials: 'PB', action: 'Updated', actionColor: 'info', module: 'Orders', date: '2024-06-13 15:20', ip: '192.168.1.19' },
  { id: '11', userName: 'Rahim Ahmed', userInitials: 'RA', action: 'Created', actionColor: 'success', module: 'Users', date: '2024-06-13 11:10', ip: '192.168.1.10' },
  { id: '12', userName: 'Fatima Begum', userInitials: 'FB', action: 'Updated', actionColor: 'info', module: 'Settings', date: '2024-06-12 20:00', ip: '192.168.1.15' },
  { id: '13', userName: 'Kamal Hossain', userInitials: 'KH', action: 'Logged In', actionColor: 'warning', module: 'Auth', date: '2024-06-12 18:30', ip: '192.168.1.22' },
  { id: '14', userName: 'Nadia Islam', userInitials: 'NI', action: 'Deleted', actionColor: 'danger', module: 'Media', date: '2024-06-12 14:15', ip: '192.168.1.30' },
  { id: '15', userName: 'Saif Rahman', userInitials: 'SR', action: 'Created', actionColor: 'success', module: 'Products', date: '2024-06-12 10:00', ip: '192.168.1.45' },
];

const BADGE_VARIANTS: Record<string, 'success' | 'danger' | 'info' | 'warning'> = {
  success: 'success',
  danger: 'danger',
  info: 'info',
  warning: 'warning',
};

export default function ActivityPage() {
  const [userFilter, setUserFilter] = React.useState('All Users');
  const [actionFilter, setActionFilter] = React.useState('All Actions');
  const [viewMode, setViewMode] = React.useState<'table' | 'timeline'>('table');

  const filteredLogs = activityLogs.filter(log => {
    if (userFilter !== 'All Users' && log.userName !== userFilter) return false;
    if (actionFilter !== 'All Actions' && log.action !== actionFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/' }, { label: 'Activity Logs' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Activity Logs</h1>
          <p className="text-muted-foreground mt-1">Track all user actions and system events</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setViewMode(v => v === 'table' ? 'timeline' : 'table')}
          className="gap-2"
        >
          {viewMode === 'table' ? <><LayoutList className="h-4 w-4" /> Timeline</> : <><List className="h-4 w-4" /> Table</>}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              options={MOCK_USERS.map(u => ({ value: u, label: u }))}
              value={userFilter}
              onChange={e => setUserFilter(e.target.value)}
              className="sm:w-48"
            />
            <Select
              options={MOCK_ACTIONS.map(a => ({ value: a, label: a }))}
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
              className="sm:w-48"
            />
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 bg-primary/10">
                          <span className="text-xs font-medium text-primary">{log.userInitials}</span>
                        </Avatar>
                        <span className="text-sm font-medium">{log.userName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={BADGE_VARIANTS[log.actionColor]}>{log.action}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{log.module}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{log.date}</TableCell>
                    <TableCell className="text-sm text-muted-foreground font-mono">{log.ip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="relative pl-6 space-y-6 border-l-2 border-dashed border-muted">
              {filteredLogs.map((log, idx) => (
                <div key={log.id} className="relative">
                  <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-2 ${
                    log.actionColor === 'success' ? 'bg-green-500 border-green-500' :
                    log.actionColor === 'danger' ? 'bg-red-500 border-red-500' :
                    log.actionColor === 'info' ? 'bg-blue-500 border-blue-500' :
                    'bg-yellow-500 border-yellow-500'
                  }`} />
                  <div className="flex items-start gap-4">
                    <Avatar className="h-8 w-8 bg-primary/10 flex-shrink-0">
                      <span className="text-xs font-medium text-primary">{log.userInitials}</span>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        <span className="font-semibold">{log.userName}</span>
                        <span className="text-muted-foreground"> — </span>
                        <Badge variant={BADGE_VARIANTS[log.actionColor]} className="text-xs">{log.action}</Badge>
                        <span className="text-muted-foreground ml-1">{log.module}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{log.date} · {log.ip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}