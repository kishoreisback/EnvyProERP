import React, { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { WorkflowBuilder } from "../components/advanced/workflow";
import {
  WorkflowSchema,
  WorkflowExecution,
} from "../components/advanced/workflow/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  Workflow,
  Zap,
  GitBranch,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function VisualWorkflowBuilderDemo() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [savedWorkflows, setSavedWorkflows] = useState<WorkflowSchema[]>([]);

  const handleSaveWorkflow = (workflow: WorkflowSchema) => {
    const updatedWorkflow = {
      ...workflow,
      updatedAt: new Date(),
    };

    setSavedWorkflows((prev) => {
      const existing = prev.find((w) => w.id === workflow.id);
      if (existing) {
        return prev.map((w) => (w.id === workflow.id ? updatedWorkflow : w));
      }
      return [...prev, updatedWorkflow];
    });

    console.log("Workflow saved:", updatedWorkflow);
    // Toast is now handled by the WorkflowBuilder component for manual saves only
  };

  const handleExecuteWorkflow = async (
    workflow: WorkflowSchema,
  ): Promise<WorkflowExecution> => {
    // Simulate workflow execution
    const execution: WorkflowExecution = {
      id: `exec-${Date.now()}`,
      workflowId: workflow.id,
      status: "running",
      startTime: new Date(),
      logs: [
        {
          id: "log-1",
          nodeId: "start",
          timestamp: new Date(),
          level: "info",
          message: "Workflow execution started",
        },
      ],
      variables: {},
    };

    // Simulate async execution
    setTimeout(() => {
      execution.status = "completed";
      execution.endTime = new Date();
      execution.duration =
        execution.endTime.getTime() - execution.startTime.getTime();
      execution.logs.push({
        id: "log-2",
        nodeId: "end",
        timestamp: new Date(),
        level: "info",
        message: "Workflow execution completed successfully",
      });
    }, 3000);

    toast({
      title: "Workflow Executing",
      description: `"${workflow.name}" execution has started.`,
    });

    return execution;
  };

  // Sample workflow templates
  const sampleWorkflows: Partial<WorkflowSchema>[] = [
    {
      name: "Employee Onboarding",
      description: "Automate new employee onboarding process",
      trigger: "form_submission",
    },
    {
      name: "Invoice Approval",
      description: "Multi-step invoice approval workflow",
      trigger: "webhook",
    },
    {
      name: "Project Request",
      description: "Automated project request and approval",
      trigger: "manual",
    },
  ];

  const loadSampleWorkflow = (template: Partial<WorkflowSchema>) => {
    const sampleWorkflow: WorkflowSchema = {
      id: `workflow-${Date.now()}`,
      name: template.name!,
      description: template.description!,
      version: "1.0.0",
      trigger: template.trigger!,
      nodes: [
        {
          id: "start-1",
          type: "start",
          position: { x: 100, y: 100 },
          data: {
            label: "Start",
            description: "Begin workflow",
            config: { triggerType: template.trigger },
            outputs: [{ id: "output", name: "Next", type: "object" }],
          },
        },
        {
          id: "action-1",
          type: "action",
          position: { x: 400, y: 100 },
          data: {
            label: "Process Request",
            description: "Process the incoming request",
            config: { actionType: "custom" },
            inputs: [
              { id: "input", name: "Data", type: "object", required: true },
            ],
            outputs: [{ id: "output", name: "Result", type: "object" }],
          },
        },
        {
          id: "end-1",
          type: "end",
          position: { x: 700, y: 100 },
          data: {
            label: "Complete",
            description: "Workflow completed",
            config: { success: true },
            inputs: [{ id: "input", name: "Final", type: "object" }],
          },
        },
      ],
      connections: [
        {
          id: "conn-1",
          sourceNodeId: "start-1",
          targetNodeId: "action-1",
          sourceHandle: "output",
          targetHandle: "input",
        },
        {
          id: "conn-2",
          sourceNodeId: "action-1",
          targetNodeId: "end-1",
          sourceHandle: "output",
          targetHandle: "input",
        },
      ],
      settings: {
        autoSave: true,
        enableLogging: true,
        maxExecutionTime: 300,
        retryPolicy: {
          enabled: false,
          maxRetries: 3,
          retryDelay: 1000,
        },
        notifications: {
          onSuccess: true,
          onFailure: true,
          onTimeout: true,
        },
      },
      createdAt: new Date(),
    };

    toast({
      title: "Sample Workflow Loaded",
      description: `${template.name} template has been loaded.`,
    });

    return sampleWorkflow;
  };

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-background p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/advanced-patterns")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Advanced Patterns
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
                  <Workflow className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    Visual Workflow Builder
                  </h1>
                  <p className="text-muted-foreground">
                    Automate complex business processes with visual workflows
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-4">
              <Card className="p-3">
                <div className="flex items-center space-x-2">
                  <Workflow className="h-4 w-4 text-blue-500" />
                  <div className="text-sm">
                    <div className="font-medium">{savedWorkflows.length}</div>
                    <div className="text-muted-foreground">Workflows</div>
                  </div>
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-green-500" />
                  <div className="text-sm">
                    <div className="font-medium">
                      {savedWorkflows.reduce(
                        (acc, w) => acc + w.nodes.length,
                        0,
                      )}
                    </div>
                    <div className="text-muted-foreground">Total Nodes</div>
                  </div>
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center space-x-2">
                  <GitBranch className="h-4 w-4 text-purple-500" />
                  <div className="text-sm">
                    <div className="font-medium">
                      {savedWorkflows.reduce(
                        (acc, w) => acc + w.connections.length,
                        0,
                      )}
                    </div>
                    <div className="text-muted-foreground">Connections</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Workflow className="h-4 w-4 text-blue-500" />
                  <h3 className="font-medium text-sm">Drag & Drop</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Visual workflow designer with drag-and-drop interface
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Zap className="h-4 w-4 text-green-500" />
                  <h3 className="font-medium text-sm">Real-time Execution</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Execute workflows in real-time with live monitoring
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <GitBranch className="h-4 w-4 text-purple-500" />
                  <h3 className="font-medium text-sm">Conditional Logic</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Smart branching with conditions and approvals
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <h3 className="font-medium text-sm">Pre-built Templates</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ready-to-use workflow templates for common processes
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Start Templates */}
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Quick Start Templates</h3>
            <div className="flex space-x-2">
              {sampleWorkflows.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const workflow = loadSampleWorkflow(template);
                    handleSaveWorkflow(workflow);
                  }}
                >
                  <Workflow className="h-3 w-3 mr-1" />
                  {template.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {template.trigger}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Workflow Builder */}
        <div className="flex-1 overflow-hidden min-h-[600px]">
          <WorkflowBuilder
            onSave={handleSaveWorkflow}
            onExecute={handleExecuteWorkflow}
            className="h-full"
          />
        </div>
      </div>
    </MainLayout>
  );
}
