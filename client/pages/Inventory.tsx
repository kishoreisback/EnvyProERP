import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  ArrowLeft,
  Package,
  Plus,
  Building2,
  Users,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Warehouse,
  ShoppingCart,
  BarChart3,
  Globe,
  Star,
  Clock,
  Target,
  Boxes,
  Truck,
  Activity,
  MapPin,
  Building,
  Crown,
  Shield,
  Eye,
  ChevronRight
} from "lucide-react";
import {
  PermissionProvider,
  usePermissions,
} from "@/components/user-management/PermissionProvider";
import { TenantUser } from "@/components/user-management/types";
import { 
  inventoryAvailableTenants,
  getTenantInventoryConfig,
  getTenantDashboardMetrics 
} from "@/components/inventory/data";

// Create Super Admin user for demonstration
const createSuperAdminUser = (): TenantUser => ({
  id: "user_super_001",
  email: "admin@buildsaathi.com",
  firstName: "Super",
  lastName: "Admin",
  role: "super_admin",
  tenantId: "system",
  department: "IT",
  roleId: "super_admin",
  permissions: ["*"],
  isActive: true,
  lastLogin: new Date().toISOString(),
  createdAt: "2024-01-01T00:00:00Z",
  profile: {
    bio: "System Super Administrator with access to all tenants",
    skills: ["System Administration", "Multi-tenant Management"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin",
    phone: "+91-9999999999",
    location: "Mumbai, India",
    joinDate: "2024-01-01",
    department: "IT",
    designation: "Super Administrator",
    employeeId: "EMP-SUPER-001",
    reportingManager: "CEO",
    workLocation: "Head Office",
    workType: "Full-time"
  }
});

export default function Inventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTenant, setSelectedTenant] = useState<string>('tenant_build_001');
  
  // Get current user - in a real app, this would come from auth context
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const isSuperAdmin =
    currentUser?.role === "super_admin" ||
    currentUser?.email === "admin@buildsaathi.com";

  const userForProvider = isSuperAdmin ? createSuperAdminUser() : currentUser;

  // Get tenant data
  const tenantData = inventoryAvailableTenants.find(t => t.id === selectedTenant) || inventoryAvailableTenants[0];
  const tenantConfig = getTenantInventoryConfig(selectedTenant);
  const tenantMetrics = getTenantDashboardMetrics(selectedTenant);

  useEffect(() => {
    // Auto-select tenant based on user if not super admin
    if (!isSuperAdmin && currentUser?.tenantId) {
      setSelectedTenant(currentUser.tenantId);
    }
  }, [currentUser, isSuperAdmin]);

  return (
    <PermissionProvider
      user={userForProvider}
      tenantId={userForProvider?.tenantId || "system"}
    >
      <MainLayout>
        <div className="space-y-6">
          {/* Back Navigation */}
          <div className="flex items-center gap-4 animate-slideInLeft">
            <Button variant="outline" className="hover-lift" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          {/* Tenant Selection Header - Only for Super Admin */}
          {isSuperAdmin && (
            <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent animate-fadeInUp">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Super Admin View</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                      Multi-Tenant Access
                    </Badge>
                  </div>
                  <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Select Tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      {inventoryAvailableTenants.map((tenant) => (
                        <SelectItem key={tenant.id} value={tenant.id}>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${tenant.color}`} />
                            {tenant.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tenant Details Card - Only for Super Admin */}
          {isSuperAdmin && (
            <Card className="animate-fadeInUp border-dashed border-2 border-blue-200 bg-blue-50/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg ${tenantData.color} flex items-center justify-center`}>
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{tenantData.name}</h3>
                        <p className="text-sm text-gray-600">{tenantData.type}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {tenantData.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {tenantData.employees} employees
                          </span>
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            Est. {tenantData.established}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-2">Industry: {tenantConfig?.industryType.replace('_', ' ').toUpperCase()}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-blue-600">{tenantMetrics?.totalItems || 0}</div>
                          <div className="text-xs text-gray-500">Items</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-emerald-600">
                            ₹{((tenantMetrics?.totalValue || 0) / 100000).toFixed(1)}L
                          </div>
                          <div className="text-xs text-gray-500">Value</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-orange-600">{tenantMetrics?.lowStockItems || 0}</div>
                          <div className="text-xs text-gray-500">Low Stock</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to={`/inventory/tenant/overview?tenant=${selectedTenant}`}>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Building2 className="h-4 w-4 mr-2" />
                      Open Tenant Inventory
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Current Tenant Info */}
          <div className="flex items-center justify-between animate-slideInDown">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${tenantData.color}`} />
                <h1 className="text-3xl font-bold gradient-text">
                  {isSuperAdmin ? `${tenantData.name} - Inventory` : "Inventory Management"}
                </h1>
                <GlowingOrb className="animate-pulse" />
                {isSuperAdmin && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    <Crown className="h-3 w-3 mr-1" />
                    Super Admin
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Package}
                  animation="glow"
                  className="text-primary"
                />
                <span className="text-muted-foreground">
                  {isSuperAdmin
                    ? `Managing ${tenantData.name} - ${tenantData.type} Inventory`
                    : "Comprehensive inventory control and management"}
                </span>
              </div>
            </div>
            <Button
              onClick={() => navigate(`/inventory/tenant/items?tenant=${selectedTenant}`)}
              className="hover-lift"
            >
              <Plus className="h-4 w-4 mr-2 inline" />
              Add Item
            </Button>
          </div>

          {/* Inventory Module Overview */}
          <Card className="hover-lift animate-fadeInUp relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-primary/5" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Package}
                  animation="float"
                  className="text-primary"
                />
                Inventory Management System
                <Badge variant="outline" className="ml-auto">
                  {tenantConfig?.industryType.replace('_', ' ').toUpperCase()}
                </Badge>
              </CardTitle>
              <CardDescription>
                Complete inventory control solution for {tenantData.type}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Inventory Modules */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link to={`/inventory/tenant/overview?tenant=${selectedTenant}`} className="block">
                  <Card className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AnimatedIcon
                          icon={BarChart3}
                          animation="pulse"
                          className="text-primary"
                        />
                        <h3 className="font-semibold">Dashboard & Analytics</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Real-time insights and comprehensive reports
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-primary font-medium">View Dashboard</span>
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to={`/inventory/tenant/items?tenant=${selectedTenant}`} className="block">
                  <Card className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AnimatedIcon
                          icon={Package}
                          animation="bounce"
                          className="text-emerald-600"
                        />
                        <h3 className="font-semibold">Items Management</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Complete catalog and item lifecycle management
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-emerald-600 font-medium">Manage Items</span>
                        <ChevronRight className="h-4 w-4 text-emerald-600" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to={`/inventory/tenant/stock?tenant=${selectedTenant}`} className="block">
                  <Card className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AnimatedIcon
                          icon={Boxes}
                          animation="float"
                          className="text-blue-600"
                        />
                        <h3 className="font-semibold">Stock Tracking</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Real-time stock levels and movement tracking
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-600 font-medium">Track Stock</span>
                        <ChevronRight className="h-4 w-4 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to={`/inventory/tenant/warehouses?tenant=${selectedTenant}`} className="block">
                  <Card className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AnimatedIcon
                          icon={Warehouse}
                          animation="glow"
                          className="text-purple-600"
                        />
                        <h3 className="font-semibold">Warehouse Management</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Multi-location inventory and zone management
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-600 font-medium">Manage Warehouses</span>
                        <ChevronRight className="h-4 w-4 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to={`/inventory/tenant/suppliers?tenant=${selectedTenant}`} className="block">
                  <Card className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AnimatedIcon
                          icon={Users}
                          animation="bounce"
                          className="text-orange-600"
                        />
                        <h3 className="font-semibold">Supplier Management</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Vendor relations and performance tracking
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-orange-600 font-medium">Manage Suppliers</span>
                        <ChevronRight className="h-4 w-4 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to={`/inventory/tenant/reports?tenant=${selectedTenant}`} className="block">
                  <Card className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AnimatedIcon
                          icon={BarChart3}
                          animation="pulse"
                          className="text-green-600"
                        />
                        <h3 className="font-semibold">Reports & Analytics</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Comprehensive reporting and business insights
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600 font-medium">View Reports</span>
                        <ChevronRight className="h-4 w-4 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              {/* Advanced Features - Show only if enabled for tenant */}
              {tenantConfig?.enabledModules.includes('mobile_scanning') && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <AnimatedIcon
                      icon={Star}
                      animation="glow"
                      className="text-yellow-500"
                    />
                    Advanced Features
                  </h4>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border p-3 hover-lift animate-fadeInUp group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-center gap-2 mb-1">
                        <AnimatedIcon
                          icon={Activity}
                          animation="pulse"
                          className="text-primary"
                        />
                        <span className="font-medium text-sm">Mobile Scanning</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Barcode and QR code scanning capabilities
                      </p>
                    </div>

                    {tenantConfig?.serialNumberTracking && (
                      <div className="rounded-lg border p-3 hover-lift animate-fadeInUp group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center gap-2 mb-1">
                          <AnimatedIcon
                            icon={Target}
                            animation="bounce"
                            className="text-emerald-600"
                          />
                          <span className="font-medium text-sm">Serial Tracking</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Individual item serial number tracking
                        </p>
                      </div>
                    )}

                    {tenantConfig?.autoReorderEnabled && (
                      <div className="rounded-lg border p-3 hover-lift animate-fadeInUp group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center gap-2 mb-1">
                          <AnimatedIcon
                            icon={ShoppingCart}
                            animation="float"
                            className="text-blue-600"
                          />
                          <span className="font-medium text-sm">Auto Reorder</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Automated purchase order generation
                        </p>
                      </div>
                    )}

                    {tenantConfig?.approvalWorkflow && (
                      <div className="rounded-lg border p-3 hover-lift animate-fadeInUp group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center gap-2 mb-1">
                          <AnimatedIcon
                            icon={Shield}
                            animation="glow"
                            className="text-orange-600"
                          />
                          <span className="font-medium text-sm">Approval Workflow</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Multi-level approval for transactions
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="rounded-lg bg-gradient-to-r from-blue-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
                <div className="flex items-center justify-center gap-2">
                  <AnimatedIcon
                    icon={Star}
                    animation="glow"
                    className="text-yellow-500"
                  />
                  <p className="text-center text-muted-foreground">
                    ✨ Complete inventory management solution for {tenantData.industryType.replace('_', ' ')} industry
                  </p>
                  <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats for Selected Tenant */}
          {tenantMetrics && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fadeInUp">
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                      <AnimatedCounter value={tenantMetrics.totalItems} className="text-2xl font-bold" />
                      <p className="text-xs text-emerald-600">Active inventory</p>
                    </div>
                    <AnimatedIcon icon={Package} className="text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                      <div className="text-2xl font-bold">₹{(tenantMetrics.totalValue / 100000).toFixed(1)}L</div>
                      <p className="text-xs text-purple-600">Current valuation</p>
                    </div>
                    <AnimatedIcon icon={DollarSign} className="text-emerald-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                      <AnimatedCounter value={tenantMetrics.lowStockItems} className="text-2xl font-bold text-yellow-600" />
                      <p className="text-xs text-yellow-600">Need attention</p>
                    </div>
                    <AnimatedIcon icon={AlertTriangle} className="text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Stock Turnover</p>
                      <div className="text-2xl font-bold">{tenantMetrics.averageStockTurnover.toFixed(1)}x</div>
                      <p className="text-xs text-green-600">Annual rate</p>
                    </div>
                    <AnimatedIcon icon={TrendingUp} className="text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </MainLayout>
    </PermissionProvider>
  );
}
