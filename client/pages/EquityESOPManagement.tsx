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
  PiggyBank,
  Plus,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Award,
  Shield,
  Clock,
  CheckCircle,
  Filter,
  Download,
  Eye,
  ArrowRight,
  BarChart3,
  Percent,
  Zap,
  Landmark,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function EquityESOPManagement() {
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
                Equity / ESOP Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={PiggyBank}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Employee stock options and equity participation plans
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export ESOP Data
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Grant Equity
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={PiggyBank}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Grant ESOP/Equity
                  </DialogTitle>
                  <DialogDescription>
                    Issue employee stock options or equity grants
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Grant Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grant type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="esop">
                          Employee Stock Option Plan (ESOP)
                        </SelectItem>
                        <SelectItem value="rsu">
                          Restricted Stock Units (RSU)
                        </SelectItem>
                        <SelectItem value="equity">Direct Equity</SelectItem>
                        <SelectItem value="phantom">
                          Phantom Stock Plan
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Number of Units</Label>
                      <Input placeholder="e.g., 1000" />
                    </div>
                    <div className="space-y-2">
                      <Label>Exercise Price (₹)</Label>
                      <Input placeholder="e.g., 100" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Vesting Period</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-year">1 Year</SelectItem>
                          <SelectItem value="2-year">2 Years</SelectItem>
                          <SelectItem value="3-year">3 Years</SelectItem>
                          <SelectItem value="4-year">4 Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Grant Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Conditions</Label>
                    <Textarea placeholder="Performance conditions, tenure requirements, etc..." />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Grant Equity
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* ESOP Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total ESOP Pool
              </CardTitle>
              <AnimatedIcon
                icon={PiggyBank}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50,000</div>
              <p className="text-xs text-muted-foreground">
                Units allocated for employees
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active ESOP Holders
              </CardTitle>
              <AnimatedIcon
                icon={Users}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                Employees with equity grants
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vested Units
              </CardTitle>
              <AnimatedIcon
                icon={CheckCircle}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18,450</div>
              <p className="text-xs text-muted-foreground">
                Units available for exercise
              </p>
              <Progress value={37} className="mt-2" />
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Valuation
              </CardTitle>
              <AnimatedIcon
                icon={TrendingUp}
                animation="pulse"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹250</div>
              <p className="text-xs text-muted-foreground">
                Per unit fair market value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ESOP Management Interface */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Landmark}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  Equity & ESOP Management
                </CardTitle>
                <CardDescription>
                  Manage employee equity participation and stock option plans
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
            <Tabs defaultValue="active-grants" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="active-grants">Active Grants</TabsTrigger>
                <TabsTrigger value="vesting-schedule">
                  Vesting Schedule
                </TabsTrigger>
                <TabsTrigger value="valuation">Valuation</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="active-grants" className="space-y-4">
                <div className="grid gap-4">
                  {/* ESOP Grant 1 */}
                  <Card className="hover-lift animate-scaleIn">
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
                              Project Manager • Senior Level
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Total Granted
                            </div>
                            <div className="text-lg font-bold">2,500 units</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">Vested</div>
                            <div className="text-lg font-bold text-green-600">
                              1,250 units
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Exercise Price
                            </div>
                            <div className="text-lg font-bold text-construction-600">
                              ₹150
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Current Value
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                              ₹6.25L
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-600"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            50% Vested
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

                  {/* ESOP Grant 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
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
                              Site Engineer • Mid Level
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Total Granted
                            </div>
                            <div className="text-lg font-bold">1,500 units</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">Vested</div>
                            <div className="text-lg font-bold text-green-600">
                              375 units
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Exercise Price
                            </div>
                            <div className="text-lg font-bold text-construction-600">
                              ₹180
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Current Value
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                              ₹3.75L
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-orange-50 text-orange-600"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            25% Vested
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

                  {/* ESOP Grant 3 */}
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
                              Safety Manager • Senior Level
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Total Granted
                            </div>
                            <div className="text-lg font-bold">2,000 units</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">Vested</div>
                            <div className="text-lg font-bold text-green-600">
                              1,500 units
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Exercise Price
                            </div>
                            <div className="text-lg font-bold text-construction-600">
                              ₹120
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Current Value
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                              ₹5.0L
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-600"
                          >
                            <Award className="h-3 w-3 mr-1" />
                            75% Vested
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
                </div>
              </TabsContent>

              <TabsContent value="vesting-schedule" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={Calendar}
                          animation="pulse"
                          className="text-primary"
                        />
                        Upcoming Vesting Events
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Q4 2024 Vesting</h4>
                          <Badge variant="outline">Dec 31, 2024</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          45 employees • 8,750 units vesting
                        </div>
                        <Progress value={85} className="mt-2 h-1" />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Q1 2025 Vesting</h4>
                          <Badge variant="outline">Mar 31, 2025</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          32 employees • 6,200 units vesting
                        </div>
                        <Progress value={65} className="mt-2 h-1" />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Q2 2025 Vesting</h4>
                          <Badge variant="outline">Jun 30, 2025</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          28 employees • 5,100 units vesting
                        </div>
                        <Progress value={45} className="mt-2 h-1" />
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
                          icon={Shield}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Vesting Terms
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-construction-50 rounded-lg">
                        <h4 className="font-medium mb-2">Standard Vesting</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 4-year vesting schedule</li>
                          <li>• 1-year cliff period</li>
                          <li>• 25% vests after cliff</li>
                          <li>• Monthly vesting thereafter</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium mb-2">
                          Performance Vesting
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Performance milestones required</li>
                          <li>• Company valuation targets</li>
                          <li>• Individual KPI achievement</li>
                          <li>• Accelerated vesting possible</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium mb-2">
                          Early Exercise Options
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Available for senior employees</li>
                          <li>• 83(b) election possible</li>
                          <li>• Tax implications explained</li>
                          <li>• Repurchase rights apply</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="valuation" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={TrendingUp}
                    animation="float"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Company Valuation
                  </h3>
                  <p className="text-muted-foreground">
                    Current share price and valuation metrics
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
                        ESOP Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Senior Management</span>
                          <span className="font-medium">15,000 units</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Mid-Level Employees</span>
                          <span className="font-medium">20,000 units</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Junior Employees</span>
                          <span className="font-medium">10,000 units</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Future Pool</span>
                          <span className="font-medium">5,000 units</span>
                        </div>
                        <Progress value={10} className="h-2" />
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
                          icon={Percent}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Participation Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Employee Participation Rate</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Retention Rate (ESOP holders)</span>
                          <span className="font-medium">96%</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Exercise Rate</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Satisfaction Score</span>
                          <span className="font-medium">4.4/5</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* ESOP Management Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Employee ownership program building long-term commitment and
              shared success
            </p>
            <PiggyBank className="h-4 w-4 text-purple-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
