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
  Calendar,
  Clock,
  Users,
  Building,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  ArrowLeft,
  TrendingUp,
  Settings,
  Download,
  Edit,
  Eye,
  Copy,
  CalendarDays,
  Timer,
  Coffee,
  Home,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const scheduleStats = [
  {
    label: "Active Schedules",
    value: 12,
    change: "Different templates",
    icon: Calendar,
    color: "text-primary",
  },
  {
    label: "Flexible Workers",
    value: 89,
    change: "Custom schedules",
    icon: Users,
    color: "text-emerald-600",
  },
  {
    label: "Holiday Calendar",
    value: 15,
    change: "Days this month",
    icon: CalendarDays,
    color: "text-construction-500",
  },
  {
    label: "Schedule Compliance",
    value: 96,
    change: "% adherence rate",
    icon: CheckCircle,
    color: "text-yellow-500",
  },
];

const scheduleTemplates = [
  {
    id: 1,
    name: "Standard 9-to-5",
    code: "STD95",
    type: "Fixed",
    workingHours: "9 hours",
    startTime: "09:00",
    endTime: "18:00",
    breakTime: "60 minutes",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    employees: 145,
    departments: ["Administration", "Sales", "HR"],
    status: "active",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
  },
  {
    id: 2,
    name: "Early Bird",
    code: "EB",
    type: "Fixed",
    workingHours: "8 hours",
    startTime: "07:00",
    endTime: "16:00",
    breakTime: "45 minutes",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    employees: 67,
    departments: ["Operations", "Maintenance"],
    status: "active",
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
  },
  {
    id: 3,
    name: "Flexible Hours",
    code: "FLEX",
    type: "Flexible",
    workingHours: "8 hours",
    startTime: "08:00-10:00",
    endTime: "17:00-19:00",
    breakTime: "60 minutes",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    employees: 89,
    departments: ["Engineering", "Design", "Marketing"],
    status: "active",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
  },
  {
    id: 4,
    name: "4-Day Week",
    code: "4DW",
    type: "Compressed",
    workingHours: "10 hours",
    startTime: "08:00",
    endTime: "19:00",
    breakTime: "90 minutes",
    workingDays: ["Mon", "Tue", "Wed", "Thu"],
    employees: 23,
    departments: ["Creative", "Research"],
    status: "pilot",
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
  },
];

const employeeSchedules = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    empId: "EMP001",
    department: "Engineering",
    schedule: "Flexible Hours",
    scheduleCode: "FLEX",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    startTime: "08:30",
    endTime: "17:30",
    breakDuration: "60m",
    totalHours: "40h/week",
    location: "Office",
    effectiveDate: "2024-01-01",
    status: "active",
    compliance: 98,
  },
  {
    id: 2,
    employee: "David Park",
    empId: "EMP002",
    department: "Operations",
    schedule: "Early Bird",
    scheduleCode: "EB",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    startTime: "07:00",
    endTime: "16:00",
    breakDuration: "45m",
    totalHours: "48h/week",
    location: "Field",
    effectiveDate: "2024-01-08",
    status: "active",
    compliance: 95,
  },
  {
    id: 3,
    employee: "Maria Rodriguez",
    empId: "EMP003",
    department: "Sales",
    schedule: "Standard 9-to-5",
    scheduleCode: "STD95",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    startTime: "09:00",
    endTime: "18:00",
    breakDuration: "60m",
    totalHours: "40h/week",
    location: "Hybrid",
    effectiveDate: "2024-01-05",
    status: "active",
    compliance: 92,
  },
  {
    id: 4,
    employee: "James Wilson",
    empId: "EMP004",
    department: "Quality",
    schedule: "4-Day Week",
    scheduleCode: "4DW",
    workingDays: ["Mon", "Tue", "Wed", "Thu"],
    startTime: "08:00",
    endTime: "19:00",
    breakDuration: "90m",
    totalHours: "40h/week",
    location: "Office",
    effectiveDate: "2024-01-10",
    status: "pilot",
    compliance: 89,
  },
  {
    id: 5,
    employee: "Emma Thompson",
    empId: "EMP005",
    department: "HR",
    schedule: "Standard 9-to-5",
    scheduleCode: "STD95",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    startTime: "09:00",
    endTime: "18:00",
    breakDuration: "60m",
    totalHours: "40h/week",
    location: "Office",
    effectiveDate: "2024-01-01",
    status: "active",
    compliance: 97,
  },
];

const holidayCalendar = [
  {
    id: 1,
    name: "New Year's Day",
    date: "2024-01-01",
    type: "Public Holiday",
    status: "observed",
    affectedEmployees: 378,
  },
  {
    id: 2,
    name: "Martin Luther King Jr. Day",
    date: "2024-01-15",
    type: "Public Holiday",
    status: "observed",
    affectedEmployees: 378,
  },
  {
    id: 3,
    name: "Presidents Day",
    date: "2024-02-19",
    type: "Public Holiday",
    status: "upcoming",
    affectedEmployees: 378,
  },
  {
    id: 4,
    name: "Company Founding Day",
    date: "2024-03-15",
    type: "Company Holiday",
    status: "upcoming",
    affectedEmployees: 378,
  },
];

export default function WorkSchedules() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const filteredSchedules = employeeSchedules.filter((schedule) => {
    const matchesSearch =
      schedule.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSchedule =
      selectedSchedule === "all" || schedule.schedule === selectedSchedule;
    const matchesLocation =
      selectedLocation === "all" || schedule.location === selectedLocation;
    return matchesSearch && matchesSchedule && matchesLocation;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "pilot":
        return "secondary";
      case "inactive":
        return "outline";
      default:
        return "outline";
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return "text-emerald-600";
    if (compliance >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const getLocationIcon = (location: string) => {
    switch (location) {
      case "Office":
        return Building;
      case "Remote":
        return Home;
      case "Hybrid":
        return Globe;
      case "Field":
        return Globe;
      default:
        return Building;
    }
  };

  const getHolidayStatusColor = (status: string) => {
    switch (status) {
      case "observed":
        return "text-emerald-600";
      case "upcoming":
        return "text-blue-600";
      case "past":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
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
                Work Schedules
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Calendar}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Flexible work schedule configuration and holiday management
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
              Export Schedules
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Schedule
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {scheduleStats.map((stat, index) => (
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
                  {stat.label.includes("Compliance") && (
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

        {/* Schedule Templates */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Settings}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Schedule Templates</CardTitle>
            </div>
            <CardDescription>
              Pre-configured work schedule templates for different work patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {scheduleTemplates.map((template, index) => (
                <Card
                  key={template.id}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${template.bgColor}`}>
                            <AnimatedIcon
                              icon={Calendar}
                              animation="float"
                              className={template.color}
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">
                              {template.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {template.code}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={getStatusVariant(template.status)}
                          className="text-xs"
                        >
                          {template.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="font-medium">{template.type}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Hours:</span>
                          <span className="font-medium">
                            {template.workingHours}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Time:</span>
                          <span className="font-medium">
                            {template.startTime} - {template.endTime}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Working Days:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.workingDays.map((day, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Employees:
                        </span>
                        <span className="font-medium">
                          <AnimatedCounter value={template.employees} />
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift flex-1"
                        >
                          <AnimatedIcon icon={Eye} size="sm" className="mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift flex-1"
                        >
                          <AnimatedIcon
                            icon={Copy}
                            size="sm"
                            className="mr-1"
                          />
                          Clone
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Holiday Calendar */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover-lift animate-slideInLeft md:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Users}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Employee Schedule Assignments</CardTitle>
              </div>
              <CardDescription>
                Current work schedule assignments for all employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters & Search */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by employee, ID, or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select
                  value={selectedSchedule}
                  onValueChange={setSelectedSchedule}
                >
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Schedules</SelectItem>
                    <SelectItem value="Standard 9-to-5">
                      Standard 9-to-5
                    </SelectItem>
                    <SelectItem value="Early Bird">Early Bird</SelectItem>
                    <SelectItem value="Flexible Hours">
                      Flexible Hours
                    </SelectItem>
                    <SelectItem value="4-Day Week">4-Day Week</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger className="w-full md:w-40">
                    <Building className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Field">Field</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {filteredSchedules.map((schedule, index) => (
                  <div
                    key={schedule.id}
                    className="flex items-center justify-between p-3 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{schedule.employee}</p>
                      <p className="text-xs text-muted-foreground">
                        ID: {schedule.empId} • {schedule.department}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {schedule.schedule}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <AnimatedIcon
                            icon={getLocationIcon(schedule.location)}
                            className="h-3 w-3 text-muted-foreground"
                          />
                          <span className="text-xs text-muted-foreground">
                            {schedule.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {schedule.totalHours}
                      </p>
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-xs font-medium ${getComplianceColor(
                            schedule.compliance,
                          )}`}
                        >
                          {schedule.compliance}% compliance
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slideInRight">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={CalendarDays}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Holiday Calendar</CardTitle>
              </div>
              <CardDescription>
                Upcoming holidays and company events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {holidayCalendar.map((holiday, index) => (
                  <div
                    key={holiday.id}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{holiday.name}</h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getHolidayStatusColor(
                            holiday.status,
                          )}`}
                        >
                          {holiday.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{holiday.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {holiday.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>
                          <AnimatedCounter value={holiday.affectedEmployees} />{" "}
                          employees
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                size="sm"
                className="w-full mt-4 hover-lift"
                variant="outline"
              >
                <AnimatedIcon icon={Plus} size="sm" className="mr-2" />
                Add Holiday
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
