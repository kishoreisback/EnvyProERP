import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Users,
  UserCheck,
  UserPlus,
  UserX,
  Award,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  FileText,
  GraduationCap,
  Star,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  getEmployeesByTenant, 
  getDepartmentsByTenant,
  formatCurrency,
  formatDate,
  getEmployeeFullName 
} from "../data";
import { Employee, EmployeeStatus } from "../types";

interface EmployeeManagementProps {
  tenantId: string;
}

export function EmployeeManagement({ tenantId }: EmployeeManagementProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<EmployeeStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Get employee data
  const employees = useMemo(() => getEmployeesByTenant(tenantId), [tenantId]);
  const departments = useMemo(() => getDepartmentsByTenant(tenantId), [tenantId]);

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesDepartment = selectedDepartment === "all" || employee.departmentId === selectedDepartment;
      const matchesStatus = selectedStatus === "all" || employee.status === selectedStatus;
      const matchesSearch = searchTerm === "" || 
        getEmployeeFullName(employee).toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.designation.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesDepartment && matchesStatus && matchesSearch;
    });
  }, [employees, selectedDepartment, selectedStatus, searchTerm]);

  // Calculate employee metrics
  const employeeMetrics = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(e => e.status === 'active').length;
    const onLeave = employees.filter(e => e.status === 'on_leave').length;
    const newHires = employees.filter(e => {
      const joinDate = new Date(e.joinDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinDate > thirtyDaysAgo;
    }).length;

    const departmentWiseCount = employees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const averageRating = employees
      .filter(e => e.performanceRating)
      .reduce((sum, e) => sum + (e.performanceRating || 0), 0) / 
      employees.filter(e => e.performanceRating).length;

    return { total, active, onLeave, newHires, departmentWiseCount, averageRating };
  }, [employees]);

  const getStatusBadge = (status: EmployeeStatus) => {
    const statusConfig = {
      active: { variant: "default" as const, label: "Active" },
      inactive: { variant: "secondary" as const, label: "Inactive" },
      on_leave: { variant: "secondary" as const, label: "On Leave" },
      terminated: { variant: "destructive" as const, label: "Terminated" },
      suspended: { variant: "destructive" as const, label: "Suspended" },
    };
    
    const config = statusConfig[status] || statusConfig.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getEmploymentTypeBadge = (type: string) => {
    const typeConfig = {
      full_time: { variant: "default" as const, label: "Full Time" },
      part_time: { variant: "secondary" as const, label: "Part Time" },
      contract: { variant: "outline" as const, label: "Contract" },
      intern: { variant: "secondary" as const, label: "Intern" },
      consultant: { variant: "outline" as const, label: "Consultant" },
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.full_time;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Employee Management Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Employee Management</h2>
          <p className="text-muted-foreground">
            Manage employee information, performance, and lifecycle
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowAddEmployeeModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Employee KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              <AnimatedCounter value={employeeMetrics.total} />
            </div>
            <p className="text-xs text-muted-foreground">
              {employeeMetrics.newHires} new hires this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              <AnimatedCounter value={employeeMetrics.active} />
            </div>
            <p className="text-xs text-muted-foreground">
              {((employeeMetrics.active / employeeMetrics.total) * 100).toFixed(1)}% active rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              <AnimatedCounter value={employeeMetrics.onLeave} />
            </div>
            <p className="text-xs text-muted-foreground">
              Currently on leave
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {employeeMetrics.averageRating.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 5.0 rating scale
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Employee Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="gap-2">
            <Users className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="employee-list" className="gap-2">
            <UserCheck className="h-4 w-4" />
            Employee List
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <Award className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Department Distribution
                </CardTitle>
                <CardDescription>Employee count by department</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(employeeMetrics.departmentWiseCount).map(([dept, count]) => (
                  <div key={dept} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{dept}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{count}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: `${(count / employeeMetrics.total) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Employee Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
                <CardDescription>Latest employee updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg border">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <UserPlus className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">New Employee Added</p>
                      <p className="text-sm text-muted-foreground">Rohit Kumar joined HR department</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg border">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Performance Review</p>
                      <p className="text-sm text-muted-foreground">Priya Sharma rated 4.5/5.0</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg border">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Leave Request</p>
                      <p className="text-sm text-muted-foreground">Arjun Singh requested annual leave</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employee-list" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Employee Directory</CardTitle>
                  <CardDescription>View and manage all employees</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search employees..." 
                      className="pl-8 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Employment Type</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium">
                            {employee.firstName[0]}{employee.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium">{getEmployeeFullName(employee)}</p>
                            <p className="text-sm text-muted-foreground">{employee.employeeId}</p>
                            <p className="text-sm text-muted-foreground">{employee.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.designation}</TableCell>
                      <TableCell>{getEmploymentTypeBadge(employee.employmentType)}</TableCell>
                      <TableCell>{formatDate(employee.joinDate)}</TableCell>
                      <TableCell>{getStatusBadge(employee.status)}</TableCell>
                      <TableCell>
                        {employee.performanceRating ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{employee.performanceRating.toFixed(1)}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not rated</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Management</CardTitle>
              <CardDescription>Track and manage employee performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Performance management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Analytics</CardTitle>
              <CardDescription>Advanced employee insights and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Employee analytics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Employee Modal */}
      <Dialog open={showAddEmployeeModal} onOpenChange={setShowAddEmployeeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Add a new employee to the organization
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">
            <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Employee form coming soon</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
