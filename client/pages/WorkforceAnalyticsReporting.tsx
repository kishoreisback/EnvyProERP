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
  BarChart3,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Search,
  RefreshCw,
  Settings,
  ArrowLeft,
  Eye,
  FileText,
  PieChart,
  Target,
  Clock,
  MapPin,
  Building,
  User,
  UserCheck,
  UserX,
  GraduationCap,
  Award,
  DollarSign,
  Activity,
  Zap,
  Globe,
  Briefcase,
  Heart,
  AlertTriangle,
  CheckCircle,
  Minus,
  Plus,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Share,
  Copy,
  Mail,
  Printer,
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BackToHRMS } from "@/components/hrms";

// Dashboard KPIs Data
const dashboardKPIs = [
  {
    title: "Total Workforce",
    value: 1248,
    change: +32,
    changePercent: 2.6,
    trend: "up",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Active Employees",
    value: 1186,
    change: +18,
    changePercent: 1.5,
    trend: "up",
    icon: UserCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
  },
  {
    title: "Attrition Rate",
    value: 8.2,
    change: -1.3,
    changePercent: -1.3,
    trend: "down",
    icon: UserX,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    suffix: "%",
  },
  {
    title: "Avg. Tenure",
    value: 3.2,
    change: +0.4,
    changePercent: 14.3,
    trend: "up",
    icon: Clock,
    color: "text-construction-500",
    bgColor: "bg-construction-500/10",
    suffix: " years",
  },
];

// Headcount Analytics Data
const headcountByDepartment = [
  {
    department: "Operations",
    headcount: 420,
    percentage: 33.6,
    change: +15,
    openPositions: 8,
    budget: 450,
    utilizationRate: 93.3,
  },
  {
    department: "Engineering",
    headcount: 285,
    percentage: 22.8,
    change: +12,
    openPositions: 5,
    budget: 310,
    utilizationRate: 91.9,
  },
  {
    department: "Sales & Marketing",
    headcount: 156,
    percentage: 12.5,
    change: +8,
    openPositions: 12,
    budget: 180,
    utilizationRate: 86.7,
  },
  {
    department: "Administration",
    headcount: 143,
    percentage: 11.5,
    change: -2,
    openPositions: 3,
    budget: 150,
    utilizationRate: 95.3,
  },
  {
    department: "Finance & Accounting",
    headcount: 98,
    percentage: 7.9,
    change: +3,
    openPositions: 2,
    budget: 105,
    utilizationRate: 93.3,
  },
  {
    department: "Human Resources",
    headcount: 67,
    percentage: 5.4,
    change: +1,
    openPositions: 1,
    budget: 70,
    utilizationRate: 95.7,
  },
  {
    department: "IT & Digital",
    headcount: 79,
    percentage: 6.3,
    change: +5,
    openPositions: 6,
    budget: 90,
    utilizationRate: 87.8,
  },
];

const headcountByLocation = [
  {
    location: "Mumbai (HQ)",
    headcount: 385,
    percentage: 30.8,
    capacity: 450,
    growth: +25,
  },
  {
    location: "Delhi NCR",
    headcount: 245,
    percentage: 19.6,
    capacity: 280,
    growth: +18,
  },
  {
    location: "Bangalore",
    headcount: 198,
    percentage: 15.9,
    capacity: 220,
    growth: +15,
  },
  {
    location: "Chennai",
    headcount: 156,
    percentage: 12.5,
    capacity: 180,
    growth: +8,
  },
  {
    location: "Pune",
    headcount: 134,
    percentage: 10.7,
    capacity: 150,
    growth: +12,
  },
  {
    location: "Hyderabad",
    headcount: 89,
    percentage: 7.1,
    capacity: 120,
    growth: +6,
  },
  {
    location: "Remote",
    headcount: 41,
    percentage: 3.3,
    capacity: 100,
    growth: -3,
  },
];

// Attrition Analytics Data
const attritionData = [
  {
    month: "Jan 2024",
    voluntary: 12,
    involuntary: 3,
    total: 15,
    rate: 7.8,
    benchmark: 8.5,
  },
  {
    month: "Feb 2024",
    voluntary: 18,
    involuntary: 2,
    total: 20,
    rate: 9.2,
    benchmark: 8.5,
  },
  {
    month: "Mar 2024",
    voluntary: 14,
    involuntary: 4,
    total: 18,
    rate: 8.1,
    benchmark: 8.5,
  },
  {
    month: "Apr 2024",
    voluntary: 16,
    involuntary: 1,
    total: 17,
    rate: 7.9,
    benchmark: 8.5,
  },
  {
    month: "May 2024",
    voluntary: 22,
    involuntary: 3,
    total: 25,
    rate: 10.8,
    benchmark: 8.5,
  },
  {
    month: "Jun 2024",
    voluntary: 8,
    involuntary: 2,
    total: 10,
    rate: 4.2,
    benchmark: 8.5,
  },
];

const attritionByReason = [
  {
    reason: "Better Opportunity",
    count: 45,
    percentage: 38.5,
    trend: "stable",
  },
  {
    reason: "Career Growth",
    count: 28,
    percentage: 23.9,
    trend: "up",
  },
  {
    reason: "Work-Life Balance",
    count: 19,
    percentage: 16.2,
    trend: "down",
  },
  {
    reason: "Compensation",
    count: 15,
    percentage: 12.8,
    trend: "stable",
  },
  {
    reason: "Relocation",
    count: 7,
    percentage: 6.0,
    trend: "down",
  },
  {
    reason: "Performance Issues",
    count: 3,
    percentage: 2.6,
    trend: "stable",
  },
];

// Diversity Analytics Data
const diversityMetrics = [
  {
    category: "Gender Distribution",
    metrics: [
      { label: "Male", value: 742, percentage: 59.5, target: 60 },
      { label: "Female", value: 478, percentage: 38.3, target: 38 },
      { label: "Other", value: 28, percentage: 2.2, target: 2 },
    ],
  },
  {
    category: "Age Groups",
    metrics: [
      { label: "21-30 years", value: 523, percentage: 41.9, target: 40 },
      { label: "31-40 years", value: 456, percentage: 36.5, target: 35 },
      { label: "41-50 years", value: 198, percentage: 15.9, target: 18 },
      { label: "50+ years", value: 71, percentage: 5.7, target: 7 },
    ],
  },
  {
    category: "Educational Background",
    metrics: [
      { label: "Engineering", value: 612, percentage: 49.0, target: 50 },
      { label: "Management", value: 234, percentage: 18.8, target: 20 },
      { label: "Commerce", value: 187, percentage: 15.0, target: 15 },
      { label: "Arts & Humanities", value: 145, percentage: 11.6, target: 10 },
      { label: "Others", value: 70, percentage: 5.6, target: 5 },
    ],
  },
  {
    category: "Experience Levels",
    metrics: [
      { label: "0-2 years", value: 312, percentage: 25.0, target: 25 },
      { label: "3-5 years", value: 389, percentage: 31.2, target: 30 },
      { label: "6-10 years", value: 298, percentage: 23.9, target: 25 },
      { label: "10+ years", value: 249, percentage: 19.9, target: 20 },
    ],
  },
];

const diversityTrends = [
  {
    metric: "Female Leadership %",
    current: 34.2,
    target: 40,
    change: +2.8,
    status: "improving",
  },
  {
    metric: "Pay Equity Index",
    current: 0.94,
    target: 1.0,
    change: +0.02,
    status: "improving",
  },
  {
    metric: "Diversity Hiring %",
    current: 42.1,
    target: 45,
    change: +1.5,
    status: "improving",
  },
  {
    metric: "Inclusion Score",
    current: 8.3,
    target: 9.0,
    change: +0.4,
    status: "improving",
  },
];

// Custom Report Builder Data
const reportTemplates = [
  {
    id: 1,
    name: "Employee Demographics Report",
    description: "Comprehensive employee demographic analysis",
    category: "Demographics",
    fields: ["Name", "Department", "Age", "Gender", "Location", "Tenure"],
    lastModified: "2024-12-20",
    usage: 156,
  },
  {
    id: 2,
    name: "Attrition Analysis Report",
    description: "Detailed attrition trends and exit analysis",
    category: "Attrition",
    fields: ["Employee ID", "Exit Date", "Reason", "Department", "Tenure"],
    lastModified: "2024-12-18",
    usage: 89,
  },
  {
    id: 3,
    name: "Performance Summary Report",
    description: "Performance ratings and review summaries",
    category: "Performance",
    fields: ["Employee", "Rating", "Goals", "Manager", "Review Date"],
    lastModified: "2024-12-15",
    usage: 234,
  },
  {
    id: 4,
    name: "Compensation Analysis Report",
    description: "Salary analysis and compensation benchmarking",
    category: "Compensation",
    fields: ["Employee", "Grade", "Salary", "Benefits", "Total Package"],
    lastModified: "2024-12-12",
    usage: 67,
  },
];

const recentExports = [
  {
    id: 1,
    reportName: "Monthly Headcount Report",
    format: "Excel",
    exportedBy: "HR Manager",
    exportDate: "2024-12-23 14:30",
    status: "completed",
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    reportName: "Q4 Attrition Analysis",
    format: "PDF",
    exportedBy: "Analytics Team",
    exportDate: "2024-12-23 11:15",
    status: "completed",
    fileSize: "1.8 MB",
  },
  {
    id: 3,
    reportName: "Diversity Metrics Dashboard",
    format: "CSV",
    exportedBy: "CHRO",
    exportDate: "2024-12-23 09:45",
    status: "processing",
    fileSize: "Processing...",
  },
  {
    id: 4,
    reportName: "Custom Department Analysis",
    format: "Excel",
    exportedBy: "Department Head",
    exportDate: "2024-12-22 16:20",
    status: "completed",
    fileSize: "3.1 MB",
  },
];

export default function WorkforceAnalyticsReporting() {
  const [activeTab, setActiveTab] = useState("dashboards");
  const [selectedPeriod, setSelectedPeriod] = useState("last_12_months");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const totalWorkforce = headcountByDepartment.reduce(
    (sum, dept) => sum + dept.headcount,
    0,
  );
  const avgAttritionRate =
    attritionData.reduce((sum, month) => sum + month.rate, 0) /
    attritionData.length;

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
                Workforce Analytics & Reporting
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={BarChart3}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Comprehensive workforce analytics, insights, and custom
                reporting tools
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={RefreshCw}
                animation="bounce"
                className="mr-2"
              />
              Refresh Data
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
              <AnimatedIcon
                icon={Download}
                animation="bounce"
                className="mr-2"
              />
              Export Report
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Period and Filters */}
        <Card className="animate-fadeInUp">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Period:</Label>
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                    <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                    <SelectItem value="last_6_months">Last 6 Months</SelectItem>
                    <SelectItem value="last_12_months">
                      Last 12 Months
                    </SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Department:</Label>
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {headcountByDepartment.map((dept) => (
                      <SelectItem
                        key={dept.department}
                        value={dept.department.toLowerCase()}
                      >
                        {dept.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Customize
                </Button>
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
              value="dashboards"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={BarChart3} size="sm" className="mr-2" />
              HR Dashboards
            </TabsTrigger>
            <TabsTrigger
              value="headcount"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Users} size="sm" className="mr-2" />
              Headcount Analytics
            </TabsTrigger>
            <TabsTrigger
              value="attrition"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={TrendingDown} size="sm" className="mr-2" />
              Attrition Reports
            </TabsTrigger>
            <TabsTrigger
              value="diversity"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Globe} size="sm" className="mr-2" />
              Diversity Reports
            </TabsTrigger>
            <TabsTrigger
              value="builder"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Settings} size="sm" className="mr-2" />
              Report Builder
            </TabsTrigger>
            <TabsTrigger
              value="exports"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Data Exports
            </TabsTrigger>
          </TabsList>

          {/* Prebuilt HR Dashboards Tab */}
          <TabsContent value="dashboards" className="space-y-6">
            {/* KPI Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              {dashboardKPIs.map((kpi, index) => (
                <Card
                  key={kpi.title}
                  className="hover-lift animate-fadeInUp relative overflow-hidden group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 ${kpi.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        {kpi.title}
                      </p>
                      <AnimatedIcon
                        icon={kpi.icon}
                        animation="pulse"
                        className={kpi.color}
                      />
                    </div>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter
                        value={kpi.value}
                        suffix={kpi.suffix || ""}
                        decimals={kpi.suffix === "%" ? 1 : 0}
                      />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs mt-1 ${
                        kpi.trend === "up"
                          ? "text-emerald-600"
                          : kpi.trend === "down"
                            ? "text-red-500"
                            : "text-gray-500"
                      }`}
                    >
                      {kpi.trend === "up" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : kpi.trend === "down" ? (
                        <ArrowDown className="h-3 w-3" />
                      ) : (
                        <Minus className="h-3 w-3" />
                      )}
                      {kpi.change > 0 ? "+" : ""}
                      {kpi.change} ({kpi.changePercent > 0 ? "+" : ""}
                      {kpi.changePercent}%) vs last month
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Insights */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={TrendingUp}
                      className="text-emerald-600"
                    />
                    Workforce Growth Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">This Quarter</p>
                        <p className="text-sm text-muted-foreground">
                          Net growth: +68 employees
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">
                          +5.8%
                        </div>
                        <Badge variant="default">Excellent</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Hiring Velocity</p>
                        <p className="text-sm text-muted-foreground">
                          Average time to hire: 18 days
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          18d
                        </div>
                        <Badge variant="secondary">Improved</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Retention Rate</p>
                        <p className="text-sm text-muted-foreground">
                          12-month rolling average
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-construction-500">
                          91.8%
                        </div>
                        <Badge variant="default">Strong</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={AlertTriangle}
                      className="text-yellow-500"
                    />
                    Workforce Alerts & Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800">
                            High Attrition in Sales
                          </p>
                          <p className="text-sm text-yellow-700">
                            Sales department shows 15.2% attrition rate this
                            quarter
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Activity className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800">
                            Diverse Hiring Progress
                          </p>
                          <p className="text-sm text-blue-700">
                            42% diverse hires this month, exceeding target
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-emerald-800">
                            Performance Improvement
                          </p>
                          <p className="text-sm text-emerald-700">
                            Average performance rating increased by 0.3 points
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department Overview */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={Building} className="text-primary" />
                  Department Performance Overview
                </CardTitle>
                <CardDescription>
                  Key metrics across all departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {headcountByDepartment.slice(0, 6).map((dept, index) => (
                    <Card
                      key={dept.department}
                      className="p-4 animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">
                            {dept.department}
                          </h4>
                          <Badge
                            variant={
                              dept.utilizationRate > 95
                                ? "default"
                                : dept.utilizationRate > 85
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {dept.utilizationRate}%
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold">
                          {dept.headcount}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Capacity Utilization</span>
                            <span>{dept.utilizationRate}%</span>
                          </div>
                          <Progress
                            value={dept.utilizationRate}
                            className="h-1"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {dept.change > 0 ? "+" : ""}
                            {dept.change} this month
                          </span>
                          <span>{dept.openPositions} open positions</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Headcount Analytics Tab */}
          <TabsContent value="headcount" className="space-y-6">
            <div className="grid gap-6">
              {/* Department Distribution */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={PieChart} className="text-primary" />
                    Headcount by Department
                  </CardTitle>
                  <CardDescription>
                    Department-wise workforce distribution and utilization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Headcount</TableHead>
                        <TableHead>% of Total</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Utilization</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Open Positions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {headcountByDepartment.map((dept) => (
                        <TableRow key={dept.department}>
                          <TableCell className="font-medium">
                            {dept.department}
                          </TableCell>
                          <TableCell>{dept.headcount}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {dept.percentage.toFixed(1)}%
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${dept.percentage}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{dept.budget}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span
                                className={
                                  dept.utilizationRate > 95
                                    ? "text-green-600"
                                    : dept.utilizationRate > 85
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }
                              >
                                {dept.utilizationRate.toFixed(1)}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              className={`flex items-center gap-1 ${
                                dept.change > 0
                                  ? "text-emerald-600"
                                  : dept.change < 0
                                    ? "text-red-500"
                                    : "text-gray-500"
                              }`}
                            >
                              {dept.change > 0 ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : dept.change < 0 ? (
                                <ArrowDown className="h-3 w-3" />
                              ) : (
                                <Minus className="h-3 w-3" />
                              )}
                              {Math.abs(dept.change)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                dept.openPositions > 5
                                  ? "destructive"
                                  : dept.openPositions > 2
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {dept.openPositions}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Location Distribution */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={MapPin}
                      className="text-construction-500"
                    />
                    Headcount by Location
                  </CardTitle>
                  <CardDescription>
                    Geographic distribution of workforce
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {headcountByLocation.map((location, index) => (
                      <Card
                        key={location.location}
                        className="p-4 animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{location.location}</h4>
                            <Badge variant="outline">
                              {location.percentage.toFixed(1)}%
                            </Badge>
                          </div>
                          <div className="text-2xl font-bold">
                            {location.headcount}
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Capacity</span>
                              <span>
                                {location.headcount} / {location.capacity}
                              </span>
                            </div>
                            <Progress
                              value={
                                (location.headcount / location.capacity) * 100
                              }
                              className="h-2"
                            />
                          </div>
                          <div
                            className={`flex items-center gap-1 text-sm ${
                              location.growth > 0
                                ? "text-emerald-600"
                                : location.growth < 0
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }`}
                          >
                            {location.growth > 0 ? (
                              <ArrowUp className="h-3 w-3" />
                            ) : location.growth < 0 ? (
                              <ArrowDown className="h-3 w-3" />
                            ) : (
                              <Minus className="h-3 w-3" />
                            )}
                            {location.growth > 0 ? "+" : ""}
                            {location.growth} this quarter
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Attrition Reports Tab */}
          <TabsContent value="attrition" className="space-y-6">
            <div className="grid gap-6">
              {/* Attrition Overview */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Overall Attrition Rate
                      </p>
                      <AnimatedIcon
                        icon={TrendingDown}
                        className="text-red-500"
                      />
                    </div>
                    <div className="text-2xl font-bold">
                      {avgAttritionRate.toFixed(1)}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      6-month average
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Voluntary Exits
                      </p>
                      <AnimatedIcon icon={UserX} className="text-yellow-500" />
                    </div>
                    <div className="text-2xl font-bold">85.2%</div>
                    <p className="text-xs text-muted-foreground">
                      Of total attrition
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Critical Role Exits
                      </p>
                      <AnimatedIcon
                        icon={AlertTriangle}
                        className="text-red-500"
                      />
                    </div>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      This quarter
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Attrition Trends */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={BarChart3} className="text-primary" />
                    Monthly Attrition Trends
                  </CardTitle>
                  <CardDescription>
                    Attrition rate trends and industry benchmark comparison
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Voluntary</TableHead>
                        <TableHead>Involuntary</TableHead>
                        <TableHead>Total Exits</TableHead>
                        <TableHead>Attrition Rate</TableHead>
                        <TableHead>Benchmark</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attritionData.map((month) => (
                        <TableRow key={month.month}>
                          <TableCell className="font-medium">
                            {month.month}
                          </TableCell>
                          <TableCell>{month.voluntary}</TableCell>
                          <TableCell>{month.involuntary}</TableCell>
                          <TableCell>{month.total}</TableCell>
                          <TableCell>
                            <span
                              className={
                                month.rate > month.benchmark
                                  ? "text-red-500"
                                  : "text-emerald-600"
                              }
                            >
                              {month.rate.toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell>{month.benchmark.toFixed(1)}%</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                month.rate <= month.benchmark
                                  ? "default"
                                  : month.rate <= month.benchmark + 1
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {month.rate <= month.benchmark
                                ? "Good"
                                : month.rate <= month.benchmark + 1
                                  ? "Watch"
                                  : "Alert"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Attrition by Reason */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={PieChart}
                      className="text-construction-500"
                    />
                    Attrition Reasons Analysis
                  </CardTitle>
                  <CardDescription>
                    Root cause analysis of employee exits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {attritionByReason.map((reason, index) => (
                      <div
                        key={reason.reason}
                        className="flex items-center justify-between p-3 border rounded-lg animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{reason.reason}</p>
                            <Badge
                              variant={
                                reason.trend === "up"
                                  ? "destructive"
                                  : reason.trend === "down"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {reason.trend === "up" ? (
                                <ArrowUp className="h-3 w-3 mr-1" />
                              ) : reason.trend === "down" ? (
                                <ArrowDown className="h-3 w-3 mr-1" />
                              ) : (
                                <Minus className="h-3 w-3 mr-1" />
                              )}
                              {reason.trend}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {reason.count} employees (
                            {reason.percentage.toFixed(1)}%)
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            {reason.count}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Diversity Reports Tab */}
          <TabsContent value="diversity" className="space-y-6">
            <div className="grid gap-6">
              {/* Diversity Metrics Overview */}
              <div className="grid gap-4 md:grid-cols-4">
                {diversityTrends.map((trend, index) => (
                  <Card
                    key={trend.metric}
                    className="hover-lift animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {trend.metric}
                        </p>
                        <div className="text-2xl font-bold">
                          {trend.metric.includes("%")
                            ? `${trend.current.toFixed(1)}%`
                            : trend.current.toFixed(
                                trend.metric.includes("Index") ? 2 : 1,
                              )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-muted-foreground">
                            Target: {trend.target}
                            {trend.metric.includes("%") ? "%" : ""}
                          </div>
                          <Badge variant="default" className="text-xs">
                            {trend.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-emerald-600">
                          +
                          {trend.change.toFixed(
                            trend.metric.includes("Index") ? 2 : 1,
                          )}{" "}
                          vs last quarter
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detailed Diversity Breakdown */}
              <div className="grid gap-6 lg:grid-cols-2">
                {diversityMetrics.map((category, index) => (
                  <Card
                    key={category.category}
                    className="hover-lift animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={
                            category.category === "Gender Distribution"
                              ? Users
                              : category.category === "Age Groups"
                                ? Clock
                                : category.category === "Educational Background"
                                  ? GraduationCap
                                  : Briefcase
                          }
                          className="text-primary"
                        />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.metrics.map((metric, metricIndex) => (
                          <div
                            key={metric.label}
                            className="space-y-2 animate-fadeInUp"
                            style={{
                              animationDelay: `${index * 0.2 + metricIndex * 0.1}s`,
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {metric.label}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm">
                                  {metric.value} ({metric.percentage.toFixed(1)}
                                  %)
                                </span>
                                <Badge
                                  variant={
                                    metric.percentage >= metric.target
                                      ? "default"
                                      : metric.percentage >= metric.target - 2
                                        ? "secondary"
                                        : "destructive"
                                  }
                                  className="text-xs"
                                >
                                  Target: {metric.target}%
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Progress
                                value={metric.percentage}
                                className="flex-1 h-2"
                              />
                              <Progress
                                value={metric.target}
                                className="w-8 h-2 opacity-30"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Diversity Initiatives Progress */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Target}
                      className="text-construction-500"
                    />
                    Diversity & Inclusion Initiatives
                  </CardTitle>
                  <CardDescription>
                    Progress on key D&I initiatives and programs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          <h4 className="font-medium">Inclusive Hiring</h4>
                        </div>
                        <div className="text-2xl font-bold">42.1%</div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>84.2%</span>
                          </div>
                          <Progress value={84.2} className="h-2" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Target: 50% diverse hires by Q1 2025
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <h4 className="font-medium">
                            Leadership Development
                          </h4>
                        </div>
                        <div className="text-2xl font-bold">28</div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Participants</span>
                            <span>70%</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Target: 40 participants in leadership program
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-blue-500" />
                          <h4 className="font-medium">Bias Training</h4>
                        </div>
                        <div className="text-2xl font-bold">95.6%</div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Completion</span>
                            <span>95.6%</span>
                          </div>
                          <Progress value={95.6} className="h-2" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          1,192 employees completed training
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Custom Report Builder Tab */}
          <TabsContent value="builder" className="space-y-6">
            <div className="grid gap-6">
              {/* Quick Report Builder */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Plus}
                      className="text-construction-500"
                    />
                    Create Custom Report
                  </CardTitle>
                  <CardDescription>
                    Build custom reports with drag-and-drop interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Report Name</Label>
                      <Input placeholder="Enter report name..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Report Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="demographics">
                            Demographics
                          </SelectItem>
                          <SelectItem value="performance">
                            Performance
                          </SelectItem>
                          <SelectItem value="attrition">Attrition</SelectItem>
                          <SelectItem value="compensation">
                            Compensation
                          </SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Data Fields</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "Employee ID",
                        "Name",
                        "Department",
                        "Position",
                        "Hire Date",
                        "Age",
                        "Gender",
                        "Location",
                        "Salary",
                        "Performance Rating",
                        "Manager",
                        "Team",
                      ].map((field) => (
                        <div
                          key={field}
                          className="p-2 border rounded-lg text-sm cursor-pointer hover:bg-muted transition-colors"
                        >
                          {field}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last_30_days">
                            Last 30 Days
                          </SelectItem>
                          <SelectItem value="last_quarter">
                            Last Quarter
                          </SelectItem>
                          <SelectItem value="last_year">Last Year</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Output Format</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="hover-lift">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Report
                    </Button>
                    <Button variant="outline" className="hover-lift">
                      <Save className="h-4 w-4 mr-2" />
                      Save Template
                    </Button>
                    <Button variant="outline" className="hover-lift">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Saved Report Templates */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon icon={FileText} className="text-primary" />
                      <CardTitle>Saved Report Templates</CardTitle>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search templates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Pre-built and custom report templates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {reportTemplates.map((template, index) => (
                      <Card
                        key={template.id}
                        className="p-4 animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{template.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {template.description}
                              </p>
                            </div>
                            <Badge variant="outline">{template.category}</Badge>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                              Fields ({template.fields.length})
                            </Label>
                            <div className="flex flex-wrap gap-1">
                              {template.fields
                                .slice(0, 3)
                                .map((field, fieldIndex) => (
                                  <Badge
                                    key={fieldIndex}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {field}
                                  </Badge>
                                ))}
                              {template.fields.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{template.fields.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Updated: {template.lastModified}</span>
                            <span>{template.usage} uses</span>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Preview
                            </Button>
                            <Button size="sm" className="flex-1">
                              <Download className="h-3 w-3 mr-1" />
                              Generate
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

          {/* Real-Time Data Exports Tab */}
          <TabsContent value="exports" className="space-y-6">
            <div className="grid gap-6">
              {/* Quick Export Options */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Zap} className="text-yellow-500" />
                    Quick Data Exports
                  </CardTitle>
                  <CardDescription>
                    Real-time data exports for immediate use
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[
                      {
                        title: "All Employees",
                        description: "Complete employee directory",
                        icon: Users,
                        count: "1,248 records",
                      },
                      {
                        title: "Active Projects",
                        description: "Current project assignments",
                        icon: Briefcase,
                        count: "89 projects",
                      },
                      {
                        title: "Payroll Data",
                        description: "Current month payroll",
                        icon: DollarSign,
                        count: "1,186 employees",
                      },
                      {
                        title: "Performance Data",
                        description: "Latest performance ratings",
                        icon: Target,
                        count: "1,098 reviews",
                      },
                    ].map((export_, index) => (
                      <Card
                        key={export_.title}
                        className="p-4 animate-scaleIn group cursor-pointer"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <AnimatedIcon
                              icon={export_.icon}
                              className="text-primary"
                            />
                            <h4 className="font-medium text-sm">
                              {export_.title}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {export_.description}
                          </p>
                          <p className="text-xs font-medium">{export_.count}</p>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              CSV
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              Excel
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Exports */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Clock}
                        className="text-construction-500"
                      />
                      <CardTitle>Recent Exports</CardTitle>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                  <CardDescription>
                    Track and download recent data exports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead>Exported By</TableHead>
                        <TableHead>Export Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>File Size</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentExports.map((export_) => (
                        <TableRow key={export_.id}>
                          <TableCell className="font-medium">
                            {export_.reportName}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{export_.format}</Badge>
                          </TableCell>
                          <TableCell>{export_.exportedBy}</TableCell>
                          <TableCell className="font-mono text-xs">
                            {export_.exportDate}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                export_.status === "completed"
                                  ? "default"
                                  : export_.status === "processing"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {export_.status === "completed" && (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              )}
                              {export_.status === "processing" && (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {export_.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{export_.fileSize}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {export_.status === "completed" && (
                                <>
                                  <Button size="sm" variant="ghost">
                                    <Download className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Share className="h-3 w-3" />
                                  </Button>
                                </>
                              )}
                              <Button size="sm" variant="ghost">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Export Settings */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Settings} className="text-primary" />
                    Export Settings & Automation
                  </CardTitle>
                  <CardDescription>
                    Configure automated exports and data preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-medium">Automated Exports</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium text-sm">
                              Monthly Headcount Report
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Excel format, sent to HR team
                            </p>
                          </div>
                          <Badge variant="default">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium text-sm">
                              Weekly Attrition Summary
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PDF format, sent to leadership
                            </p>
                          </div>
                          <Badge variant="secondary">Paused</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Export Preferences</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Default Format</Label>
                          <Select defaultValue="excel">
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="pdf">PDF</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Data Privacy</Label>
                          <Select defaultValue="filtered">
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Data</SelectItem>
                              <SelectItem value="filtered">Filtered</SelectItem>
                              <SelectItem value="anonymized">
                                Anonymized
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Email Notifications</Label>
                          <Badge variant="default">Enabled</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
