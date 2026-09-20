'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DealStageBadge } from '@/components/shared/status-badges';
import { deals, formatINR, formatDate } from '@/lib/mock-data';
import type { Deal, DealStage } from '@/types';
import { Plus, GripVertical, User, Home, Calendar, IndianRupee, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const stages: { key: DealStage; label: string; color: string }[] = [
  { key: 'NEW_OPPORTUNITY', label: 'New Opportunity', color: 'border-t-blue-500' },
  { key: 'QUALIFIED', label: 'Qualified', color: 'border-t-cyan-500' },
  { key: 'PROPERTY_SHORTLISTED', label: 'Shortlisted', color: 'border-t-teal-500' },
  { key: 'SITE_VISIT', label: 'Site Visit', color: 'border-t-amber-500' },
  { key: 'NEGOTIATION', label: 'Negotiation', color: 'border-t-orange-500' },
  { key: 'TOKEN', label: 'Token', color: 'border-t-violet-500' },
  { key: 'AGREEMENT', label: 'Agreement', color: 'border-t-fuchsia-500' },
  { key: 'REGISTRATION', label: 'Registration', color: 'border-t-indigo-500' },
  { key: 'CLOSED_WON', label: 'Closed Won', color: 'border-t-green-500' },
  { key: 'CLOSED_LOST', label: 'Closed Lost', color: 'border-t-red-500' },
];

export default function DealsPage() {
  const [dealStages, setDealStages] = useState<Record<string, DealStage>>(
    Object.fromEntries(deals.map(d => [d.id, d.stage]))
  );
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<DealStage | null>(null);

  const dealsByStage = useMemo(() => {
    const map: Record<DealStage, Deal[]> = {} as Record<DealStage, Deal[]>;
    stages.forEach(s => { map[s.key] = []; });
    deals.forEach(d => {
      const stage = dealStages[d.id] || d.stage;
      if (map[stage]) map[stage].push(d);
    });
    return map;
  }, [dealStages]);

  const totalValue = deals.reduce((s, d) => s + d.dealValue, 0);
  const wonValue = deals.filter(d => dealStages[d.id] === 'CLOSED_WON').reduce((s, d) => s + d.dealValue, 0);

  const handleDragStart = (id: string) => setDraggedId(id);
  const handleDragOver = (e: React.DragEvent, stage: DealStage) => {
    e.preventDefault();
    setDragOverStage(stage);
  };
  const handleDrop = (stage: DealStage) => {
    if (draggedId) {
      const deal = deals.find(d => d.id === draggedId);
      const oldStage = dealStages[draggedId];
      if (oldStage !== stage) {
        setDealStages(prev => ({ ...prev, [draggedId]: stage }));
        toast.success(`Deal moved to ${stage.replace(/_/g, ' ').toLowerCase()}`);
      }
    }
    setDraggedId(null);
    setDragOverStage(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deal Pipeline"
        description={`${deals.length} deals · Total value ${formatINR(totalValue)} · Won ${formatINR(wonValue)}`}
        actions={
          <Button size="sm" onClick={() => toast.info('Deal creation form would open')}>
            <Plus className="w-4 h-4 mr-2" /> New Deal
          </Button>
        }
      />

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max">
          {stages.map(stage => {
            const stageDeals = dealsByStage[stage.key];
            const stageValue = stageDeals.reduce((s, d) => s + d.dealValue, 0);
            return (
              <div
                key={stage.key}
                className={`w-72 flex-shrink-0 rounded-lg border border-t-4 ${stage.color} bg-muted/30 ${dragOverStage === stage.key ? 'ring-2 ring-primary' : ''}`}
                onDragOver={(e) => handleDragOver(e, stage.key)}
                onDragLeave={() => setDragOverStage(null)}
                onDrop={() => handleDrop(stage.key)}
              >
                <div className="p-3 border-b bg-card rounded-t-md">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold">{stage.label}</p>
                    <Badge variant="outline" className="text-xs">{stageDeals.length}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground tabular-nums">{formatINR(stageValue)}</p>
                </div>
                <div className="p-2 space-y-2 max-h-[600px] overflow-y-auto">
                  {stageDeals.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">No deals</p>
                  ) : (
                    stageDeals.map(deal => (
                      <div
                        key={deal.id}
                        draggable
                        onDragStart={() => handleDragStart(deal.id)}
                        onDragEnd={() => { setDraggedId(null); setDragOverStage(null); }}
                        className={`bg-card rounded-md border p-3 cursor-grab active:cursor-grabbing hover:shadow-sm transition-base ${draggedId === deal.id ? 'opacity-50' : ''}`}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{deal.leadName}</p>
                            <p className="text-xs text-muted-foreground truncate">{deal.propertyTitle}</p>
                          </div>
                        </div>
                        <div className="space-y-1 ml-5">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold tabular-nums">{formatINR(deal.dealValue)}</span>
                            <Badge variant="outline" className="text-xs">{deal.probability}%</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(deal.expectedCloseDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" /> Comm: {formatINR(deal.commissionAmount)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Agent: {deal.agentName}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deals Table View */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold mb-3">All Deals</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Deal</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Stage</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Value</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Commission</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Agent</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Expected Close</th>
                </tr>
              </thead>
              <tbody>
                {deals.map(deal => (
                  <tr key={deal.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-3 py-2">
                      <p className="font-medium text-sm">{deal.leadName}</p>
                      <p className="text-xs text-muted-foreground">{deal.propertyTitle}</p>
                    </td>
                    <td className="px-3 py-2"><DealStageBadge stage={dealStages[deal.id] || deal.stage} /></td>
                    <td className="px-3 py-2 text-right font-medium tabular-nums">{formatINR(deal.dealValue)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{formatINR(deal.commissionAmount)}</td>
                    <td className="px-3 py-2 text-muted-foreground">{deal.agentName}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">{formatDate(deal.expectedCloseDate)}</td>
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
