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
import { Textarea } from "@/components/ui/textarea";
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
  Gift,
  Plus,
  Award,
  Target,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Star,
  Trophy,
  Filter,
  Download,
  Eye,
  Send,
  ArrowRight,
  BarChart3,
  Percent,
  Zap,
  Coins,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function BonusIncentiveManagement() {
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
                Bonus & Incentive Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Gift}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Performance bonuses, incentives, and variable pay management
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Report
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Create Bonus
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Gift}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Create Bonus/Incentive
                  </DialogTitle>
                  <DialogDescription>
                    Set up performance bonuses and incentive programs
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Bonus Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bonus type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="performance">
                          Performance Bonus
                        </SelectItem>
                        <SelectItem value="project">
                          Project Completion Bonus
                        </SelectItem>
                        <SelectItem value="quarterly">
                          Quarterly Incentive
                        </SelectItem>
                        <SelectItem value="festival">Festival Bonus</SelectItem>
                        <SelectItem value="retention">
                          Retention Bonus
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bonus Period</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="q3-2024">Q3 2024</SelectItem>
                          <SelectItem value="q4-2024">Q4 2024</SelectItem>
                          <SelectItem value="annual-2024">
                            Annual 2024
                          </SelectItem>
                          <SelectItem value="project-based">
                            Project Based
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Total Budget (₹)</Label>
                      <Input placeholder="e.g., 25,00,000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Eligibility Criteria</Label>
                    <Textarea placeholder="Define eligibility requirements and performance criteria..." />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Create Bonus Plan
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Bonus Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Distributed
              </CardTitle>
              <AnimatedIcon
                icon={DollarSign}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1.2 Cr</div>
              <p className="text-xs text-muted-foreground">This fiscal year</p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Eligible Employees
              </CardTitle>
              <AnimatedIcon
                icon={Users}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98</div>
              <p className="text-xs text-muted-foreground">
                Met bonus criteria
              </p>
              <Progress value={79} className="mt-2" />
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Bonus
              </CardTitle>
              <AnimatedIcon
                icon={Gift}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹12,200</div>
              <p className="text-xs text-muted-foreground">
                Per eligible employee
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payouts
              </CardTitle>
              <AnimatedIcon
                icon={Award}
                animation="pulse"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
              <Badge variant="outline" className="mt-2">
                <PulsingDot className="mr-1" />
                Action needed
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Bonus Management Interface */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Coins}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  Bonus & Incentive Management
                </CardTitle>
                <CardDescription>
                  Design and manage performance-based compensation programs
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
            <Tabs defaultValue="active-bonuses" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="active-bonuses">Active Bonuses</TabsTrigger>
                <TabsTrigger value="pending-approval">
                  Pending Approval
                </TabsTrigger>
                <TabsTrigger value="payout-history">Payout History</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="active-bonuses" className="space-y-4">
                <div className="grid gap-4">
                  {/* Active Bonus 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              <Trophy className="h-3 w-3 mr-1" />
                              Performance Bonus
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-600"
                            >
                              Q3 2024
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Q3 Project Excellence Bonus
                          </h3>
                          <p className="text-muted-foreground">
                            Performance-based bonus for successful project
                            delivery and quality achievements
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              <span>Budget: ₹25L</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>78 eligible</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Payout: Oct 15</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-lg font-bold text-construction-600">
                              ₹3,200
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Avg per person
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
                            <Button
                              size="sm"
                              className="bg-construction-500 hover:bg-construction-600"
                            >
                              Process Payout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Bonus 2 */}
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
                              className="bg-purple-50 text-purple-600"
                            >
                              <Star className="h-3 w-3 mr-1" />
                              Festival Bonus
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-orange-50 text-orange-600"
                            >
                              Diwali 2024
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Diwali Festival Bonus
                          </h3>
                          <p className="text-muted-foreground">
                            Traditional festival bonus for all employees as part
                            of cultural celebration
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              <span>Budget: ₹12L</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>124 eligible</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Payout: Nov 1</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-600">
                              ₹9,680
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Fixed amount
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
                              Schedule Payout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Bonus 3 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-emerald-50 text-emerald-600"
                            >
                              <Target className="h-3 w-3 mr-1" />
                              Project Completion
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-indigo-50 text-indigo-600"
                            >
                              Metro Project
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Metro Phase 2 Completion Bonus
                          </h3>
                          <p className="text-muted-foreground">
                            Special bonus for successful completion of Metro
                            Phase 2 project ahead of schedule
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              <span>Budget: ₹18L</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>45 team members</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Payout: Oct 25</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-lg font-bold text-emerald-600">
                              ₹4,000
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Avg per person
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
                              Prepare Payout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pending-approval" className="space-y-4">
                <div className="grid gap-4">
                  {/* Pending Approval Item */}
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
                              Site Engineer • Q3 Performance Bonus
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Performance Score
                            </div>
                            <div className="text-lg font-bold">4.8/5</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Bonus Amount
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              ₹15,000
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Percentage
                            </div>
                            <div className="text-lg font-bold text-construction-600">
                              22%
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-orange-50 text-orange-600"
                          >
                            Pending Approval
                          </Badge>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-construction-500 hover:bg-construction-600"
                            >
                              Approve
                            </Button>
                            <Button size="sm" variant="outline">
                              Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="payout-history" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Award}
                    animation="glow"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Bonus Payout History
                  </h3>
                  <p className="text-muted-foreground">
                    Historical bonus payments and distribution records
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
                        Bonus Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Performance Bonuses</span>
                          <span className="font-medium">₹72L (60%)</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Project Completion</span>
                          <span className="font-medium">₹30L (25%)</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Festival Bonuses</span>
                          <span className="font-medium">₹12L (10%)</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Retention Bonuses</span>
                          <span className="font-medium">₹6L (5%)</span>
                        </div>
                        <Progress value={5} className="h-2" />
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
                        Department Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engineering Team</span>
                          <span className="font-medium">₹18,500 avg</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Project Management</span>
                          <span className="font-medium">₹22,000 avg</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Safety & Quality</span>
                          <span className="font-medium">₹14,200 avg</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Operations</span>
                          <span className="font-medium">₹11,800 avg</span>
                        </div>
                        <Progress value={58} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Bonus Management Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Performance-driven bonus system motivating excellence and
              rewarding achievements
            </p>
            <Gift className="h-4 w-4 text-purple-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
