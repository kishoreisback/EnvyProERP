import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Users,
  UserPlus,
  Building2,
  Star,
  Award,
  Shield,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  MoreHorizontal,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Activity,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { TenantSupplier, TenantSupplyChainConfig, SupplyChainMetrics, SupplierAlert } from './types';
import { 
  getTenantSuppliers, 
  getTenantSupplyChainConfig, 
  getTenantSupplyChainMetrics,
  getTenantSupplierAlerts,
  getIndustrySpecificSupplierTypes 
} from './data';
import SupplierProfile from './SupplierProfile';
import SupplierOnboarding from './SupplierOnboarding';

interface SupplierManagementProps {
  tenantId: string;
}

export const SupplierManagement = ({ tenantId }: SupplierManagementProps) => {
  const [suppliers, setSuppliers] = useState<TenantSupplier[]>([]);
  const [config, setConfig] = useState<TenantSupplyChainConfig | null>(null);
  const [metrics, setMetrics] = useState<SupplyChainMetrics | null>(null);
  const [alerts, setAlerts] = useState<SupplierAlert[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  
  // View states
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [qualificationFilter, setQualificationFilter] = useState('all');

  useEffect(() => {
    const tenantConfig = getTenantSupplyChainConfig(tenantId);
    const tenantSuppliers = getTenantSuppliers(tenantId);
    const tenantMetrics = getTenantSupplyChainMetrics(tenantId);
    const tenantAlerts = getTenantSupplierAlerts(tenantId);
    
    setConfig(tenantConfig || null);
    setSuppliers(tenantSuppliers);
    setMetrics(tenantMetrics || null);
    setAlerts(tenantAlerts);
  }, [tenantId]);

  // Filter suppliers based on current filters
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.supplierCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.businessCategory.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    const matchesType = typeFilter === 'all' || supplier.supplierType === typeFilter;
    const matchesTier = tierFilter === 'all' || supplier.relationship.supplierTier === tierFilter;
    const matchesQualification = qualificationFilter === 'all' || supplier.qualification.qualificationStatus === qualificationFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesTier && matchesQualification;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      inactive: { variant: 'secondary' as const, color: 'bg-gray-100 text-gray-800' },
      suspended: { variant: 'destructive' as const, color: 'bg-red-100 text-red-800' },
      blacklisted: { variant: 'destructive' as const, color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    return (
      <Badge variant={config.variant} className={config.color}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getQualificationBadge = (status: string) => {
    const statusConfig = {
      qualified: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      under_review: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
      conditional: { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle }
    };
    
    const config = statusConfig[status];
    const IconComponent = config?.icon || CheckCircle;
    
    return (
      <Badge variant="outline" className={config?.color}>
        <IconComponent className="h-3 w-3 mr-1" />
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getAlertSeverityBadge = (severity: string) => {
    const severityConfig = {
      low: { color: 'bg-blue-100 text-blue-800' },
      medium: { color: 'bg-yellow-100 text-yellow-800' },
      high: { color: 'bg-orange-100 text-orange-800' },
      critical: { color: 'bg-red-100 text-red-800' }
    };
    
    const config = severityConfig[severity] || severityConfig.medium;
    return (
      <Badge variant="outline" className={config.color}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  if (selectedSupplierId) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setSelectedSupplierId(null)}>
            ← Back to Suppliers
          </Button>
        </div>
        <SupplierProfile supplierId={selectedSupplierId} />
      </div>
    );
  }

  if (showOnboarding) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowOnboarding(false)}>
            ← Back to Suppliers
          </Button>
        </div>
        <SupplierOnboarding tenantId={tenantId} />
      </div>
    );
  }

  if (!config || !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading supplier data...</p>
        </div>
      </div>
    );
  }

  const supplierTypes = getIndustrySpecificSupplierTypes(config.industryType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Supplier & Vendor Management</h2>
          <p className="text-muted-foreground">
            {config.tenantName} • {filteredSuppliers.length} of {suppliers.length} suppliers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowOnboarding(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Onboard Supplier
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Suppliers</p>
                <p className="text-2xl font-bold">{metrics.supplierMetrics.totalSuppliers}</p>
                <p className="text-xs text-green-600">
                  {metrics.supplierMetrics.activeSuppliers} active
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Qualified Suppliers</p>
                <p className="text-2xl font-bold">{metrics.supplierMetrics.qualifiedSuppliers}</p>
                <p className="text-xs text-muted-foreground">
                  {((metrics.supplierMetrics.qualifiedSuppliers / metrics.supplierMetrics.totalSuppliers) * 100).toFixed(1)}% qualified
                </p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Performance</p>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold">{metrics.supplierMetrics.averagePerformanceRating.toFixed(1)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Performance rating
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-orange-600">{alerts.filter(a => a.status === 'open').length}</p>
                <p className="text-xs text-muted-foreground">
                  Require attention
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="suppliers">All Suppliers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="alerts">Alerts ({alerts.filter(a => a.status === 'open').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Supplier Distribution */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Supplier Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.supplierMetrics.suppliersByType.map((type, index) => (
                    <div key={type.type} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{type.type}</span>
                        <span className="font-medium">{type.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${type.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{type.count} suppliers</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Regional Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.supplierMetrics.suppliersByRegion.map((region, index) => (
                    <div key={region.region} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{region.region}</span>
                        <span className="font-medium">{region.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full" 
                          style={{ width: `${region.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{region.count} suppliers</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strategic Suppliers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Strategic Suppliers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {suppliers.filter(s => s.isStrategicSupplier).slice(0, 4).map((supplier) => (
                  <div key={supplier.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{supplier.supplierName}</h4>
                      <div className="flex items-center gap-1">
                        <div className="flex">{getRatingStars(supplier.performance.overallRating)}</div>
                        <span className="text-sm font-medium ml-1">{supplier.performance.overallRating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="capitalize">{supplier.supplierType.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>{supplier.businessCategory}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {getStatusBadge(supplier.status)}
                        <Badge variant="outline" className="capitalize">
                          {supplier.relationship.supplierTier.replace('_', ' ')}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedSupplierId(supplier.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Onboarding */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Onboarding Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{metrics.onboardingMetrics.onboardingInProgress}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{metrics.onboardingMetrics.pendingApprovals}</p>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{metrics.onboardingMetrics.onboardingSuccess}%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="blacklisted">Blacklisted</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {supplierTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="tier_1">Tier 1</SelectItem>
                <SelectItem value="tier_2">Tier 2</SelectItem>
                <SelectItem value="tier_3">Tier 3</SelectItem>
                <SelectItem value="strategic">Strategic</SelectItem>
              </SelectContent>
            </Select>
            <Select value={qualificationFilter} onValueChange={setQualificationFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="conditional">Conditional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Suppliers Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Qualification</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{supplier.supplierName}</div>
                        <div className="text-sm text-muted-foreground">
                          {supplier.supplierCode} • {supplier.businessCategory}
                        </div>
                        <div className="flex gap-1 mt-1">
                          {supplier.isStrategicSupplier && (
                            <Badge variant="default" className="text-xs bg-purple-100 text-purple-800">
                              Strategic
                            </Badge>
                          )}
                          {supplier.isPreferredSupplier && (
                            <Badge variant="default" className="text-xs bg-blue-100 text-blue-800">
                              Preferred
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {supplier.supplierType.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{supplier.contactDetails.primaryContact}</div>
                        <div className="text-muted-foreground">{supplier.contactDetails.email}</div>
                        <div className="text-muted-foreground">{supplier.contactDetails.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex">{getRatingStars(supplier.performance.overallRating)}</div>
                        <span className="text-sm font-medium">{supplier.performance.overallRating.toFixed(1)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {supplier.performance.deliveryPerformance.onTimeDeliveryRate}% on-time
                      </div>
                    </TableCell>
                    <TableCell>
                      {getQualificationBadge(supplier.qualification.qualificationStatus)}
                      <div className="text-xs text-muted-foreground mt-1">
                        Score: {supplier.qualification.qualificationScore}/100
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(supplier.status)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {supplier.relationship.supplierTier.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedSupplierId(supplier.id)}
                        >
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

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Avg Delivery Time</p>
                  <p className="text-2xl font-bold">{metrics.performanceMetrics.averageDeliveryTime}</p>
                  <p className="text-xs text-muted-foreground">days</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">On-Time Delivery</p>
                  <p className="text-2xl font-bold text-green-600">{metrics.performanceMetrics.onTimeDeliveryRate}%</p>
                  <p className="text-xs text-muted-foreground">industry avg: 85%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Quality Score</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold">{metrics.performanceMetrics.qualityScore.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">out of 5.0</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Cost Savings</p>
                  <p className="text-2xl font-bold text-emerald-600">₹{(metrics.performanceMetrics.costSavings / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-muted-foreground">this year</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Performing Suppliers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Overall Rating</TableHead>
                    <TableHead>Delivery Performance</TableHead>
                    <TableHead>Quality Score</TableHead>
                    <TableHead>Cost Competitiveness</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers
                    .sort((a, b) => b.performance.overallRating - a.performance.overallRating)
                    .slice(0, 5)
                    .map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{supplier.supplierName}</div>
                          <div className="text-sm text-muted-foreground">{supplier.supplierType.replace('_', ' ')}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex">{getRatingStars(supplier.performance.overallRating)}</div>
                          <span className="font-medium">{supplier.performance.overallRating.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">{supplier.performance.deliveryPerformance.onTimeDeliveryRate}%</div>
                          <div className="text-xs text-muted-foreground">
                            {supplier.performance.deliveryPerformance.averageLeadTime} days avg
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{supplier.performance.qualityMetrics.qualityRating.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{supplier.performance.financialMetrics.costCompetitiveness.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active Supplier Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.filter(alert => alert.status === 'open').map((alert) => (
                  <div key={alert.alertId} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{alert.title}</h4>
                          {getAlertSeverityBadge(alert.severity)}
                          <Badge variant="outline" className="capitalize">
                            {alert.alertType}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                        <div className="text-xs text-muted-foreground">
                          <span>Supplier: {alert.supplierName}</span>
                          <span className="mx-2">•</span>
                          <span>Triggered: {new Date(alert.triggeredAt).toLocaleDateString()}</span>
                          {alert.dueDate && (
                            <>
                              <span className="mx-2">•</span>
                              <span>Due: {new Date(alert.dueDate).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">
                          Take Action
                        </Button>
                      </div>
                    </div>
                    
                    {alert.actions.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium mb-2">Required Actions:</h5>
                        <div className="space-y-1">
                          {alert.actions.map((action, index) => (
                            <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                              <div>
                                <span>{action.description}</span>
                                {action.dueDate && (
                                  <span className="text-muted-foreground ml-2">
                                    (Due: {new Date(action.dueDate).toLocaleDateString()})
                                  </span>
                                )}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {action.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {alerts.filter(alert => alert.status === 'open').length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <h3 className="font-medium mb-2">No Active Alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      All suppliers are performing within acceptable parameters.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierManagement;
