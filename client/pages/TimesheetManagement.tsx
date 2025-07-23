import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Building,
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  ArrowLeft,
  TrendingUp,
  Eye,
  Edit,
  Send,
  Download,
  X,
  Timer,
  Briefcase,
  Target,
  DollarSign,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const timesheetStats = [
  {
    label: "Pending Approval",
    value: 15,
    change: "Awaiting review",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    label: "Approved This Week",
    value: 89,
    change: "+12 from last week",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Total Hours Logged",
    value: 3420,
    change: "This month",
    icon: Timer,
    color: "text-primary",
  },
  {
    label: "Billable Hours",
    value: 2845,
    change: "83% billable rate",
    icon: DollarSign,
    color: "text-construction-500",
  },
];

const timesheets = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    empId: "EMP001",
    department: "Engineering",
    weekEnding: "2024-01-21",
    totalHours: 42.5,
    regularHours: 40.0,
    overtimeHours: 2.5,
    billableHours: 38.0,
    projects: 3,
    status: "approved",
    approver: "John Smith",
    submittedDate: "2024-01-22",
    approvedDate: "2024-01-23",
    notes: "Project deadline work completed",
  },
  {
    id: 2,
    employee: "David Park",
    empId: "EMP002",
    department: "Operations",
    weekEnding: "2024-01-21",
    totalHours: 45.0,
    regularHours: 40.0,
    overtimeHours: 5.0,
    billableHours: 40.0,
    projects: 2,
    status: "pending",
    approver: "Emily Johnson",
    submittedDate: "2024-01-22",
    approvedDate: null,
    notes: "Emergency maintenance included",
  },
  {
    id: 3,
    employee: "Maria Rodriguez",
    empId: "EMP003",
    department: "Sales",
    weekEnding: "2024-01-21",
    totalHours: 38.5,
    regularHours: 38.5,
    overtimeHours: 0.0,
    billableHours: 35.0,
    projects: 4,
    status: "rejected",
    approver: "Michael Brown",
    submittedDate: "2024-01-22",
    approvedDate: "2024-01-24",
    notes: "Hours discrepancy noted",
  },
  {
    id: 4,
    employee: "James Wilson",
    empId: "EMP004",
    department: "Quality",
    weekEnding: "2024-01-21",
    totalHours: 40.0,
    regularHours: 40.0,
    overtimeHours: 0.0,
    billableHours: 40.0,
    projects: 1,
    status: "draft",
    approver: "Lisa Chen",
    submittedDate: null,
    approvedDate: null,
    notes: "Work in progress",
  },
  {
    id: 5,
    employee: "Emma Thompson",
    empId: "EMP005",
    department: "HR",
    weekEnding: "2024-01-21",
    totalHours: 40.0,
    regularHours: 40.0,
    overtimeHours: 0.0,
    billableHours: 0.0,
    projects: 0,
    status: "approved",
    approver: "Robert Davis",
    submittedDate: "2024-01-22",
    approvedDate: "2024-01-23",
    notes: "Administrative work completed",
  },
];

const projectTimeBreakdown = [
  {
    project: "Construction Site A - Phase 1",
    projectCode: "CSA-P1",
    totalHours: 145.5,
    employees: 8,
    weeklyHours: 35.5,
    billableRate: 95,
    status: "active",
    client: "ABC Construction",
  },
  {
    project: "Office Building Renovation",
    projectCode: "OBR-2024",
    totalHours: 89.0,
    employees: 5,
    weeklyHours: 22.0,
    billableRate: 88,
    status: "active",
    client: "XYZ Corp",
  },
  {
    project: "Safety Compliance Audit",
    projectCode: "SCA-Q1",
    totalHours: 56.5,
    employees: 3,
    weeklyHours: 18.5,
    billableRate: 100,
    status: "active",
    client: "Internal",
  },
  {
    project: "Equipment Maintenance",
    projectCode: "EM-2024",
    totalHours: 78.0,
    employees: 6,
    weeklyHours: 26.0,
    billableRate: 75,
    status: "active",
    client: "Maintenance Contract",
  },
];

const timesheetTemplates = [
  {
    id: 1,
    name: "Standard Weekly",
    description: "40-hour work week with project tracking",
    fields: ["Regular Hours", "Overtime", "Project Allocation", "Notes"],
    departments: ["All"],
    frequency: "Weekly",
    autoApproval: false,
  },
  {
    id: 2,
    name: "Project-Based",
    description: "Detailed project time tracking with billing",
    fields: ["Project Hours", "Task Details", "Billable Hours", "Expenses"],
    departments: ["Engineering", "Consulting"],
    frequency: "Weekly",
    autoApproval: false,
  },
  {
    id: 3,
    name: "Shift Worker",
    description: "Shift-based time tracking with breaks",
    fields: ["Shift Hours", "Break Time", "Location", "Overtime"],
    departments: ["Operations", "Security"],
    frequency: "Daily",
    autoApproval: true,
  },
  {
    id: 4,
    name: "Remote Worker",
    description: "Remote work time tracking with productivity metrics",
    fields: ["Work Hours", "Tasks Completed", "Client Calls", "Training"],
    departments: ["Sales", "Support"],
    frequency: "Weekly",
    autoApproval: false,
  },
];

export default function TimesheetManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredTimesheets = timesheets.filter((timesheet) => {
    const matchesSearch =
      timesheet.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timesheet.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timesheet.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || timesheet.status === selectedStatus;
    const matchesDepartment =
      selectedDepartment === "all" ||
      timesheet.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      case "draft":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return CheckCircle;
      case "pending":
        return Clock;
      case "rejected":
        return X;
      case "draft":
        return FileText;
      default:
        return FileText;
    }
  };

  const getBillableRate = (billableHours: number, totalHours: number) => {
    if (totalHours === 0) return 0;
    return Math.round((billableHours / totalHours) * 100);
  };

  const getBillableColor = (rate: number) => {
    if (rate >= 90) return "text-emerald-600";
    if (rate >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="animate-slideInDown">
          <Button variant="ghost" size="sm" asChild className="hover-lift">
            <Link to="/hrms/attendance">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Time & Attendance
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Timesheet Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={FileText}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Digital timesheet submission, approval, and project time
                tracking
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={Download}
                animation="bounce"
                className="mr-2"
              />
              Export Timesheets
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Timesheet
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {timesheetStats.map((stat, index) => (
            <Card
              key={index}
              className="hover-lift animate-fadeInUp relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <AnimatedIcon
                    icon={stat.icon}
                    animation="float"
                    className={stat.color}
                  />
                </div>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={stat.value} />
                  {stat.label.includes("Hours") && (
                    <span className="text-sm font-normal ml-1">hrs</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Time Breakdown */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Briefcase}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Project Time Breakdown</CardTitle>
            </div>
            <CardDescription>
              Weekly time allocation across active projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {projectTimeBreakdown.map((project, index) => (
                <Card
                  key={project.projectCode}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-sm">
                            {project.project}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {project.projectCode}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {project.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            This Week:
                          </span>
                          <span className="font-medium">
                            <AnimatedCounter value={project.weeklyHours} />h
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Total:</span>
                          <span className="font-medium">
                            <AnimatedCounter value={project.totalHours} />h
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Team:</span>
                          <span className="font-medium">
                            <AnimatedCounter value={project.employees} />{" "}
                            members
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Billable:
                          </span>
                          <span
                            className={`font-medium ${getBillableColor(
                              project.billableRate,
                            )}`}
                          >
                            {project.billableRate}%
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Client: {project.client}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters & Search */}
        <Card className="animate-slideInUp">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by employee, ID, or notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger className="w-full md:w-40">
                  <Building className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Quality">Quality</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Timesheets Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Users}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Employee Timesheets</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredTimesheets.length} /> timesheets
              </Badge>
            </div>
            <CardDescription>
              Weekly timesheet submissions with approval status and project
              allocation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Week Ending</TableHead>
                  <TableHead>Hours Breakdown</TableHead>
                  <TableHead>Projects & Billing</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Approver</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTimesheets.map((timesheet, index) => (
                  <TableRow
                    key={timesheet.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {timesheet.employee}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {timesheet.empId}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {timesheet.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {timesheet.weekEnding}
                          </span>
                        </div>
                        {timesheet.submittedDate && (
                          <p className="text-xs text-muted-foreground">
                            Submitted: {timesheet.submittedDate}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-primary" />
                          <span className="font-medium text-sm">
                            {timesheet.totalHours}h total
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Regular: {timesheet.regularHours}h
                        </div>
                        {timesheet.overtimeHours > 0 && (
                          <div className="text-xs text-orange-600">
                            OT: {timesheet.overtimeHours}h
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3 text-construction-500" />
                          <span className="text-sm">
                            {timesheet.projects} projects
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-emerald-600" />
                          <span className="text-sm">
                            {timesheet.billableHours}h billable
                          </span>
                        </div>
                        <div
                          className={`text-xs ${getBillableColor(
                            getBillableRate(
                              timesheet.billableHours,
                              timesheet.totalHours,
                            ),
                          )}`}
                        >
                          {getBillableRate(
                            timesheet.billableHours,
                            timesheet.totalHours,
                          )}
                          % billable rate
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(timesheet.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {timesheet.status === "pending" && (
                          <PulsingDot className="scale-50" />
                        )}
                        <AnimatedIcon
                          icon={getStatusIcon(timesheet.status)}
                          className="h-3 w-3"
                        />
                        {timesheet.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <UserCheck className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{timesheet.approver}</span>
                      </div>
                      {timesheet.approvedDate && (
                        <p className="text-xs text-muted-foreground">
                          Approved: {timesheet.approvedDate}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover-lift"
                          >
                            <AnimatedIcon
                              icon={MoreHorizontal}
                              className="h-4 w-4"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <AnimatedIcon icon={Eye} className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {timesheet.status === "draft" && (
                            <DropdownMenuItem>
                              <AnimatedIcon
                                icon={Edit}
                                className="mr-2 h-4 w-4"
                              />
                              Edit Timesheet
                            </DropdownMenuItem>
                          )}
                          {timesheet.status === "draft" && (
                            <DropdownMenuItem>
                              <AnimatedIcon
                                icon={Send}
                                className="mr-2 h-4 w-4"
                              />
                              Submit for Approval
                            </DropdownMenuItem>
                          )}
                          {timesheet.status === "pending" && (
                            <>
                              <DropdownMenuItem>
                                <AnimatedIcon
                                  icon={CheckCircle}
                                  className="mr-2 h-4 w-4"
                                />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AnimatedIcon
                                  icon={X}
                                  className="mr-2 h-4 w-4"
                                />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Download}
                              className="mr-2 h-4 w-4"
                            />
                            Export PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Timesheet Templates */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Target}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Timesheet Templates</CardTitle>
            </div>
            <CardDescription>
              Pre-configured timesheet formats for different work types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {timesheetTemplates.map((template, index) => (
                <Card
                  key={template.id}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm">
                          {template.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {template.description}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Frequency:
                          </span>
                          <span className="font-medium">
                            {template.frequency}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Auto-Approve:
                          </span>
                          <span
                            className={`font-medium ${
                              template.autoApproval
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {template.autoApproval ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Fields:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.fields.slice(0, 2).map((field, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {field}
                            </Badge>
                          ))}
                          {template.fields.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.fields.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full hover-lift"
                        variant="outline"
                      >
                        <AnimatedIcon icon={Eye} size="sm" className="mr-2" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
