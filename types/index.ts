// Core domain types for EstateOS

export type UserRole =
  | 'SUPER_ADMIN'
  | 'AGENCY_ADMIN'
  | 'AGENT'
  | 'TEAM_MANAGER'
  | 'CUSTOMER'
  | 'PROPERTY_OWNER'
  | 'CHANNEL_PARTNER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  agencyId: string | null;
  agencyName?: string;
  avatar?: string;
  teamId?: string;
  teamName?: string;
  active: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Agency {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  plan: 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';
  activeAgents: number;
  maxAgents: number;
  createdAt: string;
  logo?: string;
}

export interface Team {
  id: string;
  name: string;
  agencyId: string;
  managerId: string;
  managerName: string;
  memberCount: number;
  createdAt: string;
}

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPERTY_SHARED'
  | 'SITE_VISIT_SCHEDULED'
  | 'SITE_VISITED'
  | 'NEGOTIATION'
  | 'TOKEN_PAID'
  | 'AGREEMENT'
  | 'CLOSED'
  | 'LOST'
  | 'NURTURE';

export type LeadSource =
  | 'NOBROKER'
  | '99ACRES'
  | 'MAGICBRICKS'
  | 'HOUSING_COM'
  | 'FACEBOOK'
  | 'GOOGLE_ADS'
  | 'WEBSITE'
  | 'WHATSAPP'
  | 'MANUAL'
  | 'CSV_IMPORT'
  | 'REFERRAL'
  | 'API';

export type LeadScore = 'HOT' | 'WARM' | 'COLD';

export type Purpose = 'BUY' | 'RENT' | 'SELL' | 'LEASE';

export type PropertyCategory = 'RESIDENTIAL' | 'COMMERCIAL';

export type PropertyType =
  | 'APARTMENT'
  | 'VILLA'
  | 'INDEPENDENT_HOUSE'
  | 'PLOT'
  | 'LAND'
  | 'OFFICE'
  | 'RETAIL'
  | 'INDUSTRIAL';

export type TransactionType = 'SALE' | 'RENT' | 'LEASE';

export type Furnishing = 'FULLY_FURNISHED' | 'SEMI_FURNISHED' | 'UNFURNISHED';

export type PropertyStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'HOLD'
  | 'SOLD'
  | 'RENTED'
  | 'INACTIVE'
  | 'EXPIRED';

export interface LeadRequirement {
  purpose: Purpose;
  category: PropertyCategory;
  propertyType: PropertyType;
  minBudget: number;
  maxBudget: number;
  preferredLocations: string[];
  minBedrooms?: number;
  maxBedrooms?: number;
  minArea?: number;
  maxArea?: number;
  furnishing?: Furnishing;
  parking?: boolean;
  amenities?: string[];
  timeline: string;
  financing: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  sourceLabel: string;
  status: LeadStatus;
  score: LeadScore;
  leadScoreValue: number;
  purpose: Purpose;
  requirement: LeadRequirement;
  location: string;
  budget: number;
  propertyType: PropertyType;
  bedrooms?: number;
  assignedAgentId: string;
  assignedAgentName: string;
  agencyId: string;
  lastActivity: string;
  nextFollowUp?: string;
  notes?: string;
  tags: string[];
  isDuplicate: boolean;
  duplicateOf?: string;
  createdAt: string;
  updatedAt: string;
  activities: LeadActivity[];
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: 'CREATED' | 'CONTACTED' | 'QUALIFIED' | 'PROPERTY_SHARED' | 'SITE_VISIT' | 'STATUS_CHANGE' | 'NOTE' | 'FOLLOW_UP' | 'CALL' | 'EMAIL' | 'WHATSAPP';
  description: string;
  performedBy: string;
  timestamp: string;
}

export interface Property {
  id: string;
  title: string;
  propertyType: PropertyType;
  category: PropertyCategory;
  transactionType: TransactionType;
  status: PropertyStatus;
  price: number;
  expectedPrice?: number;
  rent?: number;
  deposit?: number;
  location: string;
  address: string;
  latitude?: number;
  longitude?: number;
  bedrooms?: number;
  bathrooms?: number;
  builtUpArea?: number;
  carpetArea?: number;
  plotArea?: number;
  floor?: number;
  totalFloors?: number;
  age?: number;
  furnishing?: Furnishing;
  parking?: number;
  amenities: string[];
  availability: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  assignedAgentId: string;
  assignedAgentName: string;
  agencyId: string;
  photos: string[];
  description: string;
  verification: PropertyVerification;
  createdAt: string;
  updatedAt: string;
  views: number;
  matches: number;
}

export interface PropertyVerification {
  ownerVerified: boolean;
  propertyVerified: boolean;
  documentsVerified: boolean;
  locationVerified: boolean;
  priceVerified: boolean;
  availabilityVerified: boolean;
}

export interface PropertyMatch {
  id: string;
  leadId: string;
  leadName: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyPrice: number;
  matchPercentage: number;
  matchReasons: string[];
  mismatchReasons: string[];
  status: 'NEW' | 'SHARED' | 'INTERESTED' | 'NOT_INTERESTED';
  createdAt: string;
}

export type VisitStatus =
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'
  | 'RESCHEDULED';

export interface SiteVisit {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  agentId: string;
  agentName: string;
  agencyId: string;
  date: string;
  time: string;
  duration: string;
  meetingPoint: string;
  notes: string;
  status: VisitStatus;
  customerAttended?: boolean;
  agentAttended?: boolean;
  feedback?: string;
  rating?: number;
  nextAction?: string;
  createdAt: string;
}

export type DealStage =
  | 'NEW_OPPORTUNITY'
  | 'QUALIFIED'
  | 'PROPERTY_SHORTLISTED'
  | 'SITE_VISIT'
  | 'NEGOTIATION'
  | 'TOKEN'
  | 'AGREEMENT'
  | 'REGISTRATION'
  | 'CLOSED_WON'
  | 'CLOSED_LOST';

export interface Deal {
  id: string;
  title: string;
  leadId: string;
  leadName: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  agentId: string;
  agentName: string;
  agencyId: string;
  stage: DealStage;
  dealValue: number;
  expectedCloseDate: string;
  probability: number;
  commissionPercent: number;
  commissionAmount: number;
  tokenAmount?: number;
  agreementDate?: string;
  notes: string;
  activities: DealActivity[];
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

export interface DealActivity {
  id: string;
  dealId: string;
  type: 'STAGE_CHANGE' | 'NOTE' | 'DOCUMENT' | 'PAYMENT' | 'CREATED';
  description: string;
  performedBy: string;
  timestamp: string;
}

export interface Commission {
  id: string;
  dealId: string;
  dealTitle: string;
  dealValue: number;
  commissionPercent: number;
  commissionType: 'PERCENTAGE' | 'FIXED';
  totalCommission: number;
  agentShare: number;
  agentPercent: number;
  agencyShare: number;
  agencyPercent: number;
  referralShare: number;
  referralPercent: number;
  taxAmount: number;
  payableAmount: number;
  paidAmount: number;
  status: 'PENDING' | 'PARTIAL' | 'PAID' | 'CANCELLED';
  paymentDate?: string;
  agencyId: string;
  agentId: string;
  agentName: string;
  createdAt: string;
}

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  assigneeName: string;
  dueDate: string;
  dueTime: string;
  priority: TaskPriority;
  status: TaskStatus;
  relatedLeadId?: string;
  relatedLeadName?: string;
  relatedPropertyId?: string;
  relatedPropertyName?: string;
  relatedDealId?: string;
  relatedDealName?: string;
  reminder: boolean;
  agencyId: string;
  createdAt: string;
  completedAt?: string;
}

export type CommunicationChannel = 'CALL' | 'EMAIL' | 'WHATSAPP' | 'SMS' | 'IN_APP';

export interface Communication {
  id: string;
  leadId?: string;
  leadName?: string;
  customerId?: string;
  customerName?: string;
  channel: CommunicationChannel;
  direction: 'OUTBOUND' | 'INBOUND';
  subject: string;
  content: string;
  templateId?: string;
  templateName?: string;
  status: 'SENT' | 'DELIVERED' | 'READ' | 'FAILED' | 'PENDING';
  agentId: string;
  agentName: string;
  agencyId: string;
  timestamp: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  channel: CommunicationChannel;
  subject: string;
  body: string;
  variables: string[];
  agencyId: string;
  createdAt: string;
}

export type IntegrationStatus = 'CONNECTED' | 'NOT_CONNECTED' | 'PENDING' | 'ERROR' | 'API_REQUIRED';

export interface Integration {
  id: string;
  name: string;
  category: 'LEAD_SOURCE' | 'COMMUNICATION' | 'PAYMENT' | 'CALENDAR' | 'MAPS';
  description: string;
  status: IntegrationStatus;
  logo: string;
  lastSync?: string;
  leadCount?: number;
  configFields?: { label: string; key: string; type: string; required: boolean }[];
  apiRequired: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'LEAD' | 'TASK' | 'DEAL' | 'VISIT' | 'SYSTEM' | 'COMMISSION';
  read: boolean;
  link?: string;
  timestamp: string;
  userId: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: 'BUYER' | 'TENANT' | 'SELLER' | 'LANDLORD';
  budget: number;
  preferredLocations: string[];
  propertyType: PropertyType;
  purpose: Purpose;
  assignedAgentId: string;
  assignedAgentName: string;
  agencyId: string;
  leadCount: number;
  visitCount: number;
  dealCount: number;
  createdAt: string;
  notes?: string;
}

export interface PropertyOwner {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyCount: number;
  totalPropertyValue: number;
  agencyId: string;
  properties: string[];
  verified: boolean;
  createdAt: string;
}

export interface ChannelPartner {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  referralCount: number;
  activeDeals: number;
  totalCommission: number;
  agencyId: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  timestamp: string;
  agencyId: string;
}

export interface DashboardKPIs {
  newLeads: number;
  hotLeads: number;
  followUpsToday: number;
  upcomingVisits: number;
  activeDeals: number;
  expectedCommission: number;
  closedDeals: number;
  monthlyRevenue: number;
  totalAgents: number;
  totalLeads: number;
  activeProperties: number;
  totalRevenue: number;
  commissionPayable: number;
  newLeadsToday: number;
}
