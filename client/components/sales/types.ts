// Comprehensive Sales Management Types for BuildPro ERP

export interface SalesCustomer {
  id: string;
  tenantId: string;
  customerCode: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };

  // Customer Status & Approval
  status: "active" | "inactive" | "suspended" | "pending_approval";
  approvalStatus: "approved" | "pending" | "rejected" | "review_required";
  approvedBy?: string;
  approvedAt?: string;

  // Financial Information
  creditLimit: number;
  availableCredit: number;
  paymentTerms: number; // days
  currency: string;
  creditRating: "excellent" | "good" | "fair" | "poor";

  // Business Details
  industry: string;
  customerType: "individual" | "company" | "government";
  taxId?: string;
  gstNumber?: string;

  // Relationship
  accountManager: string;
  customerSince: string;
  lastOrderDate?: string;
  totalOrderValue: number;

  created_at: string;
  updated_at: string;
}

export interface SalesQuotation {
  id: string;
  tenantId: string;
  quotationNumber: string;
  customerId: string;
  customer: SalesCustomer;

  // Quotation Details
  title: string;
  description?: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired" | "revised";
  version: number;
  parentQuotationId?: string; // For revisions

  // Dates
  quotationDate: string;
  validUntil: string;

  // Items
  items: QuotationItem[];

  // Financial
  subtotal: number;
  discountAmount: number;
  discountPercentage: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  exchangeRate: number;

  // Terms & Conditions
  paymentTerms: string;
  deliveryTerms: string;
  validity: number; // days
  notes?: string;
  termsAndConditions: string;

  // Workflow
  createdBy: string;
  assignedTo: string;
  approvalRequired: boolean;
  approvedBy?: string;
  approvedAt?: string;

  // Conversion
  convertedToOrder: boolean;
  orderId?: string;

  created_at: string;
  updated_at: string;
}

export interface QuotationItem {
  id: string;
  productId: string;
  productCode: string;
  productName: string;
  description: string;
  category: string;

  quantity: number;
  unit: string;
  unitPrice: number;

  // Discounts
  discountType: "percentage" | "fixed";
  discountValue: number;
  discountAmount: number;

  // Tax
  taxRate: number;
  taxAmount: number;

  // Total
  lineTotal: number;

  // Inventory
  availableStock?: number;
  reservedStock?: number;

  // Additional
  deliveryDays?: number;
  specifications?: string;
}

export interface SalesOrder {
  id: string;
  tenantId: string;
  orderNumber: string;
  customerId: string;
  customer: SalesCustomer;
  quotationId?: string;

  // Order Details
  title: string;
  description?: string;
  status:
    | "draft"
    | "confirmed"
    | "in_production"
    | "ready_to_ship"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "on_hold";
  priority: "low" | "medium" | "high" | "urgent";

  // Dates
  orderDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;

  // Items
  items: OrderItem[];

  // Financial
  subtotal: number;
  discountAmount: number;
  discountPercentage: number;
  taxAmount: number;
  shippingCharges: number;
  totalAmount: number;
  currency: string;
  exchangeRate: number;

  // Payment
  paymentStatus: "pending" | "partial" | "paid" | "overdue";
  paidAmount: number;
  balanceAmount: number;

  // Delivery
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    contactPerson: string;
    contactPhone: string;
  };

  // Workflow & Approval
  createdBy: string;
  assignedTo: string;
  approvalRequired: boolean;
  approvedBy?: string;
  approvedAt?: string;

  // Business Rules Validation
  creditCheckPassed: boolean;
  stockReserved: boolean;
  inventoryValidated: boolean;

  // Invoicing
  invoiced: boolean;
  invoiceIds: string[];
  totalInvoicedAmount: number;

  // Production & Fulfillment
  productionStarted: boolean;
  productionCompletedDate?: string;

  created_at: string;
  updated_at: string;
}

export interface OrderItem extends QuotationItem {
  // Additional order-specific fields
  reservedQuantity: number;
  allocatedQuantity: number;
  shippedQuantity: number;
  deliveredQuantity: number;

  // Production
  productionStatus: "pending" | "in_progress" | "completed" | "on_hold";
  productionStartDate?: string;
  productionCompletedDate?: string;

  // Quality Control
  qualityCheckRequired: boolean;
  qualityCheckPassed?: boolean;
  qualityCheckDate?: string;
  qualityCheckBy?: string;
}

export interface SalesInvoice {
  id: string;
  tenantId: string;
  invoiceNumber: string;
  customerId: string;
  customer: SalesCustomer;
  orderId?: string;

  // Invoice Details
  invoiceDate: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "partial" | "overdue" | "cancelled";

  // Items (can be partial delivery)
  items: InvoiceItem[];

  // Financial
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  currency: string;

  // Payment
  paymentTerms: string;
  paymentMethod?: string;
  paymentReference?: string;
  paymentDate?: string;

  // Validation
  orderValidated: boolean;
  creditCheckPassed: boolean;
  exceedsOrderAmount: boolean;

  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  productCode: string;
  productName: string;
  description: string;

  orderedQuantity: number;
  invoicedQuantity: number;
  unit: string;
  unitPrice: number;

  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  lineTotal: number;
}

export interface Product {
  id: string;
  tenantId: string;
  productCode: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;

  // Inventory
  stockQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  reorderLevel: number;
  maxStockLevel: number;

  // Pricing
  basePrice: number;
  sellingPrice: number;
  currency: string;

  // Tax & Discounts
  taxRate: number;
  maxDiscountPercent: number;

  // Physical
  unit: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };

  // Business
  leadTime: number; // days
  isActive: boolean;
  requiresApproval: boolean;

  created_at: string;
  updated_at: string;
}

export interface SalesAnalytics {
  tenantId: string;
  period: string;

  // Quotation Analytics
  quotations: {
    total: number;
    sent: number;
    accepted: number;
    rejected: number;
    expired: number;
    conversionRate: number;
    averageValue: number;
    totalValue: number;
  };

  // Order Analytics
  orders: {
    total: number;
    confirmed: number;
    delivered: number;
    cancelled: number;
    averageOrderValue: number;
    totalOrderValue: number;
    deliveryPerformance: number;
  };

  // Customer Analytics
  customers: {
    total: number;
    active: number;
    new: number;
    creditUtilization: number;
    topCustomers: Array<{
      customerId: string;
      customerName: string;
      orderValue: number;
      orderCount: number;
    }>;
  };

  // Product Analytics
  products: {
    topSellingProducts: Array<{
      productId: string;
      productName: string;
      quantitySold: number;
      revenue: number;
    }>;
    lowStockAlerts: number;
    stockTurnoverRate: number;
  };

  // Financial Analytics
  financial: {
    totalRevenue: number;
    totalInvoiced: number;
    totalPaid: number;
    outstandingAmount: number;
    averagePaymentDays: number;
  };
}

export interface BusinessRule {
  id: string;
  name: string;
  type: "validation" | "approval" | "notification" | "automation";
  entity: "customer" | "quotation" | "order" | "invoice" | "product";
  condition: string;
  action: string;
  isActive: boolean;
  priority: number;
  message?: string;
}

export interface ApprovalWorkflow {
  id: string;
  tenantId: string;
  name: string;
  type:
    | "customer_approval"
    | "quotation_approval"
    | "order_approval"
    | "discount_approval"
    | "credit_limit_approval";
  entityId: string;

  steps: ApprovalStep[];
  currentStep: number;
  status: "pending" | "approved" | "rejected" | "cancelled";

  requestedBy: string;
  requestedAt: string;
  completedAt?: string;

  metadata: Record<string, any>;
}

export interface ApprovalStep {
  id: string;
  stepNumber: number;
  approverRole: string;
  approverId?: string;
  status: "pending" | "approved" | "rejected" | "skipped";
  comments?: string;
  approvedAt?: string;
  isRequired: boolean;
  canDelegate: boolean;
}

export interface CreditCheckResult {
  customerId: string;
  creditLimit: number;
  currentOutstanding: number;
  availableCredit: number;
  requestedAmount: number;
  approved: boolean;
  reason?: string;
  checkedAt: string;
  checkedBy: string;
}

export interface StockReservation {
  id: string;
  tenantId: string;
  entityType: "quotation" | "order";
  entityId: string;
  productId: string;
  reservedQuantity: number;
  reservedAt: string;
  expiresAt?: string;
  status: "active" | "released" | "expired" | "converted";
  reservedBy: string;
}

export interface DiscountRule {
  id: string;
  tenantId: string;
  name: string;
  type: "percentage" | "fixed" | "tiered";
  applicableTo: "product" | "category" | "customer" | "order_value";
  conditions: {
    minOrderValue?: number;
    maxOrderValue?: number;
    customerTier?: string;
    productIds?: string[];
    categoryIds?: string[];
    validFrom: string;
    validTo: string;
  };
  discountValue: number;
  maxDiscountAmount?: number;
  requiresApproval: boolean;
  approvalThreshold?: number;
  isActive: boolean;
}

export interface ExchangeRate {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  effectiveDate: string;
  source: "manual" | "api" | "bank";
  updatedAt: string;
}

export interface SalesTarget {
  id: string;
  tenantId: string;
  type: "individual" | "team" | "region" | "product";
  targetFor: string; // user id, team id, region id, product id
  period: "monthly" | "quarterly" | "yearly";
  startDate: string;
  endDate: string;

  targets: {
    revenue: number;
    orders: number;
    newCustomers: number;
    quotations: number;
  };

  achieved: {
    revenue: number;
    orders: number;
    newCustomers: number;
    quotations: number;
  };

  performance: {
    revenuePercent: number;
    ordersPercent: number;
    newCustomersPercent: number;
    quotationsPercent: number;
    overallPercent: number;
  };
}

// Form Types
export interface QuotationFormData {
  customerId: string;
  title: string;
  description?: string;
  validUntil: string;
  items: Omit<QuotationItem, "id" | "taxAmount" | "lineTotal">[];
  discountPercentage: number;
  paymentTerms: string;
  deliveryTerms: string;
  notes?: string;
  currency: string;
}

export interface OrderFormData {
  customerId: string;
  quotationId?: string;
  title: string;
  description?: string;
  expectedDeliveryDate: string;
  priority: "low" | "medium" | "high" | "urgent";
  items: Omit<
    OrderItem,
    | "id"
    | "taxAmount"
    | "lineTotal"
    | "reservedQuantity"
    | "allocatedQuantity"
    | "shippedQuantity"
    | "deliveredQuantity"
    | "productionStatus"
  >[];
  shippingAddress: SalesOrder["shippingAddress"];
  currency: string;
}

export interface CustomerFormData {
  customerCode: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: SalesCustomer["address"];
  creditLimit: number;
  paymentTerms: number;
  currency: string;
  industry: string;
  customerType: "individual" | "company" | "government";
  taxId?: string;
  gstNumber?: string;
  accountManager: string;
}

// Filter & Search Types
export interface SalesFilters {
  status?: string[];
  customerId?: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
  assignedTo?: string;
  currency?: string;
  priority?: string[];
}

// Dashboard Summary Types
export interface SalesDashboardSummary {
  tenantId: string;
  period: string;

  quotations: {
    total: number;
    pending: number;
    sent: number;
    won: number;
    lost: number;
    wonValue: number;
    pipelineValue: number;
    conversionRate: number;
  };

  orders: {
    total: number;
    confirmed: number;
    inProgress: number;
    delivered: number;
    cancelled: number;
    totalValue: number;
    averageValue: number;
  };

  customers: {
    total: number;
    active: number;
    new: number;
    creditExceeded: number;
    pendingApproval: number;
  };

  inventory: {
    lowStock: number;
    reserved: number;
    totalValue: number;
  };

  financial: {
    revenue: number;
    outstanding: number;
    overdue: number;
    collectionEfficiency: number;
  };
}
