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
  Megaphone,
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
  Building,
  Home,
  Crown,
  Award,
  Palette,
  Layout,
  Type,
  Square,
  Circle,
  Triangle,
  Brush,
  Paintbrush,
  Scissors,
  Move,
  RotateCcw,
  Save,
  ExternalLink,
} from "lucide-react";
import {
  AnimatedIcon,
  PulsingDot,
  LoadingSpinner,
  GlowingOrb,
} from "@/components/ui/animated-icons";

// Marketing Automation interfaces
interface Campaign {
  id: string;
  name: string;
  type: "Email" | "SMS" | "WhatsApp" | "Multi-Channel";
  status: "Draft" | "Active" | "Paused" | "Completed";
  project?: string;
  targetAudience: string;
  startDate: string;
  endDate?: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  leads: number;
  bookings: number;
  cpc: number; // Cost Per Click
  cpl: number; // Cost Per Lead
  cpb: number; // Cost Per Booking
  rois: number;
  createdAt: string;
  lastModified: string;
}

interface Journey {
  id: string;
  name: string;
  description: string;
  project: string;
  stage: "Lead Capture" | "Nurturing" | "Conversion" | "Retention";
  triggers: JourneyTrigger[];
  steps: JourneyStep[];
  isActive: boolean;
  participants: number;
  completionRate: number;
  avgEngagementTime: number;
  createdAt: string;
}

interface JourneyTrigger {
  id: string;
  type:
    | "form_submission"
    | "page_visit"
    | "email_open"
    | "time_delay"
    | "behavior";
  condition: string;
  value: string;
}

interface JourneyStep {
  id: string;
  name: string;
  type: "email" | "sms" | "whatsapp" | "delay" | "condition" | "action";
  template?: string;
  delay?: number; // hours
  conditions?: any;
  nextStepId?: string;
  alternateStepId?: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  category:
    | "Welcome"
    | "Follow-up"
    | "Promotional"
    | "Newsletter"
    | "Event"
    | "Brochure";
  subject: string;
  previewText: string;
  htmlContent: string;
  textContent: string;
  project?: string;
  thumbnail: string;
  isActive: boolean;
  usage: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
}

interface LeadScore {
  id: string;
  leadId: string;
  leadName: string;
  project: string;
  score: number;
  grade: "A" | "B" | "C" | "D";
  touchpoints: TouchPoint[];
  lastActivity: string;
  probability: number;
  nextBestAction: string;
}

interface TouchPoint {
  id: string;
  type:
    | "Email Open"
    | "Link Click"
    | "Form Fill"
    | "Page Visit"
    | "Download"
    | "Call"
    | "Meeting";
  timestamp: string;
  value: number;
  description: string;
  source: string;
}

export default function MarketingAutomation() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);
  const [showJourneyBuilderModal, setShowJourneyBuilderModal] = useState(false);
  const [showEmailDesignerModal, setShowEmailDesignerModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );

  const { register, handleSubmit, control, watch, reset } = useForm();

  // Sample marketing data
  const [campaigns] = useState<Campaign[]>([
    {
      id: "camp-1",
      name: "Skyline Towers Launch Campaign",
      type: "Multi-Channel",
      status: "Active",
      project: "Skyline Towers",
      targetAudience: "High-income families",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      budget: 500000,
      spent: 387000,
      impressions: 2450000,
      clicks: 18750,
      leads: 1250,
      bookings: 89,
      cpc: 20.64,
      cpl: 309.6,
      cpb: 4348.31,
      rois: 285.7,
      createdAt: "2024-01-10",
      lastModified: "2024-01-20",
    },
    {
      id: "camp-2",
      name: "Green Valley Weekend Drive",
      type: "WhatsApp",
      status: "Active",
      project: "Green Valley",
      targetAudience: "First-time buyers",
      startDate: "2024-01-20",
      endDate: "2024-02-20",
      budget: 150000,
      spent: 89000,
      impressions: 890000,
      clicks: 8900,
      leads: 445,
      bookings: 23,
      cpc: 10.0,
      cpl: 200.0,
      cpb: 3869.56,
      rois: 156.8,
      createdAt: "2024-01-18",
      lastModified: "2024-01-22",
    },
    {
      id: "camp-3",
      name: "Premium Villas Nurture Series",
      type: "Email",
      status: "Paused",
      project: "Premium Villas",
      targetAudience: "Ultra HNI prospects",
      startDate: "2024-01-05",
      budget: 200000,
      spent: 145000,
      impressions: 125000,
      clicks: 3750,
      leads: 187,
      bookings: 12,
      cpc: 38.67,
      cpl: 775.4,
      cpb: 12083.33,
      rois: 198.5,
      createdAt: "2024-01-03",
      lastModified: "2024-01-25",
    },
  ]);

  const [journeys] = useState<Journey[]>([
    {
      id: "journey-1",
      name: "New Lead Onboarding",
      description: "7-day email sequence for new property inquiries",
      project: "Skyline Towers",
      stage: "Lead Capture",
      triggers: [
        {
          id: "t1",
          type: "form_submission",
          condition: "interest_form_submitted",
          value: "skyline_towers",
        },
      ],
      steps: [
        {
          id: "s1",
          name: "Welcome Email",
          type: "email",
          template: "welcome_template",
          nextStepId: "s2",
        },
        {
          id: "s2",
          name: "Wait 1 Day",
          type: "delay",
          delay: 24,
          nextStepId: "s3",
        },
        {
          id: "s3",
          name: "Project Details",
          type: "email",
          template: "project_details",
          nextStepId: "s4",
        },
      ],
      isActive: true,
      participants: 234,
      completionRate: 68.5,
      avgEngagementTime: 127,
      createdAt: "2024-01-10",
    },
    {
      id: "journey-2",
      name: "Site Visit Follow-up",
      description: "Multi-touch follow-up after site visit",
      project: "Green Valley",
      stage: "Nurturing",
      triggers: [
        {
          id: "t2",
          type: "behavior",
          condition: "site_visit_completed",
          value: "green_valley",
        },
      ],
      steps: [
        {
          id: "s1",
          name: "Thank You WhatsApp",
          type: "whatsapp",
          template: "site_visit_thanks",
          nextStepId: "s2",
        },
        {
          id: "s2",
          name: "Wait 2 Hours",
          type: "delay",
          delay: 2,
          nextStepId: "s3",
        },
        {
          id: "s3",
          name: "Brochure Email",
          type: "email",
          template: "project_brochure",
          nextStepId: "s4",
        },
      ],
      isActive: true,
      participants: 89,
      completionRate: 78.2,
      avgEngagementTime: 89,
      createdAt: "2024-01-15",
    },
  ]);

  const [emailTemplates] = useState<EmailTemplate[]>([
    {
      id: "tmpl-1",
      name: "Welcome to Skyline Towers",
      category: "Welcome",
      subject: "Welcome! Your Dream Home at Skyline Towers Awaits",
      previewText:
        "Thank you for your interest in Skyline Towers. Let's find your perfect home.",
      htmlContent: `<div>Welcome email content...</div>`,
      textContent: "Welcome to Skyline Towers...",
      project: "Skyline Towers",
      thumbnail: "/templates/welcome-skyline.jpg",
      isActive: true,
      usage: 234,
      openRate: 67.8,
      clickRate: 23.4,
      createdAt: "2024-01-10",
    },
    {
      id: "tmpl-2",
      name: "Green Valley Brochure",
      category: "Brochure",
      subject: "Discover Green Valley - Your Natural Paradise",
      previewText:
        "Explore our beautiful Green Valley project with this digital brochure.",
      htmlContent: `<div>Brochure content...</div>`,
      textContent: "Green Valley brochure...",
      project: "Green Valley",
      thumbnail: "/templates/brochure-green-valley.jpg",
      isActive: true,
      usage: 156,
      openRate: 72.5,
      clickRate: 18.9,
      createdAt: "2024-01-15",
    },
    {
      id: "tmpl-3",
      name: "Premium Villas Collection",
      category: "Promotional",
      subject: "Exclusive Preview: Premium Villas Collection",
      previewText: "Be among the first to explore our luxury villa collection.",
      htmlContent: `<div>Premium content...</div>`,
      textContent: "Premium Villas...",
      project: "Premium Villas",
      thumbnail: "/templates/premium-villas.jpg",
      isActive: true,
      usage: 89,
      openRate: 78.2,
      clickRate: 31.7,
      createdAt: "2024-01-05",
    },
  ]);

  const [leadScores] = useState<LeadScore[]>([
    {
      id: "score-1",
      leadId: "lead-001",
      leadName: "Priya Sharma",
      project: "Skyline Towers",
      score: 92,
      grade: "A",
      touchpoints: [
        {
          id: "tp1",
          type: "Email Open",
          timestamp: "2024-01-20 09:30",
          value: 5,
          description: "Opened welcome email",
          source: "Email Campaign",
        },
        {
          id: "tp2",
          type: "Page Visit",
          timestamp: "2024-01-20 10:15",
          value: 10,
          description: "Visited project gallery page",
          source: "Website",
        },
        {
          id: "tp3",
          type: "Download",
          timestamp: "2024-01-20 10:45",
          value: 15,
          description: "Downloaded project brochure",
          source: "Email Campaign",
        },
        {
          id: "tp4",
          type: "Form Fill",
          timestamp: "2024-01-21 14:20",
          value: 25,
          description: "Requested site visit",
          source: "Website",
        },
        {
          id: "tp5",
          type: "Call",
          timestamp: "2024-01-22 11:00",
          value: 20,
          description: "Phone consultation",
          source: "Sales Team",
        },
      ],
      lastActivity: "2024-01-22 11:00",
      probability: 89.5,
      nextBestAction: "Schedule site visit",
    },
    {
      id: "score-2",
      leadId: "lead-002",
      leadName: "Rajesh Kumar",
      project: "Green Valley",
      score: 76,
      grade: "B",
      touchpoints: [
        {
          id: "tp6",
          type: "Email Open",
          timestamp: "2024-01-19 16:45",
          value: 5,
          description: "Opened project announcement",
          source: "Newsletter",
        },
        {
          id: "tp7",
          type: "Page Visit",
          timestamp: "2024-01-20 08:30",
          value: 10,
          description: "Visited pricing page",
          source: "Website",
        },
        {
          id: "tp8",
          type: "Link Click",
          timestamp: "2024-01-21 19:15",
          value: 8,
          description: "Clicked on floor plan link",
          source: "Email Campaign",
        },
      ],
      lastActivity: "2024-01-21 19:15",
      probability: 72.8,
      nextBestAction: "Send personalized offer",
    },
    {
      id: "score-3",
      leadId: "lead-003",
      leadName: "Anjali Patel",
      project: "Premium Villas",
      score: 58,
      grade: "C",
      touchpoints: [
        {
          id: "tp9",
          type: "Email Open",
          timestamp: "2024-01-18 12:20",
          value: 5,
          description: "Opened monthly newsletter",
          source: "Newsletter",
        },
        {
          id: "tp10",
          type: "Page Visit",
          timestamp: "2024-01-18 12:25",
          value: 10,
          description: "Visited homepage",
          source: "Website",
        },
      ],
      lastActivity: "2024-01-18 12:25",
      probability: 45.2,
      nextBestAction: "Re-engagement campaign",
    },
  ]);

  // Calculate marketing metrics
  const marketingStats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter((c) => c.status === "Active").length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalLeads: campaigns.reduce((sum, c) => sum + c.leads, 0),
    totalBookings: campaigns.reduce((sum, c) => sum + c.bookings, 0),
    avgCPL: campaigns.reduce((sum, c) => sum + c.cpl, 0) / campaigns.length,
    avgROI: campaigns.reduce((sum, c) => sum + c.rois, 0) / campaigns.length,
    activeJourneys: journeys.filter((j) => j.isActive).length,
    avgEngagement:
      journeys.reduce((sum, j) => sum + j.completionRate, 0) / journeys.length,
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    if (score >= 40) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Paused":
        return "bg-yellow-100 text-yellow-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
                  to="/crm"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to CRM
                </Link>
              </Button>
            </div>
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
              Marketing Automation & Campaigns
            </h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Project-specific marketing journeys, automated campaigns, email
              designer, and lead nurturing with ROI tracking
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <PulsingDot className="text-green-500" />
                {marketingStats.activeCampaigns} Active Campaigns
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <Target className="h-4 w-4 text-blue-500" />₹
                {marketingStats.avgCPL.toFixed(0)} Avg CPL
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                {marketingStats.avgROI.toFixed(1)}% ROI
              </Badge>
            </div>
            <Button
              onClick={() => setShowCreateCampaignModal(true)}
              className="w-full sm:w-auto"
            >
              <AnimatedIcon icon={Plus} className="mr-2" />
              Create Campaign
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
              value="overview"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Over</span>
            </TabsTrigger>
            <TabsTrigger
              value="campaigns"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Megaphone className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Campaigns</span>
              <span className="sm:hidden">Camp</span>
            </TabsTrigger>
            <TabsTrigger
              value="journeys"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Workflow className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Journeys</span>
              <span className="lg:hidden">Journey</span>
            </TabsTrigger>
            <TabsTrigger
              value="email-designer"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Palette className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Email Designer</span>
              <span className="lg:hidden">Design</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <PieChart className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Analytics</span>
              <span className="lg:hidden">Anal</span>
            </TabsTrigger>
            <TabsTrigger
              value="lead-scoring"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Star className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Lead Scoring</span>
              <span className="lg:hidden">Score</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Marketing Stats */}
            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Megaphone className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {marketingStats.totalCampaigns}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Total Campaigns
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Play className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {marketingStats.activeCampaigns}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Active Now
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        ₹{(marketingStats.totalSpent / 100000).toFixed(1)}L
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Total Spent
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-6 w-6 lg:h-8 lg:w-8 text-orange-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {marketingStats.totalLeads}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Leads Generated
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Home className="h-6 w-6 lg:h-8 lg:w-8 text-teal-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {marketingStats.totalBookings}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Bookings
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {marketingStats.avgROI.toFixed(1)}%
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Avg ROI
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Zap} animation="pulse" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Common marketing tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="w-full justify-start" variant="outline">
                      <Megaphone className="mr-2 h-4 w-4" />
                      Create Campaign
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Workflow className="mr-2 h-4 w-4" />
                      Build Journey
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Palette className="mr-2 h-4 w-4" />
                      Design Email
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Activity} animation="float" />
                    Campaign Performance
                  </CardTitle>
                  <CardDescription>
                    Real-time performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Skyline Towers Launch</span>
                      <Badge className="bg-green-100 text-green-800">
                        285.7% ROI
                      </Badge>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Green Valley Weekend</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        156.8% ROI
                      </Badge>
                    </div>
                    <Progress value={59} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Premium Villas Nurture</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        198.5% ROI
                      </Badge>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={Megaphone} animation="bounce" />
                  Recent Campaigns
                </CardTitle>
                <CardDescription>
                  Latest marketing campaigns and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Leads</TableHead>
                      <TableHead>CPL</TableHead>
                      <TableHead>ROI</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.slice(0, 3).map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {campaign.type}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{campaign.project}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{campaign.leads}</TableCell>
                        <TableCell>₹{campaign.cpl.toFixed(0)}</TableCell>
                        <TableCell className="text-green-600 font-medium">
                          {campaign.rois.toFixed(1)}%
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
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Campaign
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                View Analytics
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            {/* Campaign Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search campaigns..."
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        <SelectItem value="skyline">Skyline Towers</SelectItem>
                        <SelectItem value="green">Green Valley</SelectItem>
                        <SelectItem value="premium">Premium Villas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setShowCreateCampaignModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Campaigns Grid - Mobile Optimized */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <Card
                  key={campaign.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          {campaign.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {campaign.type}
                          </Badge>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
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
                            Edit Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {campaign.status === "Active" ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause Campaign
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Resume Campaign
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Project:</span>
                          <span className="font-medium">
                            {campaign.project}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="font-bold text-blue-600">
                            {campaign.leads}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Leads
                          </div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-bold text-green-600">
                            {campaign.bookings}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Bookings
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>CPL:</span>
                          <span className="font-medium">
                            ₹{campaign.cpl.toFixed(0)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>ROI:</span>
                          <span className="font-medium text-green-600">
                            {campaign.rois.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Budget Used:</span>
                          <span className="font-medium">
                            {((campaign.spent / campaign.budget) * 100).toFixed(
                              1,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={(campaign.spent / campaign.budget) * 100}
                          className="h-2"
                        />
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <BarChart3 className="mr-1 h-3 w-3" />
                            Analytics
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

          {/* Journeys Tab */}
          <TabsContent value="journeys" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Marketing Journeys</h3>
                <p className="text-sm text-muted-foreground">
                  Project-specific automated customer journeys and workflows
                </p>
              </div>
              <Button onClick={() => setShowJourneyBuilderModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Build Journey
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {journeys.map((journey) => (
                <Card
                  key={journey.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          {journey.name}
                        </CardTitle>
                        <CardDescription>{journey.description}</CardDescription>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{journey.project}</Badge>
                          <Badge
                            className={
                              journey.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {journey.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      <Switch checked={journey.isActive} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="font-bold text-blue-600">
                            {journey.participants}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Participants
                          </div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-bold text-green-600">
                            {journey.completionRate}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Completion
                          </div>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <div className="font-bold text-purple-600">
                            {journey.avgEngagementTime}m
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Avg Time
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Journey Steps:</h4>
                        <div className="space-y-1">
                          {journey.steps.slice(0, 3).map((step, index) => (
                            <div
                              key={step.id}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </div>
                              <span>{step.name}</span>
                              {step.type === "delay" && (
                                <Badge variant="outline" className="text-xs">
                                  {step.delay}h delay
                                </Badge>
                              )}
                            </div>
                          ))}
                          {journey.steps.length > 3 && (
                            <div className="text-sm text-muted-foreground ml-8">
                              +{journey.steps.length - 3} more steps
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <BarChart3 className="mr-1 h-3 w-3" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Email Designer Tab */}
          <TabsContent value="email-designer" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Email Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Design and manage email templates with project brochures
                </p>
              </div>
              <Button onClick={() => setShowEmailDesignerModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {emailTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                        {template.project && (
                          <Badge variant="outline" className="text-xs">
                            {template.project}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="text-sm">
                        <div className="font-medium mb-1">Subject Line:</div>
                        <div className="text-muted-foreground line-clamp-2">
                          {template.subject}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="font-bold text-blue-600">
                            {template.usage}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Uses
                          </div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-bold text-green-600">
                            {template.openRate}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Open Rate
                          </div>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <div className="font-bold text-purple-600">
                            {template.clickRate}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Click Rate
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="mr-1 h-3 w-3" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Copy className="mr-1 h-3 w-3" />
                          Clone
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Campaign ROI Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {campaign.name}
                          </span>
                          <Badge className="bg-green-100 text-green-800">
                            {campaign.rois.toFixed(1)}% ROI
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-medium">
                              ₹{campaign.cpc.toFixed(0)}
                            </div>
                            <div className="text-muted-foreground">CPC</div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="font-medium">
                              ₹{campaign.cpl.toFixed(0)}
                            </div>
                            <div className="text-muted-foreground">CPL</div>
                          </div>
                          <div className="text-center p-2 bg-purple-50 rounded">
                            <div className="font-medium">
                              ₹{campaign.cpb.toFixed(0)}
                            </div>
                            <div className="text-muted-foreground">CPB</div>
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
                    <PieChart className="h-5 w-5" />
                    Budget Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{campaign.name}</span>
                          <span>₹{(campaign.budget / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(campaign.spent / campaign.budget) * 100}
                            className="flex-1 h-2"
                          />
                          <span className="text-xs text-muted-foreground w-12">
                            {((campaign.spent / campaign.budget) * 100).toFixed(
                              0,
                            )}
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
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-medium">Lead Generation Funnel</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                        <span className="text-sm">Total Impressions</span>
                        <span className="font-bold">
                          {campaigns
                            .reduce((sum, c) => sum + c.impressions, 0)
                            .toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                        <span className="text-sm">Total Clicks</span>
                        <span className="font-bold">
                          {campaigns
                            .reduce((sum, c) => sum + c.clicks, 0)
                            .toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                        <span className="text-sm">Total Leads</span>
                        <span className="font-bold">
                          {campaigns.reduce((sum, c) => sum + c.leads, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                        <span className="text-sm">Total Bookings</span>
                        <span className="font-bold">
                          {campaigns.reduce((sum, c) => sum + c.bookings, 0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Journey Performance</h4>
                    <div className="space-y-3">
                      {journeys.map((journey) => (
                        <div key={journey.id} className="p-3 border rounded">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">
                              {journey.name}
                            </span>
                            <Badge variant="outline">{journey.stage}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">
                                Participants:{" "}
                              </span>
                              <span className="font-medium">
                                {journey.participants}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Completion:{" "}
                              </span>
                              <span className="font-medium">
                                {journey.completionRate}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lead Scoring Tab */}
          <TabsContent value="lead-scoring" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Lead Nurture Scoring</h3>
                <p className="text-sm text-muted-foreground">
                  Multi-touchpoint lead scoring with engagement tracking
                </p>
              </div>
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Configure Scoring
              </Button>
            </div>

            <div className="grid gap-4">
              {leadScores.map((lead) => (
                <Card
                  key={lead.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{lead.leadName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {lead.project}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getScoreColor(lead.score)}>
                              Grade {lead.grade}
                            </Badge>
                            <div className="text-2xl font-bold text-blue-600">
                              {lead.score}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-sm">
                            <span>Conversion Probability:</span>
                            <span className="font-medium">
                              {lead.probability}%
                            </span>
                          </div>
                          <Progress value={lead.probability} className="h-2" />
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Last Activity: {lead.lastActivity}</span>
                          <span>•</span>
                          <span>Next: {lead.nextBestAction}</span>
                        </div>
                      </div>

                      <div className="md:w-80">
                        <h4 className="text-sm font-medium mb-2">
                          Recent Touchpoints
                        </h4>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {lead.touchpoints.slice(0, 3).map((touchpoint) => (
                            <div
                              key={touchpoint.id}
                              className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span>{touchpoint.type}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-green-600 font-medium">
                                  +{touchpoint.value}
                                </span>
                                <span className="text-muted-foreground">
                                  {touchpoint.timestamp.split(" ")[0]}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Campaign Modal */}
        <Dialog
          open={showCreateCampaignModal}
          onOpenChange={setShowCreateCampaignModal}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Set up a new marketing campaign with automated workflows
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="Enter campaign name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-type">Campaign Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Campaign</SelectItem>
                      <SelectItem value="sms">SMS Campaign</SelectItem>
                      <SelectItem value="whatsapp">
                        WhatsApp Campaign
                      </SelectItem>
                      <SelectItem value="multi">Multi-Channel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project">Project</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skyline">Skyline Towers</SelectItem>
                      <SelectItem value="green">Green Valley</SelectItem>
                      <SelectItem value="premium">Premium Villas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (₹)</Label>
                  <Input id="budget" type="number" placeholder="Enter budget" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <Textarea
                  id="target-audience"
                  placeholder="Describe your target audience..."
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateCampaignModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Campaign</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Journey Builder Modal */}
        <Dialog
          open={showJourneyBuilderModal}
          onOpenChange={setShowJourneyBuilderModal}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Journey Builder</DialogTitle>
              <DialogDescription>
                Create automated customer journeys with triggers and actions
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="journey-name">Journey Name</Label>
                  <Input id="journey-name" placeholder="Enter journey name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="journey-project">Project</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skyline">Skyline Towers</SelectItem>
                      <SelectItem value="green">Green Valley</SelectItem>
                      <SelectItem value="premium">Premium Villas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="journey-description">Description</Label>
                <Textarea
                  id="journey-description"
                  placeholder="Describe your journey..."
                  rows={2}
                />
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Workflow className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Visual Journey Builder</h3>
                    <p className="text-sm text-muted-foreground">
                      Drag and drop components to build your customer journey
                    </p>
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Add Email
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Add SMS
                    </Button>
                    <Button variant="outline" size="sm">
                      <Timer className="mr-2 h-4 w-4" />
                      Add Delay
                    </Button>
                    <Button variant="outline" size="sm">
                      <GitBranch className="mr-2 h-4 w-4" />
                      Add Condition
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowJourneyBuilderModal(false)}
                >
                  Cancel
                </Button>
                <Button>Save Journey</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Email Designer Modal */}
        <Dialog
          open={showEmailDesignerModal}
          onOpenChange={setShowEmailDesignerModal}
        >
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Email Template Designer</DialogTitle>
              <DialogDescription>
                Design beautiful email templates with project brochures
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input id="template-name" placeholder="Enter template name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">Welcome</SelectItem>
                      <SelectItem value="followup">Follow-up</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="brochure">Brochure</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-project">Project</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skyline">Skyline Towers</SelectItem>
                      <SelectItem value="green">Green Valley</SelectItem>
                      <SelectItem value="premium">Premium Villas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject-line">Subject Line</Label>
                  <Input id="subject-line" placeholder="Enter subject line" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preview-text">Preview Text</Label>
                  <Input id="preview-text" placeholder="Enter preview text" />
                </div>

                <div className="space-y-2">
                  <Label>Design Elements</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Type className="mr-2 h-4 w-4" />
                      Text
                    </Button>
                    <Button variant="outline" size="sm">
                      <Image className="mr-2 h-4 w-4" />
                      Image
                    </Button>
                    <Button variant="outline" size="sm">
                      <Square className="mr-2 h-4 w-4" />
                      Button
                    </Button>
                    <Button variant="outline" size="sm">
                      <Layout className="mr-2 h-4 w-4" />
                      Layout
                    </Button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-96">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Palette className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Canvas</h3>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop elements to design your email template
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                        <div className="text-sm font-medium">
                          Header Section
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Company logo and navigation
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-200 rounded">
                        <div className="text-sm font-medium">Content Area</div>
                        <div className="text-xs text-muted-foreground">
                          Main email content and project details
                        </div>
                      </div>
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded">
                        <div className="text-sm font-medium">
                          Footer Section
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Contact information and unsubscribe
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowEmailDesignerModal(false)}
              >
                Cancel
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
