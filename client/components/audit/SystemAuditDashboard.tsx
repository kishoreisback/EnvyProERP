import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  Activity,
  Search,
  Filter,
  Download,
  Calendar as CalendarIcon,
  User,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Eye,
  Clock,
  MapPin,
  Monitor,
  Lock,
  Unlock,
  UserCheck,
  FileText,
  Package,
  ShoppingCart,
  Handshake,
  TrendingUp,
  TrendingDown,
  BarChart3,
  RefreshCw,
  Settings,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { useLogger } from "../../hooks/useLogger";
import {
  SystemAuditLog,
  AuditFilter,
  AuditDashboardMetrics,
  SecurityEvent,
  AuditResourceType,
} from "./types";
import {
  generateSystemAuditLogs,
  generateAuditDashboardMetrics,
  generateAuditSummary,
  getHighRiskEvents,
  getRecentSecurityEvents,
} from "./data";

interface SystemAuditDashboardProps {
  tenantId: string;
  userRole: string;
}

export function SystemAuditDashboard({
  tenantId,
  userRole,
}: SystemAuditDashboardProps) {
  const { logUserAction } = useLogger();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLog, setSelectedLog] = useState<SystemAuditLog | null>(null);
  const [filters, setFilters] = useState<AuditFilter>({
    tenantId,
    resourceType: "all",
    module: "all",
    action: "all",
    severity: "all",
    status: "all",
    riskLevel: "all",
  });
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Mock data
  const auditLogs = useMemo(
    () => generateSystemAuditLogs(tenantId),
    [tenantId],
  );
  const dashboardMetrics = useMemo(
    () => generateAuditDashboardMetrics(tenantId),
    [tenantId],
  );
  const auditSummary = useMemo(
    () => generateAuditSummary(auditLogs),
    [auditLogs],
  );
  const highRiskEvents = useMemo(() => getHighRiskEvents(tenantId), [tenantId]);
  const securityEvents = useMemo(
    () => getRecentSecurityEvents(tenantId),
    [tenantId],
  );

  // Filter audit logs
  const filteredLogs = useMemo(() => {
    let filtered = auditLogs;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (log) =>
          log.userName.toLowerCase().includes(query) ||
          log.action.toLowerCase().includes(query) ||
          log.resource.toLowerCase().includes(query) ||
          log.module.toLowerCase().includes(query) ||
          log.description.toLowerCase().includes(query) ||
          log.ipAddress.includes(query),
      );
    }

    // Apply filters
    if (filters.resourceType && filters.resourceType !== "all") {
      filtered = filtered.filter(
        (log) => log.resourceType === filters.resourceType,
      );
    }
    if (filters.module && filters.module !== "all") {
      filtered = filtered.filter((log) => log.module === filters.module);
    }
    if (filters.severity && filters.severity !== "all") {
      filtered = filtered.filter((log) => log.severity === filters.severity);
    }
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((log) => log.status === filters.status);
    }
    if (filters.riskLevel && filters.riskLevel !== "all") {
      filtered = filtered.filter((log) => log.riskLevel === filters.riskLevel);
    }

    // Date range filter
    if (dateRange.from) {
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.timestamp);
        return logDate >= dateRange.from!;
      });
    }
    if (dateRange.to) {
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.timestamp);
        return logDate <= dateRange.to!;
      });
    }

    return filtered;
  }, [auditLogs, searchQuery, filters, dateRange]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    logUserAction("switch_audit_tab", "SystemAuditDashboard", { tab: newTab });
  };

  const getResourceIcon = (resourceType: AuditResourceType) => {
    switch (resourceType) {
      case "order":
        return <ShoppingCart className="h-4 w-4" />;
      case "inventory":
        return <Package className="h-4 w-4" />;
      case "purchase_order":
        return <FileText className="h-4 w-4" />;
      case "user":
        return <User className="h-4 w-4" />;
      case "role":
        return <Shield className="h-4 w-4" />;
      case "franchisee":
        return <Handshake className="h-4 w-4" />;
      case "authentication":
        return <Lock className="h-4 w-4" />;
      case "system":
        return <Settings className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      info: "default",
      warning: "secondary",
      error: "destructive",
      critical: "destructive",
    };
    return variants[severity as keyof typeof variants] || "outline";
  };

  const getRiskBadge = (riskLevel: string) => {
    const variants = {
      low: "default",
      medium: "secondary",
      high: "destructive",
      critical: "destructive",
    };
    return variants[riskLevel as keyof typeof variants] || "outline";
  };

  const getStatusIcon = (status: string) => {
    return status === "success" ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : status === "failure" ? (
      <XCircle className="h-4 w-4 text-red-600" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
    );
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <div className="h-4 w-4" />;
  };

  const exportAuditLogs = () => {
    logUserAction("export_audit_logs", "SystemAuditDashboard", {
      recordCount: filteredLogs.length,
      format: "csv",
    });

    const csv = [
      [
        "Timestamp",
        "User",
        "Action",
        "Resource",
        "Module",
        "Status",
        "Severity",
        "Risk Level",
        "IP Address",
        "Description",
      ].join(","),
      ...filteredLogs.map((log) =>
        [
          log.timestamp,
          log.userName,
          log.action,
          log.resource,
          log.module,
          log.status,
          log.severity,
          log.riskLevel,
          log.ipAddress,
          `"${log.description.replace(/"/g, '""')}"`,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `system-audit-logs-${tenantId}-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const refreshData = () => {
    logUserAction("refresh_audit_data", "SystemAuditDashboard");
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-6 w-6" />
            System Audit Trail
          </h1>
          <p className="text-muted-foreground">
            Comprehensive audit trail for all system activities across{" "}
            {tenantId}
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={refreshData} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={exportAuditLogs} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="security">Security Events</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Total Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={dashboardMetrics.totalEvents} />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getTrendIcon(dashboardMetrics.eventsTrend)}
                  {Math.abs(dashboardMetrics.eventsTrend)}% vs yesterday
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  Critical Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  <AnimatedCounter value={dashboardMetrics.criticalEvents} />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getTrendIcon(dashboardMetrics.riskTrend)}
                  {Math.abs(dashboardMetrics.riskTrend)}% vs yesterday
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  Security Incidents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  <AnimatedCounter value={dashboardMetrics.securityIncidents} />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getTrendIcon(dashboardMetrics.securityTrend)}
                  {Math.abs(dashboardMetrics.securityTrend)}% vs yesterday
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-orange-600" />
                  Failed Operations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  <AnimatedCounter value={dashboardMetrics.failedOperations} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Requires attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4 text-green-600" />
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  <AnimatedCounter value={dashboardMetrics.uniqueActiveUsers} />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getTrendIcon(dashboardMetrics.userActivityTrend)}
                  {Math.abs(dashboardMetrics.userActivityTrend)}% vs yesterday
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Distribution and Module Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Events by risk level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardMetrics.riskDistribution.map((risk) => (
                  <div
                    key={risk.level}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant={getRiskBadge(risk.level) as any}>
                        {risk.level}
                      </Badge>
                      <span className="text-sm">{risk.count} events</span>
                    </div>
                    <span className="text-sm font-medium">
                      {risk.percentage}%
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Module Activity</CardTitle>
                <CardDescription>Events by system module</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardMetrics.moduleActivity.slice(0, 5).map((module) => (
                  <div
                    key={module.module}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {getResourceIcon(module.module as AuditResourceType)}
                      <span className="text-sm capitalize">
                        {module.module}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{module.events}</span>
                      <span className="text-xs text-muted-foreground">
                        {module.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Top Users and Recent Critical Events */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Active Users</CardTitle>
                <CardDescription>
                  Users with highest activity today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardMetrics.topUsers.map((user, index) => (
                    <div
                      key={user.userId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {user.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {user.userName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {user.eventCount} events
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          user.riskScore > 10
                            ? "destructive"
                            : user.riskScore > 5
                              ? "secondary"
                              : "default"
                        }
                      >
                        Risk: {user.riskScore}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Critical Events</CardTitle>
                <CardDescription>
                  High priority events requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardMetrics.recentCriticalEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {event.description}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(event.timestamp), "MMM dd, HH:mm")} •{" "}
                          {event.userName}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedLog(event)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search audit logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={filters.resourceType}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  resourceType: value as AuditResourceType | "all",
                }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="order">Orders</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="purchase_order">Purchase Orders</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="authentication">Authentication</SelectItem>
                <SelectItem value="franchisee">Franchisees</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.severity}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, severity: value }))
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failure">Failure</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[200px]">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd")} -{" "}
                        {format(dateRange.to, "LLL dd")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    "Pick date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range) => {
                    setDateRange({
                      from: range?.from,
                      to: range?.to,
                    });
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Audit Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs ({filteredLogs.length})</CardTitle>
              <CardDescription>
                Detailed activity log showing {filteredLogs.length} of{" "}
                {auditLogs.length} total events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.slice(0, 50).map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="text-sm">
                            <div>
                              {format(new Date(log.timestamp), "MMM dd, yyyy")}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {format(new Date(log.timestamp), "HH:mm:ss")}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-xs font-medium">
                                {log.userName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">{log.userName}</div>
                              <div className="text-xs text-muted-foreground">
                                {log.userRole}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getResourceIcon(log.resourceType)}
                            <span className="font-medium text-sm">
                              {log.action}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium truncate max-w-[150px]">
                              {log.resource}
                            </div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {log.resourceType}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {log.module}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(log.status)}
                            <Badge
                              variant={
                                log.status === "success"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {log.status}
                            </Badge>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge variant={getRiskBadge(log.riskLevel) as any}>
                            {log.riskLevel}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedLog(log)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredLogs.length === 0 && (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">
                    No audit logs found
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Events Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Events</CardTitle>
              <CardDescription>
                Authentication and security-related events from the last 24
                hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.slice(0, 20).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      {event.status === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{event.userName}</span>
                        <Badge
                          variant={
                            event.status === "success"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {event.action.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(
                            new Date(event.timestamp),
                            "MMM dd, HH:mm:ss",
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.ipAddress}
                        </span>
                        {event.geolocation && (
                          <span className="flex items-center gap-1">
                            <Monitor className="h-3 w-3" />
                            {event.geolocation.city}, {event.geolocation.region}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Analysis Tab */}
        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>High Risk Events</CardTitle>
              <CardDescription>
                Events marked as high or critical risk requiring immediate
                attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {highRiskEvents.slice(0, 15).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-4 border-l-4 border-red-500 bg-red-50 rounded-lg"
                  >
                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{event.userName}</span>
                        <Badge variant="destructive">
                          {event.riskLevel} risk
                        </Badge>
                        <Badge variant="outline">{event.module}</Badge>
                      </div>
                      <p className="text-sm mb-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          {format(new Date(event.timestamp), "MMM dd, HH:mm")}
                        </span>
                        <span>{event.ipAddress}</span>
                        <span className="capitalize">{event.resourceType}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedLog(event)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Reports</CardTitle>
              <CardDescription>
                Generate and download comprehensive audit reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <BarChart3 className="h-6 w-6" />
                  Daily Summary Report
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Shield className="h-6 w-6" />
                  Security Incident Report
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  Risk Assessment Report
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <User className="h-6 w-6" />
                  User Activity Report
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  Compliance Report
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Download className="h-6 w-6" />
                  Custom Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detailed Log Modal */}
      {selectedLog && (
        <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Audit Log Details</DialogTitle>
              <DialogDescription>
                Detailed information for audit event {selectedLog.id}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Event Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Action:</span>{" "}
                      {selectedLog.action}
                    </div>
                    <div>
                      <span className="font-medium">Resource:</span>{" "}
                      {selectedLog.resource}
                    </div>
                    <div>
                      <span className="font-medium">Module:</span>{" "}
                      {selectedLog.module}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>{" "}
                      {selectedLog.status}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">User Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">User:</span>{" "}
                      {selectedLog.userName}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedLog.userEmail}
                    </div>
                    <div>
                      <span className="font-medium">Role:</span>{" "}
                      {selectedLog.userRole}
                    </div>
                    <div>
                      <span className="font-medium">IP:</span>{" "}
                      {selectedLog.ipAddress}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm bg-muted p-3 rounded">
                  {selectedLog.description}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Risk Assessment</h4>
                <div className="flex gap-2">
                  <Badge
                    variant={getSeverityBadge(selectedLog.severity) as any}
                  >
                    {selectedLog.severity} severity
                  </Badge>
                  <Badge variant={getRiskBadge(selectedLog.riskLevel) as any}>
                    {selectedLog.riskLevel} risk
                  </Badge>
                </div>
              </div>

              {selectedLog.details && (
                <div>
                  <h4 className="font-medium mb-2">Additional Details</h4>
                  <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                    {JSON.stringify(selectedLog.details, null, 2)}
                  </pre>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Timestamp</h4>
                <p className="text-sm">
                  {format(new Date(selectedLog.timestamp), "PPpp")}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
