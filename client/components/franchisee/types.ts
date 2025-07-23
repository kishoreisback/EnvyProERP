// Franchisee Management Types for Beverages & Retail Industry

export interface FranchiseeLocation {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  landmark?: string;
  area: string;
  radius: number; // delivery radius in km
}

export interface FranchiseeOwner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  aadharNumber: string;
  panNumber: string;
  dateOfBirth: string;
  experience: number; // years in retail/beverages
  education: string;
  previousBusinessExperience: string;
  backgroundVerificationStatus:
    | "pending"
    | "in_progress"
    | "completed"
    | "failed";
  kycStatus: "pending" | "submitted" | "verified" | "rejected";
  kycDocuments: Document[];
}

export interface Document {
  id: string;
  type:
    | "aadhar"
    | "pan"
    | "license"
    | "agreement"
    | "bank_statement"
    | "property_proof"
    | "gst_certificate"
    | "other";
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  verificationStatus: "pending" | "verified" | "rejected";
  remarks?: string;
}

export interface InventoryCapability {
  storageArea: number; // in sq ft
  refrigeratedStorage: boolean;
  freezerCapacity: number; // in liters
  dryStorageCapacity: number; // in sq ft
  deliveryVehicles: DeliveryVehicle[];
  staffCapacity: number;
  operatingHours: {
    open: string;
    close: string;
    workingDays: string[];
  };
}

export interface DeliveryVehicle {
  id: string;
  type: "bike" | "auto" | "van" | "truck";
  capacity: number; // in kg
  hasRefrigeration: boolean;
  licenseNumber: string;
  ownershipType: "owned" | "rented" | "third_party";
}

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  accountType: "savings" | "current";
  upiId?: string;
  digitalWallets: string[];
}

export interface FranchiseeRequest {
  id: string;
  tenantId: string;
  requestNumber: string;
  currentStep: number;
  totalSteps: number;
  status:
    | "draft"
    | "submitted"
    | "under_review"
    | "approved"
    | "rejected"
    | "pending_documents";

  // Business Information
  businessInfo: {
    legalName: string;
    tradeName: string;
    businessType:
      | "sole_proprietorship"
      | "partnership"
      | "private_limited"
      | "llp";
    incorporationDate: string;
    panNumber: string;
    gstNumber: string;
    fssaiLicense: string;
    shopEstablishmentLicense: string;
    yearsInBusiness: number;
  };

  // Owner Information
  owner: FranchiseeOwner;

  // Location Details
  location: FranchiseeLocation;

  // Inventory Capability
  inventoryCapability: InventoryCapability;

  // Financial Information
  bankDetails: BankDetails;
  investmentCapacity: number;
  expectedMonthlyRevenue: number;

  // Documents
  documents: Document[];

  // Terms & Agreements
  termsAccepted: boolean;
  digitalSignature?: string;
  signedAt?: string;

  // Review Process
  reviewNotes: ReviewNote[];
  approvalWorkflow: ApprovalStep[];

  // Timestamps
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;

  // Assigned Reviewer
  assignedTo?: string;
  reviewDeadline?: string;
}

export interface ReviewNote {
  id: string;
  reviewerId: string;
  reviewerName: string;
  section: string;
  comment: string;
  type: "comment" | "revision_required" | "approved" | "rejected";
  createdAt: string;
}

export interface ApprovalStep {
  id: string;
  stepName: string;
  assignedTo: string;
  assignedToName: string;
  status: "pending" | "in_progress" | "approved" | "rejected";
  completedAt?: string;
  comments?: string;
  order: number;
}

export interface FranchiseeProfile {
  id: string;
  tenantId: string;
  franchiseeCode: string;
  requestId: string;

  // Basic Info
  businessName: string;
  legalName: string;
  status: "active" | "inactive" | "suspended" | "terminated";

  // Contact Information
  primaryContact: FranchiseeOwner;
  location: FranchiseeLocation;

  // Business Details
  categories: ProductCategory[];
  inventoryCapability: InventoryCapability;

  // Financial Setup
  bankDetails: BankDetails;
  creditLimit: number;
  securityDeposit: number;
  commissionStructure: CommissionStructure;

  // Operational
  launchDate: string;
  performanceMetrics: PerformanceMetrics;

  // Integration Settings
  posIntegration: boolean;
  inventorySync: boolean;
  orderSync: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  type: "beverages" | "snacks" | "groceries" | "dairy" | "frozen" | "other";
  isActive: boolean;
  commissionRate: number;
}

export interface CommissionStructure {
  baseCommission: number;
  tieredCommissions: TieredCommission[];
  bonusStructure: BonusStructure[];
}

export interface TieredCommission {
  minAmount: number;
  maxAmount: number;
  commissionRate: number;
}

export interface BonusStructure {
  type: "volume" | "new_product" | "performance" | "seasonal";
  condition: string;
  bonusAmount: number;
  validFrom: string;
  validTo: string;
}

export interface PerformanceMetrics {
  monthlyRevenue: number;
  orderCount: number;
  customerSatisfaction: number;
  deliveryRating: number;
  inventoryTurnover: number;
  outstandingAmount: number;
}

// Form Types
export interface FranchiseeRegistrationForm {
  step1: BusinessInformationForm;
  step2: OwnerInformationForm;
  step3: LocationDetailsForm;
  step4: InventoryCapabilityForm;
  step5: BankDetailsForm;
  step6: DocumentUploadForm;
  step7: TermsAgreementForm;
}

export interface BusinessInformationForm {
  legalName: string;
  tradeName: string;
  businessType: string;
  incorporationDate: string;
  panNumber: string;
  gstNumber: string;
  fssaiLicense: string;
  shopEstablishmentLicense: string;
  yearsInBusiness: number;
  investmentCapacity: number;
  expectedMonthlyRevenue: number;
}

export interface OwnerInformationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  aadharNumber: string;
  panNumber: string;
  dateOfBirth: string;
  experience: number;
  education: string;
  previousBusinessExperience: string;
}

export interface LocationDetailsForm {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  landmark?: string;
  area: string;
  radius: number;
}

export interface InventoryCapabilityForm {
  storageArea: number;
  refrigeratedStorage: boolean;
  freezerCapacity: number;
  dryStorageCapacity: number;
  staffCapacity: number;
  vehicles: DeliveryVehicle[];
  openTime: string;
  closeTime: string;
  workingDays: string[];
}

export interface BankDetailsForm {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  accountType: string;
  upiId?: string;
}

export interface DocumentUploadForm {
  documents: {
    type: string;
    file: File | null;
    uploaded: boolean;
  }[];
}

export interface TermsAgreementForm {
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  franchiseAgreementAccepted: boolean;
  digitalSignature?: string;
}

// Dashboard Types
export interface FranchiseeDashboard {
  totalRequests: number;
  pendingApprovals: number;
  activeFranchisees: number;
  rejectedRequests: number;
  recentRequests: FranchiseeRequest[];
  performanceSummary: {
    totalRevenue: number;
    averagePerformance: number;
    topPerformers: FranchiseeProfile[];
  };
}

export interface FranchiseeFilters {
  status?: string[];
  location?: string[];
  businessType?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  revenueRange?: {
    min: number;
    max: number;
  };
}

// Analytics Types
export interface FranchiseeAnalytics {
  registrationTrends: {
    period: string;
    requests: number;
    approvals: number;
  }[];
  locationDistribution: {
    state: string;
    count: number;
  }[];
  performanceMetrics: {
    averageRevenue: number;
    averageOrderValue: number;
    customerSatisfaction: number;
  };
  categoryPerformance: {
    category: string;
    revenue: number;
    growth: number;
  }[];
}
