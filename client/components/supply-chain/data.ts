import {
  TenantSupplyChainConfig,
  TenantSupplier,
  SupplierOnboardingWorkflow,
  SupplyChainMetrics,
  SupplierCategory,
  SupplierAlert
} from './types';

// Mock Tenant Supply Chain Configurations
export const mockTenantSupplyChainConfigs: TenantSupplyChainConfig[] = [
  {
    tenantId: 'tenant_buildcorp',
    tenantName: 'BuildCorp Construction',
    industryType: 'construction',
    defaultCurrency: 'INR',
    operatingRegions: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'],
    complianceStandards: ['ISO 9001', 'ISO 14001', 'OHSAS 18001', 'Green Building Standards'],
    qualificationCriteria: {
      minimumTurnover: 50000000, // 5 Crores
      minimumExperience: 5,
      requiredCertifications: ['ISO 9001', 'MSME Registration'],
      creditRatingRequirement: 'good',
      insuranceRequirement: true,
      financialStabilityScore: 70,
      qualityStandards: ['ISI Mark', 'BIS Standards'],
      complianceRequirements: ['Environmental Clearance', 'Labor Law Compliance']
    },
    supplierCategories: [
      'Raw Materials', 'Construction Equipment', 'Electrical & Electronics',
      'Plumbing & Sanitary', 'Safety Equipment', 'Transportation Services',
      'Labor Contractors', 'Consulting Services'
    ],
    customFields: {
      projectTypes: ['Residential', 'Commercial', 'Infrastructure'],
      preferredRegions: ['Western India', 'Southern India']
    }
  },
  {
    tenantId: 'tenant_metrorealty',
    tenantName: 'Metro Realty Group',
    industryType: 'real_estate',
    defaultCurrency: 'INR',
    operatingRegions: ['Mumbai', 'Navi Mumbai', 'Thane', 'Pune'],
    complianceStandards: ['RERA Compliance', 'Environmental Standards', 'Safety Standards'],
    qualificationCriteria: {
      minimumTurnover: 25000000, // 2.5 Crores
      minimumExperience: 3,
      requiredCertifications: ['Trade License', 'GST Registration'],
      creditRatingRequirement: 'average',
      insuranceRequirement: true,
      financialStabilityScore: 60,
      qualityStandards: ['ISI Mark', 'Quality Assurance'],
      complianceRequirements: ['Environmental Clearance', 'Municipal Approvals']
    },
    supplierCategories: [
      'Construction Materials', 'Interior Design', 'Landscaping',
      'Security Services', 'Maintenance Services', 'Legal Services',
      'Marketing Services', 'Technology Services'
    ],
    customFields: {
      propertyTypes: ['Luxury Apartments', 'Commercial Spaces', 'Retail Outlets'],
      targetMarkets: ['Premium', 'Mid-segment']
    }
  }
];

// Mock Suppliers
export const mockTenantSuppliers: TenantSupplier[] = [
  {
    id: 'supplier_001',
    tenantId: 'tenant_buildcorp',
    supplierCode: 'SUP-001',
    supplierName: 'SteelTech Industries Pvt Ltd',
    legalName: 'SteelTech Industries Private Limited',
    supplierType: 'manufacturer',
    businessCategory: 'Raw Materials',
    subCategories: ['Steel Products', 'TMT Bars', 'Structural Steel'],
    
    contactDetails: {
      primaryContact: 'Rajesh Kumar',
      designation: 'Sales Director',
      email: 'rajesh.kumar@steeltech.com',
      phone: '+91 9876543210',
      alternateContact: 'Priya Sharma',
      alternateEmail: 'priya.sharma@steeltech.com',
      alternatePhone: '+91 9876543211',
      website: 'https://www.steeltech.com',
      linkedIn: 'https://linkedin.com/company/steeltech-industries'
    },
    
    addresses: [
      {
        type: 'registered',
        addressLine1: 'Plot No. 45, Industrial Area Phase-II',
        addressLine2: 'Near MIDC Complex',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411019',
        country: 'India',
        coordinates: { latitude: 18.5679, longitude: 73.9143 }
      },
      {
        type: 'operational',
        addressLine1: 'Manufacturing Unit, Sector 25',
        addressLine2: 'Industrial Complex',
        city: 'Aurangabad',
        state: 'Maharashtra',
        pincode: '431005',
        country: 'India'
      }
    ],
    
    businessDetails: {
      incorporationDate: '2008-03-15',
      businessModel: 'B2B Manufacturing',
      employeeCount: 250,
      annualTurnover: 120000000, // 12 Crores
      currency: 'INR',
      yearsInBusiness: 16,
      marketPresence: ['Maharashtra', 'Gujarat', 'Karnataka', 'Goa'],
      competencies: ['Steel Manufacturing', 'Custom Fabrication', 'Quality Testing'],
      specializations: ['High-Grade TMT Bars', 'Earthquake Resistant Steel', 'Corrosion Resistant Products']
    },
    
    financialInfo: {
      creditRating: 'excellent',
      creditLimit: 5000000,
      creditPeriod: 45,
      paymentTerms: 'net_45',
      bankDetails: {
        bankName: 'HDFC Bank Ltd',
        accountNumber: 'XXXX5678',
        ifscCode: 'HDFC0001234',
        accountType: 'Current Account'
      },
      taxInformation: {
        gstNumber: '27ABCDE1234F1Z5',
        panNumber: 'ABCDE1234F',
        tanNumber: 'PUNE12345D',
        taxExemptions: ['Export Promotion']
      }
    },
    
    certifications: [
      {
        id: 'cert_001',
        certificationType: 'Quality Management',
        certificateName: 'ISO 9001:2015',
        issuingAuthority: 'Bureau Veritas',
        issueDate: '2022-01-15',
        expiryDate: '2025-01-14',
        certificateNumber: 'ISO9001-2022-001',
        status: 'active',
        scope: 'Steel Manufacturing and Quality Control'
      },
      {
        id: 'cert_002',
        certificationType: 'Environmental Management',
        certificateName: 'ISO 14001:2015',
        issuingAuthority: 'TUV India',
        issueDate: '2021-06-10',
        expiryDate: '2024-06-09',
        certificateNumber: 'ISO14001-2021-002',
        status: 'active',
        scope: 'Environmental Management in Manufacturing'
      }
    ],
    
    qualification: {
      qualificationStatus: 'qualified',
      qualificationDate: '2023-01-20',
      qualifiedBy: 'procurement_team',
      qualificationScore: 92,
      criteriaAssessment: [
        { criteria: 'Financial Stability', score: 95, maxScore: 100, remarks: 'Excellent financial health' },
        { criteria: 'Quality Standards', score: 90, maxScore: 100, remarks: 'Strong quality certifications' },
        { criteria: 'Delivery Performance', score: 88, maxScore: 100, remarks: 'Good track record' },
        { criteria: 'Technical Capability', score: 94, maxScore: 100, remarks: 'Advanced manufacturing facility' }
      ],
      nextReviewDate: '2024-01-20'
    },
    
    performance: {
      overallRating: 4.6,
      deliveryPerformance: {
        onTimeDeliveryRate: 88,
        averageLeadTime: 12,
        deliveryAccuracy: 95
      },
      qualityMetrics: {
        qualityRating: 4.8,
        defectRate: 1.2,
        returnRate: 0.8,
        complianceScore: 95
      },
      serviceMetrics: {
        responseTime: 2,
        resolutionTime: 8,
        customerSatisfaction: 4.5,
        supportQuality: 4.4
      },
      financialMetrics: {
        paymentReliability: 4.9,
        costCompetitiveness: 4.2,
        priceStability: 4.6
      }
    },
    
    offerings: {
      categories: ['Steel Products', 'TMT Bars', 'Structural Steel'],
      products: [
        {
          id: 'prod_001',
          productName: 'Fe 550D TMT Bars',
          category: 'TMT Bars',
          specifications: {
            grade: 'Fe 550D',
            sizes: ['8mm', '10mm', '12mm', '16mm', '20mm', '25mm', '32mm'],
            length: '12 meters',
            standard: 'IS 1786:2008'
          },
          unitPrice: 58000,
          minimumOrderQuantity: 10,
          leadTime: 10,
          availability: 'in_stock'
        },
        {
          id: 'prod_002',
          productName: 'Structural Steel Beams',
          category: 'Structural Steel',
          specifications: {
            type: 'I-Beam',
            sizes: ['ISMB 100', 'ISMB 150', 'ISMB 200', 'ISMB 250'],
            material: 'IS 2062 Grade A',
            finish: 'Hot Rolled'
          },
          unitPrice: 65000,
          minimumOrderQuantity: 5,
          leadTime: 15,
          availability: 'made_to_order'
        }
      ],
      services: [
        {
          id: 'service_001',
          serviceName: 'Custom Steel Fabrication',
          serviceType: 'Manufacturing',
          description: 'Custom fabrication of steel components as per drawings',
          pricing: 'project_based',
          availability: ['Monday-Saturday', '8:00 AM - 6:00 PM']
        }
      ]
    },
    
    riskProfile: {
      riskLevel: 'low',
      riskFactors: ['Market Price Volatility', 'Raw Material Dependency'],
      mitigationMeasures: ['Price Lock Agreements', 'Multiple Raw Material Sources'],
      insuranceDetails: [
        {
          providerName: 'ICICI Lombard',
          policyNumber: 'POL123456789',
          coverage: 50000000,
          expiryDate: '2024-12-31',
          coverageTypes: ['Product Liability', 'Public Liability', 'Workers Compensation']
        }
      ],
      businessContinuityPlan: true,
      backupSuppliers: ['Steel Corp Ltd', 'Metro Steel Industries']
    },
    
    relationship: {
      supplierTier: 'tier_1',
      relationshipManager: 'Amit Patel',
      engagementLevel: 'strategic',
      contractType: 'master_agreement',
      contractDetails: {
        contractNumber: 'MSA-2023-001',
        startDate: '2023-01-01',
        endDate: '2025-12-31',
        autoRenewal: true,
        terms: ['Exclusive pricing for bulk orders', 'Priority delivery', 'Technical support']
      },
      collaborationAreas: ['Product Development', 'Quality Improvement', 'Cost Optimization'],
      developmentPrograms: ['Supplier Excellence Program', 'Innovation Partnership']
    },
    
    operational: {
      operatingHours: 'Monday-Saturday: 8:00 AM - 6:00 PM',
      timeZone: 'IST (UTC+5:30)',
      holidayCalendar: ['Republic Day', 'Independence Day', 'Diwali', 'Holi'],
      emergencyContacts: [
        {
          name: 'Suresh Patil',
          designation: 'Plant Manager',
          phone: '+91 9876543212',
          email: 'suresh.patil@steeltech.com'
        }
      ],
      supportedCommunicationChannels: ['Email', 'Phone', 'WhatsApp', 'Portal'],
      preferredOrderMethods: ['EDI', 'Email', 'Portal'],
      invoicingPreferences: {
        format: 'pdf',
        frequency: 'per_delivery',
        currency: 'INR'
      }
    },
    
    auditTrail: {
      lastAuditDate: '2023-06-15',
      nextAuditDate: '2024-06-15',
      auditFrequency: 'annual',
      auditResults: [
        {
          auditDate: '2023-06-15',
          auditType: 'Quality Audit',
          score: 92,
          findings: ['Minor documentation gaps', 'Excellent manufacturing processes'],
          correctiveActions: ['Update procedure documents', 'Staff training on new standards'],
          status: 'passed'
        }
      ],
      complianceStatus: [
        {
          requirement: 'ISO 9001:2015',
          status: 'compliant',
          lastChecked: '2023-06-15',
          expiryDate: '2025-01-14'
        },
        {
          requirement: 'Environmental Clearance',
          status: 'compliant',
          lastChecked: '2023-08-20',
          expiryDate: '2025-08-19'
        }
      ]
    },
    
    status: 'active',
    isPreferredSupplier: true,
    isStrategicSupplier: true,
    tags: ['Strategic Partner', 'Quality Supplier', 'Tier 1'],
    notes: 'Excellent long-term partner with consistent quality and delivery performance.',
    
    createdAt: '2023-01-15T09:30:00Z',
    createdBy: 'procurement_manager',
    lastUpdatedAt: '2024-01-10T14:22:00Z',
    lastUpdatedBy: 'relationship_manager',
    version: 3
  },
  {
    id: 'supplier_002',
    tenantId: 'tenant_buildcorp',
    supplierCode: 'SUP-002',
    supplierName: 'LogiFlow Express',
    legalName: 'LogiFlow Express Private Limited',
    supplierType: '3pl',
    businessCategory: 'Transportation Services',
    subCategories: ['Heavy Vehicle Transport', 'Last Mile Delivery', 'Warehousing'],
    
    contactDetails: {
      primaryContact: 'Vikram Singh',
      designation: 'Operations Manager',
      email: 'vikram.singh@logiflow.com',
      phone: '+91 9876543220',
      website: 'https://www.logiflow.com'
    },
    
    addresses: [
      {
        type: 'registered',
        addressLine1: 'Transport Hub, Sector 18',
        city: 'Gurgaon',
        state: 'Haryana',
        pincode: '122015',
        country: 'India'
      }
    ],
    
    businessDetails: {
      incorporationDate: '2015-08-20',
      businessModel: 'Logistics & Transportation',
      employeeCount: 150,
      annualTurnover: 45000000,
      currency: 'INR',
      yearsInBusiness: 9,
      marketPresence: ['Delhi NCR', 'Mumbai', 'Pune', 'Bangalore'],
      competencies: ['Fleet Management', 'Route Optimization', 'Real-time Tracking'],
      specializations: ['Construction Material Transport', 'Heavy Equipment Moving', 'Project Logistics']
    },
    
    financialInfo: {
      creditRating: 'good',
      creditLimit: 2000000,
      creditPeriod: 30,
      paymentTerms: 'net_30',
      bankDetails: {
        bankName: 'Axis Bank Ltd',
        accountNumber: 'XXXX9876',
        ifscCode: 'UTIB0001234',
        accountType: 'Current Account'
      },
      taxInformation: {
        gstNumber: '06ABCDE5678G1Z5',
        panNumber: 'ABCDE5678G'
      }
    },
    
    certifications: [
      {
        id: 'cert_003',
        certificationType: 'Transportation',
        certificateName: 'All India Motor Transport Permit',
        issuingAuthority: 'Regional Transport Authority',
        issueDate: '2023-01-01',
        expiryDate: '2024-12-31',
        certificateNumber: 'AIMT-2023-001',
        status: 'active'
      }
    ],
    
    qualification: {
      qualificationStatus: 'qualified',
      qualificationDate: '2023-03-10',
      qualifiedBy: 'logistics_team',
      qualificationScore: 78,
      criteriaAssessment: [
        { criteria: 'Fleet Quality', score: 80, maxScore: 100 },
        { criteria: 'Safety Record', score: 85, maxScore: 100 },
        { criteria: 'Technology Integration', score: 70, maxScore: 100 },
        { criteria: 'Cost Competitiveness', score: 78, maxScore: 100 }
      ],
      nextReviewDate: '2024-03-10'
    },
    
    performance: {
      overallRating: 4.2,
      deliveryPerformance: {
        onTimeDeliveryRate: 92,
        averageLeadTime: 2,
        deliveryAccuracy: 96
      },
      qualityMetrics: {
        qualityRating: 4.3,
        defectRate: 0.5,
        returnRate: 0.2,
        complianceScore: 88
      },
      serviceMetrics: {
        responseTime: 1,
        resolutionTime: 4,
        customerSatisfaction: 4.4,
        supportQuality: 4.2
      },
      financialMetrics: {
        paymentReliability: 4.6,
        costCompetitiveness: 4.0,
        priceStability: 4.3
      }
    },
    
    offerings: {
      categories: ['Transportation', 'Logistics', 'Warehousing'],
      products: [],
      services: [
        {
          id: 'service_002',
          serviceName: 'Heavy Vehicle Transport',
          serviceType: 'Transportation',
          description: 'Transportation of heavy construction materials and equipment',
          pricing: 'fixed',
          rate: 25,
          availability: ['24x7']
        },
        {
          id: 'service_003',
          serviceName: 'Warehousing Services',
          serviceType: 'Storage',
          description: 'Temporary storage and inventory management',
          pricing: 'fixed',
          rate: 15,
          availability: ['Monday-Saturday']
        }
      ]
    },
    
    riskProfile: {
      riskLevel: 'medium',
      riskFactors: ['Fuel Price Volatility', 'Driver Availability', 'Vehicle Breakdowns'],
      mitigationMeasures: ['Fuel Hedging', 'Driver Pool Management', 'Regular Maintenance'],
      insuranceDetails: [
        {
          providerName: 'Bajaj Allianz',
          policyNumber: 'TRN123456789',
          coverage: 20000000,
          expiryDate: '2024-10-31',
          coverageTypes: ['Vehicle Insurance', 'Goods in Transit', 'Third Party Liability']
        }
      ],
      businessContinuityPlan: true
    },
    
    relationship: {
      supplierTier: 'tier_2',
      relationshipManager: 'Neha Gupta',
      engagementLevel: 'preferred',
      contractType: 'project_based',
      collaborationAreas: ['Route Optimization', 'Technology Integration'],
      developmentPrograms: ['Digital Transformation Program']
    },
    
    operational: {
      operatingHours: '24x7 Operations Available',
      timeZone: 'IST (UTC+5:30)',
      holidayCalendar: ['Republic Day', 'Independence Day'],
      emergencyContacts: [
        {
          name: 'Ravi Kumar',
          designation: 'Fleet Manager',
          phone: '+91 9876543221',
          email: 'ravi.kumar@logiflow.com'
        }
      ],
      supportedCommunicationChannels: ['Phone', 'WhatsApp', 'GPS Tracking'],
      preferredOrderMethods: ['Phone', 'Mobile App'],
      invoicingPreferences: {
        format: 'pdf',
        frequency: 'weekly',
        currency: 'INR'
      }
    },
    
    auditTrail: {
      lastAuditDate: '2023-09-20',
      nextAuditDate: '2024-09-20',
      auditFrequency: 'annual',
      auditResults: [
        {
          auditDate: '2023-09-20',
          auditType: 'Safety Audit',
          score: 85,
          findings: ['Good safety practices', 'Need driver training updates'],
          correctiveActions: ['Enhanced driver training program'],
          status: 'passed'
        }
      ],
      complianceStatus: [
        {
          requirement: 'Transport Permit',
          status: 'compliant',
          lastChecked: '2023-09-20',
          expiryDate: '2024-12-31'
        }
      ]
    },
    
    status: 'active',
    isPreferredSupplier: true,
    isStrategicSupplier: false,
    tags: ['Logistics Partner', 'Reliable Service'],
    notes: 'Good logistics partner with reliable service and competitive pricing.',
    
    createdAt: '2023-03-01T10:15:00Z',
    createdBy: 'logistics_manager',
    lastUpdatedAt: '2024-01-05T16:45:00Z',
    lastUpdatedBy: 'relationship_manager',
    version: 2
  }
];

// Mock Onboarding Workflows
export const mockOnboardingWorkflows: SupplierOnboardingWorkflow[] = [
  {
    workflowId: 'workflow_001',
    tenantId: 'tenant_buildcorp',
    supplierId: 'supplier_003',
    supplierName: 'New Steel Suppliers Ltd',
    initiatedBy: 'procurement_manager',
    initiatedAt: '2024-01-15T09:00:00Z',
    targetCompletionDate: '2024-02-15T17:00:00Z',
    currentStep: 3,
    overallProgress: 65,
    status: 'in_progress',
    priority: 'medium',
    
    steps: [
      {
        stepId: 'step_001',
        stepName: 'Initial Registration',
        description: 'Basic company information and contact details',
        isRequired: true,
        isCompleted: true,
        completedBy: 'supplier_user',
        completedAt: '2024-01-16T10:30:00Z',
        documents: [
          {
            documentType: 'incorporation_certificate',
            documentName: 'Certificate of Incorporation',
            isRequired: true,
            isUploaded: true,
            uploadedAt: '2024-01-16T10:30:00Z',
            status: 'verified'
          }
        ],
        formFields: [
          {
            fieldName: 'company_name',
            fieldType: 'text',
            isRequired: true,
            value: 'New Steel Suppliers Ltd'
          }
        ]
      },
      {
        stepId: 'step_002',
        stepName: 'Financial Information',
        description: 'Banking details, financial statements, and tax information',
        isRequired: true,
        isCompleted: true,
        completedBy: 'supplier_user',
        completedAt: '2024-01-20T14:15:00Z',
        documents: [
          {
            documentType: 'financial_statements',
            documentName: 'Audited Financial Statements',
            isRequired: true,
            isUploaded: true,
            uploadedAt: '2024-01-20T14:15:00Z',
            status: 'verified'
          },
          {
            documentType: 'bank_certificate',
            documentName: 'Bank Account Certificate',
            isRequired: true,
            isUploaded: true,
            uploadedAt: '2024-01-20T14:20:00Z',
            status: 'verified'
          }
        ],
        formFields: []
      },
      {
        stepId: 'step_003',
        stepName: 'Technical Qualification',
        description: 'Product samples, technical specifications, and quality certifications',
        isRequired: true,
        isCompleted: false,
        documents: [
          {
            documentType: 'product_catalog',
            documentName: 'Product Catalog & Specifications',
            isRequired: true,
            isUploaded: true,
            uploadedAt: '2024-01-25T11:00:00Z',
            status: 'pending'
          },
          {
            documentType: 'quality_certificates',
            documentName: 'Quality Certifications',
            isRequired: true,
            isUploaded: false,
            status: 'pending'
          }
        ],
        formFields: []
      }
    ],
    
    approvals: [
      {
        approvalLevel: 'Technical Team',
        approver: 'technical_manager',
        status: 'pending',
        comments: 'Awaiting product sample evaluation'
      },
      {
        approvalLevel: 'Procurement Head',
        approver: 'procurement_head',
        status: 'pending'
      }
    ],
    
    notifications: [
      {
        notificationType: 'step_completion',
        recipients: ['procurement_manager', 'technical_manager'],
        sentAt: '2024-01-20T14:30:00Z',
        status: 'delivered'
      }
    ],
    
    timeline: [
      {
        activity: 'Workflow Initiated',
        performedBy: 'procurement_manager',
        performedAt: '2024-01-15T09:00:00Z',
        details: 'Supplier onboarding workflow started'
      },
      {
        activity: 'Step 1 Completed',
        performedBy: 'supplier_user',
        performedAt: '2024-01-16T10:30:00Z',
        details: 'Initial registration completed with all required documents'
      },
      {
        activity: 'Step 2 Completed',
        performedBy: 'supplier_user',
        performedAt: '2024-01-20T14:15:00Z',
        details: 'Financial information submitted and verified'
      }
    ]
  }
];

// Mock Supply Chain Metrics
export const mockSupplyChainMetrics: SupplyChainMetrics[] = [
  {
    tenantId: 'tenant_buildcorp',
    
    supplierMetrics: {
      totalSuppliers: 45,
      activeSuppliers: 38,
      qualifiedSuppliers: 35,
      strategicSuppliers: 8,
      suppliersByType: [
        { type: 'Manufacturer', count: 18, percentage: 40 },
        { type: 'Distributor', count: 12, percentage: 27 },
        { type: 'Vendor', count: 8, percentage: 18 },
        { type: '3PL', count: 4, percentage: 9 },
        { type: 'Service Provider', count: 3, percentage: 6 }
      ],
      suppliersByRegion: [
        { region: 'Maharashtra', count: 15, percentage: 33 },
        { region: 'Gujarat', count: 10, percentage: 22 },
        { region: 'Karnataka', count: 8, percentage: 18 },
        { region: 'Delhi NCR', count: 7, percentage: 16 },
        { region: 'Others', count: 5, percentage: 11 }
      ],
      averageQualificationScore: 82,
      averagePerformanceRating: 4.2
    },
    
    onboardingMetrics: {
      onboardingInProgress: 6,
      averageOnboardingTime: 28,
      onboardingSuccess: 85,
      pendingApprovals: 4,
      rejectedApplications: 2
    },
    
    performanceMetrics: {
      averageDeliveryTime: 14,
      onTimeDeliveryRate: 88,
      qualityScore: 4.3,
      costSavings: 2500000,
      riskExposure: 15
    },
    
    complianceMetrics: {
      overallComplianceRate: 92,
      expiringCertifications: 8,
      auditsDue: 5,
      nonComplianceIssues: 3
    },
    
    financialMetrics: {
      totalSpend: 250000000,
      averagePaymentPeriod: 35,
      costSavingsRealized: 5000000,
      budgetVariance: -2.5
    }
  }
];

// Mock Supplier Categories
export const mockSupplierCategories: SupplierCategory[] = [
  {
    id: 'cat_001',
    categoryName: 'Raw Materials',
    description: 'Suppliers providing raw materials for construction',
    industryType: 'construction',
    subCategories: ['Steel', 'Cement', 'Aggregates', 'Sand', 'Bricks', 'Tiles'],
    qualificationRequirements: ['ISO 9001', 'Quality Testing Lab', 'BIS Certification'],
    performanceKPIs: ['Quality Rating', 'Delivery Performance', 'Cost Competitiveness'],
    riskFactors: ['Price Volatility', 'Supply Disruption', 'Quality Issues'],
    complianceRequirements: ['Environmental Clearance', 'Mining Permits', 'Quality Standards']
  },
  {
    id: 'cat_002',
    categoryName: 'Transportation Services',
    description: 'Logistics and transportation service providers',
    industryType: 'construction',
    subCategories: ['Heavy Vehicle Transport', 'Material Handling', 'Equipment Moving'],
    qualificationRequirements: ['Transport License', 'Vehicle Insurance', 'Driver Certification'],
    performanceKPIs: ['On-time Delivery', 'Safety Record', 'Cost per KM'],
    riskFactors: ['Vehicle Breakdown', 'Driver Availability', 'Fuel Price Changes'],
    complianceRequirements: ['Transport Permits', 'Safety Standards', 'Insurance Coverage']
  }
];

// Mock Supplier Alerts
export const mockSupplierAlerts: SupplierAlert[] = [
  {
    alertId: 'alert_001',
    tenantId: 'tenant_buildcorp',
    supplierId: 'supplier_001',
    supplierName: 'SteelTech Industries Pvt Ltd',
    alertType: 'compliance',
    severity: 'medium',
    title: 'ISO 14001 Certificate Expiring Soon',
    description: 'ISO 14001:2015 certificate expires in 60 days',
    triggeredAt: '2024-01-10T08:00:00Z',
    dueDate: '2024-03-10T23:59:59Z',
    status: 'open',
    assignedTo: 'compliance_manager',
    actions: [
      {
        actionType: 'renewal_reminder',
        description: 'Send renewal reminder to supplier',
        dueDate: '2024-01-15T17:00:00Z',
        assignee: 'compliance_manager',
        status: 'pending'
      },
      {
        actionType: 'follow_up',
        description: 'Follow up on renewal progress',
        dueDate: '2024-02-01T17:00:00Z',
        assignee: 'relationship_manager',
        status: 'pending'
      }
    ]
  },
  {
    alertId: 'alert_002',
    tenantId: 'tenant_buildcorp',
    supplierId: 'supplier_002',
    supplierName: 'LogiFlow Express',
    alertType: 'performance',
    severity: 'high',
    title: 'Delivery Performance Below Threshold',
    description: 'On-time delivery rate dropped to 85% (threshold: 90%)',
    triggeredAt: '2024-01-08T10:30:00Z',
    status: 'in_progress',
    assignedTo: 'logistics_manager',
    actions: [
      {
        actionType: 'performance_review',
        description: 'Schedule performance review meeting',
        dueDate: '2024-01-12T17:00:00Z',
        assignee: 'logistics_manager',
        status: 'completed'
      },
      {
        actionType: 'improvement_plan',
        description: 'Develop performance improvement plan',
        dueDate: '2024-01-20T17:00:00Z',
        assignee: 'relationship_manager',
        status: 'pending'
      }
    ]
  }
];

// Helper functions to get tenant-specific data
export const getTenantSupplyChainConfig = (tenantId: string): TenantSupplyChainConfig | undefined => {
  return mockTenantSupplyChainConfigs.find(config => config.tenantId === tenantId);
};

export const getTenantSuppliers = (tenantId: string): TenantSupplier[] => {
  return mockTenantSuppliers.filter(supplier => supplier.tenantId === tenantId);
};

export const getTenantOnboardingWorkflows = (tenantId: string): SupplierOnboardingWorkflow[] => {
  return mockOnboardingWorkflows.filter(workflow => workflow.tenantId === tenantId);
};

export const getTenantSupplyChainMetrics = (tenantId: string): SupplyChainMetrics | undefined => {
  return mockSupplyChainMetrics.find(metrics => metrics.tenantId === tenantId);
};

export const getSupplierCategories = (industryType: string): SupplierCategory[] => {
  return mockSupplierCategories.filter(category => category.industryType === industryType);
};

export const getTenantSupplierAlerts = (tenantId: string): SupplierAlert[] => {
  return mockSupplierAlerts.filter(alert => alert.tenantId === tenantId);
};

export const getSupplierById = (supplierId: string): TenantSupplier | undefined => {
  return mockTenantSuppliers.find(supplier => supplier.id === supplierId);
};

export const getIndustrySpecificSupplierTypes = (industryType: string) => {
  const typesByIndustry = {
    construction: [
      { value: 'manufacturer', label: 'Manufacturer', description: 'Raw material manufacturers' },
      { value: 'distributor', label: 'Distributor', description: 'Material distributors' },
      { value: 'contractor', label: 'Contractor', description: 'Labor contractors' },
      { value: '3pl', label: '3PL Provider', description: 'Transportation & logistics' },
      { value: 'service_provider', label: 'Service Provider', description: 'Consulting & other services' }
    ],
    real_estate: [
      { value: 'vendor', label: 'Vendor', description: 'Service vendors' },
      { value: 'contractor', label: 'Contractor', description: 'Construction contractors' },
      { value: 'service_provider', label: 'Service Provider', description: 'Professional services' },
      { value: 'manufacturer', label: 'Manufacturer', description: 'Equipment manufacturers' }
    ]
  };
  
  return typesByIndustry[industryType] || typesByIndustry.construction;
};
