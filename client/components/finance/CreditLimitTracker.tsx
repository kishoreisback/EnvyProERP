import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
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
  PiggyBank,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  History,
  Bell,
  Target,
  BarChart3,
  Activity,
} from "lucide-react";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  CreditLimit,
  CreditLimitStatus,
  CreditLimitHistory,
  LatePaymentAlert,
} from "./payment-types";

interface CreditLimitTrackerProps {
  franchiseeId: string;
  corporateId: string;
  tenantId: string;
  outstandingAmount?: number;
  onLimitUpdate?: (newLimit: number, reason: string) => void;
  onAlertCreate?: (alert: LatePaymentAlert) => void;
}

export function CreditLimitTracker({
  franchiseeId,
  corporateId,
  tenantId,
  outstandingAmount = 0,
  onLimitUpdate,
  onAlertCreate,
}: CreditLimitTrackerProps) {
  const [creditLimit, setCreditLimit] = useState<CreditLimit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [adjustmentAmount, setAdjustmentAmount] = useState(0);
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const [alerts, setAlerts] = useState<LatePaymentAlert[]>([]);

  useEffect(() => {
    loadCreditLimitData();
  }, [franchiseeId, corporateId, tenantId]);

  const loadCreditLimitData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      const mockCreditLimit = generateMockCreditLimit(
        franchiseeId,
        corporateId,
        tenantId,
      );
      const mockAlerts = generateMockLatePaymentAlerts(franchiseeId);

      setCreditLimit(mockCreditLimit);
      setAlerts(mockAlerts);
    } catch (error) {
      console.error("Error loading credit limit data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate current utilization including outstanding amount
  const currentUtilization = useMemo(() => {
    if (!creditLimit) return 0;
    const totalUsed = creditLimit.usedLimit + outstandingAmount;
    return (totalUsed / creditLimit.totalLimit) * 100;
  }, [creditLimit, outstandingAmount]);

  // Determine status based on utilization
  const currentStatus = useMemo((): CreditLimitStatus => {
    if (!creditLimit) return "within_limit";

    if (currentUtilization >= creditLimit.blockingThreshold) {
      return "exceeded";
    } else if (currentUtilization >= creditLimit.warningThreshold) {
      return "approaching_limit";
    } else {
      return "within_limit";
    }
  }, [creditLimit, currentUtilization]);

  // Risk indicators
  const riskIndicators = useMemo(() => {
    if (!creditLimit) return [];

    const indicators = [];

    if (currentUtilization > 80) {
      indicators.push({
        type: "high_utilization",
        severity: "high" as const,
        message: "Credit utilization above 80%",
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    }

    if (alerts.length > 0) {
      indicators.push({
        type: "overdue_payments",
        severity: "medium" as const,
        message: `${alerts.length} overdue payment(s)`,
        icon: <Clock className="h-4 w-4" />,
      });
    }

    const nextReviewDate = new Date(creditLimit.nextReviewDate);
    const daysToReview = Math.ceil(
      (nextReviewDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );

    if (daysToReview <= 7) {
      indicators.push({
        type: "review_due",
        severity: "low" as const,
        message: `Credit review due in ${daysToReview} days`,
        icon: <Calendar className="h-4 w-4" />,
      });
    }

    return indicators;
  }, [creditLimit, currentUtilization, alerts]);

  const getStatusColor = (status: CreditLimitStatus) => {
    switch (status) {
      case "within_limit":
        return "bg-green-100 text-green-800";
      case "approaching_limit":
        return "bg-yellow-100 text-yellow-800";
      case "exceeded":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: CreditLimitStatus) => {
    switch (status) {
      case "within_limit":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "approaching_limit":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "exceeded":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "suspended":
        return <Shield className="h-4 w-4 text-gray-600" />;
      default:
        return <PiggyBank className="h-4 w-4" />;
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return "bg-red-500";
    if (utilization >= 80) return "bg-yellow-500";
    if (utilization >= 60) return "bg-blue-500";
    return "bg-green-500";
  };

  const handleAdjustLimit = async () => {
    if (!creditLimit || !adjustmentAmount || !adjustmentReason) return;

    try {
      const newLimit = creditLimit.totalLimit + adjustmentAmount;

      // Update credit limit
      const updatedLimit = {
        ...creditLimit,
        totalLimit: newLimit,
        availableLimit: newLimit - creditLimit.usedLimit,
        utilizationPercentage: (creditLimit.usedLimit / newLimit) * 100,
        history: [
          ...creditLimit.history,
          {
            id: `HIST-${Date.now()}`,
            action: adjustmentAmount > 0 ? "increased" : "decreased",
            previousLimit: creditLimit.totalLimit,
            newLimit,
            reason: adjustmentReason,
            adjustedBy: "current_user",
            adjustedAt: new Date().toISOString(),
          } as CreditLimitHistory,
        ],
        updatedAt: new Date().toISOString(),
      };

      setCreditLimit(updatedLimit);
      onLimitUpdate?.(newLimit, adjustmentReason);

      setShowAdjustModal(false);
      setAdjustmentAmount(0);
      setAdjustmentReason("");
    } catch (error) {
      console.error("Error adjusting credit limit:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  if (isLoading || !creditLimit) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Credit Limit Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-blue-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-blue-700">
                Total Credit Limit
              </CardTitle>
              <div className="text-3xl font-bold text-blue-900">
                ₹
                <AnimatedCounter
                  value={Math.round(creditLimit.totalLimit / 100000)}
                />
                L
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(currentStatus)}
                <Badge className={getStatusColor(currentStatus)}>
                  {currentStatus.replace("_", " ")}
                </Badge>
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <PiggyBank className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-green-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-green-700">
                Available Credit
              </CardTitle>
              <div className="text-3xl font-bold text-green-900">
                ₹
                <AnimatedCounter
                  value={Math.round(
                    (creditLimit.availableLimit - outstandingAmount) / 100000,
                  )}
                />
                L
              </div>
              <p className="text-sm text-green-600">
                {formatCurrency(creditLimit.availableLimit - outstandingAmount)}{" "}
                available
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-orange-50 border-orange-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-orange-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-orange-700">
                Utilization
              </CardTitle>
              <div className="text-3xl font-bold text-orange-900">
                <AnimatedCounter
                  value={Math.round(currentUtilization)}
                  suffix="%"
                />
              </div>
              <p className="text-sm text-orange-600">
                {formatCurrency(creditLimit.usedLimit + outstandingAmount)} used
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Risk Indicators */}
      {riskIndicators.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Risk Indicators</h3>
          {riskIndicators.map((indicator, index) => (
            <Alert
              key={index}
              className={
                indicator.severity === "high"
                  ? "border-red-200 bg-red-50"
                  : indicator.severity === "medium"
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-blue-200 bg-blue-50"
              }
            >
              {indicator.icon}
              <AlertTitle className="ml-2">
                {indicator.severity === "high"
                  ? "High Risk"
                  : indicator.severity === "medium"
                    ? "Medium Risk"
                    : "Information"}
              </AlertTitle>
              <AlertDescription className="ml-6">
                {indicator.message}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Credit Utilization Progress */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Credit Utilization Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Current Utilization</span>
              <span className="text-lg font-bold">
                {Math.round(currentUtilization)}%
              </span>
            </div>
            <div className="relative">
              <Progress value={currentUtilization} className="h-4" />
              <div
                className="absolute top-0 h-4 rounded-full transition-all"
                style={{
                  width: `${Math.min(currentUtilization, 100)}%`,
                  backgroundColor:
                    currentUtilization >= 90
                      ? "#ef4444"
                      : currentUtilization >= 80
                        ? "#f59e0b"
                        : currentUtilization >= 60
                          ? "#3b82f6"
                          : "#10b981",
                }}
              />
              {/* Warning threshold marker */}
              <div
                className="absolute top-0 w-0.5 h-4 bg-yellow-600"
                style={{ left: `${creditLimit.warningThreshold}%` }}
              />
              {/* Blocking threshold marker */}
              <div
                className="absolute top-0 w-0.5 h-4 bg-red-600"
                style={{ left: `${creditLimit.blockingThreshold}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹0</span>
              <span>Warning: {creditLimit.warningThreshold}%</span>
              <span>Block: {creditLimit.blockingThreshold}%</span>
              <span>{formatCurrency(creditLimit.totalLimit)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Current Usage</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Used Limit:</span>
                  <span className="font-medium">
                    {formatCurrency(creditLimit.usedLimit)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Outstanding:</span>
                  <span className="font-medium">
                    {formatCurrency(outstandingAmount)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-medium">Total Used:</span>
                  <span className="font-bold">
                    {formatCurrency(creditLimit.usedLimit + outstandingAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Credit Terms</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Credit Days:</span>
                  <span className="font-medium">
                    {creditLimit.creditDays} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Interest Rate:</span>
                  <span className="font-medium">
                    {creditLimit.interestRate}% p.a.
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Penalty Rate:</span>
                  <span className="font-medium">
                    {creditLimit.penaltyRate}% p.a.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setShowAdjustModal(true)}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Adjust Limit
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowHistoryModal(true)}
          className="flex items-center gap-2"
        >
          <History className="h-4 w-4" />
          View History
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Set Alerts
        </Button>
      </div>

      {/* Adjust Limit Modal */}
      <Dialog open={showAdjustModal} onOpenChange={setShowAdjustModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adjust Credit Limit</DialogTitle>
            <DialogDescription>
              Current limit: {formatCurrency(creditLimit.totalLimit)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Adjustment Amount</Label>
              <Input
                type="number"
                value={adjustmentAmount}
                onChange={(e) => setAdjustmentAmount(Number(e.target.value))}
                placeholder="Enter amount (positive to increase, negative to decrease)"
              />
              <p className="text-xs text-muted-foreground mt-1">
                New limit:{" "}
                {formatCurrency(creditLimit.totalLimit + adjustmentAmount)}
              </p>
            </div>
            <div>
              <Label>Reason for Adjustment</Label>
              <Textarea
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
                placeholder="Explain the reason for this credit limit adjustment..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdjustModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAdjustLimit}
              disabled={!adjustmentAmount || !adjustmentReason}
            >
              Adjust Limit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* History Modal */}
      <Dialog open={showHistoryModal} onOpenChange={setShowHistoryModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Credit Limit History</DialogTitle>
            <DialogDescription>
              Historical changes to the credit limit
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {creditLimit.history.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-4 p-4 border rounded-lg"
              >
                <div className="p-2 rounded-full bg-blue-100">
                  {entry.action === "increased" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium capitalize">{entry.action}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(entry.previousLimit)} →{" "}
                        {formatCurrency(entry.newLimit)}
                      </p>
                      <p className="text-sm mt-1">{entry.reason}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{new Date(entry.adjustedAt).toLocaleDateString()}</p>
                      <p>By: {entry.adjustedBy}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Mock data generators
function generateMockCreditLimit(
  franchiseeId: string,
  corporateId: string,
  tenantId: string,
): CreditLimit {
  return {
    id: "CL-001",
    franchiseeId,
    corporateId,
    tenantId,
    totalLimit: 1000000,
    availableLimit: 650000,
    usedLimit: 350000,
    blockedLimit: 0,
    utilizationPercentage: 35,
    status: "within_limit",
    creditDays: 30,
    interestRate: 18,
    penaltyRate: 24,
    warningThreshold: 80,
    blockingThreshold: 95,
    history: [
      {
        id: "HIST-001",
        action: "increased",
        previousLimit: 750000,
        newLimit: 1000000,
        reason: "Good payment history and increased business volume",
        adjustedBy: "credit_manager",
        adjustedAt: new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        approvedBy: "regional_head",
        approvedAt: new Date(
          Date.now() - 29 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      },
      {
        id: "HIST-002",
        action: "reviewed",
        previousLimit: 750000,
        newLimit: 750000,
        reason: "Quarterly credit review - no changes required",
        adjustedBy: "system",
        adjustedAt: new Date(
          Date.now() - 90 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      },
    ],
    lastReviewedAt: new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    lastReviewedBy: "credit_manager",
    nextReviewDate: new Date(
      Date.now() + 60 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

function generateMockLatePaymentAlerts(
  franchiseeId: string,
): LatePaymentAlert[] {
  return [
    {
      id: "ALERT-001",
      invoiceId: "INV-2024-001",
      franchiseeId,
      corporateId: "CORP001",
      tenantId: "tenant_001",
      daysOverdue: 5,
      overdueAmount: 25000,
      totalOutstanding: 75000,
      alertLevel: 2,
      alertType: "reminder",
      notificationsSent: [
        {
          id: "NOTIF-001",
          type: "email",
          sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          sentTo: "franchisee@example.com",
          content: "Payment reminder for invoice INV-2024-001",
          deliveryStatus: "delivered",
        },
      ],
      callsMade: [],
      status: "active",
      nextActionDate: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

export default CreditLimitTracker;
