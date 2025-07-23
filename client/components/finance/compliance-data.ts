// Mock Data for Tax & Compliance Module

import {
  GSTReturn,
  TDSReturn,
  ITReturn,
  LabourCompliance,
  EnvironmentalCompliance,
  IndustryCompliance,
  ComplianceCalendar,
  ComplianceEntry,
  TaxConfiguration,
  ComplianceAnalytics,
  ComplianceDocument,
  GSTReturnType,
  ITReturnType,
  LabourComplianceType,
  EnvironmentalComplianceType,
  IndustryType,
  HSNCode,
  TDSRate,
  ComplianceReport,
} from "./compliance-types";

// Tax Configuration by Tenant
export const taxConfigurations: TaxConfiguration[] = [
  {
    id: "tax_config_buildcorp",
    tenantId: "tenant_buildcorp",
    gstNumber: "07AABCU9603R1ZX",
    gstRegistrationDate: "2023-04-01",
    gstType: "regular",
    tanNumber: "DELB12345E",
    tdsApplicable: true,
    panNumber: "AABCU9603R",
    itAssessmentYear: "2024-25",
    cinNumber: "U45201DL2020PTC123456",
    pfNumber: "DL/CPM/26293",
    esiNumber: "22000019550000999",
    hsncodes: [
      {
        code: "9954",
        description: "Construction Services",
        gstRate: 18,
        isActive: true,
      },
      { code: "2501", description: "Cement", gstRate: 28, isActive: true },
      {
        code: "7214",
        description: "Iron & Steel Bars",
        gstRate: 18,
        isActive: true,
      },
    ],
    tdsRates: [
      {
        section: "194C",
        description: "Payments to Contractors",
        rate: 1,
        thresholdLimit: 30000,
        isActive: true,
      },
      {
        section: "194J",
        description: "Professional Services",
        rate: 10,
        thresholdLimit: 30000,
        isActive: true,
      },
      {
        section: "194I",
        description: "Rent",
        rate: 10,
        thresholdLimit: 180000,
        isActive: true,
      },
    ],
    isActive: true,
    createdAt: "2023-04-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "tax_config_proptech",
    tenantId: "tenant_proptech",
    gstNumber: "09BBCDE1234F2Z5",
    gstRegistrationDate: "2023-01-01",
    gstType: "regular",
    tanNumber: "MUMH45678F",
    tdsApplicable: true,
    panNumber: "BBCDE1234F",
    itAssessmentYear: "2024-25",
    cinNumber: "U70100MH2019PTC654321",
    drugLicense: "DL-MH-2023-001234",
    hsncodes: [
      {
        code: "997212",
        description: "Residential Rental Services",
        gstRate: 18,
        isActive: true,
      },
      {
        code: "997213",
        description: "Commercial Rental Services",
        gstRate: 18,
        isActive: true,
      },
    ],
    tdsRates: [
      {
        section: "194I",
        description: "Rent",
        rate: 10,
        thresholdLimit: 180000,
        isActive: true,
      },
      {
        section: "194J",
        description: "Professional Services",
        rate: 10,
        thresholdLimit: 30000,
        isActive: true,
      },
    ],
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "tax_config_techcorp",
    tenantId: "tenant_techcorp",
    gstNumber: "29ABCDE1234F1Z5",
    gstRegistrationDate: "2020-04-01",
    gstType: "regular",
    tanNumber: "BANB78901G",
    tdsApplicable: true,
    panNumber: "ABCDE1234F",
    itAssessmentYear: "2024-25",
    cinNumber: "U72200KA2020PTC987654",
    hsncodes: [
      {
        code: "998313",
        description: "Software Development",
        gstRate: 18,
        isActive: true,
      },
      {
        code: "998314",
        description: "IT Consulting",
        gstRate: 18,
        isActive: true,
      },
      {
        code: "998315",
        description: "Digital Marketing",
        gstRate: 18,
        isActive: true,
      },
    ],
    tdsRates: [
      {
        section: "194J",
        description: "Professional Services",
        rate: 10,
        thresholdLimit: 30000,
        isActive: true,
      },
      {
        section: "194C",
        description: "Payments to Contractors",
        rate: 2,
        thresholdLimit: 30000,
        isActive: true,
      },
    ],
    isActive: true,
    createdAt: "2020-04-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
];

// GST Returns Data
export const gstReturns: GSTReturn[] = [
  {
    id: "gst_return_001",
    tenantId: "tenant_buildcorp",
    returnType: "gstr3b",
    period: "2024-01",
    gstNumber: "07AABCU9603R1ZX",
    status: "filed",
    filingDate: "2024-02-18",
    dueDate: "2024-02-20",
    totalSales: 12500000,
    taxableSales: 10500000,
    exemptSales: 2000000,
    nilRatedSales: 0,
    cgstAmount: 945000,
    sgstAmount: 945000,
    igstAmount: 0,
    cessAmount: 0,
    totalTaxCollected: 1890000,
    itcClaimed: 850000,
    itcReversed: 25000,
    netItc: 825000,
    taxPayable: 1065000,
    interestPayable: 0,
    penaltyPayable: 0,
    totalPayment: 1065000,
    filedBy: "CA Sharma",
    acknowledgmentNumber: "ARN123456789012345",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-18T16:45:00Z",
  },
  {
    id: "gst_return_002",
    tenantId: "tenant_buildcorp",
    returnType: "gstr1",
    period: "2024-01",
    gstNumber: "07AABCU9603R1ZX",
    status: "filed",
    filingDate: "2024-02-10",
    dueDate: "2024-02-11",
    totalSales: 12500000,
    taxableSales: 10500000,
    exemptSales: 2000000,
    nilRatedSales: 0,
    cgstAmount: 945000,
    sgstAmount: 945000,
    igstAmount: 0,
    cessAmount: 0,
    totalTaxCollected: 1890000,
    itcClaimed: 0,
    itcReversed: 0,
    netItc: 0,
    taxPayable: 0,
    interestPayable: 0,
    penaltyPayable: 0,
    totalPayment: 0,
    filedBy: "CA Sharma",
    acknowledgmentNumber: "ARN123456789012346",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-10T14:30:00Z",
  },
  {
    id: "gst_return_003",
    tenantId: "tenant_techcorp",
    returnType: "gstr3b",
    period: "2024-01",
    gstNumber: "29ABCDE1234F1Z5",
    status: "pending",
    dueDate: "2024-02-20",
    totalSales: 8500000,
    taxableSales: 8500000,
    exemptSales: 0,
    nilRatedSales: 0,
    cgstAmount: 765000,
    sgstAmount: 765000,
    igstAmount: 0,
    cessAmount: 0,
    totalTaxCollected: 1530000,
    itcClaimed: 450000,
    itcReversed: 15000,
    netItc: 435000,
    taxPayable: 1095000,
    interestPayable: 0,
    penaltyPayable: 0,
    totalPayment: 1095000,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-15T10:00:00Z",
  },
];

// TDS Returns Data
export const tdsReturns: TDSReturn[] = [
  {
    id: "tds_return_001",
    tenantId: "tenant_buildcorp",
    quarter: "Q3",
    financialYear: "2023-24",
    tanNumber: "DELB12345E",
    status: "filed",
    filingDate: "2024-01-15",
    dueDate: "2024-01-31",
    totalDeductions: 2850000,
    totalDeposited: 2850000,
    interestPayable: 0,
    penaltyPayable: 0,
    challans: [
      {
        id: "challan_001",
        challanNumber: "0123456789",
        bsrCode: "0123456",
        bankName: "State Bank of India",
        depositDate: "2024-01-10",
        amount: 1500000,
        taxType: "194C",
      },
      {
        id: "challan_002",
        challanNumber: "0123456790",
        bsrCode: "0123456",
        bankName: "State Bank of India",
        depositDate: "2024-01-12",
        amount: 850000,
        taxType: "194J",
      },
      {
        id: "challan_003",
        challanNumber: "0123456791",
        bsrCode: "0123456",
        bankName: "State Bank of India",
        depositDate: "2024-01-14",
        amount: 500000,
        taxType: "194I",
      },
    ],
    etdsToken: "ETDS123456789",
    acknowledgmentNumber: "TDS123456789012345",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T15:30:00Z",
  },
  {
    id: "tds_return_002",
    tenantId: "tenant_techcorp",
    quarter: "Q4",
    financialYear: "2023-24",
    tanNumber: "BANB78901G",
    status: "pending",
    dueDate: "2024-04-30",
    totalDeductions: 1250000,
    totalDeposited: 1100000,
    interestPayable: 5000,
    penaltyPayable: 2500,
    challans: [
      {
        id: "challan_003",
        challanNumber: "0987654321",
        bsrCode: "0987654",
        bankName: "HDFC Bank",
        depositDate: "2024-03-15",
        amount: 750000,
        taxType: "194J",
      },
      {
        id: "challan_004",
        challanNumber: "0987654322",
        bsrCode: "0987654",
        bankName: "HDFC Bank",
        depositDate: "2024-03-20",
        amount: 350000,
        taxType: "194C",
      },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-25T10:00:00Z",
  },
];

// Income Tax Returns Data
export const itReturns: ITReturn[] = [
  {
    id: "it_return_001",
    tenantId: "tenant_buildcorp",
    assessmentYear: "2023-24",
    returnType: "itr3",
    panNumber: "AABCU9603R",
    status: "filed",
    filingDate: "2023-10-15",
    dueDate: "2023-10-31",
    businessIncome: 45000000,
    salaryIncome: 0,
    capitalGains: 2500000,
    otherSources: 500000,
    totalIncome: 48000000,
    standardDeduction: 0,
    section80Deductions: 1500000,
    totalDeductions: 1500000,
    taxableIncome: 46500000,
    taxLiability: 13950000,
    taxPaid: 14000000,
    refundDue: 50000,
    itrPassword: "ITR@2023",
    acknowledgmentNumber: "IT123456789012345",
    verificationCode: "123456",
    createdAt: "2023-07-01T00:00:00Z",
    updatedAt: "2023-10-15T18:00:00Z",
  },
  {
    id: "it_return_002",
    tenantId: "tenant_techcorp",
    assessmentYear: "2024-25",
    returnType: "itr3",
    panNumber: "ABCDE1234F",
    status: "pending",
    dueDate: "2024-10-31",
    businessIncome: 35000000,
    salaryIncome: 0,
    capitalGains: 1000000,
    otherSources: 200000,
    totalIncome: 36200000,
    standardDeduction: 0,
    section80Deductions: 1200000,
    totalDeductions: 1200000,
    taxableIncome: 35000000,
    taxLiability: 10500000,
    taxPaid: 9500000,
    refundDue: 0,
    createdAt: "2024-04-01T00:00:00Z",
    updatedAt: "2024-08-15T10:00:00Z",
  },
];

// Labour Compliance Data
export const labourCompliances: LabourCompliance[] = [
  {
    id: "labour_001",
    tenantId: "tenant_buildcorp",
    complianceType: "pf_return",
    period: "2024-01",
    status: "filed",
    dueDate: "2024-02-15",
    filingDate: "2024-02-10",
    totalEmployees: 125,
    maleEmployees: 98,
    femaleEmployees: 27,
    contractEmployees: 45,
    pfContribution: 450000,
    attachments: [
      {
        id: "doc_001",
        name: "PF_Return_Jan_2024.pdf",
        type: "pdf",
        size: 1024000,
        uploadDate: "2024-02-10",
        uploadedBy: "HR Manager",
        url: "/documents/pf_return_jan_2024.pdf",
        isRequired: true,
      },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-02-10T14:30:00Z",
  },
  {
    id: "labour_002",
    tenantId: "tenant_buildcorp",
    complianceType: "esi_return",
    period: "2024-01",
    status: "filed",
    dueDate: "2024-02-21",
    filingDate: "2024-02-18",
    totalEmployees: 125,
    maleEmployees: 98,
    femaleEmployees: 27,
    contractEmployees: 45,
    esiContribution: 185000,
    attachments: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-02-18T16:00:00Z",
  },
  {
    id: "labour_003",
    tenantId: "tenant_techcorp",
    complianceType: "professional_tax",
    period: "2024-01",
    status: "pending",
    dueDate: "2024-02-15",
    totalEmployees: 85,
    maleEmployees: 58,
    femaleEmployees: 27,
    contractEmployees: 15,
    attachments: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
];

// Environmental Compliance Data
export const environmentalCompliances: EnvironmentalCompliance[] = [
  {
    id: "env_001",
    tenantId: "tenant_buildcorp",
    complianceType: "pollution_clearance",
    period: "2024",
    status: "filed",
    dueDate: "2024-03-31",
    airEmissions: 850,
    waterDischarge: 1200,
    wasteGenerated: 2500,
    energyConsumption: 15000,
    pollutionClearance: true,
    environmentalAudit: true,
    wasteManagementPlan: true,
    attachments: [
      {
        id: "env_doc_001",
        name: "Pollution_Clearance_Certificate.pdf",
        type: "pdf",
        size: 2048000,
        uploadDate: "2024-01-15",
        uploadedBy: "Environmental Officer",
        url: "/documents/pollution_clearance_2024.pdf",
        isRequired: true,
      },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
];

// Industry-Specific Compliance Data
export const industryCompliances: IndustryCompliance[] = [
  {
    id: "ind_001",
    tenantId: "tenant_buildcorp",
    industryType: "construction",
    complianceType: "rera_registration",
    period: "2024",
    status: "filed",
    dueDate: "2024-03-31",
    specificData: {
      reraNumber: "RERA/2024/001234",
      projectsRegistered: 5,
      totalProjectValue: 2500000000,
      escrowAccountMaintained: true,
    },
    attachments: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-20T15:00:00Z",
  },
  {
    id: "ind_002",
    tenantId: "tenant_techcorp",
    industryType: "technology",
    complianceType: "data_protection_compliance",
    period: "2024",
    status: "pending",
    dueDate: "2024-06-30",
    specificData: {
      dataProtectionOfficer: "DPO Appointed",
      privacyPolicyUpdated: true,
      dataMappingCompleted: false,
      auditScheduled: "2024-04-15",
    },
    attachments: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
];

// Compliance Calendar Data
export const complianceCalendars: ComplianceCalendar[] = [
  {
    id: "calendar_buildcorp_2024",
    tenantId: "tenant_buildcorp",
    year: 2024,
    entries: [
      {
        id: "entry_001",
        complianceType: "gstr3b",
        description: "GST Return GSTR-3B Filing",
        frequency: "monthly",
        dueDate: "2024-02-20",
        status: "filed",
        priority: "high",
        penalty: 10000,
        isRecurring: true,
        reminders: [
          {
            id: "rem_001",
            type: "email",
            daysBefore: 5,
            isActive: true,
          },
          {
            id: "rem_002",
            type: "notification",
            daysBefore: 2,
            isActive: true,
          },
        ],
      },
      {
        id: "entry_002",
        complianceType: "tds_return",
        description: "TDS Return Quarterly Filing",
        frequency: "quarterly",
        dueDate: "2024-04-30",
        status: "pending",
        priority: "high",
        penalty: 25000,
        isRecurring: true,
        reminders: [
          {
            id: "rem_003",
            type: "email",
            daysBefore: 15,
            isActive: true,
          },
        ],
      },
      {
        id: "entry_003",
        complianceType: "pf_return",
        description: "PF Monthly Return",
        frequency: "monthly",
        dueDate: "2024-02-15",
        status: "filed",
        priority: "medium",
        isRecurring: true,
        reminders: [],
      },
      {
        id: "entry_004",
        complianceType: "environmental_audit",
        description: "Environmental Compliance Audit",
        frequency: "annually",
        dueDate: "2024-12-31",
        status: "pending",
        priority: "medium",
        isRecurring: true,
        reminders: [],
      },
    ],
  },
];

// Compliance Analytics Data
export const complianceAnalytics: ComplianceAnalytics[] = [
  {
    tenantId: "tenant_buildcorp",
    period: "2024-Q1",
    totalCompliances: 45,
    completedCompliances: 38,
    pendingCompliances: 5,
    overdueCompliances: 2,
    totalTaxPaid: 18500000,
    gstPaid: 12500000,
    tdsPaid: 4500000,
    incomeTaxPaid: 1500000,
    totalPenalties: 25000,
    totalInterest: 8500,
    complianceScore: 84.4,
    industryBenchmark: 78.2,
    monthlyTrends: [
      {
        month: "2024-01",
        compliances: 15,
        penalties: 0,
        taxPaid: 6200000,
        score: 88.5,
      },
      {
        month: "2024-02",
        compliances: 14,
        penalties: 15000,
        taxPaid: 5800000,
        score: 82.3,
      },
      {
        month: "2024-03",
        compliances: 16,
        penalties: 10000,
        taxPaid: 6500000,
        score: 86.1,
      },
    ],
    calculatedAt: "2024-03-31T23:59:59Z",
  },
  {
    tenantId: "tenant_techcorp",
    period: "2024-Q1",
    totalCompliances: 32,
    completedCompliances: 28,
    pendingCompliances: 3,
    overdueCompliances: 1,
    totalTaxPaid: 12500000,
    gstPaid: 8500000,
    tdsPaid: 2800000,
    incomeTaxPaid: 1200000,
    totalPenalties: 5000,
    totalInterest: 2500,
    complianceScore: 87.5,
    industryBenchmark: 85.1,
    monthlyTrends: [
      {
        month: "2024-01",
        compliances: 11,
        penalties: 0,
        taxPaid: 4200000,
        score: 91.2,
      },
      {
        month: "2024-02",
        compliances: 10,
        penalties: 5000,
        taxPaid: 3800000,
        score: 85.7,
      },
      {
        month: "2024-03",
        compliances: 11,
        penalties: 0,
        taxPaid: 4500000,
        score: 89.6,
      },
    ],
    calculatedAt: "2024-03-31T23:59:59Z",
  },
];

// Compliance Reports Data
export const complianceReports: ComplianceReport[] = [
  {
    id: "report_001",
    tenantId: "tenant_buildcorp",
    reportType: "compliance_summary",
    period: "2024-01",
    generatedAt: "2024-02-01T10:00:00Z",
    generatedBy: "Admin",
    data: {
      totalCompliances: 15,
      completedCompliances: 13,
      pendingCompliances: 2,
      overdueCompliances: 0,
      complianceRate: 86.67,
    },
    exportFormat: "pdf",
    downloadUrl: "/reports/compliance_summary_jan_2024.pdf",
  },
  {
    id: "report_002",
    tenantId: "tenant_buildcorp",
    reportType: "tax_summary",
    period: "2023-24",
    generatedAt: "2024-01-15T15:30:00Z",
    generatedBy: "CA Sharma",
    data: {
      totalTaxPaid: 185000000,
      gstPaid: 125000000,
      tdsPaid: 35000000,
      incomeTaxPaid: 25000000,
      refundsReceived: 2500000,
    },
    exportFormat: "excel",
    downloadUrl: "/reports/tax_summary_fy_2023-24.xlsx",
  },
];

// Helper functions to get compliance data by tenant
export const getGSTReturnsByTenant = (tenantId: string): GSTReturn[] => {
  return gstReturns.filter((gst) => gst.tenantId === tenantId);
};

export const getTDSReturnsByTenant = (tenantId: string): TDSReturn[] => {
  return tdsReturns.filter((tds) => tds.tenantId === tenantId);
};

export const getITReturnsByTenant = (tenantId: string): ITReturn[] => {
  return itReturns.filter((itr) => itr.tenantId === tenantId);
};

export const getLabourCompliancesByTenant = (
  tenantId: string,
): LabourCompliance[] => {
  return labourCompliances.filter((labour) => labour.tenantId === tenantId);
};

export const getEnvironmentalCompliancesByTenant = (
  tenantId: string,
): EnvironmentalCompliance[] => {
  return environmentalCompliances.filter((env) => env.tenantId === tenantId);
};

export const getIndustryCompliancesByTenant = (
  tenantId: string,
): IndustryCompliance[] => {
  return industryCompliances.filter((ind) => ind.tenantId === tenantId);
};

export const getTaxConfigurationByTenant = (
  tenantId: string,
): TaxConfiguration | undefined => {
  return taxConfigurations.find((config) => config.tenantId === tenantId);
};

export const getComplianceCalendarByTenant = (
  tenantId: string,
): ComplianceCalendar | undefined => {
  return complianceCalendars.find((calendar) => calendar.tenantId === tenantId);
};

export const getComplianceAnalyticsByTenant = (
  tenantId: string,
): ComplianceAnalytics | undefined => {
  return complianceAnalytics.find(
    (analytics) => analytics.tenantId === tenantId,
  );
};

export const getComplianceReportsByTenant = (
  tenantId: string,
): ComplianceReport[] => {
  return complianceReports.filter((report) => report.tenantId === tenantId);
};

// Industry-specific compliance requirements
export const industryComplianceRequirements = {
  construction: [
    "RERA Registration",
    "Environmental Clearance",
    "Labour Compliance",
    "Safety Compliance",
    "Building Permits",
  ],
  real_estate: [
    "RERA Registration",
    "Property Registration",
    "Municipal Approvals",
    "Environmental Clearance",
  ],
  technology: [
    "Data Protection Compliance",
    "Software Licensing",
    "Export License (if applicable)",
    "Cyber Security Compliance",
  ],
  manufacturing: [
    "Factory License",
    "Pollution Control",
    "Labour Compliance",
    "Product Standards Certification",
    "Environmental Audit",
  ],
  healthcare: [
    "Drug License",
    "Medical Device Registration",
    "Hospital License",
    "Bio-Medical Waste Management",
    "Clinical Trial Approvals",
  ],
};

// Statutory due dates calendar
export const statutoryDueDates = {
  monthly: [
    {
      compliance: "GST GSTR-3B",
      dueDate: 20,
      description: "Monthly GST Return",
    },
    {
      compliance: "TDS Deposit",
      dueDate: 7,
      description: "TDS Deposit for previous month",
    },
    { compliance: "PF Return", dueDate: 15, description: "Monthly PF Return" },
    {
      compliance: "ESI Return",
      dueDate: 21,
      description: "Monthly ESI Return",
    },
    {
      compliance: "Professional Tax",
      dueDate: 15,
      description: "Professional Tax Payment",
    },
  ],
  quarterly: [
    {
      compliance: "TDS Return",
      dueDate: "End of following month",
      description: "Quarterly TDS Return",
    },
    {
      compliance: "GST GSTR-1",
      dueDate: 11,
      description: "Quarterly GST Return for small taxpayers",
    },
    {
      compliance: "Advance Tax",
      dueDate: "15th of last month of quarter",
      description: "Quarterly Advance Tax",
    },
  ],
  annually: [
    {
      compliance: "Income Tax Return",
      dueDate: "31st October",
      description: "Annual Income Tax Return",
    },
    {
      compliance: "GST Annual Return",
      dueDate: "31st December",
      description: "Annual GST Return",
    },
    {
      compliance: "Labour Audit",
      dueDate: "31st March",
      description: "Annual Labour Compliance Audit",
    },
  ],
};
