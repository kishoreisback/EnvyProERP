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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Building2,
  Phone,
  Mail,
  Globe,
  MapPin,
  Star,
  Award,
  Shield,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  DollarSign,
  FileText,
  Download,
  Upload,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Truck,
  Package,
  CreditCard,
  Plus,
  Minus
} from 'lucide-react';
import { TenantSupplier } from './types';
import { getSupplierById } from './data';

interface SupplierProfileProps {
  supplierId: string;
}

export const SupplierProfile = ({ supplierId }: SupplierProfileProps) => {
  const [supplier, setSupplier] = useState<TenantSupplier | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editSection, setEditSection] = useState('');

  useEffect(() => {
    const supplierData = getSupplierById(supplierId);
    setSupplier(supplierData || null);
  }, [supplierId]);

  if (!supplier) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Building2 className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <p>Supplier not found</p>
        </div>
      </div>
    );
  }

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

  const getCertificationStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      expired: { color: 'bg-red-100 text-red-800', icon: XCircle },
      pending_renewal: { color: 'bg-yellow-100 text-yellow-800', icon: Clock }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{supplier.supplierName}</h1>
            {getStatusBadge(supplier.status)}
            {supplier.isStrategicSupplier && (
              <Badge variant="default" className="bg-purple-100 text-purple-800">
                Strategic Partner
              </Badge>
            )}
            {supplier.isPreferredSupplier && (
              <Badge variant="default" className="bg-blue-100 text-blue-800">
                Preferred Supplier
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{supplier.supplierCode}</span>
            <span>•</span>
            <span className="capitalize">{supplier.supplierType.replace('_', ' ')}</span>
            <span>•</span>
            <span>{supplier.businessCategory}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex">{getRatingStars(supplier.performance.overallRating)}</div>
              <span className="text-sm font-medium">{supplier.performance.overallRating.toFixed(1)}</span>
            </div>
            {getQualificationBadge(supplier.qualification.qualificationStatus)}
            <Badge variant="outline" className="capitalize">
              {supplier.relationship.supplierTier.replace('_', ' ')}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Profile
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Qualification Score</p>
                <p className="text-2xl font-bold">{supplier.qualification.qualificationScore}</p>
                <p className="text-xs text-green-600">out of 100</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On-Time Delivery</p>
                <p className="text-2xl font-bold">{supplier.performance.deliveryPerformance.onTimeDeliveryRate}%</p>
                <p className="text-xs text-muted-foreground">Last 12 months</p>
              </div>
              <Truck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Annual Turnover</p>
                <p className="text-2xl font-bold">₹{(supplier.businessDetails.annualTurnover / 10000000).toFixed(1)}Cr</p>
                <p className="text-xs text-muted-foreground">{supplier.businessDetails.currency}</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                <p className="text-2xl font-bold capitalize">{supplier.riskProfile.riskLevel}</p>
                <p className="text-xs text-muted-foreground">Risk Assessment</p>
              </div>
              <Shield className={`h-8 w-8 ${
                supplier.riskProfile.riskLevel === 'low' ? 'text-green-600' :
                supplier.riskProfile.riskLevel === 'medium' ? 'text-yellow-600' :
                'text-red-600'
              }`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Legal Name</p>
                    <p className="font-medium">{supplier.legalName || supplier.supplierName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Business Model</p>
                    <p className="font-medium">{supplier.businessDetails.businessModel}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Incorporation Date</p>
                    <p className="font-medium">{new Date(supplier.businessDetails.incorporationDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Years in Business</p>
                    <p className="font-medium">{supplier.businessDetails.yearsInBusiness} years</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Employee Count</p>
                    <p className="font-medium">{supplier.businessDetails.employeeCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Market Presence</p>
                    <p className="font-medium">{supplier.businessDetails.marketPresence.join(', ')}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Competencies</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.businessDetails.competencies.map((competency, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {competency}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.businessDetails.specializations.map((specialization, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialization}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Relationship & Engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Relationship & Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Supplier Tier</p>
                    <Badge variant="outline" className="capitalize">
                      {supplier.relationship.supplierTier.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Engagement Level</p>
                    <Badge variant="default" className="capitalize">
                      {supplier.relationship.engagementLevel}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Relationship Manager</p>
                    <p className="font-medium">{supplier.relationship.relationshipManager}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Contract Type</p>
                    <p className="font-medium capitalize">{supplier.relationship.contractType.replace('_', ' ')}</p>
                  </div>
                </div>

                {supplier.relationship.contractDetails && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-sm mb-2">Active Contract</p>
                    <div className="text-xs space-y-1">
                      <p><span className="text-muted-foreground">Contract #:</span> {supplier.relationship.contractDetails.contractNumber}</p>
                      <p><span className="text-muted-foreground">Period:</span> {new Date(supplier.relationship.contractDetails.startDate).toLocaleDateString()} - {new Date(supplier.relationship.contractDetails.endDate).toLocaleDateString()}</p>
                      <p><span className="text-muted-foreground">Auto Renewal:</span> {supplier.relationship.contractDetails.autoRenewal ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-muted-foreground text-sm mb-2">Collaboration Areas</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.relationship.collaborationAreas.map((area, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm mb-2">Development Programs</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.relationship.developmentPrograms.map((program, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Delivery Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>On-Time Delivery</span>
                      <span className="font-medium">{supplier.performance.deliveryPerformance.onTimeDeliveryRate}%</span>
                    </div>
                    <Progress value={supplier.performance.deliveryPerformance.onTimeDeliveryRate} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Delivery Accuracy</span>
                      <span className="font-medium">{supplier.performance.deliveryPerformance.deliveryAccuracy}%</span>
                    </div>
                    <Progress value={supplier.performance.deliveryPerformance.deliveryAccuracy} className="h-2" />
                    
                    <p className="text-xs text-muted-foreground">
                      Avg Lead Time: {supplier.performance.deliveryPerformance.averageLeadTime} days
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Quality Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Quality Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="font-medium">{supplier.performance.qualityMetrics.qualityRating}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Defect Rate</span>
                      <span className="font-medium">{supplier.performance.qualityMetrics.defectRate}%</span>
                    </div>
                    <Progress value={100 - supplier.performance.qualityMetrics.defectRate} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Compliance Score</span>
                      <span className="font-medium">{supplier.performance.qualityMetrics.complianceScore}%</span>
                    </div>
                    <Progress value={supplier.performance.qualityMetrics.complianceScore} className="h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Service Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Response Time</span>
                      <span className="font-medium">{supplier.performance.serviceMetrics.responseTime}h</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Resolution Time</span>
                      <span className="font-medium">{supplier.performance.serviceMetrics.resolutionTime}h</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Customer Satisfaction</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="font-medium">{supplier.performance.serviceMetrics.customerSatisfaction}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Financial Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Payment Reliability</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="font-medium">{supplier.performance.financialMetrics.paymentReliability}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Cost Competitiveness</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="font-medium">{supplier.performance.financialMetrics.costCompetitiveness}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Price Stability</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="font-medium">{supplier.performance.financialMetrics.priceStability}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Primary Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Primary Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">{supplier.contactDetails.primaryContact}</p>
                    <p className="text-sm text-muted-foreground">{supplier.contactDetails.designation}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${supplier.contactDetails.email}`} className="text-sm hover:underline">
                        {supplier.contactDetails.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${supplier.contactDetails.phone}`} className="text-sm hover:underline">
                        {supplier.contactDetails.phone}
                      </a>
                    </div>
                    
                    {supplier.contactDetails.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={supplier.contactDetails.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm hover:underline flex items-center gap-1"
                        >
                          {supplier.contactDetails.website}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alternate Contact */}
            {supplier.contactDetails.alternateContact && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Alternate Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{supplier.contactDetails.alternateContact}</p>
                    </div>
                    
                    <div className="space-y-2">
                      {supplier.contactDetails.alternateEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${supplier.contactDetails.alternateEmail}`} className="text-sm hover:underline">
                            {supplier.contactDetails.alternateEmail}
                          </a>
                        </div>
                      )}
                      
                      {supplier.contactDetails.alternatePhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${supplier.contactDetails.alternatePhone}`} className="text-sm hover:underline">
                            {supplier.contactDetails.alternatePhone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Addresses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Addresses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {supplier.addresses.map((address, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="capitalize">
                        {address.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>{address.city}, {address.state} {address.pincode}</p>
                      <p>{address.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {supplier.operational.emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.designation}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{contact.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Credit Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Credit Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Credit Rating</p>
                    <Badge variant="default" className="capitalize">
                      {supplier.financialInfo.creditRating}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Credit Limit</p>
                    <p className="font-medium">₹{supplier.financialInfo.creditLimit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Credit Period</p>
                    <p className="font-medium">{supplier.financialInfo.creditPeriod} days</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Terms</p>
                    <Badge variant="outline" className="uppercase">
                      {supplier.financialInfo.paymentTerms.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bank Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Banking Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Bank Name</p>
                    <p className="font-medium">{supplier.financialInfo.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Account Number</p>
                    <p className="font-medium">{supplier.financialInfo.bankDetails.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">IFSC Code</p>
                    <p className="font-medium">{supplier.financialInfo.bankDetails.ifscCode}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Account Type</p>
                    <p className="font-medium">{supplier.financialInfo.bankDetails.accountType}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tax Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Tax Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {supplier.financialInfo.taxInformation.gstNumber && (
                  <div>
                    <p className="text-muted-foreground text-sm">GST Number</p>
                    <p className="font-medium">{supplier.financialInfo.taxInformation.gstNumber}</p>
                  </div>
                )}
                {supplier.financialInfo.taxInformation.panNumber && (
                  <div>
                    <p className="text-muted-foreground text-sm">PAN Number</p>
                    <p className="font-medium">{supplier.financialInfo.taxInformation.panNumber}</p>
                  </div>
                )}
                {supplier.financialInfo.taxInformation.tanNumber && (
                  <div>
                    <p className="text-muted-foreground text-sm">TAN Number</p>
                    <p className="font-medium">{supplier.financialInfo.taxInformation.tanNumber}</p>
                  </div>
                )}
              </div>
              
              {supplier.financialInfo.taxInformation.taxExemptions && supplier.financialInfo.taxInformation.taxExemptions.length > 0 && (
                <div className="mt-4">
                  <p className="text-muted-foreground text-sm mb-2">Tax Exemptions</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.financialInfo.taxInformation.taxExemptions.map((exemption, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {exemption}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications & Compliance
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certification
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certification</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Issuing Authority</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplier.certifications.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{cert.certificateName}</div>
                          <div className="text-sm text-muted-foreground">{cert.certificateNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {cert.certificationType}
                        </Badge>
                      </TableCell>
                      <TableCell>{cert.issuingAuthority}</TableCell>
                      <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(cert.expiryDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {getCertificationStatusBadge(cert.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-6">
            {/* Products */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Products
                  </CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>MOQ</TableHead>
                      <TableHead>Lead Time</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplier.offerings.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product.productName}</div>
                            <div className="text-sm text-muted-foreground">
                              {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => 
                                `${key}: ${value}`
                              ).join(', ')}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell>₹{product.unitPrice.toLocaleString()}</TableCell>
                        <TableCell>{product.minimumOrderQuantity}</TableCell>
                        <TableCell>{product.leadTime} days</TableCell>
                        <TableCell>
                          <Badge variant={
                            product.availability === 'in_stock' ? 'default' :
                            product.availability === 'made_to_order' ? 'secondary' : 
                            'destructive'
                          }>
                            {product.availability.replace('_', ' ')}
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
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Services
                  </CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Pricing Model</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplier.offerings.services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{service.serviceName}</div>
                            <div className="text-sm text-muted-foreground">{service.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{service.serviceType}</Badge>
                        </TableCell>
                        <TableCell className="capitalize">{service.pricing.replace('_', ' ')}</TableCell>
                        <TableCell>
                          {service.rate ? `₹${service.rate.toLocaleString()}` : 'Contact for pricing'}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {service.availability.join(', ')}
                          </div>
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {/* Performance Metrics Details */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>On-Time Delivery Rate</span>
                      <span className="font-medium">{supplier.performance.deliveryPerformance.onTimeDeliveryRate}%</span>
                    </div>
                    <Progress value={supplier.performance.deliveryPerformance.onTimeDeliveryRate} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Delivery Accuracy</span>
                      <span className="font-medium">{supplier.performance.deliveryPerformance.deliveryAccuracy}%</span>
                    </div>
                    <Progress value={supplier.performance.deliveryPerformance.deliveryAccuracy} className="h-3" />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Average Lead Time</span>
                    <span className="font-medium">{supplier.performance.deliveryPerformance.averageLeadTime} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Quality Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Quality Rating</span>
                    <div className="flex items-center gap-1">
                      <div className="flex">{getRatingStars(supplier.performance.qualityMetrics.qualityRating)}</div>
                      <span className="font-medium">{supplier.performance.qualityMetrics.qualityRating}/5</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Defect Rate</span>
                      <span className="font-medium text-red-600">{supplier.performance.qualityMetrics.defectRate}%</span>
                    </div>
                    <Progress value={100 - supplier.performance.qualityMetrics.defectRate} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Return Rate</span>
                      <span className="font-medium text-red-600">{supplier.performance.qualityMetrics.returnRate}%</span>
                    </div>
                    <Progress value={100 - supplier.performance.qualityMetrics.returnRate} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compliance Score</span>
                      <span className="font-medium">{supplier.performance.qualityMetrics.complianceScore}%</span>
                    </div>
                    <Progress value={supplier.performance.qualityMetrics.complianceScore} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Service Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Response Time</span>
                    <span className="font-medium">{supplier.performance.serviceMetrics.responseTime} hours</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Resolution Time</span>
                    <span className="font-medium">{supplier.performance.serviceMetrics.resolutionTime} hours</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Customer Satisfaction</span>
                    <div className="flex items-center gap-1">
                      <div className="flex">{getRatingStars(supplier.performance.serviceMetrics.customerSatisfaction)}</div>
                      <span className="font-medium">{supplier.performance.serviceMetrics.customerSatisfaction}/5</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Support Quality</span>
                    <div className="flex items-center gap-1">
                      <div className="flex">{getRatingStars(supplier.performance.serviceMetrics.supportQuality)}</div>
                      <span className="font-medium">{supplier.performance.serviceMetrics.supportQuality}/5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Payment Reliability</span>
                    <div className="flex items-center gap-1">
                      <div className="flex">{getRatingStars(supplier.performance.financialMetrics.paymentReliability)}</div>
                      <span className="font-medium">{supplier.performance.financialMetrics.paymentReliability}/5</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Cost Competitiveness</span>
                    <div className="flex items-center gap-1">
                      <div className="flex">{getRatingStars(supplier.performance.financialMetrics.costCompetitiveness)}</div>
                      <span className="font-medium">{supplier.performance.financialMetrics.costCompetitiveness}/5</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Price Stability</span>
                    <div className="flex items-center gap-1">
                      <div className="flex">{getRatingStars(supplier.performance.financialMetrics.priceStability)}</div>
                      <span className="font-medium">{supplier.performance.financialMetrics.priceStability}/5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-6">
            {/* Audit Trail */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Audit & Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground text-sm">Last Audit Date</p>
                    <p className="font-medium">
                      {supplier.auditTrail.lastAuditDate ? 
                        new Date(supplier.auditTrail.lastAuditDate).toLocaleDateString() : 
                        'Not available'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Next Audit Date</p>
                    <p className="font-medium">
                      {supplier.auditTrail.nextAuditDate ? 
                        new Date(supplier.auditTrail.nextAuditDate).toLocaleDateString() : 
                        'Not scheduled'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Audit Frequency</p>
                    <Badge variant="outline" className="capitalize">
                      {supplier.auditTrail.auditFrequency.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Requirement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Checked</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplier.auditTrail.complianceStatus.map((compliance, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{compliance.requirement}</TableCell>
                        <TableCell>
                          <Badge variant={
                            compliance.status === 'compliant' ? 'default' :
                            compliance.status === 'non_compliant' ? 'destructive' :
                            'secondary'
                          }>
                            {compliance.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(compliance.lastChecked).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {compliance.expiryDate ? 
                            new Date(compliance.expiryDate).toLocaleDateString() :
                            'N/A'
                          }
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Audit Results */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Audit Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supplier.auditTrail.auditResults.map((result, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{result.auditType}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(result.auditDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">Score:</span>
                            <span className="font-bold text-lg">{result.score}</span>
                          </div>
                          <Badge variant={
                            result.status === 'passed' ? 'default' :
                            result.status === 'conditional' ? 'secondary' :
                            'destructive'
                          }>
                            {result.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      {result.findings.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-2">Findings:</p>
                          <ul className="text-sm space-y-1">
                            {result.findings.map((finding, findingIndex) => (
                              <li key={findingIndex} className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {result.correctiveActions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Corrective Actions:</p>
                          <ul className="text-sm space-y-1">
                            {result.correctiveActions.map((action, actionIndex) => (
                              <li key={actionIndex} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Repository
                </CardTitle>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-dashed border-2 flex items-center justify-center p-6 hover:bg-gray-50 cursor-pointer">
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Upload New Document</p>
                      <p className="text-xs text-muted-foreground">Drag & drop or click to browse</p>
                    </div>
                  </Card>
                  
                  <div className="col-span-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Legal Documents</span>
                        <Badge variant="outline">3 files</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Financial Documents</span>
                        <Badge variant="outline">2 files</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Certifications</span>
                        <Badge variant="outline">{supplier.certifications.length} files</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Insurance Documents</span>
                        <Badge variant="outline">1 file</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Product Specifications</span>
                        <Badge variant="outline">5 files</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Documents */}
                <div>
                  <h4 className="font-medium mb-3">Recent Documents</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'ISO 9001:2015 Certificate', type: 'PDF', size: '2.3 MB', uploaded: '2024-01-15' },
                      { name: 'Financial Statement 2023', type: 'PDF', size: '1.8 MB', uploaded: '2024-01-10' },
                      { name: 'Product Catalog v2.1', type: 'PDF', size: '5.2 MB', uploaded: '2024-01-08' },
                      { name: 'Insurance Policy Document', type: 'PDF', size: '0.9 MB', uploaded: '2024-01-05' }
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-6 w-6 text-red-600" />
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.type} • {doc.size} • Uploaded {new Date(doc.uploaded).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierProfile;
