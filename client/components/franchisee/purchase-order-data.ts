// Franchisee Purchase Order Mock Data

import {
  PurchaseOrder,
  PurchaseOrderItem,
  POAnalytics,
  POConfiguration,
  DeliveryLocation,
  POApprovalWorkflow,
  POTracking,
  InventoryIntegration,
  CatalogIntegration,
} from "./purchase-order-types";

// Sample Delivery Locations
export const mockDeliveryLocations: DeliveryLocation[] = [
  {
    locationId: "LOC001",
    locationName: "Downtown Store",
    type: "store",
    address: {
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India",
      landmark: "Near Central Mall",
    },
    contactPerson: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@store.com",
      alternatePhone: "+91 98765 43211",
    },
    accessInstructions:
      "Use rear entrance for deliveries. Security clearance required.",
    operatingHours: {
      monday: "9:00 AM - 9:00 PM",
      tuesday: "9:00 AM - 9:00 PM",
      wednesday: "9:00 AM - 9:00 PM",
      thursday: "9:00 AM - 9:00 PM",
      friday: "9:00 AM - 10:00 PM",
      saturday: "9:00 AM - 10:00 PM",
      sunday: "10:00 AM - 8:00 PM",
    },
    loadingFacilities: {
      hasDock: true,
      hasForklift: true,
      maxVehicleSize: "Medium Truck",
      restrictions: [
        "No delivery during peak hours (12-2 PM)",
        "Maximum 3 vehicles at a time",
      ],
    },
  },
  {
    locationId: "LOC002",
    locationName: "Warehouse - Andheri",
    type: "warehouse",
    address: {
      street: "Plot 45, Industrial Estate",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400053",
      country: "India",
      landmark: "Behind MIDC Office",
    },
    contactPerson: {
      name: "Priya Sharma",
      phone: "+91 98765 43220",
      email: "priya.sharma@warehouse.com",
    },
    accessInstructions: "24/7 access available. Use Gate 2 for heavy vehicles.",
    operatingHours: {
      monday: "24 Hours",
      tuesday: "24 Hours",
      wednesday: "24 Hours",
      thursday: "24 Hours",
      friday: "24 Hours",
      saturday: "24 Hours",
      sunday: "24 Hours",
    },
    loadingFacilities: {
      hasDock: true,
      hasForklift: true,
      maxVehicleSize: "Large Truck",
      restrictions: ["Require 2-hour advance notice"],
    },
  },
];

// Sample Purchase Orders
export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "PO001",
    poNumber: "PO-2024-001",
    franchiseeId: "FRAN001",
    franchiseeName: "Mumbai Central Beverages",
    corporateId: "CORP001",
    corporateName: "BevCorp Industries Ltd.",
    type: "standard",
    status: "approved",
    priority: "medium",
    totalAmount: 45000,
    taxAmount: 8100,
    discountAmount: 2250,
    grandTotal: 50850,
    currency: "INR",

    items: [
      {
        id: "POI001",
        productId: "PROD001",
        sku: "COCA-250ML-24",
        productName: "Coca-Cola 250ml (Case of 24)",
        category: "Beverages",
        description: "Premium cola drink in 250ml bottles",
        specifications: {
          volume: "250ml",
          packaging: "Glass Bottle",
          brand: "Coca-Cola",
          variant: "Original",
        },
        requestedQuantity: 50,
        approvedQuantity: 50,
        fulfilledQuantity: 0,
        unitPrice: 360,
        totalPrice: 18000,
        discountPercentage: 5,
        discountAmount: 900,
        netAmount: 17100,
        currentStock: 12,
        minimumStock: 20,
        suggestedQuantity: 48,
        avgMonthlyConsumption: 80,
        lastOrderQuantity: 45,
        itemStatus: "approved",
        autoFillReason: ["Below minimum stock", "High demand product"],
        priority: "high",
      },
      {
        id: "POI002",
        productId: "PROD002",
        sku: "PEPSI-500ML-24",
        productName: "Pepsi 500ml (Case of 24)",
        category: "Beverages",
        description: "Pepsi cola in 500ml bottles",
        specifications: {
          volume: "500ml",
          packaging: "Plastic Bottle",
          brand: "Pepsi",
          variant: "Original",
        },
        requestedQuantity: 30,
        approvedQuantity: 30,
        fulfilledQuantity: 0,
        unitPrice: 540,
        totalPrice: 16200,
        discountPercentage: 3,
        discountAmount: 486,
        netAmount: 15714,
        currentStock: 25,
        minimumStock: 15,
        suggestedQuantity: 25,
        avgMonthlyConsumption: 40,
        lastOrderQuantity: 30,
        itemStatus: "approved",
        autoFillReason: ["Seasonal demand increase"],
        priority: "medium",
      },
      {
        id: "POI003",
        productId: "PROD003",
        sku: "CHIPS-50G-20",
        productName: "Premium Chips 50g (Pack of 20)",
        category: "Snacks",
        description: "Crispy potato chips in various flavors",
        specifications: {
          packaging: "Foil Pack",
          brand: "ChipsCo",
          variant: "Mixed Flavors",
        },
        requestedQuantity: 25,
        approvedQuantity: 25,
        fulfilledQuantity: 0,
        unitPrice: 400,
        totalPrice: 10000,
        discountPercentage: 8,
        discountAmount: 800,
        netAmount: 9200,
        currentStock: 8,
        minimumStock: 10,
        suggestedQuantity: 22,
        avgMonthlyConsumption: 35,
        lastOrderQuantity: 20,
        itemStatus: "approved",
        autoFillReason: ["Approaching minimum stock"],
        priority: "medium",
      },
    ],

    requestedDeliveryDate: "2024-02-15",
    preferredDeliveryTime: "10:00 AM - 12:00 PM",
    deliveryLocation: mockDeliveryLocations[0],
    deliveryInstructions:
      "Please coordinate with store manager for unloading. Check expiry dates before accepting.",
    notes: "Urgent order for weekend sales. Please ensure fresh stock.",
    attachments: [
      {
        id: "ATT001",
        fileName: "delivery_instructions.pdf",
        fileType: "application/pdf",
        fileSize: 245760,
        filePath: "/uploads/po001/delivery_instructions.pdf",
        uploadedBy: "manager@franchise.com",
        uploadedAt: "2024-02-01T10:30:00Z",
        description: "Detailed delivery and storage instructions",
        category: "document",
      },
    ],

    approvalWorkflow: {
      isRequired: true,
      levels: [
        {
          level: 1,
          name: "Store Manager Approval",
          description: "Initial approval by store manager",
          approvers: [
            {
              userId: "USER001",
              name: "Rajesh Kumar",
              email: "rajesh@franchise.com",
              role: "Store Manager",
              department: "Operations",
              hasApproved: true,
              approvedAt: "2024-02-01T11:15:00Z",
              comments: "Approved with standard delivery terms",
            },
          ],
          requiresAll: true,
          timeoutHours: 24,
          escalationRules: [],
        },
        {
          level: 2,
          name: "Regional Manager Approval",
          description: "Final approval by regional manager",
          approvers: [
            {
              userId: "USER002",
              name: "Priya Sharma",
              email: "priya@franchise.com",
              role: "Regional Manager",
              department: "Operations",
              hasApproved: true,
              approvedAt: "2024-02-01T14:30:00Z",
              comments: "Approved for immediate processing",
              approvalLimit: 100000,
            },
          ],
          requiresAll: true,
          timeoutHours: 48,
          escalationRules: [],
        },
      ],
      currentLevel: 2,
      isCompleted: true,
      requiresAllApprovers: false,
      autoApprovalRules: [],
    },

    approvalHistory: [
      {
        id: "APP001",
        level: 1,
        approverId: "USER001",
        approverName: "Rajesh Kumar",
        action: "approved",
        timestamp: "2024-02-01T11:15:00Z",
        comments: "Order looks good for weekend sales",
      },
      {
        id: "APP002",
        level: 2,
        approverId: "USER002",
        approverName: "Priya Sharma",
        action: "approved",
        timestamp: "2024-02-01T14:30:00Z",
        comments: "Approved with fast-track processing",
      },
    ],

    tracking: {
      status: "approved",
      statusHistory: [
        {
          status: "draft",
          timestamp: "2024-02-01T09:00:00Z",
          changedBy: "system",
          reason: "Order created",
        },
        {
          status: "submitted",
          timestamp: "2024-02-01T10:00:00Z",
          changedBy: "rajesh@franchise.com",
          reason: "Submitted for approval",
        },
        {
          status: "approved",
          timestamp: "2024-02-01T14:30:00Z",
          changedBy: "priya@franchise.com",
          reason: "All approvals completed",
        },
      ],
      estimatedDelivery: "2024-02-15T11:00:00Z",
      milestones: [
        {
          id: "MS001",
          name: "Order Approval",
          description: "Complete approval process",
          targetDate: "2024-02-02",
          actualDate: "2024-02-01",
          status: "completed",
          responsible: "Approval Team",
        },
        {
          id: "MS002",
          name: "Processing",
          description: "Order processing and packaging",
          targetDate: "2024-02-10",
          status: "pending",
          responsible: "Warehouse Team",
        },
        {
          id: "MS003",
          name: "Shipping",
          description: "Order shipment and tracking",
          targetDate: "2024-02-14",
          status: "pending",
          responsible: "Logistics Team",
        },
        {
          id: "MS004",
          name: "Delivery",
          description: "Final delivery to location",
          targetDate: "2024-02-15",
          status: "pending",
          responsible: "Delivery Team",
        },
      ],
    },

    timeline: [
      {
        id: "TL001",
        timestamp: "2024-02-01T09:00:00Z",
        event: "Order Created",
        description: "Purchase order created with auto-fill suggestions",
        type: "creation",
        performedBy: "rajesh@franchise.com",
      },
      {
        id: "TL002",
        timestamp: "2024-02-01T10:00:00Z",
        event: "Order Submitted",
        description: "Order submitted for approval workflow",
        type: "submission",
        performedBy: "rajesh@franchise.com",
      },
      {
        id: "TL003",
        timestamp: "2024-02-01T11:15:00Z",
        event: "Level 1 Approved",
        description: "Store manager approval completed",
        type: "approval",
        performedBy: "rajesh@franchise.com",
      },
      {
        id: "TL004",
        timestamp: "2024-02-01T14:30:00Z",
        event: "Final Approval",
        description: "Regional manager approval - order ready for processing",
        type: "approval",
        performedBy: "priya@franchise.com",
      },
    ],

    autoFillSource: "inventory_level",
    generatedFrom: {
      inventoryAlertIds: ["ALERT001", "ALERT002"],
      previousPOId: "PO-2024-001-PREV",
    },

    createdAt: "2024-02-01T09:00:00Z",
    createdBy: "rajesh@franchise.com",
    lastModified: "2024-02-01T14:30:00Z",
    modifiedBy: "priya@franchise.com",
    submittedAt: "2024-02-01T10:00:00Z",
    completedAt: undefined,
  },

  {
    id: "PO002",
    poNumber: "PO-2024-002",
    franchiseeId: "FRAN001",
    franchiseeName: "Mumbai Central Beverages",
    corporateId: "CORP001",
    corporateName: "BevCorp Industries Ltd.",
    type: "urgent",
    status: "in_transit",
    priority: "high",
    totalAmount: 28500,
    taxAmount: 5130,
    discountAmount: 1425,
    grandTotal: 32205,
    currency: "INR",

    items: [
      {
        id: "POI004",
        productId: "PROD004",
        sku: "WATER-1L-12",
        productName: "Mineral Water 1L (Pack of 12)",
        category: "Beverages",
        description: "Premium mineral water in 1L bottles",
        specifications: {
          volume: "1L",
          packaging: "Plastic Bottle",
          brand: "AquaPure",
          variant: "Natural",
        },
        requestedQuantity: 100,
        approvedQuantity: 100,
        fulfilledQuantity: 100,
        unitPrice: 180,
        totalPrice: 18000,
        discountPercentage: 5,
        discountAmount: 900,
        netAmount: 17100,
        currentStock: 5,
        minimumStock: 25,
        suggestedQuantity: 95,
        avgMonthlyConsumption: 120,
        itemStatus: "fulfilled",
        autoFillReason: ["Critical stock level", "Emergency reorder"],
        priority: "critical",
      },
      {
        id: "POI005",
        productId: "PROD005",
        sku: "JUICE-200ML-24",
        productName: "Orange Juice 200ml (Case of 24)",
        category: "Beverages",
        description: "Fresh orange juice in tetrapacks",
        specifications: {
          volume: "200ml",
          packaging: "Tetrapack",
          brand: "FreshCo",
          variant: "Orange",
        },
        requestedQuantity: 40,
        approvedQuantity: 40,
        fulfilledQuantity: 40,
        unitPrice: 320,
        totalPrice: 12800,
        discountPercentage: 4,
        discountAmount: 512,
        netAmount: 12288,
        currentStock: 8,
        minimumStock: 15,
        suggestedQuantity: 35,
        avgMonthlyConsumption: 50,
        itemStatus: "fulfilled",
        autoFillReason: ["Below reorder point"],
        priority: "medium",
      },
    ],

    requestedDeliveryDate: "2024-02-08",
    preferredDeliveryTime: "8:00 AM - 10:00 AM",
    deliveryLocation: mockDeliveryLocations[0],
    deliveryInstructions:
      "Urgent delivery required for stock-out situation. Priority handling.",
    notes:
      "Emergency order due to unexpected demand spike. Rush processing required.",
    attachments: [],

    approvalWorkflow: {
      isRequired: false,
      levels: [],
      currentLevel: 0,
      isCompleted: true,
      requiresAllApprovers: false,
      autoApprovalRules: [
        {
          id: "AUTO001",
          name: "Emergency Auto-Approval",
          conditions: [
            {
              type: "amount_threshold",
              operator: "less_than",
              value: 50000,
              unit: "INR",
            },
          ],
          action: "auto_approve",
          isActive: true,
        },
      ],
    },

    approvalHistory: [
      {
        id: "APP003",
        level: 0,
        approverId: "SYSTEM",
        approverName: "Auto-Approval System",
        action: "approved",
        timestamp: "2024-02-05T08:30:00Z",
        comments: "Auto-approved under emergency rules",
      },
    ],

    tracking: {
      status: "in_transit",
      statusHistory: [
        {
          status: "draft",
          timestamp: "2024-02-05T08:00:00Z",
          changedBy: "rajesh@franchise.com",
          reason: "Emergency order created",
        },
        {
          status: "approved",
          timestamp: "2024-02-05T08:30:00Z",
          changedBy: "system",
          reason: "Auto-approved",
        },
        {
          status: "processing",
          timestamp: "2024-02-05T09:00:00Z",
          changedBy: "warehouse@corp.com",
          reason: "Priority processing initiated",
        },
        {
          status: "shipped",
          timestamp: "2024-02-06T14:00:00Z",
          changedBy: "logistics@corp.com",
          reason: "Dispatched via express delivery",
        },
        {
          status: "in_transit",
          timestamp: "2024-02-06T16:00:00Z",
          changedBy: "system",
          reason: "Package in transit",
        },
      ],
      currentLocation: "Mumbai Logistics Hub",
      estimatedDelivery: "2024-02-08T09:00:00Z",
      shippingInfo: {
        carrierId: "CARRIER001",
        carrierName: "Express Logistics",
        trackingNumber: "EXP123456789",
        vehicleNumber: "MH-01-AB-1234",
        driverInfo: {
          name: "Arun Patel",
          phone: "+91 98765 12345",
          licenseNumber: "DL123456789",
        },
        route: [
          {
            location: "Corporate Warehouse",
            timestamp: "2024-02-06T14:00:00Z",
            status: "dispatched",
            description: "Package dispatched from main warehouse",
          },
          {
            location: "Mumbai Logistics Hub",
            timestamp: "2024-02-06T16:00:00Z",
            status: "in_transit",
            description: "Package reached logistics hub",
          },
        ],
      },
      milestones: [
        {
          id: "MS005",
          name: "Emergency Processing",
          description: "Fast-track processing completed",
          targetDate: "2024-02-05",
          actualDate: "2024-02-05",
          status: "completed",
          responsible: "Warehouse Team",
        },
        {
          id: "MS006",
          name: "Express Shipping",
          description: "Priority shipping initiated",
          targetDate: "2024-02-06",
          actualDate: "2024-02-06",
          status: "completed",
          responsible: "Logistics Team",
        },
        {
          id: "MS007",
          name: "Emergency Delivery",
          description: "Urgent delivery to store",
          targetDate: "2024-02-08",
          status: "in_progress",
          responsible: "Delivery Team",
        },
      ],
    },

    timeline: [
      {
        id: "TL005",
        timestamp: "2024-02-05T08:00:00Z",
        event: "Emergency Order Created",
        description: "Urgent purchase order created due to stock-out",
        type: "creation",
        performedBy: "rajesh@franchise.com",
      },
      {
        id: "TL006",
        timestamp: "2024-02-05T08:30:00Z",
        event: "Auto-Approved",
        description: "Order auto-approved under emergency rules",
        type: "approval",
        performedBy: "system",
      },
      {
        id: "TL007",
        timestamp: "2024-02-05T09:00:00Z",
        event: "Priority Processing",
        description: "Order moved to priority processing queue",
        type: "processing",
        performedBy: "warehouse@corp.com",
      },
      {
        id: "TL008",
        timestamp: "2024-02-06T14:00:00Z",
        event: "Express Shipment",
        description: "Order shipped via express logistics",
        type: "shipping",
        performedBy: "logistics@corp.com",
      },
    ],

    autoFillSource: "inventory_level",
    generatedFrom: {
      inventoryAlertIds: ["ALERT003", "ALERT004"],
    },

    createdAt: "2024-02-05T08:00:00Z",
    createdBy: "rajesh@franchise.com",
    lastModified: "2024-02-06T16:00:00Z",
    modifiedBy: "system",
    submittedAt: "2024-02-05T08:00:00Z",
  },
];

// Analytics Data
export const mockPOAnalytics: POAnalytics = {
  totalOrders: 45,
  totalValue: 892500,
  pendingOrders: 8,
  pendingValue: 145000,
  completedOrders: 32,
  completedValue: 678500,
  averageOrderValue: 19833,
  averageProcessingTime: 3.2,
  approvalRate: 94.7,
  onTimeDeliveryRate: 89.3,
  topCategories: [
    {
      category: "Beverages",
      orderCount: 28,
      totalValue: 560000,
      percentage: 62.7,
    },
    {
      category: "Snacks",
      orderCount: 12,
      totalValue: 240000,
      percentage: 26.9,
    },
    {
      category: "Retail Items",
      orderCount: 5,
      totalValue: 92500,
      percentage: 10.4,
    },
  ],
  monthlyTrends: [
    {
      month: "Jan 2024",
      orderCount: 15,
      totalValue: 295000,
      averageValue: 19667,
    },
    {
      month: "Feb 2024",
      orderCount: 18,
      totalValue: 342000,
      averageValue: 19000,
    },
    {
      month: "Mar 2024",
      orderCount: 12,
      totalValue: 255500,
      averageValue: 21292,
    },
  ],
  performanceMetrics: [
    {
      name: "Order Approval Rate",
      value: 94.7,
      unit: "%",
      trend: "up",
      change: 2.3,
    },
    {
      name: "Average Processing Time",
      value: 3.2,
      unit: "days",
      trend: "down",
      change: -0.5,
    },
    {
      name: "On-time Delivery Rate",
      value: 89.3,
      unit: "%",
      trend: "stable",
      change: 0.1,
    },
    {
      name: "Order Value Growth",
      value: 12.5,
      unit: "%",
      trend: "up",
      change: 5.2,
    },
  ],
};

// Configuration Data
export const mockPOConfiguration: POConfiguration = {
  approvalWorkflow: {
    isEnabled: true,
    defaultLevels: [
      {
        level: 1,
        name: "Store Manager",
        description: "Initial store-level approval",
        approvers: [],
        requiresAll: true,
        timeoutHours: 24,
        escalationRules: [],
      },
      {
        level: 2,
        name: "Regional Manager",
        description: "Regional oversight approval",
        approvers: [],
        requiresAll: true,
        timeoutHours: 48,
        escalationRules: [],
      },
    ],
    thresholds: [
      { amount: 25000, currency: "INR", requiredLevels: 1, timeoutHours: 24 },
      { amount: 50000, currency: "INR", requiredLevels: 2, timeoutHours: 48 },
      { amount: 100000, currency: "INR", requiredLevels: 3, timeoutHours: 72 },
    ],
  },
  autoFill: {
    isEnabled: true,
    sources: [
      {
        type: "inventory",
        isEnabled: true,
        priority: 1,
        configuration: { reorderMultiplier: 1.2, leadTimeDays: 7 },
      },
      {
        type: "historical",
        isEnabled: true,
        priority: 2,
        configuration: { lookbackMonths: 3, seasonalAdjustment: true },
      },
    ],
    rules: [],
  },
  notifications: {
    email: [
      {
        event: "order_created",
        isEnabled: true,
        recipients: ["manager@franchise.com"],
        template: "order_created",
      },
      {
        event: "approval_required",
        isEnabled: true,
        recipients: ["approver@franchise.com"],
        template: "approval_request",
      },
      {
        event: "order_shipped",
        isEnabled: true,
        recipients: ["store@franchise.com"],
        template: "shipment_notification",
      },
    ],
    sms: [
      {
        event: "urgent_approval",
        isEnabled: true,
        recipients: ["+91987654321"],
        template: "urgent_approval_sms",
      },
    ],
    inApp: [
      {
        event: "status_change",
        isEnabled: true,
        recipients: ["all"],
        template: "status_update",
      },
    ],
  },
  businessRules: [],
};

// Integration Data
export const mockInventoryIntegration: InventoryIntegration[] = [
  {
    itemId: "PROD001",
    currentStock: 12,
    reorderPoint: 20,
    suggestedQuantity: 48,
    lastOrderDate: "2024-01-15",
    averageConsumption: 80,
  },
  {
    itemId: "PROD002",
    currentStock: 25,
    reorderPoint: 15,
    suggestedQuantity: 25,
    lastOrderDate: "2024-01-20",
    averageConsumption: 40,
  },
  {
    itemId: "PROD003",
    currentStock: 8,
    reorderPoint: 10,
    suggestedQuantity: 22,
    lastOrderDate: "2024-01-18",
    averageConsumption: 35,
  },
];

export const mockCatalogIntegration: CatalogIntegration[] = [
  {
    productId: "PROD001",
    availability: true,
    pricing: {
      unitPrice: 360,
      bulkPricing: [
        { minQuantity: 50, unitPrice: 342, discountPercentage: 5 },
        { minQuantity: 100, unitPrice: 324, discountPercentage: 10 },
      ],
      discounts: [
        {
          type: "seasonal",
          percentage: 5,
          validFrom: "2024-02-01",
          validTo: "2024-02-29",
          conditions: ["Minimum 25 cases"],
        },
      ],
    },
    specifications: {
      volume: "250ml",
      packaging: "Glass Bottle",
      brand: "Coca-Cola",
    },
    restrictions: [],
  },
  {
    productId: "PROD002",
    availability: true,
    pricing: {
      unitPrice: 540,
      bulkPricing: [
        { minQuantity: 30, unitPrice: 524.7, discountPercentage: 3 },
        { minQuantity: 60, unitPrice: 513, discountPercentage: 5 },
      ],
      discounts: [],
    },
    specifications: {
      volume: "500ml",
      packaging: "Plastic Bottle",
      brand: "Pepsi",
    },
    restrictions: [],
  },
];

// Helper Functions
export const calculateOrderTotal = (items: PurchaseOrderItem[]) => {
  return items.reduce((total, item) => total + item.netAmount, 0);
};

export const getOrderStatusColor = (status: PurchaseOrder["status"]) => {
  const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    submitted: "bg-blue-100 text-blue-800",
    under_review: "bg-yellow-100 text-yellow-800",
    pending_approval: "bg-orange-100 text-orange-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    modified: "bg-purple-100 text-purple-800",
    processing: "bg-indigo-100 text-indigo-800",
    confirmed: "bg-teal-100 text-teal-800",
    in_production: "bg-cyan-100 text-cyan-800",
    ready_for_shipment: "bg-lime-100 text-lime-800",
    shipped: "bg-blue-100 text-blue-800",
    in_transit: "bg-yellow-100 text-yellow-800",
    out_for_delivery: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    partially_delivered: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    on_hold: "bg-gray-100 text-gray-800",
    back_ordered: "bg-red-100 text-red-800",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
};

export const getPriorityColor = (priority: PurchaseOrder["priority"]) => {
  const priorityColors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
  };
  return priorityColors[priority];
};

export const formatCurrency = (amount: number, currency: string = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getAutoFillSuggestions = (
  inventoryData: InventoryIntegration[],
  catalogData: CatalogIntegration[],
) => {
  return inventoryData
    .filter((item) => item.currentStock <= item.reorderPoint)
    .map((item) => {
      const catalog = catalogData.find((c) => c.productId === item.itemId);
      return {
        productId: item.itemId,
        suggestedQuantity: item.suggestedQuantity,
        reason:
          item.currentStock < item.reorderPoint * 0.5
            ? "Critical stock level"
            : "Below reorder point",
        priority:
          item.currentStock < item.reorderPoint * 0.5
            ? ("urgent" as const)
            : ("medium" as const),
        unitPrice: catalog?.pricing.unitPrice || 0,
        estimatedTotal:
          (catalog?.pricing.unitPrice || 0) * item.suggestedQuantity,
      };
    });
};

export const generatePONumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const timestamp = now.getTime().toString().slice(-4);
  return `PO-${year}${month}${day}-${timestamp}`;
};

export const validatePOForm = (formData: any) => {
  const errors: string[] = [];

  if (!formData.requestedDeliveryDate) {
    errors.push("Delivery date is required");
  }

  if (!formData.deliveryLocationId) {
    errors.push("Delivery location is required");
  }

  if (!formData.items || formData.items.length === 0) {
    errors.push("At least one item is required");
  }

  formData.items?.forEach((item: any, index: number) => {
    if (!item.productId) {
      errors.push(`Product is required for item ${index + 1}`);
    }
    if (!item.requestedQuantity || item.requestedQuantity <= 0) {
      errors.push(`Valid quantity is required for item ${index + 1}`);
    }
  });

  return errors;
};

export const getProcessingSteps = (poType: PurchaseOrder["type"]) => {
  const baseSteps = [
    "Order Creation",
    "Approval Process",
    "Processing",
    "Shipment Preparation",
    "Dispatch",
    "Delivery",
  ];

  if (poType === "urgent") {
    return [
      "Emergency Order Creation",
      "Fast-track Approval",
      "Priority Processing",
      "Express Preparation",
      "Rush Dispatch",
      "Emergency Delivery",
    ];
  }

  return baseSteps;
};
