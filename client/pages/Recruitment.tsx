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
  UserPlus,
  Briefcase,
  Eye,
  FileText,
  Users,
  Calendar,
  Award,
  Shield,
  CheckCircle,
  Clock,
  TrendingUp,
  Search,
  Mail,
  Phone,
  MapPin,
  Star,
  Building,
  Target,
  Zap,
  Plus,
  Download,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const recruitmentStats = [
  {
    label: "Open Positions",
    value: 12,
    change: "+3 new this week",
    icon: Briefcase,
    color: "text-primary",
  },
  {
    label: "Active Candidates",
    value: 48,
    change: "+15 applications",
    icon: Users,
    color: "text-construction-500",
  },
  {
    label: "Interviews Scheduled",
    value: 8,
    change: "This week",
    icon: Calendar,
    color: "text-emerald-600",
  },
  {
    label: "Offers Extended",
    value: 3,
    change: "Pending responses",
    icon: Award,
    color: "text-yellow-500",
  },
];

const recruitmentModules = [
  {
    title: "Job Requisition Management",
    description: "Create, approve, and manage job requisitions",
    icon: FileText,
    href: "/hrms/recruitment/requisitions",
    color: "text-primary",
    bgColor: "bg-primary/10",
    features: [
      "Position approval workflow",
      "Budget allocation",
      "Hiring manager assignment",
    ],
  },
  {
    title: "Job Posting",
    description: "Internal & external job posting management",
    icon: Briefcase,
    href: "/hrms/recruitment/postings",
    color: "text-construction-500",
    bgColor: "bg-construction-500/10",
    features: [
      "Multi-platform posting",
      "Internal job boards",
      "External integrations",
    ],
  },
  {
    title: "Applicant Tracking System",
    description: "End-to-end candidate journey tracking",
    icon: Target,
    href: "/hrms/recruitment/ats",
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    features: ["Application pipeline", "Status tracking", "Communication logs"],
  },
  {
    title: "Resume Parsing",
    description: "AI-powered resume analysis and extraction",
    icon: Search,
    href: "/hrms/recruitment/parsing",
    color: "text-safety-600",
    bgColor: "bg-safety-600/10",
    features: [
      "Automated extraction",
      "Skills matching",
      "Duplicate detection",
    ],
  },
  {
    title: "Candidate Database",
    description: "Centralized candidate information system",
    icon: Users,
    href: "/hrms/recruitment/candidates",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    features: [
      "Talent pool management",
      "Search & filtering",
      "Candidate profiles",
    ],
  },
  {
    title: "Interview Scheduling",
    description: "Automated interview coordination system",
    icon: Calendar,
    href: "/hrms/recruitment/interviews",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    features: [
      "Calendar integration",
      "Panel coordination",
      "Automated reminders",
    ],
  },
  {
    title: "Offer Letter Management",
    description: "Digital offer letter creation and tracking",
    icon: Award,
    href: "/hrms/recruitment/offers",
    color: "text-yellow-600",
    bgColor: "bg-yellow-600/10",
    features: [
      "Template management",
      "Digital signatures",
      "Approval workflows",
    ],
  },
  {
    title: "Pre-Employment Checks",
    description: "Background verification and compliance",
    icon: Shield,
    href: "/hrms/recruitment/background",
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    features: [
      "Background verification",
      "Reference checks",
      "Document validation",
    ],
  },
  {
    title: "Onboarding Workflow",
    description: "Seamless new hire integration process",
    icon: CheckCircle,
    href: "/hrms/recruitment/onboarding",
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    features: ["Digital onboarding", "Task automation", "Progress tracking"],
  },
];

const recentApplications = [
  {
    id: 1,
    candidate: "Sarah Mitchell",
    position: "Senior Project Manager",
    appliedDate: "2 hours ago",
    status: "new",
    experience: "8 years",
    location: "New York, NY",
  },
  {
    id: 2,
    candidate: "David Park",
    position: "Site Supervisor",
    appliedDate: "5 hours ago",
    status: "screening",
    experience: "6 years",
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    candidate: "Maria Rodriguez",
    position: "Safety Coordinator",
    appliedDate: "1 day ago",
    status: "interview",
    experience: "4 years",
    location: "Houston, TX",
  },
  {
    id: 4,
    candidate: "James Wilson",
    position: "QA Inspector",
    appliedDate: "2 days ago",
    status: "offer",
    experience: "3 years",
    location: "Chicago, IL",
  },
];

const upcomingInterviews = [
  {
    id: 1,
    candidate: "Emma Thompson",
    position: "Project Engineer",
    date: "Today, 2:00 PM",
    interviewer: "John Smith",
    type: "Technical Round",
  },
  {
    id: 2,
    candidate: "Michael Chen",
    position: "Site Manager",
    date: "Tomorrow, 10:00 AM",
    interviewer: "Sarah Johnson",
    type: "HR Round",
  },
  {
    id: 3,
    candidate: "Lisa Wang",
    position: "Safety Specialist",
    date: "Dec 28, 3:00 PM",
    interviewer: "David Wilson",
    type: "Final Round",
  },
];

export default function Recruitment() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="flex items-center gap-4 animate-slideInLeft">
          <Button variant="outline" className="hover-lift" asChild>
            <Link to="/hrms">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to HRMS
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Recruitment & Talent Acquisition
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
                End-to-end recruitment management for construction talent
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
              New Job Posting
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Recruitment Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {recruitmentStats.map((stat, index) => (
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
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recruitment Modules */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Target}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Recruitment Modules</CardTitle>
            </div>
            <CardDescription>
              Comprehensive talent acquisition and recruitment management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recruitmentModules.map((module, index) => (
                <Link key={module.title} to={module.href} className="block">
                  <Card
                    className="hover-lift animate-scaleIn relative overflow-hidden group cursor-pointer h-full"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`absolute inset-0 ${module.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${module.bgColor}`}>
                            <AnimatedIcon
                              icon={module.icon}
                              animation="bounce"
                              className={module.color}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">
                              {module.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {module.description}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {module.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center gap-2 text-xs text-muted-foreground"
                            >
                              <CheckCircle className="h-3 w-3 text-emerald-600" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          className="w-full hover-lift pointer-events-none"
                          variant="outline"
                        >
                          <AnimatedIcon icon={Eye} size="sm" className="mr-2" />
                          Access Module
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Users}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Recent Applications</CardTitle>
              </div>
              <CardDescription>
                Latest candidate applications across all positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentApplications.map((application, index) => (
                  <div
                    key={application.id}
                    className="flex items-center justify-between p-3 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">
                        {application.candidate}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {application.position}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {application.appliedDate}
                        <MapPin className="h-3 w-3" />
                        {application.location}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge
                        variant={
                          application.status === "new"
                            ? "default"
                            : application.status === "offer"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {application.status === "new" && (
                          <PulsingDot className="mr-1 scale-50" />
                        )}
                        {application.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {application.experience} exp
                      </p>
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
                  icon={Calendar}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Upcoming Interviews</CardTitle>
              </div>
              <CardDescription>
                Scheduled interviews and assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingInterviews.map((interview, index) => (
                  <div
                    key={interview.id}
                    className="p-3 border rounded-lg animate-scaleIn hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">
                          {interview.candidate}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {interview.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {interview.position}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-primary" />
                          {interview.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-construction-500" />
                          {interview.interviewer}
                        </div>
                      </div>
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
                icon={Zap}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common recruitment tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/recruitment/postings">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Create Job Posting
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/recruitment/candidates">
                  <AnimatedIcon
                    icon={Search}
                    animation="pulse"
                    className="mr-2"
                  />
                  Search Candidates
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/recruitment/interviews">
                  <AnimatedIcon
                    icon={Calendar}
                    animation="float"
                    className="mr-2"
                  />
                  Schedule Interview
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/recruitment/offers">
                  <AnimatedIcon
                    icon={Award}
                    animation="glow"
                    className="mr-2"
                  />
                  Generate Offer
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
