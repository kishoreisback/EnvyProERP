import React, { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  User,
  Calendar as CalendarIcon,
  Clock,
  ArrowLeft,
  FileText,
  Award,
  DollarSign,
  Bell,
  Download,
  Edit,
  Plus,
  Star,
  TrendingUp,
  Target,
  Briefcase,
  BookOpen,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Building,
  Users,
  CheckCircle,
  Save,
  Eye,
  Search,
  Filter,
  Send,
  History,
  RefreshCw,
  Home,
  Heart,
  Shield,
  AlertCircle,
  Zap,
  Calendar as CalIcon,
  XCircle,
  Clock3,
  IndianRupee,
  Receipt,
  Calculator,
  HeadphonesIcon,
  Ticket,
  Settings,
  Coffee,
  BarChart3,
  Upload,
} from "lucide-react";
import { format, addDays } from "date-fns";
import { Link } from "react-router-dom";

export default function EmployeeSelfService() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [personalDetailsEditing, setPersonalDetailsEditing] = useState(false);

  // Sample employee data
  const employeeProfile = {
    name: "Rajesh Kumar",
    employeeId: "EMP001",
    position: "Senior Project Manager",
    department: "Engineering",
    manager: "David Wilson",
    joinDate: "2022-01-15",
    email: "rajesh.kumar@buildpro.com",
    phone: "+91 98765 43210",
    alternatePhone: "+91 98765 43212",
    address: "A-123, Sector 18, Noida, UP 201301",
    permanentAddress: "B-456, Janakpuri, New Delhi, DL 110058",
    emergencyContact: "+91 98765 43211",
    emergencyContactName: "Priya Kumar (Wife)",
    avatar: "/placeholder.svg",
    rating: 4.8,
    projectsCompleted: 12,
    annualLeave: { used: 8, total: 25 },
    sickLeave: { used: 3, total: 10 },
    casualLeave: { used: 5, total: 12 },
    // Personal Information
    dateOfBirth: "1985-03-15",
    gender: "Male",
    maritalStatus: "Married",
    nationality: "Indian",
    bloodGroup: "B+",
    religion: "Hindu",
    // Government IDs
    panNumber: "ABCDE1234F",
    aadharNumber: "1234 5678 9012",
    passportNumber: "Z1234567",
    passportExpiry: "2028-05-20",
    drivingLicense: "DL123456789",
    // Bank Account Details
    bankName: "HDFC Bank",
    accountNumber: "12345678901234",
    ifscCode: "HDFC0001234",
    bankBranch: "Noida Sector 18",
    accountType: "Savings",
    // Dependants
    dependants: [
      {
        id: 1,
        name: "Priya Kumar",
        relationship: "Wife",
        dateOfBirth: "1987-08-20",
        aadharNumber: "2345 6789 0123",
        nominee: true,
      },
      {
        id: 2,
        name: "Aarav Kumar",
        relationship: "Son",
        dateOfBirth: "2015-12-10",
        aadharNumber: "3456 7890 1234",
        nominee: false,
      },
    ],
    // Educational Details
    education: [
      {
        degree: "B.Tech",
        specialization: "Computer Science",
        institution: "IIT Delhi",
        year: "2007",
        percentage: "85%",
      },
      {
        degree: "MBA",
        specialization: "Project Management",
        institution: "IIM Ahmedabad",
        year: "2010",
        percentage: "78%",
      },
    ],
  };

  const attendanceData = [
    {
      date: "2024-01-15",
      checkIn: "09:15",
      checkOut: "18:30",
      hours: "8h 45m",
      status: "Present",
    },
    {
      date: "2024-01-16",
      checkIn: "09:00",
      checkOut: "18:15",
      hours: "8h 45m",
      status: "Present",
    },
    {
      date: "2024-01-17",
      checkIn: "09:30",
      checkOut: "19:00",
      hours: "9h 0m",
      status: "Present",
    },
    {
      date: "2024-01-18",
      checkIn: "-",
      checkOut: "-",
      hours: "0h 0m",
      status: "Leave",
    },
    {
      date: "2024-01-19",
      checkIn: "09:10",
      checkOut: "18:45",
      hours: "9h 5m",
      status: "Present",
    },
  ];

  const payslipHistory = [
    {
      month: "December 2024",
      grossPay: 85000,
      deductions: 15200,
      netPay: 69800,
      status: "Processed",
      downloadUrl: "#",
    },
    {
      month: "November 2024",
      grossPay: 85000,
      deductions: 15200,
      netPay: 69800,
      status: "Processed",
      downloadUrl: "#",
    },
    {
      month: "October 2024",
      grossPay: 82000,
      deductions: 14760,
      netPay: 67240,
      status: "Processed",
      downloadUrl: "#",
    },
  ];

  const serviceRequests = [
    {
      id: "SR001",
      category: "IT Support",
      subject: "Laptop Performance Issue",
      status: "In Progress",
      priority: "High",
      submittedOn: "2024-01-15",
      assignedTo: "IT Team",
    },
    {
      id: "SR002",
      category: "HR Query",
      subject: "Insurance Coverage Query",
      status: "Resolved",
      priority: "Medium",
      submittedOn: "2024-01-10",
      assignedTo: "HR Team",
    },
    {
      id: "SR003",
      category: "Facility",
      subject: "Parking Space Request",
      status: "Pending",
      priority: "Low",
      submittedOn: "2024-01-12",
      assignedTo: "Admin Team",
    },
  ];

  const performanceGoals = [
    {
      id: 1,
      title: "Complete PMP Certification",
      description: "Obtain Project Management Professional certification",
      progress: 75,
      dueDate: "Mar 2025",
      category: "Professional Development",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 2,
      title: "Lead 3 Major Projects",
      description: "Successfully manage and deliver 3 construction projects",
      progress: 66,
      dueDate: "Dec 2024",
      category: "Project Management",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Mentor 2 Junior Engineers",
      description: "Provide guidance and training to junior team members",
      progress: 50,
      dueDate: "Jun 2025",
      category: "Leadership",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: 4,
      title: "Improve Site Safety Metrics",
      description: "Achieve 95% safety compliance across all projects",
      progress: 85,
      dueDate: "Feb 2025",
      category: "Safety & Quality",
      status: "In Progress",
      priority: "High",
    },
  ];

  const trainingPrograms = [
    {
      id: 1,
      title: "Project Management Certification",
      type: "Certification",
      status: "Enrolled",
      startDate: "Jan 15, 2025",
      duration: "3 months",
      location: "Online + Training Center",
      completion: 25,
      instructor: "Dr. Sarah Wilson",
      description: "Comprehensive PMP certification program",
    },
    {
      id: 2,
      title: "Safety Leadership Workshop",
      type: "Workshop",
      status: "Completed",
      startDate: "Dec 5, 2024",
      duration: "2 days",
      location: "Mumbai Training Center",
      completion: 100,
      instructor: "Rajesh Gupta",
      description: "Advanced safety management and leadership",
    },
    {
      id: 3,
      title: "Advanced Construction Techniques",
      type: "Technical Course",
      status: "Available",
      startDate: "Mar 10, 2025",
      duration: "5 days",
      location: "Bangalore Training Center",
      completion: 0,
      instructor: "Prof. Amit Sharma",
      description: "Modern construction methods and technologies",
    },
    {
      id: 4,
      title: "Digital Project Management Tools",
      type: "Workshop",
      status: "Recommended",
      startDate: "Feb 20, 2025",
      duration: "3 days",
      location: "Virtual",
      completion: 0,
      instructor: "Tech Team",
      description: "BIM, project management software, and digital tools",
    },
  ];

  const recentLeaveRequests = [
    {
      id: 1,
      type: "Annual Leave",
      fromDate: "Dec 25, 2024",
      toDate: "Dec 27, 2024",
      days: 3,
      status: "Approved",
      appliedOn: "Dec 10, 2024",
      approver: "David Wilson",
      reason: "Family vacation",
    },
    {
      id: 2,
      type: "Sick Leave",
      fromDate: "Nov 15, 2024",
      toDate: "Nov 15, 2024",
      days: 1,
      status: "Approved",
      appliedOn: "Nov 15, 2024",
      approver: "David Wilson",
      reason: "Medical consultation",
    },
    {
      id: 3,
      type: "Casual Leave",
      fromDate: "Jan 25, 2025",
      toDate: "Jan 25, 2025",
      days: 1,
      status: "Pending",
      appliedOn: "Jan 15, 2025",
      approver: "David Wilson",
      reason: "Personal work",
    },
    {
      id: 4,
      type: "Annual Leave",
      fromDate: "Feb 10, 2025",
      toDate: "Feb 14, 2025",
      days: 5,
      status: "Pending",
      appliedOn: "Jan 16, 2025",
      approver: "David Wilson",
      reason: "Wedding function",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="flex items-center gap-4 animate-slideInLeft">
          <Button variant="outline" className="hover-lift" asChild>
            <Link to="/hrms">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to HRMS
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Employee Self-Service Portal
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={User}
                animation="float"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Welcome {employeeProfile.name} - Manage your profile and
                work-related services
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon icon={Bell} animation="bounce" className="mr-2" />
              <span className="hidden md:inline">Notifications</span>
              <PulsingDot className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Quick Overview Dashboard */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-construction-100">
                  <CalendarIcon className="h-6 w-6 text-construction-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    <AnimatedCounter
                      value={
                        employeeProfile.annualLeave.total -
                        employeeProfile.annualLeave.used
                      }
                    />
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Leave Days Left
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8h 45m</p>
                  <p className="text-sm text-muted-foreground">Today's Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <IndianRupee className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹69.8K</p>
                  <p className="text-sm text-muted-foreground">Last Net Pay</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-orange-100">
                  <Ticket className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    <AnimatedCounter
                      value={
                        serviceRequests.filter((r) => r.status !== "Resolved")
                          .length
                      }
                    />
                  </p>
                  <p className="text-sm text-muted-foreground">Open Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Employee Self-Service Features */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AnimatedIcon
                icon={Settings}
                animation="float"
                className="text-construction-600"
                size="lg"
              />
              Employee Self-Service Features
            </CardTitle>
            <CardDescription>
              Comprehensive self-service portal for all your workplace needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal-details" className="space-y-4">
              {/* Mobile: Scrollable tabs, Desktop: Grid layout */}
              <div className="w-full">
                <TabsList className="h-auto p-1 bg-muted/50 lg:grid lg:grid-cols-9 w-full overflow-x-auto scrollbar-hide flex lg:flex-none gap-1 lg:gap-0">
                  <TabsTrigger
                    value="personal-details"
                    className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Personal Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="leave-management"
                    className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Leave Management
                  </TabsTrigger>
                  <TabsTrigger
                    value="loans-advances"
                    className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Loans & Advances
                  </TabsTrigger>
                  <TabsTrigger
                    value="performance-goals"
                    className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Performance Goals
                  </TabsTrigger>
                  <TabsTrigger
                    value="training"
                    className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Training & Dev
                  </TabsTrigger>
                  <TabsTrigger
                    value="payslips"
                    className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Payslips
                  </TabsTrigger>
                  <TabsTrigger
                    value="tax-declarations"
                    className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Tax Declarations
                  </TabsTrigger>
                  <TabsTrigger
                    value="attendance"
                    className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Attendance
                  </TabsTrigger>
                  <TabsTrigger
                    value="service-requests"
                    className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Service Requests
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Personal Details Tab - Enhanced */}
              <TabsContent value="personal-details" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AnimatedIcon
                      icon={User}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Complete Personal Profile
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-600 border-green-200"
                    >
                      Profile: 95% Complete
                    </Badge>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setPersonalDetailsEditing(!personalDetailsEditing)
                      }
                      className="hover-lift"
                    >
                      <AnimatedIcon
                        icon={Edit}
                        animation="bounce"
                        className="mr-2"
                      />
                      {personalDetailsEditing ? "Cancel" : "Edit Details"}
                    </Button>
                  </div>
                </div>

                {/* Profile Header */}
                <Card className="animate-fadeInUp relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 via-transparent to-primary/5" />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-construction-200">
                          <AvatarImage src={employeeProfile.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-construction-500 to-primary text-white text-xl">
                            {employeeProfile.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {personalDetailsEditing && (
                          <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                          >
                            <AnimatedIcon icon={Upload} size="sm" />
                          </Button>
                        )}
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h4 className="text-2xl font-bold">
                            {employeeProfile.name}
                          </h4>
                          <p className="text-lg text-muted-foreground">
                            {employeeProfile.position}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">
                              ID: {employeeProfile.employeeId}
                            </Badge>
                            <Badge variant="secondary">
                              {employeeProfile.department}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-600"
                            >
                              Joined: {employeeProfile.joinDate}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-construction-500" />
                            <span className="truncate">
                              {employeeProfile.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-500" />
                            <span>{employeeProfile.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-green-500" />
                            <span>{employeeProfile.manager}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>Rating: {employeeProfile.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabbed Personal Information */}
                <Tabs defaultValue="basic-info" className="space-y-4">
                  {/* Mobile: Scrollable tabs, Desktop: Grid layout */}
                  <div className="w-full">
                    <TabsList className="h-auto p-1 bg-muted/30 md:grid md:grid-cols-6 w-full overflow-x-auto scrollbar-hide flex md:flex-none gap-1 md:gap-0">
                      <TabsTrigger
                        value="basic-info"
                        className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 md:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        Basic Info
                      </TabsTrigger>
                      <TabsTrigger
                        value="contact"
                        className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 md:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        Contact
                      </TabsTrigger>
                      <TabsTrigger
                        value="government-ids"
                        className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 md:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        Government IDs
                      </TabsTrigger>
                      <TabsTrigger
                        value="bank-details"
                        className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 md:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        Bank Details
                      </TabsTrigger>
                      <TabsTrigger
                        value="dependants"
                        className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 md:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        Dependants
                      </TabsTrigger>
                      <TabsTrigger
                        value="education"
                        className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 md:flex-shrink data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        Education
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Basic Information */}
                  <TabsContent value="basic-info" className="space-y-4">
                    <Card className="animate-scaleIn">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-construction-500" />
                          Basic Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div>
                            <Label>Full Name</Label>
                            {personalDetailsEditing ? (
                              <Input
                                defaultValue={employeeProfile.name}
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.name}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Date of Birth</Label>
                            {personalDetailsEditing ? (
                              <Input
                                type="date"
                                defaultValue={employeeProfile.dateOfBirth}
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.dateOfBirth}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Gender</Label>
                            {personalDetailsEditing ? (
                              <Select
                                defaultValue={employeeProfile.gender.toLowerCase()}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.gender}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Marital Status</Label>
                            {personalDetailsEditing ? (
                              <Select
                                defaultValue={employeeProfile.maritalStatus.toLowerCase()}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="single">Single</SelectItem>
                                  <SelectItem value="married">
                                    Married
                                  </SelectItem>
                                  <SelectItem value="divorced">
                                    Divorced
                                  </SelectItem>
                                  <SelectItem value="widowed">
                                    Widowed
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.maritalStatus}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Blood Group</Label>
                            {personalDetailsEditing ? (
                              <Select defaultValue={employeeProfile.bloodGroup}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="A+">A+</SelectItem>
                                  <SelectItem value="A-">A-</SelectItem>
                                  <SelectItem value="B+">B+</SelectItem>
                                  <SelectItem value="B-">B-</SelectItem>
                                  <SelectItem value="AB+">AB+</SelectItem>
                                  <SelectItem value="AB-">AB-</SelectItem>
                                  <SelectItem value="O+">O+</SelectItem>
                                  <SelectItem value="O-">O-</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.bloodGroup}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Nationality</Label>
                            {personalDetailsEditing ? (
                              <Input
                                defaultValue={employeeProfile.nationality}
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.nationality}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Religion</Label>
                            {personalDetailsEditing ? (
                              <Input
                                defaultValue={employeeProfile.religion}
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.religion}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Employee ID</Label>
                            <p className="text-sm font-medium mt-1 p-2 bg-gray-100 rounded text-gray-600">
                              {employeeProfile.employeeId}
                            </p>
                          </div>
                          <div>
                            <Label>Department</Label>
                            <p className="text-sm font-medium mt-1 p-2 bg-gray-100 rounded text-gray-600">
                              {employeeProfile.department}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Contact Information */}
                  <TabsContent value="contact" className="space-y-4">
                    <Card className="animate-scaleIn">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-blue-500" />
                          Contact Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label>Primary Phone Number</Label>
                              {personalDetailsEditing ? (
                                <Input
                                  defaultValue={employeeProfile.phone}
                                  className="mt-1"
                                />
                              ) : (
                                <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                  {employeeProfile.phone}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>Alternate Phone Number</Label>
                              {personalDetailsEditing ? (
                                <Input
                                  defaultValue={employeeProfile.alternatePhone}
                                  className="mt-1"
                                />
                              ) : (
                                <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                  {employeeProfile.alternatePhone}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>Email Address</Label>
                              {personalDetailsEditing ? (
                                <Input
                                  defaultValue={employeeProfile.email}
                                  className="mt-1"
                                />
                              ) : (
                                <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                  {employeeProfile.email}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>Emergency Contact Name</Label>
                              {personalDetailsEditing ? (
                                <Input
                                  defaultValue={
                                    employeeProfile.emergencyContactName
                                  }
                                  className="mt-1"
                                />
                              ) : (
                                <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                  {employeeProfile.emergencyContactName}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>Emergency Contact Number</Label>
                              {personalDetailsEditing ? (
                                <Input
                                  defaultValue={
                                    employeeProfile.emergencyContact
                                  }
                                  className="mt-1"
                                />
                              ) : (
                                <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                  {employeeProfile.emergencyContact}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label>Current Address</Label>
                              {personalDetailsEditing ? (
                                <Textarea
                                  defaultValue={employeeProfile.address}
                                  className="mt-1"
                                  rows={3}
                                />
                              ) : (
                                <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded min-h-[80px]">
                                  {employeeProfile.address}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>Permanent Address</Label>
                              {personalDetailsEditing ? (
                                <Textarea
                                  defaultValue={
                                    employeeProfile.permanentAddress
                                  }
                                  className="mt-1"
                                  rows={3}
                                />
                              ) : (
                                <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded min-h-[80px]">
                                  {employeeProfile.permanentAddress}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Government IDs */}
                  <TabsContent value="government-ids" className="space-y-4">
                    <Card className="animate-scaleIn">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-green-500" />
                          Government Identification
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label>PAN Number</Label>
                            {personalDetailsEditing ? (
                              <Input
                                defaultValue={employeeProfile.panNumber}
                                className="mt-1"
                                placeholder="ABCDE1234F"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.panNumber}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Aadhaar Number</Label>
                            {personalDetailsEditing ? (
                              <Input
                                defaultValue={employeeProfile.aadharNumber}
                                className="mt-1"
                                placeholder="1234 5678 9012"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.aadharNumber}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Passport Number</Label>
                            {personalDetailsEditing ? (
                              <Input
                                defaultValue={employeeProfile.passportNumber}
                                className="mt-1"
                                placeholder="Z1234567"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.passportNumber}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Passport Expiry Date</Label>
                            {personalDetailsEditing ? (
                              <Input
                                type="date"
                                defaultValue={employeeProfile.passportExpiry}
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.passportExpiry}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Driving License</Label>
                            {personalDetailsEditing ? (
                              <Input
                                defaultValue={employeeProfile.drivingLicense}
                                className="mt-1"
                                placeholder="DL123456789"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.drivingLicense}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Bank Details */}
                  <TabsContent value="bank-details" className="space-y-4">
                    <Card className="animate-scaleIn">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-emerald-500" />
                          Bank Account Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label>Bank Name</Label>
                            {personalDetailsEditing ? (
                              <Input
                                defaultValue={employeeProfile.bankName}
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.bankName}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Account Number</Label>
                            {personalDetailsEditing ? (
                              <Input
                                defaultValue={employeeProfile.accountNumber}
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                ***********
                                {employeeProfile.accountNumber.slice(-4)}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>IFSC Code</Label>
                            {personalDetailsEditing ? (
                              <Input
                                defaultValue={employeeProfile.ifscCode}
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.ifscCode}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Branch</Label>
                            {personalDetailsEditing ? (
                              <Input
                                defaultValue={employeeProfile.bankBranch}
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.bankBranch}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Account Type</Label>
                            {personalDetailsEditing ? (
                              <Select
                                defaultValue={employeeProfile.accountType.toLowerCase()}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="savings">
                                    Savings
                                  </SelectItem>
                                  <SelectItem value="current">
                                    Current
                                  </SelectItem>
                                  <SelectItem value="salary">Salary</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <p className="text-sm font-medium mt-1 p-2 bg-gray-50 rounded">
                                {employeeProfile.accountType}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Dependants */}
                  <TabsContent value="dependants" className="space-y-4">
                    <Card className="animate-scaleIn">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-purple-500" />
                            Family Dependants
                          </CardTitle>
                          {personalDetailsEditing && (
                            <Button size="sm" variant="outline">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Dependant
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {employeeProfile.dependants.map(
                            (dependant, index) => (
                              <Card
                                key={dependant.id}
                                className="p-4 border-l-4 border-l-purple-500"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                  <div>
                                    <Label className="text-xs">Name</Label>
                                    {personalDetailsEditing ? (
                                      <Input
                                        defaultValue={dependant.name}
                                        className="mt-1"
                                        size="sm"
                                      />
                                    ) : (
                                      <p className="text-sm font-medium mt-1">
                                        {dependant.name}
                                      </p>
                                    )}
                                  </div>
                                  <div>
                                    <Label className="text-xs">
                                      Relationship
                                    </Label>
                                    {personalDetailsEditing ? (
                                      <Select
                                        defaultValue={dependant.relationship.toLowerCase()}
                                      >
                                        <SelectTrigger
                                          className="mt-1"
                                          size="sm"
                                        >
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="spouse">
                                            Spouse
                                          </SelectItem>
                                          <SelectItem value="son">
                                            Son
                                          </SelectItem>
                                          <SelectItem value="daughter">
                                            Daughter
                                          </SelectItem>
                                          <SelectItem value="father">
                                            Father
                                          </SelectItem>
                                          <SelectItem value="mother">
                                            Mother
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    ) : (
                                      <p className="text-sm font-medium mt-1">
                                        {dependant.relationship}
                                      </p>
                                    )}
                                  </div>
                                  <div>
                                    <Label className="text-xs">
                                      Date of Birth
                                    </Label>
                                    {personalDetailsEditing ? (
                                      <Input
                                        type="date"
                                        defaultValue={dependant.dateOfBirth}
                                        className="mt-1"
                                        size="sm"
                                      />
                                    ) : (
                                      <p className="text-sm font-medium mt-1">
                                        {dependant.dateOfBirth}
                                      </p>
                                    )}
                                  </div>
                                  <div>
                                    <Label className="text-xs">Nominee</Label>
                                    <div className="flex items-center gap-2 mt-1">
                                      {dependant.nominee ? (
                                        <Badge
                                          variant="default"
                                          className="text-xs"
                                        >
                                          Primary Nominee
                                        </Badge>
                                      ) : (
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          Not Nominee
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Education */}
                  <TabsContent value="education" className="space-y-4">
                    <Card className="animate-scaleIn">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                            Educational Qualifications
                          </CardTitle>
                          {personalDetailsEditing && (
                            <Button size="sm" variant="outline">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Education
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {employeeProfile.education.map((edu, index) => (
                            <Card
                              key={index}
                              className="p-4 border-l-4 border-l-blue-500"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div>
                                  <Label className="text-xs">Degree</Label>
                                  {personalDetailsEditing ? (
                                    <Input
                                      defaultValue={edu.degree}
                                      className="mt-1"
                                      size="sm"
                                    />
                                  ) : (
                                    <p className="text-sm font-medium mt-1">
                                      {edu.degree}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <Label className="text-xs">
                                    Specialization
                                  </Label>
                                  {personalDetailsEditing ? (
                                    <Input
                                      defaultValue={edu.specialization}
                                      className="mt-1"
                                      size="sm"
                                    />
                                  ) : (
                                    <p className="text-sm font-medium mt-1">
                                      {edu.specialization}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <Label className="text-xs">Institution</Label>
                                  {personalDetailsEditing ? (
                                    <Input
                                      defaultValue={edu.institution}
                                      className="mt-1"
                                      size="sm"
                                    />
                                  ) : (
                                    <p className="text-sm font-medium mt-1">
                                      {edu.institution}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <Label className="text-xs">Year</Label>
                                  {personalDetailsEditing ? (
                                    <Input
                                      defaultValue={edu.year}
                                      className="mt-1"
                                      size="sm"
                                    />
                                  ) : (
                                    <p className="text-sm font-medium mt-1">
                                      {edu.year}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <Label className="text-xs">Percentage</Label>
                                  {personalDetailsEditing ? (
                                    <Input
                                      defaultValue={edu.percentage}
                                      className="mt-1"
                                      size="sm"
                                    />
                                  ) : (
                                    <p className="text-sm font-medium mt-1">
                                      {edu.percentage}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Save Changes */}
                {personalDetailsEditing && (
                  <Card className="animate-fadeInUp">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Save Changes</h4>
                          <p className="text-sm text-muted-foreground">
                            Review and save your updated information
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setPersonalDetailsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button className="bg-construction-500 hover:bg-construction-600">
                            <AnimatedIcon
                              icon={Save}
                              animation="bounce"
                              className="mr-2"
                            />
                            Save All Changes
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Leave Management Tab - Combined Leave Balance and Recent Leaves */}
              <TabsContent value="leave-management" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AnimatedIcon
                      icon={CalendarIcon}
                      animation="pulse"
                      className="text-primary"
                    />
                    Leave Management
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="animate-pulse">
                      FY 2024-25
                    </Badge>
                    <Button className="hover-lift">
                      <AnimatedIcon
                        icon={Plus}
                        animation="bounce"
                        className="mr-2"
                      />
                      Apply for Leave
                    </Button>
                  </div>
                </div>

                {/* Leave Balance Overview */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-construction-500" />
                    Leave Balance Overview
                  </h4>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Annual Leave */}
                    <Card className="animate-scaleIn">
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto">
                            <CalendarIcon className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold">
                              Annual Leave
                            </h4>
                            <p className="text-3xl font-bold text-primary">
                              {employeeProfile.annualLeave.total -
                                employeeProfile.annualLeave.used}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Available out of{" "}
                              {employeeProfile.annualLeave.total}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Used</span>
                              <span>
                                {employeeProfile.annualLeave.used} days
                              </span>
                            </div>
                            <Progress
                              value={
                                (employeeProfile.annualLeave.used /
                                  employeeProfile.annualLeave.total) *
                                100
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Sick Leave */}
                    <Card
                      className="animate-scaleIn"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          <div className="p-3 rounded-full bg-red-100 w-fit mx-auto">
                            <Heart className="h-8 w-8 text-red-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold">
                              Sick Leave
                            </h4>
                            <p className="text-3xl font-bold text-red-600">
                              {employeeProfile.sickLeave.total -
                                employeeProfile.sickLeave.used}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Available out of {employeeProfile.sickLeave.total}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Used</span>
                              <span>{employeeProfile.sickLeave.used} days</span>
                            </div>
                            <Progress
                              value={
                                (employeeProfile.sickLeave.used /
                                  employeeProfile.sickLeave.total) *
                                100
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Casual Leave */}
                    <Card
                      className="animate-scaleIn"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          <div className="p-3 rounded-full bg-emerald-100 w-fit mx-auto">
                            <Coffee className="h-8 w-8 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold">
                              Casual Leave
                            </h4>
                            <p className="text-3xl font-bold text-emerald-600">
                              {employeeProfile.casualLeave.total -
                                employeeProfile.casualLeave.used}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Available out of{" "}
                              {employeeProfile.casualLeave.total}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Used</span>
                              <span>
                                {employeeProfile.casualLeave.used} days
                              </span>
                            </div>
                            <Progress
                              value={
                                (employeeProfile.casualLeave.used /
                                  employeeProfile.casualLeave.total) *
                                100
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Enhanced Leave Summary & Analytics */}
                  <Card className="animate-fadeInUp relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 via-transparent to-primary/5" />
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AnimatedIcon
                            icon={BarChart3}
                            animation="glow"
                            className="text-construction-500"
                          />
                          Leave Summary & Analytics
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-600 border-green-200"
                        >
                          Healthy Usage
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Quick Stats Grid */}
                      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                        <div className="text-center p-5 rounded-lg bg-blue-50 border border-blue-100 min-h-[100px] flex flex-col justify-center">
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            47
                          </div>
                          <div className="text-sm text-blue-600/80 leading-tight">
                            Total Allocated
                          </div>
                        </div>
                        <div className="text-center p-5 rounded-lg bg-orange-50 border border-orange-100 min-h-[100px] flex flex-col justify-center">
                          <div className="text-2xl font-bold text-orange-600 mb-2">
                            16
                          </div>
                          <div className="text-sm text-orange-600/80 leading-tight">
                            Days Used
                          </div>
                        </div>
                        <div className="text-center p-5 rounded-lg bg-green-50 border border-green-100 min-h-[100px] flex flex-col justify-center">
                          <div className="text-2xl font-bold text-green-600 mb-2">
                            31
                          </div>
                          <div className="text-sm text-green-600/80 leading-tight">
                            Remaining
                          </div>
                        </div>
                        <div className="text-center p-5 rounded-lg bg-purple-50 border border-purple-100 min-h-[100px] flex flex-col justify-center">
                          <div className="text-2xl font-bold text-purple-600 mb-2">
                            34%
                          </div>
                          <div className="text-sm text-purple-600/80 leading-tight">
                            Usage Rate
                          </div>
                        </div>
                      </div>

                      {/* Detailed Analytics */}
                      <div className="grid gap-8 lg:grid-cols-2">
                        <div className="space-y-5">
                          <h4 className="font-semibold flex items-center gap-2 text-base">
                            <BarChart3 className="h-5 w-5 text-construction-500" />
                            Leave Breakdown
                          </h4>
                          <div className="space-y-4">
                            <div className="flex items-start justify-between p-4 rounded-lg bg-muted/30 min-h-[80px]">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0"></div>
                                <span className="text-sm font-medium text-gray-900">
                                  Annual Leave
                                </span>
                              </div>
                              <div className="text-right ml-4 flex-shrink-0">
                                <div className="text-sm font-bold text-gray-900 mb-1">
                                  8/25 used
                                </div>
                                <div className="text-xs text-muted-foreground whitespace-nowrap">
                                  32% utilization
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start justify-between p-4 rounded-lg bg-muted/30 min-h-[80px]">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0"></div>
                                <span className="text-sm font-medium text-gray-900">
                                  Sick Leave
                                </span>
                              </div>
                              <div className="text-right ml-4 flex-shrink-0">
                                <div className="text-sm font-bold text-gray-900 mb-1">
                                  3/10 used
                                </div>
                                <div className="text-xs text-muted-foreground whitespace-nowrap">
                                  30% utilization
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start justify-between p-4 rounded-lg bg-muted/30 min-h-[80px]">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0"></div>
                                <span className="text-sm font-medium text-gray-900">
                                  Casual Leave
                                </span>
                              </div>
                              <div className="text-right ml-4 flex-shrink-0">
                                <div className="text-sm font-bold text-gray-900 mb-1">
                                  5/12 used
                                </div>
                                <div className="text-xs text-muted-foreground whitespace-nowrap">
                                  42% utilization
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-5">
                          <h4 className="font-semibold flex items-center gap-2 text-base">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Smart Recommendations
                          </h4>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200 min-h-[80px]">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-green-800 mb-1">
                                  Good Work-Life Balance
                                </p>
                                <p className="text-xs text-green-600 leading-relaxed">
                                  Your leave usage is healthy and balanced
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200 min-h-[80px]">
                              <CalendarIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-blue-800 mb-1">
                                  Plan Vacation
                                </p>
                                <p className="text-xs text-blue-600 leading-relaxed">
                                  Consider planning a long vacation in Q2
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-lg bg-orange-50 border border-orange-200 min-h-[80px]">
                              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-orange-800 mb-1">
                                  Expiry Alert
                                </p>
                                <p className="text-xs text-orange-600 leading-relaxed">
                                  17 annual leave days expire in March
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Leave Summary */}
                {/* Recent Leave Requests */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <History className="h-4 w-4 text-construction-500" />
                    Recent Leave Requests
                  </h4>
                  <div className="grid gap-4">
                    {recentLeaveRequests.map((request, index) => (
                      <Card
                        key={request.id}
                        className="hover-lift animate-scaleIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-3 flex-1">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-full ${
                                    request.type === "Annual Leave"
                                      ? "bg-primary/10"
                                      : request.type === "Sick Leave"
                                        ? "bg-red-100"
                                        : "bg-emerald-100"
                                  }`}
                                >
                                  {request.type === "Annual Leave" && (
                                    <CalendarIcon className="h-5 w-5 text-primary" />
                                  )}
                                  {request.type === "Sick Leave" && (
                                    <Heart className="h-5 w-5 text-red-600" />
                                  )}
                                  {request.type === "Casual Leave" && (
                                    <Coffee className="h-5 w-5 text-emerald-600" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-semibold">
                                    {request.type}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {request.fromDate}{" "}
                                    {request.fromDate !== request.toDate &&
                                      `to ${request.toDate}`}{" "}
                                    • {request.days}{" "}
                                    {request.days === 1 ? "day" : "days"}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">
                                    Applied On:
                                  </span>
                                  <p className="font-medium">
                                    {request.appliedOn}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">
                                    Approver:
                                  </span>
                                  <p className="font-medium">
                                    {request.approver}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground text-sm">
                                  Reason:
                                </span>
                                <p className="font-medium">{request.reason}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                variant={
                                  request.status === "Approved"
                                    ? "default"
                                    : request.status === "Pending"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className="animate-pulse"
                              >
                                {request.status === "Approved" && (
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                )}
                                {request.status === "Pending" && (
                                  <Clock className="mr-1 h-3 w-3" />
                                )}
                                {request.status}
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover-lift"
                              >
                                <AnimatedIcon
                                  icon={Eye}
                                  size="sm"
                                  className="mr-2"
                                />
                                View
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Loans & Advances Tab */}
              <TabsContent value="loans-advances" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AnimatedIcon
                      icon={CreditCard}
                      animation="glow"
                      className="text-emerald-600"
                    />
                    Loans & Advances Management
                  </h3>
                  <Button className="hover-lift">
                    <AnimatedIcon
                      icon={Plus}
                      animation="bounce"
                      className="mr-2"
                    />
                    Apply for Loan/Advance
                  </Button>
                </div>

                {/* Loan & Advance Overview */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="animate-scaleIn">
                    <CardContent className="p-5">
                      <div className="text-center space-y-2">
                        <div className="p-3 rounded-full bg-emerald-100 w-fit mx-auto">
                          <CreditCard className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="text-2xl font-bold text-emerald-600">
                          ₹50K
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Available Limit
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-5">
                      <div className="text-center space-y-2">
                        <div className="p-3 rounded-full bg-blue-100 w-fit mx-auto">
                          <IndianRupee className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          ��15K
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Utilized Amount
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="animate-scaleIn"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <CardContent className="p-5">
                      <div className="text-center space-y-2">
                        <div className="p-3 rounded-full bg-orange-100 w-fit mx-auto">
                          <Calculator className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="text-2xl font-bold text-orange-600">
                          3
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Active Loans
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="animate-scaleIn"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <CardContent className="p-5">
                      <div className="text-center space-y-2">
                        <div className="p-3 rounded-full bg-purple-100 w-fit mx-auto">
                          <CalendarIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                          24
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Months Tenure
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Loan & Advance Applications */}
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Loan Management */}
                  <Card className="animate-scaleIn">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={CreditCard}
                          animation="glow"
                          className="text-emerald-600"
                        />
                        Loan Applications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full hover-lift">
                            <AnimatedIcon
                              icon={Plus}
                              animation="bounce"
                              className="mr-2"
                            />
                            Apply for Loan
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <AnimatedIcon
                                icon={CreditCard}
                                animation="pulse"
                                className="text-emerald-600"
                              />
                              Loan Application
                            </DialogTitle>
                            <DialogDescription>
                              Submit your loan request for processing
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Loan Type</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select loan type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="personal">
                                      Personal Loan
                                    </SelectItem>
                                    <SelectItem value="home">
                                      Home Loan
                                    </SelectItem>
                                    <SelectItem value="vehicle">
                                      Vehicle Loan
                                    </SelectItem>
                                    <SelectItem value="education">
                                      Education Loan
                                    </SelectItem>
                                    <SelectItem value="emergency">
                                      Emergency Loan
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Loan Amount (₹)</Label>
                                <Input placeholder="e.g., 500000" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Repayment Period (months)</Label>
                                <Input placeholder="e.g., 24" />
                              </div>
                              <div>
                                <Label>Interest Rate (%)</Label>
                                <Input placeholder="e.g., 12.5" disabled />
                              </div>
                            </div>
                            <div>
                              <Label>Purpose of Loan</Label>
                              <Textarea placeholder="Please provide details about the loan purpose..." />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Cancel</Button>
                              <Button className="bg-emerald-600 hover:bg-emerald-700">
                                <AnimatedIcon
                                  icon={Send}
                                  animation="bounce"
                                  className="mr-2"
                                />
                                Submit Application
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Recent Loan Applications */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">
                          Recent Applications
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50">
                            <div>
                              <p className="text-sm font-medium">
                                Personal Loan
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ₹2,00,000 • Dec 2024
                              </p>
                            </div>
                            <Badge variant="secondary">Pending</Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50">
                            <div>
                              <p className="text-sm font-medium">
                                Vehicle Loan
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ₹8,00,000 • Nov 2024
                              </p>
                            </div>
                            <Badge variant="default">Approved</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Advance Management */}
                  <Card
                    className="animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={IndianRupee}
                          animation="bounce"
                          className="text-blue-600"
                        />
                        Salary Advances
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full hover-lift"
                            variant="outline"
                          >
                            <AnimatedIcon
                              icon={Plus}
                              animation="bounce"
                              className="mr-2"
                            />
                            Request Advance
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <AnimatedIcon
                                icon={IndianRupee}
                                animation="pulse"
                                className="text-blue-600"
                              />
                              Salary Advance Request
                            </DialogTitle>
                            <DialogDescription>
                              Request advance against your salary
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Advance Type</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select advance type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="salary">
                                      Salary Advance
                                    </SelectItem>
                                    <SelectItem value="travel">
                                      Travel Advance
                                    </SelectItem>
                                    <SelectItem value="medical">
                                      Medical Advance
                                    </SelectItem>
                                    <SelectItem value="emergency">
                                      Emergency Advance
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Amount Requested (₹)</Label>
                                <Input placeholder="e.g., 25000" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Repayment Months</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select months" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 Month</SelectItem>
                                    <SelectItem value="2">2 Months</SelectItem>
                                    <SelectItem value="3">3 Months</SelectItem>
                                    <SelectItem value="6">6 Months</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Current Salary (₹)</Label>
                                <Input defaultValue="85000" disabled />
                              </div>
                            </div>
                            <div>
                              <Label>Reason for Advance</Label>
                              <Textarea placeholder="Please provide details about why you need this advance..." />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Cancel</Button>
                              <Button className="bg-blue-600 hover:bg-blue-700">
                                <AnimatedIcon
                                  icon={Send}
                                  animation="bounce"
                                  className="mr-2"
                                />
                                Submit Request
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Recent Advance Requests */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Recent Requests</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50">
                            <div>
                              <p className="text-sm font-medium">
                                Salary Advance
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ₹25,000 • Jan 2025
                              </p>
                            </div>
                            <Badge variant="secondary">Processing</Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50">
                            <div>
                              <p className="text-sm font-medium">
                                Medical Advance
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ₹15,000 • Dec 2024
                              </p>
                            </div>
                            <Badge variant="default">Approved</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Loan & Advance Summary */}
                <Card className="animate-fadeInUp relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={BarChart3}
                        animation="glow"
                        className="text-construction-500"
                      />
                      Financial Summary & Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Loan Portfolio</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Total Loans</span>
                            <span className="font-medium">₹10,00,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Outstanding</span>
                            <span className="font-medium">₹7,50,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Monthly EMI</span>
                            <span className="font-medium text-red-600">
                              ₹42,500
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Advance Status</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Total Advances</span>
                            <span className="font-medium">₹40,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Repaid</span>
                            <span className="font-medium">₹25,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Pending</span>
                            <span className="font-medium text-orange-600">
                              ₹15,000
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Credit Score</h4>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600 mb-2">
                            750
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Excellent Credit
                          </div>
                          <Progress value={75} className="mt-3" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Goals Tab */}
              <TabsContent value="performance-goals" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AnimatedIcon
                      icon={Target}
                      animation="glow"
                      className="text-emerald-600"
                    />
                    Performance Goals & Objectives
                  </h3>
                  <Button className="hover-lift">
                    <AnimatedIcon
                      icon={Plus}
                      animation="bounce"
                      className="mr-2"
                    />
                    Set New Goal
                  </Button>
                </div>

                <div className="grid gap-4">
                  {performanceGoals.map((goal, index) => (
                    <Card
                      key={goal.id}
                      className="hover-lift animate-scaleIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-full ${
                                    goal.priority === "High"
                                      ? "bg-red-100"
                                      : goal.priority === "Medium"
                                        ? "bg-yellow-100"
                                        : "bg-green-100"
                                  }`}
                                >
                                  <Target
                                    className={`h-5 w-5 ${
                                      goal.priority === "High"
                                        ? "text-red-600"
                                        : goal.priority === "Medium"
                                          ? "text-yellow-600"
                                          : "text-green-600"
                                    }`}
                                  />
                                </div>
                                <div>
                                  <h4 className="font-semibold">
                                    {goal.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {goal.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={
                                  goal.priority === "High"
                                    ? "border-red-200 text-red-600"
                                    : goal.priority === "Medium"
                                      ? "border-yellow-200 text-yellow-600"
                                      : "border-green-200 text-green-600"
                                }
                              >
                                {goal.priority}
                              </Badge>
                              <Badge variant="secondary">{goal.category}</Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <span className="text-sm text-muted-foreground">
                                Progress
                              </span>
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>Completed</span>
                                  <span className="font-medium">
                                    {goal.progress}%
                                  </span>
                                </div>
                                <Progress
                                  value={goal.progress}
                                  className="h-2"
                                />
                              </div>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">
                                Due Date
                              </span>
                              <p className="font-medium">{goal.dueDate}</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">
                                Status
                              </span>
                              <Badge
                                variant={
                                  goal.status === "Completed"
                                    ? "default"
                                    : "secondary"
                                }
                                className="animate-pulse"
                              >
                                {goal.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover-lift"
                            >
                              <AnimatedIcon
                                icon={Eye}
                                size="sm"
                                className="mr-2"
                              />
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover-lift"
                            >
                              <AnimatedIcon
                                icon={Edit}
                                size="sm"
                                className="mr-2"
                              />
                              Update Progress
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Goals Summary */}
                <Card className="animate-fadeInUp">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={BarChart3}
                        animation="glow"
                        className="text-construction-500"
                      />
                      Goals Summary & Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-emerald-600">
                          {performanceGoals.length}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total Goals
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {
                            performanceGoals.filter(
                              (g) => g.status === "In Progress",
                            ).length
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          In Progress
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">
                          {Math.round(
                            performanceGoals.reduce(
                              (acc, goal) => acc + goal.progress,
                              0,
                            ) / performanceGoals.length,
                          )}
                          %
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Avg Progress
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">
                          {
                            performanceGoals.filter(
                              (g) => g.priority === "High",
                            ).length
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          High Priority
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Training & Development Tab */}
              <TabsContent value="training" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AnimatedIcon
                      icon={BookOpen}
                      animation="bounce"
                      className="text-construction-500"
                    />
                    Training & Development Programs
                  </h3>
                  <Button className="hover-lift">
                    <AnimatedIcon
                      icon={Search}
                      animation="bounce"
                      className="mr-2"
                    />
                    Browse Catalog
                  </Button>
                </div>

                <div className="grid gap-4">
                  {trainingPrograms.map((training, index) => (
                    <Card
                      key={training.id}
                      className="hover-lift animate-scaleIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-full ${
                                    training.status === "Enrolled"
                                      ? "bg-blue-100"
                                      : training.status === "Completed"
                                        ? "bg-green-100"
                                        : training.status === "Available"
                                          ? "bg-yellow-100"
                                          : "bg-purple-100"
                                  }`}
                                >
                                  <BookOpen
                                    className={`h-5 w-5 ${
                                      training.status === "Enrolled"
                                        ? "text-blue-600"
                                        : training.status === "Completed"
                                          ? "text-green-600"
                                          : training.status === "Available"
                                            ? "text-yellow-600"
                                            : "text-purple-600"
                                    }`}
                                  />
                                </div>
                                <div>
                                  <h4 className="font-semibold">
                                    {training.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {training.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  training.status === "Completed"
                                    ? "default"
                                    : training.status === "Enrolled"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="animate-pulse"
                              >
                                {training.status === "Completed" && (
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                )}
                                {training.status}
                              </Badge>
                              <Badge variant="outline">{training.type}</Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Start Date:
                              </span>
                              <p className="font-medium">
                                {training.startDate}
                              </p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Duration:
                              </span>
                              <p className="font-medium">{training.duration}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Location:
                              </span>
                              <p className="font-medium">{training.location}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Instructor:
                              </span>
                              <p className="font-medium">
                                {training.instructor}
                              </p>
                            </div>
                          </div>

                          {training.status === "Enrolled" && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span className="font-medium">
                                  {training.completion}%
                                </span>
                              </div>
                              <Progress
                                value={training.completion}
                                className="h-2"
                              />
                            </div>
                          )}

                          <div className="flex justify-end gap-2">
                            {training.status === "Available" && (
                              <Button
                                size="sm"
                                className="bg-construction-500 hover:bg-construction-600"
                              >
                                <AnimatedIcon
                                  icon={Plus}
                                  size="sm"
                                  className="mr-2"
                                />
                                Enroll Now
                              </Button>
                            )}
                            {training.status === "Recommended" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="hover-lift"
                              >
                                <AnimatedIcon
                                  icon={Star}
                                  size="sm"
                                  className="mr-2"
                                />
                                View Recommendation
                              </Button>
                            )}
                            {training.status === "Enrolled" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="hover-lift"
                              >
                                <AnimatedIcon
                                  icon={BookOpen}
                                  size="sm"
                                  className="mr-2"
                                />
                                Continue Learning
                              </Button>
                            )}
                            {training.status === "Completed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="hover-lift"
                              >
                                <AnimatedIcon
                                  icon={Download}
                                  size="sm"
                                  className="mr-2"
                                />
                                Download Certificate
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover-lift"
                            >
                              <AnimatedIcon
                                icon={Eye}
                                size="sm"
                                className="mr-2"
                              />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Training Summary */}
                <Card className="animate-fadeInUp">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Award}
                        animation="glow"
                        className="text-construction-500"
                      />
                      Training Progress & Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {
                            trainingPrograms.filter(
                              (t) => t.status === "Enrolled",
                            ).length
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Enrolled Courses
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {
                            trainingPrograms.filter(
                              (t) => t.status === "Completed",
                            ).length
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Completed
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">
                          {
                            trainingPrograms.filter(
                              (t) => t.status === "Available",
                            ).length
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Available
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {
                            trainingPrograms.filter(
                              (t) => t.status === "Recommended",
                            ).length
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Recommended
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payslips Tab */}
              <TabsContent value="payslips" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AnimatedIcon
                      icon={Receipt}
                      animation="glow"
                      className="text-emerald-600"
                    />
                    Payslip Management
                  </h3>
                  <Button className="hover-lift">
                    <AnimatedIcon
                      icon={Download}
                      animation="bounce"
                      className="mr-2"
                    />
                    Download All Payslips
                  </Button>
                </div>

                <div className="grid gap-4">
                  {payslipHistory.map((payslip, index) => (
                    <Card
                      key={payslip.month}
                      className="hover-lift animate-scaleIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <h4 className="font-semibold">{payslip.month}</h4>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">
                                  Gross Pay
                                </p>
                                <p className="font-medium">
                                  ₹{payslip.grossPay.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  Deductions
                                </p>
                                <p className="font-medium">
                                  ₹{payslip.deductions.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Net Pay</p>
                                <p className="font-medium text-green-600">
                                  ₹{payslip.netPay.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="default" className="animate-pulse">
                              {payslip.status}
                            </Badge>
                            <Button variant="outline" className="hover-lift">
                              <AnimatedIcon
                                icon={Eye}
                                size="sm"
                                className="mr-2"
                              />
                              View
                            </Button>
                            <Button className="hover-lift">
                              <AnimatedIcon
                                icon={Download}
                                size="sm"
                                className="mr-2"
                              />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Tax Declarations Tab */}
              <TabsContent value="tax-declarations" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AnimatedIcon
                      icon={Calculator}
                      animation="pulse"
                      className="text-blue-600"
                    />
                    Tax Declarations (FY 2024-25)
                  </h3>
                  <Badge variant="outline" className="animate-pulse">
                    Last Updated: 15 Jan 2024
                  </Badge>
                </div>

                <Card className="animate-fadeInUp">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Section 80C */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Calculator className="h-4 w-4 text-blue-600" />
                          Section 80C Deductions (Max: ₹1,50,000)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>EPF Contribution</Label>
                            <Input defaultValue="50000" />
                          </div>
                          <div>
                            <Label>Life Insurance Premium</Label>
                            <Input defaultValue="25000" />
                          </div>
                          <div>
                            <Label>ELSS Mutual Funds</Label>
                            <Input defaultValue="30000" />
                          </div>
                          <div>
                            <Label>PPF Contribution</Label>
                            <Input defaultValue="45000" />
                          </div>
                        </div>
                      </div>

                      {/* Section 80D */}
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-600" />
                          Section 80D - Medical Insurance (Max: ₹25,000)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Health Insurance Premium (Self)</Label>
                            <Input defaultValue="15000" />
                          </div>
                          <div>
                            <Label>Health Insurance Premium (Parents)</Label>
                            <Input defaultValue="10000" />
                          </div>
                        </div>
                      </div>

                      {/* HRA */}
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Home className="h-4 w-4 text-green-600" />
                          House Rent Allowance (HRA)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Monthly Rent Paid</Label>
                            <Input defaultValue="25000" />
                          </div>
                          <div>
                            <Label>Landlord PAN Number</Label>
                            <Input defaultValue="ABCDE1234F" />
                          </div>
                        </div>
                      </div>

                      {/* Other Deductions */}
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-600" />
                          Other Deductions
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Section 80E (Education Loan Interest)</Label>
                            <Input defaultValue="0" />
                          </div>
                          <div>
                            <Label>Section 24 (Home Loan Interest)</Label>
                            <Input defaultValue="0" />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          <p>Total Declared: ₹2,00,000</p>
                          <p>Tax Savings: ₹62,000 (approx.)</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">
                            <AnimatedIcon
                              icon={RefreshCw}
                              size="sm"
                              className="mr-2"
                            />
                            Reset
                          </Button>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <AnimatedIcon
                              icon={Save}
                              animation="bounce"
                              className="mr-2"
                            />
                            Save Declarations
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Attendance Tab */}
              <TabsContent value="attendance" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AnimatedIcon
                      icon={Clock}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Attendance & Time Logs
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <AnimatedIcon icon={Filter} size="sm" className="mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <AnimatedIcon
                        icon={Download}
                        size="sm"
                        className="mr-2"
                      />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="animate-scaleIn">
                    <CardContent className="p-4 text-center">
                      <div className="p-3 rounded-full bg-green-100 w-fit mx-auto mb-2">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold">22</p>
                      <p className="text-sm text-muted-foreground">
                        Days Present
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className="animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="p-3 rounded-full bg-orange-100 w-fit mx-auto mb-2">
                        <Clock3 className="h-6 w-6 text-orange-600" />
                      </div>
                      <p className="text-2xl font-bold">176h</p>
                      <p className="text-sm text-muted-foreground">
                        Total Hours
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className="animate-scaleIn"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="p-3 rounded-full bg-red-100 w-fit mx-auto mb-2">
                        <XCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">
                        Days Absent
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="animate-fadeInUp">
                  <CardHeader>
                    <CardTitle>Recent Attendance Records</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {attendanceData.map((record, index) => (
                        <div
                          key={record.date}
                          className="flex items-center justify-between p-3 border rounded-lg animate-slideInUp hover:bg-muted/50 transition-colors"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-2 rounded-full ${
                                record.status === "Present"
                                  ? "bg-green-100"
                                  : "bg-orange-100"
                              }`}
                            >
                              {record.status === "Present" ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <CalendarIcon className="h-4 w-4 text-orange-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{record.date}</p>
                              <p className="text-sm text-muted-foreground">
                                {record.status}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{record.hours}</p>
                            <p className="text-sm text-muted-foreground">
                              {record.checkIn} - {record.checkOut}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Service Requests Tab */}
              <TabsContent value="service-requests" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AnimatedIcon
                      icon={HeadphonesIcon}
                      animation="bounce"
                      className="text-purple-600"
                    />
                    Service Requests
                  </h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="hover-lift">
                        <AnimatedIcon
                          icon={Plus}
                          animation="bounce"
                          className="mr-2"
                        />
                        Raise New Request
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <AnimatedIcon
                            icon={Ticket}
                            animation="pulse"
                            className="text-purple-600"
                          />
                          Create Service Request
                        </DialogTitle>
                        <DialogDescription>
                          Submit a new service request for assistance
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Request Category</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="it-support">
                                  IT Support
                                </SelectItem>
                                <SelectItem value="hr-query">
                                  HR Query
                                </SelectItem>
                                <SelectItem value="facility">
                                  Facility Management
                                </SelectItem>
                                <SelectItem value="finance">
                                  Finance & Accounts
                                </SelectItem>
                                <SelectItem value="admin">
                                  Administration
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Priority Level</Label>
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
                        <div>
                          <Label>Request Subject</Label>
                          <Input placeholder="Brief description of your request" />
                        </div>
                        <div>
                          <Label>Detailed Description</Label>
                          <Textarea placeholder="Please provide detailed information about your request..." />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            <AnimatedIcon
                              icon={Send}
                              animation="bounce"
                              className="mr-2"
                            />
                            Submit Request
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-4">
                  {serviceRequests.map((request, index) => (
                    <Card
                      key={request.id}
                      className="hover-lift animate-scaleIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold">
                                {request.subject}
                              </h4>
                              <Badge variant="outline">#{request.id}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{request.category}</span>
                              <span>•</span>
                              <span>Submitted on {request.submittedOn}</span>
                              <span>���</span>
                              <span>Assigned to {request.assignedTo}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                request.priority === "High"
                                  ? "destructive"
                                  : request.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {request.priority}
                            </Badge>
                            <Badge
                              variant={
                                request.status === "Resolved"
                                  ? "default"
                                  : request.status === "In Progress"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="animate-pulse"
                            >
                              {request.status === "Resolved" && (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              )}
                              {request.status}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover-lift"
                            >
                              <AnimatedIcon
                                icon={Eye}
                                size="sm"
                                className="mr-2"
                              />
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Employee Portal Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Complete self-service portal empowering employees with easy
              access to all HR services
            </p>
            <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
