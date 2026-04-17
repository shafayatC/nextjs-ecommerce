'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Check } from 'lucide-react';

export default function SettingsPage() {
  // Tabs manages its own internal state
  const [general, setGeneral] = React.useState({ appName: 'AdminPanel', timezone: 'Asia/Dhaka' });
  const [appearance, setAppearance] = React.useState({ theme: 'system', primaryColor: '#3b82f6' });
  const [localization, setLocalization] = React.useState({ currency: 'BDT', language: 'English' });
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/' }, { label: 'Settings' }]} />

      <div>
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your application preferences</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic application information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Application Name</label>
                <Input
                  value={general.appName}
                  onChange={e => setGeneral(prev => ({ ...prev, appName: e.target.value }))}
                  placeholder="Your app name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Logo Upload</label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg border bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Logo</span>
                  </div>
                  <Button variant="outline" size="sm">Upload New Logo</Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Timezone</label>
                <select
                  value={general.timezone}
                  onChange={e => setGeneral(prev => ({ ...prev, timezone: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                  <option value="UTC">UTC (GMT+0)</option>
                  <option value="Europe/London">Europe/London (GMT+0)</option>
                  <option value="America/New_York">America/New_York (GMT-5)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Default Theme</label>
                <div className="flex gap-3">
                  {['light', 'dark', 'system'].map(t => (
                    <button
                      key={t}
                      onClick={() => setAppearance(prev => ({ ...prev, theme: t }))}
                      className={`flex-1 p-4 rounded-lg border-2 text-center capitalize transition-colors ${
                        appearance.theme === t
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={appearance.primaryColor}
                    onChange={e => setAppearance(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="w-10 h-10 rounded cursor-pointer border-0"
                  />
                  <Input
                    value={appearance.primaryColor}
                    onChange={e => setAppearance(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="w-32 font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localization">
          <Card>
            <CardHeader>
              <CardTitle>Localization</CardTitle>
              <CardDescription>Language and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Currency</label>
                <select
                  value={localization.currency}
                  onChange={e => setLocalization(prev => ({ ...prev, currency: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="BDT">BDT — Bangladeshi Taka</option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="INR">INR — Indian Rupee</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Language</label>
                <select
                  value={localization.language}
                  onChange={e => setLocalization(prev => ({ ...prev, language: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="English">English</option>
                  <option value="Bengali">বাংলা (Bengali)</option>
                  <option value="Arabic">العربية (Arabic)</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          {saved ? <><Check className="h-4 w-4 mr-2" /> Saved!</> : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}