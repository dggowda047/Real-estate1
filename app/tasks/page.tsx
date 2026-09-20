'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TaskPriorityBadge, TaskStatusBadge } from '@/components/shared/status-badges';
import { EmptyState } from '@/components/shared/empty-states';
import { tasks, formatDate, isOverdue } from '@/lib/mock-data';
import type { TaskStatus } from '@/types';
import { Plus, CheckSquare, Clock, AlertTriangle, Calendar, Link2, User } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function TasksPage() {
  const [filter, setFilter] = useState<'all' | 'overdue' | 'today' | 'upcoming' | 'completed'>('all');
  const [showCreate, setShowCreate] = useState(false);

  const filtered = useMemo(() => {
    const today = new Date().toDateString();
    let result = tasks;
    switch (filter) {
      case 'overdue': result = tasks.filter(t => t.status === 'OVERDUE' || (t.status === 'PENDING' && isOverdue(t.dueDate))); break;
      case 'today': result = tasks.filter(t => new Date(t.dueDate).toDateString() === today && t.status !== 'COMPLETED'); break;
      case 'upcoming': result = tasks.filter(t => new Date(t.dueDate) > new Date() && t.status === 'PENDING'); break;
      case 'completed': result = tasks.filter(t => t.status === 'COMPLETED'); break;
    }
    return result.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [filter]);

  const stats = useMemo(() => ({
    total: tasks.length,
    overdue: tasks.filter(t => t.status === 'OVERDUE' || (t.status === 'PENDING' && isOverdue(t.dueDate))).length,
    today: tasks.filter(t => new Date(t.dueDate).toDateString() === new Date().toDateString() && t.status !== 'COMPLETED').length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
  }), []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks & Follow-ups"
        description={`${stats.total} tasks · ${stats.overdue} overdue · ${stats.today} due today`}
        actions={
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="w-4 h-4 mr-2" /> New Task</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>Create New Task</DialogTitle></DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="col-span-2 space-y-2"><Label>Task Title</Label><Input placeholder="e.g. Follow up with customer" /></div>
                <div className="space-y-2"><Label>Assignee</Label><Select><SelectTrigger><SelectValue placeholder="Select agent" /></SelectTrigger><SelectContent><SelectItem value="u-2">Priya Patel</SelectItem><SelectItem value="u-3">Arjun Reddy</SelectItem><SelectItem value="u-4">Sneha Iyengar</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label>Priority</Label><Select><SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger><SelectContent><SelectItem value="LOW">Low</SelectItem><SelectItem value="MEDIUM">Medium</SelectItem><SelectItem value="HIGH">High</SelectItem><SelectItem value="URGENT">Urgent</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label>Due Date</Label><Input type="date" /></div>
                <div className="space-y-2"><Label>Due Time</Label><Input type="time" /></div>
                <div className="col-span-2 space-y-2"><Label>Description</Label><Textarea placeholder="Task details..." rows={2} /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button onClick={() => { setShowCreate(false); toast.success('Task created successfully'); }}>Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Tasks', value: stats.total, filter: 'all' as const, icon: CheckSquare, color: 'text-primary' },
          { label: 'Overdue', value: stats.overdue, filter: 'overdue' as const, icon: AlertTriangle, color: 'text-destructive' },
          { label: 'Due Today', value: stats.today, filter: 'today' as const, icon: Clock, color: 'text-warning' },
          { label: 'Completed', value: stats.completed, filter: 'completed' as const, icon: CheckSquare, color: 'text-success' },
        ].map(s => (
          <button key={s.label} onClick={() => setFilter(s.filter)}
            className={`rounded-lg border bg-card p-4 text-left transition-base ${filter === s.filter ? 'ring-2 ring-primary' : 'hover:border-muted-foreground/30'}`}>
            <div className="flex items-center gap-2 mb-1">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card><CardContent className="pt-6">
          <EmptyState icon={CheckSquare} title="No tasks here" description="Create a new task to get started with your follow-ups." />
        </CardContent></Card>
      ) : (
        <div className="space-y-2">
          {filtered.map(task => (
            <Card key={task.id} className="hover:shadow-sm transition-base">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <button
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-base ${task.status === 'COMPLETED' ? 'bg-success border-success' : 'border-muted-foreground/30 hover:border-primary'}`}
                    onClick={() => toast.success(task.status === 'COMPLETED' ? 'Task reopened' : 'Task completed')}
                  >
                    {task.status === 'COMPLETED' && <CheckSquare className="w-3 h-3 text-success-foreground" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-sm font-medium ${task.status === 'COMPLETED' ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                      <TaskPriorityBadge priority={task.priority} />
                      {task.status !== 'COMPLETED' && <TaskStatusBadge status={task.status} />}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {task.assigneeName}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(task.dueDate)} · {task.dueTime}</span>
                      {task.relatedLeadName && <span className="flex items-center gap-1"><Link2 className="w-3 h-3" /> Lead: {task.relatedLeadName}</span>}
                      {task.relatedPropertyName && <span className="flex items-center gap-1"><Link2 className="w-3 h-3" /> Property: {task.relatedPropertyName}</span>}
                      {task.relatedDealName && <span className="flex items-center gap-1"><Link2 className="w-3 h-3" /> Deal: {task.relatedDealName}</span>}
                    </div>
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
