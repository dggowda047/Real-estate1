import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type {
  LeadStatus, LeadScore, PropertyStatus, DealStage,
  VisitStatus, TaskPriority, TaskStatus, IntegrationStatus,
} from '@/types';

const leadStatusConfig: Record<LeadStatus, { label: string; className: string }> = {
  NEW: { label: 'New', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' },
  CONTACTED: { label: 'Contacted', className: 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800' },
  QUALIFIED: { label: 'Qualified', className: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800' },
  PROPERTY_SHARED: { label: 'Property Shared', className: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800' },
  SITE_VISIT_SCHEDULED: { label: 'Visit Scheduled', className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800' },
  SITE_VISITED: { label: 'Site Visited', className: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800' },
  NEGOTIATION: { label: 'Negotiation', className: 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800' },
  TOKEN_PAID: { label: 'Token Paid', className: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800' },
  AGREEMENT: { label: 'Agreement', className: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 dark:border-fuchsia-800' },
  CLOSED: { label: 'Closed', className: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' },
  LOST: { label: 'Lost', className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800' },
  NURTURE: { label: 'Nurture', className: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700' },
};

const leadScoreConfig: Record<LeadScore, { label: string; className: string; dot: string }> = {
  HOT: { label: 'Hot', className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800', dot: 'bg-red-500' },
  WARM: { label: 'Warm', className: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800', dot: 'bg-orange-500' },
  COLD: { label: 'Cold', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800', dot: 'bg-blue-500' },
};

const propertyStatusConfig: Record<PropertyStatus, { label: string; className: string }> = {
  DRAFT: { label: 'Draft', className: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700' },
  ACTIVE: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' },
  HOLD: { label: 'On Hold', className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800' },
  SOLD: { label: 'Sold', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' },
  RENTED: { label: 'Rented', className: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800' },
  INACTIVE: { label: 'Inactive', className: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700' },
  EXPIRED: { label: 'Expired', className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800' },
};

const dealStageConfig: Record<DealStage, { label: string; className: string }> = {
  NEW_OPPORTUNITY: { label: 'New Opportunity', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' },
  QUALIFIED: { label: 'Qualified', className: 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800' },
  PROPERTY_SHORTLISTED: { label: 'Shortlisted', className: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800' },
  SITE_VISIT: { label: 'Site Visit', className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800' },
  NEGOTIATION: { label: 'Negotiation', className: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800' },
  TOKEN: { label: 'Token', className: 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800' },
  AGREEMENT: { label: 'Agreement', className: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 dark:border-fuchsia-800' },
  REGISTRATION: { label: 'Registration', className: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800' },
  CLOSED_WON: { label: 'Closed Won', className: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' },
  CLOSED_LOST: { label: 'Closed Lost', className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800' },
};

const visitStatusConfig: Record<VisitStatus, { label: string; className: string }> = {
  SCHEDULED: { label: 'Scheduled', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' },
  CONFIRMED: { label: 'Confirmed', className: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800' },
  COMPLETED: { label: 'Completed', className: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' },
  CANCELLED: { label: 'Cancelled', className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800' },
  NO_SHOW: { label: 'No Show', className: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700' },
  RESCHEDULED: { label: 'Rescheduled', className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800' },
};

const taskPriorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  LOW: { label: 'Low', className: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700' },
  MEDIUM: { label: 'Medium', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' },
  HIGH: { label: 'High', className: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800' },
  URGENT: { label: 'Urgent', className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800' },
};

const taskStatusConfig: Record<TaskStatus, { label: string; className: string }> = {
  PENDING: { label: 'Pending', className: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700' },
  IN_PROGRESS: { label: 'In Progress', className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' },
  COMPLETED: { label: 'Completed', className: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' },
  OVERDUE: { label: 'Overdue', className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800' },
};

const integrationStatusConfig: Record<IntegrationStatus, { label: string; className: string; dot: string }> = {
  CONNECTED: { label: 'Connected', className: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800', dot: 'bg-green-500' },
  NOT_CONNECTED: { label: 'Not Connected', className: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700', dot: 'bg-gray-400' },
  PENDING: { label: 'Pending', className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800', dot: 'bg-amber-500' },
  ERROR: { label: 'Error', className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800', dot: 'bg-red-500' },
  API_REQUIRED: { label: 'API Approval Required', className: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800', dot: 'bg-orange-500' },
};

export function LeadStatusBadge({ status, className }: { status: LeadStatus; className?: string }) {
  const config = leadStatusConfig[status];
  return <Badge variant="outline" className={cn(config.className, className)}>{config.label}</Badge>;
}

export function LeadScoreBadge({ score, className }: { score: LeadScore; className?: string }) {
  const config = leadScoreConfig[score];
  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full mr-1', config.dot)} />
      {config.label}
    </Badge>
  );
}

export function PropertyStatusBadge({ status, className }: { status: PropertyStatus; className?: string }) {
  const config = propertyStatusConfig[status];
  return <Badge variant="outline" className={cn(config.className, className)}>{config.label}</Badge>;
}

export function DealStageBadge({ stage, className }: { stage: DealStage; className?: string }) {
  const config = dealStageConfig[stage];
  return <Badge variant="outline" className={cn(config.className, className)}>{config.label}</Badge>;
}

export function VisitStatusBadge({ status, className }: { status: VisitStatus; className?: string }) {
  const config = visitStatusConfig[status];
  return <Badge variant="outline" className={cn(config.className, className)}>{config.label}</Badge>;
}

export function TaskPriorityBadge({ priority, className }: { priority: TaskPriority; className?: string }) {
  const config = taskPriorityConfig[priority];
  return <Badge variant="outline" className={cn(config.className, className)}>{config.label}</Badge>;
}

export function TaskStatusBadge({ status, className }: { status: TaskStatus; className?: string }) {
  const config = taskStatusConfig[status];
  return <Badge variant="outline" className={cn(config.className, className)}>{config.label}</Badge>;
}

export function IntegrationStatusBadge({ status, className }: { status: IntegrationStatus; className?: string }) {
  const config = integrationStatusConfig[status];
  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full mr-1', config.dot)} />
      {config.label}
    </Badge>
  );
}

export function VerificationBadge({ verified, label }: { verified: boolean; label: string }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-xs font-medium',
      verified ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full', verified ? 'bg-green-500' : 'bg-gray-300')} />
      {label}
    </span>
  );
}
