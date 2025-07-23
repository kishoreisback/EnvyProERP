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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import {
  FileText,
  ArrowLeft,
  Edit,
  CheckCircle,
  X,
  Clock,
  Building,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Briefcase,
  AlertTriangle,
  Star,
  Target,
  Send,
  Eye,
  Download,
  MessageSquare,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Mock data - in real app, this would come from API
const requisitionData = {
  id: "REQ-001",
  positionTitle: "Senior Project Manager",
  department: "Engineering",
  hiringManager: "John Smith",
  reportingTo: "Director of Engineering",
  jobLevel: "Senior Level",
  employmentType: "Full-time",
  headcount: 1,
  urgency: "high",
  location: "New York, NY",
  workArrangement: "Hybrid",
  budget: "$110,000 - $130,000",
  startDate: "2025-02-01",
  status: "pending_approval",
  createdDate: "2024-12-15",
  lastModified: "2024-12-20",
  submittedBy: "Sarah Johnson",
  currentApprover: "Mike Wilson",

  jobDescription: `We are seeking an experienced Senior Project Manager to lead large-scale construction projects from inception to completion. The successful candidate will be responsible for managing project timelines, budgets, and teams while ensuring quality standards and safety compliance.

This role requires strong leadership skills, technical expertise, and the ability to coordinate multiple stakeholders including clients, contractors, and internal teams.`,

  responsibilities: [
    "Lead and manage multiple construction projects simultaneously",
    "Develop comprehensive project plans, timelines, and budgets",
    "Coordinate with architects, engineers, contractors, and clients",
    "Monitor project progress and implement corrective actions as needed",
    "Ensure compliance with safety regulations and quality standards",
    "Manage project budgets and control costs throughout project lifecycle",
    "Conduct regular project meetings and status reports",
    "Identify and mitigate project risks and issues",
  ],

  requirements: [
    "Bachelor's degree in Construction Management, Engineering, or related field",
    "Minimum 8 years of experience in construction project management",
    "PMP certification preferred",
    "Strong knowledge of construction methods and materials",
    "Excellent leadership and communication skills",
    "Proficiency in project management software (MS Project, Primavera)",
    "Experience with large-scale commercial construction projects",
  ],

  skills: [
    "Project Management",
    "Leadership",
    "Budgeting",
    "Risk Management",
    "Quality Control",
    "Safety Management",
    "Stakeholder Management",
    "Problem Solving",
  ],

  certifications: [
    "PMP (Project Management Professional) - Preferred",
    "OSHA 30-Hour Construction Safety - Required",
    "LEED Green Associate - Preferred",
  ],

  benefits: [
    "Competitive salary with performance bonuses",
    "Comprehensive health, dental, and vision insurance",
    "401(k) with company matching",
    "Flexible work arrangements",
    "Professional development opportunities",
    "Paid time off and holidays",
  ],

  justification: `The Engineering department is experiencing significant growth with 3 new major projects starting in Q1 2025. Our current project managers are at capacity, and we need an experienced senior-level PM to ensure successful delivery of these high-value projects totaling over $50M.

This position is critical for maintaining our project delivery standards and client satisfaction while supporting the company's expansion goals.`,

  approvalHistory: [
    {
      approver: "John Smith",
      role: "Engineering Director",
      action: "Submitted",
      date: "2024-12-15",
      status: "approved",
      comments:
        "Position approved by hiring manager. Proceeding to budget approval.",
    },
    {
      approver: "Mike Wilson",
      role: "VP of Operations",
      action: "Budget Review",
      date: "2024-12-18",
      status: "pending",
      comments: "Under review for budget allocation and headcount approval.",
    },
  ],
};

export default function ViewJobRequisition() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-emerald-600";
      case "pending_approval":
        return "text-yellow-600";
      case "rejected":
        return "text-red-600";
      case "draft":
        return "text-gray-600";
      default:
        return "text-muted-foreground";
    }
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

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "details", label: "Job Details", icon: FileText },
    { id: "approval", label: "Approval Flow", icon: CheckCircle },
    { id: "activity", label: "Activity", icon: Clock },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link to="/hrms/recruitment/requisitions">
                  <AnimatedIcon
                    icon={ArrowLeft}
                    animation="bounce"
                    className="mr-2"
                  />
                  Back to Requisitions
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Job Requisition Details
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={FileText}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                {requisitionData.id} - {requisitionData.positionTitle}
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
              Export PDF
            </Button>
            <Button variant="outline" className="hover-lift" asChild>
              <Link to={`/hrms/recruitment/requisitions/${id}/edit`}>
                <AnimatedIcon icon={Edit} animation="bounce" className="mr-2" />
                Edit Requisition
              </Link>
            </Button>
            {requisitionData.status === "pending_approval" && (
              <Button className="hover-lift animate-gradient bg-gradient-to-r from-emerald-500 to-primary relative overflow-hidden">
                <AnimatedIcon
                  icon={CheckCircle}
                  animation="bounce"
                  className="mr-2"
                />
                Approve
                <ShimmerEffect className="absolute inset-0" />
              </Button>
            )}
          </div>
        </div>

        {/* Status Card */}
        <Card className="hover-lift animate-fadeInUp">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">
                    {requisitionData.positionTitle}
                  </h2>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(requisitionData.status)}`}
                  >
                    {requisitionData.status === "pending_approval" && (
                      <Clock className="mr-1 h-3 w-3" />
                    )}
                    {requisitionData.status.replace("_", " ")}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${getUrgencyColor(requisitionData.urgency)}`}
                  >
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    {requisitionData.urgency} priority
                  </Badge>
                </div>
                <div className="grid gap-2 md:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Building}
                      size="sm"
                      className="text-construction-500"
                    />
                    <span className="text-sm">
                      {requisitionData.department}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Users}
                      size="sm"
                      className="text-primary"
                    />
                    <span className="text-sm">
                      {requisitionData.hiringManager}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={MapPin}
                      size="sm"
                      className="text-emerald-600"
                    />
                    <span className="text-sm">{requisitionData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={DollarSign}
                      size="sm"
                      className="text-yellow-600"
                    />
                    <span className="text-sm">{requisitionData.budget}</span>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm text-muted-foreground">
                  Submitted: {requisitionData.createdDate}
                </p>
                <p className="text-sm text-muted-foreground">
                  ID: {requisitionData.id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 hover-lift"
                >
                  <AnimatedIcon
                    icon={tab.icon}
                    animation="bounce"
                    className="mr-2"
                    size="sm"
                  />
                  {tab.label}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-slideInRight">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AnimatedIcon
                          icon={Briefcase}
                          animation="pulse"
                          className="text-primary"
                        />
                        Position Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Job Level:
                          </span>
                          <span className="text-sm font-medium">
                            {requisitionData.jobLevel}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Employment Type:
                          </span>
                          <span className="text-sm font-medium">
                            {requisitionData.employmentType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Positions:
                          </span>
                          <span className="text-sm font-medium">
                            {requisitionData.headcount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Work Arrangement:
                          </span>
                          <span className="text-sm font-medium">
                            {requisitionData.workArrangement}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Start Date:
                          </span>
                          <span className="text-sm font-medium">
                            {requisitionData.startDate}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AnimatedIcon
                          icon={Users}
                          animation="bounce"
                          className="text-construction-500"
                        />
                        Management & Reporting
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Hiring Manager:
                          </span>
                          <span className="text-sm font-medium">
                            {requisitionData.hiringManager}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Reports To:
                          </span>
                          <span className="text-sm font-medium">
                            {requisitionData.reportingTo}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Submitted By:
                          </span>
                          <span className="text-sm font-medium">
                            {requisitionData.submittedBy}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Current Approver:
                          </span>
                          <span className="text-sm font-medium">
                            {requisitionData.currentApprover}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AnimatedIcon
                        icon={FileText}
                        animation="float"
                        className="text-emerald-600"
                      />
                      Business Justification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">
                      {requisitionData.justification}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Job Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-6 animate-slideInRight">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AnimatedIcon
                        icon={Target}
                        animation="pulse"
                        className="text-primary"
                      />
                      Job Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {requisitionData.jobDescription}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AnimatedIcon
                        icon={CheckCircle}
                        animation="bounce"
                        className="text-construction-500"
                      />
                      Key Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {requisitionData.responsibilities.map((resp, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AnimatedIcon
                          icon={Star}
                          animation="glow"
                          className="text-yellow-500"
                        />
                        Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {requisitionData.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AnimatedIcon
                          icon={Target}
                          animation="float"
                          className="text-emerald-600"
                        />
                        Skills & Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {requisitionData.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">
                          Certifications:
                        </p>
                        <ul className="space-y-1">
                          {requisitionData.certifications.map((cert, index) => (
                            <li key={index} className="text-sm">
                              • {cert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Approval Flow Tab */}
            {activeTab === "approval" && (
              <div className="space-y-6 animate-slideInRight">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AnimatedIcon
                        icon={CheckCircle}
                        animation="pulse"
                        className="text-emerald-600"
                      />
                      Approval History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {requisitionData.approvalHistory.map(
                        (approval, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 border rounded-lg"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              {approval.status === "approved" ? (
                                <AnimatedIcon
                                  icon={CheckCircle}
                                  animation="glow"
                                  className="text-emerald-600"
                                />
                              ) : (
                                <AnimatedIcon
                                  icon={Clock}
                                  animation="pulse"
                                  className="text-yellow-600"
                                />
                              )}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">
                                  {approval.approver}
                                </h4>
                                <Badge
                                  variant={
                                    approval.status === "approved"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {approval.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {approval.role} • {approval.action}
                              </p>
                              <p className="text-sm">{approval.comments}</p>
                              <p className="text-xs text-muted-foreground">
                                {approval.date}
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="space-y-6 animate-slideInRight">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AnimatedIcon
                        icon={Clock}
                        animation="bounce"
                        className="text-construction-500"
                      />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-3 border rounded-lg">
                        <AnimatedIcon
                          icon={Edit}
                          animation="float"
                          className="text-primary mt-1"
                        />
                        <div>
                          <p className="text-sm font-medium">
                            Requisition updated
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Budget range updated by Sarah Johnson
                          </p>
                          <p className="text-xs text-muted-foreground">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-3 border rounded-lg">
                        <AnimatedIcon
                          icon={Send}
                          animation="pulse"
                          className="text-emerald-600 mt-1"
                        />
                        <div>
                          <p className="text-sm font-medium">
                            Sent for approval
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Submitted to Mike Wilson for budget approval
                          </p>
                          <p className="text-xs text-muted-foreground">
                            1 day ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-3 border rounded-lg">
                        <AnimatedIcon
                          icon={FileText}
                          animation="bounce"
                          className="text-construction-500 mt-1"
                        />
                        <div>
                          <p className="text-sm font-medium">
                            Requisition created
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Initial requisition created by Sarah Johnson
                          </p>
                          <p className="text-xs text-muted-foreground">
                            3 days ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
