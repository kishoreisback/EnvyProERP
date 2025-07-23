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
import { CreditCard, FileText, Building2, Plus, Trash2 } from "lucide-react";
import { TDSChallan } from "../compliance-types";
import { useToast } from "../../ui/use-toast";

interface TDSReturnModalProps {
  open: boolean;
  onClose: () => void;
  tenantId: string;
  tanNumber: string;
}

export function TDSReturnModal({
  open,
  onClose,
  tenantId,
  tanNumber,
}: TDSReturnModalProps) {
  const [returnForm, setReturnForm] = useState({
    quarter: "",
    financialYear: "2023-24",
    totalDeductions: 0,
    totalDeposited: 0,
    interestPayable: 0,
    penaltyPayable: 0,
    remarks: "",
  });

  const [challans, setChallans] = useState<Partial<TDSChallan>[]>([
    {
      challanNumber: "",
      bsrCode: "",
      bankName: "",
      depositDate: "",
      amount: 0,
      taxType: "194C",
    },
  ]);

  // TDS Deduction breakdown by section
  const [tdsBreakdown] = useState([
    {
      section: "194C",
      description: "Payments to Contractors",
      deductions: 1500000,
      rate: 1,
      threshold: 30000,
    },
    {
      section: "194J",
      description: "Professional Services",
      deductions: 850000,
      rate: 10,
      threshold: 30000,
    },
    {
      section: "194I",
      description: "Rent",
      deductions: 500000,
      rate: 10,
      threshold: 180000,
    },
    {
      section: "194A",
      description: "Interest on Securities",
      deductions: 200000,
      rate: 10,
      threshold: 5000,
    },
  ]);

  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalChallanAmount = challans.reduce(
    (sum, challan) => sum + (challan.amount || 0),
    0,
  );
  const shortfall = Math.max(
    returnForm.totalDeductions - totalChallanAmount,
    0,
  );

  const addChallan = () => {
    setChallans([
      ...challans,
      {
        challanNumber: "",
        bsrCode: "",
        bankName: "",
        depositDate: "",
        amount: 0,
        taxType: "194C",
      },
    ]);
  };

  const removeChallan = (index: number) => {
    if (challans.length > 1) {
      setChallans(challans.filter((_, i) => i !== index));
    }
  };

  const updateChallan = (
    index: number,
    field: keyof TDSChallan,
    value: any,
  ) => {
    const updatedChallans = [...challans];
    updatedChallans[index] = { ...updatedChallans[index], [field]: value };
    setChallans(updatedChallans);
  };

  const handleSubmit = () => {
    if (!returnForm.quarter) {
      toast({
        title: "Validation Error",
        description: "Please select a quarter for the TDS return",
        variant: "destructive",
      });
      return;
    }

    if (shortfall > 0) {
      toast({
        title: "Validation Error",
        description: `TDS deposit shortfall of ${formatCurrency(shortfall)}. Please add more challans or adjust deductions.`,
        variant: "destructive",
      });
      return;
    }

    // Simulate TDS return filing
    toast({
      title: "TDS Return Filed",
      description: `TDS return for ${returnForm.quarter} ${returnForm.financialYear} has been filed successfully`,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            File TDS Return
          </DialogTitle>
          <DialogDescription>
            File TDS return for TAN: {tanNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Return Details */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="quarter">Quarter *</Label>
              <Select
                value={returnForm.quarter}
                onValueChange={(value) =>
                  setReturnForm((prev) => ({ ...prev, quarter: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1">Q1 (Apr-Jun)</SelectItem>
                  <SelectItem value="Q2">Q2 (Jul-Sep)</SelectItem>
                  <SelectItem value="Q3">Q3 (Oct-Dec)</SelectItem>
                  <SelectItem value="Q4">Q4 (Jan-Mar)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="financialYear">Financial Year *</Label>
              <Select
                value={returnForm.financialYear}
                onValueChange={(value) =>
                  setReturnForm((prev) => ({ ...prev, financialYear: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-24">2023-24</SelectItem>
                  <SelectItem value="2022-23">2022-23</SelectItem>
                  <SelectItem value="2021-22">2021-22</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                type="date"
                value={
                  returnForm.quarter === "Q4" ? "2024-05-31" : "2024-01-31"
                }
                disabled
              />
            </div>
          </div>

          {/* TDS Deduction Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">TDS Deduction Summary</h3>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Section</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Rate %</TableHead>
                  <TableHead>Threshold</TableHead>
                  <TableHead>Deductions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tdsBreakdown.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono font-medium">
                      {item.section}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.rate}%</TableCell>
                    <TableCell>{formatCurrency(item.threshold)}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(item.deductions)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-muted/50">
                  <TableCell colSpan={4}>Total TDS Deducted</TableCell>
                  <TableCell>
                    {formatCurrency(
                      tdsBreakdown.reduce(
                        (sum, item) => sum + item.deductions,
                        0,
                      ),
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* TDS Deposit Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                TDS Deposit Details (Challans)
              </h3>
              <Button variant="outline" size="sm" onClick={addChallan}>
                <Plus className="mr-2 h-4 w-4" />
                Add Challan
              </Button>
            </div>

            <div className="space-y-4">
              {challans.map((challan, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 gap-4 p-4 border rounded-lg"
                >
                  <div>
                    <Label htmlFor={`challanNumber_${index}`}>
                      Challan Number *
                    </Label>
                    <Input
                      value={challan.challanNumber}
                      onChange={(e) =>
                        updateChallan(index, "challanNumber", e.target.value)
                      }
                      placeholder="BSR-0123456789"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`bsrCode_${index}`}>BSR Code *</Label>
                    <Input
                      value={challan.bsrCode}
                      onChange={(e) =>
                        updateChallan(index, "bsrCode", e.target.value)
                      }
                      placeholder="0123456"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`bankName_${index}`}>Bank Name *</Label>
                    <Select
                      value={challan.bankName}
                      onValueChange={(value) =>
                        updateChallan(index, "bankName", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="State Bank of India">
                          State Bank of India
                        </SelectItem>
                        <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                        <SelectItem value="ICICI Bank">ICICI Bank</SelectItem>
                        <SelectItem value="Axis Bank">Axis Bank</SelectItem>
                        <SelectItem value="Punjab National Bank">
                          Punjab National Bank
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`depositDate_${index}`}>
                      Deposit Date *
                    </Label>
                    <Input
                      type="date"
                      value={challan.depositDate}
                      onChange={(e) =>
                        updateChallan(index, "depositDate", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`amount_${index}`}>Amount *</Label>
                    <Input
                      type="number"
                      value={challan.amount}
                      onChange={(e) =>
                        updateChallan(
                          index,
                          "amount",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                  <div className="flex items-end">
                    {challans.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeChallan(index)}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Summary</h3>

            <div className="bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total TDS Deducted:</span>
                    <span className="font-medium">
                      {formatCurrency(
                        tdsBreakdown.reduce(
                          (sum, item) => sum + item.deductions,
                          0,
                        ),
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Deposited (Challans):</span>
                    <span className="font-medium">
                      {formatCurrency(totalChallanAmount)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Shortfall/Excess:</span>
                    <span
                      className={`font-medium ${shortfall > 0 ? "text-red-600" : "text-green-600"}`}
                    >
                      {shortfall > 0
                        ? `-${formatCurrency(shortfall)}`
                        : formatCurrency(Math.abs(shortfall))}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Interest Payable:</span>
                    <span className="font-medium">
                      {formatCurrency(returnForm.interestPayable)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Penalty Payable:</span>
                    <span className="font-medium">
                      {formatCurrency(returnForm.penaltyPayable)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Payable:</span>
                    <span className="text-red-600">
                      {formatCurrency(
                        shortfall +
                          returnForm.interestPayable +
                          returnForm.penaltyPayable,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Charges */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Charges</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="interestPayable">Interest Payable</Label>
                <Input
                  type="number"
                  value={returnForm.interestPayable}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      interestPayable: parseFloat(e.target.value) || 0,
                    }))
                  }
                  placeholder="Enter interest amount"
                />
              </div>
              <div>
                <Label htmlFor="penaltyPayable">Penalty Payable</Label>
                <Input
                  type="number"
                  value={returnForm.penaltyPayable}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      penaltyPayable: parseFloat(e.target.value) || 0,
                    }))
                  }
                  placeholder="Enter penalty amount"
                />
              </div>
            </div>
          </div>

          {/* Form Status Validation */}
          {shortfall > 0 && (
            <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="font-medium text-red-800">
                  Deposit Shortfall: {formatCurrency(shortfall)}
                </span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                The total challan amount is less than TDS deducted. Please add
                more challans or adjust the deduction amount.
              </p>
            </div>
          )}

          {shortfall === 0 && totalChallanAmount > 0 && (
            <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="font-medium text-green-800">
                  TDS deposits match deductions
                </span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                All TDS deductions have been properly deposited with the
                government.
              </p>
            </div>
          )}

          {/* Remarks */}
          <div>
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              value={returnForm.remarks}
              onChange={(e) =>
                setReturnForm((prev) => ({ ...prev, remarks: e.target.value }))
              }
              placeholder="Any additional remarks or explanations..."
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
          <Button
            onClick={handleSubmit}
            disabled={shortfall > 0 || !returnForm.quarter}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            File TDS Return
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
