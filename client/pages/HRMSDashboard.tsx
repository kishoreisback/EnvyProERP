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
import { Progress } from "@/components/ui/progress";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Users,
  UserCheck,
  Clock,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  FileText,
  DollarSign,
  Award,
  Star,
  Zap,
  Building,
  ArrowLeft,
  UserPlus,
  ClipboardCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { Link } from "react-router-dom";

const hrMetrics = [
  {
    label: "Total Employees",
    value: 156,
    change: "+12 this month",
    icon: Users,
    color: "text-primary",
  },
  {
    label: "Active Projects",
    value: 24,
    change: "8 new assignments",
    icon: Building,
    color: "text-construction-500",
  },
  {
    label: "Pending Approvals",
    value: 8,
    change: "Requires attention",
    icon: ClipboardCheck,
    color: "text-safety-600",
  },
  {
    label: "Monthly Payroll",
    value: 485000,
    change: "+5.2% from last month",
    icon: DollarSign,
    color: "text-emerald-600",
  },
];

const attendanceData = [
  { day: "Mon", present: 142, absent: 14, late: 8 },
  { day: "Tue", present: 145, absent: 11, late: 6 },
  { day: "Wed", present: 148, absent: 8, late: 4 },
  { day: "Thu", present: 151, absent: 5, late: 3 },
  { day: "Fri", present: 149, absent: 7, late: 5 },
  { day: "Sat", present: 89, absent: 67, late: 2 },
];

const departmentData = [
  { name: "Engineering", employees: 45, color: "#2563eb" },
  { name: "Operations", employees: 38, color: "#059669" },
  { name: "Safety", employees: 28, color: "#dc2626" },
  { name: "Admin", employees: 25, color: "#7c3aed" },
  { name: "Quality", employees: 20, color: "#ea580c" },
];

const pendingApprovals = [
  {
    id: 1,
    type: "Leave Request",
    employee: "Sarah Johnson",
    department: "Engineering",
    date: "Dec 25-27, 2024",
    priority: "normal",
    status: "pending",
  },
  {
    id: 2,
    type: "Overtime Claim",
    employee: "Mike Chen",
    department: "Operations",
    date: "Week of Dec 16",
    priority: "high",
    status: "pending",
  },
  {
    id: 3,
    type: "Training Request",
    employee: "Emma Wilson",
    department: "Safety",
    date: "Safety Certification",
    priority: "medium",
    status: "pending",
  },
];

const recentActivities = [
  {
    id: 1,
    activity: "New employee onboarded",
    employee: "Alex Rodriguez",
    department: "Engineering",
    time: "2 hours ago",
    type: "new_hire",
  },
  {
    id: 2,
    activity: "Leave approved",
    employee: "Lisa Chang",
    department: "Operations",
    time: "4 hours ago",
    type: "approval",
  },
  {
    id: 3,
    activity: "Training completed",
    employee: "David Kumar",
    department: "Safety",
    time: "1 day ago",
    type: "training",
  },
  {
    id: 4,
    activity: "Performance review submitted",
    employee: "Maria Santos",
    department: "Quality",
    time: "2 days ago",
    type: "performance",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Monthly Performance Reviews",
    date: "Dec 28, 2024",
    department: "All Departments",
    type: "review",
  },
  {
    id: 2,
    title: "Safety Training Session",
    date: "Jan 5, 2025",
    department: "Operations",
    type: "training",
  },
  {
    id: 3,
    title: "New Hire Orientation",
    date: "Jan 8, 2025",
    department: "HR",
    type: "orientation",
  },
];

export default function HRMSDashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="flex items-center gap-4 animate-slideInLeft">
          <Button variant="outline" className="hover-lift" asChild>
            <Link to="/hrms">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to HRMS
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                HRMS Dashboard
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={UserCheck}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Human Resource Management System Overview
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={FileText}
                animation="bounce"
                className="mr-2"
              />
              Generate Report
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
              <AnimatedIcon
                icon={UserPlus}
                animation="bounce"
                className="mr-2"
              />
              Add Employee
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {hrMetrics.map((metric, index) => (
            <Card
              key={index}
              className="hover-lift animate-fadeInUp relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                  <AnimatedIcon
                    icon={metric.icon}
                    animation="float"
                    className={metric.color}
                  />
                </div>
                <div className="text-2xl font-bold">
                  {metric.label === "Monthly Payroll" ? (
                    <AnimatedCounter value={485} prefix="$" suffix="K" />
                  ) : (
                    <AnimatedCounter value={metric.value} />
                  )}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {metric.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Clock}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Weekly Attendance Overview</CardTitle>
              </div>
              <CardDescription>
                Employee attendance patterns this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="present"
                    fill="#059669"
                    name="Present"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="late"
                    fill="#f59e0b"
                    name="Late"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="absent"
                    fill="#dc2626"
                    name="Absent"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slideInRight relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-construction-500/10 to-transparent rounded-full -translate-y-16 -translate-x-16" />
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Building}
                  animation="bounce"
                  className="text-construction-500"
                />
                <CardTitle>Department Distribution</CardTitle>
              </div>
              <CardDescription>
                Employee distribution across departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="employees"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} employees`, ""]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {departmentData.map((dept) => (
                  <div
                    key={dept.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-sm"
                        style={{ backgroundColor: dept.color }}
                      />
                      {dept.name}
                    </div>
                    <span className="font-medium">{dept.employees}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Approvals and Activities */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover-lift animate-fadeInUp relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-safety-500/5 to-transparent" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={ClipboardCheck}
                    animation="bounce"
                    className="text-safety-600"
                  />
                  <CardTitle>Pending Approvals</CardTitle>
                </div>
                <Badge variant="destructive" className="animate-pulse">
                  {pendingApprovals.length}
                </Badge>
              </div>
              <CardDescription>Items requiring your approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingApprovals.map((approval, index) => (
                  <div
                    key={approval.id}
                    className="flex items-start justify-between p-3 border rounded-lg animate-scaleIn hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{approval.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {approval.employee} • {approval.department}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {approval.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0"
                      >
                        <AnimatedIcon
                          icon={CheckCircle}
                          size="sm"
                          className="text-emerald-600"
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0"
                      >
                        <AnimatedIcon
                          icon={X}
                          size="sm"
                          className="text-red-600"
                        />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp relative overflow-hidden"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Clock}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Recent Activities</CardTitle>
              </div>
              <CardDescription>
                Latest HR activities and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 animate-slideInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      {activity.type === "new_hire" && (
                        <AnimatedIcon
                          icon={UserPlus}
                          animation="bounce"
                          className="text-primary"
                          size="sm"
                        />
                      )}
                      {activity.type === "approval" && (
                        <AnimatedIcon
                          icon={CheckCircle}
                          animation="glow"
                          className="text-emerald-600"
                          size="sm"
                        />
                      )}
                      {activity.type === "training" && (
                        <AnimatedIcon
                          icon={Award}
                          animation="float"
                          className="text-construction-500"
                          size="sm"
                        />
                      )}
                      {activity.type === "performance" && (
                        <AnimatedIcon
                          icon={Star}
                          animation="pulse"
                          className="text-yellow-500"
                          size="sm"
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.activity}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.employee} • {activity.department}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp relative overflow-hidden"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 to-transparent" />
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Calendar}
                  animation="bounce"
                  className="text-construction-500"
                />
                <CardTitle>Upcoming Events</CardTitle>
              </div>
              <CardDescription>
                Scheduled HR events and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="p-3 border rounded-lg animate-scaleIn hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {event.department}
                        </Badge>
                        <Badge
                          variant={
                            event.type === "review"
                              ? "default"
                              : event.type === "training"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {event.type}
                        </Badge>
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
                icon={Zap}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>Common HR tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={UserPlus}
                  animation="bounce"
                  className="mr-2"
                />
                Add Employee
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={FileText}
                  animation="pulse"
                  className="mr-2"
                />
                Generate Payroll
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Award} animation="float" className="mr-2" />
                Performance Review
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Calendar}
                  animation="glow"
                  className="mr-2"
                />
                Schedule Training
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
