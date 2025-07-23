import {
  FranchiseeSetup,
  FranchiseType,
  FranchiseeProductCatalog,
  PricingConfiguration,
  OperationalSetup,
  IntegrationSetup,
  SetupStep,
  SetupDashboard,
  ProductCategoryConfig,
  FranchiseeProduct,
  MarginConfiguration,
  CategoryMargin,
  PriceSlab,
  DiscountRule,
  SetupTemplate,
  NewSetupForm,
  CreateTemplateForm,
} from "./setup-types";

// Mock Franchise Types
export const mockFranchiseTypes: FranchiseType[] = [
  {
    id: "ft_distribution",
    name: "Distribution Center",
    type: "distribution",
    description: "Large-scale distribution hub serving multiple retail outlets",
    capabilities: [
      {
        id: "cap_bulk_storage",
        name: "Bulk Storage",
        category: "storage",
        description: "Large inventory storage capacity",
        isRequired: true,
      },
      {
        id: "cap_wholesale",
        name: "Wholesale Operations",
        category: "sales",
        description: "B2B sales to retailers",
        isRequired: true,
      },
      {
        id: "cap_logistics",
        name: "Logistics Management",
        category: "distribution",
        description: "Fleet management and delivery coordination",
        isRequired: true,
      },
    ],
    requirements: [
      {
        id: "req_warehouse",
        name: "Warehouse Facility",
        type: "infrastructure",
        description: "Minimum 5000 sq ft warehouse space",
        isActive: true,
      },
      {
        id: "req_investment",
        name: "Investment Capacity",
        type: "financial",
        description: "Minimum 50 Lakhs investment",
        isActive: true,
      },
    ],
    defaultMargins: {
      defaultMargin: 12,
      marginType: "percentage",
      categoryMargins: [],
      volumeDiscounts: [],
      tieredPricing: [],
    },
    allowedRegions: ["Maharashtra", "Gujarat", "Karnataka"],
    minInvestment: 5000000,
    maxInvestment: 20000000,
  },
  {
    id: "ft_retail",
    name: "Retail Outlet",
    type: "retail",
    description: "Direct-to-consumer retail store",
    capabilities: [
      {
        id: "cap_retail_sales",
        name: "Retail Sales",
        category: "sales",
        description: "Direct customer sales",
        isRequired: true,
      },
      {
        id: "cap_customer_service",
        name: "Customer Service",
        category: "service",
        description: "Customer support and service",
        isRequired: true,
      },
    ],
    requirements: [
      {
        id: "req_retail_space",
        name: "Retail Space",
        type: "infrastructure",
        description: "Minimum 500 sq ft retail space",
        isActive: true,
      },
    ],
    defaultMargins: {
      defaultMargin: 18,
      marginType: "percentage",
      categoryMargins: [],
      volumeDiscounts: [],
      tieredPricing: [],
    },
    allowedRegions: ["All"],
    minInvestment: 1500000,
    maxInvestment: 5000000,
  },
  {
    id: "ft_warehouse",
    name: "Warehouse Hub",
    type: "warehouse",
    description: "Storage and fulfillment center",
    capabilities: [
      {
        id: "cap_storage",
        name: "Storage Management",
        category: "storage",
        description: "Inventory storage and management",
        isRequired: true,
      },
      {
        id: "cap_fulfillment",
        name: "Order Fulfillment",
        category: "distribution",
        description: "Order processing and dispatch",
        isRequired: true,
      },
    ],
    requirements: [
      {
        id: "req_cold_storage",
        name: "Cold Storage",
        type: "infrastructure",
        description: "Temperature controlled storage",
        isActive: true,
      },
    ],
    defaultMargins: {
      defaultMargin: 8,
      marginType: "percentage",
      categoryMargins: [],
      volumeDiscounts: [],
      tieredPricing: [],
    },
    allowedRegions: ["Maharashtra", "Karnataka"],
    minInvestment: 3000000,
    maxInvestment: 15000000,
  },
  {
    id: "ft_hybrid",
    name: "Hybrid Model",
    type: "hybrid",
    description: "Combined retail and distribution operations",
    capabilities: [
      {
        id: "cap_multi_channel",
        name: "Multi-channel Sales",
        category: "sales",
        description: "B2B and B2C sales",
        isRequired: true,
      },
      {
        id: "cap_flexible_ops",
        name: "Flexible Operations",
        category: "operational",
        description: "Adaptable business model",
        isRequired: true,
      },
    ],
    requirements: [
      {
        id: "req_flexible_space",
        name: "Flexible Space",
        type: "infrastructure",
        description: "Adaptable space for retail and storage",
        isActive: true,
      },
    ],
    defaultMargins: {
      defaultMargin: 15,
      marginType: "percentage",
      categoryMargins: [],
      volumeDiscounts: [],
      tieredPricing: [],
    },
    allowedRegions: ["All"],
    minInvestment: 2500000,
    maxInvestment: 10000000,
  },
];

// Mock Product Categories
export const mockProductCategories: ProductCategoryConfig[] = [
  {
    categoryId: "cat_soft_drinks",
    categoryName: "Soft Drinks",
    isActive: true,
    isExclusive: false,
    minMargin: 8,
    maxMargin: 20,
    allowCustomPricing: true,
    restrictions: ["No sales to competitors"],
  },
  {
    categoryId: "cat_energy_drinks",
    categoryName: "Energy Drinks",
    isActive: true,
    isExclusive: true,
    minMargin: 12,
    maxMargin: 25,
    allowCustomPricing: false,
    restrictions: ["Age verification required"],
  },
  {
    categoryId: "cat_packaged_snacks",
    categoryName: "Packaged Snacks",
    isActive: true,
    isExclusive: false,
    minMargin: 10,
    maxMargin: 18,
    allowCustomPricing: true,
  },
  {
    categoryId: "cat_dairy",
    categoryName: "Dairy Products",
    isActive: true,
    isExclusive: false,
    minMargin: 6,
    maxMargin: 15,
    allowCustomPricing: true,
    restrictions: ["Temperature control required", "Short shelf life"],
  },
  {
    categoryId: "cat_ice_cream",
    categoryName: "Ice Cream",
    isActive: true,
    isExclusive: true,
    minMargin: 15,
    maxMargin: 30,
    allowCustomPricing: false,
    restrictions: ["Freezer storage required"],
  },
];

// Mock Franchisee Products
export const mockFranchiseeProducts: FranchiseeProduct[] = [
  {
    id: "fp_001",
    corporateProductId: "cp_cola_500ml",
    sku: "COLA-500-001",
    name: "Premium Cola 500ml",
    category: "Soft Drinks",
    subcategory: "Carbonated",
    corporatePrice: 20,
    franchiseePrice: 25,
    margin: 25,
    marginType: "percentage",
    isActive: true,
    minStock: 100,
    maxStock: 2000,
    autoReorder: true,
    restrictions: [
      {
        type: "region",
        condition: "exclude",
        value: "dry_states",
        action: "deny",
      },
    ],
  },
  {
    id: "fp_002",
    corporateProductId: "cp_energy_250ml",
    sku: "ENERGY-250-001",
    name: "Power Energy Drink 250ml",
    category: "Energy Drinks",
    subcategory: "Caffeinated",
    corporatePrice: 45,
    franchiseePrice: 60,
    margin: 33.33,
    marginType: "percentage",
    isActive: true,
    minStock: 50,
    maxStock: 500,
    autoReorder: true,
    restrictions: [
      {
        type: "customer_type",
        condition: "age_verification",
        value: "18",
        action: "require_approval",
      },
    ],
  },
  {
    id: "fp_003",
    corporateProductId: "cp_chips_50g",
    sku: "CHIPS-50-001",
    name: "Crunchy Chips 50g",
    category: "Packaged Snacks",
    subcategory: "Chips",
    corporatePrice: 15,
    franchiseePrice: 18,
    margin: 20,
    marginType: "percentage",
    isActive: true,
    minStock: 200,
    maxStock: 1000,
    autoReorder: true,
  },
];

// Mock Setup Steps
export const mockSetupSteps: SetupStep[] = [
  {
    id: "step_tenant_creation",
    name: "Tenant Creation",
    description: "Create dedicated tenant space for franchisee",
    order: 1,
    status: "completed",
    dependencies: [],
    estimatedTime: 15,
    actualTime: 12,
    startedAt: "2024-01-15T09:00:00Z",
    completedAt: "2024-01-15T09:12:00Z",
    results: {
      tenantId: "tenant_franchise_001",
      subdomain: "freshzone-mumbai.beveragecorp.com",
    },
  },
  {
    id: "step_code_generation",
    name: "Franchisee Code Generation",
    description: "Generate unique franchisee identification code",
    order: 2,
    status: "completed",
    dependencies: ["step_tenant_creation"],
    estimatedTime: 5,
    actualTime: 3,
    startedAt: "2024-01-15T09:12:00Z",
    completedAt: "2024-01-15T09:15:00Z",
    results: {
      franchiseeCode: "BH-MH-001",
      codeFormat: "{BusinessType}-{State}-{Sequence}",
    },
  },
  {
    id: "step_franchise_type",
    name: "Franchise Type Assignment",
    description: "Assign franchise type and capabilities",
    order: 3,
    status: "completed",
    dependencies: ["step_code_generation"],
    estimatedTime: 10,
    actualTime: 8,
    startedAt: "2024-01-15T09:15:00Z",
    completedAt: "2024-01-15T09:23:00Z",
    results: {
      franchiseType: "retail",
      capabilities: ["retail_sales", "customer_service"],
    },
  },
  {
    id: "step_pricing_setup",
    name: "Pricing Configuration",
    description: "Configure margins and price slabs",
    order: 4,
    status: "completed",
    dependencies: ["step_franchise_type"],
    estimatedTime: 20,
    actualTime: 18,
    startedAt: "2024-01-15T09:23:00Z",
    completedAt: "2024-01-15T09:41:00Z",
    results: {
      defaultMargin: 18,
      categoryMargins: 5,
      priceSlabs: 3,
    },
  },
  {
    id: "step_catalog_setup",
    name: "Product Catalog Setup",
    description: "Configure product catalog and restrictions",
    order: 5,
    status: "in_progress",
    dependencies: ["step_pricing_setup"],
    estimatedTime: 30,
    startedAt: "2024-01-15T09:41:00Z",
    results: {
      categoriesConfigured: 3,
      productsAdded: 25,
    },
  },
  {
    id: "step_operational_config",
    name: "Operational Configuration",
    description: "Setup operational parameters and integrations",
    order: 6,
    status: "pending",
    dependencies: ["step_catalog_setup"],
    estimatedTime: 25,
  },
  {
    id: "step_integration_setup",
    name: "System Integrations",
    description: "Configure POS, accounting and other integrations",
    order: 7,
    status: "pending",
    dependencies: ["step_operational_config"],
    estimatedTime: 35,
  },
  {
    id: "step_testing_validation",
    name: "Testing & Validation",
    description: "Test all configurations and validate setup",
    order: 8,
    status: "pending",
    dependencies: ["step_integration_setup"],
    estimatedTime: 20,
  },
  {
    id: "step_go_live",
    name: "Go Live",
    description: "Activate franchisee operations",
    order: 9,
    status: "pending",
    dependencies: ["step_testing_validation"],
    estimatedTime: 10,
  },
];

// Mock Franchisee Setups
export const mockFranchiseeSetups: FranchiseeSetup[] = [
  {
    id: "setup_001",
    requestId: "req_003", // Approved request
    franchiseeId: "franchise_001",
    tenantId: "tenant_franchise_001",
    setupStatus: "in_progress",
    franchiseeCode: "BH-KAR-001",
    franchiseType: mockFranchiseTypes[1], // Retail
    businessConfig: {
      businessName: "Bev Hub Koramangala",
      businessType: "retail",
      operatingModel: "b2c",
      serviceAreas: [
        {
          id: "sa_001",
          name: "Koramangala",
          type: "city",
          coverage: [
            "Koramangala 1st Block",
            "Koramangala 2nd Block",
            "Koramangala 3rd Block",
          ],
          isActive: true,
          deliveryCharges: [
            {
              distanceFrom: 0,
              distanceTo: 2,
              charge: 0,
              freeDeliveryThreshold: 500,
            },
            { distanceFrom: 2, distanceTo: 5, charge: 25 },
            { distanceFrom: 5, distanceTo: 8, charge: 50 },
          ],
        },
      ],
      operatingHours: {
        monday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
        tuesday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
        wednesday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
        thursday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
        friday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
        saturday: { isOpen: true, openTime: "08:00", closeTime: "23:00" },
        sunday: { isOpen: true, openTime: "09:00", closeTime: "22:00" },
      },
      paymentMethods: [
        {
          id: "pm_cash",
          type: "cash",
          isActive: true,
          charges: 0,
          processingTime: "immediate",
        },
        {
          id: "pm_upi",
          type: "upi",
          provider: "PhonePe",
          isActive: true,
          charges: 0,
          processingTime: "immediate",
        },
        {
          id: "pm_card",
          type: "card",
          provider: "HDFC Bank",
          isActive: true,
          charges: 1.5,
          processingTime: "2-3 days",
        },
      ],
      deliveryOptions: [
        {
          id: "do_standard",
          name: "Standard Delivery",
          type: "standard",
          deliveryTime: "2-4 hours",
          charges: 25,
          isActive: true,
          applicableAreas: ["all"],
        },
        {
          id: "do_express",
          name: "Express Delivery",
          type: "express",
          deliveryTime: "30-60 mins",
          charges: 50,
          isActive: true,
          applicableAreas: ["nearby"],
        },
      ],
    },
    productCatalog: {
      id: "pc_001",
      franchiseeId: "franchise_001",
      catalogType: "selective",
      categories: mockProductCategories.slice(0, 3),
      products: mockFranchiseeProducts,
      restrictions: [],
      lastUpdated: "2024-01-15T10:00:00Z",
      syncStatus: "synced",
    },
    pricingConfig: {
      id: "pricing_001",
      franchiseeId: "franchise_001",
      pricingModel: "cost_plus",
      marginConfig: {
        defaultMargin: 18,
        marginType: "percentage",
        categoryMargins: [
          {
            categoryId: "cat_soft_drinks",
            categoryName: "Soft Drinks",
            margin: 15,
            marginType: "percentage",
            minMargin: 10,
            maxMargin: 20,
            isNegotiable: true,
          },
          {
            categoryId: "cat_energy_drinks",
            categoryName: "Energy Drinks",
            margin: 22,
            marginType: "percentage",
            minMargin: 18,
            maxMargin: 25,
            isNegotiable: false,
          },
        ],
        volumeDiscounts: [],
        tieredPricing: [],
      },
      priceSlabs: [
        {
          id: "ps_001",
          name: "Bulk Order",
          minQuantity: 50,
          maxQuantity: 100,
          discount: 5,
          discountType: "percentage",
          applicableProducts: ["all"],
          validFrom: "2024-01-01",
          validTo: "2024-12-31",
          isActive: true,
        },
        {
          id: "ps_002",
          name: "Wholesale",
          minQuantity: 100,
          maxQuantity: 999999,
          discount: 8,
          discountType: "percentage",
          applicableProducts: ["all"],
          validFrom: "2024-01-01",
          validTo: "2024-12-31",
          isActive: true,
        },
      ],
      discountRules: [],
      specialPricing: [],
      autoUpdate: true,
      approvalRequired: false,
    },
    operationalSetup: {
      id: "ops_001",
      franchiseeId: "franchise_001",
      inventoryConfig: {
        trackingMethod: "fifo",
        autoReorderEnabled: true,
        reorderRules: [],
        stockAlerts: [],
        expiryManagement: {
          enabled: true,
          alertDays: [7, 3, 1],
          autoRotation: true,
          discountRules: [],
        },
        batchTracking: true,
        serialTracking: false,
      },
      orderConfig: {
        orderNumberFormat: "BH-{YYYY}-{MM}-{####}",
        autoApproval: true,
        approvalRules: [],
        invoiceGeneration: "auto",
        paymentTerms: [],
        deliveryTracking: true,
      },
      customerConfig: {
        customerTypes: [],
        loyaltyProgram: {
          enabled: true,
          pointsPerRupee: 1,
          redemptionRate: 0.05,
          tiers: [],
          benefits: [],
        },
        creditManagement: {
          enabled: false,
          defaultCreditLimit: 0,
          creditTerms: 0,
          interestRate: 0,
          overdueCharges: 0,
          collectionRules: [],
        },
        communicationSettings: {
          channels: [],
          templates: [],
          automationRules: [],
        },
      },
      reportingConfig: {
        dashboards: [],
        reports: [],
        kpis: [],
        automatedReports: [],
      },
      notificationConfig: {
        channels: [],
        rules: [],
        templates: [],
        preferences: [],
      },
    },
    integrationSetup: {
      id: "int_001",
      franchiseeId: "franchise_001",
      posIntegration: {
        enabled: true,
        provider: "Square",
        credentials: {},
        syncFrequency: "real_time",
        syncEntities: ["products", "inventory", "sales"],
        status: "connected",
      },
      accountingIntegration: {
        enabled: false,
        provider: "",
        credentials: {},
        chartOfAccounts: [],
        taxMapping: [],
        syncFrequency: "",
        status: "disconnected",
      },
      ecommerceIntegration: {
        enabled: false,
        platforms: [],
        syncSettings: {
          frequency: "",
          entities: [],
          conflictResolution: "master_wins",
        },
        status: "disconnected",
      },
      logisticsIntegration: {
        enabled: true,
        providers: [
          {
            name: "Dunzo",
            enabled: true,
            credentials: {},
            services: ["same_day_delivery", "express_delivery"],
            coverageAreas: ["Koramangala", "BTM Layout", "HSR Layout"],
          },
        ],
        defaultProvider: "Dunzo",
        trackingEnabled: true,
        status: "connected",
      },
      paymentIntegration: {
        enabled: true,
        gateways: [
          {
            name: "Razorpay",
            enabled: true,
            credentials: {},
            supportedMethods: ["upi", "card", "netbanking", "wallet"],
            charges: {
              transactionFee: 2,
              gatewayFee: 0.5,
              settlementTime: "T+1",
            },
          },
        ],
        defaultGateway: "Razorpay",
        reconciliationEnabled: true,
        status: "connected",
      },
      analyticsIntegration: {
        enabled: false,
        platforms: [],
        kpiTracking: false,
        customMetrics: [],
        status: "disconnected",
      },
    },
    setupSteps: mockSetupSteps,
    createdAt: "2024-01-15T09:00:00Z",
    createdBy: "corp_user_003",
  },
  {
    id: "setup_002",
    requestId: "req_004",
    franchiseeId: "franchise_002",
    tenantId: "tenant_franchise_002",
    setupStatus: "pending",
    franchiseeCode: "BH-MH-002",
    franchiseType: mockFranchiseTypes[0], // Distribution
    businessConfig: {
      businessName: "Mumbai Distribution Hub",
      businessType: "distribution",
      operatingModel: "b2b",
      serviceAreas: [],
      operatingHours: {
        monday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
        tuesday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
        wednesday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
        thursday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
        friday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
        saturday: { isOpen: true, openTime: "06:00", closeTime: "18:00" },
        sunday: { isOpen: false, openTime: "", closeTime: "" },
      },
      paymentMethods: [],
      deliveryOptions: [],
    },
    productCatalog: {
      id: "pc_002",
      franchiseeId: "franchise_002",
      catalogType: "full",
      categories: mockProductCategories,
      products: [],
      restrictions: [],
      lastUpdated: "2024-01-16T10:00:00Z",
      syncStatus: "pending",
    },
    pricingConfig: {
      id: "pricing_002",
      franchiseeId: "franchise_002",
      pricingModel: "cost_plus",
      marginConfig: {
        defaultMargin: 12,
        marginType: "percentage",
        categoryMargins: [],
        volumeDiscounts: [],
        tieredPricing: [],
      },
      priceSlabs: [],
      discountRules: [],
      specialPricing: [],
      autoUpdate: true,
      approvalRequired: true,
    },
    operationalSetup: {
      id: "ops_002",
      franchiseeId: "franchise_002",
      inventoryConfig: {
        trackingMethod: "fifo",
        autoReorderEnabled: true,
        reorderRules: [],
        stockAlerts: [],
        expiryManagement: {
          enabled: true,
          alertDays: [30, 15, 7, 3],
          autoRotation: true,
          discountRules: [],
        },
        batchTracking: true,
        serialTracking: true,
      },
      orderConfig: {
        orderNumberFormat: "MH-{YYYY}-{MM}-{####}",
        autoApproval: false,
        approvalRules: [],
        invoiceGeneration: "manual",
        paymentTerms: [],
        deliveryTracking: true,
      },
      customerConfig: {
        customerTypes: [],
        loyaltyProgram: {
          enabled: false,
          pointsPerRupee: 0,
          redemptionRate: 0,
          tiers: [],
          benefits: [],
        },
        creditManagement: {
          enabled: true,
          defaultCreditLimit: 1000000,
          creditTerms: 30,
          interestRate: 18,
          overdueCharges: 2,
          collectionRules: [],
        },
        communicationSettings: {
          channels: [],
          templates: [],
          automationRules: [],
        },
      },
      reportingConfig: {
        dashboards: [],
        reports: [],
        kpis: [],
        automatedReports: [],
      },
      notificationConfig: {
        channels: [],
        rules: [],
        templates: [],
        preferences: [],
      },
    },
    integrationSetup: {
      id: "int_002",
      franchiseeId: "franchise_002",
      posIntegration: {
        enabled: false,
        provider: "",
        credentials: {},
        syncFrequency: "",
        syncEntities: [],
        status: "disconnected",
      },
      accountingIntegration: {
        enabled: true,
        provider: "Tally",
        credentials: {},
        chartOfAccounts: [],
        taxMapping: [],
        syncFrequency: "daily",
        status: "pending",
      },
      ecommerceIntegration: {
        enabled: false,
        platforms: [],
        syncSettings: {
          frequency: "",
          entities: [],
          conflictResolution: "master_wins",
        },
        status: "disconnected",
      },
      logisticsIntegration: {
        enabled: true,
        providers: [],
        defaultProvider: "",
        trackingEnabled: true,
        status: "pending",
      },
      paymentIntegration: {
        enabled: true,
        gateways: [],
        defaultGateway: "",
        reconciliationEnabled: true,
        status: "pending",
      },
      analyticsIntegration: {
        enabled: true,
        platforms: [],
        kpiTracking: true,
        customMetrics: [],
        status: "pending",
      },
    },
    setupSteps: mockSetupSteps.map((step) => ({
      ...step,
      status: "pending" as const,
    })),
    createdAt: "2024-01-16T10:00:00Z",
    createdBy: "corp_user_001",
  },
];

// Mock Setup Dashboard
export const mockSetupDashboard: SetupDashboard = {
  pendingSetups: 3,
  inProgressSetups: 2,
  completedSetups: 12,
  failedSetups: 1,
  averageSetupTime: 185, // minutes
  recentSetups: mockFranchiseeSetups,
  setupMetrics: {
    successRate: 94.4,
    averageTime: 185,
    commonFailures: [
      { reason: "Integration Timeout", count: 3, percentage: 50 },
      { reason: "Configuration Error", count: 2, percentage: 33.3 },
      { reason: "Validation Failed", count: 1, percentage: 16.7 },
    ],
    performanceByStep: [
      {
        stepName: "Tenant Creation",
        averageTime: 12,
        successRate: 100,
        commonIssues: [],
      },
      {
        stepName: "Code Generation",
        averageTime: 3,
        successRate: 100,
        commonIssues: [],
      },
      {
        stepName: "Franchise Type",
        averageTime: 8,
        successRate: 100,
        commonIssues: [],
      },
      {
        stepName: "Pricing Setup",
        averageTime: 18,
        successRate: 97,
        commonIssues: ["Margin validation"],
      },
      {
        stepName: "Catalog Setup",
        averageTime: 25,
        successRate: 95,
        commonIssues: ["Product mapping", "Restriction conflicts"],
      },
      {
        stepName: "Operational Config",
        averageTime: 22,
        successRate: 92,
        commonIssues: ["Integration conflicts"],
      },
      {
        stepName: "System Integrations",
        averageTime: 45,
        successRate: 85,
        commonIssues: ["API timeouts", "Credential validation"],
      },
      {
        stepName: "Testing & Validation",
        averageTime: 18,
        successRate: 98,
        commonIssues: ["Test data setup"],
      },
      {
        stepName: "Go Live",
        averageTime: 8,
        successRate: 100,
        commonIssues: [],
      },
    ],
  },
};

// Helper Functions
export const getFranchiseeSetupById = (
  id: string,
): FranchiseeSetup | undefined => {
  return mockFranchiseeSetups.find((setup) => setup.id === id);
};

export const getSetupsByStatus = (status: string): FranchiseeSetup[] => {
  return mockFranchiseeSetups.filter((setup) => setup.setupStatus === status);
};

export const getFranchiseTypeById = (id: string): FranchiseType | undefined => {
  return mockFranchiseTypes.find((type) => type.id === id);
};

export const getSetupProgress = (setup: FranchiseeSetup): number => {
  const completedSteps = setup.setupSteps.filter(
    (step) => step.status === "completed",
  ).length;
  return (completedSteps / setup.setupSteps.length) * 100;
};

export const getEstimatedCompletion = (setup: FranchiseeSetup): string => {
  const pendingSteps = setup.setupSteps.filter(
    (step) => step.status === "pending" || step.status === "in_progress",
  );
  const totalTime = pendingSteps.reduce(
    (sum, step) => sum + step.estimatedTime,
    0,
  );

  if (totalTime === 0) return "Completed";
  if (totalTime < 60) return `${totalTime} minutes`;
  if (totalTime < 1440) return `${Math.round(totalTime / 60)} hours`;
  return `${Math.round(totalTime / 1440)} days`;
};

export const validateSetupConfiguration = (
  setup: FranchiseeSetup,
): string[] => {
  const errors: string[] = [];

  // Validate franchise type requirements
  if (!setup.franchiseType) {
    errors.push("Franchise type not selected");
  }

  // Validate pricing configuration
  if (!setup.pricingConfig.marginConfig.defaultMargin) {
    errors.push("Default margin not configured");
  }

  // Validate product catalog
  if (setup.productCatalog.products.length === 0) {
    errors.push("No products configured in catalog");
  }

  // Validate business configuration
  if (!setup.businessConfig.businessName) {
    errors.push("Business name not configured");
  }

  return errors;
};

export const calculateSetupCost = (setup: FranchiseeSetup): number => {
  let cost = 0;

  // Base setup cost
  cost += 50000;

  // Integration costs
  if (setup.integrationSetup.posIntegration.enabled) cost += 25000;
  if (setup.integrationSetup.accountingIntegration.enabled) cost += 15000;
  if (setup.integrationSetup.ecommerceIntegration.enabled) cost += 20000;
  if (setup.integrationSetup.logisticsIntegration.enabled) cost += 10000;
  if (setup.integrationSetup.paymentIntegration.enabled) cost += 15000;
  if (setup.integrationSetup.analyticsIntegration.enabled) cost += 12000;

  // Franchise type specific costs
  switch (setup.franchiseType.type) {
    case "distribution":
      cost += 100000;
      break;
    case "retail":
      cost += 30000;
      break;
    case "warehouse":
      cost += 75000;
      break;
    case "hybrid":
      cost += 60000;
      break;
  }

  return cost;
};

// Mock Setup Templates
export const mockSetupTemplates: SetupTemplate[] = [
  {
    id: "template_001",
    name: "Quick Retail Setup",
    description: "Fast setup for retail outlets with minimal configurations",
    franchiseType: mockFranchiseTypes[1], // Retail
    version: "1.0",
    createdBy: "corp_admin_001",
    createdAt: "2024-01-01T10:00:00Z",
    lastModified: "2024-01-10T15:30:00Z",
    isActive: true,
    usageCount: 15,
    estimatedSetupTime: 45,
    difficulty: "easy",
    tags: ["retail", "quick", "standard"],
    businessConfig: {
      businessType: "retail",
      operatingModel: "b2c",
      operatingHours: {
        monday: { isOpen: true, openTime: "09:00", closeTime: "21:00" },
        tuesday: { isOpen: true, openTime: "09:00", closeTime: "21:00" },
        wednesday: { isOpen: true, openTime: "09:00", closeTime: "21:00" },
        thursday: { isOpen: true, openTime: "09:00", closeTime: "21:00" },
        friday: { isOpen: true, openTime: "09:00", closeTime: "22:00" },
        saturday: { isOpen: true, openTime: "09:00", closeTime: "22:00" },
        sunday: { isOpen: true, openTime: "10:00", closeTime: "21:00" },
      },
      paymentMethods: [
        {
          id: "pm_cash",
          type: "cash",
          isActive: true,
          charges: 0,
          processingTime: "immediate",
        },
        {
          id: "pm_upi",
          type: "upi",
          provider: "PhonePe",
          isActive: true,
          charges: 0,
          processingTime: "immediate",
        },
      ],
    },
    pricingConfig: {
      pricingModel: "cost_plus",
      marginConfig: {
        defaultMargin: 18,
        marginType: "percentage",
        categoryMargins: [],
        volumeDiscounts: [],
        tieredPricing: [],
      },
      autoUpdate: true,
      approvalRequired: false,
    },
    operationalSetup: {
      inventoryConfig: {
        trackingMethod: "fifo",
        autoReorderEnabled: true,
        expiryManagement: {
          enabled: true,
          alertDays: [7, 3, 1],
          autoRotation: true,
          discountRules: [],
        },
        batchTracking: false,
        serialTracking: false,
      },
    },
    integrationSetup: {
      posIntegration: {
        enabled: true,
        provider: "Square",
        syncFrequency: "real_time",
        syncEntities: ["products", "inventory", "sales"],
        status: "disconnected",
      },
      paymentIntegration: {
        enabled: true,
        gateways: [
          {
            name: "Razorpay",
            enabled: true,
            supportedMethods: ["upi", "card"],
            charges: {
              transactionFee: 2,
              gatewayFee: 0.5,
              settlementTime: "T+1",
            },
          },
        ],
        defaultGateway: "Razorpay",
        status: "disconnected",
      },
    },
    requiredSteps: [
      "step_tenant_creation",
      "step_code_generation",
      "step_franchise_type",
      "step_pricing_setup",
    ],
    optionalSteps: ["step_catalog_setup", "step_operational_config"],
    preRequisites: ["Approved franchisee request", "Payment confirmation"],
    postSetupTasks: [
      "Staff training",
      "Initial inventory setup",
      "Marketing material delivery",
    ],
  },
  {
    id: "template_002",
    name: "Distribution Hub Complete",
    description: "Comprehensive setup for large distribution centers",
    franchiseType: mockFranchiseTypes[0], // Distribution
    version: "2.1",
    createdBy: "corp_admin_002",
    createdAt: "2024-01-05T14:00:00Z",
    lastModified: "2024-01-15T09:45:00Z",
    isActive: true,
    usageCount: 7,
    estimatedSetupTime: 180,
    difficulty: "hard",
    tags: ["distribution", "comprehensive", "b2b"],
    businessConfig: {
      businessType: "distribution",
      operatingModel: "b2b",
      operatingHours: {
        monday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
        tuesday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
        wednesday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
        thursday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
        friday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
        saturday: { isOpen: true, openTime: "06:00", closeTime: "18:00" },
        sunday: { isOpen: false, openTime: "", closeTime: "" },
      },
    },
    pricingConfig: {
      pricingModel: "cost_plus",
      marginConfig: {
        defaultMargin: 12,
        marginType: "percentage",
        categoryMargins: [],
        volumeDiscounts: [],
        tieredPricing: [],
      },
      autoUpdate: true,
      approvalRequired: true,
    },
    operationalSetup: {
      inventoryConfig: {
        trackingMethod: "fifo",
        autoReorderEnabled: true,
        expiryManagement: {
          enabled: true,
          alertDays: [30, 15, 7, 3],
          autoRotation: true,
          discountRules: [],
        },
        batchTracking: true,
        serialTracking: true,
      },
    },
    integrationSetup: {
      accountingIntegration: {
        enabled: true,
        provider: "Tally",
        syncFrequency: "daily",
        status: "disconnected",
      },
      logisticsIntegration: {
        enabled: true,
        providers: [
          {
            name: "DTDC",
            enabled: true,
            services: ["bulk_delivery", "express_delivery"],
            coverageAreas: ["Maharashtra", "Gujarat", "Karnataka"],
          },
        ],
        defaultProvider: "DTDC",
        trackingEnabled: true,
        status: "disconnected",
      },
    },
    requiredSteps: [
      "step_tenant_creation",
      "step_code_generation",
      "step_franchise_type",
      "step_pricing_setup",
      "step_catalog_setup",
      "step_operational_config",
      "step_integration_setup",
    ],
    optionalSteps: ["step_testing_validation"],
    preRequisites: [
      "Approved franchisee request",
      "Warehouse facility confirmation",
      "Investment verification",
    ],
    postSetupTasks: [
      "Fleet onboarding",
      "Staff training",
      "Bulk inventory setup",
      "Route optimization",
    ],
  },
  {
    id: "template_003",
    name: "Hybrid Model Standard",
    description: "Balanced setup for retail and distribution operations",
    franchiseType: mockFranchiseTypes[3], // Hybrid
    version: "1.5",
    createdBy: "corp_admin_001",
    createdAt: "2024-01-08T11:30:00Z",
    lastModified: "2024-01-12T16:20:00Z",
    isActive: true,
    usageCount: 9,
    estimatedSetupTime: 120,
    difficulty: "medium",
    tags: ["hybrid", "flexible", "multi-channel"],
    businessConfig: {
      businessType: "hybrid",
      operatingModel: "b2b2c",
    },
    pricingConfig: {
      pricingModel: "cost_plus",
      marginConfig: {
        defaultMargin: 15,
        marginType: "percentage",
        categoryMargins: [],
        volumeDiscounts: [],
        tieredPricing: [],
      },
      autoUpdate: true,
      approvalRequired: false,
    },
    operationalSetup: {
      inventoryConfig: {
        trackingMethod: "fifo",
        autoReorderEnabled: true,
        expiryManagement: {
          enabled: true,
          alertDays: [7, 3, 1],
          autoRotation: true,
          discountRules: [],
        },
        batchTracking: true,
        serialTracking: false,
      },
    },
    integrationSetup: {
      posIntegration: {
        enabled: true,
        provider: "Square",
        syncFrequency: "real_time",
        syncEntities: ["products", "inventory", "sales"],
        status: "disconnected",
      },
      ecommerceIntegration: {
        enabled: true,
        platforms: [],
        syncSettings: {
          frequency: "hourly",
          entities: ["products", "inventory", "orders"],
          conflictResolution: "master_wins",
        },
        status: "disconnected",
      },
    },
    requiredSteps: [
      "step_tenant_creation",
      "step_code_generation",
      "step_franchise_type",
      "step_pricing_setup",
      "step_catalog_setup",
    ],
    optionalSteps: ["step_operational_config", "step_integration_setup"],
    preRequisites: [
      "Approved franchisee request",
      "Flexible space confirmation",
    ],
    postSetupTasks: [
      "Multi-channel setup",
      "Staff training",
      "Inventory categorization",
    ],
  },
];

// Mock Approved Franchisee Requests for New Setup
export const mockApprovedRequests = [
  {
    id: "req_005",
    franchiseeCode: "PENDING",
    businessName: "Fresh Zone Pune",
    ownerName: "Rahul Sharma",
    location: "Pune, Maharashtra",
    franchiseType: "retail",
    status: "approved",
    approvedAt: "2024-01-20T10:30:00Z",
    investment: 2500000,
  },
  {
    id: "req_006",
    franchiseeCode: "PENDING",
    businessName: "Gujarat Distribution Hub",
    ownerName: "Priya Patel",
    location: "Ahmedabad, Gujarat",
    franchiseType: "distribution",
    status: "approved",
    approvedAt: "2024-01-19T14:15:00Z",
    investment: 8000000,
  },
  {
    id: "req_007",
    franchiseeCode: "PENDING",
    businessName: "Bev Express Chennai",
    ownerName: "Arun Kumar",
    location: "Chennai, Tamil Nadu",
    franchiseType: "hybrid",
    status: "approved",
    approvedAt: "2024-01-18T16:45:00Z",
    investment: 4500000,
  },
];

// Template Helper Functions
export const getTemplateById = (id: string): SetupTemplate | undefined => {
  return mockSetupTemplates.find((template) => template.id === id);
};

export const getTemplatesByFranchiseType = (
  franchiseTypeId: string,
): SetupTemplate[] => {
  return mockSetupTemplates.filter(
    (template) => template.franchiseType.id === franchiseTypeId,
  );
};

export const getTemplatesByDifficulty = (
  difficulty: string,
): SetupTemplate[] => {
  return mockSetupTemplates.filter(
    (template) => template.difficulty === difficulty,
  );
};

export const createSetupFromTemplate = (
  templateId: string,
  formData: NewSetupForm,
): Partial<FranchiseeSetup> => {
  const template = getTemplateById(templateId);
  if (!template) {
    throw new Error("Template not found");
  }

  const setupId = `setup_${Date.now()}`;
  const franchiseeCode = generateFranchiseeCode(
    formData.franchiseTypeId,
    formData.region,
  );

  return {
    id: setupId,
    requestId: formData.franchiseeRequestId,
    franchiseeId: `franchise_${Date.now()}`,
    tenantId: `tenant_${Date.now()}`,
    setupStatus: "pending",
    franchiseeCode,
    franchiseType: template.franchiseType,
    businessConfig: {
      ...template.businessConfig,
      businessName: formData.businessName,
      operatingModel: formData.operatingModel,
    },
    pricingConfig: template.pricingConfig,
    operationalSetup: template.operationalSetup,
    integrationSetup: template.integrationSetup,
    setupSteps: generateSetupSteps(
      template.requiredSteps,
      template.optionalSteps,
    ),
    createdAt: new Date().toISOString(),
    createdBy: "current_user",
  };
};

export const generateFranchiseeCode = (
  franchiseTypeId: string,
  region: string,
): string => {
  const franchiseType = mockFranchiseTypes.find(
    (ft) => ft.id === franchiseTypeId,
  );
  const typeCode = franchiseType?.type.substring(0, 2).toUpperCase() || "XX";
  const regionCode = region.substring(0, 2).toUpperCase();
  const sequence = Math.floor(Math.random() * 999) + 1;

  return `${typeCode}-${regionCode}-${sequence.toString().padStart(3, "0")}`;
};

export const generateSetupSteps = (
  requiredSteps: string[],
  optionalSteps: string[],
): SetupStep[] => {
  const allSteps = [...requiredSteps, ...optionalSteps];

  return allSteps.map((stepId, index) => {
    const baseStep = mockSetupSteps.find((s) => s.id === stepId);
    if (!baseStep) {
      return {
        id: stepId,
        name: stepId.replace("step_", "").replace("_", " "),
        description: `Auto-generated step: ${stepId}`,
        order: index + 1,
        status: "pending",
        dependencies: index > 0 ? [allSteps[index - 1]] : [],
        estimatedTime: 15,
      };
    }

    return {
      ...baseStep,
      order: index + 1,
      status: "pending",
    };
  });
};
