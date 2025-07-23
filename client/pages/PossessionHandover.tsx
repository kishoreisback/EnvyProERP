import React, { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import {
  AnimatedIcon,
  GlowingOrb,
  ShimmerEffect,
} from "../components/ui/animated-icons";
import {
  Home,
  Key,
  ClipboardCheck,
  FileText,
  Mail,
  Wrench,
  Plus,
  ArrowLeft,
  Users,
  Calendar,
  DollarSign,
  Star,
  AlertTriangle,
  CheckCircle,
  Camera,
  Phone,
  Package,
  Shield,
  BarChart3,
  TrendingUp,
  MessageSquare,
  Settings,
  Link as LinkIcon,
  Zap,
  MapPin,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PossessionDashboard } from "../components/crm/possession/PossessionDashboard";
import { PossessionUnit } from "../components/crm/possession/types";

export default function PossessionHandover() {
  const [selectedUnit, setSelectedUnit] = useState<PossessionUnit | null>(null);
  const [showUnitDetails, setShowUnitDetails] = useState(false);
  const [showNewPossession, setShowNewPossession] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [newPossessionData, setNewPossessionData] = useState({
    projectName: "",
    unitNumber: "",
    unitType: "",
    floor: "",
    area: "",
    facing: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    totalAmount: "",
    scheduledDate: "",
  });

  const handleUnitSelect = (unit: PossessionUnit) => {
    setSelectedUnit(unit);
    setShowUnitDetails(true);
  };

  const handleCloseDetails = () => {
    setShowUnitDetails(false);
    setSelectedUnit(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "possession_completed":
        return "text-green-600";
      case "handover_in_progress":
        return "text-blue-600";
      case "inspection_completed":
        return "text-purple-600";
      case "dues_clearance":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="flex items-center gap-4 animate-slideInLeft">
          <Button variant="outline" className="hover-lift" asChild>
            <Link to="/crm/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to CRM
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Possession & Handover
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Home}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Complete possession workflow from dues clearance to handover and
                maintenance
              </p>
            </div>
          </div>
          <Button
            className="hover-lift animate-gradient bg-gradient-to-r from-primary to-blue-600 relative overflow-hidden animate-slideInRight"
            onClick={() => setShowNewPossession(true)}
          >
            <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
            New Possession
            <ShimmerEffect className="absolute inset-0" />
          </Button>
        </div>

        {/* Key Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="hover-lift animate-fadeInUp">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Dues Clearance</h3>
                  <p className="text-sm text-muted-foreground">
                    Final payments
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                  <ClipboardCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Inspection</h3>
                  <p className="text-sm text-muted-foreground">
                    Quality checks
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                  <Key className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Handover</h3>
                  <p className="text-sm text-muted-foreground">Key delivery</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                  <Mail className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Communication</h3>
                  <p className="text-sm text-muted-foreground">
                    Welcome messages
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900">
                  <Wrench className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Maintenance</h3>
                  <p className="text-sm text-muted-foreground">
                    Defect liability
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <PossessionDashboard onUnitSelect={handleUnitSelect} />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Analytics & Reporting
                  </CardTitle>
                  <CardDescription>
                    Comprehensive insights into possession workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Completion Trends */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Completion Trends
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>This Month</span>
                            <div className="flex items-center gap-2">
                              <Progress value={75} className="w-20 h-2" />
                              <span className="text-sm font-medium">75%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Last Month</span>
                            <div className="flex items-center gap-2">
                              <Progress value={68} className="w-20 h-2" />
                              <span className="text-sm font-medium">68%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>3 Months Ago</span>
                            <div className="flex items-center gap-2">
                              <Progress value={85} className="w-20 h-2" />
                              <span className="text-sm font-medium">85%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Revenue Analytics */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Revenue Collection
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>Total Collected</span>
                            <span className="font-bold text-green-600">
                              ₹12.5 Cr
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Pending Collection</span>
                            <span className="font-bold text-orange-600">
                              ₹2.3 Cr
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Collection Rate</span>
                            <span className="font-bold">84.5%</span>
                          </div>
                          <Progress value={84.5} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Metrics */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Performance Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3 grid-cols-2">
                          <div className="text-center p-3 bg-muted/50 rounded">
                            <p className="text-2xl font-bold text-blue-600">
                              28
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Avg. Days
                            </p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded">
                            <p className="text-2xl font-bold text-green-600">
                              92%
                            </p>
                            <p className="text-sm text-muted-foreground">
                              On-Time
                            </p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded">
                            <p className="text-2xl font-bold text-purple-600">
                              8.7
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Satisfaction
                            </p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded">
                            <p className="text-2xl font-bold text-orange-600">
                              3
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Defects/Unit
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Customer Satisfaction */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Customer Satisfaction Breakdown
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { label: "Construction Quality", score: 8.5 },
                            { label: "Timely Delivery", score: 9.2 },
                            { label: "Documentation", score: 8.8 },
                            { label: "Customer Service", score: 9.0 },
                            { label: "Overall Experience", score: 8.7 },
                          ].map((item, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{item.label}</span>
                                <span className="font-medium">
                                  {item.score}/10
                                </span>
                              </div>
                              <Progress
                                value={item.score * 10}
                                className="h-2"
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workflow">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Workflow Progress Tracking
                  </CardTitle>
                  <CardDescription>
                    Track workflow stages and bottlenecks across all units
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Workflow Stage Overview */}
                    <div className="grid gap-4 md:grid-cols-4">
                      {[
                        {
                          stage: "Payment Pending",
                          count: 5,
                          color: "bg-red-100 text-red-700",
                        },
                        {
                          stage: "Inspection",
                          count: 8,
                          color: "bg-blue-100 text-blue-700",
                        },
                        {
                          stage: "Handover",
                          count: 12,
                          color: "bg-purple-100 text-purple-700",
                        },
                        {
                          stage: "Completed",
                          count: 25,
                          color: "bg-green-100 text-green-700",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="text-center p-4 border rounded-lg"
                        >
                          <div
                            className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${item.color} mb-2`}
                          >
                            <span className="text-lg font-bold">
                              {item.count}
                            </span>
                          </div>
                          <h3 className="font-medium">{item.stage}</h3>
                          <p className="text-sm text-muted-foreground">Units</p>
                        </div>
                      ))}
                    </div>

                    {/* Workflow Timeline */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Standard Workflow Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              stage: "Payment Clearance",
                              duration: "3-5 days",
                              status: "active",
                            },
                            {
                              stage: "Inspection Scheduling",
                              duration: "2-3 days",
                              status: "completed",
                            },
                            {
                              stage: "Unit Inspection",
                              duration: "1 day",
                              status: "completed",
                            },
                            {
                              stage: "Document Preparation",
                              duration: "5-7 days",
                              status: "pending",
                            },
                            {
                              stage: "Handover Process",
                              duration: "1 day",
                              status: "pending",
                            },
                            {
                              stage: "Welcome Communication",
                              duration: "1 day",
                              status: "pending",
                            },
                            {
                              stage: "Defect Liability Period",
                              duration: "12 months",
                              status: "future",
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-3 border rounded-lg"
                            >
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  item.status === "completed"
                                    ? "bg-green-500"
                                    : item.status === "active"
                                      ? "bg-blue-500"
                                      : item.status === "pending"
                                        ? "bg-orange-500"
                                        : "bg-gray-300"
                                }`}
                              />
                              <div className="flex-1">
                                <p className="font-medium">{item.stage}</p>
                                <p className="text-sm text-muted-foreground">
                                  Duration: {item.duration}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  item.status === "completed"
                                    ? "default"
                                    : item.status === "active"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {item.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Customer Feedback System
                  </CardTitle>
                  <CardDescription>
                    Collect and analyze customer feedback throughout the
                    possession process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Feedback */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Recent Customer Feedback
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              unit: "A-1201",
                              customer: "Rajesh Kumar",
                              rating: 9,
                              comment:
                                "Excellent service and quality construction. Very happy with the handover process.",
                              date: "2 days ago",
                            },
                            {
                              unit: "B-504",
                              customer: "Priya Sharma",
                              rating: 8,
                              comment:
                                "Good overall experience, minor delays in documentation but resolved quickly.",
                              date: "1 week ago",
                            },
                            {
                              unit: "C-802",
                              customer: "Amit Singh",
                              rating: 7,
                              comment:
                                "Construction quality is good but some finishing work needed improvement.",
                              date: "2 weeks ago",
                            },
                          ].map((feedback, index) => (
                            <div
                              key={index}
                              className="p-3 border rounded-lg space-y-2"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">
                                    {feedback.customer}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Unit {feedback.unit}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span className="font-medium">
                                    {feedback.rating}/10
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm">{feedback.comment}</p>
                              <p className="text-xs text-muted-foreground">
                                {feedback.date}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Feedback Analytics */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Feedback Analytics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <p className="text-3xl font-bold text-green-600">
                              8.7
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Average Rating
                            </p>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span>Response Rate</span>
                              <span className="font-medium">87%</span>
                            </div>
                            <Progress value={87} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span>Positive Feedback</span>
                              <span className="font-medium">92%</span>
                            </div>
                            <Progress value={92} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span>Recommend to Friends</span>
                              <span className="font-medium">89%</span>
                            </div>
                            <Progress value={89} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Feedback Categories */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Feedback by Category
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        {[
                          {
                            category: "Construction Quality",
                            positive: 85,
                            neutral: 12,
                            negative: 3,
                          },
                          {
                            category: "Customer Service",
                            positive: 92,
                            neutral: 6,
                            negative: 2,
                          },
                          {
                            category: "Timely Delivery",
                            positive: 78,
                            neutral: 15,
                            negative: 7,
                          },
                        ].map((cat, index) => (
                          <div key={index} className="space-y-3">
                            <h4 className="font-medium">{cat.category}</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-green-600">Positive</span>
                                <span>{cat.positive}%</span>
                              </div>
                              <Progress value={cat.positive} className="h-2" />
                              <div className="flex justify-between text-sm">
                                <span className="text-yellow-600">Neutral</span>
                                <span>{cat.neutral}%</span>
                              </div>
                              <Progress value={cat.neutral} className="h-2" />
                              <div className="flex justify-between text-sm">
                                <span className="text-red-600">Negative</span>
                                <span>{cat.negative}%</span>
                              </div>
                              <Progress value={cat.negative} className="h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integrations">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    Integration Points
                  </CardTitle>
                  <CardDescription>
                    Connected systems and automation workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Active Integrations */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Active Integrations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              name: "CRM System",
                              status: "Connected",
                              icon: Users,
                              color: "text-green-600",
                            },
                            {
                              name: "Finance Module",
                              status: "Connected",
                              icon: DollarSign,
                              color: "text-green-600",
                            },
                            {
                              name: "SMS Gateway",
                              status: "Connected",
                              icon: Phone,
                              color: "text-green-600",
                            },
                            {
                              name: "Email Service",
                              status: "Connected",
                              icon: Mail,
                              color: "text-green-600",
                            },
                            {
                              name: "Document Management",
                              status: "Connected",
                              icon: FileText,
                              color: "text-green-600",
                            },
                            {
                              name: "Project Management",
                              status: "Pending",
                              icon: Calendar,
                              color: "text-orange-600",
                            },
                          ].map((integration, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <integration.icon
                                  className={`h-5 w-5 ${integration.color}`}
                                />
                                <span className="font-medium">
                                  {integration.name}
                                </span>
                              </div>
                              <Badge
                                variant={
                                  integration.status === "Connected"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {integration.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Automation Workflows */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Automation Workflows
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              name: "Welcome Email Trigger",
                              description:
                                "Automatically send welcome email after handover completion",
                              status: "Active",
                              executions: 45,
                            },
                            {
                              name: "SMS Notifications",
                              description:
                                "Send SMS updates for inspection and handover scheduling",
                              status: "Active",
                              executions: 128,
                            },
                            {
                              name: "Document Generation",
                              description:
                                "Auto-generate handover certificates and clearance documents",
                              status: "Active",
                              executions: 67,
                            },
                            {
                              name: "Defect Reporting",
                              description:
                                "Create defect tickets in maintenance system automatically",
                              status: "Active",
                              executions: 23,
                            },
                          ].map((workflow, index) => (
                            <div
                              key={index}
                              className="p-3 border rounded-lg space-y-2"
                            >
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">{workflow.name}</h4>
                                <Badge variant="default">
                                  {workflow.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {workflow.description}
                              </p>
                              <div className="flex items-center gap-2 text-sm">
                                <Zap className="h-3 w-3 text-blue-600" />
                                <span>
                                  {workflow.executions} executions this month
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* API Endpoints */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">API Endpoints</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            {
                              endpoint: "/api/possession/units",
                              method: "GET",
                              description: "Fetch all possession units",
                            },
                            {
                              endpoint: "/api/possession/create",
                              method: "POST",
                              description: "Create new possession record",
                            },
                            {
                              endpoint: "/api/possession/update",
                              method: "PUT",
                              description: "Update possession status",
                            },
                            {
                              endpoint: "/api/inspection/schedule",
                              method: "POST",
                              description: "Schedule unit inspection",
                            },
                            {
                              endpoint: "/api/handover/complete",
                              method: "POST",
                              description: "Complete handover process",
                            },
                            {
                              endpoint: "/api/defects/report",
                              method: "POST",
                              description: "Report defect or issue",
                            },
                          ].map((api, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-muted/30 rounded"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {api.method}
                                  </Badge>
                                  <code className="text-sm font-mono">
                                    {api.endpoint}
                                  </code>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {api.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* External Services */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          External Services
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            {
                              name: "Google Maps API",
                              purpose: "Location services for units",
                              status: "Active",
                            },
                            {
                              name: "Twilio SMS",
                              purpose: "SMS notifications",
                              status: "Active",
                            },
                            {
                              name: "SendGrid Email",
                              purpose: "Email communications",
                              status: "Active",
                            },
                            {
                              name: "DocuSign",
                              purpose: "Digital signatures",
                              status: "Active",
                            },
                            {
                              name: "AWS S3",
                              purpose: "Document storage",
                              status: "Active",
                            },
                            {
                              name: "Salesforce",
                              purpose: "CRM data sync",
                              status: "Inactive",
                            },
                          ].map((service, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-lg"
                            >
                              <div>
                                <p className="font-medium">{service.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {service.purpose}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  service.status === "Active"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {service.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* New Possession Dialog */}
        <Dialog open={showNewPossession} onOpenChange={setShowNewPossession}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Possession Unit
              </DialogTitle>
              <DialogDescription>
                Create a new possession record for a unit
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    value={newPossessionData.projectName}
                    onChange={(e) =>
                      setNewPossessionData((prev) => ({
                        ...prev,
                        projectName: e.target.value,
                      }))
                    }
                    placeholder="Enter project name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitNumber">Unit Number</Label>
                  <Input
                    id="unitNumber"
                    value={newPossessionData.unitNumber}
                    onChange={(e) =>
                      setNewPossessionData((prev) => ({
                        ...prev,
                        unitNumber: e.target.value,
                      }))
                    }
                    placeholder="e.g., A-1201"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitType">Unit Type</Label>
                  <Select
                    value={newPossessionData.unitType}
                    onValueChange={(value) =>
                      setNewPossessionData((prev) => ({
                        ...prev,
                        unitType: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1BHK">1BHK</SelectItem>
                      <SelectItem value="2BHK">2BHK</SelectItem>
                      <SelectItem value="3BHK">3BHK</SelectItem>
                      <SelectItem value="4BHK">4BHK</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Penthouse">Penthouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor">Floor</Label>
                  <Input
                    id="floor"
                    type="number"
                    value={newPossessionData.floor}
                    onChange={(e) =>
                      setNewPossessionData((prev) => ({
                        ...prev,
                        floor: e.target.value,
                      }))
                    }
                    placeholder="Floor number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq ft)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={newPossessionData.area}
                    onChange={(e) =>
                      setNewPossessionData((prev) => ({
                        ...prev,
                        area: e.target.value,
                      }))
                    }
                    placeholder="Built-up area"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facing">Facing</Label>
                  <Select
                    value={newPossessionData.facing}
                    onValueChange={(value) =>
                      setNewPossessionData((prev) => ({
                        ...prev,
                        facing: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select facing direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="North">North</SelectItem>
                      <SelectItem value="South">South</SelectItem>
                      <SelectItem value="East">East</SelectItem>
                      <SelectItem value="West">West</SelectItem>
                      <SelectItem value="North-East">North-East</SelectItem>
                      <SelectItem value="North-West">North-West</SelectItem>
                      <SelectItem value="South-East">South-East</SelectItem>
                      <SelectItem value="South-West">South-West</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Customer Information</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      value={newPossessionData.customerName}
                      onChange={(e) =>
                        setNewPossessionData((prev) => ({
                          ...prev,
                          customerName: e.target.value,
                        }))
                      }
                      placeholder="Full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={newPossessionData.customerEmail}
                      onChange={(e) =>
                        setNewPossessionData((prev) => ({
                          ...prev,
                          customerEmail: e.target.value,
                        }))
                      }
                      placeholder="customer@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Phone Number</Label>
                    <Input
                      id="customerPhone"
                      value={newPossessionData.customerPhone}
                      onChange={(e) =>
                        setNewPossessionData((prev) => ({
                          ...prev,
                          customerPhone: e.target.value,
                        }))
                      }
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalAmount">Total Amount</Label>
                    <Input
                      id="totalAmount"
                      type="number"
                      value={newPossessionData.totalAmount}
                      onChange={(e) =>
                        setNewPossessionData((prev) => ({
                          ...prev,
                          totalAmount: e.target.value,
                        }))
                      }
                      placeholder="Total unit amount"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduledDate">Scheduled Possession Date</Label>
                <Input
                  id="scheduledDate"
                  type="date"
                  value={newPossessionData.scheduledDate}
                  onChange={(e) =>
                    setNewPossessionData((prev) => ({
                      ...prev,
                      scheduledDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowNewPossession(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Here you would typically save the data
                    console.log("Creating new possession:", newPossessionData);
                    setShowNewPossession(false);
                    // Reset form
                    setNewPossessionData({
                      projectName: "",
                      unitNumber: "",
                      unitType: "",
                      floor: "",
                      area: "",
                      facing: "",
                      customerName: "",
                      customerEmail: "",
                      customerPhone: "",
                      totalAmount: "",
                      scheduledDate: "",
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Possession
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Unit Details Modal */}
        <Dialog open={showUnitDetails} onOpenChange={handleCloseDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Unit Details - {selectedUnit?.unitNumber}
              </DialogTitle>
              <DialogDescription>
                Complete possession workflow details for{" "}
                {selectedUnit?.projectName}
              </DialogDescription>
            </DialogHeader>
            {selectedUnit && (
              <div className="space-y-6">
                {/* Unit Overview */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Unit Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Unit Number:
                        </span>
                        <span className="font-medium">
                          {selectedUnit.unitNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Project:
                        </span>
                        <span className="font-medium">
                          {selectedUnit.projectName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Type:
                        </span>
                        <span className="font-medium">
                          {selectedUnit.unitType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Area:
                        </span>
                        <span className="font-medium">
                          {selectedUnit.area} sq ft
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Floor:
                        </span>
                        <span className="font-medium">
                          {selectedUnit.floor}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Facing:
                        </span>
                        <span className="font-medium">
                          {selectedUnit.facing}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Customer Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Name:
                        </span>
                        <span className="font-medium">
                          {selectedUnit.customer.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Email:
                        </span>
                        <span className="font-medium">
                          {selectedUnit.customer.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Phone:
                        </span>
                        <span className="font-medium">
                          {selectedUnit.customer.phone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Total Amount:
                        </span>
                        <span className="font-medium">
                          ₹
                          {(selectedUnit.customer.totalAmount / 100000).toFixed(
                            1,
                          )}
                          L
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Paid Amount:
                        </span>
                        <span className="font-medium text-green-600">
                          ₹
                          {(selectedUnit.customer.paidAmount / 100000).toFixed(
                            1,
                          )}
                          L
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Balance:
                        </span>
                        <span className="font-medium text-orange-600">
                          ₹
                          {(
                            selectedUnit.customer.balanceAmount / 100000
                          ).toFixed(1)}
                          L
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Workflow Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Workflow Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="text-center p-4 border rounded-lg">
                        <DollarSign
                          className={`h-8 w-8 mx-auto mb-2 ${
                            selectedUnit.finalDues.status === "cleared"
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        />
                        <h4 className="font-medium">Dues Clearance</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {selectedUnit.finalDues.status}
                        </p>
                        {selectedUnit.finalDues.status === "cleared" && (
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto mt-1" />
                        )}
                      </div>

                      <div className="text-center p-4 border rounded-lg">
                        <Camera
                          className={`h-8 w-8 mx-auto mb-2 ${
                            selectedUnit.inspection.status === "completed"
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        />
                        <h4 className="font-medium">Inspection</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {selectedUnit.inspection.status.replace(/_/g, " ")}
                        </p>
                        {selectedUnit.inspection.status === "completed" && (
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto mt-1" />
                        )}
                      </div>

                      <div className="text-center p-4 border rounded-lg">
                        <Key
                          className={`h-8 w-8 mx-auto mb-2 ${
                            selectedUnit.handover.status === "completed"
                              ? "text-green-600"
                              : "text-purple-600"
                          }`}
                        />
                        <h4 className="font-medium">Handover</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {selectedUnit.handover.status.replace(/_/g, " ")}
                        </p>
                        {selectedUnit.handover.status === "completed" && (
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto mt-1" />
                        )}
                      </div>

                      <div className="text-center p-4 border rounded-lg">
                        <Wrench
                          className={`h-8 w-8 mx-auto mb-2 ${
                            selectedUnit.defectLiability.defectReports
                              .length === 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        />
                        <h4 className="font-medium">Maintenance</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedUnit.defectLiability.defectReports.length}{" "}
                          defects
                        </p>
                        {selectedUnit.defectLiability.defectReports.length ===
                          0 && (
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto mt-1" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Feedback */}
                {selectedUnit.handover.customerFeedback && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Customer Feedback
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">
                              Overall Satisfaction:
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium">
                                {
                                  selectedUnit.handover.customerFeedback
                                    .overallSatisfaction
                                }
                                /10
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">
                              Construction Quality:
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium">
                                {
                                  selectedUnit.handover.customerFeedback
                                    .constructionQuality
                                }
                                /10
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Timely Delivery:</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium">
                                {
                                  selectedUnit.handover.customerFeedback
                                    .timelyDelivery
                                }
                                /10
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Comments:</h4>
                          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                            "{selectedUnit.handover.customerFeedback.comments}"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleCloseDetails}>
                    Close
                  </Button>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Implementation Notes */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Complete Possession Workflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Workflow Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>Final Dues Clearance:</strong> Payment tracking
                    and certificate generation
                  </li>
                  <li>
                    • <strong>Flat Inspection:</strong> Digital checklist with
                    photo documentation
                  </li>
                  <li>
                    • <strong>Handover Process:</strong> Document generation and
                    key delivery
                  </li>
                  <li>
                    • <strong>Welcome Communication:</strong> Automated
                    email/SMS triggers
                  </li>
                  <li>
                    • <strong>Defect Liability:</strong> 12-month maintenance
                    and warranty tracking
                  </li>
                  <li>
                    • <strong>Customer Feedback:</strong> Satisfaction surveys
                    and ratings
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Integration Points</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• CRM lead management and customer data</li>
                  <li>• Finance module for payment tracking</li>
                  <li>• Document management for certificates</li>
                  <li>• Communication integrations (SMS/Email)</li>
                  <li>• Project management for timeline tracking</li>
                  <li>• Maintenance scheduling and defect reporting</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
