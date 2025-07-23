// Corporate Purchase Order Review & Fulfillment Types

import {
  PurchaseOrder,
  PurchaseOrderItem,
  POStatus,
} from "./purchase-order-types";

export interface CorporatePOReview {
  id: string;
  poId: string;
  purchaseOrder: PurchaseOrder;
  reviewStatus: POReviewStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  fulfillmentPlan: FulfillmentPlan;
  deliveryFeasibility: DeliveryFeasibility;
  warehouseAssignment: WarehouseAssignment;
  modifications: POModification[];
  challanInfo?: DeliveryChallan;
  reviewComments?: string;
  internalNotes?: string;
  corporateDecision: CorporateDecision;

  // Workflow tracking
  workflowSteps: ReviewWorkflowStep[];
  currentStep: number;

  // Business metrics
  profitability: ProfitabilityAnalysis;
  riskAssessment: RiskAssessment;

  // Metadata
  createdAt: string;
  lastUpdated: string;
  processedBy?: string;
  completedAt?: string;
}

export type POReviewStatus =
  | "pending_review"
  | "under_evaluation"
  | "feasibility_check"
  | "warehouse_assignment"
  | "quantity_modification"
  | "approved_for_fulfillment"
  | "rejected"
  | "on_hold"
  | "fulfillment_in_progress"
  | "challan_generated"
  | "dispatched"
  | "completed";

export interface FulfillmentPlan {
  canFulfill: boolean;
  fulfillmentPercentage: number;
  estimatedProcessingTime: number; // in hours
  priorityLevel: "low" | "medium" | "high" | "urgent";
  resourceRequirements: ResourceRequirement[];
  constraints: FulfillmentConstraint[];
  alternatives?: AlternativeFulfillment[];
}

export interface ResourceRequirement {
  type: "warehouse_space" | "vehicle" | "personnel" | "equipment";
  description: string;
  quantity: number;
  availability: boolean;
  allocationTime: string;
}

export interface FulfillmentConstraint {
  type: "inventory" | "capacity" | "logistics" | "seasonal" | "regulatory";
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  impact: string;
  suggestedResolution: string;
}

export interface AlternativeFulfillment {
  option: string;
  description: string;
  estimatedTime: number;
  additionalCost: number;
  feasibilityScore: number;
}

export interface DeliveryFeasibility {
  isDeliverable: boolean;
  feasibilityScore: number; // 0-100
  estimatedDeliveryDate: string;
  deliveryMethod: DeliveryMethod;
  logisticsConstraints: LogisticsConstraint[];
  routeOptimization: RouteOptimization;
  deliveryCost: DeliveryCost;
}

export interface DeliveryMethod {
  type: "standard" | "express" | "same_day" | "scheduled" | "bulk";
  vehicleType: "bike" | "van" | "truck" | "container";
  carrierId: string;
  carrierName: string;
  estimatedDuration: number; // in hours
  trackingEnabled: boolean;
}

export interface LogisticsConstraint {
  type:
    | "distance"
    | "weight"
    | "volume"
    | "route"
    | "time"
    | "special_handling";
  description: string;
  impact: "low" | "medium" | "high";
  resolution?: string;
}

export interface RouteOptimization {
  optimalRoute: RoutePoint[];
  distance: number; // in km
  estimatedTime: number; // in minutes
  fuelCost: number;
  alternativeRoutes: AlternativeRoute[];
}

export interface RoutePoint {
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  stopType: "pickup" | "transit" | "delivery" | "fuel" | "rest";
  estimatedArrival: string;
  notes?: string;
}

export interface AlternativeRoute {
  description: string;
  distance: number;
  estimatedTime: number;
  additionalCost: number;
  pros: string[];
  cons: string[];
}

export interface DeliveryCost {
  baseCost: number;
  fuelSurcharge: number;
  distanceCost: number;
  urgencyPremium: number;
  specialHandlingCost: number;
  totalCost: number;
  currency: string;
}

export interface WarehouseAssignment {
  assignedWarehouseId: string;
  warehouseName: string;
  warehouseLocation: WarehouseLocation;
  availabilityStatus: "available" | "limited" | "unavailable";
  inventoryStatus: InventoryAvailability[];
  operationalCapacity: OperationalCapacity;
  assignmentReason: string;
  alternativeWarehouses: AlternativeWarehouse[];
}

export interface WarehouseLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  distanceFromDestination: number; // in km
}

export interface InventoryAvailability {
  productId: string;
  productName: string;
  requestedQuantity: number;
  availableQuantity: number;
  reservedQuantity: number;
  shortfall: number;
  alternativeProducts: AlternativeProduct[];
  replenishmentDate?: string;
}

export interface AlternativeProduct {
  productId: string;
  productName: string;
  similarity: number; // 0-100
  priceDifference: number;
  availableQuantity: number;
  substitutionReason: string;
}

export interface OperationalCapacity {
  currentLoad: number; // percentage
  maxCapacity: number;
  availableSlots: number;
  peakHours: string[];
  staffAvailability: StaffAvailability;
  equipmentStatus: EquipmentStatus[];
}

export interface StaffAvailability {
  totalStaff: number;
  availableStaff: number;
  shiftPattern: string;
  specializedStaff: SpecializedStaff[];
}

export interface SpecializedStaff {
  role: string;
  count: number;
  availability: "available" | "busy" | "unavailable";
  nextAvailable: string;
}

export interface EquipmentStatus {
  equipment: string;
  status: "operational" | "maintenance" | "unavailable";
  capacity: number;
  nextAvailable?: string;
}

export interface AlternativeWarehouse {
  warehouseId: string;
  warehouseName: string;
  distance: number;
  availabilityScore: number;
  additionalTime: number;
  additionalCost: number;
  reason: string;
}

export interface POModification {
  itemId: string;
  field: "quantity" | "product" | "delivery_date" | "specifications";
  originalValue: any;
  modifiedValue: any;
  reason: string;
  impact: ModificationImpact;
  approvalRequired: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export interface ModificationImpact {
  costImpact: number;
  timeImpact: number; // in hours
  customerSatisfaction: "positive" | "neutral" | "negative";
  description: string;
}

export interface DeliveryChallan {
  challanNumber: string;
  generatedAt: string;
  generatedBy: string;
  items: ChallanItem[];
  totalQuantity: number;
  totalWeight: number;
  totalVolume: number;
  packingDetails: PackingDetail[];
  qualityChecks: QualityCheck[];
  transportDetails: TransportDetails;
  specialInstructions: string[];
  documentPath?: string;
}

export interface ChallanItem {
  itemId: string;
  productName: string;
  sku: string;
  orderedQuantity: number;
  dispatchedQuantity: number;
  batchNumber?: string;
  expiryDate?: string;
  qualityGrade?: string;
  packingType: string;
  weight: number;
  dimensions: ItemDimensions;
}

export interface ItemDimensions {
  length: number;
  width: number;
  height: number;
  unit: "cm" | "m" | "inch";
}

export interface PackingDetail {
  packageId: string;
  packageType: "box" | "crate" | "pallet" | "container";
  items: string[]; // item IDs
  weight: number;
  dimensions: ItemDimensions;
  fragile: boolean;
  specialHandling?: string[];
}

export interface QualityCheck {
  checkType: "visual" | "weight" | "temperature" | "expiry" | "batch";
  result: "pass" | "fail" | "warning";
  checkedBy: string;
  checkedAt: string;
  notes?: string;
  images?: string[];
}

export interface TransportDetails {
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  estimatedDeparture: string;
  estimatedArrival: string;
  routePlan: RoutePoint[];
  trackingEnabled: boolean;
  insuranceCoverage?: InsuranceCoverage;
}

export interface InsuranceCoverage {
  policyNumber: string;
  coverage: number;
  provider: string;
  validUntil: string;
}

export interface CorporateDecision {
  decision: "approve" | "reject" | "modify" | "hold";
  decisionMaker: string;
  decisionDate: string;
  reasoning: string;
  conditions?: DecisionCondition[];
  financialImpact: FinancialImpact;
  strategicAlignment: StrategicAlignment;
}

export interface DecisionCondition {
  condition: string;
  deadline?: string;
  responsible: string;
  priority: "low" | "medium" | "high";
}

export interface FinancialImpact {
  revenue: number;
  cost: number;
  margin: number;
  profitability: number;
  paymentTerms: string;
  riskAdjustment: number;
}

export interface StrategicAlignment {
  customerTier: "platinum" | "gold" | "silver" | "bronze";
  relationshipValue: "high" | "medium" | "low";
  marketImportance: "strategic" | "important" | "standard";
  futureOpportunity: number; // 0-100 score
}

export interface ReviewWorkflowStep {
  stepNumber: number;
  stepName: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "skipped";
  assignedTo?: string;
  startedAt?: string;
  completedAt?: string;
  duration?: number; // in minutes
  artifacts?: WorkflowArtifact[];
}

export interface WorkflowArtifact {
  type: "document" | "analysis" | "approval" | "communication";
  name: string;
  path?: string;
  createdBy: string;
  createdAt: string;
}

export interface ProfitabilityAnalysis {
  grossMargin: number;
  netMargin: number;
  contributionMargin: number;
  breakEvenPoint: number;
  roiProjection: number;
  competitiveAnalysis: CompetitiveAnalysis;
  recommendations: ProfitabilityRecommendation[];
}

export interface CompetitiveAnalysis {
  marketPosition: "leader" | "challenger" | "follower" | "niche";
  pricingAdvantage: number; // percentage
  valueProposition: string[];
  threats: string[];
  opportunities: string[];
}

export interface ProfitabilityRecommendation {
  type: "pricing" | "bundling" | "terms" | "volume" | "timing";
  recommendation: string;
  expectedImpact: number;
  implementationEffort: "low" | "medium" | "high";
  timeline: string;
}

export interface RiskAssessment {
  overallRisk: "low" | "medium" | "high" | "critical";
  riskFactors: RiskFactor[];
  mitigation: RiskMitigation[];
  contingencyPlans: ContingencyPlan[];
  monitoringPlan: MonitoringPlan;
}

export interface RiskFactor {
  category: "financial" | "operational" | "regulatory" | "market" | "customer";
  description: string;
  probability: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
  riskScore: number; // 0-100
  trend: "increasing" | "stable" | "decreasing";
}

export interface RiskMitigation {
  riskId: string;
  strategy: string;
  cost: number;
  effectiveness: number; // 0-100
  timeline: string;
  responsible: string;
}

export interface ContingencyPlan {
  scenario: string;
  triggerConditions: string[];
  actions: string[];
  resources: string[];
  timeline: string;
  responsible: string;
}

export interface MonitoringPlan {
  kpis: MonitoringKPI[];
  reviewFrequency: string;
  escalationThresholds: EscalationThreshold[];
  reportingSchedule: string;
}

export interface MonitoringKPI {
  name: string;
  metric: string;
  target: number;
  current?: number;
  trend: "improving" | "stable" | "declining";
}

export interface EscalationThreshold {
  metric: string;
  threshold: number;
  escalationLevel: "management" | "executive" | "board";
  responseTime: string;
}

// Dashboard & Analytics Types
export interface CorporatePOAnalytics {
  totalPendingReviews: number;
  totalApprovedOrders: number;
  totalRejectedOrders: number;
  totalValue: number;
  approvalRate: number;
  averageReviewTime: number;
  fulfillmentRate: number;
  warehouseUtilization: WarehouseUtilization[];
  reviewMetrics: ReviewMetrics;
  performanceTrends: PerformanceTrend[];
  topFranchisees: TopFranchisee[];
}

export interface WarehouseUtilization {
  warehouseId: string;
  warehouseName: string;
  currentUtilization: number;
  maxCapacity: number;
  pendingOrders: number;
  efficiency: number;
  location: string;
}

export interface ReviewMetrics {
  averageReviewTime: number;
  fastestReview: number;
  slowestReview: number;
  reviewBacklog: number;
  reviewerWorkload: ReviewerWorkload[];
}

export interface ReviewerWorkload {
  reviewerId: string;
  reviewerName: string;
  pendingReviews: number;
  completedToday: number;
  averageReviewTime: number;
  workloadRating: "light" | "moderate" | "heavy" | "overloaded";
}

export interface PerformanceTrend {
  metric: string;
  currentValue: number;
  previousValue: number;
  change: number;
  trend: "up" | "down" | "stable";
  period: string;
}

export interface TopFranchisee {
  franchiseeId: string;
  franchiseeName: string;
  totalOrders: number;
  totalValue: number;
  approvalRate: number;
  onTimeDeliveryRate: number;
  rating: "excellent" | "good" | "average" | "poor";
}

// Form & UI Types
export interface POReviewFormData {
  reviewStatus: POReviewStatus;
  corporateDecision: CorporateDecision["decision"];
  reviewComments: string;
  internalNotes: string;
  modifications: POModification[];
  warehouseAssignment: string;
  priorityLevel: FulfillmentPlan["priorityLevel"];
  estimatedProcessingTime: number;
  specialInstructions: string[];
}

export interface ReviewFilters {
  status?: POReviewStatus[];
  priority?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  warehouseId?: string[];
  franchiseeId?: string[];
  valueRange?: {
    min: number;
    max: number;
  };
  searchTerm?: string;
}

// Configuration Types
export interface CorporateReviewConfiguration {
  autoAssignmentRules: AutoAssignmentRule[];
  approvalThresholds: ReviewApprovalThreshold[];
  warehousePriorities: WarehousePriority[];
  escalationRules: ReviewEscalationRule[];
  notificationSettings: ReviewNotificationSetting[];
}

export interface AutoAssignmentRule {
  id: string;
  name: string;
  conditions: AssignmentCondition[];
  assignTo: string;
  priority: number;
  isActive: boolean;
}

export interface AssignmentCondition {
  field: string;
  operator: string;
  value: any;
  weight: number;
}

export interface ReviewApprovalThreshold {
  orderValue: number;
  requiredApprovers: number;
  timeLimit: number; // in hours
  escalationLevel: "supervisor" | "manager" | "director" | "executive";
}

export interface WarehousePriority {
  warehouseId: string;
  priority: number;
  region: string;
  specializations: string[];
  maxOrderValue: number;
}

export interface ReviewEscalationRule {
  condition:
    | "time_exceeded"
    | "high_value"
    | "special_handling"
    | "repeated_rejection";
  threshold: number;
  escalateTo: string;
  notificationMethod: "email" | "sms" | "call" | "in_app";
  urgency: "low" | "medium" | "high" | "critical";
}

export interface ReviewNotificationSetting {
  event: string;
  enabled: boolean;
  recipients: string[];
  template: string;
  delay: number; // in minutes
  channels: ("email" | "sms" | "in_app")[];
}
