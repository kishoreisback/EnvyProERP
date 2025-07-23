import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  AlertTriangle,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Calendar,
  Search,
  Filter,
  Play,
  Pause,
  Settings,
  Send,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  BarChart3,
  Activity,
  CheckCircle,
  XCircle,
  Bell,
} from "lucide-react";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  LatePaymentAlert,
  LatePaymentNotification,
  LatePaymentCall,
  LatePaymentResolution,
} from "./payment-types";
import { Invoice } from "./invoice-types";
import {
  createLatePaymentReminderNotification,
  PaymentNotificationWorkflow,
} from "./PaymentNotifications";

interface LatePaymentAlertSystemProps {
  tenantId: string;
  franchiseeId?: string; // If specified, show only alerts for this franchisee
  corporateId?: string;
  onAlertResolved?: (
    alertId: string,
    resolution: LatePaymentResolution,
  ) => void;
  onNotificationSent?: (
    alertId: string,
    notification: LatePaymentNotification,
  ) => void;
}

export function LatePaymentAlertSystem({
  tenantId,
  franchiseeId,
  corporateId,
  onAlertResolved,
  onNotificationSent,
}: LatePaymentAlertSystemProps) {
  const [alerts, setAlerts] = useState<LatePaymentAlert[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [alertLevelFilter, setAlertLevelFilter] = useState<string>("all");
  const [selectedAlert, setSelectedAlert] = useState<LatePaymentAlert | null>(
    null,
  );
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [isRunningCollectionProcess, setIsRunningCollectionProcess] =
    useState(false);

  // Communication form state
  const [communicationType, setCommunicationType] = useState<
    "email" | "sms" | "call"
  >("email");
  const [communicationContent, setCommunicationContent] = useState("");
  const [resolutionType, setResolutionType] = useState<
    "paid" | "payment_plan" | "discount" | "write_off"
  >("paid");
  const [resolutionAmount, setResolutionAmount] = useState(0);
  const [resolutionNotes, setResolutionNotes] = useState("");

  useEffect(() => {
    loadLatePaymentData();

    // Set up interval to check for new overdue invoices
    const interval = setInterval(checkForNewOverdueInvoices, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [tenantId, franchiseeId, corporateId]);

  const loadLatePaymentData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      const mockAlerts = generateMockLatePaymentAlerts(tenantId, franchiseeId);
      const mockInvoices = generateMockInvoices(tenantId, franchiseeId);

      setAlerts(mockAlerts);
      setInvoices(mockInvoices);
    } catch (error) {
      console.error("Error loading late payment data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkForNewOverdueInvoices = async () => {
    try {
      // Check invoices for new overdue payments
      const overdueInvoices = invoices.filter((invoice) => {
        const dueDate = new Date(invoice.dueDate);
        const now = new Date();
        const daysOverdue = Math.floor(
          (now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        return (
          daysOverdue > 0 &&
          invoice.paymentStatus !== "paid" &&
          !alerts.some((alert) => alert.invoiceId === invoice.id)
        );
      });

      // Create alerts for newly overdue invoices
      for (const invoice of overdueInvoices) {
        const dueDate = new Date(invoice.dueDate);
        const now = new Date();
        const daysOverdue = Math.floor(
          (now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        const newAlert = createLatePaymentAlert(invoice, daysOverdue);
        setAlerts((prev) => [...prev, newAlert]);

        // Send automatic notification
        await sendAutomaticReminder(newAlert);
      }
    } catch (error) {
      console.error("Error checking for overdue invoices:", error);
    }
  };

  const createLatePaymentAlert = (
    invoice: Invoice,
    daysOverdue: number,
  ): LatePaymentAlert => {
    return {
      id: `ALERT-${Date.now()}`,
      invoiceId: invoice.id,
      franchiseeId: invoice.franchiseeId,
      corporateId: invoice.corporateId,
      tenantId: invoice.tenantId,
      daysOverdue,
      overdueAmount: invoice.balanceAmount || invoice.grandTotal,
      totalOutstanding: invoice.balanceAmount || invoice.grandTotal,
      alertLevel: determineAlertLevel(daysOverdue),
      alertType: determineAlertType(daysOverdue),
      notificationsSent: [],
      callsMade: [],
      status: "active",
      nextActionDate: calculateNextActionDate(daysOverdue),
      escalationDate: calculateEscalationDate(daysOverdue),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const determineAlertLevel = (daysOverdue: number): 1 | 2 | 3 | 4 | 5 => {
    if (daysOverdue <= 7) return 1;
    if (daysOverdue <= 15) return 2;
    if (daysOverdue <= 30) return 3;
    if (daysOverdue <= 60) return 4;
    return 5;
  };

  const determineAlertType = (
    daysOverdue: number,
  ): "reminder" | "warning" | "final_notice" | "collection" => {
    if (daysOverdue <= 7) return "reminder";
    if (daysOverdue <= 15) return "warning";
    if (daysOverdue <= 30) return "final_notice";
    return "collection";
  };

  const calculateNextActionDate = (daysOverdue: number): string => {
    const days = daysOverdue <= 7 ? 3 : daysOverdue <= 15 ? 2 : 1;
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
  };

  const calculateEscalationDate = (daysOverdue: number): string => {
    const days = Math.min(30 - daysOverdue, 7);
    return new Date(
      Date.now() + Math.max(days, 1) * 24 * 60 * 60 * 1000,
    ).toISOString();
  };

  const sendAutomaticReminder = async (alert: LatePaymentAlert) => {
    try {
      // Create notification using the notification system
      const notification =
        await PaymentNotificationWorkflow.processPaymentEvent(
          "late_payment_reminder",
          alert,
          alert.franchiseeId,
        );

      if (notification) {
        // Add to alert's notification history
        const alertNotification: LatePaymentNotification = {
          id: `NOTIF-${Date.now()}`,
          type: "email",
          sentAt: new Date().toISOString(),
          sentTo: "franchisee@example.com", // In real app, get from user data
          content: notification.message,
          deliveryStatus: "sent",
        };

        setAlerts((prev) =>
          prev.map((a) =>
            a.id === alert.id
              ? {
                  ...a,
                  notificationsSent: [
                    ...a.notificationsSent,
                    alertNotification,
                  ],
                }
              : a,
          ),
        );

        onNotificationSent?.(alert.id, alertNotification);
      }
    } catch (error) {
      console.error("Error sending automatic reminder:", error);
    }
  };

  const runCollectionProcess = async () => {
    setIsRunningCollectionProcess(true);

    try {
      // Process all active alerts for automated collection actions
      const activeAlerts = alerts.filter((alert) => alert.status === "active");

      for (const alert of activeAlerts) {
        const nextActionDate = new Date(alert.nextActionDate);
        const now = new Date();

        if (now >= nextActionDate) {
          // Determine action based on alert level and days overdue
          if (alert.alertLevel <= 2) {
            // Send reminder
            await sendAutomaticReminder(alert);
          } else if (alert.alertLevel === 3) {
            // Send final notice
            await sendFinalNotice(alert);
          } else if (alert.alertLevel >= 4) {
            // Escalate to collection
            await escalateToCollection(alert);
          }

          // Update next action date
          const updatedAlert = {
            ...alert,
            nextActionDate: calculateNextActionDate(alert.daysOverdue + 1),
            updatedAt: new Date().toISOString(),
          };

          setAlerts((prev) =>
            prev.map((a) => (a.id === alert.id ? updatedAlert : a)),
          );
        }
      }
    } catch (error) {
      console.error("Error running collection process:", error);
    } finally {
      setIsRunningCollectionProcess(false);
    }
  };

  const sendFinalNotice = async (alert: LatePaymentAlert) => {
    // Implementation for final notice
    console.log("Sending final notice for alert:", alert.id);
  };

  const escalateToCollection = async (alert: LatePaymentAlert) => {
    // Implementation for collection escalation
    console.log("Escalating to collection for alert:", alert.id);
  };

  const sendCommunication = async () => {
    if (!selectedAlert) return;

    try {
      const newNotification: LatePaymentNotification = {
        id: `NOTIF-${Date.now()}`,
        type: communicationType === "call" ? "email" : communicationType, // Calls are logged separately
        sentAt: new Date().toISOString(),
        sentTo: "franchisee@example.com", // In real app, get from user data
        content: communicationContent,
        deliveryStatus: "sent",
      };

      if (communicationType === "call") {
        // Log call instead
        const newCall = {
          id: `CALL-${Date.now()}`,
          calledAt: new Date().toISOString(),
          calledBy: "current_user",
          duration: 300, // 5 minutes
          outcome: "answered" as const,
          notes: communicationContent,
          followUpRequired: false,
        };

        setAlerts((prev) =>
          prev.map((alert) =>
            alert.id === selectedAlert.id
              ? { ...alert, callsMade: [...alert.callsMade, newCall] }
              : alert,
          ),
        );
      } else {
        setAlerts((prev) =>
          prev.map((alert) =>
            alert.id === selectedAlert.id
              ? {
                  ...alert,
                  notificationsSent: [
                    ...alert.notificationsSent,
                    newNotification,
                  ],
                }
              : alert,
          ),
        );

        onNotificationSent?.(selectedAlert.id, newNotification);
      }

      setShowCommunicationModal(false);
      setCommunicationContent("");
    } catch (error) {
      console.error("Error sending communication:", error);
    }
  };

  const resolveAlert = async () => {
    if (!selectedAlert) return;

    try {
      const resolution: LatePaymentResolution = {
        type: resolutionType,
        resolvedAt: new Date().toISOString(),
        resolvedBy: "current_user",
        amount: resolutionAmount,
        notes: resolutionNotes,
      };

      const updatedAlert = {
        ...selectedAlert,
        status: "resolved" as const,
        resolution,
        updatedAt: new Date().toISOString(),
      };

      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === selectedAlert.id ? updatedAlert : alert,
        ),
      );

      onAlertResolved?.(selectedAlert.id, resolution);
      setShowResolutionModal(false);
      setResolutionNotes("");
      setResolutionAmount(0);
    } catch (error) {
      console.error("Error resolving alert:", error);
    }
  };

  // Filter alerts
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        if (!alert.invoiceId.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      if (statusFilter !== "all" && alert.status !== statusFilter) {
        return false;
      }

      if (
        alertLevelFilter !== "all" &&
        alert.alertLevel.toString() !== alertLevelFilter
      ) {
        return false;
      }

      return true;
    });
  }, [alerts, searchQuery, statusFilter, alertLevelFilter]);

  // Alert statistics
  const alertStats = useMemo(() => {
    const total = alerts.length;
    const active = alerts.filter((a) => a.status === "active").length;
    const resolved = alerts.filter((a) => a.status === "resolved").length;
    const escalated = alerts.filter((a) => a.status === "escalated").length;
    const totalOverdueAmount = alerts
      .filter((a) => a.status === "active")
      .reduce((sum, a) => sum + a.overdueAmount, 0);
    const averageDaysOverdue =
      alerts.length > 0
        ? Math.round(
            alerts.reduce((sum, a) => sum + a.daysOverdue, 0) / alerts.length,
          )
        : 0;

    return {
      total,
      active,
      resolved,
      escalated,
      totalOverdueAmount,
      averageDaysOverdue,
      resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0,
    };
  }, [alerts]);

  const getAlertLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-yellow-100 text-yellow-800";
      case 2:
        return "bg-orange-100 text-orange-800";
      case 3:
        return "bg-red-100 text-red-800";
      case 4:
        return "bg-purple-100 text-purple-800";
      case 5:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "escalated":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Alert Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-red-50 border-red-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-red-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-red-700">
                Active Alerts
              </CardTitle>
              <div className="text-3xl font-bold text-red-900">
                <AnimatedCounter value={alertStats.active} />
              </div>
              <p className="text-sm text-red-600">
                {formatCurrency(alertStats.totalOverdueAmount)} overdue
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-green-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-green-700">
                Resolution Rate
              </CardTitle>
              <div className="text-3xl font-bold text-green-900">
                <AnimatedCounter value={alertStats.resolutionRate} suffix="%" />
              </div>
              <p className="text-sm text-green-600">
                {alertStats.resolved} resolved
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-orange-50 border-orange-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-orange-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-orange-700">
                Avg Days Overdue
              </CardTitle>
              <div className="text-3xl font-bold text-orange-900">
                <AnimatedCounter value={alertStats.averageDaysOverdue} />
              </div>
              <p className="text-sm text-orange-600">days on average</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-purple-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-purple-700">
                Collection Efficiency
              </CardTitle>
              <div className="text-3xl font-bold text-purple-900">
                <AnimatedCounter value={85} suffix="%" />
              </div>
              <p className="text-sm text-purple-600">automated follow-up</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Late Payment Alerts</h2>
          <p className="text-muted-foreground">
            Automated collection and reminder system for overdue payments
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={runCollectionProcess}
            disabled={isRunningCollectionProcess}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            {isRunningCollectionProcess ? (
              <>
                <Activity className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Collection
              </>
            )}
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by invoice ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>
          <Select value={alertLevelFilter} onValueChange={setAlertLevelFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="1">Level 1</SelectItem>
              <SelectItem value="2">Level 2</SelectItem>
              <SelectItem value="3">Level 3</SelectItem>
              <SelectItem value="4">Level 4</SelectItem>
              <SelectItem value="5">Level 5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Alerts Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Alert Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Action</TableHead>
                <TableHead>Communications</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">
                    {alert.invoiceId}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {alert.daysOverdue} days
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(alert.overdueAmount)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getAlertLevelColor(alert.alertLevel)}>
                      Level {alert.alertLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(alert.nextActionDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">
                        {alert.notificationsSent.length}
                      </span>
                      <Mail className="h-3 w-3" />
                      <span className="text-sm">{alert.callsMade.length}</span>
                      <Phone className="h-3 w-3" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedAlert(alert);
                          setShowAlertModal(true);
                        }}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedAlert(alert);
                          setShowCommunicationModal(true);
                        }}
                      >
                        <Send className="h-3 w-3" />
                      </Button>
                      {alert.status === "active" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedAlert(alert);
                            setShowResolutionModal(true);
                          }}
                        >
                          <CheckCircle className="h-3 w-3" />
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

      {/* Alert Details Modal */}
      <Dialog open={showAlertModal} onOpenChange={setShowAlertModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Alert Details</DialogTitle>
            <DialogDescription>
              {selectedAlert && `Alert for invoice ${selectedAlert.invoiceId}`}
            </DialogDescription>
          </DialogHeader>
          {selectedAlert && <LatePaymentAlertDetails alert={selectedAlert} />}
        </DialogContent>
      </Dialog>

      {/* Communication Modal */}
      <Dialog
        open={showCommunicationModal}
        onOpenChange={setShowCommunicationModal}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Communication</DialogTitle>
            <DialogDescription>
              Send reminder or follow-up communication
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Communication Type</Label>
              <Select
                value={communicationType}
                onValueChange={(value: any) => setCommunicationType(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="call">Phone Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>
                {communicationType === "call"
                  ? "Call Notes"
                  : "Message Content"}
              </Label>
              <Textarea
                value={communicationContent}
                onChange={(e) => setCommunicationContent(e.target.value)}
                placeholder={
                  communicationType === "call"
                    ? "Enter call notes and outcome..."
                    : "Enter your message content..."
                }
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCommunicationModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={sendCommunication}
              disabled={!communicationContent}
            >
              {communicationType === "call" ? "Log Call" : "Send"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resolution Modal */}
      <Dialog open={showResolutionModal} onOpenChange={setShowResolutionModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Resolve Alert</DialogTitle>
            <DialogDescription>
              Mark this payment alert as resolved
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Resolution Type</Label>
              <Select
                value={resolutionType}
                onValueChange={(value: any) => setResolutionType(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Payment Received</SelectItem>
                  <SelectItem value="payment_plan">
                    Payment Plan Agreed
                  </SelectItem>
                  <SelectItem value="discount">Discount Applied</SelectItem>
                  <SelectItem value="write_off">Write Off</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                value={resolutionAmount}
                onChange={(e) => setResolutionAmount(Number(e.target.value))}
                placeholder="Enter resolution amount"
              />
            </div>
            <div>
              <Label>Resolution Notes</Label>
              <Textarea
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                placeholder="Enter details about the resolution..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowResolutionModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={resolveAlert} disabled={!resolutionNotes}>
              Resolve Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Alert Details Component
interface LatePaymentAlertDetailsProps {
  alert: LatePaymentAlert;
}

function LatePaymentAlertDetails({ alert }: LatePaymentAlertDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Invoice ID</Label>
            <p className="font-medium">{alert.invoiceId}</p>
          </div>
          <div>
            <Label>Days Overdue</Label>
            <p className="font-medium text-red-600">{alert.daysOverdue} days</p>
          </div>
          <div>
            <Label>Overdue Amount</Label>
            <p className="font-medium">
              ₹{alert.overdueAmount.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Alert Level</Label>
            <Badge className={getAlertLevelColor(alert.alertLevel)}>
              Level {alert.alertLevel}
            </Badge>
          </div>
          <div>
            <Label>Alert Type</Label>
            <p className="font-medium capitalize">
              {alert.alertType.replace("_", " ")}
            </p>
          </div>
          <div>
            <Label>Status</Label>
            <Badge className={getStatusColor(alert.status)}>
              {alert.status}
            </Badge>
          </div>
        </div>
      </div>

      {alert.notificationsSent.length > 0 && (
        <div>
          <Label className="text-base font-semibold">Notifications Sent</Label>
          <div className="mt-2 space-y-2">
            {alert.notificationsSent.map((notification) => (
              <div
                key={notification.id}
                className="flex justify-between items-center p-3 border rounded"
              >
                <div>
                  <p className="font-medium capitalize">{notification.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(notification.sentAt).toLocaleString()}
                  </p>
                </div>
                <Badge variant="outline">{notification.deliveryStatus}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {alert.callsMade.length > 0 && (
        <div>
          <Label className="text-base font-semibold">Calls Made</Label>
          <div className="mt-2 space-y-2">
            {alert.callsMade.map((call) => (
              <div key={call.id} className="p-3 border rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {new Date(call.calledAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Duration: {call.duration}s
                    </p>
                    <p className="text-sm">{call.notes}</p>
                  </div>
                  <Badge variant="outline">{call.outcome}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Mock data generators
function generateMockLatePaymentAlerts(
  tenantId: string,
  franchiseeId?: string,
): LatePaymentAlert[] {
  return [
    {
      id: "ALERT-001",
      invoiceId: "INV-2024-003",
      franchiseeId: franchiseeId || "FRAN001",
      corporateId: "CORP001",
      tenantId,
      daysOverdue: 7,
      overdueAmount: 18500,
      totalOutstanding: 18500,
      alertLevel: 2,
      alertType: "warning",
      notificationsSent: [
        {
          id: "NOTIF-001",
          type: "email",
          sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          sentTo: "franchisee@example.com",
          content: "Payment reminder for overdue invoice",
          deliveryStatus: "delivered",
        },
      ],
      callsMade: [],
      status: "active",
      nextActionDate: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

function generateMockInvoices(
  tenantId: string,
  franchiseeId?: string,
): Invoice[] {
  // Return mock invoices - this would integrate with existing invoice system
  return [];
}

function getAlertLevelColor(level: number) {
  switch (level) {
    case 1:
      return "bg-yellow-100 text-yellow-800";
    case 2:
      return "bg-orange-100 text-orange-800";
    case 3:
      return "bg-red-100 text-red-800";
    case 4:
      return "bg-purple-100 text-purple-800";
    case 5:
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-red-100 text-red-800";
    case "resolved":
      return "bg-green-100 text-green-800";
    case "escalated":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default LatePaymentAlertSystem;
