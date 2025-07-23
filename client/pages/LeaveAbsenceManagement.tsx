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
  CalendarDays,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  Plane,
  Settings,
  FileText,
  DollarSign,
  Calendar,
  UserCheck,
  AlertTriangle,
  Banknote,
} from "lucide-react";
import { Link } from "react-router-dom";

const leaveStats = [
  {
    label: "Active Requests",
    value: 28,
    change: "12 pending approval",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    label: "On Leave Today",
    value: 15,
    change: "4% of workforce",
    icon: Plane,
    color: "text-orange-500",
  },
  {
    label: "Available Balance",
    value: 2847,
    change: "Total days across team",
    icon: CalendarDays,
    color: "text-emerald-600",
  },
  {
    label: "Encashment Requests",
    value: 8,
    change: "This quarter",
    icon: DollarSign,
    color: "text-construction-500",
  },
];

const leaveModules = [
  {
    title: "Leave Policies Configuration",
    description: "Setup and manage organizational leave policies",
    icon: Settings,
    href: "/hrms/leave/policies",
    color: "text-primary",
    bgColor: "bg-primary/10",
    features: [
      "Policy templates",
      "Eligibility rules",
      "Accrual patterns",
      "Carryover settings",
    ],
  },
  {
    title: "Leave Types Management",
    description: "Configure different types of leave categories",
    icon: FileText,
    href: "/hrms/leave/types",
    color: "text-construction-500",
    bgColor: "bg-construction-500/10",
    features: [
      "Annual leave",
      "Sick leave",
      "Maternity/Paternity",
      "Emergency leave",
    ],
  },
  {
    title: "Request & Approval Workflow",
    description: "Streamlined leave request and approval process",
    icon: CheckCircle,
    href: "/hrms/leave/workflow",
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    features: [
      "Request submission",
      "Multi-level approval",
      "Delegation support",
      "Notification alerts",
    ],
  },
  {
    title: "Leave Balances & Accruals",
    description: "Track and manage leave balances automatically",
    icon: CalendarDays,
    href: "/hrms/leave/balances",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    features: [
      "Real-time balances",
      "Accrual calculations",
      "Proration logic",
      "Balance reports",
    ],
  },
  {
    title: "Holiday Calendar",
    description: "Manage organizational holidays and observances",
    icon: Calendar,
    href: "/hrms/leave/calendar",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    features: [
      "Holiday setup",
      "Regional calendars",
      "Optional holidays",
      "Calendar sync",
    ],
  },
  {
    title: "Leave Encashment",
    description: "Handle leave encashment requests and calculations",
    icon: Banknote,
    href: "/hrms/leave/encashment",
    color: "text-yellow-600",
    bgColor: "bg-yellow-600/10",
    features: [
      "Encashment rules",
      "Calculation engine",
      "Payment processing",
      "Tax implications",
    ],
  },
];

const recentRequests = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    department: "Engineering",
    type: "Annual Leave",
    startDate: "2024-01-20",
    endDate: "2024-01-24",
    days: 5,
    status: "pending",
    approver: "David Park",
    reason: "Family vacation",
  },
  {
    id: 2,
    employee: "Maria Rodriguez",
    department: "Sales",
    type: "Sick Leave",
    startDate: "2024-01-15",
    endDate: "2024-01-16",
    days: 2,
    status: "approved",
    approver: "James Wilson",
    reason: "Medical appointment",
  },
  {
    id: 3,
    employee: "John Chen",
    department: "Operations",
    type: "Personal Leave",
    startDate: "2024-01-22",
    endDate: "2024-01-22",
    days: 1,
    status: "rejected",
    approver: "Lisa Anderson",
    reason: "Personal matter",
  },
  {
    id: 4,
    employee: "Alex Kumar",
    department: "Quality",
    type: "Emergency Leave",
    startDate: "2024-01-18",
    endDate: "2024-01-19",
    days: 2,
    status: "approved",
    approver: "Sarah Mitchell",
    reason: "Family emergency",
  },
];

const leaveBalances = [
  {
    employee: "Sarah Mitchell",
    department: "Engineering",
    annual: { used: 8, available: 17, total: 25 },
    sick: { used: 3, available: 9, total: 12 },
    personal: { used: 1, available: 4, total: 5 },
  },
  {
    employee: "David Park",
    department: "Operations",
    annual: { used: 12, available: 13, total: 25 },
    sick: { used: 5, available: 7, total: 12 },
    personal: { used: 2, available: 3, total: 5 },
  },
  {
    employee: "Maria Rodriguez",
    department: "Sales",
    annual: { used: 6, available: 19, total: 25 },
    sick: { used: 2, available: 10, total: 12 },
    personal: { used: 0, available: 5, total: 5 },
  },
  {
    employee: "James Wilson",
    department: "Quality",
    annual: { used: 15, available: 10, total: 25 },
    sick: { used: 4, available: 8, total: 12 },
    personal: { used: 3, available: 2, total: 5 },
  },
];

export default function LeaveAbsenceManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-emerald-600 bg-emerald-600/10";
      case "pending":
        return "text-yellow-600 bg-yellow-600/10";
      case "rejected":
        return "text-red-600 bg-red-600/10";
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
      default:
        return AlertTriangle;
    }
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
                Leave & Absence Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Plane}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Comprehensive leave management and absence tracking
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
              Apply Leave
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {leaveStats.map((stat, index) => (
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

        {/* Leave Management Modules */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Settings}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Leave Management Modules</CardTitle>
            </div>
            <CardDescription>
              Comprehensive leave and absence management tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {leaveModules.map((module, index) => (
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

        {/* Recent Requests & Team Balances */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={FileText}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Recent Leave Requests</CardTitle>
              </div>
              <CardDescription>
                Latest leave applications and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentRequests.map((request, index) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{request.employee}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.department}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="outline" className="text-xs">
                          {request.type}
                        </Badge>
                        <span>{request.days} days</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {request.startDate} to {request.endDate}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
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
                      <p className="text-xs text-muted-foreground">
                        Approver: {request.approver}
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
                  icon={CalendarDays}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Team Leave Balances</CardTitle>
              </div>
              <CardDescription>
                Current leave balance summary for team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveBalances.map((balance, index) => (
                  <div
                    key={balance.employee}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm">
                          {balance.employee}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {balance.department}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="text-center">
                        <p className="text-muted-foreground">Annual</p>
                        <p className="font-medium text-blue-600">
                          {balance.annual.available}/{balance.annual.total}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Sick</p>
                        <p className="font-medium text-emerald-600">
                          {balance.sick.available}/{balance.sick.total}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Personal</p>
                        <p className="font-medium text-purple-600">
                          {balance.personal.available}/{balance.personal.total}
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
                icon={UserCheck}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common leave management tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/leave/workflow">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Apply Leave
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/leave/balances">
                  <AnimatedIcon
                    icon={CalendarDays}
                    animation="pulse"
                    className="mr-2"
                  />
                  Check Balances
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/leave/calendar">
                  <AnimatedIcon
                    icon={Calendar}
                    animation="float"
                    className="mr-2"
                  />
                  Holiday Calendar
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/leave/encashment">
                  <AnimatedIcon
                    icon={DollarSign}
                    animation="glow"
                    className="mr-2"
                  />
                  Encashment
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
