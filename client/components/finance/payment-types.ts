// Franchisee Payment Workflow Types
// Integration with existing Invoice, Notification, and Finance modules

import { Invoice } from "./invoice-types";
import { Currency, PaymentMethod, PaymentStatus } from "./types";

// Payment Gateway Types
export type PaymentGateway =
  | "razorpay"
  | "payu"
  | "hdfc"
  | "icici"
  | "sbi"
  | "upi"
  | "neft"
  | "rtgs"
  | "imps";

export type PaymentWorkflowStatus =
  | "initiated"
  | "processing"
  | "gateway_pending"
  | "completed"
  | "failed"
  | "cancelled"
  | "refunded"
  | "partially_refunded";

export type ReconciliationStatus =
  | "pending"
  | "matched"
  | "mismatched"
  | "duplicate"
  | "manual_review"
  | "reconciled";

export type CreditLimitStatus =
  | "within_limit"
  | "approaching_limit"
  | "exceeded"
  | "suspended";

// Payment Transaction Interface
export interface PaymentTransaction {
  id: string;
  transactionId: string;
  paymentId: string;

  // Multi-tenant context
  tenantId: string;
  franchiseeId: string;
  corporateId: string;

  // Invoice relation
  invoiceId: string;
  invoiceNumber: string;

  // Payment details
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  gateway: PaymentGateway;

  // Status tracking
  status: PaymentWorkflowStatus;
  gatewayStatus?: string;
  gatewayResponse?: GatewayResponse;

  // Timestamps
  initiatedAt: string;
  processedAt?: string;
  completedAt?: string;
  failedAt?: string;

  // Additional info
  description?: string;
  reference?: string;
  fees?: PaymentFees;

  // Reconciliation
  reconciliation: ReconciliationInfo;

  // Audit trail
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

// Gateway Response Interface
export interface GatewayResponse {
  gatewayTransactionId: string;
  gatewayOrderId?: string;
  responseCode: string;
  responseMessage: string;
  bankReference?: string;
  settlementDate?: string;
  fees?: number;
  rawResponse: Record<string, any>;
}

// Payment Fees Structure
export interface PaymentFees {
  gatewayFee: number;
  processingFee: number;
  gst: number;
  totalFees: number;
  feesPaidBy: "franchisee" | "corporate" | "split";
}

// Reconciliation Information
export interface ReconciliationInfo {
  status: ReconciliationStatus;
  matchedAt?: string;
  matchedBy?: string;
  bankStatement?: BankStatementEntry;
  discrepancies?: ReconciliationDiscrepancy[];
  manualNotes?: string;
  autoReconciled: boolean;
}

// Bank Statement Entry
export interface BankStatementEntry {
  entryId: string;
  date: string;
  description: string;
  debitAmount?: number;
  creditAmount: number;
  balance: number;
  reference: string;
  utr?: string;
}

// Reconciliation Discrepancy
export interface ReconciliationDiscrepancy {
  field: string;
  expected: any;
  actual: any;
  severity: "low" | "medium" | "high";
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  notes?: string;
}

// Payment Workflow Definition
export interface PaymentWorkflow {
  id: string;
  name: string;
  description: string;

  // Multi-tenant context
  tenantId: string;
  corporateId: string;

  // Workflow configuration
  autoProcessing: boolean;
  requiresApproval: boolean;
  approvalLimits: ApprovalLimit[];

  // Gateway settings
  enabledGateways: PaymentGateway[];
  preferredGateway: PaymentGateway;
  gatewayConfigs: Record<PaymentGateway, GatewayConfig>;

  // Reconciliation settings
  autoReconciliation: boolean;
  reconciliationRules: ReconciliationRule[];
  manualReviewThreshold: number;

  // Notification settings
  notifications: PaymentNotificationConfig[];

  // Credit limit settings
  creditLimitEnabled: boolean;
  creditLimitRules: CreditLimitRule[];

  // Audit
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Gateway Configuration
export interface GatewayConfig {
  gatewayId: string;
  apiKey: string;
  secretKey: string;
  webhookSecret: string;
  testMode: boolean;
  supportedMethods: PaymentMethod[];
  fees: GatewayFeeStructure;
  limits: GatewayLimits;
}

// Gateway Fee Structure
export interface GatewayFeeStructure {
  percentage: number;
  fixedFee: number;
  minimumFee: number;
  maximumFee: number;
  gstRate: number;
}

// Gateway Limits
export interface GatewayLimits {
  minAmount: number;
  maxAmount: number;
  dailyLimit: number;
  monthlyLimit: number;
}

// Approval Limit
export interface ApprovalLimit {
  level: number;
  amountThreshold: number;
  approverRole: string;
  requiredApprovers: number;
  timeoutHours: number;
}

// Reconciliation Rule
export interface ReconciliationRule {
  id: string;
  name: string;
  description: string;
  conditions: ReconciliationCondition[];
  actions: ReconciliationAction[];
  priority: number;
  isActive: boolean;
}

// Reconciliation Condition
export interface ReconciliationCondition {
  field: string;
  operator: "equals" | "contains" | "greater_than" | "less_than" | "between";
  value: any;
  tolerance?: number; // For amount matching
}

// Reconciliation Action
export interface ReconciliationAction {
  type: "auto_match" | "manual_review" | "notify" | "reject";
  parameters: Record<string, any>;
}

// Payment Notification Configuration
export interface PaymentNotificationConfig {
  event: PaymentNotificationEvent;
  enabled: boolean;
  channels: PaymentNotificationChannel[];
  recipients: PaymentNotificationRecipient[];
  template: string;
  conditions?: PaymentNotificationCondition[];
}

export type PaymentNotificationEvent =
  | "payment_initiated"
  | "payment_processing"
  | "payment_completed"
  | "payment_failed"
  | "reconciliation_mismatch"
  | "late_payment_reminder"
  | "credit_limit_warning"
  | "credit_limit_exceeded";

export type PaymentNotificationChannel =
  | "email"
  | "sms"
  | "push"
  | "webhook"
  | "dashboard";

// Payment Notification Recipient
export interface PaymentNotificationRecipient {
  type: "role" | "user" | "email";
  identifier: string;
  tenantId?: string;
}

// Payment Notification Condition
export interface PaymentNotificationCondition {
  field: string;
  operator: string;
  value: any;
}

// Credit Limit Management
export interface CreditLimit {
  id: string;
  franchiseeId: string;
  corporateId: string;
  tenantId: string;

  // Limit details
  totalLimit: number;
  availableLimit: number;
  usedLimit: number;
  blockedLimit: number;

  // Utilization
  utilizationPercentage: number;
  status: CreditLimitStatus;

  // Terms
  creditDays: number;
  interestRate: number;
  penaltyRate: number;

  // Monitoring
  warningThreshold: number; // Percentage
  blockingThreshold: number; // Percentage

  // History
  history: CreditLimitHistory[];

  // Audit
  lastReviewedAt: string;
  lastReviewedBy: string;
  nextReviewDate: string;
  createdAt: string;
  updatedAt: string;
}

// Credit Limit Rule
export interface CreditLimitRule {
  id: string;
  name: string;
  description: string;

  // Conditions
  franchiseeCategory: string[];
  businessType: string[];
  minimumRevenue?: number;
  creditScore?: number;

  // Limits
  defaultLimit: number;
  maxLimit: number;
  creditDays: number;

  // Risk factors
  riskWeights: Record<string, number>;
  adjustmentFactors: CreditAdjustmentFactor[];

  // Monitoring
  reviewFrequency: number; // Days
  autoAdjustment: boolean;

  isActive: boolean;
  createdAt: string;
}

// Credit Adjustment Factor
export interface CreditAdjustmentFactor {
  factor: string;
  condition: string;
  adjustment: number; // Percentage
  type: "increase" | "decrease";
}

// Credit Limit History
export interface CreditLimitHistory {
  id: string;
  action: "increased" | "decreased" | "blocked" | "unblocked" | "reviewed";
  previousLimit: number;
  newLimit: number;
  reason: string;
  adjustedBy: string;
  adjustedAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

// Late Payment Alert
export interface LatePaymentAlert {
  id: string;
  invoiceId: string;
  franchiseeId: string;
  corporateId: string;
  tenantId: string;

  // Alert details
  daysOverdue: number;
  overdueAmount: number;
  totalOutstanding: number;

  // Alert configuration
  alertLevel: 1 | 2 | 3 | 4 | 5; // Escalation levels
  alertType: "reminder" | "warning" | "final_notice" | "collection";

  // Communication
  notificationsSent: LatePaymentNotification[];
  callsMade: LatePaymentCall[];

  // Status
  status: "active" | "resolved" | "escalated" | "written_off";
  resolution?: LatePaymentResolution;

  // Timing
  nextActionDate: string;
  escalationDate?: string;

  createdAt: string;
  updatedAt: string;
}

// Late Payment Notification
export interface LatePaymentNotification {
  id: string;
  type: "email" | "sms" | "letter" | "legal_notice";
  sentAt: string;
  sentTo: string;
  content: string;
  deliveryStatus: "sent" | "delivered" | "failed" | "bounced";
  response?: string;
}

// Late Payment Call
export interface LatePaymentCall {
  id: string;
  calledAt: string;
  calledBy: string;
  duration: number;
  outcome: "no_answer" | "busy" | "answered" | "voicemail";
  notes: string;
  followUpRequired: boolean;
  followUpDate?: string;
}

// Late Payment Resolution
export interface LatePaymentResolution {
  type: "paid" | "payment_plan" | "discount" | "write_off" | "legal_action";
  resolvedAt: string;
  resolvedBy: string;
  amount: number;
  terms?: string;
  notes: string;
}

// Payment Analytics
export interface PaymentAnalytics {
  tenantId: string;
  franchiseeId?: string;
  corporateId?: string;

  // Period
  period: {
    startDate: string;
    endDate: string;
  };

  // Volume metrics
  totalTransactions: number;
  totalAmount: number;
  averageAmount: number;

  // Success metrics
  successfulTransactions: number;
  successRate: number;
  failedTransactions: number;
  failureRate: number;

  // Gateway metrics
  gatewayBreakdown: Record<PaymentGateway, GatewayMetrics>;

  // Reconciliation metrics
  autoReconciledCount: number;
  manualReconciledCount: number;
  pendingReconciliation: number;
  reconciliationRate: number;

  // Credit metrics
  creditUtilization: number;
  averageCreditDays: number;
  overduePayments: number;
  overdueAmount: number;

  // Collection metrics
  collectionEfficiency: number;
  averageCollectionDays: number;
  badDebtPercentage: number;

  // Trends
  dailyTrends: DailyPaymentTrend[];
  monthlyTrends: MonthlyPaymentTrend[];
}

// Gateway Metrics
export interface GatewayMetrics {
  transactionCount: number;
  totalAmount: number;
  successRate: number;
  averageProcessingTime: number;
  totalFees: number;
  uptime: number;
}

// Daily Payment Trend
export interface DailyPaymentTrend {
  date: string;
  transactionCount: number;
  amount: number;
  successRate: number;
}

// Monthly Payment Trend
export interface MonthlyPaymentTrend {
  month: string;
  transactionCount: number;
  amount: number;
  successRate: number;
  averageAmount: number;
}

// Payment Filters
export interface PaymentFilters {
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  status?: PaymentWorkflowStatus[];
  gateway?: PaymentGateway[];
  franchisees?: string[];
  amountRange?: {
    min: number;
    max: number;
  };
  reconciliationStatus?: ReconciliationStatus[];
  paymentMethod?: PaymentMethod[];
}

// UPI Integration Types
export interface UPITransaction {
  id: string;
  upiId: string;
  vpa: string;
  amount: number;
  currency: Currency;
  transactionId: string;
  utr: string;
  status: "success" | "failed" | "pending";
  timestamp: string;
  merchantTransactionId: string;
}

// NEFT/RTGS Integration Types
export interface BankTransfer {
  id: string;
  type: "neft" | "rtgs" | "imps";
  amount: number;
  currency: Currency;
  beneficiaryAccount: string;
  beneficiaryIfsc: string;
  utr: string;
  status: "initiated" | "processed" | "completed" | "failed";
  timestamp: string;
  charges: number;
}
