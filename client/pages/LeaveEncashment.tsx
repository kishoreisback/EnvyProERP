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
  Banknote,
  DollarSign,
  Calculator,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  User,
  Building,
  Calendar,
  AlertTriangle,
  CreditCard,
  Receipt,
} from "lucide-react";
import { Link } from "react-router-dom";

const encashmentStats = [
  {
    label: "Pending Requests",
    value: 8,
    change: "Awaiting approval",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    label: "Approved Amount",
    value: 245000,
    change: "This quarter",
    icon: CheckCircle,
    color: "text-emerald-600",
    isCurrency: true,
  },
  {
    label: "Average Encashment",
    value: 18500,
    change: "Per employee",
    icon: Calculator,
    color: "text-blue-600",
    isCurrency: true,
  },
  {
    label: "Total Requests",
    value: 24,
    change: "This year",
    icon: FileText,
    color: "text-construction-500",
  },
];

const encashmentRequests = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    employeeId: "EMP001",
    department: "Engineering",
    requestDate: "2024-01-10",
    leaveType: "Annual Leave",
    daysToEncash: 5,
    eligibleDays: 17,
    ratePerDay: 2400,
    grossAmount: 12000,
    taxDeduction: 1440,
    netAmount: 10560,
    status: "pending",
    approver: "David Park",
    reason: "Financial requirement for home renovation",
    payrollMonth: "January 2024",
  },
  {
    id: 2,
    employee: "David Park",
    employeeId: "EMP002",
    department: "Operations",
    requestDate: "2024-01-08",
    leaveType: "Annual Leave",
    daysToEncash: 3,
    eligibleDays: 13,
    ratePerDay: 2800,
    grossAmount: 8400,
    taxDeduction: 1008,
    netAmount: 7392,
    status: "approved",
    approver: "James Wilson",
    reason: "Personal financial planning",
    payrollMonth: "January 2024",
  },
  {
    id: 3,
    employee: "Maria Rodriguez",
    employeeId: "EMP003",
    department: "Sales",
    requestDate: "2024-01-12",
    leaveType: "Annual Leave",
    daysToEncash: 8,
    eligibleDays: 14,
    ratePerDay: 2200,
    grossAmount: 17600,
    taxDeduction: 2112,
    netAmount: 15488,
    status: "pending",
    approver: "James Wilson",
    reason: "Education expenses for children",
    payrollMonth: "January 2024",
  },
  {
    id: 4,
    employee: "James Wilson",
    employeeId: "EMP004",
    department: "Quality",
    requestDate: "2024-01-05",
    leaveType: "Annual Leave",
    daysToEncash: 4,
    eligibleDays: 10,
    ratePerDay: 3200,
    grossAmount: 12800,
    taxDeduction: 1536,
    netAmount: 11264,
    status: "rejected",
    approver: "Lisa Anderson",
    reason: "Exceeded annual encashment limit",
    payrollMonth: "January 2024",
  },
];

const encashmentRules = [
  {
    rule: "Maximum Encashment",
    description: "Maximum leave days that can be encashed per year",
    value: "15 days",
    applicability: "All employees",
    category: "Limits",
  },
  {
    rule: "Minimum Balance",
    description: "Minimum leave balance to maintain after encashment",
    value: "5 days",
    applicability: "Annual leave only",
    category: "Balance",
  },
  {
    rule: "Encashment Rate",
    description: "Rate calculation based on daily salary",
    value: "1 x daily salary",
    applicability: "All leave types",
    category: "Rate",
  },
  {
    rule: "Tax Deduction",
    description: "Tax deduction on encashed amount",
    value: "12% TDS",
    applicability: "As per tax rules",
    category: "Tax",
  },
  {
    rule: "Processing Time",
    description: "Time taken to process encashment request",
    value: "3-5 business days",
    applicability: "After approval",
    category: "Process",
  },
  {
    rule: "Eligibility Period",
    description: "Minimum service period for encashment eligibility",
    value: "12 months",
    applicability: "All employees",
    category: "Eligibility",
  },
];

const paymentHistory = [
  {
    month: "December 2023",
    totalRequests: 12,
    totalAmount: 156000,
    averageAmount: 13000,
    processingTime: "4.2 days",
    employees: 12,
  },
  {
    month: "November 2023",
    totalRequests: 8,
    totalAmount: 98000,
    averageAmount: 12250,
    processingTime: "3.8 days",
    employees: 8,
  },
  {
    month: "October 2023",
    totalRequests: 15,
    totalAmount: 198000,
    averageAmount: 13200,
    processingTime: "4.5 days",
    employees: 15,
  },
  {
    month: "September 2023",
    totalRequests: 6,
    totalAmount: 72000,
    averageAmount: 12000,
    processingTime: "3.2 days",
    employees: 6,
  },
];

const encashmentTypes = [
  {
    type: "Regular Encashment",
    description: "Standard annual leave encashment",
    eligibleLeave: "Annual Leave",
    maxDays: 15,
    frequency: "Quarterly",
    taxImplication: "12% TDS",
    requests: 18,
  },
  {
    type: "Year-end Encashment",
    description: "End of year balance encashment",
    eligibleLeave: "Annual Leave",
    maxDays: 25,
    frequency: "Annually",
    taxImplication: "As per slab",
    requests: 6,
  },
  {
    type: "Exit Encashment",
    description: "Leave encashment during resignation",
    eligibleLeave: "All unused leave",
    maxDays: "No limit",
    frequency: "One-time",
    taxImplication: "As per policy",
    requests: 0,
  },
];

export default function LeaveEncashment() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-emerald-600 bg-emerald-600/10";
      case "pending":
        return "text-yellow-600 bg-yellow-600/10";
      case "rejected":
        return "text-red-600 bg-red-600/10";
      case "processed":
        return "text-blue-600 bg-blue-600/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return CheckCircle;
      case "pending":
        return Clock;
      case "rejected":
        return XCircle;
      case "processed":
        return CreditCard;
      default:
        return AlertTriangle;
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
            <Link to="/hrms/leave">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Leave Management
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Leave Encashment Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Banknote}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Process leave encashment requests and manage payment workflows
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
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              New Request
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {encashmentStats.map((stat, index) => (
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
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Encashment Requests */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={FileText}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Encashment Requests</CardTitle>
            </div>
            <CardDescription>
              Review and process leave encashment applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Employee
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Request Details
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Leave Info
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Amount Calculation
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {encashmentRequests.map((request, index) => (
                    <tr
                      key={request.id}
                      className="border-b hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-sm">
                            {request.employee}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {request.employeeId} • {request.department}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Applied: {request.requestDate}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">
                            {request.leaveType}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            Reason: {request.reason}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Approver: {request.approver}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium text-emerald-600">
                              {request.daysToEncash}
                            </span>{" "}
                            days to encash
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Eligible: {request.eligibleDays} days
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Rate: ₹{request.ratePerDay}/day
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium">
                              {formatCurrency(request.grossAmount)}
                            </span>
                          </div>
                          <div className="text-xs text-red-600">
                            Tax: -{formatCurrency(request.taxDeduction)}
                          </div>
                          <div className="text-xs font-medium text-emerald-600">
                            Net: {formatCurrency(request.netAmount)}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(request.status)}`}
                        >
                          <AnimatedIcon
                            icon={getStatusIcon(request.status)}
                            className="h-3 w-3 mr-1"
                          />
                          {request.status}
                        </Badge>
                        {request.status === "rejected" && (
                          <p className="text-xs text-red-600 mt-1">
                            {request.reason}
                          </p>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="text-xs">
                            <AnimatedIcon icon={Eye} className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          {request.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs text-emerald-600"
                              >
                                <AnimatedIcon
                                  icon={CheckCircle}
                                  className="h-3 w-3 mr-1"
                                />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs text-red-600"
                              >
                                <AnimatedIcon
                                  icon={XCircle}
                                  className="h-3 w-3 mr-1"
                                />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Encashment Rules & Payment History */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Calculator}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Encashment Rules</CardTitle>
              </div>
              <CardDescription>
                Policy rules and calculations for leave encashment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {encashmentRules.map((rule, index) => (
                  <div
                    key={rule.rule}
                    className="p-3 border rounded-lg animate-scaleIn space-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{rule.rule}</h4>
                      <Badge variant="outline" className="text-xs">
                        {rule.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {rule.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-emerald-600">
                        {rule.value}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {rule.applicability}
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
                  icon={Receipt}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Payment History</CardTitle>
              </div>
              <CardDescription>
                Monthly encashment payment summaries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment, index) => (
                  <div
                    key={payment.month}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{payment.month}</h4>
                      <Badge variant="outline" className="text-xs">
                        {payment.employees} employees
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">Total Requests</p>
                        <p className="font-medium text-blue-600">
                          {payment.totalRequests}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Amount</p>
                        <p className="font-medium text-emerald-600">
                          {formatCurrency(payment.totalAmount)}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Average Amount</p>
                        <p className="font-medium">
                          {formatCurrency(payment.averageAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Processing Time</p>
                        <p className="font-medium">{payment.processingTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Encashment Types */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={DollarSign}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Encashment Types</CardTitle>
            </div>
            <CardDescription>
              Different types of leave encashment options available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {encashmentTypes.map((type, index) => (
                <Card
                  key={type.type}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm">{type.type}</h4>
                        <p className="text-xs text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Eligible Leave:
                          </span>
                          <span className="font-medium">
                            {type.eligibleLeave}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Max Days:
                          </span>
                          <span className="font-medium text-emerald-600">
                            {type.maxDays}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Frequency:
                          </span>
                          <span className="font-medium">{type.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax:</span>
                          <span className="font-medium">
                            {type.taxImplication}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            This Year:
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {type.requests} requests
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Banknote}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common leave encashment management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                New Request
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Calculator}
                  animation="pulse"
                  className="mr-2"
                />
                Calculate Amount
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={CheckCircle}
                  animation="float"
                  className="mr-2"
                />
                Bulk Approve
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={CreditCard}
                  animation="glow"
                  className="mr-2"
                />
                Process Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
