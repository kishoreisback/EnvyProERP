// Notification Management Mock Data

import {
  NotificationItem,
  NotificationPreferences,
  NotificationAnalytics,
  NotificationTemplate,
  NotificationSystemConfig,
} from "./notification-management-types";

// Mock Notifications for Corporate Users
export const mockCorporateNotifications: NotificationItem[] = [
  {
    id: "NOTIF001",
    type: "approval_request",
    category: "operational",
    title: "Purchase Order Approval Required",
    message:
      "PO-2024-003 from Mumbai Central Beverages requires your approval. Value: ₹75,500",
    createdAt: "2024-02-15T09:30:00Z",
    status: "pending",
    priority: "high",
    senderId: "FRAN001",
    senderName: "Mumbai Central Beverages",
    senderType: "franchisee",
    recipientId: "CORP001",
    recipientName: "Corporate Reviewer",
    recipientType: "corporate",
    content: {
      shortText: "PO approval needed - ₹75,500",
      fullText:
        "Purchase Order PO-2024-003 from Mumbai Central Beverages requires your approval. The order contains 15 items with a total value of ₹75,500. Please review the items and delivery requirements.",
      variables: {
        poNumber: "PO-2024-003",
        franchiseeName: "Mumbai Central Beverages",
        amount: "₹75,500",
        itemCount: "15",
      },
    },
    actions: [
      {
        id: "ACT001",
        label: "Review Order",
        type: "button",
        style: "primary",
        action: {
          type: "navigate",
          target: "/corporate-po-review/pending",
        },
        visible: true,
        enabled: true,
      },
      {
        id: "ACT002",
        label: "Quick Approve",
        type: "approve",
        style: "success",
        action: {
          type: "api_call",
          target: "/api/po/approve",
          method: "POST",
          payload: { poId: "PO-2024-003" },
        },
        confirmation: {
          required: true,
          title: "Approve Purchase Order",
          message: "Are you sure you want to approve PO-2024-003 for ₹75,500?",
          confirmText: "Approve",
          cancelText: "Cancel",
        },
        visible: true,
        enabled: true,
      },
    ],
    attachments: [
      {
        id: "ATT001",
        fileName: "PO-2024-003.pdf",
        fileType: "application/pdf",
        fileSize: 245760,
        filePath: "/attachments/po/PO-2024-003.pdf",
        downloadUrl: "/api/download/ATT001",
        description: "Purchase Order Document",
      },
    ],
    channels: ["in_app", "email"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "delivered",
        timestamp: "2024-02-15T09:30:00Z",
      },
      {
        channel: "email",
        status: "delivered",
        timestamp: "2024-02-15T09:31:00Z",
      },
    ],
    relatedEntity: {
      type: "purchase_order",
      id: "PO-2024-003",
      name: "PO-2024-003",
      url: "/corporate-po-review/pending?po=PO-2024-003",
    },
    tags: ["urgent", "high-value", "approval"],
  },
  {
    id: "NOTIF002",
    type: "delivery_update",
    category: "operational",
    title: "Delivery Completed Successfully",
    message: "Order PO-2024-002 has been delivered to Mumbai Central Beverages",
    createdAt: "2024-02-15T11:45:00Z",
    status: "read",
    priority: "medium",
    readAt: "2024-02-15T12:00:00Z",
    senderId: "SYSTEM",
    senderName: "Delivery System",
    senderType: "system",
    recipientId: "CORP001",
    recipientName: "Corporate Manager",
    recipientType: "corporate",
    content: {
      shortText: "Delivery completed - PO-2024-002",
      fullText:
        "Order PO-2024-002 has been successfully delivered to Mumbai Central Beverages. The delivery was completed on time with all items in good condition. GRN is pending.",
      variables: {
        poNumber: "PO-2024-002",
        franchiseeName: "Mumbai Central Beverages",
        deliveryStatus: "Completed",
        deliveryTime: "11:15 AM",
      },
    },
    actions: [
      {
        id: "ACT003",
        label: "View GRN",
        type: "button",
        style: "primary",
        action: {
          type: "navigate",
          target: "/delivery-logistics/grn",
        },
        visible: true,
        enabled: true,
      },
    ],
    attachments: [],
    channels: ["in_app", "email"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "delivered",
        timestamp: "2024-02-15T11:45:00Z",
      },
      {
        channel: "email",
        status: "delivered",
        timestamp: "2024-02-15T11:45:30Z",
      },
    ],
    relatedEntity: {
      type: "delivery",
      id: "DS002",
      name: "Delivery DS002",
      url: "/delivery-logistics/delivery?delivery=DS002",
    },
    tags: ["delivery", "completed"],
  },
  {
    id: "NOTIF003",
    type: "quality_issue",
    category: "quality",
    title: "Quality Issue Reported",
    message: "Quality discrepancy reported for GRN-2024-001 - 2 items damaged",
    createdAt: "2024-02-15T14:20:00Z",
    status: "acknowledged",
    priority: "high",
    acknowledgedAt: "2024-02-15T14:25:00Z",
    senderId: "FRAN001",
    senderName: "Mumbai Central Beverages",
    senderType: "franchisee",
    recipientId: "CORP001",
    recipientName: "Quality Manager",
    recipientType: "corporate",
    content: {
      shortText: "Quality issue - GRN-2024-001",
      fullText:
        "A quality discrepancy has been reported for GRN-2024-001. 2 items were found damaged during inspection. Photos and detailed report are attached. Please review and provide resolution instructions.",
      variables: {
        grnNumber: "GRN-2024-001",
        issueCount: "2",
        issueType: "Damaged items",
        reportedBy: "Rajesh Kumar",
      },
    },
    actions: [
      {
        id: "ACT004",
        label: "Review Issue",
        type: "button",
        style: "warning",
        action: {
          type: "navigate",
          target: "/delivery-logistics/grn?grn=GRN-2024-001",
        },
        visible: true,
        enabled: true,
      },
      {
        id: "ACT005",
        label: "Contact Supplier",
        type: "button",
        style: "secondary",
        action: {
          type: "modal",
          target: "contact-supplier-modal",
        },
        visible: true,
        enabled: true,
      },
    ],
    attachments: [
      {
        id: "ATT002",
        fileName: "damage_report.pdf",
        fileType: "application/pdf",
        fileSize: 156789,
        filePath: "/attachments/quality/damage_report.pdf",
        downloadUrl: "/api/download/ATT002",
        description: "Quality Issue Report",
      },
      {
        id: "ATT003",
        fileName: "damage_photos.zip",
        fileType: "application/zip",
        fileSize: 2456789,
        filePath: "/attachments/quality/damage_photos.zip",
        downloadUrl: "/api/download/ATT003",
        description: "Damage Evidence Photos",
      },
    ],
    channels: ["in_app", "email", "sms"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "delivered",
        timestamp: "2024-02-15T14:20:00Z",
      },
      {
        channel: "email",
        status: "delivered",
        timestamp: "2024-02-15T14:20:30Z",
      },
      {
        channel: "sms",
        status: "delivered",
        timestamp: "2024-02-15T14:21:00Z",
      },
    ],
    relatedEntity: {
      type: "grn",
      id: "GRN-2024-001",
      name: "GRN-2024-001",
      url: "/delivery-logistics/grn?grn=GRN-2024-001",
    },
    tags: ["quality", "urgent", "supplier-issue"],
  },
  {
    id: "NOTIF004",
    type: "system_announcement",
    category: "system",
    title: "System Maintenance Scheduled",
    message:
      "Scheduled maintenance on Feb 18, 2024 from 2:00 AM to 4:00 AM IST",
    createdAt: "2024-02-15T16:00:00Z",
    status: "delivered",
    priority: "medium",
    senderId: "ADMIN",
    senderName: "System Administrator",
    senderType: "admin",
    recipientId: "ALL_CORPORATE",
    recipientName: "All Corporate Users",
    recipientType: "corporate",
    content: {
      shortText: "Maintenance: Feb 18, 2-4 AM",
      fullText:
        "We have scheduled system maintenance on February 18, 2024 from 2:00 AM to 4:00 AM IST. During this time, the system will be temporarily unavailable. Please plan your activities accordingly.",
      variables: {
        maintenanceDate: "February 18, 2024",
        startTime: "2:00 AM IST",
        endTime: "4:00 AM IST",
        duration: "2 hours",
      },
    },
    actions: [],
    attachments: [],
    channels: ["in_app", "email"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "delivered",
        timestamp: "2024-02-15T16:00:00Z",
      },
      {
        channel: "email",
        status: "delivered",
        timestamp: "2024-02-15T16:00:30Z",
      },
    ],
    tags: ["maintenance", "system", "announcement"],
  },
];

// Mock Notifications for Franchisee Users
export const mockFranchiseeNotifications: NotificationItem[] = [
  {
    id: "NOTIF101",
    type: "order_status",
    category: "operational",
    title: "Purchase Order Approved",
    message:
      "Your purchase order PO-2024-003 has been approved and is being processed",
    createdAt: "2024-02-15T10:15:00Z",
    status: "read",
    priority: "high",
    readAt: "2024-02-15T10:20:00Z",
    senderId: "CORP001",
    senderName: "Corporate Reviewer",
    senderType: "corporate",
    recipientId: "FRAN001",
    recipientName: "Mumbai Central Beverages",
    recipientType: "franchisee",
    content: {
      shortText: "PO-2024-003 approved",
      fullText:
        "Great news! Your purchase order PO-2024-003 for ₹75,500 has been approved by the corporate team. Processing will begin shortly and delivery is scheduled for February 20, 2024.",
      variables: {
        poNumber: "PO-2024-003",
        amount: "₹75,500",
        deliveryDate: "February 20, 2024",
        approvedBy: "Corporate Reviewer",
      },
    },
    actions: [
      {
        id: "ACT101",
        label: "Track Order",
        type: "button",
        style: "primary",
        action: {
          type: "navigate",
          target: "/franchisee-purchase-order/orders?po=PO-2024-003",
        },
        visible: true,
        enabled: true,
      },
      {
        id: "ACT102",
        label: "Schedule Delivery",
        type: "button",
        style: "secondary",
        action: {
          type: "navigate",
          target: "/delivery-logistics/delivery?po=PO-2024-003",
        },
        visible: true,
        enabled: true,
      },
    ],
    attachments: [],
    channels: ["in_app", "email", "whatsapp"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "delivered",
        timestamp: "2024-02-15T10:15:00Z",
      },
      {
        channel: "email",
        status: "delivered",
        timestamp: "2024-02-15T10:15:30Z",
      },
      {
        channel: "whatsapp",
        status: "delivered",
        timestamp: "2024-02-15T10:16:00Z",
      },
    ],
    relatedEntity: {
      type: "purchase_order",
      id: "PO-2024-003",
      name: "PO-2024-003",
      url: "/franchisee-purchase-order/orders?po=PO-2024-003",
    },
    tags: ["approved", "order", "processing"],
  },
  {
    id: "NOTIF102",
    type: "delivery_update",
    category: "operational",
    title: "Delivery Scheduled",
    message:
      "Your order PO-2024-002 is scheduled for delivery tomorrow at 10:00 AM",
    createdAt: "2024-02-15T15:30:00Z",
    status: "pending",
    priority: "medium",
    senderId: "SYSTEM",
    senderName: "Logistics System",
    senderType: "system",
    recipientId: "FRAN001",
    recipientName: "Mumbai Central Beverages",
    recipientType: "franchisee",
    content: {
      shortText: "Delivery tomorrow 10:00 AM",
      fullText:
        "Your order PO-2024-002 is scheduled for delivery tomorrow, February 16, 2024 at 10:00 AM. Driver: Arun Patel (98765-12345). Vehicle: MH-01-AB-1234. Please ensure someone is available to receive the delivery.",
      variables: {
        poNumber: "PO-2024-002",
        deliveryDate: "February 16, 2024",
        deliveryTime: "10:00 AM",
        driverName: "Arun Patel",
        driverPhone: "98765-12345",
        vehicleNumber: "MH-01-AB-1234",
      },
    },
    actions: [
      {
        id: "ACT103",
        label: "Confirm Availability",
        type: "approve",
        style: "success",
        action: {
          type: "api_call",
          target: "/api/delivery/confirm",
          method: "POST",
          payload: { deliveryId: "DS002" },
        },
        visible: true,
        enabled: true,
      },
      {
        id: "ACT104",
        label: "Reschedule",
        type: "reschedule",
        style: "secondary",
        action: {
          type: "modal",
          target: "reschedule-delivery-modal",
        },
        visible: true,
        enabled: true,
      },
      {
        id: "ACT105",
        label: "Contact Driver",
        type: "link",
        style: "info",
        action: {
          type: "external_link",
          target: "tel:+919876512345",
        },
        visible: true,
        enabled: true,
      },
    ],
    attachments: [],
    channels: ["in_app", "sms", "whatsapp"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "delivered",
        timestamp: "2024-02-15T15:30:00Z",
      },
      {
        channel: "sms",
        status: "delivered",
        timestamp: "2024-02-15T15:30:30Z",
      },
      {
        channel: "whatsapp",
        status: "delivered",
        timestamp: "2024-02-15T15:31:00Z",
      },
    ],
    relatedEntity: {
      type: "delivery",
      id: "DS002",
      name: "Delivery DS002",
      url: "/delivery-logistics/delivery?delivery=DS002",
    },
    tags: ["delivery", "scheduled", "tomorrow"],
  },
  {
    id: "NOTIF103",
    type: "inventory_alert",
    category: "operational",
    title: "Low Stock Alert",
    message: "Coca-Cola 250ml stock is running low (12 units remaining)",
    createdAt: "2024-02-15T17:45:00Z",
    status: "pending",
    priority: "medium",
    senderId: "SYSTEM",
    senderName: "Inventory System",
    senderType: "system",
    recipientId: "FRAN001",
    recipientName: "Mumbai Central Beverages",
    recipientType: "franchisee",
    content: {
      shortText: "Low stock: Coca-Cola 250ml (12 units)",
      fullText:
        "Your stock for Coca-Cola 250ml is running low. Current stock: 12 units. Minimum stock level: 20 units. Consider placing a reorder to avoid stockouts.",
      variables: {
        productName: "Coca-Cola 250ml",
        currentStock: "12",
        minimumStock: "20",
        suggestedOrder: "50",
      },
    },
    actions: [
      {
        id: "ACT106",
        label: "Reorder Now",
        type: "button",
        style: "primary",
        action: {
          type: "navigate",
          target: "/franchisee-purchase-order/orders?reorder=PROD001",
        },
        visible: true,
        enabled: true,
      },
      {
        id: "ACT107",
        label: "Update Stock",
        type: "button",
        style: "secondary",
        action: {
          type: "navigate",
          target: "/franchisee-inventory?product=PROD001",
        },
        visible: true,
        enabled: true,
      },
    ],
    attachments: [],
    channels: ["in_app", "email"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "delivered",
        timestamp: "2024-02-15T17:45:00Z",
      },
      {
        channel: "email",
        status: "delivered",
        timestamp: "2024-02-15T17:45:30Z",
      },
    ],
    relatedEntity: {
      type: "inventory",
      id: "PROD001",
      name: "Coca-Cola 250ml",
      url: "/franchisee-inventory?product=PROD001",
    },
    tags: ["inventory", "low-stock", "reorder"],
  },
  {
    id: "NOTIF104",
    type: "payment_reminder",
    category: "financial",
    title: "Payment Due Reminder",
    message: "Invoice INV-2024-015 payment is due tomorrow (₹32,205)",
    createdAt: "2024-02-15T18:00:00Z",
    status: "pending",
    priority: "high",
    senderId: "SYSTEM",
    senderName: "Finance System",
    senderType: "system",
    recipientId: "FRAN001",
    recipientName: "Mumbai Central Beverages",
    recipientType: "franchisee",
    content: {
      shortText: "Payment due tomorrow: ₹32,205",
      fullText:
        "This is a reminder that payment for Invoice INV-2024-015 (₹32,205) is due tomorrow, February 16, 2024. Please make the payment to avoid any late fees.",
      variables: {
        invoiceNumber: "INV-2024-015",
        amount: "₹32,205",
        dueDate: "February 16, 2024",
        paymentMethods: "Bank Transfer, UPI",
      },
    },
    actions: [
      {
        id: "ACT108",
        label: "Pay Now",
        type: "button",
        style: "success",
        action: {
          type: "navigate",
          target: "/finance/invoices?pay=INV-2024-015",
        },
        visible: true,
        enabled: true,
      },
      {
        id: "ACT109",
        label: "View Invoice",
        type: "view_details",
        style: "secondary",
        action: {
          type: "navigate",
          target: "/finance/invoices?invoice=INV-2024-015",
        },
        visible: true,
        enabled: true,
      },
    ],
    attachments: [
      {
        id: "ATT104",
        fileName: "INV-2024-015.pdf",
        fileType: "application/pdf",
        fileSize: 187456,
        filePath: "/attachments/invoices/INV-2024-015.pdf",
        downloadUrl: "/api/download/ATT104",
        description: "Invoice Document",
      },
    ],
    channels: ["in_app", "email", "sms"],
    deliveryStatus: [
      {
        channel: "in_app",
        status: "delivered",
        timestamp: "2024-02-15T18:00:00Z",
      },
      {
        channel: "email",
        status: "delivered",
        timestamp: "2024-02-15T18:00:30Z",
      },
      {
        channel: "sms",
        status: "delivered",
        timestamp: "2024-02-15T18:01:00Z",
      },
    ],
    relatedEntity: {
      type: "invoice",
      id: "INV-2024-015",
      name: "INV-2024-015",
      url: "/finance/invoices?invoice=INV-2024-015",
    },
    tags: ["payment", "due", "urgent"],
  },
];

// Mock Notification Preferences
export const mockNotificationPreferences: NotificationPreferences = {
  userId: "FRAN001",
  userType: "franchisee",
  globalEnabled: true,
  doNotDisturbEnabled: true,
  doNotDisturbSchedule: {
    enabled: true,
    timeZone: "Asia/Kolkata",
    dailySchedule: [
      {
        dayOfWeek: "Monday",
        startTime: "22:00",
        endTime: "08:00",
        enabled: true,
      },
      {
        dayOfWeek: "Sunday",
        startTime: "00:00",
        endTime: "23:59",
        enabled: true,
      },
    ],
    dateRanges: [],
    emergencyOverride: true,
  },
  channelPreferences: {
    inApp: {
      enabled: true,
      types: [
        "order_status",
        "delivery_update",
        "inventory_alert",
        "payment_reminder",
        "emergency_alert",
      ],
      priorities: ["high", "urgent", "critical"],
    },
    email: {
      enabled: true,
      types: [
        "order_status",
        "delivery_update",
        "payment_reminder",
        "system_announcement",
      ],
      priorities: ["medium", "high", "urgent"],
      quietHours: {
        enabled: true,
        startTime: "22:00",
        endTime: "08:00",
        emergencyOverride: true,
      },
    },
    sms: {
      enabled: true,
      types: ["delivery_update", "payment_reminder", "emergency_alert"],
      priorities: ["high", "urgent", "critical"],
    },
    whatsapp: {
      enabled: true,
      types: ["delivery_update", "order_status"],
      priorities: ["medium", "high"],
    },
    push: {
      enabled: false,
      types: [],
      priorities: [],
    },
  },
  categoryPreferences: {
    operational: {
      enabled: true,
      priority: "high",
      channels: ["in_app", "email", "whatsapp"],
      autoActions: [],
    },
    financial: {
      enabled: true,
      priority: "high",
      channels: ["in_app", "email", "sms"],
      autoActions: [],
    },
    quality: {
      enabled: true,
      priority: "urgent",
      channels: ["in_app", "email", "sms"],
      autoActions: [],
    },
    compliance: {
      enabled: true,
      priority: "high",
      channels: ["in_app", "email"],
      autoActions: [],
    },
    system: {
      enabled: true,
      priority: "medium",
      channels: ["in_app", "email"],
      autoActions: [
        {
          condition: "type=system_announcement",
          action: "auto_read",
          delay: 1440, // 24 hours
        },
      ],
    },
    promotional: {
      enabled: false,
      priority: "low",
      channels: ["email"],
      autoActions: [],
    },
    emergency: {
      enabled: true,
      priority: "critical",
      channels: ["in_app", "email", "sms", "whatsapp"],
      autoActions: [],
    },
    informational: {
      enabled: true,
      priority: "low",
      channels: ["in_app"],
      autoActions: [
        {
          condition: "priority=low",
          action: "auto_read",
          delay: 10080, // 7 days
        },
      ],
    },
  },
  frequency: "immediate",
  digest: {
    enabled: false,
    frequency: "daily",
    deliveryTime: "09:00",
    channels: ["email"],
    includeCategories: ["operational", "financial"],
    maxItems: 10,
    summaryStyle: "brief",
  },
  autoActions: {
    enabled: true,
    rules: [
      {
        id: "AUTO001",
        name: "Auto-acknowledge delivery confirmations",
        conditions: [
          {
            field: "type",
            operator: "equals",
            value: "delivery_update",
          },
          {
            field: "message",
            operator: "contains",
            value: "delivered successfully",
          },
        ],
        actions: [
          {
            type: "acknowledge",
            parameters: {},
            delay: 5,
          },
        ],
        enabled: true,
        priority: 1,
      },
    ],
  },
  lastUpdated: "2024-02-15T18:00:00Z",
  updatedBy: "FRAN001",
};

// Mock Analytics
export const mockNotificationAnalytics: NotificationAnalytics = {
  totalSent: 1456,
  totalDelivered: 1398,
  totalRead: 1156,
  totalClicked: 823,
  deliveryRate: 96.0,
  readRate: 82.7,
  clickRate: 71.2,
  responseTime: 45.6, // minutes
  channelMetrics: [
    {
      channel: "in_app",
      sent: 1456,
      delivered: 1456,
      read: 1156,
      clicked: 823,
      failed: 0,
      deliveryRate: 100.0,
      readRate: 79.4,
      clickRate: 71.2,
      averageResponseTime: 23.4,
    },
    {
      channel: "email",
      sent: 1298,
      delivered: 1245,
      read: 987,
      clicked: 456,
      failed: 53,
      deliveryRate: 95.9,
      readRate: 79.3,
      clickRate: 46.2,
      averageResponseTime: 67.8,
    },
    {
      channel: "sms",
      sent: 467,
      delivered: 456,
      read: 398,
      clicked: 234,
      failed: 11,
      deliveryRate: 97.6,
      readRate: 87.3,
      clickRate: 58.8,
      averageResponseTime: 12.3,
    },
    {
      channel: "whatsapp",
      sent: 234,
      delivered: 228,
      read: 201,
      clicked: 145,
      failed: 6,
      deliveryRate: 97.4,
      readRate: 88.2,
      clickRate: 72.1,
      averageResponseTime: 18.7,
    },
  ],
  categoryMetrics: [
    {
      category: "operational",
      sent: 567,
      read: 498,
      acknowledged: 456,
      dismissed: 23,
      averageEngagement: 87.8,
      topTypes: [
        { type: "order_status", count: 234, engagement: 92.3 },
        { type: "delivery_update", count: 198, engagement: 89.4 },
        { type: "inventory_alert", count: 135, engagement: 78.5 },
      ],
    },
    {
      category: "financial",
      sent: 198,
      read: 187,
      acknowledged: 167,
      dismissed: 8,
      averageEngagement: 94.4,
      topTypes: [
        { type: "payment_reminder", count: 156, engagement: 95.5 },
        { type: "invoice_generated", count: 42, engagement: 91.7 },
      ],
    },
    {
      category: "quality",
      sent: 23,
      read: 23,
      acknowledged: 21,
      dismissed: 0,
      averageEngagement: 100.0,
      topTypes: [{ type: "quality_issue", count: 23, engagement: 100.0 }],
    },
  ],
  hourlyMetrics: Array.from({ length: 24 }, (_, hour) => ({
    hour,
    sent: Math.floor(Math.random() * 100) + 20,
    delivered: Math.floor(Math.random() * 95) + 18,
    read: Math.floor(Math.random() * 80) + 15,
    engagement: Math.random() * 30 + 70,
  })),
  dailyMetrics: Array.from({ length: 30 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - index));
    return {
      date: date.toISOString().split("T")[0],
      sent: Math.floor(Math.random() * 200) + 50,
      delivered: Math.floor(Math.random() * 190) + 45,
      read: Math.floor(Math.random() * 160) + 40,
      clicked: Math.floor(Math.random() * 120) + 30,
      engagement: Math.random() * 20 + 75,
    };
  }),
  weeklyTrends: [
    {
      week: "Week 6",
      sent: 456,
      engagement: 85.3,
      growth: 12.5,
      topCategories: ["operational", "financial"],
    },
    {
      week: "Week 5",
      sent: 398,
      engagement: 82.1,
      growth: 8.7,
      topCategories: ["operational", "quality"],
    },
  ],
  userEngagement: [
    {
      userId: "FRAN001",
      userName: "Mumbai Central Beverages",
      userType: "franchisee",
      totalReceived: 287,
      totalRead: 245,
      totalClicked: 189,
      averageResponseTime: 34.5,
      engagementScore: 87.8,
      preferredChannels: ["in_app", "whatsapp", "sms"],
    },
    {
      userId: "CORP001",
      userName: "Corporate Manager",
      userType: "corporate",
      totalReceived: 156,
      totalRead: 143,
      totalClicked: 98,
      averageResponseTime: 23.7,
      engagementScore: 91.7,
      preferredChannels: ["in_app", "email"],
    },
  ],
  templateMetrics: [
    {
      templateId: "TPL001",
      templateName: "Order Status Update",
      sent: 234,
      delivered: 230,
      read: 198,
      clicked: 156,
      conversionRate: 78.8,
      averageEngagement: 84.6,
    },
    {
      templateId: "TPL002",
      templateName: "Payment Reminder",
      sent: 156,
      delivered: 152,
      read: 145,
      clicked: 134,
      conversionRate: 92.4,
      averageEngagement: 95.4,
    },
  ],
};

// Helper Functions
export const getNotificationStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    sent: "bg-blue-100 text-blue-800",
    delivered: "bg-cyan-100 text-cyan-800",
    read: "bg-green-100 text-green-800",
    acknowledged: "bg-teal-100 text-teal-800",
    dismissed: "bg-gray-100 text-gray-800",
    failed: "bg-red-100 text-red-800",
    expired: "bg-orange-100 text-orange-800",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
};

export const getPriorityColor = (priority: string) => {
  const priorityColors: Record<string, string> = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
    critical: "bg-red-500 text-white",
  };
  return priorityColors[priority] || "bg-gray-100 text-gray-800";
};

export const getCategoryColor = (category: string) => {
  const categoryColors: Record<string, string> = {
    operational: "bg-blue-100 text-blue-800",
    financial: "bg-green-100 text-green-800",
    quality: "bg-purple-100 text-purple-800",
    compliance: "bg-indigo-100 text-indigo-800",
    system: "bg-gray-100 text-gray-800",
    promotional: "bg-pink-100 text-pink-800",
    emergency: "bg-red-100 text-red-800",
    informational: "bg-cyan-100 text-cyan-800",
  };
  return categoryColors[category] || "bg-gray-100 text-gray-800";
};

export const formatNotificationTime = (timestamp: string) => {
  const now = new Date();
  const notificationTime = new Date(timestamp);
  const diffMs = now.getTime() - notificationTime.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return notificationTime.toLocaleDateString();
};

export const getNotificationsByUserType = (
  userType: "corporate" | "franchisee",
) => {
  return userType === "corporate"
    ? mockCorporateNotifications
    : mockFranchiseeNotifications;
};

export const markNotificationAsRead = (
  notificationId: string,
  userType: "corporate" | "franchisee",
) => {
  const notifications = getNotificationsByUserType(userType);
  const notification = notifications.find((n) => n.id === notificationId);
  if (notification && notification.status === "pending") {
    notification.status = "read";
    notification.readAt = new Date().toISOString();
  }
  return notification;
};

export const markNotificationAsAcknowledged = (
  notificationId: string,
  userType: "corporate" | "franchisee",
) => {
  const notifications = getNotificationsByUserType(userType);
  const notification = notifications.find((n) => n.id === notificationId);
  if (notification && ["pending", "read"].includes(notification.status)) {
    notification.status = "acknowledged";
    notification.acknowledgedAt = new Date().toISOString();
    if (!notification.readAt) {
      notification.readAt = new Date().toISOString();
    }
  }
  return notification;
};

export const dismissNotification = (
  notificationId: string,
  userType: "corporate" | "franchisee",
) => {
  const notifications = getNotificationsByUserType(userType);
  const notification = notifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.status = "dismissed";
    notification.dismissedAt = new Date().toISOString();
  }
  return notification;
};

export const executeNotificationAction = (
  notificationId: string,
  actionId: string,
  userType: "corporate" | "franchisee",
) => {
  const notifications = getNotificationsByUserType(userType);
  const notification = notifications.find((n) => n.id === notificationId);
  if (notification) {
    const action = notification.actions.find((a) => a.id === actionId);
    if (action) {
      action.clickedAt = new Date().toISOString();

      // Mark notification as read if not already
      if (notification.status === "pending") {
        notification.status = "read";
        notification.readAt = new Date().toISOString();
      }

      return { notification, action };
    }
  }
  return null;
};

export const getUnreadCount = (userType: "corporate" | "franchisee") => {
  const notifications = getNotificationsByUserType(userType);
  return notifications.filter((n) => n.status === "pending").length;
};

export const getHighPriorityCount = (userType: "corporate" | "franchisee") => {
  const notifications = getNotificationsByUserType(userType);
  return notifications.filter(
    (n) =>
      ["high", "urgent", "critical"].includes(n.priority) &&
      n.status === "pending",
  ).length;
};

export const filterNotifications = (
  notifications: NotificationItem[],
  filters: any,
) => {
  return notifications.filter((notification) => {
    if (filters.status && !filters.status.includes(notification.status))
      return false;
    if (filters.priority && !filters.priority.includes(notification.priority))
      return false;
    if (filters.category && !filters.category.includes(notification.category))
      return false;
    if (filters.type && !filters.type.includes(notification.type)) return false;
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      const searchableText =
        `${notification.title} ${notification.message} ${notification.senderName}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) return false;
    }
    if (filters.dateRange) {
      const notificationDate = new Date(notification.createdAt);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (notificationDate < startDate || notificationDate > endDate)
        return false;
    }
    return true;
  });
};
