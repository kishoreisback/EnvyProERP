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
  BookOpen,
  Plus,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Play,
  Download,
  Award,
  Target,
  ArrowRight,
  Eye,
  ShoppingCart,
  Zap,
  Bookmark,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function CourseCatalog() {
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
                Course Catalog
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={BookOpen}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Browse and discover comprehensive training courses
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Catalog
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Add Course
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={BookOpen}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Add New Course
                  </DialogTitle>
                  <DialogDescription>
                    Create a new training course for the catalog
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course Title</label>
                    <Input placeholder="e.g., Advanced Safety Management" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="safety">
                            Safety & Compliance
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Skills
                          </SelectItem>
                          <SelectItem value="leadership">Leadership</SelectItem>
                          <SelectItem value="soft-skills">
                            Soft Skills
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration</label>
                      <Input placeholder="e.g., 8 hours" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Add Course
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Course Statistics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Courses
              </CardTitle>
              <AnimatedIcon
                icon={BookOpen}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">
                +15 new this month
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Popular Courses
              </CardTitle>
              <AnimatedIcon
                icon={Star}
                animation="glow"
                className="text-yellow-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">4.5+ star ratings</p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Enrollments
              </CardTitle>
              <AnimatedIcon
                icon={Users}
                animation="pulse"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,247</div>
              <p className="text-xs text-muted-foreground">
                Active learner enrollments
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Learning Hours
              </CardTitle>
              <AnimatedIcon
                icon={Clock}
                animation="bounce"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,856</div>
              <p className="text-xs text-muted-foreground">
                Total course duration hours
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Course Catalog Interface */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={BookOpen}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  Course Catalog
                </CardTitle>
                <CardDescription>
                  Comprehensive training course library and management
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <AnimatedIcon icon={Filter} size="sm" className="mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all-courses" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all-courses">All Courses</TabsTrigger>
                <TabsTrigger value="safety">Safety</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="leadership">Leadership</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>

              <TabsContent value="all-courses" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Course Card 1 */}
                  <Card className="hover-lift animate-scaleIn group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="h-32 bg-gradient-to-br from-construction-500 to-construction-600 flex items-center justify-center">
                          <AnimatedIcon
                            icon={Target}
                            animation="float"
                            className="text-white"
                            size="lg"
                          />
                        </div>
                        <Badge className="absolute top-2 right-2 bg-green-500">
                          New
                        </Badge>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold mb-1">
                            Advanced Safety Management
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive safety protocols and risk management
                            for construction sites
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>8 hours</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>142 enrolled</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>4.8</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Course Progress</span>
                            <span>Not Started</span>
                          </div>
                          <Progress value={0} className="h-1" />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <AnimatedIcon
                              icon={Play}
                              size="sm"
                              className="mr-1"
                            />
                            Enroll Now
                          </Button>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Course Card 2 */}
                  <Card
                    className="hover-lift animate-scaleIn group relative overflow-hidden"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <AnimatedIcon
                            icon={Award}
                            animation="glow"
                            className="text-white"
                            size="lg"
                          />
                        </div>
                        <Badge className="absolute top-2 right-2 bg-yellow-500">
                          Popular
                        </Badge>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold mb-1">
                            Leadership Excellence Program
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Develop essential leadership skills for team
                            management and project success
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>16 hours</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>89 enrolled</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>4.9</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Course Progress</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} className="h-1" />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            variant="outline"
                          >
                            <AnimatedIcon
                              icon={Play}
                              size="sm"
                              className="mr-1"
                            />
                            Continue
                          </Button>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Bookmark}
                              size="sm"
                              className="mr-1"
                            />
                            Save
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Course Card 3 */}
                  <Card
                    className="hover-lift animate-scaleIn group relative overflow-hidden"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="h-32 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                          <AnimatedIcon
                            icon={Target}
                            animation="pulse"
                            className="text-white"
                            size="lg"
                          />
                        </div>
                        <Badge className="absolute top-2 right-2 bg-blue-500">
                          Certified
                        </Badge>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold mb-1">
                            Quality Control & Assurance
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Master quality standards and testing methodologies
                            for construction projects
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>12 hours</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>67 enrolled</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>4.7</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Course Progress</span>
                            <span>Completed</span>
                          </div>
                          <Progress value={100} className="h-1" />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            variant="outline"
                          >
                            <AnimatedIcon
                              icon={Award}
                              size="sm"
                              className="mr-1"
                            />
                            View Certificate
                          </Button>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Star}
                              size="sm"
                              className="mr-1"
                            />
                            Rate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Course Card 4 */}
                  <Card
                    className="hover-lift animate-scaleIn group relative overflow-hidden"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="h-32 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                          <AnimatedIcon
                            icon={BookOpen}
                            animation="bounce"
                            className="text-white"
                            size="lg"
                          />
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold mb-1">
                            Digital Construction Tools
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Learn modern construction software and digital
                            workflow management
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>20 hours</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>234 enrolled</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>4.6</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Course Progress</span>
                            <span>Not Started</span>
                          </div>
                          <Progress value={0} className="h-1" />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <AnimatedIcon
                              icon={ShoppingCart}
                              size="sm"
                              className="mr-1"
                            />
                            Enroll Now
                          </Button>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Eye}
                              size="sm"
                              className="mr-1"
                            />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="safety" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Target}
                    animation="float"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Safety & Compliance Courses
                  </h3>
                  <p className="text-muted-foreground">
                    Essential safety training for construction environments
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Award}
                    animation="glow"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Technical Skills Courses
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced technical training and certifications
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="leadership" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Users}
                    animation="pulse"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Leadership Development
                  </h3>
                  <p className="text-muted-foreground">
                    Management and leadership skills enhancement
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="popular" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Star}
                    animation="glow"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Most Popular Courses
                  </h3>
                  <p className="text-muted-foreground">
                    Top-rated courses with highest enrollment
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Course Catalog Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Discover and enroll in courses designed for construction
              industry excellence
            </p>
            <BookOpen className="h-4 w-4 text-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
