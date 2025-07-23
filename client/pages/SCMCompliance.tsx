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
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import {
  Shield,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Calendar,
  Search,
  Download,
  Plus,
  Eye,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Users,
  Building2
} from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';

// Mock compliance data
const mockComplianceItems = [
  {
    id: 'COMP001',
    supplier: 'TechCorp Solutions',
    requirement: 'ISO 9001 Certification',
    status: 'compliant',
    dueDate: '2024-12-31',
    lastAudit: '2024-01-15',
    riskLevel: 'low',
    documents: ['certificate.pdf', 'audit_report.pdf'],
    auditor: 'John Smith',
    score: 95
  },
  {
    id: 'COMP002',
    supplier: 'BuildMat Industries',
    requirement: 'Safety Standards Compliance',
    status: 'pending',
    dueDate: '2024-03-15',
    lastAudit: '2023-12-10',
    riskLevel: 'medium',
    documents: ['safety_checklist.pdf'],
    auditor: 'Sarah Johnson',
    score: 78
  },
  {
    id: 'COMP003',
    supplier: 'GreenEnergy Components',
    requirement: 'Environmental Compliance',
    status: 'non_compliant',
    dueDate: '2024-02-20',
    lastAudit: '2024-01-05',
    riskLevel: 'high',
    documents: ['env_report.pdf'],
    auditor: 'Mike Wilson',
    score: 62
  },
  {
    id: 'COMP004',
    supplier: 'SafetyFirst Equipment',
    requirement: 'Data Protection Compliance',
    status: 'compliant',
    dueDate: '2024-06-30',
    lastAudit: '2024-01-20',
    riskLevel: 'low',
    documents: ['gdpr_cert.pdf', 'privacy_policy.pdf'],
    auditor: 'Lisa Chen',
    score: 98
  },
  {
    id: 'COMP005',
    supplier: 'GlobalLogistics Corp',
    requirement: 'Financial Audit',
    status: 'pending',
    dueDate: '2024-04-10',
    lastAudit: '2023-10-15',
    riskLevel: 'high',
    documents: ['financial_stmt.pdf'],
    auditor: 'Robert Brown',
    score: 71
  }
];

const mockAudits = [
  {
    id: 'AUD001',
    supplier: 'TechCorp Solutions',
    type: 'Quality Audit',
    date: '2024-02-15',
    status: 'scheduled',
    auditor: 'John Smith',
    duration: '2 days',
    location: 'On-site'
  },
  {
    id: 'AUD002',
    supplier: 'BuildMat Industries',
    type: 'Safety Audit',
    date: '2024-02-20',
    status: 'completed',
    auditor: 'Sarah Johnson',
    duration: '1 day',
    location: 'Remote'
  },
  {
    id: 'AUD003',
    supplier: 'GreenEnergy Components',
    type: 'Environmental Audit',
    date: '2024-03-01',
    status: 'in_progress',
    auditor: 'Mike Wilson',
    duration: '3 days',
    location: 'On-site'
  }
];

const SCMCompliance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isScheduleAuditOpen, setIsScheduleAuditOpen] = useState(false);

  const filteredItems = mockComplianceItems.filter(item => {
    const matchesSearch = item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.requirement.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || item.riskLevel === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge variant="default" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Compliant
        </Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>;
      case 'non_compliant':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Non-Compliant
        </Badge>;
      case 'scheduled':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Calendar className="h-3 w-3 mr-1" />
          Scheduled
        </Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          <RefreshCw className="h-3 w-3 mr-1" />
          In Progress
        </Badge>;
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

  const complianceStats = {
    compliant: mockComplianceItems.filter(i => i.status === 'compliant').length,
    pending: mockComplianceItems.filter(i => i.status === 'pending').length,
    nonCompliant: mockComplianceItems.filter(i => i.status === 'non_compliant').length,
    avgScore: Math.round(mockComplianceItems.reduce((sum, item) => sum + item.score, 0) / mockComplianceItems.length)
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Compliance & Audits</h1>
            <p className="text-muted-foreground">
              Monitor supplier compliance and manage audit schedules
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsScheduleAuditOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Audit
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Compliance Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Compliant</p>
                  <AnimatedCounter value={complianceStats.compliant} className="text-2xl font-bold text-green-600" />
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <AnimatedCounter value={complianceStats.pending} className="text-2xl font-bold text-yellow-600" />
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Non-Compliant</p>
                  <AnimatedCounter value={complianceStats.nonCompliant} className="text-2xl font-bold text-red-600" />
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Score</p>
                  <AnimatedCounter value={complianceStats.avgScore} suffix="%" className="text-2xl font-bold text-blue-600" />
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="compliance" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
            <TabsTrigger value="audits">Audit Schedule</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="compliance" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search compliance items..."
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
                      <SelectItem value="compliant">Compliant</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="non_compliant">Non-Compliant</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Items Table */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Items ({filteredItems.length})</CardTitle>
                <CardDescription>
                  Track compliance status across all suppliers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Requirement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="font-medium">{item.supplier}</div>
                        </TableCell>
                        <TableCell>{item.requirement}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={item.score} className="w-16 h-2" />
                            <span className="text-sm font-medium">{item.score}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {item.dueDate}
                          </div>
                        </TableCell>
                        <TableCell>{getRiskBadge(item.riskLevel)}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedItem(item)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audit Schedule</CardTitle>
                <CardDescription>
                  Manage upcoming and completed audits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Audit ID</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Auditor</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAudits.map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell className="font-medium">{audit.id}</TableCell>
                        <TableCell>{audit.supplier}</TableCell>
                        <TableCell>{audit.type}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {audit.date}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(audit.status)}</TableCell>
                        <TableCell>{audit.auditor}</TableCell>
                        <TableCell>{audit.duration}</TableCell>
                        <TableCell>{audit.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Compliance Overview Report</CardTitle>
                  <CardDescription>
                    Generate comprehensive compliance status report
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Report Period:</span>
                      <span className="font-medium">Last 6 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Suppliers Covered:</span>
                      <span className="font-medium">{mockComplianceItems.length}</span>
                    </div>
                    <Button className="w-full" onClick={() => {
                      const btn = document.activeElement as HTMLButtonElement;
                      btn.disabled = true;
                      btn.innerHTML = '<span class="animate-spin">📄</span> Generating...';
                      setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = '✅ Report Generated • <span class="underline">Download</span>';
                        setTimeout(() => {
                          btn.innerHTML = '<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>Generate Report';
                        }, 3000);
                      }, 2000);
                    }}>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Risk Assessment Report</CardTitle>
                  <CardDescription>
                    Analyze supplier risk levels and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>High Risk Suppliers:</span>
                      <span className="font-medium text-red-600">
                        {mockComplianceItems.filter(i => i.riskLevel === 'high').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Trend:</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Improving
                      </Badge>
                    </div>
                    <Button className="w-full" onClick={() => {
                      const btn = document.activeElement as HTMLButtonElement;
                      btn.disabled = true;
                      btn.innerHTML = '<span class="animate-spin">⚠️</span> Analyzing...';
                      setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = '✅ Analysis Complete • <span class="underline">Download</span>';
                        setTimeout(() => {
                          btn.innerHTML = '<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>Generate Risk Report';
                        }, 3000);
                      }, 2500);
                    }}>
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Generate Risk Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Compliance Item Details Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-2xl">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {selectedItem.requirement}
                  </DialogTitle>
                  <DialogDescription>
                    Compliance details for {selectedItem.supplier}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Status</Label>
                      <div className="mt-1">{getStatusBadge(selectedItem.status)}</div>
                    </div>
                    <div>
                      <Label>Risk Level</Label>
                      <div className="mt-1">{getRiskBadge(selectedItem.riskLevel)}</div>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Due Date</Label>
                      <div className="mt-1 flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {selectedItem.dueDate}
                      </div>
                    </div>
                    <div>
                      <Label>Last Audit</Label>
                      <div className="mt-1">{selectedItem.lastAudit}</div>
                    </div>
                  </div>

                  <div>
                    <Label>Compliance Score</Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Progress value={selectedItem.score} className="flex-1" />
                      <span className="font-medium">{selectedItem.score}%</span>
                    </div>
                  </div>

                  <div>
                    <Label>Auditor</Label>
                    <div className="mt-1 flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {selectedItem.auditor}
                    </div>
                  </div>

                  <div>
                    <Label>Documents</Label>
                    <div className="mt-2 space-y-2">
                      {selectedItem.documents.map((doc: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="flex-1">{doc}</span>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Schedule Audit Modal */}
        <Dialog open={isScheduleAuditOpen} onOpenChange={setIsScheduleAuditOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Audit</DialogTitle>
              <DialogDescription>
                Schedule a compliance audit for a supplier
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...new Set(mockComplianceItems.map(i => i.supplier))].map(supplier => (
                      <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <Label htmlFor="auditType">Audit Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quality">Quality Audit</SelectItem>
                      <SelectItem value="safety">Safety Audit</SelectItem>
                      <SelectItem value="environmental">Environmental Audit</SelectItem>
                      <SelectItem value="financial">Financial Audit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="auditor">Auditor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select auditor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                      <SelectItem value="lisa">Lisa Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <Label htmlFor="date">Audit Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="2">2 Days</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="5">1 Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsScheduleAuditOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setIsScheduleAuditOpen(false);
                  // Show success notification
                  const notification = document.createElement('div');
                  notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50';
                  notification.innerHTML = '✅ Audit scheduled successfully!';
                  document.body.appendChild(notification);
                  setTimeout(() => notification.remove(), 3000);
                }}>
                  Schedule Audit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default SCMCompliance;
