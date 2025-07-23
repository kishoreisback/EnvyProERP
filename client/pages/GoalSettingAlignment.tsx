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
  Target,
  Plus,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  Eye,
  Edit,
  ArrowRight,
  Filter,
  Download,
  BarChart3,
  Zap,
  Flag,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function GoalSettingAlignment() {
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
                Goal Setting & Alignment
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
                KRA/KPI management and organizational goal alignment
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Goals
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Create Goal
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
                    Create New Goal
                  </DialogTitle>
                  <DialogDescription>
                    Set SMART goals aligned with organizational objectives
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Goal Title</Label>
                    <Input placeholder="e.g., Improve project delivery time by 15%" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kra">
                            Key Result Area (KRA)
                          </SelectItem>
                          <SelectItem value="kpi">
                            Key Performance Indicator (KPI)
                          </SelectItem>
                          <SelectItem value="development">
                            Development Goal
                          </SelectItem>
                          <SelectItem value="project">Project Goal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="medium">
                            Medium Priority
                          </SelectItem>
                          <SelectItem value="low">Low Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Detailed description of the goal..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Target Value</Label>
                      <Input placeholder="e.g., 15%" />
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Create Goal
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Goal Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
              <AnimatedIcon
                icon={Target}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                +12 from last quarter
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Goals Achieved
              </CardTitle>
              <AnimatedIcon
                icon={CheckCircle}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">122</div>
              <p className="text-xs text-muted-foreground">
                78% achievement rate
              </p>
              <Progress value={78} className="mt-2" />
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <AnimatedIcon
                icon={Clock}
                animation="pulse"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">
                Active goals being tracked
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AnimatedIcon
                icon={AlertTriangle}
                animation="bounce"
                className="text-red-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                Require immediate attention
              </p>
              <Badge variant="destructive" className="mt-2">
                <PulsingDot className="mr-1" />
                Action needed
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Goal Management Interface */}
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
                  Goal Management Dashboard
                </CardTitle>
                <CardDescription>
                  Track and manage KRAs, KPIs, and development goals
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
            <Tabs defaultValue="all-goals" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all-goals">All Goals</TabsTrigger>
                <TabsTrigger value="kras">KRAs</TabsTrigger>
                <TabsTrigger value="kpis">KPIs</TabsTrigger>
                <TabsTrigger value="development">Development</TabsTrigger>
              </TabsList>

              <TabsContent value="all-goals" className="space-y-4">
                <div className="grid gap-4">
                  {/* Goal Item 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-construction-50"
                            >
                              KRA
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-orange-50 text-orange-600"
                            >
                              High Priority
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              On Track
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Improve Project Delivery Efficiency
                          </h3>
                          <p className="text-muted-foreground">
                            Reduce average project completion time by 15%
                            through process optimization and resource management
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: Dec 31, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <UserCheck className="h-4 w-4" />
                              Assigned: Rajesh Kumar
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-construction-600">
                              72%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Progress
                            </div>
                          </div>
                          <Progress value={72} className="w-24" />
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

                  {/* Goal Item 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-50">
                              KPI
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-yellow-50 text-yellow-600"
                            >
                              Medium Priority
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              Achieved
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Client Satisfaction Score
                          </h3>
                          <p className="text-muted-foreground">
                            Maintain client satisfaction score above 4.5/5.0
                            through quality delivery and communication
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: Ongoing
                            </div>
                            <div className="flex items-center gap-1">
                              <UserCheck className="h-4 w-4" />
                              Assigned: Priya Sharma
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              4.7/5
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Current Score
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= 4.7
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
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Goal Item 3 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-purple-50">
                              Development
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-600"
                            >
                              Low Priority
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-600"
                            >
                              At Risk
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Safety Certification Training
                          </h3>
                          <p className="text-muted-foreground">
                            Complete advanced safety management certification
                            and implement new protocols
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: Nov 15, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <UserCheck className="h-4 w-4" />
                              Assigned: Amit Patel
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-red-600">
                              35%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Progress
                            </div>
                          </div>
                          <Progress value={35} className="w-24" />
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

              <TabsContent value="kras" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Target}
                    animation="float"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Key Result Areas
                  </h3>
                  <p className="text-muted-foreground">
                    Main responsibility areas that drive organizational success
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="kpis" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={BarChart3}
                    animation="pulse"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Key Performance Indicators
                  </h3>
                  <p className="text-muted-foreground">
                    Measurable metrics that track performance against objectives
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="development" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={TrendingUp}
                    animation="glow"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Development Goals
                  </h3>
                  <p className="text-muted-foreground">
                    Personal and professional growth objectives
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Goal Alignment Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ SMART goal framework ensuring measurable outcomes and
              organizational alignment
            </p>
            <Flag className="h-4 w-4 text-yellow-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
