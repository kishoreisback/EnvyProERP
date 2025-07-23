// Comprehensive Accounting Types for Multi-Tenant System

export type AccountType =
  | "assets"
  | "liabilities"
  | "equity"
  | "revenue"
  | "expenses"
  | "cost_of_goods_sold";

export type AccountSubType =
  | "current_assets"
  | "fixed_assets"
  | "intangible_assets"
  | "current_liabilities"
  | "long_term_liabilities"
  | "retained_earnings"
  | "contributed_capital"
  | "operating_revenue"
  | "other_revenue"
  | "operating_expenses"
  | "administrative_expenses"
  | "financial_expenses";

export type TransactionType =
  | "journal_entry"
  | "sales_invoice"
  | "purchase_invoice"
  | "payment"
  | "receipt"
  | "bank_transfer"
  | "adjustment"
  | "depreciation"
  | "accrual"
  | "provision"
  | "write_off";

export type TransactionStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "posted"
  | "cancelled"
  | "reversed";

export type Currency =
  | "INR"
  | "USD"
  | "EUR"
  | "GBP"
  | "AUD"
  | "CAD"
  | "JPY"
  | "SGD";

export type IndustryType =
  | "construction"
  | "real_estate"
  | "technology"
  | "manufacturing"
  | "retail"
  | "healthcare"
  | "education"
  | "hospitality"
  | "financial_services"
  | "agriculture"
  | "energy"
  | "logistics";

export type BookClosingStatus = "open" | "soft_closed" | "hard_closed";

export type AuditStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "certified";

// Core Account Structure
export interface TenantAccount {
  id: string;
  tenantId: string;
  accountCode: string;
  accountName: string;
  accountType: AccountType;
  accountSubType: AccountSubType;
  parentAccountId?: string;
  level: number;
  isActive: boolean;

  // Balance Information
  currentBalance: number;
  openingBalance: number;
  ytdBalance: number;
  lastYearBalance: number;
  currency: Currency;

  // Account Configuration
  allowDirectPosting: boolean;
  isControlAccount: boolean;
  isBankAccount: boolean;
  isCashAccount: boolean;
  isStatutoryAccount: boolean;

  // Bank Account Details
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
    swiftCode?: string;
    bankAddress: string;
  };

  // Depreciation Settings (for Fixed Assets)
  depreciationConfig?: {
    method: "straight_line" | "written_down_value" | "units_of_production";
    rate: number;
    usefulLife: number;
    salvageValue: number;
    startDate: string;
  };

  // Tax Configuration
  taxConfig?: {
    gstApplicable: boolean;
    gstRate?: number;
    tdsApplicable: boolean;
    tdsSection?: string;
    tdsRate?: number;
  };

  // Industry-specific attributes
  industryAttributes?: Record<string, any>;

  // Audit & Compliance
  lastReconciledDate?: string;
  reconciliationFrequency?: "daily" | "weekly" | "monthly";
  complianceNotes?: string;

  // Metadata
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

// Journal Entry Structure
export interface TenantJournalEntry {
  id: string;
  tenantId: string;
  entryNumber: string;

  // Entry Details
  date: string;
  type: TransactionType;
  reference: string;
  description: string;
  totalAmount: number;
  currency: Currency;
  exchangeRate?: number;

  // Line Items
  lineItems: JournalLineItem[];

  // Approval & Status
  status: TransactionStatus;
  approvalLevel: number;
  approvedBy?: string;
  approvedAt?: string;

  // Source Information
  sourceModule:
    | "manual"
    | "sales"
    | "purchase"
    | "payroll"
    | "inventory"
    | "assets"
    | "bank"
    | "api";
  sourceDocumentId?: string;
  sourceDocumentType?: string;

  // Period & Book Information
  accountingPeriod: string; // YYYY-MM format
  fiscalYear: string; // 2023-24 format
  bookClosingStatus: BookClosingStatus;

  // Attachments
  attachments: JournalAttachment[];

  // Tags & Categories
  tags: string[];
  category?: string;
  department?: string;
  project?: string;
  costCenter?: string;

  // Audit Information
  auditTrail: AuditEntry[];

  // Metadata
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export interface JournalLineItem {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  description: string;
  debitAmount: number;
  creditAmount: number;

  // Additional Details
  quantity?: number;
  rate?: number;
  unit?: string;

  // Tax Information
  taxAmount?: number;
  taxRate?: number;
  taxCode?: string;

  // Dimensions
  department?: string;
  project?: string;
  costCenter?: string;
  location?: string;

  // Reconciliation
  isReconciled: boolean;
  reconciledDate?: string;
  reconciledBy?: string;
}

export interface JournalAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
}

export interface AuditEntry {
  id: string;
  action:
    | "created"
    | "updated"
    | "approved"
    | "posted"
    | "cancelled"
    | "reversed";
  performedBy: string;
  performedAt: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

// Financial Period Management
export interface TenantFiscalYear {
  id: string;
  tenantId: string;
  fiscalYear: string; // 2023-24
  startDate: string;
  endDate: string;
  status: "current" | "previous" | "future";
  isLocked: boolean;

  // Period Breakdown
  periods: FiscalPeriod[];

  // Closing Information
  yearEndClosing?: {
    status: BookClosingStatus;
    closedBy?: string;
    closedAt?: string;
    reopenedBy?: string;
    reopenedAt?: string;
    closingNotes?: string;
  };

  // Audit Information
  auditStatus: AuditStatus;
  auditFirm?: string;
  auditStartDate?: string;
  auditCompletionDate?: string;
  auditNotes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface FiscalPeriod {
  id: string;
  periodNumber: number;
  periodName: string; // Apr-2024
  startDate: string;
  endDate: string;
  status: BookClosingStatus;
  closedBy?: string;
  closedAt?: string;
}

// Financial Statements
export interface TenantFinancialStatement {
  id: string;
  tenantId: string;
  statementType:
    | "balance_sheet"
    | "profit_loss"
    | "cash_flow"
    | "trial_balance"
    | "general_ledger";
  period: string;
  fiscalYear: string;
  generatedAt: string;
  generatedBy: string;

  // Statement Data
  data: FinancialStatementData;

  // Comparative Data
  comparativePeriod?: string;
  comparativeData?: FinancialStatementData;

  // Notes & Annotations
  notes: StatementNote[];

  // Export Information
  exportFormats: string[];
  lastExportedAt?: string;

  // Approval & Publishing
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: string;
  isPublished: boolean;
  publishedAt?: string;

  createdAt: string;
  updatedAt: string;
}

export interface FinancialStatementData {
  sections: StatementSection[];
  totals: Record<string, number>;
  metadata: Record<string, any>;
}

export interface StatementSection {
  id: string;
  name: string;
  order: number;
  items: StatementLineItem[];
  subtotal?: number;
}

export interface StatementLineItem {
  accountId: string;
  accountCode: string;
  accountName: string;
  currentPeriod: number;
  previousPeriod?: number;
  variance?: number;
  variancePercentage?: number;
  level: number;
  isTotal?: boolean;
  isBold?: boolean;
}

export interface StatementNote {
  id: string;
  noteNumber: string;
  title: string;
  content: string;
  attachments?: string[];
}

// Budget & Forecasting
export interface TenantBudget {
  id: string;
  tenantId: string;
  budgetName: string;
  budgetType: "annual" | "quarterly" | "monthly" | "project" | "department";
  fiscalYear: string;

  // Period Information
  startDate: string;
  endDate: string;
  currency: Currency;

  // Budget Lines
  budgetLines: BudgetLine[];

  // Totals
  totalBudget: number;
  totalActual: number;
  totalVariance: number;

  // Status & Approval
  status: "draft" | "submitted" | "approved" | "active" | "closed";
  approvalWorkflow: ApprovalLevel[];

  // Revision Information
  version: number;
  revisionHistory: BudgetRevision[];

  // Department/Project Association
  departmentId?: string;
  projectId?: string;
  responsiblePersonId?: string;

  // Industry-specific attributes
  industryMetrics?: Record<string, any>;

  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export interface BudgetLine {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;

  // Budget Amounts by Period
  budgetAmounts: PeriodAmount[];
  actualAmounts: PeriodAmount[];

  // Variance Analysis
  variance: number;
  variancePercentage: number;
  varianceReason?: string;

  // Additional Details
  quantity?: number;
  rate?: number;
  unit?: string;
  assumptions?: string;

  // Department/Project Allocation
  allocations?: Allocation[];
}

export interface PeriodAmount {
  period: string; // YYYY-MM
  amount: number;
  isActual: boolean;
  lastUpdated: string;
}

export interface Allocation {
  departmentId: string;
  departmentName: string;
  percentage: number;
  amount: number;
}

export interface ApprovalLevel {
  level: number;
  approverRole: string;
  approverId?: string;
  approverName?: string;
  status: "pending" | "approved" | "rejected";
  approvedAt?: string;
  comments?: string;
}

export interface BudgetRevision {
  version: number;
  revisonDate: string;
  revisedBy: string;
  reason: string;
  changes: string[];
}

// Asset Management
export interface TenantFixedAsset {
  id: string;
  tenantId: string;
  assetCode: string;
  assetName: string;
  assetCategory: string;
  assetType: "tangible" | "intangible";

  // Asset Details
  description: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  location: string;
  department: string;
  responsiblePerson: string;

  // Financial Information
  purchaseDate: string;
  purchaseCost: number;
  accumulatedDepreciation: number;
  netBookValue: number;
  currentValue: number;
  currency: Currency;

  // Depreciation
  depreciationMethod:
    | "straight_line"
    | "written_down_value"
    | "units_of_production";
  depreciationRate: number;
  usefulLife: number;
  salvageValue: number;
  depreciationSchedule: DepreciationEntry[];

  // Maintenance & Insurance
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  maintenanceCost: number;
  insuranceDetails?: {
    policyNumber: string;
    insuranceCompany: string;
    premiumAmount: number;
    coverageAmount: number;
    expiryDate: string;
  };

  // Disposal Information
  disposalDate?: string;
  disposalMethod?: "sale" | "scrap" | "donation" | "write_off";
  disposalAmount?: number;
  gainLossOnDisposal?: number;

  // Status
  status: "active" | "under_maintenance" | "disposed" | "written_off";
  condition: "excellent" | "good" | "fair" | "poor";

  // Images & Documents
  images: string[];
  documents: AssetDocument[];

  // Audit Information
  lastPhysicalVerificationDate?: string;
  physicalVerificationStatus?: "verified" | "missing" | "damaged";
  auditNotes?: string;

  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export interface DepreciationEntry {
  year: string;
  openingValue: number;
  depreciationAmount: number;
  closingValue: number;
  method: string;
  rate: number;
}

export interface AssetDocument {
  id: string;
  documentType: "invoice" | "warranty" | "insurance" | "maintenance" | "other";
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  expiryDate?: string;
}

// Bank Reconciliation
export interface TenantBankReconciliation {
  id: string;
  tenantId: string;
  bankAccountId: string;
  statementDate: string;
  statementNumber: string;

  // Balances
  bookBalance: number;
  bankBalance: number;
  reconciledBalance: number;
  difference: number;

  // Reconciliation Items
  reconciliationItems: ReconciliationItem[];

  // Status
  status: "in_progress" | "completed" | "reviewed" | "approved";
  reconciledBy?: string;
  reconciledAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;

  // Notes
  notes?: string;
  exceptions?: string[];

  // Attachments
  bankStatement: string; // file URL
  supportingDocuments: string[];

  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export interface ReconciliationItem {
  id: string;
  type:
    | "outstanding_check"
    | "deposit_in_transit"
    | "bank_charge"
    | "interest_earned"
    | "error"
    | "other";
  description: string;
  amount: number;
  date: string;
  reference: string;
  journalEntryId?: string;
  isCleared: boolean;
  clearanceDate?: string;
  notes?: string;
}

// Cost Center & Department Accounting
export interface TenantCostCenter {
  id: string;
  tenantId: string;
  costCenterCode: string;
  costCenterName: string;
  description: string;

  // Hierarchy
  parentCostCenterId?: string;
  level: number;
  isActive: boolean;

  // Responsible Person
  managerId: string;
  managerName: string;
  managerEmail: string;

  // Budget Information
  budgetAmount: number;
  actualAmount: number;
  variance: number;

  // Allocations
  allocationMethod: "direct" | "percentage" | "activity_based" | "headcount";
  allocationRules: AllocationRule[];

  // Industry-specific metrics
  performanceMetrics?: Record<string, any>;

  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export interface AllocationRule {
  id: string;
  expenseType: string;
  allocationBasis: string;
  percentage?: number;
  formula?: string;
  isActive: boolean;
}

// Analytics & Reporting
export interface TenantAccountingAnalytics {
  tenantId: string;
  period: string;
  generatedAt: string;

  // Financial Ratios
  liquidityRatios: {
    currentRatio: number;
    quickRatio: number;
    cashRatio: number;
  };

  profitabilityRatios: {
    grossProfitMargin: number;
    netProfitMargin: number;
    returnOnAssets: number;
    returnOnEquity: number;
    operatingMargin: number;
  };

  leverageRatios: {
    debtToEquityRatio: number;
    debtToAssetsRatio: number;
    interestCoverageRatio: number;
    debtServiceCoverageRatio: number;
  };

  efficiencyRatios: {
    assetTurnover: number;
    inventoryTurnover: number;
    receivablesTurnover: number;
    payablesTurnover: number;
    workingCapitalTurnover: number;
  };

  // Cash Flow Analysis
  cashFlowMetrics: {
    operatingCashFlow: number;
    investingCashFlow: number;
    financingCashFlow: number;
    netCashFlow: number;
    cashConversionCycle: number;
  };

  // Trend Analysis
  trends: {
    revenueGrowth: number;
    expenseGrowth: number;
    profitGrowth: number;
    assetGrowth: number;
    monthlyTrends: MonthlyTrend[];
  };

  // Industry Benchmarks
  industryBenchmarks?: {
    industryType: IndustryType;
    benchmarkRatios: Record<string, number>;
    percentileRanking: Record<string, number>;
  };

  // Risk Indicators
  riskIndicators: {
    riskScore: number;
    riskLevel: "low" | "medium" | "high" | "critical";
    riskFactors: string[];
    recommendations: string[];
  };
}

export interface MonthlyTrend {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  cashFlow: number;
  metrics: Record<string, number>;
}

// Multi-Tenant Configuration
export interface TenantAccountingConfiguration {
  id: string;
  tenantId: string;

  // Basic Configuration
  companyName: string;
  legalName: string;
  industryType: IndustryType;
  baseCurrency: Currency;
  functionalCurrency: Currency;
  reportingCurrency: Currency;

  // Fiscal Year Configuration
  fiscalYearStart: number; // Month number (1-12)
  fiscalYearEnd: number;
  currentFiscalYear: string;

  // Chart of Accounts
  accountingStandard: "gaap" | "ifrs" | "ind_as" | "local";
  chartOfAccountsTemplate: string;
  accountCodeFormat: string; // e.g., "####" or "##-##-##"

  // Transaction Configuration
  autoNumbering: {
    journalEntries: boolean;
    invoices: boolean;
    receipts: boolean;
    payments: boolean;
  };

  numberingFormats: {
    journalEntry: string; // e.g., "JE-{YYYY}-{####}"
    invoice: string;
    receipt: string;
    payment: string;
  };

  // Approval Workflows
  approvalRequired: boolean;
  approvalLimits: ApprovalLimit[];

  // Multi-Currency
  multiCurrencyEnabled: boolean;
  exchangeRateSource: "manual" | "automatic" | "api";
  exchangeRateProvider?: string;

  // Integration Settings
  integrations: {
    banking: boolean;
    payroll: boolean;
    inventory: boolean;
    crm: boolean;
    projects: boolean;
  };

  // Compliance & Regulatory
  taxConfiguration: {
    gstApplicable: boolean;
    gstRegistrationNumber?: string;
    tdsApplicable: boolean;
    tanNumber?: string;
  };

  auditRequirements: {
    internalAudit: boolean;
    externalAudit: boolean;
    auditFrequency: "monthly" | "quarterly" | "annually";
  };

  // Industry-specific settings
  industrySettings: Record<string, any>;

  // Security & Access
  accessControls: {
    restrictPeriodAccess: boolean;
    allowPostingToClosedPeriods: boolean;
    requireApprovalForClosedPeriods: boolean;
  };

  // Backup & Archive
  backupSettings: {
    frequency: "daily" | "weekly" | "monthly";
    retentionPeriod: number; // in months
    archiveOldData: boolean;
    archiveAfterPeriod: number; // in years
  };

  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export interface ApprovalLimit {
  role: string;
  transactionType: TransactionType;
  maxAmount: number;
  currency: Currency;
}

// Industry-Specific Extensions
export interface ConstructionAccountingExtension {
  projectAccounting: boolean;
  jobCosting: boolean;
  progressBilling: boolean;
  retentionAccounting: boolean;
  subcontractorAccounting: boolean;
  equipmentAccounting: boolean;

  // WIP (Work in Progress) Accounting
  wipAccounting: {
    method: "percentage_completion" | "completed_contract" | "cost_to_cost";
    recognitionCriteria: string[];
  };

  // Project-specific accounts
  projectChartOfAccounts: boolean;
  projectDimensions: string[];
}

export interface RealEstateAccountingExtension {
  propertyAccounting: boolean;
  rentalIncomeTracking: boolean;
  maintenanceAccounting: boolean;
  depreciation: {
    buildingDepreciation: boolean;
    improvementDepreciation: boolean;
    method: "straight_line" | "accelerated";
  };

  // Property management
  propertyDimensions: string[];
  tenantAccounting: boolean;
  securityDepositAccounting: boolean;
}

export interface TechnologyAccountingExtension {
  subscriptionRevenue: boolean;
  revenueRecognition: {
    method: "saas" | "license" | "services";
    deferredRevenueTracking: boolean;
  };

  // R&D Accounting
  rdAccounting: boolean;
  intellectualPropertyAccounting: boolean;

  // Employee stock options
  esopAccounting: boolean;

  // Customer acquisition costs
  cacAccounting: boolean;
  customerLifetimeValue: boolean;
}

export interface ManufacturingAccountingExtension {
  inventoryAccounting: boolean;
  costAccounting: {
    method: "standard" | "actual" | "average";
    varianceAnalysis: boolean;
  };

  // Work-in-process accounting
  wipInventory: boolean;

  // Overhead allocation
  overheadAllocation: {
    method: "activity_based" | "direct_labor" | "machine_hours";
    costDrivers: string[];
  };

  // Quality costs
  qualityCostAccounting: boolean;
}

// Tenant Data Structure
export interface AccountingTenant {
  id: string;
  name: string;
  legalName: string;
  industryType: IndustryType;

  // Configuration
  configuration: TenantAccountingConfiguration;

  // Chart of Accounts
  accounts: TenantAccount[];

  // Current Fiscal Year
  currentFiscalYear: TenantFiscalYear;

  // System Status
  isActive: boolean;
  setupCompleted: boolean;
  lastActivity: string;

  // Subscription & Features
  subscriptionPlan: "basic" | "professional" | "enterprise";
  enabledFeatures: string[];

  // Support & Contact
  primaryContact: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };

  accountant: {
    name: string;
    email: string;
    phone: string;
    firm?: string;
  };

  createdAt: string;
  updatedAt: string;
}
