import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  CreditCard,
  Building,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
  TrendingUp,
  Eye,
  Plus,
  ArrowLeft,
  IndianRupee,
  FileText,
  Shield,
  Zap,
  Users,
  Calendar,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const transferStats = [
  {
    label: "This Month Transfers",
    value: 384,
    change: "₹7.5Cr disbursed",
    icon: CreditCard,
    color: "text-emerald-600",
  },
  {
    label: "Success Rate",
    value: 99.2,
    change: "Industry leading",
    icon: CheckCircle,
    color: "text-blue-600",
    isPercentage: true,
  },
  {
    label: "Avg Processing Time",
    value: 45,
    change: "Minutes",
    icon: Clock,
    color: "text-construction-500",
  },
  {
    label: "Failed Transfers",
    value: 3,
    change: "0.8% failure rate",
    icon: XCircle,
    color: "text-red-600",
  },
];

const bankPartners = [
  {
    id: 1,
    bankName: "State Bank of India",
    bankCode: "SBI",
    ifscPrefix: "SBIN",
    employees: 156,
    transferMethod: "API Integration",
    successRate: 99.5,
    avgProcessingTime: "30 minutes",
    monthlyVolume: 2850000,
    lastTransfer: "2024-02-03 14:30",
    status: "active",
    features: ["NEFT", "RTGS", "IMPS", "UPI"],
  },
  {
    id: 2,
    bankName: "HDFC Bank",
    bankCode: "HDFC",
    ifscPrefix: "HDFC",
    employees: 89,
    transferMethod: "File Upload",
    successRate: 98.8,
    avgProcessingTime: "45 minutes",
    monthlyVolume: 1650000,
    lastTransfer: "2024-02-03 14:30",
    status: "active",
    features: ["NEFT", "RTGS", "IMPS"],
  },
  {
    id: 3,
    bankName: "ICICI Bank",
    bankCode: "ICICI",
    ifscPrefix: "ICIC",
    employees: 67,
    transferMethod: "API Integration",
    successRate: 99.1,
    avgProcessingTime: "35 minutes",
    monthlyVolume: 1250000,
    lastTransfer: "2024-02-03 14:30",
    status: "active",
    features: ["NEFT", "RTGS", "IMPS", "UPI"],
  },
  {
    id: 4,
    bankName: "Axis Bank",
    bankCode: "AXIS",
    ifscPrefix: "UTIB",
    employees: 45,
    transferMethod: "File Upload",
    successRate: 97.9,
    avgProcessingTime: "50 minutes",
    monthlyVolume: 890000,
    lastTransfer: "2024-02-03 14:30",
    status: "active",
    features: ["NEFT", "RTGS"],
  },
  {
    id: 5,
    bankName: "Punjab National Bank",
    bankCode: "PNB",
    ifscPrefix: "PUNB",
    employees: 27,
    transferMethod: "Manual Processing",
    successRate: 96.5,
    avgProcessingTime: "2 hours",
    monthlyVolume: 525000,
    lastTransfer: "2024-02-03 10:00",
    status: "maintenance",
    features: ["NEFT", "RTGS"],
  },
];

const recentTransfers = [
  {
    id: 1,
    batchId: "PAY202402001",
    transferDate: "2024-02-03",
    transferTime: "14:30:00",
    totalEmployees: 384,
    totalAmount: 7505000,
    successfulTransfers: 381,
    failedTransfers: 3,
    processingTime: "45 minutes",
    status: "completed",
    transferType: "Monthly Salary",
    initiatedBy: "HR Admin",
  },
  {
    id: 2,
    batchId: "ADV202401015",
    transferDate: "2024-01-25",
    transferTime: "16:00:00",
    totalEmployees: 15,
    totalAmount: 450000,
    successfulTransfers: 15,
    failedTransfers: 0,
    processingTime: "25 minutes",
    status: "completed",
    transferType: "Salary Advance",
    initiatedBy: "Finance Manager",
  },
  {
    id: 3,
    batchId: "SET202401008",
    transferDate: "2024-01-30",
    transferTime: "11:15:00",
    totalEmployees: 3,
    totalAmount: 285000,
    successfulTransfers: 3,
    failedTransfers: 0,
    processingTime: "35 minutes",
    status: "completed",
    transferType: "F&F Settlement",
    initiatedBy: "HR Manager",
  },
];

const failedTransfers = [
  {
    id: 1,
    employeeId: "EMP078",
    employeeName: "Kumar Singh",
    bankName: "Punjab National Bank",
    accountNumber: "****5678",
    ifscCode: "PUNB0123456",
    amount: 42800,
    failureReason: "Invalid account number",
    errorCode: "ACC_INVALID",
    retryCount: 2,
    lastRetry: "2024-02-03 15:45",
    status: "pending_correction",
    resolution: "Employee to update bank details",
  },
  {
    id: 2,
    employeeId: "EMP156",
    employeeName: "Vikram Singh",
    bankName: "Axis Bank",
    accountNumber: "****9012",
    ifscCode: "UTIB0001234",
    amount: 65200,
    failureReason: "Account temporarily blocked",
    errorCode: "ACC_BLOCKED",
    retryCount: 1,
    lastRetry: "2024-02-03 14:45",
    status: "retry_scheduled",
    resolution: "Auto-retry in 2 hours",
  },
  {
    id: 3,
    employeeId: "EMP203",
    employeeName: "Meera Joshi",
    bankName: "HDFC Bank",
    accountNumber: "****3456",
    ifscCode: "HDFC0009876",
    amount: 89500,
    failureReason: "Bank server timeout",
    errorCode: "TIMEOUT",
    retryCount: 3,
    lastRetry: "2024-02-03 16:00",
    status: "manual_review",
    resolution: "Contact bank for resolution",
  },
];

const transferMethods = [
  {
    method: "NEFT (National Electronic Funds Transfer)",
    description: "Low-cost electronic fund transfer",
    processingTime: "2-4 hours",
    charges: "₹2.50 per transaction",
    limits: "₹10,000 to ₹10 lakhs",
    availability: "24x7 (except bank holidays)",
    usage: 285,
    successRate: 99.2,
  },
  {
    method: "RTGS (Real Time Gross Settlement)",
    description: "Immediate fund transfer for high values",
    processingTime: "Real-time",
    charges: "₹25-55 per transaction",
    limits: "₹2 lakhs minimum",
    availability: "9 AM to 4:30 PM",
    usage: 45,
    successRate: 99.8,
  },
  {
    method: "IMPS (Immediate Payment Service)",
    description: "Instant 24x7 money transfer",
    processingTime: "Instant",
    charges: "₹5-15 per transaction",
    limits: "₹25,000 to ₹5 lakhs",
    availability: "24x7",
    usage: 89,
    successRate: 98.5,
  },
  {
    method: "UPI (Unified Payments Interface)",
    description: "Digital payment system",
    processingTime: "Instant",
    charges: "Free (up to 20 transactions)",
    limits: "₹1,00,000 per day",
    availability: "24x7",
    usage: 12,
    successRate: 97.8,
  },
];

const complianceFeatures = [
  {
    feature: "RBI Compliance",
    description: "Adheres to all RBI guidelines for electronic fund transfers",
    status: "compliant",
    lastAudit: "2024-01-15",
    certificate: "RBI-EFT-2024-001",
  },
  {
    feature: "Data Encryption",
    description: "End-to-end encryption for all bank communications",
    status: "implemented",
    lastAudit: "2024-01-20",
    certificate: "ISO-27001-2023",
  },
  {
    feature: "Audit Trail",
    description: "Complete transaction logging and audit capabilities",
    status: "active",
    lastAudit: "2024-02-01",
    certificate: "AUDIT-LOG-2024",
  },
  {
    feature: "Multi-level Authorization",
    description: "Multiple approval levels for high-value transfers",
    status: "active",
    lastAudit: "2024-01-25",
    certificate: "AUTH-SYS-2024",
  },
];

const bankFileFormats = [
  {
    bank: "State Bank of India",
    format: "SBI Connect",
    extension: ".txt",
    fields: 15,
    encoding: "UTF-8",
    delimiter: "Pipe (|)",
    headerRequired: true,
    maxRecords: 10000,
  },
  {
    bank: "HDFC Bank",
    format: "HDFC Salary Upload",
    extension: ".xlsx",
    fields: 18,
    encoding: "UTF-8",
    delimiter: "Excel Columns",
    headerRequired: true,
    maxRecords: 5000,
  },
  {
    bank: "ICICI Bank",
    format: "ICICI API JSON",
    extension: ".json",
    fields: 12,
    encoding: "UTF-8",
    delimiter: "JSON Format",
    headerRequired: false,
    maxRecords: 20000,
  },
  {
    bank: "Axis Bank",
    format: "Axis Bank Format",
    extension: ".csv",
    fields: 14,
    encoding: "UTF-8",
    delimiter: "Comma",
    headerRequired: true,
    maxRecords: 8000,
  },
];

export default function BankTransferIntegration() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
      case "compliant":
      case "implemented":
        return "text-emerald-600 bg-emerald-600/10";
      case "pending_correction":
      case "retry_scheduled":
        return "text-yellow-600 bg-yellow-600/10";
      case "manual_review":
      case "maintenance":
        return "text-red-600 bg-red-600/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="animate-slideInDown">
          <Button variant="ghost" size="sm" asChild className="hover-lift">
            <Link to="/hrms/payroll">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Payroll Management
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Bank Transfer Integration
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={CreditCard}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Direct salary transfer to employee bank accounts via Indian
                banking systems
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={Download}
                animation="bounce"
                className="mr-2"
              />
              Export Status
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Upload} animation="bounce" className="mr-2" />
              Upload File
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {transferStats.map((stat, index) => (
            <Card
              key={index}
              className="hover-lift animate-fadeInUp relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <AnimatedIcon
                    icon={stat.icon}
                    animation="float"
                    className={stat.color}
                  />
                </div>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={stat.value} />
                  {stat.isPercentage ? "%" : ""}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bank Partners */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Building}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Banking Partners</CardTitle>
            </div>
            <CardDescription>
              Integrated Indian banks and their transfer statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {bankPartners.map((bank, index) => (
                <Card
                  key={bank.id}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">
                          {bank.bankName}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(bank.status)}`}
                        >
                          {bank.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground">Employees</p>
                          <p className="font-medium text-blue-600">
                            {bank.employees}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Success Rate</p>
                          <p className="font-medium text-emerald-600">
                            {bank.successRate}%
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground">Method</p>
                          <p className="font-medium">{bank.transferMethod}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Processing</p>
                          <p className="font-medium">
                            {bank.avgProcessingTime}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs">
                        <p className="text-muted-foreground mb-1">
                          Monthly Volume:
                        </p>
                        <p className="font-medium text-construction-600">
                          {formatCurrency(bank.monthlyVolume)}
                        </p>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex flex-wrap gap-1">
                          {bank.features.map((feature, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transfers & Failed Transfers */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Calendar}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Recent Transfer Batches</CardTitle>
              </div>
              <CardDescription>
                Latest salary and payment transfer batches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentTransfers.map((transfer, index) => (
                  <div
                    key={transfer.id}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">
                        {transfer.batchId}
                      </h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(transfer.status)}`}
                      >
                        {transfer.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">
                          {transfer.transferType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Amount:
                        </span>
                        <span className="font-medium text-emerald-600">
                          {formatCurrency(transfer.totalAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Employees:
                        </span>
                        <span className="font-medium">
                          {transfer.totalEmployees}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Success:</span>
                        <span className="font-medium text-blue-600">
                          {transfer.successfulTransfers}/
                          {transfer.totalEmployees}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Processing:
                        </span>
                        <span className="font-medium">
                          {transfer.processingTime}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {transfer.transferDate} {transfer.transferTime} by{" "}
                      {transfer.initiatedBy}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slideInRight">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={AlertTriangle}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Failed Transfers</CardTitle>
              </div>
              <CardDescription>
                Transfer failures requiring attention and resolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {failedTransfers.map((failure, index) => (
                  <div
                    key={failure.id}
                    className="p-3 border rounded-lg animate-fadeInUp hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">
                          {failure.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {failure.employeeId}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(failure.status)}`}
                      >
                        {failure.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bank:</span>
                        <span className="font-medium">{failure.bankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium text-red-600">
                          {formatCurrency(failure.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account:</span>
                        <span className="font-medium">
                          {failure.accountNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Retries:</span>
                        <span className="font-medium">
                          {failure.retryCount}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 p-2 bg-red-50 rounded text-xs">
                      <p className="font-medium text-red-600">
                        {failure.failureReason}
                      </p>
                      <p className="text-muted-foreground">
                        {failure.resolution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfer Methods & Compliance */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Zap}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Transfer Methods</CardTitle>
              </div>
              <CardDescription>
                Available Indian fund transfer mechanisms and their features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {transferMethods.map((method, index) => (
                  <div
                    key={method.method}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">
                        {method.method.split("(")[0]}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {method.usage} users
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {method.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Processing</p>
                        <p className="font-medium">{method.processingTime}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Charges</p>
                        <p className="font-medium text-emerald-600">
                          {method.charges}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs mt-2">
                      <div>
                        <p className="text-muted-foreground">Limits</p>
                        <p className="font-medium">{method.limits}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Success Rate</p>
                        <p className="font-medium text-blue-600">
                          {method.successRate}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-xs">
                      <p className="text-muted-foreground">Availability:</p>
                      <p className="font-medium">{method.availability}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slideInRight">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Shield}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Compliance & Security</CardTitle>
              </div>
              <CardDescription>
                Security measures and regulatory compliance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceFeatures.map((feature, index) => (
                  <div
                    key={feature.feature}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{feature.feature}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(feature.status)}`}
                      >
                        {feature.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {feature.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Last Audit</p>
                        <p className="font-medium">{feature.lastAudit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Certificate</p>
                        <p className="font-medium text-blue-600">
                          {feature.certificate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Bank File Formats */}
                <div className="mt-6">
                  <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                    <AnimatedIcon
                      icon={FileText}
                      animation="pulse"
                      className="text-orange-600"
                    />
                    Supported File Formats
                  </h4>
                  <div className="space-y-2">
                    {bankFileFormats.slice(0, 2).map((format, index) => (
                      <div
                        key={format.bank}
                        className="p-2 border rounded text-xs animate-scaleIn"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{format.bank}</span>
                          <Badge variant="outline" className="text-xs">
                            {format.extension}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">
                              Fields: {format.fields}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Max: {format.maxRecords}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={CreditCard}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common bank transfer and integration management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Upload}
                  animation="bounce"
                  className="mr-2"
                />
                Upload File
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={RefreshCw}
                  animation="pulse"
                  className="mr-2"
                />
                Check Status
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Settings}
                  animation="float"
                  className="mr-2"
                />
                Bank Settings
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Download}
                  animation="glow"
                  className="mr-2"
                />
                Transfer Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
