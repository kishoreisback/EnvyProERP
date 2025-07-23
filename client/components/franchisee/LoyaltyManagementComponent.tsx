import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Award,
  Star,
  Gift,
  TrendingUp,
  Clock,
  CheckCircle,
  Crown,
  Zap,
  Target,
  Calendar,
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  Trophy,
  Sparkles,
  ArrowRight,
  ExternalLink,
  History,
  Settings,
} from "lucide-react";
import { format } from "date-fns";
import { useAuditLogger } from "../../hooks/useAuditLogger";
import {
  FranchiseeLoyaltyAccount,
  PointsTransaction,
  RedemptionTransaction,
  TierProgress,
  LoyaltyRecommendation,
  RedemptionOption,
  LoyaltyTier,
} from "./loyalty-types";

interface LoyaltyManagementComponentProps {
  franchiseeId: string;
  isCompact?: boolean;
  initialTab?: string;
}

export function LoyaltyManagementComponent({
  franchiseeId,
  isCompact = false,
  initialTab = "overview",
}: LoyaltyManagementComponentProps) {
  const { logAudit } = useAuditLogger("loyalty_management");
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedRedemption, setSelectedRedemption] =
    useState<RedemptionOption | null>(null);
  const [isRedemptionModalOpen, setIsRedemptionModalOpen] = useState(false);
  const [redemptionPoints, setRedemptionPoints] = useState("");

  // Mock loyalty account data
  const mockLoyaltyAccount: FranchiseeLoyaltyAccount = {
    franchiseeId: franchiseeId,
    franchiseeName: "BuildPro Mumbai Central",
    enrollmentDate: "2023-06-15T00:00:00Z",
    currentTier: {
      id: "tier_gold",
      name: "Gold",
      description: "Premium franchisee with excellent performance",
      color: "#f59e0b",
      iconName: "crown",
      requirements: [
        {
          type: "points_earned",
          period: "12_months",
          threshold: 10000,
          description: "Earn 10,000 points in 12 months",
        },
        {
          type: "order_value",
          period: "12_months",
          threshold: 2000000,
          description: "Place orders worth ₹20 lakhs in 12 months",
        },
      ],
      benefits: [
        {
          id: "ben_001",
          type: "discount_percentage",
          value: 5,
          description: "5% additional discount on all orders",
          isAutomatic: true,
          requiresActivation: false,
        },
        {
          id: "ben_002",
          type: "bonus_points",
          value: 1.5,
          description: "1.5x points multiplier on all purchases",
          isAutomatic: true,
          requiresActivation: false,
        },
        {
          id: "ben_003",
          type: "priority_support",
          value: "24_hours",
          description: "Priority customer support with 24-hour response",
          isAutomatic: true,
          requiresActivation: false,
        },
      ],
      pointsMultiplier: 1.5,
      orderIndex: 2,
      isDefault: false,
      upgradeMessage: "Welcome to Gold tier! Enjoy premium benefits.",
      maintenanceMessage:
        "Maintain your excellent performance to stay in Gold tier.",
    },
    pointsBalance: {
      available: 2450,
      pending: 350,
      reserved: 0,
      expiring: [
        {
          points: 300,
          expiryDate: "2024-01-31T23:59:59Z",
        },
        {
          points: 150,
          expiryDate: "2024-02-15T23:59:59Z",
        },
      ],
    },
    pointsHistory: [
      {
        id: "pt_001",
        type: "earned",
        points: 450,
        orderId: "order_001",
        orderValue: 45000,
        earningRule: "Order value points",
        description: "Earned 450 points from order ORD-2024-001234",
        timestamp: "2024-01-15T14:30:00Z",
        expiresAt: "2025-01-15T14:30:00Z",
        isReversible: false,
        metadata: {
          basePoints: 450,
          tierMultiplier: 1.5,
          finalPoints: 675,
        },
      },
      {
        id: "pt_002",
        type: "redeemed",
        points: -500,
        redemptionOption: "Purchase Order Credit",
        description: "Redeemed 500 points for ₹25 PO credit",
        timestamp: "2024-01-12T10:15:00Z",
        isReversible: false,
        metadata: {
          redemptionValue: 25,
          redemptionRate: 0.05,
        },
      },
      {
        id: "pt_003",
        type: "bonus",
        points: 200,
        earningRule: "Tier upgrade bonus",
        description: "Bonus points for upgrading to Gold tier",
        timestamp: "2024-01-10T00:00:00Z",
        expiresAt: "2025-01-10T00:00:00Z",
        isReversible: false,
      },
      {
        id: "pt_004",
        type: "earned",
        points: 320,
        orderId: "order_002",
        orderValue: 32000,
        earningRule: "Order value points",
        description: "Earned 320 points from order ORD-2024-001235",
        timestamp: "2024-01-08T16:45:00Z",
        expiresAt: "2025-01-08T16:45:00Z",
        isReversible: false,
      },
    ],
    redemptionHistory: [
      {
        id: "red_001",
        redemptionOptionId: "redeem_po_credit",
        redemptionOptionName: "Purchase Order Credit",
        pointsUsed: 500,
        monetaryValue: 25,
        status: "fulfilled",
        requestedAt: "2024-01-12T10:15:00Z",
        fulfilledAt: "2024-01-12T10:20:00Z",
        orderId: "order_003",
        metadata: {
          creditApplied: 25,
          orderTotal: 75000,
          finalAmount: 74975,
        },
      },
      {
        id: "red_002",
        redemptionOptionId: "redeem_voucher",
        redemptionOptionName: "Gift Voucher",
        pointsUsed: 1000,
        monetaryValue: 50,
        status: "confirmed",
        requestedAt: "2024-01-05T14:30:00Z",
        fulfilledAt: "2024-01-05T14:35:00Z",
        voucherCode: "GIFT50-ABC123",
        expiresAt: "2024-07-05T14:35:00Z",
      },
    ],
    tierHistory: [
      {
        id: "th_001",
        fromTier: "Silver",
        toTier: "Gold",
        changeType: "upgrade",
        reason: "Achieved required points and order value thresholds",
        effectiveDate: "2024-01-10T00:00:00Z",
        triggerMetrics: {
          points_12_months: 12500,
          order_value_12_months: 2200000,
        },
        benefitsGained: [
          {
            id: "ben_001",
            type: "discount_percentage",
            value: 5,
            description: "5% additional discount on all orders",
            isAutomatic: true,
            requiresActivation: false,
          },
        ],
      },
    ],
    tierProgress: {
      currentTier: {
        id: "tier_gold",
        name: "Gold",
        description: "Premium franchisee with excellent performance",
        color: "#f59e0b",
        iconName: "crown",
        requirements: [],
        benefits: [],
        pointsMultiplier: 1.5,
        orderIndex: 2,
        isDefault: false,
        upgradeMessage: "Welcome to Gold tier!",
        maintenanceMessage: "Maintain your excellent performance.",
      },
      nextTier: {
        id: "tier_platinum",
        name: "Platinum",
        description: "Elite franchisee with exceptional performance",
        color: "#8b5cf6",
        iconName: "crown",
        requirements: [],
        benefits: [],
        pointsMultiplier: 2,
        orderIndex: 3,
        isDefault: false,
        upgradeMessage: "Welcome to Platinum tier!",
        maintenanceMessage: "Maintain your exceptional performance.",
      },
      progress: [
        {
          requirementType: "points_earned",
          current: 12500,
          required: 25000,
          percentage: 50,
          description: "Points earned in last 12 months",
        },
        {
          requirementType: "order_value",
          current: 2200000,
          required: 5000000,
          percentage: 44,
          description: "Order value in last 12 months",
        },
      ],
      estimatedUpgradeDate: "2024-08-15T00:00:00Z",
      riskOfDowngrade: {
        isAtRisk: false,
        requirementsToMaintain: [],
      },
    },
    preferences: {
      notifications: {
        pointsEarned: true,
        pointsExpiring: true,
        tierUpgrade: true,
        tierDowngrade: true,
        newRedemptionOptions: true,
        specialOffers: true,
      },
      communication: {
        email: true,
        sms: false,
        pushNotifications: true,
        inAppNotifications: true,
      },
      redemptionPreferences: {
        autoRedeemBeforeExpiry: false,
        preferredRedemptionTypes: ["purchase_order_credit", "cash_equivalent"],
        minimumRedemptionThreshold: 500,
      },
    },
    accountAnalytics: {
      engagementScore: 85,
      participationLevel: "high",
      pointsEarningTrend: "increasing",
      redemptionBehavior: "strategic",
      preferredCategories: ["construction_materials", "equipment"],
      seasonalityPattern: [
        { month: 1, activityScore: 78 },
        { month: 2, activityScore: 85 },
        { month: 3, activityScore: 92 },
      ],
      recommendations: [
        {
          id: "rec_001",
          type: "redeem_expiring",
          title: "Redeem Expiring Points",
          description:
            "You have 300 points expiring on Jan 31. Redeem them now!",
          actionText: "Redeem Now",
          urgency: "high",
          potentialValue: 15,
          expiresAt: "2024-01-31T23:59:59Z",
        },
        {
          id: "rec_002",
          type: "tier_upgrade",
          title: "Platinum Tier Progress",
          description: "You're 50% of the way to Platinum tier. Keep going!",
          actionText: "View Progress",
          urgency: "medium",
          potentialValue: 0,
        },
      ],
    },
  };

  // Mock redemption options
  const mockRedemptionOptions: RedemptionOption[] = [
    {
      id: "redeem_po_credit",
      name: "Purchase Order Credit",
      description: "Convert points to credit for your next purchase order",
      type: "purchase_order_credit",
      pointsRequired: 500,
      monetaryValue: 25,
      isActive: true,
      availability: {
        validFrom: "2024-01-01T00:00:00Z",
        maxRedemptionsPerFranchisee: 10,
        monthlyLimit: 5,
      },
      restrictions: [
        {
          type: "minimum_order_value",
          value: 10000,
          description: "Minimum order value of ₹10,000 required",
        },
      ],
      termsAndConditions: [
        "Credit valid for 6 months from redemption date",
        "Cannot be combined with other promotional offers",
        "Credit automatically applied to next qualifying order",
      ],
      category: "orders",
      popularity: 92,
      isNew: false,
      isFeatured: true,
      isTrending: true,
    },
    {
      id: "redeem_voucher",
      name: "Gift Voucher",
      description: "Get vouchers that can be used across our partner stores",
      type: "gift_voucher",
      pointsRequired: 1000,
      monetaryValue: 50,
      isActive: true,
      availability: {
        validFrom: "2024-01-01T00:00:00Z",
        maxRedemptionsPerFranchisee: 5,
        monthlyLimit: 2,
      },
      restrictions: [],
      termsAndConditions: [
        "Voucher valid for 6 months from issue date",
        "Can be used at any partner retail outlet",
        "Non-transferable and cannot be redeemed for cash",
      ],
      validityPeriod: 180,
      category: "vouchers",
      popularity: 78,
      isNew: false,
      isFeatured: false,
      isTrending: false,
    },
    {
      id: "redeem_cash",
      name: "Cash Equivalent",
      description: "Direct cash credit to your account",
      type: "cash_equivalent",
      pointsRequired: 2000,
      monetaryValue: 100,
      isActive: true,
      availability: {
        validFrom: "2024-01-01T00:00:00Z",
        maxRedemptionsPerFranchisee: 3,
        monthlyLimit: 1,
      },
      restrictions: [
        {
          type: "tier_requirement",
          value: "gold",
          description: "Available only for Gold tier and above",
        },
      ],
      termsAndConditions: [
        "Cash credit processed within 3-5 business days",
        "Minimum redemption amount: ₹100",
        "Subject to tax deductions as applicable",
      ],
      category: "cash",
      popularity: 65,
      isNew: true,
      isFeatured: true,
      isTrending: true,
    },
    {
      id: "redeem_shipping",
      name: "Free Shipping Voucher",
      description: "Get free shipping on your next 3 orders",
      type: "shipping_waiver",
      pointsRequired: 300,
      monetaryValue: 150,
      isActive: true,
      availability: {
        validFrom: "2024-01-01T00:00:00Z",
        maxRedemptionsPerFranchisee: 12,
        monthlyLimit: 4,
      },
      restrictions: [],
      termsAndConditions: [
        "Valid for orders above ₹5,000",
        "Cannot be combined with free shipping promotions",
        "Expires 90 days from redemption",
      ],
      validityPeriod: 90,
      category: "shipping",
      popularity: 84,
      isNew: false,
      isFeatured: false,
      isTrending: false,
    },
  ];

  const getTierIcon = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "bronze":
        return <Award className="h-5 w-5 text-amber-600" />;
      case "silver":
        return <Star className="h-5 w-5 text-gray-500" />;
      case "gold":
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case "platinum":
        return <Trophy className="h-5 w-5 text-purple-500" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case "earned":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "redeemed":
        return <Gift className="h-4 w-4 text-blue-600" />;
      case "bonus":
        return <Sparkles className="h-4 w-4 text-purple-600" />;
      case "expired":
        return <Clock className="h-4 w-4 text-red-600" />;
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  const getRedemptionStatusColor = (status: string) => {
    switch (status) {
      case "fulfilled":
        return "bg-green-100 text-green-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleRedemption = (option: RedemptionOption, points: number) => {
    if (points < option.pointsRequired) {
      alert("Insufficient points for this redemption");
      return;
    }

    logAudit({
      action: "loyalty.redeemed",
      resource: `redemption/${option.id}`,
      resourceType: "loyalty_redemption",
      resourceId: option.id,
      description: `Redeemed ${points} points for ${option.name}`,
    });

    alert(`Successfully redeemed ${points} points for ${option.name}!`);
    setIsRedemptionModalOpen(false);
    setRedemptionPoints("");
  };

  const handleRecommendationAction = (
    recommendation: LoyaltyRecommendation,
  ) => {
    logAudit({
      action: "loyalty.recommendation_action",
      resource: `recommendation/${recommendation.id}`,
      resourceType: "loyalty_recommendation",
      resourceId: recommendation.id,
      description: `Franchisee acted on recommendation: ${recommendation.title}`,
    });

    switch (recommendation.type) {
      case "redeem_expiring":
        // Navigate to redeem tab and focus on expiring points
        setActiveTab("redeem");
        break;
      case "tier_upgrade":
        // Navigate to history tab to show tier progress
        setActiveTab("history");
        break;
      case "earn_more_points":
        // This could show earning tips or navigate to earning opportunities
        alert(
          "Here are ways to earn more points:\n• Make larger orders\n• Refer new franchisees\n• Pay on time",
        );
        break;
      case "new_redemption":
        // Navigate to redeem tab to show new options
        setActiveTab("redeem");
        break;
      case "special_offer":
        // This could navigate to schemes tab (not available in this component)
        alert("Redirecting to schemes to explore special offers...");
        break;
      default:
        alert(
          `Action: ${recommendation.actionText}\n${recommendation.description}`,
        );
    }
  };

  const totalExpiringPoints = mockLoyaltyAccount.pointsBalance.expiring.reduce(
    (sum, exp) => sum + exp.points,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Award className="h-5 w-5" />
            Loyalty Program
          </h2>
          <p className="text-muted-foreground">
            Earn points, unlock benefits, and redeem rewards
          </p>
        </div>
      </div>

      {/* Points Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {mockLoyaltyAccount.pointsBalance.available.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Available Points
                </div>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {mockLoyaltyAccount.pointsBalance.pending.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Pending Points
                </div>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {totalExpiringPoints.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Expiring Soon
                </div>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getTierIcon(mockLoyaltyAccount.currentTier.name)}
                <div>
                  <div className="font-semibold">
                    {mockLoyaltyAccount.currentTier.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Current Tier
                  </div>
                </div>
              </div>
              <Badge
                style={{
                  backgroundColor: mockLoyaltyAccount.currentTier.color,
                }}
              >
                {mockLoyaltyAccount.currentTier.pointsMultiplier}x Points
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Progress */}
      {mockLoyaltyAccount.tierProgress.nextTier && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Progress to {mockLoyaltyAccount.tierProgress.nextTier.name} Tier
            </CardTitle>
            <CardDescription>
              Keep earning points and placing orders to unlock premium benefits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockLoyaltyAccount.tierProgress.progress.map((prog, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span>{prog.description}</span>
                  <span>
                    {prog.current.toLocaleString()} /{" "}
                    {prog.required.toLocaleString()}
                  </span>
                </div>
                <Progress value={prog.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  {prog.percentage}% complete
                </div>
              </div>
            ))}
            {mockLoyaltyAccount.tierProgress.estimatedUpgradeDate && (
              <div className="text-sm text-muted-foreground">
                Estimated upgrade date:{" "}
                {format(
                  new Date(
                    mockLoyaltyAccount.tierProgress.estimatedUpgradeDate,
                  ),
                  "MMM dd, yyyy",
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {mockLoyaltyAccount.accountAnalytics.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {mockLoyaltyAccount.accountAnalytics.recommendations.map(
                (rec) => (
                  <div
                    key={rec.id}
                    className={`p-3 border rounded-lg ${
                      rec.urgency === "high"
                        ? "border-red-200 bg-red-50"
                        : rec.urgency === "medium"
                          ? "border-yellow-200 bg-yellow-50"
                          : "border-blue-200 bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{rec.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {rec.description}
                        </div>
                        {rec.potentialValue > 0 && (
                          <div className="text-sm text-green-600 mt-1">
                            Potential value: ₹{rec.potentialValue}
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant={rec.urgency === "high" ? "default" : "outline"}
                        onClick={() => handleRecommendationAction(rec)}
                      >
                        {rec.actionText}
                      </Button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList
          className={`grid w-full ${isCompact ? "grid-cols-2" : "grid-cols-4"}`}
        >
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="redeem">Redeem</TabsTrigger>
          {!isCompact && (
            <>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </>
          )}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Points Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Points Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Available Points</span>
                  <span className="font-semibold text-blue-600">
                    {mockLoyaltyAccount.pointsBalance.available.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Points</span>
                  <span className="font-semibold text-yellow-600">
                    {mockLoyaltyAccount.pointsBalance.pending.toLocaleString()}
                  </span>
                </div>
                {mockLoyaltyAccount.pointsBalance.expiring.map((exp, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-red-600"
                  >
                    <span>
                      Expiring {format(new Date(exp.expiryDate), "MMM dd")}
                    </span>
                    <span className="font-semibold">
                      {exp.points.toLocaleString()}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockLoyaltyAccount.pointsHistory
                    .slice(0, 5)
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center gap-3"
                      >
                        {getTransactionTypeIcon(transaction.type)}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {transaction.description}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(
                              new Date(transaction.timestamp),
                              "MMM dd, yyyy",
                            )}
                          </div>
                        </div>
                        <div
                          className={`text-sm font-semibold ${
                            transaction.points > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.points > 0 ? "+" : ""}
                          {transaction.points.toLocaleString()}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Redeem Tab */}
        <TabsContent value="redeem" className="space-y-6">
          <div className="grid gap-6">
            {mockRedemptionOptions.map((option) => (
              <Card
                key={option.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{option.name}</h3>
                        {option.isFeatured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                        {option.isNew && (
                          <Badge className="bg-green-100 text-green-800">
                            New
                          </Badge>
                        )}
                        {option.isTrending && (
                          <Badge className="bg-purple-100 text-purple-800">
                            Trending
                          </Badge>
                        )}
                      </div>

                      <p className="text-muted-foreground mb-4">
                        {option.description}
                      </p>

                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          <span>
                            {option.pointsRequired.toLocaleString()} points
                            required
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-green-600">
                          <DollarSign className="h-4 w-4" />
                          <span>Worth ₹{option.monetaryValue}</span>
                        </div>
                        {option.validityPeriod && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Valid for {option.validityPeriod} days</span>
                          </div>
                        )}
                      </div>

                      {option.restrictions.length > 0 && (
                        <div className="mt-3">
                          <div className="text-xs font-medium mb-1">
                            Restrictions:
                          </div>
                          <ul className="text-xs text-muted-foreground">
                            {option.restrictions.map((restriction, index) => (
                              <li key={index}>• {restriction.description}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      <Button
                        onClick={() => {
                          setSelectedRedemption(option);
                          setRedemptionPoints(option.pointsRequired.toString());
                          setIsRedemptionModalOpen(true);
                        }}
                        disabled={
                          mockLoyaltyAccount.pointsBalance.available <
                          option.pointsRequired
                        }
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        Redeem
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Tabs defaultValue="points" className="space-y-4">
            <TabsList>
              <TabsTrigger value="points">Points History</TabsTrigger>
              <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
              <TabsTrigger value="tiers">Tier Changes</TabsTrigger>
            </TabsList>

            <TabsContent value="points">
              <Card>
                <CardHeader>
                  <CardTitle>Points Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                        <TableHead>Expires</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockLoyaltyAccount.pointsHistory.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {format(
                              new Date(transaction.timestamp),
                              "MMM dd, yyyy",
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTransactionTypeIcon(transaction.type)}
                              <span className="capitalize">
                                {transaction.type}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[300px] truncate">
                            {transaction.description}
                          </TableCell>
                          <TableCell
                            className={`text-right font-semibold ${
                              transaction.points > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.points > 0 ? "+" : ""}
                            {transaction.points.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {transaction.expiresAt
                              ? format(
                                  new Date(transaction.expiresAt),
                                  "MMM dd, yyyy",
                                )
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="redemptions">
              <Card>
                <CardHeader>
                  <CardTitle>Redemption History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Redemption</TableHead>
                        <TableHead>Points Used</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockLoyaltyAccount.redemptionHistory.map(
                        (redemption) => (
                          <TableRow key={redemption.id}>
                            <TableCell>
                              {format(
                                new Date(redemption.requestedAt),
                                "MMM dd, yyyy",
                              )}
                            </TableCell>
                            <TableCell>
                              {redemption.redemptionOptionName}
                            </TableCell>
                            <TableCell>
                              {redemption.pointsUsed.toLocaleString()}
                            </TableCell>
                            <TableCell>₹{redemption.monetaryValue}</TableCell>
                            <TableCell>
                              <Badge
                                className={getRedemptionStatusColor(
                                  redemption.status,
                                )}
                              >
                                {redemption.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tiers">
              <Card>
                <CardHeader>
                  <CardTitle>Tier Change History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockLoyaltyAccount.tierHistory.map((change) => (
                      <div key={change.id} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <ArrowRight className="h-4 w-4 text-green-600" />
                          <span className="font-medium">
                            {change.fromTier ? `${change.fromTier} → ` : ""}
                            {change.toTier}
                          </span>
                          <Badge className="bg-green-100 text-green-800">
                            {change.changeType}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {change.reason}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {format(
                            new Date(change.effectiveDate),
                            "MMM dd, yyyy",
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getTierIcon(mockLoyaltyAccount.currentTier.name)}
                {mockLoyaltyAccount.currentTier.name} Tier Benefits
              </CardTitle>
              <CardDescription>
                {mockLoyaltyAccount.currentTier.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockLoyaltyAccount.currentTier.benefits.map((benefit) => (
                  <div key={benefit.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{benefit.description}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {benefit.isAutomatic
                            ? "Automatically applied"
                            : "Requires activation"}
                        </div>
                      </div>
                      {benefit.isAutomatic ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Button size="sm" variant="outline">
                          Activate
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Redemption Modal */}
      {selectedRedemption && (
        <Dialog
          open={isRedemptionModalOpen}
          onOpenChange={setIsRedemptionModalOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Redeem {selectedRedemption.name}</DialogTitle>
              <DialogDescription>
                Confirm your redemption details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm font-medium mb-2">
                  {selectedRedemption.description}
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Points Required:</span>
                    <span className="font-semibold">
                      {selectedRedemption.pointsRequired.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Value:</span>
                    <span className="font-semibold text-green-600">
                      ₹{selectedRedemption.monetaryValue}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Your Available Points:</span>
                    <span className="font-semibold">
                      {mockLoyaltyAccount.pointsBalance.available.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="points">Points to Redeem</Label>
                <Input
                  id="points"
                  type="number"
                  value={redemptionPoints}
                  onChange={(e) => setRedemptionPoints(e.target.value)}
                  min={selectedRedemption.pointsRequired}
                  max={mockLoyaltyAccount.pointsBalance.available}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() =>
                    handleRedemption(
                      selectedRedemption,
                      parseInt(redemptionPoints),
                    )
                  }
                  disabled={
                    !redemptionPoints ||
                    parseInt(redemptionPoints) <
                      selectedRedemption.pointsRequired ||
                    parseInt(redemptionPoints) >
                      mockLoyaltyAccount.pointsBalance.available
                  }
                  className="flex-1"
                >
                  Confirm Redemption
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsRedemptionModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
