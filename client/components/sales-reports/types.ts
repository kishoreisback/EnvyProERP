// Sales & Performance Reports Types

export interface SalesPerformanceMetrics {
  tenantId: string;
  period: string;
  userType: "franchisee" | "corporate" | "regional_manager";

  // Revenue Metrics
  revenue: {
    total: number;
    growth: number;
    target: number;
    achievement: number; // percentage
    monthlyRevenue: MonthlyRevenue[];
    revenueByChannel: RevenueByChannel[];
  };

  // Sales Metrics
  sales: {
    totalOrders: number;
    orderGrowth: number;
    averageOrderValue: number;
    conversionRate: number;
    totalCustomers: number;
    newCustomers: number;
    customerRetention: number;
  };

  // Regional Performance
  regional: RegionalPerformance[];

  // Product Performance
  products: {
    topSelling: TopSellingProduct[];
    slowMoving: SlowMovingProduct[];
    marginAnalysis: ProductMarginAnalysis[];
  };

  // Franchisee Performance
  franchisees: FranchiseePerformance[];

  // Alerts
  alerts: PerformanceAlert[];
}

export interface MonthlyRevenue {
  month: string;
  year: number;
  revenue: number;
  orders: number;
  growth: number;
  target: number;
  achievement: number;
}

export interface RevenueByChannel {
  channel: "online" | "offline" | "b2b" | "retail" | "wholesale";
  revenue: number;
  percentage: number;
  growth: number;
  orders: number;
}

export interface RegionalPerformance {
  regionId: string;
  regionName: string;
  state: string;
  city?: string;
  franchiseeCount: number;
  totalRevenue: number;
  growth: number;
  target: number;
  achievement: number;
  averageRevenuePerFranchisee: number;
  topFranchisee: {
    name: string;
    revenue: number;
  };
  marketPenetration: number;
}

export interface TopSellingProduct {
  productId: string;
  productCode: string;
  productName: string;
  category: string;
  brand?: string;
  quantitySold: number;
  revenue: number;
  growth: number;
  margin: number;
  marginPercentage: number;
  salesRank: number;
  previousRank: number;
  customers: number;
  avgOrderQuantity: number;
}

export interface SlowMovingProduct {
  productId: string;
  productCode: string;
  productName: string;
  category: string;
  currentStock: number;
  daysSinceLastSale: number;
  lastSaleDate: string;
  stockValue: number;
  recommendedAction: "discount" | "bundle" | "discontinue" | "promotion";
  potentialLoss: number;
}

export interface ProductMarginAnalysis {
  productId: string;
  productCode: string;
  productName: string;
  category: string;
  sellingPrice: number;
  costPrice: number;
  margin: number;
  marginPercentage: number;
  volume: number;
  totalMargin: number;
  benchmarkMargin: number;
  marginTrend: "improving" | "declining" | "stable";
  recommendation: string;
}

export interface FranchiseePerformance {
  franchiseeId: string;
  franchiseeName: string;
  regionId: string;
  regionName: string;
  state: string;
  city: string;

  // Revenue Metrics
  revenue: number;
  revenueGrowth: number;
  revenueTarget: number;
  revenueAchievement: number;

  // Sales Metrics
  totalOrders: number;
  orderGrowth: number;
  averageOrderValue: number;

  // Customer Metrics
  totalCustomers: number;
  newCustomers: number;
  customerRetention: number;

  // Product Metrics
  topProducts: string[];
  categoriesSold: number;

  // Performance Indicators
  performanceRating: "excellent" | "good" | "average" | "poor" | "critical";
  rank: number;
  totalFranchisees: number;

  // Operational Metrics
  inventoryTurnover: number;
  paymentDelays: number;
  complianceScore: number;

  // Historical Performance
  monthlyPerformance: MonthlyFranchiseePerformance[];

  // Alerts
  hasLowPerformanceAlert: boolean;
  alertCount: number;
}

export interface MonthlyFranchiseePerformance {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
  achievement: number;
}

export interface PerformanceAlert {
  id: string;
  type:
    | "low_performance"
    | "missed_target"
    | "declining_sales"
    | "inventory_issue"
    | "payment_delay"
    | "compliance_issue";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  franchiseeId?: string;
  franchiseeName?: string;
  regionId?: string;
  regionName?: string;
  productId?: string;
  productName?: string;
  value: number;
  threshold: number;
  trend: "improving" | "declining" | "stable";
  actionRequired: string;
  assignedTo?: string;
  status: "open" | "acknowledged" | "in_progress" | "resolved" | "dismissed";
  createdAt: string;
  resolvedAt?: string;
  impact: "revenue" | "customer" | "operational" | "compliance";
  priority: number;
}

export interface SalesTarget {
  id: string;
  tenantId: string;
  targetType: "revenue" | "orders" | "customers" | "products";
  level: "corporate" | "regional" | "franchisee" | "individual";
  entityId: string; // franchisee ID, region ID, etc.
  entityName: string;

  period: "monthly" | "quarterly" | "yearly";
  startDate: string;
  endDate: string;

  target: number;
  achieved: number;
  achievement: number; // percentage

  status: "on_track" | "at_risk" | "behind" | "exceeded";

  breakdown: TargetBreakdown[];

  createdBy: string;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface TargetBreakdown {
  month: string;
  target: number;
  achieved: number;
  achievement: number;
}

export interface SalesAnalyticsDashboard {
  tenantId: string;
  userType: string;
  period: string;
  lastUpdated: string;

  // Key Performance Indicators
  kpis: {
    totalRevenue: KPIMetric;
    revenueGrowth: KPIMetric;
    totalOrders: KPIMetric;
    averageOrderValue: KPIMetric;
    customerCount: KPIMetric;
    conversionRate: KPIMetric;
    franchiseeCount?: KPIMetric;
    regionCount?: KPIMetric;
  };

  // Charts Data
  charts: {
    revenueChart: ChartData;
    salesChart: ChartData;
    regionalChart: ChartData;
    productChart: ChartData;
    franchiseeChart: ChartData;
    marginChart: ChartData;
  };

  // Summary Tables
  tables: {
    topRegions: RegionalPerformance[];
    topFranchisees: FranchiseePerformance[];
    topProducts: TopSellingProduct[];
    lowPerformers: FranchiseePerformance[];
  };
}

export interface KPIMetric {
  value: number;
  target?: number;
  achievement?: number;
  growth: number;
  trend: "up" | "down" | "stable";
  status: "excellent" | "good" | "warning" | "critical";
  unit: "currency" | "number" | "percentage";
  format?: string;
}

export interface ChartData {
  type: "line" | "bar" | "pie" | "area" | "donut";
  title: string;
  data: ChartDataPoint[];
  xAxis?: string;
  yAxis?: string;
  categories?: string[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
  category?: string;
  color?: string;
  percentage?: number;
  growth?: number;
}

// Filter and Search Types
export interface SalesReportFilters {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  regions?: string[];
  franchisees?: string[];
  products?: string[];
  categories?: string[];
  channels?: string[];
  performanceLevel?: ("excellent" | "good" | "average" | "poor" | "critical")[];
  alertTypes?: string[];
  targetStatus?: string[];
}

export interface ReportExportConfig {
  reportType:
    | "revenue_dashboard"
    | "regional_performance"
    | "franchisee_performance"
    | "product_analysis"
    | "margin_analysis"
    | "performance_alerts";
  format: "pdf" | "excel" | "csv" | "powerpoint";
  includeCharts: boolean;
  includeSummary: boolean;
  includeDetails: boolean;
  filters: SalesReportFilters;
  customization: {
    logo?: string;
    companyName?: string;
    reportTitle?: string;
    additionalNotes?: string;
  };
}

// Comparison and Benchmarking
export interface PerformanceComparison {
  entity: "franchisee" | "region" | "product";
  entityId: string;
  entityName: string;

  current: PerformanceMetrics;
  previous: PerformanceMetrics;
  benchmark: PerformanceMetrics;
  industry?: PerformanceMetrics;

  ranking: {
    current: number;
    previous: number;
    total: number;
    improvement: number;
  };

  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface PerformanceMetrics {
  revenue: number;
  growth: number;
  orders: number;
  customers: number;
  margin: number;
  efficiency: number;
}

// Forecasting and Predictions
export interface SalesForecast {
  entityType: "corporate" | "regional" | "franchisee";
  entityId: string;
  entityName: string;

  forecastPeriod: "next_month" | "next_quarter" | "next_year";
  forecastDate: string;

  predictions: {
    revenue: ForecastPrediction;
    orders: ForecastPrediction;
    customers: ForecastPrediction;
  };

  assumptions: string[];
  confidence: number; // 0-100
  methodology: "historical" | "trend_analysis" | "ml_model" | "seasonal";

  scenarios: {
    optimistic: ForecastPrediction;
    realistic: ForecastPrediction;
    pessimistic: ForecastPrediction;
  };
}

export interface ForecastPrediction {
  value: number;
  confidence: number;
  range: {
    min: number;
    max: number;
  };
  factors: string[];
}
