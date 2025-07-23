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
import {
  BookOpen,
  Plus,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  Award,
  FileText,
  Monitor,
  Target,
  Star,
  Activity,
  ArrowRight,
  BarChart3,
  GraduationCap,
  Zap,
  Brain,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { BackToHRMS } from "@/components/hrms";

export default function LearningDevelopment() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <BackToHRMS />

        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Learning & Development
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={BookOpen}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Comprehensive training and skill development platform
              </p>
            </div>
          </div>
          <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden animate-slideInRight">
            <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
            Enroll in Course
            <ShimmerEffect className="absolute inset-0" />
          </Button>
        </div>

        {/* L&D Overview Dashboard */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Courses
              </CardTitle>
              <AnimatedIcon
                icon={BookOpen}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">
                +15 new courses this month
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Enrolled Learners
              </CardTitle>
              <AnimatedIcon
                icon={Users}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                89% completion rate this quarter
              </p>
              <Progress value={89} className="mt-2" />
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Certifications Earned
              </CardTitle>
              <AnimatedIcon
                icon={Award}
                animation="glow"
                className="text-yellow-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">324</div>
              <p className="text-xs text-muted-foreground">
                +67 from last quarter
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Training Hours
              </CardTitle>
              <AnimatedIcon
                icon={Clock}
                animation="pulse"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,942</div>
              <p className="text-xs text-muted-foreground">
                Total learning hours delivered
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Learning & Development Modules */}
        <Card className="hover-lift animate-fadeInUp relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 via-transparent to-primary/5" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AnimatedIcon
                icon={GraduationCap}
                animation="float"
                className="text-construction-600"
                size="lg"
              />
              Learning & Development Modules
            </CardTitle>
            <CardDescription>
              Comprehensive training and development management system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link to="/hrms/learning/catalog">
                <Card className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-construction-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={BookOpen}
                        animation="pulse"
                        className="text-construction-600"
                      />
                      <h3 className="font-semibold">Course Catalog</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Browse and manage comprehensive training course library
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">142 Courses</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/learning/requests">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={FileText}
                        animation="bounce"
                        className="text-blue-600"
                      />
                      <h3 className="font-semibold">Training Requests</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Submit and approve training enrollment requests
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">28 Pending</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/learning/calendar">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Calendar}
                        animation="float"
                        className="text-emerald-600"
                      />
                      <h3 className="font-semibold">
                        Training Calendar & Scheduling
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Schedule and manage training sessions and events
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">15 This Week</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/learning/lms">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Monitor}
                        animation="glow"
                        className="text-purple-600"
                      />
                      <h3 className="font-semibold">
                        E-learning Integration (LMS)
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Online learning platform and digital content delivery
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">85 Online Courses</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/learning/tracking">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={BarChart3}
                        animation="pulse"
                        className="text-orange-600"
                      />
                      <h3 className="font-semibold">
                        Training Attendance & Completion
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Track attendance, progress, and completion rates
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">89% Completion</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/learning/certifications">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Award}
                        animation="bounce"
                        className="text-yellow-600"
                      />
                      <h3 className="font-semibold">
                        Certification Management
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Manage certificates, accreditations, and renewals
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">324 Certificates</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/learning/feedback">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Star}
                        animation="float"
                        className="text-indigo-600"
                      />
                      <h3 className="font-semibold">
                        Training Feedback & Effectiveness
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Evaluate training impact and continuous improvement
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">4.6/5 Avg Rating</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Recent Activity & Quick Stats */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="animate-fadeInUp">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AnimatedIcon
                      icon={Activity}
                      animation="pulse"
                      className="text-primary"
                    />
                    Recent Learning Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-green-100">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Safety Training completed
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Rajesh Kumar • 2 hours ago
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-blue-100">
                        <BookOpen className="h-3 w-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          New course enrollment
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Priya Sharma • 5 hours ago
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Enrolled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-yellow-100">
                        <Award className="h-3 w-3 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Certification achieved
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Amit Patel • 1 day ago
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Certified</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="animate-fadeInUp"
                style={{ animationDelay: "0.1s" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AnimatedIcon
                      icon={TrendingUp}
                      animation="glow"
                      className="text-construction-500"
                    />
                    Learning Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Safety & Compliance</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Technical Skills</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Leadership Development</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Digital Skills</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Learning & Development Summary */}
            <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
              <div className="flex items-center justify-center gap-2">
                <AnimatedIcon
                  icon={Zap}
                  animation="glow"
                  className="text-construction-500"
                />
                <p className="text-center text-muted-foreground">
                  ✨ Comprehensive learning platform driving continuous skill
                  development and growth
                </p>
                <Brain className="h-4 w-4 text-purple-500 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
