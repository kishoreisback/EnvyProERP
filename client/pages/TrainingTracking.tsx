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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import {
  BarChart3,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Eye,
  Filter,
  Download,
  UserCheck,
  ArrowRight,
  Target,
  Activity,
  Zap,
  ClipboardCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function TrainingTracking() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/hrms/learning"
                  className="hover:text-construction-600"
                >
                  <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                  Back to Learning & Development
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Training Attendance & Completion Tracking
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={BarChart3}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Track attendance, progress, and completion rates
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Reports
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
              <AnimatedIcon
                icon={UserCheck}
                animation="bounce"
                className="mr-2"
              />
              Mark Attendance
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Tracking Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Attendance
              </CardTitle>
              <AnimatedIcon
                icon={UserCheck}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                +2% from last month
              </p>
              <Progress value={94} className="mt-2" />
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <AnimatedIcon
                icon={CheckCircle}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">
                Above industry average
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Learners
              </CardTitle>
              <AnimatedIcon
                icon={Users}
                animation="pulse"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">
                Currently in training
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                At-Risk Learners
              </CardTitle>
              <AnimatedIcon
                icon={AlertTriangle}
                animation="bounce"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
              <Badge variant="outline" className="mt-2">
                <PulsingDot className="mr-1" />
                Follow-up needed
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Training Tracking Interface */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={ClipboardCheck}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  Training Tracking Dashboard
                </CardTitle>
                <CardDescription>
                  Monitor attendance, progress, and completion analytics
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <AnimatedIcon icon={Filter} size="sm" className="mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="attendance" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="completion">Completion</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="attendance" className="space-y-4">
                <div className="grid gap-4">
                  {/* Attendance Record 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback>RK</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">Rajesh Kumar</h4>
                            <p className="text-sm text-muted-foreground">
                              Site Engineer • Safety Training
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">Sessions</div>
                            <div className="text-lg font-bold">8/10</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Attendance
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              80%
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-600"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Regular
                          </Badge>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Attendance Record 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback>PS</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">Priya Sharma</h4>
                            <p className="text-sm text-muted-foreground">
                              Project Manager • Leadership Program
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">Sessions</div>
                            <div className="text-lg font-bold">12/12</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Attendance
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              100%
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-600"
                          >
                            <Target className="h-3 w-3 mr-1" />
                            Perfect
                          </Badge>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Attendance Record 3 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback>AP</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">Amit Patel</h4>
                            <p className="text-sm text-muted-foreground">
                              Safety Manager • Quality Control Training
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">Sessions</div>
                            <div className="text-lg font-bold">4/8</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Attendance
                            </div>
                            <div className="text-lg font-bold text-orange-600">
                              50%
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-orange-50 text-orange-600"
                          >
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            At Risk
                          </Badge>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            Follow Up
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-4">
                <div className="grid gap-4">
                  {/* Progress Tracking Cards */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">
                            Safety Management Training
                          </h3>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-600"
                          >
                            On Track
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">24</div>
                            <div className="text-sm text-muted-foreground">
                              Enrolled
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">18</div>
                            <div className="text-sm text-muted-foreground">
                              In Progress
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">15</div>
                            <div className="text-sm text-muted-foreground">
                              Completed
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Overall Progress</span>
                            <span>75%</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">
                            Leadership Excellence Program
                          </h3>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-600"
                          >
                            Excellent
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">16</div>
                            <div className="text-sm text-muted-foreground">
                              Enrolled
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">12</div>
                            <div className="text-sm text-muted-foreground">
                              In Progress
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">14</div>
                            <div className="text-sm text-muted-foreground">
                              Completed
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Overall Progress</span>
                            <span>88%</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="completion" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={CheckCircle}
                    animation="glow"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Completion Tracking
                  </h3>
                  <p className="text-muted-foreground">
                    Monitor course and certification completion rates
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={TrendingUp}
                          animation="pulse"
                          className="text-primary"
                        />
                        Training Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Average Attendance Rate</span>
                          <span className="font-medium">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Course Completion Rate</span>
                          <span className="font-medium">89%</span>
                        </div>
                        <Progress value={89} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>On-Time Completion</span>
                          <span className="font-medium">76%</span>
                        </div>
                        <Progress value={76} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Learner Satisfaction</span>
                          <span className="font-medium">4.3/5</span>
                        </div>
                        <Progress value={86} className="h-2" />
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
                          icon={Activity}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Department Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engineering Team</span>
                          <span className="font-medium">96%</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Project Management</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Safety & Quality</span>
                          <span className="font-medium">98%</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Operations</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Training Tracking Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Comprehensive tracking system ensuring training effectiveness
              and learner engagement
            </p>
            <BarChart3 className="h-4 w-4 text-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
