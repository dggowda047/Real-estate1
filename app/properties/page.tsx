'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { PropertyStatusBadge, VerificationBadge } from '@/components/shared/status-badges';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Home, MapPin, BedDouble, Maximize, Eye, MoreHorizontal } from 'lucide-react';
import { properties, locations, formatINR, formatDate } from '@/lib/mock-data';
import type { Property, PropertyStatus, PropertyType } from '@/types';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const statusOptions = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Draft', value: 'DRAFT' },
  { label: 'On Hold', value: 'HOLD' },
  { label: 'Sold', value: 'SOLD' },
  { label: 'Rented', value: 'RENTED' },
  { label: 'Inactive', value: 'INACTIVE' },
];

const typeOptions = [
  { label: 'All Types', value: 'all' },
  { label: 'Apartment', value: 'APARTMENT' },
  { label: 'Villa', value: 'VILLA' },
  { label: 'Independent House', value: 'INDEPENDENT_HOUSE' },
  { label: 'Plot', value: 'PLOT' },
  { label: 'Land', value: 'LAND' },
  { label: 'Office', value: 'OFFICE' },
  { label: 'Retail', value: 'RETAIL' },
];

const locationOptions = [
  { label: 'All Locations', value: 'all' },
  ...locations.map(l => ({ label: l, value: l })),
];

export default function PropertiesPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locFilter, setLocFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [view, setView] = useState<'table' | 'grid'>('grid');
  const pageSize = 12;

  const filtered = useMemo(() => {
    let result = properties.filter(p => {
      const matchesSearch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.ownerName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesType = typeFilter === 'all' || p.propertyType === typeFilter;
      const matchesLoc = locFilter === 'all' || p.location === locFilter;
      return matchesSearch && matchesStatus && matchesType && matchesLoc;
    });

    result.sort((a, b) => {
      const aVal = a[sortKey as keyof Property];
      const bVal = b[sortKey as keyof Property];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
    return result;
  }, [search, statusFilter, typeFilter, locFilter, sortKey, sortDirection]);

  const pagedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: Column<Property>[] = [
    {
      key: 'title', label: 'Property', sortable: true,
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Home className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{p.title}</p>
            <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {p.location}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'propertyType', label: 'Type', sortable: true,
      render: (p) => <Badge variant="outline" className="text-xs">{p.propertyType.replace('_', ' ')}</Badge>,
    },
    {
      key: 'price', label: 'Price', sortable: true,
      render: (p) => <span className="text-sm font-medium tabular-nums">{formatINR(p.price)}</span>,
    },
    {
      key: 'bedrooms', label: 'BHK', sortable: true,
      render: (p) => p.bedrooms ? <span className="text-sm">{p.bedrooms} BHK</span> : <span className="text-xs text-muted-foreground">—</span>,
    },
    {
      key: 'builtUpArea', label: 'Area', sortable: true,
      render: (p) => p.builtUpArea ? <span className="text-sm">{p.builtUpArea} sqft</span> : <span className="text-xs text-muted-foreground">—</span>,
    },
    {
      key: 'status', label: 'Status', sortable: true,
      render: (p) => <PropertyStatusBadge status={p.status} />,
    },
    {
      key: 'assignedAgentName', label: 'Agent', sortable: true,
      render: (p) => <span className="text-sm text-muted-foreground">{p.assignedAgentName}</span>,
    },
    {
      key: 'createdAt', label: 'Added', sortable: true,
      render: (p) => <span className="text-xs text-muted-foreground">{formatDate(p.createdAt)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Properties"
        description={`${filtered.length} properties in your inventory`}
        actions={
          <div className="flex gap-2">
            <div className="flex border rounded-md overflow-hidden">
              <button
                className={`px-3 py-1.5 text-xs font-medium ${view === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
                onClick={() => setView('grid')}
              >Grid</button>
              <button
                className={`px-3 py-1.5 text-xs font-medium ${view === 'table' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
                onClick={() => setView('table')}
              >Table</button>
            </div>
            <Button size="sm" onClick={() => toast.info('Property creation form would open here')}>
              <Plus className="w-4 h-4 mr-2" /> Add Property
            </Button>
          </div>
        }
      />

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Properties', value: properties.length },
          { label: 'Active', value: properties.filter(p => p.status === 'ACTIVE').length },
          { label: 'Sold', value: properties.filter(p => p.status === 'SOLD').length },
          { label: 'Rented', value: properties.filter(p => p.status === 'RENTED').length },
        ].map(s => (
          <div key={s.label} className="rounded-lg border bg-card p-3">
            <p className="text-2xl font-bold tabular-nums">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          {[
            { label: 'Status', value: statusFilter, options: statusOptions, onChange: (v: string) => { setStatusFilter(v); setPage(1); } },
            { label: 'Type', value: typeFilter, options: typeOptions, onChange: (v: string) => { setTypeFilter(v); setPage(1); } },
            { label: 'Location', value: locFilter, options: locationOptions, onChange: (v: string) => { setLocFilter(v); setPage(1); } },
          ].map(f => (
            <select key={f.label} value={f.value} onChange={(e) => f.onChange(e.target.value)}
              className="h-9 rounded-md border border-input bg-card px-3 text-xs">
              {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          ))}
        </div>
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search properties..."
          className="h-9 rounded-md border border-input bg-card px-3 text-sm w-full sm:w-64"
        />
      </div>

      {view === 'grid' ? (
        <>
          {pagedData.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No properties found matching your filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pagedData.map(prop => (
                <Card key={prop.id} className="cursor-pointer hover:shadow-md transition-base overflow-hidden" onClick={() => router.push(`/properties/${prop.id}`)}>
                  <div className="h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative">
                    <Home className="w-12 h-12 text-primary/30" />
                    <div className="absolute top-2 right-2">
                      <PropertyStatusBadge status={prop.status} />
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="bg-card/90 text-xs">{prop.propertyType.replace('_', ' ')}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="font-medium text-sm truncate mb-1">{prop.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" /> {prop.location}
                    </p>
                    <p className="text-lg font-bold tabular-nums mb-2">{formatINR(prop.price)}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {prop.bedrooms && <span className="flex items-center gap-1"><BedDouble className="w-3 h-3" /> {prop.bedrooms}</span>}
                      {prop.builtUpArea && <span className="flex items-center gap-1"><Maximize className="w-3 h-3" /> {prop.builtUpArea}</span>}
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {prop.views}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t flex items-center gap-2 flex-wrap">
                      <VerificationBadge verified={prop.verification.ownerVerified} label="Owner" />
                      <VerificationBadge verified={prop.verification.propertyVerified} label="Property" />
                      <VerificationBadge verified={prop.verification.documentsVerified} label="Docs" />
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
        </>
      ) : (
        <DataTable
          columns={columns}
          data={pagedData}
          searchValue={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          searchPlaceholder="Search properties..."
          onSort={(k, d) => { setSortKey(k); setSortDirection(d); }}
          sortKey={sortKey}
          sortDirection={sortDirection}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onRowClick={(p) => router.push(`/properties/${p.id}`)}
          getRowId={(p) => p.id}
        />
      )}
    </div>
  );
}
