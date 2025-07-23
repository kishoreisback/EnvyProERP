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
  Monitor,
  Plus,
  Play,
  Pause,
  Download,
  BookOpen,
  Video,
  FileText,
  Headphones,
  Star,
  Clock,
  Users,
  Trophy,
  BarChart3,
  Filter,
  Search,
  ArrowRight,
  CheckCircle,
  Zap,
  Laptop,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

export default function ElearningLMS() {
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
                E-learning Integration (LMS)
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Monitor}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Online learning platform and digital content delivery
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Download App
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Create Course
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Monitor}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Create E-learning Course
                  </DialogTitle>
                  <DialogDescription>
                    Design and publish interactive online courses
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                      <AnimatedIcon
                        icon={Laptop}
                        animation="bounce"
                        className="text-blue-600"
                        size="lg"
                      />
                    </div>
                    <h3 className="font-semibold mb-2">
                      E-learning Course Builder
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Create interactive multimedia learning experiences
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Start Building
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* LMS Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Online Courses
              </CardTitle>
              <AnimatedIcon
                icon={Monitor}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">
                Interactive e-learning modules
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Learners
              </CardTitle>
              <AnimatedIcon
                icon={Users}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">967</div>
              <p className="text-xs text-muted-foreground">
                Currently enrolled online
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <AnimatedIcon
                icon={Trophy}
                animation="glow"
                className="text-yellow-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                Average course completion
              </p>
              <Progress value={92} className="mt-2" />
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Learning Hours
              </CardTitle>
              <AnimatedIcon
                icon={Clock}
                animation="pulse"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground">
                Total hours of online learning
              </p>
            </CardContent>
          </Card>
        </div>

        {/* E-learning LMS Interface */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Laptop}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  Learning Management System
                </CardTitle>
                <CardDescription>
                  Interactive online learning platform and content management
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <AnimatedIcon icon={Filter} size="sm" className="mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="my-learning" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="my-learning">My Learning</TabsTrigger>
                <TabsTrigger value="course-library">Course Library</TabsTrigger>
                <TabsTrigger value="live-sessions">Live Sessions</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="my-learning" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Course Progress Card 1 */}
                  <Card className="hover-lift animate-scaleIn group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="h-32 bg-gradient-to-br from-construction-500 to-construction-600 flex items-center justify-center">
                          <AnimatedIcon
                            icon={Play}
                            animation="float"
                            className="text-white"
                            size="lg"
                          />
                        </div>
                        <Badge className="absolute top-2 right-2 bg-green-500">
                          In Progress
                        </Badge>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold mb-1">
                            Safety Management Fundamentals
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Interactive modules covering essential safety
                            protocols
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            <span>12 videos</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span>5 quizzes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>6 hours</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <AnimatedIcon
                              icon={Play}
                              size="sm"
                              className="mr-1"
                            />
                            Continue Learning
                          </Button>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Download}
                              size="sm"
                              className="mr-1"
                            />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Course Progress Card 2 */}
                  <Card
                    className="hover-lift animate-scaleIn group relative overflow-hidden"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <AnimatedIcon
                            icon={CheckCircle}
                            animation="glow"
                            className="text-white"
                            size="lg"
                          />
                        </div>
                        <Badge className="absolute top-2 right-2 bg-yellow-500">
                          Completed
                        </Badge>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold mb-1">
                            Digital Construction Tools
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Master modern construction software and digital
                            workflows
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            <span>18 videos</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span>8 assignments</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>12 hours</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>100%</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            variant="outline"
                          >
                            <AnimatedIcon
                              icon={Trophy}
                              size="sm"
                              className="mr-1"
                            />
                            View Certificate
                          </Button>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Star}
                              size="sm"
                              className="mr-1"
                            />
                            Rate Course
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Course Progress Card 3 */}
                  <Card
                    className="hover-lift animate-scaleIn group relative overflow-hidden"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="h-32 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                          <AnimatedIcon
                            icon={Headphones}
                            animation="pulse"
                            className="text-white"
                            size="lg"
                          />
                        </div>
                        <Badge className="absolute top-2 right-2 bg-blue-500">
                          Audio Course
                        </Badge>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold mb-1">
                            Communication Excellence
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Podcast series on effective workplace communication
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Headphones className="h-4 w-4" />
                            <span>15 episodes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span>3 exercises</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>8 hours</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>30%</span>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <AnimatedIcon
                              icon={Play}
                              size="sm"
                              className="mr-1"
                            />
                            Listen Now
                          </Button>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Download}
                              size="sm"
                              className="mr-1"
                            />
                            Offline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Course Progress Card 4 */}
                  <Card
                    className="hover-lift animate-scaleIn group relative overflow-hidden"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="h-32 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                          <AnimatedIcon
                            icon={BookOpen}
                            animation="bounce"
                            className="text-white"
                            size="lg"
                          />
                        </div>
                        <Badge className="absolute top-2 right-2 bg-orange-500">
                          New
                        </Badge>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold mb-1">
                            Quality Control Mastery
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive guide to quality assurance practices
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            <span>10 modules</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span>6 labs</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>14 hours</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>Not Started</span>
                          </div>
                          <Progress value={0} className="h-2" />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <AnimatedIcon
                              icon={Play}
                              size="sm"
                              className="mr-1"
                            />
                            Start Course
                          </Button>
                          <Button size="sm" variant="outline">
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="course-library" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={BookOpen}
                    animation="float"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    E-learning Course Library
                  </h3>
                  <p className="text-muted-foreground">
                    Browse comprehensive online course collection
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="live-sessions" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Video}
                    animation="pulse"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Live Learning Sessions
                  </h3>
                  <p className="text-muted-foreground">
                    Interactive live classes and virtual workshops
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={BarChart3}
                          animation="pulse"
                          className="text-primary"
                        />
                        Learning Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Courses Completed</span>
                          <span className="font-medium">12/15</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Certificates Earned</span>
                          <span className="font-medium">8</span>
                        </div>
                        <Progress value={67} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Study Streak</span>
                          <span className="font-medium">23 days</span>
                        </div>
                        <Progress value={85} className="h-2" />
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
                          icon={Trophy}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Learning Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Total Learning Hours</span>
                          <span className="font-medium">247 hours</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Average Quiz Score</span>
                          <span className="font-medium">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Course Completion Rate</span>
                          <span className="font-medium">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* E-learning LMS Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Advanced e-learning platform delivering engaging digital
              education experiences
            </p>
            <Monitor className="h-4 w-4 text-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
