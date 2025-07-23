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
import { Switch } from "../../ui/switch";
import {
  Zap,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  Target,
  TrendingUp,
  Settings,
  Mail,
  MessageSquare,
  Smartphone,
  Play,
  Pause,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  AutoCommunication as AutoCommunicationType,
  AutoTrigger,
  AutoCondition,
} from "./types";
import {
  autoCommunications,
  communicationTemplates,
  triggerEvents,
  conditionOperators,
} from "./data";
import { useToast } from "../../ui/use-toast";

export function AutoCommunication() {
  const [automations, setAutomations] =
    useState<AutoCommunicationType[]>(autoCommunications);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedAutomation, setSelectedAutomation] =
    useState<AutoCommunicationType | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    type: "email" as "sms" | "email" | "whatsapp",
    trigger: {
      event: "lead_created",
      fromStatus: "",
      toStatus: "",
      scoreThreshold: 0,
      inactivityDays: 0,
    } as AutoTrigger,
    templateId: "",
    subject: "",
    content: "",
    conditions: [] as AutoCondition[],
    delay: 0,
    delayUnit: "minutes" as "minutes" | "hours" | "days",
    maxSends: 0,
    cooldownPeriod: 0,
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
        return <Zap className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <Badge variant={isActive ? "default" : "secondary"}>
        {isActive ? "Active" : "Inactive"}
      </Badge>
    );
  };

  const getTriggerDescription = (trigger: AutoTrigger) => {
    switch (trigger.event) {
      case "lead_created":
        return "When a new lead is created";
      case "lead_status_changed":
        return `When lead status changes from ${trigger.fromStatus} to ${trigger.toStatus}`;
      case "lead_assigned":
        return "When a lead is assigned to a sales person";
      case "follow_up_due":
        return "When a follow-up is due";
      case "no_activity":
        return `When there's no activity for ${trigger.inactivityDays} days`;
      case "lead_score_changed":
        return `When lead score reaches ${trigger.scoreThreshold}`;
      default:
        return trigger.event.replace("_", " ");
    }
  };

  const handleCreateAutomation = () => {
    const newAutomation: AutoCommunicationType = {
      id: `auto_${Date.now()}`,
      name: formData.name,
      type: formData.type,
      trigger: formData.trigger,
      isActive: true,
      templateId: formData.templateId,
      subject: formData.subject,
      content: formData.content,
      conditions: formData.conditions,
      delay: formData.delay,
      delayUnit: formData.delayUnit,
      maxSends: formData.maxSends || undefined,
      cooldownPeriod: formData.cooldownPeriod || undefined,
      triggeredCount: 0,
      sentCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current_user",
    };

    setAutomations((prev) => [newAutomation, ...prev]);
    setShowCreateDialog(false);
    resetForm();

    toast({
      title: "Automation Created",
      description: `${newAutomation.name} has been created successfully.`,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "email",
      trigger: {
        event: "lead_created",
        fromStatus: "",
        toStatus: "",
        scoreThreshold: 0,
        inactivityDays: 0,
      },
      templateId: "",
      subject: "",
      content: "",
      conditions: [],
      delay: 0,
      delayUnit: "minutes",
      maxSends: 0,
      cooldownPeriod: 0,
    });
  };

  const handleToggleAutomation = (automationId: string) => {
    setAutomations((prev) =>
      prev.map((automation) =>
        automation.id === automationId
          ? { ...automation, isActive: !automation.isActive }
          : automation,
      ),
    );

    toast({
      title: "Automation Updated",
      description: "The automation status has been updated.",
    });
  };

  const handleDeleteAutomation = (automationId: string) => {
    setAutomations((prev) =>
      prev.filter((automation) => automation.id !== automationId),
    );
    toast({
      title: "Automation Deleted",
      description: "The automation has been deleted successfully.",
    });
  };

  const addCondition = () => {
    setFormData((prev) => ({
      ...prev,
      conditions: [
        ...prev.conditions,
        { field: "leadStatus", operator: "equals", value: "" },
      ],
    }));
  };

  const updateCondition = (
    index: number,
    field: keyof AutoCondition,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) =>
        i === index ? { ...condition, [field]: value } : condition,
      ),
    }));
  };

  const removeCondition = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
    }));
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
        <span>Automation</span>
      </div>

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Auto Communication
              </CardTitle>
              <CardDescription>
                Set up automated SMS, email, and WhatsApp triggers based on lead
                actions
              </CardDescription>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Automation
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Automations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Automations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Triggered</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {automations.map((automation) => (
                <TableRow key={automation.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{automation.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {automation.delay > 0 && (
                          <span>
                            Delay: {automation.delay} {automation.delayUnit}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(automation.type)}
                      <span className="capitalize">{automation.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="text-sm">
                        {getTriggerDescription(automation.trigger)}
                      </div>
                      {automation.conditions.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {automation.conditions.length} condition(s)
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(automation.isActive)}
                      <Switch
                        checked={automation.isActive}
                        onCheckedChange={() =>
                          handleToggleAutomation(automation.id)
                        }
                        size="sm"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">
                        {automation.triggeredCount}
                      </div>
                      <div className="text-xs text-muted-foreground">times</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{automation.sentCount}</div>
                      <div className="text-xs text-muted-foreground">
                        messages
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">
                        {automation.triggeredCount > 0
                          ? (
                              (automation.sentCount /
                                automation.triggeredCount) *
                              100
                            ).toFixed(1)
                          : 0}
                        %
                      </div>
                      <div className="text-xs text-muted-foreground">
                        success
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedAutomation(automation);
                          setShowEditDialog(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAutomation(automation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Automation Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Auto Communication</DialogTitle>
            <DialogDescription>
              Set up automated messages triggered by lead actions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="automationName">Automation Name</Label>
                <Input
                  id="automationName"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Welcome Email for New Leads"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="automationType">Type</Label>
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
            </div>

            {/* Trigger Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trigger Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="triggerEvent">Trigger Event</Label>
                  <Select
                    value={formData.trigger.event}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        trigger: { ...prev.trigger, event: value as any },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {triggerEvents.map((event) => (
                        <SelectItem key={event.value} value={event.value}>
                          {event.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Event-specific fields */}
                {formData.trigger.event === "lead_status_changed" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fromStatus">From Status</Label>
                      <Input
                        id="fromStatus"
                        value={formData.trigger.fromStatus || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            trigger: {
                              ...prev.trigger,
                              fromStatus: e.target.value,
                            },
                          }))
                        }
                        placeholder="qualified"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="toStatus">To Status</Label>
                      <Input
                        id="toStatus"
                        value={formData.trigger.toStatus || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            trigger: {
                              ...prev.trigger,
                              toStatus: e.target.value,
                            },
                          }))
                        }
                        placeholder="proposal"
                      />
                    </div>
                  </div>
                )}

                {formData.trigger.event === "no_activity" && (
                  <div className="space-y-2">
                    <Label htmlFor="inactivityDays">Inactivity Days</Label>
                    <Input
                      id="inactivityDays"
                      type="number"
                      value={formData.trigger.inactivityDays || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          trigger: {
                            ...prev.trigger,
                            inactivityDays: parseInt(e.target.value) || 0,
                          },
                        }))
                      }
                      placeholder="3"
                    />
                  </div>
                )}

                {formData.trigger.event === "lead_score_changed" && (
                  <div className="space-y-2">
                    <Label htmlFor="scoreThreshold">Score Threshold</Label>
                    <Input
                      id="scoreThreshold"
                      type="number"
                      value={formData.trigger.scoreThreshold || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          trigger: {
                            ...prev.trigger,
                            scoreThreshold: parseInt(e.target.value) || 0,
                          },
                        }))
                      }
                      placeholder="80"
                    />
                  </div>
                )}

                {/* Delay Configuration */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="delay">Delay</Label>
                    <Input
                      id="delay"
                      type="number"
                      value={formData.delay}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          delay: parseInt(e.target.value) || 0,
                        }))
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delayUnit">Delay Unit</Label>
                    <Select
                      value={formData.delayUnit}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          delayUnit: value as any,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Conditions
                  <Button variant="outline" size="sm" onClick={addCondition}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {formData.conditions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No conditions added. This automation will trigger for all
                    matching events.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {formData.conditions.map((condition, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 border rounded-lg"
                      >
                        <Input
                          placeholder="Field (e.g., leadStatus)"
                          value={condition.field}
                          onChange={(e) =>
                            updateCondition(index, "field", e.target.value)
                          }
                          className="flex-1"
                        />
                        <Select
                          value={condition.operator}
                          onValueChange={(value) =>
                            updateCondition(index, "operator", value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {conditionOperators.map((op) => (
                              <SelectItem key={op.value} value={op.value}>
                                {op.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Value"
                          value={condition.value}
                          onChange={(e) =>
                            updateCondition(index, "value", e.target.value)
                          }
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCondition(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Message Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Message Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template">Template (Optional)</Label>
                  <Select
                    value={formData.templateId}
                    onValueChange={(value) => {
                      const template = communicationTemplates.find(
                        (t) => t.id === value,
                      );
                      setFormData((prev) => ({
                        ...prev,
                        templateId: value,
                        subject: template?.subject || prev.subject,
                        content: template?.content || prev.content,
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {communicationTemplates
                        .filter((template) => template.type === formData.type)
                        .map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
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
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    placeholder="Hi {{firstName}}, welcome to our platform..."
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Limits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Limits & Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="maxSends">Max Sends per Lead</Label>
                    <Input
                      id="maxSends"
                      type="number"
                      value={formData.maxSends}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          maxSends: parseInt(e.target.value) || 0,
                        }))
                      }
                      placeholder="0 (unlimited)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cooldown">Cooldown Period (hours)</Label>
                    <Input
                      id="cooldown"
                      type="number"
                      value={formData.cooldownPeriod}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          cooldownPeriod: parseInt(e.target.value) || 0,
                        }))
                      }
                      placeholder="0 (no cooldown)"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateAutomation}>Create Automation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
