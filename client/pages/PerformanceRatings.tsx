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
  Star,
  Plus,
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Target,
  Eye,
  Edit,
  Download,
  Filter,
  CheckCircle,
  AlertTriangle,
  Zap,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function PerformanceRatings() {
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
                Performance Ratings
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Star}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Rating scales, calibration, and performance distribution
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Ratings
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Calibrate Ratings
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Star}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Rating Calibration Session
                  </DialogTitle>
                  <DialogDescription>
                    Ensure consistent rating standards across managers
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="flex justify-center items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <div
                          key={rating}
                          className="flex flex-col items-center space-y-1"
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                              rating === 5
                                ? "bg-green-500"
                                : rating === 4
                                  ? "bg-blue-500"
                                  : rating === 3
                                    ? "bg-yellow-500"
                                    : rating === 2
                                      ? "bg-orange-500"
                                      : "bg-red-500"
                            }`}
                          >
                            {rating}
                          </div>
                          <Star
                            className={`h-4 w-4 ${
                              rating <= 5
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                    <h3 className="font-semibold mb-2">5-Point Rating Scale</h3>
                    <p className="text-sm text-muted-foreground">
                      Standardized performance evaluation criteria
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Start Calibration
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Rating Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
              <AnimatedIcon
                icon={Star}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2/5</div>
              <p className="text-xs text-muted-foreground">
                +0.3 from last cycle
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

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Top Performers
              </CardTitle>
              <AnimatedIcon
                icon={Trophy}
                animation="glow"
                className="text-yellow-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Outstanding rating (5/5)
              </p>
              <Badge variant="secondary" className="mt-2">
                15% of team
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Needs Development
              </CardTitle>
              <AnimatedIcon
                icon={TrendingUp}
                animation="pulse"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Below expectations (≤2/5)
              </p>
              <Badge variant="outline" className="mt-2">
                <PulsingDot className="mr-1" />
                Support needed
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rating Distribution
              </CardTitle>
              <AnimatedIcon
                icon={BarChart3}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Balanced</div>
              <p className="text-xs text-muted-foreground">
                Normal distribution curve
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Rating Management Interface */}
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
                  Performance Ratings Dashboard
                </CardTitle>
                <CardDescription>
                  Analyze rating distribution and calibration metrics
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
            <Tabs defaultValue="distribution" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="distribution">Distribution</TabsTrigger>
                <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
                <TabsTrigger value="calibration">Calibration</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>

              <TabsContent value="distribution" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={BarChart3}
                          animation="pulse"
                          className="text-primary"
                        />
                        Rating Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-sm">Outstanding (5/5)</span>
                          </div>
                          <span className="font-medium">15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span className="text-sm">
                              Exceeds Expectations (4/5)
                            </span>
                          </div>
                          <span className="font-medium">35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                            <span className="text-sm">
                              Meets Expectations (3/5)
                            </span>
                          </div>
                          <span className="font-medium">40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <span className="text-sm">
                              Below Expectations (2/5)
                            </span>
                          </div>
                          <span className="font-medium">8%</span>
                        </div>
                        <Progress value={8} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span className="text-sm">
                              Unsatisfactory (1/5)
                            </span>
                          </div>
                          <span className="font-medium">2%</span>
                        </div>
                        <Progress value={2} className="h-2" />
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
                          icon={Users}
                          animation="bounce"
                          className="text-construction-500"
                        />
                        Department Comparison
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engineering Team</span>
                          <span className="font-medium">4.5/5</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Project Management</span>
                          <span className="font-medium">4.3/5</span>
                        </div>
                        <Progress value={86} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Safety & Quality</span>
                          <span className="font-medium">4.1/5</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Administration</span>
                          <span className="font-medium">3.9/5</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="top-performers" className="space-y-4">
                <div className="grid gap-4">
                  {/* Top Performer 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback>PS</AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-1 -right-1 bg-yellow-500 p-1 rounded-full">
                            <Trophy className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Priya Sharma</h4>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              Outstanding
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Project Manager • Management Team
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">5.0/5</span>
                            </div>
                            <span className="text-muted-foreground">
                              Consistently exceeds all targets
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
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

                  {/* Top Performer 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback>RK</AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-1 -right-1 bg-green-500 p-1 rounded-full">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Rajesh Kumar</h4>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-600"
                            >
                              Exceeds Expectations
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Site Engineer • Construction Team
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">4.8/5</span>
                            </div>
                            <span className="text-muted-foreground">
                              Strong technical leadership
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= 4
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
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

              <TabsContent value="calibration" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Target}
                    animation="float"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Rating Calibration
                  </h3>
                  <p className="text-muted-foreground">
                    Ensure consistent rating standards across all managers
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={TrendingUp}
                          animation="pulse"
                          className="text-primary"
                        />
                        Performance Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Q1 2024 Average</span>
                          <span className="font-medium">3.9/5</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Q2 2024 Average</span>
                          <span className="font-medium">4.1/5</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Q3 2024 Average</span>
                          <span className="font-medium">4.2/5</span>
                        </div>
                        <Progress value={84} className="h-2" />
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
                        Rating Consistency
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Inter-rater Reliability</span>
                          <span className="font-medium">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Calibration Accuracy</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Rating Variance</span>
                          <span className="font-medium">0.8</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Rating System Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Fair and transparent rating system with calibrated standards
              for accurate performance assessment
            </p>
            <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
