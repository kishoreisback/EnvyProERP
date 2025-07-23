import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Bell,
  BellOff,
  Mail,
  MessageSquare,
  Smartphone,
  Volume2,
  Clock,
  Users,
  Building2,
  Settings,
  Save,
  RotateCcw,
  Shield,
  Zap,
  Filter,
  Calendar,
  Globe,
  Palette,
  Eye,
  EyeOff,
  Star,
  Flag,
  Archive,
  Trash2,
} from "lucide-react";

import {
  UserType,
  NotificationChannel,
  NotificationCategory,
  NotificationPriority,
} from "./types";

interface NotificationPreferences {
  // Channel preferences
  channels: {
    inApp: boolean;
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    push: boolean;
  };

  // Category preferences
  categories: Record<
    NotificationCategory,
    {
      enabled: boolean;
      channels: NotificationChannel[];
      frequency: "immediate" | "batched" | "digest";
      priority: NotificationPriority;
    }
  >;

  // Schedule preferences
  schedule: {
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
      timezone: string;
    };
    digestFrequency: "hourly" | "daily" | "weekly";
    digestTime: string;
    workingDays: string[];
  };

  // Display preferences
  display: {
    theme: "light" | "dark" | "auto";
    density: "compact" | "comfortable" | "spacious";
    showAvatars: boolean;
    showPreviews: boolean;
    groupNotifications: boolean;
    autoMarkRead: boolean;
    autoMarkReadDelay: number; // seconds
  };

  // Privacy & Security
  privacy: {
    showSenderInfo: boolean;
    showPreviewInNotifications: boolean;
    allowReadReceipts: boolean;
    shareEngagementData: boolean;
    dataRetention: "30d" | "90d" | "1y" | "indefinite";
  };

  // Integration preferences
  integrations: {
    calendarSync: boolean;
    emailForwarding: string;
    webhookUrl: string;
    slackChannel: string;
    teamsChannel: string;
  };
}

interface NotificationSettingsProps {
  userType: UserType;
  tenantId: string;
  onUpdatePreferences: () => void;
}

export function NotificationSettings({
  userType,
  tenantId,
  onUpdatePreferences,
}: NotificationSettingsProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    getDefaultPreferences(),
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handlePreferenceChange = (path: string, value: any) => {
    setPreferences((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let current: any = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return updated;
    });
    setHasChanges(true);
  };

  const handleCategoryPreferenceChange = (
    category: NotificationCategory,
    field: string,
    value: any,
  ) => {
    setPreferences((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          [field]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSavedMessage("Preferences saved successfully!");
      setHasChanges(false);

      setTimeout(() => setSavedMessage(null), 3000);
    } catch (error) {
      setSavedMessage("Failed to save preferences. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetToDefaults = () => {
    setPreferences(getDefaultPreferences());
    setHasChanges(true);
  };

  const categoryLabels: Record<NotificationCategory, string> = {
    operational: "Operational Updates",
    financial: "Financial Notifications",
    quality: "Quality & Compliance",
    compliance: "Regulatory Compliance",
    system: "System Notifications",
    workflow: "Workflow Automation",
    promotional: "Promotional Content",
    emergency: "Emergency Alerts",
    informational: "General Information",
    tenant_admin: "Tenant Administration",
  };

  const channelLabels: Record<
    NotificationChannel,
    { label: string; icon: any }
  > = {
    in_app: { label: "In-App", icon: Bell },
    email: { label: "Email", icon: Mail },
    sms: { label: "SMS", icon: MessageSquare },
    whatsapp: { label: "WhatsApp", icon: Smartphone },
    push: { label: "Push", icon: Volume2 },
    webhook: { label: "Webhook", icon: Zap },
    slack: { label: "Slack", icon: MessageSquare },
    teams: { label: "Teams", icon: Users },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Notification Settings
          </h2>
          <p className="text-gray-600">
            Customize how you receive and interact with notifications
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {hasChanges && (
            <Badge
              variant="outline"
              className="text-orange-600 border-orange-200"
            >
              Unsaved changes
            </Badge>
          )}
          <Button variant="outline" onClick={handleResetToDefaults}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleSavePreferences}
            disabled={!hasChanges || isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {savedMessage && (
        <Alert
          className={
            savedMessage.includes("Failed")
              ? "border-red-200 bg-red-50"
              : "border-green-200 bg-green-50"
          }
        >
          <AlertDescription
            className={
              savedMessage.includes("Failed")
                ? "text-red-700"
                : "text-green-700"
            }
          >
            {savedMessage}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="channels" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Channel Preferences */}
        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(channelLabels).map(
                  ([channel, { label, icon: Icon }]) => (
                    <div
                      key={channel}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-gray-500" />
                        <div>
                          <Label className="font-medium">{label}</Label>
                          <p className="text-sm text-gray-500">
                            Receive notifications via {label.toLowerCase()}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={
                          preferences.channels[
                            channel as keyof typeof preferences.channels
                          ]
                        }
                        onCheckedChange={(checked) =>
                          handlePreferenceChange(`channels.${channel}`, checked)
                        }
                      />
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Category Preferences */}
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Notification Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(categoryLabels).map(([category, label]) => {
                const categoryPrefs =
                  preferences.categories[category as NotificationCategory];
                return (
                  <div
                    key={category}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">{label}</Label>
                        <p className="text-sm text-gray-500">
                          Configure notifications for {label.toLowerCase()}
                        </p>
                      </div>
                      <Switch
                        checked={categoryPrefs.enabled}
                        onCheckedChange={(checked) =>
                          handleCategoryPreferenceChange(
                            category as NotificationCategory,
                            "enabled",
                            checked,
                          )
                        }
                      />
                    </div>

                    {categoryPrefs.enabled && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                        <div>
                          <Label className="text-sm">Frequency</Label>
                          <Select
                            value={categoryPrefs.frequency}
                            onValueChange={(value) =>
                              handleCategoryPreferenceChange(
                                category as NotificationCategory,
                                "frequency",
                                value,
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">
                                Immediate
                              </SelectItem>
                              <SelectItem value="batched">Batched</SelectItem>
                              <SelectItem value="digest">
                                Daily Digest
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm">Priority</Label>
                          <Select
                            value={categoryPrefs.priority}
                            onValueChange={(value) =>
                              handleCategoryPreferenceChange(
                                category as NotificationCategory,
                                "priority",
                                value,
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm">Channels</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {categoryPrefs.channels.map((channel) => (
                              <Badge
                                key={channel}
                                variant="outline"
                                className="text-xs"
                              >
                                {channelLabels[channel]?.label || channel}
                              </Badge>
                            ))}
                            {categoryPrefs.channels.length === 0 && (
                              <Badge
                                variant="outline"
                                className="text-xs text-gray-500"
                              >
                                No channels
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Preferences */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Notification Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quiet Hours */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Quiet Hours</Label>
                    <p className="text-sm text-gray-500">
                      Pause non-urgent notifications during specified hours
                    </p>
                  </div>
                  <Switch
                    checked={preferences.schedule.quietHours.enabled}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange(
                        "schedule.quietHours.enabled",
                        checked,
                      )
                    }
                  />
                </div>

                {preferences.schedule.quietHours.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-4 border-l-2 border-gray-200">
                    <div>
                      <Label className="text-sm">Start Time</Label>
                      <Input
                        type="time"
                        value={preferences.schedule.quietHours.start}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "schedule.quietHours.start",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-sm">End Time</Label>
                      <Input
                        type="time"
                        value={preferences.schedule.quietHours.end}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "schedule.quietHours.end",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Timezone</Label>
                      <Select
                        value={preferences.schedule.quietHours.timezone}
                        onValueChange={(value) =>
                          handlePreferenceChange(
                            "schedule.quietHours.timezone",
                            value,
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Kolkata">
                            Asia/Kolkata (IST)
                          </SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">
                            America/New_York (EST)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Digest Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Digest Frequency</Label>
                  <Select
                    value={preferences.schedule.digestFrequency}
                    onValueChange={(value) =>
                      handlePreferenceChange("schedule.digestFrequency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Digest Time</Label>
                  <Input
                    type="time"
                    value={preferences.schedule.digestTime}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "schedule.digestTime",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Display Preferences */}
        <TabsContent value="display" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Display Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm">Theme</Label>
                  <Select
                    value={preferences.display.theme}
                    onValueChange={(value) =>
                      handlePreferenceChange("display.theme", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Density</Label>
                  <Select
                    value={preferences.display.density}
                    onValueChange={(value) =>
                      handlePreferenceChange("display.density", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: "showAvatars",
                    label: "Show Avatars",
                    description: "Display sender avatars in notifications",
                  },
                  {
                    key: "showPreviews",
                    label: "Show Previews",
                    description: "Show message previews in notification list",
                  },
                  {
                    key: "groupNotifications",
                    label: "Group Notifications",
                    description: "Group related notifications together",
                  },
                  {
                    key: "autoMarkRead",
                    label: "Auto Mark Read",
                    description:
                      "Automatically mark notifications as read when viewed",
                  },
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <Label className="font-medium">{setting.label}</Label>
                      <p className="text-sm text-gray-500">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      checked={
                        preferences.display[
                          setting.key as keyof typeof preferences.display
                        ] as boolean
                      }
                      onCheckedChange={(checked) =>
                        handlePreferenceChange(
                          `display.${setting.key}`,
                          checked,
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              {preferences.display.autoMarkRead && (
                <div className="pl-4 border-l-2 border-gray-200">
                  <Label className="text-sm">
                    Auto Mark Read Delay (seconds)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="30"
                    value={preferences.display.autoMarkReadDelay}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "display.autoMarkReadDelay",
                        parseInt(e.target.value),
                      )
                    }
                    className="w-32"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Preferences */}
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    key: "showSenderInfo",
                    label: "Show Sender Information",
                    description: "Display sender details in notifications",
                  },
                  {
                    key: "showPreviewInNotifications",
                    label: "Show Preview in Push Notifications",
                    description:
                      "Include message preview in push notifications",
                  },
                  {
                    key: "allowReadReceipts",
                    label: "Allow Read Receipts",
                    description:
                      "Let senders know when you've read their notifications",
                  },
                  {
                    key: "shareEngagementData",
                    label: "Share Engagement Data",
                    description:
                      "Allow anonymous usage analytics for improving the service",
                  },
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <Label className="font-medium">{setting.label}</Label>
                      <p className="text-sm text-gray-500">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      checked={
                        preferences.privacy[
                          setting.key as keyof typeof preferences.privacy
                        ] as boolean
                      }
                      onCheckedChange={(checked) =>
                        handlePreferenceChange(
                          `privacy.${setting.key}`,
                          checked,
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              <div>
                <Label className="text-sm">Data Retention</Label>
                <Select
                  value={preferences.privacy.dataRetention}
                  onValueChange={(value) =>
                    handlePreferenceChange("privacy.dataRetention", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30d">30 days</SelectItem>
                    <SelectItem value="90d">90 days</SelectItem>
                    <SelectItem value="1y">1 year</SelectItem>
                    <SelectItem value="indefinite">Indefinite</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  How long to keep your notification history
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Preferences */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                External Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Calendar Sync</Label>
                    <p className="text-sm text-gray-500">
                      Sync deadline notifications with your calendar
                    </p>
                  </div>
                  <Switch
                    checked={preferences.integrations.calendarSync}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange(
                        "integrations.calendarSync",
                        checked,
                      )
                    }
                  />
                </div>

                <div>
                  <Label className="text-sm">Email Forwarding</Label>
                  <Input
                    type="email"
                    placeholder="forward@example.com"
                    value={preferences.integrations.emailForwarding}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "integrations.emailForwarding",
                        e.target.value,
                      )
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Forward important notifications to this email address
                  </p>
                </div>

                <div>
                  <Label className="text-sm">Webhook URL</Label>
                  <Input
                    type="url"
                    placeholder="https://your-webhook-url.com"
                    value={preferences.integrations.webhookUrl}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "integrations.webhookUrl",
                        e.target.value,
                      )
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Receive notifications via webhook
                  </p>
                </div>

                <div>
                  <Label className="text-sm">Slack Channel</Label>
                  <Input
                    placeholder="#notifications"
                    value={preferences.integrations.slackChannel}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "integrations.slackChannel",
                        e.target.value,
                      )
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Send notifications to this Slack channel
                  </p>
                </div>

                <div>
                  <Label className="text-sm">Teams Channel</Label>
                  <Input
                    placeholder="General"
                    value={preferences.integrations.teamsChannel}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "integrations.teamsChannel",
                        e.target.value,
                      )
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Send notifications to this Teams channel
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getDefaultPreferences(): NotificationPreferences {
  return {
    channels: {
      inApp: true,
      email: true,
      sms: false,
      whatsapp: false,
      push: true,
    },
    categories: {
      operational: {
        enabled: true,
        channels: ["in_app", "email"],
        frequency: "immediate",
        priority: "medium",
      },
      financial: {
        enabled: true,
        channels: ["in_app", "email"],
        frequency: "immediate",
        priority: "high",
      },
      quality: {
        enabled: true,
        channels: ["in_app", "email"],
        frequency: "immediate",
        priority: "high",
      },
      compliance: {
        enabled: true,
        channels: ["in_app", "email"],
        frequency: "immediate",
        priority: "high",
      },
      system: {
        enabled: true,
        channels: ["in_app"],
        frequency: "batched",
        priority: "low",
      },
      workflow: {
        enabled: true,
        channels: ["in_app"],
        frequency: "immediate",
        priority: "medium",
      },
      promotional: {
        enabled: false,
        channels: ["in_app"],
        frequency: "digest",
        priority: "low",
      },
      emergency: {
        enabled: true,
        channels: ["in_app", "email", "sms"],
        frequency: "immediate",
        priority: "critical",
      },
      informational: {
        enabled: true,
        channels: ["in_app"],
        frequency: "digest",
        priority: "low",
      },
      tenant_admin: {
        enabled: true,
        channels: ["in_app", "email"],
        frequency: "immediate",
        priority: "medium",
      },
    },
    schedule: {
      quietHours: {
        enabled: false,
        start: "22:00",
        end: "06:00",
        timezone: "Asia/Kolkata",
      },
      digestFrequency: "daily",
      digestTime: "09:00",
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    },
    display: {
      theme: "auto",
      density: "comfortable",
      showAvatars: true,
      showPreviews: true,
      groupNotifications: true,
      autoMarkRead: true,
      autoMarkReadDelay: 3,
    },
    privacy: {
      showSenderInfo: true,
      showPreviewInNotifications: true,
      allowReadReceipts: true,
      shareEngagementData: false,
      dataRetention: "90d",
    },
    integrations: {
      calendarSync: false,
      emailForwarding: "",
      webhookUrl: "",
      slackChannel: "",
      teamsChannel: "",
    },
  };
}
