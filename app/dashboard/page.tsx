'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-provider';
import { PageHeader, StatCard } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LeadStatusBadge, LeadScoreBadge, DealStageBadge } from '@/components/shared/status-badges';
import { leads, properties, deals, siteVisits, tasks, commissions, formatINR, formatDate, timeAgo, isOverdue } from '@/lib/mock-data';
import {
  Users, Flame, CheckSquare, Calendar, Handshake, BadgeIndianRupee, TrendingUp,
  Building2, Phone, Mail, MessageSquare, ArrowUpRight, Clock, MapPin, ChevronRight,
  CircleDot, Activity, Trophy, Target,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

export default function DashboardPage() {
  const { user } = useApp();
  const isAgencyAdmin = user?.role === 'AGENCY_ADMIN' || user?.role === 'SUPER_ADMIN';

  const stats = useMemo(() => {
    const newLeads = leads.filter(l => l.status === 'NEW').length;
    const hotLeads = leads.filter(l => l.score === 'HOT').length;
    const followUpsToday = tasks.filter(t => t.status === 'PENDING' || t.status === 'OVERDUE').length;
    const upcomingVisits = siteVisits.filter(v => v.status === 'SCHEDULED' || v.status === 'CONFIRMED').length;
    const activeDeals = deals.filter(d => !d.stage.startsWith('CLOSED')).length;
    const expectedCommission = deals
      .filter(d => !d.stage.startsWith('CLOSED'))
      .reduce((sum, d) => sum + d.commissionAmount, 0);
    const closedDeals = deals.filter(d => d.stage === 'CLOSED_WON').length;
    const monthlyRevenue = deals
      .filter(d => d.stage === 'CLOSED_WON')
      .reduce((sum, d) => sum + d.dealValue, 0);
    const activeProperties = properties.filter(p => p.status === 'ACTIVE').length;
    const totalCommission = commissions.reduce((s, c) => s + c.totalCommission, 0);
    const paidCommission = commissions.reduce((s, c) => s + c.paidAmount, 0);

    return {
      newLeads, hotLeads, followUpsToday, upcomingVisits, activeDeals,
      expectedCommission, closedDeals, monthlyRevenue, activeProperties,
      totalCommission, paidCommission, commissionPayable: totalCommission - paidCommission,
    };
  }, []);

  // Lead funnel data
  const funnelData = useMemo(() => {
    const stages = [
      { name: 'New', key: 'NEW' },
      { name: 'Contacted', key: 'CONTACTED' },
      { name: 'Qualified', key: 'QUALIFIED' },
      { name: 'Property Shared', key: 'PROPERTY_SHARED' },
      { name: 'Site Visit', key: 'SITE_VISIT_SCHEDULED' },
      { name: 'Negotiation', key: 'NEGOTIATION' },
      { name: 'Closed', key: 'CLOSED' },
    ];
    return stages.map(s => ({
      name: s.name,
      value: leads.filter(l => l.status === s.key).length,
    }));
  }, []);

  // Lead source performance
  const sourceData = useMemo(() => {
    const sources = ['NOBROKER', '99ACRES', 'MAGICBRICKS', 'FACEBOOK', 'GOOGLE_ADS', 'WEBSITE', 'WHATSAPP', 'REFERRAL'];
    const labels: Record<string, string> = {
      NOBROKER: 'NoBroker', '99ACRES': '99acres', MAGICBRICKS: 'MagicBricks',
      FACEBOOK: 'Facebook', GOOGLE_ADS: 'Google Ads', WEBSITE: 'Website', WHATSAPP: 'WhatsApp', REFERRAL: 'Referral',
    };
    return sources.map(s => ({
      name: labels[s],
      leads: leads.filter(l => l.source === s).length,
      conversions: leads.filter(l => l.source === s && (l.status === 'CLOSED' || l.status === 'AGREEMENT' || l.status === 'TOKEN_PAID')).length,
    }));
  }, []);

  // Deal pipeline distribution
  const pipelineData = useMemo(() => {
    const stages = ['NEW_OPPORTUNITY', 'QUALIFIED', 'PROPERTY_SHORTLISTED', 'SITE_VISIT', 'NEGOTIATION', 'TOKEN', 'AGREEMENT', 'CLOSED_WON'];
    const labels: Record<string, string> = {
      NEW_OPPORTUNITY: 'New', QUALIFIED: 'Qualified', PROPERTY_SHORTLISTED: 'Shortlisted',
      SITE_VISIT: 'Visit', NEGOTIATION: 'Negotiation', TOKEN: 'Token', AGREEMENT: 'Agreement', CLOSED_WON: 'Won',
    };
    return stages.map(s => ({
      name: labels[s],
      value: deals.filter(d => d.stage === s).length,
    })).filter(d => d.value > 0);
  }, []);

  const PIE_COLORS = ['hsl(199, 89%, 48%)', 'hsl(142, 71%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(280, 65%, 60%)', 'hsl(340, 75%, 55%)', 'hsl(0, 72%, 51%)', 'hsl(199, 89%, 60%)', 'hsl(142, 71%, 55%)'];

  const recentLeads = leads.slice(0, 5);
  const todayActivities = tasks.filter(t => t.status === 'PENDING' || t.status === 'OVERDUE').slice(0, 5);
  const upcomingVisitsList = siteVisits.filter(v => v.status === 'SCHEDULED' || v.status === 'CONFIRMED').slice(0, 4);
  const recentDeals = deals.slice(0, 5);

  // Monthly trend data
  const monthlyData = [
    { month: 'Jan', leads: 45, deals: 2, revenue: 3500000 },
    { month: 'Feb', leads: 52, deals: 3, revenue: 5200000 },
    { month: 'Mar', leads: 38, deals: 1, revenue: 1800000 },
    { month: 'Apr', leads: 61, deals: 4, revenue: 8900000 },
    { month: 'May', leads: 48, deals: 2, revenue: 4200000 },
    { month: 'Jun', leads: 55, deals: 3, revenue: 6700000 },
    { month: 'Jul', leads: 67, deals: 5, revenue: 12500000 },
    { month: 'Aug', leads: 43, deals: 2, revenue: 3800000 },
    { month: 'Sep', leads: 72, deals: 4, revenue: 9800000 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name.split(' ')[0]}`}
        description={isAgencyAdmin ? "Here's your agency overview for today" : "Here's your performance summary for today"}
        actions={
          <div className="flex gap-2">
            <Link href="/leads"><Button variant="outline" size="sm"><Users className="w-4 h-4 mr-2" />View Leads</Button></Link>
            <Link href="/properties"><Button size="sm"><Building2 className="w-4 h-4 mr-2" />Add Property</Button></Link>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard label="New Leads" value={stats.newLeads} icon={Users} trend="up" trendValue="12%" color="primary" />
        <StatCard label="Hot Leads" value={stats.hotLeads} icon={Flame} trend="up" trendValue="8%" color="destructive" />
        <StatCard label="Follow-ups Today" value={stats.followUpsToday} icon={CheckSquare} color="warning" />
        <StatCard label="Upcoming Visits" value={stats.upcomingVisits} icon={Calendar} trend="up" trendValue="5%" color="default" />
        <StatCard label="Active Deals" value={stats.activeDeals} icon={Handshake} color="primary" />
        <StatCard label="Expected Commission" value={formatINR(stats.expectedCommission)} icon={BadgeIndianRupee} trend="up" trendValue="22%" color="success" />
        <StatCard label="Closed Deals" value={stats.closedDeals} icon={Trophy} color="success" />
        <StatCard label="Active Properties" value={stats.activeProperties} icon={Building2} color="default" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lead Funnel */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Lead Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={funnelData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Leads" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deal Pipeline Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Deal Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pipelineData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pipelineData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="leads" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorLeads)" name="Leads" />
                <Area type="monotone" dataKey="deals" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorDeals)" name="Deals" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Source Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={sourceData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" width={70} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="leads" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} name="Leads" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Leads */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Leads</CardTitle>
              <Link href="/leads" className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentLeads.map((lead) => (
              <Link key={lead.id} href={`/leads/${lead.id}`} className="flex items-center gap-3 p-2 -mx-2 rounded-md hover:bg-muted/50 transition-base">
                <Avatar className="w-9 h-9 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{lead.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {lead.sourceLabel} · {lead.location} · {formatINR(lead.budget)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <LeadScoreBadge score={lead.score} />
                  <span className="text-xs text-muted-foreground">{timeAgo(lead.createdAt)}</span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Today's Activities */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Today's Activities</CardTitle>
              <Link href="/tasks" className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayActivities.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-2 -mx-2 rounded-md hover:bg-muted/50 transition-base">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${task.status === 'OVERDUE' ? 'bg-destructive' : 'bg-primary'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{task.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {task.assigneeName} · Due {task.dueDate}
                  </p>
                </div>
                <Badge variant="outline" className={`text-xs ${task.priority === 'URGENT' ? 'border-destructive/30 text-destructive' : task.priority === 'HIGH' ? 'border-warning/30 text-warning' : ''}`}>
                  {task.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Visits & Recent Deals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Visits */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Upcoming Site Visits</CardTitle>
              <Link href="/visits" className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingVisitsList.map((visit) => (
              <div key={visit.id} className="flex items-center gap-3 p-3 rounded-md border">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <span className="text-xs font-medium">{new Date(visit.date).toLocaleDateString('en-IN', { month: 'short' })}</span>
                  <span className="text-lg font-bold leading-none">{new Date(visit.date).getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{visit.propertyTitle}</p>
                  <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {visit.propertyLocation}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{visit.leadName} · {visit.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Deal Pipeline Summary */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Active Deals</CardTitle>
              <Link href="/deals" className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentDeals.filter(d => !d.stage.startsWith('CLOSED')).slice(0, 5).map((deal) => (
              <Link key={deal.id} href="/deals" className="flex items-center gap-3 p-2 -mx-2 rounded-md hover:bg-muted/50 transition-base">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{deal.leadName}</p>
                  <p className="text-xs text-muted-foreground truncate">{deal.propertyTitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold tabular-nums">{formatINR(deal.dealValue)}</p>
                  <DealStageBadge stage={deal.stage} />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
