// Sales & Performance Reports Module Exports

export { SalesPerformanceReportsDashboard } from "./SalesPerformanceReportsDashboard";
export { RevenueDashboard } from "./RevenueDashboard";
export { RegionalPerformanceAnalytics } from "./RegionalPerformanceAnalytics";
export { MarginPricingAnalysis } from "./MarginPricingAnalysis";
export { PerformanceAlertsSystem } from "./PerformanceAlertsSystem";

// Type exports
export type * from "./types";

// Data generators
export {
  generateSalesPerformanceMetrics,
  generateFranchiseePerformance,
  generateSalesAnalyticsDashboard,
  generateSalesTargets,
  generatePerformanceComparison,
  generateSalesForecast,
} from "./data";
