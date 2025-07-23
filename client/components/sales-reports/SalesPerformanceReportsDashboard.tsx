import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  Package,
  AlertTriangle,
  RefreshCw,
  Download,
  Settings,
  Eye,
} from "lucide-react";
import { RevenueDashboard } from "./RevenueDashboard";
import { RegionalPerformanceAnalytics } from "./RegionalPerformanceAnalytics";
import { MarginPricingAnalysis } from "./MarginPricingAnalysis";
import { PerformanceAlertsSystem } from "./PerformanceAlertsSystem";
import { generateSalesAnalyticsDashboard } from "./data";

interface SalesPerformanceReportsDashboardProps {
  tenantId: string;
  userType: "franchisee" | "corporate" | "regional_manager";
}

export function SalesPerformanceReportsDashboard({
  tenantId,
  userType,
}: SalesPerformanceReportsDashboardProps) {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly");

  // Generate dashboard data
  const dashboardData = useMemo(
    () => generateSalesAnalyticsDashboard(tenantId, userType),
    [tenantId, userType],
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getKPITrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-blue-600";
      case "warning":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Sales & Performance Reports
          </h1>
          <p className="text-muted-foreground">
            {userType === "corporate"
              ? "Corporate-wide sales analytics, regional performance, and business intelligence"
              : userType === "regional_manager"
                ? "Regional sales performance and franchisee analytics"
                : "Franchisee performance analytics and business insights"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={selectedTimeframe}
            onValueChange={setSelectedTimeframe}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Dashboard</TabsTrigger>
          <TabsTrigger value="regional">Regional Performance</TabsTrigger>
          <TabsTrigger value="margin">Margin & Pricing</TabsTrigger>
          <TabsTrigger value="alerts">Performance Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Performance Indicators */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {formatCurrency(dashboardData.kpis.totalRevenue.value)}
                  </div>
                  {dashboardData.kpis.totalRevenue.target && (
                    <div className="text-xs text-muted-foreground">
                      Target:{" "}
                      {formatCurrency(dashboardData.kpis.totalRevenue.target)}
                      <Badge
                        variant={
                          dashboardData.kpis.totalRevenue.achievement! >= 100
                            ? "default"
                            : "outline"
                        }
                        className="ml-2"
                      >
                        {formatPercentage(
                          dashboardData.kpis.totalRevenue.achievement!,
                        )}
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-center text-xs">
                    {getKPITrendIcon(dashboardData.kpis.totalRevenue.trend)}
                    <span
                      className={`ml-1 ${getStatusColor(dashboardData.kpis.totalRevenue.status)}`}
                    >
                      {formatPercentage(dashboardData.kpis.totalRevenue.growth)}{" "}
                      vs last period
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenue Growth
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {formatPercentage(dashboardData.kpis.revenueGrowth.value)}
                  </div>
                  <div className="flex items-center text-xs">
                    {getKPITrendIcon(dashboardData.kpis.revenueGrowth.trend)}
                    <span
                      className={`ml-1 ${getStatusColor(dashboardData.kpis.revenueGrowth.status)}`}
                    >
                      {formatPercentage(
                        dashboardData.kpis.revenueGrowth.growth,
                      )}{" "}
                      improvement
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {dashboardData.kpis.totalOrders.value.toLocaleString()}
                  </div>
                  {dashboardData.kpis.totalOrders.target && (
                    <div className="text-xs text-muted-foreground">
                      Target:{" "}
                      {dashboardData.kpis.totalOrders.target.toLocaleString()}
                      <Badge
                        variant={
                          dashboardData.kpis.totalOrders.achievement! >= 100
                            ? "default"
                            : "outline"
                        }
                        className="ml-2"
                      >
                        {formatPercentage(
                          dashboardData.kpis.totalOrders.achievement!,
                        )}
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-center text-xs">
                    {getKPITrendIcon(dashboardData.kpis.totalOrders.trend)}
                    <span
                      className={`ml-1 ${getStatusColor(dashboardData.kpis.totalOrders.status)}`}
                    >
                      {formatPercentage(dashboardData.kpis.totalOrders.growth)}{" "}
                      vs last period
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Customer Count
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {dashboardData.kpis.customerCount.value.toLocaleString()}
                  </div>
                  <div className="flex items-center text-xs">
                    {getKPITrendIcon(dashboardData.kpis.customerCount.trend)}
                    <span
                      className={`ml-1 ${getStatusColor(dashboardData.kpis.customerCount.status)}`}
                    >
                      {formatPercentage(
                        dashboardData.kpis.customerCount.growth,
                      )}{" "}
                      growth
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Corporate Specific KPIs */}
          {userType === "corporate" && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Franchisees
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {dashboardData.kpis.franchiseeCount?.value}
                    </div>
                    <div className="flex items-center text-xs">
                      {getKPITrendIcon(
                        dashboardData.kpis.franchiseeCount?.trend || "up",
                      )}
                      <span
                        className={`ml-1 ${getStatusColor(dashboardData.kpis.franchiseeCount?.status || "good")}`}
                      >
                        {formatPercentage(
                          dashboardData.kpis.franchiseeCount?.growth || 0,
                        )}{" "}
                        growth
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Regions
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {dashboardData.kpis.regionCount?.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Operational regions
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Conversion Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {formatPercentage(
                        dashboardData.kpis.conversionRate.value,
                      )}
                    </div>
                    {dashboardData.kpis.conversionRate.target && (
                      <div className="text-xs text-muted-foreground">
                        Target:{" "}
                        {formatPercentage(
                          dashboardData.kpis.conversionRate.target,
                        )}
                      </div>
                    )}
                    <div className="flex items-center text-xs">
                      {getKPITrendIcon(dashboardData.kpis.conversionRate.trend)}
                      <span
                        className={`ml-1 ${getStatusColor(dashboardData.kpis.conversionRate.status)}`}
                      >
                        {formatPercentage(
                          dashboardData.kpis.conversionRate.growth,
                        )}{" "}
                        improvement
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg Order Value
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {formatCurrency(
                        dashboardData.kpis.averageOrderValue.value,
                      )}
                    </div>
                    {dashboardData.kpis.averageOrderValue.target && (
                      <div className="text-xs text-muted-foreground">
                        Target:{" "}
                        {formatCurrency(
                          dashboardData.kpis.averageOrderValue.target,
                        )}
                      </div>
                    )}
                    <div className="flex items-center text-xs">
                      {getKPITrendIcon(
                        dashboardData.kpis.averageOrderValue.trend,
                      )}
                      <span
                        className={`ml-1 ${getStatusColor(dashboardData.kpis.averageOrderValue.status)}`}
                      >
                        {formatPercentage(
                          dashboardData.kpis.averageOrderValue.growth,
                        )}{" "}
                        vs last period
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quick Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Top Performing Regions */}
            {userType === "corporate" && (
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Regions</CardTitle>
                  <CardDescription>
                    Best performing regions by revenue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.tables.topRegions
                      .slice(0, 3)
                      .map((region, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">#{index + 1}</Badge>
                            <div>
                              <div className="font-medium">
                                {region.regionName}
                              </div>
                              <div className="text-xs text-gray-500">
                                {region.franchiseeCount} franchisees
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {formatCurrency(region.totalRevenue)}
                            </div>
                            <div className="text-xs text-green-600">
                              {formatPercentage(region.growth)}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setSelectedTab("regional")}
                  >
                    View All Regions
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Top Performing Franchisees */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Franchisees</CardTitle>
                <CardDescription>
                  Best performing franchisees by revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.tables.topFranchisees
                    .slice(0, 3)
                    .map((franchisee, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">#{franchisee.rank}</Badge>
                          <div>
                            <div className="font-medium">
                              {franchisee.franchiseeName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {franchisee.city}, {franchisee.state}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {formatCurrency(franchisee.revenue)}
                          </div>
                          <div className="text-xs text-green-600">
                            {formatPercentage(franchisee.revenueGrowth)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setSelectedTab("regional")}
                >
                  View All Franchisees
                </Button>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>
                  Best performing products by revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.tables.topProducts
                    .slice(0, 3)
                    .map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">#{product.salesRank}</Badge>
                          <div>
                            <div className="font-medium">
                              {product.productName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {product.category}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {formatCurrency(product.revenue)}
                          </div>
                          <div className="text-xs text-green-600">
                            {formatPercentage(product.growth)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setSelectedTab("margin")}
                >
                  View Product Analysis
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Performance Alerts Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Performance Alerts Summary
              </CardTitle>
              <CardDescription>
                Critical alerts requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-sm text-gray-500">Critical Alerts</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">7</div>
                  <div className="text-sm text-gray-500">High Priority</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">15</div>
                  <div className="text-sm text-gray-500">Total Active</div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setSelectedTab("alerts")}
              >
                <Eye className="h-4 w-4 mr-2" />
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueDashboard tenantId={tenantId} userType={userType} />
        </TabsContent>

        <TabsContent value="regional">
          {userType === "corporate" || userType === "regional_manager" ? (
            <RegionalPerformanceAnalytics
              tenantId={tenantId}
              userType={userType}
            />
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Regional analytics not available for franchisee users
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="margin">
          <MarginPricingAnalysis tenantId={tenantId} userType={userType} />
        </TabsContent>

        <TabsContent value="alerts">
          {userType === "corporate" || userType === "regional_manager" ? (
            <PerformanceAlertsSystem tenantId={tenantId} userType={userType} />
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Performance alerts not available for franchisee users
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
