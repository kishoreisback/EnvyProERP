import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Building2,
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  IndianRupee,
  Smartphone,
  University,
  Target,
  Activity,
  BarChart3,
  Zap,
  RefreshCw,
  Send,
  FileText,
  DollarSign,
  PiggyBank,
  Shield,
  Bell,
  Calendar,
  Settings,
} from "lucide-react";
import { AnimatedCounter } from "../ui/animated-counter";
import { usePermissions } from "../user-management/PermissionProvider";
import {
  PaymentTransaction,
  PaymentWorkflowStatus,
  PaymentGateway,
  CreditLimit,
  LatePaymentAlert,
  PaymentAnalytics,
  PaymentFilters,
  ReconciliationStatus,
} from "./payment-types";
import { Invoice } from "./invoice-types";
import { PaymentReconciliation } from "./PaymentReconciliation";
import { CreditLimitTracker } from "./CreditLimitTracker";

// Available tenants for switching
const availableTenants = [
  { id: "tenant_001", name: "BuildCorp Constructions", type: "Construction" },
  { id: "tenant_002", name: "Metro Realty Group", type: "Real Estate" },
  { id: "tenant_003", name: "Skyline Developers", type: "Development" },
];

interface PaymentWorkflowDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
  userType?: "corporate" | "franchisee";
  tenantId?: string;
}

export function PaymentWorkflowDashboard({
  currentTab = "overview",
  onTabChange,
  userType = "franchisee",
  tenantId,
}: PaymentWorkflowDashboardProps) {
  // Try to use permissions, but provide fallback if not in PermissionProvider context
  let currentUser, hasPermission;
  try {
    const permissions = usePermissions();
    currentUser = permissions.user;
    hasPermission = permissions.hasPermission;
  } catch (error) {
    // Fallback when not in PermissionProvider context
    currentUser = null;
    hasPermission = () => true; // Allow all permissions in fallback mode
  }

  // State management
  const [selectedTenantId, setSelectedTenantId] = useState(
    tenantId || currentUser?.tenantId || "tenant_001",
  );
  const [activeTab, setActiveTab] = useState(currentTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<PaymentFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  // Data states
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [creditLimits, setCreditLimits] = useState<CreditLimit[]>([]);
  const [latePaymentAlerts, setLatePaymentAlerts] = useState<
    LatePaymentAlert[]
  >([]);
  const [analytics, setAnalytics] = useState<PaymentAnalytics | null>(null);

  // Modal states
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentTransaction | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [modals, setModals] = useState({
    makePayment: false,
    viewPayment: false,
    reconciliation: false,
    creditLimit: false,
    settings: false,
  });

  const currentTenant = availableTenants.find((t) => t.id === selectedTenantId);

  // Load data on mount and tenant change
  useEffect(() => {
    loadPaymentData();
  }, [selectedTenantId, userType]);

  // Sync activeTab with currentTab prop
  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  // Handle tab changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
  };

  const loadPaymentData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls - replace with actual API integration
      const mockPayments = generateMockPayments(selectedTenantId, userType);
      const mockInvoices = generateMockInvoices(selectedTenantId, userType);
      const mockCreditLimits = generateMockCreditLimits(selectedTenantId);
      const mockAlerts = generateMockLatePaymentAlerts(selectedTenantId);
      const mockAnalytics = generateMockAnalytics(selectedTenantId);

      setPayments(mockPayments);
      setInvoices(mockInvoices);
      setCreditLimits(mockCreditLimits);
      setLatePaymentAlerts(mockAlerts);
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error("Error loading payment data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter payments based on search and filters
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        if (
          !payment.transactionId.toLowerCase().includes(searchLower) &&
          !payment.invoiceNumber.toLowerCase().includes(searchLower) &&
          !payment.gateway.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      if (filters.status?.length && !filters.status.includes(payment.status)) {
        return false;
      }

      if (
        filters.gateway?.length &&
        !filters.gateway.includes(payment.gateway)
      ) {
        return false;
      }

      if (filters.dateRange) {
        const paymentDate = new Date(payment.initiatedAt);
        const startDate = new Date(filters.dateRange.startDate);
        const endDate = new Date(filters.dateRange.endDate);
        if (paymentDate < startDate || paymentDate > endDate) {
          return false;
        }
      }

      if (filters.amountRange) {
        if (
          payment.amount < filters.amountRange.min ||
          payment.amount > filters.amountRange.max
        ) {
          return false;
        }
      }

      return true;
    });
  }, [payments, searchQuery, filters]);

  // Outstanding invoices for payment
  const outstandingInvoices = useMemo(() => {
    return invoices.filter(
      (invoice) =>
        invoice.paymentStatus !== "paid" && invoice.status === "sent",
    );
  }, [invoices]);

  // Modal handlers
  const openModal = useCallback(
    (modalName: keyof typeof modals, data?: any) => {
      setModals((prev) => ({ ...prev, [modalName]: true }));
      if (modalName === "viewPayment" && data) setSelectedPayment(data);
      if (modalName === "makePayment" && data) setSelectedInvoice(data);
    },
    [],
  );

  const closeModal = useCallback((modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
    if (modalName === "viewPayment") setSelectedPayment(null);
    if (modalName === "makePayment") setSelectedInvoice(null);
  }, []);

  // Payment action handlers
  const initiatePayment = useCallback(
    async (invoiceId: string, amount: number, gateway: PaymentGateway) => {
      try {
        // Simulate payment initiation
        const newPayment: PaymentTransaction = {
          id: `PAY-${Date.now()}`,
          transactionId: `TXN-${Date.now()}`,
          paymentId: `PID-${Date.now()}`,
          tenantId: selectedTenantId,
          franchiseeId:
            userType === "franchisee"
              ? currentUser?.id || "FRAN001"
              : "FRAN001",
          corporateId: "CORP001",
          invoiceId,
          invoiceNumber:
            invoices.find((inv) => inv.id === invoiceId)?.invoiceNumber || "",
          amount,
          currency: "INR",
          paymentMethod:
            gateway === "upi"
              ? "upi"
              : gateway === "neft"
                ? "bank_transfer"
                : "online",
          gateway,
          status: "initiated",
          initiatedAt: new Date().toISOString(),
          description: `Payment for invoice`,
          reconciliation: {
            status: "pending",
            autoReconciled: false,
          },
          createdBy: currentUser?.id || "user",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setPayments((prev) => [newPayment, ...prev]);
        closeModal("makePayment");

        // Simulate gateway processing
        setTimeout(() => {
          setPayments((prev) =>
            prev.map((p) =>
              p.id === newPayment.id
                ? { ...p, status: "processing" as PaymentWorkflowStatus }
                : p,
            ),
          );
        }, 2000);

        // Simulate completion
        setTimeout(() => {
          setPayments((prev) =>
            prev.map((p) =>
              p.id === newPayment.id
                ? {
                    ...p,
                    status: "completed" as PaymentWorkflowStatus,
                    completedAt: new Date().toISOString(),
                    reconciliation: {
                      ...p.reconciliation,
                      status: "matched" as ReconciliationStatus,
                      autoReconciled: true,
                      matchedAt: new Date().toISOString(),
                    },
                  }
                : p,
            ),
          );
        }, 5000);
      } catch (error) {
        console.error("Error initiating payment:", error);
      }
    },
    [selectedTenantId, userType, currentUser, invoices, closeModal],
  );

  const getStatusColor = (status: PaymentWorkflowStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
      case "gateway_pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "initiated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getReconciliationColor = (status: ReconciliationStatus) => {
    switch (status) {
      case "matched":
      case "reconciled":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "mismatched":
      case "manual_review":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header with Tenant Switching */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <CreditCard className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold">Payment Workflow</h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive payment processing, reconciliation, and credit
            management
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="gap-1">
              <Building2 className="h-3 w-3" />
              {currentTenant?.name}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Target className="h-3 w-3" />
              {currentTenant?.type}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <CreditCard className="h-3 w-3" />
              {userType === "franchisee" ? "Franchisee View" : "Corporate View"}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedTenantId} onValueChange={setSelectedTenantId}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select Tenant" />
            </SelectTrigger>
            <SelectContent>
              {availableTenants.map((tenant) => (
                <SelectItem key={tenant.id} value={tenant.id}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>
                      {tenant.name} ({tenant.type})
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(hasPermission("payments:manage") || !currentUser) && (
            <Button onClick={() => openModal("settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger
            value="reconciliation"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reconciliation
          </TabsTrigger>
          <TabsTrigger value="credit" className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            Credit
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-blue-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-blue-700">
                    Total Payments
                  </CardTitle>
                  <div className="text-3xl font-bold text-blue-900">
                    <AnimatedCounter value={payments.length} />
                  </div>
                  <p className="text-sm text-blue-600">
                    {formatCurrency(
                      payments.reduce((sum, p) => sum + p.amount, 0),
                    )}{" "}
                    processed
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-green-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-green-700">
                    Success Rate
                  </CardTitle>
                  <div className="text-3xl font-bold text-green-900">
                    <AnimatedCounter
                      value={Math.round(
                        (payments.filter((p) => p.status === "completed")
                          .length /
                          Math.max(payments.length, 1)) *
                          100,
                      )}
                      suffix="%"
                    />
                  </div>
                  <p className="text-sm text-green-600">
                    {payments.filter((p) => p.status === "completed").length}{" "}
                    successful
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
              <div className="absolute top-0 right-0 w-12 h-12 bg-orange-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-orange-700">
                    Outstanding
                  </CardTitle>
                  <div className="text-3xl font-bold text-orange-900">
                    <AnimatedCounter value={outstandingInvoices.length} />
                  </div>
                  <p className="text-sm text-orange-600">
                    {formatCurrency(
                      outstandingInvoices.reduce(
                        (sum, inv) =>
                          sum + (inv.balanceAmount || inv.grandTotal),
                        0,
                      ),
                    )}{" "}
                    due
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-purple-50 border-purple-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-purple-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-purple-700">
                    Credit Utilization
                  </CardTitle>
                  <div className="text-3xl font-bold text-purple-900">
                    <AnimatedCounter
                      value={
                        creditLimits.length > 0
                          ? Math.round(creditLimits[0].utilizationPercentage)
                          : 0
                      }
                      suffix="%"
                    />
                  </div>
                  <p className="text-sm text-purple-600">
                    {creditLimits.length > 0
                      ? formatCurrency(creditLimits[0].availableLimit)
                      : "₹0"}{" "}
                    available
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <PiggyBank className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions and Recent Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("invoices")}
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-blue-50 border-blue-200"
                    >
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">Pay Invoices</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("payments")}
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-green-50 border-green-200"
                    >
                      <CreditCard className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">View Payments</span>
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("reconciliation")}
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-orange-50 border-orange-200"
                    >
                      <RefreshCw className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium">
                        Reconciliation
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("credit")}
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-purple-50 border-purple-200"
                    >
                      <PiggyBank className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium">Credit Status</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Recent Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.slice(0, 5).map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-green-50/50 border border-blue-100/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-100 text-green-600">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {payment.invoiceNumber}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatCurrency(payment.amount)} via{" "}
                            {payment.gateway}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full mt-3"
                    onClick={() => handleTabChange("payments")}
                  >
                    View All Payments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Payment Transactions</h2>
              <p className="text-muted-foreground">
                Track all payment transactions and their status
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by transaction ID, invoice, or gateway..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={filters.status?.[0] || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    status:
                      value === "all"
                        ? undefined
                        : [value as PaymentWorkflowStatus],
                  }))
                }
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="initiated">Initiated</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Payments Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Gateway</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reconciliation</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.transactionId}
                      </TableCell>
                      <TableCell>{payment.invoiceNumber}</TableCell>
                      <TableCell>{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.gateway}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getReconciliationColor(
                            payment.reconciliation.status,
                          )}
                        >
                          {payment.reconciliation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(payment.initiatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => openModal("viewPayment", payment)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Receipt
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Outstanding Invoices</h2>
              <p className="text-muted-foreground">
                Invoices pending payment with payment options
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {outstandingInvoices.map((invoice) => (
              <Card key={invoice.id} className="rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold">
                          {invoice.invoiceNumber}
                        </h3>
                        <Badge variant="outline">{invoice.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-green-600">
                          {formatCurrency(
                            invoice.balanceAmount || invoice.grandTotal,
                          )}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Total: {formatCurrency(invoice.grandTotal)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => openModal("viewPayment", invoice)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        onClick={() => openModal("makePayment", invoice)}
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reconciliation Tab */}
        <TabsContent value="reconciliation" className="space-y-6">
          <PaymentReconciliation
            payments={payments}
            onReconcile={(paymentId, status) => {
              setPayments((prev) =>
                prev.map((p) =>
                  p.id === paymentId
                    ? { ...p, reconciliation: { ...p.reconciliation, status } }
                    : p,
                ),
              );
            }}
            onManualReview={(paymentId, notes) => {
              setPayments((prev) =>
                prev.map((p) =>
                  p.id === paymentId
                    ? {
                        ...p,
                        reconciliation: {
                          ...p.reconciliation,
                          status: "manual_review",
                          manualNotes: notes,
                        },
                      }
                    : p,
                ),
              );
            }}
          />
        </TabsContent>

        {/* Credit Tab */}
        <TabsContent value="credit" className="space-y-6">
          <CreditLimitTracker
            franchiseeId={
              userType === "franchisee"
                ? currentUser?.id || "FRAN001"
                : "FRAN001"
            }
            corporateId="CORP001"
            tenantId={selectedTenantId}
            outstandingAmount={outstandingInvoices.reduce(
              (sum, inv) => sum + (inv.balanceAmount || inv.grandTotal),
              0,
            )}
            onLimitUpdate={(newLimit, reason) => {
              console.log(`Credit limit updated to ${newLimit}: ${reason}`);
            }}
            onAlertCreate={(alert) => {
              setLatePaymentAlerts((prev) => [...prev, alert]);
            }}
          />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {analytics && (
            <div className="space-y-6">
              {/* Analytics Overview Cards */}
              <div className="grid gap-6 md:grid-cols-4">
                <Card className="bg-indigo-50 border-indigo-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-200/40 rounded-bl-[24px]"></div>
                  <div className="flex flex-row items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-sm font-medium text-indigo-700">
                        Monthly Volume
                      </CardTitle>
                      <div className="text-3xl font-bold text-indigo-900">
                        <AnimatedCounter value={analytics.totalTransactions} />
                      </div>
                      <p className="text-sm text-indigo-600">
                        {formatCurrency(analytics.totalAmount)} processed
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4 relative z-10">
                      <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-emerald-50 border-emerald-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-200/40 rounded-bl-[24px]"></div>
                  <div className="flex flex-row items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-sm font-medium text-emerald-700">
                        Success Rate
                      </CardTitle>
                      <div className="text-3xl font-bold text-emerald-900">
                        <AnimatedCounter
                          value={Math.round(analytics.successRate)}
                          suffix="%"
                        />
                      </div>
                      <p className="text-sm text-emerald-600">
                        {analytics.successfulTransactions} successful
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4 relative z-10">
                      <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-amber-50 border-amber-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-amber-200/40 rounded-bl-[24px]"></div>
                  <div className="flex flex-row items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-sm font-medium text-amber-700">
                        Avg Amount
                      </CardTitle>
                      <div className="text-3xl font-bold text-amber-900">
                        ₹
                        <AnimatedCounter
                          value={Math.round(analytics.averageAmount / 1000)}
                        />
                        K
                      </div>
                      <p className="text-sm text-amber-600">per transaction</p>
                    </div>
                    <div className="flex-shrink-0 ml-4 relative z-10">
                      <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-rose-50 border-rose-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-rose-200/40 rounded-bl-[24px]"></div>
                  <div className="flex flex-row items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-sm font-medium text-rose-700">
                        Reconciliation Rate
                      </CardTitle>
                      <div className="text-3xl font-bold text-rose-900">
                        <AnimatedCounter
                          value={Math.round(analytics.reconciliationRate)}
                          suffix="%"
                        />
                      </div>
                      <p className="text-sm text-rose-600">auto-reconciled</p>
                    </div>
                    <div className="flex-shrink-0 ml-4 relative z-10">
                      <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <RefreshCw className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Gateway Performance */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="rounded-2xl border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Gateway Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(analytics.gatewayBreakdown).map(
                        ([gateway, metrics]) => (
                          <div
                            key={gateway}
                            className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-blue-100/50"
                          >
                            <div>
                              <h4 className="font-medium capitalize">
                                {gateway}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {metrics.transactionCount} transactions •{" "}
                                {formatCurrency(metrics.totalAmount)}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-green-100 text-green-800">
                                {Math.round(metrics.successRate)}% success
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                ₹{metrics.totalFees.toLocaleString()} fees
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      Key Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Credit Utilization
                        </span>
                        <span className="font-medium">
                          {analytics.creditUtilization}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Avg Credit Days
                        </span>
                        <span className="font-medium">
                          {analytics.averageCreditDays} days
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Collection Efficiency
                        </span>
                        <span className="font-medium">
                          {analytics.collectionEfficiency}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Overdue Amount
                        </span>
                        <span className="font-medium text-red-600">
                          {formatCurrency(analytics.overdueAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Bad Debt %
                        </span>
                        <span className="font-medium">
                          {analytics.badDebtPercentage}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Trends Chart */}
              <Card className="rounded-2xl border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Payment Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 rounded-lg bg-blue-50">
                      <h4 className="font-medium text-blue-700">This Week</h4>
                      <p className="text-2xl font-bold text-blue-900">12</p>
                      <p className="text-sm text-blue-600">payments</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-green-50">
                      <h4 className="font-medium text-green-700">This Month</h4>
                      <p className="text-2xl font-bold text-green-900">
                        {analytics.totalTransactions}
                      </p>
                      <p className="text-sm text-green-600">payments</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-purple-50">
                      <h4 className="font-medium text-purple-700">Growth</h4>
                      <p className="text-2xl font-bold text-purple-900">+15%</p>
                      <p className="text-sm text-purple-600">vs last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Make Payment Modal */}
      <Dialog
        open={modals.makePayment}
        onOpenChange={() => closeModal("makePayment")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
            <DialogDescription>
              {selectedInvoice &&
                `Pay invoice ${selectedInvoice.invoiceNumber}`}
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <PaymentGatewayInterface
              invoice={selectedInvoice}
              onPayment={initiatePayment}
              onCancel={() => closeModal("makePayment")}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Payment Modal */}
      <Dialog
        open={modals.viewPayment}
        onOpenChange={() => closeModal("viewPayment")}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              {selectedPayment &&
                `Transaction ${selectedPayment.transactionId}`}
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && <PaymentDetailsView payment={selectedPayment} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Payment Gateway Interface Component
interface PaymentGatewayInterfaceProps {
  invoice: Invoice;
  onPayment: (
    invoiceId: string,
    amount: number,
    gateway: PaymentGateway,
  ) => void;
  onCancel: () => void;
}

function PaymentGatewayInterface({
  invoice,
  onPayment,
  onCancel,
}: PaymentGatewayInterfaceProps) {
  const [selectedGateway, setSelectedGateway] =
    useState<PaymentGateway>("razorpay");
  const [paymentAmount, setPaymentAmount] = useState(
    invoice.balanceAmount || invoice.grandTotal,
  );

  const gatewayOptions: {
    value: PaymentGateway;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "razorpay",
      label: "Razorpay",
      icon: <CreditCard className="h-4 w-4" />,
    },
    { value: "payu", label: "PayU", icon: <Wallet className="h-4 w-4" /> },
    { value: "upi", label: "UPI", icon: <Smartphone className="h-4 w-4" /> },
    { value: "neft", label: "NEFT", icon: <University className="h-4 w-4" /> },
    { value: "rtgs", label: "RTGS", icon: <University className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Invoice Amount:</span>
          <span className="text-xl font-bold text-blue-600">
            ₹{(invoice.balanceAmount || invoice.grandTotal).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Payment Amount</Label>
        <Input
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(Number(e.target.value))}
          max={invoice.balanceAmount || invoice.grandTotal}
        />
      </div>

      <div className="space-y-4">
        <Label>Select Payment Gateway</Label>
        <div className="grid grid-cols-2 gap-3">
          {gatewayOptions.map((gateway) => (
            <Button
              key={gateway.value}
              variant={
                selectedGateway === gateway.value ? "default" : "outline"
              }
              onClick={() => setSelectedGateway(gateway.value)}
              className="h-auto p-4 flex items-center gap-3"
            >
              {gateway.icon}
              <span>{gateway.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={() => onPayment(invoice.id, paymentAmount, selectedGateway)}
          disabled={
            paymentAmount <= 0 ||
            paymentAmount > (invoice.balanceAmount || invoice.grandTotal)
          }
        >
          <Send className="h-4 w-4 mr-2" />
          Proceed to Pay
        </Button>
      </DialogFooter>
    </div>
  );
}

// Payment Details View Component
interface PaymentDetailsViewProps {
  payment: PaymentTransaction;
}

function PaymentDetailsView({ payment }: PaymentDetailsViewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Transaction ID</Label>
            <p className="text-sm text-muted-foreground">
              {payment.transactionId}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium">Invoice Number</Label>
            <p className="text-sm text-muted-foreground">
              {payment.invoiceNumber}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium">Amount</Label>
            <p className="text-lg font-semibold">
              ₹{payment.amount.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Gateway</Label>
            <p className="text-sm text-muted-foreground">{payment.gateway}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Status</Label>
            <Badge className={getStatusColor(payment.status)}>
              {payment.status}
            </Badge>
          </div>
          <div>
            <Label className="text-sm font-medium">Initiated At</Label>
            <p className="text-sm text-muted-foreground">
              {new Date(payment.initiatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {payment.gatewayResponse && (
        <div className="border-t pt-4">
          <Label className="text-sm font-medium">Gateway Response</Label>
          <div className="mt-2 p-3 bg-gray-50 rounded">
            <pre className="text-xs">
              {JSON.stringify(payment.gatewayResponse, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

// Mock data generators
function generateMockPayments(
  tenantId: string,
  userType: string,
): PaymentTransaction[] {
  const mockPayments: PaymentTransaction[] = [
    {
      id: "PAY-001",
      transactionId: "TXN-2024-001",
      paymentId: "PID-001",
      tenantId,
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      invoiceId: "INV-2024-001",
      invoiceNumber: "INV-2024-001",
      amount: 25000,
      currency: "INR",
      paymentMethod: "online",
      gateway: "razorpay",
      status: "completed",
      initiatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000,
      ).toISOString(),
      gatewayResponse: {
        gatewayTransactionId: "razorpay_12345",
        responseCode: "SUCCESS",
        responseMessage: "Payment successful",
        bankReference: "RZP123456789",
        fees: 500,
        rawResponse: { payment_id: "pay_12345" },
      },
      reconciliation: {
        status: "matched",
        autoReconciled: true,
        matchedAt: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000,
        ).toISOString(),
      },
      createdBy: "user1",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: "PAY-002",
      transactionId: "TXN-2024-002",
      paymentId: "PID-002",
      tenantId,
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      invoiceId: "INV-2024-002",
      invoiceNumber: "INV-2024-002",
      amount: 18500,
      currency: "INR",
      paymentMethod: "upi",
      gateway: "upi",
      status: "processing",
      initiatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      reconciliation: {
        status: "pending",
        autoReconciled: false,
      },
      createdBy: "user1",
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    },
    {
      id: "PAY-003",
      transactionId: "TXN-2024-003",
      paymentId: "PID-003",
      tenantId,
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      invoiceId: "INV-2024-003",
      invoiceNumber: "INV-2024-003",
      amount: 32000,
      currency: "INR",
      paymentMethod: "bank_transfer",
      gateway: "neft",
      status: "completed",
      initiatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(
        Date.now() - 5 * 24 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000,
      ).toISOString(),
      gatewayResponse: {
        gatewayTransactionId: "NEFT123456",
        responseCode: "SUCCESS",
        responseMessage: "NEFT transfer successful",
        bankReference: "N456789123",
        fees: 5,
        rawResponse: { utr: "N456789123" },
      },
      reconciliation: {
        status: "matched",
        autoReconciled: true,
        matchedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
      createdBy: "user1",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "PAY-004",
      transactionId: "TXN-2024-004",
      paymentId: "PID-004",
      tenantId,
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      invoiceId: "INV-2024-004",
      invoiceNumber: "INV-2024-004",
      amount: 15750,
      currency: "INR",
      paymentMethod: "online",
      gateway: "payu",
      status: "failed",
      initiatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      failedAt: new Date(
        Date.now() - 6 * 60 * 60 * 1000 + 2 * 60 * 1000,
      ).toISOString(),
      gatewayResponse: {
        gatewayTransactionId: "payu_fail_123",
        responseCode: "FAILED",
        responseMessage: "Insufficient funds",
        bankReference: "",
        fees: 0,
        rawResponse: { status: "failed", error: "Insufficient funds" },
      },
      reconciliation: {
        status: "pending",
        autoReconciled: false,
      },
      createdBy: "user1",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(
        Date.now() - 6 * 60 * 60 * 1000 + 2 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: "PAY-005",
      transactionId: "TXN-2024-005",
      paymentId: "PID-005",
      tenantId,
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      invoiceId: "INV-2024-005",
      invoiceNumber: "INV-2024-005",
      amount: 42300,
      currency: "INR",
      paymentMethod: "upi",
      gateway: "upi",
      status: "completed",
      initiatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 1000,
      ).toISOString(),
      gatewayResponse: {
        gatewayTransactionId: "UPI789012",
        responseCode: "00",
        responseMessage: "Transaction successful",
        bankReference: "UPI789012345",
        fees: 0,
        rawResponse: { upi_id: "user@okaxis", status: "success" },
      },
      reconciliation: {
        status: "mismatched",
        autoReconciled: false,
        discrepancies: [
          {
            field: "amount",
            expected: 42300,
            actual: 42250,
            severity: "medium",
            resolved: false,
          },
        ],
      },
      createdBy: "user1",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 1000,
      ).toISOString(),
    },
    {
      id: "PAY-006",
      transactionId: "TXN-2024-006",
      paymentId: "PID-006",
      tenantId,
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      invoiceId: "INV-2024-006",
      invoiceNumber: "INV-2024-006",
      amount: 28900,
      currency: "INR",
      paymentMethod: "online",
      gateway: "razorpay",
      status: "completed",
      initiatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 1000,
      ).toISOString(),
      gatewayResponse: {
        gatewayTransactionId: "razorpay_67890",
        responseCode: "SUCCESS",
        responseMessage: "Payment successful",
        bankReference: "RZP987654321",
        fees: 578,
        rawResponse: { payment_id: "pay_67890" },
      },
      reconciliation: {
        status: "reconciled",
        autoReconciled: true,
        matchedAt: new Date(
          Date.now() - 7 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000,
        ).toISOString(),
        matchedBy: "auto_system",
      },
      createdBy: "user1",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000,
      ).toISOString(),
    },
  ];

  return mockPayments;
}

function generateMockInvoices(tenantId: string, userType: string): Invoice[] {
  const mockInvoices: any[] = [
    {
      id: "INV-2024-007",
      invoiceNumber: "INV-2024-007",
      tenantId,
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      issueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      grandTotal: 35400,
      balanceAmount: 35400,
      status: "sent",
      paymentStatus: "unpaid",
      billTo: {
        name: "Mumbai Central Beverages",
        email: "payments@mumbaicentral.com",
      },
    },
    {
      id: "INV-2024-008",
      invoiceNumber: "INV-2024-008",
      tenantId,
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      issueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      grandTotal: 48200,
      balanceAmount: 24100,
      status: "sent",
      paymentStatus: "partially_paid",
      billTo: {
        name: "Mumbai Central Beverages",
        email: "payments@mumbaicentral.com",
      },
    },
    {
      id: "INV-2024-009",
      invoiceNumber: "INV-2024-009",
      tenantId,
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      issueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      grandTotal: 29800,
      balanceAmount: 29800,
      status: "sent",
      paymentStatus: "unpaid",
      billTo: {
        name: "Mumbai Central Beverages",
        email: "payments@mumbaicentral.com",
      },
    },
    {
      id: "INV-2024-010",
      invoiceNumber: "INV-2024-010",
      tenantId,
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      issueDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      grandTotal: 56700,
      balanceAmount: 56700,
      status: "sent",
      paymentStatus: "overdue",
      billTo: {
        name: "Mumbai Central Beverages",
        email: "payments@mumbaicentral.com",
      },
    },
    {
      id: "INV-2024-011",
      invoiceNumber: "INV-2024-011",
      tenantId,
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      issueDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      grandTotal: 38900,
      balanceAmount: 38900,
      status: "sent",
      paymentStatus: "unpaid",
      billTo: {
        name: "Mumbai Central Beverages",
        email: "payments@mumbaicentral.com",
      },
    },
  ];

  return mockInvoices;
}

function generateMockCreditLimits(tenantId: string): CreditLimit[] {
  return [
    {
      id: "CL-001",
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      tenantId,
      totalLimit: 500000,
      availableLimit: 325000,
      usedLimit: 175000,
      blockedLimit: 0,
      utilizationPercentage: 35,
      status: "within_limit",
      creditDays: 30,
      interestRate: 18,
      penaltyRate: 24,
      warningThreshold: 80,
      blockingThreshold: 95,
      history: [],
      lastReviewedAt: new Date().toISOString(),
      lastReviewedBy: "system",
      nextReviewDate: new Date(
        Date.now() + 90 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

function generateMockLatePaymentAlerts(tenantId: string): LatePaymentAlert[] {
  return [
    {
      id: "ALERT-001",
      invoiceId: "INV-2024-007",
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      tenantId,
      daysOverdue: 10,
      overdueAmount: 35400,
      totalOutstanding: 35400,
      alertLevel: 2,
      alertType: "warning",
      notificationsSent: [
        {
          id: "NOTIF-001",
          type: "email",
          sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          sentTo: "payments@mumbaicentral.com",
          content: "Payment reminder for invoice INV-2024-007",
          deliveryStatus: "delivered",
        },
        {
          id: "NOTIF-002",
          type: "sms",
          sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          sentTo: "+91-9876543210",
          content: "Urgent: Invoice INV-2024-007 is 10 days overdue",
          deliveryStatus: "delivered",
        },
      ],
      callsMade: [
        {
          id: "CALL-001",
          calledAt: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          calledBy: "collection_agent",
          duration: 180,
          outcome: "answered",
          notes: "Spoke with finance manager. Promised payment by end of week.",
          followUpRequired: true,
          followUpDate: new Date(
            Date.now() + 2 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      status: "active",
      nextActionDate: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      escalationDate: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ALERT-002",
      invoiceId: "INV-2024-010",
      franchiseeId: "FRAN001",
      corporateId: "CORP001",
      tenantId,
      daysOverdue: 20,
      overdueAmount: 56700,
      totalOutstanding: 56700,
      alertLevel: 3,
      alertType: "final_notice",
      notificationsSent: [
        {
          id: "NOTIF-003",
          type: "email",
          sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          sentTo: "payments@mumbaicentral.com",
          content: "Final notice for invoice INV-2024-010",
          deliveryStatus: "delivered",
        },
        {
          id: "NOTIF-004",
          type: "letter",
          sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          sentTo: "Mumbai Central Beverages",
          content: "Legal notice for overdue payment",
          deliveryStatus: "sent",
        },
      ],
      callsMade: [
        {
          id: "CALL-002",
          calledAt: new Date(
            Date.now() - 3 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          calledBy: "senior_collection_manager",
          duration: 420,
          outcome: "answered",
          notes:
            "Discussed payment plan options. Customer requested 7-day extension.",
          followUpRequired: true,
          followUpDate: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      status: "escalated",
      nextActionDate: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      escalationDate: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

function generateMockAnalytics(tenantId: string): PaymentAnalytics {
  return {
    tenantId,
    period: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    },
    totalTransactions: 67,
    totalAmount: 1842500,
    averageAmount: 27500,
    successfulTransactions: 62,
    successRate: 92.5,
    failedTransactions: 5,
    failureRate: 7.5,
    gatewayBreakdown: {
      razorpay: {
        transactionCount: 28,
        totalAmount: 890000,
        successRate: 96.4,
        averageProcessingTime: 3.2,
        totalFees: 17800,
        uptime: 99.8,
      },
      upi: {
        transactionCount: 22,
        totalAmount: 615000,
        successRate: 95.5,
        averageProcessingTime: 1.8,
        totalFees: 0,
        uptime: 99.7,
      },
      payu: {
        transactionCount: 8,
        totalAmount: 185000,
        successRate: 87.5,
        averageProcessingTime: 4.1,
        totalFees: 4255,
        uptime: 99.2,
      },
      neft: {
        transactionCount: 6,
        totalAmount: 125000,
        successRate: 100,
        averageProcessingTime: 1440,
        totalFees: 30,
        uptime: 99.9,
      },
      rtgs: {
        transactionCount: 3,
        totalAmount: 27500,
        successRate: 100,
        averageProcessingTime: 120,
        totalFees: 75,
        uptime: 99.9,
      },
    } as Record<PaymentGateway, any>,
    autoReconciledCount: 58,
    manualReconciledCount: 7,
    pendingReconciliation: 2,
    reconciliationRate: 94.0,
    creditUtilization: 42,
    averageCreditDays: 28,
    overduePayments: 3,
    overdueAmount: 92100,
    collectionEfficiency: 94.2,
    averageCollectionDays: 24,
    badDebtPercentage: 0.8,
    dailyTrends: [
      {
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        transactionCount: 8,
        amount: 245000,
        successRate: 92.5,
      },
      {
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        transactionCount: 12,
        amount: 387000,
        successRate: 91.7,
      },
      {
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        transactionCount: 6,
        amount: 156000,
        successRate: 100,
      },
      {
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        transactionCount: 15,
        amount: 423000,
        successRate: 93.3,
      },
      {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        transactionCount: 9,
        amount: 298000,
        successRate: 88.9,
      },
      {
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        transactionCount: 11,
        amount: 335000,
        successRate: 95.5,
      },
      {
        date: new Date().toISOString(),
        transactionCount: 6,
        amount: 198500,
        successRate: 100,
      },
    ],
    monthlyTrends: [
      {
        month: "Jan 2024",
        transactionCount: 45,
        amount: 1250000,
        successRate: 91.1,
        averageAmount: 27777,
      },
      {
        month: "Feb 2024",
        transactionCount: 52,
        amount: 1480000,
        successRate: 92.3,
        averageAmount: 28461,
      },
      {
        month: "Mar 2024",
        transactionCount: 67,
        amount: 1842500,
        successRate: 92.5,
        averageAmount: 27500,
      },
    ],
  };
}

function getStatusColor(status: PaymentWorkflowStatus) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "processing":
    case "gateway_pending":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "initiated":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default PaymentWorkflowDashboard;
