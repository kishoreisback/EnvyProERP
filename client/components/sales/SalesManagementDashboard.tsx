import React, { useState, useEffect, useMemo } from "react";
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
import { AnimatedCounter } from "../ui/animated-counter";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Users,
  Package,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calculator,
  CreditCard,
  Building2,
  Calendar,
  Target,
  Award,
  Zap,
  RefreshCw,
} from "lucide-react";
import { useLogger } from "../../hooks/useLogger";
import { useAuditLogger } from "../../hooks/useAuditLogger";
import { SalesPerformanceReportsDashboard } from "../sales-reports";
import {
  salesDashboardSummary,
  salesCustomers,
  salesQuotations,
  salesOrders,
  products,
  businessRules,
  exchangeRates,
  getCustomerById,
  checkCreditLimit,
  validateBusinessRule,
} from "./data";
import {
  SalesCustomer,
  SalesQuotation,
  SalesOrder,
  Product,
  SalesDashboardSummary,
  BusinessRule,
  CreditCheckResult,
} from "./types";

interface SalesManagementDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function SalesManagementDashboard({
  currentTab = "overview",
  onTabChange,
}: SalesManagementDashboardProps) {
  const { logUserAction } = useLogger();
  const { logOrderEvent, logAudit } = useAuditLogger("sales");
  const [activeTab, setActiveTab] = useState(currentTab);
  const [selectedTenant, setSelectedTenant] = useState("tenant_buildcorp");
  const [searchQuery, setSearchQuery] = useState("");
  const [dashboardData, setDashboardData] = useState<SalesDashboardSummary>(
    salesDashboardSummary,
  );
  const [selectedCustomer, setSelectedCustomer] =
    useState<SalesCustomer | null>(null);
  const [selectedQuotation, setSelectedQuotation] =
    useState<SalesQuotation | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);
  const [creditCheckResult, setCreditCheckResult] =
    useState<CreditCheckResult | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCreditCheckModal, setShowCreditCheckModal] = useState(false);
  const [showNewQuotationModal, setShowNewQuotationModal] = useState(false);
  const [showPriceCalculatorModal, setShowPriceCalculatorModal] =
    useState(false);

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
    logUserAction("switch_sales_tab", "SalesManagementDashboard", {
      tab: newTab,
    });
  };

  // Filtered data based on search
  const filteredCustomers = useMemo(() => {
    return salesCustomers.filter(
      (customer) =>
        customer.companyName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        customer.contactPerson
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        customer.customerCode.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const filteredQuotations = useMemo(() => {
    return salesQuotations.filter(
      (quotation) =>
        quotation.quotationNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        quotation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quotation.customer.companyName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const filteredOrders = useMemo(() => {
    return salesOrders.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.companyName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  // Status color helpers
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      draft: "bg-gray-100 text-gray-800",
      sent: "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      expired: "bg-red-100 text-red-800",
      confirmed: "bg-green-100 text-green-800",
      in_production: "bg-orange-100 text-orange-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      paid: "bg-green-100 text-green-800",
      overdue: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const formatCurrency = (amount: number, currency: string = "INR") => {
    if (currency === "INR") {
      return `₹${amount.toLocaleString("en-IN")}`;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const handleCustomerAction = (action: string, customer: SalesCustomer) => {
    logUserAction(`customer_${action}`, "SalesManagementDashboard", {
      customerId: customer.id,
    });

    switch (action) {
      case "view":
        setSelectedCustomer(customer);
        setShowCustomerModal(true);
        break;
      case "credit_check":
        const result = checkCreditLimit(customer.id, 1000000); // Sample amount
        setCreditCheckResult(result);
        setShowCreditCheckModal(true);
        break;
      case "approve":
        alert(`Customer ${customer.companyName} approved for transactions`);
        break;
      case "edit":
        alert(`Edit customer: ${customer.companyName}`);
        break;
      case "create_quotation":
        setShowNewQuotationModal(true);
        break;
      case "view_orders":
        alert(`Viewing orders for ${customer.companyName}`);
        break;
    }
  };

  const handleQuotationAction = (action: string, quotation: SalesQuotation) => {
    logUserAction(`quotation_${action}`, "SalesManagementDashboard", {
      quotationId: quotation.id,
    });

    switch (action) {
      case "view":
        setSelectedQuotation(quotation);
        setShowQuotationModal(true);
        break;
      case "convert_to_order":
        // Create a new order from quotation
        const newOrder: SalesOrder = {
          id: `order_${Date.now()}`,
          tenantId: quotation.tenantId,
          orderNumber: `SO-${Date.now()}`,
          quotationId: quotation.id,
          customer: quotation.customer,
          title: quotation.title,
          status: "confirmed",
          items: quotation.items,
          subtotal: quotation.subtotal,
          taxAmount: quotation.taxAmount,
          totalAmount: quotation.totalAmount,
          currency: quotation.currency,
          orderDate: new Date().toISOString().split("T")[0],
          expectedDelivery: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          salesRep: quotation.salesRep,
          paymentTerms: quotation.paymentTerms || "30 days",
          paymentStatus: "pending",
          deliveryAddress: quotation.customer.address,
          notes: `Converted from quotation ${quotation.quotationNumber}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Update the dashboard data to include the new order
        setDashboardData((prev) => ({
          ...prev,
          orders: {
            ...prev.orders,
            totalOrders: prev.orders.totalOrders + 1,
            totalValue: prev.orders.totalValue + newOrder.totalAmount,
          },
        }));

        setShowQuotationModal(false);
        alert(`Quotation converted to order: ${newOrder.orderNumber}`);
        break;
      case "edit":
        alert(`Edit quotation: ${quotation.quotationNumber}`);
        break;
      case "send":
        alert(`Quotation sent to ${quotation.customer.companyName}`);
        break;
      case "download":
        alert(`Downloading quotation: ${quotation.quotationNumber}`);
        break;
    }
  };

  const handleOrderAction = (action: string, order: SalesOrder) => {
    logUserAction(`order_${action}`, "SalesManagementDashboard", {
      orderId: order.id,
    });

    switch (action) {
      case "view":
        setSelectedOrder(order);
        setShowOrderModal(true);
        break;
      case "update_status":
        alert(`Update status for order: ${order.orderNumber}`);
        break;
      case "generate_invoice":
        alert(`Generating invoice for order: ${order.orderNumber}`);
        break;
      case "track_delivery":
        alert(`Tracking delivery for order: ${order.orderNumber}`);
        break;
      case "download":
        alert(`Downloading order: ${order.orderNumber}`);
        break;
    }
  };

  const handleProductAction = (action: string, product: Product) => {
    logUserAction(`product_${action}`, "SalesManagementDashboard", {
      productId: product.id,
    });

    switch (action) {
      case "edit":
        alert(`Edit product: ${product.name}`);
        break;
      case "view":
        alert(`View product details: ${product.name}`);
        break;
      case "update_stock":
        alert(`Update stock for: ${product.name}`);
        break;
    }
  };

  const handleGeneralAction = (action: string, data?: any) => {
    logUserAction(`general_${action}`, "SalesManagementDashboard", data);

    switch (action) {
      case "refresh_rates":
        alert("Exchange rates updated successfully");
        break;
      case "export_data":
        alert("Exporting data...");
        break;
      case "import_data":
        alert("Import data functionality");
        break;
      case "sync_inventory":
        alert("Syncing with inventory system...");
        break;
    }
  };

  const validateBusinessRules = (entity: any, entityType: string) => {
    const applicableRules = businessRules.filter(
      (rule) => rule.entity === entityType && rule.isActive,
    );

    const violations = [];
    for (const rule of applicableRules) {
      const result = validateBusinessRule(rule, entity);
      if (!result.valid) {
        violations.push(result.message);
      }
    }

    return violations;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            Sales Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive quotation, order, and customer management system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="gap-2"
            onClick={() => setShowNewQuotationModal(true)}
          >
            <Plus className="h-4 w-4" />
            New Quotation
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowPriceCalculatorModal(true)}
          >
            <Calculator className="h-4 w-4" />
            Price Calculator
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pipeline Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={dashboardData.quotations.pipelineValue / 1000000}
                suffix="M"
                prefix="₹"
              />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+12.5%</span>
              from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={dashboardData.quotations.conversionRate}
                suffix="%"
              />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+2.1%</span>
              improvement
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={dashboardData.orders.inProgress} />
            </div>
            <div className="text-xs text-muted-foreground">
              {formatCurrency(dashboardData.orders.totalValue / 1000000)}M in
              progress
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={dashboardData.customers.active} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="text-green-600">
                +{dashboardData.customers.new}
              </span>
              new this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Collection Rate
            </CardTitle>
            <CreditCard className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={dashboardData.financial.collectionEfficiency}
                suffix="%"
              />
            </div>
            <div className="text-xs text-muted-foreground">
              ₹{(dashboardData.financial.outstanding / 1000000).toFixed(1)}M
              outstanding
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quotations">Quotations</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Performance Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Sales Pipeline */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Pipeline</CardTitle>
                <CardDescription>Current quotations by status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Draft</span>
                    <span className="font-medium">8 (₹15M)</span>
                  </div>
                  <Progress value={32} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sent</span>
                    <span className="font-medium">10 (₹22M)</span>
                  </div>
                  <Progress value={40} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Under Review</span>
                    <span className="font-medium">5 (₹8M)</span>
                  </div>
                  <Progress value={20} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Won</span>
                    <span className="font-medium">5 (₹15M)</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest sales activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Order SO-2024-001 confirmed
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Metro Real Estate Ltd - ₹4.77L
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      2h ago
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Quotation Q-2024-003 sent
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Government Housing Board - ₹25M
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      4h ago
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Users className="h-4 w-4 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        New customer approved
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Suntech Infrastructure - Credit: ₹5Cr
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      1d ago
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Credit limit exceeded
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ABC Developers - Requires approval
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      2d ago
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Best sellers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {products
                    .slice(0, 3)
                    .filter((product) => product && product.name)
                    .map((product, index) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.productCode || ""}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {formatCurrency(product.sellingPrice)}
                          </p>
                          <p className="text-xs text-green-600">
                            +{(index + 1) * 15}% sales
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credit Status</CardTitle>
                <CardDescription>Customer credit utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Total Credit Limit</span>
                    <span className="font-medium">₹175Cr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Utilized</span>
                    <span className="font-medium text-orange-600">₹45Cr</span>
                  </div>
                  <Progress value={25.7} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Available</span>
                    <span className="font-medium text-green-600">₹130Cr</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    2 customers exceed 80% limit
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Rules Status</CardTitle>
                <CardDescription>Active validation rules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {businessRules.slice(0, 4).map((rule) => (
                    <div
                      key={rule.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">{rule.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {rule.type}
                        </p>
                      </div>
                      <Badge variant={rule.isActive ? "default" : "secondary"}>
                        {rule.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Quotations Tab */}
        <TabsContent value="quotations" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Quotations</h2>
              <p className="text-muted-foreground">
                Manage sales quotations and proposals
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search quotations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  alert(
                    "Filter quotations by: Status, Customer, Date Range, Amount",
                  )
                }
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button onClick={() => setShowNewQuotationModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Quotation
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quotation #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuotations.map((quotation) => (
                    <TableRow key={quotation.id}>
                      <TableCell className="font-medium">
                        {quotation.quotationNumber}
                        {quotation.version > 1 && (
                          <Badge variant="outline" className="ml-2">
                            v{quotation.version}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {quotation.customer.companyName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {quotation.customer.contactPerson}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{quotation.title}</TableCell>
                      <TableCell>
                        {formatCurrency(quotation.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(quotation.status)}>
                          {quotation.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            new Date(quotation.validUntil) < new Date()
                              ? "text-red-600"
                              : ""
                          }
                        >
                          {new Date(quotation.validUntil).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              handleQuotationAction("view", quotation)
                            }
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          {quotation.status === "accepted" &&
                            !quotation.convertedToOrder && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  handleQuotationAction(
                                    "convert_to_order",
                                    quotation,
                                  )
                                }
                              >
                                <ShoppingCart className="h-3 w-3" />
                              </Button>
                            )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Sales Orders</h2>
              <p className="text-muted-foreground">
                Track and manage customer orders
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  alert(
                    "Filter orders by: Status, Customer, Date Range, Payment Status",
                  )
                }
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                onClick={() => alert("Create new sales order from quotation")}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.orderNumber}
                        {order.quotationId && (
                          <Badge variant="outline" className="ml-2">
                            From Quote
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {order.customer.companyName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.customer.contactPerson}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{order.title}</TableCell>
                      <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            new Date(order.expectedDeliveryDate) < new Date()
                              ? "text-red-600"
                              : ""
                          }
                        >
                          {new Date(
                            order.expectedDeliveryDate,
                          ).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.priority === "urgent"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {order.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOrderAction("view", order)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
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
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Customer Management</h2>
              <p className="text-muted-foreground">
                Manage customer relationships and approvals
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  alert(
                    "Filter customers by: Status, Approval Status, Credit Limit, Industry",
                  )
                }
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                onClick={() => alert("Add new customer registration form")}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Customer
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Code</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Credit Limit</TableHead>
                    <TableHead>Available Credit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approval</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {customer.customerCode}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{customer.companyName}</p>
                          <p className="text-sm text-muted-foreground">
                            {customer.industry}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {customer.contactPerson}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {customer.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatCurrency(customer.creditLimit)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {formatCurrency(customer.availableCredit)}
                          </p>
                          <Progress
                            value={
                              ((customer.creditLimit -
                                customer.availableCredit) /
                                customer.creditLimit) *
                              100
                            }
                            className="h-1 mt-1"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(customer.approvalStatus)}
                        >
                          {customer.approvalStatus.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              handleCustomerAction("view", customer)
                            }
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              handleCustomerAction("credit_check", customer)
                            }
                          >
                            <CreditCard className="h-3 w-3" />
                          </Button>
                          {customer.approvalStatus === "pending" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                handleCustomerAction("approve", customer)
                              }
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Product Catalog</h2>
              <p className="text-muted-foreground">
                Manage products and inventory
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Catalog
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {products
              .filter((product) => product && product.name)
              .map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {product.name}
                      <Badge
                        variant={
                          product.stockQuantity < product.reorderLevel
                            ? "destructive"
                            : "default"
                        }
                      >
                        {product.stockQuantity < product.reorderLevel
                          ? "Low Stock"
                          : "In Stock"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Product Code</span>
                        <span className="font-medium">
                          {product.productCode}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Selling Price</span>
                        <span className="font-medium">
                          {formatCurrency(product.sellingPrice)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Available Stock</span>
                        <span className="font-medium">
                          {product.availableQuantity} {product.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Reserved</span>
                        <span className="font-medium text-orange-600">
                          {product.reservedQuantity} {product.unit}
                        </span>
                      </div>
                      <Progress
                        value={
                          (product.stockQuantity / product.maxStockLevel) * 100
                        }
                        className="h-2"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleProductAction("edit", product)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleProductAction("view", product)}
                        >
                          <Eye className="h-3 w-3" />
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
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Monthly sales trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Revenue Target</span>
                    <span className="font-bold">₹50M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Achieved</span>
                    <span className="font-bold text-green-600">₹22M (44%)</span>
                  </div>
                  <Progress value={44} className="h-3" />
                  <div className="text-sm text-muted-foreground">
                    18 days remaining in current period
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>Lead to order conversion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Leads</span>
                    <span className="font-medium">150</span>
                  </div>
                  <Progress value={100} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Quotations</span>
                    <span className="font-medium">28 (18.7%)</span>
                  </div>
                  <Progress value={18.7} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Orders</span>
                    <span className="font-medium">5 (17.9%)</span>
                  </div>
                  <Progress value={17.9} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access to Performance Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Performance Analytics</CardTitle>
              <CardDescription>
                Access comprehensive sales performance reports and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("reports")}
                  className="h-20 flex-col gap-2"
                >
                  <DollarSign className="h-6 w-6" />
                  <span className="text-sm">Revenue Dashboard</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("reports")}
                  className="h-20 flex-col gap-2"
                >
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Regional Performance</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("reports")}
                  className="h-20 flex-col gap-2"
                >
                  <Package className="h-6 w-6" />
                  <span className="text-sm">Margin Analysis</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("reports")}
                  className="h-20 flex-col gap-2"
                >
                  <AlertTriangle className="h-6 w-6" />
                  <span className="text-sm">Performance Alerts</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <SalesPerformanceReportsDashboard
            tenantId={
              JSON.parse(localStorage.getItem("currentUser") || "{}")
                .tenantId || "demo-tenant"
            }
            userType={(() => {
              const currentUser = JSON.parse(
                localStorage.getItem("currentUser") || "{}",
              );
              return currentUser?.role === "admin"
                ? "corporate"
                : currentUser?.role === "regional_manager"
                  ? "regional_manager"
                  : "franchisee";
            })()}
          />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Business Rules</CardTitle>
                <CardDescription>
                  Configure validation and approval rules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessRules
                    .filter((rule) => rule && rule.name)
                    .map((rule) => (
                      <div
                        key={rule.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{rule.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {rule.message || ""}
                          </p>
                        </div>
                        <Badge
                          variant={rule.isActive ? "default" : "secondary"}
                        >
                          {rule.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exchange Rates</CardTitle>
                <CardDescription>
                  Current currency exchange rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {exchangeRates.map((rate) => (
                    <div
                      key={rate.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">
                        {rate.fromCurrency} → {rate.toCurrency}
                      </span>
                      <span className="font-medium">{rate.rate}</span>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => handleGeneralAction("refresh_rates")}
                  >
                    <RefreshCw className="h-3 w-3 mr-2" />
                    Update Rates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {/* Customer Details Modal */}
      <Dialog open={showCustomerModal} onOpenChange={setShowCustomerModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              Complete customer information and credit status
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Company Name</Label>
                  <p className="font-medium">{selectedCustomer.companyName}</p>
                </div>
                <div>
                  <Label>Customer Code</Label>
                  <p className="font-medium">{selectedCustomer.customerCode}</p>
                </div>
                <div>
                  <Label>Contact Person</Label>
                  <p className="font-medium">
                    {selectedCustomer.contactPerson}
                  </p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="font-medium">{selectedCustomer.email}</p>
                </div>
                <div>
                  <Label>Credit Limit</Label>
                  <p className="font-medium">
                    {formatCurrency(selectedCustomer.creditLimit)}
                  </p>
                </div>
                <div>
                  <Label>Available Credit</Label>
                  <p className="font-medium text-green-600">
                    {formatCurrency(selectedCustomer.availableCredit)}
                  </p>
                </div>
                <div>
                  <Label>Payment Terms</Label>
                  <p className="font-medium">
                    {selectedCustomer.paymentTerms} days
                  </p>
                </div>
                <div>
                  <Label>Credit Rating</Label>
                  <Badge
                    className={getStatusColor(selectedCustomer.creditRating)}
                  >
                    {selectedCustomer.creditRating}
                  </Badge>
                </div>
              </div>

              <div>
                <Label>Address</Label>
                <p className="text-sm mt-1">
                  {selectedCustomer.address.street},{" "}
                  {selectedCustomer.address.city},
                  {selectedCustomer.address.state} -{" "}
                  {selectedCustomer.address.zipCode}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleCustomerAction("edit", selectedCustomer)}
                >
                  Edit Customer
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleCustomerAction("credit_check", selectedCustomer)
                  }
                >
                  Credit Check
                </Button>
                <Button
                  onClick={() =>
                    handleCustomerAction("create_quotation", selectedCustomer)
                  }
                >
                  Create Quotation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quotation Modal */}
      <Dialog open={showQuotationModal} onOpenChange={setShowQuotationModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Quotation Details</DialogTitle>
            <DialogDescription>
              View and manage quotation information
            </DialogDescription>
          </DialogHeader>
          {selectedQuotation && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Quotation Number</Label>
                  <p className="font-medium mt-1">
                    {selectedQuotation.quotationNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge
                    className={`mt-1 ${getStatusColor(selectedQuotation.status || "draft")}`}
                  >
                    {(selectedQuotation.status || "draft").replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <Label>Customer</Label>
                  <p className="font-medium mt-1">
                    {selectedQuotation.customer?.companyName || "N/A"}
                  </p>
                </div>
                <div>
                  <Label>Total Amount</Label>
                  <p className="font-medium mt-1">
                    {formatCurrency(selectedQuotation.totalAmount || 0)}
                  </p>
                </div>
                <div>
                  <Label>Valid Until</Label>
                  <p className="font-medium mt-1">
                    {selectedQuotation.validUntil
                      ? new Date(
                          selectedQuotation.validUntil,
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <Label>Sales Representative</Label>
                  <p className="font-medium mt-1">
                    {selectedQuotation.salesRep?.name || "Not assigned"}
                  </p>
                </div>
              </div>

              <div>
                <Label>Items</Label>
                <div className="mt-2 border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(selectedQuotation.items || []).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.productName || "N/A"}</TableCell>
                          <TableCell>
                            {item.quantity || 0} {item.unit || ""}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(item.unitPrice || 0)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(item.totalPrice || 0)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    handleQuotationAction("convert_to_order", selectedQuotation)
                  }
                >
                  Convert to Order
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleQuotationAction("edit", selectedQuotation)
                  }
                >
                  Edit Quotation
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleQuotationAction("send", selectedQuotation)
                  }
                >
                  Send to Customer
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleQuotationAction("download", selectedQuotation)
                  }
                >
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Modal */}
      <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Sales Order Details</DialogTitle>
            <DialogDescription>
              View and manage sales order information
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Order Number</Label>
                  <p className="font-medium mt-1">
                    {selectedOrder.orderNumber}
                  </p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge
                    className={`mt-1 ${getStatusColor(selectedOrder.status)}`}
                  >
                    {selectedOrder.status.replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <Label>Customer</Label>
                  <p className="font-medium mt-1">
                    {selectedOrder.customer.companyName}
                  </p>
                </div>
                <div>
                  <Label>Total Amount</Label>
                  <p className="font-medium mt-1">
                    {formatCurrency(selectedOrder.totalAmount)}
                  </p>
                </div>
                <div>
                  <Label>Expected Delivery</Label>
                  <p className="font-medium mt-1">
                    {new Date(
                      selectedOrder.expectedDelivery,
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label>Payment Status</Label>
                  <Badge
                    className={`mt-1 ${getStatusColor(selectedOrder.paymentStatus)}`}
                  >
                    {selectedOrder.paymentStatus}
                  </Badge>
                </div>
              </div>

              <div>
                <Label>Items</Label>
                <div className="mt-2 border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(selectedOrder.items || []).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.productName || "N/A"}</TableCell>
                          <TableCell>
                            {item.quantity || 0} {item.unit || ""}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(item.unitPrice || 0)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(item.totalPrice || 0)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    handleOrderAction("update_status", selectedOrder)
                  }
                >
                  Update Status
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleOrderAction("generate_invoice", selectedOrder)
                  }
                >
                  Generate Invoice
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleOrderAction("track_delivery", selectedOrder)
                  }
                >
                  Track Delivery
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleOrderAction("download", selectedOrder)}
                >
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Quotation Modal */}
      <Dialog
        open={showNewQuotationModal}
        onOpenChange={setShowNewQuotationModal}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Quotation</DialogTitle>
            <DialogDescription>
              Create a new quotation for a customer
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Customer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {salesCustomers.slice(0, 5).map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.companyName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Valid Until</Label>
                <Input
                  type="date"
                  defaultValue={
                    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  placeholder="Quotation title"
                  defaultValue="New Quotation"
                />
              </div>
              <div>
                <Label>Currency</Label>
                <Select defaultValue="INR">
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <textarea
                className="w-full mt-1 p-2 border rounded-md"
                rows={3}
                placeholder="Quotation description"
                defaultValue="Standard product quotation"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowNewQuotationModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  alert("Quotation created successfully!");
                  setShowNewQuotationModal(false);
                }}
              >
                Create Quotation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Price Calculator Modal */}
      <Dialog
        open={showPriceCalculatorModal}
        onOpenChange={setShowPriceCalculatorModal}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Price Calculator</DialogTitle>
            <DialogDescription>
              Calculate pricing for products and services
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Product/Service</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products
                      .slice(0, 5)
                      .filter((product) => product && product.name)
                      .map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  defaultValue="1"
                />
              </div>
              <div>
                <Label>Base Price</Label>
                <Input type="number" placeholder="₹0.00" defaultValue="10000" />
              </div>
              <div>
                <Label>Discount %</Label>
                <Input type="number" placeholder="0" defaultValue="10" />
              </div>
              <div>
                <Label>Tax %</Label>
                <Input type="number" placeholder="18" defaultValue="18" />
              </div>
              <div>
                <Label>Total Price</Label>
                <Input
                  type="number"
                  placeholder="₹10,620.00"
                  disabled
                  value="10620"
                />
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-medium">
                <span>Estimated Total:</span>
                <span>₹10,620.00</span>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowPriceCalculatorModal(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  alert("Price calculated and ready to add to quotation");
                  setShowPriceCalculatorModal(false);
                }}
              >
                Add to Quotation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Credit Check Modal */}
      <Dialog
        open={showCreditCheckModal}
        onOpenChange={setShowCreditCheckModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Credit Check Result</DialogTitle>
            <DialogDescription>
              Customer credit limit validation
            </DialogDescription>
          </DialogHeader>
          {creditCheckResult && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                {creditCheckResult.approved ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
                <div>
                  <p className="font-medium">
                    {creditCheckResult.approved
                      ? "Credit Check Passed"
                      : "Credit Check Failed"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {creditCheckResult.reason}
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="flex justify-between">
                  <span>Credit Limit</span>
                  <span className="font-medium">
                    {formatCurrency(creditCheckResult.creditLimit)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Current Outstanding</span>
                  <span className="font-medium">
                    {formatCurrency(creditCheckResult.currentOutstanding)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Available Credit</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(creditCheckResult.availableCredit)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Requested Amount</span>
                  <span className="font-medium">
                    {formatCurrency(creditCheckResult.requestedAmount)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
