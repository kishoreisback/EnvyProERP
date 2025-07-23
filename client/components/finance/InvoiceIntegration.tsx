// Invoice Integration with existing PO, Delivery, and GRN modules
// This component manages the automatic invoice generation based on PO fulfillment

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Package,
  Truck,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  IndianRupee,
  ArrowRight,
  Eye,
  Download,
  Send,
  Plus,
  RefreshCw,
} from "lucide-react";

import {
  Invoice,
  POInvoiceMapping,
  DeliveryInvoiceMapping,
} from "./invoice-types";
import { PurchaseOrder } from "../franchisee/purchase-order-types";
import { DeliverySchedule } from "../franchisee/delivery-logistics-types";

interface InvoiceIntegrationProps {
  userType: "corporate" | "franchisee";
  tenantId: string;
  onInvoiceGenerated?: (invoice: Invoice) => void;
}

export function InvoiceIntegration({
  userType,
  tenantId,
  onInvoiceGenerated,
}: InvoiceIntegrationProps) {
  const [eligiblePOs, setEligiblePOs] = useState<PurchaseOrder[]>([]);
  const [recentDeliveries, setRecentDeliveries] = useState<DeliverySchedule[]>(
    [],
  );
  const [poMappings, setPOMappings] = useState<POInvoiceMapping[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  useEffect(() => {
    loadEligiblePOs();
    loadRecentDeliveries();
    loadPOMappings();
  }, [userType, tenantId]);

  const loadEligiblePOs = async () => {
    setIsLoading(true);
    // Simulate API call to get POs ready for invoicing
    setTimeout(() => {
      setEligiblePOs(getMockEligiblePOs());
      setIsLoading(false);
    }, 1000);
  };

  const loadRecentDeliveries = async () => {
    // Load recent deliveries that can be invoiced
    setTimeout(() => {
      setRecentDeliveries(getMockRecentDeliveries());
    }, 800);
  };

  const loadPOMappings = async () => {
    // Load existing PO to invoice mappings
    setTimeout(() => {
      setPOMappings(getMockPOMappings());
    }, 600);
  };

  const handleGenerateInvoice = (po: PurchaseOrder, partial = false) => {
    setSelectedPO(po);
    setIsGenerateModalOpen(true);
  };

  const processInvoiceGeneration = async () => {
    if (!selectedPO) return;

    // Simulate invoice generation
    const newInvoice = generateInvoiceFromPO(selectedPO);

    // Update PO mapping
    const updatedMapping: POInvoiceMapping = {
      poId: selectedPO.id,
      invoiceIds: [newInvoice.id],
      fullyInvoiced: true,
      partialInvoices: [],
      pendingAmount: 0,
      invoicedAmount: selectedPO.grandTotal,
    };

    setPOMappings((prev) => [...prev, updatedMapping]);

    if (onInvoiceGenerated) {
      onInvoiceGenerated(newInvoice);
    }

    setIsGenerateModalOpen(false);
    alert(`Invoice ${newInvoice.invoiceNumber} generated successfully!`);
  };

  const getDeliveryStatus = (poId: string) => {
    const deliveries = recentDeliveries.filter((d) => d.poId === poId);
    const completed = deliveries.filter(
      (d) => d.currentStatus === "delivered",
    ).length;
    return {
      total: deliveries.length,
      completed,
      percentage:
        deliveries.length > 0 ? (completed / deliveries.length) * 100 : 0,
    };
  };

  const getInvoiceStatus = (poId: string) => {
    const mapping = poMappings.find((m) => m.poId === poId);
    if (!mapping) return { status: "pending", invoiceCount: 0, amount: 0 };

    return {
      status: mapping.fullyInvoiced ? "fully_invoiced" : "partially_invoiced",
      invoiceCount: mapping.invoiceIds.length,
      amount: mapping.invoicedAmount,
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Invoice Integration
          </h2>
          <p className="text-gray-600">
            Automatic invoice generation from purchase orders and deliveries
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={loadEligiblePOs}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Process Flow Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            Invoice Generation Process Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">PO Created</span>
            </div>

            <ArrowRight className="h-4 w-4 text-gray-400" />

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Truck className="h-4 w-4 text-orange-600" />
              </div>
              <span className="text-sm font-medium">Delivery Confirmed</span>
            </div>

            <ArrowRight className="h-4 w-4 text-gray-400" />

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-medium">GRN Processed</span>
            </div>

            <ArrowRight className="h-4 w-4 text-gray-400" />

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium">Invoice Generated</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ready for Invoicing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5" />
            Purchase Orders Ready for Invoicing
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : eligiblePOs.length === 0 ? (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No purchase orders are currently ready for invoicing. Ensure
                deliveries are confirmed and GRNs are processed.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {eligiblePOs.map((po) => {
                const deliveryStatus = getDeliveryStatus(po.id);
                const invoiceStatus = getInvoiceStatus(po.id);

                return (
                  <Card key={po.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h4 className="font-semibold">{po.poNumber}</h4>
                              <p className="text-sm text-gray-600">
                                {po.franchiseeName}
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-700">
                              Ready for Invoice
                            </Badge>
                            {invoiceStatus.status !== "pending" && (
                              <Badge variant="outline">
                                {invoiceStatus.invoiceCount} Invoice(s)
                                Generated
                              </Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">PO Amount</span>
                              <p className="font-medium">
                                ₹{po.grandTotal.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Delivery Progress
                              </span>
                              <div className="flex items-center space-x-2">
                                <Progress
                                  value={deliveryStatus.percentage}
                                  className="flex-1 h-2"
                                />
                                <span className="font-medium">
                                  {deliveryStatus.completed}/
                                  {deliveryStatus.total}
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Invoiced Amount
                              </span>
                              <p className="font-medium">
                                ₹{invoiceStatus.amount.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Pending Amount
                              </span>
                              <p className="font-medium text-orange-600">
                                ₹
                                {(
                                  po.grandTotal - invoiceStatus.amount
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>Items: {po.items.length}</span>
                            <span>•</span>
                            <span>
                              Created:{" "}
                              {new Date(po.createdAt).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span>Status: {po.status}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          {deliveryStatus.percentage === 100 &&
                            invoiceStatus.status === "pending" && (
                              <Button
                                onClick={() => handleGenerateInvoice(po)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Generate Invoice
                              </Button>
                            )}

                          {deliveryStatus.percentage > 0 &&
                            deliveryStatus.percentage < 100 && (
                              <Button
                                variant="outline"
                                onClick={() => handleGenerateInvoice(po, true)}
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Partial Invoice
                              </Button>
                            )}

                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Invoice Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Invoice Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {poMappings.slice(0, 5).map((mapping) => {
              const po = eligiblePOs.find((p) => p.id === mapping.poId);
              return (
                <div
                  key={mapping.poId}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{mapping.invoiceIds[0]}</p>
                      <p className="text-sm text-gray-600">
                        From PO: {mapping.poId}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">
                      ₹{mapping.invoicedAmount.toLocaleString()}
                    </p>
                    <Badge
                      variant={mapping.fullyInvoiced ? "default" : "outline"}
                    >
                      {mapping.fullyInvoiced ? "Fully Invoiced" : "Partial"}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Generate Invoice Modal */}
      <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate Invoice from PO</DialogTitle>
          </DialogHeader>

          {selectedPO && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Purchase Order</span>
                  <p className="font-medium">{selectedPO.poNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Franchisee</span>
                  <p className="font-medium">{selectedPO.franchiseeName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">PO Amount</span>
                  <p className="font-medium">
                    ₹{selectedPO.grandTotal.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Items</span>
                  <p className="font-medium">{selectedPO.items.length} items</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Invoice Preview</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>
                      ₹
                      {(
                        selectedPO.totalAmount - selectedPO.taxAmount
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{selectedPO.taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span>-₹{selectedPO.discountAmount.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total Amount:</span>
                    <span>₹{selectedPO.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  All deliveries for this PO have been confirmed and GRNs
                  processed. Invoice will be generated with GST compliance.
                </AlertDescription>
              </Alert>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsGenerateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={processInvoiceGeneration}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Mock data generators
function getMockEligiblePOs(): PurchaseOrder[] {
  return [
    {
      id: "PO-2024-003",
      poNumber: "PO-2024-003",
      franchiseeId: "FRAN001",
      franchiseeName: "Mumbai Central Beverages",
      corporateId: "CORP001",
      corporateName: "BuildPro Corporate",
      type: "standard",
      status: "delivered",
      priority: "medium",
      totalAmount: 67500,
      taxAmount: 12150,
      discountAmount: 3750,
      grandTotal: 75900,
      currency: "INR",
      items: [
        {
          id: "item_001",
          productId: "PROD001",
          sku: "COL500",
          productName: "Coca Cola 500ml",
          category: "Beverages",
          description: "Coca Cola 500ml bottles",
          specifications: {
            brand: "Coca Cola",
            size: "500ml",
            packagingType: "Bottle",
            shelfLife: "12 months",
          },
          requestedQuantity: 150,
          approvedQuantity: 150,
          fulfilledQuantity: 150,
          unitPrice: 25,
          totalPrice: 3750,
          discountPercentage: 5,
          discountAmount: 187.5,
          netAmount: 3562.5,
          currentStock: 45,
          minimumStock: 100,
          suggestedQuantity: 150,
          avgMonthlyConsumption: 200,
          itemStatus: "fulfilled",
          priority: "medium",
        },
      ],
      requestedDeliveryDate: new Date(
        Date.now() - 10 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      deliveryLocation: {
        id: "loc_001",
        name: "Mumbai Central Warehouse",
        address: {
          street: "456 Franchise Street",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400002",
          country: "India",
        },
        type: "warehouse",
        contactPerson: "Rajesh Kumar",
        contactPhone: "+91-9876543212",
        operatingHours: {
          weekdays: "9:00 AM - 6:00 PM",
          weekends: "9:00 AM - 2:00 PM",
        },
        specialInstructions: ["Call before delivery", "Use loading dock B"],
        isActive: true,
      },
      approvalWorkflow: {
        currentLevel: 3,
        totalLevels: 3,
        isCompleted: true,
        requiresApproval: true,
        autoApprovalThreshold: 50000,
        approvers: [],
      },
      approvalHistory: [],
      tracking: {
        currentStage: "delivered",
        stageHistory: [],
        estimatedCompletion: new Date().toISOString(),
        actualCompletion: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        delaysEncountered: [],
        issuesReported: [],
      },
      timeline: [],
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      createdBy: "FRAN001_USER",
      lastModified: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      modifiedBy: "SYSTEM",
      submittedAt: new Date(
        Date.now() - 15 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

function getMockRecentDeliveries(): DeliverySchedule[] {
  return [
    {
      id: "DEL-2024-156",
      poId: "PO-2024-003",
      scheduleStatus: "completed",
      scheduledDate: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      scheduledTimeSlot: {
        id: "slot_001",
        startTime: "10:00",
        endTime: "12:00",
        label: "Morning Slot",
        isAvailable: true,
        capacity: 5,
        currentBookings: 3,
        slotType: "standard",
      },
      actualDeliveryDate: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      deliveryType: "standard",
      priority: "medium",
      specialInstructions: ["Handle with care"],
      route: {
        id: "route_001",
        name: "Mumbai Central Route",
        distance: 15.5,
        estimatedDuration: 45,
        optimizedSequence: [],
        totalStops: 3,
        routeType: "optimized",
        trafficCondition: "moderate",
        alternateRoutes: [],
      },
      vehicle: {
        vehicleId: "VEH001",
        vehicleNumber: "MH-01-AB-1234",
        vehicleType: "truck",
        capacity: 1000,
        currentLoad: 750,
        isAvailable: true,
        fuelType: "diesel",
        lastMaintenance: new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        nextMaintenance: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        driverAssigned: "DRV001",
      },
      driver: {
        driverId: "DRV001",
        name: "Suresh Patil",
        licenseNumber: "MH123456789",
        phone: "+91-9876543213",
        rating: 4.5,
        experienceYears: 8,
        isAvailable: true,
        currentLocation: {
          latitude: 19.076,
          longitude: 72.8777,
          address: "Mumbai Central",
        },
        specializations: ["fragile_goods", "bulk_delivery"],
      },
      currentStatus: "delivered",
      statusHistory: [],
      trackingInfo: {
        trackingNumber: "TRK156789",
        currentLocation: {
          latitude: 19.076,
          longitude: 72.8777,
          address: "Mumbai Central Warehouse",
        },
        estimatedArrival: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        actualArrival: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        milestones: [],
        geofenceEvents: [],
      },
      notifications: [],
      documents: [],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdBy: "SYSTEM",
      lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

function getMockPOMappings(): POInvoiceMapping[] {
  return [
    {
      poId: "PO-2024-001",
      invoiceIds: ["INV-2024-001"],
      fullyInvoiced: true,
      partialInvoices: [],
      pendingAmount: 0,
      invoicedAmount: 45000,
    },
  ];
}

function generateInvoiceFromPO(po: PurchaseOrder): Invoice {
  const invoiceNumber = `INV-${Date.now()}`;

  return {
    id: invoiceNumber,
    invoiceNumber,
    invoiceType: "tax_invoice",
    tenantId: "tenant_001",
    corporateId: po.corporateId,
    franchiseeId: po.franchiseeId,
    poId: po.id,
    poNumber: po.poNumber,
    challanIds: [],
    grnIds: [],
    deliveryIds: [],
    issueDate: new Date().toISOString(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    billFrom: {
      id: po.corporateId,
      name: po.corporateName,
      legalName: `${po.corporateName} Pvt Ltd`,
      type: "corporate",
      email: "billing@buildpro.com",
      phone: "+91-9876543210",
      address: {
        street: "123 Corporate Plaza",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400001",
        country: "India",
      },
      gstNumber: "27AABCB1234C1Z5",
      panNumber: "AABCB1234C",
      businessType: "company",
    },
    billTo: {
      id: po.franchiseeId,
      name: po.franchiseeName,
      legalName: `${po.franchiseeName} Pvt Ltd`,
      type: "franchisee",
      email: "accounts@franchise.com",
      phone: "+91-9876543211",
      address: po.deliveryLocation.address,
      gstNumber: "27DEFGH5678I9J0",
      panNumber: "DEFGH5678I",
      businessType: "company",
    },
    items: po.items.map((item) => ({
      id: item.id,
      lineNumber: 1,
      productId: item.productId,
      sku: item.sku,
      productName: item.productName,
      description: item.description,
      category: item.category,
      unit: "pieces",
      hsnCode: "22029910",
      taxCategory: "taxable",
      quantity: item.fulfilledQuantity || item.requestedQuantity,
      deliveredQuantity: item.fulfilledQuantity || item.requestedQuantity,
      pendingQuantity: 0,
      unitPrice: item.unitPrice,
      grossAmount: item.totalPrice,
      discountType: "amount",
      discountValue: item.discountAmount || 0,
      discountAmount: item.discountAmount || 0,
      netAmount: item.netAmount,
      taxableAmount: item.netAmount,
      cgstRate: 9,
      cgstAmount: item.netAmount * 0.09,
      sgstRate: 9,
      sgstAmount: item.netAmount * 0.09,
      igstRate: 0,
      igstAmount: 0,
      totalTaxAmount: item.netAmount * 0.18,
      totalAmount: item.netAmount * 1.18,
      itemStatus: "delivered",
    })),
    subtotal: po.totalAmount - po.taxAmount,
    totalDiscount: po.discountAmount,
    totalTaxableAmount: po.totalAmount - po.taxAmount - po.discountAmount,
    totalTax: po.taxAmount,
    totalAmount: po.grandTotal,
    roundingAdjustment: 0,
    grandTotal: po.grandTotal,
    gstDetails: {
      isGSTApplicable: true,
      gstRegistration: {
        gstNumber: "27AABCB1234C1Z5",
        registrationType: "regular",
        registrationDate: "2017-07-01",
        isActive: true,
      },
      placeOfSupply: "Maharashtra",
      stateCode: "27",
      supplyType: "intrastate",
      reverseCharge: false,
      totalCGST: po.taxAmount / 2,
      totalSGST: po.taxAmount / 2,
      totalIGST: 0,
      totalCESS: 0,
      totalTax: po.taxAmount,
      eWayBillRequired: false,
      eInvoiceRequired: false,
    },
    hsn: [],
    paymentStatus: "unpaid",
    paymentTerms: "Net 30 days",
    paidAmount: 0,
    balanceAmount: po.grandTotal,
    payments: [],
    status: "draft",
    workflow: {
      currentStage: "created",
      stages: [],
      approvals: [],
      escalations: [],
      autoActions: [],
    },
    isPartialInvoice: false,
    attachments: [],
    auditTrail: [],
    complianceChecks: [],
    sourceModule: "po_fulfillment",
    createdAt: new Date().toISOString(),
    createdBy: "SYSTEM",
    lastModified: new Date().toISOString(),
    modifiedBy: "SYSTEM",
  };
}
