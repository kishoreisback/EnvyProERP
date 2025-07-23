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
  Package,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Camera,
  FileText,
  Upload,
  Download,
  Eye,
  Edit,
  Save,
  Star,
  TrendingUp,
  TrendingDown,
  Clock,
  IndianRupee,
  BarChart3,
  Activity,
  Target,
  Filter,
  Search,
  Plus,
  Minus,
  Calendar,
  User,
} from "lucide-react";

import {
  mockGRNs,
  mockDeliveryAnalytics,
  getGRNStatusColor,
  generateGRNNumber,
} from "./delivery-logistics-data";
import {
  GRN,
  GRNStatus,
  ItemCondition,
  QualityGrade,
  Discrepancy,
} from "./delivery-logistics-types";
import { formatCurrency } from "./purchase-order-data";

interface GRNManagementDashboardProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function GRNManagementDashboard({
  activeTab = "pending",
  onTabChange,
}: GRNManagementDashboardProps) {
  const [grns, setGRNs] = useState(mockGRNs);
  const [analytics] = useState(mockDeliveryAnalytics);
  const [selectedGRN, setSelectedGRN] = useState<GRN | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateGRNModalOpen, setIsCreateGRNModalOpen] = useState(false);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [grnFormData, setGRNFormData] = useState({
    poId: "",
    challanId: "",
    deliveryScheduleId: "",
    receivedBy: "",
    notes: "",
  });

  // Filter GRNs based on search and status
  const filteredGRNs = grns.filter((grn) => {
    const matchesSearch =
      grn.grnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grn.poId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grn.receivedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || grn.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Group GRNs by status
  const grnsByStatus = {
    pending: filteredGRNs.filter((g) => g.status === "pending"),
    inProgress: filteredGRNs.filter((g) => g.status === "in_progress"),
    qualityCheck: filteredGRNs.filter((g) => g.status === "quality_check"),
    discrepancy: filteredGRNs.filter((g) => g.status === "discrepancy_found"),
    completed: filteredGRNs.filter((g) => g.status === "completed"),
    rejected: filteredGRNs.filter((g) => g.status === "rejected"),
  };

  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const handleCreateGRN = () => {
    const newGRN: GRN = {
      id: `GRN${Date.now()}`,
      grnNumber: generateGRNNumber(),
      poId: grnFormData.poId,
      challanId: grnFormData.challanId,
      deliveryScheduleId: grnFormData.deliveryScheduleId,
      receivedDate: new Date().toISOString(),
      receivedBy: grnFormData.receivedBy,
      receivedLocation: {
        id: "LOC001",
        name: "Store Location",
        type: "store",
        address: {
          street: "123 Main Street",
          area: "Business District",
          city: "Mumbai",
          state: "Maharashtra",
          zipCode: "400001",
          country: "India",
        },
        coordinates: { latitude: 19.076, longitude: 72.8777 },
        availableServices: [],
        restrictions: [],
      },
      receivedItems: [
        {
          itemId: "ITEM001",
          productId: "PROD001",
          productName: "Sample Product",
          sku: "SKU001",
          orderedQuantity: 100,
          deliveredQuantity: 100,
          receivedQuantity: 100,
          acceptedQuantity: 0,
          rejectedQuantity: 0,
          condition: "good",
          qualityGrade: "A",
          defects: [],
          unitPrice: 100,
          totalValue: 10000,
        },
      ],
      status: "pending",
      statusHistory: [
        {
          status: "pending",
          timestamp: new Date().toISOString(),
          changedBy: grnFormData.receivedBy,
          reason: "GRN created",
        },
      ],
      qualityInspection: {
        inspectionId: `QI${Date.now()}`,
        inspectedBy: "",
        inspectionDate: "",
        inspectionMethod: "visual",
        overallRating: "A",
        passed: false,
        checks: [],
      },
      discrepancies: [],
      approvalRequired: false,
      photos: [],
      documents: [],
      financialImpact: {
        totalOrderValue: 10000,
        receivedValue: 10000,
        acceptedValue: 0,
        rejectedValue: 0,
        discrepancyValue: 0,
        adjustmentAmount: 0,
        finalPayableAmount: 10000,
        itemWiseImpact: [],
        requiresFinancialApproval: false,
      },
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    setGRNs((prev) => [...prev, newGRN]);
    setIsCreateGRNModalOpen(false);
    setGRNFormData({
      poId: "",
      challanId: "",
      deliveryScheduleId: "",
      receivedBy: "",
      notes: "",
    });
  };

  const updateGRNStatus = (
    grnId: string,
    newStatus: GRNStatus,
    notes: string = "",
  ) => {
    setGRNs((prev) =>
      prev.map((grn) =>
        grn.id === grnId
          ? {
              ...grn,
              status: newStatus,
              statusHistory: [
                ...grn.statusHistory,
                {
                  status: newStatus,
                  timestamp: new Date().toISOString(),
                  changedBy: "current.user@franchise.com",
                  reason: notes || `Status updated to ${newStatus}`,
                },
              ],
              lastUpdated: new Date().toISOString(),
              ...(newStatus === "completed" && {
                completedAt: new Date().toISOString(),
              }),
            }
          : grn,
      ),
    );
  };

  const updateItemInspection = (
    grnId: string,
    itemId: string,
    updates: any,
  ) => {
    setGRNs((prev) =>
      prev.map((grn) =>
        grn.id === grnId
          ? {
              ...grn,
              receivedItems: grn.receivedItems.map((item) =>
                item.itemId === itemId ? { ...item, ...updates } : item,
              ),
              lastUpdated: new Date().toISOString(),
            }
          : grn,
      ),
    );
  };

  const addDiscrepancy = (grnId: string, discrepancy: Partial<Discrepancy>) => {
    const newDiscrepancy: Discrepancy = {
      id: `DISC${Date.now()}`,
      type: discrepancy.type || "quality_issue",
      description: discrepancy.description || "",
      severity: discrepancy.severity || "medium",
      expectedValue: discrepancy.expectedValue,
      actualValue: discrepancy.actualValue,
      variance: discrepancy.variance || 0,
      status: "reported",
      financialImpact: discrepancy.financialImpact || 0,
      requiresApproval: false,
      evidencePhotos: [],
      supportingDocuments: [],
      reportedBy: "current.user@franchise.com",
      reportedAt: new Date().toISOString(),
    };

    setGRNs((prev) =>
      prev.map((grn) =>
        grn.id === grnId
          ? {
              ...grn,
              discrepancies: [...grn.discrepancies, newDiscrepancy],
              status: "discrepancy_found",
              lastUpdated: new Date().toISOString(),
            }
          : grn,
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
                Total GRNs
              </CardTitle>
              <div className="text-3xl font-bold text-blue-900">
                <AnimatedCounter value={analytics.grnMetrics.totalGRNs} />
              </div>
              <p className="text-xs text-blue-600">This month</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-green-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-green-700">
                Quality Acceptance
              </CardTitle>
              <div className="text-3xl font-bold text-green-900">
                <AnimatedCounter
                  value={analytics.grnMetrics.qualityAcceptanceRate}
                  decimals={1}
                />
                %
              </div>
              <p className="text-xs text-green-600">
                Average grade: {analytics.grnMetrics.averageQualityGrade}
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-orange-50 border-orange-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-orange-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-orange-700">
                Processing Time
              </CardTitle>
              <div className="text-3xl font-bold text-orange-900">
                <AnimatedCounter
                  value={analytics.grnMetrics.averageProcessingTime}
                  decimals={1}
                />
                h
              </div>
              <p className="text-xs text-orange-600">Average completion</p>
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
                Received Value
              </CardTitle>
              <div className="text-3xl font-bold text-purple-900">
                ₹
                <AnimatedCounter
                  value={analytics.grnMetrics.totalReceivedValue / 100000}
                  decimals={1}
                />
                L
              </div>
              <p className="text-xs text-purple-600">
                {analytics.grnMetrics.adjustmentRate}% adjustment rate
              </p>
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
                  placeholder="Search by GRN number, PO ID, or received by..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="quality_check">Quality Check</SelectItem>
                  <SelectItem value="discrepancy_found">
                    Discrepancy Found
                  </SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => setIsCreateGRNModalOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create GRN
              </Button>
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
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending ({grnsByStatus.pending.length})
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            In Progress ({grnsByStatus.inProgress.length})
          </TabsTrigger>
          <TabsTrigger value="quality" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Quality Check ({grnsByStatus.qualityCheck.length})
          </TabsTrigger>
          <TabsTrigger value="discrepancy" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Discrepancy ({grnsByStatus.discrepancy.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Completed ({grnsByStatus.completed.length})
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Pending GRNs Tab */}
        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {grnsByStatus.pending.map((grn) => (
              <Card key={grn.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {grn.grnNumber}
                        </h3>
                        <Badge className={getGRNStatusColor(grn.status)}>
                          {grn.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-blue-500" />
                          <span>PO: {grn.poId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-green-500" />
                          <span>Received by: {grn.receivedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-500" />
                          <span>
                            {new Date(grn.receivedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {formatCurrency(grn.financialImpact.totalOrderValue)}
                        </span>
                        <span>Items: {grn.receivedItems.length}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedGRN(grn);
                          setIsInspectionModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          updateGRNStatus(
                            grn.id,
                            "in_progress",
                            "Started item verification",
                          )
                        }
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Start Inspection
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* In Progress Tab */}
        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-4">
            {grnsByStatus.inProgress.map((grn) => (
              <Card key={grn.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {grn.grnNumber}
                        </h3>
                        <Badge className={getGRNStatusColor(grn.status)}>
                          {grn.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedGRN(grn);
                            setIsInspectionModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Continue Inspection
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            updateGRNStatus(
                              grn.id,
                              "quality_check",
                              "Moving to quality inspection",
                            )
                          }
                        >
                          <Star className="h-4 w-4 mr-2" />
                          Quality Check
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Items Progress</h4>
                        <div className="space-y-2">
                          {grn.receivedItems.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="truncate">
                                {item.productName}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-green-600">
                                  {item.acceptedQuantity}
                                </span>
                                <span className="text-gray-400">/</span>
                                <span className="text-blue-600">
                                  {item.receivedQuantity}
                                </span>
                                {item.rejectedQuantity > 0 && (
                                  <span className="text-red-600">
                                    (-{item.rejectedQuantity})
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Financial Summary</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Total Value:</span>
                            <span>
                              {formatCurrency(
                                grn.financialImpact.totalOrderValue,
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Accepted:</span>
                            <span className="text-green-600">
                              {formatCurrency(
                                grn.financialImpact.acceptedValue,
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rejected:</span>
                            <span className="text-red-600">
                              {formatCurrency(
                                grn.financialImpact.rejectedValue,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Quality Check Tab */}
        <TabsContent value="quality" className="space-y-4">
          <div className="grid gap-4">
            {grnsByStatus.qualityCheck.map((grn) => (
              <Card key={grn.id} className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {grn.grnNumber}
                        </h3>
                        <Badge className={getGRNStatusColor(grn.status)}>
                          Quality Inspection
                        </Badge>
                        <Badge variant="outline">
                          Grade: {grn.qualityInspection.overallRating}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedGRN(grn);
                            setIsInspectionModalOpen(true);
                          }}
                        >
                          <Star className="h-4 w-4 mr-2" />
                          Quality Report
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            updateGRNStatus(
                              grn.id,
                              "completed",
                              "Quality inspection passed, GRN completed",
                            )
                          }
                          disabled={!grn.qualityInspection.passed}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve & Complete
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Quality Checks</h4>
                        <div className="space-y-2">
                          {grn.qualityInspection.checks.map((check, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <span>{check.checkType}</span>
                              <Badge
                                className={
                                  check.status === "pass"
                                    ? "bg-green-100 text-green-800"
                                    : check.status === "fail"
                                      ? "bg-red-100 text-red-800"
                                      : check.status === "warning"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-gray-100 text-gray-800"
                                }
                              >
                                {check.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Inspection Details</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Method:</span>
                            <span className="capitalize">
                              {grn.qualityInspection.inspectionMethod}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Overall Rating:</span>
                            <span className="font-medium">
                              {grn.qualityInspection.overallRating}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <Badge
                              className={
                                grn.qualityInspection.passed
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }
                            >
                              {grn.qualityInspection.passed
                                ? "Passed"
                                : "Pending"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Discrepancy Tab */}
        <TabsContent value="discrepancy" className="space-y-4">
          <div className="grid gap-4">
            {grnsByStatus.discrepancy.map((grn) => (
              <Card key={grn.id} className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {grn.grnNumber}
                        </h3>
                        <Badge className="bg-orange-100 text-orange-800">
                          Discrepancy Found
                        </Badge>
                        <Badge variant="outline">
                          {grn.discrepancies.length} issue(s)
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedGRN(grn);
                            setIsInspectionModalOpen(true);
                          }}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          View Issues
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            updateGRNStatus(
                              grn.id,
                              "completed",
                              "Discrepancies resolved, GRN completed",
                            )
                          }
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve & Complete
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Discrepancies</h4>
                      {grn.discrepancies.map((discrepancy, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  discrepancy.severity === "critical"
                                    ? "bg-red-100 text-red-800"
                                    : discrepancy.severity === "high"
                                      ? "bg-orange-100 text-orange-800"
                                      : discrepancy.severity === "medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-blue-100 text-blue-800"
                                }
                              >
                                {discrepancy.severity}
                              </Badge>
                              <span className="font-medium">
                                {discrepancy.type.replace("_", " ")}
                              </span>
                            </div>
                            <Badge
                              className={
                                discrepancy.status === "resolved"
                                  ? "bg-green-100 text-green-800"
                                  : discrepancy.status === "investigating"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {discrepancy.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {discrepancy.description}
                          </p>
                          {discrepancy.financialImpact !== 0 && (
                            <div className="text-sm">
                              <span className="font-medium">
                                Financial Impact:{" "}
                              </span>
                              <span
                                className={
                                  discrepancy.financialImpact > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {formatCurrency(
                                  Math.abs(discrepancy.financialImpact),
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Tab */}
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {grnsByStatus.completed.map((grn) => (
              <Card key={grn.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {grn.grnNumber}
                        </h3>
                        <Badge className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {grn.completedAt &&
                            new Date(grn.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          PO: {grn.poId}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {grn.receivedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {formatCurrency(
                            grn.financialImpact.finalPayableAmount,
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          Grade: {grn.qualityInspection.overallRating}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedGRN(grn);
                          setIsInspectionModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Summary
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download GRN
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Acceptance Rate</span>
                    <span className="text-sm">
                      {analytics.grnMetrics.qualityAcceptanceRate}%
                    </span>
                  </div>
                  <Progress
                    value={analytics.grnMetrics.qualityAcceptanceRate}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      Average Quality Grade
                    </span>
                    <span className="text-sm">
                      {analytics.grnMetrics.averageQualityGrade}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Defect Rate</span>
                    <span className="text-sm">
                      {analytics.grnMetrics.defectRate}%
                    </span>
                  </div>
                  <Progress
                    value={analytics.grnMetrics.defectRate}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total Received</span>
                    <span className="text-sm font-bold">
                      {formatCurrency(analytics.grnMetrics.totalReceivedValue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total Accepted</span>
                    <span className="text-sm text-green-600">
                      {formatCurrency(analytics.grnMetrics.totalAcceptedValue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      Total Adjustments
                    </span>
                    <span className="text-sm text-orange-600">
                      {formatCurrency(analytics.grnMetrics.totalAdjustments)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Adjustment Rate</span>
                    <span className="text-sm">
                      {analytics.grnMetrics.adjustmentRate}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Discrepancy Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">By Type</h4>
                  <div className="space-y-3">
                    {analytics.discrepancyMetrics.discrepancyByType.map(
                      (type, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">
                            {type.type.replace("_", " ")}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              {type.count}
                            </span>
                            <span className="text-sm">
                              ({type.percentage}%)
                            </span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Financial Impact</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Impact</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(
                          analytics.discrepancyMetrics.totalFinancialImpact,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Average per Discrepancy</span>
                      <span className="text-sm">
                        {formatCurrency(
                          analytics.discrepancyMetrics
                            .averageImpactPerDiscrepancy,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Resolution Rate</span>
                      <span className="text-sm">
                        {(
                          (analytics.discrepancyMetrics.resolvedDiscrepancies /
                            analytics.discrepancyMetrics.totalDiscrepancies) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create GRN Modal */}
      <Dialog
        open={isCreateGRNModalOpen}
        onOpenChange={setIsCreateGRNModalOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New GRN</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="poId">Purchase Order ID</Label>
                <Input
                  id="poId"
                  placeholder="Enter PO ID"
                  value={grnFormData.poId}
                  onChange={(e) =>
                    setGRNFormData((prev) => ({
                      ...prev,
                      poId: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="challanId">Challan ID</Label>
                <Input
                  id="challanId"
                  placeholder="Enter Challan ID"
                  value={grnFormData.challanId}
                  onChange={(e) =>
                    setGRNFormData((prev) => ({
                      ...prev,
                      challanId: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deliveryScheduleId">Delivery Schedule ID</Label>
                <Input
                  id="deliveryScheduleId"
                  placeholder="Enter Delivery Schedule ID"
                  value={grnFormData.deliveryScheduleId}
                  onChange={(e) =>
                    setGRNFormData((prev) => ({
                      ...prev,
                      deliveryScheduleId: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="receivedBy">Received By</Label>
                <Input
                  id="receivedBy"
                  placeholder="Enter receiver name"
                  value={grnFormData.receivedBy}
                  onChange={(e) =>
                    setGRNFormData((prev) => ({
                      ...prev,
                      receivedBy: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any additional notes..."
                value={grnFormData.notes}
                onChange={(e) =>
                  setGRNFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsCreateGRNModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateGRN}
                disabled={
                  !grnFormData.poId ||
                  !grnFormData.challanId ||
                  !grnFormData.receivedBy
                }
              >
                <Save className="h-4 w-4 mr-2" />
                Create GRN
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Inspection Modal */}
      <Dialog
        open={isInspectionModalOpen}
        onOpenChange={setIsInspectionModalOpen}
      >
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>GRN Inspection: {selectedGRN?.grnNumber}</DialogTitle>
          </DialogHeader>

          {selectedGRN && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">GRN Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">PO ID:</span>
                        <span>{selectedGRN.poId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Challan ID:</span>
                        <span>{selectedGRN.challanId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Received Date:</span>
                        <span>
                          {new Date(
                            selectedGRN.receivedDate,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Received By:</span>
                        <span>{selectedGRN.receivedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        <Badge
                          className={getGRNStatusColor(selectedGRN.status)}
                        >
                          {selectedGRN.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Order Value:</span>
                        <span>
                          {formatCurrency(
                            selectedGRN.financialImpact.totalOrderValue,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Received Value:</span>
                        <span>
                          {formatCurrency(
                            selectedGRN.financialImpact.receivedValue,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Accepted Value:</span>
                        <span className="text-green-600">
                          {formatCurrency(
                            selectedGRN.financialImpact.acceptedValue,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Rejected Value:</span>
                        <span className="text-red-600">
                          {formatCurrency(
                            selectedGRN.financialImpact.rejectedValue,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">Final Payable:</span>
                        <span className="font-bold">
                          {formatCurrency(
                            selectedGRN.financialImpact.finalPayableAmount,
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Items Inspection</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Ordered</TableHead>
                        <TableHead>Received</TableHead>
                        <TableHead>Accepted</TableHead>
                        <TableHead>Rejected</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedGRN.receivedItems.map((item) => (
                        <TableRow key={item.itemId}>
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
                          <TableCell>{item.orderedQuantity}</TableCell>
                          <TableCell>{item.receivedQuantity}</TableCell>
                          <TableCell className="text-green-600">
                            {item.acceptedQuantity}
                          </TableCell>
                          <TableCell className="text-red-600">
                            {item.rejectedQuantity}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                item.condition === "excellent"
                                  ? "bg-green-100 text-green-800"
                                  : item.condition === "good"
                                    ? "bg-blue-100 text-blue-800"
                                    : item.condition === "acceptable"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                              }
                            >
                              {item.condition}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.qualityGrade}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Camera className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {selectedGRN.discrepancies.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Discrepancies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedGRN.discrepancies.map((discrepancy, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  discrepancy.severity === "critical"
                                    ? "bg-red-100 text-red-800"
                                    : discrepancy.severity === "high"
                                      ? "bg-orange-100 text-orange-800"
                                      : discrepancy.severity === "medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-blue-100 text-blue-800"
                                }
                              >
                                {discrepancy.severity}
                              </Badge>
                              <span className="font-medium">
                                {discrepancy.type.replace("_", " ")}
                              </span>
                            </div>
                            <Badge
                              className={
                                discrepancy.status === "resolved"
                                  ? "bg-green-100 text-green-800"
                                  : discrepancy.status === "investigating"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {discrepancy.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {discrepancy.description}
                          </p>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Expected: </span>
                              <span>{discrepancy.expectedValue}</span>
                            </div>
                            <div>
                              <span className="font-medium">Actual: </span>
                              <span>{discrepancy.actualValue}</span>
                            </div>
                          </div>
                          {discrepancy.financialImpact !== 0 && (
                            <div className="mt-2 text-sm">
                              <span className="font-medium">
                                Financial Impact:{" "}
                              </span>
                              <span
                                className={
                                  discrepancy.financialImpact > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {formatCurrency(
                                  Math.abs(discrepancy.financialImpact),
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
