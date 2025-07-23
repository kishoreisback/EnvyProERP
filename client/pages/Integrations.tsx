import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  Fingerprint,
  Building2,
  BookOpen,
  UserCheck,
  FileText,
  Mail,
  Plug,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Shield,
  Zap,
  Link,
  Monitor,
  Smartphone,
  Wifi,
  RefreshCw,
  Download,
  Upload,
  Key,
  Globe,
  Server,
  Activity,
  Calendar,
  Target,
  Bell,
  Search,
} from "lucide-react";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";

export default function Integrations() {
  const [activeTab, setActiveTab] = useState("biometric");

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              HRMS Integrations
            </h1>
            <p className="text-muted-foreground">
              Connect and manage third-party systems and external services
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <PulsingDot className="text-green-500" />
              12 Active Connections
            </Badge>
            <Button>
              <AnimatedIcon icon={Settings} className="mr-2" />
              Integration Settings
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="biometric" className="flex items-center gap-2">
              <Fingerprint className="h-4 w-4" />
              Biometric
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Financial/ERP
            </TabsTrigger>
            <TabsTrigger value="lms" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              LMS Platforms
            </TabsTrigger>
            <TabsTrigger value="background" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Background Check
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tax Filing
            </TabsTrigger>
            <TabsTrigger
              value="communication"
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Communication
            </TabsTrigger>
          </TabsList>

          <TabsContent value="biometric" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Fingerprint} animation="pulse" />
                    Biometric Device Management
                  </CardTitle>
                  <CardDescription>
                    Configure and manage biometric attendance and access control
                    devices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="device-name">Device Name</Label>
                      <Input
                        id="device-name"
                        placeholder="e.g., Main Gate Biometric"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="device-type">Device Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select device type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fingerprint">
                            Fingerprint Scanner
                          </SelectItem>
                          <SelectItem value="face">Face Recognition</SelectItem>
                          <SelectItem value="iris">Iris Scanner</SelectItem>
                          <SelectItem value="card">Card Reader</SelectItem>
                          <SelectItem value="multi">Multi-Modal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="device-ip">IP Address</Label>
                      <Input id="device-ip" placeholder="192.168.1.100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="device-port">Port</Label>
                      <Input id="device-port" placeholder="4370" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="device-location">Location</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main-gate">Main Gate</SelectItem>
                          <SelectItem value="office-entry">
                            Office Entry
                          </SelectItem>
                          <SelectItem value="cafeteria">Cafeteria</SelectItem>
                          <SelectItem value="parking">Parking Area</SelectItem>
                          <SelectItem value="floor-3">3rd Floor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="device-model">Device Model</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="essl-k30">ESSL K30</SelectItem>
                          <SelectItem value="hikvision-ds">
                            Hikvision DS-K1T201
                          </SelectItem>
                          <SelectItem value="zkteco-f18">ZKTeco F18</SelectItem>
                          <SelectItem value="mantra-mfs100">
                            Mantra MFS100
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Plug className="mr-2 h-4 w-4" />
                      Test Connection
                    </Button>
                    <Button variant="outline">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Sync Data
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Device Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Online Devices</span>
                        <Badge>8/10</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sync Status</span>
                        <Badge variant="secondary">Up to Date</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Last Sync</span>
                        <span className="text-xs text-muted-foreground">
                          2 min ago
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data Records</span>
                        <span className="text-xs text-muted-foreground">
                          1,245 today
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Logs
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Restart Devices
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Bulk Upload Users
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Connected Devices</CardTitle>
                <CardDescription>
                  Biometric devices currently integrated with HRMS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Main Gate Scanner
                      </TableCell>
                      <TableCell>Fingerprint</TableCell>
                      <TableCell>Main Entrance</TableCell>
                      <TableCell>192.168.1.100</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          Online
                        </Badge>
                      </TableCell>
                      <TableCell>2 min ago</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Settings className="mr-1 h-3 w-3" />
                          Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Office Entry
                      </TableCell>
                      <TableCell>Face Recognition</TableCell>
                      <TableCell>Reception</TableCell>
                      <TableCell>192.168.1.101</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          Online
                        </Badge>
                      </TableCell>
                      <TableCell>5 min ago</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Settings className="mr-1 h-3 w-3" />
                          Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Cafeteria Access
                      </TableCell>
                      <TableCell>Card Reader</TableCell>
                      <TableCell>Floor 2</TableCell>
                      <TableCell>192.168.1.102</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Offline</Badge>
                      </TableCell>
                      <TableCell>1 hour ago</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Troubleshoot
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Building2} animation="bounce" />
                    Financial System Integration
                  </CardTitle>
                  <CardDescription>
                    Connect with ERP and financial systems for seamless data
                    flow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="financial-system">Financial System</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select financial system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sap">SAP ERP</SelectItem>
                          <SelectItem value="oracle">
                            Oracle Financials
                          </SelectItem>
                          <SelectItem value="tally">Tally ERP</SelectItem>
                          <SelectItem value="quickbooks">QuickBooks</SelectItem>
                          <SelectItem value="netsuite">NetSuite</SelectItem>
                          <SelectItem value="custom">Custom API</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-endpoint">API Endpoint</Label>
                      <Input
                        id="api-endpoint"
                        placeholder="https://api.company.com/erp/v1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input
                        id="api-key"
                        type="password"
                        placeholder="Enter API key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sync-frequency">Sync Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="real-time">Real-time</SelectItem>
                          <SelectItem value="hourly">Every Hour</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Plug className="mr-2 h-4 w-4" />
                    Test & Connect
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Database} animation="glow" />
                    Data Mapping Configuration
                  </CardTitle>
                  <CardDescription>
                    Map HRMS fields to ERP system fields
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Employee ID</span>
                        <Badge variant="outline">Mapped</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        HRMS: employee_id → ERP: emp_code
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Salary</span>
                        <Badge variant="outline">Mapped</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        HRMS: basic_salary → ERP: salary_amount
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Department</span>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        HRMS: department_name → ERP: dept_code
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Mapping
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Financial Integrations</CardTitle>
                <CardDescription>
                  Currently connected financial and ERP systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>System</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Sync Status</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Records Synced</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">SAP ERP</TableCell>
                      <TableCell>Enterprise Resource Planning</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                      <TableCell>10 min ago</TableCell>
                      <TableCell>1,247 employees</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <RotateCcw className="mr-1 h-3 w-3" />
                          Sync Now
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tally ERP</TableCell>
                      <TableCell>Accounting Software</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                      <TableCell>30 min ago</TableCell>
                      <TableCell>₹45,67,890 payroll</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Download className="mr-1 h-3 w-3" />
                          Export
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lms" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={BookOpen} animation="float" />
                    LMS Platform Integration
                  </CardTitle>
                  <CardDescription>
                    Connect with learning management systems for training data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lms-platform">LMS Platform</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select LMS platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="moodle">Moodle</SelectItem>
                          <SelectItem value="blackboard">Blackboard</SelectItem>
                          <SelectItem value="canvas">Canvas</SelectItem>
                          <SelectItem value="cornerstone">
                            Cornerstone OnDemand
                          </SelectItem>
                          <SelectItem value="successfactors">
                            SAP SuccessFactors
                          </SelectItem>
                          <SelectItem value="docebo">Docebo</SelectItem>
                          <SelectItem value="custom">Custom LMS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lms-url">LMS URL</Label>
                      <Input
                        id="lms-url"
                        placeholder="https://company.lms.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lms-token">Access Token</Label>
                      <Input
                        id="lms-token"
                        type="password"
                        placeholder="Enter access token"
                      />
                    </div>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="sync-users" />
                        <Label htmlFor="sync-users" className="text-sm">
                          Sync Users
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="sync-courses" />
                        <Label htmlFor="sync-courses" className="text-sm">
                          Sync Courses
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="sync-progress" />
                        <Label htmlFor="sync-progress" className="text-sm">
                          Sync Progress
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="sync-certificates" />
                        <Label htmlFor="sync-certificates" className="text-sm">
                          Sync Certificates
                        </Label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Link className="mr-2 h-4 w-4" />
                    Connect LMS
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Activity} animation="pulse" />
                    Learning Analytics
                  </CardTitle>
                  <CardDescription>
                    Training completion and progress statistics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 grid-cols-2">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">847</div>
                      <div className="text-sm text-muted-foreground">
                        Active Learners
                      </div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        156
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Courses Synced
                      </div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        73%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Completion Rate
                      </div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        284
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Certificates
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Target className="mr-2 h-4 w-4" />
                    View Detailed Reports
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>LMS Integration Status</CardTitle>
                <CardDescription>
                  Connected learning management systems and sync status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platform</TableHead>
                      <TableHead>Connection</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Moodle LMS</TableCell>
                      <TableCell>
                        <Badge>Connected</Badge>
                      </TableCell>
                      <TableCell>15 min ago</TableCell>
                      <TableCell>156 courses</TableCell>
                      <TableCell>847 users</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <RotateCcw className="mr-1 h-3 w-3" />
                          Sync
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        SuccessFactors
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Configuring</Badge>
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Settings className="mr-1 h-3 w-3" />
                          Setup
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="background" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={UserCheck} animation="bounce" />
                    Background Check Vendors
                  </CardTitle>
                  <CardDescription>
                    Integrate with verification service providers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vendor-name">Vendor</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select verification vendor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="authbridge">AuthBridge</SelectItem>
                          <SelectItem value="first-advantage">
                            First Advantage
                          </SelectItem>
                          <SelectItem value="hireright">HireRight</SelectItem>
                          <SelectItem value="sterling">
                            Sterling Check
                          </SelectItem>
                          <SelectItem value="verifirst">VeriFirst</SelectItem>
                          <SelectItem value="indian-bg">
                            Indian Background Screening
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendor-api">API Endpoint</Label>
                      <Input
                        id="vendor-api"
                        placeholder="https://api.vendor.com/v1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendor-key">API Key</Label>
                      <Input
                        id="vendor-key"
                        type="password"
                        placeholder="Enter API key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Check Types</Label>
                      <div className="grid gap-2 grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="identity-check" defaultChecked />
                          <Label htmlFor="identity-check" className="text-sm">
                            Identity
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="education-check" defaultChecked />
                          <Label htmlFor="education-check" className="text-sm">
                            Education
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="employment-check" defaultChecked />
                          <Label htmlFor="employment-check" className="text-sm">
                            Employment
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="criminal-check" />
                          <Label htmlFor="criminal-check" className="text-sm">
                            Criminal
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Shield className="mr-2 h-4 w-4" />
                    Connect Vendor
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Clock} animation="pulse" />
                    Verification Pipeline
                  </CardTitle>
                  <CardDescription>
                    Track background verification requests and status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg bg-blue-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Pending Requests
                        </span>
                        <Badge>23</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Awaiting vendor processing
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg bg-amber-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">In Progress</span>
                        <Badge variant="secondary">15</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Currently being verified
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg bg-green-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Completed</span>
                        <Badge variant="outline">89</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Verification completed this month
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Search Requests
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Background Check Status</CardTitle>
                <CardDescription>
                  Recent verification requests and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Check Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Initiated</TableHead>
                      <TableHead>TAT</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Rajesh Kumar
                      </TableCell>
                      <TableCell>AuthBridge</TableCell>
                      <TableCell>Identity + Education</TableCell>
                      <TableCell>
                        <Badge>Completed</Badge>
                      </TableCell>
                      <TableCell>Mar 10, 2024</TableCell>
                      <TableCell>3 days</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Download className="mr-1 h-3 w-3" />
                          Report
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Priya Sharma
                      </TableCell>
                      <TableCell>HireRight</TableCell>
                      <TableCell>Employment + Criminal</TableCell>
                      <TableCell>
                        <Badge variant="secondary">In Progress</Badge>
                      </TableCell>
                      <TableCell>Mar 12, 2024</TableCell>
                      <TableCell>2 days</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="mr-1 h-3 w-3" />
                          Refresh
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={FileText} animation="float" />
                    Tax Filing Software
                  </CardTitle>
                  <CardDescription>
                    Connect with tax preparation and filing software
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tax-software">Tax Software</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tax software" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cleartax">ClearTax</SelectItem>
                          <SelectItem value="taxmantra">TaxMantra</SelectItem>
                          <SelectItem value="quicko">Quicko</SelectItem>
                          <SelectItem value="tds-return">TDS Return</SelectItem>
                          <SelectItem value="income-tax">
                            Income Tax e-Filing
                          </SelectItem>
                          <SelectItem value="gst-portal">GST Portal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pan-number">Company PAN</Label>
                      <Input
                        id="pan-number"
                        placeholder="ABCDE1234F"
                        maxLength={10}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tan-number">TAN Number</Label>
                      <Input
                        id="tan-number"
                        placeholder="ABCD12345E"
                        maxLength={10}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filing-frequency">Filing Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Key className="mr-2 h-4 w-4" />
                    Authenticate & Connect
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Calendar} animation="pulse" />
                    Tax Compliance Dashboard
                  </CardTitle>
                  <CardDescription>
                    Track filing deadlines and compliance status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg bg-red-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Due Soon</span>
                        <Badge variant="destructive">2 days</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        TDS Return Q3 2024 - Due Mar 15
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg bg-amber-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">In Progress</span>
                        <Badge variant="secondary">Processing</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Form 16 Generation for FY 2023-24
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg bg-green-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Filed</span>
                        <Badge variant="outline">Success</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Professional Tax - Feb 2024
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Bell className="mr-2 h-4 w-4" />
                    Set Reminder Alerts
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tax Filing Status</CardTitle>
                <CardDescription>
                  Recent tax filings and compliance tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Filing Type</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Filed Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">TDS Return</TableCell>
                      <TableCell>Q3 2024</TableCell>
                      <TableCell>Mar 15, 2024</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Upload className="mr-1 h-3 w-3" />
                          File Now
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Professional Tax
                      </TableCell>
                      <TableCell>Feb 2024</TableCell>
                      <TableCell>Mar 10, 2024</TableCell>
                      <TableCell>Mar 8, 2024</TableCell>
                      <TableCell>
                        <Badge>Filed</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Mail} animation="bounce" />
                    Email & Communication Tools
                  </CardTitle>
                  <CardDescription>
                    Integrate with email and collaboration platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="comm-platform">Platform</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="outlook">
                            Microsoft Outlook
                          </SelectItem>
                          <SelectItem value="gmail">
                            Google Workspace
                          </SelectItem>
                          <SelectItem value="slack">Slack</SelectItem>
                          <SelectItem value="teams">Microsoft Teams</SelectItem>
                          <SelectItem value="discord">Discord</SelectItem>
                          <SelectItem value="zoom">Zoom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="server-details">Server/Domain</Label>
                      <Input
                        id="server-details"
                        placeholder="company.onmicrosoft.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="auth-method">Authentication</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select auth method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oauth">OAuth 2.0</SelectItem>
                          <SelectItem value="app-password">
                            App Password
                          </SelectItem>
                          <SelectItem value="api-key">API Key</SelectItem>
                          <SelectItem value="webhook">Webhook</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Integration Features</Label>
                      <div className="grid gap-2 grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="auto-email" defaultChecked />
                          <Label htmlFor="auto-email" className="text-sm">
                            Auto Emails
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="calendar-sync" defaultChecked />
                          <Label htmlFor="calendar-sync" className="text-sm">
                            Calendar Sync
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="notifications" defaultChecked />
                          <Label htmlFor="notifications" className="text-sm">
                            Notifications
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="file-sharing" />
                          <Label htmlFor="file-sharing" className="text-sm">
                            File Sharing
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Globe className="mr-2 h-4 w-4" />
                    Connect Platform
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Zap} animation="glow" />
                    Automation Rules
                  </CardTitle>
                  <CardDescription>
                    Configure automated communication workflows
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Welcome Emails
                        </span>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Send welcome email to new employees
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Leave Notifications
                        </span>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Notify managers about leave requests
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Birthday Wishes
                        </span>
                        <Switch />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Send birthday messages to employees
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Payslip Alerts
                        </span>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Notify when payslips are generated
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Rules
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Communication Platform Status</CardTitle>
                <CardDescription>
                  Connected platforms and their integration status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platform</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Messages Sent</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Microsoft Outlook
                      </TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>
                        <Badge>Connected</Badge>
                      </TableCell>
                      <TableCell>5 min ago</TableCell>
                      <TableCell>1,247 this month</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Settings className="mr-1 h-3 w-3" />
                          Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Slack</TableCell>
                      <TableCell>Chat</TableCell>
                      <TableCell>
                        <Badge>Connected</Badge>
                      </TableCell>
                      <TableCell>1 hour ago</TableCell>
                      <TableCell>543 this month</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Bell className="mr-1 h-3 w-3" />
                          Notifications
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Microsoft Teams
                      </TableCell>
                      <TableCell>Collaboration</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Configuring</Badge>
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Plug className="mr-1 h-3 w-3" />
                          Complete Setup
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
