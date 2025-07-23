import React from "react";
import { NodeTemplate, WorkflowNodeType } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import {
  Play,
  Zap,
  GitBranch,
  Users,
  Bell,
  Clock,
  Database,
  Link,
  CheckCircle,
  Plus,
  Save,
  FolderOpen,
  Download,
  Upload,
  Settings,
  Eye,
  PlayCircle,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Map,
} from "lucide-react";
import { cn } from "../../../lib/utils";

interface WorkflowToolbarProps {
  onAddNode: (nodeType: WorkflowNodeType) => void;
  onSave?: () => void;
  onLoad?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  onExecute?: () => void;
  onReset?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onToggleGrid?: () => void;
  onToggleMinimap?: () => void;
  showGrid?: boolean;
  showMinimap?: boolean;
  isExecuting?: boolean;
  className?: string;
}

const nodeTemplates: NodeTemplate[] = [
  {
    type: "start",
    label: "Start",
    description: "Begin workflow execution",
    icon: "Play",
    category: "Flow Control",
    defaultData: {
      label: "Start",
      description: "Workflow start point",
      config: {},
      outputs: [{ id: "output", name: "Next", type: "object" }],
    },
    configSchema: [
      {
        key: "triggerType",
        label: "Trigger Type",
        type: "select",
        required: true,
        options: [
          { label: "Manual", value: "manual" },
          { label: "Form Submission", value: "form_submission" },
          { label: "Schedule", value: "schedule" },
          { label: "Webhook", value: "webhook" },
        ],
      },
    ],
  },
  {
    type: "action",
    label: "Action",
    description: "Perform an action or task",
    icon: "Zap",
    category: "Actions",
    defaultData: {
      label: "New Action",
      description: "Execute an action",
      config: { actionType: "custom" },
      inputs: [{ id: "input", name: "Data", type: "object", required: true }],
      outputs: [{ id: "output", name: "Result", type: "object" }],
    },
    configSchema: [
      {
        key: "actionType",
        label: "Action Type",
        type: "select",
        required: true,
        options: [
          { label: "HTTP Request", value: "http" },
          { label: "Email Send", value: "email" },
          { label: "File Operation", value: "file" },
          { label: "Custom Script", value: "custom" },
        ],
      },
      {
        key: "actionConfig",
        label: "Configuration",
        type: "textarea",
        placeholder: "Enter action configuration...",
      },
    ],
  },
  {
    type: "condition",
    label: "Condition",
    description: "Branch based on conditions",
    icon: "GitBranch",
    category: "Flow Control",
    defaultData: {
      label: "New Condition",
      description: "Evaluate condition",
      config: { condition: "" },
      inputs: [{ id: "input", name: "Data", type: "object", required: true }],
      outputs: [
        { id: "true", name: "True", type: "object" },
        { id: "false", name: "False", type: "object" },
      ],
    },
    configSchema: [
      {
        key: "condition",
        label: "Condition",
        type: "textarea",
        required: true,
        placeholder: "Enter condition logic...",
      },
    ],
  },
  {
    type: "approval",
    label: "Approval",
    description: "Human approval step",
    icon: "Users",
    category: "Human Tasks",
    defaultData: {
      label: "Approval Required",
      description: "Requires human approval",
      config: { approvers: [], timeout: 24 },
      inputs: [
        { id: "input", name: "Request", type: "object", required: true },
      ],
      outputs: [
        { id: "approved", name: "Approved", type: "object" },
        { id: "rejected", name: "Rejected", type: "object" },
      ],
    },
    configSchema: [
      {
        key: "approvers",
        label: "Approvers (emails)",
        type: "textarea",
        required: true,
        placeholder: "Enter email addresses, one per line",
      },
      {
        key: "timeout",
        label: "Timeout (hours)",
        type: "number",
        validation: { min: 1, max: 168 },
      },
    ],
  },
  {
    type: "notification",
    label: "Notification",
    description: "Send notifications",
    icon: "Bell",
    category: "Communication",
    defaultData: {
      label: "Send Notification",
      description: "Send email/SMS notification",
      config: { type: "email", template: "" },
      inputs: [{ id: "input", name: "Data", type: "object", required: true }],
      outputs: [{ id: "output", name: "Sent", type: "object" }],
    },
    configSchema: [
      {
        key: "type",
        label: "Notification Type",
        type: "select",
        options: [
          { label: "Email", value: "email" },
          { label: "SMS", value: "sms" },
          { label: "Slack", value: "slack" },
        ],
      },
      {
        key: "recipients",
        label: "Recipients",
        type: "textarea",
        required: true,
      },
      {
        key: "template",
        label: "Message Template",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    type: "delay",
    label: "Delay",
    description: "Wait for specified time",
    icon: "Clock",
    category: "Flow Control",
    defaultData: {
      label: "Wait",
      description: "Delay execution",
      config: { duration: 5, unit: "minutes" },
      inputs: [{ id: "input", name: "Continue", type: "object" }],
      outputs: [{ id: "output", name: "Next", type: "object" }],
    },
    configSchema: [
      {
        key: "duration",
        label: "Duration",
        type: "number",
        required: true,
        validation: { min: 1 },
      },
      {
        key: "unit",
        label: "Time Unit",
        type: "select",
        options: [
          { label: "Seconds", value: "seconds" },
          { label: "Minutes", value: "minutes" },
          { label: "Hours", value: "hours" },
          { label: "Days", value: "days" },
        ],
      },
    ],
  },
  {
    type: "data",
    label: "Data",
    description: "Process or transform data",
    icon: "Database",
    category: "Data",
    defaultData: {
      label: "Process Data",
      description: "Transform or validate data",
      config: { operation: "transform" },
      inputs: [{ id: "input", name: "Data", type: "object", required: true }],
      outputs: [{ id: "output", name: "Processed", type: "object" }],
    },
    configSchema: [
      {
        key: "operation",
        label: "Operation",
        type: "select",
        options: [
          { label: "Transform", value: "transform" },
          { label: "Validate", value: "validate" },
          { label: "Filter", value: "filter" },
          { label: "Aggregate", value: "aggregate" },
        ],
      },
      {
        key: "script",
        label: "Processing Script",
        type: "textarea",
        placeholder: "Enter data processing logic...",
      },
    ],
  },
  {
    type: "integration",
    label: "Integration",
    description: "Connect to external systems",
    icon: "Link",
    category: "Integrations",
    defaultData: {
      label: "External System",
      description: "Connect to external API",
      config: { service: "", endpoint: "" },
      inputs: [{ id: "input", name: "Request", type: "object" }],
      outputs: [{ id: "output", name: "Response", type: "object" }],
    },
    configSchema: [
      {
        key: "service",
        label: "Service",
        type: "select",
        options: [
          { label: "CRM", value: "crm" },
          { label: "HRMS", value: "hrms" },
          { label: "Email", value: "email" },
          { label: "Custom API", value: "api" },
        ],
      },
      {
        key: "endpoint",
        label: "Endpoint URL",
        type: "url",
        required: true,
      },
      {
        key: "method",
        label: "HTTP Method",
        type: "select",
        options: [
          { label: "GET", value: "GET" },
          { label: "POST", value: "POST" },
          { label: "PUT", value: "PUT" },
          { label: "DELETE", value: "DELETE" },
        ],
      },
    ],
  },
  {
    type: "end",
    label: "End",
    description: "Complete workflow",
    icon: "CheckCircle",
    category: "Flow Control",
    defaultData: {
      label: "End",
      description: "Workflow completion",
      config: { success: true },
      inputs: [{ id: "input", name: "Final", type: "object" }],
    },
    configSchema: [
      {
        key: "success",
        label: "Success Status",
        type: "checkbox",
      },
      {
        key: "message",
        label: "Completion Message",
        type: "text",
        placeholder: "Workflow completed successfully",
      },
    ],
  },
];

const nodeIcons: Record<string, React.ComponentType<any>> = {
  Play,
  Zap,
  GitBranch,
  Users,
  Bell,
  Clock,
  Database,
  Link,
  CheckCircle,
};

export function WorkflowToolbar({
  onAddNode,
  onSave,
  onLoad,
  onExport,
  onImport,
  onExecute,
  onReset,
  onZoomIn,
  onZoomOut,
  onToggleGrid,
  onToggleMinimap,
  showGrid = false,
  showMinimap = false,
  isExecuting = false,
  className,
}: WorkflowToolbarProps) {
  const categories = Array.from(
    new Set(nodeTemplates.map((template) => template.category)),
  );

  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Workflow Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-auto">
        {/* Action Buttons */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" onClick={onSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={onLoad}>
              <FolderOpen className="h-4 w-4 mr-1" />
              Load
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onExecute}
              disabled={isExecuting}
              className={cn(isExecuting && "animate-pulse")}
            >
              <PlayCircle className="h-4 w-4 mr-1" />
              {isExecuting ? "Running..." : "Execute"}
            </Button>
            <Button size="sm" variant="outline" onClick={onReset}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        <Separator />

        {/* View Controls */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">View</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" onClick={onZoomIn}>
              <ZoomIn className="h-4 w-4 mr-1" />
              Zoom In
            </Button>
            <Button size="sm" variant="outline" onClick={onZoomOut}>
              <ZoomOut className="h-4 w-4 mr-1" />
              Zoom Out
            </Button>
            <Button
              size="sm"
              variant={showGrid ? "default" : "outline"}
              onClick={onToggleGrid}
            >
              <Grid3X3 className="h-4 w-4 mr-1" />
              Grid
            </Button>
            <Button
              size="sm"
              variant={showMinimap ? "default" : "outline"}
              onClick={onToggleMinimap}
            >
              <Map className="h-4 w-4 mr-1" />
              Minimap
            </Button>
          </div>
        </div>

        <Separator />

        {/* Node Palette */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            Add Nodes
          </h4>
          {categories.map((category) => (
            <div key={category} className="space-y-2">
              <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {category}
              </h5>
              <div className="space-y-1">
                {nodeTemplates
                  .filter((template) => template.category === category)
                  .map((template) => {
                    const IconComponent = nodeIcons[template.icon];
                    return (
                      <Button
                        key={template.type}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start h-auto p-2"
                        onClick={() => onAddNode(template.type)}
                      >
                        <div className="flex items-start space-x-2 w-full">
                          <IconComponent className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div className="text-left flex-1 min-w-0">
                            <div className="font-medium text-sm">
                              {template.label}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {template.description}
                            </div>
                          </div>
                          <Plus className="h-3 w-3 opacity-50" />
                        </div>
                      </Button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { nodeTemplates };
