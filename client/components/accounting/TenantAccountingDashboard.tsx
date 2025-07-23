import React, { useState, useMemo, useEffect } from "react";
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
import { Switch } from "../ui/switch";
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
import { Separator } from "../ui/separator";
import {
  BookOpen,
  Calculator,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Users,
  Target,
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Receipt,
  CreditCard,
  Wallet,
  Banknote,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Bell,
  Shield,
  Globe,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Factory,
  TreePine,
  Briefcase,
  Laptop,
  Home,
} from "lucide-react";

// Import accounting types and data
import {
  AccountingTenant,
  TenantAccount,
  TenantJournalEntry,
  TenantBudget,
  TenantAccountingAnalytics,
  TenantCostCenter,
  AccountType,
  TransactionType,
  IndustryType,
  Currency,
  TransactionStatus,
} from "./types";

import {
  accountingTenants,
  getAccountsByTenant,
  getJournalEntriesByTenant,
  getBudgetsByTenant,
  getAnalyticsByTenant,
  getCostCentersByTenant,
  getTenantConfiguration,
  calculateLiquidityRatios,
  calculateProfitabilityRatios,
  getCurrentPeriod,
} from "./data";

import { useToast } from "../ui/use-toast";

interface TenantAccountingDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function TenantAccountingDashboard({
  currentTab = "overview",
  onTabChange,
}: TenantAccountingDashboardProps) {
  // State management
  const [selectedTenantId, setSelectedTenantId] = useState("tenant_buildcorp");
  const [activeTab, setActiveTab] = useState(currentTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("2024-03");
  const [dateRange, setDateRange] = useState({
    startDate: "2024-01-01",
    endDate: "2024-03-31",
  });

  // Modal states
  const [modals, setModals] = useState({
    createAccount: false,
    createJournalEntry: false,
    createBudget: false,
    bankReconciliation: false,
    assetManagement: false,
    periodClosing: false,
    auditTrail: false,
    tenantSettings: false,
    financialReports: false,
  });

  const [selectedItem, setSelectedItem] = useState<any>(null);

  const { toast } = useToast();

  // Get tenant-specific data
  const currentTenant = accountingTenants.find(
    (t) => t.id === selectedTenantId,
  );
  const accounts = getAccountsByTenant(selectedTenantId);
  const journalEntries = getJournalEntriesByTenant(selectedTenantId);
  const budgets = getBudgetsByTenant(selectedTenantId);
  const analytics = getAnalyticsByTenant(selectedTenantId);
  const costCenters = getCostCentersByTenant(selectedTenantId);
  const tenantConfig = getTenantConfiguration(selectedTenantId);

  // Sync activeTab with currentTab prop
  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  // Handle tab changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
  };

  // Handle tenant switching
  const handleTenantSwitch = (tenantId: string) => {
    setSelectedTenantId(tenantId);
    toast({
      title: "Tenant Switched",
      description: `Switched to ${accountingTenants.find((t) => t.id === tenantId)?.name}`,
    });
  };

  // Calculate financial metrics
  const financialMetrics = useMemo(() => {
    if (!analytics) {
      return {
        totalAssets: 0,
        totalLiabilities: 0,
        totalEquity: 0,
        totalRevenue: 0,
        totalExpenses: 0,
        netIncome: 0,
        currentRatio: 0,
        grossProfitMargin: 0,
        netProfitMargin: 0,
        returnOnAssets: 0,
      };
    }

    const totalAssets = accounts
      .filter((acc) => acc.accountType === "assets")
      .reduce((sum, acc) => sum + acc.currentBalance, 0);

    const totalLiabilities = accounts
      .filter((acc) => acc.accountType === "liabilities")
      .reduce((sum, acc) => sum + Math.abs(acc.currentBalance), 0);

    const totalEquity = accounts
      .filter((acc) => acc.accountType === "equity")
      .reduce((sum, acc) => sum + Math.abs(acc.currentBalance), 0);

    const totalRevenue = accounts
      .filter((acc) => acc.accountType === "revenue")
      .reduce((sum, acc) => sum + Math.abs(acc.currentBalance), 0);

    const totalExpenses = accounts
      .filter((acc) => acc.accountType === "expenses")
      .reduce((sum, acc) => sum + acc.currentBalance, 0);

    const netIncome = totalRevenue - totalExpenses;

    return {
      totalAssets,
      totalLiabilities,
      totalEquity,
      totalRevenue,
      totalExpenses,
      netIncome,
      currentRatio: analytics.liquidityRatios.currentRatio,
      grossProfitMargin: analytics.profitabilityRatios.grossProfitMargin,
      netProfitMargin: analytics.profitabilityRatios.netProfitMargin,
      returnOnAssets: analytics.profitabilityRatios.returnOnAssets,
    };
  }, [accounts, analytics]);

  // Format currency based on tenant's base currency
  const formatCurrency = (amount: number, currency?: Currency) => {
    const curr = currency || currentTenant?.configuration.baseCurrency || "INR";
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: curr,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  // Format large amounts with appropriate suffixes
  const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
      // 1 Crore
      return `${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      // 1 Lakh
      return `${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      // 1 Thousand
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toLocaleString();
  };

  // Get industry icon
  const getIndustryIcon = (industry: IndustryType) => {
    const icons = {
      construction: Building2,
      real_estate: Home,
      technology: Laptop,
      manufacturing: Factory,
      retail: Receipt,
      healthcare: Shield,
      education: BookOpen,
      hospitality: MapPin,
      financial_services: Banknote,
      agriculture: TreePine,
      energy: Activity,
      logistics: Briefcase,
    };
    return icons[industry] || Building2;
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      draft: "bg-yellow-100 text-yellow-800",
      pending_approval: "bg-orange-100 text-orange-800",
      approved: "bg-blue-100 text-blue-800",
      posted: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      open: "bg-blue-100 text-blue-800",
      closed: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  // Close modal helper
  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
    setSelectedItem(null);
  };

  // Handle CRUD operations
  const handleCreateAccount = () => {
    toast({
      title: "Account Created",
      description: "New account has been added to the chart of accounts",
    });
    closeModal("createAccount");
  };

  const handleCreateJournalEntry = () => {
    toast({
      title: "Journal Entry Created",
      description: "New journal entry has been recorded successfully",
    });
    closeModal("createJournalEntry");
  };

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Report Generated",
      description: `${reportType} report has been generated and is ready for download`,
    });
    closeModal("financialReports");
  };

  return (
    <div className="space-y-6">
      {/* Header with Tenant Switching */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Calculator className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold">Accounting Management</h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive accounting system with multi-tenant support
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="gap-1">
              <Building2 className="h-3 w-3" />
              {currentTenant?.name}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {currentTenant?.industryType.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {formatCurrency(financialMetrics.totalAssets)} Assets
            </Badge>
            <Badge variant="outline" className="text-xs">
              {formatAmount(journalEntries.length)} Entries
            </Badge>
            <Badge variant="outline" className="text-xs">
              FY {currentTenant?.configuration.currentFiscalYear}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Label htmlFor="tenant-select" className="text-sm font-medium">
              Switch Tenant:
            </Label>
            <Select value={selectedTenantId} onValueChange={handleTenantSwitch}>
              <SelectTrigger id="tenant-select" className="w-[350px]">
                <SelectValue placeholder="Select tenant" />
              </SelectTrigger>
              <SelectContent>
                {accountingTenants.map((tenant) => {
                  const IndustryIcon = getIndustryIcon(tenant.industryType);
                  return (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      <div className="flex items-center gap-2">
                        <IndustryIcon className="h-4 w-4" />
                        <span>{tenant.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {tenant.subscriptionPlan}
                        </Badge>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-03">Mar 2024</SelectItem>
              <SelectItem value="2024-02">Feb 2024</SelectItem>
              <SelectItem value="2024-01">Jan 2024</SelectItem>
              <SelectItem value="2023-12">Dec 2023</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            Accounting System
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setModals((prev) => ({ ...prev, tenantSettings: true }))
            }
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={
                  financialMetrics.totalAssets /
                  (currentTenant?.configuration.baseCurrency === "USD"
                    ? 1000
                    : 100000)
                }
                suffix={
                  currentTenant?.configuration.baseCurrency === "USD"
                    ? "K"
                    : "L"
                }
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(financialMetrics.totalAssets)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={
                  financialMetrics.netIncome /
                  (currentTenant?.configuration.baseCurrency === "USD"
                    ? 1000
                    : 100000)
                }
                suffix={
                  currentTenant?.configuration.baseCurrency === "USD"
                    ? "K"
                    : "L"
                }
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {financialMetrics.netProfitMargin.toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Ratio</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={financialMetrics.currentRatio}
                suffix=""
                decimals={2}
              />
            </div>
            <p className="text-xs text-muted-foreground">Liquidity measure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROA</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={financialMetrics.returnOnAssets}
                suffix="%"
              />
            </div>
            <p className="text-xs text-muted-foreground">Return on Assets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Book Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {currentTenant?.currentFiscalYear.status === "current"
                ? "Open"
                : "Closed"}
            </div>
            <p className="text-xs text-muted-foreground">
              FY {currentTenant?.configuration.currentFiscalYear}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 text-xs"
          >
            <BarChart3 className="h-3 w-3" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="accounts"
            className="flex items-center gap-2 text-xs"
          >
            <BookOpen className="h-3 w-3" />
            Accounts
          </TabsTrigger>
          <TabsTrigger
            value="journal"
            className="flex items-center gap-2 text-xs"
          >
            <FileText className="h-3 w-3" />
            Journal
          </TabsTrigger>
          <TabsTrigger
            value="ledger"
            className="flex items-center gap-2 text-xs"
          >
            <Wallet className="h-3 w-3" />
            Ledger
          </TabsTrigger>
          <TabsTrigger
            value="budget"
            className="flex items-center gap-2 text-xs"
          >
            <Target className="h-3 w-3" />
            Budget
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="flex items-center gap-2 text-xs"
          >
            <PieChart className="h-3 w-3" />
            Reports
          </TabsTrigger>
          <TabsTrigger
            value="reconciliation"
            className="flex items-center gap-2 text-xs"
          >
            <CreditCard className="h-3 w-3" />
            Reconciliation
          </TabsTrigger>
          <TabsTrigger
            value="assets"
            className="flex items-center gap-2 text-xs"
          >
            <Building2 className="h-3 w-3" />
            Assets
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="flex items-center gap-2 text-xs"
          >
            <Shield className="h-3 w-3" />
            Audit
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Financial Performance Dashboard */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Balance Sheet Summary</CardTitle>
                <CardDescription>
                  Financial position as of {selectedPeriod}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Assets</span>
                  <span className="font-medium text-blue-600">
                    {formatCurrency(financialMetrics.totalAssets)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Liabilities</span>
                  <span className="font-medium text-red-600">
                    {formatCurrency(financialMetrics.totalLiabilities)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Equity</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(financialMetrics.totalEquity)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-bold">
                  <span>Balance Check</span>
                  <span
                    className={
                      Math.abs(
                        financialMetrics.totalAssets -
                          (financialMetrics.totalLiabilities +
                            financialMetrics.totalEquity),
                      ) < 1
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {Math.abs(
                      financialMetrics.totalAssets -
                        (financialMetrics.totalLiabilities +
                          financialMetrics.totalEquity),
                    ) < 1
                      ? "✓ Balanced"
                      : "⚠ Unbalanced"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Summary</CardTitle>
                <CardDescription>
                  Financial performance for current period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Revenue</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(financialMetrics.totalRevenue)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Expenses</span>
                  <span className="font-medium text-red-600">
                    {formatCurrency(financialMetrics.totalExpenses)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-bold">
                  <span>Net Income</span>
                  <span
                    className={`${financialMetrics.netIncome >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {formatCurrency(financialMetrics.netIncome)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gross Margin</span>
                  <span className="font-medium">
                    {financialMetrics.grossProfitMargin.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Net Margin</span>
                  <span className="font-medium">
                    {financialMetrics.netProfitMargin.toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Industry-Specific Metrics */}
          {currentTenant?.industryType === "construction" && (
            <Card>
              <CardHeader>
                <CardTitle>Construction Industry Metrics</CardTitle>
                <CardDescription>
                  Key performance indicators for construction business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-sm text-muted-foreground">
                      Active Projects
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-muted-foreground">
                      Project Completion
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      28.5%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Project Margin
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      45 days
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Collection Period
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Journal Entries</CardTitle>
                  <CardDescription>
                    Latest accounting transactions
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTabChange("journal")}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {journalEntries.slice(0, 5).map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <div>
                          <p className="font-medium text-sm">
                            {entry.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {entry.entryNumber} •{" "}
                            {new Date(entry.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">
                          {formatCurrency(entry.totalAmount)}
                        </p>
                        <Badge
                          variant="outline"
                          className={getStatusColor(entry.status)}
                        >
                          {entry.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Cost Center Performance</CardTitle>
                  <CardDescription>
                    Budget vs actual by cost center
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costCenters.map((cc) => (
                    <div key={cc.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {cc.costCenterName}
                        </span>
                        <span className="text-sm">
                          {((cc.actualAmount / cc.budgetAmount) * 100).toFixed(
                            1,
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={(cc.actualAmount / cc.budgetAmount) * 100}
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Budget: {formatCurrency(cc.budgetAmount)}</span>
                        <span>Actual: {formatCurrency(cc.actualAmount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common accounting operations for {currentTenant?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-4">
                <Button
                  onClick={() =>
                    setModals((prev) => ({ ...prev, createJournalEntry: true }))
                  }
                  className="justify-start"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Journal Entry
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setModals((prev) => ({ ...prev, createAccount: true }))
                  }
                  className="justify-start"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Add Account
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setModals((prev) => ({ ...prev, bankReconciliation: true }))
                  }
                  className="justify-start"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Bank Reconciliation
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setModals((prev) => ({ ...prev, financialReports: true }))
                  }
                  className="justify-start"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Chart of Accounts</h2>
              <p className="text-muted-foreground">
                Manage account structure for {currentTenant?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, createAccount: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
            </div>
          </div>

          {/* Account Type Summary */}
          <div className="grid gap-4 md:grid-cols-5">
            {(
              [
                "assets",
                "liabilities",
                "equity",
                "revenue",
                "expenses",
              ] as AccountType[]
            ).map((type) => {
              const typeAccounts = accounts.filter(
                (acc) => acc.accountType === type,
              );
              const totalBalance = typeAccounts.reduce(
                (sum, acc) =>
                  type === "revenue" ||
                  type === "liabilities" ||
                  type === "equity"
                    ? sum + Math.abs(acc.currentBalance)
                    : sum + acc.currentBalance,
                0,
              );

              return (
                <Card key={type}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium capitalize">
                      {type.replace("_", " ")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {formatCurrency(totalBalance)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {typeAccounts.length} accounts
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Accounts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Account Listing</CardTitle>
              <CardDescription>
                Hierarchical chart of accounts with current balances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search accounts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Account Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="assets">Assets</SelectItem>
                      <SelectItem value="liabilities">Liabilities</SelectItem>
                      <SelectItem value="equity">Equity</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="expenses">Expenses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account Code</TableHead>
                      <TableHead>Account Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Current Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts
                      .filter(
                        (account) =>
                          !searchQuery ||
                          account.accountName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          account.accountCode.includes(searchQuery),
                      )
                      .slice(0, 20)
                      .map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-mono">
                            {account.accountCode}
                          </TableCell>
                          <TableCell>
                            <div
                              className={`${account.level > 1 ? `pl-${(account.level - 1) * 4}` : ""}`}
                            >
                              {account.accountName}
                              {account.isBankAccount && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 text-xs"
                                >
                                  Bank
                                </Badge>
                              )}
                              {account.isCashAccount && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 text-xs"
                                >
                                  Cash
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">
                            {account.accountType.replace("_", " ")}
                          </TableCell>
                          <TableCell
                            className={`font-medium ${
                              account.currentBalance >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {formatCurrency(Math.abs(account.currentBalance))}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                account.isActive ? "default" : "secondary"
                              }
                              className={
                                account.isActive
                                  ? "bg-green-100 text-green-800"
                                  : ""
                              }
                            >
                              {account.isActive ? "Active" : "Inactive"}
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
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Account
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Transactions
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Account Statement
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Journal Tab */}
        <TabsContent value="journal" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Journal Entries</h2>
              <p className="text-muted-foreground">
                Record and manage journal entries for {currentTenant?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, createJournalEntry: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </div>
          </div>

          {/* Journal Entries Table */}
          <Card>
            <CardHeader>
              <CardTitle>Journal Entry Register</CardTitle>
              <CardDescription>
                All journal entries for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search entries..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="posted">Posted</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="journal_entry">
                        Journal Entry
                      </SelectItem>
                      <SelectItem value="sales_invoice">
                        Sales Invoice
                      </SelectItem>
                      <SelectItem value="purchase_invoice">
                        Purchase Invoice
                      </SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="receipt">Receipt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entry Number</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {journalEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-mono">
                          {entry.entryNumber}
                        </TableCell>
                        <TableCell>
                          {new Date(entry.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="capitalize">
                          {entry.type.replace("_", " ")}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {entry.description}
                        </TableCell>
                        <TableCell>{entry.reference}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(entry.totalAmount)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(entry.status)}>
                            {entry.status.replace("_", " ")}
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
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Entry
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Print Voucher
                              </DropdownMenuItem>
                              {entry.status === "draft" && (
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would be implemented similarly with full functionality */}
        <TabsContent value="ledger" className="space-y-6">
          <div className="text-center py-12">
            <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">General Ledger</h3>
            <p className="text-muted-foreground mb-4">
              View account-wise transaction details and running balances
            </p>
            <Button variant="outline">Generate Ledger Report</Button>
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <div className="text-center py-12">
            <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Budget Management</h3>
            <p className="text-muted-foreground mb-4">
              Create and monitor budgets with variance analysis
            </p>
            <Button
              onClick={() =>
                setModals((prev) => ({ ...prev, createBudget: true }))
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Budget
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Financial Reports</h2>
              <p className="text-muted-foreground">
                Generate comprehensive financial reports for{" "}
                {currentTenant?.name}
              </p>
            </div>
            <Button
              onClick={() =>
                setModals((prev) => ({ ...prev, financialReports: true }))
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>

          {/* Report Categories */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Statements</CardTitle>
                <CardDescription>Primary financial reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Balance Sheet
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Profit & Loss Statement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Cash Flow Statement
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Management Reports</CardTitle>
                <CardDescription>
                  Operational and analytical reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Trial Balance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Wallet className="mr-2 h-4 w-4" />
                  General Ledger
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Budget vs Actual
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Industry Reports</CardTitle>
                <CardDescription>Industry-specific analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentTenant?.industryType === "construction" && (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <Building2 className="mr-2 h-4 w-4" />
                      Project Profitability
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calculator className="mr-2 h-4 w-4" />
                      Job Costing Report
                    </Button>
                  </>
                )}
                <Button variant="outline" className="w-full justify-start">
                  <PieChart className="mr-2 h-4 w-4" />
                  Cost Center Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-6">
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Bank Reconciliation</h3>
            <p className="text-muted-foreground mb-4">
              Reconcile bank statements with accounting records
            </p>
            <Button
              onClick={() =>
                setModals((prev) => ({ ...prev, bankReconciliation: true }))
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Start Reconciliation
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Fixed Asset Management</h3>
            <p className="text-muted-foreground mb-4">
              Manage fixed assets, depreciation, and asset tracking
            </p>
            <Button
              onClick={() =>
                setModals((prev) => ({ ...prev, assetManagement: true }))
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <div className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Audit Trail</h3>
            <p className="text-muted-foreground mb-4">
              Track all accounting changes and maintain audit compliance
            </p>
            <Button
              onClick={() =>
                setModals((prev) => ({ ...prev, auditTrail: true }))
              }
            >
              <Eye className="mr-2 h-4 w-4" />
              View Audit Log
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals - Placeholder implementations */}
      <Dialog
        open={modals.createAccount}
        onOpenChange={(open) => !open && closeModal("createAccount")}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Account</DialogTitle>
            <DialogDescription>
              Add a new account to the chart of accounts
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountCode">Account Code</Label>
                <Input id="accountCode" placeholder="e.g., 1100" />
              </div>
              <div>
                <Label htmlFor="accountName">Account Name</Label>
                <Input id="accountName" placeholder="e.g., Petty Cash" />
              </div>
            </div>
            <div>
              <Label htmlFor="accountType">Account Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assets">Assets</SelectItem>
                  <SelectItem value="liabilities">Liabilities</SelectItem>
                  <SelectItem value="equity">Equity</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="expenses">Expenses</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Account description..." />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => closeModal("createAccount")}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateAccount}>Create Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modals.createJournalEntry}
        onOpenChange={(open) => !open && closeModal("createJournalEntry")}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create Journal Entry</DialogTitle>
            <DialogDescription>
              Record a new journal entry with proper debits and credits
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="entryDate">Date</Label>
                <Input
                  id="entryDate"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <Label htmlFor="entryType">Type</Label>
                <Select defaultValue="journal_entry">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="journal_entry">Journal Entry</SelectItem>
                    <SelectItem value="adjustment">Adjustment</SelectItem>
                    <SelectItem value="accrual">Accrual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reference">Reference</Label>
                <Input id="reference" placeholder="Reference number" />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Entry description..." />
            </div>
            <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
              <p className="text-muted-foreground">
                Journal entry line items would be implemented here
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => closeModal("createJournalEntry")}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateJournalEntry}>Create Entry</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modals.financialReports}
        onOpenChange={(open) => !open && closeModal("financialReports")}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Financial Report</DialogTitle>
            <DialogDescription>
              Generate comprehensive financial reports
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reportType">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balance_sheet">Balance Sheet</SelectItem>
                  <SelectItem value="profit_loss">
                    Profit & Loss Statement
                  </SelectItem>
                  <SelectItem value="cash_flow">Cash Flow Statement</SelectItem>
                  <SelectItem value="trial_balance">Trial Balance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => closeModal("financialReports")}
            >
              Cancel
            </Button>
            <Button onClick={() => handleGenerateReport("Financial")}>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
