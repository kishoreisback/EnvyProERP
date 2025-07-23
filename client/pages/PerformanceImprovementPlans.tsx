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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  TrendingUp,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Target,
  BookOpen,
  Award,
  Eye,
  Edit,
  Download,
  Filter,
  Calendar,
  FileText,
  Zap,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function PerformanceImprovementPlans() {
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
                Performance Improvement Plans
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={TrendingUp}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Structured improvement plans and development support
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Plans
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Create PIP
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={TrendingUp}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Create Performance Improvement Plan
                  </DialogTitle>
                  <DialogDescription>
                    Design a structured improvement plan with clear goals and
                    timelines
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Employee</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
                        <SelectItem value="priya">Priya Sharma</SelectItem>
                        <SelectItem value="amit">Amit Patel</SelectItem>
                        <SelectItem value="sunita">Sunita Singh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>PIP Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="performance">
                            Performance Issues
                          </SelectItem>
                          <SelectItem value="behavioral">
                            Behavioral Concerns
                          </SelectItem>
                          <SelectItem value="skills">
                            Skills Development
                          </SelectItem>
                          <SelectItem value="attendance">
                            Attendance Issues
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="60">60 Days</SelectItem>
                          <SelectItem value="90">90 Days</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Performance Issues</Label>
                    <Textarea placeholder="Describe specific performance concerns..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Improvement Goals</Label>
                    <Textarea placeholder="Define clear, measurable improvement goals..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Support Resources</Label>
                    <Textarea placeholder="Training, mentoring, tools, or resources provided..." />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Create PIP
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* PIP Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active PIPs</CardTitle>
              <AnimatedIcon
                icon={AlertTriangle}
                animation="float"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
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
                Successfully Completed
              </CardTitle>
              <AnimatedIcon
                icon={CheckCircle}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                78% success rate this year
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Approaching Deadline
              </CardTitle>
              <AnimatedIcon
                icon={Clock}
                animation="pulse"
                className="text-red-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Requires immediate attention
              </p>
              <Badge variant="destructive" className="mt-2">
                <PulsingDot className="mr-1" />
                Urgent
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Duration
              </CardTitle>
              <AnimatedIcon
                icon={Calendar}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67 days</div>
              <p className="text-xs text-muted-foreground">
                Typical completion time
              </p>
            </CardContent>
          </Card>
        </div>

        {/* PIP Management Interface */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Target}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  Performance Improvement Plans Dashboard
                </CardTitle>
                <CardDescription>
                  Monitor and support employee development journeys
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
            <Tabs defaultValue="active-pips" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="active-pips">Active PIPs</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="active-pips" className="space-y-4">
                <div className="grid gap-4">
                  {/* Active PIP 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">Rajesh Kumar</h4>
                              <p className="text-sm text-muted-foreground">
                                Site Engineer • Construction Team
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="bg-orange-50 text-orange-600"
                              >
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Performance Issues
                              </Badge>
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-600"
                              >
                                Day 45 of 90
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <strong>Issues:</strong> Inconsistent project
                              delivery timelines and communication gaps with
                              team members
                            </p>
                            <p className="text-sm">
                              <strong>Goals:</strong> Improve project planning
                              accuracy by 25% and enhance team collaboration
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>6 of 10 milestones</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Started: Aug 15, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Due: Nov 15, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              Manager: Priya Sharma
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <AnimatedIcon
                                icon={Eye}
                                size="sm"
                                className="mr-1"
                              />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <AnimatedIcon
                                icon={Edit}
                                size="sm"
                                className="mr-1"
                              />
                              Update Progress
                            </Button>
                            <Button size="sm" variant="outline">
                              <AnimatedIcon
                                icon={BookOpen}
                                size="sm"
                                className="mr-1"
                              />
                              Training Resources
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active PIP 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>SS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">Sunita Singh</h4>
                              <p className="text-sm text-muted-foreground">
                                Quality Inspector • Quality Team
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="bg-purple-50 text-purple-600"
                              >
                                <BookOpen className="h-3 w-3 mr-1" />
                                Skills Development
                              </Badge>
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-600"
                              >
                                Day 20 of 60
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <strong>Focus Area:</strong> Advanced quality
                              testing methodologies and digital inspection tools
                            </p>
                            <p className="text-sm">
                              <strong>Goals:</strong> Master new testing
                              equipment and achieve certification in quality
                              standards
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>3 of 8 modules</span>
                            </div>
                            <Progress value={38} className="h-2" />
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Started: Sep 20, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Due: Nov 20, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              Mentor: Amit Patel
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <AnimatedIcon
                                icon={Eye}
                                size="sm"
                                className="mr-1"
                              />
                              View Progress
                            </Button>
                            <Button size="sm" variant="outline">
                              <AnimatedIcon
                                icon={BookOpen}
                                size="sm"
                                className="mr-1"
                              />
                              Learning Materials
                            </Button>
                            <Button size="sm" variant="outline">
                              Schedule Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={Target}
                          animation="pulse"
                          className="text-primary"
                        />
                        Milestone Tracking
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Goals Achieved</span>
                          <span className="font-medium">12 of 15</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Training Completed</span>
                          <span className="font-medium">8 of 10</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Performance Metrics</span>
                          <span className="font-medium">70% Improved</span>
                        </div>
                        <Progress value={70} className="h-2" />
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
                        Success Indicators
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>On-time Completion</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sustainable Improvement</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Employee Satisfaction</span>
                          <span className="font-medium">4.2/5</span>
                        </div>
                        <Progress value={84} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Award}
                    animation="glow"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Completed Improvement Plans
                  </h3>
                  <p className="text-muted-foreground">
                    Track successful completion and long-term outcomes
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={BookOpen}
                          animation="float"
                          className="text-blue-500"
                        />
                        Training Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">
                          Project Management Fundamentals
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Online course • 20 hours
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">
                          Communication Skills Workshop
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          In-person training • 2 days
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Leadership Development</h4>
                        <p className="text-sm text-muted-foreground">
                          Mentoring program • 3 months
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="animate-fadeInUp"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={Users}
                          animation="bounce"
                          className="text-construction-500"
                        />
                        Support Network
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">HR Business Partner</h4>
                        <p className="text-sm text-muted-foreground">
                          Policy guidance and support
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Assigned Mentor</h4>
                        <p className="text-sm text-muted-foreground">
                          One-on-one coaching sessions
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Peer Support Group</h4>
                        <p className="text-sm text-muted-foreground">
                          Weekly discussion forums
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* PIP System Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Supportive improvement framework focusing on development and
              long-term success
            </p>
            <Heart className="h-4 w-4 text-pink-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
