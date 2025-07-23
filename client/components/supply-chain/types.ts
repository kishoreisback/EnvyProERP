export interface TenantSupplyChainConfig {
  tenantId: string;
  tenantName: string;
  industryType: 'construction' | 'real_estate' | 'manufacturing' | 'retail' | 'logistics';
  defaultCurrency: string;
  operatingRegions: string[];
  complianceStandards: string[];
  qualificationCriteria: QualificationCriteria;
  supplierCategories: string[];
  customFields: Record<string, any>;
}

export interface QualificationCriteria {
  minimumTurnover: number;
  minimumExperience: number; // years
  requiredCertifications: string[];
  creditRatingRequirement: 'excellent' | 'good' | 'average' | 'any';
  insuranceRequirement: boolean;
  financialStabilityScore: number; // minimum score out of 100
  qualityStandards: string[];
  complianceRequirements: string[];
}

export interface TenantSupplier {
  id: string;
  tenantId: string;
  
  // Basic Information
  supplierCode: string;
  supplierName: string;
  legalName?: string;
  supplierType: 'manufacturer' | 'distributor' | 'vendor' | '3pl' | 'contractor' | 'service_provider';
  businessCategory: string;
  subCategories: string[];
  
  // Contact Information
  contactDetails: {
    primaryContact: string;
    designation: string;
    email: string;
    phone: string;
    alternateContact?: string;
    alternateEmail?: string;
    alternatePhone?: string;
    website?: string;
    linkedIn?: string;
  };
  
  // Address Information
  addresses: {
    type: 'registered' | 'operational' | 'billing' | 'shipping';
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  }[];
  
  // Business Information
  businessDetails: {
    incorporationDate: string;
    businessModel: string;
    employeeCount: number;
    annualTurnover: number;
    currency: string;
    yearsInBusiness: number;
    marketPresence: string[];
    competencies: string[];
    specializations: string[];
  };
  
  // Financial Information
  financialInfo: {
    creditRating: 'excellent' | 'good' | 'average' | 'poor';
    creditLimit: number;
    creditPeriod: number; // days
    paymentTerms: 'advance' | 'net_15' | 'net_30' | 'net_45' | 'net_60' | 'cod';
    bankDetails: {
      bankName: string;
      accountNumber: string;
      ifscCode: string;
      accountType: string;
    };
    taxInformation: {
      gstNumber?: string;
      panNumber?: string;
      tanNumber?: string;
      vatNumber?: string;
      taxExemptions?: string[];
    };
  };
  
  // Certifications & Compliance
  certifications: {
    id: string;
    certificationType: string;
    certificateName: string;
    issuingAuthority: string;
    issueDate: string;
    expiryDate: string;
    certificateNumber: string;
    status: 'active' | 'expired' | 'pending_renewal';
    documentUrl?: string;
    scope?: string;
  }[];
  
  // Qualification & Assessment
  qualification: {
    qualificationStatus: 'qualified' | 'under_review' | 'rejected' | 'conditional';
    qualificationDate?: string;
    qualifiedBy?: string;
    qualificationScore: number; // out of 100
    criteriaAssessment: {
      criteria: string;
      score: number;
      maxScore: number;
      remarks?: string;
    }[];
    nextReviewDate?: string;
    restrictions?: string[];
  };
  
  // Performance Metrics
  performance: {
    overallRating: number; // out of 5
    deliveryPerformance: {
      onTimeDeliveryRate: number; // percentage
      averageLeadTime: number; // days
      deliveryAccuracy: number; // percentage
    };
    qualityMetrics: {
      qualityRating: number;
      defectRate: number; // percentage
      returnRate: number; // percentage
      complianceScore: number;
    };
    serviceMetrics: {
      responseTime: number; // hours
      resolutionTime: number; // hours
      customerSatisfaction: number;
      supportQuality: number;
    };
    financialMetrics: {
      paymentReliability: number;
      costCompetitiveness: number;
      priceStability: number;
    };
  };
  
  // Products & Services
  offerings: {
    categories: string[];
    products: {
      id: string;
      productName: string;
      category: string;
      specifications: Record<string, any>;
      unitPrice: number;
      minimumOrderQuantity: number;
      leadTime: number;
      availability: 'in_stock' | 'made_to_order' | 'discontinued';
    }[];
    services: {
      id: string;
      serviceName: string;
      serviceType: string;
      description: string;
      pricing: 'fixed' | 'hourly' | 'project_based';
      rate?: number;
      availability: string[];
    }[];
  };
  
  // Risk Assessment
  riskProfile: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    riskFactors: string[];
    mitigationMeasures: string[];
    insuranceDetails: {
      providerName: string;
      policyNumber: string;
      coverage: number;
      expiryDate: string;
      coverageTypes: string[];
    }[];
    businessContinuityPlan: boolean;
    backupSuppliers?: string[];
  };
  
  // Relationship Management
  relationship: {
    supplierTier: 'tier_1' | 'tier_2' | 'tier_3' | 'strategic';
    relationshipManager: string;
    engagementLevel: 'strategic' | 'preferred' | 'approved' | 'conditional';
    contractType: 'master_agreement' | 'project_based' | 'spot_purchase' | 'blanket_po';
    contractDetails?: {
      contractNumber: string;
      startDate: string;
      endDate: string;
      autoRenewal: boolean;
      terms: string[];
    };
    collaborationAreas: string[];
    developmentPrograms: string[];
  };
  
  // Operational Details
  operational: {
    operatingHours: string;
    timeZone: string;
    holidayCalendar: string[];
    emergencyContacts: {
      name: string;
      designation: string;
      phone: string;
      email: string;
    }[];
    supportedCommunicationChannels: string[];
    preferredOrderMethods: string[];
    invoicingPreferences: {
      format: 'pdf' | 'xml' | 'edi';
      frequency: 'per_delivery' | 'weekly' | 'monthly';
      currency: string;
    };
  };
  
  // Audit & Compliance
  auditTrail: {
    lastAuditDate?: string;
    nextAuditDate?: string;
    auditFrequency: 'quarterly' | 'semi_annual' | 'annual';
    auditResults: {
      auditDate: string;
      auditType: string;
      score: number;
      findings: string[];
      correctiveActions: string[];
      status: 'passed' | 'conditional' | 'failed';
    }[];
    complianceStatus: {
      requirement: string;
      status: 'compliant' | 'non_compliant' | 'pending';
      lastChecked: string;
      expiryDate?: string;
    }[];
  };
  
  // Status & Metadata
  status: 'active' | 'inactive' | 'suspended' | 'blacklisted';
  isPreferredSupplier: boolean;
  isStrategicSupplier: boolean;
  tags: string[];
  notes: string;
  
  // System Fields
  createdAt: string;
  createdBy: string;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
  version: number;
}

export interface SupplierOnboardingStep {
  stepId: string;
  stepName: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  completedBy?: string;
  completedAt?: string;
  documents: {
    documentType: string;
    documentName: string;
    isRequired: boolean;
    isUploaded: boolean;
    uploadedAt?: string;
    fileUrl?: string;
    status: 'pending' | 'uploaded' | 'verified' | 'rejected';
    rejectionReason?: string;
  }[];
  formFields: {
    fieldName: string;
    fieldType: string;
    isRequired: boolean;
    value?: any;
    validationRules?: string[];
  }[];
}

export interface SupplierOnboardingWorkflow {
  workflowId: string;
  tenantId: string;
  supplierId: string;
  supplierName: string;
  initiatedBy: string;
  initiatedAt: string;
  targetCompletionDate: string;
  currentStep: number;
  overallProgress: number; // percentage
  status: 'initiated' | 'in_progress' | 'completed' | 'rejected' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  steps: SupplierOnboardingStep[];
  
  approvals: {
    approvalLevel: string;
    approver: string;
    status: 'pending' | 'approved' | 'rejected';
    approvedAt?: string;
    comments?: string;
  }[];
  
  notifications: {
    notificationType: string;
    recipients: string[];
    sentAt: string;
    status: 'sent' | 'delivered' | 'failed';
  }[];
  
  timeline: {
    activity: string;
    performedBy: string;
    performedAt: string;
    details: string;
  }[];
}

export interface SupplyChainMetrics {
  tenantId: string;
  
  supplierMetrics: {
    totalSuppliers: number;
    activeSuppliers: number;
    qualifiedSuppliers: number;
    strategicSuppliers: number;
    suppliersByType: {
      type: string;
      count: number;
      percentage: number;
    }[];
    suppliersByRegion: {
      region: string;
      count: number;
      percentage: number;
    }[];
    averageQualificationScore: number;
    averagePerformanceRating: number;
  };
  
  onboardingMetrics: {
    onboardingInProgress: number;
    averageOnboardingTime: number; // days
    onboardingSuccess: number; // percentage
    pendingApprovals: number;
    rejectedApplications: number;
  };
  
  performanceMetrics: {
    averageDeliveryTime: number;
    onTimeDeliveryRate: number;
    qualityScore: number;
    costSavings: number;
    riskExposure: number;
  };
  
  complianceMetrics: {
    overallComplianceRate: number;
    expiringCertifications: number;
    auditsDue: number;
    nonComplianceIssues: number;
  };
  
  financialMetrics: {
    totalSpend: number;
    averagePaymentPeriod: number;
    costSavingsRealized: number;
    budgetVariance: number;
  };
}

export interface SupplierCategory {
  id: string;
  categoryName: string;
  description: string;
  industryType: string;
  subCategories: string[];
  qualificationRequirements: string[];
  performanceKPIs: string[];
  riskFactors: string[];
  complianceRequirements: string[];
}

export interface SupplierDocument {
  documentId: string;
  supplierId: string;
  documentType: string;
  documentName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  uploadedAt: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'superseded';
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: string;
  tags: string[];
  accessLevel: 'public' | 'internal' | 'confidential';
  url: string;
}

export interface SupplierAlert {
  alertId: string;
  tenantId: string;
  supplierId: string;
  supplierName: string;
  alertType: 'performance' | 'compliance' | 'financial' | 'operational' | 'risk';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  triggeredAt: string;
  dueDate?: string;
  status: 'open' | 'in_progress' | 'resolved' | 'dismissed';
  assignedTo?: string;
  resolvedAt?: string;
  resolutionNotes?: string;
  actions: {
    actionType: string;
    description: string;
    dueDate?: string;
    assignee?: string;
    status: 'pending' | 'completed';
  }[];
}
