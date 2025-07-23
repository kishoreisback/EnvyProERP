// Unified Notification System - Type Exports

// Core types
export * from "./core";

// Workflow types
export * from "./workflows";

// Template and analytics types
export * from "./templates";

// Re-export commonly used types for convenience
export type {
  UnifiedNotification,
  NotificationType,
  NotificationCategory,
  NotificationStatus,
  NotificationPriority,
  UserType,
  NotificationChannel,
  NotificationFilters,
  NotificationAction,
  EntityReference,
  BusinessContext,
  WorkflowContext,
  NotificationTemplate,
  NotificationWorkflow,
  NotificationAnalytics,
} from "./core";
