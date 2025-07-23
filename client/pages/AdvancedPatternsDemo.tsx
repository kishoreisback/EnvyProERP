import React, { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import {
  DynamicForm,
  FormBuilder,
  FormSchema,
} from "../components/advanced/forms";
import {
  DashboardBuilder,
  DashboardGrid,
  DashboardLayout,
} from "../components/advanced/dashboard";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  FileText,
  BarChart3,
  Settings,
  Zap,
  Users,
  TrendingUp,
  Target,
  Star,
  ArrowRight,
  Workflow,
  ExternalLink,
  Building2,
  Brain,
} from "lucide-react";
import { useToast } from "../components/ui/use-toast";

// Sample form schemas
const employeeOnboardingForm: FormSchema = {
  id: "employee-onboarding",
  title: "Employee Onboarding Form",
  description: "Complete onboarding process for new employees",
  version: "1.0.0",
  layout: "vertical",
  columns: 2,
  sections: [
    {
      id: "personal-info",
      title: "Personal Information",
      description: "Basic personal details",
      collapsible: false,
      collapsed: false,
      fields: [
        {
          id: "first-name",
          type: "text",
          name: "firstName",
          label: "First Name",
          placeholder: "Enter first name",
          required: true,
          validation: [
            { type: "required", message: "First name is required" },
            { type: "min", value: 2, message: "Must be at least 2 characters" },
          ],
        },
        {
          id: "last-name",
          type: "text",
          name: "lastName",
          label: "Last Name",
          placeholder: "Enter last name",
          required: true,
          validation: [{ type: "required", message: "Last name is required" }],
        },
        {
          id: "email",
          type: "email",
          name: "email",
          label: "Email Address",
          placeholder: "employee@company.com",
          required: true,
          validation: [
            { type: "required", message: "Email is required" },
            { type: "email", message: "Must be a valid email address" },
          ],
        },
        {
          id: "phone",
          type: "phone",
          name: "phone",
          label: "Phone Number",
          placeholder: "+91 98765 43210",
          required: true,
        },
        {
          id: "address",
          type: "address",
          name: "address",
          label: "Home Address",
          required: true,
        },
      ],
    },
    {
      id: "employment-details",
      title: "Employment Details",
      description: "Job-related information",
      collapsible: false,
      collapsed: false,
      fields: [
        {
          id: "department",
          type: "select",
          name: "department",
          label: "Department",
          required: true,
          options: [
            { label: "Engineering", value: "engineering" },
            { label: "Sales", value: "sales" },
            { label: "Marketing", value: "marketing" },
            { label: "HR", value: "hr" },
            { label: "Finance", value: "finance" },
          ],
        },
        {
          id: "position",
          type: "text",
          name: "position",
          label: "Job Title",
          placeholder: "Software Engineer",
          required: true,
        },
        {
          id: "start-date",
          type: "date",
          name: "startDate",
          label: "Start Date",
          required: true,
        },
        {
          id: "salary",
          type: "currency",
          name: "salary",
          label: "Annual Salary",
          required: true,
          validation: [
            {
              type: "min",
              value: 100000,
              message: "Minimum salary is ₹1,00,000",
            },
          ],
        },
        {
          id: "employment-type",
          type: "radio",
          name: "employmentType",
          label: "Employment Type",
          required: true,
          options: [
            { label: "Full-time", value: "fulltime" },
            { label: "Part-time", value: "parttime" },
            { label: "Contract", value: "contract" },
            { label: "Intern", value: "intern" },
          ],
        },
      ],
    },
    {
      id: "preferences",
      title: "Preferences & Agreements",
      description: "Optional preferences and required agreements",
      collapsible: true,
      collapsed: false,
      fields: [
        {
          id: "skills",
          type: "multiselect",
          name: "skills",
          label: "Technical Skills",
          options: [
            { label: "JavaScript", value: "javascript" },
            { label: "React", value: "react" },
            { label: "Node.js", value: "nodejs" },
            { label: "Python", value: "python" },
            { label: "Java", value: "java" },
            { label: "SQL", value: "sql" },
            { label: "AWS", value: "aws" },
          ],
        },
        {
          id: "experience",
          type: "range",
          name: "experience",
          label: "Years of Experience",
          min: 0,
          max: 20,
          step: 1,
        },
        {
          id: "rating",
          type: "rating",
          name: "previousCompanyRating",
          label: "Rate Previous Company Experience",
          max: 5,
        },
        {
          id: "terms",
          type: "checkbox",
          name: "agreeToTerms",
          label: "I agree to the terms and conditions",
          required: true,
          validation: [
            { type: "required", message: "You must agree to the terms" },
          ],
        },
        {
          id: "privacy",
          type: "checkbox",
          name: "agreeToPrivacy",
          label: "I agree to the privacy policy",
          required: true,
        },
      ],
    },
  ],
  settings: {
    showProgress: true,
    allowDraft: true,
    autoSave: false,
    submitText: "Complete Onboarding",
    resetText: "Clear Form",
    multiStep: false,
    submitOnEnter: false,
    validateOnChange: true,
  },
};

const projectRequestForm: FormSchema = {
  id: "project-request",
  title: "New Project Request",
  description: "Submit a request for a new project or initiative",
  version: "1.0.0",
  layout: "grid",
  columns: 2,
  fields: [
    {
      id: "project-name",
      type: "text",
      name: "projectName",
      label: "Project Name",
      placeholder: "Enter project name",
      required: true,
      width: "full",
    },
    {
      id: "priority",
      type: "select",
      name: "priority",
      label: "Priority Level",
      required: true,
      width: "half",
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
        { label: "Critical", value: "critical" },
      ],
    },
    {
      id: "budget",
      type: "currency",
      name: "budget",
      label: "Estimated Budget",
      required: true,
      width: "half",
    },
    {
      id: "description",
      type: "richtext",
      name: "description",
      label: "Project Description",
      placeholder: "Provide detailed project requirements...",
      required: true,
      width: "full",
      rows: 6,
    },
    {
      id: "timeline",
      type: "date",
      name: "deadline",
      label: "Target Completion Date",
      required: true,
      width: "half",
    },
    {
      id: "resources",
      type: "multiselect",
      name: "requiredResources",
      label: "Required Resources",
      width: "half",
      options: [
        { label: "Development Team", value: "development" },
        { label: "Design Team", value: "design" },
        { label: "QA Team", value: "qa" },
        { label: "DevOps", value: "devops" },
        { label: "Project Manager", value: "pm" },
      ],
    },
    {
      id: "files",
      type: "file",
      name: "attachments",
      label: "Supporting Documents",
      accept: ".pdf,.doc,.docx,.xls,.xlsx",
      multiple: true,
      width: "full",
    },
  ],
  settings: {
    showProgress: false,
    allowDraft: true,
    autoSave: true,
    submitText: "Submit Request",
    resetText: "Clear",
    validateOnChange: true,
  },
};

// Sample dashboard layout
const sampleDashboard: DashboardLayout = {
  id: "executive-dashboard",
  name: "Executive Dashboard",
  description: "High-level business metrics and KPIs",
  columns: 12,
  rowHeight: 60,
  margin: [16, 16],
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4 },
  widgets: [
    {
      id: "revenue-metric",
      type: "metric",
      title: "Monthly Revenue",
      description: "Total revenue for current month",
      position: { x: 0, y: 0, w: 3, h: 2 },
      settings: {
        format: "currency",
        trend: "up",
        unit: "This Month",
        showHeader: true,
        accentColor: "#22c55e",
      },
      staticData: 1247500,
      autoRefresh: true,
      refreshInterval: 300,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "users-metric",
      type: "metric",
      title: "Active Users",
      description: "Currently active users",
      position: { x: 3, y: 0, w: 3, h: 2 },
      settings: {
        format: "number",
        trend: "up",
        unit: "Online Now",
        showHeader: true,
        accentColor: "#3b82f6",
      },
      staticData: 2847,
      autoRefresh: true,
      refreshInterval: 60,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "conversion-metric",
      type: "metric",
      title: "Conversion Rate",
      description: "Lead to customer conversion",
      position: { x: 6, y: 0, w: 3, h: 2 },
      settings: {
        format: "percentage",
        trend: "up",
        unit: "This Quarter",
        showHeader: true,
        accentColor: "#f59e0b",
      },
      staticData: 24.5,
      autoRefresh: true,
      refreshInterval: 1800,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "satisfaction-metric",
      type: "metric",
      title: "Customer Satisfaction",
      description: "Average satisfaction score",
      position: { x: 9, y: 0, w: 3, h: 2 },
      settings: {
        format: "number",
        trend: "up",
        unit: "/ 5.0 Score",
        showHeader: true,
        accentColor: "#ef4444",
      },
      staticData: 4.7,
      autoRefresh: true,
      refreshInterval: 3600,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "sales-chart",
      type: "chart",
      title: "Sales Performance",
      description: "Monthly sales trend",
      position: { x: 0, y: 2, w: 6, h: 4 },
      settings: {
        chartType: "bar",
        xAxis: "month",
        yAxis: ["sales"],
        showHeader: true,
      },
      staticData: [
        { month: "Jan", sales: 450000 },
        { month: "Feb", sales: 520000 },
        { month: "Mar", sales: 480000 },
        { month: "Apr", sales: 610000 },
        { month: "May", sales: 580000 },
        { month: "Jun", sales: 720000 },
      ],
      autoRefresh: true,
      refreshInterval: 1800,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "top-products",
      type: "table",
      title: "Top Performing Products",
      description: "Best selling products this month",
      position: { x: 6, y: 2, w: 6, h: 4 },
      settings: {
        columns: [
          { key: "product", label: "Product", type: "text", sortable: true },
          { key: "sales", label: "Sales", type: "currency", sortable: true },
          { key: "growth", label: "Growth", type: "text", sortable: true },
        ],
        sortable: true,
        pagination: false,
        pageSize: 5,
        showHeader: true,
      },
      staticData: [
        { product: "Premium Plan", sales: 125000, growth: "+15%" },
        { product: "Starter Plan", sales: 89000, growth: "+8%" },
        { product: "Enterprise Plan", sales: 67000, growth: "+22%" },
        { product: "Add-on Services", sales: 45000, growth: "+12%" },
        { product: "Consulting", sales: 34000, growth: "+5%" },
      ],
      autoRefresh: true,
      refreshInterval: 3600,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "goal-progress",
      type: "progress",
      title: "Quarterly Goal",
      description: "Progress towards Q4 targets",
      position: { x: 0, y: 6, w: 3, h: 3 },
      settings: {
        progressValue: 78,
        progressMax: 100,
        progressType: "circular",
        showHeader: true,
      },
      autoRefresh: true,
      refreshInterval: 3600,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "recent-activities",
      type: "list",
      title: "Recent Activities",
      description: "Latest system activities",
      position: { x: 3, y: 6, w: 4, h: 3 },
      settings: {
        showAvatar: true,
        showTimestamp: true,
        showHeader: true,
      },
      staticData: [
        {
          title: "New enterprise client onboarded",
          description: "TechCorp Inc - $250K annual contract",
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          type: "success",
        },
        {
          title: "Product launch completed",
          description: "v2.1 released with new features",
          timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          type: "success",
        },
        {
          title: "System maintenance scheduled",
          description: "Planned downtime this weekend",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          type: "warning",
        },
      ],
      autoRefresh: true,
      refreshInterval: 300,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "notifications",
      type: "notification",
      title: "System Alerts",
      description: "Important notifications",
      position: { x: 7, y: 6, w: 3, h: 3 },
      settings: {
        showHeader: true,
      },
      staticData: [
        {
          title: "Server capacity at 85%",
          priority: "high",
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          read: false,
        },
        {
          title: "Backup completed successfully",
          priority: "low",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: true,
        },
        {
          title: "Payment gateway updated",
          priority: "medium",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          read: false,
        },
      ],
      autoRefresh: true,
      refreshInterval: 180,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "clock",
      type: "clock",
      title: "Current Time",
      description: "Mumbai, India",
      position: { x: 10, y: 6, w: 2, h: 3 },
      settings: {
        showHeader: true,
      },
      autoRefresh: false,
      lastUpdated: new Date().toISOString(),
    },
  ],
  settings: {
    editable: true,
    resizable: true,
    draggable: true,
    showGrid: false,
    autoSave: true,
    saveInterval: 30,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: "admin",
  tags: ["executive", "kpi", "business"],
  public: false,
  favorite: true,
};

export default function AdvancedPatternsDemo() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedForm, setSelectedForm] = useState<FormSchema>(
    employeeOnboardingForm,
  );
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [showDashboardBuilder, setShowDashboardBuilder] = useState(false);
  const [dashboardLayout, setDashboardLayout] = useState(sampleDashboard);

  const handleFormSubmit = async (values: Record<string, any>) => {
    console.log("Form submitted:", values);
    toast({
      title: "Form Submitted Successfully",
      description: "The form data has been processed.",
    });
  };

  const handleFormSave = (schema: FormSchema) => {
    console.log("Form saved:", schema);
    toast({
      title: "Form Saved",
      description: "Your form configuration has been saved.",
    });
    setShowFormBuilder(false);
  };

  const handleDashboardSave = (layout: DashboardLayout) => {
    setDashboardLayout(layout);
    console.log("Dashboard saved:", layout);
    toast({
      title: "Dashboard Saved",
      description: "Your dashboard configuration has been saved.",
    });
    setShowDashboardBuilder(false);
  };

  if (showFormBuilder) {
    return (
      <MainLayout>
        <FormBuilder
          initialSchema={selectedForm}
          onSave={handleFormSave}
          onPreview={(schema) => {
            console.log("Form preview:", schema);
            setSelectedForm(schema);
            setShowFormBuilder(false);
            setActiveTab("dynamic-forms");
          }}
        />
      </MainLayout>
    );
  }

  if (showDashboardBuilder) {
    return (
      <MainLayout>
        <DashboardBuilder
          initialLayout={dashboardLayout}
          onSave={handleDashboardSave}
          onPreview={(layout) => {
            console.log("Dashboard preview:", layout);
            setDashboardLayout(layout);
            setShowDashboardBuilder(false);
            setActiveTab("configurable-dashboards");
          }}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Advanced Patterns Demo</h1>
          <p className="text-xl text-muted-foreground">
            Explore dynamic forms and configurable dashboards for modern ERP
            applications
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2"
            >
              <Star className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="dynamic-forms"
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Dynamic Forms</span>
            </TabsTrigger>
            <TabsTrigger
              value="configurable-dashboards"
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Configurable Dashboards</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Dynamic Forms Overview */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-blue-500" />
                    <span>Dynamic Forms</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Create powerful, configurable forms with real-time
                    validation, conditional logic, and multiple field types.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        • 15+ field types (text, email, currency, rating, etc.)
                      </li>
                      <li>• Conditional logic and dynamic visibility</li>
                      <li>• Real-time validation and error handling</li>
                      <li>• Multi-step forms with progress tracking</li>
                      <li>• Form builder with drag-and-drop interface</li>
                      <li>• Indian market optimizations (₹, addresses)</li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Employee Onboarding</Badge>
                    <Badge variant="secondary">Project Requests</Badge>
                    <Badge variant="secondary">Customer Surveys</Badge>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={() => setActiveTab("dynamic-forms")}>
                      View Demo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowFormBuilder(true)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Form Builder
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Configurable Dashboards Overview */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-6 w-6 text-green-500" />
                    <span>Configurable Dashboards</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Build interactive dashboards with drag-and-drop widgets,
                    real-time data updates, and responsive layouts.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        • 12+ widget types (metrics, charts, tables, lists)
                      </li>
                      <li>• Drag-and-drop dashboard builder</li>
                      <li>• Real-time data refresh and updates</li>
                      <li>• Responsive grid layout system</li>
                      <li>• Widget library with business templates</li>
                      <li>
                        • Data source integrations (API, static, computed)
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Executive Dashboards</Badge>
                    <Badge variant="secondary">Sales Analytics</Badge>
                    <Badge variant="secondary">Project KPIs</Badge>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setActiveTab("configurable-dashboards")}
                    >
                      View Demo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowDashboardBuilder(true)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Dashboard Builder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Workflow className="h-6 w-6 text-purple-500" />
                  <span>Advanced Tools</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex-col space-y-2"
                    onClick={() => window.open("/form-builder", "_blank")}
                  >
                    <FileText className="h-6 w-6 text-blue-500" />
                    <span className="font-medium">Form Builder</span>
                    <span className="text-xs text-muted-foreground">
                      Create dynamic forms
                    </span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 flex-col space-y-2"
                    onClick={() => window.open("/dashboard-builder", "_blank")}
                  >
                    <BarChart3 className="h-6 w-6 text-green-500" />
                    <span className="font-medium">Dashboard Builder</span>
                    <span className="text-xs text-muted-foreground">
                      Build custom dashboards
                    </span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 flex-col space-y-2"
                    onClick={() =>
                      window.open("/visual-workflow-builder", "_blank")
                    }
                  >
                    <Workflow className="h-6 w-6 text-purple-500" />
                    <span className="font-medium">Workflow Builder</span>
                    <span className="text-xs text-muted-foreground">
                      Automate business processes
                    </span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 flex-col space-y-2"
                    onClick={() => window.open("/multi-tenant", "_blank")}
                  >
                    <Building2 className="h-6 w-6 text-orange-500" />
                    <span className="font-medium">Multi-Tenant</span>
                    <span className="text-xs text-muted-foreground">
                      Organization architecture
                    </span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 flex-col space-y-2"
                    onClick={() => window.open("/integrations", "_blank")}
                  >
                    <Zap className="h-6 w-6 text-indigo-500" />
                    <span className="font-medium">Integrations</span>
                    <span className="text-xs text-muted-foreground">
                      Third-party connections
                    </span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>

                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 flex items-center space-x-3"
                    onClick={() => window.open("/ai-agents", "_blank")}
                  >
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="font-medium block">
                        AI Agents & Automations
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Real AI processing with document intelligence, risk
                        analysis, and smart automation
                      </span>
                    </div>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  <span>Business Benefits</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">Increased Productivity</h4>
                    <p className="text-sm text-muted-foreground">
                      Reduce form development time by 70% with reusable,
                      configurable components
                    </p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold">Better User Experience</h4>
                    <p className="text-sm text-muted-foreground">
                      Intuitive interfaces with real-time validation and
                      responsive design
                    </p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">Data-Driven Decisions</h4>
                    <p className="text-sm text-muted-foreground">
                      Real-time dashboards with customizable KPIs and business
                      metrics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dynamic Forms Tab */}
          <TabsContent value="dynamic-forms" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Dynamic Forms Showcase</h2>
                <p className="text-muted-foreground">
                  Interactive forms with advanced field types and validation
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedForm(employeeOnboardingForm)}
                >
                  Employee Onboarding
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedForm(projectRequestForm)}
                >
                  Project Request
                </Button>
                <Button onClick={() => setShowFormBuilder(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Open Form Builder
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open("/ai-form-builder", "_blank")}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  AI Form Builder
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedForm.title}</span>
                  <Badge variant="outline">
                    {selectedForm.fields?.length ||
                      selectedForm.sections?.reduce(
                        (acc, section) => acc + section.fields.length,
                        0,
                      )}{" "}
                    fields
                  </Badge>
                </CardTitle>
                {selectedForm.description && (
                  <p className="text-muted-foreground">
                    {selectedForm.description}
                  </p>
                )}
              </CardHeader>
            </Card>

            <DynamicForm
              schema={selectedForm}
              onSubmit={handleFormSubmit}
              onDraftSave={(values) => {
                console.log("Draft saved:", values);
                toast({
                  title: "Draft Saved",
                  description: "Your progress has been saved.",
                });
              }}
              mode="create"
            />
          </TabsContent>

          {/* Configurable Dashboards Tab */}
          <TabsContent value="configurable-dashboards" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Configurable Dashboard Showcase
                </h2>
                <p className="text-muted-foreground">
                  Interactive dashboard with real-time widgets and analytics
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Refresh all widgets
                    const updatedLayout = {
                      ...dashboardLayout,
                      widgets: dashboardLayout.widgets.map((widget) => ({
                        ...widget,
                        lastUpdated: new Date().toISOString(),
                      })),
                    };
                    setDashboardLayout(updatedLayout);
                    toast({
                      title: "Dashboard Refreshed",
                      description:
                        "All widgets have been updated with latest data.",
                    });
                  }}
                >
                  Refresh All
                </Button>
                <Button onClick={() => setShowDashboardBuilder(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Open Dashboard Builder
                </Button>
              </div>
            </div>

            <DashboardGrid
              layout={dashboardLayout}
              editMode={false}
              onWidgetUpdate={(id, updates) => {
                setDashboardLayout((prev) => ({
                  ...prev,
                  widgets: prev.widgets.map((widget) =>
                    widget.id === id ? { ...widget, ...updates } : widget,
                  ),
                  updatedAt: new Date().toISOString(),
                }));
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
