// Notification Types and Interfaces for Multi-Tenant System

export interface TenantNotification {
  id: string;
  tenantId: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;

  // Content
  title: string;
  message: string;
  description?: string;

  // Recipients
  recipientType: RecipientType;
  recipients: NotificationRecipient[];

  // Delivery channels
  channels: NotificationChannel[];

  // Scheduling
  scheduledAt?: string;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;

  // Workflow integration
  workflowId?: string;
  workflowStepId?: string;
  triggeredBy?: TriggerSource;

  // Metadata
  metadata?: Record<string, any>;
  tags?: string[];
  category?: NotificationCategory;

  // Actions
  actions?: NotificationAction[];

  // Tracking
  openCount: number;
  clickCount: number;

  // Tenant context
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;

  // Permissions
  permissions: {
    canEdit: boolean;
    canDelete: boolean;
    canResend: boolean;
  };
}

export type NotificationType =
  | "system" // System notifications
  | "workflow" // Workflow-triggered notifications
  | "approval" // Approval requests
  | "reminder" // Reminders and follow-ups
  | "alert" // Alerts and warnings
  | "announcement" // Company announcements
  | "update" // Status updates
  | "invitation" // Invitations
  | "confirmation" // Confirmations
  | "marketing" // Marketing communications
  | "transactional" // Transactional messages
  | "security" // Security alerts
  | "performance" // Performance notifications
  | "compliance"; // Compliance notifications

export type NotificationPriority =
  | "low"
  | "normal"
  | "high"
  | "urgent"
  | "critical";

export type NotificationStatus =
  | "draft"
  | "scheduled"
  | "sending"
  | "sent"
  | "delivered"
  | "read"
  | "failed"
  | "cancelled"
  | "expired";

export type RecipientType =
  | "user" // Specific users
  | "role" // Users with specific roles
  | "department" // Users in departments
  | "team" // Team members
  | "all_users" // All tenant users
  | "external" // External recipients
  | "dynamic"; // Dynamically resolved

export type NotificationChannel =
  | "in_app" // In-application notifications
  | "email" // Email notifications
  | "sms" // SMS notifications
  | "whatsapp" // WhatsApp notifications
  | "push" // Push notifications
  | "webhook" // Webhook notifications
  | "slack" // Slack notifications
  | "teams"; // Microsoft Teams notifications

export type NotificationCategory =
  | "user_management"
  | "project_management"
  | "crm"
  | "hrms"
  | "finance"
  | "operations"
  | "security"
  | "system"
  | "custom";

export type TriggerSource =
  | "manual" // Manually triggered
  | "workflow" // Triggered by workflow
  | "system" // System-triggered
  | "api" // API-triggered
  | "schedule" // Scheduled trigger
  | "event"; // Event-driven trigger

export interface NotificationRecipient {
  id: string;
  type: "user" | "role" | "department" | "external";
  identifier: string; // userId, roleId, departmentName, email, etc.
  name: string;
  email?: string;
  phone?: string;
  preferences?: RecipientPreferences;
  status: "pending" | "sent" | "delivered" | "read" | "failed";
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  errorMessage?: string;
}

export interface RecipientPreferences {
  channels: NotificationChannel[];
  frequency: "immediate" | "batched" | "daily" | "weekly";
  quietHours: {
    enabled: boolean;
    start: string; // HH:MM
    end: string; // HH:MM
    timezone: string;
  };
  categories: {
    [key in NotificationCategory]?: {
      enabled: boolean;
      channels: NotificationChannel[];
    };
  };
}

export interface NotificationAction {
  id: string;
  type: "button" | "link" | "dismiss" | "approve" | "reject" | "custom";
  label: string;
  url?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  payload?: Record<string, any>;
  confirmationRequired?: boolean;
  confirmationMessage?: string;
  style?: "primary" | "secondary" | "success" | "warning" | "danger";
}

export interface NotificationTemplate {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  type: NotificationType;
  category: NotificationCategory;

  // Content templates
  templates: {
    [key in NotificationChannel]?: ChannelTemplate;
  };

  // Variables
  variables: TemplateVariable[];

  // Settings
  defaultPriority: NotificationPriority;
  defaultChannels: NotificationChannel[];

  // Workflow integration
  workflowCompatible: boolean;
  workflowSteps?: string[];

  // Usage
  usageCount: number;
  lastUsed?: string;

  // Status
  isActive: boolean;
  isSystem: boolean; // Cannot be modified by tenants

  // Tenant context
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChannelTemplate {
  subject?: string; // For email/push
  title?: string; // For in-app/push
  body: string; // Main content
  footer?: string; // Footer content
  customData?: Record<string, any>; // Channel-specific data
}

export interface TemplateVariable {
  name: string;
  type: "string" | "number" | "boolean" | "date" | "url" | "email";
  description: string;
  required: boolean;
  defaultValue?: any;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    options?: string[];
  };
}

export interface NotificationRule {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  isActive: boolean;

  // Trigger conditions
  triggers: RuleTrigger[];
  conditions: RuleCondition[];

  // Actions
  templateId: string;
  channels: NotificationChannel[];
  priority: NotificationPriority;

  // Recipients
  recipientRules: RecipientRule[];

  // Timing
  delay?: number; // minutes
  scheduleType?: "immediate" | "delayed" | "scheduled";
  schedule?: NotificationSchedule;

  // Limits
  maxExecutions?: number;
  cooldownPeriod?: number; // minutes

  // Tracking
  executionCount: number;
  lastExecuted?: string;

  // Tenant context
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RuleTrigger {
  event: string; // e.g., "user.created", "project.completed", "payment.failed"
  source: "workflow" | "system" | "user_action" | "api" | "schedule";
  filters?: Record<string, any>;
}

export interface RuleCondition {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "greater_than"
    | "less_than"
    | "in"
    | "not_in"
    | "exists"
    | "not_exists";
  value: any;
  logicalOperator?: "AND" | "OR";
}

export interface RecipientRule {
  type: RecipientType;
  criteria: Record<string, any>;
  excludeCriteria?: Record<string, any>;
}

export interface NotificationSchedule {
  type: "once" | "recurring";
  datetime?: string; // For once
  pattern?: RecurrencePattern; // For recurring
}

export interface RecurrencePattern {
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  interval: number; // Every X days/weeks/months/years
  daysOfWeek?: number[]; // 0=Sunday, 1=Monday, etc.
  dayOfMonth?: number;
  endDate?: string;
  maxOccurrences?: number;
}

export interface TenantNotificationSettings {
  tenantId: string;

  // General settings
  enabled: boolean;
  allowUserPreferences: boolean;
  requireApproval: boolean;

  // Channel configurations
  channels: {
    [key in NotificationChannel]?: ChannelConfig;
  };

  // Rate limiting
  rateLimits: {
    perUser: number; // Per user per hour
    perTenant: number; // Per tenant per hour
    perChannel: {
      [key in NotificationChannel]?: number;
    };
  };

  // Retention
  retentionDays: number;
  archiveAfterDays: number;

  // Approval workflow
  approvalRequired: {
    types: NotificationType[];
    priorities: NotificationPriority[];
    bulkThreshold: number; // Require approval for bulk notifications
  };

  // Branding
  branding: {
    logo?: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    footer?: string;
  };

  // Analytics
  analyticsEnabled: boolean;
  trackingEnabled: boolean;

  updatedBy: string;
  updatedAt: string;
}

export interface ChannelConfig {
  enabled: boolean;
  provider?: string;
  config: Record<string, any>;
  limits: {
    dailyLimit?: number;
    monthlyLimit?: number;
    costPerMessage?: number;
  };
  templates: {
    default: string;
    header?: string;
    footer?: string;
  };
}

// Analytics interfaces
export interface NotificationAnalytics {
  tenantId: string;
  period: "day" | "week" | "month" | "quarter" | "year";
  startDate: string;
  endDate: string;

  overview: {
    totalSent: number;
    totalDelivered: number;
    totalRead: number;
    totalClicked: number;
    totalFailed: number;
    deliveryRate: number;
    readRate: number;
    clickRate: number;
  };

  byChannel: {
    [key in NotificationChannel]?: ChannelStats;
  };

  byType: {
    [key in NotificationType]?: TypeStats;
  };

  byPriority: {
    [key in NotificationPriority]?: PriorityStats;
  };

  topPerformers: {
    templates: TemplatePerformance[];
    rules: RulePerformance[];
    campaigns: CampaignPerformance[];
  };

  trends: {
    daily: DayStats[];
    hourly: HourStats[];
  };

  costs: {
    total: number;
    byChannel: {
      [key in NotificationChannel]?: number;
    };
    costPerNotification: number;
    costPerConversion: number;
  };
}

export interface ChannelStats {
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  failed: number;
  cost: number;
}

export interface TypeStats {
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  failed: number;
}

export interface PriorityStats {
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  failed: number;
  averageDeliveryTime: number; // minutes
}

export interface TemplatePerformance {
  templateId: string;
  templateName: string;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  deliveryRate: number;
  readRate: number;
  clickRate: number;
}

export interface RulePerformance {
  ruleId: string;
  ruleName: string;
  executions: number;
  successRate: number;
  averageDeliveryTime: number;
}

export interface CampaignPerformance {
  campaignId: string;
  campaignName: string;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  conversions: number;
  revenue: number;
  roi: number;
}

export interface DayStats {
  date: string;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  failed: number;
}

export interface HourStats {
  hour: number;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  failed: number;
}

// Form interfaces
export interface CreateNotificationForm {
  title: string;
  message: string;
  description?: string;
  type: NotificationType;
  priority: NotificationPriority;
  category: NotificationCategory;

  recipientType: RecipientType;
  recipients: string[]; // IDs or emails

  channels: NotificationChannel[];

  templateId?: string;
  variables?: Record<string, any>;

  scheduledAt?: string;
  actions?: NotificationAction[];
  tags?: string[];
}

export interface CreateTemplateForm {
  name: string;
  description?: string;
  type: NotificationType;
  category: NotificationCategory;

  templates: {
    [key in NotificationChannel]?: {
      subject?: string;
      title?: string;
      body: string;
      footer?: string;
    };
  };

  variables: TemplateVariable[];
  defaultPriority: NotificationPriority;
  defaultChannels: NotificationChannel[];
}

export interface CreateRuleForm {
  name: string;
  description?: string;

  triggers: RuleTrigger[];
  conditions: RuleCondition[];

  templateId: string;
  channels: NotificationChannel[];
  priority: NotificationPriority;

  recipientRules: RecipientRule[];

  delay?: number;
  scheduleType: "immediate" | "delayed" | "scheduled";
  schedule?: NotificationSchedule;

  maxExecutions?: number;
  cooldownPeriod?: number;
}

// Search and filter interfaces
export interface NotificationFilters {
  types?: NotificationType[];
  priorities?: NotificationPriority[];
  statuses?: NotificationStatus[];
  channels?: NotificationChannel[];
  categories?: NotificationCategory[];

  dateRange?: {
    start: string;
    end: string;
  };

  recipientId?: string;
  workflowId?: string;
  templateId?: string;

  search?: string;
  tags?: string[];
}

// Workflow integration interfaces
export interface WorkflowNotificationStep {
  id: string;
  workflowId: string;
  stepId: string;

  // Notification configuration
  templateId?: string;
  type: NotificationType;
  priority: NotificationPriority;
  channels: NotificationChannel[];

  // Recipients (can use workflow variables)
  recipientType: RecipientType;
  recipientExpression: string; // Expression to resolve recipients

  // Content (can use workflow variables)
  title: string;
  message: string;
  variables?: Record<string, string>; // Variable mappings

  // Conditions
  conditions?: RuleCondition[];

  // Settings
  retryAttempts: number;
  retryDelay: number; // minutes

  // Tracking
  executionCount: number;
  successCount: number;
  failureCount: number;
}

export default {
  // Export all types for easier importing
  TenantNotification,
  NotificationTemplate,
  NotificationRule,
  TenantNotificationSettings,
  NotificationAnalytics,
};
