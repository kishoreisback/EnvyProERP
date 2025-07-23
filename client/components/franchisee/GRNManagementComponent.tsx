import React, { useState, useRef } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  PackageCheck,
  Plus,
  Search,
  Filter,
  Camera,
  Upload,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Save,
  X,
  FileText,
  Download,
  Share2,
  Smartphone,
  ImageIcon,
  FileImage,
  Signature,
} from "lucide-react";
import { format } from "date-fns";
import { useAuditLogger } from "../../hooks/useAuditLogger";
import {
  MobileGRN,
  MobileGRNItem,
  QualityCheck,
  GRNAttachment,
} from "./self-service-types";

interface GRNManagementComponentProps {
  franchiseeId: string;
  isCompact?: boolean;
}

export function GRNManagementComponent({
  franchiseeId,
  isCompact = false,
}: GRNManagementComponentProps) {
  const { logAudit } = useAuditLogger("grn_management");
  const [activeTab, setActiveTab] = useState("create");
  const [grnList, setGrnList] = useState<MobileGRN[]>([]);
  const [selectedGRN, setSelectedGRN] = useState<MobileGRN | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Form states for creating new GRN
  const [grnForm, setGrnForm] = useState({
    poNumber: "",
    supplierName: "",
    receivedDate: new Date().toISOString().split("T")[0],
    receivedBy: "",
    notes: "",
    items: [] as MobileGRNItem[],
    qualityChecks: [] as QualityCheck[],
    attachments: [] as GRNAttachment[],
  });

  // Mock data for demonstration
  const mockGRNs: MobileGRN[] = [
    {
      id: "grn_001",
      grnNumber: "GRN-2024-00156",
      poId: "po_001",
      poNumber: "PO-2024-001200",
      supplierName: "Steel Industries Pvt Ltd",
      receivedDate: "2024-01-15T14:30:00Z",
      receivedBy: "Rajesh Kumar",
      status: "submitted",
      receivedItems: [
        {
          itemId: "item_001",
          productName: "TMT Bars - 12mm",
          orderedQuantity: 100,
          receivedQuantity: 98,
          acceptedQuantity: 95,
          rejectedQuantity: 3,
          unitPrice: 65,
          condition: "good",
          notes: "3 bars found damaged during inspection",
          photos: ["/grn/photos/item_001_1.jpg"],
        },
        {
          itemId: "item_002",
          productName: "TMT Bars - 16mm",
          orderedQuantity: 50,
          receivedQuantity: 50,
          acceptedQuantity: 50,
          rejectedQuantity: 0,
          unitPrice: 75,
          condition: "good",
          notes: "All items in good condition",
          photos: [],
        },
      ],
      qualityChecks: [
        {
          id: "qc_001",
          checkType: "visual",
          parameter: "Surface condition",
          expectedValue: "No rust, clean surface",
          actualValue: "Good condition, minor surface marks",
          status: "pass",
          notes: "Minor cosmetic marks acceptable",
          photos: ["/grn/quality/qc_001.jpg"],
        },
        {
          id: "qc_002",
          checkType: "measurement",
          parameter: "Length",
          expectedValue: "12000mm",
          actualValue: "12005mm",
          status: "pass",
          notes: "Within tolerance",
        },
      ],
      attachments: [
        {
          id: "att_001",
          type: "photo",
          fileName: "delivery_truck.jpg",
          serverUrl: "/grn/attachments/delivery_truck.jpg",
          uploadStatus: "uploaded",
          capturedAt: "2024-01-15T14:30:00Z",
        },
        {
          id: "att_002",
          type: "signature",
          fileName: "receiver_signature.png",
          serverUrl: "/grn/attachments/signature.png",
          uploadStatus: "uploaded",
          capturedAt: "2024-01-15T14:45:00Z",
        },
      ],
      totalValue: 6370,
      discrepancyValue: 195,
      location: {
        latitude: 19.076,
        longitude: 72.8777,
        address: "Mumbai Central Warehouse, Mumbai, MH",
      },
      timestamp: "2024-01-15T14:30:00Z",
      isOffline: false,
    },
    {
      id: "grn_002",
      grnNumber: "GRN-2024-00157",
      poId: "po_002",
      poNumber: "PO-2024-001201",
      supplierName: "Cement Works Ltd",
      receivedDate: "2024-01-16T10:15:00Z",
      receivedBy: "Priya Singh",
      status: "draft",
      receivedItems: [
        {
          itemId: "item_003",
          productName: "Portland Cement - 50kg",
          orderedQuantity: 200,
          receivedQuantity: 200,
          acceptedQuantity: 200,
          rejectedQuantity: 0,
          unitPrice: 450,
          condition: "good",
          notes: "All bags in excellent condition",
          photos: [],
        },
      ],
      qualityChecks: [],
      attachments: [],
      totalValue: 90000,
      discrepancyValue: 0,
      location: {
        latitude: 19.076,
        longitude: 72.8777,
        address: "Mumbai Central Warehouse, Mumbai, MH",
      },
      timestamp: "2024-01-16T10:15:00Z",
      isOffline: false,
    },
  ];

  React.useEffect(() => {
    setGrnList(mockGRNs);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "good":
        return "bg-green-100 text-green-800";
      case "damaged":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-orange-100 text-orange-800";
      case "defective":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getQualityStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "fail":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleCreateGRN = () => {
    const newGRN: MobileGRN = {
      id: `grn_${Date.now()}`,
      grnNumber: `GRN-2024-${String(grnList.length + 1).padStart(5, "0")}`,
      poId: `po_${Date.now()}`,
      poNumber: grnForm.poNumber,
      supplierName: grnForm.supplierName,
      receivedDate: new Date().toISOString(),
      receivedBy: grnForm.receivedBy,
      status: "draft",
      receivedItems: grnForm.items,
      qualityChecks: grnForm.qualityChecks,
      attachments: grnForm.attachments,
      totalValue: grnForm.items.reduce(
        (sum, item) => sum + item.acceptedQuantity * item.unitPrice,
        0,
      ),
      discrepancyValue: grnForm.items.reduce(
        (sum, item) => sum + item.rejectedQuantity * item.unitPrice,
        0,
      ),
      location: {
        address: "Current Location", // Would get from GPS
      },
      timestamp: new Date().toISOString(),
      isOffline: false,
    };

    setGrnList((prev) => [newGRN, ...prev]);
    setIsCreateModalOpen(false);

    logAudit({
      action: "grn.created",
      resource: `grn/${newGRN.grnNumber}`,
      resourceType: "grn",
      resourceId: newGRN.id,
      description: `Created GRN ${newGRN.grnNumber} for PO ${newGRN.poNumber}`,
    });

    // Reset form
    setGrnForm({
      poNumber: "",
      supplierName: "",
      receivedDate: new Date().toISOString().split("T")[0],
      receivedBy: "",
      notes: "",
      items: [],
      qualityChecks: [],
      attachments: [],
    });
  };

  const handleSubmitGRN = (grn: MobileGRN) => {
    setGrnList((prev) =>
      prev.map((g) => (g.id === grn.id ? { ...g, status: "submitted" } : g)),
    );

    logAudit({
      action: "grn.submitted",
      resource: `grn/${grn.grnNumber}`,
      resourceType: "grn",
      resourceId: grn.id,
      description: `Submitted GRN ${grn.grnNumber} for approval`,
    });
  };

  const handleDeleteGRN = (grnId: string) => {
    const grn = grnList.find((g) => g.id === grnId);
    setGrnList((prev) => prev.filter((g) => g.id !== grnId));
    setShowDeleteDialog(null);

    if (grn) {
      logAudit({
        action: "grn.deleted",
        resource: `grn/${grn.grnNumber}`,
        resourceType: "grn",
        resourceId: grn.id,
        description: `Deleted GRN ${grn.grnNumber}`,
      });
    }
  };

  const handleFileUpload = (
    file: File,
    type: "photo" | "document" | "signature",
  ) => {
    const newAttachment: GRNAttachment = {
      id: `att_${Date.now()}`,
      type,
      fileName: file.name,
      localUrl: URL.createObjectURL(file),
      uploadStatus: "pending",
      capturedAt: new Date().toISOString(),
    };

    setGrnForm((prev) => ({
      ...prev,
      attachments: [...prev.attachments, newAttachment],
    }));

    // Simulate upload
    setTimeout(() => {
      setGrnForm((prev) => ({
        ...prev,
        attachments: prev.attachments.map((att) =>
          att.id === newAttachment.id
            ? {
                ...att,
                uploadStatus: "uploaded",
                serverUrl: `/uploads/${file.name}`,
              }
            : att,
        ),
      }));
    }, 2000);
  };

  const filteredGRNs = grnList.filter((grn) => {
    const matchesSearch =
      searchQuery === "" ||
      grn.grnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grn.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grn.supplierName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || grn.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <PackageCheck className="h-5 w-5" />
            GRN Management
          </h2>
          <p className="text-muted-foreground">
            Manage goods receipt notes and quality inspections
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create GRN
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList
          className={`grid w-full ${isCompact ? "grid-cols-2" : "grid-cols-3"}`}
        >
          <TabsTrigger value="create">Quick Create</TabsTrigger>
          <TabsTrigger value="list">My GRNs</TabsTrigger>
          {!isCompact && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
        </TabsList>

        {/* Quick Create Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick GRN Creation</CardTitle>
              <CardDescription>
                Create a GRN quickly using your mobile device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="quick-po">PO Number</Label>
                  <Input
                    id="quick-po"
                    placeholder="Enter PO number"
                    value={grnForm.poNumber}
                    onChange={(e) =>
                      setGrnForm((prev) => ({
                        ...prev,
                        poNumber: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="quick-supplier">Supplier</Label>
                  <Input
                    id="quick-supplier"
                    placeholder="Supplier name"
                    value={grnForm.supplierName}
                    onChange={(e) =>
                      setGrnForm((prev) => ({
                        ...prev,
                        supplierName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="quick-receiver">Received By</Label>
                <Input
                  id="quick-receiver"
                  placeholder="Your name"
                  value={grnForm.receivedBy}
                  onChange={(e) =>
                    setGrnForm((prev) => ({
                      ...prev,
                      receivedBy: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex-1"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
              </div>

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, "photo");
                }}
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                multiple
                className="hidden"
                onChange={(e) => {
                  Array.from(e.target.files || []).forEach((file) => {
                    handleFileUpload(
                      file,
                      file.type.startsWith("image/") ? "photo" : "document",
                    );
                  });
                }}
              />

              {grnForm.attachments.length > 0 && (
                <div className="space-y-2">
                  <Label>Attachments</Label>
                  <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
                    {grnForm.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center gap-2 p-2 border rounded"
                      >
                        {attachment.type === "photo" ? (
                          <ImageIcon className="h-4 w-4" />
                        ) : attachment.type === "signature" ? (
                          <Signature className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                        <span className="text-xs truncate">
                          {attachment.fileName}
                        </span>
                        <Badge
                          variant={
                            attachment.uploadStatus === "uploaded"
                              ? "default"
                              : attachment.uploadStatus === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {attachment.uploadStatus}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={handleCreateGRN}
                disabled={
                  !grnForm.poNumber ||
                  !grnForm.supplierName ||
                  !grnForm.receivedBy
                }
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Create GRN
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GRN List Tab */}
        <TabsContent value="list" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search GRNs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* GRN Cards */}
          <div className="grid gap-4">
            {filteredGRNs.map((grn) => (
              <Card key={grn.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{grn.grnNumber}</h3>
                        <Badge className={getStatusColor(grn.status)}>
                          {grn.status}
                        </Badge>
                      </div>

                      <div className="grid gap-1 text-sm text-muted-foreground">
                        <div>PO: {grn.poNumber}</div>
                        <div>Supplier: {grn.supplierName}</div>
                        <div>
                          Received:{" "}
                          {format(new Date(grn.receivedDate), "MMM dd, yyyy")}
                        </div>
                        <div>Value: ₹{grn.totalValue.toLocaleString()}</div>
                        {grn.discrepancyValue > 0 && (
                          <div className="text-red-600">
                            Discrepancy: ₹
                            {grn.discrepancyValue.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedGRN(grn);
                          setIsViewModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {grn.status === "draft" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSubmitGRN(grn)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDeleteDialog(grn.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGRNs.length === 0 && (
            <div className="text-center py-8">
              <PackageCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">
                No GRNs found
              </h3>
              <p className="text-sm text-muted-foreground">
                Create your first GRN to get started
              </p>
            </div>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{grnList.length}</div>
                  <div className="text-sm text-muted-foreground">
                    Total GRNs
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {grnList.filter((g) => g.status === "approved").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Approved</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {grnList.filter((g) => g.status === "draft").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* View GRN Modal */}
      {selectedGRN && (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>GRN Details - {selectedGRN.grnNumber}</DialogTitle>
              <DialogDescription>
                Complete goods receipt note information
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">GRN Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">GRN Number:</span>{" "}
                      {selectedGRN.grnNumber}
                    </div>
                    <div>
                      <span className="font-medium">PO Number:</span>{" "}
                      {selectedGRN.poNumber}
                    </div>
                    <div>
                      <span className="font-medium">Supplier:</span>{" "}
                      {selectedGRN.supplierName}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <Badge
                        className={`ml-2 ${getStatusColor(selectedGRN.status)}`}
                      >
                        {selectedGRN.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Receipt Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Received Date:</span>{" "}
                      {format(new Date(selectedGRN.receivedDate), "PPp")}
                    </div>
                    <div>
                      <span className="font-medium">Received By:</span>{" "}
                      {selectedGRN.receivedBy}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>{" "}
                      {selectedGRN.location?.address}
                    </div>
                    <div>
                      <span className="font-medium">Total Value:</span> ₹
                      {selectedGRN.totalValue.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Received Items */}
              <div>
                <h4 className="font-medium mb-3">Received Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Ordered</TableHead>
                      <TableHead>Received</TableHead>
                      <TableHead>Accepted</TableHead>
                      <TableHead>Rejected</TableHead>
                      <TableHead>Condition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedGRN.receivedItems.map((item) => (
                      <TableRow key={item.itemId}>
                        <TableCell className="font-medium">
                          {item.productName}
                        </TableCell>
                        <TableCell>{item.orderedQuantity}</TableCell>
                        <TableCell>{item.receivedQuantity}</TableCell>
                        <TableCell>{item.acceptedQuantity}</TableCell>
                        <TableCell>{item.rejectedQuantity}</TableCell>
                        <TableCell>
                          <Badge className={getConditionColor(item.condition)}>
                            {item.condition}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Quality Checks */}
              {selectedGRN.qualityChecks.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Quality Checks</h4>
                  <div className="space-y-3">
                    {selectedGRN.qualityChecks.map((check) => (
                      <div key={check.id} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {getQualityStatusIcon(check.status)}
                          <span className="font-medium">{check.parameter}</span>
                          <Badge
                            variant={
                              check.status === "pass"
                                ? "default"
                                : check.status === "fail"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {check.status}
                          </Badge>
                        </div>
                        <div className="grid gap-2 text-sm">
                          <div>
                            <span className="font-medium">Expected:</span>{" "}
                            {check.expectedValue}
                          </div>
                          <div>
                            <span className="font-medium">Actual:</span>{" "}
                            {check.actualValue}
                          </div>
                          {check.notes && (
                            <div>
                              <span className="font-medium">Notes:</span>{" "}
                              {check.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedGRN.attachments.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Attachments</h4>
                  <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    {selectedGRN.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="p-3 border rounded-lg text-center"
                      >
                        {attachment.type === "photo" ? (
                          <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                        ) : attachment.type === "signature" ? (
                          <Signature className="h-8 w-8 mx-auto mb-2" />
                        ) : (
                          <FileText className="h-8 w-8 mx-auto mb-2" />
                        )}
                        <div className="text-xs font-medium">
                          {attachment.fileName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(
                            new Date(attachment.capturedAt),
                            "MMM dd, HH:mm",
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!showDeleteDialog}
        onOpenChange={() => setShowDeleteDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete GRN</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this GRN? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                showDeleteDialog && handleDeleteGRN(showDeleteDialog)
              }
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
