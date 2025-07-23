// Tax & Compliance Types for Indian Statutory Requirements

export type TaxType =
  | "gst"
  | "tds"
  | "tcs"
  | "income_tax"
  | "professional_tax"
  | "provident_fund"
  | "esi"
  | "labour_welfare_fund"
  | "vat"
  | "service_tax"
  | "customs_duty"
  | "excise_duty";

export type GSTType = "cgst" | "sgst" | "igst" | "utgst" | "cess";

export type ComplianceStatus =
  | "pending"
  | "filed"
  | "accepted"
  | "rejected"
  | "overdue"
  | "exempted";

export type FilingFrequency =
  | "monthly"
  | "quarterly"
  | "half_yearly"
  | "annually"
  | "event_based";

export type IndustryType =
  | "manufacturing"
  | "construction"
  | "real_estate"
  | "technology"
  | "retail"
  | "healthcare"
  | "education"
  | "hospitality"
  | "financial_services"
  | "agriculture";

// GST Compliance
export interface GSTReturn {
  id: string;
  tenantId: string;
  returnType: GSTReturnType;
  period: string; // YYYY-MM format
  gstNumber: string;
  status: ComplianceStatus;
  filingDate?: string;
  dueDate: string;

  // Sales Data
  totalSales: number;
  taxableSales: number;
  exemptSales: number;
  nilRatedSales: number;

  // Tax Calculations
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  cessAmount: number;
  totalTaxCollected: number;

  // Input Tax Credit
  itcClaimed: number;
  itcReversed: number;
  netItc: number;

  // Payment Details
  taxPayable: number;
  interestPayable: number;
  penaltyPayable: number;
  totalPayment: number;

  // Filing Details
  filedBy?: string;
  acknowledgmentNumber?: string;
  refundClaimed?: number;

  createdAt: string;
  updatedAt: string;
}

export type GSTReturnType =
  | "gstr1"
  | "gstr2"
  | "gstr3b"
  | "gstr4"
  | "gstr5"
  | "gstr6"
  | "gstr7"
  | "gstr8"
  | "gstr9"
  | "gstr9c"
  | "gstr10"
  | "gstr11";

// TDS Compliance
export interface TDSReturn {
  id: string;
  tenantId: string;
  quarter: string; // Q1, Q2, Q3, Q4
  financialYear: string; // 2023-24
  tanNumber: string;
  status: ComplianceStatus;
  filingDate?: string;
  dueDate: string;

  // TDS Details
  totalDeductions: number;
  totalDeposited: number;
  interestPayable: number;
  penaltyPayable: number;

  // Payment Details
  challans: TDSChallan[];

  // Filing Details
  etdsToken?: string;
  acknowledgmentNumber?: string;

  createdAt: string;
  updatedAt: string;
}

export interface TDSChallan {
  id: string;
  challanNumber: string;
  bsrCode: string;
  bankName: string;
  depositDate: string;
  amount: number;
  taxType: string; // 194A, 194C, etc.
}

// Income Tax Compliance
export interface ITReturn {
  id: string;
  tenantId: string;
  assessmentYear: string; // 2023-24
  returnType: ITReturnType;
  panNumber: string;
  status: ComplianceStatus;
  filingDate?: string;
  dueDate: string;

  // Income Details
  businessIncome: number;
  salaryIncome: number;
  capitalGains: number;
  otherSources: number;
  totalIncome: number;

  // Deductions
  standardDeduction: number;
  section80Deductions: number;
  totalDeductions: number;

  // Tax Calculation
  taxableIncome: number;
  taxLiability: number;
  taxPaid: number;
  refundDue: number;

  // Filing Details
  itrPassword?: string;
  acknowledgmentNumber?: string;
  verificationCode?: string;

  createdAt: string;
  updatedAt: string;
}

export type ITReturnType =
  | "itr1"
  | "itr2"
  | "itr3"
  | "itr4"
  | "itr5"
  | "itr6"
  | "itr7";

// Labour Law Compliance
export interface LabourCompliance {
  id: string;
  tenantId: string;
  complianceType: LabourComplianceType;
  period: string;
  status: ComplianceStatus;
  dueDate: string;
  filingDate?: string;

  // Employee Details
  totalEmployees: number;
  maleEmployees: number;
  femaleEmployees: number;
  contractEmployees: number;

  // Compliance Specifics
  pfContribution?: number;
  esiContribution?: number;
  bonusPayable?: number;
  gratuityProvision?: number;

  // Documents
  attachments: ComplianceDocument[];

  createdAt: string;
  updatedAt: string;
}

export type LabourComplianceType =
  | "pf_return"
  | "esi_return"
  | "bonus_return"
  | "gratuity_return"
  | "labour_welfare_fund"
  | "professional_tax"
  | "contract_labour_return"
  | "factory_license_renewal"
  | "shops_establishment_return";

// Environmental Compliance
export interface EnvironmentalCompliance {
  id: string;
  tenantId: string;
  complianceType: EnvironmentalComplianceType;
  period: string;
  status: ComplianceStatus;
  dueDate: string;

  // Pollution Details
  airEmissions?: number;
  waterDischarge?: number;
  wasteGenerated?: number;
  energyConsumption?: number;

  // Compliance Certificates
  pollutionClearance?: boolean;
  environmentalAudit?: boolean;
  wasteManagementPlan?: boolean;

  attachments: ComplianceDocument[];

  createdAt: string;
  updatedAt: string;
}

export type EnvironmentalComplianceType =
  | "pollution_clearance"
  | "environmental_audit"
  | "waste_management"
  | "water_consent"
  | "air_consent"
  | "hazardous_waste_authorization";

// Industry-Specific Compliance
export interface IndustryCompliance {
  id: string;
  tenantId: string;
  industryType: IndustryType;
  complianceType: string;
  period: string;
  status: ComplianceStatus;
  dueDate: string;

  // Industry-specific data
  specificData: Record<string, any>;

  attachments: ComplianceDocument[];

  createdAt: string;
  updatedAt: string;
}

// Compliance Calendar
export interface ComplianceCalendar {
  id: string;
  tenantId: string;
  year: number;
  entries: ComplianceEntry[];
}

export interface ComplianceEntry {
  id: string;
  complianceType: string;
  description: string;
  frequency: FilingFrequency;
  dueDate: string;
  status: ComplianceStatus;
  priority: "high" | "medium" | "low";
  penalty?: number;
  isRecurring: boolean;
  reminders: ComplianceReminder[];
}

export interface ComplianceReminder {
  id: string;
  type: "email" | "sms" | "notification";
  daysBefore: number;
  isActive: boolean;
}

// Compliance Documents
export interface ComplianceDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  uploadedBy: string;
  url: string;
  isRequired: boolean;
}

// Audit Trail
export interface ComplianceAuditTrail {
  id: string;
  tenantId: string;
  complianceId: string;
  action: string;
  performedBy: string;
  performedAt: string;
  details: Record<string, any>;
  ipAddress?: string;
}

// Tax Configuration
export interface TaxConfiguration {
  id: string;
  tenantId: string;

  // GST Configuration
  gstNumber?: string;
  gstRegistrationDate?: string;
  gstType: "regular" | "composition" | "casual" | "non_resident";
  hsncodes: HSNCode[];

  // TDS Configuration
  tanNumber?: string;
  tdsApplicable: boolean;
  tdsRates: TDSRate[];

  // Income Tax Configuration
  panNumber: string;
  itAssessmentYear: string;

  // Other Tax Numbers
  cinNumber?: string;
  udyamNumber?: string;
  iecCode?: string;

  // Labour Law Numbers
  pfNumber?: string;
  esiNumber?: string;
  professionalTaxNumber?: string;

  // Industry Specific
  drugLicense?: string;
  fssaiLicense?: string;
  pollutionClearance?: string;

  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HSNCode {
  code: string;
  description: string;
  gstRate: number;
  cessRate?: number;
  isActive: boolean;
}

export interface TDSRate {
  section: string;
  description: string;
  rate: number;
  thresholdLimit: number;
  isActive: boolean;
}

// Compliance Dashboard Analytics
export interface ComplianceAnalytics {
  tenantId: string;
  period: string;

  // Overview Metrics
  totalCompliances: number;
  completedCompliances: number;
  pendingCompliances: number;
  overdueCompliances: number;

  // Tax Metrics
  totalTaxPaid: number;
  gstPaid: number;
  tdsPaid: number;
  incomeTaxPaid: number;

  // Penalties & Interest
  totalPenalties: number;
  totalInterest: number;

  // Compliance Score
  complianceScore: number;
  industryBenchmark: number;

  // Trends
  monthlyTrends: MonthlyTrend[];

  calculatedAt: string;
}

export interface MonthlyTrend {
  month: string;
  compliances: number;
  penalties: number;
  taxPaid: number;
  score: number;
}

// Statutory Forms
export interface StatutoryForm {
  id: string;
  formType: string;
  formName: string;
  version: string;
  applicableFor: IndustryType[];
  frequency: FilingFrequency;
  fields: FormField[];
  validations: FormValidation[];
  isActive: boolean;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "checkbox" | "file";
  required: boolean;
  options?: string[];
  validation?: string;
}

export interface FormValidation {
  field: string;
  rule: string;
  message: string;
}

// Compliance Reports
export interface ComplianceReport {
  id: string;
  tenantId: string;
  reportType: ComplianceReportType;
  period: string;
  generatedAt: string;
  generatedBy: string;
  data: Record<string, any>;
  exportFormat: "pdf" | "excel" | "csv";
  downloadUrl?: string;
}

export type ComplianceReportType =
  | "compliance_summary"
  | "tax_summary"
  | "penalty_report"
  | "audit_trail_report"
  | "compliance_calendar"
  | "statutory_due_dates"
  | "industry_compliance_report";
