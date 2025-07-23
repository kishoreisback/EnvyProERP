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
import { Progress } from "../../ui/progress";
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Mail,
  MessageSquare,
  Smartphone,
  Key,
  Activity,
  DollarSign,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CommunicationProvider } from "./types";
import { communicationProviders } from "./data";
import { useToast } from "../../ui/use-toast";

export function Integrations() {
  const [providers, setProviders] = useState<CommunicationProvider[]>(
    communicationProviders,
  );
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [selectedProvider, setSelectedProvider] =
    useState<CommunicationProvider | null>(null);
  const { toast } = useToast();

  const [configData, setConfigData] = useState({
    name: "",
    type: "email" as "sms" | "email" | "whatsapp",
    apiKey: "",
    apiSecret: "",
    senderId: "",
    webhookUrl: "",
    dailyLimit: 0,
    monthlyLimit: 0,
    costPerMessage: 0,
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
        return <Settings className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (provider: CommunicationProvider) => {
    if (!provider.isActive) {
      return <Badge variant="secondary">Inactive</Badge>;
    }
    if (!provider.isHealthy) {
      return <Badge variant="destructive">Error</Badge>;
    }
    return <Badge variant="default">Active</Badge>;
  };

  const getStatusIcon = (provider: CommunicationProvider) => {
    if (!provider.isActive) {
      return <Clock className="h-4 w-4 text-gray-500" />;
    }
    if (!provider.isHealthy) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  const handleToggleProvider = (providerId: string) => {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.id === providerId
          ? { ...provider, isActive: !provider.isActive }
          : provider,
      ),
    );

    toast({
      title: "Provider Updated",
      description: "The provider status has been updated.",
    });
  };

  const handleSetPrimary = (providerId: string, type: string) => {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.type === type
          ? { ...provider, isPrimary: provider.id === providerId }
          : provider,
      ),
    );

    toast({
      title: "Primary Provider Updated",
      description: "The primary provider has been updated.",
    });
  };

  const handleTestProvider = (provider: CommunicationProvider) => {
    // Simulate testing the provider
    toast({
      title: "Testing Provider",
      description: `Testing connection to ${provider.name}...`,
    });

    setTimeout(() => {
      toast({
        title: "Test Successful",
        description: `${provider.name} is working correctly.`,
      });
    }, 2000);
  };

  const getUsagePercentage = (provider: CommunicationProvider) => {
    if (!provider.dailyLimit) return 0;
    // Calculate mock usage based on credits remaining
    const used = provider.dailyLimit - (provider.creditsRemaining || 0) / 10;
    return Math.max(0, Math.min(100, (used / provider.dailyLimit) * 100));
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
        <span>Integrations</span>
      </div>

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Communication Integrations
              </CardTitle>
              <CardDescription>
                Configure and manage your SMS, Email, and WhatsApp service
                providers
              </CardDescription>
            </div>
            <Button onClick={() => setShowConfigDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Provider
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Providers by Type */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Email Providers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Providers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {providers
              .filter((p) => p.type === "email")
              .map((provider) => (
                <div
                  key={provider.id}
                  className="p-4 border rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(provider)}
                      <span className="font-medium">{provider.name}</span>
                    </div>
                    {getStatusBadge(provider)}
                  </div>

                  {provider.isPrimary && (
                    <Badge variant="outline" className="text-xs">
                      Primary
                    </Badge>
                  )}

                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Daily Limit:</span>
                      <span>{provider.dailyLimit?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Credits:</span>
                      <span>{provider.creditsRemaining?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost:</span>
                      <span>${provider.costPerMessage?.toFixed(4)}</span>
                    </div>
                  </div>

                  {provider.dailyLimit && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Daily Usage</span>
                        <span>{getUsagePercentage(provider).toFixed(0)}%</span>
                      </div>
                      <Progress
                        value={getUsagePercentage(provider)}
                        className="h-2"
                      />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestProvider(provider)}
                    >
                      Test
                    </Button>
                    <Switch
                      checked={provider.isActive}
                      onCheckedChange={() => handleToggleProvider(provider.id)}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* SMS Providers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              SMS Providers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {providers
              .filter((p) => p.type === "sms")
              .map((provider) => (
                <div
                  key={provider.id}
                  className="p-4 border rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(provider)}
                      <span className="font-medium">{provider.name}</span>
                    </div>
                    {getStatusBadge(provider)}
                  </div>

                  {provider.isPrimary && (
                    <Badge variant="outline" className="text-xs">
                      Primary
                    </Badge>
                  )}

                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Daily Limit:</span>
                      <span>{provider.dailyLimit?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Credits:</span>
                      <span>{provider.creditsRemaining?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost:</span>
                      <span>${provider.costPerMessage?.toFixed(4)}</span>
                    </div>
                  </div>

                  {provider.dailyLimit && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Daily Usage</span>
                        <span>{getUsagePercentage(provider).toFixed(0)}%</span>
                      </div>
                      <Progress
                        value={getUsagePercentage(provider)}
                        className="h-2"
                      />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestProvider(provider)}
                    >
                      Test
                    </Button>
                    <Switch
                      checked={provider.isActive}
                      onCheckedChange={() => handleToggleProvider(provider.id)}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* WhatsApp Providers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              WhatsApp Providers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {providers
              .filter((p) => p.type === "whatsapp")
              .map((provider) => (
                <div
                  key={provider.id}
                  className="p-4 border rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(provider)}
                      <span className="font-medium">{provider.name}</span>
                    </div>
                    {getStatusBadge(provider)}
                  </div>

                  {provider.isPrimary && (
                    <Badge variant="outline" className="text-xs">
                      Primary
                    </Badge>
                  )}

                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Daily Limit:</span>
                      <span>{provider.dailyLimit?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Credits:</span>
                      <span>{provider.creditsRemaining?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost:</span>
                      <span>${provider.costPerMessage?.toFixed(4)}</span>
                    </div>
                  </div>

                  {provider.dailyLimit && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Daily Usage</span>
                        <span>{getUsagePercentage(provider).toFixed(0)}%</span>
                      </div>
                      <Progress
                        value={getUsagePercentage(provider)}
                        className="h-2"
                      />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestProvider(provider)}
                    >
                      Test
                    </Button>
                    <Switch
                      checked={provider.isActive}
                      onCheckedChange={() => handleToggleProvider(provider.id)}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Providers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Providers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Daily Limit</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Cost/Message</TableHead>
                <TableHead>Last Check</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(provider.type)}
                      <div>
                        <div className="font-medium">{provider.name}</div>
                        {provider.isPrimary && (
                          <Badge variant="outline" className="text-xs">
                            Primary
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{provider.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(provider)}
                      {getStatusBadge(provider)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {provider.dailyLimit?.toLocaleString() || "N/A"}
                  </TableCell>
                  <TableCell>
                    {provider.creditsRemaining?.toLocaleString() || "N/A"}
                  </TableCell>
                  <TableCell>
                    ${provider.costPerMessage?.toFixed(4) || "N/A"}
                  </TableCell>
                  <TableCell>
                    {provider.lastStatusCheck
                      ? new Date(provider.lastStatusCheck).toLocaleDateString()
                      : "Never"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedProvider(provider);
                          setConfigData({
                            name: provider.name,
                            type: provider.type,
                            apiKey: provider.config.apiKey || "",
                            apiSecret: provider.config.apiSecret || "",
                            senderId: provider.config.senderId || "",
                            webhookUrl: provider.config.webhookUrl || "",
                            dailyLimit: provider.dailyLimit || 0,
                            monthlyLimit: provider.monthlyLimit || 0,
                            costPerMessage: provider.costPerMessage || 0,
                          });
                          setShowConfigDialog(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!provider.isPrimary && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleSetPrimary(provider.id, provider.type)
                          }
                        >
                          <Key className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Provider Configuration Dialog */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              {selectedProvider ? "Edit Provider" : "Add New Provider"}
            </DialogTitle>
            <DialogDescription>
              Configure your communication service provider settings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="providerName">Provider Name</Label>
                <Input
                  id="providerName"
                  value={configData.name}
                  onChange={(e) =>
                    setConfigData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Twilio SMS"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="providerType">Type</Label>
                <select
                  id="providerType"
                  value={configData.type}
                  onChange={(e) =>
                    setConfigData((prev) => ({
                      ...prev,
                      type: e.target.value as any,
                    }))
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={configData.apiKey}
                onChange={(e) =>
                  setConfigData((prev) => ({ ...prev, apiKey: e.target.value }))
                }
                placeholder="Your API key"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiSecret">API Secret</Label>
              <Input
                id="apiSecret"
                type="password"
                value={configData.apiSecret}
                onChange={(e) =>
                  setConfigData((prev) => ({
                    ...prev,
                    apiSecret: e.target.value,
                  }))
                }
                placeholder="Your API secret"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senderId">Sender ID</Label>
              <Input
                id="senderId"
                value={configData.senderId}
                onChange={(e) =>
                  setConfigData((prev) => ({
                    ...prev,
                    senderId: e.target.value,
                  }))
                }
                placeholder="Your sender ID or phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={configData.webhookUrl}
                onChange={(e) =>
                  setConfigData((prev) => ({
                    ...prev,
                    webhookUrl: e.target.value,
                  }))
                }
                placeholder="https://yourapp.com/webhooks/provider"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="dailyLimit">Daily Limit</Label>
                <Input
                  id="dailyLimit"
                  type="number"
                  value={configData.dailyLimit}
                  onChange={(e) =>
                    setConfigData((prev) => ({
                      ...prev,
                      dailyLimit: parseInt(e.target.value) || 0,
                    }))
                  }
                  placeholder="1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyLimit">Monthly Limit</Label>
                <Input
                  id="monthlyLimit"
                  type="number"
                  value={configData.monthlyLimit}
                  onChange={(e) =>
                    setConfigData((prev) => ({
                      ...prev,
                      monthlyLimit: parseInt(e.target.value) || 0,
                    }))
                  }
                  placeholder="25000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costPerMessage">Cost per Message</Label>
                <Input
                  id="costPerMessage"
                  type="number"
                  step="0.0001"
                  value={configData.costPerMessage}
                  onChange={(e) =>
                    setConfigData((prev) => ({
                      ...prev,
                      costPerMessage: parseFloat(e.target.value) || 0,
                    }))
                  }
                  placeholder="0.0075"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfigDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: selectedProvider
                    ? "Provider Updated"
                    : "Provider Added",
                  description: "The provider configuration has been saved.",
                });
                setShowConfigDialog(false);
                setSelectedProvider(null);
              }}
            >
              {selectedProvider ? "Update" : "Add"} Provider
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
