export interface TenantLead {
  id: string;
  tenantId: string; // Multi-tenant support
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  company?: string;
  designation?: string;
  industry?: string;
  leadSource: TenantLeadSource;
  status: LeadStatus;
  stage: LeadStage;
  priority: LeadPriority;
  assignedTo?: string; // User ID within tenant
  createdBy: string; // User ID within tenant
  createdAt: string;
  updatedAt: string;
  lastContactedAt?: string;
  expectedValue?: number;
  currency: "INR" | "USD" | "EUR";

  // Address Information
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };

  // Requirements
  requirements?: string;
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  timeline?: string;

  // Tracking
  activities: LeadActivity[];
  notes: LeadNote[];
  documents: LeadDocument[];

  // Analytics
  score: number; // Lead scoring
  temperature: "hot" | "warm" | "cold";
  conversionProbability: number; // 0-100
  daysInPipeline: number;

  // Campaign tracking
  campaignId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;

  // Follow-up
  nextFollowUpDate?: string;
  followUpRequired: boolean;

  // Tenant-specific fields
  tenantLeadId?: string; // Custom lead ID format per tenant
  customFields?: Record<string, any>; // Tenant-specific custom fields
  tags: string[]; // Tenant-specific tags

  // Security and permissions
  visibility: "public" | "private" | "team" | "role_based";
  permissions: LeadPermissions;

  // Territory management (for multi-location tenants)
  territory?: string;
  region?: string;

  // Integration tracking
  externalIds?: Record<string, string>; // External system IDs
  syncStatus?: "synced" | "pending" | "failed" | "not_synced";
  lastSyncAt?: string;
}

export interface TenantLeadSource {
  id: string;
  tenantId: string; // Multi-tenant support
  name: string;
  type: "digital" | "traditional" | "referral" | "direct";
  category: string;
  description: string;
  isActive: boolean;
  cost?: number;
  conversionRate: number;
  totalLeads: number;
  convertedLeads: number;

  // Tenant-specific configuration
  customConfiguration?: Record<string, any>;
  trackingCode?: string; // For analytics
  utmSource?: string;
  utmMedium?: string;

  // Attribution and ROI
  attribution: {
    firstTouch: number;
    lastTouch: number;
    multiTouch: number;
  };

  // Permissions
  visibility: "public" | "private" | "team";
  allowedRoles?: string[];

  // Audit trail
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TenantLeadActivity {
  id: string;
  tenantId: string; // Multi-tenant support
  leadId: string;
  type:
    | "call"
    | "email"
    | "meeting"
    | "task"
    | "note"
    | "sms"
    | "whatsapp"
    | "site_visit"
    | "demo"
    | "proposal";
  title: string;
  description: string;
  status: "planned" | "in_progress" | "completed" | "cancelled";
  scheduledAt?: string;
  completedAt?: string;
  duration?: number; // in minutes
  outcome?: "positive" | "negative" | "neutral";
  createdBy: string;
  createdAt: string;
  updatedAt: string;

  // Enhanced fields
  location?: string; // For meetings/site visits
  attendees?: string[]; // User IDs
  followUpRequired?: boolean;
  nextSteps?: string;

  // Cost tracking
  cost?: number;
  currency?: string;

  // Integration
  externalId?: string; // Calendar/CRM integration
  syncedWith?: string[]; // External systems

  reminder?: {
    enabled: boolean;
    minutes: number;
    notificationChannels: ("email" | "sms" | "in_app")[];
  };

  // File attachments
  attachments?: ActivityAttachment[];

  // Permissions
  visibility: "public" | "private" | "team";
  allowedUsers?: string[];
}

// New interfaces for multi-tenant support
export interface LeadPermissions {
  canView: string[]; // User IDs, role IDs, or 'all'
  canEdit: string[];
  canDelete: string[];
  canAssign: string[];
  canExport: string[];
  canShare: string[];
  canManageActivities: string[];
  canManageNotes: string[];
}

export interface ActivityAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface TenantLeadNote {
  id: string;
  tenantId: string; // Multi-tenant support
  leadId: string;
  content: string;
  type:
    | "general"
    | "call_note"
    | "meeting_note"
    | "important"
    | "customer_feedback"
    | "competitor_info";
  isPrivate: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;

  // Enhanced fields
  tags?: string[];
  category?: string;
  sentiment?: "positive" | "negative" | "neutral";
  followUpRequired?: boolean;

  // Permissions
  visibility: "public" | "private" | "team";
  allowedUsers?: string[];

  // Rich content support
  formatting?: "plain" | "markdown" | "html";
  attachments?: ActivityAttachment[];
}

export interface LeadDocument {
  id: string;
  leadId: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  category: "proposal" | "contract" | "brochure" | "presentation" | "other";
}

export interface TenantLeadForm {
  // Basic information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  company?: string;
  designation?: string;
  industry?: string;

  // Lead details
  leadSourceId: string;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo?: string;
  expectedValue?: number;
  requirements?: string;
  budgetMin?: number;
  budgetMax?: number;
  timeline?: string;

  // Address
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;

  // Attribution
  campaignId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;

  // Follow-up
  nextFollowUpDate?: string;

  // Tenant-specific fields
  territory?: string;
  region?: string;
  tags?: string[];
  customFields?: Record<string, any>;

  // Security
  visibility: "public" | "private" | "team";
  allowedRoles?: string[];
}

export interface ConversionFunnel {
  stage: LeadStage;
  count: number;
  percentage: number;
  value: number;
  averageDays: number;
}

export interface TenantLeadAnalytics {
  tenantId: string;
  period: {
    startDate: string;
    endDate: string;
  };

  // Core metrics
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number;
  averageDealValue: number;
  totalPipelineValue: number;
  averageSalescycle: number;

  // Tenant-specific KPIs
  tenantKPIs: {
    leadVelocity: number; // Leads per day
    salesVelocity: number; // Revenue per day
    customerAcquisitionCost: number;
    leadToCustomerTime: number; // Average days
    pipelineCoverage: number; // Pipeline vs target
    winRate: number;
  };

  // By period
  thisMonth: TenantPeriodStats;
  lastMonth: TenantPeriodStats;
  thisQuarter: TenantPeriodStats;
  lastQuarter: TenantPeriodStats;

  // By source (tenant-specific sources)
  sourceBreakdown: TenantSourceAnalytics[];

  // By territory/region
  territoryBreakdown: TenantTerritoryAnalytics[];

  // Funnel analysis
  funnel: TenantConversionFunnel[];

  // Team performance
  teamPerformance: TenantTeamPerformance[];

  // Industry/sector analysis (for multi-industry tenants)
  industryBreakdown: TenantIndustryAnalytics[];

  // Lead quality metrics
  qualityMetrics: {
    averageLeadScore: number;
    hotLeadsPercentage: number;
    qualifiedLeadsPercentage: number;
    unqualifiedLeadsPercentage: number;
  };

  // Trends and forecasting
  trends: {
    leadGrowth: number; // Month over month %
    conversionTrend: number;
    valueGrowth: number;
    forecast: {
      nextMonth: TenantForecast;
      nextQuarter: TenantForecast;
    };
  };
}

// Supporting interfaces for tenant analytics
export interface TenantPeriodStats {
  leads: number;
  converted: number;
  value: number;
  activities: number;
  meetings: number;
  proposals: number;
}

export interface TenantSourceAnalytics {
  sourceId: string;
  sourceName: string;
  leads: number;
  converted: number;
  value: number;
  cost: number;
  roi: number;
  conversionRate: number;
  averageDealSize: number;
  salesCycle: number;
}

export interface TenantTerritoryAnalytics {
  territory: string;
  region: string;
  leads: number;
  converted: number;
  value: number;
  conversionRate: number;
  marketPenetration: number;
}

export interface TenantConversionFunnel {
  stage: LeadStage;
  count: number;
  percentage: number;
  value: number;
  averageDays: number;
  conversionRate: number;
  dropOffRate: number;
}

export interface TenantTeamPerformance {
  userId: string;
  userName: string;
  role: string;
  territory?: string;
  leads: number;
  converted: number;
  value: number;
  activities: number;
  conversionRate: number;
  averageDealSize: number;
  salesCycle: number;
  quota?: number;
  achievement?: number;
}

export interface TenantIndustryAnalytics {
  industry: string;
  leads: number;
  converted: number;
  value: number;
  conversionRate: number;
  averageDealSize: number;
  marketShare: number;
}

export interface TenantForecast {
  leads: number;
  value: number;
  probability: number;
  confidence: "low" | "medium" | "high";
}

// Lead Document with tenant support
export interface TenantLeadDocument {
  id: string;
  tenantId: string;
  leadId: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  category:
    | "proposal"
    | "contract"
    | "brochure"
    | "presentation"
    | "legal"
    | "financial"
    | "technical"
    | "other";

  // Enhanced fields
  version: string;
  isLatest: boolean;
  parentDocumentId?: string; // For versioning
  expiresAt?: string;

  // Security
  encryption: boolean;
  accessLevel: "public" | "private" | "restricted";
  allowedUsers?: string[];

  // Metadata
  tags: string[];
  description?: string;
  customMetadata?: Record<string, any>;
}

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost"
  | "nurturing"
  | "on_hold";

export type LeadStage =
  | "prospect"
  | "lead"
  | "opportunity"
  | "proposal"
  | "negotiation"
  | "closed_won"
  | "closed_lost";

export type LeadPriority = "low" | "medium" | "high" | "urgent";

export type LeadTemperature = "hot" | "warm" | "cold";

// Search and filter interfaces for tenant leads
export interface TenantLeadSearchFilters {
  query?: string;
  status?: LeadStatus[];
  stage?: LeadStage[];
  priority?: LeadPriority[];
  leadSource?: string[];
  assignedTo?: string[];
  territory?: string[];
  region?: string[];
  industry?: string[];
  tags?: string[];

  // Date filters
  dateRange?: {
    start: string;
    end: string;
  };
  createdDateRange?: {
    start: string;
    end: string;
  };
  lastContactDateRange?: {
    start: string;
    end: string;
  };

  // Value filters
  valueRange?: {
    min: number;
    max: number;
  };

  // Activity filters
  followUpOverdue?: boolean;
  noActivityDays?: number;
  lastActivityType?: string[];

  // Quality filters
  leadScore?: {
    min: number;
    max: number;
  };
  temperature?: LeadTemperature[];

  // Ownership filters
  createdBy?: string[];
  visibility?: ("public" | "private" | "team")[];

  // Custom field filters
  customFields?: Record<string, any>;
}

export interface LeadSortOptions {
  field:
    | "createdAt"
    | "updatedAt"
    | "lastName"
    | "company"
    | "expectedValue"
    | "score";
  direction: "asc" | "desc";
}
