import { useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Award,
  Clock,
  DollarSign,
  Truck,
  Star,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Download,
  RefreshCw,
  Filter
} from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';

// Mock performance data
const mockPerformanceData = [
  {
    supplierId: 'SUP001',
    supplierName: 'TechCorp Solutions',
    category: 'Technology',
    onTimeDelivery: 96,
    qualityScore: 4.8,
    costEfficiency: 92,
    responseTime: 2.1,
    defectRate: 0.5,
    orderFulfillment: 98,
    trend: 'up',
    totalOrders: 156,
    totalValue: 2450000,
    lastMonth: { onTime: 94, quality: 4.6, cost: 90 }
  },
  {
    supplierId: 'SUP002',
    supplierName: 'BuildMat Industries',
    category: 'Construction',
    onTimeDelivery: 88,
    qualityScore: 4.2,
    costEfficiency: 85,
    responseTime: 3.2,
    defectRate: 1.2,
    orderFulfillment: 92,
    trend: 'stable',
    totalOrders: 89,
    totalValue: 1800000,
    lastMonth: { onTime: 87, quality: 4.1, cost: 84 }
  },
  {
    supplierId: 'SUP003',
    supplierName: 'GreenEnergy Components',
    category: 'Renewable Energy',
    onTimeDelivery: 91,
    qualityScore: 4.5,
    costEfficiency: 88,
    responseTime: 2.8,
    defectRate: 0.8,
    orderFulfillment: 95,
    trend: 'up',
    totalOrders: 23,
    totalValue: 650000,
    lastMonth: { onTime: 89, quality: 4.3, cost: 86 }
  },
  {
    supplierId: 'SUP004',
    supplierName: 'SafetyFirst Equipment',
    category: 'Safety',
    onTimeDelivery: 99,
    qualityScore: 4.9,
    costEfficiency: 94,
    responseTime: 1.5,
    defectRate: 0.2,
    orderFulfillment: 99,
    trend: 'up',
    totalOrders: 234,
    totalValue: 890000,
    lastMonth: { onTime: 98, quality: 4.8, cost: 93 }
  }
];

const performanceMetrics = [
  { name: 'On-Time Delivery', key: 'onTimeDelivery', unit: '%', target: 95, icon: Clock },
  { name: 'Quality Score', key: 'qualityScore', unit: '/5', target: 4.5, icon: Star },
  { name: 'Cost Efficiency', key: 'costEfficiency', unit: '%', target: 90, icon: DollarSign },
  { name: 'Order Fulfillment', key: 'orderFulfillment', unit: '%', target: 95, icon: CheckCircle }
];

const SCMPerformance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('last_month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const filteredData = selectedCategory === 'all' 
    ? mockPerformanceData 
    : mockPerformanceData.filter(d => d.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case 'up':
        return <Badge variant="default" className="bg-green-100 text-green-800">
          <TrendingUp className="h-3 w-3 mr-1" />
          Improving
        </Badge>;
      case 'down':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">
          <TrendingDown className="h-3 w-3 mr-1" />
          Declining
        </Badge>;
      case 'stable':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">
          Stable
        </Badge>;
      default:
        return <Badge variant="outline">{trend}</Badge>;
    }
  };

  const getPerformanceColor = (value: number, target: number, isReverse = false) => {
    const threshold = isReverse ? target * 1.2 : target * 0.8;
    if (isReverse) {
      return value <= threshold ? 'text-green-600' : value <= target ? 'text-yellow-600' : 'text-red-600';
    } else {
      return value >= target ? 'text-green-600' : value >= threshold ? 'text-yellow-600' : 'text-red-600';
    }
  };

  const avgMetrics = {
    onTimeDelivery: Math.round(filteredData.reduce((sum, d) => sum + d.onTimeDelivery, 0) / filteredData.length),
    qualityScore: Number((filteredData.reduce((sum, d) => sum + d.qualityScore, 0) / filteredData.length).toFixed(1)),
    costEfficiency: Math.round(filteredData.reduce((sum, d) => sum + d.costEfficiency, 0) / filteredData.length),
    responseTime: Number((filteredData.reduce((sum, d) => sum + d.responseTime, 0) / filteredData.length).toFixed(1))
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Performance Analytics</h1>
            <p className="text-muted-foreground">
              Monitor and analyze supplier performance metrics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div>
                <Label>Time Period</Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last_week">Last Week</SelectItem>
                    <SelectItem value="last_month">Last Month</SelectItem>
                    <SelectItem value="last_quarter">Last Quarter</SelectItem>
                    <SelectItem value="last_year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="renewable">Renewable Energy</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Performance Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg On-Time Delivery</p>
                  <AnimatedCounter 
                    value={avgMetrics.onTimeDelivery} 
                    suffix="%" 
                    className={`text-2xl font-bold ${getPerformanceColor(avgMetrics.onTimeDelivery, 95)}`} 
                  />
                  <p className="text-xs text-muted-foreground">Target: 95%</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Quality Score</p>
                  <AnimatedCounter 
                    value={avgMetrics.qualityScore} 
                    decimals={1}
                    suffix="/5" 
                    className={`text-2xl font-bold ${getPerformanceColor(avgMetrics.qualityScore, 4.5)}`} 
                  />
                  <p className="text-xs text-muted-foreground">Target: 4.5/5</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Cost Efficiency</p>
                  <AnimatedCounter 
                    value={avgMetrics.costEfficiency} 
                    suffix="%" 
                    className={`text-2xl font-bold ${getPerformanceColor(avgMetrics.costEfficiency, 90)}`} 
                  />
                  <p className="text-xs text-muted-foreground">Target: 90%</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                  <AnimatedCounter 
                    value={avgMetrics.responseTime} 
                    decimals={1}
                    suffix=" days" 
                    className={`text-2xl font-bold ${getPerformanceColor(avgMetrics.responseTime, 3, true)}`} 
                  />
                  <p className="text-xs text-muted-foreground">Target: &lt;3 days</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Analysis Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
            <TabsTrigger value="benchmarking">Benchmarking</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Supplier Performance Cards */}
            <div className="grid gap-4">
              {filteredData.map((supplier) => (
                <Card key={supplier.supplierId} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-lg font-semibold">{supplier.supplierName}</h3>
                          <Badge variant="outline">{supplier.category}</Badge>
                          {getTrendBadge(supplier.trend)}
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">On-Time Delivery</div>
                            <div className="flex items-center gap-2">
                              <Progress value={supplier.onTimeDelivery} className="flex-1 h-2" />
                              <span className={`font-medium ${getPerformanceColor(supplier.onTimeDelivery, 95)}`}>
                                {supplier.onTimeDelivery}%
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Quality Score</div>
                            <div className="flex items-center gap-2">
                              <Progress value={supplier.qualityScore * 20} className="flex-1 h-2" />
                              <span className={`font-medium ${getPerformanceColor(supplier.qualityScore, 4.5)}`}>
                                {supplier.qualityScore}/5
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Cost Efficiency</div>
                            <div className="flex items-center gap-2">
                              <Progress value={supplier.costEfficiency} className="flex-1 h-2" />
                              <span className={`font-medium ${getPerformanceColor(supplier.costEfficiency, 90)}`}>
                                {supplier.costEfficiency}%
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Defect Rate</div>
                            <div className="flex items-center gap-2">
                              <Progress value={100 - (supplier.defectRate * 10)} className="flex-1 h-2" />
                              <span className={`font-medium ${getPerformanceColor(supplier.defectRate, 1, true)}`}>
                                {supplier.defectRate}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                          <span>Orders: {supplier.totalOrders}</span>
                          <span>Value: ${supplier.totalValue.toLocaleString()}</span>
                          <span>Response: {supplier.responseTime} days</span>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedSupplier(supplier)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Distribution</CardTitle>
                  <CardDescription>
                    Distribution of suppliers across performance tiers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        High Performers (90%+)
                      </span>
                      <span className="font-medium">
                        {filteredData.filter(d => d.onTimeDelivery >= 90 && d.qualityScore >= 4.5).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        Medium Performers (75-90%)
                      </span>
                      <span className="font-medium">
                        {filteredData.filter(d => d.onTimeDelivery >= 75 && d.onTimeDelivery < 90).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        Low Performers (&lt;75%)
                      </span>
                      <span className="font-medium">
                        {filteredData.filter(d => d.onTimeDelivery < 75).length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Performance Indicators</CardTitle>
                  <CardDescription>
                    Target vs. actual performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceMetrics.map((metric) => {
                      const IconComponent = metric.icon;
                      const avgValue = metric.key === 'qualityScore' 
                        ? avgMetrics[metric.key as keyof typeof avgMetrics] 
                        : avgMetrics[metric.key as keyof typeof avgMetrics];
                      
                      return (
                        <div key={metric.key} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{metric.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{avgValue}{metric.unit}</div>
                            <div className="text-xs text-muted-foreground">Target: {metric.target}{metric.unit}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Trends</CardTitle>
                <CardDescription>
                  Month-over-month performance changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredData.map((supplier) => (
                    <div key={supplier.supplierId} className="border rounded p-4">
                      <h4 className="font-medium mb-3">{supplier.supplierName}</h4>
                      <div className="grid gap-3 md:grid-cols-3">
                        <div>
                          <div className="text-sm text-muted-foreground">On-Time Delivery</div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{supplier.onTimeDelivery}%</span>
                            <span className={`text-xs ${supplier.onTimeDelivery > supplier.lastMonth.onTime ? 'text-green-600' : 'text-red-600'}`}>
                              {supplier.onTimeDelivery > supplier.lastMonth.onTime ? '+' : ''}
                              {(supplier.onTimeDelivery - supplier.lastMonth.onTime).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Quality Score</div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{supplier.qualityScore}/5</span>
                            <span className={`text-xs ${supplier.qualityScore > supplier.lastMonth.quality ? 'text-green-600' : 'text-red-600'}`}>
                              {supplier.qualityScore > supplier.lastMonth.quality ? '+' : ''}
                              {(supplier.qualityScore - supplier.lastMonth.quality).toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Cost Efficiency</div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{supplier.costEfficiency}%</span>
                            <span className={`text-xs ${supplier.costEfficiency > supplier.lastMonth.cost ? 'text-green-600' : 'text-red-600'}`}>
                              {supplier.costEfficiency > supplier.lastMonth.cost ? '+' : ''}
                              {(supplier.costEfficiency - supplier.lastMonth.cost).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benchmarking" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Industry Benchmarks</CardTitle>
                  <CardDescription>
                    Compare against industry standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>On-Time Delivery</span>
                        <span>Your Avg: {avgMetrics.onTimeDelivery}% | Industry: 88%</span>
                      </div>
                      <Progress value={avgMetrics.onTimeDelivery} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Quality Score</span>
                        <span>Your Avg: {avgMetrics.qualityScore}/5 | Industry: 4.2/5</span>
                      </div>
                      <Progress value={avgMetrics.qualityScore * 20} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cost Efficiency</span>
                        <span>Your Avg: {avgMetrics.costEfficiency}% | Industry: 85%</span>
                      </div>
                      <Progress value={avgMetrics.costEfficiency} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Performers</CardTitle>
                  <CardDescription>
                    Best performing suppliers this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredData
                      .sort((a, b) => (b.onTimeDelivery + b.qualityScore * 20 + b.costEfficiency) - (a.onTimeDelivery + a.qualityScore * 20 + a.costEfficiency))
                      .slice(0, 3)
                      .map((supplier, index) => (
                        <div key={supplier.supplierId} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            index === 0 ? 'bg-yellow-100 text-yellow-800' :
                            index === 1 ? 'bg-gray-100 text-gray-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{supplier.supplierName}</div>
                            <div className="text-xs text-muted-foreground">{supplier.category}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{supplier.onTimeDelivery}%</div>
                            <div className="text-xs text-muted-foreground">On-time</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Supplier Details Modal */}
        {selectedSupplier && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{selectedSupplier.supplierName}</h2>
                <Button variant="outline" onClick={() => setSelectedSupplier(null)}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>On-Time Delivery</span>
                          <span className="font-medium">{selectedSupplier.onTimeDelivery}%</span>
                        </div>
                        <Progress value={selectedSupplier.onTimeDelivery} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Quality Score</span>
                          <span className="font-medium">{selectedSupplier.qualityScore}/5</span>
                        </div>
                        <Progress value={selectedSupplier.qualityScore * 20} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Cost Efficiency</span>
                          <span className="font-medium">{selectedSupplier.costEfficiency}%</span>
                        </div>
                        <Progress value={selectedSupplier.costEfficiency} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Order Fulfillment</span>
                          <span className="font-medium">{selectedSupplier.orderFulfillment}%</span>
                        </div>
                        <Progress value={selectedSupplier.orderFulfillment} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Total Orders:</span>
                        <span className="font-medium">{selectedSupplier.totalOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Value:</span>
                        <span className="font-medium">${selectedSupplier.totalValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response Time:</span>
                        <span className="font-medium">{selectedSupplier.responseTime} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Defect Rate:</span>
                        <span className="font-medium">{selectedSupplier.defectRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Performance Trend:</span>
                        {getTrendBadge(selectedSupplier.trend)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Generate Report</Button>
                  <Button>Schedule Review</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SCMPerformance;
