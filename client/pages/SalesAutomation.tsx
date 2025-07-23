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
  Bot,
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
  Home,
  Building,
  UserCheck,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MessageCircle,
  Navigation,
  Compass,
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
  Megaphone,
  Headphones,
} from "lucide-react";
import {
  AnimatedIcon,
  PulsingDot,
  LoadingSpinner,
  GlowingOrb,
} from "@/components/ui/animated-icons";

// Sales Automation interfaces
interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type:
      | "stage_change"
      | "time_based"
      | "activity"
      | "lead_aging"
      | "geo_proximity"
      | "custom";
    condition: string;
    value: string;
  };
  actions: AutomationAction[];
  isActive: boolean;
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
  successRate: number;
  category:
    | "Site Visit"
    | "Follow-up"
    | "Nurturing"
    | "Lead Routing"
    | "Stage Movement";
}

interface AutomationAction {
  id: string;
  type:
    | "send_sms"
    | "send_whatsapp"
    | "send_email"
    | "schedule_call"
    | "assign_lead"
    | "move_stage"
    | "create_task"
    | "notify_agent";
  template?: string;
  delay?: number; // minutes
  parameters: Record<string, any>;
}

interface Template {
  id: string;
  name: string;
  type: "SMS" | "WhatsApp" | "Email";
  category:
    | "Site Visit"
    | "Follow-up"
    | "Welcome"
    | "Reminder"
    | "Proposal"
    | "Thank You";
  subject?: string; // for emails
  content: string;
  variables: string[]; // Available merge variables
  usage: number;
  successRate: number;
  isActive: boolean;
  createdAt: string;
  language: "English" | "Hindi" | "Regional";
}

interface GeoRoute {
  id: string;
  name: string;
  territory: string;
  boundaries: {
    lat: number;
    lng: number;
  }[];
  assignedAgents: string[];
  activeLeads: number;
  responseTime: number; // minutes
  conversionRate: number;
  isActive: boolean;
}

interface SmartNudge {
  id: string;
  name: string;
  condition: string;
  message: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  triggerType:
    | "Stage Delay"
    | "Inactivity"
    | "Follow-up Due"
    | "Hot Lead"
    | "Competition";
  targetAudience: "Agent" | "Manager" | "Customer";
  isActive: boolean;
  triggerCount: number;
  actionTaken: number;
}

interface FollowUpSchedule {
  id: string;
  leadId: string;
  leadName: string;
  customerName: string;
  scheduledDate: string;
  scheduledTime: string;
  type: "Call" | "Email" | "WhatsApp" | "Site Visit" | "Meeting";
  assignedAgent: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Pending" | "Completed" | "Missed" | "Rescheduled";
  notes?: string;
  outcome?: string;
  nextAction?: string;
}

interface ActivityTracking {
  id: string;
  leadId: string;
  agentId: string;
  type:
    | "Call"
    | "Email"
    | "WhatsApp"
    | "SMS"
    | "Site Visit"
    | "Meeting"
    | "Proposal";
  description: string;
  timestamp: string;
  duration?: number; // minutes
  outcome: "Positive" | "Negative" | "Neutral" | "No Response";
  nextSteps: string;
  automationTriggered?: boolean;
}

interface LeadAging {
  id: string;
  leadId: string;
  leadName: string;
  customerName: string;
  currentStage: string;
  daysInStage: number;
  lastActivity: string;
  alertLevel: "Green" | "Yellow" | "Orange" | "Red";
  assignedAgent: string;
  recommendedAction: string;
  automationSuggestion: string;
}

export default function SalesAutomation() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [showCreateRuleModal, setShowCreateRuleModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  // Sample data
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: "1",
      name: "Lead Welcome Sequence",
      description: "Automatically welcome new leads entering the CRM pipeline",
      trigger: {
        type: "stage_change",
        condition: "enters_pipeline",
        value: "new_lead",
      },
      actions: [
        {
          id: "a1",
          type: "send_email",
          template: "lead_welcome_email",
          delay: 0,
          parameters: {
            includeCompanyInfo: true,
            personalized: true,
          },
        },
        {
          id: "a1b",
          type: "send_whatsapp",
          template: "welcome_whatsapp",
          delay: 30,
          parameters: {
            language: "hindi_english",
          },
        },
      ],
      isActive: true,
      createdAt: "2024-02-15",
      lastTriggered: "2024-03-15",
      triggerCount: 234,
      successRate: 94.2,
      category: "Nurturing",
    },
    {
      id: "2",
      name: "Qualified Lead Follow-up",
      description: "Automated follow-up when lead moves to qualified stage",
      trigger: {
        type: "stage_change",
        condition: "stage_qualified",
        value: "qualified",
      },
      actions: [
        {
          id: "a2",
          type: "send_email",
          template: "qualified_lead_followup",
          delay: 60,
          parameters: {
            priority: "high",
            includeBrochure: true,
          },
        },
        {
          id: "a3",
          type: "schedule_call",
          delay: 1440,
          parameters: {
            duration: 30,
            autoSchedule: true,
          },
        },
      ],
      isActive: true,
      createdAt: "2024-02-10",
      lastTriggered: "2024-03-14",
      triggerCount: 156,
      successRate: 87.3,
      category: "Follow-up",
    },
    {
      id: "3",
      name: "Deal Close Reminder",
      description: "Send closing sequence when deal reaches negotiation stage",
      trigger: {
        type: "stage_change",
        condition: "stage_negotiation",
        value: "negotiation",
      },
      actions: [
        {
          id: "a4",
          type: "send_email",
          template: "deal_closing_sequence",
          delay: 120,
          parameters: {
            includeSpecialOffer: true,
            urgency: "high",
          },
        },
        {
          id: "a4b",
          type: "notify_agent",
          delay: 0,
          parameters: {
            message: "Deal in negotiation - follow up required",
            priority: "high",
          },
        },
      ],
      isActive: true,
      createdAt: "2024-01-20",
      triggerCount: 445,
      successRate: 76.5,
      category: "Stage Movement",
    },
    {
      id: "4",
      name: "Customer Onboarding",
      description: "Automate onboarding sequence after deal is closed",
      trigger: {
        type: "stage_change",
        condition: "stage_closed_won",
        value: "closed_won",
      },
      actions: [
        {
          id: "a5",
          type: "send_email",
          template: "welcome_customer_email",
          delay: 60,
          parameters: {
            includeNextSteps: true,
            assignAccountManager: true,
          },
        },
        {
          id: "a6",
          type: "create_task",
          delay: 1440,
          parameters: {
            taskType: "customer_check_in",
            assignTo: "account_manager",
          },
        },
      ],
      isActive: true,
      createdAt: "2024-03-01",
      triggerCount: 89,
      successRate: 92.5,
      category: "Nurturing",
    },
  ]);

  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Lead Welcome Email",
      type: "Email",
      category: "Welcome",
      subject:
        "Welcome to {{company_name}} - Let's Find Your Perfect Solution!",
      content:
        "Dear {{customer_name}},\n\nThank you for your interest in {{company_name}}! We're excited to help you with {{inquiry_type}}.\n\nYour dedicated sales representative {{agent_name}} will contact you within 24 hours to understand your requirements better.\n\nMeanwhile, here's what we can offer:\n- {{service_1}}\n- {{service_2}}\n- {{service_3}}\n\nBest regards,\n{{company_name}} Sales Team",
      variables: [
        "customer_name",
        "company_name",
        "inquiry_type",
        "agent_name",
        "service_1",
        "service_2",
        "service_3",
      ],
      usage: 234,
      successRate: 94.5,
      isActive: true,
      createdAt: "2024-02-15",
      language: "English",
    },
    {
      id: "2",
      name: "Qualified Lead Follow-up",
      type: "Email",
      category: "Follow-up",
      subject: "Next Steps for Your {{solution_type}} Requirements",
      content:
        "Dear {{customer_name}},\n\nGreat news! Based on our initial discussion, you qualify for our premium {{solution_type}} offerings.\n\nI've attached a detailed proposal that includes:\n- Customized solution overview\n- Pricing options\n- Timeline and implementation plan\n\nI'd love to schedule a call to walk through these details. When would be a good time for you?\n\nLooking forward to moving forward together!\n\nBest regards,\n{{agent_name}}\n{{company_name}}",
      variables: [
        "customer_name",
        "solution_type",
        "agent_name",
        "company_name",
      ],
      usage: 156,
      successRate: 87.3,
      isActive: true,
      createdAt: "2024-02-10",
      language: "English",
    },
    {
      id: "3",
      name: "Deal Closing Sequence",
      type: "Email",
      category: "Proposal",
      subject: "Special Offer: Close Your {{solution_type}} Deal This Week!",
      content:
        "Dear {{customer_name}},\n\nI hope our recent discussions have been helpful in understanding how {{solution_type}} can benefit your business.\n\nTo move forward quickly, I'm excited to offer you a special incentive:\n- {{special_offer}}\n- {{additional_benefit}}\n- Extended support package included\n\nThis offer is valid until {{expiry_date}}. \n\nShall we schedule a final call to close this deal? I'm confident this solution will exceed your expectations.\n\nBest regards,\n{{agent_name}}\n{{company_name}}",
      variables: [
        "customer_name",
        "solution_type",
        "special_offer",
        "additional_benefit",
        "expiry_date",
        "agent_name",
        "company_name",
      ],
      usage: 445,
      successRate: 76.5,
      isActive: true,
      createdAt: "2024-01-20",
      language: "English",
    },
    {
      id: "4",
      name: "Customer Welcome & Onboarding",
      type: "Email",
      category: "Welcome",
      subject:
        "Welcome to the {{company_name}} Family! Your Journey Begins Now",
      content:
        "Dear {{customer_name}},\n\nCongratulations and welcome to the {{company_name}} family! 🎉\n\nWe're thrilled to have you on board. Your {{solution_type}} journey starts now, and we're here to ensure it's smooth and successful.\n\nNext Steps:\n1. Your account manager {{account_manager}} will contact you within 24 hours\n2. Implementation kickoff scheduled for {{implementation_date}}\n3. Access to our customer portal: {{portal_link}}\n\nIf you have any questions, don't hesitate to reach out. We're here to help!\n\nWelcome aboard!\n\n{{company_name}} Customer Success Team",
      variables: [
        "customer_name",
        "company_name",
        "solution_type",
        "account_manager",
        "implementation_date",
        "portal_link",
      ],
      usage: 189,
      successRate: 92.5,
      isActive: true,
      createdAt: "2024-02-25",
      language: "English",
    },
  ]);

  const [geoRoutes, setGeoRoutes] = useState<GeoRoute[]>([
    {
      id: "1",
      name: "Mumbai Central",
      territory: "Mumbai",
      boundaries: [
        { lat: 19.0176, lng: 72.8562 },
        { lat: 19.076, lng: 72.8777 },
        { lat: 19.0896, lng: 72.8656 },
      ],
      assignedAgents: ["Priya Sharma", "Rajesh Kumar"],
      activeLeads: 67,
      responseTime: 18,
      conversionRate: 24.5,
      isActive: true,
    },
    {
      id: "2",
      name: "Pune Region",
      territory: "Pune",
      boundaries: [
        { lat: 18.5204, lng: 73.8567 },
        { lat: 18.5793, lng: 73.8567 },
        { lat: 18.5204, lng: 73.9297 },
      ],
      assignedAgents: ["Anjali Patel", "Amit Singh"],
      activeLeads: 89,
      responseTime: 22,
      conversionRate: 28.3,
      isActive: true,
    },
    {
      id: "3",
      name: "Delhi NCR",
      territory: "Delhi",
      boundaries: [
        { lat: 28.7041, lng: 77.1025 },
        { lat: 28.7041, lng: 77.391 },
        { lat: 28.4089, lng: 77.391 },
      ],
      assignedAgents: ["Meera Singh", "Vikash Gupta"],
      activeLeads: 134,
      responseTime: 15,
      conversionRate: 31.2,
      isActive: true,
    },
  ]);

  const [smartNudges, setSmartNudges] = useState<SmartNudge[]>([
    {
      id: "1",
      name: "Site Visit Follow-up",
      condition: "Site visit completed but no follow-up in 2 days",
      message:
        "Customer {{customer_name}} visited site 2 days ago. Time for follow-up call!",
      priority: "High",
      triggerType: "Follow-up Due",
      targetAudience: "Agent",
      isActive: true,
      triggerCount: 45,
      actionTaken: 38,
    },
    {
      id: "2",
      name: "Proposal Pending",
      condition: "Proposal requested but not sent in 24 hours",
      message:
        "{{customer_name}} is waiting for proposal. Send immediately to avoid losing interest!",
      priority: "Critical",
      triggerType: "Stage Delay",
      targetAudience: "Agent",
      isActive: true,
      triggerCount: 23,
      actionTaken: 21,
    },
    {
      id: "3",
      name: "Competition Alert",
      condition: "Lead mentions competitor name in conversation",
      message:
        "Competition alert! {{customer_name}} mentioned {{competitor_name}}. Immediate action required!",
      priority: "Critical",
      triggerType: "Competition",
      targetAudience: "Manager",
      isActive: true,
      triggerCount: 12,
      actionTaken: 12,
    },
  ]);

  const [followUpSchedules, setFollowUpSchedules] = useState<
    FollowUpSchedule[]
  >([
    {
      id: "1",
      leadId: "lead1",
      leadName: "Premium 3BHK Inquiry",
      customerName: "Rajesh Kumar Sharma",
      scheduledDate: "2024-03-16",
      scheduledTime: "15:00",
      type: "Call",
      assignedAgent: "Priya Sharma",
      priority: "High",
      status: "Pending",
      notes: "Follow-up on site visit feedback",
    },
    {
      id: "2",
      leadId: "lead2",
      leadName: "Corporate Bulk Purchase",
      customerName: "TechCorp Solutions",
      scheduledDate: "2024-03-16",
      scheduledTime: "10:30",
      type: "Meeting",
      assignedAgent: "Anjali Patel",
      priority: "Critical",
      status: "Pending",
      notes: "Final proposal presentation",
    },
    {
      id: "3",
      leadId: "lead3",
      leadName: "Investment Property",
      customerName: "Anita Patel",
      scheduledDate: "2024-03-17",
      scheduledTime: "14:00",
      type: "Site Visit",
      assignedAgent: "Rajesh Kumar",
      priority: "Medium",
      status: "Pending",
      notes: "Second property viewing",
    },
  ]);

  const [leadAging, setLeadAging] = useState<LeadAging[]>([
    {
      id: "1",
      leadId: "lead1",
      leadName: "Premium 3BHK Inquiry",
      customerName: "Rajesh Kumar Sharma",
      currentStage: "Negotiation",
      daysInStage: 12,
      lastActivity: "2024-03-14",
      alertLevel: "Yellow",
      assignedAgent: "Priya Sharma",
      recommendedAction: "Schedule follow-up call",
      automationSuggestion: "Send gentle reminder WhatsApp",
    },
    {
      id: "2",
      leadId: "lead4",
      leadName: "First-time Buyer",
      customerName: "Ravi & Sneha Gupta",
      currentStage: "Qualified",
      daysInStage: 18,
      lastActivity: "2024-03-12",
      alertLevel: "Orange",
      assignedAgent: "Meera Singh",
      recommendedAction: "Immediate contact required",
      automationSuggestion: "Trigger urgent follow-up sequence",
    },
    {
      id: "3",
      leadId: "lead5",
      leadName: "Luxury Villa Inquiry",
      customerName: "Suresh Agarwal",
      currentStage: "Site Visit",
      daysInStage: 25,
      lastActivity: "2024-03-02",
      alertLevel: "Red",
      assignedAgent: "Vikash Gupta",
      recommendedAction: "Manager intervention needed",
      automationSuggestion: "Escalate to senior sales manager",
    },
  ]);

  // Automation statistics
  const automationStats = {
    totalRules: automationRules.length,
    activeRules: automationRules.filter((r) => r.isActive).length,
    avgSuccessRate:
      automationRules.reduce((sum, r) => sum + r.successRate, 0) /
      automationRules.length,
    totalTriggers: automationRules.reduce((sum, r) => sum + r.triggerCount, 0),
    responseTimeImprovement: 68, // percentage
    conversionIncrease: 23.5, // percentage
  };

  const handleCreateRule = async (data: any) => {
    try {
      const newRule: AutomationRule = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        trigger: {
          type: data.triggerType,
          condition: data.condition,
          value: data.value,
        },
        actions: [], // Will be added separately
        isActive: true,
        createdAt: new Date().toISOString().split("T")[0],
        triggerCount: 0,
        successRate: 0,
        category: data.category,
      };

      setAutomationRules((prev) => [newRule, ...prev]);
      setShowCreateRuleModal(false);
      reset();
      alert(`Automation rule "${newRule.name}" created successfully!`);
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-500";
      case "High":
        return "text-orange-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case "Red":
        return "bg-red-100 text-red-800";
      case "Orange":
        return "bg-orange-100 text-orange-800";
      case "Yellow":
        return "bg-yellow-100 text-yellow-800";
      case "Green":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Missed":
        return "bg-red-100 text-red-800";
      case "Rescheduled":
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
              CRM Sales Automation
            </h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Intelligent automation for customer journey, lead nurturing, deal
              progression, and sales workflow management
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <PulsingDot className="text-green-500" />
                {automationStats.activeRules} Active Rules
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <Zap className="h-4 w-4 text-blue-500" />
                {automationStats.avgSuccessRate.toFixed(1)}% Success Rate
              </Badge>
            </div>
            <Button
              onClick={() => setShowCreateRuleModal(true)}
              className="w-full sm:w-auto"
            >
              <AnimatedIcon icon={Plus} className="mr-2" />
              Create Rule
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
              value="rules"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Bot className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Rules</span>
              <span className="sm:hidden">Rules</span>
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <FileText className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Templates</span>
              <span className="sm:hidden">Temp</span>
            </TabsTrigger>
            <TabsTrigger
              value="geo-routing"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Navigation className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Geo-Routing</span>
              <span className="lg:hidden">Geo</span>
            </TabsTrigger>
            <TabsTrigger
              value="nudges"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Bell className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Smart Nudges</span>
              <span className="lg:hidden">Nudges</span>
            </TabsTrigger>
            <TabsTrigger
              value="schedules"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Calendar className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Schedules</span>
              <span className="lg:hidden">Sched</span>
            </TabsTrigger>
            <TabsTrigger
              value="aging"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <AlertTriangle className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Lead Aging</span>
              <span className="lg:hidden">Age</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Automation Stats */}
            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {automationStats.totalRules}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Total Rules
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {automationStats.activeRules}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Active Rules
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {automationStats.avgSuccessRate.toFixed(1)}%
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Success Rate
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-6 w-6 lg:h-8 lg:w-8 text-orange-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {automationStats.totalTriggers}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Total Triggers
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
                        {automationStats.responseTimeImprovement}%
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Faster Response
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
                        +{automationStats.conversionIncrease}%
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Conversion Boost
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
                    Common automation tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="w-full justify-start" variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Schedule Site Visit
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send WhatsApp
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Navigation className="mr-2 h-4 w-4" />
                      Route Lead
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Bell className="mr-2 h-4 w-4" />
                      Create Alert
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Templates Shortcuts</h4>
                    <div className="space-y-2">
                      {templates.slice(0, 3).map((template) => (
                        <div
                          key={template.id}
                          className="flex items-center justify-between p-2 border rounded"
                        >
                          <div>
                            <span className="font-medium text-sm">
                              {template.name}
                            </span>
                            <Badge className="ml-2 text-xs" variant="outline">
                              {template.type}
                            </Badge>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Send className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Activity} animation="bounce" />
                    Recent Automation Activity
                  </CardTitle>
                  <CardDescription>
                    Latest triggered rules and their outcomes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      rule: "Site Visit Auto-Reminder",
                      trigger: "2 hours ago",
                      outcome: "WhatsApp sent to Rajesh Kumar",
                      status: "Success",
                    },
                    {
                      rule: "Lead Aging Alert",
                      trigger: "3 hours ago",
                      outcome: "Agent notified - Meera Singh",
                      status: "Success",
                    },
                    {
                      rule: "Geo-Route Mumbai Leads",
                      trigger: "5 hours ago",
                      outcome: "Lead assigned to Priya Sharma",
                      status: "Success",
                    },
                    {
                      rule: "Hot Lead Instant Alert",
                      trigger: "6 hours ago",
                      outcome: "Call scheduled within 15 minutes",
                      status: "Success",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 border rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{activity.rule}</h4>
                        <p className="text-xs text-gray-600">
                          {activity.outcome}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {activity.trigger}
                          </span>
                          <Badge className="text-xs bg-green-100 text-green-800">
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Automation Performance</CardTitle>
                <CardDescription>
                  Track the impact of automation on sales performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      89.5%
                    </div>
                    <div className="text-sm text-gray-500">
                      Template Delivery Rate
                    </div>
                    <div className="text-xs text-green-600">
                      +12% from last month
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      18 min
                    </div>
                    <div className="text-sm text-gray-500">
                      Avg Response Time
                    </div>
                    <div className="text-xs text-green-600">
                      -45% improvement
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      94.2%
                    </div>
                    <div className="text-sm text-gray-500">
                      Lead Routing Accuracy
                    </div>
                    <div className="text-xs text-green-600">
                      +8% from last month
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      76.8%
                    </div>
                    <div className="text-sm text-gray-500">
                      Follow-up Compliance
                    </div>
                    <div className="text-xs text-green-600">
                      +23% improvement
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Automation Rules Tab */}
          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Automation Rules</CardTitle>
                    <CardDescription>
                      Manage and monitor your sales automation rules
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowCreateRuleModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Rule
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automationRules.map((rule) => (
                    <Card key={rule.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{rule.name}</h3>
                              <Badge
                                variant={
                                  rule.isActive ? "default" : "secondary"
                                }
                              >
                                {rule.isActive ? "Active" : "Inactive"}
                              </Badge>
                              <Badge variant="outline">{rule.category}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {rule.description}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Switch checked={rule.isActive} />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-4 text-sm">
                          <div>
                            <span className="text-gray-500">Triggers:</span>
                            <div className="font-medium">
                              {rule.triggerCount}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Success Rate:</span>
                            <div className="font-medium text-green-600">
                              {rule.successRate}%
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">
                              Last Triggered:
                            </span>
                            <div className="font-medium">
                              {rule.lastTriggered}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Actions:</span>
                            <div className="font-medium">
                              {rule.actions.length}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {rule.actions.map((action, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {action.type.replace("_", " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={MessageSquare} animation="pulse" />
                    Communication Templates
                  </CardTitle>
                  <CardDescription>
                    Auto-personalized SMS, WhatsApp, and Email templates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {templates.map((template) => (
                      <Card key={template.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">
                                  {template.name}
                                </h4>
                                <Badge variant="outline">{template.type}</Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {template.language}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {template.category}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="text-sm">
                            <p className="text-gray-700 bg-gray-50 p-2 rounded border line-clamp-3">
                              {template.content}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            <span className="text-xs text-gray-500">
                              Variables:
                            </span>
                            {template.variables
                              .slice(0, 3)
                              .map((variable, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {variable}
                                </Badge>
                              ))}
                            {template.variables.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.variables.length - 3}
                              </Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-xs">
                            <div>
                              <span className="text-gray-500">Usage:</span>
                              <div className="font-medium">
                                {template.usage}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Success:</span>
                              <div className="font-medium text-green-600">
                                {template.successRate}%
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Status:</span>
                              <Badge
                                className="text-xs"
                                variant={
                                  template.isActive ? "default" : "secondary"
                                }
                              >
                                {template.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Template Analytics</CardTitle>
                  <CardDescription>
                    Performance metrics for communication templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded">
                      <div className="text-xl font-bold text-blue-600">
                        {templates.length}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total Templates
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <div className="text-xl font-bold text-green-600">
                        {(
                          templates.reduce((sum, t) => sum + t.successRate, 0) /
                          templates.length
                        ).toFixed(1)}
                        %
                      </div>
                      <div className="text-sm text-gray-500">
                        Avg Success Rate
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Template Performance</h4>
                    <div className="space-y-3">
                      {templates.map((template) => (
                        <div key={template.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{template.name}</span>
                            <span>{template.successRate}%</span>
                          </div>
                          <Progress value={template.successRate} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Most Used Templates</h4>
                    <div className="space-y-2">
                      {templates
                        .sort((a, b) => b.usage - a.usage)
                        .slice(0, 3)
                        .map((template, index) => (
                          <div
                            key={template.id}
                            className="flex items-center justify-between p-2 border rounded"
                          >
                            <div>
                              <span className="font-medium text-sm">
                                {template.name}
                              </span>
                              <Badge className="ml-2 text-xs" variant="outline">
                                {template.type}
                              </Badge>
                            </div>
                            <span className="text-sm font-medium">
                              {template.usage} uses
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Geo-Routing Tab */}
          <TabsContent value="geo-routing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={Navigation} animation="glow" />
                  Geographic Lead Routing
                </CardTitle>
                <CardDescription>
                  Automatically route leads to nearest sales representatives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    {geoRoutes.map((route) => (
                      <Card key={route.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{route.name}</h3>
                              <p className="text-sm text-gray-600">
                                {route.territory}
                              </p>
                            </div>
                            <Switch checked={route.isActive} />
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">
                                Active Leads:
                              </span>
                              <div className="font-medium">
                                {route.activeLeads}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Response Time:
                              </span>
                              <div className="font-medium">
                                {route.responseTime} min
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Conversion:</span>
                              <div className="font-medium text-green-600">
                                {route.conversionRate}%
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Agents:</span>
                              <div className="font-medium">
                                {route.assignedAgents.length}
                              </div>
                            </div>
                          </div>

                          <div>
                            <span className="text-sm text-gray-500">
                              Assigned Agents:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {route.assignedAgents.map((agent, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {agent}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">
                        Routing Performance
                      </h4>
                      <div className="space-y-4">
                        <div className="text-center p-4 border rounded">
                          <div className="text-2xl font-bold text-blue-600">
                            290
                          </div>
                          <div className="text-sm text-gray-500">
                            Leads Routed Today
                          </div>
                        </div>
                        <div className="space-y-3">
                          {geoRoutes.map((route) => (
                            <div key={route.id} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{route.name}</span>
                                <span>{route.conversionRate}%</span>
                              </div>
                              <Progress value={route.conversionRate} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">Territory Coverage</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 border rounded">
                          <div className="text-lg font-bold">95%</div>
                          <div className="text-gray-500">Mumbai</div>
                        </div>
                        <div className="text-center p-3 border rounded">
                          <div className="text-lg font-bold">87%</div>
                          <div className="text-gray-500">Pune</div>
                        </div>
                        <div className="text-center p-3 border rounded">
                          <div className="text-lg font-bold">92%</div>
                          <div className="text-gray-500">Delhi NCR</div>
                        </div>
                        <div className="text-center p-3 border rounded">
                          <div className="text-lg font-bold">78%</div>
                          <div className="text-gray-500">Others</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Nudges Tab */}
          <TabsContent value="nudges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={Bell} animation="bounce" />
                  Smart Nudges
                </CardTitle>
                <CardDescription>
                  Intelligent alerts based on lead stage, time, and behavior
                  patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {smartNudges.map((nudge) => (
                    <Card key={nudge.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{nudge.name}</h3>
                              <Flag
                                className={`h-4 w-4 ${getPriorityColor(nudge.priority)}`}
                              />
                              <Badge variant="outline">
                                {nudge.triggerType}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {nudge.condition}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Switch checked={nudge.isActive} />
                          </div>
                        </div>

                        <div className="bg-blue-50 p-3 rounded border">
                          <p className="text-sm text-blue-800">
                            {nudge.message}
                          </p>
                        </div>

                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Target:</span>
                            <div className="font-medium">
                              {nudge.targetAudience}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Triggers:</span>
                            <div className="font-medium">
                              {nudge.triggerCount}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Actions:</span>
                            <div className="font-medium">
                              {nudge.actionTaken}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Success Rate:</span>
                            <div className="font-medium text-green-600">
                              {(
                                (nudge.actionTaken / nudge.triggerCount) *
                                100
                              ).toFixed(1)}
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Follow-up Schedules Tab */}
          <TabsContent value="schedules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={Calendar} animation="float" />
                  Follow-up Schedules
                </CardTitle>
                <CardDescription>
                  Automated scheduling and tracking of follow-up activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mobile Card View */}
                <div className="block lg:hidden space-y-4">
                  {followUpSchedules.map((schedule) => (
                    <Card key={schedule.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-sm line-clamp-2">
                              {schedule.leadName}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {schedule.customerName}
                            </p>
                          </div>
                          <Flag
                            className={`h-4 w-4 ${getPriorityColor(schedule.priority)}`}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500">Date & Time:</span>
                            <div className="font-medium">
                              {schedule.scheduledDate} {schedule.scheduledTime}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Type:</span>
                            <div className="font-medium">{schedule.type}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Agent:</span>
                            <div className="font-medium truncate">
                              {schedule.assignedAgent}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <Badge
                              className={`${getStatusColor(schedule.status)} text-xs`}
                            >
                              {schedule.status}
                            </Badge>
                          </div>
                        </div>

                        {schedule.notes && (
                          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            {schedule.notes}
                          </p>
                        )}

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Calendar className="h-3 w-3 mr-1" />
                            Reschedule
                          </Button>
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
                        <TableHead>Lead</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Agent</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {followUpSchedules.map((schedule) => (
                        <TableRow key={schedule.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {schedule.leadName}
                              </div>
                              {schedule.notes && (
                                <div className="text-sm text-gray-500">
                                  {schedule.notes}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{schedule.customerName}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {schedule.scheduledDate}
                              </div>
                              <div className="text-sm text-gray-500">
                                {schedule.scheduledTime}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{schedule.type}</Badge>
                          </TableCell>
                          <TableCell>{schedule.assignedAgent}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Flag
                                className={`h-4 w-4 ${getPriorityColor(schedule.priority)}`}
                              />
                              {schedule.priority}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(schedule.status)}>
                              {schedule.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <CheckCircle className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Calendar className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
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

          {/* Lead Aging Tab */}
          <TabsContent value="aging" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={AlertTriangle} animation="pulse" />
                  Lead Aging Alerts
                </CardTitle>
                <CardDescription>
                  Monitor and act on leads that require immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadAging.map((aging) => (
                    <Card key={aging.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {aging.leadName}
                              </h3>
                              <Badge
                                className={getAlertColor(aging.alertLevel)}
                              >
                                {aging.alertLevel}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {aging.customerName}
                            </p>
                          </div>
                          <div className="text-right text-sm">
                            <div className="font-medium">
                              {aging.daysInStage} days
                            </div>
                            <div className="text-gray-500">
                              in {aging.currentStage}
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 text-sm">
                          <div>
                            <span className="text-gray-500">
                              Last Activity:
                            </span>
                            <div className="font-medium">
                              {aging.lastActivity}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">
                              Assigned Agent:
                            </span>
                            <div className="font-medium">
                              {aging.assignedAgent}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-orange-50 p-3 rounded border">
                            <span className="text-sm font-medium text-orange-800">
                              Recommended Action:
                            </span>
                            <p className="text-sm text-orange-700">
                              {aging.recommendedAction}
                            </p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded border">
                            <span className="text-sm font-medium text-blue-800">
                              Automation Suggestion:
                            </span>
                            <p className="text-sm text-blue-700">
                              {aging.automationSuggestion}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Phone className="h-3 w-3 mr-1" />
                            Call Now
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            WhatsApp
                          </Button>
                          <Button size="sm" variant="outline">
                            <Bot className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Automation Rule Modal */}
      <Dialog open={showCreateRuleModal} onOpenChange={setShowCreateRuleModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AnimatedIcon icon={Plus} className="text-blue-600" />
              Create Automation Rule
            </DialogTitle>
            <DialogDescription>
              Set up a new automation rule to streamline your sales process
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleCreateRule)} className="space-y-6">
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Rule Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Rule Name *</Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Rule name is required" })}
                    placeholder="e.g., Site Visit Auto-Reminder"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Site Visit">Site Visit</SelectItem>
                          <SelectItem value="Follow-up">Follow-up</SelectItem>
                          <SelectItem value="Nurturing">Nurturing</SelectItem>
                          <SelectItem value="Lead Routing">
                            Lead Routing
                          </SelectItem>
                          <SelectItem value="Stage Movement">
                            Stage Movement
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Describe what this rule does..."
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Trigger Conditions</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="triggerType">Trigger Type *</Label>
                  <Controller
                    name="triggerType"
                    control={control}
                    rules={{ required: "Trigger type is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select trigger" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stage_change">
                            Stage Change
                          </SelectItem>
                          <SelectItem value="time_based">Time Based</SelectItem>
                          <SelectItem value="activity">Activity</SelectItem>
                          <SelectItem value="lead_aging">Lead Aging</SelectItem>
                          <SelectItem value="geo_proximity">
                            Geographic
                          </SelectItem>
                          <SelectItem value="custom">
                            Custom Condition
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Input
                    id="condition"
                    {...register("condition")}
                    placeholder="e.g., site_visit_scheduled"
                  />
                </div>
                <div>
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    {...register("value")}
                    placeholder="e.g., 2_hours_before"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateRuleModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Rule
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
