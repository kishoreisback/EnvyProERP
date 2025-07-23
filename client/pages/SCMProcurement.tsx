import { useState } from "react";
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
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  ShoppingCart,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Download,
  Eye,
  Search,
  Filter,
  Edit,
  Trash2,
  FileText,
  Upload,
  Send,
  User,
  Building2,
  Package,
  TrendingUp,
  XCircle,
  RefreshCw,
  ArrowRight,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import { MainLayout } from "../components/layout/MainLayout";

// Mock data for suppliers
const mockSuppliers = [
  {
    id: "SUP001",
    name: "TechCorp Solutions",
    category: "Technology",
    rating: 4.8,
  },
  {
    id: "SUP002",
    name: "BuildMat Industries",
    category: "Construction",
    rating: 4.5,
  },
  {
    id: "SUP003",
    name: "SafetyFirst Equipment",
    category: "Safety",
    rating: 4.9,
  },
  {
    id: "SUP004",
    name: "GreenEnergy Components",
    category: "Renewable Energy",
    rating: 4.2,
  },
  {
    id: "SUP005",
    name: "OfficeMax Supplies",
    category: "Office Supplies",
    rating: 4.1,
  },
];

// Mock procurement categories
const procurementCategories = [
  "Construction Materials",
  "Safety Equipment",
  "Technology Services",
  "Office Supplies",
  "Renewable Energy",
  "Manufacturing Equipment",
  "Maintenance Supplies",
  "Transportation",
];

// Mock procurement data with enhanced fields
const mockProcurementData = [
  {
    id: "PO001",
    poNumber: "PO-2024-001",
    title: "Construction Materials - Q1 2024",
    description:
      "Procurement of construction materials for Q1 projects including cement, steel, and concrete",
    supplier: "BuildMat Industries",
    supplierId: "SUP002",
    requestor: "John Smith",
    department: "Construction",
    totalAmount: 125000,
    status: "approved",
    priority: "high",
    requestDate: "2024-01-15",
    approvalDate: "2024-01-20",
    deliveryDate: "2024-03-15",
    progress: 75,
    category: "Construction Materials",
    approver: "Sarah Johnson",
    budgetCode: "CONST-Q1-2024",
    items: [
      {
        id: 1,
        name: "Portland Cement",
        quantity: 100,
        unit: "bags",
        unitPrice: 25,
        total: 2500,
      },
      {
        id: 2,
        name: "Steel Rebar",
        quantity: 50,
        unit: "tons",
        unitPrice: 800,
        total: 40000,
      },
      {
        id: 3,
        name: "Concrete Mix",
        quantity: 200,
        unit: "cubic yards",
        unitPrice: 120,
        total: 24000,
      },
    ],
    documents: ["technical_specs.pdf", "vendor_quote.pdf", "approval_form.pdf"],
    notes: "Critical for Q1 project timeline. Expedited delivery required.",
  },
  {
    id: "PO002",
    poNumber: "PO-2024-002",
    title: "Safety Equipment Procurement",
    description:
      "Annual safety equipment procurement for all construction sites",
    supplier: "SafetyFirst Equipment",
    supplierId: "SUP003",
    requestor: "Mike Wilson",
    department: "Safety",
    totalAmount: 45000,
    status: "pending_approval",
    priority: "medium",
    requestDate: "2024-01-25",
    deliveryDate: "2024-02-28",
    progress: 30,
    category: "Safety Equipment",
    budgetCode: "SAFETY-2024",
    items: [
      {
        id: 1,
        name: "Hard Hats",
        quantity: 200,
        unit: "pieces",
        unitPrice: 25,
        total: 5000,
      },
      {
        id: 2,
        name: "Safety Vests",
        quantity: 150,
        unit: "pieces",
        unitPrice: 20,
        total: 3000,
      },
      {
        id: 3,
        name: "Safety Boots",
        quantity: 100,
        unit: "pairs",
        unitPrice: 80,
        total: 8000,
      },
    ],
    documents: ["safety_requirements.pdf", "compliance_cert.pdf"],
    notes: "Ensure all items meet OSHA standards.",
  },
  {
    id: "PO003",
    poNumber: "PO-2024-003",
    title: "IT Equipment Upgrade",
    description:
      "Quarterly IT equipment procurement including laptops and monitors",
    supplier: "TechCorp Solutions",
    supplierId: "SUP001",
    requestor: "Lisa Chen",
    department: "IT",
    totalAmount: 78000,
    status: "draft",
    priority: "low",
    requestDate: "2024-02-01",
    deliveryDate: "2024-03-01",
    progress: 10,
    category: "Technology Services",
    budgetCode: "IT-Q1-2024",
    items: [
      {
        id: 1,
        name: "Business Laptops",
        quantity: 25,
        unit: "pieces",
        unitPrice: 1200,
        total: 30000,
      },
      {
        id: 2,
        name: '27" Monitors',
        quantity: 30,
        unit: "pieces",
        unitPrice: 300,
        total: 9000,
      },
      {
        id: 3,
        name: "Docking Stations",
        quantity: 25,
        unit: "pieces",
        unitPrice: 150,
        total: 3750,
      },
    ],
    documents: ["tech_specs.pdf"],
    notes: "Standard corporate laptop configuration required.",
  },
];

const SCMProcurement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedPO, setSelectedPO] = useState<any>(null);
  const [isNewPOOpen, setIsNewPOOpen] = useState(false);
  const [isEditPOOpen, setIsEditPOOpen] = useState(false);
  const [editingPO, setEditingPO] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);

  // New PO form state
  const [newPO, setNewPO] = useState({
    title: "",
    description: "",
    category: "",
    supplier: "",
    requestor: "",
    department: "",
    priority: "medium",
    deliveryDate: "",
    budgetCode: "",
    notes: "",
    items: [
      { id: 1, name: "", quantity: 1, unit: "pieces", unitPrice: 0, total: 0 },
    ],
  });

  const filteredPOs = mockProcurementData.filter((po) => {
    const matchesSearch =
      searchTerm === "" ||
      po.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || po.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || po.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            <Edit className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        );
      case "pending_approval":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending Approval
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <RefreshCw className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <Package className="h-3 w-3 mr-1" />
            Delivered
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status || "Unknown"}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>;
      case "low":
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return <Badge variant="outline">{priority || "Unknown"}</Badge>;
    }
  };

  const procurementStats = {
    total: mockProcurementData?.length || 0,
    totalValue:
      mockProcurementData?.reduce(
        (sum, po) => sum + (po?.totalAmount || 0),
        0,
      ) || 0,
    approved:
      mockProcurementData?.filter((po) => po?.status === "approved")?.length ||
      0,
    pending:
      mockProcurementData?.filter((po) => po?.status === "pending_approval")
        ?.length || 0,
    draft:
      mockProcurementData?.filter((po) => po?.status === "draft")?.length || 0,
  };

  const addItem = () => {
    const newItem = {
      id: newPO.items.length + 1,
      name: "",
      quantity: 1,
      unit: "pieces",
      unitPrice: 0,
      total: 0,
    };
    setNewPO((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const removeItem = (id: number) => {
    if (newPO.items.length > 1) {
      setNewPO((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));
    }
  };

  const updateItem = (id: number, field: string, value: any) => {
    setNewPO((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      }),
    }));
  };

  const getTotalAmount = () => {
    return newPO.items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleCreatePO = () => {
    // Simulate PO creation
    const poNumber = `PO-2024-${String(mockProcurementData.length + 1).padStart(3, "0")}`;

    setIsNewPOOpen(false);
    setCurrentStep(1);
    setNewPO({
      title: "",
      description: "",
      category: "",
      supplier: "",
      requestor: "",
      department: "",
      priority: "medium",
      deliveryDate: "",
      budgetCode: "",
      notes: "",
      items: [
        {
          id: 1,
          name: "",
          quantity: 1,
          unit: "pieces",
          unitPrice: 0,
          total: 0,
        },
      ],
    });

    // Show success notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50";
    notification.innerHTML = `✅ Purchase Order ${poNumber} created successfully!`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const stepTitles = [
    "Basic Information",
    "Supplier Selection",
    "Items & Pricing",
    "Budget & Approval",
    "Review & Submit",
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Procurement Management</h1>
            <p className="text-muted-foreground">
              Manage procurement processes and purchase orders
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsNewPOOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Purchase Order
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Orders
                  </p>
                  <AnimatedCounter
                    value={procurementStats.total}
                    className="text-2xl font-bold"
                  />
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Value
                  </p>
                  <AnimatedCounter
                    value={procurementStats.totalValue}
                    prefix="$"
                    className="text-2xl font-bold text-green-600"
                  />
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Approved
                  </p>
                  <AnimatedCounter
                    value={procurementStats.approved}
                    className="text-2xl font-bold text-green-600"
                  />
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending
                  </p>
                  <AnimatedCounter
                    value={procurementStats.pending}
                    className="text-2xl font-bold text-yellow-600"
                  />
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Drafts
                  </p>
                  <AnimatedCounter
                    value={procurementStats.draft}
                    className="text-2xl font-bold text-gray-600"
                  />
                </div>
                <Edit className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search purchase orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending_approval">
                    Pending Approval
                  </SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Purchase Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase Orders ({filteredPOs.length})</CardTitle>
            <CardDescription>
              Manage and track all purchase orders throughout their lifecycle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPOs && filteredPOs.length > 0 ? (
                  filteredPOs.map((po) => (
                    <TableRow key={po?.id || Math.random()}>
                      <TableCell className="font-medium">
                        {po?.poNumber || "N/A"}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {po?.title || "No Title"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {po?.requestor || "Unknown"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{po?.supplier || "No Supplier"}</TableCell>
                      <TableCell>
                        ${(po?.totalAmount || 0).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(po?.status || "unknown")}
                      </TableCell>
                      <TableCell>
                        {getPriorityBadge(po?.priority || "medium")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {po?.deliveryDate || "Not Set"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={po?.progress || 0}
                            className="w-16 h-2"
                          />
                          <span className="text-sm font-medium">
                            {po?.progress || 0}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPO(po)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingPO(po);
                              setIsEditPOOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No purchase orders found. Click "New Purchase Order" to
                      create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Purchase Order Details Modal */}
        <Dialog open={!!selectedPO} onOpenChange={() => setSelectedPO(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedPO && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {selectedPO.poNumber} - {selectedPO.title}
                  </DialogTitle>
                  <DialogDescription>
                    Purchase order details and tracking information
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="items">Items</TabsTrigger>
                    <TabsTrigger value="tracking">Tracking</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Basic Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid gap-2 md:grid-cols-2">
                            <div>
                              <Label>PO Number</Label>
                              <p className="font-medium">
                                {selectedPO.poNumber}
                              </p>
                            </div>
                            <div>
                              <Label>Status</Label>
                              <div className="mt-1">
                                {getStatusBadge(selectedPO.status)}
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <p className="text-sm">{selectedPO.description}</p>
                          </div>
                          <div className="grid gap-2 md:grid-cols-2">
                            <div>
                              <Label>Category</Label>
                              <p className="text-sm">{selectedPO.category}</p>
                            </div>
                            <div>
                              <Label>Priority</Label>
                              <div className="mt-1">
                                {getPriorityBadge(selectedPO.priority)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Financial Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span>Total Amount:</span>
                            <span className="font-medium text-lg">
                              ${selectedPO.totalAmount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Budget Code:</span>
                            <span className="font-medium">
                              {selectedPO.budgetCode}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Department:</span>
                            <span className="font-medium">
                              {selectedPO.department}
                            </span>
                          </div>
                          {selectedPO.approver && (
                            <div className="flex justify-between">
                              <span>Approved By:</span>
                              <span className="font-medium">
                                {selectedPO.approver}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Supplier Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid gap-4 md:grid-cols-3">
                          <div>
                            <Label>Supplier</Label>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">
                                {selectedPO.supplier}
                              </span>
                            </div>
                          </div>
                          <div>
                            <Label>Requestor</Label>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">
                                {selectedPO.requestor}
                              </span>
                            </div>
                          </div>
                          <div>
                            <Label>Delivery Date</Label>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">
                                {selectedPO.deliveryDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        {selectedPO.notes && (
                          <div>
                            <Label>Notes</Label>
                            <p className="text-sm bg-gray-50 p-2 rounded">
                              {selectedPO.notes}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="items" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Order Items</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item Name</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Unit</TableHead>
                              <TableHead>Unit Price</TableHead>
                              <TableHead>Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedPO.items?.map((item: any) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">
                                  {item.name}
                                </TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell>
                                  ${item.unitPrice.toLocaleString()}
                                </TableCell>
                                <TableCell className="font-medium">
                                  ${item.total.toLocaleString()}
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow className="border-t-2">
                              <TableCell colSpan={4} className="font-medium">
                                Total Amount:
                              </TableCell>
                              <TableCell className="font-bold text-lg">
                                ${selectedPO.totalAmount.toLocaleString()}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tracking" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Order Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span>Overall Progress</span>
                              <span className="font-medium">
                                {selectedPO.progress}%
                              </span>
                            </div>
                            <Progress
                              value={selectedPO.progress}
                              className="h-3"
                            />
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 border rounded">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <div>
                                <div className="font-medium">Order Created</div>
                                <div className="text-sm text-muted-foreground">
                                  {selectedPO.requestDate}
                                </div>
                              </div>
                            </div>

                            {selectedPO.approvalDate && (
                              <div className="flex items-center gap-3 p-3 border rounded">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <div>
                                  <div className="font-medium">
                                    Order Approved
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {selectedPO.approvalDate}
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-3 p-3 border rounded">
                              <Clock className="h-5 w-5 text-yellow-600" />
                              <div>
                                <div className="font-medium">In Progress</div>
                                <div className="text-sm text-muted-foreground">
                                  Order processing with supplier
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 border rounded opacity-50">
                              <Package className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="font-medium">Delivery</div>
                                <div className="text-sm text-muted-foreground">
                                  Expected: {selectedPO.deliveryDate}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Related Documents
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedPO.documents?.map(
                            (doc: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 border rounded"
                              >
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span>{doc}</span>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ),
                          )}

                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Upload additional documents
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2"
                            >
                              Browse Files
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* New Purchase Order Modal */}
        <Dialog open={isNewPOOpen} onOpenChange={setIsNewPOOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Purchase Order
              </DialogTitle>
              <DialogDescription>
                Step {currentStep} of {stepTitles.length}:{" "}
                {stepTitles[currentStep - 1]}
              </DialogDescription>
            </DialogHeader>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-6">
              {stepTitles.map((title, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index + 1 < currentStep
                        ? "bg-green-500 text-white"
                        : index + 1 === currentStep
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1 < currentStep ? "✓" : index + 1}
                  </div>
                  {index < stepTitles.length - 1 && (
                    <div
                      className={`w-16 h-1 ${index + 1 < currentStep ? "bg-green-500" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="title">Purchase Order Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter PO title"
                        value={newPO.title}
                        onChange={(e) =>
                          setNewPO((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newPO.category}
                        onValueChange={(value) =>
                          setNewPO((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {procurementCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of the procurement request"
                      value={newPO.description}
                      onChange={(e) =>
                        setNewPO((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="requestor">Requestor</Label>
                      <Input
                        id="requestor"
                        placeholder="Your name"
                        value={newPO.requestor}
                        onChange={(e) =>
                          setNewPO((prev) => ({
                            ...prev,
                            requestor: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={newPO.department}
                        onValueChange={(value) =>
                          setNewPO((prev) => ({ ...prev, department: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Construction">
                            Construction
                          </SelectItem>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Safety">Safety</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newPO.priority}
                        onValueChange={(value) =>
                          setNewPO((prev) => ({ ...prev, priority: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">
                            Medium Priority
                          </SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Supplier Selection */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>Select Supplier</Label>
                    <div className="grid gap-3 mt-2">
                      {mockSuppliers.map((supplier) => (
                        <div
                          key={supplier.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            newPO.supplier === supplier.name
                              ? "border-blue-500 bg-blue-50"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            setNewPO((prev) => ({
                              ...prev,
                              supplier: supplier.name,
                            }))
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{supplier.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {supplier.category}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">
                                  {supplier.rating}
                                </span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-3 h-3 ${i < Math.floor(supplier.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                    >
                                      ★
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="deliveryDate">
                        Required Delivery Date
                      </Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={newPO.deliveryDate}
                        onChange={(e) =>
                          setNewPO((prev) => ({
                            ...prev,
                            deliveryDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="budgetCode">Budget Code</Label>
                      <Input
                        id="budgetCode"
                        placeholder="e.g., CONST-Q1-2024"
                        value={newPO.budgetCode}
                        onChange={(e) =>
                          setNewPO((prev) => ({
                            ...prev,
                            budgetCode: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Items & Pricing */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Order Items</Label>
                    <Button size="sm" onClick={addItem}>
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add Item
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {newPO.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="grid gap-3 md:grid-cols-12 items-end p-3 border rounded"
                      >
                        <div className="md:col-span-4">
                          <Label>Item Name</Label>
                          <Input
                            placeholder="Enter item name"
                            value={item.name}
                            onChange={(e) =>
                              updateItem(item.id, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Quantity</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "quantity",
                                parseInt(e.target.value) || 1,
                              )
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Unit</Label>
                          <Select
                            value={item.unit}
                            onValueChange={(value) =>
                              updateItem(item.id, "unit", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pieces">Pieces</SelectItem>
                              <SelectItem value="kg">Kg</SelectItem>
                              <SelectItem value="tons">Tons</SelectItem>
                              <SelectItem value="meters">Meters</SelectItem>
                              <SelectItem value="liters">Liters</SelectItem>
                              <SelectItem value="boxes">Boxes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2">
                          <Label>Unit Price</Label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "unitPrice",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <div className="md:col-span-1">
                          <Label>Total</Label>
                          <div className="font-medium">
                            ${item.total.toLocaleString()}
                          </div>
                        </div>
                        <div className="md:col-span-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                            disabled={newPO.items.length === 1}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-end">
                      <div className="text-lg font-bold">
                        Total Amount: ${getTotalAmount().toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Budget & Approval */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Budget Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Budget Code</Label>
                          <p className="font-medium">
                            {newPO.budgetCode || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <Label>Department</Label>
                          <p className="font-medium">
                            {newPO.department || "Not specified"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Label>Total Amount</Label>
                        <p className="text-2xl font-bold text-green-600">
                          ${getTotalAmount().toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Approval Workflow
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 border rounded">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-medium">
                              Department Manager Approval
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Required for amounts &gt; $1,000
                            </div>
                          </div>
                        </div>
                        {getTotalAmount() > 10000 && (
                          <div className="flex items-center gap-3 p-3 border rounded">
                            <Clock className="h-5 w-5 text-yellow-600" />
                            <div>
                              <div className="font-medium">
                                Finance Director Approval
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Required for amounts &gt; $10,000
                              </div>
                            </div>
                          </div>
                        )}
                        {getTotalAmount() > 50000 && (
                          <div className="flex items-center gap-3 p-3 border rounded">
                            <Clock className="h-5 w-5 text-yellow-600" />
                            <div>
                              <div className="font-medium">CEO Approval</div>
                              <div className="text-sm text-muted-foreground">
                                Required for amounts &gt; $50,000
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional notes or special requirements"
                      value={newPO.notes}
                      onChange={(e) =>
                        setNewPO((prev) => ({ ...prev, notes: e.target.value }))
                      }
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Review & Submit */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Purchase Order Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Title</Label>
                          <p className="font-medium">{newPO.title}</p>
                        </div>
                        <div>
                          <Label>Category</Label>
                          <p className="font-medium">{newPO.category}</p>
                        </div>
                        <div>
                          <Label>Supplier</Label>
                          <p className="font-medium">{newPO.supplier}</p>
                        </div>
                        <div>
                          <Label>Total Amount</Label>
                          <p className="text-xl font-bold text-green-600">
                            ${getTotalAmount().toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label>Description</Label>
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {newPO.description}
                        </p>
                      </div>

                      <div>
                        <Label>Items ({newPO.items.length})</Label>
                        <div className="border rounded mt-2">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead>Unit Price</TableHead>
                                <TableHead>Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {newPO.items.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>
                                    {item.quantity} {item.unit}
                                  </TableCell>
                                  <TableCell>${item.unitPrice}</TableCell>
                                  <TableCell>
                                    ${item.total.toLocaleString()}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsNewPOOpen(false)}>
                  Cancel
                </Button>
                {currentStep < stepTitles.length ? (
                  <Button
                    onClick={() =>
                      setCurrentStep(
                        Math.min(stepTitles.length, currentStep + 1),
                      )
                    }
                    disabled={
                      (currentStep === 1 &&
                        (!newPO.title || !newPO.category)) ||
                      (currentStep === 2 && !newPO.supplier) ||
                      (currentStep === 3 &&
                        newPO.items.some(
                          (item) => !item.name || item.quantity <= 0,
                        ))
                    }
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button onClick={handleCreatePO}>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Purchase Order
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Purchase Order Modal */}
        <Dialog open={isEditPOOpen} onOpenChange={setIsEditPOOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {editingPO && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Edit Purchase Order - {editingPO.poNumber}
                  </DialogTitle>
                  <DialogDescription>
                    Modify purchase order details and update requirements
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="items">Items</TabsTrigger>
                    <TabsTrigger value="approval">Approval</TabsTrigger>
                    <TabsTrigger value="notes">Notes & Documents</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="editTitle">Purchase Order Title</Label>
                        <Input
                          id="editTitle"
                          defaultValue={editingPO.title}
                          placeholder="Enter PO title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="editCategory">Category</Label>
                        <Select defaultValue={editingPO.category}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {procurementCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="editDescription">Description</Label>
                      <Textarea
                        id="editDescription"
                        defaultValue={editingPO.description}
                        placeholder="Detailed description of the procurement request"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <Label htmlFor="editRequestor">Requestor</Label>
                        <Input
                          id="editRequestor"
                          defaultValue={editingPO.requestor}
                          placeholder="Requestor name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="editDepartment">Department</Label>
                        <Select defaultValue={editingPO.department}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Construction">
                              Construction
                            </SelectItem>
                            <SelectItem value="IT">IT</SelectItem>
                            <SelectItem value="Safety">Safety</SelectItem>
                            <SelectItem value="Operations">
                              Operations
                            </SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="editPriority">Priority</Label>
                        <Select defaultValue={editingPO.priority}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low Priority</SelectItem>
                            <SelectItem value="medium">
                              Medium Priority
                            </SelectItem>
                            <SelectItem value="high">High Priority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="editSupplier">Supplier</Label>
                        <Select defaultValue={editingPO.supplier}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {mockSuppliers.map((supplier) => (
                              <SelectItem
                                key={supplier.id}
                                value={supplier.name}
                              >
                                {supplier.name} - {supplier.category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="editDeliveryDate">Delivery Date</Label>
                        <Input
                          id="editDeliveryDate"
                          type="date"
                          defaultValue={editingPO.deliveryDate}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="editBudgetCode">Budget Code</Label>
                      <Input
                        id="editBudgetCode"
                        defaultValue={editingPO.budgetCode}
                        placeholder="e.g., CONST-Q1-2024"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="items" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Order Items</Label>
                      <Button
                        size="sm"
                        onClick={() => {
                          // Add new item logic
                          const notification = document.createElement("div");
                          notification.className =
                            "fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-md shadow-lg z-50";
                          notification.innerHTML = "➕ New item added to order";
                          document.body.appendChild(notification);
                          setTimeout(() => notification.remove(), 2000);
                        }}
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add Item
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {editingPO.items?.map((item: any, index: number) => (
                        <div
                          key={item.id}
                          className="grid gap-3 md:grid-cols-12 items-end p-3 border rounded"
                        >
                          <div className="md:col-span-4">
                            <Label>Item Name</Label>
                            <Input
                              defaultValue={item.name}
                              placeholder="Enter item name"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Quantity</Label>
                            <Input
                              type="number"
                              min="1"
                              defaultValue={item.quantity}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Unit</Label>
                            <Select defaultValue={item.unit}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pieces">Pieces</SelectItem>
                                <SelectItem value="kg">Kg</SelectItem>
                                <SelectItem value="tons">Tons</SelectItem>
                                <SelectItem value="meters">Meters</SelectItem>
                                <SelectItem value="liters">Liters</SelectItem>
                                <SelectItem value="boxes">Boxes</SelectItem>
                                <SelectItem value="bags">Bags</SelectItem>
                                <SelectItem value="cubic yards">
                                  Cubic Yards
                                </SelectItem>
                                <SelectItem value="pairs">Pairs</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="md:col-span-2">
                            <Label>Unit Price</Label>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              defaultValue={item.unitPrice}
                            />
                          </div>
                          <div className="md:col-span-1">
                            <Label>Total</Label>
                            <div className="font-medium">
                              ${item.total.toLocaleString()}
                            </div>
                          </div>
                          <div className="md:col-span-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const notification =
                                  document.createElement("div");
                                notification.className =
                                  "fixed top-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg z-50";
                                notification.innerHTML =
                                  "🗑️ Item removed from order";
                                document.body.appendChild(notification);
                                setTimeout(() => notification.remove(), 2000);
                              }}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-end">
                        <div className="text-lg font-bold">
                          Total Amount: $
                          {editingPO.totalAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="approval" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Current Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Status:</span>
                          <div>{getStatusBadge(editingPO.status)}</div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>Priority:</span>
                          <div>{getPriorityBadge(editingPO.priority)}</div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>Progress:</span>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={editingPO.progress}
                              className="w-32 h-2"
                            />
                            <span className="font-medium">
                              {editingPO.progress}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Update Status</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="newStatus">Change Status</Label>
                          <Select defaultValue={editingPO.status}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="pending_approval">
                                Pending Approval
                              </SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="in_progress">
                                In Progress
                              </SelectItem>
                              <SelectItem value="delivered">
                                Delivered
                              </SelectItem>
                              <SelectItem value="cancelled">
                                Cancelled
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="statusReason">
                            Reason for Status Change
                          </Label>
                          <Textarea
                            id="statusReason"
                            placeholder="Enter reason for status change..."
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              const notification =
                                document.createElement("div");
                              notification.className =
                                "fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50";
                              notification.innerHTML =
                                "✅ Status updated successfully";
                              document.body.appendChild(notification);
                              setTimeout(() => notification.remove(), 3000);
                            }}
                          >
                            Update Status
                          </Button>

                          {editingPO.status === "draft" && (
                            <Button
                              variant="outline"
                              onClick={() => {
                                const notification =
                                  document.createElement("div");
                                notification.className =
                                  "fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-md shadow-lg z-50";
                                notification.innerHTML =
                                  "📤 Purchase order submitted for approval";
                                document.body.appendChild(notification);
                                setTimeout(() => notification.remove(), 3000);
                              }}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Submit for Approval
                            </Button>
                          )}

                          {editingPO.status === "approved" && (
                            <Button
                              variant="outline"
                              onClick={() => {
                                const notification =
                                  document.createElement("div");
                                notification.className =
                                  "fixed top-4 right-4 bg-purple-500 text-white p-4 rounded-md shadow-lg z-50";
                                notification.innerHTML =
                                  "🚀 Purchase order sent to supplier";
                                document.body.appendChild(notification);
                                setTimeout(() => notification.remove(), 3000);
                              }}
                            >
                              <ArrowRight className="h-4 w-4 mr-2" />
                              Send to Supplier
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notes" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Notes & Comments
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="editNotes">
                            Purchase Order Notes
                          </Label>
                          <Textarea
                            id="editNotes"
                            defaultValue={editingPO.notes}
                            placeholder="Any additional notes or special requirements"
                          />
                        </div>

                        <div>
                          <Label>Internal Comments</Label>
                          <div className="space-y-2 mt-2">
                            <div className="p-3 border rounded bg-gray-50">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium">John Smith</span>
                                <span className="text-xs text-muted-foreground">
                                  2 hours ago
                                </span>
                              </div>
                              <p className="text-sm">
                                Updated delivery timeline due to supplier
                                constraints.
                              </p>
                            </div>
                            <div className="p-3 border rounded bg-gray-50">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium">
                                  Sarah Johnson
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  1 day ago
                                </span>
                              </div>
                              <p className="text-sm">
                                Approved budget allocation for this purchase
                                order.
                              </p>
                            </div>
                          </div>

                          <div className="mt-3">
                            <Textarea placeholder="Add a new comment..." />
                            <Button size="sm" className="mt-2">
                              Add Comment
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Documents</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {editingPO.documents?.map(
                            (doc: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 border rounded"
                              >
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span>{doc}</span>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ),
                          )}

                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Upload additional documents
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2"
                            >
                              Browse Files
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditPOOpen(false);
                        setEditingPO(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setIsEditPOOpen(false);
                        setEditingPO(null);
                        const notification = document.createElement("div");
                        notification.className =
                          "fixed top-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg z-50";
                        notification.innerHTML =
                          "🗑️ Purchase order deleted successfully";
                        document.body.appendChild(notification);
                        setTimeout(() => notification.remove(), 3000);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete PO
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const notification = document.createElement("div");
                        notification.className =
                          "fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-md shadow-lg z-50";
                        notification.innerHTML = "💾 Changes saved as draft";
                        document.body.appendChild(notification);
                        setTimeout(() => notification.remove(), 3000);
                      }}
                    >
                      Save Draft
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditPOOpen(false);
                        setEditingPO(null);
                        const notification = document.createElement("div");
                        notification.className =
                          "fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50";
                        notification.innerHTML =
                          "✅ Purchase order updated successfully!";
                        document.body.appendChild(notification);
                        setTimeout(() => notification.remove(), 3000);
                      }}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Update Purchase Order
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default SCMProcurement;
