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
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  MessageSquare,
  Calendar,
  User,
  Building,
  Clock,
  CheckCircle,
  Search,
  Plus,
  ArrowLeft,
  TrendingUp,
  Star,
  BarChart3,
  Users,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

const interviewStats = [
  {
    label: "Scheduled Interviews",
    value: 8,
    change: "+2 this week",
    icon: Calendar,
    color: "text-primary",
  },
  {
    label: "Completed Interviews",
    value: 24,
    change: "This month",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Avg Satisfaction Score",
    value: 4.2,
    change: "out of 5.0",
    icon: Star,
    color: "text-yellow-500",
  },
  {
    label: "Response Rate",
    value: 89,
    change: "% participation",
    icon: TrendingUp,
    color: "text-construction-500",
  },
];

const exitInterviews = [
  {
    id: 1,
    employeeName: "Sarah Mitchell",
    department: "Engineering",
    position: "Senior Developer",
    resignationDate: "2024-01-15",
    lastWorkingDay: "2024-01-29",
    interviewDate: "2024-01-25",
    status: "scheduled",
    interviewer: "HR Manager",
    reason: "Career Growth",
    satisfactionScore: null,
    tenure: "3 years",
  },
  {
    id: 2,
    employeeName: "David Park",
    department: "Operations",
    position: "Operations Manager",
    resignationDate: "2024-01-10",
    lastWorkingDay: "2024-01-24",
    interviewDate: "2024-01-22",
    status: "completed",
    interviewer: "HR Director",
    reason: "Relocation",
    satisfactionScore: 4.5,
    tenure: "5 years",
  },
  {
    id: 3,
    employeeName: "Maria Rodriguez",
    department: "Sales",
    position: "Sales Representative",
    resignationDate: "2024-01-18",
    lastWorkingDay: "2024-02-01",
    interviewDate: "2024-01-30",
    status: "pending_scheduling",
    interviewer: "Sales Manager",
    reason: "Better Opportunity",
    satisfactionScore: null,
    tenure: "2 years",
  },
  {
    id: 4,
    employeeName: "James Wilson",
    department: "Quality",
    position: "QA Inspector",
    resignationDate: "2024-01-08",
    lastWorkingDay: "2024-01-22",
    interviewDate: "2024-01-20",
    status: "completed",
    interviewer: "Quality Manager",
    reason: "Personal Reasons",
    satisfactionScore: 3.8,
    tenure: "1.5 years",
  },
];

const resignationReasons = [
  { reason: "Career Growth", count: 8, percentage: 35 },
  { reason: "Better Opportunity", count: 6, percentage: 26 },
  { reason: "Compensation", count: 4, percentage: 17 },
  { reason: "Work-Life Balance", count: 3, percentage: 13 },
  { reason: "Personal Reasons", count: 2, percentage: 9 },
];

export default function ExitInterviewManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInterviews = exitInterviews.filter(
    (interview) =>
      interview.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.reason.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "scheduled":
        return "secondary";
      case "pending_scheduling":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "scheduled":
        return Calendar;
      case "pending_scheduling":
        return Clock;
      default:
        return MessageSquare;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-emerald-600";
    if (score >= 3.5) return "text-yellow-600";
    return "text-red-600";
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
                Exit Interview Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={MessageSquare}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Structured exit interview process and feedback collection
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={BarChart3}
                animation="bounce"
                className="mr-2"
              />
              Analytics Report
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Schedule Interview
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {interviewStats.map((stat, index) => (
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

        {/* Resignation Reasons Analytics */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={BarChart3}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Resignation Reasons</CardTitle>
            </div>
            <CardDescription>
              Analysis of why employees are leaving the organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resignationReasons.map((reason, index) => (
                <div
                  key={reason.reason}
                  className="flex items-center justify-between p-3 border rounded-lg animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-medium">{reason.reason}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">
                        <AnimatedCounter value={reason.count} /> employees
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {reason.percentage}% of total
                      </p>
                    </div>
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div
                        className="h-2 bg-primary rounded-full transition-all duration-1000"
                        style={{ width: `${reason.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="animate-slideInUp">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by employee, department, position, or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Exit Interviews Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Users}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Exit Interviews</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredInterviews.length} /> interviews
              </Badge>
            </div>
            <CardDescription>
              Track and manage exit interview process for departing employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Details</TableHead>
                  <TableHead>Interview Status</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Reason & Score</TableHead>
                  <TableHead>Interviewer</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterviews.map((interview, index) => (
                  <TableRow
                    key={interview.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {interview.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {interview.position}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {interview.department}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Tenure: {interview.tenure}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(interview.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {interview.status === "scheduled" && (
                          <PulsingDot className="scale-50" />
                        )}
                        <AnimatedIcon
                          icon={getStatusIcon(interview.status)}
                          className="h-3 w-3"
                        />
                        {interview.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>Resigned: {interview.resignationDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>Last day: {interview.lastWorkingDay}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-primary">
                          <MessageSquare className="h-3 w-3" />
                          <span>Interview: {interview.interviewDate}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs">
                          {interview.reason}
                        </Badge>
                        {interview.satisfactionScore && (
                          <div className="flex items-center gap-1">
                            <Star
                              className={`h-3 w-3 ${getScoreColor(
                                interview.satisfactionScore,
                              )}`}
                            />
                            <span
                              className={`text-sm font-medium ${getScoreColor(
                                interview.satisfactionScore,
                              )}`}
                            >
                              {interview.satisfactionScore}/5.0
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{interview.interviewer}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon
                            icon={MessageSquare}
                            className="h-3 w-3"
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={Calendar} className="h-3 w-3" />
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
