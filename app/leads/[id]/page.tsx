'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LeadStatusBadge, LeadScoreBadge } from '@/components/shared/status-badges';
import { EmptyState } from '@/components/shared/empty-states';
import { leads, properties, formatINR, formatDate, formatDateTime, timeAgo } from '@/lib/mock-data';
import type { LeadStatus } from '@/types';
import {
  ArrowLeft, Phone, Mail, MessageSquare, MapPin, Home, IndianRupee, Calendar,
  Plus, Activity, User, AlertTriangle, Check, X, Clock, Building2, BedDouble,
  Car, Sofa, Sparkles, ChevronRight,
} from 'lucide-react';
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const statusFlow: LeadStatus[] = [
  'NEW', 'CONTACTED', 'QUALIFIED', 'PROPERTY_SHARED', 'SITE_VISIT_SCHEDULED',
  'SITE_VISITED', 'NEGOTIATION', 'TOKEN_PAID', 'AGREEMENT', 'CLOSED',
];

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lead = leads.find(l => l.id === params.id);
  const [activeTab, setActiveTab] = useState('activity');
  const [note, setNote] = useState('');
  const [newStatus, setNewStatus] = useState<string>('');

  const duplicates = useMemo(() => {
    if (!lead) return [];
    return leads.filter(l =>
      l.id !== lead.id &&
      (l.phone === lead.phone || l.email === lead.email ||
        (l.name === lead.name && l.location === lead.location))
    );
  }, [lead]);

  const matchedProperties = useMemo(() => {
    if (!lead) return [];
    return properties
      .filter(p =>
        p.location === lead.location &&
        p.propertyType === lead.propertyType &&
        p.price >= lead.requirement.minBudget * 0.7 &&
        p.price <= lead.requirement.maxBudget * 1.3 &&
        p.status === 'ACTIVE'
      )
      .slice(0, 5);
  }, [lead]);

  if (!lead) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Lead not found"
        description="This lead may have been deleted or moved."
        action={<Button onClick={() => router.push('/leads')} variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Leads</Button>}
      />
    );
  }

  const handleAddNote = () => {
    if (!note.trim()) return;
    toast.success('Note added to lead activity');
    setNote('');
  };

  const handleStatusChange = () => {
    if (!newStatus) return;
    toast.success(`Lead status updated to ${newStatus.replace(/_/g, ' ').toLowerCase()}`);
    setNewStatus('');
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb + Header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/leads" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Leads
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{lead.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Lead Header Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Avatar className="w-16 h-16 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                    {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-xl font-bold">{lead.name}</h1>
                    <LeadStatusBadge status={lead.status} />
                    <LeadScoreBadge score={lead.score} />
                    {lead.isDuplicate && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Possible Duplicate
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {lead.phone}</span>
                    <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {lead.email}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {lead.location}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Added {formatDate(lead.createdAt)}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline" onClick={() => toast.info(`Calling ${lead.phone}`)}>
                    <Phone className="w-4 h-4 mr-2" /> Call
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toast.info(`Sending WhatsApp to ${lead.name}`)}>
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp
                  </Button>
                  <Button size="sm" onClick={() => toast.info('New email draft created')}>
                    <Mail className="w-4 h-4 mr-2" /> Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="requirement">Requirement</TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="duplicates">Duplicates {duplicates.length > 0 && `(${duplicates.length})`}</TabsTrigger>
            </TabsList>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Activity Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...lead.activities].reverse().map((activity) => (
                      <div key={activity.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Activity className="w-4 h-4 text-primary" />
                          </div>
                          {activity !== lead.activities[lead.activities.length - 1] && (
                            <div className="w-0.5 h-12 bg-border mt-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">{activity.type.replace(/_/g, ' ')}</Badge>
                            <span className="text-xs text-muted-foreground">{formatDateTime(activity.timestamp)}</span>
                          </div>
                          <p className="text-sm">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">by {activity.performedBy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add Note + Status Change */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Add Note</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Add a note about this lead..."
                      rows={3}
                    />
                    <Button size="sm" onClick={handleAddNote} disabled={!note.trim()}>
                      <Plus className="w-4 h-4 mr-2" /> Add Note
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Update Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Label>Change Lead Status</Label>
                      <Select value={newStatus} onValueChange={setNewStatus}>
                        <SelectTrigger><SelectValue placeholder="Select new status" /></SelectTrigger>
                        <SelectContent>
                          {statusFlow.map(s => (
                            <SelectItem key={s} value={s}>{s.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</SelectItem>
                          ))}
                          <SelectItem value="LOST">Lost</SelectItem>
                          <SelectItem value="NURTURE">Nurture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button size="sm" onClick={handleStatusChange} disabled={!newStatus}>
                      Update Status
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Requirement Tab */}
            <TabsContent value="requirement">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Lead Requirement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Purpose', value: lead.purpose, icon: Building2 },
                      { label: 'Property Type', value: lead.propertyType.replace('_', ' '), icon: Home },
                      { label: 'Budget Range', value: `${formatINR(lead.requirement.minBudget)} - ${formatINR(lead.requirement.maxBudget)}`, icon: IndianRupee },
                      { label: 'Preferred Locations', value: lead.requirement.preferredLocations.join(', '), icon: MapPin },
                      { label: 'Bedrooms', value: lead.bedrooms ? `${lead.bedrooms} BHK` : 'Any', icon: BedDouble },
                      { label: 'Furnishing', value: lead.requirement.furnishing?.replace('_', ' ') || 'Any', icon: Sofa },
                      { label: 'Parking', value: lead.requirement.parking ? 'Required' : 'Not Required', icon: Car },
                      { label: 'Timeline', value: lead.requirement.timeline, icon: Clock },
                      { label: 'Financing', value: lead.requirement.financing ? 'Needed' : 'Not Needed', icon: IndianRupee },
                    ].map(item => (
                      <div key={item.label} className="rounded-lg border p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{item.label}</span>
                        </div>
                        <p className="text-sm font-medium capitalize">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  {lead.requirement.amenities && lead.requirement.amenities.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Preferred Amenities</p>
                      <div className="flex flex-wrap gap-2">
                        {lead.requirement.amenities.map(a => (
                          <Badge key={a} variant="outline" className="text-xs">
                            <Sparkles className="w-3 h-3 mr-1" /> {a}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {lead.notes && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-muted-foreground mb-1">Notes</p>
                      <p className="text-sm">{lead.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Matches Tab */}
            <TabsContent value="matches">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Matched Properties ({matchedProperties.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {matchedProperties.length === 0 ? (
                    <EmptyState icon={Home} title="No matches yet" description="No active properties match this lead's requirements." />
                  ) : (
                    <div className="space-y-3">
                      {matchedProperties.map((prop, i) => {
                        const matchScore = Math.min(95 - (i * 5), 99);
                        return (
                          <Link
                            key={prop.id}
                            href={`/properties/${prop.id}`}
                            className="flex items-center gap-4 p-3 rounded-lg border hover:border-primary/40 hover:bg-muted/30 transition-base"
                          >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Home className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{prop.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{prop.location} · {formatINR(prop.price)} · {prop.bedrooms} BHK</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                                  <div className="h-full bg-success rounded-full" style={{ width: `${matchScore}%` }} />
                                </div>
                                <span className="text-sm font-bold text-success tabular-nums">{matchScore}%</span>
                              </div>
                              <Button size="sm" variant="ghost" className="h-7 text-xs mt-1" onClick={(e) => { e.preventDefault(); toast.info('Property shared with lead'); }}>
                                Share <ChevronRight className="w-3 h-3 ml-1" />
                              </Button>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Duplicates Tab */}
            <TabsContent value="duplicates">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Possible Duplicates ({duplicates.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {duplicates.length === 0 ? (
                    <EmptyState icon={Check} title="No duplicates found" description="This lead appears to be unique based on phone, email, and name." />
                  ) : (
                    <div className="space-y-3">
                      {duplicates.map(dup => (
                        <div key={dup.id} className="flex items-center gap-4 p-3 rounded-lg border">
                          <Avatar className="w-10 h-10 flex-shrink-0">
                            <AvatarFallback className="bg-amber-10 text-amber-600 text-xs font-semibold">
                              {dup.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{dup.name}</p>
                            <p className="text-xs text-muted-foreground">{dup.phone} · {dup.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <LeadStatusBadge status={dup.status} />
                              <span className="text-xs text-muted-foreground">{formatDate(dup.createdAt)}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => toast.success('Leads merged successfully')}>
                              <Check className="w-3.5 h-3.5 mr-1" /> Merge
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => toast.info('Marked as separate lead')}>
                              <X className="w-3.5 h-3.5 mr-1" /> Keep Separate
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:w-72 space-y-4 flex-shrink-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Lead Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Lead Score</span><span className="font-bold tabular-nums">{lead.leadScoreValue}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Source</span><span>{lead.sourceLabel}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Purpose</span><span className="capitalize">{lead.purpose}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Budget</span><span className="font-medium">{formatINR(lead.budget)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Assigned Agent</span><span>{lead.assignedAgentName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Last Activity</span><span className="text-xs">{timeAgo(lead.lastActivity)}</span></div>
              {lead.nextFollowUp && (
                <div className="flex justify-between"><span className="text-muted-foreground">Next Follow-up</span><span className="text-xs">{formatDate(lead.nextFollowUp)}</span></div>
              )}
              <div className="flex justify-between"><span className="text-muted-foreground">Created</span><span className="text-xs">{formatDate(lead.createdAt)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Updated</span><span className="text-xs">{formatDate(lead.updatedAt)}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {lead.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs capitalize">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
