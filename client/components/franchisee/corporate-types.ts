// Corporate Review & Approval Workflow Types

export interface CorporateUser {
  id: string;
  tenantId: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: CorporateRole;
  department: string;
  region?: string;
  isActive: boolean;
  permissions: CorporatePermission[];
  createdAt: string;
  updatedAt: string;
}

export interface CorporateRole {
  id: string;
  name: string;
  level: number; // 1=Regional Manager, 2=Area Head, 3=National Head, 4=CEO
  description: string;
  canApprove: boolean;
  canAssign: boolean;
  canReject: boolean;
  maxApprovalAmount: number;
  regions: string[];
}

export interface CorporatePermission {
  id: string;
  module: string;
  action: string; // view, create, edit, delete, approve, assign
  resource: string;
}

export interface WorkflowAssignment {
  id: string;
  requestId: string;
  assignedFrom: string;
  assignedTo: string;
  assignedBy: string;
  assignedAt: string;
  dueDate: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "completed" | "escalated";
  notes?: string;
  completedAt?: string;
  escalatedAt?: string;
  escalatedTo?: string;
}

export interface WorkflowAction {
  id: string;
  requestId: string;
  actionType:
    | "comment"
    | "approve"
    | "reject"
    | "request_info"
    | "assign"
    | "escalate"
    | "background_check";
  performedBy: string;
  performedAt: string;
  comments?: string;
  attachments?: WorkflowAttachment[];
  metadata?: Record<string, any>;
  isSystemAction: boolean;
}

export interface WorkflowAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
}

export interface BackgroundVerification {
  id: string;
  requestId: string;
  customerId: string;
  verificationStatus: "not_started" | "in_progress" | "completed" | "failed";
  verificationProvider: string;
  verificationData: {
    identityVerification: VerificationCheck;
    creditCheck: VerificationCheck;
    criminalBackground: VerificationCheck;
    businessVerification: VerificationCheck;
    bankVerification: VerificationCheck;
  };
  startedAt?: string;
  completedAt?: string;
  cost: number;
  currency: string;
}

export interface VerificationCheck {
  status: "pending" | "verified" | "failed" | "partial";
  score?: number;
  details?: string;
  verifiedAt?: string;
  issues?: string[];
}

export interface NotificationRule {
  id: string;
  name: string;
  description: string;
  trigger: NotificationTrigger;
  recipients: NotificationRecipient[];
  channels: NotificationChannel[];
  template: string;
  isActive: boolean;
  conditions?: NotificationCondition[];
}

export interface NotificationTrigger {
  event:
    | "request_submitted"
    | "request_assigned"
    | "request_approved"
    | "request_rejected"
    | "verification_completed"
    | "due_date_approaching"
    | "escalation_triggered";
  delay?: number; // minutes
}

export interface NotificationRecipient {
  type: "user" | "role" | "email";
  value: string;
}

export interface NotificationChannel {
  type: "email" | "sms" | "push" | "in_app";
  isEnabled: boolean;
}

export interface NotificationCondition {
  field: string;
  operator: "equals" | "not_equals" | "greater_than" | "less_than" | "contains";
  value: string | number;
}

export interface Notification {
  id: string;
  tenantId: string;
  recipientId: string;
  recipientType: "user" | "email";
  channel: "email" | "sms" | "push" | "in_app";
  title: string;
  message: string;
  data?: Record<string, any>;
  status: "pending" | "sent" | "delivered" | "failed" | "read";
  sentAt?: string;
  readAt?: string;
  expiresAt?: string;
  priority: "low" | "medium" | "high";
}

export interface AuditLog {
  id: string;
  tenantId: string;
  entityType:
    | "franchisee_request"
    | "assignment"
    | "approval"
    | "user"
    | "system";
  entityId: string;
  action: string;
  performedBy: string;
  performedAt: string;
  changes?: AuditChange[];
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditChange {
  field: string;
  oldValue?: any;
  newValue?: any;
}

export interface CorporateDashboard {
  pendingRequests: number;
  myAssignments: number;
  overdueItems: number;
  completedToday: number;
  approvalStats: {
    totalProcessed: number;
    approvalRate: number;
    averageProcessingTime: number; // in hours
  };
  regionStats?: {
    region: string;
    pending: number;
    approved: number;
    rejected: number;
  }[];
  recentActivities: WorkflowAction[];
  performanceMetrics: {
    productivity: number;
    quality: number;
    timeliness: number;
  };
}

export interface WorkflowComment {
  id: string;
  requestId: string;
  authorId: string;
  authorName: string;
  content: string;
  isInternal: boolean;
  attachments?: WorkflowAttachment[];
  createdAt: string;
  updatedAt?: string;
  mentions?: string[];
}

export interface EscalationRule {
  id: string;
  name: string;
  description: string;
  conditions: EscalationCondition[];
  actions: EscalationAction[];
  isActive: boolean;
  priority: number;
}

export interface EscalationCondition {
  type: "time_based" | "amount_based" | "region_based" | "custom";
  operator: "greater_than" | "less_than" | "equals";
  value: number | string;
  unit?: "hours" | "days" | "amount";
}

export interface EscalationAction {
  type: "notify" | "reassign" | "auto_approve" | "auto_reject";
  target: string;
  message?: string;
}

// Form Types for Corporate Workflow
export interface AssignmentForm {
  assignToUserId: string;
  dueDate: string;
  priority: "low" | "medium" | "high" | "urgent";
  notes?: string;
}

export interface ApprovalForm {
  action: "approve" | "reject" | "request_more_info";
  comments: string;
  conditions?: string[];
  nextApprover?: string;
}

export interface BackgroundCheckForm {
  provider: string;
  checkTypes: string[];
  urgency: "standard" | "priority" | "urgent";
  notifyOn: string[];
}

// Analytics Types
export interface WorkflowAnalytics {
  processingTimes: {
    average: number;
    median: number;
    p95: number;
    byStage: { stage: string; avgTime: number }[];
  };
  approvalRates: {
    overall: number;
    byRegion: { region: string; rate: number }[];
    byAmount: { range: string; rate: number }[];
  };
  bottlenecks: {
    stage: string;
    avgDelay: number;
    count: number;
  }[];
  userPerformance: {
    userId: string;
    userName: string;
    processed: number;
    avgTime: number;
    approvalRate: number;
  }[];
}
