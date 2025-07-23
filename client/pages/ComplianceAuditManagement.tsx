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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Shield,
  FileText,
  Building,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Eye,
  Download,
  Plus,
  Search,
  Filter,
  Archive,
  Clock,
  Send,
  Upload,
  Lock,
  UserX,
  Database,
  Settings,
  Trash2,
  Edit,
  History,
  BarChart3,
  FileCheck,
  Scale,
  BookOpen,
  IndianRupee,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  AlertCircle,
  Info,
  CheckCircle2,
} from "lucide-react";
import { BackToHRMS } from "@/components/hrms";

// Statutory Compliance Data
const statutoryCompliance = [
  {
    id: 1,
    category: "Provident Fund (PF)",
    status: "compliant",
    lastFiling: "2024-12-15",
    nextDue: "2025-01-15",
    authority: "EPFO",
    completionRate: 100,
    documents: ["PF Returns", "Challan", "Annual Report"],
    penalties: 0,
    responsible: "Finance Team",
  },
  {
    id: 2,
    category: "Employee State Insurance (ESI)",
    status: "pending",
    lastFiling: "2024-11-15",
    nextDue: "2024-12-30",
    authority: "ESIC",
    completionRate: 85,
    documents: ["ESI Returns", "Contribution Report"],
    penalties: 0,
    responsible: "HR Department",
  },
  {
    id: 3,
    category: "Professional Tax",
    status: "overdue",
    lastFiling: "2024-11-30",
    nextDue: "2024-12-25",
    authority: "State Government",
    completionRate: 60,
    documents: ["PT Challan", "Monthly Returns"],
    penalties: 2500,
    responsible: "Payroll Team",
  },
  {
    id: 4,
    category: "TDS Returns",
    status: "compliant",
    lastFiling: "2024-12-10",
    nextDue: "2025-01-31",
    authority: "Income Tax Department",
    completionRate: 100,
    documents: ["Form 24Q", "Form 26Q", "Certificates"],
    penalties: 0,
    responsible: "Tax Consultant",
  },
];

// Labor Law Compliance Data
const laborLawCompliance = [
  {
    id: 1,
    act: "Factories Act, 1948",
    applicability: "Manufacturing Units",
    lastReview: "2024-10-15",
    nextReview: "2025-04-15",
    complianceLevel: 95,
    violations: 0,
    requirements: [
      "License renewal",
      "Safety measures",
      "Working hours compliance",
      "Medical facilities",
    ],
    officer: "Safety Inspector",
    location: "All Manufacturing Sites",
  },
  {
    id: 2,
    act: "Contract Labour Act, 1970",
    applicability: "Contract Workers",
    lastReview: "2024-11-20",
    nextReview: "2025-05-20",
    complianceLevel: 88,
    violations: 2,
    requirements: [
      "Principal employer registration",
      "Contractor license",
      "Wage compliance",
      "Welfare facilities",
    ],
    officer: "Labour Inspector",
    location: "All Sites with Contract Labour",
  },
  {
    id: 3,
    act: "Minimum Wages Act, 1948",
    applicability: "All Employees",
    lastReview: "2024-12-01",
    nextReview: "2025-06-01",
    complianceLevel: 100,
    violations: 0,
    requirements: [
      "Wage rate compliance",
      "Overtime calculation",
      "Variable DA payment",
      "Record maintenance",
    ],
    officer: "Wage Inspector",
    location: "All Locations",
  },
];

// Audit Logs Data
const auditLogs = [
  {
    id: 1,
    timestamp: "2024-12-23 14:30:25",
    user: "admin@company.com",
    action: "Employee Data Export",
    module: "Employee Management",
    details: "Exported 156 employee records for payroll processing",
    ipAddress: "192.168.1.45",
    status: "success",
    riskLevel: "low",
  },
  {
    id: 2,
    timestamp: "2024-12-23 13:15:42",
    user: "hr.manager@company.com",
    action: "Salary Structure Updated",
    module: "Payroll Management",
    details: "Updated salary structure for grade L3 employees",
    ipAddress: "192.168.1.67",
    status: "success",
    riskLevel: "medium",
  },
  {
    id: 3,
    timestamp: "2024-12-23 11:45:18",
    user: "finance@company.com",
    action: "Failed Login Attempt",
    module: "Authentication",
    details: "Multiple failed login attempts detected",
    ipAddress: "203.142.58.22",
    status: "failure",
    riskLevel: "high",
  },
  {
    id: 4,
    timestamp: "2024-12-23 10:20:33",
    user: "data.officer@company.com",
    action: "GDPR Data Deletion",
    module: "Data Privacy",
    details: "Processed data deletion request for ex-employee ID: EMP789",
    ipAddress: "192.168.1.89",
    status: "success",
    riskLevel: "medium",
  },
];

// GDPR Data Privacy Tools Data
const gdprRequests = [
  {
    id: 1,
    requestType: "Data Access Request",
    requester: "john.doe@email.com",
    employeeId: "EMP123",
    requestDate: "2024-12-20",
    status: "in_progress",
    dueDate: "2025-01-19",
    assignedTo: "Data Protection Officer",
    dataCategories: ["Personal Info", "Payroll Data", "Performance Records"],
    priority: "medium",
  },
  {
    id: 2,
    requestType: "Data Deletion Request",
    requester: "jane.smith@email.com",
    employeeId: "EMP456",
    requestDate: "2024-12-18",
    status: "completed",
    dueDate: "2025-01-17",
    assignedTo: "IT Security Team",
    dataCategories: ["All Personal Data"],
    priority: "high",
  },
  {
    id: 3,
    requestType: "Data Rectification",
    requester: "mike.wilson@email.com",
    employeeId: "EMP789",
    requestDate: "2024-12-22",
    status: "pending",
    dueDate: "2025-01-21",
    assignedTo: "HR Data Team",
    dataCategories: ["Contact Information", "Emergency Contacts"],
    priority: "low",
  },
];

const dataProcessingInventory = [
  {
    id: 1,
    processName: "Employee Recruitment",
    dataTypes: ["CV/Resume", "Interview Notes", "Background Check Results"],
    legalBasis: "Legitimate Interest",
    retention: "2 years post-application",
    recipients: ["HR Team", "Hiring Managers"],
    transfers: "None",
    riskLevel: "medium",
  },
  {
    id: 2,
    processName: "Payroll Processing",
    dataTypes: ["Salary Details", "Bank Information", "Tax Data"],
    legalBasis: "Contract Performance",
    retention: "7 years post-employment",
    recipients: ["Payroll Team", "Finance Department"],
    transfers: "Banking Partners",
    riskLevel: "high",
  },
  {
    id: 3,
    processName: "Performance Management",
    dataTypes: ["Performance Reviews", "Goal Data", "Feedback"],
    legalBasis: "Legitimate Interest",
    retention: "5 years post-employment",
    recipients: ["Managers", "HR Business Partners"],
    transfers: "None",
    riskLevel: "low",
  },
];

// Document Retention Policies Data
const retentionPolicies = [
  {
    id: 1,
    documentType: "Employee Personnel Files",
    category: "HR Records",
    retentionPeriod: "7 years post-termination",
    legalRequirement: "Labour Law Compliance",
    storageLocation: "Digital Archive - HR System",
    accessLevel: "HR Department Only",
    reviewDate: "2025-03-15",
    status: "active",
    totalDocuments: 1250,
    dueForDestruction: 45,
  },
  {
    id: 2,
    documentType: "Payroll Records",
    category: "Financial Records",
    retentionPeriod: "7 years from last entry",
    legalRequirement: "Income Tax Act",
    storageLocation: "Secure Cloud Storage",
    accessLevel: "Finance & Payroll Teams",
    reviewDate: "2025-02-28",
    status: "active",
    totalDocuments: 8760,
    dueForDestruction: 120,
  },
  {
    id: 3,
    documentType: "Safety Incident Reports",
    category: "Safety Records",
    retentionPeriod: "10 years from incident date",
    legalRequirement: "Factories Act",
    storageLocation: "Physical Archive + Digital Backup",
    accessLevel: "Safety Team & Management",
    reviewDate: "2025-01-30",
    status: "active",
    totalDocuments: 89,
    dueForDestruction: 3,
  },
  {
    id: 4,
    documentType: "Training Certificates",
    category: "Training Records",
    retentionPeriod: "5 years post-employment",
    legalRequirement: "Skills Development",
    storageLocation: "LMS Database",
    accessLevel: "HR & Training Teams",
    reviewDate: "2025-04-10",
    status: "under_review",
    totalDocuments: 2340,
    dueForDestruction: 78,
  },
];

export default function ComplianceAuditManagement() {
  const [activeTab, setActiveTab] = useState("statutory");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const complianceStats = {
    totalCompliance:
      (statutoryCompliance.filter((c) => c.status === "compliant").length /
        statutoryCompliance.length) *
      100,
    overdueTasks: statutoryCompliance.filter((c) => c.status === "overdue")
      .length,
    pendingGDPRRequests: gdprRequests.filter((r) => r.status !== "completed")
      .length,
    totalPenalties: statutoryCompliance.reduce(
      (sum, c) => sum + c.penalties,
      0,
    ),
  };

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
                Compliance & Audit Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Shield}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Comprehensive compliance tracking, audit management, and data
                privacy tools
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
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              New Compliance Check
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="hover-lift animate-fadeInUp relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  Overall Compliance
                </p>
                <AnimatedIcon
                  icon={CheckCircle}
                  animation="glow"
                  className="text-emerald-600"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter
                  value={complianceStats.totalCompliance}
                  suffix="%"
                  decimals={1}
                />
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                +3.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp relative overflow-hidden group"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Overdue Tasks</p>
                <AnimatedIcon
                  icon={AlertTriangle}
                  animation="bounce"
                  className="text-red-500"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={complianceStats.overdueTasks} />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <PulsingDot className="scale-75" />
                Requires immediate attention
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp relative overflow-hidden group"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">GDPR Requests</p>
                <AnimatedIcon
                  icon={Lock}
                  animation="pulse"
                  className="text-blue-600"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={complianceStats.pendingGDPRRequests} />
              </div>
              <p className="text-xs text-muted-foreground">
                Pending processing
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp relative overflow-hidden group"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Penalties</p>
                <AnimatedIcon
                  icon={IndianRupee}
                  animation="pulse"
                  className="text-yellow-600"
                />
              </div>
              <div className="text-2xl font-bold">
                ₹<AnimatedCounter value={complianceStats.totalPenalties} />
              </div>
              <p className="text-xs text-muted-foreground">
                This financial year
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="h-auto p-1 bg-muted/50 lg:grid lg:grid-cols-5 w-full overflow-x-auto scrollbar-hide flex lg:flex-none gap-1 lg:gap-0">
            <TabsTrigger
              value="statutory"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Shield} size="sm" className="mr-2" />
              Statutory Compliance
            </TabsTrigger>
            <TabsTrigger
              value="labor"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Scale} size="sm" className="mr-2" />
              Labor Law Compliance
            </TabsTrigger>
            <TabsTrigger
              value="audit"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={FileCheck} size="sm" className="mr-2" />
              Audit Logs
            </TabsTrigger>
            <TabsTrigger
              value="gdpr"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Lock} size="sm" className="mr-2" />
              GDPR / Data Privacy
            </TabsTrigger>
            <TabsTrigger
              value="retention"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Archive} size="sm" className="mr-2" />
              Document Retention
            </TabsTrigger>
          </TabsList>

          {/* Statutory Compliance Tracker Tab */}
          <TabsContent value="statutory" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Shield}
                      className="text-construction-500"
                    />
                    <CardTitle>Statutory Compliance Tracker</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Compliance
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Track Indian statutory compliances including PF, ESI, TDS, and
                  Professional Tax
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statutoryCompliance.map((compliance, index) => (
                    <Card
                      key={compliance.id}
                      className="p-4 animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-lg">
                                {compliance.category}
                              </h4>
                              <Badge
                                variant={
                                  compliance.status === "compliant"
                                    ? "default"
                                    : compliance.status === "pending"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {compliance.status === "compliant" && (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                )}
                                {compliance.status === "overdue" && (
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                )}
                                {compliance.status === "pending" && (
                                  <Clock className="h-3 w-3 mr-1" />
                                )}
                                {compliance.status}
                              </Badge>
                              {compliance.penalties > 0 && (
                                <Badge variant="destructive">
                                  ₹{compliance.penalties} penalty
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Authority: {compliance.authority} • Responsible:{" "}
                              {compliance.responsible}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-construction-500">
                              {compliance.completionRate}%
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Completion Rate
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Compliance Progress</span>
                            <span className="font-medium">
                              {compliance.completionRate}%
                            </span>
                          </div>
                          <Progress
                            value={compliance.completionRate}
                            className="h-2"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Last Filing
                            </Label>
                            <p className="font-medium">
                              {compliance.lastFiling}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Next Due
                            </Label>
                            <p className="font-medium">{compliance.nextDue}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Documents
                            </Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {compliance.documents.map((doc, docIndex) => (
                                <Badge
                                  key={docIndex}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Upload className="h-3 w-3 mr-1" />
                            Upload Documents
                          </Button>
                          <Button size="sm" className="hover-lift">
                            <Send className="h-3 w-3 mr-1" />
                            File Return
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Labor Law Compliance Tab */}
          <TabsContent value="labor" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AnimatedIcon icon={Scale} className="text-primary" />
                  <CardTitle>Labor Law Compliance Management</CardTitle>
                </div>
                <CardDescription>
                  Monitor compliance with Indian labor laws and regulations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {laborLawCompliance.map((law, index) => (
                    <Card
                      key={law.id}
                      className="p-4 animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-lg">{law.act}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {law.applicability}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {law.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {law.officer}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-emerald-600">
                              {law.complianceLevel}%
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              {law.violations > 0 ? (
                                <Badge variant="destructive">
                                  {law.violations} violations
                                </Badge>
                              ) : (
                                <Badge variant="default">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Compliant
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Compliance Level</span>
                            <span className="font-medium">
                              {law.complianceLevel}%
                            </span>
                          </div>
                          <Progress
                            value={law.complianceLevel}
                            className="h-2"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Last Review
                            </Label>
                            <p className="font-medium">{law.lastReview}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Next Review
                            </Label>
                            <p className="font-medium">{law.nextReview}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Key Requirements
                          </Label>
                          <div className="grid grid-cols-2 gap-2">
                            {law.requirements.map((req, reqIndex) => (
                              <div
                                key={reqIndex}
                                className="flex items-center gap-2 p-2 border rounded-lg"
                              >
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm">{req}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Review Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Documentation
                          </Button>
                          <Button size="sm" className="hover-lift">
                            <Settings className="h-3 w-3 mr-1" />
                            Schedule Review
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={FileCheck}
                      className="text-safety-600"
                    />
                    <CardTitle>System Audit Logs</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search audit logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="failure">Failure</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <CardDescription>
                  Complete audit trail of system activities and user actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">
                          {log.timestamp}
                        </TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{log.action}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-48">
                              {log.details}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.module}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              log.status === "success"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {log.status === "success" ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              log.riskLevel === "high"
                                ? "destructive"
                                : log.riskLevel === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {log.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Audit Statistics */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Today's Activities
                    </p>
                    <AnimatedIcon icon={BarChart3} className="text-primary" />
                  </div>
                  <div className="text-2xl font-bold">248</div>
                  <p className="text-xs text-muted-foreground">
                    System events logged
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Failed Attempts
                    </p>
                    <AnimatedIcon
                      icon={AlertTriangle}
                      className="text-red-500"
                    />
                  </div>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Requires investigation
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      High Risk Events
                    </p>
                    <AnimatedIcon
                      icon={Shield}
                      className="text-construction-500"
                    />
                  </div>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">
                    In last 24 hours
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* GDPR / Data Privacy Tools Tab */}
          <TabsContent value="gdpr" className="space-y-6">
            <div className="grid gap-6">
              {/* GDPR Requests */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AnimatedIcon icon={Lock} className="text-blue-600" />
                    <CardTitle>GDPR Data Subject Requests</CardTitle>
                  </div>
                  <CardDescription>
                    Manage data access, rectification, and deletion requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gdprRequests.map((request, index) => (
                      <Card
                        key={request.id}
                        className="p-4 animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">
                                {request.requestType}
                              </h4>
                              <Badge
                                variant={
                                  request.status === "completed"
                                    ? "default"
                                    : request.status === "in_progress"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {request.status.replace("_", " ")}
                              </Badge>
                              <Badge
                                variant={
                                  request.priority === "high"
                                    ? "destructive"
                                    : request.priority === "medium"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {request.priority} priority
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Requester
                                </Label>
                                <p>{request.requester}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Employee ID
                                </Label>
                                <p>{request.employeeId}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Request Date
                                </Label>
                                <p>{request.requestDate}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Due Date
                                </Label>
                                <p>{request.dueDate}</p>
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">
                                Data Categories
                              </Label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {request.dataCategories.map(
                                  (category, catIndex) => (
                                    <Badge
                                      key={catIndex}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {category}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              Assigned to
                            </p>
                            <p className="font-medium">{request.assignedTo}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 pt-4 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Update Status
                          </Button>
                          <Button size="sm" className="hover-lift">
                            <Send className="h-3 w-3 mr-1" />
                            Process Request
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Data Processing Inventory */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Database}
                      className="text-emerald-600"
                    />
                    Data Processing Inventory
                  </CardTitle>
                  <CardDescription>
                    Record of all personal data processing activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Process Name</TableHead>
                        <TableHead>Data Types</TableHead>
                        <TableHead>Legal Basis</TableHead>
                        <TableHead>Retention Period</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dataProcessingInventory.map((process) => (
                        <TableRow key={process.id}>
                          <TableCell className="font-medium">
                            {process.processName}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {process.dataTypes
                                .slice(0, 2)
                                .map((type, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {type}
                                  </Badge>
                                ))}
                              {process.dataTypes.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{process.dataTypes.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {process.legalBasis}
                            </Badge>
                          </TableCell>
                          <TableCell>{process.retention}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                process.riskLevel === "high"
                                  ? "destructive"
                                  : process.riskLevel === "medium"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {process.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="h-3 w-3" />
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
          </TabsContent>

          {/* Document Retention Policies Tab */}
          <TabsContent value="retention" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Archive}
                      className="text-construction-500"
                    />
                    <CardTitle>Document Retention Policies</CardTitle>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Policy
                  </Button>
                </div>
                <CardDescription>
                  Manage document retention schedules and automated destruction
                  policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {retentionPolicies.map((policy, index) => (
                    <Card
                      key={policy.id}
                      className="p-4 animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">
                                {policy.documentType}
                              </h4>
                              <Badge variant="outline">{policy.category}</Badge>
                              <Badge
                                variant={
                                  policy.status === "active"
                                    ? "default"
                                    : policy.status === "under_review"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {policy.status.replace("_", " ")}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {policy.legalRequirement} • {policy.accessLevel}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              {policy.retentionPeriod}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Retention Period
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Storage Location
                            </Label>
                            <p className="font-medium">
                              {policy.storageLocation}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Review Date
                            </Label>
                            <p className="font-medium">{policy.reviewDate}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Total Documents
                            </Label>
                            <p className="font-medium">
                              {policy.totalDocuments.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {policy.dueForDestruction > 0 && (
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm font-medium text-yellow-800">
                                {policy.dueForDestruction} documents due for
                                destruction
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Policy
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <History className="h-3 w-3 mr-1" />
                            View History
                          </Button>
                          {policy.dueForDestruction > 0 && (
                            <Button
                              size="sm"
                              variant="destructive"
                              className="hover-lift"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Schedule Destruction
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Retention Summary */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Active Policies
                    </p>
                    <AnimatedIcon icon={FileText} className="text-primary" />
                  </div>
                  <div className="text-2xl font-bold">
                    {
                      retentionPolicies.filter((p) => p.status === "active")
                        .length
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total policies
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Total Documents
                    </p>
                    <AnimatedIcon
                      icon={Archive}
                      className="text-construction-500"
                    />
                  </div>
                  <div className="text-2xl font-bold">
                    {retentionPolicies
                      .reduce((sum, p) => sum + p.totalDocuments, 0)
                      .toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Under management
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Due for Destruction
                    </p>
                    <AnimatedIcon icon={Trash2} className="text-red-500" />
                  </div>
                  <div className="text-2xl font-bold">
                    {retentionPolicies.reduce(
                      (sum, p) => sum + p.dueForDestruction,
                      0,
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Requires action
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Reviews Due</p>
                    <AnimatedIcon icon={Calendar} className="text-yellow-500" />
                  </div>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
