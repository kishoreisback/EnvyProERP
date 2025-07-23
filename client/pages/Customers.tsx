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
  Heart,
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
  Home,
  Crown,
  Award,
  HandShake,
  Briefcase,
  CreditCard,
  Receipt,
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
  ShoppingCart,
  Package,
  Truck,
  Gift,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Tag,
  Percent,
  Building,
  MapPinned,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Sparkles,
  Repeat,
} from "lucide-react";
import {
  AnimatedIcon,
  PulsingDot,
  LoadingSpinner,
  GlowingOrb,
} from "@/components/ui/animated-icons";

// Customer Management interfaces
interface Customer {
  id: string;
  customerId: string; // CRM-generated ID
  name: string;
  type: "Individual" | "Family" | "Corporate";
  category: "Premium" | "Standard" | "VIP" | "New";
  status: "Active" | "Inactive" | "Prospect" | "Lost" | "Churned";
  stage:
    | "Prospect"
    | "Lead"
    | "Qualified"
    | "Customer"
    | "Repeat Customer"
    | "VIP Customer";
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    mobile: string;
    dateOfBirth?: string;
    anniversary?: string;
    occupation?: string;
    income?: number;
  };
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  preferences: {
    propertyType?: string[];
    budgetRange?: { min: number; max: number };
    localities?: string[];
    amenities?: string[];
    communicationMethod: "Email" | "Phone" | "WhatsApp" | "SMS";
    language: "English" | "Hindi" | "Regional";
    visitTime?: "Morning" | "Afternoon" | "Evening" | "Weekend";
  };
  purchases: Purchase[];
  interactions: CustomerInteraction[];
  satisfaction: CustomerSatisfaction;
  loyalty: LoyaltyInfo;
  referrals: Referral[];
  documents: CustomerDocument[];
  family?: FamilyMember[];
  createdAt: string;
  lastInteraction: string;
  assignedAgent: string;
  lifetimeValue: number;
  riskScore: number;
  satisfactionScore: number;
  source: "Website" | "Referral" | "Advertisement" | "Walk-in" | "Social Media";
}

interface Purchase {
  id: string;
  propertyId?: string;
  productId?: string;
  propertyName?: string;
  productName?: string;
  type: "Property" | "Product" | "Service";
  category: string;
  purchaseDate: string;
  amount: number;
  paymentMethod: string;
  status: "Completed" | "Pending" | "Cancelled" | "Refunded";
  warranty?: string;
  deliveryDate?: string;
  installments?: PaymentInstallment[];
  satisfaction?: number;
  review?: string;
}

interface PaymentInstallment {
  id: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "Pending" | "Paid" | "Overdue";
  method?: string;
}

interface CustomerInteraction {
  id: string;
  type:
    | "Inquiry"
    | "Site Visit"
    | "Purchase"
    | "Complaint"
    | "Feedback"
    | "Support"
    | "Follow-up"
    | "Referral";
  channel: "Phone" | "Email" | "WhatsApp" | "In-person" | "Website" | "App";
  subject: string;
  description: string;
  outcome: "Positive" | "Neutral" | "Negative" | "Pending";
  timestamp: string;
  agent: string;
  followUpRequired: boolean;
  followUpDate?: string;
  resolution?: string;
  resolutionTime?: number; // minutes
}

interface CustomerSatisfaction {
  overallScore: number; // 0-10
  lastSurveyDate?: string;
  npsScore?: number; // Net Promoter Score
  feedback: string;
  areas: {
    product: number;
    service: number;
    support: number;
    value: number;
  };
}

interface LoyaltyInfo {
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  points: number;
  totalEarned: number;
  totalRedeemed: number;
  joinDate: string;
  lastActivity: string;
  benefits: string[];
  referralCount: number;
}

interface Referral {
  id: string;
  referredCustomerId?: string;
  referredName: string;
  referredContact: string;
  status: "Pending" | "Converted" | "Lost";
  rewardEarned?: number;
  conversionDate?: string;
  referralSource: string;
}

interface CustomerDocument {
  id: string;
  name: string;
  type:
    | "ID Proof"
    | "Address Proof"
    | "Income Proof"
    | "Agreement"
    | "Receipt"
    | "Warranty"
    | "Photo"
    | "Other";
  uploadedDate: string;
  expiryDate?: string;
  verified: boolean;
  url: string;
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: "Spouse" | "Child" | "Parent" | "Sibling" | "Other";
  age?: number;
  occupation?: string;
  influence: "High" | "Medium" | "Low";
}

export default function Customers() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [showSatisfactionModal, setShowSatisfactionModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { register, handleSubmit, control, watch, reset } = useForm();

  // Sample customers data
  const [customers] = useState<Customer[]>([
    {
      id: "cust-001",
      customerId: "CUST2024001",
      name: "Priya Sharma",
      type: "Individual",
      category: "Premium",
      status: "Active",
      stage: "Customer",
      personalInfo: {
        firstName: "Priya",
        lastName: "Sharma",
        email: "priya.sharma@gmail.com",
        phone: "022-28901234",
        mobile: "+91-9876543210",
        dateOfBirth: "1985-06-15",
        anniversary: "2010-12-01",
        occupation: "Software Engineer",
        income: 1800000,
      },
      address: {
        street: "Flat 301, Emerald Heights, Andheri East",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400069",
        country: "India",
        coordinates: { lat: 19.1136, lng: 72.8697 },
      },
      preferences: {
        propertyType: ["2BHK", "3BHK"],
        budgetRange: { min: 8000000, max: 12000000 },
        localities: ["Andheri", "Powai", "Bandra"],
        amenities: ["Gym", "Swimming Pool", "Children's Play Area"],
        communicationMethod: "WhatsApp",
        language: "English",
        visitTime: "Weekend",
      },
      purchases: [
        {
          id: "pur-001",
          propertyId: "prop-001",
          propertyName: "Skyline Towers 2BHK - A-301",
          type: "Property",
          category: "Residential",
          purchaseDate: "2024-01-15",
          amount: 9500000,
          paymentMethod: "Home Loan + Own Funds",
          status: "Completed",
          warranty: "5 Years Structural",
          deliveryDate: "2024-12-01",
          installments: [
            {
              id: "inst-001",
              amount: 950000,
              dueDate: "2024-01-15",
              paidDate: "2024-01-15",
              status: "Paid",
              method: "RTGS",
            },
            {
              id: "inst-002",
              amount: 2850000,
              dueDate: "2024-06-01",
              paidDate: "2024-05-28",
              status: "Paid",
              method: "Home Loan",
            },
            {
              id: "inst-003",
              amount: 5700000,
              dueDate: "2024-12-01",
              status: "Pending",
            },
          ],
          satisfaction: 9,
          review:
            "Excellent project quality and timely delivery. Very satisfied with the purchase.",
        },
      ],
      interactions: [
        {
          id: "int-001",
          type: "Purchase",
          channel: "In-person",
          subject: "Property Purchase - Skyline Towers",
          description: "Completed purchase of 2BHK apartment",
          outcome: "Positive",
          timestamp: "2024-01-15 11:30",
          agent: "Rajesh Kumar",
          followUpRequired: true,
          followUpDate: "2024-02-15",
          resolution: "Purchase completed successfully",
          resolutionTime: 45,
        },
        {
          id: "int-002",
          type: "Follow-up",
          channel: "WhatsApp",
          subject: "Construction Progress Update",
          description: "Monthly progress update shared",
          outcome: "Positive",
          timestamp: "2024-01-20 16:00",
          agent: "Priya Patel",
          followUpRequired: false,
        },
      ],
      satisfaction: {
        overallScore: 9.2,
        lastSurveyDate: "2024-01-20",
        npsScore: 9,
        feedback:
          "Excellent service and product quality. Will recommend to others.",
        areas: {
          product: 9.5,
          service: 9.0,
          support: 8.8,
          value: 9.2,
        },
      },
      loyalty: {
        tier: "Gold",
        points: 4750,
        totalEarned: 9500,
        totalRedeemed: 4750,
        joinDate: "2024-01-15",
        lastActivity: "2024-01-20",
        benefits: [
          "Priority Customer Service",
          "Exclusive Property Previews",
          "Referral Bonuses",
        ],
        referralCount: 2,
      },
      referrals: [
        {
          id: "ref-001",
          referredName: "Amit Sharma",
          referredContact: "+91-9123456789",
          status: "Converted",
          rewardEarned: 50000,
          conversionDate: "2024-01-25",
          referralSource: "Family",
        },
        {
          id: "ref-002",
          referredName: "Neha Gupta",
          referredContact: "+91-9234567890",
          status: "Pending",
          referralSource: "Friend",
        },
      ],
      documents: [
        {
          id: "doc-001",
          name: "Aadhaar Card",
          type: "ID Proof",
          uploadedDate: "2024-01-10",
          verified: true,
          url: "/documents/aadhaar-001.pdf",
        },
        {
          id: "doc-002",
          name: "Sale Agreement",
          type: "Agreement",
          uploadedDate: "2024-01-15",
          verified: true,
          url: "/documents/agreement-001.pdf",
        },
      ],
      family: [
        {
          id: "fam-001",
          name: "Ravi Sharma",
          relationship: "Spouse",
          age: 35,
          occupation: "Marketing Manager",
          influence: "High",
        },
        {
          id: "fam-002",
          name: "Arya Sharma",
          relationship: "Child",
          age: 8,
          influence: "Medium",
        },
      ],
      createdAt: "2024-01-10",
      lastInteraction: "2024-01-20",
      assignedAgent: "Rajesh Kumar",
      lifetimeValue: 9500000,
      riskScore: 15, // Low risk
      satisfactionScore: 92,
      source: "Website",
    },
    {
      id: "cust-002",
      customerId: "CUST2024002",
      name: "Vikash Patel",
      type: "Family",
      category: "Standard",
      status: "Active",
      stage: "Repeat Customer",
      personalInfo: {
        firstName: "Vikash",
        lastName: "Patel",
        email: "vikash.patel@yahoo.com",
        phone: "020-12345678",
        mobile: "+91-9123456789",
        dateOfBirth: "1978-09-22",
        occupation: "Business Owner",
        income: 2500000,
      },
      address: {
        street: "Row House 15, Green Valley Society, Hinjewadi",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411057",
        country: "India",
        coordinates: { lat: 18.5913, lng: 73.7389 },
      },
      preferences: {
        propertyType: ["Villa", "Row House"],
        budgetRange: { min: 15000000, max: 25000000 },
        localities: ["Hinjewadi", "Baner", "Aundh"],
        amenities: ["Garden", "Parking", "Security"],
        communicationMethod: "Phone",
        language: "Hindi",
        visitTime: "Morning",
      },
      purchases: [
        {
          id: "pur-002",
          propertyId: "prop-002",
          propertyName: "Green Valley Villa - V-15",
          type: "Property",
          category: "Residential",
          purchaseDate: "2023-08-15",
          amount: 18500000,
          paymentMethod: "Own Funds",
          status: "Completed",
          warranty: "10 Years Structural",
          deliveryDate: "2023-12-01",
          satisfaction: 8,
          review: "Good quality villa with excellent location.",
        },
        {
          id: "pur-003",
          propertyId: "prop-003",
          propertyName: "Green Valley Commercial - Shop 12",
          type: "Property",
          category: "Commercial",
          purchaseDate: "2024-01-10",
          amount: 8500000,
          paymentMethod: "Business Loan",
          status: "Pending",
          deliveryDate: "2024-08-01",
        },
      ],
      interactions: [
        {
          id: "int-003",
          type: "Purchase",
          channel: "In-person",
          subject: "Second Property Purchase",
          description: "Purchased commercial shop",
          outcome: "Positive",
          timestamp: "2024-01-10 14:00",
          agent: "Anjali Singh",
          followUpRequired: true,
          followUpDate: "2024-02-01",
        },
      ],
      satisfaction: {
        overallScore: 8.5,
        lastSurveyDate: "2024-01-12",
        npsScore: 8,
        feedback: "Satisfied with both purchases. Good investment options.",
        areas: {
          product: 8.5,
          service: 8.2,
          support: 8.8,
          value: 8.7,
        },
      },
      loyalty: {
        tier: "Platinum",
        points: 13500,
        totalEarned: 27000,
        totalRedeemed: 13500,
        joinDate: "2023-08-15",
        lastActivity: "2024-01-12",
        benefits: [
          "VIP Customer Service",
          "Exclusive Deals",
          "Free Property Maintenance",
          "Premium Referral Rewards",
        ],
        referralCount: 3,
      },
      referrals: [
        {
          id: "ref-003",
          referredName: "Suresh Patel",
          referredContact: "+91-9345678901",
          status: "Converted",
          rewardEarned: 75000,
          conversionDate: "2023-12-01",
          referralSource: "Business Partner",
        },
      ],
      documents: [
        {
          id: "doc-003",
          name: "PAN Card",
          type: "ID Proof",
          uploadedDate: "2023-08-10",
          verified: true,
          url: "/documents/pan-002.pdf",
        },
      ],
      family: [
        {
          id: "fam-003",
          name: "Meera Patel",
          relationship: "Spouse",
          age: 42,
          occupation: "Teacher",
          influence: "High",
        },
        {
          id: "fam-004",
          name: "Rohan Patel",
          relationship: "Child",
          age: 16,
          influence: "Medium",
        },
      ],
      createdAt: "2023-08-10",
      lastInteraction: "2024-01-12",
      assignedAgent: "Anjali Singh",
      lifetimeValue: 27000000,
      riskScore: 10, // Very low risk
      satisfactionScore: 85,
      source: "Referral",
    },
    {
      id: "cust-003",
      customerId: "CUST2024003",
      name: "Anita Gupta",
      type: "Individual",
      category: "New",
      status: "Prospect",
      stage: "Qualified",
      personalInfo: {
        firstName: "Anita",
        lastName: "Gupta",
        email: "anita.gupta@hotmail.com",
        phone: "011-23456789",
        mobile: "+91-9234567890",
        dateOfBirth: "1990-03-10",
        occupation: "Doctor",
        income: 2200000,
      },
      address: {
        street: "Apartment 402, Royal Gardens, Sector 18",
        city: "Gurgaon",
        state: "Haryana",
        pincode: "122001",
        country: "India",
        coordinates: { lat: 28.4595, lng: 77.0266 },
      },
      preferences: {
        propertyType: ["3BHK", "4BHK"],
        budgetRange: { min: 12000000, max: 18000000 },
        localities: ["Sector 18", "Sector 28", "DLF Phase 2"],
        amenities: ["Hospital Nearby", "Metro Connectivity", "Schools"],
        communicationMethod: "Email",
        language: "English",
        visitTime: "Evening",
      },
      purchases: [],
      interactions: [
        {
          id: "int-004",
          type: "Inquiry",
          channel: "Website",
          subject: "Property Inquiry - 3BHK",
          description: "Interested in 3BHK apartments near hospital",
          outcome: "Positive",
          timestamp: "2024-01-18 10:30",
          agent: "Neha Joshi",
          followUpRequired: true,
          followUpDate: "2024-01-22",
        },
        {
          id: "int-005",
          type: "Site Visit",
          channel: "In-person",
          subject: "Site Visit - Premium Heights",
          description: "Visited project site and showed sample flat",
          outcome: "Positive",
          timestamp: "2024-01-20 15:00",
          agent: "Neha Joshi",
          followUpRequired: true,
          followUpDate: "2024-01-25",
        },
      ],
      satisfaction: {
        overallScore: 0,
        feedback: "",
        areas: {
          product: 0,
          service: 0,
          support: 0,
          value: 0,
        },
      },
      loyalty: {
        tier: "Bronze",
        points: 0,
        totalEarned: 0,
        totalRedeemed: 0,
        joinDate: "2024-01-18",
        lastActivity: "2024-01-20",
        benefits: ["Welcome Bonus"],
        referralCount: 0,
      },
      referrals: [],
      documents: [],
      family: [],
      createdAt: "2024-01-18",
      lastInteraction: "2024-01-20",
      assignedAgent: "Neha Joshi",
      lifetimeValue: 0,
      riskScore: 40, // Medium risk (prospect)
      satisfactionScore: 0,
      source: "Website",
    },
  ]);

  // Calculate customer metrics
  const customerStats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter((c) => c.status === "Active").length,
    prospects: customers.filter((c) => c.stage === "Prospect").length,
    totalLifetimeValue: customers.reduce((sum, c) => sum + c.lifetimeValue, 0),
    avgSatisfactionScore:
      customers
        .filter((c) => c.satisfactionScore > 0)
        .reduce((sum, c) => sum + c.satisfactionScore, 0) /
      customers.filter((c) => c.satisfactionScore > 0).length,
    totalReferrals: customers.reduce((sum, c) => sum + c.referrals.length, 0),
    totalPurchases: customers.reduce((sum, c) => sum + c.purchases.length, 0),
    avgLifetimeValue:
      customers.reduce((sum, c) => sum + c.lifetimeValue, 0) / customers.length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Prospect":
        return "bg-blue-100 text-blue-800";
      case "Lost":
        return "bg-red-100 text-red-800";
      case "Churned":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Prospect":
        return "bg-blue-100 text-blue-800";
      case "Lead":
        return "bg-yellow-100 text-yellow-800";
      case "Qualified":
        return "bg-orange-100 text-orange-800";
      case "Customer":
        return "bg-green-100 text-green-800";
      case "Repeat Customer":
        return "bg-purple-100 text-purple-800";
      case "VIP Customer":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return "bg-amber-100 text-amber-800";
      case "Silver":
        return "bg-slate-100 text-slate-800";
      case "Gold":
        return "bg-yellow-100 text-yellow-800";
      case "Platinum":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 20) return "bg-green-100 text-green-800";
    if (score <= 50) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getRiskLevel = (score: number) => {
    if (score <= 20) return "Low";
    if (score <= 50) return "Medium";
    return "High";
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
              Customer Experience Management
            </h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Complete customer lifecycle management with satisfaction tracking,
              loyalty programs, and personalized service
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <PulsingDot className="text-green-500" />
                {customerStats.activeCustomers} Active
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <Star className="h-4 w-4 text-yellow-500" />
                {customerStats.avgSatisfactionScore.toFixed(1)} Satisfaction
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs lg:text-sm"
              >
                <Crown className="h-4 w-4 text-purple-500" />₹
                {(customerStats.totalLifetimeValue / 10000000).toFixed(1)}Cr LTV
              </Badge>
            </div>
            <Button
              onClick={() => setShowAddCustomerModal(true)}
              className="w-full sm:w-auto"
            >
              <AnimatedIcon icon={Plus} className="mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-8">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Over</span>
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Heart className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Customers</span>
              <span className="sm:hidden">Cust</span>
            </TabsTrigger>
            <TabsTrigger
              value="purchases"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <ShoppingCart className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Purchases</span>
              <span className="lg:hidden">Buy</span>
            </TabsTrigger>
            <TabsTrigger
              value="interactions"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <MessageSquare className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Interactions</span>
              <span className="lg:hidden">Chat</span>
            </TabsTrigger>
            <TabsTrigger
              value="satisfaction"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <ThumbsUp className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Satisfaction</span>
              <span className="lg:hidden">Happy</span>
            </TabsTrigger>
            <TabsTrigger
              value="loyalty"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Award className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Loyalty</span>
              <span className="lg:hidden">Loyal</span>
            </TabsTrigger>
            <TabsTrigger
              value="referrals"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <Share2 className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Referrals</span>
              <span className="lg:hidden">Ref</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
            >
              <PieChart className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Analytics</span>
              <span className="lg:hidden">Data</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Customer Stats */}
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-6 w-6 lg:h-8 lg:w-8 text-pink-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {customerStats.totalCustomers}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Total Customers
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
                        {customerStats.activeCustomers}
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
                    <Target className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {customerStats.prospects}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Prospects
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
                        {(customerStats.totalLifetimeValue / 10000000).toFixed(
                          1,
                        )}
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
                    <Star className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {customerStats.avgSatisfactionScore.toFixed(1)}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Avg Satisfaction
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {customerStats.totalReferrals}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Referrals
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6 lg:h-8 lg:w-8 text-orange-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        {customerStats.totalPurchases}
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Purchases
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 lg:h-8 lg:w-8 text-teal-600" />
                    <div>
                      <div className="text-lg lg:text-2xl font-bold">
                        ₹{(customerStats.avgLifetimeValue / 1000000).toFixed(1)}
                        M
                      </div>
                      <div className="text-xs lg:text-sm text-muted-foreground">
                        Avg LTV
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Customer Journey */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Zap} animation="pulse" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Common customer management tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="w-full justify-start" variant="outline">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Customer
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Log Interaction
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Survey
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Gift className="mr-2 h-4 w-4" />
                      Loyalty Reward
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Activity} animation="float" />
                    Customer Journey Stages
                  </CardTitle>
                  <CardDescription>
                    Customer progression through sales funnel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { stage: "Prospect", count: 1, color: "blue" },
                      { stage: "Lead", count: 0, color: "yellow" },
                      { stage: "Qualified", count: 1, color: "orange" },
                      { stage: "Customer", count: 1, color: "green" },
                      { stage: "Repeat Customer", count: 1, color: "purple" },
                      { stage: "VIP Customer", count: 0, color: "pink" },
                    ].map((item) => (
                      <div
                        key={item.stage}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 bg-${item.color}-100 rounded-full flex items-center justify-center`}
                          >
                            <span
                              className={`text-${item.color}-600 font-bold text-sm`}
                            >
                              {item.count}
                            </span>
                          </div>
                          <span className="font-medium">{item.stage}</span>
                        </div>
                        <Badge className={getStageColor(item.stage)}>
                          {item.stage}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={TrendingUp} animation="bounce" />
                  Customer Performance Overview
                </CardTitle>
                <CardDescription>
                  Key metrics and performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{customer.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {customer.customerId} •{" "}
                              {customer.personalInfo.occupation}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(customer.status)}>
                              {customer.status}
                            </Badge>
                            <Badge className={getStageColor(customer.stage)}>
                              {customer.stage}
                            </Badge>
                            <Badge
                              className={getTierColor(customer.loyalty.tier)}
                            >
                              {customer.loyalty.tier}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">LTV: </span>
                            <span className="font-medium">
                              ₹{(customer.lifetimeValue / 1000000).toFixed(1)}M
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Satisfaction:{" "}
                            </span>
                            <span className="font-medium">
                              {customer.satisfactionScore || "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Purchases:{" "}
                            </span>
                            <span className="font-medium">
                              {customer.purchases.length}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Referrals:{" "}
                            </span>
                            <span className="font-medium">
                              {customer.referrals.length}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Risk:{" "}
                            </span>
                            <Badge className={getRiskColor(customer.riskScore)}>
                              {getRiskLevel(customer.riskScore)}
                            </Badge>
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

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            {/* Customer Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search customers..."
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setShowAddCustomerModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Customer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Customers Grid - Mobile Optimized */}
            <div className="grid gap-4 lg:grid-cols-2">
              {customers.map((customer) => (
                <Card
                  key={customer.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          {customer.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {customer.customerId}
                          </Badge>
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status}
                          </Badge>
                          <Badge className={getStageColor(customer.stage)}>
                            {customer.stage}
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
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Add Interaction
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Gift className="mr-2 h-4 w-4" />
                            Loyalty Reward
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">
                            {customer.personalInfo.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{customer.personalInfo.mobile}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">
                            {customer.address.city}, {customer.address.state}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="font-bold text-blue-600">
                            {customer.purchases.length}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Purchases
                          </div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-bold text-green-600">
                            {customer.satisfactionScore || "N/A"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Satisfaction
                          </div>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <div className="font-bold text-purple-600">
                            {customer.loyalty.points}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Points
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Lifetime Value:</span>
                          <span className="font-medium">
                            ₹{(customer.lifetimeValue / 1000000).toFixed(1)}M
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Loyalty Tier:</span>
                          <Badge
                            className={getTierColor(customer.loyalty.tier)}
                          >
                            {customer.loyalty.tier}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Risk Level:</span>
                          <Badge className={getRiskColor(customer.riskScore)}>
                            {getRiskLevel(customer.riskScore)}
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

          {/* Purchases Tab */}
          <TabsContent value="purchases" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Customer Purchases</h3>
                <p className="text-sm text-muted-foreground">
                  Track all customer transactions and purchase history
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Record Purchase
              </Button>
            </div>

            <div className="grid gap-4">
              {customers.flatMap((customer) =>
                customer.purchases.map((purchase) => (
                  <Card
                    key={purchase.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">
                                {purchase.propertyName || purchase.productName}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {customer.name} • {purchase.category}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{purchase.type}</Badge>
                              <Badge
                                className={
                                  purchase.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : purchase.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {purchase.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Amount:{" "}
                              </span>
                              <span className="font-medium">
                                ₹{(purchase.amount / 1000000).toFixed(1)}M
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Date:{" "}
                              </span>
                              <span className="font-medium">
                                {purchase.purchaseDate}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Payment:{" "}
                              </span>
                              <span className="font-medium">
                                {purchase.paymentMethod}
                              </span>
                            </div>
                            {purchase.satisfaction && (
                              <div>
                                <span className="text-muted-foreground">
                                  Rating:{" "}
                                </span>
                                <span className="font-medium">
                                  {purchase.satisfaction}/10
                                </span>
                              </div>
                            )}
                          </div>
                          {purchase.installments &&
                            purchase.installments.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-sm font-medium mb-2">
                                  Payment Schedule:
                                </h4>
                                <div className="space-y-1">
                                  {purchase.installments.map((installment) => (
                                    <div
                                      key={installment.id}
                                      className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded"
                                    >
                                      <span>
                                        ₹
                                        {(installment.amount / 1000000).toFixed(
                                          1,
                                        )}
                                        M - Due: {installment.dueDate}
                                      </span>
                                      <Badge
                                        className={
                                          installment.status === "Paid"
                                            ? "bg-green-100 text-green-800"
                                            : installment.status === "Overdue"
                                              ? "bg-red-100 text-red-800"
                                              : "bg-yellow-100 text-yellow-800"
                                        }
                                      >
                                        {installment.status}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Receipt className="mr-1 h-3 w-3" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )),
              )}
            </div>
          </TabsContent>

          {/* Interactions Tab */}
          <TabsContent value="interactions" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Customer Interactions</h3>
                <p className="text-sm text-muted-foreground">
                  Track all customer touchpoints and communications
                </p>
              </div>
              <Button onClick={() => setShowInteractionModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Log Interaction
              </Button>
            </div>

            <div className="grid gap-4">
              {customers.flatMap((customer) =>
                customer.interactions.map((interaction) => (
                  <Card key={interaction.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              {interaction.type === "Purchase" && (
                                <ShoppingCart className="h-4 w-4 text-blue-600" />
                              )}
                              {interaction.type === "Inquiry" && (
                                <MessageSquare className="h-4 w-4 text-blue-600" />
                              )}
                              {interaction.type === "Site Visit" && (
                                <MapPin className="h-4 w-4 text-blue-600" />
                              )}
                              {interaction.type === "Follow-up" && (
                                <Phone className="h-4 w-4 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {interaction.subject}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {customer.name} • {interaction.timestamp} •{" "}
                                {interaction.agent}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {interaction.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="outline">{interaction.type}</Badge>
                            <Badge variant="outline">
                              {interaction.channel}
                            </Badge>
                            <Badge
                              className={
                                interaction.outcome === "Positive"
                                  ? "bg-green-100 text-green-800"
                                  : interaction.outcome === "Negative"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {interaction.outcome}
                            </Badge>
                            {interaction.followUpRequired && (
                              <Badge className="bg-orange-100 text-orange-800">
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

          {/* Satisfaction Tab */}
          <TabsContent value="satisfaction" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Customer Satisfaction</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor satisfaction scores and feedback across all
                  touchpoints
                </p>
              </div>
              <Button onClick={() => setShowSatisfactionModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Record Feedback
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Satisfaction Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customers
                      .filter((c) => c.satisfactionScore > 0)
                      .map((customer) => (
                        <div key={customer.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{customer.name}</span>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  customer.satisfactionScore >= 90
                                    ? "bg-green-100 text-green-800"
                                    : customer.satisfactionScore >= 70
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {customer.satisfactionScore}/100
                              </Badge>
                            </div>
                          </div>
                          <Progress
                            value={customer.satisfactionScore}
                            className="h-2"
                          />
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            <div className="text-center">
                              <div className="font-medium">
                                {customer.satisfaction.areas.product}
                              </div>
                              <div className="text-muted-foreground">
                                Product
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">
                                {customer.satisfaction.areas.service}
                              </div>
                              <div className="text-muted-foreground">
                                Service
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">
                                {customer.satisfaction.areas.support}
                              </div>
                              <div className="text-muted-foreground">
                                Support
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">
                                {customer.satisfaction.areas.value}
                              </div>
                              <div className="text-muted-foreground">Value</div>
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
                    <ThumbsUp className="h-5 w-5" />
                    NPS Scores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customers
                      .filter((c) => c.satisfaction.npsScore)
                      .map((customer) => (
                        <div key={customer.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{customer.name}</span>
                            <Badge
                              className={
                                customer.satisfaction.npsScore! >= 9
                                  ? "bg-green-100 text-green-800"
                                  : customer.satisfaction.npsScore! >= 7
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              NPS: {customer.satisfaction.npsScore}/10
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {customer.satisfaction.feedback}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Loyalty Tab */}
          <TabsContent value="loyalty" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Loyalty Program</h3>
                <p className="text-sm text-muted-foreground">
                  Manage customer loyalty points, tiers, and rewards
                </p>
              </div>
              <Button>
                <Gift className="mr-2 h-4 w-4" />
                Award Points
              </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {customers.map((customer) => (
                <Card
                  key={customer.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          {customer.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getTierColor(customer.loyalty.tier)}
                          >
                            {customer.loyalty.tier} Member
                          </Badge>
                          <Badge variant="outline">
                            Since {customer.loyalty.joinDate}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="text-center p-3 bg-blue-50 rounded">
                          <div className="font-bold text-blue-600 text-lg">
                            {customer.loyalty.points}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Current Points
                          </div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="font-bold text-green-600 text-lg">
                            {customer.loyalty.totalEarned}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Total Earned
                          </div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded">
                          <div className="font-bold text-purple-600 text-lg">
                            {customer.loyalty.referralCount}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Referrals
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Benefits:</h4>
                        <div className="space-y-1">
                          {customer.loyalty.benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Gift className="mr-1 h-3 w-3" />
                          Reward
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Upgrade
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <History className="mr-1 h-3 w-3" />
                          History
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Customer Referrals</h3>
                <p className="text-sm text-muted-foreground">
                  Track referrals and manage referral rewards program
                </p>
              </div>
              <Button>
                <Share2 className="mr-2 h-4 w-4" />
                Track Referral
              </Button>
            </div>

            <div className="grid gap-4">
              {customers.flatMap((customer) =>
                customer.referrals.map((referral) => (
                  <Card
                    key={referral.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Share2 className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {referral.referredName}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Referred by {customer.name} •{" "}
                                {referral.referralSource}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Contact:{" "}
                              </span>
                              <span className="font-medium">
                                {referral.referredContact}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Status:{" "}
                              </span>
                              <Badge
                                className={
                                  referral.status === "Converted"
                                    ? "bg-green-100 text-green-800"
                                    : referral.status === "Lost"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {referral.status}
                              </Badge>
                            </div>
                            {referral.rewardEarned && (
                              <div>
                                <span className="text-muted-foreground">
                                  Reward:{" "}
                                </span>
                                <span className="font-medium text-green-600">
                                  ₹{referral.rewardEarned.toLocaleString()}
                                </span>
                              </div>
                            )}
                            {referral.conversionDate && (
                              <div>
                                <span className="text-muted-foreground">
                                  Converted:{" "}
                                </span>
                                <span className="font-medium">
                                  {referral.conversionDate}
                                </span>
                              </div>
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
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Gift className="mr-2 h-4 w-4" />
                              Process Reward
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Customer Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Active Customers</span>
                        <span>
                          {
                            customers.filter((c) => c.status === "Active")
                              .length
                          }{" "}
                          customers
                        </span>
                      </div>
                      <Progress
                        value={
                          (customers.filter((c) => c.status === "Active")
                            .length /
                            customers.length) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Prospects</span>
                        <span>
                          {
                            customers.filter((c) => c.status === "Prospect")
                              .length
                          }{" "}
                          customers
                        </span>
                      </div>
                      <Progress
                        value={
                          (customers.filter((c) => c.status === "Prospect")
                            .length /
                            customers.length) *
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
                    Loyalty Tiers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Bronze", "Silver", "Gold", "Platinum"].map((tier) => (
                      <div key={tier} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{tier}</span>
                          <span>
                            {
                              customers.filter((c) => c.loyalty.tier === tier)
                                .length
                            }{" "}
                            customers
                          </span>
                        </div>
                        <Progress
                          value={
                            (customers.filter((c) => c.loyalty.tier === tier)
                              .length /
                              customers.length) *
                            100
                          }
                          className="h-2"
                        />
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
                  Customer Health Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Satisfaction</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Loyalty Tier</TableHead>
                      <TableHead>Last Interaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {customer.satisfactionScore || "N/A"}
                            </span>
                            {customer.satisfactionScore > 0 && (
                              <Progress
                                value={customer.satisfactionScore}
                                className="w-16 h-2"
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskColor(customer.riskScore)}>
                            {getRiskLevel(customer.riskScore)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getTierColor(customer.loyalty.tier)}
                          >
                            {customer.loyalty.tier}
                          </Badge>
                        </TableCell>
                        <TableCell>{customer.lastInteraction}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Customer Modal */}
        <Dialog
          open={showAddCustomerModal}
          onOpenChange={setShowAddCustomerModal}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Create a new customer profile with complete information
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name *</Label>
                  <Input id="first-name" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name *</Label>
                  <Input id="last-name" placeholder="Enter last name" />
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

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="customer-type">Customer Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
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
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="advertisement">
                        Advertisement
                      </SelectItem>
                      <SelectItem value="walk-in">Walk-in</SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Address Information</h3>
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

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferences</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="budget-min">Budget Range (₹)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="budget-min"
                        type="number"
                        placeholder="Min budget"
                      />
                      <Input
                        id="budget-max"
                        type="number"
                        placeholder="Max budget"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="communication">
                      Preferred Communication
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddCustomerModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Customer</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add Interaction Modal */}
        <Dialog
          open={showInteractionModal}
          onOpenChange={setShowInteractionModal}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Log Customer Interaction</DialogTitle>
              <DialogDescription>
                Record a new interaction with a customer
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="interaction-customer">Customer *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interaction-type">Interaction Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inquiry">Inquiry</SelectItem>
                      <SelectItem value="site-visit">Site Visit</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="complaint">Complaint</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="channel">Channel</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="in-person">In-person</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="app">App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outcome">Outcome</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select outcome" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">Positive</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="negative">Negative</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="Enter subject" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter interaction details..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowInteractionModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Log Interaction</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Satisfaction Survey Modal */}
        <Dialog
          open={showSatisfactionModal}
          onOpenChange={setShowSatisfactionModal}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Customer Satisfaction Survey</DialogTitle>
              <DialogDescription>
                Record customer satisfaction feedback and ratings
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="survey-customer">Customer *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="overall-score">Overall Score (0-10)</Label>
                  <Input
                    id="overall-score"
                    type="number"
                    min="0"
                    max="10"
                    placeholder="Enter score"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nps-score">NPS Score (0-10)</Label>
                  <Input
                    id="nps-score"
                    type="number"
                    min="0"
                    max="10"
                    placeholder="Enter NPS score"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="product-score">Product Score (0-10)</Label>
                  <Input
                    id="product-score"
                    type="number"
                    min="0"
                    max="10"
                    placeholder="Enter product score"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-score">Service Score (0-10)</Label>
                  <Input
                    id="service-score"
                    type="number"
                    min="0"
                    max="10"
                    placeholder="Enter service score"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Enter customer feedback..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSatisfactionModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Survey</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
