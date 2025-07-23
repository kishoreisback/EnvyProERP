import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  BookOpen,
  Calculator,
  FileText,
  BarChart3,
  PieChart,
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  RefreshCw,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getChartOfAccountsByTenant,
  getFinancialTransactionsByTenant,
  formatCurrency,
  formatPercentage,
} from "../data";
import { AccountType } from "../types";

interface AccountingManagementProps {
  tenantId: string;
}

export function AccountingManagement({ tenantId }: AccountingManagementProps) {
  const [activeTab, setActiveTab] = useState("chart-of-accounts");
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [showNewJournalModal, setShowNewJournalModal] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState<
    AccountType | "all"
  >("all");

  // Get accounting data
  const chartOfAccounts = useMemo(
    () => getChartOfAccountsByTenant(tenantId),
    [tenantId],
  );
  const transactions = useMemo(
    () => getFinancialTransactionsByTenant(tenantId),
    [tenantId],
  );

  // Filter accounts by type
  const filteredAccounts = useMemo(() => {
    if (selectedAccountType === "all") return chartOfAccounts;
    return chartOfAccounts.filter(
      (account) => account.accountType === selectedAccountType,
    );
  }, [chartOfAccounts, selectedAccountType]);

  // Calculate account type summaries
  const accountTypeSummaries = useMemo(() => {
    const summaries = {
      assets: { count: 0, balance: 0 },
      liabilities: { count: 0, balance: 0 },
      equity: { count: 0, balance: 0 },
      revenue: { count: 0, balance: 0 },
      expenses: { count: 0, balance: 0 },
      cost_of_goods_sold: { count: 0, balance: 0 },
    };

    chartOfAccounts.forEach((account) => {
      summaries[account.accountType].count++;
      summaries[account.accountType].balance += account.currentBalance;
    });

    return summaries;
  }, [chartOfAccounts]);

  // Calculate trial balance
  const trialBalance = useMemo(() => {
    let totalDebits = 0;
    let totalCredits = 0;

    chartOfAccounts.forEach((account) => {
      if (
        ["assets", "expenses", "cost_of_goods_sold"].includes(
          account.accountType,
        )
      ) {
        totalDebits += Math.max(0, account.currentBalance);
      } else {
        totalCredits += Math.max(0, account.currentBalance);
      }
    });

    return {
      totalDebits,
      totalCredits,
      isBalanced: Math.abs(totalDebits - totalCredits) < 1,
    };
  }, [chartOfAccounts]);

  const getAccountTypeIcon = (type: AccountType) => {
    const icons = {
      assets: Building2,
      liabilities: AlertTriangle,
      equity: PieChart,
      revenue: TrendingUp,
      expenses: TrendingDown,
      cost_of_goods_sold: Calculator,
    };
    const Icon = icons[type];
    return <Icon className="h-4 w-4" />;
  };

  const getAccountTypeColor = (type: AccountType) => {
    const colors = {
      assets: "text-blue-600",
      liabilities: "text-red-600",
      equity: "text-purple-600",
      revenue: "text-green-600",
      expenses: "text-orange-600",
      cost_of_goods_sold: "text-gray-600",
    };
    return colors[type];
  };

  const getAccountIndentation = (level: number) => {
    return `pl-${Math.min(level * 4, 16)}`;
  };

  return (
    <div className="space-y-6">
      {/* Accounting Management Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Accounting Management</h2>
          <p className="text-muted-foreground">
            Manage chart of accounts, journal entries, and ledgers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowNewAccountModal(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            New Account
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowNewJournalModal(true)}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Journal Entry
          </Button>
        </div>
      </div>

      {/* Accounting KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(accountTypeSummaries.assets.balance)}
            </div>
            <p className="text-xs text-muted-foreground">
              {accountTypeSummaries.assets.count} accounts
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Liabilities
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(accountTypeSummaries.liabilities.balance)}
            </div>
            <p className="text-xs text-muted-foreground">
              {accountTypeSummaries.liabilities.count} accounts
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(accountTypeSummaries.revenue.balance)}
            </div>
            <p className="text-xs text-muted-foreground">
              {accountTypeSummaries.revenue.count} accounts
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trial Balance</CardTitle>
            {trialBalance.isBalanced ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "text-2xl font-bold",
                trialBalance.isBalanced ? "text-green-600" : "text-red-600",
              )}
            >
              {trialBalance.isBalanced ? "Balanced" : "Unbalanced"}
            </div>
            <p className="text-xs text-muted-foreground">
              Dr: {formatCurrency(trialBalance.totalDebits)} | Cr:{" "}
              {formatCurrency(trialBalance.totalCredits)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Accounting Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="chart-of-accounts" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Chart of Accounts
          </TabsTrigger>
          <TabsTrigger value="journal-entries" className="gap-2">
            <FileText className="h-4 w-4" />
            Journal Entries
          </TabsTrigger>
          <TabsTrigger value="ledger" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            General Ledger
          </TabsTrigger>
          <TabsTrigger value="trial-balance" className="gap-2">
            <Calculator className="h-4 w-4" />
            Trial Balance
          </TabsTrigger>
          <TabsTrigger value="reconciliation" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reconciliation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chart-of-accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Chart of Accounts</CardTitle>
                  <CardDescription>
                    Manage your accounting structure and accounts
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedAccountType}
                    onValueChange={setSelectedAccountType}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Account Types</SelectItem>
                      <SelectItem value="assets">Assets</SelectItem>
                      <SelectItem value="liabilities">Liabilities</SelectItem>
                      <SelectItem value="equity">Equity</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="expenses">Expenses</SelectItem>
                      <SelectItem value="cost_of_goods_sold">
                        Cost of Goods Sold
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search accounts..."
                      className="pl-8 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account Code</TableHead>
                    <TableHead>Account Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Current Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-mono font-medium">
                        {account.accountCode}
                      </TableCell>
                      <TableCell
                        className={getAccountIndentation(account.level)}
                      >
                        <div className="flex items-center gap-2">
                          {getAccountTypeIcon(account.accountType)}
                          <span
                            className={cn(
                              account.level === 1
                                ? "font-semibold"
                                : account.level === 2
                                  ? "font-medium"
                                  : "",
                            )}
                          >
                            {account.accountName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getAccountTypeColor(account.accountType)}
                        >
                          {account.accountType.replace("_", " ").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "font-medium",
                          account.currentBalance >= 0
                            ? "text-green-600"
                            : "text-red-600",
                        )}
                      >
                        {formatCurrency(Math.abs(account.currentBalance))}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={account.isActive ? "default" : "secondary"}
                        >
                          {account.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {account.allowDirectPosting && (
                            <Button variant="ghost" size="sm">
                              <Plus className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="journal-entries" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Journal Entries</CardTitle>
                  <CardDescription>
                    Record and manage journal entries
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Entries</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="posted">Posted</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entry No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono">
                        {transaction.transactionNumber}
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.reference}</TableCell>
                      <TableCell>
                        {formatCurrency(transaction.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "approved"
                              ? "default"
                              : transaction.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ledger" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Ledger</CardTitle>
              <CardDescription>
                View detailed account transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>General ledger view coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trial-balance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Trial Balance</CardTitle>
                  <CardDescription>
                    Verify accounting equation balance
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="current">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Period</SelectItem>
                      <SelectItem value="previous">Previous Period</SelectItem>
                      <SelectItem value="ytd">Year to Date</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Trial Balance Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          Total Debits
                        </p>
                        <p className="text-xl font-bold text-blue-600">
                          {formatCurrency(trialBalance.totalDebits)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          Total Credits
                        </p>
                        <p className="text-xl font-bold text-red-600">
                          {formatCurrency(trialBalance.totalCredits)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className={cn(
                      "border-l-4",
                      trialBalance.isBalanced
                        ? "border-l-green-500"
                        : "border-l-orange-500",
                    )}
                  >
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          Difference
                        </p>
                        <p
                          className={cn(
                            "text-xl font-bold",
                            trialBalance.isBalanced
                              ? "text-green-600"
                              : "text-orange-600",
                          )}
                        >
                          {formatCurrency(
                            Math.abs(
                              trialBalance.totalDebits -
                                trialBalance.totalCredits,
                            ),
                          )}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Trial Balance */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account Code</TableHead>
                      <TableHead>Account Name</TableHead>
                      <TableHead className="text-right">Debit</TableHead>
                      <TableHead className="text-right">Credit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chartOfAccounts
                      .filter((account) => account.allowDirectPosting)
                      .map((account) => {
                        const isDebit = [
                          "assets",
                          "expenses",
                          "cost_of_goods_sold",
                        ].includes(account.accountType);
                        const debitAmount =
                          isDebit && account.currentBalance > 0
                            ? account.currentBalance
                            : 0;
                        const creditAmount =
                          !isDebit && account.currentBalance > 0
                            ? account.currentBalance
                            : 0;

                        return (
                          <TableRow key={account.id}>
                            <TableCell className="font-mono">
                              {account.accountCode}
                            </TableCell>
                            <TableCell>{account.accountName}</TableCell>
                            <TableCell className="text-right font-medium">
                              {debitAmount > 0
                                ? formatCurrency(debitAmount)
                                : "—"}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {creditAmount > 0
                                ? formatCurrency(creditAmount)
                                : "—"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bank Reconciliation</CardTitle>
              <CardDescription>
                Reconcile bank statements with accounting records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Bank reconciliation coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Account Modal */}
      <Dialog open={showNewAccountModal} onOpenChange={setShowNewAccountModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Account</DialogTitle>
            <DialogDescription>
              Add a new account to your chart of accounts
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Account creation form coming soon</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Journal Entry Modal */}
      <Dialog open={showNewJournalModal} onOpenChange={setShowNewJournalModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Journal Entry</DialogTitle>
            <DialogDescription>
              Record a new journal entry transaction
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Journal entry form coming soon</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
