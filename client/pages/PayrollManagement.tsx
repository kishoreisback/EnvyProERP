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
  Calculator,
  IndianRupee,
  FileText,
  Shield,
  CreditCard,
  Building,
  Receipt,
  Banknote,
  Users,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  Settings,
  CheckCircle,
  AlertTriangle,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

const payrollStats = [
  {
    label: "Total Payroll",
    value: 8750000,
    change: "This month",
    icon: IndianRupee,
    color: "text-emerald-600",
    isCurrency: true,
  },
  {
    label: "Employees Processed",
    value: 384,
    change: "100% completion",
    icon: Users,
    color: "text-blue-600",
  },
  {
    label: "Statutory Deductions",
    value: 1245000,
    change: "PF, ESI, TDS combined",
    icon: Shield,
    color: "text-construction-500",
    isCurrency: true,
  },
  {
    label: "Net Disbursement",
    value: 7505000,
    change: "Ready for transfer",
    icon: CreditCard,
    color: "text-purple-600",
    isCurrency: true,
  },
];

const payrollModules = [
  {
    title: "Payroll Configurations",
    description: "Configure payroll components and calculation logic",
    icon: Settings,
    href: "/hrms/payroll/configurations",
    color: "text-indigo-600",
    bgColor: "bg-indigo-600/10",
    features: [
      "Component definition",
      "Logic configuration engine",
      "Global compliance support",
      "Audit & versioning",
    ],
  },
  {
    title: "Payroll Processing & Calculation",
    description: "Automated salary calculation with Indian compliance",
    icon: Calculator,
    href: "/hrms/payroll/processing",
    color: "text-primary",
    bgColor: "bg-primary/10",
    features: [
      "Monthly salary processing",
      "Overtime calculations",
      "Indian tax compliance",
      "Multi-location support",
    ],
  },
  {
    title: "Salary Structures & Components",
    description: "Configure Indian salary components and structures",
    icon: Building,
    href: "/hrms/payroll/structures",
    color: "text-construction-500",
    bgColor: "bg-construction-500/10",
    features: [
      "Basic, HRA, DA components",
      "CTC breakup templates",
      "Grade-wise structures",
      "Allowance configurations",
    ],
  },
  {
    title: "Statutory Compliance",
    description: "PF, ESI, TDS, and Professional Tax compliance",
    icon: Shield,
    href: "/hrms/payroll/compliance",
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    features: [
      "PF & ESI calculations",
      "TDS computation",
      "Professional Tax (by state)",
      "Gratuity provisions",
    ],
  },
  {
    title: "Tax Calculation & Filing",
    description: "Income tax calculations and return filing",
    icon: FileText,
    href: "/hrms/payroll/taxation",
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    features: [
      "Income tax slabs",
      "Form 16 generation",
      "TDS certificates",
      "Annual tax planning",
    ],
  },
  {
    title: "Payslip Generation",
    description: "Digital payslips with statutory compliance",
    icon: Receipt,
    href: "/hrms/payroll/payslips",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    features: [
      "Digital payslip portal",
      "Multi-language support",
      "Email distribution",
      "Statutory disclosures",
    ],
  },
  {
    title: "Reimbursements & Deductions",
    description: "Expense reimbursements and salary deductions",
    icon: DollarSign,
    href: "/hrms/payroll/adjustments",
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    features: [
      "Expense management",
      "Medical reimbursements",
      "Loan deductions",
      "Advance recoveries",
    ],
  },
  {
    title: "Loans & Advances",
    description: "Employee loans and salary advance management",
    icon: Banknote,
    href: "/hrms/payroll/loans",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    features: [
      "Loan eligibility check",
      "EMI calculations",
      "Interest computations",
      "Recovery schedules",
    ],
  },
  {
    title: "Full & Final Settlements",
    description: "Employee exit settlement calculations",
    icon: CheckCircle,
    href: "/hrms/payroll/settlements",
    color: "text-yellow-600",
    bgColor: "bg-yellow-600/10",
    features: [
      "Gratuity calculations",
      "Leave encashment",
      "Loan clearances",
      "Settlement reports",
    ],
  },
  {
    title: "Bank Transfer Integration",
    description: "Direct salary transfer to employee accounts",
    icon: CreditCard,
    href: "/hrms/payroll/banking",
    color: "text-teal-600",
    bgColor: "bg-teal-600/10",
    features: [
      "NEFT/RTGS integration",
      "Bank file generation",
      "Transfer status tracking",
      "Payment confirmations",
    ],
  },
];

const currentPayrollRun = {
  month: "January 2024",
  status: "In Progress",
  totalEmployees: 384,
  processed: 342,
  pending: 42,
  grossPayroll: 8750000,
  deductions: 1245000,
  netPayroll: 7505000,
  lastRun: "2024-01-25",
  nextRun: "2024-02-25",
};

const statutoryCompliance = [
  {
    component: "Provident Fund (PF)",
    rate: "12% (Employee) + 12% (Employer)",
    ceiling: "₹15,000/month",
    status: "Compliant",
    lastFiled: "2024-01-15",
    nextDue: "2024-02-15",
  },
  {
    component: "Employee State Insurance (ESI)",
    rate: "0.75% (Employee) + 3.25% (Employer)",
    ceiling: "₹21,000/month",
    status: "Compliant",
    lastFiled: "2024-01-21",
    nextDue: "2024-02-21",
  },
  {
    component: "Tax Deducted at Source (TDS)",
    rate: "As per IT Act slabs",
    ceiling: "No ceiling",
    status: "Compliant",
    lastFiled: "2024-01-07",
    nextDue: "2024-02-07",
  },
  {
    component: "Professional Tax",
    rate: "₹200/month (Maharashtra)",
    ceiling: "₹2,500/year",
    status: "Compliant",
    lastFiled: "2024-01-31",
    nextDue: "2024-02-28",
  },
];

const recentTransactions = [
  {
    id: 1,
    type: "Salary Transfer",
    amount: 7505000,
    employees: 384,
    status: "Completed",
    date: "2024-01-30",
    reference: "SAL202401001",
  },
  {
    id: 2,
    type: "PF Contribution",
    amount: 1050000,
    employees: 384,
    status: "Completed",
    date: "2024-01-28",
    reference: "PF202401001",
  },
  {
    id: 3,
    type: "ESI Contribution",
    amount: 195000,
    employees: 256,
    status: "Completed",
    date: "2024-01-28",
    reference: "ESI202401001",
  },
  {
    id: 4,
    type: "TDS Deposit",
    amount: 780000,
    employees: 298,
    status: "Pending",
    date: "2024-02-07",
    reference: "TDS202401001",
  },
];

const payrollInsights = [
  {
    metric: "Average CTC",
    value: "₹8.5 LPA",
    change: "+8.2%",
    trend: "up",
    description: "Compared to last year",
  },
  {
    metric: "Statutory Compliance",
    value: "100%",
    change: "0 issues",
    trend: "stable",
    description: "All filings up to date",
  },
  {
    metric: "Processing Time",
    value: "2.3 days",
    change: "-0.5 days",
    trend: "up",
    description: "Automation improvements",
  },
  {
    metric: "Cost per Employee",
    value: "₹145",
    change: "-₹25",
    trend: "up",
    description: "Operational efficiency",
  },
];

export default function PayrollManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant":
      case "Completed":
        return "text-emerald-600 bg-emerald-600/10";
      case "Pending":
        return "text-yellow-600 bg-yellow-600/10";
      case "Overdue":
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

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="animate-slideInDown">
          <Button variant="ghost" size="sm" asChild className="hover-lift">
            <Link to="/hrms">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to HRMS
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Payroll Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={IndianRupee}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Complete Indian payroll processing with statutory compliance
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
              Export Reports
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Run Payroll
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {payrollStats.map((stat, index) => (
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
                    <span className="text-sm ml-1">
                      {stat.value >= 10000000
                        ? "Cr"
                        : stat.value >= 100000
                          ? "L"
                          : "K"}
                    </span>
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

        {/* Current Payroll Run Status */}
        <Card className="animate-fadeInUp bg-gradient-to-r from-primary/5 to-construction-500/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Calendar}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>
                  Current Payroll Run - {currentPayrollRun.month}
                </CardTitle>
              </div>
              <Badge
                variant="outline"
                className="text-yellow-600 bg-yellow-600/10"
              >
                {currentPayrollRun.status}
              </Badge>
            </div>
            <CardDescription>
              Monthly payroll processing status and summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  <AnimatedCounter value={currentPayrollRun.processed} />
                </p>
                <p className="text-sm text-muted-foreground">Processed</p>
                <p className="text-xs text-muted-foreground">
                  of {currentPayrollRun.totalEmployees} employees
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(currentPayrollRun.grossPayroll)}
                </p>
                <p className="text-sm text-muted-foreground">Gross Payroll</p>
                <p className="text-xs text-muted-foreground">Total earnings</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(currentPayrollRun.deductions)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Deductions
                </p>
                <p className="text-xs text-muted-foreground">
                  Statutory + others
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold text-construction-500">
                  {formatCurrency(currentPayrollRun.netPayroll)}
                </p>
                <p className="text-sm text-muted-foreground">Net Payroll</p>
                <p className="text-xs text-muted-foreground">
                  Ready for transfer
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payroll Management Modules */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Settings}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Payroll Management Modules</CardTitle>
            </div>
            <CardDescription>
              Comprehensive payroll processing with Indian statutory compliance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {payrollModules.map((module, index) => (
                <Link key={module.title} to={module.href} className="block">
                  <Card
                    className="hover-lift animate-scaleIn relative overflow-hidden group cursor-pointer h-full"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`absolute inset-0 ${module.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${module.bgColor}`}>
                            <AnimatedIcon
                              icon={module.icon}
                              animation="bounce"
                              className={module.color}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">
                              {module.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {module.description}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {module.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center gap-2 text-xs text-muted-foreground"
                            >
                              <CheckCircle className="h-3 w-3 text-emerald-600" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          className="w-full hover-lift pointer-events-none"
                          variant="outline"
                        >
                          <AnimatedIcon icon={Eye} size="sm" className="mr-2" />
                          Access Module
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statutory Compliance & Recent Transactions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Shield}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Statutory Compliance Status</CardTitle>
              </div>
              <CardDescription>
                Indian statutory compliance and filing status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statutoryCompliance.map((item, index) => (
                  <div
                    key={item.component}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{item.component}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(item.status)}`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rate:</span>
                        <span className="font-medium">{item.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ceiling:</span>
                        <span className="font-medium">{item.ceiling}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Last Filed:
                        </span>
                        <span className="font-medium">{item.lastFiled}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Next Due:</span>
                        <span className="font-medium text-orange-600">
                          {item.nextDue}
                        </span>
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
                  icon={CreditCard}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Recent Transactions</CardTitle>
              </div>
              <CardDescription>
                Latest payroll and statutory payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{transaction.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.employees} employees
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Ref: {transaction.reference}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium text-sm">
                        {formatCurrency(transaction.amount)}
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payroll Insights */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={TrendingUp}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Payroll Insights</CardTitle>
            </div>
            <CardDescription>
              Key performance metrics and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {payrollInsights.map((insight, index) => (
                <div
                  key={insight.metric}
                  className="p-4 border rounded-lg animate-scaleIn text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="text-lg font-bold">{insight.value}</p>
                  <p className="text-sm font-medium">{insight.metric}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <span
                      className={`text-xs font-medium ${
                        insight.trend === "up"
                          ? "text-emerald-600"
                          : insight.trend === "down"
                            ? "text-red-600"
                            : "text-blue-600"
                      }`}
                    >
                      {insight.change}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Calculator}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common payroll management tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/payroll/processing">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Run Payroll
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/payroll/payslips">
                  <AnimatedIcon
                    icon={Receipt}
                    animation="pulse"
                    className="mr-2"
                  />
                  Generate Payslips
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/payroll/compliance">
                  <AnimatedIcon
                    icon={Shield}
                    animation="float"
                    className="mr-2"
                  />
                  Statutory Reports
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/payroll/banking">
                  <AnimatedIcon
                    icon={CreditCard}
                    animation="glow"
                    className="mr-2"
                  />
                  Bank Transfers
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
