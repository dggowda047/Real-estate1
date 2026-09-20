'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VisitStatusBadge } from '@/components/shared/status-badges';
import { EmptyState } from '@/components/shared/empty-states';
import { siteVisits, formatINR, formatDate } from '@/lib/mock-data';
import type { VisitStatus } from '@/types';
import { Calendar, MapPin, Clock, User, Home, Plus, Phone, CheckCircle2, XCircle, Star } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const statusOptions = [
  { label: 'All Visits', value: 'all' },
  { label: 'Scheduled', value: 'SCHEDULED' },
  { label: 'Confirmed', value: 'CONFIRMED' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Cancelled', value: 'CANCELLED' },
  { label: 'No Show', value: 'NO_SHOW' },
  { label: 'Rescheduled', value: 'RESCHEDULED' },
];

export default function SiteVisitsPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [view, setView] = useState<'upcoming' | 'all'>('upcoming');

  const filtered = useMemo(() => {
    let result = siteVisits;
    if (view === 'upcoming') {
      result = result.filter(v => v.status === 'SCHEDULED' || v.status === 'CONFIRMED');
    }
    if (statusFilter !== 'all') {
      result = result.filter(v => v.status === statusFilter);
    }
    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [statusFilter, view]);

  const stats = useMemo(() => ({
    total: siteVisits.length,
    scheduled: siteVisits.filter(v => v.status === 'SCHEDULED').length,
    completed: siteVisits.filter(v => v.status === 'COMPLETED').length,
    cancelled: siteVisits.filter(v => v.status === 'CANCELLED' || v.status === 'NO_SHOW').length,
  }), []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Visits"
        description={`${filtered.length} visits ${view === 'upcoming' ? 'upcoming' : 'total'}`}
        actions={
          <div className="flex gap-2">
            <div className="flex border rounded-md overflow-hidden">
              <button className={`px-3 py-1.5 text-xs font-medium ${view === 'upcoming' ? 'bg-primary text-primary-foreground' : 'bg-card'}`} onClick={() => setView('upcoming')}>Upcoming</button>
              <button className={`px-3 py-1.5 text-xs font-medium ${view === 'all' ? 'bg-primary text-primary-foreground' : 'bg-card'}`} onClick={() => setView('all')}>All Visits</button>
            </div>
            <Dialog open={showCreate} onOpenChange={setShowCreate}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Schedule Visit</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Schedule New Site Visit</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2"><Label>Customer</Label><Select><SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger><SelectContent>{siteVisits.slice(0, 10).map(v => <SelectItem key={v.leadId} value={v.leadId}>{v.leadName}</SelectItem>)}</SelectContent></Select></div>
                  <div className="space-y-2"><Label>Property</Label><Select><SelectTrigger><SelectValue placeholder="Select property" /></SelectTrigger><SelectContent>{siteVisits.slice(0, 10).map(v => <SelectItem key={v.propertyId} value={v.propertyId}>{v.propertyTitle}</SelectItem>)}</SelectContent></Select></div>
                  <div className="space-y-2"><Label>Date</Label><Input type="date" /></div>
                  <div className="space-y-2"><Label>Time</Label><Input type="time" /></div>
                  <div className="space-y-2"><Label>Agent</Label><Select><SelectTrigger><SelectValue placeholder="Assign agent" /></SelectTrigger><SelectContent><SelectItem value="u-2">Priya Patel</SelectItem><SelectItem value="u-3">Arjun Reddy</SelectItem></SelectContent></Select></div>
                  <div className="space-y-2"><Label>Meeting Point</Label><Input placeholder="e.g. Property main gate" /></div>
                  <div className="col-span-2 space-y-2"><Label>Notes</Label><Textarea placeholder="Visit notes..." rows={2} /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                  <Button onClick={() => { setShowCreate(false); toast.success('Site visit scheduled successfully'); }}>Schedule Visit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Visits', value: stats.total },
          { label: 'Scheduled', value: stats.scheduled },
          { label: 'Completed', value: stats.completed },
          { label: 'Cancelled/No Show', value: stats.cancelled },
        ].map(s => (
          <div key={s.label} className="rounded-lg border bg-card p-3">
            <p className="text-2xl font-bold tabular-nums">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-card px-3 text-xs">
          {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <Card><CardContent className="pt-6">
          <EmptyState icon={Calendar} title="No site visits" description="Schedule your first site visit to get started." />
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(visit => (
            <Card key={visit.id} className="hover:shadow-md transition-base">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <span className="text-xs font-medium">{new Date(visit.date).toLocaleDateString('en-IN', { month: 'short' })}</span>
                      <span className="text-xl font-bold leading-none">{new Date(visit.date).getDate()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm truncate">{visit.propertyTitle}</p>
                        <VisitStatusBadge status={visit.status} />
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {visit.leadName}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {visit.propertyLocation}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {visit.time} · {visit.duration}</span>
                      </div>
                      {visit.feedback && (
                        <div className="mt-2 p-2 rounded-md bg-muted/50 text-xs">
                          <p className="font-medium mb-1">Feedback:</p>
                          <p className="text-muted-foreground">{visit.feedback}</p>
                          {visit.rating && (
                            <div className="flex items-center gap-1 mt-1">
                              {[1,2,3,4,5].map(n => (
                                <Star key={n} className={`w-3 h-3 ${n <= visit.rating! ? 'text-warning fill-warning' : 'text-muted-foreground/30'}`} />
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {visit.status === 'SCHEDULED' && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => toast.success('Visit confirmed')}><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Confirm</Button>
                        <Button size="sm" variant="ghost" onClick={() => toast.info('Rescheduling...')}><Calendar className="w-3.5 h-3.5 mr-1" /> Reschedule</Button>
                      </>
                    )}
                    {visit.status === 'COMPLETED' && visit.nextAction && (
                      <Badge variant="outline" className="text-xs">{visit.nextAction}</Badge>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => toast.info(`Calling ${visit.leadPhone}`)}>
                      <Phone className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
