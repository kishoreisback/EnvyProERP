import {
  CorporateProduct,
  ProductCategory,
  FranchiseeCatalogSync,
  CatalogDashboard,
  FranchiseeCatalogSettings,
  CatalogActivity,
  CategoryStats,
  SyncMetrics,
  RegionSyncMetrics,
} from "./catalog-types";

// Mock Product Categories
export const mockProductCategories: ProductCategory[] = [
  {
    id: "cat_beverages",
    name: "Beverages",
    description:
      "All beverage products including soft drinks, energy drinks, and water",
    level: 1,
    displayOrder: 1,
    isActive: true,
    accessLevel: "public",
    regionalRestrictions: [],
    margins: {
      defaultMargin: 18,
      minMargin: 12,
      maxMargin: 25,
      recommendedMargin: 20,
      volumeBasedMargins: [
        { threshold: 100, margin: 15 },
        { threshold: 500, margin: 12 },
        { threshold: 1000, margin: 10 },
      ],
    },
  },
  {
    id: "cat_soft_drinks",
    name: "Soft Drinks",
    description: "Carbonated and non-carbonated soft drinks",
    parentCategoryId: "cat_beverages",
    level: 2,
    displayOrder: 1,
    isActive: true,
    accessLevel: "public",
    regionalRestrictions: [],
    margins: {
      defaultMargin: 20,
      minMargin: 15,
      maxMargin: 28,
      recommendedMargin: 22,
      volumeBasedMargins: [
        { threshold: 50, margin: 18 },
        { threshold: 200, margin: 15 },
        { threshold: 500, margin: 12 },
      ],
    },
  },
  {
    id: "cat_energy_drinks",
    name: "Energy Drinks",
    description: "Caffeinated energy and sports drinks",
    parentCategoryId: "cat_beverages",
    level: 2,
    displayOrder: 2,
    isActive: true,
    accessLevel: "premium",
    regionalRestrictions: ["dry_states"],
    margins: {
      defaultMargin: 25,
      minMargin: 20,
      maxMargin: 35,
      recommendedMargin: 28,
      volumeBasedMargins: [
        { threshold: 25, margin: 22 },
        { threshold: 100, margin: 20 },
        { threshold: 250, margin: 18 },
      ],
    },
  },
  {
    id: "cat_retail_merchandise",
    name: "Retail Merchandise",
    description: "Branded merchandise and promotional items",
    level: 1,
    displayOrder: 2,
    isActive: true,
    accessLevel: "public",
    regionalRestrictions: [],
    margins: {
      defaultMargin: 35,
      minMargin: 25,
      maxMargin: 50,
      recommendedMargin: 40,
      volumeBasedMargins: [
        { threshold: 10, margin: 30 },
        { threshold: 50, margin: 25 },
      ],
    },
  },
  {
    id: "cat_pos_items",
    name: "Point of Sale Items",
    description: "Impulse purchase items for checkout counters",
    level: 1,
    displayOrder: 3,
    isActive: true,
    accessLevel: "basic",
    regionalRestrictions: [],
    margins: {
      defaultMargin: 30,
      minMargin: 20,
      maxMargin: 45,
      recommendedMargin: 35,
      volumeBasedMargins: [
        { threshold: 20, margin: 25 },
        { threshold: 100, margin: 20 },
      ],
    },
  },
];

// Mock Corporate Products
export const mockCorporateProducts: CorporateProduct[] = [
  {
    id: "prod_cola_500ml",
    sku: "BEV-COLA-500-001",
    name: "Premium Cola 500ml",
    description: "Refreshing cola drink with natural flavors",
    category: mockProductCategories[1], // Soft Drinks
    subcategory: "Carbonated",
    productType: "beverage",
    beverageType: "bottle",
    specifications: {
      volume: "500ml",
      packaging: "Plastic Bottle",
      dimensions: {
        length: 6,
        width: 6,
        height: 22,
        weight: 0.52,
        unit: "cm",
        weightUnit: "kg",
      },
      ingredients: [
        "Carbonated Water",
        "Sugar",
        "Phosphoric Acid",
        "Natural Flavors",
        "Caffeine",
      ],
      nutritionalInfo: {
        servingSize: "500ml",
        calories: 210,
        totalFat: 0,
        saturatedFat: 0,
        cholesterol: 0,
        sodium: 65,
        totalCarbohydrates: 58,
        dietaryFiber: 0,
        sugars: 58,
        protein: 0,
      },
      shelfLife: 365,
      storageConditions: ["Store in cool, dry place", "Avoid direct sunlight"],
      barcodes: [
        { type: "EAN", value: "1234567890123", isPrimary: true },
        { type: "UPC", value: "123456789012", isPrimary: false },
      ],
    },
    pricing: {
      basePrice: 25,
      currency: "INR",
      priceSlabs: [
        {
          id: "slab_cola_bulk",
          name: "Bulk Purchase",
          minQuantity: 100,
          maxQuantity: 499,
          discountType: "percentage",
          discountValue: 5,
          applicableRegions: ["all"],
          franchiseTypes: ["retail", "distribution"],
          validFrom: "2024-01-01",
          isActive: true,
        },
        {
          id: "slab_cola_wholesale",
          name: "Wholesale",
          minQuantity: 500,
          discountType: "percentage",
          discountValue: 8,
          applicableRegions: ["all"],
          franchiseTypes: ["distribution", "warehouse"],
          validFrom: "2024-01-01",
          isActive: true,
        },
      ],
      volumeDiscounts: [
        {
          id: "vol_cola_monthly",
          minQuantity: 1000,
          discountPercentage: 3,
          applicablePeriod: "monthly",
        },
      ],
      taxCategory: "GST_18",
      taxRate: 18,
    },
    availability: {
      regions: [
        { regionId: "mh", regionName: "Maharashtra", isAvailable: true },
        { regionId: "ka", regionName: "Karnataka", isAvailable: true },
        { regionId: "gj", regionName: "Gujarat", isAvailable: true },
        {
          regionId: "rj",
          regionName: "Rajasthan",
          isAvailable: false,
          restrictions: ["Seasonal restriction"],
        },
      ],
      franchiseTypes: ["retail", "distribution", "hybrid"],
      minimumOrderQuantity: 24,
      maximumOrderQuantity: 10000,
      leadTime: 2,
      stockStatus: "in_stock",
    },
    images: [
      {
        id: "img_cola_primary",
        url: "/images/products/cola-500ml-primary.jpg",
        type: "product",
        altText: "Premium Cola 500ml bottle",
        isPrimary: true,
        displayOrder: 1,
      },
      {
        id: "img_cola_packaging",
        url: "/images/products/cola-500ml-crate.jpg",
        type: "packaging",
        altText: "Cola 500ml crate packaging",
        isPrimary: false,
        displayOrder: 2,
      },
    ],
    documents: [
      {
        id: "doc_cola_datasheet",
        name: "Product Datasheet",
        type: "datasheet",
        url: "/documents/cola-500ml-datasheet.pdf",
        fileSize: 2048000,
        uploadedAt: "2024-01-01T10:00:00Z",
      },
    ],
    compliance: {
      certifications: [
        {
          id: "cert_fssai",
          name: "FSSAI Certification",
          issuingBody: "Food Safety and Standards Authority of India",
          certificationNumber: "FSSAI-12345678",
          validFrom: "2024-01-01",
          validTo: "2026-12-31",
        },
      ],
      licenses: [
        {
          id: "lic_fbo",
          type: "Food Business Operator",
          licenseNumber: "FBO-123456",
          issuingAuthority: "State Food Authority",
          validFrom: "2024-01-01",
          validTo: "2025-12-31",
          regions: ["MH", "KA", "GJ"],
        },
      ],
      allergenInfo: ["May contain traces of nuts"],
      warnings: ["Contains caffeine", "Not recommended for children under 12"],
      regulatoryApprovals: [
        {
          id: "app_bis",
          authority: "Bureau of Indian Standards",
          approvalNumber: "BIS-789012",
          approvalDate: "2023-12-01",
          regions: ["all"],
        },
      ],
    },
    isActive: true,
    createdAt: "2024-01-01T10:00:00Z",
    lastModified: "2024-01-15T14:30:00Z",
    createdBy: "corp_product_manager_001",
  },
  {
    id: "prod_energy_250ml",
    sku: "BEV-ENRG-250-001",
    name: "Power Energy Drink 250ml",
    description: "High-energy drink with vitamins and taurine",
    category: mockProductCategories[2], // Energy Drinks
    subcategory: "Caffeinated",
    productType: "beverage",
    beverageType: "can",
    specifications: {
      volume: "250ml",
      packaging: "Aluminum Can",
      dimensions: {
        length: 5.3,
        width: 5.3,
        height: 12.3,
        weight: 0.28,
        unit: "cm",
        weightUnit: "kg",
      },
      ingredients: [
        "Carbonated Water",
        "Sugar",
        "Taurine",
        "Caffeine",
        "B-Vitamins",
        "Natural Flavors",
      ],
      nutritionalInfo: {
        servingSize: "250ml",
        calories: 110,
        totalFat: 0,
        saturatedFat: 0,
        cholesterol: 0,
        sodium: 105,
        totalCarbohydrates: 28,
        dietaryFiber: 0,
        sugars: 27,
        protein: 1,
        vitamins: {
          "Vitamin B3": "8mg",
          "Vitamin B6": "1mg",
          "Vitamin B12": "2.5mcg",
        },
      },
      shelfLife: 540,
      storageConditions: ["Store below 25°C", "Do not freeze"],
      barcodes: [{ type: "EAN", value: "2345678901234", isPrimary: true }],
    },
    pricing: {
      basePrice: 60,
      currency: "INR",
      priceSlabs: [
        {
          id: "slab_energy_premium",
          name: "Premium Bulk",
          minQuantity: 50,
          maxQuantity: 199,
          discountType: "percentage",
          discountValue: 3,
          applicableRegions: ["all"],
          franchiseTypes: ["retail", "distribution"],
          validFrom: "2024-01-01",
          isActive: true,
        },
      ],
      volumeDiscounts: [],
      taxCategory: "GST_28",
      taxRate: 28,
    },
    availability: {
      regions: [
        { regionId: "mh", regionName: "Maharashtra", isAvailable: true },
        { regionId: "ka", regionName: "Karnataka", isAvailable: true },
        {
          regionId: "dl",
          regionName: "Delhi",
          isAvailable: false,
          restrictions: ["Age verification required"],
        },
      ],
      franchiseTypes: ["retail", "distribution"],
      minimumOrderQuantity: 12,
      maximumOrderQuantity: 5000,
      leadTime: 3,
      stockStatus: "in_stock",
    },
    images: [
      {
        id: "img_energy_primary",
        url: "/images/products/energy-250ml-primary.jpg",
        type: "product",
        altText: "Power Energy Drink 250ml can",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    documents: [],
    compliance: {
      certifications: [
        {
          id: "cert_fssai_energy",
          name: "FSSAI Certification",
          issuingBody: "Food Safety and Standards Authority of India",
          certificationNumber: "FSSAI-87654321",
          validFrom: "2024-01-01",
          validTo: "2026-12-31",
        },
      ],
      licenses: [],
      allergenInfo: [],
      warnings: [
        "High caffeine content",
        "Not suitable for children under 18",
        "Not recommended for pregnant women",
      ],
      ageRestrictions: 18,
      regulatoryApprovals: [],
    },
    isActive: true,
    createdAt: "2024-01-05T11:00:00Z",
    lastModified: "2024-01-20T09:15:00Z",
    createdBy: "corp_product_manager_002",
  },
  {
    id: "prod_tshirt_brand",
    sku: "MERCH-TSHIRT-001",
    name: "Branded T-Shirt - Premium Cotton",
    description: "High-quality cotton t-shirt with company branding",
    category: mockProductCategories[3], // Retail Merchandise
    subcategory: "Apparel",
    productType: "merchandise",
    specifications: {
      dimensions: {
        length: 30,
        width: 25,
        height: 2,
        weight: 0.18,
        unit: "cm",
        weightUnit: "kg",
      },
      storageConditions: ["Store in dry place", "Avoid direct sunlight"],
      barcodes: [{ type: "EAN", value: "3456789012345", isPrimary: true }],
    },
    pricing: {
      basePrice: 299,
      currency: "INR",
      priceSlabs: [
        {
          id: "slab_tshirt_bulk",
          name: "Bulk Order",
          minQuantity: 25,
          maxQuantity: 99,
          discountType: "percentage",
          discountValue: 15,
          applicableRegions: ["all"],
          franchiseTypes: ["retail"],
          validFrom: "2024-01-01",
          isActive: true,
        },
        {
          id: "slab_tshirt_wholesale",
          name: "Wholesale",
          minQuantity: 100,
          discountType: "percentage",
          discountValue: 25,
          applicableRegions: ["all"],
          franchiseTypes: ["retail", "distribution"],
          validFrom: "2024-01-01",
          isActive: true,
        },
      ],
      volumeDiscounts: [],
      taxCategory: "GST_12",
      taxRate: 12,
    },
    availability: {
      regions: [
        { regionId: "all", regionName: "All Regions", isAvailable: true },
      ],
      franchiseTypes: ["retail", "distribution", "hybrid"],
      minimumOrderQuantity: 5,
      maximumOrderQuantity: 1000,
      leadTime: 7,
      stockStatus: "in_stock",
    },
    images: [
      {
        id: "img_tshirt_primary",
        url: "/images/products/tshirt-branded-primary.jpg",
        type: "product",
        altText: "Branded premium cotton t-shirt",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    documents: [],
    compliance: {
      certifications: [],
      licenses: [],
      allergenInfo: [],
      warnings: [],
      regulatoryApprovals: [],
    },
    isActive: true,
    createdAt: "2024-01-10T13:00:00Z",
    lastModified: "2024-01-18T16:45:00Z",
    createdBy: "corp_product_manager_001",
  },
];

// Mock Franchisee Catalog Syncs
export const mockFranchiseeCatalogSyncs: FranchiseeCatalogSync[] = [
  {
    id: "sync_001",
    franchiseeId: "franchise_001",
    franchiseeCode: "BH-KAR-001",
    lastSyncAt: "2024-01-20T10:30:00Z",
    syncStatus: "completed",
    syncType: "incremental",
    syncTrigger: "corporate_update",
    productsAdded: 2,
    productsUpdated: 5,
    productsRemoved: 0,
    categoriesProcessed: ["cat_soft_drinks", "cat_energy_drinks"],
    errors: [],
    syncSettings: {
      autoSync: true,
      syncFrequency: "daily",
      includedCategories: [
        "cat_soft_drinks",
        "cat_energy_drinks",
        "cat_retail_merchandise",
      ],
      excludedProducts: [],
      priceOverrides: [
        {
          productId: "prod_cola_500ml",
          overrideType: "margin_adjustment",
          value: 2,
          reason: "Local market competition",
          approvedBy: "regional_manager_001",
          validFrom: "2024-01-15T00:00:00Z",
        },
      ],
      regionalFilters: ["mh", "ka"],
      accessLevel: "premium",
      customizations: [],
    },
  },
  {
    id: "sync_002",
    franchiseeId: "franchise_002",
    franchiseeCode: "BH-MH-002",
    lastSyncAt: "2024-01-19T15:45:00Z",
    syncStatus: "failed",
    syncType: "full",
    syncTrigger: "manual",
    productsAdded: 0,
    productsUpdated: 0,
    productsRemoved: 0,
    categoriesProcessed: [],
    errors: [
      {
        productId: "prod_energy_250ml",
        errorType: "availability",
        message: "Product not available in franchisee region",
        details:
          "Energy drinks restricted in Maharashtra for this franchisee type",
        timestamp: "2024-01-19T15:47:00Z",
      },
    ],
    syncSettings: {
      autoSync: false,
      syncFrequency: "weekly",
      includedCategories: ["cat_beverages"],
      excludedProducts: ["prod_energy_250ml"],
      priceOverrides: [],
      regionalFilters: ["mh"],
      accessLevel: "basic",
      customizations: [],
    },
  },
];

// Mock Catalog Dashboard
export const mockCatalogDashboard: CatalogDashboard = {
  totalProducts: 156,
  activeProducts: 142,
  categories: 12,
  franchiseesSynced: 18,
  lastGlobalSync: "2024-01-20T10:30:00Z",
  pendingSyncs: 3,
  syncErrors: 2,
  recentActivity: [
    {
      id: "act_001",
      type: "product_added",
      description: 'New product "Premium Water 1L" added to catalog',
      timestamp: "2024-01-20T09:15:00Z",
      performedBy: "corp_product_manager_001",
      affectedItems: 1,
    },
    {
      id: "act_002",
      type: "sync_completed",
      description: "Catalog sync completed for BH-KAR-001",
      timestamp: "2024-01-20T10:30:00Z",
      performedBy: "system",
      affectedItems: 7,
      franchiseeId: "franchise_001",
    },
    {
      id: "act_003",
      type: "product_updated",
      description: "Price updated for Premium Cola 500ml",
      timestamp: "2024-01-19T14:22:00Z",
      performedBy: "corp_pricing_manager_001",
      affectedItems: 1,
    },
  ],
  topCategories: [
    {
      categoryId: "cat_soft_drinks",
      categoryName: "Soft Drinks",
      productCount: 45,
      franchiseeAdoption: 94,
      averageMargin: 22,
      revenue: 2580000,
    },
    {
      categoryId: "cat_energy_drinks",
      categoryName: "Energy Drinks",
      productCount: 18,
      franchiseeAdoption: 67,
      averageMargin: 28,
      revenue: 1890000,
    },
    {
      categoryId: "cat_retail_merchandise",
      categoryName: "Retail Merchandise",
      productCount: 32,
      franchiseeAdoption: 78,
      averageMargin: 40,
      revenue: 890000,
    },
  ],
  syncMetrics: {
    successRate: 91.2,
    averageSyncTime: 45,
    totalSyncsToday: 12,
    errorRate: 8.8,
    performanceByRegion: [
      {
        regionName: "Maharashtra",
        franchiseeCount: 8,
        syncSuccessRate: 95.5,
        averageSyncTime: 38,
        lastSyncTime: "2024-01-20T10:30:00Z",
      },
      {
        regionName: "Karnataka",
        franchiseeCount: 6,
        syncSuccessRate: 88.2,
        averageSyncTime: 52,
        lastSyncTime: "2024-01-20T09:45:00Z",
      },
      {
        regionName: "Gujarat",
        franchiseeCount: 4,
        syncSuccessRate: 89.1,
        averageSyncTime: 41,
        lastSyncTime: "2024-01-19T16:20:00Z",
      },
    ],
  },
};

// Helper Functions
export const getProductById = (id: string): CorporateProduct | undefined => {
  return mockCorporateProducts.find((product) => product.id === id);
};

export const getProductsByCategory = (
  categoryId: string,
): CorporateProduct[] => {
  return mockCorporateProducts.filter(
    (product) => product.category.id === categoryId,
  );
};

export const getCategoryById = (id: string): ProductCategory | undefined => {
  return mockProductCategories.find((category) => category.id === id);
};

export const getFranchiseeCatalogSync = (
  franchiseeId: string,
): FranchiseeCatalogSync | undefined => {
  return mockFranchiseeCatalogSyncs.find(
    (sync) => sync.franchiseeId === franchiseeId,
  );
};

export const getAvailableProductsForFranchisee = (
  franchiseeRegion: string,
  franchiseType: string,
  accessLevel: "basic" | "premium" | "exclusive",
): CorporateProduct[] => {
  return mockCorporateProducts.filter((product) => {
    // Check regional availability
    const regionAvailable =
      product.availability.regions.some(
        (region) => region.regionId === franchiseeRegion && region.isAvailable,
      ) ||
      product.availability.regions.some((region) => region.regionId === "all");

    // Check franchise type compatibility
    const franchiseTypeCompatible =
      product.availability.franchiseTypes.includes(franchiseType);

    // Check access level
    const accessLevelAllowed =
      product.category.accessLevel === "public" ||
      (product.category.accessLevel === "premium" &&
        ["premium", "exclusive"].includes(accessLevel)) ||
      (product.category.accessLevel === "exclusive" &&
        accessLevel === "exclusive");

    return (
      regionAvailable &&
      franchiseTypeCompatible &&
      accessLevelAllowed &&
      product.isActive
    );
  });
};

export const calculateFranchiseePrice = (
  product: CorporateProduct,
  quantity: number,
  franchiseType: string,
): number => {
  let price = product.pricing.basePrice;

  // Apply price slabs
  const applicableSlab = product.pricing.priceSlabs
    .filter(
      (slab) =>
        slab.isActive &&
        quantity >= slab.minQuantity &&
        (slab.maxQuantity === undefined || quantity <= slab.maxQuantity) &&
        slab.franchiseTypes.includes(franchiseType),
    )
    .sort((a, b) => b.minQuantity - a.minQuantity)[0];

  if (applicableSlab) {
    if (applicableSlab.discountType === "percentage") {
      price = price * (1 - applicableSlab.discountValue / 100);
    } else {
      price = price - applicableSlab.discountValue;
    }
  }

  // Apply volume discounts
  const applicableVolumeDiscount = product.pricing.volumeDiscounts
    .filter((discount) => quantity >= discount.minQuantity)
    .sort((a, b) => b.minQuantity - a.minQuantity)[0];

  if (applicableVolumeDiscount) {
    const discountAmount =
      price * (applicableVolumeDiscount.discountPercentage / 100);
    const maxDiscount = applicableVolumeDiscount.maxDiscount || discountAmount;
    price = price - Math.min(discountAmount, maxDiscount);
  }

  return Math.round(price * 100) / 100;
};

export const triggerCatalogSync = (
  franchiseeIds: string[],
  syncType: "full" | "incremental" | "category" | "product",
  options?: {
    categories?: string[];
    products?: string[];
    priority?: "low" | "normal" | "high";
  },
): Promise<{ syncId: string; status: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const syncId = `sync_${Date.now()}`;
      resolve({
        syncId,
        status: "initiated",
      });
    }, 1000);
  });
};

export const validateProductAvailability = (
  productId: string,
  franchiseeRegion: string,
  franchiseType: string,
): { available: boolean; reasons: string[] } => {
  const product = getProductById(productId);
  if (!product) {
    return { available: false, reasons: ["Product not found"] };
  }

  const reasons: string[] = [];

  // Check if product is active
  if (!product.isActive) {
    reasons.push("Product is discontinued");
  }

  // Check regional availability
  const regionAvailable = product.availability.regions.some(
    (region) =>
      (region.regionId === franchiseeRegion || region.regionId === "all") &&
      region.isAvailable,
  );
  if (!regionAvailable) {
    reasons.push("Product not available in your region");
  }

  // Check franchise type compatibility
  if (!product.availability.franchiseTypes.includes(franchiseType)) {
    reasons.push("Product not available for your franchise type");
  }

  // Check stock status
  if (product.availability.stockStatus === "out_of_stock") {
    reasons.push("Product is out of stock");
  }

  return {
    available: reasons.length === 0,
    reasons,
  };
};
