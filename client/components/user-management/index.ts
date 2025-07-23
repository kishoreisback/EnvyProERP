// Permission management
export {
  PermissionProvider,
  usePermissions,
  ProtectedComponent,
  useConditionalRender,
  usePermissionGuard,
  useFieldPermissions,
  useDataPermissions,
} from "./PermissionProvider";

// Main dashboard
export { UserManagementDashboard } from "./UserManagementDashboard";

// User management components
export { CreateUser } from "./CreateUser";
export { EditUser } from "./EditUser";
export { UserDetails } from "./UserDetails";

// Role and permission management
export { RoleManagement } from "./RoleManagement";
export { PermissionMatrix } from "./PermissionMatrix";

// Audit and monitoring
export { AuditTrail } from "./AuditTrail";

// Types and data
export * from "./types";
export * from "./data";
