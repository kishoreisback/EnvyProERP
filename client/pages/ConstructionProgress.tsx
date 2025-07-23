import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Building2,
  Calendar,
  Camera,
  CheckSquare,
  Clock,
  FileText,
  Hammer,
  Image,
  MapPin,
  Package,
  Plus,
  TrendingUp,
  Truck,
  Upload,
  Users,
  AlertTriangle,
  Target,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
  Timer,
  Clipboard,
  HardHat,
  Wrench,
  Activity,
  Eye,
  Edit,
  Download,
  Filter,
  Search,
  Calendar as CalendarIcon,
  DollarSign,
} from "lucide-react";

interface Milestone {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "not-started" | "in-progress" | "completed" | "delayed" | "on-hold";
  progress: number;
  dependencies: string[];
  assignedTo: string;
  estimatedDuration: number;
  actualDuration?: number;
  priority: "low" | "medium" | "high" | "critical";
  phase: string;
}

interface DailyReport {
  id: string;
  date: string;
  reportedBy: string;
  weather: string;
  workProgress: string;
  materialsUsed: string[];
  equipmentUsed: string[];
  laborCount: number;
  safetyIncidents: number;
  qualityIssues: string[];
  challenges: string;
  nextDayPlan: string;
  photos: string[];
  approvalStatus: "pending" | "approved" | "rejected";
  approvedBy?: string;
}

interface Contractor {
  id: string;
  name: string;
  company: string;
  specialization: string[];
  contactPerson: string;
  phone: string;
  email: string;
  rating: number;
  assignedTasks: string[];
  status: "active" | "inactive" | "on-break";
  contractValue: number;
  startDate: string;
  endDate: string;
}

interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  plannedQuantity: number;
  usedQuantity: number;
  remainingQuantity: number;
  unitCost: number;
  supplier: string;
  deliveryStatus: "pending" | "partial" | "delivered" | "delayed";
  quality: "approved" | "pending" | "rejected";
  location: string;
}

interface QualityCheck {
  id: string;
  checkType: string;
  description: string;
  date: string;
  inspector: string;
  result: "pass" | "fail" | "pending";
  remarks: string;
  photos: string[];
  correctionRequired: boolean;
  followUpDate?: string;
}

export default function ConstructionProgress() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const [milestones] = useState<Milestone[]>([
    {
      id: "1",
      name: "Site Excavation",
      description: "Complete excavation of building foundation area",
      startDate: "2024-01-15",
      endDate: "2024-01-25",
      status: "completed",
      progress: 100,
      dependencies: [],
      assignedTo: "Excavation Team A",
      estimatedDuration: 10,
      actualDuration: 8,
      priority: "high",
      phase: "Foundation",
    },
    {
      id: "2",
      name: "Foundation Laying",
      description: "Pour concrete foundation and install reinforcement",
      startDate: "2024-01-26",
      endDate: "2024-02-10",
      status: "in-progress",
      progress: 65,
      dependencies: ["1"],
      assignedTo: "Concrete Team B",
      estimatedDuration: 15,
      priority: "critical",
      phase: "Foundation",
    },
    {
      id: "3",
      name: "Plinth Beam Construction",
      description: "Construct plinth beams and prepare for ground floor",
      startDate: "2024-02-11",
      endDate: "2024-02-20",
      status: "not-started",
      progress: 0,
      dependencies: ["2"],
      assignedTo: "Structure Team C",
      estimatedDuration: 9,
      priority: "high",
      phase: "Structure",
    },
    {
      id: "4",
      name: "Ground Floor Slab",
      description: "Pour ground floor slab with proper reinforcement",
      startDate: "2024-02-21",
      endDate: "2024-03-05",
      status: "not-started",
      progress: 0,
      dependencies: ["3"],
      assignedTo: "Concrete Team B",
      estimatedDuration: 12,
      priority: "high",
      phase: "Structure",
    },
    {
      id: "5",
      name: "Column & Beam Work",
      description: "Construct columns and beams for first floor",
      startDate: "2024-03-06",
      endDate: "2024-03-25",
      status: "not-started",
      progress: 0,
      dependencies: ["4"],
      assignedTo: "Structure Team C",
      estimatedDuration: 19,
      priority: "medium",
      phase: "Structure",
    },
  ]);

  const [dailyReports] = useState<DailyReport[]>([
    {
      id: "1",
      date: "2024-01-28",
      reportedBy: "Rajesh Kumar",
      weather: "Sunny, 28°C",
      workProgress:
        "Foundation concrete pouring 65% complete. Reinforcement installation ongoing.",
      materialsUsed: [
        "Concrete - 15 cubic meters",
        "Steel bars - 2.5 tons",
        "Cement - 50 bags",
      ],
      equipmentUsed: ["Concrete mixer truck", "Crane", "Vibrator"],
      laborCount: 25,
      safetyIncidents: 0,
      qualityIssues: [
        "Minor surface irregularity in section C - corrective action taken",
      ],
      challenges:
        "Slight delay due to late concrete delivery. Coordinated with supplier for timely delivery tomorrow.",
      nextDayPlan:
        "Complete foundation pouring in remaining sections. Start curing process.",
      photos: [
        "foundation_progress_1.jpg",
        "reinforcement_detail.jpg",
        "team_work.jpg",
      ],
      approvalStatus: "approved",
      approvedBy: "Site Engineer",
    },
    {
      id: "2",
      date: "2024-01-29",
      reportedBy: "Rajesh Kumar",
      weather: "Partly cloudy, 26°C",
      workProgress:
        "Foundation concrete pouring 85% complete. Started preparation for plinth beam marking.",
      materialsUsed: ["Concrete - 12 cubic meters", "Steel bars - 1.8 tons"],
      equipmentUsed: ["Concrete mixer truck", "Theodolite", "Level machine"],
      laborCount: 28,
      safetyIncidents: 0,
      qualityIssues: [],
      challenges: "None reported",
      nextDayPlan:
        "Complete foundation work and begin plinth beam reinforcement preparation.",
      photos: ["foundation_final.jpg", "site_overview.jpg"],
      approvalStatus: "pending",
    },
  ]);

  const [contractors] = useState<Contractor[]>([
    {
      id: "1",
      name: "Ramesh Patel",
      company: "Excel Construction Co.",
      specialization: ["Foundation", "Excavation", "Earthwork"],
      contactPerson: "Ramesh Patel",
      phone: "+91 98765 43210",
      email: "ramesh@excelconstruction.com",
      rating: 4.8,
      assignedTasks: ["Site Excavation", "Foundation Laying"],
      status: "active",
      contractValue: 850000,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
    },
    {
      id: "2",
      name: "Suresh Sharma",
      company: "Prime Structures Ltd.",
      specialization: ["RCC Work", "Structural Work", "Concrete"],
      contactPerson: "Suresh Sharma",
      phone: "+91 98765 43211",
      email: "suresh@primestructures.com",
      rating: 4.6,
      assignedTasks: ["Plinth Beam Construction", "Ground Floor Slab"],
      status: "active",
      contractValue: 1200000,
      startDate: "2024-02-10",
      endDate: "2024-04-10",
    },
    {
      id: "3",
      name: "Vikram Singh",
      company: "Master Builders",
      specialization: ["Masonry", "Finishing", "Plastering"],
      contactPerson: "Vikram Singh",
      phone: "+91 98765 43212",
      email: "vikram@masterbuilders.com",
      rating: 4.7,
      assignedTasks: [],
      status: "inactive",
      contractValue: 950000,
      startDate: "2024-03-01",
      endDate: "2024-05-01",
    },
  ]);

  const [materials] = useState<Material[]>([
    {
      id: "1",
      name: "Portland Cement",
      category: "Cement",
      unit: "bags",
      plannedQuantity: 500,
      usedQuantity: 325,
      remainingQuantity: 175,
      unitCost: 350,
      supplier: "UltraTech Cement",
      deliveryStatus: "delivered",
      quality: "approved",
      location: "Storage Area A",
    },
    {
      id: "2",
      name: "TMT Steel Bars (12mm)",
      category: "Steel",
      unit: "tons",
      plannedQuantity: 15,
      usedQuantity: 8.5,
      remainingQuantity: 6.5,
      unitCost: 55000,
      supplier: "TATA Steel",
      deliveryStatus: "delivered",
      quality: "approved",
      location: "Steel Yard",
    },
    {
      id: "3",
      name: "Ready Mix Concrete (M25)",
      category: "Concrete",
      unit: "cubic meters",
      plannedQuantity: 150,
      usedQuantity: 95,
      remainingQuantity: 55,
      unitCost: 4500,
      supplier: "ACC Ready Mix",
      deliveryStatus: "partial",
      quality: "approved",
      location: "On-site delivery",
    },
    {
      id: "4",
      name: "Red Bricks",
      category: "Masonry",
      unit: "thousands",
      plannedQuantity: 50,
      usedQuantity: 0,
      remainingQuantity: 50,
      unitCost: 4000,
      supplier: "Local Brick Supplier",
      deliveryStatus: "pending",
      quality: "pending",
      location: "Storage Area B",
    },
  ]);

  const [qualityChecks] = useState<QualityCheck[]>([
    {
      id: "1",
      checkType: "Foundation Concrete Test",
      description: "Cube compression test for foundation concrete",
      date: "2024-01-27",
      inspector: "Quality Engineer",
      result: "pass",
      remarks:
        "Concrete strength meets M25 grade requirements. Average strength: 28.5 MPa",
      photos: ["concrete_test_1.jpg", "test_results.jpg"],
      correctionRequired: false,
    },
    {
      id: "2",
      checkType: "Steel Reinforcement Check",
      description: "Verification of steel bar diameter and spacing",
      date: "2024-01-26",
      inspector: "Structural Engineer",
      result: "fail",
      remarks:
        "Some areas have incorrect spacing. Requires correction before concrete pouring.",
      photos: ["steel_check_1.jpg", "spacing_issue.jpg"],
      correctionRequired: true,
      followUpDate: "2024-01-27",
    },
    {
      id: "3",
      checkType: "Excavation Level Check",
      description: "Verification of excavation depth and levels",
      date: "2024-01-20",
      inspector: "Site Engineer",
      result: "pass",
      remarks: "All levels are as per design. Ready for foundation work.",
      photos: ["excavation_level.jpg"],
      correctionRequired: false,
    },
  ]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("tab", value);
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "delayed":
        return "bg-red-500";
      case "on-hold":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "delayed":
        return <Badge className="bg-red-500">Delayed</Badge>;
      case "on-hold":
        return <Badge className="bg-yellow-500">On Hold</Badge>;
      case "not-started":
        return <Badge className="bg-gray-500">Not Started</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getDeliveryStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
      case "partial":
        return <Badge className="bg-yellow-500">Partial</Badge>;
      case "pending":
        return <Badge className="bg-gray-500">Pending</Badge>;
      case "delayed":
        return <Badge className="bg-red-500">Delayed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>{quality}</Badge>;
    }
  };

  const calculateOverallProgress = () => {
    const totalMilestones = milestones.length;
    const totalProgress = milestones.reduce(
      (sum, milestone) => sum + milestone.progress,
      0,
    );
    return Math.round(totalProgress / totalMilestones);
  };

  const getUpcomingMilestones = () => {
    return milestones
      .filter((m) => m.status === "not-started" || m.status === "in-progress")
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      )
      .slice(0, 3);
  };

  const getCriticalPath = () => {
    return milestones.filter(
      (m) => m.priority === "critical" || m.status === "delayed",
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Construction Progress Tracking
            </h2>
            <p className="text-muted-foreground">
              Monitor project milestones, daily reports, and construction
              activities
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Milestone
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-10">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="daily-reports">Daily Reports</TabsTrigger>
            <TabsTrigger value="site-photos">Site Photos</TabsTrigger>
            <TabsTrigger value="contractors">Contractors</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="logistics">Logistics</TabsTrigger>
            <TabsTrigger value="quality">Quality Control</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Overall Progress
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {calculateOverallProgress()}%
                  </div>
                  <Progress
                    value={calculateOverallProgress()}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {milestones.filter((m) => m.status === "completed").length}{" "}
                    of {milestones.length} milestones completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Contractors
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {contractors.filter((c) => c.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total contract value: ₹
                    {(
                      contractors.reduce((sum, c) => sum + c.contractValue, 0) /
                      100000
                    ).toFixed(1)}
                    L
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Materials Used
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      materials.reduce(
                        (sum, m) =>
                          sum + (m.usedQuantity / m.plannedQuantity) * 100,
                        0,
                      ) / materials.length,
                    )}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ₹
                    {(
                      materials.reduce(
                        (sum, m) => sum + m.usedQuantity * m.unitCost,
                        0,
                      ) / 100000
                    ).toFixed(1)}
                    L consumed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Quality Checks
                  </CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {qualityChecks.filter((q) => q.result === "pass").length}/
                    {qualityChecks.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(
                      (qualityChecks.filter((q) => q.result === "pass").length /
                        qualityChecks.length) *
                        100,
                    )}
                    % pass rate
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Upcoming Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getUpcomingMilestones().map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <div className="font-medium">{milestone.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {milestone.startDate} - {milestone.endDate}
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(milestone.status)}
                            {getPriorityBadge(milestone.priority)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            {milestone.progress}%
                          </div>
                          <Progress
                            value={milestone.progress}
                            className="w-20"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Critical Path Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getCriticalPath().map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between p-3 border rounded-lg border-red-200"
                      >
                        <div className="space-y-1">
                          <div className="font-medium">{milestone.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Assigned to: {milestone.assignedTo}
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(milestone.status)}
                            {getPriorityBadge(milestone.priority)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            {milestone.progress}%
                          </div>
                          <div className="text-sm text-red-600">
                            {milestone.status === "delayed"
                              ? "Delayed"
                              : "Critical"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Recent Daily Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dailyReports.slice(0, 3).map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{report.date}</div>
                          <div className="text-sm text-muted-foreground">
                            By: {report.reportedBy}
                          </div>
                          <Badge
                            className={
                              report.approvalStatus === "approved"
                                ? "bg-green-500"
                                : report.approvalStatus === "rejected"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                            }
                          >
                            {report.approvalStatus}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Material Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {materials.slice(0, 3).map((material) => (
                      <div key={material.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{material.name}</span>
                          <span className="text-sm">
                            {Math.round(
                              (material.usedQuantity /
                                material.plannedQuantity) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            (material.usedQuantity / material.plannedQuantity) *
                            100
                          }
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>
                            {material.usedQuantity}/{material.plannedQuantity}{" "}
                            {material.unit}
                          </span>
                          {getDeliveryStatusBadge(material.deliveryStatus)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Project Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {milestones.slice(0, 4).map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${getStatusColor(milestone.status)}`}
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {milestone.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {milestone.phase}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {milestone.progress}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Project Milestones</h3>
                <p className="text-sm text-muted-foreground">
                  Track construction phases and deliverables
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Milestone
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Create New Milestone</DialogTitle>
                      <DialogDescription>
                        Add a new milestone to track project progress
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="milestone-name">Milestone Name</Label>
                          <Input
                            id="milestone-name"
                            placeholder="Enter milestone name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="milestone-phase">Phase</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select phase" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="foundation">
                                Foundation
                              </SelectItem>
                              <SelectItem value="structure">
                                Structure
                              </SelectItem>
                              <SelectItem value="masonry">Masonry</SelectItem>
                              <SelectItem value="finishing">
                                Finishing
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="milestone-description">
                          Description
                        </Label>
                        <Textarea
                          id="milestone-description"
                          placeholder="Enter milestone description"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-date">Start Date</Label>
                          <Input id="start-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date">End Date</Label>
                          <Input id="end-date" type="date" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="assigned-to">Assigned To</Label>
                          <Input
                            id="assigned-to"
                            placeholder="Enter team/contractor name"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Create Milestone</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Milestone</TableHead>
                      <TableHead>Phase</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {milestones.map((milestone) => (
                      <TableRow key={milestone.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{milestone.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {milestone.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{milestone.phase}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{milestone.startDate}</div>
                            <div className="text-muted-foreground">
                              to {milestone.endDate}
                            </div>
                            <div className="text-xs">
                              {milestone.actualDuration
                                ? `${milestone.actualDuration}d actual`
                                : `${milestone.estimatedDuration}d estimated`}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {milestone.progress}%
                            </div>
                            <Progress
                              value={milestone.progress}
                              className="w-16"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{milestone.assignedTo}</TableCell>
                        <TableCell>
                          {getPriorityBadge(milestone.priority)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(milestone.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
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
          </TabsContent>

          <TabsContent value="daily-reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Daily Progress Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor daily construction activities and progress
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                      <DialogTitle>Create Daily Progress Report</DialogTitle>
                      <DialogDescription>
                        Record today's construction activities and progress
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[500px]">
                      <div className="grid gap-4 py-4 pr-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="report-date">Report Date</Label>
                            <Input
                              id="report-date"
                              type="date"
                              defaultValue={
                                new Date().toISOString().split("T")[0]
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="weather">Weather Conditions</Label>
                            <Input
                              id="weather"
                              placeholder="e.g., Sunny, 28°C"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="work-progress">Work Progress</Label>
                          <Textarea
                            id="work-progress"
                            placeholder="Describe today's work progress and achievements"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="materials-used">Materials Used</Label>
                          <Textarea
                            id="materials-used"
                            placeholder="List materials consumed today with quantities"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="equipment-used">Equipment Used</Label>
                          <Textarea
                            id="equipment-used"
                            placeholder="List equipment and machinery used"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="labor-count">Labor Count</Label>
                            <Input
                              id="labor-count"
                              type="number"
                              placeholder="Number of workers"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="safety-incidents">
                              Safety Incidents
                            </Label>
                            <Input
                              id="safety-incidents"
                              type="number"
                              placeholder="Number of incidents"
                              defaultValue="0"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quality-issues">Quality Issues</Label>
                          <Textarea
                            id="quality-issues"
                            placeholder="Report any quality concerns or issues"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="challenges">
                            Challenges & Issues
                          </Label>
                          <Textarea
                            id="challenges"
                            placeholder="Describe any challenges faced today"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="next-day-plan">Next Day Plan</Label>
                          <Textarea
                            id="next-day-plan"
                            placeholder="Outline tomorrow's planned activities"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="photos">Site Photos</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-2">
                              <Button variant="outline">Upload Photos</Button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Upload progress photos (max 10 files, 5MB each)
                            </p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                    <DialogFooter>
                      <Button variant="outline">Save as Draft</Button>
                      <Button>Submit Report</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid gap-6">
              {dailyReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Daily Report - {report.date}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Reported by: {report.reportedBy} | Weather:{" "}
                          {report.weather}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            report.approvalStatus === "approved"
                              ? "bg-green-500"
                              : report.approvalStatus === "rejected"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }
                        >
                          {report.approvalStatus}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Work Progress</h4>
                      <p className="text-sm text-muted-foreground">
                        {report.workProgress}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Materials Used</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {report.materialsUsed.map((material, index) => (
                            <li key={index}>• {material}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Equipment Used</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {report.equipmentUsed.map((equipment, index) => (
                            <li key={index}>• {equipment}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Labor: <strong>{report.laborCount}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Incidents: <strong>{report.safetyIncidents}</strong>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Photos: <strong>{report.photos.length}</strong>
                        </span>
                      </div>
                    </div>

                    {report.qualityIssues.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Quality Issues</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {report.qualityIssues.map((issue, index) => (
                            <li key={index}>• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium mb-2">Challenges</h4>
                      <p className="text-sm text-muted-foreground">
                        {report.challenges}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Next Day Plan</h4>
                      <p className="text-sm text-muted-foreground">
                        {report.nextDayPlan}
                      </p>
                    </div>

                    {report.approvedBy && (
                      <div className="pt-2 border-t">
                        <p className="text-sm text-muted-foreground">
                          Approved by: <strong>{report.approvedBy}</strong>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contractors" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Contractor Management</h3>
                <p className="text-sm text-muted-foreground">
                  Manage contractor assignments and performance
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Contractor
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {contractors.map((contractor) => (
                <Card key={contractor.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {contractor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">
                            {contractor.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {contractor.company}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={
                          contractor.status === "active"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }
                      >
                        {contractor.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Specialization</h4>
                      <div className="flex flex-wrap gap-1">
                        {contractor.specialization.map((spec, index) => (
                          <Badge key={index} variant="outline">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Contact</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>{contractor.contactPerson}</div>
                        <div>{contractor.phone}</div>
                        <div>{contractor.email}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Performance</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(contractor.rating) ? "bg-yellow-400" : "bg-gray-200"} ${i === 0 ? "rounded-l" : i === 4 ? "rounded-r" : ""}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">
                          {contractor.rating}/5.0
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Contract Details</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>
                          Value: ₹
                          {(contractor.contractValue / 100000).toFixed(1)}L
                        </div>
                        <div>
                          Duration: {contractor.startDate} to{" "}
                          {contractor.endDate}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Assigned Tasks</h4>
                      <div className="space-y-1">
                        {contractor.assignedTasks.length > 0 ? (
                          contractor.assignedTasks.map((task, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="mr-1 mb-1"
                            >
                              {task}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No tasks assigned
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Material Management</h3>
                <p className="text-sm text-muted-foreground">
                  Track material usage and inventory levels
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Material
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Usage Progress</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Delivery Status</TableHead>
                      <TableHead>Quality</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{material.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {material.usedQuantity}/{material.plannedQuantity}{" "}
                              {material.unit}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{material.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {Math.round(
                                (material.usedQuantity /
                                  material.plannedQuantity) *
                                  100,
                              )}
                              %
                            </div>
                            <Progress
                              value={
                                (material.usedQuantity /
                                  material.plannedQuantity) *
                                100
                              }
                              className="w-20"
                            />
                            <div className="text-xs text-muted-foreground">
                              {material.remainingQuantity} {material.unit}{" "}
                              remaining
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{material.supplier}</TableCell>
                        <TableCell>
                          {getDeliveryStatusBadge(material.deliveryStatus)}
                        </TableCell>
                        <TableCell>
                          {getQualityBadge(material.quality)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>
                              ₹{material.unitCost.toLocaleString()}/
                              {material.unit}
                            </div>
                            <div className="text-muted-foreground">
                              Total: ₹
                              {(
                                (material.usedQuantity * material.unitCost) /
                                100000
                              ).toFixed(1)}
                              L
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{material.location}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
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

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Low Stock Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {materials
                      .filter(
                        (m) => m.remainingQuantity / m.plannedQuantity < 0.2,
                      )
                      .map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center justify-between p-3 border rounded-lg border-orange-200"
                        >
                          <div>
                            <div className="font-medium">{material.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Only {material.remainingQuantity} {material.unit}{" "}
                              remaining
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Reorder
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Pending Deliveries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {materials
                      .filter(
                        (m) =>
                          m.deliveryStatus === "pending" ||
                          m.deliveryStatus === "partial",
                      )
                      .map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <div className="font-medium">{material.name}</div>
                            <div className="text-sm text-muted-foreground">
                              From: {material.supplier}
                            </div>
                          </div>
                          <div className="text-right">
                            {getDeliveryStatusBadge(material.deliveryStatus)}
                            <div className="text-xs text-muted-foreground mt-1">
                              Expected: Soon
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Quality Control</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor quality checks and compliance
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Schedule Check
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Check
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Checks
                  </CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {qualityChecks.length}
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pass Rate
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      (qualityChecks.filter((q) => q.result === "pass").length /
                        qualityChecks.length) *
                        100,
                    )}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {qualityChecks.filter((q) => q.result === "pass").length}{" "}
                    passed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Actions
                  </CardTitle>
                  <Timer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {qualityChecks.filter((q) => q.correctionRequired).length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Corrections needed
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Check Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Action Required</TableHead>
                      <TableHead>Follow-up</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {qualityChecks.map((check) => (
                      <TableRow key={check.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{check.checkType}</div>
                            <div className="text-sm text-muted-foreground">
                              {check.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{check.date}</TableCell>
                        <TableCell>{check.inspector}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              check.result === "pass"
                                ? "bg-green-500"
                                : check.result === "fail"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                            }
                          >
                            {check.result}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {check.correctionRequired ? (
                            <Badge variant="destructive">Required</Badge>
                          ) : (
                            <Badge className="bg-green-500">None</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {check.followUpDate ? (
                            <div className="text-sm">
                              <div>{check.followUpDate}</div>
                              <div className="text-muted-foreground">
                                Scheduled
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Camera className="h-4 w-4" />
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

          <TabsContent value="logistics" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Logistics Management</h3>
                <p className="text-sm text-muted-foreground">
                  Coordinate equipment, materials, and transportation
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Delivery
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Equipment Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Concrete Mixer Truck</div>
                        <div className="text-sm text-muted-foreground">
                          Tomorrow, 8:00 AM
                        </div>
                      </div>
                      <Badge className="bg-blue-500">Scheduled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Tower Crane</div>
                        <div className="text-sm text-muted-foreground">
                          Feb 5-15, 2024
                        </div>
                      </div>
                      <Badge className="bg-green-500">Confirmed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Excavator</div>
                        <div className="text-sm text-muted-foreground">
                          Completed
                        </div>
                      </div>
                      <Badge variant="secondary">Returned</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Material Deliveries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">TMT Steel Bars</div>
                        <div className="text-sm text-muted-foreground">
                          5 tons - TATA Steel
                        </div>
                      </div>
                      <Badge className="bg-yellow-500">In Transit</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Ready Mix Concrete</div>
                        <div className="text-sm text-muted-foreground">
                          25 cubic meters - ACC
                        </div>
                      </div>
                      <Badge className="bg-blue-500">Scheduled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Red Bricks</div>
                        <div className="text-sm text-muted-foreground">
                          10,000 pieces
                        </div>
                      </div>
                      <Badge className="bg-orange-500">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Site Logistics Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">
                      Site layout and logistics visualization
                    </p>
                    <p className="text-sm text-gray-400">
                      Interactive map would be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="site-photos" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Site Photo Gallery</h3>
                <p className="text-sm text-muted-foreground">
                  Visual progress documentation with timestamps
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Date
                </Button>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photos
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: 1,
                  title: "Foundation Progress",
                  date: "2024-01-28",
                  time: "10:30 AM",
                  category: "Foundation",
                  photos: 5,
                },
                {
                  id: 2,
                  title: "Steel Reinforcement",
                  date: "2024-01-27",
                  time: "2:45 PM",
                  category: "Structure",
                  photos: 8,
                },
                {
                  id: 3,
                  title: "Site Overview",
                  date: "2024-01-26",
                  time: "4:15 PM",
                  category: "General",
                  photos: 3,
                },
                {
                  id: 4,
                  title: "Equipment Setup",
                  date: "2024-01-25",
                  time: "9:00 AM",
                  category: "Equipment",
                  photos: 4,
                },
                {
                  id: 5,
                  title: "Excavation Complete",
                  date: "2024-01-24",
                  time: "5:30 PM",
                  category: "Excavation",
                  photos: 6,
                },
                {
                  id: 6,
                  title: "Quality Check",
                  date: "2024-01-23",
                  time: "11:00 AM",
                  category: "Quality",
                  photos: 2,
                },
              ].map((album) => (
                <Card
                  key={album.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <Image className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{album.title}</h4>
                        <Badge variant="outline">{album.category}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {album.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {album.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <Camera className="h-3 w-3" />
                          {album.photos} photos
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Safety Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Track safety compliance and incidents
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Clipboard className="mr-2 h-4 w-4" />
                  Safety Checklist
                </Button>
                <Button>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Incident
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Safety Score
                  </CardTitle>
                  <HardHat className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96.8%</div>
                  <p className="text-xs text-muted-foreground">
                    Excellent rating
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Incidents
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    PPE Compliance
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">100%</div>
                  <p className="text-xs text-muted-foreground">
                    All workers equipped
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Training Status
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98%</div>
                  <p className="text-xs text-muted-foreground">
                    Workers trained
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clipboard className="h-5 w-5" />
                    Daily Safety Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        item: "PPE availability and usage",
                        status: "completed",
                      },
                      {
                        item: "Equipment safety inspection",
                        status: "completed",
                      },
                      { item: "Site housekeeping", status: "completed" },
                      { item: "Emergency exits clear", status: "completed" },
                      { item: "First aid kit stocked", status: "pending" },
                      {
                        item: "Fire safety equipment check",
                        status: "completed",
                      },
                    ].map((check, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{check.item}</span>
                        {check.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Safety Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="font-medium text-yellow-800">
                        Weather Alert
                      </div>
                      <div className="text-sm text-yellow-600">
                        High winds expected tomorrow. Secure loose materials.
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-medium text-blue-800">
                        Training Reminder
                      </div>
                      <div className="text-sm text-blue-600">
                        Monthly safety training due for 5 workers.
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-medium text-green-800">
                        Achievement
                      </div>
                      <div className="text-sm text-green-600">
                        30 days without safety incidents completed!
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Construction Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Project insights and performance metrics
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Schedule Performance
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">
                    On-time completion
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Cost Performance
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98%</div>
                  <p className="text-xs text-muted-foreground">Within budget</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Quality Index
                  </CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">95%</div>
                  <p className="text-xs text-muted-foreground">Quality score</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Productivity
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">104%</div>
                  <p className="text-xs text-muted-foreground">Above target</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">
                        Gantt Chart / Timeline View
                      </p>
                      <p className="text-sm text-gray-400">
                        Interactive project timeline would be displayed here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Labor Utilization</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Equipment Utilization</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Material Efficiency</span>
                        <span>88%</span>
                      </div>
                      <Progress value={88} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Budget Utilization</span>
                        <span>76%</span>
                      </div>
                      <Progress value={76} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">
                      Performance Charts & Analytics
                    </p>
                    <p className="text-sm text-gray-400">
                      Detailed performance metrics and trends would be displayed
                      here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
