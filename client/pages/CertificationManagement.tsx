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
  Award,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Filter,
  RefreshCw,
  Trophy,
  FileText,
  Shield,
  ArrowRight,
  BarChart3,
  Zap,
  Medal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function CertificationManagement() {
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
                Certification Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Award}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Manage certificates, accreditations, and renewals
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover-lift animate-slideInRight"
            >
              <AnimatedIcon icon={Download} size="sm" className="mr-2" />
              Export Certificates
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Issue Certificate
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Award}
                      animation="pulse"
                      className="text-construction-500"
                    />
                    Issue New Certificate
                  </DialogTitle>
                  <DialogDescription>
                    Create and issue training completion certificates
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
                      <AnimatedIcon
                        icon={Medal}
                        animation="bounce"
                        className="text-yellow-600"
                        size="lg"
                      />
                    </div>
                    <h3 className="font-semibold mb-2">
                      Certificate Generator
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Generate professional training completion certificates
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-construction-500 hover:bg-construction-600">
                      Generate Certificate
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Certification Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-scaleIn">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Certificates
              </CardTitle>
              <AnimatedIcon
                icon={Award}
                animation="float"
                className="text-construction-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">324</div>
              <p className="text-xs text-muted-foreground">+67 this quarter</p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Certificates
              </CardTitle>
              <AnimatedIcon
                icon={CheckCircle}
                animation="glow"
                className="text-green-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">287</div>
              <p className="text-xs text-muted-foreground">
                Currently valid certificates
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Expiring Soon
              </CardTitle>
              <AnimatedIcon
                icon={AlertTriangle}
                animation="pulse"
                className="text-orange-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                Within next 30 days
              </p>
              <Badge variant="outline" className="mt-2">
                <PulsingDot className="mr-1" />
                Renewal needed
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Compliance Rate
              </CardTitle>
              <AnimatedIcon
                icon={Shield}
                animation="bounce"
                className="text-blue-500"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96%</div>
              <p className="text-xs text-muted-foreground">
                Regulatory compliance
              </p>
              <Progress value={96} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Certification Management Interface */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={Medal}
                    animation="float"
                    className="text-construction-600"
                    size="lg"
                  />
                  Certification Management System
                </CardTitle>
                <CardDescription>
                  Comprehensive certificate lifecycle management and tracking
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
            <Tabs defaultValue="my-certificates" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="my-certificates">
                  My Certificates
                </TabsTrigger>
                <TabsTrigger value="expiring">Expiring</TabsTrigger>
                <TabsTrigger value="issued">Recently Issued</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="my-certificates" className="space-y-4">
                <div className="grid gap-4">
                  {/* Certificate Card 1 */}
                  <Card className="hover-lift animate-scaleIn group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-yellow-100">
                          <Award className="h-8 w-8 text-yellow-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">
                              Advanced Safety Management Certification
                            </h3>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Valid
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            Certified in comprehensive safety protocols and risk
                            management for construction sites
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Issued: Jan 15, 2024</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Expires: Jan 15, 2027</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Shield className="h-4 w-4 text-muted-foreground" />
                              <span>Level: Advanced</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Trophy className="h-4 w-4 text-muted-foreground" />
                              <span>Score: 94%</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              Issuing Authority: Construction Safety Institute
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Download}
                              size="sm"
                              className="mr-1"
                            />
                            Download
                          </Button>
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

                  {/* Certificate Card 2 */}
                  <Card
                    className="hover-lift animate-scaleIn group relative overflow-hidden"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-blue-100">
                          <Trophy className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">
                              Leadership Excellence Certification
                            </h3>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Valid
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            Professional certification in leadership and team
                            management excellence
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Issued: Mar 20, 2024</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Expires: Mar 20, 2026</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Shield className="h-4 w-4 text-muted-foreground" />
                              <span>Level: Professional</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Trophy className="h-4 w-4 text-muted-foreground" />
                              <span>Score: 89%</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              Issuing Authority: Leadership Development Council
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Download}
                              size="sm"
                              className="mr-1"
                            />
                            Download
                          </Button>
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

                  {/* Certificate Card 3 */}
                  <Card
                    className="hover-lift animate-scaleIn group relative overflow-hidden"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-orange-100">
                          <FileText className="h-8 w-8 text-orange-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">
                              Quality Control & Assurance Certification
                            </h3>
                            <Badge
                              variant="outline"
                              className="bg-orange-50 text-orange-600"
                            >
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Expiring Soon
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            Specialized certification in construction quality
                            standards and testing methodologies
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Issued: Nov 10, 2021</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-orange-600" />
                              <span>Expires: Nov 10, 2024</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Shield className="h-4 w-4 text-muted-foreground" />
                              <span>Level: Specialist</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Trophy className="h-4 w-4 text-muted-foreground" />
                              <span>Score: 92%</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              Issuing Authority: Quality Assurance Board
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            <AnimatedIcon
                              icon={RefreshCw}
                              size="sm"
                              className="mr-1"
                            />
                            Renew Now
                          </Button>
                          <Button size="sm" variant="outline">
                            <AnimatedIcon
                              icon={Download}
                              size="sm"
                              className="mr-1"
                            />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="expiring" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Clock}
                    animation="pulse"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Expiring Certificates
                  </h3>
                  <p className="text-muted-foreground">
                    Certificates requiring renewal within the next 90 days
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="issued" className="space-y-4">
                <div className="text-center py-8">
                  <AnimatedIcon
                    icon={Award}
                    animation="glow"
                    className="text-construction-500 mx-auto mb-4"
                    size="lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Recently Issued Certificates
                  </h3>
                  <p className="text-muted-foreground">
                    Latest certificates issued across the organization
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
                        Certification Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Safety Certifications</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Technical Certifications</span>
                          <span className="font-medium">30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Leadership Certifications</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Quality Certifications</span>
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
                          icon={Shield}
                          animation="glow"
                          className="text-construction-500"
                        />
                        Compliance Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Valid Certificates</span>
                          <span className="font-medium">287/324</span>
                        </div>
                        <Progress value={89} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Renewal Required</span>
                          <span className="font-medium">23</span>
                        </div>
                        <Progress value={7} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Expired Certificates</span>
                          <span className="font-medium">14</span>
                        </div>
                        <Progress value={4} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Compliance</span>
                          <span className="font-medium">96%</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Certification Management Summary */}
        <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
          <div className="flex items-center justify-center gap-2">
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              className="text-construction-500"
            />
            <p className="text-center text-muted-foreground">
              ✨ Complete certification lifecycle management ensuring
              professional competency and compliance
            </p>
            <Award className="h-4 w-4 text-yellow-500 animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
