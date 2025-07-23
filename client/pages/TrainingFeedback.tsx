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
  Star,
  Plus,
  MessageSquare,
  TrendingUp,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Filter,
  Download,
  Send,
  Users,
  Target,
  Award,
  ArrowRight,
  Activity,
  Zap,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function TrainingFeedback() {
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
                Training Feedback & Effectiveness
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
                Evaluate training impact and continuous improvement
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Feedback
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Submit Feedback
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
                    Submit Training Feedback
                  </DialogTitle>
                  <DialogDescription>
                    Share your experience and help improve training quality
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Training Course</Label>
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
                      <Label>Overall Rating</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Rate training" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">
                            ⭐⭐⭐⭐⭐ Excellent (5/5)
                          </SelectItem>
                          <SelectItem value="4">⭐⭐⭐⭐ Good (4/5)</SelectItem>
                          <SelectItem value="3">
                            ⭐⭐⭐ Average (3/5)
                          </SelectItem>
                          <SelectItem value="2">⭐⭐ Poor (2/5)</SelectItem>
                          <SelectItem value="1">⭐ Very Poor (1/5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Recommendation</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Would you recommend?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="highly">
                            Highly Recommend
                          </SelectItem>
                          <SelectItem value="yes">Yes, Recommend</SelectItem>
                          <SelectItem value="maybe">Maybe</SelectItem>
                          <SelectItem value="no">Not Recommend</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>What did you like most?</Label>
                    <Textarea placeholder="Share the positive aspects of the training..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Areas for improvement</Label>
                    <Textarea placeholder="Suggest improvements for future training..." />
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
                      Submit Feedback
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
                Average Rating
              </CardTitle>
              <AnimatedIcon
                icon={Star}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.6/5</div>
              <p className="text-xs text-muted-foreground">
                Across all training programs
              </p>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 ${
                      star <= 4.6
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Feedback
              </CardTitle>
              <AnimatedIcon
                icon={MessageSquare}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">
                +47 new this month
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recommendation Rate
              </CardTitle>
              <AnimatedIcon
                icon={ThumbsUp}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91%</div>
              <p className="text-xs text-muted-foreground">
                Learners recommend our training
              </p>
              <Progress value={91} className="mt-2" />
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Response Rate
              </CardTitle>
              <AnimatedIcon
                icon={BarChart3}
                animation="pulse"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                Feedback participation rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Training Feedback Interface */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Heart}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  Training Feedback & Effectiveness
                </CardTitle>
                <CardDescription>
                  Comprehensive feedback analysis and training effectiveness
                  metrics
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
            <Tabs defaultValue="recent-feedback" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="recent-feedback">
                  Recent Feedback
                </TabsTrigger>
                <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
                <TabsTrigger value="improvements">Improvements</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="recent-feedback" className="space-y-4">
                <div className="grid gap-4">
                  {/* Feedback Item 1 */}
                  <Card className="hover-lift animate-scaleIn">
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
                                Advanced Safety Management • 2 hours ago
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-600"
                              >
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                Highly Recommend
                              </Badge>
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            "Excellent training program! The instructor was very
                            knowledgeable and the practical demonstrations were
                            extremely helpful. I feel much more confident about
                            implementing safety protocols on-site now."
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <Button variant="ghost" size="sm">
                              <AnimatedIcon
                                icon={ThumbsUp}
                                size="sm"
                                className="mr-1"
                              />
                              5 Helpful
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
                                icon={Eye}
                                size="sm"
                                className="mr-1"
                              />
                              View Full
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
                          <AvatarFallback>PS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">Priya Sharma</h4>
                              <p className="text-sm text-muted-foreground">
                                Leadership Excellence Program • 5 hours ago
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {[1, 2, 3, 4].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                                <Star className="h-4 w-4 text-yellow-400" />
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-600"
                              >
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                Recommend
                              </Badge>
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            "Great content and well-structured modules. The case
                            studies were relevant to our industry. Would like to
                            see more interactive elements and group exercises in
                            future sessions."
                          </p>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium mb-1">
                              Improvement Suggestions:
                            </p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• More interactive group activities</li>
                              <li>• Additional real-world case studies</li>
                              <li>• Longer session duration</li>
                            </ul>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <Button variant="ghost" size="sm">
                              <AnimatedIcon
                                icon={ThumbsUp}
                                size="sm"
                                className="mr-1"
                              />
                              3 Helpful
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
                                icon={Award}
                                size="sm"
                                className="mr-1"
                              />
                              Actionable
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
                                Quality Control & Assurance • 1 day ago
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {[1, 2, 3].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                                <Star className="h-4 w-4 text-yellow-400" />
                                <Star className="h-4 w-4 text-yellow-400" />
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-yellow-50 text-yellow-600"
                              >
                                <ThumbsDown className="h-3 w-3 mr-1" />
                                Neutral
                              </Badge>
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            "The content was comprehensive but the pace was too
                            fast. Some topics needed more detailed explanation.
                            The instructor was knowledgeable but could improve
                            engagement with the audience."
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <Button variant="ghost" size="sm">
                              <AnimatedIcon
                                icon={ThumbsUp}
                                size="sm"
                                className="mr-1"
                              />
                              1 Helpful
                            </Button>
                            <Button variant="ghost" size="sm">
                              <AnimatedIcon
                                icon={MessageSquare}
                                size="sm"
                                className="mr-1"
                              />
                              Address Concerns
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="effectiveness" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={Target}
                          animation="pulse"
                          className="text-primary"
                        />
                        Training Effectiveness
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Knowledge Retention</span>
                          <span className="font-medium">88%</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Skill Application</span>
                          <span className="font-medium">82%</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Behavioral Change</span>
                          <span className="font-medium">76%</span>
                        </div>
                        <Progress value={76} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>ROI Achievement</span>
                          <span className="font-medium">84%</span>
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
                          icon={TrendingUp}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Satisfaction Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Content Quality</span>
                          <span className="font-medium">4.7/5</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Instructor Rating</span>
                          <span className="font-medium">4.5/5</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Delivery Method</span>
                          <span className="font-medium">4.3/5</span>
                        </div>
                        <Progress value={86} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Experience</span>
                          <span className="font-medium">4.6/5</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="improvements" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Activity}
                    animation="pulse"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Continuous Improvement
                  </h3>
                  <p className="text-muted-foreground">
                    Actionable insights and improvement recommendations
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
                        Feedback Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>5-Star Ratings</span>
                          <span className="font-medium">58%</span>
                        </div>
                        <Progress value={58} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>4-Star Ratings</span>
                          <span className="font-medium">28%</span>
                        </div>
                        <Progress value={28} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>3-Star Ratings</span>
                          <span className="font-medium">10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Below 3-Star</span>
                          <span className="font-medium">4%</span>
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
                          icon={Users}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Engagement Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Response Rate</span>
                          <span className="font-medium">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Detailed Feedback</span>
                          <span className="font-medium">64%</span>
                        </div>
                        <Progress value={64} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Constructive Suggestions</span>
                          <span className="font-medium">42%</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Follow-up Participation</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Training Feedback Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Data-driven feedback system enabling continuous improvement and
              training excellence
            </p>
            <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
