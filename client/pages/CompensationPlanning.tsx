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
  Target,
  Plus,
  DollarSign,
  TrendingUp,
  Users,
  BarChart3,
  Calculator,
  Filter,
  Download,
  Eye,
  Edit,
  ArrowRight,
  Building,
  Percent,
  Zap,
  PieChart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function CompensationPlanning() {
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
                Compensation Planning
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
                Strategic compensation planning and budget allocation
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Plan
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Create Plan
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Target}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Create Compensation Plan
                  </DialogTitle>
                  <DialogDescription>
                    Design comprehensive compensation strategy and budget
                    allocation
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Plan Name</Label>
                    <Input placeholder="e.g., FY 2024-25 Compensation Plan" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Effective Period</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fy24-25">FY 2024-25</SelectItem>
                          <SelectItem value="fy25-26">FY 2025-26</SelectItem>
                          <SelectItem value="h1-24">H1 2024</SelectItem>
                          <SelectItem value="h2-24">H2 2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Total Budget (₹)</Label>
                      <Input placeholder="e.g., 8,50,00,000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Planning Objectives</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary objective" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retention">
                          Employee Retention
                        </SelectItem>
                        <SelectItem value="market-alignment">
                          Market Alignment
                        </SelectItem>
                        <SelectItem value="performance">
                          Performance Driven
                        </SelectItem>
                        <SelectItem value="cost-optimization">
                          Cost Optimization
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Create Plan
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Planning Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Budget
              </CardTitle>
              <AnimatedIcon
                icon={DollarSign}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹8.47 Cr</div>
              <p className="text-xs text-muted-foreground">
                FY 2024-25 allocation
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Budget Utilization
              </CardTitle>
              <AnimatedIcon
                icon={Percent}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                ₹6.6 Cr utilized so far
              </p>
              <Progress value={78} className="mt-2" />
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Planned Increments
              </CardTitle>
              <AnimatedIcon
                icon={TrendingUp}
                animation="pulse"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12%</div>
              <p className="text-xs text-muted-foreground">
                Average increment rate
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Covered Employees
              </CardTitle>
              <AnimatedIcon
                icon={Users}
                animation="bounce"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">
                Active employees in plan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Compensation Planning Interface */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={PieChart}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  Compensation Planning Dashboard
                </CardTitle>
                <CardDescription>
                  Strategic compensation planning and budget management
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
            <Tabs defaultValue="budget-allocation" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="budget-allocation">
                  Budget Allocation
                </TabsTrigger>
                <TabsTrigger value="salary-bands">Salary Bands</TabsTrigger>
                <TabsTrigger value="market-analysis">
                  Market Analysis
                </TabsTrigger>
                <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
              </TabsList>

              <TabsContent value="budget-allocation" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={PieChart}
                          animation="pulse"
                          className="text-primary"
                        />
                        Department-wise Allocation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-construction-500 rounded"></div>
                            <span className="text-sm">Engineering</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹3.2 Cr</div>
                            <div className="text-xs text-muted-foreground">
                              38%
                            </div>
                          </div>
                        </div>
                        <Progress value={38} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span className="text-sm">Project Management</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹2.1 Cr</div>
                            <div className="text-xs text-muted-foreground">
                              25%
                            </div>
                          </div>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-sm">Safety & Quality</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹1.8 Cr</div>
                            <div className="text-xs text-muted-foreground">
                              21%
                            </div>
                          </div>
                        </div>
                        <Progress value={21} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <span className="text-sm">Operations</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹1.0 Cr</div>
                            <div className="text-xs text-muted-foreground">
                              12%
                            </div>
                          </div>
                        </div>
                        <Progress value={12} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-purple-500 rounded"></div>
                            <span className="text-sm">Administration</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹0.37 Cr</div>
                            <div className="text-xs text-muted-foreground">
                              4%
                            </div>
                          </div>
                        </div>
                        <Progress value={4} className="h-2" />
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
                          icon={BarChart3}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Component Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Base Salary</span>
                          <span className="font-medium">₹5.9 Cr (70%)</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Variable Pay</span>
                          <span className="font-medium">₹1.3 Cr (15%)</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Benefits & Perks</span>
                          <span className="font-medium">₹0.8 Cr (10%)</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>ESOP/Equity</span>
                          <span className="font-medium">₹0.37 Cr (4%)</span>
                        </div>
                        <Progress value={4} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Statutory Benefits</span>
                          <span className="font-medium">₹0.1 Cr (1%)</span>
                        </div>
                        <Progress value={1} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="salary-bands" className="space-y-4">
                <div className="grid gap-4">
                  {/* Salary Band 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-construction-50"
                            >
                              Senior Level
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-600"
                            >
                              L4-L5
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Senior Engineers & Project Managers
                          </h3>
                          <p className="text-muted-foreground">
                            Experienced professionals with 5-8 years experience
                            in construction projects
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>23 employees</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              <span>Multiple departments</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-lg font-bold text-construction-600">
                              ₹8-12L
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Annual CTC
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
                              Adjust Band
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Salary Band 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-emerald-50 text-emerald-600"
                            >
                              Mid Level
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              L2-L3
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Engineers & Site Supervisors
                          </h3>
                          <p className="text-muted-foreground">
                            Skilled professionals with 2-5 years construction
                            industry experience
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>67 employees</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              <span>Technical roles</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-lg font-bold text-emerald-600">
                              ₹5-8L
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Annual CTC
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
                              Adjust Band
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Salary Band 3 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-orange-50 text-orange-600"
                            >
                              Entry Level
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-yellow-50 text-yellow-600"
                            >
                              L0-L1
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Junior Engineers & Trainees
                          </h3>
                          <p className="text-muted-foreground">
                            Fresh graduates and junior professionals with 0-2
                            years experience
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>34 employees</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              <span>Entry roles</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-lg font-bold text-orange-600">
                              ₹3-5L
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Annual CTC
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
                              Adjust Band
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="market-analysis" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={TrendingUp}
                    animation="float"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Market Analysis & Benchmarking
                  </h3>
                  <p className="text-muted-foreground">
                    Industry salary benchmarks and competitive analysis
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="forecasting" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Calculator}
                    animation="pulse"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Compensation Forecasting
                  </h3>
                  <p className="text-muted-foreground">
                    Future budget planning and scenario modeling
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Compensation Planning Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Strategic compensation planning ensuring competitive pay and
              effective budget utilization
            </p>
            <Target className="h-4 w-4 text-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
