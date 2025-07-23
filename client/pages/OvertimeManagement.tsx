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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Timer,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Users,
  Building,
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  ArrowLeft,
  TrendingUp,
  Eye,
  Edit,
  X,
  Download,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const overtimeStats = [
  {
    label: "Total OT Hours",
    value: 450,
    change: "This month",
    icon: Timer,
    color: "text-primary",
  },
  {
    label: "Pending Approvals",
    value: 23,
    change: "Awaiting review",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    label: "OT Cost",
    value: 12500,
    change: "Monthly expense",
    icon: DollarSign,
    color: "text-construction-500",
  },
  {
    label: "Compliance Rate",
    value: 98,
    change: "% within limits",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
];

const overtimeRequests = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    empId: "EMP001",
    department: "Engineering",
    requestDate: "2024-01-15",
    workDate: "2024-01-20",
    startTime: "17:00",
    endTime: "21:00",
    duration: 4.0,
    reason: "Project deadline completion",
    status: "approved",
    approver: "John Smith",
    rate: 45.0,
    cost: 180.0,
    justification: "Critical project milestone",
  },
  {
    id: 2,
    employee: "David Park",
    empId: "EMP002",
    department: "Operations",
    requestDate: "2024-01-16",
    workDate: "2024-01-21",
    startTime: "18:00",
    endTime: "22:00",
    duration: 4.0,
    reason: "Emergency maintenance",
    status: "pending",
    approver: "Emily Johnson",
    rate: 38.5,
    cost: 154.0,
    justification: "Equipment breakdown requires immediate attention",
  },
  {
    id: 3,
    employee: "Maria Rodriguez",
    empId: "EMP003",
    department: "Sales",
    requestDate: "2024-01-14",
    workDate: "2024-01-19",
    startTime: "19:00",
    endTime: "23:00",
    duration: 4.0,
    reason: "Client presentation preparation",
    status: "rejected",
    approver: "Michael Brown",
    rate: 42.0,
    cost: 168.0,
    justification: "Not business critical",
  },
  {
    id: 4,
    employee: "James Wilson",
    empId: "EMP004",
    department: "Quality",
    requestDate: "2024-01-17",
    workDate: "2024-01-22",
    startTime: "16:00",
    endTime: "20:00",
    duration: 4.0,
    reason: "Quality audit preparation",
    status: "pending",
    approver: "Lisa Chen",
    rate: 35.0,
    cost: 140.0,
    justification: "Audit compliance requirements",
  },
  {
    id: 5,
    employee: "Emma Thompson",
    empId: "EMP005",
    department: "HR",
    requestDate: "2024-01-13",
    workDate: "2024-01-18",
    startTime: "17:30",
    endTime: "21:30",
    duration: 4.0,
    reason: "Recruitment drive support",
    status: "approved",
    approver: "Robert Davis",
    rate: 40.0,
    cost: 160.0,
    justification: "Approved for hiring targets",
  },
];

const overtimeCategories = [
  {
    category: "Project Work",
    hours: 180,
    cost: 7200,
    count: 12,
    avgRate: 40.0,
    color: "text-blue-600",
  },
  {
    category: "Emergency",
    hours: 120,
    cost: 4800,
    count: 8,
    avgRate: 40.0,
    color: "text-red-600",
  },
  {
    category: "Maintenance",
    hours: 96,
    cost: 3600,
    count: 6,
    avgRate: 37.5,
    color: "text-orange-600",
  },
  {
    category: "Training",
    hours: 54,
    cost: 2160,
    count: 3,
    avgRate: 40.0,
    color: "text-emerald-600",
  },
];

export default function OvertimeManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredRequests = overtimeRequests.filter((request) => {
    const matchesSearch =
      request.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || request.status === selectedStatus;
    const matchesDepartment =
      selectedDepartment === "all" || request.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return CheckCircle;
      case "pending":
        return Clock;
      case "rejected":
        return X;
      default:
        return Timer;
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
                Overtime Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Timer}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Track, approve, and manage employee overtime hours and costs
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
              Request Overtime
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {overtimeStats.map((stat, index) => (
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
                  {stat.label.includes("Cost") && "$"}
                  <AnimatedCounter value={stat.value} />
                  {stat.label.includes("Rate") && (
                    <span className="text-sm font-normal">%</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overtime Categories */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Timer}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Overtime by Category</CardTitle>
            </div>
            <CardDescription>
              Breakdown of overtime hours and costs by work category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {overtimeCategories.map((category, index) => (
                <Card
                  key={category.category}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">
                          {category.category}
                        </h4>
                        <Badge variant="outline" className={category.color}>
                          {category.count} requests
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Hours:</span>
                          <span className="font-medium">
                            <AnimatedCounter value={category.hours} />h
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Cost:</span>
                          <span className="font-medium">
                            $<AnimatedCounter value={category.cost} />
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Avg Rate:
                          </span>
                          <span className="font-medium">
                            ${category.avgRate}/hr
                          </span>
                        </div>
                      </div>
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
                    placeholder="Search by employee, ID, or reason..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger className="w-full md:w-40">
                  <Building className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Quality">Quality</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Overtime Requests Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Users}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Overtime Requests</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredRequests.length} /> requests
              </Badge>
            </div>
            <CardDescription>
              Employee overtime requests with approval status and cost tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Work Details</TableHead>
                  <TableHead>Duration & Cost</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Approver</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request, index) => (
                  <TableRow
                    key={request.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {request.employee}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {request.empId}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {request.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{request.workDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>
                            {request.startTime} - {request.endTime}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Requested: {request.requestDate}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Timer className="h-3 w-3 text-primary" />
                          <span className="font-medium text-sm">
                            {request.duration}h
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-emerald-600" />
                          <span className="font-medium text-sm">
                            ${request.cost}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Rate: ${request.rate}/hr
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{request.reason}</p>
                        <p className="text-xs text-muted-foreground">
                          {request.justification}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(request.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {request.status === "pending" && (
                          <PulsingDot className="scale-50" />
                        )}
                        <AnimatedIcon
                          icon={getStatusIcon(request.status)}
                          className="h-3 w-3"
                        />
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <UserCheck className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{request.approver}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover-lift"
                          >
                            <AnimatedIcon
                              icon={MoreHorizontal}
                              className="h-4 w-4"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <AnimatedIcon icon={Eye} className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {request.status === "pending" && (
                            <>
                              <DropdownMenuItem>
                                <AnimatedIcon
                                  icon={CheckCircle}
                                  className="mr-2 h-4 w-4"
                                />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AnimatedIcon
                                  icon={X}
                                  className="mr-2 h-4 w-4"
                                />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Edit}
                              className="mr-2 h-4 w-4"
                            />
                            Edit Request
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
