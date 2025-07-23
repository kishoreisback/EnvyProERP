import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import {
  Building2,
  Users,
  Package,
  TrendingUp,
  Star,
  Award,
  AlertTriangle,
  Activity,
  Search,
  Filter,
  Download,
  Eye,
  BarChart3,
  PieChart,
  RefreshCw,
  ArrowRight,
  Globe,
  Layers3
} from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { TenantSupplyChainDashboard } from '@/components/supply-chain';
import {
  mockTenantSupplyChainConfigs,
  getTenantSupplyChainMetrics,
  getTenantSuppliers,
  getTenantSupplierAlerts
} from '@/components/supply-chain/data';
import { Link } from 'react-router-dom';

const SupplyChain = () => {
  const [isSuperAdmin] = useState(true); // This would come from auth context
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');

  // Modal states for Super Admin actions
  const [isGlobalReportModalOpen, setIsGlobalReportModalOpen] = useState(false);
  const [isBulkOperationsModalOpen, setIsBulkOperationsModalOpen] = useState(false);
  const [isSystemAnalyticsModalOpen, setIsSystemAnalyticsModalOpen] = useState(false);
  const [isGlobalAuditModalOpen, setIsGlobalAuditModalOpen] = useState(false);
  const [isComplianceReportModalOpen, setIsComplianceReportModalOpen] = useState(false);
  const [isPerformanceBenchmarkModalOpen, setIsPerformanceBenchmarkModalOpen] = useState(false);
  const [isGlobalSupplierDbModalOpen, setIsGlobalSupplierDbModalOpen] = useState(false);
  const [isSystemConfigModalOpen, setIsSystemConfigModalOpen] = useState(false);
  const [isRiskManagementModalOpen, setIsRiskManagementModalOpen] = useState(false);

  // If Super Admin and no tenant selected, show multi-tenant overview
  if (isSuperAdmin && !selectedTenant) {
    const filteredConfigs = mockTenantSupplyChainConfigs.filter(config => {
      const matchesSearch = config.tenantName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = industryFilter === 'all' || config.industryType === industryFilter;
      return matchesSearch && matchesIndustry;
    });

    // Calculate aggregate metrics
    const totalSuppliers = filteredConfigs.reduce((sum, config) => {
      const metrics = getTenantSupplyChainMetrics(config.tenantId);
      return sum + (metrics?.supplierMetrics.totalSuppliers || 0);
    }, 0);

    const totalActiveSuppliers = filteredConfigs.reduce((sum, config) => {
      const metrics = getTenantSupplyChainMetrics(config.tenantId);
      return sum + (metrics?.supplierMetrics.activeSuppliers || 0);
    }, 0);

    const totalAlerts = filteredConfigs.reduce((sum, config) => {
      const alerts = getTenantSupplierAlerts(config.tenantId);
      return sum + alerts.filter(a => a.status === 'open').length;
    }, 0);

    const avgPerformance = filteredConfigs.reduce((sum, config) => {
      const metrics = getTenantSupplyChainMetrics(config.tenantId);
      return sum + (metrics?.supplierMetrics.averagePerformanceRating || 0);
    }, 0) / filteredConfigs.length;

    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">SCM</h1>
              <p className="text-muted-foreground">
                Multi-tenant supply chain operations and supplier management
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsGlobalReportModalOpen(true)}>
                <Download className="h-4 w-4 mr-2" />
                Export Global Report
              </Button>
              <Button variant="outline" onClick={() => setIsBulkOperationsModalOpen(true)}>
                <Package className="h-4 w-4 mr-2" />
                Bulk Operations
              </Button>
              <Button onClick={() => setIsSystemAnalyticsModalOpen(true)}>
                <Activity className="h-4 w-4 mr-2" />
                System Analytics
              </Button>
            </div>
          </div>

          {/* Tenant Selection Header - Only for Super Admin */}
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent animate-fadeInUp">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      Super Admin View
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-700 border-blue-300"
                    >
                      Multi-Tenant Access
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Select Tenant:
                    </span>
                    <Select onValueChange={(tenantId) => {
                      const selectedConfig = filteredConfigs.find(c => c.tenantId === tenantId);
                      console.log('Switching to tenant:', selectedConfig?.tenantName);
                      setSelectedTenant(tenantId);
                      // In a real app, you could show a toast notification here
                    }}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Select tenant..." />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredConfigs.map((config) => (
                          <SelectItem key={config.tenantId} value={config.tenantId}>
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-blue-500" />
                              <div>
                                <div className="font-medium">{config.tenantName}</div>
                                <div className="text-xs text-gray-500 capitalize">
                                  {config.industryType.replace('_', ' ')}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link to="/supply-chain/tenant/overview">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Layers3 className="h-4 w-4 mr-2" />
                      View Tenant Supply Chain
                    </Button>
                  </Link>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      console.log('Opening tenant comparison...');
                    }}>
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Compare
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      console.log('Opening system settings...');
                    }}>
                      <Building2 className="h-4 w-4 mr-1" />
                      Settings
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        {/* Global Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Suppliers</p>
                  <AnimatedCounter value={totalSuppliers} className="text-2xl font-bold" />
                  <p className="text-xs text-green-600">{totalActiveSuppliers} active</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Tenants</p>
                  <AnimatedCounter value={filteredConfigs.length} className="text-2xl font-bold" />
                  <p className="text-xs text-muted-foreground">supply chain enabled</p>
                </div>
                <Building2 className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Performance</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold">{avgPerformance.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">across all tenants</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                  <AnimatedCounter value={totalAlerts} className="text-2xl font-bold text-orange-600" />
                  <p className="text-xs text-orange-600">require attention</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search tenants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="real_estate">Real Estate</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Industry Distribution */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Industry Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(
                filteredConfigs.reduce((acc, config) => {
                  acc[config.industryType] = (acc[config.industryType] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([industry, count]) => (
                <div key={industry} className="flex items-center justify-between py-2">
                  <span className="capitalize">{industry.replace('_', ' ')}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(count / filteredConfigs.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-8">{count}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredConfigs.slice(0, 5).map((config) => {
                  const metrics = getTenantSupplyChainMetrics(config.tenantId);
                  return (
                    <div key={config.tenantId} className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{config.tenantName}</span>
                        <p className="text-sm text-muted-foreground capitalize">
                          {config.industryType.replace('_', ' ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">
                          {metrics?.supplierMetrics.averagePerformanceRating.toFixed(1) || 'N/A'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bulk Actions for Super Admin */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Super Admin Actions
            </CardTitle>
            <CardDescription>
              Perform bulk operations and manage supply chain across all tenants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => setIsGlobalAuditModalOpen(true)}>
                <Award className="h-4 w-4 mr-2" />
                Global Supplier Audit
              </Button>
              <Button variant="outline" onClick={() => setIsComplianceReportModalOpen(true)}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Compliance Report
              </Button>
              <Button variant="outline" onClick={() => setIsPerformanceBenchmarkModalOpen(true)}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Performance Benchmarking
              </Button>
              <Button variant="outline" onClick={() => setIsGlobalSupplierDbModalOpen(true)}>
                <Users className="h-4 w-4 mr-2" />
                Global Supplier Database
              </Button>
              <Button variant="outline" onClick={() => setIsSystemConfigModalOpen(true)}>
                <Building2 className="h-4 w-4 mr-2" />
                System Configuration
              </Button>
              <Button onClick={() => setIsRiskManagementModalOpen(true)}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Risk Management
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tenants Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tenant Supply Chain Overview</CardTitle>
            <CardDescription>
              Manage supply chain operations across all tenant organizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Suppliers</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Alerts</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConfigs.map((config) => {
                  const metrics = getTenantSupplyChainMetrics(config.tenantId);
                  const alerts = getTenantSupplierAlerts(config.tenantId);
                  const openAlerts = alerts.filter(a => a.status === 'open').length;

                  return (
                    <TableRow key={config.tenantId}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{config.tenantName}</div>
                          <div className="text-sm text-muted-foreground">{config.tenantId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {config.industryType.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {metrics?.supplierMetrics.totalSuppliers || 0}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {metrics?.supplierMetrics.activeSuppliers || 0} active
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">
                            {metrics?.supplierMetrics.averagePerformanceRating.toFixed(1) || 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {openAlerts > 0 ? (
                          <Badge variant="destructive">
                            {openAlerts} alert{openAlerts > 1 ? 's' : ''}
                          </Badge>
                        ) : (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            No alerts
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {metrics?.complianceMetrics.overallComplianceRate || 0}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              console.log('Viewing tenant overview for:', config.tenantName);
                              setSelectedTenant(config.tenantId);
                            }}
                            title="View Tenant Dashboard"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              console.log('Generating report for tenant:', config.tenantName);
                              // In a real app, this would generate tenant-specific report
                            }}
                            title="Generate Report"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              console.log('Opening tenant settings for:', config.tenantName);
                              // In a real app, this would open tenant configuration
                            }}
                            title="Tenant Settings"
                          >
                            <Building2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              console.log('Managing tenant:', config.tenantName);
                              setSelectedTenant(config.tenantId);
                            }}
                            title="Manage Tenant"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Global Report Modal */}
        <Dialog open={isGlobalReportModalOpen} onOpenChange={setIsGlobalReportModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Global Supply Chain Report
              </DialogTitle>
              <DialogDescription>
                Generate comprehensive reports across all tenant organizations
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Total Suppliers</h4>
                        <p className="text-2xl font-bold">{totalSuppliers}</p>
                        <p className="text-sm text-muted-foreground">{totalActiveSuppliers} active</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Avg Performance</h4>
                        <p className="text-2xl font-bold">{avgPerformance.toFixed(1)}/5</p>
                        <p className="text-sm text-muted-foreground">across all tenants</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Active Alerts</h4>
                        <p className="text-2xl font-bold text-orange-600">{totalAlerts}</p>
                        <p className="text-sm text-muted-foreground">require attention</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Report Options</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Include supplier performance metrics</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Include compliance status</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Include financial summaries</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span>Include detailed supplier profiles</span>
                      </label>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="performance">
                  <div className="space-y-4">
                    <h4 className="font-medium">Performance Metrics by Tenant</h4>
                    {filteredConfigs.map((config) => {
                      const metrics = getTenantSupplyChainMetrics(config.tenantId);
                      return (
                        <div key={config.tenantId} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">{config.tenantName}</h5>
                            <Badge>{metrics?.supplierMetrics.averagePerformanceRating.toFixed(1)}/5</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>On-time Delivery: {metrics?.performanceMetrics.onTimeDeliveryRate}%</div>
                            <div>Quality Score: {metrics?.performanceMetrics.qualityScore.toFixed(1)}/5</div>
                            <div>Suppliers: {metrics?.supplierMetrics.totalSuppliers}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="compliance">
                  <div className="space-y-4">
                    <h4 className="font-medium">Compliance Status by Tenant</h4>
                    {filteredConfigs.map((config) => {
                      const metrics = getTenantSupplyChainMetrics(config.tenantId);
                      return (
                        <div key={config.tenantId} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">{config.tenantName}</h5>
                            <Badge variant={metrics?.complianceMetrics.overallComplianceRate >= 90 ? 'default' : 'destructive'}>
                              {metrics?.complianceMetrics.overallComplianceRate}%
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>Expiring Certs: {metrics?.complianceMetrics.expiringCertifications}</div>
                            <div>Audits Due: {metrics?.complianceMetrics.auditsDue}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="financial">
                  <div className="space-y-4">
                    <h4 className="font-medium">Financial Summary by Tenant</h4>
                    {filteredConfigs.map((config) => {
                      const metrics = getTenantSupplyChainMetrics(config.tenantId);
                      return (
                        <div key={config.tenantId} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">{config.tenantName}</h5>
                            <Badge>₹{(metrics?.financialMetrics.totalSpend / 10000000).toFixed(1)}Cr</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>Cost Savings: ₹{(metrics?.financialMetrics.costSavingsRealized / 100000).toFixed(1)}L</div>
                            <div>Avg Payment: {metrics?.financialMetrics.averagePaymentPeriod} days</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsGlobalReportModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                // Simulate report generation
                console.log('Generating global supply chain report...');
                // In a real app, this would trigger report generation and download
                setIsGlobalReportModalOpen(false);
              }}>
                Generate Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Bulk Operations Modal */}
        <Dialog open={isBulkOperationsModalOpen} onOpenChange={setIsBulkOperationsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Bulk Operations
              </DialogTitle>
              <DialogDescription>
                Perform operations across multiple tenants and suppliers
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="supplier" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="supplier">Supplier Operations</TabsTrigger>
                <TabsTrigger value="compliance">Compliance Operations</TabsTrigger>
              </TabsList>

              <TabsContent value="supplier" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bulk Supplier Information Update</CardTitle>
                    <CardDescription>Update supplier details across selected tenants</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="updateField">Field to Update</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="contact">Contact Information</SelectItem>
                            <SelectItem value="certification">Certification Status</SelectItem>
                            <SelectItem value="terms">Payment Terms</SelectItem>
                            <SelectItem value="category">Category</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="newValue">New Value</Label>
                        <Input placeholder="Enter new value" />
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => {
                      // Simulate processing
                      const btn = document.activeElement as HTMLButtonElement;
                      btn.disabled = true;
                      btn.innerHTML = '<span class="animate-spin">⏳</span> Processing...';
                      setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = '✅ Updated 47 suppliers across 3 tenants';
                        setTimeout(() => {
                          btn.innerHTML = '<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg>Bulk Update Supplier Info';
                        }, 2000);
                      }, 2000);
                    }}>
                      <Users className="h-4 w-4 mr-2" />
                      Execute Bulk Update
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bulk Notifications</CardTitle>
                    <CardDescription>Send notifications to suppliers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="notificationType">Notification Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="renewal">Contract Renewal</SelectItem>
                          <SelectItem value="compliance">Compliance Update</SelectItem>
                          <SelectItem value="performance">Performance Review</SelectItem>
                          <SelectItem value="payment">Payment Reminder</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="Enter notification message..."></textarea>
                    </div>
                    <Button className="w-full" onClick={() => {
                      const btn = document.activeElement as HTMLButtonElement;
                      btn.disabled = true;
                      btn.innerHTML = '<span class="animate-spin">📤</span> Sending...';
                      setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = '✅ Sent to 152 suppliers across 5 tenants';
                        setTimeout(() => {
                          btn.innerHTML = '<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.268 15.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>Send Notifications';
                        }, 2000);
                      }, 1500);
                    }}>
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Send Notifications
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Review</CardTitle>
                    <CardDescription>Initiate performance reviews for suppliers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="reviewPeriod">Review Period</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="q1">Q1 2024</SelectItem>
                            <SelectItem value="q2">Q2 2024</SelectItem>
                            <SelectItem value="q3">Q3 2024</SelectItem>
                            <SelectItem value="q4">Q4 2024</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="criteria">Review Criteria</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select criteria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quality">Quality Metrics</SelectItem>
                            <SelectItem value="delivery">Delivery Performance</SelectItem>
                            <SelectItem value="cost">Cost Effectiveness</SelectItem>
                            <SelectItem value="overall">Overall Performance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => {
                      const btn = document.activeElement as HTMLButtonElement;
                      btn.disabled = true;
                      btn.innerHTML = '<span class="animate-spin">📊</span> Generating Reviews...';
                      setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = '✅ Generated 89 performance reviews';
                        setTimeout(() => {
                          btn.innerHTML = '<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>Performance Review';
                        }, 2000);
                      }, 2500);
                    }}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Generate Performance Reviews
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bulk Audit Scheduling</CardTitle>
                    <CardDescription>Schedule audits across multiple tenants</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="auditType">Audit Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audit type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compliance">Compliance Audit</SelectItem>
                            <SelectItem value="quality">Quality Audit</SelectItem>
                            <SelectItem value="financial">Financial Audit</SelectItem>
                            <SelectItem value="security">Security Audit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="auditDate">Audit Date</Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => {
                      const btn = document.activeElement as HTMLButtonElement;
                      btn.disabled = true;
                      btn.innerHTML = '<span class="animate-spin">📅</span> Scheduling...';
                      setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = '✅ Scheduled 23 audits across 4 tenants';
                        setTimeout(() => {
                          btn.innerHTML = '<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>Schedule Audits';
                        }, 2000);
                      }, 2000);
                    }}>
                      <Award className="h-4 w-4 mr-2" />
                      Schedule Bulk Audits
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance Requirements Update</CardTitle>
                    <CardDescription>Update compliance requirements for suppliers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="requirement">Requirement Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select requirement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iso">ISO Certification</SelectItem>
                          <SelectItem value="safety">Safety Standards</SelectItem>
                          <SelectItem value="environmental">Environmental Compliance</SelectItem>
                          <SelectItem value="data">Data Protection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="deadline">Compliance Deadline</Label>
                      <Input type="date" />
                    </div>
                    <Button className="w-full" onClick={() => {
                      const btn = document.activeElement as HTMLButtonElement;
                      btn.disabled = true;
                      btn.innerHTML = '<span class="animate-spin">🔄</span> Updating...';
                      setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = '✅ Updated requirements for 67 suppliers';
                        setTimeout(() => {
                          btn.innerHTML = '<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>Update Requirements';
                        }, 2000);
                      }, 1800);
                    }}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Update Requirements
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance Report Generation</CardTitle>
                    <CardDescription>Generate compliance reports for all tenants</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="reportType">Report Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="summary">Compliance Summary</SelectItem>
                            <SelectItem value="detailed">Detailed Report</SelectItem>
                            <SelectItem value="exceptions">Exceptions Report</SelectItem>
                            <SelectItem value="trends">Compliance Trends</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="format">Format</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => {
                      const btn = document.activeElement as HTMLButtonElement;
                      btn.disabled = true;
                      btn.innerHTML = '<span class="animate-spin">📄</span> Generating...';
                      setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = '✅ Generated 5 compliance reports • <a href="#" class="underline">Download</a>';
                        setTimeout(() => {
                          btn.innerHTML = '<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>Generate Reports';
                        }, 3000);
                      }, 2500);
                    }}>
                      <Download className="h-4 w-4 mr-2" />
                      Generate Compliance Reports
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="space-y-4 border-t pt-4">
              <div>
                <h4 className="font-medium mb-3">Tenant Selection</h4>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {filteredConfigs.map((config) => (
                    <label key={config.tenantId} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">{config.tenantName}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsBulkOperationsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setIsBulkOperationsModalOpen(false);
                  // Show success notification
                  const notification = document.createElement('div');
                  notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50';
                  notification.innerHTML = '✅ Bulk operations completed successfully!';
                  document.body.appendChild(notification);
                  setTimeout(() => notification.remove(), 3000);
                }}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* System Analytics Modal */}
        <Dialog open={isSystemAnalyticsModalOpen} onOpenChange={setIsSystemAnalyticsModalOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Analytics Dashboard
              </DialogTitle>
              <DialogDescription>
                Comprehensive analytics across all supply chain operations
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto">
              <Tabs defaultValue="performance" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                  <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
                </TabsList>

                <TabsContent value="performance" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Overall Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Average Performance</span>
                              <span>{avgPerformance.toFixed(1)}/5</span>
                            </div>
                            <Progress value={avgPerformance * 20} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Supplier Satisfaction</span>
                              <span>87%</span>
                            </div>
                            <Progress value={87} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>System Efficiency</span>
                              <span>92%</span>
                            </div>
                            <Progress value={92} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Key Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center p-3 border rounded">
                            <p className="text-2xl font-bold">{totalSuppliers}</p>
                            <p className="text-muted-foreground">Total Suppliers</p>
                          </div>
                          <div className="text-center p-3 border rounded">
                            <p className="text-2xl font-bold">{filteredConfigs.length}</p>
                            <p className="text-muted-foreground">Active Tenants</p>
                          </div>
                          <div className="text-center p-3 border rounded">
                            <p className="text-2xl font-bold">₹2.5Cr</p>
                            <p className="text-muted-foreground">Cost Savings</p>
                          </div>
                          <div className="text-center p-3 border rounded">
                            <p className="text-2xl font-bold">94%</p>
                            <p className="text-muted-foreground">Compliance</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="trends">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Monthly Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium mb-2">Supplier Growth</h5>
                            <div className="flex items-center gap-4">
                              <span className="text-2xl font-bold text-green-600">+12%</span>
                              <span className="text-sm text-muted-foreground">vs last month</span>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Performance Improvement</h5>
                            <div className="flex items-center gap-4">
                              <span className="text-2xl font-bold text-green-600">+8%</span>
                              <span className="text-sm text-muted-foreground">average rating increase</span>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Cost Optimization</h5>
                            <div className="flex items-center gap-4">
                              <span className="text-2xl font-bold text-green-600">-5%</span>
                              <span className="text-sm text-muted-foreground">operational costs</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="comparison">
                  <div className="space-y-4">
                    <h4 className="font-medium">Tenant Performance Comparison</h4>
                    {filteredConfigs.map((config) => {
                      const metrics = getTenantSupplyChainMetrics(config.tenantId);
                      return (
                        <Card key={config.tenantId}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-medium">{config.tenantName}</h5>
                              <Badge>{metrics?.supplierMetrics.averagePerformanceRating.toFixed(1)}/5</Badge>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Performance</span>
                                  <span>{metrics?.supplierMetrics.averagePerformanceRating.toFixed(1)}/5</span>
                                </div>
                                <Progress value={metrics?.supplierMetrics.averagePerformanceRating * 20} className="h-2" />
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-xs">
                                <div>Suppliers: {metrics?.supplierMetrics.totalSuppliers}</div>
                                <div>On-time: {metrics?.performanceMetrics.onTimeDeliveryRate}%</div>
                                <div>Compliance: {metrics?.complianceMetrics.overallComplianceRate}%</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="forecasting">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Predictive Analytics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <h5 className="font-medium mb-2">Q2 2024 Forecast</h5>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>Expected Supplier Growth: +15%</div>
                              <div>Predicted Cost Savings: ₹3.2Cr</div>
                              <div>Performance Improvement: +12%</div>
                              <div>Risk Reduction: -8%</div>
                            </div>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h5 className="font-medium mb-2">Recommendations</h5>
                            <ul className="text-sm space-y-1">
                              <li>• Focus on supplier diversity in emerging markets</li>
                              <li>• Implement automated compliance monitoring</li>
                              <li>• Enhance digital onboarding processes</li>
                              <li>• Invest in performance analytics tools</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsSystemAnalyticsModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                console.log('Exporting analytics report...');
              }}>
                Export Analytics
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Global Supplier Audit Modal */}
        <Dialog open={isGlobalAuditModalOpen} onOpenChange={setIsGlobalAuditModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Global Supplier Audit
              </DialogTitle>
              <DialogDescription>
                Initiate comprehensive audit across all suppliers and tenants
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium mb-2">Suppliers to Audit</h4>
                    <p className="text-2xl font-bold">{totalSuppliers}</p>
                    <p className="text-sm text-muted-foreground">across {filteredConfigs.length} tenants</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium mb-2">Estimated Duration</h4>
                    <p className="text-2xl font-bold">14</p>
                    <p className="text-sm text-muted-foreground">business days</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium mb-2">Last Global Audit</h4>
                    <p className="text-2xl font-bold">6</p>
                    <p className="text-sm text-muted-foreground">months ago</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-medium mb-3">Audit Scope</h4>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Financial Health Assessment</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Compliance Verification</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Performance Evaluation</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Risk Assessment</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Site Visits</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Customer References</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Audit Schedule</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <Label>Priority Level</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="normal">Normal Priority</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsGlobalAuditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                console.log('Initiating global supplier audit...');
                setIsGlobalAuditModalOpen(false);
              }}>
                Start Audit
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Compliance Report Modal */}
        <Dialog open={isComplianceReportModalOpen} onOpenChange={setIsComplianceReportModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Compliance Report Generator
              </DialogTitle>
              <DialogDescription>
                Generate comprehensive compliance reports across all tenants
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredConfigs.map((config) => {
                        const metrics = getTenantSupplyChainMetrics(config.tenantId);
                        return (
                          <div key={config.tenantId} className="flex justify-between items-center">
                            <span className="text-sm">{config.tenantName}</span>
                            <Badge variant={metrics?.complianceMetrics.overallComplianceRate >= 90 ? 'default' : 'destructive'}>
                              {metrics?.complianceMetrics.overallComplianceRate}%
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Critical Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Expiring Certifications</span>
                        <span className="font-medium text-orange-600">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overdue Audits</span>
                        <span className="font-medium text-red-600">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Non-Compliance Issues</span>
                        <span className="font-medium text-red-600">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pending Reviews</span>
                        <span className="font-medium text-yellow-600">12</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-medium mb-3">Report Configuration</h4>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Include certification status</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Include audit results</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Include risk assessments</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Include remediation plans</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Report Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                      <SelectItem value="excel">Excel Workbook</SelectItem>
                      <SelectItem value="dashboard">Interactive Dashboard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Report Period</Label>
                  <Select defaultValue="current">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Status</SelectItem>
                      <SelectItem value="monthly">Last 30 Days</SelectItem>
                      <SelectItem value="quarterly">Last Quarter</SelectItem>
                      <SelectItem value="yearly">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsComplianceReportModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                console.log('Generating compliance report...');
                setIsComplianceReportModalOpen(false);
              }}>
                Generate Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Performance Benchmark Modal */}
        <Dialog open={isPerformanceBenchmarkModalOpen} onOpenChange={setIsPerformanceBenchmarkModalOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Benchmarking
              </DialogTitle>
              <DialogDescription>
                Compare and analyze performance across tenants and industry standards
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <h4 className="font-medium mb-2">Industry Average</h4>
                          <p className="text-2xl font-bold">4.1/5</p>
                          <p className="text-sm text-muted-foreground">performance rating</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <h4 className="font-medium mb-2">Your Average</h4>
                          <p className="text-2xl font-bold text-green-600">{avgPerformance.toFixed(1)}/5</p>
                          <p className="text-sm text-green-600">+{(avgPerformance - 4.1).toFixed(1)} above industry</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <h4 className="font-medium mb-2">Top Performer</h4>
                          <p className="text-2xl font-bold text-blue-600">4.6/5</p>
                          <p className="text-sm text-muted-foreground">best tenant</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Tenant Performance Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {filteredConfigs.map((config) => {
                            const metrics = getTenantSupplyChainMetrics(config.tenantId);
                            const performance = metrics?.supplierMetrics.averagePerformanceRating || 0;
                            return (
                              <div key={config.tenantId} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{config.tenantName}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm">{performance.toFixed(1)}/5</span>
                                    <Badge variant={performance >= 4.5 ? 'default' : performance >= 4.0 ? 'secondary' : 'destructive'}>
                                      {performance >= 4.5 ? 'Excellent' : performance >= 4.0 ? 'Good' : 'Needs Improvement'}
                                    </Badge>
                                  </div>
                                </div>
                                <Progress value={performance * 20} className="h-2" />
                                <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                                  <span>On-time: {metrics?.performanceMetrics.onTimeDeliveryRate}%</span>
                                  <span>Quality: {metrics?.performanceMetrics.qualityScore.toFixed(1)}/5</span>
                                  <span>Suppliers: {metrics?.supplierMetrics.totalSuppliers}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="detailed">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Performance Indicators</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h5 className="font-medium mb-3">Delivery Performance</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Industry Average</span>
                                <span>85%</span>
                              </div>
                              <div className="flex justify-between text-sm font-medium">
                                <span>Your Average</span>
                                <span className="text-green-600">89%</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Best Performer</span>
                                <span>92%</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium mb-3">Cost Efficiency</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Industry Average</span>
                                <span>₹2.1Cr saved</span>
                              </div>
                              <div className="flex justify-between text-sm font-medium">
                                <span>Your Performance</span>
                                <span className="text-green-600">₹2.5Cr saved</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Best Performer</span>
                                <span>₹3.2Cr saved</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="recommendations">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Improvement Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {filteredConfigs.map((config) => {
                            const metrics = getTenantSupplyChainMetrics(config.tenantId);
                            const performance = metrics?.supplierMetrics.averagePerformanceRating || 0;
                            return (
                              <div key={config.tenantId} className="p-4 border rounded-lg">
                                <h5 className="font-medium mb-2">{config.tenantName}</h5>
                                <div className="space-y-2 text-sm">
                                  {performance < 4.0 && (
                                    <>
                                      <p>• Focus on supplier training and development programs</p>
                                      <p>• Implement stricter performance monitoring</p>
                                      <p>• Consider diversifying supplier base</p>
                                    </>
                                  )}
                                  {performance >= 4.0 && performance < 4.5 && (
                                    <>
                                      <p>• Implement advanced analytics for predictive insights</p>
                                      <p>• Enhance supplier collaboration tools</p>
                                      <p>• Optimize procurement processes</p>
                                    </>
                                  )}
                                  {performance >= 4.5 && (
                                    <>
                                      <p>• Share best practices with other tenants</p>
                                      <p>• Explore strategic partnerships</p>
                                      <p>• Consider expansion opportunities</p>
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsPerformanceBenchmarkModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                console.log('Exporting benchmark report...');
              }}>
                Export Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Global Supplier Database Modal */}
        <Dialog open={isGlobalSupplierDbModalOpen} onOpenChange={setIsGlobalSupplierDbModalOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Global Supplier Database
              </DialogTitle>
              <DialogDescription>
                Manage and search suppliers across all tenant organizations
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Search suppliers by name, code, or category..." className="flex-1" />
                  <Button><Search className="h-4 w-4 mr-2" />Search</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  <Card><CardContent className="p-4 text-center"><h4 className="font-medium mb-2">Total Suppliers</h4><p className="text-2xl font-bold">{totalSuppliers}</p></CardContent></Card>
                  <Card><CardContent className="p-4 text-center"><h4 className="font-medium mb-2">Active</h4><p className="text-2xl font-bold text-green-600">{totalActiveSuppliers}</p></CardContent></Card>
                  <Card><CardContent className="p-4 text-center"><h4 className="font-medium mb-2">Strategic</h4><p className="text-2xl font-bold text-blue-600">15</p></CardContent></Card>
                  <Card><CardContent className="p-4 text-center"><h4 className="font-medium mb-2">High Risk</h4><p className="text-2xl font-bold text-red-600">8</p></CardContent></Card>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsGlobalSupplierDbModalOpen(false)}>Close</Button>
              <Button onClick={() => console.log('Exporting supplier database...')}>Export Database</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* System Configuration Modal */}
        <Dialog open={isSystemConfigModalOpen} onOpenChange={setIsSystemConfigModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                System Configuration
              </DialogTitle>
              <DialogDescription>Configure system-wide supply chain management settings</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Card>
                <CardHeader><CardTitle>Global Settings</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Default Currency</Label><Select defaultValue="INR"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="INR">Indian Rupee (₹)</SelectItem></SelectContent></Select></div>
                    <div><Label>Date Format</Label><Select defaultValue="DD/MM/YYYY"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem></SelectContent></Select></div>
                  </div>
                  <div className="space-y-2">
                    <Label>System Features</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center space-x-2"><input type="checkbox" defaultChecked /><span>Enable automatic supplier scoring</span></label>
                      <label className="flex items-center space-x-2"><input type="checkbox" defaultChecked /><span>Enable risk monitoring</span></label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsSystemConfigModalOpen(false)}>Cancel</Button>
              <Button onClick={() => { console.log('Saving system configuration...'); setIsSystemConfigModalOpen(false); }}>Save Configuration</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Risk Management Modal */}
        <Dialog open={isRiskManagementModalOpen} onOpenChange={setIsRiskManagementModalOpen}>
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Management Dashboard
              </DialogTitle>
              <DialogDescription>Monitor and manage supply chain risks across all tenants</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <Card><CardContent className="p-4 text-center"><h4 className="font-medium mb-2">Overall Risk Level</h4><p className="text-2xl font-bold text-yellow-600">Medium</p><p className="text-sm text-muted-foreground">15% risk exposure</p></CardContent></Card>
                <Card><CardContent className="p-4 text-center"><h4 className="font-medium mb-2">High Risk Suppliers</h4><p className="text-2xl font-bold text-red-600">8</p><p className="text-sm text-muted-foreground">require attention</p></CardContent></Card>
                <Card><CardContent className="p-4 text-center"><h4 className="font-medium mb-2">Active Alerts</h4><p className="text-2xl font-bold text-orange-600">{totalAlerts}</p><p className="text-sm text-muted-foreground">across all tenants</p></CardContent></Card>
                <Card><CardContent className="p-4 text-center"><h4 className="font-medium mb-2">Mitigation Plans</h4><p className="text-2xl font-bold text-blue-600">12</p><p className="text-sm text-muted-foreground">in progress</p></CardContent></Card>
              </div>

              <Card>
                <CardHeader><CardTitle>Risk Alerts</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: "Supplier Financial Distress", severity: "high", tenant: "BuildCorp Construction" },
                      { title: "Geographic Risk", severity: "medium", tenant: "Metro Realty" },
                      { title: "Compliance Violation", severity: "critical", tenant: "BuildCorp Construction" }
                    ].map((alert, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <h5 className="font-medium">{alert.title}</h5>
                          <p className="text-sm text-muted-foreground">{alert.tenant}</p>
                        </div>
                        <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>{alert.severity.toUpperCase()}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsRiskManagementModalOpen(false)}>Close</Button>
              <Button onClick={() => console.log('Exporting risk assessment...')}>Export Assessment</Button>
            </div>
          </DialogContent>
        </Dialog>

        </div>
      </MainLayout>
    );
  }

  // If tenant is selected or user is not super admin, show tenant-specific dashboard
  const tenantId = selectedTenant || 'tenant_buildcorp'; // Default for non-super admin

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Back button for Super Admin */}
        {isSuperAdmin && selectedTenant && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setSelectedTenant(null)}>
              ← Back to All Tenants
            </Button>
          </div>
        )}

        <TenantSupplyChainDashboard
          tenantId={tenantId}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
        />
      </div>
    </MainLayout>
  );
};

export default SupplyChain;
