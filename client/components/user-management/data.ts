import { TenantUser, TenantRole, UserAnalytics, AuditLog } from "./types";

// Mock users for multiple tenants
export const mockUsers: TenantUser[] = [
  // Tenant 1 - BuildCorp Constructions
  {
    id: "user_001",
    tenantId: "tenant_001",
    username: "john.admin",
    email: "john.admin@buildcorp.com",
    firstName: "John",
    lastName: "Admin",
    phone: "+91-9876543210",
    avatar: "JA",
    employeeId: "BC001",
    designation: "System Administrator",
    department: "IT",
    location: "Mumbai Office",
    roleId: "role_admin_001",
    permissions: ["*"],
    customPermissions: [],
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    mfaEnabled: true,
    lastLogin: "2024-01-25T10:30:00Z",
    lastPasswordChange: "2024-01-01T00:00:00Z",
    tenantRole: "admin",
    joinedAt: "2024-01-01T00:00:00Z",
    invitedBy: "system",
    invitationAcceptedAt: "2024-01-01T00:05:00Z",
    profile: {
      bio: "System Administrator with 5+ years experience",
      workPhone: "+91-22-12345678",
      emergencyContact: "+91-9876543211",
      reportingTo: "",
      startDate: "2024-01-01",
      address: "123 Admin Street, Mumbai",
      skills: ["System Administration", "User Management", "Security"],
      certifications: ["CISSP", "CISA"],
    },
    security: {
      sessionTimeout: 480,
      ipWhitelist: ["192.168.1.0/24"],
      deviceTrust: true,
      lastLoginIP: "192.168.1.100",
      failedLoginAttempts: 0,
      accountLocked: false,
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-25T10:30:00Z",
    createdBy: "system",
    updatedBy: "user_001",
  },
  {
    id: "user_002",
    tenantId: "tenant_001",
    username: "sarah.manager",
    email: "sarah.manager@buildcorp.com",
    firstName: "Sarah",
    lastName: "Thompson",
    phone: "+91-9876543220",
    avatar: "ST",
    employeeId: "BC002",
    designation: "Project Manager",
    department: "Construction",
    location: "Mumbai Office",
    roleId: "role_manager_001",
    permissions: [
      "projects.view",
      "projects.create",
      "projects.edit",
      "teams.manage",
      "reports.view",
    ],
    customPermissions: [],
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    mfaEnabled: false,
    lastLogin: "2024-01-24T16:45:00Z",
    tenantRole: "member",
    joinedAt: "2024-01-02T00:00:00Z",
    invitedBy: "user_001",
    profile: {
      bio: "Project Manager specializing in residential construction",
      skills: ["Project Management", "Construction", "Team Leadership"],
      certifications: ["PMP", "Construction Management"],
    },
    security: {
      sessionTimeout: 480,
      deviceTrust: false,
      failedLoginAttempts: 0,
      accountLocked: false,
    },
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-24T16:45:00Z",
    createdBy: "user_001",
  },
  {
    id: "user_003",
    tenantId: "tenant_001",
    username: "mike.engineer",
    email: "mike.engineer@buildcorp.com",
    firstName: "Mike",
    lastName: "Johnson",
    phone: "+91-9876543230",
    avatar: "MJ",
    employeeId: "BC003",
    designation: "Site Engineer",
    department: "Construction",
    location: "Pune Office",
    roleId: "role_engineer_001",
    permissions: [
      "projects.view",
      "quality.check",
      "safety.report",
      "materials.track",
    ],
    customPermissions: [],
    status: "active",
    emailVerified: true,
    phoneVerified: false,
    mfaEnabled: false,
    lastLogin: "2024-01-23T08:15:00Z",
    tenantRole: "member",
    joinedAt: "2024-01-03T00:00:00Z",
    invitedBy: "user_001",
    profile: {
      bio: "Site Engineer with expertise in quality control",
      skills: ["Site Engineering", "Quality Control", "Safety Management"],
      certifications: ["Safety Management", "Quality Assurance"],
    },
    security: {
      sessionTimeout: 240,
      deviceTrust: false,
      failedLoginAttempts: 0,
      accountLocked: false,
    },
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-23T08:15:00Z",
    createdBy: "user_001",
  },

  // Tenant 2 - Metro Realty Group
  {
    id: "user_004",
    tenantId: "tenant_002",
    username: "priya.admin",
    email: "priya.admin@metrorealty.com",
    firstName: "Priya",
    lastName: "Sharma",
    phone: "+91-9876543240",
    avatar: "PS",
    employeeId: "MR001",
    designation: "Admin Manager",
    department: "Administration",
    location: "Delhi Office",
    roleId: "role_admin_002",
    permissions: ["*"],
    customPermissions: [],
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    mfaEnabled: true,
    lastLogin: "2024-01-25T09:20:00Z",
    tenantRole: "admin",
    joinedAt: "2024-02-01T00:00:00Z",
    invitedBy: "system",
    profile: {
      bio: "Real Estate Administration Expert",
      skills: ["Administration", "Real Estate", "Team Management"],
      certifications: ["Real Estate License", "Property Management"],
    },
    security: {
      sessionTimeout: 600,
      deviceTrust: true,
      failedLoginAttempts: 0,
      accountLocked: false,
    },
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-01-25T09:20:00Z",
    createdBy: "system",
  },
  {
    id: "user_005",
    tenantId: "tenant_002",
    username: "rahul.sales",
    email: "rahul.sales@metrorealty.com",
    firstName: "Rahul",
    lastName: "Kumar",
    phone: "+91-9876543250",
    avatar: "RK",
    employeeId: "MR002",
    designation: "Sales Manager",
    department: "Sales",
    location: "Delhi Office",
    roleId: "role_sales_002",
    permissions: [
      "crm.view",
      "crm.view_leads",
      "crm.create_leads",
      "crm.edit_leads",
      "properties.view",
    ],
    customPermissions: [],
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    mfaEnabled: false,
    lastLogin: "2024-01-24T18:30:00Z",
    tenantRole: "member",
    joinedAt: "2024-02-02T00:00:00Z",
    invitedBy: "user_004",
    profile: {
      bio: "Sales professional with 8+ years in real estate",
      skills: ["Sales", "Customer Relations", "Real Estate"],
      certifications: ["Sales Excellence", "Real Estate Sales"],
    },
    security: {
      sessionTimeout: 480,
      deviceTrust: false,
      failedLoginAttempts: 0,
      accountLocked: false,
    },
    createdAt: "2024-02-02T00:00:00Z",
    updatedAt: "2024-01-24T18:30:00Z",
    createdBy: "user_004",
  },

  // Tenant 3 - Skyline Developers
  {
    id: "user_006",
    tenantId: "tenant_003",
    username: "amit.owner",
    email: "amit.owner@skylinedev.com",
    firstName: "Amit",
    lastName: "Patel",
    phone: "+91-9876543260",
    avatar: "AP",
    employeeId: "SD001",
    designation: "Owner",
    department: "Management",
    location: "Ahmedabad Office",
    roleId: "role_owner_003",
    permissions: ["*"],
    customPermissions: [],
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    mfaEnabled: true,
    lastLogin: "2024-01-25T07:45:00Z",
    tenantRole: "owner",
    joinedAt: "2024-03-01T00:00:00Z",
    invitedBy: "system",
    profile: {
      bio: "Founder and Owner of Skyline Developers",
      skills: ["Business Development", "Real Estate", "Strategy"],
      certifications: ["MBA", "Real Estate Development"],
    },
    security: {
      sessionTimeout: 720,
      deviceTrust: true,
      failedLoginAttempts: 0,
      accountLocked: false,
    },
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-01-25T07:45:00Z",
    createdBy: "system",
  },
];

// Mock roles for multiple tenants
export const mockRoles: TenantRole[] = [
  // Tenant 1 - BuildCorp Constructions
  {
    id: "role_admin_001",
    tenantId: "tenant_001",
    name: "System Administrator",
    description: "Full system access and administration",
    type: "system",
    category: "admin",
    permissions: ["*"],
    color: "bg-red-500",
    priority: 1,
    deletable: false,
    editable: false,
    userCount: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    createdBy: "system",
  },
  {
    id: "role_manager_001",
    tenantId: "tenant_001",
    name: "Project Manager",
    description: "Manages construction projects and teams",
    type: "custom",
    category: "manager",
    permissions: [
      "projects.view",
      "projects.create",
      "projects.edit",
      "teams.manage",
      "reports.view",
    ],
    color: "bg-blue-500",
    priority: 2,
    deletable: true,
    editable: true,
    userCount: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    createdBy: "user_001",
  },
  {
    id: "role_engineer_001",
    tenantId: "tenant_001",
    name: "Site Engineer",
    description: "On-site engineering and quality control",
    type: "custom",
    category: "employee",
    permissions: [
      "projects.view",
      "quality.check",
      "safety.report",
      "materials.track",
    ],
    color: "bg-green-500",
    priority: 3,
    deletable: true,
    editable: true,
    userCount: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    createdBy: "user_001",
  },

  // Tenant 2 - Metro Realty Group
  {
    id: "role_admin_002",
    tenantId: "tenant_002",
    name: "Admin Manager",
    description: "Administrative access for real estate operations",
    type: "system",
    category: "admin",
    permissions: ["*"],
    color: "bg-purple-500",
    priority: 1,
    deletable: false,
    editable: false,
    userCount: 1,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
    createdBy: "system",
  },
  {
    id: "role_sales_002",
    tenantId: "tenant_002",
    name: "Sales Manager",
    description: "Manages real estate sales and customer relations",
    type: "custom",
    category: "manager",
    permissions: [
      "crm.view",
      "crm.view_leads",
      "crm.create_leads",
      "crm.edit_leads",
      "properties.view",
      "customers.manage",
    ],
    color: "bg-orange-500",
    priority: 2,
    deletable: true,
    editable: true,
    userCount: 1,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
    createdBy: "user_004",
  },

  // Tenant 3 - Skyline Developers
  {
    id: "role_owner_003",
    tenantId: "tenant_003",
    name: "Owner",
    description: "Full ownership and control",
    type: "system",
    category: "admin",
    permissions: ["*"],
    color: "bg-yellow-500",
    priority: 1,
    deletable: false,
    editable: false,
    userCount: 1,
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
    createdBy: "system",
  },
];

// Mock analytics per tenant
export const mockAnalytics: { [tenantId: string]: UserAnalytics } = {
  tenant_001: {
    totalUsers: 3,
    activeUsers: 3,
    inactiveUsers: 0,
    pendingInvitations: 0,
    totalRoles: 3,
    customRoles: 2,
    systemRoles: 1,
    newUsersThisMonth: 2,
    newUsersLastMonth: 1,
    userGrowthRate: 100,
    averageSessionDuration: 45,
    loginFrequency: 0.85,
    mfaAdoptionRate: 0.33,
    lastActivityDate: "2024-01-25T10:30:00Z",
  },
  tenant_002: {
    totalUsers: 2,
    activeUsers: 2,
    inactiveUsers: 0,
    pendingInvitations: 1,
    totalRoles: 2,
    customRoles: 1,
    systemRoles: 1,
    newUsersThisMonth: 1,
    newUsersLastMonth: 1,
    userGrowthRate: 0,
    averageSessionDuration: 52,
    loginFrequency: 0.92,
    mfaAdoptionRate: 0.5,
    lastActivityDate: "2024-01-25T09:20:00Z",
  },
  tenant_003: {
    totalUsers: 1,
    activeUsers: 1,
    inactiveUsers: 0,
    pendingInvitations: 0,
    totalRoles: 1,
    customRoles: 0,
    systemRoles: 1,
    newUsersThisMonth: 0,
    newUsersLastMonth: 1,
    userGrowthRate: -100,
    averageSessionDuration: 38,
    loginFrequency: 0.78,
    mfaAdoptionRate: 1.0,
    lastActivityDate: "2024-01-25T07:45:00Z",
  },
};

// Mock audit logs per tenant
export const mockAuditLogs: { [tenantId: string]: AuditLog[] } = {
  tenant_001: [
    {
      id: "audit_001",
      tenantId: "tenant_001",
      userId: "user_001",
      userName: "John Admin",
      action: "user.created",
      resource: "user_002",
      resourceType: "user",
      details: {
        targetUser: "sarah.manager@buildcorp.com",
        role: "Project Manager",
        department: "Construction",
      },
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      timestamp: "2024-01-25T10:30:00Z",
      status: "success",
      severity: "info",
    },
    {
      id: "audit_002",
      tenantId: "tenant_001",
      userId: "user_002",
      userName: "Sarah Thompson",
      action: "user.login",
      resource: "system",
      resourceType: "authentication",
      details: {
        method: "password",
        mfaUsed: false,
      },
      ipAddress: "192.168.1.150",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      timestamp: "2024-01-24T16:45:00Z",
      status: "success",
      severity: "info",
    },
  ],
  tenant_002: [
    {
      id: "audit_003",
      tenantId: "tenant_002",
      userId: "user_004",
      userName: "Priya Sharma",
      action: "role.created",
      resource: "role_sales_002",
      resourceType: "role",
      details: {
        roleName: "Sales Manager",
        permissions: ["crm.view", "crm.create_leads", "properties.view"],
      },
      ipAddress: "192.168.2.100",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      timestamp: "2024-01-25T09:20:00Z",
      status: "success",
      severity: "info",
    },
  ],
  tenant_003: [
    {
      id: "audit_004",
      tenantId: "tenant_003",
      userId: "user_006",
      userName: "Amit Patel",
      action: "user.login",
      resource: "system",
      resourceType: "authentication",
      details: {
        method: "password",
        mfaUsed: true,
      },
      ipAddress: "192.168.3.100",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
      timestamp: "2024-01-25T07:45:00Z",
      status: "success",
      severity: "info",
    },
  ],
};

// Helper functions for tenant-specific data retrieval
export const getTenantUsers = (tenantId: string): TenantUser[] => {
  return mockUsers.filter((user) => user.tenantId === tenantId);
};

export const getTenantRoles = (tenantId: string): TenantRole[] => {
  return mockRoles.filter((role) => role.tenantId === tenantId);
};

export const getTenantAnalytics = (tenantId: string): UserAnalytics => {
  return (
    mockAnalytics[tenantId] || {
      totalUsers: 0,
      activeUsers: 0,
      inactiveUsers: 0,
      pendingInvitations: 0,
      totalRoles: 0,
      customRoles: 0,
      systemRoles: 0,
      newUsersThisMonth: 0,
      newUsersLastMonth: 0,
      userGrowthRate: 0,
      averageSessionDuration: 0,
      loginFrequency: 0,
      mfaAdoptionRate: 0,
      lastActivityDate: new Date().toISOString(),
    }
  );
};

export const getTenantAuditLogs = (tenantId: string): AuditLog[] => {
  return mockAuditLogs[tenantId] || [];
};

// Utility functions for data manipulation
export const filterUsers = (
  users: TenantUser[],
  filters: {
    search?: string;
    status?: string;
    role?: string;
    department?: string;
  },
): TenantUser[] => {
  let filtered = users;

  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.designation.toLowerCase().includes(query) ||
        user.department.toLowerCase().includes(query) ||
        user.employeeId?.toLowerCase().includes(query),
    );
  }

  if (filters.status && filters.status !== "all") {
    filtered = filtered.filter((user) => user.status === filters.status);
  }

  if (filters.role && filters.role !== "all") {
    filtered = filtered.filter((user) => user.roleId === filters.role);
  }

  if (filters.department && filters.department !== "all") {
    filtered = filtered.filter(
      (user) => user.department === filters.department,
    );
  }

  return filtered;
};

export const getUserStatistics = (users: TenantUser[]) => {
  const total = users.length;
  const active = users.filter((u) => u.status === "active").length;
  const inactive = users.filter((u) => u.status === "inactive").length;
  const suspended = users.filter((u) => u.status === "suspended").length;
  const pending = users.filter((u) => u.status === "pending").length;
  const mfaEnabled = users.filter((u) => u.mfaEnabled).length;

  return {
    total,
    active,
    inactive,
    suspended,
    pending,
    mfaEnabled,
    mfaAdoptionRate: total > 0 ? Math.round((mfaEnabled / total) * 100) : 0,
  };
};

export const getRoleStatistics = (roles: TenantRole[], users: TenantUser[]) => {
  return roles.map((role) => ({
    ...role,
    userCount: users.filter((user) => user.roleId === role.id).length,
    activeUserCount: users.filter(
      (user) => user.roleId === role.id && user.status === "active",
    ).length,
  }));
};
