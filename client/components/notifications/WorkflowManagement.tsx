import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Workflow,
  Play,
  Pause,
  Square,
  Settings,
  Edit,
  Trash2,
  Copy,
  MoreHorizontal,
  Plus,
  Filter,
  Search,
  Calendar,
  Clock,
  Users,
  Zap,
  Target,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  Upload,
  GitBranch,
  ArrowRight,
  Timer,
  Bell,
  Mail,
  MessageSquare,
  Webhook,
} from "lucide-react";

import { UserType } from "./types";

interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "draft" | "error";
  category:
    | "operational"
    | "approval"
    | "notification"
    | "integration"
    | "monitoring";
  priority: "low" | "medium" | "high" | "critical";

  // Trigger configuration
  trigger: {
    type: "event" | "schedule" | "manual" | "webhook" | "condition";
    source: string;
    conditions: WorkflowCondition[];
    schedule?: {
      type: "interval" | "cron" | "once";
      value: string;
      timezone: string;
    };
  };

  // Actions
  actions: WorkflowAction[];

  // Metadata
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastRun?: string;
  nextRun?: string;

  // Statistics
  runs: number;
  successRate: number;
  avgExecutionTime: number;

  // Configuration
  timeout: number;
  retryCount: number;
  enabled: boolean;
}

interface WorkflowCondition {
  id: string;
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "greater_than"
    | "less_than"
    | "in"
    | "not_in"
    | "exists"
    | "not_exists";
  value: any;
  logicalOperator?: "AND" | "OR";
}

interface WorkflowAction {
  id: string;
  type:
    | "send_notification"
    | "update_field"
    | "create_record"
    | "call_webhook"
    | "send_email"
    | "assign_user"
    | "delay"
    | "conditional";
  name: string;
  parameters: Record<string, any>;
  delay?: number;
  condition?: WorkflowCondition;
  onSuccess?: string; // Next action ID
  onError?: string; // Error action ID
}

interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: "running" | "completed" | "failed" | "cancelled" | "paused";
  startedAt: string;
  completedAt?: string;
  duration?: number;
  triggeredBy: string;
  input: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
  steps: WorkflowExecutionStep[];
}

interface WorkflowExecutionStep {
  id: string;
  actionId: string;
  name: string;
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  input?: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
}

interface WorkflowManagementProps {
  userType: UserType;
  tenantId: string;
  canCreate?: boolean;
  onCreateWorkflow?: () => void;
}

export function WorkflowManagement({
  userType,
  tenantId,
  canCreate = true,
  onCreateWorkflow,
}: WorkflowManagementProps) {
  const [workflows, setWorkflows] =
    useState<WorkflowRule[]>(getMockWorkflows());
  const [executions, setExecutions] =
    useState<WorkflowExecution[]>(getMockExecutions());
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowRule | null>(
    null,
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Filter workflows
  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || workflow.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || workflow.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Handle workflow actions
  const handleToggleWorkflow = (workflowId: string) => {
    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === workflowId
          ? {
              ...workflow,
              status: workflow.status === "active" ? "paused" : "active",
              updatedAt: new Date().toISOString(),
            }
          : workflow,
      ),
    );
  };

  const handleRunWorkflow = (workflowId: string) => {
    const workflow = workflows.find((w) => w.id === workflowId);
    if (!workflow) return;

    // Create new execution
    const newExecution: WorkflowExecution = {
      id: `exec_${Date.now()}`,
      workflowId,
      status: "running",
      startedAt: new Date().toISOString(),
      triggeredBy: "manual",
      input: { trigger: "manual_run", userId: "current-user" },
      steps: workflow.actions.map((action) => ({
        id: `step_${action.id}`,
        actionId: action.id,
        name: action.name,
        status: "pending",
      })),
    };

    setExecutions((prev) => [newExecution, ...prev]);

    // Simulate execution
    setTimeout(() => {
      setExecutions((prev) =>
        prev.map((exec) =>
          exec.id === newExecution.id
            ? {
                ...exec,
                status: "completed",
                completedAt: new Date().toISOString(),
                duration: Math.floor(Math.random() * 5000) + 1000, // 1-6 seconds
                output: { status: "success", notifications_sent: 3 },
                steps: exec.steps.map((step) => ({
                  ...step,
                  status: "completed",
                  startedAt: new Date().toISOString(),
                  completedAt: new Date().toISOString(),
                  duration: Math.floor(Math.random() * 1000) + 200,
                })),
              }
            : exec,
        ),
      );

      // Update workflow stats
      setWorkflows((prev) =>
        prev.map((workflow) =>
          workflow.id === workflowId
            ? {
                ...workflow,
                runs: workflow.runs + 1,
                lastRun: new Date().toISOString(),
                successRate: Math.min(100, workflow.successRate + 0.5),
              }
            : workflow,
        ),
      );
    }, 2000);
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    if (window.confirm("Are you sure you want to delete this workflow?")) {
      setWorkflows((prev) => prev.filter((w) => w.id !== workflowId));
    }
  };

  const handleDuplicateWorkflow = (workflowId: string) => {
    const workflow = workflows.find((w) => w.id === workflowId);
    if (!workflow) return;

    const duplicatedWorkflow: WorkflowRule = {
      ...workflow,
      id: `workflow_${Date.now()}`,
      name: `${workflow.name} (Copy)`,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      runs: 0,
      successRate: 0,
      lastRun: undefined,
    };

    setWorkflows((prev) => [duplicatedWorkflow, ...prev]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "paused":
        return "bg-yellow-100 text-yellow-700";
      case "draft":
        return "bg-gray-100 text-gray-700";
      case "error":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="h-3 w-3" />;
      case "paused":
        return <Pause className="h-3 w-3" />;
      case "draft":
        return <Edit className="h-3 w-3" />;
      case "error":
        return <XCircle className="h-3 w-3" />;
      default:
        return <Square className="h-3 w-3" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "operational":
        return <Settings className="h-4 w-4" />;
      case "approval":
        return <CheckCircle className="h-4 w-4" />;
      case "notification":
        return <Bell className="h-4 w-4" />;
      case "integration":
        return <Zap className="h-4 w-4" />;
      case "monitoring":
        return <Activity className="h-4 w-4" />;
      default:
        return <Workflow className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Workflow Management
          </h2>
          <p className="text-gray-600">
            Automate your notification and business processes
          </p>
        </div>

        {canCreate && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button onClick={onCreateWorkflow}>
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Workflow className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Total Workflows</p>
              <p className="text-2xl font-bold">{workflows.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Play className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Active</p>
              <p className="text-2xl font-bold">
                {workflows.filter((w) => w.status === "active").length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Executions (24h)</p>
              <p className="text-2xl font-bold">{executions.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Success Rate</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  workflows.reduce((acc, w) => acc + w.successRate, 0) /
                    workflows.length,
                )}
                %
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search workflows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="approval">Approval</SelectItem>
                  <SelectItem value="notification">Notification</SelectItem>
                  <SelectItem value="integration">Integration</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="executions">Recent Executions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-4">
          <div className="grid gap-4">
            {filteredWorkflows.map((workflow) => (
              <Card
                key={workflow.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(workflow.category)}
                        <div>
                          <h3 className="font-semibold text-lg">
                            {workflow.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {workflow.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Badge
                          className={getStatusColor(workflow.status)}
                          variant="secondary"
                        >
                          {getStatusIcon(workflow.status)}
                          <span className="ml-1 capitalize">
                            {workflow.status}
                          </span>
                        </Badge>

                        <Badge variant="outline" className="capitalize">
                          {workflow.category}
                        </Badge>

                        <Badge variant="outline" className="capitalize">
                          {workflow.priority} priority
                        </Badge>

                        <div className="flex items-center text-sm text-gray-500">
                          <Activity className="h-3 w-3 mr-1" />
                          {workflow.runs} runs
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <Target className="h-3 w-3 mr-1" />
                          {workflow.successRate.toFixed(1)}% success
                        </div>

                        {workflow.lastRun && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            Last run:{" "}
                            {new Date(workflow.lastRun).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>Trigger: {workflow.trigger.type}</span>
                        <span>•</span>
                        <span>{workflow.actions.length} actions</span>
                        <span>��</span>
                        <span>Created by {workflow.createdBy}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRunWorkflow(workflow.id)}
                        disabled={workflow.status === "error"}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Run
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleWorkflow(workflow.id)}
                      >
                        {workflow.status === "active" ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Activate
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedWorkflow(workflow);
                          setIsDetailsModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedWorkflow(workflow);
                              setIsEditModalOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDuplicateWorkflow(workflow.id)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteWorkflow(workflow.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Executions Tab */}
        <TabsContent value="executions" className="space-y-4">
          <div className="space-y-4">
            {executions.slice(0, 10).map((execution) => {
              const workflow = workflows.find(
                (w) => w.id === execution.workflowId,
              );
              return (
                <Card key={execution.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Badge
                            className={
                              execution.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : execution.status === "running"
                                  ? "bg-blue-100 text-blue-700"
                                  : execution.status === "failed"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-700"
                            }
                            variant="secondary"
                          >
                            {execution.status === "completed" && (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            )}
                            {execution.status === "running" && (
                              <Timer className="h-3 w-3 mr-1" />
                            )}
                            {execution.status === "failed" && (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {execution.status}
                          </Badge>
                          <h4 className="font-medium">
                            {workflow?.name || "Unknown Workflow"}
                          </h4>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>ID: {execution.id}</span>
                          <span>
                            Started:{" "}
                            {new Date(execution.startedAt).toLocaleString()}
                          </span>
                          {execution.duration && (
                            <span>Duration: {execution.duration}ms</span>
                          )}
                          <span>Triggered by: {execution.triggeredBy}</span>
                        </div>

                        {execution.error && (
                          <Alert className="mt-2 border-red-200 bg-red-50">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-red-700">
                              {execution.error}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="text-right text-sm">
                          <div className="font-medium">
                            {
                              execution.steps.filter(
                                (s) => s.status === "completed",
                              ).length
                            }{" "}
                            / {execution.steps.length}
                          </div>
                          <div className="text-gray-500">steps completed</div>
                        </div>
                        <Progress
                          value={
                            (execution.steps.filter(
                              (s) => s.status === "completed",
                            ).length /
                              execution.steps.length) *
                            100
                          }
                          className="w-20"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Execution Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Activity className="h-8 w-8 mx-auto mb-2" />
                    <p>Execution trend chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Rate by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "operational",
                    "approval",
                    "notification",
                    "integration",
                    "monitoring",
                  ].map((category) => {
                    const categoryWorkflows = workflows.filter(
                      (w) => w.category === category,
                    );
                    const avgSuccessRate =
                      categoryWorkflows.length > 0
                        ? categoryWorkflows.reduce(
                            (acc, w) => acc + w.successRate,
                            0,
                          ) / categoryWorkflows.length
                        : 0;

                    return (
                      <div key={category} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{category}</span>
                          <span>{avgSuccessRate.toFixed(1)}%</span>
                        </div>
                        <Progress value={avgSuccessRate} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Workflow Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Workflow className="h-5 w-5" />
              <span>{selectedWorkflow?.name}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedWorkflow && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge
                    className={getStatusColor(selectedWorkflow.status)}
                    variant="secondary"
                  >
                    {getStatusIcon(selectedWorkflow.status)}
                    <span className="ml-1 capitalize">
                      {selectedWorkflow.status}
                    </span>
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <p className="capitalize">{selectedWorkflow.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Priority</Label>
                  <p className="capitalize">{selectedWorkflow.priority}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Success Rate</Label>
                  <p>{selectedWorkflow.successRate.toFixed(1)}%</p>
                </div>
              </div>

              <Separator />

              {/* Trigger Configuration */}
              <div>
                <Label className="text-sm font-medium">
                  Trigger Configuration
                </Label>
                <Card className="mt-2">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {selectedWorkflow.trigger.type}
                        </Badge>
                        <span className="text-sm">
                          Source: {selectedWorkflow.trigger.source}
                        </span>
                      </div>

                      {selectedWorkflow.trigger.conditions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">
                            Conditions:
                          </p>
                          <div className="space-y-1">
                            {selectedWorkflow.trigger.conditions.map(
                              (condition, index) => (
                                <div
                                  key={index}
                                  className="text-sm bg-gray-50 p-2 rounded"
                                >
                                  {condition.field} {condition.operator}{" "}
                                  {condition.value}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div>
                <Label className="text-sm font-medium">
                  Actions ({selectedWorkflow.actions.length})
                </Label>
                <div className="mt-2 space-y-2">
                  {selectedWorkflow.actions.map((action, index) => (
                    <Card key={action.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{action.name}</h4>
                            <p className="text-sm text-gray-600">
                              Type: {action.type}
                            </p>
                            {action.delay && (
                              <p className="text-sm text-gray-600">
                                Delay: {action.delay}ms
                              </p>
                            )}
                          </div>
                          {index < selectedWorkflow.actions.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Mock data functions
function getMockWorkflows(): WorkflowRule[] {
  return [
    {
      id: "workflow_001",
      name: "PO Approval Notification",
      description:
        "Automatically notify corporate team when PO requires approval",
      status: "active",
      category: "approval",
      priority: "high",
      trigger: {
        type: "event",
        source: "purchase_order.status_changed",
        conditions: [
          {
            id: "cond_001",
            field: "status",
            operator: "equals",
            value: "pending_approval",
          },
          {
            id: "cond_002",
            field: "amount",
            operator: "greater_than",
            value: 50000,
            logicalOperator: "AND",
          },
        ],
      },
      actions: [
        {
          id: "action_001",
          type: "send_notification",
          name: "Send Approval Notification",
          parameters: {
            template: "po_approval_required",
            recipients: ["corporate_approvers"],
            priority: "high",
          },
        },
        {
          id: "action_002",
          type: "send_email",
          name: "Send Email Alert",
          parameters: {
            template: "po_approval_email",
            to: ["approval@company.com"],
          },
        },
      ],
      createdBy: "Admin User",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T14:22:00Z",
      lastRun: "2024-01-22T09:15:00Z",
      runs: 45,
      successRate: 97.8,
      avgExecutionTime: 1250,
      timeout: 30000,
      retryCount: 3,
      enabled: true,
    },
    {
      id: "workflow_002",
      name: "Delivery Status Update",
      description: "Update franchisees when delivery status changes",
      status: "active",
      category: "operational",
      priority: "medium",
      trigger: {
        type: "event",
        source: "delivery.status_updated",
        conditions: [
          {
            id: "cond_003",
            field: "status",
            operator: "in",
            value: ["shipped", "delivered", "delayed"],
          },
        ],
      },
      actions: [
        {
          id: "action_003",
          type: "send_notification",
          name: "Notify Franchisee",
          parameters: {
            template: "delivery_status_update",
            recipients: ["franchisee"],
          },
        },
      ],
      createdBy: "System Admin",
      createdAt: "2024-01-10T08:00:00Z",
      updatedAt: "2024-01-18T16:45:00Z",
      lastRun: "2024-01-22T11:30:00Z",
      runs: 128,
      successRate: 99.2,
      avgExecutionTime: 890,
      timeout: 15000,
      retryCount: 2,
      enabled: true,
    },
    {
      id: "workflow_003",
      name: "Daily Digest Email",
      description: "Send daily summary of notifications to managers",
      status: "active",
      category: "notification",
      priority: "low",
      trigger: {
        type: "schedule",
        source: "system",
        conditions: [],
        schedule: {
          type: "cron",
          value: "0 9 * * *",
          timezone: "Asia/Kolkata",
        },
      },
      actions: [
        {
          id: "action_004",
          type: "send_email",
          name: "Send Daily Digest",
          parameters: {
            template: "daily_digest",
            recipients: ["managers"],
          },
        },
      ],
      createdBy: "HR Manager",
      createdAt: "2024-01-05T12:00:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
      lastRun: "2024-01-22T09:00:00Z",
      nextRun: "2024-01-23T09:00:00Z",
      runs: 17,
      successRate: 100.0,
      avgExecutionTime: 2340,
      timeout: 60000,
      retryCount: 1,
      enabled: true,
    },
  ];
}

function getMockExecutions(): WorkflowExecution[] {
  return [
    {
      id: "exec_001",
      workflowId: "workflow_001",
      status: "completed",
      startedAt: "2024-01-22T09:15:00Z",
      completedAt: "2024-01-22T09:15:02Z",
      duration: 1850,
      triggeredBy: "system",
      input: {
        po_id: "PO-2024-003",
        amount: 75500,
        status: "pending_approval",
      },
      output: {
        notifications_sent: 2,
        emails_sent: 1,
      },
      steps: [
        {
          id: "step_001",
          actionId: "action_001",
          name: "Send Approval Notification",
          status: "completed",
          startedAt: "2024-01-22T09:15:00Z",
          completedAt: "2024-01-22T09:15:01Z",
          duration: 650,
          output: { notification_id: "notif_001" },
        },
        {
          id: "step_002",
          actionId: "action_002",
          name: "Send Email Alert",
          status: "completed",
          startedAt: "2024-01-22T09:15:01Z",
          completedAt: "2024-01-22T09:15:02Z",
          duration: 1200,
          output: { email_id: "email_001" },
        },
      ],
    },
    {
      id: "exec_002",
      workflowId: "workflow_002",
      status: "completed",
      startedAt: "2024-01-22T11:30:00Z",
      completedAt: "2024-01-22T11:30:01Z",
      duration: 920,
      triggeredBy: "system",
      input: {
        delivery_id: "DEL-2024-156",
        status: "delivered",
      },
      output: {
        notifications_sent: 1,
      },
      steps: [
        {
          id: "step_003",
          actionId: "action_003",
          name: "Notify Franchisee",
          status: "completed",
          startedAt: "2024-01-22T11:30:00Z",
          completedAt: "2024-01-22T11:30:01Z",
          duration: 920,
          output: { notification_id: "notif_002" },
        },
      ],
    },
    {
      id: "exec_003",
      workflowId: "workflow_003",
      status: "running",
      startedAt: "2024-01-22T09:00:00Z",
      triggeredBy: "schedule",
      input: {
        date: "2024-01-22",
        timezone: "Asia/Kolkata",
      },
      steps: [
        {
          id: "step_004",
          actionId: "action_004",
          name: "Send Daily Digest",
          status: "running",
          startedAt: "2024-01-22T09:00:00Z",
        },
      ],
    },
  ];
}
