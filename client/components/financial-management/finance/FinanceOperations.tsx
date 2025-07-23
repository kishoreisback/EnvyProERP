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
  Receipt,
  FileText,
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  Building2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Send,
  MoreHorizontal,
  CreditCard,
  Banknote,
  Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getInvoicesByTenant,
  getBudgetsByTenant,
  formatCurrency,
  formatPercentage,
} from "../data";

interface FinanceOperationsProps {
  tenantId: string;
}

export function FinanceOperations({ tenantId }: FinanceOperationsProps) {
  const [activeTab, setActiveTab] = useState("invoices");
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showNewBudgetModal, setShowNewBudgetModal] = useState(false);

  // Get finance data
  const invoices = useMemo(() => getInvoicesByTenant(tenantId), [tenantId]);
  const budgets = useMemo(() => getBudgetsByTenant(tenantId), [tenantId]);

  // Calculate summary metrics
  const invoiceSummary = useMemo(() => {
    const total = invoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
    const paid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    const outstanding = invoices.reduce(
      (sum, inv) => sum + inv.balanceAmount,
      0,
    );
    const overdue = invoices.filter(
      (inv) =>
        inv.status === "overdue" ||
        (new Date(inv.dueDate) < new Date() && inv.balanceAmount > 0),
    ).length;

    return { total, paid, outstanding, overdue, count: invoices.length };
  }, [invoices]);

  const budgetSummary = useMemo(() => {
    const activeBudgets = budgets.filter((b) => b.status === "active");
    const totalBudget = activeBudgets.reduce(
      (sum, b) => sum + b.totalBudget,
      0,
    );
    const totalSpent = activeBudgets.reduce((sum, b) => sum + b.spentAmount, 0);
    const totalRemaining = activeBudgets.reduce(
      (sum, b) => sum + b.remainingAmount,
      0,
    );
    const utilizationRate =
      totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    return {
      totalBudget,
      totalSpent,
      totalRemaining,
      utilizationRate,
      count: activeBudgets.length,
    };
  }, [budgets]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { variant: "secondary" as const, label: "Draft" },
      sent: { variant: "outline" as const, label: "Sent" },
      viewed: { variant: "secondary" as const, label: "Viewed" },
      paid: { variant: "default" as const, label: "Paid" },
      partially_paid: { variant: "secondary" as const, label: "Partial" },
      overdue: { variant: "destructive" as const, label: "Overdue" },
      cancelled: { variant: "destructive" as const, label: "Cancelled" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Finance Operations Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Finance Operations</h2>
          <p className="text-muted-foreground">
            Manage invoices, budgets, and financial transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowNewInvoiceModal(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowNewBudgetModal(true)}
            className="gap-2"
          >
            <Calculator className="h-4 w-4" />
            New Budget
          </Button>
        </div>
      </div>

      {/* Finance KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invoices
            </CardTitle>
            <Receipt className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              <AnimatedCounter value={invoiceSummary.count} />
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(invoiceSummary.total)} total value
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(invoiceSummary.paid)}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(
                (invoiceSummary.paid / invoiceSummary.total) * 100,
              )}{" "}
              collection rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(invoiceSummary.outstanding)}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoiceSummary.overdue} overdue invoices
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Budget Utilization
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {budgetSummary.utilizationRate.toFixed(1)}%
            </div>
            <Progress value={budgetSummary.utilizationRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Finance Operations Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="invoices" className="gap-2">
            <Receipt className="h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="budgets" className="gap-2">
            <Calculator className="h-4 w-4" />
            Budgets
          </TabsTrigger>
          <TabsTrigger value="transactions" className="gap-2">
            <FileText className="h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Invoice Management</CardTitle>
                  <CardDescription>
                    Create, track, and manage customer invoices
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search invoices..."
                      className="pl-8 w-64"
                    />
                  </div>
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
                    <TableHead>Invoice No.</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell>{invoice.customerName}</TableCell>
                      <TableCell>
                        {new Date(invoice.invoiceDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(invoice.grandTotal)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(invoice.paidAmount)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(invoice.balanceAmount)}
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Send className="h-4 w-4" />
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

        <TabsContent value="budgets" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Budget Management</CardTitle>
                  <CardDescription>
                    Plan and monitor financial budgets
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="2024">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {budgets.map((budget) => (
                <Card key={budget.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {budget.budgetName}
                        </CardTitle>
                        <CardDescription>
                          {budget.startDate} to {budget.endDate}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            budget.status === "active" ? "default" : "secondary"
                          }
                        >
                          {budget.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Budget
                        </p>
                        <p className="font-bold text-lg">
                          {formatCurrency(budget.totalBudget)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Allocated
                        </p>
                        <p className="font-bold text-lg text-blue-600">
                          {formatCurrency(budget.allocatedAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Spent</p>
                        <p className="font-bold text-lg text-orange-600">
                          {formatCurrency(budget.spentAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Remaining
                        </p>
                        <p className="font-bold text-lg text-green-600">
                          {formatCurrency(budget.remainingAmount)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Budget Utilization</span>
                        <span>
                          {formatPercentage(
                            (budget.spentAmount / budget.totalBudget) * 100,
                          )}
                        </span>
                      </div>
                      <Progress
                        value={(budget.spentAmount / budget.totalBudget) * 100}
                        className="h-2"
                      />
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Budget Items</h4>
                      {budget.budgetItems.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>{item.accountName}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">
                              {formatCurrency(item.spentAmount)} /{" "}
                              {formatCurrency(item.budgetedAmount)}
                            </span>
                            <Badge
                              variant={
                                item.varianceAmount >= 0
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {formatPercentage(
                                Math.abs(item.variancePercentage),
                              )}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Transactions</CardTitle>
              <CardDescription>
                Recent financial transactions and journal entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Transaction management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Generate and export financial reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Financial reporting coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Invoice Modal */}
      <Dialog open={showNewInvoiceModal} onOpenChange={setShowNewInvoiceModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Generate a new invoice for your customer
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">
            <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Invoice creation form coming soon</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Budget Modal */}
      <Dialog open={showNewBudgetModal} onOpenChange={setShowNewBudgetModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              Set up a new financial budget plan
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">
            <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Budget creation form coming soon</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
