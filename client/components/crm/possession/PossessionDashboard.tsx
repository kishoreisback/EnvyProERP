import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { AnimatedIcon, PulsingDot, GlowingOrb } from "../../ui/animated-icons";
import { AnimatedCounter } from "../../ui/animated-counter";
import {
  Home,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  FileText,
  Key,
  Camera,
  Mail,
  Phone,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MapPin,
  Star,
  Wrench,
  Shield,
  Award,
  Building,
  Package,
  Plus,
} from "lucide-react";
import { mockPossessionUnits, mockAnalytics } from "./data";
import { PossessionUnit, PossessionStatus } from "./types";

interface PossessionDashboardProps {
  onUnitSelect?: (unit: PossessionUnit) => void;
}

export function PossessionDashboard({
  onUnitSelect,
}: PossessionDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTab, setSelectedTab] = useState("overview");

  // Dialog states
  const [showScheduleInspection, setShowScheduleInspection] = useState(false);
  const [showScheduleHandover, setShowScheduleHandover] = useState(false);
  const [showReportDefect, setShowReportDefect] = useState(false);

  // Form states
  const [inspectionForm, setInspectionForm] = useState({
    unitId: "",
    scheduledDate: "",
    inspector: "",
    notes: "",
  });

  const [handoverForm, setHandoverForm] = useState({
    unitId: "",
    scheduledDate: "",
    handoverBy: "",
    notes: "",
  });

  const [defectForm, setDefectForm] = useState({
    unitId: "",
    category: "",
    description: "",
    severity: "",
    reportedBy: "",
  });

  const filteredUnits = mockPossessionUnits.filter((unit) => {
    const matchesSearch =
      unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.projectName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || unit.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: PossessionStatus) => {
    switch (status) {
      case "payment_pending":
        return "text-red-600";
      case "dues_clearance":
        return "text-orange-600";
      case "inspection_scheduled":
        return "text-blue-600";
      case "inspection_completed":
        return "text-green-600";
      case "ready_for_handover":
        return "text-purple-600";
      case "handover_in_progress":
        return "text-indigo-600";
      case "possession_completed":
        return "text-green-600";
      case "defect_liability_active":
        return "text-teal-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadge = (status: PossessionStatus) => {
    switch (status) {
      case "payment_pending":
        return "destructive";
      case "dues_clearance":
        return "secondary";
      case "inspection_scheduled":
        return "outline";
      case "inspection_completed":
        return "default";
      case "ready_for_handover":
        return "default";
      case "handover_in_progress":
        return "outline";
      case "possession_completed":
        return "default";
      case "defect_liability_active":
        return "outline";
      default:
        return "outline";
    }
  };

  const formatStatus = (status: PossessionStatus) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getWorkflowProgress = (unit: PossessionUnit) => {
    const statusOrder = [
      "payment_pending",
      "dues_clearance",
      "inspection_scheduled",
      "inspection_completed",
      "ready_for_handover",
      "handover_in_progress",
      "possession_completed",
      "defect_liability_active",
    ];
    const currentIndex = statusOrder.indexOf(unit.status);
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover-lift animate-fadeInUp">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <AnimatedIcon
                  icon={Home}
                  animation="float"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={mockAnalytics.totalUnits} />
                </p>
                <p className="text-sm text-muted-foreground">Total Units</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover-lift animate-fadeInUp"
          style={{ animationDelay: "0.1s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                <AnimatedIcon
                  icon={CheckCircle}
                  animation="bounce"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={mockAnalytics.unitsCompleted} />
                </p>
                <p className="text-sm text-muted-foreground">
                  Completed Handovers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover-lift animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                <AnimatedIcon
                  icon={Clock}
                  animation="pulse"
                  className="h-6 w-6 text-orange-600 dark:text-orange-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={mockAnalytics.unitsInProcess} />
                </p>
                <p className="text-sm text-muted-foreground">In Process</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover-lift animate-fadeInUp"
          style={{ animationDelay: "0.3s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <AnimatedIcon
                  icon={Star}
                  animation="glow"
                  className="h-6 w-6 text-purple-600 dark:text-purple-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter
                    value={mockAnalytics.customerSatisfactionAvg}
                    decimals={1}
                  />
                  /10
                </p>
                <p className="text-sm text-muted-foreground">
                  Customer Satisfaction
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover-lift animate-fadeInUp">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">On-Time Delivery</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter
                  value={mockAnalytics.onTimeDeliveryRate}
                  decimals={1}
                />
                %
              </div>
              <Progress
                value={mockAnalytics.onTimeDeliveryRate}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover-lift animate-fadeInUp"
          style={{ animationDelay: "0.1s" }}
        >
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Revenue Collected</span>
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-lg font-bold">
                ₹
                <AnimatedCounter
                  value={mockAnalytics.revenueCollected / 10000000}
                />
                Cr
              </div>
              <p className="text-xs text-muted-foreground">Total collected</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover-lift animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pending Dues</span>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </div>
              <div className="text-lg font-bold">
                ₹<AnimatedCounter value={mockAnalytics.pendingDues / 100000} />L
              </div>
              <p className="text-xs text-muted-foreground">To be collected</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover-lift animate-fadeInUp"
          style={{ animationDelay: "0.3s" }}
        >
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Avg. Completion Time
                </span>
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={mockAnalytics.averageCompletionTime} />
                <span className="text-sm font-normal">days</span>
              </div>
              <p className="text-xs text-muted-foreground">
                From start to finish
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="units">Units</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="handovers">Handovers</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>
                  Current status of all possession units
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "payment_pending",
                    "dues_clearance",
                    "inspection_scheduled",
                    "inspection_completed",
                    "ready_for_handover",
                    "handover_in_progress",
                    "possession_completed",
                    "defect_liability_active",
                  ].map((status) => {
                    const count = mockPossessionUnits.filter(
                      (unit) => unit.status === status,
                    ).length;
                    const percentage =
                      (count / mockPossessionUnits.length) * 100;

                    return (
                      <div key={status} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">
                            {formatStatus(status as PossessionStatus)}
                          </span>
                          <span>
                            {count} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  Latest updates across all possession units
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        Unit A-1201 handover completed
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Customer: Rajesh Kumar • 2 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Camera className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        Inspection completed for Unit B-504
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Inspector: Amit Singh • 1 day ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        Final dues calculated for Unit C-802
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Amount: ₹3.25L • 2 days ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Mail className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        Welcome email sent to new owner
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Unit A-1201 • 3 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="units">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Possession Units</CardTitle>
                  <CardDescription>
                    Manage all units in the possession process
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by unit number, customer name, or project..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="payment_pending">
                      Payment Pending
                    </SelectItem>
                    <SelectItem value="dues_clearance">
                      Dues Clearance
                    </SelectItem>
                    <SelectItem value="inspection_scheduled">
                      Inspection Scheduled
                    </SelectItem>
                    <SelectItem value="inspection_completed">
                      Inspection Completed
                    </SelectItem>
                    <SelectItem value="ready_for_handover">
                      Ready for Handover
                    </SelectItem>
                    <SelectItem value="handover_in_progress">
                      Handover in Progress
                    </SelectItem>
                    <SelectItem value="possession_completed">
                      Possession Completed
                    </SelectItem>
                    <SelectItem value="defect_liability_active">
                      Defect Liability Active
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Units Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit Details</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUnits.map((unit) => (
                      <TableRow key={unit.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{unit.unitNumber}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Building className="h-3 w-3" />
                              {unit.projectName}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{unit.unitType}</span>
                              <span>{unit.area} sq ft</span>
                              <span>Floor {unit.floor}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{unit.customer.name}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {unit.customer.phone}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {unit.customer.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadge(unit.status) as any}
                            className={getStatusColor(unit.status)}
                          >
                            {formatStatus(unit.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress
                              value={getWorkflowProgress(unit)}
                              className="h-2 w-20"
                            />
                            <span className="text-xs text-muted-foreground">
                              {getWorkflowProgress(unit).toFixed(0)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            {new Date(
                              unit.possession.scheduledDate,
                            ).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onUnitSelect?.(unit)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <FileText className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspections">
          <div className="space-y-6">
            {/* Inspection Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-lg font-bold">
                        {
                          mockPossessionUnits.filter(
                            (u) => u.inspection.status === "scheduled",
                          ).length
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">Scheduled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-lg font-bold">
                        {
                          mockPossessionUnits.filter(
                            (u) => u.inspection.status === "in_progress",
                          ).length
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">
                        In Progress
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-lg font-bold">
                        {
                          mockPossessionUnits.filter(
                            (u) => u.inspection.status === "completed",
                          ).length
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="text-lg font-bold">
                        {
                          mockPossessionUnits.filter(
                            (u) =>
                              u.inspection.status === "re_inspection_required",
                          ).length
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Re-inspection
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inspections Table */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Unit Inspections</CardTitle>
                    <CardDescription>
                      Manage inspection schedules and checklists
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowScheduleInspection(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Inspection
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Checklist Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPossessionUnits.map((unit) => {
                      const completedItems = unit.inspection.checklist.filter(
                        (item) =>
                          item.status === "ok" ||
                          item.status === "not_applicable",
                      ).length;
                      const totalItems = unit.inspection.checklist.length;
                      const progress =
                        totalItems > 0
                          ? (completedItems / totalItems) * 100
                          : 0;

                      return (
                        <TableRow key={unit.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{unit.unitNumber}</p>
                              <p className="text-sm text-muted-foreground">
                                {unit.projectName}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {unit.customer.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {unit.customer.phone}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(
                                unit.inspection.scheduledDate,
                              ).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {unit.inspection.inspector}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                unit.inspection.status === "completed"
                                  ? "default"
                                  : unit.inspection.status === "in_progress"
                                    ? "secondary"
                                    : unit.inspection.status ===
                                        "re_inspection_required"
                                      ? "destructive"
                                      : "outline"
                              }
                            >
                              {unit.inspection.status
                                .replace(/_/g, " ")
                                .toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Progress value={progress} className="h-2 w-20" />
                              <span className="text-xs text-muted-foreground">
                                {completedItems}/{totalItems} items
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <FileText className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Inspection Checklist Sample */}
            <Card>
              <CardHeader>
                <CardTitle>Sample Inspection Checklist</CardTitle>
                <CardDescription>
                  Standard checklist items for unit inspection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-medium">Structural Items</h4>
                    {[
                      "Walls and plastering",
                      "Ceiling condition",
                      "Floor tiling/flooring",
                      "Door frames and alignment",
                      "Window frames and operation",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-muted/30 rounded"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Electrical & Plumbing</h4>
                    {[
                      "Electrical fittings and switches",
                      "Water supply and drainage",
                      "Bathroom fixtures",
                      "Kitchen fittings",
                      "Safety equipment (fire extinguisher, etc.)",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-muted/30 rounded"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="handovers">
          <div className="space-y-6">
            {/* Handover Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-lg font-bold">
                        {
                          mockPossessionUnits.filter(
                            (u) => u.handover.status === "pending",
                          ).length
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-lg font-bold">
                        {
                          mockPossessionUnits.filter(
                            (u) => u.handover.status === "ready",
                          ).length
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">Ready</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-lg font-bold">
                        {
                          mockPossessionUnits.filter(
                            (u) => u.handover.status === "in_progress",
                          ).length
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">
                        In Progress
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-lg font-bold">
                        {
                          mockPossessionUnits.filter(
                            (u) => u.handover.status === "completed",
                          ).length
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Handovers Table */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Unit Handovers</CardTitle>
                    <CardDescription>
                      Track handover process and documentation
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowScheduleHandover(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Handover
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Keys & Kit</TableHead>
                      <TableHead>Customer Feedback</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPossessionUnits.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{unit.unitNumber}</p>
                            <p className="text-sm text-muted-foreground">
                              {unit.projectName}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{unit.customer.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {unit.customer.phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(
                              unit.handover.scheduledDate,
                            ).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              unit.handover.status === "completed"
                                ? "default"
                                : unit.handover.status === "in_progress"
                                  ? "secondary"
                                  : unit.handover.status === "ready"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {unit.handover.status
                              .replace(/_/g, " ")
                              .toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {unit.handover.documentsGenerated ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-orange-600" />
                            )}
                            <span className="text-sm">
                              {unit.handover.documentsGenerated
                                ? "Ready"
                                : "Pending"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              {unit.handover.keysHandedOver ? (
                                <CheckCircle className="h-3 w-3 text-green-600" />
                              ) : (
                                <Clock className="h-3 w-3 text-orange-600" />
                              )}
                              <span className="text-xs">Keys</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {unit.handover.welcomeKitGiven ? (
                                <CheckCircle className="h-3 w-3 text-green-600" />
                              ) : (
                                <Clock className="h-3 w-3 text-orange-600" />
                              )}
                              <span className="text-xs">Kit</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {unit.handover.customerFeedback ? (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium">
                                {
                                  unit.handover.customerFeedback
                                    .overallSatisfaction
                                }
                                /10
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              Not submitted
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <FileText className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Key className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Handover Checklist Template */}
            <Card>
              <CardHeader>
                <CardTitle>Handover Checklist Template</CardTitle>
                <CardDescription>
                  Standard items for unit handover process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-3">
                    <h4 className="font-medium">Documentation</h4>
                    {[
                      "Sale deed original",
                      "Possession letter",
                      "Completion certificate",
                      "OC (Occupancy Certificate)",
                      "Society formation papers",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-muted/30 rounded"
                      >
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Physical Handover</h4>
                    {[
                      "Unit keys (all sets)",
                      "Common area access cards",
                      "Parking space allocation",
                      "Utility connections",
                      "Welcome kit with manuals",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-muted/30 rounded"
                      >
                        <Key className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Communication</h4>
                    {[
                      "Welcome email sent",
                      "SMS confirmation",
                      "Society contact details",
                      "Maintenance team contacts",
                      "Emergency contact numbers",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-muted/30 rounded"
                      >
                        <Mail className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <div className="space-y-6">
            {/* Maintenance Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="text-lg font-bold">
                        {mockPossessionUnits.reduce(
                          (acc, unit) =>
                            acc +
                            unit.defectLiability.defectReports.filter(
                              (d) => d.status !== "closed",
                            ).length,
                          0,
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Active Defects
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-lg font-bold">
                        {
                          mockPossessionUnits.filter(
                            (unit) =>
                              new Date(unit.defectLiability.endDate) >
                              new Date(),
                          ).length
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Active Warranties
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-lg font-bold">
                        {mockPossessionUnits.reduce(
                          (acc, unit) =>
                            acc +
                            unit.defectLiability.maintenanceSchedule.filter(
                              (m) => m.status === "scheduled",
                            ).length,
                          0,
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Scheduled Tasks
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-lg font-bold">
                        {mockPossessionUnits.reduce(
                          (acc, unit) =>
                            acc +
                            unit.defectLiability.defectReports.filter(
                              (d) => d.status === "resolved",
                            ).length,
                          0,
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">Resolved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Defect Reports */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Active Defect Reports</CardTitle>
                    <CardDescription>
                      Track and resolve reported defects
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowReportDefect(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Report Defect
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit</TableHead>
                      <TableHead>Defect Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Reported Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPossessionUnits.flatMap((unit) =>
                      unit.defectLiability.defectReports
                        .filter((defect) => defect.status !== "closed")
                        .map((defect) => (
                          <TableRow key={defect.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{unit.unitNumber}</p>
                                <p className="text-sm text-muted-foreground">
                                  {unit.customer.name}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">
                                  {defect.description}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Reported by: {defect.reportedBy}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="capitalize">
                                {defect.category}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  defect.severity === "urgent"
                                    ? "destructive"
                                    : defect.severity === "high"
                                      ? "secondary"
                                      : defect.severity === "medium"
                                        ? "outline"
                                        : "outline"
                                }
                              >
                                {defect.severity.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(
                                defect.reportedDate,
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  defect.status === "resolved"
                                    ? "default"
                                    : defect.status === "in_progress"
                                      ? "secondary"
                                      : defect.status === "acknowledged"
                                        ? "outline"
                                        : "destructive"
                                }
                              >
                                {defect.status.replace(/_/g, " ").toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {defect.assignedTo}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )),
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Warranty Items */}
            <Card>
              <CardHeader>
                <CardTitle>Warranty Tracking</CardTitle>
                <CardDescription>
                  Monitor warranty periods and claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {mockPossessionUnits[0].defectLiability.warrantyItems.map(
                    (warranty) => (
                      <div key={warranty.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{warranty.itemName}</h4>
                          <Badge
                            variant={
                              warranty.status === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {warranty.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Category:
                            </span>
                            <span>{warranty.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Vendor:
                            </span>
                            <span>{warranty.vendor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Warranty Period:
                            </span>
                            <span>{warranty.warrantyPeriod} months</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Valid Until:
                            </span>
                            <span>
                              {new Date(warranty.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Claims:
                            </span>
                            <span>{warranty.claimHistory.length}</span>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Maintenance Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
                <CardDescription>
                  Upcoming and completed maintenance tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPossessionUnits[0].defectLiability.maintenanceSchedule.map(
                    (task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              task.status === "completed"
                                ? "bg-green-100 dark:bg-green-900"
                                : task.status === "overdue"
                                  ? "bg-red-100 dark:bg-red-900"
                                  : "bg-blue-100 dark:bg-blue-900"
                            }`}
                          >
                            <Wrench
                              className={`h-4 w-4 ${
                                task.status === "completed"
                                  ? "text-green-600"
                                  : task.status === "overdue"
                                    ? "text-red-600"
                                    : "text-blue-600"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-medium">{task.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="capitalize">{task.type}</span>
                              <span>•</span>
                              <span>{task.frequency}</span>
                              <span>•</span>
                              <span>{task.assignedTeam}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              task.status === "completed"
                                ? "default"
                                : task.status === "overdue"
                                  ? "destructive"
                                  : "outline"
                            }
                          >
                            {task.status.toUpperCase()}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(task.scheduledDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Schedule Inspection Dialog */}
      <Dialog
        open={showScheduleInspection}
        onOpenChange={setShowScheduleInspection}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Schedule Inspection
            </DialogTitle>
            <DialogDescription>
              Schedule a new unit inspection
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inspectionUnit">Select Unit</Label>
              <Select
                value={inspectionForm.unitId}
                onValueChange={(value) =>
                  setInspectionForm((prev) => ({ ...prev, unitId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit to inspect" />
                </SelectTrigger>
                <SelectContent>
                  {mockPossessionUnits.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.unitNumber} - {unit.customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inspectionDate">Scheduled Date</Label>
              <Input
                id="inspectionDate"
                type="datetime-local"
                value={inspectionForm.scheduledDate}
                onChange={(e) =>
                  setInspectionForm((prev) => ({
                    ...prev,
                    scheduledDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inspector">Inspector</Label>
              <Select
                value={inspectionForm.inspector}
                onValueChange={(value) =>
                  setInspectionForm((prev) => ({ ...prev, inspector: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select inspector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Amit Singh">Amit Singh</SelectItem>
                  <SelectItem value="Priya Sharma">Priya Sharma</SelectItem>
                  <SelectItem value="Rajesh Kumar">Rajesh Kumar</SelectItem>
                  <SelectItem value="Suresh Mehta">Suresh Mehta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inspectionNotes">Notes</Label>
              <Textarea
                id="inspectionNotes"
                value={inspectionForm.notes}
                onChange={(e) =>
                  setInspectionForm((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                placeholder="Any special instructions or notes..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowScheduleInspection(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Scheduling inspection:", inspectionForm);
                  setShowScheduleInspection(false);
                  setInspectionForm({
                    unitId: "",
                    scheduledDate: "",
                    inspector: "",
                    notes: "",
                  });
                }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Handover Dialog */}
      <Dialog
        open={showScheduleHandover}
        onOpenChange={setShowScheduleHandover}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Schedule Handover
            </DialogTitle>
            <DialogDescription>
              Schedule a unit handover appointment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="handoverUnit">Select Unit</Label>
              <Select
                value={handoverForm.unitId}
                onValueChange={(value) =>
                  setHandoverForm((prev) => ({ ...prev, unitId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit for handover" />
                </SelectTrigger>
                <SelectContent>
                  {mockPossessionUnits
                    .filter((unit) => unit.inspection.status === "completed")
                    .map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>
                        {unit.unitNumber} - {unit.customer.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="handoverDate">Handover Date & Time</Label>
              <Input
                id="handoverDate"
                type="datetime-local"
                value={handoverForm.scheduledDate}
                onChange={(e) =>
                  setHandoverForm((prev) => ({
                    ...prev,
                    scheduledDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="handoverBy">Handover Officer</Label>
              <Select
                value={handoverForm.handoverBy}
                onValueChange={(value) =>
                  setHandoverForm((prev) => ({ ...prev, handoverBy: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select handover officer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vikram Patel">Vikram Patel</SelectItem>
                  <SelectItem value="Neha Gupta">Neha Gupta</SelectItem>
                  <SelectItem value="Arun Krishnan">Arun Krishnan</SelectItem>
                  <SelectItem value="Meera Iyer">Meera Iyer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="handoverNotes">Notes</Label>
              <Textarea
                id="handoverNotes"
                value={handoverForm.notes}
                onChange={(e) =>
                  setHandoverForm((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                placeholder="Special arrangements, customer preferences, etc..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowScheduleHandover(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Scheduling handover:", handoverForm);
                  setShowScheduleHandover(false);
                  setHandoverForm({
                    unitId: "",
                    scheduledDate: "",
                    handoverBy: "",
                    notes: "",
                  });
                }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Defect Dialog */}
      <Dialog open={showReportDefect} onOpenChange={setShowReportDefect}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Report Defect
            </DialogTitle>
            <DialogDescription>
              Report a defect or maintenance issue
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="defectUnit">Select Unit</Label>
              <Select
                value={defectForm.unitId}
                onValueChange={(value) =>
                  setDefectForm((prev) => ({ ...prev, unitId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit with defect" />
                </SelectTrigger>
                <SelectContent>
                  {mockPossessionUnits
                    .filter(
                      (unit) =>
                        unit.status === "possession_completed" ||
                        unit.status === "defect_liability_active",
                    )
                    .map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>
                        {unit.unitNumber} - {unit.customer.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defectCategory">Category</Label>
              <Select
                value={defectForm.category}
                onValueChange={(value) =>
                  setDefectForm((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select defect category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="civil">Civil Work</SelectItem>
                  <SelectItem value="painting">Painting</SelectItem>
                  <SelectItem value="flooring">Flooring</SelectItem>
                  <SelectItem value="fixtures">Fixtures & Fittings</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defectSeverity">Severity</Label>
              <Select
                value={defectForm.severity}
                onValueChange={(value) =>
                  setDefectForm((prev) => ({ ...prev, severity: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defectDescription">Description</Label>
              <Textarea
                id="defectDescription"
                value={defectForm.description}
                onChange={(e) =>
                  setDefectForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe the defect in detail..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportedBy">Reported By</Label>
              <Input
                id="reportedBy"
                value={defectForm.reportedBy}
                onChange={(e) =>
                  setDefectForm((prev) => ({
                    ...prev,
                    reportedBy: e.target.value,
                  }))
                }
                placeholder="Your name"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowReportDefect(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Reporting defect:", defectForm);
                  setShowReportDefect(false);
                  setDefectForm({
                    unitId: "",
                    category: "",
                    description: "",
                    severity: "",
                    reportedBy: "",
                  });
                }}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
