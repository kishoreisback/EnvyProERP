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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadges";
import {
  Calendar,
  Filter,
  Download,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  FileText,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { generateOrderHistory, generateTimelineData } from "./data";
import {
  OrderHistoryRecord,
  HistoryFilters,
  HistoryTimelineItem,
} from "./types";

interface OrderHistoryDashboardProps {
  tenantId: string;
  userType: string;
}

export function OrderHistoryDashboard({
  tenantId,
  userType,
}: OrderHistoryDashboardProps) {
  const [filters, setFilters] = useState<HistoryFilters>({
    dateRange: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");

  // Generate mock data
  const orderHistory = useMemo(
    () => generateOrderHistory(tenantId, userType),
    [tenantId, userType],
  );
  const timelineData = useMemo(
    () => generateTimelineData(tenantId),
    [tenantId],
  );

  // Filter data based on current filters and search
  const filteredOrders = useMemo(() => {
    return orderHistory.filter((order) => {
      // Date range filter
      const orderDate = new Date(order.orderDate);
      const startDate = new Date(filters.dateRange.startDate);
      const endDate = new Date(filters.dateRange.endDate);

      if (orderDate < startDate || orderDate > endDate) return false;

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          order.orderNumber.toLowerCase().includes(searchLower) ||
          order.customerName?.toLowerCase().includes(searchLower) ||
          order.supplierName?.toLowerCase().includes(searchLower) ||
          order.franchiseeName?.toLowerCase().includes(searchLower)
        );
      }

      // Status filter
      if (filters.orderStatuses && filters.orderStatuses.length > 0) {
        return filters.orderStatuses.includes(order.status);
      }

      // Order type filter
      if (filters.orderStatuses && filters.orderStatuses.length > 0) {
        return filters.orderStatuses.includes(order.status);
      }

      return true;
    });
  }, [orderHistory, filters, searchTerm]);

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const total = filteredOrders.length;
    const totalValue = filteredOrders.reduce(
      (sum, order) => sum + order.totalValue,
      0,
    );
    const completed = filteredOrders.filter(
      (order) => order.status === "completed" || order.status === "delivered",
    ).length;
    const pending = filteredOrders.filter((order) =>
      [
        "draft",
        "submitted",
        "pending_approval",
        "approved",
        "confirmed",
        "in_production",
      ].includes(order.status),
    ).length;
    const cancelled = filteredOrders.filter(
      (order) => order.status === "cancelled",
    ).length;

    return {
      total,
      totalValue,
      completed,
      pending,
      cancelled,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      averageValue: total > 0 ? totalValue / total : 0,
    };
  }, [filteredOrders]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "pending_approval":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Package className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTimelineIcon = (type: string, status: string) => {
    if (type === "order") return <FileText className="h-4 w-4" />;
    return <Package className="h-4 w-4" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const orderTableColumns = [
    {
      key: "orderNumber",
      label: "Order Number",
      sortable: true,
      render: (record: OrderHistoryRecord) => (
        <div className="font-medium text-blue-600">{record.orderNumber}</div>
      ),
    },
    {
      key: "orderType",
      label: "Type",
      sortable: true,
      render: (record: OrderHistoryRecord) => (
        <Badge variant="outline" className="capitalize">
          {record.orderType.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "entity",
      label: "Customer/Supplier",
      render: (record: OrderHistoryRecord) => (
        <div>
          <div className="font-medium">
            {record.customerName ||
              record.supplierName ||
              record.franchiseeName ||
              "N/A"}
          </div>
          <div className="text-xs text-gray-500">
            {record.customerName
              ? "Customer"
              : record.supplierName
                ? "Supplier"
                : "Franchisee"}
          </div>
        </div>
      ),
    },
    {
      key: "orderDate",
      label: "Order Date",
      sortable: true,
      render: (record: OrderHistoryRecord) =>
        new Date(record.orderDate).toLocaleDateString("en-IN"),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (record: OrderHistoryRecord) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(record.status)}
          <StatusBadge status={record.status} />
        </div>
      ),
    },
    {
      key: "totalValue",
      label: "Value",
      sortable: true,
      render: (record: OrderHistoryRecord) => (
        <div className="text-right font-medium">
          {formatCurrency(record.totalValue)}
        </div>
      ),
    },
    {
      key: "paymentStatus",
      label: "Payment",
      render: (record: OrderHistoryRecord) => (
        <StatusBadge status={record.paymentStatus} />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (record: OrderHistoryRecord) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Order History</h2>
          <p className="text-muted-foreground">
            Comprehensive timeline and analysis of all orders
          </p>
        </div>
        <div className="flex items-center gap-2">
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

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryMetrics.total}</div>
            <p className="text-xs text-muted-foreground">
              {summaryMetrics.completed} completed, {summaryMetrics.pending}{" "}
              pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summaryMetrics.totalValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Avg: {formatCurrency(summaryMetrics.averageValue)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryMetrics.completionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {summaryMetrics.completed} of {summaryMetrics.total} orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryMetrics.pending}</div>
            <p className="text-xs text-muted-foreground">
              {summaryMetrics.cancelled} cancelled orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Order Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="purchase_order">
                    Purchase Orders
                  </SelectItem>
                  <SelectItem value="sales_order">Sales Orders</SelectItem>
                  <SelectItem value="transfer_order">
                    Transfer Orders
                  </SelectItem>
                  <SelectItem value="return_order">Return Orders</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <DateRangePicker
                value={{
                  from: new Date(filters.dateRange.startDate),
                  to: new Date(filters.dateRange.endDate),
                }}
                onChange={(range) => {
                  if (range?.from && range?.to) {
                    setFilters((prev) => ({
                      ...prev,
                      dateRange: {
                        startDate: range.from.toISOString().split("T")[0],
                        endDate: range.to.toISOString().split("T")[0],
                      },
                    }));
                  }
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="detailed">Detailed View</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Summary view of filtered orders ({filteredOrders.length} orders)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredOrders.slice(0, 10)}
                columns={orderTableColumns.slice(0, 6)} // Show fewer columns in overview
                searchable={false}
                pagination={{
                  pageSize: 10,
                  showSizeSelector: false,
                }}
              />
              {filteredOrders.length > 10 && (
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTab("detailed")}
                  >
                    View All {filteredOrders.length} Orders
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order & Activity Timeline</CardTitle>
              <CardDescription>
                Chronological view of all order activities and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 pb-4 border-b last:border-b-0"
                  >
                    <div
                      className={`
                      p-2 rounded-full border-2
                      ${item.status === "success" ? "bg-green-50 border-green-200" : ""}
                      ${item.status === "warning" ? "bg-yellow-50 border-yellow-200" : ""}
                      ${item.status === "error" ? "bg-red-50 border-red-200" : ""}
                      ${item.status === "info" ? "bg-blue-50 border-blue-200" : ""}
                    `}
                    >
                      {getTimelineIcon(item.type, item.status)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.title}</h4>
                        <Badge
                          variant="outline"
                          className={`
                          ${item.status === "success" ? "border-green-200 text-green-700" : ""}
                          ${item.status === "warning" ? "border-yellow-200 text-yellow-700" : ""}
                          ${item.status === "error" ? "border-red-200 text-red-700" : ""}
                          ${item.status === "info" ? "border-blue-200 text-blue-700" : ""}
                        `}
                        >
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.timestamp).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Order History</CardTitle>
              <CardDescription>
                Complete view of all orders with full details (
                {filteredOrders.length} orders)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredOrders}
                columns={orderTableColumns}
                searchable={true}
                pagination={{
                  pageSize: 20,
                  showSizeSelector: true,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
