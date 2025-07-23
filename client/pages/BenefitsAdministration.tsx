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
  Shield,
  Plus,
  Heart,
  Users,
  Calendar,
  DollarSign,
  Activity,
  Car,
  Home,
  GraduationCap,
  Coffee,
  Filter,
  Download,
  Eye,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Percent,
  Zap,
  Umbrella,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function BenefitsAdministration() {
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
                Benefits Administration
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Shield}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Comprehensive employee benefits and wellness programs
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Benefits
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Add Benefit
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Shield}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Add Employee Benefit
                  </DialogTitle>
                  <DialogDescription>
                    Configure new employee benefits and wellness programs
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Benefit Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select benefit type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="health-insurance">
                          Health Insurance
                        </SelectItem>
                        <SelectItem value="life-insurance">
                          Life Insurance
                        </SelectItem>
                        <SelectItem value="vehicle-allowance">
                          Vehicle Allowance
                        </SelectItem>
                        <SelectItem value="meal-vouchers">
                          Meal Vouchers
                        </SelectItem>
                        <SelectItem value="education-assistance">
                          Education Assistance
                        </SelectItem>
                        <SelectItem value="wellness-program">
                          Wellness Program
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Benefit Provider</Label>
                      <Input placeholder="e.g., HDFC ERGO, Star Health" />
                    </div>
                    <div className="space-y-2">
                      <Label>Annual Coverage (₹)</Label>
                      <Input placeholder="e.g., 5,00,000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Eligibility Criteria</Label>
                    <Textarea placeholder="Define eligibility requirements..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Employee Contribution (%)</Label>
                      <Input placeholder="e.g., 20" />
                    </div>
                    <div className="space-y-2">
                      <Label>Effective Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Add Benefit
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Benefits Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Benefits Cost
              </CardTitle>
              <AnimatedIcon
                icon={DollarSign}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2.4 Cr</div>
              <p className="text-xs text-muted-foreground">
                Annual benefits spend
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Enrollment Rate
              </CardTitle>
              <AnimatedIcon
                icon={Users}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                Employee participation
              </p>
              <Progress value={94} className="mt-2" />
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Benefits
              </CardTitle>
              <AnimatedIcon
                icon={Shield}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Different benefit types
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Claims Processed
              </CardTitle>
              <AnimatedIcon
                icon={Activity}
                animation="pulse"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">147</div>
              <p className="text-xs text-muted-foreground">This year so far</p>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Administration Interface */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Umbrella}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  Benefits Administration System
                </CardTitle>
                <CardDescription>
                  Manage comprehensive employee benefits and wellness programs
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
            <Tabs defaultValue="active-benefits" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="active-benefits">
                  Active Benefits
                </TabsTrigger>
                <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
                <TabsTrigger value="claims">Claims</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="active-benefits" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Health Insurance */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-red-100">
                          <Heart className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Health Insurance</h3>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              Active
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Comprehensive medical coverage including family
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Coverage:</span>
                              <span className="font-medium">₹5,00,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Provider:</span>
                              <span className="font-medium">HDFC ERGO</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Enrolled:</span>
                              <span className="font-medium">118/124</span>
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
                              Manage
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Life Insurance */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-blue-100">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Life Insurance</h3>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              Active
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Term life insurance for financial security
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Coverage:</span>
                              <span className="font-medium">₹10,00,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Provider:</span>
                              <span className="font-medium">SBI Life</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Enrolled:</span>
                              <span className="font-medium">124/124</span>
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
                              Manage
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vehicle Allowance */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-purple-100">
                          <Car className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Vehicle Allowance</h3>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              Active
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Monthly transportation and fuel allowance
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Amount:</span>
                              <span className="font-medium">₹8,000/month</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax Status:</span>
                              <span className="font-medium">Exempt</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Eligible:</span>
                              <span className="font-medium">67/124</span>
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
                              Manage
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Meal Vouchers */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-orange-100">
                          <Coffee className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Meal Vouchers</h3>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              Active
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Daily meal vouchers for employee nutrition
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Amount:</span>
                              <span className="font-medium">₹120/day</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Provider:</span>
                              <span className="font-medium">Sodexo</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Enrolled:</span>
                              <span className="font-medium">124/124</span>
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
                              Manage
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Education Assistance */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-green-100">
                          <GraduationCap className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">
                              Education Assistance
                            </h3>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              Active
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Financial support for employee skill development
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Max Amount:</span>
                              <span className="font-medium">₹50,000/year</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Categories:</span>
                              <span className="font-medium">Professional</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Utilized:</span>
                              <span className="font-medium">23/124</span>
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
                              Manage
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wellness Program */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-indigo-100">
                          <Activity className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Wellness Program</h3>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              Active
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Gym memberships and health check-ups
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Coverage:</span>
                              <span className="font-medium">₹15,000/year</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Services:</span>
                              <span className="font-medium">Gym + Health</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Enrolled:</span>
                              <span className="font-medium">89/124</span>
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
                              Manage
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="enrollments" className="space-y-4">
                <div className="grid gap-4">
                  {/* Enrollment Request */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback>SS</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">Sunita Singh</h4>
                            <p className="text-sm text-muted-foreground">
                              Quality Inspector • New Enrollment
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Benefit Type
                            </div>
                            <div className="text-lg font-bold">
                              Health Insurance
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">Coverage</div>
                            <div className="text-lg font-bold text-green-600">
                              Family
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              Monthly Premium
                            </div>
                            <div className="text-lg font-bold text-construction-600">
                              ₹1,200
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

              <TabsContent value="claims" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Activity}
                    animation="pulse"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Claims Management
                  </h3>
                  <p className="text-muted-foreground">
                    Track and manage employee benefit claims and reimbursements
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
                        Benefits Utilization
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Health Insurance</span>
                          <span className="font-medium">95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Life Insurance</span>
                          <span className="font-medium">100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Meal Vouchers</span>
                          <span className="font-medium">100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Wellness Program</span>
                          <span className="font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
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
                          icon={DollarSign}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Cost Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Health Insurance</span>
                          <span className="font-medium">₹1.2 Cr (50%)</span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Life Insurance</span>
                          <span className="font-medium">₹48L (20%)</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Vehicle Allowance</span>
                          <span className="font-medium">₹43L (18%)</span>
                        </div>
                        <Progress value={18} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Other Benefits</span>
                          <span className="font-medium">₹29L (12%)</span>
                        </div>
                        <Progress value={12} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Benefits Administration Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Comprehensive benefits program ensuring employee wellbeing and
              financial security
            </p>
            <Shield className="h-4 w-4 text-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
