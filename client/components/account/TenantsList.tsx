import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FileUpload } from "../ui/file-upload";
import {
  Building2,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  DollarSign,
  Crown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Star,
  Database,
  Activity,
} from "lucide-react";
import { AnimatedIcon, PulsingDot } from "../ui/animated-icons";
import { AnimatedCounter } from "../ui/animated-counter";
import { Link } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { Tenant, TenantRegistrationForm, BillingCycle } from "./types";
import { industryTypes, subscriptionPlans } from "./data";

// Mock data for multiple tenants
const mockTenantsList: Tenant[] = [
  {
    id: "tenant_001",
    name: "TechCorp Solutions",
    organizationName: "TechCorp Solutions Pvt Ltd",
    industry: {
      id: "technology",
      name: "Technology & Software",
      category: "IT & Services",
      description: "Software development, IT services, and consultancy",
      defaultModules: ["crm", "project_management", "hrms"],
      icon: "💻",
    },
    subscription: {
      id: "sub_001",
      planId: "professional",
      planName: "Professional Plan",
      planType: "professional",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2025-01-15",
      autoRenew: true,
      modules: ["crm", "project", "finance", "hrms"],
      limits: {
        maxUsers: 100,
        maxStorage: 200,
        maxApiCalls: 50000,
        maxProjects: 50,
        maxIntegrations: 15,
        supportLevel: "priority",
      },
      pricing: {
        basePrice: 9999,
        currency: "INR",
        billingCycle: "monthly",
        taxes: { gst: 18, serviceTax: 0 },
      },
    },
    status: "active",
    adminUser: {
      id: "user_001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@techcorp.com",
      phone: "+91-9876543210",
      role: "owner",
      isActive: true,
      lastLogin: "2024-12-21T09:30:00Z",
      createdAt: "2024-01-15T10:00:00Z",
    },
    settings: {
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
      currency: "INR",
      language: "en",
      notifications: {
        emailAlerts: true,
        smsAlerts: true,
        pushNotifications: true,
        billingReminders: true,
        usageAlerts: true,
        securityAlerts: true,
      },
      security: {
        twoFactorAuth: true,
        ipWhitelist: ["203.0.113.0/24"],
        sessionTimeout: 480,
        passwordPolicy: {
          minLength: 8,
          requireSpecialChars: true,
          requireNumbers: true,
          expiryDays: 90,
        },
      },
      branding: {
        logoUrl: "/uploads/techcorp-logo.png",
        primaryColor: "#0B62DA",
        secondaryColor: "#FF9F1A",
        companyName: "TechCorp Solutions",
      },
    },
    usage: {
      currentMonth: {
        users: 45,
        storageUsed: 89.5,
        apiCalls: 23580,
        activeProjects: 12,
        billingAmount: 8499,
      },
      previousMonth: {
        users: 42,
        storageUsed: 78.2,
        apiCalls: 21340,
        activeProjects: 10,
        billingAmount: 8499,
      },
      yearToDate: {
        totalBilling: 101988,
        avgMonthlyUsers: 41,
        peakStorage: 95.2,
        totalApiCalls: 267890,
      },
      alerts: [],
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-12-21T09:30:00Z",
    billingCycle: "monthly",
  },
  {
    id: "tenant_002",
    name: "BuildMax Construction",
    organizationName: "BuildMax Construction Ltd",
    industry: {
      id: "real_estate",
      name: "Real Estate",
      category: "Property & Construction",
      description: "Property development, sales, and management",
      defaultModules: ["crm", "project_management", "finance"],
      icon: "🏢",
    },
    subscription: {
      id: "sub_002",
      planId: "enterprise",
      planName: "Enterprise Plan",
      planType: "enterprise",
      status: "active",
      startDate: "2024-03-01",
      endDate: "2025-03-01",
      autoRenew: true,
      modules: ["crm", "project", "finance", "hrms", "inventory"],
      limits: {
        maxUsers: -1,
        maxStorage: 1000,
        maxApiCalls: -1,
        maxProjects: -1,
        maxIntegrations: -1,
        supportLevel: "dedicated",
      },
      pricing: {
        basePrice: 24999,
        currency: "INR",
        billingCycle: "yearly",
        discount: {
          percentage: 20,
          validUntil: "2025-03-01",
          reason: "Enterprise annual discount",
        },
        taxes: { gst: 18, serviceTax: 0 },
      },
    },
    status: "active",
    adminUser: {
      id: "user_002",
      name: "Priya Sharma",
      email: "priya@buildmax.com",
      phone: "+91-9123456789",
      role: "owner",
      isActive: true,
      lastLogin: "2024-12-21T14:20:00Z",
      createdAt: "2024-03-01T09:00:00Z",
    },
    settings: {
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
      currency: "INR",
      language: "en",
      notifications: {
        emailAlerts: true,
        smsAlerts: false,
        pushNotifications: true,
        billingReminders: true,
        usageAlerts: false,
        securityAlerts: true,
      },
      security: {
        twoFactorAuth: true,
        ipWhitelist: [],
        sessionTimeout: 720,
        passwordPolicy: {
          minLength: 10,
          requireSpecialChars: true,
          requireNumbers: true,
          expiryDays: 60,
        },
      },
      branding: {
        logoUrl: "/uploads/buildmax-logo.png",
        primaryColor: "#059669",
        secondaryColor: "#F59E0B",
        companyName: "BuildMax Construction",
      },
    },
    usage: {
      currentMonth: {
        users: 125,
        storageUsed: 456.8,
        apiCalls: 145000,
        activeProjects: 28,
        billingAmount: 19999,
      },
      previousMonth: {
        users: 118,
        storageUsed: 421.3,
        apiCalls: 138400,
        activeProjects: 25,
        billingAmount: 19999,
      },
      yearToDate: {
        totalBilling: 199990,
        avgMonthlyUsers: 115,
        peakStorage: 502.1,
        totalApiCalls: 1340000,
      },
      alerts: [],
    },
    createdAt: "2024-03-01T09:00:00Z",
    updatedAt: "2024-12-21T14:20:00Z",
    billingCycle: "yearly",
  },
  {
    id: "tenant_003",
    name: "HealthCare Plus",
    organizationName: "HealthCare Plus Hospital",
    industry: {
      id: "healthcare",
      name: "Healthcare",
      category: "Medical",
      description: "Hospitals, clinics, and medical practice management",
      defaultModules: ["patient_management", "appointment", "billing"],
      icon: "🏥",
    },
    subscription: {
      id: "sub_003",
      planId: "trial",
      planName: "Free Trial",
      planType: "trial",
      status: "active",
      startDate: "2024-12-10",
      endDate: "2024-12-24",
      autoRenew: false,
      modules: ["crm", "dashboard"],
      limits: {
        maxUsers: 5,
        maxStorage: 5,
        maxApiCalls: 1000,
        maxProjects: 3,
        maxIntegrations: 2,
        supportLevel: "basic",
      },
      pricing: {
        basePrice: 0,
        currency: "INR",
        billingCycle: "monthly",
        taxes: { gst: 0, serviceTax: 0 },
      },
    },
    status: "trial",
    adminUser: {
      id: "user_003",
      name: "Dr. Amit Patel",
      email: "amit.patel@healthcareplus.com",
      phone: "+91-9987654321",
      role: "admin",
      isActive: true,
      lastLogin: "2024-12-20T16:45:00Z",
      createdAt: "2024-12-10T11:30:00Z",
    },
    settings: {
      timezone: "Asia/Kolkata",
      dateFormat: "MM/DD/YYYY",
      currency: "INR",
      language: "en",
      notifications: {
        emailAlerts: true,
        smsAlerts: true,
        pushNotifications: false,
        billingReminders: true,
        usageAlerts: true,
        securityAlerts: true,
      },
      security: {
        twoFactorAuth: false,
        ipWhitelist: [],
        sessionTimeout: 240,
        passwordPolicy: {
          minLength: 8,
          requireSpecialChars: false,
          requireNumbers: true,
          expiryDays: 90,
        },
      },
      branding: {
        primaryColor: "#0B62DA",
        secondaryColor: "#FF9F1A",
        companyName: "HealthCare Plus",
      },
    },
    usage: {
      currentMonth: {
        users: 3,
        storageUsed: 1.2,
        apiCalls: 450,
        activeProjects: 1,
        billingAmount: 0,
      },
      previousMonth: {
        users: 0,
        storageUsed: 0,
        apiCalls: 0,
        activeProjects: 0,
        billingAmount: 0,
      },
      yearToDate: {
        totalBilling: 0,
        avgMonthlyUsers: 3,
        peakStorage: 1.2,
        totalApiCalls: 450,
      },
      alerts: [],
    },
    createdAt: "2024-12-10T11:30:00Z",
    updatedAt: "2024-12-20T16:45:00Z",
    trialExpiresAt: "2024-12-24T11:30:00Z",
    billingCycle: "monthly",
  },
  {
    id: "tenant_004",
    name: "EduLearn Academy",
    organizationName: "EduLearn Academy Pvt Ltd",
    industry: {
      id: "education",
      name: "Education",
      category: "Academic",
      description: "Schools, colleges, and training institutes",
      defaultModules: ["student_management", "academic", "fee_management"],
      icon: "🎓",
    },
    subscription: {
      id: "sub_004",
      planId: "basic",
      planName: "Basic Plan",
      planType: "basic",
      status: "active",
      startDate: "2024-06-15",
      endDate: "2025-06-15",
      autoRenew: true,
      modules: ["crm", "project", "finance"],
      limits: {
        maxUsers: 25,
        maxStorage: 50,
        maxApiCalls: 10000,
        maxProjects: 10,
        maxIntegrations: 5,
        supportLevel: "basic",
      },
      pricing: {
        basePrice: 2999,
        currency: "INR",
        billingCycle: "monthly",
        taxes: { gst: 18, serviceTax: 0 },
      },
    },
    status: "active",
    adminUser: {
      id: "user_004",
      name: "Sunita Verma",
      email: "sunita@edulearn.com",
      phone: "+91-9555666777",
      role: "admin",
      isActive: true,
      lastLogin: "2024-12-19T10:15:00Z",
      createdAt: "2024-06-15T14:20:00Z",
    },
    settings: {
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
      currency: "INR",
      language: "en",
      notifications: {
        emailAlerts: true,
        smsAlerts: true,
        pushNotifications: true,
        billingReminders: true,
        usageAlerts: true,
        securityAlerts: false,
      },
      security: {
        twoFactorAuth: false,
        ipWhitelist: [],
        sessionTimeout: 360,
        passwordPolicy: {
          minLength: 6,
          requireSpecialChars: false,
          requireNumbers: true,
          expiryDays: 120,
        },
      },
      branding: {
        logoUrl: "/uploads/edulearn-logo.png",
        primaryColor: "#7C3AED",
        secondaryColor: "#F59E0B",
        companyName: "EduLearn Academy",
      },
    },
    usage: {
      currentMonth: {
        users: 18,
        storageUsed: 23.4,
        apiCalls: 5620,
        activeProjects: 6,
        billingAmount: 2549,
      },
      previousMonth: {
        users: 15,
        storageUsed: 19.8,
        apiCalls: 4890,
        activeProjects: 5,
        billingAmount: 2549,
      },
      yearToDate: {
        totalBilling: 15294,
        avgMonthlyUsers: 16,
        peakStorage: 25.1,
        totalApiCalls: 32400,
      },
      alerts: [],
    },
    createdAt: "2024-06-15T14:20:00Z",
    updatedAt: "2024-12-19T10:15:00Z",
    billingCycle: "monthly",
  },
  {
    id: "tenant_005",
    name: "RetailHub Solutions",
    organizationName: "RetailHub Solutions India",
    industry: {
      id: "retail",
      name: "Retail & E-commerce",
      category: "Commerce",
      description: "Retail stores, online marketplaces, and distribution",
      defaultModules: ["inventory", "pos", "ecommerce", "customer_management"],
      icon: "🛒",
    },
    subscription: {
      id: "sub_005",
      planId: "professional",
      planName: "Professional Plan",
      planType: "professional",
      status: "suspended",
      startDate: "2024-02-20",
      endDate: "2025-02-20",
      autoRenew: false,
      modules: ["crm", "project", "finance", "inventory"],
      limits: {
        maxUsers: 100,
        maxStorage: 200,
        maxApiCalls: 50000,
        maxProjects: 50,
        maxIntegrations: 15,
        supportLevel: "priority",
      },
      pricing: {
        basePrice: 9999,
        currency: "INR",
        billingCycle: "monthly",
        taxes: { gst: 18, serviceTax: 0 },
      },
    },
    status: "suspended",
    adminUser: {
      id: "user_005",
      name: "Vikram Singh",
      email: "vikram@retailhub.com",
      phone: "+91-9444555666",
      role: "owner",
      isActive: false,
      lastLogin: "2024-11-15T08:30:00Z",
      createdAt: "2024-02-20T12:00:00Z",
    },
    settings: {
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
      currency: "INR",
      language: "en",
      notifications: {
        emailAlerts: false,
        smsAlerts: false,
        pushNotifications: false,
        billingReminders: true,
        usageAlerts: false,
        securityAlerts: true,
      },
      security: {
        twoFactorAuth: true,
        ipWhitelist: [],
        sessionTimeout: 300,
        passwordPolicy: {
          minLength: 8,
          requireSpecialChars: true,
          requireNumbers: true,
          expiryDays: 90,
        },
      },
      branding: {
        primaryColor: "#DC2626",
        secondaryColor: "#F59E0B",
        companyName: "RetailHub Solutions",
      },
    },
    usage: {
      currentMonth: {
        users: 0,
        storageUsed: 156.7,
        apiCalls: 0,
        activeProjects: 8,
        billingAmount: 0,
      },
      previousMonth: {
        users: 67,
        storageUsed: 156.7,
        apiCalls: 34500,
        activeProjects: 8,
        billingAmount: 8499,
      },
      yearToDate: {
        totalBilling: 76491,
        avgMonthlyUsers: 58,
        peakStorage: 178.9,
        totalApiCalls: 412000,
      },
      alerts: [],
    },
    createdAt: "2024-02-20T12:00:00Z",
    updatedAt: "2024-11-15T08:30:00Z",
    billingCycle: "monthly",
  },
];

export function TenantsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");

  // Dialog states
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Edit form state
  const [editFormData, setEditFormData] = useState<
    Partial<Tenant & TenantRegistrationForm>
  >({});
  const [isUpdating, setIsUpdating] = useState(false);

  const { toast } = useToast();

  const filteredTenants = mockTenantsList.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.organizationName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      tenant.industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.adminUser.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || tenant.status === statusFilter;
    const matchesPlan =
      planFilter === "all" || tenant.subscription.planType === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "trial":
        return "text-blue-600";
      case "suspended":
        return "text-orange-600";
      case "expired":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "trial":
        return "secondary";
      case "suspended":
        return "destructive";
      case "expired":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTrialDaysLeft = (tenant: Tenant) => {
    if (tenant.status !== "trial" || !tenant.trialExpiresAt) return null;
    const today = new Date();
    const expiryDate = new Date(tenant.trialExpiresAt);
    const daysLeft = Math.ceil(
      (expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24),
    );
    return Math.max(0, daysLeft);
  };

  // Action handlers
  const handleViewTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setShowViewDialog(true);
  };

  const handleEditTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    // Initialize comprehensive edit form with tenant data and mock registration fields
    setEditFormData({
      // Basic tenant data
      name: tenant.name,
      organizationName: tenant.organizationName,
      adminUser: { ...tenant.adminUser },
      subscription: { ...tenant.subscription },
      status: tenant.status,

      // Registration form fields (using mock values for demo)
      adminName: tenant.adminUser.name,
      adminEmail: tenant.adminUser.email,
      adminPhone: tenant.adminUser.phone,
      adminAlternatePhone: "",
      companyLegalName: tenant.organizationName,
      incorporationDate: "2020-01-01",
      companyType: "private_limited",
      registeredAddress: "123 Business District, Metro City",
      communicationAddress: "123 Business District, Metro City",
      pincode: "110001",
      website: `www.${tenant.name.toLowerCase().replace(/\s+/g, "")}.com`,
      industryId: tenant.industry.id,
      subIndustry: "",
      businessDescription: tenant.industry.description,
      country: "India",
      state: "Delhi",
      city: "New Delhi",
      timezone: "Asia/Kolkata",
      panNumber: "ABCTY1234D",
      tanNumber: "DELX12345Y",
      gstNumber: "07ABCTY1234D1ZX",
      cinNumber: "U74900DL2020PTC123456",
      llpinNumber: "",
      udyamNumber: "",
      iecCode: "",
      fssaiNumber: "",
      drugLicenseNumber: "",
      reraNumber: "",
      sebiRegNumber: "",
      rbiLicenseNumber: "",
      irdaiLicenseNumber: "",
      aicteLicenseNumber: "",
      mciRegNumber: "",
      bankName: "HDFC Bank",
      accountNumber: "50100123456789",
      ifscCode: "HDFC0001234",
      branchName: "Connaught Place",
      accountType: "current",
      planId: tenant.subscription.planId,
      billingCycle: "yearly" as BillingCycle,
      selectedModules: tenant.subscription.modules,
      functionalCurrency: "INR",
      financialYearStart: "04-01",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "24",
      adminDesignation: "CEO",
      adminDepartment: "Administration",
      acceptedTerms: true,
      acceptedPrivacy: true,
      acceptedDataProcessing: true,
    });
    setShowEditDialog(true);
  };

  const handleDeleteTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setShowDeleteDialog(true);
  };

  const handleUpdateTenant = async () => {
    if (!selectedTenant) return;

    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update the tenant data (in real app, this would update the database)
      console.log("Updated tenant:", { ...selectedTenant, ...editFormData });

      toast({
        title: "Tenant Updated Successfully",
        description: `${editFormData.name || selectedTenant.name} has been updated.`,
      });

      setShowEditDialog(false);
      setSelectedTenant(null);
      setEditFormData({});
    } catch (error) {
      toast({
        title: "Update Failed",
        description:
          "There was an error updating the tenant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedTenant) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Remove tenant from data (in real app, this would delete from database)
      console.log("Deleted tenant:", selectedTenant.id);

      toast({
        title: "Tenant Deleted",
        description: `${selectedTenant.name} has been permanently deleted.`,
      });

      setShowDeleteDialog(false);
      setSelectedTenant(null);
    } catch (error) {
      toast({
        title: "Delete Failed",
        description:
          "There was an error deleting the tenant. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Statistics for the overview cards
  const stats = {
    total: mockTenantsList.length,
    active: mockTenantsList.filter((t) => t.status === "active").length,
    trial: mockTenantsList.filter((t) => t.status === "trial").length,
    suspended: mockTenantsList.filter((t) => t.status === "suspended").length,
    totalRevenue: mockTenantsList.reduce(
      (sum, t) => sum + t.usage.currentMonth.billingAmount,
      0,
    ),
    totalUsers: mockTenantsList.reduce(
      (sum, t) => sum + t.usage.currentMonth.users,
      0,
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold gradient-text">
              Tenants Management
            </h1>
            <PulsingDot className="animate-pulse" />
          </div>
          <p className="text-muted-foreground">
            Manage all tenant organizations and their subscriptions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
          >
            <Link to="/register">
              <Plus className="h-4 w-4 mr-2" />
              New Tenant
            </Link>
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={stats.total} />
                </p>
                <p className="text-sm text-muted-foreground">Total Tenants</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={stats.active} />
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={stats.trial} />
                </p>
                <p className="text-sm text-muted-foreground">Trial</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={stats.suspended} />
                </p>
                <p className="text-sm text-muted-foreground">Suspended</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(stats.totalRevenue)}
                </p>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={stats.totalUsers} />
                </p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
          <CardDescription>
            View and manage all tenant organizations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tenants by name, email, or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tenants Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => {
                  const trialDaysLeft = getTrialDaysLeft(tenant);

                  return (
                    <TableRow key={tenant.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {tenant.industry.icon}
                            </span>
                            <div>
                              <p className="font-medium">{tenant.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {tenant.organizationName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{tenant.adminUser.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {tenant.adminUser.email}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            {tenant.adminUser.role === "owner" && (
                              <Crown className="h-3 w-3" />
                            )}
                            {tenant.adminUser.role}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{tenant.industry.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {tenant.industry.category}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="capitalize">
                              {tenant.subscription.planType}
                            </Badge>
                            {tenant.subscription.planType ===
                              "professional" && (
                              <Star className="h-3 w-3 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {tenant.subscription.pricing.basePrice === 0
                              ? "Free"
                              : formatCurrency(
                                  tenant.subscription.pricing.basePrice,
                                )}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge
                            variant={getStatusBadge(tenant.status) as any}
                            className={getStatusColor(tenant.status)}
                          >
                            {tenant.status.toUpperCase()}
                          </Badge>
                          {trialDaysLeft !== null && (
                            <p className="text-xs text-muted-foreground">
                              {trialDaysLeft} days left
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <p className="font-medium">
                            {tenant.usage.currentMonth.users}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            of{" "}
                            {tenant.subscription.limits.maxUsers === -1
                              ? "∞"
                              : tenant.subscription.limits.maxUsers}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatCurrency(
                              tenant.usage.currentMonth.billingAmount,
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            this month
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {new Date(tenant.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewTenant(tenant)}
                            title="View Details"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditTenant(tenant)}
                            title="Edit Tenant"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteTenant(tenant)}
                            title="Delete Tenant"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredTenants.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No tenants found</h3>
              <p className="text-muted-foreground mb-4">
                No tenants match your current filters. Try adjusting your search
                criteria.
              </p>
              <Button asChild>
                <Link to="/register">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Tenant
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Tenant Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Tenant Details - {selectedTenant?.name}
            </DialogTitle>
            <DialogDescription>
              Complete information for {selectedTenant?.organizationName}
            </DialogDescription>
          </DialogHeader>

          {selectedTenant && (
            <div className="space-y-6">
              {/* Organization Overview */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Organization Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Organization Name:
                      </span>
                      <span className="font-medium">{selectedTenant.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Legal Name:</span>
                      <span className="font-medium">
                        {selectedTenant.organizationName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry:</span>
                      <div className="flex items-center gap-2">
                        <span>{selectedTenant.industry.icon}</span>
                        <span className="font-medium">
                          {selectedTenant.industry.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">
                        {selectedTenant.industry.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tenant ID:</span>
                      <span className="font-mono text-sm">
                        {selectedTenant.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="font-medium">
                        {new Date(
                          selectedTenant.createdAt,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge
                        variant={getStatusBadge(selectedTenant.status) as any}
                        className={getStatusColor(selectedTenant.status)}
                      >
                        {selectedTenant.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Administrator Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">
                        {selectedTenant.adminUser.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">
                        {selectedTenant.adminUser.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">
                        {selectedTenant.adminUser.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role:</span>
                      <div className="flex items-center gap-1">
                        {selectedTenant.adminUser.role === "owner" && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                        <Badge variant="secondary">
                          {selectedTenant.adminUser.role.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge
                        variant={
                          selectedTenant.adminUser.isActive
                            ? "default"
                            : "secondary"
                        }
                      >
                        {selectedTenant.adminUser.isActive
                          ? "Active"
                          : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Login:</span>
                      <span className="font-medium">
                        {selectedTenant.adminUser.lastLogin
                          ? new Date(
                              selectedTenant.adminUser.lastLogin,
                            ).toLocaleDateString()
                          : "Never"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Subscription Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Subscription Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-3">
                      <h4 className="font-medium">Plan Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Plan:</span>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">
                              {selectedTenant.subscription.planName}
                            </span>
                            {selectedTenant.subscription.planType ===
                              "professional" && (
                              <Star className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="font-medium capitalize">
                            {selectedTenant.subscription.planType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge
                            variant={
                              selectedTenant.subscription.status === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {selectedTenant.subscription.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Auto Renew:
                          </span>
                          <span className="font-medium">
                            {selectedTenant.subscription.autoRenew
                              ? "Yes"
                              : "No"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Billing</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-medium">
                            {formatCurrency(
                              selectedTenant.subscription.pricing.basePrice,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cycle:</span>
                          <span className="font-medium capitalize">
                            {selectedTenant.billingCycle}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Start Date:
                          </span>
                          <span className="font-medium">
                            {new Date(
                              selectedTenant.subscription.startDate,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            End Date:
                          </span>
                          <span className="font-medium">
                            {new Date(
                              selectedTenant.subscription.endDate,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Limits</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Max Users:
                          </span>
                          <span className="font-medium">
                            {selectedTenant.subscription.limits.maxUsers === -1
                              ? "Unlimited"
                              : selectedTenant.subscription.limits.maxUsers}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Storage:
                          </span>
                          <span className="font-medium">
                            {selectedTenant.subscription.limits.maxStorage}GB
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            API Calls:
                          </span>
                          <span className="font-medium">
                            {selectedTenant.subscription.limits.maxApiCalls ===
                            -1
                              ? "Unlimited"
                              : selectedTenant.subscription.limits.maxApiCalls.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Support:
                          </span>
                          <span className="font-medium capitalize">
                            {selectedTenant.subscription.limits.supportLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-2xl font-bold">
                        {selectedTenant.usage.currentMonth.users}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Active Users
                      </p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <Database className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-2xl font-bold">
                        {selectedTenant.usage.currentMonth.storageUsed}GB
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Storage Used
                      </p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <Activity className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                      <p className="text-2xl font-bold">
                        {selectedTenant.usage.currentMonth.apiCalls.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">API Calls</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <p className="text-2xl font-bold">
                        {formatCurrency(
                          selectedTenant.usage.currentMonth.billingAmount,
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This Month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowViewDialog(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowViewDialog(false);
                    handleEditTenant(selectedTenant);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Tenant
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Tenant Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Tenant - {selectedTenant?.name}
            </DialogTitle>
            <DialogDescription>
              Update comprehensive tenant information and settings
            </DialogDescription>
          </DialogHeader>

          {selectedTenant && (
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <Tabs defaultValue="basic" className="space-y-4">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="statutory">Statutory</TabsTrigger>
                  <TabsTrigger value="banking">Banking</TabsTrigger>
                  <TabsTrigger value="subscription">Subscription</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                {/* Basic Information Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="editName">Organization Name</Label>
                      <Input
                        id="editName"
                        value={editFormData.name || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Organization display name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editLegalName">Legal Name</Label>
                      <Input
                        id="editLegalName"
                        value={editFormData.companyLegalName || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            companyLegalName: e.target.value,
                          }))
                        }
                        placeholder="Legal company name"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Administrator Details</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="editAdminName">Admin Name</Label>
                        <Input
                          id="editAdminName"
                          value={editFormData.adminName || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              adminName: e.target.value,
                            }))
                          }
                          placeholder="Administrator name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editAdminEmail">Admin Email</Label>
                        <Input
                          id="editAdminEmail"
                          type="email"
                          value={editFormData.adminEmail || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              adminEmail: e.target.value,
                            }))
                          }
                          placeholder="admin@company.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editAdminPhone">Admin Phone</Label>
                        <Input
                          id="editAdminPhone"
                          value={editFormData.adminPhone || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              adminPhone: e.target.value,
                            }))
                          }
                          placeholder="+91-9876543210"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editAdminAltPhone">
                          Alternate Phone
                        </Label>
                        <Input
                          id="editAdminAltPhone"
                          value={editFormData.adminAlternatePhone || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              adminAlternatePhone: e.target.value,
                            }))
                          }
                          placeholder="+91-9876543211"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editAdminDesignation">
                          Designation
                        </Label>
                        <Input
                          id="editAdminDesignation"
                          value={editFormData.adminDesignation || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              adminDesignation: e.target.value,
                            }))
                          }
                          placeholder="CEO, MD, Director"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editStatus">Status</Label>
                        <Select
                          value={editFormData.status || selectedTenant.status}
                          onValueChange={(value) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              status: value as any,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="trial">Trial</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Company Details Tab */}
                <TabsContent value="company" className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="editIncorporationDate">
                        Incorporation Date
                      </Label>
                      <Input
                        id="editIncorporationDate"
                        type="date"
                        value={editFormData.incorporationDate || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            incorporationDate: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editCompanyType">Company Type</Label>
                      <Select
                        value={editFormData.companyType || "private_limited"}
                        onValueChange={(value) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            companyType: value as any,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private_limited">
                            Private Limited
                          </SelectItem>
                          <SelectItem value="public_limited">
                            Public Limited
                          </SelectItem>
                          <SelectItem value="llp">LLP</SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                          <SelectItem value="proprietorship">
                            Proprietorship
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editWebsite">Website</Label>
                      <Input
                        id="editWebsite"
                        value={editFormData.website || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            website: e.target.value,
                          }))
                        }
                        placeholder="https://company.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editIndustry">Industry</Label>
                      <Select
                        value={editFormData.industryId || ""}
                        onValueChange={(value) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            industryId: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industryTypes.map((industry) => (
                            <SelectItem key={industry.id} value={industry.id}>
                              {industry.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Address Information</h4>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="editRegisteredAddress">
                          Registered Address
                        </Label>
                        <Textarea
                          id="editRegisteredAddress"
                          value={editFormData.registeredAddress || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              registeredAddress: e.target.value,
                            }))
                          }
                          placeholder="Complete registered address"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editCommunicationAddress">
                          Communication Address
                        </Label>
                        <Textarea
                          id="editCommunicationAddress"
                          value={editFormData.communicationAddress || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              communicationAddress: e.target.value,
                            }))
                          }
                          placeholder="Communication address (if different)"
                          rows={2}
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                          <Label htmlFor="editPincode">Pincode</Label>
                          <Input
                            id="editPincode"
                            value={editFormData.pincode || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                pincode: e.target.value,
                              }))
                            }
                            placeholder="110001"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="editCity">City</Label>
                          <Input
                            id="editCity"
                            value={editFormData.city || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                city: e.target.value,
                              }))
                            }
                            placeholder="New Delhi"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="editState">State</Label>
                          <Input
                            id="editState"
                            value={editFormData.state || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                state: e.target.value,
                              }))
                            }
                            placeholder="Delhi"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="editCountry">Country</Label>
                          <Input
                            id="editCountry"
                            value={editFormData.country || "India"}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                country: e.target.value,
                              }))
                            }
                            placeholder="India"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editBusinessDescription">
                      Business Description
                    </Label>
                    <Textarea
                      id="editBusinessDescription"
                      value={editFormData.businessDescription || ""}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          businessDescription: e.target.value,
                        }))
                      }
                      placeholder="Describe your business activities..."
                      rows={3}
                    />
                  </div>
                </TabsContent>

                {/* Statutory Details Tab */}
                <TabsContent value="statutory" className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="editPanNumber">PAN Number</Label>
                      <Input
                        id="editPanNumber"
                        value={editFormData.panNumber || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            panNumber: e.target.value,
                          }))
                        }
                        placeholder="ABCTY1234D"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editGstNumber">GST Number</Label>
                      <Input
                        id="editGstNumber"
                        value={editFormData.gstNumber || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            gstNumber: e.target.value,
                          }))
                        }
                        placeholder="07ABCTY1234D1ZX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editCinNumber">CIN Number</Label>
                      <Input
                        id="editCinNumber"
                        value={editFormData.cinNumber || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            cinNumber: e.target.value,
                          }))
                        }
                        placeholder="U74900DL2020PTC123456"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editTanNumber">TAN Number</Label>
                      <Input
                        id="editTanNumber"
                        value={editFormData.tanNumber || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            tanNumber: e.target.value,
                          }))
                        }
                        placeholder="DELX12345Y"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editUdyamNumber">
                        Udyam Number (MSME)
                      </Label>
                      <Input
                        id="editUdyamNumber"
                        value={editFormData.udyamNumber || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            udyamNumber: e.target.value,
                          }))
                        }
                        placeholder="UDYAM-DL-06-1234567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editIecCode">IEC Code</Label>
                      <Input
                        id="editIecCode"
                        value={editFormData.iecCode || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            iecCode: e.target.value,
                          }))
                        }
                        placeholder="1234567890"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Industry Specific Licenses</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="editReraNumber">RERA Number</Label>
                        <Input
                          id="editReraNumber"
                          value={editFormData.reraNumber || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              reraNumber: e.target.value,
                            }))
                          }
                          placeholder="DL/2020/ABC/1234"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editFssaiNumber">FSSAI Number</Label>
                        <Input
                          id="editFssaiNumber"
                          value={editFormData.fssaiNumber || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              fssaiNumber: e.target.value,
                            }))
                          }
                          placeholder="12345678901234"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editSebiRegNumber">
                          SEBI Registration
                        </Label>
                        <Input
                          id="editSebiRegNumber"
                          value={editFormData.sebiRegNumber || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              sebiRegNumber: e.target.value,
                            }))
                          }
                          placeholder="INB123456789"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editDrugLicenseNumber">
                          Drug License
                        </Label>
                        <Input
                          id="editDrugLicenseNumber"
                          value={editFormData.drugLicenseNumber || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              drugLicenseNumber: e.target.value,
                            }))
                          }
                          placeholder="DL-1234567890"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Banking Details Tab */}
                <TabsContent value="banking" className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Bank Account Details</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="editBankName">Bank Name</Label>
                        <Input
                          id="editBankName"
                          value={editFormData.bankName || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              bankName: e.target.value,
                            }))
                          }
                          placeholder="HDFC Bank"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editAccountNumber">
                          Account Number
                        </Label>
                        <Input
                          id="editAccountNumber"
                          value={editFormData.accountNumber || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              accountNumber: e.target.value,
                            }))
                          }
                          placeholder="50100123456789"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editIfscCode">IFSC Code</Label>
                        <Input
                          id="editIfscCode"
                          value={editFormData.ifscCode || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              ifscCode: e.target.value,
                            }))
                          }
                          placeholder="HDFC0001234"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editBranchName">Branch Name</Label>
                        <Input
                          id="editBranchName"
                          value={editFormData.branchName || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              branchName: e.target.value,
                            }))
                          }
                          placeholder="Connaught Place"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="editAccountType">Account Type</Label>
                        <Select
                          value={editFormData.accountType || "current"}
                          onValueChange={(value) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              accountType: value as any,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="current">Current</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                            <SelectItem value="cc">Cash Credit</SelectItem>
                            <SelectItem value="od">Overdraft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Subscription Details Tab */}
                <TabsContent value="subscription" className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="editPlanId">Subscription Plan</Label>
                      <Select
                        value={editFormData.planId || ""}
                        onValueChange={(value) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            planId: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select plan" />
                        </SelectTrigger>
                        <SelectContent>
                          {subscriptionPlans.map((plan) => (
                            <SelectItem key={plan.id} value={plan.id}>
                              {plan.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editBillingCycle">Billing Cycle</Label>
                      <Select
                        value={editFormData.billingCycle || "yearly"}
                        onValueChange={(value) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            billingCycle: value as any,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select billing cycle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Selected Modules</h4>
                    <div className="grid gap-2 md:grid-cols-3">
                      {editFormData.selectedModules?.map((module) => (
                        <div
                          key={module}
                          className="flex items-center space-x-2"
                        >
                          <Badge variant="secondary">{module}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="editFunctionalCurrency">
                        Functional Currency
                      </Label>
                      <Select
                        value={editFormData.functionalCurrency || "INR"}
                        onValueChange={(value) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            functionalCurrency: value as any,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">
                            INR - Indian Rupee
                          </SelectItem>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">
                            GBP - British Pound
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editDateFormat">Date Format</Label>
                      <Select
                        value={editFormData.dateFormat || "DD/MM/YYYY"}
                        onValueChange={(value) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            dateFormat: value as any,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editTimeFormat">Time Format</Label>
                      <Select
                        value={editFormData.timeFormat || "24"}
                        onValueChange={(value) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            timeFormat: value as any,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12 Hour</SelectItem>
                          <SelectItem value="24">24 Hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editFinancialYearStart">
                        Financial Year Start
                      </Label>
                      <Input
                        id="editFinancialYearStart"
                        value={editFormData.financialYearStart || "04-01"}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            financialYearStart: e.target.value,
                          }))
                        }
                        placeholder="MM-DD"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editTimezone">Timezone</Label>
                      <Input
                        id="editTimezone"
                        value={editFormData.timezone || "Asia/Kolkata"}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            timezone: e.target.value,
                          }))
                        }
                        placeholder="Asia/Kolkata"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTenant} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              Delete Tenant
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{selectedTenant?.name}</strong>?
                </p>
                <p className="text-sm text-red-600">
                  This action cannot be undone. All data associated with this
                  tenant will be permanently deleted, including:
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Organization and user data</li>
                  <li>Subscription and billing history</li>
                  <li>Usage statistics and reports</li>
                  <li>All uploaded documents and files</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
