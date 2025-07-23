import {
  FranchiseeInventoryItem,
  InventoryLocation,
  InventoryAlert,
  InventoryMovement,
  InventoryDashboard,
  InventorySupplier,
  ReorderConfiguration,
  InventoryImport,
  CategoryInventory,
  AlertsSummary,
  InventoryPerformanceMetrics,
} from "./inventory-types";

// Mock Inventory Locations
export const mockInventoryLocations: InventoryLocation[] = [
  {
    id: "loc_001",
    franchiseeId: "franchise_001",
    name: "Main Store - Koramangala",
    type: "store",
    address: {
      street: "100 Feet Road, 5th Block",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560095",
      country: "India",
      coordinates: {
        latitude: 12.9352,
        longitude: 77.6245,
      },
    },
    capacity: {
      totalArea: 2500,
      storageArea: 800,
      displayArea: 1200,
      unit: "sqft",
      maxWeight: 5000,
      weightUnit: "kg",
    },
    isActive: true,
    manager: {
      id: "mgr_001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@bevhub.com",
      phone: "+91 9876543210",
      role: "store_manager",
    },
    operatingHours: {
      monday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
      tuesday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
      wednesday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
      thursday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
      friday: { isOpen: true, openTime: "08:00", closeTime: "23:00" },
      saturday: { isOpen: true, openTime: "08:00", closeTime: "23:00" },
      sunday: { isOpen: true, openTime: "09:00", closeTime: "22:00" },
    },
    facilities: [
      {
        id: "fac_001",
        name: "Cold Storage Unit",
        type: "cold_storage",
        status: "active",
        capacity: 200,
        specifications: { temperature: "2-8°C", humidity: "85%" },
      },
      {
        id: "fac_002",
        name: "Security System",
        type: "security_system",
        status: "active",
        specifications: { cameras: 12, alarmSystem: true, accessControl: true },
      },
      {
        id: "fac_003",
        name: "Loading Dock",
        type: "loading_dock",
        status: "active",
        capacity: 2,
        specifications: { height: "adjustable", width: "12 feet" },
      },
    ],
    zones: [
      {
        id: "zone_001",
        locationId: "loc_001",
        name: "Ambient Storage",
        type: "ambient",
        capacity: 500,
        currentUtilization: 380,
        specialRequirements: ["Dry", "Room temperature"],
        isActive: true,
      },
      {
        id: "zone_002",
        locationId: "loc_001",
        name: "Cold Storage",
        type: "refrigerated",
        capacity: 200,
        currentUtilization: 150,
        temperature: {
          min: 2,
          max: 8,
          unit: "celsius",
          alertThresholds: {
            lowWarning: 0,
            lowCritical: -2,
            highWarning: 10,
            highCritical: 12,
          },
        },
        specialRequirements: ["Temperature controlled", "Humidity controlled"],
        isActive: true,
      },
      {
        id: "zone_003",
        locationId: "loc_001",
        name: "Display Area",
        type: "display",
        capacity: 300,
        currentUtilization: 280,
        specialRequirements: ["Customer accessible", "Well lit"],
        isActive: true,
      },
    ],
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "loc_002",
    franchiseeId: "franchise_001",
    name: "Warehouse - Whitefield",
    type: "warehouse",
    address: {
      street: "EPIP Industrial Area",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560066",
      country: "India",
    },
    capacity: {
      totalArea: 8000,
      storageArea: 7000,
      displayArea: 500,
      unit: "sqft",
      maxWeight: 50000,
      weightUnit: "kg",
    },
    isActive: true,
    manager: {
      id: "mgr_002",
      name: "Priya Sharma",
      email: "priya.sharma@bevhub.com",
      phone: "+91 9876543211",
      role: "warehouse_manager",
    },
    operatingHours: {
      monday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
      tuesday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
      wednesday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
      thursday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
      friday: { isOpen: true, openTime: "06:00", closeTime: "20:00" },
      saturday: { isOpen: true, openTime: "06:00", closeTime: "18:00" },
      sunday: { isOpen: false, openTime: "", closeTime: "" },
    },
    facilities: [
      {
        id: "fac_004",
        name: "Large Cold Storage",
        type: "cold_storage",
        status: "active",
        capacity: 1000,
        specifications: { temperature: "0-4°C", sections: 4 },
      },
      {
        id: "fac_005",
        name: "Truck Loading Bay",
        type: "loading_dock",
        status: "active",
        capacity: 6,
        specifications: { height: "hydraulic", covered: true },
      },
    ],
    zones: [
      {
        id: "zone_004",
        locationId: "loc_002",
        name: "Bulk Storage A",
        type: "dry_storage",
        capacity: 2000,
        currentUtilization: 1600,
        specialRequirements: ["Palletized storage", "Forklift access"],
        isActive: true,
      },
      {
        id: "zone_005",
        locationId: "loc_002",
        name: "Cold Room 1",
        type: "refrigerated",
        capacity: 500,
        currentUtilization: 420,
        temperature: {
          min: 0,
          max: 4,
          unit: "celsius",
          alertThresholds: {
            lowWarning: -2,
            lowCritical: -5,
            highWarning: 6,
            highCritical: 8,
          },
        },
        specialRequirements: ["Temperature logging", "Backup power"],
        isActive: true,
      },
    ],
    createdAt: "2024-01-12T14:00:00Z",
  },
];

// Mock Inventory Suppliers
export const mockInventorySuppliers: InventorySupplier[] = [
  {
    id: "sup_001",
    name: "BevCorp Direct Supply",
    type: "direct_corporate",
    contactInfo: {
      primaryContact: "Amit Verma",
      email: "supply@bevcorp.com",
      phone: "+91 8012345678",
      address: {
        street: "Corporate Supply Center",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India",
      },
    },
    paymentTerms: {
      creditDays: 30,
      discountTerms: [
        {
          discountPercentage: 2,
          paymentDays: 10,
          conditions: ["Early payment"],
        },
      ],
      paymentMethod: "bank_transfer",
      currency: "INR",
    },
    deliverySchedule: {
      frequency: "weekly",
      preferredDays: ["Tuesday", "Friday"],
      timeSlot: { start: "09:00", end: "17:00" },
      leadTime: 2,
      minimumOrderValue: 50000,
    },
    performanceMetrics: {
      onTimeDelivery: 96.5,
      qualityRating: 4.8,
      responsiveness: 4.6,
      lastDelivery: "2024-01-18T14:30:00Z",
      totalOrders: 156,
      averageDeliveryTime: 36,
    },
  },
  {
    id: "sup_002",
    name: "Regional Distributors Ltd",
    type: "distributor",
    contactInfo: {
      primaryContact: "Suresh Patel",
      email: "orders@regionaldist.com",
      phone: "+91 9123456789",
      address: {
        street: "Industrial Estate, Phase 2",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411019",
        country: "India",
      },
      emergencyContact: "+91 9123456790",
    },
    paymentTerms: {
      creditDays: 15,
      paymentMethod: "credit",
      currency: "INR",
    },
    deliverySchedule: {
      frequency: "bi_weekly",
      preferredDays: ["Monday", "Thursday"],
      timeSlot: { start: "08:00", end: "16:00" },
      leadTime: 3,
      minimumOrderValue: 25000,
    },
    performanceMetrics: {
      onTimeDelivery: 89.2,
      qualityRating: 4.2,
      responsiveness: 4.1,
      lastDelivery: "2024-01-16T11:15:00Z",
      totalOrders: 87,
      averageDeliveryTime: 58,
    },
  },
  {
    id: "sup_003",
    name: "Local Snacks Vendor",
    type: "local_vendor",
    contactInfo: {
      primaryContact: "Ramesh Singh",
      email: "ramesh@localsnacks.com",
      phone: "+91 9876501234",
      address: {
        street: "Market Road",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
        country: "India",
      },
    },
    paymentTerms: {
      creditDays: 7,
      paymentMethod: "cash",
      currency: "INR",
    },
    deliverySchedule: {
      frequency: "daily",
      preferredDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      timeSlot: { start: "07:00", end: "11:00" },
      leadTime: 1,
      minimumOrderValue: 5000,
    },
    performanceMetrics: {
      onTimeDelivery: 94.8,
      qualityRating: 4.5,
      responsiveness: 4.7,
      lastDelivery: "2024-01-19T09:30:00Z",
      totalOrders: 234,
      averageDeliveryTime: 18,
    },
  },
];

// Mock Inventory Items
export const mockInventoryItems: FranchiseeInventoryItem[] = [
  {
    id: "inv_001",
    franchiseeId: "franchise_001",
    productId: "prod_cola_500ml",
    locationId: "loc_001",
    sku: "BEV-COLA-500-001",
    productName: "Premium Cola 500ml",
    category: "Soft Drinks",
    inventoryType: "owned",
    currentStock: 450,
    minimumStock: 200,
    maximumStock: 1000,
    reorderPoint: 250,
    reorderQuantity: 500,
    unitCost: 20,
    totalValue: 9000,
    lastUpdated: "2024-01-19T16:30:00Z",
    lastRestocked: "2024-01-15T10:00:00Z",
    batchNumber: "COLA240115001",
    supplier: mockInventorySuppliers[0],
    status: "active",
    alerts: [
      {
        id: "alert_001",
        type: "low_stock",
        severity: "warning",
        message: "Stock level approaching minimum threshold",
        details:
          "Current stock: 450 units, Minimum: 200 units, Reorder point: 250 units",
        triggeredAt: "2024-01-19T16:30:00Z",
        actionRequired: true,
        autoResolvable: false,
        relatedItems: ["inv_001"],
      },
    ],
    movements: [
      {
        id: "mov_001",
        inventoryItemId: "inv_001",
        type: "inbound",
        reason: "Stock replenishment",
        quantity: 500,
        toLocation: "loc_001",
        reference: {
          type: "purchase_order",
          referenceId: "PO_001",
          documentNumber: "PO-2024-001",
        },
        performedBy: "mgr_001",
        timestamp: "2024-01-15T10:00:00Z",
        cost: 10000,
      },
      {
        id: "mov_002",
        inventoryItemId: "inv_001",
        type: "outbound",
        reason: "Sales",
        quantity: -50,
        fromLocation: "loc_001",
        reference: {
          type: "sales_order",
          referenceId: "SO_015",
          documentNumber: "INV-2024-015",
        },
        performedBy: "staff_003",
        timestamp: "2024-01-19T14:20:00Z",
      },
    ],
    metrics: {
      turnoverRate: 8.5,
      daysOfStock: 18,
      stockoutFrequency: 0.02,
      averageLeadTime: 2.5,
      carryCost: 180,
      accuracyRate: 98.5,
      fastMoving: true,
      abcClassification: "A",
      seasonalityFactor: 1.2,
    },
  },
  {
    id: "inv_002",
    franchiseeId: "franchise_001",
    productId: "prod_energy_250ml",
    locationId: "loc_001",
    sku: "BEV-ENRG-250-001",
    productName: "Power Energy Drink 250ml",
    category: "Energy Drinks",
    inventoryType: "consignment",
    currentStock: 120,
    minimumStock: 50,
    maximumStock: 300,
    reorderPoint: 75,
    reorderQuantity: 150,
    unitCost: 45,
    totalValue: 5400,
    lastUpdated: "2024-01-19T12:00:00Z",
    lastRestocked: "2024-01-12T14:30:00Z",
    expiryDate: "2024-12-31",
    batchNumber: "ENRG240112001",
    supplier: mockInventorySuppliers[0],
    status: "active",
    alerts: [],
    movements: [
      {
        id: "mov_003",
        inventoryItemId: "inv_002",
        type: "inbound",
        reason: "Consignment stock",
        quantity: 150,
        toLocation: "loc_001",
        reference: {
          type: "transfer_order",
          referenceId: "TO_005",
          documentNumber: "CONS-2024-005",
        },
        performedBy: "mgr_001",
        timestamp: "2024-01-12T14:30:00Z",
        cost: 6750,
      },
    ],
    metrics: {
      turnoverRate: 6.2,
      daysOfStock: 24,
      stockoutFrequency: 0.05,
      averageLeadTime: 3,
      carryCost: 270,
      accuracyRate: 97.8,
      fastMoving: false,
      abcClassification: "B",
      seasonalityFactor: 0.9,
    },
  },
  {
    id: "inv_003",
    franchiseeId: "franchise_001",
    productId: "prod_tshirt_brand",
    locationId: "loc_001",
    sku: "MERCH-TSHIRT-001",
    productName: "Branded T-Shirt - Premium Cotton",
    category: "Retail Merchandise",
    inventoryType: "owned",
    currentStock: 35,
    minimumStock: 20,
    maximumStock: 100,
    reorderPoint: 25,
    reorderQuantity: 50,
    unitCost: 299,
    totalValue: 10465,
    lastUpdated: "2024-01-18T09:15:00Z",
    lastRestocked: "2024-01-08T16:00:00Z",
    batchNumber: "TSHIRT240108001",
    supplier: mockInventorySuppliers[1],
    status: "active",
    alerts: [
      {
        id: "alert_002",
        type: "reorder_due",
        severity: "info",
        message: "Reorder point reached",
        details:
          "Current stock: 35 units, Reorder point: 25 units. Consider placing order.",
        triggeredAt: "2024-01-18T09:15:00Z",
        actionRequired: true,
        autoResolvable: true,
        relatedItems: ["inv_003"],
      },
    ],
    movements: [
      {
        id: "mov_004",
        inventoryItemId: "inv_003",
        type: "inbound",
        reason: "New stock arrival",
        quantity: 50,
        toLocation: "loc_001",
        reference: {
          type: "purchase_order",
          referenceId: "PO_008",
          documentNumber: "PO-2024-008",
        },
        performedBy: "mgr_001",
        timestamp: "2024-01-08T16:00:00Z",
        cost: 14950,
      },
    ],
    metrics: {
      turnoverRate: 3.8,
      daysOfStock: 45,
      stockoutFrequency: 0.08,
      averageLeadTime: 7,
      carryCost: 628,
      accuracyRate: 96.2,
      fastMoving: false,
      abcClassification: "C",
      seasonalityFactor: 1.1,
    },
  },
];

// Mock Inventory Alerts
export const mockInventoryAlerts: InventoryAlert[] = [
  {
    id: "alert_003",
    type: "low_stock",
    severity: "critical",
    message: "Critical stock level for Premium Water 1L",
    details: "Only 15 units remaining. Minimum stock: 50 units.",
    triggeredAt: "2024-01-19T18:45:00Z",
    actionRequired: true,
    autoResolvable: false,
    relatedItems: ["inv_004"],
  },
  {
    id: "alert_004",
    type: "expiry_warning",
    severity: "warning",
    message: "Products expiring within 30 days",
    details:
      "12 items from Dairy Products category expiring between Jan 25 - Feb 15",
    triggeredAt: "2024-01-19T08:00:00Z",
    actionRequired: true,
    autoResolvable: false,
    relatedItems: ["inv_005", "inv_006"],
  },
  {
    id: "alert_005",
    type: "temperature_breach",
    severity: "urgent",
    message: "Cold storage temperature exceeded limit",
    details: "Zone 2 temperature: 12°C (Limit: 8°C). Duration: 15 minutes",
    triggeredAt: "2024-01-19T20:30:00Z",
    acknowledgedAt: "2024-01-19T20:35:00Z",
    acknowledgedBy: "mgr_001",
    actionRequired: true,
    autoResolvable: false,
    relatedItems: ["zone_002"],
  },
  {
    id: "alert_006",
    type: "overstock",
    severity: "info",
    message: "Overstock detected: Steel Rods 16mm",
    details: "Current stock: 850 units, Maximum: 600 units. Excess: 250 units",
    triggeredAt: "2024-01-19T12:15:00Z",
    actionRequired: false,
    autoResolvable: false,
    relatedItems: ["inv_007"],
  },
  {
    id: "alert_007",
    type: "stock_discrepancy",
    severity: "warning",
    message: "Stock count mismatch detected",
    details: "Physical count differs from system for 3 items in Location A",
    triggeredAt: "2024-01-18T16:30:00Z",
    actionRequired: true,
    autoResolvable: false,
    relatedItems: ["inv_008", "inv_009", "inv_010"],
  },
  {
    id: "alert_008",
    type: "reorder_suggestion",
    severity: "info",
    message: "Reorder recommendations available",
    details:
      "5 items approaching reorder point. Suggested order value: ₹45,000",
    triggeredAt: "2024-01-19T09:00:00Z",
    actionRequired: false,
    autoResolvable: true,
    relatedItems: ["inv_011", "inv_012", "inv_013", "inv_014", "inv_015"],
  },
];

// Mock Reorder Configurations
export const mockReorderConfigurations: ReorderConfiguration[] = [
  {
    id: "reorder_001",
    franchiseeId: "franchise_001",
    productId: "prod_cola_500ml",
    isEnabled: true,
    method: "automatic",
    triggers: [
      {
        type: "stock_level",
        threshold: 250,
        unit: "quantity",
        conditions: ["stock <= threshold"],
        isActive: true,
      },
      {
        type: "time_based",
        threshold: 7,
        unit: "days",
        conditions: ["last_order >= threshold"],
        isActive: false,
      },
    ],
    defaultQuantity: 500,
    maxQuantity: 1000,
    preferredSupplier: "sup_001",
    backupSuppliers: ["sup_002"],
    leadTime: 2,
    safetyStock: 100,
    reviewCycle: 14,
    seasonalAdjustments: [
      {
        season: "Summer",
        months: [3, 4, 5, 6],
        adjustmentFactor: 1.3,
        reason: "Increased demand during hot weather",
      },
      {
        season: "Festival",
        months: [10, 11],
        adjustmentFactor: 1.5,
        reason: "Festival season demand spike",
      },
    ],
    approvalRequired: false,
    approvers: [],
  },
  {
    id: "reorder_002",
    franchiseeId: "franchise_001",
    productId: "prod_energy_250ml",
    isEnabled: true,
    method: "hybrid",
    triggers: [
      {
        type: "stock_level",
        threshold: 75,
        unit: "quantity",
        conditions: ["stock <= threshold"],
        isActive: true,
      },
    ],
    defaultQuantity: 150,
    maxQuantity: 300,
    preferredSupplier: "sup_001",
    backupSuppliers: [],
    leadTime: 3,
    safetyStock: 25,
    reviewCycle: 21,
    seasonalAdjustments: [],
    approvalRequired: true,
    approvers: ["mgr_001"],
  },
];

// Mock Import History
export const mockInventoryImports: InventoryImport[] = [
  {
    id: "import_001",
    franchiseeId: "franchise_001",
    sourceType: "corporate_catalog",
    importedBy: "mgr_001",
    importedAt: "2024-01-10T14:00:00Z",
    status: "completed",
    totalItems: 156,
    processedItems: 156,
    successfulItems: 142,
    failedItems: 14,
    errors: [
      {
        row: 23,
        field: "unitCost",
        value: "invalid",
        error: "Invalid numeric value",
        severity: "error",
        suggestion: "Enter a valid price in numbers",
      },
      {
        row: 45,
        field: "expiryDate",
        value: "2023-12-01",
        error: "Expiry date in the past",
        severity: "warning",
        suggestion: "Check if this is current stock",
      },
    ],
    mapping: {
      sku: "Product SKU",
      productName: "Product Name",
      category: "Category",
      currentStock: "Current Stock",
      minimumStock: "Min Stock",
      unitCost: "Unit Cost",
      location: "Location",
      inventoryType: "Type",
      supplier: "Supplier",
      expiryDate: "Expiry Date",
      batchNumber: "Batch Number",
    },
    validationRules: [
      { field: "sku", rule: "required", message: "SKU is required" },
      {
        field: "currentStock",
        rule: "numeric",
        message: "Stock must be a number",
      },
      { field: "unitCost", rule: "positive", message: "Cost must be positive" },
    ],
  },
  {
    id: "import_002",
    franchiseeId: "franchise_001",
    sourceType: "manual_entry",
    fileName: "initial_inventory.xlsx",
    importedBy: "mgr_001",
    importedAt: "2024-01-15T09:30:00Z",
    status: "partially_completed",
    totalItems: 45,
    processedItems: 45,
    successfulItems: 38,
    failedItems: 7,
    errors: [
      {
        row: 12,
        field: "location",
        value: "Unknown Location",
        error: "Location not found",
        severity: "error",
        suggestion: "Use valid location: Main Store or Warehouse",
      },
    ],
    mapping: {
      sku: "SKU",
      productName: "Name",
      category: "Cat",
      currentStock: "Qty",
      minimumStock: "Min",
      unitCost: "Cost",
      location: "Loc",
      inventoryType: "Type",
      supplier: "Supplier",
    },
    validationRules: [
      { field: "sku", rule: "required", message: "SKU is required" },
      {
        field: "location",
        rule: "enum",
        parameters: ["Main Store", "Warehouse"],
        message: "Invalid location",
      },
    ],
  },
];

// Mock Dashboard Data
export const mockInventoryDashboard: InventoryDashboard = {
  totalItems: 156,
  totalValue: 285650,
  lowStockItems: 8,
  expiringSoon: 12,
  stockoutItems: 2,
  averageTurnover: 6.8,
  totalLocations: 2,
  activeAlerts: 15,
  recentMovements: [
    {
      id: "mov_recent_001",
      inventoryItemId: "inv_001",
      type: "outbound",
      reason: "Customer sales",
      quantity: -24,
      fromLocation: "loc_001",
      reference: {
        type: "sales_order",
        referenceId: "SO_156",
        documentNumber: "INV-2024-156",
      },
      performedBy: "staff_005",
      timestamp: "2024-01-19T19:45:00Z",
    },
    {
      id: "mov_recent_002",
      inventoryItemId: "inv_002",
      type: "transfer",
      reason: "Stock redistribution",
      quantity: 30,
      fromLocation: "loc_002",
      toLocation: "loc_001",
      reference: {
        type: "transfer_order",
        referenceId: "TO_012",
        documentNumber: "TR-2024-012",
      },
      performedBy: "mgr_002",
      timestamp: "2024-01-19T16:20:00Z",
    },
    {
      id: "mov_recent_003",
      inventoryItemId: "inv_003",
      type: "adjustment",
      reason: "Cycle count correction",
      quantity: -2,
      reference: {
        type: "adjustment",
        referenceId: "ADJ_008",
        documentNumber: "CC-2024-008",
      },
      performedBy: "mgr_001",
      timestamp: "2024-01-19T11:30:00Z",
      notes: "Physical count variance correction",
    },
  ],
  topCategories: [
    {
      categoryId: "cat_soft_drinks",
      categoryName: "Soft Drinks",
      totalItems: 45,
      totalValue: 125400,
      averageTurnover: 8.2,
      lowStockCount: 3,
      overStockCount: 1,
    },
    {
      categoryId: "cat_energy_drinks",
      categoryName: "Energy Drinks",
      totalItems: 18,
      totalValue: 89650,
      averageTurnover: 6.5,
      lowStockCount: 2,
      overStockCount: 0,
    },
    {
      categoryId: "cat_retail_merchandise",
      categoryName: "Retail Merchandise",
      totalItems: 32,
      totalValue: 45780,
      averageTurnover: 4.1,
      lowStockCount: 2,
      overStockCount: 3,
    },
    {
      categoryId: "cat_pos_items",
      categoryName: "POS Items",
      totalItems: 25,
      totalValue: 15650,
      averageTurnover: 7.8,
      lowStockCount: 1,
      overStockCount: 0,
    },
  ],
  alertsSummary: {
    total: 15,
    critical: 3,
    warning: 8,
    info: 4,
    byType: {
      lowStock: 8,
      expiry: 4,
      reorder: 2,
      stockout: 1,
      temperature: 0,
    },
  },
  performanceMetrics: {
    stockAccuracy: 97.8,
    turnoverRate: 6.8,
    stockoutRate: 1.3,
    carryingCost: 4.2,
    orderFulfillment: 98.5,
    supplierPerformance: 94.2,
    inventoryDays: 42,
    lastCycleCount: "2024-01-15T10:00:00Z",
  },
};

// Helper Functions
export const getInventoryItemById = (
  id: string,
): FranchiseeInventoryItem | undefined => {
  return mockInventoryItems.find((item) => item.id === id);
};

export const getInventoryItemsByLocation = (
  locationId: string,
): FranchiseeInventoryItem[] => {
  return mockInventoryItems.filter((item) => item.locationId === locationId);
};

export const getInventoryItemsByCategory = (
  category: string,
): FranchiseeInventoryItem[] => {
  return mockInventoryItems.filter((item) => item.category === category);
};

export const getLocationById = (id: string): InventoryLocation | undefined => {
  return mockInventoryLocations.find((location) => location.id === id);
};

export const getSupplierById = (id: string): InventorySupplier | undefined => {
  return mockInventorySuppliers.find((supplier) => supplier.id === id);
};

export const getLowStockItems = (
  threshold?: number,
): FranchiseeInventoryItem[] => {
  return mockInventoryItems.filter((item) => {
    const stockLevel = item.currentStock / item.maximumStock;
    const alertThreshold = threshold || 0.3; // 30% by default
    return (
      stockLevel <= alertThreshold || item.currentStock <= item.reorderPoint
    );
  });
};

export const getExpiringItems = (
  days: number = 30,
): FranchiseeInventoryItem[] => {
  const checkDate = new Date();
  checkDate.setDate(checkDate.getDate() + days);

  return mockInventoryItems.filter((item) => {
    if (!item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    return expiryDate <= checkDate;
  });
};

export const getActiveAlerts = (severity?: string): InventoryAlert[] => {
  let alerts = mockInventoryAlerts.filter((alert) => !alert.resolvedAt);

  if (severity) {
    alerts = alerts.filter((alert) => alert.severity === severity);
  }

  return alerts.sort((a, b) => {
    const severityOrder = { urgent: 4, critical: 3, warning: 2, info: 1 };
    return (
      severityOrder[b.severity as keyof typeof severityOrder] -
      severityOrder[a.severity as keyof typeof severityOrder]
    );
  });
};

export const calculateInventoryValue = (
  items: FranchiseeInventoryItem[],
): number => {
  return items.reduce((total, item) => total + item.totalValue, 0);
};

export const getInventoryTurnover = (item: FranchiseeInventoryItem): number => {
  return item.metrics.turnoverRate;
};

export const shouldReorder = (item: FranchiseeInventoryItem): boolean => {
  return item.currentStock <= item.reorderPoint;
};

export const getStockStatus = (
  item: FranchiseeInventoryItem,
): "healthy" | "low" | "critical" | "out_of_stock" => {
  const stockLevel = item.currentStock / item.maximumStock;

  if (item.currentStock === 0) return "out_of_stock";
  if (stockLevel <= 0.1) return "critical";
  if (stockLevel <= 0.3) return "low";
  return "healthy";
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const generateInventoryCode = (
  productSku: string,
  locationCode: string,
): string => {
  const timestamp = Date.now().toString().slice(-6);
  return `${productSku}-${locationCode}-${timestamp}`;
};

// Simulation Functions
export const simulateInventoryImport = async (
  sourceType: string,
  itemCount: number,
): Promise<{ success: boolean; importId: string; summary: any }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const importId = `import_${Date.now()}`;
      const successRate = Math.random() * 0.3 + 0.7; // 70-100% success rate
      const successful = Math.floor(itemCount * successRate);
      const failed = itemCount - successful;

      resolve({
        success: true,
        importId,
        summary: {
          totalItems: itemCount,
          successfulItems: successful,
          failedItems: failed,
          errors:
            failed > 0
              ? [
                  {
                    row: Math.floor(Math.random() * itemCount) + 1,
                    field: "unitCost",
                    error: "Invalid price format",
                    severity: "error",
                  },
                ]
              : [],
        },
      });
    }, 2000);
  });
};

export const simulateStockUpdate = async (
  itemId: string,
  newQuantity: number,
  reason: string,
): Promise<{ success: boolean; movement: any }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = getInventoryItemById(itemId);
      if (!item) {
        resolve({ success: false, movement: null });
        return;
      }

      const movement = {
        id: `mov_${Date.now()}`,
        inventoryItemId: itemId,
        type: newQuantity > item.currentStock ? "inbound" : "outbound",
        reason,
        quantity: newQuantity - item.currentStock,
        reference: {
          type: "adjustment",
          referenceId: `ADJ_${Date.now()}`,
          documentNumber: `MAN-${Date.now()}`,
        },
        performedBy: "current_user",
        timestamp: new Date().toISOString(),
      };

      // Update the item (in real app, this would update the database)
      item.currentStock = newQuantity;
      item.totalValue = newQuantity * item.unitCost;
      item.lastUpdated = new Date().toISOString();

      resolve({ success: true, movement });
    }, 1000);
  });
};
