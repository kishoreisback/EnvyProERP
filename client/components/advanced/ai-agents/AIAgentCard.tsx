import React, { useState } from "react";
import { AIAgent, AIAgentStatus, AIAgentExecution } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Switch } from "../../ui/switch";
import { Progress } from "../../ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Bot,
  FileText,
  TrendingUp,
  DollarSign,
  Shield,
  Users,
  Calendar,
  BarChart3,
  CheckCircle,
  Eye,
  Brain,
  Play,
  Settings,
  MoreVertical,
  Clock,
  Zap,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { cn } from "../../../lib/utils";

interface AIAgentCardProps {
  agent: AIAgent;
  execution?: AIAgentExecution;
  onToggle?: (agentId: string, enabled: boolean) => void;
  onExecute?: (agentId: string) => void;
  onConfigure?: (agentId: string) => void;
  onViewResults?: (agentId: string) => void;
  className?: string;
}

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

const statusColors: Record<AIAgentStatus, string> = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  error: "bg-red-100 text-red-800 border-red-200",
};

const statusIcons = {
  active: Activity,
  inactive: Clock,
  processing: Zap,
  error: AlertTriangle,
};

export function AIAgentCard({
  agent,
  execution,
  onToggle,
  onExecute,
  onConfigure,
  onViewResults,
  className,
}: AIAgentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = agentIcons[agent.type] || Bot;
  const StatusIcon = statusIcons[agent.status];

  const handleToggle = (enabled: boolean) => {
    onToggle?.(agent.id, enabled);
  };

  const handleExecute = () => {
    onExecute?.(agent.id);
  };

  const handleConfigure = () => {
    onConfigure?.(agent.id);
  };

  const handleViewResults = () => {
    onViewResults?.(agent.id);
  };

  return (
    <Card
      className={cn("transition-all duration-200 hover:shadow-md", className)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <IconComponent className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold truncate">
                {agent.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {agent.description}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className={cn("text-xs", statusColors[agent.status])}
            >
              <StatusIcon className="h-3 w-3 mr-1" />
              {agent.status}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExecute}>
                  <Play className="h-4 w-4 mr-2" />
                  Execute Now
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleConfigure}>
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleViewResults}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Results
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Agent Status & Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Auto-Execute:</span>
            <Switch
              checked={agent.config.enabled && agent.config.autoExecute}
              onCheckedChange={handleToggle}
              disabled={agent.status === "processing"}
            />
          </div>

          <Button
            size="sm"
            onClick={handleExecute}
            disabled={agent.status === "processing"}
            className="h-8"
          >
            {agent.status === "processing" ? (
              <>
                <Activity className="h-3 w-3 mr-1 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="h-3 w-3 mr-1" />
                Execute
              </>
            )}
          </Button>
        </div>

        {/* Current Execution Status */}
        {execution && execution.status === "running" && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">
                Currently Processing
              </span>
              <span className="text-xs text-blue-600">
                {Math.round(
                  (Date.now() - execution.startTime.getTime()) / 1000,
                )}
                s
              </span>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-xs text-blue-700 mt-1">
              Analyzing data and generating insights...
            </p>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">
              {agent.executionCount}
            </div>
            <div className="text-xs text-muted-foreground">Executions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">
              {Math.round(agent.successRate * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-purple-600">
              {agent.averageProcessingTime}s
            </div>
            <div className="text-xs text-muted-foreground">Avg Time</div>
          </div>
        </div>

        {/* Capabilities Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Capabilities</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 text-xs"
            >
              {isExpanded ? "Less" : "More"}
            </Button>
          </div>

          <div className="flex flex-wrap gap-1">
            {agent.capabilities &&
              agent.capabilities.length > 0 &&
              agent.capabilities
                .slice(0, isExpanded ? undefined : 3)
                .map((capability, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs"
                    title={capability.description}
                  >
                    {capability.name}
                  </Badge>
                ))}
            {!isExpanded &&
              agent.capabilities &&
              agent.capabilities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{agent.capabilities.length - 3} more
                </Badge>
              )}
          </div>
        </div>

        {/* Last Execution Info */}
        {agent.lastExecuted && (
          <div className="text-xs text-muted-foreground border-t pt-2">
            Last executed: {agent.lastExecuted.toLocaleDateString()}{" "}
            {agent.lastExecuted.toLocaleTimeString()}
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && (
          <div className="space-y-3 border-t pt-3">
            <div>
              <h5 className="text-sm font-medium mb-2">Triggers</h5>
              <div className="flex flex-wrap gap-1">
                {agent.triggers &&
                  agent.triggers.length > 0 &&
                  agent.triggers.map((trigger, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {trigger.replace("_", " ")}
                    </Badge>
                  ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-2">Configuration</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Confidence:</span>{" "}
                  {Math.round((agent.config?.confidenceThreshold || 0) * 100)}%
                </div>
                <div>
                  <span className="text-muted-foreground">Max Time:</span>{" "}
                  {agent.config?.maxProcessingTime || 0}s
                </div>
                <div>
                  <span className="text-muted-foreground">Retries:</span>{" "}
                  {agent.config?.retryAttempts || 0}
                </div>
                <div>
                  <span className="text-muted-foreground">Auto Execute:</span>{" "}
                  {agent.config?.autoExecute ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
