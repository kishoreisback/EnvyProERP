import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Bell,
  Plus,
  Search,
  Filter,
  Settings,
  Send,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Building2,
  Workflow,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Mail,
  MessageSquare,
  Smartphone,
  Database,
  TrendingUp,
  BarChart3,
  Activity,
  Target,
  FileText,
  Calendar,
  GitBranch,
  Pause,
  Play,
  Archive,
} from "lucide-react";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  usePermissions,
  ProtectedComponent,
} from "../user-management/PermissionProvider";
import {
  TenantNotification,
  NotificationTemplate,
  NotificationRule,
  NotificationType,
  NotificationPriority,
  NotificationStatus,
  NotificationChannel,
  NotificationCategory,
} from "./types";
import {
  getTenantNotifications,
  getTenantTemplates,
  getTenantRules,
  getTenantSettings,
  getTenantAnalytics,
  filterNotifications,
} from "./data";
import { getTenantWorkflows, getActiveWorkflows } from "../workflows/data";
import {
  TenantWorkflow,
  WorkflowStatus,
  WorkflowCategory,
} from "../workflows/types";

// Available tenants for switching
const availableTenants = [
  { id: "tenant_001", name: "BuildCorp Constructions", type: "Construction" },
  { id: "tenant_002", name: "Metro Realty Group", type: "Real Estate" },
  { id: "tenant_003", name: "Skyline Developers", type: "Development" },
];

interface NotificationWorkflowDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function NotificationWorkflowDashboard({
  currentTab = "overview",
  onTabChange,
}: NotificationWorkflowDashboardProps) {
  const { user: currentUser, hasPermission, isTenantAdmin } = usePermissions();

  // State management
  const [selectedTenantId, setSelectedTenantId] = useState(
    currentUser?.tenantId || "tenant_001",
  );
  const [activeTab, setActiveTab] = useState(currentTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterChannel, setFilterChannel] = useState<string>("all");

  // Workflow state
  const [workflowSearchQuery, setWorkflowSearchQuery] = useState("");
  const [workflowFilterCategory, setWorkflowFilterCategory] =
    useState<string>("all");
  const [workflowFilterStatus, setWorkflowFilterStatus] =
    useState<string>("all");
  const [selectedWorkflow, setSelectedWorkflow] =
    useState<TenantWorkflow | null>(null);

  // Modal states
  const [selectedNotification, setSelectedNotification] =
    useState<TenantNotification | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<NotificationTemplate | null>(null);
  const [selectedRule, setSelectedRule] = useState<NotificationRule | null>(
    null,
  );
  const [modals, setModals] = useState({
    createNotification: false,
    createTemplate: false,
    createRule: false,
    viewNotification: false,
    editTemplate: false,
    editRule: false,
    settings: false,
    createWorkflow: false,
    editWorkflow: false,
    viewWorkflow: false,
    importWorkflow: false,
  });

  // Get tenant-specific data
  const notifications = getTenantNotifications(selectedTenantId);
  const templates = getTenantTemplates(selectedTenantId);
  const rules = getTenantRules(selectedTenantId);
  const settings = getTenantSettings(selectedTenantId);
  const analytics = getTenantAnalytics(selectedTenantId);
  const workflows = getTenantWorkflows(selectedTenantId);
  const currentTenant = availableTenants.find((t) => t.id === selectedTenantId);

  // Sync activeTab with currentTab prop
  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  // Handle tab changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
  };

  // Handle tenant switching
  const handleTenantSwitch = (tenantId: string) => {
    setSelectedTenantId(tenantId);
    setSearchQuery("");
    setFilterType("all");
    setFilterStatus("all");
    setFilterPriority("all");
    setFilterChannel("all");
    setSelectedNotification(null);
    setSelectedTemplate(null);
    setSelectedRule(null);
    setWorkflowSearchQuery("");
    setWorkflowFilterCategory("all");
    setWorkflowFilterStatus("all");
    setSelectedWorkflow(null);
  };

  // Filter notifications based on search and filters
  const filteredNotifications = useMemo(() => {
    const filters: any = {};

    if (searchQuery) filters.search = searchQuery;
    if (filterType !== "all") filters.types = [filterType as NotificationType];
    if (filterStatus !== "all")
      filters.statuses = [filterStatus as NotificationStatus];
    if (filterPriority !== "all")
      filters.priorities = [filterPriority as NotificationPriority];
    if (filterChannel !== "all")
      filters.channels = [filterChannel as NotificationChannel];

    return filterNotifications(notifications, filters);
  }, [
    notifications,
    searchQuery,
    filterType,
    filterStatus,
    filterPriority,
    filterChannel,
  ]);

  // Filter workflows based on search and filters
  const filteredWorkflows = useMemo(() => {
    let filtered = workflows;

    if (workflowSearchQuery) {
      filtered = filtered.filter(
        (w) =>
          w.name.toLowerCase().includes(workflowSearchQuery.toLowerCase()) ||
          w.description
            ?.toLowerCase()
            .includes(workflowSearchQuery.toLowerCase()) ||
          w.tags.some((tag) =>
            tag.toLowerCase().includes(workflowSearchQuery.toLowerCase()),
          ),
      );
    }

    if (workflowFilterCategory !== "all") {
      filtered = filtered.filter((w) => w.category === workflowFilterCategory);
    }

    if (workflowFilterStatus !== "all") {
      filtered = filtered.filter((w) => w.status === workflowFilterStatus);
    }

    return filtered;
  }, [
    workflows,
    workflowSearchQuery,
    workflowFilterCategory,
    workflowFilterStatus,
  ]);

  // Get workflow statistics
  const workflowStats = useMemo(() => {
    const total = workflows.length;
    const active = workflows.filter((w) => w.status === "active").length;
    const totalExecutions = workflows.reduce(
      (sum, w) => sum + w.executionCount,
      0,
    );
    const totalSuccesses = workflows.reduce(
      (sum, w) => sum + w.successCount,
      0,
    );
    const totalDuration = workflows.reduce(
      (sum, w) => sum + (w.averageExecutionTime || 0),
      0,
    );
    const totalFailures = workflows.reduce((sum, w) => sum + w.failureCount, 0);

    // Mock "today" data - in real app this would come from API
    const executionsToday = Math.floor(totalExecutions * 0.1);
    const failedLast7Days = Math.floor(totalFailures * 0.3);

    return {
      total,
      active,
      executionsToday,
      successRate:
        totalExecutions > 0
          ? Math.round((totalSuccesses / totalExecutions) * 100)
          : 0,
      avgDuration: total > 0 ? totalDuration / total : 0,
      failed: failedLast7Days,
    };
  }, [workflows]);

  // Get notification statistics
  const notificationStats = useMemo(() => {
    const total = notifications.length;
    const sent = notifications.filter(
      (n) => n.status === "sent" || n.status === "delivered",
    ).length;
    const delivered = notifications.filter(
      (n) => n.status === "delivered",
    ).length;
    const read = notifications.filter((n) => n.readAt).length;
    const failed = notifications.filter((n) => n.status === "failed").length;

    return {
      total,
      sent,
      delivered,
      read,
      failed,
      deliveryRate: sent > 0 ? Math.round((delivered / sent) * 100) : 0,
      readRate: delivered > 0 ? Math.round((read / delivered) * 100) : 0,
    };
  }, [notifications]);

  // Helper functions
  const getPriorityColor = (priority: NotificationPriority) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      normal: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
      critical: "bg-red-200 text-red-900",
    };
    return colors[priority] || colors.normal;
  };

  const getStatusColor = (status: NotificationStatus) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800",
      scheduled: "bg-yellow-100 text-yellow-800",
      sending: "bg-blue-100 text-blue-800",
      sent: "bg-green-100 text-green-800",
      delivered: "bg-green-200 text-green-900",
      read: "bg-purple-100 text-purple-800",
      failed: "bg-red-100 text-red-800",
      cancelled: "bg-gray-200 text-gray-900",
      expired: "bg-orange-100 text-orange-800",
    };
    return colors[status] || colors.draft;
  };

  const getChannelIcon = (channel: NotificationChannel) => {
    const icons = {
      in_app: <Bell className="h-4 w-4" />,
      email: <Mail className="h-4 w-4" />,
      sms: <Smartphone className="h-4 w-4" />,
      whatsapp: <MessageSquare className="h-4 w-4" />,
      push: <Zap className="h-4 w-4" />,
      webhook: <GitBranch className="h-4 w-4" />,
      slack: <MessageSquare className="h-4 w-4" />,
      teams: <Users className="h-4 w-4" />,
    };
    return icons[channel] || <Bell className="h-4 w-4" />;
  };

  const getTypeIcon = (type: NotificationType) => {
    const icons = {
      system: <Settings className="h-4 w-4" />,
      workflow: <Workflow className="h-4 w-4" />,
      approval: <CheckCircle className="h-4 w-4" />,
      reminder: <Clock className="h-4 w-4" />,
      alert: <AlertTriangle className="h-4 w-4" />,
      announcement: <Bell className="h-4 w-4" />,
      update: <TrendingUp className="h-4 w-4" />,
      invitation: <Users className="h-4 w-4" />,
      confirmation: <CheckCircle className="h-4 w-4" />,
      marketing: <Target className="h-4 w-4" />,
      transactional: <FileText className="h-4 w-4" />,
      security: <AlertTriangle className="h-4 w-4" />,
      performance: <BarChart3 className="h-4 w-4" />,
      compliance: <FileText className="h-4 w-4" />,
    };
    return icons[type] || <Bell className="h-4 w-4" />;
  };

  // Action handlers
  const handleNotificationAction = (
    action: string,
    notification: TenantNotification,
  ) => {
    switch (action) {
      case "view":
        setSelectedNotification(notification);
        setModals((prev) => ({ ...prev, viewNotification: true }));
        break;
      case "resend":
        console.log("Resend notification:", notification.id);
        break;
      case "delete":
        if (
          window.confirm("Are you sure you want to delete this notification?")
        ) {
          console.log("Delete notification:", notification.id);
        }
        break;
    }
  };

  const handleTemplateAction = (
    action: string,
    template: NotificationTemplate,
  ) => {
    switch (action) {
      case "edit":
        setSelectedTemplate(template);
        setModals((prev) => ({ ...prev, editTemplate: true }));
        break;
      case "duplicate":
        console.log("Duplicate template:", template.id);
        break;
      case "delete":
        if (window.confirm("Are you sure you want to delete this template?")) {
          console.log("Delete template:", template.id);
        }
        break;
    }
  };

  const handleRuleAction = (action: string, rule: NotificationRule) => {
    switch (action) {
      case "edit":
        setSelectedRule(rule);
        setModals((prev) => ({ ...prev, editRule: true }));
        break;
      case "toggle":
        console.log("Toggle rule:", rule.id, !rule.isActive);
        break;
      case "delete":
        if (window.confirm("Are you sure you want to delete this rule?")) {
          console.log("Delete rule:", rule.id);
        }
        break;
    }
  };

  const handleWorkflowAction = (action: string, workflow: TenantWorkflow) => {
    switch (action) {
      case "view":
        setSelectedWorkflow(workflow);
        setModals((prev) => ({ ...prev, viewWorkflow: true }));
        break;
      case "edit":
        setSelectedWorkflow(workflow);
        setModals((prev) => ({ ...prev, editWorkflow: true }));
        break;
      case "execute":
        console.log("Execute workflow:", workflow.id);
        // In real app, would trigger workflow execution
        break;
      case "duplicate":
        console.log("Duplicate workflow:", workflow.id);
        // In real app, would create a copy of the workflow
        break;
      case "pause":
        console.log("Pause workflow:", workflow.id);
        // In real app, would update workflow status to paused
        break;
      case "activate":
        console.log("Activate workflow:", workflow.id);
        // In real app, would update workflow status to active
        break;
      case "delete":
        if (window.confirm("Are you sure you want to delete this workflow?")) {
          console.log("Delete workflow:", workflow.id);
          // In real app, would delete the workflow
        }
        break;
    }
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
    if (modalName === "viewNotification") setSelectedNotification(null);
    if (modalName === "editTemplate") setSelectedTemplate(null);
    if (modalName === "editRule") setSelectedRule(null);
    if (modalName === "viewWorkflow") setSelectedWorkflow(null);
    if (modalName === "editWorkflow") setSelectedWorkflow(null);
  };

  return (
    <div className="space-y-6">
      {/* Header with Tenant Switching - Matching Purchase Order Style */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold">Notifications & Workflows</h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive notification system and automated workflow management
            across all operations
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="gap-1">
              <Building2 className="h-3 w-3" />
              {currentTenant?.name}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Target className="h-3 w-3" />
              {currentTenant?.type}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Bell className="h-3 w-3" />
              {notifications.length} Notifications
            </Badge>
            <Badge variant="outline" className="gap-1">
              <FileText className="h-3 w-3" />
              {templates.length} Templates
            </Badge>
            <Badge variant="outline" className="gap-1">
              <GitBranch className="h-3 w-3" />
              {rules.length} Rules
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Workflow className="h-3 w-3" />
              {workflows.length} Workflows
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="tenant-select" className="text-sm font-medium">
              Switch Tenant:
            </Label>
            <Select value={selectedTenantId} onValueChange={handleTenantSwitch}>
              <SelectTrigger id="tenant-select" className="w-[280px]">
                <SelectValue placeholder="Select tenant" />
              </SelectTrigger>
              <SelectContent>
                {availableTenants.map((tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{tenant.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {tenant.type}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ProtectedComponent permission="notifications:manage">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setModals((prev) => ({ ...prev, settings: true }))}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </ProtectedComponent>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Rules
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Statistics Cards - Matching Purchase Order Style */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-blue-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-blue-700">
                    Total Notifications
                  </CardTitle>
                  <div className="text-3xl font-bold text-blue-900">
                    <AnimatedCounter value={notificationStats.total} />
                  </div>
                  <p className="text-sm text-blue-600">
                    {notificationStats.sent} sent this month
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-green-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-green-700">
                    Delivery Rate
                  </CardTitle>
                  <div className="text-3xl font-bold text-green-900">
                    <AnimatedCounter value={notificationStats.deliveryRate} />%
                  </div>
                  <p className="text-sm text-green-600">
                    {notificationStats.delivered}/{notificationStats.sent}{" "}
                    delivered
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-orange-50 border-orange-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-orange-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-orange-700">
                    Read Rate
                  </CardTitle>
                  <div className="text-3xl font-bold text-orange-900">
                    <AnimatedCounter value={notificationStats.readRate} />%
                  </div>
                  <p className="text-sm text-orange-600">
                    {notificationStats.read} opened
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-purple-50 border-purple-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-purple-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-purple-700">
                    Active Rules
                  </CardTitle>
                  <div className="text-3xl font-bold text-purple-900">
                    <AnimatedCounter
                      value={rules.filter((r) => r.isActive).length}
                    />
                  </div>
                  <p className="text-sm text-purple-600">
                    {rules.length} total rules
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <GitBranch className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity and Quick Actions */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Recent Notifications
                </CardTitle>
                <CardDescription>
                  Latest notifications sent across all channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-blue-100/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                          {getTypeIcon(notification.type)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(
                              notification.createdAt,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(notification.status)}>
                        {notification.status}
                      </Badge>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full mt-3"
                    onClick={() => handleTabChange("notifications")}
                  >
                    View All Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Navigate to different sections and perform tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("notifications")}
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-blue-50 border-blue-200"
                    >
                      <Bell className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">
                        View Notifications
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("templates")}
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-green-50 border-green-200"
                    >
                      <FileText className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">
                        Manage Templates
                      </span>
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("rules")}
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-orange-50 border-orange-200"
                    >
                      <GitBranch className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium">
                        Automation Rules
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("workflows")}
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-purple-50 border-purple-200"
                    >
                      <Workflow className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium">Workflows</span>
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("analytics")}
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-indigo-50 border-indigo-200"
                    >
                      <BarChart3 className="h-5 w-5 text-indigo-600" />
                      <span className="text-sm font-medium">
                        View Analytics
                      </span>
                    </Button>
                    <ProtectedComponent permission="notifications.create">
                      <Button
                        onClick={() =>
                          setModals((prev) => ({
                            ...prev,
                            createNotification: true,
                          }))
                        }
                        className="h-auto p-4 flex flex-col items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Plus className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          Send Notification
                        </span>
                      </Button>
                    </ProtectedComponent>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="workflow">Workflow</SelectItem>
                  <SelectItem value="approval">Approval</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ProtectedComponent permission="notifications.create">
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, createNotification: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
            </ProtectedComponent>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                Notifications ({filteredNotifications.length})
              </CardTitle>
              <CardDescription>
                Manage notifications for {currentTenant?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Notification</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Channels</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.slice(0, 10).map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-xs">
                            {notification.message}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(notification.type)}
                          <span className="capitalize">
                            {notification.type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getPriorityColor(notification.priority)}
                        >
                          {notification.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {notification.channels.slice(0, 3).map((channel) => (
                            <div
                              key={channel}
                              className="p-1 rounded bg-gray-100"
                            >
                              {getChannelIcon(channel)}
                            </div>
                          ))}
                          {notification.channels.length > 3 && (
                            <div className="p-1 rounded bg-gray-100 text-xs">
                              +{notification.channels.length - 3}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(notification.status)}>
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                handleNotificationAction("view", notification)
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {notification.permissions.canResend && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleNotificationAction(
                                    "resend",
                                    notification,
                                  )
                                }
                              >
                                <Send className="mr-2 h-4 w-4" />
                                Resend
                              </DropdownMenuItem>
                            )}
                            {notification.permissions.canDelete && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleNotificationAction(
                                    "delete",
                                    notification,
                                  )
                                }
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Notification Templates</h2>
              <p className="text-muted-foreground">
                Manage reusable notification templates
              </p>
            </div>
            <ProtectedComponent permission="notifications.create_template">
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, createTemplate: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </ProtectedComponent>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <Badge variant="outline">{template.type}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Channels:</span>
                      <div className="flex gap-1">
                        {template.defaultChannels.map((channel) => (
                          <div
                            key={channel}
                            className="p-1 rounded bg-gray-100"
                          >
                            {getChannelIcon(channel)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Used {template.usageCount} times</span>
                      <Badge
                        variant={template.isActive ? "default" : "secondary"}
                      >
                        {template.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTemplateAction("edit", template)}
                        className="flex-1"
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              handleTemplateAction("duplicate", template)
                            }
                          >
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleTemplateAction("delete", template)
                            }
                            className="text-red-600"
                          >
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

        {/* Rules Tab */}
        <TabsContent value="rules" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Automation Rules</h2>
              <p className="text-muted-foreground">
                Automated notification triggers and workflows
              </p>
            </div>
            <ProtectedComponent permission="notifications.create_rule">
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, createRule: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Rule
              </Button>
            </ProtectedComponent>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Triggers</TableHead>
                    <TableHead>Executions</TableHead>
                    <TableHead>Last Executed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{rule.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {rule.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {rule.isActive ? (
                            <Play className="h-4 w-4 text-green-600" />
                          ) : (
                            <Pause className="h-4 w-4 text-gray-600" />
                          )}
                          <Badge
                            variant={rule.isActive ? "default" : "secondary"}
                          >
                            {rule.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {rule.triggers.map((trigger, idx) => (
                            <div key={idx}>{trigger.event}</div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {rule.executionCount}
                          </div>
                          <div className="text-muted-foreground">
                            Max: {rule.maxExecutions || "Unlimited"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {rule.lastExecuted
                          ? new Date(rule.lastExecuted).toLocaleDateString()
                          : "Never"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleRuleAction("edit", rule)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Rule
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleRuleAction("toggle", rule)}
                            >
                              {rule.isActive ? (
                                <>
                                  <Pause className="mr-2 h-4 w-4" />
                                  Pause Rule
                                </>
                              ) : (
                                <>
                                  <Play className="mr-2 h-4 w-4" />
                                  Activate Rule
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleRuleAction("delete", rule)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Rule
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Workflow Management</h2>
              <p className="text-muted-foreground">
                Manage automated workflows and business processes for{" "}
                {currentTenant?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <ProtectedComponent permission="workflows.create">
                <Button
                  onClick={() =>
                    setModals((prev) => ({ ...prev, createWorkflow: true }))
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Workflow
                </Button>
              </ProtectedComponent>
              <Button
                variant="outline"
                onClick={() =>
                  setModals((prev) => ({ ...prev, importWorkflow: true }))
                }
              >
                <Archive className="mr-2 h-4 w-4" />
                Import Template
              </Button>
            </div>
          </div>

          {/* Workflow Statistics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Workflow className="h-4 w-4" />
                  Total Workflows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{workflowStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  {workflowStats.active} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Executions Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {workflowStats.executionsToday}
                </div>
                <p className="text-xs text-muted-foreground">
                  {workflowStats.successRate}% success rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Avg. Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(workflowStats.avgDuration / 60000)}m
                </div>
                <p className="text-xs text-muted-foreground">
                  Average execution time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Failed Executions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{workflowStats.failed}</div>
                <p className="text-xs text-muted-foreground">
                  In the last 7 days
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Workflow Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search workflows..."
                  value={workflowSearchQuery}
                  onChange={(e) => setWorkflowSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={workflowFilterCategory}
                onValueChange={setWorkflowFilterCategory}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="approval">Approval</SelectItem>
                  <SelectItem value="crm">CRM</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={workflowFilterStatus}
                onValueChange={setWorkflowFilterStatus}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Workflows Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorkflows.map((workflow) => (
              <Card
                key={workflow.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {workflow.category}
                        </Badge>
                        <Badge
                          variant={
                            workflow.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {workflow.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-base line-clamp-1">
                        {workflow.name}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {workflow.description}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleWorkflowAction("view", workflow)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleWorkflowAction("edit", workflow)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Workflow
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleWorkflowAction("execute", workflow)
                          }
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Execute Now
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleWorkflowAction("duplicate", workflow)
                          }
                        >
                          <Archive className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        {workflow.status === "active" ? (
                          <DropdownMenuItem
                            onClick={() =>
                              handleWorkflowAction("pause", workflow)
                            }
                          >
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() =>
                              handleWorkflowAction("activate", workflow)
                            }
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() =>
                            handleWorkflowAction("delete", workflow)
                          }
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Trigger:</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {workflow.trigger.type.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Nodes:</span>
                      <span>{workflow.nodes.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Executions:</span>
                      <span>{workflow.executionCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Success Rate:
                      </span>
                      <span>
                        {Math.round(
                          (workflow.successCount /
                            Math.max(workflow.executionCount, 1)) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Run:</span>
                      <span>
                        {workflow.lastExecuted
                          ? new Date(workflow.lastExecuted).toLocaleDateString()
                          : "Never"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Version:</span>
                      <span className="font-mono text-xs">
                        {workflow.version}
                      </span>
                    </div>
                    {workflow.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {workflow.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {workflow.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{workflow.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredWorkflows.length === 0 && (
            <div className="text-center py-12">
              <Workflow className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No workflows found</h3>
              <p className="text-muted-foreground mb-4">
                {workflowSearchQuery ||
                workflowFilterCategory !== "all" ||
                workflowFilterStatus !== "all"
                  ? "Try adjusting your filters to see more workflows."
                  : "Create your first workflow to get started with automation."}
              </p>
              {!workflowSearchQuery &&
                workflowFilterCategory === "all" &&
                workflowFilterStatus === "all" && (
                  <ProtectedComponent permission="workflows.create">
                    <Button
                      onClick={() =>
                        setModals((prev) => ({ ...prev, createWorkflow: true }))
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Workflow
                    </Button>
                  </ProtectedComponent>
                )}
            </div>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {analytics ? (
            <div className="space-y-6">
              {/* Performance Overview */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Total Sent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics.overview.totalSent}
                    </div>
                    <p className="text-xs text-muted-foreground">This period</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Delivery Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics.overview.deliveryRate}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {analytics.overview.totalDelivered} delivered
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Read Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics.overview.readRate}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {analytics.overview.totalRead} opened
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Click Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics.overview.clickRate}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {analytics.overview.totalClicked} clicked
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Channel Performance */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Channel Performance</CardTitle>
                    <CardDescription>
                      Performance by notification channel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(analytics.byChannel).map(
                        ([channel, stats]) => (
                          <div
                            key={channel}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              {getChannelIcon(channel as NotificationChannel)}
                              <span className="capitalize">{channel}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{stats.sent}</div>
                              <div className="text-xs text-muted-foreground">
                                {Math.round(
                                  (stats.delivered / stats.sent) * 100,
                                )}
                                % delivered
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Templates</CardTitle>
                    <CardDescription>
                      Templates with highest engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.topPerformers.templates.map((template) => (
                        <div key={template.templateId} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">
                              {template.templateName}
                            </span>
                            <span className="text-sm">
                              {template.clickRate}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${template.clickRate}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cost Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                  <CardDescription>
                    Notification costs breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <div className="text-2xl font-bold">
                        ${analytics.costs.total}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Total cost
                      </p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        ${analytics.costs.costPerNotification}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Cost per notification
                      </p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        ${analytics.costs.costPerConversion}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Cost per conversion
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Analytics Data</h3>
              <p className="text-muted-foreground">
                Analytics data will appear here once you start sending
                notifications.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {/* Create Notification Modal */}
      <Dialog
        open={modals.createNotification}
        onOpenChange={(open) => !open && closeModal("createNotification")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send New Notification</DialogTitle>
            <DialogDescription>
              Create and send a new notification to your users
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="notification-title">Title</Label>
                <Input
                  id="notification-title"
                  placeholder="Enter notification title"
                />
              </div>
              <div>
                <Label htmlFor="notification-message">Message</Label>
                <textarea
                  id="notification-message"
                  className="w-full min-h-24 p-3 border border-input bg-background rounded-md"
                  placeholder="Enter notification message"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="notification-type">Type</Label>
                  <Select defaultValue="announcement">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notification-priority">Priority</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("createNotification")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Creating notification...");
                  closeModal("createNotification");
                }}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Template Modal */}
      <Dialog
        open={modals.createTemplate}
        onOpenChange={(open) => !open && closeModal("createTemplate")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Notification Template</DialogTitle>
            <DialogDescription>
              Create a reusable notification template
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="template-name">Template Name</Label>
                <Input id="template-name" placeholder="Enter template name" />
              </div>
              <div>
                <Label htmlFor="template-description">Description</Label>
                <Input
                  id="template-description"
                  placeholder="Enter template description"
                />
              </div>
              <div>
                <Label htmlFor="template-subject">Subject Template</Label>
                <Input
                  id="template-subject"
                  placeholder="Enter subject template with variables like {{name}}"
                />
              </div>
              <div>
                <Label htmlFor="template-body">Body Template</Label>
                <textarea
                  id="template-body"
                  className="w-full min-h-32 p-3 border border-input bg-background rounded-md"
                  placeholder="Enter message template with variables like {{name}}, {{action}}, etc."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("createTemplate")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Creating template...");
                  closeModal("createTemplate");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Rule Modal */}
      <Dialog
        open={modals.createRule}
        onOpenChange={(open) => !open && closeModal("createRule")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Automation Rule</DialogTitle>
            <DialogDescription>
              Create an automated notification rule based on triggers
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="rule-name">Rule Name</Label>
                <Input id="rule-name" placeholder="Enter rule name" />
              </div>
              <div>
                <Label htmlFor="rule-description">Description</Label>
                <Input
                  id="rule-description"
                  placeholder="Enter rule description"
                />
              </div>
              <div>
                <Label htmlFor="rule-trigger">Trigger Event</Label>
                <Select defaultValue="user.created">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user.created">User Created</SelectItem>
                    <SelectItem value="task.completed">
                      Task Completed
                    </SelectItem>
                    <SelectItem value="payment.received">
                      Payment Received
                    </SelectItem>
                    <SelectItem value="deadline.approaching">
                      Deadline Approaching
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rule-template">Notification Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("createRule")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Creating rule...");
                  closeModal("createRule");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Rule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Notification Modal */}
      <Dialog
        open={modals.viewNotification}
        onOpenChange={(open) => !open && closeModal("viewNotification")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
            <DialogDescription>
              View detailed information about this notification
            </DialogDescription>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label>Title</Label>
                  <div className="p-3 bg-muted rounded-md">
                    {selectedNotification.title}
                  </div>
                </div>
                <div>
                  <Label>Message</Label>
                  <div className="p-3 bg-muted rounded-md">
                    {selectedNotification.message}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      {getTypeIcon(selectedNotification.type)}
                      <span className="capitalize">
                        {selectedNotification.type}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <div className="p-3 bg-muted rounded-md">
                      <Badge
                        className={getPriorityColor(
                          selectedNotification.priority,
                        )}
                      >
                        {selectedNotification.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Channels</Label>
                  <div className="flex gap-2 p-3 bg-muted rounded-md">
                    {selectedNotification.channels.map((channel) => (
                      <div
                        key={channel}
                        className="flex items-center gap-1 p-1 bg-white rounded"
                      >
                        {getChannelIcon(channel)}
                        <span className="text-sm capitalize">{channel}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <Badge
                      className={getStatusColor(selectedNotification.status)}
                    >
                      {selectedNotification.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => closeModal("viewNotification")}
                >
                  Close
                </Button>
                {selectedNotification.permissions.canResend && (
                  <Button
                    onClick={() => {
                      handleNotificationAction("resend", selectedNotification);
                      closeModal("viewNotification");
                    }}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Resend
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Template Modal */}
      <Dialog
        open={modals.editTemplate}
        onOpenChange={(open) => !open && closeModal("editTemplate")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>
              Update notification template details
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="edit-template-name">Template Name</Label>
                  <Input
                    id="edit-template-name"
                    defaultValue={selectedTemplate.name}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-template-description">Description</Label>
                  <Input
                    id="edit-template-description"
                    defaultValue={selectedTemplate.description}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-template-subject">
                    Subject Template
                  </Label>
                  <Input
                    id="edit-template-subject"
                    defaultValue={selectedTemplate.subject}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-template-body">Body Template</Label>
                  <textarea
                    id="edit-template-body"
                    className="w-full min-h-32 p-3 border border-input bg-background rounded-md"
                    defaultValue={selectedTemplate.body}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => closeModal("editTemplate")}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("Updating template...", selectedTemplate.id);
                    closeModal("editTemplate");
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Update Template
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Rule Modal */}
      <Dialog
        open={modals.editRule}
        onOpenChange={(open) => !open && closeModal("editRule")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Automation Rule</DialogTitle>
            <DialogDescription>
              Update automation rule configuration
            </DialogDescription>
          </DialogHeader>
          {selectedRule && (
            <div className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="edit-rule-name">Rule Name</Label>
                  <Input id="edit-rule-name" defaultValue={selectedRule.name} />
                </div>
                <div>
                  <Label htmlFor="edit-rule-description">Description</Label>
                  <Input
                    id="edit-rule-description"
                    defaultValue={selectedRule.description}
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={selectedRule.isActive ? "default" : "secondary"}
                    >
                      {selectedRule.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        console.log("Toggling rule status...", selectedRule.id);
                      }}
                    >
                      {selectedRule.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => closeModal("editRule")}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("Updating rule...", selectedRule.id);
                    closeModal("editRule");
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Update Rule
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog
        open={modals.settings}
        onOpenChange={(open) => !open && closeModal("settings")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Notification Settings</DialogTitle>
            <DialogDescription>
              Configure notification settings for {currentTenant?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label>Default Channels</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["email", "sms", "in_app", "push"].map((channel) => (
                    <div key={channel} className="flex items-center space-x-2">
                      <input type="checkbox" id={channel} defaultChecked />
                      <Label htmlFor={channel} className="text-sm capitalize">
                        {channel.replace("_", " ")}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="rate-limit">Rate Limit (per hour)</Label>
                <Input
                  id="rate-limit"
                  type="number"
                  defaultValue={settings?.rateLimits?.perHour || 100}
                />
              </div>
              <div>
                <Label htmlFor="retry-attempts">Max Retry Attempts</Label>
                <Input
                  id="retry-attempts"
                  type="number"
                  defaultValue={settings?.retryPolicy?.maxAttempts || 3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => closeModal("settings")}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Updating settings...");
                  closeModal("settings");
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Workflow Modal */}
      <Dialog
        open={modals.createWorkflow}
        onOpenChange={(open) => !open && closeModal("createWorkflow")}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Workflow</DialogTitle>
            <DialogDescription>
              Create a new automated workflow for your business processes
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workflow-name">Workflow Name</Label>
                  <Input id="workflow-name" placeholder="Enter workflow name" />
                </div>
                <div>
                  <Label htmlFor="workflow-category">Category</Label>
                  <Select defaultValue="approval">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approval">Approval</SelectItem>
                      <SelectItem value="crm">CRM</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="workflow-description">Description</Label>
                <textarea
                  id="workflow-description"
                  className="w-full min-h-20 p-3 border border-input bg-background rounded-md"
                  placeholder="Describe what this workflow does"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workflow-trigger">Trigger Type</Label>
                  <Select defaultValue="form_submission">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="form_submission">
                        Form Submission
                      </SelectItem>
                      <SelectItem value="schedule">Schedule</SelectItem>
                      <SelectItem value="webhook">Webhook</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="workflow-visibility">Visibility</Label>
                  <Select defaultValue="team">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="workflow-tags">Tags</Label>
                <Input
                  id="workflow-tags"
                  placeholder="Enter tags separated by commas (e.g., approval, budget, automation)"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("createWorkflow")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Creating workflow...");
                  closeModal("createWorkflow");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Workflow
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Workflow Modal */}
      <Dialog
        open={modals.viewWorkflow}
        onOpenChange={(open) => !open && closeModal("viewWorkflow")}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Workflow Details</DialogTitle>
            <DialogDescription>
              View detailed information about this workflow
            </DialogDescription>
          </DialogHeader>
          {selectedWorkflow && (
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <div className="p-3 bg-muted rounded-md font-medium">
                      {selectedWorkflow.name}
                    </div>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <div className="p-3 bg-muted rounded-md">
                      <Badge variant="outline" className="capitalize">
                        {selectedWorkflow.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <div className="p-3 bg-muted rounded-md">
                    {selectedWorkflow.description}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Status</Label>
                    <div className="p-3 bg-muted rounded-md">
                      <Badge
                        variant={
                          selectedWorkflow.status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {selectedWorkflow.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label>Version</Label>
                    <div className="p-3 bg-muted rounded-md font-mono text-sm">
                      {selectedWorkflow.version}
                    </div>
                  </div>
                  <div>
                    <Label>Trigger Type</Label>
                    <div className="p-3 bg-muted rounded-md">
                      <Badge variant="outline" className="capitalize">
                        {selectedWorkflow.trigger.type.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Execution Statistics</Label>
                    <div className="p-3 bg-muted rounded-md space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Executions:</span>
                        <span className="font-medium">
                          {selectedWorkflow.executionCount}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Successful:</span>
                        <span className="font-medium text-green-600">
                          {selectedWorkflow.successCount}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Failed:</span>
                        <span className="font-medium text-red-600">
                          {selectedWorkflow.failureCount}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Success Rate:</span>
                        <span className="font-medium">
                          {Math.round(
                            (selectedWorkflow.successCount /
                              Math.max(selectedWorkflow.executionCount, 1)) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Workflow Structure</Label>
                    <div className="p-3 bg-muted rounded-md space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Nodes:</span>
                        <span className="font-medium">
                          {selectedWorkflow.nodes.length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Connections:</span>
                        <span className="font-medium">
                          {selectedWorkflow.connections.length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Variables:</span>
                        <span className="font-medium">
                          {selectedWorkflow.variables.length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Avg. Duration:</span>
                        <span className="font-medium">
                          {selectedWorkflow.averageExecutionTime
                            ? `${Math.round(selectedWorkflow.averageExecutionTime / 60000)}m`
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex flex-wrap gap-1">
                      {selectedWorkflow.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Created</Label>
                    <div className="p-3 bg-muted rounded-md text-sm">
                      {new Date(selectedWorkflow.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <Label>Last Updated</Label>
                    <div className="p-3 bg-muted rounded-md text-sm">
                      {new Date(selectedWorkflow.updatedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => closeModal("viewWorkflow")}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    closeModal("viewWorkflow");
                    setModals((prev) => ({ ...prev, editWorkflow: true }));
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Workflow
                </Button>
                <Button
                  onClick={() => {
                    handleWorkflowAction("execute", selectedWorkflow);
                    closeModal("viewWorkflow");
                  }}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Execute Now
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Workflow Modal */}
      <Dialog
        open={modals.editWorkflow}
        onOpenChange={(open) => !open && closeModal("editWorkflow")}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Workflow</DialogTitle>
            <DialogDescription>
              Update workflow configuration and settings
            </DialogDescription>
          </DialogHeader>
          {selectedWorkflow && (
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-workflow-name">Workflow Name</Label>
                    <Input
                      id="edit-workflow-name"
                      defaultValue={selectedWorkflow.name}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-workflow-category">Category</Label>
                    <Select defaultValue={selectedWorkflow.category}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approval">Approval</SelectItem>
                        <SelectItem value="crm">CRM</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-workflow-description">Description</Label>
                  <textarea
                    id="edit-workflow-description"
                    className="w-full min-h-20 p-3 border border-input bg-background rounded-md"
                    defaultValue={selectedWorkflow.description}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-workflow-status">Status</Label>
                    <Select defaultValue={selectedWorkflow.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-workflow-visibility">Visibility</Label>
                    <Select defaultValue={selectedWorkflow.visibility}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-workflow-tags">Tags</Label>
                  <Input
                    id="edit-workflow-tags"
                    defaultValue={selectedWorkflow.tags.join(", ")}
                    placeholder="Enter tags separated by commas"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => closeModal("editWorkflow")}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("Updating workflow...", selectedWorkflow.id);
                    closeModal("editWorkflow");
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Update Workflow
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Import Workflow Modal */}
      <Dialog
        open={modals.importWorkflow}
        onOpenChange={(open) => !open && closeModal("importWorkflow")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import Workflow Template</DialogTitle>
            <DialogDescription>
              Import a workflow template from the template library
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="import-source">Import Source</Label>
                <Select defaultValue="library">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="library">Template Library</SelectItem>
                    <SelectItem value="file">Upload File</SelectItem>
                    <SelectItem value="url">From URL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Available Templates</Label>
                <div className="space-y-2 max-h-64 overflow-y-auto border rounded-md p-3">
                  {[
                    {
                      name: "Basic Approval Workflow",
                      category: "approval",
                      description: "Simple approval process template",
                    },
                    {
                      name: "Lead Qualification Process",
                      category: "crm",
                      description: "Automated lead scoring and assignment",
                    },
                    {
                      name: "Document Review Process",
                      category: "operations",
                      description: "Multi-stage document review workflow",
                    },
                    {
                      name: "Compliance Checklist",
                      category: "compliance",
                      description: "Automated compliance verification",
                    },
                    {
                      name: "New Employee Onboarding",
                      category: "operations",
                      description: "Complete onboarding process",
                    },
                  ].map((template, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-md hover:bg-muted cursor-pointer transition-colors"
                      onClick={() =>
                        console.log("Selected template:", template.name)
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {template.description}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("importWorkflow")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Importing workflow template...");
                  closeModal("importWorkflow");
                }}
              >
                <Archive className="mr-2 h-4 w-4" />
                Import Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
