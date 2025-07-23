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
import { Progress } from "@/components/ui/progress";
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
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Building,
  Calendar,
  Award,
  Briefcase,
  Shield,
  GraduationCap,
  Settings,
  Users,
  Plus,
  TrendingUp,
  Download,
  Mail,
  PlayCircle,
  Target,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const onboardingStats = [
  {
    label: "Active Onboarding",
    value: 8,
    change: "+3 new hires",
    icon: UserPlus,
    color: "text-primary",
  },
  {
    label: "Pending Tasks",
    value: 24,
    change: "Across all employees",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    label: "Completed This Month",
    value: 12,
    change: "100% completion rate",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Avg Completion Time",
    value: 7.5,
    change: "days",
    icon: TrendingUp,
    color: "text-construction-500",
  },
];

const onboardingCases = [
  {
    id: 1,
    employeeName: "Sarah Mitchell",
    position: "Senior Project Manager",
    department: "Construction",
    startDate: "2024-01-15",
    status: "in_progress",
    completionRate: 75,
    currentStep: "IT Setup",
    buddy: "John Smith",
    daysElapsed: 5,
    totalTasks: 20,
    completedTasks: 15,
    nextDeadline: "2024-01-20",
    priority: "high",
  },
  {
    id: 2,
    employeeName: "David Park",
    position: "Site Supervisor",
    department: "Operations",
    startDate: "2024-01-08",
    status: "completed",
    completionRate: 100,
    currentStep: "Final Review",
    buddy: "Emily Johnson",
    daysElapsed: 12,
    totalTasks: 18,
    completedTasks: 18,
    nextDeadline: "Completed",
    priority: "medium",
  },
  {
    id: 3,
    employeeName: "Maria Rodriguez",
    position: "Safety Coordinator",
    department: "Safety & Compliance",
    startDate: "2024-01-20",
    status: "not_started",
    completionRate: 0,
    currentStep: "Documentation Review",
    buddy: "Michael Brown",
    daysElapsed: 0,
    totalTasks: 16,
    completedTasks: 0,
    nextDeadline: "2024-01-22",
    priority: "medium",
  },
  {
    id: 4,
    employeeName: "James Wilson",
    position: "QA Inspector",
    department: "Quality Control",
    startDate: "2024-01-12",
    status: "delayed",
    completionRate: 45,
    currentStep: "Safety Training",
    buddy: "Lisa Chen",
    daysElapsed: 8,
    totalTasks: 14,
    completedTasks: 6,
    nextDeadline: "2024-01-18",
    priority: "high",
  },
  {
    id: 5,
    employeeName: "Emma Thompson",
    position: "Project Engineer",
    department: "Engineering",
    startDate: "2024-01-18",
    status: "in_progress",
    completionRate: 30,
    currentStep: "Department Orientation",
    buddy: "Robert Davis",
    daysElapsed: 2,
    totalTasks: 22,
    completedTasks: 7,
    nextDeadline: "2024-01-25",
    priority: "medium",
  },
];

const onboardingSteps = [
  {
    category: "Pre-Boarding",
    steps: [
      "Welcome Email & Package",
      "System Account Creation",
      "Equipment Ordering",
      "Workspace Setup",
    ],
    icon: Mail,
    color: "text-blue-600",
  },
  {
    category: "Day 1 - Arrival",
    steps: [
      "Office Tour & Introduction",
      "Document Verification",
      "Badge & Key Assignment",
      "IT Setup & Access",
    ],
    icon: Building,
    color: "text-emerald-600",
  },
  {
    category: "Week 1 - Orientation",
    steps: [
      "Company Overview",
      "Department Orientation",
      "Safety Training",
      "Policy Review",
    ],
    icon: GraduationCap,
    color: "text-yellow-600",
  },
  {
    category: "Week 2-4 - Integration",
    steps: [
      "Role-Specific Training",
      "Mentor Assignment",
      "Project Introduction",
      "Performance Expectations",
    ],
    icon: Target,
    color: "text-purple-600",
  },
  {
    category: "30/60/90 Days",
    steps: [
      "Check-in Meetings",
      "Feedback Sessions",
      "Goal Setting",
      "Performance Review",
    ],
    icon: Calendar,
    color: "text-construction-500",
  },
];

export default function OnboardingWorkflow() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredCases = onboardingCases.filter((case_) => {
    const matchesSearch =
      case_.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.buddy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || case_.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "in_progress":
        return "secondary";
      case "delayed":
        return "destructive";
      case "not_started":
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
      case "delayed":
        return AlertTriangle;
      case "not_started":
        return PlayCircle;
      default:
        return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-emerald-500";
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
            <Link to="/hrms/recruitment">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Recruitment Modules
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Onboarding Workflow
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={UserPlus}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Comprehensive new hire integration and task management
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={Settings}
                animation="bounce"
                className="mr-2"
              />
              Workflow Settings
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Start Onboarding
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {onboardingStats.map((stat, index) => (
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
                  {stat.label.includes("Avg") && (
                    <span className="text-sm font-normal ml-1">days</span>
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

        {/* Quick Actions */}
        <Card className="animate-slideInUp">
          <CardContent className="p-4">
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                New Employee Setup
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={FileText}
                  animation="pulse"
                  className="mr-2"
                />
                Workflow Templates
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Users} animation="float" className="mr-2" />
                Assign Buddies
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Download}
                  animation="glow"
                  className="mr-2"
                />
                Progress Reports
              </Button>
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
                    placeholder="Search by employee name, position, department, or buddy..."
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
                  <SelectItem value="not_started">Not Started</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Onboarding Cases Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={UserPlus}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Active Onboarding Cases</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredCases.length} /> employees
              </Badge>
            </div>
            <CardDescription>
              Track new hire progress through structured onboarding workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Current Step</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Buddy</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((case_, index) => (
                  <TableRow
                    key={case_.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {case_.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {case_.position}
                        </p>
                        <div className="flex items-center gap-1">
                          <Building className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {case_.department}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className={`h-2 w-2 rounded-full ${getPriorityColor(
                              case_.priority,
                            )} opacity-75`}
                          />
                          <span className="text-xs text-muted-foreground capitalize">
                            {case_.priority} priority
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(case_.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {case_.status === "in_progress" && (
                          <PulsingDot className="scale-50" />
                        )}
                        <AnimatedIcon
                          icon={getStatusIcon(case_.status)}
                          className="h-3 w-3"
                        />
                        {case_.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={case_.completionRate}
                            className="w-20"
                          />
                          <span className="text-sm font-medium">
                            {case_.completionRate}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {case_.completedTasks}/{case_.totalTasks} tasks
                          complete
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {case_.currentStep}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Current milestone
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>Started: {case_.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>Day {case_.daysElapsed}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Target className="h-3 w-3" />
                          <span>Due: {case_.nextDeadline}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{case_.buddy}</span>
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
                            View Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Send}
                              className="mr-2 h-4 w-4"
                            />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Settings}
                              className="mr-2 h-4 w-4"
                            />
                            Update Tasks
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Download}
                              className="mr-2 h-4 w-4"
                            />
                            Generate Report
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

        {/* Onboarding Steps Overview */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Zap}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Onboarding Workflow</CardTitle>
            </div>
            <CardDescription>
              Structured integration process for new hires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-5">
              {onboardingSteps.map((phase, index) => (
                <Card
                  key={phase.category}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={phase.icon}
                          animation="float"
                          className={phase.color}
                        />
                        <h4 className="font-semibold text-sm">
                          {phase.category}
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {phase.steps.map((step, stepIndex) => (
                          <div
                            key={stepIndex}
                            className="flex items-center gap-2 text-xs"
                          >
                            <CheckCircle className="h-3 w-3 text-emerald-600" />
                            <span className="text-muted-foreground">
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
