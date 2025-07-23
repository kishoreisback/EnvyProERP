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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Crown,
  Users,
  Calendar,
  Clock,
  FileText,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  X,
  Plus,
  Star,
  Target,
  Briefcase,
  BookOpen,
  BarChart3,
  Eye,
  Edit,
  UserPlus,
  ClipboardCheck,
  Building,
  DollarSign,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ArrowDown,
  Minus,
  Send,
  Upload,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const managerProfile = {
  name: "David Wilson",
  position: "Operations Director",
  department: "Operations",
  teamSize: 38,
  directReports: 6,
  avatar: "/placeholder.svg",
};

const teamMembers = [
  {
    id: 1,
    name: "Mike Chen",
    position: "Site Supervisor",
    performance: 92,
    projects: 3,
    status: "active",
    avatar: "/placeholder.svg",
    email: "mike.chen@company.com",
    phone: "+1 (555) 123-4567",
    location: "Site A - Downtown",
    joinDate: "2022-03-15",
    reportingManager: "David Wilson",
    skills: ["Project Management", "Safety Protocols", "Team Leadership"],
    attendanceRate: 96,
    lastLogin: "2024-12-23 09:15",
  },
  {
    id: 2,
    name: "Lisa Martinez",
    position: "Site Manager",
    performance: 88,
    projects: 2,
    status: "active",
    avatar: "/placeholder.svg",
    email: "lisa.martinez@company.com",
    phone: "+1 (555) 234-5678",
    location: "Site B - Industrial Zone",
    joinDate: "2021-11-08",
    reportingManager: "David Wilson",
    skills: ["Site Management", "Quality Control", "Resource Planning"],
    attendanceRate: 94,
    lastLogin: "2024-12-23 08:30",
  },
  {
    id: 3,
    name: "Tom Johnson",
    position: "Equipment Manager",
    performance: 85,
    projects: 4,
    status: "on_leave",
    avatar: "/placeholder.svg",
    email: "tom.johnson@company.com",
    phone: "+1 (555) 345-6789",
    location: "Equipment Yard",
    joinDate: "2020-07-22",
    reportingManager: "David Wilson",
    skills: [
      "Equipment Maintenance",
      "Inventory Management",
      "Technical Support",
    ],
    attendanceRate: 92,
    lastLogin: "2024-12-20 17:45",
  },
  {
    id: 4,
    name: "Amy Rodriguez",
    position: "Safety Coordinator",
    performance: 95,
    projects: 2,
    status: "active",
    avatar: "/placeholder.svg",
    email: "amy.rodriguez@company.com",
    phone: "+1 (555) 456-7890",
    location: "Corporate Office",
    joinDate: "2023-01-10",
    reportingManager: "David Wilson",
    skills: ["Safety Management", "Risk Assessment", "Training & Development"],
    attendanceRate: 98,
    lastLogin: "2024-12-23 10:00",
  },
  {
    id: 5,
    name: "James Kim",
    position: "Quality Inspector",
    performance: 90,
    projects: 3,
    status: "active",
    avatar: "/placeholder.svg",
    email: "james.kim@company.com",
    phone: "+1 (555) 567-8901",
    location: "Site C - Residential",
    joinDate: "2022-09-05",
    reportingManager: "David Wilson",
    skills: ["Quality Assurance", "Documentation", "Problem Solving"],
    attendanceRate: 95,
    lastLogin: "2024-12-23 07:20",
  },
  {
    id: 6,
    name: "Maria Santos",
    position: "Project Coordinator",
    performance: 87,
    projects: 1,
    status: "active",
    avatar: "/placeholder.svg",
    email: "maria.santos@company.com",
    phone: "+1 (555) 678-9012",
    location: "Site D - Commercial",
    joinDate: "2023-05-18",
    reportingManager: "David Wilson",
    skills: ["Project Coordination", "Communication", "Scheduling"],
    attendanceRate: 93,
    lastLogin: "2024-12-22 16:30",
  },
];

const leaveRequests = [
  {
    id: 1,
    employee: "Mike Chen",
    employeeId: "EMP001",
    leaveType: "Annual Leave",
    startDate: "2024-12-28",
    endDate: "2024-12-30",
    days: 3,
    reason: "Family vacation during holiday season",
    status: "pending",
    submittedDate: "2024-12-20",
    priority: "normal",
    coverageArranged: "Yes",
    coveringEmployee: "Lisa Martinez",
  },
  {
    id: 2,
    employee: "Amy Rodriguez",
    employeeId: "EMP004",
    leaveType: "Sick Leave",
    startDate: "2024-12-26",
    endDate: "2024-12-26",
    days: 1,
    reason: "Medical appointment",
    status: "pending",
    submittedDate: "2024-12-24",
    priority: "normal",
    coverageArranged: "Yes",
    coveringEmployee: "James Kim",
  },
  {
    id: 3,
    employee: "Tom Johnson",
    employeeId: "EMP003",
    leaveType: "Personal Leave",
    startDate: "2025-01-02",
    endDate: "2025-01-03",
    days: 2,
    reason: "Personal family matters",
    status: "pending",
    submittedDate: "2024-12-22",
    priority: "low",
    coverageArranged: "No",
    coveringEmployee: "",
  },
];

const attendanceRecords = [
  {
    id: 1,
    employee: "Mike Chen",
    date: "2024-12-23",
    checkIn: "07:30",
    checkOut: "16:30",
    hoursWorked: 8.5,
    overtime: 0.5,
    status: "present",
    location: "Site A",
  },
  {
    id: 2,
    employee: "Lisa Martinez",
    date: "2024-12-23",
    checkIn: "08:00",
    checkOut: "17:00",
    hoursWorked: 8.0,
    overtime: 0,
    status: "present",
    location: "Site B",
  },
  {
    id: 3,
    employee: "Amy Rodriguez",
    date: "2024-12-23",
    checkIn: "08:30",
    checkOut: "17:30",
    hoursWorked: 8.0,
    overtime: 0,
    status: "present",
    location: "Corporate Office",
  },
];

const performanceData = [
  {
    employee: "Mike Chen",
    currentScore: 92,
    previousScore: 88,
    trend: "up",
    goals: [
      { title: "Complete Project Alpha", progress: 85, target: "Jan 2025" },
      { title: "Team Training Sessions", progress: 70, target: "Feb 2025" },
    ],
    kpis: {
      productivity: 95,
      quality: 89,
      teamwork: 92,
      leadership: 90,
    },
  },
  {
    employee: "Lisa Martinez",
    currentScore: 88,
    previousScore: 90,
    trend: "down",
    goals: [
      {
        title: "Site Efficiency Improvement",
        progress: 60,
        target: "Mar 2025",
      },
      { title: "Cost Reduction Initiative", progress: 45, target: "Apr 2025" },
    ],
    kpis: {
      productivity: 87,
      quality: 91,
      teamwork: 86,
      leadership: 88,
    },
  },
  {
    employee: "Amy Rodriguez",
    currentScore: 95,
    previousScore: 93,
    trend: "up",
    goals: [
      { title: "Safety Protocol Update", progress: 90, target: "Jan 2025" },
      { title: "Zero Incident Campaign", progress: 85, target: "Dec 2024" },
    ],
    kpis: {
      productivity: 96,
      quality: 98,
      teamwork: 94,
      leadership: 92,
    },
  },
];

const promotionRequests = [
  {
    id: 1,
    employeeName: "James Kim",
    currentPosition: "Quality Inspector",
    proposedPosition: "Senior Quality Inspector",
    currentGrade: "L3",
    proposedGrade: "L4",
    justification:
      "Exceptional performance and leadership qualities demonstrated over the past year. Has mentored 3 junior inspectors.",
    proposedSalary: "₹8,50,000",
    effectiveDate: "2025-04-01",
    status: "draft",
    documents: ["Performance Review 2024", "Skill Assessment", "Peer Feedback"],
  },
  {
    id: 2,
    employeeName: "Maria Santos",
    currentPosition: "Project Coordinator",
    proposedPosition: "Senior Project Coordinator",
    currentGrade: "L2",
    proposedGrade: "L3",
    justification:
      "Consistently delivered projects on time and within budget. Excellent communication and coordination skills.",
    proposedSalary: "₹7,20,000",
    effectiveDate: "2025-03-01",
    status: "draft",
    documents: [
      "Project Success Reports",
      "Client Feedback",
      "Training Certificates",
    ],
  },
];

const transferRequests = [
  {
    id: 1,
    employeeName: "Tom Johnson",
    currentDepartment: "Operations",
    proposedDepartment: "Maintenance",
    currentLocation: "Equipment Yard",
    proposedLocation: "Central Maintenance Hub",
    reason:
      "Employee has expertise in advanced equipment maintenance and the maintenance department needs experienced personnel.",
    effectiveDate: "2025-02-15",
    status: "draft",
    approvalRequired: ["Department Head - Maintenance", "HR Director"],
  },
];

const expenseClaims = [
  {
    id: 1,
    employee: "Mike Chen",
    employeeId: "EMP001",
    claimType: "Travel",
    amount: 15420,
    description:
      "Site visit to Project Alpha - Transportation and accommodation",
    submittedDate: "2024-12-20",
    expenseDate: "2024-12-18",
    status: "pending",
    receipts: ["Travel Receipt.pdf", "Hotel Bill.pdf"],
    category: "Business Travel",
    project: "Project Alpha",
  },
  {
    id: 2,
    employee: "Amy Rodriguez",
    employeeId: "EMP004",
    claimType: "Training",
    amount: 25000,
    description: "Safety certification course and materials",
    submittedDate: "2024-12-22",
    expenseDate: "2024-12-15",
    status: "pending",
    receipts: ["Course Fee Receipt.pdf", "Material Cost.pdf"],
    category: "Professional Development",
    project: "Safety Initiative 2024",
  },
  {
    id: 3,
    employee: "Lisa Martinez",
    employeeId: "EMP002",
    claimType: "Equipment",
    amount: 8750,
    description: "Safety equipment and tools for site operations",
    submittedDate: "2024-12-21",
    expenseDate: "2024-12-19",
    status: "pending",
    receipts: ["Equipment Invoice.pdf"],
    category: "Safety Equipment",
    project: "Site B Operations",
  },
];

export default function ManagerSelfService() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const teamStats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter((m) => m.status === "active").length,
    avgPerformance:
      teamMembers.reduce((sum, m) => sum + m.performance, 0) /
      teamMembers.length,
    pendingLeaveRequests: leaveRequests.filter((r) => r.status === "pending")
      .length,
    pendingExpenses: expenseClaims.filter((e) => e.status === "pending").length,
  };

  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="flex items-center gap-4 animate-slideInLeft">
          <Button variant="outline" className="hover-lift" asChild>
            <Link to="/hrms">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to HRMS
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Manager Self-Service
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Crown}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Manage your team, approvals, and performance reviews
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={BarChart3}
                animation="bounce"
                className="mr-2"
              />
              Team Report
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
              <AnimatedIcon
                icon={UserPlus}
                animation="bounce"
                className="mr-2"
              />
              Add Team Member
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Manager Profile */}
        <Card className="hover-lift animate-fadeInUp relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 to-primary/5" />
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20 animate-pulse border-4 border-construction-500/20">
                <AvatarImage src={managerProfile.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-construction-500 to-primary text-white text-xl">
                  {managerProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{managerProfile.name}</h2>
                <p className="text-lg text-muted-foreground">
                  {managerProfile.position}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Building}
                      size="sm"
                      className="text-construction-500"
                    />
                    <span className="text-sm">{managerProfile.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Users}
                      size="sm"
                      className="text-primary"
                    />
                    <span className="text-sm">
                      {managerProfile.teamSize} team members
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Crown}
                      size="sm"
                      className="text-yellow-500"
                    />
                    <span className="text-sm">
                      {managerProfile.directReports} direct reports
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="h-auto p-1 bg-muted/50 lg:grid lg:grid-cols-6 w-full overflow-x-auto scrollbar-hide flex lg:flex-none gap-1 lg:gap-0">
            <TabsTrigger
              value="overview"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={BarChart3} size="sm" className="mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="approvals"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={ClipboardCheck} size="sm" className="mr-2" />
              Approve Leave/Attendance
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={TrendingUp} size="sm" className="mr-2" />
              Track Team Performance
            </TabsTrigger>
            <TabsTrigger
              value="roster"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Users} size="sm" className="mr-2" />
              View Team Roster
            </TabsTrigger>
            <TabsTrigger
              value="promotion"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Award} size="sm" className="mr-2" />
              Promotion/Transfer
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={DollarSign} size="sm" className="mr-2" />
              Approve Expenses
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Team Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="hover-lift animate-fadeInUp relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Team Members
                    </p>
                    <AnimatedIcon
                      icon={Users}
                      animation="float"
                      className="text-primary"
                    />
                  </div>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter value={teamStats.totalMembers} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {teamStats.activeMembers} active
                  </p>
                </CardContent>
              </Card>

              <Card
                className="hover-lift animate-fadeInUp relative overflow-hidden group"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Avg Performance
                    </p>
                    <AnimatedIcon
                      icon={Star}
                      animation="glow"
                      className="text-emerald-600"
                    />
                  </div>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter
                      value={teamStats.avgPerformance}
                      suffix="%"
                      decimals={1}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Team average</p>
                </CardContent>
              </Card>

              <Card
                className="hover-lift animate-fadeInUp relative overflow-hidden group"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-safety-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Pending Leave Approvals
                    </p>
                    <AnimatedIcon
                      icon={CalendarIcon}
                      animation="bounce"
                      className="text-safety-600"
                    />
                  </div>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter value={teamStats.pendingLeaveRequests} />
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <PulsingDot className="scale-75" />
                    Requires attention
                  </div>
                </CardContent>
              </Card>

              <Card
                className="hover-lift animate-fadeInUp relative overflow-hidden group"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Pending Expenses
                    </p>
                    <AnimatedIcon
                      icon={DollarSign}
                      animation="pulse"
                      className="text-construction-500"
                    />
                  </div>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter value={teamStats.pendingExpenses} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Claims to review
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={ClipboardCheck}
                      className="text-safety-600"
                    />
                    Recent Approvals Needed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaveRequests.slice(0, 3).map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">
                            {request.employee}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {request.leaveType} • {request.days} days
                          </p>
                        </div>
                        <Badge variant="outline">{request.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={TrendingUp}
                      className="text-emerald-600"
                    />
                    Team Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {performanceData.slice(0, 3).map((perf) => (
                      <div
                        key={perf.employee}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{perf.employee}</p>
                          <p className="text-xs text-muted-foreground">
                            Current: {perf.currentScore}% • Previous:{" "}
                            {perf.previousScore}%
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {perf.trend === "up" ? (
                            <ArrowUp className="h-4 w-4 text-emerald-600" />
                          ) : perf.trend === "down" ? (
                            <ArrowDown className="h-4 w-4 text-red-500" />
                          ) : (
                            <Minus className="h-4 w-4 text-gray-500" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              perf.trend === "up"
                                ? "text-emerald-600"
                                : perf.trend === "down"
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }`}
                          >
                            {Math.abs(perf.currentScore - perf.previousScore)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Approve Leave/Attendance Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <div className="grid gap-6">
              {/* Leave Requests */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={CalendarIcon}
                        className="text-primary"
                      />
                      <CardTitle>Leave Requests</CardTitle>
                    </div>
                    <Badge variant="destructive">
                      {
                        leaveRequests.filter((r) => r.status === "pending")
                          .length
                      }{" "}
                      pending
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaveRequests.map((request) => (
                      <Card key={request.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">
                                {request.employee}
                              </h4>
                              <Badge variant="outline">
                                {request.employeeId}
                              </Badge>
                              <Badge
                                variant={
                                  request.priority === "high"
                                    ? "destructive"
                                    : request.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {request.priority}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Leave Type
                                </Label>
                                <p>{request.leaveType}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Duration
                                </Label>
                                <p>
                                  {request.startDate} to {request.endDate} (
                                  {request.days} days)
                                </p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Reason
                                </Label>
                                <p>{request.reason}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Coverage
                                </Label>
                                <p>
                                  {request.coverageArranged === "Yes"
                                    ? `${request.coveringEmployee}`
                                    : "Not arranged"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" className="hover-lift">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover-lift"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Records */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Clock}
                      className="text-construction-500"
                    />
                    <CardTitle>Recent Attendance Records</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Overtime</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">
                            {record.employee}
                          </TableCell>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.checkIn}</TableCell>
                          <TableCell>{record.checkOut}</TableCell>
                          <TableCell>{record.hoursWorked}h</TableCell>
                          <TableCell>
                            {record.overtime > 0 ? (
                              <Badge variant="secondary">
                                {record.overtime}h
                              </Badge>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell>{record.location}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                record.status === "present"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {record.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Track Team Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6">
              {/* Performance Overview */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Team Average
                      </p>
                      <AnimatedIcon icon={Star} className="text-yellow-500" />
                    </div>
                    <div className="text-2xl font-bold">89.5%</div>
                    <div className="flex items-center gap-1 text-xs text-emerald-600">
                      <ArrowUp className="h-3 w-3" />
                      +2.3% from last month
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Top Performer
                      </p>
                      <AnimatedIcon
                        icon={Award}
                        className="text-construction-500"
                      />
                    </div>
                    <div className="text-lg font-bold">Amy Rodriguez</div>
                    <div className="text-sm text-muted-foreground">
                      95% score
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Goals on Track
                      </p>
                      <AnimatedIcon
                        icon={Target}
                        className="text-emerald-600"
                      />
                    </div>
                    <div className="text-2xl font-bold">12/15</div>
                    <div className="text-xs text-muted-foreground">
                      80% completion rate
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Individual Performance Cards */}
              <div className="grid gap-4 lg:grid-cols-2">
                {performanceData.map((perf) => (
                  <Card key={perf.employee} className="hover-lift">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {perf.employee}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              perf.trend === "up"
                                ? "default"
                                : perf.trend === "down"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {perf.trend === "up" ? (
                              <ArrowUp className="h-3 w-3 mr-1" />
                            ) : perf.trend === "down" ? (
                              <ArrowDown className="h-3 w-3 mr-1" />
                            ) : (
                              <Minus className="h-3 w-3 mr-1" />
                            )}
                            {perf.trend}
                          </Badge>
                          <span className="text-xl font-bold">
                            {perf.currentScore}%
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* KPIs */}
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(perf.kpis).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="capitalize">{key}</span>
                              <span className="font-medium">{value}%</span>
                            </div>
                            <Progress value={value} className="h-1" />
                          </div>
                        ))}
                      </div>

                      {/* Goals */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Current Goals
                        </Label>
                        {perf.goals.map((goal, index) => (
                          <div key={index} className="p-2 border rounded-lg">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{goal.title}</span>
                              <span className="text-muted-foreground">
                                {goal.target}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">
                                Progress
                              </span>
                              <span className="font-medium">
                                {goal.progress}%
                              </span>
                            </div>
                            <Progress value={goal.progress} className="h-1" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* View Team Roster Tab */}
          <TabsContent value="roster" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search team members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Team Member Cards */}
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredTeamMembers.map((member, index) => (
                <Card
                  key={member.id}
                  className="hover-lift animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-construction-500 text-white text-lg">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {member.name}
                            </h3>
                            <p className="text-muted-foreground">
                              {member.position}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge
                              variant={
                                member.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {member.status === "active" && (
                                <PulsingDot className="mr-1 scale-50" />
                              )}
                              {member.status.replace("_", " ")}
                            </Badge>
                            <span className="text-sm font-medium">
                              {member.performance}%
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate">{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate">{member.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                            <span>Joined {member.joinDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              Attendance:{" "}
                            </span>
                            <span className="font-medium">
                              {member.attendanceRate}%
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              Projects:{" "}
                            </span>
                            <span className="font-medium">
                              {member.projects}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Skills
                          </Label>
                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill, skillIndex) => (
                              <Badge
                                key={skillIndex}
                                variant="outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3 mr-1" />
                            Contact
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Promotion/Transfer Requests Tab */}
          <TabsContent value="promotion" className="space-y-6">
            <div className="grid gap-6">
              {/* New Request Form */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Plus}
                      className="text-construction-500"
                    />
                    Raise New Promotion/Transfer Request
                  </CardTitle>
                  <CardDescription>
                    Submit promotion or transfer requests for your team members
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Employee</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team member" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers.map((member) => (
                            <SelectItem key={member.id} value={member.name}>
                              {member.name} - {member.position}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Request Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="promotion">Promotion</SelectItem>
                          <SelectItem value="transfer">Transfer</SelectItem>
                          <SelectItem value="both">
                            Promotion & Transfer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Proposed Position</Label>
                      <Input placeholder="Enter new position title" />
                    </div>
                    <div className="space-y-2">
                      <Label>Effective Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Justification</Label>
                    <Textarea
                      placeholder="Provide detailed justification for this request..."
                      rows={3}
                    />
                  </div>
                  <Button className="hover-lift">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
                  </Button>
                </CardContent>
              </Card>

              {/* Promotion Requests */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Award} className="text-yellow-500" />
                    Promotion Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {promotionRequests.map((request) => (
                      <Card key={request.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">
                                {request.employeeName}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {request.currentPosition} →{" "}
                                {request.proposedPosition}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Grade: {request.currentGrade} →{" "}
                                {request.proposedGrade}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline">{request.status}</Badge>
                              <p className="text-sm text-muted-foreground mt-1">
                                Effective: {request.effectiveDate}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">
                              Justification
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {request.justification}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <Label className="text-xs text-muted-foreground">
                                Proposed Salary
                              </Label>
                              <p className="font-medium">
                                {request.proposedSalary}
                              </p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">
                                Supporting Documents
                              </Label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {request.documents.map((doc, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {doc}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
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
                              <Upload className="h-3 w-3 mr-1" />
                              Add Documents
                            </Button>
                            <Button size="sm" className="hover-lift">
                              <Send className="h-3 w-3 mr-1" />
                              Submit to HR
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Transfer Requests */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Building} className="text-primary" />
                    Transfer Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transferRequests.map((request) => (
                      <Card key={request.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">
                                {request.employeeName}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {request.currentDepartment} →{" "}
                                {request.proposedDepartment}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {request.currentLocation} →{" "}
                                {request.proposedLocation}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline">{request.status}</Badge>
                              <p className="text-sm text-muted-foreground mt-1">
                                Effective: {request.effectiveDate}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">
                              Reason for Transfer
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {request.reason}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">
                              Approval Required From
                            </Label>
                            <div className="flex flex-wrap gap-1">
                              {request.approvalRequired.map(
                                (approver, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {approver}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover-lift"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" className="hover-lift">
                              <Send className="h-3 w-3 mr-1" />
                              Submit for Approval
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Approve Expense Claims Tab */}
          <TabsContent value="expenses" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={DollarSign}
                      className="text-construction-500"
                    />
                    <CardTitle>Expense Claims for Approval</CardTitle>
                  </div>
                  <Badge variant="destructive">
                    {expenseClaims.filter((e) => e.status === "pending").length}{" "}
                    pending
                  </Badge>
                </div>
                <CardDescription>
                  Review and approve expense claims submitted by your team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseClaims.map((claim) => (
                    <Card key={claim.id} className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">
                                {claim.employee}
                              </h4>
                              <Badge variant="outline">
                                {claim.employeeId}
                              </Badge>
                              <Badge
                                variant={
                                  claim.status === "pending"
                                    ? "destructive"
                                    : "default"
                                }
                              >
                                {claim.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {claim.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-construction-500">
                              ₹{claim.amount.toLocaleString()}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {claim.claimType}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Category
                            </Label>
                            <p>{claim.category}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Project
                            </Label>
                            <p>{claim.project}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Expense Date
                            </Label>
                            <p>{claim.expenseDate}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Receipts & Documents
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {claim.receipts.map((receipt, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="hover-lift"
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                {receipt}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t">
                          <p className="text-sm text-muted-foreground">
                            Submitted on {claim.submittedDate}
                          </p>
                          <div className="flex gap-2">
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
                              <X className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              className="hover-lift bg-emerald-600 hover:bg-emerald-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expense Summary */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Total Pending
                    </p>
                    <AnimatedIcon icon={Clock} className="text-yellow-500" />
                  </div>
                  <div className="text-2xl font-bold">
                    ₹
                    {expenseClaims
                      .filter((e) => e.status === "pending")
                      .reduce((sum, e) => sum + e.amount, 0)
                      .toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {expenseClaims.filter((e) => e.status === "pending").length}{" "}
                    claims
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <AnimatedIcon
                      icon={TrendingUp}
                      className="text-construction-500"
                    />
                  </div>
                  <div className="text-2xl font-bold">₹1,24,750</div>
                  <p className="text-xs text-muted-foreground">
                    18 approved claims
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Average Claim
                    </p>
                    <AnimatedIcon
                      icon={BarChart3}
                      className="text-emerald-600"
                    />
                  </div>
                  <div className="text-2xl font-bold">₹16,390</div>
                  <p className="text-xs text-muted-foreground">Per employee</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
