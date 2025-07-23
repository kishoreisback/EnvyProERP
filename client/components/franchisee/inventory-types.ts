// Franchisee Inventory Setup Types

export interface FranchiseeInventoryItem {
  id: string;
  franchiseeId: string;
  productId: string;
  locationId: string;
  sku: string;
  productName: string;
  category: string;
  inventoryType: "consignment" | "owned" | "vendor_managed";
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  unitCost: number;
  totalValue: number;
  lastUpdated: string;
  lastRestocked: string;
  expiryDate?: string;
  batchNumber?: string;
  supplier: InventorySupplier;
  status: "active" | "inactive" | "discontinued" | "blocked";
  alerts: InventoryAlert[];
  movements: InventoryMovement[];
  metrics: InventoryMetrics;
}

export interface InventoryLocation {
  id: string;
  franchiseeId: string;
  name: string;
  type:
    | "store"
    | "warehouse"
    | "distribution_center"
    | "display_area"
    | "storage_room";
  address: LocationAddress;
  capacity: LocationCapacity;
  isActive: boolean;
  manager: LocationManager;
  operatingHours: OperatingHours;
  facilities: LocationFacility[];
  zones: InventoryZone[];
  createdAt: string;
}

export interface InventoryZone {
  id: string;
  locationId: string;
  name: string;
  type:
    | "ambient"
    | "refrigerated"
    | "frozen"
    | "dry_storage"
    | "display"
    | "receiving";
  capacity: number;
  currentUtilization: number;
  temperature?: TemperatureRange;
  specialRequirements: string[];
  isActive: boolean;
}

export interface TemperatureRange {
  min: number;
  max: number;
  unit: "celsius" | "fahrenheit";
  alertThresholds: {
    lowWarning: number;
    lowCritical: number;
    highWarning: number;
    highCritical: number;
  };
}

export interface LocationAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface LocationCapacity {
  totalArea: number;
  storageArea: number;
  displayArea: number;
  unit: "sqft" | "sqm";
  maxWeight: number;
  weightUnit: "kg" | "tons";
}

export interface LocationManager {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "store_manager" | "warehouse_manager" | "inventory_controller";
}

export interface OperatingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  breaks?: TimeBreak[];
}

export interface TimeBreak {
  startTime: string;
  endTime: string;
  reason: string;
}

export interface LocationFacility {
  id: string;
  name: string;
  type:
    | "loading_dock"
    | "cold_storage"
    | "security_system"
    | "fire_safety"
    | "cctv"
    | "parking";
  status: "active" | "maintenance" | "inactive";
  capacity?: number;
  specifications?: Record<string, any>;
}

export interface InventorySupplier {
  id: string;
  name: string;
  type: "direct_corporate" | "distributor" | "local_vendor";
  contactInfo: SupplierContact;
  paymentTerms: PaymentTerms;
  deliverySchedule: DeliverySchedule;
  performanceMetrics: SupplierMetrics;
}

export interface SupplierContact {
  primaryContact: string;
  email: string;
  phone: string;
  address: LocationAddress;
  emergencyContact?: string;
}

export interface PaymentTerms {
  creditDays: number;
  discountTerms?: DiscountTerm[];
  paymentMethod: "cash" | "credit" | "bank_transfer" | "cheque";
  currency: string;
}

export interface DiscountTerm {
  discountPercentage: number;
  paymentDays: number;
  conditions: string[];
}

export interface DeliverySchedule {
  frequency: "daily" | "weekly" | "bi_weekly" | "monthly" | "on_demand";
  preferredDays: string[];
  timeSlot: {
    start: string;
    end: string;
  };
  leadTime: number; // in days
  minimumOrderValue: number;
}

export interface SupplierMetrics {
  onTimeDelivery: number; // percentage
  qualityRating: number; // 1-5 scale
  responsiveness: number; // 1-5 scale
  lastDelivery: string;
  totalOrders: number;
  averageDeliveryTime: number; // in hours
}

export interface InventoryAlert {
  id: string;
  type:
    | "low_stock"
    | "overstock"
    | "expiry_warning"
    | "reorder_due"
    | "stock_out"
    | "temperature_breach";
  severity: "info" | "warning" | "critical" | "urgent";
  message: string;
  details: string;
  triggeredAt: string;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  resolvedAt?: string;
  actionRequired: boolean;
  autoResolvable: boolean;
  relatedItems: string[];
}

export interface InventoryMovement {
  id: string;
  inventoryItemId: string;
  type:
    | "inbound"
    | "outbound"
    | "transfer"
    | "adjustment"
    | "return"
    | "damage"
    | "expired";
  reason: string;
  quantity: number;
  fromLocation?: string;
  toLocation?: string;
  reference: MovementReference;
  performedBy: string;
  timestamp: string;
  cost?: number;
  notes?: string;
}

export interface MovementReference {
  type:
    | "purchase_order"
    | "sales_order"
    | "transfer_order"
    | "adjustment"
    | "return"
    | "disposal";
  referenceId: string;
  documentNumber?: string;
  externalReference?: string;
}

export interface InventoryMetrics {
  turnoverRate: number;
  daysOfStock: number;
  stockoutFrequency: number;
  averageLeadTime: number;
  carryCost: number;
  accuracyRate: number;
  fastMoving: boolean;
  abcClassification: "A" | "B" | "C";
  seasonalityFactor: number;
}

export interface InventoryImport {
  id: string;
  franchiseeId: string;
  sourceType:
    | "corporate_catalog"
    | "manual_entry"
    | "supplier_feed"
    | "existing_system";
  fileName?: string;
  importedBy: string;
  importedAt: string;
  status:
    | "pending"
    | "in_progress"
    | "completed"
    | "failed"
    | "partially_completed";
  totalItems: number;
  processedItems: number;
  successfulItems: number;
  failedItems: number;
  errors: ImportError[];
  mapping: ImportMapping;
  validationRules: ValidationRule[];
}

export interface ImportError {
  row: number;
  field: string;
  value: string;
  error: string;
  severity: "warning" | "error";
  suggestion?: string;
}

export interface ImportMapping {
  sku: string;
  productName: string;
  category: string;
  currentStock: string;
  minimumStock: string;
  unitCost: string;
  location: string;
  inventoryType: string;
  supplier: string;
  expiryDate?: string;
  batchNumber?: string;
}

export interface ValidationRule {
  field: string;
  rule:
    | "required"
    | "numeric"
    | "positive"
    | "date"
    | "enum"
    | "range"
    | "unique";
  parameters?: any;
  message: string;
}

export interface ReorderConfiguration {
  id: string;
  franchiseeId: string;
  productId: string;
  isEnabled: boolean;
  method: "manual" | "automatic" | "hybrid";
  triggers: ReorderTrigger[];
  defaultQuantity: number;
  maxQuantity: number;
  preferredSupplier: string;
  backupSuppliers: string[];
  leadTime: number;
  safetyStock: number;
  reviewCycle: number; // days
  seasonalAdjustments: SeasonalAdjustment[];
  approvalRequired: boolean;
  approvers: string[];
}

export interface ReorderTrigger {
  type:
    | "stock_level"
    | "time_based"
    | "demand_forecast"
    | "seasonal"
    | "promotional";
  threshold: number;
  unit: "quantity" | "days" | "percentage";
  conditions: string[];
  isActive: boolean;
}

export interface SeasonalAdjustment {
  season: string;
  months: number[];
  adjustmentFactor: number;
  reason: string;
}

// Dashboard and Analytics Types
export interface InventoryDashboard {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  expiringSoon: number;
  stockoutItems: number;
  averageTurnover: number;
  totalLocations: number;
  activeAlerts: number;
  recentMovements: InventoryMovement[];
  topCategories: CategoryInventory[];
  alertsSummary: AlertsSummary;
  performanceMetrics: InventoryPerformanceMetrics;
}

export interface CategoryInventory {
  categoryId: string;
  categoryName: string;
  totalItems: number;
  totalValue: number;
  averageTurnover: number;
  lowStockCount: number;
  overStockCount: number;
}

export interface AlertsSummary {
  total: number;
  critical: number;
  warning: number;
  info: number;
  byType: {
    lowStock: number;
    expiry: number;
    reorder: number;
    stockout: number;
    temperature: number;
  };
}

export interface InventoryPerformanceMetrics {
  stockAccuracy: number;
  turnoverRate: number;
  stockoutRate: number;
  carryingCost: number;
  orderFulfillment: number;
  supplierPerformance: number;
  inventoryDays: number;
  lastCycleCount: string;
}

// Form Types
export interface CreateInventoryItemForm {
  productId: string;
  locationId: string;
  inventoryType: "consignment" | "owned" | "vendor_managed";
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  unitCost: number;
  supplierId: string;
  expiryDate?: string;
  batchNumber?: string;
  notes?: string;
}

export interface CreateLocationForm {
  name: string;
  type:
    | "store"
    | "warehouse"
    | "distribution_center"
    | "display_area"
    | "storage_room";
  address: LocationAddress;
  capacity: LocationCapacity;
  managerId: string;
  operatingHours: OperatingHours;
  facilities: string[];
  specialRequirements: string[];
}

export interface BulkInventoryUpdate {
  items: string[];
  updateType:
    | "stock_adjustment"
    | "reorder_levels"
    | "pricing"
    | "status"
    | "location_transfer";
  updates: {
    [key: string]: any;
  };
  reason: string;
  effectiveDate?: string;
  approvalRequired: boolean;
}

export interface InventoryReport {
  id: string;
  name: string;
  type:
    | "stock_valuation"
    | "movement_summary"
    | "abc_analysis"
    | "aging_report"
    | "turnover_analysis";
  parameters: ReportParameters;
  generatedAt: string;
  generatedBy: string;
  format: "pdf" | "excel" | "csv";
  downloadUrl: string;
  scheduleEnabled: boolean;
  schedule?: ReportSchedule;
}

export interface ReportParameters {
  dateRange: {
    from: string;
    to: string;
  };
  locations?: string[];
  categories?: string[];
  suppliers?: string[];
  inventoryTypes?: string[];
  includeInactive?: boolean;
  groupBy?: string;
  sortBy?: string;
  filters?: Record<string, any>;
}

export interface ReportSchedule {
  frequency: "daily" | "weekly" | "monthly" | "quarterly";
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  recipients: string[];
  isActive: boolean;
}
