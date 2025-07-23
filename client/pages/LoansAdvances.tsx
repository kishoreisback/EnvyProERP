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
  Home,
  Car,
  GraduationCap,
  Smartphone,
  Heart,
  Calculator,
  Calendar,
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
  AlertTriangle,
  CreditCard,
  Users,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const loanStats = [
  {
    label: "Active Loans",
    value: 89,
    change: "₹2.8Cr outstanding",
    icon: Banknote,
    color: "text-blue-600",
  },
  {
    label: "Pending Applications",
    value: 12,
    change: "₹45L requested",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    label: "This Month EMI",
    value: 1250000,
    change: "Total collections",
    icon: IndianRupee,
    color: "text-emerald-600",
    isCurrency: true,
  },
  {
    label: "Default Rate",
    value: 2.1,
    change: "Industry: 3.5%",
    icon: AlertTriangle,
    color: "text-construction-500",
    isPercentage: true,
  },
];

const loanTypes = [
  {
    id: 1,
    type: "Home Loan",
    description: "Housing loan for purchase/construction of house",
    icon: Home,
    maxAmount: 5000000,
    maxTenure: 240,
    interestRate: 8.5,
    processingFee: 0.5,
    eligibilityMultiple: 60,
    taxBenefit: true,
    activeLoans: 23,
    totalOutstanding: 18500000,
    avgLoanAmount: 3200000,
    defaultRate: 1.2,
  },
  {
    id: 2,
    type: "Personal Loan",
    description: "Unsecured loan for personal financial needs",
    icon: Banknote,
    maxAmount: 1000000,
    maxTenure: 60,
    interestRate: 12.0,
    processingFee: 2.0,
    eligibilityMultiple: 20,
    taxBenefit: false,
    activeLoans: 34,
    totalOutstanding: 8900000,
    avgLoanAmount: 450000,
    defaultRate: 3.5,
  },
  {
    id: 3,
    type: "Vehicle Loan",
    description: "Loan for purchase of two-wheeler/four-wheeler",
    icon: Car,
    maxAmount: 2000000,
    maxTenure: 84,
    interestRate: 9.5,
    processingFee: 1.0,
    eligibilityMultiple: 30,
    taxBenefit: false,
    activeLoans: 18,
    totalOutstanding: 4200000,
    avgLoanAmount: 650000,
    defaultRate: 2.8,
  },
  {
    id: 4,
    type: "Education Loan",
    description: "Loan for higher education and professional courses",
    icon: GraduationCap,
    maxAmount: 1500000,
    maxTenure: 120,
    interestRate: 10.5,
    processingFee: 1.0,
    eligibilityMultiple: 25,
    taxBenefit: true,
    activeLoans: 8,
    totalOutstanding: 3200000,
    avgLoanAmount: 850000,
    defaultRate: 1.8,
  },
  {
    id: 5,
    type: "Emergency Loan",
    description: "Quick loan for medical emergencies",
    icon: Heart,
    maxAmount: 500000,
    maxTenure: 36,
    interestRate: 11.0,
    processingFee: 1.5,
    eligibilityMultiple: 15,
    taxBenefit: false,
    activeLoans: 6,
    totalOutstanding: 1200000,
    avgLoanAmount: 180000,
    defaultRate: 0.5,
  },
];

const activeLoanAccounts = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "Sarah Mitchell",
    department: "Engineering",
    loanType: "Home Loan",
    principal: 3500000,
    outstanding: 2850000,
    emi: 35000,
    tenure: 240,
    remainingMonths: 156,
    interestRate: 8.5,
    startDate: "2021-03-15",
    nextDueDate: "2024-02-15",
    status: "current",
    lastPayment: "2024-01-15",
  },
  {
    id: 2,
    employeeId: "EMP015",
    employeeName: "Raj Kumar",
    department: "Operations",
    loanType: "Personal Loan",
    principal: 600000,
    outstanding: 350000,
    emi: 12500,
    tenure: 60,
    remainingMonths: 28,
    interestRate: 12.0,
    startDate: "2022-06-01",
    nextDueDate: "2024-02-01",
    status: "current",
    lastPayment: "2024-01-01",
  },
  {
    id: 3,
    employeeId: "EMP042",
    employeeName: "Priya Sharma",
    department: "Sales",
    loanType: "Vehicle Loan",
    principal: 800000,
    outstanding: 520000,
    emi: 18000,
    tenure: 72,
    remainingMonths: 43,
    interestRate: 9.5,
    startDate: "2021-09-10",
    nextDueDate: "2024-02-10",
    status: "current",
    lastPayment: "2024-01-10",
  },
  {
    id: 4,
    employeeId: "EMP078",
    employeeName: "Kumar Singh",
    department: "Quality",
    loanType: "Education Loan",
    principal: 1200000,
    outstanding: 450000,
    emi: 15000,
    tenure: 120,
    remainingMonths: 36,
    interestRate: 10.5,
    startDate: "2020-01-15",
    nextDueDate: "2024-02-15",
    status: "overdue",
    lastPayment: "2023-12-15",
  },
];

const salaryAdvances = [
  {
    id: 1,
    employeeId: "EMP156",
    employeeName: "Vikram Singh",
    department: "Sales",
    advanceAmount: 50000,
    reason: "Medical emergency",
    requestDate: "2024-01-25",
    approvalDate: "2024-01-26",
    disbursementDate: "2024-01-27",
    recoveryAmount: 10000,
    recoveryMonths: 5,
    recoveredAmount: 10000,
    remainingAmount: 40000,
    status: "active",
    nextRecovery: "2024-02-25",
  },
  {
    id: 2,
    employeeId: "EMP203",
    employeeName: "Meera Joshi",
    department: "Finance",
    advanceAmount: 30000,
    reason: "House shifting expenses",
    requestDate: "2024-01-20",
    approvalDate: "2024-01-21",
    disbursementDate: "2024-01-22",
    recoveryAmount: 6000,
    recoveryMonths: 5,
    recoveredAmount: 6000,
    remainingAmount: 24000,
    status: "active",
    nextRecovery: "2024-02-22",
  },
  {
    id: 3,
    employeeId: "EMP089",
    employeeName: "Sneha Reddy",
    department: "Marketing",
    advanceAmount: 25000,
    reason: "Festival expenses",
    requestDate: "2024-01-15",
    approvalDate: "2024-01-16",
    disbursementDate: "2024-01-17",
    recoveryAmount: 12500,
    recoveryMonths: 2,
    recoveredAmount: 25000,
    remainingAmount: 0,
    status: "completed",
    nextRecovery: "Completed",
  },
];

const eligibilityCriteria = [
  {
    loanType: "Home Loan",
    minService: "24 months",
    maxAmount: "60x monthly salary",
    maxTenure: "20 years",
    guarantor: "Not required",
    documents: [
      "Salary certificate",
      "Property documents",
      "Bank statements",
      "Income tax returns",
    ],
  },
  {
    loanType: "Personal Loan",
    minService: "12 months",
    maxAmount: "20x monthly salary",
    maxTenure: "5 years",
    guarantor: "Required if >₹5L",
    documents: [
      "Salary certificate",
      "Bank statements",
      "Identity proof",
      "Address proof",
    ],
  },
  {
    loanType: "Vehicle Loan",
    minService: "6 months",
    maxAmount: "30x monthly salary",
    maxTenure: "7 years",
    guarantor: "Vehicle as collateral",
    documents: [
      "Salary certificate",
      "Vehicle quotation",
      "Insurance documents",
      "Registration papers",
    ],
  },
  {
    loanType: "Education Loan",
    minService: "12 months",
    maxAmount: "25x monthly salary",
    maxTenure: "10 years",
    guarantor: "Parent/spouse",
    documents: [
      "Admission letter",
      "Fee structure",
      "Academic records",
      "Income proof",
    ],
  },
];

const repaymentSchedule = [
  {
    month: "February 2024",
    totalEmi: 1250000,
    principal: 850000,
    interest: 400000,
    employees: 89,
    collections: 1210000,
    pending: 40000,
    overdueAccounts: 3,
  },
  {
    month: "January 2024",
    totalEmi: 1235000,
    principal: 840000,
    interest: 395000,
    employees: 91,
    collections: 1235000,
    pending: 0,
    overdueAccounts: 0,
  },
  {
    month: "December 2023",
    totalEmi: 1198000,
    principal: 815000,
    interest: 383000,
    employees: 88,
    collections: 1198000,
    pending: 0,
    overdueAccounts: 1,
  },
];

export default function LoansAdvances() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
      case "active":
      case "completed":
        return "text-emerald-600 bg-emerald-600/10";
      case "overdue":
        return "text-red-600 bg-red-600/10";
      case "pending":
        return "text-yellow-600 bg-yellow-600/10";
      case "approved":
        return "text-blue-600 bg-blue-600/10";
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

  const calculateLoanProgress = (principal: number, outstanding: number) => {
    return ((principal - outstanding) / principal) * 100;
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
                Loans & Advances
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
                Employee loans and salary advance management system
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
              New Application
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {loanStats.map((stat, index) => (
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
                  {stat.isPercentage ? "%" : ""}
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

        {/* Loan Types */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Target}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Loan Types & Schemes</CardTitle>
            </div>
            <CardDescription>
              Available employee loan products and their features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loanTypes.slice(0, 6).map((loan, index) => (
                <Card
                  key={loan.id}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <AnimatedIcon
                            icon={loan.icon}
                            animation="bounce"
                            className="text-primary"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{loan.type}</h4>
                          <p className="text-xs text-muted-foreground">
                            {loan.description}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground">Max Amount</p>
                          <p className="font-medium text-emerald-600">
                            {formatCurrency(loan.maxAmount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Interest Rate</p>
                          <p className="font-medium text-blue-600">
                            {loan.interestRate}% p.a.
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground">Max Tenure</p>
                          <p className="font-medium">{loan.maxTenure} months</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Active Loans</p>
                          <p className="font-medium text-construction-600">
                            {loan.activeLoans}
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Outstanding:
                          </span>
                          <span className="font-medium">
                            {formatCurrency(loan.totalOutstanding)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {loan.taxBenefit && (
                            <Badge
                              variant="outline"
                              className="text-xs text-emerald-600"
                            >
                              Tax Benefit
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              loan.defaultRate < 2
                                ? "text-emerald-600"
                                : loan.defaultRate < 4
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {loan.defaultRate}% default
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

        {/* Active Loans & Salary Advances */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={CreditCard}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Active Loan Accounts</CardTitle>
              </div>
              <CardDescription>
                Current loan accounts and repayment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activeLoanAccounts.map((loan, index) => (
                  <div
                    key={loan.id}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">
                          {loan.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {loan.employeeId} • {loan.department}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(loan.status)}`}
                      >
                        {loan.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Loan Type:
                        </span>
                        <span className="font-medium">{loan.loanType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Outstanding:
                        </span>
                        <span className="font-medium text-red-600">
                          {formatCurrency(loan.outstanding)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Monthly EMI:
                        </span>
                        <span className="font-medium text-blue-600">
                          {formatCurrency(loan.emi)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Remaining:
                        </span>
                        <span className="font-medium">
                          {loan.remainingMonths} months
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>
                          {calculateLoanProgress(
                            loan.principal,
                            loan.outstanding,
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-emerald-600"
                          style={{
                            width: `${calculateLoanProgress(loan.principal, loan.outstanding)}%`,
                          }}
                        />
                      </div>
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
                  icon={IndianRupee}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Salary Advances</CardTitle>
              </div>
              <CardDescription>
                Employee salary advances and recovery schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {salaryAdvances.map((advance, index) => (
                  <div
                    key={advance.id}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">
                          {advance.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {advance.employeeId} • {advance.department}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(advance.status)}`}
                      >
                        {advance.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Advance Amount:
                        </span>
                        <span className="font-medium text-blue-600">
                          {formatCurrency(advance.advanceAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reason:</span>
                        <span className="font-medium">{advance.reason}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Monthly Recovery:
                        </span>
                        <span className="font-medium text-red-600">
                          {formatCurrency(advance.recoveryAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Remaining:
                        </span>
                        <span className="font-medium text-orange-600">
                          {formatCurrency(advance.remainingAmount)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs">
                      <div className="flex justify-between mb-1">
                        <span>Recovery Progress</span>
                        <span>
                          {(
                            ((advance.advanceAmount - advance.remainingAmount) /
                              advance.advanceAmount) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-construction-600"
                          style={{
                            width: `${
                              ((advance.advanceAmount -
                                advance.remainingAmount) /
                                advance.advanceAmount) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Eligibility Criteria & Repayment Schedule */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={FileText}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Eligibility Criteria</CardTitle>
              </div>
              <CardDescription>
                Loan eligibility requirements and documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {eligibilityCriteria.map((criteria, index) => (
                  <div
                    key={criteria.loanType}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h4 className="font-medium text-sm mb-2">
                      {criteria.loanType}
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">Min Service</p>
                        <p className="font-medium">{criteria.minService}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Max Amount</p>
                        <p className="font-medium text-emerald-600">
                          {criteria.maxAmount}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">Max Tenure</p>
                        <p className="font-medium">{criteria.maxTenure}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Guarantor</p>
                        <p className="font-medium">{criteria.guarantor}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1">
                        Required Documents:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {criteria.documents.slice(0, 2).map((doc, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {doc}
                          </Badge>
                        ))}
                        {criteria.documents.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{criteria.documents.length - 2}
                          </Badge>
                        )}
                      </div>
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
                  icon={Calendar}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Monthly Repayment Schedule</CardTitle>
              </div>
              <CardDescription>
                EMI collection schedule and payment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {repaymentSchedule.map((schedule, index) => (
                  <div
                    key={schedule.month}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{schedule.month}</h4>
                      <Badge variant="outline" className="text-xs">
                        {schedule.employees} accounts
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">Total EMI</p>
                        <p className="font-medium text-blue-600">
                          {formatCurrency(schedule.totalEmi)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Collections</p>
                        <p className="font-medium text-emerald-600">
                          {formatCurrency(schedule.collections)}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">Principal</p>
                        <p className="font-medium">
                          {formatCurrency(schedule.principal)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Interest</p>
                        <p className="font-medium">
                          {formatCurrency(schedule.interest)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Collection Rate:
                      </span>
                      <span
                        className={`font-medium ${
                          (schedule.collections / schedule.totalEmi) * 100 >= 95
                            ? "text-emerald-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {(
                          (schedule.collections / schedule.totalEmi) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    {schedule.overdueAccounts > 0 && (
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-muted-foreground">
                          Overdue Accounts:
                        </span>
                        <span className="font-medium text-red-600">
                          {schedule.overdueAccounts}
                        </span>
                      </div>
                    )}
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
                icon={Banknote}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common loan and advance management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                New Application
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Calculator}
                  animation="pulse"
                  className="mr-2"
                />
                EMI Calculator
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Calendar}
                  animation="float"
                  className="mr-2"
                />
                Payment Schedule
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Download}
                  animation="glow"
                  className="mr-2"
                />
                Loan Statement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
