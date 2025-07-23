export interface FranchiseeSelfServiceDashboard {
  franchiseeId: string;
  franchiseeName: string;
  territoryCode: string;

  // Quick Actions
  quickActions: QuickAction[];

  // Performance KPIs
  performanceKPIs: PerformanceKPI[];

  // Recent Activities
  recentActivities: Activity[];

  // Support Tickets
  supportTickets: SupportTicket[];

  // Notifications
  notifications: SelfServiceNotification[];

  // Financial Summary
  financialSummary: FinancialSummary;

  // Pending Tasks
  pendingTasks: PendingTask[];
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  action:
    | "create_po"
    | "submit_grn"
    | "view_invoices"
    | "raise_ticket"
    | "view_schemes"
    | "check_loyalty";
  badge?: {
    count: number;
    color: "red" | "blue" | "green" | "yellow";
  };
  enabled: boolean;
}

export interface PerformanceKPI {
  id: string;
  title: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "stable";
  trendValue: number;
  target?: number;
  category: "financial" | "operational" | "customer" | "inventory";
  color: "green" | "red" | "blue" | "yellow" | "purple";
  description: string;
}

export interface Activity {
  id: string;
  type:
    | "po_created"
    | "grn_submitted"
    | "invoice_received"
    | "ticket_resolved"
    | "scheme_applied"
    | "points_earned";
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
  metadata?: Record<string, any>;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category:
    | "technical"
    | "operational"
    | "financial"
    | "product"
    | "delivery"
    | "general";
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  createdBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  attachments?: TicketAttachment[];
  comments?: TicketComment[];
  estimatedResolution?: string;
  actualResolution?: string;
}

export interface TicketAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  downloadUrl: string;
}

export interface TicketComment {
  id: string;
  content: string;
  author: string;
  authorType: "franchisee" | "support" | "system";
  timestamp: string;
  isInternal: boolean;
}

export interface SelfServiceNotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  category:
    | "po"
    | "grn"
    | "invoice"
    | "scheme"
    | "loyalty"
    | "system"
    | "support";
  priority: "low" | "medium" | "high";
  isRead: boolean;
  timestamp: string;
  actionUrl?: string;
  actionText?: string;
}

export interface FinancialSummary {
  currentMonth: {
    revenue: number;
    purchases: number;
    pendingPayments: number;
    overduePayments: number;
  };
  previousMonth: {
    revenue: number;
    purchases: number;
  };
  loyaltyPoints: {
    available: number;
    pending: number;
    redeemed: number;
    expiringThisMonth: number;
  };
  creditInfo: {
    creditLimit: number;
    availableCredit: number;
    usedCredit: number;
    daysOutstanding: number;
  };
}

export interface PendingTask {
  id: string;
  title: string;
  description: string;
  type:
    | "po_approval"
    | "grn_submission"
    | "invoice_payment"
    | "scheme_application"
    | "ticket_response"
    | "document_upload";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate?: string;
  actionUrl: string;
  estimatedTime: number; // minutes
}

// Mobile-specific interfaces
export interface MobileLayout {
  isCompact: boolean;
  showSidebar: boolean;
  cardLayout: "grid" | "list";
  quickActionsCollapsed: boolean;
}

export interface TouchInteraction {
  swipeGestures: boolean;
  pullToRefresh: boolean;
  doubleTapActions: boolean;
}

// Enhanced PO Creation for mobile
export interface MobilePORequest {
  id: string;
  requestNumber: string;
  status: "draft" | "submitted" | "approved" | "rejected" | "cancelled";

  // Basic Info
  supplierId: string;
  supplierName: string;
  expectedDeliveryDate: string;
  urgency: "low" | "medium" | "high" | "urgent";

  // Items
  items: MobilePOItem[];

  // Financial
  subtotal: number;
  taxes: number;
  discounts: number;
  total: number;

  // Schemes & Promotions
  appliedSchemes: AppliedScheme[];
  availableSchemes: AvailableScheme[];

  // Loyalty
  loyaltyPointsEarned: number;
  loyaltyPointsUsed: number;

  // Mobile-specific
  isDraft: boolean;
  lastSaved: string;
  offlineMode: boolean;
  syncStatus: "synced" | "pending" | "failed";
}

export interface MobilePOItem {
  id: string;
  productId: string;
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  unit: string;

  // Scheme benefits
  originalPrice: number;
  discountApplied: number;
  schemeDetails?: string;

  // Availability
  stockStatus: "available" | "limited" | "out_of_stock";
  estimatedDelivery: string;

  // Mobile helpers
  imageUrl?: string;
  isSelected: boolean;
  notes?: string;
}

export interface AppliedScheme {
  schemeId: string;
  schemeName: string;
  schemeType:
    | "buy_x_get_y"
    | "percentage_discount"
    | "flat_discount"
    | "combo_offer"
    | "loyalty_bonus";
  discountAmount: number;
  applicableItems: string[];
  validUntil: string;
}

export interface AvailableScheme {
  id: string;
  name: string;
  description: string;
  type:
    | "buy_x_get_y"
    | "percentage_discount"
    | "flat_discount"
    | "combo_offer"
    | "loyalty_bonus";
  conditions: SchemeCondition[];
  benefits: SchemeBenefit[];
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  isEligible: boolean;
  eligibilityReason?: string;
  imageUrl?: string;
  termsAndConditions: string[];
}

export interface SchemeCondition {
  type:
    | "minimum_quantity"
    | "minimum_value"
    | "specific_products"
    | "category_purchase"
    | "loyalty_tier";
  value: number | string | string[];
  operator: "equals" | "greater_than" | "less_than" | "in" | "contains";
}

export interface SchemeBenefit {
  type:
    | "percentage_discount"
    | "flat_discount"
    | "free_product"
    | "bonus_points"
    | "free_shipping";
  value: number | string;
  applicableTo: "all" | "specific_products" | "categories";
  maxDiscount?: number;
  description: string;
}

// Enhanced GRN for mobile
export interface MobileGRN {
  id: string;
  grnNumber: string;
  poId: string;
  poNumber: string;
  supplierName: string;
  receivedDate: string;
  receivedBy: string;
  status: "draft" | "submitted" | "approved" | "rejected";

  // Items received
  receivedItems: MobileGRNItem[];

  // Quality inspection
  qualityChecks: QualityCheck[];

  // Photos/Documents
  attachments: GRNAttachment[];

  // Financial impact
  totalValue: number;
  discrepancyValue: number;

  // Mobile-specific
  location: {
    latitude?: number;
    longitude?: number;
    address?: string;
  };
  timestamp: string;
  isOffline: boolean;
}

export interface MobileGRNItem {
  itemId: string;
  productName: string;
  orderedQuantity: number;
  receivedQuantity: number;
  acceptedQuantity: number;
  rejectedQuantity: number;
  unitPrice: number;
  condition: "good" | "damaged" | "expired" | "defective";
  notes?: string;
  photos?: string[];
}

export interface QualityCheck {
  id: string;
  checkType: "visual" | "measurement" | "functional" | "documentation";
  parameter: string;
  expectedValue: string;
  actualValue: string;
  status: "pass" | "fail" | "warning";
  notes?: string;
  photos?: string[];
}

export interface GRNAttachment {
  id: string;
  type: "photo" | "document" | "signature";
  fileName: string;
  localUrl?: string; // for offline mode
  serverUrl?: string;
  uploadStatus: "pending" | "uploading" | "uploaded" | "failed";
  capturedAt: string;
}
