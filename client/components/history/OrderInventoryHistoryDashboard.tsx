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
  BarChart3,
  FileText,
  Package,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  ArrowUpDown,
  RefreshCw,
  Download,
} from "lucide-react";
import { OrderHistoryDashboard } from "./OrderHistoryDashboard";
import { InventoryMovementTracker } from "./InventoryMovementTracker";
import { ReportGenerator } from "./ReportGenerator";
import { generateDashboardMetrics, generateHistoryAnalytics } from "./data";
import { HistoryDashboardMetrics, HistoryAnalytics } from "./types";

interface OrderInventoryHistoryDashboardProps {
  tenantId: string;
  userType: string;
}

export function OrderInventoryHistoryDashboard({
  tenantId,
  userType,
}: OrderInventoryHistoryDashboardProps) {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Generate mock data
  const dashboardMetrics = useMemo(
    () => generateDashboardMetrics(tenantId),
    [tenantId],
  );
  const analytics = useMemo(
    () => generateHistoryAnalytics(tenantId),
    [tenantId],
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

  const getTrendIcon = (changeType: string) => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "decrease":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <ArrowUpDown className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Order & Inventory History
          </h1>
          <p className="text-muted-foreground">
            Comprehensive reporting and history tracking for orders and
            inventory movements
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Movements</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Performance Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardMetrics.totalOrders}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {getTrendIcon(
                    dashboardMetrics.orderGrowth > 0 ? "increase" : "decrease",
                  )}
                  <span
                    className={`ml-1 ${dashboardMetrics.orderGrowth > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {formatPercentage(dashboardMetrics.orderGrowth)} this month
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Order Value
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(dashboardMetrics.totalOrderValue)}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {getTrendIcon(
                    dashboardMetrics.orderValueGrowth > 0
                      ? "increase"
                      : "decrease",
                  )}
                  <span
                    className={`ml-1 ${dashboardMetrics.orderValueGrowth > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {formatPercentage(dashboardMetrics.orderValueGrowth)} vs
                    last month
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Inventory Movements
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardMetrics.totalMovements}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {getTrendIcon(
                    dashboardMetrics.movementGrowth > 0
                      ? "increase"
                      : "decrease",
                  )}
                  <span
                    className={`ml-1 ${dashboardMetrics.movementGrowth > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {formatPercentage(dashboardMetrics.movementGrowth)} this
                    month
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Stock Turnover
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardMetrics.stockTurnoverRate}x
                </div>
                <p className="text-xs text-muted-foreground">
                  Inventory accuracy:{" "}
                  {formatPercentage(dashboardMetrics.inventoryAccuracy)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Indicators */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Order Fulfillment
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPercentage(dashboardMetrics.orderFulfillmentRate)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Avg processing: {dashboardMetrics.averageOrderProcessingTime}{" "}
                  days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  On-Time Delivery
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPercentage(dashboardMetrics.onTimeDeliveryRate)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardMetrics.overdueOrders} overdue orders
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Approvals
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardMetrics.pendingApprovals}
                </div>
                <p className="text-xs text-muted-foreground">
                  Require immediate attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Stock Issues
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardMetrics.stockOutItems}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardMetrics.excessStockItems} excess stock items
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest order activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardMetrics.recentOrders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-50">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{order.orderNumber}</div>
                          <div className="text-sm text-gray-500">
                            {order.customerName ||
                              order.supplierName ||
                              order.franchiseeName}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(order.totalValue)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Movements</CardTitle>
                <CardDescription>Latest inventory movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardMetrics.recentMovements
                    .slice(0, 5)
                    .map((movement) => (
                      <div
                        key={movement.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              movement.transactionType === "in"
                                ? "bg-green-50"
                                : movement.transactionType === "out"
                                  ? "bg-red-50"
                                  : "bg-blue-50"
                            }`}
                          >
                            <Package
                              className={`h-4 w-4 ${
                                movement.transactionType === "in"
                                  ? "text-green-600"
                                  : movement.transactionType === "out"
                                    ? "text-red-600"
                                    : "text-blue-600"
                              }`}
                            />
                          </div>
                          <div>
                            <div className="font-medium">
                              {movement.itemName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {movement.category}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-medium ${
                              movement.transactionType === "in"
                                ? "text-green-600"
                                : movement.transactionType === "out"
                                  ? "text-red-600"
                                  : "text-blue-600"
                            }`}
                          >
                            {movement.transactionType === "out"
                              ? "-"
                              : movement.transactionType === "in"
                                ? "+"
                                : "±"}
                            {movement.quantity} {movement.unit}
                          </div>
                          <div className="text-sm text-gray-500">
                            {movement.movementType.replace("_", " ")}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend Charts */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Order Trends</CardTitle>
                <CardDescription>Weekly order volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardMetrics.orderTrends.map((trend, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{trend.period}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{trend.value}</span>
                        <div className="flex items-center">
                          {getTrendIcon(trend.changeType)}
                          <span
                            className={`text-xs ${
                              trend.changeType === "increase"
                                ? "text-green-600"
                                : trend.changeType === "decrease"
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {formatPercentage(trend.change)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Movement Trends</CardTitle>
                <CardDescription>Weekly inventory movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardMetrics.movementTrends.map((trend, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{trend.period}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{trend.value}</span>
                        <div className="flex items-center">
                          {getTrendIcon(trend.changeType)}
                          <span
                            className={`text-xs ${
                              trend.changeType === "increase"
                                ? "text-green-600"
                                : trend.changeType === "decrease"
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {formatPercentage(trend.change)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Value Trends</CardTitle>
                <CardDescription>Weekly transaction value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardMetrics.valueTrends.map((trend, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{trend.period}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {formatCurrency(trend.value)}
                        </span>
                        <div className="flex items-center">
                          {getTrendIcon(trend.changeType)}
                          <span
                            className={`text-xs ${
                              trend.changeType === "increase"
                                ? "text-green-600"
                                : trend.changeType === "decrease"
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {formatPercentage(trend.change)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <OrderHistoryDashboard tenantId={tenantId} userType={userType} />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryMovementTracker tenantId={tenantId} userType={userType} />
        </TabsContent>

        <TabsContent value="reports">
          <ReportGenerator tenantId={tenantId} userType={userType} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
