// Unified Notification System - Core Types

export interface UnifiedNotification {
  // Core identification
  id: string;
  tenantId: string;
  type: NotificationType;
  category: NotificationCategory;

  // Content
  title: string;
  message: string;
  content: NotificationContent;

  // Status & Priority
  status: NotificationStatus;
  priority: NotificationPriority;

  // User & Tenant Context
  senderType: UserType;
  senderId: string;
  senderName: string;
  recipientType: RecipientType;
  recipients: NotificationRecipient[];

  // Targeting & Permissions
  userTypeScope?: UserTypeScope;
  tenantScope?: TenantScope;
  permissions: NotificationPermissions;

  // Delivery & Channels
  channels: NotificationChannel[];
  deliveryStatus: DeliveryStatus[];

  // Business Integration
  relatedEntity?: EntityReference;
  businessContext?: BusinessContext;
  workflowContext?: WorkflowContext;

  // Interaction & Actions
  actions: NotificationAction[];
  attachments: NotificationAttachment[];

  // Timing & Lifecycle
  createdAt: string;
  updatedAt?: string;
  scheduledAt?: string;
  sentAt?: string;
  expiresAt?: string;
  readAt?: string;
  acknowledgedAt?: string;
  dismissedAt?: string;

  // Metadata
  tags: string[];
  metadata?: Record<string, any>;
  customData?: Record<string, any>;

  // Analytics
  openCount: number;
  clickCount: number;
  engagementScore?: number;
}

export type NotificationType =
  // Business Process Notifications
  | "order_status"
  | "delivery_update"
  | "payment_reminder"
  | "inventory_alert"
  | "quality_issue"
  | "approval_request"
  | "grn_update"

  // System & Workflow Notifications
  | "system_announcement"
  | "workflow_trigger"
  | "automation_alert"
  | "deadline_reminder"
  | "compliance_update"
  | "maintenance_notice"

  // Communication & Marketing
  | "promotional"
  | "welcome"
  | "training_reminder"
  | "performance_report"
  | "emergency_alert"

  // Tenant & Admin
  | "tenant_update"
  | "security_alert"
  | "billing_notification"
  | "feature_announcement";

export type NotificationCategory =
  | "operational" // Day-to-day operations
  | "financial" // Payment, billing, finance
  | "quality" // Quality control, GRN, inspections
  | "compliance" // Regulatory, policy compliance
  | "system" // System updates, maintenance
  | "workflow" // Automated workflow notifications
  | "promotional" // Marketing, promotions
  | "emergency" // Critical alerts
  | "informational" // General information
  | "tenant_admin"; // Tenant administration

export type NotificationStatus =
  | "draft" // Being composed
  | "pending" // Waiting to be sent
  | "scheduled" // Scheduled for future delivery
  | "sending" // Currently being sent
  | "sent" // Successfully sent
  | "delivered" // Delivered to recipient
  | "read" // Opened/read by recipient
  | "acknowledged" // Acknowledged by recipient
  | "dismissed" // Dismissed by recipient
  | "failed" // Failed to send
  | "expired" // Expired before delivery
  | "cancelled"; // Cancelled before sending

export type NotificationPriority =
  | "low"
  | "medium"
  | "high"
  | "urgent"
  | "critical";

export type UserType =
  | "corporate" // Corporate headquarters users
  | "franchisee" // Franchise/branch users
  | "admin" // System administrators
  | "system" // System-generated
  | "supplier" // External suppliers
  | "customer" // External customers
  | "tenant_admin"; // Tenant administrators

export type RecipientType =
  | "user" // Specific individual users
  | "user_type" // All users of a specific type
  | "role" // Users with specific roles
  | "department" // Users in departments
  | "team" // Team members
  | "tenant" // All users in tenant
  | "external" // External recipients
  | "dynamic"; // Dynamically determined

export type UserTypeScope = "corporate" | "franchisee" | "both";

export type TenantScope = {
  tenantId: string;
  includeSubTenants?: boolean;
  excludeTenants?: string[];
};

export type NotificationChannel =
  | "in_app"
  | "email"
  | "sms"
  | "whatsapp"
  | "push"
  | "webhook"
  | "slack"
  | "teams";

export interface NotificationContent {
  shortText: string;
  fullText?: string;
  htmlContent?: string;
  richContent?: RichContent;
  variables?: Record<string, string>;
  templateId?: string;

  // Personalization
  personalizations?: ContentPersonalization[];

  // Localization
  locale?: string;
  translations?: Record<string, LocalizedContent>;
}

export interface RichContent {
  blocks?: ContentBlock[];
  images?: string[];
  videos?: string[];
  documents?: string[];
  formatting?: ContentFormatting;
}

export interface ContentBlock {
  type: "text" | "image" | "video" | "button" | "link" | "table" | "chart";
  content: any;
  style?: Record<string, any>;
}

export interface ContentFormatting {
  bold?: string[];
  italic?: string[];
  highlight?: string[];
  links?: ContentLink[];
}

export interface ContentLink {
  text: string;
  url: string;
  type: "internal" | "external";
  trackClick?: boolean;
}

export interface ContentPersonalization {
  recipientId: string;
  personalizedContent: Partial<NotificationContent>;
}

export interface LocalizedContent {
  title: string;
  message: string;
  content: NotificationContent;
}

export interface NotificationRecipient {
  id: string;
  type: RecipientType;
  identifier: string; // userId, roleId, departmentId, etc.
  name: string;
  email?: string;
  phone?: string;

  // Delivery tracking
  status: "pending" | "sent" | "delivered" | "failed" | "bounced";
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;

  // Preferences
  preferences?: RecipientPreferences;

  // Personalization
  variables?: Record<string, string>;
}

export interface RecipientPreferences {
  channels: NotificationChannel[];
  frequency: "immediate" | "batched" | "digest";
  quietHours?: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface NotificationPermissions {
  canRead: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canResend: boolean;
  canAcknowledge: boolean;
  canDismiss: boolean;
  canForward: boolean;
  canComment: boolean;
  restrictedTo?: string[]; // userIds, roleIds
}

export interface DeliveryStatus {
  channel: NotificationChannel;
  status: "pending" | "sent" | "delivered" | "failed" | "bounced";
  timestamp: string;
  error?: string;
  retryCount?: number;
  nextRetry?: string;
  metadata?: Record<string, any>;
}

export interface EntityReference {
  type: EntityType;
  id: string;
  name?: string;
  url?: string;
  displayName?: string;
  metadata?: Record<string, any>;
}

export type EntityType =
  | "purchase_order"
  | "delivery_schedule"
  | "grn"
  | "invoice"
  | "project"
  | "user"
  | "tenant"
  | "inventory_item"
  | "supplier"
  | "customer"
  | "workflow"
  | "template";

export interface BusinessContext {
  processType: BusinessProcessType;
  processId: string;
  stepId?: string;
  stakeholders: BusinessStakeholder[];
  deadlines?: BusinessDeadline[];
  approvals?: BusinessApproval[];
  escalations?: EscalationRule[];
}

export type BusinessProcessType =
  | "purchase_order_workflow"
  | "delivery_process"
  | "grn_process"
  | "payment_process"
  | "quality_control"
  | "inventory_management"
  | "supplier_onboarding"
  | "compliance_check";

export interface BusinessStakeholder {
  userId: string;
  role: string;
  responsibility: string;
  canApprove: boolean;
  canReject: boolean;
  mustAcknowledge: boolean;
}

export interface BusinessDeadline {
  name: string;
  dueDate: string;
  priority: NotificationPriority;
  escalateAfter?: string;
  escalateTo?: string[];
}

export interface BusinessApproval {
  id: string;
  approverIds: string[];
  type: "individual" | "consensus" | "any";
  status: "pending" | "approved" | "rejected" | "expired";
  deadline?: string;
  approvedBy?: string[];
  rejectedBy?: string[];
  comments?: ApprovalComment[];
}

export interface ApprovalComment {
  userId: string;
  comment: string;
  timestamp: string;
  decision?: "approve" | "reject" | "clarification";
}

export interface WorkflowContext {
  workflowId: string;
  workflowName: string;
  stepId: string;
  stepName: string;
  triggeredBy: TriggerSource;
  triggerData?: Record<string, any>;
  conditions?: WorkflowCondition[];
  automationRules?: AutomationRule[];
}

export type TriggerSource =
  | "user_action"
  | "system_event"
  | "time_based"
  | "data_change"
  | "external_api"
  | "webhook"
  | "manual";

export interface WorkflowCondition {
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
  logicalOperator?: "AND" | "OR";
}

export interface AutomationRule {
  id: string;
  name: string;
  conditions: WorkflowCondition[];
  actions: AutomationAction[];
  enabled: boolean;
  priority: number;
}

export interface AutomationAction {
  type:
    | "send_notification"
    | "update_status"
    | "assign_user"
    | "create_task"
    | "call_webhook"
    | "delay";
  parameters: Record<string, any>;
  delay?: number; // in minutes
}

export interface EscalationRule {
  id: string;
  name: string;
  trigger: EscalationTrigger;
  actions: EscalationAction[];
  enabled: boolean;
}

export interface EscalationTrigger {
  type: "time_based" | "status_based" | "manual";
  condition: string;
  delay?: number; // in minutes
}

export interface EscalationAction {
  type: "notify_manager" | "assign_backup" | "mark_urgent" | "create_ticket";
  parameters: Record<string, any>;
}

export interface NotificationAction {
  id: string;
  type: ActionType;
  label: string;
  description?: string;
  style: ActionStyle;

  // Action behavior
  action: ActionBehavior;
  confirmation?: ActionConfirmation;

  // Visibility & Availability
  visible: boolean;
  enabled: boolean;
  availableFor?: UserType[];
  expiresAt?: string;

  // Conditions
  conditions?: ActionCondition[];

  // Tracking
  clickedAt?: string;
  completedAt?: string;
  result?: ActionResult;
}

export type ActionType =
  | "button"
  | "link"
  | "form"
  | "download"
  | "share"
  | "approve"
  | "reject"
  | "acknowledge"
  | "dismiss"
  | "reschedule"
  | "view_details"
  | "contact"
  | "escalate"
  | "delegate"
  | "comment";

export type ActionStyle =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline"
  | "ghost";

export interface ActionBehavior {
  type:
    | "navigate"
    | "api_call"
    | "download"
    | "modal"
    | "external_link"
    | "workflow_trigger";
  target?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  payload?: Record<string, any>;
  headers?: Record<string, string>;
  onSuccess?: ActionCallback;
  onError?: ActionCallback;
}

export interface ActionCallback {
  type:
    | "redirect"
    | "refresh"
    | "close_modal"
    | "show_message"
    | "update_notification";
  parameters?: Record<string, any>;
}

export interface ActionConfirmation {
  required: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type?: "info" | "warning" | "danger";
}

export interface ActionCondition {
  field: string;
  operator: string;
  value: any;
  userType?: UserType;
  permission?: string;
}

export interface ActionResult {
  success: boolean;
  message?: string;
  data?: any;
  timestamp: string;
  error?: string;
}

export interface NotificationAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  downloadUrl?: string;
  previewUrl?: string;
  thumbnailUrl?: string;
  description?: string;

  // Security
  requiresAuth: boolean;
  allowedUserTypes?: UserType[];
  expiresAt?: string;

  // Metadata
  uploadedBy: string;
  uploadedAt: string;
  lastAccessed?: string;
  downloadCount: number;
}

// Search and Filtering
export interface NotificationFilters {
  // Basic filters
  status?: NotificationStatus[];
  priority?: NotificationPriority[];
  category?: NotificationCategory[];
  type?: NotificationType[];

  // User & Tenant filters
  userType?: UserType[];
  tenantId?: string;
  senderType?: UserType[];
  recipientType?: RecipientType[];

  // Business context filters
  entityType?: EntityType[];
  workflowId?: string[];
  businessProcess?: BusinessProcessType[];

  // Time filters
  dateRange?: {
    start: string;
    end: string;
  };

  // Content filters
  searchTerm?: string;
  tags?: string[];
  hasAttachments?: boolean;
  hasActions?: boolean;

  // Status filters
  isRead?: boolean;
  isAcknowledged?: boolean;
  isDismissed?: boolean;
  hasDeadline?: boolean;
  isOverdue?: boolean;

  // Channel filters
  channel?: NotificationChannel[];
}

export interface NotificationSearchResult {
  notifications: UnifiedNotification[];
  totalCount: number;
  facets: SearchFacets;
  suggestions: string[];
  aggregations?: SearchAggregations;
}

export interface SearchFacets {
  status: FacetCount[];
  priority: FacetCount[];
  category: FacetCount[];
  type: FacetCount[];
  userType: FacetCount[];
  tenantId: FacetCount[];
  entityType: FacetCount[];
}

export interface FacetCount {
  value: string;
  count: number;
  selected: boolean;
}

export interface SearchAggregations {
  totalByStatus: Record<NotificationStatus, number>;
  totalByPriority: Record<NotificationPriority, number>;
  totalByUserType: Record<UserType, number>;
  totalByCategory: Record<NotificationCategory, number>;
}

// Bulk Operations
export interface BulkOperation {
  operationType: BulkOperationType;
  notificationIds: string[];
  parameters?: Record<string, any>;
  filters?: NotificationFilters;
}

export type BulkOperationType =
  | "mark_read"
  | "mark_acknowledged"
  | "dismiss"
  | "delete"
  | "change_priority"
  | "add_tags"
  | "remove_tags"
  | "resend"
  | "forward"
  | "archive";

export interface BulkOperationResult {
  operationId: string;
  operationType: BulkOperationType;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  skippedCount: number;
  results: BulkItemResult[];
  errors: BulkError[];
  startedAt: string;
  completedAt: string;
}

export interface BulkItemResult {
  notificationId: string;
  status: "success" | "failed" | "skipped";
  error?: string;
  result?: any;
}

export interface BulkError {
  code: string;
  message: string;
  affectedItems: string[];
  timestamp: string;
}

// Real-time Updates
export interface NotificationUpdate {
  type: "new" | "updated" | "deleted" | "bulk_update" | "status_change";
  notificationId?: string;
  notification?: UnifiedNotification;
  updates?: Partial<UnifiedNotification>;
  bulkUpdateInfo?: BulkUpdateInfo;
  timestamp: string;
  userId?: string;
  tenantId: string;
}

export interface BulkUpdateInfo {
  operationType: BulkOperationType;
  affectedIds: string[];
  criteria: NotificationFilters;
  parameters: Record<string, any>;
}
