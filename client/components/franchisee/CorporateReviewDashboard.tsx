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
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
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
import { Separator } from "../ui/separator";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  MessageSquare,
  UserCheck,
  UserPlus,
  Bell,
  BarChart3,
  FileText,
  Users,
  Calendar,
  Filter,
  Search,
  Plus,
  Send,
  Flag,
  Shield,
  Activity,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  mockCorporateDashboard,
  mockWorkflowAssignments,
  mockWorkflowActions,
  mockWorkflowComments,
  mockBackgroundVerifications,
  mockNotifications,
  getAssignmentsByUser,
  getActionsByRequest,
  getCommentsByRequest,
  getUsersByRole,
} from "./corporate-data";
import { mockFranchiseeRequests } from "./data";
import { mockCorporateUsers } from "./corporate-data";
import {
  FranchiseeRequest,
  WorkflowAssignment,
  WorkflowAction,
  WorkflowComment,
  CorporateUser,
  ApprovalForm,
  AssignmentForm,
  BackgroundCheckForm,
} from "./corporate-types";

interface CorporateReviewDashboardProps {
  currentUser?: CorporateUser;
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function CorporateReviewDashboard({
  currentUser = mockCorporateUsers[0],
  currentTab = "dashboard",
  onTabChange,
}: CorporateReviewDashboardProps) {
  const [activeTab, setActiveTab] = useState(currentTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] =
    useState<FranchiseeRequest | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showBackgroundCheckModal, setShowBackgroundCheckModal] =
    useState(false);
  const [newComment, setNewComment] = useState("");

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
  };

  // Filter data based on user role and region
  const userAssignments = useMemo(() => {
    return getAssignmentsByUser(currentUser.id);
  }, [currentUser.id]);

  const filteredRequests = useMemo(() => {
    return mockFranchiseeRequests.filter((request) => {
      const matchesSearch =
        request.businessInfo.tradeName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        request.owner.firstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        request.requestNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion =
        currentUser.region === "All" ||
        !currentUser.region ||
        request.location.state === currentUser.region;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, currentUser.region]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: "bg-gray-100 text-gray-800",
      submitted: "bg-blue-100 text-blue-800",
      under_review: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      pending_documents: "bg-orange-100 text-orange-800",
      pending: "bg-gray-100 text-gray-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      escalated: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  const handleRequestAction = (action: string, request: FranchiseeRequest) => {
    setSelectedRequest(request);
    switch (action) {
      case "view":
        setShowRequestModal(true);
        break;
      case "assign":
        setShowAssignModal(true);
        break;
      case "approve":
        setShowApprovalModal(true);
        break;
      case "background_check":
        setShowBackgroundCheckModal(true);
        break;
    }
  };

  const handleApproval = (data: ApprovalForm) => {
    console.log("Approval action:", data);
    // Handle approval logic
    setShowApprovalModal(false);
  };

  const handleAssignment = (data: AssignmentForm) => {
    console.log("Assignment action:", data);
    // Handle assignment logic
    setShowAssignModal(false);
  };

  const handleBackgroundCheck = (data: BackgroundCheckForm) => {
    console.log("Background check initiated:", data);
    // Handle background check logic
    setShowBackgroundCheckModal(false);
  };

  const addComment = () => {
    if (newComment.trim() && selectedRequest) {
      const comment: WorkflowComment = {
        id: `comment_${Date.now()}`,
        requestId: selectedRequest.id,
        authorId: currentUser.id,
        authorName: `${currentUser.firstName} ${currentUser.lastName}`,
        content: newComment,
        isInternal: false,
        createdAt: new Date().toISOString(),
      };
      console.log("New comment:", comment);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <UserCheck className="h-8 w-8 text-blue-600" />
            Corporate Review Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Review and manage franchisee applications workflow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1">
            {currentUser.role.name}
          </Badge>
          <Badge variant="secondary">
            {currentUser.region || "All Regions"}
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={mockCorporateDashboard.pendingRequests} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <AlertTriangle className="h-3 w-3 text-orange-600" />
              <span className="text-orange-600">3 high priority</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              My Assignments
            </CardTitle>
            <UserPlus className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={mockCorporateDashboard.myAssignments} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">2 due today</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Today
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={mockCorporateDashboard.completedToday} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Target className="h-3 w-3 text-green-600" />
              <span className="text-green-600">
                {mockCorporateDashboard.approvalStats.approvalRate}% rate
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Processing
            </CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={
                  mockCorporateDashboard.approvalStats.averageProcessingTime
                }
                suffix="h"
              />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-green-600">-2h from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="assignments">My Work</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>My Performance</CardTitle>
                <CardDescription>Current month metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Productivity</span>
                    <span className="font-medium">
                      {mockCorporateDashboard.performanceMetrics.productivity}%
                    </span>
                  </div>
                  <Progress
                    value={
                      mockCorporateDashboard.performanceMetrics.productivity
                    }
                    className="h-2"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quality Score</span>
                    <span className="font-medium">
                      {mockCorporateDashboard.performanceMetrics.quality}%
                    </span>
                  </div>
                  <Progress
                    value={mockCorporateDashboard.performanceMetrics.quality}
                    className="h-2"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Timeliness</span>
                    <span className="font-medium">
                      {mockCorporateDashboard.performanceMetrics.timeliness}%
                    </span>
                  </div>
                  <Progress
                    value={mockCorporateDashboard.performanceMetrics.timeliness}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest workflow actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockWorkflowActions.slice(0, 4).map((action) => (
                    <div
                      key={action.id}
                      className="flex items-start gap-3 p-3 border rounded-lg"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                        {action.actionType === "comment" && (
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                        )}
                        {action.actionType === "approve" && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {action.actionType === "assign" && (
                          <UserPlus className="h-4 w-4 text-purple-600" />
                        )}
                        {action.actionType === "background_check" && (
                          <Shield className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{action.comments}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(action.performedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Regional Stats */}
          {mockCorporateDashboard.regionStats && (
            <Card>
              <CardHeader>
                <CardTitle>Regional Overview</CardTitle>
                <CardDescription>
                  Franchisee applications by region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {mockCorporateDashboard.regionStats.map((stat) => (
                    <div key={stat.region} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3">{stat.region}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Pending</span>
                          <Badge variant="outline">{stat.pending}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Approved</span>
                          <Badge className="bg-green-100 text-green-800">
                            {stat.approved}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rejected</span>
                          <Badge className="bg-red-100 text-red-800">
                            {stat.rejected}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Franchisee Requests</h2>
              <p className="text-muted-foreground">
                Review and process applications
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
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request #</TableHead>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => {
                    const assignment = userAssignments.find(
                      (a) => a.requestId === request.id,
                    );
                    return (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.requestNumber}
                        </TableCell>
                        <TableCell>{request.businessInfo.tradeName}</TableCell>
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
                          {assignment && (
                            <Badge
                              variant={
                                assignment.priority === "high"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {assignment.priority}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {assignment?.dueDate
                            ? new Date(assignment.dueDate).toLocaleDateString()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleRequestAction("view", request)
                              }
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {currentUser.role.canAssign && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRequestAction("assign", request)
                                }
                              >
                                <UserPlus className="h-4 w-4" />
                              </Button>
                            )}
                            {currentUser.role.canApprove &&
                              request.status === "under_review" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleRequestAction("approve", request)
                                  }
                                >
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                </Button>
                              )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">My Assignments</h2>
              <p className="text-muted-foreground">Tasks assigned to you</p>
            </div>
          </div>

          <div className="grid gap-4">
            {userAssignments.map((assignment) => {
              const request = mockFranchiseeRequests.find(
                (r) => r.id === assignment.requestId,
              );
              if (!request) return null;

              return (
                <Card key={assignment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">
                          {request.businessInfo.tradeName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {request.requestNumber}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status.replace("_", " ")}
                        </Badge>
                        <Badge
                          variant={
                            assignment.priority === "high"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {assignment.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 mb-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Location:{" "}
                        </span>
                        {request.location.city}, {request.location.state}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Investment:{" "}
                        </span>
                        {formatCurrency(request.investmentCapacity)}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Due Date:{" "}
                        </span>
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Assigned:{" "}
                        </span>
                        {new Date(assignment.assignedAt).toLocaleDateString()}
                      </div>
                    </div>

                    {assignment.notes && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm">{assignment.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRequestAction("view", request)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleRequestAction("background_check", request)
                        }
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Background Check
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleRequestAction("approve", request)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Process
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Notifications</h2>
              <p className="text-muted-foreground">System alerts and updates</p>
            </div>
            <Button variant="outline" size="sm">
              Mark All Read
            </Button>
          </div>

          <div className="space-y-4">
            {mockNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={notification.status === "read" ? "opacity-60" : ""}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                      <Bell className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        <Badge
                          variant={
                            notification.priority === "high"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {notification.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.sentAt &&
                          new Date(notification.sentAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Processing Time Trends</CardTitle>
                <CardDescription>
                  Average time to process requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>This Month</span>
                    <span className="font-bold">16.5 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Last Month</span>
                    <span className="font-medium text-muted-foreground">
                      18.2 hours
                    </span>
                  </div>
                  <Progress value={75} className="h-3" />
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <ArrowDownRight className="h-3 w-3" />
                    9.3% improvement
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Approval Rate</CardTitle>
                <CardDescription>Success rate of applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Current Rate</span>
                    <span className="font-bold">78.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Target Rate</span>
                    <span className="font-medium text-muted-foreground">
                      80%
                    </span>
                  </div>
                  <Progress value={78.5} className="h-3" />
                  <div className="text-sm text-orange-600 flex items-center gap-1">
                    <ArrowDownRight className="h-3 w-3" />
                    1.5% below target
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Request Details Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Franchisee Request Review</DialogTitle>
            <DialogDescription>
              Comprehensive review of franchisee application
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              {/* Request Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {selectedRequest.businessInfo.tradeName}
                    <Badge className={getStatusColor(selectedRequest.status)}>
                      {selectedRequest.status.replace("_", " ")}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Request Number</Label>
                      <p className="font-medium mt-1">
                        {selectedRequest.requestNumber}
                      </p>
                    </div>
                    <div>
                      <Label>Owner</Label>
                      <p className="font-medium mt-1">
                        {selectedRequest.owner.firstName}{" "}
                        {selectedRequest.owner.lastName}
                      </p>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <p className="font-medium mt-1">
                        {selectedRequest.location.city},{" "}
                        {selectedRequest.location.state}
                      </p>
                    </div>
                    <div>
                      <Label>Investment</Label>
                      <p className="font-medium mt-1">
                        {formatCurrency(selectedRequest.investmentCapacity)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Comments & Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4">
                    {getCommentsByRequest(selectedRequest.id).map((comment) => (
                      <div
                        key={comment.id}
                        className="flex gap-3 p-3 border rounded-lg"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">
                              {comment.authorName}
                            </span>
                            {comment.isInternal && (
                              <Badge variant="secondary" className="text-xs">
                                Internal
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <Button onClick={addComment} className="mt-auto">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowRequestModal(false)}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleRequestAction("background_check", selectedRequest)
                  }
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Background Check
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleRequestAction("assign", selectedRequest)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign
                </Button>
                {currentUser.role.canApprove && (
                  <Button
                    onClick={() =>
                      handleRequestAction("approve", selectedRequest)
                    }
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Process
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assignment Modal */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Request</DialogTitle>
            <DialogDescription>
              Assign this request to another team member
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Assign To</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {getUsersByRole("Regional Manager").map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} - {user.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Due Date</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea placeholder="Assignment notes..." />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => handleAssignment({} as AssignmentForm)}>
                Assign
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Approval Modal */}
      <Dialog open={showApprovalModal} onOpenChange={setShowApprovalModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Request</DialogTitle>
            <DialogDescription>
              Make a decision on this franchisee application
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Action</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approve">Approve</SelectItem>
                  <SelectItem value="reject">Reject</SelectItem>
                  <SelectItem value="request_more_info">
                    Request More Information
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Comments</Label>
              <Textarea placeholder="Add your comments..." />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowApprovalModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => handleApproval({} as ApprovalForm)}>
                Submit Decision
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Background Check Modal */}
      <Dialog
        open={showBackgroundCheckModal}
        onOpenChange={setShowBackgroundCheckModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Initiate Background Check</DialogTitle>
            <DialogDescription>
              Start background verification process
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Verification Provider</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credverify">CredVerify</SelectItem>
                  <SelectItem value="truecaller">
                    Truecaller Business
                  </SelectItem>
                  <SelectItem value="karza">Karza Technologies</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Check Types</Label>
              <div className="space-y-2">
                {[
                  "Identity Verification",
                  "Credit Check",
                  "Criminal Background",
                  "Business Verification",
                  "Bank Verification",
                ].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <input type="checkbox" id={type} defaultChecked />
                    <label htmlFor={type} className="text-sm">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowBackgroundCheckModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleBackgroundCheck({} as BackgroundCheckForm)}
              >
                Start Verification
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
