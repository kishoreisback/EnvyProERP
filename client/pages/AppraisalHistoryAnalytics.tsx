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
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Star,
  Users,
  Award,
  Target,
  Eye,
  Download,
  Filter,
  FileText,
  Activity,
  Zap,
  Crown,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function AppraisalHistoryAnalytics() {
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
                Appraisal History & Analytics
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={BarChart3}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Historical performance data and workforce analytics
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Analytics
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
              <AnimatedIcon
                icon={FileText}
                animation="bounce"
                className="mr-2"
              />
              Generate Report
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Analytics Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reviews Conducted
              </CardTitle>
              <AnimatedIcon
                icon={Calendar}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                Last 5 years • 98% completion rate
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Performance Trend
              </CardTitle>
              <AnimatedIcon
                icon={TrendingUp}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">
                Average improvement year-over-year
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Top Performers
              </CardTitle>
              <AnimatedIcon
                icon={Crown}
                animation="pulse"
                className="text-yellow-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Consistent outstanding ratings
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Retention Rate
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
                High performers staying with company
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Dashboard */}
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
                  Performance Analytics Dashboard
                </CardTitle>
                <CardDescription>
                  Comprehensive insights and historical performance trends
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
            <Tabs defaultValue="trends" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="trends">Performance Trends</TabsTrigger>
                <TabsTrigger value="history">Historical Data</TabsTrigger>
                <TabsTrigger value="insights">Key Insights</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

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
                        5-Year Performance Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>2020 Average Rating</span>
                          <span className="font-medium">3.6/5</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>2021 Average Rating</span>
                          <span className="font-medium">3.8/5</span>
                        </div>
                        <Progress value={76} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>2022 Average Rating</span>
                          <span className="font-medium">4.0/5</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>2023 Average Rating</span>
                          <span className="font-medium">4.1/5</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>2024 Average Rating</span>
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
                          icon={Users}
                          animation="bounce"
                          className="text-construction-500"
                        />
                        Department Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engineering</span>
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
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Operations</span>
                          <span className="font-medium">4.0/5</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <div className="grid gap-4">
                  {/* Historical Record 1 */}
                  <Card className="hover-lift animate-scaleIn">
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
                              className="bg-green-50 text-green-600"
                            >
                              2024 Annual Review
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
                              Outstanding performance across all metrics
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              Completed: Sep 15, 2024
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Reviewed by: Senior Manager
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Historical Record 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
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
                              className="bg-blue-50 text-blue-600"
                            >
                              2024 Mid-Year Review
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Site Engineer • Construction Team
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">4.2/5</span>
                            </div>
                            <span className="text-muted-foreground">
                              Exceeds expectations in technical skills
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              Completed: Jun 30, 2024
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Reviewed by: Project Manager
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Historical Record 3 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>AP</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Amit Patel</h4>
                            <Badge
                              variant="outline"
                              className="bg-purple-50 text-purple-600"
                            >
                              2023 Annual Review
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Safety Manager • Safety Team
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">4.6/5</span>
                            </div>
                            <span className="text-muted-foreground">
                              Exceptional safety protocol implementation
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              Completed: Dec 20, 2023
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Reviewed by: Operations Head
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={Target}
                          animation="pulse"
                          className="text-green-500"
                        />
                        Top Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium">Technical Excellence</h4>
                        <p className="text-sm text-muted-foreground">
                          92% of engineers rated 4+ in technical skills
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium">Safety Compliance</h4>
                        <p className="text-sm text-muted-foreground">
                          100% adherence to safety protocols
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-medium">Project Delivery</h4>
                        <p className="text-sm text-muted-foreground">
                          95% on-time project completion rate
                        </p>
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
                          icon={Activity}
                          animation="bounce"
                          className="text-orange-500"
                        />
                        Development Areas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <h4 className="font-medium">Leadership Skills</h4>
                        <p className="text-sm text-muted-foreground">
                          35% need development in team leadership
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h4 className="font-medium">Digital Adoption</h4>
                        <p className="text-sm text-muted-foreground">
                          Technology integration opportunities
                        </p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <h4 className="font-medium">Communication</h4>
                        <p className="text-sm text-muted-foreground">
                          Cross-team collaboration enhancement needed
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="animate-fadeInUp"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={Award}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Key Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-construction-50 rounded-lg">
                        <h4 className="font-medium">Engagement Score</h4>
                        <p className="text-sm text-muted-foreground">
                          87% employee satisfaction with appraisal process
                        </p>
                      </div>
                      <div className="p-3 bg-primary-50 rounded-lg">
                        <h4 className="font-medium">Goal Achievement</h4>
                        <p className="text-sm text-muted-foreground">
                          78% of annual goals successfully met
                        </p>
                      </div>
                      <div className="p-3 bg-emerald-50 rounded-lg">
                        <h4 className="font-medium">Career Progression</h4>
                        <p className="text-sm text-muted-foreground">
                          42% promoted within 2 years of high rating
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={FileText}
                          animation="float"
                          className="text-blue-500"
                        />
                        Standard Reports
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">
                            Annual Performance Summary
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive yearly analysis
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          <AnimatedIcon
                            icon={Download}
                            size="sm"
                            className="mr-1"
                          />
                          Export
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Department Comparison</h4>
                          <p className="text-sm text-muted-foreground">
                            Cross-department analytics
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          <AnimatedIcon
                            icon={Download}
                            size="sm"
                            className="mr-1"
                          />
                          Export
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Trend Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            5-year performance trends
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          <AnimatedIcon
                            icon={Download}
                            size="sm"
                            className="mr-1"
                          />
                          Export
                        </Button>
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
                          icon={BarChart3}
                          animation="pulse"
                          className="text-construction-500"
                        />
                        Custom Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Executive Dashboard</h4>
                          <p className="text-sm text-muted-foreground">
                            C-level performance insights
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Generate
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Talent Pipeline</h4>
                          <p className="text-sm text-muted-foreground">
                            Succession planning data
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Generate
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Skills Gap Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            Competency mapping report
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Generate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Analytics Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Data-driven insights enabling strategic workforce decisions and
              continuous improvement
            </p>
            <BarChart3 className="h-4 w-4 text-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
