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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import {
  Users,
  Plus,
  Star,
  CheckCircle,
  Clock,
  Eye,
  UserCheck,
  TrendingUp,
  Target,
  Award,
  BarChart3,
  Download,
  Filter,
  MessageSquare,
  ArrowRight,
  RefreshCw,
  Zap,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function Feedback360() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/hrms/performance"
                  className="hover:text-construction-600"
                >
                  <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                  Back to Performance Management
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                360-Degree Feedback
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Users}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Multi-source feedback from peers, managers, and subordinates
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Start 360 Review
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Users}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Launch 360-Degree Feedback
                  </DialogTitle>
                  <DialogDescription>
                    Create a comprehensive multi-source feedback cycle
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-construction-200"></div>
                      <div className="absolute inset-2 rounded-full border-4 border-construction-400"></div>
                      <div className="absolute inset-4 rounded-full border-4 border-construction-600 flex items-center justify-center">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>YS</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2">
                        <div className="bg-green-100 p-2 rounded-full">
                          <UserCheck className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                        <div className="bg-orange-100 p-2 rounded-full">
                          <Target className="h-4 w-4 text-orange-600" />
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-0 transform -translate-x-2 -translate-y-1/2">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Award className="h-4 w-4 text-purple-600" />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">
                      360-Degree Feedback Process
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Gather comprehensive feedback from all stakeholders
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Launch Review
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 360 Feedback Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Reviews
              </CardTitle>
              <AnimatedIcon
                icon={RefreshCw}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Currently in progress
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Responses
              </CardTitle>
              <AnimatedIcon
                icon={Clock}
                animation="pulse"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Feedback requests awaiting response
              </p>
              <Badge variant="outline" className="mt-2">
                <PulsingDot className="mr-1" />
                Action needed
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed This Quarter
              </CardTitle>
              <AnimatedIcon
                icon={CheckCircle}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                95% completion rate
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Score
              </CardTitle>
              <AnimatedIcon
                icon={Star}
                animation="bounce"
                className="text-yellow-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.1/5</div>
              <p className="text-xs text-muted-foreground">
                Across all competencies
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
        </div>

        {/* 360 Feedback Management Interface */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={BarChart3}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  360-Degree Feedback Dashboard
                </CardTitle>
                <CardDescription>
                  Manage multi-source feedback cycles and insights
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
            <Tabs defaultValue="my-reviews" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
                <TabsTrigger value="requests">Requests</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="my-reviews" className="space-y-4">
                <div className="grid gap-4">
                  {/* Review Item 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src="/placeholder-avatar.jpg" />
                              <AvatarFallback>RK</AvatarFallback>
                            </Avatar>
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              8
                            </div>
                          </div>
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">Rajesh Kumar</h3>
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-600"
                              >
                                In Progress
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Site Engineer • Construction Team
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-blue-500" />
                                <span>5 Peers</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <UserCheck className="h-4 w-4 text-green-500" />
                                <span>1 Manager</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="h-4 w-4 text-orange-500" />
                                <span>2 Direct Reports</span>
                              </div>
                            </div>
                            <Progress value={75} className="w-full" />
                            <p className="text-xs text-muted-foreground">
                              6 of 8 responses received
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            View Results
                          </Button>
                          <Button size="sm" variant="outline">
                            Send Reminder
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Review Item 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src="/placeholder-avatar.jpg" />
                              <AvatarFallback>PS</AvatarFallback>
                            </Avatar>
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              6
                            </div>
                          </div>
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">Priya Sharma</h3>
                              <Badge
                                variant="outline"
                                className="bg-yellow-50 text-yellow-600"
                              >
                                Pending
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Project Manager • Management Team
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-blue-500" />
                                <span>4 Peers</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <UserCheck className="h-4 w-4 text-green-500" />
                                <span>1 Manager</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="h-4 w-4 text-orange-500" />
                                <span>1 Direct Report</span>
                              </div>
                            </div>
                            <Progress value={33} className="w-full" />
                            <p className="text-xs text-muted-foreground">
                              2 of 6 responses received
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={RefreshCw}
                              size="sm"
                              className="mr-1"
                            />
                            Remind All
                          </Button>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            Check Status
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="requests" className="space-y-4">
                <div className="grid gap-4">
                  {/* Request Item 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>AP</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Amit Patel</h4>
                            <Badge
                              variant="outline"
                              className="bg-orange-50 text-orange-600"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Due in 3 days
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Safety Manager • Feedback requested for Q3 review
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>
                              Competencies: Safety Leadership, Communication
                            </span>
                            <span>Estimated time: 15 minutes</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="bg-construction-500 hover:bg-construction-600"
                          >
                            <AnimatedIcon
                              icon={MessageSquare}
                              size="sm"
                              className="mr-1"
                            />
                            Provide Feedback
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Request Item 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>SS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Sunita Singh</h4>
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-600"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Overdue by 1 day
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Quality Inspector • Feedback requested for annual
                            review
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>
                              Competencies: Quality Control, Attention to Detail
                            </span>
                            <span>Estimated time: 12 minutes</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="bg-construction-500 hover:bg-construction-600"
                          >
                            <AnimatedIcon
                              icon={MessageSquare}
                              size="sm"
                              className="mr-1"
                            />
                            Provide Feedback
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={CheckCircle}
                    animation="glow"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Completed 360 Reviews
                  </h3>
                  <p className="text-muted-foreground">
                    View historical 360-degree feedback reports and insights
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={TrendingUp}
                          animation="pulse"
                          className="text-primary"
                        />
                        Competency Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Technical Skills</span>
                          <span className="font-medium">4.6/5</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Communication</span>
                          <span className="font-medium">4.3/5</span>
                        </div>
                        <Progress value={86} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Teamwork</span>
                          <span className="font-medium">4.1/5</span>
                        </div>
                        <Progress value={82} className="h-2" />
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
                          icon={Target}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Development Areas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Leadership</span>
                          <span className="font-medium">3.2/5</span>
                        </div>
                        <Progress value={64} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Strategic Thinking</span>
                          <span className="font-medium">3.4/5</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Innovation</span>
                          <span className="font-medium">3.6/5</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 360 Feedback Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Comprehensive 360-degree feedback providing holistic
              performance insights
            </p>
            <Heart className="h-4 w-4 text-pink-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
