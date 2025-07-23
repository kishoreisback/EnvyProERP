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
  UserMinus,
  FileText,
  Upload,
  Shield,
  Calendar,
  Mail,
  CheckCircle,
  Users,
  Building,
  Settings,
  Clock,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  Briefcase,
  Award,
  Key,
  Monitor,
  CreditCard,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

const moduleStats = [
  {
    label: "Active Onboarding",
    value: 8,
    change: "+3 new hires",
    icon: UserPlus,
    color: "text-emerald-600",
  },
  {
    label: "Pending Offboarding",
    value: 5,
    change: "2 this week",
    icon: UserMinus,
    color: "text-yellow-500",
  },
  {
    label: "Completed This Month",
    value: 24,
    change: "15 onboard, 9 offboard",
    icon: CheckCircle,
    color: "text-primary",
  },
  {
    label: "Avg Processing Time",
    value: 6.5,
    change: "days to complete",
    icon: Clock,
    color: "text-construction-500",
  },
];

const onboardingModules = [
  {
    title: "Digital Onboarding Forms",
    description: "Electronic forms for new hire documentation",
    icon: FileText,
    href: "/hrms/onboarding/forms",
    color: "text-primary",
    bgColor: "bg-primary/10",
    features: [
      "Personal information forms",
      "Tax documentation (W-4, I-9)",
      "Emergency contacts",
      "Digital signatures",
    ],
  },
  {
    title: "Document Upload & Verification",
    description: "Secure document management and validation",
    icon: Upload,
    href: "/hrms/onboarding/documents",
    color: "text-construction-500",
    bgColor: "bg-construction-500/10",
    features: [
      "ID verification",
      "Education certificates",
      "Background check docs",
      "Automated validation",
    ],
  },
  {
    title: "Asset Allocation",
    description: "Company equipment and resource assignment",
    icon: Monitor,
    href: "/hrms/onboarding/assets",
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    features: [
      "IT equipment assignment",
      "Office space allocation",
      "Access cards & keys",
      "Mobile devices",
    ],
  },
  {
    title: "Induction & Orientation",
    description: "Structured orientation program scheduling",
    icon: Calendar,
    href: "/hrms/onboarding/orientation",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    features: [
      "Orientation scheduling",
      "Department introductions",
      "Company culture training",
      "Policy briefings",
    ],
  },
  {
    title: "Welcome Emails & Checklists",
    description: "Automated communication and task management",
    icon: Mail,
    href: "/hrms/onboarding/communications",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    features: [
      "Welcome email templates",
      "Task checklists",
      "Progress tracking",
      "Automated reminders",
    ],
  },
];

const offboardingModules = [
  {
    title: "Exit Interview Management",
    description: "Structured exit interview process",
    icon: MessageSquare,
    href: "/hrms/offboarding/interviews",
    color: "text-yellow-600",
    bgColor: "bg-yellow-600/10",
    features: [
      "Interview scheduling",
      "Feedback collection",
      "Resignation processing",
      "Analytics & insights",
    ],
  },
  {
    title: "Knowledge Transfer",
    description: "Capture and transfer critical knowledge",
    icon: BookOpen,
    href: "/hrms/offboarding/knowledge",
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    features: [
      "Documentation handover",
      "Project transitions",
      "Contact transfers",
      "Knowledge repositories",
    ],
  },
  {
    title: "Final Clearance",
    description: "Multi-department clearance workflow",
    icon: Shield,
    href: "/hrms/offboarding/clearance",
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    features: [
      "HR clearance",
      "Finance settlement",
      "IT access revocation",
      "Asset return tracking",
    ],
  },
];

const recentActivity = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    type: "onboarding",
    status: "in_progress",
    department: "Engineering",
    progress: 75,
    daysElapsed: 3,
    nextTask: "IT Setup",
  },
  {
    id: 2,
    employee: "David Park",
    type: "offboarding",
    status: "pending_clearance",
    department: "Operations",
    progress: 60,
    daysElapsed: 5,
    nextTask: "Finance Clearance",
  },
  {
    id: 3,
    employee: "Maria Rodriguez",
    type: "onboarding",
    status: "completed",
    department: "Safety",
    progress: 100,
    daysElapsed: 7,
    nextTask: "Completed",
  },
  {
    id: 4,
    employee: "James Wilson",
    type: "offboarding",
    status: "exit_interview",
    department: "Quality",
    progress: 25,
    daysElapsed: 2,
    nextTask: "Knowledge Transfer",
  },
];

export default function OnboardingOffboarding() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-emerald-600";
      case "in_progress":
        return "text-blue-600";
      case "pending_clearance":
        return "text-yellow-600";
      case "exit_interview":
        return "text-orange-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "onboarding" ? UserPlus : UserMinus;
  };

  const getTypeColor = (type: string) => {
    return type === "onboarding" ? "text-emerald-600" : "text-red-500";
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="animate-slideInDown">
          <Button variant="ghost" size="sm" asChild className="hover-lift">
            <Link to="/hrms">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to HRMS
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Onboarding & Offboarding
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Users}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Complete employee lifecycle management from hire to departure
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
              New Process
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {moduleStats.map((stat, index) => (
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

        {/* Onboarding Modules */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={UserPlus}
                animation="pulse"
                className="text-emerald-600"
              />
              <CardTitle>Onboarding Modules</CardTitle>
            </div>
            <CardDescription>
              New hire integration and setup processes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {onboardingModules.map((module, index) => (
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

        {/* Offboarding Modules */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={UserMinus}
                animation="pulse"
                className="text-red-500"
              />
              <CardTitle>Offboarding Modules</CardTitle>
            </div>
            <CardDescription>
              Employee departure and knowledge transfer processes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
              {offboardingModules.map((module, index) => (
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
                              <CheckCircle className="h-3 w-3 text-red-500" />
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
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Clock}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Recent Activity</CardTitle>
            </div>
            <CardDescription>
              Latest onboarding and offboarding processes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={getTypeIcon(activity.type)}
                        animation="float"
                        className={getTypeColor(activity.type)}
                      />
                      <div>
                        <p className="font-medium text-sm">
                          {activity.employee}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.department} • Day {activity.daysElapsed}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(activity.status)}`}
                    >
                      {activity.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {activity.progress}% Complete
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Next: {activity.nextTask}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="hover-lift">
                      <AnimatedIcon icon={Eye} className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="animate-slideInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Settings}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common onboarding and offboarding tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/onboarding/forms">
                  <AnimatedIcon
                    icon={FileText}
                    animation="bounce"
                    className="mr-2"
                  />
                  Create Onboarding
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/offboarding/interviews">
                  <AnimatedIcon
                    icon={MessageSquare}
                    animation="pulse"
                    className="mr-2"
                  />
                  Schedule Exit Interview
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/onboarding/assets">
                  <AnimatedIcon
                    icon={Monitor}
                    animation="float"
                    className="mr-2"
                  />
                  Assign Assets
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover-lift justify-start"
                asChild
              >
                <Link to="/hrms/offboarding/clearance">
                  <AnimatedIcon
                    icon={Shield}
                    animation="glow"
                    className="mr-2"
                  />
                  Process Clearance
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
