import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Building2,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Download,
  Settings,
  Bell,
  Shield,
  Zap,
  Package,
  Database,
  Activity,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  Crown,
  Star,
  Gauge,
} from "lucide-react";
import { PulsingDot } from "../ui/animated-icons";
import { AnimatedCounter } from "../ui/animated-counter";
import { Link } from "react-router-dom";
import { mockTenants, generateBillingHistory } from "./data";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function AccountDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedTenantId, setSelectedTenantId] = useState(mockTenants[0].id);

  // Get current tenant based on selection
  const tenant =
    mockTenants.find((t) => t.id === selectedTenantId) || mockTenants[0];

  // Generate tenant-specific billing history
  const billingHistory = generateBillingHistory(tenant);

  const getStatusConfig = (status: string) => {
    const configs = {
      active: { badge: "default", color: "text-green-600" },
      trial: { badge: "secondary", color: "text-blue-600" },
      expired: { badge: "destructive", color: "text-red-600" },
      suspended: { badge: "destructive", color: "text-orange-600" },
    };
    return (
      configs[status as keyof typeof configs] || {
        badge: "outline",
        color: "text-gray-600",
      }
    );
  };

  const formatCurrency = (amount: number, currency: string = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateUsagePercentage = (current: number, max: number) => {
    if (max === -1) return 0; // Unlimited
    return Math.min((current / max) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold gradient-text">
              Account Management
            </h1>
            <PulsingDot className="animate-pulse" />
          </div>
          <p className="text-muted-foreground">
            Manage your organization's subscription, usage, and settings
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="outline" className="gap-1">
              <Building2 className="h-3 w-3" />
              {tenant.organizationName}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {tenant.subscription.planName}
            </Badge>
            <Badge
              variant={getStatusConfig(tenant.status).badge as any}
              className="text-xs"
            >
              {tenant.status.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Label htmlFor="tenant-select" className="text-sm font-medium">
              Switch Account:
            </Label>
            <Select
              value={selectedTenantId}
              onValueChange={setSelectedTenantId}
            >
              <SelectTrigger id="tenant-select" className="w-[280px]">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {mockTenants.map((tenantOption) => (
                  <SelectItem key={tenantOption.id} value={tenantOption.id}>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{tenantOption.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {tenantOption.subscription.planType}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" asChild>
            <Link to="/register">
              <Building2 className="h-4 w-4 mr-2" />
              New Tenant Registration
            </Link>
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tenant.name}</p>
                <p className="text-sm text-muted-foreground">Organization</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge
                variant={getStatusConfig(tenant.status).badge as any}
                className={getStatusConfig(tenant.status).color}
              >
                {tenant.status.toUpperCase()}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {tenant.industry.name}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={tenant.usage.currentMonth.users} />
                  <span className="text-sm font-normal">
                    /
                    {tenant.subscription.limits.maxUsers === -1
                      ? "∞"
                      : tenant.subscription.limits.maxUsers}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
            <Progress
              value={calculateUsagePercentage(
                tenant.usage.currentMonth.users,
                tenant.subscription.limits.maxUsers,
              )}
              className="mt-3 h-2"
            />
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter
                    value={tenant.usage.currentMonth.storageUsed}
                    decimals={1}
                  />
                  <span className="text-sm font-normal">
                    /{tenant.subscription.limits.maxStorage}GB
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">Storage Used</p>
              </div>
            </div>
            <Progress
              value={calculateUsagePercentage(
                tenant.usage.currentMonth.storageUsed,
                tenant.subscription.limits.maxStorage,
              )}
              className="mt-3 h-2"
            />
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(tenant.usage.currentMonth.billingAmount)}
                </p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+5.2%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Alerts */}
      {tenant.usage.alerts.filter((alert) => !alert.acknowledged).length >
        0 && (
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Bell className="h-5 w-5" />
              Usage Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tenant.usage.alerts
                .filter((alert) => !alert.acknowledged)
                .map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start justify-between p-3 bg-white rounded-lg border"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={`h-5 w-5 mt-0.5 ${
                          alert.severity === "critical"
                            ? "text-red-500"
                            : alert.severity === "warning"
                              ? "text-orange-500"
                              : "text-blue-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(alert.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Resolve
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tenant Management Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-orange-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-blue-600" />
            Tenant Management
          </CardTitle>
          <CardDescription>
            Manage tenant registrations and organization settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              className="h-auto p-4 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
              asChild
            >
              <Link to="/register">
                <div className="text-center">
                  <Building2 className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">New Tenant Registration</div>
                  <div className="text-xs opacity-90">
                    Complete setup wizard
                  </div>
                </div>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 border-blue-200 hover:bg-blue-50"
              asChild
            >
              <Link to="/account/tenants">
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-medium">View All Tenants</div>
                  <div className="text-xs text-muted-foreground">
                    Manage tenant organizations
                  </div>
                </div>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 border-blue-200 hover:bg-blue-50"
            >
              <div className="text-center">
                <Package className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="font-medium">Upgrade Plan</div>
                <div className="text-xs text-muted-foreground">
                  Enhance capabilities
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="usage">Usage & Analytics</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Organization Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Organization Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company Name:</span>
                    <span className="font-medium">
                      {tenant.organizationName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry:</span>
                    <div className="flex items-center gap-2">
                      <span>{tenant.industry.icon}</span>
                      <span className="font-medium">
                        {tenant.industry.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tenant ID:</span>
                    <span className="font-mono text-sm">{tenant.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium">
                      {new Date(tenant.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Zone:</span>
                    <span className="font-medium">
                      {tenant.settings.timezone}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin User Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Admin Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Admin Name:</span>
                    <span className="font-medium">{tenant.adminUser.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      <span className="font-medium">
                        {tenant.adminUser.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      <span className="font-medium">
                        {tenant.adminUser.phone}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role:</span>
                    <Badge variant="secondary">
                      {tenant.adminUser.role.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Login:</span>
                    <span className="font-medium">
                      {tenant.adminUser.lastLogin
                        ? new Date(
                            tenant.adminUser.lastLogin,
                          ).toLocaleDateString()
                        : "Never"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Subscription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Current Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">
                      {tenant.subscription.planName}
                    </h3>
                    {tenant.subscription.planType === "professional" && (
                      <Star className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <Badge variant="default">
                    {tenant.subscription.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Billing Cycle:
                    </span>
                    <span className="font-medium capitalize">
                      {tenant.billingCycle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Billing:</span>
                    <span className="font-medium">
                      {new Date(
                        tenant.subscription.endDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">
                      {formatCurrency(tenant.subscription.pricing.basePrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Auto Renew:</span>
                    <span className="font-medium">
                      {tenant.subscription.autoRenew ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Active Modules:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {tenant.subscription.modules.map((module) => (
                      <Badge key={module} variant="outline" className="text-xs">
                        {module.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Two-Factor Auth:
                    </span>
                    <div className="flex items-center gap-2">
                      {tenant.settings.security.twoFactorAuth ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      )}
                      <span className="font-medium">
                        {tenant.settings.security.twoFactorAuth
                          ? "Enabled"
                          : "Disabled"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">IP Whitelist:</span>
                    <span className="font-medium">
                      {tenant.settings.security.ipWhitelist.length} ranges
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Session Timeout:
                    </span>
                    <span className="font-medium">
                      {tenant.settings.security.sessionTimeout} minutes
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Password Policy:
                    </span>
                    <span className="font-medium">Strong</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <Button size="sm" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscription">
          <div className="space-y-6">
            {/* Current Plan Details */}
            <Card>
              <CardHeader>
                <CardTitle>Subscription Management</CardTitle>
                <CardDescription>
                  Manage your subscription plan and features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Current Plan</h3>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold">
                          {tenant.subscription.planName}
                        </h4>
                        <Badge variant="default">
                          {tenant.subscription.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Plan Type:</span>
                          <span className="font-medium capitalize">
                            {tenant.subscription.planType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Billing Cycle:</span>
                          <span className="font-medium capitalize">
                            {tenant.billingCycle}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Base Price:</span>
                          <span className="font-medium">
                            {formatCurrency(
                              tenant.subscription.pricing.basePrice,
                            )}
                          </span>
                        </div>
                        {tenant.subscription.pricing.discount && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount:</span>
                            <span className="font-medium">
                              -{tenant.subscription.pricing.discount.percentage}
                              %
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Start Date:</span>
                          <span className="font-medium">
                            {new Date(
                              tenant.subscription.startDate,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>End Date:</span>
                          <span className="font-medium">
                            {new Date(
                              tenant.subscription.endDate,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Plan Limits</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Users</span>
                          <span>
                            {tenant.usage.currentMonth.users}/
                            {tenant.subscription.limits.maxUsers === -1
                              ? "∞"
                              : tenant.subscription.limits.maxUsers}
                          </span>
                        </div>
                        <Progress
                          value={calculateUsagePercentage(
                            tenant.usage.currentMonth.users,
                            tenant.subscription.limits.maxUsers,
                          )}
                          className="mt-2 h-2"
                        />
                      </div>

                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Storage</span>
                          <span>
                            {tenant.usage.currentMonth.storageUsed}GB/
                            {tenant.subscription.limits.maxStorage}GB
                          </span>
                        </div>
                        <Progress
                          value={calculateUsagePercentage(
                            tenant.usage.currentMonth.storageUsed,
                            tenant.subscription.limits.maxStorage,
                          )}
                          className="mt-2 h-2"
                        />
                      </div>

                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">API Calls</span>
                          <span>
                            {tenant.usage.currentMonth.apiCalls}/
                            {tenant.subscription.limits.maxApiCalls === -1
                              ? "��"
                              : tenant.subscription.limits.maxApiCalls}
                          </span>
                        </div>
                        <Progress
                          value={calculateUsagePercentage(
                            tenant.usage.currentMonth.apiCalls,
                            tenant.subscription.limits.maxApiCalls,
                          )}
                          className="mt-2 h-2"
                        />
                      </div>

                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Projects</span>
                          <span>
                            {tenant.usage.currentMonth.activeProjects}/
                            {tenant.subscription.limits.maxProjects === -1
                              ? "∞"
                              : tenant.subscription.limits.maxProjects}
                          </span>
                        </div>
                        <Progress
                          value={calculateUsagePercentage(
                            tenant.usage.currentMonth.activeProjects,
                            tenant.subscription.limits.maxProjects,
                          )}
                          className="mt-2 h-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Subscription
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Change Billing Cycle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>
                  Monitor your organization's resource consumption
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Current Month</h3>
                    <div className="grid gap-3">
                      <div className="p-3 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Users</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">
                          {tenant.usage.currentMonth.users}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Active users
                        </p>
                      </div>

                      <div className="p-3 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">Storage</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">
                          {tenant.usage.currentMonth.storageUsed}GB
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Used storage
                        </p>
                      </div>

                      <div className="p-3 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-600" />
                          <span className="font-medium">API Calls</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">
                          {tenant.usage.currentMonth.apiCalls.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          API requests
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Previous Month</h3>
                    <div className="grid gap-3">
                      <div className="p-3 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Users</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">
                          {tenant.usage.previousMonth.users}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <TrendingUp className="h-3 w-3 text-green-600" />
                          <span className="text-sm text-green-600">
                            +
                            {(
                              ((tenant.usage.currentMonth.users -
                                tenant.usage.previousMonth.users) /
                                tenant.usage.previousMonth.users) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">Storage</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">
                          {tenant.usage.previousMonth.storageUsed}GB
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <TrendingUp className="h-3 w-3 text-green-600" />
                          <span className="text-sm text-green-600">
                            +
                            {(
                              ((tenant.usage.currentMonth.storageUsed -
                                tenant.usage.previousMonth.storageUsed) /
                                tenant.usage.previousMonth.storageUsed) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-600" />
                          <span className="font-medium">API Calls</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">
                          {tenant.usage.previousMonth.apiCalls.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <TrendingUp className="h-3 w-3 text-green-600" />
                          <span className="text-sm text-green-600">
                            +
                            {(
                              ((tenant.usage.currentMonth.apiCalls -
                                tenant.usage.previousMonth.apiCalls) /
                                tenant.usage.previousMonth.apiCalls) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Year to Date</h3>
                    <div className="grid gap-3">
                      <div className="p-3 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Total Billing</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">
                          {formatCurrency(tenant.usage.yearToDate.totalBilling)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          This year
                        </p>
                      </div>

                      <div className="p-3 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Avg Users</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">
                          {tenant.usage.yearToDate.avgMonthlyUsers}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Monthly average
                        </p>
                      </div>

                      <div className="p-3 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">Peak Storage</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">
                          {tenant.usage.yearToDate.peakStorage}GB
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Highest usage
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  View and download your billing statements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {billingHistory.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded bg-muted/50">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{invoice.invoiceNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(
                              invoice.billingPeriod.start,
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              invoice.billingPeriod.end,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          {formatCurrency(invoice.amount)}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              invoice.status === "paid"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {invoice.status.toUpperCase()}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your organization preferences and configurations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">General Settings</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Time Zone</span>
                        <span className="font-medium">
                          {tenant.settings.timezone}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Date Format</span>
                        <span className="font-medium">
                          {tenant.settings.dateFormat}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Currency</span>
                        <span className="font-medium">
                          {tenant.settings.currency}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Language</span>
                        <span className="font-medium">English</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Notification Settings</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Email Alerts</span>
                        <Badge
                          variant={
                            tenant.settings.notifications.emailAlerts
                              ? "default"
                              : "secondary"
                          }
                        >
                          {tenant.settings.notifications.emailAlerts
                            ? "Enabled"
                            : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>SMS Alerts</span>
                        <Badge
                          variant={
                            tenant.settings.notifications.smsAlerts
                              ? "default"
                              : "secondary"
                          }
                        >
                          {tenant.settings.notifications.smsAlerts
                            ? "Enabled"
                            : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Billing Reminders</span>
                        <Badge
                          variant={
                            tenant.settings.notifications.billingReminders
                              ? "default"
                              : "secondary"
                          }
                        >
                          {tenant.settings.notifications.billingReminders
                            ? "Enabled"
                            : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Usage Alerts</span>
                        <Badge
                          variant={
                            tenant.settings.notifications.usageAlerts
                              ? "default"
                              : "secondary"
                          }
                        >
                          {tenant.settings.notifications.usageAlerts
                            ? "Enabled"
                            : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Update Settings
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
