import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatedIcon, PulsingDot } from '@/components/ui/animated-icons';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import {
  Package,
  Users,
  Truck,
  Building2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Award,
  Shield,
  Target,
  Activity,
  BarChart3,
  PieChart,
  MapPin,
  Calendar,
  Download,
  RefreshCw,
  Plus,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { TenantSupplyChainConfig, SupplyChainMetrics, TenantSupplier, SupplierAlert } from './types';
import {
  getTenantSupplyChainConfig,
  getTenantSupplyChainMetrics,
  getTenantSuppliers,
  getTenantSupplierAlerts
} from './data';
import SupplierManagement from './SupplierManagement';

interface TenantSupplyChainDashboardProps {
  tenantId: string;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const TenantSupplyChainDashboard = ({
  tenantId,
  currentTab,
  onTabChange
}: TenantSupplyChainDashboardProps) => {
  const [config, setConfig] = useState<TenantSupplyChainConfig | null>(null);
  const [metrics, setMetrics] = useState<SupplyChainMetrics | null>(null);
  const [suppliers, setSuppliers] = useState<TenantSupplier[]>([]);
  const [alerts, setAlerts] = useState<SupplierAlert[]>([]);

  useEffect(() => {
    const tenantConfig = getTenantSupplyChainConfig(tenantId);
    const tenantMetrics = getTenantSupplyChainMetrics(tenantId);
    const tenantSuppliers = getTenantSuppliers(tenantId);
    const tenantAlerts = getTenantSupplierAlerts(tenantId);

    setConfig(tenantConfig || null);
    setMetrics(tenantMetrics || null);
    setSuppliers(tenantSuppliers);
    setAlerts(tenantAlerts);
  }, [tenantId]);

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

  const getAlertSeverityColor = (severity: string) => {
    const colors = {
      low: 'text-blue-600',
      medium: 'text-yellow-600',
      high: 'text-orange-600',
      critical: 'text-red-600'
    };
    return colors[severity] || colors.medium;
  };

  if (!config || !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading supply chain data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Supply Chain Management</h2>
          <p className="text-muted-foreground">
            {config.tenantName} • {config.industryType.replace('_', ' ').toUpperCase()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            // Generate and download report
            console.log('Exporting supply chain report for tenant:', config.tenantName);
            // In a real app, this would trigger a report generation and download
          }}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={() => {
            // Navigate to add supplier page or open modal
            console.log('Opening add supplier form...');
            onTabChange('suppliers');
            // In a real app, this would open an add supplier modal or navigate to a form
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Suppliers</p>
                <AnimatedCounter value={metrics.supplierMetrics.totalSuppliers} className="text-2xl font-bold" />
                <p className="text-xs text-green-600">
                  {metrics.supplierMetrics.activeSuppliers} active
                </p>
              </div>
              <AnimatedIcon icon={Users} className="text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Qualified Suppliers</p>
                <AnimatedCounter value={metrics.supplierMetrics.qualifiedSuppliers} className="text-2xl font-bold" />
                <p className="text-xs text-muted-foreground">
                  {((metrics.supplierMetrics.qualifiedSuppliers / metrics.supplierMetrics.totalSuppliers) * 100).toFixed(1)}% qualified
                </p>
              </div>
              <AnimatedIcon icon={Award} className="text-green-600" />
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
                <p className="text-xs text-muted-foreground">Performance rating</p>
              </div>
              <AnimatedIcon icon={TrendingUp} className="text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spend</p>
                <div className="text-2xl font-bold">
                  ₹{(metrics.financialMetrics.totalSpend / 10000000).toFixed(1)}Cr
                </div>
                <p className="text-xs text-emerald-600">
                  {metrics.financialMetrics.budgetVariance > 0 ? '+' : ''}{metrics.financialMetrics.budgetVariance.toFixed(1)}% vs budget
                </p>
              </div>
              <AnimatedIcon icon={Package} className="text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <AnimatedCounter
                  value={alerts.filter(a => a.status === 'open').length}
                  className="text-2xl font-bold text-orange-600"
                />
                <p className="text-xs text-orange-600">Require attention</p>
              </div>
              <div className="relative">
                <AnimatedIcon icon={AlertTriangle} className="text-orange-600" />
                {alerts.filter(a => a.status === 'open').length > 0 && (
                  <PulsingDot className="absolute -top-1 -right-1" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={currentTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">On-Time Delivery</p>
                    <p className="text-2xl font-bold">{metrics.performanceMetrics.onTimeDeliveryRate}%</p>
                    <div className="flex items-center gap-1 text-xs">
                      <ArrowUpRight className="h-3 w-3 text-green-600" />
                      <span className="text-green-600">+2.5% vs last month</span>
                    </div>
                  </div>
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Quality Score</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-2xl font-bold">{metrics.performanceMetrics.qualityScore.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <ArrowUpRight className="h-3 w-3 text-green-600" />
                      <span className="text-green-600">+0.3 vs last month</span>
                    </div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Cost Savings</p>
                    <p className="text-2xl font-bold">₹{(metrics.financialMetrics.costSavingsRealized / 100000).toFixed(1)}L</p>
                    <div className="flex items-center gap-1 text-xs">
                      <ArrowUpRight className="h-3 w-3 text-green-600" />
                      <span className="text-green-600">+15% vs target</span>
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Risk Exposure</p>
                    <p className="text-2xl font-bold">{metrics.performanceMetrics.riskExposure}%</p>
                    <div className="flex items-center gap-1 text-xs">
                      <ArrowDownRight className="h-3 w-3 text-green-600" />
                      <span className="text-green-600">-3% vs last month</span>
                    </div>
                  </div>
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

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
                      <Progress value={type.percentage} className="h-2" />
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
                      <Progress value={region.percentage} className="h-2" />
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
                  <div key={supplier.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
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
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {supplier.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {supplier.relationship.supplierTier.replace('_', ' ')}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => {
                        console.log('Viewing supplier details for:', supplier.supplierName);
                        // In a real app, this would navigate to supplier details page
                        onTabChange('suppliers');
                      }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Recent Alerts
                {alerts.filter(a => a.status === 'open').length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {alerts.filter(a => a.status === 'open').length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {alerts.filter(a => a.status === 'open').slice(0, 3).length > 0 ? (
                <div className="space-y-3">
                  {alerts.filter(a => a.status === 'open').slice(0, 3).map((alert) => (
                    <div key={alert.alertId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className={`h-4 w-4 ${getAlertSeverityColor(alert.severity)}`} />
                          <span className="font-medium text-sm">{alert.title}</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.supplierName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(alert.triggeredAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => {
                        console.log('Viewing alert details for:', alert.title);
                        // In a real app, this would open alert details modal
                      }}>
                        View
                      </Button>
                    </div>
                  ))}
                  <div className="text-center pt-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      console.log('Viewing all alerts...');
                      // In a real app, this would navigate to alerts page
                      onTabChange('alerts');
                    }}>
                      View All Alerts
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-medium mb-2">No Active Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    All suppliers are performing within acceptable parameters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <SupplierManagement tenantId={tenantId} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
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

          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Delivery Performance</span>
                    <span className="font-medium">{metrics.performanceMetrics.onTimeDeliveryRate}%</span>
                  </div>
                  <Progress value={metrics.performanceMetrics.onTimeDeliveryRate} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Quality Performance</span>
                    <span className="font-medium">{(metrics.performanceMetrics.qualityScore * 20).toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.performanceMetrics.qualityScore * 20} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Cost Performance</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Top Performing Suppliers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suppliers
                  .sort((a, b) => b.performance.overallRating - a.performance.overallRating)
                  .slice(0, 5)
                  .map((supplier, index) => (
                  <div key={supplier.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{supplier.supplierName}</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {supplier.supplierType.replace('_', ' ')} • {supplier.businessCategory}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex">{getRatingStars(supplier.performance.overallRating)}</div>
                        <span className="font-medium ml-1">{supplier.performance.overallRating.toFixed(1)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {supplier.performance.deliveryPerformance.onTimeDeliveryRate}% on-time delivery
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* Compliance Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Overall Compliance</p>
                  <p className="text-2xl font-bold text-green-600">{metrics.complianceMetrics.overallComplianceRate}%</p>
                  <p className="text-xs text-green-600">Excellent</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Expiring Certificates</p>
                  <p className="text-2xl font-bold text-orange-600">{metrics.complianceMetrics.expiringCertifications}</p>
                  <p className="text-xs text-orange-600">Next 60 days</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Audits Due</p>
                  <p className="text-2xl font-bold text-yellow-600">{metrics.complianceMetrics.auditsDue}</p>
                  <p className="text-xs text-yellow-600">This quarter</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Non-Compliance</p>
                  <p className="text-2xl font-bold text-red-600">{metrics.complianceMetrics.nonComplianceIssues}</p>
                  <p className="text-xs text-red-600">Open issues</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Standards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Compliance Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {config.complianceStandards.map((standard, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{standard}</h4>
                      <p className="text-sm text-muted-foreground">Industry requirement</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Compliant
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Financial Analytics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Spend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Spend</span>
                    <span className="font-bold">₹{(metrics.financialMetrics.totalSpend / 10000000).toFixed(1)}Cr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cost Savings</span>
                    <span className="font-bold text-green-600">₹{(metrics.financialMetrics.costSavingsRealized / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Budget Variance</span>
                    <span className={`font-bold ${metrics.financialMetrics.budgetVariance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metrics.financialMetrics.budgetVariance > 0 ? '+' : ''}{metrics.financialMetrics.budgetVariance.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Payment Period</span>
                    <span className="font-bold">{metrics.financialMetrics.averagePaymentPeriod} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Supplier Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New Suppliers</span>
                    <span className="font-bold text-green-600">+3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Onboarding in Progress</span>
                    <span className="font-bold text-blue-600">{metrics.onboardingMetrics.onboardingInProgress}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Approvals</span>
                    <span className="font-bold text-orange-600">{metrics.onboardingMetrics.pendingApprovals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-bold text-green-600">{metrics.onboardingMetrics.onboardingSuccess}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Delivery Performance</h4>
                  <p className="text-2xl font-bold">{metrics.performanceMetrics.onTimeDeliveryRate}%</p>
                  <p className="text-sm text-muted-foreground">On-time delivery rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Quality Performance</h4>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold">{metrics.performanceMetrics.qualityScore.toFixed(1)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Average quality score</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Risk Performance</h4>
                  <p className="text-2xl font-bold text-green-600">{100 - metrics.performanceMetrics.riskExposure}%</p>
                  <p className="text-sm text-muted-foreground">Risk mitigation rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                All Supplier Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.alertId} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{alert.title}</h4>
                            <Badge variant="outline" className={
                              alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                              alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                              alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }>
                              {alert.severity.toUpperCase()}
                            </Badge>
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
                          <Button variant="outline" size="sm" onClick={() => {
                            console.log('Viewing alert details for:', alert.title);
                          }}>
                            View Details
                          </Button>
                          <Button size="sm" onClick={() => {
                            console.log('Taking action on alert:', alert.title);
                          }}>
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
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-medium mb-2">No Active Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    All suppliers are performing within acceptable parameters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TenantSupplyChainDashboard;
