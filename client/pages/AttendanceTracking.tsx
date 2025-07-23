import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Fingerprint,
  Monitor,
  Smartphone,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Building,
  MapPin,
  Search,
  Filter,
  Plus,
  ArrowLeft,
  TrendingUp,
  Timer,
  Calendar,
  Download,
  Eye,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const trackingStats = [
  {
    label: "Total Check-ins Today",
    value: 378,
    change: "+12 from yesterday",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Biometric Scans",
    value: 245,
    change: "65% of total",
    icon: Fingerprint,
    color: "text-primary",
  },
  {
    label: "Mobile Check-ins",
    value: 89,
    change: "24% of total",
    icon: Smartphone,
    color: "text-purple-600",
  },
  {
    label: "Web Portal Access",
    value: 44,
    change: "11% of total",
    icon: Monitor,
    color: "text-blue-600",
  },
];

const trackingMethods = [
  {
    id: 1,
    method: "Biometric Scanner",
    type: "Fingerprint",
    location: "Main Entrance",
    status: "active",
    lastSync: "2 minutes ago",
    users: 245,
    accuracy: 99.8,
    icon: Fingerprint,
    color: "text-emerald-600",
  },
  {
    id: 2,
    method: "Facial Recognition",
    type: "Biometric",
    location: "Reception Area",
    status: "active",
    lastSync: "1 minute ago",
    users: 156,
    accuracy: 98.5,
    icon: Users,
    color: "text-blue-600",
  },
  {
    id: 3,
    method: "Mobile App",
    type: "GPS-enabled",
    location: "Field Workers",
    status: "active",
    lastSync: "30 seconds ago",
    users: 89,
    accuracy: 97.2,
    icon: Smartphone,
    color: "text-purple-600",
  },
  {
    id: 4,
    method: "Web Portal",
    type: "Browser-based",
    location: "Remote Workers",
    status: "active",
    lastSync: "5 minutes ago",
    users: 44,
    accuracy: 95.1,
    icon: Monitor,
    color: "text-orange-600",
  },
];

const todayAttendance = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    empId: "EMP001",
    department: "Engineering",
    checkIn: "08:30:15",
    checkOut: "17:45:22",
    method: "Biometric",
    location: "Main Office",
    status: "present",
    workHours: "9h 15m",
    breaks: "45m",
    ipAddress: "192.168.1.45",
  },
  {
    id: 2,
    employee: "David Park",
    empId: "EMP002",
    department: "Operations",
    checkIn: "09:15:30",
    checkOut: "In Progress",
    method: "Mobile App",
    location: "Construction Site A",
    status: "present",
    workHours: "7h 30m",
    breaks: "30m",
    ipAddress: "Mobile GPS",
  },
  {
    id: 3,
    employee: "Maria Rodriguez",
    empId: "EMP003",
    department: "Sales",
    checkIn: "08:00:45",
    checkOut: "18:30:10",
    method: "Web Portal",
    location: "Home Office",
    status: "overtime",
    workHours: "10h 30m",
    breaks: "60m",
    ipAddress: "203.45.67.89",
  },
  {
    id: 4,
    employee: "James Wilson",
    empId: "EMP004",
    department: "Quality",
    checkIn: "Not Checked In",
    checkOut: "Not Checked In",
    method: "N/A",
    location: "N/A",
    status: "absent",
    workHours: "0h 0m",
    breaks: "0m",
    ipAddress: "N/A",
  },
  {
    id: 5,
    employee: "Emma Thompson",
    empId: "EMP005",
    department: "HR",
    checkIn: "08:45:20",
    checkOut: "17:15:35",
    method: "Facial Recognition",
    location: "Main Office",
    status: "present",
    workHours: "8h 30m",
    breaks: "45m",
    ipAddress: "192.168.1.67",
  },
];

export default function AttendanceTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMethod, setSelectedMethod] = useState("all");

  const filteredAttendance = todayAttendance.filter((record) => {
    const matchesSearch =
      record.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || record.status === selectedStatus;
    const matchesMethod =
      selectedMethod === "all" || record.method === selectedMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "present":
        return "default";
      case "overtime":
        return "secondary";
      case "absent":
        return "destructive";
      case "late":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return CheckCircle;
      case "overtime":
        return Timer;
      case "absent":
        return AlertTriangle;
      case "late":
        return Clock;
      default:
        return Users;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "Biometric":
        return Fingerprint;
      case "Mobile App":
        return Smartphone;
      case "Web Portal":
        return Monitor;
      case "Facial Recognition":
        return Users;
      default:
        return Clock;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "Biometric":
        return "text-emerald-600";
      case "Mobile App":
        return "text-purple-600";
      case "Web Portal":
        return "text-blue-600";
      case "Facial Recognition":
        return "text-orange-600";
      default:
        return "text-muted-foreground";
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
                Attendance Tracking
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Fingerprint}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Multi-method attendance capture and real-time monitoring
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
              Export Data
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Manual Entry
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {trackingStats.map((stat, index) => (
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

        {/* Tracking Methods */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Fingerprint}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Active Tracking Methods</CardTitle>
            </div>
            <CardDescription>
              Status and performance of attendance capture systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {trackingMethods.map((method, index) => (
                <Card
                  key={method.id}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AnimatedIcon
                            icon={method.icon}
                            animation="float"
                            className={method.color}
                          />
                          <h4 className="font-semibold text-sm">
                            {method.method}
                          </h4>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {method.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {method.type}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          📍 {method.location}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Users:</span>
                          <span className="font-medium ml-1">
                            <AnimatedCounter value={method.users} />
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Accuracy:
                          </span>
                          <span className={`font-medium ml-1 ${method.color}`}>
                            {method.accuracy}%
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last sync: {method.lastSync}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters & Search */}
        <Card className="animate-slideInUp">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by employee name, ID, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="overtime">Overtime</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                <SelectTrigger className="w-full md:w-40">
                  <Fingerprint className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="Biometric">Biometric</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="Web Portal">Web Portal</SelectItem>
                  <SelectItem value="Facial Recognition">
                    Facial Recognition
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Today's Attendance Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Users}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Today's Attendance Records</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredAttendance.length} /> employees
              </Badge>
            </div>
            <CardDescription>
              Real-time attendance tracking with detailed check-in/out data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Check In/Out</TableHead>
                  <TableHead>Method & Location</TableHead>
                  <TableHead>Work Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map((record, index) => (
                  <TableRow
                    key={record.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{record.employee}</p>
                        <p className="text-xs text-muted-foreground">
                          ID: {record.empId}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {record.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-emerald-600" />
                          <span className="text-sm font-medium">
                            {record.checkIn}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Timer className="h-3 w-3 text-red-500" />
                          <span className="text-sm">{record.checkOut}</span>
                        </div>
                        {record.breaks !== "0m" && (
                          <p className="text-xs text-muted-foreground">
                            Breaks: {record.breaks}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {record.method !== "N/A" && (
                          <div className="flex items-center gap-1">
                            <AnimatedIcon
                              icon={getMethodIcon(record.method)}
                              className={`h-3 w-3 ${getMethodColor(
                                record.method,
                              )}`}
                            />
                            <span className="text-sm">{record.method}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {record.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {record.workHours}
                        </p>
                        {record.status === "overtime" && (
                          <Badge variant="outline" className="text-xs">
                            Overtime
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(record.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {record.status === "present" &&
                          record.checkOut === "In Progress" && (
                            <PulsingDot className="scale-50" />
                          )}
                        <AnimatedIcon
                          icon={getStatusIcon(record.status)}
                          className="h-3 w-3"
                        />
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Globe className="h-3 w-3 text-muted-foreground" />
                          <span className="font-mono">{record.ipAddress}</span>
                        </div>
                        {record.method !== "N/A" && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={Eye} className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={Download} className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
