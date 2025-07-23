import {
  IndustryType,
  SubscriptionPlan,
  Tenant,
  ModuleInfo,
  UsageAlert,
  BillingHistory,
} from "./types";

export const industryTypes: IndustryType[] = [
  {
    id: "real_estate",
    name: "Real Estate",
    category: "Property & Construction",
    description: "Property development, sales, and management",
    defaultModules: [
      "crm",
      "project_management",
      "finance",
      "document_management",
    ],
    icon: "🏢",
    regulations: ["RERA", "GST", "Income Tax", "Stamp Duty"],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    category: "Industrial",
    description: "Production, inventory, and supply chain management",
    defaultModules: ["inventory", "production", "quality", "supply_chain"],
    icon: "🏭",
    regulations: [
      "Factory Act",
      "Environmental Clearance",
      "GST",
      "Labour Laws",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    category: "Medical",
    description: "Hospitals, clinics, and medical practice management",
    defaultModules: ["patient_management", "appointment", "billing", "records"],
    icon: "🏥",
    regulations: [
      "HIPAA",
      "Medical Council",
      "Drug Controller",
      "Clinical Establishment Act",
    ],
  },
  {
    id: "education",
    name: "Education",
    category: "Academic",
    description: "Schools, colleges, and training institutes",
    defaultModules: [
      "student_management",
      "academic",
      "fee_management",
      "library",
    ],
    icon: "🎓",
    regulations: [
      "UGC Guidelines",
      "AICTE Norms",
      "State Education Board",
      "RTE Act",
    ],
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    category: "Commerce",
    description: "Retail stores, online marketplaces, and distribution",
    defaultModules: ["inventory", "pos", "ecommerce", "customer_management"],
    icon: "🛒",
    regulations: [
      "Consumer Protection Act",
      "GST",
      "E-commerce Guidelines",
      "FDI Policy",
    ],
  },
  {
    id: "finance",
    name: "Financial Services",
    category: "Banking & Finance",
    description: "Banks, NBFCs, insurance, and investment firms",
    defaultModules: [
      "loan_management",
      "risk_assessment",
      "compliance",
      "customer_onboarding",
    ],
    icon: "💰",
    regulations: [
      "RBI Guidelines",
      "SEBI Regulations",
      "IRDAI Rules",
      "KYC/AML",
    ],
  },
  {
    id: "technology",
    name: "Technology & Software",
    category: "IT & Services",
    description: "Software development, IT services, and consultancy",
    defaultModules: [
      "project_management",
      "team_collaboration",
      "time_tracking",
      "client_management",
    ],
    icon: "💻",
    regulations: [
      "IT Act",
      "Data Protection",
      "Export-Import Policy",
      "Software Patent",
    ],
  },
  {
    id: "logistics",
    name: "Logistics & Transportation",
    category: "Supply Chain",
    description: "Shipping, freight, and transportation services",
    defaultModules: [
      "fleet_management",
      "route_optimization",
      "tracking",
      "billing",
    ],
    icon: "🚛",
    regulations: [
      "Motor Vehicle Act",
      "Transport Rules",
      "GST",
      "Environmental Norms",
    ],
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "trial",
    name: "Free Trial",
    type: "trial",
    description: "14-day free trial with basic features",
    features: [
      "Up to 5 users",
      "5GB storage",
      "Basic modules only",
      "Email support",
      "Standard templates",
    ],
    modules: [
      {
        moduleId: "crm",
        moduleName: "CRM Basic",
        access: "limited",
        features: ["Lead management", "Basic reporting"],
      },
      {
        moduleId: "dashboard",
        moduleName: "Dashboard",
        access: "full",
        features: ["Basic analytics", "Overview widgets"],
      },
    ],
    limits: {
      maxUsers: 5,
      maxStorage: 5,
      maxApiCalls: 1000,
      maxProjects: 3,
      maxIntegrations: 2,
      supportLevel: "basic",
    },
    pricing: {
      monthly: 0,
      yearly: 0,
      currency: "INR",
    },
    trialDays: 14,
  },
  {
    id: "basic",
    name: "Basic Plan",
    type: "basic",
    description: "Perfect for small teams and startups",
    features: [
      "Up to 25 users",
      "50GB storage",
      "Core modules included",
      "Email & chat support",
      "Basic integrations",
      "Mobile app access",
    ],
    modules: [
      {
        moduleId: "crm",
        moduleName: "CRM Professional",
        access: "full",
        features: ["Complete CRM", "Advanced reporting", "Automation"],
      },
      {
        moduleId: "project",
        moduleName: "Project Management",
        access: "full",
        features: ["Task management", "Gantt charts", "Time tracking"],
      },
      {
        moduleId: "finance",
        moduleName: "Finance Basic",
        access: "limited",
        features: ["Basic accounting", "Invoicing"],
      },
    ],
    limits: {
      maxUsers: 25,
      maxStorage: 50,
      maxApiCalls: 10000,
      maxProjects: 10,
      maxIntegrations: 5,
      supportLevel: "basic",
    },
    pricing: {
      monthly: 2999,
      yearly: 29990,
      currency: "INR",
    },
  },
  {
    id: "professional",
    name: "Professional Plan",
    type: "professional",
    description: "Advanced features for growing businesses",
    features: [
      "Up to 100 users",
      "200GB storage",
      "All standard modules",
      "Priority support",
      "Advanced integrations",
      "Custom workflows",
      "API access",
      "Advanced analytics",
    ],
    modules: [
      {
        moduleId: "crm",
        moduleName: "CRM Enterprise",
        access: "full",
        features: ["Complete CRM", "AI insights", "Custom fields"],
      },
      {
        moduleId: "project",
        moduleName: "Project Management Pro",
        access: "full",
        features: ["Advanced project tools", "Resource management"],
      },
      {
        moduleId: "finance",
        moduleName: "Finance Professional",
        access: "full",
        features: ["Complete accounting", "Tax management", "Compliance"],
      },
      {
        moduleId: "hrms",
        moduleName: "HRMS",
        access: "full",
        features: ["Employee management", "Payroll", "Performance tracking"],
      },
    ],
    limits: {
      maxUsers: 100,
      maxStorage: 200,
      maxApiCalls: 50000,
      maxProjects: 50,
      maxIntegrations: 15,
      supportLevel: "priority",
    },
    pricing: {
      monthly: 9999,
      yearly: 99990,
      currency: "INR",
    },
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    type: "enterprise",
    description: "Complete solution for large organizations",
    features: [
      "Unlimited users",
      "1TB+ storage",
      "All premium modules",
      "24/7 dedicated support",
      "Custom integrations",
      "White-label option",
      "Advanced security",
      "Custom development",
      "SLA guarantee",
      "Training & onboarding",
    ],
    modules: [
      {
        moduleId: "crm",
        moduleName: "CRM Enterprise+",
        access: "full",
        features: [
          "AI-powered CRM",
          "Predictive analytics",
          "Custom development",
        ],
      },
      {
        moduleId: "project",
        moduleName: "Project Management Enterprise",
        access: "full",
        features: ["Enterprise project tools", "Portfolio management"],
      },
      {
        moduleId: "finance",
        moduleName: "Finance Enterprise",
        access: "full",
        features: [
          "Advanced financial management",
          "Multi-currency",
          "Audit trails",
        ],
      },
      {
        moduleId: "hrms",
        moduleName: "HRMS Enterprise",
        access: "full",
        features: ["Complete HR suite", "AI recruitment", "Advanced analytics"],
      },
      {
        moduleId: "bi",
        moduleName: "Business Intelligence",
        access: "full",
        features: ["Advanced BI", "Custom dashboards", "Predictive analytics"],
      },
    ],
    limits: {
      maxUsers: -1, // Unlimited
      maxStorage: 1000,
      maxApiCalls: -1, // Unlimited
      maxProjects: -1, // Unlimited
      maxIntegrations: -1, // Unlimited
      supportLevel: "dedicated",
    },
    pricing: {
      monthly: 24999,
      yearly: 249990,
      currency: "INR",
    },
  },
];

export const moduleInfo: ModuleInfo[] = [
  {
    id: "crm",
    name: "Customer Relationship Management",
    description: "Manage leads, customers, and sales pipeline",
    category: "Sales & Marketing",
    icon: "👥",
    isPremium: false,
    dependencies: [],
  },
  {
    id: "project",
    name: "Project Management",
    description: "Plan, track, and manage projects and tasks",
    category: "Operations",
    icon: "📋",
    isPremium: false,
    dependencies: [],
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    description: "Financial management, invoicing, and reporting",
    category: "Finance",
    icon: "💰",
    isPremium: false,
    dependencies: [],
  },
  {
    id: "hrms",
    name: "Human Resource Management",
    description: "Employee management, payroll, and HR operations",
    category: "Human Resources",
    icon: "👨‍💼",
    isPremium: true,
    dependencies: ["crm"],
  },
  {
    id: "inventory",
    name: "Inventory Management",
    description: "Stock management, procurement, and supply chain",
    category: "Operations",
    icon: "📦",
    isPremium: false,
    dependencies: [],
  },
  {
    id: "bi",
    name: "Business Intelligence",
    description: "Advanced analytics, reporting, and insights",
    category: "Analytics",
    icon: "📊",
    isPremium: true,
    dependencies: ["crm", "finance"],
  },
  {
    id: "document",
    name: "Document Management",
    description: "Digital document storage and collaboration",
    category: "Operations",
    icon: "📄",
    isPremium: false,
    dependencies: [],
  },
  {
    id: "communication",
    name: "Communication Suite",
    description: "Email, SMS, and notification management",
    category: "Communication",
    icon: "📧",
    isPremium: true,
    dependencies: [],
  },
];

export const mockTenants: Tenant[] = [
  {
    id: "tenant_001",
    name: "TechCorp Solutions",
    organizationName: "TechCorp Solutions Pvt Ltd",
    industry: industryTypes[6], // Technology
    subscription: {
      id: "sub_001",
      planId: "professional",
      planName: "Professional Plan",
      planType: "professional",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2025-01-15",
      autoRenew: true,
      modules: ["crm", "project", "finance", "hrms"],
      limits: {
        maxUsers: 100,
        maxStorage: 200,
        maxApiCalls: 50000,
        maxProjects: 50,
        maxIntegrations: 15,
        supportLevel: "priority",
      },
      pricing: {
        basePrice: 9999,
        currency: "INR",
        billingCycle: "monthly",
        discount: {
          percentage: 15,
          validUntil: "2025-01-15",
          reason: "Annual subscription discount",
        },
        taxes: {
          gst: 18,
          serviceTax: 0,
        },
      },
    },
    status: "active",
    adminUser: {
      id: "user_001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@techcorp.com",
      phone: "+91-9876543210",
      role: "owner",
      isActive: true,
      lastLogin: "2024-12-21T09:30:00Z",
      createdAt: "2024-01-15T10:00:00Z",
    },
    settings: {
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
      currency: "INR",
      language: "en",
      notifications: {
        emailAlerts: true,
        smsAlerts: true,
        pushNotifications: true,
        billingReminders: true,
        usageAlerts: true,
        securityAlerts: true,
      },
      security: {
        twoFactorAuth: true,
        ipWhitelist: ["203.0.113.0/24"],
        sessionTimeout: 480,
        passwordPolicy: {
          minLength: 8,
          requireSpecialChars: true,
          requireNumbers: true,
          expiryDays: 90,
        },
      },
      branding: {
        logoUrl: "/uploads/techcorp-logo.png",
        primaryColor: "#0B62DA",
        secondaryColor: "#FF9F1A",
        companyName: "TechCorp Solutions",
        customDomain: "app.techcorp.com",
      },
    },
    usage: {
      currentMonth: {
        users: 45,
        storageUsed: 89.5,
        apiCalls: 23580,
        activeProjects: 12,
        billingAmount: 8499,
      },
      previousMonth: {
        users: 42,
        storageUsed: 78.2,
        apiCalls: 21340,
        activeProjects: 10,
        billingAmount: 8499,
      },
      yearToDate: {
        totalBilling: 101988,
        avgMonthlyUsers: 41,
        peakStorage: 95.2,
        totalApiCalls: 267890,
      },
      alerts: [
        {
          id: "alert_001",
          type: "storage",
          threshold: 80,
          currentValue: 89.5,
          severity: "warning",
          message:
            "Storage usage is at 89.5%. Consider upgrading or cleaning up files.",
          createdAt: "2024-12-20T14:30:00Z",
          acknowledged: false,
        },
      ],
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-12-21T09:30:00Z",
    billingCycle: "monthly",
  },
  {
    id: "tenant_002",
    name: "Metro Realty Group",
    organizationName: "Metro Realty Group Ltd",
    industry: industryTypes[0], // Real Estate
    subscription: {
      id: "sub_002",
      planId: "enterprise",
      planName: "Enterprise Plan",
      planType: "enterprise",
      status: "active",
      startDate: "2024-02-01",
      endDate: "2025-02-01",
      autoRenew: true,
      modules: ["crm", "project", "finance", "hrms", "bi", "communication"],
      limits: {
        maxUsers: 200,
        maxStorage: 500,
        maxApiCalls: 100000,
        maxProjects: 100,
        maxIntegrations: 25,
        supportLevel: "dedicated",
      },
      pricing: {
        basePrice: 19999,
        currency: "INR",
        billingCycle: "monthly",
        discount: {
          percentage: 20,
          validUntil: "2025-02-01",
          reason: "Enterprise annual discount",
        },
        taxes: {
          gst: 18,
          serviceTax: 0,
        },
      },
    },
    status: "active",
    adminUser: {
      id: "user_002",
      name: "Priya Sharma",
      email: "priya.sharma@metrorealty.com",
      phone: "+91-9876543211",
      role: "owner",
      isActive: true,
      lastLogin: "2024-12-21T11:45:00Z",
      createdAt: "2024-02-01T09:00:00Z",
    },
    settings: {
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
      currency: "INR",
      language: "en",
      notifications: {
        emailAlerts: true,
        smsAlerts: true,
        pushNotifications: true,
        billingReminders: true,
        usageAlerts: true,
        securityAlerts: true,
      },
      security: {
        twoFactorAuth: true,
        ipWhitelist: ["198.51.100.0/24"],
        sessionTimeout: 600,
        passwordPolicy: {
          minLength: 10,
          requireSpecialChars: true,
          requireNumbers: true,
          expiryDays: 60,
        },
      },
      branding: {
        logoUrl: "/uploads/metro-realty-logo.png",
        primaryColor: "#10B981",
        secondaryColor: "#F59E0B",
        companyName: "Metro Realty Group",
        customDomain: "app.metrorealty.com",
      },
      features: {
        twoFactorAuth: true,
        apiAccess: true,
        customBranding: true,
        advancedReports: true,
        dataExport: true,
        auditLogs: true,
      },
      integrations: {
        paymentGateway: "Razorpay",
        emailService: "SendGrid",
        smsService: "Twilio",
        storageService: "AWS S3",
      },
    },
    usage: {
      currentMonth: {
        users: 89,
        storageUsed: 234.5,
        apiCalls: 45000,
        activeProjects: 34,
        billingAmount: 16999,
      },
      previousMonth: {
        users: 85,
        storageUsed: 220.3,
        apiCalls: 42500,
        activeProjects: 32,
        billingAmount: 16999,
      },
      yearToDate: {
        totalBilling: 203988,
        avgMonthlyUsers: 82,
        peakStorage: 245.8,
        totalApiCalls: 486750,
      },
      alerts: [
        {
          id: "alert_004",
          type: "users",
          threshold: 90,
          currentValue: 89,
          severity: "warning",
          message: "User count approaching limit. Consider upgrading plan.",
          createdAt: "2024-12-21T08:15:00Z",
          acknowledged: false,
        },
      ],
    },
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-12-21T11:45:00Z",
    billingCycle: "monthly",
  },
  {
    id: "tenant_003",
    name: "Skyline Developers",
    organizationName: "Skyline Developers Pvt Ltd",
    industry: industryTypes[0], // Real Estate
    subscription: {
      id: "sub_003",
      planId: "basic",
      planName: "Basic Plan",
      planType: "basic",
      status: "active",
      startDate: "2024-03-15",
      endDate: "2025-03-15",
      autoRenew: false,
      modules: ["crm", "project", "finance"],
      limits: {
        maxUsers: 25,
        maxStorage: 50,
        maxApiCalls: 10000,
        maxProjects: 10,
        maxIntegrations: 5,
        supportLevel: "basic",
      },
      pricing: {
        basePrice: 2999,
        currency: "INR",
        billingCycle: "monthly",
        discount: {
          percentage: 0,
          validUntil: "",
          reason: "",
        },
        taxes: {
          gst: 18,
          serviceTax: 0,
        },
      },
    },
    status: "active",
    adminUser: {
      id: "user_003",
      name: "Amit Patel",
      email: "amit.patel@skylinedev.com",
      phone: "+91-9876543212",
      role: "admin",
      isActive: true,
      lastLogin: "2024-12-20T16:20:00Z",
      createdAt: "2024-03-15T10:30:00Z",
    },
    settings: {
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
      currency: "INR",
      language: "en",
      notifications: {
        emailAlerts: true,
        smsAlerts: false,
        pushNotifications: true,
        billingReminders: true,
        usageAlerts: false,
        securityAlerts: true,
      },
      security: {
        twoFactorAuth: false,
        ipWhitelist: [],
        sessionTimeout: 240,
        passwordPolicy: {
          minLength: 6,
          requireSpecialChars: false,
          requireNumbers: true,
          expiryDays: 180,
        },
      },
      branding: {
        logoUrl: "/uploads/skyline-logo.png",
        primaryColor: "#3B82F6",
        secondaryColor: "#EF4444",
        companyName: "Skyline Developers",
        customDomain: null,
      },
      features: {
        twoFactorAuth: false,
        apiAccess: false,
        customBranding: false,
        advancedReports: false,
        dataExport: true,
        auditLogs: false,
      },
      integrations: {
        paymentGateway: "Razorpay",
        emailService: "Basic SMTP",
        smsService: "None",
        storageService: "Local",
      },
    },
    usage: {
      currentMonth: {
        users: 12,
        storageUsed: 18.2,
        apiCalls: 2500,
        activeProjects: 5,
        billingAmount: 2999,
      },
      previousMonth: {
        users: 10,
        storageUsed: 15.8,
        apiCalls: 2100,
        activeProjects: 4,
        billingAmount: 2999,
      },
      yearToDate: {
        totalBilling: 26991,
        avgMonthlyUsers: 11,
        peakStorage: 22.4,
        totalApiCalls: 24750,
      },
      alerts: [
        {
          id: "alert_005",
          type: "storage",
          threshold: 70,
          currentValue: 36.4,
          severity: "info",
          message: "Storage usage is moderate at 36.4%.",
          createdAt: "2024-12-20T12:30:00Z",
          acknowledged: true,
        },
      ],
    },
    createdAt: "2024-03-15T10:30:00Z",
    updatedAt: "2024-12-20T16:20:00Z",
    billingCycle: "monthly",
  },
];

// Default tenant for backward compatibility
export const mockTenant: Tenant = mockTenants[0];

// Helper function to generate billing history for a tenant
export const generateBillingHistory = (tenant: Tenant): BillingHistory[] => [
  {
    id: `inv_${tenant.id}_001`,
    invoiceNumber: `${tenant.name.slice(0, 2).toUpperCase()}-2024-12-001`,
    amount: tenant.usage.currentMonth.billingAmount,
    currency: tenant.subscription.pricing.currency,
    status: "paid",
    billingPeriod: {
      start: "2024-12-01",
      end: "2024-12-31",
    },
    items: [
      {
        description: `${tenant.subscription.planName} - Monthly`,
        quantity: 1,
        unitPrice: tenant.subscription.pricing.basePrice,
        totalPrice: tenant.subscription.pricing.basePrice,
        taxRate: tenant.subscription.pricing.taxes.gst,
      },
      ...(tenant.subscription.pricing.discount.percentage > 0
        ? [
            {
              description: `Discount (${tenant.subscription.pricing.discount.percentage}%)`,
              quantity: 1,
              unitPrice: -Math.round(
                (tenant.subscription.pricing.basePrice *
                  tenant.subscription.pricing.discount.percentage) /
                  100,
              ),
              totalPrice: -Math.round(
                (tenant.subscription.pricing.basePrice *
                  tenant.subscription.pricing.discount.percentage) /
                  100,
              ),
              taxRate: 0,
            },
          ]
        : []),
    ],
    paymentMethod: "Razorpay - **** 4242",
    paidAt: "2024-12-01T10:15:00Z",
    dueDate: "2024-12-15T23:59:59Z",
    downloadUrl: `/invoices/${tenant.name.slice(0, 2).toUpperCase()}-2024-12-001.pdf`,
  },
  {
    id: `inv_${tenant.id}_002`,
    invoiceNumber: `${tenant.name.slice(0, 2).toUpperCase()}-2024-11-001`,
    amount: tenant.usage.previousMonth.billingAmount,
    currency: tenant.subscription.pricing.currency,
    status: "paid",
    billingPeriod: {
      start: "2024-11-01",
      end: "2024-11-30",
    },
    items: [
      {
        description: `${tenant.subscription.planName} - Monthly`,
        quantity: 1,
        unitPrice: tenant.subscription.pricing.basePrice,
        totalPrice: tenant.subscription.pricing.basePrice,
        taxRate: tenant.subscription.pricing.taxes.gst,
      },
      ...(tenant.subscription.pricing.discount.percentage > 0
        ? [
            {
              description: `Discount (${tenant.subscription.pricing.discount.percentage}%)`,
              quantity: 1,
              unitPrice: -Math.round(
                (tenant.subscription.pricing.basePrice *
                  tenant.subscription.pricing.discount.percentage) /
                  100,
              ),
              totalPrice: -Math.round(
                (tenant.subscription.pricing.basePrice *
                  tenant.subscription.pricing.discount.percentage) /
                  100,
              ),
              taxRate: 0,
            },
          ]
        : []),
    ],
    paymentMethod: "Razorpay - **** 4242",
    paidAt: "2024-11-01T10:15:00Z",
    dueDate: "2024-11-15T23:59:59Z",
    downloadUrl: `/invoices/${tenant.name.slice(0, 2).toUpperCase()}-2024-11-001.pdf`,
  },
];

// Backward compatibility - use first tenant's billing history
export const mockBillingHistory: BillingHistory[] = generateBillingHistory(
  mockTenants[0],
);

// Removed redundant usageAlerts - now part of each tenant's usage.alerts
