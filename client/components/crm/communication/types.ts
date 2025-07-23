export interface TenantCommunicationMessage {
  id: string;
  tenantId: string; // Multi-tenant support
  type: "sms" | "email" | "whatsapp";
  direction: "inbound" | "outbound";
  status: "pending" | "sent" | "delivered" | "read" | "failed" | "scheduled";
  subject?: string; // For emails
  content: string;

  // Recipients/Sender
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];

  // Related entities
  leadId?: string;
  contactId?: string;
  campaignId?: string;
  templateId?: string;

  // Metadata
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  failedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;

  // Provider specific
  providerId?: string;
  providerMessageId?: string;
  providerResponse?: any;

  // Attachments (for email)
  attachments?: CommunicationAttachment[];

  // Analytics
  opened?: boolean;
  clicked?: boolean;
  unsubscribed?: boolean;
  bounced?: boolean;

  // Cost tracking
  cost?: number;
  credits?: number;

  // Tenant-specific fields
  visibility: "public" | "private" | "team";
  permissions: CommunicationPermissions;
  territory?: string;
  region?: string;

  // Security and compliance
  isEncrypted?: boolean;
  retentionPeriod?: number; // days
  complianceFlags?: string[];

  // Integration tracking
  externalIds?: Record<string, string>;
  syncStatus?: "synced" | "pending" | "failed" | "not_synced";
  lastSyncAt?: string;
}

export interface CommunicationAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

// Permission interface for communications
export interface CommunicationPermissions {
  canView: string[];
  canEdit: string[];
  canDelete: string[];
  canSend: string[];
  canExport: string[];
  canShare: string[];
}

export interface TenantCommunicationTemplate {
  id: string;
  tenantId: string; // Multi-tenant support
  name: string;
  type: "sms" | "email" | "whatsapp";
  category:
    | "welcome"
    | "follow_up"
    | "promotional"
    | "transactional"
    | "reminder"
    | "custom";
  subject?: string; // For emails
  content: string;
  variables: string[]; // e.g., ['firstName', 'company', 'amount']
  isActive: boolean;

  // Template metadata
  description?: string;
  tags: string[];
  language: string;

  // Usage stats
  usageCount: number;
  lastUsedAt?: string;

  // Approval workflow
  status: "draft" | "pending_approval" | "approved" | "rejected";
  approvedBy?: string;
  approvedAt?: string;

  createdAt: string;
  updatedAt: string;
  createdBy: string;

  // Tenant-specific fields
  visibility: "public" | "private" | "team";
  permissions: CommunicationPermissions;
  territory?: string;
  allowedRoles?: string[];

  // Template versioning
  version: string;
  parentTemplateId?: string;
  isLatest: boolean;

  // Compliance and governance
  complianceApproved: boolean;
  approvalRequired: boolean;
  legalReviewed: boolean;

  // Personalization
  personalizationRules?: PersonalizationRule[];

  // A/B Testing
  testVariants?: TemplateVariant[];
  isTestTemplate?: boolean;
}

// Supporting interfaces for templates
export interface PersonalizationRule {
  id: string;
  field: string;
  condition: string;
  value: string;
  replacement: string;
}

export interface TemplateVariant {
  id: string;
  name: string;
  content: string;
  subject?: string;
  weight: number; // For traffic distribution
  metrics?: {
    sends: number;
    opens: number;
    clicks: number;
    conversions: number;
  };
}

export interface TenantBulkCommunication {
  id: string;
  name: string;
  type: "sms" | "email" | "whatsapp";
  status:
    | "draft"
    | "scheduled"
    | "sending"
    | "completed"
    | "cancelled"
    | "failed";

  // Content
  templateId?: string;
  subject?: string;
  content: string;

  // Recipients
  recipients: BulkRecipient[];
  totalRecipients: number;

  // Scheduling
  scheduledAt?: string;
  sentAt?: string;
  completedAt?: string;

  // Progress tracking
  sentCount: number;
  deliveredCount: number;
  failedCount: number;
  openedCount: number;
  clickedCount: number;

  // Filtering criteria
  filters?: {
    leadStatus?: string[];
    leadSource?: string[];
    assignedTo?: string[];
    tags?: string[];
    customFilters?: any;
  };

  // Cost
  estimatedCost?: number;
  actualCost?: number;
  creditsUsed?: number;

  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface BulkRecipient {
  id: string;
  leadId?: string;
  contactId?: string;
  name: string;
  email?: string;
  phone?: string;
  whatsappNumber?: string;
  status: "pending" | "sent" | "delivered" | "failed" | "skipped";
  messageId?: string;
  sentAt?: string;
  deliveredAt?: string;
  failureReason?: string;
  variables?: Record<string, string>;
}

export interface AutoCommunication {
  id: string;
  name: string;
  type: "sms" | "email" | "whatsapp";
  trigger: AutoTrigger;
  isActive: boolean;

  // Content
  templateId: string;
  subject?: string;
  content: string;

  // Conditions
  conditions: AutoCondition[];

  // Timing
  delay?: number; // minutes
  delayUnit?: "minutes" | "hours" | "days";

  // Limits
  maxSends?: number;
  cooldownPeriod?: number; // hours

  // Stats
  triggeredCount: number;
  sentCount: number;
  lastTriggered?: string;

  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface AutoTrigger {
  event:
    | "lead_created"
    | "lead_status_changed"
    | "lead_assigned"
    | "follow_up_due"
    | "no_activity"
    | "lead_score_changed"
    | "form_submitted"
    | "email_opened"
    | "email_clicked";

  // Event specific data
  fromStatus?: string;
  toStatus?: string;
  scoreThreshold?: number;
  inactivityDays?: number;
}

export interface AutoCondition {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "greater_than"
    | "less_than"
    | "in"
    | "not_in";
  value: any;
}

export interface CommunicationProvider {
  id: string;
  name: string;
  type: "sms" | "email" | "whatsapp";
  isActive: boolean;
  isPrimary: boolean;

  // Configuration
  config: {
    apiKey?: string;
    apiSecret?: string;
    senderId?: string;
    webhookUrl?: string;
    [key: string]: any;
  };

  // Limits and pricing
  dailyLimit?: number;
  monthlyLimit?: number;
  costPerMessage?: number;
  creditsRemaining?: number;

  // Status
  lastStatusCheck?: string;
  isHealthy: boolean;
  errorMessage?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CommunicationCampaign {
  id: string;
  name: string;
  description?: string;
  type: "promotional" | "transactional" | "nurture" | "re_engagement";
  status: "draft" | "active" | "paused" | "completed" | "archived";

  // Campaign steps
  steps: CampaignStep[];

  // Targeting
  targetAudience: {
    leadStatus?: string[];
    leadSource?: string[];
    tags?: string[];
    customFilters?: any;
  };

  // Schedule
  startDate?: string;
  endDate?: string;

  // Analytics
  totalRecipients: number;
  sentMessages: number;
  openedMessages: number;
  clickedMessages: number;
  conversions: number;
  revenue?: number;

  // Cost
  totalCost?: number;
  costPerConversion?: number;
  roi?: number;

  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface CampaignStep {
  id: string;
  name: string;
  type: "sms" | "email" | "whatsapp" | "delay";
  order: number;

  // Content (for communication steps)
  templateId?: string;
  subject?: string;
  content?: string;

  // Delay (for delay steps)
  delayAmount?: number;
  delayUnit?: "minutes" | "hours" | "days";

  // Conditions
  conditions?: AutoCondition[];

  // Stats
  recipientsEntered: number;
  messagesSent: number;
  messagesDelivered: number;

  isActive: boolean;
}

export interface CommunicationAnalytics {
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  totalFailed: number;

  deliveryRate: number;
  openRate: number;
  clickRate: number;
  failureRate: number;

  // By type
  sms: CommunicationTypeStats;
  email: CommunicationTypeStats;
  whatsapp: CommunicationTypeStats;

  // By time period
  today: CommunicationPeriodStats;
  thisWeek: CommunicationPeriodStats;
  thisMonth: CommunicationPeriodStats;

  // Cost analytics
  totalCost: number;
  costPerMessage: number;
  creditsUsed: number;
  creditsRemaining: number;

  // Top performing
  topTemplates: TemplatePerformance[];
  topCampaigns: CampaignPerformance[];
}

export interface CommunicationTypeStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  failed: number;
  cost: number;
}

export interface CommunicationPeriodStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  failed: number;
  cost: number;
  conversions: number;
  revenue: number;
}

export interface TemplatePerformance {
  templateId: string;
  templateName: string;
  type: "sms" | "email" | "whatsapp";
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  openRate: number;
  clickRate: number;
}

export interface CampaignPerformance {
  campaignId: string;
  campaignName: string;
  sent: number;
  opened: number;
  clicked: number;
  conversions: number;
  revenue: number;
  roi: number;
}

// Form interfaces
export interface SendMessageForm {
  type: "sms" | "email" | "whatsapp";
  to: string[];
  subject?: string;
  content: string;
  templateId?: string;
  scheduledAt?: string;
  leadIds?: string[];
  contactIds?: string[];
}

export interface CreateTemplateForm {
  name: string;
  type: "sms" | "email" | "whatsapp";
  category: string;
  subject?: string;
  content: string;
  description?: string;
  tags: string[];
  language: string;
}

export interface BulkCommunicationForm {
  name: string;
  type: "sms" | "email" | "whatsapp";
  templateId?: string;
  subject?: string;
  content: string;
  recipientType: "all_leads" | "filtered_leads" | "custom_list";
  filters?: any;
  scheduledAt?: string;
}

// Search and filter interfaces
export interface CommunicationFilters {
  type?: ("sms" | "email" | "whatsapp")[];
  status?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  direction?: ("inbound" | "outbound")[];
  leadId?: string;
  templateId?: string;
  campaignId?: string;
}
