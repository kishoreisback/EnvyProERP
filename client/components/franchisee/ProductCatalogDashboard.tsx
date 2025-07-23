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
import { Separator } from "../ui/separator";
import { AnimatedCounter } from "../ui/animated-counter";
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
  Image,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
} from "lucide-react";
import {
  mockCorporateProducts,
  mockProductCategories,
  mockFranchiseeCatalogSyncs,
  mockCatalogDashboard,
  getProductById,
  getProductsByCategory,
  getCategoryById,
  getFranchiseeCatalogSync,
  getAvailableProductsForFranchisee,
  calculateFranchiseePrice,
  triggerCatalogSync,
  validateProductAvailability,
} from "./catalog-data";
import {
  CorporateProduct,
  ProductCategory,
  FranchiseeCatalogSync,
  CreateProductForm,
  CatalogSyncRequest,
  BulkProductUpdate,
} from "./catalog-types";

interface ProductCatalogDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function ProductCatalogDashboard({
  currentTab = "dashboard",
  onTabChange,
}: ProductCatalogDashboardProps) {
  const [activeTab, setActiveTab] = useState(currentTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] =
    useState<CorporateProduct | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [createProductForm, setCreateProductForm] = useState<
    Partial<CreateProductForm>
  >({});
  const [syncRequest, setSyncRequest] = useState<Partial<CatalogSyncRequest>>(
    {},
  );
  const [bulkUpdate, setBulkUpdate] = useState<Partial<BulkProductUpdate>>({});
  const [createCategoryForm, setCreateCategoryForm] = useState<any>({});

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
  };

  // Filtered products based on search and category
  const filteredProducts = useMemo(() => {
    return mockCorporateProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category.id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getProductTypeIcon = (type: string) => {
    switch (type) {
      case "beverage":
        return <ShoppingCart className="h-4 w-4" />;
      case "retail":
        return <Tag className="h-4 w-4" />;
      case "merchandise":
        return <Package className="h-4 w-4" />;
      case "pos_item":
        return <Database className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStockStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      in_stock: "bg-green-100 text-green-800",
      low_stock: "bg-yellow-100 text-yellow-800",
      out_of_stock: "bg-red-100 text-red-800",
      discontinued: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getSyncStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: "bg-green-100 text-green-800",
      in_progress: "bg-blue-100 text-blue-800",
      failed: "bg-red-100 text-red-800",
      pending: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount}`;
  };

  const handleProductAction = (action: string, product: CorporateProduct) => {
    setSelectedProduct(product);
    switch (action) {
      case "view":
        setShowProductModal(true);
        break;
      case "edit":
        setCreateProductForm({
          name: product.name,
          description: product.description,
          categoryId: product.category.id,
          subcategory: product.subcategory,
          productType: product.productType,
          basePrice: product.pricing.basePrice,
        });
        setShowCreateProductModal(true);
        break;
      case "sync":
        setSyncRequest({
          franchiseeIds: [],
          syncType: "product",
          includeProducts: [product.id],
          priority: "normal",
          notifyOnCompletion: true,
        });
        setShowSyncModal(true);
        break;
    }
  };

  const handleCatalogSync = async () => {
    if (!syncRequest.franchiseeIds?.length || !syncRequest.syncType) return;

    try {
      const result = await triggerCatalogSync(
        syncRequest.franchiseeIds,
        syncRequest.syncType,
        {
          categories: syncRequest.includeCategories,
          products: syncRequest.includeProducts,
          priority: syncRequest.priority,
        },
      );

      alert(`Sync initiated successfully! Sync ID: ${result.syncId}`);
      setShowSyncModal(false);
      setSyncRequest({});
    } catch (error) {
      alert("Failed to initiate sync. Please try again.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Package className="h-8 w-8 text-blue-600" />
            Product Catalog Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage corporate product catalog and franchisee synchronization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowBulkUpdateModal(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Bulk Update
          </Button>
          <Button variant="outline" onClick={() => setShowSyncModal(true)}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Catalog
          </Button>
          <Button onClick={() => setShowCreateProductModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={mockCatalogDashboard.totalProducts} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">
                {mockCatalogDashboard.activeProducts} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={mockCatalogDashboard.categories} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Globe className="h-3 w-3 text-blue-600" />
              <span className="text-blue-600">Multi-level hierarchy</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Franchisees Synced
            </CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={mockCatalogDashboard.franchiseesSynced} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span className="text-green-600">
                {mockCatalogDashboard.syncMetrics.successRate}% success rate
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Syncs</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={mockCatalogDashboard.pendingSyncs} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <AlertTriangle className="h-3 w-3 text-orange-600" />
              <span className="text-orange-600">
                {mockCatalogDashboard.syncErrors} errors
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Sync Time</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={mockCatalogDashboard.syncMetrics.averageSyncTime}
                suffix="s"
              />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-green-600">Improving</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="sync">Sync Status</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest catalog management activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCatalogDashboard.recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-3 border rounded-lg"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                        {activity.type === "product_added" && (
                          <Plus className="h-4 w-4 text-blue-600" />
                        )}
                        {activity.type === "product_updated" && (
                          <Edit className="h-4 w-4 text-blue-600" />
                        )}
                        {activity.type === "sync_completed" && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {activity.type === "error_occurred" && (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>By {activity.performedBy}</span>
                          <span>•</span>
                          <span>
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                          {activity.affectedItems > 0 && (
                            <>
                              <span>•</span>
                              <span>{activity.affectedItems} items</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
                <CardDescription>
                  Most popular product categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCatalogDashboard.topCategories.map((category) => (
                    <div key={category.categoryId} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {category.categoryName}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {category.productCount} products
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={category.franchiseeAdoption}
                          className="flex-1 h-2"
                        />
                        <span className="text-xs text-muted-foreground">
                          {category.franchiseeAdoption}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Avg Margin: {category.averageMargin}%</span>
                        <span>
                          Revenue: ₹{(category.revenue / 100000).toFixed(1)}L
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sync Performance by Region */}
          <Card>
            <CardHeader>
              <CardTitle>Sync Performance by Region</CardTitle>
              <CardDescription>
                Regional synchronization statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCatalogDashboard.syncMetrics.performanceByRegion.map(
                  (region) => (
                    <div
                      key={region.regionName}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
                          <Globe className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{region.regionName}</p>
                          <p className="text-sm text-muted-foreground">
                            {region.franchiseeCount} franchisees
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            className={
                              region.syncSuccessRate >= 90
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {region.syncSuccessRate}% success
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Avg: {region.averageSyncTime}s
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Product Catalog</h2>
              <p className="text-muted-foreground">
                Manage corporate product inventory
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockProductCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock Status</TableHead>
                    <TableHead>Regions</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {product.images[0] ? (
                            <img
                              src={product.images[0].url}
                              alt={product.images[0].altText}
                              className="w-10 h-10 rounded object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                              <Package className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.sku}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{product.category.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.subcategory}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getProductTypeIcon(product.productType)}
                          <span className="capitalize">
                            {product.productType}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {formatCurrency(product.pricing.basePrice)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStockStatusColor(
                            product.availability.stockStatus,
                          )}
                        >
                          {product.availability.stockStatus.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {product.availability.regions.length} regions
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleProductAction("view", product)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleProductAction("edit", product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleProductAction("sync", product)}
                          >
                            <RefreshCw className="h-4 w-4" />
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

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Product Categories</h2>
              <p className="text-muted-foreground">
                Manage product categorization and access levels
              </p>
            </div>
            <Button onClick={() => setShowCreateCategoryModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockProductCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <Badge
                      variant={
                        category.accessLevel === "public"
                          ? "default"
                          : category.accessLevel === "premium"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {category.accessLevel}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2 md:grid-cols-2">
                      <div>
                        <Label className="text-xs">PRODUCTS</Label>
                        <p className="font-medium">
                          {getProductsByCategory(category.id).length}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs">LEVEL</Label>
                        <p className="font-medium">Level {category.level}</p>
                      </div>
                      <div>
                        <Label className="text-xs">DEFAULT MARGIN</Label>
                        <p className="font-medium">
                          {category.margins.defaultMargin}%
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs">STATUS</Label>
                        <Badge
                          variant={category.isActive ? "default" : "secondary"}
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">MARGIN RANGE</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm">
                          {category.margins.minMargin}%
                        </span>
                        <Progress
                          value={
                            ((category.margins.recommendedMargin -
                              category.margins.minMargin) /
                              (category.margins.maxMargin -
                                category.margins.minMargin)) *
                            100
                          }
                          className="flex-1 h-2"
                        />
                        <span className="text-sm">
                          {category.margins.maxMargin}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended: {category.margins.recommendedMargin}%
                      </p>
                    </div>

                    {category.regionalRestrictions.length > 0 && (
                      <div>
                        <Label className="text-xs">RESTRICTIONS</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {category.regionalRestrictions.map((restriction) => (
                            <Badge
                              key={restriction}
                              variant="outline"
                              className="text-xs"
                            >
                              {restriction}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Products
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sync Status Tab */}
        <TabsContent value="sync" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Sync Status</h2>
              <p className="text-muted-foreground">
                Monitor franchisee catalog synchronization
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={() => setShowSyncModal(true)}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync All
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Franchisee</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sync Type</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Errors</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFranchiseeCatalogSyncs.map((sync) => (
                    <TableRow key={sync.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{sync.franchiseeCode}</p>
                          <p className="text-sm text-muted-foreground">
                            ID: {sync.franchiseeId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {new Date(sync.lastSyncAt).toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSyncStatusColor(sync.syncStatus)}>
                          {sync.syncStatus.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">{sync.syncType}</span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-green-600">
                            +{sync.productsAdded}
                          </div>
                          <div className="text-blue-600">
                            ~{sync.productsUpdated}
                          </div>
                          <div className="text-red-600">
                            -{sync.productsRemoved}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {sync.errors.length > 0 ? (
                          <Badge variant="destructive">
                            {sync.errors.length} errors
                          </Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            No errors
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSyncRequest({
                                franchiseeIds: [sync.franchiseeId],
                                syncType: "full",
                                priority: "normal",
                                notifyOnCompletion: true,
                              });
                              setShowSyncModal(true);
                            }}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
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

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Sync Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {mockCatalogDashboard.syncMetrics.successRate}%
                </div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <div className="mt-4">
                  <Progress
                    value={mockCatalogDashboard.syncMetrics.successRate}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Sync Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {mockCatalogDashboard.syncMetrics.averageSyncTime}s
                </div>
                <p className="text-sm text-muted-foreground">
                  Per Sync Operation
                </p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                  <TrendingDown className="h-3 w-3" />
                  <span>Improving over time</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's Syncs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {mockCatalogDashboard.syncMetrics.totalSyncsToday}
                </div>
                <p className="text-sm text-muted-foreground">Completed Today</p>
                <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
                  <AlertTriangle className="h-3 w-3" />
                  <span>
                    {mockCatalogDashboard.syncMetrics.errorRate}% error rate
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Category Revenue Analysis</CardTitle>
              <CardDescription>
                Revenue performance by product category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCatalogDashboard.topCategories.map((category) => (
                  <div
                    key={category.categoryId}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{category.categoryName}</p>
                      <p className="text-sm text-muted-foreground">
                        {category.productCount} products •{" "}
                        {category.franchiseeAdoption}% adoption
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ₹{(category.revenue / 100000).toFixed(1)}L
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {category.averageMargin}% avg margin
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sync Settings</CardTitle>
                <CardDescription>
                  Global synchronization preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Default Sync Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="real_time">Real-time</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Auto-sync on Product Updates</Label>
                    <Select defaultValue="true">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Enabled</SelectItem>
                        <SelectItem value="false">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Sync Timeout (seconds)</Label>
                    <Input type="number" defaultValue="300" />
                  </div>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Catalog Settings</CardTitle>
                <CardDescription>Product catalog configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Default Product Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="review">Pending Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Auto-approve Price Updates</Label>
                    <Select defaultValue="false">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Enabled</SelectItem>
                        <SelectItem value="false">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Maximum Image Size (MB)</Label>
                    <Input type="number" defaultValue="5" />
                  </div>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Details Modal */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Complete product information and specifications
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              {/* Product Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getProductTypeIcon(selectedProduct.productType)}
                      {selectedProduct.name}
                    </div>
                    <Badge
                      className={getStockStatusColor(
                        selectedProduct.availability.stockStatus,
                      )}
                    >
                      {selectedProduct.availability.stockStatus.replace(
                        "_",
                        " ",
                      )}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {selectedProduct.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <Label>SKU</Label>
                      <p className="font-mono text-sm">{selectedProduct.sku}</p>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <p className="text-sm">
                        {selectedProduct.category.name} /{" "}
                        {selectedProduct.subcategory}
                      </p>
                    </div>
                    <div>
                      <Label>Base Price</Label>
                      <p className="font-medium">
                        {formatCurrency(selectedProduct.pricing.basePrice)}
                      </p>
                    </div>
                    <div>
                      <Label>Tax Rate</Label>
                      <p className="text-sm">
                        {selectedProduct.pricing.taxRate}% (
                        {selectedProduct.pricing.taxCategory})
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              {selectedProduct.specifications && (
                <Card>
                  <CardHeader>
                    <CardTitle>Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {selectedProduct.specifications.volume && (
                        <div>
                          <Label>Volume</Label>
                          <p className="text-sm">
                            {selectedProduct.specifications.volume}
                          </p>
                        </div>
                      )}
                      {selectedProduct.specifications.packaging && (
                        <div>
                          <Label>Packaging</Label>
                          <p className="text-sm">
                            {selectedProduct.specifications.packaging}
                          </p>
                        </div>
                      )}
                      {selectedProduct.specifications.shelfLife && (
                        <div>
                          <Label>Shelf Life</Label>
                          <p className="text-sm">
                            {selectedProduct.specifications.shelfLife} days
                          </p>
                        </div>
                      )}
                      {selectedProduct.specifications.dimensions && (
                        <div>
                          <Label>Dimensions</Label>
                          <p className="text-sm">
                            {selectedProduct.specifications.dimensions.length} ×
                            {selectedProduct.specifications.dimensions.width} ×
                            {selectedProduct.specifications.dimensions.height}{" "}
                            {selectedProduct.specifications.dimensions.unit}(
                            {selectedProduct.specifications.dimensions.weight}{" "}
                            {
                              selectedProduct.specifications.dimensions
                                .weightUnit
                            }
                            )
                          </p>
                        </div>
                      )}
                    </div>

                    {selectedProduct.specifications.ingredients && (
                      <div className="mt-4">
                        <Label>Ingredients</Label>
                        <p className="text-sm mt-1">
                          {selectedProduct.specifications.ingredients.join(
                            ", ",
                          )}
                        </p>
                      </div>
                    )}

                    {selectedProduct.specifications.storageConditions && (
                      <div className="mt-4">
                        <Label>Storage Conditions</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedProduct.specifications.storageConditions.map(
                            (condition, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {condition}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Availability & Pricing */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedProduct.availability.regions.map((region) => (
                        <div
                          key={region.regionId}
                          className="flex items-center justify-between p-2 border rounded-lg"
                        >
                          <span className="text-sm">{region.regionName}</span>
                          <Badge
                            variant={
                              region.isAvailable ? "default" : "secondary"
                            }
                          >
                            {region.isAvailable ? "Available" : "Restricted"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Price Slabs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedProduct.pricing.priceSlabs.map((slab) => (
                        <div key={slab.id} className="p-2 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {slab.name}
                            </span>
                            <Badge variant="outline">
                              {slab.discountValue}
                              {slab.discountType === "percentage"
                                ? "%"
                                : " off"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Min Qty: {slab.minQuantity}
                            {slab.maxQuantity &&
                              ` | Max Qty: ${slab.maxQuantity}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Compliance Information */}
              {selectedProduct.compliance && (
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedProduct.compliance.certifications.length > 0 && (
                        <div>
                          <Label>Certifications</Label>
                          <div className="mt-2 space-y-2">
                            {selectedProduct.compliance.certifications.map(
                              (cert) => (
                                <div
                                  key={cert.id}
                                  className="p-2 bg-green-50 rounded-lg"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      {cert.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      Valid until{" "}
                                      {new Date(
                                        cert.validTo,
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-xs text-green-700">
                                    {cert.issuingBody} |{" "}
                                    {cert.certificationNumber}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {selectedProduct.compliance.warnings.length > 0 && (
                        <div>
                          <Label>Warnings</Label>
                          <div className="mt-2 space-y-1">
                            {selectedProduct.compliance.warnings.map(
                              (warning, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 text-sm text-red-600"
                                >
                                  <AlertTriangle className="h-4 w-4" />
                                  {warning}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {selectedProduct.compliance.allergenInfo.length > 0 && (
                        <div>
                          <Label>Allergen Information</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedProduct.compliance.allergenInfo.map(
                              (allergen, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {allergen}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowProductModal(false)}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleProductAction("edit", selectedProduct)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Product
                </Button>
                <Button
                  onClick={() => handleProductAction("sync", selectedProduct)}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync to Franchisees
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Category Modal */}
      <Dialog
        open={showCreateCategoryModal}
        onOpenChange={setShowCreateCategoryModal}
      >
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new product category to the catalog
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pr-2">
            {/* Basic Information */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <Label>Category Name *</Label>
                <Input
                  value={createCategoryForm.name || ""}
                  onChange={(e) =>
                    setCreateCategoryForm({
                      ...createCategoryForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="Category name"
                />
              </div>
              <div>
                <Label>Parent Category</Label>
                <Select
                  value={createCategoryForm.parentCategoryId || "none"}
                  onValueChange={(value) =>
                    setCreateCategoryForm({
                      ...createCategoryForm,
                      parentCategoryId: value === "none" ? undefined : value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    {mockProductCategories
                      .filter((cat) => cat.level === 1)
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Access Level *</Label>
                <Select
                  value={createCategoryForm.accessLevel || ""}
                  onValueChange={(value) =>
                    setCreateCategoryForm({
                      ...createCategoryForm,
                      accessLevel: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="exclusive">Exclusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={createCategoryForm.displayOrder || ""}
                  onChange={(e) =>
                    setCreateCategoryForm({
                      ...createCategoryForm,
                      displayOrder: parseInt(e.target.value),
                    })
                  }
                  placeholder="1"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea
                value={createCategoryForm.description || ""}
                onChange={(e) =>
                  setCreateCategoryForm({
                    ...createCategoryForm,
                    description: e.target.value,
                  })
                }
                placeholder="Category description"
                rows={2}
              />
            </div>

            {/* Margin Settings */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Margin Settings</h4>
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                <div>
                  <Label className="text-sm">Default %</Label>
                  <Input
                    type="number"
                    value={createCategoryForm.defaultMargin || ""}
                    onChange={(e) =>
                      setCreateCategoryForm({
                        ...createCategoryForm,
                        defaultMargin: parseInt(e.target.value),
                      })
                    }
                    placeholder="20"
                  />
                </div>
                <div>
                  <Label className="text-sm">Min %</Label>
                  <Input
                    type="number"
                    value={createCategoryForm.minMargin || ""}
                    onChange={(e) =>
                      setCreateCategoryForm({
                        ...createCategoryForm,
                        minMargin: parseInt(e.target.value),
                      })
                    }
                    placeholder="15"
                  />
                </div>
                <div>
                  <Label className="text-sm">Max %</Label>
                  <Input
                    type="number"
                    value={createCategoryForm.maxMargin || ""}
                    onChange={(e) =>
                      setCreateCategoryForm({
                        ...createCategoryForm,
                        maxMargin: parseInt(e.target.value),
                      })
                    }
                    placeholder="30"
                  />
                </div>
                <div>
                  <Label className="text-sm">Recommended %</Label>
                  <Input
                    type="number"
                    value={createCategoryForm.recommendedMargin || ""}
                    onChange={(e) =>
                      setCreateCategoryForm({
                        ...createCategoryForm,
                        recommendedMargin: parseInt(e.target.value),
                      })
                    }
                    placeholder="22"
                  />
                </div>
              </div>
            </div>

            {/* Regional Restrictions */}
            <div className="space-y-2">
              <Label className="text-sm">Regional Restrictions</Label>
              <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
                {["dry_states", "age_restricted", "seasonal_only"].map(
                  (restriction) => (
                    <div
                      key={restriction}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={restriction}
                        checked={
                          createCategoryForm.regionalRestrictions?.includes(
                            restriction,
                          ) || false
                        }
                        onChange={(e) => {
                          const current =
                            createCategoryForm.regionalRestrictions || [];
                          const updated = e.target.checked
                            ? [...current, restriction]
                            : current.filter((r) => r !== restriction);
                          setCreateCategoryForm({
                            ...createCategoryForm,
                            regionalRestrictions: updated,
                          });
                        }}
                      />
                      <Label
                        htmlFor={restriction}
                        className="text-sm capitalize"
                      >
                        {restriction.replace("_", " ")}
                      </Label>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={createCategoryForm.isActive !== false}
                onChange={(e) =>
                  setCreateCategoryForm({
                    ...createCategoryForm,
                    isActive: e.target.checked,
                  })
                }
              />
              <Label htmlFor="isActive" className="text-sm">
                Active Category
              </Label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowCreateCategoryModal(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Creating category:", createCategoryForm);
                  const categoryId = `cat_${Date.now()}`;
                  alert(
                    `Category created successfully!\nCategory ID: ${categoryId}\nName: ${createCategoryForm.name}`,
                  );
                  setShowCreateCategoryModal(false);
                  setCreateCategoryForm({});
                }}
                disabled={
                  !createCategoryForm.name || !createCategoryForm.accessLevel
                }
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Product Modal */}
      <Dialog
        open={showCreateProductModal}
        onOpenChange={setShowCreateProductModal}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product in the corporate catalog
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Product Name</Label>
                <Input
                  value={createProductForm.name || ""}
                  onChange={(e) =>
                    setCreateProductForm({
                      ...createProductForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="Product name"
                />
              </div>
              <div>
                <Label>SKU</Label>
                <Input placeholder="Auto-generated or custom SKU" />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={createProductForm.categoryId || ""}
                  onValueChange={(value) =>
                    setCreateProductForm({
                      ...createProductForm,
                      categoryId: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProductCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subcategory</Label>
                <Input
                  value={createProductForm.subcategory || ""}
                  onChange={(e) =>
                    setCreateProductForm({
                      ...createProductForm,
                      subcategory: e.target.value,
                    })
                  }
                  placeholder="Subcategory"
                />
              </div>
              <div>
                <Label>Product Type</Label>
                <Select
                  value={createProductForm.productType || ""}
                  onValueChange={(value: any) =>
                    setCreateProductForm({
                      ...createProductForm,
                      productType: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beverage">Beverage</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="merchandise">Merchandise</SelectItem>
                    <SelectItem value="pos_item">POS Item</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {createProductForm.productType === "beverage" && (
                <div>
                  <Label>Beverage Type</Label>
                  <Select
                    value={createProductForm.beverageType || ""}
                    onValueChange={(value: any) =>
                      setCreateProductForm({
                        ...createProductForm,
                        beverageType: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select beverage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottle">Bottle</SelectItem>
                      <SelectItem value="can">Can</SelectItem>
                      <SelectItem value="crate">Crate</SelectItem>
                      <SelectItem value="keg">Keg</SelectItem>
                      <SelectItem value="pouch">Pouch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <Label>Base Price (₹)</Label>
                <Input
                  type="number"
                  value={createProductForm.basePrice || ""}
                  onChange={(e) =>
                    setCreateProductForm({
                      ...createProductForm,
                      basePrice: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Base price"
                />
              </div>
              <div>
                <Label>Tax Category</Label>
                <Select
                  value={createProductForm.taxCategory || ""}
                  onValueChange={(value) =>
                    setCreateProductForm({
                      ...createProductForm,
                      taxCategory: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tax category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GST_0">GST 0%</SelectItem>
                    <SelectItem value="GST_5">GST 5%</SelectItem>
                    <SelectItem value="GST_12">GST 12%</SelectItem>
                    <SelectItem value="GST_18">GST 18%</SelectItem>
                    <SelectItem value="GST_28">GST 28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={createProductForm.description || ""}
                onChange={(e) =>
                  setCreateProductForm({
                    ...createProductForm,
                    description: e.target.value,
                  })
                }
                placeholder="Product description"
                rows={3}
              />
            </div>

            <Tabs defaultValue="specifications" className="space-y-4">
              <TabsList>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Volume/Size</Label>
                    <Input placeholder="e.g., 500ml, 1kg, etc." />
                  </div>
                  <div>
                    <Label>Packaging</Label>
                    <Input placeholder="e.g., Plastic Bottle, Can, etc." />
                  </div>
                  <div>
                    <Label>Shelf Life (days)</Label>
                    <Input type="number" placeholder="365" />
                  </div>
                  <div>
                    <Label>Minimum Order Quantity</Label>
                    <Input
                      type="number"
                      value={createProductForm.minimumOrderQuantity || ""}
                      onChange={(e) =>
                        setCreateProductForm({
                          ...createProductForm,
                          minimumOrderQuantity: parseInt(e.target.value),
                        })
                      }
                      placeholder="24"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <div>
                  <Label>Price Slabs</Label>
                  <div className="text-sm text-muted-foreground mb-2">
                    Define quantity-based pricing tiers
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Price Slab
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="availability" className="space-y-4">
                <div>
                  <Label>Available Regions</Label>
                  <div className="grid gap-2 mt-2">
                    {[
                      "Maharashtra",
                      "Karnataka",
                      "Gujarat",
                      "Rajasthan",
                      "Delhi",
                      "Tamil Nadu",
                    ].map((region) => (
                      <div key={region} className="flex items-center space-x-2">
                        <input type="checkbox" id={region} defaultChecked />
                        <Label htmlFor={region} className="text-sm">
                          {region}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Franchise Types</Label>
                  <div className="grid gap-2 mt-2">
                    {["retail", "distribution", "warehouse", "hybrid"].map(
                      (type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <input type="checkbox" id={type} defaultChecked />
                          <Label htmlFor={type} className="text-sm capitalize">
                            {type}
                          </Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowCreateProductModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Creating product:", createProductForm);
                  alert("Product created successfully!");
                  setShowCreateProductModal(false);
                  setCreateProductForm({});
                }}
                disabled={
                  !createProductForm.name ||
                  !createProductForm.categoryId ||
                  !createProductForm.basePrice
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Product
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sync Modal */}
      <Dialog open={showSyncModal} onOpenChange={setShowSyncModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Catalog Sync</DialogTitle>
            <DialogDescription>
              Synchronize product catalog with franchisees
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Sync Type</Label>
              <Select
                value={syncRequest.syncType || ""}
                onValueChange={(value: any) =>
                  setSyncRequest({ ...syncRequest, syncType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sync type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Catalog Sync</SelectItem>
                  <SelectItem value="incremental">
                    Incremental Updates
                  </SelectItem>
                  <SelectItem value="category">Specific Categories</SelectItem>
                  <SelectItem value="product">Specific Products</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Priority</Label>
              <Select
                value={syncRequest.priority || "normal"}
                onValueChange={(value: any) =>
                  setSyncRequest({ ...syncRequest, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="notifyOnCompletion"
                checked={syncRequest.notifyOnCompletion || false}
                onChange={(e) =>
                  setSyncRequest({
                    ...syncRequest,
                    notifyOnCompletion: e.target.checked,
                  })
                }
              />
              <Label htmlFor="notifyOnCompletion">Notify on completion</Label>
            </div>

            <div>
              <Label>Target Franchisees</Label>
              <Textarea
                placeholder="Enter franchisee IDs (comma separated) or leave empty for all"
                value={syncRequest.franchiseeIds?.join(", ") || ""}
                onChange={(e) =>
                  setSyncRequest({
                    ...syncRequest,
                    franchiseeIds: e.target.value
                      .split(",")
                      .map((id) => id.trim())
                      .filter((id) => id),
                  })
                }
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowSyncModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCatalogSync}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Start Sync
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
