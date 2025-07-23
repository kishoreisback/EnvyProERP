// Multi-Tenant Admin Settings Types

export interface TenantUserRole {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  userCount: number;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface TenantLeadSource {
  id: string;
  tenantId: string;
  name: string;
  type: string;
  category: string;
  description: string;
  isActive: boolean;
  priority: number;
  conversionRate: number;
  cost: number;
  leadsGenerated: number;
  createdAt: string;
  settings: {
    autoAssignment: boolean;
    followUpRequired: boolean;
    scoringWeight: number;
  };
}

export interface TenantProjectType {
  id: string;
  tenantId: string;
  name: string;
  category: string;
  description: string;
  isActive: boolean;
  defaultDuration: number;
  phases: string[];
  milestones: number;
  approvals: string[];
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TenantCommissionSlab {
  id: string;
  tenantId: string;
  name: string;
  type: string;
  category: string;
  description: string;
  slabs: Array<{
    from: number;
    to: number | null;
    rate: number;
    type: "percentage" | "fixed";
  }>;
  isActive: boolean;
  effectiveFrom: Date;
  effectiveTo: Date | null;
  partners: number;
  totalCommission: number;
}

export interface TenantTaxConfiguration {
  id: string;
  tenantId: string;
  name: string;
  type: string;
  category: string;
  description: string;
  rates: Array<{
    type: string;
    rate: number;
    isActive: boolean;
  }>;
  isActive: boolean;
  hsnCode?: string;
  effectiveFrom: Date;
  applicableTo: string[];
}

export interface TenantTemplate {
  id: string;
  tenantId: string;
  name: string;
  type: string;
  category: string;
  description: string;
  isActive: boolean;
  version: string;
  content: {
    subject?: string;
    body: string;
    variables: string[];
  };
  usage: {
    sent: number;
    opened: number;
    clicked: number;
  };
  lastUsed: Date | null;
  createdAt: string;
  updatedAt: string;
}

export interface TenantDocumentType {
  id: string;
  tenantId: string;
  name: string;
  category: string;
  description: string;
  isActive: boolean;
  template: string;
  variables: string[];
  formatting: {
    fontSize: number;
    fontFamily: string;
    margins: string;
    headers: boolean;
    footers: boolean;
  };
  generated: number;
  lastGenerated: Date | null;
}

export interface TenantESignatureProvider {
  id: string;
  tenantId: string;
  name: string;
  provider: string;
  description: string;
  isActive: boolean;
  pricing: string;
  documentsProcessed: number;
  successRate: number;
  averageTime: string;
  apiStatus: "connected" | "disconnected" | "error";
  lastSync: Date | null;
  configuration: {
    apiKey?: string;
    webhookUrl?: string;
    callbackUrl?: string;
  };
}

export interface TenantOrganization {
  id: string;
  tenantId: string;
  name: string;
  industry: string;
  size: string;
  founded: string;
  headquarters: string;
  structure: {
    ceo: {
      name: string;
      position: string;
      department: string;
      reports: number;
      avatar?: string;
      email: string;
      phone: string;
    };
    departments: TenantDepartment[];
    totalEmployees: number;
    locations: string[];
  };
  settings: {
    workingHours: {
      start: string;
      end: string;
      timezone: string;
    };
    holidays: string[];
    fiscalYearStart: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TenantDepartment {
  id: string;
  tenantId: string;
  organizationId: string;
  name: string;
  head: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  employees: number;
  budget: number;
  performance: number;
  color: string;
  parentDepartmentId?: string;
  units: Array<{
    name: string;
    head: string;
    employees: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSettingsAnalytics {
  tenantId: string;
  period: string;
  totalUsers: number;
  activeRoles: number;
  leadSources: number;
  templates: number;
  documentsGenerated: number;
  configurationChanges: number;
  lastActivity: string;
}
