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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
} from "lucide-react";
import { format } from "date-fns";
import { usePermissions, ProtectedComponent } from "./PermissionProvider";
import { AuditLog } from "./types";

interface AuditTrailProps {
  tenantId: string;
  auditLogs: AuditLog[];
}

// Action categories for filtering
const actionCategories = [
  { value: "all", label: "All Actions" },
  { value: "user", label: "User Actions" },
  { value: "role", label: "Role Actions" },
  { value: "permission", label: "Permission Actions" },
  { value: "authentication", label: "Authentication" },
  { value: "system", label: "System Actions" },
];

// Severity levels
const severityLevels = [
  { value: "all", label: "All Severities" },
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
  { value: "critical", label: "Critical" },
];

export function AuditTrail({ tenantId, auditLogs }: AuditTrailProps) {
  const { hasPermission } = usePermissions();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAction, setFilterAction] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

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
          log.resourceType.toLowerCase().includes(query) ||
          log.ipAddress.includes(query),
      );
    }

    // Action category filter
    if (filterAction !== "all") {
      filtered = filtered.filter((log) => {
        if (filterAction === "user") {
          return log.action.startsWith("user.");
        } else if (filterAction === "role") {
          return log.action.startsWith("role.");
        } else if (filterAction === "permission") {
          return log.action.startsWith("permission.");
        } else if (filterAction === "authentication") {
          return log.resourceType === "authentication";
        } else if (filterAction === "system") {
          return log.resourceType === "system";
        }
        return true;
      });
    }

    // Severity filter
    if (filterSeverity !== "all") {
      filtered = filtered.filter((log) => log.severity === filterSeverity);
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((log) => log.status === filterStatus);
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

    // Sort by timestamp (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }, [
    auditLogs,
    searchQuery,
    filterAction,
    filterSeverity,
    filterStatus,
    dateRange,
  ]);

  const getActionIcon = (action: string) => {
    if (action.includes("user")) return <User className="h-4 w-4" />;
    if (action.includes("role")) return <Shield className="h-4 w-4" />;
    if (action.includes("login") || action.includes("logout"))
      return <Activity className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-700" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "success" ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  const formatActionName = (action: string) => {
    return action
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const exportAuditLogs = () => {
    // In a real application, this would generate and download a CSV/Excel file
    const csv = [
      [
        "Timestamp",
        "User",
        "Action",
        "Resource",
        "Status",
        "IP Address",
        "Severity",
      ].join(","),
      ...filteredLogs.map((log) =>
        [
          log.timestamp,
          log.userName,
          log.action,
          log.resource,
          log.status,
          log.ipAddress,
          log.severity,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-logs-${tenantId}-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Audit Trail
          </h2>
          <p className="text-muted-foreground">
            Track all user activities and system changes for tenant: {tenantId}
          </p>
        </div>

        <ProtectedComponent permission="user_management.view_audit">
          <Button onClick={exportAuditLogs} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </ProtectedComponent>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {actionCategories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterSeverity} onValueChange={setFilterSeverity}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {severityLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failure">Failure</SelectItem>
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
                "Pick a date range"
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

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Total Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredLogs.length}</div>
            <p className="text-xs text-muted-foreground">
              {auditLogs.length} total records
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Successful Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {filteredLogs.filter((log) => log.status === "success").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (filteredLogs.filter((log) => log.status === "success").length /
                  filteredLogs.length) *
                  100,
              ) || 0}
              % success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Failed Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {filteredLogs.filter((log) => log.status === "failure").length}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Critical Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {
                filteredLogs.filter(
                  (log) =>
                    log.severity === "critical" || log.severity === "error",
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              High priority events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs ({filteredLogs.length})</CardTitle>
          <CardDescription>
            Detailed activity log for all user actions
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
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <div className="text-sm">
                          <div>
                            {format(new Date(log.timestamp), "MMM dd, yyyy")}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(log.timestamp), "HH:mm:ss")}
                          </div>
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
                            {log.userId}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <span className="font-medium">
                          {formatActionName(log.action)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{log.resource}</div>
                        <div className="text-xs text-muted-foreground">
                          {log.resourceType}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className="capitalize">{log.status}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(log.severity)}
                        <Badge variant={getSeverityBadge(log.severity) as any}>
                          {log.severity}
                        </Badge>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {log.ipAddress}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-3">
                            <h4 className="font-medium">Event Details</h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium">User Agent:</span>
                                <p className="text-xs text-muted-foreground break-all">
                                  {log.userAgent}
                                </p>
                              </div>
                              {log.details && (
                                <div>
                                  <span className="font-medium">
                                    Additional Details:
                                  </span>
                                  <pre className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap bg-muted p-2 rounded">
                                    {JSON.stringify(log.details, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
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
    </div>
  );
}
