import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import {
  Plus,
  Trash2,
  Calculator,
  Send,
  Download,
  Copy,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Building2,
  Calendar,
  DollarSign,
  Package,
  Percent,
} from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useLogger } from "../../hooks/useLogger";
import {
  SalesQuotation,
  QuotationFormData,
  QuotationItem,
  SalesCustomer,
  Product,
  DiscountRule,
  BusinessRule,
} from "./types";
import {
  salesCustomers,
  products,
  discountRules,
  businessRules,
  getCustomerById,
  getProductById,
  calculateItemTotal,
  validateBusinessRule,
} from "./data";

interface QuotationManagementProps {
  quotation?: SalesQuotation;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (quotation: SalesQuotation) => void;
  mode?: "create" | "edit" | "view" | "copy";
}

export function QuotationManagement({
  quotation,
  isOpen,
  onClose,
  onSave,
  mode = "create",
}: QuotationManagementProps) {
  const { toast } = useToast();
  const { logUserAction } = useLogger();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [discountApprovalRequired, setDiscountApprovalRequired] =
    useState(false);
  const [calculatedTotals, setCalculatedTotals] = useState({
    subtotal: 0,
    discountAmount: 0,
    taxAmount: 0,
    totalAmount: 0,
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<QuotationFormData>({
    defaultValues: {
      customerId: quotation?.customerId || "",
      title: quotation?.title || "",
      description: quotation?.description || "",
      validUntil: quotation?.validUntil?.split("T")[0] || "",
      items: quotation?.items || [
        {
          productId: "",
          productCode: "",
          productName: "",
          description: "",
          category: "",
          quantity: 1,
          unit: "",
          unitPrice: 0,
          discountType: "percentage",
          discountValue: 0,
          discountAmount: 0,
          taxRate: 18,
        },
      ],
      discountPercentage: quotation?.discountPercentage || 0,
      paymentTerms: quotation?.paymentTerms || "30 days from delivery",
      deliveryTerms: quotation?.deliveryTerms || "Ex-warehouse",
      notes: quotation?.notes || "",
      currency: quotation?.currency || "INR",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");
  const watchedDiscountPercentage = watch("discountPercentage");
  const watchedCustomerId = watch("customerId");

  // Calculate totals whenever items or discount changes
  useEffect(() => {
    calculateTotals();
  }, [watchedItems, watchedDiscountPercentage]);

  // Reset form when quotation changes
  useEffect(() => {
    if (quotation && mode !== "create") {
      reset({
        customerId: quotation.customerId,
        title: quotation.title,
        description: quotation.description,
        validUntil: quotation.validUntil.split("T")[0],
        items: quotation.items.map((item) => ({
          ...item,
          taxAmount: undefined,
          lineTotal: undefined,
        })),
        discountPercentage: quotation.discountPercentage,
        paymentTerms: quotation.paymentTerms,
        deliveryTerms: quotation.deliveryTerms,
        notes: quotation.notes,
        currency: quotation.currency,
      });
    }
  }, [quotation, mode, reset]);

  const calculateTotals = () => {
    const items = getValues("items");
    const discountPercentage = getValues("discountPercentage") || 0;

    let subtotal = 0;
    let taxAmount = 0;

    items.forEach((item, index) => {
      if (item.quantity && item.unitPrice) {
        const lineSubtotal = item.quantity * item.unitPrice;
        const itemDiscountAmount =
          item.discountType === "percentage"
            ? (lineSubtotal * (item.discountValue || 0)) / 100
            : item.discountValue || 0;
        const taxableAmount = lineSubtotal - itemDiscountAmount;
        const itemTaxAmount = (taxableAmount * (item.taxRate || 0)) / 100;

        subtotal += lineSubtotal;
        taxAmount += itemTaxAmount;

        // Update individual item totals
        setValue(`items.${index}.discountAmount`, itemDiscountAmount);
        setValue(`items.${index}.taxAmount`, itemTaxAmount);
        setValue(`items.${index}.lineTotal`, taxableAmount + itemTaxAmount);
      }
    });

    const overallDiscountAmount = (subtotal * discountPercentage) / 100;
    const finalTaxAmount = taxAmount; // Tax is calculated before overall discount
    const totalAmount = subtotal - overallDiscountAmount + finalTaxAmount;

    const totals = {
      subtotal,
      discountAmount: overallDiscountAmount,
      taxAmount: finalTaxAmount,
      totalAmount,
    };

    setCalculatedTotals(totals);

    // Check if discount approval is required
    checkDiscountApproval(discountPercentage);

    return totals;
  };

  const checkDiscountApproval = (discountPercentage: number) => {
    const discountRule = businessRules.find(
      (rule) =>
        rule.entity === "quotation" &&
        rule.name.includes("Discount") &&
        rule.isActive,
    );

    if (discountRule && discountPercentage > 15) {
      setDiscountApprovalRequired(true);
    } else {
      setDiscountApprovalRequired(false);
    }
  };

  const handleProductSelect = (index: number, productId: string) => {
    const product = getProductById(productId);
    if (product) {
      setValue(`items.${index}.productId`, product.id);
      setValue(`items.${index}.productCode`, product.productCode);
      setValue(`items.${index}.productName`, product.name);
      setValue(`items.${index}.description`, product.description);
      setValue(`items.${index}.category`, product.category);
      setValue(`items.${index}.unit`, product.unit);
      setValue(`items.${index}.unitPrice`, product.sellingPrice);
      setValue(`items.${index}.taxRate`, product.taxRate);

      logUserAction("select_product_in_quotation", "QuotationManagement", {
        productId: product.id,
        productCode: product.productCode,
      });
    }
  };

  const addNewItem = () => {
    append({
      productId: "",
      productCode: "",
      productName: "",
      description: "",
      category: "",
      quantity: 1,
      unit: "",
      unitPrice: 0,
      discountType: "percentage",
      discountValue: 0,
      discountAmount: 0,
      taxRate: 18,
    });
    logUserAction("add_quotation_item", "QuotationManagement");
  };

  const removeItem = (index: number) => {
    remove(index);
    logUserAction("remove_quotation_item", "QuotationManagement", { index });
  };

  const validateQuotation = (data: QuotationFormData): string[] => {
    const errors: string[] = [];

    // Basic validation
    if (!data.customerId) {
      errors.push("Customer is required");
    }

    if (!data.title) {
      errors.push("Quotation title is required");
    }

    if (!data.validUntil) {
      errors.push("Valid until date is required");
    }

    if (data.items.length === 0) {
      errors.push("At least one item is required");
    }

    // Validate items
    data.items.forEach((item, index) => {
      if (!item.productId) {
        errors.push(`Item ${index + 1}: Product is required`);
      }
      if (!item.quantity || item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Valid quantity is required`);
      }
      if (!item.unitPrice || item.unitPrice <= 0) {
        errors.push(`Item ${index + 1}: Valid unit price is required`);
      }
    });

    // Check customer approval status
    const customer = getCustomerById(data.customerId);
    if (customer) {
      const customerRule = businessRules.find(
        (rule) =>
          rule.entity === "customer" &&
          rule.name.includes("Approval") &&
          rule.isActive,
      );

      if (customerRule) {
        const validation = validateBusinessRule(customerRule, { customer });
        if (!validation.valid) {
          errors.push(validation.message || "Customer approval required");
        }
      }
    }

    // Check stock availability
    data.items.forEach((item, index) => {
      const product = getProductById(item.productId);
      if (product && item.quantity > product.availableQuantity) {
        errors.push(
          `Item ${index + 1}: Insufficient stock (Available: ${product.availableQuantity})`,
        );
      }
    });

    return errors;
  };

  const onSubmit = async (data: QuotationFormData) => {
    setIsLoading(true);

    try {
      // Validate the quotation
      const errors = validateQuotation(data);
      setValidationErrors(errors);

      if (errors.length > 0) {
        toast({
          title: "Validation Failed",
          description: `${errors.length} error(s) found. Please fix them before proceeding.`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Calculate final totals
      const totals = calculateTotals();

      // Create quotation object
      const quotationData: SalesQuotation = {
        id: quotation?.id || `quot_${Date.now()}`,
        tenantId: "tenant_buildcorp",
        quotationNumber:
          quotation?.quotationNumber ||
          `Q-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        customerId: data.customerId,
        customer: getCustomerById(data.customerId)!,
        title: data.title,
        description: data.description,
        status: quotation?.status || "draft",
        version: quotation?.version || 1,
        parentQuotationId:
          mode === "copy" ? quotation?.id : quotation?.parentQuotationId,
        quotationDate: quotation?.quotationDate || new Date().toISOString(),
        validUntil: new Date(data.validUntil).toISOString(),
        items: data.items.map((item, index) => ({
          ...item,
          id: `qi_${Date.now()}_${index}`,
          taxAmount: getValues(`items.${index}.taxAmount`) || 0,
          lineTotal: getValues(`items.${index}.lineTotal`) || 0,
          availableStock: getProductById(item.productId)?.availableQuantity,
        })),
        subtotal: totals.subtotal,
        discountAmount: totals.discountAmount,
        discountPercentage: data.discountPercentage,
        taxAmount: totals.taxAmount,
        totalAmount: totals.totalAmount,
        currency: data.currency,
        exchangeRate: 1, // TODO: Get from exchange rate service
        paymentTerms: data.paymentTerms,
        deliveryTerms: data.deliveryTerms,
        validity: 30, // TODO: Calculate from validUntil
        notes: data.notes,
        termsAndConditions: "Standard terms and conditions apply",
        createdBy: "current_user", // TODO: Get from auth context
        assignedTo: "current_user", // TODO: Get from assignment logic
        approvalRequired: discountApprovalRequired,
        convertedToOrder: quotation?.convertedToOrder || false,
        created_at: quotation?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Call the save handler
      onSave?.(quotationData);

      logUserAction(`quotation_${mode}`, "QuotationManagement", {
        quotationId: quotationData.id,
        quotationNumber: quotationData.quotationNumber,
        totalAmount: quotationData.totalAmount,
      });

      toast({
        title: `Quotation ${mode === "create" ? "Created" : "Updated"}`,
        description: `Quotation ${quotationData.quotationNumber} has been ${mode === "create" ? "created" : "updated"} successfully.`,
      });

      onClose();
    } catch (error) {
      console.error("Error saving quotation:", error);
      toast({
        title: "Error",
        description: "Failed to save quotation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendQuotation = () => {
    // Logic to send quotation to customer
    logUserAction("send_quotation", "QuotationManagement", {
      quotationId: quotation?.id,
    });

    toast({
      title: "Quotation Sent",
      description: "Quotation has been sent to the customer via email.",
    });
  };

  const formatCurrency = (amount: number, currency: string = "INR") => {
    if (currency === "INR") {
      return `₹${amount.toLocaleString("en-IN")}`;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const isReadOnly = mode === "view";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {mode === "create"
              ? "Create New Quotation"
              : mode === "edit"
                ? "Edit Quotation"
                : mode === "copy"
                  ? "Copy Quotation"
                  : "View Quotation"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new sales quotation for customer"
              : mode === "edit"
                ? "Modify the existing quotation details"
                : mode === "copy"
                  ? "Create a copy of the existing quotation"
                  : "View quotation details and status"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-red-800">
                    Validation Errors
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="customerId">Customer *</Label>
                  <Select
                    value={watchedCustomerId}
                    onValueChange={(value) => setValue("customerId", value)}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {salesCustomers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <div>
                              <div className="font-medium">
                                {customer.companyName}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {customer.customerCode} •{" "}
                                {customer.contactPerson}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.customerId && (
                    <p className="text-sm text-red-600">
                      {errors.customerId.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={watch("currency")}
                    onValueChange={(value) => setValue("currency", value)}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Quotation Title *</Label>
                  <Input
                    id="title"
                    {...register("title", { required: "Title is required" })}
                    placeholder="Enter quotation title"
                    readOnly={isReadOnly}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="validUntil">Valid Until *</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    {...register("validUntil", {
                      required: "Valid until date is required",
                    })}
                    readOnly={isReadOnly}
                  />
                  {errors.validUntil && (
                    <p className="text-sm text-red-600">
                      {errors.validUntil.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter quotation description"
                  readOnly={isReadOnly}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quotation Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Quotation Items
                </div>
                {!isReadOnly && (
                  <Button type="button" onClick={addNewItem} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <Card key={field.id} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Item {index + 1}</h4>
                      {!isReadOnly && fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-6">
                      <div className="md:col-span-2">
                        <Label>Product *</Label>
                        <Select
                          value={watchedItems[index]?.productId || ""}
                          onValueChange={(value) =>
                            handleProductSelect(index, value)
                          }
                          disabled={isReadOnly}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                <div>
                                  <div className="font-medium">
                                    {product.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {product.productCode} • ₹
                                    {product.sellingPrice.toLocaleString()} •
                                    Stock: {product.availableQuantity}{" "}
                                    {product.unit}
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Quantity *</Label>
                        <Input
                          type="number"
                          min="1"
                          {...register(`items.${index}.quantity`, {
                            required: "Quantity is required",
                            min: {
                              value: 1,
                              message: "Quantity must be at least 1",
                            },
                          })}
                          readOnly={isReadOnly}
                        />
                      </div>

                      <div>
                        <Label>Unit Price *</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          {...register(`items.${index}.unitPrice`, {
                            required: "Unit price is required",
                            min: {
                              value: 0,
                              message: "Price must be non-negative",
                            },
                          })}
                          readOnly={isReadOnly}
                        />
                      </div>

                      <div>
                        <Label>Discount %</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          {...register(`items.${index}.discountValue`)}
                          readOnly={isReadOnly}
                        />
                      </div>

                      <div>
                        <Label>Line Total</Label>
                        <Input
                          value={formatCurrency(
                            getValues(`items.${index}.lineTotal`) || 0,
                          )}
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <Label>Description</Label>
                      <Input
                        {...register(`items.${index}.description`)}
                        placeholder="Item description"
                        readOnly={isReadOnly}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Pricing Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="discountPercentage">
                      Overall Discount %
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="discountPercentage"
                        type="number"
                        min="0"
                        max="50"
                        step="0.01"
                        {...register("discountPercentage")}
                        readOnly={isReadOnly}
                      />
                      {discountApprovalRequired && (
                        <div className="flex items-center gap-1 text-orange-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-xs">Approval Required</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span className="font-medium">
                      {formatCurrency(calculatedTotals.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount:</span>
                    <span className="font-medium text-red-600">
                      -{formatCurrency(calculatedTotals.discountAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax Amount:</span>
                    <span className="font-medium">
                      {formatCurrency(calculatedTotals.taxAmount)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span>{formatCurrency(calculatedTotals.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Input
                    id="paymentTerms"
                    {...register("paymentTerms")}
                    placeholder="e.g., 30 days from delivery"
                    readOnly={isReadOnly}
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryTerms">Delivery Terms</Label>
                  <Input
                    id="deliveryTerms"
                    {...register("deliveryTerms")}
                    placeholder="e.g., Ex-warehouse"
                    readOnly={isReadOnly}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  placeholder="Additional notes or special instructions"
                  readOnly={isReadOnly}
                />
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {!isReadOnly && (
              <>
                <Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? "Saving..."
                    : mode === "create"
                      ? "Create Quotation"
                      : "Update Quotation"}
                </Button>
                {mode !== "create" && (
                  <Button
                    type="button"
                    onClick={handleSendQuotation}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send to Customer
                  </Button>
                )}
              </>
            )}
            {isReadOnly && (
              <>
                <Button type="button" variant="outline" className="gap-2">
                  <Copy className="h-4 w-4" />
                  Copy Quotation
                </Button>
                <Button type="button" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
