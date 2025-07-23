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
import { Progress } from "../../ui/progress";
import {
  Users,
  Plus,
  Send,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  StopCircle,
  Eye,
  Mail,
  MessageSquare,
  Smartphone,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  BulkCommunication as BulkCommunicationType,
  BulkCommunicationForm,
} from "./types";
import { bulkCommunications, communicationTemplates } from "./data";
import { useToast } from "../../ui/use-toast";

export function BulkCommunication() {
  const [campaigns, setCampaigns] =
    useState<BulkCommunicationType[]>(bulkCommunications);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] =
    useState<BulkCommunicationType | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<BulkCommunicationForm>({
    name: "",
    type: "email",
    templateId: "",
    subject: "",
    content: "",
    recipientType: "all_leads",
    scheduledAt: "",
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
        return <Send className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: "bg-gray-100 text-gray-800",
      scheduled: "bg-blue-100 text-blue-800",
      sending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      failed: "bg-red-100 text-red-800",
    };

    return (
      <Badge
        className={
          variants[status as keyof typeof variants] ||
          "bg-gray-100 text-gray-800"
        }
      >
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "sending":
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      case "failed":
      case "cancelled":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleCreateCampaign = () => {
    const newCampaign: BulkCommunicationType = {
      id: `bulk_${Date.now()}`,
      ...formData,
      status: formData.scheduledAt ? "scheduled" : "draft",
      recipients: [],
      totalRecipients: 0,
      sentCount: 0,
      deliveredCount: 0,
      failedCount: 0,
      openedCount: 0,
      clickedCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current_user",
    };

    setCampaigns((prev) => [newCampaign, ...prev]);
    setShowCreateDialog(false);
    setFormData({
      name: "",
      type: "email",
      templateId: "",
      subject: "",
      content: "",
      recipientType: "all_leads",
      scheduledAt: "",
    });

    toast({
      title: "Campaign Created",
      description: `${newCampaign.name} has been created successfully.`,
    });
  };

  const handleStartCampaign = (campaignId: string) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === campaignId
          ? { ...campaign, status: "sending", sentAt: new Date().toISOString() }
          : campaign,
      ),
    );

    toast({
      title: "Campaign Started",
      description: "The campaign has been started and messages are being sent.",
    });
  };

  const handlePauseCampaign = (campaignId: string) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === campaignId
          ? { ...campaign, status: "draft" }
          : campaign,
      ),
    );

    toast({
      title: "Campaign Paused",
      description: "The campaign has been paused.",
    });
  };

  const handleStopCampaign = (campaignId: string) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === campaignId
          ? { ...campaign, status: "cancelled" }
          : campaign,
      ),
    );

    toast({
      title: "Campaign Stopped",
      description: "The campaign has been stopped and cancelled.",
    });
  };

  const getDeliveryRate = (campaign: BulkCommunicationType) => {
    if (campaign.sentCount === 0) return 0;
    return (campaign.deliveredCount / campaign.sentCount) * 100;
  };

  const getOpenRate = (campaign: BulkCommunicationType) => {
    if (campaign.deliveredCount === 0) return 0;
    return (campaign.openedCount / campaign.deliveredCount) * 100;
  };

  const getProgress = (campaign: BulkCommunicationType) => {
    if (campaign.totalRecipients === 0) return 0;
    return (campaign.sentCount / campaign.totalRecipients) * 100;
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
        <span>Bulk Communication</span>
      </div>

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Bulk Communication
              </CardTitle>
              <CardDescription>
                Send bulk SMS, emails, and WhatsApp messages to multiple
                recipients
              </CardDescription>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Delivery Rate</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {campaign.subject ||
                          campaign.content.substring(0, 50) + "..."}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(campaign.type)}
                      <span className="capitalize">{campaign.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">
                        {campaign.totalRecipients}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {campaign.sentCount} sent
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Progress
                        value={getProgress(campaign)}
                        className="w-20"
                      />
                      <div className="text-xs text-center">
                        {getProgress(campaign).toFixed(0)}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">
                        {getDeliveryRate(campaign).toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {campaign.deliveredCount}/{campaign.sentCount}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">
                        {getOpenRate(campaign).toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {campaign.openedCount}/{campaign.deliveredCount}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(campaign.status)}
                      {getStatusBadge(campaign.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setShowDetailsDialog(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {campaign.status === "draft" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStartCampaign(campaign.id)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}

                      {campaign.status === "sending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePauseCampaign(campaign.id)}
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStopCampaign(campaign.id)}
                          >
                            <StopCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Campaign Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Create Bulk Campaign</DialogTitle>
            <DialogDescription>
              Create a new bulk communication campaign
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Q1 Product Launch"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaignType">Type</Label>
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

            <div className="space-y-2">
              <Label htmlFor="template">Template (Optional)</Label>
              <Select
                value={formData.templateId || ""}
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
                  placeholder="Your subject line here"
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
                placeholder="Your message content here..."
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients</Label>
              <Select
                value={formData.recipientType}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    recipientType: value as any,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_leads">All Leads</SelectItem>
                  <SelectItem value="filtered_leads">Filtered Leads</SelectItem>
                  <SelectItem value="custom_list">Custom List</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule (Optional)</Label>
              <Input
                id="schedule"
                type="datetime-local"
                value={formData.scheduledAt}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    scheduledAt: e.target.value,
                  }))
                }
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
            <Button onClick={handleCreateCampaign}>Create Campaign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Campaign Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedCampaign && getTypeIcon(selectedCampaign.type)}
              {selectedCampaign?.name}
            </DialogTitle>
            <DialogDescription>
              Campaign details and performance metrics
            </DialogDescription>
          </DialogHeader>

          {selectedCampaign && (
            <div className="space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Campaign Overview */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {selectedCampaign.totalRecipients}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Recipients
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedCampaign.sentCount}
                      </div>
                      <div className="text-sm text-muted-foreground">Sent</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedCampaign.deliveredCount}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Delivered
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {selectedCampaign.openedCount}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Opened
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Campaign Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{getProgress(selectedCampaign).toFixed(1)}%</span>
                      </div>
                      <Progress value={getProgress(selectedCampaign)} />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Delivery Rate
                        </div>
                        <div className="text-lg font-semibold text-green-600">
                          {getDeliveryRate(selectedCampaign).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Open Rate
                        </div>
                        <div className="text-lg font-semibold text-blue-600">
                          {getOpenRate(selectedCampaign).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Failed
                        </div>
                        <div className="text-lg font-semibold text-red-600">
                          {selectedCampaign.failedCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Message Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Message Content</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedCampaign.subject && (
                    <div className="mb-4">
                      <Label className="text-sm font-medium">Subject:</Label>
                      <p className="font-medium">{selectedCampaign.subject}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium">Content:</Label>
                    <div className="p-3 border rounded-lg bg-gray-50 whitespace-pre-wrap text-sm mt-2">
                      {selectedCampaign.content}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
