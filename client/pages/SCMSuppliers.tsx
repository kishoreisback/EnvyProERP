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
  Plus,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';

// Mock data for suppliers
const mockSuppliers = [
  {
    id: 'SUP001',
    name: 'TechCorp Solutions',
    category: 'Technology',
    status: 'active',
    rating: 4.8,
    contact: 'john.doe@techcorp.com',
    phone: '+1-555-0123',
    location: 'San Francisco, CA',
    joinDate: '2023-01-15',
    totalOrders: 156,
    totalValue: 2450000,
    onTimeDelivery: 96,
    qualityScore: 4.7,
    certifications: ['ISO 9001', 'ISO 27001'],
    riskLevel: 'low'
  },
  {
    id: 'SUP002',
    name: 'BuildMat Industries',
    category: 'Construction Materials',
    status: 'active',
    rating: 4.5,
    contact: 'procurement@buildmat.com',
    phone: '+1-555-0124',
    location: 'Chicago, IL',
    joinDate: '2022-08-20',
    totalOrders: 89,
    totalValue: 1800000,
    onTimeDelivery: 92,
    qualityScore: 4.4,
    certifications: ['ISO 9001'],
    riskLevel: 'medium'
  },
  {
    id: 'SUP003',
    name: 'GreenEnergy Components',
    category: 'Renewable Energy',
    status: 'pending',
    rating: 4.2,
    contact: 'sales@greenenergy.com',
    phone: '+1-555-0125',
    location: 'Austin, TX',
    joinDate: '2024-01-10',
    totalOrders: 23,
    totalValue: 650000,
    onTimeDelivery: 88,
    qualityScore: 4.1,
    certifications: ['ISO 14001'],
    riskLevel: 'low'
  },
  {
    id: 'SUP004',
    name: 'SafetyFirst Equipment',
    category: 'Safety Equipment',
    status: 'active',
    rating: 4.9,
    contact: 'orders@safetyfirst.com',
    phone: '+1-555-0126',
    location: 'Denver, CO',
    joinDate: '2021-11-05',
    totalOrders: 234,
    totalValue: 890000,
    onTimeDelivery: 98,
    qualityScore: 4.8,
    certifications: ['ISO 9001', 'OSHA Certified'],
    riskLevel: 'low'
  },
  {
    id: 'SUP005',
    name: 'GlobalLogistics Corp',
    category: 'Logistics',
    status: 'inactive',
    rating: 3.8,
    contact: 'support@globallogistics.com',
    phone: '+1-555-0127',
    location: 'Miami, FL',
    joinDate: '2020-04-12',
    totalOrders: 67,
    totalValue: 1200000,
    onTimeDelivery: 85,
    qualityScore: 3.9,
    certifications: ['ISO 9001'],
    riskLevel: 'high'
  }
];

const SCMSuppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'inactive':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return <Badge variant="default" className="bg-green-100 text-green-800">Low Risk</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case 'high':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">High Risk</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  const categories = [...new Set(mockSuppliers.map(s => s.category))];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Supplier Management</h1>
            <p className="text-muted-foreground">
              Manage and monitor your supplier relationships
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Suppliers</p>
                  <AnimatedCounter value={mockSuppliers.length} className="text-2xl font-bold" />
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Suppliers</p>
                  <AnimatedCounter 
                    value={mockSuppliers.filter(s => s.status === 'active').length} 
                    className="text-2xl font-bold text-green-600" 
                  />
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <div className="flex items-center gap-1">
                    <AnimatedCounter 
                      value={4.4} 
                      decimals={1}
                      className="text-2xl font-bold text-yellow-600" 
                    />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <AnimatedCounter 
                    value={7990000} 
                    prefix="$"
                    className="text-2xl font-bold text-purple-600" 
                  />
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Suppliers ({filteredSuppliers.length})</CardTitle>
            <CardDescription>
              Manage your supplier database and relationships
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{supplier.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {supplier.contact}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{supplier.category}</TableCell>
                    <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        {supplier.rating}
                      </div>
                    </TableCell>
                    <TableCell>{supplier.totalOrders}</TableCell>
                    <TableCell>${supplier.totalValue.toLocaleString()}</TableCell>
                    <TableCell>{getRiskBadge(supplier.riskLevel)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedSupplier(supplier)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedSupplier(supplier);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Supplier Details Modal */}
        <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedSupplier && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {selectedSupplier.name}
                  </DialogTitle>
                  <DialogDescription>
                    Detailed supplier information and performance metrics
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedSupplier.contact}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedSupplier.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedSupplier.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Joined {selectedSupplier.joinDate}</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Key Metrics</CardTitle>
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
                            <span>Rating:</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{selectedSupplier.rating}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span>Risk Level:</span>
                            {getRiskBadge(selectedSupplier.riskLevel)}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Certifications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2 flex-wrap">
                          {selectedSupplier.certifications.map((cert: string) => (
                            <Badge key={cert} variant="secondary" className="bg-blue-100 text-blue-800">
                              <Award className="h-3 w-3 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="performance" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Delivery Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">On-Time Delivery</span>
                                <span className="text-sm font-medium">{selectedSupplier.onTimeDelivery}%</span>
                              </div>
                              <Progress value={selectedSupplier.onTimeDelivery} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Quality Score</span>
                                <span className="text-sm font-medium">{selectedSupplier.qualityScore}/5.0</span>
                              </div>
                              <Progress value={selectedSupplier.qualityScore * 20} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Performance Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Last 30 days</span>
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                +2.5%
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Quality improvement</span>
                              <Badge variant="default" className="bg-blue-100 text-blue-800">
                                <Star className="h-3 w-3 mr-1" />
                                +0.3
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Cost efficiency</span>
                              <Badge variant="default" className="bg-purple-100 text-purple-800">
                                <BarChart3 className="h-3 w-3 mr-1" />
                                +5.2%
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="orders" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Orders</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className="flex justify-between items-center p-3 border rounded">
                              <div>
                                <div className="font-medium">Order #{selectedSupplier.id}00{i}</div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">${(Math.random() * 50000 + 10000).toFixed(0)}</div>
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  Delivered
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="compliance" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Compliance Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Documentation</span>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Complete
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Insurance</span>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Valid
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Audit Status</span>
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Due in 30 days
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Supplier Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Supplier</DialogTitle>
              <DialogDescription>
                Enter supplier information to add them to your database
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="supplierName">Supplier Name</Label>
                <Input id="supplierName" placeholder="Enter supplier name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="supplier@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1-555-0000" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, State" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setIsAddModalOpen(false);
                  // Show success notification
                  const notification = document.createElement('div');
                  notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50';
                  notification.innerHTML = '✅ Supplier added successfully!';
                  document.body.appendChild(notification);
                  setTimeout(() => notification.remove(), 3000);
                }}>
                  Add Supplier
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default SCMSuppliers;
