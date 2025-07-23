import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
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
  Check,
  CheckCheck,
  X,
  Eye,
  Star,
  Flag,
  MoreHorizontal,
  Clock,
  Calendar,
  IndianRupee,
  Package,
  Truck,
  FileText,
  UserCheck,
  ShoppingCart,
  AlertTriangle,
  ExternalLink,
  MessageSquare,
  Forward,
  Archive,
  ChevronDown,
  ChevronRight,
  Building2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow, parseISO } from "date-fns";

import {
  UnifiedNotification,
  UserType,
  BulkOperationType,
  NotificationPriority,
  NotificationStatus,
  NotificationCategory,
} from "./types";

interface NotificationListProps {
  notifications: UnifiedNotification[];
  userType: UserType;
  businessContext?: {
    poIntegration?: boolean;
    deliveryIntegration?: boolean;
    grnIntegration?: boolean;
  };
  onNotificationAction: (notificationId: string, actionId: string) => void;
  onBulkOperation: (
    operation: BulkOperationType,
    notificationIds?: string[],
  ) => void;
  selectedNotifications: string[];
  onSelectNotifications: (notificationIds: string[]) => void;
  expandedNotification: string | null;
  onExpandNotification: (notificationId: string | null) => void;
  isLoading?: boolean;
  showPriorityIndicator?: boolean;
}

export function NotificationList({
  notifications,
  userType,
  businessContext = {},
  onNotificationAction,
  onBulkOperation,
  selectedNotifications,
  onSelectNotifications,
  expandedNotification,
  onExpandNotification,
  isLoading = false,
  showPriorityIndicator = false,
}: NotificationListProps) {
  const [hoveredNotification, setHoveredNotification] = useState<string | null>(
    null,
  );

  // Handle selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectNotifications(notifications.map((n) => n.id));
    } else {
      onSelectNotifications([]);
    }
  };

  const handleSelectNotification = (
    notificationId: string,
    checked: boolean,
  ) => {
    if (checked) {
      onSelectNotifications([...selectedNotifications, notificationId]);
    } else {
      onSelectNotifications(
        selectedNotifications.filter((id) => id !== notificationId),
      );
    }
  };

  // Handle expand/collapse
  const handleToggleExpand = (notificationId: string) => {
    if (expandedNotification === notificationId) {
      onExpandNotification(null);
    } else {
      onExpandNotification(notificationId);

      // Mark as read when expanded
      const notification = notifications.find((n) => n.id === notificationId);
      if (notification && notification.status === "pending") {
        onNotificationAction(notificationId, "mark_read");
      }
    }
  };

  // Get priority color and icon
  const getPriorityIndicator = (priority: NotificationPriority) => {
    switch (priority) {
      case "critical":
        return {
          color: "bg-red-500",
          icon: AlertTriangle,
          textColor: "text-red-600",
        };
      case "urgent":
        return {
          color: "bg-orange-500",
          icon: Flag,
          textColor: "text-orange-600",
        };
      case "high":
        return {
          color: "bg-yellow-500",
          icon: Star,
          textColor: "text-yellow-600",
        };
      case "medium":
        return { color: "bg-blue-500", icon: Bell, textColor: "text-blue-600" };
      case "low":
        return { color: "bg-gray-400", icon: Bell, textColor: "text-gray-600" };
      default:
        return { color: "bg-gray-400", icon: Bell, textColor: "text-gray-600" };
    }
  };

  // Get status badge styling
  const getStatusBadge = (status: NotificationStatus) => {
    switch (status) {
      case "pending":
        return {
          variant: "secondary",
          label: "New",
          color: "bg-blue-100 text-blue-700",
        };
      case "read":
        return {
          variant: "outline",
          label: "Read",
          color: "bg-gray-100 text-gray-600",
        };
      case "acknowledged":
        return {
          variant: "default",
          label: "Acknowledged",
          color: "bg-green-100 text-green-700",
        };
      case "dismissed":
        return {
          variant: "destructive",
          label: "Dismissed",
          color: "bg-red-100 text-red-700",
        };
      default:
        return {
          variant: "secondary",
          label: status,
          color: "bg-gray-100 text-gray-600",
        };
    }
  };

  // Get category icon
  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case "operational":
        return Package;
      case "financial":
        return IndianRupee;
      case "quality":
        return UserCheck;
      case "system":
        return Bell;
      case "workflow":
        return CheckCheck;
      case "emergency":
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  // Get business entity icon
  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case "purchase_order":
        return ShoppingCart;
      case "delivery_schedule":
        return Truck;
      case "grn":
        return FileText;
      case "invoice":
        return IndianRupee;
      case "tenant":
        return Building2;
      case "user":
        return Users;
      default:
        return Package;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No notifications
          </h3>
          <p className="text-gray-500">
            You're all caught up! No new notifications to display.
          </p>
        </CardContent>
      </Card>
    );
  }

  const allSelected =
    notifications.length > 0 &&
    selectedNotifications.length === notifications.length;
  const someSelected = selectedNotifications.length > 0;

  return (
    <div className="space-y-4">
      {/* Bulk Actions Header */}
      {notifications.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all notifications"
                />
                <span className="text-sm text-gray-600">
                  {someSelected
                    ? `${selectedNotifications.length} of ${notifications.length} selected`
                    : `${notifications.length} notifications`}
                </span>
              </div>

              {someSelected && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onBulkOperation("mark_read")}
                  >
                    <CheckCheck className="h-4 w-4 mr-2" />
                    Mark Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onBulkOperation("mark_acknowledged")}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Acknowledge
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onBulkOperation("dismiss")}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Dismiss
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onBulkOperation("archive")}
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onBulkOperation("forward")}
                      >
                        <Forward className="h-4 w-4 mr-2" />
                        Forward
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => {
          const isExpanded = expandedNotification === notification.id;
          const isSelected = selectedNotifications.includes(notification.id);
          const isHovered = hoveredNotification === notification.id;
          const priorityIndicator = getPriorityIndicator(notification.priority);
          const statusBadge = getStatusBadge(notification.status);
          const CategoryIcon = getCategoryIcon(notification.category);
          const EntityIcon = notification.relatedEntity
            ? getEntityIcon(notification.relatedEntity.type)
            : null;

          return (
            <Card
              key={notification.id}
              className={cn(
                "transition-all duration-200 hover:shadow-md cursor-pointer",
                isSelected && "ring-2 ring-blue-500",
                isExpanded && "shadow-lg",
                notification.status === "pending" &&
                  "border-l-4 border-l-blue-500",
                notification.priority === "critical" &&
                  "border-l-4 border-l-red-500",
                notification.priority === "urgent" &&
                  "border-l-4 border-l-orange-500",
              )}
              onMouseEnter={() => setHoveredNotification(notification.id)}
              onMouseLeave={() => setHoveredNotification(null)}
            >
              <CardContent className="p-0">
                {/* Main notification row */}
                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Selection checkbox */}
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        handleSelectNotification(
                          notification.id,
                          checked as boolean,
                        )
                      }
                      aria-label={`Select notification ${notification.title}`}
                    />

                    {/* Priority indicator */}
                    {showPriorityIndicator && (
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            priorityIndicator.color,
                          )}
                        ></div>
                      </div>
                    )}

                    {/* Sender avatar */}
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={undefined} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {notification.senderName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Notification content */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {notification.title}
                            </h3>
                            <Badge
                              className={statusBadge.color}
                              variant="secondary"
                            >
                              {statusBadge.label}
                            </Badge>
                            {notification.priority !== "medium" && (
                              <Badge
                                variant="outline"
                                className={priorityIndicator.textColor}
                              >
                                {notification.priority}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                            <CategoryIcon className="h-3 w-3" />
                            <span>{notification.senderName}</span>
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            <span>
                              {formatDistanceToNow(
                                parseISO(notification.createdAt),
                                { addSuffix: true },
                              )}
                            </span>
                            {notification.relatedEntity && (
                              <>
                                <span>•</span>
                                {EntityIcon && (
                                  <EntityIcon className="h-3 w-3" />
                                )}
                                <span>{notification.relatedEntity.name}</span>
                              </>
                            )}
                          </div>

                          <p className="text-sm text-gray-700 line-clamp-2">
                            {notification.message}
                          </p>

                          {/* Tags */}
                          {notification.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {notification.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {notification.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{notification.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Action buttons and expand toggle */}
                        <div className="flex items-center space-x-2 ml-4">
                          {/* Quick actions */}
                          {notification.actions.slice(0, 2).map((action) => (
                            <Button
                              key={action.id}
                              variant={
                                action.style === "primary"
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className={cn(
                                action.style === "success" &&
                                  "bg-green-600 hover:bg-green-700 text-white",
                                action.style === "danger" &&
                                  "bg-red-600 hover:bg-red-700 text-white",
                                action.style === "warning" &&
                                  "bg-orange-600 hover:bg-orange-700 text-white",
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                onNotificationAction(
                                  notification.id,
                                  action.id,
                                );
                              }}
                              disabled={!action.enabled}
                            >
                              {action.label}
                            </Button>
                          ))}

                          {/* More actions dropdown */}
                          {notification.actions.length > 2 && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {notification.actions.slice(2).map((action) => (
                                  <DropdownMenuItem
                                    key={action.id}
                                    onClick={() =>
                                      onNotificationAction(
                                        notification.id,
                                        action.id,
                                      )
                                    }
                                    disabled={!action.enabled}
                                  >
                                    {action.label}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}

                          {/* Expand/collapse button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleExpand(notification.id);
                            }}
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <>
                    <Separator />
                    <div className="p-4 bg-gray-50">
                      <div className="space-y-4">
                        {/* Full content */}
                        {notification.content.fullText && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Full Message
                            </h4>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                              {notification.content.fullText}
                            </p>
                          </div>
                        )}

                        {/* Business context */}
                        {notification.businessContext && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Business Context
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm">
                                <span className="font-medium">Process:</span>
                                <Badge variant="outline">
                                  {notification.businessContext.processType}
                                </Badge>
                              </div>
                              {notification.businessContext.deadlines &&
                                notification.businessContext.deadlines.length >
                                  0 && (
                                  <div className="flex items-center space-x-2 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">
                                      Deadline:
                                    </span>
                                    <span className="text-red-600">
                                      {formatDistanceToNow(
                                        parseISO(
                                          notification.businessContext
                                            .deadlines[0].dueDate,
                                        ),
                                        { addSuffix: true },
                                      )}
                                    </span>
                                  </div>
                                )}
                            </div>
                          </div>
                        )}

                        {/* Related entity link */}
                        {notification.relatedEntity?.url && (
                          <div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                window.open(
                                  notification.relatedEntity!.url,
                                  "_blank",
                                )
                              }
                              className="flex items-center space-x-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>
                                View{" "}
                                {notification.relatedEntity.displayName ||
                                  notification.relatedEntity.name}
                              </span>
                            </Button>
                          </div>
                        )}

                        {/* Attachments */}
                        {notification.attachments.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Attachments
                            </h4>
                            <div className="space-y-2">
                              {notification.attachments.map((attachment) => (
                                <div
                                  key={attachment.id}
                                  className="flex items-center space-x-2"
                                >
                                  <FileText className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">
                                    {attachment.fileName}
                                  </span>
                                  <Button variant="ghost" size="sm">
                                    Download
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* All actions */}
                        {notification.actions.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Actions
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {notification.actions.map((action) => (
                                <Button
                                  key={action.id}
                                  variant={
                                    action.style === "primary"
                                      ? "default"
                                      : "outline"
                                  }
                                  size="sm"
                                  className={cn(
                                    action.style === "success" &&
                                      "bg-green-600 hover:bg-green-700 text-white",
                                    action.style === "danger" &&
                                      "bg-red-600 hover:bg-red-700 text-white",
                                    action.style === "warning" &&
                                      "bg-orange-600 hover:bg-orange-700 text-white",
                                  )}
                                  onClick={() =>
                                    onNotificationAction(
                                      notification.id,
                                      action.id,
                                    )
                                  }
                                  disabled={!action.enabled}
                                >
                                  {action.label}
                                  {action.description && (
                                    <span className="ml-2 text-xs opacity-75">
                                      {action.description}
                                    </span>
                                  )}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
