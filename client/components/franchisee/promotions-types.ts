export interface PromotionScheme {
  id: string;
  name: string;
  description: string;
  type:
    | "buy_x_get_y"
    | "percentage_discount"
    | "flat_discount"
    | "combo_offer"
    | "volume_discount"
    | "loyalty_bonus"
    | "seasonal_offer";

  // Status and timing
  status: "draft" | "active" | "paused" | "expired" | "cancelled";
  validFrom: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;

  // Targeting
  targetAudience: TargetAudience;
  applicableTerritories: string[];
  franchiseeTypes: string[];

  // Conditions
  conditions: SchemeCondition[];

  // Benefits
  benefits: SchemeBenefit[];

  // Limits and restrictions
  limitations: SchemeLimitation;

  // Usage tracking
  usage: SchemeUsage;

  // Corporate settings
  corporateConfig: CorporateConfig;

  // Display and marketing
  displayConfig: DisplayConfig;

  // Analytics
  performance: SchemePerformance;
}

export interface TargetAudience {
  franchiseeCategories: ("premium" | "standard" | "basic")[];
  franchiseeTiers: ("platinum" | "gold" | "silver" | "bronze")[];
  minimumOrderValue?: number;
  minimumMonthlyVolume?: number;
  loyaltyTierRequired?: string;
  geographicRegions: string[];
  exclusions?: {
    franchiseeIds: string[];
    territories: string[];
    reasons: string[];
  };
}

export interface SchemeCondition {
  id: string;
  type:
    | "minimum_quantity"
    | "minimum_value"
    | "specific_products"
    | "category_purchase"
    | "combo_purchase"
    | "bulk_order"
    | "first_order"
    | "loyalty_points"
    | "tenure"
    | "payment_method";
  operator:
    | "equals"
    | "greater_than"
    | "less_than"
    | "greater_equal"
    | "less_equal"
    | "in"
    | "not_in"
    | "contains"
    | "between";
  value: any; // Can be number, string, array, or object
  description: string;
  isRequired: boolean;
  priority: number;
}

export interface SchemeBenefit {
  id: string;
  type:
    | "percentage_discount"
    | "flat_discount"
    | "free_product"
    | "bonus_quantity"
    | "loyalty_points"
    | "free_shipping"
    | "extended_credit"
    | "priority_delivery"
    | "bulk_pricing";
  value: number | string;
  applicableTo:
    | "all"
    | "specific_products"
    | "categories"
    | "order_total"
    | "shipping";
  applicableItems?: string[];
  maxBenefit?: number;
  description: string;
  calculationMethod: "auto" | "manual" | "tiered";
  isStackable: boolean;
}

export interface SchemeLimitation {
  maxUsagePerFranchisee?: number;
  maxUsageGlobal?: number;
  maxDiscountAmount?: number;
  maxDiscountPercentage?: number;
  cooldownPeriod?: number; // days
  limitPerTransaction?: number;
  budgetLimit?: number;
  dailyLimit?: number;
  weeklyLimit?: number;
  monthlyLimit?: number;
}

export interface SchemeUsage {
  totalApplications: number;
  uniqueFranchisees: number;
  totalDiscountGiven: number;
  totalOrderValue: number;
  averageOrderValue: number;
  conversionRate: number;
  lastUsedAt?: string;
  topFranchisees: {
    franchiseeId: string;
    franchiseeName: string;
    usageCount: number;
    totalSavings: number;
  }[];
}

export interface CorporateConfig {
  createdBy: string;
  approvedBy?: string;
  approvalRequired: boolean;
  autoApproval: boolean;
  notificationSettings: {
    notifyOnApplication: boolean;
    notifyOnThreshold: boolean;
    thresholdPercentage: number;
    notifyOnExpiry: boolean;
    expiryWarningDays: number;
  };
  budgetTracking: {
    allocatedBudget?: number;
    spentBudget: number;
    remainingBudget?: number;
    warningThreshold: number;
  };
}

export interface DisplayConfig {
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl?: string;
  bannerUrl?: string;
  iconName?: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  badges: string[];
  featuredOrder: number;
  showInCatalog: boolean;
  showInDashboard: boolean;
  highlightAsNew: boolean;
  highlightAsPopular: boolean;
  termsAndConditions: string[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export interface SchemePerformance {
  impressions: number;
  clickThroughRate: number;
  applicationRate: number;
  completionRate: number;
  averageOrderIncrease: number;
  revenueImpact: number;
  profitabilityScore: number;
  franchiseeSatisfaction: number;
  trendsData: {
    date: string;
    applications: number;
    revenue: number;
    savings: number;
  }[];
}

// Franchisee-specific interfaces
export interface FranchiseeSchemeView {
  scheme: PromotionScheme;
  eligibilityStatus: "eligible" | "not_eligible" | "pending_approval";
  eligibilityReasons: string[];
  remainingUsage?: number;
  estimatedSavings?: number;
  applicableProducts: SchemeApplicableProduct[];
  hasUsedBefore: boolean;
  lastUsedDate?: string;
  totalSavingsToDate: number;
}

export interface SchemeApplicableProduct {
  productId: string;
  productName: string;
  currentPrice: number;
  schemePrice: number;
  savings: number;
  savingsPercentage: number;
  isInStock: boolean;
  minimumQuantity?: number;
  maxBenefitQuantity?: number;
}

export interface SchemeApplication {
  id: string;
  schemeId: string;
  franchiseeId: string;
  orderId?: string;
  status: "pending" | "approved" | "rejected" | "applied" | "expired";
  appliedAt: string;
  approvedAt?: string;
  rejectedAt?: string;

  // Application details
  requestedProducts: {
    productId: string;
    quantity: number;
    requestedPrice: number;
  }[];

  // Calculated benefits
  calculatedBenefits: {
    discountAmount: number;
    freeProducts: {
      productId: string;
      quantity: number;
    }[];
    bonusPoints: number;
    additionalBenefits: string[];
  };

  // Approval workflow
  approvalWorkflow?: {
    submittedBy: string;
    reviewedBy?: string;
    comments?: string;
    requiredDocuments?: string[];
    submittedDocuments?: string[];
  };

  // Usage tracking
  actualUsage?: {
    orderValue: number;
    discountApplied: number;
    productsOrdered: {
      productId: string;
      quantity: number;
      finalPrice: number;
    }[];
    satisfaction: number;
    feedback?: string;
  };
}

export interface SchemeRecommendation {
  schemeId: string;
  recommendationScore: number;
  reasonCode:
    | "high_value"
    | "frequent_usage"
    | "category_match"
    | "seasonal"
    | "expiring_soon"
    | "trending";
  reason: string;
  estimatedSavings: number;
  actionRequired?: string;
  urgency: "low" | "medium" | "high";
}

export interface PromotionCatalog {
  categories: SchemeCategory[];
  featuredSchemes: PromotionScheme[];
  personalizedRecommendations: SchemeRecommendation[];
  trending: PromotionScheme[];
  expiringSoon: PromotionScheme[];
  newSchemes: PromotionScheme[];
  topSaving: PromotionScheme[];
}

export interface SchemeCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  schemes: PromotionScheme[];
  totalPotentialSavings: number;
  averageDiscount: number;
}

// Corporate management interfaces
export interface CorporateSchemeManagement {
  schemes: PromotionScheme[];
  draftSchemes: PromotionScheme[];
  pendingApprovals: PromotionScheme[];
  activeSchemes: PromotionScheme[];
  expiredSchemes: PromotionScheme[];

  analytics: {
    totalSchemesCreated: number;
    activeSchemes: number;
    totalParticipatingFranchisees: number;
    totalDiscountsGiven: number;
    averageUptakeRate: number;
    topPerformingSchemes: PromotionScheme[];
    territoryPerformance: {
      territory: string;
      participationRate: number;
      totalSavings: number;
      topSchemes: string[];
    }[];
  };

  budgetOverview: {
    totalAllocated: number;
    totalSpent: number;
    remaining: number;
    projectedSpend: number;
    byCategory: {
      category: string;
      allocated: number;
      spent: number;
    }[];
  };
}

export interface SchemeTemplate {
  id: string;
  name: string;
  description: string;
  type: PromotionScheme["type"];
  defaultConditions: SchemeCondition[];
  defaultBenefits: SchemeBenefit[];
  defaultLimitations: SchemeLimitation;
  estimatedROI: number;
  popularityScore: number;
  successRate: number;
  averageUptake: number;
  suitableFor: string[];
  tags: string[];
}

// Real-time integration interfaces
export interface SchemeOrderIntegration {
  orderId: string;
  applicableSchemes: FranchiseeSchemeView[];
  autoAppliedSchemes: string[];
  manuallyAppliedSchemes: string[];
  totalSavings: number;
  finalOrderValue: number;
  warnings: string[];
  suggestions: string[];
}

export interface SchemeNotification {
  id: string;
  type:
    | "new_scheme"
    | "scheme_expiry"
    | "application_approved"
    | "application_rejected"
    | "budget_alert"
    | "performance_update";
  title: string;
  message: string;
  schemeId?: string;
  franchiseeId?: string;
  priority: "low" | "medium" | "high" | "urgent";
  actionRequired: boolean;
  actionUrl?: string;
  createdAt: string;
  readAt?: string;
}
