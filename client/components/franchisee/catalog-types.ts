// Product Catalog Management Types

export interface CorporateProduct {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: ProductCategory;
  subcategory: string;
  productType: "beverage" | "retail" | "merchandise" | "pos_item";
  beverageType?: "bottle" | "crate" | "keg" | "can" | "pouch";
  specifications: ProductSpecification;
  pricing: CorporatePricing;
  availability: ProductAvailability;
  images: ProductImage[];
  documents: ProductDocument[];
  compliance: ComplianceInfo;
  isActive: boolean;
  createdAt: string;
  lastModified: string;
  createdBy: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  parentCategoryId?: string;
  level: number;
  displayOrder: number;
  isActive: boolean;
  accessLevel: "public" | "premium" | "exclusive";
  regionalRestrictions: string[];
  margins: CategoryMarginSettings;
}

export interface ProductSpecification {
  volume?: string; // For beverages: 250ml, 500ml, 1L, etc.
  packaging?: string; // Bottle, Can, Keg, etc.
  dimensions?: {
    length: number;
    width: number;
    height: number;
    weight: number;
    unit: "cm" | "inch";
    weightUnit: "kg" | "lbs";
  };
  ingredients?: string[];
  nutritionalInfo?: NutritionalInfo;
  shelfLife?: number; // in days
  storageConditions?: string[];
  barcodes: Barcode[];
}

export interface NutritionalInfo {
  servingSize: string;
  calories: number;
  totalFat: number;
  saturatedFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbohydrates: number;
  dietaryFiber: number;
  sugars: number;
  protein: number;
  vitamins?: { [key: string]: string };
}

export interface Barcode {
  type: "UPC" | "EAN" | "CODE128" | "QR";
  value: string;
  isPrimary: boolean;
}

export interface CorporatePricing {
  basePrice: number;
  currency: string;
  priceSlabs: PriceSlab[];
  volumeDiscounts: VolumeDiscount[];
  seasonalPricing?: SeasonalPrice[];
  taxCategory: string;
  taxRate: number;
}

export interface PriceSlab {
  id: string;
  name: string;
  minQuantity: number;
  maxQuantity?: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
  applicableRegions: string[];
  franchiseTypes: string[];
  validFrom: string;
  validTo?: string;
  isActive: boolean;
}

export interface VolumeDiscount {
  id: string;
  minQuantity: number;
  discountPercentage: number;
  maxDiscount?: number;
  applicablePeriod: "order" | "monthly" | "quarterly";
}

export interface SeasonalPrice {
  id: string;
  season: string;
  priceMultiplier: number;
  validFrom: string;
  validTo: string;
  regions: string[];
}

export interface ProductAvailability {
  regions: RegionAvailability[];
  franchiseTypes: string[];
  seasonality?: SeasonalAvailability;
  minimumOrderQuantity: number;
  maximumOrderQuantity?: number;
  leadTime: number; // in days
  stockStatus: "in_stock" | "low_stock" | "out_of_stock" | "discontinued";
}

export interface RegionAvailability {
  regionId: string;
  regionName: string;
  isAvailable: boolean;
  restrictions?: string[];
  localPrice?: number;
  localCurrency?: string;
}

export interface SeasonalAvailability {
  availableMonths: number[];
  peakMonths: number[];
  restrictions: string[];
}

export interface ProductImage {
  id: string;
  url: string;
  type: "product" | "packaging" | "lifestyle" | "specification";
  altText: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface ProductDocument {
  id: string;
  name: string;
  type: "datasheet" | "compliance" | "marketing" | "manual";
  url: string;
  fileSize: number;
  uploadedAt: string;
}

export interface ComplianceInfo {
  certifications: Certification[];
  licenses: License[];
  allergenInfo: string[];
  warnings: string[];
  ageRestrictions?: number;
  regulatoryApprovals: RegulatoryApproval[];
}

export interface Certification {
  id: string;
  name: string;
  issuingBody: string;
  certificationNumber: string;
  validFrom: string;
  validTo: string;
  documentUrl?: string;
}

export interface License {
  id: string;
  type: string;
  licenseNumber: string;
  issuingAuthority: string;
  validFrom: string;
  validTo: string;
  regions: string[];
}

export interface RegulatoryApproval {
  id: string;
  authority: string;
  approvalNumber: string;
  approvalDate: string;
  validUntil?: string;
  regions: string[];
}

export interface CategoryMarginSettings {
  defaultMargin: number;
  minMargin: number;
  maxMargin: number;
  recommendedMargin: number;
  volumeBasedMargins: {
    threshold: number;
    margin: number;
  }[];
}

// Franchisee Catalog Sync Types
export interface FranchiseeCatalogSync {
  id: string;
  franchiseeId: string;
  franchiseeCode: string;
  lastSyncAt: string;
  syncStatus: "pending" | "in_progress" | "completed" | "failed";
  syncType: "full" | "incremental" | "category" | "product";
  syncTrigger:
    | "manual"
    | "scheduled"
    | "corporate_update"
    | "franchisee_request";
  productsAdded: number;
  productsUpdated: number;
  productsRemoved: number;
  categoriesProcessed: string[];
  errors: SyncError[];
  syncSettings: FranchiseeCatalogSettings;
}

export interface FranchiseeCatalogSettings {
  autoSync: boolean;
  syncFrequency: "real_time" | "hourly" | "daily" | "weekly";
  includedCategories: string[];
  excludedProducts: string[];
  priceOverrides: FranchiseePriceOverride[];
  regionalFilters: string[];
  accessLevel: "basic" | "premium" | "exclusive";
  customizations: CatalogCustomization[];
}

export interface FranchiseePriceOverride {
  productId: string;
  overrideType: "fixed_price" | "margin_adjustment" | "discount";
  value: number;
  reason: string;
  approvedBy: string;
  validFrom: string;
  validTo?: string;
}

export interface CatalogCustomization {
  type: "product_name" | "description" | "image" | "category_display";
  productId?: string;
  categoryId?: string;
  customValue: string;
  originalValue: string;
  approvalRequired: boolean;
  approvedBy?: string;
}

export interface SyncError {
  productId: string;
  errorType: "validation" | "pricing" | "availability" | "permission";
  message: string;
  details?: string;
  timestamp: string;
}

// Catalog Management Dashboard Types
export interface CatalogDashboard {
  totalProducts: number;
  activeProducts: number;
  categories: number;
  franchiseesSynced: number;
  lastGlobalSync: string;
  pendingSyncs: number;
  syncErrors: number;
  recentActivity: CatalogActivity[];
  topCategories: CategoryStats[];
  syncMetrics: SyncMetrics;
}

export interface CatalogActivity {
  id: string;
  type:
    | "product_added"
    | "product_updated"
    | "sync_completed"
    | "error_occurred";
  description: string;
  timestamp: string;
  performedBy: string;
  affectedItems: number;
  franchiseeId?: string;
}

export interface CategoryStats {
  categoryId: string;
  categoryName: string;
  productCount: number;
  franchiseeAdoption: number;
  averageMargin: number;
  revenue: number;
}

export interface SyncMetrics {
  successRate: number;
  averageSyncTime: number;
  totalSyncsToday: number;
  errorRate: number;
  performanceByRegion: RegionSyncMetrics[];
}

export interface RegionSyncMetrics {
  regionName: string;
  franchiseeCount: number;
  syncSuccessRate: number;
  averageSyncTime: number;
  lastSyncTime: string;
}

// Form Types
export interface CreateProductForm {
  name: string;
  description: string;
  categoryId: string;
  subcategory: string;
  productType: "beverage" | "retail" | "merchandise" | "pos_item";
  beverageType?: "bottle" | "crate" | "keg" | "can" | "pouch";
  specifications: Partial<ProductSpecification>;
  basePrice: number;
  taxCategory: string;
  regions: string[];
  franchiseTypes: string[];
  minimumOrderQuantity: number;
  leadTime: number;
  images: File[];
  documents: File[];
}

export interface CatalogSyncRequest {
  franchiseeIds: string[];
  syncType: "full" | "incremental" | "category" | "product";
  includeCategories?: string[];
  includeProducts?: string[];
  scheduledAt?: string;
  priority: "low" | "normal" | "high";
  notifyOnCompletion: boolean;
}

export interface BulkProductUpdate {
  productIds: string[];
  updateType: "price" | "availability" | "category" | "specifications";
  updates: {
    [key: string]: any;
  };
  applyToFranchisees: boolean;
  franchiseeIds?: string[];
  effectiveDate?: string;
}
