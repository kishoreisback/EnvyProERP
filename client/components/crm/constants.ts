// Shared CRM constants and data

export interface TenantInfo {
  id: string;
  name: string;
  type: string;
  industry: string;
  color?: string;
  stats?: {
    totalLeads: number;
    activeDeals: number;
    pipelineValue: string;
    conversionRate: string;
  };
  adminUser?: {
    id: string;
    tenantId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    tenantRole: "admin" | "owner";
  };
}

export const availableTenants: TenantInfo[] = [
  {
    id: "tenant_001",
    name: "BuildCorp Constructions",
    type: "Construction",
    industry: "construction",
    color: "bg-orange-500",
    stats: {
      totalLeads: 245,
      activeDeals: 89,
      pipelineValue: "$1.2M",
      conversionRate: "28.4%",
    },
    adminUser: {
      id: "user_001",
      tenantId: "tenant_001",
      username: "ravi.admin",
      email: "ravi.admin@buildcorp.com",
      firstName: "Ravi",
      lastName: "Kumar",
      tenantRole: "admin",
    },
  },
  {
    id: "tenant_002",
    name: "Metro Realty Group",
    type: "Real Estate",
    industry: "real_estate",
    color: "bg-blue-500",
    stats: {
      totalLeads: 189,
      activeDeals: 67,
      pipelineValue: "$856K",
      conversionRate: "31.2%",
    },
    adminUser: {
      id: "user_004",
      tenantId: "tenant_002",
      username: "suresh.admin",
      email: "suresh.admin@metrorealty.com",
      firstName: "Suresh",
      lastName: "Patel",
      tenantRole: "admin",
    },
  },
  {
    id: "tenant_003",
    name: "Skyline Developers",
    type: "Development",
    industry: "property_development",
    color: "bg-purple-500",
    stats: {
      totalLeads: 225,
      activeDeals: 78,
      pipelineValue: "$1.4M",
      conversionRate: "24.8%",
    },
    adminUser: {
      id: "user_006",
      tenantId: "tenant_003",
      username: "rakesh.owner",
      email: "rakesh.owner@skylinedev.com",
      firstName: "Rakesh",
      lastName: "Aggarwal",
      tenantRole: "owner",
    },
  },
];
