import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertTriangle,
  HardHat,
  Truck,
  MapPin,
  Clock,
  Zap,
  Star,
  Award,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Package,
  UserCheck,
  ShieldCheck,
  FileText,
  CheckCircle,
  XCircle,
  Target,
  Activity,
  Briefcase,
  Home,
  ShoppingCart,
  Calculator,
  BookOpen,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Plus,
  Minus,
  Equal,
  PercentCircle,
  IndianRupee,
  Wallet,
  CreditCard,
  Receipt,
  Key,
  Lock,
  Bell,
  Settings,
  ExternalLink,
  Download,
  Filter,
  Search,
  RefreshCw,
  ChevronRight,
  Crown,
  Shield,
  Gavel,
  Globe,
  Smartphone,
  Database,
  UserPlus,
} from "lucide-react";
// Removed Recharts to avoid React 18 defaultProps warnings
// Using CSS-based charts for better performance and compatibility

// Get current user from localStorage (in real app, this would come from auth context)
const getCurrentUser = () => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  }
  return {
    id: "USR001",
    role: "super_admin",
    name: "System Administrator",
    department: "IT",
    permissions: ["all"],
  };
};

const currentUser = getCurrentUser();

// Comprehensive business data from all modules
const businessMetrics = {
  // Overall Business Metrics
  totalRevenue: 18750000000, // ₹187.5Cr
  netProfit: 3937500000, // ₹39.375Cr
  profitMargin: 21.0,
  growthRate: 18.5,

  // Project Metrics
  totalProjects: 24,
  activeProjects: 12,
  completedProjects: 8,
  onHoldProjects: 3,
  delayedProjects: 1,
  projectCompletionRate: 95.2,
  averageProjectMargin: 23.5,

  // Sales & CRM Metrics
  totalCustomers: 2847,
  activeLeads: 1256,
  conversionRate: 12.8,
  averageDealValue: 2500000,
  customerSatisfaction: 4.7,
  customerRetention: 89.3,

  // HR Metrics
  totalEmployees: 156,
  presentToday: 142,
  attendanceRate: 91.0,
  employeeTurnover: 8.5,
  openPositions: 12,
  trainingCompletion: 78.4,

  // Finance Metrics
  totalAssets: 28575000000, // ₹285.75Cr
  totalLiabilities: 7955000000, // ₹79.55Cr
  cashFlow: 1575000000, // ₹15.75Cr
  accountsReceivable: 3525000000, // ₹35.25Cr
  accountsPayable: 1850000000, // ₹18.5Cr

  // Inventory Metrics
  totalItems: 1247,
  lowStockItems: 23,
  stockValue: 4250000000, // ₹42.5Cr
  monthlyConsumption: 850000000, // ₹8.5Cr

  // Safety Metrics
  safetyScore: 96.8,
  incidentsThisMonth: 2,
  trainingCompliance: 94.2,
  auditScore: 98.5,
};

// Role-based dashboard configurations
const roleDashboards = {
  super_admin: {
    title: "Executive Dashboard",
    description: "Complete business overview and system management",
    sections: [
      "executive",
      "projects",
      "sales",
      "finance",
      "hr",
      "operations",
      "safety",
      "system",
    ],
    primaryKPIs: [
      "totalRevenue",
      "netProfit",
      "growthRate",
      "totalProjects",
      "totalCustomers",
    ],
  },
  admin: {
    title: "Administrative Dashboard",
    description: "Operations management and system administration",
    sections: ["executive", "projects", "hr", "operations", "system"],
    primaryKPIs: [
      "activeProjects",
      "totalEmployees",
      "attendanceRate",
      "safetyScore",
    ],
  },
  project_manager: {
    title: "Project Management Dashboard",
    description: "Project performance and resource management",
    sections: ["projects", "operations", "finance", "hr", "safety"],
    primaryKPIs: [
      "activeProjects",
      "projectCompletionRate",
      "averageProjectMargin",
      "totalEmployees",
    ],
  },
  sales_manager: {
    title: "Sales & Marketing Dashboard",
    description: "Sales performance and customer relationship insights",
    sections: ["sales", "finance", "hr"],
    primaryKPIs: [
      "totalCustomers",
      "conversionRate",
      "averageDealValue",
      "customerSatisfaction",
    ],
  },
  finance_manager: {
    title: "Financial Management Dashboard",
    description: "Financial performance and accounting insights",
    sections: ["finance", "projects", "sales"],
    primaryKPIs: ["totalRevenue", "netProfit", "cashFlow", "totalAssets"],
  },
  hr_manager: {
    title: "Human Resources Dashboard",
    description: "Employee management and organizational insights",
    sections: ["hr", "projects", "safety"],
    primaryKPIs: [
      "totalEmployees",
      "attendanceRate",
      "employeeTurnover",
      "trainingCompletion",
    ],
  },
  site_supervisor: {
    title: "Site Operations Dashboard",
    description: "On-site operations and safety management",
    sections: ["projects", "operations", "safety", "hr"],
    primaryKPIs: [
      "activeProjects",
      "safetyScore",
      "attendanceRate",
      "incidentsThisMonth",
    ],
  },
  sales_executive: {
    title: "Sales Performance Dashboard",
    description: "Customer management and sales tracking",
    sections: ["sales", "finance"],
    primaryKPIs: [
      "activeLeads",
      "conversionRate",
      "customerSatisfaction",
      "averageDealValue",
    ],
  },
};

// Enhanced charts data
const projectPerformanceData = [
  {
    month: "Jan",
    completed: 3,
    ongoing: 8,
    planned: 2,
    revenue: 2500,
    budget: 2200,
  },
  {
    month: "Feb",
    completed: 2,
    ongoing: 9,
    planned: 3,
    revenue: 2800,
    budget: 2600,
  },
  {
    month: "Mar",
    completed: 4,
    ongoing: 7,
    planned: 2,
    revenue: 3200,
    budget: 3000,
  },
  {
    month: "Apr",
    completed: 3,
    ongoing: 8,
    planned: 4,
    revenue: 2900,
    budget: 2700,
  },
  {
    month: "May",
    completed: 5,
    ongoing: 6,
    planned: 3,
    revenue: 3500,
    budget: 3200,
  },
];

const revenueGrowthData = [
  { month: "Jan", revenue: 12500, expenses: 8500, profit: 4000, margin: 32 },
  { month: "Feb", revenue: 14200, expenses: 9200, profit: 5000, margin: 35 },
  { month: "Mar", revenue: 16800, expenses: 10800, profit: 6000, margin: 36 },
  { month: "Apr", revenue: 15200, expenses: 9800, profit: 5400, margin: 36 },
  { month: "May", revenue: 18500, expenses: 11500, profit: 7000, margin: 38 },
];

const salesFunnelData = [
  { name: "Leads", value: 1256, color: "#3b82f6" },
  { name: "Qualified", value: 485, color: "#10b981" },
  { name: "Proposals", value: 234, color: "#f59e0b" },
  { name: "Negotiations", value: 128, color: "#ef4444" },
  { name: "Closed Won", value: 89, color: "#8b5cf6" },
];

const departmentData = [
  { name: "Construction", employees: 45, projects: 8, efficiency: 94 },
  { name: "Sales", employees: 25, deals: 156, conversion: 12.8 },
  { name: "Finance", employees: 8, accuracy: 99.2, compliance: 100 },
  { name: "HR", employees: 6, satisfaction: 87, retention: 89 },
  { name: "Admin", employees: 12, support: 96, response: 2.4 },
];

const cashFlowData = [
  { month: "Jan", inflow: 15000, outflow: 12000, net: 3000 },
  { month: "Feb", inflow: 18000, outflow: 14000, net: 4000 },
  { month: "Mar", inflow: 22000, outflow: 16000, net: 6000 },
  { month: "Apr", inflow: 19000, outflow: 15000, net: 4000 },
  { month: "May", inflow: 25000, outflow: 18000, net: 7000 },
];

const riskMetrics = [
  { category: "Financial", score: 85, status: "Good", trend: "up" },
  { category: "Operational", score: 78, status: "Moderate", trend: "stable" },
  { category: "Safety", score: 96, status: "Excellent", trend: "up" },
  { category: "Market", score: 72, status: "Moderate", trend: "down" },
  { category: "Regulatory", score: 94, status: "Good", trend: "up" },
];

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const [selectedDashboard, setSelectedDashboard] = useState(currentUser.role);
  const [refreshing, setRefreshing] = useState(false);

  const dashboardConfig =
    roleDashboards[selectedDashboard as keyof typeof roleDashboards];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Excellent: "text-green-600",
      Good: "text-blue-600",
      Moderate: "text-yellow-600",
      Poor: "text-red-600",
    };
    return colors[status as keyof typeof colors] || "text-gray-600";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Enhanced Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold gradient-text">
              {dashboardConfig.title}
            </h1>
            <GlowingOrb className="animate-pulse" />
          </div>
          <p className="text-muted-foreground">{dashboardConfig.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select
            value={selectedTimeframe}
            onValueChange={setSelectedTimeframe}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={selectedDashboard}
            onValueChange={setSelectedDashboard}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(roleDashboards).map(([role, config]) => (
                <SelectItem key={role} value={role}>
                  {config.title.replace(" Dashboard", "")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Executive Summary - Always visible for leadership roles */}
      {dashboardConfig.sections.includes("executive") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-600" />
            <h2 className="text-xl font-semibold">Executive Summary</h2>
          </div>

          {/* Key Business Metrics */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-700">
                      ₹187.5Cr
                    </p>
                    <p className="text-sm text-green-600">Total Revenue</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">+18.5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-700">₹39.4Cr</p>
                    <p className="text-sm text-blue-600">Net Profit</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-blue-500" />
                      <span className="text-xs text-blue-600">+21.0%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold text-purple-700">24</p>
                    <p className="text-sm text-purple-600">Total Projects</p>
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle className="h-3 w-3 text-purple-500" />
                      <span className="text-xs text-purple-600">
                        95.2% Success
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold text-orange-700">2,847</p>
                    <p className="text-sm text-orange-600">Total Customers</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-orange-500" />
                      <span className="text-xs text-orange-600">
                        4.7/5 Rating
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-8 w-8 text-pink-600" />
                  <div>
                    <p className="text-2xl font-bold text-pink-700">156</p>
                    <p className="text-sm text-pink-600">Team Members</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Activity className="h-3 w-3 text-pink-500" />
                      <span className="text-xs text-pink-600">91% Present</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-8 w-8 text-teal-600" />
                  <div>
                    <p className="text-2xl font-bold text-teal-700">96.8%</p>
                    <p className="text-sm text-teal-600">Safety Score</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ShieldCheck className="h-3 w-3 text-teal-500" />
                      <span className="text-xs text-teal-600">Excellent</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Business Risk Assessment
              </CardTitle>
              <CardDescription>
                Real-time risk monitoring across key business areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
                {riskMetrics.map((risk) => (
                  <div
                    key={risk.category}
                    className="text-center p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {getTrendIcon(risk.trend)}
                      <span className="font-semibold">{risk.category}</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">{risk.score}%</div>
                    <Badge
                      className={`${getStatusColor(risk.status)}`}
                      variant="outline"
                    >
                      {risk.status}
                    </Badge>
                    <Progress value={risk.score} className="mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Projects Section */}
      {dashboardConfig.sections.includes("projects") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Project Management</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/projects">
                <ExternalLink className="mr-2 h-4 w-4" />
                View All
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.activeProjects}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Active Projects
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.projectCompletionRate}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Completion Rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <PercentCircle className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.averageProjectMargin}%
                    </p>
                    <p className="text-sm text-muted-foreground">Avg Margin</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.delayedProjects}
                    </p>
                    <p className="text-sm text-muted-foreground">Delayed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AnimatedIcon icon={BarChart3} animation="bounce" />
                Project Performance vs Budget
              </CardTitle>
              <CardDescription>
                Monthly project completion and revenue tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectPerformanceData.map((data, index) => (
                  <div key={data.month} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{data.month}</span>
                      <div className="text-sm text-muted-foreground">
                        Total: {data.completed + data.ongoing + data.planned}{" "}
                        projects
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">Completed</span>
                          <span className="font-medium">{data.completed}</span>
                        </div>
                        <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 rounded-full transition-all duration-500"
                            style={{
                              width: `${(data.completed / Math.max(data.completed, data.ongoing, data.planned)) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-600">Ongoing</span>
                          <span className="font-medium">{data.ongoing}</span>
                        </div>
                        <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-500"
                            style={{
                              width: `${(data.ongoing / Math.max(data.completed, data.ongoing, data.planned)) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-red-600">Planned</span>
                          <span className="font-medium">{data.planned}</span>
                        </div>
                        <div className="h-3 bg-red-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600 rounded-full transition-all duration-500"
                            style={{
                              width: `${(data.planned / Math.max(data.completed, data.ongoing, data.planned)) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                      <span>
                        Revenue: ₹{(data.revenue / 1000000).toFixed(1)}M
                      </span>
                      <span>
                        Budget: ₹{(data.budget / 1000000).toFixed(1)}M
                      </span>
                      <span
                        className={
                          data.revenue >= data.budget
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {data.revenue >= data.budget ? "On Track" : "Behind"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sales & CRM Section */}
      {dashboardConfig.sections.includes("sales") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold">
              Sales & Customer Management
            </h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/crm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View CRM
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.activeLeads}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Active Leads
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.conversionRate}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Conversion Rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {formatCurrency(businessMetrics.averageDealValue)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Avg Deal Value
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.customerSatisfaction}
                    </p>
                    <p className="text-sm text-muted-foreground">CSAT Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Funnel</CardTitle>
                <CardDescription>
                  Lead progression and conversion rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesFunnelData.map((data, index) => (
                    <div key={data.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: data.color }}
                          />
                          <span className="font-medium">{data.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold">{data.value}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            (
                            {(
                              (data.value /
                                salesFunnelData.reduce(
                                  (sum, item) => sum + item.value,
                                  0,
                                )) *
                              100
                            ).toFixed(1)}
                            %)
                          </span>
                        </div>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: data.color,
                            width: `${(data.value / Math.max(...salesFunnelData.map((d) => d.value))) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {salesFunnelData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>
                  Cross-departmental efficiency metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentData.map((dept) => (
                    <div
                      key={dept.name}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div>
                        <p className="font-medium">{dept.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {dept.employees} employees
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {dept.efficiency && `${dept.efficiency}% Efficiency`}
                          {dept.conversion && `${dept.conversion}% Conversion`}
                          {dept.accuracy && `${dept.accuracy}% Accuracy`}
                          {dept.satisfaction &&
                            `${dept.satisfaction}% Satisfaction`}
                          {dept.support && `${dept.support}% Support`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Finance Section */}
      {dashboardConfig.sections.includes("finance") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold">Financial Performance</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/finance">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Finance
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Wallet className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {formatCurrency(businessMetrics.totalAssets)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Assets
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {formatCurrency(businessMetrics.cashFlow)}
                    </p>
                    <p className="text-sm text-muted-foreground">Cash Flow</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Receipt className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {formatCurrency(businessMetrics.accountsReceivable)}
                    </p>
                    <p className="text-sm text-muted-foreground">Receivables</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {formatCurrency(businessMetrics.accountsPayable)}
                    </p>
                    <p className="text-sm text-muted-foreground">Payables</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Profitability</CardTitle>
                <CardDescription>
                  Monthly revenue, expenses, and profit margins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueGrowthData.map((data, index) => (
                    <div key={data.month} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{data.month}</span>
                        <span className="text-sm font-medium text-purple-600">
                          Margin: {data.margin}%
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-green-600">Revenue</span>
                            <span>₹{(data.revenue / 1000000).toFixed(1)}M</span>
                          </div>
                          <div className="h-4 bg-green-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full transition-all duration-500"
                              style={{
                                width: `${(data.revenue / Math.max(...revenueGrowthData.map((d) => d.revenue))) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-red-600">Expenses</span>
                            <span>
                              ₹{(data.expenses / 1000000).toFixed(1)}M
                            </span>
                          </div>
                          <div className="h-4 bg-red-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 rounded-full transition-all duration-500"
                              style={{
                                width: `${(data.expenses / Math.max(...revenueGrowthData.map((d) => d.revenue))) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Net Profit: ₹
                        {((data.revenue - data.expenses) / 1000000).toFixed(1)}M
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Analysis</CardTitle>
                <CardDescription>
                  Monthly cash inflow vs outflow trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cashFlowData.map((data, index) => (
                    <div key={data.month} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{data.month}</span>
                        <span
                          className={`text-sm font-medium ${data.net >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          Net: ₹{(data.net / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-green-600">Cash Inflow</span>
                            <span>₹{(data.inflow / 1000000).toFixed(1)}M</span>
                          </div>
                          <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full transition-all duration-500"
                              style={{
                                width: `${(data.inflow / Math.max(...cashFlowData.map((d) => Math.max(d.inflow, d.outflow)))) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-red-600">Cash Outflow</span>
                            <span>₹{(data.outflow / 1000000).toFixed(1)}M</span>
                          </div>
                          <div className="h-3 bg-red-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 rounded-full transition-all duration-500"
                              style={{
                                width: `${(data.outflow / Math.max(...cashFlowData.map((d) => Math.max(d.inflow, d.outflow)))) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-600">Net Flow</span>
                            <span>₹{(data.net / 1000000).toFixed(1)}M</span>
                          </div>
                          <div
                            className={`h-3 rounded-full overflow-hidden ${data.net >= 0 ? "bg-blue-100" : "bg-red-100"}`}
                          >
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${data.net >= 0 ? "bg-blue-500" : "bg-red-500"}`}
                              style={{
                                width: `${(Math.abs(data.net) / Math.max(...cashFlowData.map((d) => Math.abs(d.net)))) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* HR Section */}
      {dashboardConfig.sections.includes("hr") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-pink-600" />
            <h2 className="text-xl font-semibold">Human Resources</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/hrms">
                <ExternalLink className="mr-2 h-4 w-4" />
                View HRMS
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.totalEmployees}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Employees
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.attendanceRate}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Attendance Rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.employeeTurnover}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Turnover Rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.trainingCompletion}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Training Complete
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Operations Section */}
      {dashboardConfig.sections.includes("operations") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-orange-600" />
            <h2 className="text-xl font-semibold">Operations & Inventory</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/inventory">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Inventory
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Package className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.totalItems}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.lowStockItems}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Low Stock Items
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {formatCurrency(businessMetrics.stockValue)}
                    </p>
                    <p className="text-sm text-muted-foreground">Stock Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {formatCurrency(businessMetrics.monthlyConsumption)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Monthly Usage
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Safety Section */}
      {dashboardConfig.sections.includes("safety") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HardHat className="h-5 w-5 text-red-600" />
            <h2 className="text-xl font-semibold">Safety & Compliance</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/safety">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Safety
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.safetyScore}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Safety Score
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.incidentsThisMonth}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Incidents (Month)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.trainingCompliance}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Training Compliance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-xl font-bold">
                      {businessMetrics.auditScore}%
                    </p>
                    <p className="text-sm text-muted-foreground">Audit Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* System Health - For admin roles */}
      {dashboardConfig.sections.includes("system") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-semibold">System Health</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/user-management">
                <ExternalLink className="mr-2 h-4 w-4" />
                Manage Users
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-xl font-bold">67</p>
                    <p className="text-sm text-muted-foreground">
                      Active Users
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-xl font-bold">99.8%</p>
                    <p className="text-sm text-muted-foreground">
                      System Uptime
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-xl font-bold">13</p>
                    <p className="text-sm text-muted-foreground">
                      Active Roles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Database className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="text-xl font-bold">2.3TB</p>
                    <p className="text-sm text-muted-foreground">
                      Data Storage
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Quick Actions Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Frequently used actions based on your role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {dashboardConfig.sections.includes("projects") && (
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/projects">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Project
                </Link>
              </Button>
            )}
            {dashboardConfig.sections.includes("sales") && (
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/crm/leads">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Lead
                </Link>
              </Button>
            )}
            {dashboardConfig.sections.includes("finance") && (
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/finance/invoices">
                  <Receipt className="mr-2 h-4 w-4" />
                  Create Invoice
                </Link>
              </Button>
            )}
            {dashboardConfig.sections.includes("hr") && (
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/hrms/employees">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Manage Employees
                </Link>
              </Button>
            )}
            {dashboardConfig.sections.includes("operations") && (
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/inventory">
                  <Package className="mr-2 h-4 w-4" />
                  Check Inventory
                </Link>
              </Button>
            )}
            {dashboardConfig.sections.includes("safety") && (
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/safety/incidents">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Incident
                </Link>
              </Button>
            )}
            <Button variant="outline" className="justify-start" asChild>
              <Link to="/reports">
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Reports
              </Link>
            </Button>
            {dashboardConfig.sections.includes("system") && (
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/user-management/users">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
