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
import { Switch } from "@/components/ui/switch";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  OverviewCards,
  ModuleTabs,
  CRUDModal,
  DataTable,
  StatusBadge,
  TierBadge,
  SearchFilterToolbar,
  CommonActions,
} from "@/components/shared";
import type { MetricCard, TabConfig, Column } from "@/components/shared";
import { formatCurrency, formatPercentage } from "@/lib/formatters";
import {
  Users,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  Upload,
  Star,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Target,
  Award,
  Briefcase,
  Building,
  Globe,
  Shield,
  BookOpen,
  MessageSquare,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Settings,
  UserPlus,
  Handshake,
  CreditCard,
  Wallet,
  Receipt,
  Calculator,
  Map,
  Zap,
  RefreshCw,
  Send,
  Camera,
  Paperclip,
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface Partner {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  territory: string[];
  status: "active" | "inactive" | "pending" | "suspended";
  tier: "platinum" | "gold" | "silver" | "bronze";
  joinDate: string;
  rating: number;
  totalRevenue: number;
  monthlyTarget: number;
  achievement: number;
  commissionRate: number;
  leadsAssigned: number;
  leadsConverted: number;
  conversionRate: number;
  certificationLevel: string;
  lastActivity: string;
  profileImage?: string;
  kycStatus: "verified" | "pending" | "rejected";
  contractExpiry: string;
  paymentMethod: string;
  referralCode: string;
}

interface Commission {
  id: string;
  partnerId: string;
  partnerName: string;
  period: string;
  revenue: number;
  commissionRate: number;
  commissionAmount: number;
  status: "pending" | "approved" | "paid" | "disputed";
  dueDate: string;
  paidDate?: string;
  invoiceNumber: string;
  projectName: string;
  clientName: string;
}

interface Lead {
  id: string;
  clientName: string;
  projectType: string;
  value: number;
  location: string;
  assignedTo: string;
  status:
    | "new"
    | "contacted"
    | "qualified"
    | "proposal"
    | "negotiation"
    | "closed"
    | "lost";
  priority: "low" | "medium" | "high" | "urgent";
  source: string;
  assignedDate: string;
  lastContact: string;
  nextFollowUp: string;
  probability: number;
}

interface Training {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  status: "available" | "in-progress" | "completed";
  completionRate: number;
  instructor: string;
  enrolledCount: number;
  rating: number;
  thumbnail: string;
  modules: string[];
}

interface Territory {
  id: string;
  name: string;
  state: string;
  cities: string[];
  assignedPartners: string[];
  targetRevenue: number;
  actualRevenue: number;
  activeLeads: number;
  closedDeals: number;
  coverage: number;
}

export default function ChannelPartners() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const [partners] = useState<Partner[]>([
    {
      id: "1",
      name: "Rajesh Kumar",
      company: "Delhi Property Solutions",
      email: "rajesh@delhiproperties.com",
      phone: "+91 98765 43210",
      location: "New Delhi",
      territory: ["Delhi", "Gurgaon", "Noida"],
      status: "active",
      tier: "platinum",
      joinDate: "2023-01-15",
      rating: 4.8,
      totalRevenue: 2500000,
      monthlyTarget: 500000,
      achievement: 108,
      commissionRate: 4.5,
      leadsAssigned: 45,
      leadsConverted: 23,
      conversionRate: 51.1,
      certificationLevel: "Expert Level 3",
      lastActivity: "2024-01-29",
      kycStatus: "verified",
      contractExpiry: "2024-12-31",
      paymentMethod: "Bank Transfer",
      referralCode: "RK001",
    },
    {
      id: "2",
      name: "Priya Sharma",
      company: "Mumbai Realty Connect",
      email: "priya@mumbairealtyconnect.com",
      phone: "+91 98765 43211",
      location: "Mumbai",
      territory: ["Mumbai", "Pune", "Nashik"],
      status: "active",
      tier: "gold",
      joinDate: "2023-03-20",
      rating: 4.6,
      totalRevenue: 1800000,
      monthlyTarget: 400000,
      achievement: 95,
      commissionRate: 4.0,
      leadsAssigned: 38,
      leadsConverted: 18,
      conversionRate: 47.4,
      certificationLevel: "Advanced Level 2",
      lastActivity: "2024-01-28",
      kycStatus: "verified",
      contractExpiry: "2024-11-30",
      paymentMethod: "UPI",
      referralCode: "PS002",
    },
    {
      id: "3",
      name: "Amit Patel",
      company: "Gujarat Housing Hub",
      email: "amit@gujarathousing.com",
      phone: "+91 98765 43212",
      location: "Ahmedabad",
      territory: ["Ahmedabad", "Surat", "Vadodara"],
      status: "active",
      tier: "silver",
      joinDate: "2023-06-10",
      rating: 4.3,
      totalRevenue: 1200000,
      monthlyTarget: 300000,
      achievement: 87,
      commissionRate: 3.5,
      leadsAssigned: 32,
      leadsConverted: 14,
      conversionRate: 43.8,
      certificationLevel: "Intermediate Level 1",
      lastActivity: "2024-01-27",
      kycStatus: "verified",
      contractExpiry: "2024-10-15",
      paymentMethod: "Bank Transfer",
      referralCode: "AP003",
    },
    {
      id: "4",
      name: "Sunita Reddy",
      company: "Hyderabad Properties Plus",
      email: "sunita@hyderabadproperties.com",
      phone: "+91 98765 43213",
      location: "Hyderabad",
      territory: ["Hyderabad", "Secunderabad", "Warangal"],
      status: "pending",
      tier: "bronze",
      joinDate: "2024-01-10",
      rating: 0,
      totalRevenue: 0,
      monthlyTarget: 250000,
      achievement: 0,
      commissionRate: 3.0,
      leadsAssigned: 8,
      leadsConverted: 1,
      conversionRate: 12.5,
      certificationLevel: "Basic Training",
      lastActivity: "2024-01-25",
      kycStatus: "pending",
      contractExpiry: "2024-12-31",
      paymentMethod: "Not Set",
      referralCode: "SR004",
    },
    {
      id: "5",
      name: "Vikram Singh",
      company: "Bangalore Real Estate Network",
      email: "vikram@bangalorerentwork.com",
      phone: "+91 98765 43214",
      location: "Bangalore",
      territory: ["Bangalore", "Mysore", "Mangalore"],
      status: "inactive",
      tier: "silver",
      joinDate: "2022-12-05",
      rating: 4.1,
      totalRevenue: 950000,
      monthlyTarget: 350000,
      achievement: 65,
      commissionRate: 3.5,
      leadsAssigned: 28,
      leadsConverted: 11,
      conversionRate: 39.3,
      certificationLevel: "Intermediate Level 1",
      lastActivity: "2024-01-15",
      kycStatus: "verified",
      contractExpiry: "2024-09-30",
      paymentMethod: "Bank Transfer",
      referralCode: "VS005",
    },
  ]);

  const [commissions] = useState<Commission[]>([
    {
      id: "1",
      partnerId: "1",
      partnerName: "Rajesh Kumar",
      period: "January 2024",
      revenue: 850000,
      commissionRate: 4.5,
      commissionAmount: 38250,
      status: "paid",
      dueDate: "2024-02-05",
      paidDate: "2024-02-03",
      invoiceNumber: "INV-2024-001",
      projectName: "Green Valley Apartments",
      clientName: "Sharma Family",
    },
    {
      id: "2",
      partnerId: "2",
      partnerName: "Priya Sharma",
      period: "January 2024",
      revenue: 650000,
      commissionRate: 4.0,
      commissionAmount: 26000,
      status: "approved",
      dueDate: "2024-02-05",
      invoiceNumber: "INV-2024-002",
      projectName: "Ocean View Towers",
      clientName: "Gupta Enterprises",
    },
    {
      id: "3",
      partnerId: "1",
      partnerName: "Rajesh Kumar",
      period: "December 2023",
      revenue: 750000,
      commissionRate: 4.5,
      commissionAmount: 33750,
      status: "paid",
      dueDate: "2024-01-05",
      paidDate: "2024-01-04",
      invoiceNumber: "INV-2023-068",
      projectName: "Sunrise Residency",
      clientName: "Patel Builders",
    },
    {
      id: "4",
      partnerId: "3",
      partnerName: "Amit Patel",
      period: "January 2024",
      revenue: 450000,
      commissionRate: 3.5,
      commissionAmount: 15750,
      status: "pending",
      dueDate: "2024-02-05",
      invoiceNumber: "INV-2024-003",
      projectName: "Heritage Homes",
      clientName: "Mehta Family",
    },
    {
      id: "5",
      partnerId: "2",
      partnerName: "Priya Sharma",
      period: "December 2023",
      revenue: 580000,
      commissionRate: 4.0,
      commissionAmount: 23200,
      status: "disputed",
      dueDate: "2024-01-05",
      invoiceNumber: "INV-2023-069",
      projectName: "Metro Heights",
      clientName: "Shah Developers",
    },
  ]);

  const [leads] = useState<Lead[]>([
    {
      id: "1",
      clientName: "Agarwal Family",
      projectType: "3 BHK Apartment",
      value: 8500000,
      location: "Gurgaon",
      assignedTo: "Rajesh Kumar",
      status: "proposal",
      priority: "high",
      source: "Website Inquiry",
      assignedDate: "2024-01-25",
      lastContact: "2024-01-28",
      nextFollowUp: "2024-01-30",
      probability: 75,
    },
    {
      id: "2",
      clientName: "Verma Enterprises",
      projectType: "Commercial Space",
      value: 15000000,
      location: "Mumbai",
      assignedTo: "Priya Sharma",
      status: "negotiation",
      priority: "urgent",
      source: "Referral",
      assignedDate: "2024-01-20",
      lastContact: "2024-01-29",
      nextFollowUp: "2024-01-31",
      probability: 85,
    },
    {
      id: "3",
      clientName: "Joshi Family",
      projectType: "Villa",
      value: 12000000,
      location: "Pune",
      assignedTo: "Priya Sharma",
      status: "qualified",
      priority: "medium",
      source: "Partner Event",
      assignedDate: "2024-01-22",
      lastContact: "2024-01-27",
      nextFollowUp: "2024-02-01",
      probability: 60,
    },
    {
      id: "4",
      clientName: "Desai Builders",
      projectType: "Bulk Purchase",
      value: 25000000,
      location: "Ahmedabad",
      assignedTo: "Amit Patel",
      status: "contacted",
      priority: "high",
      source: "Trade Show",
      assignedDate: "2024-01-24",
      lastContact: "2024-01-26",
      nextFollowUp: "2024-02-02",
      probability: 45,
    },
    {
      id: "5",
      clientName: "Kumar Family",
      projectType: "2 BHK Apartment",
      value: 6500000,
      location: "Hyderabad",
      assignedTo: "Sunita Reddy",
      status: "new",
      priority: "medium",
      source: "Walk-in",
      assignedDate: "2024-01-29",
      lastContact: "2024-01-29",
      nextFollowUp: "2024-01-31",
      probability: 30,
    },
  ]);

  const [trainings] = useState<Training[]>([
    {
      id: "1",
      title: "Real Estate Sales Fundamentals",
      description:
        "Master the basics of real estate sales and customer relationship management",
      category: "Sales",
      duration: "4 hours",
      level: "beginner",
      status: "available",
      completionRate: 85,
      instructor: "Madhuri Dixit",
      enrolledCount: 156,
      rating: 4.7,
      thumbnail: "sales_fundamentals.jpg",
      modules: [
        "Introduction to Real Estate",
        "Customer Psychology",
        "Sales Process",
        "Closing Techniques",
      ],
    },
    {
      id: "2",
      title: "Digital Marketing for Real Estate",
      description:
        "Learn effective digital marketing strategies to generate and nurture leads",
      category: "Marketing",
      duration: "6 hours",
      level: "intermediate",
      status: "available",
      completionRate: 72,
      instructor: "Rohit Sharma",
      enrolledCount: 134,
      rating: 4.5,
      thumbnail: "digital_marketing.jpg",
      modules: [
        "Social Media Marketing",
        "SEO Basics",
        "Email Marketing",
        "Content Creation",
      ],
    },
    {
      id: "3",
      title: "Legal Compliance & Documentation",
      description:
        "Understanding legal requirements and proper documentation in real estate",
      category: "Legal",
      duration: "5 hours",
      level: "advanced",
      status: "available",
      completionRate: 68,
      instructor: "Advocate Priyanka Shah",
      enrolledCount: 89,
      rating: 4.8,
      thumbnail: "legal_compliance.jpg",
      modules: [
        "RERA Compliance",
        "Documentation Process",
        "Contract Law",
        "Dispute Resolution",
      ],
    },
    {
      id: "4",
      title: "Customer Relationship Management",
      description:
        "Build lasting relationships with clients for repeat business and referrals",
      category: "CRM",
      duration: "3 hours",
      level: "intermediate",
      status: "available",
      completionRate: 91,
      instructor: "Sunita Kapoor",
      enrolledCount: 198,
      rating: 4.6,
      thumbnail: "crm_training.jpg",
      modules: [
        "Client Communication",
        "Follow-up Strategies",
        "Referral Systems",
        "After-sales Service",
      ],
    },
    {
      id: "5",
      title: "Financial Planning & Investment Advisory",
      description:
        "Help clients make informed financial decisions for property investments",
      category: "Finance",
      duration: "7 hours",
      level: "advanced",
      status: "available",
      completionRate: 64,
      instructor: "CA Rajesh Khanna",
      enrolledCount: 76,
      rating: 4.9,
      thumbnail: "financial_planning.jpg",
      modules: [
        "Investment Analysis",
        "Loan Processing",
        "Tax Benefits",
        "Portfolio Management",
      ],
    },
  ]);

  const [territories] = useState<Territory[]>([
    {
      id: "1",
      name: "North Delhi",
      state: "Delhi",
      cities: ["Delhi", "Gurgaon", "Noida", "Faridabad"],
      assignedPartners: ["Rajesh Kumar"],
      targetRevenue: 5000000,
      actualRevenue: 5400000,
      activeLeads: 15,
      closedDeals: 8,
      coverage: 95,
    },
    {
      id: "2",
      name: "Mumbai Metropolitan",
      state: "Maharashtra",
      cities: ["Mumbai", "Pune", "Nashik", "Thane"],
      assignedPartners: ["Priya Sharma"],
      targetRevenue: 4000000,
      actualRevenue: 3800000,
      activeLeads: 12,
      closedDeals: 6,
      coverage: 88,
    },
    {
      id: "3",
      name: "Gujarat Central",
      state: "Gujarat",
      cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
      assignedPartners: ["Amit Patel"],
      targetRevenue: 3000000,
      actualRevenue: 2610000,
      activeLeads: 10,
      closedDeals: 4,
      coverage: 75,
    },
    {
      id: "4",
      name: "Telangana Region",
      state: "Telangana",
      cities: ["Hyderabad", "Secunderabad", "Warangal"],
      assignedPartners: ["Sunita Reddy"],
      targetRevenue: 2500000,
      actualRevenue: 0,
      activeLeads: 8,
      closedDeals: 1,
      coverage: 45,
    },
    {
      id: "5",
      name: "Karnataka South",
      state: "Karnataka",
      cities: ["Bangalore", "Mysore", "Mangalore"],
      assignedPartners: [],
      targetRevenue: 3500000,
      actualRevenue: 950000,
      activeLeads: 5,
      closedDeals: 3,
      coverage: 35,
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

  // Badge functions simplified using shared components
  const getStatusBadge = (status: string) => (
    <StatusBadge status={status as any} />
  );

  const getTierBadge = (tier: string) => <TierBadge tier={tier as any} />;

  const getCommissionStatusBadge = (status: string) => (
    <StatusBadge status={status as any} />
  );

  const getLeadStatusBadge = (status: string) => (
    <StatusBadge status={status as any} />
  );

  const getPriorityBadge = (priority: string) => (
    <StatusBadge status={priority as any} />
  );

  const calculateTotalCommissions = () => {
    return commissions.reduce(
      (sum, commission) => sum + commission.commissionAmount,
      0,
    );
  };

  const calculatePendingCommissions = () => {
    return commissions
      .filter((c) => c.status === "pending" || c.status === "approved")
      .reduce((sum, commission) => sum + commission.commissionAmount, 0);
  };

  const getTopPerformers = () => {
    return partners
      .filter((p) => p.status === "active")
      .sort((a, b) => b.achievement - a.achievement)
      .slice(0, 3);
  };

  const getActiveLeadsCount = () => {
    return leads.filter((l) => !["closed", "lost"].includes(l.status)).length;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Channel Partners
            </h2>
            <p className="text-muted-foreground">
              Manage partner network, commissions, and performance analytics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Partner
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Channel Partner</DialogTitle>
                  <DialogDescription>
                    Onboard a new channel partner to expand your network
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[500px]">
                  <div className="grid gap-4 py-4 pr-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="partner-name">Partner Name</Label>
                        <Input
                          id="partner-name"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input
                          id="company-name"
                          placeholder="Enter company name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="partner@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="City, State" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tier">Partner Tier</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bronze">Bronze</SelectItem>
                            <SelectItem value="silver">Silver</SelectItem>
                            <SelectItem value="gold">Gold</SelectItem>
                            <SelectItem value="platinum">Platinum</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="territory">Territory Coverage</Label>
                      <Input
                        id="territory"
                        placeholder="Cities/regions this partner will cover"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="commission-rate">
                          Commission Rate (%)
                        </Label>
                        <Input
                          id="commission-rate"
                          type="number"
                          placeholder="3.5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="monthly-target">
                          Monthly Target (₹)
                        </Label>
                        <Input
                          id="monthly-target"
                          type="number"
                          placeholder="500000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">
                        Preferred Payment Method
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank-transfer">
                            Bank Transfer
                          </SelectItem>
                          <SelectItem value="upi">UPI</SelectItem>
                          <SelectItem value="cheque">Cheque</SelectItem>
                          <SelectItem value="wallet">Digital Wallet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contract-terms">Contract Terms</Label>
                      <Textarea
                        id="contract-terms"
                        placeholder="Enter contract terms and conditions"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="documents">Upload Documents</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <Button variant="outline">Upload Documents</Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Upload PAN, Aadhar, GST certificate, and other
                          documents
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <DialogFooter>
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Send Invitation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-10">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
            <TabsTrigger value="leads">Lead Assignment</TabsTrigger>
            <TabsTrigger value="territories">Territories</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="portal">Partner Portal</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewCards
              metrics={[
                {
                  title: "Total Partners",
                  value: partners.length,
                  subtitle: `${partners.filter((p) => p.status === "active").length} active partners`,
                  icon: Users,
                  color: "primary",
                },
                {
                  title: "Total Commission",
                  value: formatCurrency(calculateTotalCommissions(), {
                    compact: true,
                  }),
                  subtitle: `${formatCurrency(calculatePendingCommissions(), { compact: true })} pending`,
                  icon: DollarSign,
                  color: "success",
                },
                {
                  title: "Active Leads",
                  value: getActiveLeadsCount(),
                  subtitle: `${leads.filter((l) => l.status === "proposal" || l.status === "negotiation").length} in negotiation`,
                  icon: Target,
                  color: "warning",
                },
                {
                  title: "Avg Conversion",
                  value: formatPercentage(
                    Math.round(
                      partners.reduce((sum, p) => sum + p.conversionRate, 0) /
                        partners.length,
                    ),
                  ),
                  subtitle: "Network average",
                  icon: TrendingUp,
                  color: "primary",
                },
              ]}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getTopPerformers().map((partner, index) => (
                      <div
                        key={partner.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                            <span className="text-sm font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{partner.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {partner.company}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            {partner.achievement}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {getTierBadge(partner.tier)}
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
                    <Activity className="h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          Commission paid to Rajesh Kumar
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ₹38,250 for January 2024
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2h ago
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <UserPlus className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          New lead assigned to Priya Sharma
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Verma Enterprises - Commercial Space
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        4h ago
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <BookOpen className="h-4 w-4 text-purple-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          Training completed by Amit Patel
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Digital Marketing for Real Estate
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        6h ago
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Shield className="h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          KYC verification completed
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Sunita Reddy - All documents approved
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1d ago
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Territory Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {territories.slice(0, 5).map((territory) => (
                      <div key={territory.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{territory.name}</span>
                          <span className="text-sm">{territory.coverage}%</span>
                        </div>
                        <Progress value={territory.coverage} />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>
                            {territory.assignedPartners.length} partners
                          </span>
                          <span>{territory.activeLeads} active leads</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Commission Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Paid</span>
                      <span className="font-bold text-green-600">
                        ₹
                        {(
                          commissions
                            .filter((c) => c.status === "paid")
                            .reduce((sum, c) => sum + c.commissionAmount, 0) /
                          100000
                        ).toFixed(1)}
                        L
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved</span>
                      <span className="font-bold text-blue-600">
                        ₹
                        {(
                          commissions
                            .filter((c) => c.status === "approved")
                            .reduce((sum, c) => sum + c.commissionAmount, 0) /
                          100000
                        ).toFixed(1)}
                        L
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending</span>
                      <span className="font-bold text-yellow-600">
                        ₹
                        {(
                          commissions
                            .filter((c) => c.status === "pending")
                            .reduce((sum, c) => sum + c.commissionAmount, 0) /
                          100000
                        ).toFixed(1)}
                        L
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Disputed</span>
                      <span className="font-bold text-red-600">
                        ₹
                        {(
                          commissions
                            .filter((c) => c.status === "disputed")
                            .reduce((sum, c) => sum + c.commissionAmount, 0) /
                          100000
                        ).toFixed(1)}
                        L
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Assign New Lead
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Commission
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Send className="mr-2 h-4 w-4" />
                      Send Marketing Material
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Schedule Training
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Partner Communication
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <SearchFilterToolbar
              title="Partner Directory"
              subtitle="Manage all channel partners and their details"
              searchPlaceholder="Search partners..."
              secondaryActions={[
                {
                  label: "Filter",
                  icon: Filter,
                  onClick: () => {},
                  variant: "outline",
                },
              ]}
            />

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Partner</TableHead>
                      <TableHead>Territory</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {partner.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{partner.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {partner.company}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                {getTierBadge(partner.tier)}
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < Math.floor(partner.rating)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {partner.rating}/5.0
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {partner.location}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {partner.territory.join(", ")}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Target Achievement</span>
                              <span>{partner.achievement}%</span>
                            </div>
                            <Progress value={partner.achievement} />
                            <div className="text-xs text-muted-foreground">
                              ₹{(partner.totalRevenue / 100000).toFixed(1)}L
                              revenue
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {partner.conversionRate}% conversion rate
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {partner.commissionRate}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ₹
                              {(
                                (partner.totalRevenue *
                                  partner.commissionRate) /
                                10000000
                              ).toFixed(1)}
                              L earned
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {getStatusBadge(partner.status)}
                            <div className="text-xs text-muted-foreground">
                              KYC: {partner.kycStatus}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{partner.lastActivity}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
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

          <TabsContent value="commissions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Commission Management</h3>
                <p className="text-sm text-muted-foreground">
                  Track and process partner commissions
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Bulk
                </Button>
                <Button>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Process Payments
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Commissions
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹{(calculateTotalCommissions() / 100000).toFixed(1)}L
                  </div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Payments
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹{(calculatePendingCommissions() / 100000).toFixed(1)}L
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {
                      commissions.filter(
                        (c) =>
                          c.status === "pending" || c.status === "approved",
                      ).length
                    }{" "}
                    pending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    This Month
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹
                    {(
                      commissions
                        .filter((c) => c.period === "January 2024")
                        .reduce((sum, c) => sum + c.commissionAmount, 0) /
                      100000
                    ).toFixed(1)}
                    L
                  </div>
                  <p className="text-xs text-muted-foreground">Current month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg Commission Rate
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(
                      partners.reduce((sum, p) => sum + p.commissionRate, 0) /
                      partners.length
                    ).toFixed(1)}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Network average
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Partner</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commissions.map((commission) => (
                      <TableRow key={commission.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {commission.partnerName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {commission.invoiceNumber}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{commission.period}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {commission.projectName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {commission.clientName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          ₹{commission.revenue.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              ₹{commission.commissionAmount.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              @ {commission.commissionRate}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getCommissionStatusBadge(commission.status)}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{commission.dueDate}</div>
                            {commission.paidDate && (
                              <div className="text-sm text-green-600">
                                Paid: {commission.paidDate}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {commission.status === "pending" && (
                              <Button variant="ghost" size="sm">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
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

          <TabsContent value="leads" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Lead Assignment</h3>
                <p className="text-sm text-muted-foreground">
                  Assign and track leads across partner network
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Auto-Assign Rules
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Assign Lead
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Assign Lead to Partner</DialogTitle>
                      <DialogDescription>
                        Select a partner to assign this lead based on territory
                        and expertise
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="lead-client">Client Name</Label>
                        <Input
                          id="lead-client"
                          placeholder="Enter client name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="project-type">Project Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="apartment">
                                Apartment
                              </SelectItem>
                              <SelectItem value="villa">Villa</SelectItem>
                              <SelectItem value="commercial">
                                Commercial
                              </SelectItem>
                              <SelectItem value="plot">Plot</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lead-value">Lead Value (₹)</Label>
                          <Input
                            id="lead-value"
                            type="number"
                            placeholder="5000000"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="lead-location">Location</Label>
                          <Input id="lead-location" placeholder="City, State" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lead-priority">Priority</Label>
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
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partner-assignment">
                          Assign to Partner
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select partner" />
                          </SelectTrigger>
                          <SelectContent>
                            {partners
                              .filter((p) => p.status === "active")
                              .map((partner) => (
                                <SelectItem key={partner.id} value={partner.id}>
                                  {partner.name} - {partner.location} (
                                  {partner.tier})
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lead-notes">Notes</Label>
                        <Textarea
                          id="lead-notes"
                          placeholder="Additional notes for the partner"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Save Draft</Button>
                      <Button>Assign Lead</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Leads
                  </CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{leads.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {getActiveLeadsCount()} active leads
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Conversion Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      (leads.filter((l) => l.status === "closed").length /
                        leads.length) *
                        100,
                    )}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {leads.filter((l) => l.status === "closed").length} closed
                    deals
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pipeline Value
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹
                    {(
                      leads
                        .filter((l) => !["closed", "lost"].includes(l.status))
                        .reduce((sum, l) => sum + l.value, 0) / 10000000
                    ).toFixed(1)}
                    Cr
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active pipeline
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg Deal Size
                  </CardTitle>
                  <Calculator className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹
                    {(
                      leads.reduce((sum, l) => sum + l.value, 0) /
                      leads.length /
                      1000000
                    ).toFixed(1)}
                    Cr
                  </div>
                  <p className="text-xs text-muted-foreground">Average value</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Project Details</TableHead>
                      <TableHead>Assigned Partner</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Probability</TableHead>
                      <TableHead>Next Follow-up</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{lead.clientName}</div>
                            <div className="text-sm text-muted-foreground">
                              {lead.location}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {lead.projectType}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ₹{(lead.value / 1000000).toFixed(1)}Cr
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Source: {lead.source}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{lead.assignedTo}</div>
                            <div className="text-sm text-muted-foreground">
                              Assigned: {lead.assignedDate}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getLeadStatusBadge(lead.status)}</TableCell>
                        <TableCell>{getPriorityBadge(lead.priority)}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {lead.probability}%
                            </div>
                            <Progress
                              value={lead.probability}
                              className="w-16"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{lead.nextFollowUp}</div>
                            <div className="text-xs text-muted-foreground">
                              Last: {lead.lastContact}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
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

          <TabsContent value="territories" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Territory Management</h3>
                <p className="text-sm text-muted-foreground">
                  Manage partner territories and coverage areas
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Map className="mr-2 h-4 w-4" />
                  Territory Map
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Territory
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {territories.map((territory) => (
                <Card key={territory.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {territory.name}
                      </CardTitle>
                      <Badge variant="outline">{territory.state}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Coverage</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Coverage Rate</span>
                          <span>{territory.coverage}%</span>
                        </div>
                        <Progress value={territory.coverage} />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Cities</h4>
                      <div className="flex flex-wrap gap-1">
                        {territory.cities.map((city, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {city}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Assigned Partners</h4>
                      {territory.assignedPartners.length > 0 ? (
                        <div className="space-y-1">
                          {territory.assignedPartners.map(
                            (partnerName, index) => (
                              <div key={index} className="text-sm font-medium">
                                {partnerName}
                              </div>
                            ),
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          No partners assigned
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">
                          Target Revenue
                        </div>
                        <div className="font-medium">
                          ₹{(territory.targetRevenue / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Actual Revenue
                        </div>
                        <div className="font-medium">
                          ₹{(territory.actualRevenue / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Active Leads
                        </div>
                        <div className="font-medium">
                          {territory.activeLeads}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Closed Deals
                        </div>
                        <div className="font-medium">
                          {territory.closedDeals}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
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

          <TabsContent value="training" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Partner Training</h3>
                <p className="text-sm text-muted-foreground">
                  Training programs and certification management
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Training Calendar
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Course
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trainings.map((training) => (
                <Card key={training.id}>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{training.title}</h4>
                          <Badge variant="outline">{training.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {training.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Duration</span>
                          <span>{training.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Level</span>
                          <Badge
                            variant="outline"
                            className={
                              training.level === "beginner"
                                ? "bg-green-50"
                                : training.level === "intermediate"
                                  ? "bg-yellow-50"
                                  : "bg-red-50"
                            }
                          >
                            {training.level}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Instructor</span>
                          <span>{training.instructor}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completion Rate</span>
                          <span>{training.completionRate}%</span>
                        </div>
                        <Progress value={training.completionRate} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(training.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs">{training.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {training.enrolledCount} enrolled
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium mb-1">Modules</h5>
                        <div className="space-y-1">
                          {training.modules.slice(0, 3).map((module, index) => (
                            <div
                              key={index}
                              className="text-xs text-muted-foreground"
                            >
                              • {module}
                            </div>
                          ))}
                          {training.modules.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{training.modules.length - 3} more modules
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                        <Button size="sm" className="flex-1">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Enroll Partners
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portal" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Partner Portal</h3>
                <p className="text-sm text-muted-foreground">
                  Self-service portal for partners with resources and tools
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Portal Settings
                </Button>
                <Button>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Portal
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Portal Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">
                            Performance Dashboard
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Real-time performance metrics
                          </div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Target className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">Lead Management</div>
                          <div className="text-sm text-muted-foreground">
                            View and manage assigned leads
                          </div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Wallet className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium">Commission Tracker</div>
                          <div className="text-sm text-muted-foreground">
                            Track earnings and payments
                          </div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium">Training Center</div>
                          <div className="text-sm text-muted-foreground">
                            Access training materials
                          </div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <div className="font-medium">Marketing Materials</div>
                          <div className="text-sm text-muted-foreground">
                            Download brochures and materials
                          </div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-medium">Support Tickets</div>
                          <div className="text-sm text-muted-foreground">
                            Raise and track support requests
                          </div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Portal Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          156
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Active Users
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          89%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Login Rate
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Feature Usage</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Lead Management</span>
                            <span>94%</span>
                          </div>
                          <Progress value={94} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Commission Tracker</span>
                            <span>87%</span>
                          </div>
                          <Progress value={87} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Training Center</span>
                            <span>72%</span>
                          </div>
                          <Progress value={72} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Marketing Materials</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Recent Activity</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>New lead assigned</span>
                          <span className="text-muted-foreground">2h ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Training completed</span>
                          <span className="text-muted-foreground">4h ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Commission payment</span>
                          <span className="text-muted-foreground">1d ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Brochure downloaded</span>
                          <span className="text-muted-foreground">2d ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Partner Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Rajesh Kumar</div>
                          <div className="text-sm text-muted-foreground">
                            Delhi Property Solutions
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "The portal is very user-friendly and makes lead
                      management much easier. Commission tracking is transparent
                      and the training materials are excellent."
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      2 days ago
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>PS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Priya Sharma</div>
                          <div className="text-sm text-muted-foreground">
                            Mumbai Realty Connect
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <Star className="w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Great platform overall. Would love to see more advanced
                      filtering options in the lead section and mobile app
                      support for on-the-go access."
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      5 days ago
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Marketing Materials</h3>
                <p className="text-sm text-muted-foreground">
                  Manage and distribute marketing materials to partners
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Materials
                </Button>
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Send to Partners
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Material Library
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Project Brochures",
                        type: "PDF",
                        size: "12.5 MB",
                        downloads: 89,
                      },
                      {
                        name: "Price List 2024",
                        type: "Excel",
                        size: "2.1 MB",
                        downloads: 156,
                      },
                      {
                        name: "Virtual Tour Videos",
                        type: "MP4",
                        size: "245 MB",
                        downloads: 67,
                      },
                      {
                        name: "Floor Plans",
                        type: "PDF",
                        size: "8.9 MB",
                        downloads: 134,
                      },
                      {
                        name: "Sales Presentations",
                        type: "PPT",
                        size: "15.3 MB",
                        downloads: 78,
                      },
                      {
                        name: "Legal Documentation",
                        type: "PDF",
                        size: "5.7 MB",
                        downloads: 45,
                      },
                    ].map((material, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{material.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {material.type} • {material.size}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {material.downloads}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            downloads
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
                    <Send className="h-5 w-5" />
                    Distribution Campaigns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">
                          Q1 2024 Product Launch
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        New project brochures and pricing sent to all active
                        partners
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Sent</div>
                          <div className="font-medium">145 partners</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Opened</div>
                          <div className="font-medium">127 (87%)</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">
                            Downloaded
                          </div>
                          <div className="font-medium">98 (68%)</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">
                          Training Material Update
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        Updated sales training materials distributed to platinum
                        partners
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Sent</div>
                          <div className="font-medium">23 partners</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Opened</div>
                          <div className="font-medium">23 (100%)</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">
                            Downloaded
                          </div>
                          <div className="font-medium">21 (91%)</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">
                          Festival Marketing Kit
                        </div>
                        <Badge className="bg-yellow-500">Scheduled</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        Special festival offers and marketing materials
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Scheduled for: March 15, 2024
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Material Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Material Performance Charts</p>
                    <p className="text-sm text-gray-400">
                      Download statistics, engagement metrics, and partner
                      feedback analytics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Partner Support</h3>
                <p className="text-sm text-muted-foreground">
                  Support ticket management and partner assistance
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Tickets
                </Button>
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  New Ticket
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Open Tickets
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">
                    5 urgent priority
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg Response Time
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4h</div>
                  <p className="text-xs text-muted-foreground">Within SLA</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Resolution Rate
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">First contact</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Satisfaction
                  </CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8/5</div>
                  <p className="text-xs text-muted-foreground">
                    Partner rating
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Partner</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: "TK-001",
                        partner: "Rajesh Kumar",
                        subject: "Commission calculation discrepancy",
                        category: "Finance",
                        priority: "high",
                        status: "open",
                        created: "2024-01-29",
                      },
                      {
                        id: "TK-002",
                        partner: "Priya Sharma",
                        subject: "Unable to access marketing materials",
                        category: "Technical",
                        priority: "medium",
                        status: "in-progress",
                        created: "2024-01-28",
                      },
                      {
                        id: "TK-003",
                        partner: "Amit Patel",
                        subject: "Lead assignment not received",
                        category: "Sales",
                        priority: "urgent",
                        status: "open",
                        created: "2024-01-28",
                      },
                      {
                        id: "TK-004",
                        partner: "Sunita Reddy",
                        subject: "Training course not loading",
                        category: "Technical",
                        priority: "low",
                        status: "resolved",
                        created: "2024-01-27",
                      },
                    ].map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <div className="font-medium">{ticket.id}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{ticket.partner}</div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            <div className="font-medium truncate">
                              {ticket.subject}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{ticket.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {getPriorityBadge(ticket.priority)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              ticket.status === "open"
                                ? "bg-red-500"
                                : ticket.status === "in-progress"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }
                          >
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{ticket.created}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
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

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Channel Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive analytics and insights on partner performance
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
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
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹
                    {(
                      partners.reduce((sum, p) => sum + p.totalRevenue, 0) /
                      10000000
                    ).toFixed(1)}
                    Cr
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                    12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Network Performance
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      partners.reduce((sum, p) => sum + p.achievement, 0) /
                        partners.length,
                    )}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                    8% improvement
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Lead Conversion
                  </CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      partners.reduce((sum, p) => sum + p.conversionRate, 0) /
                        partners.length,
                    )}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                    2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Partner Satisfaction
                  </CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.6/5</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                    0.2 improvement
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Revenue Trend Chart</p>
                      <p className="text-sm text-gray-400">
                        Monthly revenue growth across partner network
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Partner Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Partner Tier Distribution</p>
                      <p className="text-sm text-gray-400">
                        Breakdown by platinum, gold, silver, bronze tiers
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getTopPerformers().map((partner, index) => (
                    <div
                      key={partner.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <Avatar>
                          <AvatarFallback>
                            {partner.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{partner.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {partner.company}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-8 text-center">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Revenue
                          </div>
                          <div className="font-bold">
                            ₹{(partner.totalRevenue / 100000).toFixed(1)}L
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Achievement
                          </div>
                          <div className="font-bold">
                            {partner.achievement}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Conversion
                          </div>
                          <div className="font-bold">
                            {partner.conversionRate}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Rating
                          </div>
                          <div className="font-bold">{partner.rating}/5.0</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
