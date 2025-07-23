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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Gift,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Percent,
  Package,
  Eye,
  Calendar,
  Award,
  Target,
  Zap,
  Heart,
  ExternalLink,
  Share2,
} from "lucide-react";
import { format } from "date-fns";
import { useAuditLogger } from "../../hooks/useAuditLogger";
import {
  PromotionScheme,
  FranchiseeSchemeView,
  SchemeApplication,
  SchemeRecommendation,
  PromotionCatalog,
} from "./promotions-types";

interface SchemesManagementComponentProps {
  franchiseeId: string;
  isCompact?: boolean;
}

export function SchemesManagementComponent({
  franchiseeId,
  isCompact = false,
}: SchemesManagementComponentProps) {
  const { logAudit } = useAuditLogger("schemes_management");
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedScheme, setSelectedScheme] =
    useState<FranchiseeSchemeView | null>(null);
  const [isSchemeModalOpen, setIsSchemeModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [applications, setApplications] = useState<SchemeApplication[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<SchemeApplication | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userFeedback, setUserFeedback] = useState("");

  // Mock data for schemes
  const mockSchemes: FranchiseeSchemeView[] = [
    {
      scheme: {
        id: "scheme_001",
        name: "Monsoon Special 2024",
        description:
          "Extra 15% off on all construction materials during monsoon season",
        type: "percentage_discount",
        status: "active",
        validFrom: "2024-01-15T00:00:00Z",
        validUntil: "2024-02-29T23:59:59Z",
        createdAt: "2024-01-10T00:00:00Z",
        updatedAt: "2024-01-15T00:00:00Z",
        targetAudience: {
          franchiseeCategories: ["premium", "standard"],
          franchiseeTiers: ["gold", "silver"],
          geographicRegions: ["MH", "KA", "DL"],
          minimumOrderValue: 50000,
        },
        applicableTerritories: ["MH-01", "MH-02", "KA-01"],
        franchiseeTypes: ["premium", "standard"],
        conditions: [
          {
            id: "cond_001",
            type: "minimum_value",
            operator: "greater_than",
            value: 50000,
            description: "Minimum order value of ₹50,000",
            isRequired: true,
            priority: 1,
          },
          {
            id: "cond_002",
            type: "specific_products",
            operator: "in",
            value: ["cement", "steel", "bricks"],
            description: "Applicable on construction materials only",
            isRequired: true,
            priority: 2,
          },
        ],
        benefits: [
          {
            id: "ben_001",
            type: "percentage_discount",
            value: 15,
            applicableTo: "specific_products",
            applicableItems: ["cement", "steel", "bricks"],
            maxBenefit: 25000,
            description: "15% discount on construction materials",
            calculationMethod: "auto",
            isStackable: false,
          },
          {
            id: "ben_002",
            type: "loyalty_points",
            value: 2,
            applicableTo: "all",
            description: "Double loyalty points on qualifying orders",
            calculationMethod: "auto",
            isStackable: true,
          },
        ],
        limitations: {
          maxUsagePerFranchisee: 5,
          maxDiscountAmount: 25000,
          budgetLimit: 1000000,
        },
        usage: {
          totalApplications: 156,
          uniqueFranchisees: 89,
          totalDiscountGiven: 450000,
          totalOrderValue: 12500000,
          averageOrderValue: 80128,
          conversionRate: 68.5,
          topFranchisees: [
            {
              franchiseeId: "fr_001",
              franchiseeName: "BuildPro Mumbai Central",
              usageCount: 3,
              totalSavings: 45000,
            },
          ],
        },
        corporateConfig: {
          createdBy: "corp_admin_001",
          approvalRequired: false,
          autoApproval: true,
          notificationSettings: {
            notifyOnApplication: true,
            notifyOnThreshold: true,
            thresholdPercentage: 80,
            notifyOnExpiry: true,
            expiryWarningDays: 7,
          },
          budgetTracking: {
            allocatedBudget: 1000000,
            spentBudget: 450000,
            remainingBudget: 550000,
            warningThreshold: 90,
          },
        },
        displayConfig: {
          title: "Monsoon Special 2024",
          shortDescription: "15% off construction materials",
          longDescription:
            "Get extra 15% discount on all construction materials during monsoon season. Valid on orders above ₹50,000.",
          imageUrl: "/schemes/monsoon-special.jpg",
          colorScheme: {
            primary: "#10b981",
            secondary: "#059669",
            accent: "#065f46",
          },
          badges: ["Popular", "Limited Time"],
          featuredOrder: 1,
          showInCatalog: true,
          showInDashboard: true,
          highlightAsNew: false,
          highlightAsPopular: true,
          isTrending: true,
          termsAndConditions: [
            "Minimum order value of ₹50,000 required",
            "Applicable only on construction materials",
            "Cannot be combined with other offers",
            "Valid until February 29, 2024",
          ],
          faq: [
            {
              question: "What products are eligible?",
              answer:
                "All construction materials including cement, steel, and bricks are eligible for this offer.",
            },
            {
              question: "Can I combine with other offers?",
              answer:
                "No, this offer cannot be combined with other promotional schemes.",
            },
          ],
        },
        performance: {
          impressions: 2500,
          clickThroughRate: 12.5,
          applicationRate: 68.5,
          completionRate: 89.2,
          averageOrderIncrease: 23.5,
          revenueImpact: 1250000,
          profitabilityScore: 8.7,
          franchiseeSatisfaction: 4.6,
          trendsData: [
            {
              date: "2024-01-15",
              applications: 12,
              revenue: 156000,
              savings: 23400,
            },
          ],
        },
      },
      eligibilityStatus: "eligible",
      eligibilityReasons: [
        "Meets minimum order requirement",
        "Premium tier franchisee",
      ],
      remainingUsage: 2,
      estimatedSavings: 15000,
      applicableProducts: [
        {
          productId: "prod_001",
          productName: "Portland Cement - 50kg",
          currentPrice: 500,
          schemePrice: 425,
          savings: 75,
          savingsPercentage: 15,
          isInStock: true,
          minimumQuantity: 10,
        },
        {
          productId: "prod_002",
          productName: "TMT Bars - 12mm",
          currentPrice: 65,
          schemePrice: 55.25,
          savings: 9.75,
          savingsPercentage: 15,
          isInStock: true,
          minimumQuantity: 50,
        },
      ],
      hasUsedBefore: true,
      lastUsedDate: "2024-01-10T00:00:00Z",
      totalSavingsToDate: 35000,
    },
    {
      scheme: {
        id: "scheme_002",
        name: "Buy 10 Get 2 Free",
        description: "Buy 10 bags of cement and get 2 bags absolutely free",
        type: "buy_x_get_y",
        status: "active",
        validFrom: "2024-01-01T00:00:00Z",
        validUntil: "2024-03-31T23:59:59Z",
        createdAt: "2023-12-25T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        targetAudience: {
          franchiseeCategories: ["premium", "standard", "basic"],
          franchiseeTiers: ["platinum", "gold", "silver", "bronze"],
          geographicRegions: ["ALL"],
        },
        applicableTerritories: ["ALL"],
        franchiseeTypes: ["all"],
        conditions: [
          {
            id: "cond_003",
            type: "minimum_quantity",
            operator: "greater_equal",
            value: 10,
            description: "Minimum 10 bags required",
            isRequired: true,
            priority: 1,
          },
          {
            id: "cond_004",
            type: "specific_products",
            operator: "in",
            value: ["cement"],
            description: "Applicable on cement products only",
            isRequired: true,
            priority: 2,
          },
        ],
        benefits: [
          {
            id: "ben_003",
            type: "free_product",
            value: "2 bags",
            applicableTo: "specific_products",
            applicableItems: ["cement"],
            description: "2 free cement bags for every 10 purchased",
            calculationMethod: "auto",
            isStackable: false,
          },
        ],
        limitations: {
          maxUsagePerFranchisee: 10,
          limitPerTransaction: 1,
        },
        usage: {
          totalApplications: 234,
          uniqueFranchisees: 145,
          totalDiscountGiven: 280000,
          totalOrderValue: 8900000,
          averageOrderValue: 38034,
          conversionRate: 78.9,
          topFranchisees: [],
        },
        corporateConfig: {
          createdBy: "corp_admin_002",
          approvalRequired: false,
          autoApproval: true,
          notificationSettings: {
            notifyOnApplication: true,
            notifyOnThreshold: false,
            thresholdPercentage: 90,
            notifyOnExpiry: true,
            expiryWarningDays: 14,
          },
          budgetTracking: {
            spentBudget: 280000,
            warningThreshold: 85,
          },
        },
        displayConfig: {
          title: "Buy 10 Get 2 Free",
          shortDescription: "Free cement bags on bulk purchase",
          longDescription:
            "Purchase 10 bags of cement and get 2 additional bags absolutely free. Perfect for bulk construction needs.",
          imageUrl: "/schemes/buy-10-get-2.jpg",
          colorScheme: {
            primary: "#f59e0b",
            secondary: "#d97706",
            accent: "#92400e",
          },
          badges: ["Best Value", "Bulk Offer"],
          featuredOrder: 2,
          showInCatalog: true,
          showInDashboard: true,
          highlightAsNew: false,
          highlightAsPopular: false,
          isTrending: false,
          termsAndConditions: [
            "Minimum 10 bags required per transaction",
            "Free bags must be of same brand/type",
            "Offer auto-applied at checkout",
            "Valid on select cement brands only",
          ],
          faq: [
            {
              question: "Which cement brands are included?",
              answer:
                "All premium cement brands in our catalog are eligible for this offer.",
            },
          ],
        },
        performance: {
          impressions: 1800,
          clickThroughRate: 18.2,
          applicationRate: 78.9,
          completionRate: 92.1,
          averageOrderIncrease: 31.4,
          revenueImpact: 890000,
          profitabilityScore: 7.8,
          franchiseeSatisfaction: 4.4,
          trendsData: [],
        },
      },
      eligibilityStatus: "eligible",
      eligibilityReasons: ["No restrictions for this offer"],
      remainingUsage: 8,
      estimatedSavings: 1000,
      applicableProducts: [
        {
          productId: "prod_001",
          productName: "Portland Cement - 50kg",
          currentPrice: 500,
          schemePrice: 417, // Effective price with free bags
          savings: 83,
          savingsPercentage: 16.7,
          isInStock: true,
          minimumQuantity: 10,
          maxBenefitQuantity: 2,
        },
      ],
      hasUsedBefore: false,
      totalSavingsToDate: 0,
    },
  ];

  const mockRecommendations: SchemeRecommendation[] = [
    {
      schemeId: "scheme_001",
      recommendationScore: 95,
      reasonCode: "high_value",
      reason: "High savings potential based on your recent orders",
      estimatedSavings: 15000,
      urgency: "high",
    },
    {
      schemeId: "scheme_002",
      recommendationScore: 78,
      reasonCode: "frequent_usage",
      reason: "Perfect for your bulk cement purchases",
      estimatedSavings: 1000,
      urgency: "medium",
    },
  ];

  const mockApplications: SchemeApplication[] = [
    {
      id: "app_001",
      schemeId: "scheme_001",
      franchiseeId: franchiseeId,
      orderId: "order_001",
      status: "applied",
      appliedAt: "2024-01-10T00:00:00Z",
      approvedAt: "2024-01-10T00:15:00Z",
      requestedProducts: [
        {
          productId: "prod_001",
          quantity: 100,
          requestedPrice: 42500,
        },
      ],
      calculatedBenefits: {
        discountAmount: 7500,
        freeProducts: [],
        bonusPoints: 1000,
        additionalBenefits: ["Double loyalty points"],
      },
      actualUsage: {
        orderValue: 50000,
        discountApplied: 7500,
        productsOrdered: [
          {
            productId: "prod_001",
            quantity: 100,
            finalPrice: 42500,
          },
        ],
        satisfaction: 5,
        feedback: "Excellent offer, saved significantly on my order",
      },
    },
  ];

  React.useEffect(() => {
    setApplications(mockApplications);
  }, []);

  const getSchemeTypeIcon = (type: string) => {
    switch (type) {
      case "percentage_discount":
        return <Percent className="h-5 w-5" />;
      case "buy_x_get_y":
        return <Gift className="h-5 w-5" />;
      case "flat_discount":
        return <TrendingUp className="h-5 w-5" />;
      case "combo_offer":
        return <Package className="h-5 w-5" />;
      default:
        return <Gift className="h-5 w-5" />;
    }
  };

  const getEligibilityColor = (status: string) => {
    switch (status) {
      case "eligible":
        return "bg-green-100 text-green-800";
      case "not_eligible":
        return "bg-red-100 text-red-800";
      case "pending_approval":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-green-100 text-green-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleApplyScheme = (scheme: FranchiseeSchemeView) => {
    logAudit({
      action: "scheme.applied",
      resource: `scheme/${scheme.scheme.id}`,
      resourceType: "scheme",
      resourceId: scheme.scheme.id,
      description: `Applied scheme ${scheme.scheme.name}`,
    });

    // Navigate to PO creation with scheme pre-applied
    // This would typically integrate with the PO creation flow
    alert(`Scheme "${scheme.scheme.name}" will be applied to your next order!`);
  };

  const handleRateScheme = (application: SchemeApplication) => {
    setSelectedApplication(application);
    setUserRating(application.actualUsage?.satisfaction || 0);
    setUserFeedback(application.actualUsage?.feedback || "");
    setIsRatingModalOpen(true);
  };

  const submitRating = () => {
    if (!selectedApplication || userRating === 0) return;

    // Update the application with the new rating
    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApplication.id
          ? {
              ...app,
              actualUsage: {
                ...app.actualUsage!,
                satisfaction: userRating,
                feedback: userFeedback,
              },
            }
          : app,
      ),
    );

    logAudit({
      action: "scheme.rated",
      resource: `scheme/${selectedApplication.schemeId}`,
      resourceType: "scheme_rating",
      resourceId: selectedApplication.id,
      description: `Rated scheme application with ${userRating} stars`,
    });

    setIsRatingModalOpen(false);
    setSelectedApplication(null);
    setUserRating(0);
    setUserFeedback("");
  };

  const filteredSchemes = mockSchemes.filter((schemeView) => {
    const scheme = schemeView.scheme;
    const matchesSearch =
      searchQuery === "" ||
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || scheme.type === categoryFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "eligible" &&
        schemeView.eligibilityStatus === "eligible") ||
      (statusFilter === "used" && schemeView.hasUsedBefore) ||
      (statusFilter === "new" && !schemeView.hasUsedBefore);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Schemes & Promotions
          </h2>
          <p className="text-muted-foreground">
            Discover and apply promotional schemes to save on your orders
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList
          className={`grid w-full ${isCompact ? "grid-cols-2" : "grid-cols-4"}`}
        >
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="recommended">For You</TabsTrigger>
          {!isCompact && (
            <>
              <TabsTrigger value="applied">Applied</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </>
          )}
        </TabsList>

        {/* Browse Tab */}
        <TabsContent value="browse" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="percentage_discount">
                  Percentage Off
                </SelectItem>
                <SelectItem value="buy_x_get_y">Buy X Get Y</SelectItem>
                <SelectItem value="flat_discount">Flat Discount</SelectItem>
                <SelectItem value="combo_offer">Combo Offers</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Schemes</SelectItem>
                <SelectItem value="eligible">Eligible</SelectItem>
                <SelectItem value="used">Previously Used</SelectItem>
                <SelectItem value="new">New to You</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Scheme Cards */}
          <div className="grid gap-6">
            {filteredSchemes.map((schemeView) => (
              <Card
                key={schemeView.scheme.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Scheme Image/Icon */}
                    <div className="md:w-48 bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-center">
                      <div className="text-center">
                        {getSchemeTypeIcon(schemeView.scheme.type)}
                        <div className="mt-2 text-sm font-medium text-blue-700">
                          {schemeView.scheme.type
                            .replace("_", " ")
                            .toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Scheme Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">
                              {schemeView.scheme.name}
                            </h3>
                            {schemeView.scheme.displayConfig.badges.map(
                              (badge) => (
                                <Badge
                                  key={badge}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {badge}
                                </Badge>
                              ),
                            )}
                            <Badge
                              className={getEligibilityColor(
                                schemeView.eligibilityStatus,
                              )}
                            >
                              {schemeView.eligibilityStatus.replace("_", " ")}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground mb-4">
                            {schemeView.scheme.displayConfig.longDescription}
                          </p>

                          <div className="grid gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Valid until{" "}
                                {format(
                                  new Date(schemeView.scheme.validUntil),
                                  "MMM dd, yyyy",
                                )}
                              </span>
                            </div>
                            {schemeView.estimatedSavings && (
                              <div className="flex items-center gap-2 text-green-600">
                                <TrendingUp className="h-4 w-4" />
                                <span>
                                  Estimated savings: ₹
                                  {schemeView.estimatedSavings.toLocaleString()}
                                </span>
                              </div>
                            )}
                            {schemeView.remainingUsage && (
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                <span>
                                  {schemeView.remainingUsage} uses remaining
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            onClick={() => {
                              setSelectedScheme(schemeView);
                              setIsSchemeModalOpen(true);
                            }}
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>

                          {schemeView.eligibilityStatus === "eligible" && (
                            <Button
                              onClick={() => handleApplyScheme(schemeView)}
                              size="sm"
                            >
                              <Zap className="h-4 w-4 mr-2" />
                              Apply Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recommended Tab */}
        <TabsContent value="recommended" className="space-y-6">
          <div className="text-center py-4">
            <h3 className="text-lg font-medium mb-2">
              Personalized Recommendations
            </h3>
            <p className="text-muted-foreground">
              Schemes selected based on your purchase history and preferences
            </p>
          </div>

          <div className="grid gap-4">
            {mockRecommendations.map((rec) => {
              const scheme = mockSchemes.find(
                (s) => s.scheme.id === rec.schemeId,
              );
              if (!scheme) return null;

              return (
                <Card
                  key={rec.schemeId}
                  className="border-l-4 border-l-blue-500"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">
                            {scheme.scheme.name}
                          </span>
                          <Badge variant="outline">
                            {rec.recommendationScore}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {rec.reason}
                        </p>
                        <div className="text-sm text-green-600">
                          Potential savings: ₹
                          {rec.estimatedSavings.toLocaleString()}
                        </div>
                      </div>
                      <Button onClick={() => handleApplyScheme(scheme)}>
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Applied Tab */}
        <TabsContent value="applied" className="space-y-6">
          <div className="text-center py-4">
            <h3 className="text-lg font-medium mb-2">Applied Schemes</h3>
            <p className="text-muted-foreground">
              Track your scheme applications and usage history
            </p>
          </div>

          <div className="grid gap-4">
            {applications.map((app) => {
              const scheme = mockSchemes.find(
                (s) => s.scheme.id === app.schemeId,
              );
              if (!scheme) return null;

              return (
                <Card key={app.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{scheme.scheme.name}</h4>
                          <Badge
                            className={getApplicationStatusColor(app.status)}
                          >
                            {app.status}
                          </Badge>
                        </div>

                        <div className="grid gap-1 text-sm text-muted-foreground">
                          <div>
                            Applied:{" "}
                            {format(new Date(app.appliedAt), "MMM dd, yyyy")}
                          </div>
                          {app.actualUsage && (
                            <>
                              <div>
                                Order Value: ₹
                                {app.actualUsage.orderValue.toLocaleString()}
                              </div>
                              <div className="text-green-600">
                                Savings: ₹
                                {app.actualUsage.discountApplied.toLocaleString()}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="text-center">
                        {app.actualUsage?.satisfaction ? (
                          <div>
                            <div className="flex items-center gap-1 justify-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < app.actualUsage!.satisfaction
                                      ? "text-yellow-500 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Your Rating
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRateScheme(app)}
                              className="text-xs mt-1"
                            >
                              Edit Rating
                            </Button>
                          </div>
                        ) : (
                          app.status === "applied" &&
                          app.actualUsage && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRateScheme(app)}
                            >
                              <Star className="h-4 w-4 mr-1" />
                              Rate Experience
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-6">
          <div className="text-center py-8">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              No Favorite Schemes Yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Mark schemes as favorites to access them quickly
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Scheme Details Modal */}
      {selectedScheme && (
        <Dialog open={isSchemeModalOpen} onOpenChange={setIsSchemeModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedScheme.scheme.name}</DialogTitle>
              <DialogDescription>
                Complete scheme details and terms
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Overview */}
              <div>
                <h4 className="font-medium mb-3">Overview</h4>
                <p className="text-sm">
                  {selectedScheme.scheme.displayConfig.longDescription}
                </p>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-medium mb-3">Benefits</h4>
                <div className="space-y-2">
                  {selectedScheme.scheme.benefits.map((benefit) => (
                    <div
                      key={benefit.id}
                      className="p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">
                          {benefit.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applicable Products */}
              {selectedScheme.applicableProducts.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Applicable Products</h4>
                  <div className="grid gap-3">
                    {selectedScheme.applicableProducts.map((product) => (
                      <div
                        key={product.productId}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">
                            {product.productName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {product.isInStock ? "In Stock" : "Out of Stock"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="line-through text-sm text-muted-foreground">
                            ₹{product.currentPrice}
                          </div>
                          <div className="font-medium text-green-600">
                            ₹{product.schemePrice}
                          </div>
                          <div className="text-xs text-green-600">
                            Save ₹{product.savings} ({product.savingsPercentage}
                            %)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div>
                <h4 className="font-medium mb-3">Terms & Conditions</h4>
                <ul className="space-y-1 text-sm">
                  {selectedScheme.scheme.displayConfig.termsAndConditions.map(
                    (term, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-muted-foreground">•</span>
                        <span>{term}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* FAQ */}
              {selectedScheme.scheme.displayConfig.faq.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">
                    Frequently Asked Questions
                  </h4>
                  <div className="space-y-3">
                    {selectedScheme.scheme.displayConfig.faq.map(
                      (faq, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg">
                          <div className="font-medium text-sm mb-1">
                            {faq.question}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {faq.answer}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Previous Usage Rating */}
              {selectedScheme.hasUsedBefore && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-blue-800">
                        You've used this scheme before
                      </div>
                      <div className="text-sm text-blue-600">
                        Last used:{" "}
                        {format(
                          new Date(selectedScheme.lastUsedDate!),
                          "MMM dd, yyyy",
                        )}
                        <br />
                        Total savings so far: ₹
                        {selectedScheme.totalSavingsToDate.toLocaleString()}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Find the most recent application for this scheme
                        const recentApp = applications.find(
                          (app) =>
                            app.schemeId === selectedScheme.scheme.id &&
                            app.status === "applied",
                        );
                        if (recentApp) {
                          handleRateScheme(recentApp);
                          setIsSchemeModalOpen(false);
                        }
                      }}
                      className="text-blue-600"
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Rate Experience
                    </Button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {selectedScheme.eligibilityStatus === "eligible" && (
                  <Button
                    onClick={() => {
                      handleApplyScheme(selectedScheme);
                      setIsSchemeModalOpen(false);
                    }}
                    className="flex-1"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Apply This Scheme
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setIsSchemeModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Rating Modal */}
      {selectedApplication && (
        <Dialog open={isRatingModalOpen} onOpenChange={setIsRatingModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Rate Your Experience</DialogTitle>
              <DialogDescription>
                How satisfied were you with this scheme?
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Scheme Info */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="font-medium">
                  {
                    mockSchemes.find(
                      (s) => s.scheme.id === selectedApplication.schemeId,
                    )?.scheme.name
                  }
                </div>
                {selectedApplication.actualUsage && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Order Value: ₹
                    {selectedApplication.actualUsage.orderValue.toLocaleString()}
                    <br />
                    Your Savings: ₹
                    {selectedApplication.actualUsage.discountApplied.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Interactive Star Rating */}
              <div className="text-center">
                <Label className="text-base font-medium">
                  Rate your satisfaction
                </Label>
                <div className="flex items-center justify-center gap-2 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setUserRating(i + 1)}
                      onMouseEnter={() => setUserRating(i + 1)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-8 w-8 cursor-pointer transition-colors ${
                          i < userRating
                            ? "text-yellow-500 fill-current"
                            : "text-gray-300 hover:text-yellow-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {userRating === 0 && "Click to rate"}
                  {userRating === 1 && "Poor"}
                  {userRating === 2 && "Fair"}
                  {userRating === 3 && "Good"}
                  {userRating === 4 && "Very Good"}
                  {userRating === 5 && "Excellent"}
                </div>
              </div>

              {/* Feedback Textarea */}
              <div>
                <Label htmlFor="feedback">Additional Feedback (Optional)</Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your experience with this scheme..."
                  value={userFeedback}
                  onChange={(e) => setUserFeedback(e.target.value)}
                  rows={3}
                  className="mt-2"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={submitRating}
                  disabled={userRating === 0}
                  className="flex-1"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Submit Rating
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsRatingModalOpen(false);
                    setUserRating(0);
                    setUserFeedback("");
                  }}
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
