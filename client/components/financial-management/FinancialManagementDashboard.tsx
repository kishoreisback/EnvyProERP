import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  AnimatedIcon,
  GlowingOrb,
  PulsingDot,
} from "@/components/ui/animated-icons";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calculator,
  Receipt,
  CreditCard,
  Building2,
  Users,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Filter,
  Search,
  Download,
  Upload,
  Settings,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  FileText,
  Calendar,
  Wallet,
  Banknote,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Bell,
  Shield,
  BookOpen,
  Zap,
  Globe,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuditLogger } from "@/hooks/useAuditLogger";

// Import sub-modules
import { FinanceOperations } from "./finance/FinanceOperations";
import { AccountingManagement } from "./accounting/AccountingManagement";
import { PaymentProcessing } from "./payments/PaymentProcessing";

// Import unified data and types
import {
  getFinancialTenants,
  getFinancialAnalyticsByTenant,
  getUnifiedFinancialSummary,
} from "./data";
import { FinancialTenant } from "./types";

interface FinancialManagementDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function FinancialManagementDashboard({
  currentTab = "overview",
  onTabChange,
}: FinancialManagementDashboardProps) {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { logAudit } = useAuditLogger("FinancialManagement");

  const [activeTab, setActiveTab] = useState(tab || currentTab);
  const [selectedTenant, setSelectedTenant] =
    useState<string>("tenant_buildcorp");
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState("current_month");

  // Get financial data
  const financialTenants = useMemo(() => getFinancialTenants(), []);
  const currentTenant = useMemo(
    () => financialTenants.find((t) => t.id === selectedTenant),
    [financialTenants, selectedTenant],
  );
  const analytics = useMemo(
    () => getFinancialAnalyticsByTenant(selectedTenant, selectedTimeRange),
    [selectedTenant, selectedTimeRange],
  );
  const unifiedSummary = useMemo(
    () => getUnifiedFinancialSummary(selectedTenant),
    [selectedTenant],
  );

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
    navigate(`/financial-management/${newTab}`);
    logAudit({
      action: "tab_switch",
      resource: "financial_dashboard",
      resourceType: "navigation",
      description: `Switched to ${newTab} tab`,
      details: { tab: newTab, previousTab: activeTab },
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currentTenant?.baseCurrency || "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    } else if (trend < 0) {
      return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    }
    return <Activity className="h-4 w-4 text-gray-600" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-green-600";
    if (trend < 0) return "text-red-600";
    return "text-gray-600";
  };

  const quickActions = [
    {
      id: "new_transaction",
      label: "New Transaction",
      icon: Plus,
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      onClick: () => setShowNewTransactionModal(true),
    },
    {
      id: "generate_invoice",
      label: "Generate Invoice",
      icon: Receipt,
      color: "bg-green-50 hover:bg-green-100 border-green-200",
      onClick: () => handleTabChange("finance"),
    },
    {
      id: "record_payment",
      label: "Record Payment",
      icon: CreditCard,
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
      onClick: () => handleTabChange("payments"),
    },
    {
      id: "reconcile_accounts",
      label: "Reconcile Accounts",
      icon: Calculator,
      color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
      onClick: () => handleTabChange("accounting"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden group">
            <AnimatedIcon
              icon={DollarSign}
              animation="float"
              className="text-white"
            />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">
              Financial Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Unified Finance, Accounting & Payment Processing
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedTenant} onValueChange={setSelectedTenant}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select organization" />
            </SelectTrigger>
            <SelectContent>
              {financialTenants.map((tenant) => (
                <SelectItem key={tenant.id} value={tenant.id}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{tenant.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {tenant.industryType}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month">This Month</SelectItem>
              <SelectItem value="current_quarter">This Quarter</SelectItem>
              <SelectItem value="current_year">This Year</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="last_quarter">Last Quarter</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Button size="sm" className="gap-2 hover-lift">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Button
            key={action.id}
            variant="outline"
            className={cn(
              "h-auto flex-col gap-3 p-4 hover-lift transition-all duration-300",
              action.color,
              "animate-fadeInUp",
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={action.onClick}
          >
            <AnimatedIcon
              icon={action.icon}
              animation="bounce"
              className="h-6 w-6"
            />
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Financial KPIs Overview */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-lift transition-all duration-300 border-l-4 border-l-green-500 animate-fadeInUp">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                <AnimatedCounter value={analytics.kpis.totalRevenue} />
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                {getTrendIcon(analytics.trends.revenueGrowth)}
                <span
                  className={cn(
                    "ml-1",
                    getTrendColor(analytics.trends.revenueGrowth),
                  )}
                >
                  {formatPercentage(Math.abs(analytics.trends.revenueGrowth))}{" "}
                  vs last period
                </span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift transition-all duration-300 border-l-4 border-l-blue-500 animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <PieChart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                <AnimatedCounter value={analytics.kpis.netProfit} />
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                {getTrendIcon(analytics.trends.profitGrowth)}
                <span
                  className={cn(
                    "ml-1",
                    getTrendColor(analytics.trends.profitGrowth),
                  )}
                >
                  {formatPercentage(Math.abs(analytics.trends.profitGrowth))} vs
                  last period
                </span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift transition-all duration-300 border-l-4 border-l-purple-500 animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cash Position
              </CardTitle>
              <Wallet className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                <AnimatedCounter value={analytics.kpis.cashPosition} />
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                {getTrendIcon(analytics.trends.cashFlowTrend)}
                <span
                  className={cn(
                    "ml-1",
                    getTrendColor(analytics.trends.cashFlowTrend),
                  )}
                >
                  {formatPercentage(Math.abs(analytics.trends.cashFlowTrend))}{" "}
                  vs last period
                </span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift transition-all duration-300 border-l-4 border-l-orange-500 animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Outstanding Invoices
              </CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                <AnimatedCounter value={analytics.kpis.outstandingInvoices} />
              </div>
              <div className="text-xs text-muted-foreground">
                {analytics.kpis.overdueInvoices} overdue invoices
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="finance" className="gap-2">
            <Receipt className="h-4 w-4" />
            Finance Operations
          </TabsTrigger>
          <TabsTrigger value="accounting" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Accounting
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Processing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Ratios */}
            {analytics && (
              <Card className="animate-fadeInUp">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Financial Ratios
                  </CardTitle>
                  <CardDescription>
                    Key financial performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Ratio</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">
                        {analytics.ratios.currentRatio.toFixed(2)}
                      </span>
                      <Badge
                        variant={
                          analytics.ratios.currentRatio >= 1.5
                            ? "default"
                            : "destructive"
                        }
                      >
                        {analytics.ratios.currentRatio >= 1.5 ? "Good" : "Poor"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Debt-to-Equity</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">
                        {analytics.ratios.debtToEquityRatio.toFixed(2)}
                      </span>
                      <Badge
                        variant={
                          analytics.ratios.debtToEquityRatio <= 0.5
                            ? "default"
                            : "secondary"
                        }
                      >
                        {analytics.ratios.debtToEquityRatio <= 0.5
                          ? "Healthy"
                          : "Monitor"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Gross Profit Margin
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">
                        {formatPercentage(analytics.ratios.grossProfitMargin)}
                      </span>
                      <Badge
                        variant={
                          analytics.ratios.grossProfitMargin >= 20
                            ? "default"
                            : "secondary"
                        }
                      >
                        {analytics.ratios.grossProfitMargin >= 20
                          ? "Excellent"
                          : "Average"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      ROA (Return on Assets)
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">
                        {formatPercentage(analytics.ratios.returnOnAssets)}
                      </span>
                      <Badge
                        variant={
                          analytics.ratios.returnOnAssets >= 5
                            ? "default"
                            : "secondary"
                        }
                      >
                        {analytics.ratios.returnOnAssets >= 5
                          ? "Strong"
                          : "Weak"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cash Flow Analysis */}
            {analytics && (
              <Card
                className="animate-fadeInUp"
                style={{ animationDelay: "0.1s" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Cash Flow Analysis
                  </CardTitle>
                  <CardDescription>
                    Cash flow breakdown by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Operating Cash Flow
                    </span>
                    <span
                      className={cn(
                        "font-bold",
                        analytics.cashFlowAnalysis.operatingCashFlow >= 0
                          ? "text-green-600"
                          : "text-red-600",
                      )}
                    >
                      {formatCurrency(
                        analytics.cashFlowAnalysis.operatingCashFlow,
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Investing Cash Flow
                    </span>
                    <span
                      className={cn(
                        "font-bold",
                        analytics.cashFlowAnalysis.investingCashFlow >= 0
                          ? "text-green-600"
                          : "text-red-600",
                      )}
                    >
                      {formatCurrency(
                        analytics.cashFlowAnalysis.investingCashFlow,
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Financing Cash Flow
                    </span>
                    <span
                      className={cn(
                        "font-bold",
                        analytics.cashFlowAnalysis.financingCashFlow >= 0
                          ? "text-green-600"
                          : "text-red-600",
                      )}
                    >
                      {formatCurrency(
                        analytics.cashFlowAnalysis.financingCashFlow,
                      )}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Net Cash Flow</span>
                    <span
                      className={cn(
                        "font-bold text-lg",
                        analytics.cashFlowAnalysis.netCashFlow >= 0
                          ? "text-green-600"
                          : "text-red-600",
                      )}
                    >
                      {formatCurrency(analytics.cashFlowAnalysis.netCashFlow)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recent Transactions */}
          {unifiedSummary && (
            <Card
              className="animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>
                  Latest financial transactions across all modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {unifiedSummary.recentTransactions
                    .slice(0, 5)
                    .map((transaction, index) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full",
                              transaction.type === "invoice"
                                ? "bg-blue-100 text-blue-600"
                                : transaction.type === "payment"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-purple-100 text-purple-600",
                            )}
                          >
                            {transaction.type === "invoice" ? (
                              <Receipt className="h-4 w-4" />
                            ) : transaction.type === "payment" ? (
                              <CreditCard className="h-4 w-4" />
                            ) : (
                              <Activity className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {transaction.description}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.reference} •{" "}
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={cn(
                              "font-bold",
                              transaction.amount >= 0
                                ? "text-green-600"
                                : "text-red-600",
                            )}
                          >
                            {formatCurrency(Math.abs(transaction.amount))}
                          </p>
                          <Badge
                            variant={
                              transaction.status === "approved"
                                ? "default"
                                : transaction.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="finance">
          <FinanceOperations tenantId={selectedTenant} />
        </TabsContent>

        <TabsContent value="accounting">
          <AccountingManagement tenantId={selectedTenant} />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentProcessing tenantId={selectedTenant} />
        </TabsContent>
      </Tabs>

      {/* New Transaction Modal */}
      <Dialog
        open={showNewTransactionModal}
        onOpenChange={setShowNewTransactionModal}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Quick Transaction
            </DialogTitle>
            <DialogDescription>
              Create a new financial transaction quickly
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => {
                setShowNewTransactionModal(false);
                handleTabChange("finance");
              }}
            >
              <Receipt className="h-6 w-6" />
              <span>Invoice</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => {
                setShowNewTransactionModal(false);
                handleTabChange("payments");
              }}
            >
              <CreditCard className="h-6 w-6" />
              <span>Payment</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => {
                setShowNewTransactionModal(false);
                handleTabChange("accounting");
              }}
            >
              <BookOpen className="h-6 w-6" />
              <span>Journal Entry</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => {
                setShowNewTransactionModal(false);
                handleTabChange("accounting");
              }}
            >
              <Calculator className="h-6 w-6" />
              <span>Budget</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
