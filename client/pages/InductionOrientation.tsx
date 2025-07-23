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
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Plus,
  ArrowLeft,
  TrendingUp,
  Building,
  GraduationCap,
  Coffee,
  BookOpen,
  Video,
  MapPin,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const orientationStats = [
  {
    label: "Scheduled Sessions",
    value: 12,
    change: "+3 this week",
    icon: Calendar,
    color: "text-primary",
  },
  {
    label: "Completed Orientations",
    value: 45,
    change: "This month",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "New Hires Pending",
    value: 8,
    change: "Awaiting orientation",
    icon: Users,
    color: "text-yellow-500",
  },
  {
    label: "Avg Completion Rate",
    value: 95,
    change: "% attendance",
    icon: TrendingUp,
    color: "text-construction-500",
  },
];

const orientationPrograms = [
  {
    id: 1,
    title: "Company Overview & Culture",
    description: "Mission, vision, values, and company history",
    duration: "2 hours",
    presenter: "CEO & Leadership Team",
    location: "Main Conference Room",
    capacity: 20,
    type: "mandatory",
    icon: Building,
  },
  {
    id: 2,
    title: "Department Introduction",
    description: "Team introductions and role-specific training",
    duration: "1.5 hours",
    presenter: "Department Managers",
    location: "Department Offices",
    capacity: 8,
    type: "department",
    icon: Users,
  },
  {
    id: 3,
    title: "Safety & Compliance Training",
    description: "Workplace safety, OSHA standards, and compliance",
    duration: "3 hours",
    presenter: "Safety Coordinator",
    location: "Training Center",
    capacity: 15,
    type: "mandatory",
    icon: GraduationCap,
  },
  {
    id: 4,
    title: "Policy & Procedures Briefing",
    description: "HR policies, code of conduct, and procedures",
    duration: "1 hour",
    presenter: "HR Team",
    location: "HR Conference Room",
    capacity: 12,
    type: "mandatory",
    icon: BookOpen,
  },
  {
    id: 5,
    title: "IT Systems Training",
    description: "Software, tools, and technology orientation",
    duration: "2 hours",
    presenter: "IT Department",
    location: "Computer Lab",
    capacity: 10,
    type: "technical",
    icon: Video,
  },
  {
    id: 6,
    title: "Welcome Coffee & Networking",
    description: "Informal meet and greet with colleagues",
    duration: "1 hour",
    presenter: "Social Committee",
    location: "Cafeteria",
    capacity: 25,
    type: "social",
    icon: Coffee,
  },
];

const scheduledOrientations = [
  {
    id: 1,
    employeeName: "Sarah Mitchell",
    department: "Engineering",
    position: "Senior Developer",
    startDate: "2024-01-15",
    orientationDate: "2024-01-16",
    status: "scheduled",
    completedSessions: 2,
    totalSessions: 6,
    nextSession: "Safety Training",
    nextSessionTime: "2024-01-17 09:00",
  },
  {
    id: 2,
    employeeName: "David Park",
    department: "Operations",
    position: "Operations Manager",
    startDate: "2024-01-14",
    orientationDate: "2024-01-15",
    status: "in_progress",
    completedSessions: 4,
    totalSessions: 6,
    nextSession: "IT Systems Training",
    nextSessionTime: "2024-01-18 14:00",
  },
  {
    id: 3,
    employeeName: "Maria Rodriguez",
    department: "Sales",
    position: "Sales Representative",
    startDate: "2024-01-18",
    orientationDate: "2024-01-19",
    status: "completed",
    completedSessions: 6,
    totalSessions: 6,
    nextSession: "Completed",
    nextSessionTime: null,
  },
];

export default function InductionOrientation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOrientations = scheduledOrientations.filter((orientation) => {
    const matchesSearch =
      orientation.employeeName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      orientation.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orientation.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || orientation.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "in_progress":
        return "secondary";
      case "scheduled":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in_progress":
        return Clock;
      case "scheduled":
        return Calendar;
      default:
        return Users;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "mandatory":
        return "text-red-600";
      case "department":
        return "text-blue-600";
      case "technical":
        return "text-purple-600";
      case "social":
        return "text-emerald-600";
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
            <Link to="/hrms/onboarding">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Onboarding & Offboarding
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Induction & Orientation
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Calendar}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Structured orientation program scheduling and management
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={Calendar}
                animation="bounce"
                className="mr-2"
              />
              View Calendar
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Schedule Orientation
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {orientationStats.map((stat, index) => (
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

        {/* Orientation Programs */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={GraduationCap}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Orientation Programs</CardTitle>
            </div>
            <CardDescription>
              Standard orientation sessions for new employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {orientationPrograms.map((program, index) => (
                <Card
                  key={program.id}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AnimatedIcon
                            icon={program.icon}
                            animation="float"
                            className="text-primary"
                          />
                          <h4 className="font-semibold text-sm">
                            {program.title}
                          </h4>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getTypeColor(program.type)}`}
                        >
                          {program.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {program.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <span className="font-medium ml-1">
                            {program.duration}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Capacity:
                          </span>
                          <span className="font-medium ml-1">
                            {program.capacity}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <UserCheck className="h-3 w-3 text-muted-foreground" />
                          <span>{program.presenter}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>{program.location}</span>
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
                    placeholder="Search by employee, department, or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Orientations */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Users}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Scheduled Orientations</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredOrientations.length} />{" "}
                employees
              </Badge>
            </div>
            <CardDescription>
              Track orientation progress for new hires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Next Session</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrientations.map((orientation, index) => (
                  <TableRow
                    key={orientation.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {orientation.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {orientation.position}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {orientation.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(orientation.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {orientation.status === "in_progress" && (
                          <PulsingDot className="scale-50" />
                        )}
                        <AnimatedIcon
                          icon={getStatusIcon(orientation.status)}
                          className="h-3 w-3"
                        />
                        {orientation.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">
                          {orientation.completedSessions}/
                          {orientation.totalSessions} sessions
                        </p>
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div
                            className="h-2 bg-primary rounded-full transition-all duration-500"
                            style={{
                              width: `${
                                (orientation.completedSessions /
                                  orientation.totalSessions) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {orientation.nextSession}
                        </p>
                        {orientation.nextSessionTime && (
                          <p className="text-xs text-muted-foreground">
                            {orientation.nextSessionTime}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>Started: {orientation.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-primary">
                          <GraduationCap className="h-3 w-3" />
                          <span>
                            Orientation: {orientation.orientationDate}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={Calendar} className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon
                            icon={CheckCircle}
                            className="h-3 w-3"
                          />
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
