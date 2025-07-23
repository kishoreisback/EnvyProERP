// Delivery & Logistics Integration Types

export interface DeliverySchedule {
  id: string;
  poId: string;
  challanId?: string;
  scheduleStatus: ScheduleStatus;
  scheduledDate: string;
  scheduledTimeSlot: TimeSlot;
  actualDeliveryDate?: string;

  // Delivery Details
  deliveryType: DeliveryType;
  priority: "low" | "medium" | "high" | "urgent";
  specialInstructions: string[];

  // Route & Logistics
  route: DeliveryRoute;
  vehicle: VehicleAssignment;
  driver: DriverAssignment;

  // Status Tracking
  currentStatus: DeliveryStatus;
  statusHistory: DeliveryStatusHistory[];
  trackingInfo: TrackingInfo;

  // Notifications
  notifications: NotificationEvent[];

  // Documents
  documents: DeliveryDocument[];

  // Metadata
  createdAt: string;
  createdBy: string;
  lastUpdated: string;
  completedAt?: string;
}

export type ScheduleStatus =
  | "pending_schedule"
  | "scheduled"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "rescheduled"
  | "cancelled";

export type DeliveryStatus =
  | "preparing"
  | "ready_for_pickup"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "attempting_delivery"
  | "delivered"
  | "partial_delivery"
  | "failed_delivery"
  | "returned"
  | "cancelled";

export type DeliveryType =
  | "standard"
  | "express"
  | "same_day"
  | "scheduled"
  | "priority"
  | "bulk";

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  isAvailable: boolean;
  isBlocked?: boolean;
  blockReason?: string;
  capacity: number;
  currentBookings: number;
}

export interface DeliveryRoute {
  id: string;
  routeName: string;
  startLocation: RouteLocation;
  endLocation: RouteLocation;
  waypoints: RouteLocation[];

  // Route Analytics
  totalDistance: number; // in km
  estimatedDuration: number; // in minutes
  actualDuration?: number;
  fuelCost: number;
  tollCost: number;

  // Route Optimization
  isOptimized: boolean;
  optimizationScore: number; // 0-100
  alternativeRoutes: AlternativeRoute[];

  // Traffic & Conditions
  trafficConditions: TrafficCondition[];
  roadConditions: RoadCondition[];
  weatherConditions?: WeatherCondition;
}

export interface RouteLocation {
  id: string;
  name: string;
  type:
    | "warehouse"
    | "store"
    | "distribution_center"
    | "waypoint"
    | "fuel_station"
    | "rest_area";
  address: LocationAddress;
  coordinates: Coordinates;

  // Timing
  estimatedArrival?: string;
  actualArrival?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  stopDuration?: number; // in minutes

  // Services
  availableServices: LocationService[];
  restrictions: LocationRestriction[];

  // Contact
  contactInfo?: ContactInfo;
  operatingHours?: OperatingHours;
}

export interface LocationAddress {
  street: string;
  area: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  landmark?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface LocationService {
  service:
    | "loading_dock"
    | "forklift"
    | "security"
    | "parking"
    | "fuel"
    | "maintenance";
  available: boolean;
  cost?: number;
  restrictions?: string[];
}

export interface LocationRestriction {
  type: "time" | "vehicle_size" | "weight" | "access" | "permit";
  description: string;
  severity: "info" | "warning" | "critical";
}

export interface ContactInfo {
  name: string;
  phone: string;
  email?: string;
  alternatePhone?: string;
  whatsapp?: string;
}

export interface OperatingHours {
  monday: TimeRange;
  tuesday: TimeRange;
  wednesday: TimeRange;
  thursday: TimeRange;
  friday: TimeRange;
  saturday: TimeRange;
  sunday: TimeRange;
  holidays?: string[];
}

export interface TimeRange {
  open: string;
  close: string;
  isOpen: boolean;
  breaks?: TimeBreak[];
}

export interface TimeBreak {
  start: string;
  end: string;
  reason: string;
}

export interface AlternativeRoute {
  id: string;
  description: string;
  totalDistance: number;
  estimatedDuration: number;
  additionalCost: number;
  advantages: string[];
  disadvantages: string[];
  recommendationScore: number; // 0-100
}

export interface TrafficCondition {
  location: string;
  severity: "light" | "moderate" | "heavy" | "blocked";
  description: string;
  estimatedDelay: number; // in minutes
  alternativeRoute?: string;
}

export interface RoadCondition {
  location: string;
  condition: "excellent" | "good" | "fair" | "poor" | "closed";
  description: string;
  impact: "none" | "low" | "medium" | "high" | "severe";
  recommendations: string[];
}

export interface WeatherCondition {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  visibility: number;
  conditions: string;
  impact: "none" | "low" | "medium" | "high" | "severe";
  recommendations: string[];
}

export interface VehicleAssignment {
  vehicleId: string;
  vehicleNumber: string;
  vehicleType: VehicleType;
  capacity: VehicleCapacity;
  currentLocation?: Coordinates;

  // Vehicle Status
  status: VehicleStatus;
  fuelLevel?: number;
  mileage?: number;

  // Maintenance
  lastMaintenance?: string;
  nextMaintenance?: string;
  healthStatus: "excellent" | "good" | "fair" | "poor" | "critical";

  // Insurance & Documentation
  insurance: InsuranceInfo;
  permits: VehiclePermit[];

  // Equipment
  equipment: VehicleEquipment[];
}

export type VehicleType =
  | "bike"
  | "auto_rickshaw"
  | "van"
  | "mini_truck"
  | "truck"
  | "container_truck"
  | "refrigerated_truck";

export interface VehicleCapacity {
  weight: number; // in kg
  volume: number; // in cubic meters
  pallets?: number;
  passengers?: number;
}

export type VehicleStatus =
  | "available"
  | "assigned"
  | "in_transit"
  | "loading"
  | "unloading"
  | "maintenance"
  | "breakdown"
  | "offline";

export interface InsuranceInfo {
  policyNumber: string;
  provider: string;
  coverage: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

export interface VehiclePermit {
  permitType: string;
  permitNumber: string;
  issuedBy: string;
  validFrom: string;
  validTo: string;
  restrictions?: string[];
}

export interface VehicleEquipment {
  equipment: string;
  status: "working" | "faulty" | "missing";
  lastChecked?: string;
  notes?: string;
}

export interface DriverAssignment {
  driverId: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  email?: string;

  // Driver Details
  licenseNumber: string;
  licenseType: string;
  licenseExpiry: string;
  experience: number; // in years

  // Status & Availability
  status: DriverStatus;
  currentLocation?: Coordinates;
  shift: ShiftInfo;

  // Performance
  rating: number; // 0-5
  completedDeliveries: number;
  onTimeDeliveryRate: number;
  customerRating: number;

  // Emergency Contact
  emergencyContact: ContactInfo;

  // Training & Certifications
  certifications: DriverCertification[];
  trainingRecords: TrainingRecord[];
}

export type DriverStatus =
  | "available"
  | "assigned"
  | "on_delivery"
  | "on_break"
  | "off_duty"
  | "sick_leave"
  | "vacation";

export interface ShiftInfo {
  shiftType: "morning" | "afternoon" | "evening" | "night" | "flexible";
  startTime: string;
  endTime: string;
  breakTimes: TimeBreak[];
  overtimeAllowed: boolean;
  maxHours: number;
}

export interface DriverCertification {
  certification: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate: string;
  isValid: boolean;
}

export interface TrainingRecord {
  training: string;
  completedDate: string;
  score?: number;
  instructor: string;
  certificateNumber?: string;
}

export interface DeliveryStatusHistory {
  status: DeliveryStatus;
  timestamp: string;
  location?: Coordinates;
  locationName?: string;
  notes?: string;
  updatedBy: string;
  updateMethod: "manual" | "gps" | "scan" | "call" | "app";
  photosUrls?: string[];
  signature?: string;
}

export interface TrackingInfo {
  trackingNumber: string;
  trackingUrl?: string;
  lastKnownLocation?: Coordinates;
  lastKnownLocationName?: string;
  lastUpdated: string;

  // Real-time Data
  currentSpeed?: number;
  direction?: number;
  batteryLevel?: number;
  gpsSignalStrength?: number;

  // Milestones
  milestones: TrackingMilestone[];

  // Alerts
  alerts: TrackingAlert[];
}

export interface TrackingMilestone {
  milestone: string;
  expectedTime: string;
  actualTime?: string;
  status: "pending" | "reached" | "delayed" | "skipped";
  delay?: number; // in minutes
  reason?: string;
}

export interface TrackingAlert {
  alertType:
    | "delay"
    | "route_deviation"
    | "emergency"
    | "breakdown"
    | "accident";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  timestamp: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  actions?: AlertAction[];
}

export interface AlertAction {
  action: string;
  takenBy: string;
  takenAt: string;
  result?: string;
  notes?: string;
}

export interface NotificationEvent {
  id: string;
  type: NotificationType;
  recipient: NotificationRecipient;
  channel: NotificationChannel;
  message: string;
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;

  // Notification Data
  templateId?: string;
  variables?: Record<string, any>;

  // Response Tracking
  response?: NotificationResponse;

  // Retry Logic
  retryCount: number;
  maxRetries: number;
  nextRetry?: string;
}

export type NotificationType =
  | "schedule_confirmation"
  | "delivery_started"
  | "out_for_delivery"
  | "delivery_attempt"
  | "delivery_completed"
  | "delivery_failed"
  | "delay_notification"
  | "rescheduling_required"
  | "grn_required";

export interface NotificationRecipient {
  type: "franchisee" | "corporate" | "driver" | "customer";
  userId: string;
  name: string;
  email?: string;
  phone?: string;
  preferences: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  push: boolean;
  inApp: boolean;
  timeRestrictions?: TimeRange[];
}

export type NotificationChannel =
  | "email"
  | "sms"
  | "whatsapp"
  | "push"
  | "in_app"
  | "call";

export interface NotificationResponse {
  responded: boolean;
  responseTime?: string;
  responseMethod?: string;
  response?: string;
  sentiment?: "positive" | "neutral" | "negative";
}

export interface DeliveryDocument {
  id: string;
  type: DocumentType;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;

  // Document Details
  generatedAt: string;
  generatedBy: string;
  version: number;
  isLatest: boolean;

  // Digital Signature
  signed: boolean;
  signedBy?: string;
  signedAt?: string;
  signatureHash?: string;

  // Access Control
  visibility: "public" | "private" | "franchisee" | "corporate";
  downloadCount: number;
  lastAccessed?: string;
}

export type DocumentType =
  | "delivery_challan"
  | "invoice"
  | "receipt"
  | "grn"
  | "proof_of_delivery"
  | "damage_report"
  | "return_note"
  | "inspection_report";

// GRN (Goods Receipt Note) Types
export interface GRN {
  id: string;
  grnNumber: string;
  poId: string;
  challanId: string;
  deliveryScheduleId: string;

  // GRN Details
  receivedDate: string;
  receivedBy: string;
  receivedLocation: RouteLocation;

  // Items
  receivedItems: GRNItem[];

  // Status
  status: GRNStatus;
  statusHistory: GRNStatusHistory[];

  // Quality Check
  qualityInspection: QualityInspection;

  // Discrepancies
  discrepancies: Discrepancy[];

  // Approval
  approvalRequired: boolean;
  approvedBy?: string;
  approvedAt?: string;

  // Documents
  photos: string[];
  documents: GRNDocument[];

  // Financial
  financialImpact: GRNFinancialImpact;

  // Metadata
  createdAt: string;
  lastUpdated: string;
  completedAt?: string;
}

export type GRNStatus =
  | "pending"
  | "in_progress"
  | "quality_check"
  | "discrepancy_found"
  | "approved"
  | "rejected"
  | "completed";

export interface GRNItem {
  itemId: string;
  productId: string;
  productName: string;
  sku: string;

  // Quantities
  orderedQuantity: number;
  deliveredQuantity: number;
  receivedQuantity: number;
  acceptedQuantity: number;
  rejectedQuantity: number;

  // Quality
  condition: ItemCondition;
  qualityGrade: QualityGrade;
  defects: ItemDefect[];

  // Storage
  storageLocation?: string;
  batchNumber?: string;
  expiryDate?: string;
  manufacturingDate?: string;

  // Pricing
  unitPrice: number;
  totalValue: number;

  // Notes
  notes?: string;
  photos?: string[];
}

export type ItemCondition =
  | "excellent"
  | "good"
  | "acceptable"
  | "damaged"
  | "defective"
  | "expired";

export type QualityGrade = "A+" | "A" | "B+" | "B" | "C" | "F";

export interface ItemDefect {
  defectType: string;
  severity: "minor" | "major" | "critical";
  description: string;
  affectedQuantity: number;
  photos?: string[];
  action: "accept" | "reject" | "return" | "discount";
}

export interface GRNStatusHistory {
  status: GRNStatus;
  timestamp: string;
  changedBy: string;
  reason?: string;
  notes?: string;
}

export interface QualityInspection {
  inspectionId: string;
  inspectedBy: string;
  inspectionDate: string;
  inspectionMethod: "visual" | "sampling" | "full_check" | "random";

  // Results
  overallRating: QualityGrade;
  passed: boolean;

  // Checks
  checks: QualityCheck[];

  // Sampling
  sampleSize?: number;
  sampleCriteria?: string;

  // Certification
  certified: boolean;
  certifiedBy?: string;
  certificateNumber?: string;
}

export interface QualityCheck {
  checkType: string;
  parameter: string;
  expectedValue: string;
  actualValue: string;
  status: "pass" | "fail" | "warning" | "na";
  notes?: string;
  photos?: string[];
}

export interface Discrepancy {
  id: string;
  type: DiscrepancyType;
  description: string;
  severity: "low" | "medium" | "high" | "critical";

  // Details
  expectedValue: any;
  actualValue: any;
  variance: number;

  // Resolution
  status: DiscrepancyStatus;
  resolution?: DiscrepancyResolution;

  // Financial Impact
  financialImpact: number;

  // Approval
  requiresApproval: boolean;
  approvedBy?: string;
  approvedAt?: string;

  // Documentation
  evidencePhotos: string[];
  supportingDocuments: string[];

  // Metadata
  reportedBy: string;
  reportedAt: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

export type DiscrepancyType =
  | "quantity_shortage"
  | "quantity_excess"
  | "quality_issue"
  | "damage"
  | "wrong_item"
  | "missing_item"
  | "price_mismatch"
  | "documentation_error";

export type DiscrepancyStatus =
  | "reported"
  | "investigating"
  | "resolved"
  | "escalated"
  | "closed";

export interface DiscrepancyResolution {
  resolutionType:
    | "accept"
    | "reject"
    | "return"
    | "credit"
    | "debit"
    | "replacement";
  description: string;
  agreedValue?: number;
  compensationAmount?: number;
  timeline?: string;
  responsibleParty: "supplier" | "logistics" | "franchisee" | "corporate";
}

export interface GRNDocument {
  documentType: DocumentType;
  fileName: string;
  filePath: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface GRNFinancialImpact {
  totalOrderValue: number;
  receivedValue: number;
  acceptedValue: number;
  rejectedValue: number;
  discrepancyValue: number;
  adjustmentAmount: number;
  finalPayableAmount: number;

  // Breakdown
  itemWiseImpact: ItemFinancialImpact[];

  // Approvals
  requiresFinancialApproval: boolean;
  financiallyApprovedBy?: string;
  financiallyApprovedAt?: string;
}

export interface ItemFinancialImpact {
  itemId: string;
  orderedValue: number;
  receivedValue: number;
  acceptedValue: number;
  adjustmentAmount: number;
  finalValue: number;
  variance: number;
  variancePercentage: number;
}

// Calendar & Scheduling Types
export interface DeliveryCalendar {
  id: string;
  calendarName: string;
  calendarType: "warehouse" | "route" | "driver" | "vehicle" | "franchisee";
  resourceId: string;

  // Calendar Settings
  workingDays: string[];
  workingHours: TimeRange;
  timeSlotDuration: number; // in minutes
  advanceBookingLimit: number; // in days

  // Availability
  availableSlots: CalendarSlot[];
  blockedSlots: BlockedSlot[];

  // Recurring Events
  recurringEvents: RecurringEvent[];

  // Metadata
  createdAt: string;
  lastUpdated: string;
}

export interface CalendarSlot {
  slotId: string;
  date: string;
  timeSlot: TimeSlot;
  status: SlotStatus;
  bookingId?: string;
  capacity: number;
  booked: number;
  available: number;

  // Slot Details
  priority: "low" | "medium" | "high";
  restrictions?: string[];
  additionalCost?: number;

  // Weather & Conditions
  weatherForecast?: WeatherCondition;
  trafficPrediction?: TrafficCondition[];
}

export type SlotStatus =
  | "available"
  | "booked"
  | "blocked"
  | "maintenance"
  | "holiday"
  | "emergency";

export interface BlockedSlot {
  slotId: string;
  date: string;
  timeSlot: TimeSlot;
  reason: string;
  blockedBy: string;
  blockedAt: string;
  autoUnblock?: boolean;
  unblockAt?: string;
}

export interface RecurringEvent {
  eventId: string;
  eventName: string;
  eventType: "maintenance" | "holiday" | "training" | "meeting" | "shutdown";
  recurrencePattern: RecurrencePattern;
  duration: number; // in minutes
  impact: "block_all" | "reduce_capacity" | "increase_cost";

  // Date Range
  startDate: string;
  endDate?: string;

  // Exceptions
  exceptions: string[]; // dates to skip
  additionalDates: string[]; // extra dates to include
}

export interface RecurrencePattern {
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  interval: number; // every N frequency units
  daysOfWeek?: string[]; // for weekly
  dayOfMonth?: number; // for monthly
  weekOfMonth?: number; // for monthly
  monthOfYear?: number; // for yearly
}

// Analytics & Reporting Types
export interface DeliveryAnalytics {
  // Overview Metrics
  totalDeliveries: number;
  completedDeliveries: number;
  pendingDeliveries: number;
  failedDeliveries: number;

  // Performance Metrics
  onTimeDeliveryRate: number;
  averageDeliveryTime: number;
  firstAttemptSuccessRate: number;
  customerSatisfactionScore: number;

  // Operational Metrics
  fleetUtilization: number;
  driverEfficiency: number;
  fuelEfficiency: number;
  costPerDelivery: number;

  // Time Series Data
  dailyMetrics: DailyMetric[];
  weeklyTrends: WeeklyTrend[];
  monthlyComparison: MonthlyComparison[];

  // Route Analytics
  routePerformance: RoutePerformance[];

  // Resource Analytics
  vehiclePerformance: VehiclePerformance[];
  driverPerformance: DriverPerformance[];

  // Quality Metrics
  grnMetrics: GRNMetrics;
  discrepancyMetrics: DiscrepancyMetrics;
}

export interface DailyMetric {
  date: string;
  deliveries: number;
  onTimeRate: number;
  averageTime: number;
  cost: number;
  revenue: number;
  customerRating: number;
}

export interface WeeklyTrend {
  week: string;
  deliveryVolume: number;
  performanceScore: number;
  costEfficiency: number;
  growthRate: number;
}

export interface MonthlyComparison {
  month: string;
  currentYear: MonthlyData;
  previousYear: MonthlyData;
  variance: number;
  trend: "up" | "down" | "stable";
}

export interface MonthlyData {
  deliveries: number;
  revenue: number;
  costs: number;
  profit: number;
  efficiency: number;
}

export interface RoutePerformance {
  routeId: string;
  routeName: string;
  frequency: number;
  averageTime: number;
  onTimeRate: number;
  fuelEfficiency: number;
  customerRating: number;
  profitability: number;
}

export interface VehiclePerformance {
  vehicleId: string;
  vehicleNumber: string;
  utilizationRate: number;
  fuelEfficiency: number;
  maintenanceCost: number;
  deliveryCount: number;
  averageRating: number;
  profitability: number;
}

export interface DriverPerformance {
  driverId: string;
  driverName: string;
  deliveryCount: number;
  onTimeRate: number;
  customerRating: number;
  safetyScore: number;
  efficiency: number;
  revenue: number;
}

export interface GRNMetrics {
  totalGRNs: number;
  completedGRNs: number;
  pendingGRNs: number;
  averageProcessingTime: number;

  // Quality Metrics
  qualityAcceptanceRate: number;
  averageQualityGrade: string;
  defectRate: number;

  // Financial Metrics
  totalReceivedValue: number;
  totalAcceptedValue: number;
  totalAdjustments: number;
  adjustmentRate: number;
}

export interface DiscrepancyMetrics {
  totalDiscrepancies: number;
  resolvedDiscrepancies: number;
  pendingDiscrepancies: number;
  averageResolutionTime: number;

  // Types
  discrepancyByType: DiscrepancyTypeMetric[];

  // Financial Impact
  totalFinancialImpact: number;
  averageImpactPerDiscrepancy: number;

  // Trends
  discrepancyTrend: "improving" | "stable" | "worsening";
  resolutionTrend: "improving" | "stable" | "worsening";
}

export interface DiscrepancyTypeMetric {
  type: DiscrepancyType;
  count: number;
  percentage: number;
  averageImpact: number;
  resolutionRate: number;
}
