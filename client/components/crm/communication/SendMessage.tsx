import React, { useState } from "react";
import { Button } from "../../ui/button";
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
import { Badge } from "../../ui/badge";
import {
  Send,
  Plus,
  X,
  Mail,
  MessageSquare,
  Smartphone,
  Clock,
  Users,
} from "lucide-react";
import { SendMessageForm } from "./types";
import { communicationTemplates } from "./data";
import { mockLeads } from "../lead/data";
import { useToast } from "../../ui/use-toast";

interface SendMessageProps {
  onClose: () => void;
  preselectedLeadIds?: string[];
  preselectedType?: "sms" | "email" | "whatsapp";
}

export function SendMessage({
  onClose,
  preselectedLeadIds,
  preselectedType,
}: SendMessageProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SendMessageForm>({
    type: preselectedType || "email",
    to: [],
    subject: "",
    content: "",
    templateId: "",
    scheduledAt: "",
    leadIds: preselectedLeadIds || [],
  });

  const [recipientInput, setRecipientInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const addRecipient = () => {
    if (recipientInput.trim() && !formData.to.includes(recipientInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        to: [...prev.to, recipientInput.trim()],
      }));
      setRecipientInput("");
    }
  };

  const removeRecipient = (recipient: string) => {
    setFormData((prev) => ({
      ...prev,
      to: prev.to.filter((r) => r !== recipient),
    }));
  };

  const addLeadsAsRecipients = () => {
    const selectedLeads = mockLeads.filter((lead) =>
      formData.leadIds?.includes(lead.id),
    );
    const newRecipients = selectedLeads
      .map((lead) => (formData.type === "email" ? lead.email : lead.phone))
      .filter((contact) => contact && !formData.to.includes(contact));

    setFormData((prev) => ({
      ...prev,
      to: [...prev.to, ...newRecipients],
    }));
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = communicationTemplates.find((t) => t.id === templateId);
    if (template) {
      setFormData((prev) => ({
        ...prev,
        templateId,
        subject: template.subject || prev.subject,
        content: template.content,
      }));
    }
  };

  const handleSendMessage = async () => {
    if (formData.to.length === 0) {
      toast({
        title: "No Recipients",
        description: "Please add at least one recipient.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "No Content",
        description: "Please enter message content.",
        variant: "destructive",
      });
      return;
    }

    if (formData.type === "email" && !formData.subject?.trim()) {
      toast({
        title: "No Subject",
        description: "Please enter an email subject.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate sending message
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Message Sent Successfully",
        description: `${formData.type.toUpperCase()} sent to ${formData.to.length} recipient(s).`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description:
          "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEstimatedCost = () => {
    const costs = { email: 0.0001, sms: 0.0075, whatsapp: 0.05 };
    return (formData.to.length * costs[formData.type]).toFixed(4);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send Message
          </DialogTitle>
          <DialogDescription>
            Send SMS, email, or WhatsApp message to your contacts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Message Type */}
          <div className="space-y-2">
            <Label htmlFor="messageType">Message Type</Label>
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
                <SelectItem value="email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </SelectItem>
                <SelectItem value="sms">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    SMS
                  </div>
                </SelectItem>
                <SelectItem value="whatsapp">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Template Selection */}
          <div className="space-y-2">
            <Label htmlFor="template">Template (Optional)</Label>
            <Select
              value={formData.templateId || ""}
              onValueChange={handleTemplateSelect}
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

          {/* Recipients */}
          <div className="space-y-2">
            <Label htmlFor="recipients">Recipients</Label>

            {/* Add from leads */}
            {formData.leadIds && formData.leadIds.length > 0 && (
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  {formData.leadIds.length} lead(s) selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addLeadsAsRecipients}
                >
                  Add to Recipients
                </Button>
              </div>
            )}

            {/* Manual recipient input */}
            <div className="flex gap-2">
              <Input
                value={recipientInput}
                onChange={(e) => setRecipientInput(e.target.value)}
                placeholder={
                  formData.type === "email"
                    ? "email@example.com"
                    : "+91-9876543210"
                }
                onKeyPress={(e) => e.key === "Enter" && addRecipient()}
              />
              <Button variant="outline" onClick={addRecipient}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Recipients list */}
            {formData.to.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Recipients ({formData.to.length}):
                </div>
                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                  {formData.to.map((recipient) => (
                    <Badge
                      key={recipient}
                      variant="secondary"
                      className="gap-1"
                    >
                      {recipient}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => removeRecipient(recipient)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Subject (for email) */}
          {formData.type === "email" && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
                placeholder="Enter email subject"
              />
            </div>
          )}

          {/* Message Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Message Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="Enter your message..."
              rows={6}
            />
            <div className="text-xs text-muted-foreground">
              Use variables like {"{{"} firstName{"}"}, {"{{"} companyName{"}"}{" "}
              for personalization
            </div>
          </div>

          {/* Schedule (Optional) */}
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

          {/* Cost Estimation */}
          {formData.to.length > 0 && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span>Estimated Cost:</span>
                <span className="font-medium">${getEstimatedCost()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Recipients:</span>
                <span>{formData.to.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Type:</span>
                <div className="flex items-center gap-1">
                  {getTypeIcon(formData.type)}
                  <span className="capitalize">{formData.type}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={isSubmitting || formData.to.length === 0}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <Clock className="h-4 w-4 animate-spin" />
                {formData.scheduledAt ? "Scheduling..." : "Sending..."}
              </>
            ) : (
              <>
                {formData.scheduledAt ? (
                  <Clock className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {formData.scheduledAt ? "Schedule Message" : "Send Message"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
