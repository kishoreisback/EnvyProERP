// Invoice & Financial Integration Types
// Integration with existing PO, Delivery, and Finance modules

import { Currency, Address, PaymentMethod, PaymentStatus } from "./types";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceType: InvoiceType;

  // Multi-tenant context
  tenantId: string;
  corporateId: string;
  franchiseeId: string;

  // Related documents
  poId: string;
  poNumber: string;
  challanIds: string[];
  grnIds: string[];
  deliveryIds: string[];

  // Invoice details
  issueDate: string;
  dueDate: string;
  billingPeriod?: {
    startDate: string;
    endDate: string;
  };

  // Parties
  billFrom: InvoiceParty;
  billTo: InvoiceParty;
  shipTo?: InvoiceParty;

  // Items & Calculations
  items: InvoiceItem[];
  subtotal: number;
  totalDiscount: number;
  totalTaxableAmount: number;
  totalTax: number;
  totalAmount: number;
  roundingAdjustment: number;
  grandTotal: number;

  // GST Compliance
  gstDetails: GSTDetails;
  hsn: HSNDetails[];

  // Payment tracking
  paymentStatus: PaymentStatus;
  paymentTerms: string;
  paidAmount: number;
  balanceAmount: number;
  payments: InvoicePayment[];

  // Status & Workflow
  status: InvoiceStatus;
  workflow: InvoiceWorkflow;

  // Partial shipment support
  isPartialInvoice: boolean;
  partialInvoiceSequence?: number;
  totalPartialInvoices?: number;
  parentInvoiceId?: string;

  // Documents & Attachments
  attachments: InvoiceAttachment[];
  digitalSignature?: DigitalSignature;

  // Audit & Compliance
  auditTrail: InvoiceAuditEvent[];
  complianceChecks: ComplianceCheck[];

  // Integration references
  sourceModule:
    | "po_fulfillment"
    | "delivery_confirmation"
    | "manual"
    | "recurring";
  automationRules?: AutomationRule[];

  // Notes & Terms
  notes?: string;
  termsAndConditions?: string;
  additionalCharges?: AdditionalCharge[];

  // Metadata
  createdAt: string;
  createdBy: string;
  lastModified: string;
  modifiedBy: string;
  sentAt?: string;
  viewedAt?: string;
  acknowledgedAt?: string;
}

export type InvoiceType =
  | "tax_invoice" // Standard GST invoice
  | "bill_of_supply" // Non-GST registered suppliers
  | "export_invoice" // Export transactions
  | "debit_note" // Additional charges
  | "credit_note" // Returns/adjustments
  | "proforma_invoice" // Quotation/estimate
  | "advance_receipt" // Advance payment receipt
  | "revised_invoice"; // Corrected invoice

export type InvoiceStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "sent"
  | "viewed"
  | "acknowledged"
  | "partially_paid"
  | "paid"
  | "overdue"
  | "disputed"
  | "cancelled"
  | "refunded";

export interface InvoiceParty {
  id: string;
  name: string;
  legalName?: string;
  type: "corporate" | "franchisee" | "supplier" | "customer";

  // Contact information
  email: string;
  phone: string;
  website?: string;

  // Address
  address: Address;

  // GST & Tax details
  gstNumber?: string;
  panNumber?: string;
  tanNumber?: string;
  cinNumber?: string;
  msmeNumber?: string;

  // Banking details
  bankDetails?: BankDetails;

  // Business details
  businessType: "individual" | "partnership" | "company" | "llp" | "huf";
  industryType?: string;
}

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  accountType: "savings" | "current" | "overdraft";
}

export interface InvoiceItem {
  id: string;
  lineNumber: number;

  // Product information
  productId: string;
  sku: string;
  productName: string;
  description: string;
  category: string;
  unit: string;

  // HSN & Tax classification
  hsnCode: string;
  sacCode?: string;
  taxCategory: "taxable" | "exempt" | "zero_rated" | "nil_rated";

  // Quantity & Pricing
  quantity: number;
  deliveredQuantity: number;
  pendingQuantity: number;
  unitPrice: number;
  grossAmount: number;

  // Discounts
  discountType: "percentage" | "amount";
  discountValue: number;
  discountAmount: number;
  netAmount: number;

  // Tax calculation
  taxableAmount: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  cessRate?: number;
  cessAmount?: number;
  totalTaxAmount: number;
  totalAmount: number;

  // Delivery reference
  deliveryId?: string;
  grnId?: string;
  batchNumber?: string;
  expiryDate?: string;
  manufacturingDate?: string;

  // Status
  itemStatus: "pending" | "delivered" | "partial" | "cancelled";
  remarks?: string;
}

export interface GSTDetails {
  isGSTApplicable: boolean;
  gstRegistration: GSTRegistration;
  placeOfSupply: string;
  stateCode: string;
  supplyType: "intrastate" | "interstate" | "export" | "import";
  reverseCharge: boolean;

  // Tax summary
  totalCGST: number;
  totalSGST: number;
  totalIGST: number;
  totalCESS: number;
  totalTax: number;

  // Compliance
  eWayBillRequired: boolean;
  eWayBillNumber?: string;
  eInvoiceRequired: boolean;
  eInvoiceIRN?: string;
  eInvoiceAckNumber?: string;
  eInvoiceAckDate?: string;
  qrCode?: string;
}

export interface GSTRegistration {
  gstNumber: string;
  registrationType:
    | "regular"
    | "composition"
    | "casual"
    | "non_resident"
    | "unregistered";
  registrationDate: string;
  validUntil?: string;
  isActive: boolean;
}

export interface HSNDetails {
  hsnCode: string;
  description: string;
  taxableAmount: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  totalTaxAmount: number;
}

export interface InvoicePayment {
  id: string;
  invoiceId: string;
  paymentDate: string;
  amount: number;
  paymentMethod: PaymentMethod;
  reference: string;
  bankReference?: string;
  utrNumber?: string;
  chequeNumber?: string;
  chequeDate?: string;
  notes?: string;
  status: "pending" | "cleared" | "bounced" | "cancelled";
  processedBy: string;
  processedAt: string;
}

export interface InvoiceWorkflow {
  currentStage: WorkflowStage;
  stages: WorkflowStageHistory[];
  approvals: InvoiceApproval[];
  escalations: WorkflowEscalation[];
  autoActions: AutomationAction[];
}

export type WorkflowStage =
  | "created"
  | "pending_approval"
  | "approved"
  | "sent_to_customer"
  | "payment_pending"
  | "payment_received"
  | "completed"
  | "cancelled";

export interface WorkflowStageHistory {
  stage: WorkflowStage;
  enteredAt: string;
  exitedAt?: string;
  duration?: number;
  processedBy?: string;
  notes?: string;
  automationTriggered?: string[];
}

export interface InvoiceApproval {
  id: string;
  level: number;
  approverId: string;
  approverName: string;
  approverRole: string;
  status: "pending" | "approved" | "rejected" | "delegated";
  thresholdAmount?: number;
  responseTime?: number;
  responseAt?: string;
  comments?: string;
  conditions?: string[];
}

export interface WorkflowEscalation {
  id: string;
  triggeredAt: string;
  triggeredBy: "timeout" | "amount_threshold" | "manual";
  escalatedTo: string;
  reason: string;
  resolvedAt?: string;
  resolution?: string;
}

export interface AutomationAction {
  id: string;
  trigger: string;
  action: string;
  executedAt: string;
  result: "success" | "failed" | "skipped";
  details?: string;
}

export interface InvoiceAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  downloadUrl: string;
  category:
    | "po_copy"
    | "delivery_challan"
    | "grn"
    | "transport_document"
    | "other";
  uploadedBy: string;
  uploadedAt: string;
  isRequired: boolean;
  verificationStatus?: "pending" | "verified" | "rejected";
}

export interface DigitalSignature {
  signedBy: string;
  signedAt: string;
  signatureHash: string;
  certificateDetails: {
    issuer: string;
    validFrom: string;
    validTo: string;
    serialNumber: string;
  };
  verificationStatus: "valid" | "invalid" | "expired";
}

export interface InvoiceAuditEvent {
  id: string;
  eventType:
    | "created"
    | "modified"
    | "sent"
    | "paid"
    | "cancelled"
    | "approved"
    | "rejected";
  eventDate: string;
  userId: string;
  userName: string;
  details: string;
  beforeState?: any;
  afterState?: any;
  ipAddress?: string;
  userAgent?: string;
}

export interface ComplianceCheck {
  checkType:
    | "gst_validation"
    | "hsn_verification"
    | "due_date_check"
    | "amount_limit"
    | "document_completeness";
  status: "passed" | "failed" | "warning";
  message: string;
  checkedAt: string;
  details?: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
}

export interface RuleCondition {
  field: string;
  operator: "equals" | "greater_than" | "less_than" | "contains";
  value: any;
}

export interface RuleAction {
  type:
    | "send_email"
    | "create_notification"
    | "update_status"
    | "schedule_reminder";
  parameters: Record<string, any>;
}

export interface AdditionalCharge {
  id: string;
  chargeType:
    | "freight"
    | "packing"
    | "handling"
    | "insurance"
    | "loading"
    | "other";
  description: string;
  amount: number;
  taxable: boolean;
  hsnCode?: string;
  taxRate?: number;
  taxAmount?: number;
}

// Invoice management and search interfaces
export interface InvoiceFilters {
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  status?: InvoiceStatus[];
  paymentStatus?: PaymentStatus[];
  invoiceType?: InvoiceType[];
  franchiseeIds?: string[];
  amountRange?: {
    min: number;
    max: number;
  };
  dueDateRange?: {
    startDate: string;
    endDate: string;
  };
  searchText?: string;
  overdue?: boolean;
  partialInvoices?: boolean;
}

export interface InvoiceSortOptions {
  field:
    | "invoiceNumber"
    | "issueDate"
    | "dueDate"
    | "amount"
    | "status"
    | "paymentStatus";
  direction: "asc" | "desc";
}

// Invoice analytics and reporting
export interface InvoiceAnalytics {
  period: {
    startDate: string;
    endDate: string;
  };

  // Summary metrics
  totalInvoices: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;

  // Performance metrics
  averagePaymentDays: number;
  onTimePaymentRate: number;
  disputeRate: number;
  averageInvoiceValue: number;

  // GST analytics
  totalGSTCollected: number;
  monthlyGSTLiability: number;

  // Trends
  monthlyTrends: MonthlyInvoiceTrend[];
  paymentTrends: PaymentTrend[];
  franchiseePerformance: FranchiseeInvoiceMetrics[];

  // Aging analysis
  agingBuckets: AgingBucket[];

  // Top insights
  topPayingFranchisees: TopMetric[];
  slowPayingFranchisees: TopMetric[];
  highValueInvoices: TopMetric[];
}

export interface MonthlyInvoiceTrend {
  month: string;
  invoiceCount: number;
  totalAmount: number;
  paidAmount: number;
  averagePaymentDays: number;
}

export interface PaymentTrend {
  date: string;
  paymentsReceived: number;
  amount: number;
  onTimePayments: number;
  latePayments: number;
}

export interface FranchiseeInvoiceMetrics {
  franchiseeId: string;
  franchiseeName: string;
  totalInvoices: number;
  totalAmount: number;
  paidAmount: number;
  averagePaymentDays: number;
  overdueAmount: number;
  paymentScore: number;
}

export interface AgingBucket {
  range: string;
  invoiceCount: number;
  totalAmount: number;
  percentage: number;
}

export interface TopMetric {
  id: string;
  name: string;
  value: number;
  metric: string;
}

// Invoice generation templates and settings
export interface InvoiceTemplate {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  templateType:
    | "standard"
    | "proforma"
    | "tax_invoice"
    | "credit_note"
    | "debit_note";

  // Design settings
  layout: "portrait" | "landscape";
  fontSize: "small" | "medium" | "large";
  colorScheme: string;
  logo?: string;
  watermark?: string;

  // Field configuration
  headerFields: TemplateField[];
  itemFields: TemplateField[];
  footerFields: TemplateField[];

  // Terms and conditions
  defaultTerms: string;
  paymentInstructions: string;

  // Automation settings
  autoGenerate: boolean;
  autoSend: boolean;
  reminderSchedule: ReminderSchedule[];

  // Compliance settings
  includeGSTDetails: boolean;
  includeHSNDetails: boolean;
  includeEInvoiceQR: boolean;

  // Metadata
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  lastUsed?: string;
}

export interface TemplateField {
  fieldName: string;
  displayName: string;
  isVisible: boolean;
  isRequired: boolean;
  width?: string;
  alignment?: "left" | "center" | "right";
  format?: string;
}

export interface ReminderSchedule {
  daysBefore: number;
  reminderType: "email" | "sms" | "whatsapp" | "notification";
  template: string;
  isActive: boolean;
}

// Invoice integration with other modules
export interface POInvoiceMapping {
  poId: string;
  invoiceIds: string[];
  fullyInvoiced: boolean;
  partialInvoices: PartialInvoiceInfo[];
  pendingAmount: number;
  invoicedAmount: number;
}

export interface PartialInvoiceInfo {
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  items: string[];
  deliveryIds: string[];
  percentage: number;
}

export interface DeliveryInvoiceMapping {
  deliveryId: string;
  invoiceId: string;
  invoiceStatus: InvoiceStatus;
  mappedItems: DeliveryItemMapping[];
}

export interface DeliveryItemMapping {
  deliveryItemId: string;
  invoiceItemId: string;
  quantityInvoiced: number;
  amountInvoiced: number;
}

// Due tracking and collections
export interface PaymentDueTracker {
  invoiceId: string;
  franchiseeId: string;
  dueAmount: number;
  originalDueDate: string;
  daysPastDue: number;
  riskCategory: "low" | "medium" | "high" | "critical";

  // Collection activities
  remindersSent: ReminderActivity[];
  collectionCalls: CollectionCall[];
  collectionNotes: CollectionNote[];

  // Payment promises
  paymentPromises: PaymentPromise[];

  // Escalation
  escalationLevel: number;
  assignedCollector?: string;
  legalNoticeIssued?: boolean;

  // Resolution
  resolutionStatus: "active" | "resolved" | "written_off" | "disputed";
  resolutionDate?: string;
  resolutionAmount?: number;
}

export interface ReminderActivity {
  id: string;
  reminderType: "auto" | "manual";
  channel: "email" | "sms" | "whatsapp" | "call";
  sentAt: string;
  template: string;
  response?: string;
  responseAt?: string;
}

export interface CollectionCall {
  id: string;
  calledAt: string;
  calledBy: string;
  duration: number;
  outcome:
    | "contacted"
    | "no_answer"
    | "busy"
    | "wrong_number"
    | "promised_payment";
  notes: string;
  followUpDate?: string;
}

export interface CollectionNote {
  id: string;
  noteDate: string;
  noteBy: string;
  category:
    | "payment_discussion"
    | "dispute"
    | "partial_payment"
    | "promise"
    | "other";
  note: string;
  priority: "low" | "medium" | "high";
}

export interface PaymentPromise {
  id: string;
  promiseDate: string;
  promisedAmount: number;
  promisedBy: string;
  promiseMethod: "email" | "phone" | "written";
  fulfilled: boolean;
  fulfilledAt?: string;
  actualAmount?: number;
  notes?: string;
}
