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
  FileText,
  IndianRupee,
  Users,
  Calendar,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  Receipt,
  Target,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const taxStats = [
  {
    label: "Total TDS",
    value: 2340000,
    change: "Quarterly deduction",
    icon: IndianRupee,
    color: "text-emerald-600",
    isCurrency: true,
  },
  {
    label: "Taxpayers",
    value: 298,
    change: "77% of employees",
    icon: Users,
    color: "text-blue-600",
  },
  {
    label: "Average Tax Rate",
    value: 12.5,
    change: "Effective rate",
    icon: Calculator,
    color: "text-construction-500",
    isPercentage: true,
  },
  {
    label: "Tax Savings",
    value: 890000,
    change: "Total exemptions claimed",
    icon: Target,
    color: "text-purple-600",
    isCurrency: true,
  },
];

const incomeTaxSlabs = [
  {
    regime: "Old Regime (FY 2023-24)",
    slabs: [
      { range: "₹0 - ₹2,50,000", rate: 0, description: "Nil tax" },
      { range: "₹2,50,001 - ₹5,00,000", rate: 5, description: "5% tax" },
      { range: "₹5,00,001 - ₹10,00,000", rate: 20, description: "20% tax" },
      { range: "₹10,00,001 and above", rate: 30, description: "30% tax" },
    ],
    surcharge: "10% if income > ₹50 lakh, 15% if > ₹1 crore",
    cess: "4% Health & Education Cess on tax + surcharge",
    standardDeduction: 50000,
    exemptions: true,
  },
  {
    regime: "New Regime (FY 2023-24)",
    slabs: [
      { range: "₹0 - ₹3,00,000", rate: 0, description: "Nil tax" },
      { range: "₹3,00,001 - ₹6,00,000", rate: 5, description: "5% tax" },
      { range: "₹6,00,001 - ₹9,00,000", rate: 10, description: "10% tax" },
      { range: "₹9,00,001 - ₹12,00,000", rate: 15, description: "15% tax" },
      { range: "₹12,00,001 - ₹15,00,000", rate: 20, description: "20% tax" },
      { range: "₹15,00,001 and above", rate: 30, description: "30% tax" },
    ],
    surcharge: "10% if income > ₹50 lakh, 15% if > ₹1 crore",
    cess: "4% Health & Education Cess on tax + surcharge",
    standardDeduction: 50000,
    exemptions: false,
  },
];

const taxExemptions = [
  {
    section: "Section 80C",
    description: "Investment in PPF, ELSS, NSC, Life Insurance",
    maxLimit: 150000,
    usage: 89,
    averageClaimed: 125000,
    category: "Investment",
  },
  {
    section: "Section 80D",
    description: "Medical Insurance Premium",
    maxLimit: 25000,
    usage: 67,
    averageClaimed: 18000,
    category: "Medical",
  },
  {
    section: "Section 24(b)",
    description: "Home Loan Interest",
    maxLimit: 200000,
    usage: 34,
    averageClaimed: 180000,
    category: "Housing",
  },
  {
    section: "Section 80TTA",
    description: "Interest on Savings Bank Account",
    maxLimit: 10000,
    usage: 95,
    averageClaimed: 3500,
    category: "Interest",
  },
  {
    section: "Section 80G",
    description: "Donations to Charitable Organizations",
    maxLimit: "No limit",
    usage: 23,
    averageClaimed: 15000,
    category: "Donation",
  },
  {
    section: "HRA Exemption",
    description: "House Rent Allowance Exemption",
    maxLimit: "Actual HRA received",
    usage: 78,
    averageClaimed: 95000,
    category: "Allowance",
  },
];

const employeeTaxCalculations = [
  {
    employeeId: "EMP001",
    employeeName: "Sarah Mitchell",
    department: "Engineering",
    grossSalary: 1200000,
    taxableIncome: 1050000,
    exemptionsClaimed: 150000,
    taxDeducted: 89500,
    effectiveRate: 8.5,
    regime: "Old",
    status: "calculated",
  },
  {
    employeeId: "EMP015",
    employeeName: "Raj Kumar",
    department: "Operations",
    grossSalary: 800000,
    taxableIncome: 720000,
    exemptionsClaimed: 80000,
    taxDeducted: 23000,
    effectiveRate: 3.2,
    regime: "New",
    status: "calculated",
  },
  {
    employeeId: "EMP042",
    employeeName: "Priya Sharma",
    department: "Sales",
    grossSalary: 950000,
    taxableIncome: 850000,
    exemptionsClaimed: 100000,
    taxDeducted: 55000,
    effectiveRate: 6.5,
    regime: "Old",
    status: "pending",
  },
  {
    employeeId: "EMP078",
    employeeName: "Kumar Singh",
    department: "Quality",
    grossSalary: 600000,
    taxableIncome: 580000,
    exemptionsClaimed: 20000,
    taxDeducted: 12000,
    effectiveRate: 2.1,
    regime: "New",
    status: "calculated",
  },
];

const quarterlyReturns = [
  {
    quarter: "Q3 FY 2023-24",
    period: "Oct 2023 - Dec 2023",
    totalTds: 2100000,
    employees: 298,
    challans: 3,
    filingDate: "2024-01-15",
    dueDate: "2024-01-31",
    status: "filed",
    form24q: "Filed",
  },
  {
    quarter: "Q2 FY 2023-24",
    period: "Jul 2023 - Sep 2023",
    totalTds: 1980000,
    employees: 295,
    challans: 3,
    filingDate: "2023-10-12",
    dueDate: "2023-10-31",
    status: "filed",
    form24q: "Filed",
  },
  {
    quarter: "Q1 FY 2023-24",
    period: "Apr 2023 - Jun 2023",
    totalTds: 1850000,
    employees: 289,
    challans: 3,
    filingDate: "2023-07-20",
    dueDate: "2023-07-31",
    status: "filed",
    form24q: "Filed",
  },
];

const taxPlanningTips = [
  {
    tip: "Optimize 80C Investments",
    description: "Maximize ₹1.5 lakh deduction through PPF, ELSS, and NSC",
    savings: "Up to ₹46,800 tax savings",
    difficulty: "Easy",
    applicableEmployees: 384,
  },
  {
    tip: "Choose Optimal Tax Regime",
    description: "Compare old vs new regime for maximum benefit",
    savings: "5-15% tax reduction",
    difficulty: "Medium",
    applicableEmployees: 298,
  },
  {
    tip: "Claim HRA Exemption",
    description: "Properly calculate HRA exemption for metro/non-metro",
    savings: "₹30,000-80,000 annually",
    difficulty: "Easy",
    applicableEmployees: 156,
  },
  {
    tip: "Medical Insurance Premium",
    description: "Claim 80D deduction for health insurance",
    savings: "Up to ₹7,800 tax savings",
    difficulty: "Easy",
    applicableEmployees: 256,
  },
];

const form16Generation = [
  {
    employee: "All Employees",
    totalEmployees: 298,
    generated: 298,
    pending: 0,
    downloaded: 267,
    emailSent: 298,
    lastGenerated: "2024-01-30",
    status: "completed",
  },
];

export default function TaxCalculation() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "calculated":
      case "filed":
      case "completed":
        return "text-emerald-600 bg-emerald-600/10";
      case "pending":
        return "text-yellow-600 bg-yellow-600/10";
      case "overdue":
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-600 bg-emerald-600/10";
      case "Medium":
        return "text-yellow-600 bg-yellow-600/10";
      case "Hard":
        return "text-red-600 bg-red-600/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
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
                Tax Calculation & Filing
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
                Indian income tax calculations, TDS, and filing management
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
              Form 16 Bulk
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon
                icon={Calculator}
                animation="bounce"
                className="mr-2"
              />
              Calculate Tax
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {taxStats.map((stat, index) => (
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

        {/* Income Tax Slabs */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={BookOpen}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Income Tax Slabs (FY 2023-24)</CardTitle>
            </div>
            <CardDescription>
              Current income tax rates for old and new tax regimes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {incomeTaxSlabs.map((regime, index) => (
                <Card
                  key={regime.regime}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{regime.regime}</h4>
                        <Badge variant="outline" className="text-xs">
                          {regime.exemptions
                            ? "With Exemptions"
                            : "No Exemptions"}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {regime.slabs.map((slab, slabIndex) => (
                          <div
                            key={slabIndex}
                            className="flex items-center justify-between p-2 border rounded"
                          >
                            <span className="text-xs font-medium">
                              {slab.range}
                            </span>
                            <div className="text-right">
                              <span className="text-xs font-bold text-blue-600">
                                {slab.rate}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t space-y-1 text-xs">
                        <p>
                          <span className="font-medium">
                            Standard Deduction:
                          </span>{" "}
                          {formatCurrency(regime.standardDeduction)}
                        </p>
                        <p>
                          <span className="font-medium">Surcharge:</span>{" "}
                          {regime.surcharge}
                        </p>
                        <p>
                          <span className="font-medium">Cess:</span>{" "}
                          {regime.cess}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tax Exemptions & Employee Calculations */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Target}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Tax Exemptions (Old Regime)</CardTitle>
              </div>
              <CardDescription>
                Popular tax saving options and their utilization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {taxExemptions.map((exemption, index) => (
                  <div
                    key={exemption.section}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">
                        {exemption.section}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {exemption.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {exemption.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Max Limit</p>
                        <p className="font-medium text-emerald-600">
                          {typeof exemption.maxLimit === "number"
                            ? formatCurrency(exemption.maxLimit)
                            : exemption.maxLimit}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg. Claimed</p>
                        <p className="font-medium">
                          {formatCurrency(exemption.averageClaimed)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-xs">
                      <span className="text-muted-foreground">Usage: </span>
                      <span className="font-medium text-blue-600">
                        {exemption.usage}% of employees
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
                  icon={Users}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Employee Tax Calculations</CardTitle>
              </div>
              <CardDescription>
                Individual tax calculations and TDS status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {employeeTaxCalculations.map((employee, index) => (
                  <div
                    key={employee.employeeId}
                    className="p-3 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">
                          {employee.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {employee.employeeId} • {employee.department}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(employee.status)}`}
                      >
                        {employee.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">Gross Salary</p>
                        <p className="font-medium">
                          {formatCurrency(employee.grossSalary)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tax Deducted</p>
                        <p className="font-medium text-red-600">
                          {formatCurrency(employee.taxDeducted)}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Effective Rate</p>
                        <p className="font-medium text-blue-600">
                          {employee.effectiveRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tax Regime</p>
                        <p className="font-medium">{employee.regime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quarterly Returns & Tax Planning */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={FileText}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Quarterly TDS Returns</CardTitle>
              </div>
              <CardDescription>
                Form 24Q filing status and TDS payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quarterlyReturns.map((quarter, index) => (
                  <div
                    key={quarter.quarter}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{quarter.quarter}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(quarter.status)}`}
                      >
                        {quarter.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {quarter.period}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">Total TDS</p>
                        <p className="font-medium text-emerald-600">
                          {formatCurrency(quarter.totalTds)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Employees</p>
                        <p className="font-medium">{quarter.employees}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Filed: {quarter.filingDate}
                      </span>
                      <span className="font-medium text-blue-600">
                        {quarter.form24q}
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
                  icon={Target}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Tax Planning Tips</CardTitle>
              </div>
              <CardDescription>
                Recommendations for tax optimization and savings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxPlanningTips.map((tip, index) => (
                  <div
                    key={tip.tip}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{tip.tip}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getDifficultyColor(tip.difficulty)}`}
                      >
                        {tip.difficulty}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {tip.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-emerald-600">
                        {tip.savings}
                      </span>
                      <span className="text-muted-foreground">
                        {tip.applicableEmployees} employees
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form 16 Generation Status */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Receipt}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Form 16 Generation Status</CardTitle>
            </div>
            <CardDescription>
              Annual tax certificate generation and distribution status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center p-4 border rounded-lg animate-scaleIn">
                <p className="text-2xl font-bold text-blue-600">
                  <AnimatedCounter value={298} />
                </p>
                <p className="text-sm text-muted-foreground">Total Employees</p>
              </div>
              <div className="text-center p-4 border rounded-lg animate-scaleIn">
                <p className="text-2xl font-bold text-emerald-600">
                  <AnimatedCounter value={298} />
                </p>
                <p className="text-sm text-muted-foreground">Forms Generated</p>
              </div>
              <div className="text-center p-4 border rounded-lg animate-scaleIn">
                <p className="text-2xl font-bold text-construction-500">
                  <AnimatedCounter value={267} />
                </p>
                <p className="text-sm text-muted-foreground">Downloaded</p>
              </div>
              <div className="text-center p-4 border rounded-lg animate-scaleIn">
                <p className="text-2xl font-bold text-purple-600">
                  <AnimatedCounter value={298} />
                </p>
                <p className="text-sm text-muted-foreground">Email Sent</p>
              </div>
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
              Common tax calculation and filing tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Calculator}
                  animation="bounce"
                  className="mr-2"
                />
                Calculate TDS
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Receipt}
                  animation="pulse"
                  className="mr-2"
                />
                Generate Form 16
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={FileText}
                  animation="float"
                  className="mr-2"
                />
                File 24Q Return
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Eye} animation="glow" className="mr-2" />
                Tax Projections
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
