import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Tenant, TenantBranding, TenantFeatures } from "./types";

interface TenantContextType {
  currentTenant: Tenant | null;
  tenants: Record<string, Tenant>;
  branding: TenantBranding | null;
  features: TenantFeatures | null;
  isFeatureEnabled: (feature: keyof TenantFeatures) => boolean;
  switchTenant: (tenantId: string) => Promise<void>;
  updateBranding: (branding: Partial<TenantBranding>) => void;
  loading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

interface TenantProviderProps {
  children: ReactNode;
  tenantId?: string;
}

export function TenantProvider({ children, tenantId }: TenantProviderProps) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock tenant data - in real app, this would come from API
  const mockTenants: Record<string, Tenant> = {
    "builder-construction": {
      id: "builder-construction",
      name: "Builder Construction Ltd",
      subdomain: "builder",
      status: "active",
      tier: "enterprise",
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date(),

      primaryContact: {
        name: "Rajesh Kumar",
        email: "rajesh@builderconstruction.com",
        phone: "+91 98765 43210",
        role: "Project Director",
      },

      company: {
        name: "Builder Construction Ltd",
        industry: "Construction",
        size: "large",
        address: {
          street: "123 Business Park",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          zipCode: "400001",
        },
        website: "https://builderconstruction.com",
        description:
          "Leading construction company specializing in commercial and residential projects",
      },

      billing: {
        plan: "Enterprise",
        billingCycle: "yearly",
        currency: "INR",
        nextBillingDate: new Date("2024-12-15"),
        paymentMethod: "card",
        billingEmail: "billing@builderconstruction.com",
        taxId: "29ABCDE1234F1Z5",
      },

      config: {
        timezone: "Asia/Kolkata",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "24h",
        currency: "INR",
        language: "en",
        numberFormat: "en-IN",
        dataRetention: {
          enabled: true,
          retentionPeriod: 2555, // 7 years
          autoDelete: false,
        },
        notifications: {
          email: true,
          sms: true,
          push: true,
          slack: true,
          webhook: "https://builderconstruction.com/webhook",
        },
        integrations: {
          apiAccess: true,
          webhooks: true,
          sso: true,
          ldap: true,
          customDomain: true,
        },
        backup: {
          enabled: true,
          frequency: "daily",
          retention: 90,
          location: "both",
        },
      },

      usage: {
        currentPeriod: {
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-12-31"),
        },
        users: { active: 245, total: 320, peak: 289, limit: 500 },
        storage: { used: 450, limit: 1000, documents: 12543, files: 8965 },
        api: { calls: 125000, limit: 1000000, bandwidth: 89.5 },
        features: {
          projects: 156,
          reports: 2340,
          integrations: 8,
          workflows: 23,
          aiAgents: 12,
        },
        billing: {
          currentCost: 85000,
          projectedCost: 92000,
          overageCharges: 0,
        },
      },

      limits: {
        users: 500,
        projects: 1000,
        storage: 1000,
        apiCalls: 1000000,
        reports: 10000,
        integrations: 50,
        workflows: 100,
        aiAgents: 25,
        customFields: 500,
        dashboards: 100,
      },

      features: {
        projectManagement: true,
        crm: true,
        hrms: true,
        accounting: true,
        inventory: true,
        reports: true,
        aiAgents: true,
        workflowBuilder: true,
        formBuilder: true,
        dashboardBuilder: true,
        apiAccess: true,
        sso: true,
        ldap: true,
        auditLog: true,
        customBranding: true,
        whiteLabel: true,
        customDomain: true,
        advancedAnalytics: true,
        mobileApp: true,
        offlineMode: true,
        bulkOperations: true,
        dataExport: true,
        customIntegrations: true,
      },

      branding: {
        logo: {
          primary: "/api/placeholder/200/60",
          secondary: "/api/placeholder/40/40",
          favicon: "/api/placeholder/32/32",
        },
        colors: {
          primary: "#2563eb",
          secondary: "#64748b",
          accent: "#f59e0b",
          background: "#ffffff",
          surface: "#f8fafc",
          text: "#1e293b",
          textSecondary: "#64748b",
          border: "#e2e8f0",
          success: "#059669",
          warning: "#d97706",
          error: "#dc2626",
        },
        typography: {
          fontFamily: "Inter, sans-serif",
          headingFont: "Inter, sans-serif",
          fontSize: "medium",
        },
        layout: {
          sidebarPosition: "left",
          headerStyle: "fixed",
          borderRadius: "medium",
          spacing: "comfortable",
        },
        whiteLabel: {
          enabled: true,
          companyName: "Builder Construction ERP",
          hideBuilderBranding: true,
          customFooter:
            "© 2024 Builder Construction Ltd. All rights reserved.",
        },
      },

      security: {
        authentication: {
          passwordPolicy: {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: true,
            expiryDays: 90,
          },
          mfa: {
            required: true,
            methods: ["app", "sms"],
          },
          sessionTimeout: 480,
          maxFailedAttempts: 5,
          lockoutDuration: 30,
        },
        accessControl: {
          ipWhitelist: ["203.192.123.0/24"],
          allowedCountries: ["IN", "US", "GB"],
          requireVPN: false,
          allowMobileAccess: true,
        },
        audit: {
          enabled: true,
          logRetention: 2555,
          logLevel: "comprehensive",
          realTimeAlerts: true,
        },
        dataProtection: {
          encryption: "enhanced",
          backupEncryption: true,
          dataResidency: "IN",
          gdprCompliant: true,
          hipaaCompliant: false,
        },
      },

      analytics: {
        performance: {
          averageResponseTime: 145,
          uptime: 99.97,
          errorRate: 0.03,
          throughput: 1250,
        },
        engagement: {
          dailyActiveUsers: 189,
          monthlyActiveUsers: 245,
          sessionDuration: 45,
          featureUsage: {
            "project-management": 245,
            crm: 123,
            reports: 89,
            "ai-agents": 67,
          },
          loginFrequency: 4.2,
        },
        business: {
          projectsCompleted: 45,
          revenueGenerated: 12500000,
          customerSatisfaction: 8.7,
          taskCompletionRate: 94.5,
          timeToValue: 14,
        },
        health: {
          storageUtilization: 45,
          cpuUsage: 23,
          memoryUsage: 67,
          databaseSize: 2.3,
          activeConnections: 89,
        },
      },
    },

    "tech-innovations": {
      id: "tech-innovations",
      name: "Tech Innovations Pvt Ltd",
      subdomain: "techinnovations",
      status: "active",
      tier: "professional",
      createdAt: new Date("2023-08-20"),
      updatedAt: new Date(),

      primaryContact: {
        name: "Priya Sharma",
        email: "priya@techinnovations.in",
        phone: "+91 87654 32109",
        role: "CTO",
      },

      company: {
        name: "Tech Innovations Pvt Ltd",
        industry: "Technology",
        size: "medium",
        address: {
          street: "456 Tech Hub",
          city: "Bangalore",
          state: "Karnataka",
          country: "India",
          zipCode: "560001",
        },
        website: "https://techinnovations.in",
        description: "Software development and IT consulting services",
      },

      billing: {
        plan: "Professional",
        billingCycle: "monthly",
        currency: "INR",
        nextBillingDate: new Date("2024-04-01"),
        paymentMethod: "card",
        billingEmail: "accounts@techinnovations.in",
      },

      config: {
        timezone: "Asia/Kolkata",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "12h",
        currency: "INR",
        language: "en",
        numberFormat: "en-IN",
        dataRetention: {
          enabled: true,
          retentionPeriod: 1825, // 5 years
          autoDelete: true,
        },
        notifications: {
          email: true,
          sms: false,
          push: true,
          slack: true,
        },
        integrations: {
          apiAccess: true,
          webhooks: true,
          sso: false,
          ldap: false,
          customDomain: false,
        },
        backup: {
          enabled: true,
          frequency: "weekly",
          retention: 30,
          location: "cloud",
        },
      },

      usage: {
        currentPeriod: {
          startDate: new Date("2024-03-01"),
          endDate: new Date("2024-03-31"),
        },
        users: { active: 45, total: 50, peak: 48, limit: 100 },
        storage: { used: 125, limit: 500, documents: 3421, files: 2156 },
        api: { calls: 25000, limit: 100000, bandwidth: 12.3 },
        features: {
          projects: 23,
          reports: 156,
          integrations: 3,
          workflows: 8,
          aiAgents: 5,
        },
        billing: {
          currentCost: 15000,
          projectedCost: 16500,
          overageCharges: 500,
        },
      },

      limits: {
        users: 100,
        projects: 200,
        storage: 500,
        apiCalls: 100000,
        reports: 1000,
        integrations: 10,
        workflows: 25,
        aiAgents: 10,
        customFields: 100,
        dashboards: 25,
      },

      features: {
        projectManagement: true,
        crm: true,
        hrms: true,
        accounting: false,
        inventory: false,
        reports: true,
        aiAgents: true,
        workflowBuilder: true,
        formBuilder: true,
        dashboardBuilder: true,
        apiAccess: true,
        sso: false,
        ldap: false,
        auditLog: true,
        customBranding: false,
        whiteLabel: false,
        customDomain: false,
        advancedAnalytics: true,
        mobileApp: true,
        offlineMode: false,
        bulkOperations: true,
        dataExport: true,
        customIntegrations: false,
      },

      branding: {
        logo: {
          primary: "/api/placeholder/200/60",
        },
        colors: {
          primary: "#7c3aed",
          secondary: "#64748b",
          accent: "#06b6d4",
          background: "#ffffff",
          surface: "#f8fafc",
          text: "#1e293b",
          textSecondary: "#64748b",
          border: "#e2e8f0",
          success: "#059669",
          warning: "#d97706",
          error: "#dc2626",
        },
        typography: {
          fontFamily: "Inter, sans-serif",
          fontSize: "medium",
        },
        layout: {
          sidebarPosition: "left",
          headerStyle: "fixed",
          borderRadius: "medium",
          spacing: "comfortable",
        },
        whiteLabel: {
          enabled: false,
          companyName: "Tech Innovations ERP",
          hideBuilderBranding: false,
        },
      },

      security: {
        authentication: {
          passwordPolicy: {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: false,
            expiryDays: 180,
          },
          mfa: {
            required: false,
            methods: ["app"],
          },
          sessionTimeout: 360,
          maxFailedAttempts: 3,
          lockoutDuration: 15,
        },
        accessControl: {
          ipWhitelist: [],
          allowedCountries: ["IN"],
          requireVPN: false,
          allowMobileAccess: true,
        },
        audit: {
          enabled: true,
          logRetention: 365,
          logLevel: "detailed",
          realTimeAlerts: false,
        },
        dataProtection: {
          encryption: "standard",
          backupEncryption: true,
          dataResidency: "IN",
          gdprCompliant: true,
          hipaaCompliant: false,
        },
      },

      analytics: {
        performance: {
          averageResponseTime: 189,
          uptime: 99.8,
          errorRate: 0.2,
          throughput: 450,
        },
        engagement: {
          dailyActiveUsers: 32,
          monthlyActiveUsers: 45,
          sessionDuration: 38,
          featureUsage: {
            "project-management": 45,
            crm: 23,
            reports: 15,
            "ai-agents": 12,
          },
          loginFrequency: 3.8,
        },
        business: {
          projectsCompleted: 12,
          revenueGenerated: 2500000,
          customerSatisfaction: 8.2,
          taskCompletionRate: 89.3,
          timeToValue: 21,
        },
        health: {
          storageUtilization: 25,
          cpuUsage: 15,
          memoryUsage: 45,
          databaseSize: 0.8,
          activeConnections: 23,
        },
      },
    },
  };

  // Initialize tenant based on subdomain or tenantId
  useEffect(() => {
    const initializeTenant = async () => {
      setLoading(true);
      setError(null);

      try {
        // In a real app, detect tenant from subdomain or route
        const hostname = window.location.hostname;
        let detectedTenantId = tenantId;

        // Mock subdomain detection
        if (hostname.includes("builder")) {
          detectedTenantId = "builder-construction";
        } else if (hostname.includes("tech")) {
          detectedTenantId = "tech-innovations";
        } else if (!detectedTenantId) {
          // Default to first tenant for demo
          detectedTenantId = "builder-construction";
        }

        const tenant = mockTenants[detectedTenantId];
        if (tenant) {
          setCurrentTenant(tenant);

          // Apply branding to document
          applyBranding(tenant.branding);
        } else {
          setError("Tenant not found");
        }
      } catch (err) {
        setError("Failed to load tenant configuration");
        console.error("Tenant initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeTenant();
  }, [tenantId]);

  // Apply branding to the document
  const applyBranding = (branding: TenantBranding) => {
    const root = document.documentElement;

    // Apply CSS custom properties
    root.style.setProperty("--color-primary", branding.colors.primary);
    root.style.setProperty("--color-secondary", branding.colors.secondary);
    root.style.setProperty("--color-accent", branding.colors.accent);
    root.style.setProperty("--color-background", branding.colors.background);
    root.style.setProperty("--color-surface", branding.colors.surface);
    root.style.setProperty("--color-text", branding.colors.text);
    root.style.setProperty(
      "--color-text-secondary",
      branding.colors.textSecondary,
    );
    root.style.setProperty("--color-border", branding.colors.border);
    root.style.setProperty("--color-success", branding.colors.success);
    root.style.setProperty("--color-warning", branding.colors.warning);
    root.style.setProperty("--color-error", branding.colors.error);

    // Apply font family
    root.style.setProperty("--font-family", branding.typography.fontFamily);

    // Update favicon if available
    if (branding.logo.favicon) {
      const favicon = document.querySelector(
        'link[rel="icon"]',
      ) as HTMLLinkElement;
      if (favicon) {
        favicon.href = branding.logo.favicon;
      }
    }

    // Update title if white-label is enabled
    if (branding.whiteLabel.enabled && branding.whiteLabel.companyName) {
      document.title = branding.whiteLabel.companyName;
    }
  };

  const isFeatureEnabled = (feature: keyof TenantFeatures): boolean => {
    return currentTenant?.features[feature] || false;
  };

  const switchTenant = async (newTenantId: string): Promise<void> => {
    const tenant = mockTenants[newTenantId];
    if (tenant) {
      setCurrentTenant(tenant);
      applyBranding(tenant.branding);
    } else {
      throw new Error("Tenant not found");
    }
  };

  const updateBranding = (newBranding: Partial<TenantBranding>) => {
    if (currentTenant) {
      const updatedBranding = { ...currentTenant.branding, ...newBranding };
      setCurrentTenant({
        ...currentTenant,
        branding: updatedBranding,
      });
      applyBranding(updatedBranding);
    }
  };

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        tenants: mockTenants,
        branding: currentTenant?.branding || null,
        features: currentTenant?.features || null,
        isFeatureEnabled,
        switchTenant,
        updateBranding,
        loading,
        error,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}

export function useFeature(feature: keyof TenantFeatures) {
  const { isFeatureEnabled } = useTenant();
  return isFeatureEnabled(feature);
}
