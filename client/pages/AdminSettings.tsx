import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  PermissionProvider,
  usePermissions,
} from "@/components/user-management/PermissionProvider";
import { TenantUser } from "@/components/user-management/types";
import {
  mockTenantUserRoles,
  mockTenantLeadSources,
  mockTenantProjectTypes,
  mockTenantCommissionSlabs,
  mockTenantTaxConfiguration,
  mockTenantTemplates,
  mockTenantOrganization,
  mockAdminAnalytics,
  getTenantData,
} from "@/components/admin-settings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Settings,
  Users,
  UserCog,
  UserCheck,
  Building2,
  FileText,
  Database,
  Plus,
  Edit,
  Eye,
  Copy,
  BarChart3,
  Activity,
  Crown,
  CheckCircle,
  XCircle,
  TrendingUp,
  PercentCircle,
  Calculator,
} from "lucide-react";

// Available tenant options for switching
const availableTenants = [
  { id: "tenant_001", name: "BuildCorp Constructions", type: "Construction" },
  { id: "tenant_002", name: "Metro Realty Group", type: "Real Estate" },
  { id: "tenant_003", name: "Skyline Developers", type: "Development" },
];

// Helper function to format dates safely
const formatDate = (date: Date | string | undefined | null) => {
  if (!date) return "N/A";
  if (typeof date === "string") {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? "N/A"
      : parsedDate.toLocaleDateString();
  }
  return date.toLocaleDateString();
};

// Helper function to calculate usage percentages
const calculateUsagePercentage = (current: number, max: number) => {
  if (max === -1) return 0; // Unlimited
  return Math.min((current / max) * 100, 100);
};

// Main AdminSettings Content Component
function AdminSettingsContent() {
  // Tenant selection state
  const [selectedTenantId, setSelectedTenantId] = useState("tenant_001");

  // Available tenants for selection
  const availableTenants = [
    { id: "tenant_001", name: "BuildCorp Constructions", type: "Construction" },
    { id: "tenant_002", name: "Metro Realty Group", type: "Real Estate" },
    { id: "tenant_003", name: "Skyline Developers", type: "Development" },
  ];

  // Tenant-aware data filtering
  const tenantId = selectedTenantId;
  const tenantUserRoles = getTenantData(mockTenantUserRoles, tenantId);
  const tenantLeadSources = getTenantData(mockTenantLeadSources, tenantId);
  const tenantProjectTypes = getTenantData(mockTenantProjectTypes, tenantId);
  const tenantCommissionSlabs = getTenantData(
    mockTenantCommissionSlabs,
    tenantId,
  );
  const tenantTaxConfiguration = getTenantData(
    mockTenantTaxConfiguration,
    tenantId,
  );
  const tenantTemplates = getTenantData(mockTenantTemplates, tenantId);

  // Modal states - consolidated
  const [modals, setModals] = useState({
    newUser: false,
    newRole: false,
    newLeadSource: false,
    newProject: false,
    newCommission: false,
    newTax: false,
    newTemplate: false,
    documentGenerator: false,
  });

  const toggleModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold">
              Admin Settings & Master Config
            </h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive system configuration and master data management
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="gap-1">
              <Building2 className="h-3 w-3" />
              {availableTenants.find((t) => t.id === tenantId)?.name ||
                "Unknown Tenant"}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Tenant: {tenantId}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {mockAdminAnalytics.totalUsers} Users
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Label htmlFor="tenant-select" className="text-sm font-medium">
              Switch Tenant:
            </Label>
            <Select
              value={selectedTenantId}
              onValueChange={setSelectedTenantId}
            >
              <SelectTrigger id="tenant-select" className="w-[250px]">
                <SelectValue placeholder="Select tenant" />
              </SelectTrigger>
              <SelectContent>
                {availableTenants.map((tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{tenant.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {tenant.type}
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
            Master Data
          </Badge>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users & Roles
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Lead Sources
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Project Config
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Analytics Cards */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockAdminAnalytics.totalUsers}
                </div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lead Sources
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(tenantLeadSources || []).filter((ls) => ls.isActive).length}
                </div>
                <p className="text-xs text-muted-foreground">Active sources</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Project Types
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    (tenantProjectTypes || []).filter((pt) => pt.isActive)
                      .length
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  Configured types
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Templates</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(tenantTemplates || []).filter((t) => t.isActive).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Active templates
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users & Roles Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">User & Role Management</h2>
            <div className="flex gap-2">
              <Button onClick={() => toggleModal("newUser")}>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
              <Button onClick={() => toggleModal("newRole")} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Role
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tenantUserRoles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-500 rounded-lg">
                        <UserCheck className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>{role.name}</CardTitle>
                        <CardDescription>{role.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Users:</span>
                      <span className="font-medium">{role.userCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Permissions:</span>
                      <span className="font-medium">
                        {(role.permissions || []).length === 0
                          ? "All Modules"
                          : `${(role.permissions || []).length} Modules`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Created:</span>
                      <span className="font-medium">
                        {formatDate(role.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium mb-2">Permissions</h4>
                    <div className="flex flex-wrap gap-1">
                      {(role.permissions || [])
                        .slice(0, 3)
                        .map((permission) => (
                          <Badge
                            key={permission}
                            variant="secondary"
                            className="text-xs"
                          >
                            {permission}
                          </Badge>
                        ))}
                      {(role.permissions || []).length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{(role.permissions || []).length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Lead Sources Tab */}
        <TabsContent value="leads" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Lead Source Master</h2>
            <Button onClick={() => toggleModal("newLeadSource")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Lead Source
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tenantLeadSources.map((source) => (
              <Card key={source.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        {source.name}
                      </CardTitle>
                      <CardDescription>{source.description}</CardDescription>
                    </div>
                    <Badge variant={source.isActive ? "default" : "secondary"}>
                      {source.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <p className="font-medium">{source.type}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <p className="font-medium">{source.category}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Conversion:</span>
                      <p className="font-medium">{source.conversionRate}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Leads:</span>
                      <p className="font-medium">{source.leadsGenerated}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Project Config Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Project Configuration</h2>
            <Button onClick={() => toggleModal("newProject")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project Type
            </Button>
          </div>

          <div className="grid gap-6">
            {tenantProjectTypes.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        {project.name}
                      </CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <Badge variant={project.isActive ? "default" : "secondary"}>
                      {project.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <p className="font-medium">{project.category}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">
                        {project.defaultDuration} days
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phases:</span>
                      <p className="font-medium">{project.phases.length}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Milestones:</span>
                      <p className="font-medium">{project.milestones}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Configuration
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      View Templates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Template Management</h2>
            <Button onClick={() => toggleModal("newTemplate")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tenantTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        {template.name}
                      </CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <Badge
                      variant={template.isActive ? "default" : "secondary"}
                    >
                      {template.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium">{template.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Usage:</span>
                      <span>{template.usage?.sent || 0} times</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Variables</h4>
                    <div className="flex flex-wrap gap-1">
                      {(template.content.variables || [])
                        .slice(0, 4)
                        .map((variable) => (
                          <Badge
                            key={variable}
                            variant="secondary"
                            className="text-xs"
                          >
                            {variable}
                          </Badge>
                        ))}
                      {(template.content.variables || []).length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{(template.content.variables || []).length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded max-h-20 overflow-hidden">
                    {(template.content.body || "").substring(0, 100)}...
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Template
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs for Adding New Items */}
      <Dialog open={modals.newUser} onOpenChange={() => toggleModal("newUser")}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="Enter full name" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" placeholder="Enter email address" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {tenantUserRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Create User</Button>
              <Button variant="outline" onClick={() => toggleModal("newUser")}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={modals.newRole} onOpenChange={() => toggleModal("newRole")}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Define a new user role with permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Role Name</Label>
              <Input placeholder="Enter role name" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Role description" />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Create Role</Button>
              <Button variant="outline" onClick={() => toggleModal("newRole")}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Main AdminSettings Component with Provider
export default function AdminSettings() {
  // Mock current user for demonstration
  const currentUser: TenantUser = {
    id: "user_001",
    tenantId: "tenant_001",
    username: "admin",
    email: "admin@tenant001.com",
    fullName: "Tenant Admin",
    role: "admin",
    department: "Administration",
    isActive: true,
    permissions: [
      "admin_settings.view",
      "admin_settings.create",
      "admin_settings.edit",
      "admin_settings.delete",
      "user_management.view",
      "user_management.create",
      "user_management.edit",
      "user_management.delete",
      "*", // Full access
    ],
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-12-21T10:30:00Z",
    metadata: {
      loginCount: 245,
      failedLoginAttempts: 0,
      accountLocked: false,
    },
  };

  return (
    <MainLayout>
      <PermissionProvider user={currentUser} tenantId={currentUser.tenantId}>
        <AdminSettingsContent />
      </PermissionProvider>
    </MainLayout>
  );
}
