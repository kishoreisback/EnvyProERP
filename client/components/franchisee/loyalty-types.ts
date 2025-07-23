export interface LoyaltyProgram {
  id: string;
  programName: string;
  description: string;
  isActive: boolean;

  // Point system configuration
  pointsConfig: PointsConfiguration;

  // Tier system
  tierSystem: TierSystem;

  // Redemption options
  redemptionOptions: RedemptionOption[];

  // Rules and policies
  programRules: ProgramRules;

  // Analytics
  programAnalytics: ProgramAnalytics;
}

export interface PointsConfiguration {
  earningRules: PointEarningRule[];
  conversionRates: {
    orderValueToPoints: number; // Points per rupee
    pointsToRupees: number; // Rupees per point for redemption
  };
  bonusMultipliers: BonusMultiplier[];
  expirationPolicy: {
    enabled: boolean;
    expirationPeriod: number; // days
    warningPeriod: number; // days before expiration
    gracePeriod: number; // days after expiration
  };
}

export interface PointEarningRule {
  id: string;
  name: string;
  description: string;
  type:
    | "order_value"
    | "product_category"
    | "special_action"
    | "milestone"
    | "referral"
    | "review"
    | "loyalty_tier"
    | "bulk_order"
    | "payment_method";
  conditions: EarningCondition[];
  pointsAwarded: number | "percentage" | "multiplier";
  pointsCalculation: string; // Formula or fixed amount
  isActive: boolean;
  validFrom: string;
  validUntil?: string;
  maxPointsPerTransaction?: number;
  maxPointsPerDay?: number;
  cooldownPeriod?: number; // hours
}

export interface EarningCondition {
  field: string;
  operator:
    | "equals"
    | "greater_than"
    | "less_than"
    | "in"
    | "contains"
    | "between";
  value: any;
  description: string;
}

export interface BonusMultiplier {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  triggers: BonusMultiplierTrigger[];
  isActive: boolean;
  validFrom: string;
  validUntil?: string;
  maxApplications?: number;
  cooldownPeriod?: number; // days
}

export interface BonusMultiplierTrigger {
  type:
    | "first_order"
    | "consecutive_orders"
    | "order_frequency"
    | "category_focus"
    | "volume_threshold"
    | "seasonal"
    | "special_event"
    | "tier_upgrade";
  conditions: Record<string, any>;
  description: string;
}

export interface TierSystem {
  isEnabled: boolean;
  tiers: LoyaltyTier[];
  tierUpgradeRules: TierUpgradeRule[];
  tierDowngradeRules: TierDowngradeRule[];
  evaluationPeriod: "monthly" | "quarterly" | "annually";
  gracePeriod: number; // days to maintain tier after downgrade threshold
}

export interface LoyaltyTier {
  id: string;
  name: string;
  description: string;
  color: string;
  iconName: string;
  requirements: TierRequirement[];
  benefits: TierBenefit[];
  pointsMultiplier: number;
  orderIndex: number;
  isDefault: boolean;
  upgradeMessage: string;
  maintenanceMessage: string;
}

export interface TierRequirement {
  type:
    | "points_earned"
    | "order_count"
    | "order_value"
    | "tenure"
    | "consistency"
    | "product_diversity";
  period: "lifetime" | "12_months" | "6_months" | "3_months" | "monthly";
  threshold: number;
  description: string;
}

export interface TierBenefit {
  id: string;
  type:
    | "discount_percentage"
    | "bonus_points"
    | "free_shipping"
    | "priority_support"
    | "extended_credit"
    | "exclusive_products"
    | "early_access"
    | "personal_manager";
  value: number | string;
  description: string;
  isAutomatic: boolean;
  requiresActivation: boolean;
}

export interface TierUpgradeRule {
  fromTierId: string;
  toTierId: string;
  requirements: TierRequirement[];
  evaluationFrequency: "real_time" | "daily" | "weekly" | "monthly";
  notificationSettings: {
    notifyFranchisee: boolean;
    notifyCorporate: boolean;
    celebrationMessage: string;
  };
}

export interface TierDowngradeRule {
  fromTierId: string;
  toTierId: string;
  thresholds: TierRequirement[];
  gracePeriod: number; // days
  warningPeriod: number; // days before downgrade
  notificationSettings: {
    notifyFranchisee: boolean;
    warningMessage: string;
    downgradeMessage: string;
  };
}

export interface RedemptionOption {
  id: string;
  name: string;
  description: string;
  type:
    | "discount"
    | "free_product"
    | "cash_equivalent"
    | "purchase_order_credit"
    | "shipping_waiver"
    | "service_credit"
    | "gift_voucher"
    | "experience";

  // Redemption configuration
  pointsRequired: number;
  monetaryValue: number;
  isActive: boolean;
  availability: RedemptionAvailability;

  // Restrictions
  restrictions: RedemptionRestriction[];

  // Terms
  termsAndConditions: string[];
  validityPeriod?: number; // days after redemption

  // Display
  imageUrl?: string;
  category: string;
  popularity: number;
  isNew: boolean;
  isFeatured: boolean;
  isTrending: boolean;
}

export interface RedemptionAvailability {
  stockLevel?: number; // For physical items
  maxRedemptionsPerFranchisee?: number;
  maxRedemptionsGlobal?: number;
  dailyLimit?: number;
  monthlyLimit?: number;
  tierRestrictions?: string[]; // Tier IDs that can redeem
  territoryRestrictions?: string[];
  validFrom: string;
  validUntil?: string;
}

export interface RedemptionRestriction {
  type:
    | "minimum_order_value"
    | "specific_products"
    | "product_categories"
    | "frequency_limit"
    | "tier_requirement"
    | "tenure_requirement";
  value: any;
  description: string;
}

export interface ProgramRules {
  generalTerms: string[];
  pointsTransferability: {
    canTransfer: boolean;
    transferFee: number; // percentage
    minimumTransfer: number;
    maximumTransfer: number;
    allowedRecipients:
      | "any_franchisee"
      | "same_territory"
      | "same_tier"
      | "none";
  };
  pointsInheritance: {
    onFranchiseTransfer: "transfer" | "forfeit" | "partial";
    onOwnershipChange: "transfer" | "forfeit" | "freeze";
    onTermination: "forfeit" | "grace_period" | "convert_to_cash";
    gracePeriodDays: number;
  };
  disputeResolution: {
    disputeWindow: number; // days
    escalationProcess: string[];
    autoResolutionRules: string[];
  };
  dataRetention: {
    pointsHistoryRetention: number; // months
    transactionHistoryRetention: number; // months
    analyticsDataRetention: number; // months
  };
}

export interface ProgramAnalytics {
  participationMetrics: {
    totalEnrolledFranchisees: number;
    activeParticipants: number; // Earned points in last 3 months
    participationRate: number; // percentage
    newEnrollmentsThisMonth: number;
  };

  pointsMetrics: {
    totalPointsIssued: number;
    totalPointsRedeemed: number;
    outstandingPoints: number;
    pointsExpiredThisMonth: number;
    averagePointsPerFranchisee: number;
    pointsIssuanceRate: number; // per month
    redemptionRate: number; // percentage of earned points redeemed
  };

  financialMetrics: {
    totalMonetaryValueIssued: number;
    totalMonetaryValueRedeemed: number;
    averageRedemptionValue: number;
    costPerPoint: number;
    programROI: number;
    liabilityOnBooks: number; // unredeemed points value
  };

  behaviorMetrics: {
    averageOrderValueIncrease: number; // percentage
    orderFrequencyIncrease: number; // percentage
    customerLifetimeValueIncrease: number; // percentage
    tierUpgradeRate: number; // percentage per year
    churnReduction: number; // percentage
  };

  redemptionMetrics: {
    topRedemptionCategories: {
      category: string;
      redemptions: number;
      pointsValue: number;
    }[];
    averageTimeToRedemption: number; // days
    redemptionConversionRate: number; // percentage
    popularRedemptionOptions: RedemptionOption[];
  };
}

// Franchisee-specific interfaces
export interface FranchiseeLoyaltyAccount {
  franchiseeId: string;
  franchiseeName: string;
  enrollmentDate: string;
  currentTier: LoyaltyTier;

  // Points summary
  pointsBalance: {
    available: number;
    pending: number; // From recent orders not yet confirmed
    reserved: number; // Points reserved for ongoing redemptions
    expiring: {
      points: number;
      expiryDate: string;
    }[];
  };

  // Historical data
  pointsHistory: PointsTransaction[];
  redemptionHistory: RedemptionTransaction[];
  tierHistory: TierChangeHistory[];

  // Current status
  tierProgress: TierProgress;

  // Preferences
  preferences: LoyaltyPreferences;

  // Analytics
  accountAnalytics: AccountAnalytics;
}

export interface PointsTransaction {
  id: string;
  type: "earned" | "redeemed" | "expired" | "adjusted" | "bonus" | "penalty";
  points: number;
  orderId?: string;
  orderValue?: number;
  earningRule?: string;
  redemptionOption?: string;
  description: string;
  timestamp: string;
  expiresAt?: string;
  isReversible: boolean;
  reversalReason?: string;
  metadata?: Record<string, any>;
}

export interface RedemptionTransaction {
  id: string;
  redemptionOptionId: string;
  redemptionOptionName: string;
  pointsUsed: number;
  monetaryValue: number;
  status: "pending" | "confirmed" | "fulfilled" | "cancelled" | "expired";
  requestedAt: string;
  fulfilledAt?: string;
  cancellationReason?: string;
  orderId?: string; // If redeemed as order credit
  voucherCode?: string; // If redeemed as voucher
  expiresAt?: string;
  metadata?: Record<string, any>;
}

export interface TierChangeHistory {
  id: string;
  fromTier?: string;
  toTier: string;
  changeType: "upgrade" | "downgrade" | "manual_adjustment";
  reason: string;
  effectiveDate: string;
  triggerMetrics?: Record<string, number>;
  benefitsGained?: TierBenefit[];
  benefitsLost?: TierBenefit[];
}

export interface TierProgress {
  currentTier: LoyaltyTier;
  nextTier?: LoyaltyTier;
  progress: {
    requirementType: string;
    current: number;
    required: number;
    percentage: number;
    description: string;
  }[];
  estimatedUpgradeDate?: string;
  riskOfDowngrade: {
    isAtRisk: boolean;
    gracePeriodEnds?: string;
    requirementsToMaintain: {
      requirementType: string;
      current: number;
      required: number;
      shortfall: number;
    }[];
  };
}

export interface LoyaltyPreferences {
  notifications: {
    pointsEarned: boolean;
    pointsExpiring: boolean;
    tierUpgrade: boolean;
    tierDowngrade: boolean;
    newRedemptionOptions: boolean;
    specialOffers: boolean;
  };
  communication: {
    email: boolean;
    sms: boolean;
    pushNotifications: boolean;
    inAppNotifications: boolean;
  };
  redemptionPreferences: {
    autoRedeemBeforeExpiry: boolean;
    preferredRedemptionTypes: string[];
    minimumRedemptionThreshold: number;
  };
}

export interface AccountAnalytics {
  engagementScore: number; // 0-100
  participationLevel: "low" | "medium" | "high" | "very_high";
  pointsEarningTrend: "increasing" | "decreasing" | "stable";
  redemptionBehavior: "hoarder" | "regular" | "immediate" | "strategic";
  preferredCategories: string[];
  seasonalityPattern: {
    month: number;
    activityScore: number;
  }[];
  recommendations: LoyaltyRecommendation[];
}

export interface LoyaltyRecommendation {
  id: string;
  type:
    | "earn_more_points"
    | "redeem_expiring"
    | "tier_upgrade"
    | "new_redemption"
    | "special_offer";
  title: string;
  description: string;
  actionText: string;
  actionUrl?: string;
  urgency: "low" | "medium" | "high";
  potentialValue: number;
  expiresAt?: string;
}

// Corporate management interfaces
export interface CorporateLoyaltyManagement {
  programOverview: ProgramAnalytics;
  tierDistribution: {
    tierId: string;
    tierName: string;
    franchiseeCount: number;
    percentage: number;
    averagePointsBalance: number;
    totalPointsEarned: number;
    totalPointsRedeemed: number;
  }[];
  topPerformers: {
    franchiseeId: string;
    franchiseeName: string;
    tier: string;
    pointsEarned: number;
    pointsRedeemed: number;
    orderValue: number;
    engagementScore: number;
  }[];
  programHealth: {
    engagementRate: number;
    redemptionVelocity: number;
    tierUpgradeRate: number;
    pointsLiability: number;
    programROI: number;
    franchiseeSatisfaction: number;
  };
  alerts: LoyaltyAlert[];
}

export interface LoyaltyAlert {
  id: string;
  type:
    | "high_liability"
    | "low_engagement"
    | "redemption_spike"
    | "tier_migration"
    | "budget_threshold"
    | "fraud_detection";
  severity: "info" | "warning" | "critical";
  title: string;
  description: string;
  affectedCount: number;
  recommendedAction: string;
  createdAt: string;
  isResolved: boolean;
}

// Integration interfaces
export interface LoyaltyOrderIntegration {
  orderId: string;
  orderValue: number;
  franchiseeId: string;
  pointsCalculation: {
    basePoints: number;
    bonusPoints: number;
    tierMultiplier: number;
    promotionalMultiplier: number;
    totalPointsEarned: number;
  };
  redemptionApplied?: {
    redemptionId: string;
    pointsUsed: number;
    discountApplied: number;
    description: string;
  };
  tierBenefitsApplied: {
    benefitType: string;
    value: number | string;
    description: string;
  }[];
}

export interface LoyaltyNotification {
  id: string;
  franchiseeId: string;
  type:
    | "points_earned"
    | "points_expiring"
    | "tier_upgrade"
    | "tier_downgrade"
    | "redemption_available"
    | "special_offer";
  title: string;
  message: string;
  pointsRelated?: number;
  actionRequired: boolean;
  actionUrl?: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
  readAt?: string;
  expiresAt?: string;
}
