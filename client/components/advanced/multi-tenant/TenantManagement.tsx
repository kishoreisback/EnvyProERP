import React, { useState } from "react";
import { Tenant } from "./types";
import { useTenant } from "./TenantContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Building2,
  Users,
  Settings,
  CreditCard,
  Shield,
  Palette,
  BarChart3,
  Activity,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Database,
  Clock,
  AlertTriangle,
  CheckCircle,
  Edit,
  Save,
  X,
} from "lucide-react";
import { cn } from "../../../lib/utils";

interface TenantManagementProps {
  className?: string;
}

export function TenantManagement({ className }: TenantManagementProps) {
  const { currentTenant, updateBranding } = useTenant();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTenant, setEditedTenant] = useState<Tenant | null>(
    currentTenant,
  );

  if (!currentTenant) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No tenant selected</p>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTenant({ ...currentTenant });
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    setIsEditing(false);
    console.log("Saving tenant:", editedTenant);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTenant(currentTenant);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50";
      case "trial":
        return "text-blue-600 bg-blue-50";
      case "suspended":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "enterprise":
        return "text-purple-600 bg-purple-50";
      case "professional":
        return "text-blue-600 bg-blue-50";
      case "basic":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{currentTenant.name}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <Badge
              className={cn("text-xs", getStatusColor(currentTenant.status))}
            >
              {currentTenant.status}
            </Badge>
            <Badge className={cn("text-xs", getTierColor(currentTenant.tier))}>
              {currentTenant.tier}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {currentTenant.subdomain}.example.com
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Tenant
            </Button>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">
                  {currentTenant.usage.users.active}
                </p>
                <p className="text-xs text-muted-foreground">
                  of {currentTenant.usage.users.limit} limit
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">
                  {currentTenant.usage.storage.used}GB
                </p>
                <Progress
                  value={
                    (currentTenant.usage.storage.used /
                      currentTenant.usage.storage.limit) *
                    100
                  }
                  className="h-1 mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Monthly Cost</p>
                <p className="text-2xl font-bold">
                  ₹{(currentTenant.usage.billing.currentCost / 1000).toFixed(0)}
                  K
                </p>
                <p className="text-xs text-muted-foreground">
                  Next billing:{" "}
                  {currentTenant.billing.nextBillingDate.toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">API Calls</p>
                <p className="text-2xl font-bold">
                  {(currentTenant.usage.api.calls / 1000).toFixed(0)}K
                </p>
                <Progress
                  value={
                    (currentTenant.usage.api.calls /
                      currentTenant.limits.apiCalls) *
                    100
                  }
                  className="h-1 mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Company Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Company Name</Label>
                    <p className="text-sm">{currentTenant.company.name}</p>
                  </div>
                  <div>
                    <Label>Industry</Label>
                    <p className="text-sm">{currentTenant.company.industry}</p>
                  </div>
                  <div>
                    <Label>Company Size</Label>
                    <p className="text-sm capitalize">
                      {currentTenant.company.size}
                    </p>
                  </div>
                  <div>
                    <Label>Website</Label>
                    <p className="text-sm text-blue-600">
                      {currentTenant.company.website}
                    </p>
                  </div>
                </div>
                <div>
                  <Label>Address</Label>
                  <p className="text-sm">
                    {currentTenant.company.address.street},{" "}
                    {currentTenant.company.address.city},{" "}
                    {currentTenant.company.address.state}{" "}
                    {currentTenant.company.address.zipCode},{" "}
                    {currentTenant.company.address.country}
                  </p>
                </div>
                <div>
                  <Label>Description</Label>
                  <p className="text-sm">{currentTenant.company.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Primary Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <p className="text-sm">
                      {currentTenant.primaryContact.name}
                    </p>
                  </div>
                  <div>
                    <Label>Role</Label>
                    <p className="text-sm">
                      {currentTenant.primaryContact.role}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {currentTenant.primaryContact.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {currentTenant.primaryContact.phone}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Usage Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Users</span>
                    <span className="text-sm font-medium">
                      {currentTenant.usage.users.active} /{" "}
                      {currentTenant.limits.users}
                    </span>
                  </div>
                  <Progress
                    value={
                      (currentTenant.usage.users.active /
                        currentTenant.limits.users) *
                      100
                    }
                    className="h-2"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage</span>
                    <span className="text-sm font-medium">
                      {currentTenant.usage.storage.used}GB /{" "}
                      {currentTenant.limits.storage}GB
                    </span>
                  </div>
                  <Progress
                    value={
                      (currentTenant.usage.storage.used /
                        currentTenant.limits.storage) *
                      100
                    }
                    className="h-2"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Calls</span>
                    <span className="text-sm font-medium">
                      {(currentTenant.usage.api.calls / 1000).toFixed(0)}K /{" "}
                      {(currentTenant.limits.apiCalls / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <Progress
                    value={
                      (currentTenant.usage.api.calls /
                        currentTenant.limits.apiCalls) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">User login</p>
                      <p className="text-xs text-muted-foreground">
                        5 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Project created</p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Report generated</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={currentTenant.config.timezone}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">
                          Asia/Kolkata
                        </SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">
                          America/New_York
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={currentTenant.config.currency}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select
                      value={currentTenant.config.dateFormat}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeFormat">Time Format</Label>
                    <Select
                      value={currentTenant.config.timeFormat}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12 Hour</SelectItem>
                        <SelectItem value="24h">24 Hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={currentTenant.config.notifications.email}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <Switch
                    id="sms-notifications"
                    checked={currentTenant.config.notifications.sms}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <Switch
                    id="push-notifications"
                    checked={currentTenant.config.notifications.push}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="slack-notifications">Slack Integration</Label>
                  <Switch
                    id="slack-notifications"
                    checked={currentTenant.config.notifications.slack}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data & Backup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-retention">Data Retention</Label>
                  <Switch
                    id="data-retention"
                    checked={currentTenant.config.dataRetention.enabled}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="retention-period">
                    Retention Period (days)
                  </Label>
                  <Input
                    id="retention-period"
                    type="number"
                    value={currentTenant.config.dataRetention.retentionPeriod}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-backup">Automatic Backup</Label>
                  <Switch
                    id="auto-backup"
                    checked={currentTenant.config.backup.enabled}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select
                    value={currentTenant.config.backup.frequency}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="api-access">API Access</Label>
                  <Switch
                    id="api-access"
                    checked={currentTenant.config.integrations.apiAccess}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="webhooks">Webhooks</Label>
                  <Switch
                    id="webhooks"
                    checked={currentTenant.config.integrations.webhooks}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sso">Single Sign-On</Label>
                  <Switch
                    id="sso"
                    checked={currentTenant.config.integrations.sso}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="custom-domain">Custom Domain</Label>
                  <Switch
                    id="custom-domain"
                    checked={currentTenant.config.integrations.customDomain}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Branding & Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Logo & Images</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Primary Logo</Label>
                      <div className="mt-2 p-4 border-2 border-dashed rounded-lg text-center">
                        <img
                          src={currentTenant.branding.logo.primary}
                          alt="Primary Logo"
                          className="h-12 mx-auto"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Favicon</Label>
                      <div className="mt-2 p-4 border-2 border-dashed rounded-lg text-center">
                        <img
                          src={
                            currentTenant.branding.logo.favicon ||
                            "/api/placeholder/32/32"
                          }
                          alt="Favicon"
                          className="h-8 mx-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Color Scheme</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>Primary</Label>
                      <div
                        className="w-full h-10 rounded border mt-1"
                        style={{
                          backgroundColor:
                            currentTenant.branding.colors.primary,
                        }}
                      ></div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {currentTenant.branding.colors.primary}
                      </p>
                    </div>
                    <div>
                      <Label>Secondary</Label>
                      <div
                        className="w-full h-10 rounded border mt-1"
                        style={{
                          backgroundColor:
                            currentTenant.branding.colors.secondary,
                        }}
                      ></div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {currentTenant.branding.colors.secondary}
                      </p>
                    </div>
                    <div>
                      <Label>Accent</Label>
                      <div
                        className="w-full h-10 rounded border mt-1"
                        style={{
                          backgroundColor: currentTenant.branding.colors.accent,
                        }}
                      ></div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {currentTenant.branding.colors.accent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Typography</h4>
                  <div>
                    <Label>Font Family</Label>
                    <p
                      className="text-sm"
                      style={{
                        fontFamily:
                          currentTenant.branding.typography.fontFamily,
                      }}
                    >
                      {currentTenant.branding.typography.fontFamily}
                    </p>
                  </div>
                  <div>
                    <Label>Font Size</Label>
                    <p className="text-sm capitalize">
                      {currentTenant.branding.typography.fontSize}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">White Label Settings</h4>
                  <div className="flex items-center justify-between">
                    <Label>White Label Enabled</Label>
                    <Badge
                      className={cn(
                        "text-xs",
                        currentTenant.branding.whiteLabel.enabled
                          ? "text-green-600 bg-green-50"
                          : "text-gray-600 bg-gray-50",
                      )}
                    >
                      {currentTenant.branding.whiteLabel.enabled
                        ? "Enabled"
                        : "Disabled"}
                    </Badge>
                  </div>
                  {currentTenant.branding.whiteLabel.enabled && (
                    <div>
                      <Label>Company Name</Label>
                      <p className="text-sm">
                        {currentTenant.branding.whiteLabel.companyName}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Core Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(currentTenant.features)
                  .slice(0, 10)
                  .map(([feature, enabled]) => (
                    <div
                      key={feature}
                      className="flex items-center justify-between"
                    >
                      <Label className="capitalize">
                        {feature.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </Label>
                      <div className="flex items-center space-x-2">
                        {enabled ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400" />
                        )}
                        <Switch checked={enabled} disabled />
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(currentTenant.features)
                  .slice(10)
                  .map(([feature, enabled]) => (
                    <div
                      key={feature}
                      className="flex items-center justify-between"
                    >
                      <Label className="capitalize">
                        {feature.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </Label>
                      <div className="flex items-center space-x-2">
                        {enabled ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400" />
                        )}
                        <Switch checked={enabled} disabled />
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Billing Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Plan</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.billing.plan}
                    </p>
                  </div>
                  <div>
                    <Label>Billing Cycle</Label>
                    <p className="text-sm capitalize">
                      {currentTenant.billing.billingCycle}
                    </p>
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <p className="text-sm">{currentTenant.billing.currency}</p>
                  </div>
                  <div>
                    <Label>Payment Method</Label>
                    <p className="text-sm capitalize">
                      {currentTenant.billing.paymentMethod}
                    </p>
                  </div>
                </div>
                <div>
                  <Label>Next Billing Date</Label>
                  <p className="text-sm">
                    {currentTenant.billing.nextBillingDate.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label>Billing Email</Label>
                  <p className="text-sm">
                    {currentTenant.billing.billingEmail}
                  </p>
                </div>
                {currentTenant.billing.taxId && (
                  <div>
                    <Label>Tax ID</Label>
                    <p className="text-sm">{currentTenant.billing.taxId}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Usage & Costs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Current Period Cost</span>
                    <span className="font-medium">
                      ₹
                      {currentTenant.usage.billing.currentCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Projected Cost</span>
                    <span className="font-medium">
                      ₹
                      {currentTenant.usage.billing.projectedCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Overage Charges</span>
                    <span className="font-medium">
                      ₹
                      {currentTenant.usage.billing.overageCharges.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      ₹
                      {(
                        currentTenant.usage.billing.currentCost +
                        currentTenant.usage.billing.overageCharges
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Authentication</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Password Policy</Label>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>
                      • Minimum{" "}
                      {
                        currentTenant.security.authentication.passwordPolicy
                          .minLength
                      }{" "}
                      characters
                    </p>
                    <p>
                      • Uppercase:{" "}
                      {currentTenant.security.authentication.passwordPolicy
                        .requireUppercase
                        ? "Required"
                        : "Not required"}
                    </p>
                    <p>
                      • Numbers:{" "}
                      {currentTenant.security.authentication.passwordPolicy
                        .requireNumbers
                        ? "Required"
                        : "Not required"}
                    </p>
                    <p>
                      • Special characters:{" "}
                      {currentTenant.security.authentication.passwordPolicy
                        .requireSpecialChars
                        ? "Required"
                        : "Not required"}
                    </p>
                  </div>
                </div>
                <div>
                  <Label>Multi-Factor Authentication</Label>
                  <div className="mt-2">
                    <Badge
                      className={cn(
                        "text-xs",
                        currentTenant.security.authentication.mfa.required
                          ? "text-green-600 bg-green-50"
                          : "text-yellow-600 bg-yellow-50",
                      )}
                    >
                      {currentTenant.security.authentication.mfa.required
                        ? "Required"
                        : "Optional"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Session Timeout</Label>
                  <p className="text-sm">
                    {currentTenant.security.authentication.sessionTimeout}{" "}
                    minutes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Encryption Level</Label>
                  <Badge
                    className={cn(
                      "text-xs",
                      currentTenant.security.dataProtection.encryption ===
                        "enhanced"
                        ? "text-green-600 bg-green-50"
                        : "text-blue-600 bg-blue-50",
                    )}
                  >
                    {currentTenant.security.dataProtection.encryption}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Label>GDPR Compliant</Label>
                  {currentTenant.security.dataProtection.gdprCompliant ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div>
                  <Label>Data Residency</Label>
                  <p className="text-sm">
                    {currentTenant.security.dataProtection.dataResidency}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Backup Encryption</Label>
                  {currentTenant.security.dataProtection.backupEncryption ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>IP Whitelist</Label>
                  {currentTenant.security.accessControl.ipWhitelist.length >
                  0 ? (
                    <div className="mt-2 space-y-1">
                      {currentTenant.security.accessControl.ipWhitelist.map(
                        (ip, index) => (
                          <p key={index} className="text-sm font-mono">
                            {ip}
                          </p>
                        ),
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No restrictions
                    </p>
                  )}
                </div>
                <div>
                  <Label>Allowed Countries</Label>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {currentTenant.security.accessControl.allowedCountries.map(
                      (country, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {country}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Mobile Access</Label>
                  {currentTenant.security.accessControl.allowMobileAccess ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit & Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Audit Logging</Label>
                  {currentTenant.security.audit.enabled ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div>
                  <Label>Log Retention</Label>
                  <p className="text-sm">
                    {currentTenant.security.audit.logRetention} days
                  </p>
                </div>
                <div>
                  <Label>Log Level</Label>
                  <Badge variant="outline" className="text-xs capitalize">
                    {currentTenant.security.audit.logLevel}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Real-time Alerts</Label>
                  {currentTenant.security.audit.realTimeAlerts ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Response Time</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.analytics.performance.averageResponseTime}
                      ms
                    </p>
                  </div>
                  <div>
                    <Label>Uptime</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.analytics.performance.uptime}%
                    </p>
                  </div>
                  <div>
                    <Label>Error Rate</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.analytics.performance.errorRate}%
                    </p>
                  </div>
                  <div>
                    <Label>Throughput</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.analytics.performance.throughput} req/min
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Daily Active Users</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.analytics.engagement.dailyActiveUsers}
                    </p>
                  </div>
                  <div>
                    <Label>Monthly Active Users</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.analytics.engagement.monthlyActiveUsers}
                    </p>
                  </div>
                  <div>
                    <Label>Session Duration</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.analytics.engagement.sessionDuration} min
                    </p>
                  </div>
                  <div>
                    <Label>Login Frequency</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.analytics.engagement.loginFrequency}/day
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Projects Completed</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.analytics.business.projectsCompleted}
                    </p>
                  </div>
                  <div>
                    <Label>Revenue Generated</Label>
                    <p className="text-sm font-medium">
                      ₹
                      {(
                        currentTenant.analytics.business.revenueGenerated /
                        100000
                      ).toFixed(1)}
                      L
                    </p>
                  </div>
                  <div>
                    <Label>Customer Satisfaction</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.analytics.business.customerSatisfaction}/10
                    </p>
                  </div>
                  <div>
                    <Label>Task Completion Rate</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.analytics.business.taskCompletionRate}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage Utilization</span>
                    <span className="text-sm font-medium">
                      {currentTenant.analytics.health.storageUtilization}%
                    </span>
                  </div>
                  <Progress
                    value={currentTenant.analytics.health.storageUtilization}
                    className="h-2"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm font-medium">
                      {currentTenant.analytics.health.cpuUsage}%
                    </span>
                  </div>
                  <Progress
                    value={currentTenant.analytics.health.cpuUsage}
                    className="h-2"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm font-medium">
                      {currentTenant.analytics.health.memoryUsage}%
                    </span>
                  </div>
                  <Progress
                    value={currentTenant.analytics.health.memoryUsage}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
