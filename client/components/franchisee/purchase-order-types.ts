// Franchisee Purchase Order Management Types

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  franchiseeId: string;
  franchiseeName: string;
  corporateId: string;
  corporateName: string;
  type: "standard" | "urgent" | "auto_generated" | "bulk" | "seasonal";
  status: POStatus;
  priority: "low" | "medium" | "high" | "urgent";
  totalAmount: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
  currency: string;

  // Order Details
  items: PurchaseOrderItem[];
  requestedDeliveryDate: string;
  preferredDeliveryTime?: string;
  deliveryLocation: DeliveryLocation;
  deliveryInstructions?: string;
  notes?: string;
  attachments: POAttachment[];

  // Workflow & Approvals
  approvalWorkflow: POApprovalWorkflow;
  approvalHistory: POApproval[];

  // Tracking & Logistics
  tracking: POTracking;
  timeline: POTimeline[];

  // Business Logic
  autoFillSource?:
    | "inventory_level"
    | "previous_order"
    | "seasonal_demand"
    | "manual";
  generatedFrom?: {
    inventoryAlertIds: string[];
    previousPOId?: string;
    seasonalTemplateId?: string;
  };

  // Metadata
  createdAt: string;
  createdBy: string;
  lastModified: string;
  modifiedBy: string;
  submittedAt?: string;
  completedAt?: string;
}

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  sku: string;
  productName: string;
  category: string;
  description: string;
  specifications: ItemSpecification;

  // Quantity & Pricing
  requestedQuantity: number;
  approvedQuantity?: number;
  fulfilledQuantity?: number;
  unitPrice: number;
  totalPrice: number;
  discountPercentage?: number;
  discountAmount?: number;
  netAmount: number;

  // Inventory Context
  currentStock: number;
  minimumStock: number;
  suggestedQuantity: number;
  avgMonthlyConsumption: number;
  lastOrderQuantity?: number;

  // Status & Tracking
  itemStatus:
    | "pending"
    | "approved"
    | "modified"
    | "rejected"
    | "fulfilled"
    | "backordered";
  rejectionReason?: string;
  modificationReason?: string;
  expectedDelivery?: string;

  // Auto-fill Information
  autoFillReason?: string[];
  priority: "low" | "medium" | "high" | "critical";
}

export interface ItemSpecification {
  volume?: string;
  packaging?: string;
  brand?: string;
  variant?: string;
  batchRequirements?: string;
  qualityStandards?: string[];
  storageRequirements?: string;
}

export interface DeliveryLocation {
  locationId: string;
  locationName: string;
  type: "store" | "warehouse" | "distribution_center";
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    landmark?: string;
  };
  contactPerson: {
    name: string;
    phone: string;
    email: string;
    alternatePhone?: string;
  };
  accessInstructions?: string;
  operatingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  loadingFacilities: {
    hasDock: boolean;
    hasForklift: boolean;
    maxVehicleSize: string;
    restrictions?: string[];
  };
}

export interface POAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
  category: "document" | "image" | "specification" | "contract" | "other";
}

export interface POApprovalWorkflow {
  isRequired: boolean;
  levels: ApprovalLevel[];
  currentLevel: number;
  isCompleted: boolean;
  requiresAllApprovers: boolean;
  autoApprovalRules: AutoApprovalRule[];
}

export interface ApprovalLevel {
  level: number;
  name: string;
  description: string;
  approvers: POApprover[];
  requiresAll: boolean;
  timeoutHours?: number;
  escalationRules: EscalationRule[];
}

export interface POApprover {
  userId: string;
  name: string;
  email: string;
  role: string;
  department: string;
  hasApproved: boolean;
  approvedAt?: string;
  comments?: string;
  approvalLimit?: number;
}

export interface EscalationRule {
  condition: "timeout" | "rejection" | "modification_required";
  action: "escalate" | "notify" | "auto_approve" | "cancel";
  targetUserId?: string;
  delayHours: number;
}

export interface AutoApprovalRule {
  id: string;
  name: string;
  conditions: ApprovalCondition[];
  action: "auto_approve" | "skip_level" | "fast_track";
  isActive: boolean;
}

export interface ApprovalCondition {
  type:
    | "amount_threshold"
    | "item_category"
    | "priority"
    | "frequency"
    | "seasonal";
  operator: "less_than" | "greater_than" | "equals" | "in_list" | "not_in_list";
  value: any;
  unit?: string;
}

export interface POApproval {
  id: string;
  level: number;
  approverId: string;
  approverName: string;
  action: "approved" | "rejected" | "sent_back" | "modified";
  timestamp: string;
  comments?: string;
  modifications?: POModification[];
  attachments?: POAttachment[];
}

export interface POModification {
  field: string;
  oldValue: any;
  newValue: any;
  reason: string;
}

export interface POTracking {
  status: POStatus;
  statusHistory: POStatusHistory[];
  currentLocation?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  shippingInfo?: ShippingInfo;
  milestones: POMilestone[];
}

export interface ShippingInfo {
  carrierId: string;
  carrierName: string;
  trackingNumber: string;
  vehicleNumber?: string;
  driverInfo?: {
    name: string;
    phone: string;
    licenseNumber: string;
  };
  route?: TrackingPoint[];
}

export interface TrackingPoint {
  location: string;
  timestamp: string;
  status: string;
  description?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface POMilestone {
  id: string;
  name: string;
  description: string;
  targetDate: string;
  actualDate?: string;
  status: "pending" | "in_progress" | "completed" | "delayed" | "skipped";
  responsible: string;
}

export interface POStatusHistory {
  status: POStatus;
  timestamp: string;
  changedBy: string;
  reason?: string;
  location?: string;
}

export interface POTimeline {
  id: string;
  timestamp: string;
  event: string;
  description: string;
  type:
    | "creation"
    | "submission"
    | "approval"
    | "modification"
    | "shipping"
    | "delivery"
    | "completion";
  performedBy: string;
  metadata?: Record<string, any>;
}

export type POStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "modified"
  | "processing"
  | "confirmed"
  | "in_production"
  | "ready_for_shipment"
  | "shipped"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "partially_delivered"
  | "completed"
  | "cancelled"
  | "on_hold"
  | "back_ordered";

// Dashboard & Analytics Types
export interface POAnalytics {
  totalOrders: number;
  totalValue: number;
  pendingOrders: number;
  pendingValue: number;
  completedOrders: number;
  completedValue: number;
  averageOrderValue: number;
  averageProcessingTime: number;
  approvalRate: number;
  onTimeDeliveryRate: number;
  topCategories: CategoryStats[];
  monthlyTrends: MonthlyTrend[];
  performanceMetrics: PerformanceMetric[];
}

export interface CategoryStats {
  category: string;
  orderCount: number;
  totalValue: number;
  percentage: number;
}

export interface MonthlyTrend {
  month: string;
  orderCount: number;
  totalValue: number;
  averageValue: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "stable";
  change: number;
}

// Form & UI Types
export interface POFormData {
  type: PurchaseOrder["type"];
  priority: PurchaseOrder["priority"];
  requestedDeliveryDate: string;
  preferredDeliveryTime?: string;
  deliveryLocationId: string;
  deliveryInstructions?: string;
  notes?: string;
  items: POFormItem[];
  attachments: File[];
}

export interface POFormItem {
  productId: string;
  requestedQuantity: number;
  notes?: string;
}

export interface POFilters {
  status?: POStatus[];
  type?: PurchaseOrder["type"][];
  priority?: PurchaseOrder["priority"][];
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
  categories?: string[];
  searchTerm?: string;
}

export interface POTableColumn {
  key: string;
  label: string;
  sortable: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

// Integration Types
export interface InventoryIntegration {
  itemId: string;
  currentStock: number;
  reorderPoint: number;
  suggestedQuantity: number;
  lastOrderDate?: string;
  averageConsumption: number;
}

export interface CatalogIntegration {
  productId: string;
  availability: boolean;
  pricing: {
    unitPrice: number;
    bulkPricing: BulkPricing[];
    discounts: ProductDiscount[];
  };
  specifications: any;
  restrictions?: string[];
}

export interface BulkPricing {
  minQuantity: number;
  maxQuantity?: number;
  unitPrice: number;
  discountPercentage: number;
}

export interface ProductDiscount {
  type: "seasonal" | "bulk" | "promotional" | "loyalty";
  percentage: number;
  validFrom: string;
  validTo: string;
  conditions?: string[];
}

// Configuration Types
export interface POConfiguration {
  approvalWorkflow: {
    isEnabled: boolean;
    defaultLevels: ApprovalLevel[];
    thresholds: ApprovalThreshold[];
  };
  autoFill: {
    isEnabled: boolean;
    sources: AutoFillSource[];
    rules: AutoFillRule[];
  };
  notifications: {
    email: NotificationSetting[];
    sms: NotificationSetting[];
    inApp: NotificationSetting[];
  };
  businessRules: BusinessRule[];
}

export interface ApprovalThreshold {
  amount: number;
  currency: string;
  requiredLevels: number;
  timeoutHours: number;
}

export interface AutoFillSource {
  type: "inventory" | "historical" | "seasonal" | "promotional";
  isEnabled: boolean;
  priority: number;
  configuration: Record<string, any>;
}

export interface AutoFillRule {
  id: string;
  name: string;
  conditions: AutoFillCondition[];
  actions: AutoFillAction[];
  isActive: boolean;
}

export interface AutoFillCondition {
  type:
    | "stock_level"
    | "time_since_order"
    | "seasonal_pattern"
    | "promotion_active";
  operator: string;
  value: any;
}

export interface AutoFillAction {
  type: "add_item" | "set_quantity" | "apply_discount" | "set_priority";
  parameters: Record<string, any>;
}

export interface NotificationSetting {
  event: string;
  isEnabled: boolean;
  recipients: string[];
  template: string;
  delay?: number;
}

export interface BusinessRule {
  id: string;
  name: string;
  type: "validation" | "automation" | "approval" | "pricing";
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
  priority: number;
}

export interface RuleCondition {
  field: string;
  operator: string;
  value: any;
  logicalOperator?: "AND" | "OR";
}

export interface RuleAction {
  type: string;
  parameters: Record<string, any>;
}
