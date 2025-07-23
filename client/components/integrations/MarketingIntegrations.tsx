import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
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
  DialogTrigger,
} from "../ui/dialog";
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
import { AnimatedIcon, PulsingDot, GlowingOrb } from "../ui/animated-icons";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  Mail,
  MessageSquare,
  Phone,
  Users,
  TrendingUp,
  Eye,
  MousePointer,
  Send,
  Calendar,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Plus,
  ExternalLink,
  BarChart3,
  Target,
  Clock,
} from "lucide-react";
import { mockIntegrations, mockCampaigns } from "./data";
import { MarketingCampaign } from "./types";

export function MarketingIntegrations() {
  const [selectedCampaign, setSelectedCampaign] =
    useState<MarketingCampaign | null>(null);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "email" as const,
    integration: "",
    message: "",
    audience: "all",
  });

  const marketingIntegrations = mockIntegrations.filter(
    (int) => int.category === "marketing",
  );
  const connectedMarketingIntegrations = marketingIntegrations.filter(
    (int) => int.status === "connected",
  );

  const totalAudience = mockCampaigns.reduce(
    (sum, campaign) => sum + campaign.audience,
    0,
  );
  const totalSent = mockCampaigns.reduce(
    (sum, campaign) => sum + campaign.sent,
    0,
  );
  const totalOpened = mockCampaigns.reduce(
    (sum, campaign) => sum + campaign.opened,
    0,
  );
  const totalClicked = mockCampaigns.reduce(
    (sum, campaign) => sum + campaign.clicked,
    0,
  );

  const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;
  const clickRate = totalOpened > 0 ? (totalClicked / totalOpened) * 100 : 0;

  const handleCreateCampaign = () => {
    // Mock campaign creation
    console.log("Creating campaign:", newCampaign);
    setShowCreateCampaign(false);
    setNewCampaign({
      name: "",
      type: "email",
      integration: "",
      message: "",
      audience: "all",
    });
  };

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return Mail;
      case "sms":
        return Phone;
      case "whatsapp":
        return MessageSquare;
      default:
        return Mail;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "completed":
        return "text-blue-600";
      case "paused":
        return "text-yellow-600";
      case "draft":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Marketing Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover-lift animate-fadeInUp">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <AnimatedIcon
                  icon={Users}
                  animation="float"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={totalAudience} />
                </p>
                <p className="text-sm text-muted-foreground">Total Audience</p>
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
                <AnimatedIcon
                  icon={Send}
                  animation="bounce"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={totalSent} />
                </p>
                <p className="text-sm text-muted-foreground">Messages Sent</p>
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
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                <AnimatedIcon
                  icon={Eye}
                  animation="pulse"
                  className="h-6 w-6 text-orange-600 dark:text-orange-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={Math.round(openRate)} />%
                </p>
                <p className="text-sm text-muted-foreground">Open Rate</p>
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
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <AnimatedIcon
                  icon={MousePointer}
                  animation="bounce"
                  className="h-6 w-6 text-purple-600 dark:text-purple-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={Math.round(clickRate)} />%
                </p>
                <p className="text-sm text-muted-foreground">Click Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connected Integrations */}
      <Card className="animate-fadeInUp">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Marketing Integrations</CardTitle>
              <CardDescription>
                Connected marketing platforms and their usage
              </CardDescription>
            </div>
            <Dialog
              open={showCreateCampaign}
              onOpenChange={setShowCreateCampaign}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Marketing Campaign</DialogTitle>
                  <DialogDescription>
                    Set up a new marketing campaign across your connected
                    platforms
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input
                      id="campaign-name"
                      value={newCampaign.name}
                      onChange={(e) =>
                        setNewCampaign((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter campaign name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="campaign-type">Campaign Type</Label>
                    <Select
                      value={newCampaign.type}
                      onValueChange={(value: any) =>
                        setNewCampaign((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email Campaign</SelectItem>
                        <SelectItem value="sms">SMS Campaign</SelectItem>
                        <SelectItem value="whatsapp">
                          WhatsApp Campaign
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="integration">Integration</Label>
                    <Select
                      value={newCampaign.integration}
                      onValueChange={(value) =>
                        setNewCampaign((prev) => ({
                          ...prev,
                          integration: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select integration" />
                      </SelectTrigger>
                      <SelectContent>
                        {connectedMarketingIntegrations.map((integration) => (
                          <SelectItem
                            key={integration.id}
                            value={integration.id}
                          >
                            {integration.icon} {integration.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={newCampaign.message}
                      onChange={(e) =>
                        setNewCampaign((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Enter your campaign message"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowCreateCampaign(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateCampaign}>
                      Create Campaign
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {connectedMarketingIntegrations.map((integration) => (
              <Card key={integration.id} className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{integration.icon}</span>
                    <div>
                      <h4 className="font-medium">{integration.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {integration.provider}
                      </p>
                    </div>
                  </div>

                  {integration.usage && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>API Usage</span>
                        <span>
                          {integration.usage.apiCalls.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={
                          (integration.usage.apiCalls /
                            integration.usage.apiLimit) *
                          100
                        }
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {integration.usage.dataTransferred}MB transferred
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Management */}
      <Card className="animate-fadeInUp">
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
          <CardDescription>
            Manage and monitor your marketing campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Opened</TableHead>
                <TableHead>Clicked</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCampaigns.map((campaign) => {
                const TypeIcon = getCampaignTypeIcon(campaign.type);
                const integration = mockIntegrations.find(
                  (int) => int.id === campaign.integration,
                );

                return (
                  <TableRow key={campaign.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <span className="text-sm">{integration?.icon}</span>
                          {integration?.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-4 w-4" />
                        {campaign.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          campaign.status === "active"
                            ? "default"
                            : campaign.status === "completed"
                              ? "outline"
                              : "secondary"
                        }
                        className={getStatusColor(campaign.status)}
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <AnimatedCounter value={campaign.audience} />
                    </TableCell>
                    <TableCell>
                      <AnimatedCounter value={campaign.sent} />
                    </TableCell>
                    <TableCell>
                      <div>
                        <AnimatedCounter value={campaign.opened} />
                        <span className="text-xs text-muted-foreground ml-1">
                          ({Math.round((campaign.opened / campaign.sent) * 100)}
                          %)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <AnimatedCounter value={campaign.clicked} />
                        <span className="text-xs text-muted-foreground ml-1">
                          (
                          {Math.round(
                            (campaign.clicked / campaign.opened) * 100,
                          )}
                          %)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {campaign.status === "active" && (
                          <Button size="sm" variant="outline">
                            <PauseCircle className="h-3 w-3" />
                          </Button>
                        )}
                        {campaign.status === "paused" && (
                          <Button size="sm" variant="outline">
                            <PlayCircle className="h-3 w-3" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
