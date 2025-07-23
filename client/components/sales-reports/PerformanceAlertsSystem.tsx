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
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/DataTable";
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingDown,
  TrendingUp,
  Users,
  Building,
  Package,
  DollarSign,
  Search,
  Filter,
  Eye,
  MessageSquare,
  UserCheck,
  X,
} from "lucide-react";
import {
  generateSalesPerformanceMetrics,
  generateFranchiseePerformance,
} from "./data";
import { PerformanceAlert, FranchiseePerformance } from "./types";

interface PerformanceAlertsSystemProps {
  tenantId: string;
  userType: "corporate" | "regional_manager";
}

export function PerformanceAlertsSystem({
  tenantId,
  userType,
}: PerformanceAlertsSystemProps) {
  const [selectedTab, setSelectedTab] = useState("active");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Generate alerts and performance data
  const salesData = useMemo(
    () => generateSalesPerformanceMetrics(tenantId, userType),
    [tenantId, userType],
  );
  const franchiseeData = useMemo(
    () => generateFranchiseePerformance(tenantId, userType),
    [tenantId, userType],
  );

  // Generate additional alerts
  const allAlerts = useMemo(
    () =>
      [
        ...salesData.alerts,
        {
          id: "ALERT-004",
          type: "declining_sales",
          severity: "medium",
          title: "Declining Sales Trend",
          description:
            "Ahmedabad Premium Franchise showing 3-month declining trend",
          franchiseeId: "FRAN-005",
          franchiseeName: "Ahmedabad Premium Franchise",
          value: -12.5,
          threshold: -10,
          trend: "declining",
          actionRequired: "Sales strategy review and support needed",
          status: "open",
          createdAt: "2024-01-26T11:20:00Z",
          impact: "revenue",
          priority: 2,
        },
        {
          id: "ALERT-005",
          type: "compliance_issue",
          severity: "high",
          title: "Compliance Score Drop",
          description:
            "Multiple franchisees in East region below 70% compliance",
          regionId: "REG-004",
          regionName: "East India",
          value: 68,
          threshold: 80,
          trend: "declining",
          actionRequired: "Immediate compliance audit and training",
          status: "acknowledged",
          createdAt: "2024-01-24T16:45:00Z",
          impact: "compliance",
          priority: 1,
        },
        {
          id: "ALERT-006",
          type: "payment_delay",
          severity: "critical",
          title: "Payment Delays Alert",
          description: "Kolkata Central Franchise has 12 delayed payments",
          franchiseeId: "FRAN-018",
          franchiseeName: "Kolkata Central Franchise",
          value: 12,
          threshold: 5,
          trend: "declining",
          actionRequired: "Financial assessment and payment plan setup",
          status: "in_progress",
          createdAt: "2024-01-22T09:15:00Z",
          impact: "operational",
          priority: 1,
        },
        {
          id: "ALERT-007",
          type: "low_performance",
          severity: "low",
          title: "Customer Retention Issue",
          description: "Below average customer retention in South region",
          regionId: "REG-003",
          regionName: "South India",
          value: 72.5,
          threshold: 80,
          trend: "stable",
          actionRequired: "Customer satisfaction survey and improvement plan",
          status: "open",
          createdAt: "2024-01-27T14:30:00Z",
          impact: "customer",
          priority: 3,
        },
      ] as PerformanceAlert[],
    [salesData.alerts],
  );

  // Filter alerts
  const filteredAlerts = useMemo(() => {
    let filtered = allAlerts;

    // Filter by tab (status)
    if (selectedTab === "active") {
      filtered = filtered.filter((alert) =>
        ["open", "acknowledged", "in_progress"].includes(alert.status),
      );
    } else if (selectedTab === "resolved") {
      filtered = filtered.filter((alert) => alert.status === "resolved");
    } else if (selectedTab === "critical") {
      filtered = filtered.filter((alert) => alert.severity === "critical");
    }

    // Filter by severity
    if (selectedSeverity !== "all") {
      filtered = filtered.filter(
        (alert) => alert.severity === selectedSeverity,
      );
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((alert) => alert.type === selectedType);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (alert) =>
          alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.franchiseeName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          alert.regionName?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Sort by priority and creation date
    return filtered.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [allAlerts, selectedTab, selectedSeverity, selectedType, searchTerm]);

  // Calculate summary metrics
  const alertMetrics = useMemo(() => {
    const activeAlerts = allAlerts.filter((a) =>
      ["open", "acknowledged", "in_progress"].includes(a.status),
    );
    const criticalAlerts = activeAlerts.filter(
      (a) => a.severity === "critical",
    );
    const highAlerts = activeAlerts.filter((a) => a.severity === "high");
    const revenueImpactAlerts = activeAlerts.filter(
      (a) => a.impact === "revenue",
    );

    return {
      total: activeAlerts.length,
      critical: criticalAlerts.length,
      high: highAlerts.length,
      revenueImpact: revenueImpactAlerts.length,
      resolved: allAlerts.filter((a) => a.status === "resolved").length,
    };
  }, [allAlerts]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "high":
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case "medium":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "acknowledged":
        return <Eye className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "low_performance":
        return <TrendingDown className="h-4 w-4" />;
      case "missed_target":
        return <DollarSign className="h-4 w-4" />;
      case "declining_sales":
        return <TrendingDown className="h-4 w-4" />;
      case "inventory_issue":
        return <Package className="h-4 w-4" />;
      case "payment_delay":
        return <Clock className="h-4 w-4" />;
      case "compliance_issue":
        return <UserCheck className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "revenue":
        return "text-red-600";
      case "customer":
        return "text-blue-600";
      case "operational":
        return "text-orange-600";
      case "compliance":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const alertsTableColumns = [
    {
      key: "severity",
      label: "Severity",
      render: (record: PerformanceAlert) => (
        <div className="flex items-center gap-2">
          {getSeverityIcon(record.severity)}
          <Badge className={getSeverityColor(record.severity)}>
            {record.severity}
          </Badge>
        </div>
      ),
    },
    {
      key: "alert",
      label: "Alert Details",
      render: (record: PerformanceAlert) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {getTypeIcon(record.type)}
            <span className="font-medium">{record.title}</span>
          </div>
          <div className="text-sm text-gray-600">{record.description}</div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Priority: {record.priority}</span>
            <span>•</span>
            <span className={getImpactColor(record.impact)}>
              Impact: {record.impact}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "entity",
      label: "Affected Entity",
      render: (record: PerformanceAlert) => (
        <div className="flex items-center gap-2">
          {record.franchiseeId ? (
            <>
              <Building className="h-4 w-4 text-blue-500" />
              <div>
                <div className="font-medium">{record.franchiseeName}</div>
                <div className="text-xs text-gray-500">Franchisee</div>
              </div>
            </>
          ) : record.regionId ? (
            <>
              <Users className="h-4 w-4 text-green-500" />
              <div>
                <div className="font-medium">{record.regionName}</div>
                <div className="text-xs text-gray-500">Region</div>
              </div>
            </>
          ) : (
            <>
              <Package className="h-4 w-4 text-orange-500" />
              <div>
                <div className="font-medium">
                  {record.productName || "Product"}
                </div>
                <div className="text-xs text-gray-500">Product</div>
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      key: "metrics",
      label: "Metrics",
      render: (record: PerformanceAlert) => (
        <div className="text-center">
          <div
            className={`font-medium ${record.value < record.threshold ? "text-red-600" : "text-green-600"}`}
          >
            {typeof record.value === "number"
              ? record.type.includes("percentage") ||
                record.type.includes("rate")
                ? `${record.value.toFixed(1)}%`
                : record.value.toLocaleString()
              : record.value}
          </div>
          <div className="text-xs text-gray-500">
            Threshold: {record.threshold}
          </div>
          <div className="flex items-center justify-center gap-1 text-xs">
            {record.trend === "declining" ? (
              <TrendingDown className="h-3 w-3 text-red-500" />
            ) : record.trend === "improving" ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : null}
            <span className="capitalize">{record.trend}</span>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (record: PerformanceAlert) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(record.status)}
          <span className="text-sm capitalize">
            {record.status.replace("_", " ")}
          </span>
        </div>
      ),
    },
    {
      key: "created",
      label: "Created",
      render: (record: PerformanceAlert) => (
        <div className="text-sm">
          <div>{new Date(record.createdAt).toLocaleDateString("en-IN")}</div>
          <div className="text-xs text-gray-500">
            {new Date(record.createdAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (record: PerformanceAlert) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4" />
          </Button>
          {record.status === "open" && (
            <Button variant="ghost" size="sm">
              <UserCheck className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Performance Alerts System
          </h2>
          <p className="text-muted-foreground">
            Monitor and manage performance alerts across all franchisees and
            regions
          </p>
        </div>
      </div>

      {/* Alert Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {alertMetrics.total}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">
              {alertMetrics.critical}
            </div>
            <p className="text-xs text-muted-foreground">
              Immediate action needed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {alertMetrics.high}
            </div>
            <p className="text-xs text-muted-foreground">
              High priority alerts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue Impact
            </CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {alertMetrics.revenueImpact}
            </div>
            <p className="text-xs text-muted-foreground">Affecting revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {alertMetrics.resolved}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Alerts</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Severity</label>
              <Select
                value={selectedSeverity}
                onValueChange={setSelectedSeverity}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Alert Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="low_performance">
                    Low Performance
                  </SelectItem>
                  <SelectItem value="missed_target">Missed Target</SelectItem>
                  <SelectItem value="declining_sales">
                    Declining Sales
                  </SelectItem>
                  <SelectItem value="inventory_issue">
                    Inventory Issue
                  </SelectItem>
                  <SelectItem value="payment_delay">Payment Delay</SelectItem>
                  <SelectItem value="compliance_issue">
                    Compliance Issue
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Impact</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All impacts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Impacts</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">
            Active Alerts ({alertMetrics.total})
          </TabsTrigger>
          <TabsTrigger value="critical">
            Critical ({alertMetrics.critical})
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved ({alertMetrics.resolved})
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Performance Alerts</CardTitle>
              <CardDescription>
                Alerts requiring immediate attention ({filteredAlerts.length}{" "}
                alerts)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredAlerts}
                columns={alertsTableColumns}
                searchable={false}
                pagination={{
                  pageSize: 15,
                  showSizeSelector: true,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Critical Alerts</CardTitle>
              <CardDescription>
                High priority alerts requiring immediate intervention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredAlerts.filter(
                  (alert) => alert.severity === "critical",
                )}
                columns={alertsTableColumns}
                searchable={false}
                pagination={{
                  pageSize: 10,
                  showSizeSelector: false,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Alerts</CardTitle>
              <CardDescription>
                Previously resolved performance alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No resolved alerts to display
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Alert Trends</CardTitle>
                <CardDescription>Alert frequency over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Alert trends chart would be displayed here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Time</CardTitle>
                <CardDescription>
                  Average time to resolve alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Resolution time metrics would be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
