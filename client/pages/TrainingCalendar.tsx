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
  Calendar,
  Plus,
  Clock,
  MapPin,
  Users,
  Video,
  BookOpen,
  Filter,
  Download,
  Eye,
  Edit,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function TrainingCalendar() {
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
                Training Calendar & Scheduling
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Calendar}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Schedule and manage training sessions and events
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Calendar
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Schedule Training
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Calendar}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Schedule Training Session
                  </DialogTitle>
                  <DialogDescription>
                    Create a new training session or event
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-construction-100 flex items-center justify-center">
                      <AnimatedIcon
                        icon={CalendarDays}
                        animation="bounce"
                        className="text-construction-600"
                        size="lg"
                      />
                    </div>
                    <h3 className="font-semibold mb-2">
                      Training Session Scheduler
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Set up comprehensive training sessions with all details
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Schedule Session
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Calendar Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                This Week's Sessions
              </CardTitle>
              <AnimatedIcon
                icon={Calendar}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                5 in-person • 10 online
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Participants
              </CardTitle>
              <AnimatedIcon
                icon={Users}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                Registered for upcoming sessions
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Training Hours
              </CardTitle>
              <AnimatedIcon
                icon={Clock}
                animation="pulse"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">
                Hours scheduled this month
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Utilization Rate
              </CardTitle>
              <AnimatedIcon
                icon={BarChart3}
                animation="glow"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                Training room capacity
              </p>
              <Progress value={87} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Training Calendar Interface */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={CalendarDays}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  Training Calendar & Scheduling
                </CardTitle>
                <CardDescription>
                  Comprehensive training session management and scheduling
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
            <Tabs defaultValue="weekly-view" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="weekly-view">Weekly View</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="my-schedule">My Schedule</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="weekly-view" className="space-y-4">
                <div className="grid gap-4">
                  {/* Weekly Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <div
                        key={day}
                        className="text-center font-medium text-sm p-2 bg-muted rounded-lg"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Training Sessions for Each Day */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Monday */}
                    <div className="space-y-2">
                      <div className="text-xs text-center text-muted-foreground">
                        Oct 21
                      </div>
                      <Card className="p-2 bg-construction-50 border-construction-200">
                        <div className="text-xs font-medium">
                          Safety Training
                        </div>
                        <div className="text-xs text-muted-foreground">
                          9:00 AM - 5:00 PM
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3" />
                          Room A
                        </div>
                      </Card>
                    </div>

                    {/* Tuesday */}
                    <div className="space-y-2">
                      <div className="text-xs text-center text-muted-foreground">
                        Oct 22
                      </div>
                      <Card className="p-2 bg-blue-50 border-blue-200">
                        <div className="text-xs font-medium">
                          Leadership Workshop
                        </div>
                        <div className="text-xs text-muted-foreground">
                          10:00 AM - 2:00 PM
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Video className="h-3 w-3" />
                          Online
                        </div>
                      </Card>
                      <Card className="p-2 bg-green-50 border-green-200">
                        <div className="text-xs font-medium">
                          Quality Control
                        </div>
                        <div className="text-xs text-muted-foreground">
                          3:00 PM - 6:00 PM
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3" />
                          Lab B
                        </div>
                      </Card>
                    </div>

                    {/* Wednesday */}
                    <div className="space-y-2">
                      <div className="text-xs text-center text-muted-foreground">
                        Oct 23
                      </div>
                      <Card className="p-2 bg-purple-50 border-purple-200">
                        <div className="text-xs font-medium">Digital Tools</div>
                        <div className="text-xs text-muted-foreground">
                          1:00 PM - 4:00 PM
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Video className="h-3 w-3" />
                          Online
                        </div>
                      </Card>
                    </div>

                    {/* Thursday */}
                    <div className="space-y-2">
                      <div className="text-xs text-center text-muted-foreground">
                        Oct 24
                      </div>
                      <Card className="p-2 bg-orange-50 border-orange-200">
                        <div className="text-xs font-medium">
                          Project Management
                        </div>
                        <div className="text-xs text-muted-foreground">
                          9:00 AM - 12:00 PM
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3" />
                          Conf. Room
                        </div>
                      </Card>
                      <Card className="p-2 bg-yellow-50 border-yellow-200">
                        <div className="text-xs font-medium">
                          Communication Skills
                        </div>
                        <div className="text-xs text-muted-foreground">
                          2:00 PM - 5:00 PM
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3" />
                          Room C
                        </div>
                      </Card>
                    </div>

                    {/* Friday */}
                    <div className="space-y-2">
                      <div className="text-xs text-center text-muted-foreground">
                        Oct 25
                      </div>
                      <Card className="p-2 bg-indigo-50 border-indigo-200">
                        <div className="text-xs font-medium">
                          Technical Skills
                        </div>
                        <div className="text-xs text-muted-foreground">
                          10:00 AM - 3:00 PM
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3" />
                          Workshop
                        </div>
                      </Card>
                    </div>

                    {/* Saturday */}
                    <div className="space-y-2">
                      <div className="text-xs text-center text-muted-foreground">
                        Oct 26
                      </div>
                      <div className="text-xs text-center text-gray-400 py-4">
                        Weekend
                      </div>
                    </div>

                    {/* Sunday */}
                    <div className="space-y-2">
                      <div className="text-xs text-center text-muted-foreground">
                        Oct 27
                      </div>
                      <div className="text-xs text-center text-gray-400 py-4">
                        Weekend
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-4">
                <div className="grid gap-4">
                  {/* Upcoming Session 1 */}
                  <Card className="hover-lift animate-scaleIn">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-construction-100">
                          <BookOpen className="h-6 w-6 text-construction-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">
                              Advanced Safety Management
                            </h3>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              Confirmed
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            Comprehensive safety protocols and risk management
                            for construction sites
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Oct 21, 2024</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>9:00 AM - 5:00 PM</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>Training Room A</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>24/30 participants</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder-avatar.jpg" />
                              <AvatarFallback>AP</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              Instructor: Amit Patel
                            </span>
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
                            <AnimatedIcon
                              icon={Edit}
                              size="sm"
                              className="mr-1"
                            />
                            Edit Session
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Session 2 */}
                  <Card
                    className="hover-lift animate-scaleIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-blue-100">
                          <Video className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">
                              Leadership Excellence Workshop
                            </h3>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-600"
                            >
                              Online
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            Develop essential leadership skills for team
                            management and project success
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Oct 22, 2024</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>10:00 AM - 2:00 PM</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Video className="h-4 w-4 text-muted-foreground" />
                              <span>Microsoft Teams</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>18/25 participants</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder-avatar.jpg" />
                              <AvatarFallback>PS</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              Instructor: Priya Sharma
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            Join Session
                          </Button>
                          <Button size="sm" variant="outline">
                            Send Reminder
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="my-schedule" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={CalendarDays}
                    animation="pulse"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    My Training Schedule
                  </h3>
                  <p className="text-muted-foreground">
                    Personal calendar view of enrolled training sessions
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="animate-fadeInUp">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AnimatedIcon
                          icon={MapPin}
                          animation="float"
                          className="text-primary"
                        />
                        Training Facilities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Training Room A</h4>
                        <p className="text-sm text-muted-foreground">
                          Capacity: 30 people • Projector, Whiteboard
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Workshop Lab B</h4>
                        <p className="text-sm text-muted-foreground">
                          Capacity: 20 people • Hands-on equipment
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Conference Room</h4>
                        <p className="text-sm text-muted-foreground">
                          Capacity: 50 people • Video conferencing
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
                          icon={Users}
                          animation="bounce"
                          className="text-construction-500"
                        />
                        Available Instructors
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>AP</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">Amit Patel</h4>
                          <p className="text-sm text-muted-foreground">
                            Safety & Compliance Expert
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>PS</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">Priya Sharma</h4>
                          <p className="text-sm text-muted-foreground">
                            Leadership Development Coach
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">Rajesh Kumar</h4>
                          <p className="text-sm text-muted-foreground">
                            Technical Skills Trainer
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Training Calendar Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Efficient scheduling system ensuring optimal training delivery
              and resource utilization
            </p>
            <Calendar className="h-4 w-4 text-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
