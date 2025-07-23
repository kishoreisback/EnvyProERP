import {
  TenantNotification,
  NotificationTemplate,
  NotificationRule,
  TenantNotificationSettings,
  NotificationAnalytics,
  NotificationType,
  NotificationPriority,
  NotificationStatus,
  NotificationChannel,
  NotificationCategory,
} from "./types";

// Mock notifications for multiple tenants
export const mockNotifications: TenantNotification[] = [
  // Tenant 1 - BuildCorp Constructions
  {
    id: "notif_001",
    tenantId: "tenant_001",
    type: "workflow",
    priority: "high",
    status: "delivered",
    title: "Project Approval Required",
    message:
      "The Mumbai Residential Project requires your approval to proceed to the next phase.",
    description: "Budget allocation and timeline approval needed",
    recipientType: "role",
    recipients: [
      {
        id: "rec_001",
        type: "role",
        identifier: "project_manager",
        name: "Project Managers",
        status: "delivered",
        sentAt: "2024-01-25T10:30:00Z",
        deliveredAt: "2024-01-25T10:31:00Z",
      },
    ],
    channels: ["in_app", "email"],
    scheduledAt: "2024-01-25T10:30:00Z",
    sentAt: "2024-01-25T10:30:00Z",
    deliveredAt: "2024-01-25T10:31:00Z",
    workflowId: "workflow_001",
    workflowStepId: "step_approval_001",
    triggeredBy: "workflow",
    metadata: {
      projectId: "proj_001",
      projectName: "Mumbai Residential Complex",
      budgetAmount: 50000000,
    },
    tags: ["project", "approval", "urgent"],
    category: "project_management",
    actions: [
      {
        id: "action_001",
        type: "approve",
        label: "Approve",
        style: "primary",
      },
      {
        id: "action_002",
        type: "reject",
        label: "Reject",
        style: "danger",
      },
    ],
    openCount: 3,
    clickCount: 1,
    createdBy: "system",
    createdAt: "2024-01-25T10:30:00Z",
    updatedAt: "2024-01-25T10:31:00Z",
    permissions: {
      canEdit: false,
      canDelete: false,
      canResend: true,
    },
  },
  {
    id: "notif_002",
    tenantId: "tenant_001",
    type: "reminder",
    priority: "normal",
    status: "sent",
    title: "Safety Inspection Due",
    message: "Safety inspection for Pune Construction Site is due in 2 days.",
    recipientType: "user",
    recipients: [
      {
        id: "rec_002",
        type: "user",
        identifier: "user_003",
        name: "Mike Johnson",
        email: "mike.engineer@buildcorp.com",
        status: "sent",
        sentAt: "2024-01-25T08:00:00Z",
      },
    ],
    channels: ["in_app", "sms"],
    sentAt: "2024-01-25T08:00:00Z",
    triggeredBy: "schedule",
    metadata: {
      siteId: "site_002",
      siteName: "Pune Construction Site",
      inspectionDate: "2024-01-27",
    },
    tags: ["safety", "inspection", "reminder"],
    category: "operations",
    openCount: 1,
    clickCount: 0,
    createdBy: "system",
    createdAt: "2024-01-25T08:00:00Z",
    updatedAt: "2024-01-25T08:00:00Z",
    permissions: {
      canEdit: false,
      canDelete: true,
      canResend: true,
    },
  },
  {
    id: "notif_003",
    tenantId: "tenant_001",
    type: "announcement",
    priority: "normal",
    status: "delivered",
    title: "New Safety Protocols Announced",
    message:
      "Updated safety protocols are now in effect across all construction sites.",
    description:
      "Please review the updated safety guidelines and ensure compliance.",
    recipientType: "all_users",
    recipients: [
      {
        id: "rec_003",
        type: "user",
        identifier: "all_users",
        name: "All BuildCorp Users",
        status: "delivered",
        sentAt: "2024-01-24T16:00:00Z",
        deliveredAt: "2024-01-24T16:01:00Z",
      },
    ],
    channels: ["in_app", "email"],
    sentAt: "2024-01-24T16:00:00Z",
    deliveredAt: "2024-01-24T16:01:00Z",
    triggeredBy: "manual",
    metadata: {
      policyVersion: "2024.1",
      effectiveDate: "2024-01-25",
    },
    tags: ["safety", "policy", "announcement"],
    category: "operations",
    actions: [
      {
        id: "action_003",
        type: "link",
        label: "View Guidelines",
        url: "/safety-guidelines",
        style: "primary",
      },
    ],
    openCount: 15,
    clickCount: 12,
    createdBy: "user_001",
    createdAt: "2024-01-24T16:00:00Z",
    updatedAt: "2024-01-24T16:01:00Z",
    permissions: {
      canEdit: true,
      canDelete: true,
      canResend: true,
    },
  },

  // Tenant 2 - Metro Realty Group
  {
    id: "notif_004",
    tenantId: "tenant_002",
    type: "workflow",
    priority: "urgent",
    status: "delivered",
    title: "Lead Assignment",
    message:
      "A new high-value lead has been assigned to you for immediate follow-up.",
    recipientType: "user",
    recipients: [
      {
        id: "rec_004",
        type: "user",
        identifier: "user_005",
        name: "Rahul Kumar",
        email: "rahul.sales@metrorealty.com",
        phone: "+91-9876543250",
        status: "delivered",
        sentAt: "2024-01-25T09:30:00Z",
        deliveredAt: "2024-01-25T09:31:00Z",
        readAt: "2024-01-25T09:35:00Z",
      },
    ],
    channels: ["in_app", "email", "sms"],
    sentAt: "2024-01-25T09:30:00Z",
    deliveredAt: "2024-01-25T09:31:00Z",
    readAt: "2024-01-25T09:35:00Z",
    workflowId: "workflow_002",
    workflowStepId: "step_assign_001",
    triggeredBy: "workflow",
    metadata: {
      leadId: "lead_001",
      leadName: "Premium Villa Inquiry",
      leadValue: 15000000,
      priority: "hot",
    },
    tags: ["lead", "assignment", "hot"],
    category: "crm",
    actions: [
      {
        id: "action_004",
        type: "link",
        label: "View Lead",
        url: "/crm/leads/lead_001",
        style: "primary",
      },
      {
        id: "action_005",
        type: "button",
        label: "Call Customer",
        style: "secondary",
      },
    ],
    openCount: 1,
    clickCount: 1,
    createdBy: "system",
    createdAt: "2024-01-25T09:30:00Z",
    updatedAt: "2024-01-25T09:35:00Z",
    permissions: {
      canEdit: false,
      canDelete: false,
      canResend: true,
    },
  },
  {
    id: "notif_005",
    tenantId: "tenant_002",
    type: "reminder",
    priority: "normal",
    status: "scheduled",
    title: "Client Meeting Reminder",
    message: "You have a client meeting scheduled for tomorrow at 2:00 PM.",
    recipientType: "user",
    recipients: [
      {
        id: "rec_005",
        type: "user",
        identifier: "user_005",
        name: "Rahul Kumar",
        email: "rahul.sales@metrorealty.com",
        status: "pending",
      },
    ],
    channels: ["in_app", "email"],
    scheduledAt: "2024-01-26T13:00:00Z",
    triggeredBy: "schedule",
    metadata: {
      meetingId: "meeting_001",
      clientName: "Mr. Sharma",
      meetingTime: "2024-01-26T14:00:00Z",
      meetingLocation: "Delhi Office",
    },
    tags: ["meeting", "reminder", "client"],
    category: "crm",
    openCount: 0,
    clickCount: 0,
    createdBy: "system",
    createdAt: "2024-01-25T09:00:00Z",
    updatedAt: "2024-01-25T09:00:00Z",
    permissions: {
      canEdit: false,
      canDelete: true,
      canResend: false,
    },
  },

  // Tenant 3 - Skyline Developers
  {
    id: "notif_006",
    tenantId: "tenant_003",
    type: "alert",
    priority: "critical",
    status: "delivered",
    title: "System Maintenance Alert",
    message:
      "Scheduled system maintenance will begin in 1 hour. Please save your work.",
    recipientType: "all_users",
    recipients: [
      {
        id: "rec_006",
        type: "user",
        identifier: "all_users",
        name: "All Skyline Users",
        status: "delivered",
        sentAt: "2024-01-25T07:00:00Z",
        deliveredAt: "2024-01-25T07:01:00Z",
      },
    ],
    channels: ["in_app", "email"],
    sentAt: "2024-01-25T07:00:00Z",
    deliveredAt: "2024-01-25T07:01:00Z",
    triggeredBy: "manual",
    metadata: {
      maintenanceStart: "2024-01-25T08:00:00Z",
      maintenanceEnd: "2024-01-25T10:00:00Z",
      affectedSystems: ["CRM", "Project Management"],
    },
    tags: ["maintenance", "system", "alert"],
    category: "system",
    openCount: 5,
    clickCount: 0,
    createdBy: "user_006",
    createdAt: "2024-01-25T07:00:00Z",
    updatedAt: "2024-01-25T07:01:00Z",
    permissions: {
      canEdit: true,
      canDelete: true,
      canResend: true,
    },
  },
];

// Mock notification templates
export const mockTemplates: NotificationTemplate[] = [
  {
    id: "template_001",
    tenantId: "tenant_001",
    name: "Project Approval Request",
    description: "Template for project approval workflow notifications",
    type: "approval",
    category: "project_management",
    templates: {
      in_app: {
        title: "Project Approval Required",
        body: "The {{projectName}} requires your approval to proceed. Budget: {{budgetAmount}}",
      },
      email: {
        subject: "Project Approval Required - {{projectName}}",
        title: "Project Approval Required",
        body: `
          <h2>Project Approval Required</h2>
          <p>The <strong>{{projectName}}</strong> requires your approval to proceed to the next phase.</p>
          <p><strong>Project Details:</strong></p>
          <ul>
            <li>Budget: {{budgetAmount}}</li>
            <li>Timeline: {{timeline}}</li>
            <li>Location: {{location}}</li>
          </ul>
          <p>Please review and approve at your earliest convenience.</p>
        `,
        footer: "BuildCorp Constructions - Automated Notification",
      },
      sms: {
        body: "Project {{projectName}} needs approval. Budget: {{budgetAmount}}. Login to approve.",
      },
    },
    variables: [
      {
        name: "projectName",
        type: "string",
        description: "Name of the project",
        required: true,
      },
      {
        name: "budgetAmount",
        type: "number",
        description: "Project budget amount",
        required: true,
      },
      {
        name: "timeline",
        type: "string",
        description: "Project timeline",
        required: false,
      },
      {
        name: "location",
        type: "string",
        description: "Project location",
        required: false,
      },
    ],
    defaultPriority: "high",
    defaultChannels: ["in_app", "email"],
    workflowCompatible: true,
    workflowSteps: ["approval", "notification"],
    usageCount: 15,
    lastUsed: "2024-01-25T10:30:00Z",
    isActive: true,
    isSystem: false,
    createdBy: "user_001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "template_002",
    tenantId: "tenant_002",
    name: "Lead Assignment",
    description: "Template for new lead assignment notifications",
    type: "workflow",
    category: "crm",
    templates: {
      in_app: {
        title: "New Lead Assigned",
        body: "A {{leadPriority}} priority lead ({{leadName}}) has been assigned to you. Value: {{leadValue}}",
      },
      email: {
        subject: "New {{leadPriority}} Priority Lead Assigned",
        title: "New Lead Assignment",
        body: `
          <h2>New Lead Assigned</h2>
          <p>A new <strong>{{leadPriority}}</strong> priority lead has been assigned to you.</p>
          <p><strong>Lead Details:</strong></p>
          <ul>
            <li>Name: {{leadName}}</li>
            <li>Value: {{leadValue}}</li>
            <li>Source: {{leadSource}}</li>
            <li>Contact: {{contactInfo}}</li>
          </ul>
          <p>Please follow up within 24 hours.</p>
        `,
        footer: "Metro Realty Group - Lead Management System",
      },
      sms: {
        body: "New {{leadPriority}} lead: {{leadName}} ({{leadValue}}) assigned. Follow up ASAP.",
      },
    },
    variables: [
      {
        name: "leadName",
        type: "string",
        description: "Name of the lead",
        required: true,
      },
      {
        name: "leadValue",
        type: "number",
        description: "Estimated lead value",
        required: true,
      },
      {
        name: "leadPriority",
        type: "string",
        description: "Lead priority level",
        required: true,
        validation: {
          options: ["hot", "warm", "cold"],
        },
      },
      {
        name: "leadSource",
        type: "string",
        description: "Source of the lead",
        required: false,
      },
      {
        name: "contactInfo",
        type: "string",
        description: "Contact information",
        required: false,
      },
    ],
    defaultPriority: "high",
    defaultChannels: ["in_app", "email", "sms"],
    workflowCompatible: true,
    usageCount: 28,
    lastUsed: "2024-01-25T09:30:00Z",
    isActive: true,
    isSystem: false,
    createdBy: "user_004",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "template_003",
    tenantId: "tenant_001",
    name: "Safety Reminder",
    description: "Template for safety inspection reminders",
    type: "reminder",
    category: "operations",
    templates: {
      in_app: {
        title: "Safety Inspection Due",
        body: "Safety inspection for {{siteName}} is due on {{inspectionDate}}",
      },
      email: {
        subject: "Safety Inspection Due - {{siteName}}",
        title: "Safety Inspection Reminder",
        body: `
          <h2>Safety Inspection Due</h2>
          <p>This is a reminder that safety inspection for <strong>{{siteName}}</strong> is due.</p>
          <p><strong>Inspection Details:</strong></p>
          <ul>
            <li>Site: {{siteName}}</li>
            <li>Due Date: {{inspectionDate}}</li>
            <li>Inspector: {{inspectorName}}</li>
            <li>Contact: {{inspectorContact}}</li>
          </ul>
          <p>Please ensure all safety protocols are in place before the inspection.</p>
        `,
        footer: "BuildCorp Constructions - Safety Management",
      },
      sms: {
        body: "Safety inspection for {{siteName}} due {{inspectionDate}}. Ensure compliance.",
      },
    },
    variables: [
      {
        name: "siteName",
        type: "string",
        description: "Name of the construction site",
        required: true,
      },
      {
        name: "inspectionDate",
        type: "date",
        description: "Date of inspection",
        required: true,
      },
      {
        name: "inspectorName",
        type: "string",
        description: "Name of the inspector",
        required: false,
      },
      {
        name: "inspectorContact",
        type: "string",
        description: "Inspector contact information",
        required: false,
      },
    ],
    defaultPriority: "normal",
    defaultChannels: ["in_app", "sms"],
    workflowCompatible: true,
    usageCount: 8,
    lastUsed: "2024-01-25T08:00:00Z",
    isActive: true,
    isSystem: false,
    createdBy: "user_001",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
];

// Mock notification rules
export const mockRules: NotificationRule[] = [
  {
    id: "rule_001",
    tenantId: "tenant_001",
    name: "Project Budget Approval",
    description:
      "Trigger approval notification when project budget exceeds threshold",
    isActive: true,
    triggers: [
      {
        event: "project.budget_updated",
        source: "system",
        filters: {
          amount: { $gt: 1000000 },
        },
      },
    ],
    conditions: [
      {
        field: "budget.amount",
        operator: "greater_than",
        value: 1000000,
      },
    ],
    templateId: "template_001",
    channels: ["in_app", "email"],
    priority: "high",
    recipientRules: [
      {
        type: "role",
        criteria: {
          roleId: "project_manager",
        },
      },
    ],
    scheduleType: "immediate",
    maxExecutions: 100,
    cooldownPeriod: 60,
    executionCount: 5,
    lastExecuted: "2024-01-25T10:30:00Z",
    createdBy: "user_001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "rule_002",
    tenantId: "tenant_002",
    name: "High-Value Lead Assignment",
    description: "Notify sales team when high-value lead is created",
    isActive: true,
    triggers: [
      {
        event: "lead.created",
        source: "workflow",
        filters: {
          value: { $gte: 5000000 },
        },
      },
    ],
    conditions: [
      {
        field: "lead.estimatedValue",
        operator: "greater_than",
        value: 5000000,
      },
    ],
    templateId: "template_002",
    channels: ["in_app", "email", "sms"],
    priority: "urgent",
    recipientRules: [
      {
        type: "department",
        criteria: {
          department: "Sales",
        },
      },
    ],
    scheduleType: "immediate",
    maxExecutions: 50,
    cooldownPeriod: 30,
    executionCount: 12,
    lastExecuted: "2024-01-25T09:30:00Z",
    createdBy: "user_004",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "rule_003",
    tenantId: "tenant_001",
    name: "Safety Inspection Reminder",
    description: "Send reminder 2 days before safety inspection due date",
    isActive: true,
    triggers: [
      {
        event: "inspection.due_soon",
        source: "schedule",
      },
    ],
    conditions: [
      {
        field: "inspection.type",
        operator: "equals",
        value: "safety",
      },
    ],
    templateId: "template_003",
    channels: ["in_app", "sms"],
    priority: "normal",
    recipientRules: [
      {
        type: "user",
        criteria: {
          field: "inspection.assignedTo",
        },
      },
    ],
    scheduleType: "delayed",
    delay: 2880, // 48 hours before due date
    maxExecutions: 200,
    cooldownPeriod: 1440, // 24 hours
    executionCount: 24,
    lastExecuted: "2024-01-25T08:00:00Z",
    createdBy: "user_001",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
];

// Mock tenant notification settings
export const mockTenantSettings: {
  [tenantId: string]: TenantNotificationSettings;
} = {
  tenant_001: {
    tenantId: "tenant_001",
    enabled: true,
    allowUserPreferences: true,
    requireApproval: false,
    channels: {
      in_app: {
        enabled: true,
        config: {},
        limits: {
          dailyLimit: 1000,
        },
        templates: {
          default: "default_in_app",
        },
      },
      email: {
        enabled: true,
        provider: "sendgrid",
        config: {
          apiKey: "SG.***",
          fromEmail: "notifications@buildcorp.com",
          fromName: "BuildCorp Notifications",
        },
        limits: {
          dailyLimit: 500,
          monthlyLimit: 10000,
          costPerMessage: 0.001,
        },
        templates: {
          default: "default_email",
          header: "buildcorp_header",
          footer: "buildcorp_footer",
        },
      },
      sms: {
        enabled: true,
        provider: "twilio",
        config: {
          accountSid: "AC***",
          authToken: "***",
          fromNumber: "+1234567890",
        },
        limits: {
          dailyLimit: 100,
          monthlyLimit: 2000,
          costPerMessage: 0.05,
        },
        templates: {
          default: "default_sms",
        },
      },
    },
    rateLimits: {
      perUser: 50,
      perTenant: 1000,
      perChannel: {
        email: 100,
        sms: 20,
        in_app: 200,
      },
    },
    retentionDays: 90,
    archiveAfterDays: 365,
    approvalRequired: {
      types: ["marketing"],
      priorities: ["critical"],
      bulkThreshold: 100,
    },
    branding: {
      logo: "/logos/buildcorp.png",
      colors: {
        primary: "#1e40af",
        secondary: "#64748b",
        accent: "#f59e0b",
      },
      footer: "© 2024 BuildCorp Constructions. All rights reserved.",
    },
    analyticsEnabled: true,
    trackingEnabled: true,
    updatedBy: "user_001",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  tenant_002: {
    tenantId: "tenant_002",
    enabled: true,
    allowUserPreferences: true,
    requireApproval: true,
    channels: {
      in_app: {
        enabled: true,
        config: {},
        limits: {
          dailyLimit: 800,
        },
        templates: {
          default: "default_in_app",
        },
      },
      email: {
        enabled: true,
        provider: "mailgun",
        config: {
          apiKey: "MG.***",
          domain: "mg.metrorealty.com",
          fromEmail: "notifications@metrorealty.com",
          fromName: "Metro Realty Notifications",
        },
        limits: {
          dailyLimit: 300,
          monthlyLimit: 8000,
          costPerMessage: 0.0008,
        },
        templates: {
          default: "default_email",
          header: "metro_header",
          footer: "metro_footer",
        },
      },
      sms: {
        enabled: true,
        provider: "textlocal",
        config: {
          apiKey: "TL***",
          senderId: "METRO",
        },
        limits: {
          dailyLimit: 150,
          monthlyLimit: 3000,
          costPerMessage: 0.03,
        },
        templates: {
          default: "default_sms",
        },
      },
      whatsapp: {
        enabled: true,
        provider: "twilio",
        config: {
          accountSid: "AC***",
          authToken: "***",
          fromNumber: "whatsapp:+14155238886",
        },
        limits: {
          dailyLimit: 100,
          monthlyLimit: 2000,
          costPerMessage: 0.02,
        },
        templates: {
          default: "default_whatsapp",
        },
      },
    },
    rateLimits: {
      perUser: 40,
      perTenant: 800,
      perChannel: {
        email: 80,
        sms: 25,
        whatsapp: 15,
        in_app: 150,
      },
    },
    retentionDays: 120,
    archiveAfterDays: 730,
    approvalRequired: {
      types: ["marketing", "announcement"],
      priorities: ["urgent", "critical"],
      bulkThreshold: 50,
    },
    branding: {
      logo: "/logos/metro-realty.png",
      colors: {
        primary: "#059669",
        secondary: "#6b7280",
        accent: "#dc2626",
      },
      footer: "© 2024 Metro Realty Group. All rights reserved.",
    },
    analyticsEnabled: true,
    trackingEnabled: true,
    updatedBy: "user_004",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  tenant_003: {
    tenantId: "tenant_003",
    enabled: true,
    allowUserPreferences: false,
    requireApproval: false,
    channels: {
      in_app: {
        enabled: true,
        config: {},
        limits: {
          dailyLimit: 500,
        },
        templates: {
          default: "default_in_app",
        },
      },
      email: {
        enabled: true,
        provider: "ses",
        config: {
          region: "us-east-1",
          accessKey: "AKIA***",
          secretKey: "***",
          fromEmail: "notifications@skylinedev.com",
          fromName: "Skyline Notifications",
        },
        limits: {
          dailyLimit: 200,
          monthlyLimit: 5000,
          costPerMessage: 0.0001,
        },
        templates: {
          default: "default_email",
          header: "skyline_header",
          footer: "skyline_footer",
        },
      },
    },
    rateLimits: {
      perUser: 30,
      perTenant: 500,
      perChannel: {
        email: 50,
        in_app: 100,
      },
    },
    retentionDays: 60,
    archiveAfterDays: 365,
    approvalRequired: {
      types: [],
      priorities: ["critical"],
      bulkThreshold: 25,
    },
    branding: {
      logo: "/logos/skyline.png",
      colors: {
        primary: "#7c3aed",
        secondary: "#64748b",
        accent: "#f59e0b",
      },
      footer: "© 2024 Skyline Developers. All rights reserved.",
    },
    analyticsEnabled: true,
    trackingEnabled: false,
    updatedBy: "user_006",
    updatedAt: "2024-01-10T00:00:00Z",
  },
};

// Mock analytics data
export const mockAnalytics: { [tenantId: string]: NotificationAnalytics } = {
  tenant_001: {
    tenantId: "tenant_001",
    period: "month",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    overview: {
      totalSent: 1250,
      totalDelivered: 1198,
      totalRead: 892,
      totalClicked: 356,
      totalFailed: 52,
      deliveryRate: 95.8,
      readRate: 74.5,
      clickRate: 28.5,
    },
    byChannel: {
      in_app: {
        sent: 800,
        delivered: 795,
        read: 652,
        clicked: 234,
        failed: 5,
        cost: 0,
      },
      email: {
        sent: 350,
        delivered: 333,
        read: 198,
        clicked: 98,
        failed: 17,
        cost: 0.35,
      },
      sms: {
        sent: 100,
        delivered: 70,
        read: 42,
        clicked: 24,
        failed: 30,
        cost: 5.0,
      },
    },
    byType: {
      workflow: {
        sent: 450,
        delivered: 432,
        read: 324,
        clicked: 145,
        failed: 18,
      },
      reminder: {
        sent: 320,
        delivered: 308,
        read: 234,
        clicked: 87,
        failed: 12,
      },
      announcement: {
        sent: 180,
        delivered: 175,
        read: 142,
        clicked: 68,
        failed: 5,
      },
      approval: {
        sent: 150,
        delivered: 145,
        read: 112,
        clicked: 34,
        failed: 5,
      },
      alert: {
        sent: 150,
        delivered: 138,
        read: 80,
        clicked: 22,
        failed: 12,
      },
    },
    byPriority: {
      critical: {
        sent: 45,
        delivered: 44,
        read: 42,
        clicked: 18,
        failed: 1,
        averageDeliveryTime: 0.5,
      },
      urgent: {
        sent: 125,
        delivered: 121,
        read: 98,
        clicked: 45,
        failed: 4,
        averageDeliveryTime: 1.2,
      },
      high: {
        sent: 280,
        delivered: 268,
        read: 201,
        clicked: 89,
        failed: 12,
        averageDeliveryTime: 2.1,
      },
      normal: {
        sent: 650,
        delivered: 623,
        read: 452,
        clicked: 156,
        failed: 27,
        averageDeliveryTime: 3.5,
      },
      low: {
        sent: 150,
        delivered: 142,
        read: 99,
        clicked: 48,
        failed: 8,
        averageDeliveryTime: 5.2,
      },
    },
    topPerformers: {
      templates: [
        {
          templateId: "template_001",
          templateName: "Project Approval Request",
          sent: 45,
          delivered: 44,
          read: 38,
          clicked: 22,
          deliveryRate: 97.8,
          readRate: 86.4,
          clickRate: 57.9,
        },
        {
          templateId: "template_003",
          templateName: "Safety Reminder",
          sent: 32,
          delivered: 30,
          read: 24,
          clicked: 18,
          deliveryRate: 93.8,
          readRate: 80.0,
          clickRate: 75.0,
        },
      ],
      rules: [
        {
          ruleId: "rule_001",
          ruleName: "Project Budget Approval",
          executions: 15,
          successRate: 93.3,
          averageDeliveryTime: 1.8,
        },
        {
          ruleId: "rule_003",
          ruleName: "Safety Inspection Reminder",
          executions: 24,
          successRate: 91.7,
          averageDeliveryTime: 2.4,
        },
      ],
      campaigns: [],
    },
    trends: {
      daily: [
        {
          date: "2024-01-20",
          sent: 45,
          delivered: 43,
          read: 32,
          clicked: 14,
          failed: 2,
        },
        {
          date: "2024-01-21",
          sent: 52,
          delivered: 50,
          read: 38,
          clicked: 16,
          failed: 2,
        },
        {
          date: "2024-01-22",
          sent: 38,
          delivered: 36,
          read: 28,
          clicked: 12,
          failed: 2,
        },
        {
          date: "2024-01-23",
          sent: 41,
          delivered: 39,
          read: 29,
          clicked: 13,
          failed: 2,
        },
        {
          date: "2024-01-24",
          sent: 48,
          delivered: 46,
          read: 35,
          clicked: 15,
          failed: 2,
        },
        {
          date: "2024-01-25",
          sent: 56,
          delivered: 54,
          read: 41,
          clicked: 18,
          failed: 2,
        },
      ],
      hourly: Array.from({ length: 24 }, (_, hour) => ({
        hour,
        sent: Math.floor(Math.random() * 20) + 10,
        delivered: Math.floor(Math.random() * 18) + 8,
        read: Math.floor(Math.random() * 15) + 5,
        clicked: Math.floor(Math.random() * 8) + 2,
        failed: Math.floor(Math.random() * 3),
      })),
    },
    costs: {
      total: 5.35,
      byChannel: {
        email: 0.35,
        sms: 5.0,
        in_app: 0,
      },
      costPerNotification: 0.0043,
      costPerConversion: 0.015,
    },
  },
  tenant_002: {
    tenantId: "tenant_002",
    period: "month",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    overview: {
      totalSent: 890,
      totalDelivered: 856,
      totalRead: 634,
      totalClicked: 287,
      totalFailed: 34,
      deliveryRate: 96.2,
      readRate: 74.1,
      clickRate: 33.5,
    },
    byChannel: {
      in_app: {
        sent: 450,
        delivered: 445,
        read: 356,
        clicked: 142,
        failed: 5,
        cost: 0,
      },
      email: {
        sent: 280,
        delivered: 268,
        read: 198,
        clicked: 89,
        failed: 12,
        cost: 0.224,
      },
      sms: {
        sent: 120,
        delivered: 108,
        read: 58,
        clicked: 34,
        failed: 12,
        cost: 3.24,
      },
      whatsapp: {
        sent: 40,
        delivered: 35,
        read: 22,
        clicked: 22,
        failed: 5,
        cost: 0.7,
      },
    },
    byType: {
      workflow: {
        sent: 320,
        delivered: 308,
        read: 234,
        clicked: 124,
        failed: 12,
      },
      reminder: {
        sent: 280,
        delivered: 271,
        read: 198,
        clicked: 87,
        failed: 9,
      },
      announcement: {
        sent: 150,
        delivered: 143,
        read: 112,
        clicked: 45,
        failed: 7,
      },
      marketing: {
        sent: 90,
        delivered: 86,
        read: 64,
        clicked: 22,
        failed: 4,
      },
      alert: {
        sent: 50,
        delivered: 48,
        read: 26,
        clicked: 9,
        failed: 2,
      },
    },
    byPriority: {
      critical: {
        sent: 25,
        delivered: 24,
        read: 22,
        clicked: 12,
        failed: 1,
        averageDeliveryTime: 0.8,
      },
      urgent: {
        sent: 95,
        delivered: 92,
        read: 78,
        clicked: 38,
        failed: 3,
        averageDeliveryTime: 1.5,
      },
      high: {
        sent: 180,
        delivered: 174,
        read: 134,
        clicked: 67,
        failed: 6,
        averageDeliveryTime: 2.3,
      },
      normal: {
        sent: 450,
        delivered: 432,
        read: 312,
        clicked: 134,
        failed: 18,
        averageDeliveryTime: 4.1,
      },
      low: {
        sent: 140,
        delivered: 134,
        read: 88,
        clicked: 36,
        failed: 6,
        averageDeliveryTime: 6.2,
      },
    },
    topPerformers: {
      templates: [
        {
          templateId: "template_002",
          templateName: "Lead Assignment",
          sent: 68,
          delivered: 66,
          read: 58,
          clicked: 34,
          deliveryRate: 97.1,
          readRate: 87.9,
          clickRate: 58.6,
        },
      ],
      rules: [
        {
          ruleId: "rule_002",
          ruleName: "High-Value Lead Assignment",
          executions: 12,
          successRate: 91.7,
          averageDeliveryTime: 1.2,
        },
      ],
      campaigns: [],
    },
    trends: {
      daily: [
        {
          date: "2024-01-20",
          sent: 32,
          delivered: 31,
          read: 24,
          clicked: 11,
          failed: 1,
        },
        {
          date: "2024-01-21",
          sent: 38,
          delivered: 36,
          read: 28,
          clicked: 13,
          failed: 2,
        },
        {
          date: "2024-01-22",
          sent: 29,
          delivered: 28,
          read: 21,
          clicked: 9,
          failed: 1,
        },
        {
          date: "2024-01-23",
          sent: 35,
          delivered: 34,
          read: 26,
          clicked: 12,
          failed: 1,
        },
        {
          date: "2024-01-24",
          sent: 42,
          delivered: 40,
          read: 31,
          clicked: 14,
          failed: 2,
        },
        {
          date: "2024-01-25",
          sent: 48,
          delivered: 46,
          read: 36,
          clicked: 16,
          failed: 2,
        },
      ],
      hourly: Array.from({ length: 24 }, (_, hour) => ({
        hour,
        sent: Math.floor(Math.random() * 15) + 8,
        delivered: Math.floor(Math.random() * 14) + 7,
        read: Math.floor(Math.random() * 12) + 4,
        clicked: Math.floor(Math.random() * 6) + 2,
        failed: Math.floor(Math.random() * 2),
      })),
    },
    costs: {
      total: 4.164,
      byChannel: {
        email: 0.224,
        sms: 3.24,
        whatsapp: 0.7,
        in_app: 0,
      },
      costPerNotification: 0.0047,
      costPerConversion: 0.0145,
    },
  },
};

// Helper functions for tenant-specific data retrieval
export const getTenantNotifications = (tenantId: string) => {
  return mockNotifications.filter(
    (notification) => notification.tenantId === tenantId,
  );
};

export const getTenantTemplates = (tenantId: string) => {
  return mockTemplates.filter((template) => template.tenantId === tenantId);
};

export const getTenantRules = (tenantId: string) => {
  return mockRules.filter((rule) => rule.tenantId === tenantId);
};

export const getTenantSettings = (tenantId: string) => {
  return mockTenantSettings[tenantId] || null;
};

export const getTenantAnalytics = (tenantId: string) => {
  return mockAnalytics[tenantId] || null;
};

// Utility functions for filtering and search
export const filterNotifications = (
  notifications: TenantNotification[],
  filters: {
    types?: NotificationType[];
    priorities?: NotificationPriority[];
    statuses?: NotificationStatus[];
    channels?: NotificationChannel[];
    categories?: NotificationCategory[];
    dateRange?: { start: string; end: string };
    search?: string;
  },
) => {
  let filtered = notifications;

  if (filters.types && filters.types.length > 0) {
    filtered = filtered.filter((notif) => filters.types!.includes(notif.type));
  }

  if (filters.priorities && filters.priorities.length > 0) {
    filtered = filtered.filter((notif) =>
      filters.priorities!.includes(notif.priority),
    );
  }

  if (filters.statuses && filters.statuses.length > 0) {
    filtered = filtered.filter((notif) =>
      filters.statuses!.includes(notif.status),
    );
  }

  if (filters.channels && filters.channels.length > 0) {
    filtered = filtered.filter((notif) =>
      notif.channels.some((channel) => filters.channels!.includes(channel)),
    );
  }

  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(
      (notif) => notif.category && filters.categories!.includes(notif.category),
    );
  }

  if (filters.dateRange) {
    const { start, end } = filters.dateRange;
    filtered = filtered.filter((notif) => {
      const createdAt = new Date(notif.createdAt);
      return createdAt >= new Date(start) && createdAt <= new Date(end);
    });
  }

  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (notif) =>
        notif.title.toLowerCase().includes(query) ||
        notif.message.toLowerCase().includes(query) ||
        notif.description?.toLowerCase().includes(query) ||
        notif.tags?.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  return filtered;
};

// Export all for easier access
export default {
  mockNotifications,
  mockTemplates,
  mockRules,
  mockTenantSettings,
  mockAnalytics,
  getTenantNotifications,
  getTenantTemplates,
  getTenantRules,
  getTenantSettings,
  getTenantAnalytics,
  filterNotifications,
};
