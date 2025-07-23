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
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  FileText,
  Calendar,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  Filter,
  Search,
  Send,
  AlertTriangle,
  User,
  Building,
  Plane,
  Heart,
  Stethoscope,
  Baby,
} from "lucide-react";
import { Link } from "react-router-dom";

const workflowStats = [
  {
    label: "Pending Approvals",
    value: 23,
    change: "Requires action",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    label: "Approved Today",
    value: 8,
    change: "12% increase",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Average Time",
    value: 2.4,
    change: "Days to approve",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    label: "Approval Rate",
    value: 94,
    change: "% this month",
    icon: UserCheck,
    color: "text-construction-500",
  },
];

const pendingRequests = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    employeeId: "EMP001",
    department: "Engineering",
    manager: "David Park",
    leaveType: "Annual Leave",
    icon: Plane,
    color: "text-blue-600",
    startDate: "2024-01-20",
    endDate: "2024-01-24",
    days: 5,
    reason: "Family vacation to Europe",
    appliedDate: "2024-01-10",
    urgency: "normal",
    workCoverage: "Tasks delegated to team",
    balance: { used: 8, available: 17, total: 25 },
    documents: [],
  },
  {
    id: 2,
    employee: "Maria Rodriguez",
    employeeId: "EMP002",
    department: "Sales",
    manager: "James Wilson",
    leaveType: "Sick Leave",
    icon: Stethoscope,
    color: "text-red-600",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    days: 3,
    reason: "Medical treatment and recovery",
    appliedDate: "2024-01-14",
    urgency: "high",
    workCoverage: "John to handle client calls",
    balance: { used: 2, available: 10, total: 12 },
    documents: ["medical_certificate.pdf"],
  },
  {
    id: 3,
    employee: "John Chen",
    employeeId: "EMP003",
    department: "Operations",
    manager: "Lisa Anderson",
    leaveType: "Personal Leave",
    icon: Heart,
    color: "text-purple-600",
    startDate: "2024-01-22",
    endDate: "2024-01-22",
    days: 1,
    reason: "Personal appointment",
    appliedDate: "2024-01-18",
    urgency: "normal",
    workCoverage: "Pre-planned coverage arranged",
    balance: { used: 1, available: 4, total: 5 },
    documents: [],
  },
  {
    id: 4,
    employee: "Lisa Anderson",
    employeeId: "EMP004",
    department: "Quality",
    manager: "Alex Kumar",
    leaveType: "Maternity Leave",
    icon: Baby,
    color: "text-pink-600",
    startDate: "2024-02-01",
    endDate: "2024-07-30",
    days: 180,
    reason: "Maternity leave for new baby",
    appliedDate: "2024-01-05",
    urgency: "high",
    workCoverage: "Temporary replacement hired",
    balance: { used: 0, available: 180, total: 180 },
    documents: ["maternity_certificate.pdf", "due_date_letter.pdf"],
  },
];

const recentDecisions = [
  {
    id: 5,
    employee: "Alex Kumar",
    department: "Quality",
    leaveType: "Emergency Leave",
    days: 2,
    status: "approved",
    approver: "Sarah Mitchell",
    processedDate: "2024-01-12",
    reason: "Family emergency",
  },
  {
    id: 6,
    employee: "David Park",
    department: "Operations",
    leaveType: "Annual Leave",
    days: 3,
    status: "approved",
    approver: "James Wilson",
    processedDate: "2024-01-11",
    reason: "Long weekend trip",
  },
  {
    id: 7,
    employee: "Emma Johnson",
    department: "Sales",
    leaveType: "Sick Leave",
    days: 1,
    status: "rejected",
    approver: "Maria Rodriguez",
    processedDate: "2024-01-10",
    reason: "Insufficient medical documentation",
  },
];

const approvalLevels = [
  {
    level: "Direct Manager",
    description: "First level approval for all leave types",
    autoApproval: "Sick leave < 2 days",
    timeLimit: "24 hours",
    coverage: "95% of requests",
  },
  {
    level: "Department Head",
    description: "Second level for extended leave (>10 days)",
    autoApproval: "None",
    timeLimit: "48 hours",
    coverage: "25% of requests",
  },
  {
    level: "HR Manager",
    description: "Final approval for parental/extended leave",
    autoApproval: "None",
    timeLimit: "72 hours",
    coverage: "8% of requests",
  },
  {
    level: "Executive",
    description: "Approval for unpaid leave >30 days",
    autoApproval: "None",
    timeLimit: "1 week",
    coverage: "2% of requests",
  },
];

export default function LeaveRequestApproval() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-emerald-600 bg-emerald-600/10";
      case "rejected":
        return "text-red-600 bg-red-600/10";
      case "pending":
        return "text-yellow-600 bg-yellow-600/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600 bg-red-600/10";
      case "normal":
        return "text-blue-600 bg-blue-600/10";
      case "low":
        return "text-green-600 bg-green-600/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="animate-slideInDown">
          <Button variant="ghost" size="sm" asChild className="hover-lift">
            <Link to="/hrms/leave">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Leave Management
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Leave Request & Approval Workflow
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={CheckCircle}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Streamlined leave request and approval management system
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
              New Request
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workflowStats.map((stat, index) => (
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
                  {stat.label.includes("Rate") ? (
                    <span className="text-sm">%</span>
                  ) : null}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pending Requests */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Clock}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Pending Leave Requests</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hover-lift">
                  <AnimatedIcon
                    icon={Filter}
                    animation="bounce"
                    className="mr-2"
                  />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="hover-lift">
                  <AnimatedIcon
                    icon={Search}
                    animation="pulse"
                    className="mr-2"
                  />
                  Search
                </Button>
              </div>
            </div>
            <CardDescription>
              Review and approve pending leave applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests.map((request, index) => (
                <Card
                  key={request.id}
                  className="hover-lift animate-scaleIn border-l-4 border-l-yellow-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {/* Employee Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <AnimatedIcon
                              icon={request.icon}
                              animation="bounce"
                              className={`${request.color} h-5 w-5`}
                            />
                            <div>
                              <p className="font-medium text-sm">
                                {request.employee}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {request.employeeId} • {request.department}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {request.leaveType}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getUrgencyColor(
                              request.urgency,
                            )}`}
                          >
                            {request.urgency} priority
                          </Badge>
                        </div>
                      </div>

                      {/* Leave Details */}
                      <div className="space-y-2">
                        <div className="text-sm">
                          <p className="font-medium">
                            {request.startDate} to {request.endDate}
                          </p>
                          <p className="text-muted-foreground">
                            {request.days} day{request.days > 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="text-xs">
                          <p className="text-muted-foreground">Applied on:</p>
                          <p>{request.appliedDate}</p>
                        </div>
                        <div className="text-xs">
                          <p className="text-muted-foreground">Balance:</p>
                          <p className="text-emerald-600">
                            {request.balance.available}/{request.balance.total}{" "}
                            days
                          </p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-2">
                        <div className="text-xs">
                          <p className="text-muted-foreground">Reason:</p>
                          <p className="font-medium">{request.reason}</p>
                        </div>
                        <div className="text-xs">
                          <p className="text-muted-foreground">
                            Work Coverage:
                          </p>
                          <p>{request.workCoverage}</p>
                        </div>
                        {request.documents.length > 0 && (
                          <div className="text-xs">
                            <p className="text-muted-foreground">Documents:</p>
                            <div className="space-y-1">
                              {request.documents.map((doc, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-1"
                                >
                                  <FileText className="h-3 w-3" />
                                  <span>{doc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="text-xs text-muted-foreground">
                        Manager: {request.manager}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={Eye} className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover-lift text-red-600 border-red-200"
                        >
                          <AnimatedIcon
                            icon={XCircle}
                            className="h-3 w-3 mr-1"
                          />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          className="hover-lift bg-emerald-600 hover:bg-emerald-700"
                        >
                          <AnimatedIcon
                            icon={CheckCircle}
                            className="h-3 w-3 mr-1"
                          />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Approval Workflow & Recent Decisions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Send}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Approval Workflow</CardTitle>
              </div>
              <CardDescription>
                Multi-level approval process configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvalLevels.map((level, index) => (
                  <div
                    key={level.level}
                    className="p-3 border rounded-lg animate-scaleIn space-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{level.level}</h4>
                      <Badge variant="outline" className="text-xs">
                        {level.coverage}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {level.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Time Limit</p>
                        <p className="font-medium">{level.timeLimit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Auto Approval</p>
                        <p className="font-medium">{level.autoApproval}</p>
                      </div>
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
                  icon={FileText}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Recent Decisions</CardTitle>
              </div>
              <CardDescription>
                Latest approved and rejected leave requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDecisions.map((decision, index) => (
                  <div
                    key={decision.id}
                    className="flex items-center justify-between p-3 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{decision.employee}</p>
                      <p className="text-xs text-muted-foreground">
                        {decision.department}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="outline" className="text-xs">
                          {decision.leaveType}
                        </Badge>
                        <span>{decision.days} days</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        By: {decision.approver} • {decision.processedDate}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(decision.status)}`}
                      >
                        {decision.status}
                      </Badge>
                      {decision.status === "rejected" && (
                        <p className="text-xs text-red-600">
                          {decision.reason}
                        </p>
                      )}
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
              Common approval workflow tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={CheckCircle}
                  animation="bounce"
                  className="mr-2"
                />
                Bulk Approve
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Filter}
                  animation="pulse"
                  className="mr-2"
                />
                Filter Requests
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Send} animation="float" className="mr-2" />
                Delegate Approval
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={AlertTriangle}
                  animation="glow"
                  className="mr-2"
                />
                Escalate Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
