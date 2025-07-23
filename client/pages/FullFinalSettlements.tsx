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
  CheckCircle,
  XCircle,
  Clock,
  Calculator,
  FileText,
  Users,
  IndianRupee,
  Calendar,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  Banknote,
  CreditCard,
  AlertTriangle,
  UserMinus,
  Receipt,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const settlementStats = [
  {
    label: "Pending Settlements",
    value: 8,
    change: "₹12.5L total amount",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    label: "Completed This Month",
    value: 15,
    change: "₹28.9L disbursed",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Average Settlement",
    value: 185000,
    change: "Per employee",
    icon: IndianRupee,
    color: "text-blue-600",
    isCurrency: true,
  },
  {
    label: "Processing Time",
    value: 7,
    change: "Average days",
    icon: Calendar,
    color: "text-construction-500",
  },
];

const pendingSettlements = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "Sarah Mitchell",
    department: "Engineering",
    designation: "Senior Software Engineer",
    joiningDate: "2020-03-15",
    resignationDate: "2024-01-15",
    lastWorkingDay: "2024-02-14",
    serviceYears: 3.9,
    basicSalary: 75000,
    grossSalary: 125000,
    noticePeriod: 30,
    status: "pending",
    components: {
      gratuity: 145833,
      leaveEncashment: 62500,
      noticePayRecovery: 0,
      loanDeductions: 0,
      otherDeductions: 2500,
      totalPayable: 205833,
    },
  },
  {
    id: 2,
    employeeId: "EMP025",
    employeeName: "Raj Kumar",
    department: "Operations",
    designation: "Operations Manager",
    joiningDate: "2018-07-20",
    resignationDate: "2024-01-20",
    lastWorkingDay: "2024-02-19",
    serviceYears: 5.5,
    basicSalary: 85000,
    grossSalary: 145000,
    noticePeriod: 60,
    status: "calculating",
    components: {
      gratuity: 244583,
      leaveEncashment: 85000,
      noticePayRecovery: 0,
      loanDeductions: 25000,
      otherDeductions: 1500,
      totalPayable: 303083,
    },
  },
  {
    id: 3,
    employeeId: "EMP056",
    employeeName: "Priya Sharma",
    department: "Sales",
    designation: "Sales Executive",
    joiningDate: "2019-11-10",
    resignationDate: "2024-01-25",
    lastWorkingDay: "2024-02-24",
    serviceYears: 4.2,
    basicSalary: 45000,
    grossSalary: 75000,
    noticePeriod: 30,
    status: "approved",
    components: {
      gratuity: 98750,
      leaveEncashment: 37500,
      noticePayRecovery: 0,
      loanDeductions: 8000,
      otherDeductions: 500,
      totalPayable: 127750,
    },
  },
];

const settlementComponents = [
  {
    component: "Gratuity Payment",
    description: "As per Payment of Gratuity Act, 1972",
    calculation: "15 days salary for each year of service",
    eligibility: "Minimum 5 years of service",
    maxLimit: "₹20 lakhs",
    taxImplication: "Exempt up to statutory limit",
    formula: "(Basic + DA) × 15 × Service Years ÷ 26",
    currentCases: 6,
    totalAmount: 980000,
  },
  {
    component: "Leave Encashment",
    description: "Encashment of accumulated leave balance",
    calculation: "Per day salary × Leave days",
    eligibility: "All employees",
    maxLimit: "300 days maximum",
    taxImplication: "Taxable as salary",
    formula: "Daily salary × Accumulated leave days",
    currentCases: 8,
    totalAmount: 450000,
  },
  {
    component: "Notice Period Recovery",
    description: "Recovery for notice period shortfall",
    calculation: "Gross salary for notice shortfall days",
    eligibility: "If notice not served",
    maxLimit: "As per employment contract",
    taxImplication: "Deduction from settlement",
    formula: "Daily gross salary × Notice shortfall days",
    currentCases: 2,
    totalAmount: 85000,
  },
  {
    component: "Loan & Advance Recovery",
    description: "Outstanding loan and advance amounts",
    calculation: "Outstanding principal + interest",
    eligibility: "If any loans/advances outstanding",
    maxLimit: "Total outstanding amount",
    taxImplication: "Recovery from settlement",
    formula: "Outstanding loan + Advance balance",
    currentCases: 3,
    totalAmount: 125000,
  },
];

const recentSettlements = [
  {
    id: 4,
    employeeId: "EMP078",
    employeeName: "Kumar Singh",
    department: "Quality",
    serviceYears: 6.2,
    totalPayable: 285000,
    processedDate: "2024-01-30",
    disbursedDate: "2024-02-01",
    paymentMode: "Bank Transfer",
    status: "completed",
    processingDays: 8,
  },
  {
    id: 5,
    employeeId: "EMP092",
    employeeName: "Arun Patel",
    department: "IT",
    serviceYears: 3.8,
    totalPayable: 156000,
    processedDate: "2024-01-28",
    disbursedDate: "2024-01-30",
    paymentMode: "Cheque",
    status: "completed",
    processingDays: 6,
  },
  {
    id: 6,
    employeeId: "EMP134",
    employeeName: "Sneha Reddy",
    department: "Marketing",
    serviceYears: 2.5,
    totalPayable: 89000,
    processedDate: "2024-01-25",
    disbursedDate: "2024-01-27",
    paymentMode: "Bank Transfer",
    status: "completed",
    processingDays: 5,
  },
];

const exitChecklist = [
  {
    department: "HR Department",
    tasks: [
      { task: "Exit interview completion", status: "pending", mandatory: true },
      {
        task: "Final settlement calculation",
        status: "completed",
        mandatory: true,
      },
      { task: "Experience certificate", status: "pending", mandatory: false },
      { task: "Service certificate", status: "pending", mandatory: false },
    ],
  },
  {
    department: "IT Department",
    tasks: [
      { task: "Laptop/equipment return", status: "completed", mandatory: true },
      { task: "Access card surrender", status: "completed", mandatory: true },
      {
        task: "Email account deactivation",
        status: "pending",
        mandatory: true,
      },
      { task: "System access revocation", status: "pending", mandatory: true },
    ],
  },
  {
    department: "Finance Department",
    tasks: [
      {
        task: "Loan clearance certificate",
        status: "completed",
        mandatory: true,
      },
      { task: "Expense claim settlement", status: "pending", mandatory: false },
      { task: "PF transfer process", status: "pending", mandatory: true },
      { task: "Gratuity calculation", status: "completed", mandatory: true },
    ],
  },
  {
    department: "Admin Department",
    tasks: [
      { task: "Office key return", status: "completed", mandatory: true },
      { task: "Library book return", status: "completed", mandatory: false },
      {
        task: "Medical insurance cessation",
        status: "pending",
        mandatory: true,
      },
      {
        task: "Vehicle sticker removal",
        status: "completed",
        mandatory: false,
      },
    ],
  },
];

const taxImplications = [
  {
    component: "Gratuity",
    exemptLimit: "₹20,00,000",
    taxablePortion: "Excess over exempt limit",
    taxRate: "As per income tax slab",
    tdsApplicable: "If total > ₹5,000",
    calculation: "Min of (Actual, Statutory limit, 15/26 formula)",
  },
  {
    component: "Leave Encashment",
    exemptLimit: "₹3,00,000",
    taxablePortion: "Excess over ₹3 lakhs",
    taxRate: "As per income tax slab",
    tdsApplicable: "If total > ₹5,000",
    calculation: "Average salary of last 10 months × leave days",
  },
  {
    component: "Salary in Lieu of Notice",
    exemptLimit: "No exemption",
    taxablePortion: "Full amount",
    taxRate: "As per income tax slab",
    tdsApplicable: "If total > ₹5,000",
    calculation: "Basic salary + allowances for notice period",
  },
  {
    component: "Accumulated PF",
    exemptLimit: "If service > 5 years",
    taxablePortion: "Interest on own contribution",
    taxRate: "10% TDS if no PAN",
    tdsApplicable: "As per PF rules",
    calculation: "Employee + Employer contribution + Interest",
  },
];

export default function FullFinalSettlements() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
        return "text-emerald-600 bg-emerald-600/10";
      case "pending":
      case "calculating":
        return "text-yellow-600 bg-yellow-600/10";
      case "rejected":
      case "on-hold":
        return "text-red-600 bg-red-600/10";
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

  const calculateServiceYears = (
    joiningDate: string,
    lastWorkingDay: string,
  ) => {
    const start = new Date(joiningDate);
    const end = new Date(lastWorkingDay);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    return diffYears.toFixed(1);
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
                Full & Final Settlements
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={CheckCircle}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Employee exit settlement calculations and processing
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
              New Settlement
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {settlementStats.map((stat, index) => (
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

        {/* Pending Settlements */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={UserMinus}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Pending Settlement Cases</CardTitle>
            </div>
            <CardDescription>
              Employee exit settlements awaiting processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingSettlements.map((settlement, index) => (
                <Card
                  key={settlement.id}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      {/* Employee Details */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">
                            {settlement.employeeName}
                          </h4>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getStatusColor(settlement.status)}`}
                          >
                            {settlement.status}
                          </Badge>
                        </div>
                        <div className="text-xs space-y-1">
                          <p className="text-muted-foreground">
                            {settlement.employeeId} • {settlement.department}
                          </p>
                          <p className="text-muted-foreground">
                            {settlement.designation}
                          </p>
                          <p>
                            <span className="text-muted-foreground">
                              Service:
                            </span>{" "}
                            {settlement.serviceYears} years
                          </p>
                          <p>
                            <span className="text-muted-foreground">
                              Last Working:
                            </span>{" "}
                            {settlement.lastWorkingDay}
                          </p>
                        </div>
                      </div>

                      {/* Settlement Components */}
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm text-emerald-600">
                          Settlement Components
                        </h5>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Gratuity:
                            </span>
                            <span className="font-medium text-emerald-600">
                              {formatCurrency(settlement.components.gratuity)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Leave Encashment:
                            </span>
                            <span className="font-medium text-blue-600">
                              {formatCurrency(
                                settlement.components.leaveEncashment,
                              )}
                            </span>
                          </div>
                          {settlement.components.loanDeductions > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Loan Recovery:
                              </span>
                              <span className="font-medium text-red-600">
                                -
                                {formatCurrency(
                                  settlement.components.loanDeductions,
                                )}
                              </span>
                            </div>
                          )}
                          {settlement.components.otherDeductions > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Other Deductions:
                              </span>
                              <span className="font-medium text-red-600">
                                -
                                {formatCurrency(
                                  settlement.components.otherDeductions,
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Total Settlement */}
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm text-construction-600">
                          Settlement Summary
                        </h5>
                        <div className="p-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">
                              Total Payable
                            </p>
                            <p className="text-lg font-bold text-emerald-600">
                              {formatCurrency(
                                settlement.components.totalPayable,
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Basic Salary:
                            </span>
                            <span className="font-medium">
                              {formatCurrency(settlement.basicSalary)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Notice Period:
                            </span>
                            <span className="font-medium">
                              {settlement.noticePeriod} days
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            <AnimatedIcon icon={Eye} className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" className="text-xs">
                            <AnimatedIcon
                              icon={CheckCircle}
                              className="h-3 w-3 mr-1"
                            />
                            Process
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settlement Components & Exit Checklist */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Calculator}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Settlement Components</CardTitle>
              </div>
              <CardDescription>
                Calculation methods for settlement components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {settlementComponents.map((component, index) => (
                  <div
                    key={component.component}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">
                        {component.component}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {component.currentCases} cases
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {component.description}
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-muted-foreground">Calculation</p>
                          <p className="font-medium">{component.calculation}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Amount</p>
                          <p className="font-medium text-emerald-600">
                            {formatCurrency(component.totalAmount)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Formula</p>
                        <p className="font-mono text-xs bg-muted/50 p-1 rounded">
                          {component.formula}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Eligibility</p>
                        <p className="font-medium">{component.eligibility}</p>
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
                  icon={FileText}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Exit Clearance Checklist</CardTitle>
              </div>
              <CardDescription>
                Department-wise clearance requirements for employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {exitChecklist.map((dept, index) => (
                  <div
                    key={dept.department}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h4 className="font-medium text-sm mb-2">
                      {dept.department}
                    </h4>
                    <div className="space-y-2">
                      {dept.tasks.map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="flex items-center justify-between p-2 rounded border"
                        >
                          <span className="text-xs flex items-center gap-2">
                            {task.status === "completed" ? (
                              <CheckCircle className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <Clock className="h-3 w-3 text-yellow-600" />
                            )}
                            {task.task}
                          </span>
                          <div className="flex items-center gap-2">
                            {task.mandatory && (
                              <Badge
                                variant="outline"
                                className="text-xs text-red-600"
                              >
                                Required
                              </Badge>
                            )}
                            <Badge
                              variant="outline"
                              className={`text-xs ${getStatusColor(task.status)}`}
                            >
                              {task.status}
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
        </div>

        {/* Recent Settlements & Tax Implications */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Receipt}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Recent Settlements</CardTitle>
              </div>
              <CardDescription>
                Recently processed and disbursed settlements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSettlements.map((settlement, index) => (
                  <div
                    key={settlement.id}
                    className="p-3 border rounded-lg animate-scaleIn hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">
                          {settlement.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {settlement.employeeId} • {settlement.department}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(settlement.status)}`}
                      >
                        {settlement.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Service Years</p>
                        <p className="font-medium">{settlement.serviceYears}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Amount</p>
                        <p className="font-medium text-emerald-600">
                          {formatCurrency(settlement.totalPayable)}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs mt-2">
                      <div>
                        <p className="text-muted-foreground">Payment Mode</p>
                        <p className="font-medium">{settlement.paymentMode}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Processing Time</p>
                        <p className="font-medium">
                          {settlement.processingDays} days
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Disbursed: {settlement.disbursedDate}
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
                  icon={Target}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Tax Implications</CardTitle>
              </div>
              <CardDescription>
                Tax treatment of settlement components as per Indian IT Act
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {taxImplications.map((tax, index) => (
                  <div
                    key={tax.component}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h4 className="font-medium text-sm mb-2">
                      {tax.component}
                    </h4>
                    <div className="space-y-1 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-muted-foreground">Exempt Limit</p>
                          <p className="font-medium text-emerald-600">
                            {tax.exemptLimit}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">TDS Rate</p>
                          <p className="font-medium text-red-600">
                            {tax.taxRate}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Taxable Portion</p>
                        <p className="font-medium">{tax.taxablePortion}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">TDS Applicable</p>
                        <p className="font-medium">{tax.tdsApplicable}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Calculation</p>
                        <p className="font-mono text-xs bg-muted/50 p-1 rounded">
                          {tax.calculation}
                        </p>
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
                icon={CheckCircle}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common settlement processing and management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                New Settlement
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Calculator}
                  animation="pulse"
                  className="mr-2"
                />
                Calculate Gratuity
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={FileText}
                  animation="float"
                  className="mr-2"
                />
                Exit Checklist
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Download}
                  animation="glow"
                  className="mr-2"
                />
                Settlement Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
