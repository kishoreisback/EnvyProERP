import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatPercentage } from "@/lib/formatters";
import { LeadStatusBadge } from "@/components/shared";
import {
  TrendingDown,
  Users,
  Target,
  DollarSign,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import type { Lead } from "./types";

interface LeadFunnelProps {
  leads: Lead[];
  showValues?: boolean;
  showConversionRates?: boolean;
  className?: string;
}

interface FunnelStage {
  name: string;
  status: Lead["status"];
  count: number;
  value: number;
  color: string;
  conversionRate?: number;
}

export function LeadFunnel({
  leads,
  showValues = true,
  showConversionRates = true,
  className = "",
}: LeadFunnelProps) {
  const stageOrder: Lead["status"][] = [
    "new",
    "contacted",
    "qualified",
    "proposal",
    "negotiation",
    "closed",
  ];

  const getStageData = (): FunnelStage[] => {
    const stages: FunnelStage[] = stageOrder.map((status) => {
      const stageLeads = leads.filter((lead) => lead.status === status);
      const totalValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0);

      return {
        name: status.charAt(0).toUpperCase() + status.slice(1),
        status,
        count: stageLeads.length,
        value: totalValue,
        color: getStageColor(status),
        conversionRate: 0, // Will be calculated below
      };
    });

    // Calculate conversion rates
    for (let i = 0; i < stages.length - 1; i++) {
      const currentStage = stages[i];
      const nextStage = stages[i + 1];

      if (currentStage.count > 0) {
        currentStage.conversionRate =
          (nextStage.count / currentStage.count) * 100;
      }
    }

    return stages.filter((stage) => stage.count > 0);
  };

  const getStageColor = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "contacted":
        return "bg-purple-500";
      case "qualified":
        return "bg-indigo-500";
      case "proposal":
        return "bg-orange-500";
      case "negotiation":
        return "bg-amber-500";
      case "closed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const stageData = getStageData();
  const totalLeads = leads.length;
  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const overallConversion =
    totalLeads > 0
      ? ((stageData.find((s) => s.status === "closed")?.count || 0) /
          totalLeads) *
        100
      : 0;

  const avgDealSize = stageData.find((s) => s.status === "closed")?.value || 0;
  const closedCount = stageData.find((s) => s.status === "closed")?.count || 0;
  const avgDealValue = closedCount > 0 ? avgDealSize / closedCount : 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{totalLeads}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalValue, { compact: true })}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">
                  {formatPercentage(overallConversion)}
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Deal Size</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(avgDealValue, { compact: true })}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Sales Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stageData.map((stage, index) => {
              const widthPercentage = Math.max(
                (stage.count / (stageData[0]?.count || 1)) * 100,
                10,
              );

              return (
                <div key={stage.status} className="space-y-2">
                  {/* Stage Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LeadStatusBadge status={stage.status} />
                      <span className="font-medium">{stage.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{stage.count} leads</span>
                      {showValues && (
                        <span>
                          {formatCurrency(stage.value, { compact: true })}
                        </span>
                      )}
                      {showConversionRates &&
                        stage.conversionRate !== undefined && (
                          <span>
                            {formatPercentage(stage.conversionRate)} conversion
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Funnel Bar */}
                  <div className="relative">
                    <div
                      className={`h-8 ${stage.color} rounded-lg flex items-center justify-center text-white font-medium transition-all duration-300`}
                      style={{ width: `${widthPercentage}%` }}
                    >
                      <span className="text-sm">
                        {stage.count} (
                        {formatPercentage((stage.count / totalLeads) * 100)})
                      </span>
                    </div>
                  </div>

                  {/* Conversion Arrow */}
                  {index < stageData.length - 1 && (
                    <div className="flex items-center justify-center py-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="h-4 w-4" />
                        {showConversionRates &&
                          stage.conversionRate !== undefined && (
                            <span>
                              {formatPercentage(stage.conversionRate)} convert
                              to next stage
                            </span>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Funnel Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Performance Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Overall Conversion:
                  </span>
                  <span className="font-medium">
                    {formatPercentage(overallConversion)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Pipeline Velocity:
                  </span>
                  <span className="font-medium">
                    {Math.round(
                      stageData.length > 0
                        ? stageData.reduce(
                            (acc, stage) => acc + (stage.conversionRate || 0),
                            0,
                          ) / stageData.length
                        : 0,
                    )}{" "}
                    days avg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Win Rate:</span>
                  <span className="font-medium">
                    {formatPercentage(overallConversion)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Recommendations</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {overallConversion < 10 && (
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <span>
                      Low conversion rate. Consider improving lead
                      qualification.
                    </span>
                  </div>
                )}
                {stageData.some(
                  (s) => s.conversionRate && s.conversionRate < 20,
                ) && (
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span>
                      Some stages have low conversion. Review sales process.
                    </span>
                  </div>
                )}
                {totalValue > 0 && avgDealValue > 0 && (
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>
                      Focus on high-value leads to increase average deal size.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
