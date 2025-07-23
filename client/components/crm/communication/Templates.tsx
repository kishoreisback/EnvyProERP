import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  FileText,
  Plus,
  Search,
  Edit,
  Copy,
  Trash2,
  Eye,
  MoreHorizontal,
  Mail,
  MessageSquare,
  Smartphone,
  Star,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CommunicationTemplate, CreateTemplateForm } from "./types";
import { communicationTemplates, messageTemplateCategories } from "./data";
import { useToast } from "../../ui/use-toast";

export function Templates() {
  const [templates, setTemplates] = useState<CommunicationTemplate[]>(
    communicationTemplates,
  );
  const [selectedTemplate, setSelectedTemplate] =
    useState<CommunicationTemplate | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const { toast } = useToast();

  const [formData, setFormData] = useState<CreateTemplateForm>({
    name: "",
    type: "email",
    category: "custom",
    subject: "",
    content: "",
    description: "",
    tags: [],
    language: "en",
  });

  // Filter templates
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      !typeFilter || typeFilter === "all" || template.type === typeFilter;
    const matchesCategory =
      !categoryFilter ||
      categoryFilter === "all" ||
      template.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "sms":
        return <Smartphone className="h-4 w-4" />;
      case "whatsapp":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      welcome: "bg-blue-100 text-blue-800",
      follow_up: "bg-green-100 text-green-800",
      promotional: "bg-purple-100 text-purple-800",
      transactional: "bg-orange-100 text-orange-800",
      reminder: "bg-yellow-100 text-yellow-800",
      custom: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge
        className={
          variants[category as keyof typeof variants] ||
          "bg-gray-100 text-gray-800"
        }
      >
        {category.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  const handleCreateTemplate = () => {
    const newTemplate: CommunicationTemplate = {
      id: `template_${Date.now()}`,
      ...formData,
      variables: extractVariables(formData.content + (formData.subject || "")),
      isActive: true,
      usageCount: 0,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current_user",
    };

    setTemplates((prev) => [newTemplate, ...prev]);
    setShowCreateDialog(false);
    setFormData({
      name: "",
      type: "email",
      category: "custom",
      subject: "",
      content: "",
      description: "",
      tags: [],
      language: "en",
    });

    toast({
      title: "Template Created",
      description: `${newTemplate.name} has been created successfully.`,
    });
  };

  const extractVariables = (text: string): string[] => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = text.match(regex);
    return matches
      ? [...new Set(matches.map((match) => match.slice(2, -2)))]
      : [];
  };

  const handleDuplicateTemplate = (template: CommunicationTemplate) => {
    const duplicated: CommunicationTemplate = {
      ...template,
      id: `template_${Date.now()}`,
      name: `${template.name} (Copy)`,
      usageCount: 0,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current_user",
    };

    setTemplates((prev) => [duplicated, ...prev]);
    toast({
      title: "Template Duplicated",
      description: `${duplicated.name} has been created.`,
    });
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== templateId));
    toast({
      title: "Template Deleted",
      description: "The template has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          to="/crm/dashboard"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to CRM
        </Link>
        <span>/</span>
        <Link
          to="/crm/communication"
          className="hover:text-foreground transition-colors"
        >
          Communication Center
        </Link>
        <span>/</span>
        <span>Templates</span>
      </div>

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Message Templates
              </CardTitle>
              <CardDescription>
                Create and manage reusable templates for SMS, Email, and
                WhatsApp
              </CardDescription>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Template
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={typeFilter || "all"}
              onValueChange={(value) =>
                setTypeFilter(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={categoryFilter || "all"}
              onValueChange={(value) =>
                setCategoryFilter(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {messageTemplateCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.replace("_", " ").charAt(0).toUpperCase() +
                      category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(template.type)}
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowViewDialog(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowEditDialog(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDuplicateTemplate(template)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
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
              <div className="flex items-center gap-2">
                {getCategoryBadge(template.category)}
                <Badge variant={template.isActive ? "default" : "secondary"}>
                  {template.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {template.subject && (
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Subject:
                  </Label>
                  <p className="text-sm font-medium truncate">
                    {template.subject}
                  </p>
                </div>
              )}

              <div>
                <Label className="text-xs text-muted-foreground">
                  Content Preview:
                </Label>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {template.content}
                </p>
              </div>

              {template.variables.length > 0 && (
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Variables:
                  </Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.variables.slice(0, 3).map((variable) => (
                      <Badge
                        key={variable}
                        variant="outline"
                        className="text-xs"
                      >
                        {variable}
                      </Badge>
                    ))}
                    {template.variables.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.variables.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{template.usageCount} uses</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  <span>{template.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Template Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
              Create a reusable template for your communications
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Welcome Email Template"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value as any }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value as any }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {messageTemplateCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.replace("_", " ").charAt(0).toUpperCase() +
                          category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, language: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.type === "email" && (
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  placeholder="Welcome to {{companyName}}"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="content">Message Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Hi {{firstName}}, welcome to our platform..."
                rows={8}
              />
              <p className="text-xs text-muted-foreground">
                Use double curly braces for variables: {"{{"} firstName{"}"},{" "}
                {"{{"} companyName{"}"}, etc.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description of when to use this template"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateTemplate}>Create Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Template Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedTemplate && getTypeIcon(selectedTemplate.type)}
              {selectedTemplate?.name}
            </DialogTitle>
            <DialogDescription>Template details and preview</DialogDescription>
          </DialogHeader>

          {selectedTemplate && (
            <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Type:</Label>
                  <p className="text-sm capitalize">{selectedTemplate.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Category:</Label>
                  <p className="text-sm">
                    {getCategoryBadge(selectedTemplate.category)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status:</Label>
                  <Badge
                    variant={
                      selectedTemplate.isActive ? "default" : "secondary"
                    }
                  >
                    {selectedTemplate.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Usage Count:</Label>
                  <p className="text-sm">{selectedTemplate.usageCount}</p>
                </div>
              </div>

              {selectedTemplate.subject && (
                <div>
                  <Label className="text-sm font-medium">Subject:</Label>
                  <p className="text-sm font-medium">
                    {selectedTemplate.subject}
                  </p>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium">Content:</Label>
                <div className="p-3 border rounded-lg bg-gray-50 whitespace-pre-wrap text-sm">
                  {selectedTemplate.content}
                </div>
              </div>

              {selectedTemplate.variables.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Variables:</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedTemplate.variables.map((variable) => (
                      <Badge key={variable} variant="outline">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedTemplate.description && (
                <div>
                  <Label className="text-sm font-medium">Description:</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedTemplate.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
