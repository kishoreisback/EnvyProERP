import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Upload,
  Download,
  Eye,
  Edit,
  Plus,
  UserPlus,
  FileText,
  Building2,
  CreditCard,
  Shield,
  Award,
  Users,
  Calendar,
  ArrowRight,
  ArrowLeft,
  MoreHorizontal,
  Search,
  Filter
} from 'lucide-react';
import { SupplierOnboardingWorkflow, TenantSupplier, TenantSupplyChainConfig } from './types';
import { 
  getTenantOnboardingWorkflows, 
  getTenantSupplyChainConfig,
  getIndustrySpecificSupplierTypes 
} from './data';

interface SupplierOnboardingProps {
  tenantId: string;
}

export const SupplierOnboarding = ({ tenantId }: SupplierOnboardingProps) => {
  const [workflows, setWorkflows] = useState<SupplierOnboardingWorkflow[]>([]);
  const [config, setConfig] = useState<TenantSupplyChainConfig | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<SupplierOnboardingWorkflow | null>(null);
  const [activeTab, setActiveTab] = useState('active');
  const [isNewSupplierDialogOpen, setIsNewSupplierDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // New supplier form data
  const [newSupplierData, setNewSupplierData] = useState({
    supplierName: '',
    legalName: '',
    supplierType: '',
    businessCategory: '',
    primaryContact: '',
    email: '',
    phone: '',
    website: '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
    annualTurnover: 0,
    yearsInBusiness: 0,
    employeeCount: 0
  });

  useEffect(() => {
    const tenantConfig = getTenantSupplyChainConfig(tenantId);
    const tenantWorkflows = getTenantOnboardingWorkflows(tenantId);
    
    setConfig(tenantConfig || null);
    setWorkflows(tenantWorkflows);
  }, [tenantId]);

  const handleStartOnboarding = () => {
    const newWorkflow: SupplierOnboardingWorkflow = {
      workflowId: `workflow_${Date.now()}`,
      tenantId,
      supplierId: `supplier_${Date.now()}`,
      supplierName: newSupplierData.supplierName,
      initiatedBy: 'current_user',
      initiatedAt: new Date().toISOString(),
      targetCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      currentStep: 1,
      overallProgress: 10,
      status: 'initiated',
      priority: 'medium',
      
      steps: [
        {
          stepId: 'step_001',
          stepName: 'Basic Information',
          description: 'Company registration and contact details',
          isRequired: true,
          isCompleted: false,
          documents: [
            {
              documentType: 'incorporation_certificate',
              documentName: 'Certificate of Incorporation',
              isRequired: true,
              isUploaded: false,
              status: 'pending'
            },
            {
              documentType: 'trade_license',
              documentName: 'Trade License',
              isRequired: true,
              isUploaded: false,
              status: 'pending'
            }
          ],
          formFields: [
            { fieldName: 'company_name', fieldType: 'text', isRequired: true, value: newSupplierData.supplierName },
            { fieldName: 'legal_name', fieldType: 'text', isRequired: true, value: newSupplierData.legalName },
            { fieldName: 'supplier_type', fieldType: 'select', isRequired: true, value: newSupplierData.supplierType }
          ]
        },
        {
          stepId: 'step_002',
          stepName: 'Financial Information',
          description: 'Banking details and financial statements',
          isRequired: true,
          isCompleted: false,
          documents: [
            {
              documentType: 'financial_statements',
              documentName: 'Audited Financial Statements (Last 3 Years)',
              isRequired: true,
              isUploaded: false,
              status: 'pending'
            },
            {
              documentType: 'bank_certificate',
              documentName: 'Bank Account Certificate',
              isRequired: true,
              isUploaded: false,
              status: 'pending'
            },
            {
              documentType: 'gst_certificate',
              documentName: 'GST Registration Certificate',
              isRequired: true,
              isUploaded: false,
              status: 'pending'
            }
          ],
          formFields: []
        },
        {
          stepId: 'step_003',
          stepName: 'Technical Qualification',
          description: 'Product/service capabilities and quality certifications',
          isRequired: true,
          isCompleted: false,
          documents: [
            {
              documentType: 'product_catalog',
              documentName: 'Product Catalog & Technical Specifications',
              isRequired: true,
              isUploaded: false,
              status: 'pending'
            },
            {
              documentType: 'quality_certificates',
              documentName: 'Quality Management Certifications',
              isRequired: false,
              isUploaded: false,
              status: 'pending'
            }
          ],
          formFields: []
        },
        {
          stepId: 'step_004',
          stepName: 'Compliance & Legal',
          description: 'Legal compliance and regulatory requirements',
          isRequired: true,
          isCompleted: false,
          documents: [
            {
              documentType: 'insurance_policy',
              documentName: 'Insurance Policy Documents',
              isRequired: true,
              isUploaded: false,
              status: 'pending'
            },
            {
              documentType: 'compliance_certificates',
              documentName: 'Regulatory Compliance Certificates',
              isRequired: true,
              isUploaded: false,
              status: 'pending'
            }
          ],
          formFields: []
        },
        {
          stepId: 'step_005',
          stepName: 'Final Approval',
          description: 'Review and final approval process',
          isRequired: true,
          isCompleted: false,
          documents: [],
          formFields: []
        }
      ],
      
      approvals: [
        {
          approvalLevel: 'Technical Team',
          approver: 'technical_manager',
          status: 'pending'
        },
        {
          approvalLevel: 'Finance Team',
          approver: 'finance_manager',
          status: 'pending'
        },
        {
          approvalLevel: 'Procurement Head',
          approver: 'procurement_head',
          status: 'pending'
        }
      ],
      
      notifications: [],
      timeline: [
        {
          activity: 'Onboarding Initiated',
          performedBy: 'current_user',
          performedAt: new Date().toISOString(),
          details: `Supplier onboarding started for ${newSupplierData.supplierName}`
        }
      ]
    };

    setWorkflows(prev => [newWorkflow, ...prev]);
    setIsNewSupplierDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewSupplierData({
      supplierName: '',
      legalName: '',
      supplierType: '',
      businessCategory: '',
      primaryContact: '',
      email: '',
      phone: '',
      website: '',
      addressLine1: '',
      city: '',
      state: '',
      pincode: '',
      annualTurnover: 0,
      yearsInBusiness: 0,
      employeeCount: 0
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      initiated: { variant: 'secondary' as const, color: 'bg-blue-100 text-blue-800' },
      in_progress: { variant: 'default' as const, color: 'bg-yellow-100 text-yellow-800' },
      completed: { variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      rejected: { variant: 'destructive' as const, color: 'bg-red-100 text-red-800' },
      on_hold: { variant: 'secondary' as const, color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status] || statusConfig.initiated;
    return (
      <Badge variant={config.variant} className={config.color}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityColors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge variant="outline" className={priorityColors[priority] || priorityColors.medium}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  const getStepIcon = (stepId: string, isCompleted: boolean) => {
    const icons = {
      step_001: Building2,
      step_002: CreditCard,
      step_003: Award,
      step_004: Shield,
      step_005: CheckCircle
    };
    
    const IconComponent = icons[stepId] || Building2;
    
    if (isCompleted) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    
    return <IconComponent className="h-5 w-5 text-gray-400" />;
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.workflowId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && ['initiated', 'in_progress'].includes(workflow.status)) ||
                      (activeTab === 'completed' && workflow.status === 'completed') ||
                      (activeTab === 'pending' && workflow.status === 'in_progress');
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  if (!config) {
    return <div>Loading...</div>;
  }

  const supplierTypes = getIndustrySpecificSupplierTypes(config.industryType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Supplier Onboarding</h2>
          <p className="text-muted-foreground">
            Manage supplier registration and qualification process
          </p>
        </div>
        <Dialog open={isNewSupplierDialogOpen} onOpenChange={setIsNewSupplierDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Start New Onboarding
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Initiate Supplier Onboarding</DialogTitle>
              <DialogDescription>
                Start the onboarding process for a new supplier
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-1">
              <div className="space-y-4 pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplierName">Supplier Name *</Label>
                    <Input
                      id="supplierName"
                      value={newSupplierData.supplierName}
                      onChange={(e) => setNewSupplierData(prev => ({ ...prev, supplierName: e.target.value }))}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="legalName">Legal Name</Label>
                    <Input
                      id="legalName"
                      value={newSupplierData.legalName}
                      onChange={(e) => setNewSupplierData(prev => ({ ...prev, legalName: e.target.value }))}
                      placeholder="Legal entity name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplierType">Supplier Type *</Label>
                    <Select value={newSupplierData.supplierType} onValueChange={(value) => 
                      setNewSupplierData(prev => ({ ...prev, supplierType: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {supplierTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-muted-foreground">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="businessCategory">Business Category *</Label>
                    <Select value={newSupplierData.businessCategory} onValueChange={(value) => 
                      setNewSupplierData(prev => ({ ...prev, businessCategory: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {config.supplierCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryContact">Primary Contact *</Label>
                      <Input
                        id="primaryContact"
                        value={newSupplierData.primaryContact}
                        onChange={(e) => setNewSupplierData(prev => ({ ...prev, primaryContact: e.target.value }))}
                        placeholder="Contact person name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newSupplierData.email}
                        onChange={(e) => setNewSupplierData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="email@company.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={newSupplierData.phone}
                        onChange={(e) => setNewSupplierData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 9999999999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={newSupplierData.website}
                        onChange={(e) => setNewSupplierData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://company.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Business Information</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="annualTurnover">Annual Turnover ({config.defaultCurrency})</Label>
                      <Input
                        id="annualTurnover"
                        type="number"
                        value={newSupplierData.annualTurnover}
                        onChange={(e) => setNewSupplierData(prev => ({ ...prev, annualTurnover: Number(e.target.value) }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="yearsInBusiness">Years in Business</Label>
                      <Input
                        id="yearsInBusiness"
                        type="number"
                        value={newSupplierData.yearsInBusiness}
                        onChange={(e) => setNewSupplierData(prev => ({ ...prev, yearsInBusiness: Number(e.target.value) }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="employeeCount">Employee Count</Label>
                      <Input
                        id="employeeCount"
                        type="number"
                        value={newSupplierData.employeeCount}
                        onChange={(e) => setNewSupplierData(prev => ({ ...prev, employeeCount: Number(e.target.value) }))}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Address</h4>
                  <div>
                    <Label htmlFor="addressLine1">Address *</Label>
                    <Input
                      id="addressLine1"
                      value={newSupplierData.addressLine1}
                      onChange={(e) => setNewSupplierData(prev => ({ ...prev, addressLine1: e.target.value }))}
                      placeholder="Street address"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={newSupplierData.city}
                        onChange={(e) => setNewSupplierData(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={newSupplierData.state}
                        onChange={(e) => setNewSupplierData(prev => ({ ...prev, state: e.target.value }))}
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={newSupplierData.pincode}
                        onChange={(e) => setNewSupplierData(prev => ({ ...prev, pincode: e.target.value }))}
                        placeholder="000000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsNewSupplierDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleStartOnboarding} disabled={!newSupplierData.supplierName || !newSupplierData.supplierType}>
                Start Onboarding
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by supplier name or workflow ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="initiated">Initiated</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="on_hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active ({workflows.filter(w => ['initiated', 'in_progress'].includes(w.status)).length})</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval ({workflows.filter(w => w.status === 'in_progress').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({workflows.filter(w => w.status === 'completed').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Current Step</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Target Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkflows.map((workflow) => (
                  <TableRow key={workflow.workflowId}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{workflow.supplierName}</div>
                        <div className="text-sm text-muted-foreground">{workflow.workflowId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {workflow.steps[0]?.formFields.find(f => f.fieldName === 'supplier_type')?.value || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{workflow.overallProgress}%</span>
                          <span>{workflow.currentStep}/{workflow.steps.length}</span>
                        </div>
                        <Progress value={workflow.overallProgress} className="h-2 w-24" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {workflow.steps[workflow.currentStep - 1]?.stepName || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(workflow.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(workflow.priority)}
                    </TableCell>
                    <TableCell>
                      {new Date(workflow.targetCompletionDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedWorkflow(workflow)}
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
      </Tabs>

      {/* Workflow Detail Modal */}
      {selectedWorkflow && (
        <Dialog open={!!selectedWorkflow} onOpenChange={() => setSelectedWorkflow(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>{selectedWorkflow.supplierName} - Onboarding Progress</DialogTitle>
              <DialogDescription>
                Workflow ID: {selectedWorkflow.workflowId} • Status: {selectedWorkflow.status.toUpperCase()}
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6">
                {/* Progress Overview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {selectedWorkflow.currentStep}/{selectedWorkflow.steps.length} steps completed
                    </span>
                  </div>
                  <Progress value={selectedWorkflow.overallProgress} className="h-3" />
                  <div className="text-sm text-muted-foreground">
                    {selectedWorkflow.overallProgress}% complete
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                  <h4 className="font-medium">Onboarding Steps</h4>
                  {selectedWorkflow.steps.map((step, index) => (
                    <Card key={step.stepId} className={step.isCompleted ? 'border-green-200' : 'border-gray-200'}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          {getStepIcon(step.stepId, step.isCompleted)}
                          <div className="flex-1">
                            <CardTitle className="text-base">{step.stepName}</CardTitle>
                            <CardDescription>{step.description}</CardDescription>
                          </div>
                          {step.isCompleted && (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          )}
                          {index + 1 === selectedWorkflow.currentStep && !step.isCompleted && (
                            <Badge variant="default" className="bg-blue-100 text-blue-800">
                              Current Step
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        {step.documents.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium">Required Documents</h5>
                            <div className="space-y-1">
                              {step.documents.map((doc, docIndex) => (
                                <div key={docIndex} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span>{doc.documentName}</span>
                                    {doc.isRequired && <span className="text-red-500">*</span>}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {doc.status === 'verified' && <CheckCircle className="h-4 w-4 text-green-600" />}
                                    {doc.status === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
                                    {doc.status === 'rejected' && <XCircle className="h-4 w-4 text-red-600" />}
                                    <Badge variant="outline" className="text-xs">
                                      {doc.status}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Approvals */}
                <div className="space-y-4">
                  <h4 className="font-medium">Approval Status</h4>
                  <div className="space-y-2">
                    {selectedWorkflow.approvals.map((approval, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium text-sm">{approval.approvalLevel}</div>
                          <div className="text-sm text-muted-foreground">Approver: {approval.approver}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {approval.status === 'approved' && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {approval.status === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
                          {approval.status === 'rejected' && <XCircle className="h-4 w-4 text-red-600" />}
                          <Badge variant="outline">
                            {approval.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  <h4 className="font-medium">Activity Timeline</h4>
                  <div className="space-y-2">
                    {selectedWorkflow.timeline.map((activity, index) => (
                      <div key={index} className="flex gap-3 text-sm">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.activity}</div>
                          <div className="text-muted-foreground">
                            {activity.details} • {new Date(activity.performedAt).toLocaleString()}
                          </div>
                          <div className="text-muted-foreground">By: {activity.performedBy}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SupplierOnboarding;
