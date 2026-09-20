'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { leads, properties, deals, siteVisits, commissions, agents, formatINR } from '@/lib/mock-data';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { TrendingUp, TrendingDown, Users, Building2, Handshake, BadgeIndianRupee, Calendar, Filter } from 'lucide-react';

const PIE_COLORS = ['hsl(199, 89%, 48%)', 'hsl(142, 71%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(280, 65%, 60%)', 'hsl(340, 75%, 55%)', 'hsl(0, 72%, 51%)'];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('6m');

  // Lead funnel report
  const funnelData = useMemo(() => {
    const stages = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPERTY_SHARED', 'SITE_VISIT_SCHEDULED', 'SITE_VISITED', 'NEGOTIATION', 'CLOSED'];
    return stages.map(s => ({
      name: s.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
      count: leads.filter(l => l.status === s).length,
    }));
  }, []);

  // Lead source performance
  const sourceData = useMemo(() => {
    const sources = ['NOBROKER', '99ACRES', 'MAGICBRICKS', 'FACEBOOK', 'GOOGLE_ADS', 'WEBSITE', 'WHATSAPP', 'REFERRAL'];
    const labels: Record<string, string> = {
      NOBROKER: 'NoBroker', '99ACRES': '99acres', MAGICBRICKS: 'MagicBricks',
      FACEBOOK: 'Facebook', GOOGLE_ADS: 'Google Ads', WEBSITE: 'Website', WHATSAPP: 'WhatsApp', REFERRAL: 'Referral',
    };
    return sources.map(s => {
      const sourceLeads = leads.filter(l => l.source === s);
      const closed = sourceLeads.filter(l => l.status === 'CLOSED').length;
      return {
        name: labels[s],
        leads: sourceLeads.length,
        closed,
        conversion: sourceLeads.length > 0 ? Math.round((closed / sourceLeads.length) * 100) : 0,
      };
    });
  }, []);

  // Agent performance
  const agentPerf = useMemo(() => {
    return agents.map(a => {
      const agentLeads = leads.filter(l => l.assignedAgentId === a.id);
      const agentDeals = deals.filter(d => d.agentId === a.id);
      const agentVisits = siteVisits.filter(v => v.agentId === a.id);
      const revenue = agentDeals.filter(d => d.stage === 'CLOSED_WON').reduce((s, d) => s + d.dealValue, 0);
      return {
        name: a.name,
        leads: agentLeads.length,
        visits: agentVisits.length,
        deals: agentDeals.length,
        revenue,
        conversion: agentLeads.length > 0 ? Math.round((agentDeals.length / agentLeads.length) * 100) : 0,
      };
    });
  }, []);

  // Monthly trend
  const monthlyData = [
    { month: 'Apr', leads: 61, deals: 4, revenue: 8900000, visits: 12 },
    { month: 'May', leads: 48, deals: 2, revenue: 4200000, visits: 8 },
    { month: 'Jun', leads: 55, deals: 3, revenue: 6700000, visits: 10 },
    { month: 'Jul', leads: 67, deals: 5, revenue: 12500000, visits: 15 },
    { month: 'Aug', leads: 43, deals: 2, revenue: 3800000, visits: 7 },
    { month: 'Sep', leads: 72, deals: 4, revenue: 9800000, visits: 14 },
  ];

  // Property type distribution
  const propTypeData = useMemo(() => {
    const types = ['APARTMENT', 'VILLA', 'INDEPENDENT_HOUSE', 'PLOT', 'OFFICE', 'RETAIL'];
    return types.map(t => ({
      name: t.replace('_', ' '),
      value: properties.filter(p => p.propertyType === t).length,
    })).filter(d => d.value > 0);
  }, []);

  // Conversion rate
  const totalLeads = leads.length;
  const closedLeads = leads.filter(l => l.status === 'CLOSED').length;
  const conversionRate = ((closedLeads / totalLeads) * 100).toFixed(1);
  const lostLeads = leads.filter(l => l.status === 'LOST').length;
  const totalRevenue = deals.filter(d => d.stage === 'CLOSED_WON').reduce((s, d) => s + d.dealValue, 0);
  const totalCommission = commissions.reduce((s, c) => s + c.totalCommission, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Performance insights across your real estate business"
        actions={
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}
            className="h-9 rounded-md border border-input bg-card px-3 text-xs">
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        }
      />

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total Leads', value: totalLeads, icon: Users, color: 'text-primary' },
          { label: 'Conversion Rate', value: `${conversionRate}%`, icon: TrendingUp, color: 'text-success' },
          { label: 'Closed Deals', value: deals.filter(d => d.stage === 'CLOSED_WON').length, icon: Handshake, color: 'text-primary' },
          { label: 'Revenue', value: formatINR(totalRevenue), icon: BadgeIndianRupee, color: 'text-success' },
          { label: 'Commission', value: formatINR(totalCommission), icon: BadgeIndianRupee, color: 'text-warning' },
          { label: 'Lost Leads', value: lostLeads, icon: TrendingDown, color: 'text-destructive' },
        ].map(s => (
          <div key={s.label} className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2 mb-1">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className={`text-lg font-bold tabular-nums ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Lead Funnel</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={funnelData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Leads" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Lead Source Performance</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={sourceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="leads" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Total Leads" />
                <Bar dataKey="closed" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Closed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Monthly Trends</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="leads" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Leads" />
                <Line type="monotone" dataKey="deals" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Deals" />
                <Line type="monotone" dataKey="visits" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Visits" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Property Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={propTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                  {propTypeData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Table */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Agent Performance</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Agent</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Leads</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Visits</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Deals</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Revenue</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {agentPerf.map(a => (
                  <tr key={a.name} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-3 py-2 font-medium">{a.name}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{a.leads}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{a.visits}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{a.deals}</td>
                    <td className="px-3 py-2 text-right tabular-nums font-medium">{formatINR(a.revenue)}</td>
                    <td className="px-3 py-2 text-right">
                      <Badge variant="outline" className={a.conversion >= 10 ? 'text-success' : 'text-muted-foreground'}>{a.conversion}%</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
