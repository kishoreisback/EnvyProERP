export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  status: "active" | "suspended" | "trial" | "inactive";
  tier: "basic" | "professional" | "enterprise" | "custom";
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;

  // Contact Information
  primaryContact: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };

  // Company Details
  company: {
    name: string;
    industry: string;
    size: "startup" | "small" | "medium" | "large" | "enterprise";
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    website?: string;
    description?: string;
  };

  // Billing Information
  billing: {
    plan: string;
    billingCycle: "monthly" | "quarterly" | "yearly";
    currency: string;
    nextBillingDate: Date;
    paymentMethod: "card" | "bank" | "invoice";
    billingEmail: string;
    taxId?: string;
  };

  // Configuration
  config: TenantConfig;

  // Usage & Limits
  usage: TenantUsage;
  limits: TenantLimits;

  // Features & Permissions
  features: TenantFeatures;

  // Branding
  branding: TenantBranding;

  // Security Settings
  security: TenantSecurity;

  // Analytics
  analytics: TenantAnalytics;
}

export interface TenantConfig {
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  currency: string;
  language: string;
  numberFormat: string;

  // Data Retention
  dataRetention: {
    enabled: boolean;
    retentionPeriod: number; // days
    autoDelete: boolean;
  };

  // Notifications
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    slack: boolean;
    webhook?: string;
  };

  // Integration Settings
  integrations: {
    apiAccess: boolean;
    webhooks: boolean;
    sso: boolean;
    ldap: boolean;
    customDomain: boolean;
  };

  // Backup Settings
  backup: {
    enabled: boolean;
    frequency: "daily" | "weekly" | "monthly";
    retention: number; // days
    location: "cloud" | "local" | "both";
  };
}

export interface TenantUsage {
  currentPeriod: {
    startDate: Date;
    endDate: Date;
  };

  // User Metrics
  users: {
    active: number;
    total: number;
    peak: number;
    limit: number;
  };

  // Data Metrics
  storage: {
    used: number; // GB
    limit: number; // GB
    documents: number;
    files: number;
  };

  // API Usage
  api: {
    calls: number;
    limit: number;
    bandwidth: number; // GB
  };

  // Feature Usage
  features: {
    projects: number;
    reports: number;
    integrations: number;
    workflows: number;
    aiAgents: number;
  };

  // Billing Metrics
  billing: {
    currentCost: number;
    projectedCost: number;
    overageCharges: number;
  };
}

export interface TenantLimits {
  users: number;
  projects: number;
  storage: number; // GB
  apiCalls: number;
  reports: number;
  integrations: number;
  workflows: number;
  aiAgents: number;
  customFields: number;
  dashboards: number;
}

export interface TenantFeatures {
  // Core Features
  projectManagement: boolean;
  crm: boolean;
  hrms: boolean;
  accounting: boolean;
  inventory: boolean;
  reports: boolean;

  // Advanced Features
  aiAgents: boolean;
  workflowBuilder: boolean;
  formBuilder: boolean;
  dashboardBuilder: boolean;
  apiAccess: boolean;

  // Enterprise Features
  sso: boolean;
  ldap: boolean;
  auditLog: boolean;
  customBranding: boolean;
  whiteLabel: boolean;
  customDomain: boolean;

  // Add-on Features
  advancedAnalytics: boolean;
  mobileApp: boolean;
  offlineMode: boolean;
  bulkOperations: boolean;
  dataExport: boolean;
  customIntegrations: boolean;
}

export interface TenantBranding {
  // Logo & Images
  logo: {
    primary: string; // URL
    secondary?: string; // URL
    favicon?: string; // URL
    loginBackground?: string; // URL
  };

  // Colors
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };

  // Typography
  typography: {
    fontFamily: string;
    headingFont?: string;
    fontSize: "small" | "medium" | "large";
  };

  // Layout
  layout: {
    sidebarPosition: "left" | "right";
    headerStyle: "fixed" | "static";
    borderRadius: "none" | "small" | "medium" | "large";
    spacing: "compact" | "comfortable" | "spacious";
  };

  // Custom CSS
  customCss?: string;

  // White Label Settings
  whiteLabel: {
    enabled: boolean;
    companyName: string;
    hideBuilderBranding: boolean;
    customFooter?: string;
    customHeader?: string;
  };
}

export interface TenantSecurity {
  // Authentication
  authentication: {
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      expiryDays: number;
    };
    mfa: {
      required: boolean;
      methods: ("sms" | "email" | "app" | "hardware")[];
    };
    sessionTimeout: number; // minutes
    maxFailedAttempts: number;
    lockoutDuration: number; // minutes
  };

  // Access Control
  accessControl: {
    ipWhitelist: string[];
    allowedCountries: string[];
    requireVPN: boolean;
    allowMobileAccess: boolean;
  };

  // Audit & Compliance
  audit: {
    enabled: boolean;
    logRetention: number; // days
    logLevel: "basic" | "detailed" | "comprehensive";
    realTimeAlerts: boolean;
  };

  // Data Protection
  dataProtection: {
    encryption: "standard" | "enhanced";
    backupEncryption: boolean;
    dataResidency: string; // country code
    gdprCompliant: boolean;
    hipaaCompliant: boolean;
  };
}

export interface TenantAnalytics {
  // Performance Metrics
  performance: {
    averageResponseTime: number; // ms
    uptime: number; // percentage
    errorRate: number; // percentage
    throughput: number; // requests per minute
  };

  // User Engagement
  engagement: {
    dailyActiveUsers: number;
    monthlyActiveUsers: number;
    sessionDuration: number; // minutes
    featureUsage: Record<string, number>;
    loginFrequency: number;
  };

  // Business Metrics
  business: {
    projectsCompleted: number;
    revenueGenerated: number;
    customerSatisfaction: number; // 1-10
    taskCompletionRate: number; // percentage
    timeToValue: number; // days
  };

  // System Health
  health: {
    storageUtilization: number; // percentage
    cpuUsage: number; // percentage
    memoryUsage: number; // percentage
    databaseSize: number; // GB
    activeConnections: number;
  };
}

export interface TenantPlan {
  id: string;
  name: string;
  description: string;
  tier: "basic" | "professional" | "enterprise" | "custom";
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  features: TenantFeatures;
  limits: TenantLimits;
  support: "community" | "standard" | "priority" | "dedicated";
  sla: {
    uptime: number; // percentage
    responseTime: number; // hours
  };
}

export interface TenantInvitation {
  id: string;
  tenantId: string;
  email: string;
  role: string;
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
  status: "pending" | "accepted" | "expired" | "cancelled";
  token: string;
}

export interface TenantAuditLog {
  id: string;
  tenantId: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ip: string;
  userAgent: string;
  timestamp: Date;
  severity: "low" | "medium" | "high" | "critical";
}

export interface TenantBillingHistory {
  id: string;
  tenantId: string;
  period: {
    start: Date;
    end: Date;
  };
  amount: number;
  currency: string;
  status: "pending" | "paid" | "overdue" | "failed";
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  paidAt?: Date;
  dueDate: Date;
  invoiceUrl?: string;
}

export interface TenantMetrics {
  id: string;
  tenantId: string;
  date: Date;
  metrics: {
    users: {
      total: number;
      active: number;
      new: number;
    };
    usage: {
      storage: number;
      apiCalls: number;
      pageViews: number;
      features: Record<string, number>;
    };
    performance: {
      responseTime: number;
      errorRate: number;
      uptime: number;
    };
    business: {
      revenue: number;
      projects: number;
      tasks: number;
    };
  };
}

export interface MultiTenantDashboard {
  totalTenants: number;
  activeTenants: number;
  trialTenants: number;
  suspendedTenants: number;
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  churnRate: number;
  averageRevenuePerUser: number;
  totalUsers: number;
  totalStorage: number;
  totalApiCalls: number;
  topTenants: Tenant[];
  recentActivity: TenantAuditLog[];
  usageAlerts: {
    tenantId: string;
    tenantName: string;
    metric: string;
    current: number;
    limit: number;
    severity: "warning" | "critical";
  }[];
}
