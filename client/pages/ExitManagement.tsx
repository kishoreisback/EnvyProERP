import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  Calculator,
  User,
  Send,
  Download,
  AlertCircle,
  Info,
  CheckSquare,
  DollarSign,
  Calendar as CalendarIcon,
  Users,
  Award,
  Building,
  UserCheck,
  Upload,
  Bell,
  Target,
  TrendingUp,
  FileCheck,
} from "lucide-react";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { BackToHRMS } from "@/components/hrms";

export default function ExitManagement() {
  const [activeTab, setActiveTab] = useState("resignation");

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <BackToHRMS />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Exit Management
            </h1>
            <p className="text-muted-foreground">
              Complete employee exit process from resignation to final
              settlement
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <PulsingDot className="text-green-500" />
              42 Active Cases
            </Badge>
            <Button>
              <AnimatedIcon icon={FileText} className="mr-2" />
              Generate Reports
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger
              value="resignation"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Resignation Submission
            </TabsTrigger>
            <TabsTrigger value="interviews" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Exit Interviews
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Notice Period Tracking
            </TabsTrigger>
            <TabsTrigger value="clearance" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Clearance Workflow
            </TabsTrigger>
            <TabsTrigger value="settlement" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Final Settlement
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resignation" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={FileText} animation="bounce" />
                    Resignation Application
                  </CardTitle>
                  <CardDescription>
                    Submit or review employee resignation requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="employee">Employee</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emp001">
                            Rajesh Kumar (EMP001)
                          </SelectItem>
                          <SelectItem value="emp002">
                            Priya Sharma (EMP002)
                          </SelectItem>
                          <SelectItem value="emp003">
                            Amit Singh (EMP003)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resignation-date">Resignation Date</Label>
                      <Input type="date" id="resignation-date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-working-day">Last Working Day</Label>
                      <Input type="date" id="last-working-day" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">Resignation Reason</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="career">Career Growth</SelectItem>
                          <SelectItem value="compensation">
                            Better Compensation
                          </SelectItem>
                          <SelectItem value="personal">
                            Personal Reasons
                          </SelectItem>
                          <SelectItem value="relocation">Relocation</SelectItem>
                          <SelectItem value="education">
                            Higher Education
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resignation-details">Detailed Reason</Label>
                    <Textarea
                      id="resignation-details"
                      placeholder="Provide detailed reason for resignation..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notice-period">Notice Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select notice period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="60">60 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                        <SelectItem value="custom">Custom Period</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Resignation
                    </Button>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Pending Approvals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-amber-600" />
                          <span className="text-sm font-medium">
                            Priya Sharma
                          </span>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">
                            Amit Singh
                          </span>
                        </div>
                        <Badge variant="secondary">Under Review</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Recent Submissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">
                            Rajesh Kumar
                          </span>
                        </div>
                        <Badge variant="default">Approved</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium">
                            Neha Gupta
                          </span>
                        </div>
                        <Badge variant="destructive">Rejected</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Calendar} animation="float" />
                    Schedule Exit Interview
                  </CardTitle>
                  <CardDescription>
                    Plan and manage exit interview sessions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="interview-employee">Employee</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emp001">Rajesh Kumar</SelectItem>
                          <SelectItem value="emp002">Priya Sharma</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interviewer">Interviewer</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select interviewer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hr001">
                            Deepika Rao (HR Manager)
                          </SelectItem>
                          <SelectItem value="mgr001">
                            Suresh Patel (Team Lead)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interview-date">Interview Date</Label>
                      <Input type="datetime-local" id="interview-date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interview-mode">Interview Mode</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-person">In-Person</SelectItem>
                          <SelectItem value="video">Video Call</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interview-agenda">Interview Agenda</Label>
                    <Textarea
                      id="interview-agenda"
                      placeholder="Enter interview topics and agenda..."
                      rows={3}
                    />
                  </div>
                  <Button className="w-full">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Schedule Interview
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={FileCheck} animation="pulse" />
                    Exit Interview Questionnaire
                  </CardTitle>
                  <CardDescription>
                    Standardized questions for feedback collection
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium mb-2">
                        1. Overall Satisfaction
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Rate your overall experience working with the company
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium mb-2">
                        2. Reason for Leaving
                      </p>
                      <p className="text-xs text-muted-foreground">
                        What is the primary reason for your resignation?
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium mb-2">
                        3. Management Feedback
                      </p>
                      <p className="text-xs text-muted-foreground">
                        How would you rate the support from your manager?
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium mb-2">
                        4. Work Environment
                      </p>
                      <p className="text-xs text-muted-foreground">
                        How satisfied were you with the work environment?
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Customize Questions
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Scheduled Interviews</CardTitle>
                <CardDescription>
                  Upcoming and completed exit interview sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Interviewer</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Rajesh Kumar
                      </TableCell>
                      <TableCell>Deepika Rao</TableCell>
                      <TableCell>March 15, 2024 - 2:00 PM</TableCell>
                      <TableCell>In-Person</TableCell>
                      <TableCell>
                        <Badge>Scheduled</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <FileText className="mr-1 h-3 w-3" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Priya Sharma
                      </TableCell>
                      <TableCell>Suresh Patel</TableCell>
                      <TableCell>March 12, 2024 - 10:30 AM</TableCell>
                      <TableCell>Video Call</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Completed</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Clock} animation="glow" />
                    Notice Period Timeline
                  </CardTitle>
                  <CardDescription>
                    Track employee notice periods and important milestones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-blue-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Rajesh Kumar</span>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Notice Period Progress</span>
                          <span>18/30 days</span>
                        </div>
                        <Progress value={60} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Last working day: March 30, 2024
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-amber-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-amber-600" />
                          <span className="font-medium">Priya Sharma</span>
                        </div>
                        <Badge variant="secondary">Pending Approval</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Awaiting Manager Approval</span>
                          <span>2 days</span>
                        </div>
                        <Progress value={0} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Submitted: March 10, 2024
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-green-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Amit Singh</span>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Notice Period Completed</span>
                          <span>60/60 days</span>
                        </div>
                        <Progress value={100} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Last working day: March 8, 2024
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Bell className="mr-2 h-4 w-4" />
                    Set Reminder Alerts
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Notice Period Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active Notices</span>
                        <Badge>8</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending Approvals</span>
                        <Badge variant="secondary">3</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Expiring This Week</span>
                        <Badge variant="destructive">2</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Completed This Month</span>
                        <Badge variant="outline">12</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Key Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Knowledge Transfer</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span>Asset Return</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Clearance Complete</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Final Settlement</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="clearance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={CheckSquare} animation="bounce" />
                    Clearance Checklist
                  </CardTitle>
                  <CardDescription>
                    Track department-wise clearance status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">IT Department</p>
                          <p className="text-sm text-muted-foreground">
                            Laptop, access cards returned
                          </p>
                        </div>
                      </div>
                      <Badge variant="default">Cleared</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium">Finance Department</p>
                          <p className="text-sm text-muted-foreground">
                            Pending advance clearance
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">HR Department</p>
                          <p className="text-sm text-muted-foreground">
                            Exit interview completed
                          </p>
                        </div>
                      </div>
                      <Badge variant="default">Cleared</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium">Project Manager</p>
                          <p className="text-sm text-muted-foreground">
                            Knowledge transfer in progress
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium">Admin Department</p>
                          <p className="text-sm text-muted-foreground">
                            Parking card not returned
                          </p>
                        </div>
                      </div>
                      <Badge variant="destructive">Blocked</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm text-muted-foreground">
                      3/5 Cleared
                    </span>
                  </div>
                  <Progress value={60} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Users} animation="float" />
                    Approval Workflow
                  </CardTitle>
                  <CardDescription>
                    Multi-level approval process tracking
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg bg-blue-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          Level 1: Direct Manager
                        </span>
                        <Badge>Approved</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Suresh Patel - Approved on March 8, 2024
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg bg-amber-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          Level 2: Department Head
                        </span>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Waiting for approval from Deepika Rao
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          Level 3: HR Director
                        </span>
                        <Badge variant="outline">Waiting</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pending previous level approval
                      </p>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Send className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Asset Return Tracking</CardTitle>
                <CardDescription>
                  Company assets allocated to departing employees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset Type</TableHead>
                      <TableHead>Asset ID</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Return Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verified By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Laptop</TableCell>
                      <TableCell>LP-2024-001</TableCell>
                      <TableCell>Good</TableCell>
                      <TableCell>March 8, 2024</TableCell>
                      <TableCell>
                        <Badge>Returned</Badge>
                      </TableCell>
                      <TableCell>IT Admin</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mobile Phone</TableCell>
                      <TableCell>MP-2024-015</TableCell>
                      <TableCell>Excellent</TableCell>
                      <TableCell>March 8, 2024</TableCell>
                      <TableCell>
                        <Badge>Returned</Badge>
                      </TableCell>
                      <TableCell>IT Admin</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Access Card</TableCell>
                      <TableCell>AC-2024-125</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>March 8, 2024</TableCell>
                      <TableCell>
                        <Badge>Returned</Badge>
                      </TableCell>
                      <TableCell>Security</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Parking Card</TableCell>
                      <TableCell>PC-2024-089</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Pending</Badge>
                      </TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settlement" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Calculator} animation="pulse" />
                    Final Settlement Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate final dues and payouts for departing employees
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="p-4 border rounded-lg bg-green-50">
                      <h4 className="font-medium text-green-800 mb-2">
                        Earnings
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Basic Salary (Prorated)</span>
                          <span>₹45,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Leave Encashment</span>
                          <span>₹12,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Performance Bonus</span>
                          <span>₹8,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Notice Period Recovery</span>
                          <span>₹0</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Total Earnings</span>
                          <span>₹65,500</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-red-50">
                      <h4 className="font-medium text-red-800 mb-2">
                        Deductions
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Professional Tax</span>
                          <span>₹200</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Advance Recovery</span>
                          <span>₹5,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Loan EMI</span>
                          <span>₹3,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other Deductions</span>
                          <span>₹0</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Total Deductions</span>
                          <span>₹8,700</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">
                          Net Payable
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          ₹56,800
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Generate Settlement Letter
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-account">Bank Account</Label>
                      <Input
                        id="bank-account"
                        value="HDFC Bank - ****6789"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-mode">Payment Mode</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank-transfer">
                            Bank Transfer
                          </SelectItem>
                          <SelectItem value="cheque">Cheque</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-date">Payment Date</Label>
                      <Input type="date" id="payment-date" />
                    </div>
                    <Button className="w-full" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Process Payment
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Settlement Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Calculation</span>
                        <Badge>Completed</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Approval</span>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Payment</span>
                        <Badge variant="outline">Not Started</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Documentation</span>
                        <Badge variant="outline">Not Started</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Settlements</CardTitle>
                <CardDescription>
                  Recently processed final settlements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Settlement Amount</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Amit Singh</TableCell>
                      <TableCell>Engineering</TableCell>
                      <TableCell>₹1,24,500</TableCell>
                      <TableCell>March 8, 2024</TableCell>
                      <TableCell>
                        <Badge>Completed</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Neha Gupta</TableCell>
                      <TableCell>Marketing</TableCell>
                      <TableCell>₹89,200</TableCell>
                      <TableCell>March 5, 2024</TableCell>
                      <TableCell>
                        <Badge>Completed</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Rajesh Kumar
                      </TableCell>
                      <TableCell>Sales</TableCell>
                      <TableCell>₹56,800</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Processing</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Info className="mr-1 h-3 w-3" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
