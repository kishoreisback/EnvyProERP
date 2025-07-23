// Enhanced Workflow Types for Multi-Tenant System

export type WorkflowNodeType =
  | "start"
  | "action"
  | "condition"
  | "approval"
  | "notification"
  | "delay"
  | "data"
  | "integration"
  | "form"
  | "api_call"
  | "email"
  | "webhook"
  | "script"
  | "end";

export type WorkflowTriggerType =
  | "manual"
  | "form_submission"
  | "schedule"
  | "webhook"
  | "email"
  | "file_upload"
  | "user_action"
  | "system_event"
  | "api_call"
  | "data_change"
  | "time_based"
  | "conditional";

export type WorkflowStatus =
  | "draft"
  | "active"
  | "paused"
  | "archived"
  | "deleted"
  | "pending_approval";

export type WorkflowCategory =
  | "user_management"
  | "project_management"
  | "crm"
  | "hrms"
  | "finance"
  | "operations"
  | "approval"
  | "notification"
  | "integration"
  | "automation"
  | "compliance"
  | "custom";

export interface TenantWorkflow {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  category: WorkflowCategory;
  version: string;
  status: WorkflowStatus;

  // Workflow definition
  trigger: WorkflowTriggerConfig;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  variables: WorkflowVariable[];

  // Settings
  settings: WorkflowSettings;

  // Permissions and access
  visibility: "public" | "private" | "team" | "role_based";
  permissions: WorkflowPermissions;

  // Tenant context
  createdBy: string;
  updatedBy?: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;

  // Usage and analytics
  executionCount: number;
  successCount: number;
  failureCount: number;
  lastExecuted?: string;
  averageExecutionTime?: number; // milliseconds

  // Templates and sharing
  isTemplate: boolean;
  templateSource?: string; // If created from template
  sharedWith?: string[]; // Tenant IDs workflow is shared with

  // Tags and organization
  tags: string[];
  folder?: string;

  // Lifecycle
  publishedVersion?: string;
  draftChanges: boolean;
}

export interface WorkflowTriggerConfig {
  type: WorkflowTriggerType;
  config: Record<string, any>;
  conditions?: TriggerCondition[];
  schedule?: WorkflowSchedule;
  webhookConfig?: WebhookConfig;
  formConfig?: FormConfig;
  eventConfig?: EventConfig;
}

export interface TriggerCondition {
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

export interface WorkflowSchedule {
  type: "once" | "recurring";
  datetime?: string;
  timezone: string;
  recurrence?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    daysOfWeek?: number[];
    dayOfMonth?: number;
    endDate?: string;
    maxOccurrences?: number;
  };
}

export interface WebhookConfig {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  authentication?: {
    type: "none" | "basic" | "bearer" | "api_key";
    credentials?: Record<string, string>;
  };
  retryPolicy?: {
    enabled: boolean;
    maxRetries: number;
    retryDelay: number;
  };
}

export interface FormConfig {
  formId: string;
  formName: string;
  triggerOnSubmit: boolean;
  triggerOnUpdate: boolean;
  fieldMappings?: Record<string, string>;
}

export interface EventConfig {
  eventType: string;
  source: string;
  filters?: Record<string, any>;
}

export interface WorkflowNodePosition {
  x: number;
  y: number;
}

export interface WorkflowConnection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
  condition?: string;
  conditionExpression?: string;
  weight?: number; // For priority routing
}

export interface WorkflowNodeData {
  label: string;
  description?: string;
  config: Record<string, any>;
  inputs?: WorkflowNodeInput[];
  outputs?: WorkflowNodeOutput[];

  // Node-specific configurations
  timeoutSeconds?: number;
  retryPolicy?: NodeRetryPolicy;
  errorHandling?: NodeErrorHandling;

  // UI properties
  color?: string;
  icon?: string;
  collapsed?: boolean;

  // Validation
  validation?: NodeValidation[];

  // Permissions
  requiredPermissions?: string[];
  allowedRoles?: string[];
}

export interface NodeRetryPolicy {
  enabled: boolean;
  maxRetries: number;
  retryDelay: number; // milliseconds
  backoffMultiplier?: number;
  maxRetryDelay?: number; // milliseconds
}

export interface NodeErrorHandling {
  continueOnError: boolean;
  errorPath?: string; // Node ID to route to on error
  logErrors: boolean;
  notifyOnError: boolean;
  customErrorMessage?: string;
}

export interface NodeValidation {
  field: string;
  type: "required" | "type" | "format" | "range" | "custom";
  rule: any;
  message: string;
}

export interface WorkflowNodeInput {
  id: string;
  name: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "file"
    | "date"
    | "email"
    | "url";
  required?: boolean;
  defaultValue?: any;
  description?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    options?: any[];
  };
}

export interface WorkflowNodeOutput {
  id: string;
  name: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "file"
    | "date"
    | "email"
    | "url";
  description?: string;
}

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  position: WorkflowNodePosition;
  data: WorkflowNodeData;
  selected?: boolean;
  dragging?: boolean;

  // Execution state
  status?: NodeExecutionStatus;
  executionTime?: number;
  lastExecuted?: string;
  errorMessage?: string;
  outputData?: any;
}

export type NodeExecutionStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "skipped"
  | "timeout"
  | "cancelled";

export interface WorkflowVariable {
  id: string;
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array" | "secret";
  defaultValue?: any;
  description?: string;
  scope: "global" | "execution" | "node";
  encrypted?: boolean; // For sensitive data

  // Validation
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    options?: any[];
  };

  // Access control
  readOnly?: boolean;
  allowedRoles?: string[];
}

export interface WorkflowSettings {
  // Execution settings
  autoSave: boolean;
  enableLogging: boolean;
  logLevel: "error" | "warn" | "info" | "debug";
  maxExecutionTime: number; // seconds
  maxConcurrentExecutions: number;

  // Retry and error handling
  retryPolicy: {
    enabled: boolean;
    maxRetries: number;
    retryDelay: number; // seconds
    exponentialBackoff: boolean;
  };

  // Notifications
  notifications: {
    onSuccess: boolean;
    onFailure: boolean;
    onTimeout: boolean;
    recipients: string[]; // User IDs or emails
    channels: string[]; // notification channels
  };

  // Security
  requireApproval: boolean;
  allowedExecutors?: string[]; // User IDs or role IDs
  approvalRoles?: string[];

  // Performance
  cacheResults: boolean;
  cacheTTL: number; // seconds

  // Integration
  webhookUrl?: string;
  apiCallbacks?: string[];

  // Monitoring
  enableMetrics: boolean;
  enableTracing: boolean;

  // Environment
  environment: "development" | "staging" | "production";

  // Tenant-specific settings
  tenantSettings?: Record<string, any>;
}

export interface WorkflowPermissions {
  // View permissions
  canView: string[]; // User IDs, role IDs, or 'all'

  // Edit permissions
  canEdit: string[];
  canDelete: string[];
  canExecute: string[];
  canApprove: string[];

  // Share permissions
  canShare: string[];
  canCopy: string[];
  canExport: string[];

  // Admin permissions
  canManagePermissions: string[];
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  tenantId: string;
  version: string;

  // Execution details
  status: WorkflowExecutionStatus;
  startTime: Date;
  endTime?: Date;
  duration?: number; // milliseconds

  // Trigger information
  triggeredBy: string; // User ID or 'system'
  triggerType: WorkflowTriggerType;
  triggerData?: any;

  // Execution context
  variables: Record<string, any>;
  logs: WorkflowExecutionLog[];
  errors: WorkflowExecutionError[];

  // Results
  outputData?: any;
  successRate?: number; // Percentage of successful nodes

  // Resource usage
  resourceUsage?: {
    cpuTime: number; // milliseconds
    memoryUsage: number; // bytes
    apiCalls: number;
    storageUsed: number; // bytes
  };

  // Cost tracking
  cost?: {
    total: number;
    breakdown: Record<string, number>;
    currency: string;
  };

  // Parent/child executions
  parentExecutionId?: string;
  childExecutions?: string[];

  // Metadata
  metadata?: Record<string, any>;
  tags?: string[];
}

export type WorkflowExecutionStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled"
  | "timeout"
  | "paused"
  | "waiting"; // Waiting for approval or external input

export interface WorkflowExecutionLog {
  id: string;
  executionId: string;
  nodeId?: string;
  timestamp: Date;
  level: "debug" | "info" | "warn" | "error";
  message: string;
  data?: any;
  duration?: number; // milliseconds for node execution

  // Context
  stepName?: string;
  stepType?: string;
  userId?: string;

  // Correlation
  correlationId?: string;
  traceId?: string;
}

export interface WorkflowExecutionError {
  id: string;
  executionId: string;
  nodeId?: string;
  timestamp: Date;

  // Error details
  type: string;
  message: string;
  stack?: string;
  code?: string;

  // Context
  inputData?: any;
  expectedOutput?: any;
  actualOutput?: any;

  // Resolution
  retryAttempt?: number;
  resolved?: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  resolution?: string;
}

export interface NodeTemplate {
  type: WorkflowNodeType;
  label: string;
  description: string;
  icon: string;
  category: string;
  tags: string[];

  // Default configuration
  defaultData: WorkflowNodeData;
  configSchema: NodeConfigField[];

  // Capabilities
  supportsRetry: boolean;
  supportsAsync: boolean;
  supportsConditionals: boolean;

  // Requirements
  requiredPermissions?: string[];
  minimumVersion?: string;
  dependencies?: string[];

  // Template metadata
  author?: string;
  version?: string;
  documentation?: string;
  examples?: NodeExample[];
}

export interface NodeExample {
  name: string;
  description: string;
  config: Record<string, any>;
  inputData?: any;
  expectedOutput?: any;
}

export interface NodeConfigField {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "select"
    | "multiselect"
    | "checkbox"
    | "email"
    | "url"
    | "password"
    | "json"
    | "code";
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  description?: string;
  defaultValue?: any;

  // Validation
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: string; // Custom validation function
  };

  // Conditional display
  dependsOn?: {
    field: string;
    value: any;
  };

  // Advanced features
  multiline?: boolean;
  language?: string; // For code editor
  encrypted?: boolean; // For sensitive fields
}

export interface WorkflowBuilderState {
  workflow: TenantWorkflow | null;
  selectedNodeId: string | null;
  selectedConnection: string | null;

  // UI state
  zoom: number;
  pan: { x: number; y: number };
  mode: "design" | "execute" | "debug" | "view";

  // Display options
  showGrid: boolean;
  showMinimap: boolean;
  showNodeLabels: boolean;
  showConnectionLabels: boolean;

  // Execution state
  isExecuting: boolean;
  currentExecution?: WorkflowExecution;

  // History
  undoStack: WorkflowSnapshot[];
  redoStack: WorkflowSnapshot[];

  // Clipboard
  clipboard?: {
    nodes: WorkflowNode[];
    connections: WorkflowConnection[];
  };

  // Validation
  validationErrors: ValidationError[];

  // Auto-save
  hasUnsavedChanges: boolean;
  lastSaved?: Date;
}

export interface WorkflowSnapshot {
  id: string;
  timestamp: Date;
  description: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  variables: WorkflowVariable[];
}

export interface ValidationError {
  id: string;
  type: "error" | "warning" | "info";
  message: string;
  nodeId?: string;
  connectionId?: string;
  field?: string;
}

// Workflow analytics and metrics
export interface WorkflowAnalytics {
  tenantId: string;
  workflowId?: string; // If specific to one workflow
  period: "day" | "week" | "month" | "quarter" | "year";
  startDate: string;
  endDate: string;

  // Execution metrics
  executions: {
    total: number;
    successful: number;
    failed: number;
    cancelled: number;
    timeout: number;
    averageDuration: number; // milliseconds
    medianDuration: number;
    p95Duration: number;
    p99Duration: number;
  };

  // Performance metrics
  performance: {
    throughput: number; // executions per hour
    errorRate: number; // percentage
    availabilityRate: number; // percentage
    averageWaitTime: number; // milliseconds
  };

  // Resource usage
  resources: {
    totalCpuTime: number; // milliseconds
    totalMemoryUsage: number; // bytes
    totalApiCalls: number;
    totalStorageUsed: number; // bytes
    cost: number;
  };

  // Node statistics
  nodeStats: {
    [nodeType: string]: {
      executions: number;
      failures: number;
      averageDuration: number;
      errorRate: number;
    };
  };

  // Trends
  trends: {
    daily: DailyMetrics[];
    hourly: HourlyMetrics[];
  };

  // Top metrics
  topWorkflows: WorkflowMetric[];
  slowestNodes: NodeMetric[];
  mostUsedNodes: NodeMetric[];
}

export interface DailyMetrics {
  date: string;
  executions: number;
  successes: number;
  failures: number;
  averageDuration: number;
  cost: number;
}

export interface HourlyMetrics {
  hour: number;
  executions: number;
  successes: number;
  failures: number;
  averageDuration: number;
}

export interface WorkflowMetric {
  workflowId: string;
  workflowName: string;
  executions: number;
  successRate: number;
  averageDuration: number;
  cost: number;
}

export interface NodeMetric {
  nodeType: string;
  label: string;
  executions: number;
  averageDuration: number;
  errorRate: number;
}

// Integration interfaces
export interface WorkflowIntegration {
  id: string;
  tenantId: string;
  name: string;
  type: IntegrationType;
  config: IntegrationConfig;

  // Status
  isActive: boolean;
  isHealthy: boolean;
  lastCheck?: string;
  errorMessage?: string;

  // Usage
  usageCount: number;
  lastUsed?: string;

  // Limits
  rateLimit?: {
    requests: number;
    period: "minute" | "hour" | "day";
    remaining: number;
    resetTime?: string;
  };

  // Security
  authentication: AuthenticationConfig;

  // Tenant context
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export type IntegrationType =
  | "webhook"
  | "api"
  | "database"
  | "email"
  | "sms"
  | "slack"
  | "teams"
  | "zapier"
  | "custom";

export interface IntegrationConfig {
  baseUrl?: string;
  endpoints?: Record<string, string>;
  headers?: Record<string, string>;
  timeout?: number;
  retryPolicy?: {
    enabled: boolean;
    maxRetries: number;
    retryDelay: number;
  };
  customConfig?: Record<string, any>;
}

export interface AuthenticationConfig {
  type: "none" | "basic" | "bearer" | "api_key" | "oauth2" | "custom";
  credentials: Record<string, string>;
  refreshToken?: string;
  expiresAt?: string;
}

// Export default for easier importing
export default {
  TenantWorkflow,
  WorkflowExecution,
  WorkflowNode,
  WorkflowConnection,
  WorkflowBuilderState,
  WorkflowAnalytics,
  WorkflowIntegration,
};
