import React, { useState, useEffect } from "react";
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
import { Textarea } from "../ui/textarea";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "../ui/animated-icons";
import {
  ShoppingCart,
  PackageCheck,
  FileText,
  HelpCircle,
  Gift,
  Award,
  TrendingUp,
  TrendingDown,
  Bell,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Menu,
  X,
  ChevronRight,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Target,
  DollarSign,
  Package,
  Users,
  Zap,
  Camera,
  Upload,
  Download,
  Share2,
  Heart,
  Star,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import { useLogger } from "../../hooks/useLogger";
import { useAuditLogger } from "../../hooks/useAuditLogger";
import {
  FranchiseeSelfServiceDashboard,
  QuickAction,
  PerformanceKPI,
  SupportTicket,
  SelfServiceNotification,
  PendingTask,
  MobileLayout,
} from "./self-service-types";
import {
  mockSelfServiceDashboard,
  formatCurrency,
  formatNumber,
  getKPIColor,
  getNotificationIcon,
  getTicketPriorityColor,
  getTicketStatusColor,
} from "./self-service-data";
import { GRNManagementComponent } from "./GRNManagementComponent";
import { SchemesManagementComponent } from "./SchemesManagementComponent";
import { LoyaltyManagementComponent } from "./LoyaltyManagementComponent";
import { InventoryManagementComponent } from "./InventoryManagementComponent";

interface FranchiseeSelfServicePortalProps {
  franchiseeId: string;
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function FranchiseeSelfServicePortal({
  franchiseeId,
  currentTab = "dashboard",
  onTabChange,
}: FranchiseeSelfServicePortalProps) {
  const { logUserAction } = useLogger();
  const { logAudit } = useAuditLogger("franchisee_portal");

  const [activeTab, setActiveTab] = useState(currentTab);
  const [dashboardData, setDashboardData] =
    useState<FranchiseeSelfServiceDashboard>(mockSelfServiceDashboard);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null,
  );
  const [selectedNotification, setSelectedNotification] =
    useState<SelfServiceNotification | null>(null);
  const [mobileLayout, setMobileLayout] = useState<MobileLayout>({
    isCompact: false,
    showSidebar: false,
    cardLayout: "grid",
    quickActionsCollapsed: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [showCreatePOModal, setShowCreatePOModal] = useState(false);
  const [loyaltyInitialTab, setLoyaltyInitialTab] = useState("overview");

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setMobileLayout((prev) => ({
        ...prev,
        isCompact: isMobile,
        cardLayout: isMobile ? "list" : "grid",
      }));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sync tab changes
  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);

    // Reset loyalty tab to overview when switching away and back to loyalty
    if (newTab !== "loyalty") {
      setLoyaltyInitialTab("overview");
    }

    logUserAction("switch_tab", "FranchiseeSelfServicePortal", { tab: newTab });
  };

  const handleQuickAction = (action: QuickAction) => {
    logAudit({
      action: `quick_action.${action.action}`,
      resource: `action/${action.id}`,
      resourceType: "user_action",
      description: `Franchisee used quick action: ${action.title}`,
    });

    // Route to appropriate action
    switch (action.action) {
      case "create_po":
        handleCreatePO();
        break;
      case "submit_grn":
        setActiveTab("grn");
        break;
      case "view_invoices":
        setActiveTab("invoices");
        break;
      case "raise_ticket":
        handleCreateTicket();
        break;
      case "view_schemes":
        setActiveTab("schemes");
        break;
      case "view_inventory":
        setActiveTab("inventory");
        break;
      case "check_loyalty":
        setLoyaltyInitialTab("redeem");
        setActiveTab("loyalty");
        break;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    logUserAction("refresh_dashboard", "FranchiseeSelfServicePortal");

    // Simulate data refresh
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsRefreshing(false);
  };

  const handleCreatePO = () => {
    logAudit({
      action: "create_po.initiated",
      resource: "po/new",
      resourceType: "purchase_order",
      description: "Franchisee initiated PO creation process",
    });
    setShowCreatePOModal(true);
  };

  const handleCreateTicket = () => {
    logAudit({
      action: "support_ticket.initiated",
      resource: "ticket/new",
      resourceType: "support_ticket",
      description: "Franchisee initiated ticket creation process",
    });
    setShowCreateTicketModal(true);
  };

  const handleExportInvoices = () => {
    logAudit({
      action: "invoices.export",
      resource: "invoices/export",
      resourceType: "invoice",
      description: "Franchisee exported invoice data",
    });
    // Simulate export functionality
    const csvData = [
      ["Invoice ID", "Supplier", "Amount", "Status", "Date", "Due Date"],
      [
        "INV-2024-5671",
        "Jindal Steel",
        "45000",
        "paid",
        "2024-01-15",
        "2024-01-30",
      ],
      [
        "INV-2024-5670",
        "Asian Paints",
        "32500",
        "pending",
        "2024-01-14",
        "2024-01-29",
      ],
      [
        "INV-2024-5669",
        "ACC Cement",
        "78900",
        "overdue",
        "2024-01-10",
        "2024-01-25",
      ],
      [
        "INV-2024-5668",
        "Tata Steel",
        "56700",
        "pending",
        "2024-01-12",
        "2024-01-27",
      ],
    ];

    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoices-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleViewAllInvoices = () => {
    logAudit({
      action: "invoices.view_all",
      resource: "invoices/all",
      resourceType: "invoice",
      description: "Franchisee viewed all invoices",
    });
    // This could navigate to a dedicated invoices page or show a modal with more invoices
    alert("Redirecting to full invoices view...");
  };

  const handleViewInvoice = (invoiceId: string) => {
    logAudit({
      action: "invoices.view_detail",
      resource: `invoice/${invoiceId}`,
      resourceType: "invoice",
      description: `Franchisee viewed invoice ${invoiceId}`,
    });
    // This would typically open a detailed invoice view
    alert(`Opening invoice ${invoiceId} details...`);
  };

  const handleViewTask = (taskId: string) => {
    logAudit({
      action: "task.view_detail",
      resource: `task/${taskId}`,
      resourceType: "task",
      description: `Franchisee viewed task ${taskId}`,
    });
    // Find the task and navigate to appropriate tab or show details
    const task = dashboardData.pendingTasks.find((t) => t.id === taskId);
    if (task) {
      // Navigate to appropriate tab based on task type
      if (
        task.title.toLowerCase().includes("stock") ||
        task.title.toLowerCase().includes("inventory") ||
        task.type === "inventory_alert"
      ) {
        setActiveTab("inventory");
      } else if (task.title.toLowerCase().includes("grn")) {
        setActiveTab("grn");
      } else if (
        task.title.toLowerCase().includes("order") ||
        task.title.toLowerCase().includes("po")
      ) {
        setActiveTab("orders");
      } else if (
        task.title.toLowerCase().includes("invoice") ||
        task.title.toLowerCase().includes("payment")
      ) {
        setActiveTab("invoices");
      } else {
        alert(`Task: ${task.title}\n${task.description}`);
      }
    }
  };

  const handleViewPO = (poId: string) => {
    logAudit({
      action: "purchase_order.view_detail",
      resource: `po/${poId}`,
      resourceType: "purchase_order",
      description: `Franchisee viewed purchase order ${poId}`,
    });
    // This would typically open a detailed PO view
    alert(`Opening purchase order ${poId} details...`);
  };

  const getQuickActionIcon = (iconName: string) => {
    const icons = {
      ShoppingCart,
      PackageCheck,
      FileText,
      HelpCircle,
      Gift,
      Award,
      Package,
    };
    return icons[iconName as keyof typeof icons] || ShoppingCart;
  };

  const getKPIIcon = (category: string) => {
    switch (category) {
      case "financial":
        return DollarSign;
      case "operational":
        return Package;
      case "customer":
        return Users;
      case "inventory":
        return PackageCheck;
      default:
        return Target;
    }
  };

  const getTrendIcon = (trend: string, value: number) => {
    if (trend === "up")
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === "down")
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <div className="h-4 w-4" />;
  };

  const unreadNotifications = dashboardData.notifications.filter(
    (n) => !n.isRead,
  ).length;
  const urgentTasks = dashboardData.pendingTasks.filter(
    (t) => t.priority === "urgent",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {mobileLayout.isCompact && (
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <div>
            <h1 className="font-semibold text-lg">BuildPro Portal</h1>
            <p className="text-sm text-muted-foreground">
              {dashboardData.franchiseeName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="hover-lift"
            >
              <AnimatedIcon
                icon={RefreshCw}
                animation={isRefreshing ? "spin" : "bounce"}
                size="sm"
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="relative hover-lift"
              onClick={() => setActiveTab("notifications")}
            >
              <AnimatedIcon icon={Bell} animation="bounce" size="sm" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white font-bold flex items-center justify-center">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="container mx-auto p-6 space-y-6">
        {/* Desktop Header */}
        {!mobileLayout.isCompact && (
          <div className="flex items-center justify-between animate-slideInDown">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold gradient-text">
                  Franchisee Self-Service Portal
                </h1>
                <GlowingOrb className="animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={User}
                  animation="float"
                  className="text-primary"
                />
                <p className="text-muted-foreground">
                  Welcome back, {dashboardData.franchiseeName} (
                  {dashboardData.territoryCode})
                </p>
              </div>
            </div>
            <div className="flex gap-2 animate-slideInRight">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hover-lift"
              >
                <AnimatedIcon
                  icon={RefreshCw}
                  animation={isRefreshing ? "spin" : "bounce"}
                  className="mr-2"
                />
                Refresh
              </Button>
              <Button
                variant="outline"
                className="relative hover-lift animate-gradient bg-gradient-to-r from-primary/10 to-construction-500/10"
                onClick={() => setActiveTab("notifications")}
              >
                <AnimatedIcon icon={Bell} animation="bounce" className="mr-2" />
                Notifications
                {unreadNotifications > 0 && (
                  <Badge className="ml-2 h-5 w-5 p-0 text-xs bg-red-500 text-white font-bold flex items-center justify-center">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Main Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          <TabsList
            className={`grid w-full ${mobileLayout.isCompact ? "grid-cols-4" : "grid-cols-8"}`}
          >
            <TabsTrigger value="dashboard">
              {mobileLayout.isCompact ? "Home" : "Dashboard"}
            </TabsTrigger>
            {mobileLayout.isCompact ? (
              <>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="grn">GRN</TabsTrigger>
                <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="support">
                  Support
                  {urgentTasks > 0 && (
                    <Badge className="ml-1 h-4 w-4 p-0 text-xs">
                      {urgentTasks}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="grn">GRN</TabsTrigger>
                <TabsTrigger value="schemes">Schemes</TabsTrigger>
                <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Actions */}
            <Card className="hover-lift animate-fadeInUp">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Zap}
                      animation="float"
                      className="text-primary"
                    />
                    <CardTitle>Quick Actions</CardTitle>
                  </div>
                  <Badge variant="outline" className="animate-pulse">
                    <AnimatedCounter
                      value={dashboardData.quickActions.length}
                    />{" "}
                    actions
                  </Badge>
                </div>
                <CardDescription>
                  Frequently used actions for faster workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`grid gap-4 ${mobileLayout.isCompact ? "grid-cols-2" : "grid-cols-3 lg:grid-cols-6"}`}
                >
                  {dashboardData.quickActions.map((action, index) => (
                    <Button
                      key={action.id}
                      variant="outline"
                      className="h-auto p-4 flex-col gap-2 relative hover-lift animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => handleQuickAction(action)}
                      disabled={!action.enabled}
                    >
                      <div className="p-2 bg-gradient-to-br from-primary/20 to-construction-500/20 rounded-lg">
                        <AnimatedIcon
                          icon={getQuickActionIcon(action.icon)}
                          animation="float"
                          className="text-primary"
                          size="sm"
                        />
                      </div>
                      <span
                        className={`text-center ${mobileLayout.isCompact ? "text-xs" : "text-sm"}`}
                      >
                        {action.title}
                      </span>
                      {action.badge && (
                        <Badge
                          className={`absolute -top-2 -right-2 h-5 w-5 p-0 text-xs text-white font-bold flex items-center justify-center
                            ${
                              action.badge.color === "red"
                                ? "bg-red-500"
                                : action.badge.color === "blue"
                                  ? "bg-blue-500"
                                  : action.badge.color === "green"
                                    ? "bg-green-500"
                                    : action.badge.color === "yellow"
                                      ? "bg-yellow-600 text-white"
                                      : "bg-purple-500"
                            }`}
                        >
                          {action.badge.count > 99 ? "99+" : action.badge.count}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance KPIs - Purchase Order Style */}
            <div className="grid gap-6 md:grid-cols-4">
              {dashboardData.performanceKPIs.map((kpi, index) => {
                const colorSchemes = [
                  {
                    bg: "bg-blue-50",
                    border: "border-blue-100",
                    text: "text-blue-700",
                    accent: "bg-blue-500",
                    patch: "bg-blue-200/40",
                  },
                  {
                    bg: "bg-orange-50",
                    border: "border-orange-100",
                    text: "text-orange-700",
                    accent: "bg-orange-500",
                    patch: "bg-orange-200/40",
                  },
                  {
                    bg: "bg-green-50",
                    border: "border-green-100",
                    text: "text-green-700",
                    accent: "bg-green-500",
                    patch: "bg-green-200/40",
                  },
                  {
                    bg: "bg-purple-50",
                    border: "border-purple-100",
                    text: "text-purple-700",
                    accent: "bg-purple-500",
                    patch: "bg-purple-200/40",
                  },
                ];
                const scheme = colorSchemes[index % 4];

                return (
                  <Card
                    key={kpi.id}
                    className={`${scheme.bg} ${scheme.border} rounded-2xl p-6 relative overflow-hidden hover-lift animate-fadeInUp`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Decorative color patch in top right */}
                    <div
                      className={`absolute top-0 right-0 w-12 h-12 ${scheme.patch} rounded-bl-[24px]`}
                    ></div>
                    <div className="flex flex-row items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle
                          className={`text-sm font-medium ${scheme.text}`}
                        >
                          {kpi.title}
                        </CardTitle>
                        <div
                          className={`text-3xl font-bold ${scheme.text.replace("700", "900")}`}
                        >
                          <AnimatedCounter value={kpi.value} />
                          <span className="text-sm font-normal text-muted-foreground ml-1">
                            {kpi.unit}
                          </span>
                        </div>
                        <div
                          className={`text-sm ${scheme.text.replace("700", "600")} flex items-center gap-1`}
                        >
                          {getTrendIcon(kpi.trend, kpi.trendValue)}
                          {kpi.trend === "up"
                            ? "+"
                            : kpi.trend === "down"
                              ? "-"
                              : ""}
                          {kpi.trendValue}% vs last month
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4 relative z-10">
                        <div
                          className={`w-12 h-12 ${scheme.accent} rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          {kpi.category === "financial" ? (
                            <span className="text-white text-xl font-bold">
                              ₹
                            </span>
                          ) : (
                            <AnimatedIcon
                              icon={getKPIIcon(kpi.category)}
                              animation="float"
                              className="h-6 w-6 text-white"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    {kpi.target && (
                      <div className="mt-3 relative z-10">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Target</span>
                          <span>
                            {kpi.target}
                            {kpi.unit}
                          </span>
                        </div>
                        <Progress
                          value={(kpi.value / kpi.target) * 100}
                          className="h-2"
                        />
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            {/* Financial Summary & Pending Tasks */}
            <div
              className={`grid gap-6 ${mobileLayout.isCompact ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}
            >
              {/* Financial Summary */}
              <Card className="hover-lift animate-fadeInUp">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-xl font-bold">₹</span>
                    <CardTitle>Financial Summary</CardTitle>
                  </div>
                  <CardDescription>Current month overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Revenue
                      </div>
                      <div className="text-lg font-semibold text-green-600">
                        {formatCurrency(
                          dashboardData.financialSummary.currentMonth.revenue,
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Purchases
                      </div>
                      <div className="text-lg font-semibold">
                        {formatCurrency(
                          dashboardData.financialSummary.currentMonth.purchases,
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Pending
                      </div>
                      <div className="text-lg font-semibold text-yellow-600">
                        {formatCurrency(
                          dashboardData.financialSummary.currentMonth
                            .pendingPayments,
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Overdue
                      </div>
                      <div className="text-lg font-semibold text-red-600">
                        {formatCurrency(
                          dashboardData.financialSummary.currentMonth
                            .overduePayments,
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="text-sm font-medium mb-2">
                      Loyalty Points
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Available:{" "}
                        </span>
                        <span className="font-medium text-purple-600">
                          {formatNumber(
                            dashboardData.financialSummary.loyaltyPoints
                              .available,
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Expiring:{" "}
                        </span>
                        <span className="font-medium text-orange-600">
                          {formatNumber(
                            dashboardData.financialSummary.loyaltyPoints
                              .expiringThisMonth,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Tasks */}
              <Card className="hover-lift animate-fadeInUp">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Clock}
                        animation="float"
                        className="text-primary"
                      />
                      <CardTitle>Pending Tasks</CardTitle>
                      {urgentTasks > 0 && (
                        <Badge
                          variant="destructive"
                          className="text-white font-bold"
                        >
                          {urgentTasks} urgent
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline" className="animate-pulse">
                      <AnimatedCounter
                        value={dashboardData.pendingTasks.length}
                      />{" "}
                      tasks
                    </Badge>
                  </div>
                  <CardDescription>
                    Action items requiring attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.pendingTasks
                      .slice(0, 5)
                      .map((task, index) => (
                        <div
                          key={task.id}
                          className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors animate-fadeInUp"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              task.priority === "urgent"
                                ? "bg-red-500"
                                : task.priority === "high"
                                  ? "bg-orange-500"
                                  : task.priority === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">
                              {task.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {task.description}
                            </div>
                            {task.dueDate && (
                              <div className="text-xs text-orange-600 mt-1">
                                Due:{" "}
                                {format(new Date(task.dueDate), "MMM dd, yyyy")}
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                            onClick={() => handleViewTask(task.id)}
                          >
                            <AnimatedIcon icon={ChevronRight} size="sm" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card className="hover-lift animate-fadeInUp">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Activity}
                      animation="float"
                      className="text-primary"
                    />
                    <CardTitle>Recent Activities</CardTitle>
                  </div>
                  <Badge variant="outline" className="animate-pulse">
                    <AnimatedCounter
                      value={dashboardData.recentActivities.length}
                    />{" "}
                    activities
                  </Badge>
                </div>
                <CardDescription>Latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.recentActivities.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.status === "completed"
                            ? "bg-green-100"
                            : activity.status === "pending"
                              ? "bg-yellow-100"
                              : "bg-red-100"
                        }`}
                      >
                        {activity.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : activity.status === "pending" ? (
                          <Clock className="h-4 w-4 text-yellow-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">
                          {activity.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activity.description}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {format(
                            new Date(activity.timestamp),
                            "MMM dd, yyyy 'at' HH:mm",
                          )}
                        </div>
                      </div>
                      <Badge
                        variant={
                          activity.status === "completed"
                            ? "default"
                            : activity.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Support Center</h2>
                <p className="text-muted-foreground">
                  Get help and track your tickets
                </p>
              </div>
              <Button
                onClick={handleCreateTicket}
                className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
              >
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                New Ticket
                <ShimmerEffect className="absolute inset-0" />
              </Button>
            </div>

            {/* Support Tickets */}
            <Card>
              <CardHeader>
                <CardTitle>Your Support Tickets</CardTitle>
                <CardDescription>
                  Track status of your help requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.supportTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{ticket.title}</span>
                          <Badge
                            className={getTicketPriorityColor(ticket.priority)}
                          >
                            {ticket.priority}
                          </Badge>
                          <Badge
                            className={getTicketStatusColor(ticket.status)}
                          >
                            {ticket.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {ticket.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>#{ticket.ticketNumber}</span>
                          <span>
                            {format(new Date(ticket.createdAt), "MMM dd, yyyy")}
                          </span>
                          {ticket.assignedTo && (
                            <span>Assigned to {ticket.assignedTo}</span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Purchase Orders</h2>
                <p className="text-muted-foreground">
                  Create and manage your purchase orders
                </p>
              </div>
              <Button
                onClick={() => handleCreatePO()}
                className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
              >
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                Create New PO
                <ShimmerEffect className="absolute inset-0" />
              </Button>
            </div>

            {/* Recent Purchase Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Purchase Orders</CardTitle>
                <CardDescription>
                  Your latest PO requests and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      id: "PO-2024-001234",
                      amount: 125000,
                      status: "approved",
                      supplier: "Jindal Steel",
                      date: "2024-01-15",
                    },
                    {
                      id: "PO-2024-001233",
                      amount: 89500,
                      status: "pending",
                      supplier: "Asian Paints",
                      date: "2024-01-14",
                    },
                    {
                      id: "PO-2024-001232",
                      amount: 156750,
                      status: "delivered",
                      supplier: "ACC Cement",
                      date: "2024-01-12",
                    },
                  ].map((po) => (
                    <div
                      key={po.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{po.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {po.supplier}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(po.date), "MMM dd, yyyy")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(po.amount)}
                        </div>
                        <Badge
                          className={
                            po.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : po.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {po.status}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4"
                        onClick={() => handleViewPO(po.id)}
                      >
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Invoices & Payments</h2>
                <p className="text-muted-foreground">
                  View and manage your invoices and payments
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleExportInvoices}
                  className="hover-lift"
                >
                  <AnimatedIcon
                    icon={Download}
                    animation="bounce"
                    className="mr-2"
                  />
                  Export
                </Button>
                <Button
                  onClick={handleViewAllInvoices}
                  className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
                >
                  <AnimatedIcon
                    icon={FileText}
                    animation="bounce"
                    className="mr-2"
                  />
                  View All
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-lg font-bold">₹</span>
                    <span className="font-medium">Total Outstanding</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mt-2">
                    {formatCurrency(
                      dashboardData.financialSummary.currentMonth
                        .pendingPayments,
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Across 5 invoices
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Overdue</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600 mt-2">
                    {formatCurrency(
                      dashboardData.financialSummary.currentMonth
                        .overduePayments,
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    2 invoices overdue
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Paid This Month</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mt-2">
                    {formatCurrency(750000)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    12 invoices paid
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Invoices */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>
                  Latest invoices and payment status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      id: "INV-2024-5671",
                      amount: 45000,
                      status: "paid",
                      supplier: "Jindal Steel",
                      date: "2024-01-15",
                      dueDate: "2024-01-30",
                    },
                    {
                      id: "INV-2024-5670",
                      amount: 32500,
                      status: "pending",
                      supplier: "Asian Paints",
                      date: "2024-01-14",
                      dueDate: "2024-01-29",
                    },
                    {
                      id: "INV-2024-5669",
                      amount: 78900,
                      status: "overdue",
                      supplier: "ACC Cement",
                      date: "2024-01-10",
                      dueDate: "2024-01-25",
                    },
                    {
                      id: "INV-2024-5668",
                      amount: 56700,
                      status: "pending",
                      supplier: "Tata Steel",
                      date: "2024-01-12",
                      dueDate: "2024-01-27",
                    },
                  ].map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{invoice.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.supplier}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Issued:{" "}
                          {format(new Date(invoice.date), "MMM dd, yyyy")} •
                          Due:{" "}
                          {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(invoice.amount)}
                        </div>
                        <Badge
                          className={
                            invoice.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : invoice.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4"
                        onClick={() => handleViewInvoice(invoice.id)}
                      >
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <InventoryManagementComponent
              franchiseeId={franchiseeId}
              isCompact={mobileLayout.isCompact}
            />
          </TabsContent>

          {/* GRN Tab */}
          <TabsContent value="grn" className="space-y-6">
            <GRNManagementComponent
              franchiseeId={franchiseeId}
              isCompact={mobileLayout.isCompact}
            />
          </TabsContent>

          {/* Schemes Tab */}
          <TabsContent value="schemes" className="space-y-6">
            <SchemesManagementComponent
              franchiseeId={franchiseeId}
              isCompact={mobileLayout.isCompact}
            />
          </TabsContent>

          {/* Loyalty Tab */}
          <TabsContent value="loyalty" className="space-y-6">
            <LoyaltyManagementComponent
              franchiseeId={franchiseeId}
              isCompact={mobileLayout.isCompact}
              initialTab={loyaltyInitialTab}
            />
          </TabsContent>
        </Tabs>

        {/* Support Ticket Modal */}
        {selectedTicket && (
          <Dialog
            open={!!selectedTicket}
            onOpenChange={() => setSelectedTicket(null)}
          >
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Support Ticket #{selectedTicket.ticketNumber}
                </DialogTitle>
                <DialogDescription>{selectedTicket.title}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Ticket Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Category:</span>{" "}
                        {selectedTicket.category}
                      </div>
                      <div>
                        <span className="font-medium">Priority:</span>{" "}
                        {selectedTicket.priority}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>{" "}
                        {selectedTicket.status}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span>{" "}
                        {format(new Date(selectedTicket.createdAt), "PPpp")}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Assignment</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Created by:</span>{" "}
                        {selectedTicket.createdBy}
                      </div>
                      {selectedTicket.assignedTo && (
                        <div>
                          <span className="font-medium">Assigned to:</span>{" "}
                          {selectedTicket.assignedTo}
                        </div>
                      )}
                      {selectedTicket.estimatedResolution && (
                        <div>
                          <span className="font-medium">Est. Resolution:</span>{" "}
                          {format(
                            new Date(selectedTicket.estimatedResolution),
                            "PPp",
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm bg-muted p-3 rounded">
                    {selectedTicket.description}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Create Ticket Modal */}
        {showCreateTicketModal && (
          <Dialog
            open={showCreateTicketModal}
            onOpenChange={setShowCreateTicketModal}
          >
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Support Ticket</DialogTitle>
                <DialogDescription>
                  Describe your issue and we'll help you resolve it
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="order">Order Issues</SelectItem>
                        <SelectItem value="payment">Payment Issues</SelectItem>
                        <SelectItem value="product">Product Issues</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Brief description of your issue" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    className="h-32 resize-none"
                    placeholder="Please provide detailed information about your issue..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateTicketModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCreateTicketModal(false);
                      // Here you would normally submit the ticket
                    }}
                  >
                    Create Ticket
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Create PO Modal */}
        {showCreatePOModal && (
          <Dialog open={showCreatePOModal} onOpenChange={setShowCreatePOModal}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Purchase Order</DialogTitle>
                <DialogDescription>
                  Create a new purchase order for your requirements
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Supplier</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jindal">Jindal Steel</SelectItem>
                        <SelectItem value="asian">Asian Paints</SelectItem>
                        <SelectItem value="acc">ACC Cement</SelectItem>
                        <SelectItem value="tata">Tata Steel</SelectItem>
                        <SelectItem value="birla">Birla Cement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Expected Delivery
                    </label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Items</label>
                  <div className="border rounded-md p-4">
                    <div className="grid gap-2 md:grid-cols-5 text-sm font-medium mb-2">
                      <div>Product</div>
                      <div>Quantity</div>
                      <div>Unit</div>
                      <div>Rate</div>
                      <div>Action</div>
                    </div>
                    <div className="grid gap-2 md:grid-cols-5 mb-2">
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tmt12">TMT Bars 12mm</SelectItem>
                          <SelectItem value="tmt16">TMT Bars 16mm</SelectItem>
                          <SelectItem value="cement">Cement OPC 53</SelectItem>
                          <SelectItem value="primer">Paint Primer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="100" />
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mt">MT</SelectItem>
                          <SelectItem value="bags">Bags</SelectItem>
                          <SelectItem value="ltrs">Ltrs</SelectItem>
                          <SelectItem value="sqft">Sqft</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="45000" />
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Shipping Address
                    </label>
                    <Textarea
                      className="h-20 resize-none"
                      placeholder="Enter delivery address..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Special Instructions
                    </label>
                    <Textarea
                      className="h-20 resize-none"
                      placeholder="Any special requirements..."
                    />
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <div className="grid gap-2 md:grid-cols-3 text-sm">
                    <div>Subtotal: ₹45,000</div>
                    <div>GST (18%): ₹8,100</div>
                    <div className="font-bold">Total: ₹53,100</div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreatePOModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCreatePOModal(false);
                      // Here you would normally submit the PO
                    }}
                  >
                    Create Purchase Order
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Mobile Floating Menu */}
        {mobileLayout.isCompact && (
          <div className="fixed bottom-4 right-4 z-50">
            {showMobileMenu && (
              <div className="mb-2 space-y-2">
                <Button
                  className="w-12 h-12 rounded-full shadow-lg"
                  variant="outline"
                  onClick={() => {
                    setActiveTab("loyalty");
                    setShowMobileMenu(false);
                  }}
                >
                  <Award className="h-5 w-5" />
                </Button>
                <Button
                  className="w-12 h-12 rounded-full shadow-lg"
                  variant="outline"
                  onClick={() => {
                    setActiveTab("orders");
                    setShowMobileMenu(false);
                  }}
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <Button
                  className="w-12 h-12 rounded-full shadow-lg"
                  variant="outline"
                  onClick={() => {
                    setActiveTab("support");
                    setShowMobileMenu(false);
                  }}
                >
                  <HelpCircle className="h-5 w-5" />
                  {urgentTasks > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white font-bold flex items-center justify-center">
                      {urgentTasks}
                    </Badge>
                  )}
                </Button>
              </div>
            )}
            <Button
              className="w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
