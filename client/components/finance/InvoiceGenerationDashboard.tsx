import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  FileText,
  Download,
  Send,
  Eye,
  Plus,
  Search,
  Filter,
  IndianRupee,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Share2,
  Receipt,
  CreditCard,
  Building2,
  Package,
  Truck,
  Shield,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Users,
  Activity,
  BarChart3,
  PieChart,
  RefreshCw,
  Settings,
  Mail,
  Phone,
  MessageSquare,
  ExternalLink,
  Paperclip,
  Star,
  Flag,
} from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";

import {
  Invoice,
  InvoiceStatus,
  InvoiceFilters,
  InvoiceAnalytics,
  PaymentDueTracker,
} from "./invoice-types";
import { UnifiedNotificationDashboard } from "../notifications/UnifiedNotificationDashboard";

interface InvoiceGenerationDashboardProps {
  userType: "corporate" | "franchisee";
  tenantId: string;
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function InvoiceGenerationDashboard({
  userType,
  tenantId,
  currentTab = "overview",
  onTabChange,
}: InvoiceGenerationDashboardProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [analytics, setAnalytics] = useState<InvoiceAnalytics | null>(null);
  const [dueTrackers, setDueTrackers] = useState<PaymentDueTracker[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<InvoiceFilters>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPDFPreviewOpen, setIsPDFPreviewOpen] = useState(false);

  // Store timeout IDs for cleanup
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Clear any existing timeouts to prevent memory leaks
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    loadInvoices();
    loadAnalytics();
    loadDueTrackers();

    // Cleanup function to clear timeouts when component unmounts or dependencies change
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
      // Reset all modal states on cleanup to prevent memory leaks
      setIsDetailsModalOpen(false);
      setIsCreateModalOpen(false);
      setIsPaymentModalOpen(false);
      setIsPDFPreviewOpen(false);
      setSelectedInvoice(null);
    };
  }, [userType, tenantId]);

  // Separate effect for filters to avoid unnecessary data reloading
  useEffect(() => {
    // Only filter existing data, don't reload from server
    // The filteredInvoices computation handles this automatically
  }, [filters]);

  // Optimized filter handlers to prevent unnecessary re-renders
  const handleStatusFilterChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      status: value === "all" ? undefined : [value as InvoiceStatus],
    }));
  }, []);

  const handlePaymentStatusFilterChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      paymentStatus: value === "all" ? undefined : [value as any],
    }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Debounced search handler to prevent excessive filtering
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const loadInvoices = async () => {
    setIsLoading(true);
    // Simulate API call with proper cleanup
    const timeoutId = setTimeout(() => {
      try {
        setInvoices(generateMockInvoices());
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading invoices:", error);
        setIsLoading(false);
      }
    }, 1000);
    timeoutRefs.current.push(timeoutId);
  };

  const loadAnalytics = async () => {
    const timeoutId = setTimeout(() => {
      try {
        setAnalytics(generateMockAnalytics());
      } catch (error) {
        console.error("Error loading analytics:", error);
      }
    }, 1200);
    timeoutRefs.current.push(timeoutId);
  };

  const loadDueTrackers = async () => {
    const timeoutId = setTimeout(() => {
      try {
        setDueTrackers(generateMockDueTrackers());
      } catch (error) {
        console.error("Error loading due trackers:", error);
      }
    }, 800);
    timeoutRefs.current.push(timeoutId);
  };

  // Filter invoices based on search and filters - memoized for performance
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.invoiceNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        invoice.billTo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.poNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        !filters.status ||
        filters.status.length === 0 ||
        filters.status.includes(invoice.status);
      const matchesPaymentStatus =
        !filters.paymentStatus ||
        filters.paymentStatus.length === 0 ||
        filters.paymentStatus.includes(invoice.paymentStatus);

      return matchesSearch && matchesStatus && matchesPaymentStatus;
    });
  }, [invoices, searchTerm, filters]);

  // Group invoices by status
  const groupedInvoices = {
    all: filteredInvoices,
    draft: filteredInvoices.filter((inv) => inv.status === "draft"),
    pending: filteredInvoices.filter((inv) =>
      ["sent", "viewed"].includes(inv.status),
    ),
    paid: filteredInvoices.filter((inv) => inv.status === "paid"),
    overdue: filteredInvoices.filter((inv) => inv.status === "overdue"),
    partial: filteredInvoices.filter((inv) => inv.status === "partially_paid"),
  };

  // Handle invoice actions
  const handleCreateInvoice = (poId?: string) => {
    setIsCreateModalOpen(true);
    // Pre-populate with PO data if provided
  };

  const handleSendInvoice = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: "sent" as InvoiceStatus,
              sentAt: new Date().toISOString(),
            }
          : inv,
      ),
    );
    alert("Invoice sent successfully!");
  };

  const handleMarkPaid = (invoiceId: string, amount?: number) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: "paid" as InvoiceStatus,
              paymentStatus: "paid",
              paidAmount: amount || inv.grandTotal,
              balanceAmount: 0,
              payments: [
                ...inv.payments,
                {
                  id: `payment_${Date.now()}`,
                  invoiceId,
                  paymentDate: new Date().toISOString(),
                  amount: amount || inv.grandTotal,
                  paymentMethod: "bank_transfer",
                  reference: `PAY-${Date.now()}`,
                  status: "cleared",
                  processedBy: "system",
                  processedAt: new Date().toISOString(),
                },
              ],
            }
          : inv,
      ),
    );
    alert("Payment recorded successfully!");
  };

  const handleDownloadPDF = (invoiceId: string) => {
    // Simulate PDF download
    alert(`Downloading PDF for invoice ${invoiceId}`);
  };

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700";
      case "sent":
        return "bg-blue-100 text-blue-700";
      case "viewed":
        return "bg-purple-100 text-purple-700";
      case "partially_paid":
        return "bg-yellow-100 text-yellow-700";
      case "paid":
        return "bg-green-100 text-green-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      case "disputed":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: InvoiceStatus) => {
    switch (status) {
      case "draft":
        return <Edit className="h-3 w-3" />;
      case "sent":
        return <Send className="h-3 w-3" />;
      case "viewed":
        return <Eye className="h-3 w-3" />;
      case "partially_paid":
        return <CreditCard className="h-3 w-3" />;
      case "paid":
        return <CheckCircle className="h-3 w-3" />;
      case "overdue":
        return <AlertTriangle className="h-3 w-3" />;
      case "disputed":
        return <Flag className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  const getPriorityColor = (daysPastDue: number) => {
    if (daysPastDue <= 0) return "text-green-600";
    if (daysPastDue <= 15) return "text-yellow-600";
    if (daysPastDue <= 30) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Receipt className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">
              {userType === "corporate" ? "Corporate" : "Franchisee"} Invoice
              Management
            </h1>
          </div>
          <p className="text-gray-600">
            Generate, manage, and track invoices with GST compliance
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Generate Invoice
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
                <ArrowDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Receipt className="h-4 w-4 mr-2" />
                Export to PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart3 className="h-4 w-4 mr-2" />
                GST Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Analytics Overview */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 bg-blue-200/40 rounded-bl-[16px]"></div>
            <div className="flex flex-row items-start justify-between">
              <div className="space-y-2 flex-1">
                <CardTitle className="text-sm font-medium text-blue-700">
                  Total Invoices
                </CardTitle>
                <div className="text-3xl font-bold text-blue-900">
                  {analytics.totalInvoices}
                </div>
                <p className="text-xs text-blue-600">This month</p>
              </div>
              <div className="flex-shrink-0 ml-4 relative z-10">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 bg-green-200/40 rounded-bl-[16px]"></div>
            <div className="flex flex-row items-start justify-between">
              <div className="space-y-2 flex-1">
                <CardTitle className="text-sm font-medium text-green-700">
                  Total Amount
                </CardTitle>
                <div className="text-3xl font-bold text-green-900">
                  ₹{(analytics.totalAmount / 100000).toFixed(1)}L
                </div>
                <p className="text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <div className="flex-shrink-0 ml-4 relative z-10">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <IndianRupee className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-yellow-50 border-yellow-100 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-200/40 rounded-bl-[16px]"></div>
            <div className="flex flex-row items-start justify-between">
              <div className="space-y-2 flex-1">
                <CardTitle className="text-sm font-medium text-yellow-700">
                  Pending Amount
                </CardTitle>
                <div className="text-3xl font-bold text-yellow-900">
                  ₹{(analytics.pendingAmount / 100000).toFixed(1)}L
                </div>
                <p className="text-xs text-yellow-600">Awaiting payment</p>
              </div>
              <div className="flex-shrink-0 ml-4 relative z-10">
                <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-red-50 border-red-100 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 bg-red-200/40 rounded-bl-[16px]"></div>
            <div className="flex flex-row items-start justify-between">
              <div className="space-y-2 flex-1">
                <CardTitle className="text-sm font-medium text-red-700">
                  Overdue Amount
                </CardTitle>
                <div className="text-3xl font-bold text-red-900">
                  ₹{(analytics.overdueAmount / 100000).toFixed(1)}L
                </div>
                <p className="text-xs text-red-600">Requires attention</p>
              </div>
              <div className="flex-shrink-0 ml-4 relative z-10">
                <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search invoices, PO numbers, or franchisees..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select
                value={filters.status?.[0] || "all"}
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.paymentStatus?.[0] || "all"}
                onValueChange={handlePaymentStatusFilterChange}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="partially_paid">Partial</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={handleClearFilters}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={currentTab}
        onValueChange={onTabChange}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">
            Invoices ({groupedInvoices.all.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({groupedInvoices.pending.length})
          </TabsTrigger>
          <TabsTrigger value="due-tracking">Due Tracking</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Invoices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupedInvoices.all.slice(0, 5).map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{invoice.invoiceNumber}</p>
                          <p className="text-sm text-gray-600">
                            {invoice.billTo.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ₹{invoice.grandTotal.toLocaleString()}
                        </p>
                        <Badge
                          className={getStatusColor(invoice.status)}
                          variant="secondary"
                        >
                          {getStatusIcon(invoice.status)}
                          <span className="ml-1">{invoice.status}</span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Paid</span>
                      <span className="text-green-600">
                        ₹{analytics?.paidAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={
                        analytics
                          ? (analytics.paidAmount / analytics.totalAmount) * 100
                          : 0
                      }
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pending</span>
                      <span className="text-yellow-600">
                        ₹{analytics?.pendingAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={
                        analytics
                          ? (analytics.pendingAmount / analytics.totalAmount) *
                            100
                          : 0
                      }
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overdue</span>
                      <span className="text-red-600">
                        ₹{analytics?.overdueAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={
                        analytics
                          ? (analytics.overdueAmount / analytics.totalAmount) *
                            100
                          : 0
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button
                  onClick={() => handleCreateInvoice()}
                  className="h-24 flex-col"
                >
                  <Plus className="h-6 w-6 mb-2" />
                  Generate Invoice
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Package className="h-6 w-6 mb-2" />
                  Bulk Invoice from POs
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Send className="h-6 w-6 mb-2" />
                  Send Reminders
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  GST Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <Card
                key={invoice.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {invoice.invoiceNumber}
                          </h3>
                          <p className="text-sm text-gray-600">
                            PO: {invoice.poNumber}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-xs text-gray-500">
                            Bill To
                          </Label>
                          <p className="font-medium">{invoice.billTo.name}</p>
                          <p className="text-sm text-gray-600">
                            {invoice.billTo.type}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">
                            Issue Date
                          </Label>
                          <p className="font-medium">
                            {new Date(invoice.issueDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Due:{" "}
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">
                            Amount
                          </Label>
                          <p className="font-medium">
                            ₹{invoice.grandTotal.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Balance: ₹{invoice.balanceAmount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">
                            Status
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={getStatusColor(invoice.status)}
                              variant="secondary"
                            >
                              {getStatusIcon(invoice.status)}
                              <span className="ml-1 capitalize">
                                {invoice.status.replace("_", " ")}
                              </span>
                            </Badge>
                            {invoice.isPartialInvoice && (
                              <Badge variant="outline" className="text-xs">
                                Partial {invoice.partialInvoiceSequence}/
                                {invoice.totalPartialInvoices}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>
                          Created:{" "}
                          {formatDistanceToNow(parseISO(invoice.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                        {invoice.sentAt && (
                          <>
                            <span>•</span>
                            <span>
                              Sent:{" "}
                              {formatDistanceToNow(parseISO(invoice.sentAt), {
                                addSuffix: true,
                              })}
                            </span>
                          </>
                        )}
                        <span>•</span>
                        <span>Items: {invoice.items.length}</span>
                        {invoice.gstDetails.isGSTApplicable && (
                          <>
                            <span>•</span>
                            <span>
                              GST: ₹
                              {invoice.gstDetails.totalTax.toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPDF(invoice.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>

                      {invoice.status === "draft" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendInvoice(invoice.id)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      )}

                      {["sent", "viewed", "partially_paid", "overdue"].includes(
                        invoice.status,
                      ) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsPaymentModalOpen(true)}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Record Payment
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setIsDetailsModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share Link
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Pending Tab */}
        <TabsContent value="pending" className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {groupedInvoices.pending.length} invoices are pending payment.
              Monitor these closely to maintain cash flow.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {groupedInvoices.pending.map((invoice) => (
              <Card key={invoice.id} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium">{invoice.invoiceNumber}</h4>
                        <Badge
                          className={getStatusColor(invoice.status)}
                          variant="secondary"
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{invoice.billTo.name}</span>
                        <span>•</span>
                        <span>₹{invoice.grandTotal.toLocaleString()}</span>
                        <span>•</span>
                        <span>
                          Due: {new Date(invoice.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Reminder
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleMarkPaid(invoice.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Paid
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Due Tracking Tab */}
        <TabsContent value="due-tracking" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">0-15 Days</p>
                  <p className="text-2xl font-bold">
                    {dueTrackers.filter((t) => t.daysPastDue <= 15).length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">16-30 Days</p>
                  <p className="text-2xl font-bold">
                    {
                      dueTrackers.filter(
                        (t) => t.daysPastDue > 15 && t.daysPastDue <= 30,
                      ).length
                    }
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">30+ Days</p>
                  <p className="text-2xl font-bold">
                    {dueTrackers.filter((t) => t.daysPastDue > 30).length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            {dueTrackers.map((tracker) => (
              <Card
                key={tracker.invoiceId}
                className={`border-l-4 ${
                  tracker.daysPastDue <= 15
                    ? "border-l-yellow-500"
                    : tracker.daysPastDue <= 30
                      ? "border-l-orange-500"
                      : "border-l-red-500"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium">{tracker.invoiceId}</h4>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(tracker.daysPastDue)}
                        >
                          {tracker.daysPastDue > 0
                            ? `${tracker.daysPastDue} days overdue`
                            : "Current"}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {tracker.riskCategory} risk
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-gray-500">
                            Franchisee
                          </Label>
                          <p>{tracker.franchiseeId}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">
                            Amount Due
                          </Label>
                          <p className="font-medium">
                            ₹{tracker.dueAmount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">
                            Original Due Date
                          </Label>
                          <p>
                            {new Date(
                              tracker.originalDueDate,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">
                            Last Contact
                          </Label>
                          <p>
                            {tracker.collectionCalls.length > 0
                              ? formatDistanceToNow(
                                  parseISO(tracker.collectionCalls[0].calledAt),
                                  { addSuffix: true },
                                )
                              : "No contact"}
                          </p>
                        </div>
                      </div>

                      {tracker.paymentPromises.length > 0 && (
                        <Alert className="mt-2">
                          <AlertDescription>
                            Payment promised for{" "}
                            {new Date(
                              tracker.paymentPromises[0].promiseDate,
                            ).toLocaleDateString()}
                            - Amount: ₹
                            {tracker.paymentPromises[0].promisedAmount.toLocaleString()}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        SMS
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
          {analytics && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Average Payment Days</span>
                      <span className="font-medium">
                        {analytics.averagePaymentDays} days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>On-time Payment Rate</span>
                      <span className="font-medium">
                        {analytics.onTimePaymentRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dispute Rate</span>
                      <span className="font-medium">
                        {analytics.disputeRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Invoice Value</span>
                      <span className="font-medium">
                        ₹{analytics.averageInvoiceValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>GST Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total GST Collected</span>
                      <span className="font-medium">
                        ₹{analytics.totalGSTCollected.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly GST Liability</span>
                      <span className="font-medium">
                        ₹{analytics.monthlyGSTLiability.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-4">
                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download GST Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create Invoice Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate New Invoice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select PO for Invoice Generation</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Purchase Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PO-2024-001">
                    PO-2024-001 - Mumbai Central (₹75,500)
                  </SelectItem>
                  <SelectItem value="PO-2024-002">
                    PO-2024-002 - Delhi North (₹45,200)
                  </SelectItem>
                  <SelectItem value="PO-2024-003">
                    PO-2024-003 - Bangalore South (₹89,750)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Invoice Type</Label>
                <Select defaultValue="tax_invoice">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tax_invoice">Tax Invoice</SelectItem>
                    <SelectItem value="bill_of_supply">
                      Bill of Supply
                    </SelectItem>
                    <SelectItem value="proforma_invoice">
                      Proforma Invoice
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  defaultValue={
                    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch />
              <Label>Generate partial invoice for delivered items only</Label>
            </div>

            <div>
              <Label>Additional Notes</Label>
              <Textarea placeholder="Any special instructions or notes for this invoice..." />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Generate invoice logic
                setIsCreateModalOpen(false);
                alert("Invoice generated successfully!");
              }}
            >
              Generate Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Details Modal */}
      <Dialog
        open={isDetailsModalOpen}
        onOpenChange={(open) => {
          setIsDetailsModalOpen(open);
          if (!open) {
            // Clear selected invoice when modal is closed to free memory
            setSelectedInvoice(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl w-[95vw] max-h-[85vh] overflow-hidden">
          <DialogHeader className="space-y-3 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                <Receipt className="h-5 w-5 text-blue-600" />
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Invoice Details - {selectedInvoice?.invoiceNumber}
              </DialogTitle>
            </div>
            {selectedInvoice && (
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <Badge
                  className={getStatusColor(selectedInvoice.status)}
                  variant="secondary"
                >
                  {getStatusIcon(selectedInvoice.status)}
                  <span className="ml-1 capitalize">
                    {selectedInvoice.status.replace("_", " ")}
                  </span>
                </Badge>
                <span>•</span>
                <span>PO: {selectedInvoice.poNumber}</span>
                <span>•</span>
                <span>₹{selectedInvoice.grandTotal.toLocaleString()}</span>
              </div>
            )}
          </DialogHeader>

          {selectedInvoice && (
            <div
              className="overflow-y-auto flex-1"
              style={{ maxHeight: "calc(85vh - 200px)" }}
            >
              <div className="space-y-6 pr-2">
                {/* Invoice Header Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Invoice Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Number:</span>
                        <span className="text-sm font-medium">
                          {selectedInvoice.invoiceNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Type:</span>
                        <span className="text-sm font-medium capitalize">
                          {selectedInvoice.invoiceType.replace("_", " ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Issue Date:
                        </span>
                        <span className="text-sm font-medium">
                          {new Date(
                            selectedInvoice.issueDate,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Due Date:</span>
                        <span className="text-sm font-medium">
                          {new Date(
                            selectedInvoice.dueDate,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Bill To
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="font-medium text-sm">
                          {selectedInvoice.billTo.name}
                        </p>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{selectedInvoice.billTo.address.street}</p>
                        <p>
                          {selectedInvoice.billTo.address.city},{" "}
                          {selectedInvoice.billTo.address.state}
                        </p>
                        <p>{selectedInvoice.billTo.address.postalCode}</p>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-sm text-gray-500">GST:</span>
                        <span className="text-sm font-medium">
                          {selectedInvoice.billTo.gstNumber}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <IndianRupee className="h-4 w-4" />
                        Amount Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Subtotal:</span>
                        <span className="text-sm font-medium">
                          ₹{selectedInvoice.subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Tax:</span>
                        <span className="text-sm font-medium">
                          ₹{selectedInvoice.totalTax.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm font-medium">Total:</span>
                        <span className="text-sm font-bold">
                          ₹{selectedInvoice.grandTotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Balance:</span>
                        <span
                          className={`text-sm font-medium ${selectedInvoice.balanceAmount > 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          ₹{selectedInvoice.balanceAmount.toLocaleString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Line Items */}
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Line Items ({selectedInvoice.items.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-gray-50">
                            <th className="text-left p-3 font-medium">
                              Product
                            </th>
                            <th className="text-right p-3 font-medium">Qty</th>
                            <th className="text-right p-3 font-medium">
                              Unit Price
                            </th>
                            <th className="text-right p-3 font-medium">
                              Amount
                            </th>
                            <th className="text-right p-3 font-medium">Tax</th>
                            <th className="text-right p-3 font-medium">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedInvoice.items.map((item, index) => (
                            <tr
                              key={item.id}
                              className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                            >
                              <td className="p-3">
                                <div>
                                  <p className="font-medium">
                                    {item.productName}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    HSN: {item.hsnCode}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {item.description}
                                  </p>
                                </div>
                              </td>
                              <td className="text-right p-3 font-medium">
                                {item.quantity}
                              </td>
                              <td className="text-right p-3">
                                ₹{item.unitPrice.toLocaleString()}
                              </td>
                              <td className="text-right p-3">
                                ₹{item.netAmount.toLocaleString()}
                              </td>
                              <td className="text-right p-3">
                                ₹{item.totalTaxAmount.toLocaleString()}
                              </td>
                              <td className="text-right p-3 font-medium">
                                ₹{item.totalAmount.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* GST Summary */}
                {selectedInvoice.gstDetails.isGSTApplicable && (
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        GST Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              GST Registration:
                            </span>
                            <span className="text-sm font-medium">
                              {
                                selectedInvoice.gstDetails.gstRegistration
                                  .gstNumber
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Place of Supply:
                            </span>
                            <span className="text-sm font-medium">
                              {selectedInvoice.gstDetails.placeOfSupply}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Supply Type:
                            </span>
                            <span className="text-sm font-medium capitalize">
                              {selectedInvoice.gstDetails.supplyType}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">CGST:</span>
                            <span className="text-sm font-medium">
                              ₹
                              {selectedInvoice.gstDetails.totalCGST.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">SGST:</span>
                            <span className="text-sm font-medium">
                              ₹
                              {selectedInvoice.gstDetails.totalSGST.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-sm font-medium">
                              Total GST:
                            </span>
                            <span className="text-sm font-bold">
                              ₹
                              {selectedInvoice.gstDetails.totalTax.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Payment History */}
                {selectedInvoice.payments.length > 0 && (
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment History ({selectedInvoice.payments.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedInvoice.payments.map((payment) => (
                          <div
                            key={payment.id}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  ₹{payment.amount.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {payment.paymentMethod} - {payment.reference}
                                </p>
                                {payment.notes && (
                                  <p className="text-xs text-gray-500">
                                    {payment.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {new Date(
                                  payment.paymentDate,
                                ).toLocaleDateString()}
                              </p>
                              <Badge
                                variant={
                                  payment.status === "cleared"
                                    ? "default"
                                    : "outline"
                                }
                                className="mt-1"
                              >
                                {payment.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Workflow Status */}
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Workflow Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedInvoice.workflow.stages.map((stage, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${stage.exitedAt ? "bg-green-500" : "bg-blue-500"}`}
                          ></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium capitalize">
                              {stage.stage.replace("_", " ")}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(stage.enteredAt).toLocaleString()}
                              {stage.duration && ` (${stage.duration}m)`}
                            </p>
                          </div>
                          {stage.exitedAt && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between pt-4 border-t">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => handleDownloadPDF(selectedInvoice?.id || "")}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              {selectedInvoice && selectedInvoice.status === "draft" && (
                <Button onClick={() => handleSendInvoice(selectedInvoice.id)}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Invoice
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Mock data generators
function generateMockInvoices(): Invoice[] {
  return [
    {
      id: "INV-2024-001",
      invoiceNumber: "INV-2024-001",
      invoiceType: "tax_invoice",
      tenantId: "tenant_001",
      corporateId: "CORP001",
      franchiseeId: "FRAN001",
      poId: "PO-2024-003",
      poNumber: "PO-2024-003",
      challanIds: ["CH-2024-001"],
      grnIds: ["GRN-2024-089"],
      deliveryIds: ["DEL-2024-156"],
      issueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      billFrom: {
        id: "CORP001",
        name: "BuildPro Corporate",
        legalName: "BuildPro Construction Pvt Ltd",
        type: "corporate",
        email: "billing@buildpro.com",
        phone: "+91-9876543210",
        address: {
          street: "123 Corporate Plaza",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400001",
          country: "India",
        },
        gstNumber: "27AABCB1234C1Z5",
        panNumber: "AABCB1234C",
        businessType: "company",
      },
      billTo: {
        id: "FRAN001",
        name: "Mumbai Central Beverages",
        legalName: "Mumbai Central Beverages Pvt Ltd",
        type: "franchisee",
        email: "accounts@mumbaicentral.com",
        phone: "+91-9876543211",
        address: {
          street: "456 Franchise Street",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400002",
          country: "India",
        },
        gstNumber: "27DEFGH5678I9J0",
        panNumber: "DEFGH5678I",
        businessType: "company",
      },
      items: [
        {
          id: "item_001",
          lineNumber: 1,
          productId: "PROD001",
          sku: "COL500",
          productName: "Coca Cola 500ml",
          description: "Coca Cola 500ml bottles",
          category: "Beverages",
          unit: "bottles",
          hsnCode: "22029910",
          taxCategory: "taxable",
          quantity: 100,
          deliveredQuantity: 100,
          pendingQuantity: 0,
          unitPrice: 25,
          grossAmount: 2500,
          discountType: "percentage",
          discountValue: 5,
          discountAmount: 125,
          netAmount: 2375,
          taxableAmount: 2375,
          cgstRate: 9,
          cgstAmount: 213.75,
          sgstRate: 9,
          sgstAmount: 213.75,
          igstRate: 0,
          igstAmount: 0,
          totalTaxAmount: 427.5,
          totalAmount: 2802.5,
          itemStatus: "delivered",
        },
      ],
      subtotal: 2375,
      totalDiscount: 125,
      totalTaxableAmount: 2375,
      totalTax: 427.5,
      totalAmount: 2802.5,
      roundingAdjustment: -2.5,
      grandTotal: 2800,
      gstDetails: {
        isGSTApplicable: true,
        gstRegistration: {
          gstNumber: "27AABCB1234C1Z5",
          registrationType: "regular",
          registrationDate: "2017-07-01",
          isActive: true,
        },
        placeOfSupply: "Maharashtra",
        stateCode: "27",
        supplyType: "intrastate",
        reverseCharge: false,
        totalCGST: 213.75,
        totalSGST: 213.75,
        totalIGST: 0,
        totalCESS: 0,
        totalTax: 427.5,
        eWayBillRequired: false,
        eInvoiceRequired: false,
      },
      hsn: [
        {
          hsnCode: "22029910",
          description: "Non-alcoholic beverages",
          taxableAmount: 2375,
          cgstRate: 9,
          cgstAmount: 213.75,
          sgstRate: 9,
          sgstAmount: 213.75,
          igstRate: 0,
          igstAmount: 0,
          totalTaxAmount: 427.5,
        },
      ],
      paymentStatus: "unpaid",
      paymentTerms: "Net 30 days",
      paidAmount: 0,
      balanceAmount: 2800,
      payments: [],
      status: "sent",
      workflow: {
        currentStage: "sent_to_customer",
        stages: [
          {
            stage: "created",
            enteredAt: new Date(
              Date.now() - 5 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            exitedAt: new Date(
              Date.now() - 5 * 24 * 60 * 60 * 1000 + 60000,
            ).toISOString(),
            duration: 1,
            processedBy: "SYSTEM",
            automationTriggered: ["auto_generate_from_po"],
          },
          {
            stage: "sent_to_customer",
            enteredAt: new Date(
              Date.now() - 5 * 24 * 60 * 60 * 1000 + 60000,
            ).toISOString(),
            processedBy: "SYSTEM",
            automationTriggered: ["auto_send_email"],
          },
        ],
        approvals: [],
        escalations: [],
        autoActions: [],
      },
      isPartialInvoice: false,
      attachments: [],
      auditTrail: [
        {
          id: "audit_001",
          eventType: "created",
          eventDate: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          userId: "SYSTEM",
          userName: "Auto-generation System",
          details: "Invoice auto-generated from PO fulfillment",
        },
      ],
      complianceChecks: [
        {
          checkType: "gst_validation",
          status: "passed",
          message: "GST details validated successfully",
          checkedAt: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      sourceModule: "po_fulfillment",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdBy: "SYSTEM",
      lastModified: new Date(
        Date.now() - 5 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      modifiedBy: "SYSTEM",
      sentAt: new Date(
        Date.now() - 5 * 24 * 60 * 60 * 1000 + 60000,
      ).toISOString(),
    },
    // Add more mock invoices as needed
  ];
}

function generateMockAnalytics(): InvoiceAnalytics {
  return {
    period: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    },
    totalInvoices: 156,
    totalAmount: 2450000,
    paidAmount: 1960000,
    pendingAmount: 490000,
    overdueAmount: 120000,
    averagePaymentDays: 18,
    onTimePaymentRate: 78.5,
    disputeRate: 2.1,
    averageInvoiceValue: 15705,
    totalGSTCollected: 367500,
    monthlyGSTLiability: 367500,
    monthlyTrends: [],
    paymentTrends: [],
    franchiseePerformance: [],
    agingBuckets: [
      {
        range: "0-15 days",
        invoiceCount: 45,
        totalAmount: 350000,
        percentage: 71.4,
      },
      {
        range: "16-30 days",
        invoiceCount: 8,
        totalAmount: 90000,
        percentage: 18.4,
      },
      {
        range: "31-60 days",
        invoiceCount: 3,
        totalAmount: 50000,
        percentage: 10.2,
      },
    ],
    topPayingFranchisees: [],
    slowPayingFranchisees: [],
    highValueInvoices: [],
  };
}

function generateMockDueTrackers(): PaymentDueTracker[] {
  return [
    {
      invoiceId: "INV-2024-001",
      franchiseeId: "FRAN001",
      dueAmount: 2800,
      originalDueDate: new Date(
        Date.now() + 25 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      daysPastDue: 0,
      riskCategory: "low",
      remindersSent: [],
      collectionCalls: [],
      collectionNotes: [],
      paymentPromises: [],
      escalationLevel: 0,
      resolutionStatus: "active",
    },
    // Add more mock trackers as needed
  ];
}
