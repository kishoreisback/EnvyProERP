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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Calendar,
  Plus,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  TrendingUp,
  Eye,
  Edit,
  FileText,
  Award,
  Target,
  BarChart3,
  Download,
  Filter,
  PlayCircle,
  PauseCircle,
  UserCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function AppraisalCycles() {
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
                Mid-Year & Annual Appraisals
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Calendar}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Structured performance review cycles and evaluation management
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
                  Start Appraisal
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Calendar}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Create Appraisal Cycle
                  </DialogTitle>
                  <DialogDescription>
                    Set up a new performance review cycle
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Cycle Name</Label>
                    <Input placeholder="e.g., Q3 2024 Mid-Year Review" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cycle Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mid-year">
                            Mid-Year Review
                          </SelectItem>
                          <SelectItem value="annual">Annual Review</SelectItem>
                          <SelectItem value="quarterly">
                            Quarterly Review
                          </SelectItem>
                          <SelectItem value="probation">
                            Probation Review
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Review Period</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024-h1">
                            2024 H1 (Jan-Jun)
                          </SelectItem>
                          <SelectItem value="2024-h2">
                            2024 H2 (Jul-Dec)
                          </SelectItem>
                          <SelectItem value="2024-q3">
                            2024 Q3 (Jul-Sep)
                          </SelectItem>
                          <SelectItem value="2024-q4">
                            2024 Q4 (Oct-Dec)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Participants</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select participants" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Employees</SelectItem>
                        <SelectItem value="department">
                          By Department
                        </SelectItem>
                        <SelectItem value="grade">By Grade</SelectItem>
                        <SelectItem value="custom">Custom Selection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Create Cycle
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Appraisal Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Cycle
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
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Reviews
              </CardTitle>
              <AnimatedIcon
                icon={CheckCircle}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68</div>
              <p className="text-xs text-muted-foreground">
                85% completion rate this cycle
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
              <AnimatedIcon
                icon={Star}
                animation="bounce"
                className="text-yellow-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2/5</div>
              <p className="text-xs text-muted-foreground">
                Team performance average
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

        {/* Appraisal Management Interface */}
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
                  Appraisal Cycles Management
                </CardTitle>
                <CardDescription>
                  Manage performance review cycles and evaluations
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
            <Tabs defaultValue="active-cycles" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="active-cycles">Active Cycles</TabsTrigger>
                <TabsTrigger value="pending-reviews">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="active-cycles" className="space-y-4">
                <div className="grid gap-4">
                  {/* Active Cycle 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              <PlayCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-600"
                            >
                              Annual Review
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            2024 Annual Performance Review
                          </h3>
                          <p className="text-muted-foreground">
                            Comprehensive annual evaluation covering goals,
                            competencies, and development planning for FY 2024
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Period: Jan 1 - Dec 31, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              80 Participants
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Due: Dec 15, 2024
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-construction-600">
                              65%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Completed
                            </div>
                          </div>
                          <Progress value={65} className="w-24" />
                          <div className="flex gap-2">
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
                                icon={Edit}
                                size="sm"
                                className="mr-1"
                              />
                              Manage
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Cycle 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-orange-50 text-orange-600"
                            >
                              <PauseCircle className="h-3 w-3 mr-1" />
                              Planning
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-purple-50 text-purple-600"
                            >
                              Mid-Year Review
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Q3 2024 Mid-Year Assessment
                          </h3>
                          <p className="text-muted-foreground">
                            Mid-year check-in focused on goal progress,
                            development needs, and performance adjustments
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Period: Jul 1 - Sep 30, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              75 Participants
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Start: Oct 1, 2024
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">
                              15%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Setup
                            </div>
                          </div>
                          <Progress value={15} className="w-24" />
                          <div className="flex gap-2">
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
                                icon={PlayCircle}
                                size="sm"
                                className="mr-1"
                              />
                              Launch
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pending-reviews" className="space-y-4">
                <div className="grid gap-4">
                  {/* Pending Review 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Rajesh Kumar</h4>
                            <Badge
                              variant="outline"
                              className="bg-orange-50 text-orange-600"
                            >
                              Self-Assessment Pending
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Site Engineer • Construction Team
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Due: Oct 15, 2024</span>
                            <span>Overdue by 2 days</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={FileText}
                              size="sm"
                              className="mr-1"
                            />
                            View Form
                          </Button>
                          <Button size="sm" variant="outline">
                            Send Reminder
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pending Review 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>PS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Priya Sharma</h4>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-600"
                            >
                              Manager Review Pending
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Project Manager • Management Team
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Due: Oct 20, 2024</span>
                            <span>Self-assessment completed</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={FileText}
                              size="sm"
                              className="mr-1"
                            />
                            Review
                          </Button>
                          <Button size="sm" variant="outline">
                            Schedule Meeting
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
                    Completed Appraisals
                  </h3>
                  <p className="text-muted-foreground">
                    View historical performance reviews and ratings
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
                        Completion Rates
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Self-Assessments</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Manager Reviews</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Final Discussions</span>
                          <span className="font-medium">52%</span>
                        </div>
                        <Progress value={52} className="h-2" />
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
                          icon={Award}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Rating Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Outstanding (5)</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Exceeds Expectations (4)</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Meets Expectations (3)</span>
                          <span className="font-medium">40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Needs Improvement (2)</span>
                          <span className="font-medium">10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Appraisal System Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Structured performance review cycles ensuring fair and
              comprehensive evaluations
            </p>
            <Target className="h-4 w-4 text-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
