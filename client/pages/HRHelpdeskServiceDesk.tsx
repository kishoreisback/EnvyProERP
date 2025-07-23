import { useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Headphones,
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Calendar,
  MessageSquare,
  Search,
  Filter,
  Plus,
  BookOpen,
  FileText,
  HelpCircle,
  Lightbulb,
  Target,
  TrendingUp,
  BarChart3,
  Send,
  Bot,
  Mic,
  Phone,
  Mail,
  Star,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Edit,
  Reply,
  Forward,
  Archive,
  Tag,
  Paperclip,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Users,
  Building,
  MapPin,
  Zap,
  Shield,
  Award,
  Activity,
  TrendingDown,
  Minus,
  ArrowUp,
  ArrowDown,
  Timer,
  UserCheck,
  Coffee,
  Smartphone,
  Monitor,
  Globe,
  Database,
  Server,
  Wifi,
  Lock,
  Key,
  CreditCard,
  Home,
  Briefcase,
  GraduationCap,
  Heart,
  Smile,
  Frown,
  Meh,
  DollarSign,
} from "lucide-react";
import { BackToHRMS } from "@/components/hrms";

// Tickets Data
const tickets = [
  {
    id: 1,
    ticketId: "TKT-2024-001",
    title: "Unable to access payslip portal",
    description:
      "I'm unable to log into the payslip portal. Getting error message 'Invalid credentials' even though I'm using correct password.",
    category: "Payroll",
    subcategory: "Payslip Access",
    priority: "high",
    status: "in_progress",
    createdBy: {
      name: "Rajesh Kumar",
      department: "Engineering",
      avatar: "/placeholder.svg",
      employeeId: "ENG001",
      email: "rajesh.kumar@company.com",
      phone: "+91 9876543210",
    },
    assignedTo: {
      name: "Priya Singh",
      role: "HR Executive",
      avatar: "/placeholder.svg",
    },
    createdDate: "2024-12-23 10:30",
    lastUpdated: "2024-12-23 14:45",
    dueDate: "2024-12-24 18:00",
    slaTarget: "24 hours",
    timeSpent: "3.5 hours",
    resolution: "",
    attachments: ["screenshot-error.png", "browser-info.txt"],
    updates: [
      {
        timestamp: "2024-12-23 14:45",
        user: "Priya Singh",
        action: "comment",
        content:
          "I've reset your password and sent new credentials to your registered email. Please try logging in again.",
      },
      {
        timestamp: "2024-12-23 11:00",
        user: "Priya Singh",
        action: "assigned",
        content: "Ticket assigned to HR Executive for resolution",
      },
    ],
    satisfaction: null,
    tags: ["payslip", "login", "password", "urgent"],
    escalationLevel: 1,
  },
  {
    id: 2,
    ticketId: "TKT-2024-002",
    title: "Request for leave policy clarification",
    description:
      "I need clarification on the company leave policy regarding maternity leave entitlement and application process.",
    category: "Leave Management",
    subcategory: "Policy Clarification",
    priority: "medium",
    status: "resolved",
    createdBy: {
      name: "Sneha Patel",
      department: "Sales",
      avatar: "/placeholder.svg",
      employeeId: "SAL123",
      email: "sneha.patel@company.com",
      phone: "+91 9876543211",
    },
    assignedTo: {
      name: "Amit Verma",
      role: "HR Manager",
      avatar: "/placeholder.svg",
    },
    createdDate: "2024-12-22 09:15",
    lastUpdated: "2024-12-23 16:30",
    dueDate: "2024-12-25 09:15",
    slaTarget: "48 hours",
    timeSpent: "1.2 hours",
    resolution:
      "Provided detailed explanation of maternity leave policy with relevant documents and application form. Employee satisfied with the response.",
    attachments: ["maternity-leave-policy.pdf", "application-form.pdf"],
    updates: [
      {
        timestamp: "2024-12-23 16:30",
        user: "Amit Verma",
        action: "resolved",
        content:
          "Ticket resolved. Shared complete maternity leave policy documentation.",
      },
      {
        timestamp: "2024-12-22 14:20",
        user: "Amit Verma",
        action: "comment",
        content:
          "I'll compile the relevant policy documents and share with you by EOD.",
      },
    ],
    satisfaction: 5,
    tags: ["leave", "policy", "maternity", "documentation"],
    escalationLevel: 0,
  },
  {
    id: 3,
    ticketId: "TKT-2024-003",
    title: "IT equipment request for new joinee",
    description:
      "New employee joining on 2024-12-30. Need laptop, mouse, headset, and access cards to be ready for first day.",
    category: "IT Support",
    subcategory: "Equipment Request",
    priority: "urgent",
    status: "pending",
    createdBy: {
      name: "Meera Reddy",
      department: "HR",
      avatar: "/placeholder.svg",
      employeeId: "HR004",
      email: "meera.reddy@company.com",
      phone: "+91 9876543212",
    },
    assignedTo: {
      name: "Tech Support",
      role: "IT Team",
      avatar: "/placeholder.svg",
    },
    createdDate: "2024-12-23 11:45",
    lastUpdated: "2024-12-23 11:45",
    dueDate: "2024-12-29 17:00",
    slaTarget: "72 hours",
    timeSpent: "0.5 hours",
    resolution: "",
    attachments: ["new-joinee-details.pdf"],
    updates: [
      {
        timestamp: "2024-12-23 11:45",
        user: "System",
        action: "created",
        content: "Ticket created and waiting for assignment",
      },
    ],
    satisfaction: null,
    tags: ["equipment", "new-joinee", "laptop", "access-card"],
    escalationLevel: 0,
  },
];

// Knowledge Base Data
const knowledgeBase = [
  {
    id: 1,
    title: "How to reset your password",
    category: "Account Management",
    subcategory: "Password Issues",
    content:
      "Step-by-step guide to reset your employee portal password. Navigate to login page, click 'Forgot Password', enter your employee ID and registered email, check your email for reset link, create new password following security guidelines.",
    tags: ["password", "reset", "login", "security"],
    views: 1456,
    helpful: 234,
    notHelpful: 12,
    lastUpdated: "2024-12-20",
    author: "IT Support Team",
    estimatedReadTime: "2 min",
    difficulty: "Easy",
    relatedArticles: [2, 3],
    attachments: ["password-reset-guide.pdf", "security-policy.pdf"],
  },
  {
    id: 2,
    title: "Leave application process and policies",
    category: "Leave Management",
    subcategory: "Application Process",
    content:
      "Complete guide on how to apply for various types of leaves, approval process, required documentation, and policy guidelines. Covers annual leave, sick leave, maternity/paternity leave, and emergency leave procedures.",
    tags: ["leave", "application", "policy", "approval"],
    views: 2341,
    helpful: 456,
    notHelpful: 23,
    lastUpdated: "2024-12-18",
    author: "HR Team",
    estimatedReadTime: "5 min",
    difficulty: "Medium",
    relatedArticles: [4, 5],
    attachments: ["leave-policy-2024.pdf", "leave-application-form.pdf"],
  },
  {
    id: 3,
    title: "Two-factor authentication setup",
    category: "Account Management",
    subcategory: "Security Setup",
    content:
      "Enable two-factor authentication for enhanced account security. Download authenticator app, scan QR code from security settings, verify setup with test code, save backup codes securely.",
    tags: ["2fa", "security", "authentication", "setup"],
    views: 892,
    helpful: 167,
    notHelpful: 8,
    lastUpdated: "2024-12-15",
    author: "Security Team",
    estimatedReadTime: "3 min",
    difficulty: "Medium",
    relatedArticles: [1, 6],
    attachments: ["2fa-setup-guide.pdf"],
  },
  {
    id: 4,
    title: "Expense claim submission guidelines",
    category: "Finance",
    subcategory: "Expense Claims",
    content:
      "How to submit expense claims with proper documentation, approval workflow, reimbursement timelines, and policy compliance requirements. Includes travel expenses, meal allowances, and business expense categories.",
    tags: ["expense", "claims", "reimbursement", "finance"],
    views: 1678,
    helpful: 312,
    notHelpful: 18,
    lastUpdated: "2024-12-16",
    author: "Finance Team",
    estimatedReadTime: "4 min",
    difficulty: "Medium",
    relatedArticles: [5, 7],
    attachments: ["expense-policy.pdf", "claim-form.xlsx"],
  },
  {
    id: 5,
    title: "Payslip download and tax documents",
    category: "Payroll",
    subcategory: "Documents",
    content:
      "Access your monthly payslips, annual tax statements, Form 16, and other payroll documents from the employee portal. Includes troubleshooting for common download issues.",
    tags: ["payslip", "tax", "form16", "download"],
    views: 3456,
    helpful: 634,
    notHelpful: 45,
    lastUpdated: "2024-12-19",
    author: "Payroll Team",
    estimatedReadTime: "3 min",
    difficulty: "Easy",
    relatedArticles: [1, 4],
    attachments: ["payroll-guide.pdf"],
  },
];

// SLA Tracking Data
const slaMetrics = {
  overall: {
    responseTime: {
      target: 4,
      actual: 3.2,
      compliance: 89.5,
      trend: "improving",
    },
    resolutionTime: {
      target: 24,
      actual: 18.7,
      compliance: 92.3,
      trend: "improving",
    },
    firstCallResolution: {
      target: 75,
      actual: 78.5,
      compliance: 104.7,
      trend: "stable",
    },
    customerSatisfaction: {
      target: 4.5,
      actual: 4.3,
      compliance: 95.6,
      trend: "improving",
    },
  },
  byCategory: [
    {
      category: "IT Support",
      tickets: 45,
      avgResponseTime: 2.8,
      avgResolutionTime: 16.2,
      slaCompliance: 94.5,
      satisfaction: 4.4,
    },
    {
      category: "Payroll",
      tickets: 32,
      avgResponseTime: 3.5,
      avgResolutionTime: 20.1,
      slaCompliance: 87.8,
      satisfaction: 4.2,
    },
    {
      category: "Leave Management",
      tickets: 28,
      avgResponseTime: 4.1,
      avgResolutionTime: 22.3,
      slaCompliance: 85.2,
      satisfaction: 4.5,
    },
    {
      category: "General HR",
      tickets: 38,
      avgResponseTime: 3.8,
      avgResolutionTime: 19.7,
      slaCompliance: 90.1,
      satisfaction: 4.3,
    },
  ],
  monthlyTrends: [
    { month: "Jul", tickets: 156, resolved: 142, sla: 91.2 },
    { month: "Aug", tickets: 134, resolved: 128, sla: 89.8 },
    { month: "Sep", tickets: 167, resolved: 159, sla: 92.1 },
    { month: "Oct", tickets: 145, resolved: 138, sla: 88.7 },
    { month: "Nov", tickets: 178, resolved: 165, sla: 93.4 },
    { month: "Dec", tickets: 143, resolved: 135, sla: 90.5 },
  ],
};

// Chatbot Data
const chatbotConversations = [
  {
    id: 1,
    user: "employee",
    message: "How do I apply for sick leave?",
    timestamp: "2024-12-23 15:30",
  },
  {
    id: 2,
    user: "bot",
    message:
      "To apply for sick leave, please follow these steps:\n\n1. Log into the employee portal\n2. Navigate to 'Leave Management'\n3. Click 'Apply for Leave'\n4. Select 'Sick Leave' as the type\n5. Fill in the dates and reason\n6. Upload medical certificate if required\n7. Submit for approval\n\nWould you like me to guide you through any specific step?",
    timestamp: "2024-12-23 15:30",
    quickReplies: [
      "Show me leave balance",
      "Medical certificate requirements",
      "Who approves sick leave?",
      "Create a ticket",
    ],
  },
  {
    id: 3,
    user: "employee",
    message: "Who approves sick leave?",
    timestamp: "2024-12-23 15:32",
  },
  {
    id: 4,
    user: "bot",
    message:
      "Sick leave approval depends on the duration:\n\n• **1-2 days**: Direct supervisor approval\n• **3-7 days**: HR Manager approval required\n• **More than 7 days**: Medical certificate + HR Director approval\n\nFor emergency sick leave, you can apply retrospectively within 2 working days with proper medical documentation.\n\nWould you like help with anything else?",
    timestamp: "2024-12-23 15:32",
    quickReplies: [
      "Apply for leave now",
      "Check leave balance",
      "Contact HR directly",
      "More leave policies",
    ],
  },
];

const commonQueries = [
  {
    query: "How to reset password?",
    category: "Account",
    frequency: 234,
    response:
      "Go to login page → Click 'Forgot Password' → Enter employee ID → Check email for reset link",
  },
  {
    query: "Leave application process",
    category: "Leave",
    frequency: 189,
    response:
      "Employee Portal → Leave Management → Apply Leave → Select type and dates → Submit",
  },
  {
    query: "Payslip download",
    category: "Payroll",
    frequency: 156,
    response:
      "Employee Portal → Payroll → Monthly Payslips → Select month → Download PDF",
  },
  {
    query: "IT support request",
    category: "IT",
    frequency: 145,
    response:
      "Create ticket in Help Desk → Select IT Support → Describe issue → Assign priority",
  },
  {
    query: "Company holidays list",
    category: "General",
    frequency: 123,
    response:
      "Employee Portal → Company Information → Holiday Calendar → Download current year",
  },
];

export default function HRHelpdeskServiceDesk() {
  const [activeTab, setActiveTab] = useState("tickets");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const dashboardStats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(
      (t) => t.status !== "resolved" && t.status !== "closed",
    ).length,
    avgResolutionTime: slaMetrics.overall.resolutionTime.actual,
    satisfactionScore: slaMetrics.overall.customerSatisfaction.actual,
    slaCompliance: slaMetrics.overall.resolutionTime.compliance,
    knowledgeBaseArticles: knowledgeBase.length,
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <BackToHRMS />

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                HR Helpdesk & Service Desk
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Headphones}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Comprehensive support system with ticketing, knowledge base, and
                AI-powered assistance
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon icon={Bot} animation="bounce" className="mr-2" />
              Ask HR Bot
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Ticket
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="hover-lift animate-fadeInUp relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Open Tickets</p>
                <AnimatedIcon
                  icon={Ticket}
                  animation="float"
                  className="text-blue-600"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={dashboardStats.openTickets} />
              </div>
              <div className="text-xs text-muted-foreground">
                {dashboardStats.totalTickets} total this month
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp relative overflow-hidden group"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Avg Resolution</p>
                <AnimatedIcon
                  icon={Timer}
                  animation="pulse"
                  className="text-green-600"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter
                  value={dashboardStats.avgResolutionTime}
                  suffix="h"
                  decimals={1}
                />
              </div>
              <div className="text-xs text-emerald-600">
                Target: 24h • {dashboardStats.slaCompliance.toFixed(1)}% SLA
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp relative overflow-hidden group"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <AnimatedIcon
                  icon={Star}
                  animation="glow"
                  className="text-yellow-500"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter
                  value={dashboardStats.satisfactionScore}
                  suffix="/5"
                  decimals={1}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Based on 156 responses
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp relative overflow-hidden group"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Knowledge Base</p>
                <AnimatedIcon
                  icon={BookOpen}
                  animation="bounce"
                  className="text-purple-600"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={dashboardStats.knowledgeBaseArticles} />
              </div>
              <div className="text-xs text-muted-foreground">
                Articles available
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="h-auto p-1 bg-muted/50 lg:grid lg:grid-cols-4 w-full overflow-x-auto scrollbar-hide flex lg:flex-none gap-1 lg:gap-0">
            <TabsTrigger
              value="tickets"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Ticket} size="sm" className="mr-2" />
              Ticketing System
            </TabsTrigger>
            <TabsTrigger
              value="knowledge"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={BookOpen} size="sm" className="mr-2" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger
              value="sla"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Target} size="sm" className="mr-2" />
              SLA Tracking
            </TabsTrigger>
            <TabsTrigger
              value="chatbot"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Bot} size="sm" className="mr-2" />
              HR Chatbot
            </TabsTrigger>
          </TabsList>

          {/* Ticketing System Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <div className="grid gap-6">
              {/* Ticket Creation */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Plus}
                        className="text-construction-500"
                      />
                      <CardTitle>Create Support Ticket</CardTitle>
                    </div>
                    <Button>
                      <Ticket className="h-4 w-4 mr-2" />
                      New Ticket
                    </Button>
                  </div>
                  <CardDescription>
                    Submit HR queries and track resolution progress with our
                    ticketing system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    {[
                      {
                        icon: Users,
                        category: "HR General",
                        description: "Policy queries, documentation requests",
                        count: 12,
                      },
                      {
                        icon: CreditCard,
                        category: "Payroll",
                        description: "Salary, payslips, tax-related issues",
                        count: 8,
                      },
                      {
                        icon: Calendar,
                        category: "Leave Management",
                        description: "Leave applications, balance queries",
                        count: 6,
                      },
                      {
                        icon: Monitor,
                        category: "IT Support",
                        description: "System access, technical issues",
                        count: 15,
                      },
                    ].map((category, index) => (
                      <Card
                        key={category.category}
                        className="p-4 cursor-pointer hover:bg-muted/50 transition-colors animate-scaleIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="p-2 rounded-lg bg-construction-500/10">
                              <category.icon className="h-5 w-5 text-construction-500" />
                            </div>
                            <Badge variant="secondary">{category.count}</Badge>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">
                              {category.category}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search tickets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select
                      value={filterPriority}
                      onValueChange={setFilterPriority}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Tickets List */}
              <div className="space-y-4">
                {tickets.map((ticket, index) => (
                  <Card
                    key={ticket.id}
                    className="hover-lift animate-fadeInUp cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">
                                {ticket.ticketId}
                              </h3>
                              <Badge
                                variant={
                                  ticket.status === "resolved"
                                    ? "default"
                                    : ticket.status === "in_progress"
                                      ? "secondary"
                                      : ticket.status === "pending"
                                        ? "outline"
                                        : "destructive"
                                }
                              >
                                {ticket.status === "resolved" && (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                )}
                                {ticket.status === "in_progress" && (
                                  <Clock className="h-3 w-3 mr-1" />
                                )}
                                {ticket.status === "pending" && (
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                )}
                                {ticket.status.replace("_", " ")}
                              </Badge>
                              <Badge
                                variant={
                                  ticket.priority === "urgent"
                                    ? "destructive"
                                    : ticket.priority === "high"
                                      ? "destructive"
                                      : ticket.priority === "medium"
                                        ? "secondary"
                                        : "outline"
                                }
                              >
                                {ticket.priority}
                              </Badge>
                              <Badge variant="outline">{ticket.category}</Badge>
                            </div>
                            <h4 className="font-medium">{ticket.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {ticket.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={ticket.assignedTo?.avatar} />
                                <AvatarFallback className="text-xs">
                                  {ticket.assignedTo?.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">
                                  {ticket.assignedTo?.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {ticket.assignedTo?.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-sm">
                                Requester
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={ticket.createdBy.avatar} />
                                <AvatarFallback className="text-xs">
                                  {ticket.createdBy.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">
                                  {ticket.createdBy.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {ticket.createdBy.department} •{" "}
                                  {ticket.createdBy.employeeId}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Timer className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-sm">
                                Timeline
                              </span>
                            </div>
                            <div className="text-sm">
                              <div className="flex justify-between">
                                <span>Created:</span>
                                <span className="font-medium">
                                  {ticket.createdDate}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Due:</span>
                                <span className="font-medium">
                                  {ticket.dueDate}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>SLA Target:</span>
                                <span className="font-medium">
                                  {ticket.slaTarget}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {ticket.tags.length > 0 && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Tags</Label>
                            <div className="flex flex-wrap gap-1">
                              {ticket.tags.map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-4 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                          {ticket.status !== "resolved" && (
                            <Button size="sm" className="hover-lift">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Update Status
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Forward className="h-3 w-3 mr-1" />
                            Escalate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Knowledge Base / FAQ Tab */}
          <TabsContent value="knowledge" className="space-y-6">
            <div className="grid gap-6">
              {/* Search Knowledge Base */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Search} className="text-primary" />
                    Search Knowledge Base
                  </CardTitle>
                  <CardDescription>
                    Find answers to common questions and helpful guides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search articles, guides, and FAQs..."
                      className="pl-10 text-lg py-6"
                    />
                  </div>
                  <div className="grid gap-2 md:grid-cols-3 mt-4">
                    {[
                      "Password Reset",
                      "Leave Application",
                      "Payslip Download",
                      "IT Support",
                      "Policy Questions",
                      "Benefits Info",
                    ].map((tag) => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        className="justify-start"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Articles */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={TrendingUp}
                      className="text-emerald-600"
                    />
                    Popular Articles
                  </CardTitle>
                  <CardDescription>
                    Most viewed and helpful articles this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {knowledgeBase
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 4)
                      .map((article, index) => (
                        <Card
                          key={article.id}
                          className="p-4 cursor-pointer hover:bg-muted/50 transition-colors animate-fadeInUp"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-sm leading-relaxed">
                                {article.title}
                              </h4>
                              <div className="flex items-center gap-1 text-xs text-emerald-600">
                                <ThumbsUp className="h-3 w-3" />
                                <span>{article.helpful}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                <span>{article.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{article.estimatedReadTime}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {article.difficulty}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {article.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Knowledge Base Categories */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={BookOpen}
                      className="text-construction-500"
                    />
                    Browse by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      {
                        category: "Account Management",
                        icon: User,
                        articles: knowledgeBase.filter(
                          (a) => a.category === "Account Management",
                        ).length,
                        color: "text-blue-600",
                        bgColor: "bg-blue-600/10",
                      },
                      {
                        category: "Leave Management",
                        icon: Calendar,
                        articles: knowledgeBase.filter(
                          (a) => a.category === "Leave Management",
                        ).length,
                        color: "text-green-600",
                        bgColor: "bg-green-600/10",
                      },
                      {
                        category: "Payroll",
                        icon: CreditCard,
                        articles: knowledgeBase.filter(
                          (a) => a.category === "Payroll",
                        ).length,
                        color: "text-yellow-600",
                        bgColor: "bg-yellow-600/10",
                      },
                      {
                        category: "Finance",
                        icon: DollarSign,
                        articles: knowledgeBase.filter(
                          (a) => a.category === "Finance",
                        ).length,
                        color: "text-purple-600",
                        bgColor: "bg-purple-600/10",
                      },
                      {
                        category: "IT Support",
                        icon: Monitor,
                        articles: 8,
                        color: "text-indigo-600",
                        bgColor: "bg-indigo-600/10",
                      },
                      {
                        category: "General HR",
                        icon: Users,
                        articles: 12,
                        color: "text-construction-500",
                        bgColor: "bg-construction-500/10",
                      },
                    ].map((category, index) => (
                      <Card
                        key={category.category}
                        className="p-4 cursor-pointer hover:bg-muted/50 transition-colors animate-scaleIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div
                              className={`p-3 rounded-lg ${category.bgColor}`}
                            >
                              <category.icon
                                className={`h-6 w-6 ${category.color}`}
                              />
                            </div>
                            <Badge variant="secondary">
                              {category.articles}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="font-medium">{category.category}</h4>
                            <p className="text-sm text-muted-foreground">
                              {category.articles} articles available
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* All Articles */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={FileText} className="text-primary" />
                    All Knowledge Base Articles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {knowledgeBase.map((article, index) => (
                      <Card
                        key={article.id}
                        className="p-4 cursor-pointer hover:bg-muted/50 transition-colors animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h4 className="font-medium">{article.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {article.content.substring(0, 150)}...
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                  {article.category}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {article.subcategory}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3 text-muted-foreground" />
                                  <span>{article.views.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-3 w-3 text-emerald-600" />
                                  <span>{article.helpful}</span>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Updated: {article.lastUpdated}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {article.tags.map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="secondary"
                                className="text-xs"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2 pt-2 border-t">
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover-lift"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Read Article
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover-lift"
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              Helpful
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover-lift"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SLA Tracking Tab */}
          <TabsContent value="sla" className="space-y-6">
            <div className="grid gap-6">
              {/* SLA Overview */}
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  {
                    metric: "Response Time",
                    value: slaMetrics.overall.responseTime.actual,
                    target: slaMetrics.overall.responseTime.target,
                    unit: "hrs",
                    compliance: slaMetrics.overall.responseTime.compliance,
                    trend: slaMetrics.overall.responseTime.trend,
                    icon: Timer,
                    color: "text-blue-600",
                  },
                  {
                    metric: "Resolution Time",
                    value: slaMetrics.overall.resolutionTime.actual,
                    target: slaMetrics.overall.resolutionTime.target,
                    unit: "hrs",
                    compliance: slaMetrics.overall.resolutionTime.compliance,
                    trend: slaMetrics.overall.resolutionTime.trend,
                    icon: CheckCircle,
                    color: "text-emerald-600",
                  },
                  {
                    metric: "First Call Resolution",
                    value: slaMetrics.overall.firstCallResolution.actual,
                    target: slaMetrics.overall.firstCallResolution.target,
                    unit: "%",
                    compliance:
                      slaMetrics.overall.firstCallResolution.compliance,
                    trend: slaMetrics.overall.firstCallResolution.trend,
                    icon: Target,
                    color: "text-construction-500",
                  },
                  {
                    metric: "Customer Satisfaction",
                    value: slaMetrics.overall.customerSatisfaction.actual,
                    target: slaMetrics.overall.customerSatisfaction.target,
                    unit: "/5",
                    compliance:
                      slaMetrics.overall.customerSatisfaction.compliance,
                    trend: slaMetrics.overall.customerSatisfaction.trend,
                    icon: Star,
                    color: "text-yellow-600",
                  },
                ].map((metric, index) => (
                  <Card
                    key={metric.metric}
                    className="hover-lift animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <metric.icon className={`h-5 w-5 ${metric.color}`} />
                          <div
                            className={`text-xs ${
                              metric.trend === "improving"
                                ? "text-emerald-600"
                                : metric.trend === "declining"
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }`}
                          >
                            {metric.trend === "improving" ? (
                              <ArrowUp className="h-3 w-3 inline mr-1" />
                            ) : metric.trend === "declining" ? (
                              <ArrowDown className="h-3 w-3 inline mr-1" />
                            ) : (
                              <Minus className="h-3 w-3 inline mr-1" />
                            )}
                            {metric.trend}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {metric.metric}
                          </p>
                          <div className="text-xl font-bold">
                            {metric.value}
                            {metric.unit}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Target: {metric.target}
                            {metric.unit}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>SLA Compliance</span>
                            <span className="font-medium">
                              {metric.compliance.toFixed(1)}%
                            </span>
                          </div>
                          <Progress
                            value={Math.min(metric.compliance, 100)}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* SLA by Category */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={BarChart3} className="text-primary" />
                    SLA Performance by Category
                  </CardTitle>
                  <CardDescription>
                    Category-wise response and resolution metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Tickets</TableHead>
                        <TableHead>Avg Response</TableHead>
                        <TableHead>Avg Resolution</TableHead>
                        <TableHead>SLA Compliance</TableHead>
                        <TableHead>Satisfaction</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {slaMetrics.byCategory.map((category) => (
                        <TableRow key={category.category}>
                          <TableCell className="font-medium">
                            {category.category}
                          </TableCell>
                          <TableCell>{category.tickets}</TableCell>
                          <TableCell>{category.avgResponseTime}hrs</TableCell>
                          <TableCell>{category.avgResolutionTime}hrs</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={category.slaCompliance}
                                className="w-16 h-2"
                              />
                              <span className="text-sm font-medium">
                                {category.slaCompliance.toFixed(1)}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{category.satisfaction.toFixed(1)}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Monthly Trends */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={TrendingUp}
                      className="text-emerald-600"
                    />
                    Monthly SLA Trends
                  </CardTitle>
                  <CardDescription>
                    Track SLA performance trends over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {slaMetrics.monthlyTrends.map((month, index) => (
                      <div
                        key={month.month}
                        className="flex items-center justify-between p-4 border rounded-lg animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="font-medium text-sm w-12">
                            {month.month}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {month.tickets} tickets • {month.resolved} resolved
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {month.sla.toFixed(1)}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              SLA Compliance
                            </div>
                          </div>
                          <Progress value={month.sla} className="w-24 h-2" />
                          <div
                            className={`text-xs ${
                              month.sla >= 90
                                ? "text-emerald-600"
                                : month.sla >= 80
                                  ? "text-yellow-600"
                                  : "text-red-500"
                            }`}
                          >
                            {month.sla >= 90 ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : month.sla >= 80 ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* HR Chatbot Integration Tab */}
          <TabsContent value="chatbot" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Chatbot Interface */}
              <div className="lg:col-span-2">
                <Card className="hover-lift h-[600px] flex flex-col">
                  <CardHeader className="border-b">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-construction-500/10">
                        <Bot className="h-5 w-5 text-construction-500" />
                      </div>
                      <div>
                        <CardTitle>HR Assistant Bot</CardTitle>
                        <CardDescription>
                          AI-powered support for instant help
                        </CardDescription>
                      </div>
                      <div className="ml-auto">
                        <PulsingDot className="scale-75" />
                        <span className="text-xs text-emerald-600 ml-2">
                          Online
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatbotConversations.map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex animate-fadeInUp ${
                          message.user === "employee"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div
                          className={`max-w-[80%] ${
                            message.user === "employee"
                              ? "bg-construction-500 text-white"
                              : "bg-muted"
                          } rounded-lg p-3`}
                        >
                          <div className="text-sm whitespace-pre-line">
                            {message.message}
                          </div>
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp}
                          </div>
                          {message.quickReplies && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {message.quickReplies.map((reply, replyIndex) => (
                                <Button
                                  key={replyIndex}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-7"
                                >
                                  {reply}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="border-t p-4">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Type your question here..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm" className="hover-lift">
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {[
                        "Reset password",
                        "Apply for leave",
                        "Check payslip",
                        "IT support",
                      ].map((suggestion) => (
                        <Button
                          key={suggestion}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Chatbot Analytics */}
              <div className="space-y-6">
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Activity}
                        className="text-emerald-600"
                      />
                      Bot Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">87.5%</div>
                        <p className="text-sm text-muted-foreground">
                          Resolution Rate
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Queries Handled</span>
                          <span className="font-medium">1,234</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Avg Response Time</span>
                          <span className="font-medium">0.8s</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>User Satisfaction</span>
                          <span className="font-medium">4.6/5</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Escalated to Human</span>
                          <span className="font-medium">12.5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={HelpCircle}
                        className="text-construction-500"
                      />
                      Common Queries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {commonQueries.map((query, index) => (
                        <div
                          key={index}
                          className="p-3 border rounded-lg animate-fadeInUp"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-medium">{query.query}</p>
                            <Badge variant="outline" className="text-xs">
                              {query.frequency}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {query.response}
                          </p>
                          <Badge variant="secondary" className="text-xs mt-2">
                            {query.category}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AnimatedIcon icon={Settings} className="text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { action: "Train Bot", icon: GraduationCap },
                        { action: "View Analytics", icon: BarChart3 },
                        { action: "Export Logs", icon: Download },
                        { action: "Bot Settings", icon: Settings },
                      ].map((item, index) => (
                        <Button
                          key={item.action}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.action}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
