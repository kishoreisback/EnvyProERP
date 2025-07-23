// Enhanced Finance module types with complete multi-tenant support

// Core financial entities
export interface TenantFinancialAccount {
  id: string;
  tenantId: string;
  accountCode: string;
  accountName: string;
  accountType: AccountType;
  parentAccountId?: string;
  level: number;
  isActive: boolean;

  // Balance information
  currentBalance: number;
  openingBalance: number;
  currency: Currency;

  // Account configuration
  allowDirectPosting: boolean;
  isBankAccount: boolean;
  isCashAccount: boolean;
  isControlAccount: boolean;

  // Bank account details
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    swiftCode?: string;
    routingNumber?: string;
  };

  // Audit trail
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;

  // Multi-tenant security
  visibility: "public" | "private" | "department";
  accessControls: string[]; // Role/user IDs with access
}

export type AccountType =
  | "assets"
  | "liabilities"
  | "equity"
  | "revenue"
  | "expenses"
  | "cost_of_goods_sold";

export type Currency = "INR" | "USD" | "EUR" | "GBP" | "AUD" | "CAD";

export interface TenantTransaction {
  id: string;
  tenantId: string;
  transactionNumber: string;

  // Transaction details
  date: string;
  type: TransactionType;
  reference: string;
  description: string;
  totalAmount: number;
  currency: Currency;
  exchangeRate?: number;

  // Journal entries
  journalEntries: JournalEntry[];

  // Document attachments
  attachments: TransactionAttachment[];

  // Approval workflow
  status: TransactionStatus;
  approvalLevel: number;
  approvedBy?: string;
  approvedAt?: string;

  // Integration
  sourceModule: "manual" | "crm" | "hrms" | "inventory" | "projects" | "api";
  sourceReference?: string;

  // Audit trail
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;

  // Multi-tenant fields
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
  | "adjustment"
  | "depreciation"
  | "accrual"
  | "reversal";

export type TransactionStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "posted"
  | "cancelled"
  | "reversed";

export interface JournalEntry {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  debitAmount: number;
  creditAmount: number;
  description: string;
  projectId?: string;
  departmentId?: string;
  costCenterId?: string;
}

export interface TransactionAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
}

// Invoice management
export interface TenantInvoice {
  id: string;
  tenantId: string;
  invoiceNumber: string;

  // Customer information
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  billingAddress: Address;
  shippingAddress?: Address;

  // Invoice details
  issueDate: string;
  dueDate: string;
  paymentTerms: string;
  currency: Currency;
  exchangeRate?: number;

  // Line items
  lineItems: InvoiceLineItem[];

  // Totals
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;

  // Status and tracking
  status: InvoiceStatus;
  paymentStatus: PaymentStatus;

  // Tax information
  taxConfiguration: TaxConfiguration;

  // Project/job reference
  projectId?: string;
  jobReference?: string;

  // Payment tracking
  payments: InvoicePayment[];

  // Notes and terms
  notes?: string;
  termsAndConditions?: string;

  // Recurring invoice
  isRecurring: boolean;
  recurringConfig?: RecurringConfig;

  // Audit trail
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;

  // Integration
  sourceModule?: "crm" | "projects" | "manual";
  sourceReference?: string;
}

export type InvoiceStatus =
  | "draft"
  | "pending"
  | "sent"
  | "viewed"
  | "partially_paid"
  | "paid"
  | "overdue"
  | "cancelled"
  | "refunded";

export type PaymentStatus =
  | "unpaid"
  | "partially_paid"
  | "paid"
  | "overdue"
  | "cancelled";

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;

  // Item details
  itemCode?: string;
  itemCategory?: string;

  // Project tracking
  projectId?: string;
  taskId?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface TaxConfiguration {
  taxType: "inclusive" | "exclusive";
  defaultTaxRate: number;
  taxBreakdown: TaxBreakdown[];
}

export interface TaxBreakdown {
  taxName: string;
  taxRate: number;
  taxAmount: number;
}

export interface InvoicePayment {
  id: string;
  paymentDate: string;
  amount: number;
  paymentMethod: PaymentMethod;
  reference: string;
  notes?: string;
  transactionId?: string;
}

export type PaymentMethod =
  | "cash"
  | "bank_transfer"
  | "credit_card"
  | "debit_card"
  | "check"
  | "online"
  | "upi"
  | "wallet";

export interface RecurringConfig {
  frequency: "weekly" | "monthly" | "quarterly" | "annually";
  interval: number;
  endDate?: string;
  nextInvoiceDate: string;
  autoSend: boolean;
}

// Budget management
export interface TenantBudget {
  id: string;
  tenantId: string;
  name: string;
  description: string;

  // Budget period
  startDate: string;
  endDate: string;
  fiscalYear: string;

  // Budget structure
  budgetItems: BudgetItem[];

  // Approval and status
  status: BudgetStatus;
  version: number;
  approvedBy?: string;
  approvedAt?: string;

  // Tracking
  totalBudget: number;
  totalActual: number;
  totalCommitted: number;
  totalAvailable: number;

  // Department/project allocation
  departmentId?: string;
  projectId?: string;

  // Audit trail
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
  accountCode: string;
  accountName: string;

  // Budget amounts
  budgetAmount: number;
  actualAmount: number;
  committedAmount: number;
  variance: number;
  variancePercentage: number;

  // Monthly breakdown
  monthlyBudget: MonthlyBudget[];

  // Notes and justification
  notes?: string;
  justification?: string;
}

export interface MonthlyBudget {
  month: string;
  budgetAmount: number;
  actualAmount: number;
  variance: number;
}

// Cash flow management
export interface TenantCashFlow {
  id: string;
  tenantId: string;

  // Period information
  startDate: string;
  endDate: string;

  // Cash flow categories
  operatingActivities: CashFlowCategory[];
  investingActivities: CashFlowCategory[];
  financingActivities: CashFlowCategory[];

  // Totals
  netOperatingCashFlow: number;
  netInvestingCashFlow: number;
  netFinancingCashFlow: number;
  netCashFlow: number;

  // Cash position
  openingCashBalance: number;
  closingCashBalance: number;

  // Projections
  projectedCashFlow: CashFlowProjection[];

  // Audit trail
  generatedBy: string;
  generatedAt: string;
}

export interface CashFlowCategory {
  name: string;
  amount: number;
  accounts: string[];
}

export interface CashFlowProjection {
  date: string;
  projectedInflow: number;
  projectedOutflow: number;
  netCashFlow: number;
  cumulativeCashFlow: number;
}

// Financial reports
export interface TenantFinancialReport {
  id: string;
  tenantId: string;
  reportType: ReportType;
  reportName: string;

  // Report period
  startDate: string;
  endDate: string;

  // Report data
  reportData: any;

  // Report configuration
  includeComparatives: boolean;
  comparativePeriod?: string;
  includeNotes: boolean;
  reportFormat: "summary" | "detailed";

  // Audit trail
  generatedBy: string;
  generatedAt: string;

  // Sharing
  sharedWith: string[];
  isPublic: boolean;
}

export type ReportType =
  | "profit_loss"
  | "balance_sheet"
  | "cash_flow"
  | "trial_balance"
  | "aged_receivables"
  | "aged_payables"
  | "budget_variance"
  | "general_ledger"
  | "project_profitability"
  | "department_performance";

// Tax management
export interface TenantTaxConfiguration {
  id: string;
  tenantId: string;

  // Basic tax settings
  taxSystem: "GST" | "VAT" | "SALES_TAX" | "CUSTOM";
  defaultCurrency: Currency;

  // Tax rates
  taxRates: TaxRate[];

  // Tax periods
  taxPeriods: TaxPeriod[];

  // Filing requirements
  filingRequirements: FilingRequirement[];

  // Compliance settings
  autoCalculateTax: boolean;
  taxRounding: "round" | "truncate" | "round_up";

  // Audit trail
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export interface TaxRate {
  id: string;
  name: string;
  rate: number;
  isActive: boolean;
  effectiveFrom: string;
  effectiveTo?: string;
  applicableAccounts: string[];
}

export interface TaxPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  filingDueDate: string;
  status: "open" | "closed" | "filed";
}

export interface FilingRequirement {
  id: string;
  name: string;
  frequency: "monthly" | "quarterly" | "annually";
  dueDate: string;
  isRequired: boolean;
}

// Financial analytics
export interface TenantFinancialAnalytics {
  tenantId: string;
  period: {
    startDate: string;
    endDate: string;
  };

  // Core metrics
  profitabilityMetrics: ProfitabilityMetrics;
  liquidityMetrics: LiquidityMetrics;
  efficiencyMetrics: EfficiencyMetrics;
  leverageMetrics: LeverageMetrics;

  // Industry-specific metrics
  industryMetrics: IndustryMetrics;

  // Trends and forecasting
  trends: TrendAnalysis;
  forecasts: FinancialForecast[];

  // Benchmarking
  benchmarks: BenchmarkComparison[];

  // Alerts and insights
  alerts: FinancialAlert[];
  insights: FinancialInsight[];
}

export interface ProfitabilityMetrics {
  grossProfitMargin: number;
  netProfitMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
  ebitdaMargin: number;
  earningsPerShare?: number;
}

export interface LiquidityMetrics {
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;
  workingCapital: number;
  cashConversionCycle: number;
}

export interface EfficiencyMetrics {
  assetTurnover: number;
  inventoryTurnover: number;
  receivableTurnover: number;
  payableTurnover: number;
  salesPerEmployee: number;
}

export interface LeverageMetrics {
  debtToEquityRatio: number;
  debtToAssetsRatio: number;
  interestCoverageRatio: number;
  debtServiceCoverageRatio: number;
}

export interface IndustryMetrics {
  // Construction industry
  projectProfitabilityIndex?: number;
  costOverrunPercentage?: number;
  billingEfficiency?: number;

  // Real estate
  capRate?: number;
  occupancyRate?: number;
  rentPerSquareFoot?: number;

  // Technology
  monthlyRecurringRevenue?: number;
  customerLifetimeValue?: number;
  churnRate?: number;

  // Retail
  inventoryTurnover?: number;
  grossMarginReturn?: number;
  salesPerSquareFoot?: number;
}

export interface TrendAnalysis {
  revenueGrowth: TrendData;
  profitGrowth: TrendData;
  expenseGrowth: TrendData;
  cashFlowTrend: TrendData;
}

export interface TrendData {
  period: string;
  value: number;
  growthRate: number;
  trend: "increasing" | "decreasing" | "stable";
}

export interface FinancialForecast {
  period: string;
  revenue: number;
  expenses: number;
  netIncome: number;
  cashFlow: number;
  confidence: "high" | "medium" | "low";
}

export interface BenchmarkComparison {
  metric: string;
  tenantValue: number;
  industryAverage: number;
  performanceRating:
    | "excellent"
    | "good"
    | "average"
    | "below_average"
    | "poor";
}

export interface FinancialAlert {
  id: string;
  type: "warning" | "critical" | "info";
  title: string;
  description: string;
  metric: string;
  threshold: number;
  currentValue: number;
  createdAt: string;
}

export interface FinancialInsight {
  id: string;
  category: "opportunity" | "risk" | "efficiency" | "compliance";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  actionItems: string[];
  createdAt: string;
}

// Multi-tenant configuration
export interface TenantFinanceConfiguration {
  tenantId: string;

  // General settings
  baseCurrency: Currency;
  fiscalYearStart: string; // MM-DD format
  chartOfAccountsTemplate:
    | "standard"
    | "construction"
    | "real_estate"
    | "technology"
    | "retail"
    | "custom";

  // Number formats
  accountCodeFormat: string;
  invoiceNumberFormat: string;
  transactionNumberFormat: string;

  // Approval workflows
  transactionApprovalLimits: ApprovalLimit[];
  invoiceApprovalRequired: boolean;
  budgetApprovalRequired: boolean;

  // Integration settings
  enableCRMIntegration: boolean;
  enableHRMSIntegration: boolean;
  enableProjectIntegration: boolean;
  enableInventoryIntegration: boolean;

  // Automation settings
  autoPostRecurringTransactions: boolean;
  autoSendInvoiceReminders: boolean;
  autoCalculateDepreciation: boolean;

  // Compliance settings
  requireTaxCompliance: boolean;
  auditTrailRequired: boolean;
  documentRetentionPeriod: number; // years

  // Reporting settings
  defaultReportCurrency: Currency;
  includeInactiveAccounts: boolean;
  showZeroBalanceAccounts: boolean;

  // Access controls
  departmentAccess: DepartmentAccess[];
  userPermissions: UserPermission[];
}

export interface ApprovalLimit {
  roleId: string;
  transactionType: TransactionType;
  approvalLimit: number;
  currency: Currency;
}

export interface DepartmentAccess {
  departmentId: string;
  departmentName: string;
  accessibleAccounts: string[];
  canCreateTransactions: boolean;
  canApproveTransactions: boolean;
  canViewReports: boolean;
}

export interface UserPermission {
  userId: string;
  permissions: FinancePermission[];
  accessLevel: "read" | "write" | "admin";
}

export type FinancePermission =
  | "view_dashboard"
  | "create_transactions"
  | "approve_transactions"
  | "manage_accounts"
  | "create_invoices"
  | "manage_budgets"
  | "view_reports"
  | "export_data"
  | "manage_taxes"
  | "configure_system";

// Search and filtering
export interface FinanceSearchFilters {
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  accountTypes?: AccountType[];
  transactionTypes?: TransactionType[];
  status?: string[];
  departments?: string[];
  projects?: string[];
  amountRange?: {
    min: number;
    max: number;
  };
  currencies?: Currency[];
  searchText?: string;
}

export interface FinanceSortOptions {
  field: "date" | "amount" | "account" | "reference" | "createdAt";
  direction: "asc" | "desc";
}
