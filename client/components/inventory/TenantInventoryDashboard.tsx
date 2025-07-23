import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AnimatedIcon, PulsingDot } from '@/components/ui/animated-icons';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import {
  Package,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Boxes,
  ShoppingCart,
  Truck,
  Clock,
  DollarSign,
  Users,
  MapPin,
  Building,
  Eye,
  Edit,
  Trash2,
  FileText,
  Download,
  Upload,
  Settings,
  Bell,
  Calendar,
  Target,
  Activity,
  Warehouse,
  Package2,
  Scan,
  RefreshCw,
  ArrowUpDown,
  MoreHorizontal,
  Star,
  AlertCircle,
  XCircle,
  Zap
} from 'lucide-react';
import {
  TenantInventoryConfig,
  TenantInventoryItem,
  TenantWarehouse,
  TenantSupplier,
  InventoryDashboardMetrics,
  TenantInventoryAlert
} from './types';
import {
  getTenantInventoryConfig,
  getTenantInventoryItems,
  getTenantWarehouses,
  getTenantSuppliers,
  getTenantDashboardMetrics,
  getIndustryConfig
} from './data';

interface TenantInventoryDashboardProps {
  tenantId: string;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const TenantInventoryDashboard = ({
  tenantId,
  currentTab,
  onTabChange
}: TenantInventoryDashboardProps) => {
  // Data state
  const [config, setConfig] = useState<TenantInventoryConfig | null>(null);
  const [items, setItems] = useState<TenantInventoryItem[]>([]);
  const [warehouses, setWarehouses] = useState<TenantWarehouse[]>([]);
  const [suppliers, setSuppliers] = useState<TenantSupplier[]>([]);
  const [metrics, setMetrics] = useState<InventoryDashboardMetrics | null>(null);

  // UI state
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isAddWarehouseDialogOpen, setIsAddWarehouseDialogOpen] = useState(false);
  const [isAddSupplierDialogOpen, setIsAddSupplierDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Form state
  const [itemFormData, setItemFormData] = useState({
    itemCode: '',
    itemName: '',
    description: '',
    category: '',
    unitPrice: 0,
    currentStock: 0,
    minStockLevel: 0,
    maxStockLevel: 0,
    unit: '',
    primaryLocationId: ''
  });

  const [warehouseFormData, setWarehouseFormData] = useState({
    warehouseCode: '',
    warehouseName: '',
    description: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    totalArea: 0,
    maxWeight: 0,
    managerName: '',
    managerPhone: ''
  });

  const [supplierFormData, setSupplierFormData] = useState({
    supplierCode: '',
    supplierName: '',
    supplierType: 'vendor',
    primaryContact: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    categories: [] as string[],
    taxId: '',
    creditRating: 'good'
  });

  // Load tenant data
  useEffect(() => {
    const tenantConfig = getTenantInventoryConfig(tenantId);
    const tenantItems = getTenantInventoryItems(tenantId);
    const tenantWarehouses = getTenantWarehouses(tenantId);
    const tenantSuppliers = getTenantSuppliers(tenantId);
    const tenantMetrics = getTenantDashboardMetrics(tenantId);

    setConfig(tenantConfig || null);
    setItems(tenantItems);
    setWarehouses(tenantWarehouses);
    setSuppliers(tenantSuppliers);
    setMetrics(tenantMetrics);
  }, [tenantId]);

  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || item.primaryLocationId === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Get unique categories for filter
  const categories = [...new Set(items.map(item => item.category))];

  // Handle add item
  const handleAddItem = () => {
    const newItem: TenantInventoryItem = {
      id: `item_${Date.now()}`,
      tenantId,
      itemCode: itemFormData.itemCode,
      itemName: itemFormData.itemName,
      description: itemFormData.description,
      category: itemFormData.category,
      subCategory: '',
      sku: `${itemFormData.itemCode}-${Date.now()}`,

      unitPrice: itemFormData.unitPrice,
      currency: config?.defaultCurrency || 'INR',
      costPrice: itemFormData.unitPrice * 0.9, // Assuming 10% margin
      valuationMethod: 'FIFO',

      currentStock: itemFormData.currentStock,
      reservedStock: 0,
      availableStock: itemFormData.currentStock,
      unit: itemFormData.unit,

      minStockLevel: itemFormData.minStockLevel,
      maxStockLevel: itemFormData.maxStockLevel,
      reorderPoint: itemFormData.minStockLevel + 10,
      reorderQuantity: Math.round((itemFormData.maxStockLevel - itemFormData.minStockLevel) * 0.7),

      primaryLocationId: itemFormData.primaryLocationId,
      alternateLocations: [],

      isActive: true,
      isTrackable: true,
      isConsumable: true,
      isForSale: false,

      createdAt: new Date().toISOString(),
      createdBy: 'current_user',
      lastUpdatedAt: new Date().toISOString(),
      lastUpdatedBy: 'current_user',

      images: [],
      documents: [],
      customFields: {}
    };

    setItems(prev => [...prev, newItem]);
    setIsAddItemDialogOpen(false);
    resetItemForm();
  };

  const resetItemForm = () => {
    setItemFormData({
      itemCode: '',
      itemName: '',
      description: '',
      category: '',
      unitPrice: 0,
      currentStock: 0,
      minStockLevel: 0,
      maxStockLevel: 0,
      unit: '',
      primaryLocationId: ''
    });
  };

  // Handle add warehouse
  const handleAddWarehouse = () => {
    const newWarehouse: TenantWarehouse = {
      id: `warehouse_${Date.now()}`,
      tenantId,
      warehouseCode: warehouseFormData.warehouseCode,
      warehouseName: warehouseFormData.warehouseName,
      description: warehouseFormData.description,
      address: {
        addressLine1: warehouseFormData.addressLine1,
        addressLine2: warehouseFormData.addressLine2,
        city: warehouseFormData.city,
        state: warehouseFormData.state,
        pincode: warehouseFormData.pincode,
        country: warehouseFormData.country
      },
      capacity: {
        totalArea: warehouseFormData.totalArea,
        unit: 'sqft',
        maxWeight: warehouseFormData.maxWeight,
        weightUnit: 'KG'
      },
      manager: {
        name: warehouseFormData.managerName,
        phone: warehouseFormData.managerPhone,
        email: `${warehouseFormData.managerName.toLowerCase().replace(' ', '.')}@${config?.tenantName.toLowerCase().replace(' ', '')}.com`
      },
      zones: [
        {
          id: `zone_${Date.now()}_1`,
          zoneName: 'Zone A',
          zoneType: 'storage',
          capacity: Math.floor(warehouseFormData.totalArea * 0.6),
          currentUtilization: 0,
          rackConfiguration: {
            totalRacks: Math.floor(warehouseFormData.totalArea / 100),
            racksPerRow: 10,
            shelvesPerRack: 5
          }
        },
        {
          id: `zone_${Date.now()}_2`,
          zoneName: 'Zone B',
          zoneType: 'loading',
          capacity: Math.floor(warehouseFormData.totalArea * 0.4),
          currentUtilization: 0,
          rackConfiguration: {
            totalRacks: Math.floor(warehouseFormData.totalArea / 200),
            racksPerRow: 5,
            shelvesPerRack: 3
          }
        }
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
      createdBy: 'current_user'
    };

    setWarehouses(prev => [...prev, newWarehouse]);
    setIsAddWarehouseDialogOpen(false);
    resetWarehouseForm();
  };

  const resetWarehouseForm = () => {
    setWarehouseFormData({
      warehouseCode: '',
      warehouseName: '',
      description: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      totalArea: 0,
      maxWeight: 0,
      managerName: '',
      managerPhone: ''
    });
  };

  // Handle add supplier
  const handleAddSupplier = () => {
    const newSupplier: TenantSupplier = {
      id: `supplier_${Date.now()}`,
      tenantId,
      supplierCode: supplierFormData.supplierCode,
      supplierName: supplierFormData.supplierName,
      supplierType: supplierFormData.supplierType as 'vendor' | 'manufacturer' | 'distributor' | 'contractor',
      contactDetails: {
        primaryContact: supplierFormData.primaryContact,
        email: supplierFormData.email,
        phone: supplierFormData.phone,
        address: {
          addressLine1: supplierFormData.addressLine1,
          addressLine2: supplierFormData.addressLine2,
          city: supplierFormData.city,
          state: supplierFormData.state,
          pincode: supplierFormData.pincode,
          country: supplierFormData.country
        }
      },
      categories: supplierFormData.categories,
      performance: {
        deliveryRating: 4.0,
        qualityRating: 4.0,
        responseTime: 24,
        onTimeDeliveryPercent: 85,
        defectRate: 2.5,
        leadTimeVariance: 10
      },
      financials: {
        creditLimit: 500000,
        creditPeriod: 30,
        paymentTerms: 'NET_30',
        taxId: supplierFormData.taxId
      },
      creditRating: supplierFormData.creditRating as 'excellent' | 'good' | 'average' | 'poor',
      isActive: true,
      createdAt: new Date().toISOString(),
      createdBy: 'current_user'
    };

    setSuppliers(prev => [...prev, newSupplier]);
    setIsAddSupplierDialogOpen(false);
    resetSupplierForm();
  };

  const resetSupplierForm = () => {
    setSupplierFormData({
      supplierCode: '',
      supplierName: '',
      supplierType: 'vendor',
      primaryContact: '',
      email: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      categories: [],
      taxId: '',
      creditRating: 'good'
    });
  };

  const getStockStatusBadge = (item: TenantInventoryItem) => {
    if (item.currentStock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (item.currentStock <= item.minStockLevel) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
    }
    return <Badge variant="default" className="bg-green-100 text-green-800">In Stock</Badge>;
  };

  if (!config || !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading inventory data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <p className="text-muted-foreground">
            {config.tenantName} • {config.industryType.replace('_', ' ').toUpperCase()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogDescription>
                  Add a new item to your inventory catalog
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="itemCode">Item Code</Label>
                    <Input
                      id="itemCode"
                      value={itemFormData.itemCode}
                      onChange={(e) => setItemFormData(prev => ({ ...prev, itemCode: e.target.value }))}
                      placeholder="Enter item code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input
                      id="itemName"
                      value={itemFormData.itemName}
                      onChange={(e) => setItemFormData(prev => ({ ...prev, itemName: e.target.value }))}
                      placeholder="Enter item name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={itemFormData.description}
                    onChange={(e) => setItemFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter item description"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={itemFormData.category} onValueChange={(value) =>
                      setItemFormData(prev => ({ ...prev, category: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {config.customCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={itemFormData.unit} onValueChange={(value) =>
                      setItemFormData(prev => ({ ...prev, unit: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pieces">Pieces</SelectItem>
                        <SelectItem value="KG">KG</SelectItem>
                        <SelectItem value="Bags">Bags</SelectItem>
                        <SelectItem value="Tons">Tons</SelectItem>
                        <SelectItem value="Boxes">Boxes</SelectItem>
                        <SelectItem value="Meters">Meters</SelectItem>
                        <SelectItem value="Liters">Liters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="unitPrice">Unit Price ({config.defaultCurrency})</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      value={itemFormData.unitPrice}
                      onChange={(e) => setItemFormData(prev => ({ ...prev, unitPrice: Number(e.target.value) }))}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentStock">Current Stock</Label>
                    <Input
                      id="currentStock"
                      type="number"
                      value={itemFormData.currentStock}
                      onChange={(e) => setItemFormData(prev => ({ ...prev, currentStock: Number(e.target.value) }))}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minStockLevel">Min Stock Level</Label>
                    <Input
                      id="minStockLevel"
                      type="number"
                      value={itemFormData.minStockLevel}
                      onChange={(e) => setItemFormData(prev => ({ ...prev, minStockLevel: Number(e.target.value) }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxStockLevel">Max Stock Level</Label>
                    <Input
                      id="maxStockLevel"
                      type="number"
                      value={itemFormData.maxStockLevel}
                      onChange={(e) => setItemFormData(prev => ({ ...prev, maxStockLevel: Number(e.target.value) }))}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="primaryLocationId">Primary Location</Label>
                  <Select value={itemFormData.primaryLocationId} onValueChange={(value) =>
                    setItemFormData(prev => ({ ...prev, primaryLocationId: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map(warehouse => (
                        <SelectItem key={warehouse.id} value={warehouse.id}>
                          {warehouse.warehouseName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddItem}>
                    Add Item
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <AnimatedCounter value={metrics.totalItems} className="text-2xl font-bold" />
              </div>
              <AnimatedIcon icon={Package} className="text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <div className="text-2xl font-bold">
                  {(metrics.totalValue / 100000).toFixed(1)}L
                </div>
                <p className="text-xs text-muted-foreground">{config.defaultCurrency}</p>
              </div>
              <AnimatedIcon icon={DollarSign} className="text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                <AnimatedCounter value={metrics.lowStockItems} className="text-2xl font-bold text-yellow-600" />
                <p className="text-xs text-yellow-600">Needs attention</p>
              </div>
              <AnimatedIcon icon={AlertTriangle} className="text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                <AnimatedCounter value={metrics.outOfStockItems} className="text-2xl font-bold text-red-600" />
                <p className="text-xs text-red-600">Critical</p>
              </div>
              <AnimatedIcon icon={XCircle} className="text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Turnover</p>
                <div className="text-2xl font-bold">{metrics.averageStockTurnover.toFixed(1)}x</div>
                <p className="text-xs text-emerald-600">Per year</p>
              </div>
              <AnimatedIcon icon={TrendingUp} className="text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={currentTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Category Distribution */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Category Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.categoryDistribution.map((category, index) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{category.category}</span>
                        <span className="font-medium">{category.percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{category.itemCount} items</span>
                        <span>₹{(category.totalValue / 100000).toFixed(1)}L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Stock Aging Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.stockAging.map((aging, index) => (
                    <div key={aging.ageGroup} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{aging.ageGroup}</span>
                        <span className="font-medium">{aging.percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={aging.percentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{aging.itemCount} items</span>
                        <span>₹{(aging.value / 100000).toFixed(1)}L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Moving Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Moving Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Code</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Turnover</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metrics.topMovingItems.map((item) => (
                    <TableRow key={item.itemId}>
                      <TableCell className="font-medium">{item.itemCode}</TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{item.value.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="default">{item.turnoverRatio.toFixed(1)}x</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {warehouses.map(warehouse => (
                  <SelectItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.warehouseName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Items Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.itemName}</div>
                        <div className="text-sm text-muted-foreground">{item.itemCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.currentStock.toLocaleString()} {item.unit}</div>
                        <div className="text-sm text-muted-foreground">
                          Min: {item.minStockLevel} • Max: {item.maxStockLevel}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStockStatusBadge(item)}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{item.unitPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{(item.currentStock * item.unitPrice).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="stock" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stock Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Critical</span>
                    <Badge variant="destructive">{metrics.alertsSummary.critical}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Priority</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      {metrics.alertsSummary.high}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Medium Priority</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {metrics.alertsSummary.medium}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Low Priority</span>
                    <Badge variant="outline">{metrics.alertsSummary.low}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Warehouse Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{metrics.warehouseUtilization.toFixed(1)}%</div>
                    <p className="text-sm text-muted-foreground">Overall Utilization</p>
                  </div>
                  <Progress value={metrics.warehouseUtilization} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Used Space</span>
                    <span>Available Space</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Supplier Performance</span>
                    <span className="font-medium">{metrics.supplierPerformance.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.supplierPerformance} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cost Variance</span>
                    <span className={`font-medium ${metrics.costVariance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metrics.costVariance > 0 ? '+' : ''}{metrics.costVariance.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="warehouses" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Warehouse Management</h3>
            <Dialog open={isAddWarehouseDialogOpen} onOpenChange={setIsAddWarehouseDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Warehouse
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader>
                  <DialogTitle>Add New Warehouse</DialogTitle>
                  <DialogDescription>
                    Add a new warehouse to your inventory network
                  </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto px-1">
                  <div className="space-y-4 pb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="warehouseCode">Warehouse Code</Label>
                        <Input
                          id="warehouseCode"
                          value={warehouseFormData.warehouseCode}
                          onChange={(e) => setWarehouseFormData(prev => ({ ...prev, warehouseCode: e.target.value }))}
                          placeholder="WH001"
                        />
                      </div>
                      <div>
                        <Label htmlFor="warehouseName">Warehouse Name</Label>
                        <Input
                          id="warehouseName"
                          value={warehouseFormData.warehouseName}
                          onChange={(e) => setWarehouseFormData(prev => ({ ...prev, warehouseName: e.target.value }))}
                          placeholder="Main Warehouse"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="warehouseDescription">Description</Label>
                      <Textarea
                        id="warehouseDescription"
                        value={warehouseFormData.description}
                        onChange={(e) => setWarehouseFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Warehouse description"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Address</h4>
                      <div>
                        <Label htmlFor="addressLine1">Address Line 1</Label>
                        <Input
                          id="addressLine1"
                          value={warehouseFormData.addressLine1}
                          onChange={(e) => setWarehouseFormData(prev => ({ ...prev, addressLine1: e.target.value }))}
                          placeholder="Street address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="addressLine2">Address Line 2</Label>
                        <Input
                          id="addressLine2"
                          value={warehouseFormData.addressLine2}
                          onChange={(e) => setWarehouseFormData(prev => ({ ...prev, addressLine2: e.target.value }))}
                          placeholder="Area, landmark"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={warehouseFormData.city}
                            onChange={(e) => setWarehouseFormData(prev => ({ ...prev, city: e.target.value }))}
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={warehouseFormData.state}
                            onChange={(e) => setWarehouseFormData(prev => ({ ...prev, state: e.target.value }))}
                            placeholder="State"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input
                            id="pincode"
                            value={warehouseFormData.pincode}
                            onChange={(e) => setWarehouseFormData(prev => ({ ...prev, pincode: e.target.value }))}
                            placeholder="000000"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Capacity</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="totalArea">Total Area (sq ft)</Label>
                          <Input
                            id="totalArea"
                            type="number"
                            value={warehouseFormData.totalArea}
                            onChange={(e) => setWarehouseFormData(prev => ({ ...prev, totalArea: Number(e.target.value) }))}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="maxWeight">Max Weight (KG)</Label>
                          <Input
                            id="maxWeight"
                            type="number"
                            value={warehouseFormData.maxWeight}
                            onChange={(e) => setWarehouseFormData(prev => ({ ...prev, maxWeight: Number(e.target.value) }))}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Manager Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="managerName">Manager Name</Label>
                          <Input
                            id="managerName"
                            value={warehouseFormData.managerName}
                            onChange={(e) => setWarehouseFormData(prev => ({ ...prev, managerName: e.target.value }))}
                            placeholder="Manager name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="managerPhone">Manager Phone</Label>
                          <Input
                            id="managerPhone"
                            value={warehouseFormData.managerPhone}
                            onChange={(e) => setWarehouseFormData(prev => ({ ...prev, managerPhone: e.target.value }))}
                            placeholder="+91 9999999999"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsAddWarehouseDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddWarehouse}>
                    Add Warehouse
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {warehouses.map((warehouse) => (
              <Card key={warehouse.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{warehouse.warehouseName}</CardTitle>
                    <Badge variant={warehouse.isActive ? 'default' : 'secondary'}>
                      {warehouse.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <CardDescription>{warehouse.warehouseCode}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {warehouse.address.city}, {warehouse.address.state}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Area</p>
                        <p className="font-medium">{warehouse.capacity.totalArea.toLocaleString()} {warehouse.capacity.unit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Capacity</p>
                        <p className="font-medium">{warehouse.capacity.maxWeight} {warehouse.capacity.weightUnit}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Utilization</span>
                        <span>
                          {((warehouse.zones.reduce((sum, zone) => sum + zone.currentUtilization, 0) /
                            warehouse.zones.reduce((sum, zone) => sum + zone.capacity, 0)) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={(warehouse.zones.reduce((sum, zone) => sum + zone.currentUtilization, 0) /
                               warehouse.zones.reduce((sum, zone) => sum + zone.capacity, 0)) * 100}
                        className="h-2"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{warehouse.zones.length} zones</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Supplier Management</h3>
            <Dialog open={isAddSupplierDialogOpen} onOpenChange={setIsAddSupplierDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Supplier
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader>
                  <DialogTitle>Add New Supplier</DialogTitle>
                  <DialogDescription>
                    Add a new supplier to your vendor network
                  </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto px-1">
                  <div className="space-y-4 pb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="supplierCode">Supplier Code</Label>
                        <Input
                          id="supplierCode"
                          value={supplierFormData.supplierCode}
                          onChange={(e) => setSupplierFormData(prev => ({ ...prev, supplierCode: e.target.value }))}
                          placeholder="SUP001"
                        />
                      </div>
                      <div>
                        <Label htmlFor="supplierName">Supplier Name</Label>
                        <Input
                          id="supplierName"
                          value={supplierFormData.supplierName}
                          onChange={(e) => setSupplierFormData(prev => ({ ...prev, supplierName: e.target.value }))}
                          placeholder="Supplier name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="supplierType">Supplier Type</Label>
                        <Select value={supplierFormData.supplierType} onValueChange={(value) =>
                          setSupplierFormData(prev => ({ ...prev, supplierType: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vendor">Vendor</SelectItem>
                            <SelectItem value="manufacturer">Manufacturer</SelectItem>
                            <SelectItem value="distributor">Distributor</SelectItem>
                            <SelectItem value="contractor">Contractor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="creditRating">Credit Rating</Label>
                        <Select value={supplierFormData.creditRating} onValueChange={(value) =>
                          setSupplierFormData(prev => ({ ...prev, creditRating: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="average">Average</SelectItem>
                            <SelectItem value="poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Contact Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="primaryContact">Primary Contact</Label>
                          <Input
                            id="primaryContact"
                            value={supplierFormData.primaryContact}
                            onChange={(e) => setSupplierFormData(prev => ({ ...prev, primaryContact: e.target.value }))}
                            placeholder="Contact person name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={supplierFormData.email}
                            onChange={(e) => setSupplierFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={supplierFormData.phone}
                          onChange={(e) => setSupplierFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 9999999999"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Address</h4>
                      <div>
                        <Label htmlFor="supplierAddressLine1">Address Line 1</Label>
                        <Input
                          id="supplierAddressLine1"
                          value={supplierFormData.addressLine1}
                          onChange={(e) => setSupplierFormData(prev => ({ ...prev, addressLine1: e.target.value }))}
                          placeholder="Street address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="supplierAddressLine2">Address Line 2</Label>
                        <Input
                          id="supplierAddressLine2"
                          value={supplierFormData.addressLine2}
                          onChange={(e) => setSupplierFormData(prev => ({ ...prev, addressLine2: e.target.value }))}
                          placeholder="Area, landmark"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="supplierCity">City</Label>
                          <Input
                            id="supplierCity"
                            value={supplierFormData.city}
                            onChange={(e) => setSupplierFormData(prev => ({ ...prev, city: e.target.value }))}
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <Label htmlFor="supplierState">State</Label>
                          <Input
                            id="supplierState"
                            value={supplierFormData.state}
                            onChange={(e) => setSupplierFormData(prev => ({ ...prev, state: e.target.value }))}
                            placeholder="State"
                          />
                        </div>
                        <div>
                          <Label htmlFor="supplierPincode">Pincode</Label>
                          <Input
                            id="supplierPincode"
                            value={supplierFormData.pincode}
                            onChange={(e) => setSupplierFormData(prev => ({ ...prev, pincode: e.target.value }))}
                            placeholder="000000"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="taxId">Tax ID / GST Number</Label>
                      <Input
                        id="taxId"
                        value={supplierFormData.taxId}
                        onChange={(e) => setSupplierFormData(prev => ({ ...prev, taxId: e.target.value }))}
                        placeholder="GST/TAX ID"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsAddSupplierDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddSupplier}>
                    Add Supplier
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Credit Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{supplier.supplierName}</div>
                        <div className="text-sm text-muted-foreground">{supplier.supplierCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {supplier.supplierType.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {supplier.categories.slice(0, 2).map(category => (
                          <Badge key={category} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                        {supplier.categories.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{supplier.categories.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{supplier.performance.deliveryRating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={supplier.creditRating === 'excellent' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {supplier.creditRating}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={supplier.isActive ? 'default' : 'secondary'}>
                        {supplier.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Stock Summary
                </CardTitle>
                <CardDescription>Current stock levels and valuations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Movement Analysis
                </CardTitle>
                <CardDescription>Stock movements and consumption patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Supplier Performance
                </CardTitle>
                <CardDescription>Delivery and quality metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Valuation Report
                </CardTitle>
                <CardDescription>Inventory valuation by method</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Aging Analysis
                </CardTitle>
                <CardDescription>Stock aging and dead stock analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  ABC Analysis
                </CardTitle>
                <CardDescription>Item classification by value and movement</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TenantInventoryDashboard;
