import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
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
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Eye,
  FileText,
  Users,
  Database,
  Lock,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Globe,
  Calendar,
  Search,
  Filter,
} from "lucide-react";
import { useLogger } from "../../hooks/useLogger";

interface ComplianceMetrics {
  overall: {
    score: number;
    status: "compliant" | "warning" | "non_compliant";
    lastAudit: string;
    nextAudit: string;
  };
  frameworks: {
    gdpr: ComplianceFramework;
    hipaa: ComplianceFramework;
    sox: ComplianceFramework;
    pci: ComplianceFramework;
    iso27001: ComplianceFramework;
  };
  auditTrail: {
    totalEvents: number;
    highRiskEvents: number;
    complianceViolations: number;
    dataAccessEvents: number;
  };
  dataProtection: {
    encryptionCoverage: number;
    backupCompliance: number;
    retentionPolicyCompliance: number;
    accessControlCompliance: number;
  };
}

interface ComplianceFramework {
  name: string;
  score: number;
  status: "compliant" | "partial" | "non_compliant";
  requirements: ComplianceRequirement[];
  lastAssessment: string;
  nextAssessment: string;
  certificationStatus: "certified" | "pending" | "expired" | "not_applicable";
}

interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  status: "compliant" | "partial" | "non_compliant" | "not_applicable";
  evidence: string[];
  lastChecked: string;
  owner: string;
  dueDate?: string;
  riskLevel: "low" | "medium" | "high" | "critical";
}

interface AuditEvent {
  id: string;
  timestamp: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  user: string;
  resource: string;
  compliance: string[];
  status: "resolved" | "pending" | "investigating";
}

export function ComplianceDashboard() {
  const { logUserAction } = useLogger();
  const [selectedTenant, setSelectedTenant] = useState("all");
  const [complianceData, setComplianceData] =
    useState<ComplianceMetrics | null>(null);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);
  const [timeRange, setTimeRange] = useState("30d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplianceData();
    logUserAction("view_compliance_dashboard", "ComplianceDashboard");
  }, [selectedTenant, timeRange]);

  const loadComplianceData = async () => {
    setLoading(true);
    try {
      // Simulate API call to fetch compliance data
      const mockData: ComplianceMetrics = {
        overall: {
          score: 87,
          status: "compliant",
          lastAudit: "2024-01-15",
          nextAudit: "2024-04-15",
        },
        frameworks: {
          gdpr: {
            name: "GDPR",
            score: 92,
            status: "compliant",
            requirements: generateMockRequirements("GDPR"),
            lastAssessment: "2024-01-10",
            nextAssessment: "2024-04-10",
            certificationStatus: "certified",
          },
          hipaa: {
            name: "HIPAA",
            score: 85,
            status: "partial",
            requirements: generateMockRequirements("HIPAA"),
            lastAssessment: "2024-01-08",
            nextAssessment: "2024-04-08",
            certificationStatus: "pending",
          },
          sox: {
            name: "SOX",
            score: 90,
            status: "compliant",
            requirements: generateMockRequirements("SOX"),
            lastAssessment: "2024-01-12",
            nextAssessment: "2024-04-12",
            certificationStatus: "certified",
          },
          pci: {
            name: "PCI DSS",
            score: 78,
            status: "partial",
            requirements: generateMockRequirements("PCI"),
            lastAssessment: "2024-01-05",
            nextAssessment: "2024-04-05",
            certificationStatus: "expired",
          },
          iso27001: {
            name: "ISO 27001",
            score: 88,
            status: "compliant",
            requirements: generateMockRequirements("ISO27001"),
            lastAssessment: "2024-01-20",
            nextAssessment: "2024-04-20",
            certificationStatus: "certified",
          },
        },
        auditTrail: {
          totalEvents: 15420,
          highRiskEvents: 23,
          complianceViolations: 5,
          dataAccessEvents: 3240,
        },
        dataProtection: {
          encryptionCoverage: 95,
          backupCompliance: 100,
          retentionPolicyCompliance: 88,
          accessControlCompliance: 92,
        },
      };

      setComplianceData(mockData);
      setAuditEvents(generateMockAuditEvents());
    } catch (error) {
      console.error("Failed to load compliance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockRequirements = (
    framework: string,
  ): ComplianceRequirement[] => {
    const baseRequirements = {
      GDPR: [
        "Data Subject Rights Implementation",
        "Consent Management System",
        "Data Breach Notification Process",
        "Privacy Impact Assessments",
        "Data Protection Officer Appointment",
      ],
      HIPAA: [
        "Access Control Implementation",
        "Audit Controls",
        "Integrity Controls",
        "Person or Entity Authentication",
        "Transmission Security",
      ],
      SOX: [
        "Internal Control Documentation",
        "Financial Reporting Controls",
        "Management Assessment",
        "External Auditor Testing",
        "Deficiency Remediation",
      ],
      PCI: [
        "Firewall Configuration",
        "Default Password Changes",
        "Cardholder Data Protection",
        "Data Transmission Encryption",
        "Antivirus Software",
      ],
      ISO27001: [
        "Information Security Policy",
        "Risk Assessment Procedures",
        "Asset Management",
        "Access Control Management",
        "Cryptography Controls",
      ],
    };

    return (
      baseRequirements[framework as keyof typeof baseRequirements]?.map(
        (title, index) => ({
          id: `${framework.toLowerCase()}_${index + 1}`,
          title,
          description: `Implementation of ${title} according to ${framework} standards`,
          status:
            Math.random() > 0.2
              ? "compliant"
              : Math.random() > 0.5
                ? "partial"
                : "non_compliant",
          evidence: [
            `Document_${index + 1}.pdf`,
            `Assessment_${index + 1}.doc`,
          ],
          lastChecked: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split("T")[0],
          owner: ["John Doe", "Jane Smith", "Mike Johnson"][
            Math.floor(Math.random() * 3)
          ],
          riskLevel: ["low", "medium", "high"][
            Math.floor(Math.random() * 3)
          ] as any,
        }),
      ) || []
    );
  };

  const generateMockAuditEvents = (): AuditEvent[] => {
    return Array.from({ length: 50 }, (_, index) => ({
      id: `event_${index + 1}`,
      timestamp: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      type: [
        "LOGIN_FAILURE",
        "DATA_ACCESS",
        "PERMISSION_CHANGE",
        "DATA_EXPORT",
        "SYSTEM_CONFIG",
      ][Math.floor(Math.random() * 5)],
      severity: ["low", "medium", "high", "critical"][
        Math.floor(Math.random() * 4)
      ] as any,
      description: `Audit event ${index + 1} description`,
      user: `user_${Math.floor(Math.random() * 100)}`,
      resource: ["users", "financial_data", "customer_data", "system_config"][
        Math.floor(Math.random() * 4)
      ],
      compliance: ["GDPR", "HIPAA", "SOX"].filter(() => Math.random() > 0.5),
      status: ["resolved", "pending", "investigating"][
        Math.floor(Math.random() * 3)
      ] as any,
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
      case "resolved":
        return "bg-green-100 text-green-800";
      case "partial":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "non_compliant":
      case "investigating":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  const handleExportReport = (framework?: string) => {
    logUserAction("export_compliance_report", "ComplianceDashboard", {
      framework,
    });
    // Implementation for report export
  };

  const handleViewAuditEvent = (event: AuditEvent) => {
    setSelectedEvent(event);
    logUserAction("view_audit_event", "ComplianceDashboard", {
      eventId: event.id,
    });
  };

  if (loading || !complianceData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading compliance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            Compliance Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor compliance status across all regulatory frameworks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleExportReport()}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Badge variant="outline" className="gap-2">
            <Activity className="h-3 w-3" />
            Real-time Monitoring
          </Badge>
        </div>
      </div>

      {/* Overall Compliance Score */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Compliance Status</CardTitle>
          <CardDescription>
            Aggregate compliance score across all frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                <AnimatedCounter
                  value={complianceData.overall.score}
                  suffix="%"
                />
              </div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
              <Badge className={getStatusColor(complianceData.overall.status)}>
                {complianceData.overall.status.replace("_", " ")}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                <AnimatedCounter
                  value={Object.keys(complianceData.frameworks).length}
                />
              </div>
              <p className="text-sm text-muted-foreground">Active Frameworks</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                <AnimatedCounter
                  value={complianceData.auditTrail.complianceViolations}
                />
              </div>
              <p className="text-sm text-muted-foreground">Active Violations</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                <AnimatedCounter
                  value={complianceData.auditTrail.highRiskEvents}
                />
              </div>
              <p className="text-sm text-muted-foreground">High Risk Events</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="frameworks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="data-protection">Data Protection</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Compliance Frameworks Tab */}
        <TabsContent value="frameworks" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(complianceData.frameworks).map(
              ([key, framework]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {framework.name}
                      <Badge className={getStatusColor(framework.status)}>
                        {framework.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Last assessed:{" "}
                      {new Date(framework.lastAssessment).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Compliance Score</span>
                      <span className="font-bold text-lg">
                        {framework.score}%
                      </span>
                    </div>
                    <Progress value={framework.score} className="h-2" />

                    <div className="text-xs text-muted-foreground">
                      <p>
                        Next assessment:{" "}
                        {new Date(
                          framework.nextAssessment,
                        ).toLocaleDateString()}
                      </p>
                      <p>Certification: {framework.certificationStatus}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExportReport(key)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Audit Events</CardTitle>
              <CardDescription>
                System audit trail and compliance monitoring events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <Filter className="h-3 w-3 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-3 w-3 mr-1" />
                    Search
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Compliance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditEvents.slice(0, 10).map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          {new Date(event.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>{event.type}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getSeverityIcon(event.severity)}
                            {event.severity}
                          </div>
                        </TableCell>
                        <TableCell>{event.user}</TableCell>
                        <TableCell>{event.resource}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {event.compliance.map((comp) => (
                              <Badge
                                key={comp}
                                variant="outline"
                                className="text-xs"
                              >
                                {comp}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewAuditEvent(event)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Protection Tab */}
        <TabsContent value="data-protection" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Data Protection Metrics</CardTitle>
                <CardDescription>
                  Overview of data protection compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Encryption Coverage</span>
                    <span className="font-medium">
                      {complianceData.dataProtection.encryptionCoverage}%
                    </span>
                  </div>
                  <Progress
                    value={complianceData.dataProtection.encryptionCoverage}
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Backup Compliance</span>
                    <span className="font-medium">
                      {complianceData.dataProtection.backupCompliance}%
                    </span>
                  </div>
                  <Progress
                    value={complianceData.dataProtection.backupCompliance}
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Retention Policy</span>
                    <span className="font-medium">
                      {complianceData.dataProtection.retentionPolicyCompliance}%
                    </span>
                  </div>
                  <Progress
                    value={
                      complianceData.dataProtection.retentionPolicyCompliance
                    }
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Access Control</span>
                    <span className="font-medium">
                      {complianceData.dataProtection.accessControlCompliance}%
                    </span>
                  </div>
                  <Progress
                    value={
                      complianceData.dataProtection.accessControlCompliance
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Controls</CardTitle>
                <CardDescription>
                  Active security measures and controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Lock className="h-4 w-4 text-green-600" />
                      <span className="text-sm">End-to-End Encryption</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Database className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Database Encryption</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">
                        Multi-Factor Authentication
                      </span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">Network Security</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Partial
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Reports</CardTitle>
                <CardDescription>Generate compliance reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start"
                  onClick={() => handleExportReport("all")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Full Compliance Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Risk Assessment Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Audit Schedule Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automated Reports</CardTitle>
                <CardDescription>
                  Scheduled compliance reporting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Weekly Summary</p>
                  <p className="text-muted-foreground">
                    Every Monday at 9:00 AM
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Monthly Assessment</p>
                  <p className="text-muted-foreground">
                    First day of each month
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Quarterly Review</p>
                  <p className="text-muted-foreground">Every 3 months</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Previously generated reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Q1 2024 SOX Report</span>
                    <Button size="sm" variant="ghost">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>GDPR Assessment</span>
                    <Button size="sm" variant="ghost">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Security Audit</span>
                    <Button size="sm" variant="ghost">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Settings</CardTitle>
              <CardDescription>
                Configure compliance monitoring and reporting settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Report Frequency
                  </label>
                  <select className="w-full p-2 border rounded">
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Notification Recipients
                  </label>
                  <input
                    type="email"
                    placeholder="compliance@company.com"
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Risk Threshold</label>
                  <select className="w-full p-2 border rounded">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Data Retention (days)
                  </label>
                  <input
                    type="number"
                    defaultValue="2555"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Audit Event Details Modal */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Audit Event Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected audit event
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Event ID</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Timestamp</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedEvent.timestamp).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.type}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Severity</label>
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(selectedEvent.severity)}
                    <span className="text-sm">{selectedEvent.severity}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">User</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.user}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Resource</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.resource}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedEvent.description}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Compliance Frameworks
                </label>
                <div className="flex gap-2 mt-1">
                  {selectedEvent.compliance.map((comp) => (
                    <Badge key={comp} variant="outline">
                      {comp}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Badge className={getStatusColor(selectedEvent.status)}>
                  {selectedEvent.status}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
