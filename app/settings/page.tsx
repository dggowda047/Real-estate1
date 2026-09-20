'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/lib/app-provider';
import { agencies, channelPartners, auditLogs, formatDate, formatDateTime } from '@/lib/mock-data';
import {
  Building2, User, Bell, Shield, CreditCard, Globe, Plug, History,
  Check, Save, Smartphone, Mail, MessageSquare, Phone,
} from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account, agency, and platform preferences" />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="agency">Agency</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <Card>
            <CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Full Name</Label><Input defaultValue={user?.name} /></div>
                <div className="space-y-2"><Label>Phone</Label><Input defaultValue={user?.phone} /></div>
                <div className="space-y-2 col-span-2"><Label>Email</Label><Input type="email" defaultValue={user?.email} /></div>
                <div className="space-y-2"><Label>Role</Label><Input disabled value={user?.role.replace(/_/g, ' ')} /></div>
                <div className="space-y-2"><Label>Agency</Label><Input disabled value={user?.agencyName || 'N/A'} /></div>
              </div>
              <Button onClick={() => toast.success('Profile updated successfully')}><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agency */}
        <TabsContent value="agency">
          <Card>
            <CardHeader><CardTitle className="text-base">Agency Information</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              {agencies.map(a => (
                <div key={a.id} className="space-y-3 p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      <p className="font-medium">{a.name}</p>
                    </div>
                    <Badge variant="outline" className={a.plan === 'ENTERPRISE' ? 'text-primary' : ''}>{a.plan}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-xs text-muted-foreground">Email</p><p>{a.email}</p></div>
                    <div><p className="text-xs text-muted-foreground">Phone</p><p>{a.phone}</p></div>
                    <div><p className="text-xs text-muted-foreground">City</p><p>{a.city}</p></div>
                    <div><p className="text-xs text-muted-foreground">Agents</p><p>{a.activeAgents} / {a.maxAgents}</p></div>
                  </div>
                </div>
              ))}
              <Button onClick={() => toast.success('Agency settings updated')}><Save className="w-4 h-4 mr-2" /> Save Agency Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              {[
                { label: 'New lead assigned', channels: ['Email', 'WhatsApp', 'In-App'] },
                { label: 'Site visit reminders', channels: ['Email', 'SMS', 'In-App'] },
                { label: 'Deal stage changes', channels: ['Email', 'In-App'] },
                { label: 'Task overdue alerts', channels: ['Email', 'In-App'] },
                { label: 'Commission payments', channels: ['Email', 'In-App'] },
                { label: 'Weekly performance report', channels: ['Email'] },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.channels.join(' · ')}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
              <Button onClick={() => toast.success('Notification preferences saved')}><Save className="w-4 h-4 mr-2" /> Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader><CardTitle className="text-base">Security Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              <div className="space-y-3">
                <div className="space-y-2"><Label>Current Password</Label><Input type="password" placeholder="••••••••" /></div>
                <div className="space-y-2"><Label>New Password</Label><Input type="password" placeholder="••••••••" /></div>
                <div className="space-y-2"><Label>Confirm New Password</Label><Input type="password" placeholder="••••••••" /></div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Session Timeout</p>
                  <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => toast.success('Security settings updated')}><Shield className="w-4 h-4 mr-2" /> Update Security</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing">
          <Card>
            <CardHeader><CardTitle className="text-base">Subscription & Billing</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">Current Plan: Enterprise</p>
                    <p className="text-xs text-muted-foreground">Rs. 15,000/month · 25 agents · Unlimited properties</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { name: 'Starter', price: 'Rs. 2,000', agents: '5 agents', features: ['Basic lead management', 'Property listings', 'Email support'] },
                  { name: 'Pro', price: 'Rs. 7,000', agents: '15 agents', features: ['Everything in Starter', 'Deal pipeline', 'Commission tracking', 'Priority support'] },
                  { name: 'Enterprise', price: 'Rs. 15,000', agents: '25 agents', features: ['Everything in Pro', 'Custom integrations', 'Advanced analytics', 'Dedicated support'] },
                ].map(plan => (
                  <div key={plan.name} className={`p-4 rounded-lg border ${plan.name === 'Enterprise' ? 'border-primary' : ''}`}>
                    <p className="font-medium">{plan.name}</p>
                    <p className="text-2xl font-bold mt-1">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <p className="text-xs text-muted-foreground mt-1">{plan.agents}</p>
                    <ul className="mt-3 space-y-1">
                      {plan.features.map(f => <li key={f} className="text-xs flex items-center gap-1"><Check className="w-3 h-3 text-success" /> {f}</li>)}
                    </ul>
                    <Button variant={plan.name === 'Enterprise' ? 'outline' : 'default'} size="sm" className="w-full mt-3" disabled={plan.name === 'Enterprise'}>
                      {plan.name === 'Enterprise' ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Payment gateway integration via Razorpay. Configure in Integrations page.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Log */}
        <TabsContent value="audit">
          <Card>
            <CardHeader><CardTitle className="text-base">Audit Log</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {auditLogs.map(log => (
                  <div key={log.id} className="flex items-center gap-3 p-3 rounded-md border text-sm">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <History className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{log.details}</p>
                      <p className="text-xs text-muted-foreground">{log.userName} · {formatDateTime(log.timestamp)}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{log.action}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
