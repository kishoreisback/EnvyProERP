import React from "react";
import {
  PaymentTransaction,
  PaymentNotificationEvent,
  LatePaymentAlert,
  CreditLimit,
} from "./payment-types";
import {
  TenantNotification,
  NotificationPriority,
  NotificationChannel,
} from "../notifications/types";

// Payment notification templates
export const PAYMENT_NOTIFICATION_TEMPLATES = {
  payment_initiated: {
    title: "Payment Initiated",
    template:
      "Payment of {{amount}} for invoice {{invoiceNumber}} has been initiated via {{gateway}}.",
    channels: ["email", "dashboard"] as NotificationChannel[],
    priority: "medium" as NotificationPriority,
  },
  payment_completed: {
    title: "Payment Successful",
    template:
      "Payment of {{amount}} for invoice {{invoiceNumber}} completed successfully. Transaction ID: {{transactionId}}",
    channels: ["email", "sms", "dashboard"] as NotificationChannel[],
    priority: "high" as NotificationPriority,
  },
  payment_failed: {
    title: "Payment Failed",
    template:
      "Payment of {{amount}} for invoice {{invoiceNumber}} failed. Reason: {{reason}}. Please try again.",
    channels: ["email", "sms", "dashboard"] as NotificationChannel[],
    priority: "high" as NotificationPriority,
  },
  reconciliation_mismatch: {
    title: "Reconciliation Mismatch",
    template:
      "Payment {{transactionId}} has reconciliation discrepancies. Manual review required.",
    channels: ["email", "dashboard"] as NotificationChannel[],
    priority: "medium" as NotificationPriority,
  },
  late_payment_reminder: {
    title: "Payment Overdue",
    template:
      "Invoice {{invoiceNumber}} is {{daysOverdue}} days overdue. Amount: {{amount}}. Please make payment immediately.",
    channels: ["email", "sms"] as NotificationChannel[],
    priority: "high" as NotificationPriority,
  },
  credit_limit_warning: {
    title: "Credit Limit Warning",
    template:
      "Credit utilization is at {{utilizationPercentage}}%. Available credit: {{availableCredit}}",
    channels: ["email", "dashboard"] as NotificationChannel[],
    priority: "medium" as NotificationPriority,
  },
  credit_limit_exceeded: {
    title: "Credit Limit Exceeded",
    template:
      "Credit limit exceeded! Current utilization: {{utilizationPercentage}}%. No new orders can be placed until payment is made.",
    channels: ["email", "sms", "dashboard"] as NotificationChannel[],
    priority: "critical" as NotificationPriority,
  },
};

// Create payment initiated notification
export function createPaymentInitiatedNotification(
  payment: PaymentTransaction,
  recipientId: string,
): TenantNotification {
  const template = PAYMENT_NOTIFICATION_TEMPLATES.payment_initiated;

  return {
    id: `notif_payment_init_${Date.now()}`,
    tenantId: payment.tenantId,
    type: "system",
    category: "financial",
    priority: template.priority,
    title: template.title,
    message: template.template
      .replace("{{amount}}", `₹${payment.amount.toLocaleString()}`)
      .replace("{{invoiceNumber}}", payment.invoiceNumber)
      .replace("{{gateway}}", payment.gateway.toUpperCase()),
    channels: template.channels,
    recipients: [
      {
        type: "user",
        identifier: recipientId,
      },
    ],
    status: "sent",
    scheduledAt: new Date().toISOString(),
    sentAt: new Date().toISOString(),
    metadata: {
      paymentId: payment.id,
      transactionId: payment.transactionId,
      invoiceId: payment.invoiceId,
      amount: payment.amount,
      gateway: payment.gateway,
    },
    actions: [
      {
        id: "view_payment",
        label: "View Payment",
        type: "internal_link",
        url: `/finance/payments?payment=${payment.id}`,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "payment_system",
  };
}

// Create payment completed notification
export function createPaymentCompletedNotification(
  payment: PaymentTransaction,
  recipientId: string,
): TenantNotification {
  const template = PAYMENT_NOTIFICATION_TEMPLATES.payment_completed;

  return {
    id: `notif_payment_success_${Date.now()}`,
    tenantId: payment.tenantId,
    type: "system",
    category: "financial",
    priority: template.priority,
    title: template.title,
    message: template.template
      .replace("{{amount}}", `₹${payment.amount.toLocaleString()}`)
      .replace("{{invoiceNumber}}", payment.invoiceNumber)
      .replace("{{transactionId}}", payment.transactionId),
    channels: template.channels,
    recipients: [
      {
        type: "user",
        identifier: recipientId,
      },
    ],
    status: "sent",
    scheduledAt: new Date().toISOString(),
    sentAt: new Date().toISOString(),
    metadata: {
      paymentId: payment.id,
      transactionId: payment.transactionId,
      invoiceId: payment.invoiceId,
      amount: payment.amount,
      gateway: payment.gateway,
      bankReference: payment.gatewayResponse?.bankReference,
    },
    actions: [
      {
        id: "view_payment",
        label: "View Payment",
        type: "internal_link",
        url: `/finance/payments?payment=${payment.id}`,
      },
      {
        id: "download_receipt",
        label: "Download Receipt",
        type: "download",
        url: `/api/payments/${payment.id}/receipt`,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "payment_system",
  };
}

// Create payment failed notification
export function createPaymentFailedNotification(
  payment: PaymentTransaction,
  recipientId: string,
  reason: string,
): TenantNotification {
  const template = PAYMENT_NOTIFICATION_TEMPLATES.payment_failed;

  return {
    id: `notif_payment_failed_${Date.now()}`,
    tenantId: payment.tenantId,
    type: "alert",
    category: "financial",
    priority: template.priority,
    title: template.title,
    message: template.template
      .replace("{{amount}}", `₹${payment.amount.toLocaleString()}`)
      .replace("{{invoiceNumber}}", payment.invoiceNumber)
      .replace("{{reason}}", reason),
    channels: template.channels,
    recipients: [
      {
        type: "user",
        identifier: recipientId,
      },
    ],
    status: "sent",
    scheduledAt: new Date().toISOString(),
    sentAt: new Date().toISOString(),
    metadata: {
      paymentId: payment.id,
      transactionId: payment.transactionId,
      invoiceId: payment.invoiceId,
      amount: payment.amount,
      gateway: payment.gateway,
      failureReason: reason,
    },
    actions: [
      {
        id: "retry_payment",
        label: "Retry Payment",
        type: "internal_link",
        url: `/finance/invoices?invoice=${payment.invoiceId}&action=pay`,
      },
      {
        id: "contact_support",
        label: "Contact Support",
        type: "external_link",
        url: "/support",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "payment_system",
  };
}

// Create reconciliation mismatch notification
export function createReconciliationMismatchNotification(
  payment: PaymentTransaction,
  recipientId: string,
): TenantNotification {
  const template = PAYMENT_NOTIFICATION_TEMPLATES.reconciliation_mismatch;

  return {
    id: `notif_reconcile_mismatch_${Date.now()}`,
    tenantId: payment.tenantId,
    type: "task",
    category: "financial",
    priority: template.priority,
    title: template.title,
    message: template.template.replace(
      "{{transactionId}}",
      payment.transactionId,
    ),
    channels: template.channels,
    recipients: [
      {
        type: "role",
        identifier: "finance_manager",
      },
    ],
    status: "sent",
    scheduledAt: new Date().toISOString(),
    sentAt: new Date().toISOString(),
    metadata: {
      paymentId: payment.id,
      transactionId: payment.transactionId,
      reconciliationStatus: payment.reconciliation.status,
      discrepancies: payment.reconciliation.discrepancies,
    },
    actions: [
      {
        id: "review_reconciliation",
        label: "Review Reconciliation",
        type: "internal_link",
        url: `/finance/payments/reconciliation?payment=${payment.id}`,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "reconciliation_system",
  };
}

// Create late payment reminder notification
export function createLatePaymentReminderNotification(
  alert: LatePaymentAlert,
  recipientId: string,
): TenantNotification {
  const template = PAYMENT_NOTIFICATION_TEMPLATES.late_payment_reminder;

  return {
    id: `notif_late_payment_${Date.now()}`,
    tenantId: alert.tenantId,
    type: "reminder",
    category: "financial",
    priority: template.priority,
    title: template.title,
    message: template.template
      .replace("{{invoiceNumber}}", alert.invoiceId)
      .replace("{{daysOverdue}}", alert.daysOverdue.toString())
      .replace("{{amount}}", `₹${alert.overdueAmount.toLocaleString()}`),
    channels: template.channels,
    recipients: [
      {
        type: "user",
        identifier: recipientId,
      },
    ],
    status: "sent",
    scheduledAt: new Date().toISOString(),
    sentAt: new Date().toISOString(),
    metadata: {
      alertId: alert.id,
      invoiceId: alert.invoiceId,
      daysOverdue: alert.daysOverdue,
      overdueAmount: alert.overdueAmount,
      alertLevel: alert.alertLevel,
    },
    actions: [
      {
        id: "pay_invoice",
        label: "Pay Now",
        type: "internal_link",
        url: `/finance/invoices?invoice=${alert.invoiceId}&action=pay`,
      },
      {
        id: "view_invoice",
        label: "View Invoice",
        type: "internal_link",
        url: `/finance/invoices?invoice=${alert.invoiceId}`,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "collection_system",
  };
}

// Create credit limit warning notification
export function createCreditLimitWarningNotification(
  creditLimit: CreditLimit,
  recipientId: string,
): TenantNotification {
  const template = PAYMENT_NOTIFICATION_TEMPLATES.credit_limit_warning;

  return {
    id: `notif_credit_warning_${Date.now()}`,
    tenantId: creditLimit.tenantId,
    type: "warning",
    category: "financial",
    priority: template.priority,
    title: template.title,
    message: template.template
      .replace(
        "{{utilizationPercentage}}",
        Math.round(creditLimit.utilizationPercentage).toString(),
      )
      .replace(
        "{{availableCredit}}",
        `₹${creditLimit.availableLimit.toLocaleString()}`,
      ),
    channels: template.channels,
    recipients: [
      {
        type: "user",
        identifier: recipientId,
      },
    ],
    status: "sent",
    scheduledAt: new Date().toISOString(),
    sentAt: new Date().toISOString(),
    metadata: {
      creditLimitId: creditLimit.id,
      utilizationPercentage: creditLimit.utilizationPercentage,
      availableLimit: creditLimit.availableLimit,
      totalLimit: creditLimit.totalLimit,
      warningThreshold: creditLimit.warningThreshold,
    },
    actions: [
      {
        id: "view_credit_status",
        label: "View Credit Status",
        type: "internal_link",
        url: `/finance/payments/credit`,
      },
      {
        id: "make_payment",
        label: "Make Payment",
        type: "internal_link",
        url: `/finance/payments/invoices`,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "credit_system",
  };
}

// Create credit limit exceeded notification
export function createCreditLimitExceededNotification(
  creditLimit: CreditLimit,
  recipientId: string,
): TenantNotification {
  const template = PAYMENT_NOTIFICATION_TEMPLATES.credit_limit_exceeded;

  return {
    id: `notif_credit_exceeded_${Date.now()}`,
    tenantId: creditLimit.tenantId,
    type: "alert",
    category: "financial",
    priority: template.priority,
    title: template.title,
    message: template.template.replace(
      "{{utilizationPercentage}}",
      Math.round(creditLimit.utilizationPercentage).toString(),
    ),
    channels: template.channels,
    recipients: [
      {
        type: "user",
        identifier: recipientId,
      },
      {
        type: "role",
        identifier: "finance_manager",
      },
    ],
    status: "sent",
    scheduledAt: new Date().toISOString(),
    sentAt: new Date().toISOString(),
    metadata: {
      creditLimitId: creditLimit.id,
      utilizationPercentage: creditLimit.utilizationPercentage,
      totalLimit: creditLimit.totalLimit,
      blockingThreshold: creditLimit.blockingThreshold,
      action: "account_blocked",
    },
    actions: [
      {
        id: "urgent_payment",
        label: "Make Urgent Payment",
        type: "internal_link",
        url: `/finance/payments/invoices?urgent=true`,
      },
      {
        id: "contact_finance",
        label: "Contact Finance Team",
        type: "external_link",
        url: "/contact/finance",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "credit_system",
  };
}

// Payment notification workflow orchestrator
export class PaymentNotificationWorkflow {
  static async processPaymentEvent(
    event: PaymentNotificationEvent,
    data: any,
    recipientId: string,
  ): Promise<TenantNotification | null> {
    try {
      switch (event) {
        case "payment_initiated":
          return createPaymentInitiatedNotification(
            data as PaymentTransaction,
            recipientId,
          );

        case "payment_completed":
          return createPaymentCompletedNotification(
            data as PaymentTransaction,
            recipientId,
          );

        case "payment_failed":
          return createPaymentFailedNotification(
            data.payment as PaymentTransaction,
            recipientId,
            data.reason,
          );

        case "reconciliation_mismatch":
          return createReconciliationMismatchNotification(
            data as PaymentTransaction,
            recipientId,
          );

        case "late_payment_reminder":
          return createLatePaymentReminderNotification(
            data as LatePaymentAlert,
            recipientId,
          );

        case "credit_limit_warning":
          return createCreditLimitWarningNotification(
            data as CreditLimit,
            recipientId,
          );

        case "credit_limit_exceeded":
          return createCreditLimitExceededNotification(
            data as CreditLimit,
            recipientId,
          );

        default:
          console.warn(`Unknown payment notification event: ${event}`);
          return null;
      }
    } catch (error) {
      console.error(
        `Error processing payment notification event ${event}:`,
        error,
      );
      return null;
    }
  }

  static async scheduleRecurringReminders(
    alert: LatePaymentAlert,
    recipientId: string,
  ): Promise<TenantNotification[]> {
    const notifications: TenantNotification[] = [];

    // Schedule reminder at different intervals based on alert level
    const reminderSchedule = [
      { days: 1, level: 1 },
      { days: 3, level: 2 },
      { days: 7, level: 3 },
      { days: 14, level: 4 },
      { days: 30, level: 5 },
    ];

    for (const reminder of reminderSchedule) {
      if (alert.alertLevel >= reminder.level) {
        const notification = createLatePaymentReminderNotification(
          alert,
          recipientId,
        );
        notification.scheduledAt = new Date(
          Date.now() + reminder.days * 24 * 60 * 60 * 1000,
        ).toISOString();
        notification.status = "scheduled";
        notifications.push(notification);
      }
    }

    return notifications;
  }
}

// Integration with existing notification system
export function integratePaymentNotifications() {
  // This function would be called during app initialization
  // to register payment notification handlers with the main notification system

  console.log(
    "Payment notification system integrated with main notification workflow",
  );

  // Return notification templates for registration
  return {
    templates: PAYMENT_NOTIFICATION_TEMPLATES,
    workflow: PaymentNotificationWorkflow,
  };
}

export default PaymentNotificationWorkflow;
