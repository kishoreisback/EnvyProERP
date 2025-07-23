// Order & Inventory History Management Types

export interface OrderHistoryRecord {
  id: string;
  tenantId: string;

  // Order Information
  orderId: string;
  orderNumber: string;
  orderType:
    | "purchase_order"
    | "sales_order"
    | "transfer_order"
    | "return_order";

  // Entities
  customerId?: string;
  customerName?: string;
  supplierId?: string;
  supplierName?: string;
  franchiseeId?: string;
  franchiseeName?: string;

  // Timeline & Status
  orderDate: string;
  status: OrderStatus;
  previousStatus?: OrderStatus;
  statusHistory: OrderStatusHistory[];

  // Financial
  totalValue: number;
  currency: string;
  paidAmount: number;
  balanceAmount: number;
  paymentStatus: "pending" | "partial" | "paid" | "overdue";

  // Items Summary
  totalItems: number;
  totalQuantity: number;
  itemCategories: string[];

  // Tracking
  deliveryDate?: string;
  actualDeliveryDate?: string;
  deliveryStatus:
    | "pending"
    | "shipped"
    | "in_transit"
    | "delivered"
    | "cancelled";

  // Metadata
  createdBy: string;
  lastModifiedBy: string;
  lastModifiedAt: string;

  // Related Records
  invoiceIds: string[];
  paymentIds: string[];
  deliveryIds: string[];
}

export interface OrderStatusHistory {
  id: string;
  status: OrderStatus;
  timestamp: string;
  changedBy: string;
  reason?: string;
  notes?: string;
  location?: string;
  automaticChange: boolean;
}

export type OrderStatus =
  | "draft"
  | "submitted"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "confirmed"
  | "in_production"
  | "ready_to_ship"
  | "shipped"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "partially_delivered"
  | "completed"
  | "cancelled"
  | "on_hold"
  | "back_ordered"
  | "returned";

export interface InventoryMovementRecord {
  id: string;
  tenantId: string;

  // Item Information
  itemId: string;
  itemCode: string;
  itemName: string;
  category: string;
  subCategory?: string;
  sku: string;
  barcode?: string;

  // Movement Details
  movementType: InventoryMovementType;
  transactionType: "in" | "out" | "adjustment";
  quantity: number;
  unit: string;

  // Cost & Valuation
  unitCost: number;
  totalCost: number;
  averageCost: number;
  valuationMethod: "FIFO" | "LIFO" | "Weighted_Average" | "Standard_Cost";

  // Location Information
  fromLocationId?: string;
  fromLocationName?: string;
  toLocationId?: string;
  toLocationName?: string;
  warehouseId: string;
  warehouseName: string;
  zoneId?: string;
  zoneName?: string;

  // Stock Levels
  stockBefore: number;
  stockAfter: number;
  reservedStock: number;
  availableStock: number;

  // Reference Information
  referenceType?:
    | "purchase_order"
    | "sales_order"
    | "transfer"
    | "adjustment"
    | "production"
    | "return";
  referenceId?: string;
  referenceNumber?: string;

  // Quality & Batch
  batchNumber?: string;
  lotNumber?: string;
  serialNumbers?: string[];
  expiryDate?: string;
  qualityGrade?: string;

  // Approval & Authorization
  requiresApproval: boolean;
  approvalStatus?: "pending" | "approved" | "rejected";
  authorizedBy?: string;
  authorizedAt?: string;

  // Audit Trail
  performedBy: string;
  performedAt: string;
  reason: string;
  notes?: string;

  // System Information
  automaticMovement: boolean;
  source: "manual" | "system" | "api" | "import";
  deviceId?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export type InventoryMovementType =
  | "purchase_receipt"
  | "sales_shipment"
  | "transfer_in"
  | "transfer_out"
  | "adjustment_in"
  | "adjustment_out"
  | "production_in"
  | "production_out"
  | "return_in"
  | "return_out"
  | "damage"
  | "theft"
  | "expired"
  | "cycle_count"
  | "opening_balance"
  | "closing_balance";

export interface HistoryAnalytics {
  tenantId: string;
  period: string;

  // Order Analytics
  orders: {
    total: number;
    completed: number;
    cancelled: number;
    pending: number;
    totalValue: number;
    averageValue: number;
    averageProcessingTime: number; // in days
    onTimeDeliveryRate: number;
    cancellationRate: number;
    topCustomers: TopEntity[];
    topSuppliers: TopEntity[];
    monthlyTrends: MonthlyTrend[];
    statusDistribution: StatusDistribution[];
  };

  // Inventory Analytics
  inventory: {
    totalMovements: number;
    totalValue: number;
    inMovements: number;
    outMovements: number;
    adjustments: number;
    stockTurnover: number;
    averageStockLevel: number;
    fastMovingItems: TopMovingItem[];
    slowMovingItems: TopMovingItem[];
    categoryPerformance: CategoryPerformance[];
    warehouseUtilization: WarehouseUtilization[];
    stockAccuracy: number;
  };

  // Performance Metrics
  performance: {
    orderFulfillmentRate: number;
    inventoryAccuracy: number;
    stockOutFrequency: number;
    excessStockLevel: number;
    demandForecastAccuracy: number;
    supplierPerformance: SupplierPerformance[];
  };
}

export interface TopEntity {
  id: string;
  name: string;
  orderCount: number;
  totalValue: number;
  averageOrderValue: number;
  lastOrderDate: string;
}

export interface MonthlyTrend {
  month: string;
  year: number;
  orderCount: number;
  totalValue: number;
  completedOrders: number;
  averageProcessingTime: number;
}

export interface StatusDistribution {
  status: OrderStatus;
  count: number;
  percentage: number;
  value: number;
}

export interface TopMovingItem {
  itemId: string;
  itemCode: string;
  itemName: string;
  category: string;
  totalQuantity: number;
  totalValue: number;
  turnoverRatio: number;
  lastMovementDate: string;
}

export interface CategoryPerformance {
  category: string;
  totalMovements: number;
  totalValue: number;
  turnoverRatio: number;
  stockLevel: number;
  accuracy: number;
}

export interface WarehouseUtilization {
  warehouseId: string;
  warehouseName: string;
  capacity: number;
  utilized: number;
  utilization: number;
  movements: number;
  accuracy: number;
}

export interface SupplierPerformance {
  supplierId: string;
  supplierName: string;
  totalOrders: number;
  totalValue: number;
  onTimeDelivery: number;
  qualityRating: number;
  responseTime: number;
  priceCompetitiveness: number;
}

export interface HistoryFilters {
  // Date Range
  dateRange: {
    startDate: string;
    endDate: string;
  };

  // Entity Filters
  customerIds?: string[];
  supplierIds?: string[];
  franchiseeIds?: string[];

  // Product/Item Filters
  categories?: string[];
  subCategories?: string[];
  itemIds?: string[];

  // Status Filters
  orderStatuses?: OrderStatus[];
  paymentStatuses?: string[];
  deliveryStatuses?: string[];

  // Value Range
  valueRange?: {
    min: number;
    max: number;
  };

  // Location Filters
  warehouseIds?: string[];
  locationIds?: string[];

  // Movement Type Filters
  movementTypes?: InventoryMovementType[];
  transactionTypes?: ("in" | "out" | "adjustment")[];

  // Search
  searchTerm?: string;

  // Sorting
  sortBy?: string;
  sortOrder?: "asc" | "desc";

  // Pagination
  page?: number;
  limit?: number;
}

export interface ReportConfiguration {
  id: string;
  name: string;
  type: "order_history" | "inventory_movement" | "analytics" | "custom";

  // Report Settings
  filters: HistoryFilters;
  groupBy?: string[];
  aggregations?: ReportAggregation[];

  // Format & Layout
  format: "pdf" | "excel" | "csv" | "json";
  layout: "table" | "summary" | "detailed" | "dashboard";
  includeCharts: boolean;
  includeSummary: boolean;

  // Columns Configuration
  columns: ReportColumn[];

  // Scheduling
  isScheduled: boolean;
  schedule?: {
    frequency: "daily" | "weekly" | "monthly" | "quarterly";
    time: string;
    recipients: string[];
  };

  // Metadata
  createdBy: string;
  createdAt: string;
  lastRunAt?: string;
  isActive: boolean;
}

export interface ReportAggregation {
  field: string;
  function: "sum" | "avg" | "count" | "min" | "max" | "first" | "last";
  alias?: string;
}

export interface ReportColumn {
  key: string;
  label: string;
  dataType: "string" | "number" | "date" | "boolean" | "currency";
  width?: number;
  alignment?: "left" | "center" | "right";
  format?: string;
  visible: boolean;
  sortable: boolean;
}

export interface HistoryDashboardMetrics {
  tenantId: string;
  lastUpdated: string;

  // Quick Stats
  totalOrders: number;
  ordersThisMonth: number;
  orderGrowth: number; // percentage
  totalOrderValue: number;
  orderValueGrowth: number;

  totalMovements: number;
  movementsThisMonth: number;
  movementGrowth: number;
  totalMovementValue: number;

  // Key Performance Indicators
  orderFulfillmentRate: number;
  averageOrderProcessingTime: number;
  onTimeDeliveryRate: number;
  stockTurnoverRate: number;
  inventoryAccuracy: number;

  // Recent Activity
  recentOrders: OrderHistoryRecord[];
  recentMovements: InventoryMovementRecord[];

  // Alerts & Issues
  pendingApprovals: number;
  overdueOrders: number;
  stockOutItems: number;
  excessStockItems: number;

  // Trends
  orderTrends: TrendData[];
  movementTrends: TrendData[];
  valueTrends: TrendData[];
}

export interface TrendData {
  period: string;
  value: number;
  change: number;
  changeType: "increase" | "decrease" | "stable";
}

// UI Component Types
export interface HistoryTableConfig {
  type: "orders" | "movements";
  columns: string[];
  sortable: boolean;
  filterable: boolean;
  exportable: boolean;
  pagination: {
    pageSize: number;
    showSizeSelector: boolean;
  };
}

export interface HistoryTimelineItem {
  id: string;
  timestamp: string;
  type: "order" | "movement" | "payment" | "delivery";
  title: string;
  description: string;
  status: "success" | "warning" | "error" | "info";
  icon?: string;
  metadata?: Record<string, any>;
}

// Form Types
export interface HistorySearchForm {
  searchTerm: string;
  dateRange: {
    start: string;
    end: string;
  };
  entityType: "all" | "customer" | "supplier" | "franchisee";
  entityId?: string;
  category?: string;
  status?: string;
  valueMin?: number;
  valueMax?: number;
}

// Integration Types
export interface HistoryIntegration {
  source: "erp" | "warehouse" | "ecommerce" | "pos" | "api";
  lastSyncAt: string;
  status: "active" | "inactive" | "error";
  recordCount: number;
  errorCount: number;
  configuration: Record<string, any>;
}

// Export Types
export interface ExportRequest {
  id: string;
  type: "order_history" | "inventory_movement" | "analytics";
  filters: HistoryFilters;
  format: "pdf" | "excel" | "csv";
  requestedBy: string;
  requestedAt: string;
  status: "pending" | "processing" | "completed" | "failed";
  downloadUrl?: string;
  expiresAt?: string;
  fileSize?: number;
}
