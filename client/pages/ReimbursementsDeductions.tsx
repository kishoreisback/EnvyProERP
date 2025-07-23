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
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  DollarSign,
  Receipt,
  Car,
  Heart,
  GraduationCap,
  Smartphone,
  Home,
  Plane,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  IndianRupee,
  FileText,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

const adjustmentStats = [
  {
    label: "Pending Claims",
    value: 45,
    change: "₹2.8L total amount",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    label: "Approved This Month",
    value: 126,
    change: "₹8.4L reimbursed",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Active Deductions",
    value: 89,
    change: "Loan EMIs & advances",
    icon: CreditCard,
    color: "text-blue-600",
  },
  {
    label: "Tax Savings",
    value: 520000,
    change: "Through reimbursements",
    icon: IndianRupee,
    color: "text-construction-500",
    isCurrency: true,
  },
];

const reimbursementCategories = [
  {
    id: 1,
    category: "Medical Reimbursement",
    description: "Medical expenses and health insurance claims",
    icon: Heart,
    maxLimit: 15000,
    taxExempt: true,
    frequency: "As needed",
    currentClaims: 23,
    pendingAmount: 185000,
    approvedAmount: 645000,
    avgProcessingTime: "3-5 days",
    documents: ["Medical bills", "Prescription", "Doctor certificate"],
  },
  {
    id: 2,
    category: "Travel & Conveyance",
    description: "Business travel and daily conveyance expenses",
    icon: Car,
    maxLimit: 19200,
    taxExempt: true,
    frequency: "Monthly",
    currentClaims: 67,
    pendingAmount: 425000,
    approvedAmount: 1250000,
    avgProcessingTime: "2-4 days",
    documents: ["Travel bills", "Boarding passes", "Hotel receipts"],
  },
  {
    id: 3,
    category: "Telephone/Internet",
    description: "Mobile phone and internet reimbursement",
    icon: Smartphone,
    maxLimit: 3000,
    taxExempt: false,
    frequency: "Monthly",
    currentClaims: 156,
    pendingAmount: 98000,
    approvedAmount: 380000,
    avgProcessingTime: "1-2 days",
    documents: ["Phone bills", "Internet bills"],
  },
  {
    id: 4,
    category: "Education/Training",
    description: "Professional development and training costs",
    icon: GraduationCap,
    maxLimit: 50000,
    taxExempt: true,
    frequency: "Quarterly",
    currentClaims: 12,
    pendingAmount: 145000,
    approvedAmount: 285000,
    avgProcessingTime: "5-7 days",
    documents: ["Course certificates", "Fee receipts", "Approval letter"],
  },
  {
    id: 5,
    category: "Leave Travel Allowance",
    description: "Family vacation travel expenses",
    icon: Plane,
    maxLimit: 100000,
    taxExempt: true,
    frequency: "Annual",
    currentClaims: 8,
    pendingAmount: 320000,
    approvedAmount: 580000,
    avgProcessingTime: "7-10 days",
    documents: ["Travel tickets", "Hotel bills", "Travel itinerary"],
  },
  {
    id: 6,
    category: "House Rent Allowance",
    description: "Rental receipts and agreements",
    icon: Home,
    maxLimit: "40% of Basic",
    taxExempt: true,
    frequency: "Monthly",
    currentClaims: 245,
    pendingAmount: 1250000,
    approvedAmount: 3850000,
    avgProcessingTime: "2-3 days",
    documents: ["Rent receipts", "Rental agreement", "Landlord PAN"],
  },
];

const activeDeductions = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "Sarah Mitchell",
    department: "Engineering",
    type: "Home Loan EMI",
    amount: 35000,
    startDate: "2023-01-01",
    endDate: "2043-12-31",
    remainingMonths: 156,
    totalDeducted: 385000,
    status: "active",
    priority: "high",
  },
  {
    id: 2,
    employeeId: "EMP015",
    employeeName: "Raj Kumar",
    department: "Operations",
    type: "Personal Loan EMI",
    amount: 12500,
    startDate: "2023-06-01",
    endDate: "2026-05-31",
    remainingMonths: 28,
    totalDeducted: 100000,
    status: "active",
    priority: "medium",
  },
  {
    id: 3,
    employeeId: "EMP042",
    employeeName: "Priya Sharma",
    department: "Sales",
    type: "Salary Advance Recovery",
    amount: 8000,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    remainingMonths: 5,
    totalDeducted: 8000,
    status: "active",
    priority: "low",
  },
  {
    id: 4,
    employeeId: "EMP078",
    employeeName: "Kumar Singh",
    department: "Quality",
    type: "Vehicle Loan EMI",
    amount: 18000,
    startDate: "2022-09-01",
    endDate: "2027-08-31",
    remainingMonths: 43,
    totalDeducted: 270000,
    status: "active",
    priority: "medium",
  },
];

const recentClaims = [
  {
    id: 1,
    employeeId: "EMP025",
    employeeName: "Arun Patel",
    department: "IT",
    category: "Medical",
    amount: 8500,
    submittedDate: "2024-01-28",
    documents: 3,
    status: "approved",
    approver: "HR Manager",
    processedDate: "2024-01-30",
    payrollMonth: "February 2024",
  },
  {
    id: 2,
    employeeId: "EMP089",
    employeeName: "Sneha Reddy",
    department: "Marketing",
    category: "Travel",
    amount: 15200,
    submittedDate: "2024-01-26",
    documents: 5,
    status: "pending",
    approver: "Department Head",
    processedDate: null,
    payrollMonth: "February 2024",
  },
  {
    id: 3,
    employeeId: "EMP156",
    employeeName: "Vikram Singh",
    department: "Sales",
    category: "Training",
    amount: 25000,
    submittedDate: "2024-01-24",
    documents: 4,
    status: "rejected",
    approver: "HR Manager",
    processedDate: "2024-01-29",
    reason: "Training not pre-approved",
  },
  {
    id: 4,
    employeeId: "EMP203",
    employeeName: "Meera Joshi",
    department: "Finance",
    category: "Internet",
    amount: 2400,
    submittedDate: "2024-01-30",
    documents: 2,
    status: "pending",
    approver: "Finance Head",
    processedDate: null,
    payrollMonth: "February 2024",
  },
];

const monthlyTrends = [
  {
    month: "January 2024",
    totalClaims: 234,
    totalAmount: 1580000,
    approvedClaims: 198,
    approvedAmount: 1420000,
    rejectedClaims: 14,
    pendingClaims: 22,
    avgProcessingTime: "3.8 days",
  },
  {
    month: "December 2023",
    totalClaims: 189,
    totalAmount: 1245000,
    approvedClaims: 176,
    approvedAmount: 1180000,
    rejectedClaims: 8,
    pendingClaims: 5,
    avgProcessingTime: "3.2 days",
  },
  {
    month: "November 2023",
    totalClaims: 156,
    totalAmount: 1050000,
    approvedClaims: 145,
    approvedAmount: 980000,
    rejectedClaims: 6,
    pendingClaims: 5,
    avgProcessingTime: "2.9 days",
  },
];

const policyLimits = [
  {
    category: "Medical Reimbursement",
    annualLimit: 15000,
    monthlyLimit: "No limit",
    taxExempt: true,
    carryForward: false,
    approvalRequired: "Above ₹5,000",
  },
  {
    category: "Conveyance Allowance",
    annualLimit: 19200,
    monthlyLimit: 1600,
    taxExempt: true,
    carryForward: false,
    approvalRequired: "Manager approval",
  },
  {
    category: "LTA (Leave Travel)",
    annualLimit: 100000,
    monthlyLimit: "As per journey",
    taxExempt: true,
    carryForward: true,
    approvalRequired: "HR & Manager",
  },
  {
    category: "Education Allowance",
    annualLimit: 50000,
    monthlyLimit: "No monthly limit",
    taxExempt: true,
    carryForward: false,
    approvalRequired: "Department Head",
  },
];

export default function ReimbursementsDeductions() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "active":
        return "text-emerald-600 bg-emerald-600/10";
      case "pending":
        return "text-yellow-600 bg-yellow-600/10";
      case "rejected":
      case "inactive":
        return "text-red-600 bg-red-600/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-600/10";
      case "medium":
        return "text-yellow-600 bg-yellow-600/10";
      case "low":
        return "text-green-600 bg-green-600/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="animate-slideInDown">
          <Button variant="ghost" size="sm" asChild className="hover-lift">
            <Link to="/hrms/payroll">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Payroll Management
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Reimbursements & Deductions
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={DollarSign}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Expense reimbursements and salary deductions management
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
              Export Claims
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              New Claim
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {adjustmentStats.map((stat, index) => (
            <Card
              key={index}
              className="hover-lift animate-fadeInUp relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <AnimatedIcon
                    icon={stat.icon}
                    animation="float"
                    className={stat.color}
                  />
                </div>
                <div className="text-2xl font-bold">
                  {stat.isCurrency ? "₹" : ""}
                  <AnimatedCounter value={stat.value} />
                  {stat.isCurrency && stat.value >= 100000 ? (
                    <span className="text-sm ml-1">L</span>
                  ) : null}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reimbursement Categories */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Receipt}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Reimbursement Categories</CardTitle>
            </div>
            <CardDescription>
              Indian tax-exempt reimbursement categories and limits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reimbursementCategories.map((category, index) => (
                <Card
                  key={category.id}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <AnimatedIcon
                            icon={category.icon}
                            animation="bounce"
                            className="text-primary"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">
                            {category.category}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground">Max Limit</p>
                          <p className="font-medium text-emerald-600">
                            {typeof category.maxLimit === "number"
                              ? formatCurrency(category.maxLimit)
                              : category.maxLimit}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tax Status</p>
                          <p
                            className={`font-medium ${
                              category.taxExempt
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {category.taxExempt ? "Exempt" : "Taxable"}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground">
                            Current Claims
                          </p>
                          <p className="font-medium text-blue-600">
                            {category.currentClaims}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Pending Amount
                          </p>
                          <p className="font-medium text-yellow-600">
                            {formatCurrency(category.pendingAmount)}
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium">Processing:</span>{" "}
                          {category.avgProcessingTime}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {category.documents.slice(0, 2).map((doc, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {doc}
                            </Badge>
                          ))}
                          {category.documents.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{category.documents.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Deductions & Recent Claims */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={CreditCard}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Active Deductions</CardTitle>
              </div>
              <CardDescription>
                Ongoing salary deductions and EMI schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activeDeductions.map((deduction, index) => (
                  <div
                    key={deduction.id}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">
                          {deduction.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {deduction.employeeId} • {deduction.department}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getPriorityColor(deduction.priority)}`}
                      >
                        {deduction.priority}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{deduction.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Monthly EMI:
                        </span>
                        <span className="font-medium text-red-600">
                          {formatCurrency(deduction.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Remaining:
                        </span>
                        <span className="font-medium">
                          {deduction.remainingMonths} months
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Paid:
                        </span>
                        <span className="font-medium text-blue-600">
                          {formatCurrency(deduction.totalDeducted)}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs mt-2 ${getStatusColor(deduction.status)}`}
                    >
                      {deduction.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slideInRight">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={FileText}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Recent Claims</CardTitle>
              </div>
              <CardDescription>
                Latest reimbursement claims and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentClaims.map((claim, index) => (
                  <div
                    key={claim.id}
                    className="p-3 border rounded-lg animate-scaleIn hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">
                          {claim.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {claim.employeeId} • {claim.department}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(claim.status)}`}
                      >
                        {claim.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium">{claim.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium text-emerald-600">
                          {formatCurrency(claim.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Submitted:
                        </span>
                        <span className="font-medium">
                          {claim.submittedDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Documents:
                        </span>
                        <span className="font-medium">{claim.documents}</span>
                      </div>
                      {claim.status === "rejected" && claim.reason && (
                        <div className="pt-1 border-t">
                          <p className="text-xs text-red-600">{claim.reason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends & Policy Limits */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={TrendingUp}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Monthly Trends</CardTitle>
              </div>
              <CardDescription>
                Reimbursement claim trends and processing metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrends.map((trend, index) => (
                  <div
                    key={trend.month}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{trend.month}</h4>
                      <Badge variant="outline" className="text-xs">
                        {trend.avgProcessingTime}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs mb-2">
                      <div className="text-center">
                        <p className="text-muted-foreground">Total</p>
                        <p className="font-medium text-blue-600">
                          {trend.totalClaims}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Approved</p>
                        <p className="font-medium text-emerald-600">
                          {trend.approvedClaims}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Pending</p>
                        <p className="font-medium text-yellow-600">
                          {trend.pendingClaims}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Total Amount:
                      </span>
                      <span className="font-medium text-emerald-600">
                        {formatCurrency(trend.totalAmount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Approval Rate:
                      </span>
                      <span className="font-medium">
                        {(
                          (trend.approvedClaims / trend.totalClaims) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slideInRight">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={AlertTriangle}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Policy Limits & Rules</CardTitle>
              </div>
              <CardDescription>
                Reimbursement limits and approval requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policyLimits.map((policy, index) => (
                  <div
                    key={policy.category}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{policy.category}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          policy.taxExempt
                            ? "text-emerald-600 bg-emerald-600/10"
                            : "text-red-600 bg-red-600/10"
                        }`}
                      >
                        {policy.taxExempt ? "Tax Exempt" : "Taxable"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">Annual Limit</p>
                        <p className="font-medium text-blue-600">
                          {typeof policy.annualLimit === "number"
                            ? formatCurrency(policy.annualLimit)
                            : policy.annualLimit}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Monthly Limit</p>
                        <p className="font-medium">{policy.monthlyLimit}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Carry Forward</p>
                        <p
                          className={`font-medium ${
                            policy.carryForward
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {policy.carryForward ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Approval</p>
                        <p className="font-medium">{policy.approvalRequired}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={DollarSign}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common reimbursement and deduction management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                Submit Claim
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={CheckCircle}
                  animation="pulse"
                  className="mr-2"
                />
                Approve Claims
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={CreditCard}
                  animation="float"
                  className="mr-2"
                />
                Setup Deduction
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Download}
                  animation="glow"
                  className="mr-2"
                />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
