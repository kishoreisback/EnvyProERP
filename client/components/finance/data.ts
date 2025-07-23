// Comprehensive tenant-driven finance data with multi-industry support

import {
  TenantFinancialAccount,
  TenantTransaction,
  TenantInvoice,
  TenantBudget,
  TenantCashFlow,
  TenantFinancialAnalytics,
  TenantFinanceConfiguration,
  AccountType,
  Currency,
  TransactionType,
  InvoiceStatus,
  PaymentStatus,
  BudgetStatus,
} from "./types";

// Available tenants with their industry types
export const financeTenants = [
  {
    id: "tenant_buildcorp",
    name: "BuildCorp Constructions",
    industry: "construction",
    type: "Construction",
    baseCurrency: "INR" as Currency,
    fiscalYearStart: "04-01", // April 1st
  },
  {
    id: "tenant_metro_realty",
    name: "Metro Realty Group",
    industry: "real_estate",
    type: "Real Estate",
    baseCurrency: "INR" as Currency,
    fiscalYearStart: "04-01",
  },
  {
    id: "tenant_skyline_dev",
    name: "Skyline Developers",
    industry: "real_estate",
    type: "Property Development",
    baseCurrency: "INR" as Currency,
    fiscalYearStart: "01-01", // January 1st
  },
  {
    id: "tenant_techflow",
    name: "TechFlow Solutions",
    industry: "technology",
    type: "Technology Services",
    baseCurrency: "USD" as Currency,
    fiscalYearStart: "01-01",
  },
  {
    id: "tenant_retail_plus",
    name: "RetailPlus Chain",
    industry: "retail",
    type: "Retail & E-commerce",
    baseCurrency: "INR" as Currency,
    fiscalYearStart: "04-01",
  },
];

// Comprehensive Chart of Accounts for different industries
export const mockFinancialAccounts: TenantFinancialAccount[] = [
  // BuildCorp Constructions (Construction Industry)
  {
    id: "acc_bc_001",
    tenantId: "tenant_buildcorp",
    accountCode: "1000",
    accountName: "Current Assets",
    accountType: "assets",
    level: 1,
    isActive: true,
    currentBalance: 25000000,
    openingBalance: 22000000,
    currency: "INR",
    allowDirectPosting: false,
    isBankAccount: false,
    isCashAccount: false,
    isControlAccount: true,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: ["role:admin", "role:finance_manager"],
  },
  {
    id: "acc_bc_002",
    tenantId: "tenant_buildcorp",
    accountCode: "1100",
    accountName: "Cash and Bank",
    accountType: "assets",
    parentAccountId: "acc_bc_001",
    level: 2,
    isActive: true,
    currentBalance: 8500000,
    openingBalance: 7200000,
    currency: "INR",
    allowDirectPosting: false,
    isBankAccount: false,
    isCashAccount: false,
    isControlAccount: true,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: ["role:admin", "role:finance_manager"],
  },
  {
    id: "acc_bc_003",
    tenantId: "tenant_buildcorp",
    accountCode: "1101",
    accountName: "HDFC Bank - Current Account",
    accountType: "assets",
    parentAccountId: "acc_bc_002",
    level: 3,
    isActive: true,
    currentBalance: 5500000,
    openingBalance: 4800000,
    currency: "INR",
    allowDirectPosting: true,
    isBankAccount: true,
    isCashAccount: false,
    isControlAccount: false,
    bankDetails: {
      bankName: "HDFC Bank",
      accountNumber: "12345678901234",
      ifscCode: "HDFC0001234",
      swiftCode: "HDFCINBB",
    },
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: ["role:admin", "role:finance_manager", "role:accountant"],
  },
  {
    id: "acc_bc_004",
    tenantId: "tenant_buildcorp",
    accountCode: "1102",
    accountName: "Petty Cash",
    accountType: "assets",
    parentAccountId: "acc_bc_002",
    level: 3,
    isActive: true,
    currentBalance: 50000,
    openingBalance: 30000,
    currency: "INR",
    allowDirectPosting: true,
    isBankAccount: false,
    isCashAccount: true,
    isControlAccount: false,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: ["role:admin", "role:finance_manager", "role:accountant"],
  },
  {
    id: "acc_bc_005",
    tenantId: "tenant_buildcorp",
    accountCode: "1200",
    accountName: "Accounts Receivable",
    accountType: "assets",
    parentAccountId: "acc_bc_001",
    level: 2,
    isActive: true,
    currentBalance: 12500000,
    openingBalance: 11000000,
    currency: "INR",
    allowDirectPosting: true,
    isBankAccount: false,
    isCashAccount: false,
    isControlAccount: false,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: ["role:admin", "role:finance_manager", "role:accountant"],
  },
  {
    id: "acc_bc_006",
    tenantId: "tenant_buildcorp",
    accountCode: "1300",
    accountName: "Inventory - Raw Materials",
    accountType: "assets",
    parentAccountId: "acc_bc_001",
    level: 2,
    isActive: true,
    currentBalance: 3500000,
    openingBalance: 3200000,
    currency: "INR",
    allowDirectPosting: true,
    isBankAccount: false,
    isCashAccount: false,
    isControlAccount: false,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: [
      "role:admin",
      "role:finance_manager",
      "role:inventory_manager",
    ],
  },
  {
    id: "acc_bc_007",
    tenantId: "tenant_buildcorp",
    accountCode: "4000",
    accountName: "Construction Revenue",
    accountType: "revenue",
    level: 1,
    isActive: true,
    currentBalance: -45000000, // Credit balance for revenue
    openingBalance: -38000000,
    currency: "INR",
    allowDirectPosting: true,
    isBankAccount: false,
    isCashAccount: false,
    isControlAccount: false,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: [
      "role:admin",
      "role:finance_manager",
      "role:project_manager",
    ],
  },
  {
    id: "acc_bc_008",
    tenantId: "tenant_buildcorp",
    accountCode: "5000",
    accountName: "Cost of Materials",
    accountType: "cost_of_goods_sold",
    level: 1,
    isActive: true,
    currentBalance: 18500000,
    openingBalance: 15200000,
    currency: "INR",
    allowDirectPosting: true,
    isBankAccount: false,
    isCashAccount: false,
    isControlAccount: false,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: [
      "role:admin",
      "role:finance_manager",
      "role:project_manager",
    ],
  },

  // Metro Realty Group (Real Estate Industry)
  {
    id: "acc_mr_001",
    tenantId: "tenant_metro_realty",
    accountCode: "1000",
    accountName: "Current Assets",
    accountType: "assets",
    level: 1,
    isActive: true,
    currentBalance: 85000000,
    openingBalance: 78000000,
    currency: "INR",
    allowDirectPosting: false,
    isBankAccount: false,
    isCashAccount: false,
    isControlAccount: true,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: ["role:admin", "role:finance_manager"],
  },
  {
    id: "acc_mr_002",
    tenantId: "tenant_metro_realty",
    accountCode: "1500",
    accountName: "Investment Properties",
    accountType: "assets",
    level: 1,
    isActive: true,
    currentBalance: 250000000,
    openingBalance: 220000000,
    currency: "INR",
    allowDirectPosting: true,
    isBankAccount: false,
    isCashAccount: false,
    isControlAccount: false,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: [
      "role:admin",
      "role:finance_manager",
      "role:property_manager",
    ],
  },
  {
    id: "acc_mr_003",
    tenantId: "tenant_metro_realty",
    accountCode: "4100",
    accountName: "Rental Income",
    accountType: "revenue",
    level: 1,
    isActive: true,
    currentBalance: -28500000,
    openingBalance: -24000000,
    currency: "INR",
    allowDirectPosting: true,
    isBankAccount: false,
    isCashAccount: false,
    isControlAccount: false,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: [
      "role:admin",
      "role:finance_manager",
      "role:property_manager",
    ],
  },
  {
    id: "acc_mr_004",
    tenantId: "tenant_metro_realty",
    accountCode: "4200",
    accountName: "Property Sales Revenue",
    accountType: "revenue",
    level: 1,
    isActive: true,
    currentBalance: -52000000,
    openingBalance: -45000000,
    currency: "INR",
    allowDirectPosting: true,
    isBankAccount: false,
    isCashAccount: false,
    isControlAccount: false,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: [
      "role:admin",
      "role:finance_manager",
      "role:sales_manager",
    ],
  },

  // TechFlow Solutions (Technology Industry)
  {
    id: "acc_tf_001",
    tenantId: "tenant_techflow",
    accountCode: "1000",
    accountName: "Cash and Cash Equivalents",
    accountType: "assets",
    level: 1,
    isActive: true,
    currentBalance: 1250000, // $1.25M USD
    openingBalance: 980000,
    currency: "USD",
    allowDirectPosting: true,
    isBankAccount: true,
    isCashAccount: false,
    isControlAccount: false,
    bankDetails: {
      bankName: "Chase Bank",
      accountNumber: "987654321098765",
      routingNumber: "021000021",
      swiftCode: "CHASUS33",
    },
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: ["role:admin", "role:finance_manager"],
  },
  {
    id: "acc_tf_002",
    tenantId: "tenant_techflow",
    accountCode: "4000",
    accountName: "Software Licensing Revenue",
    accountType: "revenue",
    level: 1,
    isActive: true,
    currentBalance: -2850000, // $2.85M USD
    openingBalance: -2200000,
    currency: "USD",
    allowDirectPosting: true,
    isBankAccount: false,
    isCashAccount: false,
    isControlAccount: false,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: [
      "role:admin",
      "role:finance_manager",
      "role:sales_manager",
    ],
  },
  {
    id: "acc_tf_003",
    tenantId: "tenant_techflow",
    accountCode: "4100",
    accountName: "Consulting Services Revenue",
    accountType: "revenue",
    level: 1,
    isActive: true,
    currentBalance: -1850000, // $1.85M USD
    openingBalance: -1500000,
    currency: "USD",
    allowDirectPosting: true,
    isBankAccount: false,
    isCashAccount: false,
    isControlAccount: false,
    createdBy: "system",
    createdAt: "2024-01-01T00:00:00Z",
    visibility: "public",
    accessControls: [
      "role:admin",
      "role:finance_manager",
      "role:consulting_manager",
    ],
  },
];

// Sample Transactions for different industries
export const mockTransactions: TenantTransaction[] = [
  // BuildCorp Construction transaction
  {
    id: "txn_bc_001",
    tenantId: "tenant_buildcorp",
    transactionNumber: "JE-2024-001",
    date: "2024-03-15T00:00:00Z",
    type: "journal_entry",
    reference: "INV-2024-001",
    description:
      "Invoice raised for Sunrise Residency Phase 1 - Foundation work",
    totalAmount: 5900000,
    currency: "INR",
    journalEntries: [
      {
        id: "je_001",
        accountId: "acc_bc_005",
        accountCode: "1200",
        accountName: "Accounts Receivable",
        debitAmount: 5900000,
        creditAmount: 0,
        description: "Invoice amount receivable",
        projectId: "project_sunrise_phase1",
      },
      {
        id: "je_002",
        accountId: "acc_bc_007",
        accountCode: "4000",
        accountName: "Construction Revenue",
        debitAmount: 0,
        creditAmount: 5000000,
        description: "Construction revenue recognized",
        projectId: "project_sunrise_phase1",
      },
      {
        id: "je_003",
        accountId: "acc_tax_001",
        accountCode: "2300",
        accountName: "GST Output Tax",
        debitAmount: 0,
        creditAmount: 900000,
        description: "GST @18% on construction services",
        projectId: "project_sunrise_phase1",
      },
    ],
    attachments: [
      {
        id: "att_001",
        fileName: "invoice_INV-2024-001.pdf",
        fileType: "application/pdf",
        fileSize: 245760,
        fileUrl: "/attachments/txn_bc_001/invoice_INV-2024-001.pdf",
        uploadedBy: "finance_manager",
        uploadedAt: "2024-03-15T10:30:00Z",
      },
    ],
    status: "posted",
    approvalLevel: 2,
    approvedBy: "finance_manager",
    approvedAt: "2024-03-15T10:30:00Z",
    sourceModule: "manual",
    createdBy: "accountant_001",
    createdAt: "2024-03-15T10:00:00Z",
    projectId: "project_sunrise_phase1",
  },

  // Metro Realty rental income transaction
  {
    id: "txn_mr_001",
    tenantId: "tenant_metro_realty",
    transactionNumber: "JE-2024-002",
    date: "2024-03-01T00:00:00Z",
    type: "receipt",
    reference: "RENT-MAR-2024",
    description: "Monthly rental income collection - March 2024",
    totalAmount: 2850000,
    currency: "INR",
    journalEntries: [
      {
        id: "je_004",
        accountId: "acc_mr_bank",
        accountCode: "1100",
        accountName: "Bank Account",
        debitAmount: 2850000,
        creditAmount: 0,
        description: "Rental income received",
      },
      {
        id: "je_005",
        accountId: "acc_mr_003",
        accountCode: "4100",
        accountName: "Rental Income",
        debitAmount: 0,
        creditAmount: 2850000,
        description: "Monthly rental income for March 2024",
      },
    ],
    attachments: [],
    status: "posted",
    approvalLevel: 1,
    approvedBy: "property_manager",
    approvedAt: "2024-03-01T08:00:00Z",
    sourceModule: "manual",
    createdBy: "property_accountant",
    createdAt: "2024-03-01T08:00:00Z",
  },

  // TechFlow consulting payment
  {
    id: "txn_tf_001",
    tenantId: "tenant_techflow",
    transactionNumber: "JE-2024-003",
    date: "2024-03-10T00:00:00Z",
    type: "payment",
    reference: "SALARY-MAR-2024",
    description: "Monthly salary payment for March 2024",
    totalAmount: 185000,
    currency: "USD",
    journalEntries: [
      {
        id: "je_006",
        accountId: "acc_tf_salary",
        accountCode: "6100",
        accountName: "Salary Expense",
        debitAmount: 185000,
        creditAmount: 0,
        description: "Monthly salary expense",
        departmentId: "dept_engineering",
      },
      {
        id: "je_007",
        accountId: "acc_tf_001",
        accountCode: "1000",
        accountName: "Cash and Cash Equivalents",
        debitAmount: 0,
        creditAmount: 185000,
        description: "Salary payment via bank transfer",
      },
    ],
    attachments: [
      {
        id: "att_002",
        fileName: "payroll_summary_mar2024.xlsx",
        fileType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        fileSize: 89432,
        fileUrl: "/attachments/txn_tf_001/payroll_summary_mar2024.xlsx",
        uploadedBy: "hr_manager",
        uploadedAt: "2024-03-10T09:15:00Z",
      },
    ],
    status: "posted",
    approvalLevel: 2,
    approvedBy: "ceo",
    approvedAt: "2024-03-10T11:00:00Z",
    sourceModule: "hrms",
    sourceReference: "payroll_mar_2024",
    createdBy: "hr_system",
    createdAt: "2024-03-10T09:00:00Z",
    departmentId: "dept_engineering",
  },
];

// Sample Invoices for different industries
export const mockInvoices: TenantInvoice[] = [
  // BuildCorp construction invoice
  {
    id: "inv_bc_001",
    tenantId: "tenant_buildcorp",
    invoiceNumber: "INV-BC-2024-001",
    customerId: "cust_sunrise_developers",
    customerName: "Sunrise Developers Ltd",
    customerEmail: "accounts@sunrisedev.com",
    customerPhone: "+91-9876543210",
    billingAddress: {
      street: "123 Business District",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    issueDate: "2024-03-15",
    dueDate: "2024-04-14",
    paymentTerms: "Net 30",
    currency: "INR",
    lineItems: [
      {
        id: "li_001",
        description: "Foundation work - Phase 1 (80% completed)",
        quantity: 1,
        unitPrice: 4000000,
        discount: 0,
        taxRate: 18,
        taxAmount: 720000,
        totalAmount: 4720000,
        projectId: "project_sunrise_phase1",
      },
      {
        id: "li_002",
        description: "Material supply - Premium grade cement & steel",
        quantity: 1,
        unitPrice: 1000000,
        discount: 0,
        taxRate: 18,
        taxAmount: 180000,
        totalAmount: 1180000,
        projectId: "project_sunrise_phase1",
      },
    ],
    subtotal: 5000000,
    taxAmount: 900000,
    discountAmount: 0,
    totalAmount: 5900000,
    paidAmount: 5900000,
    balanceAmount: 0,
    status: "paid",
    paymentStatus: "paid",
    taxConfiguration: {
      taxType: "exclusive",
      defaultTaxRate: 18,
      taxBreakdown: [
        {
          taxName: "CGST",
          taxRate: 9,
          taxAmount: 450000,
        },
        {
          taxName: "SGST",
          taxRate: 9,
          taxAmount: 450000,
        },
      ],
    },
    projectId: "project_sunrise_phase1",
    payments: [
      {
        id: "pay_001",
        paymentDate: "2024-04-10",
        amount: 5900000,
        paymentMethod: "bank_transfer",
        reference: "NEFT240410001",
        notes: "Payment received via NEFT",
        transactionId: "txn_payment_001",
      },
    ],
    notes:
      "Foundation work completed as per project timeline. Next billing for superstructure work.",
    termsAndConditions:
      "Payment to be made within 30 days. 2% late payment charges applicable after due date.",
    isRecurring: false,
    createdBy: "project_manager_001",
    createdAt: "2024-03-15T10:00:00Z",
    updatedBy: "accountant_001",
    updatedAt: "2024-04-10T14:30:00Z",
    sourceModule: "projects",
    sourceReference: "milestone_foundation_complete",
  },

  // Metro Realty rental invoice
  {
    id: "inv_mr_001",
    tenantId: "tenant_metro_realty",
    invoiceNumber: "INV-MR-2024-001",
    customerId: "tenant_techcorp_solutions",
    customerName: "TechCorp Solutions Pvt Ltd",
    customerEmail: "finance@techcorp.com",
    customerPhone: "+91-8765432109",
    billingAddress: {
      street: "Floor 5, Metro Tower, MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
    },
    issueDate: "2024-03-01",
    dueDate: "2024-03-05",
    paymentTerms: "Net 5",
    currency: "INR",
    lineItems: [
      {
        id: "li_003",
        description: "Office space rental - Floor 5 (3,500 sq ft)",
        quantity: 1,
        unitPrice: 350000,
        discount: 0,
        taxRate: 18,
        taxAmount: 63000,
        totalAmount: 413000,
        itemCode: "RENT_FLOOR5",
      },
      {
        id: "li_004",
        description: "Parking spaces (10 slots)",
        quantity: 10,
        unitPrice: 5000,
        discount: 0,
        taxRate: 18,
        taxAmount: 9000,
        totalAmount: 59000,
        itemCode: "PARKING_SLOTS",
      },
    ],
    subtotal: 400000,
    taxAmount: 72000,
    discountAmount: 0,
    totalAmount: 472000,
    paidAmount: 472000,
    balanceAmount: 0,
    status: "paid",
    paymentStatus: "paid",
    taxConfiguration: {
      taxType: "exclusive",
      defaultTaxRate: 18,
      taxBreakdown: [
        {
          taxName: "GST",
          taxRate: 18,
          taxAmount: 72000,
        },
      ],
    },
    payments: [
      {
        id: "pay_002",
        paymentDate: "2024-03-04",
        amount: 472000,
        paymentMethod: "bank_transfer",
        reference: "RTGS240304001",
        notes: "Monthly rental payment",
        transactionId: "txn_rental_001",
      },
    ],
    isRecurring: true,
    recurringConfig: {
      frequency: "monthly",
      interval: 1,
      nextInvoiceDate: "2024-04-01",
      autoSend: true,
    },
    notes:
      "Monthly rental for March 2024. Next invoice will be auto-generated on April 1st.",
    createdBy: "property_manager_001",
    createdAt: "2024-03-01T09:00:00Z",
    sourceModule: "manual",
  },

  // TechFlow consulting invoice
  {
    id: "inv_tf_001",
    tenantId: "tenant_techflow",
    invoiceNumber: "INV-TF-2024-001",
    customerId: "client_global_bank",
    customerName: "Global Bank Ltd",
    customerEmail: "procurement@globalbank.com",
    customerPhone: "+1-555-123-4567",
    billingAddress: {
      street: "500 Financial District",
      city: "New York",
      state: "NY",
      postalCode: "10004",
      country: "United States",
    },
    issueDate: "2024-03-20",
    dueDate: "2024-04-19",
    paymentTerms: "Net 30",
    currency: "USD",
    lineItems: [
      {
        id: "li_005",
        description: "Custom CRM Development - Phase 1",
        quantity: 120,
        unitPrice: 180,
        discount: 0,
        taxRate: 0, // No tax for international services
        taxAmount: 0,
        totalAmount: 21600,
        itemCode: "DEV_CRM_P1",
      },
      {
        id: "li_006",
        description: "System Integration Services",
        quantity: 40,
        unitPrice: 250,
        discount: 0,
        taxRate: 0,
        taxAmount: 0,
        totalAmount: 10000,
        itemCode: "SYS_INTEGRATION",
      },
      {
        id: "li_007",
        description: "Project Management & Consultation",
        quantity: 80,
        unitPrice: 200,
        discount: 0,
        taxRate: 0,
        taxAmount: 0,
        totalAmount: 16000,
        itemCode: "PM_CONSULTING",
      },
    ],
    subtotal: 47600,
    taxAmount: 0,
    discountAmount: 0,
    totalAmount: 47600,
    paidAmount: 0,
    balanceAmount: 47600,
    status: "sent",
    paymentStatus: "unpaid",
    taxConfiguration: {
      taxType: "exclusive",
      defaultTaxRate: 0,
      taxBreakdown: [],
    },
    payments: [],
    notes:
      "Phase 1 development completed. Phase 2 invoice will follow upon milestone completion.",
    termsAndConditions:
      "Payment in USD via wire transfer. Bank charges to be borne by client.",
    isRecurring: false,
    createdBy: "project_lead_001",
    createdAt: "2024-03-20T15:00:00Z",
    sourceModule: "projects",
    sourceReference: "milestone_crm_phase1",
  },
];

// Sample Budgets for different industries
export const mockBudgets: TenantBudget[] = [
  // BuildCorp annual budget
  {
    id: "budget_bc_001",
    tenantId: "tenant_buildcorp",
    name: "Annual Operating Budget FY 2024-25",
    description: "Comprehensive operating budget for construction operations",
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    fiscalYear: "2024-25",
    budgetItems: [
      {
        id: "bi_001",
        accountId: "acc_bc_007",
        accountCode: "4000",
        accountName: "Construction Revenue",
        budgetAmount: 60000000,
        actualAmount: 45000000,
        committedAmount: 52000000,
        variance: -15000000,
        variancePercentage: -25.0,
        monthlyBudget: [
          {
            month: "2024-04",
            budgetAmount: 4500000,
            actualAmount: 3800000,
            variance: -700000,
          },
          {
            month: "2024-05",
            budgetAmount: 5000000,
            actualAmount: 4200000,
            variance: -800000,
          },
          {
            month: "2024-06",
            budgetAmount: 5200000,
            actualAmount: 4800000,
            variance: -400000,
          },
        ],
        notes: "Revenue target based on 6 major projects completion",
      },
      {
        id: "bi_002",
        accountId: "acc_bc_008",
        accountCode: "5000",
        accountName: "Cost of Materials",
        budgetAmount: 24000000,
        actualAmount: 18500000,
        committedAmount: 20800000,
        variance: -5500000,
        variancePercentage: -22.9,
        monthlyBudget: [
          {
            month: "2024-04",
            budgetAmount: 1800000,
            actualAmount: 1650000,
            variance: -150000,
          },
          {
            month: "2024-05",
            budgetAmount: 2000000,
            actualAmount: 1750000,
            variance: -250000,
          },
          {
            month: "2024-06",
            budgetAmount: 2100000,
            actualAmount: 1900000,
            variance: -200000,
          },
        ],
        notes: "Material cost savings due to bulk procurement",
      },
    ],
    status: "active",
    version: 1,
    approvedBy: "ceo_buildcorp",
    approvedAt: "2024-03-25T10:00:00Z",
    totalBudget: 84000000,
    totalActual: 63500000,
    totalCommitted: 72800000,
    totalAvailable: 11200000,
    createdBy: "finance_manager",
    createdAt: "2024-03-01T00:00:00Z",
    updatedBy: "finance_manager",
    updatedAt: "2024-03-20T16:30:00Z",
  },

  // Metro Realty property budget
  {
    id: "budget_mr_001",
    tenantId: "tenant_metro_realty",
    name: "Property Operations Budget 2024",
    description: "Budget for property management and operations",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    fiscalYear: "2024",
    budgetItems: [
      {
        id: "bi_003",
        accountId: "acc_mr_003",
        accountCode: "4100",
        accountName: "Rental Income",
        budgetAmount: 36000000,
        actualAmount: 28500000,
        committedAmount: 32000000,
        variance: -7500000,
        variancePercentage: -20.8,
        monthlyBudget: [
          {
            month: "2024-01",
            budgetAmount: 3000000,
            actualAmount: 2800000,
            variance: -200000,
          },
          {
            month: "2024-02",
            budgetAmount: 3000000,
            actualAmount: 2850000,
            variance: -150000,
          },
          {
            month: "2024-03",
            budgetAmount: 3000000,
            actualAmount: 2850000,
            variance: -150000,
          },
        ],
        notes: "Some vacant units affecting rental income",
      },
    ],
    status: "active",
    version: 2,
    approvedBy: "board_of_directors",
    approvedAt: "2024-01-15T14:00:00Z",
    totalBudget: 36000000,
    totalActual: 28500000,
    totalCommitted: 32000000,
    totalAvailable: 4000000,
    createdBy: "property_manager",
    createdAt: "2024-01-01T00:00:00Z",
    updatedBy: "property_manager",
    updatedAt: "2024-03-15T11:20:00Z",
  },
];

// Financial Analytics for different tenants
export const mockFinancialAnalytics: TenantFinancialAnalytics[] = [
  // BuildCorp Analytics
  {
    tenantId: "tenant_buildcorp",
    period: {
      startDate: "2024-01-01",
      endDate: "2024-03-31",
    },
    profitabilityMetrics: {
      grossProfitMargin: 38.5,
      netProfitMargin: 12.8,
      returnOnAssets: 15.2,
      returnOnEquity: 22.1,
      ebitdaMargin: 18.5,
    },
    liquidityMetrics: {
      currentRatio: 2.1,
      quickRatio: 1.8,
      cashRatio: 0.9,
      workingCapital: 15000000,
      cashConversionCycle: 45,
    },
    efficiencyMetrics: {
      assetTurnover: 1.2,
      inventoryTurnover: 8.5,
      receivableTurnover: 6.2,
      payableTurnover: 9.1,
      salesPerEmployee: 2500000,
    },
    leverageMetrics: {
      debtToEquityRatio: 0.65,
      debtToAssetsRatio: 0.42,
      interestCoverageRatio: 8.5,
      debtServiceCoverageRatio: 2.1,
    },
    industryMetrics: {
      projectProfitabilityIndex: 1.18,
      costOverrunPercentage: 8.2,
      billingEfficiency: 92.5,
    },
    trends: {
      revenueGrowth: {
        period: "Q1 2024",
        value: 45000000,
        growthRate: 15.2,
        trend: "increasing",
      },
      profitGrowth: {
        period: "Q1 2024",
        value: 5760000,
        growthRate: 18.5,
        trend: "increasing",
      },
      expenseGrowth: {
        period: "Q1 2024",
        value: 39240000,
        growthRate: 12.8,
        trend: "increasing",
      },
      cashFlowTrend: {
        period: "Q1 2024",
        value: 8500000,
        growthRate: 22.1,
        trend: "increasing",
      },
    },
    forecasts: [
      {
        period: "Q2 2024",
        revenue: 52000000,
        expenses: 44500000,
        netIncome: 7500000,
        cashFlow: 9200000,
        confidence: "high",
      },
      {
        period: "Q3 2024",
        revenue: 58000000,
        expenses: 48800000,
        netIncome: 9200000,
        cashFlow: 10500000,
        confidence: "medium",
      },
    ],
    benchmarks: [
      {
        metric: "Gross Profit Margin",
        tenantValue: 38.5,
        industryAverage: 35.2,
        performanceRating: "good",
      },
      {
        metric: "Project Profitability Index",
        tenantValue: 1.18,
        industryAverage: 1.12,
        performanceRating: "good",
      },
    ],
    alerts: [
      {
        id: "alert_001",
        type: "warning",
        title: "Budget Variance Alert",
        description:
          "Material costs are 15% below budget - review procurement efficiency",
        metric: "Cost of Materials",
        threshold: 10,
        currentValue: 15,
        createdAt: "2024-03-20T10:00:00Z",
      },
    ],
    insights: [
      {
        id: "insight_001",
        category: "efficiency",
        title: "Inventory Management Optimization",
        description:
          "High inventory turnover suggests efficient material management",
        impact: "medium",
        actionItems: [
          "Maintain current procurement practices",
          "Consider just-in-time delivery for non-critical materials",
        ],
        createdAt: "2024-03-20T10:00:00Z",
      },
    ],
  },

  // Metro Realty Analytics
  {
    tenantId: "tenant_metro_realty",
    period: {
      startDate: "2024-01-01",
      endDate: "2024-03-31",
    },
    profitabilityMetrics: {
      grossProfitMargin: 65.8,
      netProfitMargin: 28.5,
      returnOnAssets: 8.9,
      returnOnEquity: 14.2,
      ebitdaMargin: 35.2,
    },
    liquidityMetrics: {
      currentRatio: 3.2,
      quickRatio: 2.8,
      cashRatio: 1.5,
      workingCapital: 25000000,
      cashConversionCycle: 30,
    },
    efficiencyMetrics: {
      assetTurnover: 0.32,
      inventoryTurnover: 0, // N/A for real estate
      receivableTurnover: 12.5,
      payableTurnover: 8.2,
      salesPerEmployee: 8500000,
    },
    leverageMetrics: {
      debtToEquityRatio: 0.45,
      debtToAssetsRatio: 0.31,
      interestCoverageRatio: 12.5,
      debtServiceCoverageRatio: 3.2,
    },
    industryMetrics: {
      capRate: 6.8,
      occupancyRate: 92.5,
      rentPerSquareFoot: 85,
    },
    trends: {
      revenueGrowth: {
        period: "Q1 2024",
        value: 80500000,
        growthRate: 12.8,
        trend: "increasing",
      },
      profitGrowth: {
        period: "Q1 2024",
        value: 22942500,
        growthRate: 15.2,
        trend: "increasing",
      },
      expenseGrowth: {
        period: "Q1 2024",
        value: 57557500,
        growthRate: 8.5,
        trend: "increasing",
      },
      cashFlowTrend: {
        period: "Q1 2024",
        value: 28500000,
        growthRate: 18.2,
        trend: "increasing",
      },
    },
    forecasts: [
      {
        period: "Q2 2024",
        revenue: 85000000,
        expenses: 58500000,
        netIncome: 26500000,
        cashFlow: 32000000,
        confidence: "high",
      },
    ],
    benchmarks: [
      {
        metric: "Occupancy Rate",
        tenantValue: 92.5,
        industryAverage: 88.2,
        performanceRating: "excellent",
      },
      {
        metric: "Cap Rate",
        tenantValue: 6.8,
        industryAverage: 7.2,
        performanceRating: "good",
      },
    ],
    alerts: [
      {
        id: "alert_002",
        type: "info",
        title: "High Occupancy Rate",
        description:
          "Occupancy rate above industry average - consider rent optimization",
        metric: "Occupancy Rate",
        threshold: 90,
        currentValue: 92.5,
        createdAt: "2024-03-18T14:30:00Z",
      },
    ],
    insights: [
      {
        id: "insight_002",
        category: "opportunity",
        title: "Rent Optimization Opportunity",
        description:
          "High occupancy rate suggests potential for rental increases",
        impact: "high",
        actionItems: [
          "Conduct market rental analysis",
          "Review lease renewal terms",
          "Consider premium amenities to justify higher rents",
        ],
        createdAt: "2024-03-18T14:30:00Z",
      },
    ],
  },
];

// Tenant Finance Configurations
export const mockFinanceConfigurations: TenantFinanceConfiguration[] = [
  // BuildCorp Configuration
  {
    tenantId: "tenant_buildcorp",
    baseCurrency: "INR",
    fiscalYearStart: "04-01",
    chartOfAccountsTemplate: "construction",
    accountCodeFormat: "XXXX",
    invoiceNumberFormat: "INV-BC-YYYY-###",
    transactionNumberFormat: "JE-YYYY-###",
    transactionApprovalLimits: [
      {
        roleId: "accountant",
        transactionType: "journal_entry",
        approvalLimit: 100000,
        currency: "INR",
      },
      {
        roleId: "finance_manager",
        transactionType: "journal_entry",
        approvalLimit: 1000000,
        currency: "INR",
      },
      {
        roleId: "ceo",
        transactionType: "journal_entry",
        approvalLimit: 10000000,
        currency: "INR",
      },
    ],
    invoiceApprovalRequired: true,
    budgetApprovalRequired: true,
    enableCRMIntegration: true,
    enableHRMSIntegration: true,
    enableProjectIntegration: true,
    enableInventoryIntegration: true,
    autoPostRecurringTransactions: true,
    autoSendInvoiceReminders: true,
    autoCalculateDepreciation: true,
    requireTaxCompliance: true,
    auditTrailRequired: true,
    documentRetentionPeriod: 7,
    defaultReportCurrency: "INR",
    includeInactiveAccounts: false,
    showZeroBalanceAccounts: false,
    departmentAccess: [
      {
        departmentId: "dept_finance",
        departmentName: "Finance Department",
        accessibleAccounts: ["*"], // All accounts
        canCreateTransactions: true,
        canApproveTransactions: true,
        canViewReports: true,
      },
      {
        departmentId: "dept_projects",
        departmentName: "Project Management",
        accessibleAccounts: ["4000", "5000", "6000"], // Revenue, COGS, Project expenses
        canCreateTransactions: true,
        canApproveTransactions: false,
        canViewReports: true,
      },
    ],
    userPermissions: [
      {
        userId: "finance_manager",
        permissions: [
          "view_dashboard",
          "create_transactions",
          "approve_transactions",
          "manage_accounts",
          "create_invoices",
          "manage_budgets",
          "view_reports",
          "export_data",
          "manage_taxes",
          "configure_system",
        ],
        accessLevel: "admin",
      },
      {
        userId: "accountant",
        permissions: [
          "view_dashboard",
          "create_transactions",
          "create_invoices",
          "view_reports",
          "export_data",
        ],
        accessLevel: "write",
      },
    ],
  },

  // Metro Realty Configuration
  {
    tenantId: "tenant_metro_realty",
    baseCurrency: "INR",
    fiscalYearStart: "04-01",
    chartOfAccountsTemplate: "real_estate",
    accountCodeFormat: "XXXX",
    invoiceNumberFormat: "INV-MR-YYYY-###",
    transactionNumberFormat: "JE-YYYY-###",
    transactionApprovalLimits: [
      {
        roleId: "property_accountant",
        transactionType: "journal_entry",
        approvalLimit: 50000,
        currency: "INR",
      },
      {
        roleId: "property_manager",
        transactionType: "journal_entry",
        approvalLimit: 500000,
        currency: "INR",
      },
    ],
    invoiceApprovalRequired: false, // Auto-approve rental invoices
    budgetApprovalRequired: true,
    enableCRMIntegration: true,
    enableHRMSIntegration: false,
    enableProjectIntegration: false,
    enableInventoryIntegration: false,
    autoPostRecurringTransactions: true,
    autoSendInvoiceReminders: true,
    autoCalculateDepreciation: true,
    requireTaxCompliance: true,
    auditTrailRequired: true,
    documentRetentionPeriod: 10,
    defaultReportCurrency: "INR",
    includeInactiveAccounts: false,
    showZeroBalanceAccounts: false,
    departmentAccess: [],
    userPermissions: [],
  },

  // TechFlow Configuration
  {
    tenantId: "tenant_techflow",
    baseCurrency: "USD",
    fiscalYearStart: "01-01",
    chartOfAccountsTemplate: "technology",
    accountCodeFormat: "XXXX",
    invoiceNumberFormat: "INV-TF-YYYY-###",
    transactionNumberFormat: "JE-YYYY-###",
    transactionApprovalLimits: [
      {
        roleId: "accountant",
        transactionType: "journal_entry",
        approvalLimit: 5000,
        currency: "USD",
      },
      {
        roleId: "finance_manager",
        transactionType: "journal_entry",
        approvalLimit: 50000,
        currency: "USD",
      },
    ],
    invoiceApprovalRequired: true,
    budgetApprovalRequired: true,
    enableCRMIntegration: true,
    enableHRMSIntegration: true,
    enableProjectIntegration: true,
    enableInventoryIntegration: false,
    autoPostRecurringTransactions: false,
    autoSendInvoiceReminders: true,
    autoCalculateDepreciation: true,
    requireTaxCompliance: false, // International sales
    auditTrailRequired: true,
    documentRetentionPeriod: 7,
    defaultReportCurrency: "USD",
    includeInactiveAccounts: false,
    showZeroBalanceAccounts: false,
    departmentAccess: [],
    userPermissions: [],
  },
];

// Utility functions for tenant finance data
export const getFinancialAccountsByTenant = (
  tenantId: string,
): TenantFinancialAccount[] => {
  return mockFinancialAccounts.filter(
    (account) => account.tenantId === tenantId,
  );
};

export const getTransactionsByTenant = (
  tenantId: string,
): TenantTransaction[] => {
  return mockTransactions.filter(
    (transaction) => transaction.tenantId === tenantId,
  );
};

export const getInvoicesByTenant = (tenantId: string): TenantInvoice[] => {
  return mockInvoices.filter((invoice) => invoice.tenantId === tenantId);
};

export const getBudgetsByTenant = (tenantId: string): TenantBudget[] => {
  return mockBudgets.filter((budget) => budget.tenantId === tenantId);
};

export const getFinancialAnalyticsByTenant = (
  tenantId: string,
): TenantFinancialAnalytics | undefined => {
  return mockFinancialAnalytics.find(
    (analytics) => analytics.tenantId === tenantId,
  );
};

export const getFinanceConfigurationByTenant = (
  tenantId: string,
): TenantFinanceConfiguration | undefined => {
  return mockFinanceConfigurations.find(
    (config) => config.tenantId === tenantId,
  );
};

// Helper functions for calculations
export const calculateAccountBalance = (
  accountId: string,
  transactions: TenantTransaction[],
): number => {
  return transactions
    .filter((txn) =>
      txn.journalEntries.some((je) => je.accountId === accountId),
    )
    .reduce((balance, txn) => {
      const entries = txn.journalEntries.filter(
        (je) => je.accountId === accountId,
      );
      const debitTotal = entries.reduce(
        (sum, entry) => sum + entry.debitAmount,
        0,
      );
      const creditTotal = entries.reduce(
        (sum, entry) => sum + entry.creditAmount,
        0,
      );
      return balance + (debitTotal - creditTotal);
    }, 0);
};

export const generateTrialBalance = (tenantId: string) => {
  const accounts = getFinancialAccountsByTenant(tenantId);
  const transactions = getTransactionsByTenant(tenantId);

  return accounts.map((account) => ({
    accountCode: account.accountCode,
    accountName: account.accountName,
    accountType: account.accountType,
    debitBalance: account.currentBalance > 0 ? account.currentBalance : 0,
    creditBalance:
      account.currentBalance < 0 ? Math.abs(account.currentBalance) : 0,
  }));
};

export const calculateFinancialRatios = (tenantId: string) => {
  const analytics = getFinancialAnalyticsByTenant(tenantId);
  if (!analytics) return null;

  return {
    profitability: analytics.profitabilityMetrics,
    liquidity: analytics.liquidityMetrics,
    efficiency: analytics.efficiencyMetrics,
    leverage: analytics.leverageMetrics,
  };
};
