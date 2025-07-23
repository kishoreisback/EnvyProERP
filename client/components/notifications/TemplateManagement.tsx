import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  Edit,
  Copy,
  Trash2,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Send,
  Settings,
  Globe,
  Palette,
  Code,
  Image,
  Type,
  Link,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Play,
  Pause,
} from "lucide-react";

import { UserType, NotificationChannel, NotificationCategory } from "./types";

interface NotificationTemplate {
  id: string;
  name: string;
  description: string;
  category: NotificationCategory;
  status: "active" | "draft" | "archived" | "testing";
  type: "email" | "sms" | "push" | "in_app" | "webhook" | "multi_channel";

  // Content
  subject?: string;
  content: {
    text: string;
    html?: string;
    variables: TemplateVariable[];
    attachments?: TemplateAttachment[];
  };

  // Localization
  defaultLocale: string;
  translations: Record<string, TemplateTranslation>;

  // Design & Styling
  styling: {
    theme: "light" | "dark" | "auto";
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    fontSize?: string;
    customCSS?: string;
  };

  // Targeting & Personalization
  targeting: {
    userTypes: UserType[];
    channels: NotificationChannel[];
    segments?: string[];
    conditions?: TemplateCondition[];
  };

  // Analytics & Performance
  analytics: {
    totalSent: number;
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    conversionRate: number;
    lastUsed?: string;
  };

  // Testing & Validation
  testing: {
    testRecipients: string[];
    lastTested?: string;
    validationStatus: "valid" | "invalid" | "warning";
    validationErrors: string[];
  };

  // Metadata
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  tags: string[];
}

interface TemplateVariable {
  name: string;
  type: "text" | "number" | "date" | "boolean" | "url" | "email" | "phone";
  required: boolean;
  defaultValue?: string;
  description?: string;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
  };
}

interface TemplateAttachment {
  id: string;
  name: string;
  type: "image" | "document" | "video";
  url: string;
  size: number;
  mimeType: string;
}

interface TemplateTranslation {
  subject?: string;
  content: {
    text: string;
    html?: string;
  };
  locale: string;
  status: "complete" | "partial" | "missing";
  lastUpdated: string;
}

interface TemplateCondition {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "greater_than"
    | "less_than"
    | "in"
    | "not_in";
  value: any;
}

interface TemplateManagementProps {
  userType: UserType;
  tenantId: string;
  canCreate?: boolean;
  onCreateTemplate?: () => void;
}

export function TemplateManagement({
  userType,
  tenantId,
  canCreate = true,
  onCreateTemplate,
}: TemplateManagementProps) {
  const [templates, setTemplates] =
    useState<NotificationTemplate[]>(getMockTemplates());
  const [selectedTemplate, setSelectedTemplate] =
    useState<NotificationTemplate | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Filter templates
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesStatus =
      statusFilter === "all" || template.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || template.category === categoryFilter;
    const matchesType = typeFilter === "all" || template.type === typeFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesType;
  });

  // Handle template actions
  const handleDuplicateTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    const duplicatedTemplate: NotificationTemplate = {
      ...template,
      id: `template_${Date.now()}`,
      name: `${template.name} (Copy)`,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      analytics: {
        totalSent: 0,
        deliveryRate: 0,
        openRate: 0,
        clickRate: 0,
        conversionRate: 0,
      },
    };

    setTemplates((prev) => [duplicatedTemplate, ...prev]);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setTemplates((prev) => prev.filter((t) => t.id !== templateId));
    }
  };

  const handleToggleStatus = (templateId: string) => {
    setTemplates((prev) =>
      prev.map((template) =>
        template.id === templateId
          ? {
              ...template,
              status: template.status === "active" ? "draft" : "active",
              updatedAt: new Date().toISOString(),
            }
          : template,
      ),
    );
  };

  const handleTestTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    // Simulate test sending
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === templateId
          ? {
              ...t,
              testing: {
                ...t.testing,
                lastTested: new Date().toISOString(),
              },
              updatedAt: new Date().toISOString(),
            }
          : t,
      ),
    );

    alert(
      `Test notification sent to ${template.testing.testRecipients.join(", ")}`,
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-gray-100 text-gray-700";
      case "archived":
        return "bg-orange-100 text-orange-700";
      case "testing":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3" />;
      case "draft":
        return <Edit className="h-3 w-3" />;
      case "archived":
        return <XCircle className="h-3 w-3" />;
      case "testing":
        return <Play className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return "📧";
      case "sms":
        return "💬";
      case "push":
        return "🔔";
      case "in_app":
        return "📱";
      case "webhook":
        return "🔗";
      case "multi_channel":
        return "📢";
      default:
        return "📄";
    }
  };

  const getValidationIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "invalid":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Template Management
          </h2>
          <p className="text-gray-600">
            Create and manage notification templates for all channels
          </p>
        </div>

        {canCreate && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button onClick={onCreateTemplate}>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Total Templates</p>
              <p className="text-2xl font-bold">{templates.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Active</p>
              <p className="text-2xl font-bold">
                {templates.filter((t) => t.status === "active").length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Avg Open Rate</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  templates.reduce((acc, t) => acc + t.analytics.openRate, 0) /
                    templates.length,
                )}
                %
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Send className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Total Sent</p>
              <p className="text-2xl font-bold">
                {templates
                  .reduce((acc, t) => acc + t.analytics.totalSent, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="push">Push</SelectItem>
                  <SelectItem value="in_app">In-App</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                  <SelectItem value="multi_channel">Multi-Channel</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="quality">Quality</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="variables">Variables</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {getTypeIcon(template.type)}
                        </span>
                        <div>
                          <h3 className="font-semibold text-lg flex items-center space-x-2">
                            <span>{template.name}</span>
                            {getValidationIcon(
                              template.testing.validationStatus,
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {template.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Badge
                          className={getStatusColor(template.status)}
                          variant="secondary"
                        >
                          {getStatusIcon(template.status)}
                          <span className="ml-1 capitalize">
                            {template.status}
                          </span>
                        </Badge>

                        <Badge variant="outline" className="capitalize">
                          {template.category}
                        </Badge>

                        <Badge variant="outline" className="capitalize">
                          {template.type}
                        </Badge>

                        <div className="flex items-center text-sm text-gray-500">
                          <Send className="h-3 w-3 mr-1" />
                          {template.analytics.totalSent.toLocaleString()} sent
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <Eye className="h-3 w-3 mr-1" />
                          {template.analytics.openRate.toFixed(1)}% open rate
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <Globe className="h-3 w-3 mr-1" />
                          {Object.keys(template.translations).length + 1}{" "}
                          languages
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {template.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                        {template.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.tags.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>v{template.version}</span>
                        <span>•</span>
                        <span>Created by {template.createdBy}</span>
                        <span>•</span>
                        <span>
                          Updated{" "}
                          {new Date(template.updatedAt).toLocaleDateString()}
                        </span>
                        {template.analytics.lastUsed && (
                          <>
                            <span>•</span>
                            <span>
                              Last used{" "}
                              {new Date(
                                template.analytics.lastUsed,
                              ).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTestTemplate(template.id)}
                        disabled={template.status === "archived"}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Test
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setIsPreviewModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(template.id)}
                      >
                        {template.status === "active" ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Activate
                          </>
                        )}
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedTemplate(template);
                              setIsEditModalOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDuplicateTemplate(template.id)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Analytics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance by Template Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["email", "sms", "push", "in_app"].map((type) => {
                    const typeTemplates = templates.filter(
                      (t) => t.type === type,
                    );
                    const avgOpenRate =
                      typeTemplates.length > 0
                        ? typeTemplates.reduce(
                            (acc, t) => acc + t.analytics.openRate,
                            0,
                          ) / typeTemplates.length
                        : 0;
                    const totalSent = typeTemplates.reduce(
                      (acc, t) => acc + t.analytics.totalSent,
                      0,
                    );

                    return (
                      <div key={type} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center space-x-2">
                            <span>{getTypeIcon(type)}</span>
                            <span className="capitalize">{type}</span>
                          </span>
                          <span>
                            {avgOpenRate.toFixed(1)}% •{" "}
                            {totalSent.toLocaleString()} sent
                          </span>
                        </div>
                        <Progress value={avgOpenRate} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {templates
                    .sort((a, b) => b.analytics.openRate - a.analytics.openRate)
                    .slice(0, 5)
                    .map((template) => (
                      <div
                        key={template.id}
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <div className="flex items-center space-x-2">
                          <span>{getTypeIcon(template.type)}</span>
                          <span className="text-sm font-medium">
                            {template.name}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {template.analytics.openRate.toFixed(1)}%
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Template Usage Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                  <p>Template usage trend chart would be displayed here</p>
                  <p className="text-sm">Shows template usage over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Variables Tab */}
        <TabsContent value="variables" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getGlobalVariables().map((variable) => (
                    <Card key={variable.name} className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Code className="h-4 w-4 text-blue-500" />
                          <span className="font-mono text-sm font-medium">
                            {`{{${variable.name}}}`}
                          </span>
                          {variable.required && (
                            <Badge variant="destructive" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {variable.description}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>Type: {variable.type}</span>
                          {variable.defaultValue && (
                            <span>Default: {variable.defaultValue}</span>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Auto-save drafts</Label>
                    <p className="text-sm text-gray-600">
                      Automatically save template changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Template validation</Label>
                    <p className="text-sm text-gray-600">
                      Validate templates before sending
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Version control</Label>
                    <p className="text-sm text-gray-600">
                      Keep track of template versions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">A/B testing</Label>
                    <p className="text-sm text-gray-600">
                      Enable A/B testing for templates
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <Label className="font-medium">
                    Default template language
                  </Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[200px] mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-medium">
                    Template retention period
                  </Label>
                  <Select defaultValue="1y">
                    <SelectTrigger className="w-[200px] mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30d">30 days</SelectItem>
                      <SelectItem value="90d">90 days</SelectItem>
                      <SelectItem value="1y">1 year</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Template Preview Modal */}
      <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Template Preview: {selectedTemplate?.name}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedTemplate && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <p className="capitalize">{selectedTemplate.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <p className="capitalize">{selectedTemplate.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge
                    className={getStatusColor(selectedTemplate.status)}
                    variant="secondary"
                  >
                    {selectedTemplate.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Variables</Label>
                  <p>{selectedTemplate.content.variables.length} variables</p>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium">Subject</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded border">
                  {selectedTemplate.subject || "No subject"}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Content</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded border max-h-64 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">
                    {selectedTemplate.content.text}
                  </pre>
                </div>
              </div>

              {selectedTemplate.content.variables.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Variables</Label>
                  <div className="mt-1 space-y-2">
                    {selectedTemplate.content.variables.map((variable) => (
                      <div
                        key={variable.name}
                        className="flex items-center space-x-3 p-2 bg-gray-50 rounded"
                      >
                        <code className="font-mono text-sm">{`{{${variable.name}}}`}</code>
                        <span className="text-sm text-gray-600">
                          {variable.description}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {variable.type}
                        </Badge>
                        {variable.required && (
                          <Badge variant="destructive" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Mock data functions
function getMockTemplates(): NotificationTemplate[] {
  return [
    {
      id: "template_001",
      name: "PO Approval Request",
      description: "Template for purchase order approval notifications",
      category: "operational",
      status: "active",
      type: "email",
      subject: "Purchase Order {{po_number}} Requires Your Approval",
      content: {
        text: `Dear {{recipient_name}},

A new purchase order requires your approval:

Purchase Order: {{po_number}}
Supplier: {{supplier_name}}
Amount: ₹{{amount}}
Requested by: {{requester_name}}
Urgency: {{priority}}

Please review and approve/reject this purchase order by clicking the link below:
{{approval_link}}

Thank you,
{{company_name}} Team`,
        html: undefined,
        variables: [
          {
            name: "recipient_name",
            type: "text",
            required: true,
            description: "Name of the approver",
          },
          {
            name: "po_number",
            type: "text",
            required: true,
            description: "Purchase order number",
          },
          {
            name: "supplier_name",
            type: "text",
            required: true,
            description: "Name of supplier",
          },
          {
            name: "amount",
            type: "number",
            required: true,
            description: "Total amount",
          },
          {
            name: "requester_name",
            type: "text",
            required: true,
            description: "Person who requested",
          },
          {
            name: "priority",
            type: "text",
            required: false,
            description: "Urgency level",
            defaultValue: "Medium",
          },
          {
            name: "approval_link",
            type: "url",
            required: true,
            description: "Link to approval page",
          },
          {
            name: "company_name",
            type: "text",
            required: false,
            description: "Company name",
            defaultValue: "BuildPro ERP",
          },
        ],
      },
      defaultLocale: "en",
      translations: {
        hi: {
          subject: "खरीद आदेश {{po_number}} की स्वीकृति आवश्यक है",
          content: {
            text: "प्रिय {{recipient_name}},\n\nएक नया खरीद आदेश आपकी स्वीकृति की प्रतीक्षा में है...",
          },
          locale: "hi",
          status: "complete",
          lastUpdated: "2024-01-20T10:30:00Z",
        },
      },
      styling: {
        theme: "light",
        primaryColor: "#0B62DA",
        secondaryColor: "#FF9F1A",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
      },
      targeting: {
        userTypes: ["corporate"],
        channels: ["email", "in_app"],
        segments: ["approvers", "managers"],
      },
      analytics: {
        totalSent: 245,
        deliveryRate: 98.4,
        openRate: 87.3,
        clickRate: 67.8,
        conversionRate: 45.2,
        lastUsed: "2024-01-22T09:15:00Z",
      },
      testing: {
        testRecipients: ["admin@company.com", "manager@company.com"],
        lastTested: "2024-01-21T14:30:00Z",
        validationStatus: "valid",
        validationErrors: [],
      },
      createdBy: "System Admin",
      createdAt: "2024-01-10T08:00:00Z",
      updatedAt: "2024-01-20T16:45:00Z",
      version: 3,
      tags: ["approval", "purchase", "urgent"],
    },
    {
      id: "template_002",
      name: "Delivery Status Update",
      description: "Notify about delivery status changes",
      category: "operational",
      status: "active",
      type: "sms",
      content: {
        text: "Delivery Update: Your order {{order_id}} is now {{status}}. Expected delivery: {{delivery_date}}. Track: {{tracking_link}}",
        variables: [
          {
            name: "order_id",
            type: "text",
            required: true,
            description: "Order identifier",
          },
          {
            name: "status",
            type: "text",
            required: true,
            description: "Current delivery status",
          },
          {
            name: "delivery_date",
            type: "date",
            required: false,
            description: "Expected delivery date",
          },
          {
            name: "tracking_link",
            type: "url",
            required: false,
            description: "Tracking URL",
          },
        ],
      },
      defaultLocale: "en",
      translations: {},
      styling: {
        theme: "light",
      },
      targeting: {
        userTypes: ["franchisee"],
        channels: ["sms", "in_app"],
      },
      analytics: {
        totalSent: 1567,
        deliveryRate: 95.2,
        openRate: 94.8,
        clickRate: 23.4,
        conversionRate: 12.1,
        lastUsed: "2024-01-22T11:30:00Z",
      },
      testing: {
        testRecipients: ["+91-9876543210"],
        lastTested: "2024-01-22T08:00:00Z",
        validationStatus: "valid",
        validationErrors: [],
      },
      createdBy: "Operations Manager",
      createdAt: "2024-01-05T12:00:00Z",
      updatedAt: "2024-01-18T09:20:00Z",
      version: 2,
      tags: ["delivery", "status", "tracking"],
    },
    {
      id: "template_003",
      name: "Welcome New User",
      description: "Welcome message for new users",
      category: "system",
      status: "active",
      type: "multi_channel",
      subject: "Welcome to {{company_name}}!",
      content: {
        text: `Welcome {{user_name}}!

Thank you for joining {{company_name}}. We're excited to have you on board.

Your account has been created with the following details:
- Username: {{username}}
- Email: {{email}}
- Role: {{role}}

To get started, please log in using the link below:
{{login_link}}

If you have any questions, feel free to contact our support team.

Best regards,
{{company_name}} Team`,
        variables: [
          {
            name: "user_name",
            type: "text",
            required: true,
            description: "Full name of the user",
          },
          {
            name: "username",
            type: "text",
            required: true,
            description: "Login username",
          },
          {
            name: "email",
            type: "email",
            required: true,
            description: "User email address",
          },
          {
            name: "role",
            type: "text",
            required: true,
            description: "User role in system",
          },
          {
            name: "login_link",
            type: "url",
            required: true,
            description: "Login page URL",
          },
          {
            name: "company_name",
            type: "text",
            required: false,
            description: "Company name",
            defaultValue: "BuildPro ERP",
          },
        ],
      },
      defaultLocale: "en",
      translations: {},
      styling: {
        theme: "light",
        primaryColor: "#0B62DA",
        secondaryColor: "#FF9F1A",
      },
      targeting: {
        userTypes: ["corporate", "franchisee"],
        channels: ["email", "in_app"],
      },
      analytics: {
        totalSent: 89,
        deliveryRate: 100.0,
        openRate: 91.0,
        clickRate: 78.7,
        conversionRate: 68.5,
        lastUsed: "2024-01-21T16:00:00Z",
      },
      testing: {
        testRecipients: ["test@company.com"],
        lastTested: "2024-01-19T10:00:00Z",
        validationStatus: "valid",
        validationErrors: [],
      },
      createdBy: "HR Manager",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T14:30:00Z",
      version: 1,
      tags: ["welcome", "onboarding", "new-user"],
    },
  ];
}

function getGlobalVariables(): TemplateVariable[] {
  return [
    {
      name: "company_name",
      type: "text",
      required: false,
      defaultValue: "BuildPro ERP",
      description: "Name of the company",
    },
    {
      name: "current_date",
      type: "date",
      required: false,
      defaultValue: "{{current_date}}",
      description: "Current date",
    },
    {
      name: "current_time",
      type: "text",
      required: false,
      defaultValue: "{{current_time}}",
      description: "Current time",
    },
    {
      name: "user_name",
      type: "text",
      required: false,
      description: "Name of the current user",
    },
    {
      name: "user_email",
      type: "email",
      required: false,
      description: "Email of the current user",
    },
    {
      name: "tenant_name",
      type: "text",
      required: false,
      description: "Name of the tenant/organization",
    },
    {
      name: "support_email",
      type: "email",
      required: false,
      defaultValue: "support@buildpro.com",
      description: "Support email address",
    },
    {
      name: "app_url",
      type: "url",
      required: false,
      description: "Application base URL",
    },
  ];
}
