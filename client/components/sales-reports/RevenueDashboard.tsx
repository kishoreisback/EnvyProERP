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
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
  Download,
  Filter,
  Eye,
} from "lucide-react";
import { generateSalesAnalyticsDashboard } from "./data";
import { SalesAnalyticsDashboard, KPIMetric } from "./types";

interface RevenueDashboardProps {
  tenantId: string;
  userType: "franchisee" | "corporate" | "regional_manager";
}

export function RevenueDashboard({
  tenantId,
  userType,
}: RevenueDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedView, setSelectedView] = useState("overview");
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  // Generate dashboard data based on user type
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
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

  const KPICard = ({
    title,
    metric,
    icon: Icon,
  }: {
    title: string;
    metric: KPIMetric;
    icon: any;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            {metric.unit === "currency"
              ? formatCurrency(metric.value)
              : metric.unit === "percentage"
                ? formatPercentage(metric.value)
                : formatNumber(metric.value)}
          </div>

          {metric.target && (
            <div className="text-xs text-muted-foreground">
              Target:{" "}
              {metric.unit === "currency"
                ? formatCurrency(metric.target)
                : formatNumber(metric.target)}
              {metric.achievement && (
                <span
                  className={`ml-2 font-medium ${getStatusColor(metric.status)}`}
                >
                  ({formatPercentage(metric.achievement)}% achieved)
                </span>
              )}
            </div>
          )}

          <div className="flex items-center text-xs">
            {getTrendIcon(metric.trend)}
            <span
              className={`ml-1 ${metric.growth > 0 ? "text-green-600" : metric.growth < 0 ? "text-red-600" : "text-gray-600"}`}
            >
              {metric.growth > 0 ? "+" : ""}
              {formatPercentage(metric.growth)} vs last period
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Revenue Dashboard
          </h2>
          <p className="text-muted-foreground">
            {userType === "corporate"
              ? "Corporate-wide revenue analytics and performance metrics"
              : userType === "regional_manager"
                ? "Regional revenue performance and franchisee analytics"
                : "Franchisee revenue performance and business insights"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
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
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Time Range
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <DateRangePicker
                value={dateRange}
                onChange={(range) => range && setDateRange(range)}
              />
            </div>

            {userType === "corporate" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Region</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="north">North India</SelectItem>
                      <SelectItem value="west">West India</SelectItem>
                      <SelectItem value="south">South India</SelectItem>
                      <SelectItem value="east">East India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Franchisee</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All franchisees" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Franchisees</SelectItem>
                      <SelectItem value="top">Top Performers</SelectItem>
                      <SelectItem value="low">Low Performers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Product Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cement">Cement</SelectItem>
                  <SelectItem value="steel">Steel</SelectItem>
                  <SelectItem value="bricks">Bricks</SelectItem>
                  <SelectItem value="tiles">Tiles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          metric={dashboardData.kpis.totalRevenue}
          icon={DollarSign}
        />
        <KPICard
          title="Revenue Growth"
          metric={dashboardData.kpis.revenueGrowth}
          icon={TrendingUp}
        />
        <KPICard
          title="Total Orders"
          metric={dashboardData.kpis.totalOrders}
          icon={ShoppingCart}
        />
        <KPICard
          title="Average Order Value"
          metric={dashboardData.kpis.averageOrderValue}
          icon={Target}
        />
      </div>

      {/* Additional KPIs for Corporate View */}
      {userType === "corporate" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Customer Count"
            metric={dashboardData.kpis.customerCount}
            icon={Users}
          />
          <KPICard
            title="Conversion Rate"
            metric={dashboardData.kpis.conversionRate}
            icon={Target}
          />
          <KPICard
            title="Active Franchisees"
            metric={dashboardData.kpis.franchiseeCount!}
            icon={Users}
          />
          <KPICard
            title="Active Regions"
            metric={dashboardData.kpis.regionCount!}
            icon={Target}
          />
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs
        value={selectedView}
        onValueChange={setSelectedView}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.charts.revenueChart.data.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {formatCurrency(item.value)}
                        </span>
                        <div className="flex items-center">
                          {getTrendIcon(
                            item.growth && item.growth > 0
                              ? "up"
                              : item.growth && item.growth < 0
                                ? "down"
                                : "stable",
                          )}
                          <span className="text-xs text-muted-foreground ml-1">
                            {item.growth && formatPercentage(item.growth)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Channel Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
                <CardDescription>Revenue by sales channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.charts.salesChart.data.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                        <span className="text-sm">
                          {formatPercentage(item.percentage || 0)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color || "#3b82f6",
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatNumber(item.value)} orders</span>
                        <span>{formatCurrency(item.value * 1000)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Regional Performance (Corporate View) */}
          {userType === "corporate" && (
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
                <CardDescription>Revenue breakdown by regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.tables.topRegions.map((region, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-blue-600">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{region.regionName}</div>
                          <div className="text-sm text-muted-foreground">
                            {region.franchiseeCount} franchisees •{" "}
                            {region.state}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {formatCurrency(region.totalRevenue)}
                        </div>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(
                            region.growth > 0
                              ? "up"
                              : region.growth < 0
                                ? "down"
                                : "stable",
                          )}
                          <span
                            className={`text-sm ${region.growth > 0 ? "text-green-600" : region.growth < 0 ? "text-red-600" : "text-gray-600"}`}
                          >
                            {formatPercentage(region.growth)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            region.achievement >= 100 ? "default" : "outline"
                          }
                        >
                          {formatPercentage(region.achievement)}% of target
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          Target: {formatCurrency(region.target)}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>
                  Historical revenue performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Revenue trend chart would be displayed here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Analytics</CardTitle>
                <CardDescription>Growth rate analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Growth analytics chart would be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Channel Revenue Distribution</CardTitle>
                <CardDescription>
                  Revenue contribution by channel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Channel distribution chart would be displayed here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Growth Comparison</CardTitle>
                <CardDescription>Growth rate by channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Channel growth comparison chart would be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Period Comparison</CardTitle>
                <CardDescription>Current vs previous period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Period comparison chart would be displayed here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Target vs Achievement</CardTitle>
                <CardDescription>Performance against targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Target achievement chart would be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
