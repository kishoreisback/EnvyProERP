import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Shield,
  Eye,
  Copy,
} from "lucide-react";
import { getTenantRoles } from "./data";

interface RoleManagementProps {
  tenantId: string;
}

interface RoleFormData {
  name: string;
  description: string;
  category: string;
  permissions: string[];
  priority: number;
  color: string;
  maxUsers?: number;
  isDefault: boolean;
  deletable: boolean;
  editable: boolean;
}

const categories = ["admin", "manager", "employee", "external"];
const colors = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#6B7280",
];

const availablePermissions = [
  "user_management.view",
  "user_management.create_users",
  "user_management.edit_users",
  "user_management.delete_users",
  "crm.view",
  "crm.view_leads",
  "crm.create_leads",
  "crm.edit_leads",
  "communication.view",
  "communication.send",
  "projects.view",
  "hrms.view",
  "finance.view",
  "reports.view",
];

export function RoleManagement({ tenantId }: RoleManagementProps) {
  const [roles, setRoles] = useState(getTenantRoles(tenantId));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [modals, setModals] = useState({
    create: false,
    edit: false,
    view: false,
    delete: false,
  });

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateRole = (roleData: RoleFormData) => {
    const newRole = {
      id: `role_${Date.now()}`,
      tenantId,
      ...roleData,
      type: "custom" as const,
      userCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current_user",
    };

    setRoles((prev) => [...prev, newRole]);
    setModals((prev) => ({ ...prev, create: false }));
  };

  const handleEditRole = (roleData: RoleFormData) => {
    if (!selectedRole) return;

    const updatedRole = {
      ...selectedRole,
      ...roleData,
      updatedAt: new Date().toISOString(),
      updatedBy: "current_user",
    };

    setRoles((prev) =>
      prev.map((role) => (role.id === selectedRole.id ? updatedRole : role)),
    );
    setModals((prev) => ({ ...prev, edit: false }));
    setSelectedRole(null);
  };

  const handleDeleteRole = () => {
    if (!selectedRole) return;

    setRoles((prev) => prev.filter((role) => role.id !== selectedRole.id));
    setModals((prev) => ({ ...prev, delete: false }));
    setSelectedRole(null);
  };

  const handleDuplicateRole = (role: any) => {
    const newRole = {
      ...role,
      id: `role_${Date.now()}`,
      name: `${role.name} (Copy)`,
      type: "custom" as const,
      userCount: 0,
      deletable: true,
      editable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current_user",
    };

    setRoles((prev) => [...prev, newRole]);
  };

  const getCategoryColor = (category: string) => {
    const colorMap = {
      admin: "bg-purple-100 text-purple-800",
      manager: "bg-blue-100 text-blue-800",
      employee: "bg-green-100 text-green-800",
      external: "bg-gray-100 text-gray-800",
    };
    return (
      colorMap[category as keyof typeof colorMap] || "bg-gray-100 text-gray-800"
    );
  };

  const getTypeColor = (type: string) => {
    return type === "system"
      ? "bg-orange-100 text-orange-800"
      : "bg-blue-100 text-blue-800";
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
    if (modalName !== "create") {
      setSelectedRole(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Role Management</h2>
          <p className="text-muted-foreground">
            Manage user roles and their permissions
          </p>
        </div>
        <Button
          onClick={() => setModals((prev) => ({ ...prev, create: true }))}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Role
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Roles ({filteredRoles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: role.color }}
                      />
                      <div>
                        <div className="font-medium">{role.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {role.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(role.category)}>
                      {role.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(role.type)}>
                      {role.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{role.userCount}</span>
                      {role.maxUsers && (
                        <span className="text-muted-foreground">
                          / {role.maxUsers}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {role.permissions.length} permissions
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{role.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedRole(role);
                            setModals((prev) => ({ ...prev, view: true }));
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {role.editable && (
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedRole(role);
                              setModals((prev) => ({ ...prev, edit: true }));
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Role
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDuplicateRole(role)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        {role.deletable && (
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedRole(role);
                              setModals((prev) => ({ ...prev, delete: true }));
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Role
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {modals.create && (
        <RoleForm
          onSubmit={handleCreateRole}
          onClose={() => closeModal("create")}
          title="Create New Role"
          isEdit={false}
        />
      )}

      {modals.edit && selectedRole && (
        <RoleForm
          role={selectedRole}
          onSubmit={handleEditRole}
          onClose={() => closeModal("edit")}
          title="Edit Role"
          isEdit={true}
        />
      )}

      {modals.view && selectedRole && (
        <RoleViewDialog
          role={selectedRole}
          onClose={() => closeModal("view")}
          onEdit={() => {
            closeModal("view");
            setModals((prev) => ({ ...prev, edit: true }));
          }}
        />
      )}

      {modals.delete && selectedRole && (
        <Dialog open={true} onOpenChange={() => closeModal("delete")}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Role</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the role "{selectedRole.name}"?
                This action cannot be undone. Users with this role will lose
                their permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => closeModal("delete")}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteRole}>
                Delete Role
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Role Form Component
interface RoleFormProps {
  role?: any;
  onSubmit: (data: RoleFormData) => void;
  onClose: () => void;
  title: string;
  isEdit: boolean;
}

function RoleForm({ role, onSubmit, onClose, title, isEdit }: RoleFormProps) {
  const [formData, setFormData] = useState<RoleFormData>({
    name: role?.name || "",
    description: role?.description || "",
    category: role?.category || "employee",
    permissions: role?.permissions || [],
    priority: role?.priority || 5,
    color: role?.color || "#3B82F6",
    maxUsers: role?.maxUsers,
    isDefault: role?.isDefault || false,
    deletable: role?.deletable ?? true,
    editable: role?.editable ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const togglePermission = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update role settings and permissions"
              : "Create a new role with specific permissions"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter role name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter role description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                type="number"
                min="1"
                max="10"
                value={formData.priority}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    priority: parseInt(e.target.value) || 5,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxUsers">Max Users (optional)</Label>
              <Input
                id="maxUsers"
                type="number"
                min="1"
                value={formData.maxUsers || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    maxUsers: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  }))
                }
                placeholder="No limit"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex gap-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded border-2 ${
                      formData.color === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData((prev) => ({ ...prev, color }))}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Default Role</Label>
              <Switch
                checked={formData.isDefault}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isDefault: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Deletable</Label>
              <Switch
                checked={formData.deletable}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, deletable: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Editable</Label>
              <Switch
                checked={formData.editable}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, editable: checked }))
                }
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Permissions ({formData.permissions.length} selected)</Label>
            <div className="max-h-40 overflow-y-auto border rounded p-3">
              {availablePermissions.map((permission) => (
                <div
                  key={permission}
                  className="flex items-center space-x-2 py-1"
                >
                  <input
                    type="checkbox"
                    id={permission}
                    checked={formData.permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                    className="rounded"
                  />
                  <label
                    htmlFor={permission}
                    className="text-sm cursor-pointer"
                  >
                    {permission}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? "Update Role" : "Create Role"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Role View Dialog Component
interface RoleViewDialogProps {
  role: any;
  onClose: () => void;
  onEdit: () => void;
}

function RoleViewDialog({ role, onClose, onEdit }: RoleViewDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: role.color }}
            />
            {role.name}
          </DialogTitle>
          <DialogDescription>{role.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Category</Label>
              <p className="text-sm text-muted-foreground">{role.category}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Type</Label>
              <p className="text-sm text-muted-foreground">{role.type}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Priority</Label>
              <p className="text-sm text-muted-foreground">{role.priority}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">User Count</Label>
              <p className="text-sm text-muted-foreground">
                {role.userCount} {role.maxUsers ? `/ ${role.maxUsers}` : ""}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">
              Permissions ({role.permissions.length})
            </Label>
            <div className="mt-2 max-h-40 overflow-y-auto">
              <div className="grid grid-cols-1 gap-1">
                {role.permissions.map((permission: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs justify-start"
                  >
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-sm font-medium">Created</Label>
              <p className="text-sm text-muted-foreground">
                {new Date(role.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Last Updated</Label>
              <p className="text-sm text-muted-foreground">
                {new Date(role.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {role.editable && (
            <Button onClick={onEdit} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Role
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
