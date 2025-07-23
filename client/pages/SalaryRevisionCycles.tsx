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
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Users,
  Filter,
  Download,
  Eye,
  Edit,
  ArrowRight,
  BarChart3,
  Percent,
  Zap,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function SalaryRevisionCycles() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/hrms/compensation"
                  className="hover:text-construction-600"
                >
                  <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                  Back to Compensation & Benefits
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Salary Revision Cycles
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
                Annual appraisal cycles and salary increment management
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Cycles
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Start New Cycle
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={RefreshCw}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Start Salary Revision Cycle
                  </DialogTitle>
                  <DialogDescription>
                    Configure and launch a new salary revision cycle
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Cycle Name</Label>
                    <Input placeholder="e.g., FY 2024-25 Annual Appraisal" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cycle Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="annual">Annual Review</SelectItem>
                          <SelectItem value="mid-year">
                            Mid-Year Review
                          </SelectItem>
                          <SelectItem value="promotion">Promotion</SelectItem>
                          <SelectItem value="market-adjustment">
                            Market Adjustment
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Effective Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Budget (₹)</Label>
                      <Input placeholder="e.g., 1,50,00,000" />
                    </div>
                    <div className="space-y-2">
                      <Label>Average Increment %</Label>
                      <Input placeholder="e.g., 12" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Start Cycle
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Revision Cycle Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Cycle
              </CardTitle>
              <AnimatedIcon
                icon={RefreshCw}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2024 Annual</div>
              <p className="text-xs text-muted-foreground">
                65% progress • 45 days remaining
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
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-muted-foreground">
                Awaiting manager approval
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
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                Salary revisions processed
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Increment
              </CardTitle>
              <AnimatedIcon
                icon={Percent}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.3%</div>
              <p className="text-xs text-muted-foreground">
                Current cycle average
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Salary Revision Management Interface */}
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
                  Salary Revision Management
                </CardTitle>
                <CardDescription>
                  Track and manage salary revision cycles and approvals
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
            <Tabs defaultValue="pending-reviews" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pending-reviews">
                  Pending Reviews
                </TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="cycles">Cycles</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="pending-reviews" className="space-y-4">
                <div className="grid gap-4">
                  {/* Pending Review 1 */}
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
                              Site Engineer • Engineering Team
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Current Salary
                            </div>
                            <div className="text-lg font-bold">₹6.8L</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Proposed Salary
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              ₹7.6L
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">Increment</div>
                            <div className="text-lg font-bold text-construction-600">
                              +12%
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-orange-50 text-orange-600"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <AnimatedIcon
                                icon={Eye}
                                size="sm"
                                className="mr-1"
                              />
                              Review
                            </Button>
                            <Button
                              size="sm"
                              className="bg-construction-500 hover:bg-construction-600"
                            >
                              Approve
                            </Button>
                          </div>
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback>PS</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">Priya Sharma</h4>
                            <p className="text-sm text-muted-foreground">
                              Project Manager • Management Team
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Current Salary
                            </div>
                            <div className="text-lg font-bold">₹9.2L</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Proposed Salary
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              ₹10.8L
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">Increment</div>
                            <div className="text-lg font-bold text-construction-600">
                              +17%
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-600"
                          >
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Above Budget
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <AnimatedIcon
                                icon={Eye}
                                size="sm"
                                className="mr-1"
                              />
                              Review
                            </Button>
                            <Button size="sm" variant="outline">
                              <AnimatedIcon
                                icon={Edit}
                                size="sm"
                                className="mr-1"
                              />
                              Revise
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pending Review 3 */}
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
                              Safety Manager • Safety Team
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Current Salary
                            </div>
                            <div className="text-lg font-bold">₹7.5L</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Proposed Salary
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              ₹8.3L
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">Increment</div>
                            <div className="text-lg font-bold text-construction-600">
                              +11%
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-600"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Within Budget
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <AnimatedIcon
                                icon={Eye}
                                size="sm"
                                className="mr-1"
                              />
                              Review
                            </Button>
                            <Button
                              size="sm"
                              className="bg-construction-500 hover:bg-construction-600"
                            >
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="approved" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={CheckCircle}
                    animation="glow"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Approved Salary Revisions
                  </h3>
                  <p className="text-muted-foreground">
                    View processed and approved salary increments
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="cycles" className="space-y-4">
                <div className="grid gap-4">
                  {/* Active Cycle */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
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
                            FY 2024-25 Annual Appraisal
                          </h3>
                          <p className="text-muted-foreground">
                            Comprehensive annual performance review and salary
                            revision cycle
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Started: Apr 1, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              124 employees
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              Budget: ₹1.5 Cr
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-construction-600">
                              65%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Progress
                            </div>
                          </div>
                          <Progress value={65} className="w-24" />
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            Manage
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Cycle */}
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
                              Planned
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
                            Mid-year performance check and market adjustment
                            cycle
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Planned: Oct 1, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              120 employees
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              Budget: ₹75L
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">
                              0%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Not Started
                            </div>
                          </div>
                          <Progress value={0} className="w-24" />
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Edit}
                              size="sm"
                              className="mr-1"
                            />
                            Configure
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                        Increment Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>15%+ Increment</span>
                          <span className="font-medium">18 employees</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>10-15% Increment</span>
                          <span className="font-medium">45 employees</span>
                        </div>
                        <Progress value={51} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>5-10% Increment</span>
                          <span className="font-medium">26 employees</span>
                        </div>
                        <Progress value={29} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>No Increment</span>
                          <span className="font-medium">0 employees</span>
                        </div>
                        <Progress value={0} className="h-2" />
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
                        Department Averages
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engineering Team</span>
                          <span className="font-medium">13.2%</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Project Management</span>
                          <span className="font-medium">14.1%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Safety & Quality</span>
                          <span className="font-medium">11.8%</span>
                        </div>
                        <Progress value={79} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Operations</span>
                          <span className="font-medium">10.5%</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Salary Revision Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Systematic salary revision process ensuring fair compensation
              and performance recognition
            </p>
            <TrendingUp className="h-4 w-4 text-green-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
