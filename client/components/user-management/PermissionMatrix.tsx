import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Key,
  Shield,
  Users,
  Search,
  Filter,
  Save,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { usePermissions, ProtectedComponent } from "./PermissionProvider";
import { getTenantRoles, getTenantUsers } from "./data";

interface PermissionMatrixProps {
  tenantId: string;
}

// Define permission modules and their permissions
const permissionModules = [
  {
    id: "user_management",
    name: "User Management",
    description: "Manage users, roles, and permissions",
    permissions: [
      {
        id: "view",
        name: "View Users",
        description: "View user list and details",
      },
      {
        id: "create_users",
        name: "Create Users",
        description: "Add new users to the system",
      },
      {
        id: "edit_users",
        name: "Edit Users",
        description: "Modify user information",
      },
      {
        id: "delete_users",
        name: "Delete Users",
        description: "Remove users from the system",
      },
      {
        id: "view_roles",
        name: "View Roles",
        description: "View role definitions",
      },
      {
        id: "create_roles",
        name: "Create Roles",
        description: "Create new roles",
      },
      {
        id: "edit_roles",
        name: "Edit Roles",
        description: "Modify role permissions",
      },
      {
        id: "view_permissions",
        name: "View Permissions",
        description: "View permission matrix",
      },
      {
        id: "view_audit",
        name: "View Audit",
        description: "Access audit trail",
      },
    ],
  },
  {
    id: "crm",
    name: "CRM",
    description: "Customer relationship management",
    permissions: [
      { id: "view", name: "View CRM", description: "Access CRM dashboard" },
      {
        id: "view_leads",
        name: "View Leads",
        description: "View lead information",
      },
      {
        id: "create_leads",
        name: "Create Leads",
        description: "Add new leads",
      },
      {
        id: "edit_leads",
        name: "Edit Leads",
        description: "Modify lead information",
      },
      { id: "delete_leads", name: "Delete Leads", description: "Remove leads" },
      {
        id: "view_customers",
        name: "View Customers",
        description: "View customer data",
      },
      {
        id: "manage_customers",
        name: "Manage Customers",
        description: "Full customer management",
      },
    ],
  },
  {
    id: "projects",
    name: "Projects",
    description: "Project management and tracking",
    permissions: [
      {
        id: "view",
        name: "View Projects",
        description: "View project information",
      },
      {
        id: "create",
        name: "Create Projects",
        description: "Create new projects",
      },
      {
        id: "edit",
        name: "Edit Projects",
        description: "Modify project details",
      },
      { id: "delete", name: "Delete Projects", description: "Remove projects" },
      {
        id: "manage_timeline",
        name: "Manage Timeline",
        description: "Edit project timelines",
      },
      {
        id: "manage_resources",
        name: "Manage Resources",
        description: "Assign project resources",
      },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    description: "Financial management and reporting",
    permissions: [
      { id: "view", name: "View Finance", description: "View financial data" },
      {
        id: "view_reports",
        name: "View Reports",
        description: "Access financial reports",
      },
      {
        id: "manage_invoices",
        name: "Manage Invoices",
        description: "Create and manage invoices",
      },
      {
        id: "manage_payments",
        name: "Manage Payments",
        description: "Process payments",
      },
      {
        id: "view_analytics",
        name: "View Analytics",
        description: "Access financial analytics",
      },
    ],
  },
  {
    id: "reports",
    name: "Reports",
    description: "System reporting and analytics",
    permissions: [
      { id: "view", name: "View Reports", description: "Access basic reports" },
      {
        id: "export",
        name: "Export Reports",
        description: "Export report data",
      },
      {
        id: "create_custom",
        name: "Create Custom",
        description: "Create custom reports",
      },
      {
        id: "manage_dashboards",
        name: "Manage Dashboards",
        description: "Configure dashboards",
      },
    ],
  },
];

export function PermissionMatrix({ tenantId }: PermissionMatrixProps) {
  const { hasPermission } = usePermissions();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [filterModule, setFilterModule] = useState<string>("all");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Get tenant-specific data
  const roles = getTenantRoles(tenantId);
  const users = getTenantUsers(tenantId);

  // Permission matrix state - role ID -> permission -> boolean
  const [permissionMatrix, setPermissionMatrix] = useState<{
    [roleId: string]: { [permission: string]: boolean };
  }>(() => {
    const matrix: { [roleId: string]: { [permission: string]: boolean } } = {};

    roles.forEach((role) => {
      matrix[role.id] = {};
      permissionModules.forEach((module) => {
        module.permissions.forEach((permission) => {
          const fullPermission = `${module.id}.${permission.id}`;
          matrix[role.id][fullPermission] =
            role.permissions.includes(fullPermission) ||
            role.permissions.includes("*");
        });
      });
    });

    return matrix;
  });

  // Filter modules based on search and filter
  const filteredModules = useMemo(() => {
    let filtered = permissionModules;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (module) =>
          module.name.toLowerCase().includes(query) ||
          module.description.toLowerCase().includes(query) ||
          module.permissions.some(
            (perm) =>
              perm.name.toLowerCase().includes(query) ||
              perm.description.toLowerCase().includes(query),
          ),
      );
    }

    if (filterModule !== "all") {
      filtered = filtered.filter((module) => module.id === filterModule);
    }

    return filtered;
  }, [searchQuery, filterModule]);

  // Get filtered roles for display
  const filteredRoles = useMemo(() => {
    if (selectedRole === "all") return roles;
    return roles.filter((role) => role.id === selectedRole);
  }, [roles, selectedRole]);

  const handlePermissionChange = (
    roleId: string,
    permission: string,
    enabled: boolean,
  ) => {
    setPermissionMatrix((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permission]: enabled,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = () => {
    // In a real application, this would make API calls to save the changes
    console.log("Saving permission changes:", permissionMatrix);
    setHasUnsavedChanges(false);

    // You would typically update the roles with new permissions here
    // For now, we'll just simulate success
    alert("Permission changes saved successfully!");
  };

  const handleResetChanges = () => {
    // Reset to original state
    const originalMatrix: {
      [roleId: string]: { [permission: string]: boolean };
    } = {};

    roles.forEach((role) => {
      originalMatrix[role.id] = {};
      permissionModules.forEach((module) => {
        module.permissions.forEach((permission) => {
          const fullPermission = `${module.id}.${permission.id}`;
          originalMatrix[role.id][fullPermission] =
            role.permissions.includes(fullPermission) ||
            role.permissions.includes("*");
        });
      });
    });

    setPermissionMatrix(originalMatrix);
    setHasUnsavedChanges(false);
  };

  const getRoleColor = (role: any) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      manager: "bg-blue-100 text-blue-800",
      employee: "bg-green-100 text-green-800",
      external: "bg-yellow-100 text-yellow-800",
    };
    return (
      colors[role.category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800"
    );
  };

  const getPermissionIcon = (enabled: boolean) => {
    if (enabled) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Key className="h-5 w-5" />
            Permission Matrix
          </h2>
          <p className="text-muted-foreground">
            Manage role-based permissions for tenant: {tenantId}
          </p>
        </div>

        {hasUnsavedChanges && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Unsaved Changes
            </Badge>
            <Button onClick={handleSaveChanges} size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button onClick={handleResetChanges} variant="outline" size="sm">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search permissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterModule} onValueChange={setFilterModule}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modules</SelectItem>
            {permissionModules.map((module) => (
              <SelectItem key={module.id} value={module.id}>
                {module.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Role Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRoles.map((role) => {
          const totalPermissions = permissionModules.reduce(
            (sum, module) => sum + module.permissions.length,
            0,
          );
          const enabledPermissions = Object.values(
            permissionMatrix[role.id] || {},
          ).filter(Boolean).length;
          const permissionPercentage = Math.round(
            (enabledPermissions / totalPermissions) * 100,
          );

          return (
            <Card key={role.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{role.name}</CardTitle>
                  <Badge className={getRoleColor(role)}>{role.category}</Badge>
                </div>
                <CardDescription className="text-sm">
                  {enabledPermissions} of {totalPermissions} permissions enabled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Permission Coverage</span>
                    <span className="font-medium">{permissionPercentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${permissionPercentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {role.userCount} users
                    </span>
                    <span>{role.type} role</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Permission Matrix</CardTitle>
          <CardDescription>
            Configure specific permissions for each role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredModules.map((module) => (
              <div key={module.id} className="space-y-4">
                <div className="border-b pb-2">
                  <h3 className="font-semibold text-lg">{module.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Permission</TableHead>
                        {filteredRoles.map((role) => (
                          <TableHead
                            key={role.id}
                            className="text-center min-w-[120px]"
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="font-medium">{role.name}</span>
                              <Badge
                                className={getRoleColor(role)}
                                variant="outline"
                              >
                                {role.category}
                              </Badge>
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {module.permissions.map((permission) => {
                        const fullPermission = `${module.id}.${permission.id}`;

                        return (
                          <TableRow key={permission.id}>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium">
                                  {permission.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {permission.description}
                                </div>
                              </div>
                            </TableCell>
                            {filteredRoles.map((role) => (
                              <TableCell key={role.id} className="text-center">
                                <ProtectedComponent permission="user_management.edit_roles">
                                  <div className="flex items-center justify-center">
                                    {role.permissions.includes("*") ? (
                                      <Badge
                                        variant="default"
                                        className="text-xs"
                                      >
                                        Full Access
                                      </Badge>
                                    ) : (
                                      <Switch
                                        checked={
                                          permissionMatrix[role.id]?.[
                                            fullPermission
                                          ] || false
                                        }
                                        onCheckedChange={(checked) =>
                                          handlePermissionChange(
                                            role.id,
                                            fullPermission,
                                            checked,
                                          )
                                        }
                                        disabled={!role.editable}
                                      />
                                    )}
                                  </div>
                                </ProtectedComponent>
                                <ProtectedComponent
                                  permission="user_management.edit_roles"
                                  fallback={
                                    <div className="flex justify-center">
                                      {getPermissionIcon(
                                        permissionMatrix[role.id]?.[
                                          fullPermission
                                        ] || false,
                                      )}
                                    </div>
                                  }
                                />
                              </TableCell>
                            ))}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Total Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {permissionModules.reduce(
                (sum, module) => sum + module.permissions.length,
                0,
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {permissionModules.length} modules
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Active Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground">
              {roles.filter((r) => r.type === "custom").length} custom roles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Users Affected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              Will be affected by permission changes
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
