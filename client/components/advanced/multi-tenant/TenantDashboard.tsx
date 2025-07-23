import React, { useState, useEffect } from "react";
import { Tenant, MultiTenantDashboard, TenantAuditLog } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Server,
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import { cn } from "../../../lib/utils";

interface TenantDashboardProps {
  className?: string;
}

export function TenantDashboard({ className }: TenantDashboardProps) {
  const [dashboardData, setDashboardData] =
    useState<MultiTenantDashboard | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock dashboard data
  useEffect(() => {
    const mockDashboard: MultiTenantDashboard = {
      totalTenants: 156,
      activeTenants: 142,
      trialTenants: 23,
      suspendedTenants: 8,
      totalRevenue: 2850000,
      monthlyRecurringRevenue: 425000,
      churnRate: 2.3,
      averageRevenuePerUser: 18500,
      totalUsers: 3420,
      totalStorage: 12.8, // TB
      totalApiCalls: 8500000,
      topTenants: [
        {
          id: "builder-construction",
          name: "Builder Construction Ltd",
          subdomain: "builder",
          status: "active",
          tier: "enterprise",
          usage: {
            currentPeriod: { startDate: new Date(), endDate: new Date() },
            users: { active: 245, total: 320, peak: 289, limit: 500 },
            storage: { used: 450, limit: 1000, documents: 12543, files: 8965 },
            api: { calls: 125000, limit: 1000000, bandwidth: 89.5 },
            features: {
              projects: 156,
              reports: 2340,
              integrations: 8,
              workflows: 23,
              aiAgents: 12,
            },
            billing: {
              currentCost: 85000,
              projectedCost: 92000,
              overageCharges: 0,
            },
          },
          billing: {
            plan: "Enterprise",
            billingCycle: "yearly",
            currency: "INR",
            nextBillingDate: new Date("2024-12-15"),
            paymentMethod: "card",
            billingEmail: "billing@builderconstruction.com",
          },
        } as Tenant,
        {
          id: "tech-innovations",
          name: "Tech Innovations Pvt Ltd",
          subdomain: "techinnovations",
          status: "active",
          tier: "professional",
          usage: {
            currentPeriod: { startDate: new Date(), endDate: new Date() },
            users: { active: 45, total: 50, peak: 48, limit: 100 },
            storage: { used: 125, limit: 500, documents: 3421, files: 2156 },
            api: { calls: 25000, limit: 100000, bandwidth: 12.3 },
            features: {
              projects: 23,
              reports: 156,
              integrations: 3,
              workflows: 8,
              aiAgents: 5,
            },
            billing: {
              currentCost: 15000,
              projectedCost: 16500,
              overageCharges: 500,
            },
          },
          billing: {
            plan: "Professional",
            billingCycle: "monthly",
            currency: "INR",
            nextBillingDate: new Date("2024-04-01"),
            paymentMethod: "card",
            billingEmail: "accounts@techinnovations.in",
          },
        } as Tenant,
      ],
      recentActivity: [
        {
          id: "audit-1",
          tenantId: "builder-construction",
          userId: "user-123",
          action: "USER_LOGIN",
          resource: "auth",
          details: { method: "sso" },
          ip: "203.192.123.45",
          userAgent: "Mozilla/5.0...",
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          severity: "low",
        },
        {
          id: "audit-2",
          tenantId: "tech-innovations",
          userId: "user-456",
          action: "PROJECT_CREATED",
          resource: "project",
          resourceId: "proj-789",
          details: { name: "New Website Development" },
          ip: "203.192.123.67",
          userAgent: "Mozilla/5.0...",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          severity: "medium",
        },
        {
          id: "audit-3",
          tenantId: "builder-construction",
          userId: "user-789",
          action: "BILLING_UPDATED",
          resource: "billing",
          details: { plan: "enterprise", action: "upgrade" },
          ip: "203.192.123.45",
          userAgent: "Mozilla/5.0...",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          severity: "high",
        },
      ],
      usageAlerts: [
        {
          tenantId: "tech-innovations",
          tenantName: "Tech Innovations Pvt Ltd",
          metric: "storage",
          current: 125,
          limit: 500,
          severity: "warning",
        },
        {
          tenantId: "startup-corp",
          tenantName: "Startup Corp",
          metric: "users",
          current: 95,
          limit: 100,
          severity: "critical",
        },
      ],
    };

    setDashboardData(mockDashboard);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50";
      case "trial":
        return "text-blue-600 bg-blue-50";
      case "suspended":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "enterprise":
        return "text-purple-600 bg-purple-50";
      case "professional":
        return "text-blue-600 bg-blue-50";
      case "basic":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50";
      case "warning":
        return "text-yellow-600 bg-yellow-50";
      case "high":
        return "text-orange-600 bg-orange-50";
      case "medium":
        return "text-blue-600 bg-blue-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Multi-Tenant Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of all tenants and system metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Tenants</p>
                <p className="text-2xl font-bold">
                  {dashboardData.totalTenants}
                </p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">
                  {dashboardData.totalUsers.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">
                  ₹{(dashboardData.monthlyRecurringRevenue / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Churn Rate</p>
                <p className="text-2xl font-bold">{dashboardData.churnRate}%</p>
                <p className="text-xs text-red-600 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  +0.5% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="tenants" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        {/* Tenants Tab */}
        <TabsContent value="tenants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Overview</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tenants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.topTenants.map((tenant) => (
                  <div
                    key={tenant.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{tenant.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {tenant.subdomain}.example.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          {tenant.usage.users.active}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Active Users
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          ₹
                          {(tenant.usage.billing.currentCost / 1000).toFixed(0)}
                          K
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Monthly Cost
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          {tenant.usage.storage.used}GB
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Storage Used
                        </p>
                      </div>
                      <Badge
                        className={cn("text-xs", getStatusColor(tenant.status))}
                      >
                        {tenant.status}
                      </Badge>
                      <Badge
                        className={cn("text-xs", getTierColor(tenant.tier))}
                      >
                        {tenant.tier}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Analytics Tab */}
        <TabsContent value="usage" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Storage Usage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Storage Used</span>
                    <span className="font-medium">
                      {dashboardData.totalStorage} TB
                    </span>
                  </div>
                  <Progress value={65} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Documents</p>
                      <p className="font-medium">8.2 TB</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Files</p>
                      <p className="font-medium">4.6 TB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="h-5 w-5" />
                  <span>API Usage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total API Calls</span>
                    <span className="font-medium">
                      {(dashboardData.totalApiCalls / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <Progress value={85} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">This Month</p>
                      <p className="font-medium">2.8M calls</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Month</p>
                      <p className="font-medium">2.3M calls</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Tenant Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Enterprise</span>
                    </div>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Professional</span>
                    </div>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Basic</span>
                    </div>
                    <span className="font-medium">30%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="font-medium">23%</span>
                  </div>
                  <Progress value={23} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Size</span>
                    <span className="font-medium">45 GB</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Revenue</span>
                    <span className="font-medium">
                      ₹{(dashboardData.totalRevenue / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">MRR</span>
                    <span className="font-medium">
                      ₹
                      {(dashboardData.monthlyRecurringRevenue / 1000).toFixed(
                        0,
                      )}
                      K
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ARPU</span>
                    <span className="font-medium">
                      ₹{(dashboardData.averageRevenuePerUser / 1000).toFixed(1)}
                      K
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Churn Rate</span>
                    <span className="font-medium text-red-600">
                      {dashboardData.churnRate}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enterprise</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">39</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Professional</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">70</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Basic</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">47</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">On-time Payments</span>
                    <span className="font-medium text-green-600">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overdue Invoices</span>
                    <span className="font-medium text-red-600">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Failed Payments</span>
                    <span className="font-medium text-orange-600">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Disputed Charges</span>
                    <span className="font-medium">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 border rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {activity.action.replace(/_/g, " ")}
                        </span>
                        <Badge
                          className={cn(
                            "text-xs",
                            getSeverityColor(activity.severity),
                          )}
                        >
                          {activity.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.resource} • {activity.ip}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        {activity.timestamp.toLocaleTimeString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>Usage Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.usageAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full",
                          alert.severity === "critical"
                            ? "bg-red-500"
                            : "bg-yellow-500",
                        )}
                      ></div>
                      <div>
                        <h4 className="font-medium">{alert.tenantName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {alert.metric} usage: {alert.current} / {alert.limit}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Progress
                        value={(alert.current / alert.limit) * 100}
                        className="w-24 h-2"
                      />
                      <Badge
                        className={cn(
                          "text-xs",
                          getSeverityColor(alert.severity),
                        )}
                      >
                        {alert.severity}
                      </Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
