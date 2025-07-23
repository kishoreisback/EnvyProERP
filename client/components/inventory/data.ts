import {
  TenantInventoryConfig,
  TenantInventoryItem,
  TenantWarehouse,
  TenantSupplier,
  TenantPurchaseOrder,
  TenantStockMovement,
  TenantInventoryAlert,
  InventoryDashboardMetrics,
  IndustryConfig
} from './types';

// Available Tenants for Inventory Management
export const inventoryAvailableTenants = [
  {
    id: 'tenant_build_001',
    name: 'BuildCorp Construction',
    type: 'Construction Company',
    industryType: 'construction' as const,
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=BuildCorp',
    color: 'bg-orange-500',
    description: 'Large-scale construction and infrastructure development',
    location: 'Mumbai, Maharashtra',
    employees: 450,
    established: '2018'
  },
  {
    id: 'tenant_metro_001',
    name: 'Metro Realty Group',
    type: 'Real Estate Development',
    industryType: 'real_estate' as const,
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Metro',
    color: 'bg-blue-500',
    description: 'Premium residential and commercial real estate',
    location: 'Gurgaon, Haryana',
    employees: 280,
    established: '2015'
  },
  {
    id: 'tenant_sky_001',
    name: 'Skyline Developers',
    type: 'Property Development',
    industryType: 'real_estate' as const,
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Skyline',
    color: 'bg-emerald-500',
    description: 'Luxury residential and mixed-use developments',
    location: 'Bangalore, Karnataka',
    employees: 320,
    established: '2016'
  }
];

// Tenant Inventory Configurations
export const tenantInventoryConfigs: TenantInventoryConfig[] = [
  {
    id: 'config_build_001',
    tenantId: 'tenant_build_001',
    tenantName: 'BuildCorp Construction',
    industryType: 'construction',
    enabledModules: [
      'items_management',
      'stock_tracking',
      'purchase_orders',
      'suppliers',
      'receiving',
      'transfers',
      'adjustments',
      'valuations',
      'reports',
      'alerts',
      'mobile_scanning'
    ],
    customCategories: [
      'Cement & Concrete',
      'Steel & Metal',
      'Electrical Materials',
      'Plumbing Materials',
      'Tools & Equipment',
      'Safety Equipment',
      'Paint & Finishing',
      'Tiles & Flooring',
      'Doors & Windows',
      'Hardware & Fasteners'
    ],
    defaultCurrency: 'INR',
    timezone: 'Asia/Kolkata',
    fiscalYearStart: '2024-04-01',
    autoReorderEnabled: true,
    lowStockThreshold: 20,
    approvalWorkflow: true,
    multiLocationEnabled: true,
    barcodeEnabled: true,
    serialNumberTracking: true,
    lotTracking: true,
    expiryTracking: false
  },
  {
    id: 'config_metro_001',
    tenantId: 'tenant_metro_001',
    tenantName: 'Metro Realty Group',
    industryType: 'real_estate',
    enabledModules: [
      'items_management',
      'stock_tracking',
      'purchase_orders',
      'suppliers',
      'receiving',
      'reports',
      'alerts'
    ],
    customCategories: [
      'Marketing Materials',
      'Office Supplies',
      'Furniture & Fixtures',
      'IT Equipment',
      'Maintenance Supplies',
      'Landscaping Materials',
      'Security Equipment',
      'Signage & Branding',
      'Cleaning Supplies',
      'Stationery'
    ],
    defaultCurrency: 'INR',
    timezone: 'Asia/Kolkata',
    fiscalYearStart: '2024-04-01',
    autoReorderEnabled: false,
    lowStockThreshold: 10,
    approvalWorkflow: true,
    multiLocationEnabled: true,
    barcodeEnabled: false,
    serialNumberTracking: true,
    lotTracking: false,
    expiryTracking: true
  },
  {
    id: 'config_sky_001',
    tenantId: 'tenant_sky_001',
    tenantName: 'Skyline Developers',
    industryType: 'real_estate',
    enabledModules: [
      'items_management',
      'stock_tracking',
      'purchase_orders',
      'suppliers',
      'receiving',
      'transfers',
      'valuations',
      'reports',
      'alerts'
    ],
    customCategories: [
      'Luxury Finishes',
      'Premium Materials',
      'High-end Fixtures',
      'Designer Hardware',
      'Smart Home Tech',
      'Landscaping Supplies',
      'Marketing Collaterals',
      'Office Equipment',
      'Maintenance Tools',
      'Safety Equipment'
    ],
    defaultCurrency: 'INR',
    timezone: 'Asia/Kolkata',
    fiscalYearStart: '2024-04-01',
    autoReorderEnabled: true,
    lowStockThreshold: 15,
    approvalWorkflow: true,
    multiLocationEnabled: true,
    barcodeEnabled: true,
    serialNumberTracking: true,
    lotTracking: true,
    expiryTracking: false
  }
];

// Tenant Warehouses
export const tenantWarehouses: TenantWarehouse[] = [
  {
    id: 'wh_build_001',
    tenantId: 'tenant_build_001',
    warehouseCode: 'BC-WH-001',
    warehouseName: 'BuildCorp Main Warehouse',
    address: {
      addressLine1: 'Plot No. 45, Industrial Area Phase-2',
      addressLine2: 'Near MIDC',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      postalCode: '400058'
    },
    contactPerson: {
      name: 'Rajesh Kumar',
      designation: 'Warehouse Manager',
      email: 'rajesh.kumar@buildcorp.com',
      phone: '+91-22-28345678',
      mobile: '+91-9876543210'
    },
    warehouseType: 'main',
    capacity: {
      totalArea: 25000,
      storageArea: 20000,
      unit: 'sqft',
      palletPositions: 500,
      maxWeight: 1000,
      weightUnit: 'tons'
    },
    zones: [
      {
        id: 'zone_001',
        zoneName: 'Receiving Area',
        zoneCode: 'RCV',
        zoneType: 'receiving',
        capacity: 2500,
        currentUtilization: 1800,
        restrictions: ['No heavy machinery']
      },
      {
        id: 'zone_002',
        zoneName: 'Cement Storage',
        zoneCode: 'CEM',
        zoneType: 'storage',
        capacity: 8000,
        currentUtilization: 6200,
        restrictions: ['Dry storage only', 'Covered area']
      },
      {
        id: 'zone_003',
        zoneName: 'Steel Storage',
        zoneCode: 'STL',
        zoneType: 'storage',
        capacity: 6000,
        currentUtilization: 4500,
        restrictions: ['Heavy duty floor', 'Overhead crane access']
      },
      {
        id: 'zone_004',
        zoneName: 'Tools & Equipment',
        zoneCode: 'TOL',
        zoneType: 'storage',
        capacity: 2000,
        currentUtilization: 1200,
        restrictions: ['Secured area', 'Climate controlled']
      },
      {
        id: 'zone_005',
        zoneName: 'Dispatch Area',
        zoneCode: 'DIS',
        zoneType: 'shipping',
        capacity: 1500,
        currentUtilization: 800,
        restrictions: ['Vehicle access required']
      }
    ],
    operatingHours: {
      monday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
      tuesday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
      wednesday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
      thursday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
      friday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
      saturday: { isOpen: true, openTime: '08:00', closeTime: '16:00' },
      sunday: { isOpen: false }
    },
    facilities: [
      'Loading Dock',
      'Overhead Cranes',
      'Security System',
      'Fire Safety',
      'Climate Control',
      'Office Space',
      'Parking Area',
      'Quality Lab'
    ],
    isActive: true,
    coordinates: {
      lat: 19.0760,
      lng: 72.8777
    }
  },
  {
    id: 'wh_metro_001',
    tenantId: 'tenant_metro_001',
    warehouseCode: 'MR-WH-001',
    warehouseName: 'Metro Central Store',
    address: {
      addressLine1: 'Office Complex, Sector 32',
      city: 'Gurgaon',
      state: 'Haryana',
      country: 'India',
      postalCode: '122001'
    },
    contactPerson: {
      name: 'Priya Sharma',
      designation: 'Store Supervisor',
      email: 'priya.sharma@metrorealty.com',
      phone: '+91-124-4567890',
      mobile: '+91-9876543211'
    },
    warehouseType: 'main',
    capacity: {
      totalArea: 5000,
      storageArea: 4000,
      unit: 'sqft',
      palletPositions: 100,
      maxWeight: 50,
      weightUnit: 'tons'
    },
    zones: [
      {
        id: 'zone_mr_001',
        zoneName: 'Marketing Materials',
        zoneCode: 'MKT',
        zoneType: 'storage',
        capacity: 1500,
        currentUtilization: 900,
        restrictions: ['Climate controlled']
      },
      {
        id: 'zone_mr_002',
        zoneName: 'Office Supplies',
        zoneCode: 'OFF',
        zoneType: 'storage',
        capacity: 1000,
        currentUtilization: 650,
        restrictions: ['Organized shelving']
      },
      {
        id: 'zone_mr_003',
        zoneName: 'IT Equipment',
        zoneCode: 'ITE',
        zoneType: 'storage',
        capacity: 800,
        currentUtilization: 450,
        restrictions: ['Secured area', 'Anti-static flooring']
      },
      {
        id: 'zone_mr_004',
        zoneName: 'General Storage',
        zoneCode: 'GEN',
        zoneType: 'storage',
        capacity: 700,
        currentUtilization: 400,
        restrictions: []
      }
    ],
    operatingHours: {
      monday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      tuesday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      wednesday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      thursday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      friday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      saturday: { isOpen: true, openTime: '09:00', closeTime: '14:00' },
      sunday: { isOpen: false }
    },
    facilities: [
      'Security System',
      'Air Conditioning',
      'Office Space',
      'Parking'
    ],
    isActive: true,
    coordinates: {
      lat: 28.4595,
      lng: 77.0266
    }
  }
];

// Sample Inventory Items for BuildCorp Construction
export const buildCorpInventoryItems: TenantInventoryItem[] = [
  {
    id: 'item_bc_001',
    tenantId: 'tenant_build_001',
    itemCode: 'CEM-OPC53-001',
    itemName: 'OPC 53 Grade Cement',
    description: 'Ordinary Portland Cement Grade 53 for high-strength construction',
    category: 'Cement & Concrete',
    subCategory: 'OPC Cement',
    brand: 'UltraTech',
    model: '53 Grade',
    sku: 'UTC-OPC53-50KG',
    barcode: '8901030875632',
    
    unitPrice: 350.00,
    currency: 'INR',
    costPrice: 345.00,
    valuationMethod: 'FIFO',
    
    currentStock: 2450,
    reservedStock: 150,
    availableStock: 2300,
    unit: 'Bags',
    alternativeUnits: [
      { unit: 'Tons', conversionFactor: 20, isDefault: false },
      { unit: 'KG', conversionFactor: 0.02, isDefault: false }
    ],
    
    minStockLevel: 500,
    maxStockLevel: 5000,
    reorderPoint: 750,
    reorderQuantity: 2000,
    
    primaryLocationId: 'wh_build_001',
    alternateLocations: ['zone_002'],
    storageRequirements: {
      storageType: 'ambient',
      specialConditions: ['Keep dry', 'Covered storage', 'Away from moisture']
    },
    
    qualityGrade: 'IS 12269:2013',
    specifications: [
      { name: 'Compressive Strength', value: '53', unit: 'MPa' },
      { name: 'Setting Time', value: '30', unit: 'minutes' },
      { name: 'Fineness', value: '225', unit: 'm²/kg' }
    ],
    certifications: ['BIS Certification', 'ISO 9001:2015'],
    complianceStandards: ['IS 12269:2013', 'BIS Standards'],
    
    isActive: true,
    isTrackable: true,
    isConsumable: true,
    isForSale: false,
    taxCategory: 'HSN 25231000',
    hsn_sac_code: '25231000',
    
    createdAt: '2024-01-15T08:00:00Z',
    createdBy: 'admin@buildcorp.com',
    lastUpdatedAt: '2024-01-20T14:30:00Z',
    lastUpdatedBy: 'manager@buildcorp.com',
    
    images: [
      'https://api.dicebear.com/7.x/shapes/svg?seed=cement1',
      'https://api.dicebear.com/7.x/shapes/svg?seed=cement2'
    ],
    documents: [],
    
    customFields: {
      manufacturer_batch: 'UTC-2024-001',
      quality_certificate: 'QC-2024-001',
      environmental_clearance: 'EC-2024-001'
    }
  },
  {
    id: 'item_bc_002',
    tenantId: 'tenant_build_001',
    itemCode: 'STL-TMT-500',
    itemName: 'TMT Steel Bars 16mm',
    description: 'Thermo Mechanically Treated steel bars for reinforcement',
    category: 'Steel & Metal',
    subCategory: 'TMT Bars',
    brand: 'TATA Steel',
    model: 'Fe 500D',
    sku: 'TATA-TMT16-12M',
    barcode: '8901019365478',
    
    unitPrice: 65000.00,
    currency: 'INR',
    costPrice: 63500.00,
    valuationMethod: 'Weighted_Average',
    
    currentStock: 850,
    reservedStock: 50,
    availableStock: 800,
    unit: 'Tons',
    alternativeUnits: [
      { unit: 'Pieces', conversionFactor: 83.33, isDefault: false },
      { unit: 'KG', conversionFactor: 0.001, isDefault: false }
    ],
    
    minStockLevel: 100,
    maxStockLevel: 1000,
    reorderPoint: 200,
    reorderQuantity: 500,
    
    primaryLocationId: 'wh_build_001',
    alternateLocations: ['zone_003'],
    storageRequirements: {
      storageType: 'ambient',
      specialConditions: ['Covered storage', 'Rust prevention', 'Proper stacking']
    },
    
    qualityGrade: 'Fe 500D',
    specifications: [
      { name: 'Yield Strength', value: '500', unit: 'MPa' },
      { name: 'Diameter', value: '16', unit: 'mm' },
      { name: 'Length', value: '12', unit: 'm' }
    ],
    certifications: ['BIS Certification', 'ISO 9001:2015'],
    complianceStandards: ['IS 1786:2008', 'BIS Standards'],
    
    isActive: true,
    isTrackable: true,
    isConsumable: true,
    isForSale: false,
    taxCategory: 'HSN 72142000',
    hsn_sac_code: '72142000',
    
    createdAt: '2024-01-15T08:00:00Z',
    createdBy: 'admin@buildcorp.com',
    lastUpdatedAt: '2024-01-18T10:15:00Z',
    lastUpdatedBy: 'manager@buildcorp.com',
    
    images: [
      'https://api.dicebear.com/7.x/shapes/svg?seed=steel1'
    ],
    documents: [],
    
    customFields: {
      heat_number: 'HN-2024-001',
      mill_certificate: 'MC-2024-001',
      grade_certificate: 'GC-Fe500D-2024'
    }
  },
  {
    id: 'item_bc_003',
    tenantId: 'tenant_build_001',
    itemCode: 'TLS-PWR-DRL',
    itemName: 'Heavy Duty Power Drill',
    description: 'Professional grade hammer drill for construction work',
    category: 'Tools & Equipment',
    subCategory: 'Power Tools',
    brand: 'Bosch',
    model: 'GSB 16 RE',
    sku: 'BOSCH-GSB16RE',
    barcode: '3165140469449',
    serialNumber: 'BSH-2024-001',
    
    unitPrice: 8500.00,
    currency: 'INR',
    costPrice: 7800.00,
    valuationMethod: 'Standard_Cost',
    
    currentStock: 25,
    reservedStock: 3,
    availableStock: 22,
    unit: 'Pieces',
    
    minStockLevel: 5,
    maxStockLevel: 50,
    reorderPoint: 8,
    reorderQuantity: 20,
    
    primaryLocationId: 'wh_build_001',
    alternateLocations: ['zone_004'],
    storageRequirements: {
      storageType: 'controlled',
      specialConditions: ['Secure storage', 'Tool maintenance area']
    },
    
    qualityGrade: 'Professional Grade',
    specifications: [
      { name: 'Power', value: '700', unit: 'W' },
      { name: 'Chuck Size', value: '13', unit: 'mm' },
      { name: 'Impact Rate', value: '44800', unit: 'bpm' }
    ],
    certifications: ['CE Marking', 'ISO 9001'],
    
    isActive: true,
    isTrackable: true,
    isConsumable: false,
    isForSale: false,
    taxCategory: 'HSN 84672990',
    hsn_sac_code: '84672990',
    
    createdAt: '2024-01-15T08:00:00Z',
    createdBy: 'admin@buildcorp.com',
    lastUpdatedAt: '2024-01-16T12:00:00Z',
    lastUpdatedBy: 'manager@buildcorp.com',
    
    images: [
      'https://api.dicebear.com/7.x/shapes/svg?seed=drill1'
    ],
    documents: [
      {
        id: 'doc_001',
        fileName: 'warranty_certificate.pdf',
        fileType: 'application/pdf',
        fileSize: 1024,
        url: '/documents/warranty_certificate.pdf',
        uploadedAt: '2024-01-15T08:00:00Z',
        uploadedBy: 'admin@buildcorp.com',
        category: 'warranty'
      }
    ],
    
    customFields: {
      warranty_period: '2 years',
      service_center: 'Bosch Service Center Mumbai',
      purchase_date: '2024-01-15'
    }
  }
];

// Sample Inventory Items for Metro Realty
export const metroRealtyInventoryItems: TenantInventoryItem[] = [
  {
    id: 'item_mr_001',
    tenantId: 'tenant_metro_001',
    itemCode: 'MKT-BRC-001',
    itemName: 'Premium Project Brochures',
    description: 'High-quality marketing brochures for luxury projects',
    category: 'Marketing Materials',
    subCategory: 'Brochures',
    brand: 'PrintPro',
    sku: 'PP-BRCH-A4-GLOSS',
    
    unitPrice: 25.00,
    currency: 'INR',
    costPrice: 22.00,
    valuationMethod: 'FIFO',
    
    currentStock: 5000,
    reservedStock: 200,
    availableStock: 4800,
    unit: 'Pieces',
    
    minStockLevel: 1000,
    maxStockLevel: 10000,
    reorderPoint: 2000,
    reorderQuantity: 5000,
    
    primaryLocationId: 'wh_metro_001',
    alternateLocations: ['zone_mr_001'],
    storageRequirements: {
      storageType: 'controlled',
      specialConditions: ['Climate controlled', 'Flat storage', 'Away from humidity']
    },
    
    expiryDate: '2024-12-31',
    
    isActive: true,
    isTrackable: true,
    isConsumable: true,
    isForSale: false,
    taxCategory: 'HSN 49011000',
    hsn_sac_code: '49011000',
    
    createdAt: '2024-01-10T09:00:00Z',
    createdBy: 'admin@metrorealty.com',
    lastUpdatedAt: '2024-01-20T15:30:00Z',
    lastUpdatedBy: 'marketing@metrorealty.com',
    
    images: [
      'https://api.dicebear.com/7.x/shapes/svg?seed=brochure1'
    ],
    documents: [],
    
    customFields: {
      design_version: 'V2.1',
      approved_by: 'Marketing Head',
      print_quality: 'Premium Gloss'
    }
  },
  {
    id: 'item_mr_002',
    tenantId: 'tenant_metro_001',
    itemCode: 'OFF-STA-001',
    itemName: 'Office Stationery Kit',
    description: 'Complete stationery kit for office use',
    category: 'Office Supplies',
    subCategory: 'Stationery',
    brand: 'Generic',
    sku: 'OFF-KIT-STD',
    
    unitPrice: 150.00,
    currency: 'INR',
    costPrice: 135.00,
    valuationMethod: 'Weighted_Average',
    
    currentStock: 80,
    reservedStock: 5,
    availableStock: 75,
    unit: 'Kits',
    
    minStockLevel: 20,
    maxStockLevel: 200,
    reorderPoint: 30,
    reorderQuantity: 100,
    
    primaryLocationId: 'wh_metro_001',
    alternateLocations: ['zone_mr_002'],
    
    isActive: true,
    isTrackable: true,
    isConsumable: true,
    isForSale: false,
    taxCategory: 'HSN 48201000',
    hsn_sac_code: '48201000',
    
    createdAt: '2024-01-12T10:00:00Z',
    createdBy: 'admin@metrorealty.com',
    lastUpdatedAt: '2024-01-19T11:20:00Z',
    lastUpdatedBy: 'office@metrorealty.com',
    
    images: [],
    documents: [],
    
    customFields: {
      kit_contents: 'Pens, Pencils, Erasers, Notebooks, Staplers',
      supplier_code: 'SUP-001'
    }
  }
];

// Tenant Suppliers
export const tenantSuppliers: TenantSupplier[] = [
  {
    id: 'sup_bc_001',
    tenantId: 'tenant_build_001',
    supplierCode: 'SUP-UTC-001',
    supplierName: 'UltraTech Cement Limited',
    contactPerson: {
      name: 'Amit Sharma',
      designation: 'Regional Sales Manager',
      email: 'amit.sharma@ultratech.com',
      phone: '+91-22-28901234',
      mobile: '+91-9876543221'
    },
    address: {
      addressLine1: 'Ultratech House, B-Wing',
      addressLine2: 'Ahura Centre, Mahakali Caves Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      postalCode: '400093'
    },
    supplierType: 'manufacturer',
    paymentTerms: {
      termType: 'net',
      creditDays: 30,
      discountPercent: 2,
      discountDays: 10
    },
    deliveryTerms: 'FOB Warehouse',
    leadTime: 7,
    minimumOrderValue: 100000,
    currency: 'INR',
    creditLimit: 5000000,
    creditRating: 'excellent',
    isPreferred: true,
    isActive: true,
    categories: ['Cement & Concrete'],
    documents: [],
    performance: {
      deliveryRating: 4.5,
      qualityRating: 4.8,
      serviceRating: 4.6,
      priceCompetitiveness: 4.2,
      totalOrders: 156,
      onTimeDeliveryPercent: 92,
      qualityRejectPercent: 0.5,
      lastEvaluationDate: '2024-01-15'
    },
    bankDetails: {
      bankName: 'HDFC Bank',
      branchName: 'Andheri West',
      accountNumber: '50200012345678',
      ifscCode: 'HDFC0001234',
      accountType: 'current'
    },
    taxDetails: {
      gstNumber: '27AAACH2702R1Z8',
      panNumber: 'AAACH2702R',
      taxType: 'gst'
    },
    certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'BIS Certification']
  },
  {
    id: 'sup_mr_001',
    tenantId: 'tenant_metro_001',
    supplierCode: 'SUP-PP-001',
    supplierName: 'PrintPro Marketing Solutions',
    contactPerson: {
      name: 'Neha Gupta',
      designation: 'Business Development Manager',
      email: 'neha.gupta@printpro.com',
      phone: '+91-124-4567890',
      mobile: '+91-9876543222'
    },
    address: {
      addressLine1: 'Plot 15, Sector 18',
      city: 'Gurgaon',
      state: 'Haryana',
      country: 'India',
      postalCode: '122015'
    },
    supplierType: 'distributor',
    paymentTerms: {
      termType: 'net',
      creditDays: 15,
      discountPercent: 1,
      discountDays: 7
    },
    deliveryTerms: 'Door Delivery',
    leadTime: 3,
    minimumOrderValue: 10000,
    currency: 'INR',
    creditLimit: 500000,
    creditRating: 'good',
    isPreferred: true,
    isActive: true,
    categories: ['Marketing Materials', 'Office Supplies'],
    documents: [],
    performance: {
      deliveryRating: 4.2,
      qualityRating: 4.0,
      serviceRating: 4.3,
      priceCompetitiveness: 4.1,
      totalOrders: 45,
      onTimeDeliveryPercent: 88,
      qualityRejectPercent: 1.2,
      lastEvaluationDate: '2024-01-10'
    },
    taxDetails: {
      gstNumber: '06AABCP1234Q1Z5',
      panNumber: 'AABCP1234Q',
      taxType: 'gst'
    }
  }
];

// Dashboard Metrics
export const buildCorpDashboardMetrics: InventoryDashboardMetrics = {
  totalItems: 450,
  totalValue: 12500000,
  lowStockItems: 23,
  outOfStockItems: 3,
  expiringItems: 0,
  pendingOrders: 8,
  pendingReceiving: 5,
  averageStockTurnover: 6.2,
  warehouseUtilization: 78.5,
  supplierPerformance: 88.2,
  costVariance: -2.3,
  monthlyConsumption: 2100000,
  topMovingItems: [
    {
      itemId: 'item_bc_001',
      itemCode: 'CEM-OPC53-001',
      itemName: 'OPC 53 Grade Cement',
      category: 'Cement & Concrete',
      quantity: 1200,
      value: 420000,
      turnoverRatio: 8.5
    },
    {
      itemId: 'item_bc_002',
      itemCode: 'STL-TMT-500',
      itemName: 'TMT Steel Bars 16mm',
      category: 'Steel & Metal',
      quantity: 150,
      value: 975000,
      turnoverRatio: 5.2
    }
  ],
  categoryDistribution: [
    { category: 'Cement & Concrete', itemCount: 85, totalValue: 4200000, percentage: 33.6 },
    { category: 'Steel & Metal', itemCount: 120, totalValue: 3800000, percentage: 30.4 },
    { category: 'Tools & Equipment', itemCount: 95, totalValue: 1500000, percentage: 12.0 },
    { category: 'Electrical Materials', itemCount: 75, totalValue: 1200000, percentage: 9.6 },
    { category: 'Others', itemCount: 75, totalValue: 1800000, percentage: 14.4 }
  ],
  stockAging: [
    { ageGroup: '0-30 days', itemCount: 285, value: 8500000, percentage: 68.0 },
    { ageGroup: '31-60 days', itemCount: 95, value: 2800000, percentage: 22.4 },
    { ageGroup: '61-90 days', itemCount: 45, value: 900000, percentage: 7.2 },
    { ageGroup: '90+ days', itemCount: 25, value: 300000, percentage: 2.4 }
  ],
  alertsSummary: {
    total: 15,
    critical: 2,
    high: 5,
    medium: 6,
    low: 2,
    unresolved: 12
  }
};

export const metroRealtyDashboardMetrics: InventoryDashboardMetrics = {
  totalItems: 120,
  totalValue: 850000,
  lowStockItems: 8,
  outOfStockItems: 1,
  expiringItems: 5,
  pendingOrders: 3,
  pendingReceiving: 2,
  averageStockTurnover: 4.8,
  warehouseUtilization: 62.3,
  supplierPerformance: 85.5,
  costVariance: 1.2,
  monthlyConsumption: 180000,
  topMovingItems: [
    {
      itemId: 'item_mr_001',
      itemCode: 'MKT-BRC-001',
      itemName: 'Premium Project Brochures',
      category: 'Marketing Materials',
      quantity: 2500,
      value: 62500,
      turnoverRatio: 6.2
    }
  ],
  categoryDistribution: [
    { category: 'Marketing Materials', itemCount: 35, totalValue: 320000, percentage: 37.6 },
    { category: 'Office Supplies', itemCount: 40, totalValue: 180000, percentage: 21.2 },
    { category: 'IT Equipment', itemCount: 25, totalValue: 250000, percentage: 29.4 },
    { category: 'Others', itemCount: 20, totalValue: 100000, percentage: 11.8 }
  ],
  stockAging: [
    { ageGroup: '0-30 days', itemCount: 85, value: 580000, percentage: 68.2 },
    { ageGroup: '31-60 days', itemCount: 25, value: 180000, percentage: 21.2 },
    { ageGroup: '61-90 days', itemCount: 8, value: 70000, percentage: 8.2 },
    { ageGroup: '90+ days', itemCount: 2, value: 20000, percentage: 2.4 }
  ],
  alertsSummary: {
    total: 8,
    critical: 1,
    high: 2,
    medium: 3,
    low: 2,
    unresolved: 6
  }
};

// Industry Configurations
export const industryConfigs: IndustryConfig = {
  construction: {
    categories: [
      'Cement & Concrete',
      'Steel & Metal',
      'Electrical Materials',
      'Plumbing Materials',
      'Tools & Equipment',
      'Safety Equipment',
      'Paint & Finishing',
      'Tiles & Flooring',
      'Doors & Windows',
      'Hardware & Fasteners',
      'Insulation Materials',
      'Roofing Materials'
    ],
    units: ['Bags', 'Tons', 'Pieces', 'Meters', 'Square Feet', 'Cubic Feet', 'Liters', 'KG', 'Boxes', 'Rolls'],
    specifications: ['Grade', 'Size', 'Thickness', 'Length', 'Width', 'Capacity', 'Power Rating', 'Voltage'],
    compliance: ['BIS Standards', 'IS Codes', 'CPWD Specifications', 'Environmental Clearance']
  },
  real_estate: {
    categories: [
      'Marketing Materials',
      'Office Supplies',
      'Furniture & Fixtures',
      'IT Equipment',
      'Maintenance Supplies',
      'Landscaping Materials',
      'Security Equipment',
      'Signage & Branding',
      'Cleaning Supplies',
      'Stationery'
    ],
    units: ['Pieces', 'Boxes', 'Packs', 'Reams', 'Kits', 'Sets', 'Units', 'Liters', 'KG'],
    specifications: ['Brand', 'Model', 'Size', 'Color', 'Material', 'Capacity', 'Version'],
    compliance: ['Quality Standards', 'Brand Guidelines', 'Environmental Standards']
  },
  retail: {
    categories: [
      'Electronics',
      'Clothing & Apparel',
      'Home & Garden',
      'Health & Beauty',
      'Sports & Outdoors',
      'Books & Media',
      'Toys & Games',
      'Automotive',
      'Food & Beverages'
    ],
    units: ['Pieces', 'Boxes', 'Packs', 'Units', 'Pairs', 'Sets', 'Cartons', 'Dozens'],
    specifications: ['Brand', 'Model', 'Size', 'Color', 'Material', 'Weight', 'Dimensions'],
    compliance: ['Product Safety', 'Quality Standards', 'Import Regulations', 'Food Safety']
  },
  manufacturing: {
    categories: [
      'Raw Materials',
      'Components',
      'Packaging Materials',
      'Tools & Dies',
      'Machinery Parts',
      'Quality Control',
      'Maintenance Supplies',
      'Safety Equipment',
      'Chemicals & Lubricants'
    ],
    units: ['KG', 'Tons', 'Pieces', 'Meters', 'Liters', 'Rolls', 'Sheets', 'Coils', 'Bars'],
    specifications: ['Grade', 'Purity', 'Tensile Strength', 'Hardness', 'Composition', 'Tolerance'],
    compliance: ['ISO Standards', 'Quality Certifications', 'Environmental Standards', 'Safety Standards']
  }
};

// Helper functions for tenant-specific data
export const getTenantInventoryConfig = (tenantId: string): TenantInventoryConfig | undefined => {
  return tenantInventoryConfigs.find(config => config.tenantId === tenantId);
};

export const getTenantInventoryItems = (tenantId: string): TenantInventoryItem[] => {
  if (tenantId === 'tenant_build_001') {
    return buildCorpInventoryItems;
  } else if (tenantId === 'tenant_metro_001') {
    return metroRealtyInventoryItems;
  }
  return [];
};

export const getTenantWarehouses = (tenantId: string): TenantWarehouse[] => {
  return tenantWarehouses.filter(warehouse => warehouse.tenantId === tenantId);
};

export const getTenantSuppliers = (tenantId: string): TenantSupplier[] => {
  return tenantSuppliers.filter(supplier => supplier.tenantId === tenantId);
};

export const getTenantDashboardMetrics = (tenantId: string): InventoryDashboardMetrics => {
  if (tenantId === 'tenant_build_001') {
    return buildCorpDashboardMetrics;
  } else if (tenantId === 'tenant_metro_001') {
    return metroRealtyDashboardMetrics;
  }
  // Return default metrics for other tenants
  return buildCorpDashboardMetrics;
};

export const getIndustryConfig = (industryType: keyof IndustryConfig) => {
  return industryConfigs[industryType];
};
