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
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  Play,
  Pause,
  RefreshCw,
  FileText,
  IndianRupee,
  Calendar,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";

const processingStats = [
  {
    label: "Total Employees",
    value: 384,
    change: "Active employees",
    icon: Users,
    color: "text-blue-600",
  },
  {
    label: "Processed",
    value: 342,
    change: "89% complete",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "In Progress",
    value: 28,
    change: "Being calculated",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    label: "Errors",
    value: 14,
    change: "Need attention",
    icon: AlertTriangle,
    color: "text-red-600",
  },
];

const payrollRuns = [
  {
    id: 1,
    month: "January 2024",
    status: "in-progress",
    employees: 384,
    processed: 342,
    grossAmount: 8750000,
    deductions: 1245000,
    netAmount: 7505000,
    startedBy: "HR Admin",
    startDate: "2024-01-25",
    estimatedCompletion: "2024-01-30",
  },
  {
    id: 2,
    month: "December 2023",
    status: "completed",
    employees: 384,
    processed: 384,
    grossAmount: 8650000,
    deductions: 1198000,
    netAmount: 7452000,
    startedBy: "HR Admin",
    startDate: "2023-12-25",
    completedDate: "2023-12-28",
  },
  {
    id: 3,
    month: "November 2023",
    status: "completed",
    employees: 378,
    processed: 378,
    grossAmount: 8420000,
    deductions: 1165000,
    netAmount: 7255000,
    startedBy: "HR Admin",
    startDate: "2023-11-25",
    completedDate: "2023-11-27",
  },
];

const processingSteps = [
  {
    step: 1,
    title: "Data Validation",
    description: "Validate employee master data and attendance",
    status: "completed",
    duration: "15 minutes",
    issues: 0,
  },
  {
    step: 2,
    title: "Basic Salary Calculation",
    description: "Calculate basic pay, HRA, and allowances",
    status: "completed",
    duration: "25 minutes",
    issues: 0,
  },
  {
    step: 3,
    title: "Statutory Deductions",
    description: "Calculate PF, ESI, and Professional Tax",
    status: "in-progress",
    duration: "20 minutes",
    issues: 2,
  },
  {
    step: 4,
    title: "Income Tax Calculation",
    description: "Compute TDS based on IT slabs and exemptions",
    status: "pending",
    duration: "30 minutes",
    issues: 0,
  },
  {
    step: 5,
    title: "Net Salary Computation",
    description: "Final net salary after all deductions",
    status: "pending",
    duration: "10 minutes",
    issues: 0,
  },
  {
    step: 6,
    title: "Report Generation",
    description: "Generate payroll reports and summaries",
    status: "pending",
    duration: "15 minutes",
    issues: 0,
  },
];

const processingErrors = [
  {
    employeeId: "EMP001",
    employeeName: "Sarah Mitchell",
    department: "Engineering",
    error: "Missing PAN number for TDS calculation",
    severity: "high",
    suggestion: "Update employee master data with PAN",
  },
  {
    employeeId: "EMP015",
    employeeName: "Raj Kumar",
    department: "Operations",
    error: "Attendance data incomplete for salary calculation",
    severity: "medium",
    suggestion: "Verify attendance records for the month",
  },
  {
    employeeId: "EMP042",
    employeeName: "Priya Sharma",
    department: "Sales",
    error: "ESI ceiling exceeded - manual verification needed",
    severity: "low",
    suggestion: "Check if employee is eligible for ESI deduction",
  },
  {
    employeeId: "EMP078",
    employeeName: "Kumar Singh",
    department: "Quality",
    error: "Bank account details missing for salary transfer",
    severity: "high",
    suggestion: "Update bank account information",
  },
];

const salaryBreakdown = [
  {
    component: "Basic Salary",
    amount: 3200000,
    percentage: 36.6,
    description: "Basic pay for all employees",
  },
  {
    component: "House Rent Allowance (HRA)",
    amount: 1600000,
    percentage: 18.3,
    description: "Housing allowance based on basic pay",
  },
  {
    component: "Dearness Allowance (DA)",
    amount: 960000,
    percentage: 11.0,
    description: "Cost of living adjustment",
  },
  {
    component: "Conveyance Allowance",
    amount: 460800,
    percentage: 5.3,
    description: "Transportation allowance",
  },
  {
    component: "Medical Allowance",
    amount: 384000,
    percentage: 4.4,
    description: "Medical expense reimbursement",
  },
  {
    component: "Special Allowance",
    amount: 2145200,
    percentage: 24.5,
    description: "Other allowances and benefits",
  },
];

const deductionBreakdown = [
  {
    component: "Provident Fund (Employee)",
    amount: 525000,
    percentage: 42.2,
    description: "Employee PF contribution @ 12%",
  },
  {
    component: "Employee State Insurance",
    amount: 156750,
    percentage: 12.6,
    description: "ESI contribution @ 0.75%",
  },
  {
    component: "Tax Deducted at Source",
    amount: 468000,
    percentage: 37.6,
    description: "Income tax deduction",
  },
  {
    component: "Professional Tax",
    amount: 76800,
    percentage: 6.2,
    description: "State professional tax",
  },
  {
    component: "Other Deductions",
    amount: 18450,
    percentage: 1.5,
    description: "Loan EMI, advances, etc.",
  },
];

export default function PayrollProcessing() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-emerald-600 bg-emerald-600/10";
      case "in-progress":
        return "text-blue-600 bg-blue-600/10";
      case "pending":
        return "text-yellow-600 bg-yellow-600/10";
      case "failed":
        return "text-red-600 bg-red-600/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-600/10";
      case "medium":
        return "text-yellow-600 bg-yellow-600/10";
      case "low":
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
                Payroll Processing & Calculation
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Calculator}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Automated Indian payroll processing with tax compliance
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
              Export Summary
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Play} animation="bounce" className="mr-2" />
              Start Processing
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Processing Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processingStats.map((stat, index) => (
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

        {/* Current Processing Status */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Play}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Processing Steps - January 2024</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hover-lift">
                  <AnimatedIcon
                    icon={Pause}
                    animation="bounce"
                    className="mr-2"
                  />
                  Pause
                </Button>
                <Button variant="outline" size="sm" className="hover-lift">
                  <AnimatedIcon
                    icon={RefreshCw}
                    animation="pulse"
                    className="mr-2"
                  />
                  Restart
                </Button>
              </div>
            </div>
            <CardDescription>
              Current payroll processing status and timeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processingSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="flex items-center gap-4 p-4 border rounded-lg animate-slideInLeft"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.status === "completed"
                          ? "bg-emerald-600 text-white"
                          : step.status === "in-progress"
                            ? "bg-blue-600 text-white"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : step.status === "in-progress" ? (
                        <Clock className="w-4 h-4" />
                      ) : (
                        step.step
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{step.title}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(step.status)}`}
                      >
                        {step.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-muted-foreground">
                        Duration: {step.duration}
                      </span>
                      {step.issues > 0 && (
                        <span className="text-red-600 font-medium">
                          {step.issues} issue{step.issues > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payroll History & Error Management */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Calendar}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Payroll Run History</CardTitle>
              </div>
              <CardDescription>
                Previous payroll processing runs and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payrollRuns.map((run, index) => (
                  <div
                    key={run.id}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{run.month}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(run.status)}`}
                      >
                        {run.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">Employees</p>
                        <p className="font-medium">
                          {run.processed}/{run.employees}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Net Amount</p>
                        <p className="font-medium text-emerald-600">
                          {formatCurrency(run.netAmount)}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>Started: {run.startDate}</p>
                      <p>
                        {run.status === "completed"
                          ? `Completed: ${run.completedDate}`
                          : `Est. Completion: ${run.estimatedCompletion}`}
                      </p>
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
                <CardTitle>Processing Errors</CardTitle>
              </div>
              <CardDescription>
                Issues requiring attention before processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {processingErrors.map((error, index) => (
                  <div
                    key={error.employeeId}
                    className="p-3 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">
                          {error.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {error.employeeId} • {error.department}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getSeverityColor(error.severity)}`}
                      >
                        {error.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-red-600 mb-2">{error.error}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Suggestion:</span>{" "}
                      {error.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Salary & Deduction Breakdown */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={IndianRupee}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Salary Components Breakdown</CardTitle>
              </div>
              <CardDescription>
                Gross salary component distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salaryBreakdown.map((component, index) => (
                  <div
                    key={component.component}
                    className="space-y-2 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {component.component}
                      </span>
                      <div className="text-right">
                        <span className="text-sm font-bold text-emerald-600">
                          {formatCurrency(component.amount)}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({component.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-emerald-600"
                        style={{ width: `${component.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {component.description}
                    </p>
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
                <CardTitle>Deduction Breakdown</CardTitle>
              </div>
              <CardDescription>
                Statutory and other deductions distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deductionBreakdown.map((deduction, index) => (
                  <div
                    key={deduction.component}
                    className="space-y-2 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {deduction.component}
                      </span>
                      <div className="text-right">
                        <span className="text-sm font-bold text-red-600">
                          {formatCurrency(deduction.amount)}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({deduction.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-red-600"
                        style={{ width: `${deduction.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {deduction.description}
                    </p>
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
                icon={Calculator}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common payroll processing tasks and controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Play} animation="bounce" className="mr-2" />
                Start Processing
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Eye} animation="pulse" className="mr-2" />
                View Details
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={AlertTriangle}
                  animation="float"
                  className="mr-2"
                />
                Resolve Errors
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
