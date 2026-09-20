'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { users, teams, leads, deals, formatINR, formatDate } from '@/lib/mock-data';
import type { UserRole } from '@/types';
import { Plus, Phone, Mail, Shield, Users as UsersIcon, UserCheck, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const roleLabels: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  AGENCY_ADMIN: 'Agency Admin',
  AGENT: 'Agent',
  TEAM_MANAGER: 'Team Manager',
  CUSTOMER: 'Customer',
  PROPERTY_OWNER: 'Property Owner',
  CHANNEL_PARTNER: 'Channel Partner',
};

const roleColors: Record<UserRole, string> = {
  SUPER_ADMIN: 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800',
  AGENCY_ADMIN: 'bg-primary/10 text-primary border-primary/20',
  AGENT: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  TEAM_MANAGER: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  CUSTOMER: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700',
  PROPERTY_OWNER: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800',
  CHANNEL_PARTNER: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 dark:border-fuchsia-800',
};

export default function TeamPage() {
  const [showInvite, setShowInvite] = useState(false);
  const teamMembers = users.filter(u => u.role !== 'SUPER_ADMIN' && u.role !== 'CUSTOMER' && u.role !== 'PROPERTY_OWNER' && u.role !== 'CHANNEL_PARTNER');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team"
        description={`${teamMembers.length} team members across ${teams.length} teams`}
        actions={
          <Dialog open={showInvite} onOpenChange={setShowInvite}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Invite Member</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader><DialogTitle>Invite Team Member</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Enter name" /></div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="email@agency.com" /></div>
                <div className="space-y-2"><Label>Phone</Label><Input placeholder="+91 98XXXXXXXX" /></div>
                <div className="space-y-2"><Label>Role</Label><Select><SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger><SelectContent><SelectItem value="AGENT">Agent</SelectItem><SelectItem value="TEAM_MANAGER">Team Manager</SelectItem><SelectItem value="AGENCY_ADMIN">Agency Admin</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label>Team</Label><Select><SelectTrigger><SelectValue placeholder="Assign to team" /></SelectTrigger><SelectContent>{teams.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent></Select></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowInvite(false)}>Cancel</Button>
                <Button onClick={() => { setShowInvite(false); toast.success('Invitation sent successfully'); }}>Send Invite</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Members', value: teamMembers.length, icon: UsersIcon },
          { label: 'Agents', value: teamMembers.filter(u => u.role === 'AGENT').length, icon: UserCheck },
          { label: 'Managers', value: teamMembers.filter(u => u.role === 'TEAM_MANAGER').length, icon: Shield },
          { label: 'Teams', value: teams.length, icon: Building2 },
        ].map(s => (
          <div key={s.label} className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2 mb-1">
              <s.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-2xl font-bold tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Teams */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teams.map(team => (
            <Card key={team.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-sm">{team.name}</p>
                    <p className="text-xs text-muted-foreground">Manager: {team.managerName}</p>
                  </div>
                  <Badge variant="outline">{team.memberCount} members</Badge>
                </div>
                <div className="flex -space-x-2">
                  {teamMembers.filter(m => m.teamId === team.id).map(m => (
                    <Avatar key={m.id} className="w-8 h-8 border-2 border-card">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Members Table */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">All Members</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Member</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Role</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Team</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Contact</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Leads</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Deals</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map(member => {
                  const memberLeads = leads.filter(l => l.assignedAgentId === member.id).length;
                  const memberDeals = deals.filter(d => d.agentId === member.id).length;
                  return (
                    <tr key={member.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <Badge variant="outline" className={`text-xs ${roleColors[member.role]}`}>{roleLabels[member.role]}</Badge>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{member.teamName || '—'}</td>
                      <td className="px-3 py-2 text-xs text-muted-foreground">{member.phone}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{memberLeads}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{memberDeals}</td>
                      <td className="px-3 py-2">
                        <Badge variant="outline" className={member.active ? 'text-success border-success/30' : 'text-muted-foreground'}>
                          {member.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
