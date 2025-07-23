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
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Calendar,
  Clock,
  Users,
  Video,
  MapPin,
  Plus,
  Edit,
  CheckCircle,
  X,
  Bell,
  FileText,
  Star,
  Phone,
  Building,
  ArrowLeft,
} from "lucide-react";

const scheduleStats = [
  { label: "This Week", value: 8, color: "text-primary" },
  { label: "Next Week", value: 12, color: "text-construction-500" },
  { label: "Pending Confirm", value: 3, color: "text-yellow-600" },
  { label: "Completed", value: 24, color: "text-emerald-600" },
];

const upcomingInterviews = [
  {
    id: 1,
    candidate: "Sarah Mitchell",
    position: "Senior Project Manager",
    date: "2024-12-28",
    time: "2:00 PM",
    duration: "60 minutes",
    type: "Technical Round",
    format: "In-Person",
    location: "Conference Room A",
    interviewer: "John Smith",
    panel: ["John Smith", "Mike Johnson"],
    status: "confirmed",
    notes: "Final round - decision maker meeting",
    candidateRating: 4.8,
  },
  {
    id: 2,
    candidate: "David Park",
    position: "Site Supervisor",
    date: "2024-12-29",
    time: "10:00 AM",
    duration: "45 minutes",
    type: "HR Round",
    format: "Video Call",
    location: "Zoom Meeting",
    interviewer: "Sarah Johnson",
    panel: ["Sarah Johnson"],
    status: "pending_confirmation",
    notes: "Initial screening - culture fit assessment",
    candidateRating: 4.5,
  },
  {
    id: 3,
    candidate: "Maria Rodriguez",
    position: "Safety Coordinator",
    date: "2024-12-30",
    time: "3:00 PM",
    duration: "90 minutes",
    type: "Panel Interview",
    format: "In-Person",
    location: "Main Office",
    interviewer: "Multiple",
    panel: ["Mike Wilson", "Lisa Chen", "David Park"],
    status: "confirmed",
    notes: "Technical assessment and team fit evaluation",
    candidateRating: 4.9,
  },
  {
    id: 4,
    candidate: "James Wilson",
    position: "QA Inspector",
    date: "2025-01-02",
    time: "11:00 AM",
    duration: "30 minutes",
    type: "Phone Screening",
    format: "Phone Call",
    location: "Phone Interview",
    interviewer: "Lisa Chen",
    panel: ["Lisa Chen"],
    status: "scheduled",
    notes: "Quick qualification check",
    candidateRating: 4.2,
  },
  {
    id: 5,
    candidate: "Emma Thompson",
    position: "Project Engineer",
    date: "2025-01-03",
    time: "1:00 PM",
    duration: "75 minutes",
    type: "Technical Round",
    format: "Video Call",
    location: "Microsoft Teams",
    interviewer: "Alex Rodriguez",
    panel: ["Alex Rodriguez", "Tom Johnson"],
    status: "draft",
    notes: "Engineering assessment and portfolio review",
    candidateRating: 4.6,
  },
];

const availableInterviewers = [
  { name: "John Smith", title: "Engineering Director", availability: "High" },
  { name: "Sarah Johnson", title: "HR Director", availability: "Medium" },
  { name: "Mike Wilson", title: "Safety Director", availability: "High" },
  { name: "Lisa Chen", title: "QA Director", availability: "Low" },
  { name: "David Park", title: "Operations Manager", availability: "High" },
];

export default function InterviewScheduling() {
  const [selectedDate, setSelectedDate] = useState("2024-12-28");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-emerald-600";
      case "pending_confirmation":
        return "text-yellow-600";
      case "scheduled":
        return "text-blue-600";
      case "draft":
        return "text-gray-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Video Call":
        return Video;
      case "Phone Call":
        return Phone;
      case "In-Person":
        return Building;
      default:
        return Calendar;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "High":
        return "text-emerald-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-red-600";
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
                Interview Scheduling
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
                Coordinate interviews and manage interviewer availability
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon icon={Bell} animation="bounce" className="mr-2" />
              Send Reminders
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Schedule Interview
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {scheduleStats.map((stat, index) => (
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
                    icon={Calendar}
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

        {/* Interview Schedule */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2 hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Clock}
                    animation="pulse"
                    className="text-primary"
                  />
                  <CardTitle>Upcoming Interviews</CardTitle>
                </div>
                <Badge variant="outline" className="animate-pulse">
                  <AnimatedCounter value={upcomingInterviews.length} />{" "}
                  scheduled
                </Badge>
              </div>
              <CardDescription>
                Manage and coordinate interview appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <Card
                    key={interview.id}
                    className="hover-lift animate-fadeInUp relative overflow-hidden group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">
                              {interview.candidate}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {interview.position}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <AnimatedIcon
                                icon={Star}
                                animation="glow"
                                className="text-yellow-500"
                                size="sm"
                              />
                              <span className="text-sm">
                                {interview.candidateRating}
                              </span>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(interview.status)}`}
                          >
                            {interview.status === "confirmed" && (
                              <CheckCircle className="mr-1 h-3 w-3" />
                            )}
                            {interview.status === "pending_confirmation" && (
                              <Clock className="mr-1 h-3 w-3" />
                            )}
                            {interview.status.replace("_", " ")}
                          </Badge>
                        </div>

                        {/* Schedule Details */}
                        <div className="grid gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <AnimatedIcon
                              icon={Calendar}
                              size="sm"
                              className="text-primary"
                            />
                            <span>
                              {interview.date} at {interview.time}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {interview.duration}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <AnimatedIcon
                              icon={getFormatIcon(interview.format)}
                              size="sm"
                              className="text-construction-500"
                            />
                            <span>
                              {interview.format} - {interview.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AnimatedIcon
                              icon={Users}
                              size="sm"
                              className="text-emerald-600"
                            />
                            <span>
                              Interviewer(s): {interview.panel.join(", ")}
                            </span>
                          </div>
                        </div>

                        {/* Type and Notes */}
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">
                            {interview.type}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            {interview.notes}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-2 border-t">
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Edit}
                              size="sm"
                              className="mr-1"
                            />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Bell}
                              size="sm"
                              className="mr-1"
                            />
                            Remind
                          </Button>
                          {interview.status === "pending_confirmation" && (
                            <Button size="sm">
                              <AnimatedIcon
                                icon={CheckCircle}
                                size="sm"
                                className="mr-1"
                              />
                              Confirm
                            </Button>
                          )}
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
                  icon={Users}
                  animation="bounce"
                  className="text-construction-500"
                />
                <CardTitle>Interviewer Availability</CardTitle>
              </div>
              <CardDescription>Current availability status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableInterviewers.map((interviewer, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">
                          {interviewer.name}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getAvailabilityColor(
                            interviewer.availability,
                          )}`}
                        >
                          {interviewer.availability === "High" && (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          )}
                          {interviewer.availability}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {interviewer.title}
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
                icon={Clock}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Interview Management</CardTitle>
            </div>
            <CardDescription>
              Common interview scheduling and management actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                Schedule Interview
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Bell} animation="pulse" className="mr-2" />
                Send Reminders
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={FileText}
                  animation="float"
                  className="mr-2"
                />
                Interview Templates
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Calendar}
                  animation="glow"
                  className="mr-2"
                />
                Bulk Reschedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
