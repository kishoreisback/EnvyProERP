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
  Plus,
  Filter,
  Settings,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Users,
  Clock,
  Calendar,
  TrendingUp,
  BarChart3,
  DollarSign,
  FileText,
  Download,
  UserCheck,
  Award,
  AlertCircle,
} from "lucide-react";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  usePermissions,
  ProtectedComponent,
} from "../user-management/PermissionProvider";
import {
  getTenantEmployees,
  getTenantDepartments,
  getTenantHRMSAnalytics,
  filterTenantEmployees,
} from "./data";
import { hrmsAvailableTenants } from "./constants";
import { TenantEmployee, HRMSTab } from "./types";

interface TenantHRMSDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function TenantHRMSDashboard({
  currentTab = "overview",
  onTabChange,
}: TenantHRMSDashboardProps) {
  const { user: currentUser, hasPermission, isTenantAdmin } = usePermissions();

  // State management
  const [selectedTenantId, setSelectedTenantId] = useState(
    currentUser?.tenantId || "tenant_001",
  );
  const [activeTab, setActiveTab] = useState(currentTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterEmploymentType, setFilterEmploymentType] =
    useState<string>("all");

  // Modal states
  const [selectedEmployee, setSelectedEmployee] =
    useState<TenantEmployee | null>(null);
  const [modals, setModals] = useState({
    addEmployee: false,
    editEmployee: false,
    viewEmployee: false,
    processPayroll: false,
    leaveApproval: false,
    attendance: false,
    recruitment: false,
    performance: false,
    settings: false,
  });

  // Get tenant-specific data
  const employees = getTenantEmployees(selectedTenantId);
  const departments = getTenantDepartments(selectedTenantId);
  const analytics = getTenantHRMSAnalytics(selectedTenantId);
  const currentTenant = hrmsAvailableTenants.find(
    (t) => t.id === selectedTenantId,
  );

  // Sync activeTab with currentTab prop
  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  // Handle tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    return filterTenantEmployees(selectedTenantId, {
      department: filterDepartment === "all" ? undefined : filterDepartment,
      status: filterStatus === "all" ? undefined : filterStatus,
      employmentType:
        filterEmploymentType === "all" ? undefined : filterEmploymentType,
      search: searchQuery,
    });
  }, [
    selectedTenantId,
    filterDepartment,
    filterStatus,
    filterEmploymentType,
    searchQuery,
  ]);

  // Handle employee actions
  const handleEmployeeAction = (action: string, employee: TenantEmployee) => {
    setSelectedEmployee(employee);
    switch (action) {
      case "view":
        setModals((prev) => ({ ...prev, viewEmployee: true }));
        break;
      case "edit":
        setModals((prev) => ({ ...prev, editEmployee: true }));
        break;
      case "delete":
        if (window.confirm("Are you sure you want to delete this employee?")) {
          // TODO: Implement employee deletion
        }
        break;
    }
  };

  // Close modal helper
  const closeModal = (modalName: string) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HRMS Dashboard</h1>
          <p className="text-gray-600">
            Human Resource Management for {currentTenant?.name}
          </p>
        </div>
        <div className="flex gap-2">
          <ProtectedComponent permissions="employees.create">
            <Button
              onClick={() =>
                setModals((prev) => ({ ...prev, addEmployee: true }))
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </ProtectedComponent>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  Total Employees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedCounter
                    value={analytics?.employeeStats.total || 0}
                  />
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  {analytics?.employeeStats.newHires || 0} new hires
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  Attendance Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics?.attendanceStats.averageAttendance.toFixed(1) || 0}
                  %
                </div>
                <div className="text-sm text-gray-600">This month</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                  Monthly Payroll
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹
                  {(
                    (analytics?.payrollStats.totalPayroll || 0) / 100000
                  ).toFixed(1)}
                  L
                </div>
                <div className="text-sm text-gray-600">
                  Avg: ₹
                  {((analytics?.payrollStats.avgSalary || 0) / 1000).toFixed(0)}
                  K
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4 text-orange-600" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics?.performanceStats.avgRating.toFixed(1) || 0}/5
                </div>
                <div className="text-sm text-gray-600">
                  {analytics?.performanceStats.topPerformers || 0} top
                  performers
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Overview */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
                <CardDescription>
                  Employee distribution across departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.departmentStats.map((dept) => (
                    <div
                      key={dept.departmentId}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{dept.departmentName}</p>
                        <p className="text-sm text-gray-600">
                          {dept.employeeCount} employees
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {dept.attendanceRate.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-600">attendance</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  Latest HR activities and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <UserCheck className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium">New Employee Onboarded</p>
                      <p className="text-sm text-gray-600">
                        Ramesh Patel joined Engineering
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium">Leave Approved</p>
                      <p className="text-sm text-gray-600">
                        Priya Sharma's annual leave
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="font-medium">Pending Approvals</p>
                      <p className="text-sm text-gray-600">
                        5 leave requests waiting
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common HR tasks for {currentTenant?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <ProtectedComponent permissions="employees.create">
                  <Button
                    onClick={() =>
                      setModals((prev) => ({ ...prev, addEmployee: true }))
                    }
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Employee
                  </Button>
                </ProtectedComponent>
                <ProtectedComponent permissions="payroll.process">
                  <Button
                    onClick={() =>
                      setModals((prev) => ({ ...prev, processPayroll: true }))
                    }
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Process Payroll
                  </Button>
                </ProtectedComponent>
                <ProtectedComponent permissions="leave.approve">
                  <Button
                    onClick={() =>
                      setModals((prev) => ({ ...prev, leaveApproval: true }))
                    }
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Leave Approvals
                  </Button>
                </ProtectedComponent>
                <ProtectedComponent permissions="attendance.manage">
                  <Button
                    onClick={() =>
                      setModals((prev) => ({ ...prev, attendance: true }))
                    }
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Attendance
                  </Button>
                </ProtectedComponent>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
                  <SelectItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on_leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <ProtectedComponent permissions="employees.create">
                <Button
                  onClick={() =>
                    setModals((prev) => ({ ...prev, addEmployee: true }))
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
              </ProtectedComponent>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Employees Table */}
          <Card>
            <CardHeader>
              <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
              <CardDescription>
                Manage employees for {currentTenant?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.slice(0, 20).map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {employee.firstName} {employee.lastName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {employee.employeeId}
                          </p>
                          <p className="text-sm text-gray-600">
                            {employee.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.designation}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            employee.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {employee.employmentType.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(employee.joinDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3 text-yellow-500" />
                          {employee.rating.toFixed(1)}/5
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                handleEmployeeAction("view", employee)
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <ProtectedComponent permissions="employees.edit">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleEmployeeAction("edit", employee)
                                }
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            </ProtectedComponent>
                            <ProtectedComponent permissions="employees.delete">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleEmployeeAction("delete", employee)
                                }
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
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

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="text-center py-12">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Attendance Management</h3>
            <p className="text-gray-600 mb-4">
              Tenant-specific attendance tracking coming soon.
            </p>
            <Button variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              View Current Attendance Tools
            </Button>
          </div>
        </TabsContent>

        {/* Leave Tab */}
        <TabsContent value="leave" className="space-y-6">
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Leave Management</h3>
            <p className="text-gray-600 mb-4">
              Tenant-specific leave management system coming soon.
            </p>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              View Current Leave Tools
            </Button>
          </div>
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="space-y-6">
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Payroll Management</h3>
            <p className="text-gray-600 mb-4">
              Tenant-specific payroll processing system coming soon.
            </p>
            <Button variant="outline">
              <DollarSign className="mr-2 h-4 w-4" />
              View Current Payroll Tools
            </Button>
          </div>
        </TabsContent>

        {/* Recruitment Tab */}
        <TabsContent value="recruitment" className="space-y-6">
          <div className="text-center py-12">
            <UserCheck className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Recruitment Management</h3>
            <p className="text-gray-600 mb-4">
              Tenant-specific recruitment and hiring system coming soon.
            </p>
            <Button variant="outline">
              <UserCheck className="mr-2 h-4 w-4" />
              View Current Recruitment Tools
            </Button>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="text-center py-12">
            <Award className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Performance Management</h3>
            <p className="text-gray-600 mb-4">
              Tenant-specific performance tracking and appraisals coming soon.
            </p>
            <Button variant="outline">
              <Award className="mr-2 h-4 w-4" />
              View Current Performance Tools
            </Button>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">HR Analytics</h2>
              <p className="text-gray-600">
                Performance insights for {currentTenant?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <ProtectedComponent permissions="analytics.export">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </ProtectedComponent>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
            </div>
          </div>

          {analytics ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Employee Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Employees:</span>
                    <span className="font-medium">
                      {analytics.employeeStats.total}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Hires:</span>
                    <span className="font-medium">
                      {analytics.employeeStats.newHires}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Turnover Rate:</span>
                    <span className="font-medium">
                      {analytics.employeeStats.turnoverRate}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Attendance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Average Attendance:</span>
                    <span className="font-medium">
                      {analytics.attendanceStats.averageAttendance}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Late Comers:</span>
                    <span className="font-medium">
                      {analytics.attendanceStats.lateComers}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overtime Hours:</span>
                    <span className="font-medium">
                      {analytics.attendanceStats.overtimeHours}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Average Rating:</span>
                    <span className="font-medium">
                      {analytics.performanceStats.avgRating}/5
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Top Performers:</span>
                    <span className="font-medium">
                      {analytics.performanceStats.topPerformers}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Appraisals:</span>
                    <span className="font-medium">
                      {analytics.performanceStats.pendingAppraisals}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">
                No Analytics Available
              </h3>
              <p className="text-gray-600">
                Analytics data will appear here once available.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Employee Modal */}
      <Dialog
        open={modals.addEmployee}
        onOpenChange={(open) => !open && closeModal("addEmployee")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Add a new employee to {currentTenant?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="employee@company.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+91-9876543210" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.name}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input id="designation" placeholder="Enter designation" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("addEmployee")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement employee creation
                  closeModal("addEmployee");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Employee Modal */}
      <Dialog
        open={modals.viewEmployee}
        onOpenChange={(open) => !open && closeModal("viewEmployee")}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
            <DialogDescription>
              View employee information for {selectedEmployee?.firstName}{" "}
              {selectedEmployee?.lastName}
            </DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Employee ID:</span>
                      <span className="font-medium">
                        {selectedEmployee.employeeId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-medium">
                        {selectedEmployee.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-medium">
                        {selectedEmployee.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Join Date:</span>
                      <span className="font-medium">
                        {new Date(
                          selectedEmployee.joinDate,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Employment Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Department:</span>
                      <span className="font-medium">
                        {selectedEmployee.department}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Designation:</span>
                      <span className="font-medium">
                        {selectedEmployee.designation}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge
                        variant={
                          selectedEmployee.status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {selectedEmployee.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance:</span>
                      <span className="font-medium">
                        {selectedEmployee.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEmployee.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
