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
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  Plane,
  FileText,
  UserX,
  AlertCircle,
  Settings,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

const leaveStats = [
  {
    label: "On Leave Today",
    value: 23,
    change: "6% of workforce",
    icon: UserX,
    color: "text-blue-600",
  },
  {
    label: "Pending Requests",
    value: 15,
    change: "4 need approval",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    label: "This Week's Impact",
    value: 127,
    change: "Total hours",
    icon: CalendarDays,
    color: "text-construction-500",
  },
  {
    label: "Auto-Adjusted",
    value: 89,
    change: "Attendance records",
    icon: RefreshCw,
    color: "text-emerald-600",
  },
];

const leaveCategories = [
  {
    type: "Annual Leave",
    count: 8,
    impact: "64 hours",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    percentage: 35,
  },
  {
    type: "Sick Leave",
    count: 5,
    impact: "40 hours",
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    percentage: 22,
  },
  {
    type: "Personal Leave",
    count: 6,
    impact: "48 hours",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    percentage: 26,
  },
  {
    type: "Emergency Leave",
    count: 4,
    impact: "32 hours",
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    percentage: 17,
  },
];

const attendanceImpact = [
  {
    date: "Today",
    scheduled: 384,
    present: 342,
    onLeave: 23,
    absent: 19,
    attendance: 89.1,
    leaveImpact: 6.0,
  },
  {
    date: "Yesterday",
    scheduled: 384,
    present: 356,
    onLeave: 18,
    absent: 10,
    attendance: 92.7,
    leaveImpact: 4.7,
  },
  {
    date: "This Week",
    scheduled: 1920,
    present: 1678,
    onLeave: 127,
    absent: 115,
    attendance: 87.4,
    leaveImpact: 6.6,
  },
  {
    date: "This Month",
    scheduled: 7680,
    present: 6834,
    onLeave: 445,
    absent: 401,
    attendance: 89.0,
    leaveImpact: 5.8,
  },
];

const upcomingLeaves = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    department: "Engineering",
    type: "Annual Leave",
    startDate: "2024-01-15",
    endDate: "2024-01-19",
    days: 5,
    status: "approved",
    replacement: "David Park",
  },
  {
    id: 2,
    employee: "Maria Rodriguez",
    department: "Sales",
    type: "Sick Leave",
    startDate: "2024-01-14",
    endDate: "2024-01-16",
    days: 3,
    status: "approved",
    replacement: "James Wilson",
  },
  {
    id: 3,
    employee: "John Chen",
    department: "Operations",
    type: "Personal Leave",
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    days: 3,
    status: "pending",
    replacement: "TBD",
  },
  {
    id: 4,
    employee: "Lisa Anderson",
    department: "Quality",
    type: "Emergency Leave",
    startDate: "2024-01-18",
    endDate: "2024-01-18",
    days: 1,
    status: "approved",
    replacement: "Alex Kumar",
  },
];

const integrationFeatures = [
  {
    title: "Real-time Sync",
    description: "Leave calendar automatically syncs with attendance system",
    icon: RefreshCw,
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
  },
  {
    title: "Auto Adjustments",
    description:
      "Attendance records automatically adjusted for approved leaves",
    icon: Settings,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
  },
  {
    title: "Impact Analytics",
    description: "Track how leaves affect overall attendance and productivity",
    icon: BarChart3,
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
  },
  {
    title: "Balance Tracking",
    description: "Real-time leave balance calculations and notifications",
    icon: CalendarDays,
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
  },
];

export default function LeaveIntegration() {
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
        return AlertCircle;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="animate-slideInDown">
          <Button variant="ghost" size="sm" asChild className="hover-lift">
            <Link to="/hrms/attendance">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Time & Attendance
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Leave Integration
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
                Integrated leave and attendance management system
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

        {/* Integration Features */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={RefreshCw}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Integration Features</CardTitle>
            </div>
            <CardDescription>
              How leave management integrates with attendance tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {integrationFeatures.map((feature, index) => (
                <Card
                  key={feature.title}
                  className="hover-lift animate-scaleIn relative overflow-hidden group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                          <AnimatedIcon
                            icon={feature.icon}
                            animation="bounce"
                            className={feature.color}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">
                            {feature.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leave Categories & Attendance Impact */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={CalendarDays}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Leave Categories Today</CardTitle>
              </div>
              <CardDescription>
                Breakdown of current leave types and their impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveCategories.map((category, index) => (
                  <div
                    key={category.type}
                    className="space-y-2 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${category.bgColor}`}
                        >
                          <PulsingDot className={category.color} />
                        </div>
                        <span className="text-sm font-medium">
                          {category.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold">
                          {category.count}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({category.impact})
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${category.bgColor.replace(
                          "/10",
                          "",
                        )}`}
                        style={{ width: `${category.percentage}%` }}
                      />
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
                  icon={BarChart3}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Attendance Impact Analysis</CardTitle>
              </div>
              <CardDescription>
                How leaves affect overall attendance rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceImpact.map((period, index) => (
                  <div
                    key={period.date}
                    className="p-3 border rounded-lg animate-scaleIn space-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{period.date}</h4>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs text-emerald-600"
                        >
                          {period.attendance}%
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-muted-foreground">Present</p>
                        <p className="font-medium">{period.present}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">On Leave</p>
                        <p className="font-medium text-blue-600">
                          {period.onLeave}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Leave Impact:
                      </span>
                      <span className="font-medium text-orange-600">
                        {period.leaveImpact}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Leaves */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Calendar}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Upcoming Leaves</CardTitle>
            </div>
            <CardDescription>
              Approved and pending leave requests affecting attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">
                      Employee
                    </th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">
                      Type
                    </th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">
                      Dates
                    </th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">
                      Days
                    </th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">
                      Replacement
                    </th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingLeaves.map((leave, index) => (
                    <tr
                      key={leave.id}
                      className="border-b hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="p-2">
                        <div>
                          <p className="font-medium text-sm">
                            {leave.employee}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {leave.department}
                          </p>
                        </div>
                      </td>
                      <td className="p-2">
                        <Badge variant="outline" className="text-xs">
                          {leave.type}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="text-xs">
                          <p>{leave.startDate}</p>
                          <p className="text-muted-foreground">
                            to {leave.endDate}
                          </p>
                        </div>
                      </td>
                      <td className="p-2">
                        <span className="text-sm font-medium">
                          {leave.days}
                        </span>
                      </td>
                      <td className="p-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(leave.status)}`}
                        >
                          <AnimatedIcon
                            icon={getStatusIcon(leave.status)}
                            className="h-3 w-3 mr-1"
                          />
                          {leave.status}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <span className="text-xs text-muted-foreground">
                          {leave.replacement}
                        </span>
                      </td>
                      <td className="p-2">
                        <Button size="sm" variant="ghost" className="text-xs">
                          <AnimatedIcon icon={Eye} className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              Common leave and attendance integration tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                Apply for Leave
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Calendar}
                  animation="pulse"
                  className="mr-2"
                />
                View Leave Calendar
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={BarChart3}
                  animation="float"
                  className="mr-2"
                />
                Impact Analysis
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={RefreshCw}
                  animation="glow"
                  className="mr-2"
                />
                Sync Attendance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
