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
  Target,
  MessageSquare,
  Star,
  Eye,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Plus,
  Calendar,
  Users,
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  UserCheck,
  Activity,
  FileText,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { BackToHRMS } from "@/components/hrms";

export default function PerformanceManagement() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <BackToHRMS />

        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Performance Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Target}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Comprehensive employee performance evaluation and development
              </p>
            </div>
          </div>
          <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden animate-slideInRight">
            <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
            Create New Goal
            <ShimmerEffect className="absolute inset-0" />
          </Button>
        </div>

        {/* Performance Overview Dashboard */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Appraisal Cycle
              </CardTitle>
              <AnimatedIcon
                icon={Calendar}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2024 Annual</div>
              <p className="text-xs text-muted-foreground">
                Due in 45 days • 65% completed
              </p>
              <Progress value={65} className="mt-2" />
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Team Performance Average
              </CardTitle>
              <AnimatedIcon
                icon={Star}
                animation="glow"
                className="text-yellow-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2/5.0</div>
              <p className="text-xs text-muted-foreground">
                +0.3 from last cycle • Exceeds expectations
              </p>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <Star className="h-3 w-3 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reviews
              </CardTitle>
              <AnimatedIcon
                icon={Clock}
                animation="pulse"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                8 self-assessments • 4 manager reviews
              </p>
              <Badge variant="outline" className="mt-2">
                <PulsingDot className="mr-1" />
                Action needed
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Goals Achievement
              </CardTitle>
              <AnimatedIcon
                icon={Target}
                animation="bounce"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                156 of 200 goals achieved this year
              </p>
              <Progress value={78} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Performance Management Modules */}
        <Card className="hover-lift animate-fadeInUp relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 via-transparent to-primary/5" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AnimatedIcon
                icon={BarChart3}
                animation="float"
                className="text-construction-600"
                size="lg"
              />
              Performance Management Modules
            </CardTitle>
            <CardDescription>
              Comprehensive performance evaluation and development system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link to="/hrms/performance/goals">
                <Card className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-construction-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Target}
                        animation="pulse"
                        className="text-construction-600"
                      />
                      <h3 className="font-semibold">
                        Goal Setting & Alignment
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      KRA/KPI creation, SMART goals, and company alignment
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">156 Active Goals</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/performance/feedback">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={MessageSquare}
                        animation="bounce"
                        className="text-blue-600"
                      />
                      <h3 className="font-semibold">Continuous Feedback</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ongoing feedback collection and peer recognition
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">42 New Feedbacks</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/performance/appraisals">
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
                        Mid-Year & Annual Appraisals
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Structured review cycles and evaluation forms
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">2024 Cycle Active</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/performance/360-feedback">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Users}
                        animation="glow"
                        className="text-purple-600"
                      />
                      <h3 className="font-semibold">360-Degree Feedback</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Multi-source feedback and stakeholder input
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">28 Pending Reviews</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/performance/ratings">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Star}
                        animation="pulse"
                        className="text-yellow-600"
                      />
                      <h3 className="font-semibold">Performance Ratings</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Rating scales, calibration, and distribution analysis
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">4.2 Avg Rating</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/performance/improvement-plans">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={TrendingUp}
                        animation="bounce"
                        className="text-orange-600"
                      />
                      <h3 className="font-semibold">
                        Performance Improvement Plans
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      PIP creation, monitoring, and support resources
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">3 Active PIPs</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/performance/analytics">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={BarChart3}
                        animation="float"
                        className="text-indigo-600"
                      />
                      <h3 className="font-semibold">
                        Appraisal History & Analytics
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Historical data, trends analysis, and insights
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">5 Years Data</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="animate-fadeInUp">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AnimatedIcon
                      icon={Activity}
                      animation="pulse"
                      className="text-primary"
                    />
                    Recent Performance Activities
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
                          Annual appraisal completed
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
                        <MessageSquare className="h-3 w-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          360-degree feedback submitted
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Priya Sharma • 5 hours ago
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-orange-100">
                        <Target className="h-3 w-3 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Q3 goals updated</p>
                        <p className="text-xs text-muted-foreground">
                          Amit Patel • 1 day ago
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Updated</Badge>
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
                    Team Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Site Engineering Team</span>
                      <span className="font-medium">4.6/5.0</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Project Management Team</span>
                      <span className="font-medium">4.3/5.0</span>
                    </div>
                    <Progress value={86} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Safety & Quality Team</span>
                      <span className="font-medium">4.1/5.0</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Administrative Team</span>
                      <span className="font-medium">3.9/5.0</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Management Summary */}
            <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
              <div className="flex items-center justify-center gap-2">
                <AnimatedIcon
                  icon={Award}
                  animation="glow"
                  className="text-construction-500"
                />
                <p className="text-center text-muted-foreground">
                  ✨ Comprehensive performance management system for goal-driven
                  workforce development
                </p>
                <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
