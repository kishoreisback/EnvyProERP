import React, { useState, useMemo, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Users,
  Plus,
  Search,
  Shield,
  Key,
  Activity,
  UserPlus,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  MoreHorizontal,
  Building2,
  Crown,
  Clock,
  Lock,
  Unlock,
  Eye,
  Database,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { AnimatedCounter } from "../ui/animated-counter";
import { usePermissions, ProtectedComponent } from "./PermissionProvider";
import { TenantUser } from "./types";
import { CreateUser } from "./CreateUser";
import { EditUser } from "./EditUser";
import { UserDetails } from "./UserDetails";
import { RoleManagement } from "./RoleManagement";
import { PermissionMatrix } from "./PermissionMatrix";
import { AuditTrail } from "./AuditTrail";
import {
  getTenantUsers,
  getTenantRoles,
  getTenantAnalytics,
  getTenantAuditLogs,
} from "./data";

// Available tenants for switching
const availableTenants = [
  {
    id: "tenant_001",
    name: "BuildCorp Constructions",
    type: "Construction",
    users: 85,
    roles: 8,
  },
  {
    id: "tenant_002",
    name: "Metro Realty Group",
    type: "Real Estate",
    users: 124,
    roles: 12,
  },
  {
    id: "tenant_003",
    name: "Skyline Developers",
    type: "Development",
    users: 42,
    roles: 6,
  },
];

interface UserManagementDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function UserManagementDashboard({
  currentTab = "overview",
  onTabChange,
}: UserManagementDashboardProps) {
  const { user: currentUser, hasPermission, isTenantAdmin } = usePermissions();

  // State management
  const [selectedTenantId, setSelectedTenantId] = useState(
    currentUser?.tenantId || "tenant_001",
  );
  const [activeTab, setActiveTab] = useState(currentTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");

  // Modal states
  const [selectedUser, setSelectedUser] = useState<TenantUser | null>(null);
  const [modals, setModals] = useState({
    createUser: false,
    editUser: false,
    userDetails: false,
  });

  // Get tenant-specific data
  const users = getTenantUsers(selectedTenantId);
  const roles = getTenantRoles(selectedTenantId);
  const analytics = getTenantAnalytics(selectedTenantId);
  const auditLogs = getTenantAuditLogs(selectedTenantId);
  const currentTenant = availableTenants.find((t) => t.id === selectedTenantId);

  // Sync activeTab with currentTab prop
  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  // Handle tab changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
  };

  // Handle tenant switching
  const handleTenantSwitch = (tenantId: string) => {
    setSelectedTenantId(tenantId);
    setSearchQuery("");
    setFilterStatus("all");
    setFilterRole("all");
    setFilterDepartment("all");
    setSelectedUser(null);
  };

  // Get unique departments for filter
  const departments = useMemo(() => {
    const depts = [...new Set(users.map((user) => user.department))];
    return depts.sort();
  }, [users]);

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
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

    if (filterStatus !== "all") {
      filtered = filtered.filter((user) => user.status === filterStatus);
    }

    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.roleId === filterRole);
    }

    if (filterDepartment !== "all") {
      filtered = filtered.filter(
        (user) => user.department === filterDepartment,
      );
    }

    if (!isTenantAdmin() && currentUser) {
      filtered = filtered.filter(
        (user) => user.department === currentUser.department,
      );
    }

    return filtered;
  }, [
    users,
    searchQuery,
    filterStatus,
    filterRole,
    filterDepartment,
    currentUser,
    isTenantAdmin,
  ]);

  // Get role statistics
  const roleStats = useMemo(() => {
    return roles.map((role) => ({
      ...role,
      activeUsers: users.filter(
        (user) => user.roleId === role.id && user.status === "active",
      ).length,
      totalUsers: users.filter((user) => user.roleId === role.id).length,
    }));
  }, [users, roles]);

  // User action handlers
  const handleCreateUser = (userData: any) => {
    const newUser: TenantUser = {
      id: `user_${Date.now()}`,
      tenantId: selectedTenantId,
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      avatar: userData.avatar,
      employeeId: userData.employeeId,
      designation: userData.designation,
      department: userData.department,
      location: userData.location,
      roleId: userData.roleId,
      permissions:
        roles.find((r) => r.id === userData.roleId)?.permissions || [],
      customPermissions: userData.customPermissions || [],
      status: userData.status || "pending",
      emailVerified: userData.emailVerified || false,
      phoneVerified: userData.phoneVerified || false,
      mfaEnabled: userData.mfaEnabled || false,
      tenantRole: userData.tenantRole,
      joinedAt: new Date().toISOString(),
      invitedBy: currentUser?.id || "unknown",
      profile: userData.profile || { bio: "", skills: [], certifications: [] },
      security: userData.security || {
        sessionTimeout: 480,
        deviceTrust: false,
        failedLoginAttempts: 0,
        accountLocked: false,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser?.id || "unknown",
    };

    console.log("User created successfully:", newUser.email);
    setModals((prev) => ({ ...prev, createUser: false }));
  };

  const handleEditUser = (userData: any) => {
    if (!selectedUser) return;

    const updatedUser: TenantUser = {
      ...selectedUser,
      ...userData,
      updatedAt: new Date().toISOString(),
      updatedBy: currentUser?.id || "unknown",
    };

    console.log("User updated successfully:", updatedUser.email);
    setModals((prev) => ({ ...prev, editUser: false }));
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone.",
      )
    ) {
      console.log("User deleted:", userId);
    }
  };

  const handleUserAction = (action: string, user: TenantUser) => {
    switch (action) {
      case "view":
        setSelectedUser(user);
        setModals((prev) => ({ ...prev, userDetails: true }));
        break;
      case "edit":
        setSelectedUser(user);
        setModals((prev) => ({ ...prev, editUser: true }));
        break;
      case "suspend":
      case "activate":
      case "reset-password":
        console.log(`${action} user:`, user.id);
        break;
      case "delete":
        handleDeleteUser(user.id);
        break;
    }
  };

  // Helper functions
  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      suspended: "destructive",
      pending: "outline",
    };
    return variants[status as keyof typeof variants] || "outline";
  };

  const getRoleIcon = (tenantRole: string) => {
    switch (tenantRole) {
      case "owner":
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case "admin":
        return <Shield className="h-4 w-4 text-red-600" />;
      case "member":
        return <UserCheck className="h-4 w-4 text-blue-600" />;
      case "guest":
        return <UserX className="h-4 w-4 text-gray-600" />;
      default:
        return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
    if (modalName !== "createUser") {
      setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Tenant Switching */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">User Management</h1>
          </div>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions across your organization
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="gap-1">
              <Building2 className="h-3 w-3" />
              {currentTenant?.name}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {currentTenant?.type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {users.length} Users
            </Badge>
            <Badge variant="outline" className="text-xs">
              {roles.length} Roles
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Label htmlFor="tenant-select" className="text-sm font-medium">
              Switch Tenant:
            </Label>
            <Select value={selectedTenantId} onValueChange={handleTenantSwitch}>
              <SelectTrigger id="tenant-select" className="w-[280px]">
                <SelectValue placeholder="Select tenant" />
              </SelectTrigger>
              <SelectContent>
                {availableTenants.map((tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{tenant.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {tenant.users} users
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Database className="h-3 w-3" />
            Tenant Data
          </Badge>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Audit Trail
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={analytics.totalUsers} />
                </div>
                <p className="text-xs text-muted-foreground">
                  +{analytics.newUsersThisMonth} from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={analytics.activeUsers} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round(
                    (analytics.activeUsers / analytics.totalUsers) * 100,
                  )}
                  % of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Roles</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={analytics.totalRoles} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {roles.filter((r) => r.type === "custom").length} custom roles
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Invites
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={analytics.pendingInvitations} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting acceptance
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Role Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Role Distribution</CardTitle>
              <CardDescription>
                Users by role in {currentTenant?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {roleStats.map((role) => (
                  <div
                    key={role.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${role.color || "bg-blue-100"}`}
                      >
                        <Shield className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{role.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {role.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{role.activeUsers}</p>
                      <p className="text-xs text-muted-foreground">active</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-[140px]">
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
              <Select
                value={filterDepartment}
                onValueChange={setFilterDepartment}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ProtectedComponent permission="user_management.create_users">
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, createUser: true }))
                }
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </ProtectedComponent>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>
                Manage users for {currentTenant?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {user.avatar ||
                                `${user.firstName[0]}${user.lastName[0]}`}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.tenantRole)}
                          <span className="capitalize">{user.tenantRole}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(user.status) as any}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : "Never"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleUserAction("view", user)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <ProtectedComponent permission="user_management.edit_users">
                              <DropdownMenuItem
                                onClick={() => handleUserAction("edit", user)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                            </ProtectedComponent>
                            {user.status === "active" ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUserAction("suspend", user)
                                }
                              >
                                <Lock className="mr-2 h-4 w-4" />
                                Suspend
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUserAction("activate", user)
                                }
                              >
                                <Unlock className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() =>
                                handleUserAction("reset-password", user)
                              }
                            >
                              <Key className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <ProtectedComponent permission="user_management.delete_users">
                              <DropdownMenuItem
                                onClick={() => handleUserAction("delete", user)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </ProtectedComponent>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-6">
          <RoleManagement tenantId={selectedTenantId} />
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-6">
          <PermissionMatrix tenantId={selectedTenantId} />
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit" className="space-y-6">
          <AuditTrail tenantId={selectedTenantId} auditLogs={auditLogs} />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>User registration trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-bold">
                      +{analytics.newUsersThisMonth}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Month</span>
                    <span className="font-bold">
                      +{analytics.newUsersLastMonth}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth Rate</span>
                    <span className="font-bold text-green-600">
                      +
                      {Math.round(
                        ((analytics.newUsersThisMonth -
                          analytics.newUsersLastMonth) /
                          analytics.newUsersLastMonth) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Users by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept) => {
                    const deptUsers = users.filter(
                      (u) => u.department === dept,
                    ).length;
                    const percentage = Math.round(
                      (deptUsers / users.length) * 100,
                    );
                    return (
                      <div key={dept} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{dept}</span>
                          <span className="font-bold">
                            {deptUsers} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog
        open={modals.createUser}
        onOpenChange={() => closeModal("createUser")}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account for {currentTenant?.name}
            </DialogDescription>
          </DialogHeader>
          <CreateUser
            tenantId={selectedTenantId}
            onSubmit={handleCreateUser}
            onCancel={() => closeModal("createUser")}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={modals.editUser}
        onOpenChange={() => closeModal("editUser")}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information for {selectedUser?.firstName}{" "}
              {selectedUser?.lastName}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <EditUser
              user={selectedUser}
              tenantId={selectedTenantId}
              onSubmit={handleEditUser}
              onCancel={() => closeModal("editUser")}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={modals.userDetails}
        onOpenChange={() => closeModal("userDetails")}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information for {selectedUser?.firstName}{" "}
              {selectedUser?.lastName}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <UserDetails
              user={selectedUser}
              onClose={() => closeModal("userDetails")}
              onEdit={() => {
                closeModal("userDetails");
                setModals((prev) => ({ ...prev, editUser: true }));
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
