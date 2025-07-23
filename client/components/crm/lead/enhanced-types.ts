// Enhanced CRM types for conversion workflows, assignment queue, and duplicate detection
import { TenantLead, LeadStatus, LeadStage, LeadPriority } from "./types";

// Customer entity (converted from lead)
export interface TenantCustomer {
  id: string;
  tenantId: string;
  customerId: string; // Tenant-specific customer ID format

  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  company?: string;
  designation?: string;
  industry?: string;

  // Address
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };

  // Customer Status
  status: "active" | "inactive" | "vip" | "blocked";
  tier: "bronze" | "silver" | "gold" | "platinum";
  lifetimeValue: number;
  currency: "INR" | "USD" | "EUR";

  // Conversion tracking
  convertedFromLeadId: string;
  conversionDate: string;
  conversionStage: LeadStage;
  conversionValue?: number;

  // Relationship management
  accountManager?: string; // User ID
  territory?: string;
  region?: string;

  // Engagement
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: string;
  lastContactDate?: string;
  preferredContactMethod: "email" | "phone" | "sms" | "whatsapp";

  // Tenant-specific fields
  customFields?: Record<string, any>;
  tags: string[];

  // Audit trail
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;

  // Security
  visibility: "public" | "private" | "team";
  permissions: CustomerPermissions;
}

export interface CustomerPermissions {
  canView: string[];
  canEdit: string[];
  canDelete: string[];
  canExport: string[];
  canContact: string[];
  canManageOrders: string[];
}

// Opportunity entity (converted from lead)
export interface TenantOpportunity {
  id: string;
  tenantId: string;
  opportunityId: string; // Tenant-specific opportunity ID format

  // Basic Information
  name: string;
  description?: string;
  value: number;
  currency: "INR" | "USD" | "EUR";

  // Probability and forecasting
  probability: number; // 0-100
  weightedValue: number; // value * probability
  stage: OpportunityStage;
  status: OpportunityStatus;

  // Relationships
  leadId?: string; // Original lead if converted
  customerId?: string; // Associated customer
  contactId?: string; // Primary contact
  accountId?: string; // Account if B2B

  // Sales information
  salesProcess: string; // Tenant-defined sales process
  nextSteps: string;
  keyStakeholders: OpportunityStakeholder[];
  competitorInfo?: CompetitorInfo[];

  // Timeline
  expectedCloseDate: string;
  actualCloseDate?: string;
  createdDate: string;
  lastActivityDate?: string;
  salesCycleStage: number; // Days in current stage
  totalSalesCycleDays: number;

  // Territory and assignment
  ownerId: string; // Assigned sales rep
  territory?: string;
  region?: string;

  // Product/Service details
  products: OpportunityProduct[];
  services: OpportunityService[];

  // Tracking and analytics
  sourceChannel: string;
  campaignId?: string;
  leadScore?: number;
  conversionMetrics: {
    leadToOpportunityDays: number;
    touchpointsToConversion: number;
    activitiesCount: number;
  };

  // Tenant-specific fields
  customFields?: Record<string, any>;
  tags: string[];

  // Audit trail
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;

  // Security
  visibility: "public" | "private" | "team";
  permissions: OpportunityPermissions;
}

export type OpportunityStage =
  | "qualification"
  | "needs_analysis"
  | "proposal"
  | "negotiation"
  | "closed_won"
  | "closed_lost";

export type OpportunityStatus = "open" | "won" | "lost" | "on_hold";

export interface OpportunityStakeholder {
  id: string;
  name: string;
  role: string;
  influence: "low" | "medium" | "high";
  attitude: "champion" | "supporter" | "neutral" | "skeptic" | "blocker";
  contactInfo: {
    email?: string;
    phone?: string;
  };
}

export interface CompetitorInfo {
  name: string;
  strengths: string[];
  weaknesses: string[];
  pricing?: number;
  probability: number; // Probability they'll win
}

export interface OpportunityProduct {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
  category: string;
}

export interface OpportunityService {
  id: string;
  name: string;
  description: string;
  duration: number; // months
  monthlyValue: number;
  totalValue: number;
  category: string;
}

export interface OpportunityPermissions {
  canView: string[];
  canEdit: string[];
  canDelete: string[];
  canExport: string[];
  canManageProducts: string[];
  canManageStakeholders: string[];
  canUpdateStage: string[];
}

// Lead Conversion Workflow
export interface LeadConversionWorkflow {
  id: string;
  tenantId: string;
  leadId: string;

  // Conversion configuration
  convertTo: ("contact" | "customer" | "opportunity")[];
  autoConversion: boolean;
  conversionCriteria: ConversionCriteria;

  // Workflow steps
  steps: ConversionStep[];
  currentStep: number;
  status: "pending" | "in_progress" | "completed" | "failed";

  // Results
  createdContactId?: string;
  createdCustomerId?: string;
  createdOpportunityId?: string;

  // Metadata
  initiatedBy: string;
  initiatedAt: string;
  completedAt?: string;
  failureReason?: string;

  // Approval workflow
  requiresApproval: boolean;
  approvedBy?: string;
  approvedAt?: string;
  approvalComments?: string;
}

export interface ConversionCriteria {
  minimumLeadScore?: number;
  requiredStage?: LeadStage;
  requiredStatus?: LeadStatus;
  minimumActivities?: number;
  hasQualificationCall?: boolean;
  hasProposal?: boolean;
  minimumValue?: number;
  customCriteria?: Record<string, any>;
}

export interface ConversionStep {
  id: string;
  name: string;
  description: string;
  type:
    | "validation"
    | "data_mapping"
    | "creation"
    | "notification"
    | "integration";
  status: "pending" | "completed" | "failed" | "skipped";
  order: number;
  config: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
}

// Assignment Queue System
export interface AssignmentQueue {
  id: string;
  tenantId: string;
  name: string;
  description: string;

  // Queue configuration
  type: "round_robin" | "load_balanced" | "skill_based" | "territory_based";
  autoAssignment: boolean;
  assignmentTimeout: number; // hours
  escalationTimeout: number; // hours

  // Assignment rules
  assignmentRules: AssignmentRule[];
  workingHours: WorkingHours;
  holidays: string[]; // ISO dates

  // Queue members
  members: QueueMember[];

  // Queue statistics
  stats: QueueStats;

  // Status
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentRule {
  id: string;
  name: string;
  priority: number;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
}

export interface RuleCondition {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "not_contains"
    | "greater_than"
    | "less_than"
    | "in"
    | "not_in";
  value: any;
  logicalOperator?: "AND" | "OR";
}

export interface RuleAction {
  type:
    | "assign_to_user"
    | "assign_to_queue"
    | "set_priority"
    | "add_tag"
    | "send_notification";
  config: Record<string, any>;
}

export interface WorkingHours {
  monday: { start: string; end: string; isWorking: boolean };
  tuesday: { start: string; end: string; isWorking: boolean };
  wednesday: { start: string; end: string; isWorking: boolean };
  thursday: { start: string; end: string; isWorking: boolean };
  friday: { start: string; end: string; isWorking: boolean };
  saturday: { start: string; end: string; isWorking: boolean };
  sunday: { start: string; end: string; isWorking: boolean };
  timezone: string;
}

export interface QueueMember {
  userId: string;
  userName: string;
  role: string;
  skills: string[];
  territories: string[];
  maxConcurrentLeads: number;
  currentLeadCount: number;
  isAvailable: boolean;
  priority: number; // Higher number = higher priority

  // Performance metrics
  averageResponseTime: number; // hours
  conversionRate: number;
  averageHandlingTime: number; // hours
  satisfaction: number; // 1-5 scale
}

export interface QueueStats {
  totalLeads: number;
  unassignedLeads: number;
  assignedLeads: number;
  overdueLeads: number; // Past assignment timeout
  escalatedLeads: number;

  averageAssignmentTime: number; // minutes
  averageResponseTime: number; // minutes
  totalAssignments: number;

  // Today's stats
  todayAssigned: number;
  todayEscalated: number;
  todayResolved: number;
}

export interface UnassignedLead {
  leadId: string;
  tenantId: string;
  queueId: string;
  priority: "low" | "medium" | "high" | "urgent";

  // Assignment tracking
  assignmentAttempts: AssignmentAttempt[];
  currentAssignee?: string;
  assignedAt?: string;
  responseDeadline?: string;
  escalationLevel: number;

  // Queue position
  queuePosition: number;
  estimatedAssignmentTime: string;

  // Lead info for quick assignment
  leadInfo: {
    name: string;
    company?: string;
    value?: number;
    source: string;
    territory?: string;
    skillsRequired: string[];
  };

  // Timestamps
  enteredQueueAt: string;
  lastAttemptAt?: string;

  // Status
  status: "queued" | "assigning" | "assigned" | "escalated" | "failed";

  // Escalation
  escalationReason?: string;
  escalatedTo?: string;
  escalatedAt?: string;
}

export interface AssignmentAttempt {
  id: string;
  userId: string;
  attemptedAt: string;
  result: "assigned" | "declined" | "timeout" | "unavailable";
  reason?: string;
  responseTime?: number; // minutes
}

// Duplicate Detection System
export interface DuplicateDetectionConfig {
  tenantId: string;

  // Detection rules
  phoneMatching: {
    enabled: boolean;
    exactMatch: boolean;
    normalizeFormat: boolean;
    countryCodeHandling: "strict" | "flexible" | "ignore";
  };

  emailMatching: {
    enabled: boolean;
    caseSensitive: boolean;
    domainMatching: boolean;
    aliasDetection: boolean; // gmail+alias handling
  };

  nameMatching: {
    enabled: boolean;
    threshold: number; // 0-100 similarity percentage
    includeCompany: boolean;
    fuzzyMatching: boolean;
  };

  addressMatching: {
    enabled: boolean;
    threshold: number;
    normalizeFormat: boolean;
  };

  customFieldMatching: {
    enabled: boolean;
    fields: string[];
    weights: Record<string, number>;
  };

  // Actions
  onDuplicateFound: "block" | "warn" | "merge" | "create_variant";
  autoMergeThreshold: number; // 0-100 confidence score
  notifyOnDuplicate: boolean;
  notificationRecipients: string[];

  // Merge configuration
  mergeStrategy: "newest_wins" | "oldest_wins" | "manual" | "field_priority";
  fieldPriority: Record<string, string[]>; // field -> priority order of sources

  // Audit
  keepAuditTrail: boolean;
  auditRetentionDays: number;
}

export interface DuplicateMatch {
  id: string;
  tenantId: string;

  // Leads being compared
  candidateLeadId: string; // New lead being created
  existingLeadId: string; // Existing lead found as duplicate

  // Match details
  matchScore: number; // 0-100 overall confidence
  matchedFields: MatchedField[];
  matchType: "exact" | "fuzzy" | "partial";

  // Detection info
  detectedAt: string;
  detectedBy: string; // User or "system"
  detectionMethod:
    | "phone"
    | "email"
    | "name"
    | "address"
    | "custom"
    | "composite";

  // Resolution
  status: "pending" | "resolved" | "ignored" | "merged";
  resolution?: DuplicateResolution;
  resolvedBy?: string;
  resolvedAt?: string;
  resolutionNotes?: string;

  // Actions taken
  actionsTaken: DuplicateAction[];
}

export interface MatchedField {
  fieldName: string;
  candidateValue: any;
  existingValue: any;
  matchScore: number;
  matchType: "exact" | "fuzzy" | "normalized";
  weight: number;
}

export interface DuplicateResolution {
  action:
    | "keep_both"
    | "merge_to_existing"
    | "merge_to_candidate"
    | "delete_candidate"
    | "delete_existing";
  mergedLeadId?: string;
  preservedFields: string[];
  mergedFields: Record<string, any>;
  deletedLeadId?: string;
}

export interface DuplicateAction {
  type:
    | "notification_sent"
    | "merge_performed"
    | "lead_blocked"
    | "warning_shown"
    | "manual_review_requested";
  timestamp: string;
  details: Record<string, any>;
  performedBy: string;
}

// Audit trail for all CRM operations
export interface CRMActionAudit {
  id: string;
  tenantId: string;

  // Action details
  action: CRMAction;
  entityType: "lead" | "customer" | "opportunity" | "queue" | "duplicate";
  entityId: string;

  // User info
  userId: string;
  userName: string;
  userRole: string;
  userIP?: string;
  userAgent?: string;

  // Change details
  previousState?: Record<string, any>;
  newState?: Record<string, any>;
  changedFields: string[];

  // Context
  source: "web" | "api" | "import" | "automation" | "integration";
  reason?: string;
  notes?: string;

  // Timestamp
  performedAt: string;

  // Impact
  affectedEntities: AffectedEntity[];
  businessImpact?: string;
}

export type CRMAction =
  | "create"
  | "update"
  | "delete"
  | "convert"
  | "assign"
  | "reassign"
  | "merge"
  | "duplicate_detected"
  | "queue_added"
  | "queue_removed"
  | "escalated"
  | "status_changed"
  | "stage_changed"
  | "exported"
  | "imported";

export interface AffectedEntity {
  type: "lead" | "customer" | "opportunity" | "user" | "queue";
  id: string;
  impact: "created" | "updated" | "deleted" | "linked" | "unlinked";
}

// Dashboard and analytics for new features
export interface EnhancedCRMAnalytics {
  tenantId: string;
  period: {
    startDate: string;
    endDate: string;
  };

  // Conversion analytics
  conversionMetrics: {
    totalConversions: number;
    leadToCustomer: number;
    leadToOpportunity: number;
    conversionRate: number;
    averageConversionTime: number; // days
    conversionValue: number;
    conversionsByStage: Record<LeadStage, number>;
    conversionsBySource: Record<string, number>;
  };

  // Assignment analytics
  assignmentMetrics: {
    totalAssignments: number;
    averageAssignmentTime: number; // minutes
    unassignedCount: number;
    overdueCount: number;
    escalationRate: number;
    assignmentByUser: Record<string, number>;
    responseTimeByUser: Record<string, number>;
    queuePerformance: Record<string, QueuePerformanceMetrics>;
  };

  // Duplicate detection analytics
  duplicateMetrics: {
    duplicatesDetected: number;
    duplicatesBlocked: number;
    duplicatesMerged: number;
    duplicateRate: number;
    detectionAccuracy: number;
    falsePositiveRate: number;
    mergeSuccessRate: number;
    topDuplicateFields: Record<string, number>;
  };

  // Overall health metrics
  healthMetrics: {
    leadQuality: number; // 0-100 score
    responseTime: number; // average minutes
    conversionVelocity: number; // conversions per day
    duplicateHygiene: number; // 0-100 score
    automationEfficiency: number; // 0-100 score
  };
}

export interface QueuePerformanceMetrics {
  queueId: string;
  queueName: string;
  averageWaitTime: number; // minutes
  averageAssignmentTime: number; // minutes
  throughput: number; // leads per day
  escalationRate: number;
  memberUtilization: Record<string, number>; // userId -> utilization %
  satisfaction: number; // 1-5 scale
}
