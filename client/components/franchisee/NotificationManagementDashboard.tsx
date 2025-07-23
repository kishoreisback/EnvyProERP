import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bell,
  BellOff,
  BellRing,
  Check,
  CheckCheck,
  X,
  Eye,
  EyeOff,
  MessageSquare,
  Mail,
  Smartphone,
  Share2,
  Settings,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Clock,
  Users,
  Target,
  Filter,
  Search,
  Download,
  ExternalLink,
  Phone,
  Calendar,
  FileText,
  AlertTriangle,
  Zap,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Star,
  Flag,
  Archive,
  Bookmark,
} from "lucide-react";

import {
  getNotificationsByUserType,
  mockNotificationPreferences,
  mockNotificationAnalytics,
  getNotificationStatusColor,
  getPriorityColor,
  getCategoryColor,
  formatNotificationTime,
  markNotificationAsRead,
  markNotificationAsAcknowledged,
  dismissNotification,
  executeNotificationAction,
  getUnreadCount,
  getHighPriorityCount,
  filterNotifications,
} from "./notification-management-data";
import {
  NotificationItem,
  NotificationPreferences,
  NotificationFilters,
} from "./notification-management-types";

interface NotificationManagementDashboardProps {
  userType: "corporate" | "franchisee";
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function NotificationManagementDashboard({
  userType = "franchisee",
  activeTab = "notifications",
  onTabChange,
}: NotificationManagementDashboardProps) {
  const [notifications, setNotifications] = useState(
    getNotificationsByUserType(userType),
  );
  const [preferences, setPreferences] = useState(mockNotificationPreferences);
  const [analytics] = useState(mockNotificationAnalytics);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<NotificationFilters>({});
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [expandedNotification, setExpandedNotification] = useState<
    string | null
  >(null);

  // Filter notifications based on search and filters
  const filteredNotifications = filterNotifications(notifications, {
    ...filters,
    searchTerm,
  });

  // Group notifications by status
  const notificationsByStatus = {
    unread: filteredNotifications.filter((n) => n.status === "pending"),
    read: filteredNotifications.filter((n) => n.status === "read"),
    acknowledged: filteredNotifications.filter(
      (n) => n.status === "acknowledged",
    ),
    dismissed: filteredNotifications.filter((n) => n.status === "dismissed"),
  };

  // Group notifications by priority
  const notificationsByPriority = {
    critical: filteredNotifications.filter((n) => n.priority === "critical"),
    urgent: filteredNotifications.filter((n) => n.priority === "urgent"),
    high: filteredNotifications.filter((n) => n.priority === "high"),
    medium: filteredNotifications.filter((n) => n.priority === "medium"),
    low: filteredNotifications.filter((n) => n.priority === "low"),
  };

  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    const updatedNotification = markNotificationAsRead(
      notificationId,
      userType,
    );
    if (updatedNotification) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, ...updatedNotification } : n,
        ),
      );
    }
  };

  const handleMarkAsAcknowledged = (notificationId: string) => {
    const updatedNotification = markNotificationAsAcknowledged(
      notificationId,
      userType,
    );
    if (updatedNotification) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, ...updatedNotification } : n,
        ),
      );
    }
  };

  const handleDismiss = (notificationId: string) => {
    const updatedNotification = dismissNotification(notificationId, userType);
    if (updatedNotification) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, ...updatedNotification } : n,
        ),
      );
    }
  };

  const handleActionClick = (notificationId: string, actionId: string) => {
    const result = executeNotificationAction(
      notificationId,
      actionId,
      userType,
    );
    if (result) {
      const { notification, action } = result;

      // Update the notification in state
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, ...notification } : n,
        ),
      );

      // Execute the action
      if (action.action.type === "navigate") {
        window.open(action.action.target, "_blank");
      } else if (action.action.type === "external_link") {
        window.open(action.action.target, "_blank");
      } else if (action.action.type === "api_call") {
        // Simulate API call
        console.log(
          `API Call: ${action.action.method} ${action.action.target}`,
          action.action.payload,
        );

        // Show confirmation if it's an approval action
        if (action.type === "approve" && action.confirmation?.required) {
          const confirmed = window.confirm(
            `${action.confirmation.title}\n\n${action.confirmation.message}`,
          );
          if (confirmed) {
            alert("Action completed successfully!");
          }
        }
      }
    }
  };

  const handleBulkAction = (action: string, notificationIds: string[]) => {
    notificationIds.forEach((id) => {
      switch (action) {
        case "mark_read":
          handleMarkAsRead(id);
          break;
        case "acknowledge":
          handleMarkAsAcknowledged(id);
          break;
        case "dismiss":
          handleDismiss(id);
          break;
      }
    });
  };

  const updatePreferences = (updates: Partial<NotificationPreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...updates,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const unreadCount = getUnreadCount(userType);
  const highPriorityCount = getHighPriorityCount(userType);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-blue-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-blue-700">
                Total Notifications
              </CardTitle>
              <div className="text-3xl font-bold text-blue-900">
                <AnimatedCounter value={notifications.length} />
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
                <AnimatedCounter value={unreadCount} />
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
                <AnimatedCounter value={highPriorityCount} />
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
                Read Rate
              </CardTitle>
              <div className="text-3xl font-bold text-green-900">
                <AnimatedCounter value={analytics.readRate} decimals={1} />%
              </div>
              <p className="text-xs text-green-600">Engagement score</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
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
                    status: value === "all" ? undefined : [value as any],
                  }))
                }
              >
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.priority?.[0] || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    priority: value === "all" ? undefined : [value as any],
                  }))
                }
              >
                <SelectTrigger className="w-[150px]">
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

              <Button
                variant="outline"
                onClick={() => setIsPreferencesModalOpen(true)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                handleBulkAction(
                  "mark_read",
                  notificationsByStatus.unread.map((n) => n.id),
                )
              }
              disabled={notificationsByStatus.unread.length === 0}
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                handleBulkAction(
                  "dismiss",
                  notificationsByPriority.low.map((n) => n.id),
                )
              }
              disabled={notificationsByPriority.low.length === 0}
            >
              <X className="h-4 w-4 mr-2" />
              Dismiss Low Priority
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Notifications ({filteredNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`hover:shadow-md transition-all cursor-pointer ${
                  notification.status === "pending"
                    ? "border-l-4 border-l-orange-500 bg-orange-50/30"
                    : notification.priority === "urgent"
                      ? "border-l-4 border-l-red-500"
                      : notification.priority === "critical"
                        ? "border-l-4 border-l-red-600 bg-red-50/30"
                        : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3
                            className={`font-semibold ${
                              notification.status === "pending"
                                ? "text-gray-900"
                                : "text-gray-600"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={getNotificationStatusColor(
                                notification.status,
                              )}
                            >
                              {notification.status}
                            </Badge>
                            <Badge
                              className={getPriorityColor(
                                notification.priority,
                              )}
                            >
                              {notification.priority}
                            </Badge>
                            <Badge
                              className={getCategoryColor(
                                notification.category,
                              )}
                              variant="outline"
                            >
                              {notification.category}
                            </Badge>
                          </div>
                        </div>

                        <p
                          className={`text-sm ${
                            notification.status === "pending"
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          {notification.message}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            From: {notification.senderName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatNotificationTime(notification.createdAt)}
                          </span>
                          {notification.channels.length > 0 && (
                            <span className="flex items-center gap-1">
                              <Bell className="h-3 w-3" />
                              {notification.channels.join(", ")}
                            </span>
                          )}
                        </div>

                        {/* Attachments */}
                        {notification.attachments.length > 0 && (
                          <div className="flex items-center gap-2 text-xs text-blue-600">
                            <FileText className="h-3 w-3" />
                            <span>
                              {notification.attachments.length} attachment(s)
                            </span>
                          </div>
                        )}

                        {/* Expanded Content */}
                        {expandedNotification === notification.id && (
                          <div className="space-y-3 pt-3 border-t">
                            {notification.content.fullText && (
                              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {notification.content.fullText}
                              </div>
                            )}

                            {notification.attachments.length > 0 && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">
                                  Attachments:
                                </h4>
                                {notification.attachments.map(
                                  (attachment, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 p-2 border rounded-lg"
                                    >
                                      <FileText className="h-4 w-4 text-blue-500" />
                                      <span className="text-sm">
                                        {attachment.fileName}
                                      </span>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="ml-auto"
                                      >
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}

                            {notification.relatedEntity && (
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <h4 className="text-sm font-medium mb-1">
                                  Related:
                                </h4>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="p-0 h-auto"
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  {notification.relatedEntity.name}
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-start gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setExpandedNotification(
                              expandedNotification === notification.id
                                ? null
                                : notification.id,
                            )
                          }
                        >
                          {expandedNotification === notification.id ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedNotification(notification);
                            setIsDetailsModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {notification.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {notification.actions
                          .filter((a) => a.visible && a.enabled)
                          .map((action) => (
                            <Button
                              key={action.id}
                              size="sm"
                              variant={
                                action.style === "primary"
                                  ? "default"
                                  : action.style === "success"
                                    ? "default"
                                    : action.style === "warning"
                                      ? "destructive"
                                      : "outline"
                              }
                              onClick={() =>
                                handleActionClick(notification.id, action.id)
                              }
                              className={
                                action.style === "success"
                                  ? "bg-green-600 hover:bg-green-700"
                                  : action.style === "warning"
                                    ? "bg-orange-600 hover:bg-orange-700"
                                    : ""
                              }
                            >
                              {action.type === "approve" && (
                                <Check className="h-3 w-3 mr-1" />
                              )}
                              {action.type === "reject" && (
                                <X className="h-3 w-3 mr-1" />
                              )}
                              {action.type === "view_details" && (
                                <Eye className="h-3 w-3 mr-1" />
                              )}
                              {action.type === "link" && (
                                <ExternalLink className="h-3 w-3 mr-1" />
                              )}
                              {action.label}
                            </Button>
                          ))}
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex gap-2">
                        {notification.status === "pending" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Mark Read
                          </Button>
                        )}
                        {["pending", "read"].includes(notification.status) && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              handleMarkAsAcknowledged(notification.id)
                            }
                          >
                            <CheckCheck className="h-3 w-3 mr-1" />
                            Acknowledge
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDismiss(notification.id)}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Dismiss
                        </Button>
                      </div>

                      {notification.tags.length > 0 && (
                        <div className="flex gap-1">
                          {notification.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {notification.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{notification.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredNotifications.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No notifications found
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm || Object.keys(filters).length > 0
                      ? "Try adjusting your search or filters"
                      : "You're all caught up! No new notifications."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.slice(0, 20).map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="text-sm">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {notification.title}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getCategoryColor(notification.category)}
                          variant="outline"
                        >
                          {notification.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getPriorityColor(notification.priority)}
                        >
                          {notification.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getNotificationStatusColor(
                            notification.status,
                          )}
                        >
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {notification.readAt
                          ? Math.round(
                              (new Date(notification.readAt).getTime() -
                                new Date(notification.createdAt).getTime()) /
                                (1000 * 60),
                            ) + "m"
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">
                    Enable Notifications
                  </Label>
                  <p className="text-xs text-gray-500">
                    Receive notifications across all channels
                  </p>
                </div>
                <Switch
                  checked={preferences.globalEnabled}
                  onCheckedChange={(checked) =>
                    updatePreferences({ globalEnabled: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Do Not Disturb</Label>
                  <p className="text-xs text-gray-500">
                    Pause non-urgent notifications
                  </p>
                </div>
                <Switch
                  checked={preferences.doNotDisturbEnabled}
                  onCheckedChange={(checked) =>
                    updatePreferences({ doNotDisturbEnabled: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Notification Frequency
                </Label>
                <Select
                  value={preferences.frequency}
                  onValueChange={(value) =>
                    updatePreferences({ frequency: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="every_15_minutes">
                      Every 15 minutes
                    </SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Channel Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(preferences.channelPreferences).map(
                ([channel, settings]) => (
                  <div
                    key={channel}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {channel === "inApp" && (
                        <Bell className="h-5 w-5 text-blue-500" />
                      )}
                      {channel === "email" && (
                        <Mail className="h-5 w-5 text-green-500" />
                      )}
                      {channel === "sms" && (
                        <Smartphone className="h-5 w-5 text-orange-500" />
                      )}
                      {channel === "whatsapp" && (
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      )}
                      {channel === "push" && (
                        <Volume2 className="h-5 w-5 text-purple-500" />
                      )}
                      <div>
                        <Label className="text-sm font-medium capitalize">
                          {channel === "inApp" ? "In-App" : channel}
                        </Label>
                        <p className="text-xs text-gray-500">
                          {settings.types.length} notification types enabled
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.enabled}
                      onCheckedChange={(checked) => {
                        updatePreferences({
                          channelPreferences: {
                            ...preferences.channelPreferences,
                            [channel]: { ...settings, enabled: checked },
                          },
                        });
                      }}
                    />
                  </div>
                ),
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(preferences.categoryPreferences).map(
                ([category, settings]) => (
                  <div
                    key={category}
                    className="p-3 border rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium capitalize">
                          {category}
                        </Label>
                        <p className="text-xs text-gray-500">
                          Priority: {settings.priority}
                        </p>
                      </div>
                      <Switch
                        checked={settings.enabled}
                        onCheckedChange={(checked) => {
                          updatePreferences({
                            categoryPreferences: {
                              ...preferences.categoryPreferences,
                              [category]: { ...settings, enabled: checked },
                            },
                          });
                        }}
                      />
                    </div>

                    {settings.enabled && (
                      <div className="flex gap-1 flex-wrap">
                        {settings.channels.map((channel, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ),
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analytics.channelMetrics.map((metric) => (
                  <div key={metric.channel} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium capitalize">
                        {metric.channel.replace("_", " ")}
                      </span>
                      <span>{metric.readRate.toFixed(1)}% read rate</span>
                    </div>
                    <Progress value={metric.readRate} className="h-2" />
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                      <span>Sent: {metric.sent}</span>
                      <span>Read: {metric.read}</span>
                      <span>Clicked: {metric.clicked}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {analytics.deliveryRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Delivery Rate</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {analytics.readRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Read Rate</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {analytics.clickRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Click Rate</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {analytics.responseTime.toFixed(0)}m
                    </div>
                    <div className="text-sm text-gray-600">Avg Response</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.categoryMetrics.map((metric) => (
                  <div key={metric.category} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium capitalize">
                        {metric.category}
                      </h4>
                      <Badge
                        className={getCategoryColor(metric.category)}
                        variant="outline"
                      >
                        {metric.averageEngagement.toFixed(1)}% engagement
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Sent:</span>
                        <div className="font-medium">{metric.sent}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Read:</span>
                        <div className="font-medium">{metric.read}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Acknowledged:</span>
                        <div className="font-medium">{metric.acknowledged}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Dismissed:</span>
                        <div className="font-medium">{metric.dismissed}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
          </DialogHeader>

          {selectedNotification && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {selectedNotification.title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {selectedNotification.message}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Badge
                      className={getNotificationStatusColor(
                        selectedNotification.status,
                      )}
                    >
                      {selectedNotification.status}
                    </Badge>
                    <Badge
                      className={getPriorityColor(
                        selectedNotification.priority,
                      )}
                    >
                      {selectedNotification.priority}
                    </Badge>
                    <Badge
                      className={getCategoryColor(
                        selectedNotification.category,
                      )}
                      variant="outline"
                    >
                      {selectedNotification.category}
                    </Badge>
                  </div>

                  {selectedNotification.content.fullText && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Full Message</h4>
                      <p className="text-sm text-gray-700">
                        {selectedNotification.content.fullText}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">From:</span>
                      <span className="font-medium">
                        {selectedNotification.senderName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-medium">
                        {selectedNotification.type.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span className="font-medium">
                        {new Date(
                          selectedNotification.createdAt,
                        ).toLocaleString()}
                      </span>
                    </div>
                    {selectedNotification.readAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Read:</span>
                        <span className="font-medium">
                          {new Date(
                            selectedNotification.readAt,
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Channels:</span>
                      <span className="font-medium">
                        {selectedNotification.channels.join(", ")}
                      </span>
                    </div>
                  </div>

                  {selectedNotification.tags.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex gap-1 flex-wrap">
                        {selectedNotification.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedNotification.attachments.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Attachments</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedNotification.attachments.map(
                      (attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 border rounded-lg"
                        >
                          <FileText className="h-8 w-8 text-blue-500" />
                          <div className="flex-1">
                            <div className="font-medium">
                              {attachment.fileName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {(attachment.fileSize / 1024 / 1024).toFixed(2)}{" "}
                              MB
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {selectedNotification.actions.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Available Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNotification.actions
                      .filter((a) => a.visible && a.enabled)
                      .map((action) => (
                        <Button
                          key={action.id}
                          variant={
                            action.style === "primary" ? "default" : "outline"
                          }
                          onClick={() => {
                            handleActionClick(
                              selectedNotification.id,
                              action.id,
                            );
                            setIsDetailsModalOpen(false);
                          }}
                        >
                          {action.label}
                        </Button>
                      ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t">
                <div className="flex gap-2">
                  {selectedNotification.status === "pending" && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleMarkAsRead(selectedNotification.id);
                        setIsDetailsModalOpen(false);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Mark as Read
                    </Button>
                  )}
                  {["pending", "read"].includes(
                    selectedNotification.status,
                  ) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleMarkAsAcknowledged(selectedNotification.id);
                        setIsDetailsModalOpen(false);
                      }}
                    >
                      <CheckCheck className="h-4 w-4 mr-2" />
                      Acknowledge
                    </Button>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleDismiss(selectedNotification.id);
                    setIsDetailsModalOpen(false);
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Dismiss
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Preferences Modal */}
      <Dialog
        open={isPreferencesModalOpen}
        onOpenChange={setIsPreferencesModalOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Notification Preferences</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Master Switch</Label>
                  <p className="text-xs text-gray-500">
                    Enable/disable all notifications
                  </p>
                </div>
                <Switch
                  checked={preferences.globalEnabled}
                  onCheckedChange={(checked) =>
                    updatePreferences({ globalEnabled: checked })
                  }
                />
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Quick Presets
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updatePreferences({
                        channelPreferences: {
                          ...preferences.channelPreferences,
                          inApp: {
                            ...preferences.channelPreferences.inApp,
                            enabled: true,
                          },
                          email: {
                            ...preferences.channelPreferences.email,
                            enabled: false,
                          },
                          sms: {
                            ...preferences.channelPreferences.sms,
                            enabled: false,
                          },
                          whatsapp: {
                            ...preferences.channelPreferences.whatsapp,
                            enabled: false,
                          },
                          push: {
                            ...preferences.channelPreferences.push,
                            enabled: false,
                          },
                        },
                      })
                    }
                  >
                    In-App Only
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updatePreferences({
                        channelPreferences: {
                          ...preferences.channelPreferences,
                          inApp: {
                            ...preferences.channelPreferences.inApp,
                            enabled: true,
                          },
                          email: {
                            ...preferences.channelPreferences.email,
                            enabled: true,
                          },
                          sms: {
                            ...preferences.channelPreferences.sms,
                            enabled: true,
                          },
                          whatsapp: {
                            ...preferences.channelPreferences.whatsapp,
                            enabled: true,
                          },
                          push: {
                            ...preferences.channelPreferences.push,
                            enabled: true,
                          },
                        },
                      })
                    }
                  >
                    All Channels
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updatePreferences({
                        channelPreferences: {
                          ...preferences.channelPreferences,
                          inApp: {
                            ...preferences.channelPreferences.inApp,
                            enabled: true,
                          },
                          email: {
                            ...preferences.channelPreferences.email,
                            enabled: true,
                          },
                          sms: {
                            ...preferences.channelPreferences.sms,
                            enabled: false,
                          },
                          whatsapp: {
                            ...preferences.channelPreferences.whatsapp,
                            enabled: false,
                          },
                          push: {
                            ...preferences.channelPreferences.push,
                            enabled: false,
                          },
                        },
                      })
                    }
                  >
                    Business Hours
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updatePreferences({
                        channelPreferences: {
                          ...preferences.channelPreferences,
                          inApp: {
                            ...preferences.channelPreferences.inApp,
                            enabled: true,
                          },
                          email: {
                            ...preferences.channelPreferences.email,
                            enabled: false,
                          },
                          sms: {
                            ...preferences.channelPreferences.sms,
                            enabled: true,
                          },
                          whatsapp: {
                            ...preferences.channelPreferences.whatsapp,
                            enabled: true,
                          },
                          push: {
                            ...preferences.channelPreferences.push,
                            enabled: true,
                          },
                        },
                      })
                    }
                  >
                    Mobile First
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsPreferencesModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Save preferences
                  setIsPreferencesModalOpen(false);
                  alert("Preferences saved successfully!");
                }}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
