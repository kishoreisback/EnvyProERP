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
  Shield,
  FileText,
  Building,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  IndianRupee,
  Clock,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

const complianceStats = [
  {
    label: "PF Compliance",
    value: 100,
    change: "All employees covered",
    icon: Shield,
    color: "text-emerald-600",
    isPercentage: true,
  },
  {
    label: "ESI Coverage",
    value: 67,
    change: "256 of 384 employees",
    icon: Building,
    color: "text-blue-600",
    isPercentage: true,
  },
  {
    label: "TDS Filings",
    value: 12,
    change: "Monthly returns filed",
    icon: FileText,
    color: "text-construction-500",
  },
  {
    label: "Outstanding Amount",
    value: 0,
    change: "All payments current",
    icon: IndianRupee,
    color: "text-purple-600",
    isCurrency: true,
  },
];

const statutoryComponents = [
  {
    name: "Provident Fund (PF)",
    description: "Employee Provident Fund Organization compliance",
    employeeRate: 12,
    employerRate: 12,
    ceiling: 15000,
    applicableEmployees: 384,
    currentContribution: 1050000,
    status: "compliant",
    lastFiled: "2024-01-15",
    nextDue: "2024-02-15",
    penalties: 0,
    regulations: [
      "EPF & MP Act, 1952",
      "EPF Scheme, 1952",
      "EPS Scheme, 1995",
      "EDLI Scheme, 1976",
    ],
  },
  {
    name: "Employee State Insurance (ESI)",
    description: "Medical care and cash benefits for employees",
    employeeRate: 0.75,
    employerRate: 3.25,
    ceiling: 21000,
    applicableEmployees: 256,
    currentContribution: 195000,
    status: "compliant",
    lastFiled: "2024-01-21",
    nextDue: "2024-02-21",
    penalties: 0,
    regulations: [
      "ESI Act, 1948",
      "ESI (General) Regulations, 1950",
      "ESI (Medical Care & Benefits) Regulations, 1991",
    ],
  },
  {
    name: "Tax Deducted at Source (TDS)",
    description: "Income tax deduction from employee salaries",
    employeeRate: "As per IT slabs",
    employerRate: 0,
    ceiling: "No ceiling",
    applicableEmployees: 298,
    currentContribution: 780000,
    status: "compliant",
    lastFiled: "2024-01-07",
    nextDue: "2024-02-07",
    penalties: 0,
    regulations: [
      "Income Tax Act, 1961",
      "Section 192 - Salary Income",
      "Form 24Q - Quarterly Return",
      "Form 16 - TDS Certificate",
    ],
  },
  {
    name: "Professional Tax",
    description: "State-wise professional tax deductions",
    employeeRate: "State specific",
    employerRate: 0,
    ceiling: 2500,
    applicableEmployees: 384,
    currentContribution: 76800,
    status: "compliant",
    lastFiled: "2024-01-31",
    nextDue: "2024-02-28",
    penalties: 0,
    regulations: [
      "State Professional Tax Acts",
      "Maharashtra: ₹200/month",
      "Karnataka: ₹200/month",
      "West Bengal: ₹110-300/month",
    ],
  },
];

const statewiseCompliance = [
  {
    state: "Maharashtra",
    employees: 156,
    professionalTax: 31200,
    rate: "₹200/month",
    laborWelfareFund: true,
    shopEstablishment: "Required",
    contractLabor: "Applicable",
    lastFiled: "2024-01-31",
  },
  {
    state: "Karnataka",
    employees: 124,
    professionalTax: 24800,
    rate: "₹200/month",
    laborWelfareFund: false,
    shopEstablishment: "Required",
    contractLabor: "Applicable",
    lastFiled: "2024-01-31",
  },
  {
    state: "Delhi",
    employees: 89,
    professionalTax: 0,
    rate: "Nil",
    laborWelfareFund: true,
    shopEstablishment: "Required",
    contractLabor: "Not Applicable",
    lastFiled: "2024-01-31",
  },
  {
    state: "Tamil Nadu",
    employees: 15,
    professionalTax: 3000,
    rate: "₹200/month",
    laborWelfareFund: true,
    shopEstablishment: "Required",
    contractLabor: "Applicable",
    lastFiled: "2024-01-31",
  },
];

const upcomingFilings = [
  {
    form: "PF Monthly Return (ECR)",
    dueDate: "2024-02-15",
    frequency: "Monthly",
    applicableEmployees: 384,
    amount: 2100000,
    status: "pending",
    daysLeft: 12,
    penalty: "₹5,000 + 25% interest",
  },
  {
    form: "ESI Monthly Return",
    dueDate: "2024-02-21",
    frequency: "Monthly",
    applicableEmployees: 256,
    amount: 682500,
    status: "pending",
    daysLeft: 18,
    penalty: "₹25,000 + interest",
  },
  {
    form: "TDS Return (Form 24Q)",
    dueDate: "2024-04-30",
    frequency: "Quarterly",
    applicableEmployees: 298,
    amount: 2340000,
    status: "draft",
    daysLeft: 87,
    penalty: "₹100/day + 1.5% interest",
  },
  {
    form: "Professional Tax Return",
    dueDate: "2024-02-28",
    frequency: "Monthly",
    applicableEmployees: 384,
    amount: 76800,
    status: "pending",
    daysLeft: 25,
    penalty: "₹100/day",
  },
];

const auditTrail = [
  {
    date: "2024-01-30",
    action: "PF Return Filed",
    form: "ECR for January 2024",
    amount: 2100000,
    filedBy: "HR Admin",
    reference: "PF240130001",
    status: "success",
  },
  {
    date: "2024-01-28",
    action: "ESI Contribution Paid",
    form: "Monthly ESI Payment",
    amount: 682500,
    filedBy: "Finance Team",
    reference: "ESI240128001",
    status: "success",
  },
  {
    date: "2024-01-25",
    action: "TDS Challan Generated",
    form: "Form 281 - TDS Payment",
    amount: 780000,
    filedBy: "HR Admin",
    reference: "TDS240125001",
    status: "success",
  },
  {
    date: "2024-01-15",
    action: "Professional Tax Filed",
    form: "Maharashtra PT Return",
    amount: 31200,
    filedBy: "Compliance Officer",
    reference: "PT240115001",
    status: "success",
  },
];

const complianceChecklist = [
  {
    category: "Provident Fund",
    checks: [
      { item: "PF registration current", status: "compliant", mandatory: true },
      { item: "Monthly ECR filing", status: "compliant", mandatory: true },
      {
        item: "Employee nominations updated",
        status: "pending",
        mandatory: false,
      },
      { item: "Wage ceiling compliance", status: "compliant", mandatory: true },
    ],
  },
  {
    category: "Employee State Insurance",
    checks: [
      { item: "ESI registration active", status: "compliant", mandatory: true },
      { item: "Monthly returns filed", status: "compliant", mandatory: true },
      {
        item: "Medical facilities provided",
        status: "compliant",
        mandatory: false,
      },
      {
        item: "Contribution ceiling check",
        status: "compliant",
        mandatory: true,
      },
    ],
  },
  {
    category: "Income Tax",
    checks: [
      { item: "TAN registration valid", status: "compliant", mandatory: true },
      { item: "Quarterly TDS returns", status: "compliant", mandatory: true },
      {
        item: "Form 16 issued to employees",
        status: "pending",
        mandatory: true,
      },
      {
        item: "TCS compliance (if applicable)",
        status: "not-applicable",
        mandatory: false,
      },
    ],
  },
  {
    category: "Labour Laws",
    checks: [
      {
        item: "Shop & Establishment license",
        status: "compliant",
        mandatory: true,
      },
      {
        item: "Contract Labour Act compliance",
        status: "compliant",
        mandatory: true,
      },
      {
        item: "Minimum Wages Act compliance",
        status: "compliant",
        mandatory: true,
      },
      { item: "Payment of Wages Act", status: "compliant", mandatory: true },
    ],
  },
];

export default function StatutoryCompliance() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
      case "success":
        return "text-emerald-600 bg-emerald-600/10";
      case "pending":
      case "draft":
        return "text-yellow-600 bg-yellow-600/10";
      case "overdue":
      case "failed":
        return "text-red-600 bg-red-600/10";
      case "not-applicable":
        return "text-muted-foreground bg-muted/10";
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

  const getDaysLeftColor = (days: number) => {
    if (days <= 7) return "text-red-600";
    if (days <= 15) return "text-yellow-600";
    return "text-emerald-600";
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
                Statutory Compliance
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Shield}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Indian statutory compliance - PF, ESI, TDS, and Professional Tax
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
              <AnimatedIcon icon={Send} animation="bounce" className="mr-2" />
              File Returns
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {complianceStats.map((stat, index) => (
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
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statutory Components */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Shield}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Statutory Components Overview</CardTitle>
            </div>
            <CardDescription>
              Indian statutory deductions and employer contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {statutoryComponents.map((component, index) => (
                <Card
                  key={component.name}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">
                          {component.name}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(component.status)}`}
                        >
                          {component.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {component.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground">Employee Rate</p>
                          <p className="font-medium text-red-600">
                            {component.employeeRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Employer Rate</p>
                          <p className="font-medium text-blue-600">
                            {component.employerRate}%
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground">Ceiling</p>
                          <p className="font-medium">
                            {typeof component.ceiling === "number"
                              ? formatCurrency(component.ceiling)
                              : component.ceiling}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Employees</p>
                          <p className="font-medium">
                            {component.applicableEmployees}
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Current Month:
                          </span>
                          <span className="text-sm font-medium text-emerald-600">
                            {formatCurrency(component.currentContribution)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">
                            Next Due:
                          </span>
                          <span className="text-xs font-medium text-orange-600">
                            {component.nextDue}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Filings & State-wise Compliance */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Calendar}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Upcoming Filings</CardTitle>
              </div>
              <CardDescription>
                Statutory returns and payment due dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingFilings.map((filing, index) => (
                  <div
                    key={filing.form}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{filing.form}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(filing.status)}`}
                      >
                        {filing.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">Due Date</p>
                        <p className="font-medium">{filing.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium text-emerald-600">
                          {formatCurrency(filing.amount)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {filing.applicableEmployees} employees
                      </span>
                      <span
                        className={`font-medium ${getDaysLeftColor(filing.daysLeft)}`}
                      >
                        {filing.daysLeft} days left
                      </span>
                    </div>
                    <div className="mt-2 text-xs">
                      <span className="text-muted-foreground">Penalty: </span>
                      <span className="text-red-600">{filing.penalty}</span>
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
                  icon={Building}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>State-wise Compliance</CardTitle>
              </div>
              <CardDescription>
                Professional tax and labor law compliance by state
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statewiseCompliance.map((state, index) => (
                  <div
                    key={state.state}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{state.state}</h4>
                      <Badge variant="outline" className="text-xs">
                        {state.employees} employees
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">
                          Professional Tax
                        </p>
                        <p className="font-medium text-blue-600">
                          {state.professionalTax > 0
                            ? formatCurrency(state.professionalTax)
                            : "Nil"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rate</p>
                        <p className="font-medium">{state.rate}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span>Labor Welfare Fund:</span>
                        <span
                          className={
                            state.laborWelfareFund
                              ? "text-emerald-600"
                              : "text-red-600"
                          }
                        >
                          {state.laborWelfareFund ? "Required" : "Not Required"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Shop Establishment:</span>
                        <span className="text-emerald-600">
                          {state.shopEstablishment}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Last Filed:</span>
                        <span className="font-medium">{state.lastFiled}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Checklist */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={CheckCircle}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Compliance Checklist</CardTitle>
            </div>
            <CardDescription>
              Comprehensive statutory compliance verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {complianceChecklist.map((category, index) => (
                <div
                  key={category.category}
                  className="p-4 border rounded-lg animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h4 className="font-medium text-sm mb-3">
                    {category.category}
                  </h4>
                  <div className="space-y-2">
                    {category.checks.map((check, checkIndex) => (
                      <div
                        key={checkIndex}
                        className="flex items-center justify-between p-2 rounded border"
                      >
                        <span className="text-xs">{check.item}</span>
                        <div className="flex items-center gap-2">
                          {check.mandatory && (
                            <Badge
                              variant="outline"
                              className="text-xs text-red-600"
                            >
                              Required
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className={`text-xs ${getStatusColor(check.status)}`}
                          >
                            {check.status}
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

        {/* Audit Trail */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={FileText}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Recent Filings & Audit Trail</CardTitle>
            </div>
            <CardDescription>
              Recent statutory filing activities and compliance actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditTrail.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{entry.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.form}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">
                        Filed by: {entry.filedBy}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">
                        Ref: {entry.reference}
                      </span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-medium text-sm">
                      {formatCurrency(entry.amount)}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(entry.status)}`}
                    >
                      {entry.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {entry.date}
                    </p>
                  </div>
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
                icon={Shield}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common statutory compliance tasks and filings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Send} animation="bounce" className="mr-2" />
                File PF Return
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={FileText}
                  animation="pulse"
                  className="mr-2"
                />
                Generate Form 16
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Download}
                  animation="float"
                  className="mr-2"
                />
                TDS Certificates
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={CheckCircle}
                  animation="glow"
                  className="mr-2"
                />
                Compliance Check
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
