import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { TenantUser, Permission } from "./types";

interface PermissionContextType {
  user: TenantUser | null;
  tenantId: string | null;
  permissions: string[];
  hasPermission: (permission: string | string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  canAccess: (resource: string, action: string) => boolean;
  isAdmin: () => boolean;
  isTenantAdmin: () => boolean;
  getEffectivePermissions: () => string[];
}

const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined,
);

interface PermissionProviderProps {
  children: ReactNode;
  user: TenantUser | null;
  tenantId: string | null;
}

export function PermissionProvider({
  children,
  user,
  tenantId,
}: PermissionProviderProps) {
  const contextValue = useMemo(() => {
    const permissions = user
      ? [...user.permissions, ...(user.customPermissions || [])]
      : [];

    const hasPermission = (permission: string | string[]): boolean => {
      if (!user || !permissions.length) return false;

      // Check for wildcard admin permission
      if (permissions.includes("*")) return true;

      const checkSinglePermission = (perm: string): boolean => {
        // Direct match
        if (permissions.includes(perm)) return true;

        // Check for wildcard patterns (e.g., "leads.*" matches "leads.create")
        return permissions.some((userPerm) => {
          if (userPerm.endsWith(".*")) {
            const prefix = userPerm.slice(0, -2); // Remove ".*"
            return perm.startsWith(prefix + ".");
          }
          return false;
        });
      };

      if (Array.isArray(permission)) {
        return permission.some(checkSinglePermission);
      }

      return checkSinglePermission(permission);
    };

    const hasAllPermissions = (perms: string[]): boolean => {
      if (!user || !permissions.length) return false;
      if (permissions.includes("*")) return true;
      return perms.every(hasPermission);
    };

    const hasAnyPermission = (perms: string[]): boolean => {
      if (!user || !permissions.length) return false;
      if (permissions.includes("*")) return true;
      return perms.some(hasPermission);
    };

    const canAccess = (resource: string, action: string): boolean => {
      const permission = `${resource}.${action}`;
      return hasPermission(permission);
    };

    const isAdmin = (): boolean => {
      return (
        user?.tenantRole === "owner" ||
        user?.tenantRole === "admin" ||
        permissions.includes("*")
      );
    };

    const isTenantAdmin = (): boolean => {
      return user?.tenantRole === "owner" || user?.tenantRole === "admin";
    };

    const getEffectivePermissions = (): string[] => {
      return permissions;
    };

    return {
      user,
      tenantId,
      permissions,
      hasPermission,
      hasAllPermissions,
      hasAnyPermission,
      canAccess,
      isAdmin,
      isTenantAdmin,
      getEffectivePermissions,
    };
  }, [user, tenantId]);

  return (
    <PermissionContext.Provider value={contextValue}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error("usePermissions must be used within a PermissionProvider");
  }
  return context;
}

// Higher-Order Component for protecting components
interface ProtectedComponentProps {
  children: ReactNode;
  permissions?: string | string[];
  fallback?: ReactNode;
  hideWhenDenied?: boolean;
  requireAll?: boolean;
  tenantRole?: ("owner" | "admin" | "member" | "guest")[];
}

export function ProtectedComponent({
  children,
  permissions,
  fallback = null,
  hideWhenDenied = false,
  requireAll = false,
  tenantRole,
}: ProtectedComponentProps) {
  const { user, hasPermission, hasAllPermissions, hasAnyPermission } =
    usePermissions();

  // Check tenant role if specified
  if (tenantRole && user && !tenantRole.includes(user.tenantRole)) {
    return hideWhenDenied ? null : (fallback as React.ReactElement);
  }

  // Check permissions if specified
  if (permissions) {
    const hasAccess = Array.isArray(permissions)
      ? requireAll
        ? hasAllPermissions(permissions)
        : hasAnyPermission(permissions)
      : hasPermission(permissions);

    if (!hasAccess) {
      return hideWhenDenied ? null : (fallback as React.ReactElement);
    }
  }

  return <>{children}</>;
}

// Hook for conditional rendering based on permissions
export function useConditionalRender() {
  const { hasPermission, hasAllPermissions, hasAnyPermission, user } =
    usePermissions();

  const renderIf = (
    condition: boolean | (() => boolean),
    component: ReactNode,
    fallback: ReactNode = null,
  ) => {
    const shouldRender =
      typeof condition === "function" ? condition() : condition;
    return shouldRender ? component : fallback;
  };

  const renderIfPermission = (
    permission: string | string[],
    component: ReactNode,
    fallback: ReactNode = null,
  ) => {
    const hasAccess = Array.isArray(permission)
      ? hasAnyPermission(permission)
      : hasPermission(permission);
    return hasAccess ? component : fallback;
  };

  const renderIfAllPermissions = (
    permissions: string[],
    component: ReactNode,
    fallback: ReactNode = null,
  ) => {
    return hasAllPermissions(permissions) ? component : fallback;
  };

  const renderIfRole = (
    roles: ("owner" | "admin" | "member" | "guest")[],
    component: ReactNode,
    fallback: ReactNode = null,
  ) => {
    const hasRole = user && roles.includes(user.tenantRole);
    return hasRole ? component : fallback;
  };

  return {
    renderIf,
    renderIfPermission,
    renderIfAllPermissions,
    renderIfRole,
  };
}

// Permission-aware navigation guard
export function usePermissionGuard() {
  const { hasPermission, hasAllPermissions, user } = usePermissions();

  const canNavigate = (
    route: string,
    requiredPermissions?: string[],
  ): boolean => {
    if (!user) return false;

    // Route-specific permission mapping
    const routePermissions: Record<string, string[]> = {
      "/user-management": ["user_management.view"],
      "/user-management/users": ["user_management.view_users"],
      "/user-management/roles": ["user_management.view_roles"],
      "/user-management/permissions": ["user_management.view_permissions"],
      "/user-management/audit": ["user_management.view_audit"],
      "/crm": ["crm.view"],
      "/crm/leads": ["crm.view_leads"],
      "/crm/communication": ["crm.view", "communication.view"],
      "/projects": ["projects.view"],
      "/hrms": ["hrms.view"],
      "/finance": ["finance.view"],
      "/reports": ["reports.view"],
    };

    const permissions = requiredPermissions || routePermissions[route];

    if (!permissions) return true; // No specific permissions required

    return hasAllPermissions(permissions);
  };

  const getAccessibleRoutes = (): string[] => {
    const allRoutes = [
      "/dashboard",
      "/user-management",
      "/user-management/users",
      "/user-management/roles",
      "/user-management/permissions",
      "/user-management/audit",
      "/crm",
      "/crm/leads",
      "/crm/communication",
      "/projects",
      "/hrms",
      "/finance",
      "/reports",
    ];

    return allRoutes.filter((route) => canNavigate(route));
  };

  return {
    canNavigate,
    getAccessibleRoutes,
  };
}

// Component-level field access control
export function useFieldPermissions() {
  const { hasPermission, user } = usePermissions();

  const canViewField = (field: string, context?: string): boolean => {
    const permission = context ? `${context}.view_${field}` : `view_${field}`;
    return hasPermission(permission);
  };

  const canEditField = (field: string, context?: string): boolean => {
    const permission = context ? `${context}.edit_${field}` : `edit_${field}`;
    return hasPermission(permission);
  };

  const getVisibleFields = (fields: string[], context?: string): string[] => {
    return fields.filter((field) => canViewField(field, context));
  };

  const getEditableFields = (fields: string[], context?: string): string[] => {
    return fields.filter((field) => canEditField(field, context));
  };

  return {
    canViewField,
    canEditField,
    getVisibleFields,
    getEditableFields,
  };
}

// Data filtering based on permissions
export function useDataPermissions() {
  const { hasPermission, user } = usePermissions();

  const filterData = <T extends Record<string, any>>(
    data: T[],
    filterFn: (item: T, user: TenantUser) => boolean,
  ): T[] => {
    if (!user) return [];
    return data.filter((item) => filterFn(item, user));
  };

  const canViewRecord = (record: any, resourceType: string): boolean => {
    // Check if user can view this specific record
    const permission = `${resourceType}.view`;

    if (!hasPermission(permission)) return false;

    // Additional checks based on data ownership, department, etc.
    if (record.tenantId && record.tenantId !== user?.tenantId) return false;
    if (
      record.department &&
      user?.department !== record.department &&
      !user?.tenantRole.includes("admin")
    )
      return false;

    return true;
  };

  const canEditRecord = (record: any, resourceType: string): boolean => {
    const permission = `${resourceType}.edit`;

    if (!hasPermission(permission)) return false;

    // Check ownership and hierarchy
    if (record.createdBy === user?.id) return true;
    if (user?.tenantRole === "owner" || user?.tenantRole === "admin")
      return true;

    return false;
  };

  return {
    filterData,
    canViewRecord,
    canEditRecord,
  };
}
