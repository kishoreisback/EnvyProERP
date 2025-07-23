// Invoice Notification Integration
// Extends the unified notification system with invoice-specific notifications

import { UnifiedNotification } from "../notifications/types";
import { Invoice, InvoiceStatus, PaymentDueTracker } from "./invoice-types";

export function createInvoiceGeneratedNotification(
  invoice: Invoice,
  tenantId: string,
): UnifiedNotification {
  return {
    id: `notif_invoice_${invoice.id}`,
    tenantId,
    type: "order_status",
    category: "financial",
    title: "Invoice Generated",
    message: `Invoice ${invoice.invoiceNumber} has been generated for PO ${invoice.poNumber}. Amount: ₹${invoice.grandTotal.toLocaleString()}`,
    content: {
      shortText: `Invoice ${invoice.invoiceNumber} - ₹${invoice.grandTotal.toLocaleString()}`,
      fullText: `Invoice ${invoice.invoiceNumber} has been successfully generated from Purchase Order ${invoice.poNumber}.

Invoice Details:
- Amount: ₹${invoice.grandTotal.toLocaleString()}
- Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}
- GST: ₹${invoice.gstDetails.totalTax.toLocaleString()}
- Payment Terms: ${invoice.paymentTerms}

The invoice has been sent to ${invoice.billTo.name} and is now awaiting payment.`,
      variables: {
        invoice_number: invoice.invoiceNumber,
        po_number: invoice.poNumber,
        amount: invoice.grandTotal.toString(),
        due_date: invoice.dueDate,
        franchisee_name: invoice.billTo.name,
      },
    },
    status: "pending",
    priority: "medium",
    senderType: "system",
    senderId: "INVOICE_SYSTEM",
    senderName: "Invoice Management System",
    recipientType: "user",
    recipients: [
      {
        id: `rec_${invoice.corporateId}`,
        type: "user",
        identifier: invoice.corporateId,
        name: "Corporate Team",
        status: "pending",
      },
      {
        id: `rec_${invoice.franchiseeId}`,
        type: "user",
        identifier: invoice.franchiseeId,
        name: invoice.billTo.name,
        status: "pending",
      },
    ],
    userTypeScope: "both",
    permissions: {
      canRead: true,
      canEdit: false,
      canDelete: false,
      canResend: false,
      canAcknowledge: true,
      canDismiss: true,
      canForward: false,
      canComment: true,
    },
    channels: ["in_app", "email"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "pending",
        timestamp: new Date().toISOString(),
      },
    ],
    relatedEntity: {
      type: "invoice",
      id: invoice.id,
      name: invoice.invoiceNumber,
      url: `/invoice-management/corporate/invoices?invoice=${invoice.id}`,
      displayName: `Invoice ${invoice.invoiceNumber}`,
    },
    businessContext: {
      processType: "grn_process",
      processId: invoice.id,
      stakeholders: [
        {
          userId: invoice.corporateId,
          role: "Issuer",
          responsibility: "Monitor payment status",
          canApprove: false,
          canReject: false,
          mustAcknowledge: false,
        },
        {
          userId: invoice.franchiseeId,
          role: "Payer",
          responsibility: "Process payment",
          canApprove: false,
          canReject: false,
          mustAcknowledge: true,
        },
      ],
      deadlines: [
        {
          name: "Payment Due Date",
          dueDate: invoice.dueDate,
          priority: "high",
        },
      ],
    },
    actions: [
      {
        id: "action_view_invoice",
        type: "view_details",
        label: "View Invoice",
        style: "primary",
        action: {
          type: "navigate",
          target: `/invoice-management/corporate/invoices?invoice=${invoice.id}`,
        },
        visible: true,
        enabled: true,
      },
      {
        id: "action_download_pdf",
        type: "download",
        label: "Download PDF",
        style: "secondary",
        action: {
          type: "api_call",
          target: `/api/invoices/${invoice.id}/pdf`,
          method: "GET",
        },
        visible: true,
        enabled: true,
      },
    ],
    attachments: [],
    createdAt: new Date().toISOString(),
    tags: ["invoice", "generated", "payment-pending"],
    openCount: 0,
    clickCount: 0,
  };
}

export function createPaymentDueNotification(
  invoice: Invoice,
  daysUntilDue: number,
  tenantId: string,
): UnifiedNotification {
  const urgencyLevel =
    daysUntilDue <= 3 ? "urgent" : daysUntilDue <= 7 ? "high" : "medium";

  return {
    id: `notif_due_${invoice.id}_${Date.now()}`,
    tenantId,
    type: "payment_reminder",
    category: "financial",
    title: `Payment Due ${daysUntilDue > 0 ? `in ${daysUntilDue} days` : "TODAY"}`,
    message: `Invoice ${invoice.invoiceNumber} payment of ₹${invoice.balanceAmount.toLocaleString()} is due ${daysUntilDue > 0 ? `in ${daysUntilDue} days` : "today"}.`,
    content: {
      shortText: `Payment due ${daysUntilDue > 0 ? `in ${daysUntilDue} days` : "today"} - ₹${invoice.balanceAmount.toLocaleString()}`,
      fullText: `Payment Reminder for Invoice ${invoice.invoiceNumber}

Amount Due: ₹${invoice.balanceAmount.toLocaleString()}
Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}
Days Until Due: ${daysUntilDue}

Original Invoice Amount: ₹${invoice.grandTotal.toLocaleString()}
Amount Paid: ₹${invoice.paidAmount.toLocaleString()}
Balance Amount: ₹${invoice.balanceAmount.toLocaleString()}

Please ensure payment is processed before the due date to avoid late fees.`,
      variables: {
        invoice_number: invoice.invoiceNumber,
        amount: invoice.balanceAmount.toString(),
        due_date: invoice.dueDate,
        days_until_due: daysUntilDue.toString(),
      },
    },
    status: "pending",
    priority: urgencyLevel,
    senderType: "system",
    senderId: "PAYMENT_REMINDER_SYSTEM",
    senderName: "Payment Reminder System",
    recipientType: "user",
    recipients: [
      {
        id: `rec_${invoice.franchiseeId}`,
        type: "user",
        identifier: invoice.franchiseeId,
        name: invoice.billTo.name,
        status: "pending",
      },
    ],
    userTypeScope: "franchisee",
    permissions: {
      canRead: true,
      canEdit: false,
      canDelete: false,
      canResend: false,
      canAcknowledge: true,
      canDismiss: true,
      canForward: false,
      canComment: false,
    },
    channels: ["in_app", "email", "sms"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "pending",
        timestamp: new Date().toISOString(),
      },
    ],
    relatedEntity: {
      type: "invoice",
      id: invoice.id,
      name: invoice.invoiceNumber,
      url: `/invoice-management/franchisee/pending?invoice=${invoice.id}`,
    },
    businessContext: {
      processType: "payment_process",
      processId: invoice.id,
      stakeholders: [
        {
          userId: invoice.franchiseeId,
          role: "Payer",
          responsibility: "Process payment",
          canApprove: false,
          canReject: false,
          mustAcknowledge: true,
        },
      ],
      deadlines: [
        {
          name: "Payment Due Date",
          dueDate: invoice.dueDate,
          priority: urgencyLevel,
        },
      ],
    },
    actions: [
      {
        id: "action_make_payment",
        type: "button",
        label: "Make Payment",
        style: "success",
        action: {
          type: "navigate",
          target: `/invoice-management/franchisee/payment?invoice=${invoice.id}`,
        },
        visible: true,
        enabled: true,
      },
      {
        id: "action_view_invoice",
        type: "view_details",
        label: "View Invoice",
        style: "secondary",
        action: {
          type: "navigate",
          target: `/invoice-management/franchisee/pending?invoice=${invoice.id}`,
        },
        visible: true,
        enabled: true,
      },
      {
        id: "action_contact_support",
        type: "button",
        label: "Contact Support",
        style: "secondary",
        action: {
          type: "external_link",
          target: "mailto:support@buildpro.com",
        },
        visible: true,
        enabled: true,
      },
    ],
    attachments: [],
    createdAt: new Date().toISOString(),
    tags: ["payment", "due", "reminder", urgencyLevel],
    openCount: 0,
    clickCount: 0,
  };
}

export function createPaymentReceivedNotification(
  invoice: Invoice,
  paymentAmount: number,
  tenantId: string,
): UnifiedNotification {
  const isFullPayment = paymentAmount >= invoice.balanceAmount;

  return {
    id: `notif_payment_${invoice.id}_${Date.now()}`,
    tenantId,
    type: "payment_reminder",
    category: "financial",
    title: `Payment ${isFullPayment ? "Received" : "Partially Received"}`,
    message: `Payment of ₹${paymentAmount.toLocaleString()} received for Invoice ${invoice.invoiceNumber}. ${isFullPayment ? "Invoice fully paid." : `Balance: ₹${(invoice.balanceAmount - paymentAmount).toLocaleString()}`}`,
    content: {
      shortText: `Payment received - ₹${paymentAmount.toLocaleString()}`,
      fullText: `Payment Confirmation for Invoice ${invoice.invoiceNumber}

Payment Received: ₹${paymentAmount.toLocaleString()}
Payment Date: ${new Date().toLocaleDateString()}
Payment Status: ${isFullPayment ? "Fully Paid" : "Partially Paid"}

Invoice Summary:
- Original Amount: ₹${invoice.grandTotal.toLocaleString()}
- Previous Payments: ₹${invoice.paidAmount.toLocaleString()}
- Current Payment: ₹${paymentAmount.toLocaleString()}
- ${isFullPayment ? "Invoice Status: PAID IN FULL" : `Remaining Balance: ₹${(invoice.balanceAmount - paymentAmount).toLocaleString()}`}

Thank you for your payment!`,
      variables: {
        invoice_number: invoice.invoiceNumber,
        payment_amount: paymentAmount.toString(),
        payment_date: new Date().toISOString(),
        remaining_balance: (invoice.balanceAmount - paymentAmount).toString(),
      },
    },
    status: "pending",
    priority: "medium",
    senderType: "system",
    senderId: "PAYMENT_SYSTEM",
    senderName: "Payment Processing System",
    recipientType: "user",
    recipients: [
      {
        id: `rec_${invoice.corporateId}`,
        type: "user",
        identifier: invoice.corporateId,
        name: "Corporate Accounts",
        status: "pending",
      },
      {
        id: `rec_${invoice.franchiseeId}`,
        type: "user",
        identifier: invoice.franchiseeId,
        name: invoice.billTo.name,
        status: "pending",
      },
    ],
    userTypeScope: "both",
    permissions: {
      canRead: true,
      canEdit: false,
      canDelete: false,
      canResend: false,
      canAcknowledge: true,
      canDismiss: true,
      canForward: false,
      canComment: false,
    },
    channels: ["in_app", "email"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "pending",
        timestamp: new Date().toISOString(),
      },
    ],
    relatedEntity: {
      type: "invoice",
      id: invoice.id,
      name: invoice.invoiceNumber,
      url: `/invoice-management/corporate/invoices?invoice=${invoice.id}`,
    },
    businessContext: {
      processType: "payment_process",
      processId: invoice.id,
      stakeholders: [
        {
          userId: invoice.corporateId,
          role: "Receiver",
          responsibility: "Acknowledge payment",
          canApprove: false,
          canReject: false,
          mustAcknowledge: false,
        },
        {
          userId: invoice.franchiseeId,
          role: "Payer",
          responsibility: "Payment completed",
          canApprove: false,
          canReject: false,
          mustAcknowledge: false,
        },
      ],
    },
    actions: [
      {
        id: "action_view_invoice",
        type: "view_details",
        label: "View Invoice",
        style: "primary",
        action: {
          type: "navigate",
          target: `/invoice-management/corporate/invoices?invoice=${invoice.id}`,
        },
        visible: true,
        enabled: true,
      },
      {
        id: "action_download_receipt",
        type: "download",
        label: "Download Receipt",
        style: "secondary",
        action: {
          type: "api_call",
          target: `/api/invoices/${invoice.id}/receipt`,
          method: "GET",
        },
        visible: true,
        enabled: true,
      },
    ],
    attachments: [],
    createdAt: new Date().toISOString(),
    tags: ["payment", "received", isFullPayment ? "paid" : "partial"],
    openCount: 0,
    clickCount: 0,
  };
}

export function createOverdueNotification(
  tracker: PaymentDueTracker,
  invoice: Invoice,
  tenantId: string,
): UnifiedNotification {
  const riskLevel =
    tracker.riskCategory === "critical"
      ? "critical"
      : tracker.riskCategory === "high"
        ? "urgent"
        : "high";

  return {
    id: `notif_overdue_${tracker.invoiceId}_${Date.now()}`,
    tenantId,
    type: "payment_reminder",
    category: "financial",
    title: `Payment Overdue - ${tracker.daysPastDue} Days`,
    message: `Invoice ${tracker.invoiceId} is ${tracker.daysPastDue} days overdue. Amount: ₹${tracker.dueAmount.toLocaleString()}. Immediate action required.`,
    content: {
      shortText: `${tracker.daysPastDue} days overdue - ₹${tracker.dueAmount.toLocaleString()}`,
      fullText: `URGENT: Payment Overdue Notice

Invoice: ${tracker.invoiceId}
Days Overdue: ${tracker.daysPastDue}
Amount Due: ₹${tracker.dueAmount.toLocaleString()}
Original Due Date: ${new Date(tracker.originalDueDate).toLocaleDateString()}
Risk Level: ${tracker.riskCategory.toUpperCase()}

This invoice is significantly overdue and requires immediate attention. 

Recent Collection Activity:
- Reminders Sent: ${tracker.remindersSent.length}
- Collection Calls: ${tracker.collectionCalls.length}
- Payment Promises: ${tracker.paymentPromises.length}

Please contact us immediately to resolve this matter and avoid further collection actions.`,
      variables: {
        invoice_id: tracker.invoiceId,
        days_overdue: tracker.daysPastDue.toString(),
        amount_due: tracker.dueAmount.toString(),
        risk_level: tracker.riskCategory,
      },
    },
    status: "pending",
    priority: riskLevel,
    senderType: "system",
    senderId: "COLLECTION_SYSTEM",
    senderName: "Collections Department",
    recipientType: "user",
    recipients: [
      {
        id: `rec_${tracker.franchiseeId}`,
        type: "user",
        identifier: tracker.franchiseeId,
        name: "Franchisee Accounts",
        status: "pending",
      },
    ],
    userTypeScope: "franchisee",
    permissions: {
      canRead: true,
      canEdit: false,
      canDelete: false,
      canResend: false,
      canAcknowledge: true,
      canDismiss: false,
      canForward: false,
      canComment: true,
    },
    channels: ["in_app", "email", "sms"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "pending",
        timestamp: new Date().toISOString(),
      },
    ],
    relatedEntity: {
      type: "invoice",
      id: tracker.invoiceId,
      name: tracker.invoiceId,
      url: `/invoice-management/franchisee/overdue?invoice=${tracker.invoiceId}`,
    },
    businessContext: {
      processType: "payment_process",
      processId: tracker.invoiceId,
      stakeholders: [
        {
          userId: tracker.franchiseeId,
          role: "Debtor",
          responsibility: "Resolve overdue payment",
          canApprove: false,
          canReject: false,
          mustAcknowledge: true,
        },
      ],
      escalations: [
        {
          id: "escalation_001",
          name: "Collections Escalation",
          trigger: {
            type: "time_based",
            condition: `${tracker.daysPastDue} days overdue`,
          },
          actions: [
            {
              type: "notify_manager",
              parameters: { escalation_level: tracker.escalationLevel },
            },
          ],
          enabled: true,
        },
      ],
    },
    actions: [
      {
        id: "action_pay_now",
        type: "button",
        label: "Pay Now",
        style: "danger",
        action: {
          type: "navigate",
          target: `/invoice-management/franchisee/payment?invoice=${tracker.invoiceId}`,
        },
        visible: true,
        enabled: true,
      },
      {
        id: "action_contact_collections",
        type: "button",
        label: "Contact Collections",
        style: "warning",
        action: {
          type: "external_link",
          target: "tel:+919876543210",
        },
        visible: true,
        enabled: true,
      },
      {
        id: "action_dispute",
        type: "button",
        label: "Dispute Invoice",
        style: "secondary",
        action: {
          type: "navigate",
          target: `/invoice-management/franchisee/dispute?invoice=${tracker.invoiceId}`,
        },
        visible: true,
        enabled: true,
      },
    ],
    attachments: [],
    createdAt: new Date().toISOString(),
    tags: ["overdue", "urgent", "collections", tracker.riskCategory],
    openCount: 0,
    clickCount: 0,
  };
}

export function createGSTComplianceNotification(
  monthlyGSTAmount: number,
  dueDate: string,
  tenantId: string,
): UnifiedNotification {
  return {
    id: `notif_gst_${Date.now()}`,
    tenantId,
    type: "compliance_update",
    category: "compliance",
    title: "GST Return Filing Due",
    message: `Monthly GST return filing is due on ${new Date(dueDate).toLocaleDateString()}. Total GST: ₹${monthlyGSTAmount.toLocaleString()}`,
    content: {
      shortText: `GST filing due - ₹${monthlyGSTAmount.toLocaleString()}`,
      fullText: `GST Compliance Reminder

Filing Due Date: ${new Date(dueDate).toLocaleDateString()}
Total GST Amount: ₹${monthlyGSTAmount.toLocaleString()}
Filing Period: ${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}

All invoice data has been automatically compiled for your GST return. Please review and file your return before the due date to avoid penalties.

You can download the GST report from the Invoice Management dashboard.`,
      variables: {
        gst_amount: monthlyGSTAmount.toString(),
        due_date: dueDate,
        filing_period: new Date().toLocaleDateString("en-IN", {
          month: "long",
          year: "numeric",
        }),
      },
    },
    status: "pending",
    priority: "high",
    senderType: "system",
    senderId: "GST_COMPLIANCE_SYSTEM",
    senderName: "GST Compliance System",
    recipientType: "user_type",
    recipients: [
      {
        id: "rec_corporate_accounts",
        type: "user_type",
        identifier: "corporate",
        name: "Corporate Accounts Team",
        status: "pending",
      },
    ],
    userTypeScope: "corporate",
    permissions: {
      canRead: true,
      canEdit: false,
      canDelete: false,
      canResend: false,
      canAcknowledge: true,
      canDismiss: false,
      canForward: false,
      canComment: false,
    },
    channels: ["in_app", "email"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "pending",
        timestamp: new Date().toISOString(),
      },
    ],
    businessContext: {
      processType: "compliance_check",
      processId: `gst_filing_${new Date().getMonth() + 1}_${new Date().getFullYear()}`,
      deadlines: [
        {
          name: "GST Return Filing",
          dueDate: dueDate,
          priority: "high",
        },
      ],
    },
    actions: [
      {
        id: "action_download_gst_report",
        type: "download",
        label: "Download GST Report",
        style: "primary",
        action: {
          type: "api_call",
          target: "/api/reports/gst",
          method: "GET",
        },
        visible: true,
        enabled: true,
      },
      {
        id: "action_view_invoices",
        type: "view_details",
        label: "View Invoices",
        style: "secondary",
        action: {
          type: "navigate",
          target: "/invoice-management/corporate/analytics",
        },
        visible: true,
        enabled: true,
      },
    ],
    attachments: [],
    createdAt: new Date().toISOString(),
    tags: ["gst", "compliance", "filing", "due"],
    openCount: 0,
    clickCount: 0,
  };
}

// Utility functions for notification automation
export class InvoiceNotificationManager {
  static generateInvoiceNotifications(
    invoice: Invoice,
    tenantId: string,
  ): UnifiedNotification[] {
    const notifications: UnifiedNotification[] = [];

    // Always generate invoice created notification
    notifications.push(createInvoiceGeneratedNotification(invoice, tenantId));

    return notifications;
  }

  static generatePaymentReminders(
    invoices: Invoice[],
    tenantId: string,
  ): UnifiedNotification[] {
    const notifications: UnifiedNotification[] = [];
    const today = new Date();

    invoices.forEach((invoice) => {
      if (invoice.status === "sent" || invoice.status === "viewed") {
        const dueDate = new Date(invoice.dueDate);
        const daysUntilDue = Math.ceil(
          (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
        );

        // Send reminders at 7 days, 3 days, and day of due date
        if ([7, 3, 0].includes(daysUntilDue)) {
          notifications.push(
            createPaymentDueNotification(invoice, daysUntilDue, tenantId),
          );
        }
      }
    });

    return notifications;
  }

  static generateOverdueNotifications(
    trackers: PaymentDueTracker[],
    invoices: Invoice[],
    tenantId: string,
  ): UnifiedNotification[] {
    const notifications: UnifiedNotification[] = [];

    trackers.forEach((tracker) => {
      if (tracker.daysPastDue > 0 && tracker.resolutionStatus === "active") {
        const invoice = invoices.find((inv) => inv.id === tracker.invoiceId);
        if (invoice) {
          // Send overdue notifications on days 1, 7, 15, 30 past due
          if ([1, 7, 15, 30].includes(tracker.daysPastDue)) {
            notifications.push(
              createOverdueNotification(tracker, invoice, tenantId),
            );
          }
        }
      }
    });

    return notifications;
  }
}
