'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { VerificationBadge } from '@/components/shared/status-badges';
import { propertyOwners, properties, formatINR, formatDate } from '@/lib/mock-data';
import { Plus, Search, Phone, Mail, Building2, Home, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function OwnersPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return propertyOwners.filter(o =>
      !search ||
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search) ||
      o.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Property Owners"
        description={`${filtered.length} owners in your network`}
        actions={<Button size="sm" onClick={() => toast.info('Owner creation form would open')}><Plus className="w-4 h-4 mr-2" /> Add Owner</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Owners', value: propertyOwners.length },
          { label: 'Verified', value: propertyOwners.filter(o => o.verified).length },
          { label: 'Total Properties', value: propertyOwners.reduce((s, o) => s + o.propertyCount, 0) },
          { label: 'Total Value', value: formatINR(propertyOwners.reduce((s, o) => s + o.totalPropertyValue, 0)) },
        ].map(s => (
          <div key={s.label} className="rounded-lg border bg-card p-3">
            <p className="text-xl font-bold tabular-nums">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search owners..."
          className="w-full h-9 rounded-md border border-input bg-card pl-9 pr-3 text-sm" />
      </div>

      {filtered.length === 0 ? (
        <Card><CardContent className="pt-6 text-center text-muted-foreground py-12">No owners found.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(owner => (
            <Card key={owner.id} className="hover:shadow-md transition-base">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {owner.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{owner.name}</p>
                    <VerificationBadge verified={owner.verified} label={owner.verified ? 'Verified' : 'Unverified'} />
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {owner.phone}</p>
                  <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {owner.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Properties</p>
                    <p className="text-sm font-medium flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {owner.propertyCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Value</p>
                    <p className="text-sm font-medium">{formatINR(owner.totalPropertyValue)}</p>
                  </div>
                </div>
                {owner.properties.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {owner.properties.slice(0, 2).map(pid => {
                      const prop = properties.find(p => p.id === pid);
                      return prop ? (
                        <p key={pid} className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                          <Home className="w-3 h-3 flex-shrink-0" /> {prop.title}
                        </p>
                      ) : null;
                    })}
                    {owner.properties.length > 2 && (
                      <p className="text-xs text-primary">+{owner.properties.length - 2} more</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
