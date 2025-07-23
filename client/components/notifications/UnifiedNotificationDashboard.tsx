import React, { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  BellOff,
  BellRing,
  Check,
  CheckCheck,
  X,
  Eye,
  Settings,
  Users,
  Building2,
  Activity,
  BarChart3,
  Clock,
  Target,
  Filter,
  Search,
  Plus,
  Edit,
  Download,
  Share2,
  AlertTriangle,
  Zap,
  Workflow,
  FileText,
  TrendingUp,
  TrendingDown,
  Mail,
  MessageSquare,
  Smartphone,
  Volume2,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Star,
  Flag,
  Archive,
  Forward,
  MoreHorizontal,
  Calendar,
  IndianRupee,
  Package,
  Truck,
  UserCheck,
  ShoppingCart,
} from "lucide-react";

import {
  UnifiedNotification,
  NotificationFilters,
  UserType,
  NotificationStatus,
  NotificationPriority,
  NotificationCategory,
  NotificationChannel,
  NotificationAnalytics,
  BulkOperation,
  BulkOperationType,
} from "./types";

interface UnifiedNotificationDashboardProps {
  // User context
  userType: UserType;
  tenantId?: string;
  userId?: string;

  // View configuration
  activeTab?: string;
  onTabChange?: (tab: string) => void;

  // Feature toggles
  showTenantSwitcher?: boolean;
  showWorkflowFeatures?: boolean;
  showTemplateManagement?: boolean;
  showAdvancedAnalytics?: boolean;

  // Integration context
  businessContext?: {
    poIntegration?: boolean;
    deliveryIntegration?: boolean;
    grnIntegration?: boolean;
  };
}

export function UnifiedNotificationDashboard({
  userType = "franchisee",
  tenantId = "default",
  userId = "current-user",
  activeTab = "inbox",
  onTabChange,
  showTenantSwitcher = false,
  showWorkflowFeatures = true,
  showTemplateManagement = true,
  showAdvancedAnalytics = true,
  businessContext = {
    poIntegration: true,
    deliveryIntegration: true,
    grnIntegration: true,
  },
}: UnifiedNotificationDashboardProps) {
  // State management
  const [notifications, setNotifications] = useState<UnifiedNotification[]>([]);
  const [analytics, setAnalytics] = useState<NotificationAnalytics | null>(
    null,
  );
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    [],
  );
  const [filters, setFilters] = useState<NotificationFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [selectedNotification, setSelectedNotification] =
    useState<UnifiedNotification | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);

  // UI states
  const [expandedNotification, setExpandedNotification] = useState<
    string | null
  >(null);
  const [selectedTenant, setSelectedTenant] = useState(tenantId);
  const [viewMode, setViewMode] = useState<"list" | "cards" | "compact">(
    "list",
  );

  // Mock data initialization
  useEffect(() => {
    loadNotifications();
    loadAnalytics();
  }, [userType, selectedTenant, filters]);

  const loadNotifications = async () => {
    setIsLoading(true);
    // Import mock data
    const { generateMockNotifications } = await import("./mockData");
    // Simulate API call
    setTimeout(() => {
      setNotifications(generateMockNotifications());
      setIsLoading(false);
    }, 1000);
  };

  const loadAnalytics = async () => {
    // Import mock data
    const { generateMockAnalytics } = await import("./mockData");
    // Simulate analytics loading
    setTimeout(() => {
      setAnalytics(generateMockAnalytics());
    }, 1200);
  };

  // Filter and search notifications
  const filteredNotifications = notifications.filter((notification) => {
    // User type filtering
    if (
      notification.userTypeScope &&
      notification.userTypeScope !== "both" &&
      notification.userTypeScope !== userType
    ) {
      return false;
    }

    // Search term filtering
    if (searchTerm) {
      const searchText =
        `${notification.title} ${notification.message} ${notification.senderName}`.toLowerCase();
      if (!searchText.includes(searchTerm.toLowerCase())) {
        return false;
      }
    }

    // Apply other filters
    if (
      filters.status &&
      filters.status.length > 0 &&
      !filters.status.includes(notification.status)
    ) {
      return false;
    }

    if (
      filters.priority &&
      filters.priority.length > 0 &&
      !filters.priority.includes(notification.priority)
    ) {
      return false;
    }

    if (
      filters.category &&
      filters.category.length > 0 &&
      !filters.category.includes(notification.category)
    ) {
      return false;
    }

    return true;
  });

  // Group notifications by status for tabs
  const groupedNotifications = {
    inbox: filteredNotifications.filter((n) =>
      ["pending", "sent", "delivered"].includes(n.status),
    ),
    unread: filteredNotifications.filter((n) => n.status === "pending"),
    read: filteredNotifications.filter((n) => n.status === "read"),
    acknowledged: filteredNotifications.filter(
      (n) => n.status === "acknowledged",
    ),
    important: filteredNotifications.filter((n) =>
      ["high", "urgent", "critical"].includes(n.priority),
    ),
    archived: filteredNotifications.filter((n) => n.status === "dismissed"),
  };

  // Handle notification actions
  const handleNotificationAction = (
    notificationId: string,
    actionId: string,
  ) => {
    const notification = notifications.find((n) => n.id === notificationId);
    const action = notification?.actions.find((a) => a.id === actionId);

    if (!notification || !action) return;

    // Execute action based on type
    switch (action.type) {
      case "approve":
      case "reject":
        if (action.confirmation?.required) {
          const confirmed = window.confirm(
            `${action.confirmation.title}\n\n${action.confirmation.message}`,
          );
          if (!confirmed) return;
        }

        // Update notification status
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId
              ? {
                  ...n,
                  status: "acknowledged" as NotificationStatus,
                  acknowledgedAt: new Date().toISOString(),
                }
              : n,
          ),
        );

        // Navigate to related entity if applicable
        if (action.action.type === "navigate" && action.action.target) {
          window.open(action.action.target, "_blank");
        }

        alert(`${action.label} action completed successfully!`);
        break;

      case "view_details":
        if (notification.relatedEntity?.url) {
          window.open(notification.relatedEntity.url, "_blank");
        }
        break;

      case "link":
      case "external_link":
        if (action.action.target) {
          window.open(action.action.target, "_blank");
        }
        break;

      default:
        console.log(
          `Action ${action.type} executed for notification ${notificationId}`,
        );
    }

    // Mark action as clicked
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId
          ? {
              ...n,
              actions: n.actions.map((a) =>
                a.id === actionId
                  ? { ...a, clickedAt: new Date().toISOString() }
                  : a,
              ),
              clickCount: n.clickCount + 1,
            }
          : n,
      ),
    );
  };

  // Handle bulk operations
  const handleBulkOperation = (
    operation: BulkOperationType,
    notificationIds?: string[],
  ) => {
    const targetIds = notificationIds || selectedNotifications;
    if (targetIds.length === 0) return;

    switch (operation) {
      case "mark_read":
        setNotifications((prev) =>
          prev.map((n) =>
            targetIds.includes(n.id)
              ? {
                  ...n,
                  status: "read" as NotificationStatus,
                  readAt: new Date().toISOString(),
                }
              : n,
          ),
        );
        break;

      case "mark_acknowledged":
        setNotifications((prev) =>
          prev.map((n) =>
            targetIds.includes(n.id)
              ? {
                  ...n,
                  status: "acknowledged" as NotificationStatus,
                  acknowledgedAt: new Date().toISOString(),
                }
              : n,
          ),
        );
        break;

      case "dismiss":
        setNotifications((prev) =>
          prev.map((n) =>
            targetIds.includes(n.id)
              ? {
                  ...n,
                  status: "dismissed" as NotificationStatus,
                  dismissedAt: new Date().toISOString(),
                }
              : n,
          ),
        );
        break;

      case "archive":
        setNotifications((prev) =>
          prev.filter((n) => !targetIds.includes(n.id)),
        );
        break;
    }

    setSelectedNotifications([]);
  };

  // Calculate analytics summary
  const analyticsSummary = analytics
    ? {
        totalNotifications: analytics.totalNotifications,
        unreadCount: groupedNotifications.unread.length,
        highPriorityCount: groupedNotifications.important.length,
        engagementScore: Math.round(analytics.engagementScore),
        deliveryRate: Math.round(analytics.deliveryRate),
        responseTime: Math.round(analytics.averageResponseTime),
      }
    : {
        totalNotifications: notifications.length,
        unreadCount: groupedNotifications.unread.length,
        highPriorityCount: groupedNotifications.important.length,
        engagementScore: 85,
        deliveryRate: 96,
        responseTime: 45,
      };

  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">
              {userType === "corporate" ? "Corporate" : "Franchisee"}{" "}
              Notification Center
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage notifications, workflows, and communication preferences
          </p>

          {/* Tenant Switcher */}
          {showTenantSwitcher && (
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="gap-1">
                <Building2 className="h-3 w-3" />
                {selectedTenant}
              </Badge>
              <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Switch tenant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenant_001">
                    BuildCorp Constructions
                  </SelectItem>
                  <SelectItem value="tenant_002">TechFlow Solutions</SelectItem>
                  <SelectItem value="tenant_003">
                    Green Energy Systems
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsTemplateModalOpen(true)}>
                <FileText className="h-4 w-4 mr-2" />
                New Template
              </DropdownMenuItem>
              {showWorkflowFeatures && (
                <DropdownMenuItem onClick={() => setIsWorkflowModalOpen(true)}>
                  <Workflow className="h-4 w-4 mr-2" />
                  New Workflow
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Bell className="h-4 w-4 mr-2" />
                Send Notification
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreferencesModalOpen(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Preferences
          </Button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-blue-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-blue-700">
                Total Notifications
              </CardTitle>
              <div className="text-3xl font-bold text-blue-900">
                <AnimatedCounter value={analyticsSummary.totalNotifications} />
              </div>
              <p className="text-xs text-blue-600">All time</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Bell className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-orange-50 border-orange-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-orange-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-orange-700">
                Unread
              </CardTitle>
              <div className="text-3xl font-bold text-orange-900">
                <AnimatedCounter value={analyticsSummary.unreadCount} />
              </div>
              <p className="text-xs text-orange-600">Awaiting attention</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <BellRing className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-red-50 border-red-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-red-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-red-700">
                High Priority
              </CardTitle>
              <div className="text-3xl font-bold text-red-900">
                <AnimatedCounter value={analyticsSummary.highPriorityCount} />
              </div>
              <p className="text-xs text-red-600">Urgent action needed</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-green-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-green-700">
                Engagement
              </CardTitle>
              <div className="text-3xl font-bold text-green-900">
                <AnimatedCounter value={analyticsSummary.engagementScore} />%
              </div>
              <p className="text-xs text-green-600">Response rate</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select
                value={filters.status?.[0] || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    status:
                      value === "all"
                        ? undefined
                        : [value as NotificationStatus],
                  }))
                }
              >
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.priority?.[0] || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    priority:
                      value === "all"
                        ? undefined
                        : [value as NotificationPriority],
                  }))
                }
              >
                <SelectTrigger className="w-[140px]">
                  <Flag className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleBulkOperation("mark_read")}
                  >
                    <CheckCheck className="h-4 w-4 mr-2" />
                    Mark All Read
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleBulkOperation(
                        "dismiss",
                        groupedNotifications.unread.map((n) => n.id),
                      )
                    }
                  >
                    <X className="h-4 w-4 mr-2" />
                    Dismiss Low Priority
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Old
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="inbox" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Inbox ({groupedNotifications.inbox.length})
          </TabsTrigger>
          <TabsTrigger value="important" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Important ({groupedNotifications.important.length})
          </TabsTrigger>
          <TabsTrigger
            value="workflows"
            className="flex items-center gap-2"
            disabled={!showWorkflowFeatures}
          >
            <Workflow className="h-4 w-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger
            value="templates"
            className="flex items-center gap-2"
            disabled={!showTemplateManagement}
          >
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center gap-2"
            disabled={!showAdvancedAnalytics}
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Inbox Tab */}
        <TabsContent value="inbox" className="space-y-4">
          <NotificationList
            notifications={groupedNotifications.inbox}
            userType={userType}
            businessContext={businessContext}
            onNotificationAction={handleNotificationAction}
            onBulkOperation={handleBulkOperation}
            selectedNotifications={selectedNotifications}
            onSelectNotifications={setSelectedNotifications}
            expandedNotification={expandedNotification}
            onExpandNotification={setExpandedNotification}
            isLoading={isLoading}
          />
        </TabsContent>

        {/* Important Tab */}
        <TabsContent value="important" className="space-y-4">
          <NotificationList
            notifications={groupedNotifications.important}
            userType={userType}
            businessContext={businessContext}
            onNotificationAction={handleNotificationAction}
            onBulkOperation={handleBulkOperation}
            selectedNotifications={selectedNotifications}
            onSelectNotifications={setSelectedNotifications}
            expandedNotification={expandedNotification}
            onExpandNotification={setExpandedNotification}
            isLoading={isLoading}
            showPriorityIndicator={true}
          />
        </TabsContent>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-4">
          <WorkflowManagement
            userType={userType}
            tenantId={selectedTenant}
            canCreate={showWorkflowFeatures}
            onCreateWorkflow={() => setIsWorkflowModalOpen(true)}
          />
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <TemplateManagement
            userType={userType}
            tenantId={selectedTenant}
            canCreate={showTemplateManagement}
            onCreateTemplate={() => setIsTemplateModalOpen(true)}
          />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsDashboard
            analytics={analytics}
            userType={userType}
            timeRange="30d"
            showAdvancedMetrics={showAdvancedAnalytics}
          />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <NotificationSettings
            userType={userType}
            tenantId={selectedTenant}
            onUpdatePreferences={() => setIsPreferencesModalOpen(true)}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <NotificationDetailsModal
        notification={selectedNotification}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onAction={handleNotificationAction}
      />

      <PreferencesModal
        userType={userType}
        isOpen={isPreferencesModalOpen}
        onClose={() => setIsPreferencesModalOpen(false)}
      />

      {showTemplateManagement && (
        <TemplateCreationModal
          isOpen={isTemplateModalOpen}
          onClose={() => setIsTemplateModalOpen(false)}
          userType={userType}
          tenantId={selectedTenant}
        />
      )}

      {showWorkflowFeatures && (
        <WorkflowCreationModal
          isOpen={isWorkflowModalOpen}
          onClose={() => setIsWorkflowModalOpen(false)}
          userType={userType}
          tenantId={selectedTenant}
        />
      )}
    </div>
  );
}

// Import actual components
import { NotificationList } from "./NotificationList";
import { NotificationSettings } from "./NotificationSettings";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { WorkflowManagement } from "./WorkflowManagement";
import { TemplateManagement } from "./TemplateManagement";
import {
  NotificationDetailsModal,
  PreferencesModal,
  TemplateCreationModal,
  WorkflowCreationModal,
} from "./NotificationModals";

// Modal components are now imported from NotificationModals.tsx

// Mock data functions moved to ./mockData.ts
