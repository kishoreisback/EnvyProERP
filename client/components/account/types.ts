export interface Tenant {
  id: string;
  name: string;
  organizationName: string;
  industry: IndustryType;
  subscription: Subscription;
  status: TenantStatus;
  adminUser: AdminUser;
  settings: TenantSettings;
  usage: UsageMetrics;
  createdAt: string;
  updatedAt: string;
  trialExpiresAt?: string;
  billingCycle: BillingCycle;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "owner";
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  planType: "trial" | "basic" | "professional" | "enterprise";
  status: "active" | "expired" | "suspended" | "cancelled";
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  modules: string[];
  limits: SubscriptionLimits;
  pricing: PricingDetails;
}

export interface SubscriptionLimits {
  maxUsers: number;
  maxStorage: number; // in GB
  maxApiCalls: number;
  maxProjects: number;
  maxIntegrations: number;
  supportLevel: "basic" | "priority" | "dedicated";
}

export interface PricingDetails {
  basePrice: number;
  currency: "USD" | "INR" | "EUR";
  billingCycle: BillingCycle;
  discount?: {
    percentage: number;
    validUntil: string;
    reason: string;
  };
  taxes: {
    gst: number;
    serviceTax: number;
  };
}

export interface TenantSettings {
  timezone: string;
  dateFormat: string;
  currency: string;
  language: string;
  notifications: NotificationSettings;
  security: SecuritySettings;
  branding: BrandingSettings;
}

export interface NotificationSettings {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
  billingReminders: boolean;
  usageAlerts: boolean;
  securityAlerts: boolean;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  ipWhitelist: string[];
  sessionTimeout: number; // in minutes
  passwordPolicy: {
    minLength: number;
    requireSpecialChars: boolean;
    requireNumbers: boolean;
    expiryDays: number;
  };
}

export interface BrandingSettings {
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  companyName?: string;
  customDomain?: string;
}

export interface UsageMetrics {
  currentMonth: MonthlyUsage;
  previousMonth: MonthlyUsage;
  yearToDate: YearlyUsage;
  alerts: UsageAlert[];
}

export interface MonthlyUsage {
  users: number;
  storageUsed: number; // in GB
  apiCalls: number;
  activeProjects: number;
  billingAmount: number;
}

export interface YearlyUsage {
  totalBilling: number;
  avgMonthlyUsers: number;
  peakStorage: number;
  totalApiCalls: number;
}

export interface UsageAlert {
  id: string;
  type: "storage" | "users" | "api" | "billing";
  threshold: number;
  currentValue: number;
  severity: "info" | "warning" | "critical";
  message: string;
  createdAt: string;
  acknowledged: boolean;
}

export interface IndustryType {
  id: string;
  name: string;
  category: string;
  description: string;
  defaultModules: string[];
  icon: string;
  regulations?: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: "trial" | "basic" | "professional" | "enterprise";
  description: string;
  features: string[];
  modules: ModuleAccess[];
  limits: SubscriptionLimits;
  pricing: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  popular?: boolean;
  trialDays?: number;
}

export interface ModuleAccess {
  moduleId: string;
  moduleName: string;
  access: "full" | "limited" | "read-only" | "none";
  features: string[];
}

export interface PaymentMethod {
  id: string;
  type: "card" | "bank_transfer" | "upi" | "wallet";
  provider: "stripe" | "razorpay" | "paypal";
  details: {
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
    bankName?: string;
    accountNumber?: string;
  };
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface BillingHistory {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed" | "refunded";
  billingPeriod: {
    start: string;
    end: string;
  };
  items: BillingItem[];
  paymentMethod: string;
  paidAt?: string;
  dueDate: string;
  downloadUrl?: string;
}

export interface BillingItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxRate: number;
}

export type TenantStatus =
  | "active"
  | "trial"
  | "suspended"
  | "expired"
  | "pending";
export type BillingCycle = "monthly" | "quarterly" | "yearly";

export interface TenantRegistrationForm {
  // Basic Info
  organizationName: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  adminAlternatePhone?: string;

  // Company Details
  companyLegalName: string;
  incorporationDate: string;
  companyType:
    | "private_limited"
    | "public_limited"
    | "llp"
    | "partnership"
    | "proprietorship"
    | "trust"
    | "society"
    | "ngo";
  registeredAddress: string;
  communicationAddress: string;
  pincode: string;
  website?: string;

  // Industry & Location
  industryId: string;
  subIndustry?: string;
  businessDescription: string;
  country: string;
  state: string;
  city: string;
  timezone: string;

  // Statutory Details
  panNumber: string;
  tanNumber?: string;
  gstNumber?: string;
  cinNumber?: string; // For companies
  llpinNumber?: string; // For LLP
  udyamNumber?: string; // MSME registration
  iecCode?: string; // Import Export Code
  fssaiNumber?: string; // Food businesses
  drugLicenseNumber?: string; // Pharma businesses

  // Industry Specific Statutory
  reraNumber?: string; // Real Estate
  sebiRegNumber?: string; // Financial Services
  rbiLicenseNumber?: string; // Banking/Finance
  irdaiLicenseNumber?: string; // Insurance
  aicteLicenseNumber?: string; // Education
  mciRegNumber?: string; // Healthcare

  // Bank Details
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  accountType: "current" | "savings" | "cc" | "od";

  // Document Uploads
  logoFile?: File;
  panCardFile?: File;
  gstCertificateFile?: File;
  incorporationCertificateFile?: File;
  moaFile?: File; // Memorandum of Association
  aoaFile?: File; // Articles of Association
  cancelledChequeFile?: File;
  addressProofFile?: File;
  additionalDocuments?: File[];

  // Subscription
  planId: string;
  billingCycle: BillingCycle;

  // Modules
  selectedModules: string[];

  // Payment (for non-trial)
  paymentMethodId?: string;

  // Preferences
  functionalCurrency: "INR" | "USD" | "EUR" | "GBP";
  financialYearStart: string; // MM-DD format
  dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  timeFormat: "12" | "24";

  // Additional Admin Details
  adminDesignation: string;
  adminDepartment?: string;

  // Terms
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  acceptedDataProcessing: boolean;
}

export interface TrialAlert {
  id: string;
  tenantId: string;
  type: "day_10" | "day_13" | "expired";
  sentAt: string;
  acknowledged: boolean;
  actionTaken?: "upgraded" | "extended" | "converted";
}

// API Response types
export interface TenantResponse {
  tenant: Tenant;
  success: boolean;
  message: string;
}

export interface SubscriptionPlansResponse {
  plans: SubscriptionPlan[];
  industries: IndustryType[];
  modules: ModuleInfo[];
}

export interface ModuleInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  isPremium: boolean;
  dependencies: string[];
}
