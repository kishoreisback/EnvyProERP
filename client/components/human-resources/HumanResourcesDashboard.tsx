import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { AnimatedIcon, GlowingOrb, PulsingDot } from "@/components/ui/animated-icons";
import {
  Users,
  UserCheck,
  UserCog,
  Building2,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Filter,
  Search,
  Download,
  Upload,
  Settings,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  RefreshCw,
  Bell,
  Shield,
  Activity,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  Heart,
  DollarSign,
  FileText,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuditLogger } from "@/hooks/useAuditLogger";

// Import sub-modules
import { EmployeeManagement } from "./employee-management/EmployeeManagement";
import { UserAccessManagement } from "./user-access/UserAccessManagement";
import { OrganizationManagement } from "./organization/OrganizationManagement";
import { WorkforceOperations } from "./workforce-operations/WorkforceOperations";

// Import unified data and types
import { 
  getHRTenants, 
  getHRAnalyticsByTenant, 
  getUnifiedHRSummary 
} from "./data";
import { HRTenant } from "./types";

interface HumanResourcesDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function HumanResourcesDashboard({
  currentTab = "overview",
  onTabChange,
}: HumanResourcesDashboardProps) {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { logAudit } = useAuditLogger("HumanResources");

  const [activeTab, setActiveTab] = useState(tab || currentTab);
  const [selectedTenant, setSelectedTenant] = useState<string>("tenant_buildcorp");
  const [showNewEmployeeModal, setShowNewEmployeeModal] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState("current_month");

  // Get HR data
  const hrTenants = useMemo(() => getHRTenants(), []);
  const currentTenant = useMemo(
    () => hrTenants.find(t => t.id === selectedTenant),
    [hrTenants, selectedTenant]
  );
  const analytics = useMemo(
    () => getHRAnalyticsByTenant(selectedTenant, selectedTimeRange),
    [selectedTenant, selectedTimeRange]
  );
  const unifiedSummary = useMemo(
    () => getUnifiedHRSummary(selectedTenant),
    [selectedTenant]
  );

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
    navigate(`/human-resources/${newTab}`);
    logAudit({
      action: "tab_switch",
      resource: "hr_dashboard",
      resourceType: "navigation",
      description: `Switched to ${newTab} tab`,
      details: { tab: newTab, previousTab: activeTab }
    });
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    } else if (trend < 0) {
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
    return <Activity className="h-4 w-4 text-gray-600" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-green-600";
    if (trend < 0) return "text-red-600";
    return "text-gray-600";
  };

  const quickActions = [
    {
      id: "add_employee",
      label: "Add Employee",
      icon: UserCheck,
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      onClick: () => setShowNewEmployeeModal(true),
    },
    {
      id: "create_user",
      label: "Create User",
      icon: UserCog,
      color: "bg-green-50 hover:bg-green-100 border-green-200",
      onClick: () => handleTabChange("user-access"),
    },
    {
      id: "process_payroll",
      label: "Process Payroll",
      icon: DollarSign,
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
      onClick: () => handleTabChange("workforce-operations"),
    },
    {
      id: "view_org_chart",
      label: "View Org Chart",
      icon: Building2,
      color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
      onClick: () => handleTabChange("organization"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden group">
            <AnimatedIcon
              icon={Users}
              animation="float"
              className="text-white"
            />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Human Resources</h1>
            <p className="text-sm text-muted-foreground">
              Unified Employee, User & Organization Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedTenant} onValueChange={setSelectedTenant}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select organization" />
            </SelectTrigger>
            <SelectContent>
              {hrTenants.map((tenant) => (
                <SelectItem key={tenant.id} value={tenant.id}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{tenant.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {tenant.industryType}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month">This Month</SelectItem>
              <SelectItem value="current_quarter">This Quarter</SelectItem>
              <SelectItem value="current_year">This Year</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="last_quarter">Last Quarter</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Button size="sm" className="gap-2 hover-lift">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Button
            key={action.id}
            variant="outline"
            className={cn(
              "h-auto flex-col gap-3 p-4 hover-lift transition-all duration-300",
              action.color,
              "animate-fadeInUp"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={action.onClick}
          >
            <AnimatedIcon
              icon={action.icon}
              animation="bounce"
              className="h-6 w-6"
            />
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* HR KPIs Overview */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-lift transition-all duration-300 border-l-4 border-l-blue-500 animate-fadeInUp">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                <AnimatedCounter value={analytics.employeeMetrics.totalEmployees} />
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-green-600">+{analytics.employeeMetrics.newJoinees}</span>
                <span className="ml-1">new this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift transition-all duration-300 border-l-4 border-l-green-500 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {analytics.attendanceMetrics.averageAttendance.toFixed(1)}%
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-green-600">+2.3%</span>
                <span className="ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift transition-all duration-300 border-l-4 border-l-purple-500 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCog className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                <AnimatedCounter value={analytics.employeeMetrics.activeEmployees} />
              </div>
              <div className="text-xs text-muted-foreground">
                {((analytics.employeeMetrics.activeEmployees / analytics.employeeMetrics.totalEmployees) * 100).toFixed(1)}% of total employees
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift transition-all duration-300 border-l-4 border-l-orange-500 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {analytics.turnoverMetrics.turnoverRate.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">
                Retention: {analytics.turnoverMetrics.retentionRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="employee-management" className="gap-2">
            <Users className="h-4 w-4" />
            Employee Management
          </TabsTrigger>
          <TabsTrigger value="user-access" className="gap-2">
            <UserCog className="h-4 w-4" />
            User & Access
          </TabsTrigger>
          <TabsTrigger value="organization" className="gap-2">
            <Building2 className="h-4 w-4" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="workforce-operations" className="gap-2">
            <Briefcase className="h-4 w-4" />
            Workforce Ops
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Distribution */}
            {analytics && (
              <Card className="animate-fadeInUp">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Department Distribution
                  </CardTitle>
                  <CardDescription>Employee count by department</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(analytics.employeeMetrics.departmentWiseCount).map(([dept, count]) => (
                    <div key={dept} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{dept}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{count}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ 
                              width: `${(count / analytics.employeeMetrics.totalEmployees) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Performance Overview */}
            {analytics && (
              <Card className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Performance Overview
                  </CardTitle>
                  <CardDescription>Employee performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Rating</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{analytics.performanceMetrics.averageRating.toFixed(1)}</span>
                      <Badge variant="default">/ 5.0</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Completed Reviews</span>
                    <span className="font-bold">{analytics.performanceMetrics.completedReviews}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pending Reviews</span>
                    <span className="font-bold text-orange-600">{analytics.performanceMetrics.pendingReviews}</span>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-2">Top Performers</p>
                    <div className="space-y-1">
                      {analytics.performanceMetrics.topPerformers.slice(0, 3).map((performer, index) => (
                        <div key={performer} className="flex items-center gap-2">
                          <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                            {index + 1}
                          </Badge>
                          <span className="text-sm">{performer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recent Activities */}
          {unifiedSummary && (
            <Card className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent HR Activities
                </CardTitle>
                <CardDescription>Latest employee and system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {unifiedSummary.recentActivities.slice(0, 5).map((activity, index) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full",
                          activity.type === 'employee' ? "bg-blue-100 text-blue-600" :
                          activity.type === 'user' ? "bg-green-100 text-green-600" :
                          activity.type === 'attendance' ? "bg-purple-100 text-purple-600" :
                          "bg-orange-100 text-orange-600"
                        )}>
                          {activity.type === 'employee' ? <Users className="h-4 w-4" /> :
                           activity.type === 'user' ? <UserCog className="h-4 w-4" /> :
                           activity.type === 'attendance' ? <Clock className="h-4 w-4" /> :
                           <Activity className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.user} • {new Date(activity.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant={
                        activity.status === 'completed' ? "default" :
                        activity.status === 'pending' ? "secondary" :
                        "destructive"
                      }>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="employee-management">
          <EmployeeManagement tenantId={selectedTenant} />
        </TabsContent>

        <TabsContent value="user-access">
          <UserAccessManagement tenantId={selectedTenant} />
        </TabsContent>

        <TabsContent value="organization">
          <OrganizationManagement tenantId={selectedTenant} />
        </TabsContent>

        <TabsContent value="workforce-operations">
          <WorkforceOperations tenantId={selectedTenant} />
        </TabsContent>
      </Tabs>

      {/* New Employee Modal */}
      <Dialog open={showNewEmployeeModal} onOpenChange={setShowNewEmployeeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Quick Employee Actions
            </DialogTitle>
            <DialogDescription>
              Choose an action to perform
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => {
                setShowNewEmployeeModal(false);
                handleTabChange("employee-management");
              }}
            >
              <UserCheck className="h-6 w-6" />
              <span>Add Employee</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => {
                setShowNewEmployeeModal(false);
                handleTabChange("user-access");
              }}
            >
              <UserCog className="h-6 w-6" />
              <span>Create User</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => {
                setShowNewEmployeeModal(false);
                handleTabChange("organization");
              }}
            >
              <Building2 className="h-6 w-6" />
              <span>Add Department</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => {
                setShowNewEmployeeModal(false);
                handleTabChange("workforce-operations");
              }}
            >
              <Clock className="h-6 w-6" />
              <span>Mark Attendance</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
