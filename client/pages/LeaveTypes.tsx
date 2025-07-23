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
  FileText,
  Heart,
  Stethoscope,
  Baby,
  AlertTriangle,
  GraduationCap,
  Plane,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  Edit,
  Copy,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const leaveTypeStats = [
  {
    label: "Active Leave Types",
    value: 8,
    change: "2 added this year",
    icon: FileText,
    color: "text-emerald-600",
  },
  {
    label: "Most Used Type",
    value: 342,
    change: "Annual leave requests",
    icon: Plane,
    color: "text-blue-600",
  },
  {
    label: "Total Categories",
    value: 6,
    change: "Across all departments",
    icon: Calendar,
    color: "text-construction-500",
  },
  {
    label: "Average Days",
    value: 18,
    change: "Per employee annually",
    icon: Clock,
    color: "text-purple-600",
  },
];

const leaveTypes = [
  {
    id: 1,
    name: "Annual Leave",
    description: "Yearly vacation entitlement for all employees",
    category: "Vacation",
    icon: Plane,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    entitlement: "25 days/year",
    eligibility: "All permanent employees",
    carryover: "5 days max",
    encashable: true,
    requiresApproval: true,
    advanceNotice: "7 days",
    maxConsecutive: "15 days",
    status: "active",
    employees: 384,
    requestsThisYear: 1248,
    averageDuration: "4.2 days",
  },
  {
    id: 2,
    name: "Sick Leave",
    description: "Medical leave for illness and health issues",
    category: "Medical",
    icon: Stethoscope,
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    entitlement: "12 days/year",
    eligibility: "All employees",
    carryover: "Not allowed",
    encashable: false,
    requiresApproval: false,
    advanceNotice: "Not required",
    maxConsecutive: "No limit",
    status: "active",
    employees: 384,
    requestsThisYear: 485,
    averageDuration: "2.1 days",
  },
  {
    id: 3,
    name: "Maternity Leave",
    description: "Comprehensive maternity benefits for new mothers",
    category: "Parental",
    icon: Baby,
    color: "text-pink-600",
    bgColor: "bg-pink-600/10",
    entitlement: "180 days",
    eligibility: "Female employees",
    carryover: "Not applicable",
    encashable: false,
    requiresApproval: true,
    advanceNotice: "30 days",
    maxConsecutive: "180 days",
    status: "active",
    employees: 156,
    requestsThisYear: 24,
    averageDuration: "120 days",
  },
  {
    id: 4,
    name: "Paternity Leave",
    description: "Leave for new fathers and adoptive parents",
    category: "Parental",
    icon: Heart,
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    entitlement: "15 days",
    eligibility: "Male employees",
    carryover: "Not applicable",
    encashable: false,
    requiresApproval: true,
    advanceNotice: "15 days",
    maxConsecutive: "15 days",
    status: "active",
    employees: 228,
    requestsThisYear: 18,
    averageDuration: "10 days",
  },
  {
    id: 5,
    name: "Emergency Leave",
    description: "Immediate leave for family emergencies",
    category: "Emergency",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    entitlement: "5 days/year",
    eligibility: "All employees",
    carryover: "Not allowed",
    encashable: false,
    requiresApproval: true,
    advanceNotice: "Not required",
    maxConsecutive: "5 days",
    status: "active",
    employees: 384,
    requestsThisYear: 142,
    averageDuration: "1.8 days",
  },
  {
    id: 6,
    name: "Study Leave",
    description: "Educational leave for professional development",
    category: "Development",
    icon: GraduationCap,
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    entitlement: "10 days/year",
    eligibility: "Employees with 2+ years",
    carryover: "Not allowed",
    encashable: false,
    requiresApproval: true,
    advanceNotice: "30 days",
    maxConsecutive: "10 days",
    status: "draft",
    employees: 245,
    requestsThisYear: 0,
    averageDuration: "0 days",
  },
];

const categoryBreakdown = [
  {
    category: "Vacation",
    types: 1,
    employees: 384,
    requests: 1248,
    color: "text-blue-600",
    percentage: 58.2,
  },
  {
    category: "Medical",
    types: 1,
    employees: 384,
    requests: 485,
    color: "text-red-600",
    percentage: 22.6,
  },
  {
    category: "Parental",
    types: 2,
    employees: 384,
    requests: 42,
    color: "text-pink-600",
    percentage: 2.0,
  },
  {
    category: "Emergency",
    types: 1,
    employees: 384,
    requests: 142,
    color: "text-orange-600",
    percentage: 6.6,
  },
  {
    category: "Development",
    types: 1,
    employees: 245,
    requests: 0,
    color: "text-purple-600",
    percentage: 0.0,
  },
];

const usageStats = [
  {
    period: "This Month",
    totalRequests: 89,
    approvedRequests: 76,
    pendingRequests: 8,
    rejectedRequests: 5,
    totalDays: 312,
  },
  {
    period: "Last Month",
    totalRequests: 145,
    approvedRequests: 128,
    pendingRequests: 12,
    rejectedRequests: 5,
    totalDays: 598,
  },
  {
    period: "This Quarter",
    totalRequests: 423,
    approvedRequests: 378,
    pendingRequests: 32,
    rejectedRequests: 13,
    totalDays: 1845,
  },
  {
    period: "This Year",
    totalRequests: 1917,
    approvedRequests: 1678,
    pendingRequests: 198,
    rejectedRequests: 41,
    totalDays: 7234,
  },
];

export default function LeaveTypes() {
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
                Leave Types Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={FileText}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Configure and manage different categories of employee leave
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
              Export Types
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Add Leave Type
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {leaveTypeStats.map((stat, index) => (
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

        {/* Leave Types Table */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Calendar}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Leave Types Configuration</CardTitle>
            </div>
            <CardDescription>
              Manage all available leave types and their settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Leave Type
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Entitlement
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Eligibility
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Properties
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Usage
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
                  {leaveTypes.map((type, index) => (
                    <tr
                      key={type.id}
                      className="border-b hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${type.bgColor}`}>
                            <AnimatedIcon
                              icon={type.icon}
                              animation="bounce"
                              className={`${type.color} h-4 w-4`}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{type.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {type.description}
                            </p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {type.category}
                            </Badge>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="text-sm font-medium text-emerald-600">
                          {type.entitlement}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-xs text-muted-foreground">
                          {type.eligibility}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            {type.encashable ? (
                              <CheckCircle className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <XCircle className="h-3 w-3 text-red-600" />
                            )}
                            <span className="text-xs">Encashable</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {type.requiresApproval ? (
                              <CheckCircle className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <XCircle className="h-3 w-3 text-red-600" />
                            )}
                            <span className="text-xs">Approval Required</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Notice: {type.advanceNotice}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {type.requestsThisYear} requests
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Avg: {type.averageDuration}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {type.employees} employees
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(type.status)}`}
                        >
                          {type.status}
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

        {/* Category Breakdown & Usage Statistics */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={FileText}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Category Breakdown</CardTitle>
              </div>
              <CardDescription>
                Leave types organized by category and usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryBreakdown.map((category, index) => (
                  <div
                    key={category.category}
                    className="space-y-2 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full bg-current opacity-20 ${category.color}`}
                        >
                          <PulsingDot className={category.color} />
                        </div>
                        <span className="text-sm font-medium">
                          {category.category}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {category.types} type{category.types > 1 ? "s" : ""}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold">
                          {category.requests}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({category.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-current opacity-60 ${category.color}`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {category.employees} eligible employees
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
                <CardTitle>Usage Statistics</CardTitle>
              </div>
              <CardDescription>
                Leave request trends and approval rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usageStats.map((stat, index) => (
                  <div
                    key={stat.period}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{stat.period}</h4>
                      <Badge variant="outline" className="text-xs">
                        {stat.totalDays} days
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="text-center">
                        <p className="text-muted-foreground">Total</p>
                        <p className="font-medium text-blue-600">
                          {stat.totalRequests}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Approved</p>
                        <p className="font-medium text-emerald-600">
                          {stat.approvedRequests}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Pending</p>
                        <p className="font-medium text-yellow-600">
                          {stat.pendingRequests}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-center">
                      <span className="text-muted-foreground">
                        Approval Rate:{" "}
                      </span>
                      <span className="font-medium text-emerald-600">
                        {(
                          (stat.approvedRequests / stat.totalRequests) *
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
        </div>

        {/* Quick Actions */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Calendar}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common leave type management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                Add Leave Type
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Copy} animation="pulse" className="mr-2" />
                Clone Existing
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Download}
                  animation="float"
                  className="mr-2"
                />
                Export Configuration
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Eye} animation="glow" className="mr-2" />
                Usage Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
