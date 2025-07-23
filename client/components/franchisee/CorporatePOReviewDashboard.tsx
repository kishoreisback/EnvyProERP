import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ClipboardList,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Truck,
  MapPin,
  AlertTriangle,
  TrendingUp,
  FileText,
  Eye,
  Edit,
  Send,
  Download,
  Warehouse,
  Users,
  BarChart3,
  Calendar,
  IndianRupee,
  Activity,
  Target,
  Filter,
  Search,
  Plus,
} from "lucide-react";

import {
  mockCorporatePOReviews,
  mockCorporatePOAnalytics,
  mockWarehouses,
  getStatusColor,
  getPriorityColor,
  formatReviewStatus,
  calculateFulfillmentScore,
  estimateDeliveryTime,
  getOptimalWarehouse,
  generateChallanNumber,
} from "./corporate-po-review-data";
import { CorporatePOReview, POReviewStatus } from "./corporate-po-review-types";
import { formatCurrency } from "./purchase-order-data";

interface CorporatePOReviewDashboardProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function CorporatePOReviewDashboard({
  activeTab = "pending",
  onTabChange,
}: CorporatePOReviewDashboardProps) {
  const [reviews, setReviews] = useState(mockCorporatePOReviews);
  const [analytics] = useState(mockCorporatePOAnalytics);
  const [selectedReview, setSelectedReview] =
    useState<CorporatePOReview | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    reviewStatus: "",
    corporateDecision: "",
    reviewComments: "",
    internalNotes: "",
    warehouseAssignment: "",
    priorityLevel: "",
    estimatedProcessingTime: 0,
    specialInstructions: "",
  });

  // Filter reviews based on search and status
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.purchaseOrder.poNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      review.purchaseOrder.franchiseeName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || review.reviewStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Group reviews by status for tabs
  const reviewsByStatus = {
    pending: filteredReviews.filter((r) => r.reviewStatus === "pending_review"),
    evaluation: filteredReviews.filter(
      (r) =>
        r.reviewStatus === "under_evaluation" ||
        r.reviewStatus === "feasibility_check",
    ),
    assignment: filteredReviews.filter(
      (r) => r.reviewStatus === "warehouse_assignment",
    ),
    approved: filteredReviews.filter(
      (r) => r.reviewStatus === "approved_for_fulfillment",
    ),
    fulfillment: filteredReviews.filter((r) =>
      ["fulfillment_in_progress", "challan_generated", "dispatched"].includes(
        r.reviewStatus,
      ),
    ),
    completed: filteredReviews.filter((r) => r.reviewStatus === "completed"),
    rejected: filteredReviews.filter(
      (r) => r.reviewStatus === "rejected" || r.reviewStatus === "on_hold",
    ),
  };

  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const handleReviewSubmit = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              reviewStatus: reviewFormData.reviewStatus as POReviewStatus,
              reviewedBy: "current.user@corp.com",
              reviewedAt: new Date().toISOString(),
              reviewComments: reviewFormData.reviewComments,
              internalNotes: reviewFormData.internalNotes,
              corporateDecision: {
                ...review.corporateDecision,
                decision: reviewFormData.corporateDecision as any,
                decisionMaker: "current.user@corp.com",
                decisionDate: new Date().toISOString(),
                reasoning: reviewFormData.reviewComments,
              },
              lastUpdated: new Date().toISOString(),
            }
          : review,
      ),
    );

    setIsReviewModalOpen(false);
    setReviewFormData({
      reviewStatus: "",
      corporateDecision: "",
      reviewComments: "",
      internalNotes: "",
      warehouseAssignment: "",
      priorityLevel: "",
      estimatedProcessingTime: 0,
      specialInstructions: "",
    });
  };

  const generateChallan = (review: CorporatePOReview) => {
    const challanNumber = generateChallanNumber();

    setReviews((prev) =>
      prev.map((r) =>
        r.id === review.id
          ? {
              ...r,
              reviewStatus: "challan_generated" as POReviewStatus,
              challanInfo: {
                challanNumber,
                generatedAt: new Date().toISOString(),
                generatedBy: "current.user@corp.com",
                items: review.purchaseOrder.items.map((item) => ({
                  itemId: item.id,
                  productName: item.productName,
                  sku: item.sku,
                  orderedQuantity: item.requestedQuantity,
                  dispatchedQuantity:
                    item.approvedQuantity || item.requestedQuantity,
                  batchNumber: `BATCH${Date.now()}`,
                  expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0],
                  qualityGrade: "A",
                  packingType: "Standard",
                  weight: item.requestedQuantity * 10,
                  dimensions: {
                    length: 30,
                    width: 20,
                    height: 15,
                    unit: "cm" as const,
                  },
                })),
                totalQuantity: review.purchaseOrder.items.reduce(
                  (sum, item) => sum + item.requestedQuantity,
                  0,
                ),
                totalWeight: review.purchaseOrder.items.reduce(
                  (sum, item) => sum + item.requestedQuantity * 10,
                  0,
                ),
                totalVolume: 0.5,
                packingDetails: [],
                qualityChecks: [],
                transportDetails: {
                  vehicleNumber: "",
                  driverName: "",
                  driverPhone: "",
                  estimatedDeparture: "",
                  estimatedArrival: "",
                  routePlan: [],
                  trackingEnabled: true,
                },
                specialInstructions: [],
              },
              lastUpdated: new Date().toISOString(),
            }
          : r,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-blue-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-blue-700">
                Pending Reviews
              </CardTitle>
              <div className="text-3xl font-bold text-blue-900">
                <AnimatedCounter value={analytics.totalPendingReviews} />
              </div>
              <p className="text-xs text-blue-600">Awaiting action</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <ClipboardList className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-green-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-green-700">
                Approved Orders
              </CardTitle>
              <div className="text-3xl font-bold text-green-900">
                <AnimatedCounter value={analytics.totalApprovedOrders} />
              </div>
              <p className="text-xs text-green-600">
                {analytics.approvalRate}% approval rate
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-orange-50 border-orange-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-orange-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-orange-700">
                Review Time
              </CardTitle>
              <div className="text-3xl font-bold text-orange-900">
                <AnimatedCounter
                  value={analytics.averageReviewTime}
                  decimals={1}
                />
                h
              </div>
              <p className="text-xs text-orange-600">Average processing</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-purple-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-purple-700">
                Total Value
              </CardTitle>
              <div className="text-3xl font-bold text-purple-900">
                ₹
                <AnimatedCounter
                  value={analytics.totalValue / 100000}
                  decimals={1}
                />
                L
              </div>
              <p className="text-xs text-purple-600">Orders under review</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by PO number or franchisee name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="under_evaluation">
                    Under Evaluation
                  </SelectItem>
                  <SelectItem value="warehouse_assignment">
                    Warehouse Assignment
                  </SelectItem>
                  <SelectItem value="approved_for_fulfillment">
                    Approved
                  </SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Pending ({reviewsByStatus.pending.length})
          </TabsTrigger>
          <TabsTrigger value="evaluation" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Evaluation ({reviewsByStatus.evaluation.length})
          </TabsTrigger>
          <TabsTrigger value="assignment" className="flex items-center gap-2">
            <Warehouse className="h-4 w-4" />
            Assignment ({reviewsByStatus.assignment.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Approved ({reviewsByStatus.approved.length})
          </TabsTrigger>
          <TabsTrigger value="fulfillment" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Fulfillment ({reviewsByStatus.fulfillment.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Completed ({reviewsByStatus.completed.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Rejected ({reviewsByStatus.rejected.length})
          </TabsTrigger>
        </TabsList>

        {/* Pending Reviews */}
        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {reviewsByStatus.pending.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {review.purchaseOrder.poNumber}
                        </h3>
                        <Badge className={getStatusColor(review.reviewStatus)}>
                          {formatReviewStatus(review.reviewStatus)}
                        </Badge>
                        <Badge
                          className={getPriorityColor(
                            review.purchaseOrder.priority,
                          )}
                        >
                          {review.purchaseOrder.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          {review.purchaseOrder.franchiseeName}
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {formatCurrency(review.purchaseOrder.grandTotal)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedReview(review);
                          setIsDetailsModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedReview(review);
                          setReviewFormData({
                            reviewStatus: "under_evaluation",
                            corporateDecision: "approve",
                            reviewComments: "",
                            internalNotes: "",
                            warehouseAssignment: "WH001",
                            priorityLevel: review.purchaseOrder.priority,
                            estimatedProcessingTime: 18,
                            specialInstructions: "",
                          });
                          setIsReviewModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Start Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Evaluation Tab */}
        <TabsContent value="evaluation" className="space-y-4">
          <div className="grid gap-4">
            {reviewsByStatus.evaluation.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {review.purchaseOrder.poNumber}
                        </h3>
                        <Badge className={getStatusColor(review.reviewStatus)}>
                          {formatReviewStatus(review.reviewStatus)}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{review.purchaseOrder.franchiseeName}</span>
                          <span>
                            {formatCurrency(review.purchaseOrder.grandTotal)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              Fulfillment:
                            </span>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={
                                  review.fulfillmentPlan.fulfillmentPercentage
                                }
                                className="w-20"
                              />
                              <span className="text-sm">
                                {review.fulfillmentPlan.fulfillmentPercentage}%
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Score:</span>
                            <span className="text-sm">
                              {review.deliveryFeasibility.feasibilityScore}/100
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedReview(review);
                          setIsDetailsModalOpen(true);
                        }}
                      >
                        View Analysis
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedReview(review);
                          setReviewFormData({
                            reviewStatus: "warehouse_assignment",
                            corporateDecision: "approve",
                            reviewComments: "Feasibility analysis completed",
                            internalNotes: "",
                            warehouseAssignment:
                              review.warehouseAssignment.assignedWarehouseId,
                            priorityLevel: review.fulfillmentPlan.priorityLevel,
                            estimatedProcessingTime:
                              review.fulfillmentPlan.estimatedProcessingTime,
                            specialInstructions: "",
                          });
                          setIsReviewModalOpen(true);
                        }}
                      >
                        Continue Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Warehouse Assignment Tab */}
        <TabsContent value="assignment" className="space-y-4">
          <div className="grid gap-4">
            {reviewsByStatus.assignment.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {review.purchaseOrder.poNumber}
                        </h3>
                        <Badge className={getStatusColor(review.reviewStatus)}>
                          {formatReviewStatus(review.reviewStatus)}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedReview(review);
                          setReviewFormData({
                            reviewStatus: "approved_for_fulfillment",
                            corporateDecision: "approve",
                            reviewComments: "Warehouse assigned successfully",
                            internalNotes: "",
                            warehouseAssignment:
                              review.warehouseAssignment.assignedWarehouseId,
                            priorityLevel: review.fulfillmentPlan.priorityLevel,
                            estimatedProcessingTime:
                              review.fulfillmentPlan.estimatedProcessingTime,
                            specialInstructions: "",
                          });
                          setIsReviewModalOpen(true);
                        }}
                      >
                        Approve Assignment
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Assigned Warehouse</h4>
                        <div className="flex items-center gap-2">
                          <Warehouse className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">
                            {review.warehouseAssignment.warehouseName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {review.warehouseAssignment.warehouseLocation.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            Capacity:{" "}
                            {
                              review.warehouseAssignment.operationalCapacity
                                .currentLoad
                            }
                            %
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Inventory Status</h4>
                        {review.warehouseAssignment.inventoryStatus.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <span>{item.productName}</span>
                              <div className="flex items-center gap-2">
                                <span
                                  className={
                                    item.shortfall > 0
                                      ? "text-orange-600"
                                      : "text-green-600"
                                  }
                                >
                                  {item.availableQuantity}/
                                  {item.requestedQuantity}
                                </span>
                                {item.shortfall > 0 && (
                                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                                )}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Approved Tab */}
        <TabsContent value="approved" className="space-y-4">
          <div className="grid gap-4">
            {reviewsByStatus.approved.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {review.purchaseOrder.poNumber}
                        </h3>
                        <Badge className={getStatusColor(review.reviewStatus)}>
                          {formatReviewStatus(review.reviewStatus)}
                        </Badge>
                        <Badge variant="outline" className="text-green-600">
                          Ready for Fulfillment
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{review.purchaseOrder.franchiseeName}</span>
                        <span>
                          {formatCurrency(review.purchaseOrder.grandTotal)}
                        </span>
                        <span>Reviewed by: {review.reviewedBy}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateChallan(review)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Challan
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Navigate to delivery scheduling
                          window.open(
                            `/delivery-logistics/delivery?poId=${review.poId}`,
                            "_blank",
                          );
                        }}
                      >
                        <Truck className="h-4 w-4 mr-2" />
                        Schedule Delivery
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setReviews((prev) =>
                            prev.map((r) =>
                              r.id === review.id
                                ? {
                                    ...r,
                                    reviewStatus:
                                      "fulfillment_in_progress" as POReviewStatus,
                                  }
                                : r,
                            ),
                          );
                        }}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Start Fulfillment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Fulfillment Tab */}
        <TabsContent value="fulfillment" className="space-y-4">
          <div className="grid gap-4">
            {reviewsByStatus.fulfillment.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {review.purchaseOrder.poNumber}
                        </h3>
                        <Badge className={getStatusColor(review.reviewStatus)}>
                          {formatReviewStatus(review.reviewStatus)}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {review.challanInfo && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download Challan
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => {
                            setReviews((prev) =>
                              prev.map((r) =>
                                r.id === review.id
                                  ? {
                                      ...r,
                                      reviewStatus:
                                        "completed" as POReviewStatus,
                                      completedAt: new Date().toISOString(),
                                    }
                                  : r,
                              ),
                            );
                          }}
                        >
                          Mark Completed
                        </Button>
                      </div>
                    </div>

                    {review.challanInfo && (
                      <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium mb-2">Delivery Challan</h4>
                          <div className="space-y-1 text-sm">
                            <div>
                              Number: {review.challanInfo.challanNumber}
                            </div>
                            <div>Items: {review.challanInfo.totalQuantity}</div>
                            <div>
                              Weight: {review.challanInfo.totalWeight} kg
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">
                            Transport Details
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div>
                              Vehicle:{" "}
                              {review.challanInfo.transportDetails
                                .vehicleNumber || "TBD"}
                            </div>
                            <div>
                              Driver:{" "}
                              {review.challanInfo.transportDetails.driverName ||
                                "TBD"}
                            </div>
                            <div>
                              Departure:{" "}
                              {review.challanInfo.transportDetails
                                .estimatedDeparture
                                ? new Date(
                                    review.challanInfo.transportDetails.estimatedDeparture,
                                  ).toLocaleDateString()
                                : "TBD"}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Tab */}
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {reviewsByStatus.completed.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {review.purchaseOrder.poNumber}
                        </h3>
                        <Badge className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {review.completedAt &&
                            new Date(review.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{review.purchaseOrder.franchiseeName}</span>
                        <span>
                          {formatCurrency(review.purchaseOrder.grandTotal)}
                        </span>
                        <span>Processed by: {review.processedBy}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedReview(review);
                        setIsDetailsModalOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Summary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Rejected Tab */}
        <TabsContent value="rejected" className="space-y-4">
          <div className="grid gap-4">
            {reviewsByStatus.rejected.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {review.purchaseOrder.poNumber}
                        </h3>
                        <Badge className={getStatusColor(review.reviewStatus)}>
                          {formatReviewStatus(review.reviewStatus)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{review.purchaseOrder.franchiseeName}</span>
                        <span>
                          {formatCurrency(review.purchaseOrder.grandTotal)}
                        </span>
                      </div>
                      {review.reviewComments && (
                        <div className="p-3 bg-red-50 rounded-lg">
                          <p className="text-sm text-red-800">
                            {review.reviewComments}
                          </p>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedReview(review);
                        setReviewFormData({
                          reviewStatus: "pending_review",
                          corporateDecision: "approve",
                          reviewComments: "",
                          internalNotes: "",
                          warehouseAssignment: "",
                          priorityLevel: review.purchaseOrder.priority,
                          estimatedProcessingTime: 0,
                          specialInstructions: "",
                        });
                        setIsReviewModalOpen(true);
                      }}
                    >
                      Re-review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Modal */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Review Purchase Order: {selectedReview?.purchaseOrder.poNumber}
            </DialogTitle>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium mb-2">Order Details</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      Franchisee: {selectedReview.purchaseOrder.franchiseeName}
                    </div>
                    <div>
                      Total Value:{" "}
                      {formatCurrency(selectedReview.purchaseOrder.grandTotal)}
                    </div>
                    <div>
                      Items: {selectedReview.purchaseOrder.items.length}
                    </div>
                    <div>
                      Priority:{" "}
                      {selectedReview.purchaseOrder.priority.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Delivery</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      Location:{" "}
                      {
                        selectedReview.purchaseOrder.deliveryLocation
                          .locationName
                      }
                    </div>
                    <div>
                      Date: {selectedReview.purchaseOrder.requestedDeliveryDate}
                    </div>
                    <div>
                      Time:{" "}
                      {selectedReview.purchaseOrder.preferredDeliveryTime ||
                        "Any time"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Form */}
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reviewStatus">Review Status</Label>
                    <Select
                      value={reviewFormData.reviewStatus}
                      onValueChange={(value) =>
                        setReviewFormData((prev) => ({
                          ...prev,
                          reviewStatus: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under_evaluation">
                          Under Evaluation
                        </SelectItem>
                        <SelectItem value="feasibility_check">
                          Feasibility Check
                        </SelectItem>
                        <SelectItem value="warehouse_assignment">
                          Warehouse Assignment
                        </SelectItem>
                        <SelectItem value="approved_for_fulfillment">
                          Approved for Fulfillment
                        </SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="on_hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="corporateDecision">Decision</Label>
                    <Select
                      value={reviewFormData.corporateDecision}
                      onValueChange={(value) =>
                        setReviewFormData((prev) => ({
                          ...prev,
                          corporateDecision: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select decision" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approve">Approve</SelectItem>
                        <SelectItem value="reject">Reject</SelectItem>
                        <SelectItem value="modify">Modify</SelectItem>
                        <SelectItem value="hold">Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="reviewComments">Review Comments</Label>
                  <Textarea
                    id="reviewComments"
                    placeholder="Enter your review comments..."
                    value={reviewFormData.reviewComments}
                    onChange={(e) =>
                      setReviewFormData((prev) => ({
                        ...prev,
                        reviewComments: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="internalNotes">Internal Notes</Label>
                  <Textarea
                    id="internalNotes"
                    placeholder="Internal notes (not visible to franchisee)..."
                    value={reviewFormData.internalNotes}
                    onChange={(e) =>
                      setReviewFormData((prev) => ({
                        ...prev,
                        internalNotes: e.target.value,
                      }))
                    }
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsReviewModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleReviewSubmit(selectedReview.id)}
                    disabled={
                      !reviewFormData.reviewStatus ||
                      !reviewFormData.corporateDecision
                    }
                  >
                    Submit Review
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Order Details: {selectedReview?.purchaseOrder.poNumber}
            </DialogTitle>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-6">
              {/* Order Items */}
              <div>
                <h4 className="font-medium mb-3">Order Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedReview.purchaseOrder.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {item.productName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.sku}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.requestedQuantity}</TableCell>
                        <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                        <TableCell>{formatCurrency(item.totalPrice)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.itemStatus)}>
                            {item.itemStatus.replace("_", " ")}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Fulfillment Analysis */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Fulfillment Plan</h4>
                  <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Can Fulfill:</span>
                      <Badge
                        className={
                          selectedReview.fulfillmentPlan.canFulfill
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {selectedReview.fulfillmentPlan.canFulfill
                          ? "Yes"
                          : "No"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Fulfillment %:
                      </span>
                      <span className="text-sm">
                        {selectedReview.fulfillmentPlan.fulfillmentPercentage}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Processing Time:
                      </span>
                      <span className="text-sm">
                        {selectedReview.fulfillmentPlan.estimatedProcessingTime}
                        h
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Priority:</span>
                      <Badge
                        className={getPriorityColor(
                          selectedReview.fulfillmentPlan.priorityLevel,
                        )}
                      >
                        {selectedReview.fulfillmentPlan.priorityLevel.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Delivery Feasibility</h4>
                  <div className="space-y-3 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Deliverable:</span>
                      <Badge
                        className={
                          selectedReview.deliveryFeasibility.isDeliverable
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {selectedReview.deliveryFeasibility.isDeliverable
                          ? "Yes"
                          : "No"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Feasibility Score:
                      </span>
                      <span className="text-sm">
                        {selectedReview.deliveryFeasibility.feasibilityScore}
                        /100
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Delivery Date:
                      </span>
                      <span className="text-sm">
                        {new Date(
                          selectedReview.deliveryFeasibility.estimatedDeliveryDate,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Cost:</span>
                      <span className="text-sm">
                        {formatCurrency(
                          selectedReview.deliveryFeasibility.deliveryCost
                            .totalCost,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warehouse Assignment */}
              <div>
                <h4 className="font-medium mb-3">Warehouse Assignment</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Warehouse className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">
                      {selectedReview.warehouseAssignment.warehouseName}
                    </span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {selectedReview.warehouseAssignment.availabilityStatus}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium">Location:</span>
                      <p className="text-sm text-gray-600">
                        {
                          selectedReview.warehouseAssignment.warehouseLocation
                            .city
                        }
                        ,{" "}
                        {
                          selectedReview.warehouseAssignment.warehouseLocation
                            .state
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Distance:</span>
                      <p className="text-sm text-gray-600">
                        {
                          selectedReview.warehouseAssignment.warehouseLocation
                            .distanceFromDestination
                        }{" "}
                        km
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-sm font-medium">Reason:</span>
                    <p className="text-sm text-gray-600">
                      {selectedReview.warehouseAssignment.assignmentReason}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
