// Franchisee Master Setup Types - Post Approval

export interface FranchiseeSetup {
  id: string;
  requestId: string;
  franchiseeId: string;
  tenantId: string;
  setupStatus: "pending" | "in_progress" | "completed" | "failed";
  franchiseeCode: string;
  franchiseType: FranchiseType;
  businessConfig: BusinessConfiguration;
  productCatalog: FranchiseeProductCatalog;
  pricingConfig: PricingConfiguration;
  operationalSetup: OperationalSetup;
  integrationSetup: IntegrationSetup;
  setupSteps: SetupStep[];
  createdAt: string;
  completedAt?: string;
  createdBy: string;
}

export interface FranchiseType {
  id: string;
  name: string;
  type: "distribution" | "retail" | "warehouse" | "hybrid";
  description: string;
  capabilities: FranchiseCapability[];
  requirements: FranchiseRequirement[];
  defaultMargins: MarginConfiguration;
  allowedRegions: string[];
  minInvestment: number;
  maxInvestment: number;
}

export interface FranchiseCapability {
  id: string;
  name: string;
  category: "sales" | "distribution" | "storage" | "delivery" | "service";
  description: string;
  isRequired: boolean;
  dependencies?: string[];
}

export interface FranchiseRequirement {
  id: string;
  name: string;
  type: "infrastructure" | "financial" | "operational" | "legal";
  description: string;
  isActive: boolean;
  validationRules?: ValidationRule[];
}

export interface ValidationRule {
  field: string;
  operator: "min" | "max" | "equals" | "contains" | "regex";
  value: string | number;
  errorMessage: string;
}

export interface BusinessConfiguration {
  businessName: string;
  businessType: "distribution" | "retail" | "warehouse" | "hybrid";
  operatingModel: "b2b" | "b2c" | "b2b2c";
  serviceAreas: ServiceArea[];
  operatingHours: OperatingHours;
  paymentMethods: PaymentMethod[];
  deliveryOptions: DeliveryOption[];
}

export interface ServiceArea {
  id: string;
  name: string;
  type: "city" | "district" | "state" | "pincode_range";
  coverage: string[];
  isActive: boolean;
  deliveryCharges?: DeliveryCharge[];
}

export interface DeliveryCharge {
  distanceFrom: number;
  distanceTo: number;
  charge: number;
  freeDeliveryThreshold?: number;
}

export interface OperatingHours {
  [day: string]: {
    isOpen: boolean;
    openTime: string;
    closeTime: string;
    breaks?: BreakTime[];
  };
}

export interface BreakTime {
  startTime: string;
  endTime: string;
  description: string;
}

export interface PaymentMethod {
  id: string;
  type: "cash" | "card" | "upi" | "wallet" | "credit";
  provider?: string;
  isActive: boolean;
  charges?: number;
  processingTime: string;
}

export interface DeliveryOption {
  id: string;
  name: string;
  type: "same_day" | "next_day" | "express" | "standard";
  deliveryTime: string;
  charges: number;
  isActive: boolean;
  applicableAreas: string[];
}

export interface FranchiseeProductCatalog {
  id: string;
  franchiseeId: string;
  catalogType: "full" | "selective" | "regional" | "custom";
  categories: ProductCategoryConfig[];
  products: FranchiseeProduct[];
  restrictions: CatalogRestriction[];
  lastUpdated: string;
  syncStatus: "synced" | "pending" | "failed";
}

export interface ProductCategoryConfig {
  categoryId: string;
  categoryName: string;
  isActive: boolean;
  isExclusive: boolean;
  minMargin: number;
  maxMargin: number;
  allowCustomPricing: boolean;
  restrictions?: string[];
}

export interface FranchiseeProduct {
  id: string;
  corporateProductId: string;
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  corporatePrice: number;
  franchiseePrice: number;
  margin: number;
  marginType: "percentage" | "fixed";
  isActive: boolean;
  minStock: number;
  maxStock: number;
  autoReorder: boolean;
  restrictions?: ProductRestriction[];
  customFields?: CustomField[];
}

export interface ProductRestriction {
  type: "region" | "season" | "volume" | "customer_type";
  condition: string;
  value: string | number;
  action: "allow" | "deny" | "require_approval";
}

export interface CustomField {
  name: string;
  value: string | number | boolean;
  type: "text" | "number" | "boolean" | "date";
}

export interface CatalogRestriction {
  id: string;
  type: "regional" | "seasonal" | "volume_based" | "customer_type";
  description: string;
  conditions: RestrictionCondition[];
  actions: RestrictionAction[];
  isActive: boolean;
}

export interface RestrictionCondition {
  field: string;
  operator: string;
  value: string | number;
}

export interface RestrictionAction {
  type: "hide_product" | "modify_price" | "require_approval" | "show_warning";
  parameters: Record<string, any>;
}

export interface PricingConfiguration {
  id: string;
  franchiseeId: string;
  pricingModel: "cost_plus" | "market_based" | "value_based" | "hybrid";
  marginConfig: MarginConfiguration;
  priceSlabs: PriceSlab[];
  discountRules: DiscountRule[];
  specialPricing: SpecialPricing[];
  autoUpdate: boolean;
  approvalRequired: boolean;
}

export interface MarginConfiguration {
  defaultMargin: number;
  marginType: "percentage" | "fixed";
  categoryMargins: CategoryMargin[];
  volumeDiscounts: VolumeDiscount[];
  tieredPricing: TieredPricing[];
}

export interface CategoryMargin {
  categoryId: string;
  categoryName: string;
  margin: number;
  marginType: "percentage" | "fixed";
  minMargin: number;
  maxMargin: number;
  isNegotiable: boolean;
}

export interface PriceSlab {
  id: string;
  name: string;
  minQuantity: number;
  maxQuantity: number;
  discount: number;
  discountType: "percentage" | "fixed";
  applicableProducts: string[];
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

export interface VolumeDiscount {
  id: string;
  name: string;
  minVolume: number;
  maxVolume: number;
  discount: number;
  discountType: "percentage" | "fixed";
  calculationPeriod: "daily" | "weekly" | "monthly" | "quarterly";
  applicableCategories: string[];
}

export interface TieredPricing {
  id: string;
  name: string;
  tiers: PricingTier[];
  basedOn: "volume" | "value" | "frequency";
  period: "order" | "monthly" | "quarterly" | "yearly";
}

export interface PricingTier {
  tierName: string;
  minThreshold: number;
  maxThreshold: number;
  margin: number;
  benefits: string[];
}

export interface SpecialPricing {
  id: string;
  name: string;
  type: "promotional" | "seasonal" | "launch" | "clearance";
  products: string[];
  priceOverride?: number;
  discountPercentage?: number;
  conditions: PricingCondition[];
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

export interface PricingCondition {
  field: string;
  operator: string;
  value: string | number;
}

export interface DiscountRule {
  id: string;
  name: string;
  type: "quantity" | "value" | "combo" | "loyalty" | "seasonal";
  conditions: DiscountCondition[];
  benefits: DiscountBenefit[];
  limitations: DiscountLimitation[];
  isActive: boolean;
  validFrom: string;
  validTo: string;
}

export interface DiscountCondition {
  field: string;
  operator: string;
  value: string | number;
}

export interface DiscountBenefit {
  type: "percentage" | "fixed" | "free_product" | "free_shipping";
  value: number;
  applicableTo: string[];
}

export interface DiscountLimitation {
  type: "usage_limit" | "customer_limit" | "time_limit" | "region_limit";
  value: string | number;
}

export interface OperationalSetup {
  id: string;
  franchiseeId: string;
  inventoryConfig: InventoryConfiguration;
  orderConfig: OrderConfiguration;
  customerConfig: CustomerConfiguration;
  reportingConfig: ReportingConfiguration;
  notificationConfig: NotificationConfiguration;
}

export interface InventoryConfiguration {
  trackingMethod: "fifo" | "lifo" | "average";
  autoReorderEnabled: boolean;
  reorderRules: ReorderRule[];
  stockAlerts: StockAlert[];
  expiryManagement: ExpiryManagement;
  batchTracking: boolean;
  serialTracking: boolean;
}

export interface ReorderRule {
  productId: string;
  reorderLevel: number;
  reorderQuantity: number;
  leadTime: number;
  supplierId: string;
  isActive: boolean;
}

export interface StockAlert {
  type: "low_stock" | "overstock" | "expiry" | "dead_stock";
  threshold: number;
  recipients: string[];
  channels: string[];
}

export interface ExpiryManagement {
  enabled: boolean;
  alertDays: number[];
  autoRotation: boolean;
  discountRules: ExpiryDiscountRule[];
}

export interface ExpiryDiscountRule {
  daysToExpiry: number;
  discountPercentage: number;
  isActive: boolean;
}

export interface OrderConfiguration {
  orderNumberFormat: string;
  autoApproval: boolean;
  approvalRules: OrderApprovalRule[];
  invoiceGeneration: "auto" | "manual";
  paymentTerms: PaymentTerm[];
  deliveryTracking: boolean;
}

export interface OrderApprovalRule {
  condition: string;
  threshold: number;
  approver: string;
  isActive: boolean;
}

export interface PaymentTerm {
  id: string;
  name: string;
  days: number;
  discountPercentage?: number;
  penaltyPercentage?: number;
  isDefault: boolean;
}

export interface CustomerConfiguration {
  customerTypes: CustomerType[];
  loyaltyProgram: LoyaltyProgram;
  creditManagement: CreditManagement;
  communicationSettings: CommunicationSettings;
}

export interface CustomerType {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  restrictions: string[];
  pricingTier: string;
}

export interface LoyaltyProgram {
  enabled: boolean;
  pointsPerRupee: number;
  redemptionRate: number;
  tiers: LoyaltyTier[];
  benefits: LoyaltyBenefit[];
}

export interface LoyaltyTier {
  name: string;
  minPoints: number;
  benefits: string[];
  multiplier: number;
}

export interface LoyaltyBenefit {
  type: "discount" | "free_product" | "priority_service";
  value: number;
  conditions: string[];
}

export interface CreditManagement {
  enabled: boolean;
  defaultCreditLimit: number;
  creditTerms: number;
  interestRate: number;
  overdueCharges: number;
  collectionRules: CollectionRule[];
}

export interface CollectionRule {
  daysOverdue: number;
  action: "reminder" | "warning" | "suspend" | "legal";
  isActive: boolean;
}

export interface CommunicationSettings {
  channels: CommunicationChannel[];
  templates: CommunicationTemplate[];
  automationRules: CommunicationRule[];
}

export interface CommunicationChannel {
  type: "email" | "sms" | "whatsapp" | "push";
  isActive: boolean;
  provider?: string;
  credentials?: Record<string, string>;
}

export interface CommunicationTemplate {
  id: string;
  name: string;
  type: string;
  channel: string;
  template: string;
  variables: string[];
}

export interface CommunicationRule {
  trigger: string;
  conditions: string[];
  actions: string[];
  isActive: boolean;
}

export interface ReportingConfiguration {
  dashboards: DashboardConfig[];
  reports: ReportConfig[];
  kpis: KPIConfig[];
  automatedReports: AutomatedReport[];
}

export interface DashboardConfig {
  id: string;
  name: string;
  widgets: DashboardWidget[];
  layout: string;
  refreshInterval: number;
  isDefault: boolean;
}

export interface DashboardWidget {
  id: string;
  type: string;
  title: string;
  dataSource: string;
  config: Record<string, any>;
  position: WidgetPosition;
}

export interface WidgetPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ReportConfig {
  id: string;
  name: string;
  type: string;
  dataSource: string;
  filters: ReportFilter[];
  format: "pdf" | "excel" | "csv";
  scheduling: ReportScheduling;
}

export interface ReportFilter {
  field: string;
  operator: string;
  value: string | number;
  isRequired: boolean;
}

export interface ReportScheduling {
  enabled: boolean;
  frequency: "daily" | "weekly" | "monthly";
  time: string;
  recipients: string[];
}

export interface KPIConfig {
  id: string;
  name: string;
  calculation: string;
  target: number;
  unit: string;
  trend: "up" | "down" | "stable";
}

export interface AutomatedReport {
  id: string;
  name: string;
  reportId: string;
  schedule: string;
  recipients: string[];
  isActive: boolean;
}

export interface NotificationConfiguration {
  channels: NotificationChannel[];
  rules: NotificationRule[];
  templates: NotificationTemplate[];
  preferences: NotificationPreference[];
}

export interface NotificationChannel {
  type: "email" | "sms" | "push" | "in_app";
  isActive: boolean;
  provider?: string;
  config?: Record<string, any>;
}

export interface NotificationRule {
  id: string;
  trigger: string;
  conditions: string[];
  recipients: string[];
  channels: string[];
  template: string;
  isActive: boolean;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: string;
  subject?: string;
  body: string;
  variables: string[];
}

export interface NotificationPreference {
  userId: string;
  channels: string[];
  frequency: "immediate" | "hourly" | "daily";
  categories: string[];
}

export interface IntegrationSetup {
  id: string;
  franchiseeId: string;
  posIntegration: POSIntegration;
  accountingIntegration: AccountingIntegration;
  ecommerceIntegration: EcommerceIntegration;
  logisticsIntegration: LogisticsIntegration;
  paymentIntegration: PaymentIntegration;
  analyticsIntegration: AnalyticsIntegration;
}

export interface POSIntegration {
  enabled: boolean;
  provider: string;
  credentials: Record<string, string>;
  syncFrequency: "real_time" | "hourly" | "daily";
  syncEntities: string[];
  lastSync?: string;
  status: "connected" | "disconnected" | "error";
}

export interface AccountingIntegration {
  enabled: boolean;
  provider: string;
  credentials: Record<string, string>;
  chartOfAccounts: AccountMapping[];
  taxMapping: TaxMapping[];
  syncFrequency: string;
  status: string;
}

export interface AccountMapping {
  localAccount: string;
  externalAccount: string;
  accountType: string;
}

export interface TaxMapping {
  localTax: string;
  externalTax: string;
  rate: number;
}

export interface EcommerceIntegration {
  enabled: boolean;
  platforms: EcommercePlatform[];
  syncSettings: EcommerceSyncSettings;
  status: string;
}

export interface EcommercePlatform {
  name: string;
  enabled: boolean;
  credentials: Record<string, string>;
  productSync: boolean;
  orderSync: boolean;
  inventorySync: boolean;
}

export interface EcommerceSyncSettings {
  frequency: string;
  entities: string[];
  conflictResolution: "master_wins" | "timestamp" | "manual";
}

export interface LogisticsIntegration {
  enabled: boolean;
  providers: LogisticsProvider[];
  defaultProvider: string;
  trackingEnabled: boolean;
  status: string;
}

export interface LogisticsProvider {
  name: string;
  enabled: boolean;
  credentials: Record<string, string>;
  services: string[];
  coverageAreas: string[];
}

export interface PaymentIntegration {
  enabled: boolean;
  gateways: PaymentGateway[];
  defaultGateway: string;
  reconciliationEnabled: boolean;
  status: string;
}

export interface PaymentGateway {
  name: string;
  enabled: boolean;
  credentials: Record<string, string>;
  supportedMethods: string[];
  charges: PaymentCharges;
}

export interface PaymentCharges {
  transactionFee: number;
  gatewayFee: number;
  settlementTime: string;
}

export interface AnalyticsIntegration {
  enabled: boolean;
  platforms: AnalyticsPlatform[];
  kpiTracking: boolean;
  customMetrics: CustomMetric[];
  status: string;
}

export interface AnalyticsPlatform {
  name: string;
  enabled: boolean;
  credentials: Record<string, string>;
  dataPoints: string[];
}

export interface CustomMetric {
  name: string;
  calculation: string;
  unit: string;
  target?: number;
}

export interface SetupStep {
  id: string;
  name: string;
  description: string;
  order: number;
  status: "pending" | "in_progress" | "completed" | "failed" | "skipped";
  dependencies: string[];
  estimatedTime: number; // in minutes
  actualTime?: number;
  startedAt?: string;
  completedAt?: string;
  error?: string;
  results?: Record<string, any>;
}

// Form Types for Setup Process
export interface FranchiseeSetupForm {
  basicInfo: BasicInfoForm;
  franchiseType: FranchiseTypeForm;
  businessConfig: BusinessConfigForm;
  pricingConfig: PricingConfigForm;
  productCatalog: ProductCatalogForm;
  operationalSetup: OperationalSetupForm;
  integrationSetup: IntegrationSetupForm;
}

export interface BasicInfoForm {
  franchiseeCode: string;
  businessName: string;
  businessType: string;
  operatingModel: string;
}

export interface FranchiseTypeForm {
  typeId: string;
  capabilities: string[];
  customizations: Record<string, any>;
}

export interface BusinessConfigForm {
  serviceAreas: ServiceArea[];
  operatingHours: OperatingHours;
  paymentMethods: string[];
  deliveryOptions: string[];
}

export interface PricingConfigForm {
  pricingModel: string;
  defaultMargin: number;
  marginType: string;
  categoryMargins: CategoryMargin[];
  priceSlabs: PriceSlab[];
}

export interface ProductCatalogForm {
  catalogType: string;
  selectedCategories: string[];
  customProducts: string[];
  restrictions: string[];
}

export interface OperationalSetupForm {
  inventoryTracking: string;
  autoReorder: boolean;
  orderApproval: boolean;
  customerManagement: boolean;
}

export interface IntegrationSetupForm {
  posIntegration: boolean;
  accountingIntegration: boolean;
  ecommerceIntegration: boolean;
  paymentIntegration: boolean;
}

// Dashboard and Analytics Types
export interface SetupDashboard {
  pendingSetups: number;
  inProgressSetups: number;
  completedSetups: number;
  failedSetups: number;
  averageSetupTime: number;
  recentSetups: FranchiseeSetup[];
  setupMetrics: SetupMetrics;
}

export interface SetupMetrics {
  successRate: number;
  averageTime: number;
  commonFailures: FailureMetric[];
  performanceByStep: StepMetric[];
}

export interface FailureMetric {
  reason: string;
  count: number;
  percentage: number;
}

export interface StepMetric {
  stepName: string;
  averageTime: number;
  successRate: number;
  commonIssues: string[];
}

// Setup Template Types
export interface SetupTemplate {
  id: string;
  name: string;
  description: string;
  franchiseType: FranchiseType;
  version: string;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  isActive: boolean;
  usageCount: number;
  estimatedSetupTime: number; // in minutes
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  businessConfig: Partial<BusinessConfiguration>;
  pricingConfig: Partial<PricingConfiguration>;
  operationalSetup: Partial<OperationalSetup>;
  integrationSetup: Partial<IntegrationSetup>;
  requiredSteps: string[];
  optionalSteps: string[];
  preRequisites: string[];
  postSetupTasks: string[];
}

export interface NewSetupForm {
  franchiseeRequestId: string;
  franchiseTypeId: string;
  templateId?: string;
  businessName: string;
  operatingModel: "b2b" | "b2c" | "b2b2c";
  region: string;
  investment: number;
  expectedGoLiveDate: string;
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo?: string;
  notes?: string;
  customConfigurations?: {
    skipSteps?: string[];
    customMargins?: CategoryMargin[];
    specialRequirements?: string[];
  };
}

export interface CreateTemplateForm {
  name: string;
  description: string;
  franchiseTypeId: string;
  basedOnSetupId?: string;
  category: "quick_start" | "standard" | "advanced" | "custom";
  tags: string[];
  isPublic: boolean;
  estimatedTime: number;
  difficulty: "easy" | "medium" | "hard";
  businessConfig: Partial<BusinessConfiguration>;
  pricingConfig: Partial<PricingConfiguration>;
  operationalConfig: Partial<OperationalSetup>;
  integrationConfig: Partial<IntegrationSetup>;
  requiredSteps: string[];
  optionalSteps: string[];
  preRequisites: string[];
  postSetupTasks: string[];
}
