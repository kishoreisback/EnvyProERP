// Main dashboard
export { NotificationWorkflowDashboard } from "./NotificationWorkflowDashboard";
export { UnifiedNotificationDashboard } from "./UnifiedNotificationDashboard";
export { NotificationList } from "./NotificationList";
export { NotificationSettings } from "./NotificationSettings";
export { AnalyticsDashboard } from "./AnalyticsDashboard";
export { WorkflowManagement } from "./WorkflowManagement";
export { TemplateManagement } from "./TemplateManagement";
export {
  NotificationDetailsModal,
  PreferencesModal,
  TemplateCreationModal,
  WorkflowCreationModal,
} from "./NotificationModals";

// Types and data
export * from "./types";
export * from "./data";

// Export helper functions
export {
  getTenantNotifications,
  getTenantTemplates,
  getTenantRules,
  getTenantSettings,
  getTenantAnalytics,
  filterNotifications,
} from "./data";
