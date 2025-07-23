import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Clock,
  Zap,
  FileText,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  PaymentTransaction,
  ReconciliationStatus,
  BankStatementEntry,
  ReconciliationDiscrepancy,
} from "./payment-types";

interface PaymentReconciliationProps {
  payments: PaymentTransaction[];
  onReconcile: (paymentId: string, status: ReconciliationStatus) => void;
  onManualReview: (paymentId: string, notes: string) => void;
}

export function PaymentReconciliation({
  payments,
  onReconcile,
  onManualReview,
}: PaymentReconciliationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentTransaction | null>(null);
  const [bankStatements, setBankStatements] = useState<BankStatementEntry[]>(
    [],
  );
  const [isAutoReconciling, setIsAutoReconciling] = useState(false);
  const [selectedStatement, setSelectedStatement] =
    useState<BankStatementEntry | null>(null);
  const [reconciliationNotes, setReconciliationNotes] = useState("");
  const [showReconcileModal, setShowReconcileModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    loadBankStatements();
  }, []);

  const loadBankStatements = async () => {
    // Simulate loading bank statements
    const mockStatements = generateMockBankStatements();
    setBankStatements(mockStatements);
  };

  // Filter payments for reconciliation
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        if (
          !payment.transactionId.toLowerCase().includes(searchLower) &&
          !payment.invoiceNumber.toLowerCase().includes(searchLower) &&
          !payment.gatewayResponse?.bankReference
            ?.toLowerCase()
            .includes(searchLower)
        ) {
          return false;
        }
      }

      if (
        statusFilter !== "all" &&
        payment.reconciliation.status !== statusFilter
      ) {
        return false;
      }

      return true;
    });
  }, [payments, searchQuery, statusFilter]);

  // Reconciliation statistics
  const reconciliationStats = useMemo(() => {
    const total = payments.length;
    const pending = payments.filter(
      (p) => p.reconciliation.status === "pending",
    ).length;
    const matched = payments.filter(
      (p) => p.reconciliation.status === "matched",
    ).length;
    const mismatched = payments.filter(
      (p) => p.reconciliation.status === "mismatched",
    ).length;
    const manualReview = payments.filter(
      (p) => p.reconciliation.status === "manual_review",
    ).length;
    const reconciled = payments.filter(
      (p) => p.reconciliation.status === "reconciled",
    ).length;

    return {
      total,
      pending,
      matched,
      mismatched,
      manualReview,
      reconciled,
      autoReconciliationRate:
        total > 0 ? Math.round((matched / total) * 100) : 0,
      pendingAmount: payments
        .filter((p) => p.reconciliation.status === "pending")
        .reduce((sum, p) => sum + p.amount, 0),
    };
  }, [payments]);

  const runAutoReconciliation = async () => {
    setIsAutoReconciling(true);

    try {
      // Simulate auto-reconciliation process
      const pendingPayments = payments.filter(
        (p) => p.reconciliation.status === "pending",
      );

      for (const payment of pendingPayments) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate processing time

        // Try to match with bank statements
        const matchingStatement = findMatchingBankStatement(
          payment,
          bankStatements,
        );

        if (matchingStatement) {
          const discrepancies = findDiscrepancies(payment, matchingStatement);

          if (discrepancies.length === 0) {
            // Perfect match - auto reconcile
            onReconcile(payment.id, "matched");
          } else if (discrepancies.every((d) => d.severity === "low")) {
            // Minor discrepancies - still auto reconcile
            onReconcile(payment.id, "matched");
          } else {
            // Significant discrepancies - manual review required
            onReconcile(payment.id, "manual_review");
          }
        } else {
          // No matching statement found
          const timeDiff =
            Date.now() -
            new Date(payment.completedAt || payment.initiatedAt).getTime();
          const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

          if (daysDiff > 3) {
            // Payment is old and still no match - mark as mismatched
            onReconcile(payment.id, "mismatched");
          }
          // Otherwise, keep as pending for now
        }
      }
    } catch (error) {
      console.error("Auto-reconciliation error:", error);
    } finally {
      setIsAutoReconciling(false);
    }
  };

  const findMatchingBankStatement = (
    payment: PaymentTransaction,
    statements: BankStatementEntry[],
  ): BankStatementEntry | null => {
    return (
      statements.find((statement) => {
        // Match by amount
        if (Math.abs(statement.creditAmount - payment.amount) > 1) return false;

        // Match by reference or UTR
        if (payment.gatewayResponse?.bankReference) {
          if (
            statement.reference.includes(
              payment.gatewayResponse.bankReference,
            ) ||
            statement.utr === payment.gatewayResponse.bankReference
          ) {
            return true;
          }
        }

        // Match by transaction ID
        if (
          statement.description.includes(payment.transactionId) ||
          statement.reference.includes(payment.transactionId)
        ) {
          return true;
        }

        // Match by date (within 3 days) and amount
        const paymentDate = new Date(
          payment.completedAt || payment.initiatedAt,
        );
        const statementDate = new Date(statement.date);
        const daysDiff =
          Math.abs(paymentDate.getTime() - statementDate.getTime()) /
          (1000 * 60 * 60 * 24);

        return daysDiff <= 3;
      }) || null
    );
  };

  const findDiscrepancies = (
    payment: PaymentTransaction,
    statement: BankStatementEntry,
  ): ReconciliationDiscrepancy[] => {
    const discrepancies: ReconciliationDiscrepancy[] = [];

    // Amount discrepancy
    const amountDiff = Math.abs(payment.amount - statement.creditAmount);
    if (amountDiff > 1) {
      discrepancies.push({
        field: "amount",
        expected: payment.amount,
        actual: statement.creditAmount,
        severity: amountDiff > payment.amount * 0.05 ? "high" : "medium",
        resolved: false,
      });
    }

    // Date discrepancy
    const paymentDate = new Date(payment.completedAt || payment.initiatedAt);
    const statementDate = new Date(statement.date);
    const daysDiff =
      Math.abs(paymentDate.getTime() - statementDate.getTime()) /
      (1000 * 60 * 60 * 24);

    if (daysDiff > 1) {
      discrepancies.push({
        field: "date",
        expected: paymentDate.toISOString(),
        actual: statement.date,
        severity: daysDiff > 3 ? "high" : "low",
        resolved: false,
      });
    }

    return discrepancies;
  };

  const getStatusColor = (status: ReconciliationStatus) => {
    switch (status) {
      case "matched":
      case "reconciled":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "mismatched":
        return "bg-red-100 text-red-800";
      case "manual_review":
        return "bg-orange-100 text-orange-800";
      case "duplicate":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: ReconciliationStatus) => {
    switch (status) {
      case "matched":
      case "reconciled":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "mismatched":
        return <XCircle className="h-4 w-4" />;
      case "manual_review":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <RefreshCw className="h-4 w-4" />;
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
      {/* Reconciliation Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-blue-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-blue-700">
                Total Payments
              </CardTitle>
              <div className="text-3xl font-bold text-blue-900">
                <AnimatedCounter value={reconciliationStats.total} />
              </div>
              <p className="text-sm text-blue-600">
                {reconciliationStats.pending} pending reconciliation
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-green-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-green-700">
                Auto Reconciled
              </CardTitle>
              <div className="text-3xl font-bold text-green-900">
                <AnimatedCounter value={reconciliationStats.matched} />
              </div>
              <p className="text-sm text-green-600">
                {reconciliationStats.autoReconciliationRate}% success rate
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
                Manual Review
              </CardTitle>
              <div className="text-3xl font-bold text-orange-900">
                <AnimatedCounter value={reconciliationStats.manualReview} />
              </div>
              <p className="text-sm text-orange-600">Requires attention</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-red-50 border-red-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-red-200/40 rounded-bl-[24px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-red-700">
                Pending Amount
              </CardTitle>
              <div className="text-3xl font-bold text-red-900">
                ₹{Math.round(reconciliationStats.pendingAmount / 100000)}L
              </div>
              <p className="text-sm text-red-600">
                {reconciliationStats.mismatched} mismatched
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <XCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Payment Reconciliation</h2>
          <p className="text-muted-foreground">
            Automatic and manual reconciliation of payment transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={runAutoReconciliation}
            disabled={isAutoReconciling}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isAutoReconciling ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Auto Reconcile
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by transaction ID, invoice, or reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Reconciliation Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="matched">Matched</SelectItem>
              <SelectItem value="mismatched">Mismatched</SelectItem>
              <SelectItem value="manual_review">Manual Review</SelectItem>
              <SelectItem value="reconciled">Reconciled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Reconciliation Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Gateway</TableHead>
                <TableHead>Bank Reference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-sm">
                    {payment.transactionId}
                  </TableCell>
                  <TableCell>{payment.invoiceNumber}</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{payment.gateway}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {payment.gatewayResponse?.bankReference || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getStatusColor(payment.reconciliation.status)}
                    >
                      <div className="flex items-center gap-1">
                        {getStatusIcon(payment.reconciliation.status)}
                        <span className="capitalize">
                          {payment.reconciliation.status.replace("_", " ")}
                        </span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(
                      payment.completedAt || payment.initiatedAt,
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowReconcileModal(true);
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      {payment.reconciliation.status === "manual_review" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedPayment(payment);
                            setShowReviewModal(true);
                          }}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Review
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

      {/* Reconciliation Details Modal */}
      <Dialog open={showReconcileModal} onOpenChange={setShowReconcileModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Reconciliation Details</DialogTitle>
            <DialogDescription>
              {selectedPayment &&
                `Transaction ${selectedPayment.transactionId}`}
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <ReconciliationDetailsView
              payment={selectedPayment}
              bankStatements={bankStatements}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Manual Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manual Review</DialogTitle>
            <DialogDescription>
              Review and resolve reconciliation discrepancies
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Transaction ID</Label>
                  <p className="font-mono text-sm">
                    {selectedPayment.transactionId}
                  </p>
                </div>
                <div>
                  <Label>Amount</Label>
                  <p className="font-semibold">
                    {formatCurrency(selectedPayment.amount)}
                  </p>
                </div>
              </div>

              <div>
                <Label>Review Notes</Label>
                <textarea
                  className="w-full p-3 border rounded-md"
                  rows={4}
                  value={reconciliationNotes}
                  onChange={(e) => setReconciliationNotes(e.target.value)}
                  placeholder="Enter your review notes and resolution details..."
                />
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowReviewModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onManualReview(selectedPayment.id, reconciliationNotes);
                    setShowReviewModal(false);
                    setReconciliationNotes("");
                  }}
                >
                  Resolve
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Reconciliation Details View Component
interface ReconciliationDetailsViewProps {
  payment: PaymentTransaction;
  bankStatements: BankStatementEntry[];
}

function ReconciliationDetailsView({
  payment,
  bankStatements,
}: ReconciliationDetailsViewProps) {
  const matchingStatement = bankStatements.find((stmt) =>
    stmt.reference.includes(
      payment.gatewayResponse?.bankReference || payment.transactionId,
    ),
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Transaction ID</Label>
              <p className="font-mono text-sm">{payment.transactionId}</p>
            </div>
            <div>
              <Label>Amount</Label>
              <p className="text-lg font-semibold">
                ₹{payment.amount.toLocaleString()}
              </p>
            </div>
            <div>
              <Label>Gateway</Label>
              <p>{payment.gateway}</p>
            </div>
            <div>
              <Label>Bank Reference</Label>
              <p className="font-mono text-sm">
                {payment.gatewayResponse?.bankReference || "—"}
              </p>
            </div>
            <div>
              <Label>Date</Label>
              <p>
                {new Date(
                  payment.completedAt || payment.initiatedAt,
                ).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bank Statement Match */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bank Statement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {matchingStatement ? (
              <>
                <div>
                  <Label>Entry ID</Label>
                  <p className="font-mono text-sm">
                    {matchingStatement.entryId}
                  </p>
                </div>
                <div>
                  <Label>Credit Amount</Label>
                  <p className="text-lg font-semibold">
                    ₹{matchingStatement.creditAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>Description</Label>
                  <p className="text-sm">{matchingStatement.description}</p>
                </div>
                <div>
                  <Label>Reference</Label>
                  <p className="font-mono text-sm">
                    {matchingStatement.reference}
                  </p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p>{new Date(matchingStatement.date).toLocaleString()}</p>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No matching bank statement found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Reconciliation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Reconciliation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(payment.reconciliation.status)}>
              {payment.reconciliation.status.replace("_", " ")}
            </Badge>
            {payment.reconciliation.autoReconciled && (
              <Badge variant="outline">Auto Reconciled</Badge>
            )}
            {payment.reconciliation.matchedAt && (
              <span className="text-sm text-muted-foreground">
                Matched on{" "}
                {new Date(
                  payment.reconciliation.matchedAt,
                ).toLocaleDateString()}
              </span>
            )}
          </div>
          {payment.reconciliation.manualNotes && (
            <div className="mt-3">
              <Label>Notes</Label>
              <p className="text-sm bg-gray-50 p-3 rounded">
                {payment.reconciliation.manualNotes}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Mock data generator for bank statements
function generateMockBankStatements(): BankStatementEntry[] {
  return [
    {
      entryId: "STMT-001",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      description: "UPI/TXN-2024-001/Mumbai Central",
      creditAmount: 25000,
      balance: 125000,
      reference: "TXN-2024-001",
      utr: "403993715518",
    },
    {
      entryId: "STMT-002",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      description: "NEFT/RTGS Credit/BuildCorp",
      creditAmount: 18500,
      balance: 100000,
      reference: "NEFT456789",
      utr: "403993715519",
    },
  ];
}

function getStatusColor(status: ReconciliationStatus) {
  switch (status) {
    case "matched":
    case "reconciled":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "mismatched":
      return "bg-red-100 text-red-800";
    case "manual_review":
      return "bg-orange-100 text-orange-800";
    case "duplicate":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default PaymentReconciliation;
