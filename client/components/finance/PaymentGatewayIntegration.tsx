import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  CreditCard,
  Smartphone,
  University,
  Wallet,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Copy,
  QrCode,
  Info,
} from "lucide-react";
import { Invoice } from "./invoice-types";
import {
  PaymentTransaction,
  PaymentGateway,
  PaymentWorkflowStatus,
  GatewayResponse,
  UPITransaction,
  BankTransfer,
} from "./payment-types";

interface PaymentGatewayIntegrationProps {
  invoice: Invoice;
  onPaymentSuccess: (payment: PaymentTransaction) => void;
  onPaymentFailure: (error: string) => void;
  onCancel: () => void;
}

export function PaymentGatewayIntegration({
  invoice,
  onPaymentSuccess,
  onPaymentFailure,
  onCancel,
}: PaymentGatewayIntegrationProps) {
  const [selectedGateway, setSelectedGateway] =
    useState<PaymentGateway>("razorpay");
  const [paymentAmount, setPaymentAmount] = useState(
    invoice.balanceAmount || invoice.grandTotal,
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<
    "gateway" | "processing" | "success" | "failure"
  >("gateway");
  const [paymentResult, setPaymentResult] = useState<PaymentTransaction | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState("");

  // UPI specific states
  const [upiId, setUpiId] = useState("");
  const [qrCode, setQrCode] = useState("");

  // Bank transfer specific states
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });

  const gatewayOptions = [
    {
      value: "razorpay" as PaymentGateway,
      label: "Razorpay",
      icon: <CreditCard className="h-5 w-5" />,
      fees: "2.0%",
      description: "Credit/Debit Cards, Net Banking, UPI, Wallets",
      color: "bg-blue-50 border-blue-200 text-blue-800",
    },
    {
      value: "payu" as PaymentGateway,
      label: "PayU",
      icon: <Wallet className="h-5 w-5" />,
      fees: "2.3%",
      description: "All major payment methods",
      color: "bg-green-50 border-green-200 text-green-800",
    },
    {
      value: "upi" as PaymentGateway,
      label: "UPI Direct",
      icon: <Smartphone className="h-5 w-5" />,
      fees: "₹0",
      description: "Direct UPI payment with instant verification",
      color: "bg-purple-50 border-purple-200 text-purple-800",
    },
    {
      value: "neft" as PaymentGateway,
      label: "NEFT",
      icon: <University className="h-5 w-5" />,
      fees: "₹5",
      description: "National Electronic Funds Transfer",
      color: "bg-orange-50 border-orange-200 text-orange-800",
    },
    {
      value: "rtgs" as PaymentGateway,
      label: "RTGS",
      icon: <University className="h-5 w-5" />,
      fees: "₹25",
      description: "Real Time Gross Settlement (Min ₹2L)",
      color: "bg-red-50 border-red-200 text-red-800",
    },
  ];

  const selectedGatewayInfo = gatewayOptions.find(
    (g) => g.value === selectedGateway,
  );

  const processPayment = async () => {
    setIsProcessing(true);
    setPaymentStep("processing");

    try {
      let paymentResult: PaymentTransaction;

      switch (selectedGateway) {
        case "razorpay":
          paymentResult = await processRazorpayPayment();
          break;
        case "payu":
          paymentResult = await processPayUPayment();
          break;
        case "upi":
          paymentResult = await processUPIPayment();
          break;
        case "neft":
          paymentResult = await processNEFTPayment();
          break;
        case "rtgs":
          paymentResult = await processRTGSPayment();
          break;
        default:
          throw new Error("Unsupported payment gateway");
      }

      setPaymentResult(paymentResult);
      setPaymentStep("success");
      onPaymentSuccess(paymentResult);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Payment failed",
      );
      setPaymentStep("failure");
      onPaymentFailure(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const processRazorpayPayment = async (): Promise<PaymentTransaction> => {
    // Simulate Razorpay integration
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Simulate random success/failure
    if (Math.random() > 0.1) {
      // 90% success rate
      const mockGatewayResponse: GatewayResponse = {
        gatewayTransactionId: `razorpay_${Date.now()}`,
        gatewayOrderId: `order_${Date.now()}`,
        responseCode: "SUCCESS",
        responseMessage: "Payment successful",
        bankReference: `RZP${Date.now()}`,
        settlementDate: new Date(
          Date.now() + 24 * 60 * 60 * 1000,
        ).toISOString(),
        fees: paymentAmount * 0.02,
        rawResponse: {
          razorpay_payment_id: `pay_${Date.now()}`,
          razorpay_order_id: `order_${Date.now()}`,
          razorpay_signature: "mock_signature",
        },
      };

      return createPaymentTransaction("completed", mockGatewayResponse);
    } else {
      throw new Error("Payment declined by bank");
    }
  };

  const processPayUPayment = async (): Promise<PaymentTransaction> => {
    // Simulate PayU integration
    await new Promise((resolve) => setTimeout(resolve, 4000));

    if (Math.random() > 0.15) {
      // 85% success rate
      const mockGatewayResponse: GatewayResponse = {
        gatewayTransactionId: `payu_${Date.now()}`,
        responseCode: "success",
        responseMessage: "Transaction Successful",
        bankReference: `PYU${Date.now()}`,
        fees: paymentAmount * 0.023,
        rawResponse: {
          mihpayid: `${Date.now()}`,
          mode: "CC",
          status: "success",
          txnid: `TXN${Date.now()}`,
        },
      };

      return createPaymentTransaction("completed", mockGatewayResponse);
    } else {
      throw new Error("Transaction failed at PayU gateway");
    }
  };

  const processUPIPayment = async (): Promise<PaymentTransaction> => {
    // Simulate UPI payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Math.random() > 0.05) {
      // 95% success rate for UPI
      const upiTransaction: UPITransaction = {
        id: `upi_${Date.now()}`,
        upiId: upiId,
        vpa: upiId,
        amount: paymentAmount,
        currency: "INR",
        transactionId: `${Date.now()}`,
        utr: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
        status: "success",
        timestamp: new Date().toISOString(),
        merchantTransactionId: `UPI${Date.now()}`,
      };

      const mockGatewayResponse: GatewayResponse = {
        gatewayTransactionId: upiTransaction.transactionId,
        responseCode: "00",
        responseMessage: "Transaction Successful",
        bankReference: upiTransaction.utr,
        fees: 0,
        rawResponse: upiTransaction,
      };

      return createPaymentTransaction("completed", mockGatewayResponse);
    } else {
      throw new Error(
        "UPI transaction failed - insufficient balance or invalid VPA",
      );
    }
  };

  const processNEFTPayment = async (): Promise<PaymentTransaction> => {
    // Simulate NEFT processing
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const bankTransfer: BankTransfer = {
      id: `neft_${Date.now()}`,
      type: "neft",
      amount: paymentAmount,
      currency: "INR",
      beneficiaryAccount: "BuildCorp-001",
      beneficiaryIfsc: "HDFC0001234",
      utr: `NEFT${Date.now()}`,
      status: "processed",
      timestamp: new Date().toISOString(),
      charges: 5,
    };

    const mockGatewayResponse: GatewayResponse = {
      gatewayTransactionId: bankTransfer.id,
      responseCode: "SUCCESS",
      responseMessage: "NEFT transaction initiated successfully",
      bankReference: bankTransfer.utr,
      fees: 5,
      rawResponse: bankTransfer,
    };

    return createPaymentTransaction("completed", mockGatewayResponse);
  };

  const processRTGSPayment = async (): Promise<PaymentTransaction> => {
    // Simulate RTGS processing
    if (paymentAmount < 200000) {
      throw new Error("RTGS minimum amount is ₹2,00,000");
    }

    await new Promise((resolve) => setTimeout(resolve, 6000));

    const bankTransfer: BankTransfer = {
      id: `rtgs_${Date.now()}`,
      type: "rtgs",
      amount: paymentAmount,
      currency: "INR",
      beneficiaryAccount: "BuildCorp-001",
      beneficiaryIfsc: "HDFC0001234",
      utr: `RTGS${Date.now()}`,
      status: "completed",
      timestamp: new Date().toISOString(),
      charges: 25,
    };

    const mockGatewayResponse: GatewayResponse = {
      gatewayTransactionId: bankTransfer.id,
      responseCode: "SUCCESS",
      responseMessage: "RTGS transaction completed successfully",
      bankReference: bankTransfer.utr,
      fees: 25,
      rawResponse: bankTransfer,
    };

    return createPaymentTransaction("completed", mockGatewayResponse);
  };

  const createPaymentTransaction = (
    status: PaymentWorkflowStatus,
    gatewayResponse?: GatewayResponse,
  ): PaymentTransaction => {
    return {
      id: `PAY-${Date.now()}`,
      transactionId: `TXN-${Date.now()}`,
      paymentId: `PID-${Date.now()}`,
      tenantId: invoice.tenantId,
      franchiseeId: invoice.franchiseeId,
      corporateId: invoice.corporateId,
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      amount: paymentAmount,
      currency: "INR",
      paymentMethod:
        selectedGateway === "upi"
          ? "upi"
          : selectedGateway === "neft" || selectedGateway === "rtgs"
            ? "bank_transfer"
            : "online",
      gateway: selectedGateway,
      status,
      gatewayResponse,
      initiatedAt: new Date().toISOString(),
      completedAt:
        status === "completed" ? new Date().toISOString() : undefined,
      description: `Payment for invoice ${invoice.invoiceNumber}`,
      reconciliation: {
        status: "pending",
        autoReconciled: false,
      },
      createdBy: "current_user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const generateUPIQR = () => {
    // Generate UPI QR code data
    const upiString = `upi://pay?pa=buildcorp@hdfc&pn=BuildCorp&am=${paymentAmount}&tr=${invoice.invoiceNumber}&tn=Payment for ${invoice.invoiceNumber}`;
    setQrCode(upiString);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (paymentStep === "processing") {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Processing Payment</h3>
          <p className="text-muted-foreground">
            Please wait while we process your payment through{" "}
            {selectedGatewayInfo?.label}...
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            <Shield className="h-4 w-4 inline mr-2" />
            Your payment is secured with industry-standard encryption
          </p>
        </div>
      </div>
    );
  }

  if (paymentStep === "success") {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-green-700">
            Payment Successful!
          </h3>
          <p className="text-muted-foreground">
            Your payment of ₹{paymentAmount.toLocaleString()} has been processed
            successfully.
          </p>
        </div>
        {paymentResult && (
          <div className="bg-green-50 p-4 rounded-lg text-left space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Transaction ID:</span>
              <span className="font-mono text-sm">
                {paymentResult.transactionId}
              </span>
            </div>
            {paymentResult.gatewayResponse?.bankReference && (
              <div className="flex justify-between">
                <span className="font-medium">Reference:</span>
                <span className="font-mono text-sm">
                  {paymentResult.gatewayResponse.bankReference}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-medium">Gateway:</span>
              <span className="capitalize">{paymentResult.gateway}</span>
            </div>
          </div>
        )}
        <Button onClick={onCancel} className="w-full">
          Close
        </Button>
      </div>
    );
  }

  if (paymentStep === "failure") {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-red-700">Payment Failed</h3>
          <p className="text-muted-foreground">{errorMessage}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPaymentStep("gateway")}
            className="flex-1"
          >
            Try Again
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Invoice Summary */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Invoice:</span>
          <span className="font-mono text-sm">{invoice.invoiceNumber}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Amount to Pay:</span>
          <span className="text-xl font-bold text-blue-600">
            ₹{paymentAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Payment Amount */}
      <div className="space-y-2">
        <Label>Payment Amount</Label>
        <Input
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(Number(e.target.value))}
          max={invoice.balanceAmount || invoice.grandTotal}
        />
        <p className="text-xs text-muted-foreground">
          Maximum: ₹
          {(invoice.balanceAmount || invoice.grandTotal).toLocaleString()}
        </p>
      </div>

      {/* Gateway Selection */}
      <div className="space-y-4">
        <Label>Select Payment Method</Label>
        <div className="grid gap-3">
          {gatewayOptions.map((gateway) => (
            <Card
              key={gateway.value}
              className={`cursor-pointer transition-all ${
                selectedGateway === gateway.value
                  ? "ring-2 ring-blue-500 " + gateway.color
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelectedGateway(gateway.value)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {gateway.icon}
                    <div>
                      <h4 className="font-medium">{gateway.label}</h4>
                      <p className="text-xs text-muted-foreground">
                        {gateway.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{gateway.fees}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Gateway-specific fields */}
      {selectedGateway === "upi" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>UPI ID</Label>
            <Input
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={generateUPIQR} className="w-full">
            <QrCode className="h-4 w-4 mr-2" />
            Generate QR Code
          </Button>
          {qrCode && (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="bg-white p-4 rounded inline-block">
                <QrCode className="h-24 w-24 mx-auto text-gray-400" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Scan this QR code with any UPI app
              </p>
            </div>
          )}
        </div>
      )}

      {(selectedGateway === "neft" || selectedGateway === "rtgs") && (
        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium">Bank Transfer Instructions:</p>
                <ul className="mt-1 list-disc list-inside space-y-1">
                  <li>Transfer to: BuildCorp Industries Ltd.</li>
                  <li>Account: 1234567890</li>
                  <li>IFSC: HDFC0001234</li>
                  <li>Amount: ₹{paymentAmount.toLocaleString()}</li>
                  <li>Reference: {invoice.invoiceNumber}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => copyToClipboard("1234567890")}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Account
            </Button>
            <Button
              variant="outline"
              onClick={() => copyToClipboard("HDFC0001234")}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy IFSC
            </Button>
          </div>

          {selectedGateway === "rtgs" && paymentAmount < 200000 && (
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-700">
                  RTGS minimum amount is ₹2,00,000. Consider using NEFT for
                  smaller amounts.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={processPayment}
          disabled={
            isProcessing ||
            paymentAmount <= 0 ||
            paymentAmount > (invoice.balanceAmount || invoice.grandTotal) ||
            (selectedGateway === "upi" && !upiId) ||
            (selectedGateway === "rtgs" && paymentAmount < 200000)
          }
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay ₹{paymentAmount.toLocaleString()}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default PaymentGatewayIntegration;
