// Tenant-Driven Inventory Management Types

export interface TenantInventoryConfig {
  id: string;
  tenantId: string;
  tenantName: string;
  industryType: 'construction' | 'real_estate' | 'retail' | 'manufacturing' | 'service' | 'technology';
  enabledModules: InventoryModule[];
  customCategories: string[];
  defaultCurrency: string;
  timezone: string;
  fiscalYearStart: string;
  autoReorderEnabled: boolean;
  lowStockThreshold: number;
  approvalWorkflow: boolean;
  multiLocationEnabled: boolean;
  barcodeEnabled: boolean;
  serialNumberTracking: boolean;
  lotTracking: boolean;
  expiryTracking: boolean;
}

export type InventoryModule = 
  | 'items_management'
  | 'stock_tracking' 
  | 'purchase_orders'
  | 'suppliers'
  | 'receiving'
  | 'transfers'
  | 'adjustments'
  | 'valuations'
  | 'reports'
  | 'alerts'
  | 'mobile_scanning'
  | 'integrations';

export interface TenantInventoryItem {
  id: string;
  tenantId: string;
  itemCode: string;
  itemName: string;
  description: string;
  category: string;
  subCategory?: string;
  brand?: string;
  model?: string;
  sku: string;
  barcode?: string;
  serialNumber?: string;
  lotNumber?: string;
  
  // Pricing & Valuation
  unitPrice: number;
  currency: string;
  costPrice: number;
  sellingPrice?: number;
  valuationMethod: 'FIFO' | 'LIFO' | 'Weighted_Average' | 'Standard_Cost';
  
  // Stock Information
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  unit: string;
  alternativeUnits?: AlternativeUnit[];
  
  // Threshold Management
  minStockLevel: number;
  maxStockLevel: number;
  reorderPoint: number;
  reorderQuantity: number;
  
  // Location & Storage
  primaryLocationId: string;
  alternateLocations: string[];
  storageRequirements?: StorageRequirements;
  
  // Quality & Compliance
  qualityGrade?: string;
  specifications?: ItemSpecification[];
  certifications?: string[];
  complianceStandards?: string[];
  
  // Lifecycle
  expiryDate?: string;
  manufacturingDate?: string;
  batchNumber?: string;
  supplierItemCode?: string;
  
  // Business Logic
  isActive: boolean;
  isTrackable: boolean;
  isConsumable: boolean;
  isForSale: boolean;
  taxCategory?: string;
  hsn_sac_code?: string;
  
  // Audit
  createdAt: string;
  createdBy: string;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
  
  // Images & Documents
  images?: string[];
  documents?: Document[];
  
  // Custom Fields (Industry Specific)
  customFields?: Record<string, any>;
}

export interface AlternativeUnit {
  unit: string;
  conversionFactor: number;
  isDefault: boolean;
}

export interface StorageRequirements {
  temperature?: {
    min: number;
    max: number;
    unit: 'celsius' | 'fahrenheit';
  };
  humidity?: {
    min: number;
    max: number;
  };
  specialConditions?: string[];
  storageType: 'ambient' | 'refrigerated' | 'frozen' | 'hazardous' | 'controlled';
}

export interface ItemSpecification {
  name: string;
  value: string;
  unit?: string;
  tolerance?: number;
}

export interface TenantWarehouse {
  id: string;
  tenantId: string;
  warehouseCode: string;
  warehouseName: string;
  address: Address;
  contactPerson: ContactPerson;
  warehouseType: 'main' | 'branch' | 'transit' | 'virtual' | 'consignment';
  capacity: WarehouseCapacity;
  zones: WarehouseZone[];
  operatingHours: OperatingHours;
  facilities: string[];
  isActive: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface WarehouseZone {
  id: string;
  zoneName: string;
  zoneCode: string;
  zoneType: 'receiving' | 'storage' | 'picking' | 'shipping' | 'quality' | 'damaged';
  capacity: number;
  currentUtilization: number;
  restrictions?: string[];
}

export interface WarehouseCapacity {
  totalArea: number;
  storageArea: number;
  unit: 'sqft' | 'sqm';
  palletPositions: number;
  maxWeight: number;
  weightUnit: 'kg' | 'tons';
}

export interface TenantSupplier {
  id: string;
  tenantId: string;
  supplierCode: string;
  supplierName: string;
  contactPerson: ContactPerson;
  address: Address;
  supplierType: 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer' | 'service_provider';
  paymentTerms: PaymentTerms;
  deliveryTerms: string;
  leadTime: number; // in days
  minimumOrderValue: number;
  currency: string;
  creditLimit: number;
  creditRating: 'excellent' | 'good' | 'average' | 'poor';
  isPreferred: boolean;
  isActive: boolean;
  categories: string[]; // Categories they supply
  documents: Document[];
  performance: SupplierPerformance;
  bankDetails?: BankDetails;
  taxDetails: TaxDetails;
  certifications?: string[];
}

export interface ContactPerson {
  name: string;
  designation: string;
  email: string;
  phone: string;
  mobile: string;
  alternateContact?: string;
}

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  landmark?: string;
}

export interface PaymentTerms {
  termType: 'net' | 'advance' | 'cod' | 'credit';
  creditDays: number;
  discountPercent?: number;
  discountDays?: number;
  latePaymentCharges?: number;
}

export interface SupplierPerformance {
  deliveryRating: number; // 1-5
  qualityRating: number; // 1-5
  serviceRating: number; // 1-5
  priceCompetitiveness: number; // 1-5
  totalOrders: number;
  onTimeDeliveryPercent: number;
  qualityRejectPercent: number;
  lastEvaluationDate: string;
}

export interface TenantPurchaseOrder {
  id: string;
  tenantId: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  warehouseId: string;
  orderDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  status: 'draft' | 'sent' | 'acknowledged' | 'partially_received' | 'fully_received' | 'cancelled' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Financial
  currency: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  shippingCharges: number;
  otherCharges: number;
  totalAmount: number;
  
  // Items
  items: PurchaseOrderItem[];
  
  // Terms & Conditions
  paymentTerms: string;
  deliveryTerms: string;
  notes?: string;
  termsConditions?: string;
  
  // Approval Workflow
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
  
  // Receiving Information
  receivingStatus: 'pending' | 'partial' | 'completed';
  receivedItems?: ReceivedItem[];
  
  // Audit
  createdBy: string;
  createdAt: string;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
  
  // Documents
  documents: Document[];
}

export interface PurchaseOrderItem {
  id: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
  taxRate: number;
  lineTotal: number;
  expectedDeliveryDate?: string;
  specifications?: string;
  notes?: string;
}

export interface ReceivedItem {
  poItemId: string;
  receivedQuantity: number;
  receivedDate: string;
  qualityCheckStatus: 'passed' | 'failed' | 'pending';
  rejectedQuantity?: number;
  rejectionReason?: string;
  lotNumber?: string;
  serialNumbers?: string[];
  receivedBy: string;
  notes?: string;
}

export interface TenantStockMovement {
  id: string;
  tenantId: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  movementType: 'purchase' | 'sale' | 'transfer' | 'adjustment' | 'production' | 'consumption' | 'return' | 'damage' | 'theft' | 'expired';
  transactionType: 'in' | 'out';
  quantity: number;
  unit: string;
  fromLocation?: string;
  toLocation?: string;
  referenceId?: string; // PO, Sale Order, Transfer Order etc.
  referenceType?: string;
  cost: number;
  reason: string;
  notes?: string;
  performedBy: string;
  performedAt: string;
  authorizedBy?: string;
  batchNumber?: string;
  serialNumbers?: string[];
  expiryDate?: string;
}

export interface TenantInventoryValuation {
  id: string;
  tenantId: string;
  valuationDate: string;
  valuationMethod: 'FIFO' | 'LIFO' | 'Weighted_Average' | 'Standard_Cost';
  totalValue: number;
  currency: string;
  itemValuations: ItemValuation[];
  createdBy: string;
  createdAt: string;
  status: 'draft' | 'approved' | 'finalized';
}

export interface ItemValuation {
  itemId: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  averageCost: number;
  totalValue: number;
  lastPurchasePrice: number;
  standardCost?: number;
  variance?: number;
}

export interface TenantInventoryAlert {
  id: string;
  tenantId: string;
  alertType: 'low_stock' | 'high_stock' | 'no_stock' | 'expiry' | 'reorder' | 'quality' | 'supplier' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  itemId?: string;
  itemCode?: string;
  itemName?: string;
  locationId?: string;
  title: string;
  message: string;
  threshold?: number;
  currentValue?: number;
  actionRequired: string;
  assignedTo?: string;
  status: 'open' | 'acknowledged' | 'in_progress' | 'resolved' | 'dismissed';
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  notes?: string;
}

export interface BankDetails {
  bankName: string;
  branchName: string;
  accountNumber: string;
  ifscCode: string;
  swiftCode?: string;
  accountType: 'savings' | 'current' | 'cc_od';
}

export interface TaxDetails {
  gstNumber?: string;
  panNumber?: string;
  taxRegistrationNumber?: string;
  taxType: 'gst' | 'vat' | 'sales_tax' | 'exempt';
}

export interface Document {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  category: 'invoice' | 'receipt' | 'certificate' | 'specification' | 'warranty' | 'other';
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
  openTime?: string;
  closeTime?: string;
  breaks?: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface InventoryDashboardMetrics {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  expiringItems: number;
  pendingOrders: number;
  pendingReceiving: number;
  averageStockTurnover: number;
  warehouseUtilization: number;
  supplierPerformance: number;
  costVariance: number;
  monthlyConsumption: number;
  topMovingItems: TopMovingItem[];
  categoryDistribution: CategoryDistribution[];
  stockAging: StockAging[];
  alertsSummary: AlertsSummary;
}

export interface TopMovingItem {
  itemId: string;
  itemCode: string;
  itemName: string;
  category: string;
  quantity: number;
  value: number;
  turnoverRatio: number;
}

export interface CategoryDistribution {
  category: string;
  itemCount: number;
  totalValue: number;
  percentage: number;
}

export interface StockAging {
  ageGroup: string; // 0-30, 31-60, 61-90, 90+ days
  itemCount: number;
  value: number;
  percentage: number;
}

export interface AlertsSummary {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  unresolved: number;
}

export interface InventoryReportConfig {
  reportType: 'stock_summary' | 'valuation' | 'movement' | 'abc_analysis' | 'aging' | 'supplier_performance' | 'consumption';
  dateRange: {
    startDate: string;
    endDate: string;
  };
  filters: {
    categories?: string[];
    locations?: string[];
    suppliers?: string[];
    items?: string[];
  };
  groupBy?: 'category' | 'location' | 'supplier' | 'item';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  includeInactive?: boolean;
  format: 'pdf' | 'excel' | 'csv';
}

// Industry-specific configurations
export interface IndustryConfig {
  construction: {
    categories: string[];
    units: string[];
    specifications: string[];
    compliance: string[];
  };
  real_estate: {
    categories: string[];
    units: string[];
    specifications: string[];
    compliance: string[];
  };
  retail: {
    categories: string[];
    units: string[];
    specifications: string[];
    compliance: string[];
  };
  manufacturing: {
    categories: string[];
    units: string[];
    specifications: string[];
    compliance: string[];
  };
}
