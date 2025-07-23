// Notification Management System Types

export interface NotificationItem {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;

  // Metadata
  createdAt: string;
  updatedAt?: string;
  expiresAt?: string;

  // Status & Interaction
  status: NotificationStatus;
  priority: NotificationPriority;
  readAt?: string;
  acknowledgedAt?: string;
  dismissedAt?: string;

  // Sender & Recipient
  senderId: string;
  senderName: string;
  senderType: UserType;
  recipientId: string;
  recipientName: string;
  recipientType: UserType;

  // Content & Actions
  content: NotificationContent;
  actions: NotificationAction[];
  attachments: NotificationAttachment[];

  // Delivery & Channels
  channels: NotificationChannel[];
  deliveryStatus: DeliveryStatus[];

  // Context & References
  relatedEntity?: EntityReference;
  tags: string[];
  customData?: Record<string, any>;
}

export type NotificationType =
  | "order_status"
  | "delivery_update"
  | "payment_reminder"
  | "inventory_alert"
  | "system_announcement"
  | "approval_request"
  | "deadline_reminder"
  | "quality_issue"
  | "emergency_alert"
  | "promotional"
  | "welcome"
  | "training_reminder"
  | "compliance_update"
  | "performance_report"
  | "maintenance_notice";

export type NotificationCategory =
  | "operational"
  | "financial"
  | "quality"
  | "compliance"
  | "system"
  | "promotional"
  | "emergency"
  | "informational";

export type NotificationStatus =
  | "pending"
  | "sent"
  | "delivered"
  | "read"
  | "acknowledged"
  | "dismissed"
  | "failed"
  | "expired";

export type NotificationPriority =
  | "low"
  | "medium"
  | "high"
  | "urgent"
  | "critical";

export type UserType =
  | "corporate"
  | "franchisee"
  | "admin"
  | "system"
  | "supplier"
  | "customer";

export type NotificationChannel =
  | "in_app"
  | "email"
  | "sms"
  | "whatsapp"
  | "push"
  | "webhook"
  | "slack";

export interface NotificationContent {
  shortText: string;
  fullText?: string;
  htmlContent?: string;
  variables?: Record<string, string>;
  templateId?: string;

  // Rich content
  images?: string[];
  videos?: string[];
  documents?: string[];

  // Formatting
  formatting?: ContentFormatting;
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
}

export interface NotificationAction {
  id: string;
  label: string;
  type: ActionType;
  style: ActionStyle;

  // Action behavior
  action: ActionBehavior;
  confirmation?: ActionConfirmation;

  // Visibility & Availability
  visible: boolean;
  enabled: boolean;
  expiresAt?: string;

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
  | "view_details";

export type ActionStyle =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

export interface ActionBehavior {
  type: "navigate" | "api_call" | "download" | "modal" | "external_link";
  target?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  payload?: Record<string, any>;
  headers?: Record<string, string>;
}

export interface ActionConfirmation {
  required: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

export interface ActionResult {
  success: boolean;
  message?: string;
  data?: any;
  timestamp: string;
}

export interface NotificationAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  downloadUrl?: string;
  previewUrl?: string;
  description?: string;
}

export interface DeliveryStatus {
  channel: NotificationChannel;
  status: "pending" | "sent" | "delivered" | "failed" | "bounced";
  timestamp: string;
  error?: string;
  retryCount?: number;
  nextRetry?: string;
}

export interface EntityReference {
  type:
    | "purchase_order"
    | "delivery"
    | "grn"
    | "invoice"
    | "project"
    | "user"
    | "inventory";
  id: string;
  name?: string;
  url?: string;
}

// Notification Preferences
export interface NotificationPreferences {
  userId: string;
  userType: UserType;

  // Global settings
  globalEnabled: boolean;
  doNotDisturbEnabled: boolean;
  doNotDisturbSchedule?: DoNotDisturbSchedule;

  // Channel preferences
  channelPreferences: ChannelPreferences;

  // Category preferences
  categoryPreferences: CategoryPreferences;

  // Advanced settings
  frequency: NotificationFrequency;
  digest: DigestSettings;
  autoActions: AutoActionSettings;

  // Metadata
  lastUpdated: string;
  updatedBy: string;
}

export interface DoNotDisturbSchedule {
  enabled: boolean;
  timeZone: string;
  dailySchedule: DailySchedule[];
  dateRanges: DateRange[];
  emergencyOverride: boolean;
}

export interface DailySchedule {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  enabled: boolean;
}

export interface DateRange {
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface ChannelPreferences {
  inApp: ChannelSetting;
  email: ChannelSetting;
  sms: ChannelSetting;
  whatsapp: ChannelSetting;
  push: ChannelSetting;
}

export interface ChannelSetting {
  enabled: boolean;
  types: NotificationType[];
  priorities: NotificationPriority[];
  quietHours?: QuietHours;
  customSettings?: Record<string, any>;
}

export interface QuietHours {
  enabled: boolean;
  startTime: string;
  endTime: string;
  emergencyOverride: boolean;
}

export interface CategoryPreferences {
  operational: CategorySetting;
  financial: CategorySetting;
  quality: CategorySetting;
  compliance: CategorySetting;
  system: CategorySetting;
  promotional: CategorySetting;
  emergency: CategorySetting;
  informational: CategorySetting;
}

export interface CategorySetting {
  enabled: boolean;
  priority: NotificationPriority;
  channels: NotificationChannel[];
  autoActions: CategoryAutoAction[];
}

export interface CategoryAutoAction {
  condition: string;
  action: "auto_read" | "auto_acknowledge" | "auto_dismiss" | "forward";
  delay?: number; // in minutes
  target?: string;
}

export type NotificationFrequency =
  | "immediate"
  | "every_15_minutes"
  | "hourly"
  | "daily"
  | "weekly"
  | "custom";

export interface DigestSettings {
  enabled: boolean;
  frequency: "daily" | "weekly" | "monthly";
  deliveryTime: string;
  channels: NotificationChannel[];
  includeCategories: NotificationCategory[];
  maxItems: number;
  summaryStyle: "brief" | "detailed";
}

export interface AutoActionSettings {
  enabled: boolean;
  rules: AutoActionRule[];
}

export interface AutoActionRule {
  id: string;
  name: string;
  conditions: AutoActionCondition[];
  actions: AutoActionAction[];
  enabled: boolean;
  priority: number;
}

export interface AutoActionCondition {
  field: string;
  operator:
    | "equals"
    | "contains"
    | "starts_with"
    | "ends_with"
    | "greater_than"
    | "less_than";
  value: any;
  logicalOperator?: "AND" | "OR";
}

export interface AutoActionAction {
  type:
    | "mark_read"
    | "acknowledge"
    | "dismiss"
    | "forward"
    | "create_task"
    | "send_alert";
  parameters: Record<string, any>;
  delay?: number; // in minutes
}

// Templates & Configuration
export interface NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  category: NotificationCategory;

  // Template content
  title: string;
  shortText: string;
  fullText?: string;
  htmlTemplate?: string;

  // Variables
  variables: TemplateVariable[];

  // Styling
  styling: TemplateStyle;

  // Behavior
  defaultChannels: NotificationChannel[];
  defaultActions: TemplateAction[];

  // Metadata
  createdAt: string;
  createdBy: string;
  lastModified: string;
  version: number;
  isActive: boolean;
}

export interface TemplateVariable {
  name: string;
  type: "string" | "number" | "date" | "boolean" | "object";
  required: boolean;
  defaultValue?: any;
  description?: string;
  validation?: VariableValidation;
}

export interface VariableValidation {
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  allowedValues?: any[];
}

export interface TemplateStyle {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  fontSize?: string;
  borderRadius?: string;
  customCSS?: string;
}

export interface TemplateAction {
  id: string;
  label: string;
  type: ActionType;
  style: ActionStyle;
  behavior: ActionBehavior;
  conditions?: TemplateActionCondition[];
}

export interface TemplateActionCondition {
  variable: string;
  operator: string;
  value: any;
}

// Analytics & Reporting
export interface NotificationAnalytics {
  // Overview metrics
  totalSent: number;
  totalDelivered: number;
  totalRead: number;
  totalClicked: number;

  // Performance metrics
  deliveryRate: number;
  readRate: number;
  clickRate: number;
  responseTime: number; // average time to read

  // Channel performance
  channelMetrics: ChannelMetrics[];

  // Category performance
  categoryMetrics: CategoryMetrics[];

  // Time-based metrics
  hourlyMetrics: HourlyMetric[];
  dailyMetrics: DailyMetric[];
  weeklyTrends: WeeklyTrend[];

  // User engagement
  userEngagement: UserEngagementMetric[];

  // Template performance
  templateMetrics: TemplateMetric[];
}

export interface ChannelMetrics {
  channel: NotificationChannel;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  failed: number;
  deliveryRate: number;
  readRate: number;
  clickRate: number;
  averageResponseTime: number;
}

export interface CategoryMetrics {
  category: NotificationCategory;
  sent: number;
  read: number;
  acknowledged: number;
  dismissed: number;
  averageEngagement: number;
  topTypes: TypeMetric[];
}

export interface TypeMetric {
  type: NotificationType;
  count: number;
  engagement: number;
}

export interface HourlyMetric {
  hour: number;
  sent: number;
  delivered: number;
  read: number;
  engagement: number;
}

export interface DailyMetric {
  date: string;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  engagement: number;
}

export interface WeeklyTrend {
  week: string;
  sent: number;
  engagement: number;
  growth: number;
  topCategories: string[];
}

export interface UserEngagementMetric {
  userId: string;
  userName: string;
  userType: UserType;
  totalReceived: number;
  totalRead: number;
  totalClicked: number;
  averageResponseTime: number;
  engagementScore: number;
  preferredChannels: NotificationChannel[];
}

export interface TemplateMetric {
  templateId: string;
  templateName: string;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  conversionRate: number;
  averageEngagement: number;
}

// Bulk Operations
export interface BulkNotificationRequest {
  templateId?: string;
  recipients: BulkRecipient[];
  content: NotificationContent;
  channels: NotificationChannel[];
  priority: NotificationPriority;
  category: NotificationCategory;
  scheduledAt?: string;
  expiresAt?: string;
  tags: string[];
}

export interface BulkRecipient {
  userId: string;
  userType: UserType;
  customData?: Record<string, any>;
  personalizedContent?: Partial<NotificationContent>;
}

export interface BulkNotificationResult {
  requestId: string;
  totalRecipients: number;
  successCount: number;
  failureCount: number;
  status: "processing" | "completed" | "failed" | "cancelled";
  results: BulkRecipientResult[];
  startedAt: string;
  completedAt?: string;
  errors: BulkError[];
}

export interface BulkRecipientResult {
  recipientId: string;
  status: "success" | "failed" | "skipped";
  notificationId?: string;
  error?: string;
  deliveryStatus: DeliveryStatus[];
}

export interface BulkError {
  code: string;
  message: string;
  affectedRecipients: string[];
  timestamp: string;
}

// Search & Filtering
export interface NotificationFilters {
  status?: NotificationStatus[];
  priority?: NotificationPriority[];
  category?: NotificationCategory[];
  type?: NotificationType[];
  channel?: NotificationChannel[];
  senderType?: UserType[];
  dateRange?: {
    start: string;
    end: string;
  };
  searchTerm?: string;
  tags?: string[];
  hasAttachments?: boolean;
  hasActions?: boolean;
  isRead?: boolean;
  isAcknowledged?: boolean;
}

export interface NotificationSearchResult {
  notifications: NotificationItem[];
  totalCount: number;
  facets: SearchFacets;
  suggestions: string[];
}

export interface SearchFacets {
  status: FacetCount[];
  priority: FacetCount[];
  category: FacetCount[];
  type: FacetCount[];
  channel: FacetCount[];
  senderType: FacetCount[];
}

export interface FacetCount {
  value: string;
  count: number;
  selected: boolean;
}

// Real-time Updates
export interface NotificationUpdate {
  type: "new" | "updated" | "deleted" | "bulk_update";
  notificationId?: string;
  notification?: NotificationItem;
  updates?: Partial<NotificationItem>;
  bulkUpdateInfo?: BulkUpdateInfo;
  timestamp: string;
}

export interface BulkUpdateInfo {
  affectedIds: string[];
  updateType: "mark_read" | "mark_acknowledged" | "dismiss" | "delete";
  criteria: NotificationFilters;
}

// Configuration
export interface NotificationSystemConfig {
  // General settings
  maxNotificationsPerUser: number;
  defaultRetentionDays: number;
  maxAttachmentSize: number;

  // Rate limiting
  rateLimits: RateLimit[];

  // Channel configurations
  channelConfigs: ChannelConfig[];

  // Template settings
  allowCustomTemplates: boolean;
  templateApprovalRequired: boolean;

  // Feature flags
  features: FeatureFlags;
}

export interface RateLimit {
  channel: NotificationChannel;
  maxPerMinute: number;
  maxPerHour: number;
  maxPerDay: number;
  burstAllowed: number;
}

export interface ChannelConfig {
  channel: NotificationChannel;
  enabled: boolean;
  provider: string;
  settings: Record<string, any>;
  fallbackChannels: NotificationChannel[];
}

export interface FeatureFlags {
  bulkOperations: boolean;
  realTimeUpdates: boolean;
  advancedFiltering: boolean;
  customTemplates: boolean;
  analyticsEnabled: boolean;
  autoActions: boolean;
  digestNotifications: boolean;
}
