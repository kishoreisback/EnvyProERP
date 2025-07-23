import React, { useState, useMemo } from "react";
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
import { AnimatedIcon, PulsingDot, ShimmerEffect } from "../ui/animated-icons";
import {
  Package,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Edit,
  Settings,
  Upload,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Users,
  ShoppingCart,
  Database,
  Zap,
  Globe,
  Tag,
  TrendingUp,
  TrendingDown,
  MapPin,
  Thermometer,
  Truck,
  Bell,
  FileText,
  Calendar,
  Activity,
  DollarSign,
  Percent,
  Target,
  ArrowUpRight,
  ArrowDownLeft,
  RotateCcw,
  Building,
  Warehouse,
} from "lucide-react";
import {
  mockInventoryItems,
  mockInventoryLocations,
  mockInventorySuppliers,
  mockInventoryAlerts,
  mockInventoryDashboard,
  getInventoryItemById,
  getInventoryItemsByLocation,
  getInventoryItemsByCategory,
  getLocationById,
  getSupplierById,
  getLowStockItems,
  getExpiringItems,
  getActiveAlerts,
  getStockStatus,
  formatCurrency,
  formatPercentage,
} from "./inventory-data";
import {
  FranchiseeInventoryItem,
  InventoryLocation,
  InventoryAlert,
  InventoryDashboard,
} from "./inventory-types";
import { useAuditLogger } from "../../hooks/useAuditLogger";

interface InventoryManagementComponentProps {
  franchiseeId: string;
  isCompact?: boolean;
  initialTab?: string;
}

export function InventoryManagementComponent({
  franchiseeId,
  isCompact = false,
  initialTab = "overview",
}: InventoryManagementComponentProps) {
  const { logAudit } = useAuditLogger("inventory_management");
  const [activeTab, setActiveTab] = useState(initialTab);
  const [inventoryItems, setInventoryItems] =
    useState<FranchiseeInventoryItem[]>(mockInventoryItems);
  const [inventoryLocations, setInventoryLocations] = useState<
    InventoryLocation[]
  >(mockInventoryLocations);
  const [alerts, setAlerts] = useState<InventoryAlert[]>(mockInventoryAlerts);
  const [dashboardData, setDashboardData] = useState<InventoryDashboard>(
    mockInventoryDashboard,
  );
  const [selectedItem, setSelectedItem] =
    useState<FranchiseeInventoryItem | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<InventoryLocation | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<InventoryAlert | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  // Filter inventory items based on search and filters
  const filteredItems = useMemo(() => {
    return inventoryItems.filter((item) => {
      const matchesSearch =
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchesLocation =
        locationFilter === "all" || item.locationId === locationFilter;
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" && item.currentStock <= item.minimumStock) ||
        (stockFilter === "out" && item.currentStock === 0) ||
        (stockFilter === "normal" && item.currentStock > item.minimumStock);

      return (
        matchesSearch && matchesCategory && matchesLocation && matchesStock
      );
    });
  }, [
    inventoryItems,
    searchQuery,
    categoryFilter,
    locationFilter,
    stockFilter,
  ]);

  const lowStockItems = getLowStockItems(inventoryItems);
  const expiringItems = getExpiringItems(inventoryItems);
  const activeAlerts = getActiveAlerts(alerts);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    logAudit({
      action: "inventory.tab_changed",
      resource: `inventory/${tab}`,
      resourceType: "navigation",
      description: `Switched to ${tab} tab`,
    });
  };

  const handleViewItem = (item: FranchiseeInventoryItem) => {
    setSelectedItem(item);
    logAudit({
      action: "inventory.item_viewed",
      resource: `inventory/item/${item.id}`,
      resourceType: "inventory_item",
      description: `Viewed inventory item: ${item.productName}`,
    });
  };

  const handleViewLocation = (location: InventoryLocation) => {
    setSelectedLocation(location);
    logAudit({
      action: "inventory.location_viewed",
      resource: `inventory/location/${location.id}`,
      resourceType: "inventory_location",
      description: `Viewed location: ${location.name}`,
    });
  };

  const handleAddItem = () => {
    setIsAddItemModalOpen(true);
    logAudit({
      action: "inventory.add_item_initiated",
      resource: "inventory/item/new",
      resourceType: "inventory_item",
      description: "Initiated new inventory item creation",
    });
  };

  const handleEditItem = (item: FranchiseeInventoryItem) => {
    setSelectedItem(item);
    setIsEditItemModalOpen(true);
    logAudit({
      action: "inventory.edit_item_initiated",
      resource: `inventory/item/${item.id}/edit`,
      resourceType: "inventory_item",
      description: `Initiated edit for item: ${item.productName}`,
    });
  };

  const handleExportData = () => {
    setShowExportDialog(true);
    logAudit({
      action: "inventory.export_initiated",
      resource: "inventory/export",
      resourceType: "inventory_data",
      description: "Initiated inventory data export",
    });
  };

  const handleResolveAlert = (alert: InventoryAlert) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
    logAudit({
      action: "inventory.alert_resolved",
      resource: `inventory/alert/${alert.id}`,
      resourceType: "inventory_alert",
      description: `Resolved alert: ${alert.title}`,
    });
  };

  const handleAddLocation = () => {
    setIsAddLocationModalOpen(true);
    logAudit({
      action: "inventory.add_location_initiated",
      resource: "inventory/location/new",
      resourceType: "inventory_location",
      description: "Initiated new location creation",
    });
  };

  const getStockStatusColor = (item: FranchiseeInventoryItem) => {
    if (item.currentStock === 0) return "bg-red-100 text-red-800";
    if (item.currentStock <= item.minimumStock)
      return "bg-yellow-100 text-yellow-800";
    if (item.currentStock >= item.maximumStock)
      return "bg-blue-100 text-blue-800";
    return "bg-green-100 text-green-800";
  };

  const getStockStatusText = (item: FranchiseeInventoryItem) => {
    if (item.currentStock === 0) return "Out of Stock";
    if (item.currentStock <= item.minimumStock) return "Low Stock";
    if (item.currentStock >= item.maximumStock) return "Overstock";
    return "In Stock";
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case "low_stock":
        return AlertTriangle;
      case "expiry_warning":
        return Clock;
      case "temperature_breach":
        return Thermometer;
      case "overstock":
        return Package;
      case "stock_discrepancy":
        return XCircle;
      case "reorder_suggestion":
        return ShoppingCart;
      default:
        return Bell;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slideInDown">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold gradient-text">
              Inventory Management
            </h2>
            <PulsingDot />
          </div>
          <div className="flex items-center gap-2">
            <AnimatedIcon
              icon={Package}
              animation="float"
              className="text-primary"
            />
            <p className="text-muted-foreground">
              Manage stock levels, locations, and inventory operations
            </p>
          </div>
        </div>
        <div className="flex gap-2 animate-slideInRight">
          <Button
            variant="outline"
            className="hover-lift"
            onClick={handleExportData}
          >
            <AnimatedIcon
              icon={Download}
              animation="bounce"
              className={isCompact ? "" : "mr-2"}
            />
            {!isCompact && "Export"}
          </Button>
          <Button
            className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
            onClick={handleAddItem}
          >
            <AnimatedIcon
              icon={Plus}
              animation="bounce"
              className={isCompact ? "" : "mr-2"}
            />
            {!isCompact && "Add Item"}
            <ShimmerEffect className="absolute inset-0" />
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList
          className={`grid w-full ${isCompact ? "grid-cols-3" : "grid-cols-5"}`}
        >
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          {!isCompact && (
            <>
              <TabsTrigger value="alerts">
                Alerts
                {activeAlerts.length > 0 && (
                  <Badge className="ml-1 h-4 w-4 p-0 text-xs bg-red-500 text-white font-bold flex items-center justify-center">
                    {activeAlerts.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </>
          )}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden hover-lift animate-fadeInUp">
              <div className="absolute top-0 right-0 w-12 h-12 bg-blue-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-blue-700">
                    Total Items
                  </CardTitle>
                  <div className="text-3xl font-bold text-blue-900">
                    <AnimatedCounter value={dashboardData.totalItems} />
                  </div>
                  <div className="text-sm text-blue-600">
                    Across {dashboardData.totalLocations} locations
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <AnimatedIcon
                      icon={Package}
                      animation="float"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className="bg-orange-50 border-orange-100 rounded-2xl p-6 relative overflow-hidden hover-lift animate-fadeInUp"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-orange-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-orange-700">
                    Low Stock
                  </CardTitle>
                  <div className="text-3xl font-bold text-orange-900">
                    <AnimatedCounter value={lowStockItems.length} />
                  </div>
                  <div className="text-sm text-orange-600">
                    Requires attention
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <AnimatedIcon
                      icon={AlertTriangle}
                      animation="pulse"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden hover-lift animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-green-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-green-700">
                    Total Value
                  </CardTitle>
                  <div className="text-3xl font-bold text-green-900">
                    ₹
                    <AnimatedCounter
                      value={Math.round(dashboardData.totalValue / 100000)}
                    />
                    L
                  </div>
                  <div className="text-sm text-green-600">
                    Current inventory worth
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">₹</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className="bg-purple-50 border-purple-100 rounded-2xl p-6 relative overflow-hidden hover-lift animate-fadeInUp"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-purple-200/40 rounded-bl-[24px]"></div>
              <div className="flex flex-row items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-sm font-medium text-purple-700">
                    Turnover Rate
                  </CardTitle>
                  <div className="text-3xl font-bold text-purple-900">
                    <AnimatedCounter value={dashboardData.turnoverRate} />x
                  </div>
                  <div className="text-sm text-purple-600">Monthly average</div>
                </div>
                <div className="flex-shrink-0 ml-4 relative z-10">
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <AnimatedIcon
                      icon={RotateCcw}
                      animation="float"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity & Alerts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Critical Alerts */}
            <Card className="hover-lift animate-fadeInUp">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={AlertTriangle}
                      animation="pulse"
                      className="text-red-600"
                    />
                    <CardTitle>Critical Alerts</CardTitle>
                  </div>
                  <Badge variant="outline" className="animate-pulse">
                    <AnimatedCounter value={activeAlerts.length} /> alerts
                  </Badge>
                </div>
                <CardDescription>
                  Items requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeAlerts.slice(0, 5).map((alert, index) => (
                    <div
                      key={alert.id}
                      className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="p-1 bg-gradient-to-br from-red-100 to-orange-100 rounded-lg">
                        <AnimatedIcon
                          icon={getAlertTypeIcon(alert.type)}
                          animation="pulse"
                          className="text-red-600"
                          size="sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">
                          {alert.message}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {alert.details}
                        </div>
                        <Badge
                          className={`mt-1 ${getAlertSeverityColor(alert.severity)}`}
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Items */}
            <Card className="hover-lift animate-fadeInUp">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Package}
                      animation="float"
                      className="text-orange-600"
                    />
                    <CardTitle>Low Stock Items</CardTitle>
                  </div>
                  <Badge variant="outline" className="animate-pulse">
                    <AnimatedCounter value={lowStockItems.length} /> items
                  </Badge>
                </div>
                <CardDescription>
                  Items below minimum stock level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockItems.slice(0, 5).map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors animate-fadeInUp cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => handleViewItem(item)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg">
                          <AnimatedIcon
                            icon={Package}
                            animation="float"
                            className="text-orange-600"
                            size="sm"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {item.productName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.sku}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-orange-600">
                          {item.currentStock}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Min: {item.minimumStock}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Items Tab */}
        <TabsContent value="items" className="space-y-6">
          {/* Filters */}
          <Card className="hover-lift animate-fadeInUp">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 hover-lift"
                    />
                  </div>
                </div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-48 hover-lift">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                    <SelectItem value="Personal Care">Personal Care</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={locationFilter}
                  onValueChange={setLocationFilter}
                >
                  <SelectTrigger className="w-48 hover-lift">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {inventoryLocations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={stockFilter} onValueChange={setStockFilter}>
                  <SelectTrigger className="w-48 hover-lift">
                    <SelectValue placeholder="Stock Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stock</SelectItem>
                    <SelectItem value="low">Low Stock</SelectItem>
                    <SelectItem value="out">Out of Stock</SelectItem>
                    <SelectItem value="normal">Normal Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Items Table */}
          <Card className="hover-lift animate-fadeInUp">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Package}
                    animation="float"
                    className="text-primary"
                  />
                  <CardTitle>Inventory Items</CardTitle>
                </div>
                <Badge variant="outline" className="animate-pulse">
                  <AnimatedCounter value={filteredItems.length} /> items
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Min/Max</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className="hover:bg-muted/50 transition-colors animate-fadeInUp cursor-pointer"
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
                              <p className="font-medium">{item.productName}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {item.sku}
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          {getLocationById(item.locationId, inventoryLocations)
                            ?.name || "Unknown"}
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold">
                            {item.currentStock}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <span className="text-orange-600">
                              {item.minimumStock}
                            </span>
                            {" / "}
                            <span className="text-green-600">
                              {item.maximumStock}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {formatCurrency(item.totalValue)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStockStatusColor(item)}>
                            {getStockStatusText(item)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover-lift"
                              onClick={() => handleViewItem(item)}
                            >
                              <AnimatedIcon icon={Eye} size="sm" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover-lift"
                              onClick={() => handleEditItem(item)}
                            >
                              <AnimatedIcon icon={Edit} size="sm" />
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
        </TabsContent>

        {/* Locations Tab */}
        <TabsContent value="locations" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Inventory Locations</h3>
              <p className="text-muted-foreground">
                Manage your stores, warehouses, and storage areas
              </p>
            </div>
            <Button
              onClick={handleAddLocation}
              className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
            >
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Add Location
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>

          <div
            className={`grid gap-6 ${isCompact ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3"}`}
          >
            {inventoryLocations.map((location, index) => (
              <Card
                key={location.id}
                className="hover-lift animate-fadeInUp cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleViewLocation(location)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-primary/20 to-construction-500/20 rounded-lg">
                      <AnimatedIcon
                        icon={location.type === "store" ? Building : Warehouse}
                        animation="float"
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                      <CardDescription className="capitalize">
                        {location.type}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {location.address.city}, {location.address.state}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Items:</span>
                        <span className="font-medium ml-1">
                          {
                            getInventoryItemsByLocation(
                              location.id,
                              inventoryItems,
                            ).length
                          }
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Area:</span>
                        <span className="font-medium ml-1">
                          {location.capacity.totalArea} {location.capacity.unit}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={location.isActive ? "default" : "secondary"}
                      >
                        {location.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="hover-lift animate-fadeInUp">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Bell}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Active Alerts</CardTitle>
              </div>
              <CardDescription>System alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-2 bg-gradient-to-br from-red-100 to-orange-100 rounded-lg">
                      <AnimatedIcon
                        icon={getAlertTypeIcon(alert.type)}
                        animation="pulse"
                        className="text-red-600"
                        size="sm"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{alert.message}</h4>
                        <Badge
                          className={getAlertSeverityColor(alert.severity)}
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {alert.details}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Type: {alert.type}</span>
                        <span>
                          Created:{" "}
                          {new Date(alert.triggeredAt).toLocaleDateString()}
                        </span>
                        {alert.acknowledgedAt && (
                          <span>
                            Acknowledged:{" "}
                            {new Date(
                              alert.acknowledgedAt,
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover-lift"
                      onClick={() => handleResolveAlert(alert)}
                    >
                      Resolve
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">
                Inventory Reports & Analytics
              </h3>
              <p className="text-muted-foreground">
                Comprehensive insights and performance metrics
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="hover-lift">
                <AnimatedIcon
                  icon={Calendar}
                  animation="bounce"
                  className="mr-2"
                />
                Date Range
              </Button>
              <Button
                variant="outline"
                className="hover-lift"
                onClick={handleExportData}
              >
                <AnimatedIcon
                  icon={Download}
                  animation="bounce"
                  className="mr-2"
                />
                Export Report
              </Button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover-lift animate-fadeInUp">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AnimatedIcon icon={TrendingUp} className="text-green-600" />
                  <span className="font-medium">Turnover Rate</span>
                </div>
                <div className="text-2xl font-bold text-green-600 mt-2">
                  <AnimatedCounter value={dashboardData.turnoverRate} />x
                </div>
                <div className="text-sm text-muted-foreground">
                  Monthly average
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-fadeInUp">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AnimatedIcon icon={Target} className="text-blue-600" />
                  <span className="font-medium">Fill Rate</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 mt-2">
                  <AnimatedCounter value={dashboardData.fillRate} />%
                </div>
                <div className="text-sm text-muted-foreground">
                  Order fulfillment
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-fadeInUp">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AnimatedIcon icon={CheckCircle} className="text-green-600" />
                  <span className="font-medium">Accuracy Rate</span>
                </div>
                <div className="text-2xl font-bold text-green-600 mt-2">
                  <AnimatedCounter value={dashboardData.accuracyRate} />%
                </div>
                <div className="text-sm text-muted-foreground">
                  Inventory accuracy
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-fadeInUp">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AnimatedIcon icon={Clock} className="text-orange-600" />
                  <span className="font-medium">Avg Days to Sell</span>
                </div>
                <div className="text-2xl font-bold text-orange-600 mt-2">
                  <AnimatedCounter value={28} />
                </div>
                <div className="text-sm text-muted-foreground">
                  Days on hand
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="hover-lift animate-fadeInUp">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={BarChart3}
                      animation="float"
                      className="text-primary"
                    />
                    <CardTitle>Category Performance</CardTitle>
                  </div>
                  <Badge variant="outline">Last 30 days</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      category: "Beverages",
                      revenue: 45000,
                      growth: 12.5,
                      items: 24,
                    },
                    {
                      category: "Snacks",
                      revenue: 32000,
                      growth: 8.2,
                      items: 18,
                    },
                    {
                      category: "Dairy",
                      revenue: 28000,
                      growth: -2.1,
                      items: 12,
                    },
                    {
                      category: "Personal Care",
                      revenue: 22000,
                      growth: 15.8,
                      items: 15,
                    },
                  ].map((category, index) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            ₹{category.revenue.toLocaleString()}
                          </span>
                          <Badge
                            className={
                              category.growth > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {category.growth > 0 ? "+" : ""}
                            {category.growth}%
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{category.items} items</span>
                        <span>Revenue contribution</span>
                      </div>
                      <Progress
                        value={(category.revenue / 50000) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-fadeInUp">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={AlertTriangle}
                      animation="pulse"
                      className="text-orange-600"
                    />
                    <CardTitle>Stock Health Overview</CardTitle>
                  </div>
                  <Badge variant="outline">Real-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Overall Stock Health</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <Progress value={85} className="h-3" />
                    <div className="text-xs text-muted-foreground mt-1">
                      Based on stock levels vs. targets
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {
                          filteredItems.filter(
                            (item) => item.currentStock > item.minimumStock,
                          ).length
                        }
                      </div>
                      <div className="text-xs text-green-600">Well Stocked</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {lowStockItems.length}
                      </div>
                      <div className="text-xs text-yellow-600">Low Stock</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {
                          filteredItems.filter(
                            (item) => item.currentStock === 0,
                          ).length
                        }
                      </div>
                      <div className="text-xs text-red-600">Out of Stock</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage Utilization</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Inventory Accuracy</span>
                      <span className="font-medium">
                        {dashboardData.accuracyRate}%
                      </span>
                    </div>
                    <Progress
                      value={dashboardData.accuracyRate}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Movements */}
          <Card className="hover-lift animate-fadeInUp">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Activity}
                    animation="float"
                    className="text-primary"
                  />
                  <CardTitle>Recent Inventory Movements</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="hover-lift">
                  <AnimatedIcon icon={Eye} className="mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    type: "IN",
                    item: "TMT Bars 12mm",
                    quantity: 500,
                    time: "2 hours ago",
                    user: "Warehouse Team",
                  },
                  {
                    type: "OUT",
                    item: "Cement OPC 53",
                    quantity: 200,
                    time: "4 hours ago",
                    user: "Sales Order",
                  },
                  {
                    type: "ADJ",
                    item: "Paint Primer",
                    quantity: 25,
                    time: "1 day ago",
                    user: "Stock Adjustment",
                  },
                  {
                    type: "IN",
                    item: "Steel Rods 16mm",
                    quantity: 300,
                    time: "2 days ago",
                    user: "Purchase Receipt",
                  },
                ].map((movement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          movement.type === "IN"
                            ? "bg-green-100 text-green-800"
                            : movement.type === "OUT"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      >
                        {movement.type}
                      </Badge>
                      <div>
                        <div className="font-medium">{movement.item}</div>
                        <div className="text-sm text-muted-foreground">
                          {movement.user}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {movement.type === "OUT" ? "-" : "+"}
                        {movement.quantity}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {movement.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Item Details Modal */}
      {selectedItem && (
        <Dialog
          open={!!selectedItem}
          onOpenChange={() => setSelectedItem(null)}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedItem.productName}</DialogTitle>
              <DialogDescription>
                Inventory item details and management
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Product Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">SKU:</span>{" "}
                      {selectedItem.sku}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span>{" "}
                      {selectedItem.category}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>{" "}
                      {selectedItem.inventoryType}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>{" "}
                      {selectedItem.status}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Stock Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Current Stock:</span>{" "}
                      {selectedItem.currentStock}
                    </div>
                    <div>
                      <span className="font-medium">Minimum Stock:</span>{" "}
                      {selectedItem.minimumStock}
                    </div>
                    <div>
                      <span className="font-medium">Maximum Stock:</span>{" "}
                      {selectedItem.maximumStock}
                    </div>
                    <div>
                      <span className="font-medium">Reorder Point:</span>{" "}
                      {selectedItem.reorderPoint}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Financial Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Unit Cost:</span>{" "}
                    {formatCurrency(selectedItem.unitCost)}
                  </div>
                  <div>
                    <span className="font-medium">Total Value:</span>{" "}
                    {formatCurrency(selectedItem.totalValue)}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Location Details Modal */}
      {selectedLocation && (
        <Dialog
          open={!!selectedLocation}
          onOpenChange={() => setSelectedLocation(null)}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedLocation.name}</DialogTitle>
              <DialogDescription>
                Location details and inventory
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Location Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Type:</span>{" "}
                      {selectedLocation.type}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>{" "}
                      {selectedLocation.isActive ? "Active" : "Inactive"}
                    </div>
                    <div>
                      <span className="font-medium">Manager:</span>{" "}
                      {selectedLocation.manager.name}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Capacity</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Total Area:</span>{" "}
                      {selectedLocation.capacity.totalArea}{" "}
                      {selectedLocation.capacity.unit}
                    </div>
                    <div>
                      <span className="font-medium">Storage Area:</span>{" "}
                      {selectedLocation.capacity.storageArea}{" "}
                      {selectedLocation.capacity.unit}
                    </div>
                    <div>
                      <span className="font-medium">Display Area:</span>{" "}
                      {selectedLocation.capacity.displayArea}{" "}
                      {selectedLocation.capacity.unit}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Address</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedLocation.address.street},{" "}
                  {selectedLocation.address.city},{" "}
                  {selectedLocation.address.state}{" "}
                  {selectedLocation.address.pincode}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Item Modal */}
      {isAddItemModalOpen && (
        <Dialog open={isAddItemModalOpen} onOpenChange={setIsAddItemModalOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>
                Create a new inventory item with details
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input id="productName" placeholder="Enter product name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Enter SKU" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beverages">Beverages</SelectItem>
                      <SelectItem value="snacks">Snacks</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="personal-care">
                        Personal Care
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {inventoryLocations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input id="currentStock" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Minimum Stock</Label>
                  <Input id="minStock" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStock">Maximum Stock</Label>
                  <Input id="maxStock" type="number" placeholder="0" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="unitCost">Unit Cost (₹)</Label>
                  <Input id="unitCost" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inventoryType">Inventory Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owned">Owned</SelectItem>
                      <SelectItem value="consignment">Consignment</SelectItem>
                      <SelectItem value="vendor_managed">
                        Vendor Managed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddItemModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsAddItemModalOpen(false);
                    // Here you would normally save the item
                  }}
                  className="bg-gradient-to-r from-primary to-construction-500"
                >
                  Add Item
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Item Modal */}
      {isEditItemModalOpen && selectedItem && (
        <Dialog
          open={isEditItemModalOpen}
          onOpenChange={setIsEditItemModalOpen}
        >
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Item: {selectedItem.productName}</DialogTitle>
              <DialogDescription>
                Update inventory item details
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="editProductName">Product Name</Label>
                  <Input
                    id="editProductName"
                    defaultValue={selectedItem.productName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editSku">SKU</Label>
                  <Input id="editSku" defaultValue={selectedItem.sku} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="editCurrentStock">Current Stock</Label>
                  <Input
                    id="editCurrentStock"
                    type="number"
                    defaultValue={selectedItem.currentStock}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editMinStock">Minimum Stock</Label>
                  <Input
                    id="editMinStock"
                    type="number"
                    defaultValue={selectedItem.minimumStock}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editMaxStock">Maximum Stock</Label>
                  <Input
                    id="editMaxStock"
                    type="number"
                    defaultValue={selectedItem.maximumStock}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="editUnitCost">Unit Cost (₹)</Label>
                  <Input
                    id="editUnitCost"
                    type="number"
                    defaultValue={selectedItem.unitCost}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select defaultValue={selectedItem.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="discontinued">Discontinued</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditItemModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsEditItemModalOpen(false);
                    setSelectedItem(null);
                    // Here you would normally save the changes
                  }}
                  className="bg-gradient-to-r from-primary to-construction-500"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Location Modal */}
      {isAddLocationModalOpen && (
        <Dialog
          open={isAddLocationModalOpen}
          onOpenChange={setIsAddLocationModalOpen}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>
                Create a new inventory location
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="locationName">Location Name</Label>
                  <Input id="locationName" placeholder="Enter location name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locationType">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="store">Store</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="distribution_center">
                        Distribution Center
                      </SelectItem>
                      <SelectItem value="display_area">Display Area</SelectItem>
                      <SelectItem value="storage_room">Storage Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter full address" />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="totalArea">Total Area</Label>
                  <Input id="totalArea" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storageArea">Storage Area</Label>
                  <Input id="storageArea" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayArea">Display Area</Label>
                  <Input id="displayArea" type="number" placeholder="0" />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddLocationModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsAddLocationModalOpen(false);
                    // Here you would normally save the location
                  }}
                  className="bg-gradient-to-r from-primary to-construction-500"
                >
                  Add Location
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Export Dialog */}
      {showExportDialog && (
        <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export Inventory Data</DialogTitle>
              <DialogDescription>
                Choose export format and data range
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Export Format</Label>
                <Select defaultValue="excel">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Data Range</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="filtered">
                      Current Filtered View
                    </SelectItem>
                    <SelectItem value="low-stock">
                      Low Stock Items Only
                    </SelectItem>
                    <SelectItem value="by-location">By Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowExportDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowExportDialog(false);
                    // Here you would trigger the actual export
                    alert(
                      "Export started! You'll receive a notification when complete.",
                    );
                  }}
                  className="bg-gradient-to-r from-primary to-construction-500"
                >
                  <AnimatedIcon icon={Download} className="mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
