import React, { useEffect, useCallback, useMemo } from "react";
import {
  AIAgent,
  AIAgentResult,
  AIAgentExecution,
  AIRecommendation,
} from "./types";
import { CustomModal } from "./CustomModal";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
// import { ScrollArea } from "../../ui/scroll-area"; // Commented out if not available
import {
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Clock,
  Brain,
  FileText,
  Target,
  Zap,
  DollarSign,
  Shield,
  Users,
  Calendar,
  BarChart3,
  Eye,
  Download,
  Share,
  Copy,
} from "lucide-react";
import { cn } from "../../../lib/utils";

interface AIAgentResultsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: AIAgent;
  results: AIAgentResult[];
  executions: AIAgentExecution[];
}

const statusColors = {
  success: "text-green-600 bg-green-50",
  warning: "text-yellow-600 bg-yellow-50",
  error: "text-red-600 bg-red-50",
  pending: "text-blue-600 bg-blue-50",
};

const priorityColors = {
  low: "text-gray-600 bg-gray-50",
  medium: "text-blue-600 bg-blue-50",
  high: "text-orange-600 bg-orange-50",
  critical: "text-red-600 bg-red-50",
};

const agentIcons = {
  document_processor: FileText,
  risk_analyzer: TrendingUp,
  cost_predictor: DollarSign,
  safety_monitor: Shield,
  vendor_analyzer: Users,
  scheduler: Calendar,
  report_generator: BarChart3,
  compliance_checker: CheckCircle,
  quality_inspector: Eye,
  smart_assistant: Brain,
};

export function AIAgentResults({
  open,
  onOpenChange,
  agent,
  results,
  executions,
}: AIAgentResultsProps) {
  // Memoize expensive computations to prevent unnecessary re-renders
  const IconComponent = useMemo(
    () => agentIcons[agent.type] || Brain,
    [agent.type],
  );
  const latestResult = useMemo(
    () => (results && results.length > 0 ? results[0] : null),
    [results],
  );
  const recentExecutions = useMemo(
    () => (executions ? executions.slice(0, 10) : []),
    [executions],
  );

  // Simplified close handler
  const handleClose = useCallback(
    (newOpen: boolean) => {
      onOpenChange(newOpen);
    },
    [onOpenChange],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup any pending operations
    };
  }, []);

  const formatConfidence = (confidence: number) => {
    return `${Math.round(confidence * 100)}%`;
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const renderRecommendation = (rec: AIRecommendation) => {
    const getRecommendationIcon = () => {
      switch (rec.type) {
        case "action":
          return <Zap className="h-4 w-4" />;
        case "alert":
          return <AlertTriangle className="h-4 w-4" />;
        case "optimization":
          return <TrendingUp className="h-4 w-4" />;
        case "risk":
          return <Shield className="h-4 w-4" />;
        default:
          return <Target className="h-4 w-4" />;
      }
    };

    return (
      <div
        key={rec.id}
        className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition-shadow"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className={cn("p-1 rounded", priorityColors[rec.priority])}>
              {getRecommendationIcon()}
            </div>
            <div>
              <h4 className="font-medium text-sm">{rec.title}</h4>
              <Badge
                variant="outline"
                className={cn("text-xs", priorityColors[rec.priority])}
              >
                {rec.priority}
              </Badge>
            </div>
          </div>
          {rec.autoApplicable && (
            <Badge variant="secondary" className="text-xs">
              Auto-Apply
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground">{rec.description}</p>

        {rec.suggestedAction && (
          <div className="bg-blue-50 p-2 rounded text-sm">
            <strong>Suggested Action:</strong> {rec.suggestedAction}
          </div>
        )}

        {rec.impact && (
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-medium text-green-600">
                {rec.impact.cost > 0 ? "+" : ""}₹
                {Math.abs(rec.impact.cost / 1000).toFixed(0)}K
              </div>
              <div className="text-muted-foreground">Cost Impact</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-blue-600">
                {rec.impact.time > 0 ? "+" : ""}
                {rec.impact.time}d
              </div>
              <div className="text-muted-foreground">Time Impact</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-orange-600">
                {rec.impact.risk > 0 ? "+" : ""}
                {rec.impact.risk}%
              </div>
              <div className="text-muted-foreground">Risk Impact</div>
            </div>
          </div>
        )}

        {rec.deadline && (
          <div className="text-xs text-muted-foreground">
            <Clock className="h-3 w-3 inline mr-1" />
            Deadline: {rec.deadline.toLocaleDateString()}
          </div>
        )}
      </div>
    );
  };

  const renderDataVisualization = useCallback(
    (data: any) => {
      if (!data) return null;

      // Render different data types based on agent type
      switch (agent.type) {
        case "document_processor":
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-lg font-semibold text-blue-600">
                    {data.pages || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Pages</div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-lg font-semibold text-green-600">
                    {data.entities?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Entities</div>
                </div>
              </div>
              {data.entities && (
                <div className="space-y-2">
                  <h5 className="font-medium">Extracted Entities</h5>
                  {data.entities.map((entity: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <span className="font-medium">{entity.type}</span>
                      <span>{entity.value}</span>
                      <Badge variant="outline">
                        {formatConfidence(entity.confidence)}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        case "risk_analyzer":
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-50 p-3 rounded text-center">
                  <div className="text-lg font-semibold text-red-600">
                    {data.riskScore || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Risk Score
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded text-center">
                  <div className="text-lg font-semibold text-orange-600 capitalize">
                    {data.overallRisk || "Unknown"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Risk Level
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {data.riskFactors?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Risk Factors
                  </div>
                </div>
              </div>
              {data.riskFactors && (
                <div className="space-y-2">
                  <h5 className="font-medium">Risk Factors</h5>
                  {data.riskFactors.map((factor: any, index: number) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{factor.name}</span>
                        <Badge
                          variant={
                            factor.impact === "high"
                              ? "destructive"
                              : factor.impact === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {factor.impact}
                        </Badge>
                      </div>
                      <Progress
                        value={factor.probability * 100}
                        className="h-2"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        Probability: {formatConfidence(factor.probability)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        case "cost_predictor":
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded text-center">
                  <div className="text-lg font-semibold text-green-600">
                    ₹{((data.estimatedCost || 0) / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Estimated Cost
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded text-center">
                  <div className="text-lg font-semibold text-blue-600 capitalize">
                    {data.complexity || "Unknown"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Complexity
                  </div>
                </div>
              </div>
              {data.breakdown && (
                <div className="space-y-2">
                  <h5 className="font-medium">Cost Breakdown</h5>
                  {Object.entries(data.breakdown).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <span className="capitalize">{key}</span>
                      <span className="font-medium">
                        ₹{((value as number) / 100000).toFixed(1)}L
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        case "safety_monitor":
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-3 rounded text-center">
                  <div className="text-lg font-semibold text-green-600">
                    {data.complianceScore || 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Compliance
                  </div>
                </div>
                <div className="bg-red-50 p-3 rounded text-center">
                  <div className="text-lg font-semibold text-red-600">
                    {data.violations?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Violations
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded text-center">
                  <div className="text-lg font-semibold text-orange-600 capitalize">
                    {data.riskLevel || "Unknown"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Risk Level
                  </div>
                </div>
              </div>
              {data.violations && data.violations.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-medium">Safety Violations</h5>
                  {data.violations.map((violation: any, index: number) => (
                    <div key={index} className="p-3 border rounded bg-red-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{violation.type}</span>
                        <Badge
                          variant={
                            violation.severity === "high"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {violation.severity}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Count: {violation.count}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        default:
          return (
            <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          );
      }
    },
    [agent.type],
  );

  return (
    <CustomModal
      open={open}
      onOpenChange={handleClose}
      title={`${agent.name} - Results`}
      description="Execution results and insights from AI agent analysis"
      className="max-w-4xl"
    >
      <div className="flex items-center space-x-2 mb-4">
        <IconComponent className="h-5 w-5 text-blue-500" />
        <span className="font-medium">{agent.name}</span>
      </div>

      <Tabs defaultValue="latest" className="flex-1 overflow-hidden">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="latest">Latest Results</TabsTrigger>
          <TabsTrigger value="history">Execution History</TabsTrigger>
          <TabsTrigger value="insights">Insights & Recommendations</TabsTrigger>
        </TabsList>

        <div className="h-[500px] mt-4 overflow-y-auto">
          <TabsContent value="latest" className="space-y-4 mt-0">
            {latestResult ? (
              <>
                {/* Result Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Execution Overview</span>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={cn(statusColors[latestResult.status])}
                        >
                          {latestResult.status}
                        </Badge>
                        <Badge variant="secondary">
                          {formatConfidence(latestResult.confidence)}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold">
                          {formatDuration(latestResult.processingTime)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Processing Time
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">
                          {latestResult.insights.length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Insights
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">
                          {latestResult.recommendations.length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Recommendations
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Executed: {latestResult.processedAt.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                {/* Data Visualization */}
                <Card>
                  <CardHeader>
                    <CardTitle>Processed Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderDataVisualization(latestResult.data)}
                  </CardContent>
                </Card>

                {/* Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle>AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {latestResult.insights.map((insight, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-2 p-2 bg-blue-50 rounded"
                        >
                          <Brain className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span className="text-sm">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-12">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
                <p className="text-muted-foreground">
                  Execute the agent to see results here
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-0">
            {recentExecutions.length > 0 ? (
              recentExecutions.map((execution) => (
                <Card key={execution.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            execution.status === "completed"
                              ? statusColors.success
                              : execution.status === "failed"
                                ? statusColors.error
                                : statusColors.pending,
                          )}
                        >
                          {execution.status}
                        </Badge>
                        <span className="text-sm font-medium">
                          {execution.trigger.replace("_", " ")}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {execution.startTime.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Duration:{" "}
                      {execution.duration
                        ? formatDuration(execution.duration)
                        : "N/A"}
                    </div>
                    {execution.result && (
                      <div className="mt-2 text-sm">
                        Confidence:{" "}
                        {formatConfidence(execution.result.confidence)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No Execution History
                </h3>
                <p className="text-muted-foreground">
                  Agent executions will appear here
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-4 mt-0">
            {latestResult?.recommendations.length ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">AI Recommendations</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
                {latestResult.recommendations.map(renderRecommendation)}
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Recommendations</h3>
                <p className="text-muted-foreground">
                  AI recommendations will appear here after analysis
                </p>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </CustomModal>
  );
}
