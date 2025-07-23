import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
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
  ArrowLeft,
  Target,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  PieChart,
  BarChart3,
  LineChart,
  Star,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Pause,
  Play,
  Eye,
  Edit,
  Trash2,
  Share2,
  Copy,
  ExternalLink,
  Settings,
  UserPlus,
  Home,
  MapPin,
  Tag,
  Bookmark,
  Heart,
  Zap,
  Award,
  Gift,
  Handshake,
  CreditCard,
  Calculator,
  Calendar as CalendarIcon,
  Timer,
  Activity,
  Bell,
  Flag,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Percent,
  IndianRupee,
  Grid,
} from "lucide-react";
import {
  AnimatedIcon,
  PulsingDot,
  LoadingSpinner,
  GlowingOrb,
} from "@/components/ui/animated-icons";

// Deal Management interfaces
interface Deal {
  id: string;
  name: string;
  description?: string;

  // Customer Information
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  // Property Information
  propertyIds: string[];
  propertyNames: string[];
  propertyType: string;

  // Deal Value & Financial
  dealValue: number;
  bookingAmount: number;
  balanceAmount: number;
  discountAmount: number;
  discountPercentage: number;
  finalAmount: number;

  // Deal Stage & Status
  stage:
    | "Lead"
    | "Qualified"
    | "Site Visit"
    | "Proposal"
    | "Negotiation"
    | "Booking"
    | "Documentation"
    | "Handover"
    | "Closed Won"
    | "Closed Lost";
  status: "Active" | "On Hold" | "Cancelled" | "Completed";
  probability: number; // 0-100%

  // Timeline
  createdAt: string;
  updatedAt: string;
  expectedCloseDate: string;
  actualCloseDate?: string;

  // Assignment
  assignedAgent: string;
  assignedTeam?: string;

  // Communication & Activities
  lastActivity: string;
  nextFollowUp?: string;
  activitiesCount: number;
  notesCount: number;

  // Deal Source
  source: string;
  campaign?: string;
  referredBy?: string;

  // Payment Information
  paymentPlan: string;
  paymentStatus: "Pending" | "Partial" | "Completed" | "Overdue";
  totalPaid: number;
  pendingAmount: number;
  nextPaymentDate?: string;
  nextPaymentAmount?: number;

  // Documents
  documents: DealDocument[];

  // Tags & Priority
  tags: string[];
  priority: "Low" | "Medium" | "High" | "Critical";

  // Competition & Risk
  competitorInfo?: string;
  riskFactors: string[];
  lossReason?: string;

  // Additional Fields
  customerFeedback?: string;
  internalNotes: string[];
}

interface DealDocument {
  id: string;
  name: string;
  type: "Proposal" | "Contract" | "Agreement" | "Payment Receipt" | "Other";
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

interface DealActivity {
  id: string;
  dealId: string;
  type:
    | "Call"
    | "Email"
    | "Meeting"
    | "Site Visit"
    | "Proposal Sent"
    | "Payment"
    | "Note";
  description: string;
  createdAt: string;
  createdBy: string;
  outcome?: string;
  nextAction?: string;
}

interface DealStage {
  name: string;
  probability: number;
  color: string;
  description: string;
  averageDuration: number; // days
  conversionRate: number; // percentage
}

export default function DealManagement() {
  const [activeTab, setActiveTab] = useState("pipeline");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [agentFilter, setAgentFilter] = useState("All");
  const [showAddDealModal, setShowAddDealModal] = useState(false);
  const [showDealDetails, setShowDealDetails] = useState(false);
  const [viewMode, setViewMode] = useState<"pipeline" | "table" | "kanban">(
    "pipeline",
  );

  const {
    register: registerDeal,
    handleSubmit: handleSubmitDeal,
    reset: resetDeal,
    control: controlDeal,
    formState: { errors: errorsDeal, isSubmitting: isSubmittingDeal },
  } = useForm<Partial<Deal>>();

  // Deal stages configuration
  const dealStages: DealStage[] = [
    {
      name: "Lead",
      probability: 10,
      color: "bg-gray-500",
      description: "Initial inquiry or lead generation",
      averageDuration: 3,
      conversionRate: 15,
    },
    {
      name: "Qualified",
      probability: 25,
      color: "bg-blue-500",
      description: "Lead qualification completed",
      averageDuration: 5,
      conversionRate: 40,
    },
    {
      name: "Site Visit",
      probability: 40,
      color: "bg-yellow-500",
      description: "Customer visited the property",
      averageDuration: 7,
      conversionRate: 55,
    },
    {
      name: "Proposal",
      probability: 60,
      color: "bg-orange-500",
      description: "Proposal or quote sent",
      averageDuration: 10,
      conversionRate: 70,
    },
    {
      name: "Negotiation",
      probability: 75,
      color: "bg-purple-500",
      description: "Price negotiation in progress",
      averageDuration: 8,
      conversionRate: 85,
    },
    {
      name: "Booking",
      probability: 90,
      color: "bg-green-500",
      description: "Booking amount paid",
      averageDuration: 5,
      conversionRate: 95,
    },
    {
      name: "Documentation",
      probability: 95,
      color: "bg-teal-500",
      description: "Legal documentation in progress",
      averageDuration: 15,
      conversionRate: 98,
    },
    {
      name: "Closed Won",
      probability: 100,
      color: "bg-emerald-500",
      description: "Deal successfully closed",
      averageDuration: 0,
      conversionRate: 100,
    },
  ];

  // Sample deals data
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: "1",
      name: "Sharma Family - 3BHK Premium Deal",
      description: "Premium 3BHK apartment for growing family",
      customerId: "cust1",
      customerName: "Rajesh Kumar Sharma",
      customerEmail: "rajesh.sharma@email.com",
      customerPhone: "+91 98765 43210",
      propertyIds: ["prop1"],
      propertyNames: ["Skyline Residency A-1201"],
      propertyType: "3BHK",
      dealValue: 18500000, // ₹1.85 Cr
      bookingAmount: 1850000, // 10%
      balanceAmount: 16650000,
      discountAmount: 925000, // 5% Early bird
      discountPercentage: 5,
      finalAmount: 17575000,
      stage: "Negotiation",
      status: "Active",
      probability: 75,
      createdAt: "2024-02-15",
      updatedAt: "2024-03-15",
      expectedCloseDate: "2024-04-30",
      assignedAgent: "Priya Sharma",
      assignedTeam: "Premium Sales",
      lastActivity: "2024-03-14",
      nextFollowUp: "2024-03-18",
      activitiesCount: 12,
      notesCount: 5,
      source: "MagicBricks Portal",
      paymentPlan: "Construction Linked",
      paymentStatus: "Pending",
      totalPaid: 1850000,
      pendingAmount: 15725000,
      nextPaymentDate: "2024-04-15",
      nextPaymentAmount: 2500000,
      documents: [
        {
          id: "doc1",
          name: "Initial Proposal.pdf",
          type: "Proposal",
          url: "/docs/proposal-1.pdf",
          uploadedAt: "2024-03-10",
          uploadedBy: "Priya Sharma",
        },
        {
          id: "doc2",
          name: "Price Negotiation Sheet.xlsx",
          type: "Other",
          url: "/docs/negotiation-1.xlsx",
          uploadedAt: "2024-03-14",
          uploadedBy: "Priya Sharma",
        },
      ],
      tags: ["Hot Deal", "Family Purchase", "Premium Segment", "Early Bird"],
      priority: "High",
      riskFactors: ["Budget concerns", "Timeline pressure"],
      internalNotes: [
        "Customer very interested, wife needs final approval",
        "Flexible on possession date, firm on pricing",
        "Comparing with 2 other projects",
      ],
    },
    {
      id: "2",
      name: "Corporate Bulk Purchase - Elite Towers",
      description: "Bulk purchase for employee housing",
      customerId: "cust2",
      customerName: "TechCorp Solutions",
      customerEmail: "procurement@techcorp.com",
      customerPhone: "+91 99876 54321",
      propertyIds: ["prop2", "prop3", "prop4"],
      propertyNames: [
        "Elite Towers C-1505",
        "Elite Towers C-1506",
        "Elite Towers C-1507",
      ],
      propertyType: "4BHK",
      dealValue: 97500000, // ₹9.75 Cr (3 units)
      bookingAmount: 9750000, // 10%
      balanceAmount: 87750000,
      discountAmount: 6825000, // 7% bulk discount
      discountPercentage: 7,
      finalAmount: 90675000,
      stage: "Proposal",
      status: "Active",
      probability: 60,
      createdAt: "2024-01-20",
      updatedAt: "2024-03-12",
      expectedCloseDate: "2024-06-30",
      assignedAgent: "Anjali Patel",
      assignedTeam: "Corporate Sales",
      lastActivity: "2024-03-12",
      nextFollowUp: "2024-03-20",
      activitiesCount: 8,
      notesCount: 3,
      source: "Direct Business Development",
      campaign: "Corporate Housing Program",
      paymentPlan: "Bulk Payment Schedule",
      paymentStatus: "Pending",
      totalPaid: 0,
      pendingAmount: 90675000,
      nextPaymentDate: "2024-04-01",
      nextPaymentAmount: 9750000,
      documents: [
        {
          id: "doc3",
          name: "Corporate Proposal - 3 Units.pdf",
          type: "Proposal",
          url: "/docs/corporate-proposal.pdf",
          uploadedAt: "2024-03-05",
          uploadedBy: "Anjali Patel",
        },
      ],
      tags: ["Corporate Deal", "Bulk Purchase", "High Value", "B2B"],
      priority: "Critical",
      competitorInfo: "Competing with 2 other luxury projects",
      riskFactors: ["Long approval process", "Budget approvals pending"],
      internalNotes: [
        "Decision pending with board approval",
        "Strong relationship with HR head",
        "Timeline flexibility available",
      ],
    },
    {
      id: "3",
      name: "Patel Investment - Golden Heights",
      description: "Investment property for rental income",
      customerId: "cust3",
      customerName: "Anita Patel",
      customerEmail: "anita.patel@email.com",
      customerPhone: "+91 97654 32109",
      propertyIds: ["prop5"],
      propertyNames: ["Golden Heights B-0804"],
      propertyType: "2BHK",
      dealValue: 12500000, // ₹1.25 Cr
      bookingAmount: 1250000, // 10%
      balanceAmount: 11250000,
      discountAmount: 375000, // 3% investor discount
      discountPercentage: 3,
      finalAmount: 12125000,
      stage: "Site Visit",
      status: "Active",
      probability: 40,
      createdAt: "2024-03-01",
      updatedAt: "2024-03-15",
      expectedCloseDate: "2024-05-15",
      assignedAgent: "Rajesh Kumar",
      assignedTeam: "Investment Sales",
      lastActivity: "2024-03-15",
      nextFollowUp: "2024-03-17",
      activitiesCount: 6,
      notesCount: 2,
      source: "Referral",
      referredBy: "Existing Customer",
      paymentPlan: "Investor Special Plan",
      paymentStatus: "Pending",
      totalPaid: 0,
      pendingAmount: 12125000,
      documents: [],
      tags: ["Investment", "Referral", "Cash Buyer", "ROI Focused"],
      priority: "Medium",
      riskFactors: ["Market timing concerns"],
      internalNotes: [
        "Looking for good rental yield",
        "Experienced property investor",
        "May consider multiple units",
      ],
    },
    {
      id: "4",
      name: "First-time Buyer - Compact 2BHK",
      description: "Young couple's first home purchase",
      customerId: "cust4",
      customerName: "Ravi & Sneha Gupta",
      customerEmail: "ravi.gupta@email.com",
      customerPhone: "+91 88776 65432",
      propertyIds: ["prop6"],
      propertyNames: ["Golden Heights B-0603"],
      propertyType: "2BHK",
      dealValue: 11200000, // ₹1.12 Cr
      bookingAmount: 1120000, // 10%
      balanceAmount: 10080000,
      discountAmount: 0,
      discountPercentage: 0,
      finalAmount: 11200000,
      stage: "Qualified",
      status: "Active",
      probability: 25,
      createdAt: "2024-03-08",
      updatedAt: "2024-03-14",
      expectedCloseDate: "2024-07-31",
      assignedAgent: "Meera Singh",
      assignedTeam: "First-time Buyers",
      lastActivity: "2024-03-14",
      nextFollowUp: "2024-03-16",
      activitiesCount: 4,
      notesCount: 1,
      source: "Social Media Campaign",
      campaign: "First Home Festival",
      paymentPlan: "Home Loan Linked",
      paymentStatus: "Pending",
      totalPaid: 0,
      pendingAmount: 11200000,
      documents: [],
      tags: ["First Time Buyer", "Young Couple", "Home Loan", "Social Media"],
      priority: "Medium",
      riskFactors: ["Home loan approval pending", "Budget constraints"],
      internalNotes: [
        "Very excited but cautious",
        "Home loan pre-approval in progress",
        "Looking for possession by Diwali",
      ],
    },
  ]);

  // Deal statistics
  const dealStats = {
    totalDeals: deals.length,
    totalValue: deals.reduce((sum, deal) => sum + deal.finalAmount, 0),
    activeDeals: deals.filter((deal) => deal.status === "Active").length,
    avgDealSize:
      deals.reduce((sum, deal) => sum + deal.finalAmount, 0) / deals.length,
    conversionRate: 23.5, // Mock data
    avgSalesCycle: 45, // days
  };

  // Handlers
  const handleAddDeal = async (data: Partial<Deal>) => {
    try {
      const newDeal: Deal = {
        id: Date.now().toString(),
        name: data.name || "",
        description: data.description,
        customerId: Date.now().toString(),
        customerName: data.customerName || "",
        customerEmail: data.customerEmail || "",
        customerPhone: data.customerPhone || "",
        propertyIds: [],
        propertyNames: [],
        propertyType: data.propertyType || "2BHK",
        dealValue: data.dealValue || 10000000,
        bookingAmount: Math.round((data.dealValue || 10000000) * 0.1),
        balanceAmount: Math.round((data.dealValue || 10000000) * 0.9),
        discountAmount: 0,
        discountPercentage: 0,
        finalAmount: data.dealValue || 10000000,
        stage: "Lead",
        status: "Active",
        probability: 10,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        expectedCloseDate: data.expectedCloseDate || "",
        assignedAgent: data.assignedAgent || "Unassigned",
        lastActivity: new Date().toISOString().split("T")[0],
        activitiesCount: 0,
        notesCount: 0,
        source: data.source || "Direct",
        paymentPlan: "Standard",
        paymentStatus: "Pending",
        totalPaid: 0,
        pendingAmount: data.dealValue || 10000000,
        documents: [],
        tags: data.tags || [],
        priority: determineDealPriority(data.dealValue || 10000000),
        riskFactors: [],
        internalNotes: [],
      };

      setDeals((prev) => [newDeal, ...prev]);
      setShowAddDealModal(false);
      resetDeal();
      alert(`Deal "${newDeal.name}" created successfully!`);
    } catch (error) {
      console.error("Error adding deal:", error);
    }
  };

  const determineDealPriority = (
    value: number,
  ): "Low" | "Medium" | "High" | "Critical" => {
    if (value > 50000000) return "Critical"; // > ₹5 Cr
    if (value > 20000000) return "High"; // > ₹2 Cr
    if (value > 10000000) return "Medium"; // > ₹1 Cr
    return "Low";
  };

  const getStageColor = (stage: Deal["stage"]) => {
    const stageConfig = dealStages.find((s) => s.name === stage);
    return stageConfig?.color || "bg-gray-500";
  };

  const getStatusColor = (status: Deal["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Hold":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: Deal["priority"]) => {
    switch (priority) {
      case "Critical":
        return <Flag className="h-4 w-4 text-red-500" />;
      case "High":
        return <Flag className="h-4 w-4 text-orange-500" />;
      case "Medium":
        return <Flag className="h-4 w-4 text-yellow-500" />;
      case "Low":
        return <Flag className="h-4 w-4 text-green-500" />;
      default:
        return <Flag className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`;
    }
    return `₹${(amount / 100000).toFixed(0)}L`;
  };

  // Filter deals
  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "All" || deal.stage === stageFilter;
    const matchesAgent =
      agentFilter === "All" || deal.assignedAgent === agentFilter;
    return matchesSearch && matchesStage && matchesAgent;
  });

  // Group deals by stage for pipeline view
  const dealsByStage = dealStages.reduce(
    (acc, stage) => {
      acc[stage.name] = filteredDeals.filter(
        (deal) => deal.stage === stage.name,
      );
      return acc;
    },
    {} as Record<string, Deal[]>,
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/crm"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to CRM
                </Link>
              </Button>
            </div>
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
              Opportunity & Deal Management
            </h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Complete sales pipeline with deal tracking, property linking, and
              revenue forecasting
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <PulsingDot className="text-green-500" />
                {dealStats.activeDeals} Active Deals
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <DollarSign className="h-4 w-4 text-blue-500" />
                {formatCurrency(dealStats.totalValue)} Pipeline
              </Badge>
            </div>
            <Button
              onClick={() => setShowAddDealModal(true)}
              className="w-full sm:w-auto"
            >
              <AnimatedIcon icon={Plus} className="mr-2" />
              Add Deal
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger
              value="pipeline"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Target className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Pipeline</span>
              <span className="sm:hidden">Pipe</span>
            </TabsTrigger>
            <TabsTrigger
              value="deals"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Handshake className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">All Deals</span>
              <span className="sm:hidden">Deals</span>
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Activity className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Activities</span>
              <span className="sm:hidden">Act</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Analytics</span>
              <span className="lg:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger
              value="forecasting"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Forecasting</span>
              <span className="lg:hidden">Forecast</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Settings className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Settings</span>
              <span className="lg:hidden">Set</span>
            </TabsTrigger>
          </TabsList>

          {/* Pipeline Tab */}
          <TabsContent value="pipeline" className="space-y-6">
            {/* Pipeline Stats */}
            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {dealStats.totalDeals}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Total Deals
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {formatCurrency(dealStats.totalValue)}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Pipeline Value
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {formatCurrency(dealStats.avgDealSize)}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Avg Deal Size
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Percent className="h-6 w-6 lg:h-8 lg:w-8 text-orange-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {dealStats.conversionRate}%
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Conversion Rate
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-teal-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {dealStats.avgSalesCycle}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Avg Cycle (days)
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {dealStats.activeDeals}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Active Deals
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pipeline Filters */}
            <div className="flex flex-col gap-4 p-4 bg-white rounded-lg border lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deals by name or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:gap-4">
                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Stages</SelectItem>
                    {dealStages.map((stage) => (
                      <SelectItem key={stage.name} value={stage.name}>
                        {stage.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={agentFilter} onValueChange={setAgentFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Agents</SelectItem>
                    <SelectItem value="Priya Sharma">Priya Sharma</SelectItem>
                    <SelectItem value="Anjali Patel">Anjali Patel</SelectItem>
                    <SelectItem value="Rajesh Kumar">Rajesh Kumar</SelectItem>
                    <SelectItem value="Meera Singh">Meera Singh</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Pipeline View */}
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold">Sales Pipeline</h3>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "pipeline" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("pipeline")}
                    className="flex-1 sm:flex-none"
                  >
                    <BarChart3 className="mr-1 h-3 w-3" />
                    Pipeline
                  </Button>
                  <Button
                    variant={viewMode === "kanban" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("kanban")}
                    className="flex-1 sm:flex-none"
                  >
                    <Grid className="mr-1 h-3 w-3" />
                    Kanban
                  </Button>
                </div>
              </div>

              {/* Pipeline View */}
              {viewMode === "pipeline" && (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
                  {dealStages.slice(0, 7).map((stage) => {
                    const stageDeals = dealsByStage[stage.name] || [];
                    const stageValue = stageDeals.reduce(
                      (sum, deal) => sum + deal.finalAmount,
                      0,
                    );

                    return (
                      <Card
                        key={stage.name}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium truncate">
                              {stage.name}
                            </CardTitle>
                            <Badge
                              className={`${stage.color} text-white text-xs flex-shrink-0`}
                              style={{
                                backgroundColor: stage.color.replace("bg-", ""),
                              }}
                            >
                              {stage.probability}%
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="text-lg font-bold">
                              {stageDeals.length}
                            </div>
                            <div className="text-sm text-gray-600 truncate">
                              {formatCurrency(stageValue)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                          {stageDeals.map((deal) => (
                            <div
                              key={deal.id}
                              className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => {
                                setSelectedDeal(deal);
                                setShowDealDetails(true);
                              }}
                            >
                              <div className="space-y-2">
                                <div className="flex items-start justify-between">
                                  <h4 className="font-medium text-sm leading-tight line-clamp-2">
                                    {deal.name}
                                  </h4>
                                  {getPriorityIcon(deal.priority)}
                                </div>
                                <div className="text-sm text-gray-600 truncate">
                                  {deal.customerName}
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="font-bold text-green-600 text-sm">
                                    {formatCurrency(deal.finalAmount)}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {deal.probability}%
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {deal.propertyType}
                                  </Badge>
                                  <span className="text-xs text-gray-500 truncate">
                                    {deal.assignedAgent}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}

                          {stageDeals.length === 0 && (
                            <div className="text-center text-sm text-gray-500 py-4">
                              No deals in this stage
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Kanban View */}
              {viewMode === "kanban" && (
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {dealStages.slice(0, 7).map((stage) => {
                    const stageDeals = dealsByStage[stage.name] || [];
                    const stageValue = stageDeals.reduce(
                      (sum, deal) => sum + deal.finalAmount,
                      0,
                    );

                    return (
                      <div
                        key={stage.name}
                        className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4"
                      >
                        {/* Kanban Column Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${stage.color}`}
                            ></div>
                            <h3 className="font-semibold text-sm">
                              {stage.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {stageDeals.length}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500">
                            {stage.probability}%
                          </span>
                        </div>

                        {/* Stage Value */}
                        <div className="mb-4 p-2 bg-white rounded border">
                          <div className="text-sm text-gray-600">
                            Total Value
                          </div>
                          <div className="font-bold text-green-600">
                            {formatCurrency(stageValue)}
                          </div>
                        </div>

                        {/* Kanban Cards */}
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {stageDeals.map((deal) => (
                            <Card
                              key={deal.id}
                              className="cursor-pointer hover:shadow-md transition-shadow bg-white"
                              onClick={() => {
                                setSelectedDeal(deal);
                                setShowDealDetails(true);
                              }}
                            >
                              <CardContent className="p-3">
                                <div className="space-y-2">
                                  {/* Deal Title & Priority */}
                                  <div className="flex items-start justify-between">
                                    <h4 className="font-medium text-sm leading-tight line-clamp-2 flex-1">
                                      {deal.name}
                                    </h4>
                                    {getPriorityIcon(deal.priority)}
                                  </div>

                                  {/* Customer */}
                                  <div className="text-sm text-gray-600 truncate">
                                    {deal.customerName}
                                  </div>

                                  {/* Value & Probability */}
                                  <div className="flex items-center justify-between">
                                    <div className="font-bold text-green-600 text-sm">
                                      {formatCurrency(deal.finalAmount)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {deal.probability}%
                                    </div>
                                  </div>

                                  {/* Property Type */}
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {deal.propertyType}
                                    </Badge>
                                    <Building className="h-3 w-3 text-gray-400" />
                                  </div>

                                  {/* Agent & Timeline */}
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span className="truncate">
                                      {deal.assignedAgent}
                                    </span>
                                    <span>{deal.expectedCloseDate}</span>
                                  </div>

                                  {/* Tags */}
                                  {deal.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      {deal.tags
                                        .slice(0, 2)
                                        .map((tag, index) => (
                                          <Badge
                                            key={index}
                                            variant="secondary"
                                            className="text-xs"
                                          >
                                            {tag}
                                          </Badge>
                                        ))}
                                      {deal.tags.length > 2 && (
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          +{deal.tags.length - 2}
                                        </Badge>
                                      )}
                                    </div>
                                  )}

                                  {/* Quick Actions */}
                                  <div className="flex gap-1 pt-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="flex-1 text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle call action
                                      }}
                                    >
                                      <Phone className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="flex-1 text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle email action
                                      }}
                                    >
                                      <Mail className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="flex-1 text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle note action
                                      }}
                                    >
                                      <FileText className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}

                          {stageDeals.length === 0 && (
                            <div className="text-center text-sm text-gray-500 py-8 border-2 border-dashed border-gray-200 rounded-lg">
                              <div className="mb-2">
                                <Plus className="h-6 w-6 mx-auto text-gray-400" />
                              </div>
                              Drop deals here or add new ones
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* All Deals Tab */}
          <TabsContent value="deals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Deals</CardTitle>
                <CardDescription>
                  Complete list of deals with detailed information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mobile Cards View */}
                <div className="block lg:hidden space-y-4">
                  {filteredDeals.map((deal) => (
                    <Card key={deal.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-sm line-clamp-2">
                              {deal.name}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {deal.description}
                            </p>
                          </div>
                          {getPriorityIcon(deal.priority)}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500">Customer:</span>
                            <div className="font-medium truncate">
                              {deal.customerName}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Property:</span>
                            <div className="font-medium">
                              {deal.propertyType}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Value:</span>
                            <div className="font-bold text-green-600">
                              {formatCurrency(deal.finalAmount)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Agent:</span>
                            <div className="font-medium truncate">
                              {deal.assignedAgent}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge
                            className={`${getStageColor(deal.stage)} text-white text-xs`}
                          >
                            {deal.stage}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={deal.probability}
                              className="h-2 w-16"
                            />
                            <span className="text-xs">{deal.probability}%</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setSelectedDeal(deal);
                              setShowDealDetails(true);
                            }}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="outline">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Phone className="mr-2 h-4 w-4" />
                                Call Customer
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Building className="mr-2 h-4 w-4" />
                                Link Property
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Deal Name</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Property</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Probability</TableHead>
                        <TableHead>Agent</TableHead>
                        <TableHead>Expected Close</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDeals.map((deal) => (
                        <TableRow key={deal.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{deal.name}</div>
                              <div className="text-sm text-gray-500">
                                {deal.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {deal.customerName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {deal.customerEmail}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {deal.propertyType}
                              </div>
                              <div className="text-sm text-gray-500">
                                {deal.propertyNames[0] || "Not assigned"}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-bold text-green-600">
                                {formatCurrency(deal.finalAmount)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {deal.discountPercentage > 0 &&
                                  `${deal.discountPercentage}% off`}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${getStageColor(deal.stage)} text-white`}
                            >
                              {deal.stage}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={deal.probability}
                                className="h-2 w-16"
                              />
                              <span className="text-sm">
                                {deal.probability}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{deal.assignedAgent}</TableCell>
                          <TableCell>{deal.expectedCloseDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedDeal(deal);
                                  setShowDealDetails(true);
                                }}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call Customer
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send Email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Building className="mr-2 h-4 w-4" />
                                    Link Property
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Proposal
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Clone Deal
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Activity} animation="pulse" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>
                    Latest deal activities and customer interactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      id: "1",
                      type: "Call",
                      description: "Follow-up call with Rajesh Kumar Sharma",
                      deal: "Sharma Family - 3BHK Premium Deal",
                      agent: "Priya Sharma",
                      time: "2 hours ago",
                      outcome: "Positive response, negotiating price",
                    },
                    {
                      id: "2",
                      type: "Site Visit",
                      description: "Corporate team visited Elite Towers",
                      deal: "Corporate Bulk Purchase - Elite Towers",
                      agent: "Anjali Patel",
                      time: "1 day ago",
                      outcome: "Very impressed with amenities",
                    },
                    {
                      id: "3",
                      type: "Proposal Sent",
                      description: "Updated proposal sent to Anita Patel",
                      deal: "Patel Investment - Golden Heights",
                      agent: "Rajesh Kumar",
                      time: "2 days ago",
                      outcome: "Awaiting response",
                    },
                    {
                      id: "4",
                      type: "Meeting",
                      description: "Home loan discussion with Gupta family",
                      deal: "First-time Buyer - Compact 2BHK",
                      agent: "Meera Singh",
                      time: "3 days ago",
                      outcome: "Loan pre-approval in progress",
                    },
                  ].map((activity, index) => (
                    <div key={activity.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {activity.type}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {activity.time}
                            </span>
                          </div>
                          <h4 className="font-medium">
                            {activity.description}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {activity.deal}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500">
                              by {activity.agent}
                            </span>
                            <span className="text-xs text-green-600">
                              {activity.outcome}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Calendar} animation="bounce" />
                    Upcoming Tasks
                  </CardTitle>
                  <CardDescription>
                    Scheduled follow-ups and important deadlines
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      id: "1",
                      task: "Follow-up call with Sharma family",
                      deal: "Sharma Family - 3BHK Premium Deal",
                      due: "Today, 3:00 PM",
                      priority: "High",
                      agent: "Priya Sharma",
                    },
                    {
                      id: "2",
                      task: "Send revised proposal to TechCorp",
                      deal: "Corporate Bulk Purchase - Elite Towers",
                      due: "Tomorrow, 10:00 AM",
                      priority: "Critical",
                      agent: "Anjali Patel",
                    },
                    {
                      id: "3",
                      task: "Site visit with Anita Patel",
                      deal: "Patel Investment - Golden Heights",
                      due: "Mar 17, 2:00 PM",
                      priority: "Medium",
                      agent: "Rajesh Kumar",
                    },
                    {
                      id: "4",
                      task: "Home loan documentation review",
                      deal: "First-time Buyer - Compact 2BHK",
                      due: "Mar 18, 11:00 AM",
                      priority: "Medium",
                      agent: "Meera Singh",
                    },
                  ].map((task, index) => (
                    <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Flag
                              className={`h-4 w-4 ${
                                task.priority === "Critical"
                                  ? "text-red-500"
                                  : task.priority === "High"
                                    ? "text-orange-500"
                                    : "text-yellow-500"
                              }`}
                            />
                            <Badge variant="outline" className="text-xs">
                              {task.priority}
                            </Badge>
                          </div>
                          <h4 className="font-medium">{task.task}</h4>
                          <p className="text-sm text-gray-600">{task.deal}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500">
                              {task.agent}
                            </span>
                            <span className="text-xs font-medium text-blue-600">
                              {task.due}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Clock className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Pipeline Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Pipeline Health</CardTitle>
                  <CardDescription>
                    Analysis of deal distribution across pipeline stages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dealStages.slice(0, 7).map((stage) => {
                      const stageDeals = dealsByStage[stage.name] || [];
                      const stageValue = stageDeals.reduce(
                        (sum, deal) => sum + deal.finalAmount,
                        0,
                      );
                      const percentage =
                        (stageValue / dealStats.totalValue) * 100;

                      return (
                        <div key={stage.name} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{stage.name}</span>
                            <span>
                              {stageDeals.length} deals •{" "}
                              {formatCurrency(stageValue)}
                            </span>
                          </div>
                          <Progress value={percentage} />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{stage.description}</span>
                            <span>{percentage.toFixed(1)}% of pipeline</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>
                    Key sales performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          23.5%
                        </div>
                        <div className="text-sm text-gray-500">Win Rate</div>
                        <div className="text-xs text-green-600">
                          +2.3% from last month
                        </div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          45
                        </div>
                        <div className="text-sm text-gray-500">
                          Avg Cycle (days)
                        </div>
                        <div className="text-xs text-blue-600">
                          -3 days from last month
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Agent Performance</h4>
                      <div className="space-y-3">
                        {[
                          {
                            name: "Anjali Patel",
                            deals: 3,
                            value: 90675000,
                            conversion: 75,
                          },
                          {
                            name: "Priya Sharma",
                            deals: 1,
                            value: 17575000,
                            conversion: 68,
                          },
                          {
                            name: "Rajesh Kumar",
                            deals: 1,
                            value: 12125000,
                            conversion: 45,
                          },
                          {
                            name: "Meera Singh",
                            deals: 1,
                            value: 11200000,
                            conversion: 30,
                          },
                        ].map((agent, index) => (
                          <div
                            key={agent.name}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <div className="font-medium">{agent.name}</div>
                              <div className="text-sm text-gray-500">
                                {agent.deals} deals •{" "}
                                {formatCurrency(agent.value)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {agent.conversion}%
                              </div>
                              <div className="text-xs text-gray-500">
                                Win Rate
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>
                  Monthly revenue and deal closure analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-lg font-bold">₹12.5Cr</div>
                    <div className="text-sm text-gray-500">This Month</div>
                    <div className="text-xs text-green-600">
                      +18% vs last month
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-lg font-bold">₹45.2Cr</div>
                    <div className="text-sm text-gray-500">This Quarter</div>
                    <div className="text-xs text-green-600">
                      +12% vs last quarter
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-lg font-bold">₹165.8Cr</div>
                    <div className="text-sm text-gray-500">This Year</div>
                    <div className="text-xs text-green-600">
                      +25% vs last year
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forecasting Tab */}
          <TabsContent value="forecasting" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Revenue Forecast */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={TrendingUp} animation="glow" />
                    Revenue Forecast
                  </CardTitle>
                  <CardDescription>
                    Projected revenue based on current pipeline
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div className="p-4 border rounded-lg">
                        <div className="text-xl font-bold text-blue-600">
                          ₹28.5Cr
                        </div>
                        <div className="text-sm text-gray-500">Next Month</div>
                        <div className="text-xs text-blue-600">
                          85% confidence
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-xl font-bold text-green-600">
                          ₹87.2Cr
                        </div>
                        <div className="text-sm text-gray-500">
                          Next Quarter
                        </div>
                        <div className="text-xs text-green-600">
                          78% confidence
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-xl font-bold text-purple-600">
                          ₹245Cr
                        </div>
                        <div className="text-sm text-gray-500">Next Year</div>
                        <div className="text-xs text-purple-600">
                          65% confidence
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">
                        Probability-weighted Pipeline
                      </h4>
                      <div className="space-y-3">
                        {dealStages.slice(0, 6).map((stage) => {
                          const stageDeals = dealsByStage[stage.name] || [];
                          const stageValue = stageDeals.reduce(
                            (sum, deal) => sum + deal.finalAmount,
                            0,
                          );
                          const weightedValue =
                            stageValue * (stage.probability / 100);

                          return (
                            <div
                              key={stage.name}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-3 h-3 rounded-full ${stage.color}`}
                                ></div>
                                <span className="text-sm">{stage.name}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">
                                  {formatCurrency(weightedValue)}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {stageDeals.length} deals @{" "}
                                  {stage.probability}%
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Deal Closure Predictions */}
              <Card>
                <CardHeader>
                  <CardTitle>Deal Closure Predictions</CardTitle>
                  <CardDescription>
                    AI-powered predictions for deal closure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deals
                      .filter((deal) => deal.status === "Active")
                      .slice(0, 4)
                      .map((deal) => (
                        <div key={deal.id} className="border rounded-lg p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{deal.name}</h4>
                              <Badge
                                className={getStageColor(deal.stage).replace(
                                  "bg-",
                                  "bg-opacity-20 text-",
                                )}
                              >
                                {deal.stage}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Value:</span>
                                <span className="ml-2 font-medium">
                                  {formatCurrency(deal.finalAmount)}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">Expected:</span>
                                <span className="ml-2 font-medium">
                                  {deal.expectedCloseDate}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Closure Probability</span>
                                <span className="font-medium">
                                  {deal.probability}%
                                </span>
                              </div>
                              <Progress value={deal.probability} />
                            </div>

                            <div className="text-xs text-gray-600">
                              <strong>AI Insight:</strong>{" "}
                              {deal.probability > 70
                                ? "High likelihood of closure. Consider priority follow-up."
                                : deal.probability > 40
                                  ? "Moderate probability. Focus on addressing concerns."
                                  : "Lower probability. May need additional nurturing."}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>
                  Identify deals at risk and recommended actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deals
                    .filter((deal) => deal.riskFactors.length > 0)
                    .map((deal) => (
                      <div key={deal.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium">{deal.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {formatCurrency(deal.finalAmount)} • {deal.stage}
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-yellow-700">
                                Risk Factors:
                              </p>
                              <ul className="text-sm text-gray-600 list-disc list-inside">
                                {deal.riskFactors.map((risk, index) => (
                                  <li key={index}>{risk}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-3">
                              <Button size="sm" variant="outline">
                                <Phone className="mr-1 h-3 w-3" />
                                Schedule Call
                              </Button>
                            </div>
                          </div>
                          <Badge variant="destructive" className="text-xs">
                            At Risk
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deal Management Settings</CardTitle>
                <CardDescription>
                  Configure deal pipeline stages, automation rules, and
                  notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        Auto-assign deals to agents
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically assign new deals based on territory and
                        workload
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        Deal activity notifications
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Send notifications for important deal stage changes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Follow-up reminders</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatic reminders for scheduled follow-ups
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Property-deal linking</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically suggest properties based on deal
                        requirements
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Pipeline Stages</h4>
                  <div className="space-y-2">
                    {dealStages.map((stage, index) => (
                      <div
                        key={stage.name}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${stage.color}`}
                          ></div>
                          <div>
                            <div className="font-medium">{stage.name}</div>
                            <div className="text-sm text-gray-500">
                              {stage.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{stage.probability}%</Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Button className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Deals
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Pipeline
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Deal Modal */}
      <Dialog open={showAddDealModal} onOpenChange={setShowAddDealModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AnimatedIcon icon={Plus} className="text-blue-600" />
              Create New Deal
            </DialogTitle>
            <DialogDescription>
              Create a new sales opportunity with customer and property details
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmitDeal(handleAddDeal)}
            className="space-y-6"
          >
            {/* Basic Deal Information */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Deal Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="dealName">Deal Name *</Label>
                  <Input
                    id="dealName"
                    {...registerDeal("name", {
                      required: "Deal name is required",
                    })}
                    placeholder="e.g., Sharma Family - 3BHK Premium Deal"
                  />
                  {errorsDeal.name && (
                    <p className="text-sm text-red-600">
                      {errorsDeal.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="dealValue">Deal Value (₹) *</Label>
                  <Input
                    id="dealValue"
                    type="number"
                    {...registerDeal("dealValue", {
                      required: "Deal value is required",
                      min: 1000000,
                    })}
                    placeholder="18500000"
                  />
                  {errorsDeal.dealValue && (
                    <p className="text-sm text-red-600">
                      {errorsDeal.dealValue.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...registerDeal("description")}
                    placeholder="Brief description of the deal..."
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Customer Information</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    {...registerDeal("customerName", {
                      required: "Customer name is required",
                    })}
                    placeholder="Rajesh Kumar Sharma"
                  />
                  {errorsDeal.customerName && (
                    <p className="text-sm text-red-600">
                      {errorsDeal.customerName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    {...registerDeal("customerEmail", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="rajesh.sharma@email.com"
                  />
                  {errorsDeal.customerEmail && (
                    <p className="text-sm text-red-600">
                      {errorsDeal.customerEmail.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone *</Label>
                  <Input
                    id="customerPhone"
                    {...registerDeal("customerPhone", {
                      required: "Phone is required",
                    })}
                    placeholder="+91 98765 43210"
                  />
                  {errorsDeal.customerPhone && (
                    <p className="text-sm text-red-600">
                      {errorsDeal.customerPhone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Property & Deal Details */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Property & Deal Details</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Controller
                    name="propertyType"
                    control={controlDeal}
                    rules={{ required: "Property type is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1BHK">1BHK</SelectItem>
                          <SelectItem value="2BHK">2BHK</SelectItem>
                          <SelectItem value="3BHK">3BHK</SelectItem>
                          <SelectItem value="4BHK">4BHK</SelectItem>
                          <SelectItem value="Penthouse">Penthouse</SelectItem>
                          <SelectItem value="Villa">Villa</SelectItem>
                          <SelectItem value="Plot">Plot</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errorsDeal.propertyType && (
                    <p className="text-sm text-red-600">
                      {errorsDeal.propertyType.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="expectedCloseDate">Expected Close Date</Label>
                  <Input
                    id="expectedCloseDate"
                    type="date"
                    {...registerDeal("expectedCloseDate")}
                  />
                </div>
                <div>
                  <Label htmlFor="assignedAgent">Assigned Agent</Label>
                  <Controller
                    name="assignedAgent"
                    control={controlDeal}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select agent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Priya Sharma">
                            Priya Sharma
                          </SelectItem>
                          <SelectItem value="Anjali Patel">
                            Anjali Patel
                          </SelectItem>
                          <SelectItem value="Rajesh Kumar">
                            Rajesh Kumar
                          </SelectItem>
                          <SelectItem value="Meera Singh">
                            Meera Singh
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="source">Deal Source</Label>
                  <Controller
                    name="source"
                    control={controlDeal}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MagicBricks Portal">
                            MagicBricks Portal
                          </SelectItem>
                          <SelectItem value="99acres">99acres</SelectItem>
                          <SelectItem value="Direct Inquiry">
                            Direct Inquiry
                          </SelectItem>
                          <SelectItem value="Referral">Referral</SelectItem>
                          <SelectItem value="Social Media">
                            Social Media
                          </SelectItem>
                          <SelectItem value="Advertisement">
                            Advertisement
                          </SelectItem>
                          <SelectItem value="Walk-in">Walk-in</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    {...registerDeal("tags")}
                    placeholder="e.g., Hot Deal, Family Purchase, Premium"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddDealModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmittingDeal}>
                {isSubmittingDeal ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Deal
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Deal Details Modal */}
      <Dialog open={showDealDetails} onOpenChange={setShowDealDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedDeal && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  {selectedDeal.name}
                </DialogTitle>
                <DialogDescription>
                  Comprehensive deal information and management
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Deal Overview */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(selectedDeal.finalAmount)}
                        </div>
                        <div className="text-sm text-gray-500">Deal Value</div>
                        {selectedDeal.discountPercentage > 0 && (
                          <div className="text-xs text-green-600">
                            {selectedDeal.discountPercentage}% discount applied
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedDeal.probability}%
                        </div>
                        <div className="text-sm text-gray-500">Probability</div>
                        <Badge
                          className={`${getStageColor(selectedDeal.stage)} text-white mt-1`}
                        >
                          {selectedDeal.stage}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(selectedDeal.totalPaid)}
                        </div>
                        <div className="text-sm text-gray-500">Amount Paid</div>
                        <div className="text-xs text-gray-500">
                          {formatCurrency(selectedDeal.pendingAmount)} pending
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Customer & Property Details */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-3">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Name:</strong> {selectedDeal.customerName}
                      </div>
                      <div>
                        <strong>Email:</strong> {selectedDeal.customerEmail}
                      </div>
                      <div>
                        <strong>Phone:</strong> {selectedDeal.customerPhone}
                      </div>
                      <div>
                        <strong>Source:</strong> {selectedDeal.source}
                      </div>
                      {selectedDeal.referredBy && (
                        <div>
                          <strong>Referred by:</strong>{" "}
                          {selectedDeal.referredBy}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Property Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Type:</strong> {selectedDeal.propertyType}
                      </div>
                      {selectedDeal.propertyNames.length > 0 && (
                        <div>
                          <strong>Property:</strong>{" "}
                          {selectedDeal.propertyNames[0]}
                        </div>
                      )}
                      <div>
                        <strong>Payment Plan:</strong>{" "}
                        {selectedDeal.paymentPlan}
                      </div>
                      <div>
                        <strong>Payment Status:</strong>
                        <Badge
                          className={`ml-2 ${
                            selectedDeal.paymentStatus === "Completed"
                              ? "bg-green-100 text-green-800"
                              : selectedDeal.paymentStatus === "Partial"
                                ? "bg-yellow-100 text-yellow-800"
                                : selectedDeal.paymentStatus === "Overdue"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {selectedDeal.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Internal Notes & Risk Factors */}
                {(selectedDeal.internalNotes.length > 0 ||
                  selectedDeal.riskFactors.length > 0) && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {selectedDeal.internalNotes.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Internal Notes</h4>
                        <div className="space-y-2">
                          {selectedDeal.internalNotes.map((note, index) => (
                            <div
                              key={index}
                              className="text-sm p-2 bg-gray-50 rounded"
                            >
                              {note}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedDeal.riskFactors.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-yellow-700">
                          Risk Factors
                        </h4>
                        <div className="space-y-2">
                          {selectedDeal.riskFactors.map((risk, index) => (
                            <div
                              key={index}
                              className="text-sm p-2 bg-yellow-50 rounded flex items-center gap-2"
                            >
                              <AlertTriangle className="h-4 w-4 text-yellow-600" />
                              {risk}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Documents */}
                {selectedDeal.documents.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Documents</h4>
                    <div className="space-y-2">
                      {selectedDeal.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <div>
                              <div className="font-medium">{doc.name}</div>
                              <div className="text-sm text-gray-500">
                                {doc.type} • Uploaded by {doc.uploadedBy} on{" "}
                                {doc.uploadedAt}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Deal
                  </Button>
                  <Button variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Customer
                  </Button>
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  <Button variant="outline">
                    <Building className="mr-2 h-4 w-4" />
                    Link Property
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Proposal
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
