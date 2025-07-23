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
  Clock,
  Users,
  Calendar,
  MapPin,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  Fingerprint,
  Smartphone,
  Monitor,
  RotateCcw,
  FileText,
  Settings,
  Timer,
  UserCheck,
  Globe,
  Plane,
} from "lucide-react";
import { Link } from "react-router-dom";

const attendanceStats = [
  {
    label: "Present Today",
    value: 342,
    change: "89% attendance rate",
    icon: UserCheck,
    color: "text-emerald-600",
  },
  {
    label: "Late Check-ins",
    value: 12,
    change: "3% of workforce",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    label: "Overtime Hours",
    value: 145,
    change: "This week",
    icon: Timer,
    color: "text-construction-500",
  },
  {
    label: "Remote Check-ins",
    value: 89,
    change: "Geo-verified",
    icon: MapPin,
    color: "text-primary",
  },
];

const attendanceModules = [
  {
    title: "Attendance Tracking",
    description: "Biometric, web, and mobile attendance capture",
    icon: Fingerprint,
    href: "/hrms/attendance/tracking",
    color: "text-primary",
    bgColor: "bg-primary/10",
    features: [
      "Biometric integration",
      "Web-based check-in",
      "Mobile app support",
      "Real-time monitoring",
    ],
  },
  {
    title: "Shift Management",
    description: "Schedule and manage employee work shifts",
    icon: RotateCcw,
    href: "/hrms/attendance/shifts",
    color: "text-construction-500",
    bgColor: "bg-construction-500/10",
    features: [
      "Shift scheduling",
      "Rotation management",
      "Coverage tracking",
      "Shift swapping",
    ],
  },
  {
    title: "Work Schedules",
    description: "Flexible work schedule configuration",
    icon: Calendar,
    href: "/hrms/attendance/schedules",
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    features: [
      "Flexible schedules",
      "Holiday calendars",
      "Working hours setup",
      "Schedule templates",
    ],
  },
  {
    title: "Overtime Management",
    description: "Track and approve overtime hours",
    icon: Timer,
    href: "/hrms/attendance/overtime",
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    features: [
      "Overtime tracking",
      "Approval workflows",
      "Rate calculations",
      "Compliance monitoring",
    ],
  },
  {
    title: "Timesheet Management",
    description: "Digital timesheet submission and approval",
    icon: FileText,
    href: "/hrms/attendance/timesheets",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    features: [
      "Digital timesheets",
      "Project time tracking",
      "Approval workflows",
      "Export capabilities",
    ],
  },
  {
    title: "Geo-Fencing & Tracking",
    description: "Location-based attendance for remote staff",
    icon: MapPin,
    href: "/hrms/attendance/geofencing",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    features: [
      "GPS location tracking",
      "Geo-fence boundaries",
      "Remote work validation",
      "Location reports",
    ],
  },
  {
    title: "Leave Integration",
    description: "Integrated leave and attendance management",
    icon: Plane,
    href: "/hrms/attendance/leave",
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    features: [
      "Leave calendar sync",
      "Attendance impact",
      "Balance calculations",
      "Auto adjustments",
    ],
  },
];

const todayAttendance = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    department: "Engineering",
    checkIn: "08:30 AM",
    checkOut: "05:45 PM",
    status: "present",
    location: "Office",
    workHours: "9h 15m",
    overtime: "0h 15m",
  },
  {
    id: 2,
    employee: "David Park",
    department: "Operations",
    checkIn: "09:15 AM",
    checkOut: "In Progress",
    status: "late",
    location: "Remote",
    workHours: "7h 30m",
    overtime: "0h 0m",
  },
  {
    id: 3,
    employee: "Maria Rodriguez",
    department: "Sales",
    checkIn: "08:00 AM",
    checkOut: "06:30 PM",
    status: "overtime",
    location: "Office",
    workHours: "10h 30m",
    overtime: "2h 30m",
  },
  {
    id: 4,
    employee: "James Wilson",
    department: "Quality",
    checkIn: "Not Checked In",
    checkOut: "Not Checked In",
    status: "absent",
    location: "N/A",
    workHours: "0h 0m",
    overtime: "0h 0m",
  },
];

const attendanceMethods = [
  {
    method: "Biometric",
    icon: Fingerprint,
    color: "text-emerald-600",
    users: 245,
    accuracy: 99.8,
    description: "Fingerprint and facial recognition",
  },
  {
    method: "Web Portal",
    icon: Monitor,
    color: "text-blue-600",
    users: 156,
    accuracy: 95.2,
    description: "Browser-based check-in system",
  },
  {
    method: "Mobile App",
    icon: Smartphone,
    color: "text-purple-600",
    users: 189,
    accuracy: 97.4,
    description: "GPS-enabled mobile attendance",
  },
  {
    method: "Geo-Location",
    icon: Globe,
    color: "text-orange-600",
    users: 78,
    accuracy: 92.1,
    description: "Location-based remote tracking",
  },
];

export default function TimeAttendanceManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "text-emerald-600";
      case "late":
        return "text-yellow-600";
      case "overtime":
        return "text-orange-600";
      case "absent":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return CheckCircle;
      case "late":
        return Clock;
      case "overtime":
        return Timer;
      case "absent":
        return AlertTriangle;
      default:
        return Users;
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
                Time & Attendance Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Clock}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Comprehensive attendance tracking and workforce management
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
              Quick Check-in
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {attendanceStats.map((stat, index) => (
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

        {/* Attendance Modules */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Settings}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Attendance Management Modules</CardTitle>
            </div>
            <CardDescription>
              Comprehensive time tracking and workforce management tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {attendanceModules.map((module, index) => (
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

        {/* Today's Attendance Overview */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Users}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Today's Attendance</CardTitle>
              </div>
              <CardDescription>
                Real-time attendance status for all employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayAttendance.map((attendance, index) => (
                  <div
                    key={attendance.id}
                    className="flex items-center justify-between p-3 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">
                        {attendance.employee}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {attendance.department}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span>{attendance.checkIn}</span>
                        <span>→</span>
                        <span>{attendance.checkOut}</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(
                          attendance.status,
                        )}`}
                      >
                        <AnimatedIcon
                          icon={getStatusIcon(attendance.status)}
                          className="h-3 w-3 mr-1"
                        />
                        {attendance.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {attendance.workHours}
                      </p>
                      {attendance.overtime !== "0h 0m" && (
                        <p className="text-xs text-orange-600">
                          OT: {attendance.overtime}
                        </p>
                      )}
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
                  icon={Fingerprint}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Attendance Methods</CardTitle>
              </div>
              <CardDescription>
                Active check-in methods and their usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceMethods.map((method, index) => (
                  <div
                    key={method.method}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={method.icon}
                          animation="float"
                          className={method.color}
                        />
                        <h4 className="font-medium text-sm">{method.method}</h4>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <AnimatedCounter value={method.users} /> users
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {method.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span className={`font-medium ${method.color}`}>
                        {method.accuracy}%
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
                icon={Timer}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common attendance management tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/attendance/tracking">
                  <AnimatedIcon
                    icon={Fingerprint}
                    animation="bounce"
                    className="mr-2"
                  />
                  Attendance Tracking
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/attendance/shifts">
                  <AnimatedIcon
                    icon={RotateCcw}
                    animation="pulse"
                    className="mr-2"
                  />
                  Manage Shifts
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/attendance/overtime">
                  <AnimatedIcon
                    icon={Timer}
                    animation="float"
                    className="mr-2"
                  />
                  Overtime Tracking
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/attendance/geofencing">
                  <AnimatedIcon
                    icon={MapPin}
                    animation="glow"
                    className="mr-2"
                  />
                  Geo-Fencing
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
