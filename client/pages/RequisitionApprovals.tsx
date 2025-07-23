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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  CheckCircle,
  X,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Building,
  DollarSign,
  Calendar,
  MessageSquare,
  ArrowRight,
  Eye,
  Download,
  Filter,
} from "lucide-react";

const approvalStats = [
  { label: "Pending Approval", value: 8, color: "text-yellow-600" },
  { label: "Approved Today", value: 3, color: "text-emerald-600" },
  { label: "Rejected", value: 1, color: "text-red-600" },
  { label: "Total This Month", value: 24, color: "text-primary" },
];

const pendingApprovals = [
  {
    id: "REQ-001",
    positionTitle: "Senior Project Manager",
    department: "Engineering",
    submittedBy: "Sarah Johnson",
    submittedDate: "2024-12-20",
    urgency: "high",
    budget: "$110,000 - $130,000",
    headcount: 1,
    justification:
      "Critical need for experienced PM to handle Q1 2025 project portfolio worth $50M",
    currentLevel: "Budget Approval",
    nextApprover: "CFO",
    daysWaiting: 2,
    avatar: "/placeholder.svg",
  },
  {
    id: "REQ-002",
    positionTitle: "Site Supervisor",
    department: "Operations",
    submittedBy: "Mike Chen",
    submittedDate: "2024-12-18",
    urgency: "medium",
    budget: "$65,000 - $75,000",
    headcount: 2,
    justification:
      "Replacement for departing supervisor and additional capacity for new projects",
    currentLevel: "Department Approval",
    nextApprover: "Operations Director",
    daysWaiting: 4,
    avatar: "/placeholder.svg",
  },
  {
    id: "REQ-003",
    positionTitle: "Safety Coordinator",
    department: "Safety",
    submittedBy: "Lisa Martinez",
    submittedDate: "2024-12-22",
    urgency: "high",
    budget: "$55,000 - $65,000",
    headcount: 1,
    justification:
      "Mandatory position to meet increased safety requirements for new contracts",
    currentLevel: "HR Review",
    nextApprover: "HR Director",
    daysWaiting: 1,
    avatar: "/placeholder.svg",
  },
  {
    id: "REQ-004",
    positionTitle: "QA Inspector",
    department: "Quality",
    submittedBy: "David Park",
    submittedDate: "2024-12-19",
    urgency: "low",
    budget: "$45,000 - $55,000",
    headcount: 3,
    justification: "Quality team expansion to support increased project volume",
    currentLevel: "Final Approval",
    nextApprover: "CEO",
    daysWaiting: 3,
    avatar: "/placeholder.svg",
  },
];

const approvalWorkflow = [
  {
    step: 1,
    name: "Hiring Manager",
    description: "Initial review and department approval",
    icon: User,
    color: "text-emerald-600",
  },
  {
    step: 2,
    name: "HR Review",
    description: "Compliance and policy validation",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    step: 3,
    name: "Budget Approval",
    description: "Financial review and budget allocation",
    icon: DollarSign,
    color: "text-yellow-600",
  },
  {
    step: 4,
    name: "Final Approval",
    description: "Executive approval for posting",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
];

export default function RequisitionApprovals() {
  const [selectedRequisition, setSelectedRequisition] = useState<string | null>(
    null,
  );
  const [approvalComments, setApprovalComments] = useState("");
  const [filter, setFilter] = useState("all");

  const handleApprove = (reqId: string) => {
    console.log(
      `Approving requisition ${reqId} with comments:`,
      approvalComments,
    );
    setApprovalComments("");
    setSelectedRequisition(null);
  };

  const handleReject = (reqId: string) => {
    console.log(
      `Rejecting requisition ${reqId} with comments:`,
      approvalComments,
    );
    setApprovalComments("");
    setSelectedRequisition(null);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getDaysColor = (days: number) => {
    if (days <= 1) return "text-green-600";
    if (days <= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Requisition Approvals
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
                Review and approve job requisitions workflow
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon icon={Filter} animation="bounce" className="mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={Download}
                animation="bounce"
                className="mr-2"
              />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {approvalStats.map((stat, index) => (
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
                    icon={CheckCircle}
                    animation="float"
                    className={stat.color}
                    size="sm"
                  />
                </div>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={stat.value} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Approval Workflow */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AnimatedIcon
                icon={ArrowRight}
                animation="bounce"
                className="text-construction-500"
              />
              Approval Workflow
            </CardTitle>
            <CardDescription>
              Standard approval process for job requisitions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {approvalWorkflow.map((step, index) => (
                <div
                  key={step.step}
                  className="flex items-center gap-2"
                  style={{
                    flex: step.step === approvalWorkflow.length ? "none" : "1",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border-2 border-primary">
                      <AnimatedIcon
                        icon={step.icon}
                        animation="pulse"
                        className={step.color}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{step.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {step.step < approvalWorkflow.length && (
                    <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Clock}
                  animation="pulse"
                  className="text-yellow-600"
                />
                <CardTitle>Pending Approvals</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={pendingApprovals.length} /> pending
              </Badge>
            </div>
            <CardDescription>
              Requisitions requiring your review and approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((requisition, index) => (
                <Card
                  key={requisition.id}
                  className="hover-lift animate-scaleIn relative overflow-hidden group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">
                              {requisition.positionTitle}
                            </h4>
                            <Badge
                              variant="outline"
                              className={getUrgencyColor(requisition.urgency)}
                            >
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              {requisition.urgency}
                            </Badge>
                            <Badge variant="secondary">{requisition.id}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {requisition.department}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {requisition.budget}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {requisition.headcount} position(s)
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge variant="outline" className="text-yellow-600">
                            <Clock className="mr-1 h-3 w-3" />
                            {requisition.currentLevel}
                          </Badge>
                          <p
                            className={`text-sm font-medium ${getDaysColor(
                              requisition.daysWaiting,
                            )}`}
                          >
                            {requisition.daysWaiting} days waiting
                          </p>
                        </div>
                      </div>

                      {/* Submitter Info */}
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={requisition.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-construction-500 text-white">
                            {requisition.submittedBy
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            Submitted by {requisition.submittedBy}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {requisition.submittedDate} • Next:{" "}
                            {requisition.nextApprover}
                          </p>
                        </div>
                      </div>

                      {/* Justification */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Business Justification:
                        </Label>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                          {requisition.justification}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={Eye} size="sm" className="mr-1" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover-lift"
                          onClick={() =>
                            setSelectedRequisition(
                              selectedRequisition === requisition.id
                                ? null
                                : requisition.id,
                            )
                          }
                        >
                          <AnimatedIcon
                            icon={MessageSquare}
                            size="sm"
                            className="mr-1"
                          />
                          {selectedRequisition === requisition.id
                            ? "Cancel"
                            : "Review"}
                        </Button>
                        <Button size="sm" className="hover-lift">
                          <AnimatedIcon
                            icon={CheckCircle}
                            size="sm"
                            className="mr-1"
                          />
                          Quick Approve
                        </Button>
                      </div>

                      {/* Approval Form */}
                      {selectedRequisition === requisition.id && (
                        <Card className="bg-muted/50 animate-slideInDown">
                          <CardContent className="p-4 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="comments">
                                Approval Comments
                              </Label>
                              <Textarea
                                id="comments"
                                placeholder="Add your comments for this approval decision..."
                                value={approvalComments}
                                onChange={(e) =>
                                  setApprovalComments(e.target.value)
                                }
                                className="min-h-[80px]"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleApprove(requisition.id)}
                                className="hover-lift animate-gradient bg-gradient-to-r from-emerald-500 to-emerald-600 relative overflow-hidden"
                              >
                                <AnimatedIcon
                                  icon={CheckCircle}
                                  size="sm"
                                  className="mr-1"
                                />
                                Approve
                                <ShimmerEffect className="absolute inset-0" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReject(requisition.id)}
                                className="hover-lift"
                              >
                                <AnimatedIcon
                                  icon={X}
                                  size="sm"
                                  className="mr-1"
                                />
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedRequisition(null)}
                                className="hover-lift"
                              >
                                Cancel
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
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
