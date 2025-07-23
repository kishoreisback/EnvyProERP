import React, { useState, useEffect } from "react";
import {
  WorkflowNode,
  NodeConfigField,
  WorkflowSchema,
  WorkflowExecution,
} from "./types";
import { nodeTemplates } from "./WorkflowToolbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Settings,
  Info,
  Play,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { cn } from "../../../lib/utils";

interface WorkflowPropertiesPanelProps {
  selectedNode?: WorkflowNode | null;
  workflow?: WorkflowSchema | null;
  execution?: WorkflowExecution | null;
  onNodeUpdate?: (nodeId: string, updates: Partial<WorkflowNode>) => void;
  onWorkflowUpdate?: (updates: Partial<WorkflowSchema>) => void;
  className?: string;
}

export function WorkflowPropertiesPanel({
  selectedNode,
  workflow,
  execution,
  onNodeUpdate,
  onWorkflowUpdate,
  className,
}: WorkflowPropertiesPanelProps) {
  const [nodeData, setNodeData] = useState(selectedNode?.data || null);
  const [workflowSettings, setWorkflowSettings] = useState(
    workflow?.settings || null,
  );

  // Update local state when selected node changes
  useEffect(() => {
    setNodeData(selectedNode?.data || null);
  }, [selectedNode]);

  // Update local state when workflow changes
  useEffect(() => {
    setWorkflowSettings(workflow?.settings || null);
  }, [workflow]);

  // Get node template for configuration schema
  const nodeTemplate = selectedNode
    ? nodeTemplates.find((t) => t.type === selectedNode.type)
    : null;

  // Handle node data updates
  const handleNodeDataChange = (key: string, value: any) => {
    if (!selectedNode || !nodeData) return;

    const updatedData = {
      ...nodeData,
      config: {
        ...nodeData.config,
        [key]: value,
      },
    };

    setNodeData(updatedData);
    onNodeUpdate?.(selectedNode.id, { data: updatedData });
  };

  // Handle node label/description updates
  const handleNodeMetaChange = (
    field: "label" | "description",
    value: string,
  ) => {
    if (!selectedNode || !nodeData) return;

    const updatedData = {
      ...nodeData,
      [field]: value,
    };

    setNodeData(updatedData);
    onNodeUpdate?.(selectedNode.id, { data: updatedData });
  };

  // Handle workflow settings updates
  const handleWorkflowSettingsChange = (key: string, value: any) => {
    if (!workflowSettings) return;

    const updatedSettings = {
      ...workflowSettings,
      [key]: value,
    };

    setWorkflowSettings(updatedSettings);
    onWorkflowUpdate?.({ settings: updatedSettings });
  };

  // Render configuration field
  const renderConfigField = (field: NodeConfigField) => {
    const value = nodeData?.config[field.key] || "";

    switch (field.type) {
      case "text":
      case "email":
      case "url":
        return (
          <Input
            value={value}
            onChange={(e) => handleNodeDataChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            type={field.type}
          />
        );

      case "number":
        return (
          <Input
            value={value}
            onChange={(e) =>
              handleNodeDataChange(field.key, Number(e.target.value))
            }
            placeholder={field.placeholder}
            type="number"
            min={field.validation?.min}
            max={field.validation?.max}
          />
        );

      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleNodeDataChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(newValue) =>
              handleNodeDataChange(field.key, newValue)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={Boolean(value)}
              onCheckedChange={(checked) =>
                handleNodeDataChange(field.key, checked)
              }
            />
            <Label className="text-sm">{field.label}</Label>
          </div>
        );

      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleNodeDataChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );
    }
  };

  // Render execution status
  const renderExecutionStatus = () => {
    if (!execution) return null;

    const statusIcons = {
      running: <Play className="h-4 w-4 text-blue-500" />,
      completed: <CheckCircle className="h-4 w-4 text-green-500" />,
      failed: <XCircle className="h-4 w-4 text-red-500" />,
      cancelled: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
    };

    const statusColors = {
      running: "border-blue-200 bg-blue-50",
      completed: "border-green-200 bg-green-50",
      failed: "border-red-200 bg-red-50",
      cancelled: "border-yellow-200 bg-yellow-50",
    };

    return (
      <div
        className={cn("p-3 border rounded-lg", statusColors[execution.status])}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {statusIcons[execution.status]}
            <span className="font-medium capitalize">{execution.status}</span>
          </div>
          <Badge variant="outline">
            {execution.duration ? `${execution.duration}ms` : "Running..."}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          Started: {execution.startTime.toLocaleString()}
          {execution.endTime && (
            <>
              <br />
              Ended: {execution.endTime.toLocaleString()}
            </>
          )}
        </div>
        {execution.error && (
          <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
            {execution.error}
          </div>
        )}
      </div>
    );
  };

  if (!selectedNode && !workflow) {
    return (
      <Card className={cn("h-full", className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <span>Properties</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select a node or workflow to view properties</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Properties</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto">
        <Tabs
          defaultValue={selectedNode ? "node" : "workflow"}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="node" disabled={!selectedNode}>
              Node
            </TabsTrigger>
            <TabsTrigger value="workflow" disabled={!workflow}>
              Workflow
            </TabsTrigger>
          </TabsList>

          {/* Node Properties */}
          <TabsContent value="node" className="space-y-4 mt-4">
            {selectedNode && nodeData && (
              <>
                {/* Node Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{selectedNode.type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      ID: {selectedNode.id}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="node-label">Label</Label>
                    <Input
                      id="node-label"
                      value={nodeData.label}
                      onChange={(e) =>
                        handleNodeMetaChange("label", e.target.value)
                      }
                      placeholder="Node label"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="node-description">Description</Label>
                    <Textarea
                      id="node-description"
                      value={nodeData.description || ""}
                      onChange={(e) =>
                        handleNodeMetaChange("description", e.target.value)
                      }
                      placeholder="Node description"
                      rows={2}
                    />
                  </div>
                </div>

                <Separator />

                {/* Node Configuration */}
                {nodeTemplate && nodeTemplate.configSchema.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Configuration</h4>
                    {nodeTemplate.configSchema.map((field) => (
                      <div key={field.key} className="space-y-2">
                        <Label htmlFor={field.key}>
                          {field.label}
                          {field.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </Label>
                        {renderConfigField(field)}
                        {field.description && (
                          <p className="text-xs text-muted-foreground">
                            {field.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Node Inputs/Outputs */}
                <Separator />
                <div className="space-y-3">
                  <h4 className="font-medium">Inputs & Outputs</h4>
                  {nodeData.inputs && nodeData.inputs.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Inputs</Label>
                      <div className="space-y-1 mt-1">
                        {nodeData.inputs.map((input) => (
                          <div
                            key={input.id}
                            className="flex items-center justify-between text-xs"
                          >
                            <span>{input.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {input.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {nodeData.outputs && nodeData.outputs.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Outputs</Label>
                      <div className="space-y-1 mt-1">
                        {nodeData.outputs.map((output) => (
                          <div
                            key={output.id}
                            className="flex items-center justify-between text-xs"
                          >
                            <span>{output.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {output.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </TabsContent>

          {/* Workflow Properties */}
          <TabsContent value="workflow" className="space-y-4 mt-4">
            {workflow && (
              <>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Workflow Info</Label>
                    <div className="text-sm text-muted-foreground mt-1">
                      <div>Name: {workflow.name}</div>
                      <div>Version: {workflow.version}</div>
                      <div>Trigger: {workflow.trigger}</div>
                      <div>Nodes: {workflow.nodes.length}</div>
                      <div>Connections: {workflow.connections.length}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Execution Status */}
                {execution && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Execution Status
                      </Label>
                      {renderExecutionStatus()}
                    </div>
                    <Separator />
                  </>
                )}

                {/* Workflow Settings */}
                {workflowSettings && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Settings</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Auto Save</Label>
                        <Checkbox
                          checked={workflowSettings.autoSave}
                          onCheckedChange={(checked) =>
                            handleWorkflowSettingsChange("autoSave", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Enable Logging</Label>
                        <Checkbox
                          checked={workflowSettings.enableLogging}
                          onCheckedChange={(checked) =>
                            handleWorkflowSettingsChange(
                              "enableLogging",
                              checked,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">
                          Max Execution Time (sec)
                        </Label>
                        <Input
                          type="number"
                          value={workflowSettings.maxExecutionTime}
                          onChange={(e) =>
                            handleWorkflowSettingsChange(
                              "maxExecutionTime",
                              Number(e.target.value),
                            )
                          }
                          min={1}
                          max={3600}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
