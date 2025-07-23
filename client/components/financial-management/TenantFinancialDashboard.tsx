import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AnimatedIcon, GlowingOrb } from "@/components/ui/animated-icons";
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
  Clock,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Banknote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getFinancialAnalyticsByTenant,
  getFinancialTenants,
  formatCurrency,
  formatPercentage,
} from "./data";

interface TenantFinancialDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function TenantFinancialDashboard({
  currentTab = "overview",
  onTabChange,
}: TenantFinancialDashboardProps) {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab || currentTab);
  const [selectedTenant, setSelectedTenant] =
    useState<string>("tenant_buildcorp");
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

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
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

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-600 relative overflow-hidden group">
            <AnimatedIcon
              icon={DollarSign}
              animation="float"
              className="text-white"
            />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">
              Financial Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              {currentTenant?.name} • {currentTenant?.industryType}
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

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-lift transition-all duration-300 border-l-4 border-l-green-500 animate-fadeInUp">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(analytics.kpis.totalRevenue)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(analytics.trends.revenueGrowth)}
              <span
                className={cn(
                  "ml-1",
                  getTrendColor(analytics.trends.revenueGrowth),
                )}
              >
                {formatPercentage(Math.abs(analytics.trends.revenueGrowth))} vs
                last period
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
              {formatCurrency(analytics.kpis.netProfit)}
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
            <CardTitle className="text-sm font-medium">Cash Position</CardTitle>
            <Wallet className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(analytics.kpis.cashPosition)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(analytics.trends.cashFlowTrend)}
              <span
                className={cn(
                  "ml-1",
                  getTrendColor(analytics.trends.cashFlowTrend),
                )}
              >
                {formatPercentage(Math.abs(analytics.trends.cashFlowTrend))} vs
                last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover-lift transition-all duration-300 border-l-4 border-l-orange-500 animate-fadeInUp"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Building2 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(analytics.kpis.totalAssets)}
            </div>
            <div className="text-xs text-muted-foreground">
              Asset growth tracking
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit & Loss Summary */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Profit & Loss Summary
            </CardTitle>
            <CardDescription>Financial performance breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Revenue</span>
              <span className="font-bold text-green-600">
                {formatCurrency(analytics.profitLossAnalysis.totalRevenue)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cost of Goods Sold</span>
              <span className="font-bold text-red-600">
                {formatCurrency(analytics.profitLossAnalysis.costOfGoodsSold)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Gross Profit</span>
              <span className="font-bold text-blue-600">
                {formatCurrency(analytics.profitLossAnalysis.grossProfit)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Operating Expenses</span>
              <span className="font-bold text-orange-600">
                {formatCurrency(analytics.profitLossAnalysis.operatingExpenses)}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Net Income</span>
              <span className="font-bold text-green-600 text-lg">
                {formatCurrency(analytics.profitLossAnalysis.netIncome)}
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Profit Margin</span>
                <span>
                  {formatPercentage(analytics.ratios.netProfitMargin)}
                </span>
              </div>
              <Progress
                value={analytics.ratios.netProfitMargin}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Balance Sheet Summary */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Balance Sheet Summary
            </CardTitle>
            <CardDescription>Financial position overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Assets</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Current Assets</span>
                  <span>
                    {formatCurrency(
                      analytics.balanceSheetAnalysis.currentAssets,
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Non-Current Assets</span>
                  <span>
                    {formatCurrency(
                      analytics.balanceSheetAnalysis.nonCurrentAssets,
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>Total Assets</span>
                  <span>
                    {formatCurrency(analytics.balanceSheetAnalysis.totalAssets)}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium text-sm mb-2">Liabilities & Equity</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Current Liabilities</span>
                  <span>
                    {formatCurrency(
                      analytics.balanceSheetAnalysis.currentLiabilities,
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Non-Current Liabilities</span>
                  <span>
                    {formatCurrency(
                      analytics.balanceSheetAnalysis.nonCurrentLiabilities,
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Total Equity</span>
                  <span>
                    {formatCurrency(analytics.balanceSheetAnalysis.totalEquity)}
                  </span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>Total Liab. & Equity</span>
                  <span>
                    {formatCurrency(
                      analytics.balanceSheetAnalysis.totalLiabilities +
                        analytics.balanceSheetAnalysis.totalEquity,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Ratios */}
      <Card className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Key Financial Ratios
          </CardTitle>
          <CardDescription>
            Performance indicators and financial health metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Current Ratio
              </p>
              <p className="text-2xl font-bold">
                {analytics.ratios.currentRatio.toFixed(2)}
              </p>
              <Badge
                variant={
                  analytics.ratios.currentRatio >= 1.5
                    ? "default"
                    : "destructive"
                }
                className="mt-2"
              >
                {analytics.ratios.currentRatio >= 1.5 ? "Healthy" : "Poor"}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Debt-to-Equity
              </p>
              <p className="text-2xl font-bold">
                {analytics.ratios.debtToEquityRatio.toFixed(2)}
              </p>
              <Badge
                variant={
                  analytics.ratios.debtToEquityRatio <= 0.5
                    ? "default"
                    : "secondary"
                }
                className="mt-2"
              >
                {analytics.ratios.debtToEquityRatio <= 0.5
                  ? "Conservative"
                  : "Leveraged"}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">ROA</p>
              <p className="text-2xl font-bold">
                {formatPercentage(analytics.ratios.returnOnAssets)}
              </p>
              <Badge
                variant={
                  analytics.ratios.returnOnAssets >= 5 ? "default" : "secondary"
                }
                className="mt-2"
              >
                {analytics.ratios.returnOnAssets >= 5 ? "Strong" : "Weak"}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">ROE</p>
              <p className="text-2xl font-bold">
                {formatPercentage(analytics.ratios.returnOnEquity)}
              </p>
              <Badge
                variant={
                  analytics.ratios.returnOnEquity >= 15
                    ? "default"
                    : "secondary"
                }
                className="mt-2"
              >
                {analytics.ratios.returnOnEquity >= 15
                  ? "Excellent"
                  : "Average"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Monthly Performance Trends
          </CardTitle>
          <CardDescription>
            Revenue, expenses, and profit trends over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.trends.monthlyComparisons.map((month, index) => (
              <div
                key={month.month}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="font-medium">{month.month}</div>
                <div className="grid grid-cols-4 gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="font-bold text-green-600">
                      {formatCurrency(month.revenue)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Expenses</p>
                    <p className="font-bold text-red-600">
                      {formatCurrency(month.expenses)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Profit</p>
                    <p className="font-bold text-blue-600">
                      {formatCurrency(month.profit)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Cash Flow</p>
                    <p className="font-bold text-purple-600">
                      {formatCurrency(month.cashFlow)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
