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
  Shield,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  FileText,
  User,
  Phone,
  Building,
  Calendar,
  Award,
  Fingerprint,
  UserCheck,
  AlertCircle,
  Plus,
  TrendingUp,
  Download,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const checksStats = [
  {
    label: "Active Checks",
    value: 18,
    change: "+5 this week",
    icon: Shield,
    color: "text-primary",
  },
  {
    label: "Pending Verification",
    value: 7,
    change: "In progress",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    label: "Completed Checks",
    value: 145,
    change: "This month",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Avg Processing Time",
    value: 5.2,
    change: "days",
    icon: TrendingUp,
    color: "text-construction-500",
  },
];

const employmentChecks = [
  {
    id: 1,
    candidateName: "Sarah Mitchell",
    position: "Senior Project Manager",
    initiatedDate: "2024-01-05",
    status: "in_progress",
    completionRate: 75,
    checks: {
      backgroundCheck: "completed",
      referenceCheck: "completed",
      educationVerification: "in_progress",
      employmentHistory: "completed",
      drugTest: "pending",
      criminalRecord: "completed",
      creditCheck: "not_required",
      professionalLicense: "in_progress",
    },
    assignedTo: "HR Team",
    expectedCompletion: "2024-01-12",
    priority: "high",
  },
  {
    id: 2,
    candidateName: "David Park",
    position: "Site Supervisor",
    initiatedDate: "2024-01-03",
    status: "completed",
    completionRate: 100,
    checks: {
      backgroundCheck: "completed",
      referenceCheck: "completed",
      educationVerification: "completed",
      employmentHistory: "completed",
      drugTest: "completed",
      criminalRecord: "completed",
      creditCheck: "completed",
      professionalLicense: "completed",
    },
    assignedTo: "External Vendor",
    expectedCompletion: "2024-01-10",
    priority: "medium",
  },
  {
    id: 3,
    candidateName: "Maria Rodriguez",
    position: "Safety Coordinator",
    initiatedDate: "2024-01-08",
    status: "failed",
    completionRate: 60,
    checks: {
      backgroundCheck: "completed",
      referenceCheck: "failed",
      educationVerification: "completed",
      employmentHistory: "completed",
      drugTest: "completed",
      criminalRecord: "completed",
      creditCheck: "not_required",
      professionalLicense: "completed",
    },
    assignedTo: "HR Team",
    expectedCompletion: "2024-01-15",
    priority: "medium",
  },
  {
    id: 4,
    candidateName: "James Wilson",
    position: "QA Inspector",
    initiatedDate: "2024-01-10",
    status: "pending",
    completionRate: 25,
    checks: {
      backgroundCheck: "in_progress",
      referenceCheck: "pending",
      educationVerification: "pending",
      employmentHistory: "pending",
      drugTest: "pending",
      criminalRecord: "pending",
      creditCheck: "not_required",
      professionalLicense: "not_required",
    },
    assignedTo: "External Vendor",
    expectedCompletion: "2024-01-17",
    priority: "low",
  },
  {
    id: 5,
    candidateName: "Emma Thompson",
    position: "Project Engineer",
    initiatedDate: "2024-01-06",
    status: "in_progress",
    completionRate: 85,
    checks: {
      backgroundCheck: "completed",
      referenceCheck: "completed",
      educationVerification: "completed",
      employmentHistory: "completed",
      drugTest: "completed",
      criminalRecord: "completed",
      creditCheck: "in_progress",
      professionalLicense: "completed",
    },
    assignedTo: "HR Team",
    expectedCompletion: "2024-01-13",
    priority: "high",
  },
];

const checkTypes = [
  {
    name: "Background Check",
    key: "backgroundCheck",
    description: "Comprehensive background verification",
    avgDuration: "3-5 days",
    icon: Shield,
    required: true,
  },
  {
    name: "Reference Check",
    key: "referenceCheck",
    description: "Employment and character references",
    avgDuration: "2-3 days",
    icon: User,
    required: true,
  },
  {
    name: "Education Verification",
    key: "educationVerification",
    description: "Academic credentials verification",
    avgDuration: "5-7 days",
    icon: Award,
    required: true,
  },
  {
    name: "Employment History",
    key: "employmentHistory",
    description: "Previous employment verification",
    avgDuration: "3-5 days",
    icon: Building,
    required: true,
  },
  {
    name: "Drug Test",
    key: "drugTest",
    description: "Substance screening test",
    avgDuration: "1-2 days",
    icon: UserCheck,
    required: true,
  },
  {
    name: "Criminal Record",
    key: "criminalRecord",
    description: "Criminal history background check",
    avgDuration: "2-4 days",
    icon: Fingerprint,
    required: true,
  },
  {
    name: "Credit Check",
    key: "creditCheck",
    description: "Financial background verification",
    avgDuration: "1-2 days",
    icon: FileText,
    required: false,
  },
  {
    name: "Professional License",
    key: "professionalLicense",
    description: "Industry certification verification",
    avgDuration: "3-5 days",
    icon: Award,
    required: false,
  },
];

export default function PreEmploymentChecks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredChecks = employmentChecks.filter((check) => {
    const matchesSearch =
      check.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      check.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      check.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || check.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "in_progress":
        return "secondary";
      case "failed":
        return "destructive";
      case "pending":
        return "outline";
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
      case "failed":
        return X;
      case "pending":
        return AlertCircle;
      default:
        return Shield;
    }
  };

  const getCheckStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in_progress":
        return Clock;
      case "failed":
        return X;
      case "pending":
        return AlertCircle;
      case "not_required":
        return null;
      default:
        return AlertCircle;
    }
  };

  const getCheckStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-emerald-600";
      case "in_progress":
        return "text-yellow-500";
      case "failed":
        return "text-red-500";
      case "pending":
        return "text-muted-foreground";
      case "not_required":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-emerald-500";
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
            <Link to="/hrms/recruitment">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Recruitment Modules
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Pre-Employment Checks
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Shield}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Background verification and compliance screening management
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
              Export Report
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Initiate Check
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {checksStats.map((stat, index) => (
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
                    <span className="text-sm font-normal ml-1">days</span>
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
                    placeholder="Search by candidate name, position, or assigned team..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Employment Checks Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Shield}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Employment Verification</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredChecks.length} /> candidates
              </Badge>
            </div>
            <CardDescription>
              Track background checks, reference verification, and compliance
              screening
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Key Checks</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChecks.map((check, index) => (
                  <TableRow
                    key={check.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {check.candidateName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {check.position}
                        </p>
                        <div className="flex items-center gap-1">
                          <div
                            className={`h-2 w-2 rounded-full ${getPriorityColor(
                              check.priority,
                            )} opacity-75`}
                          />
                          <span className="text-xs text-muted-foreground capitalize">
                            {check.priority} priority
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(check.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {check.status === "in_progress" && (
                          <PulsingDot className="scale-50" />
                        )}
                        <AnimatedIcon
                          icon={getStatusIcon(check.status)}
                          className="h-3 w-3"
                        />
                        {check.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={check.completionRate}
                            className="w-20"
                          />
                          <span className="text-sm font-medium">
                            {check.completionRate}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {
                            Object.values(check.checks).filter(
                              (status) => status === "completed",
                            ).length
                          }
                          /
                          {
                            Object.values(check.checks).filter(
                              (status) => status !== "not_required",
                            ).length
                          }{" "}
                          checks complete
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="grid grid-cols-2 gap-1">
                        {Object.entries(check.checks)
                          .slice(0, 4)
                          .map(([checkType, status]) => {
                            const Icon = getCheckStatusIcon(status);
                            return (
                              <div
                                key={checkType}
                                className="flex items-center gap-1"
                              >
                                {Icon && (
                                  <Icon
                                    className={`h-3 w-3 ${getCheckStatusColor(
                                      status,
                                    )}`}
                                  />
                                )}
                                <span className="text-xs truncate">
                                  {checkType.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>Started: {check.initiatedDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Due: {check.expectedCompletion}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{check.assignedTo}</span>
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={RefreshCw}
                              className="mr-2 h-4 w-4"
                            />
                            Refresh Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Mail}
                              className="mr-2 h-4 w-4"
                            />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Download}
                              className="mr-2 h-4 w-4"
                            />
                            Download Report
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

        {/* Check Types Overview */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={UserCheck}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Verification Types</CardTitle>
            </div>
            <CardDescription>
              Standard pre-employment check categories and requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {checkTypes.map((checkType, index) => (
                <Card
                  key={checkType.key}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AnimatedIcon
                            icon={checkType.icon}
                            animation="float"
                            className="text-primary"
                          />
                          <h4 className="font-semibold text-sm">
                            {checkType.name}
                          </h4>
                        </div>
                        {checkType.required && (
                          <Badge variant="secondary" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {checkType.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">
                          {checkType.avgDuration}
                        </span>
                      </div>
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
