import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  formatCurrency,
  formatPercentage,
  calculatePercentageChange,
} from "@/lib/formatters";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import type { FinancialData } from "./types";

interface FinancialMetricsProps {
  data: FinancialData[];
  showTrends?: boolean;
  showTargets?: boolean;
  targets?: {
    revenue?: number;
    profit?: number;
    margin?: number;
  };
  className?: string;
}

export function FinancialMetrics({
  data,
  showTrends = true,
  showTargets = false,
  targets,
  className = "",
}: FinancialMetricsProps) {
  const currentPeriod = data[data.length - 1];
  const previousPeriod = data[data.length - 2];

  const getTrendData = (current: number, previous: number) => {
    if (!previous) return null;
    return calculatePercentageChange(current, previous);
  };

  const getTargetProgress = (actual: number, target: number) => {
    return Math.min((actual / target) * 100, 100);
  };

  const revenueTarget = targets?.revenue || 0;
  const profitTarget = targets?.profit || 0;
  const marginTarget = targets?.margin || 0;

  const revenueTrend = previousPeriod
    ? getTrendData(currentPeriod.revenue, previousPeriod.revenue)
    : null;

  const profitTrend = previousPeriod
    ? getTrendData(currentPeriod.profit, previousPeriod.profit)
    : null;

  const expenseTrend = previousPeriod
    ? getTrendData(currentPeriod.expenses, previousPeriod.expenses)
    : null;

  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {/* Revenue Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(currentPeriod.revenue, { compact: true })}
          </div>
          {showTrends && revenueTrend && (
            <div className="flex items-center gap-1 text-xs">
              {revenueTrend.isPositive ? (
                <ArrowUpRight className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500" />
              )}
              <span
                className={
                  revenueTrend.isPositive ? "text-green-600" : "text-red-600"
                }
              >
                {revenueTrend.formatted} vs last period
              </span>
            </div>
          )}
          {showTargets && revenueTarget > 0 && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Target Progress</span>
                <span>
                  {Math.round(
                    getTargetProgress(currentPeriod.revenue, revenueTarget),
                  )}
                  %
                </span>
              </div>
              <Progress
                value={getTargetProgress(currentPeriod.revenue, revenueTarget)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profit Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(currentPeriod.profit, { compact: true })}
          </div>
          {showTrends && profitTrend && (
            <div className="flex items-center gap-1 text-xs">
              {profitTrend.isPositive ? (
                <ArrowUpRight className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500" />
              )}
              <span
                className={
                  profitTrend.isPositive ? "text-green-600" : "text-red-600"
                }
              >
                {profitTrend.formatted} vs last period
              </span>
            </div>
          )}
          {showTargets && profitTarget > 0 && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Target Progress</span>
                <span>
                  {Math.round(
                    getTargetProgress(currentPeriod.profit, profitTarget),
                  )}
                  %
                </span>
              </div>
              <Progress
                value={getTargetProgress(currentPeriod.profit, profitTarget)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expenses Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <PieChart className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(currentPeriod.expenses, { compact: true })}
          </div>
          {showTrends && expenseTrend && (
            <div className="flex items-center gap-1 text-xs">
              {!expenseTrend.isPositive ? (
                <ArrowDownRight className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowUpRight className="h-3 w-3 text-red-500" />
              )}
              <span
                className={
                  !expenseTrend.isPositive ? "text-green-600" : "text-red-600"
                }
              >
                {expenseTrend.formatted} vs last period
              </span>
            </div>
          )}
          <div className="text-xs text-muted-foreground mt-1">
            {formatPercentage(
              (currentPeriod.expenses / currentPeriod.revenue) * 100,
            )}{" "}
            of revenue
          </div>
        </CardContent>
      </Card>

      {/* Profit Margin Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
          <Target className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatPercentage(currentPeriod.margin)}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant={
                currentPeriod.margin > 20
                  ? "default"
                  : currentPeriod.margin > 10
                    ? "secondary"
                    : "destructive"
              }
            >
              {currentPeriod.margin > 20
                ? "Excellent"
                : currentPeriod.margin > 10
                  ? "Good"
                  : "Needs Improvement"}
            </Badge>
          </div>
          {showTargets && marginTarget > 0 && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Target: {formatPercentage(marginTarget)}</span>
                <span>
                  {currentPeriod.margin >= marginTarget
                    ? "✓ Achieved"
                    : "Behind Target"}
                </span>
              </div>
              <Progress
                value={getTargetProgress(currentPeriod.margin, marginTarget)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
