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
  FileText,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  DollarSign,
  Eye,
  Filter,
  Download,
  Send,
  ArrowRight,
  BarChart3,
  Zap,
  Clipboard,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function TrainingRequests() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/hrms/learning"
                  className="hover:text-construction-600"
                >
                  <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                  Back to Learning & Development
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Training Requests
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={FileText}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Submit and manage training enrollment requests
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Requests
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Submit Request
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={FileText}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Submit Training Request
                  </DialogTitle>
                  <DialogDescription>
                    Request enrollment in training courses or programs
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Training Course/Program</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safety-mgmt">
                          Advanced Safety Management
                        </SelectItem>
                        <SelectItem value="leadership">
                          Leadership Excellence Program
                        </SelectItem>
                        <SelectItem value="quality-control">
                          Quality Control & Assurance
                        </SelectItem>
                        <SelectItem value="digital-tools">
                          Digital Construction Tools
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Priority Level</Label>
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
                    <div className="space-y-2">
                      <Label>Preferred Start Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Business Justification</Label>
                    <Textarea placeholder="Explain how this training will benefit your role and the organization..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Expected Outcomes</Label>
                    <Textarea placeholder="Describe the skills or knowledge you expect to gain..." />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      <AnimatedIcon
                        icon={Send}
                        size="sm"
                        className="mr-2"
                        animation="bounce"
                      />
                      Submit Request
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Request Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Requests
              </CardTitle>
              <AnimatedIcon
                icon={FileText}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Approval
              </CardTitle>
              <AnimatedIcon
                icon={Clock}
                animation="pulse"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
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
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <AnimatedIcon
                icon={CheckCircle}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">52</div>
              <p className="text-xs text-muted-foreground">
                Ready for enrollment
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Processing Time
              </CardTitle>
              <AnimatedIcon
                icon={BarChart3}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3 days</div>
              <p className="text-xs text-muted-foreground">
                From submission to approval
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Training Requests Management */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Clipboard}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  Training Request Management
                </CardTitle>
                <CardDescription>
                  Track and manage training enrollment requests
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
            <Tabs defaultValue="my-requests" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="my-requests">My Requests</TabsTrigger>
                <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="my-requests" className="space-y-4">
                <div className="grid gap-4">
                  {/* Request Item 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approved
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-600"
                            >
                              High Priority
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Advanced Safety Management
                          </h3>
                          <p className="text-muted-foreground">
                            Comprehensive safety protocols and risk management
                            for construction sites
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Requested: Sep 15, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              Approved by: Manager
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              Cost: ₹15,000
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            View Details
                          </Button>
                          <Button size="sm" className="bg-construction-500">
                            Enroll Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Request Item 2 */}
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
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-yellow-50 text-yellow-600"
                            >
                              Medium Priority
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Leadership Excellence Program
                          </h3>
                          <p className="text-muted-foreground">
                            Develop essential leadership skills for team
                            management and project success
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Requested: Oct 10, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4" />
                              Awaiting approval
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              Cost: ₹25,000
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Edit Request
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Request Item 3 */}
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
                              className="bg-red-50 text-red-600"
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Rejected
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-gray-50 text-gray-600"
                            >
                              Low Priority
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            Digital Construction Tools
                          </h3>
                          <p className="text-muted-foreground">
                            Learn modern construction software and digital
                            workflow management
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Requested: Sep 28, 2024
                            </div>
                            <div className="flex items-center gap-1">
                              <XCircle className="h-4 w-4" />
                              Budget constraints
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              Cost: ₹35,000
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            View Feedback
                          </Button>
                          <Button size="sm" variant="outline">
                            Resubmit Request
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Clock}
                    animation="pulse"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Pending Approval Requests
                  </h3>
                  <p className="text-muted-foreground">
                    Requests awaiting manager or HR approval
                  </p>
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
                    Approved Requests
                  </h3>
                  <p className="text-muted-foreground">
                    Approved training requests ready for enrollment
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
                        Request Status Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Approved Requests</span>
                          <span className="font-medium">58%</span>
                        </div>
                        <Progress value={58} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Pending Approval</span>
                          <span className="font-medium">32%</span>
                        </div>
                        <Progress value={32} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Rejected</span>
                          <span className="font-medium">10%</span>
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
                          icon={DollarSign}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Training Investment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Approved Budget</span>
                          <span className="font-medium">₹8,50,000</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Utilized Amount</span>
                          <span className="font-medium">₹6,38,000</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Remaining Budget</span>
                          <span className="font-medium">₹2,12,000</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Training Requests Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Streamlined training request process ensuring skill development
              alignment with business needs
            </p>
            <Clipboard className="h-4 w-4 text-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
