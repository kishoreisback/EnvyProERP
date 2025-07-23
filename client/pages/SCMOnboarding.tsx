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
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import {
  UserPlus,
  CheckCircle,
  Clock,
  FileText,
  Upload,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Star,
  AlertTriangle,
  ArrowRight,
  Plus,
  Eye,
  Download
} from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';

// Mock onboarding data
const mockOnboardingRequests = [
  {
    id: 'ONB001',
    supplierName: 'TechFlow Solutions',
    contactPerson: 'Alice Johnson',
    email: 'alice@techflow.com',
    phone: '+1-555-0190',
    company: 'TechFlow Solutions Inc.',
    address: '123 Innovation Drive, San Jose, CA',
    category: 'Technology Services',
    status: 'in_review',
    submissionDate: '2024-01-15',
    estimatedCompletion: '2024-02-15',
    progress: 65,
    documentsSubmitted: 8,
    documentsRequired: 12,
    assignedTo: 'John Smith',
    priority: 'high'
  },
  {
    id: 'ONB002',
    supplierName: 'EcoMaterials Corp',
    contactPerson: 'Robert Green',
    email: 'r.green@ecomaterials.com',
    phone: '+1-555-0191',
    company: 'EcoMaterials Corporation',
    address: '456 Sustainable Street, Portland, OR',
    category: 'Construction Materials',
    status: 'pending_documents',
    submissionDate: '2024-01-20',
    estimatedCompletion: '2024-02-20',
    progress: 40,
    documentsSubmitted: 5,
    documentsRequired: 12,
    assignedTo: 'Sarah Wilson',
    priority: 'medium'
  },
  {
    id: 'ONB003',
    supplierName: 'QualityFirst Manufacturing',
    contactPerson: 'Michael Chen',
    email: 'm.chen@qualityfirst.com',
    phone: '+1-555-0192',
    company: 'QualityFirst Manufacturing Ltd.',
    address: '789 Industrial Blvd, Detroit, MI',
    category: 'Manufacturing',
    status: 'approved',
    submissionDate: '2024-01-05',
    estimatedCompletion: '2024-02-05',
    progress: 100,
    documentsSubmitted: 12,
    documentsRequired: 12,
    assignedTo: 'Lisa Chen',
    priority: 'low'
  },
  {
    id: 'ONB004',
    supplierName: 'SafeGuard Equipment',
    contactPerson: 'Emma Davis',
    email: 'e.davis@safeguard.com',
    phone: '+1-555-0193',
    company: 'SafeGuard Equipment LLC',
    address: '321 Safety Lane, Houston, TX',
    category: 'Safety Equipment',
    status: 'rejected',
    submissionDate: '2024-01-10',
    estimatedCompletion: '2024-02-10',
    progress: 25,
    documentsSubmitted: 3,
    documentsRequired: 12,
    assignedTo: 'Mike Johnson',
    priority: 'low'
  }
];

const onboardingSteps = [
  { id: 1, name: 'Application Submission', description: 'Supplier submits initial application' },
  { id: 2, name: 'Document Collection', description: 'Required documents and certifications' },
  { id: 3, name: 'Background Verification', description: 'Credit and reference checks' },
  { id: 4, name: 'Compliance Review', description: 'Safety and regulatory compliance' },
  { id: 5, name: 'Site Inspection', description: 'Physical facility assessment (if required)' },
  { id: 6, name: 'Contract Negotiation', description: 'Terms and conditions agreement' },
  { id: 7, name: 'System Integration', description: 'IT systems and portal access setup' },
  { id: 8, name: 'Final Approval', description: 'Final review and supplier activation' }
];

const SCMOnboarding = () => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_review':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Clock className="h-3 w-3 mr-1" />
          In Review
        </Badge>;
      case 'pending_documents':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <FileText className="h-3 w-3 mr-1" />
          Pending Documents
        </Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const onboardingStats = {
    total: mockOnboardingRequests.length,
    inReview: mockOnboardingRequests.filter(r => r.status === 'in_review').length,
    approved: mockOnboardingRequests.filter(r => r.status === 'approved').length,
    pending: mockOnboardingRequests.filter(r => r.status === 'pending_documents').length
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Supplier Onboarding</h1>
            <p className="text-muted-foreground">
              Streamline the supplier onboarding process
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsNewRequestOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Onboarding Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                  <AnimatedCounter value={onboardingStats.total} className="text-2xl font-bold" />
                </div>
                <UserPlus className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Review</p>
                  <AnimatedCounter value={onboardingStats.inReview} className="text-2xl font-bold text-blue-600" />
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <AnimatedCounter value={onboardingStats.approved} className="text-2xl font-bold text-green-600" />
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Docs</p>
                  <AnimatedCounter value={onboardingStats.pending} className="text-2xl font-bold text-yellow-600" />
                </div>
                <FileText className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">Onboarding Requests</TabsTrigger>
            <TabsTrigger value="process">Onboarding Process</TabsTrigger>
            <TabsTrigger value="templates">Document Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            {/* Request Cards */}
            <div className="grid gap-4">
              {mockOnboardingRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{request.supplierName}</h3>
                          {getStatusBadge(request.status)}
                          {getPriorityBadge(request.priority)}
                        </div>
                        
                        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {request.contactPerson}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {request.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {request.submissionDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {request.category}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress:</span>
                            <span className="font-medium">{request.progress}%</span>
                          </div>
                          <Progress value={request.progress} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <span>Documents:</span>
                            <span className="font-medium">
                              {request.documentsSubmitted}/{request.documentsRequired}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="process" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Process Steps</CardTitle>
                <CardDescription>
                  Standard workflow for supplier onboarding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {onboardingSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                        {step.id}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{step.name}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      {index < onboardingSteps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Document Templates</CardTitle>
                  <CardDescription>
                    Standard forms and templates for supplier onboarding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'Supplier Application Form',
                    'Business License Template',
                    'Insurance Certificate Form',
                    'Tax Documentation',
                    'Quality Certification Template',
                    'Safety Compliance Checklist'
                  ].map((template, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{template}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Compliance Checklists</CardTitle>
                  <CardDescription>
                    Industry-specific compliance requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'ISO 9001 Quality Management',
                    'Environmental Compliance',
                    'Safety Standards (OSHA)',
                    'Data Protection (GDPR)',
                    'Financial Compliance',
                    'Industry-Specific Requirements'
                  ].map((checklist, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{checklist}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Request Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{selectedRequest.supplierName}</h2>
                <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Contact Person</Label>
                    <p className="text-sm">{selectedRequest.contactPerson}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm">{selectedRequest.email}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p className="text-sm">{selectedRequest.phone}</p>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <p className="text-sm">{selectedRequest.category}</p>
                  </div>
                  <div>
                    <Label>Assigned To</Label>
                    <p className="text-sm">{selectedRequest.assignedTo}</p>
                  </div>
                </div>

                <div>
                  <Label>Company Address</Label>
                  <p className="text-sm">{selectedRequest.address}</p>
                </div>

                <div>
                  <Label>Progress</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={selectedRequest.progress} className="flex-1" />
                    <span className="font-medium">{selectedRequest.progress}%</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Send Message</Button>
                  <Button>Approve</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Request Modal */}
        {isNewRequestOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">New Onboarding Request</h2>
                <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="supplierName">Supplier Name</Label>
                    <Input id="supplierName" placeholder="Enter supplier name" />
                  </div>
                  <div>
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input id="contactPerson" placeholder="Enter contact person" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="supplier@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+1-555-0000" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Enter company name" />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter company address" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology Services</SelectItem>
                        <SelectItem value="construction">Construction Materials</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="safety">Safety Equipment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    setIsNewRequestOpen(false);
                    // Show success notification
                    const notification = document.createElement('div');
                    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50';
                    notification.innerHTML = '✅ Onboarding request created successfully!';
                    document.body.appendChild(notification);
                    setTimeout(() => notification.remove(), 3000);
                  }}>
                    Create Request
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SCMOnboarding;
