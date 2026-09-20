'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { communications, messageTemplates, formatDateTime, timeAgo } from '@/lib/mock-data';
import type { CommunicationChannel } from '@/types';
import { Phone, Mail, MessageSquare, Smartphone, Send, Plus, Search, FileText, ArrowUpRight, ArrowDownLeft, CheckCheck, Clock, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const channelConfig: Record<CommunicationChannel, { icon: React.ComponentType<{ className?: string }>; label: string; color: string }> = {
  CALL: { icon: Phone, label: 'Call', color: 'text-blue-600 bg-blue-50' },
  EMAIL: { icon: Mail, label: 'Email', color: 'text-purple-600 bg-purple-50' },
  WHATSAPP: { icon: MessageSquare, label: 'WhatsApp', color: 'text-green-600 bg-green-50' },
  SMS: { icon: Smartphone, label: 'SMS', color: 'text-orange-600 bg-orange-50' },
  IN_APP: { icon: Send, label: 'In-App', color: 'text-primary bg-primary/10' },
};

const statusConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  SENT: { icon: Send, color: 'text-muted-foreground' },
  DELIVERED: { icon: CheckCheck, color: 'text-blue-500' },
  READ: { icon: CheckCheck, color: 'text-success' },
  FAILED: { icon: AlertCircle, color: 'text-destructive' },
  PENDING: { icon: Clock, color: 'text-warning' },
};

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState('history');
  const [channelFilter, setChannelFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = communications;
    if (channelFilter !== 'all') result = result.filter(c => c.channel === channelFilter);
    if (search) result = result.filter(c =>
      c.leadName?.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase()) ||
      c.content.toLowerCase().includes(search.toLowerCase())
    );
    return result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [channelFilter, search]);

  const stats = useMemo(() => ({
    total: communications.length,
    calls: communications.filter(c => c.channel === 'CALL').length,
    emails: communications.filter(c => c.channel === 'EMAIL').length,
    whatsapp: communications.filter(c => c.channel === 'WHATSAPP').length,
    failed: communications.filter(c => c.status === 'FAILED').length,
  }), []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Communications"
        description="Centralized communication hub across all channels"
        actions={
          <Button size="sm" onClick={() => toast.info('New message dialog would open')}>
            <Plus className="w-4 h-4 mr-2" /> New Message
          </Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Total', value: stats.total, color: 'text-primary' },
          { label: 'Calls', value: stats.calls, color: 'text-blue-600' },
          { label: 'Emails', value: stats.emails, color: 'text-purple-600' },
          { label: 'WhatsApp', value: stats.whatsapp, color: 'text-green-600' },
          { label: 'Failed', value: stats.failed, color: 'text-destructive' },
        ].map(s => (
          <div key={s.label} className="rounded-lg border bg-card p-3">
            <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex gap-2 items-center">
              <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}
                className="h-9 rounded-md border border-input bg-card px-3 text-xs">
                <option value="all">All Channels</option>
                <option value="CALL">Calls</option>
                <option value="EMAIL">Emails</option>
                <option value="WHATSAPP">WhatsApp</option>
                <option value="SMS">SMS</option>
              </select>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search communications..."
                className="w-full h-9 rounded-md border border-input bg-card pl-9 pr-3 text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            {filtered.map(comm => {
              const ch = channelConfig[comm.channel];
              const st = statusConfig[comm.status];
              return (
                <Card key={comm.id} className="hover:shadow-sm transition-base">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${ch.color}`}>
                        <ch.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">{comm.leadName}</p>
                          {comm.direction === 'INBOUND' ? (
                            <ArrowDownLeft className="w-3 h-3 text-muted-foreground" />
                          ) : (
                            <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{comm.subject}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`flex items-center gap-1 text-xs ${st.color}`}>
                          <st.icon className="w-3 h-3" /> {comm.status}
                        </span>
                        <span className="text-xs text-muted-foreground">{timeAgo(comm.timestamp)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {messageTemplates.map(tpl => {
              const ch = channelConfig[tpl.channel];
              return (
                <Card key={tpl.id} className="hover:shadow-md transition-base">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ch.color}`}>
                        <ch.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{tpl.name}</p>
                        <p className="text-xs text-muted-foreground">{ch.label} · {tpl.variables.length} variables</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => toast.info(`Using template: ${tpl.name}`)}>Use</Button>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted/50 rounded-md p-3 mt-2 max-h-32 overflow-y-auto">
                      <p className="font-medium text-foreground mb-1">{tpl.subject}</p>
                      <pre className="whitespace-pre-wrap font-sans">{tpl.body}</pre>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tpl.variables.map(v => (
                        <Badge key={v} variant="outline" className="text-xs text-muted-foreground">{`{{${v}}}`}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 p-4 rounded-lg border border-dashed">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Create New Template</p>
                  <p className="text-xs text-muted-foreground">Build reusable message templates with dynamic variables</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => toast.info('Template editor would open')}>
                  <Plus className="w-4 h-4 mr-2" /> New Template
                </Button>
              </div>
            </CardContent>
            <p className="text-xs text-muted-foreground px-6 pb-4">
              WhatsApp messaging requires an authorized WhatsApp Business API provider. EstateOS does not implement unauthorized WhatsApp automation.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
