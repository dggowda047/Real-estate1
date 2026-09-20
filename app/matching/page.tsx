'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmptyState } from '@/components/shared/empty-states';
import { leads, properties, propertyMatches, formatINR, formatDate } from '@/lib/mock-data';
import type { Lead, Property } from '@/types';
import { GitCompareArrows, Check, X, MapPin, Home, IndianRupee, BedDouble, Sparkles, ChevronRight, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function MatchingPage() {
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');
  const [search, setSearch] = useState('');

  const selectedLead = leads.find(l => l.id === selectedLeadId);

  const matches = useMemo(() => {
    if (!selectedLead) return [];
    return properties
      .filter(p => p.status === 'ACTIVE')
      .map(p => {
        const reasons: string[] = [];
        const mismatches: string[] = [];
        let score = 0;

        if (p.location === selectedLead.location) { reasons.push(`Location: ${p.location}`); score += 20; }
        else mismatches.push(`Location: ${p.location} vs ${selectedLead.location}`);

        if (p.price >= selectedLead.requirement.minBudget && p.price <= selectedLead.requirement.maxBudget) {
          reasons.push(`Budget: ${formatINR(p.price)}`); score += 25;
        } else if (p.price >= selectedLead.requirement.minBudget * 0.8 && p.price <= selectedLead.requirement.maxBudget * 1.2) {
          reasons.push('Budget: Close match'); score += 15;
        } else mismatches.push(`Budget: ${formatINR(p.price)}`);

        if (p.propertyType === selectedLead.propertyType) { reasons.push(`Type: ${p.propertyType.replace('_', ' ')}`); score += 20; }
        else mismatches.push(`Type: ${p.propertyType.replace('_', ' ')}`);

        if (p.bedrooms && selectedLead.bedrooms && p.bedrooms === selectedLead.bedrooms) { reasons.push(`${p.bedrooms} BHK`); score += 15; }
        else if (p.bedrooms && selectedLead.bedrooms && Math.abs(p.bedrooms - selectedLead.bedrooms) <= 1) { reasons.push('Bedrooms: Close'); score += 8; }
        else mismatches.push(`Bedrooms: ${p.bedrooms || 'N/A'}`);

        if (p.availability === 'Ready to Move') { reasons.push('Ready to Move'); score += 10; }
        if (p.parking && selectedLead.requirement.parking) { reasons.push('Parking Available'); score += 5; }

        const shared = p.amenities.filter(a => selectedLead.requirement.amenities?.includes(a));
        if (shared.length > 0) { reasons.push(`${shared.length} matching amenities`); score += 5; }

        return { property: p, score: Math.min(score, 99), reasons, mismatches };
      })
      .filter(m => m.score >= 30)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [selectedLead]);

  const filteredLeads = leads.filter(l =>
    !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.location.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 50);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Property Matching"
        description="Match lead requirements against your property inventory"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Selector */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Select a Lead</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search leads..."
                  className="w-full h-9 rounded-md border border-input bg-card pl-9 pr-3 text-sm"
                />
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredLeads.map(lead => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-base ${selectedLeadId === lead.id ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/30'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">{lead.name}</p>
                      <Badge variant="outline" className={`text-xs ${lead.score === 'HOT' ? 'text-destructive' : lead.score === 'WARM' ? 'text-warning' : 'text-muted-foreground'}`}>{lead.score}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{lead.location} · {formatINR(lead.budget)}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedLead && (
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm">Lead Requirement</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span>{selectedLead.propertyType.replace('_', ' ')}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Budget</span><span>{formatINR(selectedLead.requirement.minBudget)} - {formatINR(selectedLead.requirement.maxBudget)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span>{selectedLead.requirement.preferredLocations.join(', ')}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Bedrooms</span><span>{selectedLead.bedrooms} BHK</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Timeline</span><span>{selectedLead.requirement.timeline}</span></div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Match Results */}
        <div className="lg:col-span-2 space-y-4">
          {matches.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <EmptyState icon={GitCompareArrows} title="No matches found" description="No properties match this lead's requirements. Try adjusting the lead's criteria." />
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{matches.length} matching properties</p>
                <Button size="sm" variant="outline" onClick={() => toast.info(`Would share top ${matches.length} properties with ${selectedLead?.name}`)}>
                  Share All Matches
                </Button>
              </div>
              {matches.map((match, i) => (
                <Card key={match.property.id} className="hover:shadow-md transition-base">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Home className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{match.property.title}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {match.property.location} · {formatINR(match.property.price)}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2.5 rounded-full bg-muted overflow-hidden">
                                <div className={`h-full rounded-full ${match.score >= 80 ? 'bg-success' : match.score >= 60 ? 'bg-warning' : 'bg-muted-foreground'}`} style={{ width: `${match.score}%` }} />
                              </div>
                              <span className={`text-lg font-bold tabular-nums ${match.score >= 80 ? 'text-success' : match.score >= 60 ? 'text-warning' : 'text-muted-foreground'}`}>{match.score}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                          <div>
                            <p className="text-xs font-medium text-success mb-1">Match Reasons</p>
                            <div className="space-y-1">
                              {match.reasons.map((r, j) => (
                                <p key={j} className="text-xs flex items-center gap-1.5">
                                  <Check className="w-3 h-3 text-success" /> {r}
                                </p>
                              ))}
                            </div>
                          </div>
                          {match.mismatches.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-1">Mismatches</p>
                              <div className="space-y-1">
                                {match.mismatches.map((r, j) => (
                                  <p key={j} className="text-xs flex items-center gap-1.5 text-muted-foreground">
                                    <X className="w-3 h-3" /> {r}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 mt-3 pt-3 border-t">
                          <Button size="sm" variant="outline" onClick={() => toast.info(`Property shared with ${selectedLead?.name}`)}>
                            Share with Lead
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => toast.info('Site visit scheduling would open')}>
                            Schedule Visit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          {/* Existing matches from mock data */}
          {propertyMatches.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recently Generated Matches</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {propertyMatches.slice(0, 5).map(m => (
                  <div key={m.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/30">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{m.leadName} → {m.propertyTitle}</p>
                      <p className="text-xs text-muted-foreground truncate">{m.propertyLocation} · {formatINR(m.propertyPrice)}</p>
                    </div>
                    <Badge variant="outline" className={m.matchPercentage >= 80 ? 'text-success' : 'text-warning'}>
                      {m.matchPercentage}%
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
