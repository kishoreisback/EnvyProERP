export interface TenantUser {
  id: string;
  tenantId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;

  // Tenant-specific details
  employeeId?: string;
  designation: string;
  department: string;
  location?: string;

  // Role & Permissions
  roleId: string;
  permissions: string[];
  customPermissions?: string[]; // Additional permissions beyond role

  // Status & Security
  status: "active" | "inactive" | "suspended" | "pending";
  emailVerified: boolean;
  phoneVerified: boolean;
  mfaEnabled: boolean;
  lastLogin?: string;
  lastPasswordChange?: string;

  // Tenant membership
  tenantRole: "owner" | "admin" | "member" | "guest";
  joinedAt: string;
  invitedBy?: string;
  invitationAcceptedAt?: string;

  // Profile
  profile: {
    bio?: string;
    workPhone?: string;
    emergencyContact?: string;
    reportingTo?: string;
    startDate?: string;
    endDate?: string;
    address?: string;
    skills?: string[];
    certifications?: string[];
  };

  // Security
  security: {
    sessionTimeout: number;
    ipWhitelist?: string[];
    deviceTrust: boolean;
    lastLoginIP?: string;
    failedLoginAttempts: number;
    accountLocked: boolean;
    lockedUntil?: string;
  };

  // Audit
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
}

export interface TenantRole {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  type: "system" | "custom";
  category: "admin" | "manager" | "employee" | "external";

  // Permissions
  permissions: string[];
  inheritFrom?: string; // Parent role ID

  // Metadata
  color?: string;
  icon?: string;
  priority: number; // For role hierarchy

  // Restrictions
  maxUsers?: number;
  isDefault?: boolean;
  deletable: boolean;
  editable: boolean;

  // Usage
  userCount: number;

  // Audit
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
}

export interface Permission {
  id: string;
  module: string;
  resource: string;
  action: string;
  description: string;
  category: "system" | "business" | "data" | "security";
  riskLevel: "low" | "medium" | "high" | "critical";
  dependencies?: string[]; // Other permissions required
  exclusions?: string[]; // Permissions that conflict
}

export interface TenantInvitation {
  id: string;
  tenantId: string;
  email: string;
  roleId: string;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: "pending" | "accepted" | "expired" | "revoked";
  acceptedAt?: string;
  revokedAt?: string;
  revokedBy?: string;
  personalMessage?: string;
  customPermissions?: string[];
}

export interface UserSession {
  id: string;
  userId: string;
  tenantId: string;
  deviceId: string;
  deviceType: "desktop" | "mobile" | "tablet" | "unknown";
  browser: string;
  os: string;
  ipAddress: string;
  location?: {
    country: string;
    city: string;
    timezone: string;
  };
  startedAt: string;
  lastActivity: string;
  expiresAt: string;
  isActive: boolean;
  isCurrent: boolean;
}

export interface AuditLog {
  id: string;
  tenantId: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: any;
  result: "success" | "failure" | "partial";
  riskLevel: "low" | "medium" | "high" | "critical";
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  sessionId?: string;
}

export interface AccessControlMatrix {
  tenantId: string;
  roles: {
    [roleId: string]: {
      permissions: string[];
      users: string[];
    };
  };
  users: {
    [userId: string]: {
      roles: string[];
      customPermissions: string[];
      restrictions: string[];
    };
  };
  permissions: {
    [permissionId: string]: {
      roles: string[];
      users: string[];
      restrictions?: any;
    };
  };
}

export interface TenantSecurityPolicy {
  tenantId: string;
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    maxAge: number; // days
    preventReuse: number; // last N passwords
  };
  sessionPolicy: {
    maxDuration: number; // minutes
    idleTimeout: number; // minutes
    maxConcurrentSessions: number;
    requireMFA: boolean;
    trustedDevices: boolean;
  };
  accessPolicy: {
    ipWhitelist?: string[];
    allowedCountries?: string[];
    businessHoursOnly: boolean;
    maxFailedAttempts: number;
    lockoutDuration: number; // minutes
  };
  dataPolicy: {
    exportRestriction: boolean;
    printRestriction: boolean;
    copyRestriction: boolean;
    downloadRestriction: boolean;
    sharingRestriction: boolean;
  };
}

export interface UserAnalytics {
  tenantId: string;
  period: "day" | "week" | "month" | "quarter" | "year";
  startDate: string;
  endDate: string;

  userMetrics: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    suspendedUsers: number;
    pendingInvitations: number;
  };

  activityMetrics: {
    totalLogins: number;
    uniqueLogins: number;
    averageSessionDuration: number;
    mostActiveHour: number;
    mostActiveDay: string;
  };

  securityMetrics: {
    failedLogins: number;
    lockedAccounts: number;
    mfaAdoption: number;
    passwordExpiring: number;
    suspiciousActivity: number;
  };

  permissionMetrics: {
    mostUsedPermissions: Array<{
      permission: string;
      count: number;
    }>;
    roleDistribution: Array<{
      role: string;
      count: number;
      percentage: number;
    }>;
  };
}

// Component-level access control
export interface ComponentPermission {
  component: string;
  requiredPermissions: string[];
  fallbackComponent?: React.ComponentType;
  loadingComponent?: React.ComponentType;
  hideWhenDenied?: boolean;
  showPartialContent?: boolean;
}

// Form interfaces
export interface CreateUserForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  designation: string;
  department: string;
  roleId: string;
  employeeId?: string;
  reportingTo?: string;
  startDate?: string;
  location?: string;
  customPermissions?: string[];
  sendInvitation: boolean;
  personalMessage?: string;
}

export interface EditUserForm extends CreateUserForm {
  id: string;
  status: "active" | "inactive" | "suspended";
  mfaEnabled: boolean;
  sessionTimeout: number;
}

export interface CreateRoleForm {
  name: string;
  description: string;
  category: "admin" | "manager" | "employee" | "external";
  permissions: string[];
  inheritFrom?: string;
  color?: string;
  maxUsers?: number;
  isDefault?: boolean;
}

export interface BulkUserOperation {
  userIds: string[];
  operation:
    | "activate"
    | "deactivate"
    | "suspend"
    | "delete"
    | "change_role"
    | "add_permissions"
    | "remove_permissions";
  params?: any;
}

export interface UserImport {
  file: File;
  mapping: {
    [csvColumn: string]: keyof CreateUserForm;
  };
  options: {
    skipDuplicates: boolean;
    sendInvitations: boolean;
    defaultRole: string;
    defaultDepartment: string;
  };
}
