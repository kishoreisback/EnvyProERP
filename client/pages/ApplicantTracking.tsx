import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Target,
  Users,
  Calendar,
  Star,
  MapPin,
  Mail,
  Phone,
  FileText,
  Clock,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  X,
  Eye,
  MessageSquare,
  Briefcase,
} from "lucide-react";

const pipelineStats = [
  { stage: "Applied", count: 48, color: "bg-blue-500" },
  { stage: "Screening", count: 24, color: "bg-yellow-500" },
  { stage: "Interview", count: 12, color: "bg-purple-500" },
  { stage: "Offer", count: 6, color: "bg-green-500" },
  { stage: "Hired", count: 3, color: "bg-emerald-600" },
];

const candidates = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Project Manager",
    appliedDate: "2024-12-20",
    currentStage: "Interview",
    stageProgress: 75,
    location: "New York, NY",
    experience: "8 years",
    rating: 4.8,
    skills: ["Project Management", "PMP", "Construction"],
    avatar: "/placeholder.svg",
    lastActivity: "Technical interview completed",
    nextStep: "Final round with CEO",
    notes: 3,
  },
  {
    id: 2,
    name: "David Park",
    email: "david.park@email.com",
    phone: "+1 (555) 234-5678",
    position: "Site Supervisor",
    appliedDate: "2024-12-18",
    currentStage: "Screening",
    stageProgress: 40,
    location: "Los Angeles, CA",
    experience: "6 years",
    rating: 4.5,
    skills: ["Site Management", "Safety", "Leadership"],
    avatar: "/placeholder.svg",
    lastActivity: "Phone screening scheduled",
    nextStep: "HR phone call on Dec 28",
    notes: 1,
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    position: "Safety Coordinator",
    appliedDate: "2024-12-15",
    currentStage: "Offer",
    stageProgress: 90,
    location: "Houston, TX",
    experience: "4 years",
    rating: 4.9,
    skills: ["OSHA", "Safety Training", "Compliance"],
    avatar: "/placeholder.svg",
    lastActivity: "Offer letter sent",
    nextStep: "Awaiting candidate response",
    notes: 5,
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 456-7890",
    position: "QA Inspector",
    appliedDate: "2024-12-22",
    currentStage: "Applied",
    stageProgress: 10,
    location: "Chicago, IL",
    experience: "3 years",
    rating: 4.2,
    skills: ["Quality Control", "Inspection", "Documentation"],
    avatar: "/placeholder.svg",
    lastActivity: "Application submitted",
    nextStep: "Initial resume review",
    notes: 0,
  },
];

const recentActivity = [
  {
    id: 1,
    candidate: "Sarah Mitchell",
    action: "Completed technical interview",
    timestamp: "2 hours ago",
    type: "interview",
  },
  {
    id: 2,
    candidate: "Maria Rodriguez",
    action: "Offer letter sent",
    timestamp: "4 hours ago",
    type: "offer",
  },
  {
    id: 3,
    candidate: "David Park",
    action: "Phone screening scheduled",
    timestamp: "1 day ago",
    type: "schedule",
  },
  {
    id: 4,
    candidate: "James Wilson",
    action: "Application received",
    timestamp: "2 days ago",
    type: "application",
  },
];

export default function ApplicantTracking() {
  const [selectedStage, setSelectedStage] = useState("all");

  const filteredCandidates =
    selectedStage === "all"
      ? candidates
      : candidates.filter((c) => c.currentStage === selectedStage);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Applied":
        return "bg-blue-500";
      case "Screening":
        return "bg-yellow-500";
      case "Interview":
        return "bg-purple-500";
      case "Offer":
        return "bg-green-500";
      case "Hired":
        return "bg-emerald-600";
      default:
        return "bg-gray-500";
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
                Applicant Tracking System
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Target}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Track candidates through the complete recruitment pipeline
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
              Export Pipeline
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Users} animation="bounce" className="mr-2" />
              Bulk Actions
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Pipeline Overview */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Target}
                animation="pulse"
                className="text-primary"
              />
              <CardTitle>Recruitment Pipeline</CardTitle>
            </div>
            <CardDescription>
              Visual overview of candidates across all stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              {pipelineStats.map((stage, index) => (
                <Card
                  key={stage.stage}
                  className={`hover-lift animate-scaleIn cursor-pointer relative overflow-hidden group ${
                    selectedStage === stage.stage ? "ring-2 ring-primary" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() =>
                    setSelectedStage(
                      selectedStage === stage.stage ? "all" : stage.stage,
                    )
                  }
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${stage.color}`}
                  />
                  <CardContent className="p-4">
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium">{stage.stage}</p>
                      <div className="text-2xl font-bold">
                        <AnimatedCounter value={stage.count} />
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${stage.color} animate-pulse`}
                          style={{
                            width: `${Math.min(
                              (stage.count / 48) * 100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Candidates Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Users}
                    animation="bounce"
                    className="text-construction-500"
                  />
                  <CardTitle>Active Candidates</CardTitle>
                </div>
                <Badge variant="outline" className="animate-pulse">
                  <AnimatedCounter value={filteredCandidates.length} />{" "}
                  candidates
                </Badge>
              </div>
              <CardDescription>
                {selectedStage === "all"
                  ? "All candidates in the pipeline"
                  : `Candidates in ${selectedStage} stage`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCandidates.map((candidate, index) => (
                  <Card
                    key={candidate.id}
                    className="hover-lift animate-fadeInUp relative overflow-hidden group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12 animate-pulse">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-construction-500 text-white">
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{candidate.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {candidate.position}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <AnimatedIcon
                                icon={Star}
                                animation="glow"
                                className="text-yellow-500"
                                size="sm"
                              />
                              <span className="text-sm font-medium">
                                {candidate.rating}
                              </span>
                            </div>
                          </div>

                          <div className="grid gap-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {candidate.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {candidate.location} • {candidate.experience} exp
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Pipeline Progress</span>
                              <span className="font-medium">
                                {candidate.stageProgress}%
                              </span>
                            </div>
                            <Progress
                              value={candidate.stageProgress}
                              className="h-2"
                            />
                            <div className="flex items-center justify-between">
                              <Badge
                                variant="outline"
                                className={`text-xs ${getStageColor(
                                  candidate.currentStage,
                                )}`}
                              >
                                {candidate.currentStage}
                              </Badge>
                              {candidate.notes > 0 && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MessageSquare className="h-3 w-3" />
                                  {candidate.notes} notes
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground">
                              <strong>Last:</strong> {candidate.lastActivity}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Next:</strong> {candidate.nextStep}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="outline">
                              <AnimatedIcon
                                icon={Eye}
                                size="sm"
                                className="mr-1"
                              />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <AnimatedIcon
                                icon={ArrowRight}
                                size="sm"
                                className="mr-1"
                              />
                              Advance
                            </Button>
                            <Button size="sm" variant="outline">
                              <AnimatedIcon
                                icon={MessageSquare}
                                size="sm"
                                className="mr-1"
                              />
                              Note
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slideInRight">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Clock}
                  animation="pulse"
                  className="text-emerald-600"
                />
                <CardTitle>Recent Activity</CardTitle>
              </div>
              <CardDescription>
                Latest updates across the recruitment pipeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      {activity.type === "interview" && (
                        <AnimatedIcon
                          icon={Calendar}
                          animation="bounce"
                          className="text-primary"
                          size="sm"
                        />
                      )}
                      {activity.type === "offer" && (
                        <AnimatedIcon
                          icon={CheckCircle}
                          animation="glow"
                          className="text-emerald-600"
                          size="sm"
                        />
                      )}
                      {activity.type === "schedule" && (
                        <AnimatedIcon
                          icon={Clock}
                          animation="pulse"
                          className="text-construction-500"
                          size="sm"
                        />
                      )}
                      {activity.type === "application" && (
                        <AnimatedIcon
                          icon={FileText}
                          animation="float"
                          className="text-blue-600"
                          size="sm"
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        {activity.candidate}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </p>
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
                icon={Target}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Pipeline Actions</CardTitle>
            </div>
            <CardDescription>
              Common actions for managing candidate pipeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={ArrowRight}
                  animation="bounce"
                  className="mr-2"
                />
                Bulk Advance Stage
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Calendar}
                  animation="pulse"
                  className="mr-2"
                />
                Schedule Interviews
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={MessageSquare}
                  animation="float"
                  className="mr-2"
                />
                Send Notifications
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={FileText}
                  animation="glow"
                  className="mr-2"
                />
                Generate Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
