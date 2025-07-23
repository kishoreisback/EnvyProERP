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
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Volume2,
  Globe,
  Clock,
  Users,
  Building2,
  FileText,
  Code,
  ExternalLink,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Forward,
  MessageCircle,
  Download,
  Eye,
  Tag,
  Target,
  Zap,
  Settings,
} from "lucide-react";

import { UnifiedNotification, UserType, NotificationChannel } from "./types";

// Notification Details Modal
interface NotificationDetailsModalProps {
  notification: UnifiedNotification | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (notificationId: string, actionId: string) => void;
}

export function NotificationDetailsModal({
  notification,
  isOpen,
  onClose,
  onAction,
}: NotificationDetailsModalProps) {
  if (!notification) return null;

  const handleAction = (actionId: string) => {
    onAction(notification.id, actionId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>{notification.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <Badge variant="outline" className="mt-1">
                {notification.status}
              </Badge>
            </div>
            <div>
              <Label className="text-sm font-medium">Priority</Label>
              <Badge variant="outline" className="mt-1">
                {notification.priority}
              </Badge>
            </div>
            <div>
              <Label className="text-sm font-medium">Category</Label>
              <Badge variant="outline" className="mt-1">
                {notification.category}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Content */}
          <div>
            <Label className="text-sm font-medium">Message</Label>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">
                {notification.message}
              </p>
            </div>

            {notification.content.fullText &&
              notification.content.fullText !== notification.message && (
                <div className="mt-4">
                  <Label className="text-sm font-medium">Full Content</Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg max-h-64 overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap">
                      {notification.content.fullText}
                    </p>
                  </div>
                </div>
              )}
          </div>

          {/* Sender Information */}
          <div>
            <Label className="text-sm font-medium">Sender Information</Label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-500">Name</span>
                <p className="font-medium">{notification.senderName}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Type</span>
                <p className="font-medium capitalize">
                  {notification.senderType}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div>
            <Label className="text-sm font-medium">Delivery Information</Label>
            <div className="mt-2 space-y-2">
              {notification.deliveryStatus.map((delivery, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center space-x-2">
                    {delivery.channel === "email" && (
                      <Mail className="h-4 w-4" />
                    )}
                    {delivery.channel === "sms" && (
                      <MessageSquare className="h-4 w-4" />
                    )}
                    {delivery.channel === "in_app" && (
                      <Bell className="h-4 w-4" />
                    )}
                    {delivery.channel === "push" && (
                      <Volume2 className="h-4 w-4" />
                    )}
                    <span className="text-sm capitalize">
                      {delivery.channel}
                    </span>
                  </div>
                  <Badge
                    variant={
                      delivery.status === "delivered" ? "default" : "outline"
                    }
                    className={
                      delivery.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : delivery.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {delivery.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Business Context */}
          {notification.businessContext && (
            <div>
              <Label className="text-sm font-medium">Business Context</Label>
              <Card className="mt-2">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Process Type
                      </span>
                      <Badge variant="outline">
                        {notification.businessContext.processType}
                      </Badge>
                    </div>

                    {notification.businessContext.deadlines &&
                      notification.businessContext.deadlines.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-600">
                            Deadlines
                          </span>
                          <div className="mt-1 space-y-1">
                            {notification.businessContext.deadlines.map(
                              (deadline, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span>{deadline.name}</span>
                                  <span className="text-red-600">
                                    {new Date(
                                      deadline.dueDate,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                    {notification.businessContext.stakeholders &&
                      notification.businessContext.stakeholders.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-600">
                            Stakeholders
                          </span>
                          <div className="mt-1 space-y-1">
                            {notification.businessContext.stakeholders.map(
                              (stakeholder, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span>{stakeholder.userId}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {stakeholder.role}
                                  </Badge>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Related Entity */}
          {notification.relatedEntity && (
            <div>
              <Label className="text-sm font-medium">Related Entity</Label>
              <Card className="mt-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {notification.relatedEntity.name}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        {notification.relatedEntity.type}
                      </p>
                    </div>
                    {notification.relatedEntity.url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(notification.relatedEntity!.url, "_blank")
                        }
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Attachments */}
          {notification.attachments.length > 0 && (
            <div>
              <Label className="text-sm font-medium">Attachments</Label>
              <div className="mt-2 space-y-2">
                {notification.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">
                          {attachment.fileName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(attachment.fileSize / 1024).toFixed(1)} KB •{" "}
                          {attachment.fileType}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {notification.tags.length > 0 && (
            <div>
              <Label className="text-sm font-medium">Tags</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {notification.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div>
            <Label className="text-sm font-medium">Timeline</Label>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Created</span>
                <span>{new Date(notification.createdAt).toLocaleString()}</span>
              </div>
              {notification.sentAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sent</span>
                  <span>{new Date(notification.sentAt).toLocaleString()}</span>
                </div>
              )}
              {notification.readAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Read</span>
                  <span>{new Date(notification.readAt).toLocaleString()}</span>
                </div>
              )}
              {notification.acknowledgedAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Acknowledged</span>
                  <span>
                    {new Date(notification.acknowledgedAt).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>

          <div className="flex space-x-2">
            {notification.actions.map((action) => (
              <Button
                key={action.id}
                variant={action.style === "primary" ? "default" : "outline"}
                onClick={() => handleAction(action.id)}
                disabled={!action.enabled}
                className={
                  action.style === "success"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : action.style === "danger"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : action.style === "warning"
                        ? "bg-orange-600 hover:bg-orange-700 text-white"
                        : ""
                }
              >
                {action.label}
              </Button>
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Preferences Modal
interface PreferencesModalProps {
  userType: UserType;
  isOpen: boolean;
  onClose: () => void;
}

export function PreferencesModal({
  userType,
  isOpen,
  onClose,
}: PreferencesModalProps) {
  const [preferences, setPreferences] = useState({
    channels: {
      inApp: true,
      email: true,
      sms: false,
      whatsapp: false,
      push: true,
    },
    frequency: "immediate",
    quietHours: {
      enabled: false,
      start: "22:00",
      end: "06:00",
    },
    categories: {
      operational: true,
      financial: true,
      quality: true,
      compliance: true,
      system: false,
      promotional: false,
    },
  });

  const handleSave = () => {
    // Save preferences logic here
    console.log("Saving preferences:", preferences);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Notification Preferences</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Channels */}
          <div>
            <Label className="text-sm font-medium">Notification Channels</Label>
            <div className="mt-3 space-y-3">
              {Object.entries({
                inApp: { label: "In-App", icon: Bell },
                email: { label: "Email", icon: Mail },
                sms: { label: "SMS", icon: MessageSquare },
                whatsapp: { label: "WhatsApp", icon: Smartphone },
                push: { label: "Push", icon: Volume2 },
              }).map(([key, { label, icon: Icon }]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{label}</span>
                  </div>
                  <Switch
                    checked={
                      preferences.channels[
                        key as keyof typeof preferences.channels
                      ]
                    }
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        channels: { ...prev.channels, [key]: checked },
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Frequency */}
          <div>
            <Label className="text-sm font-medium">
              Notification Frequency
            </Label>
            <Select
              value={preferences.frequency}
              onValueChange={(value) =>
                setPreferences((prev) => ({ ...prev, frequency: value }))
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="batched">Batched (every hour)</SelectItem>
                <SelectItem value="digest">Daily digest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Quiet Hours */}
          <div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Quiet Hours</Label>
              <Switch
                checked={preferences.quietHours.enabled}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({
                    ...prev,
                    quietHours: { ...prev.quietHours, enabled: checked },
                  }))
                }
              />
            </div>

            {preferences.quietHours.enabled && (
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Start Time</Label>
                  <Input
                    type="time"
                    value={preferences.quietHours.start}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        quietHours: {
                          ...prev.quietHours,
                          start: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">End Time</Label>
                  <Input
                    type="time"
                    value={preferences.quietHours.end}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        quietHours: { ...prev.quietHours, end: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Categories */}
          <div>
            <Label className="text-sm font-medium">
              Notification Categories
            </Label>
            <div className="mt-3 space-y-3">
              {Object.entries({
                operational: "Operational Updates",
                financial: "Financial Notifications",
                quality: "Quality & Compliance",
                compliance: "Regulatory Compliance",
                system: "System Notifications",
                promotional: "Promotional Content",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm">{label}</span>
                  <Switch
                    checked={
                      preferences.categories[
                        key as keyof typeof preferences.categories
                      ]
                    }
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        categories: { ...prev.categories, [key]: checked },
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Template Creation Modal
interface TemplateCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
  tenantId: string;
}

export function TemplateCreationModal({
  isOpen,
  onClose,
  userType,
  tenantId,
}: TemplateCreationModalProps) {
  const [templateData, setTemplateData] = useState({
    name: "",
    description: "",
    type: "email",
    category: "operational",
    subject: "",
    content: "",
    channels: ["email"],
  });

  const handleSave = () => {
    // Save template logic here
    console.log("Creating template:", templateData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Create New Template</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={templateData.name}
                onChange={(e) =>
                  setTemplateData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter template name"
              />
            </div>
            <div>
              <Label htmlFor="type">Template Type</Label>
              <Select
                value={templateData.type}
                onValueChange={(value) =>
                  setTemplateData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="push">Push Notification</SelectItem>
                  <SelectItem value="in_app">In-App</SelectItem>
                  <SelectItem value="multi_channel">Multi-Channel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={templateData.description}
              onChange={(e) =>
                setTemplateData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe what this template is used for"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={templateData.category}
              onValueChange={(value) =>
                setTemplateData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="quality">Quality</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="promotional">Promotional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(templateData.type === "email" ||
            templateData.type === "multi_channel") && (
            <div>
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                value={templateData.subject}
                onChange={(e) =>
                  setTemplateData((prev) => ({
                    ...prev,
                    subject: e.target.value,
                  }))
                }
                placeholder="Enter email subject"
              />
            </div>
          )}

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={templateData.content}
              onChange={(e) =>
                setTemplateData((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              placeholder="Enter your message content. Use {{variable_name}} for dynamic content."
              rows={8}
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Use variables like {"{user_name}"}, {"{company_name}"},{" "}
              {"{date}"} for dynamic content
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Create Template</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Workflow Creation Modal
interface WorkflowCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
  tenantId: string;
}

export function WorkflowCreationModal({
  isOpen,
  onClose,
  userType,
  tenantId,
}: WorkflowCreationModalProps) {
  const [workflowData, setWorkflowData] = useState({
    name: "",
    description: "",
    category: "operational",
    triggerType: "event",
    triggerSource: "",
    priority: "medium",
  });

  const handleSave = () => {
    // Save workflow logic here
    console.log("Creating workflow:", workflowData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Create New Workflow</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label htmlFor="workflow-name">Workflow Name</Label>
            <Input
              id="workflow-name"
              value={workflowData.name}
              onChange={(e) =>
                setWorkflowData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter workflow name"
            />
          </div>

          <div>
            <Label htmlFor="workflow-description">Description</Label>
            <Textarea
              id="workflow-description"
              value={workflowData.description}
              onChange={(e) =>
                setWorkflowData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe what this workflow does"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workflow-category">Category</Label>
              <Select
                value={workflowData.category}
                onValueChange={(value) =>
                  setWorkflowData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="approval">Approval</SelectItem>
                  <SelectItem value="notification">Notification</SelectItem>
                  <SelectItem value="integration">Integration</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="workflow-priority">Priority</Label>
              <Select
                value={workflowData.priority}
                onValueChange={(value) =>
                  setWorkflowData((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="trigger-type">Trigger Type</Label>
            <Select
              value={workflowData.triggerType}
              onValueChange={(value) =>
                setWorkflowData((prev) => ({ ...prev, triggerType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event">Event-based</SelectItem>
                <SelectItem value="schedule">Scheduled</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
                <SelectItem value="condition">Condition-based</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="trigger-source">Trigger Source</Label>
            <Input
              id="trigger-source"
              value={workflowData.triggerSource}
              onChange={(e) =>
                setWorkflowData((prev) => ({
                  ...prev,
                  triggerSource: e.target.value,
                }))
              }
              placeholder="e.g., purchase_order.status_changed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Specify the event or condition that will trigger this workflow
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Create Workflow</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
