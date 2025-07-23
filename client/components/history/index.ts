// Order & Inventory History Module Exports

export { OrderInventoryHistoryDashboard } from "./OrderInventoryHistoryDashboard";
export { OrderHistoryDashboard } from "./OrderHistoryDashboard";
export { InventoryMovementTracker } from "./InventoryMovementTracker";
export { ReportGenerator } from "./ReportGenerator";

// Type exports
export type * from "./types";

// Data generators
export {
  generateOrderHistory,
  generateInventoryMovements,
  generateHistoryAnalytics,
  generateDashboardMetrics,
  generateReportConfigurations,
  generateTimelineData,
} from "./data";
