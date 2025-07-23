import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Calculator, Receipt, FileText, AlertTriangle } from "lucide-react";
import { GSTReturnType, GSTType } from "../compliance-types";
import { useToast } from "../../ui/use-toast";

interface GSTReturnModalProps {
  open: boolean;
  onClose: () => void;
  tenantId: string;
  gstNumber: string;
}

export function GSTReturnModal({
  open,
  onClose,
  tenantId,
  gstNumber,
}: GSTReturnModalProps) {
  const [returnForm, setReturnForm] = useState({
    returnType: "gstr3b" as GSTReturnType,
    period: "",
    totalSales: 0,
    taxableSales: 0,
    exemptSales: 0,
    nilRatedSales: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 0,
    cessAmount: 0,
    itcClaimed: 0,
    itcReversed: 0,
    adjustments: "",
  });

  const { toast } = useToast();

  // Calculate totals
  const totalTaxCollected =
    returnForm.cgstAmount +
    returnForm.sgstAmount +
    returnForm.igstAmount +
    returnForm.cessAmount;
  const netItc = returnForm.itcClaimed - returnForm.itcReversed;
  const taxPayable = Math.max(totalTaxCollected - netItc, 0);

  // HSN/SAC wise sales breakdown
  const [salesBreakdown] = useState([
    {
      hsn: "9954",
      description: "Construction Services",
      taxableValue: 5000000,
      cgst: 450000,
      sgst: 450000,
      igst: 0,
      rate: 18,
    },
    {
      hsn: "2501",
      description: "Cement",
      taxableValue: 3000000,
      cgst: 420000,
      sgst: 420000,
      igst: 0,
      rate: 28,
    },
    {
      hsn: "7214",
      description: "Iron & Steel",
      taxableValue: 2500000,
      cgst: 225000,
      sgst: 225000,
      igst: 0,
      rate: 18,
    },
  ]);

  // Purchase breakdown for ITC
  const [purchaseBreakdown] = useState([
    {
      vendor: "ABC Steel Ltd",
      taxableValue: 2000000,
      cgst: 180000,
      sgst: 180000,
      igst: 0,
      itc: 360000,
    },
    {
      vendor: "XYZ Cement Co",
      taxableValue: 1500000,
      cgst: 210000,
      sgst: 210000,
      igst: 0,
      itc: 420000,
    },
    {
      vendor: "PQR Materials",
      taxableValue: 500000,
      cgst: 45000,
      sgst: 45000,
      igst: 0,
      itc: 90000,
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = () => {
    if (!returnForm.period) {
      toast({
        title: "Validation Error",
        description: "Please select a period for the GST return",
        variant: "destructive",
      });
      return;
    }

    // Simulate GST return filing
    toast({
      title: "GST Return Filed",
      description: `${returnForm.returnType.toUpperCase()} for ${returnForm.period} has been filed successfully`,
    });
    onClose();
  };

  const validateReturn = () => {
    const issues = [];

    if (
      Math.abs(
        totalTaxCollected -
          (returnForm.cgstAmount +
            returnForm.sgstAmount +
            returnForm.igstAmount +
            returnForm.cessAmount),
      ) > 1
    ) {
      issues.push("Tax calculation mismatch");
    }

    if (returnForm.itcClaimed > totalTaxCollected * 0.8) {
      issues.push("ITC claimed seems unusually high");
    }

    return issues;
  };

  const validationIssues = validateReturn();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            File GST Return
          </DialogTitle>
          <DialogDescription>
            File GST return for GSTIN: {gstNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Return Details */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="returnType">Return Type *</Label>
              <Select
                value={returnForm.returnType}
                onValueChange={(value) =>
                  setReturnForm((prev) => ({
                    ...prev,
                    returnType: value as GSTReturnType,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gstr1">GSTR-1 (Sales Return)</SelectItem>
                  <SelectItem value="gstr3b">
                    GSTR-3B (Summary Return)
                  </SelectItem>
                  <SelectItem value="gstr2">
                    GSTR-2 (Purchase Return)
                  </SelectItem>
                  <SelectItem value="gstr9">GSTR-9 (Annual Return)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="period">Period *</Label>
              <Select
                value={returnForm.period}
                onValueChange={(value) =>
                  setReturnForm((prev) => ({ ...prev, period: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-02">February 2024</SelectItem>
                  <SelectItem value="2024-01">January 2024</SelectItem>
                  <SelectItem value="2023-12">December 2023</SelectItem>
                  <SelectItem value="2023-11">November 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input type="date" value="2024-03-20" disabled />
            </div>
          </div>

          {/* Sales Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Sales Summary
            </h3>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="totalSales">Total Sales</Label>
                <Input
                  type="number"
                  value={returnForm.totalSales}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      totalSales: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="taxableSales">Taxable Sales</Label>
                <Input
                  type="number"
                  value={returnForm.taxableSales}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      taxableSales: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="exemptSales">Exempt Sales</Label>
                <Input
                  type="number"
                  value={returnForm.exemptSales}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      exemptSales: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="nilRatedSales">Nil Rated Sales</Label>
                <Input
                  type="number"
                  value={returnForm.nilRatedSales}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      nilRatedSales: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>

            {/* HSN/SAC wise breakdown */}
            <div>
              <h4 className="font-medium mb-2">HSN/SAC wise Sales Breakdown</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>HSN/SAC</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Taxable Value</TableHead>
                    <TableHead>CGST</TableHead>
                    <TableHead>SGST</TableHead>
                    <TableHead>IGST</TableHead>
                    <TableHead>Rate %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesBreakdown.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{item.hsn}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{formatCurrency(item.taxableValue)}</TableCell>
                      <TableCell>{formatCurrency(item.cgst)}</TableCell>
                      <TableCell>{formatCurrency(item.sgst)}</TableCell>
                      <TableCell>{formatCurrency(item.igst)}</TableCell>
                      <TableCell>{item.rate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Tax Calculation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tax Calculation</h3>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="cgstAmount">CGST Amount</Label>
                <Input
                  type="number"
                  value={returnForm.cgstAmount}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      cgstAmount: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="sgstAmount">SGST Amount</Label>
                <Input
                  type="number"
                  value={returnForm.sgstAmount}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      sgstAmount: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="igstAmount">IGST Amount</Label>
                <Input
                  type="number"
                  value={returnForm.igstAmount}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      igstAmount: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="cessAmount">Cess Amount</Label>
                <Input
                  type="number"
                  value={returnForm.cessAmount}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      cessAmount: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Input Tax Credit */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Input Tax Credit (ITC)</h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="itcClaimed">ITC Claimed</Label>
                <Input
                  type="number"
                  value={returnForm.itcClaimed}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      itcClaimed: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="itcReversed">ITC Reversed</Label>
                <Input
                  type="number"
                  value={returnForm.itcReversed}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      itcReversed: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Net ITC</Label>
                <Input
                  type="number"
                  value={netItc}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            {/* Purchase breakdown for ITC */}
            <div>
              <h4 className="font-medium mb-2">ITC from Purchases</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Taxable Value</TableHead>
                    <TableHead>CGST</TableHead>
                    <TableHead>SGST</TableHead>
                    <TableHead>IGST</TableHead>
                    <TableHead>ITC Available</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseBreakdown.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.vendor}</TableCell>
                      <TableCell>{formatCurrency(item.taxableValue)}</TableCell>
                      <TableCell>{formatCurrency(item.cgst)}</TableCell>
                      <TableCell>{formatCurrency(item.sgst)}</TableCell>
                      <TableCell>{formatCurrency(item.igst)}</TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(item.itc)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Summary</h3>

            <div className="bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between py-2">
                    <span>Total Tax Collected:</span>
                    <span className="font-medium">
                      {formatCurrency(totalTaxCollected)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Net ITC:</span>
                    <span className="font-medium">
                      {formatCurrency(netItc)}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between py-2 font-bold text-lg">
                    <span>Tax Payable:</span>
                    <span className="text-green-600">
                      {formatCurrency(taxPayable)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Payment Breakdown:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>CGST Payable:</span>
                      <span>
                        {formatCurrency(
                          Math.max(returnForm.cgstAmount - netItc / 2, 0),
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>SGST Payable:</span>
                      <span>
                        {formatCurrency(
                          Math.max(returnForm.sgstAmount - netItc / 2, 0),
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>IGST Payable:</span>
                      <span>
                        {formatCurrency(
                          Math.max(returnForm.igstAmount - netItc, 0),
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Issues */}
          {validationIssues.length > 0 && (
            <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-800">
                  Validation Issues
                </h4>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                {validationIssues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Information */}
          <div>
            <Label htmlFor="adjustments">Adjustments & Remarks</Label>
            <Textarea
              value={returnForm.adjustments}
              onChange={(e) =>
                setReturnForm((prev) => ({
                  ...prev,
                  adjustments: e.target.value,
                }))
              }
              placeholder="Any adjustments, corrections, or additional remarks..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
          <Button onClick={handleSubmit} disabled={validationIssues.length > 0}>
            <Receipt className="mr-2 h-4 w-4" />
            File Return
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
