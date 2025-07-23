import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import {
  ArrowLeft,
  Building2,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Users,
  Zap,
  Target,
  Bell,
  Settings,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Edit,
  Trash2,
  Eye,
  Share2,
  Copy,
  Send,
  Timer,
  Route,
  Smartphone,
  Globe,
  Star,
  Flag,
  BarChart3,
  PieChart,
  LineChart,
  DollarSign,
  MousePointer,
  UserCheck,
  UserPlus,
  Workflow,
  Layers,
  GitBranch,
  RefreshCw,
  FileText,
  Briefcase,
  Home,
  ShoppingCart,
  Megaphone,
  Package,
  Wrench,
  HardHat,
  Ruler,
  Calculator,
  Clipboard,
  FolderOpen,
  Award,
  Truck,
  Camera,
  Video,
  Download,
  Upload,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  X,
  Check,
  Info,
  AlertCircle,
  Zap as Lightning,
  MoreHorizontal,
  Maximize2,
  Archive,
  BookOpen,
  Database,
  CloudUpload,
  Shield,
  Lock,
  Unlock,
  Key,
  QrCode,
  Scan,
  Printer,
  Save,
  RotateCcw,
  FastForward,
  Rewind,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
  Bluetooth,
  Usb,
  HardDrive,
  Monitor,
  Keyboard,
  Mouse,
  Gamepad2,
  Headphones,
  Mic,
  MicOff,
  Boxes,
  ShoppingBag,
  CreditCard,
  Banknote,
  Coins,
  Receipt,
  PiggyBank,
  TrendingDown as Decline,
  PercentCircle,
  Percent,
  Hash,
  AtSign,
  Ampersand,
  Asterisk,
  Slash,
  Backslash,
  Equal,
  Minus,
  Plus as Add,
  Divide,
  Multiply,
  Power,
  SquareRoot,
  Pi,
  Infinity,
  Triangle,
  Square,
  Circle,
  Pentagon,
  Hexagon,
  Octagon,
  Diamond,
  Heart,
  Spade,
  Club,
} from "lucide-react";

// Sample project data
const sampleProjects = [
  {
    id: "PRJ001",
    name: "Sunrise Residency Phase 1",
    type: "Construction",
    category: "Residential",
    client: "Sunrise Developers Ltd",
    clientId: "CL001",
    status: "In Progress",
    priority: "High",
    stage: "Execution",
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    estimatedDuration: "11 months",
    actualDuration: "7 months",
    budget: 25000000,
    spent: 16250000,
    remainingBudget: 8750000,
    profitMargin: 18,
    location: "Sector 45, Gurgaon",
    area: "15 acres",
    units: 180,
    manager: "Rajesh Kumar",
    teamSize: 25,
    description:
      "Premium residential project with 180 units across 15 acres featuring modern amenities and green spaces.",
    milestones: [
      {
        name: "Site Preparation",
        status: "Completed",
        date: "2024-02-15",
        progress: 100,
      },
      {
        name: "Foundation",
        status: "Completed",
        date: "2024-04-30",
        progress: 100,
      },
      {
        name: "Structure",
        status: "In Progress",
        date: "2024-08-15",
        progress: 80,
      },
      { name: "Finishing", status: "Pending", date: "2024-11-30", progress: 0 },
      { name: "Handover", status: "Pending", date: "2024-12-15", progress: 0 },
    ],
    risks: [
      {
        type: "Schedule",
        level: "Medium",
        description: "Monsoon delays possible",
      },
      {
        type: "Budget",
        level: "Low",
        description: "Material cost fluctuation",
      },
    ],
    team: [
      {
        id: "EMP001",
        name: "Rajesh Kumar",
        role: "Project Manager",
        avatar: "RK",
      },
      {
        id: "EMP012",
        name: "Priya Sharma",
        role: "Site Engineer",
        avatar: "PS",
      },
      {
        id: "EMP023",
        name: "Amit Singh",
        role: "Safety Officer",
        avatar: "AS",
      },
      {
        id: "EMP034",
        name: "Neha Gupta",
        role: "Quality Controller",
        avatar: "NG",
      },
    ],
    resources: [
      { type: "Equipment", name: "Excavator", quantity: 2, status: "Active" },
      {
        type: "Material",
        name: "Cement",
        quantity: "500 bags",
        status: "Sufficient",
      },
      {
        type: "Material",
        name: "Steel Bars",
        quantity: "50 tons",
        status: "Low Stock",
      },
    ],
    recentActivity: [
      {
        type: "Progress Update",
        message: "Foundation work completed",
        time: "2 hours ago",
        user: "Rajesh Kumar",
      },
      {
        type: "Resource",
        message: "Steel bars delivery scheduled",
        time: "1 day ago",
        user: "Priya Sharma",
      },
      {
        type: "Issue",
        message: "Weather delay reported",
        time: "2 days ago",
        user: "Amit Singh",
      },
    ],
  },
  {
    id: "PRJ002",
    name: "Metro Mall Commercial Complex",
    type: "Construction",
    category: "Commercial",
    client: "Metro Properties Pvt Ltd",
    clientId: "CL002",
    status: "Planning",
    priority: "High",
    stage: "Planning",
    progress: 25,
    startDate: "2024-03-01",
    endDate: "2025-09-30",
    estimatedDuration: "18 months",
    actualDuration: "2 months",
    budget: 85000000,
    spent: 8500000,
    remainingBudget: 76500000,
    profitMargin: 22,
    location: "MG Road, Bangalore",
    area: "25 acres",
    units: 1,
    manager: "Sanjay Patel",
    teamSize: 18,
    description:
      "Large commercial complex with retail spaces, food courts, multiplex and office towers.",
    milestones: [
      {
        name: "Design Approval",
        status: "Completed",
        date: "2024-03-15",
        progress: 100,
      },
      {
        name: "Permits & Clearances",
        status: "In Progress",
        date: "2024-05-30",
        progress: 60,
      },
      {
        name: "Site Preparation",
        status: "Pending",
        date: "2024-07-15",
        progress: 0,
      },
      {
        name: "Construction",
        status: "Pending",
        date: "2024-08-01",
        progress: 0,
      },
      {
        name: "Completion",
        status: "Pending",
        date: "2025-09-30",
        progress: 0,
      },
    ],
    risks: [
      {
        type: "Regulatory",
        level: "High",
        description: "Environmental clearance pending",
      },
      {
        type: "Financial",
        level: "Medium",
        description: "Funding approval in progress",
      },
    ],
    team: [
      {
        id: "EMP045",
        name: "Sanjay Patel",
        role: "Project Manager",
        avatar: "SP",
      },
      { id: "EMP056", name: "Kavita Reddy", role: "Architect", avatar: "KR" },
      {
        id: "EMP067",
        name: "Ravi Mehta",
        role: "Structural Engineer",
        avatar: "RM",
      },
    ],
    resources: [
      { type: "Equipment", name: "Crane", quantity: 3, status: "Ordered" },
      {
        type: "Material",
        name: "RCC",
        quantity: "2000 m³",
        status: "Planning",
      },
    ],
    recentActivity: [
      {
        type: "Approval",
        message: "Design approved by client",
        time: "3 days ago",
        user: "Kavita Reddy",
      },
      {
        type: "Documentation",
        message: "Environmental clearance submitted",
        time: "1 week ago",
        user: "Sanjay Patel",
      },
    ],
  },
  {
    id: "PRJ003",
    name: "Digital Marketing Campaign Q2",
    type: "Marketing",
    category: "Brand Awareness",
    client: "TechFlow Solutions",
    clientId: "CL003",
    status: "Active",
    priority: "Medium",
    stage: "Execution",
    progress: 45,
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    estimatedDuration: "3 months",
    actualDuration: "1.5 months",
    budget: 1500000,
    spent: 675000,
    remainingBudget: 825000,
    profitMargin: 25,
    location: "Pan India",
    area: "Digital",
    units: 1,
    manager: "Anita Joshi",
    teamSize: 8,
    description:
      "Comprehensive digital marketing campaign targeting tech professionals across multiple platforms.",
    milestones: [
      {
        name: "Strategy Development",
        status: "Completed",
        date: "2024-04-15",
        progress: 100,
      },
      {
        name: "Content Creation",
        status: "In Progress",
        date: "2024-05-15",
        progress: 70,
      },
      {
        name: "Campaign Launch",
        status: "In Progress",
        date: "2024-05-30",
        progress: 40,
      },
      {
        name: "Optimization",
        status: "Pending",
        date: "2024-06-15",
        progress: 0,
      },
      {
        name: "Report & Analysis",
        status: "Pending",
        date: "2024-06-30",
        progress: 0,
      },
    ],
    risks: [
      { type: "Performance", level: "Low", description: "CTR below target" },
      {
        type: "Budget",
        level: "Low",
        description: "Ad spend optimization needed",
      },
    ],
    team: [
      {
        id: "EMP078",
        name: "Anita Joshi",
        role: "Campaign Manager",
        avatar: "AJ",
      },
      {
        id: "EMP089",
        name: "Rohit Agarwal",
        role: "Digital Strategist",
        avatar: "RA",
      },
      {
        id: "EMP090",
        name: "Pooja Malik",
        role: "Content Creator",
        avatar: "PM",
      },
    ],
    resources: [
      {
        type: "Tool",
        name: "Analytics Platform",
        quantity: 1,
        status: "Active",
      },
      { type: "Service", name: "Ad Spend", quantity: "₹10L", status: "In Use" },
    ],
    recentActivity: [
      {
        type: "Campaign",
        message: "LinkedIn ads launched",
        time: "6 hours ago",
        user: "Rohit Agarwal",
      },
      {
        type: "Content",
        message: "Video content approved",
        time: "1 day ago",
        user: "Pooja Malik",
      },
    ],
  },
];

// Project statistics
const projectStats = {
  totalProjects: 24,
  activeProjects: 12,
  completedProjects: 8,
  onHoldProjects: 3,
  delayedProjects: 1,
  totalBudget: 145000000,
  spentBudget: 89750000,
  remainingBudget: 55250000,
  averageProgress: 58,
  onTimeProjects: 18,
  teamMembers: 156,
  avgProfitMargin: 21.5,
};

// Task data for project execution
const sampleTasks = [
  {
    id: "TSK001",
    projectId: "PRJ001",
    title: "Foundation Excavation",
    description: "Complete excavation for foundation work in Block A",
    assignee: "Rajesh Kumar",
    status: "Completed",
    priority: "High",
    startDate: "2024-02-01",
    dueDate: "2024-02-15",
    completedDate: "2024-02-14",
    progress: 100,
    estimatedHours: 120,
    actualHours: 118,
    dependencies: [],
    category: "Construction",
  },
  {
    id: "TSK002",
    projectId: "PRJ001",
    title: "Steel Structure Installation",
    description: "Install steel framework for floors 1-5",
    assignee: "Priya Sharma",
    status: "In Progress",
    priority: "High",
    startDate: "2024-04-15",
    dueDate: "2024-06-30",
    progress: 80,
    estimatedHours: 240,
    actualHours: 192,
    dependencies: ["TSK001"],
    category: "Construction",
  },
  {
    id: "TSK003",
    projectId: "PRJ002",
    title: "Environmental Impact Assessment",
    description: "Complete EIA report for regulatory approval",
    assignee: "Kavita Reddy",
    status: "In Progress",
    priority: "Critical",
    startDate: "2024-03-15",
    dueDate: "2024-05-30",
    progress: 65,
    estimatedHours: 80,
    actualHours: 52,
    dependencies: [],
    category: "Documentation",
  },
  {
    id: "TSK004",
    projectId: "PRJ003",
    title: "Social Media Content Creation",
    description: "Create engaging content for LinkedIn and Instagram campaigns",
    assignee: "Pooja Malik",
    status: "In Progress",
    priority: "Medium",
    startDate: "2024-04-20",
    dueDate: "2024-05-25",
    progress: 70,
    estimatedHours: 60,
    actualHours: 42,
    dependencies: [],
    category: "Creative",
  },
];

// Resource allocation data
const resourceData = [
  {
    id: "RES001",
    projectId: "PRJ001",
    type: "Human",
    name: "Rajesh Kumar",
    role: "Project Manager",
    allocation: 100,
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    cost: 150000,
    utilization: 95,
  },
  {
    id: "RES002",
    projectId: "PRJ001",
    type: "Equipment",
    name: "Excavator CAT 320",
    role: "Heavy Machinery",
    allocation: 80,
    startDate: "2024-02-01",
    endDate: "2024-03-30",
    cost: 250000,
    utilization: 85,
  },
  {
    id: "RES003",
    projectId: "PRJ002",
    type: "Human",
    name: "Sanjay Patel",
    role: "Project Manager",
    allocation: 100,
    startDate: "2024-03-01",
    endDate: "2025-09-30",
    cost: 180000,
    utilization: 90,
  },
];

export default function Projects() {
  const location = useLocation();
  const navigate = useNavigate();

  // Map URL paths to tab values
  const getTabFromPath = (path: string) => {
    const pathSegments = path.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Map URL segments to appropriate tabs
    const tabMap: Record<string, string> = {
      dashboard: "overview",
      list: "projects",
      planning: "planning",
      execution: "execution",
      resources: "resources",
      timeline: "timeline",
      budget: "budget",
      reports: "reports",
      analytics: "reports",
    };

    const validTabs = [
      "overview",
      "projects",
      "planning",
      "execution",
      "resources",
      "timeline",
      "budget",
      "reports",
    ];

    // If it's a mapped tab, use the mapping
    if (tabMap[lastSegment]) {
      return tabMap[lastSegment];
    }

    // If it's a valid tab, use it directly
    if (validTabs.includes(lastSegment)) {
      return lastSegment;
    }

    // Default to overview
    return "overview";
  };

  const [activeTab, setActiveTab] = useState(() =>
    getTabFromPath(location.pathname),
  );

  // Sync URL changes with tab state
  useEffect(() => {
    const newTab = getTabFromPath(location.pathname);
    setActiveTab(newTab);
  }, [location.pathname]);

  // Handle tab changes - update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "overview") {
      navigate("/projects");
    } else {
      navigate(`/projects/${value}`);
    }
  };

  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [projectTypeFilter, setProjectTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Enhanced state for comprehensive editing
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<any>(null);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [isTaskEditModalOpen, setIsTaskEditModalOpen] = useState(false);
  const [editingTimeline, setEditingTimeline] = useState<any>(null);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState("tenant_buildcorp");
  const [currentEditStep, setCurrentEditStep] = useState(1);

  // Multi-tenant projects data
  const tenantProjects = {
    tenant_buildcorp: sampleProjects,
    tenant_techcorp: sampleProjects.map((p) => ({
      ...p,
      id: p.id + "_tech",
      client: p.client + " Tech",
    })),
    tenant_greencorp: sampleProjects.map((p) => ({
      ...p,
      id: p.id + "_green",
      client: p.client + " Green",
    })),
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const filteredProjects = sampleProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      projectTypeFilter === "All" || project.type === projectTypeFilter;
    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || project.priority === priorityFilter;

    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      "In Progress": "bg-blue-100 text-blue-800",
      Planning: "bg-yellow-100 text-yellow-800",
      "On Hold": "bg-gray-100 text-gray-800",
      Completed: "bg-purple-100 text-purple-800",
      Delayed: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      Critical: "bg-red-100 text-red-800",
      High: "bg-orange-100 text-orange-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    };
    return (
      colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
              Project Management System
            </h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Comprehensive project lifecycle management for Construction, Real
              Estate, Sales & Marketing
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <Building2 className="h-4 w-4 text-blue-500" />
                {projectStats.totalProjects} Projects
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <Users className="h-4 w-4 text-green-500" />
                {projectStats.teamMembers} Team Members
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <DollarSign className="h-4 w-4 text-purple-500" />₹
                {(projectStats.totalBudget / 10000000).toFixed(1)}Cr Budget
              </Badge>
            </div>
            <Button
              onClick={() => setShowCreateProjectModal(true)}
              className="w-full sm:w-auto"
            >
              <AnimatedIcon icon={Plus} className="mr-2" />
              Create Project
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Over</span>
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Building2 className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Projects</span>
              <span className="sm:hidden">Proj</span>
            </TabsTrigger>
            <TabsTrigger
              value="planning"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Calendar className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Planning</span>
              <span className="lg:hidden">Plan</span>
            </TabsTrigger>
            <TabsTrigger
              value="execution"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Activity className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Execution</span>
              <span className="lg:hidden">Exec</span>
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Users className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Resources</span>
              <span className="lg:hidden">Res</span>
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Clock className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Timeline</span>
              <span className="lg:hidden">Time</span>
            </TabsTrigger>
            <TabsTrigger
              value="budget"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <DollarSign className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Budget</span>
              <span className="lg:hidden">Budget</span>
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <PieChart className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Reports</span>
              <span className="lg:hidden">Rep</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Project Stats */}
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
                    <div>
                      <p className="text-xl lg:text-2xl font-bold">
                        {projectStats.totalProjects}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total Projects
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
                    <div>
                      <p className="text-xl lg:text-2xl font-bold">
                        {projectStats.activeProjects}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Active Projects
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600" />
                    <div>
                      <p className="text-xl lg:text-2xl font-bold">
                        {projectStats.completedProjects}
                      </p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Pause className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-600" />
                    <div>
                      <p className="text-xl lg:text-2xl font-bold">
                        {projectStats.onHoldProjects}
                      </p>
                      <p className="text-xs text-muted-foreground">On Hold</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 lg:h-8 lg:w-8 text-red-600" />
                    <div>
                      <p className="text-xl lg:text-2xl font-bold">
                        {projectStats.delayedProjects}
                      </p>
                      <p className="text-xs text-muted-foreground">Delayed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 lg:h-8 lg:w-8 text-indigo-600" />
                    <div>
                      <p className="text-xl lg:text-2xl font-bold">
                        ₹{(projectStats.totalBudget / 10000000).toFixed(1)}Cr
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total Budget
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                    <div>
                      <p className="text-xl lg:text-2xl font-bold">
                        {projectStats.averageProgress}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Avg Progress
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-6 w-6 lg:h-8 lg:w-8 text-cyan-600" />
                    <div>
                      <p className="text-xl lg:text-2xl font-bold">
                        {projectStats.teamMembers}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Team Members
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleTabChange("projects")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Plus className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Create New Project</h3>
                      <p className="text-sm text-muted-foreground">
                        Start a new project
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleTabChange("planning")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Project Planning</h3>
                      <p className="text-sm text-muted-foreground">
                        Plan milestones & timelines
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleTabChange("resources")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Resource Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage teams & equipment
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleTabChange("reports")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Project Reports</h3>
                      <p className="text-sm text-muted-foreground">
                        Analytics & insights
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Recent Projects
                </CardTitle>
                <CardDescription>
                  Latest project updates and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleProjects.slice(0, 3).map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{project.name}</h4>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {project.endDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {project.manager}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Progress value={project.progress} className="w-20" />
                          <span className="text-sm font-medium">
                            {project.progress}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ₹{(project.budget / 100000).toFixed(1)}L Budget
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-full sm:w-[300px]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select
                      value={projectTypeFilter}
                      onValueChange={setProjectTypeFilter}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Construction">
                          Construction
                        </SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={priorityFilter}
                      onValueChange={setPriorityFilter}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Priority</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          {project.name}
                        </CardTitle>
                        <CardDescription>{project.client}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingProject(project);
                              setIsEditProjectOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            Manage Team
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">{project.type}</Badge>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">
                          ₹{(project.budget / 100000).toFixed(1)}L
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Due Date</p>
                        <p className="font-medium">{project.endDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {project.manager} • {project.teamSize} members
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Link
                          to={`/crm/clients`}
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View Client
                        </Link>
                      </Button>
                      <Button size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Planning Tab */}
          <TabsContent value="planning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Project Planning & Milestones
                </CardTitle>
                <CardDescription>
                  Plan project phases, milestones, and dependencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setEditingMilestone({
                          projectId: sampleProjects[0].id,
                          name: "",
                          status: "Pending",
                          date: "",
                          progress: 0,
                        });
                        setIsMilestoneModalOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Milestone
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingProject(sampleProjects[0]);
                        setIsEditProjectOpen(true);
                        setCurrentEditStep(2); // Planning step
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Planning
                    </Button>
                  </div>
                  <Select
                    value={selectedTenant}
                    onValueChange={setSelectedTenant}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select Tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant_buildcorp">
                        BuildCorp
                      </SelectItem>
                      <SelectItem value="tenant_techcorp">TechCorp</SelectItem>
                      <SelectItem value="tenant_greencorp">
                        GreenCorp
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-6">
                  {(tenantProjects[selectedTenant] || sampleProjects).map(
                    (project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {project.client}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingProject(project);
                                setIsEditProjectOpen(true);
                                setCurrentEditStep(2);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {project.milestones.map((milestone, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h5 className="font-medium">
                                    {milestone.name}
                                  </h5>
                                  <Badge
                                    variant="outline"
                                    className={
                                      milestone.status === "Completed"
                                        ? "bg-green-100 text-green-800"
                                        : milestone.status === "In Progress"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-gray-100 text-gray-800"
                                    }
                                  >
                                    {milestone.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Due: {milestone.date}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-right">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Progress
                                      value={milestone.progress}
                                      className="w-20"
                                    />
                                    <span className="text-sm font-medium">
                                      {milestone.progress}%
                                    </span>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingMilestone({
                                      ...milestone,
                                      projectId: project.id,
                                      index,
                                    });
                                    setIsMilestoneModalOpen(true);
                                  }}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Execution Tab */}
          <TabsContent value="execution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Task Management & Execution
                </CardTitle>
                <CardDescription>
                  Track tasks, progress, and team activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button onClick={() => setShowTaskModal(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Task
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const notification = document.createElement("div");
                          notification.className =
                            "fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-md shadow-lg z-50";
                          notification.innerHTML =
                            "📋 Bulk task operations opened";
                          document.body.appendChild(notification);
                          setTimeout(() => notification.remove(), 3000);
                        }}
                      >
                        <Activity className="mr-2 h-4 w-4" />
                        Bulk Operations
                      </Button>
                      <Select
                        value={selectedProject}
                        onValueChange={setSelectedProject}
                      >
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Filter by project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Projects</SelectItem>
                          {(
                            tenantProjects[selectedTenant] || sampleProjects
                          ).map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Select
                      value={selectedTenant}
                      onValueChange={setSelectedTenant}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Tenant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tenant_buildcorp">
                          BuildCorp
                        </SelectItem>
                        <SelectItem value="tenant_techcorp">
                          TechCorp
                        </SelectItem>
                        <SelectItem value="tenant_greencorp">
                          GreenCorp
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleTasks
                        .filter(
                          (task) =>
                            !selectedProject ||
                            selectedProject === "all" ||
                            task.projectId === selectedProject,
                        )
                        .map((task) => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{task.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {task.description}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {
                                sampleProjects.find(
                                  (p) => p.id === task.projectId,
                                )?.name
                              }
                            </TableCell>
                            <TableCell>{task.assignee}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(task.status)}>
                                {task.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={getPriorityColor(task.priority)}
                              >
                                {task.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={task.progress}
                                  className="w-16"
                                />
                                <span className="text-sm">
                                  {task.progress}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{task.dueDate}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setEditingTask(task);
                                      setIsTaskEditModalOpen(true);
                                    }}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Task
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      const notification =
                                        document.createElement("div");
                                      notification.className =
                                        "fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-md shadow-lg z-50";
                                      notification.innerHTML =
                                        "👤 Task reassignment opened";
                                      document.body.appendChild(notification);
                                      setTimeout(
                                        () => notification.remove(),
                                        3000,
                                      );
                                    }}
                                  >
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Reassign
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      const notification =
                                        document.createElement("div");
                                      notification.className =
                                        "fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50";
                                      notification.innerHTML =
                                        "💬 Task comments opened";
                                      document.body.appendChild(notification);
                                      setTimeout(
                                        () => notification.remove(),
                                        3000,
                                      );
                                    }}
                                  >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Add Comment
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Task
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Resource Management
                </CardTitle>
                <CardDescription>
                  Manage team members, equipment, and resource allocation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-2">
                    <Button onClick={() => setShowResourceModal(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Allocate Resource
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/hrms/employees">
                        <Users className="mr-2 h-4 w-4" />
                        Manage Team
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/inventory">
                        <Package className="mr-2 h-4 w-4" />
                        Equipment & Materials
                      </Link>
                    </Button>
                  </div>

                  {/* Resource Allocation Table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resource</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Allocation</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Utilization</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resourceData.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{resource.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {resource.role}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{resource.type}</Badge>
                          </TableCell>
                          <TableCell>
                            {
                              sampleProjects.find(
                                (p) => p.id === resource.projectId,
                              )?.name
                            }
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={resource.allocation}
                                className="w-16"
                              />
                              <span className="text-sm">
                                {resource.allocation}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{resource.startDate}</p>
                              <p className="text-muted-foreground">
                                to {resource.endDate}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            ₹{(resource.cost / 1000).toFixed(0)}K
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  resource.utilization >= 90
                                    ? "bg-green-500"
                                    : resource.utilization >= 70
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                              <span className="text-sm">
                                {resource.utilization}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Allocation
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Reschedule
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Activity className="mr-2 h-4 w-4" />
                                  View Utilization
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <X className="mr-2 h-4 w-4" />
                                  Remove Allocation
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Project Timeline & Schedule
                </CardTitle>
                <CardDescription>
                  Visual timeline and Gantt chart view of project schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setEditingTimeline({
                          projectId: sampleProjects[0].id,
                          type: "schedule",
                        });
                        setIsTimelineModalOpen(true);
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Edit Schedule
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const notification = document.createElement("div");
                        notification.className =
                          "fixed top-4 right-4 bg-purple-500 text-white p-4 rounded-md shadow-lg z-50";
                        notification.innerHTML = "📊 Gantt chart view opened";
                        document.body.appendChild(notification);
                        setTimeout(() => notification.remove(), 3000);
                      }}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Gantt View
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const notification = document.createElement("div");
                        notification.className =
                          "fixed top-4 right-4 bg-orange-500 text-white p-4 rounded-md shadow-lg z-50";
                        notification.innerHTML = "🔗 Dependencies updated";
                        document.body.appendChild(notification);
                        setTimeout(() => notification.remove(), 3000);
                      }}
                    >
                      <Route className="h-4 w-4 mr-2" />
                      Dependencies
                    </Button>
                  </div>
                  <Select
                    value={selectedTenant}
                    onValueChange={setSelectedTenant}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select Tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant_buildcorp">
                        BuildCorp
                      </SelectItem>
                      <SelectItem value="tenant_techcorp">TechCorp</SelectItem>
                      <SelectItem value="tenant_greencorp">
                        GreenCorp
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-6">
                  {(tenantProjects[selectedTenant] || sampleProjects).map(
                    (project) => (
                      <div
                        key={project.id}
                        className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold">{project.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Start: {project.startDate}</span>
                              <span>End: {project.endDate}</span>
                              <span>Duration: {project.estimatedDuration}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                              <p className="text-sm text-muted-foreground mt-1">
                                {project.progress}% Complete
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingTimeline({
                                  ...project,
                                  type: "schedule",
                                });
                                setIsTimelineModalOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Timeline visualization */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            Project Timeline
                          </div>
                          <div className="relative">
                            <Progress
                              value={project.progress}
                              className="h-6"
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                              {project.progress}% Complete
                            </div>
                          </div>

                          {/* Milestone timeline */}
                          <div className="mt-4 space-y-2">
                            {project.milestones.map((milestone, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-4"
                              >
                                <div className="flex items-center gap-2 w-40">
                                  <div
                                    className={`h-3 w-3 rounded-full ${
                                      milestone.status === "Completed"
                                        ? "bg-green-500"
                                        : milestone.status === "In Progress"
                                          ? "bg-blue-500"
                                          : "bg-gray-300"
                                    }`}
                                  />
                                  <span className="text-sm font-medium">
                                    {milestone.name}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <Progress
                                    value={milestone.progress}
                                    className="h-2"
                                  />
                                </div>
                                <span className="text-sm text-muted-foreground w-24">
                                  {milestone.date}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        ₹{(projectStats.totalBudget / 10000000).toFixed(1)}Cr
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Budget
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        ₹{(projectStats.spentBudget / 10000000).toFixed(1)}Cr
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Amount Spent
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        ₹{(projectStats.remainingBudget / 10000000).toFixed(1)}
                        Cr
                      </p>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <PercentCircle className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {projectStats.avgProfitMargin}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Avg Profit Margin
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Project Budget Analysis
                </CardTitle>
                <CardDescription>
                  Detailed budget breakdown and financial performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Remaining</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Profit Margin</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {project.client}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          ₹{(project.budget / 100000).toFixed(1)}L
                        </TableCell>
                        <TableCell>
                          ₹{(project.spent / 100000).toFixed(1)}L
                        </TableCell>
                        <TableCell>
                          ���{(project.remainingBudget / 100000).toFixed(1)}L
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={project.progress}
                              className="w-16"
                            />
                            <span className="text-sm">{project.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              project.profitMargin >= 20
                                ? "text-green-600"
                                : project.profitMargin >= 15
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }
                          >
                            {project.profitMargin}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Performance</CardTitle>
                  <CardDescription>
                    Overall project health and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>On-Time Delivery Rate</span>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="w-20" />
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Budget Adherence</span>
                      <div className="flex items-center gap-2">
                        <Progress value={82} className="w-20" />
                        <span className="text-sm font-medium">82%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Quality Score</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-20" />
                        <span className="text-sm font-medium">88%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Client Satisfaction</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                  <CardDescription>
                    Team and equipment utilization rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Team Utilization</span>
                      <div className="flex items-center gap-2">
                        <Progress value={87} className="w-20" />
                        <span className="text-sm font-medium">87%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Equipment Utilization</span>
                      <div className="flex items-center gap-2">
                        <Progress value={73} className="w-20" />
                        <span className="text-sm font-medium">73%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Material Efficiency</span>
                      <div className="flex items-center gap-2">
                        <Progress value={91} className="w-20" />
                        <span className="text-sm font-medium">91%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Overall Efficiency</span>
                      <div className="flex items-center gap-2">
                        <Progress value={84} className="w-20" />
                        <span className="text-sm font-medium">84%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project Analytics</CardTitle>
                <CardDescription>
                  Detailed insights and trends analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="text-2xl font-bold text-green-600">
                      ₹{projectStats.avgProfitMargin.toFixed(1)}%
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Average Profit Margin
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="text-2xl font-bold text-blue-600">
                      {projectStats.onTimeProjects}/{projectStats.totalProjects}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Projects On Time
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="text-2xl font-bold text-purple-600">
                      {projectStats.averageProgress}%
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Average Progress
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Project Modal */}
        <Dialog
          open={showCreateProjectModal}
          onOpenChange={setShowCreateProjectModal}
        >
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary/20 to-construction-500/20 rounded-lg">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="text-primary"
                    size="sm"
                  />
                </div>
                <DialogTitle className="text-2xl font-bold gradient-text">
                  Create New Project
                </DialogTitle>
              </div>
              <p className="text-muted-foreground">
                Start a new Construction, Real Estate, Sales or Marketing
                project with comprehensive planning
              </p>
            </DialogHeader>

            <form className="space-y-6 mt-6">
              {/* Basic Information */}
              <Card className="hover-lift animate-fadeInUp">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Building2}
                      animation="float"
                      className="text-primary"
                      size="sm"
                    />
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="projectName"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <AnimatedIcon
                          icon={Building2}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        Project Name
                      </Label>
                      <Input
                        id="projectName"
                        placeholder="Enter project name"
                        className="hover-lift"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="projectType"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <AnimatedIcon
                          icon={Flag}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        Project Type
                      </Label>
                      <Select>
                        <SelectTrigger className="hover-lift">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="construction">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              Construction
                            </div>
                          </SelectItem>
                          <SelectItem value="real-estate">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-blue-500" />
                              Real Estate
                            </div>
                          </SelectItem>
                          <SelectItem value="marketing">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-green-500" />
                              Marketing
                            </div>
                          </SelectItem>
                          <SelectItem value="sales">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-purple-500" />
                              Sales
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team & Client Information */}
              <Card className="hover-lift animate-fadeInUp">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Users}
                      animation="float"
                      className="text-primary"
                      size="sm"
                    />
                    <CardTitle className="text-lg">
                      Team & Client Information
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="client"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <AnimatedIcon
                          icon={Users}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        Client
                      </Label>
                      <Select>
                        <SelectTrigger className="hover-lift">
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CL001">
                            <div className="flex items-center gap-2">
                              <AnimatedIcon
                                icon={Building2}
                                size="sm"
                                className="text-primary opacity-70"
                              />
                              Sunrise Developers Ltd
                            </div>
                          </SelectItem>
                          <SelectItem value="CL002">
                            <div className="flex items-center gap-2">
                              <AnimatedIcon
                                icon={Building2}
                                size="sm"
                                className="text-primary opacity-70"
                              />
                              Metro Properties Pvt Ltd
                            </div>
                          </SelectItem>
                          <SelectItem value="CL003">
                            <div className="flex items-center gap-2">
                              <AnimatedIcon
                                icon={Building2}
                                size="sm"
                                className="text-primary opacity-70"
                              />
                              TechFlow Solutions
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="manager"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <AnimatedIcon
                          icon={UserCheck}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        Project Manager
                      </Label>
                      <Select>
                        <SelectTrigger className="hover-lift">
                          <SelectValue placeholder="Assign manager" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EMP001">
                            <div className="flex items-center gap-2">
                              <AnimatedIcon
                                icon={UserCheck}
                                size="sm"
                                className="text-primary opacity-70"
                              />
                              Rajesh Kumar
                            </div>
                          </SelectItem>
                          <SelectItem value="EMP045">
                            <div className="flex items-center gap-2">
                              <AnimatedIcon
                                icon={UserCheck}
                                size="sm"
                                className="text-primary opacity-70"
                              />
                              Sanjay Patel
                            </div>
                          </SelectItem>
                          <SelectItem value="EMP078">
                            <div className="flex items-center gap-2">
                              <AnimatedIcon
                                icon={UserCheck}
                                size="sm"
                                className="text-primary opacity-70"
                              />
                              Anita Joshi
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card className="hover-lift animate-fadeInUp">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Settings}
                      animation="float"
                      className="text-primary"
                      size="sm"
                    />
                    <CardTitle className="text-lg">Project Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <AnimatedIcon
                        icon={MessageSquare}
                        size="sm"
                        className="text-primary opacity-70"
                      />
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Project description and objectives"
                      className="hover-lift"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label
                        htmlFor="budget"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <AnimatedIcon
                          icon={DollarSign}
                          size="sm"
                          className="text-green-600 opacity-70"
                        />
                        Budget (₹)
                      </Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="0"
                        className="hover-lift"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="startDate"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <AnimatedIcon
                          icon={Calendar}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        Start Date
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        className="hover-lift"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="endDate"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <AnimatedIcon
                          icon={Flag}
                          size="sm"
                          className="text-primary opacity-70"
                        />
                        End Date
                      </Label>
                      <Input id="endDate" type="date" className="hover-lift" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateProjectModal(false)}
                  className="hover-lift"
                >
                  <AnimatedIcon icon={Trash2} size="sm" className="mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
                >
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Create Project
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Task Modal */}
        <Dialog open={showTaskModal} onOpenChange={setShowTaskModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task for project execution
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taskTitle">Task Title</Label>
                <Input id="taskTitle" placeholder="Enter task title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskProject">Project</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
                      <SelectItem value="priya">Priya Sharma</SelectItem>
                      <SelectItem value="sanjay">Sanjay Patel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Set priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskDescription">Description</Label>
                <Textarea
                  id="taskDescription"
                  placeholder="Task description and requirements"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowTaskModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Task</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Resource Modal */}
        <Dialog open={showResourceModal} onOpenChange={setShowResourceModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Allocate Resource</DialogTitle>
              <DialogDescription>
                Assign team members or equipment to projects
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="resourceType">Resource Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="human">Team Member</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="material">Material</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resourceProject">Project</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resource">Resource/Person</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select resource" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rajesh">
                      Rajesh Kumar - Project Manager
                    </SelectItem>
                    <SelectItem value="priya">
                      Priya Sharma - Site Engineer
                    </SelectItem>
                    <SelectItem value="excavator">Excavator CAT 320</SelectItem>
                    <SelectItem value="crane">Tower Crane</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="allocation">Allocation %</Label>
                  <Input
                    id="allocation"
                    type="number"
                    placeholder="100"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost (₹)</Label>
                  <Input id="cost" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="allocStartDate">Start Date</Label>
                  <Input id="allocStartDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allocEndDate">End Date</Label>
                  <Input id="allocEndDate" type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowResourceModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Allocate Resource</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Project Modal */}
        <Dialog open={isEditProjectOpen} onOpenChange={setIsEditProjectOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {editingProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Edit Project - {editingProject.name}
                  </DialogTitle>
                  <DialogDescription>
                    Modify project details, planning, and configuration
                  </DialogDescription>
                </DialogHeader>

                <Tabs
                  value={`step${currentEditStep}`}
                  onValueChange={(value) =>
                    setCurrentEditStep(parseInt(value.replace("step", "")))
                  }
                >
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="step1">Basic Info</TabsTrigger>
                    <TabsTrigger value="step2">Planning</TabsTrigger>
                    <TabsTrigger value="step3">Team & Resources</TabsTrigger>
                    <TabsTrigger value="step4">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="step1" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input
                          id="projectName"
                          defaultValue={editingProject.name}
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectType">Project Type</Label>
                        <Select defaultValue={editingProject.type}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Construction">
                              Construction
                            </SelectItem>
                            <SelectItem value="Infrastructure">
                              Infrastructure
                            </SelectItem>
                            <SelectItem value="Commercial">
                              Commercial
                            </SelectItem>
                            <SelectItem value="Residential">
                              Residential
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="projectDescription">Description</Label>
                      <Textarea
                        id="projectDescription"
                        defaultValue={editingProject.description}
                        placeholder="Project description..."
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <Label htmlFor="projectBudget">Budget</Label>
                        <Input
                          id="projectBudget"
                          type="number"
                          defaultValue={editingProject.budget}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectStartDate">Start Date</Label>
                        <Input
                          id="projectStartDate"
                          type="date"
                          defaultValue={editingProject.startDate}
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectEndDate">End Date</Label>
                        <Input
                          id="projectEndDate"
                          type="date"
                          defaultValue={editingProject.endDate}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="projectStatus">Status</Label>
                        <Select defaultValue={editingProject.status}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Planning">Planning</SelectItem>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="projectPriority">Priority</Label>
                        <Select defaultValue={editingProject.priority}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="step2" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Project Milestones
                      </h3>
                      <Button
                        size="sm"
                        onClick={() => {
                          setEditingMilestone({
                            projectId: editingProject.id,
                            name: "",
                            status: "Pending",
                            date: "",
                            progress: 0,
                          });
                          setIsMilestoneModalOpen(true);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Milestone
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {editingProject.milestones?.map(
                        (milestone: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">
                                  {milestone.name}
                                </h4>
                                <Badge
                                  variant={
                                    milestone.status === "Completed"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {milestone.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Due: {milestone.date}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={milestone.progress}
                                className="w-20"
                              />
                              <span className="text-sm">
                                {milestone.progress}%
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingMilestone({
                                    ...milestone,
                                    projectId: editingProject.id,
                                    index,
                                  });
                                  setIsMilestoneModalOpen(true);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold mb-3">
                        Dependencies
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>Foundation depends on Site Preparation</span>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>Structure depends on Foundation</span>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Dependency
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="step3" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Project Team
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {editingProject.team?.map((member: any) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-3 border rounded"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium">
                                {member.avatar}
                              </div>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {member.role}
                                </p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button size="sm" className="mt-3">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Team Member
                      </Button>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold mb-3">Resources</h3>
                      <div className="space-y-2">
                        {editingProject.resources?.map(
                          (resource: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 border rounded"
                            >
                              <div>
                                <span className="font-medium">
                                  {resource.name}
                                </span>
                                <span className="text-sm text-muted-foreground ml-2">
                                  ({resource.quantity})
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={
                                    resource.status === "Active"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {resource.status}
                                </Badge>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                      <Button size="sm" className="mt-3">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Resource
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="step4" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Project Settings
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Get notified about project updates
                            </p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Auto Progress Updates</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically update progress based on tasks
                            </p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Risk Monitoring</Label>
                            <p className="text-sm text-muted-foreground">
                              Enable automated risk detection
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold mb-3">
                        Multi-Tenant Settings
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <Label>Tenant Access</Label>
                          <Select defaultValue={selectedTenant}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tenant_buildcorp">
                                BuildCorp Only
                              </SelectItem>
                              <SelectItem value="tenant_techcorp">
                                TechCorp Only
                              </SelectItem>
                              <SelectItem value="tenant_greencorp">
                                GreenCorp Only
                              </SelectItem>
                              <SelectItem value="shared">
                                Shared Access
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Cross-Tenant Visibility</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow other tenants to view this project
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditProjectOpen(false);
                      setEditingProject(null);
                      setCurrentEditStep(1);
                    }}
                  >
                    Cancel
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const notification = document.createElement("div");
                        notification.className =
                          "fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-md shadow-lg z-50";
                        notification.innerHTML = "💾 Project saved as draft";
                        document.body.appendChild(notification);
                        setTimeout(() => notification.remove(), 3000);
                      }}
                    >
                      Save Draft
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditProjectOpen(false);
                        setEditingProject(null);
                        setCurrentEditStep(1);
                        const notification = document.createElement("div");
                        notification.className =
                          "fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50";
                        notification.innerHTML =
                          "✅ Project updated successfully!";
                        document.body.appendChild(notification);
                        setTimeout(() => notification.remove(), 3000);
                      }}
                    >
                      Update Project
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Milestone Modal */}
        <Dialog
          open={isMilestoneModalOpen}
          onOpenChange={setIsMilestoneModalOpen}
        >
          <DialogContent className="max-w-2xl">
            {editingMilestone && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5" />
                    {editingMilestone.name
                      ? "Edit Milestone"
                      : "Add New Milestone"}
                  </DialogTitle>
                  <DialogDescription>
                    Configure milestone details and progress tracking
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="milestoneName">Milestone Name</Label>
                    <Input
                      id="milestoneName"
                      defaultValue={editingMilestone.name}
                      placeholder="Enter milestone name"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="milestoneStatus">Status</Label>
                      <Select defaultValue={editingMilestone.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Delayed">Delayed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="milestoneDate">Due Date</Label>
                      <Input
                        id="milestoneDate"
                        type="date"
                        defaultValue={editingMilestone.date}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="milestoneProgress">Progress (%)</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="milestoneProgress"
                        type="number"
                        min="0"
                        max="100"
                        defaultValue={editingMilestone.progress}
                        className="w-24"
                      />
                      <Progress
                        value={editingMilestone.progress}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="milestoneDescription">Description</Label>
                    <Textarea
                      id="milestoneDescription"
                      placeholder="Milestone description and requirements..."
                    />
                  </div>

                  <div>
                    <Label>Dependencies</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="dep1" />
                        <label htmlFor="dep1" className="text-sm">
                          Depends on previous milestone
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="dep2" />
                        <label htmlFor="dep2" className="text-sm">
                          Requires external approval
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsMilestoneModalOpen(false);
                      setEditingMilestone(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setIsMilestoneModalOpen(false);
                      setEditingMilestone(null);
                      const notification = document.createElement("div");
                      notification.className =
                        "fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50";
                      notification.innerHTML = editingMilestone.name
                        ? "✅ Milestone updated!"
                        : "✅ Milestone added!";
                      document.body.appendChild(notification);
                      setTimeout(() => notification.remove(), 3000);
                    }}
                  >
                    {editingMilestone.name
                      ? "Update Milestone"
                      : "Add Milestone"}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Task Modal */}
        <Dialog
          open={isTaskEditModalOpen}
          onOpenChange={setIsTaskEditModalOpen}
        >
          <DialogContent className="max-w-3xl">
            {editingTask && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Edit Task - {editingTask.title}
                  </DialogTitle>
                  <DialogDescription>
                    Modify task details, assignments, and progress
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Task Details</TabsTrigger>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <div>
                      <Label htmlFor="taskTitle">Task Title</Label>
                      <Input
                        id="taskTitle"
                        defaultValue={editingTask.title}
                        placeholder="Enter task title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="taskDescription">Description</Label>
                      <Textarea
                        id="taskDescription"
                        defaultValue={editingTask.description}
                        placeholder="Task description..."
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="taskAssignee">Assignee</Label>
                        <Select defaultValue={editingTask.assignee}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Rajesh Kumar">
                              Rajesh Kumar
                            </SelectItem>
                            <SelectItem value="Priya Sharma">
                              Priya Sharma
                            </SelectItem>
                            <SelectItem value="Amit Singh">
                              Amit Singh
                            </SelectItem>
                            <SelectItem value="Neha Gupta">
                              Neha Gupta
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="taskStatus">Status</Label>
                        <Select defaultValue={editingTask.status}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Review">Review</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Blocked">Blocked</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="taskPriority">Priority</Label>
                        <Select defaultValue={editingTask.priority}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="taskDueDate">Due Date</Label>
                        <Input
                          id="taskDueDate"
                          type="date"
                          defaultValue={editingTask.dueDate}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="progress" className="space-y-4">
                    <div>
                      <Label htmlFor="taskProgress">Progress (%)</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="taskProgress"
                          type="number"
                          min="0"
                          max="100"
                          defaultValue={editingTask.progress}
                          className="w-24"
                        />
                        <Progress
                          value={editingTask.progress}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Time Tracking</Label>
                      <div className="grid gap-3 md:grid-cols-3 mt-2">
                        <div>
                          <Label className="text-sm">Estimated Hours</Label>
                          <Input type="number" defaultValue="8" />
                        </div>
                        <div>
                          <Label className="text-sm">Actual Hours</Label>
                          <Input type="number" defaultValue="6" />
                        </div>
                        <div>
                          <Label className="text-sm">Remaining Hours</Label>
                          <Input type="number" defaultValue="2" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Subtasks</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">
                            Setup development environment
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Code review completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span className="text-sm">
                            Testing and validation
                          </span>
                        </div>
                      </div>
                      <Button size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Subtask
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="comments" className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">Rajesh Kumar</span>
                          <span className="text-xs text-muted-foreground">
                            2 hours ago
                          </span>
                        </div>
                        <p className="text-sm">
                          Task is progressing well. Need to coordinate with the
                          design team for final approval.
                        </p>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">Priya Sharma</span>
                          <span className="text-xs text-muted-foreground">
                            1 day ago
                          </span>
                        </div>
                        <p className="text-sm">
                          Started working on this task. Will update progress by
                          end of day.
                        </p>
                      </div>
                    </div>

                    <div>
                      <Textarea placeholder="Add a comment..." />
                      <Button size="sm" className="mt-2">
                        Add Comment
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsTaskEditModalOpen(false);
                      setEditingTask(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setIsTaskEditModalOpen(false);
                      setEditingTask(null);
                      const notification = document.createElement("div");
                      notification.className =
                        "fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50";
                      notification.innerHTML = "✅ Task updated successfully!";
                      document.body.appendChild(notification);
                      setTimeout(() => notification.remove(), 3000);
                    }}
                  >
                    Update Task
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Timeline Modal */}
        <Dialog
          open={isTimelineModalOpen}
          onOpenChange={setIsTimelineModalOpen}
        >
          <DialogContent className="max-w-4xl w-[90vw] h-[85vh] overflow-y-auto">
            {editingTimeline && (
              <>
                <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
                  <DialogTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Edit Project Timeline - {editingTimeline.name}
                  </DialogTitle>
                  <DialogDescription>
                    Modify project schedule, deadlines, and timeline
                    dependencies
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  <Tabs defaultValue="schedule" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="schedule">Schedule</TabsTrigger>
                      <TabsTrigger value="dependencies">
                        Dependencies
                      </TabsTrigger>
                      <TabsTrigger value="resources">
                        Resource Timeline
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent
                      value="schedule"
                      className="space-y-6 max-h-[60vh] overflow-y-auto pr-2"
                    >
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <Label htmlFor="timelineStartDate">Start Date</Label>
                          <Input
                            id="timelineStartDate"
                            type="date"
                            defaultValue={editingTimeline.startDate}
                          />
                        </div>
                        <div>
                          <Label htmlFor="timelineEndDate">End Date</Label>
                          <Input
                            id="timelineEndDate"
                            type="date"
                            defaultValue={editingTimeline.endDate}
                          />
                        </div>
                        <div>
                          <Label htmlFor="timelineDuration">Duration</Label>
                          <Input
                            id="timelineDuration"
                            defaultValue={editingTimeline.estimatedDuration}
                            placeholder="e.g., 6 months"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Phase Timeline</Label>
                        <div className="space-y-3 mt-2">
                          {editingTimeline.milestones?.map(
                            (milestone: any, index: number) => (
                              <div
                                key={index}
                                className="grid gap-3 grid-cols-1 md:grid-cols-4 items-end p-3 border rounded"
                              >
                                <div className="space-y-1">
                                  <Label className="text-sm font-medium">
                                    Phase
                                  </Label>
                                  <Input
                                    defaultValue={milestone.name}
                                    className="w-full"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-sm font-medium">
                                    Start Date
                                  </Label>
                                  <Input type="date" className="w-full" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-sm font-medium">
                                    End Date
                                  </Label>
                                  <Input
                                    type="date"
                                    defaultValue={milestone.date}
                                    className="w-full"
                                  />
                                </div>
                                <div className="flex items-center gap-2 md:justify-end">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      const notification =
                                        document.createElement("div");
                                      notification.className =
                                        "fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-md shadow-lg z-50";
                                      notification.innerHTML =
                                        "✏️ Phase editing opened";
                                      document.body.appendChild(notification);
                                      setTimeout(
                                        () => notification.remove(),
                                        3000,
                                      );
                                    }}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      const notification =
                                        document.createElement("div");
                                      notification.className =
                                        "fixed top-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg z-50";
                                      notification.innerHTML =
                                        "🗑️ Phase deleted";
                                      document.body.appendChild(notification);
                                      setTimeout(
                                        () => notification.remove(),
                                        3000,
                                      );
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                        <Button size="sm" className="mt-3">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Phase
                        </Button>
                      </div>

                      <div>
                        <Label>Timeline Adjustments</Label>
                        <div className="grid gap-3 md:grid-cols-2 mt-2">
                          <div>
                            <Label className="text-sm">Buffer Time (%)</Label>
                            <Input type="number" defaultValue="10" />
                          </div>
                          <div>
                            <Label className="text-sm">Working Days/Week</Label>
                            <Input type="number" defaultValue="5" />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="dependencies"
                      className="space-y-6 max-h-[60vh] overflow-y-auto pr-2"
                    >
                      <div>
                        <Label>Task Dependencies</Label>
                        <div className="space-y-3 mt-2">
                          <div className="flex items-center justify-between p-3 border rounded">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                              <span>Foundation → Structure</span>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="outline">Finish-to-Start</Badge>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span>Structure → Finishing</span>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="outline">Finish-to-Start</Badge>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="mt-3">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Dependency
                        </Button>
                      </div>

                      <div>
                        <Label>Critical Path</Label>
                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="font-medium text-red-800">
                              Critical Path Identified
                            </span>
                          </div>
                          <p className="text-sm text-red-700">
                            Site Preparation → Foundation → Structure → Handover
                          </p>
                          <p className="text-xs text-red-600 mt-1">
                            Any delay in these tasks will delay the entire
                            project
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="resources"
                      className="space-y-6 max-h-[60vh] overflow-y-auto pr-2"
                    >
                      <div>
                        <Label>Resource Allocation Timeline</Label>
                        <div className="space-y-3 mt-2">
                          {editingTimeline.resources?.map(
                            (resource: any, index: number) => (
                              <div
                                key={index}
                                className="grid gap-3 grid-cols-1 md:grid-cols-5 items-end p-3 border rounded"
                              >
                                <div className="space-y-1">
                                  <Label className="text-sm font-medium">
                                    Resource
                                  </Label>
                                  <Input
                                    defaultValue={resource.name}
                                    className="w-full"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-sm font-medium">
                                    Start Date
                                  </Label>
                                  <Input type="date" className="w-full" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-sm font-medium">
                                    End Date
                                  </Label>
                                  <Input type="date" className="w-full" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-sm font-medium">
                                    Allocation %
                                  </Label>
                                  <Input
                                    type="number"
                                    defaultValue="100"
                                    className="w-full"
                                  />
                                </div>
                                <div className="flex gap-1 md:justify-end">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      const notification =
                                        document.createElement("div");
                                      notification.className =
                                        "fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-md shadow-lg z-50";
                                      notification.innerHTML =
                                        "✏️ Resource editing opened";
                                      document.body.appendChild(notification);
                                      setTimeout(
                                        () => notification.remove(),
                                        3000,
                                      );
                                    }}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      const notification =
                                        document.createElement("div");
                                      notification.className =
                                        "fixed top-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg z-50";
                                      notification.innerHTML =
                                        "🗑️ Resource removed";
                                      document.body.appendChild(notification);
                                      setTimeout(
                                        () => notification.remove(),
                                        3000,
                                      );
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                        <Button size="sm" className="mt-3">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Resource
                        </Button>
                      </div>

                      <div>
                        <Label>Resource Conflicts</Label>
                        <div className="mt-2 space-y-2">
                          <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                            <span className="font-medium text-yellow-800">
                              Warning:
                            </span>
                            <span className="text-yellow-700">
                              {" "}
                              Excavator over-allocated in Week 3 (150%)
                            </span>
                          </div>
                          <div className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                            <span className="font-medium text-green-800">
                              Success:
                            </span>
                            <span className="text-green-700">
                              {" "}
                              All other resources properly allocated
                            </span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t bg-white sticky bottom-0">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsTimelineModalOpen(false);
                      setEditingTimeline(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setIsTimelineModalOpen(false);
                      setEditingTimeline(null);
                      const notification = document.createElement("div");
                      notification.className =
                        "fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50";
                      notification.innerHTML =
                        "✅ Timeline updated successfully!";
                      document.body.appendChild(notification);
                      setTimeout(() => notification.remove(), 3000);
                    }}
                  >
                    Update Timeline
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
