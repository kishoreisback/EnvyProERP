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
  Plane,
  MapPin,
  Calendar,
  Clock,
  IndianRupee,
  CreditCard,
  Receipt,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Upload,
  Download,
  Eye,
  Edit,
  Send,
  Search,
  Filter,
  Plus,
  Car,
  Hotel,
  Utensils,
  Train,
  Fuel,
  Building,
  User,
  Users,
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingUp,
  BarChart3,
  DollarSign,
  Target,
  AlertTriangle,
  Info,
  Shield,
  Settings,
  Copy,
  Share,
  Paperclip,
  Camera,
  Smartphone,
  Navigation,
  Globe,
  Home,
  Briefcase,
  Coffee,
  ShoppingBag,
  Phone,
  Wifi,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BackToHRMS } from "@/components/hrms";

// Travel Requests Data
const travelRequests = [
  {
    id: 1,
    requestId: "TR-2024-001",
    employee: {
      name: "Rajesh Kumar",
      department: "Sales",
      avatar: "/placeholder.svg",
      employeeId: "SAL001",
    },
    tripType: "domestic",
    purpose: "Client Meeting",
    destination: {
      from: "Mumbai",
      to: "Bangalore",
      country: "India",
    },
    dates: {
      departure: "2024-12-30",
      return: "2025-01-02",
      duration: 4,
    },
    estimatedCost: 45000,
    approvalStatus: "pending",
    submittedDate: "2024-12-23",
    approver: "Sales Manager",
    priority: "high",
    travelDetails: {
      flight: { required: true, class: "Economy", preference: "Morning" },
      hotel: {
        required: true,
        type: "Business Hotel",
        rooms: 1,
        preference: "City Center",
      },
      transport: { required: true, type: "Cab/Taxi" },
    },
    businessJustification:
      "Critical client presentation for Q1 contract renewal worth ₹2.5Cr. Direct client engagement required to finalize terms.",
    complianceStatus: "compliant",
    advanceRequired: 25000,
  },
  {
    id: 2,
    requestId: "TR-2024-002",
    employee: {
      name: "Priya Sharma",
      department: "Engineering",
      avatar: "/placeholder.svg",
      employeeId: "ENG089",
    },
    tripType: "international",
    purpose: "Conference",
    destination: {
      from: "Delhi",
      to: "Singapore",
      country: "Singapore",
    },
    dates: {
      departure: "2025-01-15",
      return: "2025-01-20",
      duration: 6,
    },
    estimatedCost: 125000,
    approvalStatus: "approved",
    submittedDate: "2024-12-20",
    approver: "Engineering Director",
    priority: "medium",
    travelDetails: {
      flight: { required: true, class: "Economy", preference: "Direct" },
      hotel: {
        required: true,
        type: "Conference Hotel",
        rooms: 1,
        preference: "Near Venue",
      },
      transport: { required: false, type: "Public Transport" },
    },
    businessJustification:
      "Attending AWS re:Invent Asia to learn latest cloud technologies and network with industry experts.",
    complianceStatus: "compliant",
    advanceRequired: 75000,
  },
  {
    id: 3,
    requestId: "TR-2024-003",
    employee: {
      name: "Arun Patel",
      department: "Operations",
      avatar: "/placeholder.svg",
      employeeId: "OPS034",
    },
    tripType: "domestic",
    purpose: "Site Visit",
    destination: {
      from: "Chennai",
      to: "Kochi",
      country: "India",
    },
    dates: {
      departure: "2024-12-28",
      return: "2024-12-29",
      duration: 2,
    },
    estimatedCost: 18000,
    approvalStatus: "rejected",
    submittedDate: "2024-12-22",
    approver: "Operations Manager",
    priority: "low",
    travelDetails: {
      flight: { required: false, class: "", preference: "" },
      hotel: { required: true, type: "Standard", rooms: 1, preference: "" },
      transport: { required: true, type: "Train" },
    },
    businessJustification: "Routine site inspection and equipment check.",
    complianceStatus: "non_compliant",
    advanceRequired: 10000,
    rejectionReason: "Non-essential travel during holiday period",
  },
];

// Expense Claims Data
const expenseClaims = [
  {
    id: 1,
    claimId: "EXP-2024-001",
    employee: {
      name: "Vikram Agarwal",
      department: "Sales",
      avatar: "/placeholder.svg",
      employeeId: "SAL012",
    },
    tripId: "TR-2024-001",
    submitDate: "2024-12-22",
    totalAmount: 42500,
    status: "under_review",
    approver: "Finance Manager",
    expenses: [
      {
        category: "Flight",
        amount: 28000,
        date: "2024-12-15",
        description: "Mumbai to Delhi return flight",
        receipt: true,
        compliant: true,
      },
      {
        category: "Hotel",
        amount: 8500,
        date: "2024-12-15",
        description: "3 nights at business hotel",
        receipt: true,
        compliant: true,
      },
      {
        category: "Meals",
        amount: 4500,
        date: "2024-12-16",
        description: "Client lunch and team dinner",
        receipt: true,
        compliant: false,
        policyViolation: "Exceeds daily meal allowance by ₹1,500",
      },
      {
        category: "Transport",
        amount: 1500,
        date: "2024-12-15",
        description: "Airport transfers and local cab",
        receipt: true,
        compliant: true,
      },
    ],
    policyCompliance: {
      score: 85,
      violations: 1,
      warnings: 0,
    },
    reimbursementAmount: 41000,
    advanceAdjustment: 25000,
    finalPayable: 16000,
  },
  {
    id: 2,
    claimId: "EXP-2024-002",
    employee: {
      name: "Sneha Reddy",
      department: "HR",
      avatar: "/placeholder.svg",
      employeeId: "HR005",
    },
    tripId: "TR-2024-002",
    submitDate: "2024-12-21",
    totalAmount: 15600,
    status: "approved",
    approver: "HR Director",
    expenses: [
      {
        category: "Train",
        amount: 3200,
        date: "2024-12-18",
        description: "AC 2-tier Mumbai to Pune return",
        receipt: true,
        compliant: true,
      },
      {
        category: "Hotel",
        amount: 7200,
        date: "2024-12-18",
        description: "2 nights accommodation",
        receipt: true,
        compliant: true,
      },
      {
        category: "Meals",
        amount: 2800,
        date: "2024-12-19",
        description: "Per diem for meals",
        receipt: false,
        compliant: true,
      },
      {
        category: "Local Transport",
        amount: 1200,
        date: "2024-12-18",
        description: "Auto and cab charges",
        receipt: true,
        compliant: true,
      },
      {
        category: "Miscellaneous",
        amount: 1200,
        date: "2024-12-19",
        description: "Internet and communication",
        receipt: true,
        compliant: true,
      },
    ],
    policyCompliance: {
      score: 100,
      violations: 0,
      warnings: 0,
    },
    reimbursementAmount: 15600,
    advanceAdjustment: 8000,
    finalPayable: 7600,
  },
];

// Policy Rules Data
const policyRules = [
  {
    category: "Flight",
    rules: [
      {
        rule: "Domestic Economy Class",
        limit: "No limit for business travel",
        applicability: "All domestic flights",
        status: "active",
      },
      {
        rule: "International Business Class",
        limit: "Flights over 6 hours duration",
        applicability: "Senior management and long-haul flights",
        status: "active",
      },
      {
        rule: "Advance Booking",
        limit: "Minimum 7 days advance booking",
        applicability: "All flights (exceptions require approval)",
        status: "active",
      },
    ],
  },
  {
    category: "Accommodation",
    rules: [
      {
        rule: "Hotel Category",
        limit: "₹8,000 per night max",
        applicability: "Metro cities",
        status: "active",
      },
      {
        rule: "Hotel Category",
        limit: "₹5,000 per night max",
        applicability: "Tier 2/3 cities",
        status: "active",
      },
      {
        rule: "Extended Stay",
        limit: "Monthly rates for stays > 30 days",
        applicability: "Long-term assignments",
        status: "active",
      },
    ],
  },
  {
    category: "Meals",
    rules: [
      {
        rule: "Daily Meal Allowance",
        limit: "₹1,500 per day",
        applicability: "Domestic travel",
        status: "active",
      },
      {
        rule: "Daily Meal Allowance",
        limit: "$50 per day",
        applicability: "International travel",
        status: "active",
      },
      {
        rule: "Client Entertainment",
        limit: "₹5,000 per occasion (with approval)",
        applicability: "Business entertainment",
        status: "active",
      },
    ],
  },
  {
    category: "Transport",
    rules: [
      {
        rule: "Local Transport",
        limit: "₹2,000 per day",
        applicability: "Cab/taxi within city",
        status: "active",
      },
      {
        rule: "Car Rental",
        limit: "Compact/mid-size only",
        applicability: "Self-drive rentals",
        status: "active",
      },
      {
        rule: "Fuel Reimbursement",
        limit: "Actual bills with company vehicle",
        applicability: "Personal vehicle usage",
        status: "active",
      },
    ],
  },
];

// Reimbursement Processing Data
const reimbursements = [
  {
    id: 1,
    claimId: "EXP-2024-001",
    employee: {
      name: "Vikram Agarwal",
      department: "Sales",
      avatar: "/placeholder.svg",
      employeeId: "SAL012",
    },
    processDate: "2024-12-23",
    totalAmount: 42500,
    approvedAmount: 41000,
    advanceAdjustment: 25000,
    finalPayable: 16000,
    status: "processing",
    paymentMethod: "Bank Transfer",
    expectedPayment: "2024-12-28",
    processingStage: "finance_review",
    bankDetails: {
      accountNumber: "****1234",
      bankName: "HDFC Bank",
      ifsc: "HDFC0001234",
    },
    approvalChain: [
      {
        approver: "Line Manager",
        status: "approved",
        date: "2024-12-22",
        comments: "All expenses justified and receipts provided",
      },
      {
        approver: "Finance Team",
        status: "pending",
        date: "",
        comments: "",
      },
      {
        approver: "Accounts Payable",
        status: "pending",
        date: "",
        comments: "",
      },
    ],
  },
  {
    id: 2,
    claimId: "EXP-2024-002",
    employee: {
      name: "Sneha Reddy",
      department: "HR",
      avatar: "/placeholder.svg",
      employeeId: "HR005",
    },
    processDate: "2024-12-21",
    totalAmount: 15600,
    approvedAmount: 15600,
    advanceAdjustment: 8000,
    finalPayable: 7600,
    status: "paid",
    paymentMethod: "Bank Transfer",
    expectedPayment: "2024-12-25",
    processingStage: "completed",
    bankDetails: {
      accountNumber: "****5678",
      bankName: "SBI",
      ifsc: "SBIN0005678",
    },
    approvalChain: [
      {
        approver: "Line Manager",
        status: "approved",
        date: "2024-12-21",
        comments: "Compliant with all policies",
      },
      {
        approver: "Finance Team",
        status: "approved",
        date: "2024-12-22",
        comments: "Verified and approved for payment",
      },
      {
        approver: "Accounts Payable",
        status: "approved",
        date: "2024-12-23",
        comments: "Payment processed successfully",
      },
    ],
  },
];

export default function TravelExpenseManagement() {
  const [activeTab, setActiveTab] = useState("travel_requests");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState<any>(null);

  const dashboardStats = {
    totalTravelRequests: travelRequests.length,
    pendingApprovals: travelRequests.filter(
      (r) => r.approvalStatus === "pending",
    ).length,
    totalExpenseClaims: expenseClaims.length,
    totalReimbursementAmount: reimbursements.reduce(
      (sum, r) => sum + r.finalPayable,
      0,
    ),
    avgProcessingTime: 3.2,
    policyComplianceRate: 87.5,
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
                Travel & Expense Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Plane}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Comprehensive travel booking, expense tracking, and
                reimbursement processing
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={Download}
                animation="bounce"
                className="mr-2"
              />
              Export Report
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              New Travel Request
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
                <p className="text-sm text-muted-foreground">Travel Requests</p>
                <AnimatedIcon
                  icon={Plane}
                  animation="float"
                  className="text-blue-600"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={dashboardStats.totalTravelRequests} />
              </div>
              <div className="text-xs text-muted-foreground">
                {dashboardStats.pendingApprovals} pending approval
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
                <p className="text-sm text-muted-foreground">Expense Claims</p>
                <AnimatedIcon
                  icon={Receipt}
                  animation="pulse"
                  className="text-green-600"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={dashboardStats.totalExpenseClaims} />
              </div>
              <div className="text-xs text-muted-foreground">
                This month submissions
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
                <p className="text-sm text-muted-foreground">Reimbursements</p>
                <AnimatedIcon
                  icon={IndianRupee}
                  animation="bounce"
                  className="text-yellow-600"
                />
              </div>
              <div className="text-2xl font-bold">
                ₹
                <AnimatedCounter
                  value={dashboardStats.totalReimbursementAmount}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Pending payment
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
                <p className="text-sm text-muted-foreground">
                  Policy Compliance
                </p>
                <AnimatedIcon
                  icon={Shield}
                  animation="glow"
                  className="text-purple-600"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter
                  value={dashboardStats.policyComplianceRate}
                  suffix="%"
                  decimals={1}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Compliance rate
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
              value="travel_requests"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Plane} size="sm" className="mr-2" />
              Travel Requests
            </TabsTrigger>
            <TabsTrigger
              value="expense_claims"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Receipt} size="sm" className="mr-2" />
              Expense Claims
            </TabsTrigger>
            <TabsTrigger
              value="policy_compliance"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Shield} size="sm" className="mr-2" />
              Policy Compliance
            </TabsTrigger>
            <TabsTrigger
              value="reimbursements"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={CreditCard} size="sm" className="mr-2" />
              Reimbursements
            </TabsTrigger>
          </TabsList>

          {/* Travel Requests & Approvals Tab */}
          <TabsContent value="travel_requests" className="space-y-6">
            <div className="grid gap-6">
              {/* Create Travel Request */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Plus}
                        className="text-construction-500"
                      />
                      <CardTitle>Create New Travel Request</CardTitle>
                    </div>
                    <Button>
                      <Plane className="h-4 w-4 mr-2" />
                      New Request
                    </Button>
                  </div>
                  <CardDescription>
                    Submit travel requests with detailed itinerary and
                    justification
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Travel Requests List */}
              <div className="space-y-4">
                {travelRequests.map((request, index) => (
                  <Card
                    key={request.id}
                    className={`hover-lift animate-fadeInUp ${
                      request.approvalStatus === "pending"
                        ? "border-yellow-500 bg-yellow-50/30"
                        : request.approvalStatus === "approved"
                          ? "border-green-500 bg-green-50/30"
                          : "border-red-500 bg-red-50/30"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">
                                {request.requestId}
                              </h3>
                              <Badge
                                variant={
                                  request.approvalStatus === "approved"
                                    ? "default"
                                    : request.approvalStatus === "pending"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {request.approvalStatus === "approved" && (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                )}
                                {request.approvalStatus === "pending" && (
                                  <Clock className="h-3 w-3 mr-1" />
                                )}
                                {request.approvalStatus === "rejected" && (
                                  <XCircle className="h-3 w-3 mr-1" />
                                )}
                                {request.approvalStatus.replace("_", " ")}
                              </Badge>
                              <Badge
                                variant={
                                  request.priority === "high"
                                    ? "destructive"
                                    : request.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {request.priority} priority
                              </Badge>
                              <Badge variant="outline">
                                {request.tripType}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={request.employee.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {request.employee.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">
                                    {request.employee.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {request.employee.department} •{" "}
                                    {request.employee.employeeId}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-construction-500">
                              ₹{request.estimatedCost.toLocaleString()}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Estimated Cost
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Travel Route</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="px-2 py-1 bg-muted rounded">
                                {request.destination.from}
                              </span>
                              <ArrowUp className="h-4 w-4 text-muted-foreground" />
                              <span className="px-2 py-1 bg-muted rounded">
                                {request.destination.to}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {request.destination.country} • {request.purpose}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Travel Dates</span>
                            </div>
                            <div className="text-sm">
                              <div className="flex justify-between">
                                <span>Departure:</span>
                                <span className="font-medium">
                                  {request.dates.departure}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Return:</span>
                                <span className="font-medium">
                                  {request.dates.return}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Duration:</span>
                                <span className="font-medium">
                                  {request.dates.duration} days
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Business Justification
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {request.businessJustification}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">
                              Travel Details
                            </Label>
                            <div className="space-y-1 text-xs">
                              {request.travelDetails.flight.required && (
                                <div className="flex items-center gap-1">
                                  <Plane className="h-3 w-3 text-blue-500" />
                                  <span>
                                    Flight: {request.travelDetails.flight.class}
                                  </span>
                                </div>
                              )}
                              {request.travelDetails.hotel.required && (
                                <div className="flex items-center gap-1">
                                  <Hotel className="h-3 w-3 text-green-500" />
                                  <span>
                                    Hotel: {request.travelDetails.hotel.type}
                                  </span>
                                </div>
                              )}
                              {request.travelDetails.transport.required && (
                                <div className="flex items-center gap-1">
                                  <Car className="h-3 w-3 text-purple-500" />
                                  <span>
                                    Transport:{" "}
                                    {request.travelDetails.transport.type}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">
                              Approval Details
                            </Label>
                            <div className="text-xs">
                              <p>Approver: {request.approver}</p>
                              <p>Submitted: {request.submittedDate}</p>
                              {request.rejectionReason && (
                                <p className="text-red-600 mt-1">
                                  Reason: {request.rejectionReason}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">
                              Compliance & Advance
                            </Label>
                            <div className="text-xs">
                              <div className="flex items-center gap-1">
                                <Badge
                                  variant={
                                    request.complianceStatus === "compliant"
                                      ? "default"
                                      : "destructive"
                                  }
                                  className="text-xs"
                                >
                                  {request.complianceStatus}
                                </Badge>
                              </div>
                              <p className="mt-1">
                                Advance: ₹
                                {request.advanceRequired.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          {request.approvalStatus === "pending" && (
                            <>
                              <Button size="sm" className="hover-lift">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="hover-lift"
                              >
                                <XCircle className="h-3 w-3 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Duplicate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Expense Claims Submission Tab */}
          <TabsContent value="expense_claims" className="space-y-6">
            <div className="grid gap-6">
              {/* Submit Expense Claim */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Plus}
                        className="text-construction-500"
                      />
                      <CardTitle>Submit New Expense Claim</CardTitle>
                    </div>
                    <Button>
                      <Receipt className="h-4 w-4 mr-2" />
                      New Claim
                    </Button>
                  </div>
                  <CardDescription>
                    Submit expense claims with receipts and supporting documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    {[
                      {
                        icon: Camera,
                        title: "Upload Receipts",
                        description: "Capture and upload receipt images",
                      },
                      {
                        icon: FileText,
                        title: "Create Expense",
                        description: "Add expense details manually",
                      },
                      {
                        icon: Smartphone,
                        title: "Mobile App",
                        description: "Use mobile app for quick submission",
                      },
                      {
                        icon: Upload,
                        title: "Bulk Upload",
                        description: "Upload multiple expenses at once",
                      },
                    ].map((option, index) => (
                      <Card
                        key={option.title}
                        className="p-4 cursor-pointer hover:bg-muted/50 transition-colors animate-scaleIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div className="p-3 rounded-lg bg-construction-500/10">
                            <option.icon className="h-6 w-6 text-construction-500" />
                          </div>
                          <h4 className="font-medium text-sm">
                            {option.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Expense Claims List */}
              <div className="space-y-4">
                {expenseClaims.map((claim, index) => (
                  <Card
                    key={claim.id}
                    className="hover-lift animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">
                                {claim.claimId}
                              </h3>
                              <Badge
                                variant={
                                  claim.status === "approved"
                                    ? "default"
                                    : claim.status === "under_review"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {claim.status.replace("_", " ")}
                              </Badge>
                              <Badge variant="outline">
                                Trip: {claim.tripId}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={claim.employee.avatar} />
                                <AvatarFallback className="text-xs">
                                  {claim.employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">
                                  {claim.employee.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {claim.employee.department} •{" "}
                                  {claim.employee.employeeId}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-construction-500">
                              ₹{claim.totalAmount.toLocaleString()}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Total Claimed
                            </p>
                          </div>
                        </div>

                        {/* Expense Breakdown */}
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">
                            Expense Breakdown
                          </Label>
                          <div className="grid gap-2">
                            {claim.expenses.map((expense, expenseIndex) => (
                              <div
                                key={expenseIndex}
                                className="flex items-center justify-between p-3 border rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded bg-muted/50">
                                    {expense.category === "Flight" && (
                                      <Plane className="h-4 w-4 text-blue-500" />
                                    )}
                                    {expense.category === "Hotel" && (
                                      <Hotel className="h-4 w-4 text-green-500" />
                                    )}
                                    {expense.category === "Meals" && (
                                      <Utensils className="h-4 w-4 text-orange-500" />
                                    )}
                                    {expense.category === "Transport" && (
                                      <Car className="h-4 w-4 text-purple-500" />
                                    )}
                                    {expense.category === "Train" && (
                                      <Train className="h-4 w-4 text-indigo-500" />
                                    )}
                                    {expense.category === "Local Transport" && (
                                      <Navigation className="h-4 w-4 text-pink-500" />
                                    )}
                                    {expense.category === "Miscellaneous" && (
                                      <ShoppingBag className="h-4 w-4 text-gray-500" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">
                                      {expense.category}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {expense.description} • {expense.date}
                                    </p>
                                    {expense.policyViolation && (
                                      <p className="text-xs text-red-600">
                                        ⚠️ {expense.policyViolation}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">
                                    ₹{expense.amount.toLocaleString()}
                                  </div>
                                  <div className="flex items-center gap-1 text-xs">
                                    {expense.receipt ? (
                                      <CheckCircle className="h-3 w-3 text-green-500" />
                                    ) : (
                                      <AlertCircle className="h-3 w-3 text-yellow-500" />
                                    )}
                                    <span
                                      className={
                                        expense.compliant
                                          ? "text-green-600"
                                          : "text-red-600"
                                      }
                                    >
                                      {expense.compliant
                                        ? "Compliant"
                                        : "Non-compliant"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Policy Compliance Score */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                          <div className="text-center">
                            <div className="text-lg font-bold text-emerald-600">
                              {claim.policyCompliance.score}%
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Compliance Score
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-red-500">
                              {claim.policyCompliance.violations}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Policy Violations
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-yellow-500">
                              {claim.policyCompliance.warnings}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Warnings
                            </p>
                          </div>
                        </div>

                        {/* Payment Calculation */}
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Total Claimed
                            </Label>
                            <p className="font-medium">
                              ₹{claim.totalAmount.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Advance Adjustment
                            </Label>
                            <p className="font-medium">
                              -₹{claim.advanceAdjustment.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Final Payable
                            </Label>
                            <p className="font-medium text-construction-500">
                              ₹{claim.finalPayable.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-muted-foreground">
                            Submitted: {claim.submitDate} • Approver:{" "}
                            {claim.approver}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover-lift"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View Receipts
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover-lift"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                            {claim.status === "under_review" && (
                              <Button size="sm" className="hover-lift">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit Claim
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Policy Compliance Checks Tab */}
          <TabsContent value="policy_compliance" className="space-y-6">
            <div className="grid gap-6">
              {/* Compliance Overview */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Overall Compliance
                      </p>
                      <AnimatedIcon
                        icon={Shield}
                        className="text-emerald-600"
                      />
                    </div>
                    <div className="text-2xl font-bold">87.5%</div>
                    <div className="text-xs text-emerald-600">
                      +2.3% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Policy Violations
                      </p>
                      <AnimatedIcon
                        icon={AlertTriangle}
                        className="text-red-500"
                      />
                    </div>
                    <div className="text-2xl font-bold">23</div>
                    <div className="text-xs text-red-500">
                      -5 from last month
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Auto-Approved Claims
                      </p>
                      <AnimatedIcon
                        icon={CheckCircle}
                        className="text-construction-500"
                      />
                    </div>
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-xs text-construction-500">
                      78% of total claims
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Policy Rules by Category */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={FileText} className="text-primary" />
                    Travel & Expense Policy Rules
                  </CardTitle>
                  <CardDescription>
                    Current policy rules and compliance guidelines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {policyRules.map((category, categoryIndex) => (
                      <div
                        key={category.category}
                        className="animate-fadeInUp"
                        style={{
                          animationDelay: `${categoryIndex * 0.1}s`,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-construction-500/10">
                            {category.category === "Flight" && (
                              <Plane className="h-5 w-5 text-construction-500" />
                            )}
                            {category.category === "Accommodation" && (
                              <Hotel className="h-5 w-5 text-construction-500" />
                            )}
                            {category.category === "Meals" && (
                              <Utensils className="h-5 w-5 text-construction-500" />
                            )}
                            {category.category === "Transport" && (
                              <Car className="h-5 w-5 text-construction-500" />
                            )}
                          </div>
                          <h3 className="text-lg font-semibold">
                            {category.category} Policies
                          </h3>
                        </div>
                        <div className="grid gap-3">
                          {category.rules.map((rule, ruleIndex) => (
                            <div
                              key={ruleIndex}
                              className="flex items-center justify-between p-4 border rounded-lg"
                            >
                              <div className="space-y-1">
                                <p className="font-medium text-sm">
                                  {rule.rule}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {rule.applicability}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-sm">
                                  {rule.limit}
                                </p>
                                <Badge
                                  variant={
                                    rule.status === "active"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {rule.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Trends */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={TrendingUp}
                      className="text-emerald-600"
                    />
                    Compliance Trends & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-medium">Top Policy Violations</h4>
                      <div className="space-y-2">
                        {[
                          {
                            violation: "Meal allowance exceeded",
                            count: 8,
                            category: "Meals",
                          },
                          {
                            violation: "Hotel rate above limit",
                            count: 6,
                            category: "Accommodation",
                          },
                          {
                            violation: "Missing receipts",
                            count: 5,
                            category: "Documentation",
                          },
                          {
                            violation: "Late booking surcharge",
                            count: 4,
                            category: "Flight",
                          },
                        ].map((violation, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-sm">
                                {violation.violation}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {violation.category}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-red-500">
                                {violation.count}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                instances
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Compliance by Department</h4>
                      <div className="space-y-3">
                        {[
                          { dept: "Engineering", score: 92, trend: "up" },
                          { dept: "Sales", score: 85, trend: "down" },
                          { dept: "Operations", score: 88, trend: "up" },
                          { dept: "HR", score: 95, trend: "stable" },
                        ].map((dept, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-sm">{dept.dept}</p>
                              <div className="flex items-center gap-1 text-xs">
                                {dept.trend === "up" ? (
                                  <ArrowUp className="h-3 w-3 text-emerald-600" />
                                ) : dept.trend === "down" ? (
                                  <ArrowDown className="h-3 w-3 text-red-500" />
                                ) : (
                                  <Minus className="h-3 w-3 text-gray-500" />
                                )}
                                <span
                                  className={
                                    dept.trend === "up"
                                      ? "text-emerald-600"
                                      : dept.trend === "down"
                                        ? "text-red-500"
                                        : "text-gray-500"
                                  }
                                >
                                  {dept.trend}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">
                                {dept.score}%
                              </div>
                              <Progress
                                value={dept.score}
                                className="w-16 h-1"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reimbursement Processing Tab */}
          <TabsContent value="reimbursements" className="space-y-6">
            <div className="grid gap-6">
              {/* Processing Summary */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Total Pending
                      </p>
                      <AnimatedIcon
                        icon={ClockIcon}
                        className="text-yellow-500"
                      />
                    </div>
                    <div className="text-2xl font-bold">
                      ₹
                      {dashboardStats.totalReimbursementAmount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      8 claims pending
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Avg Processing Time
                      </p>
                      <AnimatedIcon
                        icon={Target}
                        className="text-construction-500"
                      />
                    </div>
                    <div className="text-2xl font-bold">
                      {dashboardStats.avgProcessingTime} days
                    </div>
                    <div className="text-xs text-emerald-600">
                      0.5 days faster
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        This Month Paid
                      </p>
                      <AnimatedIcon
                        icon={CheckCircle}
                        className="text-emerald-600"
                      />
                    </div>
                    <div className="text-2xl font-bold">₹2,45,600</div>
                    <div className="text-xs text-muted-foreground">
                      45 claims processed
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Auto-Processing Rate
                      </p>
                      <AnimatedIcon icon={Zap} className="text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold">78%</div>
                    <div className="text-xs text-blue-600">+5% improvement</div>
                  </CardContent>
                </Card>
              </div>

              {/* Reimbursement Queue */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={CreditCard}
                      className="text-construction-500"
                    />
                    Reimbursement Processing Queue
                  </CardTitle>
                  <CardDescription>
                    Track reimbursement status and payment processing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reimbursements.map((reimbursement, index) => (
                      <Card
                        key={reimbursement.id}
                        className="p-4 animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">
                                  {reimbursement.claimId}
                                </h4>
                                <Badge
                                  variant={
                                    reimbursement.status === "paid"
                                      ? "default"
                                      : reimbursement.status === "processing"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                >
                                  {reimbursement.status}
                                </Badge>
                                <Badge variant="outline">
                                  {reimbursement.paymentMethod}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={reimbursement.employee.avatar}
                                  />
                                  <AvatarFallback className="text-xs">
                                    {reimbursement.employee.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">
                                    {reimbursement.employee.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {reimbursement.employee.department} •{" "}
                                    {reimbursement.employee.employeeId}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-construction-500">
                                ₹{reimbursement.finalPayable.toLocaleString()}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Final Payable
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <Label className="text-xs text-muted-foreground">
                                Total Amount
                              </Label>
                              <p className="font-medium">
                                ₹{reimbursement.totalAmount.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">
                                Advance Adjusted
                              </Label>
                              <p className="font-medium">
                                -₹
                                {reimbursement.advanceAdjustment.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">
                                Expected Payment
                              </Label>
                              <p className="font-medium">
                                {reimbursement.expectedPayment}
                              </p>
                            </div>
                          </div>

                          {/* Bank Details */}
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-sm">
                                Bank Details
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div>
                                <span className="text-muted-foreground">
                                  Account:
                                </span>
                                <p className="font-medium">
                                  {reimbursement.bankDetails.accountNumber}
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Bank:
                                </span>
                                <p className="font-medium">
                                  {reimbursement.bankDetails.bankName}
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  IFSC:
                                </span>
                                <p className="font-medium">
                                  {reimbursement.bankDetails.ifsc}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Approval Chain */}
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Approval Chain Progress
                            </Label>
                            <div className="space-y-2">
                              {reimbursement.approvalChain.map(
                                (approval, approvalIndex) => (
                                  <div
                                    key={approvalIndex}
                                    className="flex items-center gap-3 p-2 border rounded-lg"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`w-3 h-3 rounded-full ${
                                          approval.status === "approved"
                                            ? "bg-emerald-500"
                                            : approval.status === "pending"
                                              ? "bg-yellow-500"
                                              : "bg-gray-300"
                                        }`}
                                      />
                                      <span className="font-medium text-sm">
                                        {approval.approver}
                                      </span>
                                    </div>
                                    <div className="flex-1">
                                      {approval.status === "approved" && (
                                        <div className="text-xs">
                                          <span className="text-emerald-600">
                                            Approved on {approval.date}
                                          </span>
                                          {approval.comments && (
                                            <p className="text-muted-foreground mt-1">
                                              {approval.comments}
                                            </p>
                                          )}
                                        </div>
                                      )}
                                      {approval.status === "pending" && (
                                        <span className="text-xs text-yellow-600">
                                          Pending approval
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4 border-t">
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover-lift"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                            {reimbursement.status === "processing" && (
                              <Button size="sm" className="hover-lift">
                                <Send className="h-3 w-3 mr-1" />
                                Process Payment
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover-lift"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Payment Advice
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover-lift"
                            >
                              <Share className="h-3 w-3 mr-1" />
                              Send Notification
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
        </Tabs>
      </div>
    </MainLayout>
  );
}
