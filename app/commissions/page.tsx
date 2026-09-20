'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { commissions, deals, formatINR, formatINRFull, formatDate } from '@/lib/mock-data';
import { Plus, Download, IndianRupee, TrendingUp, Clock, CheckCircle2, Percent } from 'lucide-react';
import { toast } from 'sonner';

export default function CommissionsPage() {
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return commissions;
    return commissions.filter(c => c.status === statusFilter);
  }, [statusFilter]);

  const stats = useMemo(() => ({
    total: commissions.reduce((s, c) => s + c.totalCommission, 0),
    paid: commissions.reduce((s, c) => s + c.paidAmount, 0),
    payable: commissions.reduce((s, c) => s + (c.payableAmount - c.paidAmount), 0),
    pending: commissions.filter(c => c.status === 'PENDING').length,
  }), []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Commissions"
        description={`${commissions.length} commission records`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.info('Commission report would download')}>
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button size="sm" onClick={() => toast.info('Commission creation form would open')}>
              <Plus className="w-4 h-4 mr-2" /> Add Commission
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Commission', value: formatINR(stats.total), icon: IndianRupee, color: 'text-primary' },
          { label: 'Paid', value: formatINR(stats.paid), icon: CheckCircle2, color: 'text-success' },
          { label: 'Payable', value: formatINR(stats.payable), icon: Clock, color: 'text-warning' },
          { label: 'Pending Records', value: stats.pending, icon: TrendingUp, color: 'text-muted-foreground' },
        ].map(s => (
          <div key={s.label} className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className={`text-xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-card px-3 text-xs">
          <option value="all">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="PARTIAL">Partial</option>
          <option value="PAID">Paid</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <Card><CardContent className="pt-6 text-center text-muted-foreground py-12">No commission records found.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(comm => (
            <Card key={comm.id} className="hover:shadow-md transition-base">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate">{comm.dealTitle}</p>
                      <Badge variant="outline" className={`text-xs ${comm.status === 'PAID' ? 'text-success' : comm.status === 'PENDING' ? 'text-warning' : 'text-muted-foreground'}`}>
                        {comm.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Agent: {comm.agentName} · Created {formatDate(comm.createdAt)}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Deal Value</p>
                      <p className="font-medium tabular-nums">{formatINR(comm.dealValue)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Commission ({comm.commissionPercent}%)</p>
                      <p className="font-medium tabular-nums">{formatINR(comm.totalCommission)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Agent Share ({comm.agentPercent}%)</p>
                      <p className="font-medium tabular-nums text-primary">{formatINR(comm.agentShare)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Agency Share ({comm.agencyPercent}%)</p>
                      <p className="font-medium tabular-nums">{formatINR(comm.agencyShare)}</p>
                    </div>
                  </div>
                </div>

                {/* Split breakdown bar */}
                <div className="mt-3 pt-3 border-t">
                  <div className="flex h-6 rounded-md overflow-hidden text-xs font-medium">
                    <div className="bg-primary flex items-center justify-center px-2 text-primary-foreground" style={{ width: `${comm.agentPercent}%` }}>
                      Agent {comm.agentPercent}%
                    </div>
                    <div className="bg-success flex items-center justify-center px-2 text-success-foreground" style={{ width: `${comm.agencyPercent}%` }}>
                      Agency {comm.agencyPercent}%
                    </div>
                    <div className="bg-warning flex items-center justify-center px-2 text-warning-foreground" style={{ width: `${comm.referralPercent}%` }}>
                      Ref {comm.referralPercent}%
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Tax: {formatINR(comm.taxAmount)}</span>
                    <span>Payable: <span className="font-medium text-foreground">{formatINRFull(comm.payableAmount)}</span></span>
                    <span>Paid: <span className="font-medium text-success">{formatINR(comm.paidAmount)}</span></span>
                  </div>
                  {comm.status === 'PENDING' && (
                    <Button size="sm" className="mt-2" onClick={() => toast.success('Commission payment recorded')}>
                      <IndianRupee className="w-3.5 h-3.5 mr-1" /> Record Payment
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
