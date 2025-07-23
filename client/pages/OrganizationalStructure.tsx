import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Building,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  TrendingDown,
  MapPin,
  Briefcase,
  Target,
  Award,
  Calendar,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Network,
  TreePine,
  Layers,
  GitBranch,
  Building2,
  UserCheck,
  Crown,
  Shield,
  Zap,
  Maximize2,
  Minimize2,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  Phone,
  Save,
  X,
} from "lucide-react";
import { BackToHRMS } from "@/components/hrms";
import OrgChart from "@/components/organization/OrgChart";
import LocationManagement from "@/components/organization/LocationManagement";
import {
  OrgUnit,
  OrgLocation,
  Employee,
  OrgChartNode,
  OrgChartConfig,
  OrgStructureAnalytics,
  OrgChangeRequest,
} from "@/components/organization/types";
import {
  orgUnits as initialOrgUnits,
  orgLocations,
  employees,
  orgAnalytics,
  orgChangeRequests as initialOrgChangeRequests,
  buildOrgHierarchy,
} from "@/components/organization/data";

export default function OrganizationalStructure() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLocation, setSelectedLocation] = useState<OrgLocation | null>(
    null,
  );
  const [orgChartConfig, setOrgChartConfig] = useState<OrgChartConfig>({
    layout: "hierarchical",
    orientation: "vertical",
    nodeSize: "medium",
    showPhotos: true,
    showDetails: true,
    expandLevel: 3,
    colorScheme: "department",
  });

  // State for data management
  const [orgUnits, setOrgUnits] = useState<OrgUnit[]>(initialOrgUnits);
  const [orgChangeRequests, setOrgChangeRequests] = useState<
    OrgChangeRequest[]
  >(initialOrgChangeRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrgUnit, setSelectedOrgUnit] = useState<OrgUnit | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Dialog states
  const [isAddUnitDialogOpen, setIsAddUnitDialogOpen] = useState(false);
  const [isEditUnitDialogOpen, setIsEditUnitDialogOpen] = useState(false);
  const [isUnitDetailDialogOpen, setIsUnitDetailDialogOpen] = useState(false);
  const [isAddChangeDialogOpen, setIsAddChangeDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<OrgUnit | null>(null);

  // Form data for new/edit unit
  const [unitFormData, setUnitFormData] = useState({
    name: "",
    type: "department" as OrgUnit["type"],
    code: "",
    description: "",
    parentId: "",
    locationId: "",
    managerId: "",
    budgetCode: "",
    costCenter: "",
    capacity: 0,
  });

  // Form data for change request
  const [changeFormData, setChangeFormData] = useState({
    type: "restructure" as OrgChangeRequest["type"],
    description: "",
    effectiveDate: "",
    employeeId: "",
    fromOrgUnit: "",
    toOrgUnit: "",
    newManagerId: "",
  });

  // Transform org units to chart nodes
  const transformToChartNodes = (units: OrgUnit[]): OrgChartNode[] => {
    const employeeMap = new Map(employees.map((emp) => [emp.id, emp]));
    const unitMap = new Map(units.map((unit) => [unit.id, unit]));

    const buildNode = (unit: OrgUnit): OrgChartNode => {
      const manager = unit.managerId ? employeeMap.get(unit.managerId) : null;
      const children = units.filter((u) => u.parentId === unit.id);

      return {
        id: unit.id,
        name: manager ? `${manager.firstName} ${manager.lastName}` : unit.name,
        position: manager ? manager.position : `${unit.type} Manager`,
        avatar:
          manager?.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${unit.name}`,
        email: manager?.email || `${unit.code.toLowerCase()}@buildsaathi.com`,
        department: unit.name,
        level: unit.level,
        isManager: true,
        directReports: children.map((child) => buildNode(child)),
        managerId: unit.managerId,
        employeeCount: unit.employeeCount,
        orgUnit: unit.name,
        location:
          orgLocations.find((loc) => loc.id === unit.locationId)?.name ||
          "Unknown",
      };
    };

    return units.filter((unit) => unit.parentId === null).map(buildNode);
  };

  const chartData = transformToChartNodes(orgUnits);
  const filteredOrgUnits = orgUnits.filter(
    (unit) =>
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleNodeClick = (node: OrgChartNode) => {
    const orgUnit = orgUnits.find((unit) => unit.id === node.id);
    setSelectedOrgUnit(orgUnit || null);
    setIsUnitDetailDialogOpen(true);
  };

  // Handle Add Unit
  const handleAddUnit = () => {
    const parentId =
      unitFormData.parentId === "none" ? null : unitFormData.parentId || null;
    const managerId =
      unitFormData.managerId === "none" ? null : unitFormData.managerId || null;

    const newUnit: OrgUnit = {
      id: `org_${Date.now()}`,
      name: unitFormData.name,
      type: unitFormData.type,
      code: unitFormData.code,
      description: unitFormData.description,
      parentId,
      locationId: unitFormData.locationId,
      managerId,
      budgetCode: unitFormData.budgetCode,
      costCenter: unitFormData.costCenter,
      isActive: true,
      establishedDate: new Date().toISOString().split("T")[0],
      employeeCount: 0,
      level: parentId
        ? (orgUnits.find((u) => u.id === parentId)?.level || 0) + 1
        : 0,
      path: parentId
        ? [
            ...(orgUnits.find((u) => u.id === parentId)?.path || []),
            `org_${Date.now()}`,
          ]
        : [`org_${Date.now()}`],
    };

    setOrgUnits((prev) => [...prev, newUnit]);
    setIsAddUnitDialogOpen(false);
    resetUnitForm();
  };

  // Handle Edit Unit
  const handleEditUnit = () => {
    if (!editingUnit) return;

    const parentId =
      unitFormData.parentId === "none" ? null : unitFormData.parentId || null;
    const managerId =
      unitFormData.managerId === "none" ? null : unitFormData.managerId || null;

    const updatedUnit: OrgUnit = {
      ...editingUnit,
      name: unitFormData.name,
      type: unitFormData.type,
      code: unitFormData.code,
      description: unitFormData.description,
      parentId,
      locationId: unitFormData.locationId,
      managerId,
      budgetCode: unitFormData.budgetCode,
      costCenter: unitFormData.costCenter,
    };

    setOrgUnits((prev) =>
      prev.map((unit) => (unit.id === editingUnit.id ? updatedUnit : unit)),
    );
    setIsEditUnitDialogOpen(false);
    setEditingUnit(null);
    resetUnitForm();
  };

  // Handle Delete Unit
  const handleDeleteUnit = (unitId: string) => {
    setOrgUnits((prev) => prev.filter((unit) => unit.id !== unitId));
  };

  // Handle Add Change Request
  const handleAddChangeRequest = () => {
    const newChange: OrgChangeRequest = {
      id: `req_${Date.now()}`,
      type: changeFormData.type,
      description: changeFormData.description,
      requestedBy: "current_user", // In real app, get from auth context
      requestDate: new Date().toISOString().split("T")[0],
      effectiveDate: changeFormData.effectiveDate,
      status: "pending",
      changes: {
        employeeId: changeFormData.employeeId || undefined,
        fromOrgUnit: changeFormData.fromOrgUnit || undefined,
        toOrgUnit: changeFormData.toOrgUnit || undefined,
        newManagerId: changeFormData.newManagerId || undefined,
      },
      approvals: [],
      impact: {
        affectedEmployees: 1,
        budgetImpact: 50000,
        implementationEffort: "medium",
      },
    };

    setOrgChangeRequests((prev) => [...prev, newChange]);
    setIsAddChangeDialogOpen(false);
    resetChangeForm();
  };

  // Helper functions
  const resetUnitForm = () => {
    setUnitFormData({
      name: "",
      type: "department",
      code: "",
      description: "",
      parentId: "none",
      locationId: "",
      managerId: "none",
      budgetCode: "",
      costCenter: "",
      capacity: 0,
    });
  };

  const resetChangeForm = () => {
    setChangeFormData({
      type: "restructure",
      description: "",
      effectiveDate: "",
      employeeId: "",
      fromOrgUnit: "",
      toOrgUnit: "",
      newManagerId: "",
    });
  };

  const openEditDialog = (unit: OrgUnit) => {
    setEditingUnit(unit);
    setUnitFormData({
      name: unit.name,
      type: unit.type,
      code: unit.code,
      description: unit.description,
      parentId: unit.parentId || "none",
      locationId: unit.locationId,
      managerId: unit.managerId || "none",
      budgetCode: unit.budgetCode,
      costCenter: unit.costCenter,
      capacity: 0,
    });
    setIsEditUnitDialogOpen(true);
  };

  const handleExport = () => {
    // Simulate export functionality
    const exportData = {
      orgUnits,
      orgAnalytics,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `org-structure-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsExportDialogOpen(false);
  };

  // Unit Form Component
  const UnitForm = ({
    isEdit = false,
    onSubmit,
    onCancel,
  }: {
    isEdit?: boolean;
    onSubmit: () => void;
    onCancel: () => void;
  }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Unit Name</Label>
          <Input
            id="name"
            value={unitFormData.name}
            onChange={(e) =>
              setUnitFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter unit name"
          />
        </div>
        <div>
          <Label htmlFor="code">Unit Code</Label>
          <Input
            id="code"
            value={unitFormData.code}
            onChange={(e) =>
              setUnitFormData((prev) => ({ ...prev, code: e.target.value }))
            }
            placeholder="Enter unit code"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            value={unitFormData.type}
            onValueChange={(value: OrgUnit["type"]) =>
              setUnitFormData((prev) => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="division">Division</SelectItem>
              <SelectItem value="department">Department</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="unit">Unit</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="parentId">Parent Unit</Label>
          <Select
            value={unitFormData.parentId}
            onValueChange={(value) =>
              setUnitFormData((prev) => ({ ...prev, parentId: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select parent unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (Root Level)</SelectItem>
              {orgUnits.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name} ({unit.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={unitFormData.description}
          onChange={(e) =>
            setUnitFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Enter unit description"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="locationId">Location</Label>
          <Select
            value={unitFormData.locationId}
            onValueChange={(value) =>
              setUnitFormData((prev) => ({ ...prev, locationId: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {orgLocations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="managerId">Manager</Label>
          <Select
            value={unitFormData.managerId}
            onValueChange={(value) =>
              setUnitFormData((prev) => ({ ...prev, managerId: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select manager" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Manager</SelectItem>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName} - {employee.position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="budgetCode">Budget Code</Label>
          <Input
            id="budgetCode"
            value={unitFormData.budgetCode}
            onChange={(e) =>
              setUnitFormData((prev) => ({
                ...prev,
                budgetCode: e.target.value,
              }))
            }
            placeholder="Enter budget code"
          />
        </div>
        <div>
          <Label htmlFor="costCenter">Cost Center</Label>
          <Input
            id="costCenter"
            value={unitFormData.costCenter}
            onChange={(e) =>
              setUnitFormData((prev) => ({
                ...prev,
                costCenter: e.target.value,
              }))
            }
            placeholder="Enter cost center"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>{isEdit ? "Update" : "Create"} Unit</Button>
      </div>
    </div>
  );

  // Change Request Form Component
  const ChangeRequestForm = ({
    onSubmit,
    onCancel,
  }: {
    onSubmit: () => void;
    onCancel: () => void;
  }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="changeType">Change Type</Label>
          <Select
            value={changeFormData.type}
            onValueChange={(value: OrgChangeRequest["type"]) =>
              setChangeFormData((prev) => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select change type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="restructure">Restructure</SelectItem>
              <SelectItem value="transfer">Transfer</SelectItem>
              <SelectItem value="promotion">Promotion</SelectItem>
              <SelectItem value="new_position">New Position</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="effectiveDate">Effective Date</Label>
          <Input
            id="effectiveDate"
            type="date"
            value={changeFormData.effectiveDate}
            onChange={(e) =>
              setChangeFormData((prev) => ({
                ...prev,
                effectiveDate: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div>
        <Label htmlFor="changeDescription">Description</Label>
        <Textarea
          id="changeDescription"
          value={changeFormData.description}
          onChange={(e) =>
            setChangeFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Describe the organizational change"
          rows={3}
        />
      </div>

      {changeFormData.type === "transfer" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fromOrgUnit">From Unit</Label>
            <Select
              value={changeFormData.fromOrgUnit}
              onValueChange={(value) =>
                setChangeFormData((prev) => ({ ...prev, fromOrgUnit: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select source unit" />
              </SelectTrigger>
              <SelectContent>
                {orgUnits.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="toOrgUnit">To Unit</Label>
            <Select
              value={changeFormData.toOrgUnit}
              onValueChange={(value) =>
                setChangeFormData((prev) => ({ ...prev, toOrgUnit: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select target unit" />
              </SelectTrigger>
              <SelectContent>
                {orgUnits.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>Submit Request</Button>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <BackToHRMS />

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Organization Structure & Hierarchy
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Building}
                animation="glow"
                className="text-primary"
              />
              <span className="text-muted-foreground">
                Manage organizational structure, departments, and locations
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog
              open={isExportDialogOpen}
              onOpenChange={setIsExportDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Export Organization Data</DialogTitle>
                  <DialogDescription>
                    Export organizational structure data for backup or analysis
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <p>This will export:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Organizational units and hierarchy</li>
                    <li>Location information</li>
                    <li>Analytics and metrics</li>
                    <li>Change request history</li>
                  </ul>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsExportDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleExport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export JSON
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isAddUnitDialogOpen}
              onOpenChange={setIsAddUnitDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Unit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Organizational Unit</DialogTitle>
                  <DialogDescription>
                    Create a new department, team, or organizational unit
                  </DialogDescription>
                </DialogHeader>
                <UnitForm
                  onSubmit={handleAddUnit}
                  onCancel={() => setIsAddUnitDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fadeInUp">
          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Employees
                  </p>
                  <AnimatedCounter
                    value={orgAnalytics.totalEmployees}
                    className="text-2xl font-bold"
                  />
                  <p className="text-xs text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />+
                    {orgAnalytics.growthMetrics.headcountGrowth}% this quarter
                  </p>
                </div>
                <AnimatedIcon icon={Users} className="text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Departments
                  </p>
                  <AnimatedCounter
                    value={orgAnalytics.totalDepartments}
                    className="text-2xl font-bold"
                  />
                  <p className="text-xs text-purple-600">
                    Across {orgAnalytics.totalLocations} locations
                  </p>
                </div>
                <AnimatedIcon icon={Building} className="text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg Team Size
                  </p>
                  <div className="text-2xl font-bold">
                    {orgAnalytics.avgTeamSize}
                  </div>
                  <p className="text-xs text-emerald-600">
                    Span: {orgAnalytics.spanOfControl.avg} avg
                  </p>
                </div>
                <AnimatedIcon icon={Target} className="text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Org Health
                  </p>
                  <div className="text-2xl font-bold">
                    {orgAnalytics.organizationHealth.score}%
                  </div>
                  <Progress
                    value={orgAnalytics.organizationHealth.score}
                    className="h-2 mt-1"
                  />
                </div>
                <AnimatedIcon icon={Activity} className="text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="animate-fadeInUp"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chart">Org Chart</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="changes">Changes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Organization Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Organization Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Hierarchy Balance</span>
                      <span className="text-sm font-medium">
                        {
                          orgAnalytics.organizationHealth.factors
                            .hierarchyBalance
                        }
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        orgAnalytics.organizationHealth.factors.hierarchyBalance
                      }
                    />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Span of Control</span>
                      <span className="text-sm font-medium">
                        {orgAnalytics.organizationHealth.factors.spanControl}%
                      </span>
                    </div>
                    <Progress
                      value={
                        orgAnalytics.organizationHealth.factors.spanControl
                      }
                    />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Position Fill Rate</span>
                      <span className="text-sm font-medium">
                        {
                          orgAnalytics.organizationHealth.factors
                            .vacantPositions
                        }
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        orgAnalytics.organizationHealth.factors.vacantPositions
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Growth Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Growth Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">
                        {orgAnalytics.growthMetrics.newHires}
                      </div>
                      <div className="text-xs text-emerald-600">New Hires</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {orgAnalytics.growthMetrics.departures}
                      </div>
                      <div className="text-xs text-red-600">Departures</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        +{orgAnalytics.growthMetrics.headcountGrowth}%
                      </div>
                      <div className="text-xs text-blue-600">Net Growth</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Changes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Recent Organizational Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orgChangeRequests.slice(0, 3).map((change) => (
                    <div
                      key={change.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            change.status === "approved"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {change.status}
                        </Badge>
                        <div>
                          <div className="font-medium">
                            {change.description}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Requested by {change.requestedBy} •{" "}
                            {change.requestDate}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chart" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Organization Chart</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive visualization of organizational hierarchy
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Card className={isFullscreen ? "fixed inset-4 z-50" : "h-[600px]"}>
              <CardContent className="p-0 h-full">
                <OrgChart
                  data={chartData}
                  config={orgChartConfig}
                  onNodeClick={handleNodeClick}
                  onConfigChange={setOrgChartConfig}
                  className="h-full"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Department Management</h3>
                <p className="text-sm text-muted-foreground">
                  Manage organizational units and departments
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Dialog
                  open={isAddUnitDialogOpen}
                  onOpenChange={setIsAddUnitDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Department
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Department</DialogTitle>
                      <DialogDescription>
                        Create a new department or organizational unit
                      </DialogDescription>
                    </DialogHeader>
                    <UnitForm
                      onSubmit={handleAddUnit}
                      onCancel={() => setIsAddUnitDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrgUnits.map((unit) => {
                    const manager = employees.find(
                      (emp) => emp.id === unit.managerId,
                    );
                    const location = orgLocations.find(
                      (loc) => loc.id === unit.locationId,
                    );

                    return (
                      <TableRow key={unit.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{unit.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {unit.code}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {unit.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{location?.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {unit.employeeCount}
                          </div>
                        </TableCell>
                        <TableCell>
                          {manager
                            ? `${manager.firstName} ${manager.lastName}`
                            : "Vacant"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={unit.isActive ? "default" : "secondary"}
                          >
                            {unit.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedOrgUnit(unit);
                                setIsUnitDetailDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(unit)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Unit
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{unit.name}
                                    "? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteUnit(unit.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="locations">
            <LocationManagement
              onLocationSelect={setSelectedLocation}
              selectedLocationId={selectedLocation?.id}
            />
          </TabsContent>

          <TabsContent value="changes" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Organizational Changes
                </h3>
                <p className="text-sm text-muted-foreground">
                  Track and manage organizational change requests
                </p>
              </div>
              <Dialog
                open={isAddChangeDialogOpen}
                onOpenChange={setIsAddChangeDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Change Request
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>New Change Request</DialogTitle>
                    <DialogDescription>
                      Submit a request for organizational changes
                    </DialogDescription>
                  </DialogHeader>
                  <ChangeRequestForm
                    onSubmit={handleAddChangeRequest}
                    onCancel={() => setIsAddChangeDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Effective Date</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orgChangeRequests.map((change) => (
                    <TableRow key={change.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {change.description}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {change.impact.affectedEmployees} employees affected
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {change.type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{change.requestedBy}</TableCell>
                      <TableCell>{change.effectiveDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            change.impact.implementationEffort === "high"
                              ? "destructive"
                              : change.impact.implementationEffort === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {change.impact.implementationEffort}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            change.status === "approved"
                              ? "default"
                              : change.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {change.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Unit Detail Modal */}
        <Dialog
          open={isUnitDetailDialogOpen}
          onOpenChange={setIsUnitDetailDialogOpen}
        >
          <DialogContent className="max-w-2xl">
            {selectedOrgUnit && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {selectedOrgUnit.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedOrgUnit.type} • {selectedOrgUnit.code} •{" "}
                    {selectedOrgUnit.employeeCount} employees
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Department Type</Label>
                      <div className="text-sm font-medium capitalize">
                        {selectedOrgUnit.type}
                      </div>
                    </div>
                    <div>
                      <Label>Code</Label>
                      <div className="text-sm font-medium">
                        {selectedOrgUnit.code}
                      </div>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <div className="text-sm font-medium">
                        {
                          orgLocations.find(
                            (loc) => loc.id === selectedOrgUnit.locationId,
                          )?.name
                        }
                      </div>
                    </div>
                    <div>
                      <Label>Established</Label>
                      <div className="text-sm font-medium">
                        {selectedOrgUnit.establishedDate}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrgUnit.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedOrgUnit.employeeCount}
                      </div>
                      <div className="text-xs text-blue-600">Employees</div>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">
                        {selectedOrgUnit.level}
                      </div>
                      <div className="text-xs text-emerald-600">Level</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {
                          orgUnits.filter(
                            (u) => u.parentId === selectedOrgUnit.id,
                          ).length
                        }
                      </div>
                      <div className="text-xs text-purple-600">Sub-units</div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsUnitDetailDialogOpen(false)}
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => {
                        setIsUnitDetailDialogOpen(false);
                        openEditDialog(selectedOrgUnit);
                      }}
                    >
                      Edit Unit
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Unit Modal */}
        <Dialog
          open={isEditUnitDialogOpen}
          onOpenChange={setIsEditUnitDialogOpen}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Organizational Unit</DialogTitle>
              <DialogDescription>
                Update the organizational unit details
              </DialogDescription>
            </DialogHeader>
            <UnitForm
              isEdit={true}
              onSubmit={handleEditUnit}
              onCancel={() => {
                setIsEditUnitDialogOpen(false);
                setEditingUnit(null);
                resetUnitForm();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
