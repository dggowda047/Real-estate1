'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { LeadStatusBadge, LeadScoreBadge } from '@/components/shared/status-badges';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Download, Filter, Users, AlertTriangle, Phone, Mail } from 'lucide-react';
import { leads, leadSourceLabels, formatINR, formatDate, timeAgo } from '@/lib/mock-data';
import type { Lead, LeadStatus, LeadScore, LeadSource } from '@/types';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  DropdownMenuLabel, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const statusOptions = [
  { label: 'All Statuses', value: 'all' },
  { label: 'New', value: 'NEW' },
  { label: 'Contacted', value: 'CONTACTED' },
  { label: 'Qualified', value: 'QUALIFIED' },
  { label: 'Property Shared', value: 'PROPERTY_SHARED' },
  { label: 'Visit Scheduled', value: 'SITE_VISIT_SCHEDULED' },
  { label: 'Site Visited', value: 'SITE_VISITED' },
  { label: 'Negotiation', value: 'NEGOTIATION' },
  { label: 'Token Paid', value: 'TOKEN_PAID' },
  { label: 'Agreement', value: 'AGREEMENT' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'Lost', value: 'LOST' },
  { label: 'Nurture', value: 'NURTURE' },
];

const sourceOptions = [
  { label: 'All Sources', value: 'all' },
  ...Object.entries(leadSourceLabels).map(([value, label]) => ({ label, value })),
];

const scoreOptions = [
  { label: 'All Scores', value: 'all' },
  { label: 'Hot', value: 'HOT' },
  { label: 'Warm', value: 'WARM' },
  { label: 'Cold', value: 'COLD' },
];

export default function LeadsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const pageSize = 12;

  const filtered = useMemo(() => {
    let result = leads.filter(l => {
      const matchesSearch = !search ||
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.phone.includes(search) ||
        l.email.toLowerCase().includes(search.toLowerCase()) ||
        l.location.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
      const matchesSource = sourceFilter === 'all' || l.source === sourceFilter;
      const matchesScore = scoreFilter === 'all' || l.score === scoreFilter;
      return matchesSearch && matchesStatus && matchesSource && matchesScore;
    });

    result.sort((a, b) => {
      const aVal = a[sortKey as keyof Lead];
      const bVal = b[sortKey as keyof Lead];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return result;
  }, [search, statusFilter, sourceFilter, scoreFilter, sortKey, sortDirection]);

  const pagedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const duplicateCount = leads.filter(l => l.isDuplicate).length;

  const columns: Column<Lead>[] = [
    {
      key: 'name',
      label: 'Lead',
      sortable: true,
      render: (lead) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 flex-shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-medium text-sm truncate">{lead.name}</p>
              {lead.isDuplicate && (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">{lead.phone}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'sourceLabel',
      label: 'Source',
      sortable: true,
      render: (lead) => (
        <Badge variant="outline" className="text-xs">{lead.sourceLabel}</Badge>
      ),
    },
    {
      key: 'requirement',
      label: 'Requirement',
      render: (lead) => (
        <div className="text-xs">
          <p className="text-foreground">{lead.bedrooms} BHK {lead.propertyType.replace('_', ' ')}</p>
          <p className="text-muted-foreground">{lead.location}</p>
        </div>
      ),
    },
    {
      key: 'budget',
      label: 'Budget',
      sortable: true,
      render: (lead) => <span className="text-sm font-medium tabular-nums">{formatINR(lead.budget)}</span>,
    },
    {
      key: 'score',
      label: 'Score',
      sortable: true,
      render: (lead) => (
        <div className="flex items-center gap-2">
          <LeadScoreBadge score={lead.score} />
          <span className="text-xs text-muted-foreground tabular-nums">{lead.leadScoreValue}%</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (lead) => <LeadStatusBadge status={lead.status} />,
    },
    {
      key: 'assignedAgentName',
      label: 'Agent',
      sortable: true,
      render: (lead) => <span className="text-sm text-muted-foreground">{lead.assignedAgentName}</span>,
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (lead) => <span className="text-xs text-muted-foreground">{timeAgo(lead.createdAt)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description={`${filtered.length} leads in your pipeline${duplicateCount > 0 ? ` · ${duplicateCount} possible duplicates` : ''}`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.info('CSV export would generate a downloadable file')}>
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button size="sm" onClick={() => toast.info('Lead creation form would open here')}>
              <Plus className="w-4 h-4 mr-2" /> Add Lead
            </Button>
          </div>
        }
      />

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Leads', value: leads.length, color: 'text-primary' },
          { label: 'Hot Leads', value: leads.filter(l => l.score === 'HOT').length, color: 'text-destructive' },
          { label: 'New Today', value: leads.filter(l => l.status === 'NEW').length, color: 'text-warning' },
          { label: 'Duplicates', value: duplicateCount, color: 'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="rounded-lg border bg-card p-3">
            <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={pagedData}
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Search by name, phone, email, location..."
        filters={[
          { label: 'Status', value: statusFilter, options: statusOptions, onChange: (v) => { setStatusFilter(v); setPage(1); } },
          { label: 'Source', value: sourceFilter, options: sourceOptions, onChange: (v) => { setSourceFilter(v); setPage(1); } },
          { label: 'Score', value: scoreFilter, options: scoreOptions, onChange: (v) => { setScoreFilter(v); setPage(1); } },
        ]}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
        page={page}
        pageSize={pageSize}
        total={filtered.length}
        onPageChange={setPage}
        onRowClick={(lead) => router.push(`/leads/${lead.id}`)}
        getRowId={(lead) => lead.id}
        rowActions={(lead) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded-md hover:bg-muted" onClick={(e) => e.stopPropagation()}>
                <Filter className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push(`/leads/${lead.id}`)}>View Details</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info(`Calling ${lead.name}`)}>
                <Phone className="w-3.5 h-3.5 mr-2" /> Call
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info(`Emailing ${lead.name}`)}>
                <Mail className="w-3.5 h-3.5 mr-2" /> Email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.info('Lead assigned')}>Reassign</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info('Lead marked as lost')} className="text-destructive">Mark as Lost</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />
    </div>
  );
}
