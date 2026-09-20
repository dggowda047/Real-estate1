'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IntegrationStatusBadge } from '@/components/shared/status-badges';
import { integrations } from '@/lib/mock-data';
import type { Integration, IntegrationStatus } from '@/types';
import {
  Building, Building2, Home, Facebook, Search, MessageCircle, Mail,
  Calendar, MapPin, CreditCard, Globe, Plug, Settings as SettingsIcon,
  CheckCircle2, AlertCircle, Clock, XCircle, Zap, ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  building: Building, 'building-2': Building2, home: Home, facebook: Facebook,
  search: Search, 'message-circle': MessageCircle, mail: Mail, calendar: Calendar,
  'map-pin': MapPin, 'credit-card': CreditCard, globe: Globe,
};

const categoryLabels: Record<string, string> = {
  LEAD_SOURCE: 'Lead Sources',
  COMMUNICATION: 'Communication',
  PAYMENT: 'Payments',
  CALENDAR: 'Calendar',
  MAPS: 'Maps',
};

export default function IntegrationsPage() {
  const [configuring, setConfiguring] = useState<Integration | null>(null);
  const [statuses, setStatuses] = useState<Record<string, IntegrationStatus>>(
    Object.fromEntries(integrations.map(i => [i.id, i.status]))
  );

  const grouped = integrations.reduce((acc, int) => {
    if (!acc[int.category]) acc[int.category] = [];
    acc[int.category].push(int);
    return acc;
  }, {} as Record<string, Integration[]>);

  const handleConnect = (int: Integration) => {
    if (int.apiRequired && statuses[int.id] === 'API_REQUIRED') {
      toast.error(`${int.name} requires API/partner approval. Contact the provider to get access.`);
      return;
    }
    setConfiguring(int);
  };

  const handleSaveConfig = () => {
    if (configuring) {
      setStatuses(prev => ({ ...prev, [configuring.id]: 'CONNECTED' }));
      toast.success(`${configuring.name} connected successfully`);
      setConfiguring(null);
    }
  };

  const handleDisconnect = (int: Integration) => {
    setStatuses(prev => ({ ...prev, [int.id]: 'NOT_CONNECTED' }));
    toast.success(`${int.name} disconnected`);
  };

  const handleTest = (int: Integration) => {
    toast.promise(new Promise(r => setTimeout(r, 1000)), {
      loading: `Testing ${int.name} connection...`,
      success: `${int.name} connection test passed`,
      error: `${int.name} connection test failed`,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="Connect external lead sources, communication providers, and payment gateways"
      />

      {/* Notice */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Integration Notice</p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              External portals like 99acres, MagicBricks, and Housing.com require API partner approval.
              EstateOS only uses authorized APIs and never scrapes websites or bypasses access controls.
              WhatsApp messaging requires an authorized WhatsApp Business API provider.
            </p>
          </div>
        </div>
      </div>

      {/* Integration Cards by Category */}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{categoryLabels[category]}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(int => {
              const Icon = iconMap[int.logo] || Plug;
              const status = statuses[int.id];
              return (
                <Card key={int.id} className="hover:shadow-md transition-base">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{int.name}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{int.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <IntegrationStatusBadge status={status} />
                      {int.leadCount !== undefined && int.leadCount > 0 && (
                        <span className="text-xs text-muted-foreground">{int.leadCount} leads</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {status === 'CONNECTED' ? (
                        <>
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => handleTest(int)}>
                            <Zap className="w-3.5 h-3.5 mr-1" /> Test
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setConfiguring(int)}>
                            <SettingsIcon className="w-3.5 h-3.5" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDisconnect(int)}>
                            Disconnect
                          </Button>
                        </>
                      ) : status === 'API_REQUIRED' ? (
                        <>
                          <Button size="sm" variant="outline" className="flex-1 opacity-60" disabled>
                            API Approval Required
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => toast.info(`Contact ${int.name} for API access`)}>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="flex-1" onClick={() => handleConnect(int)}>
                          <Plug className="w-3.5 h-3.5 mr-1" /> Connect
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Configuration Dialog */}
      <Dialog open={!!configuring} onOpenChange={(open) => !open && setConfiguring(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configure {configuring?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {configuring?.configFields?.map(field => (
              <div key={field.key} className="space-y-2">
                <Label>{field.label}{field.required && <span className="text-destructive ml-1">*</span>}</Label>
                <Input type={field.type} placeholder={`Enter ${field.label.toLowerCase()}`} />
              </div>
            ))}
            {!configuring?.configFields && (
              <p className="text-sm text-muted-foreground">No configuration required for this integration.</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfiguring(null)}>Cancel</Button>
            <Button onClick={handleSaveConfig}>Save & Connect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
