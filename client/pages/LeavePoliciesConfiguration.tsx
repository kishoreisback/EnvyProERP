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
  Settings,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  FileText,
  Calendar,
  Shield,
  Target,
  Edit,
  Copy,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

const policyStats = [
  {
    label: "Active Policies",
    value: 12,
    change: "3 updated this month",
    icon: Shield,
    color: "text-emerald-600",
  },
  {
    label: "Policy Templates",
    value: 8,
    change: "Ready to use",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    label: "Coverage Rate",
    value: 98,
    change: "% employees covered",
    icon: Target,
    color: "text-construction-500",
  },
  {
    label: "Compliance Score",
    value: 95,
    change: "% policy adherence",
    icon: CheckCircle,
    color: "text-purple-600",
  },
];

const policyTemplates = [
  {
    id: 1,
    name: "Standard Annual Leave",
    description: "Default annual leave policy for all employees",
    category: "Annual Leave",
    entitlement: "25 days/year",
    eligibility: "All permanent employees",
    carryover: "5 days max",
    status: "active",
    employees: 342,
    lastUpdated: "2024-01-10",
  },
  {
    id: 2,
    name: "Sick Leave Policy",
    description: "Medical leave policy with doctor certification",
    category: "Sick Leave",
    entitlement: "12 days/year",
    eligibility: "All employees",
    carryover: "Not allowed",
    status: "active",
    employees: 384,
    lastUpdated: "2024-01-05",
  },
  {
    id: 3,
    name: "Maternity Leave",
    description: "Comprehensive maternity leave benefits",
    category: "Parental Leave",
    entitlement: "180 days",
    eligibility: "Female employees",
    carryover: "Not applicable",
    status: "active",
    employees: 156,
    lastUpdated: "2023-12-15",
  },
  {
    id: 4,
    name: "Emergency Leave",
    description: "Immediate leave for family emergencies",
    category: "Emergency",
    entitlement: "5 days/year",
    eligibility: "All employees",
    carryover: "Not allowed",
    status: "active",
    employees: 384,
    lastUpdated: "2024-01-08",
  },
  {
    id: 5,
    name: "Study Leave",
    description: "Educational leave for professional development",
    category: "Development",
    entitlement: "10 days/year",
    eligibility: "Employees with 2+ years",
    carryover: "Not allowed",
    status: "draft",
    employees: 0,
    lastUpdated: "2024-01-12",
  },
];

const accrualPatterns = [
  {
    name: "Monthly Accrual",
    description: "Leave accrues monthly at end of month",
    frequency: "Monthly",
    calculation: "Total entitlement ÷ 12",
    proration: "Yes",
    usage: 245,
  },
  {
    name: "Annual Grant",
    description: "Full entitlement granted at year start",
    frequency: "Annually",
    calculation: "Full amount on joining date",
    proration: "Yes",
    usage: 89,
  },
  {
    name: "Quarterly Accrual",
    description: "Leave accrues at quarter end",
    frequency: "Quarterly",
    calculation: "Total entitlement ÷ 4",
    proration: "No",
    usage: 32,
  },
  {
    name: "Bi-annual Grant",
    description: "Half entitlement granted twice a year",
    frequency: "Bi-annually",
    calculation: "Total entitlement ÷ 2",
    proration: "Yes",
    usage: 18,
  },
];

const policyRules = [
  {
    rule: "Minimum Service Period",
    description: "Employee must complete probation before leave eligibility",
    value: "3 months",
    category: "Eligibility",
    active: true,
  },
  {
    rule: "Maximum Consecutive Days",
    description: "Maximum consecutive days of leave allowed",
    value: "15 days",
    category: "Usage",
    active: true,
  },
  {
    rule: "Advance Notice Required",
    description: "Minimum notice period for leave application",
    value: "7 days",
    category: "Process",
    active: true,
  },
  {
    rule: "Manager Approval Required",
    description: "All leave requests need manager approval",
    value: "Yes",
    category: "Approval",
    active: true,
  },
  {
    rule: "Weekend Inclusion",
    description: "Include weekends in leave calculation",
    value: "No",
    category: "Calculation",
    active: false,
  },
  {
    rule: "Public Holiday Exclusion",
    description: "Exclude public holidays from leave days",
    value: "Yes",
    category: "Calculation",
    active: true,
  },
];

export default function LeavePoliciesConfiguration() {
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
                Leave Policies Configuration
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Settings}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Configure and manage organizational leave policies
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
              Export Policies
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Policy
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {policyStats.map((stat, index) => (
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
                  {stat.label.includes("Rate") ||
                  stat.label.includes("Score") ? (
                    <span className="text-sm">%</span>
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

        {/* Policy Templates */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={FileText}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Leave Policy Templates</CardTitle>
            </div>
            <CardDescription>
              Configure and manage different types of leave policies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Policy Name
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Category
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Entitlement
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Eligibility
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
                  {policyTemplates.map((policy, index) => (
                    <tr
                      key={policy.id}
                      className="border-b hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-sm">{policy.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {policy.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Updated: {policy.lastUpdated}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">
                          {policy.category}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span className="text-sm font-medium text-emerald-600">
                          {policy.entitlement}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-xs text-muted-foreground">
                          {policy.eligibility}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-sm font-medium">
                          {policy.employees}
                        </span>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(policy.status)}`}
                        >
                          {policy.status}
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

        {/* Accrual Patterns & Policy Rules */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Calendar}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Accrual Patterns</CardTitle>
              </div>
              <CardDescription>
                Configure how leave entitlements are accrued
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accrualPatterns.map((pattern, index) => (
                  <div
                    key={pattern.name}
                    className="p-3 border rounded-lg animate-scaleIn space-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{pattern.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {pattern.usage} employees
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {pattern.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Frequency</p>
                        <p className="font-medium">{pattern.frequency}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Proration</p>
                        <p className="font-medium">{pattern.proration}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Calculation:</span>{" "}
                      {pattern.calculation}
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
                  icon={Shield}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Policy Rules</CardTitle>
              </div>
              <CardDescription>
                Configure global rules and restrictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {policyRules.map((rule, index) => (
                  <div
                    key={rule.rule}
                    className="flex items-center justify-between p-3 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{rule.rule}</p>
                      <p className="text-xs text-muted-foreground">
                        {rule.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {rule.category}
                        </Badge>
                        <span className="text-xs font-medium text-blue-600">
                          {rule.value}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          rule.active
                            ? "text-emerald-600 bg-emerald-600/10"
                            : "text-red-600 bg-red-600/10"
                        }`}
                      >
                        {rule.active ? "Active" : "Inactive"}
                      </Badge>
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
                icon={Settings}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>Common policy configuration tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                Create Policy
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Copy} animation="pulse" className="mr-2" />
                Clone Template
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Download}
                  animation="float"
                  className="mr-2"
                />
                Export Settings
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Shield} animation="glow" className="mr-2" />
                Audit Policies
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
