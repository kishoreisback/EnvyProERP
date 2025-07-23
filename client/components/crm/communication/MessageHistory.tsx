import React, { useState, useMemo } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
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
} from "../../ui/dialog";
import {
  MessageSquare,
  Mail,
  Phone,
  Search,
  Filter,
  Eye,
  Download,
  ArrowUpDown,
  CheckCircle,
  Clock,
  AlertCircle,
  Send,
  Smartphone,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CommunicationMessage, CommunicationFilters } from "./types";
import { communicationHistory } from "./data";

export function MessageHistory() {
  const [messages, setMessages] =
    useState<CommunicationMessage[]>(communicationHistory);
  const [selectedMessage, setSelectedMessage] =
    useState<CommunicationMessage | null>(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<CommunicationFilters>({});

  // Filter and search messages
  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      // Text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          message.content.toLowerCase().includes(query) ||
          (message.subject && message.subject.toLowerCase().includes(query)) ||
          message.to.some((recipient) =>
            recipient.toLowerCase().includes(query),
          ) ||
          message.from.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // Type filter
      if (filters.type && filters.type.length > 0) {
        if (!filters.type.includes(message.type)) return false;
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(message.status)) return false;
      }

      // Direction filter
      if (filters.direction && filters.direction.length > 0) {
        if (!filters.direction.includes(message.direction)) return false;
      }

      return true;
    });
  }, [messages, searchQuery, filters]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "read":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "pending":
      case "sent":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

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
      delivered: "bg-green-100 text-green-800",
      read: "bg-blue-100 text-blue-800",
      sent: "bg-yellow-100 text-yellow-800",
      pending: "bg-orange-100 text-orange-800",
      failed: "bg-red-100 text-red-800",
      scheduled: "bg-purple-100 text-purple-800",
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

  const handleViewMessage = (message: CommunicationMessage) => {
    setSelectedMessage(message);
    setShowMessageDialog(true);
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
        <span>Message History</span>
      </div>

      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Communication History
          </CardTitle>
          <CardDescription>
            View and search through all SMS, Email, and WhatsApp communications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages, recipients, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Filter Controls */}
          <div className="grid gap-4 md:grid-cols-4">
            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  type: value ? [value as any] : [],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Message Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  status: value ? [value] : [],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  direction: value ? [value as any] : [],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outbound">Outbound</SelectItem>
                <SelectItem value="inbound">Inbound</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setFilters({});
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Messages ({filteredMessages.length})</span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Subject/Content</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(message.type)}
                      <span className="capitalize">{message.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        message.direction === "outbound"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {message.direction}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{message.to[0]}</div>
                      {message.to.length > 1 && (
                        <div className="text-sm text-muted-foreground">
                          +{message.to.length - 1} more
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="space-y-1">
                      {message.subject && (
                        <div className="font-medium truncate">
                          {message.subject}
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground truncate">
                        {message.content}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(message.status)}
                      {getStatusBadge(message.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {message.sentAt
                        ? new Date(message.sentAt).toLocaleString()
                        : "Not sent"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">
                      ${message.cost?.toFixed(4) || "0.0000"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewMessage(message)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedMessage && getTypeIcon(selectedMessage.type)}
              Message Details
            </DialogTitle>
            <DialogDescription>
              Complete information about this communication
            </DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Message Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type:</label>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(selectedMessage.type)}
                    <span className="capitalize">{selectedMessage.type}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status:</label>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedMessage.status)}
                    {getStatusBadge(selectedMessage.status)}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Direction:</label>
                  <Badge
                    variant={
                      selectedMessage.direction === "outbound"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedMessage.direction}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Cost:</label>
                  <span className="font-medium">
                    ${selectedMessage.cost?.toFixed(4) || "0.0000"}
                  </span>
                </div>
              </div>

              {/* Recipients */}
              <div className="space-y-2">
                <label className="text-sm font-medium">From:</label>
                <p className="text-sm">{selectedMessage.from}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">To:</label>
                <p className="text-sm">{selectedMessage.to.join(", ")}</p>
              </div>

              {/* Subject */}
              {selectedMessage.subject && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject:</label>
                  <p className="text-sm font-medium">
                    {selectedMessage.subject}
                  </p>
                </div>
              )}

              {/* Content */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Content:</label>
                <div className="p-4 border rounded-lg bg-gray-50 whitespace-pre-wrap text-sm">
                  {selectedMessage.content}
                </div>
              </div>

              {/* Timestamps */}
              <div className="grid gap-4 md:grid-cols-2">
                {selectedMessage.sentAt && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sent:</label>
                    <p className="text-sm">
                      {new Date(selectedMessage.sentAt).toLocaleString()}
                    </p>
                  </div>
                )}

                {selectedMessage.deliveredAt && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Delivered:</label>
                    <p className="text-sm">
                      {new Date(selectedMessage.deliveredAt).toLocaleString()}
                    </p>
                  </div>
                )}

                {selectedMessage.readAt && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Read:</label>
                    <p className="text-sm">
                      {new Date(selectedMessage.readAt).toLocaleString()}
                    </p>
                  </div>
                )}

                {selectedMessage.failedAt && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Failed:</label>
                    <p className="text-sm">
                      {new Date(selectedMessage.failedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Provider Info */}
              {selectedMessage.providerId && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Provider:</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {selectedMessage.providerId}
                    </span>
                    {selectedMessage.providerMessageId && (
                      <Badge variant="outline" className="text-xs">
                        {selectedMessage.providerMessageId}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Analytics */}
              {selectedMessage.type === "email" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Opened:</label>
                    <Badge
                      variant={selectedMessage.opened ? "default" : "secondary"}
                    >
                      {selectedMessage.opened ? "Yes" : "No"}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Clicked:</label>
                    <Badge
                      variant={
                        selectedMessage.clicked ? "default" : "secondary"
                      }
                    >
                      {selectedMessage.clicked ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
