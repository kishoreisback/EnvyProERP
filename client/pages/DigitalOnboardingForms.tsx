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
import { Progress } from "@/components/ui/progress";
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
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  User,
  Calendar,
  Building,
  Phone,
  Mail,
  Download,
  Upload,
  ArrowLeft,
  TrendingUp,
  PenTool,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const formsStats = [
  {
    label: "Active Forms",
    value: 12,
    change: "+3 new employees",
    icon: FileText,
    color: "text-primary",
  },
  {
    label: "Pending Completion",
    value: 8,
    change: "Awaiting signatures",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    label: "Completed Forms",
    value: 45,
    change: "This month",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Avg Completion Time",
    value: 2.3,
    change: "hours",
    icon: TrendingUp,
    color: "text-construction-500",
  },
];

const onboardingForms = [
  {
    id: 1,
    employeeName: "Sarah Mitchell",
    position: "Senior Project Manager",
    department: "Engineering",
    startDate: "2024-01-15",
    status: "in_progress",
    completionRate: 75,
    formsCompleted: 6,
    totalForms: 8,
    lastActivity: "2 hours ago",
    personalInfo: "completed",
    taxDocuments: "completed",
    emergencyContacts: "completed",
    benefitsEnrollment: "in_progress",
    directDeposit: "pending",
    handbook: "pending",
    codeOfConduct: "completed",
    backgroundCheck: "completed",
  },
  {
    id: 2,
    employeeName: "David Park",
    position: "Site Supervisor",
    department: "Operations",
    startDate: "2024-01-20",
    status: "completed",
    completionRate: 100,
    formsCompleted: 7,
    totalForms: 7,
    lastActivity: "1 day ago",
    personalInfo: "completed",
    taxDocuments: "completed",
    emergencyContacts: "completed",
    benefitsEnrollment: "completed",
    directDeposit: "completed",
    handbook: "completed",
    codeOfConduct: "completed",
    backgroundCheck: "not_required",
  },
  {
    id: 3,
    employeeName: "Maria Rodriguez",
    position: "Safety Coordinator",
    department: "Safety",
    startDate: "2024-01-22",
    status: "not_started",
    completionRate: 0,
    formsCompleted: 0,
    totalForms: 8,
    lastActivity: "Never",
    personalInfo: "pending",
    taxDocuments: "pending",
    emergencyContacts: "pending",
    benefitsEnrollment: "pending",
    directDeposit: "pending",
    handbook: "pending",
    codeOfConduct: "pending",
    backgroundCheck: "pending",
  },
  {
    id: 4,
    employeeName: "James Wilson",
    position: "QA Inspector",
    department: "Quality",
    startDate: "2024-01-18",
    status: "pending_review",
    completionRate: 90,
    formsCompleted: 7,
    totalForms: 8,
    lastActivity: "30 minutes ago",
    personalInfo: "completed",
    taxDocuments: "completed",
    emergencyContacts: "completed",
    benefitsEnrollment: "completed",
    directDeposit: "completed",
    handbook: "completed",
    codeOfConduct: "pending_review",
    backgroundCheck: "completed",
  },
];

const formTemplates = [
  {
    id: 1,
    name: "Personal Information Form",
    category: "Basic Info",
    fields: 12,
    required: true,
    avgTime: "15 min",
  },
  {
    id: 2,
    name: "Tax Documents (W-4, I-9)",
    category: "Legal",
    fields: 8,
    required: true,
    avgTime: "20 min",
  },
  {
    id: 3,
    name: "Emergency Contacts",
    category: "Safety",
    fields: 6,
    required: true,
    avgTime: "10 min",
  },
  {
    id: 4,
    name: "Benefits Enrollment",
    category: "Benefits",
    fields: 15,
    required: false,
    avgTime: "25 min",
  },
  {
    id: 5,
    name: "Direct Deposit Setup",
    category: "Payroll",
    fields: 5,
    required: true,
    avgTime: "8 min",
  },
  {
    id: 6,
    name: "Employee Handbook",
    category: "Policy",
    fields: 3,
    required: true,
    avgTime: "45 min",
  },
];

export default function DigitalOnboardingForms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredForms = onboardingForms.filter((form) => {
    const matchesSearch =
      form.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || form.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "in_progress":
        return "secondary";
      case "pending_review":
        return "outline";
      case "not_started":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in_progress":
        return Clock;
      case "pending_review":
        return Eye;
      case "not_started":
        return AlertTriangle;
      default:
        return FileText;
    }
  };

  const getFormStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-emerald-600";
      case "in_progress":
        return "text-blue-600";
      case "pending_review":
        return "text-yellow-600";
      case "pending":
        return "text-muted-foreground";
      case "not_required":
        return "text-gray-400";
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
            <Link to="/hrms/onboarding">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Onboarding & Offboarding
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Digital Onboarding Forms
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
                Electronic forms and documentation for new hire processing
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
              Export Data
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Form Package
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {formsStats.map((stat, index) => (
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
                  {stat.label.includes("Avg") && (
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

        {/* Filters & Search */}
        <Card className="animate-slideInUp">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by employee name, position, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="not_started">Not Started</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Forms Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={FileText}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Employee Forms Progress</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredForms.length} /> employees
              </Badge>
            </div>
            <CardDescription>
              Track digital form completion status for new hires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Key Forms</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredForms.map((form, index) => (
                  <TableRow
                    key={form.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {form.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {form.position}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {form.department}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Start: {form.startDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(form.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {form.status === "in_progress" && (
                          <PulsingDot className="scale-50" />
                        )}
                        <AnimatedIcon
                          icon={getStatusIcon(form.status)}
                          className="h-3 w-3"
                        />
                        {form.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={form.completionRate}
                            className="w-20"
                          />
                          <span className="text-sm font-medium">
                            {form.completionRate}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {form.formsCompleted}/{form.totalForms} forms complete
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div className="flex items-center gap-1">
                          <UserCheck
                            className={`h-3 w-3 ${getFormStatusColor(
                              form.personalInfo,
                            )}`}
                          />
                          <span>Personal</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText
                            className={`h-3 w-3 ${getFormStatusColor(
                              form.taxDocuments,
                            )}`}
                          />
                          <span>Tax Docs</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone
                            className={`h-3 w-3 ${getFormStatusColor(
                              form.emergencyContacts,
                            )}`}
                          />
                          <span>Emergency</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle
                            className={`h-3 w-3 ${getFormStatusColor(
                              form.benefitsEnrollment,
                            )}`}
                          />
                          <span>Benefits</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-muted-foreground">
                        {form.lastActivity}
                      </div>
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
                            View Forms
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Edit}
                              className="mr-2 h-4 w-4"
                            />
                            Edit Forms
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Send}
                              className="mr-2 h-4 w-4"
                            />
                            Send Reminder
                          </DropdownMenuItem>
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

        {/* Form Templates */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={PenTool}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Form Templates</CardTitle>
            </div>
            <CardDescription>
              Standard onboarding forms and documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {formTemplates.map((template, index) => (
                <Card
                  key={template.id}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">
                          {template.name}
                        </h4>
                        {template.required && (
                          <Badge variant="destructive" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {template.category}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Fields:</span>
                          <span className="font-medium ml-1">
                            {template.fields}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Time:</span>
                          <span className="font-medium ml-1">
                            {template.avgTime}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full hover-lift"
                        variant="outline"
                      >
                        <AnimatedIcon icon={Edit} size="sm" className="mr-2" />
                        Edit Template
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
