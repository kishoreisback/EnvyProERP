export interface SystemAuditLog {
  id: string;
  tenantId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;

  // Event details
  action: string;
  resource: string;
  resourceType: AuditResourceType;
  resourceId?: string;
  module: string;

  // Event context
  description: string;
  changes?: AuditChange[];
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;

  // Result and impact
  status: "success" | "failure" | "partial";
  severity: "info" | "warning" | "error" | "critical";
  riskLevel: "low" | "medium" | "high" | "critical";

  // Security context
  ipAddress: string;
  userAgent: string;
  sessionId?: string;
  location?: {
    country?: string;
    city?: string;
    timezone?: string;
  };

  // Metadata
  timestamp: string;
  duration?: number; // milliseconds
  details?: Record<string, any>;
  correlationId?: string; // for tracking related events
  parentId?: string; // for nested operations

  // Compliance
  complianceCategory?: string[];
  dataClassification?: "public" | "internal" | "confidential" | "restricted";
  retentionPolicy?: string;
}

export interface AuditChange {
  field: string;
  oldValue: any;
  newValue: any;
  changeType: "create" | "update" | "delete";
  sensitive?: boolean;
}

export type AuditResourceType =
  | "order"
  | "inventory"
  | "purchase_order"
  | "user"
  | "role"
  | "permission"
  | "franchisee"
  | "product"
  | "customer"
  | "quotation"
  | "invoice"
  | "payment"
  | "tenant"
  | "system"
  | "authentication"
  | "session"
  | "configuration"
  | "report"
  | "document"
  | "communication"
  | "workflow"
  | "approval"
  | "security_policy"
  | "integration";

export interface AuditFilter {
  tenantId?: string;
  userId?: string;
  resourceType?: AuditResourceType | "all";
  module?: string | "all";
  action?: string | "all";
  severity?: string | "all";
  status?: string | "all";
  riskLevel?: string | "all";
  dateRange?: {
    from: Date;
    to: Date;
  };
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export interface AuditSummary {
  totalEvents: number;
  successfulEvents: number;
  failedEvents: number;
  criticalEvents: number;
  warningEvents: number;
  uniqueUsers: number;
  mostActiveUser: string;
  mostCommonAction: string;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  moduleActivity: {
    [module: string]: number;
  };
  timelineData: {
    timestamp: string;
    eventCount: number;
    successCount: number;
    failureCount: number;
  }[];
}

export interface SecurityEvent extends SystemAuditLog {
  securityEventType:
    | "login_attempt"
    | "login_success"
    | "login_failure"
    | "logout"
    | "password_change"
    | "password_reset"
    | "mfa_enabled"
    | "mfa_disabled"
    | "suspicious_activity"
    | "account_locked"
    | "account_unlocked"
    | "permission_escalation"
    | "unauthorized_access"
    | "data_export"
    | "configuration_change"
    | "role_assignment"
    | "role_revocation";

  threatIndicators?: string[];
  geolocation?: {
    country: string;
    region: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  deviceFingerprint?: string;
  previousLogin?: string;
  failedAttempts?: number;
}

export interface FranchiseeAuditEvent extends SystemAuditLog {
  franchiseeId: string;
  franchiseeName: string;
  franchiseeStatus: string;
  territoryCode: string;
  corporateReviewerId?: string;
  approvalStatus?: "pending" | "approved" | "rejected";
  businessImpact?: "low" | "medium" | "high";
  financialAmount?: number;
  currency?: string;
}

export interface InventoryAuditEvent extends SystemAuditLog {
  productId: string;
  productName: string;
  warehouseId?: string;
  locationCode?: string;
  quantityBefore?: number;
  quantityAfter?: number;
  quantityChange?: number;
  unitCost?: number;
  totalValue?: number;
  adjustmentReason?: string;
  batchNumber?: string;
  expiryDate?: string;
  supplierRef?: string;
}

export interface OrderAuditEvent extends SystemAuditLog {
  orderId: string;
  orderNumber: string;
  orderType: "sales" | "purchase" | "transfer" | "return";
  orderStatus: string;
  customerId?: string;
  supplierId?: string;
  totalAmount: number;
  currency: string;
  lineItemsCount: number;
  paymentStatus?: string;
  deliveryStatus?: string;
  territoryCode?: string;
  salesRepId?: string;
}

export interface POApprovalEvent extends SystemAuditLog {
  poId: string;
  poNumber: string;
  poAmount: number;
  currency: string;
  supplierId: string;
  supplierName: string;
  requestorId: string;
  requestorName: string;
  approverId?: string;
  approverName?: string;
  approvalLevel: number;
  approvalStatus: "pending" | "approved" | "rejected" | "cancelled";
  rejectionReason?: string;
  budgetCode?: string;
  departmentCode?: string;
  urgencyLevel: "low" | "medium" | "high" | "urgent";
  complianceChecks?: {
    budgetCheck: boolean;
    supplierCheck: boolean;
    policyCheck: boolean;
    authorizationCheck: boolean;
  };
}

export interface AuditConfiguration {
  tenantId: string;
  enabled: boolean;

  // Retention policies
  retentionPeriodDays: number;
  archiveAfterDays: number;
  deleteAfterDays: number;

  // Event categories to audit
  auditCategories: {
    authentication: boolean;
    userManagement: boolean;
    roleManagement: boolean;
    orderManagement: boolean;
    inventoryManagement: boolean;
    poApprovals: boolean;
    franchiseeOperations: boolean;
    systemConfiguration: boolean;
    dataExport: boolean;
    reportGeneration: boolean;
    integrations: boolean;
    workflowOperations: boolean;
  };

  // Severity levels to log
  minimumSeverityLevel: "info" | "warning" | "error" | "critical";

  // Real-time monitoring
  realTimeAlerts: boolean;
  alertThresholds: {
    failedLoginsPerHour: number;
    criticalEventsPerHour: number;
    unauthorizedAccessAttempts: number;
    dataExportVolumeThreshold: number;
  };

  // Compliance requirements
  complianceStandards: string[]; // e.g., ["SOX", "GDPR", "ISO27001"]
  requireDigitalSignatures: boolean;
  immutableLogging: boolean;

  // Export and reporting
  allowExport: boolean;
  exportFormats: string[]; // ["csv", "xlsx", "pdf", "json"]
  scheduledReports: boolean;

  // Integration
  syslogEndpoint?: string;
  siemIntegration?: boolean;
  webhookEndpoints?: string[];
}

export interface AuditReport {
  id: string;
  tenantId: string;
  reportType:
    | "daily"
    | "weekly"
    | "monthly"
    | "quarterly"
    | "annual"
    | "custom";
  title: string;
  description: string;
  period: {
    from: string;
    to: string;
  };

  // Report content
  summary: AuditSummary;
  topRisks: SystemAuditLog[];
  securityIncidents: SecurityEvent[];
  complianceEvents: SystemAuditLog[];
  userActivity: {
    userId: string;
    userName: string;
    eventCount: number;
    riskScore: number;
  }[];

  // Metadata
  generatedAt: string;
  generatedBy: string;
  format: "pdf" | "xlsx" | "csv" | "json";
  downloadUrl?: string;
  expiresAt?: string;
}

export interface AuditDashboardMetrics {
  tenantId: string;
  period: "today" | "week" | "month" | "quarter";

  // Current metrics
  totalEvents: number;
  criticalEvents: number;
  securityIncidents: number;
  failedOperations: number;
  uniqueActiveUsers: number;

  // Trends (compared to previous period)
  eventsTrend: number; // percentage change
  riskTrend: number;
  securityTrend: number;
  userActivityTrend: number;

  // Top lists
  topUsers: Array<{
    userId: string;
    userName: string;
    eventCount: number;
    riskScore: number;
  }>;

  topActions: Array<{
    action: string;
    count: number;
    riskLevel: string;
  }>;

  recentCriticalEvents: SystemAuditLog[];

  // Charts data
  activityTimeline: Array<{
    timestamp: string;
    events: number;
    risks: number;
  }>;

  moduleActivity: Array<{
    module: string;
    events: number;
    percentage: number;
  }>;

  riskDistribution: Array<{
    level: string;
    count: number;
    percentage: number;
  }>;
}
