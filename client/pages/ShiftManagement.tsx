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
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  RotateCcw,
  Users,
  Clock,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  ArrowLeft,
  TrendingUp,
  Building,
  UserCheck,
  ArrowRight,
  Repeat,
  Download,
  Edit,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

const shiftStats = [
  {
    label: "Active Shifts",
    value: 24,
    change: "Across 3 shifts",
    icon: RotateCcw,
    color: "text-primary",
  },
  {
    label: "Coverage Rate",
    value: 98,
    change: "% optimal coverage",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Shift Changes",
    value: 8,
    change: "This week",
    icon: Calendar,
    color: "text-construction-500",
  },
  {
    label: "Understaffed Shifts",
    value: 2,
    change: "Require attention",
    icon: AlertTriangle,
    color: "text-yellow-500",
  },
];

const shiftTypes = [
  {
    id: 1,
    name: "Morning Shift",
    code: "MS",
    startTime: "06:00",
    endTime: "14:00",
    duration: "8 hours",
    breakTime: "45 minutes",
    employees: 85,
    capacity: 90,
    coverage: 94,
    status: "active",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
  },
  {
    id: 2,
    name: "Day Shift",
    code: "DS",
    startTime: "08:00",
    endTime: "17:00",
    duration: "9 hours",
    breakTime: "60 minutes",
    employees: 145,
    capacity: 150,
    coverage: 97,
    status: "active",
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
  },
  {
    id: 3,
    name: "Evening Shift",
    code: "ES",
    startTime: "14:00",
    endTime: "22:00",
    duration: "8 hours",
    breakTime: "45 minutes",
    employees: 67,
    capacity: 75,
    coverage: 89,
    status: "active",
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
  },
  {
    id: 4,
    name: "Night Shift",
    code: "NS",
    startTime: "22:00",
    endTime: "06:00",
    duration: "8 hours",
    breakTime: "45 minutes",
    employees: 32,
    capacity: 35,
    coverage: 91,
    status: "active",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
  },
];

const shiftAssignments = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    empId: "EMP001",
    department: "Engineering",
    currentShift: "Day Shift",
    shiftCode: "DS",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    rotationType: "Fixed",
    nextRotation: "N/A",
    assignedDate: "2024-01-01",
    performance: 98,
    attendanceRate: 95,
  },
  {
    id: 2,
    employee: "David Park",
    empId: "EMP002",
    department: "Operations",
    currentShift: "Morning Shift",
    shiftCode: "MS",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    rotationType: "Weekly Rotation",
    nextRotation: "2024-01-22",
    assignedDate: "2024-01-08",
    performance: 92,
    attendanceRate: 98,
  },
  {
    id: 3,
    employee: "Maria Rodriguez",
    empId: "EMP003",
    department: "Sales",
    currentShift: "Day Shift",
    shiftCode: "DS",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    rotationType: "Fixed",
    nextRotation: "N/A",
    assignedDate: "2024-01-05",
    performance: 96,
    attendanceRate: 94,
  },
  {
    id: 4,
    employee: "James Wilson",
    empId: "EMP004",
    department: "Quality",
    currentShift: "Evening Shift",
    shiftCode: "ES",
    workingDays: ["Tue", "Wed", "Thu", "Fri", "Sat"],
    rotationType: "Bi-weekly Rotation",
    nextRotation: "2024-01-29",
    assignedDate: "2024-01-10",
    performance: 89,
    attendanceRate: 91,
  },
  {
    id: 5,
    employee: "Emma Thompson",
    empId: "EMP005",
    department: "Security",
    currentShift: "Night Shift",
    shiftCode: "NS",
    workingDays: ["Sun", "Mon", "Tue", "Wed"],
    rotationType: "Monthly Rotation",
    nextRotation: "2024-02-01",
    assignedDate: "2024-01-01",
    performance: 94,
    attendanceRate: 96,
  },
];

export default function ShiftManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShift, setSelectedShift] = useState("all");
  const [selectedRotation, setSelectedRotation] = useState("all");

  const filteredAssignments = shiftAssignments.filter((assignment) => {
    const matchesSearch =
      assignment.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesShift =
      selectedShift === "all" || assignment.currentShift === selectedShift;
    const matchesRotation =
      selectedRotation === "all" ||
      assignment.rotationType === selectedRotation;
    return matchesSearch && matchesShift && matchesRotation;
  });

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 95) return "text-emerald-600";
    if (coverage >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return "text-emerald-600";
    if (performance >= 85) return "text-yellow-600";
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
                Shift Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={RotateCcw}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Schedule and manage employee work shifts and rotations
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
              Export Schedule
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Shift
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {shiftStats.map((stat, index) => (
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
                  {stat.label.includes("Rate") && (
                    <span className="text-sm font-normal">%</span>
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

        {/* Shift Types Overview */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Clock}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Shift Types & Coverage</CardTitle>
            </div>
            <CardDescription>
              Current shift configurations and staffing levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {shiftTypes.map((shift, index) => (
                <Card
                  key={shift.id}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${shift.bgColor}`}>
                            <AnimatedIcon
                              icon={RotateCcw}
                              animation="float"
                              className={shift.color}
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">
                              {shift.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Code: {shift.code}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {shift.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Time:</span>
                          <span className="font-medium">
                            {shift.startTime} - {shift.endTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <span className="font-medium">{shift.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Break:</span>
                          <span className="font-medium">{shift.breakTime}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Coverage:
                          </span>
                          <span
                            className={`font-medium ${getCoverageColor(
                              shift.coverage,
                            )}`}
                          >
                            {shift.coverage}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Staff:
                          </span>
                          <span className="font-medium">
                            {shift.employees}/{shift.capacity}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full hover-lift"
                        variant="outline"
                      >
                        <AnimatedIcon icon={Edit} size="sm" className="mr-2" />
                        Manage Shift
                      </Button>
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
                    placeholder="Search by employee name, ID, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={selectedShift} onValueChange={setSelectedShift}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shifts</SelectItem>
                  <SelectItem value="Morning Shift">Morning Shift</SelectItem>
                  <SelectItem value="Day Shift">Day Shift</SelectItem>
                  <SelectItem value="Evening Shift">Evening Shift</SelectItem>
                  <SelectItem value="Night Shift">Night Shift</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedRotation}
                onValueChange={setSelectedRotation}
              >
                <SelectTrigger className="w-full md:w-48">
                  <Repeat className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Rotation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rotations</SelectItem>
                  <SelectItem value="Fixed">Fixed</SelectItem>
                  <SelectItem value="Weekly Rotation">Weekly</SelectItem>
                  <SelectItem value="Bi-weekly Rotation">Bi-weekly</SelectItem>
                  <SelectItem value="Monthly Rotation">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Shift Assignments Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Users}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Employee Shift Assignments</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredAssignments.length} /> employees
              </Badge>
            </div>
            <CardDescription>
              Current shift assignments and rotation schedules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Current Shift</TableHead>
                  <TableHead>Working Days</TableHead>
                  <TableHead>Rotation</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment, index) => (
                  <TableRow
                    key={assignment.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {assignment.employee}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {assignment.empId}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {assignment.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-sm">
                          {assignment.currentShift}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          Code: {assignment.shiftCode}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {assignment.workingDays.map((day, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Repeat className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">
                            {assignment.rotationType}
                          </span>
                        </div>
                        {assignment.nextRotation !== "N/A" && (
                          <div className="flex items-center gap-1 text-xs">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <span>Next: {assignment.nextRotation}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 bg-muted rounded-full h-2">
                          <div
                            className="h-2 bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${assignment.performance}%` }}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${getPerformanceColor(
                            assignment.performance,
                          )}`}
                        >
                          {assignment.performance}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <UserCheck className="h-3 w-3 text-emerald-600" />
                        <span className="text-sm font-medium">
                          {assignment.attendanceRate}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={Eye} className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={Edit} className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={RotateCcw} className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
