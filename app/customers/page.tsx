'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { customers, formatINR, formatDate } from '@/lib/mock-data';
import type { Customer } from '@/types';
import { Plus, Search, Phone, Mail, MapPin, Home, Calendar, Eye, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const typeOptions = [
  { label: 'All Types', value: 'all' },
  { label: 'Buyer', value: 'BUYER' },
  { label: 'Tenant', value: 'TENANT' },
  { label: 'Seller', value: 'SELLER' },
  { label: 'Landlord', value: 'LANDLORD' },
];

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filtered = useMemo(() => {
    return customers.filter(c => {
      const matchesSearch = !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'all' || c.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const pagedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description={`${filtered.length} customers in your database`}
        actions={<Button size="sm" onClick={() => toast.info('Customer creation form would open')}><Plus className="w-4 h-4 mr-2" /> Add Customer</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Customers', value: customers.length },
          { label: 'Buyers', value: customers.filter(c => c.type === 'BUYER').length },
          { label: 'Tenants', value: customers.filter(c => c.type === 'TENANT').length },
          { label: 'With Deals', value: customers.filter(c => c.dealCount > 0).length },
        ].map(s => (
          <div key={s.label} className="rounded-lg border bg-card p-3">
            <p className="text-2xl font-bold tabular-nums">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          className="h-9 rounded-md border border-input bg-card px-3 text-xs">
          {typeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search customers..."
            className="w-full h-9 rounded-md border border-input bg-card pl-9 pr-3 text-sm" />
        </div>
      </div>

      {pagedData.length === 0 ? (
        <Card><CardContent className="pt-6 text-center text-muted-foreground py-12">No customers found.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pagedData.map(c => (
            <Card key={c.id} className="hover:shadow-md transition-base">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{c.name}</p>
                    <Badge variant="outline" className="text-xs mt-0.5">{c.type}</Badge>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {c.phone}</p>
                  <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {c.email}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {c.preferredLocations.join(', ')}</p>
                  <p className="flex items-center gap-1.5"><Home className="w-3 h-3" /> Looking for: {c.propertyType.replace('_', ' ')}</p>
                  <p className="flex items-center gap-1.5"><ShoppingBag className="w-3 h-3" /> Budget: {formatINR(c.budget)}</p>
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t text-xs">
                  <span className="text-muted-foreground">{c.leadCount} leads</span>
                  <span className="text-muted-foreground">{c.visitCount} visits</span>
                  <span className="text-muted-foreground">{c.dealCount} deals</span>
                  <span className="text-muted-foreground ml-auto">{formatDate(c.createdAt)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filtered.length > pageSize && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Showing {(page-1)*pageSize+1}–{Math.min(page*pageSize, filtered.length)} of {filtered.length}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page<=1} onClick={() => setPage(page-1)}>Prev</Button>
            <span className="text-xs px-2 py-1.5">Page {page} of {Math.ceil(filtered.length/pageSize)}</span>
            <Button variant="outline" size="sm" disabled={page>=Math.ceil(filtered.length/pageSize)} onClick={() => setPage(page+1)}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}
