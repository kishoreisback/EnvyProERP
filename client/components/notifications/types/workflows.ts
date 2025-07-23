// Unified Notification System - Workflow Types

import {
  NotificationChannel,
  NotificationPriority,
  UserType,
  TriggerSource,
  AutomationAction,
} from "./core";

export interface NotificationWorkflow {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  version: number;

  // Status & Lifecycle
  status: WorkflowStatus;
  isActive: boolean;

  // Configuration
  trigger: WorkflowTrigger;
  conditions: WorkflowCondition[];
  steps: WorkflowStep[];

  // Recipients & Targeting
  recipients: WorkflowRecipient[];

  // Template & Content
  templateId?: string;
  contentTemplate?: WorkflowContentTemplate;

  // Scheduling & Timing
  schedule?: WorkflowSchedule;
  retryPolicy?: RetryPolicy;

  // Permissions & Access
  createdBy: string;
  permissions: WorkflowPermissions;

  // Analytics & Monitoring
  executionHistory: WorkflowExecution[];
  metrics: WorkflowMetrics;

  // Metadata
  tags: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  lastExecuted?: string;
}

export type WorkflowStatus =
  | "draft"
  | "active"
  | "paused"
  | "disabled"
  | "archived"
  | "error";

export interface WorkflowTrigger {
  type: TriggerType;
  source: TriggerSource;
  event: string;
  conditions: TriggerCondition[];

  // Timing
  schedule?: TriggerSchedule;
  delay?: number; // in minutes

  // Data & Context
  dataFilters?: DataFilter[];
  contextMapping?: Record<string, string>;
}

export type TriggerType =
  | "event_based" // Business event occurs
  | "time_based" // Scheduled execution
  | "data_based" // Data threshold reached
  | "user_action" // User performs action
  | "api_call" // External API call
  | "webhook" // Webhook received
  | "manual"; // Manual execution

export interface TriggerCondition {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "starts_with"
    | "ends_with"
    | "greater_than"
    | "less_than"
    | "in"
    | "not_in"
    | "exists"
    | "not_exists";
  value: any;
  dataType: "string" | "number" | "boolean" | "date" | "array" | "object";
  logicalOperator?: "AND" | "OR";
}

export interface TriggerSchedule {
  type: "once" | "recurring";
  startDate: string;
  endDate?: string;

  // Recurring options
  frequency?: "minutes" | "hours" | "days" | "weeks" | "months";
  interval?: number;
  daysOfWeek?: string[];
  timeOfDay?: string;
  timezone?: string;

  // Advanced scheduling
  cronExpression?: string;
  excludeDates?: string[];
}

export interface DataFilter {
  field: string;
  condition: TriggerCondition;
  required: boolean;
}

export interface WorkflowCondition {
  id: string;
  name: string;
  description?: string;
  expression: ConditionExpression;
  action: "continue" | "skip" | "stop" | "branch";
  errorHandling?: ErrorHandling;
}

export interface ConditionExpression {
  conditions: TriggerCondition[];
  logic: "AND" | "OR";
  groups?: ConditionGroup[];
}

export interface ConditionGroup {
  conditions: TriggerCondition[];
  logic: "AND" | "OR";
  parentLogic: "AND" | "OR";
}

export interface ErrorHandling {
  onError: "continue" | "stop" | "retry" | "notify";
  retryCount?: number;
  retryDelay?: number;
  notifyUsers?: string[];
  fallbackAction?: AutomationAction;
}

export interface WorkflowStep {
  id: string;
  name: string;
  description?: string;
  type: WorkflowStepType;
  order: number;

  // Configuration
  configuration: StepConfiguration;

  // Flow control
  nextSteps: string[];
  conditions?: WorkflowCondition[];

  // Timing
  delay?: number; // in minutes
  timeout?: number; // in minutes

  // Error handling
  onSuccess?: StepAction;
  onFailure?: StepAction;
  onTimeout?: StepAction;

  // Monitoring
  isEnabled: boolean;
  lastExecuted?: string;
  executionCount: number;
  successRate: number;
}

export type WorkflowStepType =
  | "send_notification"
  | "wait_for_response"
  | "conditional_branch"
  | "delay"
  | "call_api"
  | "update_data"
  | "send_webhook"
  | "create_task"
  | "assign_user"
  | "approval_gate"
  | "escalation"
  | "loop"
  | "parallel_execution";

export interface StepConfiguration {
  // Notification-specific config
  notificationConfig?: NotificationStepConfig;

  // API call config
  apiConfig?: ApiStepConfig;

  // Approval config
  approvalConfig?: ApprovalStepConfig;

  // Data update config
  dataConfig?: DataStepConfig;

  // Webhook config
  webhookConfig?: WebhookStepConfig;

  // Generic parameters
  parameters?: Record<string, any>;
}

export interface NotificationStepConfig {
  templateId?: string;
  channels: NotificationChannel[];
  priority: NotificationPriority;
  recipients: WorkflowRecipient[];
  contentOverrides?: Partial<WorkflowContentTemplate>;
  scheduling?: NotificationScheduling;
}

export interface NotificationScheduling {
  sendImmediately: boolean;
  scheduleTime?: string;
  respectQuietHours: boolean;
  batchDelivery?: BatchDeliveryConfig;
}

export interface BatchDeliveryConfig {
  enabled: boolean;
  batchSize: number;
  intervalMinutes: number;
  maxBatches?: number;
}

export interface ApiStepConfig {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  authentication?: ApiAuthentication;
  responseMapping?: ResponseMapping;
  errorHandling?: ApiErrorHandling;
}

export interface ApiAuthentication {
  type: "none" | "basic" | "bearer" | "api_key" | "oauth";
  credentials?: Record<string, string>;
}

export interface ResponseMapping {
  successPath?: string;
  errorPath?: string;
  dataMapping?: Record<string, string>;
}

export interface ApiErrorHandling {
  retryOn4xx: boolean;
  retryOn5xx: boolean;
  maxRetries: number;
  backoffStrategy: "linear" | "exponential";
}

export interface ApprovalStepConfig {
  approvers: WorkflowApprover[];
  approvalType: "any" | "all" | "majority" | "quorum";
  deadline?: string;
  escalation?: ApprovalEscalation;
  requiredComments: boolean;
  allowDelegation: boolean;
}

export interface WorkflowApprover {
  type: "user" | "role" | "department" | "dynamic";
  identifier: string;
  name: string;
  isRequired: boolean;
  order?: number;
}

export interface ApprovalEscalation {
  enabled: boolean;
  timeoutMinutes: number;
  escalateTo: WorkflowApprover[];
  escalationMessage?: string;
  autoApproveOnTimeout?: boolean;
}

export interface DataStepConfig {
  operation: "create" | "update" | "delete" | "query";
  entity: string;
  fields: Record<string, any>;
  conditions?: TriggerCondition[];
  validation?: DataValidation[];
}

export interface DataValidation {
  field: string;
  rules: ValidationRule[];
  errorMessage: string;
}

export interface ValidationRule {
  type:
    | "required"
    | "min_length"
    | "max_length"
    | "pattern"
    | "range"
    | "custom";
  value?: any;
  customValidator?: string;
}

export interface WebhookStepConfig {
  url: string;
  method: "POST" | "PUT" | "PATCH";
  headers?: Record<string, string>;
  payload: any;
  authentication?: ApiAuthentication;
  retryPolicy?: RetryPolicy;
  responseValidation?: ResponseValidation;
}

export interface ResponseValidation {
  expectedStatus: number[];
  requiredFields?: string[];
  validationRules?: ValidationRule[];
}

export interface StepAction {
  type: "continue" | "stop" | "retry" | "branch" | "notify" | "escalate";
  parameters?: Record<string, any>;
  nextStep?: string;
  notifyUsers?: string[];
}

export interface WorkflowRecipient {
  type:
    | "user"
    | "user_type"
    | "role"
    | "department"
    | "team"
    | "dynamic"
    | "external";
  identifier: string;
  name?: string;

  // Dynamic recipient resolution
  dynamicQuery?: DynamicQuery;

  // Preferences
  preferredChannels?: NotificationChannel[];
  timezone?: string;
  language?: string;

  // Personalization
  variables?: Record<string, string>;
}

export interface DynamicQuery {
  source: "database" | "api" | "function";
  query: string;
  parameters?: Record<string, any>;
  resultMapping: ResultMapping;
}

export interface ResultMapping {
  idField: string;
  nameField?: string;
  emailField?: string;
  phoneField?: string;
  variableMapping?: Record<string, string>;
}

export interface WorkflowContentTemplate {
  title: string;
  message: string;
  richContent?: string;
  variables: TemplateVariable[];

  // Localization
  translations?: Record<string, LocalizedTemplate>;

  // Personalization
  personalizationRules?: PersonalizationRule[];

  // Dynamic content
  dynamicBlocks?: DynamicContentBlock[];
}

export interface TemplateVariable {
  name: string;
  type: "string" | "number" | "date" | "boolean" | "object" | "array";
  defaultValue?: any;
  isRequired: boolean;
  description?: string;

  // Validation
  validation?: VariableValidation;

  // Source mapping
  sourceMapping?: VariableSourceMapping;
}

export interface VariableValidation {
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  allowedValues?: any[];
  customValidator?: string;
}

export interface VariableSourceMapping {
  source:
    | "trigger_data"
    | "user_data"
    | "context"
    | "api_call"
    | "database"
    | "static";
  path: string;
  fallbackValue?: any;
  transformation?: VariableTransformation;
}

export interface VariableTransformation {
  type: "format" | "calculate" | "lookup" | "custom";
  parameters?: Record<string, any>;
  function?: string;
}

export interface LocalizedTemplate {
  title: string;
  message: string;
  richContent?: string;
  variables?: Record<string, string>;
}

export interface PersonalizationRule {
  condition: TriggerCondition;
  contentOverride: Partial<WorkflowContentTemplate>;
  priority: number;
}

export interface DynamicContentBlock {
  id: string;
  type: "conditional" | "loop" | "include";
  condition?: TriggerCondition;
  loopData?: LoopConfiguration;
  includeTemplate?: string;
  content: string;
}

export interface LoopConfiguration {
  dataSource: VariableSourceMapping;
  itemVariable: string;
  indexVariable?: string;
  separator?: string;
  maxItems?: number;
}

export interface WorkflowSchedule {
  type: "immediate" | "scheduled" | "recurring";

  // Scheduled execution
  executeAt?: string;
  timezone?: string;

  // Recurring execution
  recurrence?: RecurrencePattern;

  // Constraints
  maxExecutions?: number;
  endDate?: string;

  // Quiet hours
  respectQuietHours: boolean;
  quietHours?: QuietHoursConfig;
}

export interface RecurrencePattern {
  frequency: "minutes" | "hours" | "days" | "weeks" | "months" | "years";
  interval: number;

  // Specific patterns
  daysOfWeek?: number[]; // 0-6, Sunday = 0
  daysOfMonth?: number[]; // 1-31
  monthsOfYear?: number[]; // 1-12

  // Advanced patterns
  cronExpression?: string;

  // Exceptions
  excludeDates?: string[];
  includeHolidays?: boolean;
  holidayCalendar?: string;
}

export interface QuietHoursConfig {
  enabled: boolean;
  globalQuietHours?: TimeRange[];
  userSpecificHours: boolean;
  emergencyOverride: boolean;
}

export interface TimeRange {
  start: string; // HH:MM
  end: string; // HH:MM
  timezone?: string;
}

export interface RetryPolicy {
  enabled: boolean;
  maxRetries: number;
  retryDelay: number; // in minutes
  backoffStrategy: "fixed" | "linear" | "exponential";
  retryOn: RetryCondition[];
}

export interface RetryCondition {
  type: "error" | "timeout" | "status_code" | "custom";
  value?: any;
  retryAfter?: number;
}

export interface WorkflowPermissions {
  canView: string[];
  canEdit: string[];
  canExecute: string[];
  canDelete: string[];
  canClone: string[];

  // Tenant-specific permissions
  tenantRestrictions?: TenantRestriction[];

  // User type restrictions
  userTypeRestrictions?: UserTypeRestriction[];
}

export interface TenantRestriction {
  tenantId: string;
  permissions: string[];
  restrictions: string[];
}

export interface UserTypeRestriction {
  userType: UserType;
  allowedOperations: string[];
  deniedOperations: string[];
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;

  // Execution context
  triggeredBy: string;
  triggerData: Record<string, any>;
  executionContext: ExecutionContext;

  // Status & Results
  status: ExecutionStatus;
  startedAt: string;
  completedAt?: string;
  duration?: number; // in milliseconds

  // Steps execution
  stepExecutions: StepExecution[];

  // Results & Outputs
  result?: ExecutionResult;
  error?: ExecutionError;

  // Notifications sent
  notificationsSent: NotificationDelivery[];

  // Metrics
  metrics: ExecutionMetrics;
}

export type ExecutionStatus =
  | "pending"
  | "running"
  | "paused"
  | "completed"
  | "failed"
  | "cancelled"
  | "timeout";

export interface ExecutionContext {
  tenantId: string;
  userId?: string;
  userType?: UserType;
  sessionId?: string;
  correlationId?: string;

  // Environment
  environment: "production" | "staging" | "development";
  region?: string;

  // Data context
  contextData: Record<string, any>;
  variables: Record<string, any>;
}

export interface StepExecution {
  stepId: string;
  stepName: string;
  status: ExecutionStatus;
  startedAt: string;
  completedAt?: string;
  duration?: number;

  // Input & Output
  input?: any;
  output?: any;
  error?: string;

  // Retry information
  attemptNumber: number;
  retryCount: number;

  // Step-specific data
  notificationsSent?: number;
  apiCallsMade?: number;
  approvalsPending?: number;
}

export interface ExecutionResult {
  success: boolean;
  message?: string;
  data?: any;

  // Summary statistics
  totalSteps: number;
  completedSteps: number;
  failedSteps: number;
  skippedSteps: number;

  // Notifications summary
  notificationsSent: number;
  notificationsDelivered: number;
  notificationsFailed: number;

  // Performance metrics
  executionTime: number;
  resourceUsage?: ResourceUsage;
}

export interface ResourceUsage {
  cpuTime: number;
  memoryUsage: number;
  apiCalls: number;
  databaseQueries: number;
  externalRequests: number;
}

export interface ExecutionError {
  code: string;
  message: string;
  stepId?: string;
  stepName?: string;
  timestamp: string;

  // Error details
  details?: any;
  stackTrace?: string;

  // Recovery information
  isRecoverable: boolean;
  suggestedActions?: string[];
}

export interface NotificationDelivery {
  notificationId: string;
  recipientId: string;
  channel: NotificationChannel;
  status: "sent" | "delivered" | "failed";
  timestamp: string;
  error?: string;
}

export interface ExecutionMetrics {
  totalDuration: number;
  stepDurations: Record<string, number>;

  // Performance metrics
  throughput: number;
  errorRate: number;

  // Resource utilization
  resourceUsage: ResourceUsage;

  // Business metrics
  businessMetrics?: Record<string, number>;
}

export interface WorkflowMetrics {
  // Execution statistics
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageExecutionTime: number;

  // Success rates
  successRate: number;
  errorRate: number;
  timeoutRate: number;

  // Performance metrics
  averageThroughput: number;
  peakThroughput: number;
  averageLatency: number;

  // Notification metrics
  notificationsSent: number;
  notificationDeliveryRate: number;
  notificationEngagementRate: number;

  // Trend data
  dailyMetrics: DailyWorkflowMetrics[];
  hourlyMetrics: HourlyWorkflowMetrics[];

  // Last execution
  lastExecutionAt?: string;
  lastExecutionStatus?: ExecutionStatus;
  lastExecutionDuration?: number;

  // Health indicators
  healthScore: number;
  isHealthy: boolean;
  healthIssues?: string[];
}

export interface DailyWorkflowMetrics {
  date: string;
  executions: number;
  successRate: number;
  averageDuration: number;
  notificationsSent: number;
  errorCount: number;
}

export interface HourlyWorkflowMetrics {
  hour: number;
  executions: number;
  successRate: number;
  averageDuration: number;
  throughput: number;
}

// Workflow Builder Types
export interface WorkflowBuilder {
  workflow: NotificationWorkflow;
  canvas: WorkflowCanvas;
  palette: WorkflowPalette;
  validation: WorkflowValidation;
}

export interface WorkflowCanvas {
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  layout: CanvasLayout;
  zoom: number;
  offset: { x: number; y: number };
}

export interface WorkflowNode {
  id: string;
  type: WorkflowStepType | "start" | "end";
  position: { x: number; y: number };
  size: { width: number; height: number };
  data: WorkflowStep | StartNodeData | EndNodeData;
  style?: NodeStyle;
  isSelected: boolean;
  isValid: boolean;
  validationErrors?: string[];
}

export interface StartNodeData {
  trigger: WorkflowTrigger;
}

export interface EndNodeData {
  actions: StepAction[];
}

export interface NodeStyle {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  borderWidth?: number;
  borderStyle?: string;
  opacity?: number;
}

export interface WorkflowConnection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  sourceHandle?: string;
  targetHandle?: string;
  style?: ConnectionStyle;
  label?: string;
  condition?: WorkflowCondition;
}

export interface ConnectionStyle {
  strokeColor?: string;
  strokeWidth?: number;
  strokeStyle?: "solid" | "dashed" | "dotted";
  animated?: boolean;
}

export interface CanvasLayout {
  algorithm: "auto" | "manual" | "hierarchical" | "circular";
  direction: "top-bottom" | "left-right" | "bottom-top" | "right-left";
  spacing: { x: number; y: number };
  alignment: "start" | "center" | "end";
}

export interface WorkflowPalette {
  categories: PaletteCategory[];
}

export interface PaletteCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  items: PaletteItem[];
  isExpanded: boolean;
}

export interface PaletteItem {
  id: string;
  type: WorkflowStepType;
  name: string;
  description: string;
  icon: string;
  template: Partial<WorkflowStep>;
  category: string;
  tags: string[];
}

export interface WorkflowValidation {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
}

export interface ValidationError {
  type: "error";
  code: string;
  message: string;
  nodeId?: string;
  stepId?: string;
  field?: string;
  severity: "critical" | "high" | "medium";
}

export interface ValidationWarning {
  type: "warning";
  code: string;
  message: string;
  nodeId?: string;
  stepId?: string;
  field?: string;
  impact: "performance" | "usability" | "maintainability";
}

export interface ValidationSuggestion {
  type: "suggestion";
  message: string;
  action?: string;
  nodeId?: string;
  stepId?: string;
  priority: "high" | "medium" | "low";
}
