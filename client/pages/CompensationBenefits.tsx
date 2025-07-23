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
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import {
  DollarSign,
  Plus,
  TrendingUp,
  Users,
  Award,
  Calendar,
  Target,
  Shield,
  Gift,
  PiggyBank,
  Activity,
  ArrowRight,
  BarChart3,
  Star,
  Zap,
  Coins,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { BackToHRMS } from "@/components/hrms";

export default function CompensationBenefits() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <BackToHRMS />

        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Compensation & Benefits
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={DollarSign}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Comprehensive compensation planning and benefits management
              </p>
            </div>
          </div>
          <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden animate-slideInRight">
            <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
            Plan Compensation
            <ShimmerEffect className="absolute inset-0" />
          </Button>
        </div>

        {/* Compensation Overview Dashboard */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Compensation
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
                Annual compensation budget
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Salary
              </CardTitle>
              <AnimatedIcon
                icon={TrendingUp}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹6.8L</div>
              <p className="text-xs text-muted-foreground">
                +12% from last year
              </p>
              <Progress value={65} className="mt-2" />
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reviews
              </CardTitle>
              <AnimatedIcon
                icon={Calendar}
                animation="pulse"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-muted-foreground">
                Salary revision requests
              </p>
              <Badge variant="outline" className="mt-2">
                <PulsingDot className="mr-1" />
                Action needed
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Benefits Enrollment
              </CardTitle>
              <AnimatedIcon
                icon={Shield}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                Employee participation rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Compensation & Benefits Modules */}
        <Card className="hover-lift animate-fadeInUp relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 via-transparent to-primary/5" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AnimatedIcon
                icon={Coins}
                animation="float"
                className="text-construction-600"
                size="lg"
              />
              Compensation & Benefits Modules
            </CardTitle>
            <CardDescription>
              Complete compensation planning and benefits administration system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link to="/hrms/compensation/planning">
                <Card className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-construction-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Target}
                        animation="pulse"
                        className="text-construction-600"
                      />
                      <h3 className="font-semibold">Compensation Planning</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Strategic compensation planning and budget allocation
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">₹8.47 Cr Budget</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/compensation/revisions">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={TrendingUp}
                        animation="bounce"
                        className="text-blue-600"
                      />
                      <h3 className="font-semibold">Salary Revision Cycles</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Annual appraisal cycles and salary increment management
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">2024 Cycle Active</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/compensation/bonuses">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Gift}
                        animation="float"
                        className="text-emerald-600"
                      />
                      <h3 className="font-semibold">
                        Bonus & Incentive Management
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Performance bonuses, incentives, and variable pay
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">₹1.2 Cr Distributed</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/compensation/equity">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={PiggyBank}
                        animation="glow"
                        className="text-purple-600"
                      />
                      <h3 className="font-semibold">
                        Equity / ESOP Management
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Employee stock options and equity participation plans
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">127 ESOP Holders</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/compensation/benefits">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Shield}
                        animation="pulse"
                        className="text-orange-600"
                      />
                      <h3 className="font-semibold">Benefits Administration</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Health insurance, wellness programs, and employee benefits
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">94% Enrollment</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Recent Activity & Quick Stats */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="animate-fadeInUp">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AnimatedIcon
                      icon={Activity}
                      animation="pulse"
                      className="text-primary"
                    />
                    Recent Compensation Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-green-100">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Salary revision approved
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Rajesh Kumar • 2 hours ago
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">+15%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-blue-100">
                        <Gift className="h-3 w-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Bonus distributed</p>
                        <p className="text-xs text-muted-foreground">
                          Q3 Performance Bonus • 5 hours ago
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">₹2.5L</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-purple-100">
                        <PiggyBank className="h-3 w-3 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">ESOP grant issued</p>
                        <p className="text-xs text-muted-foreground">
                          Priya Sharma • 1 day ago
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">500 Units</Badge>
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
                    Compensation Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Engineering Team</span>
                      <span className="font-medium">₹7.2L avg</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Project Management</span>
                      <span className="font-medium">₹8.5L avg</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Safety & Quality</span>
                      <span className="font-medium">₹6.8L avg</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Operations</span>
                      <span className="font-medium">₹5.9L avg</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compensation & Benefits Summary */}
            <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
              <div className="flex items-center justify-center gap-2">
                <AnimatedIcon
                  icon={Zap}
                  animation="glow"
                  className="text-construction-500"
                />
                <p className="text-center text-muted-foreground">
                  ✨ Comprehensive compensation framework ensuring competitive
                  pay and excellent benefits
                </p>
                <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
