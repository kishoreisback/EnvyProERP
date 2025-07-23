import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Switch } from "../ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calculator,
  Receipt,
  CreditCard,
  Building2,
  Users,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Filter,
  Search,
  Download,
  Upload,
  Settings,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  FileText,
  Calendar,
  Wallet,
  Banknote,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Bell,
  Shield,
} from "lucide-react";
import {
  financeTenants,
  getFinancialAccountsByTenant,
  getTransactionsByTenant,
  getInvoicesByTenant,
  getBudgetsByTenant,
  getFinancialAnalyticsByTenant,
  getFinanceConfigurationByTenant,
  calculateFinancialRatios,
  generateTrialBalance,
} from "./data";
import { PaymentWorkflowDashboard } from "./PaymentWorkflowDashboard";
import {
  TenantFinancialAccount,
  TenantTransaction,
  TenantInvoice,
  TenantBudget,
  TenantFinancialAnalytics,
  Currency,
  AccountType,
  TransactionType,
  TransactionStatus,
  InvoiceStatus,
} from "./types";
import { useToast } from "../ui/use-toast";
import { TaxComplianceDashboard } from "./TaxComplianceDashboard";

interface TenantFinanceDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function TenantFinanceDashboard({
  currentTab = "overview",
  onTabChange,
}: TenantFinanceDashboardProps) {
  // State management
  const [selectedTenantId, setSelectedTenantId] = useState("tenant_buildcorp");
  const [activeTab, setActiveTab] = useState(currentTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: "2024-01-01",
    endDate: "2024-03-31",
  });

  // Get tenant-specific data first
  const currentTenant = financeTenants.find((t) => t.id === selectedTenantId);

  // Modal states
  const [modals, setModals] = useState({
    createAccount: false,
    createTransaction: false,
    createInvoice: false,
    createBudget: false,
    viewTransaction: false,
    viewInvoice: false,
    editAccount: false,
    settings: false,
  });

  const [selectedTransaction, setSelectedTransaction] =
    useState<TenantTransaction | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<TenantInvoice | null>(
    null,
  );
  const [selectedAccount, setSelectedAccount] =
    useState<TenantFinancialAccount | null>(null);

  // Form states - now currentTenant is available
  const [accountForm, setAccountForm] = useState({
    accountCode: "",
    accountName: "",
    accountType: "assets" as AccountType,
    parentAccountId: "none",
    openingBalance: 0,
    currency: currentTenant?.baseCurrency || "INR",
    allowDirectPosting: true,
    isBankAccount: false,
    isCashAccount: false,
    description: "",
  });

  const [transactionForm, setTransactionForm] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "journal_entry" as TransactionType,
    reference: "",
    description: "",
    journalEntries: [
      { accountId: "", debitAmount: 0, creditAmount: 0, description: "" },
      { accountId: "", debitAmount: 0, creditAmount: 0, description: "" },
    ],
  });

  const [invoiceForm, setInvoiceForm] = useState({
    customerName: "",
    customerEmail: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    items: [{ description: "", quantity: 1, rate: 0, amount: 0 }],
    notes: "",
    taxRate: 18,
  });

  const [budgetForm, setBudgetForm] = useState({
    name: "",
    period: "annual" as "monthly" | "quarterly" | "annual",
    startDate: "",
    endDate: "",
    categories: [
      { accountId: "", categoryName: "", budgetedAmount: 0, notes: "" },
    ],
    description: "",
  });

  const [settingsForm, setSettingsForm] = useState({
    baseCurrency: currentTenant?.baseCurrency || "INR",
    fiscalYearStart: "april",
    invoicePrefix: "INV-",
    paymentTerms: 30,
    defaultTaxRate: 18,
    taxIdentification: "",
    requireApproval: false,
    autoNumbering: true,
    multiCurrency: false,
    approvalThreshold: 100000,
  });

  const { toast } = useToast();
  const accounts = getFinancialAccountsByTenant(selectedTenantId);
  const transactions = getTransactionsByTenant(selectedTenantId);
  const invoices = getInvoicesByTenant(selectedTenantId);
  const budgets = getBudgetsByTenant(selectedTenantId);
  const analytics = getFinancialAnalyticsByTenant(selectedTenantId);
  const financeConfig = getFinanceConfigurationByTenant(selectedTenantId);

  // Sync activeTab with currentTab prop
  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      // Reset all modal states when component unmounts
      setModals({
        createAccount: false,
        createTransaction: false,
        createInvoice: false,
        createBudget: false,
        viewTransaction: false,
        viewInvoice: false,
        editAccount: false,
        settings: false,
      });
      setSelectedInvoice(null);
      setSelectedTransaction(null);
      setSelectedAccount(null);
    };
  }, []);

  // Handle tab changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
  };

  // Handle tenant switching
  const handleTenantSwitch = (tenantId: string) => {
    setSelectedTenantId(tenantId);
    toast({
      title: "Tenant Switched",
      description: `Switched to ${financeTenants.find((t) => t.id === tenantId)?.name}`,
    });
  };

  // Calculate financial metrics
  const financialMetrics = useMemo(() => {
    const totalAssets = accounts
      .filter((acc) => acc.accountType === "assets")
      .reduce((sum, acc) => sum + acc.currentBalance, 0);

    const totalLiabilities = accounts
      .filter((acc) => acc.accountType === "liabilities")
      .reduce((sum, acc) => sum + Math.abs(acc.currentBalance), 0);

    const totalEquity = accounts
      .filter((acc) => acc.accountType === "equity")
      .reduce((sum, acc) => sum + Math.abs(acc.currentBalance), 0);

    const totalRevenue = accounts
      .filter((acc) => acc.accountType === "revenue")
      .reduce((sum, acc) => sum + Math.abs(acc.currentBalance), 0);

    const totalExpenses = accounts
      .filter((acc) => acc.accountType === "expenses")
      .reduce((sum, acc) => sum + acc.currentBalance, 0);

    const netIncome = totalRevenue - totalExpenses;
    const grossProfitMargin =
      totalRevenue > 0
        ? ((totalRevenue - totalExpenses) / totalRevenue) * 100
        : 0;

    return {
      totalAssets,
      totalLiabilities,
      totalEquity,
      totalRevenue,
      totalExpenses,
      netIncome,
      grossProfitMargin,
      currentRatio: totalLiabilities > 0 ? totalAssets / totalLiabilities : 0,
    };
  }, [accounts]);

  // Invoice metrics
  const invoiceMetrics = useMemo(() => {
    const totalInvoiced = invoices.reduce(
      (sum, inv) => sum + inv.totalAmount,
      0,
    );
    const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    const totalOutstanding = invoices.reduce(
      (sum, inv) => sum + inv.balanceAmount,
      0,
    );
    const overdueInvoices = invoices.filter(
      (inv) =>
        inv.status === "overdue" ||
        (inv.paymentStatus === "unpaid" && new Date(inv.dueDate) < new Date()),
    );

    return {
      totalInvoiced,
      totalPaid,
      totalOutstanding,
      overdueCount: overdueInvoices.length,
      overdueAmount: overdueInvoices.reduce(
        (sum, inv) => sum + inv.balanceAmount,
        0,
      ),
      collectionRate: totalInvoiced > 0 ? (totalPaid / totalInvoiced) * 100 : 0,
    };
  }, [invoices]);

  // Budget performance
  const budgetPerformance = useMemo(() => {
    if (budgets.length === 0) return null;

    const activeBudget = budgets.find((b) => b.status === "active");
    if (!activeBudget) return null;

    const totalBudget = activeBudget.totalBudget;
    const totalActual = activeBudget.totalActual;
    const totalVariance = totalBudget - totalActual;
    const variancePercentage =
      totalBudget > 0 ? (totalVariance / totalBudget) * 100 : 0;

    return {
      budgetName: activeBudget.name,
      totalBudget,
      totalActual,
      totalVariance,
      variancePercentage,
      performance: variancePercentage > 0 ? "under_budget" : "over_budget",
    };
  }, [budgets]);

  // Format currency based on tenant's base currency
  const formatCurrency = (amount: number, currency?: Currency) => {
    const curr = currency || currentTenant?.baseCurrency || "INR";
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: curr,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  // Format large amounts with appropriate suffixes
  const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
      // 1 Crore
      return `${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      // 1 Lakh
      return `${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      // 1 Thousand
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toLocaleString();
  };

  // Get status color for various statuses
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      overdue: "bg-red-100 text-red-800",
      draft: "bg-gray-100 text-gray-800",
      active: "bg-blue-100 text-blue-800",
      posted: "bg-green-100 text-green-800",
      approved: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Form validation helpers
  const validateAccountForm = () => {
    return (
      accountForm.accountCode &&
      accountForm.accountName &&
      accountForm.accountType
    );
  };

  const validateTransactionForm = () => {
    const totalDebits = transactionForm.journalEntries.reduce(
      (sum, entry) => sum + (entry.debitAmount || 0),
      0,
    );
    const totalCredits = transactionForm.journalEntries.reduce(
      (sum, entry) => sum + (entry.creditAmount || 0),
      0,
    );
    const isBalanced = totalDebits === totalCredits && totalDebits > 0;
    const hasValidEntries = transactionForm.journalEntries.every(
      (entry) => entry.accountId,
    );
    return isBalanced && hasValidEntries && transactionForm.description;
  };

  const validateInvoiceForm = () => {
    return (
      invoiceForm.customerName &&
      invoiceForm.customerEmail &&
      invoiceForm.items.every(
        (item) => item.description && item.quantity > 0 && item.rate > 0,
      )
    );
  };

  const validateBudgetForm = () => {
    return (
      budgetForm.name &&
      budgetForm.startDate &&
      budgetForm.endDate &&
      budgetForm.categories.every(
        (cat) => cat.accountId && cat.categoryName && cat.budgetedAmount > 0,
      )
    );
  };

  // Form reset helpers
  const resetAccountForm = () => {
    setAccountForm({
      accountCode: "",
      accountName: "",
      accountType: "assets",
      parentAccountId: "none",
      openingBalance: 0,
      currency: currentTenant?.baseCurrency || "INR",
      allowDirectPosting: true,
      isBankAccount: false,
      isCashAccount: false,
      description: "",
    });
  };

  const resetTransactionForm = () => {
    setTransactionForm({
      date: new Date().toISOString().split("T")[0],
      type: "journal_entry",
      reference: "",
      description: "",
      journalEntries: [
        { accountId: "", debitAmount: 0, creditAmount: 0, description: "" },
        { accountId: "", debitAmount: 0, creditAmount: 0, description: "" },
      ],
    });
  };

  const resetInvoiceForm = () => {
    setInvoiceForm({
      customerName: "",
      customerEmail: "",
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: "",
      items: [{ description: "", quantity: 1, rate: 0, amount: 0 }],
      notes: "",
      taxRate: 18,
    });
  };

  const resetBudgetForm = () => {
    setBudgetForm({
      name: "",
      period: "annual",
      startDate: "",
      endDate: "",
      categories: [
        { accountId: "", categoryName: "", budgetedAmount: 0, notes: "" },
      ],
      description: "",
    });
  };

  // Close modal helper
  const closeModal = useCallback((modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));

    // Clear selected items and reset forms when closing modals
    if (modalName === "viewTransaction") setSelectedTransaction(null);
    if (modalName === "viewInvoice") setSelectedInvoice(null);
    if (modalName === "editAccount") setSelectedAccount(null);

    // Reset forms
    if (modalName === "createAccount") resetAccountForm();
    if (modalName === "createTransaction") resetTransactionForm();
    if (modalName === "createInvoice") resetInvoiceForm();
    if (modalName === "createBudget") resetBudgetForm();
  }, []);

  // Optimized modal handlers
  const openCreateInvoiceModal = useCallback(() => {
    setModals((prev) => ({ ...prev, createInvoice: true }));
  }, []);

  const openViewInvoiceModal = useCallback((invoice: TenantInvoice) => {
    setSelectedInvoice(invoice);
    setModals((prev) => ({ ...prev, viewInvoice: true }));
  }, []);

  const openCreateTransactionModal = useCallback(() => {
    setModals((prev) => ({ ...prev, createTransaction: true }));
  }, []);

  const openCreateAccountModal = useCallback(() => {
    setModals((prev) => ({ ...prev, createAccount: true }));
  }, []);

  const openCreateBudgetModal = useCallback(() => {
    setModals((prev) => ({ ...prev, createBudget: true }));
  }, []);

  const openSettingsModal = useCallback(() => {
    setModals((prev) => ({ ...prev, settings: true }));
  }, []);

  // CRUD operations
  const handleCreateAccount = () => {
    if (!validateAccountForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate account creation
    toast({
      title: "Account Created",
      description: `Account ${accountForm.accountCode} - ${accountForm.accountName} has been created`,
    });
    closeModal("createAccount");
  };

  const handleCreateTransaction = () => {
    if (!validateTransactionForm()) {
      toast({
        title: "Transaction Error",
        description:
          "Please ensure the transaction is balanced and all fields are filled",
        variant: "destructive",
      });
      return;
    }

    // Simulate transaction creation
    toast({
      title: "Transaction Created",
      description: "Transaction has been recorded successfully",
    });
    closeModal("createTransaction");
  };

  const handleCreateInvoice = () => {
    if (!validateInvoiceForm()) {
      toast({
        title: "Invoice Error",
        description: "Please fill in all required customer and item details",
        variant: "destructive",
      });
      return;
    }

    // Simulate invoice creation
    toast({
      title: "Invoice Created",
      description: "Invoice has been created and is ready to send",
    });
    closeModal("createInvoice");
  };

  const handleCreateBudget = () => {
    if (!validateBudgetForm()) {
      toast({
        title: "Budget Error",
        description: "Please fill in all required budget details",
        variant: "destructive",
      });
      return;
    }

    // Simulate budget creation
    toast({
      title: "Budget Created",
      description: "Budget plan has been created successfully",
    });
    closeModal("createBudget");
  };

  const handleSaveSettings = () => {
    // Simulate settings save
    toast({
      title: "Settings Saved",
      description: "Finance module settings have been updated",
    });
    closeModal("settings");
  };

  return (
    <div className="space-y-6">
      {/* Header with Tenant Switching */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Calculator className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold">Finance Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive financial management across all business operations
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="gap-1">
              <Building2 className="h-3 w-3" />
              {currentTenant?.name}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {currentTenant?.industry.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {formatCurrency(financialMetrics.totalAssets)} Assets
            </Badge>
            <Badge variant="outline" className="text-xs">
              {formatAmount(transactions.length)} Transactions
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Label htmlFor="tenant-select" className="text-sm font-medium">
              Switch Tenant:
            </Label>
            <Select value={selectedTenantId} onValueChange={handleTenantSwitch}>
              <SelectTrigger id="tenant-select" className="w-[300px]">
                <SelectValue placeholder="Select tenant" />
              </SelectTrigger>
              <SelectContent>
                {financeTenants.map((tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{tenant.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {tenant.type}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            Finance System
          </Badge>
          <Button variant="outline" size="sm" onClick={openSettingsModal}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 text-xs"
          >
            <BarChart3 className="h-3 w-3" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="accounts"
            className="flex items-center gap-2 text-xs"
          >
            <Wallet className="h-3 w-3" />
            Accounts
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="flex items-center gap-2 text-xs"
          >
            <FileText className="h-3 w-3" />
            Transactions
          </TabsTrigger>
          <TabsTrigger
            value="invoices"
            className="flex items-center gap-2 text-xs"
          >
            <Receipt className="h-3 w-3" />
            Invoices
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="flex items-center gap-2 text-xs"
          >
            <CreditCard className="h-3 w-3" />
            Payments
          </TabsTrigger>
          <TabsTrigger
            value="budgets"
            className="flex items-center gap-2 text-xs"
          >
            <Target className="h-3 w-3" />
            Budgets
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="flex items-center gap-2 text-xs"
          >
            <PieChart className="h-3 w-3" />
            Reports
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center gap-2 text-xs"
          >
            <TrendingUp className="h-3 w-3" />
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="compliance"
            className="flex items-center gap-2 text-xs"
          >
            <Shield className="h-3 w-3" />
            Compliance
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Financial Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
              {/* Decorative color patch in top right */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-green-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-green-700">
                    Total Assets
                  </CardTitle>
                  <div className="text-3xl font-bold text-green-900">
                    ₹
                    <AnimatedCounter
                      value={
                        financialMetrics.totalAssets /
                        (currentTenant?.baseCurrency === "USD" ? 1000 : 100000)
                      }
                      suffix={currentTenant?.baseCurrency === "USD" ? "K" : "L"}
                    />
                  </div>
                  <div className="text-sm text-green-600">
                    {formatCurrency(financialMetrics.totalAssets).replace(
                      "₹",
                      "₹",
                    )}{" "}
                    total value
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
              {/* Decorative color patch in top right */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-blue-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-blue-700">
                    Net Income
                  </CardTitle>
                  <div className="text-3xl font-bold text-blue-900">
                    ₹
                    <AnimatedCounter
                      value={
                        financialMetrics.netIncome /
                        (currentTenant?.baseCurrency === "USD" ? 1000 : 100000)
                      }
                      suffix={currentTenant?.baseCurrency === "USD" ? "K" : "L"}
                    />
                  </div>
                  <div className="text-sm text-blue-600">
                    {formatCurrency(financialMetrics.netIncome).replace(
                      "₹",
                      "₹",
                    )}{" "}
                    current period
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">₹</span>
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
                    Outstanding Receivables
                  </CardTitle>
                  <div className="text-3xl font-bold text-orange-900">
                    ₹
                    <AnimatedCounter
                      value={
                        invoiceMetrics.totalOutstanding /
                        (currentTenant?.baseCurrency === "USD" ? 1000 : 100000)
                      }
                      suffix={currentTenant?.baseCurrency === "USD" ? "K" : "L"}
                    />
                  </div>
                  <div className="text-sm text-orange-600">
                    {invoiceMetrics.overdueCount} overdue invoices
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
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
                    Collection Rate
                  </CardTitle>
                  <div className="text-3xl font-bold text-purple-900">
                    <AnimatedCounter
                      value={invoiceMetrics.collectionRate}
                      suffix="%"
                    />
                  </div>
                  <div className="text-sm text-purple-600">
                    {formatCurrency(invoiceMetrics.totalPaid).replace("₹", "₹")}{" "}
                    collected
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Financial Health Dashboard */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Profit & Loss Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Summary</CardTitle>
                <CardDescription>Current period performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Revenue</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(financialMetrics.totalRevenue)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Expenses</span>
                  <span className="font-medium text-red-600">
                    {formatCurrency(financialMetrics.totalExpenses)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-medium">Net Income</span>
                  <span
                    className={`font-bold ${financialMetrics.netIncome >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {formatCurrency(financialMetrics.netIncome)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Profit Margin</span>
                  <span className="font-medium">
                    {financialMetrics.grossProfitMargin.toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Cash Flow Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Overview</CardTitle>
                <CardDescription>Liquidity and cash position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cash & Bank Balance</span>
                  <span className="font-medium text-blue-600">
                    {formatCurrency(
                      accounts
                        .filter((acc) => acc.isBankAccount || acc.isCashAccount)
                        .reduce((sum, acc) => sum + acc.currentBalance, 0),
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Ratio</span>
                  <span className="font-medium">
                    {financialMetrics.currentRatio.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Working Capital</span>
                  <span className="font-medium">
                    {formatCurrency(
                      financialMetrics.totalAssets -
                        financialMetrics.totalLiabilities,
                    )}
                  </span>
                </div>
                {analytics && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cash Conversion Cycle</span>
                    <span className="font-medium">
                      {analytics.liquidityMetrics.cashConversionCycle} days
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Budget Performance */}
            {budgetPerformance && (
              <Card>
                <CardHeader>
                  <CardTitle>Budget Performance</CardTitle>
                  <CardDescription>
                    {budgetPerformance.budgetName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Budget Progress</span>
                      <span>
                        {(
                          (budgetPerformance.totalActual /
                            budgetPerformance.totalBudget) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (budgetPerformance.totalActual /
                          budgetPerformance.totalBudget) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Budget</span>
                    <span className="font-medium">
                      {formatCurrency(budgetPerformance.totalBudget)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Actual</span>
                    <span className="font-medium">
                      {formatCurrency(budgetPerformance.totalActual)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Variance</span>
                    <span
                      className={`font-medium ${budgetPerformance.totalVariance >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(
                        Math.abs(budgetPerformance.totalVariance),
                      )}
                      {budgetPerformance.performance === "under_budget"
                        ? " under"
                        : " over"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recent Transactions & Pending Invoices */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Transactions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest financial activities</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTabChange("transactions")}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <div>
                          <p className="font-medium text-sm">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.transactionNumber} •{" "}
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">
                          {formatCurrency(transaction.totalAmount)}
                        </p>
                        <Badge
                          variant="outline"
                          className={getStatusColor(transaction.status)}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Invoices */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Pending Collections</CardTitle>
                  <CardDescription>Invoices awaiting payment</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTabChange("invoices")}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices
                    .filter((inv) => inv.paymentStatus !== "paid")
                    .slice(0, 5)
                    .map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              invoice.status === "overdue"
                                ? "bg-red-400"
                                : invoice.status === "pending"
                                  ? "bg-yellow-400"
                                  : "bg-blue-400"
                            }`}
                          />
                          <div>
                            <p className="font-medium text-sm">
                              {invoice.customerName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {invoice.invoiceNumber} • Due:{" "}
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">
                            {formatCurrency(invoice.balanceAmount)}
                          </p>
                          <Badge
                            variant="outline"
                            className={getStatusColor(invoice.status)}
                          >
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common financial operations for {currentTenant?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-4">
                <Button
                  onClick={() =>
                    setModals((prev) => ({ ...prev, createTransaction: true }))
                  }
                  className="justify-start"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Transaction
                </Button>
                <Button
                  variant="outline"
                  onClick={openCreateInvoiceModal}
                  className="justify-start"
                >
                  <Receipt className="mr-2 h-4 w-4" />
                  Create Invoice
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setModals((prev) => ({ ...prev, createAccount: true }))
                  }
                  className="justify-start"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Add Account
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleTabChange("reports")}
                  className="justify-start"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Chart of Accounts</h2>
              <p className="text-muted-foreground">
                Manage account structure for {currentTenant?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setModals((prev) => ({ ...prev, createAccount: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Account Type Summary */}
          <div className="grid gap-4 md:grid-cols-5">
            {(
              [
                "assets",
                "liabilities",
                "equity",
                "revenue",
                "expenses",
              ] as AccountType[]
            ).map((type) => {
              const typeAccounts = accounts.filter(
                (acc) => acc.accountType === type,
              );
              const totalBalance = typeAccounts.reduce(
                (sum, acc) =>
                  type === "revenue" ||
                  type === "liabilities" ||
                  type === "equity"
                    ? sum + Math.abs(acc.currentBalance)
                    : sum + acc.currentBalance,
                0,
              );

              return (
                <Card key={type}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium capitalize">
                      {type.replace("_", " ")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {formatCurrency(totalBalance)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {typeAccounts.length} accounts
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Accounts Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Accounts</CardTitle>
              <CardDescription>
                Complete chart of accounts with current balances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search accounts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Account Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="assets">Assets</SelectItem>
                      <SelectItem value="liabilities">Liabilities</SelectItem>
                      <SelectItem value="equity">Equity</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="expenses">Expenses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account Code</TableHead>
                      <TableHead>Account Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Current Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts
                      .filter(
                        (account) =>
                          !searchQuery ||
                          account.accountName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          account.accountCode.includes(searchQuery),
                      )
                      .map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-mono">
                            {account.accountCode}
                          </TableCell>
                          <TableCell>
                            <div
                              className={`${account.level > 1 ? `pl-${(account.level - 1) * 4}` : ""}`}
                            >
                              {account.accountName}
                              {account.isBankAccount && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 text-xs"
                                >
                                  Bank
                                </Badge>
                              )}
                              {account.isCashAccount && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 text-xs"
                                >
                                  Cash
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">
                            {account.accountType.replace("_", " ")}
                          </TableCell>
                          <TableCell
                            className={`font-medium ${
                              account.currentBalance >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {formatCurrency(Math.abs(account.currentBalance))}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                account.isActive ? "default" : "secondary"
                              }
                              className={
                                account.isActive
                                  ? "bg-green-100 text-green-800"
                                  : ""
                              }
                            >
                              {account.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedAccount(account);
                                    setModals((prev) => ({
                                      ...prev,
                                      editAccount: true,
                                    }));
                                  }}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Account
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Transactions
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Account Statement
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab - Full Implementation */}
        <TabsContent value="transactions" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Transaction Management</h2>
              <p className="text-muted-foreground">
                Record and manage all financial transactions for{" "}
                {currentTenant?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, createTransaction: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                New Transaction
              </Button>
            </div>
          </div>

          {/* Transaction Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="posted">Posted</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="journal_entry">Journal Entry</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="receipt">Receipt</SelectItem>
                    <SelectItem value="invoice">Invoice</SelectItem>
                    <SelectItem value="adjustment">Adjustment</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                {transactions.length} transactions found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions
                    .filter(
                      (t) =>
                        !searchQuery ||
                        t.description
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        t.transactionNumber
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()),
                    )
                    .slice(0, 10)
                    .map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono">
                          {transaction.transactionNumber}
                        </TableCell>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="capitalize">
                          {transaction.type.replace("_", " ")}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {transaction.description}
                        </TableCell>
                        <TableCell>{transaction.reference}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(transaction.totalAmount)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedTransaction(transaction);
                                  setModals((prev) => ({
                                    ...prev,
                                    viewTransaction: true,
                                  }));
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Print Voucher
                              </DropdownMenuItem>
                              {transaction.status === "draft" && (
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              )}
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

        {/* Invoices Tab - Full Implementation */}
        <TabsContent value="invoices" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Invoice Management</h2>
              <p className="text-muted-foreground">
                Create, track, and manage invoices for {currentTenant?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button onClick={openCreateInvoiceModal}>
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </div>
          </div>

          {/* Invoice Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Total Invoiced
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(invoiceMetrics.totalInvoiced)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {invoices.length} invoices
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Amount Paid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(invoiceMetrics.totalPaid)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {invoiceMetrics.collectionRate.toFixed(1)}% collection rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Outstanding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(invoiceMetrics.totalOutstanding)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Pending collection
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(invoiceMetrics.overdueAmount)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {invoiceMetrics.overdueCount} overdue invoices
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Invoices Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Invoices</CardTitle>
              <CardDescription>
                Manage all customer invoices and payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search invoices..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.slice(0, 10).map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-mono">
                          {invoice.invoiceNumber}
                        </TableCell>
                        <TableCell>{invoice.customerName}</TableCell>
                        <TableCell>
                          {new Date(invoice.issueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(invoice.totalAmount)}
                        </TableCell>
                        <TableCell className="text-green-600">
                          {formatCurrency(invoice.paidAmount)}
                        </TableCell>
                        <TableCell className="text-orange-600">
                          {formatCurrency(invoice.balanceAmount)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => openViewInvoiceModal(invoice)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Record Payment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budgets Tab - Full Implementation */}
        <TabsContent value="budgets" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Budget Management</h2>
              <p className="text-muted-foreground">
                Plan, track, and analyze budget performance for{" "}
                {currentTenant?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import Budget
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, createBudget: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Budget
              </Button>
            </div>
          </div>

          {/* Budget Performance Overview */}
          {budgetPerformance && (
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Budget vs Actual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget:</span>
                      <span className="font-medium">
                        {formatCurrency(budgetPerformance.totalBudget)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Actual:</span>
                      <span className="font-medium">
                        {formatCurrency(budgetPerformance.totalActual)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Variance:</span>
                      <span
                        className={`font-medium ${budgetPerformance.totalVariance >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {budgetPerformance.performance === "under_budget"
                          ? "+"
                          : "-"}
                        {formatCurrency(
                          Math.abs(budgetPerformance.totalVariance),
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Budget Utilization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {(
                          (budgetPerformance.totalActual /
                            budgetPerformance.totalBudget) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (budgetPerformance.totalActual /
                          budgetPerformance.totalBudget) *
                        100
                      }
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      {budgetPerformance.performance === "under_budget"
                        ? "Under budget"
                        : "Over budget"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Variance %
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <span
                      className={
                        budgetPerformance.variancePercentage >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {budgetPerformance.variancePercentage >= 0 ? "+" : ""}
                      {budgetPerformance.variancePercentage.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Variance from budget
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Budget List */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Plans</CardTitle>
              <CardDescription>
                All budget plans for {currentTenant?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Budget Name</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Total Budget</TableHead>
                    <TableHead>Actual Spent</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgets.map((budget) => (
                    <TableRow key={budget.id}>
                      <TableCell className="font-medium">
                        {budget.name}
                      </TableCell>
                      <TableCell>
                        {new Date(budget.startDate).getFullYear()} -{" "}
                        {budget.period}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(budget.totalBudget)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(budget.totalActual)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${
                            budget.totalBudget - budget.totalActual >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {formatCurrency(
                            Math.abs(budget.totalBudget - budget.totalActual),
                          )}
                          {budget.totalBudget - budget.totalActual >= 0
                            ? " under"
                            : " over"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(budget.status)}>
                          {budget.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Budget
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Variance Report
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

        {/* Reports Tab - Full Implementation */}
        <TabsContent value="reports" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Financial Reports</h2>
              <p className="text-muted-foreground">
                Generate comprehensive financial reports for{" "}
                {currentTenant?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Report Settings
              </Button>
            </div>
          </div>

          {/* Report Categories */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Financial Statements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Statements</CardTitle>
                <CardDescription>Primary financial reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Profit & Loss Statement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Balance Sheet
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Cash Flow Statement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PieChart className="mr-2 h-4 w-4" />
                  Trial Balance
                </Button>
              </CardContent>
            </Card>

            {/* Detailed Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detailed Reports</CardTitle>
                <CardDescription>
                  Account and transaction details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Wallet className="mr-2 h-4 w-4" />
                  General Ledger
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Accounts Receivable
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Accounts Payable
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  Transaction Register
                </Button>
              </CardContent>
            </Card>

            {/* Industry Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Industry Specific</CardTitle>
                <CardDescription>
                  Reports tailored for {currentTenant?.industry}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentTenant?.industry === "construction" && (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <Building2 className="mr-2 h-4 w-4" />
                      Project Profitability
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="mr-2 h-4 w-4" />
                      Job Costing Report
                    </Button>
                  </>
                )}
                {currentTenant?.industry === "real_estate" && (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <Building2 className="mr-2 h-4 w-4" />
                      Property Performance
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Receipt className="mr-2 h-4 w-4" />
                      Rental Income Report
                    </Button>
                  </>
                )}
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Budget vs Actual
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Financial Ratios
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Report Generation */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Report Generator</CardTitle>
              <CardDescription>
                Generate custom reports with specific parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <Label>Report Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profit_loss">Profit & Loss</SelectItem>
                      <SelectItem value="balance_sheet">
                        Balance Sheet
                      </SelectItem>
                      <SelectItem value="cash_flow">Cash Flow</SelectItem>
                      <SelectItem value="trial_balance">
                        Trial Balance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>From Date</Label>
                  <Input type="date" defaultValue="2024-01-01" />
                </div>
                <div>
                  <Label>To Date</Label>
                  <Input type="date" defaultValue="2024-03-31" />
                </div>
                <div className="flex items-end">
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {analytics ? (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Analytics</CardTitle>
                  <CardDescription>
                    Performance metrics and insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {analytics.profitabilityMetrics.grossProfitMargin.toFixed(
                          1,
                        )}
                        %
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Gross Profit Margin
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {analytics.liquidityMetrics.currentRatio.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Current Ratio
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {analytics.efficiencyMetrics.assetTurnover.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Asset Turnover
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {analytics.leverageMetrics.debtToEquityRatio.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Debt to Equity
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Financial Analytics</h3>
              <p className="text-muted-foreground">
                Advanced analytics and insights will appear here
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <PaymentWorkflowDashboard
            currentTab="overview"
            userType="franchisee"
            tenantId={selectedTenantId}
            onTabChange={(tab) => {
              // Navigate to dedicated payments page for detailed workflow
              window.open(`/finance/payments/${tab}`, "_blank");
            }}
          />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <TaxComplianceDashboard
            tenantId={selectedTenantId}
            tenantName={currentTenant?.name || ""}
            tenantIndustry={currentTenant?.industry || ""}
          />
        </TabsContent>
      </Tabs>

      {/* Create Account Modal */}
      <Dialog
        open={modals.createAccount}
        onOpenChange={(open) => !open && closeModal("createAccount")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Account</DialogTitle>
            <DialogDescription>
              Add a new account to the chart of accounts
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountCode">Account Code *</Label>
                <Input
                  id="accountCode"
                  placeholder="e.g., 1100"
                  value={accountForm.accountCode}
                  onChange={(e) =>
                    setAccountForm((prev) => ({
                      ...prev,
                      accountCode: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="accountName">Account Name *</Label>
                <Input
                  id="accountName"
                  placeholder="e.g., Petty Cash"
                  value={accountForm.accountName}
                  onChange={(e) =>
                    setAccountForm((prev) => ({
                      ...prev,
                      accountName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountType">Account Type *</Label>
                <Select
                  value={accountForm.accountType}
                  onValueChange={(value) =>
                    setAccountForm((prev) => ({
                      ...prev,
                      accountType: value as AccountType,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assets">Assets</SelectItem>
                    <SelectItem value="liabilities">Liabilities</SelectItem>
                    <SelectItem value="equity">Equity</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="expenses">Expenses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="parentAccount">Parent Account</Label>
                <Select
                  value={accountForm.parentAccountId}
                  onValueChange={(value) =>
                    setAccountForm((prev) => ({
                      ...prev,
                      parentAccountId: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    {accounts
                      .filter(
                        (acc) =>
                          acc.level === 1 &&
                          acc.accountType === accountForm.accountType,
                      )
                      .map((acc) => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.accountCode} - {acc.accountName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="openingBalance">Opening Balance</Label>
                <Input
                  id="openingBalance"
                  type="number"
                  placeholder="0.00"
                  value={accountForm.openingBalance}
                  onChange={(e) =>
                    setAccountForm((prev) => ({
                      ...prev,
                      openingBalance: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={accountForm.currency}
                  onValueChange={(value) =>
                    setAccountForm((prev) => ({
                      ...prev,
                      currency: value as Currency,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="allowDirectPosting"
                  checked={accountForm.allowDirectPosting}
                  onCheckedChange={(checked) =>
                    setAccountForm((prev) => ({
                      ...prev,
                      allowDirectPosting: checked,
                    }))
                  }
                />
                <Label htmlFor="allowDirectPosting">
                  Allow direct posting to this account
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isBankAccount"
                  checked={accountForm.isBankAccount}
                  onCheckedChange={(checked) =>
                    setAccountForm((prev) => ({
                      ...prev,
                      isBankAccount: checked,
                    }))
                  }
                />
                <Label htmlFor="isBankAccount">This is a bank account</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isCashAccount"
                  checked={accountForm.isCashAccount}
                  onCheckedChange={(checked) =>
                    setAccountForm((prev) => ({
                      ...prev,
                      isCashAccount: checked,
                    }))
                  }
                />
                <Label htmlFor="isCashAccount">This is a cash account</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Account description and purpose..."
                value={accountForm.description}
                onChange={(e) =>
                  setAccountForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => closeModal("createAccount")}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateAccount}
              disabled={!validateAccountForm()}
            >
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Transaction Modal */}
      <Dialog
        open={modals.createTransaction}
        onOpenChange={(open) => !open && closeModal("createTransaction")}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create Transaction</DialogTitle>
            <DialogDescription>
              Record a new financial transaction with journal entries
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="transactionDate">Date *</Label>
                <Input
                  id="transactionDate"
                  type="date"
                  value={transactionForm.date}
                  onChange={(e) =>
                    setTransactionForm((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="transactionType">Type *</Label>
                <Select
                  value={transactionForm.type}
                  onValueChange={(value) =>
                    setTransactionForm((prev) => ({
                      ...prev,
                      type: value as TransactionType,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="journal_entry">Journal Entry</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="receipt">Receipt</SelectItem>
                    <SelectItem value="adjustment">Adjustment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reference">Reference</Label>
                <Input
                  id="reference"
                  placeholder="Check #, Invoice #, etc."
                  value={transactionForm.reference}
                  onChange={(e) =>
                    setTransactionForm((prev) => ({
                      ...prev,
                      reference: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="transactionDescription">Description *</Label>
              <Textarea
                id="transactionDescription"
                placeholder="Describe the transaction..."
                value={transactionForm.description}
                onChange={(e) =>
                  setTransactionForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            {/* Journal Entries */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Journal Entries *</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setTransactionForm((prev) => ({
                      ...prev,
                      journalEntries: [
                        ...prev.journalEntries,
                        {
                          accountId: "",
                          debitAmount: 0,
                          creditAmount: 0,
                          description: "",
                        },
                      ],
                    }))
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Line
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account *</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Debit</TableHead>
                      <TableHead>Credit</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionForm.journalEntries.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Select
                            value={entry.accountId}
                            onValueChange={(value) => {
                              const newEntries = [
                                ...transactionForm.journalEntries,
                              ];
                              newEntries[index] = {
                                ...newEntries[index],
                                accountId: value,
                              };
                              setTransactionForm((prev) => ({
                                ...prev,
                                journalEntries: newEntries,
                              }));
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts
                                .filter((acc) => acc.allowDirectPosting)
                                .map((account) => (
                                  <SelectItem
                                    key={account.id}
                                    value={account.id}
                                  >
                                    {account.accountCode} -{" "}
                                    {account.accountName}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Line description"
                            value={entry.description}
                            onChange={(e) => {
                              const newEntries = [
                                ...transactionForm.journalEntries,
                              ];
                              newEntries[index] = {
                                ...newEntries[index],
                                description: e.target.value,
                              };
                              setTransactionForm((prev) => ({
                                ...prev,
                                journalEntries: newEntries,
                              }));
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={entry.debitAmount || ""}
                            onChange={(e) => {
                              const newEntries = [
                                ...transactionForm.journalEntries,
                              ];
                              newEntries[index] = {
                                ...newEntries[index],
                                debitAmount: parseFloat(e.target.value) || 0,
                                creditAmount: 0,
                              };
                              setTransactionForm((prev) => ({
                                ...prev,
                                journalEntries: newEntries,
                              }));
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={entry.creditAmount || ""}
                            onChange={(e) => {
                              const newEntries = [
                                ...transactionForm.journalEntries,
                              ];
                              newEntries[index] = {
                                ...newEntries[index],
                                creditAmount: parseFloat(e.target.value) || 0,
                                debitAmount: 0,
                              };
                              setTransactionForm((prev) => ({
                                ...prev,
                                journalEntries: newEntries,
                              }));
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {transactionForm.journalEntries.length > 2 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newEntries =
                                  transactionForm.journalEntries.filter(
                                    (_, i) => i !== index,
                                  );
                                setTransactionForm((prev) => ({
                                  ...prev,
                                  journalEntries: newEntries,
                                }));
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {(() => {
                const totalDebits = transactionForm.journalEntries.reduce(
                  (sum, entry) => sum + (entry.debitAmount || 0),
                  0,
                );
                const totalCredits = transactionForm.journalEntries.reduce(
                  (sum, entry) => sum + (entry.creditAmount || 0),
                  0,
                );
                const isBalanced =
                  totalDebits === totalCredits && totalDebits > 0;

                return (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Total Debits:</span>
                        <span className="ml-2">
                          {formatCurrency(totalDebits)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Total Credits:</span>
                        <span className="ml-2">
                          {formatCurrency(totalCredits)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Balance:</span>
                        <span
                          className={`ml-2 ${isBalanced ? "text-green-600" : "text-red-600"}`}
                        >
                          {isBalanced
                            ? "Balanced"
                            : `Out of balance: ${formatCurrency(Math.abs(totalDebits - totalCredits))}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => closeModal("createTransaction")}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTransaction}
              disabled={!validateTransactionForm()}
            >
              Create Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Invoice Modal */}
      <Dialog
        open={modals.createInvoice}
        onOpenChange={(open) => !open && closeModal("createInvoice")}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Create Invoice</DialogTitle>
            <DialogDescription>Create a new customer invoice</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 overflow-y-auto flex-1 pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  placeholder="Enter customer name"
                  value={invoiceForm.customerName}
                  onChange={(e) =>
                    setInvoiceForm((prev) => ({
                      ...prev,
                      customerName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="customerEmail">Customer Email *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  placeholder="customer@example.com"
                  value={invoiceForm.customerEmail}
                  onChange={(e) =>
                    setInvoiceForm((prev) => ({
                      ...prev,
                      customerEmail: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="invoiceDate">Invoice Date *</Label>
                <Input
                  id="invoiceDate"
                  type="date"
                  value={invoiceForm.invoiceDate}
                  onChange={(e) =>
                    setInvoiceForm((prev) => ({
                      ...prev,
                      invoiceDate: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoiceForm.dueDate}
                  onChange={(e) =>
                    setInvoiceForm((prev) => ({
                      ...prev,
                      dueDate: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  placeholder="Auto-generated"
                  disabled
                />
              </div>
            </div>

            {/* Invoice Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Invoice Items *</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setInvoiceForm((prev) => ({
                      ...prev,
                      items: [
                        ...prev.items,
                        { description: "", quantity: 1, rate: 0, amount: 0 },
                      ],
                    }))
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description *</TableHead>
                        <TableHead>Quantity *</TableHead>
                        <TableHead>Rate *</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoiceForm.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              placeholder="Item description"
                              value={item.description}
                              onChange={(e) => {
                                const newItems = [...invoiceForm.items];
                                newItems[index] = {
                                  ...newItems[index],
                                  description: e.target.value,
                                };
                                setInvoiceForm((prev) => ({
                                  ...prev,
                                  items: newItems,
                                }));
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              placeholder="1"
                              value={item.quantity}
                              onChange={(e) => {
                                const quantity =
                                  parseFloat(e.target.value) || 0;
                                const newItems = [...invoiceForm.items];
                                newItems[index] = {
                                  ...newItems[index],
                                  quantity,
                                  amount: quantity * newItems[index].rate,
                                };
                                setInvoiceForm((prev) => ({
                                  ...prev,
                                  items: newItems,
                                }));
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={item.rate}
                              onChange={(e) => {
                                const rate = parseFloat(e.target.value) || 0;
                                const newItems = [...invoiceForm.items];
                                newItems[index] = {
                                  ...newItems[index],
                                  rate,
                                  amount: newItems[index].quantity * rate,
                                };
                                setInvoiceForm((prev) => ({
                                  ...prev,
                                  items: newItems,
                                }));
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">
                              {formatCurrency(item.amount)}
                            </span>
                          </TableCell>
                          <TableCell>
                            {invoiceForm.items.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newItems = invoiceForm.items.filter(
                                    (_, i) => i !== index,
                                  );
                                  setInvoiceForm((prev) => ({
                                    ...prev,
                                    items: newItems,
                                  }));
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            {/* Invoice Totals */}
            {(() => {
              const subtotal = invoiceForm.items.reduce(
                (sum, item) => sum + item.amount,
                0,
              );
              const taxAmount = (subtotal * invoiceForm.taxRate) / 100;
              const total = subtotal + taxAmount;

              return (
                <div className="border-t pt-4 mt-4">
                  <div className="max-w-sm ml-auto space-y-2 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax ({invoiceForm.taxRate}%):</span>
                      <span>{formatCurrency(taxAmount)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div>
              <Label htmlFor="invoiceNotes">Notes</Label>
              <Textarea
                id="invoiceNotes"
                placeholder="Additional notes or terms..."
                value={invoiceForm.notes}
                onChange={(e) =>
                  setInvoiceForm((prev) => ({ ...prev, notes: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter className="flex-shrink-0 border-t pt-4 mt-4">
            <Button
              variant="outline"
              onClick={() => closeModal("createInvoice")}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              disabled={!invoiceForm.customerName || !invoiceForm.customerEmail}
            >
              Save as Draft
            </Button>
            <Button
              onClick={handleCreateInvoice}
              disabled={!validateInvoiceForm()}
            >
              Create & Send Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Budget Modal */}
      <Dialog
        open={modals.createBudget}
        onOpenChange={(open) => !open && closeModal("createBudget")}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Budget</DialogTitle>
            <DialogDescription>
              Create a new budget plan for financial planning
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budgetName">Budget Name *</Label>
                <Input
                  id="budgetName"
                  placeholder="e.g., Annual Budget 2024"
                  value={budgetForm.name}
                  onChange={(e) =>
                    setBudgetForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="budgetPeriod">Budget Period *</Label>
                <Select
                  value={budgetForm.period}
                  onValueChange={(value) =>
                    setBudgetForm((prev) => ({
                      ...prev,
                      period: value as "monthly" | "quarterly" | "annual",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={budgetForm.startDate}
                  onChange={(e) =>
                    setBudgetForm((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={budgetForm.endDate}
                  onChange={(e) =>
                    setBudgetForm((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Budget Categories */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Budget Categories *</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setBudgetForm((prev) => ({
                      ...prev,
                      categories: [
                        ...prev.categories,
                        {
                          accountId: "",
                          categoryName: "",
                          budgetedAmount: 0,
                          notes: "",
                        },
                      ],
                    }))
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account *</TableHead>
                    <TableHead>Category *</TableHead>
                    <TableHead>Budgeted Amount *</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetForm.categories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select
                          value={category.accountId}
                          onValueChange={(value) => {
                            const newCategories = [...budgetForm.categories];
                            newCategories[index] = {
                              ...newCategories[index],
                              accountId: value,
                            };
                            setBudgetForm((prev) => ({
                              ...prev,
                              categories: newCategories,
                            }));
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts
                              .filter(
                                (acc) =>
                                  acc.accountType === "expenses" ||
                                  acc.accountType === "revenue",
                              )
                              .map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.accountCode} - {account.accountName}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Category name"
                          value={category.categoryName}
                          onChange={(e) => {
                            const newCategories = [...budgetForm.categories];
                            newCategories[index] = {
                              ...newCategories[index],
                              categoryName: e.target.value,
                            };
                            setBudgetForm((prev) => ({
                              ...prev,
                              categories: newCategories,
                            }));
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={category.budgetedAmount}
                          onChange={(e) => {
                            const newCategories = [...budgetForm.categories];
                            newCategories[index] = {
                              ...newCategories[index],
                              budgetedAmount: parseFloat(e.target.value) || 0,
                            };
                            setBudgetForm((prev) => ({
                              ...prev,
                              categories: newCategories,
                            }));
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Notes"
                          value={category.notes}
                          onChange={(e) => {
                            const newCategories = [...budgetForm.categories];
                            newCategories[index] = {
                              ...newCategories[index],
                              notes: e.target.value,
                            };
                            setBudgetForm((prev) => ({
                              ...prev,
                              categories: newCategories,
                            }));
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {budgetForm.categories.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newCategories =
                                budgetForm.categories.filter(
                                  (_, i) => i !== index,
                                );
                              setBudgetForm((prev) => ({
                                ...prev,
                                categories: newCategories,
                              }));
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <Label htmlFor="budgetDescription">Description</Label>
              <Textarea
                id="budgetDescription"
                placeholder="Budget description and objectives..."
                value={budgetForm.description}
                onChange={(e) =>
                  setBudgetForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => closeModal("createBudget")}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              disabled={!budgetForm.name || !budgetForm.startDate}
            >
              Save as Draft
            </Button>
            <Button
              onClick={handleCreateBudget}
              disabled={!validateBudgetForm()}
            >
              Create Budget
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Transaction Modal */}
      <Dialog
        open={modals.viewTransaction}
        onOpenChange={(open) => !open && closeModal("viewTransaction")}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              {selectedTransaction?.transactionNumber}
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <p className="text-sm">
                    {new Date(selectedTransaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label>Type</Label>
                  <p className="text-sm capitalize">
                    {selectedTransaction.type.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <Label>Reference</Label>
                  <p className="text-sm">{selectedTransaction.reference}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedTransaction.status)}>
                    {selectedTransaction.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <p className="text-sm mt-1">
                  {selectedTransaction.description}
                </p>
              </div>
              <div>
                <Label>Journal Entries</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Debit</TableHead>
                      <TableHead>Credit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTransaction.journalEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {entry.accountCode}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {entry.accountName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{entry.description}</TableCell>
                        <TableCell>
                          {entry.debitAmount > 0 &&
                            formatCurrency(entry.debitAmount)}
                        </TableCell>
                        <TableCell>
                          {entry.creditAmount > 0 &&
                            formatCurrency(entry.creditAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => closeModal("viewTransaction")}
            >
              Close
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Print Voucher
            </Button>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Invoice Modal */}
      <Dialog
        open={modals.viewInvoice}
        onOpenChange={(open) => !open && closeModal("viewInvoice")}
      >
        <DialogContent className="max-w-4xl w-[95vw] max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              {selectedInvoice?.invoiceNumber}
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div
              className="space-y-6 overflow-y-auto"
              style={{ maxHeight: "calc(85vh - 200px)" }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Invoice Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Invoice Number:</span>
                      <span className="font-medium">
                        {selectedInvoice.invoiceNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Issue Date:</span>
                      <span>
                        {new Date(
                          selectedInvoice.issueDate,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Date:</span>
                      <span>
                        {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedInvoice.status)}>
                        {selectedInvoice.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="font-medium">
                        {selectedInvoice.customerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span>{selectedInvoice.customerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span>{selectedInvoice.customerPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Invoice Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.lineItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                        <TableCell>
                          {formatCurrency(item.totalAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="border-t pt-4">
                <div className="max-w-sm ml-auto space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>
                      {formatCurrency(selectedInvoice.subtotalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({selectedInvoice.taxPercentage}%):</span>
                    <span>{formatCurrency(selectedInvoice.taxAmount)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatCurrency(selectedInvoice.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Paid:</span>
                    <span className="text-green-600">
                      {formatCurrency(selectedInvoice.paidAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Balance Due:</span>
                    <span className="text-orange-600">
                      {formatCurrency(selectedInvoice.balanceAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => closeModal("viewInvoice")}>
              Close
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Finance Settings Modal */}
      <Dialog
        open={modals.settings}
        onOpenChange={(open) => !open && closeModal("settings")}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Finance Settings</DialogTitle>
            <DialogDescription>
              Configure finance module settings for {currentTenant?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="baseCurrency">Base Currency</Label>
                <Select
                  value={settingsForm.baseCurrency}
                  onValueChange={(value) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      baseCurrency: value as Currency,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fiscalYearStart">Fiscal Year Start</Label>
                <Select
                  value={settingsForm.fiscalYearStart}
                  onValueChange={(value) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      fiscalYearStart: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="april">April</SelectItem>
                    <SelectItem value="july">July</SelectItem>
                    <SelectItem value="october">October</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Invoice Settings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoicePrefix">Invoice Number Prefix</Label>
                  <Input
                    id="invoicePrefix"
                    value={settingsForm.invoicePrefix}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({
                        ...prev,
                        invoicePrefix: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="paymentTerms">
                    Default Payment Terms (Days)
                  </Label>
                  <Input
                    id="paymentTerms"
                    type="number"
                    value={settingsForm.paymentTerms}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({
                        ...prev,
                        paymentTerms: parseInt(e.target.value) || 30,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Tax Settings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
                  <Input
                    id="defaultTaxRate"
                    type="number"
                    value={settingsForm.defaultTaxRate}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({
                        ...prev,
                        defaultTaxRate: parseFloat(e.target.value) || 18,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="taxIdentification">
                    Tax Identification Number
                  </Label>
                  <Input
                    id="taxIdentification"
                    placeholder="GST/VAT Number"
                    value={settingsForm.taxIdentification}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({
                        ...prev,
                        taxIdentification: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Workflow Settings</h4>
              <div className="flex items-center space-x-2">
                <Switch
                  id="requireApproval"
                  checked={settingsForm.requireApproval}
                  onCheckedChange={(checked) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      requireApproval: checked,
                    }))
                  }
                />
                <Label htmlFor="requireApproval">
                  Require approval for transactions above threshold
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="autoNumbering"
                  checked={settingsForm.autoNumbering}
                  onCheckedChange={(checked) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      autoNumbering: checked,
                    }))
                  }
                />
                <Label htmlFor="autoNumbering">
                  Enable auto-numbering for transactions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="multiCurrency"
                  checked={settingsForm.multiCurrency}
                  onCheckedChange={(checked) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      multiCurrency: checked,
                    }))
                  }
                />
                <Label htmlFor="multiCurrency">
                  Enable multi-currency support
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="approvalThreshold">
                Approval Threshold Amount
              </Label>
              <Input
                id="approvalThreshold"
                type="number"
                value={settingsForm.approvalThreshold}
                onChange={(e) =>
                  setSettingsForm((prev) => ({
                    ...prev,
                    approvalThreshold: parseFloat(e.target.value) || 100000,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => closeModal("settings")}>
              Cancel
            </Button>
            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
