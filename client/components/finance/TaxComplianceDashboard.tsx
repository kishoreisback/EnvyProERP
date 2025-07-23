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
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  Shield,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Download,
  Upload,
  Settings,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Building2,
  Users,
  Gavel,
  TreePine,
  Factory,
  Briefcase,
  CreditCard,
  Receipt,
  FileCheck,
  AlertCircle,
  Target,
  BarChart3,
  PieChart,
  RefreshCw,
  Bell,
  BookOpen,
  Calculator,
  Globe,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

// Import compliance types and data
import {
  GSTReturn,
  TDSReturn,
  ITReturn,
  LabourCompliance,
  EnvironmentalCompliance,
  IndustryCompliance,
  ComplianceCalendar,
  TaxConfiguration,
  ComplianceAnalytics,
  ComplianceStatus,
  ComplianceReport,
  GSTReturnType,
  ITReturnType,
  LabourComplianceType,
  EnvironmentalComplianceType,
} from "./compliance-types";

import {
  getGSTReturnsByTenant,
  getTDSReturnsByTenant,
  getITReturnsByTenant,
  getLabourCompliancesByTenant,
  getEnvironmentalCompliancesByTenant,
  getIndustryCompliancesByTenant,
  getTaxConfigurationByTenant,
  getComplianceCalendarByTenant,
  getComplianceAnalyticsByTenant,
  getComplianceReportsByTenant,
  industryComplianceRequirements,
  statutoryDueDates,
} from "./compliance-data";

import { useToast } from "../ui/use-toast";
import { GSTReturnModal } from "./modals/GSTReturnModal";
import { TDSReturnModal } from "./modals/TDSReturnModal";

interface TaxComplianceDashboardProps {
  tenantId: string;
  tenantName: string;
  tenantIndustry: string;
}

export function TaxComplianceDashboard({
  tenantId,
  tenantName,
  tenantIndustry,
}: TaxComplianceDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("2024-Q1");

  // Modal states
  const [modals, setModals] = useState({
    gstReturn: false,
    tdsReturn: false,
    itReturn: false,
    labourCompliance: false,
    environmentalCompliance: false,
    industryCompliance: false,
    taxConfiguration: false,
    complianceCalendar: false,
    generateReport: false,
  });

  const [selectedCompliance, setSelectedCompliance] = useState<any>(null);

  const { toast } = useToast();

  // Get compliance data
  const gstReturns = getGSTReturnsByTenant(tenantId);
  const tdsReturns = getTDSReturnsByTenant(tenantId);
  const itReturns = getITReturnsByTenant(tenantId);
  const labourCompliances = getLabourCompliancesByTenant(tenantId);
  const environmentalCompliances =
    getEnvironmentalCompliancesByTenant(tenantId);
  const industryCompliances = getIndustryCompliancesByTenant(tenantId);
  const taxConfiguration = getTaxConfigurationByTenant(tenantId);
  const complianceCalendar = getComplianceCalendarByTenant(tenantId);
  const complianceAnalytics = getComplianceAnalyticsByTenant(tenantId);
  const complianceReports = getComplianceReportsByTenant(tenantId);

  // Calculate compliance metrics
  const complianceMetrics = useMemo(() => {
    if (!complianceAnalytics) {
      return {
        totalCompliances: 0,
        completedCompliances: 0,
        pendingCompliances: 0,
        overdueCompliances: 0,
        complianceScore: 0,
        totalTaxPaid: 0,
        totalPenalties: 0,
        upcomingDeadlines: 0,
      };
    }

    const upcomingDeadlines =
      complianceCalendar?.entries.filter((entry) => {
        const dueDate = new Date(entry.dueDate);
        const today = new Date();
        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && diffDays >= 0 && entry.status === "pending";
      }).length || 0;

    return {
      totalCompliances: complianceAnalytics.totalCompliances,
      completedCompliances: complianceAnalytics.completedCompliances,
      pendingCompliances: complianceAnalytics.pendingCompliances,
      overdueCompliances: complianceAnalytics.overdueCompliances,
      complianceScore: complianceAnalytics.complianceScore,
      totalTaxPaid: complianceAnalytics.totalTaxPaid,
      totalPenalties: complianceAnalytics.totalPenalties,
      upcomingDeadlines,
    };
  }, [complianceAnalytics, complianceCalendar]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format large amounts
  const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toLocaleString();
  };

  // Get status color
  const getStatusColor = (status: ComplianceStatus) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      filed: "bg-green-100 text-green-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      overdue: "bg-red-100 text-red-800",
      exempted: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Get priority color
  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    };
    return colors[priority];
  };

  // Close modal helper
  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
    setSelectedCompliance(null);
  };

  // Handle compliance actions
  const handleFileReturn = (type: string) => {
    toast({
      title: "Return Filed",
      description: `${type} return has been filed successfully`,
    });
  };

  const handleGenerateReport = (type: string) => {
    toast({
      title: "Report Generated",
      description: `${type} report has been generated and is ready for download`,
    });
    closeModal("generateReport");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold">Tax & Compliance</h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive statutory compliance management for {tenantName}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="gap-1">
              <Building2 className="h-3 w-3" />
              {tenantName}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {tenantIndustry.toUpperCase()}
            </Badge>
            {taxConfiguration?.gstNumber && (
              <Badge variant="outline" className="text-xs">
                GST: {taxConfiguration.gstNumber}
              </Badge>
            )}
            {taxConfiguration?.panNumber && (
              <Badge variant="outline" className="text-xs">
                PAN: {taxConfiguration.panNumber}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-Q1">Q1 2024</SelectItem>
              <SelectItem value="2023-Q4">Q4 2023</SelectItem>
              <SelectItem value="2023-Q3">Q3 2023</SelectItem>
              <SelectItem value="2023-Q2">Q2 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setModals((prev) => ({ ...prev, taxConfiguration: true }))
            }
          >
            <Settings className="h-4 w-4 mr-2" />
            Configuration
          </Button>
        </div>
      </div>

      {/* Compliance Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Compliance Score
            </CardTitle>
            <Target className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={complianceMetrics.complianceScore}
                suffix="%"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Industry benchmark: 78.2%
            </p>
            <Progress
              value={complianceMetrics.complianceScore}
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Tax Paid
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={complianceMetrics.totalTaxPaid / 10000000}
                suffix="Cr"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(complianceMetrics.totalTaxPaid)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Compliances
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={complianceMetrics.pendingCompliances} />
            </div>
            <p className="text-xs text-muted-foreground">
              {complianceMetrics.upcomingDeadlines} due in 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Penalties & Interest
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={complianceMetrics.totalPenalties / 1000}
                suffix="K"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(complianceMetrics.totalPenalties)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 text-xs"
          >
            <BarChart3 className="h-3 w-3" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="gst" className="flex items-center gap-2 text-xs">
            <Receipt className="h-3 w-3" />
            GST
          </TabsTrigger>
          <TabsTrigger value="tds" className="flex items-center gap-2 text-xs">
            <CreditCard className="h-3 w-3" />
            TDS
          </TabsTrigger>
          <TabsTrigger
            value="income_tax"
            className="flex items-center gap-2 text-xs"
          >
            <FileText className="h-3 w-3" />
            Income Tax
          </TabsTrigger>
          <TabsTrigger
            value="labour"
            className="flex items-center gap-2 text-xs"
          >
            <Users className="h-3 w-3" />
            Labour
          </TabsTrigger>
          <TabsTrigger
            value="environmental"
            className="flex items-center gap-2 text-xs"
          >
            <TreePine className="h-3 w-3" />
            Environmental
          </TabsTrigger>
          <TabsTrigger
            value="industry"
            className="flex items-center gap-2 text-xs"
          >
            <Factory className="h-3 w-3" />
            Industry
          </TabsTrigger>
          <TabsTrigger
            value="calendar"
            className="flex items-center gap-2 text-xs"
          >
            <Calendar className="h-3 w-3" />
            Calendar
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Compliance Status Overview */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status Distribution</CardTitle>
                <CardDescription>
                  Current compliance status breakdown
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <span className="font-medium">
                    {complianceMetrics.completedCompliances}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="font-medium">
                    {complianceMetrics.pendingCompliances}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm">Overdue</span>
                  </div>
                  <span className="font-medium">
                    {complianceMetrics.overdueCompliances}
                  </span>
                </div>
                <div className="pt-4">
                  <div className="text-2xl font-bold text-center">
                    {complianceMetrics.totalCompliances}
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Total Compliances
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Payment Summary</CardTitle>
                <CardDescription>
                  Tax payments for current period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceAnalytics && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">GST Paid</span>
                      <span className="font-medium">
                        {formatCurrency(complianceAnalytics.gstPaid)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">TDS Paid</span>
                      <span className="font-medium">
                        {formatCurrency(complianceAnalytics.tdsPaid)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Income Tax Paid</span>
                      <span className="font-medium">
                        {formatCurrency(complianceAnalytics.incomeTaxPaid)}
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between font-bold">
                        <span>Total Tax Paid</span>
                        <span>
                          {formatCurrency(complianceAnalytics.totalTaxPaid)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Compliance Deadlines</CardTitle>
                <CardDescription>
                  Compliances due in the next 30 days
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceCalendar?.entries
                  .filter((entry) => {
                    const dueDate = new Date(entry.dueDate);
                    const today = new Date();
                    const diffTime = dueDate.getTime() - today.getTime();
                    const diffDays = Math.ceil(
                      diffTime / (1000 * 60 * 60 * 24),
                    );
                    return (
                      diffDays <= 30 &&
                      diffDays >= 0 &&
                      entry.status === "pending"
                    );
                  })
                  .slice(0, 5)
                  .map((entry) => {
                    const dueDate = new Date(entry.dueDate);
                    const today = new Date();
                    const diffTime = dueDate.getTime() - today.getTime();
                    const diffDays = Math.ceil(
                      diffTime / (1000 * 60 * 60 * 24),
                    );

                    return (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              diffDays <= 5
                                ? "bg-red-400"
                                : diffDays <= 15
                                  ? "bg-yellow-400"
                                  : "bg-green-400"
                            }`}
                          />
                          <div>
                            <p className="font-medium text-sm">
                              {entry.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Due: {dueDate.toLocaleDateString()} ({diffDays}{" "}
                              days left)
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={getPriorityColor(entry.priority)}
                          >
                            {entry.priority}
                          </Badge>
                          {entry.penalty && (
                            <p className="text-xs text-red-600 mt-1">
                              Penalty: {formatCurrency(entry.penalty)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Industry-Specific Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Industry-Specific Compliance Requirements</CardTitle>
              <CardDescription>
                Compliance requirements for {tenantIndustry} industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {(industryComplianceRequirements as any)[tenantIndustry]?.map(
                  (requirement: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 border rounded"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{requirement}</span>
                    </div>
                  ),
                ) || (
                  <p className="text-sm text-muted-foreground col-span-3">
                    No specific requirements defined for this industry
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common compliance actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-4">
                <Button
                  onClick={() =>
                    setModals((prev) => ({ ...prev, gstReturn: true }))
                  }
                  className="justify-start"
                >
                  <Receipt className="mr-2 h-4 w-4" />
                  File GST Return
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setModals((prev) => ({ ...prev, tdsReturn: true }))
                  }
                  className="justify-start"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  File TDS Return
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setModals((prev) => ({ ...prev, generateReport: true }))
                  }
                  className="justify-start"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("calendar")}
                  className="justify-start"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GST Tab */}
        <TabsContent value="gst" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">GST Compliance</h2>
              <p className="text-muted-foreground">
                Goods and Services Tax returns and compliance
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, gstReturn: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                File GST Return
              </Button>
            </div>
          </div>

          {/* GST Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  GST Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {taxConfiguration?.gstNumber}
                </div>
                <p className="text-xs text-muted-foreground">
                  Registered: {taxConfiguration?.gstRegistrationDate}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Returns Filed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{gstReturns.length}</div>
                <p className="text-xs text-muted-foreground">Current period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Tax Collected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {formatAmount(
                    gstReturns.reduce(
                      (sum, gst) => sum + gst.totalTaxCollected,
                      0,
                    ),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total GST collected
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  ITC Claimed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {formatAmount(
                    gstReturns.reduce((sum, gst) => sum + gst.netItc, 0),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Input Tax Credit
                </p>
              </CardContent>
            </Card>
          </div>

          {/* GST Returns Table */}
          <Card>
            <CardHeader>
              <CardTitle>GST Returns</CardTitle>
              <CardDescription>
                All GST returns filed for {tenantName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Return Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Filed Date</TableHead>
                    <TableHead>Tax Payable</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gstReturns.map((gstReturn) => (
                    <TableRow key={gstReturn.id}>
                      <TableCell className="font-medium uppercase">
                        {gstReturn.returnType}
                      </TableCell>
                      <TableCell>{gstReturn.period}</TableCell>
                      <TableCell>
                        {new Date(gstReturn.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {gstReturn.filingDate
                          ? new Date(gstReturn.filingDate).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(gstReturn.taxPayable)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(gstReturn.status)}>
                          {gstReturn.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedCompliance(gstReturn);
                                // View return details
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Return
                            </DropdownMenuItem>
                            {gstReturn.status === "pending" && (
                              <DropdownMenuItem
                                onClick={() => handleFileReturn("GST")}
                              >
                                <FileCheck className="mr-2 h-4 w-4" />
                                File Return
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TDS Tab */}
        <TabsContent value="tds" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">TDS Compliance</h2>
              <p className="text-muted-foreground">
                Tax Deducted at Source returns and deposits
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, tdsReturn: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                File TDS Return
              </Button>
            </div>
          </div>

          {/* TDS Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  TAN Number
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {taxConfiguration?.tanNumber}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tax Account Number
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Total Deductions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {formatAmount(
                    tdsReturns.reduce(
                      (sum, tds) => sum + tds.totalDeductions,
                      0,
                    ),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Current FY</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Total Deposited
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {formatAmount(
                    tdsReturns.reduce(
                      (sum, tds) => sum + tds.totalDeposited,
                      0,
                    ),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Deposited with government
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Interest & Penalty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {formatAmount(
                    tdsReturns.reduce(
                      (sum, tds) =>
                        sum + tds.interestPayable + tds.penaltyPayable,
                      0,
                    ),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Additional charges
                </p>
              </CardContent>
            </Card>
          </div>

          {/* TDS Returns Table */}
          <Card>
            <CardHeader>
              <CardTitle>TDS Returns</CardTitle>
              <CardDescription>
                Quarterly TDS returns and deposits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quarter</TableHead>
                    <TableHead>Financial Year</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Filed Date</TableHead>
                    <TableHead>Total Deductions</TableHead>
                    <TableHead>Total Deposited</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tdsReturns.map((tdsReturn) => (
                    <TableRow key={tdsReturn.id}>
                      <TableCell className="font-medium">
                        {tdsReturn.quarter}
                      </TableCell>
                      <TableCell>{tdsReturn.financialYear}</TableCell>
                      <TableCell>
                        {new Date(tdsReturn.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {tdsReturn.filingDate
                          ? new Date(tdsReturn.filingDate).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(tdsReturn.totalDeductions)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(tdsReturn.totalDeposited)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(tdsReturn.status)}>
                          {tdsReturn.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Challans
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Return
                            </DropdownMenuItem>
                            {tdsReturn.status === "pending" && (
                              <DropdownMenuItem
                                onClick={() => handleFileReturn("TDS")}
                              >
                                <FileCheck className="mr-2 h-4 w-4" />
                                File Return
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Income Tax Tab */}
        <TabsContent value="income_tax" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Income Tax Compliance</h2>
              <p className="text-muted-foreground">
                Income Tax returns and advance tax payments
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, itReturn: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                File IT Return
              </Button>
            </div>
          </div>

          {/* Income Tax Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  PAN Number
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {taxConfiguration?.panNumber}
                </div>
                <p className="text-xs text-muted-foreground">
                  Permanent Account Number
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Assessment Year
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {taxConfiguration?.itAssessmentYear}
                </div>
                <p className="text-xs text-muted-foreground">Current AY</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Tax Liability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {formatAmount(
                    itReturns.reduce((sum, itr) => sum + itr.taxLiability, 0),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total tax liability
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Refund Due
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {formatAmount(
                    itReturns.reduce(
                      (sum, itr) => sum + (itr.refundDue || 0),
                      0,
                    ),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Refund claimed</p>
              </CardContent>
            </Card>
          </div>

          {/* Income Tax Returns Table */}
          <Card>
            <CardHeader>
              <CardTitle>Income Tax Returns</CardTitle>
              <CardDescription>Annual Income Tax returns filed</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Return Type</TableHead>
                    <TableHead>Assessment Year</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Filed Date</TableHead>
                    <TableHead>Total Income</TableHead>
                    <TableHead>Tax Liability</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itReturns.map((itReturn) => (
                    <TableRow key={itReturn.id}>
                      <TableCell className="font-medium uppercase">
                        {itReturn.returnType}
                      </TableCell>
                      <TableCell>{itReturn.assessmentYear}</TableCell>
                      <TableCell>
                        {new Date(itReturn.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {itReturn.filingDate
                          ? new Date(itReturn.filingDate).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(itReturn.totalIncome)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(itReturn.taxLiability)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(itReturn.status)}>
                          {itReturn.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Return
                            </DropdownMenuItem>
                            {itReturn.status === "pending" && (
                              <DropdownMenuItem
                                onClick={() => handleFileReturn("Income Tax")}
                              >
                                <FileCheck className="mr-2 h-4 w-4" />
                                File Return
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Labour Tab */}
        <TabsContent value="labour" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Labour Law Compliance</h2>
              <p className="text-muted-foreground">
                PF, ESI, and other labour law compliances
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, labourCompliance: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                File Labour Return
              </Button>
            </div>
          </div>

          {/* Labour Compliance Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">PF Number</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">
                  {taxConfiguration?.pfNumber}
                </div>
                <p className="text-xs text-muted-foreground">Provident Fund</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  ESI Number
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">
                  {taxConfiguration?.esiNumber}
                </div>
                <p className="text-xs text-muted-foreground">
                  Employee State Insurance
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Total Employees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {labourCompliances[0]?.totalEmployees || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Current strength
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  PF Contribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {formatAmount(
                    labourCompliances
                      .filter((l) => l.complianceType === "pf_return")
                      .reduce((sum, l) => sum + (l.pfContribution || 0), 0),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Monthly contribution
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Labour Compliance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Labour Compliance Returns</CardTitle>
              <CardDescription>
                PF, ESI, and other labour law returns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Compliance Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Filed Date</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Contribution</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {labourCompliances.map((labourCompliance) => (
                    <TableRow key={labourCompliance.id}>
                      <TableCell className="font-medium capitalize">
                        {labourCompliance.complianceType.replace("_", " ")}
                      </TableCell>
                      <TableCell>{labourCompliance.period}</TableCell>
                      <TableCell>
                        {new Date(
                          labourCompliance.dueDate,
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {labourCompliance.filingDate
                          ? new Date(
                              labourCompliance.filingDate,
                            ).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>{labourCompliance.totalEmployees}</TableCell>
                      <TableCell>
                        {formatCurrency(
                          labourCompliance.pfContribution ||
                            labourCompliance.esiContribution ||
                            labourCompliance.bonusPayable ||
                            0,
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(labourCompliance.status)}
                        >
                          {labourCompliance.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Return
                            </DropdownMenuItem>
                            {labourCompliance.status === "pending" && (
                              <DropdownMenuItem
                                onClick={() => handleFileReturn("Labour")}
                              >
                                <FileCheck className="mr-2 h-4 w-4" />
                                File Return
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Environmental Tab */}
        <TabsContent value="environmental" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Environmental Compliance
              </h2>
              <p className="text-muted-foreground">
                Pollution control and environmental clearances
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() =>
                  setModals((prev) => ({
                    ...prev,
                    environmentalCompliance: true,
                  }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Compliance
              </Button>
            </div>
          </div>

          {/* Environmental Compliance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Environmental Compliance Records</CardTitle>
              <CardDescription>
                Pollution clearances and environmental audits
              </CardDescription>
            </CardHeader>
            <CardContent>
              {environmentalCompliances.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Compliance Type</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Air Emissions</TableHead>
                      <TableHead>Water Discharge</TableHead>
                      <TableHead>Waste Generated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {environmentalCompliances.map((envCompliance) => (
                      <TableRow key={envCompliance.id}>
                        <TableCell className="font-medium capitalize">
                          {envCompliance.complianceType.replace("_", " ")}
                        </TableCell>
                        <TableCell>{envCompliance.period}</TableCell>
                        <TableCell>
                          {new Date(envCompliance.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {envCompliance.airEmissions || "-"}
                        </TableCell>
                        <TableCell>
                          {envCompliance.waterDischarge || "-"}
                        </TableCell>
                        <TableCell>
                          {envCompliance.wasteGenerated || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getStatusColor(envCompliance.status)}
                          >
                            {envCompliance.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Report
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <TreePine className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">
                    No Environmental Compliance Records
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Add environmental compliance records to track pollution
                    control measures
                  </p>
                  <Button
                    onClick={() =>
                      setModals((prev) => ({
                        ...prev,
                        environmentalCompliance: true,
                      }))
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Compliance Record
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Industry Tab */}
        <TabsContent value="industry" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Industry-Specific Compliance
              </h2>
              <p className="text-muted-foreground">
                Industry-specific regulatory requirements for {tenantIndustry}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, industryCompliance: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Compliance
              </Button>
            </div>
          </div>

          {/* Industry Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Industry Requirements for {tenantIndustry}</CardTitle>
              <CardDescription>
                Regulatory requirements specific to your industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {(industryComplianceRequirements as any)[tenantIndustry]?.map(
                  (requirement: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 border rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">{requirement}</span>
                    </div>
                  ),
                ) || (
                  <p className="text-sm text-muted-foreground col-span-3">
                    No specific requirements defined for this industry
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Industry Compliance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Industry Compliance Records</CardTitle>
              <CardDescription>
                Industry-specific compliance filings and certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              {industryCompliances.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Compliance Type</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {industryCompliances.map((indCompliance) => (
                      <TableRow key={indCompliance.id}>
                        <TableCell className="font-medium capitalize">
                          {indCompliance.complianceType.replace("_", " ")}
                        </TableCell>
                        <TableCell>{indCompliance.period}</TableCell>
                        <TableCell>
                          {new Date(indCompliance.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="capitalize">
                          {indCompliance.industryType}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getStatusColor(indCompliance.status)}
                          >
                            {indCompliance.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Certificate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <Factory className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">
                    No Industry Compliance Records
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Add industry-specific compliance records to track regulatory
                    requirements
                  </p>
                  <Button
                    onClick={() =>
                      setModals((prev) => ({
                        ...prev,
                        industryCompliance: true,
                      }))
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Compliance Record
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Compliance Calendar</h2>
              <p className="text-muted-foreground">
                Statutory due dates and compliance deadlines
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Calendar
              </Button>
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, complianceCalendar: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
          </div>

          {/* Statutory Due Dates */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Compliances</CardTitle>
                <CardDescription>Due dates for monthly returns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {statutoryDueDates.monthly.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.compliance}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Badge variant="outline">{item.dueDate}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quarterly Compliances</CardTitle>
                <CardDescription>
                  Due dates for quarterly returns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {statutoryDueDates.quarterly.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.compliance}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Badge variant="outline">{item.dueDate}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Annual Compliances</CardTitle>
                <CardDescription>Due dates for annual returns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {statutoryDueDates.annually.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.compliance}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Badge variant="outline">{item.dueDate}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>
                Compliance deadlines for the next 90 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceCalendar?.entries
                  .filter((entry) => {
                    const dueDate = new Date(entry.dueDate);
                    const today = new Date();
                    const diffTime = dueDate.getTime() - today.getTime();
                    const diffDays = Math.ceil(
                      diffTime / (1000 * 60 * 60 * 24),
                    );
                    return diffDays <= 90 && diffDays >= 0;
                  })
                  .sort(
                    (a, b) =>
                      new Date(a.dueDate).getTime() -
                      new Date(b.dueDate).getTime(),
                  )
                  .map((entry) => {
                    const dueDate = new Date(entry.dueDate);
                    const today = new Date();
                    const diffTime = dueDate.getTime() - today.getTime();
                    const diffDays = Math.ceil(
                      diffTime / (1000 * 60 * 60 * 24),
                    );

                    return (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              diffDays <= 5
                                ? "bg-red-400"
                                : diffDays <= 15
                                  ? "bg-yellow-400"
                                  : "bg-green-400"
                            }`}
                          />
                          <div>
                            <h4 className="font-medium">{entry.description}</h4>
                            <p className="text-sm text-muted-foreground">
                              Due: {dueDate.toLocaleDateString()} •{" "}
                              {entry.frequency}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={getStatusColor(entry.status)}
                          >
                            {entry.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {diffDays} days left
                          </p>
                          {entry.penalty && entry.status === "overdue" && (
                            <p className="text-xs text-red-600">
                              Penalty: {formatCurrency(entry.penalty)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Generate Report Modal */}
      <Dialog
        open={modals.generateReport}
        onOpenChange={(open) => !open && closeModal("generateReport")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate Compliance Report</DialogTitle>
            <DialogDescription>
              Generate comprehensive compliance reports for statutory
              requirements
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reportType">Report Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliance_summary">
                      Compliance Summary
                    </SelectItem>
                    <SelectItem value="tax_summary">Tax Summary</SelectItem>
                    <SelectItem value="penalty_report">
                      Penalty Report
                    </SelectItem>
                    <SelectItem value="audit_trail">Audit Trail</SelectItem>
                    <SelectItem value="statutory_calendar">
                      Statutory Calendar
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reportPeriod">Period</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current_month">Current Month</SelectItem>
                    <SelectItem value="current_quarter">
                      Current Quarter
                    </SelectItem>
                    <SelectItem value="current_year">Current Year</SelectItem>
                    <SelectItem value="last_year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input type="date" />
              </div>
            </div>
            <div>
              <Label htmlFor="reportFormat">Export Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => closeModal("generateReport")}
            >
              Cancel
            </Button>
            <Button onClick={() => handleGenerateReport("Compliance")}>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* GST Return Modal */}
      <GSTReturnModal
        open={modals.gstReturn}
        onClose={() => closeModal("gstReturn")}
        tenantId={tenantId}
        gstNumber={taxConfiguration?.gstNumber || ""}
      />

      {/* TDS Return Modal */}
      <TDSReturnModal
        open={modals.tdsReturn}
        onClose={() => closeModal("tdsReturn")}
        tenantId={tenantId}
        tanNumber={taxConfiguration?.tanNumber || ""}
      />
    </div>
  );
}
