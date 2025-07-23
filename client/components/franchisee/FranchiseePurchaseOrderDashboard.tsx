import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  ShoppingCart,
  Plus,
  Edit,
  Eye,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Package,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Users,
  BarChart3,
  Settings,
  MoreHorizontal,
  ArrowLeft,
  Flag,
} from "lucide-react";

import {
  PurchaseOrder,
  PurchaseOrderItem,
  POAnalytics,
  POFormData,
  POFilters,
  DeliveryLocation,
} from "./purchase-order-types";

import {
  mockPurchaseOrders,
  mockPOAnalytics,
  mockDeliveryLocations,
  mockInventoryIntegration,
  mockCatalogIntegration,
  getOrderStatusColor,
  getPriorityColor,
  formatCurrency,
  getAutoFillSuggestions,
  generatePONumber,
  validatePOForm,
  calculateOrderTotal,
} from "./purchase-order-data";

interface FranchiseePurchaseOrderDashboardProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

export function FranchiseePurchaseOrderDashboard({
  activeTab,
  onTabChange,
}: FranchiseePurchaseOrderDashboardProps) {
  const [orders, setOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [analytics, setAnalytics] = useState<POAnalytics>(mockPOAnalytics);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(
    null,
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filters, setFilters] = useState<POFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<POFormData>({
    type: "standard",
    priority: "medium",
    requestedDeliveryDate: "",
    deliveryLocationId: "",
    items: [],
    attachments: [],
  });
  const [autoFillSuggestions, setAutoFillSuggestions] = useState<any[]>([]);

  useEffect(() => {
    // Load auto-fill suggestions based on inventory
    const suggestions = getAutoFillSuggestions(
      mockInventoryIntegration,
      mockCatalogIntegration,
    );
    setAutoFillSuggestions(suggestions);
  }, []);

  const handleCreateOrder = () => {
    const errors = validatePOForm(formData);
    if (errors.length > 0) {
      alert(`Please fix the following errors:\n${errors.join("\n")}`);
      return;
    }

    const newOrder: PurchaseOrder = {
      id: `PO${Date.now()}`,
      poNumber: generatePONumber(),
      franchiseeId: "FRAN001",
      franchiseeName: "Mumbai Central Beverages",
      corporateId: "CORP001",
      corporateName: "BevCorp Industries Ltd.",
      type: formData.type,
      status: "draft",
      priority: formData.priority,
      totalAmount: 0,
      taxAmount: 0,
      discountAmount: 0,
      grandTotal: 0,
      currency: "INR",
      items: formData.items.map((item) => ({
        id: `POI${Date.now()}-${Math.random()}`,
        productId: item.productId,
        sku: `SKU-${item.productId}`,
        productName: `Product ${item.productId}`,
        category: "Beverages",
        description: "Product description",
        specifications: {},
        requestedQuantity: item.requestedQuantity,
        unitPrice: 100,
        totalPrice: item.requestedQuantity * 100,
        netAmount: item.requestedQuantity * 100,
        currentStock: 0,
        minimumStock: 0,
        suggestedQuantity: 0,
        avgMonthlyConsumption: 0,
        itemStatus: "pending",
        priority: "medium",
      })),
      requestedDeliveryDate: formData.requestedDeliveryDate,
      preferredDeliveryTime: formData.preferredDeliveryTime,
      deliveryLocation: mockDeliveryLocations.find(
        (loc) => loc.locationId === formData.deliveryLocationId,
      )!,
      deliveryInstructions: formData.deliveryInstructions,
      notes: formData.notes,
      attachments: [],
      approvalWorkflow: {
        isRequired: true,
        levels: [],
        currentLevel: 0,
        isCompleted: false,
        requiresAllApprovers: false,
        autoApprovalRules: [],
      },
      approvalHistory: [],
      tracking: {
        status: "draft",
        statusHistory: [
          {
            status: "draft",
            timestamp: new Date().toISOString(),
            changedBy: "user@franchise.com",
            reason: "Order created",
          },
        ],
        milestones: [],
      },
      timeline: [
        {
          id: `TL${Date.now()}`,
          timestamp: new Date().toISOString(),
          event: "Order Created",
          description: "Purchase order created",
          type: "creation",
          performedBy: "user@franchise.com",
        },
      ],
      createdAt: new Date().toISOString(),
      createdBy: "user@franchise.com",
      lastModified: new Date().toISOString(),
      modifiedBy: "user@franchise.com",
    };

    setOrders([newOrder, ...orders]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: "standard",
      priority: "medium",
      requestedDeliveryDate: "",
      deliveryLocationId: "",
      items: [],
      attachments: [],
    });
  };

  const handleApplyAutoFill = () => {
    const suggestedItems = autoFillSuggestions.map((suggestion) => ({
      productId: suggestion.productId,
      requestedQuantity: suggestion.suggestedQuantity,
      notes: suggestion.reason,
    }));

    setFormData((prev) => ({
      ...prev,
      items: suggestedItems,
    }));
  };

  const addFormItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productId: "", requestedQuantity: 0 }],
    }));
  };

  const updateFormItem = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const removeFormItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const filteredOrders = orders.filter((order) => {
    if (
      searchTerm &&
      !order.poNumber.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.status &&
      filters.status.length > 0 &&
      !filters.status.includes(order.status)
    ) {
      return false;
    }
    if (
      filters.priority &&
      filters.priority.length > 0 &&
      !filters.priority.includes(order.priority)
    ) {
      return false;
    }
    return true;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards - Exact Screenshot Style */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
          {/* Decorative color patch in top right */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-blue-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-blue-700">
                Total Orders
              </CardTitle>
              <div className="text-3xl font-bold text-blue-900">
                <AnimatedCounter value={analytics.totalOrders} />
              </div>
              <div className="text-sm text-blue-600">
                ₹{formatCurrency(analytics.totalValue).replace("₹", "")} total
                value
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-orange-50 border-orange-100 rounded-2xl p-6 relative overflow-hidden">
          {/* Decorative color patch in top right */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-orange-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-orange-700">
                Pending Orders
              </CardTitle>
              <div className="text-3xl font-bold text-orange-900">
                <AnimatedCounter value={analytics.pendingOrders} />
              </div>
              <div className="text-sm text-orange-600">
                ₹{formatCurrency(analytics.pendingValue).replace("₹", "")}{" "}
                pending value
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
          {/* Decorative color patch in top right */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-green-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-green-700">
                Avg Order Value
              </CardTitle>
              <div className="text-3xl font-bold text-green-900">
                ₹
                <AnimatedCounter
                  value={Math.round(analytics.averageOrderValue / 1000)}
                  suffix=",833"
                />
              </div>
              <div className="text-sm text-green-600">
                {analytics.averageProcessingTime} days avg processing
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">₹</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-100 rounded-2xl p-6 relative overflow-hidden">
          {/* Decorative color patch in top right */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-purple-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-purple-700">
                On-time Delivery
              </CardTitle>
              <div className="text-3xl font-bold text-purple-900">
                <AnimatedCounter
                  value={analytics.onTimeDeliveryRate}
                  suffix="%"
                />
              </div>
              <div className="text-sm text-purple-600">
                {analytics.approvalRate}% approval rate
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="hover-lift animate-fadeInUp">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={FileText}
                animation="float"
                className="text-primary"
              />
              <CardTitle>Recent Purchase Orders</CardTitle>
            </div>
            <Badge variant="outline" className="animate-pulse">
              <AnimatedCounter value={orders.length} /> orders
            </Badge>
          </div>
          <CardDescription>
            Latest purchase order activities and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order, index) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gradient-to-br from-primary/20 to-construction-500/20 rounded-lg">
                    <AnimatedIcon
                      icon={Package}
                      animation="float"
                      className="text-primary"
                      size="sm"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{order.poNumber}</h4>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} items •{" "}
                      {formatCurrency(order.grandTotal)}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <AnimatedIcon
                        icon={Calendar}
                        size="sm"
                        className="opacity-70"
                      />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={`${getPriorityColor(order.priority)} capitalize`}
                  >
                    {order.priority === "high" && (
                      <PulsingDot className="mr-1 scale-50" />
                    )}
                    {order.priority}
                  </Badge>
                  <Badge
                    className={`${getOrderStatusColor(order.status)} capitalize`}
                  >
                    {order.status === "approved" && (
                      <CheckCircle className="mr-1 h-3 w-3" />
                    )}
                    {order.status === "in_transit" && (
                      <Truck className="mr-1 h-3 w-3" />
                    )}
                    {order.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Auto-fill Suggestions */}
      {autoFillSuggestions.length > 0 && (
        <Card className="hover-lift animate-fadeInUp relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Activity}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Smart Reorder Suggestions</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-primary/10 to-construction-500/10"
                >
                  AI Powered
                </Badge>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={autoFillSuggestions.length} />{" "}
                suggestions
              </Badge>
            </div>
            <CardDescription>
              Intelligent inventory-based recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {autoFillSuggestions.slice(0, 3).map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg">
                      <AnimatedIcon
                        icon={AlertTriangle}
                        animation="glow"
                        className="text-orange-600"
                        size="sm"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Product {suggestion.productId}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Suggested:{" "}
                        <span className="font-medium">
                          {suggestion.suggestedQuantity} units
                        </span>
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>{suggestion.reason}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={`${getPriorityColor(suggestion.priority)} capitalize`}
                  >
                    {suggestion.priority === "urgent" && (
                      <PulsingDot className="mr-1 scale-50" />
                    )}
                    {suggestion.priority}
                  </Badge>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full mt-6 hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
            >
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Order from Suggestions
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      {/* Search and Filters - Employee Management Style */}
      <Card className="animate-fadeInUp">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <AnimatedIcon
                icon={Search}
                animation="pulse"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search orders by PO number, status, or amount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={filters.status?.[0] || "all"}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  status: value === "all" ? undefined : [value as any],
                }))
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon icon={Filter} animation="bounce" className="mr-2" />
              More Filters
            </Button>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
            >
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Order
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Orders Table - Employee Management Style */}
      <Card className="hover-lift animate-fadeInUp">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={ShoppingCart}
                animation="float"
                className="text-primary"
              />
              <CardTitle>Purchase Orders Directory</CardTitle>
            </div>
            <Badge variant="outline" className="animate-pulse">
              <AnimatedCounter value={filteredOrders.length} /> orders
            </Badge>
          </div>
          <CardDescription>
            Complete purchase order information and tracking details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Purchase Order</TableHead>
                  <TableHead>Order Details</TableHead>
                  <TableHead>Financial</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-muted/50 transition-colors animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-primary/20 to-construction-500/20 rounded-lg">
                          <AnimatedIcon
                            icon={Package}
                            animation="float"
                            className="text-primary"
                            size="sm"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{order.poNumber}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <AnimatedIcon
                              icon={Calendar}
                              size="sm"
                              className="opacity-70"
                            />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-1">
                          <AnimatedIcon
                            icon={Package}
                            size="sm"
                            className="text-primary opacity-70"
                          />
                          {order.items.length} items
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <AnimatedIcon
                            icon={MapPin}
                            size="sm"
                            className="opacity-70"
                          />
                          {order.deliveryLocation.locationName}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <AnimatedIcon
                            icon={Calendar}
                            size="sm"
                            className="opacity-70"
                          />
                          Due:{" "}
                          {new Date(
                            order.requestedDeliveryDate,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <AnimatedIcon
                          icon={DollarSign}
                          size="sm"
                          className="text-green-600"
                        />
                        <span className="font-semibold">
                          {formatCurrency(order.grandTotal)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getPriorityColor(order.priority)} capitalize`}
                      >
                        {order.priority === "high" && (
                          <PulsingDot className="mr-1 scale-50" />
                        )}
                        {order.priority === "urgent" && (
                          <AlertTriangle className="mr-1 h-3 w-3" />
                        )}
                        {order.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getOrderStatusColor(order.status)} capitalize`}
                      >
                        {order.status === "approved" && (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        )}
                        {order.status === "in_transit" && (
                          <Truck className="mr-1 h-3 w-3" />
                        )}
                        {order.status === "pending_approval" && (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        {order.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover-lift"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsViewModalOpen(true);
                          }}
                        >
                          <AnimatedIcon icon={Eye} size="sm" className="mr-1" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover-lift"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <AnimatedIcon
                            icon={Edit}
                            size="sm"
                            className="mr-1"
                          />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCreateModal = () => (
    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-construction-500/20 rounded-lg">
              <AnimatedIcon
                icon={Plus}
                animation="bounce"
                className="text-primary"
                size="sm"
              />
            </div>
            <DialogTitle className="text-2xl font-bold gradient-text">
              Create Purchase Order
            </DialogTitle>
          </div>
          <p className="text-muted-foreground">
            Create a new purchase order with intelligent suggestions and
            automated workflows
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Basic Information */}
          <Card className="hover-lift animate-fadeInUp">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Settings}
                  animation="float"
                  className="text-primary"
                  size="sm"
                />
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="type"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <AnimatedIcon
                      icon={Package}
                      size="sm"
                      className="text-primary opacity-70"
                    />
                    Order Type
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) =>
                      setFormData((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger className="hover-lift">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Standard
                        </div>
                      </SelectItem>
                      <SelectItem value="urgent">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          Urgent
                        </div>
                      </SelectItem>
                      <SelectItem value="bulk">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4 text-blue-500" />
                          Bulk
                        </div>
                      </SelectItem>
                      <SelectItem value="seasonal">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-green-500" />
                          Seasonal
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="priority"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <AnimatedIcon
                      icon={Flag}
                      size="sm"
                      className="text-primary opacity-70"
                    />
                    Priority
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: any) =>
                      setFormData((prev) => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger className="hover-lift">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <Badge className="bg-gray-100 text-gray-700">Low</Badge>
                      </SelectItem>
                      <SelectItem value="medium">
                        <Badge className="bg-blue-100 text-blue-700">
                          Medium
                        </Badge>
                      </SelectItem>
                      <SelectItem value="high">
                        <Badge className="bg-orange-100 text-orange-700">
                          High
                        </Badge>
                      </SelectItem>
                      <SelectItem value="urgent">
                        <Badge className="bg-red-100 text-red-700">
                          Urgent
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card className="hover-lift animate-fadeInUp">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Truck}
                  animation="float"
                  className="text-primary"
                  size="sm"
                />
                <CardTitle className="text-lg">Delivery Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="deliveryDate"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <AnimatedIcon
                      icon={Calendar}
                      size="sm"
                      className="text-primary opacity-70"
                    />
                    Requested Delivery Date
                  </Label>
                  <Input
                    type="date"
                    className="hover-lift"
                    value={formData.requestedDeliveryDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        requestedDeliveryDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="deliveryTime"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <AnimatedIcon
                      icon={Clock}
                      size="sm"
                      className="text-primary opacity-70"
                    />
                    Preferred Delivery Time
                  </Label>
                  <Input
                    className="hover-lift"
                    placeholder="e.g., 10:00 AM - 12:00 PM"
                    value={formData.preferredDeliveryTime || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        preferredDeliveryTime: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="location"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <AnimatedIcon
                    icon={MapPin}
                    size="sm"
                    className="text-primary opacity-70"
                  />
                  Delivery Location
                </Label>
                <Select
                  value={formData.deliveryLocationId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      deliveryLocationId: value,
                    }))
                  }
                >
                  <SelectTrigger className="hover-lift">
                    <SelectValue placeholder="Select delivery location" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDeliveryLocations.map((location) => (
                      <SelectItem
                        key={location.locationId}
                        value={location.locationId}
                      >
                        <div className="flex items-center gap-2">
                          <AnimatedIcon
                            icon={location.type === "store" ? Package : Truck}
                            size="sm"
                            className="text-primary opacity-70"
                          />
                          {location.locationName} - {location.type}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Auto-fill Suggestions */}
          {autoFillSuggestions.length > 0 && (
            <Card className="hover-lift animate-fadeInUp relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Activity}
                      animation="pulse"
                      className="text-primary"
                    />
                    <CardTitle className="text-lg">Smart Suggestions</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-primary/10 to-construction-500/10"
                    >
                      AI Powered
                    </Badge>
                  </div>
                  <Badge variant="outline" className="animate-pulse">
                    <AnimatedCounter value={autoFillSuggestions.length} />{" "}
                    suggestions
                  </Badge>
                </div>
                <CardDescription>
                  Intelligent inventory-based recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {autoFillSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg">
                          <AnimatedIcon
                            icon={AlertTriangle}
                            animation="glow"
                            className="text-orange-600"
                            size="sm"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            Product {suggestion.productId}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Suggested:{" "}
                            <span className="font-medium">
                              {suggestion.suggestedQuantity} units
                            </span>
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>{suggestion.reason}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={`${getPriorityColor(suggestion.priority)} capitalize`}
                      >
                        {suggestion.priority === "urgent" && (
                          <PulsingDot className="mr-1 scale-50" />
                        )}
                        {suggestion.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleApplyAutoFill}
                  className="w-full mt-6 hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
                >
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Apply All Suggestions
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Order Items */}
          <Card className="hover-lift animate-fadeInUp">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Package}
                    animation="float"
                    className="text-primary"
                    size="sm"
                  />
                  <CardTitle className="text-lg">Order Items</CardTitle>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addFormItem}
                  className="hover-lift"
                >
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                    size="sm"
                  />
                  Add Item
                </Button>
              </div>
              <CardDescription>
                Add products to your purchase order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-4 items-end p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <AnimatedIcon
                          icon={Package}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        Product ID
                      </Label>
                      <Input
                        className="hover-lift"
                        placeholder="Product ID"
                        value={item.productId}
                        onChange={(e) =>
                          updateFormItem(index, "productId", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <AnimatedIcon
                          icon={DollarSign}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        Quantity
                      </Label>
                      <Input
                        className="hover-lift"
                        type="number"
                        placeholder="Quantity"
                        value={item.requestedQuantity}
                        onChange={(e) =>
                          updateFormItem(
                            index,
                            "requestedQuantity",
                            parseInt(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <AnimatedIcon
                          icon={FileText}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        Notes
                      </Label>
                      <Input
                        className="hover-lift"
                        placeholder="Optional notes"
                        value={item.notes || ""}
                        onChange={(e) =>
                          updateFormItem(index, "notes", e.target.value)
                        }
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeFormItem(index)}
                      className="hover-lift self-end"
                    >
                      <AnimatedIcon icon={XCircle} size="sm" />
                    </Button>
                  </div>
                ))}
                {formData.items.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <AnimatedIcon
                      icon={Package}
                      animation="float"
                      className="mx-auto mb-2"
                    />
                    <p>No items added yet. Click "Add Item" to get started.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="hover-lift animate-fadeInUp">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={FileText}
                  animation="float"
                  className="text-primary"
                  size="sm"
                />
                <CardTitle className="text-lg">
                  Additional Information
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label
                  htmlFor="instructions"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <AnimatedIcon
                    icon={Truck}
                    size="sm"
                    className="text-primary opacity-70"
                  />
                  Delivery Instructions
                </Label>
                <Textarea
                  className="hover-lift"
                  placeholder="Special delivery instructions..."
                  value={formData.deliveryInstructions || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      deliveryInstructions: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="notes"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <AnimatedIcon
                    icon={FileText}
                    size="sm"
                    className="text-primary opacity-70"
                  />
                  Order Notes
                </Label>
                <Textarea
                  className="hover-lift"
                  placeholder="Additional notes or comments..."
                  value={formData.notes || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
              className="hover-lift"
            >
              <AnimatedIcon icon={XCircle} size="sm" className="mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleCreateOrder}
              className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
            >
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Order
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderViewModal = () => (
    <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-construction-500/20 rounded-lg">
              <AnimatedIcon
                icon={Eye}
                animation="float"
                className="text-primary"
                size="sm"
              />
            </div>
            <DialogTitle className="text-2xl font-bold gradient-text">
              Purchase Order Details
            </DialogTitle>
          </div>
          <p className="text-muted-foreground">
            Complete information and tracking details for this purchase order
          </p>
        </DialogHeader>

        {selectedOrder && (
          <div className="space-y-6 mt-6">
            {/* Header Information */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="hover-lift animate-fadeInUp">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={FileText}
                      animation="float"
                      className="text-primary"
                      size="sm"
                    />
                    <CardTitle className="text-lg">Order Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Package}
                        size="sm"
                        className="text-primary opacity-70"
                      />
                      <span className="font-medium">PO Number:</span>
                    </div>
                    <span className="font-semibold">
                      {selectedOrder.poNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Settings}
                        size="sm"
                        className="text-primary opacity-70"
                      />
                      <span className="font-medium">Type:</span>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {selectedOrder.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Flag}
                        size="sm"
                        className="text-primary opacity-70"
                      />
                      <span className="font-medium">Priority:</span>
                    </div>
                    <Badge
                      className={`${getPriorityColor(selectedOrder.priority)} capitalize`}
                    >
                      {selectedOrder.priority === "high" && (
                        <PulsingDot className="mr-1 scale-50" />
                      )}
                      {selectedOrder.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Activity}
                        size="sm"
                        className="text-primary opacity-70"
                      />
                      <span className="font-medium">Status:</span>
                    </div>
                    <Badge
                      className={`${getOrderStatusColor(selectedOrder.status)} capitalize`}
                    >
                      {selectedOrder.status === "approved" && (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      )}
                      {selectedOrder.status === "in_transit" && (
                        <Truck className="mr-1 h-3 w-3" />
                      )}
                      {selectedOrder.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Calendar}
                        size="sm"
                        className="text-primary opacity-70"
                      />
                      <span className="font-medium">Created:</span>
                    </div>
                    <span className="text-sm">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift animate-fadeInUp">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={DollarSign}
                      animation="float"
                      className="text-green-600"
                      size="sm"
                    />
                    <CardTitle className="text-lg">Financial Summary</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={DollarSign}
                        size="sm"
                        className="text-green-600 opacity-70"
                      />
                      <span className="font-medium">Total Amount:</span>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency(selectedOrder.totalAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={FileText}
                        size="sm"
                        className="text-blue-600 opacity-70"
                      />
                      <span className="font-medium">Tax Amount:</span>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency(selectedOrder.taxAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={TrendingDown}
                        size="sm"
                        className="text-orange-600 opacity-70"
                      />
                      <span className="font-medium">Discount:</span>
                    </div>
                    <span className="font-semibold text-orange-600">
                      -{formatCurrency(selectedOrder.discountAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={DollarSign}
                        animation="glow"
                        className="text-green-600"
                      />
                      <span className="font-bold text-lg">Grand Total:</span>
                    </div>
                    <span className="font-bold text-xl text-green-600">
                      {formatCurrency(selectedOrder.grandTotal)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Delivery Information */}
            <Card className="hover-lift animate-fadeInUp">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Truck}
                    animation="float"
                    className="text-primary"
                    size="sm"
                  />
                  <CardTitle className="text-lg">
                    Delivery Information
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={MapPin}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        <span className="font-medium">Location:</span>
                      </div>
                      <span>{selectedOrder.deliveryLocation.locationName}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={MapPin}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        <span className="font-medium">Address:</span>
                      </div>
                      <span className="text-right text-sm">
                        {selectedOrder.deliveryLocation.address.street},{" "}
                        {selectedOrder.deliveryLocation.address.city}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={Users}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        <span className="font-medium">Contact:</span>
                      </div>
                      <span>
                        {selectedOrder.deliveryLocation.contactPerson.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={Phone}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        <span className="font-medium">Phone:</span>
                      </div>
                      <span>
                        {selectedOrder.deliveryLocation.contactPerson.phone}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={Calendar}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        <span className="font-medium">Requested Date:</span>
                      </div>
                      <span>
                        {new Date(
                          selectedOrder.requestedDeliveryDate,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={Clock}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        <span className="font-medium">Preferred Time:</span>
                      </div>
                      <span>
                        {selectedOrder.preferredDeliveryTime || "Any time"}
                      </span>
                    </div>
                    {selectedOrder.deliveryInstructions && (
                      <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <AnimatedIcon
                            icon={FileText}
                            size="sm"
                            className="text-primary opacity-70"
                          />
                          <span className="font-medium">Instructions:</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrder.deliveryInstructions}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="hover-lift animate-fadeInUp">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Package}
                      animation="float"
                      className="text-primary"
                      size="sm"
                    />
                    <CardTitle className="text-lg">Order Items</CardTitle>
                  </div>
                  <Badge variant="outline" className="animate-pulse">
                    <AnimatedCounter value={selectedOrder.items.length} /> items
                  </Badge>
                </div>
                <CardDescription>
                  Complete list of products in this order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Details</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item, index) => (
                        <TableRow
                          key={item.id}
                          className="hover:bg-muted/50 transition-colors animate-fadeInUp"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gradient-to-br from-primary/20 to-construction-500/20 rounded-lg">
                                <AnimatedIcon
                                  icon={Package}
                                  animation="float"
                                  className="text-primary"
                                  size="sm"
                                />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {item.productName}
                                </p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <AnimatedIcon
                                    icon={FileText}
                                    size="sm"
                                    className="opacity-70"
                                  />
                                  {item.sku}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <AnimatedIcon
                                icon={DollarSign}
                                size="sm"
                                className="text-primary opacity-70"
                              />
                              <span className="font-medium">
                                {item.requestedQuantity}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">
                              {formatCurrency(item.unitPrice)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-green-600">
                              {formatCurrency(item.netAmount)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${getOrderStatusColor(item.itemStatus as any)} capitalize`}
                            >
                              {item.itemStatus === "approved" && (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              )}
                              {item.itemStatus === "pending" && (
                                <Clock className="mr-1 h-3 w-3" />
                              )}
                              {item.itemStatus}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card className="hover-lift animate-fadeInUp">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Activity}
                    animation="pulse"
                    className="text-primary"
                    size="sm"
                  />
                  <CardTitle className="text-lg">Order Timeline</CardTitle>
                </div>
                <CardDescription>
                  Complete activity history and tracking information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedOrder.timeline.map((event, index) => (
                    <div
                      key={event.id}
                      className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary/20 to-construction-500/20 rounded-full">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold">{event.event}</p>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <AnimatedIcon
                              icon={Calendar}
                              size="sm"
                              className="opacity-70"
                            />
                            {new Date(event.timestamp).toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <AnimatedIcon
                              icon={Users}
                              size="sm"
                              className="opacity-70"
                            />
                            {event.performedBy}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
                className="hover-lift"
              >
                <AnimatedIcon icon={XCircle} size="sm" className="mr-2" />
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedOrder(selectedOrder);
                  setIsEditModalOpen(true);
                }}
                className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
              >
                <AnimatedIcon icon={Edit} animation="bounce" className="mr-2" />
                Edit Order
                <ShimmerEffect className="absolute inset-0" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {analytics.performanceMetrics.map((metric, index) => (
          <Card
            key={metric.name}
            className="hover-lift animate-fadeInUp relative overflow-hidden group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{metric.name}</p>
                  <AnimatedIcon
                    icon={BarChart3}
                    animation="float"
                    className="text-primary"
                    size="sm"
                  />
                </div>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={metric.value} suffix={metric.unit} />
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <AnimatedIcon
                    icon={metric.trend === "up" ? TrendingUp : TrendingDown}
                    size="sm"
                    className={
                      metric.trend === "up"
                        ? "text-green-600"
                        : metric.trend === "down"
                          ? "text-red-600"
                          : "text-gray-600"
                    }
                  />
                  <span
                    className={`font-medium ${metric.trend === "up" ? "text-green-600" : metric.trend === "down" ? "text-red-600" : "text-gray-600"}`}
                  >
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}
                    {metric.unit} from last month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topCategories.map((category) => (
              <div
                key={category.category}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{category.category}</p>
                  <p className="text-sm text-muted-foreground">
                    {category.orderCount} orders
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {formatCurrency(category.totalValue)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {category.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.monthlyTrends.map((trend) => (
              <div
                key={trend.month}
                className="grid grid-cols-4 gap-4 items-center"
              >
                <div className="font-medium">{trend.month}</div>
                <div className="text-center">{trend.orderCount} orders</div>
                <div className="text-center">
                  {formatCurrency(trend.totalValue)}
                </div>
                <div className="text-center">
                  {formatCurrency(trend.averageValue)} avg
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card className="hover-lift animate-fadeInUp">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AnimatedIcon
              icon={Settings}
              animation="float"
              className="text-primary"
            />
            <CardTitle>Purchase Order Settings</CardTitle>
          </div>
          <CardDescription>
            Configure workflows, auto-fill options, and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AnimatedIcon
                icon={CheckCircle}
                animation="pulse"
                className="text-primary"
                size="sm"
              />
              Approval Workflow
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Users}
                    size="sm"
                    className="text-primary opacity-70"
                  />
                  <span>Enable approval workflow</span>
                </div>
                <Button variant="outline" className="hover-lift">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={DollarSign}
                    size="sm"
                    className="text-green-600 opacity-70"
                  />
                  <span>Auto-approval threshold</span>
                </div>
                <Badge variant="outline">₹25,000</Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AnimatedIcon
                icon={Activity}
                animation="pulse"
                className="text-primary"
                size="sm"
              />
              Auto-fill Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Package}
                    size="sm"
                    className="text-primary opacity-70"
                  />
                  <span>Enable inventory-based suggestions</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <PulsingDot className="mr-1 scale-50" />
                  Enabled
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={BarChart3}
                    size="sm"
                    className="text-primary opacity-70"
                  />
                  <span>Historical data analysis</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <PulsingDot className="mr-1 scale-50" />
                  Enabled
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AnimatedIcon
                icon={Mail}
                animation="pulse"
                className="text-primary"
                size="sm"
              />
              Notification Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Mail}
                    size="sm"
                    className="text-primary opacity-70"
                  />
                  <span>Email notifications</span>
                </div>
                <Button variant="outline" className="hover-lift">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Phone}
                    size="sm"
                    className="text-primary opacity-70"
                  />
                  <span>SMS alerts for urgent orders</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <PulsingDot className="mr-1 scale-50" />
                  Enabled
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slideInDown">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold gradient-text">
              Purchase Order Management
            </h1>
            <GlowingOrb className="animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <AnimatedIcon
              icon={ShoppingCart}
              animation="float"
              className="text-primary"
            />
            <p className="text-muted-foreground">
              Create, track, and manage purchase orders to corporate with
              intelligent auto-fill suggestions
            </p>
          </div>
        </div>
        <div className="flex gap-2 animate-slideInRight">
          <Button variant="outline" className="hover-lift">
            <AnimatedIcon icon={Download} animation="bounce" className="mr-2" />
            Export Data
          </Button>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
          >
            <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
            Create Order
            <ShimmerEffect className="absolute inset-0" />
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {renderDashboard()}
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          {renderOrders()}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {renderAnalytics()}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {renderSettings()}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {renderCreateModal()}
      {renderViewModal()}
    </div>
  );
}

export default FranchiseePurchaseOrderDashboard;
