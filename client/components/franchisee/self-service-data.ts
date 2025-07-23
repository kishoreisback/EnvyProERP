import {
  FranchiseeSelfServiceDashboard,
  QuickAction,
  PerformanceKPI,
  Activity,
  SupportTicket,
  SelfServiceNotification,
  FinancialSummary,
  PendingTask,
  MobilePORequest,
  MobileGRN,
  AvailableScheme,
} from "./self-service-types";

// Mock data for franchisee self-service dashboard
export const mockSelfServiceDashboard: FranchiseeSelfServiceDashboard = {
  franchiseeId: "fr_001",
  franchiseeName: "BuildPro Mumbai Central",
  territoryCode: "MH-01",

  quickActions: [
    {
      id: "qa_001",
      title: "Create Purchase Order",
      description: "Place new order with suppliers",
      icon: "ShoppingCart",
      action: "create_po",
      badge: { count: 3, color: "blue" },
      enabled: true,
    },
    {
      id: "qa_002",
      title: "Submit GRN",
      description: "Record goods receipt",
      icon: "PackageCheck",
      action: "submit_grn",
      badge: { count: 2, color: "yellow" },
      enabled: true,
    },
    {
      id: "qa_003",
      title: "View Invoices",
      description: "Check pending payments",
      icon: "FileText",
      action: "view_invoices",
      badge: { count: 5, color: "red" },
      enabled: true,
    },
    {
      id: "qa_004",
      title: "Raise Support Ticket",
      description: "Get help from support team",
      icon: "HelpCircle",
      action: "raise_ticket",
      enabled: true,
    },
    {
      id: "qa_005",
      title: "View Active Schemes",
      description: "Check current promotions",
      icon: "Gift",
      action: "view_schemes",
      badge: { count: 8, color: "green" },
      enabled: true,
    },
    {
      id: "qa_006",
      title: "Inventory",
      description: "Manage stock levels",
      icon: "Package",
      action: "view_inventory",
      badge: { count: 3, color: "orange" },
      enabled: true,
    },
    {
      id: "qa_007",
      title: "Loyalty Points",
      description: "Check and redeem points",
      icon: "Award",
      action: "check_loyalty",
      badge: { count: 2450, color: "purple" },
      enabled: true,
    },
  ],

  performanceKPIs: [
    {
      id: "kpi_001",
      title: "Monthly Revenue",
      value: 2850000,
      unit: "₹",
      trend: "up",
      trendValue: 12.5,
      target: 3000000,
      category: "financial",
      color: "green",
      description: "Total revenue for current month",
    },
    {
      id: "kpi_002",
      title: "Order Fulfillment",
      value: 94.2,
      unit: "%",
      trend: "up",
      trendValue: 2.1,
      target: 95,
      category: "operational",
      color: "blue",
      description: "On-time delivery percentage",
    },
    {
      id: "kpi_003",
      title: "Customer Satisfaction",
      value: 4.7,
      unit: "/5",
      trend: "stable",
      trendValue: 0.1,
      target: 4.8,
      category: "customer",
      color: "yellow",
      description: "Average customer rating",
    },
    {
      id: "kpi_004",
      title: "Inventory Value",
      value: 180000,
      unit: "₹",
      trend: "up",
      trendValue: 5.2,
      target: 200000,
      category: "inventory",
      color: "purple",
      description: "Current inventory worth",
    },
  ],

  recentActivities: [
    {
      id: "act_001",
      type: "po_created",
      title: "Purchase Order Created",
      description: "PO-2024-001234 created for ₹1,25,000",
      timestamp: "2024-01-15T10:30:00Z",
      status: "completed",
      metadata: { poNumber: "PO-2024-001234", amount: 125000 },
    },
    {
      id: "act_002",
      type: "grn_submitted",
      title: "GRN Submitted",
      description: "GRN-001567 submitted for PO-2024-001200",
      timestamp: "2024-01-15T09:15:00Z",
      status: "pending",
      metadata: { grnNumber: "GRN-001567", poNumber: "PO-2024-001200" },
    },
    {
      id: "act_003",
      type: "scheme_applied",
      title: "Scheme Applied",
      description: "Buy 10 Get 2 Free scheme applied to order",
      timestamp: "2024-01-14T16:45:00Z",
      status: "completed",
      metadata: { schemeName: "Buy 10 Get 2 Free", discount: 15000 },
    },
    {
      id: "act_004",
      type: "points_earned",
      title: "Loyalty Points Earned",
      description: "Earned 450 points on order completion",
      timestamp: "2024-01-14T14:20:00Z",
      status: "completed",
      metadata: { points: 450, orderValue: 45000 },
    },
  ],

  supportTickets: [
    {
      id: "ticket_001",
      ticketNumber: "SUP-2024-00156",
      title: "Delivery Delay Issue",
      description:
        "Order PO-2024-001200 delayed by 3 days without notification",
      category: "delivery",
      priority: "high",
      status: "in_progress",
      createdBy: "Rajesh Kumar",
      assignedTo: "Support Team A",
      createdAt: "2024-01-13T11:00:00Z",
      updatedAt: "2024-01-15T09:30:00Z",
      estimatedResolution: "2024-01-16T17:00:00Z",
    },
    {
      id: "ticket_002",
      ticketNumber: "SUP-2024-00152",
      title: "Invoice Discrepancy",
      description:
        "Invoice amount doesn't match PO amount for order PO-2024-001180",
      category: "financial",
      priority: "medium",
      status: "resolved",
      createdBy: "Priya Singh",
      assignedTo: "Finance Team",
      createdAt: "2024-01-12T14:30:00Z",
      updatedAt: "2024-01-14T16:45:00Z",
      resolvedAt: "2024-01-14T16:45:00Z",
    },
  ],

  notifications: [
    {
      id: "notif_001",
      title: "New Scheme Available",
      message: "Monsoon Special: Extra 15% off on construction materials",
      type: "info",
      category: "scheme",
      priority: "medium",
      isRead: false,
      timestamp: "2024-01-15T08:00:00Z",
      actionUrl: "/schemes/monsoon-special",
      actionText: "View Scheme",
    },
    {
      id: "notif_002",
      title: "Points Expiring Soon",
      message: "1,200 loyalty points will expire on Jan 31, 2024",
      type: "warning",
      category: "loyalty",
      priority: "high",
      isRead: false,
      timestamp: "2024-01-14T18:00:00Z",
      actionUrl: "/loyalty/redeem",
      actionText: "Redeem Now",
    },
    {
      id: "notif_003",
      title: "Invoice Payment Due",
      message: "Invoice INV-2024-00234 payment due in 2 days",
      type: "warning",
      category: "invoice",
      priority: "high",
      isRead: true,
      timestamp: "2024-01-13T16:30:00Z",
      actionUrl: "/invoices/INV-2024-00234",
      actionText: "Pay Now",
    },
  ],

  financialSummary: {
    currentMonth: {
      revenue: 2850000,
      purchases: 2100000,
      pendingPayments: 450000,
      overduePayments: 125000,
    },
    previousMonth: {
      revenue: 2540000,
      purchases: 1950000,
    },
    loyaltyPoints: {
      available: 2450,
      pending: 350,
      redeemed: 1200,
      expiringThisMonth: 300,
    },
    creditInfo: {
      creditLimit: 1000000,
      availableCredit: 550000,
      usedCredit: 450000,
      daysOutstanding: 15,
    },
  },

  pendingTasks: [
    {
      id: "task_001",
      title: "Low Stock Alert: 3 Items Critical",
      description:
        "TMT Bars 12mm, Cement OPC 53, Paint Primer below minimum stock",
      type: "inventory_alert",
      priority: "urgent",
      dueDate: "2024-01-17T17:00:00Z",
      actionUrl: "/inventory/alerts",
      estimatedTime: 30,
    },
    {
      id: "task_002",
      title: "Submit GRN for PO-2024-001200",
      description: "Goods received yesterday, GRN submission pending",
      type: "grn_submission",
      priority: "high",
      dueDate: "2024-01-16T17:00:00Z",
      actionUrl: "/grn/create/PO-2024-001200",
      estimatedTime: 15,
    },
    {
      id: "task_003",
      title: "Pay Invoice INV-2024-00234",
      description: "Payment due in 2 days to maintain credit standing",
      type: "invoice_payment",
      priority: "high",
      dueDate: "2024-01-17T23:59:59Z",
      actionUrl: "/invoices/INV-2024-00234/pay",
      estimatedTime: 10,
    },
    {
      id: "task_004",
      title: "Apply for Monsoon Scheme",
      description: "New scheme available with 15% additional discount",
      type: "scheme_application",
      priority: "medium",
      dueDate: "2024-01-31T23:59:59Z",
      actionUrl: "/schemes/monsoon-special/apply",
      estimatedTime: 5,
    },
  ],
};

// Mock available schemes
export const mockAvailableSchemes: AvailableScheme[] = [
  {
    id: "scheme_001",
    name: "Monsoon Special 2024",
    description:
      "Extra 15% off on all construction materials during monsoon season",
    type: "percentage_discount",
    conditions: [
      {
        type: "minimum_value",
        value: 50000,
        operator: "greater_than",
      },
      {
        type: "specific_products",
        value: ["cement", "steel", "bricks"],
        operator: "in",
      },
    ],
    benefits: [
      {
        type: "percentage_discount",
        value: 15,
        applicableTo: "specific_products",
        maxDiscount: 25000,
        description: "15% discount on construction materials",
      },
      {
        type: "bonus_points",
        value: 2,
        applicableTo: "all",
        description: "Double loyalty points on qualifying orders",
      },
    ],
    validFrom: "2024-01-15T00:00:00Z",
    validUntil: "2024-02-29T23:59:59Z",
    isActive: true,
    isEligible: true,
    imageUrl: "/schemes/monsoon-special.jpg",
    termsAndConditions: [
      "Minimum order value of ₹50,000 required",
      "Applicable only on construction materials",
      "Cannot be combined with other offers",
      "Valid until February 29, 2024",
    ],
  },
  {
    id: "scheme_002",
    name: "Buy 10 Get 2 Free",
    description: "Buy 10 bags of cement and get 2 bags absolutely free",
    type: "buy_x_get_y",
    conditions: [
      {
        type: "minimum_quantity",
        value: 10,
        operator: "greater_than",
      },
      {
        type: "specific_products",
        value: ["cement"],
        operator: "in",
      },
    ],
    benefits: [
      {
        type: "free_product",
        value: "2 bags",
        applicableTo: "specific_products",
        description: "2 free cement bags for every 10 purchased",
      },
    ],
    validFrom: "2024-01-01T00:00:00Z",
    validUntil: "2024-03-31T23:59:59Z",
    isActive: true,
    isEligible: true,
    imageUrl: "/schemes/buy-10-get-2.jpg",
    termsAndConditions: [
      "Minimum 10 bags required per transaction",
      "Free bags must be of same brand/type",
      "Offer auto-applied at checkout",
      "Valid on select cement brands only",
    ],
  },
  {
    id: "scheme_003",
    name: "Loyalty Tier Bonus",
    description: "Gold tier members get 20% extra discount on all orders",
    type: "loyalty_bonus",
    conditions: [
      {
        type: "loyalty_tier",
        value: "gold",
        operator: "equals",
      },
    ],
    benefits: [
      {
        type: "percentage_discount",
        value: 20,
        applicableTo: "all",
        maxDiscount: 50000,
        description: "20% additional discount for Gold members",
      },
    ],
    validFrom: "2024-01-01T00:00:00Z",
    validUntil: "2024-12-31T23:59:59Z",
    isActive: true,
    isEligible: false,
    eligibilityReason: "Upgrade to Gold tier to avail this offer",
    imageUrl: "/schemes/loyalty-gold.jpg",
    termsAndConditions: [
      "Valid only for Gold tier loyalty members",
      "Maximum discount capped at ₹50,000 per order",
      "Applicable on all product categories",
      "Cannot be combined with other tier benefits",
    ],
  },
];

// Mock mobile PO requests
export const mockMobilePORequests: MobilePORequest[] = [
  {
    id: "mpo_001",
    requestNumber: "MPO-2024-00156",
    status: "draft",
    supplierId: "sup_001",
    supplierName: "Cement Works Ltd",
    expectedDeliveryDate: "2024-01-25T00:00:00Z",
    urgency: "medium",
    items: [
      {
        id: "item_001",
        productId: "prod_001",
        productName: "Portland Cement - 50kg",
        description: "High quality construction cement",
        quantity: 20,
        unitPrice: 450,
        totalPrice: 9000,
        unit: "bags",
        originalPrice: 500,
        discountApplied: 50,
        schemeDetails: "Buy 10 Get 2 Free scheme applied",
        stockStatus: "available",
        estimatedDelivery: "2024-01-25T00:00:00Z",
        imageUrl: "/products/cement-50kg.jpg",
        isSelected: true,
      },
    ],
    subtotal: 9000,
    taxes: 1620,
    discounts: 1000,
    total: 9620,
    appliedSchemes: [
      {
        schemeId: "scheme_002",
        schemeName: "Buy 10 Get 2 Free",
        schemeType: "buy_x_get_y",
        discountAmount: 1000,
        applicableItems: ["prod_001"],
        validUntil: "2024-03-31T23:59:59Z",
      },
    ],
    availableSchemes: mockAvailableSchemes,
    loyaltyPointsEarned: 96,
    loyaltyPointsUsed: 0,
    isDraft: true,
    lastSaved: "2024-01-15T11:45:00Z",
    offlineMode: false,
    syncStatus: "synced",
  },
];

// Mock mobile GRNs
export const mockMobileGRNs: MobileGRN[] = [
  {
    id: "mgrn_001",
    grnNumber: "MGRN-2024-00156",
    poId: "po_001",
    poNumber: "PO-2024-001200",
    supplierName: "Steel Industries Pvt Ltd",
    receivedDate: "2024-01-15T14:30:00Z",
    receivedBy: "Rajesh Kumar",
    status: "draft",
    receivedItems: [
      {
        itemId: "item_001",
        productName: "TMT Bars - 12mm",
        orderedQuantity: 100,
        receivedQuantity: 98,
        acceptedQuantity: 95,
        rejectedQuantity: 3,
        unitPrice: 65,
        condition: "good",
        notes: "3 bars found damaged during inspection",
        photos: ["/grn/photos/item_001_1.jpg", "/grn/photos/item_001_2.jpg"],
      },
    ],
    qualityChecks: [
      {
        id: "qc_001",
        checkType: "visual",
        parameter: "Surface condition",
        expectedValue: "No rust, clean surface",
        actualValue: "Good condition, minor surface marks",
        status: "pass",
        notes: "Minor cosmetic marks acceptable",
        photos: ["/grn/quality/qc_001.jpg"],
      },
    ],
    attachments: [
      {
        id: "att_001",
        type: "photo",
        fileName: "delivery_truck.jpg",
        localUrl: "/local/grn/delivery_truck.jpg",
        uploadStatus: "uploaded",
        capturedAt: "2024-01-15T14:30:00Z",
      },
      {
        id: "att_002",
        type: "signature",
        fileName: "receiver_signature.png",
        localUrl: "/local/grn/signature.png",
        uploadStatus: "pending",
        capturedAt: "2024-01-15T14:45:00Z",
      },
    ],
    totalValue: 6370,
    discrepancyValue: 195,
    location: {
      latitude: 19.076,
      longitude: 72.8777,
      address: "Mumbai Central Warehouse, Mumbai, MH",
    },
    timestamp: "2024-01-15T14:30:00Z",
    isOffline: false,
  },
];

// Utility functions
export function formatCurrency(amount: number): string {
  return `₹${new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function getKPIColor(kpi: PerformanceKPI): string {
  if (kpi.target && kpi.value >= kpi.target) return "text-green-600";
  if (kpi.target && kpi.value >= kpi.target * 0.8) return "text-yellow-600";
  return "text-red-600";
}

export function getNotificationIcon(category: string): string {
  switch (category) {
    case "po":
      return "ShoppingCart";
    case "grn":
      return "PackageCheck";
    case "invoice":
      return "FileText";
    case "scheme":
      return "Gift";
    case "loyalty":
      return "Award";
    case "support":
      return "HelpCircle";
    default:
      return "Bell";
  }
}

export function getTicketPriorityColor(priority: string): string {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getTicketStatusColor(status: string): string {
  switch (status) {
    case "open":
      return "bg-blue-100 text-blue-800";
    case "in_progress":
      return "bg-yellow-100 text-yellow-800";
    case "resolved":
      return "bg-green-100 text-green-800";
    case "closed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
