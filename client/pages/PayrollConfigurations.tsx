import { useState } from "react";
import { Link } from "react-router-dom";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  Calculator,
  Globe,
  History,
  Eye,
  Play,
  Save,
  Copy,
  Download,
  Upload,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  Info,
  Code,
  Percent,
  DollarSign,
  BarChart3,
  FileText,
  Search,
  Filter,
  RotateCcw,
  Calendar,
  Building,
  MapPin,
  User,
  Target,
  Zap,
  Award,
  Bell,
  Lock,
  Unlock,
  Database,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";

interface PayrollComponent {
  id: string;
  name: string;
  type: "Statutory" | "Voluntary" | "Deduction" | "Reimbursement";
  frequency: "Monthly" | "Quarterly" | "Annual" | "One-Time";
  countries: string[];
  regions: string[];
  departments: string[];
  status: "Active" | "Inactive" | "Draft";
  logic: ComponentLogic;
  createdAt: string;
  modifiedAt: string;
  version: number;
}

interface ComponentLogic {
  type: "Flat" | "Percentage" | "Slab" | "Formula";
  value?: number;
  formula?: string;
  baseComponents?: string[];
  slabs?: Slab[];
}

interface Slab {
  id: string;
  minValue: number;
  maxValue: number;
  type: "Flat" | "Percentage";
  value: number;
}

export default function PayrollConfigurations() {
  const [activeTab, setActiveTab] = useState("components");
  const [selectedComponent, setSelectedComponent] =
    useState<PayrollComponent | null>(null);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Mock data for demonstration
  const [components, setComponents] = useState<PayrollComponent[]>([
    {
      id: "1",
      name: "Basic Salary",
      type: "Voluntary",
      frequency: "Monthly",
      countries: ["India", "US", "UK"],
      regions: ["Mumbai", "Delhi", "Bangalore"],
      departments: ["All"],
      status: "Active",
      logic: {
        type: "Flat",
        value: 50000,
      },
      createdAt: "2024-01-15",
      modifiedAt: "2024-03-10",
      version: 2,
    },
    {
      id: "2",
      name: "Provident Fund (PF)",
      type: "Statutory",
      frequency: "Monthly",
      countries: ["India"],
      regions: ["All"],
      departments: ["All"],
      status: "Active",
      logic: {
        type: "Percentage",
        value: 12,
        baseComponents: ["Basic Salary"],
      },
      createdAt: "2024-01-15",
      modifiedAt: "2024-02-20",
      version: 1,
    },
    {
      id: "3",
      name: "Income Tax",
      type: "Statutory",
      frequency: "Monthly",
      countries: ["India"],
      regions: ["All"],
      departments: ["All"],
      status: "Active",
      logic: {
        type: "Slab",
        slabs: [
          {
            id: "1",
            minValue: 0,
            maxValue: 250000,
            type: "Percentage",
            value: 0,
          },
          {
            id: "2",
            minValue: 250001,
            maxValue: 500000,
            type: "Percentage",
            value: 5,
          },
          {
            id: "3",
            minValue: 500001,
            maxValue: 1000000,
            type: "Percentage",
            value: 20,
          },
        ],
      },
      createdAt: "2024-01-15",
      modifiedAt: "2024-03-01",
      version: 3,
    },
  ]);

  const filteredComponents = components.filter((component) => {
    const matchesSearch = component.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || component.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const ComponentConfigDialog = () => (
    <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AnimatedIcon icon={Settings} animation="pulse" />
            {selectedComponent ? "Edit Component" : "New Component"}
          </DialogTitle>
          <DialogDescription>
            Configure payroll component settings and calculation logic
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="component-name">Component Name</Label>
                  <Input
                    id="component-name"
                    placeholder="e.g., Basic Salary, PF, Medical Insurance"
                    defaultValue={selectedComponent?.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="component-type">Component Type</Label>
                  <Select defaultValue={selectedComponent?.type}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Statutory">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-red-500" />
                          Statutory
                        </div>
                      </SelectItem>
                      <SelectItem value="Voluntary">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-blue-500" />
                          Voluntary
                        </div>
                      </SelectItem>
                      <SelectItem value="Deduction">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-orange-500" />
                          Deduction
                        </div>
                      </SelectItem>
                      <SelectItem value="Reimbursement">
                        <div className="flex items-center gap-2">
                          <RotateCcw className="h-4 w-4 text-green-500" />
                          Reimbursement
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select defaultValue={selectedComponent?.frequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Annual">Annual</SelectItem>
                      <SelectItem value="One-Time">One-Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={selectedComponent?.status || "Active"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Applicability */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Applicability
                </h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Countries</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="singapore">Singapore</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Regions</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Departments</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logic Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculation Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logic Type</Label>
                <Select defaultValue={selectedComponent?.logic.type || "Flat"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select logic type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Flat">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Flat Amount
                      </div>
                    </SelectItem>
                    <SelectItem value="Percentage">
                      <div className="flex items-center gap-2">
                        <Percent className="h-4 w-4" />
                        Percentage-Based
                      </div>
                    </SelectItem>
                    <SelectItem value="Slab">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Slab-Based
                      </div>
                    </SelectItem>
                    <SelectItem value="Formula">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Custom Formula
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Flat Amount Configuration */}
              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="space-y-4">
                  <h5 className="font-medium">Flat Amount Configuration</h5>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="flat-amount">Amount (₹)</Label>
                      <Input
                        id="flat-amount"
                        type="number"
                        placeholder="e.g., 50000"
                        defaultValue={selectedComponent?.logic.value}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="INR">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">INR (₹)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Percentage Configuration */}
              <div className="p-4 border rounded-lg bg-green-50">
                <div className="space-y-4">
                  <h5 className="font-medium">Percentage Configuration</h5>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="percentage">Percentage (%)</Label>
                      <Input
                        id="percentage"
                        type="number"
                        placeholder="e.g., 12"
                        step="0.01"
                        defaultValue={selectedComponent?.logic.value}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Base Components</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select base components" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic Salary</SelectItem>
                          <SelectItem value="hra">HRA</SelectItem>
                          <SelectItem value="gross">Gross Salary</SelectItem>
                          <SelectItem value="ctc">CTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="formula-builder">Formula Builder</Label>
                    <div className="flex gap-2">
                      <Input
                        id="formula-builder"
                        placeholder="e.g., 12% of (Basic + HRA - PF)"
                        defaultValue={selectedComponent?.logic.formula}
                      />
                      <Button variant="outline" size="sm">
                        <Code className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slab Configuration */}
              <div className="p-4 border rounded-lg bg-orange-50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Slab Configuration</h5>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Slab
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid gap-4 grid-cols-4 text-sm font-medium">
                      <div>Min Amount</div>
                      <div>Max Amount</div>
                      <div>Type</div>
                      <div>Value</div>
                    </div>
                    {selectedComponent?.logic.slabs?.map((slab, index) => (
                      <div key={slab.id} className="grid gap-4 grid-cols-4">
                        <Input
                          type="number"
                          placeholder="0"
                          defaultValue={slab.minValue}
                        />
                        <Input
                          type="number"
                          placeholder="250000"
                          defaultValue={slab.maxValue}
                        />
                        <Select defaultValue={slab.type}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Flat">Flat</SelectItem>
                            <SelectItem value="Percentage">
                              Percentage
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex gap-1">
                          <Input
                            type="number"
                            placeholder="0"
                            defaultValue={slab.value}
                          />
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Access Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Access Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h5 className="font-medium">View Permissions</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="view-hr" defaultChecked />
                      <Label htmlFor="view-hr">HR Team</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="view-payroll" defaultChecked />
                      <Label htmlFor="view-payroll">Payroll Team</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="view-finance" />
                      <Label htmlFor="view-finance">Finance Team</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="view-manager" />
                      <Label htmlFor="view-manager">Managers</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h5 className="font-medium">Edit Permissions</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="edit-admin" defaultChecked />
                      <Label htmlFor="edit-admin">System Admin</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="edit-payroll-lead" defaultChecked />
                      <Label htmlFor="edit-payroll-lead">Payroll Lead</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="edit-hr-head" />
                      <Label htmlFor="edit-hr-head">HR Head</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsConfigDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const PreviewTestDialog = () => (
    <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AnimatedIcon icon={Play} animation="pulse" />
            Test & Preview Calculations
          </DialogTitle>
          <DialogDescription>
            Test your payroll component logic with sample employee data
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Test Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Test Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Test Employee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emp1">
                        John Doe (Senior Developer)
                      </SelectItem>
                      <SelectItem value="emp2">Jane Smith (Manager)</SelectItem>
                      <SelectItem value="emp3">Rajesh Kumar (Lead)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Basic Salary (₹)</Label>
                  <Input
                    type="number"
                    placeholder="50000"
                    defaultValue="75000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>HRA (₹)</Label>
                  <Input
                    type="number"
                    placeholder="25000"
                    defaultValue="30000"
                  />
                </div>
              </div>
              <Button className="w-full">
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Preview
              </Button>
            </CardContent>
          </Card>

          {/* Calculation Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Calculation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h5 className="font-medium mb-2">Input Values</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Basic Salary:</span>
                        <span>₹75,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>HRA:</span>
                        <span>₹30,000</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total Base:</span>
                        <span>₹1,05,000</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-green-50">
                    <h5 className="font-medium mb-2">Calculated Result</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Formula Applied:</span>
                        <span>12% of Basic</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Calculation:</span>
                        <span>75,000 × 12%</span>
                      </div>
                      <div className="flex justify-between font-medium text-lg">
                        <span>Final Amount:</span>
                        <span className="text-green-600">₹9,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step-by-step breakdown */}
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-3">Calculation Breakdown</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>
                        Step 1: Identify base component (Basic Salary) = ₹75,000
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Step 2: Apply percentage (12%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>
                        Step 3: Calculate final amount: ₹75,000 × 0.12 = ₹9,000
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>
                        Step 4: Validation passed - Amount within expected range
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPreviewDialogOpen(false)}
            >
              Close
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save as Test Case
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/hrms/payroll"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Payroll Management
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Payroll Configurations
            </h1>
            <p className="text-muted-foreground">
              Configure payroll components, calculation logic, and global
              compliance rules
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <PulsingDot className="text-green-500" />
              {components.length} Components
            </Badge>
            <Button
              onClick={() => {
                setSelectedComponent(null);
                setIsConfigDialogOpen(true);
              }}
            >
              <AnimatedIcon icon={Plus} className="mr-2" />
              New Component
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="logic" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Logic Engine
            </TabsTrigger>
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Visual Builder
            </TabsTrigger>
            <TabsTrigger value="execution" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Execution Engine
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview & Test
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Global Compliance
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Audit & Versions
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Access Control
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4 items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search components..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Statutory">Statutory</SelectItem>
                      <SelectItem value="Voluntary">Voluntary</SelectItem>
                      <SelectItem value="Deduction">Deduction</SelectItem>
                      <SelectItem value="Reimbursement">
                        Reimbursement
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Components Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredComponents.map((component) => (
                <Card key={component.id} className="hover-lift cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {component.name}
                      </CardTitle>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedComponent(component);
                            setIsConfigDialogOpen(true);
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedComponent(component);
                            setIsPreviewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Component
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "
                                {component.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          component.type === "Statutory"
                            ? "destructive"
                            : "default"
                        }
                      >
                        {component.type}
                      </Badge>
                      <Badge variant="outline">{component.frequency}</Badge>
                      <Badge
                        variant={
                          component.status === "Active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {component.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Calculator className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Logic Type:</span>
                          <Badge variant="outline">
                            {component.logic.type}
                          </Badge>
                        </div>
                        {component.logic.type === "Flat" && (
                          <p className="text-muted-foreground">
                            Fixed amount: ₹
                            {component.logic.value?.toLocaleString()}
                          </p>
                        )}
                        {component.logic.type === "Percentage" && (
                          <p className="text-muted-foreground">
                            {component.logic.value}% of{" "}
                            {component.logic.baseComponents?.join(", ")}
                          </p>
                        )}
                        {component.logic.type === "Slab" && (
                          <p className="text-muted-foreground">
                            {component.logic.slabs?.length} tax slabs configured
                          </p>
                        )}
                      </div>
                      <div className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Applicable:</span>
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {component.countries.slice(0, 2).join(", ")}
                          {component.countries.length > 2 &&
                            ` +${component.countries.length - 2} more`}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Modified: {component.modifiedAt} • v{component.version}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logic" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Code} animation="pulse" />
                    Formula Builder
                  </CardTitle>
                  <CardDescription>
                    Create complex calculation formulas with visual builder
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Formula Expression</Label>
                    <Textarea
                      placeholder="Enter formula... e.g., (Basic_Salary + HRA) * 0.12 - Previous_PF"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2 grid-cols-2">
                    <Button variant="outline" size="sm">
                      <Plus className="mr-1 h-3 w-3" />
                      Add Component
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calculator className="mr-1 h-3 w-3" />
                      Add Function
                    </Button>
                  </div>
                  <div className="p-3 bg-gray-50 rounded text-sm">
                    <div className="font-medium mb-2">Available Functions:</div>
                    <div className="space-y-1 text-xs">
                      <div>MAX(a, b) - Maximum of two values</div>
                      <div>MIN(a, b) - Minimum of two values</div>
                      <div>ROUND(a, n) - Round to n decimal places</div>
                      <div>
                        IF(condition, true_val, false_val) - Conditional
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Test Formula
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={BarChart3} animation="float" />
                    Slab Configuration
                  </CardTitle>
                  <CardDescription>
                    Define progressive tax slabs and ranges
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="grid gap-2 grid-cols-4 text-sm font-medium">
                      <div>Min (₹)</div>
                      <div>Max (₹)</div>
                      <div>Rate (%)</div>
                      <div>Action</div>
                    </div>
                    <div className="grid gap-2 grid-cols-4 text-sm">
                      <Input placeholder="0" defaultValue="0" />
                      <Input placeholder="250000" defaultValue="250000" />
                      <Input placeholder="0" defaultValue="0" />
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="grid gap-2 grid-cols-4 text-sm">
                      <Input placeholder="250001" defaultValue="250001" />
                      <Input placeholder="500000" defaultValue="500000" />
                      <Input placeholder="5" defaultValue="5" />
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="grid gap-2 grid-cols-4 text-sm">
                      <Input placeholder="500001" defaultValue="500001" />
                      <Input placeholder="1000000" defaultValue="1000000" />
                      <Input placeholder="20" defaultValue="20" />
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Slab
                  </Button>
                  <div className="p-3 bg-blue-50 rounded text-sm">
                    <div className="font-medium mb-1">Preview:</div>
                    <div className="text-xs text-muted-foreground">
                      For ₹7,50,000 income: ₹0 + ₹12,500 + ₹50,000 = ₹62,500 tax
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-4">
              {/* Component Palette */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Zap} animation="pulse" />
                    Component Palette
                  </CardTitle>
                  <CardDescription>
                    Drag components to build your payroll logic
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div
                      className="p-3 border rounded-lg cursor-grab hover:bg-gray-50 transition-colors"
                      draggable
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-sm">Flat Amount</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Fixed value calculation
                      </p>
                    </div>

                    <div
                      className="p-3 border rounded-lg cursor-grab hover:bg-gray-50 transition-colors"
                      draggable
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Percent className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm">Percentage</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Percentage-based calculation
                      </p>
                    </div>

                    <div
                      className="p-3 border rounded-lg cursor-grab hover:bg-gray-50 transition-colors"
                      draggable
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-sm">Slab</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Progressive slab-based
                      </p>
                    </div>

                    <div
                      className="p-3 border rounded-lg cursor-grab hover:bg-gray-50 transition-colors"
                      draggable
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-sm">Cap/Limit</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Maximum/minimum limits
                      </p>
                    </div>

                    <div
                      className="p-3 border rounded-lg cursor-grab hover:bg-gray-50 transition-colors"
                      draggable
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Code className="h-4 w-4 text-orange-600" />
                        <span className="font-medium text-sm">Condition</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        If-then-else logic
                      </p>
                    </div>

                    <div
                      className="p-3 border rounded-lg cursor-grab hover:bg-gray-50 transition-colors"
                      draggable
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Calculator className="h-4 w-4 text-teal-600" />
                        <span className="font-medium text-sm">Formula</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Custom expression
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visual Builder Canvas */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Target} animation="float" />
                    Logic Builder Canvas
                  </CardTitle>
                  <CardDescription>
                    Build complex multi-logic chains with drag & drop
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[600px] border-2 border-dashed border-gray-200 rounded-lg p-4 relative bg-gray-50">
                    {/* Sample Logic Chain */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline">
                          Logic Chain: Provident Fund
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Plus className="h-3 w-3" />
                          Add Step
                        </Button>
                      </div>

                      {/* Step 1 */}
                      <div className="relative">
                        <div className="bg-white border-2 border-blue-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                                1
                              </div>
                              <span className="font-medium">
                                Base Calculation
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <strong>Type:</strong> Percentage
                            <br />
                            <strong>Rate:</strong> 12% of Basic Salary
                            <br />
                            <strong>Formula:</strong> MIN(Basic_Salary, 15000) ×
                            0.12
                          </div>
                        </div>
                        <div className="absolute left-1/2 -bottom-2 w-0.5 h-4 bg-gray-300"></div>
                      </div>

                      {/* Step 2 */}
                      <div className="relative">
                        <div className="bg-white border-2 border-purple-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs">
                                2
                              </div>
                              <span className="font-medium">Apply Cap</span>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <strong>Type:</strong> Cap/Limit
                            <br />
                            <strong>Max Amount:</strong> ₹1,800 per month
                            <br />
                            <strong>Condition:</strong> Salary cap at ₹15,000
                          </div>
                        </div>
                        <div className="absolute left-1/2 -bottom-2 w-0.5 h-4 bg-gray-300"></div>
                      </div>

                      {/* Step 3 */}
                      <div className="relative">
                        <div className="bg-white border-2 border-green-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                                3
                              </div>
                              <span className="font-medium">
                                Conditional Logic
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <strong>Type:</strong> Condition
                            <br />
                            <strong>Rule:</strong> IF Employee.Type = "Contract"
                            THEN 0<br />
                            <strong>Else:</strong> Continue with calculation
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Drop Zone */}
                    <div className="absolute bottom-4 left-4 right-4 h-20 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center text-blue-500 bg-blue-50">
                      <div className="text-center">
                        <Plus className="h-6 w-6 mx-auto mb-1" />
                        <span className="text-sm">
                          Drop components here to add new logic steps
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Logic Layers & Properties */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Logic Layers</CardTitle>
                  <CardDescription>
                    Configure hierarchy and properties
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-sm">Global</span>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Base rules applied to all employees
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-sm">Country</span>
                        </div>
                        <Badge variant="outline">India</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Country-specific statutory rules
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-purple-500" />
                          <span className="font-medium text-sm">
                            Department
                          </span>
                        </div>
                        <Badge variant="outline">Engineering</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Department-level overrides
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-orange-500" />
                          <span className="font-medium text-sm">Employee</span>
                        </div>
                        <Badge variant="outline">Individual</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Employee-specific adjustments
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h5 className="font-medium text-sm">Smart References</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Basic_Salary</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>HRA</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-3 w-3 text-yellow-500" />
                        <span>Bonus (Optional)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                        <span>Previous_PF (Circular)</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Save Logic Chain
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="execution" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* DAG Execution Engine */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Target} animation="pulse" />
                    DAG Execution Engine
                  </CardTitle>
                  <CardDescription>
                    Dependency-aware execution with circular detection
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium mb-3">Execution Graph</h5>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                          1
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            Basic_Salary
                          </div>
                          <div className="text-xs text-muted-foreground">
                            No dependencies
                          </div>
                        </div>
                        <Badge>Ready</Badge>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                          2
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">HRA</div>
                          <div className="text-xs text-muted-foreground">
                            Depends on: Basic_Salary
                          </div>
                        </div>
                        <Badge>Ready</Badge>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                          3
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            Provident_Fund
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Depends on: Basic_Salary
                          </div>
                        </div>
                        <Badge variant="secondary">Executing</Badge>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs">
                          4
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Income_Tax</div>
                          <div className="text-xs text-muted-foreground">
                            Depends on: Basic_Salary, HRA, Provident_Fund
                          </div>
                        </div>
                        <Badge variant="outline">Waiting</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Parallel execution</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Circular dependency detection</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <Label>Debug mode</Label>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Execute Calculation
                  </Button>
                </CardContent>
              </Card>

              {/* DSL Rules Engine */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Code} animation="glow" />
                    DSL Rules Engine
                  </CardTitle>
                  <CardDescription>
                    Domain-specific language for complex rules
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Rule Definition (DSL)</Label>
                    <Textarea
                      rows={8}
                      className="font-mono text-sm"
                      defaultValue={`RULE "Provident Fund Calculation"
WHEN employee.country = "India"
  AND employee.salary_type = "Monthly"
DO
  base_amount = MIN(employee.basic_salary, 15000)
  pf_employee = base_amount * 0.12
  pf_employer = base_amount * 0.12

  IF employee.type = "Contract" THEN
    pf_employee = 0
    pf_employer = 0
  ENDIF

  RETURN pf_employee
END RULE`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Validate Syntax
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="mr-1 h-3 w-3" />
                      Test Rule
                    </Button>
                  </div>

                  <div className="p-3 bg-gray-50 rounded text-sm">
                    <div className="font-medium mb-2">Available Functions:</div>
                    <div className="space-y-1 text-xs">
                      <div>MIN(a, b) - Minimum value</div>
                      <div>MAX(a, b) - Maximum value</div>
                      <div>ROUND(a, n) - Round to n decimals</div>
                      <div>SUM(array) - Sum of array</div>
                      <div>IF...THEN...ELSE - Conditional</div>
                      <div>LOOKUP(table, key) - Table lookup</div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Save DSL Rule
                  </Button>
                </CardContent>
              </Card>

              {/* Plugin Interface */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Zap} animation="bounce" />
                    Plugin Interface
                  </CardTitle>
                  <CardDescription>
                    Extensible plugin system for custom logic
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                            <CheckCircle className="h-3 w-3" />
                          </div>
                          <span className="font-medium text-sm">
                            Indian Tax Plugin
                          </span>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Handles IT Act 1961, EPF Act 1952, ESI Act 1948
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center">
                            <CheckCircle className="h-3 w-3" />
                          </div>
                          <span className="font-medium text-sm">
                            US Payroll Plugin
                          </span>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Federal tax, state tax, FICA, FUTA calculations
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center">
                            <Plus className="h-3 w-3" />
                          </div>
                          <span className="font-medium text-sm">
                            Custom Formula Plugin
                          </span>
                        </div>
                        <Badge variant="outline">Available</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Company-specific calculation logic
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Install New Plugin
                  </Button>
                </CardContent>
              </Card>

              {/* Dependency Graph Visualization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Target} animation="float" />
                    Dependency Graph
                  </CardTitle>
                  <CardDescription>
                    Visual dependency analysis and circular detection
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg min-h-64 relative">
                    <div className="absolute inset-4 flex items-center justify-center">
                      <div className="text-center space-y-3">
                        {/* Basic Salary Node */}
                        <div className="inline-block">
                          <div className="w-20 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center text-xs font-medium">
                            Basic Salary
                          </div>
                        </div>

                        {/* Arrows and dependent nodes */}
                        <div className="flex items-center justify-center gap-8">
                          <div className="text-center">
                            <div className="w-16 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center text-xs">
                              HRA
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              40% of Basic
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="w-16 h-10 bg-purple-500 text-white rounded-lg flex items-center justify-center text-xs">
                              PF
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              12% of Basic
                            </div>
                          </div>
                        </div>

                        {/* Final calculation */}
                        <div className="text-center">
                          <div className="w-20 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center text-xs font-medium">
                            Income Tax
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Depends on all above
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No circular dependencies detected</span>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    View Full Graph
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Enhanced Test Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Play} animation="bounce" />
                    Advanced Test Calculator
                  </CardTitle>
                  <CardDescription>
                    Multi-component testing with real-time preview
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Test Scenario</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select test scenario" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-payroll">
                            Full Payroll Calculation
                          </SelectItem>
                          <SelectItem value="pf-only">
                            PF Calculation Only
                          </SelectItem>
                          <SelectItem value="tax-only">
                            Income Tax Only
                          </SelectItem>
                          <SelectItem value="custom">
                            Custom Component Set
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Employee Profile</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="senior-dev">
                            Senior Developer (₹75K)
                          </SelectItem>
                          <SelectItem value="manager">
                            Manager (₹1.2L)
                          </SelectItem>
                          <SelectItem value="entry">
                            Entry Level (₹30K)
                          </SelectItem>
                          <SelectItem value="custom">Custom Profile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3 grid-cols-2">
                      <div className="space-y-2">
                        <Label>Basic Salary (₹)</Label>
                        <Input
                          type="number"
                          placeholder="50000"
                          defaultValue="75000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>HRA (₹)</Label>
                        <Input
                          type="number"
                          placeholder="20000"
                          defaultValue="30000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Special Allowance (₹)</Label>
                        <Input
                          type="number"
                          placeholder="10000"
                          defaultValue="15000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Previous PF (₹)</Label>
                        <Input
                          type="number"
                          placeholder="0"
                          defaultValue="45000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Label>Dry run mode</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label>Step-by-step tracing</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Label>Performance profiling</Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 grid-cols-2">
                    <Button>
                      <Play className="mr-2 h-4 w-4" />
                      Run Test
                    </Button>
                    <Button variant="outline">
                      <Save className="mr-2 h-4 w-4" />
                      Save Case
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Real-time Result Trace */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Target} animation="pulse" />
                    Execution Trace
                  </CardTitle>
                  <CardDescription>
                    Step-by-step calculation breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    <div className="space-y-2">
                      <div className="p-3 border rounded-lg bg-blue-50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                            1
                          </div>
                          <span className="font-medium text-sm">
                            Initialize Variables
                          </span>
                          <Badge variant="outline">0.2ms</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground ml-7">
                          Basic_Salary = ₹75,000
                          <br />
                          HRA = ₹30,000
                          <br />
                          Special_Allowance = ₹15,000
                        </div>
                      </div>

                      <div className="p-3 border rounded-lg bg-green-50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                            2
                          </div>
                          <span className="font-medium text-sm">
                            Calculate PF
                          </span>
                          <Badge variant="outline">1.1ms</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground ml-7">
                          Base = MIN(75000, 15000) = ₹15,000
                          <br />
                          PF = 15000 × 0.12 = ₹1,800
                          <br />
                          <strong>Result: ₹1,800</strong>
                        </div>
                      </div>

                      <div className="p-3 border rounded-lg bg-purple-50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs">
                            3
                          </div>
                          <span className="font-medium text-sm">
                            Calculate ESI
                          </span>
                          <Badge variant="outline">0.8ms</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground ml-7">
                          Gross = 75000 + 30000 + 15000 = ₹1,20,000
                          <br />
                          ESI = 0 (Gross &gt; ₹25,000 limit)
                          <br />
                          <strong>Result: ₹0</strong>
                        </div>
                      </div>

                      <div className="p-3 border rounded-lg bg-orange-50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">
                            4
                          </div>
                          <span className="font-medium text-sm">
                            Calculate Income Tax
                          </span>
                          <Badge variant="outline">2.3ms</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground ml-7">
                          Taxable = 1,20,000 × 12 - 50,000 - 21,600 = ₹12,68,400
                          <br />
                          Tax Slab: ₹20,000 + ₹2,53,680 = ₹2,73,680
                          <br />
                          Monthly = ₹2,73,680 ÷ 12 = ₹22,807
                          <br />
                          <strong>Result: ₹22,807</strong>
                        </div>
                      </div>

                      <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-medium text-sm">
                            Execution Complete
                          </span>
                          <Badge>4.4ms total</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground ml-7">
                          All components calculated successfully
                          <br />
                          No errors or warnings detected
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="mr-1 h-3 w-3" />
                      Export Trace
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Copy className="mr-1 h-3 w-3" />
                      Copy Results
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Test Scenarios */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={FileText} animation="glow" />
                    Test Scenarios
                  </CardTitle>
                  <CardDescription>
                    Comprehensive test cases and benchmarks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Regression Test Suite
                        </span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        45 test cases • Last run: All passed
                        <br />
                        Coverage: PF, ESI, IT, PT for all salary ranges
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Edge Case Validation
                        </span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        12 edge cases • 2 warnings detected
                        <br />
                        Boundary conditions, zero values, negative amounts
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Performance Benchmark
                        </span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1000 employees • Avg: 12.3ms per employee
                        <br />
                        Memory usage: 45MB • 99.9% success rate
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Compliance Validation
                        </span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Statutory rules verification • All countries
                        <br />
                        Indian: PF, ESI, IT | US: FICA, Federal | UK: PAYE, NI
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h5 className="font-medium text-sm">Quick Actions</h5>
                    <div className="grid gap-2 grid-cols-2">
                      <Button size="sm" variant="outline">
                        <Plus className="mr-1 h-3 w-3" />
                        New Test
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="mr-1 h-3 w-3" />
                        Import CSV
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-1 h-3 w-3" />
                        Export Results
                      </Button>
                      <Button size="sm" variant="outline">
                        <RotateCcw className="mr-1 h-3 w-3" />
                        Run All
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 rounded text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Last Test Summary</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      57/57 tests passed • 0 failures • 2 warnings
                      <br />
                      Execution time: 2.1s • Performance: +15% improvement
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inline Preview Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={Eye} animation="pulse" />
                  Inline Calculation Preview
                </CardTitle>
                <CardDescription>
                  Real-time calculation results as you modify components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h5 className="font-medium">Input Summary</h5>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Basic Salary:</span>
                          <span className="font-medium">₹75,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>HRA:</span>
                          <span className="font-medium">₹30,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Special Allowance:</span>
                          <span className="font-medium">₹15,000</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Gross Salary:</span>
                          <span>₹1,20,000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-medium">Calculated Deductions</h5>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Provident Fund:</span>
                          <span className="font-medium text-red-600">
                            ₹1,800
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>ESI:</span>
                          <span className="font-medium text-red-600">₹0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Professional Tax:</span>
                          <span className="font-medium text-red-600">₹200</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Income Tax:</span>
                          <span className="font-medium text-red-600">
                            ₹22,807
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Total Deductions:</span>
                          <span className="text-red-600">₹24,807</span>
                        </div>
                        <div className="flex justify-between font-medium text-lg">
                          <span>Net Salary:</span>
                          <span className="text-green-600">₹95,193</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium">Calculation Performance</h5>
                    <Badge variant="outline">Real-time</Badge>
                  </div>
                  <div className="grid gap-4 md:grid-cols-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-lg text-blue-600">
                        4.4ms
                      </div>
                      <div className="text-muted-foreground">
                        Execution Time
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-lg text-green-600">
                        12
                      </div>
                      <div className="text-muted-foreground">Components</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-lg text-purple-600">
                        0
                      </div>
                      <div className="text-muted-foreground">Errors</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-lg text-orange-600">
                        98.2%
                      </div>
                      <div className="text-muted-foreground">Accuracy</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            {/* Country Selection Tabs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={Globe} animation="float" />
                  Country Configurations
                </CardTitle>
                <CardDescription>
                  Manage country-specific payroll rules and statutory
                  requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="india" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                      value="india"
                      className="flex items-center gap-2"
                    >
                      <div className="w-4 h-3 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded"></div>
                      India
                    </TabsTrigger>
                    <TabsTrigger value="us" className="flex items-center gap-2">
                      <div className="w-4 h-3 bg-gradient-to-r from-blue-500 via-white to-red-500 rounded"></div>
                      United States
                    </TabsTrigger>
                    <TabsTrigger value="uk" className="flex items-center gap-2">
                      <div className="w-4 h-3 bg-gradient-to-r from-blue-800 via-white to-red-600 rounded"></div>
                      United Kingdom
                    </TabsTrigger>
                  </TabsList>

                  {/* India Configuration */}
                  <TabsContent value="india" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Provident Fund Configuration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-600" />
                            Provident Fund (PF)
                          </CardTitle>
                          <CardDescription>
                            Employee & Employer contribution rules as per EPF
                            Act 1952
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h5 className="font-medium mb-3">
                              Current Rules (FY 2024-25)
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Salary Cap</Label>
                                  <Input value="₹15,000" readOnly />
                                </div>
                                <div>
                                  <Label>Employee Rate</Label>
                                  <Input value="12%" readOnly />
                                </div>
                                <div>
                                  <Label>Employer Rate</Label>
                                  <Input value="12%" readOnly />
                                </div>
                                <div>
                                  <Label>Pension Rate</Label>
                                  <Input value="8.33%" readOnly />
                                </div>
                              </div>
                              <div className="mt-3">
                                <Label>Calculation Logic</Label>
                                <Textarea
                                  value="MIN(Basic_Salary, 15000) × 12% (Employee) + MIN(Basic_Salary, 15000) × 12% (Employer)"
                                  readOnly
                                  rows={2}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label>Auto-calculate on salary change</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label>Apply to new employees</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch />
                              <Label>Include special allowances</Label>
                            </div>
                          </div>
                          <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update PF Rules
                          </Button>
                        </CardContent>
                      </Card>

                      {/* ESI Configuration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Shield className="h-5 w-5 text-green-600" />
                            Employee State Insurance (ESI)
                          </CardTitle>
                          <CardDescription>
                            Medical benefits as per ESI Act 1948
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <h5 className="font-medium mb-3">
                              Current Rules (FY 2024-25)
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Salary Cap</Label>
                                  <Input value="₹25,000" readOnly />
                                </div>
                                <div>
                                  <Label>Employee Rate</Label>
                                  <Input value="0.75%" readOnly />
                                </div>
                                <div>
                                  <Label>Employer Rate</Label>
                                  <Input value="3.25%" readOnly />
                                </div>
                                <div>
                                  <Label>Applicability</Label>
                                  <Select defaultValue="mandatory">
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="mandatory">
                                        Mandatory (Salary ≤ ₹25K)
                                      </SelectItem>
                                      <SelectItem value="voluntary">
                                        Voluntary
                                      </SelectItem>
                                      <SelectItem value="exempt">
                                        Exempt
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="mt-3">
                                <Label>Calculation Logic</Label>
                                <Textarea
                                  value="IF(Gross_Salary ≤ 25000, Gross_Salary × 0.75% (Employee) + Gross_Salary × 3.25% (Employer), 0)"
                                  readOnly
                                  rows={2}
                                />
                              </div>
                            </div>
                          </div>
                          <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update ESI Rules
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Professional Tax Configuration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <FileText className="h-5 w-5 text-purple-600" />
                            Professional Tax
                          </CardTitle>
                          <CardDescription>
                            State-wise professional tax rates and slabs
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Select State</Label>
                            <Select defaultValue="maharashtra">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="maharashtra">
                                  Maharashtra
                                </SelectItem>
                                <SelectItem value="karnataka">
                                  Karnataka
                                </SelectItem>
                                <SelectItem value="west-bengal">
                                  West Bengal
                                </SelectItem>
                                <SelectItem value="gujarat">Gujarat</SelectItem>
                                <SelectItem value="andhra-pradesh">
                                  Andhra Pradesh
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="p-4 bg-purple-50 rounded-lg">
                            <h5 className="font-medium mb-3">
                              Maharashtra PT Slabs (2024-25)
                            </h5>
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2 text-sm font-medium">
                                <div>Monthly Salary</div>
                                <div>Tax Amount</div>
                                <div>Annual</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>Up to ₹5,000</div>
                                <div>₹0</div>
                                <div>₹0</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>₹5,001 - ₹10,000</div>
                                <div>₹150</div>
                                <div>₹1,800</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>Above ₹10,000</div>
                                <div>₹200</div>
                                <div>₹2,400</div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label>Auto-deduct monthly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label>Generate PT certificates</Label>
                            </div>
                          </div>
                          <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update PT Rules
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Income Tax Configuration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-red-600" />
                            Income Tax (TDS)
                          </CardTitle>
                          <CardDescription>
                            Tax slabs and deduction calculations as per IT Act
                            1961
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Tax Regime</Label>
                            <Select defaultValue="old">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="old">
                                  Old Tax Regime
                                </SelectItem>
                                <SelectItem value="new">
                                  New Tax Regime (2024-25)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="p-4 bg-red-50 rounded-lg">
                            <h5 className="font-medium mb-3">
                              New Tax Regime Slabs (FY 2024-25)
                            </h5>
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2 text-sm font-medium">
                                <div>Income Range</div>
                                <div>Tax Rate</div>
                                <div>Tax Amount</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>₹0 - ₹3,00,000</div>
                                <div>0%</div>
                                <div>₹0</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>₹3,00,001 - ₹7,00,000</div>
                                <div>5%</div>
                                <div>₹20,000</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>₹7,00,001 - ₹10,00,000</div>
                                <div>10%</div>
                                <div>₹30,000</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>₹10,00,001 - ₹12,00,000</div>
                                <div>15%</div>
                                <div>₹30,000</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>₹12,00,001 - ₹15,00,000</div>
                                <div>20%</div>
                                <div>₹60,000</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>Above ₹15,00,000</div>
                                <div>30%</div>
                                <div>Variable</div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label>Standard deduction ₹50,000</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch />
                              <Label>Rebate u/s 87A (up to ₹7 Lakhs)</Label>
                            </div>
                          </div>
                          <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update Tax Rules
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* United States Configuration */}
                  <TabsContent value="us" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Federal Income Tax */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-600" />
                            Federal Income Tax
                          </CardTitle>
                          <CardDescription>
                            Federal tax brackets and withholding rules for 2024
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Filing Status</Label>
                            <Select defaultValue="single">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="married-joint">
                                  Married Filing Jointly
                                </SelectItem>
                                <SelectItem value="married-separate">
                                  Married Filing Separately
                                </SelectItem>
                                <SelectItem value="head-household">
                                  Head of Household
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h5 className="font-medium mb-3">
                              2024 Tax Brackets (Single)
                            </h5>
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2 text-sm font-medium">
                                <div>Taxable Income</div>
                                <div>Tax Rate</div>
                                <div>Tax Owed</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>$0 - $11,000</div>
                                <div>10%</div>
                                <div>$1,100</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>$11,001 - $44,725</div>
                                <div>12%</div>
                                <div>$4,047</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>$44,726 - $95,375</div>
                                <div>22%</div>
                                <div>$11,143</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>$95,376 - $182,050</div>
                                <div>24%</div>
                                <div>$20,802</div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Standard Deduction (2024)</Label>
                            <Input value="$13,850" readOnly />
                          </div>
                          <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update Federal Tax
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Social Security */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Users className="h-5 w-5 text-green-600" />
                            Social Security & Medicare
                          </CardTitle>
                          <CardDescription>
                            FICA tax rates and wage base limits for 2024
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <h5 className="font-medium mb-3">
                              FICA Rates (2024)
                            </h5>
                            <div className="space-y-3">
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <Label>Social Security Rate</Label>
                                  <Input value="6.2%" readOnly />
                                </div>
                                <div>
                                  <Label>Medicare Rate</Label>
                                  <Input value="1.45%" readOnly />
                                </div>
                                <div>
                                  <Label>Additional Medicare</Label>
                                  <Input value="0.9%" readOnly />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>SS Wage Base</Label>
                                  <Input value="$160,200" readOnly />
                                </div>
                                <div>
                                  <Label>Medicare Threshold</Label>
                                  <Input value="$200,000" readOnly />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label>Auto-apply wage base limit</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label>
                                Include tips in Medicare calculation
                              </Label>
                            </div>
                          </div>
                          <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update FICA Rules
                          </Button>
                        </CardContent>
                      </Card>

                      {/* State Tax */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-purple-600" />
                            State Income Tax
                          </CardTitle>
                          <CardDescription>
                            State-specific tax rates and rules
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Select State</Label>
                            <Select defaultValue="california">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="california">
                                  California
                                </SelectItem>
                                <SelectItem value="new-york">
                                  New York
                                </SelectItem>
                                <SelectItem value="texas">
                                  Texas (No State Tax)
                                </SelectItem>
                                <SelectItem value="florida">
                                  Florida (No State Tax)
                                </SelectItem>
                                <SelectItem value="illinois">
                                  Illinois
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="p-4 bg-purple-50 rounded-lg">
                            <h5 className="font-medium mb-3">
                              California Tax Brackets (2024)
                            </h5>
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2 text-sm font-medium">
                                <div>Taxable Income</div>
                                <div>Tax Rate</div>
                                <div>Tax Amount</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>$0 - $10,099</div>
                                <div>1%</div>
                                <div>$101</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>$10,100 - $23,942</div>
                                <div>2%</div>
                                <div>$277</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>$23,943 - $37,788</div>
                                <div>4%</div>
                                <div>$554</div>
                              </div>
                            </div>
                          </div>
                          <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update State Tax
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Unemployment Insurance */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Shield className="h-5 w-5 text-orange-600" />
                            Unemployment Insurance
                          </CardTitle>
                          <CardDescription>
                            FUTA and SUTA tax configuration
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-orange-50 rounded-lg">
                            <h5 className="font-medium mb-3">
                              FUTA/SUTA Rates (2024)
                            </h5>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>FUTA Rate</Label>
                                <Input value="6.0%" readOnly />
                              </div>
                              <div>
                                <Label>FUTA Wage Base</Label>
                                <Input value="$7,000" readOnly />
                              </div>
                              <div>
                                <Label>SUTA Rate (CA)</Label>
                                <Input value="3.4%" />
                              </div>
                              <div>
                                <Label>SUTA Wage Base</Label>
                                <Input value="$7,000" />
                              </div>
                            </div>
                          </div>
                          <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update UI Rules
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* United Kingdom Configuration */}
                  <TabsContent value="uk" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* PAYE Income Tax */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-600" />
                            PAYE Income Tax
                          </CardTitle>
                          <CardDescription>
                            Income tax rates and bands for 2024-25 tax year
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Tax Code</Label>
                            <Select defaultValue="1257L">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1257L">
                                  1257L (Standard)
                                </SelectItem>
                                <SelectItem value="BR">
                                  BR (Basic Rate)
                                </SelectItem>
                                <SelectItem value="D0">
                                  D0 (Higher Rate)
                                </SelectItem>
                                <SelectItem value="D1">
                                  D1 (Additional Rate)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h5 className="font-medium mb-3">
                              Income Tax Bands (2024-25)
                            </h5>
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2 text-sm font-medium">
                                <div>Taxable Income</div>
                                <div>Tax Rate</div>
                                <div>Tax Amount</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>£0 - £12,570</div>
                                <div>0%</div>
                                <div>£0 (Personal Allowance)</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>£12,571 - £50,270</div>
                                <div>20%</div>
                                <div>£7,540</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>£50,271 - £125,140</div>
                                <div>40%</div>
                                <div>£29,948</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>Above £125,140</div>
                                <div>45%</div>
                                <div>Variable</div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label>Apply personal allowance</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch />
                              <Label>Scottish tax rates</Label>
                            </div>
                          </div>
                          <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update PAYE Rules
                          </Button>
                        </CardContent>
                      </Card>

                      {/* National Insurance */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Users className="h-5 w-5 text-green-600" />
                            National Insurance
                          </CardTitle>
                          <CardDescription>
                            NI contributions for employees and employers 2024-25
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>NI Category</Label>
                            <Select defaultValue="A">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A">
                                  Category A (Standard)
                                </SelectItem>
                                <SelectItem value="B">
                                  Category B (Married Women)
                                </SelectItem>
                                <SelectItem value="C">
                                  Category C (Over Pension Age)
                                </SelectItem>
                                <SelectItem value="D">
                                  Category D (Under 21)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="p-4 bg-green-50 rounded-lg">
                            <h5 className="font-medium mb-3">
                              NI Rates (2024-25) - Category A
                            </h5>
                            <div className="space-y-3">
                              <div className="grid grid-cols-3 gap-2 text-sm font-medium">
                                <div>Weekly Earnings</div>
                                <div>Employee Rate</div>
                                <div>Employer Rate</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>£0 - £242</div>
                                <div>0%</div>
                                <div>0%</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>£242.01 - £967</div>
                                <div>12%</div>
                                <div>13.8%</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>Above £967</div>
                                <div>2%</div>
                                <div>13.8%</div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label>Apply employment allowance</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch />
                              <Label>Apprenticeship levy (0.5%)</Label>
                            </div>
                          </div>
                          <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update NI Rules
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Pension Auto-Enrolment */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Award className="h-5 w-5 text-purple-600" />
                            Auto-Enrolment Pension
                          </CardTitle>
                          <CardDescription>
                            Workplace pension minimum contributions 2024-25
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <h5 className="font-medium mb-3">
                              Minimum Contributions (2024-25)
                            </h5>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label>Employee Minimum</Label>
                                <Input value="5%" readOnly />
                              </div>
                              <div>
                                <Label>Employer Minimum</Label>
                                <Input value="3%" readOnly />
                              </div>
                              <div>
                                <Label>Total Minimum</Label>
                                <Input value="8%" readOnly />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                              <div>
                                <Label>Lower Earnings Limit</Label>
                                <Input value="£6,240" readOnly />
                              </div>
                              <div>
                                <Label>Upper Earnings Limit</Label>
                                <Input value="£50,270" readOnly />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label>Auto-enrol eligible employees</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch defaultChecked />
                              <Label>Apply qualifying earnings</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch />
                              <Label>Enhanced contributions</Label>
                            </div>
                          </div>
                          <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update Pension Rules
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Student Loan */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-orange-600" />
                            Student Loan Deductions
                          </CardTitle>
                          <CardDescription>
                            Student loan repayment thresholds and rates
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Loan Plan Type</Label>
                            <Select defaultValue="plan2">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="plan1">
                                  Plan 1 (Before Sep 2012)
                                </SelectItem>
                                <SelectItem value="plan2">
                                  Plan 2 (Sep 2012 onwards)
                                </SelectItem>
                                <SelectItem value="plan4">
                                  Plan 4 (Scotland)
                                </SelectItem>
                                <SelectItem value="plan5">
                                  Plan 5 (Aug 2023 onwards)
                                </SelectItem>
                                <SelectItem value="postgrad">
                                  Postgraduate Loan
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="p-4 bg-orange-50 rounded-lg">
                            <h5 className="font-medium mb-3">
                              Repayment Rates (2024-25)
                            </h5>
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2 text-sm font-medium">
                                <div>Plan Type</div>
                                <div>Threshold</div>
                                <div>Rate</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>Plan 1</div>
                                <div>£22,015</div>
                                <div>9%</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>Plan 2</div>
                                <div>£27,295</div>
                                <div>9%</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>Plan 4</div>
                                <div>£27,660</div>
                                <div>9%</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>Postgraduate</div>
                                <div>£21,000</div>
                                <div>6%</div>
                              </div>
                            </div>
                          </div>
                          <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update Student Loan Rules
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Global Validation Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={AlertTriangle} animation="pulse" />
                  Compliance Validation Summary
                </CardTitle>
                <CardDescription>
                  Real-time validation status across all configured countries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg bg-green-50">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">India - Compliant</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>✓ PF rules updated for FY 2024-25</div>
                      <div>✓ ESI rates current (₹25K cap)</div>
                      <div>✓ New IT slabs configured</div>
                      <div>✓ State PT rules validated</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-yellow-50">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">
                        US - Attention Required
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>✓ Federal rates current (2024)</div>
                      <div>⚠ State tax rates need update</div>
                      <div>✓ FICA caps updated ($160,200)</div>
                      <div>⚠ FUTA credit review pending</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">UK - Recent Updates</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>✓ PAYE rates updated (2024-25)</div>
                      <div>✓ NI thresholds current</div>
                      <div>✓ Pension auto-enrolment ready</div>
                      <div>ℹ Student loan Plan 5 available</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button className="flex-1">
                    <Shield className="mr-2 h-4 w-4" />
                    Validate All Countries
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Export Compliance Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={History} animation="pulse" />
                  Change History & Versioning
                </CardTitle>
                <CardDescription>
                  Track all changes made to payroll components with full audit
                  trail
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Change Type</TableHead>
                      <TableHead>Modified By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Income Tax</TableCell>
                      <TableCell>
                        <Badge variant="outline">v3.0</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Edit className="h-3 w-3 text-blue-500" />
                          Slab Updated
                        </div>
                      </TableCell>
                      <TableCell>Rajesh Kumar (Admin)</TableCell>
                      <TableCell>Mar 10, 2024 14:30</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Provident Fund
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">v2.1</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Settings className="h-3 w-3 text-green-500" />
                          Rate Changed
                        </div>
                      </TableCell>
                      <TableCell>Priya Sharma (HR Lead)</TableCell>
                      <TableCell>Mar 8, 2024 09:15</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Basic Salary
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">v1.0</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Plus className="h-3 w-3 text-purple-500" />
                          Created
                        </div>
                      </TableCell>
                      <TableCell>Admin System</TableCell>
                      <TableCell>Jan 15, 2024 10:00</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" disabled>
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Version Comparison</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2 grid-cols-2">
                    <div className="space-y-2">
                      <Label>Version A</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select version" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v3">v3.0 (Current)</SelectItem>
                          <SelectItem value="v2">v2.1</SelectItem>
                          <SelectItem value="v1">v1.0</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Version B</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select version" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v2">v2.1</SelectItem>
                          <SelectItem value="v1">v1.0</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    Compare Versions
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Backup & Export</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Export All Configurations
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Import Configurations
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Database className="mr-2 h-4 w-4" />
                      Create Backup
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last backup: Mar 10, 2024 at 23:30
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="access" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Users} animation="bounce" />
                    Role-Based Permissions
                  </CardTitle>
                  <CardDescription>
                    Configure access controls for different user roles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-red-500" />
                          <span className="font-medium">
                            System Administrator
                          </span>
                        </div>
                        <Badge>5 Users</Badge>
                      </div>
                      <div className="grid gap-2 grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked disabled />
                          <Label className="text-sm">View All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked disabled />
                          <Label className="text-sm">Edit All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked disabled />
                          <Label className="text-sm">Delete</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked disabled />
                          <Label className="text-sm">Audit Access</Label>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">Payroll Manager</span>
                        </div>
                        <Badge>3 Users</Badge>
                      </div>
                      <div className="grid gap-2 grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label className="text-sm">View All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label className="text-sm">Edit Components</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch />
                          <Label className="text-sm">Delete</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label className="text-sm">Test & Preview</Label>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-500" />
                          <span className="font-medium">HR Team</span>
                        </div>
                        <Badge>12 Users</Badge>
                      </div>
                      <div className="grid gap-2 grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label className="text-sm">View Components</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch />
                          <Label className="text-sm">Edit Limited</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch />
                          <Label className="text-sm">Delete</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label className="text-sm">Test & Preview</Label>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Read-Only Users</span>
                        </div>
                        <Badge>25 Users</Badge>
                      </div>
                      <div className="grid gap-2 grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label className="text-sm">View Components</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch />
                          <Label className="text-sm">Edit</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch />
                          <Label className="text-sm">Delete</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch />
                          <Label className="text-sm">Test & Preview</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Lock} animation="glow" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Advanced security and compliance settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Approval Workflow
                        </span>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Require approval for component changes
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Change Notifications
                        </span>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Email notifications for all changes
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Data Encryption
                        </span>
                        <Switch defaultChecked disabled />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Encrypt sensitive payroll data
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Session Timeout
                        </span>
                        <Switch defaultChecked />
                      </div>
                      <div className="mt-2">
                        <Select defaultValue="30">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Multi-Factor Auth
                        </span>
                        <Switch />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Require MFA for sensitive operations
                      </p>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Shield className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <ComponentConfigDialog />
        <PreviewTestDialog />
      </div>
    </MainLayout>
  );
}
