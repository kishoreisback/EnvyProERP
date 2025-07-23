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
  Receipt,
  Mail,
  Download,
  Users,
  Calendar,
  Eye,
  Send,
  FileText,
  Lock,
  Globe,
  CheckCircle,
  Clock,
  TrendingUp,
  Plus,
  ArrowLeft,
  IndianRupee,
  Settings,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

const payslipStats = [
  {
    label: "Generated This Month",
    value: 384,
    change: "100% completion",
    icon: Receipt,
    color: "text-emerald-600",
  },
  {
    label: "Email Delivered",
    value: 372,
    change: "97% delivery rate",
    icon: Mail,
    color: "text-blue-600",
  },
  {
    label: "Downloaded",
    value: 289,
    change: "75% access rate",
    icon: Download,
    color: "text-construction-500",
  },
  {
    label: "Mobile Access",
    value: 198,
    change: "51% mobile users",
    icon: Smartphone,
    color: "text-purple-600",
  },
];

const payslipBatches = [
  {
    id: 1,
    month: "January 2024",
    generatedDate: "2024-01-30",
    totalEmployees: 384,
    generated: 384,
    emailSent: 384,
    delivered: 372,
    downloaded: 289,
    status: "completed",
    processingTime: "45 minutes",
    batchSize: "Full payroll",
  },
  {
    id: 2,
    month: "December 2023",
    generatedDate: "2023-12-30",
    totalEmployees: 384,
    generated: 384,
    emailSent: 384,
    delivered: 378,
    downloaded: 312,
    status: "completed",
    processingTime: "42 minutes",
    batchSize: "Full payroll",
  },
  {
    id: 3,
    month: "November 2023",
    generatedDate: "2023-11-30",
    totalEmployees: 378,
    generated: 378,
    emailSent: 378,
    delivered: 365,
    downloaded: 298,
    status: "completed",
    processingTime: "38 minutes",
    batchSize: "Full payroll",
  },
];

const payslipTemplates = [
  {
    id: 1,
    name: "Standard Indian Payslip",
    description: "Complete Indian payslip with all statutory components",
    language: "English",
    format: "PDF",
    sections: [
      "Employee Details",
      "Earnings Breakdown",
      "Deductions (PF, ESI, TDS)",
      "Net Salary",
      "Leave Balance",
      "YTD Summary",
    ],
    usage: 356,
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "Hindi Payslip Template",
    description: "Bilingual payslip in Hindi and English",
    language: "Hindi + English",
    format: "PDF",
    sections: [
      "कर्मचारी विवरण",
      "आय विवरण",
      "कटौती विवरण",
      "शुद्ध वेतन",
      "छुट्टी शेष",
      "वार्षिक सारांश",
    ],
    usage: 28,
    lastUpdated: "2024-01-10",
    status: "active",
  },
];

const employeePayslips = [
  {
    employeeId: "EMP001",
    employeeName: "Sarah Mitchell",
    department: "Engineering",
    month: "January 2024",
    grossSalary: 100000,
    deductions: 23500,
    netSalary: 76500,
    generatedDate: "2024-01-30",
    emailSent: true,
    downloaded: true,
    viewCount: 3,
    lastAccessed: "2024-02-01",
    status: "delivered",
  },
  {
    employeeId: "EMP015",
    employeeName: "Raj Kumar",
    department: "Operations",
    month: "January 2024",
    grossSalary: 65000,
    deductions: 14800,
    netSalary: 50200,
    generatedDate: "2024-01-30",
    emailSent: true,
    downloaded: false,
    viewCount: 1,
    lastAccessed: "2024-01-31",
    status: "viewed",
  },
  {
    employeeId: "EMP042",
    employeeName: "Priya Sharma",
    department: "Sales",
    month: "January 2024",
    grossSalary: 78000,
    deductions: 18900,
    netSalary: 59100,
    generatedDate: "2024-01-30",
    emailSent: true,
    downloaded: true,
    viewCount: 2,
    lastAccessed: "2024-02-02",
    status: "downloaded",
  },
  {
    employeeId: "EMP078",
    employeeName: "Kumar Singh",
    department: "Quality",
    month: "January 2024",
    grossSalary: 55000,
    deductions: 12200,
    netSalary: 42800,
    generatedDate: "2024-01-30",
    emailSent: false,
    downloaded: false,
    viewCount: 0,
    lastAccessed: "Never",
    status: "pending",
  },
];

const distributionChannels = [
  {
    channel: "Email Distribution",
    description: "Secure email delivery with password protection",
    usage: 384,
    successRate: 97,
    avgDeliveryTime: "2-5 minutes",
    features: [
      "Encrypted PDF attachments",
      "Password protection",
      "Delivery confirmations",
      "Resend capabilities",
    ],
  },
  {
    channel: "Employee Self-Service Portal",
    description: "Web portal for payslip access and download",
    usage: 289,
    successRate: 100,
    avgDeliveryTime: "Real-time",
    features: [
      "Secure login required",
      "Historical payslips",
      "Download tracking",
      "Mobile responsive",
    ],
  },
  {
    channel: "Mobile App Access",
    description: "Mobile application for payslip viewing",
    usage: 198,
    successRate: 99,
    avgDeliveryTime: "Real-time",
    features: [
      "Biometric authentication",
      "Offline viewing",
      "Push notifications",
      "Share capabilities",
    ],
  },
];

const complianceFeatures = [
  {
    feature: "Data Privacy Compliance",
    description: "GDPR and Indian data protection compliance",
    status: "implemented",
    details: [
      "Data encryption at rest and in transit",
      "Access logging and audit trails",
      "Consent management",
      "Right to data deletion",
    ],
  },
  {
    feature: "Statutory Disclosures",
    description: "Mandatory Indian payroll disclosures",
    status: "implemented",
    details: [
      "PF account number and contribution",
      "ESI registration and deduction",
      "TDS certificate references",
      "Professional tax details",
    ],
  },
  {
    feature: "Digital Signature",
    description: "Digitally signed payslips for authenticity",
    status: "implemented",
    details: [
      "Company digital certificate",
      "Tamper-proof documents",
      "Verification capabilities",
      "Legal compliance",
    ],
  },
];

const accessAnalytics = [
  {
    metric: "Overall Access Rate",
    value: 75.3,
    change: "+5.2%",
    description: "Employees accessing payslips",
    trend: "up",
  },
  {
    metric: "Mobile Usage",
    value: 51.6,
    change: "+12.8%",
    description: "Payslip access via mobile",
    trend: "up",
  },
  {
    metric: "Download Rate",
    value: 68.4,
    change: "+3.1%",
    description: "Employees downloading PDFs",
    trend: "up",
  },
  {
    metric: "Email Open Rate",
    value: 89.3,
    change: "-1.2%",
    description: "Payslip email notifications",
    trend: "down",
  },
];

export default function PayslipGeneration() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "delivered":
      case "downloaded":
      case "active":
      case "implemented":
        return "text-emerald-600 bg-emerald-600/10";
      case "viewed":
      case "processing":
        return "text-blue-600 bg-blue-600/10";
      case "pending":
        return "text-yellow-600 bg-yellow-600/10";
      case "failed":
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

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-emerald-600";
      case "down":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
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
                Payslip Generation
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Receipt}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Digital payslip generation and secure distribution system
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
              Download All
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Generate Payslips
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {payslipStats.map((stat, index) => (
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
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payslip Generation Batches */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Calendar}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Payslip Generation History</CardTitle>
              </div>
              <Button variant="outline" size="sm" className="hover-lift">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                New Batch
              </Button>
            </div>
            <CardDescription>
              Monthly payslip generation batches and delivery status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payslipBatches.map((batch, index) => (
                <div
                  key={batch.id}
                  className="p-4 border rounded-lg animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm">{batch.month}</h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(batch.status)}`}
                    >
                      {batch.status}
                    </Badge>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-lg font-bold text-blue-600">
                        {batch.generated}
                      </p>
                      <p className="text-xs text-muted-foreground">Generated</p>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 rounded-lg">
                      <p className="text-lg font-bold text-emerald-600">
                        {batch.delivered}
                      </p>
                      <p className="text-xs text-muted-foreground">Delivered</p>
                    </div>
                    <div className="text-center p-3 bg-construction-50 rounded-lg">
                      <p className="text-lg font-bold text-construction-600">
                        {batch.downloaded}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Downloaded
                      </p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-lg font-bold text-purple-600">
                        {batch.processingTime}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Process Time
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Generated: {batch.generatedDate}</span>
                    <span>
                      Delivery Rate:{" "}
                      {((batch.delivered / batch.totalEmployees) * 100).toFixed(
                        1,
                      )}
                      %
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Templates & Distribution Channels */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={FileText}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Payslip Templates</CardTitle>
              </div>
              <CardDescription>
                Customizable payslip formats and language options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payslipTemplates.map((template, index) => (
                  <div
                    key={template.id}
                    className="p-3 border rounded-lg animate-scaleIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(template.status)}`}
                      >
                        {template.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {template.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">Language</p>
                        <p className="font-medium">{template.language}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Usage</p>
                        <p className="font-medium text-blue-600">
                          {template.usage} employees
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium">Sections:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.sections.slice(0, 3).map((section, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {section}
                          </Badge>
                        ))}
                        {template.sections.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.sections.length - 3} more
                          </Badge>
                        )}
                      </div>
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
                  icon={Send}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Distribution Channels</CardTitle>
              </div>
              <CardDescription>
                Multiple secure channels for payslip delivery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {distributionChannels.map((channel, index) => (
                  <div
                    key={channel.channel}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{channel.channel}</h4>
                      <Badge variant="outline" className="text-xs">
                        {channel.successRate}% success
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {channel.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <p className="text-muted-foreground">Usage</p>
                        <p className="font-medium text-emerald-600">
                          {channel.usage} employees
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Delivery Time</p>
                        <p className="font-medium">{channel.avgDeliveryTime}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium">Features:</p>
                      <div className="space-y-1">
                        {channel.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <CheckCircle className="h-3 w-3 text-emerald-600" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee Payslip Status */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Users}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Employee Payslip Status</CardTitle>
            </div>
            <CardDescription>
              Individual employee payslip access and download status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Employee
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Salary Details
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Access Info
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employeePayslips.map((employee, index) => (
                    <tr
                      key={employee.employeeId}
                      className="border-b hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-sm">
                            {employee.employeeName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {employee.employeeId} • {employee.department}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Gross:
                            </span>
                            <span className="font-medium">
                              {formatCurrency(employee.grossSalary)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Net:</span>
                            <span className="font-medium text-emerald-600">
                              {formatCurrency(employee.netSalary)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            {employee.emailSent ? (
                              <CheckCircle className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <Clock className="h-3 w-3 text-yellow-600" />
                            )}
                            <span>
                              Email {employee.emailSent ? "Sent" : "Pending"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {employee.downloaded ? (
                              <CheckCircle className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <Clock className="h-3 w-3 text-yellow-600" />
                            )}
                            <span>
                              {employee.downloaded
                                ? "Downloaded"
                                : "Not Downloaded"}
                            </span>
                          </div>
                          <p className="text-muted-foreground">
                            Views: {employee.viewCount}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(employee.status)}`}
                        >
                          {employee.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="text-xs">
                            <AnimatedIcon icon={Eye} className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="ghost" className="text-xs">
                            <AnimatedIcon
                              icon={Download}
                              className="h-3 w-3 mr-1"
                            />
                            Download
                          </Button>
                          <Button size="sm" variant="ghost" className="text-xs">
                            <AnimatedIcon
                              icon={Send}
                              className="h-3 w-3 mr-1"
                            />
                            Resend
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Access Analytics & Compliance */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={TrendingUp}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Access Analytics</CardTitle>
              </div>
              <CardDescription>
                Payslip access patterns and user engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {accessAnalytics.map((metric, index) => (
                  <div
                    key={metric.metric}
                    className="p-3 border rounded-lg animate-scaleIn text-center"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <p className="text-lg font-bold">{metric.value}%</p>
                    <p className="text-sm font-medium">{metric.metric}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <span
                        className={`text-xs font-medium ${getTrendColor(metric.trend)}`}
                      >
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slideInRight">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Lock}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Compliance Features</CardTitle>
              </div>
              <CardDescription>
                Security and compliance measures for payslip distribution
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
                    <div className="space-y-1">
                      {feature.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Receipt}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common payslip generation and distribution tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                Generate Batch
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Send} animation="pulse" className="mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Download}
                  animation="float"
                  className="mr-2"
                />
                Bulk Download
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Settings}
                  animation="glow"
                  className="mr-2"
                />
                Configure Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
