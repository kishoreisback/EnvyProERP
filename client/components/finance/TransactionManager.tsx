import React, { useState, useMemo } from "react";
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
  DialogFooter,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  FileText,
  Download,
  Upload,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import {
  TenantTransaction,
  TenantFinancialAccount,
  JournalEntry,
  TransactionType,
  TransactionStatus,
  Currency,
} from "./types";
import { getTransactionsByTenant, getFinancialAccountsByTenant } from "./data";
import { useToast } from "../ui/use-toast";

interface TransactionManagerProps {
  tenantId: string;
  accounts: TenantFinancialAccount[];
  onTransactionCreate?: (transaction: TenantTransaction) => void;
  onTransactionUpdate?: (transaction: TenantTransaction) => void;
}

export function TransactionManager({
  tenantId,
  accounts,
  onTransactionCreate,
  onTransactionUpdate,
}: TransactionManagerProps) {
  const [transactions, setTransactions] = useState<TenantTransaction[]>(
    getTransactionsByTenant(tenantId),
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<TenantTransaction | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Transaction form state
  const [transactionForm, setTransactionForm] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "journal_entry" as TransactionType,
    reference: "",
    description: "",
    journalEntries: [
      { accountId: "", debitAmount: 0, creditAmount: 0, description: "" },
      { accountId: "", debitAmount: 0, creditAmount: 0, description: "" },
    ] as Partial<JournalEntry>[],
  });

  const { toast } = useToast();

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        !searchQuery ||
        transaction.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        transaction.transactionNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;
      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [transactions, searchQuery, statusFilter, typeFilter]);

  // Get account by ID
  const getAccount = (accountId: string) => {
    return accounts.find((acc) => acc.id === accountId);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status: TransactionStatus) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800",
      pending_approval: "bg-yellow-100 text-yellow-800",
      approved: "bg-blue-100 text-blue-800",
      posted: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      reversed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Add journal entry row
  const addJournalEntry = () => {
    setTransactionForm((prev) => ({
      ...prev,
      journalEntries: [
        ...prev.journalEntries,
        { accountId: "", debitAmount: 0, creditAmount: 0, description: "" },
      ],
    }));
  };

  // Remove journal entry row
  const removeJournalEntry = (index: number) => {
    if (transactionForm.journalEntries.length <= 2) return; // Minimum 2 entries

    setTransactionForm((prev) => ({
      ...prev,
      journalEntries: prev.journalEntries.filter((_, i) => i !== index),
    }));
  };

  // Update journal entry
  const updateJournalEntry = (index: number, field: string, value: any) => {
    setTransactionForm((prev) => ({
      ...prev,
      journalEntries: prev.journalEntries.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry,
      ),
    }));
  };

  // Calculate totals
  const calculateTotals = () => {
    const totalDebits = transactionForm.journalEntries.reduce(
      (sum, entry) => sum + (entry.debitAmount || 0),
      0,
    );
    const totalCredits = transactionForm.journalEntries.reduce(
      (sum, entry) => sum + (entry.creditAmount || 0),
      0,
    );
    return {
      totalDebits,
      totalCredits,
      isBalanced: totalDebits === totalCredits,
    };
  };

  // Create transaction
  const handleCreateTransaction = () => {
    const { totalDebits, totalCredits, isBalanced } = calculateTotals();

    if (!isBalanced) {
      toast({
        title: "Transaction Not Balanced",
        description: "Total debits must equal total credits",
        variant: "destructive",
      });
      return;
    }

    const newTransaction: TenantTransaction = {
      id: `txn_${Date.now()}`,
      tenantId,
      transactionNumber: `JE-${new Date().getFullYear()}-${String(transactions.length + 1).padStart(3, "0")}`,
      date: transactionForm.date,
      type: transactionForm.type,
      reference: transactionForm.reference,
      description: transactionForm.description,
      totalAmount: totalDebits,
      currency: "INR",
      journalEntries: transactionForm.journalEntries.map((entry, index) => ({
        id: `je_${Date.now()}_${index}`,
        accountId: entry.accountId!,
        accountCode: getAccount(entry.accountId!)?.accountCode || "",
        accountName: getAccount(entry.accountId!)?.accountName || "",
        debitAmount: entry.debitAmount || 0,
        creditAmount: entry.creditAmount || 0,
        description: entry.description || "",
      })),
      attachments: [],
      status: "draft",
      approvalLevel: 0,
      sourceModule: "manual",
      createdBy: "current_user",
      createdAt: new Date().toISOString(),
    };

    setTransactions((prev) => [...prev, newTransaction]);
    onTransactionCreate?.(newTransaction);
    setShowCreateDialog(false);

    // Reset form
    setTransactionForm({
      date: new Date().toISOString().split("T")[0],
      type: "journal_entry",
      reference: "",
      description: "",
      journalEntries: [
        { accountId: "", debitAmount: 0, creditAmount: 0, description: "" },
        { accountId: "", debitAmount: 0, creditAmount: 0, description: "" },
      ],
    });

    toast({
      title: "Transaction Created",
      description: `Transaction ${newTransaction.transactionNumber} has been created successfully.`,
    });
  };

  const { totalDebits, totalCredits, isBalanced } = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Transaction Management</h2>
          <p className="text-muted-foreground">
            Record and manage financial transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending_approval">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="posted">Posted</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="journal_entry">Journal Entry</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="receipt">Receipt</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
                <SelectItem value="adjustment">Adjustment</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transactions found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono">
                    {transaction.transactionNumber}
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="capitalize">
                    {transaction.type.replace("_", " ")}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {transaction.description}
                  </TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(transaction.totalAmount)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setShowViewDialog(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Print Voucher
                        </DropdownMenuItem>
                        {transaction.status === "draft" && (
                          <DropdownMenuItem>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Transaction Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Transaction</DialogTitle>
            <DialogDescription>
              Create a new journal entry with proper debits and credits
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Transaction Header */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={transactionForm.date}
                  onChange={(e) =>
                    setTransactionForm((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select
                  value={transactionForm.type}
                  onValueChange={(value) =>
                    setTransactionForm((prev) => ({
                      ...prev,
                      type: value as TransactionType,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="journal_entry">Journal Entry</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="receipt">Receipt</SelectItem>
                    <SelectItem value="adjustment">Adjustment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reference">Reference</Label>
                <Input
                  id="reference"
                  value={transactionForm.reference}
                  onChange={(e) =>
                    setTransactionForm((prev) => ({
                      ...prev,
                      reference: e.target.value,
                    }))
                  }
                  placeholder="Invoice #, Check #, etc."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={transactionForm.description}
                onChange={(e) =>
                  setTransactionForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe the transaction..."
              />
            </div>

            {/* Journal Entries */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Journal Entries</Label>
                <Button variant="outline" size="sm" onClick={addJournalEntry}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Line
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Debit</TableHead>
                      <TableHead>Credit</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionForm.journalEntries.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Select
                            value={entry.accountId}
                            onValueChange={(value) =>
                              updateJournalEntry(index, "accountId", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts
                                .filter((acc) => acc.allowDirectPosting)
                                .map((account) => (
                                  <SelectItem
                                    key={account.id}
                                    value={account.id}
                                  >
                                    {account.accountCode} -{" "}
                                    {account.accountName}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={entry.description}
                            onChange={(e) =>
                              updateJournalEntry(
                                index,
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="Line description"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={entry.debitAmount || ""}
                            onChange={(e) => {
                              updateJournalEntry(
                                index,
                                "debitAmount",
                                parseFloat(e.target.value) || 0,
                              );
                              updateJournalEntry(index, "creditAmount", 0);
                            }}
                            placeholder="0.00"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={entry.creditAmount || ""}
                            onChange={(e) => {
                              updateJournalEntry(
                                index,
                                "creditAmount",
                                parseFloat(e.target.value) || 0,
                              );
                              updateJournalEntry(index, "debitAmount", 0);
                            }}
                            placeholder="0.00"
                          />
                        </TableCell>
                        <TableCell>
                          {transactionForm.journalEntries.length > 2 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeJournalEntry(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Totals */}
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Total Debits:</span>
                    <span className="ml-2">{formatCurrency(totalDebits)}</span>
                  </div>
                  <div>
                    <span className="font-medium">Total Credits:</span>
                    <span className="ml-2">{formatCurrency(totalCredits)}</span>
                  </div>
                  <div>
                    <span className="font-medium">Balance:</span>
                    <span
                      className={`ml-2 ${isBalanced ? "text-green-600" : "text-red-600"}`}
                    >
                      {isBalanced
                        ? "Balanced"
                        : `Out of balance: ${formatCurrency(Math.abs(totalDebits - totalCredits))}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateTransaction} disabled={!isBalanced}>
              Create Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Transaction Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              {selectedTransaction?.transactionNumber}
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-6">
              {/* Transaction Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <p className="text-sm">
                    {new Date(selectedTransaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label>Type</Label>
                  <p className="text-sm capitalize">
                    {selectedTransaction.type.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <Label>Reference</Label>
                  <p className="text-sm">{selectedTransaction.reference}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedTransaction.status)}>
                    {selectedTransaction.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <p className="text-sm mt-1">
                  {selectedTransaction.description}
                </p>
              </div>

              {/* Journal Entries */}
              <div>
                <Label>Journal Entries</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Debit</TableHead>
                      <TableHead>Credit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTransaction.journalEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {entry.accountCode}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {entry.accountName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{entry.description}</TableCell>
                        <TableCell>
                          {entry.debitAmount > 0 &&
                            formatCurrency(entry.debitAmount)}
                        </TableCell>
                        <TableCell>
                          {entry.creditAmount > 0 &&
                            formatCurrency(entry.creditAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Print Voucher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
