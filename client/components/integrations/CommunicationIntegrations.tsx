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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AnimatedIcon, PulsingDot } from "../ui/animated-icons";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  MessageSquare,
  Phone,
  Send,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Zap,
  BarChart3,
  Eye,
  Download,
  Settings,
  RefreshCw,
} from "lucide-react";
import { mockIntegrations } from "./data";

interface Message {
  id: string;
  type: "sms" | "whatsapp" | "voice";
  recipient: string;
  content: string;
  status: "sent" | "delivered" | "failed" | "pending";
  sentAt: string;
  provider: string;
  cost: number;
}

const mockMessages: Message[] = [
  {
    id: "msg-1",
    type: "sms",
    recipient: "+91 98765 43210",
    content: "Site visit scheduled for tomorrow at 10 AM. Please confirm.",
    status: "delivered",
    sentAt: "2024-01-15T10:30:00Z",
    provider: "MSG91",
    cost: 0.05,
  },
  {
    id: "msg-2",
    type: "whatsapp",
    recipient: "+91 87654 32109",
    content:
      "Thank you for your interest in our project. Our team will contact you soon.",
    status: "sent",
    sentAt: "2024-01-15T09:15:00Z",
    provider: "Twilio",
    cost: 0.02,
  },
  {
    id: "msg-3",
    type: "sms",
    recipient: "+91 76543 21098",
    content: "Safety training scheduled for all workers. Attendance mandatory.",
    status: "delivered",
    sentAt: "2024-01-15T08:45:00Z",
    provider: "Gupshup",
    cost: 0.04,
  },
];

export function CommunicationIntegrations() {
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [newMessage, setNewMessage] = useState({
    type: "sms" as const,
    recipient: "",
    content: "",
    provider: "",
  });
  const [sendingMessage, setSendingMessage] = useState(false);

  const communicationIntegrations = mockIntegrations.filter(
    (int) => int.category === "communication",
  );
  const connectedIntegrations = communicationIntegrations.filter(
    (int) => int.status === "connected",
  );

  const totalMessages = mockMessages.length;
  const deliveredMessages = mockMessages.filter(
    (msg) => msg.status === "delivered",
  ).length;
  const totalCost = mockMessages.reduce((sum, msg) => sum + msg.cost, 0);
  const deliveryRate = (deliveredMessages / totalMessages) * 100;

  const handleSendMessage = async () => {
    setSendingMessage(true);
    // Simulate API call
    setTimeout(() => {
      setSendingMessage(false);
      setShowSendMessage(false);
      setNewMessage({
        type: "sms",
        recipient: "",
        content: "",
        provider: "",
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600";
      case "sent":
        return "text-blue-600";
      case "failed":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return "default";
      case "sent":
        return "outline";
      case "failed":
        return "destructive";
      case "pending":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sms":
        return Phone;
      case "whatsapp":
        return MessageSquare;
      case "voice":
        return Phone;
      default:
        return MessageSquare;
    }
  };

  return (
    <div className="space-y-6">
      {/* Communication Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover-lift animate-fadeInUp">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <AnimatedIcon
                  icon={Send}
                  animation="bounce"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={totalMessages} />
                </p>
                <p className="text-sm text-muted-foreground">Messages Sent</p>
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
                  icon={CheckCircle}
                  animation="pulse"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={Math.round(deliveryRate)} />%
                </p>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
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
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <AnimatedIcon
                  icon={Users}
                  animation="float"
                  className="h-6 w-6 text-purple-600 dark:text-purple-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={connectedIntegrations.length} />
                </p>
                <p className="text-sm text-muted-foreground">Integrations</p>
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
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                <AnimatedIcon
                  icon={BarChart3}
                  animation="glow"
                  className="h-6 w-6 text-orange-600 dark:text-orange-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ₹<AnimatedCounter value={Math.round(totalCost * 100)} />
                </p>
                <p className="text-sm text-muted-foreground">Total Cost</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connected Communication Platforms */}
      <Card className="animate-fadeInUp">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Communication Platforms</CardTitle>
              <CardDescription>
                Connected SMS, WhatsApp, and voice communication services
              </CardDescription>
            </div>
            <Dialog open={showSendMessage} onOpenChange={setShowSendMessage}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Send Message</DialogTitle>
                  <DialogDescription>
                    Send SMS, WhatsApp, or voice message through your connected
                    platforms
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="message-type">Message Type</Label>
                    <Select
                      value={newMessage.type}
                      onValueChange={(value: any) =>
                        setNewMessage((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="voice">Voice Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="provider">Provider</Label>
                    <Select
                      value={newMessage.provider}
                      onValueChange={(value) =>
                        setNewMessage((prev) => ({ ...prev, provider: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {connectedIntegrations.map((integration) => (
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
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input
                      id="recipient"
                      value={newMessage.recipient}
                      onChange={(e) =>
                        setNewMessage((prev) => ({
                          ...prev,
                          recipient: e.target.value,
                        }))
                      }
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Message Content</Label>
                    <Textarea
                      id="content"
                      value={newMessage.content}
                      onChange={(e) =>
                        setNewMessage((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      placeholder="Enter your message"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowSendMessage(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={sendingMessage}
                    >
                      {sendingMessage ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {connectedIntegrations.map((integration) => (
              <Card key={integration.id} className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{integration.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{integration.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          Connected
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {integration.provider}
                      </p>
                    </div>
                  </div>

                  {integration.usage && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Messages Today</span>
                        <span>
                          {integration.usage.apiCalls.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Success Rate</span>
                        <span>
                          {(
                            100 -
                            (integration.usage.errors /
                              integration.usage.apiCalls) *
                              100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Cost Today</span>
                        <span>
                          ₹{(integration.usage.apiCalls * 0.04).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-1">
                      {integration.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-muted rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message History */}
      <Card className="animate-fadeInUp">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>
                History of sent messages across all platforms
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMessages.map((message) => {
              const TypeIcon = getTypeIcon(message.type);
              return (
                <div
                  key={message.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-muted">
                    <TypeIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium capitalize">
                          {message.type}
                        </span>
                        <Badge
                          variant={getStatusBadge(message.status) as any}
                          className={getStatusColor(message.status)}
                        >
                          {message.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(message.sentAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">To: {message.recipient}</p>
                    <p className="text-sm text-muted-foreground">
                      {message.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>via {message.provider}</span>
                      <span>Cost: ₹{message.cost.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
