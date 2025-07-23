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
  Users,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Building,
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
  Image,
  Link as LinkIcon,
  Hash,
  AtSign,
  Upload,
  Download,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  X,
  Check,
  AlertCircle,
  Info,
  Lightbulb,
  Home,
  Crown,
  Award,
  HandShake,
  Briefcase,
  CreditCard,
  Receipt,
  FileText as FileContract,
  Shield,
  Lock,
  Unlock,
  Archive,
  History,
  CalendarDays,
  PhoneCall,
  MessageCircle,
  Video,
  Paperclip,
  ExternalLink,
  QrCode,
  Printer,
  Save,
  CloudDownload,
  CloudUpload,
} from "lucide-react";
import {
  AnimatedIcon,
  PulsingDot,
  LoadingSpinner,
  GlowingOrb,
} from "@/components/ui/animated-icons";

// Client Management interfaces
interface Client {
  id: string;
  name: string;
  type: "Individual" | "Corporate" | "Partnership" | "Government";
  industry: "Construction" | "Real Estate" | "Manufacturing" | "Marketing";
  category: "Premium" | "Standard" | "Enterprise" | "SME";
  status: "Active" | "Inactive" | "Prospect" | "Dormant" | "Blacklisted";
  onboardingStage:
    | "Inquiry"
    | "Documentation"
    | "Verification"
    | "Approval"
    | "Active"
    | "Complete";
  primaryContact: {
    name: string;
    designation: string;
    email: string;
    phone: string;
    mobile: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  businessDetails: {
    gstNumber?: string;
    panNumber: string;
    cinNumber?: string;
    establishedYear: number;
    annualTurnover?: number;
    employeeCount?: number;
    website?: string;
  };
  projects: ClientProject[];
  financials: ClientFinancials;
  documents: ClientDocument[];
  communications: Communication[];
  contracts: Contract[];
  createdAt: string;
  lastActivity: string;
  assignedManager: string;
  relationshipScore: number;
  lifetimeValue: number;
  riskLevel: "Low" | "Medium" | "High";
}

interface ClientProject {
  id: string;
  name: string;
  type: string;
  status: "Planning" | "Active" | "On Hold" | "Completed" | "Cancelled";
  startDate: string;
  endDate?: string;
  budget: number;
  spent: number;
  progress: number;
  milestones: ProjectMilestone[];
}

interface ProjectMilestone {
  id: string;
  name: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed" | "Delayed";
  completionDate?: string;
}

interface ClientFinancials {
  creditLimit: number;
  availableCredit: number;
  totalInvoiced: number;
  totalPaid: number;
  pendingAmount: number;
  overdueAmount: number;
  paymentTerms: number; // days
  lastPaymentDate?: string;
  paymentHistory: PaymentRecord[];
}

interface PaymentRecord {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "Pending" | "Paid" | "Overdue" | "Partially Paid";
  paymentMethod?: string;
}

interface ClientDocument {
  id: string;
  name: string;
  type:
    | "Agreement"
    | "Invoice"
    | "Receipt"
    | "PAN Card"
    | "GST Certificate"
    | "Bank Details"
    | "Project Document"
    | "Compliance"
    | "Other";
  uploadedDate: string;
  uploadedBy: string;
  size: string;
  url: string;
  isVerified: boolean;
  expiryDate?: string;
}

interface Communication {
  id: string;
  type: "Email" | "Call" | "Meeting" | "WhatsApp" | "SMS" | "Visit";
  subject: string;
  content?: string;
  direction: "Inbound" | "Outbound";
  timestamp: string;
  participants: string[];
  attachments?: string[];
  followUpRequired: boolean;
  followUpDate?: string;
  status: "Completed" | "Pending" | "Scheduled";
}

interface Contract {
  id: string;
  name: string;
  type: "Service Agreement" | "AMC" | "Project Contract" | "NDA" | "SLA";
  startDate: string;
  endDate: string;
  value: number;
  status: "Draft" | "Active" | "Expired" | "Terminated" | "Under Review";
  renewalDate?: string;
  terms: string;
  signedBy: string[];
  attachments: string[];
}

export default function Clients() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientFilter, setClientFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  const { register, handleSubmit, control, watch, reset } = useForm();

  // Sample clients data
  const [clients] = useState<Client[]>([
    {
      id: "client-001",
      name: "Skyline Construction Pvt Ltd",
      type: "Corporate",
      industry: "Construction",
      category: "Enterprise",
      status: "Active",
      onboardingStage: "Active",
      primaryContact: {
        name: "Rajesh Kumar Sharma",
        designation: "Project Director",
        email: "rajesh@skylineconstruction.com",
        phone: "022-28567890",
        mobile: "+91-9876543210",
      },
      address: {
        street: "Plot 45, Industrial Area, Sector 18",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India",
      },
      businessDetails: {
        gstNumber: "27ABCDE1234F1Z5",
        panNumber: "ABCDE1234F",
        cinNumber: "U45200MH2010PTC123456",
        establishedYear: 2010,
        annualTurnover: 250000000,
        employeeCount: 450,
        website: "www.skylineconstruction.com",
      },
      projects: [
        {
          id: "proj-001",
          name: "Skyline Towers - Phase 2",
          type: "Residential Complex",
          status: "Active",
          startDate: "2024-01-15",
          endDate: "2025-06-30",
          budget: 85000000,
          spent: 34000000,
          progress: 40,
          milestones: [
            {
              id: "mile-001",
              name: "Foundation Complete",
              dueDate: "2024-03-15",
              status: "Completed",
              completionDate: "2024-03-10",
            },
            {
              id: "mile-002",
              name: "Structure - 10 Floors",
              dueDate: "2024-07-30",
              status: "In Progress",
            },
            {
              id: "mile-003",
              name: "Finishing Work",
              dueDate: "2024-12-15",
              status: "Pending",
            },
          ],
        },
        {
          id: "proj-002",
          name: "Commercial Plaza Development",
          type: "Commercial",
          status: "Planning",
          startDate: "2024-06-01",
          budget: 120000000,
          spent: 5000000,
          progress: 5,
          milestones: [],
        },
      ],
      financials: {
        creditLimit: 50000000,
        availableCredit: 35000000,
        totalInvoiced: 89000000,
        totalPaid: 74000000,
        pendingAmount: 15000000,
        overdueAmount: 3000000,
        paymentTerms: 30,
        lastPaymentDate: "2024-01-15",
        paymentHistory: [
          {
            id: "pay-001",
            invoiceNumber: "INV-2024-001",
            amount: 12000000,
            dueDate: "2024-01-30",
            paidDate: "2024-01-28",
            status: "Paid",
            paymentMethod: "RTGS",
          },
          {
            id: "pay-002",
            invoiceNumber: "INV-2024-002",
            amount: 8500000,
            dueDate: "2024-02-15",
            status: "Pending",
          },
        ],
      },
      documents: [
        {
          id: "doc-001",
          name: "Service Agreement 2024",
          type: "Agreement",
          uploadedDate: "2024-01-10",
          uploadedBy: "Admin",
          size: "2.5 MB",
          url: "/documents/agreement-001.pdf",
          isVerified: true,
        },
        {
          id: "doc-002",
          name: "GST Certificate",
          type: "GST Certificate",
          uploadedDate: "2024-01-10",
          uploadedBy: "Client",
          size: "1.2 MB",
          url: "/documents/gst-001.pdf",
          isVerified: true,
          expiryDate: "2025-03-31",
        },
      ],
      communications: [
        {
          id: "comm-001",
          type: "Meeting",
          subject: "Project Phase 2 Planning",
          content: "Discussion on upcoming phase requirements and timeline",
          direction: "Outbound",
          timestamp: "2024-01-20 14:30",
          participants: ["Rajesh Kumar", "Project Manager"],
          followUpRequired: true,
          followUpDate: "2024-01-25",
          status: "Completed",
        },
        {
          id: "comm-002",
          type: "Email",
          subject: "Invoice Clarification",
          direction: "Inbound",
          timestamp: "2024-01-18 10:15",
          participants: ["Rajesh Kumar"],
          followUpRequired: false,
          status: "Completed",
        },
      ],
      contracts: [
        {
          id: "cont-001",
          name: "Master Service Agreement",
          type: "Service Agreement",
          startDate: "2024-01-01",
          endDate: "2025-12-31",
          value: 150000000,
          status: "Active",
          renewalDate: "2025-10-01",
          terms: "Standard construction services with 2-year warranty",
          signedBy: ["Client", "Company"],
          attachments: ["/contracts/msa-001.pdf"],
        },
      ],
      createdAt: "2024-01-10",
      lastActivity: "2024-01-20",
      assignedManager: "Priya Sharma",
      relationshipScore: 92,
      lifetimeValue: 185000000,
      riskLevel: "Low",
    },
    {
      id: "client-002",
      name: "Green Valley Developers",
      type: "Corporate",
      industry: "Real Estate",
      category: "Premium",
      status: "Active",
      onboardingStage: "Active",
      primaryContact: {
        name: "Anjali Patel",
        designation: "Business Development Head",
        email: "anjali@greenvalley.in",
        phone: "020-12345678",
        mobile: "+91-9123456789",
      },
      address: {
        street: "5th Floor, Business Park, Hinjewadi",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411057",
        country: "India",
      },
      businessDetails: {
        gstNumber: "27FGHIJ5678K1Z5",
        panNumber: "FGHIJ5678K",
        establishedYear: 2015,
        annualTurnover: 180000000,
        employeeCount: 125,
        website: "www.greenvalley.in",
      },
      projects: [
        {
          id: "proj-003",
          name: "Green Valley Homes - Phase 1",
          type: "Residential",
          status: "Active",
          startDate: "2024-02-01",
          endDate: "2024-12-31",
          budget: 45000000,
          spent: 18000000,
          progress: 40,
          milestones: [
            {
              id: "mile-004",
              name: "Site Preparation",
              dueDate: "2024-03-01",
              status: "Completed",
              completionDate: "2024-02-28",
            },
            {
              id: "mile-005",
              name: "Sales Gallery Setup",
              dueDate: "2024-04-15",
              status: "In Progress",
            },
          ],
        },
      ],
      financials: {
        creditLimit: 25000000,
        availableCredit: 20000000,
        totalInvoiced: 38000000,
        totalPaid: 33000000,
        pendingAmount: 5000000,
        overdueAmount: 0,
        paymentTerms: 15,
        lastPaymentDate: "2024-01-18",
        paymentHistory: [
          {
            id: "pay-003",
            invoiceNumber: "INV-2024-003",
            amount: 6000000,
            dueDate: "2024-02-01",
            paidDate: "2024-01-30",
            status: "Paid",
            paymentMethod: "NEFT",
          },
        ],
      },
      documents: [
        {
          id: "doc-003",
          name: "Real Estate Agreement",
          type: "Agreement",
          uploadedDate: "2024-01-15",
          uploadedBy: "Manager",
          size: "3.1 MB",
          url: "/documents/agreement-002.pdf",
          isVerified: true,
        },
      ],
      communications: [
        {
          id: "comm-003",
          type: "Call",
          subject: "Marketing Campaign Discussion",
          direction: "Outbound",
          timestamp: "2024-01-19 16:00",
          participants: ["Anjali Patel", "Marketing Head"],
          followUpRequired: true,
          followUpDate: "2024-01-24",
          status: "Completed",
        },
      ],
      contracts: [
        {
          id: "cont-002",
          name: "Marketing Services Contract",
          type: "Service Agreement",
          startDate: "2024-02-01",
          endDate: "2024-12-31",
          value: 25000000,
          status: "Active",
          terms: "Complete digital marketing and sales support",
          signedBy: ["Client", "Company"],
          attachments: ["/contracts/marketing-001.pdf"],
        },
      ],
      createdAt: "2024-01-15",
      lastActivity: "2024-01-19",
      assignedManager: "Amit Singh",
      relationshipScore: 87,
      lifetimeValue: 65000000,
      riskLevel: "Low",
    },
    {
      id: "client-003",
      name: "TechManufacturing Solutions Ltd",
      type: "Corporate",
      industry: "Manufacturing",
      category: "Enterprise",
      status: "Active",
      onboardingStage: "Documentation",
      primaryContact: {
        name: "Vikash Gupta",
        designation: "Operations Manager",
        email: "vikash@techmanuf.com",
        phone: "011-23456789",
        mobile: "+91-9234567890",
      },
      address: {
        street: "Industrial Area, Phase 2, Sector 25",
        city: "Gurgaon",
        state: "Haryana",
        pincode: "122001",
        country: "India",
      },
      businessDetails: {
        gstNumber: "06KLMNO9012P1Z5",
        panNumber: "KLMNO9012P",
        establishedYear: 2008,
        annualTurnover: 320000000,
        employeeCount: 850,
        website: "www.techmanuf.com",
      },
      projects: [
        {
          id: "proj-004",
          name: "Factory Automation System",
          type: "Technology Implementation",
          status: "Planning",
          startDate: "2024-03-01",
          budget: 75000000,
          spent: 2000000,
          progress: 5,
          milestones: [
            {
              id: "mile-006",
              name: "Requirements Analysis",
              dueDate: "2024-03-15",
              status: "In Progress",
            },
          ],
        },
      ],
      financials: {
        creditLimit: 60000000,
        availableCredit: 58000000,
        totalInvoiced: 15000000,
        totalPaid: 13000000,
        pendingAmount: 2000000,
        overdueAmount: 0,
        paymentTerms: 45,
        lastPaymentDate: "2024-01-10",
        paymentHistory: [
          {
            id: "pay-004",
            invoiceNumber: "INV-2024-004",
            amount: 5000000,
            dueDate: "2024-02-25",
            status: "Pending",
          },
        ],
      },
      documents: [
        {
          id: "doc-004",
          name: "Manufacturing License",
          type: "Compliance",
          uploadedDate: "2024-01-12",
          uploadedBy: "Client",
          size: "1.8 MB",
          url: "/documents/license-001.pdf",
          isVerified: false,
          expiryDate: "2025-12-31",
        },
      ],
      communications: [
        {
          id: "comm-004",
          type: "Meeting",
          subject: "System Requirements Discussion",
          direction: "Outbound",
          timestamp: "2024-01-17 11:00",
          participants: ["Vikash Gupta", "Technical Team"],
          followUpRequired: true,
          followUpDate: "2024-01-22",
          status: "Completed",
        },
      ],
      contracts: [],
      createdAt: "2024-01-12",
      lastActivity: "2024-01-17",
      assignedManager: "Neha Joshi",
      relationshipScore: 78,
      lifetimeValue: 95000000,
      riskLevel: "Medium",
    },
  ]);

  // Calculate client metrics
  const clientStats = {
    totalClients: clients.length,
    activeClients: clients.filter((c) => c.status === "Active").length,
    totalLifetimeValue: clients.reduce((sum, c) => sum + c.lifetimeValue, 0),
    avgRelationshipScore:
      clients.reduce((sum, c) => sum + c.relationshipScore, 0) / clients.length,
    totalPendingAmount: clients.reduce(
      (sum, c) => sum + c.financials.pendingAmount,
      0,
    ),
    totalOverdueAmount: clients.reduce(
      (sum, c) => sum + c.financials.overdueAmount,
      0,
    ),
    totalActiveProjects: clients.reduce(
      (sum, c) => sum + c.projects.filter((p) => p.status === "Active").length,
      0,
    ),
    newClientsThisMonth: clients.filter((c) =>
      c.createdAt.startsWith("2024-01"),
    ).length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Prospect":
        return "bg-blue-100 text-blue-800";
      case "Dormant":
        return "bg-yellow-100 text-yellow-800";
      case "Blacklisted":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 50) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/crm/dashboard"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to CRM Dashboard
                </Link>
              </Button>
            </div>
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
              Client Management System
            </h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Comprehensive client lifecycle management for Construction, Real
              Estate, Manufacturing & Marketing industries
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <PulsingDot className="text-green-500" />
                {clientStats.activeClients} Active Clients
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <TrendingUp className="h-4 w-4 text-blue-500" />₹
                {(clientStats.totalLifetimeValue / 10000000).toFixed(1)}Cr LTV
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <Star className="h-4 w-4 text-emerald-500" />
                {clientStats.avgRelationshipScore.toFixed(1)} Avg Score
              </Badge>
            </div>
            <Button
              onClick={() => setShowAddClientModal(true)}
              className="w-full sm:w-auto"
            >
              <AnimatedIcon icon={Plus} className="mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Over</span>
            </TabsTrigger>
            <TabsTrigger
              value="clients"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Users className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Clients</span>
              <span className="sm:hidden">Client</span>
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Building className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Projects</span>
              <span className="lg:hidden">Proj</span>
            </TabsTrigger>
            <TabsTrigger
              value="financials"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <DollarSign className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Financials</span>
              <span className="lg:hidden">Money</span>
            </TabsTrigger>
            <TabsTrigger
              value="communications"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <MessageSquare className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Communications</span>
              <span className="lg:hidden">Comm</span>
            </TabsTrigger>
            <TabsTrigger
              value="contracts"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <FileContract className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Contracts</span>
              <span className="lg:hidden">Contr</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <PieChart className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Analytics</span>
              <span className="lg:hidden">Anal</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Client Stats */}
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {clientStats.totalClients}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Total Clients
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {clientStats.activeClients}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Active
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Crown className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        ₹
                        {(clientStats.totalLifetimeValue / 10000000).toFixed(1)}
                        Cr
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Total LTV
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-6 w-6 lg:h-8 lg:w-8 text-orange-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {clientStats.avgRelationshipScore.toFixed(0)}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Avg Score
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-6 w-6 lg:h-8 lg:w-8 text-teal-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {clientStats.totalActiveProjects}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Active Projects
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        ₹{(clientStats.totalPendingAmount / 1000000).toFixed(1)}
                        M
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Pending
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 lg:h-8 lg:w-8 text-red-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        ₹{(clientStats.totalOverdueAmount / 1000000).toFixed(1)}
                        M
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Overdue
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-6 w-6 lg:h-8 lg:w-8 text-indigo-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {clientStats.newClientsThisMonth}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        New This Month
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Zap} animation="pulse" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Common client management tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="w-full justify-start" variant="outline">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add New Client
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Building className="mr-2 h-4 w-4" />
                      Create Project
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Log Communication
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Receipt className="mr-2 h-4 w-4" />
                      Generate Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Activity} animation="float" />
                    Recent Client Activity
                  </CardTitle>
                  <CardDescription>Latest client interactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {clients.slice(0, 3).map((client) => (
                      <div
                        key={client.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {client.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {client.lastActivity}
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Client Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={TrendingUp} animation="bounce" />
                  Client Performance Overview
                </CardTitle>
                <CardDescription>
                  Relationship scores and business metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{client.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {client.industry} • {client.category}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(client.status)}>
                              {client.status}
                            </Badge>
                            <Badge className={getRiskColor(client.riskLevel)}>
                              {client.riskLevel} Risk
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">LTV: </span>
                            <span className="font-medium">
                              ₹{(client.lifetimeValue / 10000000).toFixed(1)}Cr
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Score:{" "}
                            </span>
                            <span
                              className={`font-medium ${getScoreColor(client.relationshipScore)}`}
                            >
                              {client.relationshipScore}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Projects:{" "}
                            </span>
                            <span className="font-medium">
                              {client.projects.length}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Pending:{" "}
                            </span>
                            <span className="font-medium">
                              ₹
                              {(
                                client.financials.pendingAmount / 1000000
                              ).toFixed(1)}
                              M
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            {/* Client Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search clients..."
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Select
                      value={clientFilter}
                      onValueChange={setClientFilter}
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={industryFilter}
                      onValueChange={setIndustryFilter}
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Industries</SelectItem>
                        <SelectItem value="construction">
                          Construction
                        </SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="manufacturing">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setShowAddClientModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Client
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Clients List - Mobile Optimized */}
            <div className="grid gap-4 lg:grid-cols-2">
              {clients.map((client) => (
                <Card
                  key={client.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {client.industry}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {client.category}
                          </Badge>
                          <Badge className={getStatusColor(client.status)}>
                            {client.status}
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Client
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Add Communication
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Building className="mr-2 h-4 w-4" />
                            Create Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <span>{client.primaryContact.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">
                            {client.primaryContact.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{client.primaryContact.mobile}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="font-bold text-blue-600">
                            {client.projects.length}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Projects
                          </div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-bold text-green-600">
                            {client.relationshipScore}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Score
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Lifetime Value:</span>
                          <span className="font-medium">
                            ₹{(client.lifetimeValue / 10000000).toFixed(1)}Cr
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Pending Amount:</span>
                          <span className="font-medium text-orange-600">
                            ₹
                            {(
                              client.financials.pendingAmount / 1000000
                            ).toFixed(1)}
                            M
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Risk Level:</span>
                          <Badge className={getRiskColor(client.riskLevel)}>
                            {client.riskLevel}
                          </Badge>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <MessageSquare className="mr-1 h-3 w-3" />
                            Contact
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Client Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Manage all client projects and track progress
                </p>
              </div>
              <Button onClick={() => setShowProjectModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {clients.flatMap((client) =>
                client.projects.map((project) => (
                  <Card
                    key={project.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">
                            {project.name}
                          </CardTitle>
                          <CardDescription>
                            {client.name} • {project.type}
                          </CardDescription>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                project.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : project.status === "Planning"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {project.status}
                            </Badge>
                            <Badge variant="outline">
                              {project.progress}% Complete
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-bold text-blue-600">
                              ₹{(project.budget / 10000000).toFixed(1)}Cr
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Budget
                            </div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="font-bold text-green-600">
                              ₹{(project.spent / 10000000).toFixed(1)}Cr
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Spent
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress:</span>
                            <span className="font-medium">
                              {project.progress}%
                            </span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Milestones:</h4>
                          <div className="space-y-1">
                            {project.milestones.slice(0, 2).map((milestone) => (
                              <div
                                key={milestone.id}
                                className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded"
                              >
                                <span>{milestone.name}</span>
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
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <BarChart3 className="mr-1 h-3 w-3" />
                            Reports
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )),
              )}
            </div>
          </TabsContent>

          {/* Financials Tab */}
          <TabsContent value="financials" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Payment Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{client.name}</span>
                          <Badge
                            className={
                              client.financials.overdueAmount > 0
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {client.financials.overdueAmount > 0
                              ? `₹${(client.financials.overdueAmount / 1000000).toFixed(1)}M Overdue`
                              : "Current"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-medium">
                              ₹
                              {(
                                client.financials.totalInvoiced / 1000000
                              ).toFixed(1)}
                              M
                            </div>
                            <div className="text-muted-foreground">
                              Invoiced
                            </div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="font-medium">
                              ₹
                              {(client.financials.totalPaid / 1000000).toFixed(
                                1,
                              )}
                              M
                            </div>
                            <div className="text-muted-foreground">Paid</div>
                          </div>
                          <div className="text-center p-2 bg-orange-50 rounded">
                            <div className="font-medium">
                              ₹
                              {(
                                client.financials.pendingAmount / 1000000
                              ).toFixed(1)}
                              M
                            </div>
                            <div className="text-muted-foreground">Pending</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Credit Utilization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{client.name}</span>
                          <span>
                            ₹
                            {(
                              (client.financials.creditLimit -
                                client.financials.availableCredit) /
                              1000000
                            ).toFixed(1)}
                            M / ₹
                            {(client.financials.creditLimit / 1000000).toFixed(
                              1,
                            )}
                            M
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={
                              ((client.financials.creditLimit -
                                client.financials.availableCredit) /
                                client.financials.creditLimit) *
                              100
                            }
                            className="flex-1 h-2"
                          />
                          <span className="text-xs text-muted-foreground w-12">
                            {(
                              ((client.financials.creditLimit -
                                client.financials.availableCredit) /
                                client.financials.creditLimit) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Recent Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.flatMap((client) =>
                      client.financials.paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{client.name}</TableCell>
                          <TableCell>{payment.invoiceNumber}</TableCell>
                          <TableCell>
                            ₹{(payment.amount / 1000000).toFixed(1)}M
                          </TableCell>
                          <TableCell>{payment.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                payment.status === "Paid"
                                  ? "bg-green-100 text-green-800"
                                  : payment.status === "Overdue"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Send className="mr-2 h-4 w-4" />
                                  Send Reminder
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Receipt className="mr-2 h-4 w-4" />
                                  Record Payment
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )),
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communications Tab */}
          <TabsContent value="communications" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Client Communications</h3>
                <p className="text-sm text-muted-foreground">
                  Track all client interactions and communications
                </p>
              </div>
              <Button onClick={() => setShowCommunicationModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Log Communication
              </Button>
            </div>

            <div className="grid gap-4">
              {clients.flatMap((client) =>
                client.communications.map((comm) => (
                  <Card key={comm.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              {comm.type === "Email" && (
                                <Mail className="h-4 w-4 text-blue-600" />
                              )}
                              {comm.type === "Call" && (
                                <Phone className="h-4 w-4 text-blue-600" />
                              )}
                              {comm.type === "Meeting" && (
                                <Users className="h-4 w-4 text-blue-600" />
                              )}
                              {comm.type === "WhatsApp" && (
                                <MessageCircle className="h-4 w-4 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{comm.subject}</h3>
                              <p className="text-sm text-muted-foreground">
                                {client.name} • {comm.timestamp}
                              </p>
                            </div>
                          </div>
                          {comm.content && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {comm.content}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="outline">{comm.type}</Badge>
                            <Badge
                              variant="outline"
                              className={
                                comm.direction === "Inbound"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              {comm.direction}
                            </Badge>
                            {comm.followUpRequired && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                Follow-up Required
                              </Badge>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Plus className="mr-2 h-4 w-4" />
                              Add Follow-up
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                )),
              )}
            </div>
          </TabsContent>

          {/* Contracts Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Client Contracts</h3>
                <p className="text-sm text-muted-foreground">
                  Manage all client contracts and agreements
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Contract
              </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {clients.flatMap((client) =>
                client.contracts.map((contract) => (
                  <Card
                    key={contract.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">
                            {contract.name}
                          </CardTitle>
                          <CardDescription>
                            {client.name} • {contract.type}
                          </CardDescription>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                contract.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : contract.status === "Draft"
                                    ? "bg-gray-100 text-gray-800"
                                    : contract.status === "Expired"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {contract.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Value:{" "}
                            </span>
                            <span className="font-medium">
                              ₹{(contract.value / 10000000).toFixed(1)}Cr
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Duration:{" "}
                            </span>
                            <span className="font-medium">
                              {contract.startDate} - {contract.endDate}
                            </span>
                          </div>
                        </div>

                        <div className="text-sm">
                          <span className="text-muted-foreground">Terms: </span>
                          <span>{contract.terms}</span>
                        </div>

                        {contract.renewalDate && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              Renewal Due:{" "}
                            </span>
                            <span className="font-medium">
                              {contract.renewalDate}
                            </span>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Download className="mr-1 h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )),
              )}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Client Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Construction</span>
                        <span>
                          {
                            clients.filter((c) => c.industry === "Construction")
                              .length
                          }{" "}
                          clients
                        </span>
                      </div>
                      <Progress
                        value={
                          (clients.filter((c) => c.industry === "Construction")
                            .length /
                            clients.length) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Real Estate</span>
                        <span>
                          {
                            clients.filter((c) => c.industry === "Real Estate")
                              .length
                          }{" "}
                          clients
                        </span>
                      </div>
                      <Progress
                        value={
                          (clients.filter((c) => c.industry === "Real Estate")
                            .length /
                            clients.length) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Manufacturing</span>
                        <span>
                          {
                            clients.filter(
                              (c) => c.industry === "Manufacturing",
                            ).length
                          }{" "}
                          clients
                        </span>
                      </div>
                      <Progress
                        value={
                          (clients.filter((c) => c.industry === "Manufacturing")
                            .length /
                            clients.length) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Revenue Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{client.name}</span>
                          <span>
                            ₹{(client.lifetimeValue / 10000000).toFixed(1)}Cr
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={
                              (client.lifetimeValue /
                                Math.max(
                                  ...clients.map((c) => c.lifetimeValue),
                                )) *
                              100
                            }
                            className="flex-1 h-2"
                          />
                          <span className="text-xs text-muted-foreground w-12">
                            {(
                              (client.lifetimeValue /
                                clientStats.totalLifetimeValue) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Client Health Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Relationship Score</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Payment Health</TableHead>
                      <TableHead>Last Activity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-medium ${getScoreColor(client.relationshipScore)}`}
                            >
                              {client.relationshipScore}
                            </span>
                            <Progress
                              value={client.relationshipScore}
                              className="w-16 h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskColor(client.riskLevel)}>
                            {client.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              client.financials.overdueAmount > 0
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {client.financials.overdueAmount > 0
                              ? "Overdue"
                              : "Healthy"}
                          </Badge>
                        </TableCell>
                        <TableCell>{client.lastActivity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Client Modal */}
        <Dialog open={showAddClientModal} onOpenChange={setShowAddClientModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Create a new client profile with complete business information
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Client Name *</Label>
                  <Input id="client-name" placeholder="Enter client name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-type">Client Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="sme">SME</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Primary Contact</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Contact Name *</Label>
                    <Input id="contact-name" placeholder="Enter contact name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" placeholder="Enter designation" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile *</Label>
                    <Input id="mobile" placeholder="Enter mobile number" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Business Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number *</Label>
                    <Input id="pan" placeholder="Enter PAN number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gst">GST Number</Label>
                    <Input id="gst" placeholder="Enter GST number" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="established">Established Year</Label>
                    <Input
                      id="established"
                      type="number"
                      placeholder="Enter year"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="turnover">Annual Turnover (₹)</Label>
                    <Input
                      id="turnover"
                      type="number"
                      placeholder="Enter turnover"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Address</h3>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Textarea id="address" placeholder="Enter full address" />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="Enter city" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" placeholder="Enter state" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input id="pincode" placeholder="Enter pincode" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddClientModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Client</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add Project Modal */}
        <Dialog open={showProjectModal} onOpenChange={setShowProjectModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project for an existing client
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name *</Label>
                  <Input id="project-name" placeholder="Enter project name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-select">Client *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project-type">Project Type</Label>
                  <Input id="project-type" placeholder="Enter project type" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (₹)</Label>
                  <Input id="budget" type="number" placeholder="Enter budget" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Expected End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter project description..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowProjectModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Project</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add Communication Modal */}
        <Dialog
          open={showCommunicationModal}
          onOpenChange={setShowCommunicationModal}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Log Communication</DialogTitle>
              <DialogDescription>
                Record a new communication with a client
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="comm-client">Client *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comm-type">Communication Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="visit">Site Visit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="Enter subject" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter communication details..."
                  rows={4}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="direction">Direction</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound">Inbound</SelectItem>
                      <SelectItem value="outbound">Outbound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="followup-date">Follow-up Date</Label>
                  <Input id="followup-date" type="date" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCommunicationModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Log Communication</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
