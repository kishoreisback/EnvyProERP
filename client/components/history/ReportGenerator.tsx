import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/shared/DataTable";
import {
  Download,
  FileText,
  Table,
  Calendar,
  Settings,
  Play,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Eye,
  Edit,
  Copy,
} from "lucide-react";
import {
  generateReportConfigurations,
  generateOrderHistory,
  generateInventoryMovements,
} from "./data";
import { ReportConfiguration, HistoryFilters } from "./types";

interface ReportGeneratorProps {
  tenantId: string;
  userType: string;
}

export function ReportGenerator({ tenantId, userType }: ReportGeneratorProps) {
  const [selectedTab, setSelectedTab] = useState("generate");
  const [reportConfig, setReportConfig] = useState<
    Partial<ReportConfiguration>
  >({
    name: "",
    type: "order_history",
    format: "pdf",
    layout: "summary",
    includeCharts: true,
    includeSummary: true,
    filters: {
      dateRange: {
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
      },
    },
    isScheduled: false,
  });

  // Generate mock data
  const savedReports = useMemo(
    () => generateReportConfigurations(tenantId),
    [tenantId],
  );
  const orderHistory = useMemo(
    () => generateOrderHistory(tenantId, userType),
    [tenantId, userType],
  );
  const movements = useMemo(
    () => generateInventoryMovements(tenantId, userType),
    [tenantId, userType],
  );

  // Available columns for different report types
  const availableColumns = {
    order_history: [
      { key: "orderNumber", label: "Order Number", dataType: "string" },
      { key: "orderType", label: "Order Type", dataType: "string" },
      { key: "orderDate", label: "Order Date", dataType: "date" },
      { key: "customerName", label: "Customer/Supplier", dataType: "string" },
      { key: "status", label: "Status", dataType: "string" },
      { key: "totalValue", label: "Total Value", dataType: "currency" },
      { key: "paymentStatus", label: "Payment Status", dataType: "string" },
      { key: "deliveryStatus", label: "Delivery Status", dataType: "string" },
      { key: "totalItems", label: "Total Items", dataType: "number" },
      { key: "totalQuantity", label: "Total Quantity", dataType: "number" },
    ],
    inventory_movement: [
      { key: "itemCode", label: "Item Code", dataType: "string" },
      { key: "itemName", label: "Item Name", dataType: "string" },
      { key: "category", label: "Category", dataType: "string" },
      { key: "movementType", label: "Movement Type", dataType: "string" },
      { key: "transactionType", label: "Transaction Type", dataType: "string" },
      { key: "quantity", label: "Quantity", dataType: "number" },
      { key: "unit", label: "Unit", dataType: "string" },
      { key: "unitCost", label: "Unit Cost", dataType: "currency" },
      { key: "totalCost", label: "Total Cost", dataType: "currency" },
      { key: "warehouseName", label: "Warehouse", dataType: "string" },
      { key: "performedAt", label: "Date & Time", dataType: "date" },
      { key: "performedBy", label: "Performed By", dataType: "string" },
    ],
    analytics: [
      { key: "period", label: "Period", dataType: "string" },
      { key: "totalOrders", label: "Total Orders", dataType: "number" },
      { key: "totalValue", label: "Total Value", dataType: "currency" },
      { key: "completionRate", label: "Completion Rate", dataType: "number" },
      {
        key: "avgProcessingTime",
        label: "Avg Processing Time",
        dataType: "number",
      },
    ],
  };

  const handleGenerateReport = () => {
    console.log("Generating report with config:", reportConfig);
    // In a real application, this would trigger the report generation API
    alert(
      "Report generation started! You will receive an email when it's ready.",
    );
  };

  const handleScheduleReport = () => {
    console.log("Scheduling report with config:", reportConfig);
    alert("Report scheduled successfully!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "processing":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const savedReportsColumns = [
    {
      key: "name",
      label: "Report Name",
      sortable: true,
      render: (record: ReportConfiguration) => (
        <div>
          <div className="font-medium">{record.name}</div>
          <div className="text-xs text-gray-500 capitalize">
            {record.type?.replace("_", " ") || "Unknown"}
          </div>
        </div>
      ),
    },
    {
      key: "format",
      label: "Format",
      render: (record: ReportConfiguration) => (
        <Badge variant="outline" className="uppercase">
          {record?.format || "Unknown"}
        </Badge>
      ),
    },
    {
      key: "schedule",
      label: "Schedule",
      render: (record: ReportConfiguration) => (
        <div>
          {record?.isScheduled ? (
            <div>
              <Badge variant="outline">{record.schedule?.frequency}</Badge>
              <div className="text-xs text-gray-500 mt-1">
                at {record.schedule?.time}
              </div>
            </div>
          ) : (
            <Badge variant="outline">Manual</Badge>
          )}
        </div>
      ),
    },
    {
      key: "lastRun",
      label: "Last Run",
      render: (record: ReportConfiguration) => (
        <div>
          {record?.lastRunAt ? (
            <div>
              <div className="text-sm">{formatDate(record.lastRunAt)}</div>
              <div className="text-xs text-gray-500">
                {new Date(record.lastRunAt).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ) : (
            <span className="text-gray-400">Never</span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (record: ReportConfiguration) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(record?.isActive ? "completed" : "failed")}
          <span>{record?.isActive ? "Active" : "Inactive"}</span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (record: ReportConfiguration) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Copy className="h-4 w-4" />
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
          <h2 className="text-3xl font-bold tracking-tight">
            Report Generator
          </h2>
          <p className="text-muted-foreground">
            Generate and schedule downloadable reports
          </p>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Report Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Report Configuration</CardTitle>
                <CardDescription>
                  Configure your report settings and filters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Settings */}
                <div className="space-y-2">
                  <Label htmlFor="reportName">Report Name</Label>
                  <Input
                    id="reportName"
                    placeholder="Enter report name..."
                    value={reportConfig.name}
                    onChange={(e) =>
                      setReportConfig((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select
                      value={reportConfig.type}
                      onValueChange={(value) =>
                        setReportConfig((prev) => ({
                          ...prev,
                          type: value as any,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order_history">
                          Order History
                        </SelectItem>
                        <SelectItem value="inventory_movement">
                          Inventory Movement
                        </SelectItem>
                        <SelectItem value="analytics">
                          Analytics Summary
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Format</Label>
                    <Select
                      value={reportConfig.format}
                      onValueChange={(value) =>
                        setReportConfig((prev) => ({
                          ...prev,
                          format: value as any,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Layout</Label>
                    <Select
                      value={reportConfig.layout}
                      onValueChange={(value) =>
                        setReportConfig((prev) => ({
                          ...prev,
                          layout: value as any,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Summary</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <DateRangePicker
                      value={{
                        from: new Date(
                          reportConfig.filters?.dateRange?.startDate || "",
                        ),
                        to: new Date(
                          reportConfig.filters?.dateRange?.endDate || "",
                        ),
                      }}
                      onChange={(range) => {
                        if (range?.from && range?.to) {
                          setReportConfig((prev) => ({
                            ...prev,
                            filters: {
                              ...prev.filters,
                              dateRange: {
                                startDate: range.from
                                  .toISOString()
                                  .split("T")[0],
                                endDate: range.to.toISOString().split("T")[0],
                              },
                            },
                          }));
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <Label>Include Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeCharts"
                        checked={reportConfig.includeCharts}
                        onCheckedChange={(checked) =>
                          setReportConfig((prev) => ({
                            ...prev,
                            includeCharts: !!checked,
                          }))
                        }
                      />
                      <Label htmlFor="includeCharts">Include Charts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeSummary"
                        checked={reportConfig.includeSummary}
                        onCheckedChange={(checked) =>
                          setReportConfig((prev) => ({
                            ...prev,
                            includeSummary: !!checked,
                          }))
                        }
                      />
                      <Label htmlFor="includeSummary">Include Summary</Label>
                    </div>
                  </div>
                </div>

                {/* Scheduling */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isScheduled"
                      checked={reportConfig.isScheduled}
                      onCheckedChange={(checked) =>
                        setReportConfig((prev) => ({
                          ...prev,
                          isScheduled: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="isScheduled">Schedule this report</Label>
                  </div>

                  {reportConfig.isScheduled && (
                    <div className="grid gap-4 md:grid-cols-2 pl-6">
                      <div className="space-y-2">
                        <Label>Frequency</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input type="time" defaultValue="09:00" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleGenerateReport} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Now
                  </Button>
                  {reportConfig.isScheduled && (
                    <Button variant="outline" onClick={handleScheduleReport}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  Preview of your report configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Report Type:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {reportConfig.type?.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Format:</span>
                      <Badge variant="outline" className="uppercase">
                        {reportConfig.format}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Date Range:</span>
                      <span className="text-sm">
                        {reportConfig.filters?.dateRange
                          ? `${formatDate(reportConfig.filters.dateRange.startDate)} - ${formatDate(reportConfig.filters.dateRange.endDate)}`
                          : "Not set"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Include Charts:
                      </span>
                      <span className="text-sm">
                        {reportConfig.includeCharts ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Scheduled:</span>
                      <span className="text-sm">
                        {reportConfig.isScheduled ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>

                  {/* Sample Data Preview */}
                  <div className="border rounded-lg p-3">
                    <h4 className="text-sm font-medium mb-2">Sample Data</h4>
                    <div className="text-xs space-y-1">
                      {reportConfig.type === "order_history" && (
                        <div>
                          <div className="font-mono">
                            Orders: {orderHistory.length}
                          </div>
                          <div className="text-gray-500">
                            Latest: {orderHistory[0]?.orderNumber} -{" "}
                            {orderHistory[0]?.customerName}
                          </div>
                        </div>
                      )}
                      {reportConfig.type === "inventory_movement" && (
                        <div>
                          <div className="font-mono">
                            Movements: {movements.length}
                          </div>
                          <div className="text-gray-500">
                            Latest: {movements[0]?.itemName} -{" "}
                            {movements[0]?.movementType}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Report Templates</CardTitle>
              <CardDescription>
                Manage your saved report configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={savedReports}
                columns={savedReportsColumns}
                searchable={true}
                pagination={{
                  pageSize: 10,
                  showSizeSelector: true,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>
                View and manage scheduled report executions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={savedReports.filter((report) => report.isScheduled)}
                columns={savedReportsColumns}
                searchable={true}
                pagination={{
                  pageSize: 10,
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
