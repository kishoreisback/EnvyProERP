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
  Building,
  IndianRupee,
  Users,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  Edit,
  Copy,
  Trash2,
  Calculator,
  FileText,
  Settings,
  CheckCircle,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const structureStats = [
  {
    label: "Active Structures",
    value: 12,
    change: "Grade-wise templates",
    icon: Building,
    color: "text-emerald-600",
  },
  {
    label: "Employees Covered",
    value: 384,
    change: "100% mapping",
    icon: Users,
    color: "text-blue-600",
  },
  {
    label: "Average CTC",
    value: 850000,
    change: "Annual package",
    icon: IndianRupee,
    color: "text-construction-500",
    isCurrency: true,
  },
  {
    label: "Components",
    value: 18,
    change: "Standard components",
    icon: Calculator,
    color: "text-purple-600",
  },
];

const salaryStructures = [
  {
    id: 1,
    name: "Junior Level (J1-J3)",
    description: "Entry level positions and junior executives",
    grade: "J1-J3",
    minCtc: 300000,
    maxCtc: 600000,
    employees: 89,
    basicPercentage: 40,
    hraPercentage: 20,
    status: "active",
    lastUpdated: "2024-01-15",
    components: {
      basic: 40,
      hra: 20,
      da: 10,
      conveyance: 8,
      medical: 5,
      special: 17,
    },
  },
  {
    id: 2,
    name: "Mid Level (M1-M3)",
    description: "Senior executives and team leads",
    grade: "M1-M3",
    minCtc: 600000,
    maxCtc: 1200000,
    employees: 156,
    basicPercentage: 45,
    hraPercentage: 22,
    status: "active",
    lastUpdated: "2024-01-10",
    components: {
      basic: 45,
      hra: 22,
      da: 12,
      conveyance: 6,
      medical: 4,
      special: 11,
    },
  },
  {
    id: 3,
    name: "Senior Level (S1-S3)",
    description: "Department managers and senior leads",
    grade: "S1-S3",
    minCtc: 1200000,
    maxCtc: 2500000,
    employees: 98,
    basicPercentage: 50,
    hraPercentage: 25,
    status: "active",
    lastUpdated: "2024-01-08",
    components: {
      basic: 50,
      hra: 25,
      da: 8,
      conveyance: 4,
      medical: 3,
      special: 10,
    },
  },
  {
    id: 4,
    name: "Leadership (L1-L3)",
    description: "Directors and C-level executives",
    grade: "L1-L3",
    minCtc: 2500000,
    maxCtc: 5000000,
    employees: 28,
    basicPercentage: 35,
    hraPercentage: 20,
    status: "active",
    lastUpdated: "2024-01-05",
    components: {
      basic: 35,
      hra: 20,
      da: 5,
      conveyance: 2,
      medical: 3,
      special: 35,
    },
  },
  {
    id: 5,
    name: "Contract Staff",
    description: "Temporary and contract employees",
    grade: "CONTRACT",
    minCtc: 240000,
    maxCtc: 480000,
    employees: 13,
    basicPercentage: 60,
    hraPercentage: 25,
    status: "active",
    lastUpdated: "2024-01-20",
    components: {
      basic: 60,
      hra: 25,
      da: 0,
      conveyance: 10,
      medical: 5,
      special: 0,
    },
  },
];

const salaryComponents = [
  {
    name: "Basic Salary",
    type: "earnings",
    description: "Base salary component for PF calculation",
    taxable: true,
    pfApplicable: true,
    esiApplicable: true,
    calculation: "Fixed percentage of CTC",
    minPercentage: 35,
    maxPercentage: 60,
    usage: 384,
  },
  {
    name: "House Rent Allowance (HRA)",
    type: "earnings",
    description: "Housing allowance with tax exemption",
    taxable: true,
    pfApplicable: false,
    esiApplicable: true,
    calculation: "Percentage of Basic or Fixed amount",
    minPercentage: 20,
    maxPercentage: 50,
    usage: 384,
  },
  {
    name: "Dearness Allowance (DA)",
    type: "earnings",
    description: "Cost of living adjustment allowance",
    taxable: true,
    pfApplicable: true,
    esiApplicable: true,
    calculation: "Percentage of Basic salary",
    minPercentage: 0,
    maxPercentage: 15,
    usage: 371,
  },
  {
    name: "Conveyance Allowance",
    type: "earnings",
    description: "Transportation allowance (₹1,600/month exempt)",
    taxable: true,
    pfApplicable: false,
    esiApplicable: false,
    calculation: "Fixed amount up to ₹1,600",
    minPercentage: 2,
    maxPercentage: 10,
    usage: 384,
  },
  {
    name: "Medical Allowance",
    type: "earnings",
    description: "Medical expense reimbursement (₹15,000/year exempt)",
    taxable: true,
    pfApplicable: false,
    esiApplicable: false,
    calculation: "Fixed amount up to ₹15,000/year",
    minPercentage: 1,
    maxPercentage: 5,
    usage: 384,
  },
  {
    name: "Special Allowance",
    type: "earnings",
    description: "Balancing component to meet CTC",
    taxable: true,
    pfApplicable: false,
    esiApplicable: true,
    calculation: "Residual amount after other components",
    minPercentage: 5,
    maxPercentage: 40,
    usage: 356,
  },
  {
    name: "Provident Fund",
    type: "deductions",
    description: "Employee PF contribution @ 12% of Basic+DA",
    taxable: false,
    pfApplicable: true,
    esiApplicable: false,
    calculation: "12% of (Basic + DA), max ₹1,800/month",
    minPercentage: 12,
    maxPercentage: 12,
    usage: 384,
  },
  {
    name: "Employee State Insurance",
    type: "deductions",
    description: "ESI contribution @ 0.75% of gross (if eligible)",
    taxable: false,
    pfApplicable: false,
    esiApplicable: true,
    calculation: "0.75% of gross up to ₹21,000/month",
    minPercentage: 0.75,
    maxPercentage: 0.75,
    usage: 256,
  },
];

const ctcBreakdown = {
  grade: "M2 - Mid Level",
  ctc: 900000,
  breakdown: [
    { component: "Basic Salary", amount: 405000, percentage: 45.0 },
    { component: "HRA", amount: 198000, percentage: 22.0 },
    { component: "Dearness Allowance", amount: 108000, percentage: 12.0 },
    { component: "Conveyance", amount: 54000, percentage: 6.0 },
    { component: "Medical", amount: 36000, percentage: 4.0 },
    { component: "Special Allowance", amount: 99000, percentage: 11.0 },
  ],
  deductions: [
    { component: "PF (Employee)", amount: 48600, percentage: 5.4 },
    { component: "ESI (Employee)", amount: 6750, percentage: 0.75 },
    { component: "Professional Tax", amount: 2400, percentage: 0.27 },
  ],
  annualComponents: [
    { component: "Gratuity", amount: 19615, percentage: 2.18 },
    { component: "PF (Employer)", amount: 48600, percentage: 5.4 },
    { component: "ESI (Employer)", amount: 29250, percentage: 3.25 },
  ],
};

const templateTypes = [
  {
    type: "Standard Grade Structure",
    description: "Traditional grade-wise salary structures",
    features: [
      "Grade-based components",
      "Percentage-based calculation",
      "Standard allowances",
    ],
    usage: 8,
    recommended: true,
  },
  {
    type: "Role-based Structure",
    description: "Structures based on job roles and functions",
    features: [
      "Role-specific components",
      "Skill-based allowances",
      "Performance incentives",
    ],
    usage: 3,
    recommended: false,
  },
  {
    type: "Market-linked Structure",
    description: "Structures aligned with market benchmarks",
    features: [
      "Market data integration",
      "Dynamic components",
      "Inflation adjustments",
    ],
    usage: 1,
    recommended: false,
  },
];

export default function SalaryStructures() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-600 bg-emerald-600/10";
      case "draft":
        return "text-yellow-600 bg-yellow-600/10";
      case "inactive":
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
                Salary Structures & Components
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Building}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Configure Indian salary structures and CTC components
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
              Export Structures
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Structure
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {structureStats.map((stat, index) => (
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

        {/* Salary Structures Table */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Target}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Salary Structure Templates</CardTitle>
            </div>
            <CardDescription>
              Grade-wise salary structures with Indian CTC components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Structure
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      CTC Range
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Basic %
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      HRA %
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Employees
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
                  {salaryStructures.map((structure, index) => (
                    <tr
                      key={structure.id}
                      className="border-b hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-sm">
                            {structure.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {structure.description}
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {structure.grade}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">
                          <p className="font-medium text-emerald-600">
                            {formatCurrency(structure.minCtc)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            to {formatCurrency(structure.maxCtc)}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="text-sm font-medium text-blue-600">
                          {structure.basicPercentage}%
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-sm font-medium text-purple-600">
                          {structure.hraPercentage}%
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-sm font-medium">
                          {structure.employees}
                        </span>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(structure.status)}`}
                        >
                          {structure.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="text-xs">
                            <AnimatedIcon icon={Eye} className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="ghost" className="text-xs">
                            <AnimatedIcon
                              icon={Edit}
                              className="h-3 w-3 mr-1"
                            />
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" className="text-xs">
                            <AnimatedIcon
                              icon={Copy}
                              className="h-3 w-3 mr-1"
                            />
                            Clone
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Salary Components & CTC Breakdown */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Calculator}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Salary Components</CardTitle>
              </div>
              <CardDescription>
                Standard Indian salary components and rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {salaryComponents.slice(0, 6).map((component, index) => (
                  <div
                    key={component.name}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{component.name}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          component.type === "earnings"
                            ? "text-emerald-600 bg-emerald-600/10"
                            : "text-red-600 bg-red-600/10"
                        }`}
                      >
                        {component.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {component.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        {component.taxable ? (
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <div className="h-3 w-3 rounded-full bg-muted" />
                        )}
                        <span>Taxable</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {component.pfApplicable ? (
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <div className="h-3 w-3 rounded-full bg-muted" />
                        )}
                        <span>PF Applicable</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs">
                      <span className="text-muted-foreground">Range: </span>
                      <span className="font-medium">
                        {component.minPercentage}% - {component.maxPercentage}%
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
                  icon={IndianRupee}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>CTC Breakdown Example</CardTitle>
              </div>
              <CardDescription>
                Sample CTC structure for {ctcBreakdown.grade}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-construction-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(ctcBreakdown.ctc)}
                  </p>
                  <p className="text-sm text-muted-foreground">Annual CTC</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-3 text-emerald-600">
                    Earnings Components
                  </h4>
                  <div className="space-y-2">
                    {ctcBreakdown.breakdown.map((item, index) => (
                      <div
                        key={item.component}
                        className="flex items-center justify-between text-xs animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <span>{item.component}</span>
                        <div className="text-right">
                          <span className="font-medium">
                            {formatCurrency(item.amount)}
                          </span>
                          <span className="text-muted-foreground ml-2">
                            ({item.percentage}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-3 text-red-600">
                    Employee Deductions
                  </h4>
                  <div className="space-y-2">
                    {ctcBreakdown.deductions.map((item, index) => (
                      <div
                        key={item.component}
                        className="flex items-center justify-between text-xs animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <span>{item.component}</span>
                        <div className="text-right">
                          <span className="font-medium text-red-600">
                            -{formatCurrency(item.amount)}
                          </span>
                          <span className="text-muted-foreground ml-2">
                            ({item.percentage}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-3 text-blue-600">
                    Employer Contributions
                  </h4>
                  <div className="space-y-2">
                    {ctcBreakdown.annualComponents.map((item, index) => (
                      <div
                        key={item.component}
                        className="flex items-center justify-between text-xs animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <span>{item.component}</span>
                        <div className="text-right">
                          <span className="font-medium text-blue-600">
                            {formatCurrency(item.amount)}
                          </span>
                          <span className="text-muted-foreground ml-2">
                            ({item.percentage}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Template Types */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={FileText}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Structure Template Types</CardTitle>
            </div>
            <CardDescription>
              Different approaches to salary structure design
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {templateTypes.map((template, index) => (
                <Card
                  key={template.type}
                  className={`hover-lift animate-scaleIn ${
                    template.recommended ? "border-primary/50 bg-primary/5" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{template.type}</h4>
                        {template.recommended && (
                          <Badge
                            variant="outline"
                            className="text-xs text-primary"
                          >
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {template.description}
                      </p>
                      <div className="space-y-1">
                        {template.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <CheckCircle className="h-3 w-3 text-emerald-600" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            In Use:
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {template.usage} structures
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
                icon={Settings}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common salary structure management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                Create Structure
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Calculator}
                  animation="pulse"
                  className="mr-2"
                />
                CTC Calculator
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Copy} animation="float" className="mr-2" />
                Clone Template
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
