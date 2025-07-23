import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  TrendingUp,
  TrendingDown,
  Users,
  User,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Package,
  Truck,
  Star,
  Activity,
  Target,
  Award,
} from "lucide-react";
import { FranchiseeRegistration } from "./FranchiseeRegistration";
import {
  mockFranchiseeDashboard,
  mockFranchiseeRequests,
  mockActiveFranchisees,
  mockFranchiseeAnalytics,
  getPendingApprovals,
  getTopPerformingFranchisees,
  calculateApprovalRate,
  getAverageProcessingTime,
} from "./data";
import {
  FranchiseeRequest,
  FranchiseeProfile,
  FranchiseeRegistrationForm,
} from "./types";

interface FranchiseeDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function FranchiseeDashboard({
  currentTab = "overview",
  onTabChange,
}: FranchiseeDashboardProps) {
  const [activeTab, setActiveTab] = useState(currentTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<FranchiseeRequest | null>(null);
  const [selectedFranchisee, setSelectedFranchisee] =
    useState<FranchiseeProfile | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showFranchiseeModal, setShowFranchiseeModal] = useState(false);

  // Sync currentTab prop with local state
  React.useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
  };

  // Filtered data based on search
  const filteredRequests = useMemo(() => {
    return mockFranchiseeRequests.filter(
      (request) =>
        request.businessInfo.tradeName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        request.owner.firstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        request.owner.lastName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        request.location.city.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const filteredFranchisees = useMemo(() => {
    return mockActiveFranchisees.filter(
      (franchisee) =>
        franchisee.businessName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        franchisee.location.city
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        franchisee.primaryContact.firstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  // Status color helpers
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: "bg-gray-100 text-gray-800",
      submitted: "bg-blue-100 text-blue-800",
      under_review: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      pending_documents: "bg-orange-100 text-orange-800",
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      suspended: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  const handleRegistrationSubmit = (data: FranchiseeRegistrationForm) => {
    console.log("Registration data:", data);
    // Handle form submission here
  };

  const handleRequestAction = (action: string, request: FranchiseeRequest) => {
    console.log(`${action} request:`, request.id);
    switch (action) {
      case "view":
        setSelectedRequest(request);
        setShowRequestModal(true);
        break;
      case "approve":
        // Handle approval
        break;
      case "reject":
        // Handle rejection
        break;
    }
  };

  const handleFranchiseeAction = (
    action: string,
    franchisee: FranchiseeProfile,
  ) => {
    console.log(`${action} franchisee:`, franchisee.id);
    switch (action) {
      case "view":
        setSelectedFranchisee(franchisee);
        setShowFranchiseeModal(true);
        break;
      case "edit":
        // Handle edit
        break;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-600" />
            Franchisee Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive franchisee onboarding and management system for
            beverages & retail
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowRegistrationModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={mockFranchiseeDashboard.totalRequests} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+12%</span>
              from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={mockFranchiseeDashboard.pendingApprovals}
              />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <AlertTriangle className="h-3 w-3 text-orange-600" />
              <span className="text-orange-600">Needs attention</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Franchisees
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={mockFranchiseeDashboard.activeFranchisees}
              />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+3</span>
              this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                mockFranchiseeDashboard.performanceSummary.totalRevenue,
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+8.2%</span>
              from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="franchisees">Franchisees</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  Latest franchisee registration requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFranchiseeRequests.slice(0, 3).map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center gap-3 p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">
                          {request.businessInfo.tradeName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {request.owner.firstName} {request.owner.lastName} •{" "}
                          {request.location.city}
                        </p>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.replace("_", " ")}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Approval Rate</span>
                    <span className="font-medium">
                      {calculateApprovalRate().toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={calculateApprovalRate()} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Processing Time</span>
                    <span className="font-medium">
                      {getAverageProcessingTime()} days
                    </span>
                  </div>
                  <Progress value={85} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Satisfaction</span>
                    <span className="font-medium">4.6/5.0</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Franchisees</CardTitle>
              <CardDescription>
                Best performing franchise partners this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {getTopPerformingFranchisees(3).map((franchisee, index) => (
                  <div
                    key={franchisee.id}
                    className="flex items-center gap-3 p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100">
                      <Award className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{franchisee.businessName}</p>
                      <p className="text-sm text-muted-foreground">
                        {franchisee.location.city}
                      </p>
                      <p className="text-sm font-medium text-green-600">
                        {formatCurrency(
                          franchisee.performanceMetrics.monthlyRevenue,
                        )}
                      </p>
                    </div>
                    <Badge variant="outline">#{index + 1}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Franchisee Requests</h2>
              <p className="text-muted-foreground">
                Manage franchisee applications and approvals
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button onClick={() => setShowRegistrationModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request #</TableHead>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.requestNumber}
                      </TableCell>
                      <TableCell>{request.businessInfo.tradeName}</TableCell>
                      <TableCell>
                        {request.owner.firstName} {request.owner.lastName}
                      </TableCell>
                      <TableCell>
                        {request.location.city}, {request.location.state}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(request.investmentCapacity)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.submittedAt
                          ? new Date(request.submittedAt).toLocaleDateString()
                          : "Not submitted"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRequestAction("view", request)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {request.status === "under_review" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRequestAction("approve", request)
                                }
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRequestAction("reject", request)
                                }
                              >
                                <XCircle className="h-4 w-4 text-red-600" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Franchisees Tab */}
        <TabsContent value="franchisees" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Active Franchisees</h2>
              <p className="text-muted-foreground">
                Manage active franchise partners
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search franchisees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFranchisees.map((franchisee) => (
              <Card
                key={franchisee.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {franchisee.businessName}
                      </CardTitle>
                      <CardDescription>
                        {franchisee.franchiseeCode}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(franchisee.status)}>
                      {franchisee.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {franchisee.primaryContact.firstName}{" "}
                        {franchisee.primaryContact.lastName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {franchisee.location.city}, {franchisee.location.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {formatCurrency(
                          franchisee.performanceMetrics.monthlyRevenue,
                        )}
                        /month
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {franchisee.performanceMetrics.customerSatisfaction}/5.0
                        rating
                      </span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          handleFranchiseeAction("view", franchisee)
                        }
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleFranchiseeAction("edit", franchisee)
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Performance</CardTitle>
                <CardDescription>Monthly revenue trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Revenue</span>
                    <span className="font-bold">
                      {formatCurrency(
                        mockFranchiseeDashboard.performanceSummary.totalRevenue,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average per Franchisee</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(
                        mockFranchiseeAnalytics.performanceMetrics
                          .averageRevenue,
                      )}
                    </span>
                  </div>
                  <Progress value={75} className="h-3" />
                  <div className="text-sm text-muted-foreground">
                    Target achievement: 75% of monthly goal
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Revenue by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFranchiseeAnalytics.categoryPerformance
                    .slice(0, 3)
                    .map((category) => (
                      <div key={category.category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{category.category}</span>
                          <span className="text-sm font-medium">
                            {formatCurrency(category.revenue)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(category.revenue / 3000000) * 100}
                            className="h-2 flex-1"
                          />
                          <span className="text-xs text-green-600">
                            +{category.growth}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Registration Trends</CardTitle>
                <CardDescription>
                  Monthly application and approval trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFranchiseeAnalytics.registrationTrends.map((trend) => (
                    <div
                      key={trend.period}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{trend.period}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-blue-600">
                          {trend.requests} requests
                        </span>
                        <span className="text-sm text-green-600">
                          {trend.approvals} approved
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location Distribution</CardTitle>
                <CardDescription>Franchisees by state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockFranchiseeAnalytics.locationDistribution.map(
                    (location) => (
                      <div
                        key={location.state}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm">{location.state}</span>
                        <Badge variant="outline">{location.count}</Badge>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Franchise Settings</CardTitle>
              <CardDescription>
                Configure franchise parameters and requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">
                      Minimum Investment
                    </label>
                    <Input placeholder="₹1,500,000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Security Deposit
                    </label>
                    <Input placeholder="₹200,000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Base Commission (%)
                    </label>
                    <Input placeholder="10" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Approval Levels
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Levels</SelectItem>
                        <SelectItem value="3">3 Levels</SelectItem>
                        <SelectItem value="4">4 Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Registration Modal */}
      <FranchiseeRegistration
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onSubmit={handleRegistrationSubmit}
        mode="admin"
      />

      {/* Request Details Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Franchisee Request Details</DialogTitle>
            <DialogDescription>
              Review franchisee application details
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Request Number</label>
                  <p className="font-medium mt-1">
                    {selectedRequest.requestNumber}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Badge
                    className={`mt-1 ${getStatusColor(selectedRequest.status)}`}
                  >
                    {selectedRequest.status.replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium">Business Name</label>
                  <p className="font-medium mt-1">
                    {selectedRequest.businessInfo.tradeName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Owner</label>
                  <p className="font-medium mt-1">
                    {selectedRequest.owner.firstName}{" "}
                    {selectedRequest.owner.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <p className="font-medium mt-1">
                    {selectedRequest.location.city},{" "}
                    {selectedRequest.location.state}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Investment</label>
                  <p className="font-medium mt-1">
                    {formatCurrency(selectedRequest.investmentCapacity)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Franchisee Details Modal */}
      <Dialog open={showFranchiseeModal} onOpenChange={setShowFranchiseeModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Franchisee Details</DialogTitle>
            <DialogDescription>
              View franchisee information and performance
            </DialogDescription>
          </DialogHeader>
          {selectedFranchisee && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Business Name</label>
                  <p className="font-medium mt-1">
                    {selectedFranchisee.businessName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Franchisee Code</label>
                  <p className="font-medium mt-1">
                    {selectedFranchisee.franchiseeCode}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Monthly Revenue</label>
                  <p className="font-medium mt-1 text-green-600">
                    {formatCurrency(
                      selectedFranchisee.performanceMetrics.monthlyRevenue,
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Customer Rating</label>
                  <p className="font-medium mt-1">
                    {selectedFranchisee.performanceMetrics.customerSatisfaction}
                    /5.0
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
