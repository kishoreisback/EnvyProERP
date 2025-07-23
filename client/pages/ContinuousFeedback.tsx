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
  MessageSquare,
  Plus,
  Star,
  ThumbsUp,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  Send,
  Eye,
  Heart,
  Award,
  Filter,
  Download,
  BarChart3,
  Smile,
  UserCheck,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function ContinuousFeedback() {
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
                Continuous Feedback
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={MessageSquare}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Real-time feedback, peer recognition, and development insights
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Reports
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Give Feedback
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={MessageSquare}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Give Feedback
                  </DialogTitle>
                  <DialogDescription>
                    Provide constructive feedback to help colleagues grow
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Recipient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose team member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
                        <SelectItem value="priya">Priya Sharma</SelectItem>
                        <SelectItem value="amit">Amit Patel</SelectItem>
                        <SelectItem value="sunita">Sunita Singh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Feedback Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="appreciation">
                            Appreciation
                          </SelectItem>
                          <SelectItem value="development">
                            Development
                          </SelectItem>
                          <SelectItem value="project">
                            Project-specific
                          </SelectItem>
                          <SelectItem value="behavioral">Behavioral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Rate performance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">
                            ⭐⭐⭐⭐⭐ Excellent
                          </SelectItem>
                          <SelectItem value="4">⭐⭐⭐⭐ Good</SelectItem>
                          <SelectItem value="3">⭐⭐⭐ Average</SelectItem>
                          <SelectItem value="2">⭐⭐ Below Average</SelectItem>
                          <SelectItem value="1">
                            ⭐ Needs Improvement
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Feedback Message</Label>
                    <Textarea
                      placeholder="Share your detailed feedback..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Suggestions for Improvement</Label>
                    <Textarea
                      placeholder="Provide actionable suggestions..."
                      rows={3}
                    />
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
                      Send Feedback
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Feedback Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Feedback
              </CardTitle>
              <AnimatedIcon
                icon={MessageSquare}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                +28 this week • 95% positive
              </p>
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
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                Awaiting your response
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
                Average Rating
              </CardTitle>
              <AnimatedIcon
                icon={Star}
                animation="glow"
                className="text-yellow-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.3/5</div>
              <p className="text-xs text-muted-foreground">
                Team performance score
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
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recognition Given
              </CardTitle>
              <AnimatedIcon
                icon={Award}
                animation="bounce"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                Appreciations shared this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Management Interface */}
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
                  Feedback Dashboard
                </CardTitle>
                <CardDescription>
                  Track feedback, recognition, and development conversations
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
            <Tabs defaultValue="received" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="received">Received</TabsTrigger>
                <TabsTrigger value="given">Given</TabsTrigger>
                <TabsTrigger value="recognition">Recognition</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="received" className="space-y-4">
                <div className="grid gap-4">
                  {/* Feedback Item 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>PS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">Priya Sharma</h4>
                              <p className="text-sm text-muted-foreground">
                                Project Manager • 2 hours ago
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-600"
                              >
                                Appreciation
                              </Badge>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            "Excellent work on the client presentation! Your
                            attention to detail and clear communication really
                            impressed the stakeholders. The project timeline you
                            prepared was comprehensive and well-thought-out."
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <Button variant="ghost" size="sm">
                              <AnimatedIcon
                                icon={ThumbsUp}
                                size="sm"
                                className="mr-1"
                              />
                              12 Likes
                            </Button>
                            <Button variant="ghost" size="sm">
                              <AnimatedIcon
                                icon={MessageSquare}
                                size="sm"
                                className="mr-1"
                              />
                              Reply
                            </Button>
                            <Button variant="ghost" size="sm">
                              <AnimatedIcon
                                icon={Heart}
                                size="sm"
                                className="mr-1"
                              />
                              Thank
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Feedback Item 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">Rajesh Kumar</h4>
                              <p className="text-sm text-muted-foreground">
                                Site Engineer • 1 day ago
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-600"
                              >
                                Development
                              </Badge>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                                <Star className="h-3 w-3 text-yellow-400" />
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            "Your technical skills are strong, but I'd like to
                            see more initiative in team collaboration. Consider
                            sharing your expertise with junior team members and
                            taking on more leadership responsibilities in
                            upcoming projects."
                          </p>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium mb-1">
                              Suggestions:
                            </p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>
                                • Lead weekly technical knowledge sessions
                              </li>
                              <li>• Mentor new team members</li>
                              <li>• Volunteer for cross-functional projects</li>
                            </ul>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <Button variant="ghost" size="sm">
                              <AnimatedIcon
                                icon={CheckCircle}
                                size="sm"
                                className="mr-1"
                              />
                              Mark as Read
                            </Button>
                            <Button variant="ghost" size="sm">
                              <AnimatedIcon
                                icon={MessageSquare}
                                size="sm"
                                className="mr-1"
                              />
                              Respond
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Feedback Item 3 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>AP</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">Amit Patel</h4>
                              <p className="text-sm text-muted-foreground">
                                Safety Manager • 3 days ago
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="bg-orange-50 text-orange-600"
                              >
                                Project-specific
                              </Badge>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            "Outstanding safety protocol implementation during
                            the high-rise construction phase. Your proactive
                            approach prevented potential incidents and kept the
                            team motivated to follow safety guidelines."
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <Button variant="ghost" size="sm">
                              <AnimatedIcon
                                icon={ThumbsUp}
                                size="sm"
                                className="mr-1"
                              />
                              8 Likes
                            </Button>
                            <Button variant="ghost" size="sm">
                              <AnimatedIcon
                                icon={Award}
                                size="sm"
                                className="mr-1"
                              />
                              Nominate for Award
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="given" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Send}
                    animation="float"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Feedback You've Given
                  </h3>
                  <p className="text-muted-foreground">
                    Track feedback you've provided to colleagues
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="recognition" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Award}
                    animation="glow"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Recognition & Appreciation
                  </h3>
                  <p className="text-muted-foreground">
                    Celebrate team achievements and milestones
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={TrendingUp}
                          animation="pulse"
                          className="text-primary"
                        />
                        Feedback Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Appreciation Feedback</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Development Feedback</span>
                          <span className="font-medium">25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Project-specific</span>
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
                          icon={Users}
                          animation="bounce"
                          className="text-construction-500"
                        />
                        Team Engagement
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Active Participants</span>
                          <span className="font-medium">89%</span>
                        </div>
                        <Progress value={89} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Regular Contributors</span>
                          <span className="font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Response Rate</span>
                          <span className="font-medium">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Feedback Culture Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Smile}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Building a culture of continuous feedback and recognition for
              team growth
            </p>
            <Heart className="h-4 w-4 text-pink-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
