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
import { Switch } from "@/components/ui/switch";
import {
  CreditCard,
  Smartphone,
  University,
  Wallet,
  QrCode,
  Shield,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  RefreshCw,
  Settings,
  Activity,
  Zap,
  Globe,
  Building2,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getPaymentTransactionsByTenant,
  getFinancialTenants,
  formatCurrency,
  formatPercentage,
} from "../data";
import { PaymentGateway, PaymentMethod, PaymentStatus } from "../types";

interface PaymentProcessingProps {
  tenantId: string;
}

export function PaymentProcessing({ tenantId }: PaymentProcessingProps) {
  const [activeTab, setActiveTab] = useState("transactions");
  const [showNewGatewayModal, setShowNewGatewayModal] = useState(false);
  const [showProcessPaymentModal, setShowProcessPaymentModal] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState("current_month");

  // Get payment data
  const paymentTransactions = useMemo(
    () => getPaymentTransactionsByTenant(tenantId),
    [tenantId],
  );
  const tenant = useMemo(() => {
    const tenants = getFinancialTenants();
    return tenants.find((t) => t.id === tenantId);
  }, [tenantId]);

  // Calculate payment metrics
  const paymentMetrics = useMemo(() => {
    const totalTransactions = paymentTransactions.length;
    const successfulTransactions = paymentTransactions.filter(
      (p) => p.status === "success",
    ).length;
    const failedTransactions = paymentTransactions.filter(
      (p) => p.status === "failed",
    ).length;
    const totalAmount = paymentTransactions
      .filter((p) => p.status === "success")
      .reduce((sum, p) => sum + p.amount, 0);
    const totalFees = paymentTransactions
      .filter((p) => p.status === "success")
      .reduce((sum, p) => sum + p.fees.totalDeduction, 0);
    const successRate =
      totalTransactions > 0
        ? (successfulTransactions / totalTransactions) * 100
        : 0;

    const methodBreakdown = paymentTransactions.reduce(
      (acc, payment) => {
        if (payment.status === "success") {
          acc[payment.paymentMethod] =
            (acc[payment.paymentMethod] || 0) + payment.amount;
        }
        return acc;
      },
      {} as Record<PaymentMethod, number>,
    );

    const gatewayBreakdown = paymentTransactions.reduce(
      (acc, payment) => {
        if (payment.status === "success") {
          acc[payment.gateway] = (acc[payment.gateway] || 0) + payment.amount;
        }
        return acc;
      },
      {} as Record<PaymentGateway, number>,
    );

    return {
      totalTransactions,
      successfulTransactions,
      failedTransactions,
      totalAmount,
      totalFees,
      successRate,
      methodBreakdown,
      gatewayBreakdown,
    };
  }, [paymentTransactions]);

  const getStatusBadge = (status: PaymentStatus) => {
    const statusConfig = {
      initiated: {
        variant: "secondary" as const,
        label: "Initiated",
        icon: Clock,
      },
      pending: { variant: "secondary" as const, label: "Pending", icon: Clock },
      processing: {
        variant: "secondary" as const,
        label: "Processing",
        icon: RefreshCw,
      },
      success: {
        variant: "default" as const,
        label: "Success",
        icon: CheckCircle,
      },
      failed: {
        variant: "destructive" as const,
        label: "Failed",
        icon: XCircle,
      },
      cancelled: {
        variant: "destructive" as const,
        label: "Cancelled",
        icon: XCircle,
      },
      refunded: {
        variant: "outline" as const,
        label: "Refunded",
        icon: ArrowDownRight,
      },
      partially_refunded: {
        variant: "outline" as const,
        label: "Partial Refund",
        icon: ArrowDownRight,
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    const icons = {
      credit_card: CreditCard,
      debit_card: CreditCard,
      net_banking: University,
      upi: Smartphone,
      wallet: Wallet,
      emi: CreditCard,
      bank_transfer: University,
    };
    const Icon = icons[method] || CreditCard;
    return <Icon className="h-4 w-4" />;
  };

  const getGatewayConfig = (gateway: PaymentGateway) => {
    const configs = {
      razorpay: {
        name: "Razorpay",
        color: "bg-blue-100 text-blue-700",
        logo: "R",
      },
      payu: { name: "PayU", color: "bg-green-100 text-green-700", logo: "P" },
      cashfree: {
        name: "Cashfree",
        color: "bg-purple-100 text-purple-700",
        logo: "C",
      },
      stripe: {
        name: "Stripe",
        color: "bg-indigo-100 text-indigo-700",
        logo: "S",
      },
      paypal: {
        name: "PayPal",
        color: "bg-yellow-100 text-yellow-700",
        logo: "PP",
      },
      phonepe: {
        name: "PhonePe",
        color: "bg-violet-100 text-violet-700",
        logo: "Pe",
      },
      paytm: { name: "Paytm", color: "bg-blue-100 text-blue-700", logo: "Pt" },
    };
    return configs[gateway] || configs.razorpay;
  };

  return (
    <div className="space-y-6">
      {/* Payment Processing Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Payment Processing</h2>
          <p className="text-muted-foreground">
            Manage payment gateways and process transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowProcessPaymentModal(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Process Payment
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowNewGatewayModal(true)}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Gateway Settings
          </Button>
        </div>
      </div>

      {/* Payment KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Processed
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(paymentMetrics.totalAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              {paymentMetrics.successfulTransactions} successful transactions
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {paymentMetrics.successRate.toFixed(1)}%
            </div>
            <Progress value={paymentMetrics.successRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gateway Fees</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(paymentMetrics.totalFees)}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(
                (paymentMetrics.totalFees / paymentMetrics.totalAmount) * 100,
              )}{" "}
              of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Failed Payments
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              <AnimatedCounter value={paymentMetrics.failedTransactions} />
            </div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(
                (paymentMetrics.failedTransactions /
                  paymentMetrics.totalTransactions) *
                  100 || 0,
              )}{" "}
              failure rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Processing Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions" className="gap-2">
            <Activity className="h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="gateways" className="gap-2">
            <Globe className="h-4 w-4" />
            Gateways
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reconciliation" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reconciliation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payment Transactions</CardTitle>
                  <CardDescription>
                    Monitor and manage payment transactions
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedTimeRange}
                    onValueChange={setSelectedTimeRange}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current_month">This Month</SelectItem>
                      <SelectItem value="last_month">Last Month</SelectItem>
                      <SelectItem value="current_quarter">
                        This Quarter
                      </SelectItem>
                      <SelectItem value="current_year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
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
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Gateway</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fees</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentTransactions.map((transaction) => {
                    const gatewayConfig = getGatewayConfig(transaction.gateway);
                    return (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-sm">
                          {transaction.transactionId}
                        </TableCell>
                        <TableCell>
                          {new Date(
                            transaction.paymentDate,
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{transaction.customerId}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getPaymentMethodIcon(transaction.paymentMethod)}
                            <span className="capitalize">
                              {transaction.paymentMethod.replace("_", " ")}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold",
                                gatewayConfig.color,
                              )}
                            >
                              {gatewayConfig.logo}
                            </div>
                            <span>{gatewayConfig.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(transaction.status)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(transaction.fees.totalDeduction)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gateways" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payment Gateways</CardTitle>
                  <CardDescription>
                    Configure and manage payment gateway integrations
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowNewGatewayModal(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Gateway
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {tenant?.configuration.integrations.paymentGateways.map(
                (gateway) => {
                  const config = getGatewayConfig(gateway.gatewayName);
                  const totalTransactions = paymentTransactions.filter(
                    (p) => p.gateway === gateway.gatewayName,
                  ).length;
                  const successfulTransactions = paymentTransactions.filter(
                    (p) =>
                      p.gateway === gateway.gatewayName &&
                      p.status === "success",
                  ).length;
                  const successRate =
                    totalTransactions > 0
                      ? (successfulTransactions / totalTransactions) * 100
                      : 0;

                  return (
                    <Card
                      key={gateway.id}
                      className="border-l-4 border-l-blue-500"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "h-10 w-10 rounded-lg flex items-center justify-center text-lg font-bold",
                                config.color,
                              )}
                            >
                              {config.logo}
                            </div>
                            <div>
                              <h3 className="font-semibold">{config.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Environment: {gateway.credentials.environment}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch checked={gateway.isActive} />
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Total Transactions
                            </p>
                            <p className="font-bold text-lg">
                              {totalTransactions}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Success Rate
                            </p>
                            <p className="font-bold text-lg text-green-600">
                              {successRate.toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Supported Methods
                            </p>
                            <p className="font-bold text-lg">
                              {gateway.supportedMethods.length}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Avg. Fee
                            </p>
                            <p className="font-bold text-lg">
                              {gateway.transactionFees.length > 0
                                ? `${gateway.transactionFees[0].feeValue}%`
                                : "N/A"}
                            </p>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">
                            Supported Payment Methods
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {gateway.supportedMethods.map((method) => (
                              <Badge
                                key={method}
                                variant="outline"
                                className="gap-1"
                              >
                                {getPaymentMethodIcon(method)}
                                {method.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                },
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Method Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Payment Method Analysis
                </CardTitle>
                <CardDescription>
                  Transaction volume by payment method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(paymentMetrics.methodBreakdown).map(
                  ([method, amount]) => {
                    const percentage =
                      (amount / paymentMetrics.totalAmount) * 100;
                    return (
                      <div
                        key={method}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {getPaymentMethodIcon(method as PaymentMethod)}
                          <span className="font-medium capitalize">
                            {method.replace("_", " ")}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(amount)}</p>
                          <p className="text-sm text-muted-foreground">
                            {percentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    );
                  },
                )}
              </CardContent>
            </Card>

            {/* Gateway Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Gateway Performance
                </CardTitle>
                <CardDescription>Transaction volume by gateway</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(paymentMetrics.gatewayBreakdown).map(
                  ([gateway, amount]) => {
                    const config = getGatewayConfig(gateway as PaymentGateway);
                    const percentage =
                      (amount / paymentMetrics.totalAmount) * 100;
                    return (
                      <div
                        key={gateway}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold",
                              config.color,
                            )}
                          >
                            {config.logo}
                          </div>
                          <span className="font-medium">{config.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(amount)}</p>
                          <p className="text-sm text-muted-foreground">
                            {percentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    );
                  },
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Reconciliation</CardTitle>
              <CardDescription>
                Reconcile gateway settlements with accounting records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Payment reconciliation coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Process Payment Modal */}
      <Dialog
        open={showProcessPaymentModal}
        onOpenChange={setShowProcessPaymentModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
            <DialogDescription>
              Create a new payment transaction
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">
            <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Payment processing form coming soon</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gateway Settings Modal */}
      <Dialog open={showNewGatewayModal} onOpenChange={setShowNewGatewayModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gateway Configuration</DialogTitle>
            <DialogDescription>
              Configure payment gateway settings
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Gateway configuration form coming soon</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
