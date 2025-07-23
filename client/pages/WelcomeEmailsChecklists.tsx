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
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Mail,
  CheckSquare,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Plus,
  ArrowLeft,
  TrendingUp,
  Send,
  Bell,
  FileText,
  Users,
  Calendar,
  Building,
  AlertTriangle,
  Edit,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

const communicationStats = [
  {
    label: "Welcome Emails Sent",
    value: 45,
    change: "+8 this week",
    icon: Mail,
    color: "text-primary",
  },
  {
    label: "Active Checklists",
    value: 12,
    change: "In progress",
    icon: CheckSquare,
    color: "text-emerald-600",
  },
  {
    label: "Pending Tasks",
    value: 28,
    change: "Across all employees",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    label: "Completion Rate",
    value: 87,
    change: "% avg completion",
    icon: TrendingUp,
    color: "text-construction-500",
  },
];

const emailTemplates = [
  {
    id: 1,
    name: "Welcome Email",
    category: "Initial Contact",
    description: "First day welcome message with company overview",
    triggers: ["employee_start_date"],
    status: "active",
    lastUsed: "2024-01-15",
    usageCount: 45,
  },
  {
    id: 2,
    name: "First Week Check-in",
    category: "Follow-up",
    description: "Mid-week check-in with resources and support",
    triggers: ["day_3_after_start"],
    status: "active",
    lastUsed: "2024-01-14",
    usageCount: 38,
  },
  {
    id: 3,
    name: "Pre-boarding Preparation",
    category: "Pre-Start",
    description: "Preparation instructions sent before start date",
    triggers: ["3_days_before_start"],
    status: "active",
    lastUsed: "2024-01-12",
    usageCount: 42,
  },
  {
    id: 4,
    name: "IT Setup Reminder",
    category: "Technical",
    description: "Reminder for IT equipment setup and training",
    triggers: ["pending_it_setup"],
    status: "active",
    lastUsed: "2024-01-13",
    usageCount: 23,
  },
  {
    id: 5,
    name: "30-Day Milestone",
    category: "Milestone",
    description: "Congratulations and feedback request at 30 days",
    triggers: ["30_days_after_start"],
    status: "draft",
    lastUsed: "2024-01-10",
    usageCount: 15,
  },
];

const activeChecklists = [
  {
    id: 1,
    employeeName: "Sarah Mitchell",
    department: "Engineering",
    position: "Senior Developer",
    startDate: "2024-01-15",
    checklistType: "New Hire Onboarding",
    totalTasks: 15,
    completedTasks: 11,
    completionRate: 73,
    status: "in_progress",
    nextDeadline: "2024-01-20",
    lastActivity: "2 hours ago",
  },
  {
    id: 2,
    employeeName: "David Park",
    department: "Operations",
    position: "Operations Manager",
    startDate: "2024-01-14",
    checklistType: "Manager Onboarding",
    totalTasks: 18,
    completedTasks: 16,
    completionRate: 89,
    status: "in_progress",
    nextDeadline: "2024-01-19",
    lastActivity: "1 day ago",
  },
  {
    id: 3,
    employeeName: "Maria Rodriguez",
    department: "Sales",
    position: "Sales Representative",
    startDate: "2024-01-12",
    checklistType: "Sales Team Onboarding",
    totalTasks: 12,
    completedTasks: 12,
    completionRate: 100,
    status: "completed",
    nextDeadline: "Completed",
    lastActivity: "3 days ago",
  },
  {
    id: 4,
    employeeName: "James Wilson",
    department: "Quality",
    position: "QA Inspector",
    startDate: "2024-01-13",
    checklistType: "Quality Team Onboarding",
    totalTasks: 14,
    completedTasks: 8,
    completionRate: 57,
    status: "behind_schedule",
    nextDeadline: "2024-01-18",
    lastActivity: "5 hours ago",
  },
];

const checklistTemplates = [
  {
    id: 1,
    name: "New Hire Onboarding",
    category: "General",
    tasks: 15,
    avgCompletion: "7 days",
    departments: ["All"],
  },
  {
    id: 2,
    name: "Manager Onboarding",
    category: "Leadership",
    tasks: 18,
    avgCompletion: "10 days",
    departments: ["Management"],
  },
  {
    id: 3,
    name: "Sales Team Onboarding",
    category: "Department",
    tasks: 12,
    avgCompletion: "5 days",
    departments: ["Sales"],
  },
  {
    id: 4,
    name: "Technical Role Onboarding",
    category: "Technical",
    tasks: 20,
    avgCompletion: "14 days",
    departments: ["Engineering", "IT"],
  },
];

export default function WelcomeEmailsChecklists() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredChecklists = activeChecklists.filter((checklist) => {
    const matchesSearch =
      checklist.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || checklist.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "in_progress":
        return "secondary";
      case "behind_schedule":
        return "destructive";
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
      case "behind_schedule":
        return AlertTriangle;
      default:
        return CheckSquare;
    }
  };

  const getTemplateStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-600";
      case "draft":
        return "text-yellow-600";
      case "inactive":
        return "text-gray-600";
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
                Welcome Emails & Checklists
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Mail}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Automated communication and task management for new hires
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
              Email Templates
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Checklist
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {communicationStats.map((stat, index) => (
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

        {/* Email Templates */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Mail}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Email Templates</CardTitle>
            </div>
            <CardDescription>
              Automated welcome emails and communication templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              {emailTemplates.map((template, index) => (
                <Card
                  key={template.id}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">
                          {template.name}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getTemplateStatusColor(
                            template.status,
                          )}`}
                        >
                          {template.status}
                        </Badge>
                      </div>
                      <div>
                        <Badge variant="secondary" className="text-xs mb-2">
                          {template.category}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {template.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Used:</span>
                          <span className="font-medium ml-1">
                            <AnimatedCounter value={template.usageCount} />{" "}
                            times
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last:</span>
                          <span className="font-medium ml-1">
                            {template.lastUsed}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Triggers:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.triggers.map((trigger, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {trigger.replace("_", " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift flex-1"
                        >
                          <AnimatedIcon icon={Eye} size="sm" className="mr-1" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift flex-1"
                        >
                          <AnimatedIcon
                            icon={Edit}
                            size="sm"
                            className="mr-1"
                          />
                          Edit
                        </Button>
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
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="behind_schedule">
                    Behind Schedule
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Active Checklists */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={CheckSquare}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Active Checklists</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredChecklists.length} /> checklists
              </Badge>
            </div>
            <CardDescription>
              Track task completion progress for new hires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Details</TableHead>
                  <TableHead>Checklist Type</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChecklists.map((checklist, index) => (
                  <TableRow
                    key={checklist.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {checklist.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {checklist.position}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {checklist.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {checklist.checklistType}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {checklist.totalTasks} tasks total
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={checklist.completionRate}
                            className="w-20"
                          />
                          <span className="text-sm font-medium">
                            {checklist.completionRate}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {checklist.completedTasks}/{checklist.totalTasks}{" "}
                          completed
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(checklist.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {checklist.status === "in_progress" && (
                          <PulsingDot className="scale-50" />
                        )}
                        <AnimatedIcon
                          icon={getStatusIcon(checklist.status)}
                          className="h-3 w-3"
                        />
                        {checklist.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>Started: {checklist.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>Due: {checklist.nextDeadline}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last activity: {checklist.lastActivity}
                        </p>
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
                          <AnimatedIcon icon={Send} className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={Bell} className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Checklist Templates */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={CheckSquare}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Checklist Templates</CardTitle>
            </div>
            <CardDescription>
              Standard onboarding checklists for different roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {checklistTemplates.map((template, index) => (
                <Card
                  key={template.id}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm">
                          {template.name}
                        </h4>
                        <Badge variant="outline" className="text-xs mt-1">
                          {template.category}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Tasks:</span>
                          <span className="font-medium ml-1">
                            {template.tasks}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Avg Time:
                          </span>
                          <span className="font-medium ml-1">
                            {template.avgCompletion}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Departments:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.departments.map((dept, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {dept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full hover-lift"
                        variant="outline"
                      >
                        <AnimatedIcon icon={Edit} size="sm" className="mr-2" />
                        Edit Template
                      </Button>
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
