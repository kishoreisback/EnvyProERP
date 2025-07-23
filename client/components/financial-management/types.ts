// Unified Financial Management Types - Consolidating Finance + Accounting + Payment Gateway

// Base financial configuration
export interface FinancialTenant {
  id: string;
  name: string;
  legalName: string;
  industryType:
    | "construction"
    | "real_estate"
    | "technology"
    | "manufacturing"
    | "retail";
  baseCurrency: Currency;
  fiscalYearStart: string;
  configuration: FinancialConfiguration;
}

export interface FinancialConfiguration {
  id: string;
  tenantId: string;
  companyName: string;
  legalName: string;
  industryType: string;
  baseCurrency: Currency;
  functionalCurrency: Currency;
  reportingCurrency: Currency;
  fiscalYearStart: number;
  fiscalYearEnd: number;
  currentFiscalYear: string;
  accountingStandard: "ind_as" | "ifrs" | "gaap" | "local";
  chartOfAccountsTemplate: string;
  accountCodeFormat: string;
  autoNumbering: {
    journalEntries: boolean;
    invoices: boolean;
    receipts: boolean;
    payments: boolean;
    budgets: boolean;
  };
  workflows: {
    transactionApproval: boolean;
    budgetApproval: boolean;
    paymentApproval: boolean;
    invoiceApproval: boolean;
  };
  integrations: {
    paymentGateways: PaymentGatewayConfig[];
    bankConnections: BankConnectionConfig[];
    taxSystems: TaxSystemConfig[];
  };
}

// Common types
export type Currency = "INR" | "USD" | "EUR" | "GBP" | "AUD" | "CAD";

export type TransactionStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled";

// Chart of Accounts
export interface ChartOfAccount {
  id: string;
  tenantId: string;
  accountCode: string;
  accountName: string;
  accountType: AccountType;
  parentAccountId?: string;
  level: number;
  isActive: boolean;
  currentBalance: number;
  openingBalance: number;
  currency: Currency;
  allowDirectPosting: boolean;
  isBankAccount: boolean;
  isCashAccount: boolean;
  isControlAccount: boolean;
  bankDetails?: BankAccountDetails;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export type AccountType =
  | "assets"
  | "liabilities"
  | "equity"
  | "revenue"
  | "expenses"
  | "cost_of_goods_sold";

export interface BankAccountDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  swiftCode?: string;
  routingNumber?: string;
  accountType: "savings" | "current" | "overdraft" | "loan";
}

// Transactions
export interface FinancialTransaction {
  id: string;
  tenantId: string;
  transactionNumber: string;
  date: string;
  type: TransactionType;
  reference: string;
  description: string;
  totalAmount: number;
  currency: Currency;
  exchangeRate?: number;
  journalEntries: JournalEntry[];
  attachments: TransactionAttachment[];
  status: TransactionStatus;
  approvalLevel: number;
  approvedBy?: string;
  approvedAt?: string;
  sourceModule:
    | "manual"
    | "crm"
    | "hrms"
    | "inventory"
    | "projects"
    | "api"
    | "payment_gateway";
  sourceReference?: string;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
  departmentId?: string;
  projectId?: string;
  customFields?: Record<string, any>;
}

export type TransactionType =
  | "journal_entry"
  | "payment"
  | "receipt"
  | "invoice"
  | "credit_note"
  | "debit_note"
  | "bank_transfer"
  | "upi_payment"
  | "gateway_payment";

export interface JournalEntry {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  debitAmount: number;
  creditAmount: number;
  description: string;
  referenceId?: string;
  costCenterId?: string;
  projectId?: string;
}

export interface TransactionAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
}

// Invoices
export interface Invoice {
  id: string;
  tenantId: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  customerId: string;
  customerName: string;
  customerAddress: Address;
  companyDetails: CompanyDetails;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
  paidAmount: number;
  balanceAmount: number;
  currency: Currency;
  status: InvoiceStatus;
  paymentTerms: number;
  notes?: string;
  termsAndConditions?: string;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
  attachments: TransactionAttachment[];
  paymentHistory: PaymentRecord[];
}

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "paid"
  | "partially_paid"
  | "overdue"
  | "cancelled";

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  taxRate: number;
  taxAmount: number;
  discountPercentage: number;
  discountAmount: number;
  lineTotal: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface CompanyDetails {
  name: string;
  legalName: string;
  address: Address;
  phone: string;
  email: string;
  website?: string;
  taxId: string;
  registrationNumber?: string;
  logo?: string;
}

// Budget Management
export interface Budget {
  id: string;
  tenantId: string;
  budgetName: string;
  fiscalYear: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  currency: Currency;
  status: BudgetStatus;
  budgetItems: BudgetItem[];
  approvalWorkflow: BudgetApprovalWorkflow;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export type BudgetStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "active"
  | "closed"
  | "cancelled";

export interface BudgetItem {
  id: string;
  accountId: string;
  accountName: string;
  budgetedAmount: number;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  varianceAmount: number;
  variancePercentage: number;
  quarter1Budget: number;
  quarter2Budget: number;
  quarter3Budget: number;
  quarter4Budget: number;
}

export interface BudgetApprovalWorkflow {
  currentLevel: number;
  maxLevel: number;
  approvers: BudgetApprover[];
  status: "pending" | "approved" | "rejected";
}

export interface BudgetApprover {
  level: number;
  userId: string;
  userName: string;
  status: "pending" | "approved" | "rejected";
  approvedAt?: string;
  comments?: string;
}

// Payment Gateway Integration
export interface PaymentGatewayConfig {
  id: string;
  gatewayName: PaymentGateway;
  isActive: boolean;
  credentials: {
    merchantId: string;
    apiKey: string;
    secretKey: string;
    webhookSecret: string;
    environment: "sandbox" | "production";
  };
  supportedMethods: PaymentMethod[];
  transactionFees: GatewayFee[];
  settingsConfiguration: Record<string, any>;
}

export type PaymentGateway =
  | "razorpay"
  | "payu"
  | "cashfree"
  | "stripe"
  | "paypal"
  | "phonepe"
  | "paytm";

export type PaymentMethod =
  | "credit_card"
  | "debit_card"
  | "net_banking"
  | "upi"
  | "wallet"
  | "emi"
  | "bank_transfer";

export interface GatewayFee {
  method: PaymentMethod;
  feeType: "percentage" | "fixed" | "mixed";
  feeValue: number;
  additionalCharges?: number;
}

export interface PaymentTransaction {
  id: string;
  tenantId: string;
  transactionId: string;
  gatewayTransactionId: string;
  invoiceId?: string;
  customerId: string;
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  gateway: PaymentGateway;
  status: PaymentStatus;
  gatewayResponse: GatewayResponse;
  failureReason?: string;
  refundAmount?: number;
  refundStatus?: RefundStatus;
  merchantReference: string;
  customerReference?: string;
  paymentDate: string;
  settlementDate?: string;
  fees: {
    gatewayFee: number;
    gst: number;
    totalDeduction: number;
    netAmount: number;
  };
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export type PaymentStatus =
  | "initiated"
  | "pending"
  | "processing"
  | "success"
  | "failed"
  | "cancelled"
  | "refunded"
  | "partially_refunded";

export type RefundStatus = "initiated" | "processing" | "success" | "failed";

export interface GatewayResponse {
  status: string;
  message: string;
  errorCode?: string;
  errorDescription?: string;
  gatewayTransactionId: string;
  additionalData?: Record<string, any>;
}

export interface PaymentRecord {
  id: string;
  paymentDate: string;
  amount: number;
  paymentMethod: PaymentMethod;
  gateway?: PaymentGateway;
  transactionId: string;
  status: PaymentStatus;
  reference: string;
  createdBy: string;
}

// Bank Integration
export interface BankConnectionConfig {
  id: string;
  bankName: string;
  connectionType: "api" | "file_upload" | "manual";
  isActive: boolean;
  credentials?: {
    clientId: string;
    clientSecret: string;
    environment: "sandbox" | "production";
  };
  accountMappings: BankAccountMapping[];
}

export interface BankAccountMapping {
  bankAccountNumber: string;
  chartOfAccountId: string;
  accountName: string;
  isActive: boolean;
}

// Tax Configuration
export interface TaxSystemConfig {
  id: string;
  taxSystemName: string;
  isActive: boolean;
  taxRates: TaxRate[];
  complianceSettings: TaxComplianceSettings;
}

export interface TaxRate {
  id: string;
  taxName: string;
  rate: number;
  applicableFrom: string;
  applicableTo?: string;
  isActive: boolean;
}

export interface TaxComplianceSettings {
  gstEnabled: boolean;
  tdsEnabled: boolean;
  autoCalculation: boolean;
  complianceReporting: boolean;
}

// Analytics and Reporting
export interface FinancialAnalytics {
  tenantId: string;
  period: string;
  kpis: FinancialKPIs;
  ratios: FinancialRatios;
  trends: FinancialTrends;
  cashFlowAnalysis: CashFlowAnalysis;
  profitLossAnalysis: ProfitLossAnalysis;
  balanceSheetAnalysis: BalanceSheetAnalysis;
}

export interface FinancialKPIs {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  grossMargin: number;
  operatingMargin: number;
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  cashPosition: number;
  accountsReceivable: number;
  accountsPayable: number;
  outstandingInvoices: number;
  overdueInvoices: number;
}

export interface FinancialRatios {
  currentRatio: number;
  quickRatio: number;
  debtToEquityRatio: number;
  returnOnAssets: number;
  returnOnEquity: number;
  grossProfitMargin: number;
  netProfitMargin: number;
  assetTurnoverRatio: number;
  receivablesTurnover: number;
  payablesTurnover: number;
}

export interface FinancialTrends {
  revenueGrowth: number;
  expenseGrowth: number;
  profitGrowth: number;
  cashFlowTrend: number;
  monthlyComparisons: MonthlyComparison[];
}

export interface MonthlyComparison {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  cashFlow: number;
}

export interface CashFlowAnalysis {
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  netCashFlow: number;
  cashFlowProjection: CashFlowProjection[];
}

export interface CashFlowProjection {
  month: string;
  projectedInflow: number;
  projectedOutflow: number;
  netCashFlow: number;
  cumulativeCashFlow: number;
}

export interface ProfitLossAnalysis {
  totalRevenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  operatingExpenses: number;
  operatingIncome: number;
  otherIncome: number;
  otherExpenses: number;
  netIncome: number;
  categoryBreakdown: CategoryBreakdown[];
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  trend: number;
}

export interface BalanceSheetAnalysis {
  totalAssets: number;
  currentAssets: number;
  nonCurrentAssets: number;
  totalLiabilities: number;
  currentLiabilities: number;
  nonCurrentLiabilities: number;
  totalEquity: number;
  retainedEarnings: number;
  assetBreakdown: AssetBreakdown[];
  liabilityBreakdown: LiabilityBreakdown[];
}

export interface AssetBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface LiabilityBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

// Audit and Compliance
export interface FinancialAuditTrail {
  id: string;
  tenantId: string;
  entityType: string;
  entityId: string;
  action: "create" | "update" | "delete" | "approve" | "reject";
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  performedBy: string;
  performedAt: string;
  ipAddress: string;
  userAgent: string;
  reason?: string;
}

export interface ComplianceReport {
  id: string;
  tenantId: string;
  reportType: "gst" | "tds" | "annual" | "quarterly" | "custom";
  period: string;
  status: "draft" | "generated" | "filed" | "submitted";
  generatedBy: string;
  generatedAt: string;
  filedAt?: string;
  data: Record<string, any>;
  attachments: TransactionAttachment[];
}
