import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Pause,
  RefreshCw,
  Settings,
  Eye,
  Edit,
  Package,
  Building2,
  Target,
  Zap,
  BarChart3,
  Users,
  ShoppingCart,
  Database,
  Plug,
  Shield,
  Award,
  Calendar,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import {
  mockSetupDashboard,
  mockFranchiseeSetups,
  mockFranchiseTypes,
  mockProductCategories,
  mockSetupTemplates,
  mockApprovedRequests,
  mockSetupSteps,
  getFranchiseeSetupById,
  getSetupsByStatus,
  getSetupProgress,
  getEstimatedCompletion,
  validateSetupConfiguration,
  calculateSetupCost,
  getTemplateById,
  getTemplatesByFranchiseType,
  createSetupFromTemplate,
  generateFranchiseeCode,
} from "./setup-data";
import {
  FranchiseeSetup,
  FranchiseType,
  SetupStep,
  FranchiseeSetupForm,
  PricingConfiguration,
  FranchiseeProductCatalog,
  SetupTemplate,
  NewSetupForm,
  CreateTemplateForm,
} from "./setup-types";

interface FranchiseeSetupDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function FranchiseeSetupDashboard({
  currentTab = "dashboard",
  onTabChange,
}: FranchiseeSetupDashboardProps) {
  const [activeTab, setActiveTab] = useState(currentTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSetup, setSelectedSetup] = useState<FranchiseeSetup | null>(
    null,
  );
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showNewSetupModal, setShowNewSetupModal] = useState(false);
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [newSetupForm, setNewSetupForm] = useState<any>({});
  const [createTemplateForm, setCreateTemplateForm] = useState<any>({});

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
  };

  // Filtered setups based on search
  const filteredSetups = useMemo(() => {
    return mockFranchiseeSetups.filter(
      (setup) =>
        setup.businessConfig.businessName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        setup.franchiseeCode
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        setup.franchiseType.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-gray-100 text-gray-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStepStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-gray-100 text-gray-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      skipped: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  const handleSetupAction = (action: string, setup: FranchiseeSetup) => {
    setSelectedSetup(setup);
    switch (action) {
      case "view":
        setShowSetupModal(true);
        break;
      case "configure":
        setShowConfigModal(true);
        break;
      case "pricing":
        setShowPricingModal(true);
        break;
      case "catalog":
        setShowCatalogModal(true);
        break;
      case "start":
        console.log("Starting setup:", setup.id);
        // Handle setup start
        break;
      case "pause":
        console.log("Pausing setup:", setup.id);
        // Handle setup pause
        break;
      case "retry":
        console.log("Retrying setup:", setup.id);
        // Handle setup retry
        break;
    }
  };

  const getSetupIcon = (type: string) => {
    switch (type) {
      case "distribution":
        return <Package className="h-5 w-5" />;
      case "retail":
        return <ShoppingCart className="h-5 w-5" />;
      case "warehouse":
        return <Database className="h-5 w-5" />;
      case "hybrid":
        return <Building2 className="h-5 w-5" />;
      default:
        return <Building2 className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="h-8 w-8 text-blue-600" />
            Franchisee Setup Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Post-approval setup and configuration of franchisee operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Status
          </Button>
          <Button onClick={() => setShowNewSetupModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Setup
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Setups
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={mockSetupDashboard.pendingSetups} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <AlertTriangle className="h-3 w-3 text-orange-600" />
              <span className="text-orange-600">Awaiting start</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Play className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={mockSetupDashboard.inProgressSetups} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-blue-600" />
              <span className="text-blue-600">Active setups</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={mockSetupDashboard.completedSetups} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Award className="h-3 w-3 text-green-600" />
              <span className="text-green-600">
                Success rate: {mockSetupDashboard.setupMetrics.successRate}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={mockSetupDashboard.failedSetups} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <RefreshCw className="h-3 w-3 text-red-600" />
              <span className="text-red-600">Need retry</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Setup Time
            </CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={Math.round(mockSetupDashboard.averageSetupTime / 60)}
                suffix="h"
              />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-green-600">-15min from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="setups">Active Setups</TabsTrigger>
          <TabsTrigger value="configurations">Configurations</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Setup Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Setup Progress Overview</CardTitle>
                <CardDescription>
                  Current setup status breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending</span>
                    <span className="font-medium">
                      {mockSetupDashboard.pendingSetups}
                    </span>
                  </div>
                  <Progress
                    value={(mockSetupDashboard.pendingSetups / 18) * 100}
                    className="h-2"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">In Progress</span>
                    <span className="font-medium">
                      {mockSetupDashboard.inProgressSetups}
                    </span>
                  </div>
                  <Progress
                    value={(mockSetupDashboard.inProgressSetups / 18) * 100}
                    className="h-2"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed</span>
                    <span className="font-medium text-green-600">
                      {mockSetupDashboard.completedSetups}
                    </span>
                  </div>
                  <Progress
                    value={(mockSetupDashboard.completedSetups / 18) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Setup quality and efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-medium">
                      {mockSetupDashboard.setupMetrics.successRate}%
                    </span>
                  </div>
                  <Progress
                    value={mockSetupDashboard.setupMetrics.successRate}
                    className="h-2"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Setup Time</span>
                    <span className="font-medium">
                      {Math.round(
                        mockSetupDashboard.setupMetrics.averageTime / 60,
                      )}
                      h {mockSetupDashboard.setupMetrics.averageTime % 60}m
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />

                  <div className="text-sm text-muted-foreground">
                    Target: 3 hours | Current:{" "}
                    {Math.round(
                      mockSetupDashboard.setupMetrics.averageTime / 60,
                    )}{" "}
                    hours
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Setups */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Setups</CardTitle>
              <CardDescription>
                Latest franchisee setup activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFranchiseeSetups.slice(0, 5).map((setup) => (
                  <div
                    key={setup.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                      {getSetupIcon(setup.franchiseType.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">
                          {setup.businessConfig.businessName}
                        </span>
                        <Badge variant="outline">{setup.franchiseeCode}</Badge>
                        <Badge className={getStatusColor(setup.setupStatus)}>
                          {setup.setupStatus.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Type: {setup.franchiseType.name}</span>
                        <span>
                          Progress: {Math.round(getSetupProgress(setup))}%
                        </span>
                        <span>ETA: {getEstimatedCompletion(setup)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={getSetupProgress(setup)}
                        className="w-20 h-2"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetupAction("view", setup)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Common Failures */}
          <Card>
            <CardHeader>
              <CardTitle>Common Failure Points</CardTitle>
              <CardDescription>Most frequent setup issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockSetupDashboard.setupMetrics.commonFailures.map(
                  (failure, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-red-50 rounded-lg"
                    >
                      <div>
                        <span className="font-medium text-red-800">
                          {failure.reason}
                        </span>
                        <p className="text-sm text-red-600">
                          {failure.count} occurrences
                        </p>
                      </div>
                      <Badge variant="destructive">{failure.percentage}%</Badge>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Setups Tab */}
        <TabsContent value="setups" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Active Setups</h2>
              <p className="text-muted-foreground">
                Monitor and manage ongoing setups
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search setups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Franchisee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Current Step</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSetups.map((setup) => {
                    const currentStep =
                      setup.setupSteps.find(
                        (s) => s.status === "in_progress",
                      ) || setup.setupSteps.find((s) => s.status === "pending");
                    return (
                      <TableRow key={setup.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {setup.businessConfig.businessName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {setup.franchiseeCode}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getSetupIcon(setup.franchiseType.type)}
                            <span>{setup.franchiseType.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(setup.setupStatus)}>
                            {setup.setupStatus.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={getSetupProgress(setup)}
                              className="w-16 h-2"
                            />
                            <span className="text-sm">
                              {Math.round(getSetupProgress(setup))}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {currentStep && (
                            <div>
                              <p className="text-sm font-medium">
                                {currentStep.name}
                              </p>
                              <Badge
                                className={getStepStatusColor(
                                  currentStep.status,
                                )}
                                variant="outline"
                              >
                                {currentStep.status}
                              </Badge>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {getEstimatedCompletion(setup)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">
                            {formatCurrency(calculateSetupCost(setup))}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSetupAction("view", setup)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {setup.setupStatus === "pending" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleSetupAction("start", setup)
                                }
                              >
                                <Play className="h-4 w-4 text-green-600" />
                              </Button>
                            )}
                            {setup.setupStatus === "in_progress" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleSetupAction("pause", setup)
                                }
                              >
                                <Pause className="h-4 w-4 text-orange-600" />
                              </Button>
                            )}
                            {setup.setupStatus === "failed" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleSetupAction("retry", setup)
                                }
                              >
                                <RefreshCw className="h-4 w-4 text-blue-600" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurations Tab */}
        <TabsContent value="configurations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Franchise Types */}
            <Card>
              <CardHeader>
                <CardTitle>Franchise Types</CardTitle>
                <CardDescription>Available franchise models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFranchiseTypes.map((type) => (
                    <Card key={type.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getSetupIcon(type.type)}
                            <div>
                              <p className="font-medium">{type.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {type.description}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">
                            {type.defaultMargins.defaultMargin}% margin
                          </Badge>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <Label className="text-xs font-medium text-gray-500">
                              INVESTMENT RANGE
                            </Label>
                            <p className="text-sm font-medium">
                              {formatCurrency(type.minInvestment)} -{" "}
                              {formatCurrency(type.maxInvestment)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-500">
                              ALLOWED REGIONS
                            </Label>
                            <p className="text-sm">
                              {type.allowedRegions.join(", ")}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 space-y-2">
                          <div>
                            <Label className="text-xs font-medium text-gray-500">
                              CAPABILITIES
                            </Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {type.capabilities.map((capability) => (
                                <Badge
                                  key={capability.id}
                                  variant={
                                    capability.isRequired
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {capability.name}
                                  {capability.isRequired && "*"}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-xs font-medium text-gray-500">
                              REQUIREMENTS
                            </Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {type.requirements.map((requirement) => (
                                <Badge
                                  key={requirement.id}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {requirement.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Available product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockProductCategories.map((category) => (
                    <div
                      key={category.categoryId}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{category.categoryName}</p>
                        <p className="text-sm text-muted-foreground">
                          Margin: {category.minMargin}% - {category.maxMargin}%
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {category.isExclusive && (
                          <Badge variant="secondary">Exclusive</Badge>
                        )}
                        <Badge
                          variant={category.isActive ? "default" : "outline"}
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Setup Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Setup Templates</CardTitle>
                <CardDescription>Pre-configured templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSetupTemplates.map((template) => (
                    <div key={template.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{template.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              template.difficulty === "easy"
                                ? "default"
                                : template.difficulty === "medium"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {template.difficulty}
                          </Badge>
                          <Badge variant="outline">v{template.version}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span>Used {template.usageCount} times</span>
                        <span>{template.estimatedSetupTime} min setup</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Setup Templates</h2>
              <p className="text-muted-foreground">
                Pre-configured setup templates for different franchise types
              </p>
            </div>
            <Button onClick={() => setShowCreateTemplateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockSetupTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getSetupIcon(template.franchiseType.type)}
                    {template.name}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Difficulty</Label>
                      <Badge
                        variant={
                          template.difficulty === "easy"
                            ? "default"
                            : template.difficulty === "medium"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {template.difficulty}
                      </Badge>
                    </div>
                    <div>
                      <Label>Estimated Time</Label>
                      <p className="font-medium">
                        {template.estimatedSetupTime} minutes
                      </p>
                    </div>
                    <div>
                      <Label>Usage Count</Label>
                      <p className="font-medium">{template.usageCount} times</p>
                    </div>
                    <div>
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {template.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.tags.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setCreateTemplateForm({
                            ...template,
                            basedOnTemplateId: template.id,
                          });
                          setShowCreateTemplateModal(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setNewSetupForm({
                            templateId: template.id,
                            franchiseTypeId: template.franchiseType.id,
                          });
                          setShowNewSetupModal(true);
                        }}
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Setup Time Analysis</CardTitle>
                <CardDescription>Performance by setup step</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSetupDashboard.setupMetrics.performanceByStep.map(
                    (step) => (
                      <div key={step.stepName} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {step.stepName}
                          </span>
                          <span className="text-sm font-medium">
                            {step.averageTime}min
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={step.successRate}
                            className="flex-1 h-2"
                          />
                          <span className="text-xs text-muted-foreground">
                            {step.successRate}%
                          </span>
                        </div>
                        {step.commonIssues.length > 0 && (
                          <div className="text-xs text-red-600">
                            Issues: {step.commonIssues.join(", ")}
                          </div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Setup Success Rate</CardTitle>
                <CardDescription>
                  Success rates by franchise type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFranchiseTypes.map((type, index) => (
                    <div key={type.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{type.name}</span>
                        <span className="text-sm font-medium">
                          {95 - index * 3}%
                        </span>
                      </div>
                      <Progress value={95 - index * 3} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Failure Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Failure Analysis</CardTitle>
              <CardDescription>
                Most common setup failure reasons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockSetupDashboard.setupMetrics.commonFailures.map(
                  (failure, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-red-600">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-red-800">
                            {failure.reason}
                          </p>
                          <p className="text-sm text-red-600">
                            {failure.count} occurrences
                          </p>
                        </div>
                      </div>
                      <Badge variant="destructive">{failure.percentage}%</Badge>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          {/* Setup Statistics */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Average Setup Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {Math.round(mockSetupDashboard.setupMetrics.averageTime / 60)}
                  h {mockSetupDashboard.setupMetrics.averageTime % 60}m
                </div>
                <p className="text-sm text-muted-foreground">Target: 3 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {mockSetupDashboard.setupMetrics.successRate}%
                </div>
                <p className="text-sm text-muted-foreground">Target: 95%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Setups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {mockSetupDashboard.pendingSetups +
                    mockSetupDashboard.inProgressSetups +
                    mockSetupDashboard.completedSetups +
                    mockSetupDashboard.failedSetups}
                </div>
                <p className="text-sm text-muted-foreground">All time</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Default Configuration</CardTitle>
                <CardDescription>Global setup defaults</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Default Franchisee Code Format</Label>
                    <Input defaultValue="{BusinessType}-{State}-{Sequence}" />
                  </div>
                  <div>
                    <Label>Setup Timeout (minutes)</Label>
                    <Input type="number" defaultValue="300" />
                  </div>
                  <div>
                    <Label>Auto-retry Failed Steps</Label>
                    <Select defaultValue="true">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Enabled</SelectItem>
                        <SelectItem value="false">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Setup completion notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Notify on Setup Start</Label>
                    <Select defaultValue="true">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Enabled</SelectItem>
                        <SelectItem value="false">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Notify on Setup Completion</Label>
                    <Select defaultValue="true">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Enabled</SelectItem>
                        <SelectItem value="false">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Notify on Setup Failure</Label>
                    <Select defaultValue="true">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Enabled</SelectItem>
                        <SelectItem value="false">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Setup Details Modal */}
      <Dialog open={showSetupModal} onOpenChange={setShowSetupModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Franchisee Setup Details</DialogTitle>
            <DialogDescription>
              Complete setup information and progress tracking
            </DialogDescription>
          </DialogHeader>
          {selectedSetup && (
            <div className="space-y-6">
              {/* Setup Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getSetupIcon(selectedSetup.franchiseType.type)}
                      {selectedSetup.businessConfig.businessName}
                    </div>
                    <Badge
                      className={getStatusColor(selectedSetup.setupStatus)}
                    >
                      {selectedSetup.setupStatus.replace("_", " ")}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Franchisee Code</Label>
                      <p className="font-medium mt-1">
                        {selectedSetup.franchiseeCode}
                      </p>
                    </div>
                    <div>
                      <Label>Franchise Type</Label>
                      <p className="font-medium mt-1">
                        {selectedSetup.franchiseType.name}
                      </p>
                    </div>
                    <div>
                      <Label>Setup Progress</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress
                          value={getSetupProgress(selectedSetup)}
                          className="flex-1 h-2"
                        />
                        <span className="text-sm font-medium">
                          {Math.round(getSetupProgress(selectedSetup))}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <Label>Estimated Completion</Label>
                      <p className="font-medium mt-1">
                        {getEstimatedCompletion(selectedSetup)}
                      </p>
                    </div>
                    <div>
                      <Label>Setup Cost</Label>
                      <p className="font-medium mt-1">
                        {formatCurrency(calculateSetupCost(selectedSetup))}
                      </p>
                    </div>
                    <div>
                      <Label>Created</Label>
                      <p className="font-medium mt-1">
                        {new Date(selectedSetup.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Setup Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Setup Steps</CardTitle>
                  <CardDescription>
                    Detailed progress of each setup step
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedSetup.setupSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className="flex items-center gap-4 p-4 border rounded-lg"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                          <span className="text-sm font-medium">
                            {step.order}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{step.name}</span>
                            <Badge className={getStepStatusColor(step.status)}>
                              {step.status.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                          {step.error && (
                            <p className="text-sm text-red-600 mt-1">
                              Error: {step.error}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm">
                            {step.actualTime
                              ? `${step.actualTime}min`
                              : `~${step.estimatedTime}min`}
                          </p>
                          {step.completedAt && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(step.completedAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Configuration Summary */}
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Config</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Type:</strong>{" "}
                        {selectedSetup.businessConfig.businessType}
                      </p>
                      <p>
                        <strong>Model:</strong>{" "}
                        {selectedSetup.businessConfig.operatingModel}
                      </p>
                      <p>
                        <strong>Service Areas:</strong>{" "}
                        {selectedSetup.businessConfig.serviceAreas.length}
                      </p>
                      <p>
                        <strong>Payment Methods:</strong>{" "}
                        {selectedSetup.businessConfig.paymentMethods.length}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Config</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Default Margin:</strong>{" "}
                        {selectedSetup.pricingConfig.marginConfig.defaultMargin}
                        %
                      </p>
                      <p>
                        <strong>Price Slabs:</strong>{" "}
                        {selectedSetup.pricingConfig.priceSlabs.length}
                      </p>
                      <p>
                        <strong>Category Margins:</strong>{" "}
                        {
                          selectedSetup.pricingConfig.marginConfig
                            .categoryMargins.length
                        }
                      </p>
                      <p>
                        <strong>Auto Update:</strong>{" "}
                        {selectedSetup.pricingConfig.autoUpdate ? "Yes" : "No"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Catalog</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Type:</strong>{" "}
                        {selectedSetup.productCatalog.catalogType}
                      </p>
                      <p>
                        <strong>Categories:</strong>{" "}
                        {selectedSetup.productCatalog.categories.length}
                      </p>
                      <p>
                        <strong>Products:</strong>{" "}
                        {selectedSetup.productCatalog.products.length}
                      </p>
                      <p>
                        <strong>Sync Status:</strong>{" "}
                        {selectedSetup.productCatalog.syncStatus}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Integration Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plug className="h-5 w-5" />
                    System Integrations
                  </CardTitle>
                  <CardDescription>
                    Integration status and configuration details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* POS Integration */}
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            selectedSetup.integrationSetup.posIntegration
                              .enabled
                              ? selectedSetup.integrationSetup.posIntegration
                                  .status === "connected"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                              : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className="font-medium">POS Integration</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedSetup.integrationSetup.posIntegration
                              .enabled
                              ? selectedSetup.integrationSetup.posIntegration
                                  .provider
                              : "Disabled"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          selectedSetup.integrationSetup.posIntegration
                            .status === "connected"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {selectedSetup.integrationSetup.posIntegration.status}
                      </Badge>
                    </div>

                    {/* Accounting Integration */}
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            selectedSetup.integrationSetup.accountingIntegration
                              .enabled
                              ? selectedSetup.integrationSetup
                                  .accountingIntegration.status === "connected"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                              : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className="font-medium">Accounting Integration</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedSetup.integrationSetup
                              .accountingIntegration.enabled
                              ? selectedSetup.integrationSetup
                                  .accountingIntegration.provider
                              : "Disabled"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          selectedSetup.integrationSetup.accountingIntegration
                            .status === "connected"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {
                          selectedSetup.integrationSetup.accountingIntegration
                            .status
                        }
                      </Badge>
                    </div>

                    {/* E-commerce Integration */}
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            selectedSetup.integrationSetup.ecommerceIntegration
                              .enabled
                              ? selectedSetup.integrationSetup
                                  .ecommerceIntegration.status === "connected"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                              : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className="font-medium">E-commerce Integration</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedSetup.integrationSetup.ecommerceIntegration
                              .enabled
                              ? `${selectedSetup.integrationSetup.ecommerceIntegration.platforms?.length || 0} platforms`
                              : "Disabled"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          selectedSetup.integrationSetup.ecommerceIntegration
                            .status === "connected"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {
                          selectedSetup.integrationSetup.ecommerceIntegration
                            .status
                        }
                      </Badge>
                    </div>

                    {/* Logistics Integration */}
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            selectedSetup.integrationSetup.logisticsIntegration
                              .enabled
                              ? selectedSetup.integrationSetup
                                  .logisticsIntegration.status === "connected"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                              : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className="font-medium">Logistics Integration</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedSetup.integrationSetup.logisticsIntegration
                              .enabled
                              ? selectedSetup.integrationSetup
                                  .logisticsIntegration.defaultProvider
                              : "Disabled"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          selectedSetup.integrationSetup.logisticsIntegration
                            .status === "connected"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {
                          selectedSetup.integrationSetup.logisticsIntegration
                            .status
                        }
                      </Badge>
                    </div>

                    {/* Payment Integration */}
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            selectedSetup.integrationSetup.paymentIntegration
                              .enabled
                              ? selectedSetup.integrationSetup
                                  .paymentIntegration.status === "connected"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                              : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className="font-medium">Payment Integration</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedSetup.integrationSetup.paymentIntegration
                              .enabled
                              ? selectedSetup.integrationSetup
                                  .paymentIntegration.defaultGateway
                              : "Disabled"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          selectedSetup.integrationSetup.paymentIntegration
                            .status === "connected"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {
                          selectedSetup.integrationSetup.paymentIntegration
                            .status
                        }
                      </Badge>
                    </div>

                    {/* Analytics Integration */}
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            selectedSetup.integrationSetup.analyticsIntegration
                              .enabled
                              ? selectedSetup.integrationSetup
                                  .analyticsIntegration.status === "connected"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                              : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className="font-medium">Analytics Integration</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedSetup.integrationSetup.analyticsIntegration
                              .enabled
                              ? `${selectedSetup.integrationSetup.analyticsIntegration.platforms?.length || 0} platforms`
                              : "Disabled"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          selectedSetup.integrationSetup.analyticsIntegration
                            .status === "connected"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {
                          selectedSetup.integrationSetup.analyticsIntegration
                            .status
                        }
                      </Badge>
                    </div>
                  </div>

                  {/* Integration Details for Enabled Services */}
                  {selectedSetup.integrationSetup.logisticsIntegration
                    .enabled && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 mb-2">
                        Logistics Providers:
                      </p>
                      {selectedSetup.integrationSetup.logisticsIntegration.providers?.map(
                        (provider, index) => (
                          <div key={index} className="text-sm text-blue-700">
                            • {provider.name}: {provider.services?.join(", ")} -
                            Coverage: {provider.coverageAreas?.join(", ")}
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {selectedSetup.integrationSetup.paymentIntegration
                    .enabled && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800 mb-2">
                        Payment Gateways:
                      </p>
                      {selectedSetup.integrationSetup.paymentIntegration.gateways?.map(
                        (gateway, index) => (
                          <div key={index} className="text-sm text-green-700">
                            • {gateway.name}:{" "}
                            {gateway.supportedMethods?.join(", ")} - Fee:{" "}
                            {gateway.charges?.transactionFee}%
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Detailed Business Operations */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Operating Hours & Service Areas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Business Operations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Operating Hours
                        </Label>
                        <div className="mt-2 space-y-1">
                          {Object.entries(
                            selectedSetup.businessConfig.operatingHours,
                          ).map(([day, hours]) => (
                            <div
                              key={day}
                              className="flex justify-between text-sm"
                            >
                              <span className="capitalize">{day}:</span>
                              <span
                                className={
                                  hours.isOpen
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {hours.isOpen
                                  ? `${hours.openTime} - ${hours.closeTime}`
                                  : "Closed"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-sm font-medium">
                          Service Areas
                        </Label>
                        <div className="mt-2 space-y-2">
                          {selectedSetup.businessConfig.serviceAreas.map(
                            (area) => (
                              <div
                                key={area.id}
                                className="p-2 bg-blue-50 rounded-lg"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-blue-800">
                                    {area.name}
                                  </span>
                                  <Badge
                                    variant={
                                      area.isActive ? "default" : "secondary"
                                    }
                                  >
                                    {area.isActive ? "Active" : "Inactive"}
                                  </Badge>
                                </div>
                                <p className="text-sm text-blue-600 mt-1">
                                  Coverage: {area.coverage.join(", ")}
                                </p>
                                <div className="text-xs text-blue-500 mt-1">
                                  {area.deliveryCharges.map((charge, idx) => (
                                    <span key={idx}>
                                      {charge.distanceFrom}-{charge.distanceTo}
                                      km: ₹{charge.charge}
                                      {charge.freeDeliveryThreshold &&
                                        ` (Free above ₹${charge.freeDeliveryThreshold})`}
                                      {idx < area.deliveryCharges.length - 1 &&
                                        " | "}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment & Delivery Options */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Payment & Delivery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Payment Methods
                        </Label>
                        <div className="mt-2 space-y-2">
                          {selectedSetup.businessConfig.paymentMethods.map(
                            (method) => (
                              <div
                                key={method.id}
                                className="flex items-center justify-between p-2 border rounded-lg"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${method.isActive ? "bg-green-500" : "bg-gray-300"}`}
                                  />
                                  <span className="font-medium capitalize">
                                    {method.type}
                                  </span>
                                  {method.provider && (
                                    <span className="text-sm text-gray-500">
                                      ({method.provider})
                                    </span>
                                  )}
                                </div>
                                <div className="text-right text-sm">
                                  <div>Charges: {method.charges}%</div>
                                  <div className="text-gray-500">
                                    {method.processingTime}
                                  </div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-sm font-medium">
                          Delivery Options
                        </Label>
                        <div className="mt-2 space-y-2">
                          {selectedSetup.businessConfig.deliveryOptions.map(
                            (option) => (
                              <div
                                key={option.id}
                                className="flex items-center justify-between p-2 border rounded-lg"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-2 h-2 rounded-full ${option.isActive ? "bg-green-500" : "bg-gray-300"}`}
                                    />
                                    <span className="font-medium">
                                      {option.name}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {option.deliveryTime}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">
                                    ₹{option.charges}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {option.applicableAreas.join(", ")}
                                  </div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Operational Configuration Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Operational Configuration
                  </CardTitle>
                  <CardDescription>
                    Inventory, orders, and customer management settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="inventory" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="inventory">Inventory</TabsTrigger>
                      <TabsTrigger value="orders">Orders</TabsTrigger>
                      <TabsTrigger value="customers">Customers</TabsTrigger>
                    </TabsList>

                    <TabsContent value="inventory" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label className="text-sm font-medium">
                            Tracking Method
                          </Label>
                          <p className="text-sm text-gray-600 uppercase">
                            {
                              selectedSetup.operationalSetup.inventoryConfig
                                .trackingMethod
                            }
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Auto Reorder
                          </Label>
                          <p className="text-sm text-gray-600">
                            {selectedSetup.operationalSetup.inventoryConfig
                              .autoReorderEnabled
                              ? "Enabled"
                              : "Disabled"}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Batch Tracking
                          </Label>
                          <p className="text-sm text-gray-600">
                            {selectedSetup.operationalSetup.inventoryConfig
                              .batchTracking
                              ? "Enabled"
                              : "Disabled"}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Serial Tracking
                          </Label>
                          <p className="text-sm text-gray-600">
                            {selectedSetup.operationalSetup.inventoryConfig
                              .serialTracking
                              ? "Enabled"
                              : "Disabled"}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <Label className="text-sm font-medium text-yellow-800">
                          Expiry Management
                        </Label>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Alert Days:{" "}
                            {selectedSetup.operationalSetup.inventoryConfig.expiryManagement.alertDays.join(
                              ", ",
                            )}{" "}
                            days before expiry
                          </p>
                          <p>
                            Auto Rotation:{" "}
                            {selectedSetup.operationalSetup.inventoryConfig
                              .expiryManagement.autoRotation
                              ? "Enabled"
                              : "Disabled"}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="orders" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label className="text-sm font-medium">
                            Order Number Format
                          </Label>
                          <p className="text-sm text-gray-600 font-mono">
                            {
                              selectedSetup.operationalSetup.orderConfig
                                .orderNumberFormat
                            }
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Auto Approval
                          </Label>
                          <p className="text-sm text-gray-600">
                            {selectedSetup.operationalSetup.orderConfig
                              .autoApproval
                              ? "Enabled"
                              : "Disabled"}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Invoice Generation
                          </Label>
                          <p className="text-sm text-gray-600 capitalize">
                            {
                              selectedSetup.operationalSetup.orderConfig
                                .invoiceGeneration
                            }
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Delivery Tracking
                          </Label>
                          <p className="text-sm text-gray-600">
                            {selectedSetup.operationalSetup.orderConfig
                              .deliveryTracking
                              ? "Enabled"
                              : "Disabled"}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="customers" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-3 border rounded-lg">
                          <Label className="text-sm font-medium">
                            Loyalty Program
                          </Label>
                          <div className="mt-2 text-sm text-gray-600">
                            <p>
                              Status:{" "}
                              {selectedSetup.operationalSetup.customerConfig
                                .loyaltyProgram.enabled
                                ? "Enabled"
                                : "Disabled"}
                            </p>
                            {selectedSetup.operationalSetup.customerConfig
                              .loyaltyProgram.enabled && (
                              <>
                                <p>
                                  Points per ₹:{" "}
                                  {
                                    selectedSetup.operationalSetup
                                      .customerConfig.loyaltyProgram
                                      .pointsPerRupee
                                  }
                                </p>
                                <p>
                                  Redemption Rate:{" "}
                                  {
                                    selectedSetup.operationalSetup
                                      .customerConfig.loyaltyProgram
                                      .redemptionRate
                                  }
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <Label className="text-sm font-medium">
                            Credit Management
                          </Label>
                          <div className="mt-2 text-sm text-gray-600">
                            <p>
                              Status:{" "}
                              {selectedSetup.operationalSetup.customerConfig
                                .creditManagement.enabled
                                ? "Enabled"
                                : "Disabled"}
                            </p>
                            {selectedSetup.operationalSetup.customerConfig
                              .creditManagement.enabled && (
                              <>
                                <p>
                                  Default Limit: ₹
                                  {(
                                    selectedSetup.operationalSetup
                                      .customerConfig.creditManagement
                                      .defaultCreditLimit / 100000
                                  ).toFixed(1)}
                                  L
                                </p>
                                <p>
                                  Terms:{" "}
                                  {
                                    selectedSetup.operationalSetup
                                      .customerConfig.creditManagement
                                      .creditTerms
                                  }{" "}
                                  days
                                </p>
                                <p>
                                  Interest:{" "}
                                  {
                                    selectedSetup.operationalSetup
                                      .customerConfig.creditManagement
                                      .interestRate
                                  }
                                  %
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Product Catalog Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product Catalog Details
                  </CardTitle>
                  <CardDescription>
                    Available products and pricing configuration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <Label className="text-sm font-medium">
                          Catalog Type
                        </Label>
                        <p className="text-sm text-gray-600 capitalize">
                          {selectedSetup.productCatalog.catalogType}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Last Updated
                        </Label>
                        <p className="text-sm text-gray-600">
                          {new Date(
                            selectedSetup.productCatalog.lastUpdated,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Sync Status
                        </Label>
                        <Badge
                          variant={
                            selectedSetup.productCatalog.syncStatus === "synced"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {selectedSetup.productCatalog.syncStatus}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Available Products
                      </Label>
                      <div className="mt-2 max-h-60 overflow-y-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Corporate Price</TableHead>
                              <TableHead>Franchisee Price</TableHead>
                              <TableHead>Margin</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedSetup.productCatalog.products.map(
                              (product) => (
                                <TableRow key={product.id}>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">
                                        {product.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {product.sku}
                                      </p>
                                    </div>
                                  </TableCell>
                                  <TableCell>{product.category}</TableCell>
                                  <TableCell>
                                    ₹{product.corporatePrice}
                                  </TableCell>
                                  <TableCell>
                                    ₹{product.franchiseePrice}
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline">
                                      {product.margin}%
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ),
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Setup Cost Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Setup Cost Analysis
                  </CardTitle>
                  <CardDescription>
                    Investment and setup cost breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium">
                        Total Setup Cost
                      </Label>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(calculateSetupCost(selectedSetup))}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Franchise Investment Range
                      </Label>
                      <p className="text-lg font-semibold">
                        {formatCurrency(
                          selectedSetup.franchiseType.minInvestment,
                        )}{" "}
                        -{" "}
                        {formatCurrency(
                          selectedSetup.franchiseType.maxInvestment,
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <Label className="text-sm font-medium">
                      Cost Breakdown
                    </Label>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Base Setup Cost:</span>
                        <span>₹50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          Franchise Type ({selectedSetup.franchiseType.name}):
                        </span>
                        <span>
                          ₹
                          {selectedSetup.franchiseType.type === "distribution"
                            ? "100,000"
                            : selectedSetup.franchiseType.type === "warehouse"
                              ? "75,000"
                              : selectedSetup.franchiseType.type === "hybrid"
                                ? "60,000"
                                : "30,000"}
                        </span>
                      </div>
                      {selectedSetup.integrationSetup.posIntegration
                        .enabled && (
                        <div className="flex justify-between">
                          <span>POS Integration:</span>
                          <span>₹25,000</span>
                        </div>
                      )}
                      {selectedSetup.integrationSetup.paymentIntegration
                        .enabled && (
                        <div className="flex justify-between">
                          <span>Payment Integration:</span>
                          <span>₹15,000</span>
                        </div>
                      )}
                      {selectedSetup.integrationSetup.logisticsIntegration
                        .enabled && (
                        <div className="flex justify-between">
                          <span>Logistics Integration:</span>
                          <span>₹10,000</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowSetupModal(false)}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSetupAction("configure", selectedSetup)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSetupAction("pricing", selectedSetup)}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Pricing
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSetupAction("catalog", selectedSetup)}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Catalog
                </Button>
                {selectedSetup.setupStatus === "pending" && (
                  <Button
                    onClick={() => handleSetupAction("start", selectedSetup)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Setup
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Configuration Modal */}
      <Dialog open={showConfigModal} onOpenChange={setShowConfigModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Business Configuration</DialogTitle>
            <DialogDescription>
              Configure business parameters and operational settings
            </DialogDescription>
          </DialogHeader>
          {selectedSetup && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Business Name</Label>
                  <Input
                    defaultValue={selectedSetup.businessConfig.businessName}
                  />
                </div>
                <div>
                  <Label>Business Type</Label>
                  <Select
                    defaultValue={selectedSetup.businessConfig.businessType}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distribution">Distribution</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Operating Model</Label>
                  <Select
                    defaultValue={selectedSetup.businessConfig.operatingModel}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="b2b">B2B</SelectItem>
                      <SelectItem value="b2c">B2C</SelectItem>
                      <SelectItem value="b2b2c">B2B2C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowConfigModal(false)}
                >
                  Cancel
                </Button>
                <Button>Save Configuration</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Setup Modal */}
      <Dialog open={showNewSetupModal} onOpenChange={setShowNewSetupModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Franchisee Setup</DialogTitle>
            <DialogDescription>
              Start a new setup process for an approved franchisee request
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Approved Request</Label>
                <Select
                  value={newSetupForm.franchiseeRequestId || ""}
                  onValueChange={(value) => {
                    const request = mockApprovedRequests.find(
                      (r) => r.id === value,
                    );
                    setNewSetupForm({
                      ...newSetupForm,
                      franchiseeRequestId: value,
                      businessName: request?.businessName || "",
                      franchiseTypeId:
                        mockFranchiseTypes.find(
                          (ft) => ft.type === request?.franchiseType,
                        )?.id || "",
                      region: request?.location?.split(", ")[1] || "",
                      investment: request?.investment || 0,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select approved request" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockApprovedRequests.map((request) => (
                      <SelectItem key={request.id} value={request.id}>
                        {request.businessName} - {request.ownerName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Business Name</Label>
                <Input
                  value={newSetupForm.businessName || ""}
                  onChange={(e) =>
                    setNewSetupForm({
                      ...newSetupForm,
                      businessName: e.target.value,
                    })
                  }
                  placeholder="Business name"
                />
              </div>
              <div>
                <Label>Franchise Type</Label>
                <Select
                  value={newSetupForm.franchiseTypeId || ""}
                  onValueChange={(value) =>
                    setNewSetupForm({ ...newSetupForm, franchiseTypeId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select franchise type" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockFranchiseTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name} ({type.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Operating Model</Label>
                <Select
                  value={newSetupForm.operatingModel || ""}
                  onValueChange={(value) =>
                    setNewSetupForm({ ...newSetupForm, operatingModel: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select operating model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="b2b">B2B</SelectItem>
                    <SelectItem value="b2c">B2C</SelectItem>
                    <SelectItem value="b2b2c">B2B2C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Region</Label>
                <Input
                  value={newSetupForm.region || ""}
                  onChange={(e) =>
                    setNewSetupForm({ ...newSetupForm, region: e.target.value })
                  }
                  placeholder="Region/State"
                />
              </div>
              <div>
                <Label>Investment Amount</Label>
                <Input
                  type="number"
                  value={newSetupForm.investment || ""}
                  onChange={(e) =>
                    setNewSetupForm({
                      ...newSetupForm,
                      investment: parseInt(e.target.value),
                    })
                  }
                  placeholder="Investment in rupees"
                />
              </div>
              <div>
                <Label>Expected Go Live Date</Label>
                <Input
                  type="date"
                  value={newSetupForm.expectedGoLiveDate || ""}
                  onChange={(e) =>
                    setNewSetupForm({
                      ...newSetupForm,
                      expectedGoLiveDate: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Priority</Label>
                <Select
                  value={newSetupForm.priority || ""}
                  onValueChange={(value) =>
                    setNewSetupForm({ ...newSetupForm, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {newSetupForm.franchiseTypeId && (
              <div>
                <Label>Setup Template (Optional)</Label>
                <Select
                  value={newSetupForm.templateId || ""}
                  onValueChange={(value) =>
                    setNewSetupForm({ ...newSetupForm, templateId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template or create custom setup" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      Custom Setup (No Template)
                    </SelectItem>
                    {getTemplatesByFranchiseType(
                      newSetupForm.franchiseTypeId,
                    ).map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name} ({template.estimatedSetupTime} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {newSetupForm.templateId &&
                  newSetupForm.templateId !== "none" && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Template:</strong>{" "}
                        {getTemplateById(newSetupForm.templateId)?.description}
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        Estimated setup time:{" "}
                        {
                          getTemplateById(newSetupForm.templateId)
                            ?.estimatedSetupTime
                        }{" "}
                        minutes
                      </p>
                    </div>
                  )}
                {newSetupForm.templateId === "none" && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Custom Setup:</strong> Manual configuration
                      required for all steps
                    </p>
                  </div>
                )}
              </div>
            )}

            <div>
              <Label>Notes (Optional)</Label>
              <Textarea
                value={newSetupForm.notes || ""}
                onChange={(e) =>
                  setNewSetupForm({ ...newSetupForm, notes: e.target.value })
                }
                placeholder="Additional notes or special requirements"
                rows={3}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowNewSetupModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Simulate setup creation
                  console.log("Creating new setup:", newSetupForm);
                  const newSetup =
                    newSetupForm.templateId &&
                    newSetupForm.templateId !== "none"
                      ? createSetupFromTemplate(
                          newSetupForm.templateId,
                          newSetupForm,
                        )
                      : {
                          id: `setup_${Date.now()}`,
                          requestId: newSetupForm.franchiseeRequestId,
                          franchiseeCode: generateFranchiseeCode(
                            newSetupForm.franchiseTypeId,
                            newSetupForm.region,
                          ),
                          setupStatus: "pending",
                          businessName: newSetupForm.businessName,
                          createdAt: new Date().toISOString(),
                        };

                  alert(
                    `Setup created successfully!\nSetup ID: ${newSetup.id}\nFranchisee Code: ${newSetup.franchiseeCode}`,
                  );
                  setShowNewSetupModal(false);
                  setNewSetupForm({});
                }}
                disabled={
                  !newSetupForm.franchiseeRequestId ||
                  !newSetupForm.businessName ||
                  !newSetupForm.franchiseTypeId
                }
              >
                <Play className="h-4 w-4 mr-2" />
                Create Setup
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Template Modal */}
      <Dialog
        open={showCreateTemplateModal}
        onOpenChange={setShowCreateTemplateModal}
      >
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Setup Template</DialogTitle>
            <DialogDescription>
              Create a reusable template for franchisee setup configurations
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Template Name</Label>
                <Input
                  value={createTemplateForm.name || ""}
                  onChange={(e) =>
                    setCreateTemplateForm({
                      ...createTemplateForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="Template name"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={createTemplateForm.category || ""}
                  onValueChange={(value) =>
                    setCreateTemplateForm({
                      ...createTemplateForm,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick_start">Quick Start</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Franchise Type</Label>
                <Select
                  value={createTemplateForm.franchiseTypeId || ""}
                  onValueChange={(value) =>
                    setCreateTemplateForm({
                      ...createTemplateForm,
                      franchiseTypeId: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select franchise type" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockFranchiseTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name} ({type.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Difficulty</Label>
                <Select
                  value={createTemplateForm.difficulty || ""}
                  onValueChange={(value) =>
                    setCreateTemplateForm({
                      ...createTemplateForm,
                      difficulty: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Estimated Time (minutes)</Label>
                <Input
                  type="number"
                  value={createTemplateForm.estimatedTime || ""}
                  onChange={(e) =>
                    setCreateTemplateForm({
                      ...createTemplateForm,
                      estimatedTime: parseInt(e.target.value),
                    })
                  }
                  placeholder="Setup time in minutes"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={createTemplateForm.isPublic || false}
                  onChange={(e) =>
                    setCreateTemplateForm({
                      ...createTemplateForm,
                      isPublic: e.target.checked,
                    })
                  }
                />
                <Label htmlFor="isPublic">Make template public</Label>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={createTemplateForm.description || ""}
                onChange={(e) =>
                  setCreateTemplateForm({
                    ...createTemplateForm,
                    description: e.target.value,
                  })
                }
                placeholder="Detailed description of the template"
                rows={3}
              />
            </div>

            <div>
              <Label>Tags (comma separated)</Label>
              <Input
                value={createTemplateForm.tags?.join(", ") || ""}
                onChange={(e) =>
                  setCreateTemplateForm({
                    ...createTemplateForm,
                    tags: e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter((tag) => tag),
                  })
                }
                placeholder="retail, quick, standard"
              />
            </div>

            <Tabs defaultValue="steps" className="space-y-4">
              <TabsList>
                <TabsTrigger value="steps">Setup Steps</TabsTrigger>
                <TabsTrigger value="config">Configuration</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>

              <TabsContent value="steps" className="space-y-4">
                <div>
                  <Label>Required Steps</Label>
                  <div className="grid gap-2 mt-2">
                    {mockSetupSteps.map((step) => (
                      <div
                        key={step.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`req_${step.id}`}
                          checked={
                            createTemplateForm.requiredSteps?.includes(
                              step.id,
                            ) || false
                          }
                          onChange={(e) => {
                            const currentSteps =
                              createTemplateForm.requiredSteps || [];
                            const newSteps = e.target.checked
                              ? [...currentSteps, step.id]
                              : currentSteps.filter((s) => s !== step.id);
                            setCreateTemplateForm({
                              ...createTemplateForm,
                              requiredSteps: newSteps,
                            });
                          }}
                        />
                        <Label htmlFor={`req_${step.id}`} className="text-sm">
                          {step.name} ({step.estimatedTime} min)
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Optional Steps</Label>
                  <div className="grid gap-2 mt-2">
                    {mockSetupSteps.map((step) => (
                      <div
                        key={step.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`opt_${step.id}`}
                          checked={
                            createTemplateForm.optionalSteps?.includes(
                              step.id,
                            ) || false
                          }
                          onChange={(e) => {
                            const currentSteps =
                              createTemplateForm.optionalSteps || [];
                            const newSteps = e.target.checked
                              ? [...currentSteps, step.id]
                              : currentSteps.filter((s) => s !== step.id);
                            setCreateTemplateForm({
                              ...createTemplateForm,
                              optionalSteps: newSteps,
                            });
                          }}
                        />
                        <Label htmlFor={`opt_${step.id}`} className="text-sm">
                          {step.name} ({step.estimatedTime} min)
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="config" className="space-y-4">
                <div>
                  <Label>Default Margin (%)</Label>
                  <Input
                    type="number"
                    value={
                      createTemplateForm.pricingConfig?.marginConfig
                        ?.defaultMargin || ""
                    }
                    onChange={(e) =>
                      setCreateTemplateForm({
                        ...createTemplateForm,
                        pricingConfig: {
                          ...createTemplateForm.pricingConfig,
                          marginConfig: {
                            ...createTemplateForm.pricingConfig?.marginConfig,
                            defaultMargin: parseInt(e.target.value),
                          },
                        },
                      })
                    }
                    placeholder="Default margin percentage"
                  />
                </div>

                <div>
                  <Label>Operating Model</Label>
                  <Select
                    value={
                      createTemplateForm.businessConfig?.operatingModel || ""
                    }
                    onValueChange={(value) =>
                      setCreateTemplateForm({
                        ...createTemplateForm,
                        businessConfig: {
                          ...createTemplateForm.businessConfig,
                          operatingModel: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select operating model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="b2b">B2B</SelectItem>
                      <SelectItem value="b2c">B2C</SelectItem>
                      <SelectItem value="b2b2c">B2B2C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="posIntegration"
                      checked={
                        createTemplateForm.integrationConfig?.posIntegration
                          ?.enabled || false
                      }
                      onChange={(e) =>
                        setCreateTemplateForm({
                          ...createTemplateForm,
                          integrationConfig: {
                            ...createTemplateForm.integrationConfig,
                            posIntegration: { enabled: e.target.checked },
                          },
                        })
                      }
                    />
                    <Label htmlFor="posIntegration">POS Integration</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="accountingIntegration"
                      checked={
                        createTemplateForm.integrationConfig
                          ?.accountingIntegration?.enabled || false
                      }
                      onChange={(e) =>
                        setCreateTemplateForm({
                          ...createTemplateForm,
                          integrationConfig: {
                            ...createTemplateForm.integrationConfig,
                            accountingIntegration: {
                              enabled: e.target.checked,
                            },
                          },
                        })
                      }
                    />
                    <Label htmlFor="accountingIntegration">
                      Accounting Integration
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="ecommerceIntegration"
                      checked={
                        createTemplateForm.integrationConfig
                          ?.ecommerceIntegration?.enabled || false
                      }
                      onChange={(e) =>
                        setCreateTemplateForm({
                          ...createTemplateForm,
                          integrationConfig: {
                            ...createTemplateForm.integrationConfig,
                            ecommerceIntegration: { enabled: e.target.checked },
                          },
                        })
                      }
                    />
                    <Label htmlFor="ecommerceIntegration">
                      E-commerce Integration
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="paymentIntegration"
                      checked={
                        createTemplateForm.integrationConfig?.paymentIntegration
                          ?.enabled || false
                      }
                      onChange={(e) =>
                        setCreateTemplateForm({
                          ...createTemplateForm,
                          integrationConfig: {
                            ...createTemplateForm.integrationConfig,
                            paymentIntegration: { enabled: e.target.checked },
                          },
                        })
                      }
                    />
                    <Label htmlFor="paymentIntegration">
                      Payment Integration
                    </Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowCreateTemplateModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Simulate template creation
                  console.log("Creating template:", createTemplateForm);
                  const templateId = `template_${Date.now()}`;
                  alert(
                    `Template created successfully!\nTemplate ID: ${templateId}\nName: ${createTemplateForm.name}`,
                  );
                  setShowCreateTemplateModal(false);
                  setCreateTemplateForm({});
                }}
                disabled={
                  !createTemplateForm.name ||
                  !createTemplateForm.franchiseTypeId ||
                  !createTemplateForm.category
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
